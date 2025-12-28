/**
 * MatchCard - Individual game card with share and calendar options
 */
import { showToast, selectedDate, currentGroupName } from '../../App';
import { normalizeName, formatDate } from '../../../utils/helpers';
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
} from './myMatchesState';
import { getMatchTypeLabel, shareNeedPlayers } from './shareUtils';

interface MatchCardProps {
  match: ScheduledMatch;
  idx: number;
  currentViewUser: string;
}

function handleDateClick(date: string) {
  // Don't navigate when in selection mode
  if (isSelectionMode.value) {
    return;
  }
  selectedDate.value = date;
  activeTab.value = 'checkin';
}

function handleAddToCalendar(match: ScheduledMatch) {
  // Get match key for notes lookup (e.g., "doubles-1", "singles-1")
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

export function MatchCard({ match, idx, currentViewUser }: MatchCardProps) {
  const otherPlayers = match.players.filter(
    (p) => normalizeName(p.name) !== normalizeName(currentViewUser)
  );
  const matchKey = `mygames-${match.date}-${match.type}-${idx}`;
  const isDropdownOpen = activeShareDropdown.value === matchKey;
  const needed = match.needed || 1;
  const isSelected = selectedGames.value.has(matchKey);
  const inSelectionMode = isSelectionMode.value;

  return (
    <div
      onClick={() => {
        if (inSelectionMode) {
          toggleGameSelection(matchKey);
        }
      }}
      style={{
        padding: '16px',
        background: match.isForming ? '#FFF8E1' : '#E8F5E9',
        borderRadius: '12px',
        border:
          inSelectionMode && isSelected
            ? '2px solid var(--color-primary, #2C6E49)'
            : match.isForming
              ? '1px solid #FFE082'
              : '1px solid #A5D6A7',
        cursor: inSelectionMode ? 'pointer' : 'default',
        position: 'relative',
      }}
    >
      {/* Selection checkbox in selection mode */}
      {inSelectionMode && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '24px',
            height: '24px',
            borderRadius: '6px',
            border: isSelected ? 'none' : '2px solid var(--color-gray-disabled, #ccc)',
            background: isSelected ? 'var(--color-primary, #2C6E49)' : 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          {isSelected && '✓'}
        </div>
      )}

      {/* Header row with date and type */}
      <div
        onClick={(e) => {
          if (!inSelectionMode) {
            e.stopPropagation();
            handleDateClick(match.date);
          }
        }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px',
          cursor: inSelectionMode ? 'pointer' : 'pointer',
          paddingRight: inSelectionMode ? '32px' : '0',
        }}
      >
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-weight: 600; color: var(--color-gray-dark, #333); font-size: 16px;">
            {formatDate(match.date)}
          </span>
          <span
            style={{
              fontSize: '12px',
              padding: '2px 8px',
              borderRadius: '10px',
              background: '#f0f0f0',
              color: 'var(--color-gray-base, #666)',
              fontWeight: '500',
            }}
          >
            {getMatchTypeLabel(match.type)}
          </span>
        </div>
        {/* Status badge with invite and calendar icons */}
        <div style="display: flex; align-items: center; gap: 8px;">
          {match.isForming ? (
            <span style="display: flex; align-items: center; gap: 4px; color: #F57C00; font-size: 12px; font-weight: 600;">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
              </svg>
              Need {needed}
            </span>
          ) : (
            <span style="display: flex; align-items: center; gap: 4px; color: var(--color-primary, #2C6E49); font-size: 12px; font-weight: 600;">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
              Ready
            </span>
          )}
          {/* Invite button for forming games */}
          {!inSelectionMode && match.isForming && (
            <div style="position: relative;">
              <button
                data-share-button
                onClick={(e) => {
                  e.stopPropagation();
                  activeShareDropdown.value = isDropdownOpen ? null : matchKey;
                }}
                title="Invite players"
                style={{
                  background: isDropdownOpen
                    ? 'var(--color-orange-dark, #e65100)'
                    : 'var(--color-orange-primary, #ff9800)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '4px 10px',
                  fontSize: '11px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: 'white',
                  transition: 'all 0.2s',
                  boxShadow: '0 1px 4px rgba(255, 152, 0, 0.3)',
                }}
              >
                <span>Invite</span>
                <svg
                  viewBox="0 0 24 24"
                  width="12"
                  height="12"
                  fill="currentColor"
                  style={{
                    transform: isDropdownOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s',
                  }}
                >
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div
                  class="share-dropdown"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: '0',
                    marginTop: '4px',
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    zIndex: 100,
                    overflow: 'hidden',
                    minWidth: '140px',
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      shareNeedPlayers(match, 'whatsapp');
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 14px',
                      width: '100%',
                      border: 'none',
                      background: 'white',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: 'var(--color-whatsapp, #25D366)',
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      shareNeedPlayers(match, 'sms');
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 14px',
                      width: '100%',
                      border: 'none',
                      background: 'white',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: 'var(--color-sms, #2196F3)',
                      borderTop: '1px solid #f0f0f0',
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
                    </svg>
                    SMS
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      shareNeedPlayers(match, 'copy');
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 14px',
                      width: '100%',
                      border: 'none',
                      background: 'white',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: 'var(--color-gray-base, #666)',
                      borderTop: '1px solid #f0f0f0',
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                    </svg>
                    Copy
                  </button>
                </div>
              )}
            </div>
          )}
          {/* Small calendar icon */}
          {!inSelectionMode && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCalendar(match);
              }}
              title="Add to Calendar"
              style={{
                background: 'transparent',
                border: 'none',
                padding: '4px',
                cursor: 'pointer',
                color: '#888',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
              }}
              className="hover-color-primary"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Players info */}
      <div
        onClick={(e) => {
          if (!inSelectionMode) {
            e.stopPropagation();
            handleDateClick(match.date);
          }
        }}
        style={{
          fontSize: '15px',
          color: '#555',
          cursor: inSelectionMode ? 'pointer' : 'pointer',
          paddingRight: inSelectionMode ? '32px' : '0',
        }}
      >
        {otherPlayers.length > 0 ? (
          <>
            <span style="color: #888;">Playing with </span>
            <span style="font-weight: 500;">{otherPlayers.map((p) => p.name).join(', ')}</span>
          </>
        ) : (
          <span style="color: #888; font-style: italic;">
            Waiting for {needed} more player{needed > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Match notes - show if there's a note for this match */}
      {(() => {
        const noteMatchKey = `${match.type.replace('-forming', '')}-${match.matchNumber}`;
        const noteForMatch = allMatchNotes.value[match.date]?.[noteMatchKey];
        if (noteForMatch) {
          return (
            <div
              style={{
                marginTop: '8px',
                padding: '8px 10px',
                background: match.isForming ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.6)',
                borderRadius: '6px',
                fontSize: '13px',
                color: 'var(--color-gray-base, #666)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '6px',
              }}
            >
              <span style={{ color: 'var(--color-gray-muted, #999)', flexShrink: 0 }}>📝</span>
              <span>{noteForMatch}</span>
            </div>
          );
        }
        return null;
      })()}
    </div>
  );
}
