/**
 * Activity Feed Types
 *
 * Types for the unified activity/notification system that shows
 * real-time group activity with actionable items.
 */

import type { PlayStyle } from './sportConfig';

// ============================================
// Activity Types
// ============================================

export type ActivityType =
  | 'checkin' // Player checked in
  | 'game-needs' // Game needs more players
  | 'game-confirmed' // Game is confirmed (full)
  | 'game-dissolved' // Game fell apart (player removed)
  | 'new-member' // New member joined the group
  | 'invite'; // Direct invite to a game

// ============================================
// Activity Item
// ============================================

export interface ActivityItem {
  id: string;
  type: ActivityType;
  memberId: string; // Who triggered the activity
  memberName: string;
  gameId?: string; // For game-related activities
  gameDate?: string; // YYYY-MM-DD format
  playStyle?: PlayStyle; // singles, doubles, both
  playersHave?: number; // Current player count
  playersNeed?: number; // Players still needed
  timestamp: number;
  isFollowed: boolean; // Is this member followed by current user
  isRead: boolean;
}

// ============================================
// Activity Action
// ============================================

export type ActivityActionType = 'join' | 'view' | 'checkin' | 'welcome' | 'invite';

export interface ActivityAction {
  type: ActivityActionType;
  label: string;
  primary: boolean; // Highlighted vs subtle styling
  gameDate?: string; // For join/view actions
}

// ============================================
// Game Activity (Grouped)
// ============================================

export interface GameActivity {
  gameDate: string;
  playStyle: PlayStyle;
  playersHave: number;
  playersNeed: number;
  isConfirmed: boolean;
  activities: ActivityItem[]; // Check-ins for this game
  lastActivity: number; // Most recent timestamp
}

// ============================================
// Notification Preferences
// ============================================

export type NotificationLevel = 'in-app' | 'badge' | 'sms';

export interface ActivityNotificationPrefs {
  followedMembers: NotificationLevel;
  gameNeedsPlayers: NotificationLevel;
  gameConfirmed: NotificationLevel;
  phone?: string; // Phone number for SMS (future)
  smsOptIn?: boolean; // User opted in to receive SMS (default: false)
  pushEnabled?: boolean; // Push notifications enabled
  pushToken?: string; // FCM token for push notifications
  followedMemberIds: string[]; // Normalized names of followed members
}

// ============================================
// Activity Feed State
// ============================================

export interface ActivityFeedState {
  activities: ActivityItem[];
  gameActivities: GameActivity[]; // Grouped by forming game
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
}
