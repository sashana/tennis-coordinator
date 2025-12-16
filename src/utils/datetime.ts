/**
 * Date and time utility functions
 */

/**
 * Get relative time description (e.g., "5 minutes ago")
 */
export function getTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) {
    return 'Just now';
  }
  if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
  if (hours < 24) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  return `${days} day${days > 1 ? 's' : ''} ago`;
}

/**
 * Get ordinal suffix for a day number (1st, 2nd, 3rd, etc.)
 */
export function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) {
    return 'th';
  }
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

/**
 * Get weekday name from date
 */
export function getWeekdayName(date: Date, format: 'short' | 'long' = 'short'): string {
  return date.toLocaleDateString('en-US', { weekday: format });
}

/**
 * Get month name from date
 */
export function getMonthName(date: Date, format: 'short' | 'long' = 'short'): string {
  return date.toLocaleDateString('en-US', { month: format });
}

/**
 * Get number of days in a month
 */
export function getDaysInMonth(year: number, month: number): number {
  // month is 0-indexed (0 = January)
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Get quarter of the year (1-4) from a date
 */
export function getQuarter(date: Date): number {
  return Math.floor(date.getMonth() / 3) + 1;
}

/**
 * Check if a date string is valid (YYYY-MM-DD format)
 */
export function isValidDateString(dateStr: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateStr)) {
    return false;
  }

  const [year, month, day] = dateStr.split('-').map(Number);

  // Check month is valid (1-12)
  if (month < 1 || month > 12) {
    return false;
  }

  // Check day is valid for the month
  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) {
    return false;
  }

  const date = new Date(dateStr + 'T12:00:00');
  return !isNaN(date.getTime());
}

/**
 * Parse a date string into Date object (YYYY-MM-DD format)
 * Returns null if invalid
 */
export function parseDateString(dateStr: string): Date | null {
  if (!isValidDateString(dateStr)) {
    return null;
  }
  return new Date(dateStr + 'T12:00:00');
}

/**
 * Format date with year (e.g., "Mon, Jan 15, 2024")
 */
export function formatDateWithYear(dateStr: string): string {
  const date = parseDateString(dateStr);
  if (!date) {
    return dateStr;
  }

  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format date for display (e.g., "Mon, Jan 15")
 */
export function formatDateShort(dateStr: string): string {
  const date = parseDateString(dateStr);
  if (!date) {
    return dateStr;
  }

  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Check if two dates are the same day
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Check if a date is today
 */
export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

/**
 * Get days between two dates (positive if date2 > date1)
 */
export function getDaysBetween(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000;
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return Math.round((d2.getTime() - d1.getTime()) / oneDay);
}

/**
 * Format duration in milliseconds to human-readable string
 */
export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''}`;
  }
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  }
  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  }
  return `${seconds} second${seconds !== 1 ? 's' : ''}`;
}

/**
 * Compare two timestamps for sorting (ascending)
 */
export function compareTimestamps(a: number, b: number): number {
  return a - b;
}

/**
 * Compare two timestamps for sorting (descending)
 */
export function compareTimestampsDesc(a: number, b: number): number {
  return b - a;
}
