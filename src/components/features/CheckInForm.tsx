// Preact signals are used via imports from MainApp
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
  isFormExpanded,
  selectedName,
  selectedPreference,
  isGuest,
  isNewMember,
  guestName,
  newMemberName,
  newMemberPhone,
  newMemberEmail,
  newMemberNotes,
  addedBy,
  allowRotation,
  startTime,
  endTime,
  showSharePrompt,
  sharePromptData,
} from '../pages/MainApp';
import { addCheckin, addMember } from '../../hooks/useFirebase';
import { openCheckInDrawer } from './CheckInDrawer';
import { openPlayerSelectDrawer } from './PlayerSelectDrawer';

// Helper to get current user's check-in status
function getUserCheckinStatus() {
  const user = sessionUser.value;
  const date = selectedDate.value;
  if (!user || !date) {
    return null;
  }

  const checkins = allCheckins.value[date] || [];
  const userCheckin = checkins.find((c) => c.name === user);
  return userCheckin || null;
}

// Helper to get check-in index
function getUserCheckinIndex() {
  const user = sessionUser.value;
  const date = selectedDate.value;
  if (!user || !date) {
    return -1;
  }

  const checkins = allCheckins.value[date] || [];
  return checkins.findIndex((c) => c.name === user);
}

// Format play style for display
function formatPlayStyle(style: string) {
  if (style === 'singles') {
    return 'Singles only';
  }
  if (style === 'doubles') {
    return 'Doubles only';
  }
  return 'Either';
}

// Format time range for display
function formatTimeDisplay(timeRange?: { start: string; end: string }) {
  if (!timeRange || !timeRange.start || !timeRange.end) {
    return null;
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours);
    const suffix = h >= 12 ? 'pm' : 'am';
    const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return minutes === '00' ? `${displayHour}${suffix}` : `${displayHour}:${minutes}${suffix}`;
  };

  return `${formatTime(timeRange.start)} - ${formatTime(timeRange.end)}`;
}

