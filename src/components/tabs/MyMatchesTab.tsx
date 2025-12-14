import { signal, computed } from '@preact/signals';
import { allCheckins, sessionUser, selectedDate, memberDetails, currentGroupId, currentGroupName, showToast, coreMembers } from '../App';
import { organizeMatches } from '../../utils/matching';
import { formatDate, formatTimeRange, normalizeName } from '../../utils/helpers';
import { activeTab } from '../navigation/BottomTabBar';
import { groupSettings, matchNotes, allMatchNotes, useAllMatchNotes } from '../../hooks/useFirebase';
import { createCalendarEventFromMatch, downloadICSFile } from '../../utils/calendar';

// State for inline share dropdown
const activeShareDropdown = signal<string | null>(null);

// State for admin viewing another user's games
const viewingUser = signal<string | null>(null);
const showMemberPicker = signal(false);

// State for multi-select sharing
const isSelectionMode = signal(false);
const selectedGames = signal<Set<string>>(new Set());
const showShareOptions = signal(false);

// State for Upcoming/Past toggle
const gamesView = signal<'upcoming' | 'past'>('upcoming');

// Check if current user is admin
function isGroupAdmin(): boolean {
  const groupId = currentGroupId.value;
  if (!groupId) return false;
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
      if (!target.closest('.member-picker-dropdown') && !target.closest('[data-member-picker-button]')) {
        showMemberPicker.value = false;
      }
    }
  });
}


interface ScheduledMatch {
  date: string;
  type: string;
  matchNumber: number;
  players: { name: string; timeRange?: { start: string; end: string } }[];
  isForming: boolean;
  needed?: number;
}

