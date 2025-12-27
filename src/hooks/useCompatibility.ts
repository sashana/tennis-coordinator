/**
 * Compatibility Layer Hook for Multi-Tenant Migration
 *
 * This hook provides a unified API for accessing data during the migration period
 * when both legacy (single-group) and new multi-tenant data structures may exist.
 *
 * Key responsibilities:
 * - Detect data format (legacy vs. multi-tenant)
 * - Provide consistent data access regardless of format
 * - Handle URL routing for both structures
 * - Manage user identity across formats
 */

import { signal, computed } from '@preact/signals';
import type { GroupSettings, WeatherLocation } from '../types/index';
import type {
  DataFormat,
  CompatibilityConfig,
  ParsedRoute,
  PlatformUser,
  IndependentGroup,
  ClubGroup,
  Club,
} from '../types/multiTenant';

// ============================================
// Signals for Compatibility State
// ============================================

/**
 * Current data format being used
 */
export const dataFormat = signal<DataFormat>('legacy');

/**
 * Current compatibility configuration
 */
export const compatConfig = signal<CompatibilityConfig>({
  format: 'legacy',
});

/**
 * Current platform user (if multi-tenant)
 */
export const currentPlatformUser = signal<PlatformUser | null>(null);

/**
 * Current independent group (if accessing a standalone group)
 */
export const currentIndependentGroup = signal<IndependentGroup | null>(null);

/**
 * Current club (if accessing a club-affiliated group)
 */
export const currentClub = signal<Club | null>(null);

/**
 * Current club group (if accessing a club-affiliated group)
 */
export const currentClubGroup = signal<ClubGroup | null>(null);

// ============================================
// Route Parsing
// ============================================

/**
 * Parse the current URL into a structured route
 */
export function parseRoute(pathname: string, search: string): ParsedRoute {
  // Remove leading slash and split
  const parts = pathname.slice(1).split('/').filter(Boolean);

  // Check for query parameter (legacy style: ?group=xyz)
  const params = new URLSearchParams(search);
  const legacyGroupId = params.get('group');

  if (legacyGroupId) {
    return {
      type: 'legacy',
      legacyGroupId,
    };
  }

  // Empty path = landing page
  if (parts.length === 0) {
    return { type: 'landing' };
  }

  // Single segment
  if (parts.length === 1) {
    const segment = parts[0];

    // Check for special routes
    if (segment === 'admin') {
      return { type: 'admin' };
    }

    // Check if it looks like a join code
    if (segment.startsWith('join-') || segment.length === 8) {
      return {
        type: 'join',
        inviteCode: segment.replace('join-', ''),
      };
    }

    // Could be a club short code OR a legacy group short code
    // In legacy mode, treat as legacy group
    // In multi-tenant mode, treat as club
    if (dataFormat.value === 'legacy') {
      return {
        type: 'legacy',
        legacyGroupId: segment,
      };
    }

    return {
      type: 'club',
      clubShortCode: segment,
    };
  }

  // Two segments: /club/group
  if (parts.length === 2) {
    return {
      type: 'group',
      clubShortCode: parts[0],
      groupShortCode: parts[1],
    };
  }

  // Unknown route, default to landing
  return { type: 'landing' };
}

/**
 * Computed current route from window location
 */
export const currentRoute = computed(() => {
  if (typeof window === 'undefined') {
    return { type: 'landing' } as ParsedRoute;
  }
  return parseRoute(window.location.pathname, window.location.search);
});

// ============================================
// Data Format Detection
// ============================================

/**
 * Check if data at a given path exists in Firebase
 */
async function checkPathExists(
  db: ReturnType<typeof import('../config/firebase').getDatabase>,
  path: string
): Promise<boolean> {
  try {
    const snapshot = await db.ref(path).once('value');
    return snapshot.val() !== null;
  } catch {
    return false;
  }
}

/**
 * Detect the data format by checking Firebase structure
 */
