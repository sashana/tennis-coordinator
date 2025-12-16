/**
 * Sharing utilities for WhatsApp and other platforms
 */

import type { Match, CheckinData } from '@/types';
import { formatTimeRange } from './helpers';
import { getOrdinalSuffix } from './datetime';

/**
 * Build WhatsApp URL with message
 */
export function buildWhatsAppUrl(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/?text=${encodedMessage}`;
}

/**
 * Build SMS URL with message
 */
export function buildSmsUrl(phone: string, message: string): string {
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  const encodedMessage = encodeURIComponent(message);
  // Check if iOS (use & for body) or Android (use ? for body)
  const separator = /iPhone|iPad|iPod/.test(navigator?.userAgent || '') ? '&' : '?';
  return `sms:${cleanPhone}${separator}body=${encodedMessage}`;
}

/**
 * Build email URL with subject and body
 */
export function buildEmailUrl(email: string, subject: string, body: string): string {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  return `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
}

/**
 * Format date with ordinal for sharing (e.g., "Monday, January 15th")
 */
export function formatDateForSharing(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00');
  const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const day = date.getDate();
  const suffix = getOrdinalSuffix(day);
  return `${weekday}, ${month} ${day}${suffix}`;
}

/**
 * Format matches for WhatsApp sharing
 */
export function formatMatchesForWhatsApp(
  matches: Match[],
  dateStr: string,
  groupName?: string
): string {
  const formattedDate = formatDateForSharing(dateStr);
  const lines: string[] = [];

  // Header
  if (groupName) {
    lines.push(`*${groupName} - ${formattedDate}*`);
  } else {
    lines.push(`*Tennis Matches - ${formattedDate}*`);
  }
  lines.push('');

  // Matches
  for (const match of matches) {
    if (match.type === 'doubles' || match.type === 'singles') {
      const typeLabel = match.type === 'doubles' ? 'Doubles' : 'Singles';
      const matchNum = match.number ? ` ${match.number}` : '';
      lines.push(`*${typeLabel}${matchNum}:*`);
      match.players.forEach((player, i) => {
        const timeStr = player.timeRange
          ? ` (${formatTimeRange(player.timeRange.start, player.timeRange.end)})`
          : '';
        lines.push(`  ${i + 1}. ${player.name}${timeStr}`);
      });
      lines.push('');
    } else if (match.type === 'doubles-forming') {
      lines.push(`*Doubles Forming (need ${match.needed} more):*`);
      match.players.forEach((player, i) => {
        lines.push(`  ${i + 1}. ${player.name}`);
      });
      if (match.canRotate) {
        lines.push('  ↻ Can rotate');
      }
      lines.push('');
    } else if (match.type === 'singles-forming') {
      lines.push(`*Singles Forming:*`);
      match.players.forEach((player, i) => {
        lines.push(`  ${i + 1}. ${player.name}`);
      });
      lines.push('');
    }
  }

  return lines.join('\n').trim();
}

/**
 * Format a single check-in for WhatsApp sharing
 */
export function formatCheckinForWhatsApp(
  _name: string,
  dateStr: string,
  checkinData: Pick<CheckinData, 'playStyle' | 'timeRange'>
): string {
  const formattedDate = formatDateForSharing(dateStr);
  const lines: string[] = [];

  lines.push(`I'm checking in for tennis on ${formattedDate}!`);
  lines.push('');

  // Preference
  const prefLabel =
    checkinData.playStyle === 'singles'
      ? 'Singles only'
      : checkinData.playStyle === 'doubles'
        ? 'Doubles only'
        : 'Either singles or doubles';
  lines.push(`Preference: ${prefLabel}`);

  // Time if specified
  if (checkinData.timeRange) {
    const timeStr = formatTimeRange(checkinData.timeRange.start, checkinData.timeRange.end);
    if (timeStr) {
      lines.push(`Available: ${timeStr}`);
    }
  }

  return lines.join('\n');
}

/**
 * Format removal notification for WhatsApp
 */
export function formatRemovalForWhatsApp(_name: string, dateStr: string): string {
  const formattedDate = formatDateForSharing(dateStr);
  return `I'm no longer available for tennis on ${formattedDate}.`;
}

/**
 * Copy text to clipboard
 * @returns Promise that resolves to true if successful
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const success = document.execCommand('copy');
    document.body.removeChild(textArea);
    return success;
  } catch {
    return false;
  }
}

/**
 * Check if Web Share API is available
 */
export function canUseWebShare(): boolean {
  return typeof navigator !== 'undefined' && !!navigator.share;
}

/**
 * Share content using Web Share API
 */
