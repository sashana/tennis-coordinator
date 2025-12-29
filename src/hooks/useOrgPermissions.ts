/**
 * Organization permissions hook
 *
 * Provides permission checking for organization admins.
 * Uses device token to look up admin scope and filter visible groups.
 */

import { useEffect } from 'preact/hooks';
import { signal, computed } from '@preact/signals';
import { getDatabase } from '../config/firebase';
import { firebasePaths } from '../services/firebase';
import type { AdminIndex, AdminScope, Organization, GroupSettings, CheckinData } from '../types';
import { getAdminScope, filterVisibleGroups } from '../types/organization';
import { organizeMatches } from '../utils/matching';

// Signals for organization state
export const currentOrgId = signal<string | null>(null);
export const currentOrg = signal<Organization | null>(null);
export const adminIndex = signal<AdminIndex | null>(null);
export const orgGroups = signal<Array<{ id: string; settings: GroupSettings }>>([]);
export const isLoadingOrg = signal(false);
export const orgError = signal<string | null>(null);

// Computed admin scope
export const adminScope = computed<AdminScope>(() => {
  if (!currentOrgId.value || !adminIndex.value) {
    return { level: 'none' };
  }
  return getAdminScope(adminIndex.value, currentOrgId.value);
});

// Computed visible groups (filtered by admin scope)
export const visibleGroups = computed(() => {
  const scope = adminScope.value;
  const groups = orgGroups.value;

  if (scope.level === 'org') {
    // Org admin sees all groups
    return groups;
  }

  if (scope.level === 'location') {
    // Location admin sees groups with overlapping locations
    return filterVisibleGroups(
      groups.map((g) => ({
        ...g,
        organizationId: g.settings.organizationId,
        locations: g.settings.locations,
      })),
      scope
    ).map((g) => ({ id: g.id, settings: g.settings }));
  }

  // No access
  return [];
});

// Can the current user see anything in this org?
export const hasOrgAccess = computed(() => {
  return adminScope.value.level !== 'none';
});

// Get orgs the user has access to
export const accessibleOrgs = computed<string[]>(() => {
  const index = adminIndex.value;
  if (!index) return [];

  const orgs = new Set<string>();

  // Org-level access
  index.orgAdmin?.forEach((orgId) => orgs.add(orgId));

  // Location-level access
  if (index.locationAdmin) {
    Object.keys(index.locationAdmin).forEach((orgId) => orgs.add(orgId));
  }

  return Array.from(orgs);
});

/**
 * Load admin index for a device token
 */
export async function loadAdminIndex(deviceToken: string): Promise<AdminIndex | null> {
  try {
    const db = getDatabase();
    const snapshot = await db.ref(firebasePaths.adminIndex(deviceToken)).once('value');
    const data = snapshot.val() as AdminIndex | null;
    adminIndex.value = data;
    return data;
  } catch (error) {
    console.error('Failed to load admin index:', error);
    return null;
  }
}

/**
 * Load organization data
 */
export async function loadOrganization(orgId: string): Promise<Organization | null> {
  try {
    isLoadingOrg.value = true;
    orgError.value = null;

    const db = getDatabase();
    const snapshot = await db.ref(firebasePaths.organization(orgId)).once('value');
    const data = snapshot.val() as {
      name?: string;
      locations?: Record<string, { id: string; name: string; address?: string }>;
      admins?: Array<{ id: string; name: string; email: string; scope: 'org' | 'locations'; locations?: string[] }>;
      sports?: string[];
      branding?: { logo?: string; primaryColor?: string; appName?: string };
      settings?: { allowSelfServeGroups: boolean; requireApproval: boolean };
    } | null;

    if (!data) {
      orgError.value = 'Organization not found';
      return null;
    }

    const org: Organization = {
      id: orgId,
      name: data.name || 'Unknown Organization',
      locations: data.locations || {},
      admins: data.admins || [],
      sports: data.sports || [],
      branding: data.branding,
      settings: data.settings || { allowSelfServeGroups: false, requireApproval: true },
    };

    currentOrg.value = org;
    currentOrgId.value = orgId;
    return org;
  } catch (error) {
    console.error('Failed to load organization:', error);
    orgError.value = 'Failed to load organization';
    return null;
  } finally {
    isLoadingOrg.value = false;
  }
}

