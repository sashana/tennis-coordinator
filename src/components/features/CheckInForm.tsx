// Preact signals are used via imports from MainApp
import {
  sessionUser,
  currentGroupId,
  coreMembers,
  showToast
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
} from '../pages/MainApp';
import { addCheckin, addMember } from '../../hooks/useFirebase';
import { showInvitePrompt } from '../modals/InvitePromptModal';

export function CheckInForm() {
  const handleNameSelect = (e: Event) => {
    const value = (e.target as HTMLSelectElement).value;
    selectedName.value = value;

    if (value === '__guest__') {
      isGuest.value = true;
      isNewMember.value = false;
      isFormExpanded.value = true;
    } else if (value === '__new_member__') {
      isNewMember.value = true;
      isGuest.value = false;
      isFormExpanded.value = true;
    } else if (value) {
      isGuest.value = false;
      isNewMember.value = false;
      isFormExpanded.value = true;

      // Set session user if not already set
      if (!sessionUser.value) {
        sessionUser.value = value;
        const groupId = currentGroupId.value;
        if (groupId) {
          localStorage.setItem(`sessionUser_${groupId}`, value);
        }
      }
    } else {
      isFormExpanded.value = false;
    }
  };

  const handleCheckIn = async () => {
    let name = selectedName.value;
    let guestAddedBy = '';

    if (isGuest.value) {
      if (!guestName.value.trim()) {
        showToast('Please enter guest name', 'error');
        return;
      }
      if (!addedBy.value) {
        showToast('Please select who is adding the guest', 'error');
        return;
      }
      name = guestName.value.trim();
      guestAddedBy = addedBy.value;
    }

    if (!name || name === '__guest__' || name === '__new_member__') {
      showToast('Please select a name', 'error');
      return;
    }

    await addCheckin({
      name,
      playStyle: selectedPreference.value,
      isGuest: isGuest.value,
      addedBy: isGuest.value ? guestAddedBy : sessionUser.value,
      allowRotation: allowRotation.value,
      timeRange: startTime.value && endTime.value
        ? { start: startTime.value, end: endTime.value }
        : undefined,
    });

    // Reset form
    resetForm();
  };

  const handleAddNewMember = async () => {
    if (!newMemberName.value.trim()) {
      showToast('Please enter member name', 'error');
      return;
    }

    if (!sessionUser.value) {
      showToast('Please select your name first', 'error');
      return;
    }

    const memberName = newMemberName.value.trim();
    const memberPhone = newMemberPhone.value.trim();
    const memberEmail = newMemberEmail.value.trim();

    await addMember({
      name: memberName,
      phone: memberPhone,
      email: memberEmail,
      notes: newMemberNotes.value.trim(),
      addedBy: sessionUser.value,
    });

    // Reset new member form
    newMemberName.value = '';
    newMemberPhone.value = '';
    newMemberEmail.value = '';
    newMemberNotes.value = '';
    isNewMember.value = false;
    selectedName.value = '';
    isFormExpanded.value = false;

    // If phone or email provided, prompt to invite
    if (memberPhone || memberEmail) {
      showInvitePrompt(memberName, memberPhone, memberEmail);
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  const resetForm = () => {
    selectedName.value = '';
    isGuest.value = false;
    isNewMember.value = false;
    guestName.value = '';
    newMemberName.value = '';
    newMemberPhone.value = '';
    newMemberEmail.value = '';
    newMemberNotes.value = '';
    addedBy.value = '';
    selectedPreference.value = 'both';
    allowRotation.value = true;
    startTime.value = '';
    endTime.value = '';
    isFormExpanded.value = false;
  };

  const setTimePreset = (start: string, end: string) => {
    startTime.value = start;
    endTime.value = end;
  };

  return (
    <>
      <div class="input-group">
        <select
          id="nameSelect"
          value={selectedName.value}
          onChange={handleNameSelect}
        >
          <option value="">{sessionUser.value ? 'Check-in another player...' : 'Select your name...'}</option>
          {[...coreMembers.value].sort((a, b) => a.localeCompare(b)).map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
          <option disabled>──────────</option>
          <option value="__guest__">+ Add Guest</option>
          <option value="__new_member__">+ Add New Member</option>
        </select>
        {/* Singles preferences button - hidden per original design
        {sessionUser.value && (
          <button
            class="edit-prefs-btn"
            title="Edit Singles Preferences"
            style="display: flex;"
            onClick={() => { showPreferencesModal.value = true; }}
          >
            ⚙️
          </button>
        )}
        */}
      </div>

      {isFormExpanded.value && (
        <div class="collapsible-form expanded" id="checkInFormFields">
          {/* Guest Form */}
          {isGuest.value && (
            <div class="guest-form active">
              <input
                type="text"
                placeholder="Guest's name"
                value={guestName.value}
                onInput={(e) => { guestName.value = (e.target as HTMLInputElement).value; }}
              />
              <select
                value={addedBy.value}
                onChange={(e) => { addedBy.value = (e.target as HTMLSelectElement).value; }}
              >
                <option value="">Who is adding this guest?</option>
                {[...coreMembers.value].sort((a, b) => a.localeCompare(b)).map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
          )}

          {/* New Member Form */}
          {isNewMember.value && (
            <div class="member-form">
              <h3 style="font-size: 14px; margin-bottom: 12px; color: #333;">Add New Member</h3>
              <input
                type="text"
                placeholder="Member's full name"
                value={newMemberName.value}
                onInput={(e) => { newMemberName.value = (e.target as HTMLInputElement).value; }}
                style="margin-bottom: 8px;"
              />
              <div style="display: flex; gap: 8px; margin-bottom: 8px;">
                <input
                  type="tel"
                  placeholder="Phone (optional)"
                  value={newMemberPhone.value}
                  onInput={(e) => { newMemberPhone.value = (e.target as HTMLInputElement).value; }}
                  style="flex: 1;"
                />
                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={newMemberEmail.value}
                  onInput={(e) => { newMemberEmail.value = (e.target as HTMLInputElement).value; }}
                  style="flex: 1;"
                />
              </div>
              <textarea
                placeholder="Notes (skill level, how you know them, etc.) - optional"
                rows={3}
                value={newMemberNotes.value}
                onInput={(e) => { newMemberNotes.value = (e.target as HTMLTextAreaElement).value; }}
                style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 8px; font-family: inherit; font-size: 14px; resize: vertical; margin-bottom: 12px;"
              />
              <div style="font-size: 12px; color: #666; margin-bottom: 12px;">
                Added by: <strong>{sessionUser.value || '(select your name first)'}</strong>
              </div>
              <div style="display: flex; gap: 8px;">
                <button onClick={handleCancel} style="flex: 1; background: #ccc; color: #333;">Cancel</button>
                <button onClick={handleAddNewMember} style="flex: 2; background: #4CAF50; color: white;">Add Member</button>
              </div>
            </div>
          )}

          {/* Regular Check-in Form */}
          {!isNewMember.value && (
            <>
              <div class="preference-group">
                <button
                  class={`preference-btn singles ${selectedPreference.value === 'singles' ? 'selected' : ''}`}
                  onClick={() => { selectedPreference.value = 'singles'; }}
                >
                  Singles Only
                </button>
                <button
                  class={`preference-btn ${selectedPreference.value === 'both' ? 'selected' : ''}`}
                  onClick={() => { selectedPreference.value = 'both'; }}
                >
                  Either
                </button>
                <button
                  class={`preference-btn doubles ${selectedPreference.value === 'doubles' ? 'selected' : ''}`}
                  onClick={() => { selectedPreference.value = 'doubles'; }}
                >
                  Doubles Only
                </button>
              </div>

              <div class="time-slots">
                <h3>Available Time (optional)</h3>

                <div style="display: flex; gap: 6px; margin-bottom: 12px; flex-wrap: wrap;">
                  <button class="time-preset-btn" onClick={() => setTimePreset('08:00', '12:00')}>
                    Morning<br /><small>8am-12pm</small>
                  </button>
                  <button class="time-preset-btn" onClick={() => setTimePreset('12:00', '15:00')}>
                    Midday<br /><small>12-3pm</small>
                  </button>
                  <button class="time-preset-btn" onClick={() => setTimePreset('15:00', '18:00')}>
                    Afternoon<br /><small>3-6pm</small>
                  </button>
                  <button class="time-preset-btn" onClick={() => setTimePreset('18:00', '21:00')}>
                    Evening<br /><small>6-9pm</small>
                  </button>
                </div>

                <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                  <input
                    type="time"
                    value={startTime.value}
                    onInput={(e) => { startTime.value = (e.target as HTMLInputElement).value; }}
                    style="flex: 1; min-width: 120px; padding: 10px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 14px;"
                  />
                  <span style="color: #666;">to</span>
                  <input
                    type="time"
                    value={endTime.value}
                    onInput={(e) => { endTime.value = (e.target as HTMLInputElement).value; }}
                    style="flex: 1; min-width: 120px; padding: 10px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 14px;"
                  />
                  <button
                    onClick={() => { startTime.value = ''; endTime.value = ''; }}
                    style="padding: 10px 12px; background: #f5f5f5; color: #666; font-size: 13px;"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div class="rotation-option" style="margin-bottom: 16px; padding: 12px; background: #f9f9f9; border-radius: 8px;">
                <label style="display: flex; align-items: center; gap: 4px; cursor: pointer; font-size: 14px;">
                  <input
                    type="checkbox"
                    checked={allowRotation.value}
                    onChange={(e) => { allowRotation.value = (e.target as HTMLInputElement).checked; }}
                    style="width: 18px; height: 18px; cursor: pointer; margin-right: 4px;"
                  />
                  <span>Willing to play 3-player rotation (1v1 or 1v2 format)</span>
                </label>
                <div style="font-size: 12px; color: #666; margin-top: 4px; margin-left: 26px;">
                  If unchecked, you'll only be placed in doubles or singles matches
                </div>
              </div>

              <div style="display: flex; gap: 10px; margin-top: 16px;">
                <button onClick={handleCancel} style="flex: 1; background: #f5f5f5; color: #666;">
                  Cancel
                </button>
                <button onClick={handleCheckIn} style="flex: 2; background: #4CAF50; color: white;">
                  Check In
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
