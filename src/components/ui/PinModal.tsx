import { signal } from '@preact/signals';
import { Modal } from './Modal';
import { showToast } from '../App';

interface PinModalProps {
  isOpen: boolean;
  groupName: string;
  correctPin: string;
  onSuccess: () => void;
}

const pinInput = signal('');
const errorMessage = signal('');

export function PinModal({ isOpen, groupName, correctPin, onSuccess }: PinModalProps) {
  const handleSubmit = (e: Event) => {
    e.preventDefault();

    if (pinInput.value === correctPin) {
      errorMessage.value = '';
      pinInput.value = '';
      onSuccess();
    } else {
      errorMessage.value = 'Invalid PIN. Please try again.';
      showToast('Invalid PIN', 'error');
    }
  };

  const handleInputChange = (e: Event) => {
    pinInput.value = (e.target as HTMLInputElement).value;
    errorMessage.value = '';
  };

  return (
    <Modal
      isOpen={isOpen}
      title={`Welcome to ${groupName || 'Tennis Coordinator'}`}
      showCloseButton={false}
    >
      <div style="text-align: center; padding: 20px 0;">
        <p style="font-size: 48px; margin-bottom: 16px;">🎾</p>
        <p style="color: #666; margin-bottom: 24px;">
          Enter the group PIN to access check-ins
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Enter PIN"
            value={pinInput.value}
            onInput={handleInputChange}
            style="
              width: 100%;
              padding: 16px;
              font-size: 24px;
              text-align: center;
              border: 2px solid #e0e0e0;
              border-radius: 12px;
              margin-bottom: 16px;
              letter-spacing: 8px;
            "
            autoFocus
          />

          {errorMessage.value && (
            <p style="color: #f44336; font-size: 14px; margin-bottom: 16px;">
              {errorMessage.value}
            </p>
          )}

          <button
            type="submit"
            style="
              width: 100%;
              padding: 16px;
              background: #4CAF50;
              color: white;
              border: none;
              border-radius: 12px;
              font-size: 18px;
              font-weight: 600;
              cursor: pointer;
            "
          >
            Enter
          </button>
        </form>

        <p style="font-size: 12px; color: #999; margin-top: 16px;">
          Don't know the PIN? Ask your group admin.
        </p>
      </div>
    </Modal>
  );
}
