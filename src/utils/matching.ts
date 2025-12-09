/**
 * Match organization logic
 *
 * This module handles the core matching algorithm that organizes
 * players into doubles, singles, and forming matches.
 *
 * Algorithm:
 * 1. Form complete doubles matches (4 players each) from Doubles Only + Either players
 * 2. Form singles matches from Singles Only players
 * 3. Handle remaining players (doubles-forming, singles-forming)
 */

import type {
  CheckinData,
  Match,
  OrganizeMatchesResult,
  UserPreferences,
  TimeRange,
} from '@/types';
import { normalizeName } from './helpers';

/**
 * Get user preferences for a player
 */
function getUserPrefs(
  name: string,
  userPreferences: UserPreferences
): { include: string[]; exclude: string[] } {
  return userPreferences[normalizeName(name)] || { include: [], exclude: [] };
}

/**
 * Check if two players can play together based on exclusion preferences
 */
function canPlayTogether(
  name1: string,
  name2: string,
  userPreferences: UserPreferences
): boolean {
  const prefs1 = getUserPrefs(name1, userPreferences);
  const prefs2 = getUserPrefs(name2, userPreferences);
  const n1 = normalizeName(name1);
  const n2 = normalizeName(name2);

  return !prefs1.exclude.includes(n2) && !prefs2.exclude.includes(n1);
}

/**
 * Check if two time ranges overlap
 */
