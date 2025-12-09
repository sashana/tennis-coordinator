/**
 * Match organization logic
 *
 * This module handles the core matching algorithm that organizes
 * players into doubles, singles, and rotation matches.
 */

import type {
  CheckinData,
  Match,
  MatchPlayer,
  OrganizedMatches,
  UserPreferences,
} from '@/types';
import { normalizeName, timeRangesOverlap } from './helpers';

/**
 * Convert checkin data to match player format
 */
function checkinToPlayer(checkin: CheckinData): MatchPlayer {
  return {
    name: checkin.name,
    preference: checkin.preference,
    timeRange: checkin.timeRange,
    allowRotation: checkin.allowRotation,
    timestamp: checkin.timestamp,
    isGuest: checkin.isGuest,
    guestOf: checkin.guestOf,
  };
}

/**
 * Check if two players can be matched (considering exclusions and time)
 */
function canMatch(
  player1: MatchPlayer,
  player2: MatchPlayer,
  userPreferences: UserPreferences
): boolean {
  const p1Prefs = userPreferences[normalizeName(player1.name)] || {
    include: [],
    exclude: [],
  };
  const p2Prefs = userPreferences[normalizeName(player2.name)] || {
    include: [],
    exclude: [],
  };

  // Check exclusions
  if (p1Prefs.exclude.includes(normalizeName(player2.name))) {
    return false;
  }
  if (p2Prefs.exclude.includes(normalizeName(player1.name))) {
    return false;
  }

  // Check time overlap
  return timeRangesOverlap(player1.timeRange, player2.timeRange);
}

/**
 * Check if player can play doubles
 */
function canPlayDoubles(player: MatchPlayer): boolean {
  return player.preference === 'doubles' || player.preference === 'both';
}

/**
 * Check if player can play singles
 */
function canPlaySingles(player: MatchPlayer): boolean {
  return player.preference === 'singles' || player.preference === 'both';
}

/**
 * Check if all players in a group allow rotation
 */
function allAllowRotation(players: MatchPlayer[]): boolean {
  return players.every((p) => p.allowRotation);
}

/**
 * Form doubles matches from available players
 */
function formDoublesMatches(
  players: MatchPlayer[],
  _userPreferences: UserPreferences
): { matches: Match[]; remaining: MatchPlayer[] } {
  const matches: Match[] = [];
  const remaining = [...players];
  const doublesPlayers = remaining.filter(canPlayDoubles);

  // Sort by timestamp (first come, first served)
  doublesPlayers.sort((a, b) => a.timestamp - b.timestamp);

  while (doublesPlayers.length >= 4) {
    // Take first 4 players who can play doubles
    const matchPlayers = doublesPlayers.splice(0, 4);
    matches.push({
      type: 'doubles',
      players: matchPlayers,
      label: 'Doubles Match',
    });

    // Remove from remaining
    for (const p of matchPlayers) {
      const idx = remaining.findIndex(
        (r) => normalizeName(r.name) === normalizeName(p.name)
      );
      if (idx !== -1) {
        remaining.splice(idx, 1);
      }
    }
  }

  return { matches, remaining };
}

/**
 * Form singles matches from available players
 */
function formSinglesMatches(
  players: MatchPlayer[],
  userPreferences: UserPreferences
): { matches: Match[]; remaining: MatchPlayer[] } {
  const matches: Match[] = [];
  const remaining = [...players];
  const singlesPlayers = remaining.filter(canPlaySingles);

  // Sort by timestamp (first come, first served)
  singlesPlayers.sort((a, b) => a.timestamp - b.timestamp);

  const used = new Set<string>();

  for (let i = 0; i < singlesPlayers.length; i++) {
    const player1 = singlesPlayers[i];
    if (used.has(normalizeName(player1.name))) continue;

    for (let j = i + 1; j < singlesPlayers.length; j++) {
      const player2 = singlesPlayers[j];
      if (used.has(normalizeName(player2.name))) continue;

      if (canMatch(player1, player2, userPreferences)) {
        matches.push({
          type: 'singles',
          players: [player1, player2],
          label: 'Singles Match',
        });
        used.add(normalizeName(player1.name));
        used.add(normalizeName(player2.name));
        break;
      }
    }
  }

  // Remove matched players from remaining
  for (const name of used) {
    const idx = remaining.findIndex(
      (r) => normalizeName(r.name) === name
    );
    if (idx !== -1) {
      remaining.splice(idx, 1);
    }
  }

  return { matches, remaining };
}

/**
 * Form rotation group from remaining players
 */
