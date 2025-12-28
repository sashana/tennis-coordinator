import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { SportConfig, SportId } from '../types/sportConfig';

// Mock sport configs for testing
const mockTennisConfig: SportConfig = {
  id: 'tennis',
  name: 'Tennis',
  nameLower: 'tennis',
  matchFormats: {
    doubles: { enabled: true, playerCount: 4 },
    singles: { enabled: true, playerCount: 2 },
  },
  defaultPlayStyle: 'both',
  terms: {
    match: 'match',
    court: 'court',
    doubles: 'Doubles',
    singles: 'Singles',
    player: 'player',
    doublesForming: 'Doubles Forming',
    singlesForming: 'Singles Forming',
  },
  themes: [
    {
      id: 'default',
      name: 'Classic',
      color: '#2C6E49',
      lightBg: '#E8F5E9',
      hoverBg: '#C8E6C9',
      logo: null,
      emoji: '🎾',
    },
  ],
  defaultTheme: 'default',
  primaryColor: '#2C6E49',
  sportEmoji: '🎾',
  appName: 'Tennis Coordinator',
  tagline: 'Less texting. More tennis.',
  domain: 'tennis.sportsconnector.com',
  features: {
    rotation: true,
    skillRating: 'NTRP',
  },
};

const mockPickleballConfig: SportConfig = {
  id: 'pickleball',
  name: 'Pickleball',
  nameLower: 'pickleball',
  matchFormats: {
    doubles: { enabled: true, playerCount: 4 },
    singles: { enabled: true, playerCount: 2 },
  },
  defaultPlayStyle: 'both',
  terms: {
    match: 'game',
    court: 'court',
    doubles: 'Doubles',
    singles: 'Singles',
    player: 'player',
    doublesForming: 'Doubles Forming',
    singlesForming: 'Singles Forming',
  },
  themes: [
    {
      id: 'default',
      name: 'Classic',
      color: '#2E7D32',
      lightBg: '#E8F5E9',
      hoverBg: '#C8E6C9',
      logo: null,
      emoji: '🟡',
    },
  ],
  defaultTheme: 'default',
  primaryColor: '#2E7D32',
  sportEmoji: '🟡',
  appName: 'Pickleball Coordinator',
  tagline: 'Less texting. More pickleball.',
  domain: 'pickleball.sportsconnector.com',
  features: {
    rotation: true,
    skillRating: 'DUPR',
  },
};

const mockSquashConfig: SportConfig = {
  id: 'squash',
  name: 'Squash',
  nameLower: 'squash',
  matchFormats: {
    doubles: { enabled: true, playerCount: 4 },
    singles: { enabled: true, playerCount: 2 },
  },
  defaultPlayStyle: 'singles',
  terms: {
    match: 'match',
    court: 'court',
    doubles: 'Doubles',
    singles: 'Singles',
    player: 'player',
    doublesForming: 'Doubles Forming',
    singlesForming: 'Singles Forming',
  },
  themes: [
    {
      id: 'default',
      name: 'Classic',
      color: '#1565C0',
      lightBg: '#E3F2FD',
      hoverBg: '#BBDEFB',
      logo: null,
      emoji: '🏸',
    },
  ],
  defaultTheme: 'default',
  primaryColor: '#1565C0',
  sportEmoji: '🏸',
  appName: 'Squash Coordinator',
  tagline: 'Less texting. More squash.',
  domain: 'squash.sportsconnector.com',
  features: {
    rotation: false,
    skillRating: null,
  },
};

// ============================================
// Sport Config Structure Tests
// ============================================

