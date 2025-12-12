import { describe, it, expect } from 'vitest';
import {
  isValidPlayStyle,
  isValidTimeFormat,
  validateTimeRange,
  validatePlayerName,
  validateCheckinData,
  validateMemberContact,
  validateGroupSettings,
  validateDateString,
  isDuplicateName,
  validateUniqueName,
} from '../utils/validation';
import type { TimeRange } from '../types';

describe('isValidPlayStyle', () => {
  it('returns true for valid play styles', () => {
    expect(isValidPlayStyle('singles')).toBe(true);
    expect(isValidPlayStyle('doubles')).toBe(true);
    expect(isValidPlayStyle('both')).toBe(true);
  });

  it('returns false for invalid values', () => {
    expect(isValidPlayStyle('invalid')).toBe(false);
    expect(isValidPlayStyle('')).toBe(false);
    expect(isValidPlayStyle(null)).toBe(false);
    expect(isValidPlayStyle(undefined)).toBe(false);
  });
});

describe('isValidTimeFormat', () => {
  it('accepts valid 24h time formats', () => {
    expect(isValidTimeFormat('09:00')).toBe(true);
    expect(isValidTimeFormat('14:30')).toBe(true);
    expect(isValidTimeFormat('23:59')).toBe(true);
    expect(isValidTimeFormat('0:00')).toBe(true);
  });

  it('rejects invalid formats', () => {
    expect(isValidTimeFormat('25:00')).toBe(false);
    expect(isValidTimeFormat('12:60')).toBe(false);
    expect(isValidTimeFormat('12:00 PM')).toBe(false);
    expect(isValidTimeFormat('invalid')).toBe(false);
  });
});

describe('validateTimeRange', () => {
  it('accepts empty/undefined time range', () => {
    expect(validateTimeRange(undefined).valid).toBe(true);
    expect(validateTimeRange({} as TimeRange).valid).toBe(true);
  });

  it('validates time formats', () => {
    const result = validateTimeRange({ start: '25:00', end: '14:00' });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Invalid start time format');
  });

  it('validates start is before end', () => {
    const result = validateTimeRange({ start: '16:00', end: '14:00' });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Start time must be before end time');
  });

  it('accepts valid time ranges', () => {
    const result = validateTimeRange({ start: '09:00', end: '17:00' });
    expect(result.valid).toBe(true);
  });
});

describe('validatePlayerName', () => {
  it('requires name', () => {
    const result = validatePlayerName('');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Name is required');
  });

  it('requires minimum length', () => {
    const result = validatePlayerName('A');
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('at least 2 characters'))).toBe(true);
  });

  it('rejects names that are too long', () => {
    const longName = 'A'.repeat(51);
    const result = validatePlayerName(longName);
    expect(result.valid).toBe(false);
  });

  it('accepts valid names', () => {
    expect(validatePlayerName('John Doe').valid).toBe(true);
    expect(validatePlayerName("O'Brien").valid).toBe(true);
    expect(validatePlayerName('Mary-Jane').valid).toBe(true);
  });
});

describe('validateCheckinData', () => {
  it('validates name', () => {
    const result = validateCheckinData({ name: '' });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Name is required');
  });

  it('validates play style', () => {
    const result = validateCheckinData({
      name: 'Alice',
      playStyle: 'invalid' as 'singles',
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Invalid play style');
  });

  it('validates time range', () => {
    const result = validateCheckinData({
      name: 'Alice',
      playStyle: 'both',
      timeRange: { start: '18:00', end: '14:00' },
    });
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('Start time'))).toBe(true);
  });

  it('accepts valid checkin data', () => {
    const result = validateCheckinData({
      name: 'Alice',
      playStyle: 'doubles',
      timeRange: { start: '14:00', end: '18:00' },
    });
    expect(result.valid).toBe(true);
  });
});

describe('validateMemberContact', () => {
  it('validates phone number length', () => {
    const result = validateMemberContact('123', undefined);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('10 digits'))).toBe(true);
  });

  it('validates email format', () => {
    const result = validateMemberContact(undefined, 'invalid-email');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Invalid email format');
  });

  it('accepts valid contact info', () => {
    const result = validateMemberContact('(555) 123-4567', 'test@example.com');
    expect(result.valid).toBe(true);
  });

  it('accepts partial contact info', () => {
    expect(validateMemberContact('5551234567', undefined).valid).toBe(true);
    expect(validateMemberContact(undefined, 'test@example.com').valid).toBe(true);
  });
});

describe('validateGroupSettings', () => {
  it('requires group name', () => {
    const result = validateGroupSettings({});
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Group name is required');
  });

  it('validates PIN format', () => {
    const result = validateGroupSettings({
      groupName: 'Test Group',
      groupPin: '12', // Too short
    });
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('4-8 digits'))).toBe(true);
  });

  it('accepts valid settings', () => {
    const result = validateGroupSettings({
      groupName: 'TTMD',
      groupPin: '1234',
      adminPin: '5678',
    });
    expect(result.valid).toBe(true);
  });
});

describe('validateDateString', () => {
  it('requires date', () => {
    const result = validateDateString('');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Date is required');
  });

  it('validates date format', () => {
    const result = validateDateString('01-15-2024');
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('Invalid date format'))).toBe(true);
  });

  it('accepts valid dates', () => {
    expect(validateDateString('2024-01-15').valid).toBe(true);
  });
});

describe('isDuplicateName', () => {
  it('detects duplicates case-insensitively', () => {
    const names = ['Alice', 'Bob', 'Charlie'];
    expect(isDuplicateName('alice', names)).toBe(true);
    expect(isDuplicateName('ALICE', names)).toBe(true);
  });

  it('returns false for unique names', () => {
    const names = ['Alice', 'Bob'];
    expect(isDuplicateName('Charlie', names)).toBe(false);
  });

  it('respects excludeIndex', () => {
    const names = ['Alice', 'Bob'];
    expect(isDuplicateName('Alice', names, 0)).toBe(false); // Exclude self
    expect(isDuplicateName('Alice', names, 1)).toBe(true); // Not self
  });
});

describe('validateUniqueName', () => {
  it('fails for duplicates', () => {
    const result = validateUniqueName('Alice', ['Alice', 'Bob']);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('This name already exists');
  });

  it('passes for unique names', () => {
    const result = validateUniqueName('Charlie', ['Alice', 'Bob']);
    expect(result.valid).toBe(true);
  });
});
