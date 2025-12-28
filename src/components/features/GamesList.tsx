/**
 * GamesList - Main component for displaying organized matches
 */
import { currentCheckins, currentGroupId, selectedDate } from '../App';
import { resetDay, matchArrangement, useMatchArrangement } from '../../hooks/useFirebase';
import { formatDate } from '../../utils/helpers';
import { organizeMatches } from '../../utils/matching';
import { SportEmptyState } from '../ui/SportEffects';
import { getPlayerCount } from '../../config/sport';

// Import from extracted components
import {
  compactViewMode,
  toggleCompactView,
  arrangeMode,
  selectedPlayer,
  tempArrangement,
  mainShareDropdownOpen,
} from './games/gamesState';
import { CheckinTile, findGlobalIndex } from './games/CheckinTile';
import { CompactPlayerList } from './games/CompactPlayerList';
import { MatchNoteInput } from './games/MatchNoteInput';
import { NeedPlayersButton, shareGames } from './games/ShareDropdown';
import {
  ArrangeModeView,
  startArrangeMode,
  cancelArrangeMode,
  saveArrangement,
  clearArrangement,
} from './games/ArrangeMode';
import { EditCheckinModal } from './games/EditCheckinModal';
import { RemoveCheckinModal } from './games/RemoveCheckinModal';

function handleResetDay() {
  const date = selectedDate.value;
  if (!date) {
    return;
  }

  if (
    confirm(
      `Are you sure you want to reset all check-ins for ${formatDate(date)}?\n\nThis cannot be undone.`
    )
  ) {
    resetDay();
  }
}

