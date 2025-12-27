/**
 * Group management utilities
 */

import type { AvailableGroups, GroupSettings } from '@/types';

/**
 * Generate a unique group ID
 */
export function generateGroupId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${random}`;
}

/**
 * Generate a short code for a group (e.g., for sharing)
 */
export function generateShortCode(length: number = 6): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Excluding similar chars
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Validate group PIN
 */
export function validateGroupPin(pin: string, correctPin: string): boolean {
  return pin === correctPin;
}

/**
 * Validate admin PIN
 */
export function validateAdminPin(pin: string, correctPin: string): boolean {
  return pin === correctPin;
}

/**
 * Check if PIN format is valid (4-8 digits)
 */
export function isValidPinFormat(pin: string): boolean {
  return /^\d{4,8}$/.test(pin);
}

/**
 * Build Firebase path for group
 */
export function buildGroupPath(groupId: string): string {
  return `groups/${groupId}`;
}

/**
 * Build Firebase path for group settings
 */
export function buildGroupSettingsPath(groupId: string): string {
  return `groups/${groupId}/settings`;
}

/**
 * Build Firebase path for group checkins
 */
export function buildGroupCheckinsPath(groupId: string, date?: string): string {
  if (date) {
    return `groups/${groupId}/checkins/${date}`;
  }
  return `groups/${groupId}/checkins`;
}

/**
 * Parse group short code from URL or input
 */
export function parseGroupShortCode(input: string): string | null {
  // Clean up input
  const cleaned = input.trim().toUpperCase();

  // Check if it's a valid short code format
  if (/^[A-Z0-9]{4,8}$/.test(cleaned)) {
    return cleaned;
  }

  // Try to extract from URL
  const urlMatch = input.match(/[?&]code=([A-Z0-9]{4,8})/i);
  if (urlMatch) {
    return urlMatch[1].toUpperCase();
  }

  return null;
}

/**
 * Find group by short code
 */
export function findGroupByShortCode(
  shortCode: string,
  availableGroups: AvailableGroups
): { id: string; name: string } | null {
  const normalized = shortCode.toUpperCase();

  for (const [id, group] of Object.entries(availableGroups)) {
    if (group.shortCode?.toUpperCase() === normalized) {
      return { id, name: group.name };
    }
  }

  return null;
}

/**
 * Find group by name (case-insensitive)
 */
export function findGroupByName(
  name: string,
  availableGroups: AvailableGroups
): { id: string; name: string } | null {
  const normalized = name.toLowerCase().trim();

  for (const [id, group] of Object.entries(availableGroups)) {
    if (group.name.toLowerCase().trim() === normalized) {
      return { id, name: group.name };
    }
  }

  return null;
}

/**
 * Get list of available groups
 */
export function getAvailableGroupsList(
  availableGroups: AvailableGroups
): Array<{ id: string; name: string; shortCode?: string }> {
  return Object.entries(availableGroups).map(([id, group]) => ({
    id,
    name: group.name,
    shortCode: group.shortCode,
  }));
}

/**
 * Sort groups by name
 */
export function sortGroupsByName(
  groups: Array<{ id: string; name: string }>
): Array<{ id: string; name: string }> {
  return [...groups].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
}

/**
 * Check if group exists
 */
export function groupExists(groupId: string, availableGroups: AvailableGroups): boolean {
  return groupId in availableGroups;
}

/**
 * Create default group settings
 */
export function createDefaultGroupSettings(groupName: string): GroupSettings {
  return {
    groupName,
    members: [],
    memberDetails: {},
    groupPin: generateDefaultPin(),
    adminPin: generateDefaultPin(),
    location: {
      lat: 37.2358,
      lon: -121.9623,
      name: 'Los Gatos, CA',
    },
  };
}

/**
 * Generate a default PIN (4 digits)
 */
export function generateDefaultPin(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

/**
 * Merge group settings (partial update)
 */
export function mergeGroupSettings(
  existing: GroupSettings,
  updates: Partial<GroupSettings>
): GroupSettings {
  return {
    ...existing,
    ...updates,
    // Deep merge memberDetails if both exist
    memberDetails:
      updates.memberDetails !== undefined
        ? { ...existing.memberDetails, ...updates.memberDetails }
        : existing.memberDetails,
  };
}

/**
 * Validate group settings completeness
 */
export function isGroupSettingsComplete(settings: Partial<GroupSettings>): boolean {
  return Boolean(
    settings.groupName && settings.groupPin && settings.adminPin && settings.members
  );
}

/**
 * Get group display name (with fallback)
 */
export function getGroupDisplayName(groupId: string, availableGroups: AvailableGroups): string {
  return availableGroups[groupId]?.name || groupId;
}

/**
 * Build shareable group link
 */
export function buildGroupShareLink(baseUrl: string, shortCode: string): string {
  const url = new URL(baseUrl);
  url.searchParams.set('code', shortCode);
  return url.toString();
}
