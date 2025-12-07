/**
 * MATCHING LOGIC - EXTRACTED FOR TESTING
 *
 * ⚠️  IMPORTANT: This is a COPY of the matching logic from index.html
 *     If you modify organizeMatches() in index.html, you MUST update this file too!
 *
 *     Source: index.html lines ~3873-4041
 *     Last synced: 2025-12-06
 *
 * This module is used for unit testing only. The actual app uses the code in index.html.
 */

// Simulated user preferences storage for testing
let userPreferences = {};

/**
 * Set user preferences for testing
 * @param {Object} prefs - Map of normalized name to { include: [], exclude: [] }
 */
export function setUserPreferences(prefs) {
    userPreferences = prefs;
}

/**
 * Reset user preferences
 */
export function resetUserPreferences() {
    userPreferences = {};
}

/**
 * Normalize a player name for comparison
 */
function normalizeName(name) {
    return name.toLowerCase().trim();
}

/**
 * Get user preferences for a player
 */
function getUserPrefs(name) {
    return userPreferences[normalizeName(name)] || { include: [], exclude: [] };
}

/**
 * Check if two players can play together (exclusion check only)
 */
function canPlayTogether(name1, name2) {
    const prefs1 = getUserPrefs(name1);
    const prefs2 = getUserPrefs(name2);
    const n1 = normalizeName(name1);
    const n2 = normalizeName(name2);

    return !prefs1.exclude.includes(n2) && !prefs2.exclude.includes(n1);
}

/**
 * Check if two time ranges overlap
 */
function timesOverlap(time1, time2) {
    // If either has no time restriction, they can play together
    if (!time1 || !time2) return true;

    // If both have no start/end times, they're flexible
    if (!time1.start && !time1.end && !time2.start && !time2.end) return true;

    // Convert times to minutes for easier comparison
    const timeToMinutes = (timeStr) => {
        if (!timeStr) return null;
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    };

    // Get time ranges in minutes
    const t1Start = timeToMinutes(time1.start);
    const t1End = timeToMinutes(time1.end);
    const t2Start = timeToMinutes(time2.start);
    const t2End = timeToMinutes(time2.end);

    // Handle open-ended ranges
    // "from X" means X to end of day
    // "until X" means start of day to X
    const START_OF_DAY = 6 * 60;  // 6 AM
    const END_OF_DAY = 21 * 60;    // 9 PM

    const range1Start = t1Start || START_OF_DAY;
    const range1End = t1End || END_OF_DAY;
    const range2Start = t2Start || START_OF_DAY;
    const range2End = t2End || END_OF_DAY;

    // Check if ranges overlap
    // Ranges overlap if: start1 < end2 AND start2 < end1
    return range1Start < range2End && range2Start < range1End;
}

/**
 * Check if two players can play together (exclusions + time overlap)
 */
function canPlayTogetherWithTime(player1, player2) {
    // First check exclusion preferences
    if (!canPlayTogether(player1.name, player2.name)) {
        return false;
    }

    // Then check time overlap
    return timesOverlap(player1.timeRange, player2.timeRange);
}

/**
 * Main match organization function
 *
 * @param {Array} checkins - Array of check-in objects with:
 *   - name: string
 *   - playStyle: 'singles' | 'doubles' | 'both' (or undefined = 'both')
 *   - timestamp: number (for priority ordering)
 *   - timeRange: { start?: string, end?: string } (optional)
 *   - allowRotation: boolean (optional, default true)
 *   - isGuest: boolean (optional)
 *   - addedBy: string (optional)
 *
 * @returns {Object} { matches: Array, warnings: Array }
 *   Match types:
 *   - 'doubles': Complete 4-player match
 *   - 'singles': Complete 2-player match
 *   - 'doubles-forming': Waiting for more players (1-3 players)
 *   - 'singles-forming': Waiting for 1 more player
 */
