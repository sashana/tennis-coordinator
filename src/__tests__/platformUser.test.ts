import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  currentPlatformUser,
  platformUserLoading,
  platformUserError,
  deviceToken,
  linkedGroupsCount,
  getLinkedGroups,
  isLinkedToGroup,
  getMemberNameInGroup,
  type PlatformUserRecord,
  type GroupLink,
} from '../hooks/usePlatformUser';

// Mock the dependencies
vi.mock('../hooks/useCompatibility', () => ({
  getDeviceToken: vi.fn(() => 'test-device-token-12345'),
}));

vi.mock('../config/firebase', () => ({
  getDatabase: vi.fn(() => null),
}));

describe('Platform User - Device Token', () => {
  beforeEach(() => {
    // Reset signals
    currentPlatformUser.value = null;
    platformUserLoading.value = false;
    platformUserError.value = null;
    deviceToken.value = null;
  });

  it('getDeviceToken is available from useCompatibility', async () => {
    const { getDeviceToken } = await import('../hooks/useCompatibility');
    const token = getDeviceToken();
    expect(token).toBe('test-device-token-12345');
  });
});

describe('Platform User - Signals Initial State', () => {
  beforeEach(() => {
    currentPlatformUser.value = null;
    platformUserLoading.value = false;
    platformUserError.value = null;
    deviceToken.value = null;
  });

  it('currentPlatformUser starts as null', () => {
    expect(currentPlatformUser.value).toBeNull();
  });

  it('platformUserLoading starts as false', () => {
    expect(platformUserLoading.value).toBe(false);
  });

  it('platformUserError starts as null', () => {
    expect(platformUserError.value).toBeNull();
  });

  it('deviceToken starts as null', () => {
    expect(deviceToken.value).toBeNull();
  });

  it('linkedGroupsCount returns 0 when no user', () => {
    expect(linkedGroupsCount.value).toBe(0);
  });
});

describe('Platform User - linkedGroupsCount', () => {
  beforeEach(() => {
    currentPlatformUser.value = null;
  });

  afterEach(() => {
    currentPlatformUser.value = null;
  });

  it('returns 0 when user has no groupLinks', () => {
    currentPlatformUser.value = {
      profile: {
        displayName: 'Test User',
        createdAt: Date.now(),
        lastActiveAt: Date.now(),
      },
      settings: { notifications: { enabled: true } },
      groupLinks: {},
    };
    expect(linkedGroupsCount.value).toBe(0);
  });

  it('returns correct count when user has groupLinks', () => {
    const now = Date.now();
    currentPlatformUser.value = {
      profile: {
        displayName: 'Test User',
        createdAt: now,
        lastActiveAt: now,
      },
      settings: { notifications: { enabled: true } },
      groupLinks: {
        'group-1': { memberName: 'Alice', linkedAt: now, lastActive: now },
        'group-2': { memberName: 'Alice Smith', linkedAt: now, lastActive: now },
      },
    };
    expect(linkedGroupsCount.value).toBe(2);
  });
});

describe('Platform User - getLinkedGroups', () => {
  beforeEach(() => {
    currentPlatformUser.value = null;
  });

  afterEach(() => {
    currentPlatformUser.value = null;
  });

  it('returns empty array when no user', () => {
    expect(getLinkedGroups()).toEqual([]);
  });

  it('returns empty array when user has no groupLinks', () => {
    currentPlatformUser.value = {
      profile: {
        displayName: 'Test User',
        createdAt: Date.now(),
        lastActiveAt: Date.now(),
      },
      settings: { notifications: { enabled: true } },
      groupLinks: {},
    };
    expect(getLinkedGroups()).toEqual([]);
  });

  it('returns groups sorted by lastActive (most recent first)', () => {
    const now = Date.now();
    currentPlatformUser.value = {
      profile: {
        displayName: 'Test User',
        createdAt: now,
        lastActiveAt: now,
      },
      settings: { notifications: { enabled: true } },
      groupLinks: {
        'group-old': { memberName: 'Alice', linkedAt: now - 2000, lastActive: now - 2000 },
        'group-recent': { memberName: 'Alice', linkedAt: now - 1000, lastActive: now },
        'group-middle': { memberName: 'Alice', linkedAt: now - 500, lastActive: now - 1000 },
      },
    };

    const groups = getLinkedGroups();
    expect(groups).toHaveLength(3);
    expect(groups[0].groupId).toBe('group-recent');
    expect(groups[1].groupId).toBe('group-middle');
    expect(groups[2].groupId).toBe('group-old');
  });

  it('includes all group link properties', () => {
    const now = Date.now();
    currentPlatformUser.value = {
      profile: {
        displayName: 'Test User',
        createdAt: now,
        lastActiveAt: now,
      },
      settings: { notifications: { enabled: true } },
      groupLinks: {
        'ttmd': { memberName: 'Alex', linkedAt: now - 1000, lastActive: now },
      },
    };

    const groups = getLinkedGroups();
    expect(groups[0]).toEqual({
      groupId: 'ttmd',
      memberName: 'Alex',
      linkedAt: now - 1000,
      lastActive: now,
    });
  });
});