// Main share dropdown UI
function MainShareDropdown({
  matches,
  checkins,
  date,
}: {
  matches: any[];
  checkins: any[];
  date: string;
}) {
  return (
    <div style="position: relative;">
      <button
        data-share-button
        onClick={() => {
          mainShareDropdownOpen.value = !mainShareDropdownOpen.value;
        }}
        title="Share Games"
        style={{
          background: mainShareDropdownOpen.value
            ? 'var(--color-primary-dark, #1a402b)'
            : 'var(--color-primary, #2C6E49)',
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          padding: '8px 16px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        Share
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
        </svg>
      </button>
      {mainShareDropdownOpen.value && (
        <div
          class="share-dropdown"
          style={{
            position: 'absolute',
            top: '100%',
            right: '0',
            marginTop: '8px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            zIndex: 100,
            overflow: 'hidden',
            minWidth: '160px',
          }}
        >
          <button
            onClick={() => shareGames(matches, checkins, date, 'whatsapp')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              width: '100%',
              border: 'none',
              background: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              color: 'var(--color-gray-dark, #333)',
            }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="var(--color-whatsapp, #25D366)">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </button>
          <button
            onClick={() => shareGames(matches, checkins, date, 'sms')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              width: '100%',
              border: 'none',
              background: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              color: 'var(--color-gray-dark, #333)',
            }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="var(--color-sms, #2196F3)">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
            </svg>
            SMS
          </button>
          <button
            onClick={() => shareGames(matches, checkins, date, 'copy')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              width: '100%',
              border: 'none',
              background: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              color: 'var(--color-gray-dark, #333)',
            }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="var(--color-gray-base, #666)">
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
            </svg>
            Copy
          </button>
        </div>
      )}
    </div>
  );
}

// Render match players in either compact or detailed view
function MatchPlayerList({
  players,
  checkins,
  isCompact,
}: {
  players: any[];
  checkins: any[];
  isCompact: boolean;
}) {
  if (isCompact) {
    return <CompactPlayerList players={players} checkins={checkins} />;
  }

  return (
    <div id="checkinList">
      {players.map((player: any) => {
        const globalIndex = findGlobalIndex(checkins, player);
        return <CheckinTile key={globalIndex} checkin={player} globalIndex={globalIndex} />;
      })}
    </div>
  );
}

// Match card for doubles matches
function DoublesMatch({
  match,
  checkins,
  isCompact,
}: {
  match: any;
  checkins: any[];
  isCompact: boolean;
}) {
  const matchKey = `doubles-${match.number}`;

  return (
    <div class="match-group" style="margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <h3 style="margin: 0;">Doubles {match.number}</h3>
        <span style="display: flex; align-items: center; gap: 4px; color: #2C6E49; font-size: 13px; font-weight: 600;">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
          Ready
        </span>
      </div>
      <MatchPlayerList players={match.players} checkins={checkins} isCompact={isCompact} />
      <MatchNoteInput matchKey={matchKey} />
    </div>
  );
}

// Match card for singles matches
function SinglesMatch({
  match,
  singlesNumber,
  checkins,
  isCompact,
}: {
  match: any;
  singlesNumber: number;
  checkins: any[];
  isCompact: boolean;
}) {
  const matchKey = `singles-${singlesNumber}`;
  const bothFlexible = match.players.every((p: any) => (p.playStyle || 'both') === 'both');
  const anyOpenToRotation = match.players.some((p: any) => p.allowRotation === true);
  const isProvisional = bothFlexible && anyOpenToRotation;

  return (
    <div class="match-group singles-group" style="margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <h3 style="margin: 0;">Singles{singlesNumber > 1 ? ` ${singlesNumber}` : ''}</h3>
        <span style="display: flex; align-items: center; gap: 4px; color: #2C6E49; font-size: 13px; font-weight: 600;">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
          Ready
        </span>
      </div>
      <MatchPlayerList players={match.players} checkins={checkins} isCompact={isCompact} />
      {!isCompact && isProvisional && (
        <p style="color: var(--color-gray-base, #666); font-size: 13px; margin: 8px 0 4px 0; font-style: italic; padding: 0 12px;">
          Open to more players
        </p>
      )}
      <MatchNoteInput matchKey={matchKey} />
    </div>
  );
}

// Match card for rotation (3 players)
function RotationMatch({
  match,
  rotationNumber,
  checkins,
  isCompact,
}: {
  match: any;
  rotationNumber: number;
  checkins: any[];
  isCompact: boolean;
}) {
  const matchKey = `rotation-${rotationNumber}`;

  return (
    <div class="match-group singles-group" style="margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <h3 style="margin: 0;">Rotation (3 players)</h3>
        <span style="display: flex; align-items: center; gap: 4px; color: #2C6E49; font-size: 13px; font-weight: 600;">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
          Ready
        </span>
      </div>
      <MatchPlayerList players={match.players} checkins={checkins} isCompact={isCompact} />
      <MatchNoteInput matchKey={matchKey} />
    </div>
  );
}

// Match card for forming doubles
function DoublesFormingMatch({
  match,
  checkins,
  isCompact,
}: {
  match: any;
  checkins: any[];
  isCompact: boolean;
}) {
  const matchKey = 'doubles-forming-1';
  const needed = match.needed || getPlayerCount('doubles') - match.players.length;

  let fallbackText = '';
  if (match.canRotate) {
    fallbackText = 'Can rotate if no 4th';
  } else if (match.canPlaySingles && (match.eitherCount || 0) >= 2) {
    fallbackText = 'Will play singles if no more join';
  } else if ((match.eitherCount || 0) === 1 && match.players.length === 1) {
    fallbackText = 'Can play singles if 1 more joins';
  }

  return (
    <div class="match-group forming-group" style="margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <h3 style="margin: 0;">Doubles</h3>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="display: flex; align-items: center; gap: 4px; color: #F57C00; font-size: 12px; font-weight: 600;">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
            </svg>
            Need {needed}
          </span>
          <NeedPlayersButton match={match} matchKey={matchKey} needed={needed} />
        </div>
      </div>
      <MatchPlayerList players={match.players} checkins={checkins} isCompact={isCompact} />
      {!isCompact && fallbackText && (
        <p style="color: var(--color-gray-base, #666); font-size: 13px; margin: 8px 0 4px 0; font-style: italic; padding: 0 12px;">
          {fallbackText}
        </p>
      )}
      <MatchNoteInput matchKey={matchKey} />
    </div>
  );
}

// Match card for forming singles
function SinglesFormingMatch({
  match,
  checkins,
  isCompact,
}: {
  match: any;
  checkins: any[];
  isCompact: boolean;
}) {
  const matchKey = 'singles-forming-1';

  return (
    <div class="match-group forming-group" style="margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <h3 style="margin: 0;">Singles</h3>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="display: flex; align-items: center; gap: 4px; color: #F57C00; font-size: 12px; font-weight: 600;">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
            </svg>
            Need 1
          </span>
          <NeedPlayersButton match={match} matchKey={matchKey} needed={1} />
        </div>
      </div>
      <MatchPlayerList players={match.players} checkins={checkins} isCompact={isCompact} />
      <MatchNoteInput matchKey={matchKey} />
    </div>
  );
}

// Match card for waiting players
function WaitingMatch({
  match,
  checkins,
  isCompact,
}: {
  match: any;
  checkins: any[];
  isCompact: boolean;
}) {
  return (
    <div class="match-group waiting-group" style="margin-bottom: 16px;">
      <h3 style="margin: 0 0 8px 0;">Waiting for Match</h3>
      <MatchPlayerList players={match.players} checkins={checkins} isCompact={isCompact} />
    </div>
  );
}

// Custom arrangement view (when admin has manually arranged matches)
function CustomArrangementView({ checkins }: { checkins: any[] }) {
  const arrangement = matchArrangement.value;
  if (!arrangement?.matches) return null;

  return (
    <>
      {Object.entries(arrangement.matches).map(([matchKey, matchData]) => {
        const isDoubles = matchKey.startsWith('doubles');
        const matchNum = matchKey.split('-')[1];
        const expectedCount = isDoubles ? 4 : 2;
        const players = matchData?.players || [];
        const isComplete = players.length >= expectedCount;

        const playersWithData = players.map((playerName: string) => {
          const checkin = checkins.find((c) => c.name === playerName);
          return checkin || { name: playerName, timestamp: 0 };
        });

        return (
          <div
            key={matchKey}
            class={`match-group ${isComplete ? '' : 'forming-group'}`}
            style="margin-bottom: 16px;"
          >
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <h3 style="margin: 0;">
                {isDoubles ? 'Doubles' : 'Singles'} {matchNum}
              </h3>
              {isComplete ? (
                <span style="display: flex; align-items: center; gap: 4px; color: var(--color-primary, #2C6E49); font-size: 13px; font-weight: 600;">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  Ready
                </span>
              ) : (
                <span style="display: flex; align-items: center; gap: 4px; color: #F57C00; font-size: 12px; font-weight: 600;">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                  </svg>
                  Need {expectedCount - players.length}
                </span>
              )}
            </div>
            <div id="checkinList">
              {playersWithData.map((player: any) => {
                const globalIndex = findGlobalIndex(checkins, player);
                return (
                  <CheckinTile
                    key={globalIndex >= 0 ? globalIndex : player.name}
                    checkin={player}
                    globalIndex={globalIndex >= 0 ? globalIndex : -1}
                  />
                );
              })}
            </div>
            <MatchNoteInput matchKey={matchKey} />
          </div>
        );
      })}

      {arrangement.unassigned && arrangement.unassigned.length > 0 && (
        <div class="match-group waiting-group" style="margin-bottom: 16px;">
          <h3 style="margin: 0 0 8px 0;">Unassigned</h3>
          <div id="checkinList">
            {arrangement.unassigned.map((playerName: string) => {
              const checkin = checkins.find((c) => c.name === playerName);
              const player = checkin || { name: playerName, timestamp: 0 };
              const globalIndex = checkin ? findGlobalIndex(checkins, player) : -1;
              return (
                <CheckinTile
                  key={globalIndex >= 0 ? globalIndex : playerName}
                  checkin={player}
                  globalIndex={globalIndex >= 0 ? globalIndex : -1}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

// Auto-organized matches view
function AutoOrganizedMatchesView({
  matches,
  checkins,
  warnings,
}: {
  matches: any[];
  checkins: any[];
  warnings: string[];
}) {
  const isCompact = compactViewMode.value;
  let singlesCount = 0;
  let rotationCount = 0;

  return (
    <>
      {warnings.length > 0 && (
        <div class="warning-box">
          {warnings.map((warning, idx) => (
            <div key={idx}>{warning}</div>
          ))}
        </div>
      )}

      {matches.map((match, idx) => {
        if (match.type === 'doubles') {
          return <DoublesMatch key={idx} match={match} checkins={checkins} isCompact={isCompact} />;
        }

        if (match.type === 'singles') {
          singlesCount++;
          return (
            <SinglesMatch
              key={idx}
              match={match}
              singlesNumber={singlesCount}
              checkins={checkins}
              isCompact={isCompact}
            />
          );
        }

        if (match.type === 'singles-or-practice') {
          rotationCount++;
          return (
            <RotationMatch
              key={idx}
              match={match}
              rotationNumber={rotationCount}
              checkins={checkins}
              isCompact={isCompact}
            />
          );
        }

        if (match.type === 'doubles-forming') {
          return (
            <DoublesFormingMatch key={idx} match={match} checkins={checkins} isCompact={isCompact} />
          );
        }

        if (match.type === 'singles-forming') {
          return (
            <SinglesFormingMatch key={idx} match={match} checkins={checkins} isCompact={isCompact} />
          );
        }

        if (match.type === 'waiting') {
          return <WaitingMatch key={idx} match={match} checkins={checkins} isCompact={isCompact} />;
        }

        return null;
      })}
    </>
  );
}

export function GamesList() {
  // Subscribe to match arrangement updates
  useMatchArrangement();

  const checkins = currentCheckins.value;
  const date = selectedDate.value || '';

  // Check if user is group admin
  const groupId = currentGroupId.value;
  const isAdmin = groupId && sessionStorage.getItem(`adminAuth_${groupId}`) === 'true';
  const isArrangeMode = arrangeMode.value;
  const hasCustomArrangement = !!(
    matchArrangement.value &&
    matchArrangement.value.matches &&
    Object.keys(matchArrangement.value.matches).length > 0
  );

  // Modals - render outside early return
  const modals = (
    <>
      <EditCheckinModal />
      <RemoveCheckinModal />
    </>
  );

  if (checkins.length === 0) {
    return (
      <>
        <SportEmptyState
          message="No check-ins yet"
          subtext="Be the first to check in for this date!"
        />
        {modals}
      </>
    );
  }

  const { matches, warnings } = organizeMatches(checkins);
  const hasMatches = matches.some((m) => (m.type as string) !== 'waiting' || m.players.length > 0);

  if (!hasMatches && warnings.length === 0) {
    return (
      <>
        <SportEmptyState
          message="No check-ins yet"
          subtext="Be the first to check in for this date!"
        />
        {modals}
      </>
    );
  }

  return (
    <>
      <div
        class="games-list"
        style="margin-top: 24px; padding-top: 24px; border-top: 2px solid #f0f0f0;"
      >
        {/* Header */}
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <h2 style="margin: 0; font-size: var(--font-size-xl, 18px); font-weight: 600;">
              Games{' '}
              <span style="font-size: var(--font-size-sm, 13px); font-weight: 500; color: var(--color-text-secondary, #666);">
                ({checkins.length} checked in)
              </span>
            </h2>
            {hasCustomArrangement && !isArrangeMode && (
              <span
                style={{
                  fontSize: '11px',
                  background: 'var(--color-purple-arrange, #9C27B0)',
                  color: 'white',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontWeight: '600',
                }}
              >
                Arranged
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div style="display: flex; gap: 8px; align-items: center;">
            {/* Compact/Detailed toggle */}
            {!isArrangeMode && (
              <button
                onClick={toggleCompactView}
                title={compactViewMode.value ? 'Show details' : 'Compact view'}
                style={{
                  background: 'var(--color-bg-subtle, #f5f5f5)',
                  border: '1px solid var(--color-border, #e0e0e0)',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: 'var(--color-text-secondary, #666)',
                }}
              >
                {compactViewMode.value ? (
                  <>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                    </svg>
                    Details
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <path d="M3 4h18v2H3V4zm2 4h14v2H5V8zm-2 4h18v2H3v-2zm2 4h14v2H5v-2z" />
                    </svg>
                    Compact
                  </>
                )}
              </button>
            )}

            {/* Arrange mode controls */}
            {isArrangeMode ? (
              <>
                <button
                  onClick={saveArrangement}
                  style={{
                    background: 'var(--color-primary, #2C6E49)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Save
                </button>
                <button
                  onClick={cancelArrangeMode}
                  style={{
                    background: 'var(--color-gray-lightest, #f5f5f5)',
                    color: 'var(--color-gray-base, #666)',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                {hasCustomArrangement && (
                  <button
                    onClick={clearArrangement}
                    style={{
                      background: 'rgba(255, 82, 82, 0.1)',
                      color: '#e57373',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      fontSize: '13px',
                      fontWeight: '500',
                      cursor: 'pointer',
                    }}
                  >
                    Reset
                  </button>
                )}
              </>
            ) : (
              <>
                {hasMatches && (
                  <MainShareDropdown matches={matches} checkins={checkins} date={date} />
                )}
                {isAdmin && checkins.length >= 2 && (
                  <button
                    onClick={() => startArrangeMode(matches, checkins)}
                    title="Arrange Players"
                    style={{
                      background: 'var(--color-purple-arrange, #9C27B0)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                    </svg>
                    Arrange
                  </button>
                )}
                {isAdmin && checkins.length > 0 && !hasMatches && (
                  <button
                    class="reset-day-btn"
                    onClick={handleResetDay}
                    title="Reset This Day"
                    style={{
                      background: 'rgba(255, 82, 82, 0.1)',
                      color: '#e57373',
                      border: 'none',
                      borderRadius: '50%',
                      padding: '0',
                      width: '36px',
                      height: '36px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                    </svg>
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Arrange mode instruction */}
        {isArrangeMode && (
          <div
            style={{
              background: 'var(--color-purple-arrange-light, #F3E5F5)',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '16px',
              color: 'var(--color-purple-arrange-dark, #7B1FA2)',
              fontSize: '14px',
            }}
          >
            <strong>Arrange Mode:</strong> Tap a player to select, then tap another player to swap
            their positions.
            {selectedPlayer.value && (
              <span style={{ display: 'block', marginTop: '4px' }}>
                Selected: <strong>{selectedPlayer.value.name}</strong> - tap another player to swap
              </span>
            )}
          </div>
        )}

        {/* Arrange mode view */}
        {isArrangeMode && tempArrangement.value && <ArrangeModeView />}

        {/* Custom arrangement view */}
        {!isArrangeMode && hasCustomArrangement && <CustomArrangementView checkins={checkins} />}

        {/* Auto-organized matches view */}
        {!isArrangeMode && !hasCustomArrangement && (
          <AutoOrganizedMatchesView matches={matches} checkins={checkins} warnings={warnings} />
        )}
      </div>
      {modals}
    </>
  );
}
