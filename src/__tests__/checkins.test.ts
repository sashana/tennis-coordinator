import { describe, it, expect } from 'vitest';
import {
  findCheckinByName,
  findCheckinIndex,
  canPlayerCheckin,
  buildCheckinData,
  addCheckin,
  removeCheckinByName,
  removeCheckinByIndex,
  updateCheckin,
  getCheckinSummary,
  countByPlayStyle,
  filterByPlayStyle,
  sortCheckinsByTimestamp,
  sortCheckinsByName,
  getCheckinsWithTimeRestrictions,
  getGuestCheckins,
  getMemberCheckins,
  getUniquePlayerNames,
  mergeCheckins,
  cleanCheckins,
  isSessionUserCheckedIn,
  shouldAutoExpandForm,
} from '../utils/checkins';
import type { CheckinData } from '../types';

const createCheckin = (
  name: string,
  playStyle: 'singles' | 'doubles' | 'both' = 'both',
  timestamp = Date.now()
): CheckinData => ({
  name,
  playStyle,
  timestamp,
});

describe('findCheckinByName', () => {
  it('finds checkin case-insensitively', () => {
    const checkins = [createCheckin('Alice'), createCheckin('Bob')];
    const result = findCheckinByName('alice', checkins);
    expect(result?.name).toBe('Alice');
  });

  it('returns null if not found', () => {
    const checkins = [createCheckin('Alice')];
    expect(findCheckinByName('Bob', checkins)).toBeNull();
  });
});

describe('findCheckinIndex', () => {
  it('finds index case-insensitively', () => {
    const checkins = [createCheckin('Alice'), createCheckin('Bob')];
    expect(findCheckinIndex('bob', checkins)).toBe(1);
  });

  it('returns -1 if not found', () => {
    const checkins = [createCheckin('Alice')];
    expect(findCheckinIndex('Bob', checkins)).toBe(-1);
  });
});

describe('canPlayerCheckin', () => {
  it('returns true if not checked in', () => {
    const checkins = [createCheckin('Alice')];
    expect(canPlayerCheckin('Bob', checkins)).toBe(true);
  });

  it('returns false if already checked in', () => {
    const checkins = [createCheckin('Alice')];
    expect(canPlayerCheckin('Alice', checkins)).toBe(false);
    expect(canPlayerCheckin('alice', checkins)).toBe(false);
  });
});

describe('buildCheckinData', () => {
  it('creates checkin with defaults', () => {
    const checkin = buildCheckinData('Alice');
    expect(checkin.name).toBe('Alice');
    expect(checkin.playStyle).toBe('both');
    expect(checkin.allowRotation).toBe(true);
    expect(checkin.timestamp).toBeGreaterThan(0);
  });

  it('creates checkin with options', () => {
    const checkin = buildCheckinData('Alice', {
      playStyle: 'singles',
      allowRotation: false,
      isGuest: true,
      guestOf: 'Bob',
    });
    expect(checkin.playStyle).toBe('singles');
    expect(checkin.allowRotation).toBe(false);
    expect(checkin.isGuest).toBe(true);
    expect(checkin.guestOf).toBe('Bob');
  });

  it('trims name', () => {
    const checkin = buildCheckinData('  Alice  ');
    expect(checkin.name).toBe('Alice');
  });
});

describe('addCheckin', () => {
  it('adds new checkin', () => {
    const checkins = [createCheckin('Alice')];
    const newCheckin = createCheckin('Bob');
    const result = addCheckin(newCheckin, checkins);
    expect(result.length).toBe(2);
  });

  it('replaces existing checkin', () => {
    const checkins = [createCheckin('Alice', 'both')];
    const newCheckin = createCheckin('alice', 'singles');
    const result = addCheckin(newCheckin, checkins);
    expect(result.length).toBe(1);
    expect(result[0].playStyle).toBe('singles');
  });
});

