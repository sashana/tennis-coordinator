import { describe, it, expect } from 'vitest';

/**
 * Tests for Admin Features
 * - Group Insights
 * - Activity History Management
 * - Member Game Viewing
 */

describe('Admin Features', () => {
  describe('Group Insights', () => {
    describe('Activity Count Calculations', () => {
      it('counts unique active players from check-ins', () => {
        const checkins = {
          '2024-01-15': [
            { name: 'Alice', playStyle: 'both' },
            { name: 'Bob', playStyle: 'doubles' },
            { name: 'Alice', playStyle: 'singles' }, // Duplicate - should only count once
          ],
          '2024-01-16': [
            { name: 'Charlie', playStyle: 'both' },
            { name: 'Bob', playStyle: 'doubles' },
          ],
        };

        const uniquePlayers = new Set<string>();
        Object.values(checkins).forEach(dateCheckins => {
          dateCheckins.forEach(c => uniquePlayers.add(c.name));
        });

        expect(uniquePlayers.size).toBe(3); // Alice, Bob, Charlie
      });

      it('calculates check-in count per day', () => {
        const checkins = {
          '2024-01-15': [
            { name: 'Alice', playStyle: 'both' },
            { name: 'Bob', playStyle: 'doubles' },
          ],
          '2024-01-16': [
            { name: 'Charlie', playStyle: 'both' },
          ],
        };

        const counts = Object.entries(checkins).map(([date, c]) => ({
          date,
          count: c.length,
        }));

        expect(counts).toEqual([
          { date: '2024-01-15', count: 2 },
          { date: '2024-01-16', count: 1 },
        ]);
      });
    });

    describe('Play Style Distribution', () => {
      it('calculates play style percentages', () => {
        const checkins = [
          { name: 'Alice', playStyle: 'both' },
          { name: 'Bob', playStyle: 'doubles' },
          { name: 'Charlie', playStyle: 'singles' },
          { name: 'Dana', playStyle: 'both' },
        ];

        const counts = { singles: 0, doubles: 0, both: 0 };
        checkins.forEach(c => {
          counts[c.playStyle as keyof typeof counts]++;
        });

        const total = checkins.length;
        const percentages = {
          singles: (counts.singles / total) * 100,
          doubles: (counts.doubles / total) * 100,
          both: (counts.both / total) * 100,
        };

        expect(percentages.singles).toBe(25);
        expect(percentages.doubles).toBe(25);
        expect(percentages.both).toBe(50);
      });
    });

    describe('Recent Activity Summary', () => {
      it('groups activity by type', () => {
        const activities = [
          { action: 'checkin', player: 'Alice', timestamp: 1000 },
          { action: 'removal', player: 'Bob', timestamp: 2000 },
          { action: 'checkin', player: 'Charlie', timestamp: 3000 },
          { action: 'member_added', player: 'Dana', timestamp: 4000 },
        ];

        const grouped: Record<string, number> = {};
        activities.forEach(a => {
          grouped[a.action] = (grouped[a.action] || 0) + 1;
        });

        expect(grouped.checkin).toBe(2);
        expect(grouped.removal).toBe(1);
        expect(grouped.member_added).toBe(1);
      });
    });
  });

  describe('Activity History Management', () => {
    describe('Activity Deletion', () => {
      it('constructs correct Firebase path for deletion', () => {
        const groupId = 'test-group';
        const date = '2024-01-15';
        const firebaseKey = '-NaBC123xyz';

        const path = `groups/${groupId}/activity/${date}/${firebaseKey}`;
        expect(path).toBe('groups/test-group/activity/2024-01-15/-NaBC123xyz');
      });

      it('filters out deleted activity from list', () => {
        const activities = [
          { date: '2024-01-15', firebaseKey: 'key1', action: 'checkin', player: 'Alice' },
          { date: '2024-01-15', firebaseKey: 'key2', action: 'removal', player: 'Bob' },
          { date: '2024-01-16', firebaseKey: 'key3', action: 'checkin', player: 'Charlie' },
        ];

        const toDelete = { date: '2024-01-15', firebaseKey: 'key2' };

        const filtered = activities.filter(
          a => !(a.date === toDelete.date && a.firebaseKey === toDelete.firebaseKey)
        );

        expect(filtered.length).toBe(2);
        expect(filtered.find(a => a.firebaseKey === 'key2')).toBeUndefined();
      });
    });

    describe('Activity Filtering', () => {
      it('filters by action category', () => {
        const activities = [
          { action: 'checkin', player: 'Alice' },
          { action: 'check-in', player: 'Bob' },
          { action: 'removal', player: 'Charlie' },
          { action: 'member_added', player: 'Dana' },
          { action: 'whatsapp_share', player: 'Eve' },
        ];

        const filterConfig = {
          checkin: { actions: ['check-in', 'checkin'] },
          removal: { actions: ['removal'] },
          members: { actions: ['member_added', 'member_removed'] },
        };

        // Filter for check-ins only
        const allowedActions = new Set(filterConfig.checkin.actions);
        const filtered = activities.filter(a => allowedActions.has(a.action));

        expect(filtered.length).toBe(2);
        expect(filtered.map(a => a.player)).toEqual(['Alice', 'Bob']);
      });
    });
  });

  describe('Admin Member Game Viewing', () => {
    describe('Admin Authentication', () => {
      it('validates admin status from session storage pattern', () => {
        // Simulate the admin check function logic
        const isGroupAdmin = (groupId: string, storage: Record<string, string>): boolean => {
          return storage[`adminAuth_${groupId}`] === 'true';
        };

        const storage = {
          'adminAuth_group1': 'true',
          'adminAuth_group2': 'false',
        };

        expect(isGroupAdmin('group1', storage)).toBe(true);
        expect(isGroupAdmin('group2', storage)).toBe(false);
        expect(isGroupAdmin('group3', storage)).toBe(false);
      });
    });

    describe('User Schedule Computation', () => {
      it('computes schedule for viewing user when set', () => {
        const sessionUser = 'Alice';
        const viewingUser = 'Bob';

        // Logic: use viewingUser if set, otherwise sessionUser
        const currentViewUser = viewingUser || sessionUser;

        expect(currentViewUser).toBe('Bob');
      });

      it('falls back to session user when viewing user is null', () => {
        const sessionUser = 'Alice';
        const viewingUser = null;

        const currentViewUser = viewingUser || sessionUser;

        expect(currentViewUser).toBe('Alice');
      });

      it('filters members excluding self in dropdown', () => {
        const coreMembers = ['Alice', 'Bob', 'Charlie', 'Dana'];
        const sessionUser = 'Alice';

        const filteredMembers = coreMembers.filter(m => m !== sessionUser);

        expect(filteredMembers).toEqual(['Bob', 'Charlie', 'Dana']);
        expect(filteredMembers).not.toContain('Alice');
      });
    });

    describe('Other Players Display', () => {
      it('filters out current view user from match players', () => {
        const matchPlayers = [
          { name: 'Alice', timeRange: { start: '09:00', end: '12:00' } },
          { name: 'Bob', timeRange: { start: '10:00', end: '14:00' } },
          { name: 'Charlie' },
        ];

        const currentViewUser = 'Bob';

        const normalizeName = (name: string) => name.toLowerCase();
        const otherPlayers = matchPlayers.filter(
          p => normalizeName(p.name) !== normalizeName(currentViewUser)
        );

        expect(otherPlayers.length).toBe(2);
        expect(otherPlayers.map(p => p.name)).toEqual(['Alice', 'Charlie']);
      });
    });
  });
});

