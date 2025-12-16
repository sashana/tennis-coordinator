/**
 * Notification utilities
 *
 * This module handles notification message formatting and eligibility checks.
 */

import type { NotificationPreferences, PlayStyle } from '@/types';
import {
  normalizeName,
  formatDateForNotification,
  getPreferenceLabel,
  formatTimeRange,
} from './helpers';

/**
 * Check if a member is muted by the user
 */
export function isMemberMuted(memberName: string, prefs: NotificationPreferences): boolean {
  const mutedMembers = prefs.mutedMembers || [];
  return mutedMembers.some((m) => normalizeName(m) === normalizeName(memberName));
}

/**
 * Check if user should receive an activity notification
 */
export function shouldReceiveActivityNotification(
  userName: string,
  prefs: NotificationPreferences,
  actorName: string
): boolean {
  // Check if activity alerts are enabled
  if (!prefs.activityAlerts) {
    return false;
  }

  // Don't notify the actor themselves
  if (normalizeName(userName) === normalizeName(actorName)) {
    return false;
  }

  // Check if actor is muted
  if (isMemberMuted(actorName, prefs)) {
    return false;
  }

  return true;
}

/**
 * Check if user should receive a match notification
 */
export function shouldReceiveMatchNotification(
  _userName: string,
  prefs: NotificationPreferences
): boolean {
  return prefs.matchConfirmations === true;
}

/**
 * Format check-in notification message
 */
export function formatCheckinNotification(
  playerName: string,
  date: string,
  checkinData: {
    playStyle?: PlayStyle;
    timeStart?: string;
    timeEnd?: string;
    addedBy?: string;
  } = {}
): string {
  const formattedDate = formatDateForNotification(date);
  const details: string[] = [];

  if (checkinData.playStyle) {
    details.push(getPreferenceLabel(checkinData.playStyle));
  }

  if (checkinData.timeStart || checkinData.timeEnd) {
    const timeStr = formatTimeRange(checkinData.timeStart, checkinData.timeEnd);
    if (timeStr) {
      details.push(timeStr);
    }
  }

  let addedByStr = '';
  if (checkinData.addedBy && normalizeName(checkinData.addedBy) !== normalizeName(playerName)) {
    addedByStr = ` (added by ${checkinData.addedBy})`;
  }

  const detailsStr = details.length > 0 ? ` [${details.join(', ')}]` : '';
  return `🎾 ${playerName} checked in for ${formattedDate}${detailsStr}${addedByStr}`;
}

/**
 * Format removal notification message
 */
export function formatRemovalNotification(
  playerName: string,
  date: string,
  removedBy?: string
): string {
  const formattedDate = formatDateForNotification(date);

  let removedByStr = '';
  if (removedBy && normalizeName(removedBy) !== normalizeName(playerName)) {
    removedByStr = ` (by ${removedBy})`;
  }

  return `👋 ${playerName} is no longer available for ${formattedDate}${removedByStr}`;
}

/**
 * Format match formed notification message
 */
export function formatMatchFormedNotification(
  _playerName: string,
  date: string,
  matchType: 'doubles' | 'singles',
  teammates: string[]
): string {
  const formattedDate = formatDateForNotification(date);
  const matchLabel = matchType === 'doubles' ? 'Doubles' : 'Singles';
  return `✅ You're in ${matchLabel} for ${formattedDate} with ${teammates.join(', ')}`;
}

/**
 * Format match dissolved notification message
 */
export function formatMatchDissolvedNotification(
  _playerName: string,
  date: string,
  matchType: 'doubles' | 'singles',
  droppedPlayers: string[],
  remainingCount: number
): string {
  const formattedDate = formatDateForNotification(date);
  const matchLabel = matchType === 'doubles' ? 'Doubles' : 'Singles';
  const playersNeeded = (matchType === 'doubles' ? 4 : 2) - remainingCount;

  if (droppedPlayers.length > 0) {
    const droppedNames = droppedPlayers.join(', ');
    const neededText =
      playersNeeded === 1 ? 'Need 1 more player' : `Need ${playersNeeded} more players`;
    return `⚠️ Your ${matchLabel} for ${formattedDate} is no longer confirmed - ${droppedNames} dropped out. ${neededText}.`;
  } else {
    return `⚠️ Your ${matchLabel} for ${formattedDate} is no longer confirmed.`;
  }
}

/**
 * Format member added notification message
 */
export function formatMemberAddedNotification(memberName: string, addedBy: string): string {
  return `👤 ${memberName} was added to the group by ${addedBy}`;
}

/**
 * Format member removed notification message
 */
export function formatMemberRemovedNotification(memberName: string, removedBy: string): string {
  return `🚫 ${memberName} was removed from the group by ${removedBy}`;
}

/**
 * Create notification data object
 */
export function createNotificationData(
  type: string,
  message: string,
  extraData: Record<string, unknown> = {}
): {
  message: string;
  timestamp: number;
  read: boolean;
  type: string;
} & Record<string, unknown> {
  return {
    message,
    timestamp: Date.now(),
    read: false,
    type,
    ...extraData,
  };
}
