import { describe, it, expect } from 'vitest';
import {
  generateGroupId,
  generateShortCode,
  validateGroupPin,
  validateAdminPin,
  isValidPinFormat,
  buildGroupPath,
  buildGroupSettingsPath,
  buildGroupCheckinsPath,
  parseGroupShortCode,
  findGroupByShortCode,
  findGroupByName,
  getAvailableGroupsList,
  sortGroupsByName,
  groupExists,
  createDefaultGroupSettings,
  generateDefaultPin,
  mergeGroupSettings,
  isGroupSettingsComplete,
  getGroupDisplayName,
  buildGroupShareLink,
} from '../utils/groups';
import type { AvailableGroups, GroupSettings } from '../types';

describe('generateGroupId', () => {
  it('generates unique IDs', () => {
    const id1 = generateGroupId();
    const id2 = generateGroupId();
    expect(id1).not.toBe(id2);
  });

  it('generates IDs with expected format', () => {
    const id = generateGroupId();
    expect(id).toMatch(/^[a-z0-9]+-[a-z0-9]+$/);
  });
});

describe('generateShortCode', () => {
  it('generates code of default length', () => {
    const code = generateShortCode();
    expect(code.length).toBe(6);
  });

  it('generates code of specified length', () => {
    const code = generateShortCode(8);
    expect(code.length).toBe(8);
  });

  it('generates alphanumeric codes', () => {
    const code = generateShortCode();
    expect(code).toMatch(/^[A-Z0-9]+$/);
  });

  it('excludes similar characters (0, O, 1, I)', () => {
    // Generate multiple codes to increase chance of catching invalid chars
    // The charset excludes 0, O, 1, I (but keeps L)
    for (let i = 0; i < 100; i++) {
      const code = generateShortCode();
      expect(code).not.toMatch(/[0O1I]/);
    }
  });
});

describe('validateGroupPin', () => {
  it('returns true for matching pin', () => {
    expect(validateGroupPin('1234', '1234')).toBe(true);
  });

  it('returns false for non-matching pin', () => {
    expect(validateGroupPin('1234', '5678')).toBe(false);
  });
});

describe('validateAdminPin', () => {
  it('returns true for matching pin', () => {
    expect(validateAdminPin('1234', '1234')).toBe(true);
  });

  it('returns false for non-matching pin', () => {
    expect(validateAdminPin('1234', '5678')).toBe(false);
  });
});

describe('isValidPinFormat', () => {
  it('accepts 4-digit pins', () => {
    expect(isValidPinFormat('1234')).toBe(true);
  });

  it('accepts 8-digit pins', () => {
    expect(isValidPinFormat('12345678')).toBe(true);
  });

  it('rejects 3-digit pins', () => {
    expect(isValidPinFormat('123')).toBe(false);
  });

  it('rejects 9-digit pins', () => {
    expect(isValidPinFormat('123456789')).toBe(false);
  });

  it('rejects non-numeric pins', () => {
    expect(isValidPinFormat('abcd')).toBe(false);
    expect(isValidPinFormat('12ab')).toBe(false);
  });
});

describe('buildGroupPath', () => {
  it('builds correct path', () => {
    expect(buildGroupPath('group123')).toBe('groups/group123');
  });
});

describe('buildGroupSettingsPath', () => {
  it('builds correct path', () => {
    expect(buildGroupSettingsPath('group123')).toBe('groups/group123/settings');
  });
});

describe('buildGroupCheckinsPath', () => {
  it('builds path without date', () => {
    expect(buildGroupCheckinsPath('group123')).toBe('groups/group123/checkins');
  });

  it('builds path with date', () => {
    expect(buildGroupCheckinsPath('group123', '2024-01-15')).toBe(
      'groups/group123/checkins/2024-01-15'
    );
  });
});

describe('parseGroupShortCode', () => {
  it('parses simple short code', () => {
    expect(parseGroupShortCode('ABC123')).toBe('ABC123');
  });

  it('converts to uppercase', () => {
    expect(parseGroupShortCode('abc123')).toBe('ABC123');
  });

  it('trims whitespace', () => {
    expect(parseGroupShortCode('  ABC123  ')).toBe('ABC123');
  });

  it('extracts from URL', () => {
    expect(parseGroupShortCode('https://example.com?code=ABC123')).toBe('ABC123');
  });

  it('returns null for invalid format', () => {
    expect(parseGroupShortCode('AB')).toBeNull();
    expect(parseGroupShortCode('ABC-123')).toBeNull();
  });
});

describe('findGroupByShortCode', () => {
  const groups: AvailableGroups = {
    group1: { name: 'Group One', shortCode: 'ABC123' },
    group2: { name: 'Group Two', shortCode: 'XYZ789' },
  };

  it('finds group by short code', () => {
    const result = findGroupByShortCode('ABC123', groups);
    expect(result?.id).toBe('group1');
    expect(result?.name).toBe('Group One');
  });

  it('finds group case-insensitively', () => {
    const result = findGroupByShortCode('abc123', groups);
    expect(result?.id).toBe('group1');
  });

  it('returns null if not found', () => {
    expect(findGroupByShortCode('NOTFOUND', groups)).toBeNull();
  });
});

describe('findGroupByName', () => {
  const groups: AvailableGroups = {
    group1: { name: 'Tennis Club', shortCode: 'ABC123' },
    group2: { name: 'Morning Group', shortCode: 'XYZ789' },
  };

  it('finds group by name', () => {
    const result = findGroupByName('Tennis Club', groups);
    expect(result?.id).toBe('group1');
  });

  it('finds group case-insensitively', () => {
    const result = findGroupByName('tennis club', groups);
    expect(result?.id).toBe('group1');
  });

  it('returns null if not found', () => {
    expect(findGroupByName('Not Found', groups)).toBeNull();
  });
});

