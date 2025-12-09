/**
 * Activity logging utilities
 *
 * This module handles activity log formatting and entry creation.
 */

import type {
  ActivityAction,
  ActivityEntry,
  PlayStyle,
  TimeRange,
} from '@/types';
import { normalizeName, formatTimeRange, getPreferenceLabel } from './helpers';

/**
 * Create an activity entry
 */
export function createActivityEntry(
  action: ActivityAction,
  player: string,
  by: string,
  extras: {
    playStyle?: PlayStyle;
    timeRange?: TimeRange;
    contact?: string;
    notes?: string;
    type?: string;
    matchKey?: string;
  } = {}
): ActivityEntry {
  return {
    timestamp: Date.now(),
    action,
    player,
    by,
    ...extras,
  };
}

/**
 * Format activity entry for display
 */
export function formatActivityDisplay(entry: ActivityEntry): string {
  const time = new Date(entry.timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  switch (entry.action) {
    case 'check-in': {
      const details: string[] = [];
      if (entry.playStyle) {
        details.push(getPreferenceLabel(entry.playStyle));
      }
      if (entry.timeRange) {
        const timeStr = formatTimeRange(entry.timeRange.start, entry.timeRange.end);
        if (timeStr) details.push(timeStr);
      }
      const detailsStr = details.length > 0 ? ` [${details.join(', ')}]` : '';
      const byStr =
        normalizeName(entry.by) !== normalizeName(entry.player)
          ? ` (added by ${entry.by})`
          : '';
      return `${time} - ${entry.player} checked in${detailsStr}${byStr}`;
    }

    case 'removal': {
      const byStr =
        normalizeName(entry.by) !== normalizeName(entry.player)
          ? ` (by ${entry.by})`
          : '';
      return `${time} - ${entry.player} removed${byStr}`;
    }

    case 'member_added': {
      const contactStr = entry.contact ? ` (${entry.contact})` : '';
      return `${time} - ${entry.player}${contactStr} added by ${entry.by}`;
    }

    case 'member_removed': {
      return `${time} - ${entry.player} removed by ${entry.by}`;
    }

    case 'whatsapp_share': {
      const typeStr = entry.type ? ` (${entry.type})` : '';
      return `${time} - ${entry.by} shared to WhatsApp${typeStr}`;
    }

    case 'notes_saved': {
      const matchStr = entry.matchKey ? ` for ${entry.matchKey}` : '';
      return `${time} - Notes saved${matchStr} by ${entry.by}`;
    }

    default:
      return `${time} - ${entry.action} by ${entry.by}`;
  }
}

/**
 * Check if activity entry matches a filter
 */
export function matchesActivityFilter(
  entry: ActivityEntry,
  filter: {
    player?: string;
    action?: ActivityAction;
    by?: string;
  }
): boolean {
  if (filter.player && normalizeName(entry.player) !== normalizeName(filter.player)) {
    return false;
  }
  if (filter.action && entry.action !== filter.action) {
    return false;
  }
  if (filter.by && normalizeName(entry.by) !== normalizeName(filter.by)) {
    return false;
  }
  return true;
}

/**
 * Sort activity entries by timestamp (most recent first)
 */
export function sortActivitiesByTime(
  entries: ActivityEntry[],
  ascending: boolean = false
): ActivityEntry[] {
  return [...entries].sort((a, b) =>
    ascending ? a.timestamp - b.timestamp : b.timestamp - a.timestamp
  );
}

/**
 * Get activity summary for a date
 */
export function getActivitySummary(entries: ActivityEntry[]): {
  checkins: number;
  removals: number;
  memberChanges: number;
  shares: number;
} {
  return entries.reduce(
    (acc, entry) => {
      switch (entry.action) {
        case 'check-in':
          acc.checkins++;
          break;
        case 'removal':
          acc.removals++;
          break;
        case 'member_added':
        case 'member_removed':
          acc.memberChanges++;
          break;
        case 'whatsapp_share':
          acc.shares++;
          break;
      }
      return acc;
    },
    { checkins: 0, removals: 0, memberChanges: 0, shares: 0 }
  );
}

/**
 * Get unique players from activity entries
 */
export function getUniquePlayers(entries: ActivityEntry[]): string[] {
  const players = new Set<string>();
  for (const entry of entries) {
    if (entry.player) {
      players.add(entry.player);
    }
  }
  return Array.from(players);
}
