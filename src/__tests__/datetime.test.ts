import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getTimeAgo,
  getOrdinalSuffix,
  getWeekdayName,
  getMonthName,
  getDaysInMonth,
  getQuarter,
  isValidDateString,
  parseDateString,
  formatDateWithYear,
  formatDateShort,
  isSameDay,
  isToday,
  getDaysBetween,
  formatDuration,
  compareTimestamps,
  compareTimestampsDesc,
} from '../utils/datetime';

describe('getTimeAgo', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns "Just now" for timestamps less than a minute ago', () => {
    const now = Date.now();
    vi.setSystemTime(now);
    expect(getTimeAgo(now)).toBe('Just now');
    expect(getTimeAgo(now - 30000)).toBe('Just now'); // 30 seconds ago
  });

  it('returns minutes ago for timestamps 1-59 minutes ago', () => {
    const now = Date.now();
    vi.setSystemTime(now);
    expect(getTimeAgo(now - 60000)).toBe('1 minute ago');
    expect(getTimeAgo(now - 120000)).toBe('2 minutes ago');
    expect(getTimeAgo(now - 3540000)).toBe('59 minutes ago');
  });

  it('returns hours ago for timestamps 1-23 hours ago', () => {
    const now = Date.now();
    vi.setSystemTime(now);
    expect(getTimeAgo(now - 3600000)).toBe('1 hour ago');
    expect(getTimeAgo(now - 7200000)).toBe('2 hours ago');
    expect(getTimeAgo(now - 82800000)).toBe('23 hours ago');
  });

  it('returns days ago for timestamps 24+ hours ago', () => {
    const now = Date.now();
    vi.setSystemTime(now);
    expect(getTimeAgo(now - 86400000)).toBe('1 day ago');
    expect(getTimeAgo(now - 172800000)).toBe('2 days ago');
    expect(getTimeAgo(now - 604800000)).toBe('7 days ago');
  });
});

describe('getOrdinalSuffix', () => {
  it('returns "st" for 1, 21, 31', () => {
    expect(getOrdinalSuffix(1)).toBe('st');
    expect(getOrdinalSuffix(21)).toBe('st');
    expect(getOrdinalSuffix(31)).toBe('st');
  });

  it('returns "nd" for 2, 22', () => {
    expect(getOrdinalSuffix(2)).toBe('nd');
    expect(getOrdinalSuffix(22)).toBe('nd');
  });

  it('returns "rd" for 3, 23', () => {
    expect(getOrdinalSuffix(3)).toBe('rd');
    expect(getOrdinalSuffix(23)).toBe('rd');
  });

  it('returns "th" for 4-20 and other numbers', () => {
    expect(getOrdinalSuffix(4)).toBe('th');
    expect(getOrdinalSuffix(11)).toBe('th');
    expect(getOrdinalSuffix(12)).toBe('th');
    expect(getOrdinalSuffix(13)).toBe('th');
    expect(getOrdinalSuffix(14)).toBe('th');
    expect(getOrdinalSuffix(20)).toBe('th');
    expect(getOrdinalSuffix(24)).toBe('th');
  });
});

describe('getWeekdayName', () => {
  it('returns short weekday name by default', () => {
    const monday = new Date('2024-01-15T12:00:00');
    expect(getWeekdayName(monday)).toBe('Mon');
  });

  it('returns long weekday name when specified', () => {
    const monday = new Date('2024-01-15T12:00:00');
    expect(getWeekdayName(monday, 'long')).toBe('Monday');
  });
});

describe('getMonthName', () => {
  it('returns short month name by default', () => {
    const january = new Date('2024-01-15T12:00:00');
    expect(getMonthName(january)).toBe('Jan');
  });

  it('returns long month name when specified', () => {
    const january = new Date('2024-01-15T12:00:00');
    expect(getMonthName(january, 'long')).toBe('January');
  });
});

describe('getDaysInMonth', () => {
  it('returns correct days for each month', () => {
    expect(getDaysInMonth(2024, 0)).toBe(31); // January
    expect(getDaysInMonth(2024, 1)).toBe(29); // February (leap year)
    expect(getDaysInMonth(2023, 1)).toBe(28); // February (non-leap year)
    expect(getDaysInMonth(2024, 3)).toBe(30); // April
    expect(getDaysInMonth(2024, 11)).toBe(31); // December
  });
});

describe('getQuarter', () => {
  it('returns correct quarter for each month', () => {
    expect(getQuarter(new Date('2024-01-15'))).toBe(1);
    expect(getQuarter(new Date('2024-03-15'))).toBe(1);
    expect(getQuarter(new Date('2024-04-15'))).toBe(2);
    expect(getQuarter(new Date('2024-06-15'))).toBe(2);
    expect(getQuarter(new Date('2024-07-15'))).toBe(3);
    expect(getQuarter(new Date('2024-09-15'))).toBe(3);
    expect(getQuarter(new Date('2024-10-15'))).toBe(4);
    expect(getQuarter(new Date('2024-12-15'))).toBe(4);
  });
});

