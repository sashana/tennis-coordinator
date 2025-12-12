import { signal } from '@preact/signals';
import { currentCheckins, sessionUser, currentGroupId, selectedDate, currentGroupName, showToast } from '../App';
import { removeCheckin, updateCheckin, canRemoveCheckin, matchNotes, saveMatchNote, resetDay, groupSettings, matchArrangement, saveMatchArrangement, clearMatchArrangement, useMatchArrangement } from '../../hooks/useFirebase';
import { formatTime, formatTimeRange, formatDate, debounce } from '../../utils/helpers';
import { Modal } from '../ui/Modal';
import { showSharePrompt, sharePromptData } from '../pages/MainApp';
import { organizeMatches } from '../../utils/matching';
import { weatherCache, getWeatherDescription } from './WeatherWidget';
import type { CheckinData } from '../../types';

function normalizeName(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '');
}

function getPreferenceLabel(playStyle: string): string {
  switch (playStyle) {
    case 'singles': return 'Singles';
    case 'doubles': return 'Doubles';
    default: return 'Either';
  }
}

// Edit modal state
const editModalOpen = signal(false);
const editingIndex = signal<number | null>(null);
const editPlayStyle = signal('both');
const editTimeStart = signal('');
const editTimeEnd = signal('');
const editAllowRotation = signal(true);

// Remove confirmation modal state
const removeModalOpen = signal(false);
const removeIndex = signal<number | null>(null);
const removeName = signal('');
const removeIsOwner = signal(false);
const removeStep = signal<'confirm' | 'done'>('confirm');
const removeDate = signal('');
const removeGroupName = signal('');

// State for inline share dropdown
const activeShareDropdown = signal<string | null>(null);

// Arrange mode state
const arrangeMode = signal(false);
const selectedPlayer = signal<{ name: string; matchKey: string } | null>(null);
const tempArrangement = signal<{
  matches: Record<string, { players: string[]; note?: string }>;
  unassigned: string[];
} | null>(null);

// Close dropdown when clicking outside
if (typeof document !== 'undefined') {
  document.addEventListener('click', (e) => {
    if (activeShareDropdown.value) {
      const target = e.target as HTMLElement;
      if (!target.closest('.share-dropdown') && !target.closest('[data-share-button]')) {
        activeShareDropdown.value = null;
      }
    }
  });
}

function openRemoveModal(index: number) {
  const result = canRemoveCheckin(index, sessionUser.value);
  if (!result) return;

  removeIndex.value = index;
  removeName.value = result.personName;
  removeIsOwner.value = result.isOwner;
  removeStep.value = 'confirm';
  removeDate.value = selectedDate.value || '';
  removeGroupName.value = currentGroupName.value;
  removeModalOpen.value = true;
}

function closeRemoveModal() {
  removeModalOpen.value = false;
  removeIndex.value = null;
  removeName.value = '';
  removeIsOwner.value = false;
  removeStep.value = 'confirm';
  removeDate.value = '';
  removeGroupName.value = '';
}

async function confirmRemove() {
  const index = removeIndex.value;
  if (index === null) return;

  const personName = removeName.value;
  const isOwner = removeIsOwner.value;
  const date = removeDate.value;

  removeIndex.value = null;

  await removeCheckin(index, sessionUser.value);

  closeRemoveModal();

  sharePromptData.value = {
    action: 'removal',
    name: personName,
    date: date,
    isOwner: isOwner,
  };
  showSharePrompt.value = true;
}

function openEditModal(index: number) {
  const checkin = currentCheckins.value[index];
  if (!checkin) return;

  editingIndex.value = index;
  editPlayStyle.value = checkin.playStyle || 'both';
  editTimeStart.value = checkin.timeRange?.start || '';
  editTimeEnd.value = checkin.timeRange?.end || '';
  editAllowRotation.value = checkin.allowRotation !== false;
  editModalOpen.value = true;
}

function closeEditModal() {
  editModalOpen.value = false;
  editingIndex.value = null;
}

async function saveEdit() {
  if (editingIndex.value === null) return;

  const updates: {
    playStyle: string;
    timeRange?: { start: string; end: string };
    allowRotation: boolean;
  } = {
    playStyle: editPlayStyle.value,
    allowRotation: editAllowRotation.value,
  };

  if (editTimeStart.value || editTimeEnd.value) {
    updates.timeRange = {
      start: editTimeStart.value,
      end: editTimeEnd.value,
    };
  }

  await updateCheckin(editingIndex.value, updates, sessionUser.value);
  closeEditModal();
}

function canEdit(checkin: { name?: string; addedBy?: string }): boolean {
  const groupId = currentGroupId.value;
  const personName = checkin.name || '';
  const isOwner = sessionUser.value && normalizeName(sessionUser.value) === normalizeName(personName);
  const isAdder = checkin.addedBy && sessionUser.value && normalizeName(sessionUser.value) === normalizeName(checkin.addedBy);
  const isAdmin = groupId && sessionStorage.getItem(`adminAuth_${groupId}`) === 'true';
  return !!(isOwner || isAdder || isAdmin);
}

// Debounced save function for match notes
const saveMatchNoteDebounced = debounce((...args: unknown[]) => {
  const [matchKey, note] = args as [string, string];
  saveMatchNote(matchKey, note);
}, 500);

