import { describe, it, expect } from 'vitest';
import {
  findMemberByName,
  isMember,
  getMemberDetails,
  getMemberContact,
  sortMembersAlphabetically,
  sortMembersByCheckinStatus,
  isMemberCheckedIn,
  getMemberCheckin,
  getMembersNotCheckedIn,
  addMemberToList,
  removeMemberFromList,
  updateMemberDetails,
  removeMemberDetails,
  getMemberCount,
  getMembersAddedBy,
  renameMemberInList,
  transferMemberDetails,
  updateCheckinNames,
  isDuplicateName,
  validateMemberName,
} from '../utils/members';
import type { MemberDetailsMap, CheckinData } from '../types';

const createCheckin = (name: string): CheckinData => ({
  name,
  playStyle: 'both',
  timestamp: Date.now(),
});

describe('findMemberByName', () => {
  it('finds member case-insensitively', () => {
    const members = ['Alice', 'Bob', 'Charlie'];
    expect(findMemberByName('alice', members)).toBe('Alice');
    expect(findMemberByName('ALICE', members)).toBe('Alice');
  });

  it('returns null if not found', () => {
    const members = ['Alice', 'Bob'];
    expect(findMemberByName('Charlie', members)).toBeNull();
  });
});

describe('isMember', () => {
  it('checks membership case-insensitively', () => {
    const members = ['Alice', 'Bob'];
    expect(isMember('Alice', members)).toBe(true);
    expect(isMember('alice', members)).toBe(true);
    expect(isMember('Charlie', members)).toBe(false);
  });
});

describe('getMemberDetails', () => {
  it('gets details by normalized name', () => {
    const details: MemberDetailsMap = {
      alice: { addedBy: 'Bob', addedDate: 1000, phone: '555-1234' },
    };
    const result = getMemberDetails('Alice', details);
    expect(result?.phone).toBe('555-1234');
  });

  it('returns null if not found', () => {
    const details: MemberDetailsMap = {};
    expect(getMemberDetails('Alice', details)).toBeNull();
  });
});

describe('getMemberContact', () => {
  it('returns contact info', () => {
    const details: MemberDetailsMap = {
      alice: { addedBy: 'Bob', addedDate: 1000, phone: '555-1234', email: 'alice@example.com' },
    };
    const result = getMemberContact('Alice', details);
    expect(result?.phone).toBe('555-1234');
    expect(result?.email).toBe('alice@example.com');
  });

  it('returns null if member not found', () => {
    expect(getMemberContact('Unknown', {})).toBeNull();
  });
});

describe('sortMembersAlphabetically', () => {
  it('sorts members alphabetically', () => {
    const members = ['Charlie', 'Alice', 'Bob'];
    const result = sortMembersAlphabetically(members);
    expect(result).toEqual(['Alice', 'Bob', 'Charlie']);
  });

  it('does not mutate original array', () => {
    const members = ['Charlie', 'Alice'];
    sortMembersAlphabetically(members);
    expect(members[0]).toBe('Charlie');
  });
});

describe('sortMembersByCheckinStatus', () => {
  it('puts checked-in members first', () => {
    const members = ['Alice', 'Bob', 'Charlie'];
    const checkins = [createCheckin('Bob')];
    const result = sortMembersByCheckinStatus(members, checkins);
    expect(result[0]).toBe('Bob');
  });

  it('maintains alphabetical order within groups', () => {
    const members = ['Diana', 'Alice', 'Bob', 'Charlie'];
    const checkins = [createCheckin('Diana'), createCheckin('Bob')];
    const result = sortMembersByCheckinStatus(members, checkins);
    expect(result.slice(0, 2)).toEqual(['Bob', 'Diana']); // Checked in, alphabetical
    expect(result.slice(2)).toEqual(['Alice', 'Charlie']); // Not checked in, alphabetical
  });
});

describe('isMemberCheckedIn', () => {
  it('returns true if member is checked in', () => {
    const checkins = [createCheckin('Alice'), createCheckin('Bob')];
    expect(isMemberCheckedIn('Alice', checkins)).toBe(true);
    expect(isMemberCheckedIn('alice', checkins)).toBe(true);
  });

  it('returns false if member is not checked in', () => {
    const checkins = [createCheckin('Alice')];
    expect(isMemberCheckedIn('Bob', checkins)).toBe(false);
  });
});

describe('getMemberCheckin', () => {
  it('returns checkin data for member', () => {
    const checkins = [
      { ...createCheckin('Alice'), playStyle: 'doubles' as const },
      createCheckin('Bob'),
    ];
    const result = getMemberCheckin('Alice', checkins);
    expect(result?.playStyle).toBe('doubles');
  });

  it('returns null if not checked in', () => {
    const checkins = [createCheckin('Alice')];
    expect(getMemberCheckin('Bob', checkins)).toBeNull();
  });
});

