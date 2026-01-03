import { useEffect } from 'preact/hooks';
import { signal, effect } from '@preact/signals';
import { getDatabase } from '../config/firebase';
import { createLogger } from '../utils/logger';
import { linkUserToGroup, updateGroupActivity } from './usePlatformUser';
import { sport } from '../config/sport';
import { notifyGameConfirmed } from '../services/pushNotifications';

const themeLogger = createLogger('Theme');
const notificationLogger = createLogger('Notifications');
const matchLogger = createLogger('MatchFormations');
const checkinLogger = createLogger('Checkins');
const memberLogger = createLogger('Members');
const arrangementLogger = createLogger('Arrangements');
const activityLogger = createLogger('Activity');
import {
  currentGroupId,
  currentGroupName,
  selectedDate,
  allCheckins,
  coreMembers,
  memberDetails,
  sessionUser,
  showToast,
} from '../components/App';
import {
  selectedName,
  isFormExpanded,
  showSharePrompt,
  sharePromptData,
} from '../components/pages/MainApp';
import { formatTimeRange, formatDateForNotification, normalizeName } from '../utils/helpers';
import { organizeMatches } from '../utils/matching';
import type { CheckinData } from '../types';

// Group settings
export const groupSettings = signal<{
  groupPin: string;
  adminPin: string;
  shortCode?: string;
  location?: { lat: number; lon: number; name: string };
  groupDescription?: string;
  groupRules?: string;
  theme?: string;
}>({
  groupPin: '',
  adminPin: '',
});

// Apply theme to document
export function applyTheme(themeName?: string) {
  const root = document.documentElement;
  themeLogger.debug('Applying theme:', themeName);

  // Remove all theme classes (both old and new theme names)
  root.classList.remove(
    'theme-wimbledon',
    'theme-roland-garros',
    'theme-australian-open',
    'theme-us-open',
    // Legacy theme names (for backwards compatibility)
    'theme-clay',
    'theme-hardcourt',
    'theme-tennis-ball'
  );
  root.removeAttribute('data-theme');

  if (themeName && themeName !== 'default') {
    const themeClass = `theme-${themeName}`;
    root.classList.add(themeClass);
    root.setAttribute('data-theme', themeName);
    themeLogger.debug('Added class:', { themeClass, themeName, classes: root.className });
  } else {
    themeLogger.debug('Using default theme (no class added)');
  }
}

// Match notes (for selected date)
export const matchNotes = signal<Record<string, string>>({});

// All match notes (across all dates) - keyed by date then matchKey
export const allMatchNotes = signal<Record<string, Record<string, string>>>({});

// Track previous match state by date (for detecting new match formations)
const previousMatchState: Record<string, Record<string, { type: string; players: string[] }>> = {};

// Firebase references helper
function getRef(path: string) {
  const db = getDatabase();
  return db.ref(path);
}

export function useGroupData() {
  useEffect(() => {
    // Use effect() to subscribe to signal changes
    const dispose = effect(() => {
      const groupId = currentGroupId.value;
      if (!groupId || groupId === 'admin') {
        return;
      }

      // Load group settings
      const settingsRef = getRef(`groups/${groupId}/settings`);

      settingsRef
        .once('value')
        .then((snapshot) => {
          const settings = (snapshot.val() || {}) as Record<string, unknown>;

          currentGroupName.value = (settings.groupName as string) || 'Unknown Group';
          // Read from 'members' field, fallback to 'coreMembers' for compatibility
          coreMembers.value = (settings.members as string[]) || (settings.coreMembers as string[]) || [];
          memberDetails.value = (settings.memberDetails as Record<string, unknown>) || {};

          // Check if current session user was renamed by admin
          const renamedMembers = (settings.renamedMembers as Record<string, string>) || {};
          if (sessionUser.value && renamedMembers[sessionUser.value]) {
            const newName = renamedMembers[sessionUser.value];
            sessionUser.value = newName;
            localStorage.setItem(`sessionUser_${groupId}`, newName);
          }

          groupSettings.value = {
            groupPin: (settings.groupPin as string) || '',
            adminPin: (settings.adminPin as string) || '',
            shortCode: settings.shortCode as string | undefined,
            location: settings.location as { lat: number; lon: number; name: string } | undefined,
            groupDescription: settings.groupDescription as string | undefined,
            groupRules: settings.groupRules as string | undefined,
            theme: settings.theme as string | undefined,
          };

          // Apply the group's theme
          applyTheme(settings.theme as string | undefined);

          // Update document title
          document.title = `${settings.groupName || sport.name} - ${sport.appName}`;
        })
        .catch((error: unknown) => {
          checkinLogger.error('Error loading group settings:', error);
          showToast('Failed to load group data', 'error');
        });
    });

    return () => {
      dispose();
    };
  }, []);
}

export function useCheckins() {
  useEffect(() => {
    let currentRef: ReturnType<typeof getRef> | null = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let currentUnsubscribe: any = null;

    const dispose = effect(() => {
      const groupId = currentGroupId.value;

      // Cleanup previous listener
      if (currentRef && currentUnsubscribe) {
        currentRef.off('value', currentUnsubscribe);
      }

      if (!groupId || groupId === 'admin') {
        return;
      }

      currentRef = getRef(`groups/${groupId}/checkins`);

      // Set up real-time listener for check-ins
      currentUnsubscribe = currentRef.on('value', (snapshot) => {
        const data = (snapshot.val() || {}) as Record<string, unknown[]>;
        allCheckins.value = data;
      });
    });

    return () => {
      dispose();
      if (currentRef && currentUnsubscribe) {
        currentRef.off('value', currentUnsubscribe);
      }
    };
  }, []);
}