describe('isValidDateString', () => {
  it('returns true for valid YYYY-MM-DD strings', () => {
    expect(isValidDateString('2024-01-15')).toBe(true);
    expect(isValidDateString('2024-12-31')).toBe(true);
    expect(isValidDateString('2023-02-28')).toBe(true);
  });

  it('returns false for invalid formats', () => {
    expect(isValidDateString('01-15-2024')).toBe(false);
    expect(isValidDateString('2024/01/15')).toBe(false);
    expect(isValidDateString('Jan 15, 2024')).toBe(false);
    expect(isValidDateString('')).toBe(false);
    expect(isValidDateString('invalid')).toBe(false);
  });

  it('returns false for invalid dates', () => {
    expect(isValidDateString('2024-13-01')).toBe(false); // Invalid month
    expect(isValidDateString('2024-02-30')).toBe(false); // Invalid day
  });
});

describe('parseDateString', () => {
  it('returns Date object for valid date strings', () => {
    const result = parseDateString('2024-01-15');
    expect(result).toBeInstanceOf(Date);
    expect(result?.getFullYear()).toBe(2024);
    expect(result?.getMonth()).toBe(0); // January
    expect(result?.getDate()).toBe(15);
  });

  it('returns null for invalid date strings', () => {
    expect(parseDateString('invalid')).toBeNull();
    expect(parseDateString('')).toBeNull();
    expect(parseDateString('2024-13-01')).toBeNull();
  });
});

describe('formatDateWithYear', () => {
  it('formats date string with year', () => {
    const result = formatDateWithYear('2024-01-15');
    expect(result).toMatch(/Mon/);
    expect(result).toMatch(/Jan/);
    expect(result).toMatch(/15/);
    expect(result).toMatch(/2024/);
  });

  it('returns original string if invalid', () => {
    expect(formatDateWithYear('invalid')).toBe('invalid');
  });
});

describe('formatDateShort', () => {
  it('formats date string without year', () => {
    const result = formatDateShort('2024-01-15');
    expect(result).toMatch(/Mon/);
    expect(result).toMatch(/Jan/);
    expect(result).toMatch(/15/);
  });

  it('returns original string if invalid', () => {
    expect(formatDateShort('invalid')).toBe('invalid');
  });
});

describe('isSameDay', () => {
  it('returns true for same day', () => {
    const date1 = new Date('2024-01-15T10:00:00');
    const date2 = new Date('2024-01-15T18:00:00');
    expect(isSameDay(date1, date2)).toBe(true);
  });

  it('returns false for different days', () => {
    const date1 = new Date('2024-01-15T10:00:00');
    const date2 = new Date('2024-01-16T10:00:00');
    expect(isSameDay(date1, date2)).toBe(false);
  });
});

describe('isToday', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns true for today', () => {
    vi.setSystemTime(new Date('2024-01-15T14:00:00'));
    expect(isToday(new Date('2024-01-15T10:00:00'))).toBe(true);
  });

  it('returns false for other days', () => {
    vi.setSystemTime(new Date('2024-01-15T14:00:00'));
    expect(isToday(new Date('2024-01-14T10:00:00'))).toBe(false);
    expect(isToday(new Date('2024-01-16T10:00:00'))).toBe(false);
  });
});

describe('getDaysBetween', () => {
  it('returns positive number when date2 > date1', () => {
    const date1 = new Date('2024-01-15');
    const date2 = new Date('2024-01-20');
    expect(getDaysBetween(date1, date2)).toBe(5);
  });

  it('returns negative number when date1 > date2', () => {
    const date1 = new Date('2024-01-20');
    const date2 = new Date('2024-01-15');
    expect(getDaysBetween(date1, date2)).toBe(-5);
  });

  it('returns 0 for same day', () => {
    const date1 = new Date('2024-01-15T10:00:00');
    const date2 = new Date('2024-01-15T18:00:00');
    expect(getDaysBetween(date1, date2)).toBe(0);
  });
});

describe('formatDuration', () => {
  it('formats seconds', () => {
    expect(formatDuration(1000)).toBe('1 second');
    expect(formatDuration(5000)).toBe('5 seconds');
  });

  it('formats minutes', () => {
    expect(formatDuration(60000)).toBe('1 minute');
    expect(formatDuration(120000)).toBe('2 minutes');
  });

  it('formats hours', () => {
    expect(formatDuration(3600000)).toBe('1 hour');
    expect(formatDuration(7200000)).toBe('2 hours');
  });

  it('formats days', () => {
    expect(formatDuration(86400000)).toBe('1 day');
    expect(formatDuration(172800000)).toBe('2 days');
  });
});

describe('compareTimestamps', () => {
  it('sorts timestamps in ascending order', () => {
    const timestamps = [3000, 1000, 2000];
    timestamps.sort(compareTimestamps);
    expect(timestamps).toEqual([1000, 2000, 3000]);
  });
});

describe('compareTimestampsDesc', () => {
  it('sorts timestamps in descending order', () => {
    const timestamps = [1000, 3000, 2000];
    timestamps.sort(compareTimestampsDesc);
    expect(timestamps).toEqual([3000, 2000, 1000]);
  });
});
