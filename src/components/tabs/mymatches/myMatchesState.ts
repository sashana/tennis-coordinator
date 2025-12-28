/**
 * Shared state (signals) for MyMatchesTab components
 */
import { signal, computed } from '@preact/signals';
import {
  allCheckins,
  sessionUser,
  memberDetails,
  currentGroupId,
} from '../../App';
import { organizeMatches } from '../../../utils/matching';
import { normalizeName } from '../../../utils/helpers';

// Types
export interface ScheduledMatch {
  date: string;
  type: string;
  matchNumber: number;
  players: { name: string; timeRange?: { start: string; end: string } }[];
  isForming: boolean;
  needed?: number;
}

// State for inline share dropdown
export const activeShareDropdown = signal<string | null>(null);

// State for admin viewing another user's games
export const viewingUser = signal<string | null>(null);
export const showMemberPicker = signal(false);

// State for multi-select sharing
export const isSelectionMode = signal(false);
export const selectedGames = signal<Set<string>>(new Set());
export const showShareOptions = signal(false);

// State for Upcoming/Past toggle
export const gamesView = signal<'upcoming' | 'past'>('upcoming');

// Check if current user is admin
export function isGroupAdmin(): boolean {
  const groupId = currentGroupId.value;
  if (!groupId) {
    return false;
  }
  return sessionStorage.getItem(`adminAuth_${groupId}`) === 'true';
}

// Close dropdowns when clicking outside
if (typeof document !== 'undefined') {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;

    // Close share dropdown
    if (activeShareDropdown.value) {
      if (!target.closest('.share-dropdown') && !target.closest('[data-share-button]')) {
        activeShareDropdown.value = null;
      }
    }

    // Close member picker dropdown
    if (showMemberPicker.value) {
      if (
        !target.closest('.member-picker-dropdown') &&
        !target.closest('[data-member-picker-button]')
      ) {
        showMemberPicker.value = false;
      }
    }
  });
}

// Compute user's matches across all dates (both upcoming and past)
export const allUserMatches = computed(() => {
  // Use viewingUser if admin is viewing another user, otherwise use sessionUser
  const user = viewingUser.value || sessionUser.value;
  if (!user) {
    return { upcoming: [], past: [] };
  }

  const normalizedUser = normalizeName(user);
  const upcoming: ScheduledMatch[] = [];
  const past: ScheduledMatch[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get all dates and sort them
  const dates = Object.keys(allCheckins.value).sort();

  for (const date of dates) {
    const dateObj = new Date(date + 'T00:00:00');
    const isPast = dateObj < today;

    const checkins = allCheckins.value[date] || [];
    if (checkins.length === 0) {
      continue;
    }

    // Build user preferences from member details
    const userPreferences: Record<string, { include: string[]; exclude: string[] }> = {};
    const details = memberDetails.value || {};
    for (const [name, prefs] of Object.entries(details)) {
      if (prefs && typeof prefs === 'object') {
        userPreferences[normalizeName(name)] = {
          include: (prefs as any).include || [],
          exclude: (prefs as any).exclude || [],
        };
      }
    }

    // Organize matches for this date
    const result = organizeMatches(checkins, userPreferences);

    // Find matches where user is a player
    for (const match of result.matches) {
      const playerNames = match.players.map((p: any) => normalizeName(p.name));

      if (playerNames.includes(normalizedUser)) {
        const isForming = match.type === 'doubles-forming' || match.type === 'singles-forming';
        const matchData: ScheduledMatch = {
          date,
          type: match.type,
          matchNumber: match.number || 1,
          players: match.players.map((p: any) => ({ name: p.name, timeRange: p.timeRange })),
          isForming,
          needed: match.needed,
        };

        if (isPast) {
          past.push(matchData);
        } else {
          upcoming.push(matchData);
        }
      }
    }
  }

  // Sort past games: most recent first (reverse chronological)
  past.sort((a, b) => b.date.localeCompare(a.date));

  return { upcoming, past };
});

// Selection mode helpers
export function toggleGameSelection(matchKey: string) {
  const newSet = new Set(selectedGames.value);
  if (newSet.has(matchKey)) {
    newSet.delete(matchKey);
  } else {
    newSet.add(matchKey);
  }
  selectedGames.value = newSet;
}

export function exitSelectionMode() {
  isSelectionMode.value = false;
  selectedGames.value = new Set();
  showShareOptions.value = false;
}
