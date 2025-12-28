/**
 * My Groups Content
 *
 * Shows all groups the current user is linked to via their device token.
 * Allows quick navigation to any linked group.
 */

import { signal } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import {
  currentPlatformUser,
  platformUserLoading,
  getLinkedGroups,
  unlinkUserFromGroup,
  deviceToken,
} from '../../hooks/usePlatformUser';
import { getDatabase } from '../../config/firebase';
import { CreateGroupDrawer, openCreateGroupDrawer } from './CreateGroupDrawer';
import type { SportId } from '../../types/sportConfig';
import { sport } from '../../config/sport';

// Group metadata cache
const groupNames = signal<Record<string, string>>({});
const groupSportTypes = signal<Record<string, SportId>>({});
const deletedGroups = signal<Set<string>>(new Set()); // Groups that no longer exist
const isLoadingGroups = signal(false);

// Sport emoji mapping for badges
const sportEmojis: Record<SportId, string> = {
  tennis: '🎾',
  pickleball: '🟡',
  squash: '🏸',
  padel: '🎾',
  badminton: '🏸',
  hub: '🏅',
};

// Format relative time
function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;

  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Load group names and sport types from Firebase
async function loadGroupMetadata(groupIds: string[]): Promise<void> {
  if (groupIds.length === 0) return;

  isLoadingGroups.value = true;
  const db = getDatabase();
  const names: Record<string, string> = {};
  const sportTypes: Record<string, SportId> = {};
  const deleted = new Set<string>();

  try {
    for (const groupId of groupIds) {
      const snapshot = await db.ref(`groups/${groupId}/settings`).once('value');
      const settings = snapshot.val() as { groupName?: string; sportType?: SportId } | null;

      if (settings === null) {
        // Group was deleted
        deleted.add(groupId);
      } else {
        names[groupId] = settings.groupName || groupId;
        sportTypes[groupId] = settings.sportType || 'tennis'; // Default to tennis for legacy groups
      }
    }
    groupNames.value = names;
    groupSportTypes.value = sportTypes;
    deletedGroups.value = deleted;
  } catch (error) {
    console.warn('Failed to load group metadata:', error);
  } finally {
    isLoadingGroups.value = false;
  }
}

// Handle removing a deleted group from the list
async function handleRemoveDeletedGroup(groupId: string, e: Event): Promise<void> {
  e.stopPropagation();
  try {
    await unlinkUserFromGroup(groupId);
    // Remove from local deleted groups set
    const newDeleted = new Set(deletedGroups.value);
    newDeleted.delete(groupId);
    deletedGroups.value = newDeleted;
  } catch (error) {
    console.error('Failed to remove group:', error);
  }
}

// Sport to subdomain mapping
const sportSubdomains: Record<SportId, string> = {
  tennis: 'tennis',
  pickleball: 'pickleball',
  squash: 'squash',
  padel: 'padel',
  badminton: 'badminton',
  hub: 'www',
};

// Navigate to a group, switching subdomains if needed
function navigateToGroup(groupId: string): void {
  const groupSport = groupSportTypes.value[groupId] || 'tennis';
  const currentSport = sport.id;

  // If same sport, just navigate normally
  if (groupSport === currentSport) {
    window.location.href = `/?group=${groupId}`;
    return;
  }

  // Different sport - switch to the appropriate subdomain
  // Pass device token to maintain user identity across subdomains
  const targetSubdomain = sportSubdomains[groupSport];
  const currentHost = window.location.hostname;
  const port = window.location.port ? `:${window.location.port}` : '';
  const token = deviceToken.value;
  const tokenParam = token ? `&dt=${token}` : '';

  // Handle localhost subdomains (e.g., tennis.localhost -> pickleball.localhost)
  if (currentHost.includes('localhost')) {
    const newHost = `${targetSubdomain}.localhost`;
    window.location.href = `http://${newHost}${port}/?group=${groupId}${tokenParam}`;
  }
  // Handle production subdomains (e.g., tennis.sportsconnector.com -> pickleball.sportsconnector.com)
  else {
    const hostParts = currentHost.split('.');
    if (hostParts.length >= 2) {
      hostParts[0] = targetSubdomain;
      const newHost = hostParts.join('.');
      window.location.href = `${window.location.protocol}//${newHost}${port}/?group=${groupId}${tokenParam}`;
    } else {
      // Fallback - just navigate on same domain
      window.location.href = `/?group=${groupId}`;
    }
  }
}