export function useMatchNotes() {
  useEffect(() => {
    let currentRef: ReturnType<typeof getRef> | null = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let currentUnsubscribe: any = null;

    const dispose = effect(() => {
      const groupId = currentGroupId.value;
      const date = selectedDate.value;

      // Cleanup previous listener
      if (currentRef && currentUnsubscribe) {
        currentRef.off('value', currentUnsubscribe);
      }

      if (!groupId || groupId === 'admin' || !date) {
        matchNotes.value = {};
        return;
      }

      currentRef = getRef(`groups/${groupId}/matchNotes/${date}`);

      // Set up real-time listener for match notes
      currentUnsubscribe = currentRef.on('value', (snapshot) => {
        matchNotes.value = (snapshot.val() || {}) as Record<string, string>;
      });
    });

    return () => {
      dispose();
      if (currentRef && currentUnsubscribe) {
        currentRef.off('value', currentUnsubscribe);
      }
    };
  }, []);
}

// Load all match notes across all dates (for My Upcoming Games view)
export function useAllMatchNotes() {
  useEffect(() => {
    let currentRef: ReturnType<typeof getRef> | null = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let currentUnsubscribe: any = null;

    const dispose = effect(() => {
      const groupId = currentGroupId.value;

      // Cleanup previous listener
      if (currentRef && currentUnsubscribe) {
        currentRef.off('value', currentUnsubscribe);
      }

      if (!groupId || groupId === 'admin') {
        allMatchNotes.value = {};
        return;
      }

      currentRef = getRef(`groups/${groupId}/matchNotes`);

      // Set up real-time listener for all match notes
      currentUnsubscribe = currentRef.on('value', (snapshot) => {
        allMatchNotes.value = (snapshot.val() || {}) as Record<string, Record<string, string>>;
      });
    });

    return () => {
      dispose();
      if (currentRef && currentUnsubscribe) {
        currentRef.off('value', currentUnsubscribe);
      }
    };
  }, []);
}

// Check-in functions
export async function addCheckin(checkin: {
  name: string;
  playStyle: string;
  isGuest: boolean;
  addedBy: string;
  allowRotation: boolean;
  timeRange?: { start: string; end: string };
}) {
  const groupId = currentGroupId.value;
  const date = selectedDate.value;
  if (!groupId || !date) {
    return;
  }

  const checkinsRef = getRef(`groups/${groupId}/checkins/${date}`);
  const currentCheckins = allCheckins.value[date] || [];

  // Check for duplicate check-in
  const normalizedName = normalizeName(checkin.name);
  const alreadyCheckedIn = currentCheckins.some(
    (c: { name?: string }) => c.name && normalizeName(c.name) === normalizedName
  );

  if (alreadyCheckedIn) {
    showToast(`${checkin.name} is already checked in for this date!`, 'error');
    return;
  }

  // Build checkin object, excluding undefined values (Firebase doesn't allow undefined)
  const newCheckin: Record<string, unknown> = {
    name: checkin.name,
    playStyle: checkin.playStyle,
    isGuest: checkin.isGuest,
    addedBy: checkin.addedBy,
    allowRotation: checkin.allowRotation,
    timestamp: Date.now(),
  };

  // Only add timeRange if it exists
  if (checkin.timeRange) {
    newCheckin.timeRange = checkin.timeRange;
  }

  try {
    await checkinsRef.set([...currentCheckins, newCheckin]);
    // Toast removed - SharePromptBanner handles the feedback

    // Log activity
    await logActivity(groupId, date, 'checkin', checkin.name, checkin.addedBy);

    // Link user to group if checking in for self (fire-and-forget)
    const sessionUserName = sessionUser.value;
    if (sessionUserName && normalizeName(checkin.name) === normalizeName(sessionUserName)) {
      linkUserToGroup(groupId, sessionUserName);
    } else if (sessionUserName) {
      // User is checking in someone else, just update their activity
      updateGroupActivity(groupId);
    }

    // Notify users with activity alerts
    checkinLogger.debug('About to call notifyCheckinAlert for:', checkin.name);
    try {
      await notifyCheckinAlert(groupId, checkin.name, date, checkin.addedBy, {
        playStyle: checkin.playStyle,
        timeRange: checkin.timeRange,
        allowRotation: checkin.allowRotation,
      });
      checkinLogger.debug('notifyCheckinAlert completed');
    } catch (notifyError) {
      checkinLogger.error('Error in notifyCheckinAlert:', notifyError);
    }

    // Check if any new matches were formed and notify players
    // Use setTimeout to allow Firebase to update before checking
    setTimeout(() => checkAndNotifyMatchFormations(groupId, date), 500);
  } catch (error) {
    checkinLogger.error('Error adding check-in:', error);
    showToast('Failed to check in', 'error');
  }
}

export async function updateCheckin(
  index: number,
  updates: {
    playStyle?: string;
    timeRange?: { start: string; end: string };
    allowRotation?: boolean;
  },
  sessionUserName: string
) {
  const groupId = currentGroupId.value;
  const date = selectedDate.value;
  if (!groupId || !date) {
    return;
  }

  const currentCheckins = allCheckins.value[date] || [];
  const person = currentCheckins[index] as { name?: string; addedBy?: string } | undefined;
  if (!person) {
    return;
  }

  const personName = person.name || 'this person';

  // Permission check: Can edit if you're the owner, the adder, or admin
  const isOwner = sessionUserName && normalizeName(sessionUserName) === normalizeName(personName);
  const isAdder =
    person.addedBy &&
    sessionUserName &&
    normalizeName(sessionUserName) === normalizeName(person.addedBy);
  const isAdmin = sessionStorage.getItem(`adminAuth_${groupId}`) === 'true';

  if (!isOwner && !isAdder && !isAdmin) {
    showToast('You can only edit check-ins you added', 'error');
    return;
  }

  const checkinsRef = getRef(`groups/${groupId}/checkins/${date}`);
  const updatedCheckins = [...currentCheckins];

  // Filter out undefined values before applying updates (Firebase doesn't accept undefined)
  const filteredUpdates: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(updates)) {
    if (value !== undefined) {
      filteredUpdates[key] = value;
    }
  }

  updatedCheckins[index] = { ...updatedCheckins[index], ...filteredUpdates };

  try {
    await checkinsRef.set(updatedCheckins);
    showToast(`${personName}'s preferences updated`, 'success');
  } catch (error) {
    checkinLogger.error('Error updating check-in:', error);
    showToast('Failed to update check-in', 'error');
  }
}

