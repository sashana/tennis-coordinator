/**
 * MatchCard - Individual game card matching Activity tab styling
 */
import { showToast, selectedDate, currentGroupName } from '../../App';
import { normalizeName } from '../../../utils/helpers';
import { sport } from '../../../config/sport';
import { groupSettings, matchNotes, allMatchNotes } from '../../../hooks/useFirebase';
import { createCalendarEventFromMatch, downloadICSFile } from '../../../utils/calendar';
import { activeTab } from '../../navigation/BottomTabBar';
import {
  activeShareDropdown,
  isSelectionMode,
  selectedGames,
  toggleGameSelection,
  ScheduledMatch,
  gamesView,
} from './myMatchesState';
import { shareNeedPlayers } from './shareUtils';

interface MatchCardProps {
  match: ScheduledMatch;
  idx: number;
  currentViewUser: string;
}

function handleDateClick(date: string) {
  if (isSelectionMode.value) {
    return;
  }
  selectedDate.value = date;
  activeTab.value = 'checkin';
}

function handleAddToCalendar(match: ScheduledMatch) {
  const matchKey = `${match.type.replace('-forming', '')}-${match.matchNumber}`;
  const notes = matchNotes.value[matchKey] || '';

  const eventData = createCalendarEventFromMatch({
    date: match.date,
    matchType: match.type,
    players: match.players,
    groupName: currentGroupName.value || sport.name,
    location: groupSettings.value.location?.name,
    notes: notes,
  });

  downloadICSFile(eventData);
  showToast('Calendar event downloaded', 'success');
}

/**
 * Format date in short form (Mon, Jan 6)
 */
