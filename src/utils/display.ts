/**
 * Display formatting utilities for matches and players
 */

import type { Match, MatchType, PlayStyle, CheckinData } from '@/types';
import { formatTimeRange } from './helpers';
import { sport } from '@/config/sport';

/**
 * Get display label for match type
 */
export function getMatchTypeLabel(matchType: MatchType): string {
  switch (matchType) {
    case 'doubles':
      return sport.terms.doubles;
    case 'singles':
      return sport.terms.singles;
    case 'doubles-forming':
      return sport.terms.doublesForming;
    case 'singles-forming':
      return sport.terms.singlesForming;
    case 'singles-or-practice':
      return `${sport.terms.singles} or Practice`;
    default:
      return sport.terms.match;
  }
}

/**
 * Get short label for match type
 */
export function getMatchTypeShortLabel(matchType: MatchType): string {
  switch (matchType) {
    case 'doubles':
      return 'D';
    case 'singles':
      return 'S';
    case 'doubles-forming':
      return 'D?';
    case 'singles-forming':
      return 'S?';
    case 'singles-or-practice':
      return 'SP';
    default:
      return '?';
  }
}

/**
 * Get player count label (e.g., "4 players", "1 player")
 */
export function getPlayerCountLabel(count: number): string {
  return `${count} player${count !== 1 ? 's' : ''}`;
}

/**
 * Get players needed label for forming matches
 */
export function getPlayersNeededLabel(needed: number): string {
  return `Need ${needed} more`;
}

/**
 * Format match description (e.g., "Doubles 1", "Singles", "Forming (need 2)")
 */
export function formatMatchDescription(match: Match): string {
  const typeLabel = getMatchTypeLabel(match.type);

  if (match.type === 'doubles' && match.number) {
    return `${typeLabel} ${match.number}`;
  }

  if ((match.type === 'doubles-forming' || match.type === 'singles-forming') && match.needed) {
    return `${typeLabel} (need ${match.needed})`;
  }

  return typeLabel;
}

/**
 * Format player display name with optional time range
 */
export function formatPlayerDisplay(player: CheckinData): string {
  let display = player.name;

  if (player.timeRange) {
    const timeStr = formatTimeRange(player.timeRange.start, player.timeRange.end);
    if (timeStr) {
      display += ` (${timeStr})`;
    }
  }

  return display;
}

/**
 * Get play style badge text
 */
export function getPlayStyleBadge(playStyle: PlayStyle | undefined): string {
  switch (playStyle) {
    case 'singles':
      return 'S';
    case 'doubles':
      return 'D';
    case 'both':
    default:
      return 'E';
  }
}

/**
 * Get play style color class
 */
export function getPlayStyleColorClass(playStyle: PlayStyle | undefined): string {
  switch (playStyle) {
    case 'singles':
      return 'singles-badge';
    case 'doubles':
      return 'doubles-badge';
    case 'both':
    default:
      return 'either-badge';
  }
}

/**
 * Format match players list
 */
export function formatMatchPlayersList(match: Match, separator: string = ', '): string {
  return match.players.map((p) => p.name).join(separator);
}

/**
 * Get match status indicator
 */
export function getMatchStatusIndicator(match: Match): string {
  if (match.type === 'doubles' || match.type === 'singles') {
    return '✓';
  }
  if (match.canRotate) {
    return '⟳';
  }
  if (match.needed) {
    return `+${match.needed}`;
  }
  return '';
}

/**
 * Check if match is complete (not forming)
 */
export function isMatchComplete(match: Match): boolean {
  return match.type === 'doubles' || match.type === 'singles';
}

/**
 * Check if match is forming
 */
export function isMatchForming(match: Match): boolean {
  return (
    match.type === 'doubles-forming' ||
    match.type === 'singles-forming' ||
    match.type === 'singles-or-practice'
  );
}

/**
 * Get CSS class for match type
 */
export function getMatchTypeClass(matchType: MatchType): string {
  switch (matchType) {
    case 'doubles':
      return 'match-doubles';
    case 'singles':
      return 'match-singles';
    case 'doubles-forming':
      return 'match-forming';
    case 'singles-forming':
      return 'match-forming';
    case 'singles-or-practice':
      return 'match-practice';
    default:
      return '';
  }
}

/**
 * Format rotation status
 */
export function formatRotationStatus(match: Match): string | null {
  if (match.type !== 'doubles-forming') {
    return null;
  }

  if (match.canRotate) {
    return 'Can rotate';
  }

  if (match.players.length === 3) {
    return 'Need rotation approval';
  }

  return null;
}