// Player stats type
export interface PlayerStats {
  name: string;
  gamesPlayed: number;
  checkins: number;
  singlesGames: number;
  doublesGames: number;
  lastActive: string | null;
}

// Group stats type
export interface GroupStats {
  totalCheckins: number;
  singlesGames: number;
  doublesGames: number;
  rotationGames: number;
  totalGames: number;
  activeDays: number;
  firstActivity: string | null;
  lastActivity: string | null;
  // Recent activity
  last7DaysGames: number;
  last30DaysGames: number;
  // Activity by day of week (0=Sun, 6=Sat)
  dayOfWeekCounts: Record<number, number>;
  // All players with rich stats (sorted by games played)
  allPlayers: PlayerStats[];
}

/**
 * Load groups for an organization with stats
 */
export async function loadOrgGroups(
  orgId: string
): Promise<Array<{ id: string; settings: GroupSettings; stats?: GroupStats }>> {
  try {
    const db = getDatabase();
    const snapshot = await db.ref(firebasePaths.groups()).once('value');
    const allGroups = snapshot.val() as Record<string, {
      settings?: Partial<GroupSettings>;
      checkins?: Record<string, CheckinData[]>;
    }> | null;

    if (!allGroups) {
      orgGroups.value = [];
      return [];
    }

    // Get today's date for filtering future dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];

    // Calculate date thresholds for recent activity
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const filtered = Object.entries(allGroups)
      .filter(([, group]) => group.settings?.organizationId === orgId)
      .map(([id, group]) => {
        const checkins = group.checkins || {};
        const checkinDates = Object.keys(checkins);

        // Initialize counters
        let totalCheckins = 0;
        let singlesGames = 0;
        let doublesGames = 0;
        let rotationGames = 0;
        let activeDays = 0;
        let last7DaysGames = 0;
        let last30DaysGames = 0;
        const dayOfWeekCounts: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
        // Rich player stats tracking
        const playerStats: Record<string, { games: number; checkins: number; singles: number; doubles: number; lastActive: string | null }> = {};

        // Process each date's check-ins (same approach as InsightsTab)
        for (const date of checkinDates) {
          const dayCheckins = checkins[date];
          if (!Array.isArray(dayCheckins) || dayCheckins.length === 0) continue;

          // Only count past dates
          const dateObj = new Date(date + 'T00:00:00');
          if (dateObj >= today) continue;

          const isLast7Days = dateObj >= sevenDaysAgo;
          const isLast30Days = dateObj >= thirtyDaysAgo;
          const dayOfWeek = dateObj.getDay();

          activeDays++;

          // Track check-ins per player
          for (const c of dayCheckins) {
            if (c && c.name) {
              totalCheckins++;
              if (!playerStats[c.name]) {
                playerStats[c.name] = { games: 0, checkins: 0, singles: 0, doubles: 0, lastActive: null };
              }
              playerStats[c.name].checkins++;
              // Update last active if this date is more recent
              if (!playerStats[c.name].lastActive || date > playerStats[c.name].lastActive!) {
                playerStats[c.name].lastActive = date;
              }
            }
          }

          // Use organizeMatches to count actual formed games
          const { matches } = organizeMatches(dayCheckins as CheckinData[]);

          for (const match of matches) {
            // Skip forming/waiting matches - only count actual games
            if (
              match.type === 'waiting' ||
              match.type === 'doubles-forming' ||
              match.type === 'singles-forming'
            ) {
              continue;
            }

            const isDoubles = match.type === 'doubles';
            const isSingles = match.type === 'singles';

            // Count by game type
            if (isDoubles) {
              doublesGames++;
            } else if (isSingles) {
              singlesGames++;
            } else if (match.type === 'singles-or-practice') {
              rotationGames++;
            }

            // Count recent games
            if (isLast7Days) last7DaysGames++;
            if (isLast30Days) last30DaysGames++;

            // Count by day of week
            dayOfWeekCounts[dayOfWeek]++;

            // Count games per player with type breakdown
            for (const player of match.players) {
              const name = player.name;
              if (!playerStats[name]) {
                playerStats[name] = { games: 0, checkins: 0, singles: 0, doubles: 0, lastActive: null };
              }
              playerStats[name].games++;
              if (isDoubles) playerStats[name].doubles++;
              if (isSingles) playerStats[name].singles++;
            }
          }
        }

        // Get all players sorted by games played
        const allPlayers: PlayerStats[] = Object.entries(playerStats)
          .map(([name, stats]) => ({
            name,
            gamesPlayed: stats.games,
            checkins: stats.checkins,
            singlesGames: stats.singles,
            doublesGames: stats.doubles,
            lastActive: stats.lastActive,
          }))
          .sort((a, b) => b.gamesPlayed - a.gamesPlayed);

        // Get first and last activity dates (only past dates)
        const pastCheckinDates = checkinDates.filter((d) => d <= todayStr).sort();
        const firstActivity = pastCheckinDates[0] || null;
        const lastActivity = pastCheckinDates[pastCheckinDates.length - 1] || null;

        const totalGames = singlesGames + doublesGames + rotationGames;

        return {
          id,
          settings: {
            groupName: group.settings?.groupName || 'Unknown Group',
            members: group.settings?.members || [],
            memberDetails: group.settings?.memberDetails || {},
            groupPin: group.settings?.groupPin || '',
            adminPin: group.settings?.adminPin || '',
            location: group.settings?.location,
            sportType: group.settings?.sportType,
            organizationId: group.settings?.organizationId,
            locations: group.settings?.locations,
            level: group.settings?.level,
            format: group.settings?.format,
            type: group.settings?.type,
          },
          stats: {
            totalCheckins,
            singlesGames,
            doublesGames,
            rotationGames,
            totalGames,
            activeDays,
            firstActivity,
            lastActivity,
            last7DaysGames,
            last30DaysGames,
            dayOfWeekCounts,
            allPlayers,
          },
        };
      });

    orgGroups.value = filtered;
    return filtered;
  } catch (error) {
    console.error('Failed to load org groups:', error);
    return [];
  }
}