// Helper to remove a player from the current match arrangement
async function removePlayerFromArrangement(groupId: string, date: string, playerName: string) {
  const arrangement = matchArrangement.value;
  if (!arrangement || !arrangement.matches) {
    return;
  }

  // Remove player from all matches
  const newMatches: Record<string, { players: string[]; note?: string }> = {};
  for (const [matchKey, matchData] of Object.entries(arrangement.matches)) {
    const players = (matchData.players || []).filter(
      (p: string) => normalizeName(p) !== normalizeName(playerName)
    );
    // Only keep matches that still have players
    if (players.length > 0) {
      newMatches[matchKey] = { ...matchData, players };
    }
  }

  // Remove from unassigned as well
  const newUnassigned = (arrangement.unassigned || []).filter(
    (p: string) => normalizeName(p) !== normalizeName(playerName)
  );

  // If no matches left and no unassigned, clear the arrangement entirely
  if (Object.keys(newMatches).length === 0 && newUnassigned.length === 0) {
    try {
      await getRef(`groups/${groupId}/matchArrangements/${date}`).remove();
      matchArrangement.value = null;
    } catch (error) {
      arrangementLogger.error('Error clearing arrangement after removal:', error);
    }
    return;
  }

  const updatedArrangement = {
    ...arrangement,
    matches: newMatches,
    unassigned: newUnassigned,
  };

  try {
    await getRef(`groups/${groupId}/matchArrangements/${date}`).set(updatedArrangement);
    matchArrangement.value = updatedArrangement;
  } catch (error) {
    arrangementLogger.error('Error updating arrangement after removal:', error);
  }
}

// Check if user can remove a check-in (returns info or null if not allowed)
export function canRemoveCheckin(
  index: number,
  sessionUserName: string
): {
  personName: string;
  isOwner: boolean;
} | null {
  const groupId = currentGroupId.value;
  const date = selectedDate.value;
  if (!groupId || !date) {
    return null;
  }

  const currentCheckins = allCheckins.value[date] || [];
  const person = currentCheckins[index] as { name?: string; addedBy?: string } | undefined;
  const personName = person?.name || 'this person';

  // Permission check: Can remove if you're the owner, the adder, or admin
  const isOwner = Boolean(
    sessionUserName && normalizeName(sessionUserName) === normalizeName(personName)
  );
  const isAdder = Boolean(
    person?.addedBy &&
    sessionUserName &&
    normalizeName(sessionUserName) === normalizeName(person.addedBy)
  );
  const isAdmin = sessionStorage.getItem(`adminAuth_${groupId}`) === 'true';

  if (!isOwner && !isAdder && !isAdmin) {
    showToast('You can only remove check-ins you added', 'error');
    return null;
  }

  return { personName, isOwner };
}

// Actually remove the check-in (called after confirmation)
export async function removeCheckin(index: number, sessionUserName: string) {
  const groupId = currentGroupId.value;
  const date = selectedDate.value;
  if (!groupId || !date) {
    return;
  }

  const currentCheckins = allCheckins.value[date] || [];
  const person = currentCheckins[index] as { name?: string; addedBy?: string } | undefined;
  const personName = person?.name || 'this person';
  const isOwner = sessionUserName && normalizeName(sessionUserName) === normalizeName(personName);

  const checkinsRef = getRef(`groups/${groupId}/checkins/${date}`);
  const updatedCheckins = currentCheckins.filter((_: unknown, i: number) => i !== index);

  try {
    await checkinsRef.set(updatedCheckins.length > 0 ? updatedCheckins : null);
    // Toast removed - SharePromptBanner handles the feedback

    // If there's a custom arrangement, remove the player from it too
    if (matchArrangement.value && personName) {
      await removePlayerFromArrangement(groupId, date, personName);
    }

    // If user removed their own check-in, pre-select their name for easy re-check-in
    if (isOwner && sessionUserName) {
      selectedName.value = sessionUserName;
      isFormExpanded.value = true;
    }

    // Log activity
    await logActivity(groupId, date, 'removal', personName, sessionUserName);

    // Notify users with activity alerts
    checkinLogger.debug('About to call notifyRemovalAlert for:', personName);
    try {
      await notifyRemovalAlert(groupId, personName, date, sessionUserName);
      checkinLogger.debug('notifyRemovalAlert completed');
    } catch (notifyError) {
      checkinLogger.error('Error in notifyRemovalAlert:', notifyError);
    }

    // Check if any matches were dissolved and notify players
    // Use setTimeout to allow Firebase to update before checking
    setTimeout(() => checkAndNotifyMatchFormations(groupId, date), 500);
  } catch (error) {
    checkinLogger.error('Error removing check-in:', error);
    showToast('Failed to remove check-in', 'error');
  }
}

// Activity logging
async function logActivity(
  groupId: string,
  date: string,
  action: string,
  playerName: string,
  by: string,
  details: Record<string, unknown> = {}
) {
  const activityEntry: Record<string, unknown> = {
    timestamp: Date.now(),
    action,
    player: playerName,
    by: by || playerName,
    ...details,
  };

  // Remove undefined values (Firebase doesn't accept them)
  Object.keys(activityEntry).forEach((key) => {
    if (activityEntry[key] === undefined) {
      delete activityEntry[key];
    }
  });

  try {
    const db = getDatabase();
    const activityRef = db.ref(`groups/${groupId}/activity/${date}`);
    await activityRef.push(activityEntry);
  } catch (error) {
    activityLogger.error('Error logging activity:', error);
  }
}

