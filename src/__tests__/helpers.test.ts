import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  normalizeName,
  formatTimeRange,
  formatTime,
  formatDate,
  formatDateForNotification,
  getTodayDate,
  getDateOffset,
  isSameName,
  getPreferenceLabel,
  isValidEmail,
  isValidPhone,
  cleanPhoneNumber,
} from '../utils/helpers';
import { isMemberMuted } from '../utils/notifications';

describe('normalizeName', () => {
  it('converts to lowercase', () => {
    expect(normalizeName('ALICE')).toBe('alice');
    expect(normalizeName('Bob')).toBe('bob');
  });

  it('trims whitespace', () => {
    expect(normalizeName('  alice  ')).toBe('alice');
  });

  it('collapses multiple spaces', () => {
    expect(normalizeName('John   Doe')).toBe('john doe');
  });

  it('handles combined transformations', () => {
    expect(normalizeName('  JOHN   DOE  ')).toBe('john doe');
  });
});

describe('formatTimeRange', () => {
  it('returns empty string for no times', () => {
    expect(formatTimeRange()).toBe('');
    expect(formatTimeRange(undefined, undefined)).toBe('');
  });

  it('formats full range with 12h conversion', () => {
    expect(formatTimeRange('14:00', '16:00')).toBe('2:00PM-4:00PM');
    expect(formatTimeRange('09:30', '12:00')).toBe('9:30AM-12:00PM');
  });

  it('handles start only (from X)', () => {
    expect(formatTimeRange('14:00', undefined)).toBe('from 2:00PM');
  });

  it('handles end only (until X)', () => {
    expect(formatTimeRange(undefined, '12:00')).toBe('until 12:00PM');
  });

  it('handles midnight and noon correctly', () => {
    expect(formatTimeRange('00:00', '12:00')).toBe('12:00AM-12:00PM');
    expect(formatTimeRange('12:00', '23:59')).toBe('12:00PM-11:59PM');
  });
});

describe('formatTime', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows time only for today', () => {
    const now = new Date('2024-01-15T14:00:00');
    vi.setSystemTime(now);

    const todayTimestamp = new Date('2024-01-15T10:30:00').getTime();
    const result = formatTime(todayTimestamp);

    expect(result).toMatch(/10:30\s*AM/);
  });

  it('shows date and time for other days', () => {
    const now = new Date('2024-01-15T14:00:00');
    vi.setSystemTime(now);

    const yesterdayTimestamp = new Date('2024-01-14T10:30:00').getTime();
    const result = formatTime(yesterdayTimestamp);

    expect(result).toMatch(/Jan 14/);
    expect(result).toMatch(/10:30\s*AM/);
  });
});

describe('formatDate', () => {
  it('formats date string correctly', () => {
    const result = formatDate('2024-01-15');
    expect(result).toMatch(/Mon/);
    expect(result).toMatch(/Jan/);
    expect(result).toMatch(/15/);
  });
});

describe('formatDateForNotification', () => {
  it('formats date string for notifications', () => {
    const result = formatDateForNotification('2024-01-15');
    expect(result).toMatch(/Mon/);
    expect(result).toMatch(/Jan/);
    expect(result).toMatch(/15/);
  });
});

describe('getTodayDate', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns today date in YYYY-MM-DD format', () => {
    vi.setSystemTime(new Date('2024-01-15T14:00:00'));
    expect(getTodayDate()).toBe('2024-01-15');
  });
});

describe('getDateOffset', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns correct date for positive offset', () => {
    vi.setSystemTime(new Date('2024-01-15T14:00:00'));
    expect(getDateOffset(1)).toBe('2024-01-16');
    expect(getDateOffset(7)).toBe('2024-01-22');
  });

  it('returns correct date for negative offset', () => {
    vi.setSystemTime(new Date('2024-01-15T14:00:00'));
    expect(getDateOffset(-1)).toBe('2024-01-14');
  });

  it('returns today for zero offset', () => {
    vi.setSystemTime(new Date('2024-01-15T14:00:00'));
    expect(getDateOffset(0)).toBe('2024-01-15');
  });
});

