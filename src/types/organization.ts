/**
 * Organization types for multi-location club support
 *
 * Supports organizations like Bay Club with multiple locations,
 * where groups can span one or more locations and admins
 * can have org-wide or location-scoped permissions.
 */

/**
 * A physical location within an organization
 */
export interface OrgLocation {
  id: string;
  name: string;
  address?: string;
  lat?: number;
  lon?: number;
}

/**
 * An admin within an organization with scoped permissions
 */
export interface OrgAdmin {
  id: string; // deviceToken
  name: string;
  email: string;
  phone?: string;
  scope: 'org' | 'locations';
  locations?: string[]; // Only if scope === 'locations'
  addedAt?: number;
  addedBy?: string;
}

/**
 * Organization branding configuration
 */
export interface OrgBranding {
  logo?: string;
  primaryColor?: string;
  appName?: string;
}

/**
 * Organization settings
 */
export interface OrgSettings {
  allowSelfServeGroups: boolean; // Can members create groups?
  requireApproval: boolean; // Do new members need approval?
}

/**
 * An organization (e.g., Bay Club)
 */
export interface Organization {
  id: string;
  name: string;
  locations: Record<string, OrgLocation>;
  admins: OrgAdmin[];
  sports: string[]; // Supported sports: ['tennis', 'pickleball', 'squash']
  branding?: OrgBranding;
  settings: OrgSettings;
  createdAt?: number;
  createdBy?: string; // deviceToken of creator
}

/**
 * Admin index for fast permission lookups
 * Stored at adminIndex/{deviceToken}
 */
export interface AdminIndex {
  orgAdmin?: string[]; // Org IDs with full access
  locationAdmin?: Record<string, string[]>; // orgId -> locationIds
  groupAdmin?: string[]; // Direct group IDs
}

/**
 * Resolved admin scope for a specific organization
 */
export type AdminScope =
  | { level: 'org'; orgId: string }
  | { level: 'location'; orgId: string; locations: string[] }
  | { level: 'group'; groupIds: string[] }
  | { level: 'none' };

/**
 * Get admin scope for a user in a specific organization
 */
export function getAdminScope(adminIndex: AdminIndex | null, orgId: string): AdminScope {
  if (!adminIndex) {
    return { level: 'none' };
  }

  // Check org-level admin
  if (adminIndex.orgAdmin?.includes(orgId)) {
    return { level: 'org', orgId };
  }

  // Check location-level admin
  const locations = adminIndex.locationAdmin?.[orgId];
  if (locations && locations.length > 0) {
    return { level: 'location', orgId, locations };
  }

  // Check direct group admin (for non-org groups)
  if (adminIndex.groupAdmin && adminIndex.groupAdmin.length > 0) {
    return { level: 'group', groupIds: adminIndex.groupAdmin };
  }

  return { level: 'none' };
}

/**
 * Check if admin can see a group based on their scope
 */
export function canSeeGroup(
  scope: AdminScope,
  group: { organizationId?: string; locations?: string[] }
): boolean {
  if (scope.level === 'none') {
    return false;
  }

  if (scope.level === 'org') {
    return group.organizationId === scope.orgId;
  }

  if (scope.level === 'location') {
    // Group must be in this org AND have at least one overlapping location
    if (group.organizationId !== scope.orgId) {
      return false;
    }
    const groupLocations = group.locations || [];
    return groupLocations.some((loc) => scope.locations.includes(loc));
  }

  if (scope.level === 'group') {
    // Direct group access - would need groupId to check
    return false; // Handled separately
  }

  return false;
}

/**
 * Filter groups to only those visible to the admin
 */
export function filterVisibleGroups<T extends { organizationId?: string; locations?: string[] }>(
  groups: T[],
  scope: AdminScope
): T[] {
  return groups.filter((group) => canSeeGroup(scope, group));
}