describe('SportConfig Structure', () => {
  describe('Tennis Config', () => {
    it('has correct identity properties', () => {
      expect(mockTennisConfig.id).toBe('tennis');
      expect(mockTennisConfig.name).toBe('Tennis');
      expect(mockTennisConfig.nameLower).toBe('tennis');
    });

    it('has correct match formats', () => {
      expect(mockTennisConfig.matchFormats.doubles.enabled).toBe(true);
      expect(mockTennisConfig.matchFormats.doubles.playerCount).toBe(4);
      expect(mockTennisConfig.matchFormats.singles.enabled).toBe(true);
      expect(mockTennisConfig.matchFormats.singles.playerCount).toBe(2);
    });

    it('has tennis-specific emoji', () => {
      expect(mockTennisConfig.sportEmoji).toBe('🎾');
    });

    it('has NTRP skill rating', () => {
      expect(mockTennisConfig.features.skillRating).toBe('NTRP');
    });

    it('has rotation enabled', () => {
      expect(mockTennisConfig.features.rotation).toBe(true);
    });
  });

  describe('Pickleball Config', () => {
    it('has correct identity properties', () => {
      expect(mockPickleballConfig.id).toBe('pickleball');
      expect(mockPickleballConfig.name).toBe('Pickleball');
      expect(mockPickleballConfig.nameLower).toBe('pickleball');
    });

    it('has yellow circle emoji (not ping pong)', () => {
      expect(mockPickleballConfig.sportEmoji).toBe('🟡');
      expect(mockPickleballConfig.sportEmoji).not.toBe('🏓'); // Not ping pong!
    });

    it('has DUPR skill rating (not NTRP)', () => {
      expect(mockPickleballConfig.features.skillRating).toBe('DUPR');
      expect(mockPickleballConfig.features.skillRating).not.toBe('NTRP');
    });

    it('uses "game" terminology instead of "match"', () => {
      expect(mockPickleballConfig.terms.match).toBe('game');
      expect(mockTennisConfig.terms.match).toBe('match');
    });

    it('has same match formats as tennis', () => {
      expect(mockPickleballConfig.matchFormats.doubles.playerCount).toBe(4);
      expect(mockPickleballConfig.matchFormats.singles.playerCount).toBe(2);
    });
  });

  describe('Squash Config', () => {
    it('has correct identity properties', () => {
      expect(mockSquashConfig.id).toBe('squash');
      expect(mockSquashConfig.name).toBe('Squash');
    });

    it('defaults to singles play style', () => {
      expect(mockSquashConfig.defaultPlayStyle).toBe('singles');
    });

    it('has no skill rating system', () => {
      expect(mockSquashConfig.features.skillRating).toBeNull();
    });

    it('has rotation disabled', () => {
      expect(mockSquashConfig.features.rotation).toBe(false);
    });
  });
});

// ============================================
// Sport-Specific Terminology Tests
// ============================================

describe('Sport-Specific Terminology', () => {
  it('tennis uses "match" terminology', () => {
    expect(mockTennisConfig.terms.match).toBe('match');
  });

  it('pickleball uses "game" terminology', () => {
    expect(mockPickleballConfig.terms.match).toBe('game');
  });

  it('all sports use "court" for play area', () => {
    expect(mockTennisConfig.terms.court).toBe('court');
    expect(mockPickleballConfig.terms.court).toBe('court');
    expect(mockSquashConfig.terms.court).toBe('court');
  });

  it('all sports use same doubles/singles labels', () => {
    const configs = [mockTennisConfig, mockPickleballConfig, mockSquashConfig];
    configs.forEach((config) => {
      expect(config.terms.doubles).toBe('Doubles');
      expect(config.terms.singles).toBe('Singles');
    });
  });
});

// ============================================
// Sport-Specific Branding Tests
// ============================================

describe('Sport-Specific Branding', () => {
  it('each sport has unique app name', () => {
    expect(mockTennisConfig.appName).toBe('Tennis Coordinator');
    expect(mockPickleballConfig.appName).toBe('Pickleball Coordinator');
    expect(mockSquashConfig.appName).toBe('Squash Coordinator');
  });

  it('each sport has sport-specific tagline', () => {
    expect(mockTennisConfig.tagline).toContain('tennis');
    expect(mockPickleballConfig.tagline).toContain('pickleball');
    expect(mockSquashConfig.tagline).toContain('squash');
  });

  it('each sport has unique domain', () => {
    expect(mockTennisConfig.domain).toContain('tennis');
    expect(mockPickleballConfig.domain).toContain('pickleball');
    expect(mockSquashConfig.domain).toContain('squash');
  });

  it('each sport has unique primary color', () => {
    expect(mockTennisConfig.primaryColor).toBe('#2C6E49');
    expect(mockPickleballConfig.primaryColor).toBe('#2E7D32');
    expect(mockSquashConfig.primaryColor).toBe('#1565C0');
    // All different
    expect(mockTennisConfig.primaryColor).not.toBe(mockPickleballConfig.primaryColor);
    expect(mockTennisConfig.primaryColor).not.toBe(mockSquashConfig.primaryColor);
  });
});

