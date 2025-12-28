/**
 * RemoveCheckinModal - Confirmation modal for removing check-ins
 */
import { sessionUser, selectedDate, currentGroupName } from '../../App';
import { removeCheckin, canRemoveCheckin } from '../../../hooks/useFirebase';
import { formatDate } from '../../../utils/helpers';
import { Modal } from '../../ui/Modal';
import { showSharePrompt, sharePromptData } from '../../pages/MainApp';
import {
  removeModalOpen,
  removeIndex,
  removeName,
  removeIsOwner,
  removeStep,
  removeDate,
  removeGroupName,
} from './gamesState';

export function openRemoveModal(index: number) {
  const result = canRemoveCheckin(index, sessionUser.value);
  if (!result) {
    return;
  }

  removeIndex.value = index;
  removeName.value = result.personName;
  removeIsOwner.value = result.isOwner;
  removeStep.value = 'confirm';
  removeDate.value = selectedDate.value || '';
  removeGroupName.value = currentGroupName.value;
  removeModalOpen.value = true;
}

export function closeRemoveModal() {
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
  if (index === null) {
    return;
  }

  const personName = removeName.value;
  const isOwner = removeIsOwner.value;
  const date = removeDate.value;

  removeIndex.value = null;

  await removeCheckin(index, sessionUser.value);

  closeRemoveModal();

  sharePromptData.value = {
    action: 'removal',
    name: personName,
    date: date,
    isOwner: isOwner,
  };
  showSharePrompt.value = true;
}

export function RemoveCheckinModal() {
  return (
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
            {removeIsOwner.value ? (
              <>
                <p style="color: var(--color-gray-base, #666); margin: 0; line-height: 1.5;">
                  Are you sure you want to remove yourself from this date?
                </p>
                <div style="background: #FFF8E1; border-radius: 8px; padding: 12px; border-left: 4px solid #FFB74D;">
                  <p style="margin: 0 0 8px 0; font-weight: 500; color: #E65100;">
                    Things to consider:
                  </p>
                  <ul style="margin: 0; padding-left: 20px; color: var(--color-gray-base, #666); font-size: 14px;">
                    <li>You'll lose your current spot in the check-in order</li>
                    <li>
                      If you want to change your preferences, you can <strong>edit</strong> instead
                    </li>
                    <li>You can always check in again after removing</li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <p style="color: var(--color-gray-base, #666); margin: 0; line-height: 1.5;">
                  Are you sure you want to remove <strong>{removeName.value}</strong> from this
                  date?
                </p>
                <div style="background: #FFF8E1; border-radius: 8px; padding: 12px; border-left: 4px solid #FFB74D;">
                  <p style="margin: 0; color: var(--color-gray-base, #666); font-size: 14px;">
                    They will lose their spot in the check-in order. Consider using{' '}
                    <strong>edit</strong> to update their preferences instead.
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
                  background: 'var(--color-gray-lightest, #f5f5f5)',
                  color: 'var(--color-gray-base, #666)',
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
            <div style="text-align: center; padding: 8px 0;">
              <div style="font-size: 48px; margin-bottom: 8px;">✓</div>
              <p style="color: var(--color-gray-base, #666); margin: 0;">
                {removeIsOwner.value
                  ? `You've been removed from ${formatDate(removeDate.value)}`
                  : `${removeName.value} has been removed from ${formatDate(removeDate.value)}`}
              </p>
            </div>

            <div>
              <p style="margin: 0 0 8px 0; font-size: 13px; color: var(--color-gray-base, #666); text-align: center;">
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
                    background: 'var(--color-whatsapp, #25D366)',
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
  );
}
