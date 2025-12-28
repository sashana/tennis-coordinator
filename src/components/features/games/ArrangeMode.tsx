/**
 * ArrangeMode - Drag-and-drop match arrangement UI
 */
import { showToast } from '../../App';
import {
  matchNotes,
  matchArrangement,
  saveMatchArrangement,
  clearMatchArrangement,
} from '../../../hooks/useFirebase';
import { arrangeMode, selectedPlayer, tempArrangement } from './gamesState';
import type { CheckinData, Match } from '../../../types';

// Initialize temp arrangement from current matches
export function initializeTempArrangement(matches: Match[], _checkins: CheckinData[]) {
  const arrangement: {
    matches: Record<string, { players: string[]; note?: string }>;
    unassigned: string[];
  } = {
    matches: {},
    unassigned: [],
  };

  let doublesCount = 0;
  let singlesCount = 0;

  matches.forEach((match) => {
    const playerNames = match.players.map((p) => p.name);

    if (match.type === 'doubles' || match.type === 'doubles-forming') {
      doublesCount++;
      const matchKey = `doubles-${doublesCount}`;
      arrangement.matches[matchKey] = {
        players: playerNames,
        note: matchNotes.value[matchKey] || '',
      };
    } else if (
      match.type === 'singles' ||
      match.type === 'singles-forming' ||
      match.type === 'singles-or-practice'
    ) {
      singlesCount++;
      const matchKey = `singles-${singlesCount}`;
      arrangement.matches[matchKey] = {
        players: playerNames,
        note: matchNotes.value[matchKey] || '',
      };
    } else if (match.type === 'waiting') {
      arrangement.unassigned.push(...playerNames);
    }
  });

  return arrangement;
}

// Handle player selection/swap in arrange mode
export function handleArrangeClick(playerName: string, matchKey: string) {
  if (!arrangeMode.value || !tempArrangement.value) {
    return;
  }

  const current = selectedPlayer.value;

  if (!current) {
    // First selection
    selectedPlayer.value = { name: playerName, matchKey };
  } else if (current.name === playerName && current.matchKey === matchKey) {
    // Clicking same player - deselect
    selectedPlayer.value = null;
  } else {
    // Second selection - swap players
    const arr = tempArrangement.value;
    const newMatches = { ...arr.matches };
    const newUnassigned = [...arr.unassigned];

    // Remove both players from their current positions
    // First player
    if (current.matchKey === 'unassigned') {
      const idx = newUnassigned.indexOf(current.name);
      if (idx > -1) {
        newUnassigned.splice(idx, 1);
      }
    } else {
      const match = newMatches[current.matchKey];
      if (match) {
        match.players = match.players.filter((p: string) => p !== current.name);
      }
    }

    // Second player
    if (matchKey === 'unassigned') {
      const idx = newUnassigned.indexOf(playerName);
      if (idx > -1) {
        newUnassigned.splice(idx, 1);
      }
    } else {
      const match = newMatches[matchKey];
      if (match) {
        match.players = match.players.filter((p: string) => p !== playerName);
      }
    }

    // Add players to their new positions
    // First player goes to second player's position
    if (matchKey === 'unassigned') {
      newUnassigned.push(current.name);
    } else {
      newMatches[matchKey].players.push(current.name);
    }

    // Second player goes to first player's position
    if (current.matchKey === 'unassigned') {
      newUnassigned.push(playerName);
    } else {
      newMatches[current.matchKey].players.push(playerName);
    }

    tempArrangement.value = {
      matches: newMatches,
      unassigned: newUnassigned,
    };
    selectedPlayer.value = null;
    showToast(`Swapped ${current.name} and ${playerName}`, 'info');
  }
}

// Start arrange mode
export function startArrangeMode(matches: Match[], checkins: CheckinData[]) {
  try {
    // Use existing arrangement if present and valid, otherwise initialize from current matches
    if (
      matchArrangement.value &&
      matchArrangement.value.matches &&
      typeof matchArrangement.value.matches === 'object'
    ) {
      tempArrangement.value = {
        matches: { ...matchArrangement.value.matches },
        unassigned: Array.isArray(matchArrangement.value.unassigned)
          ? [...matchArrangement.value.unassigned]
          : [],
      };
    } else {
      tempArrangement.value = initializeTempArrangement(matches, checkins);
    }
    selectedPlayer.value = null;
    arrangeMode.value = true;
  } catch (err) {
    console.error('Error starting arrange mode:', err);
    // Fallback: try to initialize from checkins directly
    tempArrangement.value = {
      matches: {},
      unassigned: checkins.map((c) => c.name),
    };
    selectedPlayer.value = null;
    arrangeMode.value = true;
  }
}