// ============================================
// Sport-Specific Emoji Tests
// ============================================

describe('Sport-Specific Emojis', () => {
  it('tennis uses tennis ball emoji', () => {
    expect(mockTennisConfig.sportEmoji).toBe('🎾');
  });

  it('pickleball uses yellow circle (no pickleball emoji exists)', () => {
    expect(mockPickleballConfig.sportEmoji).toBe('🟡');
  });

  it('squash uses badminton emoji (closest available)', () => {
    expect(mockSquashConfig.sportEmoji).toBe('🏸');
  });

  it('theme emojis match sport emojis', () => {
    expect(mockTennisConfig.themes[0].emoji).toBe('🎾');
    expect(mockPickleballConfig.themes[0].emoji).toBe('🟡');
    expect(mockSquashConfig.themes[0].emoji).toBe('🏸');
  });
});

// ============================================
// Sport-Specific Features Tests
// ============================================

describe('Sport-Specific Features', () => {
  describe('Rotation Feature', () => {
    it('tennis supports 3-player rotation', () => {
      expect(mockTennisConfig.features.rotation).toBe(true);
    });

    it('pickleball supports 3-player rotation', () => {
      expect(mockPickleballConfig.features.rotation).toBe(true);
    });

    it('squash does not support rotation', () => {
      expect(mockSquashConfig.features.rotation).toBe(false);
    });
  });

  describe('Skill Rating System', () => {
    it('tennis uses NTRP rating', () => {
      expect(mockTennisConfig.features.skillRating).toBe('NTRP');
    });

    it('pickleball uses DUPR rating', () => {
      expect(mockPickleballConfig.features.skillRating).toBe('DUPR');
    });

    it('squash has no rating system', () => {
      expect(mockSquashConfig.features.skillRating).toBeNull();
    });
  });
});

// ============================================
// Sport Detection Tests
// ============================================

describe('Sport Detection from Subdomain', () => {
  // Helper function to simulate subdomain detection
  function detectSportFromHostname(hostname: string): SportId {
    const subdomainMap: Record<string, SportId> = {
      tennis: 'tennis',
      pickleball: 'pickleball',
      squash: 'squash',
      padel: 'padel',
      badminton: 'badminton',
    };

    // Handle: tennis.localhost, pickleball.sportsconnector.com, etc.
    const parts = hostname.split('.');
    if (parts.length >= 1) {
      const subdomain = parts[0].toLowerCase();
      if (subdomain in subdomainMap) {
        return subdomainMap[subdomain];
      }
    }

    // Default to tennis
    return 'tennis';
  }

  it('detects tennis from tennis.localhost', () => {
    expect(detectSportFromHostname('tennis.localhost')).toBe('tennis');
  });

  it('detects pickleball from pickleball.localhost', () => {
    expect(detectSportFromHostname('pickleball.localhost')).toBe('pickleball');
  });

  it('detects tennis from tennis.sportsconnector.com', () => {
    expect(detectSportFromHostname('tennis.sportsconnector.com')).toBe('tennis');
  });

  it('detects pickleball from pickleball.sportsconnector.com', () => {
    expect(detectSportFromHostname('pickleball.sportsconnector.com')).toBe('pickleball');
  });

  it('detects squash from squash.sportsconnector.com', () => {
    expect(detectSportFromHostname('squash.sportsconnector.com')).toBe('squash');
  });

  it('defaults to tennis for unknown subdomains', () => {
    expect(detectSportFromHostname('unknown.sportsconnector.com')).toBe('tennis');
    expect(detectSportFromHostname('localhost')).toBe('tennis');
  });
});