export async function detectDataFormat(
  db: ReturnType<typeof import('../config/firebase').getDatabase>
): Promise<DataFormat> {
  // Check for multi-tenant structure
  const hasMultiTenant = await checkPathExists(db, 'platform');

  if (hasMultiTenant) {
    dataFormat.value = 'multitenant';
    return 'multitenant';
  }

  // Check for legacy structure
  const hasLegacy = await checkPathExists(db, 'groups');

  if (hasLegacy) {
    dataFormat.value = 'legacy';
    return 'legacy';
  }

  // Default to legacy (empty database)
  dataFormat.value = 'legacy';
  return 'legacy';
}

// ============================================
// User Identity
// ============================================

/**
 * Get or create a device token for anonymous user identification
 */
export function getDeviceToken(): string {
  const storageKey = 'deviceToken';

  // Check existing token
  let token = localStorage.getItem(storageKey);

  if (!token) {
    // Generate new UUID
    token = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    localStorage.setItem(storageKey, token);
  }

  return token;
}

/**
 * Get the current session user name (legacy style)
 */
export function getLegacySessionUser(groupId: string): string | null {
  const storageKey = `sessionUser_${groupId}`;
  return localStorage.getItem(storageKey);
}

/**
 * Set the current session user name (legacy style)
 */
export function setLegacySessionUser(groupId: string, userName: string): void {
  const storageKey = `sessionUser_${groupId}`;
  localStorage.setItem(storageKey, userName);
}

// ============================================
// Data Path Resolution
// ============================================

/**
 * Get the Firebase path for checkins based on current config
 */
export function getCheckinsPath(date: string): string {
  const config = compatConfig.value;

  if (config.format === 'legacy' && config.legacyGroupId) {
    return `groups/${config.legacyGroupId}/checkins/${date}`;
  }

  if (config.format === 'multitenant') {
    if (config.clubId && config.groupId) {
      // Club-affiliated group
      return `platform/clubData/${config.clubId}/${config.groupId}/checkins/${date}`;
    }
    if (config.groupId) {
      // Independent group
      return `platform/independentGroupData/${config.groupId}/checkins/${date}`;
    }
  }

  throw new Error('Invalid compatibility config for checkins path');
}

/**
 * Get the Firebase path for activity based on current config
 */
export function getActivityPath(date: string): string {
  const config = compatConfig.value;

  if (config.format === 'legacy' && config.legacyGroupId) {
    return `groups/${config.legacyGroupId}/activity/${date}`;
  }

  if (config.format === 'multitenant') {
    if (config.clubId && config.groupId) {
      return `platform/clubData/${config.clubId}/${config.groupId}/activity/${date}`;
    }
    if (config.groupId) {
      return `platform/independentGroupData/${config.groupId}/activity/${date}`;
    }
  }

  throw new Error('Invalid compatibility config for activity path');
}

/**
 * Get the Firebase path for match arrangements based on current config
 */
export function getArrangementsPath(date: string): string {
  const config = compatConfig.value;

  if (config.format === 'legacy' && config.legacyGroupId) {
    return `groups/${config.legacyGroupId}/matchArrangements/${date}`;
  }

  if (config.format === 'multitenant') {
    if (config.clubId && config.groupId) {
      return `platform/clubData/${config.clubId}/${config.groupId}/matchArrangements/${date}`;
    }
    if (config.groupId) {
      return `platform/independentGroupData/${config.groupId}/matchArrangements/${date}`;
    }
  }

  throw new Error('Invalid compatibility config for arrangements path');
}

/**
 * Get the Firebase path for match notes based on current config
 */
export function getMatchNotesPath(date: string): string {
  const config = compatConfig.value;

  if (config.format === 'legacy' && config.legacyGroupId) {
    return `groups/${config.legacyGroupId}/matchNotes/${date}`;
  }

  if (config.format === 'multitenant') {
    if (config.clubId && config.groupId) {
      return `platform/clubData/${config.clubId}/${config.groupId}/matchNotes/${date}`;
    }
    if (config.groupId) {
      return `platform/independentGroupData/${config.groupId}/matchNotes/${date}`;
    }
  }

  throw new Error('Invalid compatibility config for match notes path');
}

/**
 * Get the Firebase path for group settings based on current config
 */