// Notify users about check-in removal
async function notifyRemovalAlert(
  groupId: string,
  playerName: string,
  date: string,
  removedBy: string
) {
  // Check if user removed themselves
  const isSelf = normalizeName(playerName) === normalizeName(removedBy);
  const message = isSelf
    ? `${sport.sportEmoji} ${playerName} removed themselves from ${date}`
    : `${sport.sportEmoji} ${playerName} was removed from ${date} by ${removedBy}`;

  try {
    const db = getDatabase();
    const snapshot = await db.ref(`groups/${groupId}/userNotifications`).once('value');
    const allUserNotifications = (snapshot.val() || {}) as Record<
      string,
      {
        preferences?: {
          activityAlerts?: boolean;
          mutedMembers?: string[];
          unwatchedMembers?: string[];
        };
      }
    >;

    for (const [normalizedName, userData] of Object.entries(allUserNotifications)) {
      const prefs = userData.preferences || {};
      if (prefs.activityAlerts) {
        // Don't notify the person who removed
        if (normalizedName === normalizeName(removedBy)) {
          continue;
        }

        // Check if either the removed player or remover is unwatched (support both old mutedMembers and new unwatchedMembers)
        const unwatchedMembers = prefs.unwatchedMembers || prefs.mutedMembers || [];
        if (unwatchedMembers.includes(playerName) || unwatchedMembers.includes(removedBy)) {
          continue;
        }

        // Add notification
        const notifRef = db
          .ref(`groups/${groupId}/userNotifications/${normalizedName}/items`)
          .push();
        await notifRef.set({
          message,
          timestamp: Date.now(),
          read: false,
          date,
        });
      }
    }
  } catch (error) {
    notificationLogger.error('Error sending removal notifications:', error);
  }
}

// Helper to format play style for display
function formatPlayStyle(playStyle: string): string {
  switch (playStyle) {
    case 'singles':
      return 'Singles';
    case 'doubles':
      return 'Doubles';
    default:
      return 'Either';
  }
}

// Notify users about check-in
async function notifyCheckinAlert(
  groupId: string,
  playerName: string,
  date: string,
  addedBy: string,
  preferences: {
    playStyle?: string;
    timeRange?: { start: string; end: string };
    allowRotation?: boolean;
  }
) {
  const isSelf = normalizeName(playerName) === normalizeName(addedBy);

  // Build preference details
  const details: string[] = [];
  if (preferences.playStyle) {
    details.push(formatPlayStyle(preferences.playStyle));
  }
  if (preferences.timeRange) {
    const timeStr = formatTimeRange(preferences.timeRange.start, preferences.timeRange.end);
    if (timeStr) {
      details.push(timeStr);
    }
  }
  // Only show "No 3s" if singles and rotation disabled
  if (preferences.playStyle === 'singles' && preferences.allowRotation === false) {
    details.push('No 3s');
  }

  const detailsStr = details.length > 0 ? ` (${details.join(', ')})` : '';

  const message = isSelf
    ? `${sport.sportEmoji} ${playerName} checked in for ${date}${detailsStr}`
    : `${sport.sportEmoji} ${playerName} was added for ${date} by ${addedBy}${detailsStr}`;

  notificationLogger.debug('Starting notification for:', { playerName, date, addedBy });

  try {
    const db = getDatabase();
    const snapshot = await db.ref(`groups/${groupId}/userNotifications`).once('value');
    const allUserNotifications = (snapshot.val() || {}) as Record<
      string,
      {
        preferences?: {
          activityAlerts?: boolean;
          mutedMembers?: string[];
          unwatchedMembers?: string[];
        };
      }
    >;

    notificationLogger.debug(
      'Found userNotifications entries:',
      Object.keys(allUserNotifications)
    );

    for (const [normalizedName, userData] of Object.entries(allUserNotifications)) {
      const prefs = userData.preferences || {};
      notificationLogger.debug(`User ${normalizedName}:`, {
        activityAlerts: prefs.activityAlerts,
        unwatchedMembers: prefs.unwatchedMembers || prefs.mutedMembers,
      });

      if (prefs.activityAlerts) {
        // Don't notify the person who checked in or added
        if (normalizedName === normalizeName(addedBy)) {
          notificationLogger.debug(`Skipping ${normalizedName} - is addedBy`);
          continue;
        }
        if (normalizedName === normalizeName(playerName)) {
          notificationLogger.debug(`Skipping ${normalizedName} - is player`);
          continue;
        }

        // Check if either the player or adder is unwatched (support both old mutedMembers and new unwatchedMembers)
        const unwatchedMembers = prefs.unwatchedMembers || prefs.mutedMembers || [];
        if (unwatchedMembers.includes(playerName) || unwatchedMembers.includes(addedBy)) {
          notificationLogger.debug(
            `Skipping ${normalizedName} - player/adder is unwatched`
          );
          continue;
        }

        // Add notification
        notificationLogger.debug(`Sending notification to ${normalizedName}`);
        const notifRef = db
          .ref(`groups/${groupId}/userNotifications/${normalizedName}/items`)
          .push();
        await notifRef.set({
          message,
          timestamp: Date.now(),
          read: false,
          date,
        });
        notificationLogger.debug(`Notification sent to ${normalizedName}`);
      }
    }
  } catch (error) {
    notificationLogger.error('Error sending check-in notifications:', error);
  }
}

