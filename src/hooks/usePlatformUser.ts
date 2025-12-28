/**
 * Platform User Hook
 *
 * Manages device-based user identity across groups.
 * Creates and maintains platform user records in Firebase at platform/users/{deviceToken}.
 *
 * Key features:
 * - Silent operation: works in background without affecting existing group flows
 * - Graceful degradation: if Firebase operations fail, app continues normally
 * - Device token persistence: same device = same platform user
 */

import { signal, computed } from '@preact/signals';
import { getDeviceToken } from './useCompatibility';
import { getDatabase } from '../config/firebase';

// ============================================
// Types
// ============================================

/**
 * Minimal platform user profile for Phase 2
 */
export interface PlatformUserProfile {
  displayName: string;
  createdAt: number;
  lastActiveAt: number;
  skillLevel?: 'beginner' | 'intermediate' | 'advanced' | 'competitive' | 'pro';
  ntrpRating?: number;
  // Shared contact info
  phone?: string;
  email?: string;
}

/**
 * Link to a group the user has joined
 */
export interface GroupLink {
  memberName: string; // The name they use in this group
  linkedAt: number;
  lastActive: number;
}

/**
 * Platform user settings
 */
export interface PlatformUserSettings {
  notifications: {
    enabled: boolean;
  };
}

/**
 * Complete platform user record
 */
export interface PlatformUserRecord {
  profile: PlatformUserProfile;
  settings: PlatformUserSettings;
  groupLinks: Record<string, GroupLink>;
}

// ============================================
// Signals
// ============================================

/**
 * Current platform user record (null if not loaded yet)
 */
export const currentPlatformUser = signal<PlatformUserRecord | null>(null);

/**
 * Loading state for platform user
 */
export const platformUserLoading = signal<boolean>(false);

/**
 * Error state (for debugging, doesn't affect UI)
 */
export const platformUserError = signal<string | null>(null);

/**
 * Device token for current user
 */
export const deviceToken = signal<string | null>(null);

/**
 * Computed: number of linked groups
 */
export const linkedGroupsCount = computed(() => {
  const user = currentPlatformUser.value;
  if (!user?.groupLinks) return 0;
  return Object.keys(user.groupLinks).length;
});

// ============================================
// Firebase Paths
// ============================================

function getPlatformUserPath(token: string): string {
  return `platform/users/${token}`;
}

function getProfilePath(token: string): string {
  return `platform/users/${token}/profile`;
}

function getGroupLinksPath(token: string): string {
  return `platform/users/${token}/groupLinks`;
}

function getGroupLinkPath(token: string, groupId: string): string {
  return `platform/users/${token}/groupLinks/${groupId}`;
}

// ============================================
// Core Functions
// ============================================

/**
 * Initialize platform user - call on app startup
 * Creates user record if it doesn't exist
 */
export async function initializePlatformUser(): Promise<void> {
  try {
    platformUserLoading.value = true;
    platformUserError.value = null;

    // Get or create device token
    const token = getDeviceToken();
    deviceToken.value = token;

    const db = getDatabase();
    if (!db) {
      throw new Error('Firebase database not initialized');
    }

    const userRef = db.ref(getPlatformUserPath(token));
    const snapshot = await userRef.once('value');

    if (snapshot.exists()) {
      // User exists, load their data
      const userData = snapshot.val() as PlatformUserRecord;
      currentPlatformUser.value = userData;

      // Update lastActiveAt
      await db.ref(getProfilePath(token)).update({
        lastActiveAt: Date.now(),
      });
    } else {
      // Create new user
      const newUser: PlatformUserRecord = {
        profile: {
          displayName: '',
          createdAt: Date.now(),
          lastActiveAt: Date.now(),
        },
        settings: {
          notifications: {
            enabled: true,
          },
        },
        groupLinks: {},
      };

      await userRef.set(newUser);
      currentPlatformUser.value = newUser;
    }
  } catch (error) {
    // Graceful degradation - log error but don't break the app
    const message = error instanceof Error ? error.message : 'Unknown error';
    platformUserError.value = message;
    console.warn('[PlatformUser] Initialization failed (non-fatal):', message);
  } finally {
    platformUserLoading.value = false;
  }
}

/**
 * Refresh platform user data from Firebase
 * Call this when you need fresh data (e.g., after switching groups)
 */
export async function refreshPlatformUser(): Promise<void> {
  try {
    const token = deviceToken.value;
    if (!token) return;

    const db = getDatabase();
    if (!db) return;

    const snapshot = await db.ref(getPlatformUserPath(token)).once('value');
    if (snapshot.exists()) {
      currentPlatformUser.value = snapshot.val() as PlatformUserRecord;
    }
  } catch (error) {
    console.warn('[PlatformUser] Refresh failed (non-fatal):', error);
  }
}

/**
 * Link current user to a group
 * Called when user selects their name in a group or checks in
 * Also syncs platform contact info to group memberDetails
 */
