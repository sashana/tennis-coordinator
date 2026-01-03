/**
 * Activity Feed Hook
 *
 * Provides real-time activity feed for a group, including:
 * - Recent check-ins grouped by game
 * - Game status (forming, needs players, confirmed)
 * - New member notifications
 */

import { signal, computed } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import { getDatabase } from '@/config/firebase';
import { organizeMatches } from '@/utils/matching';
import { normalizeName } from '@/utils/helpers';
import type { ActivityEntry, CheckinData, PlayStyle } from '@/types';
import type { ActivityItem, GameActivity, ActivityNotificationPrefs } from '@/types/activity';

// ============================================
// Signals
// ============================================

// Raw activity data from Firebase (by date)
const rawActivity = signal<Record<string, Record<string, ActivityEntry>>>({});

// Raw checkins data from Firebase (by date)
const rawCheckins = signal<Record<string, CheckinData[]>>({});

// Notification preferences
const notificationPrefs = signal<ActivityNotificationPrefs>({
  followedMembers: 'badge',
  gameNeedsPlayers: 'badge',
  gameConfirmed: 'badge',
  followedMemberIds: [],
});

// Read status tracking - persisted to localStorage
const STORAGE_KEY = 'activity-read-ids';
const loadReadIds = (): Set<string> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Keep only last 500 IDs to prevent unbounded growth
      const ids = Array.isArray(parsed) ? parsed.slice(-500) : [];
      return new Set(ids);
    }
  } catch {
    // Ignore parse errors
  }
  return new Set();
};
const readActivityIds = signal<Set<string>>(loadReadIds());

// Loading state
const isLoading = signal(true);

// ============================================
// Computed Values
// ============================================

/**
 * Transform raw activity into ActivityItem list
 */
const activities = computed<ActivityItem[]>(() => {
  const result: ActivityItem[] = [];
  const followedIds = notificationPrefs.value.followedMemberIds.map(normalizeName);

  // Get activity from the last 7 days
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  Object.entries(rawActivity.value).forEach(([date, entries]) => {
    const dateObj = new Date(date + 'T12:00:00');
    if (dateObj < sevenDaysAgo) return;

    Object.entries(entries).forEach(([id, entry]) => {
      // Only include check-ins, removals, and member_added for now
      if (!['checkin', 'removal', 'member_added'].includes(entry.action)) return;

      const activityId = `${date}-${id}`;
      const isFollowed = followedIds.includes(normalizeName(entry.player));
      const isRead = readActivityIds.value.has(activityId);

      // Map action to activity type
      let type: ActivityItem['type'] = 'checkin';
      if (entry.action === 'member_added') {
        type = 'new-member';
      } else if (entry.action === 'removal') {
        // Check if this removal caused a game to dissolve
        // A removal is significant if it affects a forming game
        type = 'game-dissolved';
      }

      result.push({
        id: activityId,
        type,
        memberId: normalizeName(entry.player),
        memberName: entry.player,
        gameDate: date,
        playStyle: entry.playStyle as PlayStyle,
        timestamp: entry.timestamp,
        isFollowed,
        isRead,
      });
    });
  });

  // Sort by timestamp descending (newest first)
  return result.sort((a, b) => b.timestamp - a.timestamp);
});

/**
 * Group activities by game (date + playStyle)
 * Calculate game status from current checkins
 */
const gameActivities = computed<GameActivity[]>(() => {
  const games: Map<string, GameActivity> = new Map();
  const followedIds = notificationPrefs.value.followedMemberIds.map(normalizeName);

  // Get upcoming dates (today and future)
  const today = new Date().toISOString().split('T')[0];

  Object.entries(rawCheckins.value).forEach(([date, checkins]) => {
    if (date < today) return;

    // Organize matches for this date
    const organized = organizeMatches(checkins);

    // Group checkins by playStyle
    const byStyle: Record<string, CheckinData[]> = {
      singles: [],
      doubles: [],
      both: [],
    };

    checkins.forEach((c) => {
      const style = c.playStyle || 'both';
      byStyle[style].push(c);
    });

    // Create game activities for forming/confirmed games
    organized.matches.forEach((match) => {
      if (match.type === 'waiting') return;

      const isDoubles = match.type.includes('doubles');
      const playersNeeded = isDoubles ? 4 : 2;
      const playersHave = match.players.length;
      const playersNeed = Math.max(0, playersNeeded - playersHave);
      const isConfirmed = playersNeed === 0;

      const gameKey = `${date}-${match.type}-${match.number || 0}`;
      const activityItems: ActivityItem[] = match.players.map((p, i) => {
        const activityId = `${gameKey}-${i}`;
        return {
          id: activityId,
          type: isConfirmed ? 'game-confirmed' : playersNeed > 0 ? 'game-needs' : 'checkin',
          memberId: normalizeName(p.name),
          memberName: p.name,
          gameDate: date,
          playStyle: p.playStyle,
          playersHave,
          playersNeed,
          timestamp: p.timestamp,
          isFollowed: followedIds.includes(normalizeName(p.name)),
          isRead: readActivityIds.value.has(activityId),
        };
      });

      games.set(gameKey, {
        gameDate: date,
        playStyle: isDoubles ? 'doubles' : 'singles',
        playersHave,
        playersNeed,
        isConfirmed,
        activities: activityItems,
        lastActivity: Math.max(...match.players.map((p) => p.timestamp)),
      });
    });
  });

  // Sort by lastActivity descending
  return Array.from(games.values()).sort((a, b) => b.lastActivity - a.lastActivity);
});

/**
 * Unread count for badge
 */
const unreadCount = computed(() => {
  return activities.value.filter((a) => !a.isRead).length;
});

// ============================================
// Actions
// ============================================

/**
 * Save read IDs to localStorage
 */