export function MyGroupsContent() {
  const allLinkedGroups = getLinkedGroups();

  // Load group metadata on mount
  useEffect(() => {
    const groupIds = allLinkedGroups.map((g) => g.groupId);
    loadGroupMetadata(groupIds);
  }, [allLinkedGroups.length]);

  // Show all groups (don't filter deleted - we'll show them as unavailable)
  const linkedGroups = allLinkedGroups;

  if (platformUserLoading.value) {
    return (
      <div style="padding: 40px 20px; text-align: center; color: var(--color-text-muted, #999);">
        Loading...
      </div>
    );
  }

  if (!currentPlatformUser.value) {
    return (
      <div style="padding: 40px 20px; text-align: center;">
        <div style="font-size: 48px; margin-bottom: 16px;">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="var(--color-text-disabled, #ccc)">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
        <p style="color: var(--color-text-muted, #888); margin: 0;">
          Your groups will appear here once you check in
        </p>
      </div>
    );
  }

  if (linkedGroups.length === 0) {
    return (
      <>
        <div style="padding: 40px 20px; text-align: center;">
          <div style="font-size: 48px; margin-bottom: 16px;">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="var(--color-text-disabled, #ccc)">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
          </div>
          <p style="color: var(--color-text-muted, #888); margin: 0 0 8px 0; font-size: 16px;">
            No groups yet
          </p>
          <p style="color: var(--color-text-disabled, #aaa); margin: 0 0 20px 0; font-size: 14px;">
            Join a group or start your own
          </p>
          <button
            onClick={openCreateGroupDrawer}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 24px',
              background: 'var(--color-primary, #2C6E49)',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              color: 'white',
              fontSize: '16px',
              fontWeight: 600,
            }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
            Start a Group
          </button>
        </div>
        <CreateGroupDrawer />
      </>
    );
  }

  return (
    <div style="padding: 8px 0;">
      {/* Create New Group Button */}
      <button
        onClick={openCreateGroupDrawer}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          width: '100%',
          padding: '14px',
          marginBottom: '16px',
          background: 'var(--color-primary-light, #E8F5E9)',
          border: '2px dashed var(--color-primary, #2C6E49)',
          borderRadius: '12px',
          cursor: 'pointer',
          color: 'var(--color-primary, #2C6E49)',
          fontSize: '15px',
          fontWeight: 500,
        }}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
        Create New Group
      </button>

      <p style="color: var(--color-text-muted, #888); font-size: 13px; margin: 0 0 16px 0; padding: 0 4px;">
        {linkedGroups.length} group{linkedGroups.length !== 1 ? 's' : ''} on this device
      </p>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        {linkedGroups.map((group) => {
          const isDeleted = !isLoadingGroups.value && deletedGroups.value.has(group.groupId);

          return (
            <button
              key={group.groupId}
              onClick={() => !isDeleted && navigateToGroup(group.groupId)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                background: isDeleted ? 'var(--color-bg-disabled, #f5f5f5)' : 'var(--color-bg-card, #fff)',
                border: '1px solid var(--color-border, #e0e0e0)',
                borderRadius: '12px',
                cursor: isDeleted ? 'default' : 'pointer',
                width: '100%',
                textAlign: 'left',
                opacity: isDeleted ? 0.6 : 1,
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: isDeleted ? '#eee' : 'var(--color-primary-light, #E8F5E9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg viewBox="0 0 24 24" width="24" height="24" fill={isDeleted ? '#999' : 'var(--color-primary, #2C6E49)'}>
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </div>

              <div style="flex: 1; min-width: 0;">
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    color: isDeleted ? 'var(--color-text-disabled, #999)' : 'var(--color-text-primary, #333)',
                    marginBottom: '2px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                <span>
                  {isDeleted
                    ? 'Group unavailable'
                    : isLoadingGroups.value
                      ? group.groupId
                      : groupNames.value[group.groupId] || group.groupId}
                </span>
                {!isLoadingGroups.value && !isDeleted && (
                  <span style={{ fontSize: '14px' }}>
                    {sportEmojis[groupSportTypes.value[group.groupId]] || '🎾'}
                  </span>
                )}
              </div>
              <div style="font-size: 13px; color: var(--color-text-muted, #888);">
                {isDeleted
                  ? 'This group has been deleted'
                  : `${group.memberName} \u2022 ${formatRelativeTime(group.lastActive)}`}
              </div>
            </div>

            {isDeleted ? (
              <button
                onClick={(e) => handleRemoveDeletedGroup(group.groupId, e)}
                style={{
                  padding: '6px 12px',
                  background: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Remove
              </button>
            ) : (
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="var(--color-text-disabled, #ccc)"
              >
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            )}
          </button>
        );
        })}
      </div>

      {/* Create Group Drawer */}
      <CreateGroupDrawer />
    </div>
  );
}