describe('Platform User - isLinkedToGroup', () => {
  beforeEach(() => {
    currentPlatformUser.value = null;
  });

  afterEach(() => {
    currentPlatformUser.value = null;
  });

  it('returns false when no user', () => {
    expect(isLinkedToGroup('any-group')).toBe(false);
  });

  it('returns false when not linked to group', () => {
    const now = Date.now();
    currentPlatformUser.value = {
      profile: {
        displayName: 'Test User',
        createdAt: now,
        lastActiveAt: now,
      },
      settings: { notifications: { enabled: true } },
      groupLinks: {
        'other-group': { memberName: 'Alice', linkedAt: now, lastActive: now },
      },
    };
    expect(isLinkedToGroup('ttmd')).toBe(false);
  });

  it('returns true when linked to group', () => {
    const now = Date.now();
    currentPlatformUser.value = {
      profile: {
        displayName: 'Test User',
        createdAt: now,
        lastActiveAt: now,
      },
      settings: { notifications: { enabled: true } },
      groupLinks: {
        'ttmd': { memberName: 'Alice', linkedAt: now, lastActive: now },
      },
    };
    expect(isLinkedToGroup('ttmd')).toBe(true);
  });
});

describe('Platform User - getMemberNameInGroup', () => {
  beforeEach(() => {
    currentPlatformUser.value = null;
  });

  afterEach(() => {
    currentPlatformUser.value = null;
  });

  it('returns null when no user', () => {
    expect(getMemberNameInGroup('any-group')).toBeNull();
  });

  it('returns null when not linked to group', () => {
    const now = Date.now();
    currentPlatformUser.value = {
      profile: {
        displayName: 'Test User',
        createdAt: now,
        lastActiveAt: now,
      },
      settings: { notifications: { enabled: true } },
      groupLinks: {},
    };
    expect(getMemberNameInGroup('ttmd')).toBeNull();
  });

  it('returns member name when linked to group', () => {
    const now = Date.now();
    currentPlatformUser.value = {
      profile: {
        displayName: 'Test User',
        createdAt: now,
        lastActiveAt: now,
      },
      settings: { notifications: { enabled: true } },
      groupLinks: {
        'ttmd': { memberName: 'Alex', linkedAt: now, lastActive: now },
        'other-group': { memberName: 'Alexander', linkedAt: now, lastActive: now },
      },
    };
    expect(getMemberNameInGroup('ttmd')).toBe('Alex');
    expect(getMemberNameInGroup('other-group')).toBe('Alexander');
  });
});

describe('Platform User - Profile Types', () => {
  it('PlatformUserRecord has correct structure', () => {
    const now = Date.now();
    const user: PlatformUserRecord = {
      profile: {
        displayName: 'Test User',
        createdAt: now,
        lastActiveAt: now,
        skillLevel: 'intermediate',
        ntrpRating: 3.5,
      },
      settings: {
        notifications: {
          enabled: true,
        },
      },
      groupLinks: {
        'ttmd': {
          memberName: 'Alex',
          linkedAt: now,
          lastActive: now,
        },
      },
    };

    expect(user.profile.displayName).toBe('Test User');
    expect(user.profile.skillLevel).toBe('intermediate');
    expect(user.profile.ntrpRating).toBe(3.5);
    expect(user.settings.notifications.enabled).toBe(true);
    expect(user.groupLinks['ttmd'].memberName).toBe('Alex');
  });

  it('GroupLink has correct structure', () => {
    const now = Date.now();
    const link: GroupLink = {
      memberName: 'Alice',
      linkedAt: now,
      lastActive: now,
    };

    expect(link.memberName).toBe('Alice');
    expect(link.linkedAt).toBe(now);
    expect(link.lastActive).toBe(now);
  });
});

describe('Platform User - Skill Levels', () => {
  it('accepts valid skill levels', () => {
    const now = Date.now();
    const levels = ['beginner', 'intermediate', 'advanced', 'competitive', 'pro'] as const;

    for (const level of levels) {
      const user: PlatformUserRecord = {
        profile: {
          displayName: 'Test',
          createdAt: now,
          lastActiveAt: now,
          skillLevel: level,
        },
        settings: { notifications: { enabled: true } },
        groupLinks: {},
      };
      expect(user.profile.skillLevel).toBe(level);
    }
  });
});