function saveReadIds(ids: Set<string>) {
  try {
    // Keep only last 500 to prevent unbounded growth
    const arr = Array.from(ids).slice(-500);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  } catch {
    // Ignore storage errors
  }
}

/**
 * Mark an activity as read
 */
function markAsRead(activityId: string) {
  const newSet = new Set([...readActivityIds.value, activityId]);
  readActivityIds.value = newSet;
  saveReadIds(newSet);
}

/**
 * Mark all activities as read
 */
function markAllAsRead() {
  const allIds = activities.value.map((a) => a.id);
  const newSet = new Set([...readActivityIds.value, ...allIds]);
  readActivityIds.value = newSet;
  saveReadIds(newSet);
}

/**
 * Toggle follow status for a member
 */
function toggleFollow(memberId: string) {
  const normalizedId = normalizeName(memberId);
  const current = notificationPrefs.value.followedMemberIds;

  if (current.includes(normalizedId)) {
    notificationPrefs.value = {
      ...notificationPrefs.value,
      followedMemberIds: current.filter((id) => id !== normalizedId),
    };
  } else {
    notificationPrefs.value = {
      ...notificationPrefs.value,
      followedMemberIds: [...current, normalizedId],
    };
  }
}

/**
 * Check if member is followed
 */
function isFollowed(memberId: string): boolean {
  return notificationPrefs.value.followedMemberIds.includes(normalizeName(memberId));
}

/**
 * Update notification preferences
 */
function updateNotificationPrefs(prefs: Partial<ActivityNotificationPrefs>) {
  notificationPrefs.value = { ...notificationPrefs.value, ...prefs };
}

// ============================================
// Firebase Listeners
// ============================================

/**
 * Set up real-time listeners for activity and checkins
 */
function setupListeners(groupId: string) {
  const db = getDatabase();

  // Listen to activity log
  const activityRef = db.ref(`groups/${groupId}/activity`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  activityRef.on('value', (snapshot: any) => {
    rawActivity.value = (snapshot.val() as Record<string, Record<string, ActivityEntry>>) || {};
  });

  // Listen to checkins
  const checkinsRef = db.ref(`groups/${groupId}/checkins`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkinsRef.on('value', (snapshot: any) => {
    rawCheckins.value = (snapshot.val() as Record<string, CheckinData[]>) || {};
    isLoading.value = false;
  });

  // Load notification prefs
  loadNotificationPrefs(groupId);

  // Return cleanup function
  return () => {
    activityRef.off('value');
    checkinsRef.off('value');
  };
}

/**
 * Load notification preferences from Firebase
 */
async function loadNotificationPrefs(groupId: string) {
  // For now, load from localStorage (could migrate to Firebase later)
  const stored = localStorage.getItem(`activity-prefs-${groupId}`);
  if (stored) {
    try {
      const prefs = JSON.parse(stored);
      notificationPrefs.value = { ...notificationPrefs.value, ...prefs };
    } catch (e) {
      // Ignore parse errors
    }
  }
}

/**
 * Save notification preferences
 */
function saveNotificationPrefs(groupId: string) {
  localStorage.setItem(`activity-prefs-${groupId}`, JSON.stringify(notificationPrefs.value));
}

// ============================================
// Hook
// ============================================

export function useActivityFeed(groupId: string | null) {
  useEffect(() => {
    if (!groupId) {
      isLoading.value = false;
      return;
    }

    const cleanup = setupListeners(groupId);
    return cleanup;
  }, [groupId]);

  return {
    // Data
    activities,
    gameActivities,
    unreadCount,
    isLoading,
    notificationPrefs,

    // Actions
    markAsRead,
    markAllAsRead,
    toggleFollow,
    isFollowed,
    updateNotificationPrefs,
    saveNotificationPrefs: () => groupId && saveNotificationPrefs(groupId),
  };
}

// ============================================
// Utility Functions
// ============================================

/**
 * Format relative time (e.g., "just now", "5m ago", "2h ago")
 */
export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  if (diff < 60000) {
    return 'just now';
  }
  if (diff < 3600000) {
    return `${Math.floor(diff / 60000)}m ago`;
  }
  if (diff < 86400000) {
    return `${Math.floor(diff / 3600000)}h ago`;
  }

  const date = new Date(timestamp);
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

/**
 * Get action for an activity item
 * For past dates, only "View" action is available
 */
export function getActivityAction(
  item: ActivityItem,
  currentUserCheckedIn: boolean
): { type: string; label: string; primary: boolean } | null {
  // Check if the game date is in the past
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const gameDate = item.gameDate ? new Date(item.gameDate + 'T00:00:00') : null;
  const isPastDate = gameDate && gameDate < today;

  // For past dates, only allow View action
  if (isPastDate) {
    if (item.type === 'new-member') {
      return null; // No action for past new-member notifications
    }
    return { type: 'view', label: 'View', primary: false };
  }

  switch (item.type) {
    case 'checkin':
    case 'game-needs':
      if (!currentUserCheckedIn && item.playersNeed && item.playersNeed > 0) {
        return { type: 'join', label: 'Join', primary: true };
      }
      return { type: 'view', label: 'View', primary: false };

    case 'game-confirmed':
      return { type: 'view', label: 'View', primary: false };

    case 'game-dissolved':
      if (!currentUserCheckedIn) {
        return { type: 'join', label: 'Fill In', primary: true };
      }
      return { type: 'view', label: 'View', primary: false };

    case 'new-member':
      return { type: 'welcome', label: 'Welcome', primary: false };

    default:
      return null;
  }
}

// ============================================
// Exported Signals (for use outside the hook)
// ============================================

/**
 * Activity unread count - exported for badge display in BottomTabBar
 */
export { unreadCount as activityUnreadCount };
