import { describe, it, expect } from 'vitest';
import {
  organizeMatches,
  timesOverlap,
  canPlayTogetherWithTime,
} from '../utils/matching';
import type { CheckinData, UserPreferences, TimeRange } from '../types';

describe('timesOverlap', () => {
  it('returns true when both have no time restrictions', () => {
    expect(timesOverlap(undefined, undefined)).toBe(true);
  });

  it('returns true when one has no time restriction', () => {
    expect(timesOverlap({ start: '09:00', end: '12:00' }, undefined)).toBe(true);
    expect(timesOverlap(undefined, { start: '14:00', end: '17:00' })).toBe(true);
  });

  it('returns true when both have empty time ranges', () => {
    expect(timesOverlap({} as TimeRange, {} as TimeRange)).toBe(true);
  });

  it('returns true for overlapping time ranges', () => {
    expect(
      timesOverlap({ start: '09:00', end: '12:00' }, { start: '11:00', end: '14:00' })
    ).toBe(true);
  });

  it('returns false for non-overlapping time ranges', () => {
    expect(
      timesOverlap({ start: '09:00', end: '11:00' }, { start: '13:00', end: '15:00' })
    ).toBe(false);
  });

  it('handles open-ended ranges (from X)', () => {
    expect(
      timesOverlap({ start: '14:00' } as TimeRange, { start: '09:00', end: '16:00' })
    ).toBe(true);
    expect(
      timesOverlap({ start: '18:00' } as TimeRange, { start: '09:00', end: '12:00' })
    ).toBe(false);
  });

  it('handles open-ended ranges (until X)', () => {
    expect(
      timesOverlap({ end: '12:00' } as TimeRange, { start: '09:00', end: '14:00' })
    ).toBe(true);
    expect(
      timesOverlap({ end: '08:00' } as TimeRange, { start: '10:00', end: '12:00' })
    ).toBe(false);
  });
});

describe('canPlayTogetherWithTime', () => {
  const emptyPrefs: UserPreferences = {};

  const createPlayer = (
    name: string,
    playStyle: 'singles' | 'doubles' | 'both' = 'both',
    timeRange?: TimeRange
  ): CheckinData => ({
    name,
    playStyle,
    timestamp: Date.now(),
    timeRange,
  });

  it('returns true when no exclusions and times overlap', () => {
    const p1 = createPlayer('Alice');
    const p2 = createPlayer('Bob');
    expect(canPlayTogetherWithTime(p1, p2, emptyPrefs)).toBe(true);
  });

  it('returns false when player1 excludes player2', () => {
    const p1 = createPlayer('Alice');
    const p2 = createPlayer('Bob');
    const prefs: UserPreferences = {
      alice: { include: [], exclude: ['bob'] },
    };
    expect(canPlayTogetherWithTime(p1, p2, prefs)).toBe(false);
  });

  it('returns false when player2 excludes player1', () => {
    const p1 = createPlayer('Alice');
    const p2 = createPlayer('Bob');
    const prefs: UserPreferences = {
      bob: { include: [], exclude: ['alice'] },
    };
    expect(canPlayTogetherWithTime(p1, p2, prefs)).toBe(false);
  });

  it('returns false when times do not overlap', () => {
    const p1 = createPlayer('Alice', 'both', { start: '09:00', end: '11:00' });
    const p2 = createPlayer('Bob', 'both', { start: '14:00', end: '16:00' });
    expect(canPlayTogetherWithTime(p1, p2, emptyPrefs)).toBe(false);
  });

  it('returns true when times overlap and no exclusions', () => {
    const p1 = createPlayer('Alice', 'both', { start: '09:00', end: '13:00' });
    const p2 = createPlayer('Bob', 'both', { start: '11:00', end: '15:00' });
    expect(canPlayTogetherWithTime(p1, p2, emptyPrefs)).toBe(true);
  });
});

