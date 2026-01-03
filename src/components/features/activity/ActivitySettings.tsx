/**
 * ActivitySettings Component
 *
 * Simplified notification settings with toggles
 * and followed members management.
 */

import { JSX } from 'preact';
import { signal } from '@preact/signals';
import type { ActivityNotificationPrefs, NotificationLevel } from '@/types/activity';
import { normalizeName } from '@/utils/helpers';

interface ActivitySettingsProps {
  prefs: ActivityNotificationPrefs;
  members: string[]; // All group members
  currentUser: string; // Current user name
  onUpdatePrefs: (prefs: Partial<ActivityNotificationPrefs>) => void;
  onSave: () => void;
}

// Local signal for UI state
const showFollowedPicker = signal(false);

/**
 * Simple toggle switch component
 */
function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description: string;
}): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 0',
      }}
    >
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontWeight: '500',
            fontSize: '14px',
            color: 'var(--color-text-primary, #333)',
            marginBottom: '2px',
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: '12px',
            color: 'var(--color-text-secondary, #666)',
          }}
        >
          {description}
        </div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        style={{
          width: '48px',
          height: '28px',
          borderRadius: '14px',
          border: 'none',
          background: checked ? 'var(--color-primary, #2C6E49)' : '#ccc',
          position: 'relative',
          cursor: 'pointer',
          transition: 'background 0.2s',
          flexShrink: 0,
          marginLeft: '12px',
        }}
      >
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '12px',
            background: 'white',
            position: 'absolute',
            top: '2px',
            left: checked ? '22px' : '2px',
            transition: 'left 0.2s',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }}
        />
      </button>
    </div>
  );
}