// Check and notify match formations
// This compares current match state to previous and notifies players when new complete matches form
async function checkAndNotifyMatchFormations(groupId: string, date: string) {
  const checkins = (allCheckins.value[date] || []) as CheckinData[];
  if (checkins.length === 0) {
    return;
  }

  const { matches } = organizeMatches(checkins);
  const currentState: Record<string, { type: string; players: string[] }> = {};

  // Build current state of complete matches
  matches.forEach((match) => {
    if (match.type === 'doubles' || match.type === 'singles') {
      const playerNames = match.players
        .map((p) => normalizeName(p.name))
        .sort()
        .join(',');
      currentState[playerNames] = {
        type: match.type,
        players: match.players.map((p) => p.name),
      };
    }
  });

  const prevState = previousMatchState[date] || {};

  matchLogger.debug('Match state comparison:', {
    date,
    previousMatches: Object.keys(prevState).length,
    currentMatches: Object.keys(currentState).length,
    prevKeys: Object.keys(prevState),
    currentKeys: Object.keys(currentState),
  });

  // Find new matches (in current but not in previous)
  for (const [key, matchData] of Object.entries(currentState)) {
    if (!prevState[key]) {
      matchLogger.info(`🎾 NEW MATCH FORMED: ${key}`, matchData);
      // This is a new complete match - notify all players
      const formattedDate = formatDateForNotification(date);
      const matchType = matchData.type === 'doubles' ? 'Doubles' : 'Singles';

      for (const playerName of matchData.players) {
        const teammates = matchData.players.filter(
          (p) => normalizeName(p) !== normalizeName(playerName)
        );
        const message = `✅ You're in ${matchType} for ${formattedDate} with ${teammates.join(', ')}`;

        try {
          const db = getDatabase();
          const snapshot = await db
            .ref(`groups/${groupId}/userNotifications/${normalizeName(playerName)}/preferences`)
            .once('value');
          const prefs = (snapshot.val() || {}) as { matchConfirmations?: boolean };

          matchLogger.debug(`Player "${playerName}" prefs:`, {
            matchConfirmations: prefs.matchConfirmations,
            willSend: prefs.matchConfirmations !== false,
          });

          // Only send if matchConfirmations is enabled (default true)
          if (prefs.matchConfirmations !== false) {
            const notifRef = db
              .ref(`groups/${groupId}/userNotifications/${normalizeName(playerName)}/items`)
              .push();
            await notifRef.set({
              message,
              timestamp: Date.now(),
              read: false,
              date,
              type: 'match_formed',
              matchType,
            });
            matchLogger.info(
              `✅ Sent notification to ${playerName}: "${message}"`
            );
          } else {
            matchLogger.debug(
              `❌ Skipped ${playerName} - matchConfirmations disabled`
            );
          }
        } catch (error) {
          matchLogger.error(`Error sending match notification to ${playerName}:`, error);
        }
      }

      // Send push notifications to opted-in players
      try {
        matchLogger.info('Sending push notifications for confirmed game...');
        const result = await notifyGameConfirmed({
          groupId,
          gameDate: date,
          gameType: matchData.type,
          players: matchData.players,
          excludePlayer: sessionUser.value || undefined, // Don't notify the person who triggered confirmation
        });
        matchLogger.info('Push notification result:', result);
      } catch (pushError) {
        matchLogger.error('Error sending push notifications:', pushError);
      }
    } else {
      matchLogger.debug(`Match ${key} already exists (not new)`);
    }
  }

  // Find dissolved matches (in previous but not in current)
  for (const [key, prevMatchData] of Object.entries(prevState)) {
    if (!currentState[key]) {
      matchLogger.info(`💔 MATCH DISSOLVED: ${key}`, prevMatchData);
      // This match no longer exists - notify ALL players who were in this match
      const formattedDate = formatDateForNotification(date);
      const matchType = prevMatchData.type === 'doubles' ? 'Doubles' : 'Singles';

      // Find which players from the old match are still checked in
      const currentCheckinNames = checkins.map((c) => normalizeName(c.name));
      const remainingPlayers = prevMatchData.players.filter((p) =>
        currentCheckinNames.includes(normalizeName(p))
      );
      const droppedPlayers = prevMatchData.players.filter(
        (p) => !currentCheckinNames.includes(normalizeName(p))
      );

      const droppedNames = droppedPlayers.join(', ');
      const needed =
        matchType === 'Doubles' ? 4 - remainingPlayers.length : 2 - remainingPlayers.length;
      const neededText = needed === 1 ? 'Need 1 more player' : `Need ${needed} more players`;
      const message =
        droppedPlayers.length > 0
          ? `⚠️ Your ${matchType} for ${formattedDate} is no longer confirmed - ${droppedNames} dropped out. ${neededText}.`
          : `⚠️ Your ${matchType} for ${formattedDate} is no longer confirmed.`;

      // Notify ALL players who were in the match (both remaining and dropped)
      for (const playerName of prevMatchData.players) {
        try {
          const db = getDatabase();
          const snapshot = await db
            .ref(`groups/${groupId}/userNotifications/${normalizeName(playerName)}/preferences`)
            .once('value');
          const prefs = (snapshot.val() || {}) as { matchConfirmations?: boolean };

          matchLogger.debug(`Player "${playerName}" prefs:`, {
            matchConfirmations: prefs.matchConfirmations,
            willSend: prefs.matchConfirmations !== false,
          });

          // Only send if matchConfirmations is enabled (default true)
          if (prefs.matchConfirmations !== false) {
            const notifRef = db
              .ref(`groups/${groupId}/userNotifications/${normalizeName(playerName)}/items`)
              .push();
            await notifRef.set({
              message,
              timestamp: Date.now(),
              read: false,
              date,
              type: 'match_dissolved',
              matchType,
            });
            matchLogger.info(
              `✅ Sent dissolved notification to ${playerName}: "${message}"`
            );
          } else {
            matchLogger.debug(
              `❌ Skipped ${playerName} - matchConfirmations disabled`
            );
          }
        } catch (error) {
          matchLogger.error(`Error sending dissolved match notification to ${playerName}:`, error);
        }
      }
    }
  }

  // Update previous state
  previousMatchState[date] = currentState;
}