/**
 * Hook to manage organization permissions and data
 */
export function useOrgPermissions(orgId: string | null, deviceToken: string | null) {
  // Load admin index when device token changes
  useEffect(() => {
    if (deviceToken) {
      loadAdminIndex(deviceToken);
    } else {
      adminIndex.value = null;
    }
  }, [deviceToken]);

  // Load organization when orgId changes
  useEffect(() => {
    if (orgId) {
      loadOrganization(orgId);
      loadOrgGroups(orgId);
    } else {
      currentOrg.value = null;
      currentOrgId.value = null;
      orgGroups.value = [];
    }
  }, [orgId]);

  return {
    org: currentOrg.value,
    adminScope: adminScope.value,
    visibleGroups: visibleGroups.value,
    hasAccess: hasOrgAccess.value,
    accessibleOrgs: accessibleOrgs.value,
    isLoading: isLoadingOrg.value,
    error: orgError.value,
  };
}

/**
 * Check if user can manage a specific location
 */
export function canManageLocation(locationId: string): boolean {
  const scope = adminScope.value;

  if (scope.level === 'org') {
    return true;
  }

  if (scope.level === 'location') {
    return scope.locations.includes(locationId);
  }

  return false;
}

/**
 * Check if user can create groups
 */
export function canCreateGroup(): boolean {
  const scope = adminScope.value;
  return scope.level === 'org' || scope.level === 'location';
}

/**
 * Get location names for display
 */
export function getLocationNames(locationIds: string[]): string[] {
  const org = currentOrg.value;
  if (!org) return locationIds;

  return locationIds.map((id) => org.locations[id]?.name || id);
}
