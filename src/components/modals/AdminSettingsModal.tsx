import { signal } from '@preact/signals';
import { Modal } from '../ui/Modal';
import { currentGroupId, currentGroupName, showToast } from '../App';
import { groupSettings } from '../../hooks/useFirebase';
import { getDatabase } from '../../config/firebase';
import { showSettingsModal } from '../layout/Header';
import { sport } from '../../config/sport';

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
  if (!groupId) {
    return false;
  }

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
  if (!groupId) {
    return;
  }

  try {
    const db = getDatabase();
    const settingsRef = db.ref(`groups/${groupId}/settings`);

    const updates: Record<string, unknown> = {
      groupName: groupNameInput.value,
      adminPin: adminPinInput.value,
      groupPin: groupPinInput.value,
      groupDescription: groupDescriptionInput.value || null,
      groupRules: groupRulesInput.value || null,
      // Note: theme is saved immediately when selected, not here
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
      location: locationNameInput.value
        ? {
            name: locationNameInput.value,
            lat: parseFloat(locationLatInput.value),
            lon: parseFloat(locationLonInput.value),
          }
        : undefined,
      groupDescription: groupDescriptionInput.value || undefined,
      groupRules: groupRulesInput.value || undefined,
      // Note: theme is preserved from groupSettings.value via spread
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
    // Close modal and return to Profile page instead of showing settings
    showSettingsModal.value = false;
    showToast('Admin mode enabled', 'success');
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
        <div style="padding: var(--spacing-3xl, 20px); text-align: center;">
          <p style="margin-bottom: var(--spacing-2xl, 16px); color: var(--color-text-secondary, #666);">
            Enter admin PIN to access settings
          </p>
          <input
            type="password"
            placeholder="Admin PIN"
            value={adminPinEntry.value}
            onInput={(e) => {
              adminPinEntry.value = (e.target as HTMLInputElement).value;
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAdminPinSubmit();
              }
            }}
            style="width: 100%; max-width: 200px; padding: var(--spacing-xl, 12px); text-align: center; font-size: var(--font-size-xl, 18px); border: 2px solid var(--color-border, #e0e0e0); border-radius: var(--radius-lg, 8px); margin-bottom: var(--spacing-2xl, 16px);"
          />
          <br />
          <button
            onClick={handleAdminPinSubmit}
            style="padding: var(--spacing-xl, 12px) 32px; background: var(--color-primary, #2C6E49); color: white;"
          >
            Submit
          </button>
        </div>
      ) : (
        <>
          {/* Group Settings Section Header */}
          <div style="margin-bottom: var(--spacing-2xl, 16px);">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h3 style="margin: 0; color: var(--color-text-primary, #333);">Group Settings</h3>
              <span style="font-size: var(--font-size-xs, 11px); color: var(--color-text-secondary, #666); background: var(--color-bg-muted, #f5f5f5); padding: 2px var(--spacing-md, 8px); border-radius: var(--radius-lg, 10px);">
                Click Save to apply
              </span>
            </div>
          </div>

          {/* Group Name */}
          <div class="pref-section">
            <h3>Group Name</h3>
            <p style="font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);">
              Display name for this {sport.nameLower} group
            </p>
            <input
              type="text"
              placeholder="e.g., Tue/Thu Midday Doubles"
              value={groupNameInput.value}
              onInput={(e) => {
                groupNameInput.value = (e.target as HTMLInputElement).value;
              }}
              style="width: 100%; margin-bottom: var(--spacing-xl, 12px);"
            />
          </div>

          {/* Group Description */}
          <div class="pref-section">
            <h3>Group Story</h3>
            <p style="font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);">
              Tell your group's story - when/where you play, how it started, etc.
            </p>
            <textarea
              placeholder="e.g., We're a group of friends who play doubles every Tuesday and Thursday at noon at Los Gatos High School courts..."
              value={groupDescriptionInput.value}
              onInput={(e) => {
                groupDescriptionInput.value = (e.target as HTMLTextAreaElement).value;
              }}
              rows={3}
              style="width: 100%; margin-bottom: var(--spacing-xl, 12px); padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); resize: vertical; font-family: inherit; box-sizing: border-box;"
            />
          </div>

          {/* Group Rules */}
          <div class="pref-section">
            <h3>Rules & Tips</h3>
            <p style="font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);">
              House rules, etiquette, and tips for new members (one per line)
            </p>
            <textarea
              placeholder="e.g.,&#10;Check in by 10am on game days&#10;Bring water and sunscreen&#10;New balls provided by rotating member..."
              value={groupRulesInput.value}
              onInput={(e) => {
                groupRulesInput.value = (e.target as HTMLTextAreaElement).value;
              }}
              rows={4}
              style="width: 100%; margin-bottom: var(--spacing-xl, 12px); padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); resize: vertical; font-family: inherit; box-sizing: border-box;"
            />
          </div>

          {/* Admin PIN */}
          <div class="pref-section">
            <h3>Admin PIN</h3>
            <p style="font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);">
              Required to access admin settings
            </p>
            <input
              type="text"
              value={adminPinInput.value}
              onInput={(e) => {
                adminPinInput.value = (e.target as HTMLInputElement).value;
              }}
              style="width: 100%; margin-bottom: var(--spacing-xl, 12px);"
            />
          </div>

          {/* Group PIN */}
          <div class="pref-section">
            <h3>Group PIN</h3>
            <p style="font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);">
              Share this PIN with all group members to access the app
            </p>
            <input
              type="text"
              value={groupPinInput.value}
              onInput={(e) => {
                groupPinInput.value = (e.target as HTMLInputElement).value;
              }}
              style="width: 100%; margin-bottom: var(--spacing-xl, 12px);"
            />
          </div>

          {/* Weather Location */}
          <div class="pref-section">
            <h3>Weather Location</h3>
            <p style="font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);">
              Set the location for weather forecasts
            </p>
            <input
              type="text"
              placeholder="Location name (e.g., Los Gatos, CA)"
              value={locationNameInput.value}
              onInput={(e) => {
                locationNameInput.value = (e.target as HTMLInputElement).value;
              }}
              style="width: 100%; margin-bottom: var(--spacing-md, 8px);"
            />
            <div style="display: flex; gap: var(--spacing-md, 8px); margin-bottom: var(--spacing-xl, 12px);">
              <input
                type="number"
                step="0.0001"
                placeholder="Latitude"
                value={locationLatInput.value}
                onInput={(e) => {
                  locationLatInput.value = (e.target as HTMLInputElement).value;
                }}
                style="flex: 1;"
              />
              <input
                type="number"
                step="0.0001"
                placeholder="Longitude"
                value={locationLonInput.value}
                onInput={(e) => {
                  locationLonInput.value = (e.target as HTMLInputElement).value;
                }}
                style="flex: 1;"
              />
            </div>
            <p style="font-size: var(--font-size-xs, 11px); color: var(--color-text-muted, #999); margin-bottom: var(--spacing-xl, 12px);">
              Tip: Use{' '}
              <a
                href="https://www.latlong.net/"
                target="_blank"
                style="color: var(--color-primary, #2C6E49);"
              >
                latlong.net
              </a>{' '}
              to find coordinates
            </p>
          </div>

          <div style="display: flex; gap: var(--spacing-md, 8px); margin-top: var(--spacing-2xl, 16px);">
            <button
              onClick={handleClose}
              style="flex: 1; background: var(--color-border, #e0e0e0); color: var(--color-text-primary, #333);"
            >
              Close
            </button>
            <button
              onClick={() => saveSettings(true)}
              style="flex: 1; background: var(--color-primary, #2C6E49); color: white;"
            >
              Save & Close
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