// Cancel arrange mode
export function cancelArrangeMode() {
  arrangeMode.value = false;
  selectedPlayer.value = null;
  tempArrangement.value = null;
}

// Save arrangement
export async function saveArrangement() {
  if (!tempArrangement.value) {
    return;
  }
  await saveMatchArrangement(tempArrangement.value);
  arrangeMode.value = false;
  selectedPlayer.value = null;
  tempArrangement.value = null;
}

// Clear saved arrangement
export async function clearArrangement() {
  await clearMatchArrangement();
  cancelArrangeMode();
}

// Arrange mode view component
export function ArrangeModeView() {
  if (!tempArrangement.value) {
    return null;
  }

  return (
    <>
      {Object.entries(tempArrangement.value.matches || {}).map(([matchKey, matchData]) => {
        const isDoubles = matchKey.startsWith('doubles');
        const matchNum = matchKey.split('-')[1];
        const players = matchData?.players || [];
        // Skip empty matches
        if (players.length === 0) {
          return null;
        }
        return (
          <div
            key={matchKey}
            class="match-group"
            style={{
              marginBottom: '16px',
              border: '2px dashed var(--color-purple-arrange, #9C27B0)',
              borderRadius: '8px',
              padding: '8px',
            }}
          >
            <h3 style="margin: 0 0 8px 0;">
              {isDoubles ? `Doubles ${matchNum}` : `Singles ${matchNum}`}
              <span
                style={{
                  fontSize: '12px',
                  color: 'var(--color-gray-base, #666)',
                  marginLeft: '8px',
                }}
              >
                ({players.length}/{isDoubles ? 4 : 2})
              </span>
            </h3>
            <div style="display: flex; flex-direction: column; gap: 4px;">
              {players.map((playerName: string) => {
                const isSelected =
                  selectedPlayer.value?.name === playerName &&
                  selectedPlayer.value?.matchKey === matchKey;
                return (
                  <div
                    key={playerName}
                    onClick={() => handleArrangeClick(playerName, matchKey)}
                    style={{
                      padding: '10px 12px',
                      background: isSelected
                        ? 'var(--color-purple-arrange, #9C27B0)'
                        : 'var(--color-gray-lightest, #f5f5f5)',
                      color: isSelected ? 'white' : 'var(--color-gray-dark, #333)',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '500',
                      transition: 'all 0.15s',
                      border: isSelected
                        ? '2px solid var(--color-purple-arrange-dark, #7B1FA2)'
                        : '2px solid transparent',
                    }}
                  >
                    {playerName}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Unassigned players */}
      {tempArrangement.value.unassigned.length > 0 && (
        <div
          class="match-group"
          style={{
            marginBottom: '16px',
            border: '2px dashed #9e9e9e',
            borderRadius: '8px',
            padding: '8px',
            background: '#fafafa',
          }}
        >
          <h3 style="margin: 0 0 8px 0; color: var(--color-gray-base, #666);">Unassigned</h3>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            {tempArrangement.value.unassigned.map((playerName: string) => {
              const isSelected =
                selectedPlayer.value?.name === playerName &&
                selectedPlayer.value?.matchKey === 'unassigned';
              return (
                <div
                  key={playerName}
                  onClick={() => handleArrangeClick(playerName, 'unassigned')}
                  style={{
                    padding: '10px 12px',
                    background: isSelected ? 'var(--color-purple-arrange, #9C27B0)' : '#fff',
                    color: isSelected ? 'white' : 'var(--color-gray-dark, #333)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'all 0.15s',
                    border: isSelected
                      ? '2px solid var(--color-purple-arrange-dark, #7B1FA2)'
                      : '2px solid var(--color-border, #e0e0e0)',
                  }}
                >
                  {playerName}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
