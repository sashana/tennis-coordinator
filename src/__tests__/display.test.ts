import { describe, it, expect } from 'vitest';
import {
  getMatchTypeLabel,
  getMatchTypeShortLabel,
  getPlayerCountLabel,
  getPlayersNeededLabel,
  formatMatchDescription,
  formatPlayerDisplay,
  getPlayStyleBadge,
  getPlayStyleColorClass,
  formatMatchPlayersList,
  getMatchStatusIndicator,
  isMatchComplete,
  isMatchForming,
  getMatchTypeClass,
  formatRotationStatus,
} from '../utils/display';
import type { Match, CheckinData } from '../types';

const createPlayer = (
  name: string,
  playStyle: 'singles' | 'doubles' | 'both' = 'both'
): CheckinData => ({
  name,
  playStyle,
  timestamp: Date.now(),
});

describe('getMatchTypeLabel', () => {
  it('returns correct labels for each match type', () => {
    expect(getMatchTypeLabel('doubles')).toBe('Doubles');
    expect(getMatchTypeLabel('singles')).toBe('Singles');
    expect(getMatchTypeLabel('doubles-forming')).toBe('Doubles Forming');
    expect(getMatchTypeLabel('singles-forming')).toBe('Singles Forming');
    expect(getMatchTypeLabel('singles-or-practice')).toBe('Singles or Practice');
  });
});

describe('getMatchTypeShortLabel', () => {
  it('returns short labels', () => {
    expect(getMatchTypeShortLabel('doubles')).toBe('D');
    expect(getMatchTypeShortLabel('singles')).toBe('S');
    expect(getMatchTypeShortLabel('doubles-forming')).toBe('D?');
    expect(getMatchTypeShortLabel('singles-forming')).toBe('S?');
  });
});

describe('getPlayerCountLabel', () => {
  it('handles singular', () => {
    expect(getPlayerCountLabel(1)).toBe('1 player');
  });

  it('handles plural', () => {
    expect(getPlayerCountLabel(0)).toBe('0 players');
    expect(getPlayerCountLabel(4)).toBe('4 players');
  });
});

describe('getPlayersNeededLabel', () => {
  it('returns correct label', () => {
    expect(getPlayersNeededLabel(1)).toBe('Need 1 more');
    expect(getPlayersNeededLabel(2)).toBe('Need 2 more');
  });
});

describe('formatMatchDescription', () => {
  it('formats doubles with number', () => {
    const match: Match = {
      type: 'doubles',
      number: 1,
      players: [],
    };
    expect(formatMatchDescription(match)).toBe('Doubles 1');
  });

  it('formats singles without number', () => {
    const match: Match = {
      type: 'singles',
      players: [],
    };
    expect(formatMatchDescription(match)).toBe('Singles');
  });

  it('formats forming matches with needed count', () => {
    const match: Match = {
      type: 'doubles-forming',
      players: [],
      needed: 2,
    };
    expect(formatMatchDescription(match)).toBe('Doubles Forming (need 2)');
  });
});

describe('formatPlayerDisplay', () => {
  it('returns just name when no time range', () => {
    const player = createPlayer('Alice');
    expect(formatPlayerDisplay(player)).toBe('Alice');
  });

  it('includes time range when present', () => {
    const player: CheckinData = {
      ...createPlayer('Alice'),
      timeRange: { start: '14:00', end: '16:00' },
    };
    const result = formatPlayerDisplay(player);
    expect(result).toContain('Alice');
    expect(result).toContain('2:00PM');
  });
});

describe('getPlayStyleBadge', () => {
  it('returns correct badges', () => {
    expect(getPlayStyleBadge('singles')).toBe('S');
    expect(getPlayStyleBadge('doubles')).toBe('D');
    expect(getPlayStyleBadge('both')).toBe('E');
    expect(getPlayStyleBadge(undefined)).toBe('E');
  });
});

