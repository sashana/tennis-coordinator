import { signal } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import { currentGroupId, currentGroupName, showToast } from '../App';
import { groupSettings } from '../../hooks/useFirebase';
import { getDatabase } from '../../config/firebase';

// Local form state
const groupNameInput = signal('');
const adminPinInput = signal('');
const groupPinInput = signal('');
const locationNameInput = signal('');
const locationLatInput = signal('');
const locationLonInput = signal('');
const groupDescriptionInput = signal('');
const groupRulesInput = signal('');
const isLoaded = signal(false);

function loadSettingsValues() {
  groupNameInput.value = currentGroupName.value || '';
  adminPinInput.value = groupSettings.value.adminPin || '';
  groupPinInput.value = groupSettings.value.groupPin || '';
  locationNameInput.value = groupSettings.value.location?.name || '';
  locationLatInput.value = groupSettings.value.location?.lat?.toString() || '';
  locationLonInput.value = groupSettings.value.location?.lon?.toString() || '';
  groupDescriptionInput.value = groupSettings.value.groupDescription || '';
  groupRulesInput.value = groupSettings.value.groupRules || '';
  isLoaded.value = true;
}

async function saveSettings() {
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
  } catch (error) {
    console.error('Error saving settings:', error);
    showToast('Failed to save settings', 'error');
  }
}

export function GroupSettingsContent() {
  // Load values on mount
  useEffect(() => {
    loadSettingsValues();
    return () => {
      isLoaded.value = false;
    };
  }, []);

  if (!isLoaded.value) {
    return <div style="padding: 20px; text-align: center; color: var(--color-text-muted, #999);">Loading...</div>;
  }

  return (
    <div>
      {/* Group Name */}
      <div class="pref-section">
        <h3 style="margin: 0 0 var(--spacing-md, 8px) 0; font-size: var(--font-size-md, 15px);">Group Name</h3>
        <p style="font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);">Display name for this tennis group</p>
        <input
          type="text"
          placeholder="e.g., Tue/Thu Midday Doubles"
          value={groupNameInput.value}
          onInput={(e) => { groupNameInput.value = (e.target as HTMLInputElement).value; }}
          style="width: 100%; padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); box-sizing: border-box; margin-bottom: var(--spacing-xl, 12px);"
        />
      </div>

      {/* Group Description */}
      <div class="pref-section">
        <h3 style="margin: 0 0 var(--spacing-md, 8px) 0; font-size: var(--font-size-md, 15px);">Group Story</h3>
        <p style="font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);">Tell your group's story - when/where you play, how it started, etc.</p>
        <textarea
          placeholder="e.g., We're a group of friends who play doubles every Tuesday and Thursday at noon at Los Gatos High School courts..."
          value={groupDescriptionInput.value}
          onInput={(e) => { groupDescriptionInput.value = (e.target as HTMLTextAreaElement).value; }}
          rows={3}
          style="width: 100%; margin-bottom: var(--spacing-xl, 12px); padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); resize: vertical; font-family: inherit; box-sizing: border-box;"
        />
      </div>

      {/* Group Rules */}
      <div class="pref-section">
        <h3 style="margin: 0 0 var(--spacing-md, 8px) 0; font-size: var(--font-size-md, 15px);">Rules & Tips</h3>
        <p style="font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);">House rules, etiquette, and tips for new members (one per line)</p>
        <textarea
          placeholder="e.g.,&#10;Check in by 10am on game days&#10;Bring water and sunscreen&#10;New balls provided by rotating member..."
          value={groupRulesInput.value}
          onInput={(e) => { groupRulesInput.value = (e.target as HTMLTextAreaElement).value; }}
          rows={4}
          style="width: 100%; margin-bottom: var(--spacing-xl, 12px); padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); resize: vertical; font-family: inherit; box-sizing: border-box;"
        />
      </div>

      {/* Admin PIN */}
      <div class="pref-section">
        <h3 style="margin: 0 0 var(--spacing-md, 8px) 0; font-size: var(--font-size-md, 15px);">Admin PIN</h3>
        <p style="font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);">Required to access admin settings</p>
        <input
          type="text"
          value={adminPinInput.value}
          onInput={(e) => { adminPinInput.value = (e.target as HTMLInputElement).value; }}
          style="width: 100%; padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); box-sizing: border-box; margin-bottom: var(--spacing-xl, 12px);"
        />
      </div>

      {/* Group PIN */}
      <div class="pref-section">
        <h3 style="margin: 0 0 var(--spacing-md, 8px) 0; font-size: var(--font-size-md, 15px);">Group PIN</h3>
        <p style="font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);">Share this PIN with all group members to access the app</p>
        <input
          type="text"
          value={groupPinInput.value}
          onInput={(e) => { groupPinInput.value = (e.target as HTMLInputElement).value; }}
          style="width: 100%; padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); box-sizing: border-box; margin-bottom: var(--spacing-xl, 12px);"
        />
      </div>

      {/* Weather Location */}
      <div class="pref-section">
        <h3 style="margin: 0 0 var(--spacing-md, 8px) 0; font-size: var(--font-size-md, 15px);">Weather Location</h3>
        <p style="font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);">Set the location for weather forecasts</p>
        <input
          type="text"
          placeholder="Location name (e.g., Los Gatos, CA)"
          value={locationNameInput.value}
          onInput={(e) => { locationNameInput.value = (e.target as HTMLInputElement).value; }}
          style="width: 100%; padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); box-sizing: border-box; margin-bottom: var(--spacing-md, 8px);"
        />
        <div style="display: flex; gap: var(--spacing-md, 8px); margin-bottom: var(--spacing-md, 8px);">
          <input
            type="number"
            step="0.0001"
            placeholder="Latitude"
            value={locationLatInput.value}
            onInput={(e) => { locationLatInput.value = (e.target as HTMLInputElement).value; }}
            style="flex: 1; padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); box-sizing: border-box;"
          />
          <input
            type="number"
            step="0.0001"
            placeholder="Longitude"
            value={locationLonInput.value}
            onInput={(e) => { locationLonInput.value = (e.target as HTMLInputElement).value; }}
            style="flex: 1; padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px); box-sizing: border-box;"
          />
        </div>
        <p style="font-size: var(--font-size-xs, 11px); color: var(--color-text-muted, #999); margin-bottom: var(--spacing-xl, 12px);">
          Tip: Use <a href="https://www.latlong.net/" target="_blank" style="color: var(--color-primary, #2C6E49);">latlong.net</a> to find coordinates
        </p>
      </div>

      <button
        onClick={saveSettings}
        style={{
          width: '100%',
          padding: 'var(--spacing-xl, 12px)',
          background: 'var(--color-primary, #2C6E49)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-lg, 8px)',
          fontSize: 'var(--font-size-base, 14px)',
          fontWeight: '500',
          cursor: 'pointer',
          marginTop: 'var(--spacing-xl, 12px)',
        }}
      >
        Save Settings
      </button>
    </div>
  );
}
