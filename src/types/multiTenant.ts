/**
 * Multi-tenant type definitions for Tennis Coordinator
 *
 * This file contains types for the multi-club architecture:
 * - Platform-wide users with device token authentication
 * - Clubs as top-level organizations containing groups
 * - Independent groups (not part of any club)
 * - Public user profiles for player discovery
 *
 * Hierarchy options:
 * - Platform -> Clubs -> Groups (organized play)
 * - Platform -> Independent Groups (casual/informal)
 * - Platform -> Users with public profiles (discovery)
 */

import type {
  WeatherLocation,
  CheckinData,
  ActivityEntry,
  NotificationItem,
  NotificationPreferences,
  MatchArrangement,
} from './index';

// ============================================
// User Types (Platform-wide)
// ============================================

/**
 * Roles a user can have within a club
 */
export type ClubRole = 'owner' | 'admin' | 'member';

/**
 * Skill levels for player matching
 */
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'competitive' | 'pro';

/**
 * Gender options for player profiles
 */
export type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say';

/**
 * Play preferences for discovery
 */
export interface PlayPreferences {
  prefersSingles: boolean;
  prefersDoubles: boolean;
  prefersMixed: boolean;
  availableDays?: string[];  // e.g., ['monday', 'wednesday', 'saturday']
  preferredTimes?: string[]; // e.g., ['morning', 'afternoon', 'evening']
}

/**
 * User's location for discovery/matching
 */
export interface UserLocation {
  city: string;
  state?: string;
  country: string;
  lat?: number;
  lon?: number;
  radiusMiles?: number;  // How far they're willing to travel
}

/**
 * Public profile visibility settings
 */
export interface ProfileVisibility {
  isPublic: boolean;           // Can be found in player discovery
  showEmail: boolean;
  showPhone: boolean;
  showSkillLevel: boolean;
  showLocation: boolean;
  showPlayPreferences: boolean;
}

/**
 * User profile information (platform-wide)
 */
export interface UserProfile {
  displayName: string;
  email?: string;
  phone?: string;
  createdAt: number;
  lastActiveAt?: number;

  // Public profile fields for discovery
  bio?: string;
  skillLevel?: SkillLevel;
  gender?: Gender;
  birthYear?: number;  // For age-based matching
  location?: UserLocation;
  playPreferences?: PlayPreferences;
  visibility: ProfileVisibility;

  // Optional: link to external profiles
  utaRating?: string;  // USTA rating like "4.0"
  ntrpRating?: number; // NTRP numeric rating
}

/**
 * A user's membership in a specific club
 */
export interface ClubMembership {
  clubId: string;
  role: ClubRole;
  displayName: string;  // Name shown within this club
  joinedAt: number;
  groups: Record<string, boolean>;  // groupId -> true for groups they're in
}

/**
 * User settings (platform-wide)
 */
export interface UserSettings {
  defaultClubId?: string;
  notifications: NotificationPreferences;
}

/**
 * A platform user (identified by device token or authenticated account)
 */
export interface PlatformUser {
  id: string;  // UUID (device token) or Firebase Auth UID
  profile: UserProfile;
  memberships: Record<string, ClubMembership>;  // clubId -> membership
  settings: UserSettings;
}

// ============================================
// Club Types
// ============================================

/**
 * Policy for how users can join a club
 */
export type JoinPolicy = 'open' | 'invite' | 'request';

/**
 * Basic club information
 */
export interface ClubInfo {
  name: string;
  shortCode: string;  // URL-friendly code, e.g., "LGTC"
  description?: string;
  location?: WeatherLocation;
  createdAt: number;
  createdBy: string;  // userId
}

/**
 * Club-level settings
 */
export interface ClubSettings {
  joinPolicy: JoinPolicy;
  memberPin?: string;  // Optional PIN for "open" clubs
  features: {
    guestCheckins: boolean;
    maxGroups: number;
  };
}

/**
 * A member of a club (stored in club's members collection)
 */
export interface ClubMember {
  userId: string;
  role: ClubRole;
  displayName: string;
  joinedAt: number;
  status: 'active' | 'inactive';
  phone?: string;
  email?: string;
  notes?: string;
}