// Notify users about note changes
async function notifyNoteAlert(
  groupId: string,
  date: string,
  by: string,
  matchKey: string,
  action: 'added' | 'updated' | 'removed',
  noteContent?: string
) {
  // Format match key for display (e.g., "doubles-1" -> "Doubles 1")
  const matchLabel = matchKey
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace('Forming 1', '(forming)');

  let message: string;
  if (action === 'added') {
    const preview =
      noteContent && noteContent.length > 30 ? noteContent.substring(0, 30) + '...' : noteContent;
    message = `📝 ${by} added note to ${matchLabel}: "${preview}"`;
  } else if (action === 'updated') {
    const preview =
      noteContent && noteContent.length > 30 ? noteContent.substring(0, 30) + '...' : noteContent;
    message = `📝 ${by} updated note on ${matchLabel}: "${preview}"`;
  } else {
    message = `📝 ${by} removed note from ${matchLabel}`;
  }

  try {
    const db = getDatabase();
    const snapshot = await db.ref(`groups/${groupId}/userNotifications`).once('value');
    const allUserNotifications = (snapshot.val() || {}) as Record<
      string,
      {
        preferences?: {
          activityAlerts?: boolean;
          mutedMembers?: string[];
          unwatchedMembers?: string[];
        };
      }
    >;

    for (const [normalizedName, userData] of Object.entries(allUserNotifications)) {
      const prefs = userData.preferences || {};
      if (prefs.activityAlerts) {
        // Don't notify the person who made the change
        if (normalizedName === normalizeName(by)) {
          continue;
        }

        // Check if the person who made the change is unwatched (support both old mutedMembers and new unwatchedMembers)
        const unwatchedMembers = prefs.unwatchedMembers || prefs.mutedMembers || [];
        if (unwatchedMembers.includes(by)) {
          continue;
        }

        // Add notification
        const notifRef = db
          .ref(`groups/${groupId}/userNotifications/${normalizedName}/items`)
          .push();
        await notifRef.set({
          message,
          timestamp: Date.now(),
          read: false,
          date,
        });
      }
    }
  } catch (error) {
    notificationLogger.error('Error sending note notifications:', error);
  }
}

export async function resetDay() {
  const groupId = currentGroupId.value;
  const date = selectedDate.value;
  if (!groupId || !date) {
    return;
  }

  try {
    await getRef(`groups/${groupId}/checkins/${date}`).remove();
    await getRef(`groups/${groupId}/matchNotes/${date}`).remove();
    showToast('Day reset', 'success');
  } catch (error) {
    checkinLogger.error('Error resetting day:', error);
    showToast('Failed to reset day', 'error');
  }
}

// Track last saved note to detect changes (populated from matchNotes signal)
const lastSavedNotes: Record<string, string> = {};

export async function saveMatchNote(matchKey: string, note: string) {
  const groupId = currentGroupId.value;
  const date = selectedDate.value;
  if (!groupId || !date) {
    return;
  }

  try {
    const noteKey = `${groupId}:${date}:${matchKey}`;
    // Get previous note from cache or from current matchNotes signal
    const previousNote = lastSavedNotes[noteKey] ?? matchNotes.value[matchKey] ?? '';
    const by = sessionUser.value || 'Unknown';

    await getRef(`groups/${groupId}/matchNotes/${date}/${matchKey}`).set(note || null);

    // Determine what action to log and show toast
    if (note && !previousNote) {
      // New note added
      await logActivity(groupId, date, 'note_added', by, by, { matchKey, noteContent: note });
      await notifyNoteAlert(groupId, date, by, matchKey, 'added', note);
      lastSavedNotes[noteKey] = note;
      showToast('Note added', 'success');
    } else if (note && previousNote && note !== previousNote) {
      // Note updated
      await logActivity(groupId, date, 'note_updated', by, by, {
        matchKey,
        noteContent: note,
        previousNote,
      });
      await notifyNoteAlert(groupId, date, by, matchKey, 'updated', note);
      lastSavedNotes[noteKey] = note;
      showToast('Note updated', 'success');
    } else if (!note && previousNote) {
      // Note removed
      await logActivity(groupId, date, 'note_removed', by, by, { matchKey, previousNote });
      await notifyNoteAlert(groupId, date, by, matchKey, 'removed');
      delete lastSavedNotes[noteKey];
      showToast('Note removed', 'info');
    }
  } catch (error) {
    matchLogger.error('Error saving match note:', error);
    showToast('Failed to save note', 'error');
  }
}

// Add new member
export async function addMember(member: {
  name: string;
  phone?: string;
  email?: string;
  notes?: string;
  addedBy: string;
}) {
  const groupId = currentGroupId.value;
  if (!groupId) {
    return;
  }

  const settingsRef = getRef(`groups/${groupId}/settings`);

  try {
    // Get current members
    const snapshot = await settingsRef.once('value');
    const settings = (snapshot.val() || {}) as Record<string, unknown>;
    const currentMembers = (settings.members as string[]) || [];
    const currentDetails = (settings.memberDetails as Record<string, unknown>) || {};

    // Check for duplicate
    if (currentMembers.includes(member.name)) {
      showToast('Member already exists', 'error');
      return;
    }

    // Add member
    const newMembers = [...currentMembers, member.name].sort();
    const newDetails = {
      ...currentDetails,
      [member.name]: {
        addedBy: member.addedBy,
        addedDate: new Date().toISOString(),
        phone: member.phone || '',
        email: member.email || '',
        notes: member.notes || '',
      },
    };

    await settingsRef.update({
      members: newMembers,
      memberDetails: newDetails,
    });

    // Update local signals immediately
    coreMembers.value = newMembers;
    memberDetails.value = newDetails as Record<
      string,
      { phone?: string; email?: string; notes?: string; addedBy?: string; addedDate?: string }
    >;

    // Log activity
    const date = selectedDate.value || new Date().toISOString().split('T')[0];
    await logActivity(groupId, date, 'member_added', member.name, member.addedBy, {
      contact: member.phone || member.email || undefined,
      notes: member.notes || undefined,
    });

    // Show invite prompt instead of toast
    const groupUrl = `${window.location.origin}${window.location.pathname}?group=${groupId}`;
    sharePromptData.value = {
      action: 'invite',
      name: member.name,
      date: date,
      groupName: currentGroupName.value || `${sport.name} Group`,
      groupUrl: groupUrl,
      groupPin: groupSettings.value.groupPin || '',
    };
    showSharePrompt.value = true;
  } catch (error) {
    memberLogger.error('Error adding member:', error);
    showToast('Failed to add member', 'error');
  }
}

