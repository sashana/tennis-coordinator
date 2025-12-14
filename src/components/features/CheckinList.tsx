import { signal } from '@preact/signals';
import { currentCheckins, sessionUser, currentGroupId, selectedDate, currentGroupName } from '../App';
import { removeCheckin, updateCheckin, canRemoveCheckin } from '../../hooks/useFirebase';
import { formatTime, formatTimeRange, formatDate } from '../../utils/helpers';
import { Modal } from '../ui/Modal';
import { showSharePrompt, sharePromptData } from '../pages/MainApp';
import { TennisEmptyState } from '../ui/TennisEffects';

function normalizeName(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '');
}

function getPreferenceLabel(playStyle: string): string {
  switch (playStyle) {
    case 'singles': return 'Singles';
    case 'doubles': return 'Doubles';
    default: return 'Either';
  }
}

// Edit modal state
const editModalOpen = signal(false);
const editingIndex = signal<number | null>(null);
const editPlayStyle = signal('both');
const editTimeStart = signal('');
const editTimeEnd = signal('');
const editAllowRotation = signal(true);

// Remove confirmation modal state
const removeModalOpen = signal(false);
const removeIndex = signal<number | null>(null);
const removeName = signal('');
const removeIsOwner = signal(false);
const removeStep = signal<'confirm' | 'done'>('confirm');
// Store date/group for share links (they get cleared after removal)
const removeDate = signal('');
const removeGroupName = signal('');

function openRemoveModal(index: number) {
  const result = canRemoveCheckin(index, sessionUser.value);
  if (!result) return; // Permission denied (toast shown by canRemoveCheckin)

  removeIndex.value = index;
  removeName.value = result.personName;
  removeIsOwner.value = result.isOwner;
  removeStep.value = 'confirm';
  removeDate.value = selectedDate.value || '';
  removeGroupName.value = currentGroupName.value;
  removeModalOpen.value = true;
}

function closeRemoveModal() {
  removeModalOpen.value = false;
  removeIndex.value = null;
  removeName.value = '';
  removeIsOwner.value = false;
  removeStep.value = 'confirm';
  removeDate.value = '';
  removeGroupName.value = '';
}

async function confirmRemove() {
  const index = removeIndex.value;
  if (index === null) return;

  // Store data before clearing
  const personName = removeName.value;
  const isOwner = removeIsOwner.value;
  const date = removeDate.value;

  // Clear the index first so the guard doesn't affect us after await
  removeIndex.value = null;

  await removeCheckin(index, sessionUser.value);

  // Close the modal and show share banner instead
  closeRemoveModal();

  // Trigger share banner for removal
  sharePromptData.value = {
    action: 'removal',
    name: personName,
    date: date,
    isOwner: isOwner,
  };
  showSharePrompt.value = true;
}

function openEditModal(index: number) {
  const checkin = currentCheckins.value[index];
  if (!checkin) return;

  editingIndex.value = index;
  editPlayStyle.value = checkin.playStyle || 'both';
  editTimeStart.value = checkin.timeRange?.start || '';
  editTimeEnd.value = checkin.timeRange?.end || '';
  editAllowRotation.value = checkin.allowRotation !== false;
  editModalOpen.value = true;
}

function closeEditModal() {
  editModalOpen.value = false;
  editingIndex.value = null;
}

async function saveEdit() {
  if (editingIndex.value === null) return;

  const updates: {
    playStyle: string;
    timeRange?: { start: string; end: string };
    allowRotation: boolean;
  } = {
    playStyle: editPlayStyle.value,
    allowRotation: editAllowRotation.value,
  };

  // Only include timeRange if at least one value is set
  if (editTimeStart.value || editTimeEnd.value) {
    updates.timeRange = {
      start: editTimeStart.value,
      end: editTimeEnd.value,
    };
  }

  await updateCheckin(editingIndex.value, updates, sessionUser.value);
  closeEditModal();
}

function canEdit(checkin: { name?: string; addedBy?: string }): boolean {
  const groupId = currentGroupId.value;
  const personName = checkin.name || '';
  const isOwner = sessionUser.value && normalizeName(sessionUser.value) === normalizeName(personName);
  const isAdder = checkin.addedBy && sessionUser.value && normalizeName(sessionUser.value) === normalizeName(checkin.addedBy);
  const isAdmin = groupId && sessionStorage.getItem(`adminAuth_${groupId}`) === 'true';
  return !!(isOwner || isAdder || isAdmin);
}

