import { describe, it, expect } from 'vitest';
import {
  truncateText,
  capitalizeWords,
  capitalizeFirst,
  pluralize,
  pluralizeWithCount,
  stripHtml,
  encodeForUrl,
  getInitials,
  isBlank,
  normalizeWhitespace,
  slugify,
  extractNumbers,
  padStart,
  padEnd,
  removeDiacritics,
  equalsIgnoreCase,
  containsIgnoreCase,
} from '../utils/text';

describe('truncateText', () => {
  it('returns original text if shorter than max', () => {
    expect(truncateText('Hello', 10)).toBe('Hello');
  });

  it('truncates and adds ellipsis if longer than max', () => {
    expect(truncateText('Hello World', 8)).toBe('Hello...');
  });

  it('handles exact length', () => {
    expect(truncateText('Hello', 5)).toBe('Hello');
  });
});

describe('capitalizeWords', () => {
  it('capitalizes each word', () => {
    expect(capitalizeWords('hello world')).toBe('Hello World');
  });

  it('handles mixed case', () => {
    expect(capitalizeWords('hELLO wORLD')).toBe('Hello World');
  });

  it('handles single word', () => {
    expect(capitalizeWords('hello')).toBe('Hello');
  });
});

describe('capitalizeFirst', () => {
  it('capitalizes first letter only', () => {
    expect(capitalizeFirst('hello world')).toBe('Hello world');
  });

  it('handles empty string', () => {
    expect(capitalizeFirst('')).toBe('');
  });
});

describe('pluralize', () => {
  it('returns singular for count of 1', () => {
    expect(pluralize('player', 1)).toBe('player');
  });

  it('returns plural for count != 1', () => {
    expect(pluralize('player', 0)).toBe('players');
    expect(pluralize('player', 2)).toBe('players');
    expect(pluralize('player', 10)).toBe('players');
  });

  it('uses custom plural form when provided', () => {
    expect(pluralize('person', 2, 'people')).toBe('people');
  });
});

describe('pluralizeWithCount', () => {
  it('returns count with singular word', () => {
    expect(pluralizeWithCount('player', 1)).toBe('1 player');
  });

  it('returns count with plural word', () => {
    expect(pluralizeWithCount('player', 3)).toBe('3 players');
  });

  it('uses custom plural form', () => {
    expect(pluralizeWithCount('person', 2, 'people')).toBe('2 people');
  });
});

describe('stripHtml', () => {
  it('removes HTML tags', () => {
    expect(stripHtml('<p>Hello</p>')).toBe('Hello');
    expect(stripHtml('<div><span>Test</span></div>')).toBe('Test');
  });

  it('handles text without HTML', () => {
    expect(stripHtml('Hello World')).toBe('Hello World');
  });
});

describe('encodeForUrl', () => {
  it('encodes special characters', () => {
    expect(encodeForUrl('Hello World')).toBe('Hello%20World');
    expect(encodeForUrl('test@example.com')).toBe('test%40example.com');
  });
});

describe('getInitials', () => {
  it('returns initials from name', () => {
    expect(getInitials('John Doe')).toBe('JD');
    expect(getInitials('Alice Bob Charlie')).toBe('AB');
  });

  it('respects maxLength parameter', () => {
    expect(getInitials('John Doe Smith', 3)).toBe('JDS');
  });

  it('handles single name', () => {
    expect(getInitials('John')).toBe('J');
  });
});

describe('isBlank', () => {
  it('returns true for empty string', () => {
    expect(isBlank('')).toBe(true);
  });

  it('returns true for whitespace only', () => {
    expect(isBlank('   ')).toBe(true);
    expect(isBlank('\t\n')).toBe(true);
  });

  it('returns false for non-blank string', () => {
    expect(isBlank('hello')).toBe(false);
    expect(isBlank('  hello  ')).toBe(false);
  });
});

describe('normalizeWhitespace', () => {
  it('trims and collapses spaces', () => {
    expect(normalizeWhitespace('  hello   world  ')).toBe('hello world');
  });

  it('handles multiple types of whitespace', () => {
    expect(normalizeWhitespace('hello\t\nworld')).toBe('hello world');
  });
});

describe('slugify', () => {
  it('creates URL-friendly slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
    expect(slugify('  Hello  World  ')).toBe('hello-world');
  });

  it('removes special characters', () => {
    expect(slugify('Hello! World?')).toBe('hello-world');
  });
});

describe('extractNumbers', () => {
  it('extracts integers', () => {
    expect(extractNumbers('There are 3 players')).toEqual([3]);
    expect(extractNumbers('Score: 21-15')).toEqual([21, -15]);
  });

  it('extracts decimals', () => {
    expect(extractNumbers('Temperature: 98.6')).toEqual([98.6]);
  });

  it('returns empty array if no numbers', () => {
    expect(extractNumbers('No numbers here')).toEqual([]);
  });
});

describe('padStart', () => {
  it('pads string at start', () => {
    expect(padStart('5', 2, '0')).toBe('05');
    expect(padStart('42', 4, '0')).toBe('0042');
  });

  it('returns original if already at length', () => {
    expect(padStart('hello', 3, '0')).toBe('hello');
  });
});

describe('padEnd', () => {
  it('pads string at end', () => {
    expect(padEnd('5', 2, '0')).toBe('50');
    expect(padEnd('hi', 4, '-')).toBe('hi--');
  });

  it('returns original if already at length', () => {
    expect(padEnd('hello', 3, '0')).toBe('hello');
  });
});

describe('removeDiacritics', () => {
  it('removes accents', () => {
    expect(removeDiacritics('café')).toBe('cafe');
    expect(removeDiacritics('naïve')).toBe('naive');
    expect(removeDiacritics('résumé')).toBe('resume');
  });

  it('handles text without diacritics', () => {
    expect(removeDiacritics('hello')).toBe('hello');
  });
});

describe('equalsIgnoreCase', () => {
  it('compares case-insensitively', () => {
    expect(equalsIgnoreCase('Hello', 'hello')).toBe(true);
    expect(equalsIgnoreCase('HELLO', 'hello')).toBe(true);
    expect(equalsIgnoreCase('Hello', 'World')).toBe(false);
  });
});

describe('containsIgnoreCase', () => {
  it('checks containment case-insensitively', () => {
    expect(containsIgnoreCase('Hello World', 'world')).toBe(true);
    expect(containsIgnoreCase('Hello World', 'HELLO')).toBe(true);
    expect(containsIgnoreCase('Hello World', 'xyz')).toBe(false);
  });
});