describe('UI Helper Functions', () => {
  describe('Activity Icons', () => {
    it('returns correct icon for each action type', () => {
      const getActivityIcon = (action: string): string => {
        switch (action) {
          case 'check-in':
          case 'checkin':
            return '✅';
          case 'removal':
            return '❌';
          case 'member_added':
            return '👤';
          case 'member_removed':
            return '🚫';
          case 'member_renamed':
            return '✏️';
          case 'whatsapp_share':
            return '📤';
          case 'notes_saved':
          case 'note_added':
            return '📝';
          case 'note_updated':
            return '✏️';
          case 'note_removed':
            return '🗑️';
          case 'user_login':
            return '🔓';
          default:
            return '📋';
        }
      };

      expect(getActivityIcon('checkin')).toBe('✅');
      expect(getActivityIcon('check-in')).toBe('✅');
      expect(getActivityIcon('removal')).toBe('❌');
      expect(getActivityIcon('member_added')).toBe('👤');
      expect(getActivityIcon('whatsapp_share')).toBe('📤');
      expect(getActivityIcon('unknown_action')).toBe('📋');
    });
  });

  describe('Preference Labels', () => {
    it('returns correct labels for play styles', () => {
      const getPreferenceLabel = (playStyle: string): string => {
        switch (playStyle) {
          case 'singles': return 'Singles';
          case 'doubles': return 'Doubles';
          default: return 'Either';
        }
      };

      expect(getPreferenceLabel('singles')).toBe('Singles');
      expect(getPreferenceLabel('doubles')).toBe('Doubles');
      expect(getPreferenceLabel('both')).toBe('Either');
    });
  });
});
