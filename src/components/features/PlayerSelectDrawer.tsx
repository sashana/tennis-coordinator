import { signal } from '@preact/signals';
import { coreMembers, allCheckins, selectedDate, sessionUser, showToast } from '../App';
import {
  guestName,
  newMemberName,
  newMemberPhone,
  newMemberEmail,
  newMemberNotes,
  addedBy,
  selectedPreference,
  allowRotation,
  startTime,
  endTime,
  showSharePrompt,
  sharePromptData,
} from '../pages/MainApp';
import { openCheckInDrawer } from './CheckInDrawer';
import { addCheckin, addMember } from '../../hooks/useFirebase';

// Drawer state
export const showPlayerSelectDrawer = signal(false);
export const playerSelectMode = signal<'member' | 'guest' | 'newMember'>('member');
const searchQuery = signal('');

export function openPlayerSelectDrawer() {
  playerSelectMode.value = 'member';
  searchQuery.value = '';
  guestName.value = '';
  newMemberName.value = '';
  newMemberPhone.value = '';
  newMemberEmail.value = '';
  newMemberNotes.value = '';
  addedBy.value = sessionUser.value || '';
  selectedPreference.value = 'both';
  showPlayerSelectDrawer.value = true;
}

export function PlayerSelectDrawer() {
  // Get members who haven't checked in yet
  const getAvailableMembers = () => {
    const date = selectedDate.value;
    const checkins = date ? allCheckins.value[date] || [] : [];
    const checkedInNames = new Set(checkins.map((c) => c.name));
    return [...coreMembers.value]
      .filter((name) => !checkedInNames.has(name))
      .sort((a, b) => a.localeCompare(b));
  };

  const availableMembers = getAvailableMembers();
  const query = searchQuery.value.toLowerCase();
  const filteredMembers = query
    ? availableMembers.filter((name) => name.toLowerCase().includes(query))
    : availableMembers;

  const closeDrawer = () => {
    showPlayerSelectDrawer.value = false;
    searchQuery.value = '';
  };

  const handleBackdropClick = (e: Event) => {
    if ((e.target as HTMLElement).classList.contains('drawer-backdrop')) {
      closeDrawer();
    }
  };

  const handleSelectMember = (name: string) => {
    closeDrawer();
    openCheckInDrawer(name, false);
  };

  const handleGuestCheckIn = async () => {
    if (!guestName.value.trim()) {
      showToast('Please enter guest name', 'error');
      return;
    }

    const checkinPlayStyle = selectedPreference.value;
    const checkinTimeRange =
      startTime.value && endTime.value ? { start: startTime.value, end: endTime.value } : undefined;

    await addCheckin({
      name: guestName.value.trim(),
      playStyle: checkinPlayStyle,
      isGuest: true,
      addedBy: sessionUser.value,
      allowRotation: allowRotation.value,
      timeRange: checkinTimeRange,
    });

    sharePromptData.value = {
      action: 'checkin',
      name: guestName.value.trim(),
      playStyle: checkinPlayStyle,
      timeRange: checkinTimeRange,
      date: selectedDate.value || '',
    };
    showSharePrompt.value = true;

    closeDrawer();
  };

  const handleAddNewMemberAndCheckIn = async () => {
    if (!newMemberName.value.trim()) {
      showToast('Please enter member name', 'error');
      return;
    }

    if (!newMemberPhone.value.trim()) {
      showToast('Please enter phone number for notifications', 'error');
      return;
    }

    const memberName = newMemberName.value.trim();

    // First add the member
    await addMember({
      name: memberName,
      phone: newMemberPhone.value.trim(),
      email: newMemberEmail.value.trim(),
      notes: newMemberNotes.value.trim(),
      addedBy: sessionUser.value,
    });

    // Then check them in with default preferences
    const checkinPlayStyle = selectedPreference.value;
    const checkinTimeRange =
      startTime.value && endTime.value ? { start: startTime.value, end: endTime.value } : undefined;

    await addCheckin({
      name: memberName,
      playStyle: checkinPlayStyle,
      isGuest: false,
      addedBy: sessionUser.value,
      allowRotation: allowRotation.value,
      timeRange: checkinTimeRange,
    });

    // Show share prompt for the check-in
    sharePromptData.value = {
      action: 'checkin',
      name: memberName,
      playStyle: checkinPlayStyle,
      timeRange: checkinTimeRange,
      date: selectedDate.value || '',
    };
    showSharePrompt.value = true;

    closeDrawer();
  };

  if (!showPlayerSelectDrawer.value) {
    return null;
  }

  return (
    <div class="drawer-backdrop" onClick={handleBackdropClick}>
      <div class="player-select-drawer">
        {/* Drawer Handle */}
        <div class="drawer-handle">
          <div class="handle-bar"></div>
        </div>

        {/* Header with tabs */}
        <div class="player-select-header">
          <h2>
            {playerSelectMode.value === 'member' && 'Check in a player'}
            {playerSelectMode.value === 'guest' && 'Add Guest'}
            {playerSelectMode.value === 'newMember' && 'Add New Member'}
          </h2>
          <div class="mode-tabs">
            <button
              class={`mode-tab ${playerSelectMode.value === 'member' ? 'active' : ''}`}
              onClick={() => {
                playerSelectMode.value = 'member';
              }}
            >
              Member
            </button>
            <button
              class={`mode-tab ${playerSelectMode.value === 'guest' ? 'active' : ''}`}
              onClick={() => {
                playerSelectMode.value = 'guest';
              }}
            >
              Guest
            </button>
            <button
              class={`mode-tab ${playerSelectMode.value === 'newMember' ? 'active' : ''}`}
              onClick={() => {
                playerSelectMode.value = 'newMember';
              }}
            >
              New Member
            </button>
          </div>
        </div>

        {/* Member Selection */}
        {playerSelectMode.value === 'member' && (
          <>
            <div class="search-container">
              <input
                type="text"
                placeholder="Search member..."
                value={searchQuery.value}
                onInput={(e) => {
                  searchQuery.value = (e.target as HTMLInputElement).value;
                }}
                class="search-input"
              />
            </div>
            <div class="member-list">
              {filteredMembers.map((name) => (
                <button key={name} class="member-row" onClick={() => handleSelectMember(name)}>
                  <div class="member-avatar">{name.charAt(0).toUpperCase()}</div>
                  <span class="member-name">{name}</span>
                </button>
              ))}
              {filteredMembers.length === 0 && (
                <p class="no-results">
                  {availableMembers.length === 0
                    ? 'All members are already checked in'
                    : 'No members found'}
                </p>
              )}
            </div>
          </>
        )}

        {/* Guest Form */}
        {playerSelectMode.value === 'guest' && (
          <div class="form-section">
            <div class="form-field">
              <label>Guest Name</label>
              <input
                type="text"
                placeholder="Enter guest's name"
                value={guestName.value}
                onInput={(e) => {
                  guestName.value = (e.target as HTMLInputElement).value;
                }}
              />
            </div>

            <div class="form-field">
              <label>Play Style</label>
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

            <div class="drawer-actions">
              <button class="cancel-btn" onClick={closeDrawer}>
                Cancel
              </button>
              <button class="confirm-btn" onClick={handleGuestCheckIn}>
                Add & Check In
              </button>
            </div>
          </div>
        )}

        {/* New Member Form */}
        {playerSelectMode.value === 'newMember' && (
          <div class="form-section">
            <div class="form-field">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter member's name"
                value={newMemberName.value}
                onInput={(e) => {
                  newMemberName.value = (e.target as HTMLInputElement).value;
                }}
              />
            </div>

            <div class="form-field">
              <label>
                Phone <span class="required">*</span>
              </label>
              <input
                type="tel"
                placeholder="Phone number (for notifications)"
                value={newMemberPhone.value}
                onInput={(e) => {
                  newMemberPhone.value = (e.target as HTMLInputElement).value;
                }}
              />
            </div>

            <div class="form-field">
              <label>
                Email <span class="optional">(optional)</span>
              </label>
              <input
                type="email"
                placeholder="Email address"
                value={newMemberEmail.value}
                onInput={(e) => {
                  newMemberEmail.value = (e.target as HTMLInputElement).value;
                }}
              />
            </div>

            <div class="form-field">
              <label>
                Notes <span class="optional">(optional)</span>
              </label>
              <textarea
                placeholder="Skill level, how you know them, etc."
                rows={3}
                value={newMemberNotes.value}
                onInput={(e) => {
                  newMemberNotes.value = (e.target as HTMLTextAreaElement).value;
                }}
              />
            </div>

            <p class="added-by-info">
              Added by: <strong>{sessionUser.value || '(unknown)'}</strong>
            </p>

            <div class="drawer-actions">
              <button class="cancel-btn" onClick={closeDrawer}>
                Cancel
              </button>
              <button class="confirm-btn" onClick={handleAddNewMemberAndCheckIn}>
                Add & Check In
              </button>
            </div>
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

        .player-select-drawer {
          background: white;
          border-radius: 20px 20px 0 0;
          width: 100%;
          max-width: 500px;
          max-height: 60vh;
          overflow-y: auto;
          padding: 0 20px 20px;
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
          z-index: 1;
        }

        .handle-bar {
          width: 40px;
          height: 4px;
          background: #ddd;
          border-radius: 2px;
        }

        .player-select-header {
          text-align: center;
          margin-bottom: 12px;
        }

        .player-select-header h2 {
          margin: 0 0 10px;
          font-size: 18px;
          color: #333;
        }

        .mode-tabs {
          display: flex;
          gap: 8px;
          justify-content: center;
        }

        .mode-tab {
          padding: 8px 16px;
          background: #f5f5f5;
          border: none;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
          color: #666;
          cursor: pointer;
          transition: all 0.2s;
        }

        .mode-tab:hover {
          background: #e8e8e8;
        }

        .mode-tab.active {
          background: var(--color-primary, #2C6E49);
          color: white !important;
        }

        .search-container {
          margin-bottom: 12px;
        }

        .search-input {
          width: 100%;
          background: #f3f4f6;
          border: none;
          border-radius: 10px;
          padding: 12px 16px;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
        }

        .search-input:focus {
          background: #fff;
          box-shadow: 0 0 0 2px var(--color-primary, #2C6E49);
        }

        .member-list {
          max-height: 35vh;
          overflow-y: auto;
        }

        .member-row {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          background: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: left;
        }

        .member-row:hover {
          background: var(--color-primary-lightest, #ecfdf5);
        }

        .member-row:active {
          background: var(--color-primary-lighter, #d1fae5);
        }

        .member-avatar {
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--color-primary, #2C6E49) 0%, var(--color-primary-dark, #1a402b) 100%);
          border-radius: 50%;
          color: white;
          font-size: 14px;
          font-weight: 600;
          flex-shrink: 0;
        }

        .member-name {
          font-size: 15px;
          font-weight: 500;
          color: #333;
        }

        .member-row:hover .member-name {
          color: var(--color-primary, #2C6E49);
        }

        .no-results {
          text-align: center;
          color: #9ca3af;
          padding: 24px;
          font-size: 14px;
        }

        .form-section {
          padding-top: 8px;
        }

        .form-field {
          margin-bottom: 16px;
        }

        .form-field label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }

        .form-field .optional {
          font-weight: normal;
          color: #999;
        }

        .form-field .required {
          color: #e53935;
        }

        .form-field input,
        .form-field textarea {
          width: 100%;
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 14px;
          font-family: inherit;
          transition: border-color 0.2s;
        }

        .form-field input:focus,
        .form-field textarea:focus {
          outline: none;
          border-color: var(--color-primary, #2C6E49);
        }

        .form-field textarea {
          resize: vertical;
          min-height: 80px;
        }

        .form-row {
          display: flex;
          gap: 12px;
        }

        .form-row .form-field {
          flex: 1;
        }

        .preference-buttons {
          display: flex;
          gap: 10px;
        }

        .pref-btn {
          flex: 1;
          padding: 12px 10px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          background: white;
          font-size: 14px;
          font-weight: 500;
          color: #333;
          cursor: pointer;
          transition: all 0.2s;
        }

        .pref-btn:hover {
          border-color: #ccc;
        }

        .pref-btn.selected {
          background: var(--color-primary-light, #e8f5e9);
          border-color: var(--color-primary, #2C6E49);
          color: var(--color-primary, #2e7d32);
        }

        .pref-btn.singles.selected {
          background: #fff3e0;
          border-color: #ff9800;
          color: #e65100;
        }

        .pref-btn.doubles.selected {
          background: #e3f2fd;
          border-color: #2196f3;
          color: #1565c0;
        }

        .added-by-info {
          font-size: 13px;
          color: #666;
          margin: 16px 0;
        }

        .added-by-info strong {
          color: var(--color-primary, #2C6E49);
        }

        .drawer-actions {
          display: flex;
          gap: 12px;
          margin-top: 20px;
        }

        .cancel-btn {
          flex: 1;
          padding: 14px;
          background: #f5f5f5;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 500;
          color: #666;
          cursor: pointer;
        }

        .cancel-btn:hover {
          background: #e8e8e8;
        }

        .confirm-btn {
          flex: 2;
          padding: 14px;
          background: var(--color-primary, #2C6E49);
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          color: white;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(var(--color-primary-rgb, 44, 110, 73), 0.25);
        }

        .confirm-btn:hover {
          background: var(--color-primary-dark, #1a402b);
        }
      `}</style>
    </div>
  );
}
