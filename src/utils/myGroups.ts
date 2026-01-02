/**
 * My Groups - localStorage management for groups created/joined by user
 *
 * Stores group info locally so users can:
 * - See their groups on the landing page
 * - Auto-authenticate as creator (no PIN needed)
 * - View saved PINs (tap to reveal)
 * - Quick share with pre-formatted message
 */

export interface StoredGroup {
  groupId: string;
  shortCode: string;
  groupName: string;
  groupPin: string;
  adminPin?: string; // Only stored for creators
  role: 'creator' | 'member';
  creatorName?: string; // For auto-auth
  createdAt: number;
}

const STORAGE_KEY = 'myGroups';

/**
 * Get all stored groups for this user
 */
export function getMyGroups(): StoredGroup[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const groups = JSON.parse(stored) as StoredGroup[];
    // Sort by most recent first
    return groups.sort((a, b) => b.createdAt - a.createdAt);
  } catch {
    return [];
  }
}

/**
 * Add a new group to the user's stored groups
 */
export function addMyGroup(group: Omit<StoredGroup, 'createdAt'>): void {
  const groups = getMyGroups();

  // Check if group already exists (by groupId)
  const existingIndex = groups.findIndex((g) => g.groupId === group.groupId);
  if (existingIndex >= 0) {
    // Update existing entry (might be upgrading from member to creator)
    groups[existingIndex] = { ...group, createdAt: groups[existingIndex].createdAt };
  } else {
    // Add new entry
    groups.push({ ...group, createdAt: Date.now() });
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
}

/**
 * Remove a group from stored groups
 */
export function removeMyGroup(groupId: string): void {
  const groups = getMyGroups().filter((g) => g.groupId !== groupId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
}

/**
 * Check if user is creator of a specific group
 */
export function isGroupCreator(groupId: string): boolean {
  const groups = getMyGroups();
  const group = groups.find((g) => g.groupId === groupId);
  return group?.role === 'creator';
}

/**
 * Get stored group info by groupId
 */
export function getStoredGroup(groupId: string): StoredGroup | null {
  const groups = getMyGroups();
  return groups.find((g) => g.groupId === groupId) || null;
}

/**
 * Auto-authenticate creator when returning to their group
 * Returns the creator's name if auto-auth should apply
 */
export function autoAuthCreator(groupId: string): string | null {
  const group = getStoredGroup(groupId);
  if (group?.role === 'creator' && group.creatorName) {
    // Set session auth so PIN modal is skipped
    sessionStorage.setItem(`pinAuth_${groupId}`, 'true');
    return group.creatorName;
  }
  return null;
}

/**
 * Generate share message for a group
 */
export function generateShareMessage(
  group: Pick<StoredGroup, 'shortCode' | 'groupName' | 'groupPin'>,
  sportName: string
): string {
  const baseUrl = window.location.origin;
  const shareUrl = `${baseUrl}/${group.shortCode}`;
  return `Join my ${sportName} group "${group.groupName}"!\n\nLink: ${shareUrl}\nPIN: ${group.groupPin}`;
}
