/**
 * Check-in utilities
 */

import type { CheckinData, PlayStyle, TimeRange, CheckinsByDate } from '@/types';
import { normalizeName } from './helpers';

/**
 * Find existing check-in by name
 */
export function findCheckinByName(name: string, checkins: CheckinData[]): CheckinData | null {
  const normalized = normalizeName(name);
  return checkins.find((c) => normalizeName(c.name) === normalized) || null;
}

/**
 * Find check-in index by name
 */
export function findCheckinIndex(name: string, checkins: CheckinData[]): number {
  const normalized = normalizeName(name);
  return checkins.findIndex((c) => normalizeName(c.name) === normalized);
}

/**
 * Check if player can check in (not already checked in)
 */
export function canPlayerCheckin(name: string, checkins: CheckinData[]): boolean {
  return findCheckinByName(name, checkins) === null;
}

/**
 * Build check-in data object
 */
export function buildCheckinData(
  name: string,
  options: {
    playStyle?: PlayStyle;
    timeRange?: TimeRange;
    allowRotation?: boolean;
    addedBy?: string;
    isGuest?: boolean;
    guestOf?: string;
  } = {}
): CheckinData {
  return {
    name: name.trim(),
    playStyle: options.playStyle || 'both',
    timestamp: Date.now(),
    timeRange: options.timeRange,
    allowRotation: options.allowRotation !== false, // Default true
    addedBy: options.addedBy,
    isGuest: options.isGuest,
    guestOf: options.guestOf,
  };
}

/**
 * Add check-in to list
 */
export function addCheckin(checkin: CheckinData, checkins: CheckinData[]): CheckinData[] {
  // Remove existing check-in for same player first
  const filtered = checkins.filter((c) => normalizeName(c.name) !== normalizeName(checkin.name));
  return [...filtered, checkin];
}

/**
 * Remove check-in by name
 */
export function removeCheckinByName(name: string, checkins: CheckinData[]): CheckinData[] {
  const normalized = normalizeName(name);
  return checkins.filter((c) => normalizeName(c.name) !== normalized);
}

/**
 * Remove check-in by index
 */
export function removeCheckinByIndex(index: number, checkins: CheckinData[]): CheckinData[] {
  if (index < 0 || index >= checkins.length) {
    return checkins;
  }
  return [...checkins.slice(0, index), ...checkins.slice(index + 1)];
}

/**
 * Update check-in data
 */
export function updateCheckin(
  name: string,
  updates: Partial<CheckinData>,
  checkins: CheckinData[]
): CheckinData[] {
  const normalized = normalizeName(name);
  return checkins.map((c) => (normalizeName(c.name) === normalized ? { ...c, ...updates } : c));
}

/**
 * Get check-in summary by play style
 */
export function getCheckinSummary(checkins: CheckinData[]): {
  total: number;
  singles: number;
  doubles: number;
  either: number;
  guests: number;
} {
  return {
    total: checkins.length,
    singles: checkins.filter((c) => c.playStyle === 'singles').length,
    doubles: checkins.filter((c) => c.playStyle === 'doubles').length,
    either: checkins.filter((c) => c.playStyle === 'both' || !c.playStyle).length,
    guests: checkins.filter((c) => c.isGuest).length,
  };
}

/**
 * Count check-ins by play style
 */
export function countByPlayStyle(checkins: CheckinData[], playStyle: PlayStyle): number {
  if (playStyle === 'both') {
    return checkins.filter((c) => c.playStyle === 'both' || !c.playStyle).length;
  }
  return checkins.filter((c) => c.playStyle === playStyle).length;
}

/**
 * Filter check-ins by play style
 */
export function filterByPlayStyle(checkins: CheckinData[], playStyle: PlayStyle): CheckinData[] {
  if (playStyle === 'both') {
    return checkins.filter((c) => c.playStyle === 'both' || !c.playStyle);
  }
  return checkins.filter((c) => c.playStyle === playStyle);
}

/**
 * Sort check-ins by timestamp (first come first served)
 */
export function sortCheckinsByTimestamp(
  checkins: CheckinData[],
  ascending: boolean = true
): CheckinData[] {
  return [...checkins].sort((a, b) =>
    ascending ? a.timestamp - b.timestamp : b.timestamp - a.timestamp
  );
}

/**
 * Sort check-ins by name
 */
export function sortCheckinsByName(checkins: CheckinData[]): CheckinData[] {
  return [...checkins].sort((a, b) => normalizeName(a.name).localeCompare(normalizeName(b.name)));
}

/**
 * Get check-ins with time restrictions
 */
export function getCheckinsWithTimeRestrictions(checkins: CheckinData[]): CheckinData[] {
  return checkins.filter((c) => c.timeRange && (c.timeRange.start || c.timeRange.end));
}

/**
 * Get check-ins without time restrictions
 */
export function getCheckinsWithoutTimeRestrictions(checkins: CheckinData[]): CheckinData[] {
  return checkins.filter((c) => !c.timeRange || (!c.timeRange.start && !c.timeRange.end));
}

/**
 * Get guest check-ins
 */
export function getGuestCheckins(checkins: CheckinData[]): CheckinData[] {
  return checkins.filter((c) => c.isGuest);
}

/**
 * Get non-guest check-ins
 */
export function getMemberCheckins(checkins: CheckinData[]): CheckinData[] {
  return checkins.filter((c) => !c.isGuest);
}

/**
 * Get check-ins for multiple dates
 */
export function getCheckinsForDates(allCheckins: CheckinsByDate, dates: string[]): CheckinData[] {
  const result: CheckinData[] = [];
  for (const date of dates) {
    const checkins = allCheckins[date] || [];
    result.push(...checkins);
  }
  return result;
}

/**
 * Get all unique player names from check-ins
 */
export function getUniquePlayerNames(checkins: CheckinData[]): string[] {
  const names = new Set<string>();
  for (const checkin of checkins) {
    names.add(checkin.name);
  }
  return Array.from(names);
}

/**
 * Merge check-in data (update existing or add new)
 */
export function mergeCheckins(existing: CheckinData[], incoming: CheckinData[]): CheckinData[] {
  const result = [...existing];

  for (const checkin of incoming) {
    const index = findCheckinIndex(checkin.name, result);
    if (index >= 0) {
      result[index] = { ...result[index], ...checkin };
    } else {
      result.push(checkin);
    }
  }

  return result;
}

/**
 * Clean check-ins array (remove null/undefined entries from sparse arrays)
 */
export function cleanCheckins(checkins: (CheckinData | null | undefined)[]): CheckinData[] {
  return checkins.filter((c): c is CheckinData => c != null);
}

/**
 * Check if a session user is checked in for a specific date
 */
export function isSessionUserCheckedIn(
  sessionUserName: string | null,
  checkins: CheckinData[]
): boolean {
  if (!sessionUserName) {
    return true;
  } // No session user, consider as "checked in" to avoid pre-selection
  return findCheckinByName(sessionUserName, checkins) !== null;
}

/**
 * Determine if form should auto-expand for session user
 * Returns true if session user exists and is NOT checked in for the date
 */
export function shouldAutoExpandForm(
  sessionUserName: string | null,
  checkins: CheckinData[]
): boolean {
  if (!sessionUserName) {
    return false;
  }
  return !isSessionUserCheckedIn(sessionUserName, checkins);
}
