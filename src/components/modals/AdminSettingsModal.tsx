import { signal } from '@preact/signals';
import { Modal } from '../ui/Modal';
import { currentGroupId, currentGroupName, showToast } from '../App';
import { groupSettings } from '../../hooks/useFirebase';
import { getDatabase } from '../../config/firebase';
import { showSettingsModal, showActivityModal } from '../layout/Header';
import { showMemberModal } from './MemberManagementModal';

// Local form state
const groupNameInput = signal('');
const adminPinInput = signal('');
const groupPinInput = signal('');
const locationNameInput = signal('');
const locationLatInput = signal('');
const locationLonInput = signal('');
const groupDescriptionInput = signal('');
const groupRulesInput = signal('');
const adminPinRequired = signal(true);
const adminPinEntry = signal('');

// Check if admin pin was already entered this session
const isAdminAuthenticated = signal(false);

function checkAdminAuth(): boolean {
  const groupId = currentGroupId.value;
  if (!groupId) return false;

  const authKey = `adminAuth_${groupId}`;
  return sessionStorage.getItem(authKey) === 'true';
}

function setAdminAuth() {
  const groupId = currentGroupId.value;
  if (groupId) {
    sessionStorage.setItem(`adminAuth_${groupId}`, 'true');
    isAdminAuthenticated.value = true;
  }
}

function loadSettingsValues() {
  groupNameInput.value = currentGroupName.value || '';
  adminPinInput.value = groupSettings.value.adminPin || '';
  groupPinInput.value = groupSettings.value.groupPin || '';
  locationNameInput.value = groupSettings.value.location?.name || '';
  locationLatInput.value = groupSettings.value.location?.lat?.toString() || '';
  locationLonInput.value = groupSettings.value.location?.lon?.toString() || '';
  groupDescriptionInput.value = groupSettings.value.groupDescription || '';
  groupRulesInput.value = groupSettings.value.groupRules || '';

  // Check if already authenticated
  isAdminAuthenticated.value = checkAdminAuth();
  adminPinRequired.value = !isAdminAuthenticated.value && !!groupSettings.value.adminPin;
  adminPinEntry.value = '';
}

async function saveSettings(closeAfter = false) {
  const groupId = currentGroupId.value;
  if (!groupId) return;

  try {
    const db = getDatabase();
    const settingsRef = db.ref(`groups/${groupId}/settings`);

    const updates: Record<string, unknown> = {
      groupName: groupNameInput.value,
      adminPin: adminPinInput.value,
      groupPin: groupPinInput.value,
      groupDescription: groupDescriptionInput.value || null,
      groupRules: groupRulesInput.value || null,
    };

    if (locationNameInput.value && locationLatInput.value && locationLonInput.value) {
      updates.location = {
        name: locationNameInput.value,
        lat: parseFloat(locationLatInput.value),
        lon: parseFloat(locationLonInput.value),
      };
    }

    await settingsRef.update(updates);

    // Update local state
    currentGroupName.value = groupNameInput.value;
    groupSettings.value = {
      ...groupSettings.value,
      adminPin: adminPinInput.value,
      groupPin: groupPinInput.value,
      location: locationNameInput.value ? {
        name: locationNameInput.value,
        lat: parseFloat(locationLatInput.value),
        lon: parseFloat(locationLonInput.value),
      } : undefined,
      groupDescription: groupDescriptionInput.value || undefined,
      groupRules: groupRulesInput.value || undefined,
    };

    showToast('Settings saved', 'success');

    if (closeAfter) {
      handleClose();
    }
  } catch (error) {
    console.error('Error saving settings:', error);
    showToast('Failed to save settings', 'error');
  }
}

function handleAdminPinSubmit() {
  if (adminPinEntry.value === groupSettings.value.adminPin) {
    setAdminAuth();
    adminPinRequired.value = false;
  } else {
    showToast('Incorrect PIN', 'error');
    adminPinEntry.value = '';
  }
}

function handleClose() {
  showSettingsModal.value = false;
}