/**
 * An invite to join a club
 */
export interface ClubInvite {
  code: string;
  clubId: string;
  createdBy: string;  // userId
  createdAt: number;
  expiresAt: number;
  usedBy?: string;  // userId who used it
  usedAt?: number;
  maxUses?: number;
  useCount: number;
}

/**
 * A club (top-level organization)
 */
export interface Club {
  id: string;
  info: ClubInfo;
  settings: ClubSettings;
  members: Record<string, ClubMember>;  // userId -> member
  groups: Record<string, ClubGroup>;    // groupId -> group
  invites?: Record<string, ClubInvite>; // inviteCode -> invite
}

// ============================================
// Independent Group Types (not part of a club)
// ============================================

/**
 * An independent group (not affiliated with any club)
 * These are casual/informal playing groups
 */
export interface IndependentGroup {
  id: string;
  name: string;
  shortCode?: string;
  description?: string;
  location?: WeatherLocation;
  createdAt: number;
  createdBy: string;  // userId of creator (becomes owner)
  settings: {
    isPublic: boolean;     // Can be found in group discovery
    joinPolicy: JoinPolicy;
    groupPin?: string;     // For PIN-protected groups
    adminPin?: string;
    allowGuests: boolean;
    maxPlayers?: number;
    rules?: string;
  };
  members: Record<string, {
    userId: string;
    role: 'owner' | 'admin' | 'member';
    displayName: string;
    joinedAt: number;
  }>;
}

// ============================================
// Group Types (within a Club)
// ============================================

/**
 * A member of a specific group (subset of club members)
 */
export interface GroupMember {
  userId: string;
  role: 'admin' | 'member';
  joinedAt: number;
}

/**
 * Group-specific settings
 */
export interface GroupSettings {
  allowGuests: boolean;
  maxPlayers?: number;
  rules?: string;
  adminPin?: string;  // Optional separate admin PIN for group
}

/**
 * A group within a club (a playing session)
 */
export interface ClubGroup {
  id: string;
  clubId: string;
  name: string;
  shortCode?: string;  // Optional URL-friendly code
  description?: string;
  schedule?: string;  // e.g., "Tuesdays 6pm"
  location?: WeatherLocation;  // Override club location
  settings: GroupSettings;
  members: Record<string, GroupMember>;  // userId -> member
}

/**
 * Group data (the actual check-ins, activity, etc.)
 */
export interface GroupData {
  checkins: Record<string, CheckinData[]>;  // date -> checkins
  activity: Record<string, Record<string, ActivityEntry>>;  // date -> id -> entry
  matchNotes: Record<string, Record<string, string>>;  // date -> matchKey -> note
  matchArrangements: Record<string, MatchArrangement>;  // date -> arrangement
}

// ============================================
// Check-in Types (Multi-tenant version)
// ============================================

/**
 * Extended check-in data with user ID
 */
export interface MultiTenantCheckin extends CheckinData {
  userId: string;  // Platform user ID
  // displayName is inherited from CheckinData.name
}

// ============================================
// Notification Types (Multi-tenant version)
// ============================================

/**
 * User notification data scoped to a club
 */
export interface ClubUserNotifications {
  preferences: NotificationPreferences;
  items: Record<string, NotificationItem>;  // notificationId -> item
}

// ============================================
// Platform Types
// ============================================

/**
 * Site-wide settings
 */
export interface PlatformSettings {
  siteAdminPin: string;
  platformAdmins: Record<string, boolean>;  // userId -> true
}

/**
 * The complete platform data structure (for migration reference)
 */
export interface PlatformData {
  users: Record<string, PlatformUser>;
  clubs: Record<string, Club>;
  clubData: Record<string, Record<string, GroupData>>;  // clubId -> groupId -> data
  siteSettings: PlatformSettings;
}

// ============================================
// Migration Types
// ============================================

/**
 * Mapping from old group structure to new club/group structure
 */
export interface MigrationMapping {
  oldGroupId: string;
  newClubId: string;
  newGroupId: string;
  memberMappings: Record<string, string>;  // oldMemberName -> newUserId
}