// Compute user's matches across all dates (both upcoming and past)
const allUserMatches = computed(() => {
  // Use viewingUser if admin is viewing another user, otherwise use sessionUser
  const user = viewingUser.value || sessionUser.value;
  if (!user) return { upcoming: [], past: [] };

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
    if (checkins.length === 0) continue;

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

function getMatchTypeLabel(type: string): string {
  switch (type) {
    case 'doubles':
    case 'doubles-forming':
      return 'Doubles';
    case 'singles':
    case 'singles-forming':
      return 'Singles';
    case 'rotation':
    case 'singles-or-practice':
      return 'Rotation';
    default: return type;
  }
}

function generateNeedPlayersMessage(match: ScheduledMatch): string {
  const dateObj = new Date(match.date + 'T00:00:00');
  const dateStr = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  const playerNames = match.players.map(p => p.name).join(' & ');
  const groupId = currentGroupId.value;
  const appUrl = `${window.location.origin}${window.location.pathname}#${groupId}`;

  if (match.type === 'doubles-forming') {
    const needed = match.needed || (4 - match.players.length);
    const neededText = needed === 1 ? '1 more player needed' : `${needed} more players needed`;

    let message = `🎾 ${neededText} for doubles!\n`;
    message += `📅 ${dateStr}\n`;
    message += `👥 ${playerNames} ${match.players.length === 1 ? 'is' : 'are'} in\n\n`;
    message += `Can you make it? ${appUrl}`;

    return message;
  } else if (match.type === 'singles-forming') {
    const player = match.players[0];

    let message = `🎾 1 more player needed for singles!\n`;
    message += `📅 ${dateStr}\n`;
    message += `👤 ${player.name} is in`;
    if (player.timeRange) {
      message += ` (${formatTimeRange(player.timeRange.start, player.timeRange.end)})`;
    }
    message += `\n\nCan you make it? ${appUrl}`;

    return message;
  }

  return '';
}

function shareNeedPlayers(match: ScheduledMatch, method: 'whatsapp' | 'sms' | 'copy') {
  const message = generateNeedPlayersMessage(match);

  if (method === 'whatsapp') {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  } else if (method === 'sms') {
    const encoded = encodeURIComponent(message);
    window.open(`sms:?body=${encoded}`, '_blank');
  } else if (method === 'copy') {
    navigator.clipboard.writeText(message).then(() => {
      showToast('Message copied!', 'success');
    }).catch(() => {
      showToast('Failed to copy', 'error');
    });
  }

  activeShareDropdown.value = null;
}

function handleDateClick(date: string) {
  // Don't navigate when in selection mode
  if (isSelectionMode.value) return;
  selectedDate.value = date;
  activeTab.value = 'checkin';
}

function handleAddToCalendar(match: ScheduledMatch) {
  // Get match key for notes lookup (e.g., "doubles-1", "singles-1")
  const matchKey = `${match.type.replace('-forming', '')}-${match.matchNumber}`;
  const notes = matchNotes.value[matchKey] || '';

  const eventData = createCalendarEventFromMatch({
    date: match.date,
    matchType: match.type,
    players: match.players,
    groupName: currentGroupName.value || 'Tennis',
    location: groupSettings.value.location?.name,
    notes: notes,
  });

  downloadICSFile(eventData);
  showToast('Calendar event downloaded', 'success');
}

function toggleGameSelection(matchKey: string) {
  const newSet = new Set(selectedGames.value);
  if (newSet.has(matchKey)) {
    newSet.delete(matchKey);
  } else {
    newSet.add(matchKey);
  }
  selectedGames.value = newSet;
}

function exitSelectionMode() {
  isSelectionMode.value = false;
  selectedGames.value = new Set();
  showShareOptions.value = false;
}

function generateMultiGameShareText(schedule: ScheduledMatch[], selectedKeys: Set<string>): string {
  const groupId = currentGroupId.value;
  const appUrl = `${window.location.origin}${window.location.pathname}#${groupId}`;

  // Get selected matches
  const selectedMatches = schedule.filter((match, idx) => {
    const matchKey = `mygames-${match.date}-${match.type}-${idx}`;
    return selectedKeys.has(matchKey);
  });

  if (selectedMatches.length === 0) return '';

  // Separate by status
  const ready = selectedMatches.filter(m => !m.isForming);
  const forming = selectedMatches.filter(m => m.isForming);

  let message = '🎾 Tennis Update\n\n';

  if (ready.length > 0) {
    message += '✅ Ready to Play:\n';
    for (const match of ready) {
      const dateObj = new Date(match.date + 'T00:00:00');
      const dateStr = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      const typeLabel = getMatchTypeLabel(match.type);
      const playerNames = match.players.map(p => p.name).join(', ');
      message += `• ${dateStr} - ${typeLabel}\n  ${playerNames}\n`;
    }
    message += '\n';
  }

  if (forming.length > 0) {
    message += '🟡 Need Players:\n';
    for (const match of forming) {
      const dateObj = new Date(match.date + 'T00:00:00');
      const dateStr = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      const typeLabel = getMatchTypeLabel(match.type);
      const needed = match.needed || 1;
      const playerNames = match.players.map(p => p.name).join(', ');
      message += `• ${dateStr} - ${typeLabel} needs ${needed}\n  ${playerNames}\n`;
    }
    message += '\n';
  }

  message += `Check in: ${appUrl}`;

  return message;
}

function shareSelectedGames(method: 'whatsapp' | 'sms' | 'copy' | 'native', schedule: ScheduledMatch[]) {
  const message = generateMultiGameShareText(schedule, selectedGames.value);

  if (!message) {
    showToast('No games selected', 'error');
    return;
  }

  if (method === 'native' && navigator.share) {
    navigator.share({
      title: 'Tennis Update',
      text: message,
    }).catch(() => {
      // User cancelled or share failed - fallback to copy
      navigator.clipboard.writeText(message).then(() => {
        showToast('Copied to clipboard', 'success');
      });
    });
  } else if (method === 'whatsapp') {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  } else if (method === 'sms') {
    const encoded = encodeURIComponent(message);
    window.open(`sms:?body=${encoded}`, '_blank');
  } else {
    navigator.clipboard.writeText(message).then(() => {
      showToast('Copied to clipboard', 'success');
    }).catch(() => {
      showToast('Failed to copy', 'error');
    });
  }

  // Exit selection mode after sharing
  showShareOptions.value = false;
  isSelectionMode.value = false;
  selectedGames.value = new Set();
}

export function MyMatchesTab() {
  // Load all match notes for upcoming games
  useAllMatchNotes();

  // Get schedule based on current view (upcoming or past)
  const allMatches = allUserMatches.value;
  const schedule = gamesView.value === 'upcoming' ? allMatches.upcoming : allMatches.past;
  const isAdmin = isGroupAdmin();
  const currentViewUser = viewingUser.value || sessionUser.value;
  const isViewingOther = viewingUser.value && viewingUser.value !== sessionUser.value;

  const selectionCount = selectedGames.value.size;
  const inSelectionMode = isSelectionMode.value;
  const isPastView = gamesView.value === 'past';

  return (
    <div style="padding: 16px 0;">
      {/* Selection mode bottom bar */}
      {inSelectionMode && (
        <div style={{
          position: 'fixed',
          bottom: '70px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 32px)',
          maxWidth: '400px',
          background: 'white',
          borderRadius: '16px',
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          zIndex: 100,
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        }}>
          <button
            onClick={exitSelectionMode}
            style={{
              background: 'var(--color-gray-lightest, #f5f5f5)',
              border: '1px solid var(--color-gray-light, #ddd)',
              borderRadius: '20px',
              padding: '8px 16px',
              fontSize: '14px',
              cursor: 'pointer',
              color: 'var(--color-gray-base, #666)',
            }}
          >
            Cancel
          </button>
          <span style={{ fontSize: '14px', color: 'var(--color-gray-base, #666)' }}>
            {selectionCount} selected
          </span>
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => { showShareOptions.value = !showShareOptions.value; }}
              disabled={selectionCount === 0}
              style={{
                background: selectionCount > 0 ? 'var(--color-primary, #2C6E49)' : 'var(--color-gray-disabled, #ccc)',
                border: 'none',
                borderRadius: '20px',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: selectionCount > 0 ? 'pointer' : 'default',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              Share
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
              </svg>
            </button>
            {showShareOptions.value && selectionCount > 0 && (
              <div style={{
                position: 'absolute',
                bottom: '100%',
                right: '0',
                marginBottom: '8px',
                background: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                overflow: 'hidden',
                minWidth: '160px',
              }}>
                {typeof navigator.share === 'function' && (
                  <button
                    onClick={() => shareSelectedGames('native', schedule)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px 16px',
                      width: '100%',
                      border: 'none',
                      background: 'white',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: '#333',
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="var(--color-primary, #2C6E49)">
                      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
                    </svg>
                    Share...
                  </button>
                )}
                <button
                  onClick={() => shareSelectedGames('whatsapp', schedule)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 16px',
                    width: '100%',
                    border: 'none',
                    background: 'white',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: 'var(--color-whatsapp, #25D366)',
                    borderTop: typeof navigator.share === 'function' ? '1px solid #f0f0f0' : 'none',
                  }}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </button>
                <button
                  onClick={() => shareSelectedGames('sms', schedule)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 16px',
                    width: '100%',
                    border: 'none',
                    background: 'white',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: 'var(--color-sms, #2196F3)',
                    borderTop: '1px solid #f0f0f0',
                  }}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                  </svg>
                  SMS
                </button>
                <button
                  onClick={() => shareSelectedGames('copy', schedule)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 16px',
                    width: '100%',
                    border: 'none',
                    background: 'white',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: 'var(--color-gray-base, #666)',
                    borderTop: '1px solid #f0f0f0',
                  }}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                  </svg>
                  Copy text
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Segmented control for Upcoming/Past */}
      <div style={{
        display: 'flex',
        background: 'var(--color-gray-lightest, #f0f0f0)',
        borderRadius: '10px',
        padding: '4px',
        marginBottom: '16px',
      }}>
        <button
          onClick={() => { gamesView.value = 'upcoming'; exitSelectionMode(); }}
          style={{
            flex: 1,
            padding: '10px 16px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
            background: gamesView.value === 'upcoming' ? 'white' : 'transparent',
            color: gamesView.value === 'upcoming' ? 'var(--color-primary, #2C6E49)' : 'var(--color-gray-base, #666)',
            boxShadow: gamesView.value === 'upcoming' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
          }}
        >
          Upcoming ({allMatches.upcoming.length})
        </button>
        <button
          onClick={() => { gamesView.value = 'past'; exitSelectionMode(); }}
          style={{
            flex: 1,
            padding: '10px 16px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
            background: gamesView.value === 'past' ? 'white' : 'transparent',
            color: gamesView.value === 'past' ? 'var(--color-primary, #2C6E49)' : 'var(--color-gray-base, #666)',
            boxShadow: gamesView.value === 'past' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
          }}
        >
          Past ({allMatches.past.length})
        </button>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h2 style="margin: 0; font-size: 20px;">
          {isViewingOther
            ? `${viewingUser.value}'s ${isPastView ? 'Past' : 'Upcoming'} Games`
            : `My ${isPastView ? 'Past' : 'Upcoming'} Games`}
        </h2>
        <div style="display: flex; gap: 8px; align-items: center;">
          {isViewingOther && (
            <button
              onClick={() => { viewingUser.value = null; }}
              style={{
                background: 'var(--color-gray-lightest, #f5f5f5)',
                border: '1px solid var(--color-gray-light, #ddd)',
                borderRadius: '16px',
                padding: '4px 12px',
                fontSize: '12px',
                cursor: 'pointer',
                color: 'var(--color-gray-base, #666)',
              }}
            >
              Back to mine
            </button>
          )}
          {!isViewingOther && schedule.length > 0 && !inSelectionMode && (
            <button
              onClick={() => { isSelectionMode.value = true; }}
              style={{
                background: 'var(--color-gray-lightest, #f5f5f5)',
                border: '1px solid var(--color-gray-light, #ddd)',
                borderRadius: '16px',
                padding: '6px 12px',
                fontSize: '13px',
                cursor: 'pointer',
                color: 'var(--color-gray-base, #666)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
              </svg>
              Share
            </button>
          )}
        </div>
      </div>

      {/* Admin user selector */}
      {isAdmin && !isViewingOther && (
        <div style={{
          background: 'var(--color-gray-lightest, #f5f5f5)',
          borderRadius: 'var(--radius-lg, 8px)',
          padding: 'var(--spacing-xl, 12px)',
          marginBottom: 'var(--spacing-2xl, 16px)',
          position: 'relative',
        }}>
          <label style={{
            display: 'block',
            fontSize: 'var(--font-size-sm, 13px)',
            color: 'var(--color-gray-base, #666)',
            marginBottom: 'var(--spacing-sm, 6px)',
            fontWeight: '500',
          }}>
            View another member's games
          </label>
          <button
            data-member-picker-button
            onClick={(e) => {
              e.stopPropagation();
              showMemberPicker.value = !showMemberPicker.value;
            }}
            style={{
              width: '100%',
              padding: '10px 12px',
              background: 'white',
              border: '1px solid var(--color-border, #e0e0e0)',
              borderRadius: 'var(--radius-md, 6px)',
              fontSize: 'var(--font-size-base, 14px)',
              color: 'var(--color-text-secondary, #666)',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>Select a member...</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ transform: showMemberPicker.value ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </button>

          {showMemberPicker.value && (
            <div
              class="member-picker-dropdown"
              style={{
                position: 'absolute',
                top: '100%',
                left: 'var(--spacing-xl, 12px)',
                right: 'var(--spacing-xl, 12px)',
                marginTop: 'var(--spacing-xs, 4px)',
                background: 'white',
                border: '1px solid var(--color-border, #e0e0e0)',
                borderRadius: 'var(--radius-lg, 8px)',
                boxShadow: 'var(--shadow-xl, 0 4px 12px rgba(0,0,0,0.15))',
                zIndex: 100,
                maxHeight: '300px',
                overflowY: 'auto',
              }}
            >
              {coreMembers.value
                .filter(m => m !== sessionUser.value)
                .sort((a, b) => a.localeCompare(b))
                .map(member => (
                  <button
                    key={member}
                    onClick={() => {
                      viewingUser.value = member;
                      showMemberPicker.value = false;
                    }}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'white',
                      border: 'none',
                      borderBottom: '1px solid var(--color-border, #e0e0e0)',
                      textAlign: 'left',
                      fontSize: 'var(--font-size-base, 14px)',
                      color: 'var(--color-text-primary, #333)',
                      cursor: 'pointer',
                    }}
                    className="hover-bg-subtle"
                  >
                    {member}
                  </button>
                ))
              }
            </div>
          )}
        </div>
      )}

      {schedule.length === 0 ? (
        <div style="text-align: center; padding: 48px 24px; background: #f9f9f9; border-radius: 12px;">
          <div style="font-size: 48px; margin-bottom: 16px;">{isPastView ? '📜' : '📅'}</div>
          <p style="font-size: 18px; margin: 0 0 8px 0; color: var(--color-gray-dark, #333);">
            {isPastView ? 'No past games' : 'No upcoming games'}
          </p>
          <p style="font-size: 14px; color: var(--color-gray-base, #666); margin: 0 0 16px 0;">
            {isPastView
              ? (isViewingOther
                  ? `${viewingUser.value} has no past games on record.`
                  : 'Your game history will appear here.')
              : (isViewingOther
                  ? `${viewingUser.value} has no upcoming games.`
                  : 'Check in for a date to get matched with other players!')
            }
          </p>
          {/* Check In button for upcoming empty state (only for self, not when viewing others) */}
          {!isPastView && !isViewingOther && (
            <button
              onClick={() => { activeTab.value = 'checkin'; }}
              style={{
                background: 'var(--color-primary, #2C6E49)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(var(--color-primary-rgb, 44, 110, 73), 0.25)',
              }}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              Check In
            </button>
          )}
        </div>
      ) : (
        <div style="display: flex; flex-direction: column; gap: 12px;">
          {schedule.map((match, idx) => {
            const otherPlayers = match.players.filter(
              p => normalizeName(p.name) !== normalizeName(currentViewUser)
            );
            const matchKey = `mygames-${match.date}-${match.type}-${idx}`;
            const isDropdownOpen = activeShareDropdown.value === matchKey;
            const needed = match.needed || 1;
            const isSelected = selectedGames.value.has(matchKey);

            return (
              <div
                key={idx}
                onClick={() => {
                  if (inSelectionMode) {
                    toggleGameSelection(matchKey);
                  }
                }}
                style={{
                  padding: '16px',
                  background: match.isForming ? '#FFF8E1' : '#E8F5E9',
                  borderRadius: '12px',
                  border: inSelectionMode && isSelected
                    ? '2px solid var(--color-primary, #2C6E49)'
                    : match.isForming ? '1px solid #FFE082' : '1px solid #A5D6A7',
                  cursor: inSelectionMode ? 'pointer' : 'default',
                  position: 'relative',
                }}
              >
                {/* Selection checkbox in selection mode */}
                {inSelectionMode && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    border: isSelected ? 'none' : '2px solid var(--color-gray-disabled, #ccc)',
                    background: isSelected ? 'var(--color-primary, #2C6E49)' : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: 'bold',
                  }}>
                    {isSelected && '✓'}
                  </div>
                )}

                {/* Header row with date and type */}
                <div
                  onClick={(e) => {
                    if (!inSelectionMode) {
                      e.stopPropagation();
                      handleDateClick(match.date);
                    }
                  }}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px',
                    cursor: inSelectionMode ? 'pointer' : 'pointer',
                    paddingRight: inSelectionMode ? '32px' : '0',
                  }}
                >
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-weight: 600; color: var(--color-gray-dark, #333); font-size: 16px;">
                      {formatDate(match.date)}
                    </span>
                    <span style={{
                      fontSize: '12px',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      background: '#f0f0f0',
                      color: 'var(--color-gray-base, #666)',
                      fontWeight: '500',
                    }}>
                      {getMatchTypeLabel(match.type)}
                    </span>
                  </div>
                  {/* Status badge with invite and calendar icons */}
                  <div style="display: flex; align-items: center; gap: 8px;">
                    {match.isForming ? (
                      <span style="display: flex; align-items: center; gap: 4px; color: #F57C00; font-size: 12px; font-weight: 600;">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                        </svg>
                        Need {needed}
                      </span>
                    ) : (
                      <span style="display: flex; align-items: center; gap: 4px; color: var(--color-primary, #2C6E49); font-size: 12px; font-weight: 600;">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        Ready
                      </span>
                    )}
                    {/* Invite button for forming games */}
                    {!inSelectionMode && match.isForming && (
                      <div style="position: relative;">
                        <button
                          data-share-button
                          onClick={(e) => {
                            e.stopPropagation();
                            activeShareDropdown.value = isDropdownOpen ? null : matchKey;
                          }}
                          title="Invite players"
                          style={{
                            background: isDropdownOpen ? 'var(--color-orange-dark, #e65100)' : 'var(--color-orange-primary, #ff9800)',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '4px 10px',
                            fontSize: '11px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: 'white',
                            transition: 'all 0.2s',
                            boxShadow: '0 1px 4px rgba(255, 152, 0, 0.3)',
                          }}
                        >
                          <span>Invite</span>
                          <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                            <path d="M7 10l5 5 5-5z"/>
                          </svg>
                        </button>

                        {isDropdownOpen && (
                          <div
                            class="share-dropdown"
                            style={{
                              position: 'absolute',
                              top: '100%',
                              right: '0',
                              marginTop: '4px',
                              background: 'white',
                              borderRadius: '8px',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                              zIndex: 100,
                              overflow: 'hidden',
                              minWidth: '140px',
                            }}
                          >
                            <button
                              onClick={(e) => { e.stopPropagation(); shareNeedPlayers(match, 'whatsapp'); }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 14px',
                                width: '100%',
                                border: 'none',
                                background: 'white',
                                cursor: 'pointer',
                                fontSize: '14px',
                                color: 'var(--color-whatsapp, #25D366)',
                              }}
                            >
                              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                              </svg>
                              WhatsApp
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); shareNeedPlayers(match, 'sms'); }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 14px',
                                width: '100%',
                                border: 'none',
                                background: 'white',
                                cursor: 'pointer',
                                fontSize: '14px',
                                color: 'var(--color-sms, #2196F3)',
                                borderTop: '1px solid #f0f0f0',
                              }}
                            >
                              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                              </svg>
                              SMS
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); shareNeedPlayers(match, 'copy'); }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 14px',
                                width: '100%',
                                border: 'none',
                                background: 'white',
                                cursor: 'pointer',
                                fontSize: '14px',
                                color: 'var(--color-gray-base, #666)',
                                borderTop: '1px solid #f0f0f0',
                              }}
                            >
                              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                              </svg>
                              Copy
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                    {/* Small calendar icon */}
                    {!inSelectionMode && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCalendar(match);
                        }}
                        title="Add to Calendar"
                        style={{
                          background: 'transparent',
                          border: 'none',
                          padding: '4px',
                          cursor: 'pointer',
                          color: '#888',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '4px',
                        }}
                        className="hover-color-primary"
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Players info */}
                <div
                  onClick={(e) => {
                    if (!inSelectionMode) {
                      e.stopPropagation();
                      handleDateClick(match.date);
                    }
                  }}
                  style={{
                    fontSize: '15px',
                    color: '#555',
                    cursor: inSelectionMode ? 'pointer' : 'pointer',
                    paddingRight: inSelectionMode ? '32px' : '0',
                  }}
                >
                  {otherPlayers.length > 0 ? (
                    <>
                      <span style="color: #888;">Playing with </span>
                      <span style="font-weight: 500;">{otherPlayers.map(p => p.name).join(', ')}</span>
                    </>
                  ) : (
                    <span style="color: #888; font-style: italic;">
                      Waiting for {needed} more player{needed > 1 ? 's' : ''}
                    </span>
                  )}
                </div>

                {/* Match notes - show if there's a note for this match */}
                {(() => {
                  const noteMatchKey = `${match.type.replace('-forming', '')}-${match.matchNumber}`;
                  const noteForMatch = allMatchNotes.value[match.date]?.[noteMatchKey];
                  if (noteForMatch) {
                    return (
                      <div style={{
                        marginTop: '8px',
                        padding: '8px 10px',
                        background: match.isForming ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.6)',
                        borderRadius: '6px',
                        fontSize: '13px',
                        color: 'var(--color-gray-base, #666)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '6px',
                      }}>
                        <span style={{ color: 'var(--color-gray-muted, #999)', flexShrink: 0 }}>📝</span>
                        <span>{noteForMatch}</span>
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>
            );
          })}
        </div>
      )}

      {schedule.length > 0 && (
        <p style="font-size: 13px; color: var(--color-gray-muted, #999); text-align: center; margin-top: 16px;">
          {isPastView ? 'Tap a game to view that day\'s history' : 'Tap a game to view that day\'s details'}
        </p>
      )}
    </div>
  );
}
