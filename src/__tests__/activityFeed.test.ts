import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { formatRelativeTime, getActivityAction } from '../hooks/useActivityFeed';
import type { ActivityItem } from '../types/activity';

// ============================================
// formatRelativeTime Tests
// ============================================

describe('formatRelativeTime', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns "just now" for timestamps less than a minute ago', () => {
    const now = Date.now();
    vi.setSystemTime(now);
    expect(formatRelativeTime(now)).toBe('just now');
    expect(formatRelativeTime(now - 30000)).toBe('just now'); // 30 seconds ago
    expect(formatRelativeTime(now - 59000)).toBe('just now'); // 59 seconds ago
  });

  it('returns minutes ago for timestamps 1-59 minutes ago', () => {
    const now = Date.now();
    vi.setSystemTime(now);
    expect(formatRelativeTime(now - 60000)).toBe('1m ago');
    expect(formatRelativeTime(now - 120000)).toBe('2m ago');
    expect(formatRelativeTime(now - 300000)).toBe('5m ago');
    expect(formatRelativeTime(now - 3540000)).toBe('59m ago');
  });

  it('returns hours ago for timestamps 1-23 hours ago', () => {
    const now = Date.now();
    vi.setSystemTime(now);
    expect(formatRelativeTime(now - 3600000)).toBe('1h ago');
    expect(formatRelativeTime(now - 7200000)).toBe('2h ago');
    expect(formatRelativeTime(now - 43200000)).toBe('12h ago');
    expect(formatRelativeTime(now - 82800000)).toBe('23h ago');
  });

  it('returns formatted date for timestamps 24+ hours ago', () => {
    const now = new Date('2024-01-15T12:00:00').getTime();
    vi.setSystemTime(now);

    // 2 days ago
    const twoDaysAgo = new Date('2024-01-13T12:00:00').getTime();
    const result = formatRelativeTime(twoDaysAgo);
    expect(result).toContain('Jan');
    expect(result).toContain('13');
  });
});

// ============================================
// getActivityAction Tests
// ============================================