/**
 * Migration result
 */
export interface MigrationResult {
  success: boolean;
  mappings: MigrationMapping[];
  errors: string[];
  warnings: string[];
  stats: {
    groupsMigrated: number;
    usersCreated: number;
    checkinsPreserved: number;
    activitiesPreserved: number;
  };
}

// ============================================
// Legacy Compatibility Types
// ============================================

/**
 * Detect whether data is in old or new format
 */
export type DataFormat = 'legacy' | 'multitenant';

/**
 * Configuration for the compatibility layer
 */
export interface CompatibilityConfig {
  format: DataFormat;
  legacyGroupId?: string;  // If legacy, which group
  clubId?: string;         // If multi-tenant, which club
  groupId?: string;        // If multi-tenant, which group
}

// ============================================
// URL Routing Types
// ============================================

/**
 * Parsed URL route information
 */
export interface ParsedRoute {
  type: 'landing' | 'club' | 'group' | 'join' | 'admin' | 'legacy';
  clubShortCode?: string;
  groupShortCode?: string;
  inviteCode?: string;
  legacyGroupId?: string;
}

// ============================================
// Helper Types
// ============================================

/**
 * Generate a unique ID for a new entity
 */
export type GenerateId = () => string;

/**
 * Resolve a short code to its full ID
 */
export type ResolveShortCode = (
  shortCode: string,
  type: 'club' | 'group' | 'independent',
  clubId?: string
) => Promise<string | null>;

// ============================================
// Player Discovery Types
// ============================================

/**
 * Search filters for player discovery
 */
export interface PlayerSearchFilters {
  location?: {
    city?: string;
    state?: string;
    country?: string;
    lat?: number;
    lon?: number;
    radiusMiles?: number;
  };
  skillLevels?: SkillLevel[];
  genders?: Gender[];
  ageRange?: {
    min?: number;
    max?: number;
  };
  playPreferences?: {
    singles?: boolean;
    doubles?: boolean;
    mixed?: boolean;
  };
  availableDays?: string[];
  availableTimes?: string[];
}

/**
 * A public player profile returned from search
 */
export interface PublicPlayerProfile {
  userId: string;
  displayName: string;
  bio?: string;
  skillLevel?: SkillLevel;
  gender?: Gender;
  location?: {
    city: string;
    state?: string;
    country: string;
  };
  playPreferences?: PlayPreferences;
  utaRating?: string;
  lastActiveAt?: number;
  // Contact info only if visibility allows
  email?: string;
  phone?: string;
}

/**
 * Player search results
 */
export interface PlayerSearchResults {
  players: PublicPlayerProfile[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ============================================
// Connection / Messaging Types (Future)
// ============================================

/**
 * Connection request between players
 */
export interface ConnectionRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  message?: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: number;
  respondedAt?: number;
}

/**
 * User connections (tennis buddies)
 */
export interface UserConnections {
  connections: Record<string, {
    userId: string;
    displayName: string;
    connectedAt: number;
  }>;
  pendingReceived: Record<string, ConnectionRequest>;
  pendingSent: Record<string, ConnectionRequest>;
}

// ============================================
// Updated Platform Data Structure
// ============================================

/**
 * The complete platform data structure (updated for full vision)
 */
export interface PlatformDataV2 {
  // Users with full profiles
  users: Record<string, PlatformUser>;

  // Organized clubs with their groups
  clubs: Record<string, Club>;
  clubData: Record<string, Record<string, GroupData>>;  // clubId -> groupId -> data

  // Independent groups (not part of any club)
  independentGroups: Record<string, IndependentGroup>;
  independentGroupData: Record<string, GroupData>;  // groupId -> data

  // User connections/friends
  userConnections: Record<string, UserConnections>;  // userId -> connections

  // Site settings
  siteSettings: PlatformSettings;

  // Public profile index (for discovery - this would be a separate optimized index)
  // In Firebase, this might be stored separately for efficient querying
  publicProfiles?: Record<string, PublicPlayerProfile>;  // userId -> public profile
}