export function ActivitySettings({
  prefs,
  members,
  currentUser,
  onUpdatePrefs,
  onSave,
}: ActivitySettingsProps): JSX.Element {
  const followedCount = prefs.followedMemberIds.length;
  const otherMembers = members.filter(
    (m) => normalizeName(m) !== normalizeName(currentUser)
  );

  const isFollowing = (name: string) =>
    prefs.followedMemberIds.includes(normalizeName(name));

  const toggleFollow = (name: string) => {
    const normalizedName = normalizeName(name);
    const current = prefs.followedMemberIds;

    if (current.includes(normalizedName)) {
      onUpdatePrefs({
        followedMemberIds: current.filter((id) => id !== normalizedName),
      });
    } else {
      onUpdatePrefs({
        followedMemberIds: [...current, normalizedName],
      });
    }
    onSave();
  };

  const selectAll = () => {
    onUpdatePrefs({
      followedMemberIds: otherMembers.map(normalizeName),
    });
    onSave();
  };

  const deselectAll = () => {
    onUpdatePrefs({ followedMemberIds: [] });
    onSave();
  };

  return (
    <div>
      {/* Followed Members Picker Modal */}
      {showFollowedPicker.value && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1002,
          }}
        >
          <div
            style={{
              background: 'var(--color-bg-card, white)',
              padding: '20px',
              borderRadius: 'var(--radius-xl, 12px)',
              maxWidth: '350px',
              width: '90%',
            }}
          >
            <h3
              style={{
                marginTop: 0,
                marginBottom: '8px',
                color: 'var(--color-text-primary, #333)',
              }}
            >
              Followed Members
            </h3>
            <p
              style={{
                margin: '0 0 12px 0',
                fontSize: 'var(--font-size-sm, 13px)',
                color: 'var(--color-text-secondary, #666)',
              }}
            >
              Get notified about their activity
            </p>

            {/* Select/Deselect All */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <button
                onClick={selectAll}
                style={{
                  flex: 1,
                  padding: '8px',
                  background: 'var(--color-primary-light, #E8F5E9)',
                  color: 'var(--color-primary, #2C6E49)',
                  border: '1px solid var(--color-primary-lighter, #A5D6A7)',
                  borderRadius: 'var(--radius-md, 6px)',
                  fontSize: 'var(--font-size-sm, 13px)',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
              >
                Select All
              </button>
              <button
                onClick={deselectAll}
                style={{
                  flex: 1,
                  padding: '8px',
                  background: 'var(--color-bg-muted, #f5f5f5)',
                  color: 'var(--color-text-secondary, #666)',
                  border: '1px solid var(--color-border, #e0e0e0)',
                  borderRadius: 'var(--radius-md, 6px)',
                  fontSize: 'var(--font-size-sm, 13px)',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
              >
                Deselect All
              </button>
            </div>

            {/* Members list */}
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {otherMembers.map((name) => {
                const followed = isFollowing(name);
                return (
                  <button
                    key={name}
                    onClick={() => toggleFollow(name)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      width: '100%',
                      textAlign: 'left',
                      padding: '12px',
                      marginBottom: '4px',
                      border: followed
                        ? '1px solid var(--color-primary-lighter, #A5D6A7)'
                        : '1px solid var(--color-border, #e0e0e0)',
                      borderRadius: 'var(--radius-lg, 8px)',
                      background: followed
                        ? 'var(--color-primary-light, #E8F5E9)'
                        : 'var(--color-bg-card, white)',
                      color: 'var(--color-text-primary, #333)',
                      cursor: 'pointer',
                      fontSize: 'var(--font-size-base, 14px)',
                      fontWeight: 'normal',
                    }}
                  >
                    <span
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: 'var(--radius-sm, 4px)',
                        border: followed ? 'none' : '2px solid var(--color-gray-disabled, #ccc)',
                        background: followed
                          ? 'var(--color-primary, #2C6E49)'
                          : 'var(--color-bg-card, white)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '14px',
                        flexShrink: 0,
                      }}
                    >
                      {followed && '✓'}
                    </span>
                    {name}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                showFollowedPicker.value = false;
              }}
              style={{
                width: '100%',
                marginTop: '12px',
                background: 'var(--color-primary, #2C6E49)',
                color: 'white',
                border: 'none',
                padding: '12px',
                borderRadius: 'var(--radius-md, 6px)',
                fontSize: 'var(--font-size-base, 14px)',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Settings Content */}
      <div
        style={{
          padding: '16px',
          background: 'var(--color-bg-card, #fff)',
        }}
      >
        {/* Section: Your Games */}
        <div
          style={{
            fontSize: '11px',
            fontWeight: '600',
            color: 'var(--color-text-secondary, #888)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '4px',
          }}
        >
          Your Games
        </div>

        <Toggle
          checked={prefs.gameNeedsPlayers === 'badge'}
          onChange={(checked) => {
            onUpdatePrefs({ gameNeedsPlayers: checked ? 'badge' : 'in-app' });
            onSave();
          }}
          label="Need players"
          description="Show badge when your games need players"
        />

        <Toggle
          checked={prefs.gameConfirmed === 'badge'}
          onChange={(checked) => {
            onUpdatePrefs({ gameConfirmed: checked ? 'badge' : 'in-app' });
            onSave();
          }}
          label="Confirmed"
          description="Show badge when games are ready"
        />

        {/* Divider */}
        <div style={{ borderTop: '1px solid #eee', margin: '8px 0 16px' }} />

        {/* Section: Players I Follow */}
        <div
          style={{
            fontSize: '11px',
            fontWeight: '600',
            color: 'var(--color-text-secondary, #888)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '4px',
          }}
        >
          Players I Follow
        </div>

        <Toggle
          checked={prefs.followedMembers === 'badge'}
          onChange={(checked) => {
            onUpdatePrefs({ followedMembers: checked ? 'badge' : 'in-app' });
            onSave();
          }}
          label="Show badge"
          description="When followed players check in"
        />

        {/* Followed members chips */}
        <div style={{ marginTop: '8px' }}>
          {followedCount > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
              {prefs.followedMemberIds.slice(0, 5).map((id) => {
                const name = otherMembers.find((m) => normalizeName(m) === id) || id;
                return (
                  <span
                    key={id}
                    style={{
                      background: 'var(--color-primary-light, #E8F5E9)',
                      color: 'var(--color-primary, #2C6E49)',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500',
                    }}
                  >
                    {name.split(' ')[0]}
                  </span>
                );
              })}
              {followedCount > 5 && (
                <span style={{ fontSize: '12px', color: '#666' }}>
                  +{followedCount - 5} more
                </span>
              )}
              <button
                onClick={() => { showFollowedPicker.value = true; }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-primary, #2C6E49)',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  padding: '4px 8px',
                }}
              >
                Edit
              </button>
            </div>
          ) : (
            <button
              onClick={() => { showFollowedPicker.value = true; }}
              style={{
                background: 'none',
                border: '1px dashed #ccc',
                borderRadius: '8px',
                padding: '10px 16px',
                color: '#666',
                fontSize: '13px',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              + Follow members to get notified
            </button>
          )}
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #eee', margin: '16px 0' }} />

        {/* Section: SMS Coming Soon */}
        <div
          style={{
            fontSize: '11px',
            fontWeight: '600',
            color: 'var(--color-text-secondary, #888)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span>📱</span> SMS Notifications
          <span
            style={{
              background: '#f0f0f0',
              color: '#888',
              fontSize: '9px',
              padding: '2px 6px',
              borderRadius: '4px',
              fontWeight: '500',
            }}
          >
            COMING SOON
          </span>
        </div>

        <input
          type="tel"
          placeholder="Enter phone number"
          value={prefs.phone || ''}
          onInput={(e) => {
            onUpdatePrefs({ phone: (e.target as HTMLInputElement).value });
          }}
          onBlur={onSave}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '16px',
            boxSizing: 'border-box',
          }}
        />
        <div style={{ fontSize: '11px', color: '#999', marginTop: '6px' }}>
          We'll notify you when SMS is available
        </div>
      </div>
    </div>
  );
}