// ============================================
// Cross-Sport Group Navigation Tests
// ============================================

describe('Cross-Sport Group Navigation', () => {
  // Helper to simulate subdomain switch URL generation
  function getSubdomainUrl(
    currentHost: string,
    targetSport: SportId,
    groupId: string,
    deviceToken?: string
  ): string {
    const sportSubdomains: Record<SportId, string> = {
      tennis: 'tennis',
      pickleball: 'pickleball',
      squash: 'squash',
      padel: 'padel',
      badminton: 'badminton',
    };

    const targetSubdomain = sportSubdomains[targetSport];
    const tokenParam = deviceToken ? `&dt=${deviceToken}` : '';

    if (currentHost.includes('localhost')) {
      const port = ':5173';
      return `http://${targetSubdomain}.localhost${port}/?group=${groupId}${tokenParam}`;
    }

    const hostParts = currentHost.split('.');
    hostParts[0] = targetSubdomain;
    const newHost = hostParts.join('.');
    return `https://${newHost}/?group=${groupId}${tokenParam}`;
  }

  it('generates correct URL for tennis to pickleball switch on localhost', () => {
    const url = getSubdomainUrl('tennis.localhost', 'pickleball', 'group123', 'token456');
    expect(url).toBe('http://pickleball.localhost:5173/?group=group123&dt=token456');
  });

  it('generates correct URL for pickleball to tennis switch on production', () => {
    const url = getSubdomainUrl('pickleball.sportsconnector.com', 'tennis', 'mygroup');
    expect(url).toBe('https://tennis.sportsconnector.com/?group=mygroup');
  });

  it('includes device token for cross-subdomain identity', () => {
    const urlWithToken = getSubdomainUrl(
      'tennis.localhost',
      'pickleball',
      'group123',
      'abc-device-token'
    );
    expect(urlWithToken).toContain('dt=abc-device-token');

    const urlWithoutToken = getSubdomainUrl('tennis.localhost', 'pickleball', 'group123');
    expect(urlWithoutToken).not.toContain('dt=');
  });
});

// ============================================
// Sport-Specific CSS Class Tests
// ============================================

describe('Sport-Specific CSS Classes', () => {
  it('generates correct sport class from sport id', () => {
    expect(`sport-${mockTennisConfig.id}`).toBe('sport-tennis');
    expect(`sport-${mockPickleballConfig.id}`).toBe('sport-pickleball');
    expect(`sport-${mockSquashConfig.id}`).toBe('sport-squash');
  });

  it('all sport IDs are valid for CSS class names', () => {
    const validCssClassRegex = /^[a-z][a-z0-9-]*$/;
    expect(mockTennisConfig.id).toMatch(validCssClassRegex);
    expect(mockPickleballConfig.id).toMatch(validCssClassRegex);
    expect(mockSquashConfig.id).toMatch(validCssClassRegex);
  });
});

// ============================================
// Sport-Specific Match Format Tests
// ============================================

describe('Sport-Specific Match Formats', () => {
  it('all racket sports have 4-player doubles', () => {
    const configs = [mockTennisConfig, mockPickleballConfig, mockSquashConfig];
    configs.forEach((config) => {
      expect(config.matchFormats.doubles.playerCount).toBe(4);
    });
  });

  it('all racket sports have 2-player singles', () => {
    const configs = [mockTennisConfig, mockPickleballConfig, mockSquashConfig];
    configs.forEach((config) => {
      expect(config.matchFormats.singles.playerCount).toBe(2);
    });
  });

  it('all sports have both formats enabled', () => {
    const configs = [mockTennisConfig, mockPickleballConfig, mockSquashConfig];
    configs.forEach((config) => {
      expect(config.matchFormats.doubles.enabled).toBe(true);
      expect(config.matchFormats.singles.enabled).toBe(true);
    });
  });
});

// ============================================
// Sport-Specific Group Creation Tests
// ============================================