export function CheckinList() {
  const checkins = currentCheckins.value;
  const editingCheckin = editingIndex.value !== null ? checkins[editingIndex.value] : null;

  // Render modals outside the early return so they persist even when checkins become empty
  const modals = (
    <>
      {/* Edit Modal */}
      <Modal
        isOpen={editModalOpen.value}
        onClose={closeEditModal}
        title={`Edit ${editingCheckin?.name || ''}'s Preferences`}
      >
        <div style="display: flex; flex-direction: column; gap: 16px;">
          {/* Play Style */}
          <div>
            <label style="display: block; font-weight: 500; margin-bottom: 8px;">Play Style</label>
            <div style="display: flex; gap: 8px;">
              {['singles', 'doubles', 'both'].map((style) => (
                <button
                  key={style}
                  onClick={() => { editPlayStyle.value = style; }}
                  style={{
                    flex: 1,
                    padding: '10px',
                    border: editPlayStyle.value === style ? '2px solid #2C6E49' : '2px solid #e0e0e0',
                    borderRadius: '8px',
                    background: editPlayStyle.value === style ? '#E8F5E9' : '#fff',
                    color: editPlayStyle.value === style ? '#2E7D32' : '#666',
                    cursor: 'pointer',
                    fontWeight: editPlayStyle.value === style ? '600' : '400',
                  }}
                >
                  {style === 'singles' ? 'Singles' : style === 'doubles' ? 'Doubles' : 'Either'}
                </button>
              ))}
            </div>
          </div>

          {/* Time Range */}
          <div>
            <label style="display: block; font-weight: 500; margin-bottom: 8px;">Available Time (optional)</label>
            <div style="display: flex; gap: 8px; align-items: center;">
              <input
                type="time"
                value={editTimeStart.value}
                onInput={(e) => { editTimeStart.value = (e.target as HTMLInputElement).value; }}
                style="flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 6px;"
              />
              <span>to</span>
              <input
                type="time"
                value={editTimeEnd.value}
                onInput={(e) => { editTimeEnd.value = (e.target as HTMLInputElement).value; }}
                style="flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 6px;"
              />
            </div>
          </div>

          {/* Allow Rotation - only show for singles */}
          {editPlayStyle.value === 'singles' && (
            <div>
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input
                  type="checkbox"
                  checked={editAllowRotation.value}
                  onChange={(e) => { editAllowRotation.value = (e.target as HTMLInputElement).checked; }}
                />
                <span>Open to 3-player rotation</span>
              </label>
              <p style="font-size: 12px; color: #666; margin: 4px 0 0 24px;">
                If unchecked, you'll only be matched for 2-player singles
              </p>
            </div>
          )}

          {/* Save Button */}
          <button
            onClick={saveEdit}
            style={{
              padding: '12px',
              background: 'var(--color-primary, #2C6E49)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '8px',
            }}
          >
            Save Changes
          </button>
        </div>
      </Modal>

      {/* Remove Confirmation Modal */}
      <Modal
        isOpen={removeModalOpen.value}
        onClose={closeRemoveModal}
        title={
          removeStep.value === 'done'
            ? ''
            : removeIsOwner.value
            ? 'Remove Your Check-in?'
            : `Remove ${removeName.value}?`
        }
        showCloseButton={removeStep.value !== 'done'}
      >
        <div style="display: flex; flex-direction: column; gap: 16px;">
          {removeStep.value === 'confirm' ? (
            <>
              {/* Confirmation Step */}
              {removeIsOwner.value ? (
                <>
                  <p style="color: #666; margin: 0; line-height: 1.5;">
                    Are you sure you want to remove yourself from this date?
                  </p>
                  <div style="background: #FFF8E1; border-radius: 8px; padding: 12px; border-left: 4px solid #FFB74D;">
                    <p style="margin: 0 0 8px 0; font-weight: 500; color: #E65100;">
                      Things to consider:
                    </p>
                    <ul style="margin: 0; padding-left: 20px; color: #666; font-size: 14px;">
                      <li>You'll lose your current spot in the check-in order</li>
                      <li>If you want to change your preferences, you can <strong>edit</strong> instead</li>
                      <li>You can always check in again after removing</li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <p style="color: #666; margin: 0; line-height: 1.5;">
                    Are you sure you want to remove <strong>{removeName.value}</strong> from this date?
                  </p>
                  <div style="background: #FFF8E1; border-radius: 8px; padding: 12px; border-left: 4px solid #FFB74D;">
                    <p style="margin: 0; color: #666; font-size: 14px;">
                      They will lose their spot in the check-in order. Consider using <strong>edit</strong> to update their preferences instead.
                    </p>
                  </div>
                </>
              )}

              <div style="display: flex; gap: 12px; margin-top: 8px;">
                <button
                  onClick={closeRemoveModal}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: '#f5f5f5',
                    color: '#666',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRemove}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: '#ef5350',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Yes, Remove
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Done Step - Show share options */}
              <div style="text-align: center; padding: 8px 0;">
                <div style="font-size: 48px; margin-bottom: 8px;">✓</div>
                <p style="color: #666; margin: 0;">
                  {removeIsOwner.value
                    ? `You've been removed from ${formatDate(removeDate.value)}`
                    : `${removeName.value} has been removed from ${formatDate(removeDate.value)}`
                  }
                </p>
              </div>

              {/* Notify Options */}
              <div>
                <p style="margin: 0 0 8px 0; font-size: 13px; color: #666; text-align: center;">
                  Let others know:
                </p>
                <div style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: center;">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      removeIsOwner.value
                        ? `I'm out on ${formatDate(removeDate.value)}.`
                        : `Hi ${removeName.value}, I removed you from ${formatDate(removeDate.value)}. Let me know if you have questions!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '8px 16px',
                      background: '#25D366',
                      color: 'white',
                      borderRadius: '6px',
                      fontSize: '14px',
                      textDecoration: 'none',
                    }}
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`sms:?body=${encodeURIComponent(
                      removeIsOwner.value
                        ? `I'm out on ${formatDate(removeDate.value)}.`
                        : `Hi ${removeName.value}, I removed you from ${formatDate(removeDate.value)}. Let me know if you have questions!`
                    )}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '8px 16px',
                      background: '#007AFF',
                      color: 'white',
                      borderRadius: '6px',
                      fontSize: '14px',
                      textDecoration: 'none',
                    }}
                  >
                    Text
                  </a>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(
                      removeIsOwner.value
                        ? `I'm Out on ${formatDate(removeDate.value)}`
                        : `${removeGroupName.value} - Check-in Removed`
                    )}&body=${encodeURIComponent(
                      removeIsOwner.value
                        ? `I'm out on ${formatDate(removeDate.value)}.`
                        : `Hi ${removeName.value},\n\nI removed you from ${formatDate(removeDate.value)}.\n\nLet me know if you have questions!`
                    )}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '8px 16px',
                      background: '#EA4335',
                      color: 'white',
                      borderRadius: '6px',
                      fontSize: '14px',
                      textDecoration: 'none',
                    }}
                  >
                    Email
                  </a>
                </div>
              </div>

              <button
                onClick={closeRemoveModal}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'var(--color-primary, #2C6E49)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginTop: '8px',
                }}
              >
                Done
              </button>
            </>
          )}
        </div>
      </Modal>
    </>
  );

  if (checkins.length === 0) {
    return (
      <>
        <TennisEmptyState
          message="No check-ins yet"
          subtext="Be the first to check in for this date!"
        />
        {modals}
      </>
    );
  }

  return (
    <>
      <div id="checkinList">
        {checkins.map((checkin, index) => {
          const isCurrentUser = sessionUser.value &&
            normalizeName(checkin.name) === normalizeName(sessionUser.value);
          const itemClass = isCurrentUser ? 'checkin-item current-user' : 'checkin-item';
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

          return (
            <div key={index} class={itemClass}>
              <span>
                <span class="checkin-name">
                  {index + 1}. {checkin.name}
                  {isCurrentUser && <span class="current-user-badge">YOU</span>}
                  {addedByInfo && <span class="guest-indicator"> {addedByInfo}</span>}
                  {timeInfo && <span class="time-badge">{timeInfo}</span>}
                  {checkin.allowRotation === false && (
                    <span class="time-badge" style="background: #fff3e0; color: #e65100;">No 3s</span>
                  )}
                </span>
                <span class={`preference-badge ${checkin.playStyle || 'both'}`}>
                  {getPreferenceLabel(checkin.playStyle || 'both')}
                </span>
                <span class="checkin-time">{formatTime(checkin.timestamp)}</span>
              </span>
              {showEditButton && (
                <div style="display: flex; gap: 4px;">
                  <button
                    class="edit-btn"
                    onClick={() => openEditModal(index)}
                    title="Edit preferences"
                    style={{
                      background: 'rgba(76, 175, 80, 0.1)',
                      color: 'var(--color-primary, #2C6E49)',
                      border: 'none',
                      borderRadius: '50%',
                      padding: '0',
                      width: '28px',
                      height: '28px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    class="remove-btn"
                    onClick={() => openRemoveModal(index)}
                    title="Remove check-in"
                    style={{
                      background: 'rgba(255, 82, 82, 0.1)',
                      color: '#e57373',
                      border: 'none',
                      borderRadius: '50%',
                      padding: '0',
                      width: '28px',
                      height: '28px',
                      fontSize: '18px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {modals}
    </>
  );
}