describe('getMembersNotCheckedIn', () => {
  it('returns members not in checkins', () => {
    const members = ['Alice', 'Bob', 'Charlie'];
    const checkins = [createCheckin('Alice')];
    const result = getMembersNotCheckedIn(members, checkins);
    expect(result).toEqual(['Bob', 'Charlie']);
  });
});

describe('addMemberToList', () => {
  it('adds member if not present', () => {
    const members = ['Alice'];
    const result = addMemberToList('Bob', members);
    expect(result).toContain('Bob');
    expect(result.length).toBe(2);
  });

  it('does not add duplicate', () => {
    const members = ['Alice', 'Bob'];
    const result = addMemberToList('alice', members);
    expect(result.length).toBe(2);
  });
});

describe('removeMemberFromList', () => {
  it('removes member case-insensitively', () => {
    const members = ['Alice', 'Bob', 'Charlie'];
    const result = removeMemberFromList('bob', members);
    expect(result).toEqual(['Alice', 'Charlie']);
  });

  it('returns same array if member not found', () => {
    const members = ['Alice', 'Bob'];
    const result = removeMemberFromList('Charlie', members);
    expect(result).toEqual(['Alice', 'Bob']);
  });
});

describe('updateMemberDetails', () => {
  it('updates existing member details', () => {
    const details: MemberDetailsMap = {
      alice: { addedBy: 'Bob', addedDate: 1000 },
    };
    const result = updateMemberDetails('Alice', { phone: '555-1234' }, details);
    expect(result.alice.phone).toBe('555-1234');
    expect(result.alice.addedBy).toBe('Bob');
  });

  it('creates new entry if not exists', () => {
    const details: MemberDetailsMap = {};
    const result = updateMemberDetails('Alice', { phone: '555-1234' }, details);
    expect(result.alice.phone).toBe('555-1234');
  });
});

describe('removeMemberDetails', () => {
  it('removes member details', () => {
    const details: MemberDetailsMap = {
      alice: { addedBy: 'Bob', addedDate: 1000 },
      bob: { addedBy: 'Alice', addedDate: 2000 },
    };
    const result = removeMemberDetails('Alice', details);
    expect(result.alice).toBeUndefined();
    expect(result.bob).toBeDefined();
  });
});

describe('getMemberCount', () => {
  it('returns member count', () => {
    expect(getMemberCount(['Alice', 'Bob', 'Charlie'])).toBe(3);
    expect(getMemberCount([])).toBe(0);
  });
});

describe('getMembersAddedBy', () => {
  it('returns members added by specific person', () => {
    const details: MemberDetailsMap = {
      alice: { addedBy: 'Admin', addedDate: 1000 },
      bob: { addedBy: 'Admin', addedDate: 2000 },
      charlie: { addedBy: 'Alice', addedDate: 3000 },
    };
    const result = getMembersAddedBy('Admin', details);
    expect(result).toContain('alice');
    expect(result).toContain('bob');
    expect(result).not.toContain('charlie');
  });
});

describe('renameMemberInList', () => {
  it('renames member and re-sorts alphabetically', () => {
    const members = ['Alice', 'Bob', 'Charlie'];
    const result = renameMemberInList('Alice', 'Zara', members);
    expect(result).toEqual(['Bob', 'Charlie', 'Zara']);
  });

  it('returns same array if new name is empty', () => {
    const members = ['Alice', 'Bob'];
    const result = renameMemberInList('Alice', '', members);
    expect(result).toBe(members);
  });

  it('returns same array if new name equals old name', () => {
    const members = ['Alice', 'Bob'];
    const result = renameMemberInList('Alice', 'Alice', members);
    expect(result).toBe(members);
  });

  it('trims whitespace from new name', () => {
    const members = ['Alice', 'Bob'];
    const result = renameMemberInList('Alice', '  Zara  ', members);
    expect(result).toContain('Zara');
    expect(result).not.toContain('  Zara  ');
  });

  it('handles member not in list', () => {
    const members = ['Alice', 'Bob'];
    const result = renameMemberInList('Charlie', 'David', members);
    expect(result).toEqual(['Alice', 'Bob']);
  });
});

