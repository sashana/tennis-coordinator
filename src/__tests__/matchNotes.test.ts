import { describe, it, expect } from 'vitest';
import {
  buildMatchKey,
  parseMatchKey,
  getMatchNote,
  setMatchNote,
  getMatchNotesForDate,
  setMatchNotesForDate,
  hasMatchNotes,
  countMatchesWithNotes,
  getMatchKeysWithNotes,
  clearAllMatchNotes,
  mergeMatchNotes,
  formatNoteForDisplay,
  getNotesSummary,
} from '../utils/matchNotes';

describe('buildMatchKey', () => {
  it('builds key with number', () => {
    expect(buildMatchKey('doubles', 1)).toBe('doubles-1');
    expect(buildMatchKey('singles', 2)).toBe('singles-2');
  });

  it('builds key without number', () => {
    expect(buildMatchKey('doubles-forming')).toBe('doubles-forming');
    expect(buildMatchKey('singles')).toBe('singles');
  });
});

describe('parseMatchKey', () => {
  it('parses simple keys with numbers', () => {
    const result = parseMatchKey('doubles-1');
    expect(result.type).toBe('doubles');
    expect(result.number).toBe(1);
  });

  it('parses compound keys with numbers', () => {
    const result = parseMatchKey('doubles-forming-1');
    expect(result.type).toBe('doubles-forming');
    expect(result.number).toBe(1);
  });

  it('parses keys without numbers', () => {
    const result = parseMatchKey('singles-forming');
    expect(result.type).toBe('singles-forming');
    expect(result.number).toBeUndefined();
  });
});

describe('getMatchNote', () => {
  it('returns note if exists', () => {
    const notes = { 'doubles-1': 'Court 3' };
    expect(getMatchNote(notes, 'doubles-1')).toBe('Court 3');
  });

  it('returns empty string if not exists', () => {
    const notes = {};
    expect(getMatchNote(notes, 'doubles-1')).toBe('');
  });
});

describe('setMatchNote', () => {
  it('sets note', () => {
    const notes = {};
    const result = setMatchNote(notes, 'doubles-1', 'Court 3');
    expect(result['doubles-1']).toBe('Court 3');
  });

  it('removes empty notes', () => {
    const notes = { 'doubles-1': 'Court 3' };
    const result = setMatchNote(notes, 'doubles-1', '  ');
    expect(result['doubles-1']).toBeUndefined();
  });

  it('trims note', () => {
    const notes = {};
    const result = setMatchNote(notes, 'doubles-1', '  Court 3  ');
    expect(result['doubles-1']).toBe('Court 3');
  });
});

describe('getMatchNotesForDate', () => {
  it('returns notes for date', () => {
    const allNotes = {
      '2024-01-15': { 'doubles-1': 'Court 3' },
      '2024-01-16': { singles: 'Practice court' },
    };
    expect(getMatchNotesForDate(allNotes, '2024-01-15')).toEqual({ 'doubles-1': 'Court 3' });
  });

  it('returns empty object for missing date', () => {
    expect(getMatchNotesForDate({}, '2024-01-15')).toEqual({});
  });
});

describe('setMatchNotesForDate', () => {
  it('sets notes for date', () => {
    const allNotes = {};
    const result = setMatchNotesForDate(allNotes, '2024-01-15', { 'doubles-1': 'Court 3' });
    expect(result['2024-01-15']).toEqual({ 'doubles-1': 'Court 3' });
  });

  it('preserves other dates', () => {
    const allNotes = { '2024-01-14': { singles: 'Note' } };
    const result = setMatchNotesForDate(allNotes, '2024-01-15', { 'doubles-1': 'Court 3' });
    expect(result['2024-01-14']).toBeDefined();
    expect(result['2024-01-15']).toBeDefined();
  });
});

describe('hasMatchNotes', () => {
  it('returns true if has notes', () => {
    const notes = { 'doubles-1': 'Court 3' };
    expect(hasMatchNotes(notes, 'doubles-1')).toBe(true);
  });

  it('returns false if no notes', () => {
    const notes = {};
    expect(hasMatchNotes(notes, 'doubles-1')).toBe(false);
  });

  it('returns false for empty notes', () => {
    const notes = { 'doubles-1': '   ' };
    expect(hasMatchNotes(notes, 'doubles-1')).toBe(false);
  });
});

describe('countMatchesWithNotes', () => {
  it('counts non-empty notes', () => {
    const notes = {
      'doubles-1': 'Court 3',
      'doubles-2': 'Court 4',
      singles: '',
    };
    expect(countMatchesWithNotes(notes)).toBe(2);
  });
});

describe('getMatchKeysWithNotes', () => {
  it('returns keys with non-empty notes', () => {
    const notes = {
      'doubles-1': 'Court 3',
      'doubles-2': '',
      singles: 'Practice',
    };
    const keys = getMatchKeysWithNotes(notes);
    expect(keys).toContain('doubles-1');
    expect(keys).toContain('singles');
    expect(keys).not.toContain('doubles-2');
  });
});

describe('clearAllMatchNotes', () => {
  it('returns empty object', () => {
    expect(clearAllMatchNotes()).toEqual({});
  });
});

describe('mergeMatchNotes', () => {
  it('merges notes keeping non-empty', () => {
    const existing = { 'doubles-1': 'Old note' };
    const incoming = { 'doubles-1': 'New note', singles: 'Single note' };
    const result = mergeMatchNotes(existing, incoming);
    expect(result['doubles-1']).toBe('New note');
    expect(result['singles']).toBe('Single note');
  });

  it('removes empty incoming notes', () => {
    const existing = { 'doubles-1': 'Note' };
    const incoming = { 'doubles-1': '' };
    const result = mergeMatchNotes(existing, incoming);
    expect(result['doubles-1']).toBeUndefined();
  });
});

describe('formatNoteForDisplay', () => {
  it('returns full note if under max length', () => {
    expect(formatNoteForDisplay('Short note', 100)).toBe('Short note');
  });

  it('truncates long notes with ellipsis', () => {
    const longNote = 'A'.repeat(150);
    const result = formatNoteForDisplay(longNote, 100);
    expect(result.length).toBe(100);
    expect(result.endsWith('...')).toBe(true);
  });

  it('trims whitespace', () => {
    expect(formatNoteForDisplay('  Note  ')).toBe('Note');
  });
});

describe('getNotesSummary', () => {
  it('returns summary', () => {
    const notes = {
      'doubles-1': 'Note 1',
      'doubles-2': 'Note 2',
      singles: '',
    };
    const summary = getNotesSummary(notes);
    expect(summary.total).toBe(2);
    expect(summary.matchKeys).toContain('doubles-1');
    expect(summary.matchKeys).toContain('doubles-2');
  });
});