describe('organizeMatches', () => {
  const createPlayer = (
    name: string,
    playStyle: 'singles' | 'doubles' | 'both' = 'both',
    timestamp = Date.now()
  ): CheckinData => ({
    name,
    playStyle,
    timestamp,
  });

  it('returns empty matches for empty checkins', () => {
    const result = organizeMatches([]);
    expect(result.matches).toEqual([]);
    expect(result.warnings).toEqual([]);
  });

  it('forms a doubles match with 4 players', () => {
    const players = [
      createPlayer('Alice', 'both', 1000),
      createPlayer('Bob', 'both', 2000),
      createPlayer('Charlie', 'both', 3000),
      createPlayer('Diana', 'both', 4000),
    ];
    const result = organizeMatches(players);

    expect(result.matches.length).toBe(1);
    expect(result.matches[0].type).toBe('doubles');
    expect(result.matches[0].players.length).toBe(4);
  });

  it('forms two doubles matches with 8 players', () => {
    const players = Array.from({ length: 8 }, (_, i) =>
      createPlayer(`Player${i}`, 'both', i * 1000)
    );
    const result = organizeMatches(players);

    expect(result.matches.length).toBe(2);
    expect(result.matches[0].type).toBe('doubles');
    expect(result.matches[0].number).toBe(1);
    expect(result.matches[1].type).toBe('doubles');
    expect(result.matches[1].number).toBe(2);
  });

  it('forms singles match from singles-only players', () => {
    const players = [
      createPlayer('Alice', 'singles', 1000),
      createPlayer('Bob', 'singles', 2000),
    ];
    const result = organizeMatches(players);

    expect(result.matches.length).toBe(1);
    expect(result.matches[0].type).toBe('singles');
    expect(result.matches[0].players.length).toBe(2);
  });

  it('creates doubles-forming for 3 players', () => {
    const players = [
      createPlayer('Alice', 'both', 1000),
      createPlayer('Bob', 'both', 2000),
      createPlayer('Charlie', 'both', 3000),
    ];
    const result = organizeMatches(players);

    expect(result.matches.length).toBe(1);
    expect(result.matches[0].type).toBe('doubles-forming');
    expect(result.matches[0].needed).toBe(1);
    expect(result.matches[0].players.length).toBe(3);
  });

  it('creates doubles-forming for 2 players', () => {
    const players = [
      createPlayer('Alice', 'both', 1000),
      createPlayer('Bob', 'both', 2000),
    ];
    const result = organizeMatches(players);

    expect(result.matches.length).toBe(1);
    expect(result.matches[0].type).toBe('doubles-forming');
    expect(result.matches[0].needed).toBe(2);
  });

  it('creates singles-forming for 1 singles-only player', () => {
    const players = [createPlayer('Alice', 'singles', 1000)];
    const result = organizeMatches(players);

    expect(result.matches.length).toBe(1);
    expect(result.matches[0].type).toBe('singles-forming');
    expect(result.matches[0].needed).toBe(1);
  });

  it('prioritizes doubles-only players for doubles', () => {
    const players = [
      createPlayer('DoublesOnly1', 'doubles', 1000),
      createPlayer('DoublesOnly2', 'doubles', 2000),
      createPlayer('DoublesOnly3', 'doubles', 3000),
      createPlayer('DoublesOnly4', 'doubles', 4000),
      createPlayer('EitherPlayer', 'both', 5000),
    ];
    const result = organizeMatches(players);

    // Should form 1 doubles with the 4 doubles-only players
    // And the Either player should be in doubles-forming
    expect(result.matches.length).toBe(2);
    expect(result.matches[0].type).toBe('doubles');
    expect(result.matches[1].type).toBe('doubles-forming');
    expect(result.matches[1].players[0].name).toBe('EitherPlayer');
  });

  it('respects first-come-first-served order', () => {
    const players = [
      createPlayer('First', 'both', 1000),
      createPlayer('Second', 'both', 2000),
      createPlayer('Third', 'both', 3000),
      createPlayer('Fourth', 'both', 4000),
    ];
    const result = organizeMatches(players);

    expect(result.matches[0].players[0].name).toBe('First');
    expect(result.matches[0].players[1].name).toBe('Second');
    expect(result.matches[0].players[2].name).toBe('Third');
    expect(result.matches[0].players[3].name).toBe('Fourth');
  });

  it('sets canRotate true for 3 flexible players who allow rotation', () => {
    const players = [
      { ...createPlayer('Alice', 'both', 1000), allowRotation: true },
      { ...createPlayer('Bob', 'both', 2000), allowRotation: true },
      { ...createPlayer('Charlie', 'both', 3000), allowRotation: true },
    ];
    const result = organizeMatches(players);

    expect(result.matches[0].canRotate).toBe(true);
  });

  it('sets canRotate false when a player opts out', () => {
    const players = [
      { ...createPlayer('Alice', 'both', 1000), allowRotation: true },
      { ...createPlayer('Bob', 'both', 2000), allowRotation: false },
      { ...createPlayer('Charlie', 'both', 3000), allowRotation: true },
    ];
    const result = organizeMatches(players);

    expect(result.matches[0].canRotate).toBe(false);
  });
});