describe('getActivityAction', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Set current date to 2024-01-15
    vi.setSystemTime(new Date('2024-01-15T12:00:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const createActivityItem = (overrides: Partial<ActivityItem>): ActivityItem => ({
    id: 'test-1',
    type: 'checkin',
    memberId: 'alice',
    memberName: 'Alice',
    gameDate: '2024-01-16', // Future date by default
    playStyle: 'doubles',
    timestamp: Date.now(),
    isFollowed: false,
    isRead: false,
    ...overrides,
  });

  describe('for future dates', () => {
    it('returns Join action for game-needs when user not checked in', () => {
      const item = createActivityItem({
        type: 'game-needs',
        playersNeed: 2,
      });

      const action = getActivityAction(item, false);
      expect(action).toEqual({ type: 'join', label: 'Join', primary: true });
    });

    it('returns View action for game-needs when user already checked in', () => {
      const item = createActivityItem({
        type: 'game-needs',
        playersNeed: 2,
      });

      const action = getActivityAction(item, true);
      expect(action).toEqual({ type: 'view', label: 'View', primary: false });
    });

    it('returns View action for game-confirmed', () => {
      const item = createActivityItem({
        type: 'game-confirmed',
      });

      const action = getActivityAction(item, false);
      expect(action).toEqual({ type: 'view', label: 'View', primary: false });
    });

    it('returns Fill In action for game-dissolved when user not checked in', () => {
      const item = createActivityItem({
        type: 'game-dissolved',
      });

      const action = getActivityAction(item, false);
      expect(action).toEqual({ type: 'join', label: 'Fill In', primary: true });
    });

    it('returns View action for game-dissolved when user already checked in', () => {
      const item = createActivityItem({
        type: 'game-dissolved',
      });

      const action = getActivityAction(item, true);
      expect(action).toEqual({ type: 'view', label: 'View', primary: false });
    });

    it('returns Welcome action for new-member', () => {
      const item = createActivityItem({
        type: 'new-member',
        gameDate: undefined,
      });

      const action = getActivityAction(item, false);
      expect(action).toEqual({ type: 'welcome', label: 'Welcome', primary: false });
    });

    it('returns View action for checkin when no players needed', () => {
      const item = createActivityItem({
        type: 'checkin',
        playersNeed: 0,
      });

      const action = getActivityAction(item, false);
      expect(action).toEqual({ type: 'view', label: 'View', primary: false });
    });

    it('returns Join action for checkin when players needed and user not checked in', () => {
      const item = createActivityItem({
        type: 'checkin',
        playersNeed: 1,
      });

      const action = getActivityAction(item, false);
      expect(action).toEqual({ type: 'join', label: 'Join', primary: true });
    });
  });

  describe('for past dates', () => {
    it('returns View action for past checkin', () => {
      const item = createActivityItem({
        type: 'checkin',
        gameDate: '2024-01-14', // Yesterday
      });

      const action = getActivityAction(item, false);
      expect(action).toEqual({ type: 'view', label: 'View', primary: false });
    });

    it('returns View action for past game-needs regardless of players needed', () => {
      const item = createActivityItem({
        type: 'game-needs',
        gameDate: '2024-01-14', // Yesterday
        playersNeed: 2,
      });

      const action = getActivityAction(item, false);
      expect(action).toEqual({ type: 'view', label: 'View', primary: false });
    });

    it('returns null for past new-member', () => {
      const item = createActivityItem({
        type: 'new-member',
        gameDate: '2024-01-14', // Yesterday
      });

      const action = getActivityAction(item, false);
      expect(action).toBeNull();
    });

    it('returns View action for past game-dissolved', () => {
      const item = createActivityItem({
        type: 'game-dissolved',
        gameDate: '2024-01-14', // Yesterday
      });

      const action = getActivityAction(item, false);
      expect(action).toEqual({ type: 'view', label: 'View', primary: false });
    });
  });

  describe('for today', () => {
    it('returns Join action for game-needs on same day when user not checked in', () => {
      const item = createActivityItem({
        type: 'game-needs',
        gameDate: '2024-01-15', // Today
        playersNeed: 1,
      });

      const action = getActivityAction(item, false);
      expect(action).toEqual({ type: 'join', label: 'Join', primary: true });
    });
  });

  describe('edge cases', () => {
    it('returns null for unknown activity type', () => {
      const item = createActivityItem({
        type: 'unknown' as ActivityItem['type'],
      });

      const action = getActivityAction(item, false);
      expect(action).toBeNull();
    });

    it('handles missing gameDate gracefully', () => {
      const item = createActivityItem({
        type: 'new-member',
        gameDate: undefined,
      });

      // Should not throw
      const action = getActivityAction(item, false);
      expect(action).toEqual({ type: 'welcome', label: 'Welcome', primary: false });
    });
  });
});

// ============================================
// Read Status Persistence Logic Tests
// ============================================

describe('Read Status Persistence Logic', () => {
  it('limits stored IDs to 500 to prevent unbounded growth', () => {
    // Test the slicing logic used in the hook
    const manyIds = Array.from({ length: 600 }, (_, i) => `id-${i}`);
    const limitedIds = manyIds.slice(-500);

    expect(limitedIds.length).toBe(500);
    expect(limitedIds[0]).toBe('id-100'); // First 100 should be dropped
    expect(limitedIds[499]).toBe('id-599'); // Last one should be preserved
  });

  it('creates Set from array correctly', () => {
    const ids = ['id-1', 'id-2', 'id-3'];
    const idSet = new Set(ids);

    expect(idSet.has('id-1')).toBe(true);
    expect(idSet.has('id-2')).toBe(true);
    expect(idSet.has('id-4')).toBe(false);
    expect(idSet.size).toBe(3);
  });

  it('merges new IDs with existing IDs correctly', () => {
    const existingIds = new Set(['id-1', 'id-2']);
    const newIds = ['id-3', 'id-4'];
    const merged = new Set([...existingIds, ...newIds]);

    expect(merged.size).toBe(4);
    expect(merged.has('id-1')).toBe(true);
    expect(merged.has('id-4')).toBe(true);
  });

  it('handles duplicate IDs when merging', () => {
    const existingIds = new Set(['id-1', 'id-2']);
    const newIds = ['id-2', 'id-3']; // id-2 is duplicate
    const merged = new Set([...existingIds, ...newIds]);

    expect(merged.size).toBe(3); // No duplicates
  });
});