describe('removeCheckinByName', () => {
  it('removes checkin case-insensitively', () => {
    const checkins = [createCheckin('Alice'), createCheckin('Bob')];
    const result = removeCheckinByName('alice', checkins);
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Bob');
  });
});

describe('removeCheckinByIndex', () => {
  it('removes checkin at index', () => {
    const checkins = [createCheckin('Alice'), createCheckin('Bob'), createCheckin('Charlie')];
    const result = removeCheckinByIndex(1, checkins);
    expect(result.length).toBe(2);
    expect(result.map((c) => c.name)).toEqual(['Alice', 'Charlie']);
  });

  it('returns original array for invalid index', () => {
    const checkins = [createCheckin('Alice')];
    expect(removeCheckinByIndex(-1, checkins)).toEqual(checkins);
    expect(removeCheckinByIndex(5, checkins)).toEqual(checkins);
  });
});

describe('updateCheckin', () => {
  it('updates checkin by name', () => {
    const checkins = [createCheckin('Alice', 'both'), createCheckin('Bob')];
    const result = updateCheckin('alice', { playStyle: 'singles' }, checkins);
    expect(result[0].playStyle).toBe('singles');
    expect(result[1].playStyle).toBe('both');
  });
});

describe('getCheckinSummary', () => {
  it('returns correct summary', () => {
    const checkins = [
      createCheckin('A', 'singles'),
      createCheckin('B', 'singles'),
      createCheckin('C', 'doubles'),
      createCheckin('D', 'both'),
      { ...createCheckin('E', 'both'), isGuest: true },
    ];
    const summary = getCheckinSummary(checkins);
    expect(summary.total).toBe(5);
    expect(summary.singles).toBe(2);
    expect(summary.doubles).toBe(1);
    expect(summary.either).toBe(2);
    expect(summary.guests).toBe(1);
  });
});

describe('countByPlayStyle', () => {
  it('counts correctly', () => {
    const checkins = [
      createCheckin('A', 'singles'),
      createCheckin('B', 'singles'),
      createCheckin('C', 'doubles'),
    ];
    expect(countByPlayStyle(checkins, 'singles')).toBe(2);
    expect(countByPlayStyle(checkins, 'doubles')).toBe(1);
    expect(countByPlayStyle(checkins, 'both')).toBe(0);
  });
});

describe('filterByPlayStyle', () => {
  it('filters correctly', () => {
    const checkins = [
      createCheckin('A', 'singles'),
      createCheckin('B', 'doubles'),
      createCheckin('C', 'both'),
    ];
    expect(filterByPlayStyle(checkins, 'singles').length).toBe(1);
    expect(filterByPlayStyle(checkins, 'doubles').length).toBe(1);
    expect(filterByPlayStyle(checkins, 'both').length).toBe(1);
  });
});

describe('sortCheckinsByTimestamp', () => {
  it('sorts ascending by default', () => {
    const checkins = [
      createCheckin('C', 'both', 3000),
      createCheckin('A', 'both', 1000),
      createCheckin('B', 'both', 2000),
    ];
    const result = sortCheckinsByTimestamp(checkins);
    expect(result.map((c) => c.name)).toEqual(['A', 'B', 'C']);
  });

  it('sorts descending when specified', () => {
    const checkins = [
      createCheckin('A', 'both', 1000),
      createCheckin('C', 'both', 3000),
      createCheckin('B', 'both', 2000),
    ];
    const result = sortCheckinsByTimestamp(checkins, false);
    expect(result.map((c) => c.name)).toEqual(['C', 'B', 'A']);
  });
});

describe('sortCheckinsByName', () => {
  it('sorts alphabetically', () => {
    const checkins = [createCheckin('Charlie'), createCheckin('Alice'), createCheckin('Bob')];
    const result = sortCheckinsByName(checkins);
    expect(result.map((c) => c.name)).toEqual(['Alice', 'Bob', 'Charlie']);
  });
});