// Remove member
export async function removeMember(name: string) {
  const groupId = currentGroupId.value;
  if (!groupId) {
    return;
  }

  const settingsRef = getRef(`groups/${groupId}/settings`);

  try {
    const snapshot = await settingsRef.once('value');
    const settings = (snapshot.val() || {}) as Record<string, unknown>;
    const currentMembersList = (settings.members as string[]) || [];
    const currentDetailsList = (settings.memberDetails as Record<string, unknown>) || {};

    const newMembers = currentMembersList.filter((m) => m !== name);
    const newDetails = { ...currentDetailsList };
    delete newDetails[name];

    await settingsRef.update({
      members: newMembers,
      memberDetails: newDetails,
    });

    // Update local signals
    coreMembers.value = newMembers;
    memberDetails.value = newDetails;

    // Log activity
    const date = selectedDate.value || new Date().toISOString().split('T')[0];
    const removedBy = sessionUser.value || 'Admin';
    await logActivity(groupId, date, 'member_removed', name, removedBy);

    showToast(`${name} removed from members`, 'info');
  } catch (error) {
    memberLogger.error('Error removing member:', error);
    showToast('Failed to remove member', 'error');
  }
}

// Update member details (for users to update their own info)
export async function updateMemberDetails(
  name: string,
  updates: {
    phone?: string;
    email?: string;
    notes?: string;
    shareContactInDirectory?: boolean;
    shareNotesInDirectory?: boolean;
  }
) {
  const groupId = currentGroupId.value;
  if (!groupId) {
    return false;
  }

  const settingsRef = getRef(`groups/${groupId}/settings`);

  try {
    const snapshot = await settingsRef.once('value');
    const settings = (snapshot.val() || {}) as Record<string, unknown>;
    const currentDetailsList =
      (settings.memberDetails as Record<
        string,
        {
          phone?: string;
          email?: string;
          notes?: string;
          addedBy?: string;
          addedDate?: string;
          shareContactInDirectory?: boolean;
          shareNotesInDirectory?: boolean;
        }
      >) || {};

    // Get or create member details
    const existingDetails = currentDetailsList[name] || {};
    const newDetails = {
      ...currentDetailsList,
      [name]: {
        ...existingDetails,
        phone: updates.phone ?? existingDetails.phone ?? '',
        email: updates.email ?? existingDetails.email ?? '',
        notes: updates.notes ?? existingDetails.notes ?? '',
        shareContactInDirectory:
          updates.shareContactInDirectory ?? existingDetails.shareContactInDirectory ?? false,
        shareNotesInDirectory:
          updates.shareNotesInDirectory ?? existingDetails.shareNotesInDirectory ?? false,
      },
    };

    await settingsRef.update({
      memberDetails: newDetails,
    });

    // Update local signal
    memberDetails.value = newDetails;

    showToast('Profile updated', 'success');
    return true;
  } catch (error) {
    memberLogger.error('Error updating member details:', error);
    showToast('Failed to update profile', 'error');
    return false;
  }
}

// Rename member
export async function renameMember(oldName: string, newName: string) {
  const groupId = currentGroupId.value;
  if (!groupId) {
    return false;
  }

  const trimmedNewName = newName.trim();
  if (!trimmedNewName) {
    showToast('Name cannot be empty', 'error');
    return false;
  }

  if (trimmedNewName === oldName) {
    return true; // No change needed
  }

  const settingsRef = getRef(`groups/${groupId}/settings`);

  try {
    const snapshot = await settingsRef.once('value');
    const settings = (snapshot.val() || {}) as Record<string, unknown>;
    const currentMembersList = (settings.members as string[]) || [];
    const currentDetailsList = (settings.memberDetails as Record<string, unknown>) || {};

    // Check if new name already exists
    if (
      currentMembersList.some(
        (m) => m.toLowerCase() === trimmedNewName.toLowerCase() && m !== oldName
      )
    ) {
      showToast('A member with this name already exists', 'error');
      return false;
    }

    // Update members array
    const newMembers = currentMembersList.map((m) => (m === oldName ? trimmedNewName : m)).sort();

    // Move member details to new name key
    const newDetails = { ...currentDetailsList };
    if (newDetails[oldName]) {
      newDetails[trimmedNewName] = newDetails[oldName];
      delete newDetails[oldName];
    }

    // Get existing renamedMembers and add this rename mapping
    const existingRenamedMembers = (settings.renamedMembers as Record<string, string>) || {};
    const updatedRenamedMembers = { ...existingRenamedMembers, [oldName]: trimmedNewName };

    await settingsRef.update({
      members: newMembers,
      memberDetails: newDetails,
      renamedMembers: updatedRenamedMembers,
    });

    // Update local signals
    coreMembers.value = newMembers;
    memberDetails.value = newDetails;

    // Update sessionUser if the renamed member is the current session user
    if (sessionUser.value === oldName) {
      sessionUser.value = trimmedNewName;
      localStorage.setItem(`sessionUser_${groupId}`, trimmedNewName);
    }

    // Update all check-ins with the old name to the new name
    const db = getDatabase();
    const checkinsSnapshot = await db.ref(`groups/${groupId}/checkins`).once('value');
    const allCheckinsData = checkinsSnapshot.val() || {};

    // Process each date's check-ins (Firebase stores arrays as objects with numeric string keys)
    for (const [dateKey, dateCheckins] of Object.entries(allCheckinsData)) {
      if (dateCheckins && typeof dateCheckins === 'object') {
        // Convert to array, update names, then save back
        const checkinsArray = Object.values(dateCheckins) as Array<{
          name?: string;
          [key: string]: unknown;
        }>;
        let hasChanges = false;

        const updatedCheckins = checkinsArray.map((checkin) => {
          if (checkin && checkin.name === oldName) {
            hasChanges = true;
            return { ...checkin, name: trimmedNewName };
          }
          return checkin;
        });

        if (hasChanges) {
          await db.ref(`groups/${groupId}/checkins/${dateKey}`).set(updatedCheckins);
        }
      }
    }

    // Log activity
    const date = selectedDate.value || new Date().toISOString().split('T')[0];
    const renamedBy = sessionUser.value || 'Admin';
    await logActivity(groupId, date, 'member_renamed', trimmedNewName, renamedBy, { oldName });

    showToast(`${oldName} renamed to ${trimmedNewName}`, 'success');
    return true;
  } catch (error) {
    memberLogger.error('Error renaming member:', error);
    showToast('Failed to rename member', 'error');
    return false;
  }
}