describe('getAvailableGroupsList', () => {
  it('converts to list format', () => {
    const groups: AvailableGroups = {
      group1: { name: 'Group One', shortCode: 'ABC123' },
      group2: { name: 'Group Two' },
    };
    const list = getAvailableGroupsList(groups);
    expect(list.length).toBe(2);
    expect(list[0]).toEqual({ id: 'group1', name: 'Group One', shortCode: 'ABC123' });
    expect(list[1]).toEqual({ id: 'group2', name: 'Group Two', shortCode: undefined });
  });
});

describe('sortGroupsByName', () => {
  it('sorts alphabetically', () => {
    const groups = [
      { id: '1', name: 'Zebra' },
      { id: '2', name: 'Alpha' },
      { id: '3', name: 'Mike' },
    ];
    const sorted = sortGroupsByName(groups);
    expect(sorted.map((g) => g.name)).toEqual(['Alpha', 'Mike', 'Zebra']);
  });

  it('sorts case-insensitively', () => {
    const groups = [
      { id: '1', name: 'zebra' },
      { id: '2', name: 'Alpha' },
    ];
    const sorted = sortGroupsByName(groups);
    expect(sorted.map((g) => g.name)).toEqual(['Alpha', 'zebra']);
  });
});

describe('groupExists', () => {
  const groups: AvailableGroups = {
    group1: { name: 'Group One' },
  };

  it('returns true if group exists', () => {
    expect(groupExists('group1', groups)).toBe(true);
  });

  it('returns false if group does not exist', () => {
    expect(groupExists('group2', groups)).toBe(false);
  });
});

describe('createDefaultGroupSettings', () => {
  it('creates settings with group name', () => {
    const settings = createDefaultGroupSettings('My Group');
    expect(settings.groupName).toBe('My Group');
  });

  it('creates empty members array', () => {
    const settings = createDefaultGroupSettings('My Group');
    expect(settings.members).toEqual([]);
  });

  it('creates default PINs', () => {
    const settings = createDefaultGroupSettings('My Group');
    expect(settings.groupPin).toMatch(/^\d{4}$/);
    expect(settings.adminPin).toMatch(/^\d{4}$/);
  });

  it('creates default location', () => {
    const settings = createDefaultGroupSettings('My Group');
    expect(settings.location).toBeDefined();
    expect(settings.location?.name).toBe('Los Gatos, CA');
  });
});

describe('generateDefaultPin', () => {
  it('generates 4-digit pin', () => {
    const pin = generateDefaultPin();
    expect(pin).toMatch(/^\d{4}$/);
  });

  it('generates pins >= 1000', () => {
    for (let i = 0; i < 100; i++) {
      const pin = parseInt(generateDefaultPin());
      expect(pin).toBeGreaterThanOrEqual(1000);
      expect(pin).toBeLessThan(10000);
    }
  });
});

describe('mergeGroupSettings', () => {
  const existing: GroupSettings = {
    groupName: 'Original',
    members: ['Alice'],
    memberDetails: { Alice: { phone: '123', addedBy: 'Admin', addedDate: Date.now() } },
    groupPin: '1234',
    adminPin: '5678',
  };

  it('merges simple properties', () => {
    const result = mergeGroupSettings(existing, { groupName: 'Updated' });
    expect(result.groupName).toBe('Updated');
    expect(result.groupPin).toBe('1234');
  });

  it('deep merges memberDetails', () => {
    const result = mergeGroupSettings(existing, {
      memberDetails: { Bob: { phone: '456', addedBy: 'Admin', addedDate: Date.now() } },
    });
    expect(result.memberDetails?.Alice).toBeDefined();
    expect(result.memberDetails?.Bob).toBeDefined();
  });

  it('preserves existing memberDetails when not in updates', () => {
    const result = mergeGroupSettings(existing, { groupName: 'Updated' });
    expect(result.memberDetails?.Alice).toBeDefined();
  });
});

describe('isGroupSettingsComplete', () => {
  it('returns true for complete settings', () => {
    const settings: Partial<GroupSettings> = {
      groupName: 'Group',
      groupPin: '1234',
      adminPin: '5678',
      members: ['Alice'],
    };
    expect(isGroupSettingsComplete(settings)).toBe(true);
  });

  it('returns false for missing groupName', () => {
    const settings: Partial<GroupSettings> = {
      groupPin: '1234',
      adminPin: '5678',
      members: ['Alice'],
    };
    expect(isGroupSettingsComplete(settings)).toBe(false);
  });

  it('returns false for missing groupPin', () => {
    const settings: Partial<GroupSettings> = {
      groupName: 'Group',
      adminPin: '5678',
      members: ['Alice'],
    };
    expect(isGroupSettingsComplete(settings)).toBe(false);
  });
});

describe('getGroupDisplayName', () => {
  const groups: AvailableGroups = {
    group1: { name: 'Tennis Club' },
  };

  it('returns group name if exists', () => {
    expect(getGroupDisplayName('group1', groups)).toBe('Tennis Club');
  });

  it('returns group ID as fallback', () => {
    expect(getGroupDisplayName('unknown', groups)).toBe('unknown');
  });
});

describe('buildGroupShareLink', () => {
  it('builds link with short code', () => {
    const link = buildGroupShareLink('https://example.com', 'ABC123');
    expect(link).toBe('https://example.com/?code=ABC123');
  });

  it('preserves existing path', () => {
    const link = buildGroupShareLink('https://example.com/app', 'ABC123');
    expect(link).toBe('https://example.com/app?code=ABC123');
  });
});