describe('getCheckinsWithTimeRestrictions', () => {
  it('returns only checkins with time restrictions', () => {
    const checkins = [
      createCheckin('A'),
      { ...createCheckin('B'), timeRange: { start: '09:00', end: '12:00' } },
      { ...createCheckin('C'), timeRange: { start: '14:00', end: '16:00' } },
    ];
    const result = getCheckinsWithTimeRestrictions(checkins);
    expect(result.length).toBe(2);
  });
});

describe('getGuestCheckins', () => {
  it('returns only guest checkins', () => {
    const checkins = [
      createCheckin('A'),
      { ...createCheckin('B'), isGuest: true },
      { ...createCheckin('C'), isGuest: true },
    ];
    const result = getGuestCheckins(checkins);
    expect(result.length).toBe(2);
  });
});

describe('getMemberCheckins', () => {
  it('returns only non-guest checkins', () => {
    const checkins = [
      createCheckin('A'),
      { ...createCheckin('B'), isGuest: true },
      createCheckin('C'),
    ];
    const result = getMemberCheckins(checkins);
    expect(result.length).toBe(2);
  });
});

describe('getUniquePlayerNames', () => {
  it('returns unique names', () => {
    const checkins = [createCheckin('Alice'), createCheckin('Bob'), createCheckin('Alice')];
    const result = getUniquePlayerNames(checkins);
    expect(result).toContain('Alice');
    expect(result).toContain('Bob');
  });
});

describe('mergeCheckins', () => {
  it('merges without duplicates', () => {
    const existing = [createCheckin('Alice', 'both')];
    const incoming = [createCheckin('Alice', 'singles'), createCheckin('Bob')];
    const result = mergeCheckins(existing, incoming);
    expect(result.length).toBe(2);
    expect(result.find((c) => c.name === 'Alice')?.playStyle).toBe('singles');
  });
});

describe('cleanCheckins', () => {
  it('removes null and undefined entries', () => {
    const checkins = [createCheckin('Alice'), null, createCheckin('Bob'), undefined];
    const result = cleanCheckins(checkins);
    expect(result.length).toBe(2);
    expect(result.map((c) => c.name)).toEqual(['Alice', 'Bob']);
  });
});

describe('isSessionUserCheckedIn', () => {
  it('returns true if no session user', () => {
    const checkins = [createCheckin('Alice'), createCheckin('Bob')];
    expect(isSessionUserCheckedIn(null, checkins)).toBe(true);
    expect(isSessionUserCheckedIn('', checkins)).toBe(true);
  });

  it('returns true if session user is checked in', () => {
    const checkins = [createCheckin('Alice'), createCheckin('Bob')];
    expect(isSessionUserCheckedIn('Alice', checkins)).toBe(true);
    expect(isSessionUserCheckedIn('alice', checkins)).toBe(true); // case insensitive
  });

  it('returns false if session user is not checked in', () => {
    const checkins = [createCheckin('Alice'), createCheckin('Bob')];
    expect(isSessionUserCheckedIn('Charlie', checkins)).toBe(false);
  });

  it('handles empty checkins list', () => {
    expect(isSessionUserCheckedIn('Alice', [])).toBe(false);
  });
});

describe('shouldAutoExpandForm', () => {
  it('returns false if no session user', () => {
    const checkins = [createCheckin('Alice')];
    expect(shouldAutoExpandForm(null, checkins)).toBe(false);
    expect(shouldAutoExpandForm('', checkins)).toBe(false);
  });

  it('returns false if session user is already checked in', () => {
    const checkins = [createCheckin('Alice'), createCheckin('Bob')];
    expect(shouldAutoExpandForm('Alice', checkins)).toBe(false);
  });

  it('returns true if session user is not checked in', () => {
    const checkins = [createCheckin('Alice'), createCheckin('Bob')];
    expect(shouldAutoExpandForm('Charlie', checkins)).toBe(true);
  });

  it('returns true for empty checkins list when session user exists', () => {
    expect(shouldAutoExpandForm('Alice', [])).toBe(true);
  });
});
