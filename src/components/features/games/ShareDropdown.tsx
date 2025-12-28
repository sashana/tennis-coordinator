/**
 * Share dropdown components for GamesList
 */
import { showToast, currentGroupId, selectedDate } from '../../App';
import { matchNotes, groupSettings } from '../../../hooks/useFirebase';
import { formatTimeRange } from '../../../utils/helpers';
import { weatherCache, getWeatherDescription } from '../WeatherWidget';
import { activeShareDropdown, mainShareDropdownOpen } from './gamesState';
import { sport, getPlayerCount } from '../../../config/sport';
import type { CheckinData, Match } from '../../../types';

const sportEmoji = sport.sportEmoji;

// Generate message for "need players" share
function generateNeedPlayersMessage(match: Match, date: string): string {
  const dateObj = new Date(date + 'T00:00:00');
  const dateStr = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  const playerNames = match.players.map((p) => p.name).join(' & ');
  const groupId = currentGroupId.value;
  const appUrl = `${window.location.origin}${window.location.pathname}#${groupId}`;

  if (match.type === 'doubles-forming') {
    const needed = match.needed || getPlayerCount('doubles') - match.players.length;
    const neededText = needed === 1 ? '1 more player needed' : `${needed} more players needed`;

    let message = `${sportEmoji} ${neededText} for doubles!\n`;
    message += `📅 ${dateStr}\n`;
    message += `👥 ${playerNames} ${match.players.length === 1 ? 'is' : 'are'} in\n\n`;
    message += `Can you make it? ${appUrl}`;

    return message;
  } else if (match.type === 'singles-forming') {
    const player = match.players[0];

    let message = `${sportEmoji} 1 more player needed for singles!\n`;
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

function shareNeedPlayers(match: Match, date: string, method: 'whatsapp' | 'sms' | 'copy') {
  const message = generateNeedPlayersMessage(match, date);

  if (method === 'whatsapp') {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  } else if (method === 'sms') {
    const encoded = encodeURIComponent(message);
    window.open(`sms:?body=${encoded}`, '_blank');
  } else if (method === 'copy') {
    navigator.clipboard
      .writeText(message)
      .then(() => {
        showToast('Message copied!', 'success');
      })
      .catch(() => {
        showToast('Failed to copy', 'error');
      });
  }

  activeShareDropdown.value = null;
}

interface NeedPlayersButtonProps {
  match: Match;
  matchKey: string;
  needed: number;
}

export function NeedPlayersButton({ match, matchKey }: NeedPlayersButtonProps) {
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
          background: isOpen
            ? 'var(--color-orange-dark, #e65100)'
            : 'var(--color-orange-primary, #ff9800)',
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
        <svg
          viewBox="0 0 24 24"
          width="12"
          height="12"
          fill="currentColor"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
        >
          <path d="M7 10l5 5 5-5z" />
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
              color: 'var(--color-whatsapp, #25D366)',
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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
              color: 'var(--color-sms, #2196F3)',
              borderTop: '1px solid #f0f0f0',
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
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
              color: 'var(--color-gray-base, #666)',
              borderTop: '1px solid #f0f0f0',
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
            </svg>
            Copy
          </button>
        </div>
      )}
    </div>
  );
}

// Generate WhatsApp message for all games
export function generateWhatsAppMessage(matches: Match[], _checkins: CheckinData[], date: string): string {
  const dateObj = new Date(date + 'T00:00:00');
  const dateStr = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  let message = `${dateStr}\n`;
  let singlesCount = 0;
  let rotationCount = 0;

  matches.forEach((match) => {
    if (match.type === 'doubles') {
      const players = match.players.map((p) => p.name);
      message += `Doubles: ${players.join(', ')}\n`;

      const times = match.players
        .filter((p) => p.timeRange)
        .map((p) => formatTimeRange(p.timeRange!.start, p.timeRange!.end));
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
      const players = match.players.map((p) => p.name);
      message += `Singles: ${players.join(', ')}\n`;

      const bothFlexible = match.players.every((p) => (p.playStyle || 'both') === 'both');
      const anyOpenToRotation = match.players.some((p) => p.allowRotation === true);
      if (bothFlexible && anyOpenToRotation) {
        message += `Open to more players\n`;
      }

      const times = match.players
        .filter((p) => p.timeRange)
        .map((p) => formatTimeRange(p.timeRange!.start, p.timeRange!.end));
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
      message += `Rotation: ${match.players.map((p) => p.name).join(', ')}\n`;

      const times = match.players
        .filter((p) => p.timeRange)
        .map((p) => formatTimeRange(p.timeRange!.start, p.timeRange!.end));
      if (times.length > 0) {
        message += `${times[0]}\n`;
      }

      const matchKey = `rotation-${rotationCount}`;
      if (matchNotes.value[matchKey]) {
        message += `📝 ${matchNotes.value[matchKey]}\n`;
      }
      message += '\n';
    } else if (match.type === 'doubles-forming') {
      const players = match.players.map((p) => p.name);
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
        .filter((p) => p.timeRange)
        .map((p) => formatTimeRange(p.timeRange!.start, p.timeRange!.end));
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

  const standbyMatches = matches.filter((m) => m.type === 'waiting');
  if (standbyMatches.length > 0) {
    const standbyPlayers = standbyMatches.flatMap((m) => m.players.map((p) => p.name));
    if (standbyPlayers.length > 0) {
      message += `Standby: ${standbyPlayers.join(', ')}\n`;
    }
  }

  const location = groupSettings.value?.location;
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

export function shareGames(
  matches: Match[],
  checkins: CheckinData[],
  date: string,
  method: 'whatsapp' | 'sms' | 'copy'
) {
  const message = generateWhatsAppMessage(matches, checkins, date);

  if (method === 'whatsapp') {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  } else if (method === 'sms') {
    const encoded = encodeURIComponent(message);
    window.open(`sms:?body=${encoded}`, '_blank');
  } else if (method === 'copy') {
    navigator.clipboard
      .writeText(message)
      .then(() => {
        showToast('Message copied!', 'success');
      })
      .catch(() => {
        showToast('Failed to copy', 'error');
      });
  }

  mainShareDropdownOpen.value = false;
}