export function CheckInForm() {
  // Explicitly access sessionUser to trigger re-render when it changes
  const user = sessionUser.value;
  const currentCheckin = getUserCheckinStatus();
  const isCheckedIn = !!currentCheckin;

  const handleCheckInClick = () => {
    // Open the drawer for self check-in
    openCheckInDrawer();
  };

  const handleEditClick = () => {
    // Open drawer in edit mode with current user's data
    openCheckInDrawer(sessionUser.value, true);
  };

  const handleCheckInSomeoneElse = () => {
    openPlayerSelectDrawer();
  };

  return (
    <>
      {/* Main Check-in UI */}
      <div class="checkin-cta-section">
        {isCheckedIn ? (
          // Already checked in - show compact status card
          <div class="checkin-status-card" onClick={handleEditClick}>
            <div class="status-row">
              <span class="status-icon">&#10003;</span>
              <span class="status-text">You're in!</span>
              <div class="status-details">
                <span class="detail-item">{formatPlayStyle(currentCheckin.playStyle)}</span>
                {currentCheckin.allowRotation !== false && (
                  <span class="detail-item rotation">Open to 3s</span>
                )}
                {currentCheckin.timeRange && (
                  <span class="detail-item time">
                    {formatTimeDisplay(currentCheckin.timeRange)}
                  </span>
                )}
              </div>
              <button
                class="edit-icon-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditClick();
                }}
                title="Edit"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          // Not checked in - show CTA button
          <button class="checkin-cta-btn" onClick={handleCheckInClick}>
            Check In to Play
          </button>
        )}

        {/* Check in someone else link */}
        <button class="checkin-other-link" onClick={handleCheckInSomeoneElse}>
          Check in someone else
        </button>
      </div>

      <style>{`
        .checkin-cta-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 8px 0 0;
          margin-bottom: -8px;
        }

        .checkin-cta-btn {
          width: 100%;
          padding: 18px 24px;
          background: var(--color-primary, #2C6E49);
          border: none;
          border-radius: 14px;
          color: white;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(var(--color-primary-rgb, 44, 110, 73), 0.3);
          transition: all 0.2s;
        }

        .checkin-cta-btn:hover {
          background: var(--color-primary-dark, #1a402b);
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(var(--color-primary-rgb, 44, 110, 73), 0.4);
        }

        .checkin-cta-btn:active {
          transform: translateY(0);
        }

        .checkin-status-card {
          width: 100%;
          background: linear-gradient(135deg, var(--color-primary-light, #e8f5e9) 0%, var(--color-primary-lighter, #c8e6c9) 100%);
          border: 2px solid var(--color-primary, #2C6E49);
          border-radius: 12px;
          padding: 12px 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .checkin-status-card:hover {
          background: linear-gradient(135deg, var(--color-primary-lighter, #c8e6c9) 0%, var(--color-primary-lightest, #a5d6a7) 100%);
        }

        .status-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .status-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          background: var(--color-primary, #2C6E49);
          color: white;
          border-radius: 50%;
          font-size: 14px;
          font-weight: bold;
          flex-shrink: 0;
        }

        .status-text {
          font-size: 16px;
          font-weight: 600;
          color: var(--color-primary, #2C6E49);
          flex-shrink: 0;
        }

        .status-details {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          flex: 1;
          min-width: 0;
        }

        .detail-item {
          padding: 3px 8px;
          background: white;
          border-radius: 12px;
          font-size: 12px;
          color: #555;
          white-space: nowrap;
        }

        .detail-item.rotation {
          background: #e3f2fd;
          color: #1565c0;
        }

        .detail-item.time {
          background: #fff3e0;
          color: #e65100;
        }

        .edit-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          padding: 0;
          background: white;
          border: 1px solid var(--color-primary-lighter, #c8e6c9);
          border-radius: 8px;
          color: var(--color-primary, #2C6E49);
          cursor: pointer;
          flex-shrink: 0;
          margin-left: auto;
          transition: all 0.2s;
        }

        .edit-icon-btn:hover {
          background: var(--color-primary-light, #f1f8e9);
          border-color: var(--color-primary, #2C6E49);
        }

        .checkin-other-link {
          padding: 4px 12px;
          background: transparent;
          border: none;
          color: #888 !important;
          font-size: 11px;
          cursor: pointer;
          text-decoration: none;
          border-radius: 12px;
          transition: all 0.2s;
        }

        .checkin-other-link:hover {
          background: var(--color-primary, #2C6E49);
          color: white !important;
        }

        /* Member Selection Panel */
        .member-selection-panel {
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 14px;
          overflow: hidden;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 16px;
          background: #f5f5f5;
          border-bottom: 1px solid #e0e0e0;
        }

        .panel-header h3 {
          margin: 0;
          font-size: 16px;
          color: #333;
        }

        .close-panel-btn {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border: 1px solid #ddd;
          border-radius: 50%;
          font-size: 18px;
          color: #666;
          cursor: pointer;
        }

        .close-panel-btn:hover {
          background: #f5f5f5;
        }

        .member-list {
          max-height: 300px;
          overflow-y: auto;
          padding: 8px;
        }

        .member-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 12px;
          background: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }

        .member-item:hover {
          background: #f5f5f5;
        }

        .member-initial {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, var(--color-primary, #2C6E49) 0%, var(--color-primary-dark, #1a402b) 100%);
          border-radius: 50%;
          color: white;
          font-size: 16px;
          font-weight: 600;
        }

        .member-name {
          font-size: 15px;
          color: #333;
        }

        .panel-footer {
          display: flex;
          gap: 8px;
          padding: 12px 16px;
          background: #fafafa;
          border-top: 1px solid #e0e0e0;
        }

        .add-guest-btn,
        .add-member-btn {
          flex: 1;
          padding: 10px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 13px;
          color: #666;
          cursor: pointer;
        }

        .add-guest-btn:hover,
        .add-member-btn:hover {
          background: #f5f5f5;
          border-color: var(--color-primary, #2C6E49);
          color: var(--color-primary, #2C6E49);
        }
      `}</style>
    </>
  );
}