function MatchNoteInput({ matchKey }: { matchKey: string }) {
  const existingNote = matchNotes.value[matchKey] || '';

  return (
    <div style="padding: 8px 12px;">
      <input
        type="text"
        placeholder="Add note (court, time, etc.)"
        value={existingNote}
        onInput={(e) => {
          const value = (e.target as HTMLInputElement).value;
          saveMatchNoteDebounced(matchKey, value);
        }}
        style={{
          width: '100%',
          padding: '8px 12px',
          border: '1px solid #e0e0e0',
          borderRadius: '6px',
          fontSize: '14px',
          background: '#fafafa',
        }}
      />
    </div>
  );
}

// Check-in tile component - reuses exact styling from CheckinList
function CheckinTile({ checkin, globalIndex }: { checkin: any; globalIndex: number }) {
  const isCurrentUser = sessionUser.value &&
    normalizeName(checkin.name) === normalizeName(sessionUser.value);
  const showEditButton = canEdit(checkin);

  let addedByInfo = '';
  if (checkin.isGuest) {
    addedByInfo = `guest of ${checkin.addedBy}`;
  } else if (checkin.addedBy && normalizeName(checkin.addedBy) !== normalizeName(checkin.name)) {
    addedByInfo = `added by ${checkin.addedBy}`;
  }

  const timeInfo = checkin.timeRange
    ? formatTimeRange(checkin.timeRange.start, checkin.timeRange.end)
    : '';

  return (
    <div class={isCurrentUser ? 'checkin-item current-user' : 'checkin-item'}>
      <span>
        <span class="checkin-name">
          {globalIndex + 1}. {checkin.name}
          {isCurrentUser && <span class="current-user-badge">YOU</span>}
          {addedByInfo && <span class="guest-indicator"> {addedByInfo}</span>}
          {timeInfo && <span class="time-badge">{timeInfo}</span>}
          {checkin.allowRotation === false && (
            <span class="time-badge" style="background: #fff3e0; color: #e65100;">No 3s</span>
          )}
        </span>
        <span class={`preference-badge ${checkin.playStyle || 'both'}`}>
          {getPreferenceLabel(checkin.playStyle || 'both')}
        </span>
        <span class="checkin-time">{formatTime(checkin.timestamp)}</span>
      </span>
      {showEditButton && (
        <div style="display: flex; gap: 4px;">
          <button
            class="edit-btn"
            onClick={() => openEditModal(globalIndex)}
            title="Edit preferences"
            style={{
              background: 'rgba(76, 175, 80, 0.1)',
              color: '#4CAF50',
              border: 'none',
              borderRadius: '50%',
              padding: '0',
              width: '28px',
              height: '28px',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            ✏️
          </button>
          <button
            class="remove-btn"
            onClick={() => openRemoveModal(globalIndex)}
            title="Remove check-in"
            style={{
              background: 'rgba(255, 82, 82, 0.1)',
              color: '#e57373',
              border: 'none',
              borderRadius: '50%',
              padding: '0',
              width: '28px',
              height: '28px',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

function generateNeedPlayersMessage(match: any, date: string): string {
  const dateObj = new Date(date + 'T00:00:00');
  const dateStr = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  const playerNames = match.players.map((p: any) => p.name).join(' & ');
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

function shareNeedPlayers(match: any, date: string, method: 'whatsapp' | 'sms' | 'copy') {
  const message = generateNeedPlayersMessage(match, date);

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

function NeedPlayersButton({ match, matchKey }: { match: any; matchKey: string; needed: number }) {
  const date = selectedDate.value || '';
  const isOpen = activeShareDropdown.value === matchKey;

  return (
    <div style="position: relative; display: inline-block;">
      <button
        data-share-button
        onClick={(e) => {
          e.stopPropagation();
          activeShareDropdown.value = isOpen ? null : matchKey;
        }}
        style={{
          background: isOpen ? '#e65100' : '#ff9800',
          border: 'none',
          borderRadius: '16px',
          padding: '6px 14px',
          fontSize: '13px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: 'white',
          transition: 'all 0.2s',
          boxShadow: '0 2px 6px rgba(255, 152, 0, 0.4)',
        }}
      >
        <span>Invite</span>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          <path d="M7 10l5 5 5-5z"/>
        </svg>
      </button>

      {isOpen && (
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
            onClick={() => shareNeedPlayers(match, date, 'whatsapp')}
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
              color: '#25D366',
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </button>
          <button
            onClick={() => shareNeedPlayers(match, date, 'sms')}
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
              color: '#2196F3',
              borderTop: '1px solid #f0f0f0',
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
            </svg>
            SMS
          </button>
          <button
            onClick={() => shareNeedPlayers(match, date, 'copy')}
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
              color: '#666',
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
  );
}

function generateWhatsAppMessage(matches: any[], _checkins: any[], date: string): string {
  const dateObj = new Date(date + 'T00:00:00');
  const dateStr = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  let message = `${dateStr}\n`;

  let singlesCount = 0;
  let rotationCount = 0;

  matches.forEach(match => {
    if (match.type === 'doubles') {
      const players = match.players.map((p: any) => p.name);
      message += `Doubles: ${players.join(', ')}\n`;

      const times = match.players
        .filter((p: any) => p.timeRange)
        .map((p: any) => formatTimeRange(p.timeRange.start, p.timeRange.end));
      if (times.length > 0) {
        message += `${times[0]}\n`;
      }

      const matchKey = `doubles-${match.number}`;
      if (matchNotes.value[matchKey]) {
        message += `📝 ${matchNotes.value[matchKey]}\n`;
      }
      message += '\n';
    } else if (match.type === 'singles') {
      singlesCount++;
      const players = match.players.map((p: any) => p.name);
      message += `Singles: ${players.join(', ')}\n`;

      const bothFlexible = match.players.every((p: any) => (p.playStyle || 'both') === 'both');
      const anyOpenToRotation = match.players.some((p: any) => p.allowRotation === true);
      if (bothFlexible && anyOpenToRotation) {
        message += `Open to more players\n`;
      }

      const times = match.players
        .filter((p: any) => p.timeRange)
        .map((p: any) => formatTimeRange(p.timeRange.start, p.timeRange.end));
      if (times.length > 0) {
        message += `${times[0]}\n`;
      }

      const matchKey = `singles-${singlesCount}`;
      if (matchNotes.value[matchKey]) {
        message += `📝 ${matchNotes.value[matchKey]}\n`;
      }
      message += '\n';
    } else if (match.type === 'singles-or-practice') {
      rotationCount++;
      message += `Rotation: ${match.players.map((p: any) => p.name).join(', ')}\n`;

      const times = match.players
        .filter((p: any) => p.timeRange)
        .map((p: any) => formatTimeRange(p.timeRange.start, p.timeRange.end));
      if (times.length > 0) {
        message += `${times[0]}\n`;
      }

      const matchKey = `rotation-${rotationCount}`;
      if (matchNotes.value[matchKey]) {
        message += `📝 ${matchNotes.value[matchKey]}\n`;
      }
      message += '\n';
    } else if (match.type === 'doubles-forming') {
      const players = match.players.map((p: any) => p.name);
      const neededText = match.needed === 1 ? 'need 1 more' : `need ${match.needed} more`;
      message += `Doubles (forming): ${players.join(', ')}\n`;
      message += `${neededText}\n`;

      if (match.canRotate) {
        message += `Can rotate if no 4th\n`;
      } else if (match.canPlaySingles && (match.eitherCount || 0) >= 2) {
        message += `Will play singles if no more join\n`;
      } else if ((match.eitherCount || 0) === 1 && match.players.length === 1) {
        message += `Can play singles if 1 more joins\n`;
      }

      const times = match.players
        .filter((p: any) => p.timeRange)
        .map((p: any) => formatTimeRange(p.timeRange.start, p.timeRange.end));
      if (times.length > 0) {
        message += `${times[0]}\n`;
      }

      const matchKey = 'doubles-forming-1';
      if (matchNotes.value[matchKey]) {
        message += `📝 ${matchNotes.value[matchKey]}\n`;
      }
      message += '\n';
    } else if (match.type === 'singles-forming') {
      const player = match.players[0];
      message += `Singles (forming): ${player.name}\n`;
      message += `need 1 more\n`;

      if (player.timeRange) {
        message += `${formatTimeRange(player.timeRange.start, player.timeRange.end)}\n`;
      }
      message += '\n';
    }
  });

  const standbyMatches = matches.filter((m: any) => m.type === 'waiting');
  if (standbyMatches.length > 0) {
    const standbyPlayers = standbyMatches.flatMap((m: any) => m.players.map((p: any) => p.name));
    if (standbyPlayers.length > 0) {
      message += `Standby: ${standbyPlayers.join(', ')}\n`;
    }
  }

  const location = groupSettings.value.location;
  const lat = location?.lat ?? 37.2358;
  const lon = location?.lon ?? -121.9623;
  const cacheKey = `${lat},${lon},${date}`;
  const weatherData = weatherCache.value[cacheKey];
  if (weatherData) {
    const weatherDesc = getWeatherDescription(weatherData.weatherCode);
    message += `${weatherDesc}, ${weatherData.tempMax}°F`;
  }

  return message.trim();
}

function shareToWhatsApp(matches: any[], checkins: any[], date: string) {
  const message = generateWhatsAppMessage(matches, checkins, date);
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/?text=${encoded}`, '_blank');
}

function handleResetDay() {
  const date = selectedDate.value;
  if (!date) return;

  if (confirm(`Are you sure you want to reset all check-ins for ${formatDate(date)}?\n\nThis cannot be undone.`)) {
    resetDay();
  }
}

// Helper to find the global index of a player in the original checkins array
function findGlobalIndex(checkins: any[], player: any): number {
  return checkins.findIndex(c =>
    normalizeName(c.name) === normalizeName(player.name) &&
    c.timestamp === player.timestamp
  );
}

// Initialize temp arrangement from current matches
function initializeTempArrangement(matches: any[], _checkins: CheckinData[]) {
  const arrangement: {
    matches: Record<string, { players: string[]; note?: string }>;
    unassigned: string[];
  } = {
    matches: {},
    unassigned: [],
  };

  let doublesCount = 0;
  let singlesCount = 0;

  matches.forEach(match => {
    const playerNames = match.players.map((p: any) => p.name);

    if (match.type === 'doubles' || match.type === 'doubles-forming') {
      doublesCount++;
      const matchKey = `doubles-${doublesCount}`;
      arrangement.matches[matchKey] = {
        players: playerNames,
        note: matchNotes.value[matchKey] || '',
      };
    } else if (match.type === 'singles' || match.type === 'singles-forming' || match.type === 'singles-or-practice') {
      singlesCount++;
      const matchKey = `singles-${singlesCount}`;
      arrangement.matches[matchKey] = {
        players: playerNames,
        note: matchNotes.value[matchKey] || '',
      };
    } else if (match.type === 'waiting') {
      arrangement.unassigned.push(...playerNames);
    }
  });

  return arrangement;
}

// Handle player selection/swap in arrange mode
function handleArrangeClick(playerName: string, matchKey: string) {
  if (!arrangeMode.value || !tempArrangement.value) return;

  const current = selectedPlayer.value;

  if (!current) {
    // First selection
    selectedPlayer.value = { name: playerName, matchKey };
  } else if (current.name === playerName && current.matchKey === matchKey) {
    // Clicking same player - deselect
    selectedPlayer.value = null;
  } else {
    // Second selection - swap players
    const arr = tempArrangement.value;
    const newMatches = { ...arr.matches };
    const newUnassigned = [...arr.unassigned];

    // Remove both players from their current positions
    // First player
    if (current.matchKey === 'unassigned') {
      const idx = newUnassigned.indexOf(current.name);
      if (idx > -1) newUnassigned.splice(idx, 1);
    } else {
      const match = newMatches[current.matchKey];
      if (match) {
        match.players = match.players.filter((p: string) => p !== current.name);
      }
    }

    // Second player
    if (matchKey === 'unassigned') {
      const idx = newUnassigned.indexOf(playerName);
      if (idx > -1) newUnassigned.splice(idx, 1);
    } else {
      const match = newMatches[matchKey];
      if (match) {
        match.players = match.players.filter((p: string) => p !== playerName);
      }
    }

    // Add players to their new positions
    // First player goes to second player's position
    if (matchKey === 'unassigned') {
      newUnassigned.push(current.name);
    } else {
      newMatches[matchKey].players.push(current.name);
    }

    // Second player goes to first player's position
    if (current.matchKey === 'unassigned') {
      newUnassigned.push(playerName);
    } else {
      newMatches[current.matchKey].players.push(playerName);
    }

    tempArrangement.value = {
      matches: newMatches,
      unassigned: newUnassigned,
    };
    selectedPlayer.value = null;
    showToast(`Swapped ${current.name} and ${playerName}`, 'info');
  }
}

// Start arrange mode
function startArrangeMode(matches: any[], checkins: CheckinData[]) {
  try {
    // Use existing arrangement if present and valid, otherwise initialize from current matches
    if (matchArrangement.value && matchArrangement.value.matches && typeof matchArrangement.value.matches === 'object') {
      tempArrangement.value = {
        matches: { ...matchArrangement.value.matches },
        unassigned: Array.isArray(matchArrangement.value.unassigned) ? [...matchArrangement.value.unassigned] : [],
      };
    } else {
      tempArrangement.value = initializeTempArrangement(matches, checkins);
    }
    selectedPlayer.value = null;
    arrangeMode.value = true;
  } catch (err) {
    console.error('Error starting arrange mode:', err);
    // Fallback: try to initialize from checkins directly
    tempArrangement.value = {
      matches: {},
      unassigned: checkins.map(c => c.name),
    };
    selectedPlayer.value = null;
    arrangeMode.value = true;
  }
}

// Cancel arrange mode
function cancelArrangeMode() {
  arrangeMode.value = false;
  selectedPlayer.value = null;
  tempArrangement.value = null;
}

// Save arrangement
async function saveArrangement() {
  if (!tempArrangement.value) return;
  await saveMatchArrangement(tempArrangement.value);
  arrangeMode.value = false;
  selectedPlayer.value = null;
  tempArrangement.value = null;
}

// Clear saved arrangement
async function clearArrangement() {
  await clearMatchArrangement();
  cancelArrangeMode();
}

export function GamesList() {
  // Subscribe to match arrangement updates
  useMatchArrangement();

  const checkins = currentCheckins.value;
  const date = selectedDate.value || '';
  const editingCheckin = editingIndex.value !== null ? checkins[editingIndex.value] : null;

  // Check if user is group admin
  const groupId = currentGroupId.value;
  const isAdmin = groupId && sessionStorage.getItem(`adminAuth_${groupId}`) === 'true';
  const isArrangeMode = arrangeMode.value;
  // Only consider arrangement valid if it has matches object
  const hasCustomArrangement = !!(matchArrangement.value && matchArrangement.value.matches && Object.keys(matchArrangement.value.matches).length > 0);

  // Modals - render outside early return
  const modals = (
    <>
      {/* Edit Modal */}
      <Modal
        isOpen={editModalOpen.value}
        onClose={closeEditModal}
        title={`Edit ${editingCheckin?.name || ''}'s Preferences`}
      >
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <label style="display: block; font-weight: 500; margin-bottom: 8px;">Play Style</label>
            <div style="display: flex; gap: 8px;">
              {['singles', 'doubles', 'both'].map((style) => (
                <button
                  key={style}
                  onClick={() => { editPlayStyle.value = style; }}
                  style={{
                    flex: 1,
                    padding: '10px',
                    border: editPlayStyle.value === style ? '2px solid #4CAF50' : '2px solid #e0e0e0',
                    borderRadius: '8px',
                    background: editPlayStyle.value === style ? '#E8F5E9' : '#fff',
                    color: editPlayStyle.value === style ? '#2E7D32' : '#666',
                    cursor: 'pointer',
                    fontWeight: editPlayStyle.value === style ? '600' : '400',
                  }}
                >
                  {style === 'singles' ? 'Singles' : style === 'doubles' ? 'Doubles' : 'Either'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style="display: block; font-weight: 500; margin-bottom: 8px;">Available Time (optional)</label>
            <div style="display: flex; gap: 8px; align-items: center;">
              <input
                type="time"
                value={editTimeStart.value}
                onInput={(e) => { editTimeStart.value = (e.target as HTMLInputElement).value; }}
                style="flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 6px;"
              />
              <span>to</span>
              <input
                type="time"
                value={editTimeEnd.value}
                onInput={(e) => { editTimeEnd.value = (e.target as HTMLInputElement).value; }}
                style="flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 6px;"
              />
            </div>
          </div>

          {editPlayStyle.value === 'singles' && (
            <div>
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input
                  type="checkbox"
                  checked={editAllowRotation.value}
                  onChange={(e) => { editAllowRotation.value = (e.target as HTMLInputElement).checked; }}
                />
                <span>Open to 3-player rotation</span>
              </label>
              <p style="font-size: 12px; color: #666; margin: 4px 0 0 24px;">
                If unchecked, you'll only be matched for 2-player singles
              </p>
            </div>
          )}

          <button
            onClick={saveEdit}
            style={{
              padding: '12px',
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '8px',
            }}
          >
            Save Changes
          </button>
        </div>
      </Modal>

      {/* Remove Confirmation Modal */}
      <Modal
        isOpen={removeModalOpen.value}
        onClose={closeRemoveModal}
        title={
          removeStep.value === 'done'
            ? ''
            : removeIsOwner.value
            ? 'Remove Your Check-in?'
            : `Remove ${removeName.value}?`
        }
        showCloseButton={removeStep.value !== 'done'}
      >
        <div style="display: flex; flex-direction: column; gap: 16px;">
          {removeStep.value === 'confirm' ? (
            <>
              {removeIsOwner.value ? (
                <>
                  <p style="color: #666; margin: 0; line-height: 1.5;">
                    Are you sure you want to remove yourself from this date?
                  </p>
                  <div style="background: #FFF8E1; border-radius: 8px; padding: 12px; border-left: 4px solid #FFB74D;">
                    <p style="margin: 0 0 8px 0; font-weight: 500; color: #E65100;">
                      Things to consider:
                    </p>
                    <ul style="margin: 0; padding-left: 20px; color: #666; font-size: 14px;">
                      <li>You'll lose your current spot in the check-in order</li>
                      <li>If you want to change your preferences, you can <strong>edit</strong> instead</li>
                      <li>You can always check in again after removing</li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <p style="color: #666; margin: 0; line-height: 1.5;">
                    Are you sure you want to remove <strong>{removeName.value}</strong> from this date?
                  </p>
                  <div style="background: #FFF8E1; border-radius: 8px; padding: 12px; border-left: 4px solid #FFB74D;">
                    <p style="margin: 0; color: #666; font-size: 14px;">
                      They will lose their spot in the check-in order. Consider using <strong>edit</strong> to update their preferences instead.
                    </p>
                  </div>
                </>
              )}

              <div style="display: flex; gap: 12px; margin-top: 8px;">
                <button
                  onClick={closeRemoveModal}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: '#f5f5f5',
                    color: '#666',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRemove}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: '#ef5350',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Yes, Remove
                </button>
              </div>
            </>
          ) : (
            <>
              <div style="text-align: center; padding: 8px 0;">
                <div style="font-size: 48px; margin-bottom: 8px;">✓</div>
                <p style="color: #666; margin: 0;">
                  {removeIsOwner.value
                    ? `You've been removed from ${formatDate(removeDate.value)}`
                    : `${removeName.value} has been removed from ${formatDate(removeDate.value)}`
                  }
                </p>
              </div>

              <div>
                <p style="margin: 0 0 8px 0; font-size: 13px; color: #666; text-align: center;">
                  Let others know:
                </p>
                <div style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: center;">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      removeIsOwner.value
                        ? `I'm out on ${formatDate(removeDate.value)}.`
                        : `Hi ${removeName.value}, I removed you from ${formatDate(removeDate.value)}. Let me know if you have questions!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '8px 16px',
                      background: '#25D366',
                      color: 'white',
                      borderRadius: '6px',
                      fontSize: '14px',
                      textDecoration: 'none',
                    }}
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`sms:?body=${encodeURIComponent(
                      removeIsOwner.value
                        ? `I'm out on ${formatDate(removeDate.value)}.`
                        : `Hi ${removeName.value}, I removed you from ${formatDate(removeDate.value)}. Let me know if you have questions!`
                    )}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '8px 16px',
                      background: '#007AFF',
                      color: 'white',
                      borderRadius: '6px',
                      fontSize: '14px',
                      textDecoration: 'none',
                    }}
                  >
                    Text
                  </a>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(
                      removeIsOwner.value
                        ? `I'm Out on ${formatDate(removeDate.value)}`
                        : `${removeGroupName.value} - Check-in Removed`
                    )}&body=${encodeURIComponent(
                      removeIsOwner.value
                        ? `I'm out on ${formatDate(removeDate.value)}.`
                        : `Hi ${removeName.value},\n\nI removed you from ${formatDate(removeDate.value)}.\n\nLet me know if you have questions!`
                    )}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '8px 16px',
                      background: '#EA4335',
                      color: 'white',
                      borderRadius: '6px',
                      fontSize: '14px',
                      textDecoration: 'none',
                    }}
                  >
                    Email
                  </a>
                </div>
              </div>

              <button
                onClick={closeRemoveModal}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginTop: '8px',
                }}
              >
                Done
              </button>
            </>
          )}
        </div>
      </Modal>
    </>
  );

  if (checkins.length === 0) {
    return (
      <>
        <div class="empty-state">No check-ins yet</div>
        {modals}
      </>
    );
  }

  const { matches, warnings } = organizeMatches(checkins);

  const hasMatches = matches.some(m => (m.type as string) !== 'waiting' || m.players.length > 0);
  if (!hasMatches && warnings.length === 0) {
    return (
      <>
        <div class="empty-state">No check-ins yet</div>
        {modals}
      </>
    );
  }

  let singlesCount = 0;
  let rotationCount = 0;

  return (
    <>
      <div class="games-list" style="margin-top: 24px; padding-top: 24px; border-top: 2px solid #f0f0f0;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <h2 style="margin: 0;">Games ({checkins.length} checked in)</h2>
            {hasCustomArrangement && !isArrangeMode && (
              <span style={{
                fontSize: '11px',
                background: '#9C27B0',
                color: 'white',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: '600',
              }}>
                Arranged
              </span>
            )}
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            {/* Arrange mode controls */}
            {isArrangeMode ? (
              <>
                <button
                  onClick={saveArrangement}
                  style={{
                    background: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Save
                </button>
                <button
                  onClick={cancelArrangeMode}
                  style={{
                    background: '#f5f5f5',
                    color: '#666',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                {hasCustomArrangement && (
                  <button
                    onClick={clearArrangement}
                    style={{
                      background: 'rgba(255, 82, 82, 0.1)',
                      color: '#e57373',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      fontSize: '13px',
                      fontWeight: '500',
                      cursor: 'pointer',
                    }}
                  >
                    Reset
                  </button>
                )}
              </>
            ) : (
              <>
                {hasMatches && (
                  <button
                    onClick={() => shareToWhatsApp(matches, checkins, date)}
                    title="Share to WhatsApp"
                    style={{
                      background: '#25D366',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      padding: '0',
                      width: '36px',
                      height: '36px',
                      fontSize: '16px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </button>
                )}
                {isAdmin && checkins.length >= 2 && (
                  <button
                    onClick={() => startArrangeMode(matches, checkins)}
                    title="Arrange Players"
                    style={{
                      background: '#9C27B0',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                    Arrange
                  </button>
                )}
                {isAdmin && checkins.length > 0 && !hasMatches && (
                  <button
                    class="reset-day-btn"
                    onClick={handleResetDay}
                    title="Reset This Day"
                    style={{
                      background: 'rgba(255, 82, 82, 0.1)',
                      color: '#e57373',
                      border: 'none',
                      borderRadius: '50%',
                      padding: '0',
                      width: '36px',
                      height: '36px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                    </svg>
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Arrange mode instruction */}
        {isArrangeMode && (
          <div style={{
            background: '#F3E5F5',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '16px',
            color: '#7B1FA2',
            fontSize: '14px',
          }}>
            <strong>Arrange Mode:</strong> Tap a player to select, then tap another player to swap their positions.
            {selectedPlayer.value && (
              <span style={{ display: 'block', marginTop: '4px' }}>
                Selected: <strong>{selectedPlayer.value.name}</strong> - tap another player to swap
              </span>
            )}
          </div>
        )}

        {/* Arrange mode view */}
        {isArrangeMode && tempArrangement.value && (
          <>
            {Object.entries(tempArrangement.value.matches || {}).map(([matchKey, matchData]) => {
              const isDoubles = matchKey.startsWith('doubles');
              const matchNum = matchKey.split('-')[1];
              const players = matchData?.players || [];
              // Skip empty matches
              if (players.length === 0) return null;
              return (
                <div key={matchKey} class="match-group" style={{
                  marginBottom: '16px',
                  border: '2px dashed #9C27B0',
                  borderRadius: '8px',
                  padding: '8px',
                }}>
                  <h3 style="margin: 0 0 8px 0;">
                    {isDoubles ? `Doubles ${matchNum}` : `Singles ${matchNum}`}
                    <span style={{ fontSize: '12px', color: '#666', marginLeft: '8px' }}>
                      ({players.length}/{isDoubles ? 4 : 2})
                    </span>
                  </h3>
                  <div style="display: flex; flex-direction: column; gap: 4px;">
                    {players.map((playerName: string) => {
                      const isSelected = selectedPlayer.value?.name === playerName && selectedPlayer.value?.matchKey === matchKey;
                      return (
                        <div
                          key={playerName}
                          onClick={() => handleArrangeClick(playerName, matchKey)}
                          style={{
                            padding: '10px 12px',
                            background: isSelected ? '#9C27B0' : '#f5f5f5',
                            color: isSelected ? 'white' : '#333',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '500',
                            transition: 'all 0.15s',
                            border: isSelected ? '2px solid #7B1FA2' : '2px solid transparent',
                          }}
                        >
                          {playerName}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Unassigned players */}
            {tempArrangement.value.unassigned.length > 0 && (
              <div class="match-group" style={{
                marginBottom: '16px',
                border: '2px dashed #9e9e9e',
                borderRadius: '8px',
                padding: '8px',
                background: '#fafafa',
              }}>
                <h3 style="margin: 0 0 8px 0; color: #666;">Unassigned</h3>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                  {tempArrangement.value.unassigned.map((playerName: string) => {
                    const isSelected = selectedPlayer.value?.name === playerName && selectedPlayer.value?.matchKey === 'unassigned';
                    return (
                      <div
                        key={playerName}
                        onClick={() => handleArrangeClick(playerName, 'unassigned')}
                        style={{
                          padding: '10px 12px',
                          background: isSelected ? '#9C27B0' : '#fff',
                          color: isSelected ? 'white' : '#333',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontWeight: '500',
                          transition: 'all 0.15s',
                          border: isSelected ? '2px solid #7B1FA2' : '2px solid #e0e0e0',
                        }}
                      >
                        {playerName}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}

        {!isArrangeMode && !hasCustomArrangement && warnings.length > 0 && (
          <div class="warning-box">
            {warnings.map((warning, idx) => (
              <div key={idx}>{warning}</div>
            ))}
          </div>
        )}

        {/* Render custom arrangement view when saved */}
        {!isArrangeMode && hasCustomArrangement && matchArrangement.value && matchArrangement.value.matches && (
          <>
            {Object.entries(matchArrangement.value.matches).map(([matchKey, matchData]) => {
              const isDoubles = matchKey.startsWith('doubles');
              const matchNum = matchKey.split('-')[1];
              const expectedCount = isDoubles ? 4 : 2;
              const players = matchData?.players || [];
              const isComplete = players.length >= expectedCount;

              // Get full checkin data for each player
              const playersWithData = players.map(playerName => {
                const checkin = checkins.find(c => c.name === playerName);
                return checkin || { name: playerName, timestamp: 0 };
              });

              return (
                <div key={matchKey} class={`match-group ${isComplete ? '' : 'forming-group'}`} style="margin-bottom: 16px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <h3 style="margin: 0;">{isDoubles ? 'Doubles' : 'Singles'} {matchNum}</h3>
                    {isComplete ? (
                      <span style="display: flex; align-items: center; gap: 4px; color: #4CAF50; font-size: 13px; font-weight: 600;">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        Ready
                      </span>
                    ) : (
                      <span style="display: flex; align-items: center; gap: 4px; color: #F57C00; font-size: 12px; font-weight: 600;">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                        </svg>
                        Need {expectedCount - players.length}
                      </span>
                    )}
                  </div>
                  <div id="checkinList">
                    {playersWithData.map((player: any) => {
                      const globalIndex = findGlobalIndex(checkins, player);
                      return <CheckinTile key={globalIndex >= 0 ? globalIndex : player.name} checkin={player} globalIndex={globalIndex >= 0 ? globalIndex : -1} />;
                    })}
                  </div>
                  <MatchNoteInput matchKey={matchKey} />
                </div>
              );
            })}

            {/* Unassigned players from custom arrangement */}
            {matchArrangement.value.unassigned && matchArrangement.value.unassigned.length > 0 && (
              <div class="match-group waiting-group" style="margin-bottom: 16px;">
                <h3 style="margin: 0 0 8px 0;">Unassigned</h3>
                <div id="checkinList">
                  {matchArrangement.value.unassigned.map((playerName: string) => {
                    const checkin = checkins.find(c => c.name === playerName);
                    const player = checkin || { name: playerName, timestamp: 0 };
                    const globalIndex = checkin ? findGlobalIndex(checkins, player) : -1;
                    return <CheckinTile key={globalIndex >= 0 ? globalIndex : playerName} checkin={player} globalIndex={globalIndex >= 0 ? globalIndex : -1} />;
                  })}
                </div>
              </div>
            )}
          </>
        )}

        {!isArrangeMode && !hasCustomArrangement && matches.map((match, idx) => {
          if (match.type === 'doubles') {
            const matchKey = `doubles-${match.number}`;
            return (
              <div key={idx} class="match-group" style="margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <h3 style="margin: 0;">Doubles {match.number}</h3>
                  <span style="display: flex; align-items: center; gap: 4px; color: #4CAF50; font-size: 13px; font-weight: 600;">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    Ready
                  </span>
                </div>
                <div id="checkinList">
                  {match.players.map((player: any) => {
                    const globalIndex = findGlobalIndex(checkins, player);
                    return <CheckinTile key={globalIndex} checkin={player} globalIndex={globalIndex} />;
                  })}
                </div>
                <MatchNoteInput matchKey={matchKey} />
              </div>
            );
          }

          if (match.type === 'singles') {
            singlesCount++;
            const matchKey = `singles-${singlesCount}`;

            const bothFlexible = match.players.every((p: any) => (p.playStyle || 'both') === 'both');
            const anyOpenToRotation = match.players.some((p: any) => p.allowRotation === true);
            const isProvisional = bothFlexible && anyOpenToRotation;

            return (
              <div key={idx} class="match-group singles-group" style="margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <h3 style="margin: 0;">Singles{singlesCount > 1 ? ` ${singlesCount}` : ''}</h3>
                  <span style="display: flex; align-items: center; gap: 4px; color: #4CAF50; font-size: 13px; font-weight: 600;">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    Ready
                  </span>
                </div>
                <div id="checkinList">
                  {match.players.map((player: any) => {
                    const globalIndex = findGlobalIndex(checkins, player);
                    return <CheckinTile key={globalIndex} checkin={player} globalIndex={globalIndex} />;
                  })}
                </div>
                {isProvisional && (
                  <p style="color: #666; font-size: 13px; margin: 8px 0 4px 0; font-style: italic; padding: 0 12px;">
                    Open to more players
                  </p>
                )}
                <MatchNoteInput matchKey={matchKey} />
              </div>
            );
          }

          if (match.type === 'singles-or-practice') {
            rotationCount++;
            const matchKey = `rotation-${rotationCount}`;

            return (
              <div key={idx} class="match-group singles-group" style="margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <h3 style="margin: 0;">Rotation (3 players)</h3>
                  <span style="display: flex; align-items: center; gap: 4px; color: #4CAF50; font-size: 13px; font-weight: 600;">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    Ready
                  </span>
                </div>
                <div id="checkinList">
                  {match.players.map((player: any) => {
                    const globalIndex = findGlobalIndex(checkins, player);
                    return <CheckinTile key={globalIndex} checkin={player} globalIndex={globalIndex} />;
                  })}
                </div>
                <MatchNoteInput matchKey={matchKey} />
              </div>
            );
          }

          if (match.type === 'doubles-forming') {
            const matchKey = 'doubles-forming-1';
            const needed = match.needed || (4 - match.players.length);

            let fallbackText = '';
            if (match.canRotate) {
              fallbackText = 'Can rotate if no 4th';
            } else if (match.canPlaySingles && (match.eitherCount || 0) >= 2) {
              fallbackText = 'Will play singles if no more join';
            } else if ((match.eitherCount || 0) === 1 && match.players.length === 1) {
              fallbackText = 'Can play singles if 1 more joins';
            }

            return (
              <div key={idx} class="match-group forming-group" style="margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <h3 style="margin: 0;">Doubles</h3>
                    <span style="display: flex; align-items: center; gap: 4px; color: #F57C00; font-size: 12px; font-weight: 600;">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                      </svg>
                      Need {needed}
                    </span>
                  </div>
                  <NeedPlayersButton match={match} matchKey={matchKey} needed={needed} />
                </div>
                <div id="checkinList">
                  {match.players.map((player: any) => {
                    const globalIndex = findGlobalIndex(checkins, player);
                    return <CheckinTile key={globalIndex} checkin={player} globalIndex={globalIndex} />;
                  })}
                </div>
                {fallbackText && (
                  <p style="color: #666; font-size: 13px; margin: 8px 0 4px 0; font-style: italic; padding: 0 12px;">
                    {fallbackText}
                  </p>
                )}
                <MatchNoteInput matchKey={matchKey} />
              </div>
            );
          }

          if (match.type === 'singles-forming') {
            const matchKey = 'singles-forming-1';
            return (
              <div key={idx} class="match-group forming-group" style="margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <h3 style="margin: 0;">Singles</h3>
                    <span style="display: flex; align-items: center; gap: 4px; color: #F57C00; font-size: 12px; font-weight: 600;">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                      </svg>
                      Need 1
                    </span>
                  </div>
                  <NeedPlayersButton match={match} matchKey={matchKey} needed={1} />
                </div>
                <div id="checkinList">
                  {match.players.map((player: any) => {
                    const globalIndex = findGlobalIndex(checkins, player);
                    return <CheckinTile key={globalIndex} checkin={player} globalIndex={globalIndex} />;
                  })}
                </div>
              </div>
            );
          }

          if (match.type === 'waiting') {
            return (
              <div key={idx} class="match-group waiting-group" style="margin-bottom: 16px;">
                <h3 style="margin: 0 0 8px 0;">Waiting for Match</h3>
                <div id="checkinList">
                  {match.players.map((player: any) => {
                    const globalIndex = findGlobalIndex(checkins, player);
                    return <CheckinTile key={globalIndex} checkin={player} globalIndex={globalIndex} />;
                  })}
                </div>
              </div>
            );
          }

          return null;
        })}
      </div>
      {modals}
    </>
  );
}
