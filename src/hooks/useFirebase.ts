import { useEffect } from 'preact/hooks';
import { signal, effect } from '@preact/signals';
import { getDatabase } from '../config/firebase';
import {
  currentGroupId,
  currentGroupName,
  selectedDate,
  allCheckins,
  coreMembers,
  memberDetails,
  sessionUser,
  showToast
} from '../components/App';
import { selectedName, isFormExpanded } from '../components/pages/MainApp';
import { formatTimeRange } from '../utils/helpers';

// Group settings
export const groupSettings = signal<{
  groupPin: string;
  adminPin: string;
  shortCode?: string;
  location?: { lat: number; lon: number; name: string };
  groupDescription?: string;
  groupRules?: string;
}>({
  groupPin: '',
  adminPin: '',
});

// Match notes
export const matchNotes = signal<Record<string, string>>({});

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
      if (!groupId || groupId === 'admin') return;

      // Load group settings
      const settingsRef = getRef(`groups/${groupId}/settings`);

      settingsRef.once('value').then((snapshot) => {
        const settings = (snapshot.val() || {}) as Record<string, unknown>;

        currentGroupName.value = (settings.groupName as string) || 'Unknown Group';
        coreMembers.value = (settings.members as string[]) || [];
        memberDetails.value = (settings.memberDetails as Record<string, unknown>) || {};
        groupSettings.value = {
          groupPin: (settings.groupPin as string) || '',
          adminPin: (settings.adminPin as string) || '',
          shortCode: settings.shortCode as string | undefined,
          location: settings.location as { lat: number; lon: number; name: string } | undefined,
          groupDescription: settings.groupDescription as string | undefined,
          groupRules: settings.groupRules as string | undefined,
        };

        // Update document title
        document.title = `${settings.groupName || 'Tennis'} - Tennis Coordinator`;
      }).catch((error: unknown) => {
        console.error('Error loading group settings:', error);
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

      if (!groupId || groupId === 'admin') return;

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

// Helper function to normalize names for comparison
function normalizeName(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '');
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
  if (!groupId || !date) return;

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
    showToast(`${checkin.name} checked in!`, 'success');

    // Log activity
    await logActivity(groupId, date, 'checkin', checkin.name, checkin.addedBy);

    // Notify users with activity alerts
    await notifyCheckinAlert(groupId, checkin.name, date, checkin.addedBy, {
      playStyle: checkin.playStyle,
      timeRange: checkin.timeRange,
      allowRotation: checkin.allowRotation,
    });
  } catch (error) {
    console.error('Error adding check-in:', error);
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
  if (!groupId || !date) return;

  const currentCheckins = allCheckins.value[date] || [];
  const person = currentCheckins[index] as { name?: string; addedBy?: string } | undefined;
  if (!person) return;

  const personName = person.name || 'this person';

  // Permission check: Can edit if you're the owner, the adder, or admin
  const isOwner = sessionUserName && normalizeName(sessionUserName) === normalizeName(personName);
  const isAdder = person.addedBy && sessionUserName && normalizeName(sessionUserName) === normalizeName(person.addedBy);
  const isAdmin = sessionStorage.getItem(`adminAuth_${groupId}`) === 'true';

  if (!isOwner && !isAdder && !isAdmin) {
    showToast('You can only edit check-ins you added', 'error');
    return;
  }

  const checkinsRef = getRef(`groups/${groupId}/checkins/${date}`);
  const updatedCheckins = [...currentCheckins];
  updatedCheckins[index] = { ...updatedCheckins[index], ...updates };

  try {
    await checkinsRef.set(updatedCheckins);
    showToast(`${personName}'s preferences updated`, 'success');
  } catch (error) {
    console.error('Error updating check-in:', error);
    showToast('Failed to update check-in', 'error');
  }
}

// Check if user can remove a check-in (returns info or null if not allowed)
export function canRemoveCheckin(index: number, sessionUserName: string): {
  personName: string;
  isOwner: boolean;
} | null {
  const groupId = currentGroupId.value;
  const date = selectedDate.value;
  if (!groupId || !date) return null;

  const currentCheckins = allCheckins.value[date] || [];
  const person = currentCheckins[index] as { name?: string; addedBy?: string } | undefined;
  const personName = person?.name || 'this person';

  // Permission check: Can remove if you're the owner, the adder, or admin
  const isOwner = sessionUserName && normalizeName(sessionUserName) === normalizeName(personName);
  const isAdder = person?.addedBy && sessionUserName && normalizeName(sessionUserName) === normalizeName(person.addedBy);
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
  if (!groupId || !date) return;

  const currentCheckins = allCheckins.value[date] || [];
  const person = currentCheckins[index] as { name?: string; addedBy?: string } | undefined;
  const personName = person?.name || 'this person';
  const isOwner = sessionUserName && normalizeName(sessionUserName) === normalizeName(personName);

  const checkinsRef = getRef(`groups/${groupId}/checkins/${date}`);
  const updatedCheckins = currentCheckins.filter((_: unknown, i: number) => i !== index);

  try {
    await checkinsRef.set(updatedCheckins.length > 0 ? updatedCheckins : null);
    showToast(`${personName} removed`, 'info');

    // If user removed their own check-in, pre-select their name for easy re-check-in
    if (isOwner && sessionUserName) {
      selectedName.value = sessionUserName;
      isFormExpanded.value = true;
    }

    // Log activity
    await logActivity(groupId, date, 'removal', personName, sessionUserName);

    // Notify users with activity alerts
    await notifyRemovalAlert(groupId, personName, date, sessionUserName);
  } catch (error) {
    console.error('Error removing check-in:', error);
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
    console.error('Error logging activity:', error);
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
    ? `🎾 ${playerName} removed themselves from ${date}`
    : `🎾 ${playerName} was removed from ${date} by ${removedBy}`;

  try {
    const db = getDatabase();
    const snapshot = await db.ref(`groups/${groupId}/userNotifications`).once('value');
    const allUserNotifications = (snapshot.val() || {}) as Record<string, { preferences?: { activityAlerts?: boolean; mutedMembers?: string[]; unwatchedMembers?: string[] } }>;

    for (const [normalizedName, userData] of Object.entries(allUserNotifications)) {
      const prefs = userData.preferences || {};
      if (prefs.activityAlerts) {
        // Don't notify the person who removed
        if (normalizedName === normalizeName(removedBy)) continue;

        // Check if either the removed player or remover is unwatched (support both old mutedMembers and new unwatchedMembers)
        const unwatchedMembers = prefs.unwatchedMembers || prefs.mutedMembers || [];
        if (unwatchedMembers.includes(playerName) || unwatchedMembers.includes(removedBy)) continue;

        // Add notification
        const notifRef = db.ref(`groups/${groupId}/userNotifications/${normalizedName}/notifications`).push();
        await notifRef.set({
          message,
          timestamp: Date.now(),
          read: false,
          date,
        });
      }
    }
  } catch (error) {
    console.error('Error sending removal notifications:', error);
  }
}

// Helper to format play style for display
function formatPlayStyle(playStyle: string): string {
  switch (playStyle) {
    case 'singles': return 'Singles';
    case 'doubles': return 'Doubles';
    default: return 'Either';
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
    ? `🎾 ${playerName} checked in for ${date}${detailsStr}`
    : `🎾 ${playerName} was added for ${date} by ${addedBy}${detailsStr}`;

  console.log('[notifyCheckinAlert] Starting notification for:', { playerName, date, addedBy });

  try {
    const db = getDatabase();
    const snapshot = await db.ref(`groups/${groupId}/userNotifications`).once('value');
    const allUserNotifications = (snapshot.val() || {}) as Record<string, { preferences?: { activityAlerts?: boolean; mutedMembers?: string[]; unwatchedMembers?: string[] } }>;

    console.log('[notifyCheckinAlert] Found userNotifications entries:', Object.keys(allUserNotifications));

    for (const [normalizedName, userData] of Object.entries(allUserNotifications)) {
      const prefs = userData.preferences || {};
      console.log(`[notifyCheckinAlert] User ${normalizedName}:`, { activityAlerts: prefs.activityAlerts, unwatchedMembers: prefs.unwatchedMembers || prefs.mutedMembers });

      if (prefs.activityAlerts) {
        // Don't notify the person who checked in or added
        if (normalizedName === normalizeName(addedBy)) {
          console.log(`[notifyCheckinAlert] Skipping ${normalizedName} - is addedBy`);
          continue;
        }
        if (normalizedName === normalizeName(playerName)) {
          console.log(`[notifyCheckinAlert] Skipping ${normalizedName} - is player`);
          continue;
        }

        // Check if either the player or adder is unwatched (support both old mutedMembers and new unwatchedMembers)
        const unwatchedMembers = prefs.unwatchedMembers || prefs.mutedMembers || [];
        if (unwatchedMembers.includes(playerName) || unwatchedMembers.includes(addedBy)) {
          console.log(`[notifyCheckinAlert] Skipping ${normalizedName} - player/adder is unwatched`);
          continue;
        }

        // Add notification
        console.log(`[notifyCheckinAlert] Sending notification to ${normalizedName}`);
        const notifRef = db.ref(`groups/${groupId}/userNotifications/${normalizedName}/notifications`).push();
        await notifRef.set({
          message,
          timestamp: Date.now(),
          read: false,
          date,
        });
        console.log(`[notifyCheckinAlert] Notification sent to ${normalizedName}`);
      }
    }
  } catch (error) {
    console.error('Error sending check-in notifications:', error);
  }
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
    .replace(/\b\w/g, c => c.toUpperCase())
    .replace('Forming 1', '(forming)');

  let message: string;
  if (action === 'added') {
    const preview = noteContent && noteContent.length > 30 ? noteContent.substring(0, 30) + '...' : noteContent;
    message = `📝 ${by} added note to ${matchLabel}: "${preview}"`;
  } else if (action === 'updated') {
    const preview = noteContent && noteContent.length > 30 ? noteContent.substring(0, 30) + '...' : noteContent;
    message = `📝 ${by} updated note on ${matchLabel}: "${preview}"`;
  } else {
    message = `📝 ${by} removed note from ${matchLabel}`;
  }

  try {
    const db = getDatabase();
    const snapshot = await db.ref(`groups/${groupId}/userNotifications`).once('value');
    const allUserNotifications = (snapshot.val() || {}) as Record<string, { preferences?: { activityAlerts?: boolean; mutedMembers?: string[]; unwatchedMembers?: string[] } }>;

    for (const [normalizedName, userData] of Object.entries(allUserNotifications)) {
      const prefs = userData.preferences || {};
      if (prefs.activityAlerts) {
        // Don't notify the person who made the change
        if (normalizedName === normalizeName(by)) continue;

        // Check if the person who made the change is unwatched (support both old mutedMembers and new unwatchedMembers)
        const unwatchedMembers = prefs.unwatchedMembers || prefs.mutedMembers || [];
        if (unwatchedMembers.includes(by)) continue;

        // Add notification
        const notifRef = db.ref(`groups/${groupId}/userNotifications/${normalizedName}/notifications`).push();
        await notifRef.set({
          message,
          timestamp: Date.now(),
          read: false,
          date,
        });
      }
    }
  } catch (error) {
    console.error('Error sending note notifications:', error);
  }
}

export async function resetDay() {
  const groupId = currentGroupId.value;
  const date = selectedDate.value;
  if (!groupId || !date) return;

  try {
    await getRef(`groups/${groupId}/checkins/${date}`).remove();
    await getRef(`groups/${groupId}/matchNotes/${date}`).remove();
    showToast('Day reset', 'success');
  } catch (error) {
    console.error('Error resetting day:', error);
    showToast('Failed to reset day', 'error');
  }
}

// Track last saved note to detect changes (populated from matchNotes signal)
const lastSavedNotes: Record<string, string> = {};

export async function saveMatchNote(matchKey: string, note: string) {
  const groupId = currentGroupId.value;
  const date = selectedDate.value;
  if (!groupId || !date) return;

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
      await logActivity(groupId, date, 'note_updated', by, by, { matchKey, noteContent: note, previousNote });
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
    console.error('Error saving match note:', error);
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
  if (!groupId) return;

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

    // Log activity
    const date = selectedDate.value || new Date().toISOString().split('T')[0];
    await logActivity(groupId, date, 'member_added', member.name, member.addedBy, {
      contact: member.phone || member.email || undefined,
      notes: member.notes || undefined,
    });

    showToast(`${member.name} added to members`, 'success');
  } catch (error) {
    console.error('Error adding member:', error);
    showToast('Failed to add member', 'error');
  }
}

// Remove member
export async function removeMember(name: string) {
  const groupId = currentGroupId.value;
  if (!groupId) return;

  const settingsRef = getRef(`groups/${groupId}/settings`);

  try {
    const snapshot = await settingsRef.once('value');
    const settings = (snapshot.val() || {}) as Record<string, unknown>;
    const currentMembersList = (settings.members as string[]) || [];
    const currentDetailsList = (settings.memberDetails as Record<string, unknown>) || {};

    const newMembers = currentMembersList.filter(m => m !== name);
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
    console.error('Error removing member:', error);
    showToast('Failed to remove member', 'error');
  }
}

// Update member details (for users to update their own info)
export async function updateMemberDetails(
  name: string,
  updates: { phone?: string; email?: string; notes?: string }
) {
  const groupId = currentGroupId.value;
  if (!groupId) return false;

  const settingsRef = getRef(`groups/${groupId}/settings`);

  try {
    const snapshot = await settingsRef.once('value');
    const settings = (snapshot.val() || {}) as Record<string, unknown>;
    const currentDetailsList = (settings.memberDetails as Record<string, { phone?: string; email?: string; notes?: string; addedBy?: string; addedDate?: string }>) || {};

    // Get or create member details
    const existingDetails = currentDetailsList[name] || {};
    const newDetails = {
      ...currentDetailsList,
      [name]: {
        ...existingDetails,
        phone: updates.phone ?? existingDetails.phone ?? '',
        email: updates.email ?? existingDetails.email ?? '',
        notes: updates.notes ?? existingDetails.notes ?? '',
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
    console.error('Error updating member details:', error);
    showToast('Failed to update profile', 'error');
    return false;
  }
}

// Rename member
export async function renameMember(oldName: string, newName: string) {
  const groupId = currentGroupId.value;
  if (!groupId) return false;

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
    if (currentMembersList.some(m => m.toLowerCase() === trimmedNewName.toLowerCase() && m !== oldName)) {
      showToast('A member with this name already exists', 'error');
      return false;
    }

    // Update members array
    const newMembers = currentMembersList.map(m => m === oldName ? trimmedNewName : m).sort();

    // Move member details to new name key
    const newDetails = { ...currentDetailsList };
    if (newDetails[oldName]) {
      newDetails[trimmedNewName] = newDetails[oldName];
      delete newDetails[oldName];
    }

    await settingsRef.update({
      members: newMembers,
      memberDetails: newDetails,
    });

    // Update local signals
    coreMembers.value = newMembers;
    memberDetails.value = newDetails;

    // Update all check-ins with the old name to the new name
    const db = getDatabase();
    const checkinsSnapshot = await db.ref(`groups/${groupId}/checkins`).once('value');
    const allCheckinsData = checkinsSnapshot.val() || {};

    // Process each date's check-ins (Firebase stores arrays as objects with numeric string keys)
    for (const [dateKey, dateCheckins] of Object.entries(allCheckinsData)) {
      if (dateCheckins && typeof dateCheckins === 'object') {
        // Convert to array, update names, then save back
        const checkinsArray = Object.values(dateCheckins) as Array<{ name?: string; [key: string]: unknown }>;
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
    console.error('Error renaming member:', error);
    showToast('Failed to rename member', 'error');
    return false;
  }
}
