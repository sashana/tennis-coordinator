import { signal } from '@preact/signals';
import {
  sessionUser,
  currentGroupId,
  coreMembers,
  allCheckins,
  selectedDate,
  showToast,
} from '../App';
import {
  selectedPreference,
  allowRotation,
  startTime,
  endTime,
  showSharePrompt,
  sharePromptData,
} from '../pages/MainApp';
import { addCheckin, removeCheckin, updateCheckin } from '../../hooks/useFirebase';

// Drawer state signals
export const showCheckInDrawer = signal(false);
export const checkInTargetUser = signal<string | null>(null); // null = self, string = someone else
export const isEditMode = signal(false);
export const editingCheckinIndex = signal<number>(-1);

// Helper to get current check-in data for a user
function getUserCheckinData(userName: string) {
  const date = selectedDate.value;
  if (!date) {
    return null;
  }

  const checkins = allCheckins.value[date] || [];
  const index = checkins.findIndex((c) => c.name === userName);
  if (index === -1) {
    return null;
  }

  return { checkin: checkins[index], index };
}

export function CheckInDrawer() {
  const targetUser = checkInTargetUser.value || sessionUser.value;
  const isForSelf = !checkInTargetUser.value || checkInTargetUser.value === sessionUser.value;

  const setTimePreset = (start: string, end: string) => {
    startTime.value = start;
    endTime.value = end;
  };

  const handleConfirmCheckIn = async () => {
    if (!targetUser) {
      showToast('Please select a user first', 'error');
      return;
    }

    const checkinPlayStyle = selectedPreference.value;
    const checkinTimeRange =
      startTime.value && endTime.value ? { start: startTime.value, end: endTime.value } : undefined;

    // If editing, use updateCheckin instead of addCheckin
    if (isEditMode.value && editingCheckinIndex.value >= 0) {
      await updateCheckin(
        editingCheckinIndex.value,
        {
          playStyle: checkinPlayStyle,
          allowRotation: allowRotation.value,
          timeRange: checkinTimeRange,
        },
        sessionUser.value || ''
      );
    } else {
      await addCheckin({
        name: targetUser,
        playStyle: checkinPlayStyle,
        isGuest: false,
        addedBy: sessionUser.value,
        allowRotation: allowRotation.value,
        timeRange: checkinTimeRange,
      });
    }

    // Show share prompt
    sharePromptData.value = {
      action: 'checkin',
      name: targetUser,
      playStyle: checkinPlayStyle,
      timeRange: checkinTimeRange,
      date: selectedDate.value || '',
    };
    showSharePrompt.value = true;

    // Close drawer and reset
    closeDrawer();
  };

  const handleRemoveCheckIn = async () => {
    if (editingCheckinIndex.value < 0) {
      return;
    }

    await removeCheckin(editingCheckinIndex.value, sessionUser.value);

    // Show removal notification
    sharePromptData.value = {
      action: 'removal',
      name: targetUser || '',
      date: selectedDate.value || '',
      isOwner: isForSelf,
    };
    showSharePrompt.value = true;

    closeDrawer();
  };

  const closeDrawer = () => {
    showCheckInDrawer.value = false;
    checkInTargetUser.value = null;
    isEditMode.value = false;
    editingCheckinIndex.value = -1;
    // Reset form values
    selectedPreference.value = 'both';
    allowRotation.value = true;
    startTime.value = '';
    endTime.value = '';
  };

  const handleBackdropClick = (e: Event) => {
    if ((e.target as HTMLElement).classList.contains('drawer-backdrop')) {
      closeDrawer();
    }
  };

  if (!showCheckInDrawer.value) {
    return null;
  }

  return (
    <div class="drawer-backdrop" onClick={handleBackdropClick}>
      <div class="check-in-drawer">
        {/* Drawer Handle */}
        <div class="drawer-handle">
          <div class="handle-bar"></div>
        </div>

        {/* Header */}
        <div class="checkin-header">
          <h2>{isEditMode.value ? 'Edit Check-in' : 'Check In'}</h2>
          <div class="player-display">
            <div class="player-avatar">{targetUser?.charAt(0).toUpperCase()}</div>
            <div class="player-info">
              <span class="player-name">{targetUser}</span>
              <span class="player-context">
                {isForSelf ? 'Playing as yourself' : 'Checking in for them'}
              </span>
            </div>
          </div>
        </div>

        {/* Play Style */}
        <div class="drawer-section">
          <h3>Play Style</h3>
          <div class="preference-buttons">
            <button
              class={`pref-btn singles ${selectedPreference.value === 'singles' ? 'selected' : ''}`}
              onClick={() => {
                selectedPreference.value = 'singles';
              }}
            >
              Singles
            </button>
            <button
              class={`pref-btn ${selectedPreference.value === 'both' ? 'selected' : ''}`}
              onClick={() => {
                selectedPreference.value = 'both';
              }}
            >
              Either
            </button>
            <button
              class={`pref-btn doubles ${selectedPreference.value === 'doubles' ? 'selected' : ''}`}
              onClick={() => {
                selectedPreference.value = 'doubles';
              }}
            >
              Doubles
            </button>
          </div>
        </div>

        {/* Rotation Option */}
        <div class="drawer-section">
          <label class="rotation-toggle">
            <input
              type="checkbox"
              checked={allowRotation.value}
              onChange={(e) => {
                allowRotation.value = (e.target as HTMLInputElement).checked;
              }}
            />
            <span class="toggle-label">
              <span class="toggle-title">Open to 3-player rotation</span>
              <span class="toggle-desc">1v1 or 1v2 format when needed</span>
            </span>
          </label>
        </div>

        {/* Time Availability */}
        <div class="drawer-section">
          <h3>
            Available Time <span class="optional-tag">optional</span>
          </h3>
          <div class="time-presets">
            <button
              class={`time-btn ${startTime.value === '08:00' && endTime.value === '12:00' ? 'selected' : ''}`}
              onClick={() => setTimePreset('08:00', '12:00')}
            >
              <span class="time-label">Morning</span>
              <span class="time-range">8am-12pm</span>
            </button>
            <button
              class={`time-btn ${startTime.value === '12:00' && endTime.value === '15:00' ? 'selected' : ''}`}
              onClick={() => setTimePreset('12:00', '15:00')}
            >
              <span class="time-label">Midday</span>
              <span class="time-range">12-3pm</span>
            </button>
            <button
              class={`time-btn ${startTime.value === '15:00' && endTime.value === '18:00' ? 'selected' : ''}`}
              onClick={() => setTimePreset('15:00', '18:00')}
            >
              <span class="time-label">Afternoon</span>
              <span class="time-range">3-6pm</span>
            </button>
            <button
              class={`time-btn ${startTime.value === '18:00' && endTime.value === '21:00' ? 'selected' : ''}`}
              onClick={() => setTimePreset('18:00', '21:00')}
            >
              <span class="time-label">Evening</span>
              <span class="time-range">6-9pm</span>
            </button>
          </div>
          <div class="custom-time">
            <input
              type="time"
              value={startTime.value}
              onInput={(e) => {
                startTime.value = (e.target as HTMLInputElement).value;
              }}
              placeholder="Start"
            />
            <span class="time-separator">to</span>
            <input
              type="time"
              value={endTime.value}
              onInput={(e) => {
                endTime.value = (e.target as HTMLInputElement).value;
              }}
              placeholder="End"
            />
            {(startTime.value || endTime.value) && (
              <button
                class="clear-time-btn"
                onClick={() => {
                  startTime.value = '';
                  endTime.value = '';
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div class="drawer-actions">
          <button class="cancel-btn" onClick={closeDrawer}>
            Cancel
          </button>
          <button class="confirm-btn" onClick={handleConfirmCheckIn}>
            {isEditMode.value ? 'Update' : 'Confirm'}
          </button>
        </div>

        {/* Remove Check-in (only in edit mode) */}
        {isEditMode.value && (
          <div class="drawer-remove">
            <button class="remove-btn" onClick={handleRemoveCheckIn}>
              Remove Check-in
            </button>
          </div>
        )}
      </div>

      <style>{`
        .drawer-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .check-in-drawer {
          background: white;
          border-radius: 20px 20px 0 0;
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 0 20px calc(30px + env(safe-area-inset-bottom, 0px));
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .drawer-handle {
          display: flex;
          justify-content: center;
          padding: 12px 0 8px;
          position: sticky;
          top: 0;
          background: white;
        }

        .handle-bar {
          width: 40px;
          height: 4px;
          background: var(--color-gray-light, #ddd);
          border-radius: 2px;
        }

        .checkin-header {
          text-align: center;
          margin-bottom: 20px;
        }

        .checkin-header h2 {
          margin: 0 0 12px;
          font-size: 22px;
          color: var(--color-text-primary, #333);
        }

        .player-display {
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: center;
          background: var(--color-bg-subtle, #f9f9f9);
          padding: 12px 16px;
          border-radius: 12px;
        }

        .player-avatar {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--color-primary, #2C6E49) 0%, var(--color-primary-dark, #1a402b) 100%);
          border-radius: 50%;
          color: white;
          font-size: 18px;
          font-weight: 600;
          flex-shrink: 0;
        }

        .player-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
        }

        .player-name {
          font-size: 16px;
          font-weight: 600;
          color: var(--color-text-primary, #333);
        }

        .player-context {
          font-size: 12px;
          color: var(--color-text-secondary, #666);
        }

        .drawer-section {
          margin-bottom: 20px;
        }

        .drawer-section h3 {
          margin: 0 0 12px;
          font-size: 14px;
          color: var(--color-text-primary, #333);
          font-weight: 600;
        }

        .optional-tag {
          font-weight: normal;
          color: var(--color-text-muted, #999);
          font-size: 12px;
        }

        .preference-buttons {
          display: flex;
          gap: 12px;
        }

        .pref-btn {
          flex: 1;
          padding: 14px 10px;
          border: 2px solid var(--color-border, #e0e0e0);
          border-radius: 12px;
          background: white;
          font-size: 14px;
          font-weight: 500;
          color: var(--color-text-primary, #333);
          cursor: pointer;
          transition: all 0.2s;
        }

        .pref-btn:hover {
          border-color: var(--color-gray-disabled, #ccc);
        }

        .pref-btn:active {
          transform: scale(0.97);
        }

        .pref-btn.selected {
          background: var(--color-primary, #2C6E49);
          border-color: var(--color-primary, #2C6E49);
          color: white;
        }

        .pref-btn.singles.selected {
          background: var(--color-primary, #2C6E49);
          border-color: var(--color-primary, #2C6E49);
          color: white;
        }

        .pref-btn.doubles.selected {
          background: var(--color-primary, #2C6E49);
          border-color: var(--color-primary, #2C6E49);
          color: white;
        }

        .rotation-toggle {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px;
          background: var(--color-bg-subtle, #f9f9f9);
          border-radius: 12px;
          cursor: pointer;
        }

        .rotation-toggle input[type="checkbox"] {
          width: 20px;
          height: 20px;
          margin-top: 2px;
          cursor: pointer;
        }

        .toggle-label {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .toggle-title {
          font-size: 14px;
          font-weight: 500;
          color: var(--color-text-primary, #333);
        }

        .toggle-desc {
          font-size: 12px;
          color: var(--color-text-secondary, #666);
        }

        .time-presets {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 12px;
        }

        .time-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 12px 8px;
          border: 2px solid var(--color-border, #e0e0e0);
          border-radius: 10px;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
        }

        .time-btn:hover {
          border-color: var(--color-primary, #2C6E49);
          background: var(--color-primary-lightest, #f8fff8);
        }

        .time-btn:active {
          transform: scale(0.95);
        }

        .time-btn.selected {
          background: var(--color-primary, #2C6E49);
          border-color: var(--color-primary, #2C6E49);
          box-shadow: 0 4px 6px -1px rgba(var(--color-primary-rgb, 44, 110, 73), 0.3);
        }

        .time-btn.selected .time-label,
        .time-btn.selected .time-range {
          color: white;
        }

        .time-label {
          font-size: 12px;
          font-weight: 500;
          color: var(--color-text-primary, #333);
        }

        .time-range {
          font-size: 10px;
          color: var(--color-text-secondary, #666);
          margin-top: 2px;
        }

        .custom-time {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .custom-time input[type="time"] {
          flex: 1;
          padding: 12px;
          border: 2px solid var(--color-border, #e0e0e0);
          border-radius: 10px;
          font-size: 16px;
        }

        .custom-time input[type="time"]:focus {
          outline: none;
          border-color: var(--color-primary, #2C6E49);
        }

        .time-separator {
          color: var(--color-text-secondary, #666);
          font-size: 14px;
        }

        .clear-time-btn {
          padding: 12px 14px;
          background: var(--color-gray-lightest, #f5f5f5);
          border: none;
          border-radius: 10px;
          color: var(--color-text-secondary, #666);
          font-size: 13px;
          cursor: pointer;
        }

        .clear-time-btn:hover {
          background: var(--color-border, #e0e0e0);
        }

        .drawer-actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }

        .cancel-btn {
          flex: 1;
          padding: 16px;
          background: var(--color-gray-lightest, #f5f5f5);
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 500;
          color: var(--color-text-secondary, #666);
          cursor: pointer;
        }

        .cancel-btn:hover {
          background: var(--color-bg-page, #e8e8e8);
        }

        .cancel-btn:active {
          transform: scale(0.98);
        }

        .confirm-btn {
          flex: 2;
          padding: 16px;
          background: var(--color-primary, #2C6E49);
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          color: white;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(var(--color-primary-rgb, 44, 110, 73), 0.25);
        }

        .confirm-btn:hover {
          background: var(--color-primary-dark, #1a402b);
        }

        .confirm-btn:active {
          transform: scale(0.98);
        }

        .drawer-remove {
          margin-top: 16px;
          text-align: center;
        }

        .remove-btn {
          padding: 12px 24px;
          background: transparent;
          border: none;
          color: var(--color-error, #e53935);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }

        .remove-btn:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

// Helper function to open drawer for check-in
export function openCheckInDrawer(targetUser?: string, editMode?: boolean) {
  if (targetUser) {
    checkInTargetUser.value = targetUser;
  } else {
    checkInTargetUser.value = null;
  }

  if (editMode && targetUser) {
    isEditMode.value = true;
    // Load existing check-in data
    const userData = getUserCheckinData(targetUser);
    if (userData) {
      editingCheckinIndex.value = userData.index;
      selectedPreference.value = userData.checkin.playStyle || 'both';
      allowRotation.value = userData.checkin.allowRotation !== false;
      if (userData.checkin.timeRange) {
        startTime.value = userData.checkin.timeRange.start || '';
        endTime.value = userData.checkin.timeRange.end || '';
      }
    }
  } else {
    isEditMode.value = false;
    editingCheckinIndex.value = -1;
    // Reset to defaults
    selectedPreference.value = 'both';
    allowRotation.value = true;
    startTime.value = '';
    endTime.value = '';
  }

  showCheckInDrawer.value = true;
}
