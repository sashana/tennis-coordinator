import { signal } from '@preact/signals';
import { currentCheckins, selectedDate, currentGroupId, showToast } from '../App';
import { matchNotes, saveMatchNote, resetDay, groupSettings } from '../../hooks/useFirebase';
import { organizeMatches } from '../../utils/matching';
import { formatTimeRange, formatDate, debounce, getPreferenceLabel } from '../../utils/helpers';
import { weatherCache, getWeatherDescription } from './WeatherWidget';

// State for inline share dropdown
const activeShareDropdown = signal<string | null>(null);

// Close dropdown when clicking outside
if (typeof document !== 'undefined') {
  document.addEventListener('click', (e) => {
    if (activeShareDropdown.value) {
      const target = e.target as HTMLElement;
      // Check if click is inside a dropdown or its button
      if (!target.closest('.share-dropdown') && !target.closest('[data-share-button]')) {
        activeShareDropdown.value = null;
      }
    }
  });
}

function generateNeedPlayersMessage(match: any, date: string): string {
  // Format date nicely
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

// Invite button with dropdown
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


// Debounced save function
const saveMatchNoteDebounced = debounce((...args: unknown[]) => {
  const [matchKey, note] = args as [string, string];
  saveMatchNote(matchKey, note);
}, 500);

function MatchNoteInput({ matchKey }: { matchKey: string }) {
  const existingNote = matchNotes.value[matchKey] || '';

  return (
    <div class="match-notes">
      <input
        type="text"
        placeholder="📝 Add note (court, time, etc.)"
        value={existingNote}
        onInput={(e) => {
          const value = (e.target as HTMLInputElement).value;
          saveMatchNoteDebounced(matchKey, value);
        }}
        class="match-note-input"
      />
    </div>
  );
}

function PlayerList({ players }: { players: any[] }) {
  return (
    <ul>
      {players.map((player, idx) => {
        const guestTag = player.isGuest ? ` (guest of ${player.addedBy})` : '';
        const timeTag = player.timeRange
          ? ` ${formatTimeRange(player.timeRange.start, player.timeRange.end)}`
          : '';

        return (
          <li key={idx}>
            • {player.name}
            {guestTag && <span class="guest-indicator">{guestTag}</span>}
            {timeTag && <span class="time-badge">{timeTag}</span>}
            <span class={`preference-badge ${player.playStyle || 'both'}`}>
              {getPreferenceLabel(player.playStyle || 'both')}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function generateWhatsAppMessage(matches: any[], _checkins: any[], date: string): string {
  // Format date - compact (e.g., "Friday, Dec 13")
  const dateObj = new Date(date + 'T00:00:00');
  const dateStr = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  // Start message - compact header (no group name, just date)
  let message = `${dateStr}\n`;

  let singlesCount = 0;
  let rotationCount = 0;

  matches.forEach(match => {
    if (match.type === 'doubles') {
      const players = match.players.map((p: any) => p.name);
      message += `Doubles: ${players.join(', ')}\n`;

      // Add time window if available - compact format (just show first one)
      const times = match.players
        .filter((p: any) => p.timeRange)
        .map((p: any) => formatTimeRange(p.timeRange.start, p.timeRange.end));
      if (times.length > 0) {
        message += `${times[0]}\n`;
      }

      // Add note if exists
      const matchKey = `doubles-${match.number}`;
      if (matchNotes.value[matchKey]) {
        message += `📝 ${matchNotes.value[matchKey]}\n`;
      }
      message += '\n';
    } else if (match.type === 'singles') {
      singlesCount++;
      const players = match.players.map((p: any) => p.name);
      message += `Singles: ${players.join(', ')}\n`;

      // Check if this is a "provisional" singles - both flexible and at least one open to rotation
      const bothFlexible = match.players.every((p: any) => (p.playStyle || 'both') === 'both');
      const anyOpenToRotation = match.players.some((p: any) => p.allowRotation === true);
      if (bothFlexible && anyOpenToRotation) {
        message += `Open to more players\n`;
      }

      // Add time window if available - compact format
      const times = match.players
        .filter((p: any) => p.timeRange)
        .map((p: any) => formatTimeRange(p.timeRange.start, p.timeRange.end));
      if (times.length > 0) {
        message += `${times[0]}\n`;
      }

      // Add note if exists
      const matchKey = `singles-${singlesCount}`;
      if (matchNotes.value[matchKey]) {
        message += `📝 ${matchNotes.value[matchKey]}\n`;
      }
      message += '\n';
    } else if (match.type === 'singles-or-practice') {
      rotationCount++;
      message += `Rotation: ${match.players.map((p: any) => p.name).join(', ')}\n`;

      // Add time window if available - compact format
      const times = match.players
        .filter((p: any) => p.timeRange)
        .map((p: any) => formatTimeRange(p.timeRange.start, p.timeRange.end));
      if (times.length > 0) {
        message += `${times[0]}\n`;
      }

      // Add note if exists
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

      // Add fallback info
      if (match.canRotate) {
        message += `Can rotate if no 4th\n`;
      } else if (match.canPlaySingles && (match.eitherCount || 0) >= 2) {
        message += `Will play singles if no more join\n`;
      } else if ((match.eitherCount || 0) === 1 && match.players.length === 1) {
        message += `Can play singles if 1 more joins\n`;
      }

      // Add time window if available
      const times = match.players
        .filter((p: any) => p.timeRange)
        .map((p: any) => formatTimeRange(p.timeRange.start, p.timeRange.end));
      if (times.length > 0) {
        message += `${times[0]}\n`;
      }

      // Add note if exists
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

  // Add standby list if any (on same line)
  const standbyMatches = matches.filter((m: any) => m.type === 'waiting');
  if (standbyMatches.length > 0) {
    const standbyPlayers = standbyMatches.flatMap((m: any) => m.players.map((p: any) => p.name));
    if (standbyPlayers.length > 0) {
      message += `Standby: ${standbyPlayers.join(', ')}\n`;
    }
  }

  // Add weather if available - compact format
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

export function MatchList() {
  const checkins = currentCheckins.value;
  const date = selectedDate.value || '';

  if (checkins.length === 0) {
    return null;
  }

  const { matches, warnings } = organizeMatches(checkins);

  const hasMatches = matches.some(m => (m.type as string) !== 'waiting' || m.players.length > 0);
  if (!hasMatches && warnings.length === 0) {
    return null;
  }

  // Check if user is group admin (using sessionStorage auth)
  const groupId = currentGroupId.value;
  const isAdmin = groupId && sessionStorage.getItem(`adminAuth_${groupId}`) === 'true';

  let singlesCount = 0;
  let rotationCount = 0;

  return (
    <div class="matches" id="matches" style="margin-top: 24px; padding-top: 24px; border-top: 2px solid #f0f0f0;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <h2 style="margin: 0;">Games</h2>
        <div style="display: flex; gap: 8px; align-items: center;">
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
          {isAdmin && checkins.length > 0 && (
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
        </div>
      </div>

      {warnings.length > 0 && (
        <div class="warning-box">
          {warnings.map((warning, idx) => (
            <div key={idx}>{warning}</div>
          ))}
        </div>
      )}

      {matches.map((match, idx) => {
        if (match.type === 'doubles') {
          const matchKey = `doubles-${match.number}`;
          return (
            <div key={idx} class="match-group">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <h3 style="margin: 0;">Doubles {match.number}</h3>
                <span style="display: flex; align-items: center; gap: 4px; color: #2C6E49; font-size: 13px; font-weight: 600;">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Ready
                </span>
              </div>
              <PlayerList players={match.players} />
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
            <div key={idx} class="match-group singles-group">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <h3 style="margin: 0;">Singles{singlesCount > 1 ? ` ${singlesCount}` : ''}</h3>
                <span style="display: flex; align-items: center; gap: 4px; color: #2C6E49; font-size: 13px; font-weight: 600;">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Ready
                </span>
              </div>
              <PlayerList players={match.players} />
              {isProvisional && (
                <p style="color: #666; font-size: 13px; margin: 8px 0 4px 0; font-style: italic;">
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
            <div key={idx} class="match-group singles-group">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <h3 style="margin: 0;">Rotation (3 players) - 1v1 or 1v2</h3>
                <span style="display: flex; align-items: center; gap: 4px; color: #2C6E49; font-size: 13px; font-weight: 600;">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Ready
                </span>
              </div>
              <PlayerList players={match.players} />
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
            <div key={idx} class="match-group forming-group">
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
              <PlayerList players={match.players} />
              {fallbackText && (
                <p style="color: #666; font-size: 13px; margin: 8px 0 4px 0; font-style: italic;">
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
            <div key={idx} class="match-group forming-group">
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
              <PlayerList players={match.players} />
            </div>
          );
        }

        if (match.type === 'waiting') {
          return (
            <div key={idx} class="match-group waiting-group">
              <h3>Waiting for Match</h3>
              <PlayerList players={match.players} />
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
