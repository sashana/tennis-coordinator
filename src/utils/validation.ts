/**
 * Validation utilities
 */

import type { PlayStyle, CheckinData, TimeRange, GroupSettings } from '@/types';
import { normalizeName } from './helpers';
import { isValidDateString } from './datetime';

/**
 * Validation result type
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validate play style
 */
export function isValidPlayStyle(value: unknown): value is PlayStyle {
  return value === 'singles' || value === 'doubles' || value === 'both';
}

/**
 * Validate time format (HH:MM in 24h)
 */
export function isValidTimeFormat(time: string): boolean {
  const regex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
  return regex.test(time);
}

/**
 * Validate time range
 */
export function validateTimeRange(timeRange?: TimeRange): ValidationResult {
  const errors: string[] = [];

  if (!timeRange) {
    return { valid: true, errors: [] };
  }

  if (timeRange.start && !isValidTimeFormat(timeRange.start)) {
    errors.push('Invalid start time format');
  }

  if (timeRange.end && !isValidTimeFormat(timeRange.end)) {
    errors.push('Invalid end time format');
  }

  // Check that start is before end
  if (timeRange.start && timeRange.end) {
    const [startH, startM] = timeRange.start.split(':').map(Number);
    const [endH, endM] = timeRange.end.split(':').map(Number);
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    if (startMinutes >= endMinutes) {
      errors.push('Start time must be before end time');
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validate player name
 */
export function validatePlayerName(name: string): ValidationResult {
  const errors: string[] = [];

  if (!name || name.trim().length === 0) {
    errors.push('Name is required');
    return { valid: false, errors };
  }

  const normalized = normalizeName(name);

  if (normalized.length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  if (normalized.length > 50) {
    errors.push('Name must be less than 50 characters');
  }

  // Check for invalid characters
  if (!/^[a-zA-Z\s\-'.]+$/.test(name.trim())) {
    errors.push('Name contains invalid characters');
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validate check-in data
 */
export function validateCheckinData(data: Partial<CheckinData>): ValidationResult {
  const errors: string[] = [];

  // Name validation
  const nameResult = validatePlayerName(data.name || '');
  if (!nameResult.valid) {
    errors.push(...nameResult.errors);
  }

  // Play style validation
  if (data.playStyle && !isValidPlayStyle(data.playStyle)) {
    errors.push('Invalid play style');
  }

  // Time range validation
  if (data.timeRange) {
    const timeResult = validateTimeRange(data.timeRange);
    if (!timeResult.valid) {
      errors.push(...timeResult.errors);
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validate member contact info
 */
export function validateMemberContact(phone?: string, email?: string): ValidationResult {
  const errors: string[] = [];

  if (phone) {
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      errors.push('Phone number must have at least 10 digits');
    }
  }

  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('Invalid email format');
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validate group settings
 */
export function validateGroupSettings(settings: Partial<GroupSettings>): ValidationResult {
  const errors: string[] = [];

  if (!settings.groupName || settings.groupName.trim().length === 0) {
    errors.push('Group name is required');
  }

  if (settings.groupPin) {
    if (!/^\d{4,8}$/.test(settings.groupPin)) {
      errors.push('Group PIN must be 4-8 digits');
    }
  }

  if (settings.adminPin) {
    if (!/^\d{4,8}$/.test(settings.adminPin)) {
      errors.push('Admin PIN must be 4-8 digits');
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validate date string
 */
export function validateDateString(dateStr: string): ValidationResult {
  const errors: string[] = [];

  if (!dateStr) {
    errors.push('Date is required');
  } else if (!isValidDateString(dateStr)) {
    errors.push('Invalid date format (expected YYYY-MM-DD)');
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Check if name already exists in list (case-insensitive)
 */
export function isDuplicateName(
  name: string,
  existingNames: string[],
  excludeIndex?: number
): boolean {
  const normalized = normalizeName(name);
  return existingNames.some(
    (existing, i) => i !== excludeIndex && normalizeName(existing) === normalized
  );
}

/**
 * Validate that a name is unique in a list
 */
export function validateUniqueName(
  name: string,
  existingNames: string[],
  excludeIndex?: number
): ValidationResult {
  const errors: string[] = [];

  if (isDuplicateName(name, existingNames, excludeIndex)) {
    errors.push('This name already exists');
  }

  return { valid: errors.length === 0, errors };
}