export function timesOverlap(
  time1: TimeRange | undefined,
  time2: TimeRange | undefined
): boolean {
  // If either has no time restriction, they can play together
  if (!time1 || !time2) return true;

  // If both have no start/end times, they're flexible
  if (!time1.start && !time1.end && !time2.start && !time2.end) return true;

  // Convert times to minutes for easier comparison
  const timeToMinutes = (timeStr: string | undefined): number | null => {
    if (!timeStr) return null;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Get time ranges in minutes
  const t1Start = timeToMinutes(time1.start);
  const t1End = timeToMinutes(time1.end);
  const t2Start = timeToMinutes(time2.start);
  const t2End = timeToMinutes(time2.end);

  // Handle open-ended ranges
  // "from X" means X to end of day
  // "until X" means start of day to X
  const START_OF_DAY = 6 * 60; // 6 AM
  const END_OF_DAY = 21 * 60; // 9 PM

  const range1Start = t1Start ?? START_OF_DAY;
  const range1End = t1End ?? END_OF_DAY;
  const range2Start = t2Start ?? START_OF_DAY;
  const range2End = t2End ?? END_OF_DAY;

  // Check if ranges overlap
  // Ranges overlap if: start1 < end2 AND start2 < end1
  return range1Start < range2End && range2Start < range1End;
}

/**
 * Check if two players can play together based on both exclusions and time overlap
 */
export function canPlayTogetherWithTime(
  player1: CheckinData,
  player2: CheckinData,
  userPreferences: UserPreferences
): boolean {
  // First check exclusion preferences
  if (!canPlayTogether(player1.name, player2.name, userPreferences)) {
    return false;
  }

  // Then check time overlap
  return timesOverlap(player1.timeRange, player2.timeRange);
}

/**
 * Main function to organize all matches
 *
 * @param checkins - Array of player check-ins
 * @param userPreferences - Map of user preferences (include/exclude lists)
 * @returns Object with matches array and warnings array
 */
export function organizeMatches(
  checkins: CheckinData[],
  userPreferences: UserPreferences = {}
): OrganizeMatchesResult {
  const matches: Match[] = [];
  const warnings: string[] = [];
  let remaining = checkins.map((c, idx) => ({ ...c, originalIndex: idx }));

  // Separate by play style and sort by timestamp (first-come, first-served)
  remaining.sort((a, b) => a.timestamp - b.timestamp);

  const doublesOnly = remaining.filter((p) => p.playStyle === 'doubles');
  const singlesOnly = remaining.filter((p) => p.playStyle === 'singles');
  const either = remaining.filter(
    (p) => p.playStyle === 'both' || !p.playStyle
  );

  // === STEP 1: Form complete doubles matches ===
  // Doubles pool: Doubles Only + Either players (sorted by timestamp)
  let doublesPool = [...doublesOnly, ...either].sort(
    (a, b) => a.timestamp - b.timestamp
  );

  while (doublesPool.length >= 4) {
    const group = doublesPool.slice(0, 4);
    matches.push({
      type: 'doubles',
      number: matches.filter((m) => m.type === 'doubles').length + 1,
      players: group,
    });
    doublesPool.splice(0, 4);
  }

  // === STEP 2: Form singles matches from Singles Only players ===
  let singlesPool = [...singlesOnly].sort((a, b) => a.timestamp - b.timestamp);

  while (singlesPool.length >= 2) {
    let pair: CheckinData[] | null = null;

    // Find first valid pair respecting exclusions AND time overlap
    for (let i = 0; i < singlesPool.length - 1; i++) {
      for (let j = i + 1; j < singlesPool.length; j++) {
        if (
          canPlayTogetherWithTime(singlesPool[i], singlesPool[j], userPreferences)
        ) {
          pair = [singlesPool[i], singlesPool[j]];
          break;
        }
      }
      if (pair) break;
    }

    if (pair) {
      matches.push({
        type: 'singles',
        players: pair,
      });
      pair.forEach((p) => {
        const idx = singlesPool.findIndex(
          (sp) => sp.originalIndex === p.originalIndex
        );
        if (idx > -1) singlesPool.splice(idx, 1);
      });
    } else {
      break;
    }
  }

  // === STEP 3: Handle remaining players ===
  // Remaining doubles pool (Either + Doubles Only not in complete doubles)
  // Remaining singles pool (Singles Only not in complete singles)

  const remainingDoublesPool = doublesPool; // 0-3 players wanting doubles
  const remainingSinglesPool = singlesPool; // Singles Only players without a partner

  // --- Handle doubles forming ---
  if (remainingDoublesPool.length > 0) {
    const needed = 4 - remainingDoublesPool.length;

    // Count "Either" players who can play singles as fallback
    const eitherPlayers = remainingDoublesPool.filter(
      (p) => p.playStyle === 'both' || !p.playStyle
    );
    const eitherCount = eitherPlayers.length;

    // Check if all are "Either" and allow rotation (for 3 players)
    const allEither = remainingDoublesPool.every(
      (p) => p.playStyle === 'both' || !p.playStyle
    );
    const allAllowRotation = remainingDoublesPool.every(
      (p) => p.allowRotation !== false
    );
    const canAllPlayTogether =
      remainingDoublesPool.length === 3 &&
      canPlayTogetherWithTime(
        remainingDoublesPool[0],
        remainingDoublesPool[1],
        userPreferences
      ) &&
      canPlayTogetherWithTime(
        remainingDoublesPool[0],
        remainingDoublesPool[2],
        userPreferences
      ) &&
      canPlayTogetherWithTime(
        remainingDoublesPool[1],
        remainingDoublesPool[2],
        userPreferences
      );

    // Check if 2+ Either players can play singles together (time overlap, no exclusions)
    let canPlaySingles = false;
    if (eitherCount >= 2) {
      // Check if first two Either players can play together
      canPlaySingles = canPlayTogetherWithTime(
        eitherPlayers[0],
        eitherPlayers[1],
        userPreferences
      );
    }

    matches.push({
      type: 'doubles-forming',
      players: remainingDoublesPool,
      needed: needed,
      canRotate:
        remainingDoublesPool.length === 3 &&
        allEither &&
        allAllowRotation &&
        canAllPlayTogether,
      eitherCount: eitherCount,
      canPlaySingles: canPlaySingles,
    });
  }

  // --- Handle singles forming ---
  if (remainingSinglesPool.length > 0) {
    remainingSinglesPool.forEach((p) => {
      matches.push({
        type: 'singles-forming',
        players: [p],
        needed: 1,
      });
    });
  }

  return { matches, warnings };
}

/**
 * Check if a player is in any complete match
 */
export function isPlayerInMatch(
  playerName: string,
  matches: Match[]
): boolean {
  const normalized = normalizeName(playerName);
  return matches.some(
    (m) =>
      (m.type === 'doubles' || m.type === 'singles') &&
      m.players.some((p) => normalizeName(p.name) === normalized)
  );
}

/**
 * Get the match type for a player
 */
export function getPlayerMatchType(
  playerName: string,
  matches: Match[]
): string | null {
  const normalized = normalizeName(playerName);
  for (const match of matches) {
    if (match.players.some((p) => normalizeName(p.name) === normalized)) {
      return match.type;
    }
  }
  return null;
}
