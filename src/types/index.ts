/**
 * Core type definitions for Tennis Coordinator
 */

// ============================================
// Play Style Types
// ============================================

export type PlayStyle = 'singles' | 'doubles' | 'both';

export type PlayStyleLabel = 'Singles Only' | 'Doubles Only' | 'Either';

// ============================================
// Time-related Types
// ============================================

export interface TimeRange {
  start: string; // e.g., "2:00 PM"
  end: string; // e.g., "4:00 PM"
}

export interface WeatherLocation {
  name: string;
  lat: number;
  lon: number;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
}

export interface WeatherCache {
  [date: string]: {
    data: WeatherData;
    timestamp: number;
  };
}

// ============================================
// Member Types
// ============================================

export interface MemberDetails {
  addedBy: string;
  addedDate: number;
  phone?: string;
  email?: string;
  notes?: string;
}

export interface MemberDetailsMap {
  [memberName: string]: MemberDetails;
}

// ============================================
// Check-in Types
// ============================================

export interface CheckinData {
  name: string;
  playStyle?: PlayStyle; // 'singles' | 'doubles' | 'both' (defaults to 'both')
  timestamp: number;
  timeRange?: TimeRange;
  allowRotation?: boolean; // defaults to true
  addedBy?: string;
  isGuest?: boolean;
  guestOf?: string;
  originalIndex?: number; // Used during match organization
}

export interface CheckinsByDate {
  [date: string]: CheckinData[];
}

// ============================================
// User Preferences Types
// ============================================

export interface UserPreference {
  include: string[];
  exclude: string[];
}

export interface UserPreferences {
  [normalizedName: string]: UserPreference;
}

// ============================================
// Notification Types
// ============================================

export type NotificationType =
  | 'checkin'
  | 'removal'
  | 'match_formed'
  | 'match_dissolved'
  | 'member_added'
  | 'member_removed';

export interface NotificationItem {
  message: string;
  timestamp: number;
  read: boolean;
  type: NotificationType;
  date?: string;
  player?: string;
  matchType?: string;
}

export interface NotificationPreferences {
  activityAlerts: boolean;
  matchConfirmations: boolean;
  mutedMembers?: string[];
}

export interface UserNotificationData {
  preferences: NotificationPreferences;
  items?: {
    [id: string]: NotificationItem;
  };
}

export interface GroupNotifications {
  [normalizedUsername: string]: UserNotificationData;
}

// ============================================
// Activity Log Types
// ============================================

export type ActivityAction =
  | 'check-in'
  | 'removal'
  | 'member_added'
  | 'member_removed'
  | 'whatsapp_share'
  | 'notes_saved'
  | 'arrangement_saved'
  | 'arrangement_cleared';

export interface ActivityEntry {
  timestamp: number;
  action: ActivityAction;
  player: string;
  by: string;
  playStyle?: PlayStyle;
  timeRange?: TimeRange;
  contact?: string;
  notes?: string;
  type?: string; // for whatsapp_share
  matchKey?: string; // for notes_saved
  matchCount?: number; // for arrangement_saved - number of matches arranged
  playerCount?: number; // for arrangement_saved - total players arranged
  arrangementDetails?: string; // for arrangement_saved - human-readable description of arrangement
}

export interface ActivityByDate {
  [date: string]: {
    [id: string]: ActivityEntry;
  };
}

// ============================================
// Match Types
// ============================================

export type MatchType =
  | 'doubles'
  | 'singles'
  | 'doubles-forming'
  | 'singles-forming'
  | 'singles-or-practice'
  | 'waiting';

export interface Match {
  type: MatchType;
  number?: number; // For doubles matches: Doubles 1, Doubles 2, etc.
  players: CheckinData[];
  needed?: number; // For forming matches: how many more players needed
  canRotate?: boolean; // For 3-player doubles-forming that can rotate
  eitherCount?: number; // Count of "Either" players in forming match
  canPlaySingles?: boolean; // Whether forming players can play singles
}

export interface OrganizeMatchesResult {
  matches: Match[];
  warnings: string[];
}

// ============================================
// Match Arrangement Types (Admin Override)
// ============================================

export interface MatchArrangement {
  matches: {
    [matchKey: string]: {
      // e.g., "doubles-1", "doubles-2", "singles-1"
      players: string[]; // Player names in this match
      note?: string; // Optional time note like "12pm start"
    };
  };
  unassigned: string[]; // Players not assigned to any match
  arrangedBy: string; // Admin who set this
  arrangedAt: number; // Timestamp
}

// ============================================
// Group / Settings Types
// ============================================

export interface GroupSettings {
  groupName: string;
  members: string[];
  memberDetails?: MemberDetailsMap;
  groupPin: string;
  adminPin: string;
  location?: WeatherLocation;
}

export interface GroupData {
  settings: GroupSettings;
  checkins?: CheckinsByDate;
  activity?: ActivityByDate;
  userNotifications?: GroupNotifications;
  matchNotes?: {
    [date: string]: {
      [matchKey: string]: string;
    };
  };
}

export interface AvailableGroups {
  [groupId: string]: {
    name: string;
    shortCode?: string;
  };
}

// ============================================
// Firebase References Types
// ============================================

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

// ============================================
// App State Types
// ============================================

export interface AppState {
  // Group state
  currentGroupId: string | null;
  currentGroupName: string;
  availableGroups: AvailableGroups;

  // Data state
  allCheckins: CheckinsByDate;
  userPreferences: UserPreferences;
  coreMembers: string[];
  memberDetails: MemberDetailsMap;
  matchNotes: { [matchKey: string]: string };

  // Settings
  groupPin: string;
  adminPin: string;
  weatherLocation: WeatherLocation;
  weatherCache: WeatherCache;

  // UI state
  selectedDate: string | null;
  selectedPreference: PlayStyle;
  selectedName: string;
  isGuest: boolean;
  addedBy: string;

  // Session state
  sessionUser: string;

  // Preferences editing state
  currentEditingUser: string | null;
  tempInclude: string[];
  tempExclude: string[];

  // Notification state
  userNotificationPrefs: NotificationPreferences;
}

// ============================================
// Function Types
// ============================================

export type NormalizeName = (name: string) => string;

export type FormatTimeRange = (start?: string, end?: string) => string;

export type GetPreferenceLabel = (preference: PlayStyle) => PlayStyleLabel;

// ============================================
// Event Types
// ============================================

export interface CheckinEvent {
  type: 'checkin';
  player: string;
  date: string;
  data: CheckinData;
}

export interface RemovalEvent {
  type: 'removal';
  player: string;
  date: string;
  removedBy?: string;
}

export interface MemberEvent {
  type: 'member_added' | 'member_removed';
  member: string;
  by: string;
  contact?: string;
}

export type AppEvent = CheckinEvent | RemovalEvent | MemberEvent;