describe('getPlayStyleColorClass', () => {
  it('returns correct CSS classes', () => {
    expect(getPlayStyleColorClass('singles')).toBe('singles-badge');
    expect(getPlayStyleColorClass('doubles')).toBe('doubles-badge');
    expect(getPlayStyleColorClass('both')).toBe('either-badge');
    expect(getPlayStyleColorClass(undefined)).toBe('either-badge');
  });
});

describe('formatMatchPlayersList', () => {
  it('joins player names with separator', () => {
    const match: Match = {
      type: 'doubles',
      players: [createPlayer('Alice'), createPlayer('Bob'), createPlayer('Charlie')],
    };
    expect(formatMatchPlayersList(match)).toBe('Alice, Bob, Charlie');
    expect(formatMatchPlayersList(match, ' / ')).toBe('Alice / Bob / Charlie');
  });
});

describe('getMatchStatusIndicator', () => {
  it('returns checkmark for complete matches', () => {
    const doublesMatch: Match = { type: 'doubles', players: [] };
    const singlesMatch: Match = { type: 'singles', players: [] };
    expect(getMatchStatusIndicator(doublesMatch)).toBe('✓');
    expect(getMatchStatusIndicator(singlesMatch)).toBe('✓');
  });

  it('returns rotation symbol when canRotate', () => {
    const match: Match = {
      type: 'doubles-forming',
      players: [],
      canRotate: true,
    };
    expect(getMatchStatusIndicator(match)).toBe('⟳');
  });

  it('returns needed count for forming matches', () => {
    const match: Match = {
      type: 'doubles-forming',
      players: [],
      needed: 2,
    };
    expect(getMatchStatusIndicator(match)).toBe('+2');
  });
});

describe('isMatchComplete', () => {
  it('returns true for complete matches', () => {
    expect(isMatchComplete({ type: 'doubles', players: [] })).toBe(true);
    expect(isMatchComplete({ type: 'singles', players: [] })).toBe(true);
  });

  it('returns false for forming matches', () => {
    expect(isMatchComplete({ type: 'doubles-forming', players: [] })).toBe(false);
    expect(isMatchComplete({ type: 'singles-forming', players: [] })).toBe(false);
  });
});

describe('isMatchForming', () => {
  it('returns true for forming matches', () => {
    expect(isMatchForming({ type: 'doubles-forming', players: [] })).toBe(true);
    expect(isMatchForming({ type: 'singles-forming', players: [] })).toBe(true);
    expect(isMatchForming({ type: 'singles-or-practice', players: [] })).toBe(true);
  });

  it('returns false for complete matches', () => {
    expect(isMatchForming({ type: 'doubles', players: [] })).toBe(false);
    expect(isMatchForming({ type: 'singles', players: [] })).toBe(false);
  });
});

describe('getMatchTypeClass', () => {
  it('returns correct CSS classes', () => {
    expect(getMatchTypeClass('doubles')).toBe('match-doubles');
    expect(getMatchTypeClass('singles')).toBe('match-singles');
    expect(getMatchTypeClass('doubles-forming')).toBe('match-forming');
    expect(getMatchTypeClass('singles-forming')).toBe('match-forming');
    expect(getMatchTypeClass('singles-or-practice')).toBe('match-practice');
  });
});

describe('formatRotationStatus', () => {
  it('returns null for non-forming matches', () => {
    const match: Match = { type: 'doubles', players: [] };
    expect(formatRotationStatus(match)).toBeNull();
  });

  it('returns "Can rotate" when canRotate is true', () => {
    const match: Match = {
      type: 'doubles-forming',
      players: [],
      canRotate: true,
    };
    expect(formatRotationStatus(match)).toBe('Can rotate');
  });

  it('returns "Need rotation approval" for 3 players without canRotate', () => {
    const match: Match = {
      type: 'doubles-forming',
      players: [createPlayer('A'), createPlayer('B'), createPlayer('C')],
      canRotate: false,
    };
    expect(formatRotationStatus(match)).toBe('Need rotation approval');
  });
});