describe('transferMemberDetails', () => {
  it('moves details from old name to new name', () => {
    const details: MemberDetailsMap = {
      Alice: { addedBy: 'Admin', addedDate: 1000, phone: '555-1234' },
      Bob: { addedBy: 'Admin', addedDate: 2000 },
    };
    const result = transferMemberDetails('Alice', 'Zara', details);
    expect(result.Zara).toBeDefined();
    expect(result.Zara.phone).toBe('555-1234');
    expect(result.Alice).toBeUndefined();
    expect(result.Bob).toBeDefined();
  });

  it('returns same object if new name is empty', () => {
    const details: MemberDetailsMap = {
      Alice: { addedBy: 'Admin', addedDate: 1000 },
    };
    const result = transferMemberDetails('Alice', '', details);
    expect(result).toBe(details);
  });

  it('returns same object if new name equals old name', () => {
    const details: MemberDetailsMap = {
      Alice: { addedBy: 'Admin', addedDate: 1000 },
    };
    const result = transferMemberDetails('Alice', 'Alice', details);
    expect(result).toBe(details);
  });

  it('handles member not in details', () => {
    const details: MemberDetailsMap = {
      Bob: { addedBy: 'Admin', addedDate: 1000 },
    };
    const result = transferMemberDetails('Alice', 'Zara', details);
    expect(result.Zara).toBeUndefined();
    expect(result.Bob).toBeDefined();
  });
});

describe('updateCheckinNames', () => {
  it('updates checkin names from old to new', () => {
    const checkins: CheckinData[] = [
      createCheckin('Alice'),
      createCheckin('Bob'),
      createCheckin('Alice'),
    ];
    const result = updateCheckinNames('Alice', 'Zara', checkins);
    expect(result[0].name).toBe('Zara');
    expect(result[1].name).toBe('Bob');
    expect(result[2].name).toBe('Zara');
  });

  it('returns same array if new name is empty', () => {
    const checkins = [createCheckin('Alice')];
    const result = updateCheckinNames('Alice', '', checkins);
    expect(result).toBe(checkins);
  });

  it('returns same array if new name equals old name', () => {
    const checkins = [createCheckin('Alice')];
    const result = updateCheckinNames('Alice', 'Alice', checkins);
    expect(result).toBe(checkins);
  });

  it('preserves other checkin properties', () => {
    const checkins: CheckinData[] = [
      { ...createCheckin('Alice'), playStyle: 'doubles', allowRotation: true },
    ];
    const result = updateCheckinNames('Alice', 'Zara', checkins);
    expect(result[0].name).toBe('Zara');
    expect(result[0].playStyle).toBe('doubles');
    expect(result[0].allowRotation).toBe(true);
  });
});

describe('isDuplicateName', () => {
  it('returns true for duplicate name (case-insensitive)', () => {
    const members = ['Alice', 'Bob'];
    expect(isDuplicateName('alice', members)).toBe(true);
    expect(isDuplicateName('ALICE', members)).toBe(true);
    expect(isDuplicateName('Alice', members)).toBe(true);
  });

  it('returns false for unique name', () => {
    const members = ['Alice', 'Bob'];
    expect(isDuplicateName('Charlie', members)).toBe(false);
  });

  it('excludes specified name from check', () => {
    const members = ['Alice', 'Bob'];
    expect(isDuplicateName('Alice', members, 'Alice')).toBe(false);
  });

  it('still detects duplicates when excluding different name', () => {
    const members = ['Alice', 'Bob'];
    expect(isDuplicateName('Alice', members, 'Bob')).toBe(true);
  });
});

describe('validateMemberName', () => {
  const existingMembers = ['Alice', 'Bob', 'Charlie'];

  it('returns null for valid unique name', () => {
    expect(validateMemberName('David', existingMembers)).toBeNull();
  });

  it('returns error for empty name', () => {
    expect(validateMemberName('', existingMembers)).toBe('Name cannot be empty');
    expect(validateMemberName('   ', existingMembers)).toBe('Name cannot be empty');
  });

  it('returns error for name too short', () => {
    expect(validateMemberName('A', existingMembers)).toBe('Name must be at least 2 characters');
  });

  it('returns error for name too long', () => {
    const longName = 'A'.repeat(51);
    expect(validateMemberName(longName, existingMembers)).toBe(
      'Name must be less than 50 characters'
    );
  });

  it('returns error for duplicate name', () => {
    expect(validateMemberName('Alice', existingMembers)).toBe(
      'A member with this name already exists'
    );
    expect(validateMemberName('alice', existingMembers)).toBe(
      'A member with this name already exists'
    );
  });

  it('allows renaming to same name (with excludeName)', () => {
    expect(validateMemberName('Alice', existingMembers, 'Alice')).toBeNull();
  });

  it('still detects duplicates when renaming to existing name', () => {
    expect(validateMemberName('Bob', existingMembers, 'Alice')).toBe(
      'A member with this name already exists'
    );
  });
});
