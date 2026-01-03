/**
 * Share utilities for MyMatchesTab
 */
import { showToast, currentGroupId } from '../../App';
import { formatTimeRange } from '../../../utils/helpers';
import { getPlayerCount, sport } from '../../../config/sport';
import { allMatchNotes } from '../../../hooks/useFirebase';
import { activeShareDropdown, ScheduledMatch, selectedGames, isSelectionMode, showShareOptions } from './myMatchesState';

const sportEmoji = sport.sportEmoji;

export function getMatchTypeLabel(type: string): string {
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
    default:
      return type;
  }
}

/**
 * Get match note for a given match
 */
function getMatchNote(match: ScheduledMatch): string {
  const noteMatchKey = `${match.type.replace('-forming', '')}-${match.matchNumber}`;
  return allMatchNotes.value[match.date]?.[noteMatchKey] || '';
}

export function generateNeedPlayersMessage(match: ScheduledMatch): string {
  const dateObj = new Date(match.date + 'T00:00:00');
  const dateStr = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  const playerNames = match.players.map((p) => p.name).join(' & ');
  const groupId = currentGroupId.value;
  const appUrl = `${window.location.origin}${window.location.pathname}#${groupId}`;
  const note = getMatchNote(match);

  if (match.type === 'doubles-forming') {
    const needed = match.needed || getPlayerCount('doubles') - match.players.length;
    const neededText = needed === 1 ? '1 more player needed' : `${needed} more players needed`;

    let message = `${sportEmoji} ${neededText} for doubles!\n`;
    message += `📅 ${dateStr}\n`;
    message += `👥 ${playerNames} ${match.players.length === 1 ? 'is' : 'are'} in\n`;
    if (note) {
      message += `📝 ${note}\n`;
    }
    message += `\nCan you make it? ${appUrl}`;

    return message;
  } else if (match.type === 'singles-forming') {
    const player = match.players[0];

    let message = `${sportEmoji} 1 more player needed for singles!\n`;
    message += `📅 ${dateStr}\n`;
    message += `👤 ${player.name} is in`;
    if (player.timeRange) {
      message += ` (${formatTimeRange(player.timeRange.start, player.timeRange.end)})`;
    }
    message += '\n';
    if (note) {
      message += `📝 ${note}\n`;
    }
    message += `\nCan you make it? ${appUrl}`;

    return message;
  }

  return '';
}

export function shareNeedPlayers(match: ScheduledMatch, method: 'whatsapp' | 'sms' | 'copy') {
  const message = generateNeedPlayersMessage(match);

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

export function generateMultiGameShareText(schedule: ScheduledMatch[], selectedKeys: Set<string>): string {
  const groupId = currentGroupId.value;
  const appUrl = `${window.location.origin}${window.location.pathname}#${groupId}`;

  // Get selected matches
  const selectedMatches = schedule.filter((match, idx) => {
    const matchKey = `mygames-${match.date}-${match.type}-${idx}`;
    return selectedKeys.has(matchKey);
  });

  if (selectedMatches.length === 0) {
    return '';
  }

  // Separate by status
  const ready = selectedMatches.filter((m) => !m.isForming);
  const forming = selectedMatches.filter((m) => m.isForming);

  let message = `${sport.sportEmoji} ${sport.name} Update\n\n`;

  if (ready.length > 0) {
    message += '✅ Ready to Play:\n';
    for (const match of ready) {
      const dateObj = new Date(match.date + 'T00:00:00');
      const dateStr = dateObj.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      const typeLabel = getMatchTypeLabel(match.type);
      const playerNames = match.players.map((p) => p.name).join(', ');
      const note = getMatchNote(match);
      message += `• ${dateStr} - ${typeLabel}\n  ${playerNames}\n`;
      if (note) {
        message += `  📝 ${note}\n`;
      }
    }
    message += '\n';
  }

  if (forming.length > 0) {
    message += '🟡 Need Players:\n';
    for (const match of forming) {
      const dateObj = new Date(match.date + 'T00:00:00');
      const dateStr = dateObj.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      const typeLabel = getMatchTypeLabel(match.type);
      const needed = match.needed || 1;
      const playerNames = match.players.map((p) => p.name).join(', ');
      const note = getMatchNote(match);
      message += `• ${dateStr} - ${typeLabel} needs ${needed}\n  ${playerNames}\n`;
      if (note) {
        message += `  📝 ${note}\n`;
      }
    }
    message += '\n';
  }

  message += `Check in: ${appUrl}`;

  return message;
}

export function shareSelectedGames(
  method: 'whatsapp' | 'sms' | 'copy' | 'native',
  schedule: ScheduledMatch[]
) {
  const message = generateMultiGameShareText(schedule, selectedGames.value);

  if (!message) {
    showToast('No games selected', 'error');
    return;
  }

  if (method === 'native' && navigator.share) {
    navigator
      .share({
        title: `${sport.name} Update`,
        text: message,
      })
      .catch(() => {
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
    navigator.clipboard
      .writeText(message)
      .then(() => {
        showToast('Copied to clipboard', 'success');
      })
      .catch(() => {
        showToast('Failed to copy', 'error');
      });
  }

  // Exit selection mode after sharing
  showShareOptions.value = false;
  isSelectionMode.value = false;
  selectedGames.value = new Set();
}
