import { describe, it, expect } from 'vitest';
import {
  buildWhatsAppUrl,
  buildSmsUrl,
  buildEmailUrl,
  formatDateForSharing,
  formatMatchesForWhatsApp,
  formatCheckinForWhatsApp,
  formatRemovalForWhatsApp,
  generateInviteMessage,
  generateInviteMessageWithLink,
  generateCompactWhatsAppMessage,
} from '../utils/sharing';
import type { Match, CheckinData } from '../types';

const createPlayer = (name: string): CheckinData => ({
  name,
  playStyle: 'both',
  timestamp: Date.now(),
});

describe('buildWhatsAppUrl', () => {
  it('creates WhatsApp URL with encoded message', () => {
    const url = buildWhatsAppUrl('Hello World');
    expect(url).toBe('https://wa.me/?text=Hello%20World');
  });

  it('handles special characters', () => {
    const url = buildWhatsAppUrl('Hello & Goodbye');
    expect(url).toContain('Hello%20%26%20Goodbye');
  });
});

describe('buildSmsUrl', () => {
  it('creates SMS URL with clean phone number', () => {
    const url = buildSmsUrl('(555) 123-4567', 'Hello');
    expect(url).toMatch(/sms:5551234567/);
    expect(url).toContain('body=Hello');
  });
});

describe('buildEmailUrl', () => {
  it('creates mailto URL with subject and body', () => {
    const url = buildEmailUrl('test@example.com', 'Subject', 'Body text');
    expect(url).toBe('mailto:test@example.com?subject=Subject&body=Body%20text');
  });
});

describe('formatDateForSharing', () => {
  it('formats date with ordinal', () => {
    const result = formatDateForSharing('2024-01-15');
    expect(result).toContain('Monday');
    expect(result).toContain('January');
    expect(result).toContain('15th');
  });

  it('handles 1st, 2nd, 3rd correctly', () => {
    expect(formatDateForSharing('2024-01-01')).toContain('1st');
    expect(formatDateForSharing('2024-01-02')).toContain('2nd');
    expect(formatDateForSharing('2024-01-03')).toContain('3rd');
  });
});

describe('formatMatchesForWhatsApp', () => {
  it('includes header with group name', () => {
    const matches: Match[] = [];
    const result = formatMatchesForWhatsApp(matches, '2024-01-15', 'TTMD');
    expect(result).toContain('*TTMD -');
    expect(result).toContain('January 15th*');
  });

  it('formats doubles matches', () => {
    const matches: Match[] = [
      {
        type: 'doubles',
        number: 1,
        players: [
          createPlayer('Alice'),
          createPlayer('Bob'),
          createPlayer('Charlie'),
          createPlayer('Diana'),
        ],
      },
    ];
    const result = formatMatchesForWhatsApp(matches, '2024-01-15');
    expect(result).toContain('*Doubles 1:*');
    expect(result).toContain('Alice');
    expect(result).toContain('Bob');
  });

  it('formats forming matches with needed count', () => {
    const matches: Match[] = [
      {
        type: 'doubles-forming',
        players: [createPlayer('Alice'), createPlayer('Bob')],
        needed: 2,
      },
    ];
    const result = formatMatchesForWhatsApp(matches, '2024-01-15');
    expect(result).toContain('*Doubles Forming (need 2 more):*');
    expect(result).toContain('Alice');
  });

  it('includes rotation indicator when canRotate', () => {
    const matches: Match[] = [
      {
        type: 'doubles-forming',
        players: [createPlayer('Alice'), createPlayer('Bob'), createPlayer('Charlie')],
        needed: 1,
        canRotate: true,
      },
    ];
    const result = formatMatchesForWhatsApp(matches, '2024-01-15');
    expect(result).toContain('↻ Can rotate');
  });
});

describe('formatCheckinForWhatsApp', () => {
  it('includes date and preference', () => {
    const checkinData: CheckinData = {
      name: 'Alice',
      playStyle: 'doubles',
      timestamp: Date.now(),
    };
    const result = formatCheckinForWhatsApp('Alice', '2024-01-15', checkinData);
    expect(result).toContain('January 15th');
    expect(result).toContain('Doubles only');
  });

  it('includes time range when specified', () => {
    const checkinData: CheckinData = {
      name: 'Alice',
      playStyle: 'both',
      timestamp: Date.now(),
      timeRange: { start: '14:00', end: '16:00' },
    };
    const result = formatCheckinForWhatsApp('Alice', '2024-01-15', checkinData);
    expect(result).toContain('Available:');
    expect(result).toContain('2:00PM');
  });
});

describe('formatRemovalForWhatsApp', () => {
  it('formats removal message', () => {
    const result = formatRemovalForWhatsApp('Alice', '2024-01-15');
    expect(result).toContain('no longer available');
    expect(result).toContain('January 15th');
  });
});

describe('generateInviteMessage', () => {
  it('includes all parameters', () => {
    const result = generateInviteMessage('Alice', 'TTMD', 'Bob');
    expect(result).toContain('Hi Alice');
    expect(result).toContain('Bob');
    expect(result).toContain('TTMD tennis group');
  });
});

