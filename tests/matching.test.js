/**
 * Unit tests for match organization logic
 *
 * These tests cover all combinations documented in MATCHING_RULES.md
 * Run with: npm test
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
    organizeMatches,
    setUserPreferences,
    resetUserPreferences,
    timesOverlap,
    canPlayTogether
} from './matching.js';

// Helper to create a player check-in
function player(name, playStyle = 'both', options = {}) {
    return {
        name,
        playStyle,
        timestamp: options.timestamp ?? Date.now(),
        timeRange: options.timeRange ?? null,
        allowRotation: options.allowRotation ?? true,
        isGuest: options.isGuest ?? false,
        addedBy: options.addedBy ?? null
    };
}

// Helper to create players with sequential timestamps
function players(...specs) {
    return specs.map((spec, idx) => {
        if (typeof spec === 'string') {
            // Simple format: "Name:style" or just "Name"
            const [name, style] = spec.split(':');
            return player(name, style || 'both', { timestamp: idx + 1 });
        }
        // Object format with full options
        return player(spec.name, spec.playStyle || 'both', {
            ...spec,
            timestamp: spec.timestamp ?? idx + 1
        });
    });
}

describe('Match Organization', () => {
    beforeEach(() => {
        resetUserPreferences();
    });

    // ============================================
    // 1 PLAYER COMBINATIONS
    // ============================================
    describe('1 Player', () => {
        it('Either → Doubles (forming) - Need 3 more', () => {
            const checkins = players('Alice:both');
            const { matches } = organizeMatches(checkins);

            expect(matches).toHaveLength(1);
            expect(matches[0].type).toBe('doubles-forming');
            expect(matches[0].needed).toBe(3);
            expect(matches[0].players).toHaveLength(1);
        });

        it('Singles Only → Singles (forming) - Need 1 more', () => {
            const checkins = players('Alice:singles');
            const { matches } = organizeMatches(checkins);

            expect(matches).toHaveLength(1);
            expect(matches[0].type).toBe('singles-forming');
            expect(matches[0].needed).toBe(1);
        });

        it('Doubles Only → Doubles (forming) - Need 3 more', () => {
            const checkins = players('Alice:doubles');
            const { matches } = organizeMatches(checkins);

            expect(matches).toHaveLength(1);
            expect(matches[0].type).toBe('doubles-forming');
            expect(matches[0].needed).toBe(3);
        });
    });

    // ============================================
    // 2 PLAYER COMBINATIONS
    // ============================================
    describe('2 Players', () => {
        it('Either + Either → Doubles (forming) - Need 2 more', () => {
            const checkins = players('Alice:both', 'Bob:both');
            const { matches } = organizeMatches(checkins);

            expect(matches).toHaveLength(1);
            expect(matches[0].type).toBe('doubles-forming');
            expect(matches[0].needed).toBe(2);
            expect(matches[0].eitherCount).toBe(2);
            expect(matches[0].canPlaySingles).toBe(true);
        });

        it('Either + Singles Only → Doubles (forming) + Singles (forming)', () => {
            // Per doubles-first priority, Either player stays in doubles pool
            // Singles Only player waits for another singles player
            const checkins = players('Alice:both', 'Bob:singles');
            const { matches } = organizeMatches(checkins);

            const doublesForming = matches.find(m => m.type === 'doubles-forming');
            const singlesForming = matches.find(m => m.type === 'singles-forming');

            expect(doublesForming).toBeDefined();
            expect(doublesForming.needed).toBe(3);

            expect(singlesForming).toBeDefined();
            expect(singlesForming.needed).toBe(1);
        });

        it('Either + Doubles Only → Doubles (forming) - Need 2 more', () => {
            const checkins = players('Alice:both', 'Bob:doubles');
            const { matches } = organizeMatches(checkins);

            expect(matches).toHaveLength(1);
            expect(matches[0].type).toBe('doubles-forming');
            expect(matches[0].needed).toBe(2);
            expect(matches[0].eitherCount).toBe(1);
            // Only 1 Either player, so canPlaySingles should be false
            expect(matches[0].canPlaySingles).toBe(false);
        });

        it('Singles Only + Singles Only → Singles match', () => {
            const checkins = players('Alice:singles', 'Bob:singles');
            const { matches } = organizeMatches(checkins);

            expect(matches).toHaveLength(1);
            expect(matches[0].type).toBe('singles');
            expect(matches[0].players).toHaveLength(2);
        });

        it('Singles Only + Doubles Only → Singles (forming) + Doubles (forming)', () => {
            const checkins = players('Alice:singles', 'Bob:doubles');
            const { matches } = organizeMatches(checkins);

            expect(matches).toHaveLength(2);

            const singlesForming = matches.find(m => m.type === 'singles-forming');
            const doublesForming = matches.find(m => m.type === 'doubles-forming');

            expect(singlesForming).toBeDefined();
            expect(singlesForming.needed).toBe(1);

            expect(doublesForming).toBeDefined();
            expect(doublesForming.needed).toBe(3);
        });

        it('Doubles Only + Doubles Only → Doubles (forming) - Need 2 more', () => {
            const checkins = players('Alice:doubles', 'Bob:doubles');
            const { matches } = organizeMatches(checkins);

            expect(matches).toHaveLength(1);
            expect(matches[0].type).toBe('doubles-forming');
            expect(matches[0].needed).toBe(2);
            expect(matches[0].eitherCount).toBe(0);
        });
    });

    // ============================================
    // 3 PLAYER COMBINATIONS
    // ============================================
    describe('3 Players', () => {
        it('All Either → Doubles (forming) + can rotate if all allow rotation', () => {
            const checkins = players('Alice:both', 'Bob:both', 'Carol:both');
            const { matches } = organizeMatches(checkins);

            expect(matches).toHaveLength(1);
            expect(matches[0].type).toBe('doubles-forming');
            expect(matches[0].needed).toBe(1);
            expect(matches[0].canRotate).toBe(true);
        });

        it('All Either (one disallows rotation) → Doubles (forming) + cannot rotate', () => {
            const checkins = [
                player('Alice', 'both', { timestamp: 1, allowRotation: true }),
                player('Bob', 'both', { timestamp: 2, allowRotation: true }),
                player('Carol', 'both', { timestamp: 3, allowRotation: false })
            ];
            const { matches } = organizeMatches(checkins);

            expect(matches).toHaveLength(1);
            expect(matches[0].type).toBe('doubles-forming');
            expect(matches[0].canRotate).toBe(false);
        });

        it('2 Either + 1 Singles Only → Doubles (forming) + Singles (forming)', () => {
            const checkins = players('Alice:both', 'Bob:both', 'Carol:singles');
            const { matches } = organizeMatches(checkins);

            const doublesForming = matches.find(m => m.type === 'doubles-forming');
            const singlesForming = matches.find(m => m.type === 'singles-forming');

            expect(doublesForming).toBeDefined();
            expect(doublesForming.needed).toBe(2);

            expect(singlesForming).toBeDefined();
            expect(singlesForming.needed).toBe(1);
        });

        it('2 Either + 1 Doubles Only → Doubles (forming) - Need 1 more', () => {
            const checkins = players('Alice:both', 'Bob:both', 'Carol:doubles');
            const { matches } = organizeMatches(checkins);

            expect(matches).toHaveLength(1);
            expect(matches[0].type).toBe('doubles-forming');
            expect(matches[0].needed).toBe(1);
            expect(matches[0].players).toHaveLength(3);
        });

        it('1 Either + 2 Singles Only → Singles (first 2 by time) + Singles (forming)', () => {
            const checkins = players('Alice:both', 'Bob:singles', 'Carol:singles');
            const { matches } = organizeMatches(checkins);

            // Two Singles Only players should form a singles match
            const singlesMatch = matches.find(m => m.type === 'singles');
            expect(singlesMatch).toBeDefined();
            expect(singlesMatch.players.map(p => p.name)).toContain('Bob');
            expect(singlesMatch.players.map(p => p.name)).toContain('Carol');

            // Either player goes to doubles-forming
            const doublesForming = matches.find(m => m.type === 'doubles-forming');
            expect(doublesForming).toBeDefined();
            expect(doublesForming.players[0].name).toBe('Alice');
        });

        it('1 Either + 2 Doubles Only → Doubles (forming) - Need 1 more', () => {
            const checkins = players('Alice:both', 'Bob:doubles', 'Carol:doubles');
            const { matches } = organizeMatches(checkins);

            expect(matches).toHaveLength(1);
            expect(matches[0].type).toBe('doubles-forming');
            expect(matches[0].needed).toBe(1);
            expect(matches[0].players).toHaveLength(3);
        });

        it('All Singles Only → Singles (first 2) + Singles (forming)', () => {
            const checkins = players('Alice:singles', 'Bob:singles', 'Carol:singles');
            const { matches } = organizeMatches(checkins);

            const singlesMatch = matches.find(m => m.type === 'singles');
            const singlesForming = matches.find(m => m.type === 'singles-forming');

            expect(singlesMatch).toBeDefined();
            expect(singlesMatch.players).toHaveLength(2);

            expect(singlesForming).toBeDefined();
            expect(singlesForming.needed).toBe(1);
        });

        it('2 Singles Only + 1 Doubles Only → Singles + Doubles (forming)', () => {
            const checkins = players('Alice:singles', 'Bob:singles', 'Carol:doubles');
            const { matches } = organizeMatches(checkins);

            const singlesMatch = matches.find(m => m.type === 'singles');
            const doublesForming = matches.find(m => m.type === 'doubles-forming');

            expect(singlesMatch).toBeDefined();
            expect(singlesMatch.players).toHaveLength(2);

            expect(doublesForming).toBeDefined();
            expect(doublesForming.needed).toBe(3);
        });

        it('1 Singles Only + 2 Doubles Only → Doubles (forming) + Singles (forming)', () => {
            const checkins = players('Alice:singles', 'Bob:doubles', 'Carol:doubles');
            const { matches } = organizeMatches(checkins);

            const singlesForming = matches.find(m => m.type === 'singles-forming');
            const doublesForming = matches.find(m => m.type === 'doubles-forming');

            expect(singlesForming).toBeDefined();
            expect(singlesForming.needed).toBe(1);

            expect(doublesForming).toBeDefined();
            expect(doublesForming.needed).toBe(2);
        });

        it('All Doubles Only → Doubles (forming) - Need 1 more', () => {
            const checkins = players('Alice:doubles', 'Bob:doubles', 'Carol:doubles');
            const { matches } = organizeMatches(checkins);

            expect(matches).toHaveLength(1);
            expect(matches[0].type).toBe('doubles-forming');
            expect(matches[0].needed).toBe(1);
        });
    });

    // ============================================
    // 4+ PLAYER COMBINATIONS
    // ============================================
    describe('4+ Players', () => {
        it('4 Either → Complete doubles match', () => {
            const checkins = players('Alice:both', 'Bob:both', 'Carol:both', 'Dave:both');
            const { matches } = organizeMatches(checkins);

            expect(matches).toHaveLength(1);
            expect(matches[0].type).toBe('doubles');
            expect(matches[0].players).toHaveLength(4);
        });

        it('4 Doubles Only → Complete doubles match', () => {
            const checkins = players('Alice:doubles', 'Bob:doubles', 'Carol:doubles', 'Dave:doubles');
            const { matches } = organizeMatches(checkins);

            expect(matches).toHaveLength(1);
            expect(matches[0].type).toBe('doubles');
            expect(matches[0].players).toHaveLength(4);
        });

        it('5 Either → Doubles match + Doubles (forming)', () => {
            const checkins = players('A:both', 'B:both', 'C:both', 'D:both', 'E:both');
            const { matches } = organizeMatches(checkins);

            const doublesMatch = matches.find(m => m.type === 'doubles');
            const doublesForming = matches.find(m => m.type === 'doubles-forming');

            expect(doublesMatch).toBeDefined();
            expect(doublesMatch.players).toHaveLength(4);

            expect(doublesForming).toBeDefined();
            expect(doublesForming.needed).toBe(3);
        });

        it('8 Either → 2 complete doubles matches', () => {
            const checkins = players('A:both', 'B:both', 'C:both', 'D:both', 'E:both', 'F:both', 'G:both', 'H:both');
            const { matches } = organizeMatches(checkins);

            const doublesMatches = matches.filter(m => m.type === 'doubles');
            expect(doublesMatches).toHaveLength(2);
        });

        it('4 Either + 2 Singles Only → Doubles + Singles', () => {
            const checkins = players('A:both', 'B:both', 'C:both', 'D:both', 'E:singles', 'F:singles');
            const { matches } = organizeMatches(checkins);

            const doublesMatch = matches.find(m => m.type === 'doubles');
            const singlesMatch = matches.find(m => m.type === 'singles');

            expect(doublesMatch).toBeDefined();
            expect(singlesMatch).toBeDefined();
        });
    });

    // ============================================
    // FALLBACK MESSAGE CONDITIONS
    // ============================================
    describe('Fallback Messages for Doubles (forming)', () => {
        it('1 Either player alone → eitherCount=1, canPlaySingles=false', () => {
            const checkins = players('Alice:both');
            const { matches } = organizeMatches(checkins);

            expect(matches[0].type).toBe('doubles-forming');
            expect(matches[0].eitherCount).toBe(1);
            expect(matches[0].canPlaySingles).toBe(false);
            expect(matches[0].players).toHaveLength(1);
        });

        it('1 Either + 1 Doubles Only → eitherCount=1, canPlaySingles=false (no fallback)', () => {
            const checkins = players('Alice:both', 'Bob:doubles');
            const { matches } = organizeMatches(checkins);

            expect(matches[0].type).toBe('doubles-forming');
            expect(matches[0].eitherCount).toBe(1);
            expect(matches[0].canPlaySingles).toBe(false);
            // This ensures no "Can play singles" message shows
        });

        it('2 Either → eitherCount=2, canPlaySingles=true', () => {
            const checkins = players('Alice:both', 'Bob:both');
            const { matches } = organizeMatches(checkins);

            expect(matches[0].type).toBe('doubles-forming');
            expect(matches[0].eitherCount).toBe(2);
            expect(matches[0].canPlaySingles).toBe(true);
        });

        it('3 Either (all allow rotation) → canRotate=true', () => {
            const checkins = players('Alice:both', 'Bob:both', 'Carol:both');
            const { matches } = organizeMatches(checkins);

            expect(matches[0].type).toBe('doubles-forming');
            expect(matches[0].canRotate).toBe(true);
        });

        it('Only Doubles Only players → eitherCount=0, canPlaySingles=false', () => {
            const checkins = players('Alice:doubles', 'Bob:doubles');
            const { matches } = organizeMatches(checkins);

            expect(matches[0].type).toBe('doubles-forming');
            expect(matches[0].eitherCount).toBe(0);
            expect(matches[0].canPlaySingles).toBe(false);
        });
    });

    // ============================================
    // TIMESTAMP PRIORITY (FIRST-COME, FIRST-SERVED)
    // ============================================
    describe('Timestamp Priority', () => {
        it('First 4 players by timestamp form doubles', () => {
            const checkins = [
                player('Late', 'both', { timestamp: 100 }),
                player('First', 'both', { timestamp: 1 }),
                player('Third', 'both', { timestamp: 3 }),
                player('Second', 'both', { timestamp: 2 }),
                player('Fourth', 'both', { timestamp: 4 })
            ];
            const { matches } = organizeMatches(checkins);

            const doublesMatch = matches.find(m => m.type === 'doubles');
            const names = doublesMatch.players.map(p => p.name);

            expect(names).toContain('First');
            expect(names).toContain('Second');
            expect(names).toContain('Third');
            expect(names).toContain('Fourth');
            expect(names).not.toContain('Late');
        });
    });

    // ============================================
    // EXCLUSION PREFERENCES
    // ============================================
    describe('Exclusion Preferences', () => {
        it('Excluded players cannot form singles match', () => {
            setUserPreferences({
                'alice': { include: [], exclude: ['bob'] }
            });

            const checkins = players('Alice:singles', 'Bob:singles');
            const { matches } = organizeMatches(checkins);

            // Should not form a complete singles match
            const singlesMatch = matches.find(m => m.type === 'singles');
            expect(singlesMatch).toBeUndefined();

            // Both should be in singles-forming
            const singlesForming = matches.filter(m => m.type === 'singles-forming');
            expect(singlesForming).toHaveLength(2);
        });

        it('Mutual exclusion prevents pairing', () => {
            setUserPreferences({
                'alice': { include: [], exclude: ['bob'] },
                'bob': { include: [], exclude: ['alice'] }
            });

            const checkins = players('Alice:singles', 'Bob:singles');
            const { matches } = organizeMatches(checkins);

            const singlesMatch = matches.find(m => m.type === 'singles');
            expect(singlesMatch).toBeUndefined();
        });

        it('Exclusion affects canPlaySingles in doubles-forming', () => {
            setUserPreferences({
                'alice': { include: [], exclude: ['bob'] }
            });

            const checkins = players('Alice:both', 'Bob:both');
            const { matches } = organizeMatches(checkins);

            expect(matches[0].type).toBe('doubles-forming');
            expect(matches[0].canPlaySingles).toBe(false);
        });
    });

    // ============================================
    // TIME OVERLAP
    // ============================================
    describe('Time Overlap', () => {
        it('timesOverlap: both null → true', () => {
            expect(timesOverlap(null, null)).toBe(true);
        });

        it('timesOverlap: one null → true', () => {
            expect(timesOverlap({ start: '10:00', end: '12:00' }, null)).toBe(true);
            expect(timesOverlap(null, { start: '10:00', end: '12:00' })).toBe(true);
        });

        it('timesOverlap: overlapping ranges → true', () => {
            expect(timesOverlap(
                { start: '09:00', end: '11:00' },
                { start: '10:00', end: '12:00' }
            )).toBe(true);
        });

        it('timesOverlap: non-overlapping ranges → false', () => {
            expect(timesOverlap(
                { start: '09:00', end: '11:00' },
                { start: '12:00', end: '14:00' }
            )).toBe(false);
        });

        it('Non-overlapping times prevent singles pairing', () => {
            const checkins = [
                player('Alice', 'singles', { timestamp: 1, timeRange: { start: '09:00', end: '11:00' } }),
                player('Bob', 'singles', { timestamp: 2, timeRange: { start: '14:00', end: '17:00' } })
            ];
            const { matches } = organizeMatches(checkins);

            const singlesMatch = matches.find(m => m.type === 'singles');
            expect(singlesMatch).toBeUndefined();
        });

        it('Time conflict affects canPlaySingles in doubles-forming', () => {
            const checkins = [
                player('Alice', 'both', { timestamp: 1, timeRange: { start: '09:00', end: '11:00' } }),
                player('Bob', 'both', { timestamp: 2, timeRange: { start: '14:00', end: '17:00' } })
            ];
            const { matches } = organizeMatches(checkins);

            expect(matches[0].type).toBe('doubles-forming');
            expect(matches[0].canPlaySingles).toBe(false);
        });

        it('Time conflict affects canRotate for 3 players', () => {
            const checkins = [
                player('Alice', 'both', { timestamp: 1, timeRange: { start: '09:00', end: '11:00' } }),
                player('Bob', 'both', { timestamp: 2, timeRange: null }),
                player('Carol', 'both', { timestamp: 3, timeRange: { start: '14:00', end: '17:00' } })
            ];
            const { matches } = organizeMatches(checkins);

            expect(matches[0].type).toBe('doubles-forming');
            expect(matches[0].canRotate).toBe(false);
        });
    });

    // ============================================
    // PROVISIONAL SINGLES INDICATOR
    // ============================================
    describe('Provisional Singles', () => {
        it('2 Either players forming doubles can fall back to singles', () => {
            // When 2 Either players are in doubles-forming, they can play singles
            // This is indicated by canPlaySingles flag
            const checkins = players('Alice:both', 'Bob:both');
            const { matches } = organizeMatches(checkins);

            expect(matches[0].type).toBe('doubles-forming');
            expect(matches[0].canPlaySingles).toBe(true);
        });
    });
});
