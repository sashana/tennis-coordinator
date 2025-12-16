/**
 * Match notes utilities
 */

import type { MatchType } from '@/types';

/**
 * Build match key from type and number
 */
export function buildMatchKey(matchType: MatchType, matchNumber?: number): string {
  if (matchNumber !== undefined) {
    return `${matchType}-${matchNumber}`;
  }
  return matchType;
}

/**
 * Parse match key into type and number
 */
export function parseMatchKey(matchKey: string): {
  type: string;
  number?: number;
} {
  const parts = matchKey.split('-');

  // Handle compound types like 'doubles-forming-1'
  if (parts.length >= 3 && (parts[0] === 'doubles' || parts[0] === 'singles')) {
    const number = parseInt(parts[parts.length - 1]);
    if (!isNaN(number)) {
      return {
        type: parts.slice(0, -1).join('-'),
        number,
      };
    }
    return { type: matchKey };
  }

  // Handle simple types like 'doubles-1'
  if (parts.length === 2) {
    const number = parseInt(parts[1]);
    if (!isNaN(number)) {
      return {
        type: parts[0],
        number,
      };
    }
  }

  return { type: matchKey };
}

/**
 * Get match note for a specific match
 */
export function getMatchNote(matchNotes: Record<string, string>, matchKey: string): string {
  return matchNotes[matchKey] || '';
}

/**
 * Set match note
 */
export function setMatchNote(
  matchNotes: Record<string, string>,
  matchKey: string,
  note: string
): Record<string, string> {
  if (!note.trim()) {
    // Remove empty notes
    const result = { ...matchNotes };
    delete result[matchKey];
    return result;
  }

  return {
    ...matchNotes,
    [matchKey]: note.trim(),
  };
}

/**
 * Get all match notes for a date
 */
export function getMatchNotesForDate(
  allMatchNotes: { [date: string]: Record<string, string> },
  dateStr: string
): Record<string, string> {
  return allMatchNotes[dateStr] || {};
}

/**
 * Set match notes for a date
 */
export function setMatchNotesForDate(
  allMatchNotes: { [date: string]: Record<string, string> },
  dateStr: string,
  notes: Record<string, string>
): { [date: string]: Record<string, string> } {
  return {
    ...allMatchNotes,
    [dateStr]: notes,
  };
}

/**
 * Check if match has notes
 */
export function hasMatchNotes(matchNotes: Record<string, string>, matchKey: string): boolean {
  const note = matchNotes[matchKey];
  return note !== undefined && note.trim().length > 0;
}

/**
 * Count matches with notes
 */
export function countMatchesWithNotes(matchNotes: Record<string, string>): number {
  return Object.values(matchNotes).filter((note) => note.trim().length > 0).length;
}

/**
 * Get match keys with notes
 */
export function getMatchKeysWithNotes(matchNotes: Record<string, string>): string[] {
  return Object.keys(matchNotes).filter((key) => matchNotes[key].trim().length > 0);
}

/**
 * Clear all match notes
 */
export function clearAllMatchNotes(): Record<string, string> {
  return {};
}

/**
 * Merge match notes (keeps non-empty notes)
 */
export function mergeMatchNotes(
  existing: Record<string, string>,
  incoming: Record<string, string>
): Record<string, string> {
  const result = { ...existing };

  for (const [key, note] of Object.entries(incoming)) {
    if (note.trim()) {
      result[key] = note.trim();
    } else {
      delete result[key];
    }
  }

  return result;
}

/**
 * Format notes for display (truncate if too long)
 */
export function formatNoteForDisplay(note: string, maxLength: number = 100): string {
  const trimmed = note.trim();
  if (trimmed.length <= maxLength) {
    return trimmed;
  }
  return trimmed.substring(0, maxLength - 3) + '...';
}

/**
 * Get notes summary for a date
 */
export function getNotesSummary(matchNotes: Record<string, string>): {
  total: number;
  matchKeys: string[];
} {
  const matchKeys = getMatchKeysWithNotes(matchNotes);
  return {
    total: matchKeys.length,
    matchKeys,
  };
}
