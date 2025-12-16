import { signal } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import { Modal } from '../ui/Modal';
import { currentGroupId, sessionUser, coreMembers, showToast } from '../App';
import { getDatabase } from '../../config/firebase';

// UI state
export const showPreferencesModal = signal(false);

// Form state
const excludedPlayers = signal<string[]>([]);
const excludeInput = signal('');

function loadPreferences() {
  const groupId = currentGroupId.value;
  const user = sessionUser.value;
  if (!groupId || !user) {
    return;
  }

  const db = getDatabase();
  const prefsRef = db.ref(`groups/${groupId}/userPreferences/${user}`);

  prefsRef
    .once('value')
    .then((snapshot) => {
      const prefs = (snapshot.val() || {}) as Record<string, unknown>;
      excludedPlayers.value = (prefs.excludedPlayers as string[]) || [];
    })
    .catch((error) => {
      console.error('Error loading preferences:', error);
    });
}

async function savePreferences() {
  const groupId = currentGroupId.value;
  const user = sessionUser.value;
  if (!groupId || !user) {
    return;
  }

  try {
    const db = getDatabase();
    const prefsRef = db.ref(`groups/${groupId}/userPreferences/${user}`);

    await prefsRef.set({
      excludedPlayers: excludedPlayers.value,
      updatedAt: Date.now(),
    });

    showToast('Preferences saved', 'success');
    handleClose();
  } catch (error) {
    console.error('Error saving preferences:', error);
    showToast('Failed to save preferences', 'error');
  }
}

function addExclude() {
  const name = excludeInput.value.trim();
  if (!name) {
    return;
  }

  // Check if name exists in core members
  const matchedName = coreMembers.value.find((m) => m.toLowerCase() === name.toLowerCase());

  if (!matchedName) {
    showToast('Player not found in group', 'error');
    return;
  }

  if (matchedName === sessionUser.value) {
    showToast("You can't exclude yourself", 'error');
    return;
  }

  if (excludedPlayers.value.includes(matchedName)) {
    showToast('Player already excluded', 'error');
    return;
  }

  excludedPlayers.value = [...excludedPlayers.value, matchedName];
  excludeInput.value = '';
}

function removeExclude(name: string) {
  excludedPlayers.value = excludedPlayers.value.filter((n) => n !== name);
}

function handleClose() {
  showPreferencesModal.value = false;
  excludeInput.value = '';
}

export function PreferencesModal() {
  // Load preferences when modal opens
  useEffect(() => {
    if (showPreferencesModal.value) {
      loadPreferences();
    }
  }, [showPreferencesModal.value]);

  // Filter available players for quick selection
  const availablePlayers = coreMembers.value.filter(
    (name) => name !== sessionUser.value && !excludedPlayers.value.includes(name)
  );

  return (
    <Modal
      isOpen={showPreferencesModal.value}
      onClose={handleClose}
      title="Singles Match Preferences"
    >
      <div class="pref-section">
        <h3>Exclude Players</h3>
        <p style="font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-md, 8px);">
          You won't be paired with these players in singles matches
        </p>

        {/* Quick Add from dropdown */}
        {availablePlayers.length > 0 && (
          <div style="margin-bottom: 12px;">
            <select
              onChange={(e) => {
                const value = (e.target as HTMLSelectElement).value;
                if (value) {
                  excludedPlayers.value = [...excludedPlayers.value, value];
                  (e.target as HTMLSelectElement).value = '';
                }
              }}
              style="width: 100%; padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px);"
            >
              <option value="">Select player to exclude...</option>
              {availablePlayers.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Manual input */}
        <div class="pref-input-group" style="display: flex; gap: 8px; margin-bottom: 12px;">
          <input
            type="text"
            placeholder="Or type a name"
            value={excludeInput.value}
            onInput={(e) => {
              excludeInput.value = (e.target as HTMLInputElement).value;
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addExclude();
              }
            }}
            style="flex: 1; padding: var(--spacing-lg, 10px); border: 1px solid var(--color-border, #ddd); border-radius: var(--radius-lg, 8px); font-size: var(--font-size-base, 14px);"
          />
          <button onClick={addExclude}>Add</button>
        </div>

        {/* Excluded list */}
        <div class="pref-list" style="display: flex; flex-wrap: wrap; gap: 8px;">
          {excludedPlayers.value.length === 0 ? (
            <p style="color: var(--color-text-muted, #999); font-size: var(--font-size-sm, 13px);">
              No players excluded
            </p>
          ) : (
            excludedPlayers.value.map((name) => (
              <span
                key={name}
                style="display: inline-flex; align-items: center; gap: var(--spacing-sm, 6px); background: var(--color-error-light, #fee2e2); color: #991b1b; padding: var(--spacing-sm, 6px) var(--spacing-lg, 10px); border-radius: var(--radius-2xl, 16px); font-size: var(--font-size-sm, 13px);"
              >
                {name}
                <button
                  onClick={() => removeExclude(name)}
                  style="background: none; border: none; cursor: pointer; font-size: var(--font-size-lg, 16px); color: #991b1b; padding: 0; line-height: 1;"
                >
                  &times;
                </button>
              </span>
            ))
          )}
        </div>
      </div>

      <div style="margin-top: 16px;">
        <p style="font-size: var(--font-size-xs, 11px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-xl, 12px);">
          Note: These preferences affect how the match organizer pairs players. They won't prevent
          you from being in the same doubles group.
        </p>
        <button
          onClick={savePreferences}
          style="width: 100%; background: var(--color-primary, #2C6E49); color: white;"
        >
          Save Preferences
        </button>
      </div>
    </Modal>
  );
}
