/**
 * EditCheckinModal - Modal for editing check-in preferences
 */
import { currentCheckins, sessionUser } from '../../App';
import { updateCheckin } from '../../../hooks/useFirebase';
import { Modal } from '../../ui/Modal';
import {
  editModalOpen,
  editingIndex,
  editPlayStyle,
  editTimeStart,
  editTimeEnd,
  editAllowRotation,
} from './gamesState';

export function closeEditModal() {
  editModalOpen.value = false;
  editingIndex.value = null;
}

export function openEditModal(index: number) {
  const checkin = currentCheckins.value[index];
  if (!checkin) {
    return;
  }

  editingIndex.value = index;
  editPlayStyle.value = checkin.playStyle || 'both';
  editTimeStart.value = checkin.timeRange?.start || '';
  editTimeEnd.value = checkin.timeRange?.end || '';
  editAllowRotation.value = checkin.allowRotation !== false;
  editModalOpen.value = true;
}

async function saveEdit() {
  if (editingIndex.value === null) {
    return;
  }

  const updates: {
    playStyle: string;
    timeRange?: { start: string; end: string };
    allowRotation: boolean;
  } = {
    playStyle: editPlayStyle.value,
    allowRotation: editAllowRotation.value,
  };

  if (editTimeStart.value || editTimeEnd.value) {
    updates.timeRange = {
      start: editTimeStart.value,
      end: editTimeEnd.value,
    };
  }

  await updateCheckin(editingIndex.value, updates, sessionUser.value);
  closeEditModal();
}

export function EditCheckinModal() {
  const checkins = currentCheckins.value;
  const editingCheckin = editingIndex.value !== null ? checkins[editingIndex.value] : null;

  return (
    <Modal
      isOpen={editModalOpen.value}
      onClose={closeEditModal}
      title={`Edit ${editingCheckin?.name || ''}'s Preferences`}
    >
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <label style="display: block; font-weight: 500; margin-bottom: 8px;">Play Style</label>
          <div style="display: flex; gap: 8px;">
            {['singles', 'doubles', 'both'].map((style) => (
              <button
                key={style}
                onClick={() => {
                  editPlayStyle.value = style;
                }}
                style={{
                  flex: 1,
                  padding: '10px',
                  border:
                    editPlayStyle.value === style
                      ? '2px solid var(--color-primary, #2C6E49)'
                      : '2px solid var(--color-border, #e0e0e0)',
                  borderRadius: '8px',
                  background:
                    editPlayStyle.value === style
                      ? 'var(--color-primary-light, #E8F5E9)'
                      : '#fff',
                  color:
                    editPlayStyle.value === style
                      ? 'var(--color-primary, #2E7D32)'
                      : 'var(--color-gray-base, #666)',
                  cursor: 'pointer',
                  fontWeight: editPlayStyle.value === style ? '600' : '400',
                }}
              >
                {style === 'singles' ? 'Singles' : style === 'doubles' ? 'Doubles' : 'Either'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label style="display: block; font-weight: 500; margin-bottom: 8px;">
            Available Time (optional)
          </label>
          <div style="display: flex; gap: 8px; align-items: center;">
            <input
              type="time"
              value={editTimeStart.value}
              onInput={(e) => {
                editTimeStart.value = (e.target as HTMLInputElement).value;
              }}
              style="flex: 1; padding: 8px; border: 1px solid var(--color-gray-light, #ddd); border-radius: 6px;"
            />
            <span>to</span>
            <input
              type="time"
              value={editTimeEnd.value}
              onInput={(e) => {
                editTimeEnd.value = (e.target as HTMLInputElement).value;
              }}
              style="flex: 1; padding: 8px; border: 1px solid var(--color-gray-light, #ddd); border-radius: 6px;"
            />
          </div>
        </div>

        {editPlayStyle.value === 'singles' && (
          <div>
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <input
                type="checkbox"
                checked={editAllowRotation.value}
                onChange={(e) => {
                  editAllowRotation.value = (e.target as HTMLInputElement).checked;
                }}
              />
              <span>Open to 3-player rotation</span>
            </label>
            <p style="font-size: 12px; color: var(--color-gray-base, #666); margin: 4px 0 0 24px;">
              If unchecked, you'll only be matched for 2-player singles
            </p>
          </div>
        )}

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
  );
}
