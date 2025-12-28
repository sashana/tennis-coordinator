/**
 * Sport Terminology Helper Functions
 *
 * Provides sport-agnostic terminology based on the current sport configuration.
 * Use these helpers in UI components to display sport-appropriate text.
 */

import { sport, getPlayerCount } from '@/config/sport';

/**
 * Get the sport-specific term for a match type
 */
export const t = {
  // Match types
  match: () => sport.terms.match,
  court: () => sport.terms.court,
  doubles: () => sport.terms.doubles,
  singles: () => sport.terms.singles,
  player: () => sport.terms.player,
  doublesForming: () => sport.terms.doublesForming,
  singlesForming: () => sport.terms.singlesForming,

  // Sport identity
  sportName: () => sport.name,
  sportNameLower: () => sport.nameLower,
  appName: () => sport.appName,
  tagline: () => sport.tagline,
  sportEmoji: () => sport.sportEmoji,

  // Dynamic player count text
  doublesPlayerCount: () => getPlayerCount('doubles'),
  singlesPlayerCount: () => getPlayerCount('singles'),
  rotationPlayerCount: () => getPlayerCount('doubles') - 1,
};

/**
 * Format a "need X more" message
 */
export function formatNeededPlayers(needed: number, matchType: 'doubles' | 'singles'): string {
  const playerWord = needed === 1 ? t.player() : `${t.player()}s`;
  return `${needed} more ${playerWord} needed`;
}

/**
 * Get the match type label (for display)
 */
export function getMatchTypeLabel(
  type: string
): string {
  switch (type) {
    case 'doubles':
      return t.doubles();
    case 'singles':
      return t.singles();
    case 'doubles-forming':
      return t.doublesForming();
    case 'singles-forming':
      return t.singlesForming();
    case 'singles-or-practice':
      return `${t.singles()} or Practice`;
    case 'waiting':
      return 'Waiting';
    default:
      return type;
  }
}

/**
 * Get short label for match type (for badges)
 */
export function getMatchTypeShortLabel(type: string): string {
  switch (type) {
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
    case 'waiting':
      return 'W';
    default:
      return '?';
  }
}

/**
 * Format match description for display
 * e.g., "Doubles 1", "Singles Forming (need 1)"
 */
export function formatMatchDescription(
  type: string,
  number?: number,
  needed?: number
): string {
  const label = getMatchTypeLabel(type);

  if (type === 'doubles' && number) {
    return `${label} ${number}`;
  }

  if ((type === 'doubles-forming' || type === 'singles-forming') && needed) {
    return `${label} (need ${needed})`;
  }

  return label;
}

/**
 * Get play style label for display
 */
export function getPlayStyleLabel(playStyle: string): string {
  switch (playStyle) {
    case 'singles':
      return `${t.singles()} Only`;
    case 'doubles':
      return `${t.doubles()} Only`;
    case 'both':
    default:
      return 'Either';
  }
}

/**
 * Format share message header
 */
export function formatShareHeader(date: string): string {
  return `${t.sportEmoji()} ${t.sportName()} Update`;
}

/**
 * Format "see you on the courts" message
 */
export function formatSeeYouMessage(): string {
  return `See you on the ${t.court()}s!`;
}