export function getSettingsPath(): string {
  const config = compatConfig.value;

  if (config.format === 'legacy' && config.legacyGroupId) {
    return `groups/${config.legacyGroupId}/settings`;
  }

  if (config.format === 'multitenant') {
    if (config.clubId && config.groupId) {
      // Club group settings are nested under the club
      return `platform/clubs/${config.clubId}/groups/${config.groupId}/settings`;
    }
    if (config.groupId) {
      return `platform/independentGroups/${config.groupId}/settings`;
    }
  }

  throw new Error('Invalid compatibility config for settings path');
}

// ============================================
// Unified Data Access
// ============================================

/**
 * Unified interface for group settings (works with both formats)
 */
export interface UnifiedGroupSettings {
  groupName: string;
  members: string[];
  memberDetails?: Record<string, { phone?: string; email?: string; notes?: string }>;
  groupPin: string;
  adminPin: string;
  location?: WeatherLocation;
  groupDescription?: string;
  groupRules?: string;
}

/**
 * Convert legacy settings to unified format
 */
export function legacyToUnifiedSettings(legacy: GroupSettings): UnifiedGroupSettings {
  return {
    groupName: legacy.groupName,
    members: legacy.members,
    memberDetails: legacy.memberDetails,
    groupPin: legacy.groupPin,
    adminPin: legacy.adminPin,
    location: legacy.location,
  };
}

/**
 * Convert independent group to unified settings format
 */
export function independentGroupToUnifiedSettings(group: IndependentGroup): UnifiedGroupSettings {
  return {
    groupName: group.name,
    members: Object.values(group.members).map((m) => m.displayName),
    groupPin: group.settings.groupPin || '',
    adminPin: group.settings.adminPin || '',
    location: group.location,
    groupDescription: group.description,
    groupRules: group.settings.rules,
  };
}

/**
 * Convert club group to unified settings format
 */
export function clubGroupToUnifiedSettings(group: ClubGroup, club: Club): UnifiedGroupSettings {
  // Get members from both club membership and group membership
  const memberNames: string[] = [];
  for (const member of Object.values(group.members)) {
    const clubMember = club.members[member.userId];
    if (clubMember) {
      memberNames.push(clubMember.displayName);
    }
  }

  return {
    groupName: group.name,
    members: memberNames,
    groupPin: '', // Club groups use club-level PIN
    adminPin: group.settings.adminPin || '',
    location: group.location || club.info.location,
    groupDescription: group.description,
    groupRules: group.settings.rules,
  };
}

// ============================================
// Configuration Initialization
// ============================================

/**
 * Initialize compatibility config based on current URL and detected format
 */
export function initCompatConfig(route: ParsedRoute, format: DataFormat): CompatibilityConfig {
  const config: CompatibilityConfig = { format };

  if (format === 'legacy') {
    if (route.type === 'legacy' && route.legacyGroupId) {
      config.legacyGroupId = route.legacyGroupId;
    }
  } else if (format === 'multitenant') {
    if (route.type === 'club' && route.clubShortCode) {
      // Need to resolve club short code to ID
      // This would be done via a lookup
      config.clubId = route.clubShortCode; // Placeholder
    } else if (route.type === 'group' && route.clubShortCode && route.groupShortCode) {
      config.clubId = route.clubShortCode;
      config.groupId = route.groupShortCode;
    }
  }

  compatConfig.value = config;
  return config;
}

// ============================================
// Migration Status
// ============================================

/**
 * Check if a migration is needed (legacy data exists but multi-tenant doesn't)
 */
export async function checkMigrationNeeded(
  db: ReturnType<typeof import('../config/firebase').getDatabase>
): Promise<boolean> {
  const hasLegacy = await checkPathExists(db, 'groups');
  const hasMultiTenant = await checkPathExists(db, 'platform');

  return hasLegacy && !hasMultiTenant;
}

/**
 * Check if running in hybrid mode (both formats exist)
 */
export async function checkHybridMode(
  db: ReturnType<typeof import('../config/firebase').getDatabase>
): Promise<boolean> {
  const hasLegacy = await checkPathExists(db, 'groups');
  const hasMultiTenant = await checkPathExists(db, 'platform');

  return hasLegacy && hasMultiTenant;
}

// ============================================
// Exports
// ============================================

export type { DataFormat, CompatibilityConfig, ParsedRoute };