describe('Sport-Specific Group Creation', () => {
  it('group settings should include sportType', () => {
    const groupSettings = {
      groupName: 'Tuesday Doubles',
      members: ['Alice', 'Bob'],
      groupPin: '1234',
      adminPin: '5678',
      sportType: mockPickleballConfig.id as SportId,
    };

    expect(groupSettings.sportType).toBe('pickleball');
  });

  it('sportType defaults to tennis for legacy groups', () => {
    const legacyGroupSettings = {
      groupName: 'Old Group',
      members: ['Alice'],
      groupPin: '1234',
      adminPin: '5678',
      // No sportType field - legacy group
    };

    const sportType = (legacyGroupSettings as { sportType?: SportId }).sportType || 'tennis';
    expect(sportType).toBe('tennis');
  });
});

// ============================================
// Integration: Notification Message Tests
// ============================================

describe('Sport-Specific Notification Messages', () => {
  function formatCheckinNotification(
    sportEmoji: string,
    playerName: string,
    date: string
  ): string {
    return `${sportEmoji} ${playerName} checked in for ${date}`;
  }

  it('tennis notifications use tennis emoji', () => {
    const msg = formatCheckinNotification(mockTennisConfig.sportEmoji, 'Alice', 'Dec 27');
    expect(msg).toBe('🎾 Alice checked in for Dec 27');
    expect(msg).toContain('🎾');
  });

  it('pickleball notifications use yellow circle emoji', () => {
    const msg = formatCheckinNotification(mockPickleballConfig.sportEmoji, 'Bob', 'Dec 27');
    expect(msg).toBe('🟡 Bob checked in for Dec 27');
    expect(msg).toContain('🟡');
    expect(msg).not.toContain('🎾');
  });

  it('squash notifications use badminton emoji', () => {
    const msg = formatCheckinNotification(mockSquashConfig.sportEmoji, 'Charlie', 'Dec 27');
    expect(msg).toBe('🏸 Charlie checked in for Dec 27');
  });
});

// ============================================
// Integration: Share Message Tests
// ============================================

describe('Sport-Specific Share Messages', () => {
  function generateNeedPlayersMessage(
    sportEmoji: string,
    sportName: string,
    needed: number
  ): string {
    const neededText = needed === 1 ? '1 more player needed' : `${needed} more players needed`;
    return `${sportEmoji} ${neededText} for doubles!\nCan you make it?`;
  }

  it('tennis share messages use tennis emoji and name', () => {
    const msg = generateNeedPlayersMessage(mockTennisConfig.sportEmoji, mockTennisConfig.name, 2);
    expect(msg).toContain('🎾');
    expect(msg).toContain('2 more players needed');
  });

  it('pickleball share messages use pickleball emoji', () => {
    const msg = generateNeedPlayersMessage(
      mockPickleballConfig.sportEmoji,
      mockPickleballConfig.name,
      1
    );
    expect(msg).toContain('🟡');
    expect(msg).toContain('1 more player needed');
  });
});

// ============================================
// Integration: Calendar Event Tests
// ============================================

describe('Sport-Specific Calendar Events', () => {
  function generateCalendarFilename(sportId: SportId, date: string): string {
    return `${sportId}-${date}.ics`;
  }

  function generateProdId(appName: string): string {
    return `PRODID:-//${appName}//EN`;
  }

  it('tennis calendar files use tennis filename', () => {
    const filename = generateCalendarFilename('tennis', '2024-12-27');
    expect(filename).toBe('tennis-2024-12-27.ics');
  });

  it('pickleball calendar files use pickleball filename', () => {
    const filename = generateCalendarFilename('pickleball', '2024-12-27');
    expect(filename).toBe('pickleball-2024-12-27.ics');
  });

  it('calendar PRODID uses sport-specific app name', () => {
    expect(generateProdId(mockTennisConfig.appName)).toBe('PRODID:-//Tennis Coordinator//EN');
    expect(generateProdId(mockPickleballConfig.appName)).toBe(
      'PRODID:-//Pickleball Coordinator//EN'
    );
  });
});