describe('isSameName', () => {
  it('returns true for identical names', () => {
    expect(isSameName('Alice', 'Alice')).toBe(true);
  });

  it('returns true for case-insensitive match', () => {
    expect(isSameName('Alice', 'ALICE')).toBe(true);
    expect(isSameName('alice', 'Alice')).toBe(true);
  });

  it('returns true ignoring whitespace differences', () => {
    expect(isSameName('  Alice  ', 'Alice')).toBe(true);
    expect(isSameName('John  Doe', 'John Doe')).toBe(true);
  });

  it('returns false for different names', () => {
    expect(isSameName('Alice', 'Bob')).toBe(false);
  });
});

describe('isMemberMuted', () => {
  it('returns false when no muted members', () => {
    expect(isMemberMuted('Alice', {})).toBe(false);
    expect(isMemberMuted('Alice', { mutedMembers: [] })).toBe(false);
  });

  it('returns true when member is muted', () => {
    expect(isMemberMuted('Alice', { mutedMembers: ['alice'] })).toBe(true);
    expect(isMemberMuted('ALICE', { mutedMembers: ['alice'] })).toBe(true);
  });

  it('returns false when member is not muted', () => {
    expect(isMemberMuted('Alice', { mutedMembers: ['bob'] })).toBe(false);
  });

  it('handles case-insensitive matching', () => {
    expect(isMemberMuted('Alice', { mutedMembers: ['ALICE'] })).toBe(true);
  });
});

describe('getPreferenceLabel', () => {
  it('returns correct labels', () => {
    expect(getPreferenceLabel('singles')).toBe('Singles Only');
    expect(getPreferenceLabel('doubles')).toBe('Doubles Only');
    expect(getPreferenceLabel('both')).toBe('Either');
  });

  it('defaults to Either for unknown values', () => {
    expect(getPreferenceLabel(undefined as unknown as 'both')).toBe('Either');
  });
});

describe('isValidEmail', () => {
  it('returns true for valid email formats', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
    expect(isValidEmail('user+tag@email.org')).toBe(true);
    expect(isValidEmail('firstname.lastname@company.com')).toBe(true);
  });

  it('returns false for invalid email formats', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail('notanemail')).toBe(false);
    expect(isValidEmail('missing@domain')).toBe(false);
    expect(isValidEmail('@nodomain.com')).toBe(false);
    expect(isValidEmail('user@.com')).toBe(false);
    expect(isValidEmail('user name@domain.com')).toBe(false);
  });
});

describe('isValidPhone', () => {
  it('returns true for valid phone numbers (10+ digits)', () => {
    expect(isValidPhone('5551234567')).toBe(true);
    expect(isValidPhone('555-123-4567')).toBe(true);
    expect(isValidPhone('(555) 123-4567')).toBe(true);
    expect(isValidPhone('+1 555 123 4567')).toBe(true);
    expect(isValidPhone('555.123.4567')).toBe(true);
  });

  it('returns false for invalid phone numbers', () => {
    expect(isValidPhone('')).toBe(false);
    expect(isValidPhone('123')).toBe(false);
    expect(isValidPhone('123456789')).toBe(false); // Only 9 digits
    expect(isValidPhone('abcdefghij')).toBe(false);
  });
});

describe('cleanPhoneNumber', () => {
  it('removes formatting characters', () => {
    expect(cleanPhoneNumber('555-123-4567')).toBe('5551234567');
    expect(cleanPhoneNumber('(555) 123-4567')).toBe('5551234567');
    expect(cleanPhoneNumber('555 123 4567')).toBe('5551234567');
    expect(cleanPhoneNumber('+1 (555) 123-4567')).toBe('+15551234567');
  });

  it('preserves plus sign for international', () => {
    expect(cleanPhoneNumber('+15551234567')).toBe('+15551234567');
  });
});
