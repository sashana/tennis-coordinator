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
import type { AdminIndex, AdminScope, Organization, GroupSettings } from '../types';
import { getAdminScope, filterVisibleGroups } from '../types/organization';

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

/**
 * Load groups for an organization
 */
export async function loadOrgGroups(
  orgId: string
): Promise<Array<{ id: string; settings: GroupSettings }>> {
  try {
    const db = getDatabase();
    const snapshot = await db.ref(firebasePaths.groups()).once('value');
    const allGroups = snapshot.val() as Record<string, { settings?: Partial<GroupSettings> }> | null;

    if (!allGroups) {
      orgGroups.value = [];
      return [];
    }

    const filtered = Object.entries(allGroups)
      .filter(([, group]) => group.settings?.organizationId === orgId)
      .map(([id, group]) => ({
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
      }));

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
