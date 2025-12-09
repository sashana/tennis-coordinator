/**
 * Utility helper functions
 */

import type { PlayStyle, PlayStyleLabel, TimeRange } from '@/types';

/**
 * Normalize a name for comparison (lowercase, trimmed, collapsed spaces)
 */
export function normalizeName(name: string): string {
  return name.toLowerCase().trim().replace(/\s+/g, ' ');
}

/**
 * Get display label for play style preference
 */
export function getPreferenceLabel(preference: PlayStyle): PlayStyleLabel {
  switch (preference) {
    case 'singles':
      return 'Singles Only';
    case 'doubles':
      return 'Doubles Only';
    case 'both':
      return 'Either';
    default:
      return 'Either';
  }
}

/**
 * Format time range for display
 */
export function formatTimeRange(start?: string, end?: string): string {
  if (start && end) {
    return `${start} - ${end}`;
  } else if (start) {
    return `From ${start}`;
  } else if (end) {
    return `Until ${end}`;
  }
  return '';
}

/**
 * Format date string for display
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format date string for notifications
 */
export function formatDateForNotification(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format timestamp for display
 */
export function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);

  if (diffMins < 1) {
    return 'Just now';
  } else if (diffMins < 60) {
    return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }
}

/**
 * Get today's date as YYYY-MM-DD string
 */
export function getTodayDate(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

/**
 * Get date string for a specific day offset from today
 */
export function getDateOffset(daysOffset: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString().split('T')[0];
}

/**
 * Check if two names are the same (case-insensitive)
 */
export function isSameName(name1: string, name2: string): boolean {
  return normalizeName(name1) === normalizeName(name2);
}

/**
 * Check if time ranges overlap
 */
export function timeRangesOverlap(
  range1?: TimeRange,
  range2?: TimeRange
): boolean {
  // If either player has no time restriction, they're compatible
  if (!range1 || !range2) return true;
  if ((!range1.start && !range1.end) || (!range2.start && !range2.end)) {
    return true;
  }

  // Convert times to comparable format (24-hour numeric)
  const parseTime = (timeStr: string): number => {
    const match = timeStr.match(/(\d+):?(\d*)?\s*(AM|PM)?/i);
    if (!match) return 0;

    let hours = parseInt(match[1]);
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const meridiem = match[3]?.toUpperCase();

    if (meridiem === 'PM' && hours !== 12) hours += 12;
    if (meridiem === 'AM' && hours === 12) hours = 0;

    return hours * 60 + minutes;
  };

  const start1 = range1.start ? parseTime(range1.start) : 0;
  const end1 = range1.end ? parseTime(range1.end) : 24 * 60;
  const start2 = range2.start ? parseTime(range2.start) : 0;
  const end2 = range2.end ? parseTime(range2.end) : 24 * 60;

  // Check for overlap
  return start1 < end2 && start2 < end1;
}

/**
 * Clean phone number for SMS URL
 */
export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/[\s\-\(\)]/g, '');
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number format (basic check)
 */
export function isValidPhone(phone: string): boolean {
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly.length >= 10;
}

/**
 * Escape HTML to prevent XSS
 */
export function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (this: unknown, ...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