// Match arrangement type and signal (loaded per date)
type MatchArrangementData = {
  matches: Record<string, { players: string[]; note?: string }>;
  unassigned: string[];
  arrangedBy: string;
  arrangedAt: number;
};

function isValidMatchArrangement(data: unknown): data is MatchArrangementData {
  return (
    data !== null &&
    typeof data === 'object' &&
    'matches' in data &&
    'arrangedBy' in data &&
    'arrangedAt' in data
  );
}

export const matchArrangement = signal<MatchArrangementData | null>(null);

// Load match arrangement for current date
export async function loadMatchArrangement() {
  const groupId = currentGroupId.value;
  const date = selectedDate.value;
  if (!groupId || !date) {
    matchArrangement.value = null;
    return;
  }

  try {
    const snapshot = await getRef(`groups/${groupId}/matchArrangements/${date}`).once('value');
    const data = snapshot.val();
    matchArrangement.value = isValidMatchArrangement(data) ? data : null;
  } catch (error) {
    arrangementLogger.error('Error loading match arrangement:', error);
    matchArrangement.value = null;
  }
}

// Save match arrangement
export async function saveMatchArrangement(arrangement: {
  matches: Record<string, { players: string[]; note?: string }>;
  unassigned: string[];
}) {
  const groupId = currentGroupId.value;
  const date = selectedDate.value;
  if (!groupId || !date) {
    return;
  }

  const arrangedBy = sessionUser.value || 'Admin';
  const fullArrangement = {
    ...arrangement,
    arrangedBy,
    arrangedAt: Date.now(),
  };

  try {
    await getRef(`groups/${groupId}/matchArrangements/${date}`).set(fullArrangement);
    matchArrangement.value = fullArrangement;

    // Calculate stats for activity log
    const matchCount = Object.keys(arrangement.matches).length;
    const playerCount =
      Object.values(arrangement.matches).reduce((sum, m) => sum + (m.players?.length || 0), 0) +
      (arrangement.unassigned?.length || 0);

    // Build human-readable arrangement details
    const matchDescriptions: string[] = [];
    const sortedKeys = Object.keys(arrangement.matches).sort();
    for (const matchKey of sortedKeys) {
      const matchData = arrangement.matches[matchKey];
      const players = matchData?.players || [];
      if (players.length > 0) {
        // Format: "Doubles 1: Alex, Bob, Carol, Dan" or "Singles 1: Alex vs Bob"
        const matchLabel = matchKey.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase());
        const playerList =
          matchKey.startsWith('singles') && players.length === 2
            ? `${players[0]} vs ${players[1]}`
            : players.join(', ');
        matchDescriptions.push(`${matchLabel}: ${playerList}`);
      }
    }
    if (arrangement.unassigned?.length > 0) {
      matchDescriptions.push(`Unassigned: ${arrangement.unassigned.join(', ')}`);
    }
    const arrangementDetails = matchDescriptions.join(' | ');

    // Log activity
    await logActivity(groupId, date, 'arrangement_saved', arrangedBy, arrangedBy, {
      matchCount,
      playerCount,
      arrangementDetails,
    });

    showToast('Match arrangement saved', 'success');
  } catch (error) {
    arrangementLogger.error('Error saving match arrangement:', error);
    showToast('Failed to save arrangement', 'error');
  }
}

// Clear match arrangement (revert to auto-organized)
export async function clearMatchArrangement() {
  const groupId = currentGroupId.value;
  const date = selectedDate.value;
  if (!groupId || !date) {
    return;
  }

  const clearedBy = sessionUser.value || 'Admin';

  try {
    await getRef(`groups/${groupId}/matchArrangements/${date}`).remove();
    matchArrangement.value = null;

    // Log activity
    await logActivity(groupId, date, 'arrangement_cleared', clearedBy, clearedBy);

    showToast('Arrangement cleared - using auto-organization', 'info');
  } catch (error) {
    arrangementLogger.error('Error clearing match arrangement:', error);
    showToast('Failed to clear arrangement', 'error');
  }
}

// Hook to load match arrangement when date changes
export function useMatchArrangement() {
  useEffect(() => {
    let currentRef: ReturnType<typeof getRef> | null = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let currentUnsubscribe: any = null;

    const dispose = effect(() => {
      const groupId = currentGroupId.value;
      const date = selectedDate.value;

      // Cleanup previous listener
      if (currentRef && currentUnsubscribe) {
        currentRef.off('value', currentUnsubscribe);
      }

      if (!groupId || groupId === 'admin' || !date) {
        matchArrangement.value = null;
        return;
      }

      currentRef = getRef(`groups/${groupId}/matchArrangements/${date}`);

      // Set up real-time listener for match arrangements
      currentUnsubscribe = currentRef.on('value', (snapshot) => {
        const data = snapshot.val();
        matchArrangement.value = isValidMatchArrangement(data) ? data : null;
      });
    });

    return () => {
      dispose();
      if (currentRef && currentUnsubscribe) {
        currentRef.off('value', currentUnsubscribe);
      }
    };
  }, []);
}
