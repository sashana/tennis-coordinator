/**
 * CheckinTile - Renders a single player check-in tile
 */
import { sessionUser, currentGroupId } from '../../App';
import { formatTime, formatTimeRange, normalizeName, getPreferenceLabel } from '../../../utils/helpers';
import { openCheckInDrawer } from '../CheckInDrawer';
import type { CheckinData } from '../../../types';

interface CheckinTileProps {
  checkin: CheckinData;
  globalIndex: number;
}

function canEdit(checkin: { name?: string; addedBy?: string }): boolean {
  const groupId = currentGroupId.value;
  const personName = checkin.name || '';
  const isOwner =
    sessionUser.value && normalizeName(sessionUser.value) === normalizeName(personName);
  const isAdder =
    checkin.addedBy &&
    sessionUser.value &&
    normalizeName(sessionUser.value) === normalizeName(checkin.addedBy);
  const isAdmin = groupId && sessionStorage.getItem(`adminAuth_${groupId}`) === 'true';
  return !!(isOwner || isAdder || isAdmin);
}

export function CheckinTile({ checkin, globalIndex }: CheckinTileProps) {
  const isCurrentUser =
    sessionUser.value && normalizeName(checkin.name) === normalizeName(sessionUser.value);
  const showEditButton = canEdit(checkin);

  let addedByInfo = '';
  if (checkin.isGuest) {
    addedByInfo = `guest of ${checkin.addedBy}`;
  } else if (checkin.addedBy && normalizeName(checkin.addedBy) !== normalizeName(checkin.name)) {
    addedByInfo = `added by ${checkin.addedBy}`;
  }

  const timeInfo = checkin.timeRange
    ? formatTimeRange(checkin.timeRange.start, checkin.timeRange.end)
    : '';

  const handleEditClick = () => {
    openCheckInDrawer(checkin.name, true);
  };

  return (
    <div class={isCurrentUser ? 'checkin-item current-user' : 'checkin-item'}>
      <span>
        <span class="checkin-name">
          {globalIndex >= 0 ? `${globalIndex + 1}. ` : ''}{checkin.name}
          {isCurrentUser && <span class="current-user-badge">YOU</span>}
          {addedByInfo && <span class="guest-indicator"> {addedByInfo}</span>}
          {timeInfo && <span class="time-badge">{timeInfo}</span>}
          {checkin.allowRotation === false && (
            <span
              class="time-badge"
              style="background: var(--color-orange-light, #fff3e0); color: var(--color-orange-dark, #e65100);"
            >
              No 3s
            </span>
          )}
        </span>
        <span class={`preference-badge ${checkin.playStyle || 'both'}`}>
          {getPreferenceLabel(checkin.playStyle || 'both')}
        </span>
        <span class="checkin-time">{formatTime(checkin.timestamp)}</span>
      </span>
      {showEditButton && (
        <button
          class="edit-btn"
          onClick={handleEditClick}
          title="Edit check-in"
          style={{
            background: 'white',
            color: 'var(--color-primary, #2C6E49)',
            border: '1px solid var(--color-border, #e0e0e0)',
            borderRadius: '8px',
            padding: '0',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 0.2s',
          }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
          </svg>
        </button>
      )}
    </div>
  );
}

// Helper to find the global index of a player in the original checkins array
export function findGlobalIndex(checkins: CheckinData[], player: CheckinData): number {
  return checkins.findIndex(
    (c) => normalizeName(c.name) === normalizeName(player.name) && c.timestamp === player.timestamp
  );
}
