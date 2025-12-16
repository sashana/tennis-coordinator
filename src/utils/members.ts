/**
 * Member management utilities
 */

import type { MemberDetails, MemberDetailsMap, CheckinData } from '@/types';
import { normalizeName } from './helpers';

/**
 * Find member by name (case-insensitive)
 */
export function findMemberByName(name: string, members: string[]): string | null {
  const normalized = normalizeName(name);
  return members.find((m) => normalizeName(m) === normalized) || null;
}

/**
 * Check if name is in members list (case-insensitive)
 */
export function isMember(name: string, members: string[]): boolean {
  return findMemberByName(name, members) !== null;
}

/**
 * Get member details by name
 */
export function getMemberDetails(
  name: string,
  memberDetails: MemberDetailsMap
): MemberDetails | null {
  const normalized = normalizeName(name);

  // Try exact normalized key first
  if (memberDetails[normalized]) {
    return memberDetails[normalized];
  }

  // Try finding by normalized comparison
  for (const key of Object.keys(memberDetails)) {
    if (normalizeName(key) === normalized) {
      return memberDetails[key];
    }
  }

  return null;
}

/**
 * Get member contact info
 */
export function getMemberContact(
  name: string,
  memberDetails: MemberDetailsMap
): { phone?: string; email?: string } | null {
  const details = getMemberDetails(name, memberDetails);
  if (!details) {
    return null;
  }

  return {
    phone: details.phone,
    email: details.email,
  };
}

/**
 * Sort members alphabetically
 */
export function sortMembersAlphabetically(members: string[]): string[] {
  return [...members].sort((a, b) => normalizeName(a).localeCompare(normalizeName(b)));
}

/**
 * Sort members by check-in status (checked-in first, then alphabetically)
 */
export function sortMembersByCheckinStatus(members: string[], checkins: CheckinData[]): string[] {
  const checkedInNames = new Set(checkins.map((c) => normalizeName(c.name)));

  return [...members].sort((a, b) => {
    const aCheckedIn = checkedInNames.has(normalizeName(a));
    const bCheckedIn = checkedInNames.has(normalizeName(b));

    if (aCheckedIn && !bCheckedIn) {
      return -1;
    }
    if (!aCheckedIn && bCheckedIn) {
      return 1;
    }
    return normalizeName(a).localeCompare(normalizeName(b));
  });
}

/**
 * Filter active members (those who have checked in recently)
 */
export function filterActiveMembers(
  members: string[],
  allCheckins: { [date: string]: CheckinData[] },
  daysBack: number = 30
): string[] {
  const activeNames = new Set<string>();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysBack);
  const cutoffStr = cutoffDate.toISOString().split('T')[0];

  for (const [date, checkins] of Object.entries(allCheckins)) {
    if (date >= cutoffStr) {
      for (const checkin of checkins) {
        activeNames.add(normalizeName(checkin.name));
      }
    }
  }

  return members.filter((m) => activeNames.has(normalizeName(m)));
}

/**
 * Check if member is checked in for a specific date
 */
export function isMemberCheckedIn(name: string, checkins: CheckinData[]): boolean {
  const normalized = normalizeName(name);
  return checkins.some((c) => normalizeName(c.name) === normalized);
}

/**
 * Get check-in data for a specific member
 */
export function getMemberCheckin(name: string, checkins: CheckinData[]): CheckinData | null {
  const normalized = normalizeName(name);
  return checkins.find((c) => normalizeName(c.name) === normalized) || null;
}

/**
 * Get members not checked in
 */
export function getMembersNotCheckedIn(members: string[], checkins: CheckinData[]): string[] {
  return members.filter((m) => !isMemberCheckedIn(m, checkins));
}

/**
 * Add member to list (if not already present)
 */
export function addMemberToList(name: string, members: string[]): string[] {
  if (isMember(name, members)) {
    return members;
  }
  return [...members, name];
}

/**
 * Remove member from list
 */
export function removeMemberFromList(name: string, members: string[]): string[] {
  const normalized = normalizeName(name);
  return members.filter((m) => normalizeName(m) !== normalized);
}