function formatShortDate(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const gameDay = new Date(date);
  gameDay.setHours(0, 0, 0, 0);

  if (gameDay.getTime() === today.getTime()) {
    return 'Today';
  }
  if (gameDay.getTime() === tomorrow.getTime()) {
    return 'Tomorrow';
  }
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

/**
 * Get play style label
 */
function getPlayStyleLabel(type: string): string {
  if (type.includes('doubles')) return 'Doubles';
  if (type.includes('singles')) return 'Singles';
  return 'Game';
}

export function MatchCard({ match, idx, currentViewUser }: MatchCardProps) {
  const otherPlayers = match.players.filter(
    (p) => normalizeName(p.name) !== normalizeName(currentViewUser)
  );
  const matchKey = `mygames-${match.date}-${match.type}-${idx}`;
  const isDropdownOpen = activeShareDropdown.value === matchKey;
  const needed = match.needed || 0;
  const isSelected = selectedGames.value.has(matchKey);
  const inSelectionMode = isSelectionMode.value;
  const isPastView = gamesView.value === 'past';

  // Status flags - match Feed tab logic for consistency
  const isDoubles = match.type.includes('doubles');
  const isConfirmed = !match.isForming;
  // Urgent = 1 spot left OR doubles with only 1-2 players (needs 2-3 more)
  const isUrgent = match.isForming && (needed === 1 || (isDoubles && match.players.length <= 2));
  const isForming = match.isForming && !isUrgent;

  // Check if today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const gameDay = new Date(match.date + 'T00:00:00');
  const isToday = gameDay.getTime() === today.getTime();

  // Border color based on status
  const getBorderColor = () => {
    if (isPastView) return '#e0e0e0';
    if (isConfirmed) return '#2C6E49';
    if (isUrgent) return '#FF9800';
    if (isForming) return '#1976D2';
    return '#e0e0e0';
  };

  // Match notes
  const noteMatchKey = `${match.type.replace('-forming', '')}-${match.matchNumber}`;
  const noteForMatch = allMatchNotes.value[match.date]?.[noteMatchKey];

  return (
    <div
      onClick={() => {
        if (inSelectionMode) {
          toggleGameSelection(matchKey);
        } else {
          handleDateClick(match.date);
        }
      }}
      style={{
        background: isPastView ? '#f8f8f8' : 'white',
        borderRadius: '10px',
        border: inSelectionMode && isSelected
          ? '2px solid var(--color-primary, #2C6E49)'
          : `1px solid ${getBorderColor()}`,
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      <div style={{ padding: '10px 12px' }}>
        {/* Selection checkbox */}
        {inSelectionMode && (
          <div
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              width: '22px',
              height: '22px',
              borderRadius: '6px',
              border: isSelected ? 'none' : '2px solid #ccc',
              background: isSelected ? 'var(--color-primary, #2C6E49)' : 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            {isSelected && '✓'}
          </div>
        )}

        {/* Tags row */}
        {isPastView ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <span
              style={{
                background: '#e0e0e0',
                color: '#666',
                fontSize: '9px',
                fontWeight: '600',
                padding: '3px 8px',
                borderRadius: '4px',
                letterSpacing: '0.5px',
              }}
            >
              PLAYED
            </span>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
            {/* Status tag */}
            <span
              style={{
                background: isUrgent
                  ? '#FF9800'
                  : isConfirmed
                    ? '#2C6E49'
                    : '#1976D2',
                color: 'white',
                fontSize: '9px',
                fontWeight: '700',
                padding: '3px 8px',
                borderRadius: '4px',
                letterSpacing: '0.5px',
              }}
            >
              {isConfirmed
                ? 'GAME ON'
                : needed === 1
                  ? 'NEED 1 PLAYER'
                  : `NEED ${needed} PLAYERS`}
            </span>

            {/* Today tag */}
            {isToday && (
              <span
                style={{
                  background: '#E0F2F1',
                  color: '#00897B',
                  fontSize: '9px',
                  fontWeight: '700',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  letterSpacing: '0.5px',
                }}
              >
                TODAY
              </span>
            )}

            {/* YOU'RE IN tag */}
            <span
              style={{
                border: '1.5px solid #2C6E49',
                color: '#2C6E49',
                fontSize: '9px',
                fontWeight: '700',
                padding: '2px 8px',
                borderRadius: '4px',
                letterSpacing: '0.5px',
              }}
            >
              YOU'RE IN
            </span>
          </div>
        )}

        {/* Main row: Date/Type | Players */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: noteForMatch ? '8px' : '0' }}>
          {/* Date and type */}
          <div style={{ minWidth: '80px', flexShrink: 0 }}>
            <div
              style={{
                fontWeight: '600',
                fontSize: '13px',
                color: isPastView ? '#555' : 'var(--color-text-primary, #333)',
              }}
            >
              {formatShortDate(match.date)}
            </div>
            <div
              style={{
                fontSize: '11px',
                color: isPastView ? '#777' : 'var(--color-text-secondary, #666)',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              <span>{sport.sportEmoji}</span>
              <span>{getPlayStyleLabel(match.type)}</span>
            </div>
          </div>

          {/* Player names */}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              fontSize: '12px',
              color: isPastView ? '#666' : 'var(--color-text-secondary, #666)',
              lineHeight: '1.4',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {otherPlayers.length > 0 ? (
              <>
                <span style={{ color: isPastView ? '#888' : '#888' }}>with </span>
                {otherPlayers.map((p) => p.name).join(' · ')}
              </>
            ) : (
              <span style={{ fontStyle: 'italic', color: isPastView ? '#888' : '#999' }}>
                Waiting for players...
              </span>
            )}
          </div>

          {/* Action buttons - only when not in selection mode */}
          {!inSelectionMode && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              {/* Invite button for forming games */}
              {match.isForming && !isPastView && (
                <div style={{ position: 'relative' }}>
                  <button
                    data-share-button
                    onClick={(e) => {
                      e.stopPropagation();
                      activeShareDropdown.value = isDropdownOpen ? null : matchKey;
                    }}
                    style={{
                      background: isUrgent
                        ? 'linear-gradient(90deg, #ff9800 0%, #ffa726 100%)'
                        : '#1976D2',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '5px 10px',
                      fontSize: '11px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    Invite
                    <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor">
                      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
                    </svg>
                  </button>

                  {/* Share dropdown */}
                  {isDropdownOpen && (
                    <div
                      className="share-dropdown"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        position: 'absolute',
                        bottom: '100%',
                        right: 0,
                        marginBottom: '4px',
                        background: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        zIndex: 100,
                        overflow: 'hidden',
                        minWidth: '120px',
                      }}
                    >
                      {[
                        { method: 'whatsapp' as const, label: 'WhatsApp', color: '#25D366' },
                        { method: 'sms' as const, label: 'SMS', color: '#2196F3' },
                        { method: 'copy' as const, label: 'Copy', color: '#666' },
                      ].map(({ method, label, color }, i) => (
                        <button
                          key={method}
                          onClick={(e) => {
                            e.stopPropagation();
                            shareNeedPlayers(match, method);
                            activeShareDropdown.value = null;
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 12px',
                            width: '100%',
                            border: 'none',
                            background: 'white',
                            cursor: 'pointer',
                            fontSize: '13px',
                            color,
                            borderTop: i > 0 ? '1px solid #f0f0f0' : 'none',
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Calendar button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCalendar(match);
                }}
                title="Add to Calendar"
                style={{
                  background: 'transparent',
                  color: isPastView ? '#888' : 'var(--color-text-secondary, #666)',
                  border: 'none',
                  padding: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Match notes */}
        {noteForMatch && (
          <div
            style={{
              marginTop: '8px',
              padding: '6px 10px',
              background: isPastView ? '#efefef' : 'var(--color-bg-muted, #f5f5f5)',
              borderRadius: '6px',
              fontSize: '12px',
              color: isPastView ? '#666' : 'var(--color-text-secondary, #666)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '6px',
            }}
          >
            <span style={{ flexShrink: 0 }}>📝</span>
            <span>{noteForMatch}</span>
          </div>
        )}
      </div>
    </div>
  );
}