export async function linkUserToGroup(groupId: string, memberName: string): Promise<void> {
  try {
    const token = deviceToken.value;
    if (!token) {
      console.warn('[PlatformUser] No device token, skipping group link');
      return;
    }

    const db = getDatabase();
    if (!db) {
      console.warn('[PlatformUser] No database, skipping group link');
      return;
    }

    const now = Date.now();
    const groupLink: GroupLink = {
      memberName,
      linkedAt: now,
      lastActive: now,
    };

    // Check if link already exists
    const existingLinkRef = db.ref(getGroupLinkPath(token, groupId));
    const existingSnapshot = await existingLinkRef.once('value');

    if (existingSnapshot.exists()) {
      // Update lastActive and memberName (in case they changed their name)
      await existingLinkRef.update({
        memberName,
        lastActive: now,
      });
    } else {
      // Create new link
      await existingLinkRef.set(groupLink);
    }

    // Update local state
    if (currentPlatformUser.value) {
      currentPlatformUser.value = {
        ...currentPlatformUser.value,
        groupLinks: {
          ...currentPlatformUser.value.groupLinks,
          [groupId]: groupLink,
        },
      };
    }

    // If displayName is empty, set it from the first group
    if (currentPlatformUser.value?.profile.displayName === '') {
      await updateProfile({ displayName: memberName });
    }

    // Sync platform contact info to group memberDetails (auto-fill for new groups)
    const profile = currentPlatformUser.value?.profile;
    if (profile && (profile.phone || profile.email)) {
      try {
        const memberDetailsRef = db.ref(`groups/${groupId}/settings/memberDetails/${memberName}`);
        const detailsSnapshot = await memberDetailsRef.once('value');
        const existingDetails = detailsSnapshot.val() || {};

        // Only update if we have platform contact info and group doesn't have it yet
        const updates: Record<string, unknown> = {};
        if (profile.phone && !existingDetails.phone) {
          updates.phone = profile.phone;
        }
        if (profile.email && !existingDetails.email) {
          updates.email = profile.email;
        }

        if (Object.keys(updates).length > 0) {
          await memberDetailsRef.update(updates);
        }
      } catch (err) {
        // Non-fatal - contact sync is a nice-to-have
        console.warn('[PlatformUser] Contact sync failed (non-fatal):', err);
      }
    }
  } catch (error) {
    // Fire-and-forget - don't break the app
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.warn('[PlatformUser] Group link failed (non-fatal):', message);
  }
}

/**
 * Update group link's lastActive timestamp
 * Called on check-in activity
 */
export async function updateGroupActivity(groupId: string): Promise<void> {
  try {
    const token = deviceToken.value;
    if (!token) return;

    const db = getDatabase();
    if (!db) return;

    await db.ref(getGroupLinkPath(token, groupId)).update({
      lastActive: Date.now(),
    });

    // Update local state
    if (currentPlatformUser.value?.groupLinks[groupId]) {
      currentPlatformUser.value = {
        ...currentPlatformUser.value,
        groupLinks: {
          ...currentPlatformUser.value.groupLinks,
          [groupId]: {
            ...currentPlatformUser.value.groupLinks[groupId],
            lastActive: Date.now(),
          },
        },
      };
    }
  } catch (error) {
    // Fire-and-forget
    console.warn('[PlatformUser] Activity update failed (non-fatal):', error);
  }
}

/**
 * Unlink user from a group (remove from groupLinks)
 * Used to clean up deleted groups from the user's list
 */
export async function unlinkUserFromGroup(groupId: string): Promise<void> {
  try {
    const token = deviceToken.value;
    if (!token) {
      throw new Error('No device token');
    }

    const db = getDatabase();
    if (!db) {
      throw new Error('Database not initialized');
    }

    // Remove the group link from Firebase
    await db.ref(getGroupLinkPath(token, groupId)).remove();

    // Update local state
    if (currentPlatformUser.value?.groupLinks[groupId]) {
      const { [groupId]: _, ...remainingLinks } = currentPlatformUser.value.groupLinks;
      currentPlatformUser.value = {
        ...currentPlatformUser.value,
        groupLinks: remainingLinks,
      };
    }
  } catch (error) {
    console.error('[PlatformUser] Failed to unlink group:', error);
    throw error;
  }
}

/**
 * Update user profile
 */
export async function updateProfile(
  updates: Partial<PlatformUserProfile>
): Promise<void> {
  try {
    const token = deviceToken.value;
    if (!token) {
      throw new Error('No device token');
    }

    const db = getDatabase();
    if (!db) {
      throw new Error('No database');
    }

    // Add lastActiveAt to updates
    const updatesWithTimestamp = {
      ...updates,
      lastActiveAt: Date.now(),
    };

    await db.ref(getProfilePath(token)).update(updatesWithTimestamp);

    // Update local state
    if (currentPlatformUser.value) {
      currentPlatformUser.value = {
        ...currentPlatformUser.value,
        profile: {
          ...currentPlatformUser.value.profile,
          ...updatesWithTimestamp,
        },
      };
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    platformUserError.value = message;
    throw error; // Re-throw for profile UI to handle
  }
}

/**
 * Get all linked groups with their info
 * Returns array sorted by lastActive (most recent first)
 */
export function getLinkedGroups(): Array<{ groupId: string } & GroupLink> {
  const user = currentPlatformUser.value;
  if (!user?.groupLinks) return [];

  return Object.entries(user.groupLinks)
    .map(([groupId, link]) => ({ groupId, ...link }))
    .sort((a, b) => b.lastActive - a.lastActive);
}

/**
 * Check if user is linked to a specific group
 */
export function isLinkedToGroup(groupId: string): boolean {
  return !!currentPlatformUser.value?.groupLinks[groupId];
}

/**
 * Get the member name used in a specific group
 */
export function getMemberNameInGroup(groupId: string): string | null {
  return currentPlatformUser.value?.groupLinks[groupId]?.memberName ?? null;
}

// ============================================
// Hook
// ============================================

/**
 * React/Preact hook for platform user functionality
 */
export function usePlatformUser() {
  return {
    // State
    user: currentPlatformUser,
    loading: platformUserLoading,
    error: platformUserError,
    deviceToken,
    linkedGroupsCount,

    // Actions
    initialize: initializePlatformUser,
    linkToGroup: linkUserToGroup,
    updateActivity: updateGroupActivity,
    updateProfile,
    getLinkedGroups,
    isLinkedToGroup,
    getMemberNameInGroup,
  };
}

export default usePlatformUser;
