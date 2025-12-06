# Tennis Coordinator - Match Formation Rules

**Version:** 1.0.0
**Last Updated:** 2025-12-06
**Status:** Active

---

## Overview

This document defines how players are organized into matches based on their preferences and check-in order. The system prioritizes **doubles formation** as the primary goal, with singles and rotation as secondary options.

---

## Player Preferences

| Preference | Meaning | Can Play |
|------------|---------|----------|
| **Either** | Flexible, prefers doubles | Doubles, Singles, Rotation (if allowed) |
| **Singles Only** | Only wants 1v1 | Singles only |
| **Doubles Only** | Only wants 4-player doubles | Doubles only |

---

## Formation Priority

1. **Doubles** (4 players) - Primary goal
2. **Doubles (forming)** - Waiting for more players
3. **Singles** (2 players) - For Singles Only or when doubles not possible
4. **Rotation** (3 players) - Fallback for 3 "Either" players who allow rotation

---

## Match Formation Rules

### General Principles

- **Timestamp priority**: First come, first served for all formations
- **Doubles-first**: "Either" players default toward doubles formation
- **Respect preferences**: "Singles Only" never in doubles, "Doubles Only" never in singles/rotation
- **Rotation opt-in**: Only "Either" players who check "Allow rotation" can do 3-player rotation

---

## Combinations by Player Count

### 1 Player

| Preferences | Display |
|-------------|---------|
| Either | Doubles (forming) - "Need 3 more" |
| Singles Only | Singles (forming) - "Need 1 more" |
| Doubles Only | Doubles (forming) - "Need 3 more" |

### 2 Players

| Player A | Player B | Display |
|----------|----------|---------|
| Either | Either | Doubles (forming) - "Need 2 more" |
| Either | Singles Only | Singles |
| Either | Doubles Only | Doubles (forming) - "Need 2 more" |
| Singles Only | Singles Only | Singles |
| Singles Only | Doubles Only | Singles (forming) "Need 1 more" + Doubles (forming) "Need 3 more" |
| Doubles Only | Doubles Only | Doubles (forming) - "Need 2 more" |

### 3 Players

| Preferences | Display |
|-------------|---------|
| All Either | Doubles (forming) "Need 1 more" + "Can rotate if no 4th" (if all allow rotation) |
| 2 Either + 1 Singles Only | Doubles (forming) 2 Either "Need 1 more" + Singles (forming) "Need 1 more" |
| 2 Either + 1 Doubles Only | Doubles (forming) - "Need 1 more" |
| 1 Either + 2 Singles Only | Singles (first 2 by time) + Singles (forming) "Need 1 more" |
| 1 Either + 2 Doubles Only | Doubles (forming) - "Need 1 more" |
| All Singles Only | Singles (first 2 by time) + Singles (forming) "Need 1 more" |
| 2 Singles Only + 1 Doubles Only | Singles (2 Singles Only) + Doubles (forming) "Need 3 more" |
| 1 Singles Only + 2 Doubles Only | Doubles (forming) "Need 2 more" + Singles (forming) "Need 1 more" |
| All Doubles Only | Doubles (forming) - "Need 1 more" |

### 4+ Players

| Scenario | Result |
|----------|--------|
| 4+ who can play doubles | Form doubles match(es), handle remainder per above rules |

---

## Display States

### Confirmed Matches
- **Doubles** - 4 players, match is set
- **Singles** - 2 players, match is set
- **Rotation (3 players)** - 3 "Either" players rotating 1v1 or 2v1

### Forming Matches
- **Doubles (forming)** - Shows "Need X more" (1, 2, or 3)
- **Singles (forming)** - Shows "Need 1 more"

### Fallback Indicators for Doubles (forming)

| Situation | Message |
|-----------|---------|
| 1 Either player | "Can play singles if 1 more joins" |
| 2+ Either players (compatible times, no exclusions) | "Will play singles if no more join" |
| 3 Either players (all allow rotation) | "Can rotate if no 4th" |
| Only Doubles Only players | No fallback message |

### Provisional Indicators
- **"Open to more players"** - Singles match where both players are "Either" and at least one allows rotation

---

## Additional Constraints

### Time Window Overlap
Players are only matched if their available time windows overlap.

### Exclusion Preferences
Players with exclusion preferences (for singles) will not be paired together.

### Rotation Checkbox
The "Allow rotation" checkbox only applies to "Either" players and determines if they can participate in 3-player rotation.

---

*This is a living document. Update version number with each revision.*