/**
 * Update member details
 */
export function updateMemberDetails(
  name: string,
  updates: Partial<MemberDetails>,
  memberDetails: MemberDetailsMap
): MemberDetailsMap {
  const normalized = normalizeName(name);
  const existing = getMemberDetails(name, memberDetails) || {
    addedBy: '',
    addedDate: Date.now(),
  };

  return {
    ...memberDetails,
    [normalized]: {
      ...existing,
      ...updates,
    },
  };
}

/**
 * Remove member details
 */
export function removeMemberDetails(
  name: string,
  memberDetails: MemberDetailsMap
): MemberDetailsMap {
  const normalized = normalizeName(name);
  const result = { ...memberDetails };

  // Remove by normalized key
  delete result[normalized];

  // Also try removing by original keys that match
  for (const key of Object.keys(result)) {
    if (normalizeName(key) === normalized) {
      delete result[key];
    }
  }

  return result;
}

/**
 * Get member count
 */
export function getMemberCount(members: string[]): number {
  return members.length;
}

/**
 * Get members added by a specific person
 */
export function getMembersAddedBy(addedBy: string, memberDetails: MemberDetailsMap): string[] {
  const normalized = normalizeName(addedBy);
  const result: string[] = [];

  for (const [name, details] of Object.entries(memberDetails)) {
    if (details.addedBy && normalizeName(details.addedBy) === normalized) {
      result.push(name);
    }
  }

  return result;
}

/**
 * Rename a member in the members list
 * Returns new array with old name replaced by new name, sorted alphabetically
 */
export function renameMemberInList(oldName: string, newName: string, members: string[]): string[] {
  const trimmedNewName = newName.trim();
  if (!trimmedNewName || trimmedNewName === oldName) {
    return members;
  }

  return members
    .map((m) => (m === oldName ? trimmedNewName : m))
    .sort((a, b) => normalizeName(a).localeCompare(normalizeName(b)));
}

/**
 * Transfer member details from old name to new name
 * Returns new details map with old name removed and new name added
 */
export function transferMemberDetails(
  oldName: string,
  newName: string,
  memberDetails: MemberDetailsMap
): MemberDetailsMap {
  const trimmedNewName = newName.trim();
  if (!trimmedNewName || trimmedNewName === oldName) {
    return memberDetails;
  }

  const result = { ...memberDetails };
  if (result[oldName]) {
    result[trimmedNewName] = result[oldName];
    delete result[oldName];
  }

  return result;
}

/**
 * Update checkin names when a member is renamed
 * Returns new checkins array with old name replaced by new name
 */
export function updateCheckinNames(
  oldName: string,
  newName: string,
  checkins: CheckinData[]
): CheckinData[] {
  const trimmedNewName = newName.trim();
  if (!trimmedNewName || trimmedNewName === oldName) {
    return checkins;
  }

  return checkins.map((checkin) => {
    if (checkin.name === oldName) {
      return { ...checkin, name: trimmedNewName };
    }
    return checkin;
  });
}

/**
 * Check if a name already exists in the members list (case-insensitive)
 * Excludes the current name being renamed
 */
export function isDuplicateName(newName: string, members: string[], excludeName?: string): boolean {
  const normalizedNew = normalizeName(newName);
  return members.some((m) => {
    if (excludeName && m === excludeName) {
      return false;
    }
    return normalizeName(m) === normalizedNew;
  });
}

/**
 * Validate a new member name
 * Returns error message or null if valid
 */
export function validateMemberName(
  name: string,
  existingMembers: string[],
  excludeName?: string
): string | null {
  const trimmed = name.trim();

  if (!trimmed) {
    return 'Name cannot be empty';
  }

  if (trimmed.length < 2) {
    return 'Name must be at least 2 characters';
  }

  if (trimmed.length > 50) {
    return 'Name must be less than 50 characters';
  }

  if (isDuplicateName(trimmed, existingMembers, excludeName)) {
    return 'A member with this name already exists';
  }

  return null;
}