function formRotationGroup(
  players: MatchPlayer[],
  userPreferences: UserPreferences
): Match | null {
  if (players.length !== 3) return null;
  if (!allAllowRotation(players)) return null;

  // Check all can match with each other
  for (let i = 0; i < players.length; i++) {
    for (let j = i + 1; j < players.length; j++) {
      if (!canMatch(players[i], players[j], userPreferences)) {
        return null;
      }
    }
  }

  return {
    type: 'rotation',
    players,
    label: '3-Player Rotation',
    rotationType: '1v1',
  };
}

/**
 * Create forming match placeholder
 */
function createFormingMatch(
  players: MatchPlayer[],
  targetType: 'doubles' | 'singles'
): Match {
  const needed = targetType === 'doubles' ? 4 - players.length : 2 - players.length;

  let fallbackMessage: string | undefined;

  if (targetType === 'doubles' && players.length >= 2) {
    const eitherPlayers = players.filter((p) => p.preference === 'both');
    if (eitherPlayers.length >= 2) {
      fallbackMessage = 'Will play singles if no more join';
    } else if (players.length === 3 && players.every((p) => p.allowRotation)) {
      fallbackMessage = 'Can rotate if no 4th';
    }
  }

  return {
    type: 'forming',
    players,
    label: `${targetType === 'doubles' ? 'Doubles' : 'Singles'} (forming) - Need ${needed} more`,
    fallbackMessage,
  };
}

/**
 * Main function to organize all matches
 */
export function organizeMatches(
  checkins: CheckinData[],
  userPreferences: UserPreferences = {}
): OrganizedMatches {
  if (checkins.length === 0) {
    return { matches: [], waiting: [] };
  }

  const players = checkins.map(checkinToPlayer);
  const matches: Match[] = [];
  let remaining = [...players];

  // Step 1: Form complete doubles matches
  const doublesResult = formDoublesMatches(remaining, userPreferences);
  matches.push(...doublesResult.matches);
  remaining = doublesResult.remaining;

  // Step 2: Form singles matches from "Singles Only" players first
  const singlesOnlyPlayers = remaining.filter(
    (p) => p.preference === 'singles'
  );
  if (singlesOnlyPlayers.length >= 2) {
    const singlesResult = formSinglesMatches(
      singlesOnlyPlayers,
      userPreferences
    );
    matches.push(...singlesResult.matches);
    // Remove matched singles-only players from remaining
    for (const match of singlesResult.matches) {
      for (const player of match.players) {
        const idx = remaining.findIndex(
          (r) => normalizeName(r.name) === normalizeName(player.name)
        );
        if (idx !== -1) {
          remaining.splice(idx, 1);
        }
      }
    }
  }

  // Step 3: Try to form rotation group if exactly 3 "Either" players remain
  const eitherPlayers = remaining.filter((p) => p.preference === 'both');
  if (remaining.length === 3 && eitherPlayers.length === 3) {
    const rotation = formRotationGroup(remaining, userPreferences);
    if (rotation) {
      matches.push(rotation);
      remaining = [];
    }
  }

  // Step 4: Form additional singles matches from "Either" players
  if (remaining.length >= 2) {
    const singlesResult = formSinglesMatches(remaining, userPreferences);
    matches.push(...singlesResult.matches);
    remaining = singlesResult.remaining;
  }

  // Step 5: Handle remaining players
  if (remaining.length > 0) {
    const doublesFormingPlayers = remaining.filter(canPlayDoubles);
    const singlesFormingPlayers = remaining.filter(
      (p) => p.preference === 'singles'
    );

    if (doublesFormingPlayers.length > 0) {
      matches.push(createFormingMatch(doublesFormingPlayers, 'doubles'));
    }

    if (singlesFormingPlayers.length > 0) {
      // Only add separate singles forming if there are singles-only players not in doubles forming
      const onlySinglesPlayers = singlesFormingPlayers.filter(
        (p) => !doublesFormingPlayers.some(
          (d) => normalizeName(d.name) === normalizeName(p.name)
        )
      );
      if (onlySinglesPlayers.length > 0) {
        matches.push(createFormingMatch(onlySinglesPlayers, 'singles'));
      }
    }
  }

  // Convert remaining players who aren't in any match to waiting
  const matchedNames = new Set(
    matches.flatMap((m) => m.players.map((p) => normalizeName(p.name)))
  );
  const waiting = players.filter(
    (p) => !matchedNames.has(normalizeName(p.name))
  );

  return { matches, waiting };
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
      (m.type === 'doubles' || m.type === 'singles' || m.type === 'rotation') &&
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