export function AdminSettingsModal() {
  // Load values when modal opens
  if (showSettingsModal.value && groupNameInput.value === '' && currentGroupName.value) {
    loadSettingsValues();
  }

  return (
    <Modal
      isOpen={showSettingsModal.value}
      onClose={handleClose}
      title="Admin Settings"
      subtitle={`Managing: ${currentGroupName.value}`}
    >
      {/* Admin PIN Gate */}
      {adminPinRequired.value ? (
        <div style="padding: 20px; text-align: center;">
          <p style="margin-bottom: 16px; color: #666;">Enter admin PIN to access settings</p>
          <input
            type="password"
            placeholder="Admin PIN"
            value={adminPinEntry.value}
            onInput={(e) => { adminPinEntry.value = (e.target as HTMLInputElement).value; }}
            onKeyPress={(e) => { if (e.key === 'Enter') handleAdminPinSubmit(); }}
            style="width: 100%; max-width: 200px; padding: 12px; text-align: center; font-size: 18px; border: 2px solid #e0e0e0; border-radius: 8px; margin-bottom: 16px;"
          />
          <br />
          <button onClick={handleAdminPinSubmit} style="padding: 12px 32px; background: #4CAF50; color: white;">
            Submit
          </button>
        </div>
      ) : (
        <>
          {/* Quick Actions */}
          <div style="margin-bottom: 16px;">
            <button
              onClick={() => {
                showActivityModal.value = true;
                showSettingsModal.value = false;
              }}
              style="width: 100%; padding: 12px 16px; background: #f5f5f5; border: 1px solid #e0e0e0; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 10px; font-size: 14px; color: #333;"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style="color: #666;">
                <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
              </svg>
              <div style="flex: 1; text-align: left;">
                <div style="font-weight: 500;">Activity History</div>
                <div style="font-size: 12px; color: #666;">View all check-ins, changes, and match updates</div>
              </div>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style="color: #999;">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </button>
          </div>

          {/* Manage Members Button */}
          <div style="margin-bottom: 16px;">
            <button
              onClick={() => {
                showMemberModal.value = true;
                showSettingsModal.value = false;
              }}
              style="width: 100%; padding: 12px 16px; background: #f5f5f5; border: 1px solid #e0e0e0; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 10px; font-size: 14px; color: #333;"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style="color: #4CAF50;">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
              <div style="flex: 1; text-align: left;">
                <div style="font-weight: 500;">Manage Members</div>
                <div style="font-size: 12px; color: #666;">Add, edit, or remove group members</div>
              </div>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style="color: #999;">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </button>
          </div>

          {/* Group Settings Section Header */}
          <div style="margin-bottom: 16px; padding-top: 16px; border-top: 1px solid #e0e0e0;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h3 style="margin: 0; color: #333;">Group Settings</h3>
              <span style="font-size: 11px; color: #666; background: #f5f5f5; padding: 2px 8px; border-radius: 10px;">Click Save to apply</span>
            </div>
          </div>

          {/* Group Name */}
          <div class="pref-section">
            <h3>Group Name</h3>
            <p style="font-size: 12px; color: #666; margin-bottom: 8px;">Display name for this tennis group</p>
            <input
              type="text"
              placeholder="e.g., Tue/Thu Midday Doubles"
              value={groupNameInput.value}
              onInput={(e) => { groupNameInput.value = (e.target as HTMLInputElement).value; }}
              style="width: 100%; margin-bottom: 12px;"
            />
          </div>

          {/* Group Description */}
          <div class="pref-section">
            <h3>Group Story</h3>
            <p style="font-size: 12px; color: #666; margin-bottom: 8px;">Tell your group's story - when/where you play, how it started, etc.</p>
            <textarea
              placeholder="e.g., We're a group of friends who play doubles every Tuesday and Thursday at noon at Los Gatos High School courts..."
              value={groupDescriptionInput.value}
              onInput={(e) => { groupDescriptionInput.value = (e.target as HTMLTextAreaElement).value; }}
              rows={3}
              style="width: 100%; margin-bottom: 12px; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; resize: vertical; font-family: inherit; box-sizing: border-box;"
            />
          </div>

          {/* Group Rules */}
          <div class="pref-section">
            <h3>Rules & Tips</h3>
            <p style="font-size: 12px; color: #666; margin-bottom: 8px;">House rules, etiquette, and tips for new members (one per line)</p>
            <textarea
              placeholder="e.g.,&#10;Check in by 10am on game days&#10;Bring water and sunscreen&#10;New balls provided by rotating member..."
              value={groupRulesInput.value}
              onInput={(e) => { groupRulesInput.value = (e.target as HTMLTextAreaElement).value; }}
              rows={4}
              style="width: 100%; margin-bottom: 12px; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; resize: vertical; font-family: inherit; box-sizing: border-box;"
            />
          </div>

          {/* Admin PIN */}
          <div class="pref-section">
            <h3>Admin PIN</h3>
            <p style="font-size: 12px; color: #666; margin-bottom: 8px;">Required to access admin settings</p>
            <input
              type="text"
              value={adminPinInput.value}
              onInput={(e) => { adminPinInput.value = (e.target as HTMLInputElement).value; }}
              style="width: 100%; margin-bottom: 12px;"
            />
          </div>

          {/* Group PIN */}
          <div class="pref-section">
            <h3>Group PIN</h3>
            <p style="font-size: 12px; color: #666; margin-bottom: 8px;">Share this PIN with all group members to access the app</p>
            <input
              type="text"
              value={groupPinInput.value}
              onInput={(e) => { groupPinInput.value = (e.target as HTMLInputElement).value; }}
              style="width: 100%; margin-bottom: 12px;"
            />
          </div>

          {/* Weather Location */}
          <div class="pref-section">
            <h3>Weather Location</h3>
            <p style="font-size: 12px; color: #666; margin-bottom: 8px;">Set the location for weather forecasts</p>
            <input
              type="text"
              placeholder="Location name (e.g., Los Gatos, CA)"
              value={locationNameInput.value}
              onInput={(e) => { locationNameInput.value = (e.target as HTMLInputElement).value; }}
              style="width: 100%; margin-bottom: 8px;"
            />
            <div style="display: flex; gap: 8px; margin-bottom: 12px;">
              <input
                type="number"
                step="0.0001"
                placeholder="Latitude"
                value={locationLatInput.value}
                onInput={(e) => { locationLatInput.value = (e.target as HTMLInputElement).value; }}
                style="flex: 1;"
              />
              <input
                type="number"
                step="0.0001"
                placeholder="Longitude"
                value={locationLonInput.value}
                onInput={(e) => { locationLonInput.value = (e.target as HTMLInputElement).value; }}
                style="flex: 1;"
              />
            </div>
            <p style="font-size: 11px; color: #999; margin-bottom: 12px;">
              Tip: Use <a href="https://www.latlong.net/" target="_blank" style="color: #4CAF50;">latlong.net</a> to find coordinates
            </p>
          </div>

          <div style="display: flex; gap: 8px; margin-top: 16px;">
            <button onClick={handleClose} style="flex: 1; background: #e0e0e0; color: #333;">
              Close
            </button>
            <button onClick={() => saveSettings(true)} style="flex: 1; background: #4CAF50; color: white;">
              Save & Close
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