describe('generateInviteMessageWithLink', () => {
  it('includes member name, group name, URL and PIN', () => {
    const result = generateInviteMessageWithLink(
      'Alice',
      'TTMD',
      'https://tennis.app?group=abc123',
      '1234'
    );
    expect(result).toContain('Hi Alice');
    expect(result).toContain('TTMD tennis coordination');
    expect(result).toContain('https://tennis.app?group=abc123');
    expect(result).toContain('PIN: 1234');
  });

  it('includes instructions for checking in', () => {
    const result = generateInviteMessageWithLink(
      'Bob',
      'Morning Tennis',
      'https://example.com',
      '5678'
    );
    expect(result).toContain('Check in for upcoming matches');
    expect(result).toContain('select your name');
  });
});

describe('generateCompactWhatsAppMessage', () => {
  it('formats date correctly', () => {
    const result = generateCompactWhatsAppMessage([], '2024-12-13', {});
    expect(result).toContain('Friday');
    expect(result).toContain('Dec');
    expect(result).toContain('13');
  });

  it('includes doubles match', () => {
    const matches: Match[] = [
      {
        type: 'doubles',
        number: 1,
        players: [
          createPlayer('Alice'),
          createPlayer('Bob'),
          createPlayer('Charlie'),
          createPlayer('Diana'),
        ],
      },
    ];
    const result = generateCompactWhatsAppMessage(matches, '2024-12-13', {});
    expect(result).toContain('Doubles: Alice, Bob, Charlie, Diana');
    expect(result).not.toContain('*'); // No bold formatting
  });

  it('includes singles match', () => {
    const matches: Match[] = [
      {
        type: 'singles',
        number: 1,
        players: [createPlayer('Alice'), createPlayer('Bob')],
      },
    ];
    const result = generateCompactWhatsAppMessage(matches, '2024-12-13', {});
    expect(result).toContain('Singles: Alice, Bob');
  });

  it('includes match notes', () => {
    const matches: Match[] = [
      {
        type: 'doubles',
        number: 1,
        players: [
          createPlayer('Alice'),
          createPlayer('Bob'),
          createPlayer('Charlie'),
          createPlayer('Diana'),
        ],
      },
    ];
    const notes = { 'doubles-1': 'Court 3, 2pm' };
    const result = generateCompactWhatsAppMessage(matches, '2024-12-13', notes);
    expect(result).toContain('📝 Court 3, 2pm');
  });

  it('includes weather info when provided', () => {
    const result = generateCompactWhatsAppMessage([], '2024-12-13', {}, {
      description: '☀️ Clear sky',
      tempMax: 72,
    });
    expect(result).toContain('☀️ Clear sky, 72°F');
  });

  it('shows "Open to more players" for provisional singles', () => {
    const matches: Match[] = [
      {
        type: 'singles',
        number: 1,
        players: [
          { ...createPlayer('Alice'), playStyle: 'both', allowRotation: true },
          { ...createPlayer('Bob'), playStyle: 'both', allowRotation: false },
        ],
      },
    ];
    const result = generateCompactWhatsAppMessage(matches, '2024-12-13', {});
    expect(result).toContain('Open to more players');
  });

  it('formats doubles-forming match', () => {
    const matches: Match[] = [
      {
        type: 'doubles-forming',
        players: [createPlayer('Alice'), createPlayer('Bob')],
        needed: 2,
      },
    ];
    const result = generateCompactWhatsAppMessage(matches, '2024-12-13', {});
    expect(result).toContain('Doubles (forming): Alice, Bob');
    expect(result).toContain('need 2 more');
  });

  it('includes rotation fallback for doubles-forming with 3 players', () => {
    const matches: Match[] = [
      {
        type: 'doubles-forming',
        players: [createPlayer('Alice'), createPlayer('Bob'), createPlayer('Charlie')],
        needed: 1,
        canRotate: true,
      },
    ];
    const result = generateCompactWhatsAppMessage(matches, '2024-12-13', {});
    expect(result).toContain('Can rotate if no 4th');
  });

  it('formats singles-forming match', () => {
    const matches: Match[] = [
      {
        type: 'singles-forming',
        players: [createPlayer('Alice')],
        needed: 1,
      },
    ];
    const result = generateCompactWhatsAppMessage(matches, '2024-12-13', {});
    expect(result).toContain('Singles (forming): Alice');
    expect(result).toContain('need 1 more');
  });

  it('formats rotation/singles-or-practice match', () => {
    const matches: Match[] = [
      {
        type: 'singles-or-practice',
        players: [createPlayer('Alice'), createPlayer('Bob'), createPlayer('Charlie')],
      },
    ];
    const result = generateCompactWhatsAppMessage(matches, '2024-12-13', {});
    expect(result).toContain('Rotation: Alice, Bob, Charlie');
  });

  it('includes standby list', () => {
    const matches: Match[] = [
      {
        type: 'waiting',
        players: [createPlayer('Alice'), createPlayer('Bob')],
      },
    ];
    const result = generateCompactWhatsAppMessage(matches, '2024-12-13', {});
    expect(result).toContain('Standby: Alice, Bob');
  });

  it('includes time range for players', () => {
    const matches: Match[] = [
      {
        type: 'doubles',
        number: 1,
        players: [
          { ...createPlayer('Alice'), timeRange: { start: '14:00', end: '16:00' } },
          createPlayer('Bob'),
          createPlayer('Charlie'),
          createPlayer('Diana'),
        ],
      },
    ];
    const result = generateCompactWhatsAppMessage(matches, '2024-12-13', {});
    expect(result).toContain('2:00PM');
    expect(result).toContain('4:00PM');
  });
});