export async function shareContent(data: {
  title?: string;
  text?: string;
  url?: string;
}): Promise<boolean> {
  if (!canUseWebShare()) {
    return false;
  }

  try {
    await navigator.share(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Generate invite message for new member
 */
export function generateInviteMessage(
  memberName: string,
  groupName: string,
  inviterName: string
): string {
  const lines: string[] = [];
  lines.push(`Hi ${memberName}!`);
  lines.push('');
  lines.push(`${inviterName} has added you to the ${groupName} tennis group.`);
  lines.push('');
  lines.push(
    'You can now check in for matches, see who else is playing, and coordinate with the group.'
  );
  lines.push('');
  lines.push('See you on the courts!');
  return lines.join('\n');
}

/**
 * Generate invite message with group URL and PIN
 */
export function generateInviteMessageWithLink(
  memberName: string,
  groupName: string,
  groupUrl: string,
  groupPin: string
): string {
  return `Hi ${memberName}! You've been added to ${groupName} tennis coordination.

Check in for upcoming matches here:
${groupUrl}

PIN: ${groupPin}

Just select your name and check in when you can play!`;
}

/**
 * Generate compact WhatsApp message for matches (no bold formatting)
 */
export function generateCompactWhatsAppMessage(
  matches: Match[],
  dateStr: string,
  notes: Record<string, string>,
  weatherInfo?: { description: string; tempMax: number }
): string {
  // Format date - compact (e.g., "Friday, Dec 13")
  const dateObj = new Date(dateStr + 'T00:00:00');
  const dateFormatted = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  let message = `${dateFormatted}\n`;
  let singlesCount = 0;
  let rotationCount = 0;

  for (const match of matches) {
    if (match.type === 'doubles') {
      const players = match.players.map((p) => p.name);
      message += `Doubles: ${players.join(', ')}\n`;

      // Add time window if available - compact format (just show first one)
      const times = match.players
        .filter((p) => p.timeRange)
        .map((p) => formatTimeRange(p.timeRange!.start, p.timeRange!.end));
      if (times.length > 0) {
        message += `${times[0]}\n`;
      }

      // Add note if exists
      const matchKey = `doubles-${match.number}`;
      if (notes[matchKey]) {
        message += `📝 ${notes[matchKey]}\n`;
      }
      message += '\n';
    } else if (match.type === 'singles') {
      singlesCount++;
      const players = match.players.map((p) => p.name);
      message += `Singles: ${players.join(', ')}\n`;

      // Check if this is a "provisional" singles - both flexible and at least one open to rotation
      const bothFlexible = match.players.every((p) => (p.playStyle || 'both') === 'both');
      const anyOpenToRotation = match.players.some((p) => p.allowRotation === true);
      if (bothFlexible && anyOpenToRotation) {
        message += `Open to more players\n`;
      }

      // Add time window if available - compact format
      const times = match.players
        .filter((p) => p.timeRange)
        .map((p) => formatTimeRange(p.timeRange!.start, p.timeRange!.end));
      if (times.length > 0) {
        message += `${times[0]}\n`;
      }

      // Add note if exists
      const matchKey = `singles-${singlesCount}`;
      if (notes[matchKey]) {
        message += `📝 ${notes[matchKey]}\n`;
      }
      message += '\n';
    } else if (match.type === 'singles-or-practice') {
      rotationCount++;
      message += `Rotation: ${match.players.map((p) => p.name).join(', ')}\n`;

      // Add time window if available - compact format
      const times = match.players
        .filter((p) => p.timeRange)
        .map((p) => formatTimeRange(p.timeRange!.start, p.timeRange!.end));
      if (times.length > 0) {
        message += `${times[0]}\n`;
      }

      // Add note if exists
      const matchKey = `rotation-${rotationCount}`;
      if (notes[matchKey]) {
        message += `📝 ${notes[matchKey]}\n`;
      }
      message += '\n';
    } else if (match.type === 'doubles-forming') {
      const players = match.players.map((p) => p.name);
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
        .filter((p) => p.timeRange)
        .map((p) => formatTimeRange(p.timeRange!.start, p.timeRange!.end));
      if (times.length > 0) {
        message += `${times[0]}\n`;
      }

      // Add note if exists
      const matchKey = 'doubles-forming-1';
      if (notes[matchKey]) {
        message += `📝 ${notes[matchKey]}\n`;
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
  }

  // Add standby list if any (on same line)
  const standbyMatches = matches.filter((m) => m.type === 'waiting');
  if (standbyMatches.length > 0) {
    const standbyPlayers = standbyMatches.flatMap((m) => m.players.map((p) => p.name));
    if (standbyPlayers.length > 0) {
      message += `Standby: ${standbyPlayers.join(', ')}\n`;
    }
  }

  // Add weather if available
  if (weatherInfo) {
    message += `${weatherInfo.description}, ${weatherInfo.tempMax}°F`;
  }

  return message.trim();
}