export function organizeMatches(checkins) {
    const matches = [];
    const warnings = [];
    let remaining = checkins.map((c, idx) => ({ ...c, originalIndex: idx }));

    // Separate by play style and sort by timestamp (first-come, first-served)
    remaining.sort((a, b) => a.timestamp - b.timestamp);

    const doublesOnly = remaining.filter(p => p.playStyle === 'doubles');
    const singlesOnly = remaining.filter(p => p.playStyle === 'singles');
    const either = remaining.filter(p => p.playStyle === 'both' || !p.playStyle);

    // === STEP 1: Form complete doubles matches ===
    // Doubles pool: Doubles Only + Either players (sorted by timestamp)
    let doublesPool = [...doublesOnly, ...either].sort((a, b) => a.timestamp - b.timestamp);

    while (doublesPool.length >= 4) {
        const group = doublesPool.slice(0, 4);
        matches.push({
            type: 'doubles',
            number: matches.filter(m => m.type === 'doubles').length + 1,
            players: group
        });
        doublesPool.splice(0, 4);
    }

    // === STEP 2: Form singles matches from Singles Only players ===
    let singlesPool = [...singlesOnly].sort((a, b) => a.timestamp - b.timestamp);

    while (singlesPool.length >= 2) {
        let pair = null;

        // Find first valid pair respecting exclusions AND time overlap
        for (let i = 0; i < singlesPool.length - 1; i++) {
            for (let j = i + 1; j < singlesPool.length; j++) {
                if (canPlayTogetherWithTime(singlesPool[i], singlesPool[j])) {
                    pair = [singlesPool[i], singlesPool[j]];
                    break;
                }
            }
            if (pair) break;
        }

        if (pair) {
            matches.push({
                type: 'singles',
                players: pair
            });
            pair.forEach(p => {
                const idx = singlesPool.findIndex(sp => sp.originalIndex === p.originalIndex);
                if (idx > -1) singlesPool.splice(idx, 1);
            });
        } else {
            break;
        }
    }

    // === STEP 3: Handle remaining players ===
    // Remaining doubles pool (Either + Doubles Only not in complete doubles)
    // Remaining singles pool (Singles Only not in complete singles)

    const remainingDoublesPool = doublesPool; // 0-3 players wanting doubles
    const remainingSinglesPool = singlesPool; // Singles Only players without a partner

    // --- Handle doubles forming ---
    if (remainingDoublesPool.length > 0) {
        const needed = 4 - remainingDoublesPool.length;

        // Count "Either" players who can play singles as fallback
        const eitherPlayers = remainingDoublesPool.filter(p => p.playStyle === 'both' || !p.playStyle);
        const eitherCount = eitherPlayers.length;

        // Check if all are "Either" and allow rotation (for 3 players)
        const allEither = remainingDoublesPool.every(p => p.playStyle === 'both' || !p.playStyle);
        const allAllowRotation = remainingDoublesPool.every(p => p.allowRotation !== false);
        const canAllPlayTogether = remainingDoublesPool.length === 3 &&
            canPlayTogetherWithTime(remainingDoublesPool[0], remainingDoublesPool[1]) &&
            canPlayTogetherWithTime(remainingDoublesPool[0], remainingDoublesPool[2]) &&
            canPlayTogetherWithTime(remainingDoublesPool[1], remainingDoublesPool[2]);

        // Check if 2+ Either players can play singles together (time overlap, no exclusions)
        let canPlaySingles = false;
        if (eitherCount >= 2) {
            // Check if first two Either players can play together
            canPlaySingles = canPlayTogetherWithTime(eitherPlayers[0], eitherPlayers[1]);
        }

        matches.push({
            type: 'doubles-forming',
            players: remainingDoublesPool,
            needed: needed,
            canRotate: remainingDoublesPool.length === 3 && allEither && allAllowRotation && canAllPlayTogether,
            eitherCount: eitherCount,
            canPlaySingles: canPlaySingles
        });
    }

    // --- Handle singles forming ---
    if (remainingSinglesPool.length > 0) {
        remainingSinglesPool.forEach(p => {
            matches.push({
                type: 'singles-forming',
                players: [p],
                needed: 1
            });
        });
    }

    return { matches, warnings };
}

// Export helper functions for direct testing
export { normalizeName, canPlayTogether, timesOverlap, canPlayTogetherWithTime };
