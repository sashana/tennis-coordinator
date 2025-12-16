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
    <Modal isOpen={isOpen} title="" showCloseButton={false}>
      <div class="pin-modal-content">
        <div class="pin-header">
          <p class="tennis-icon">🎾</p>
          <h2>Welcome to</h2>
          <p class="group-name">{groupName || 'Tennis Coordinator'}</p>
        </div>

        <p class="pin-instruction">Enter the group PIN to access check-ins</p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Enter PIN"
            value={pinInput.value}
            onInput={handleInputChange}
            class="pin-input"
            autoFocus
          />

          {errorMessage.value && <p class="error-message">{errorMessage.value}</p>}

          <button type="submit" class="pin-submit-btn">
            Enter
          </button>
        </form>

        <p class="pin-help">Don't know the PIN? Ask your group admin.</p>
      </div>

      <style>{`
        .pin-modal-content {
          padding: 0;
        }

        .pin-header {
          text-align: center;
          padding: 16px 20px 12px;
          background: linear-gradient(135deg, #f9fafb 0%, var(--color-primary-light, #e8f5e9) 100%);
          border-bottom: 1px solid #e5e7eb;
          margin: -20px -20px 0;
          border-radius: 12px 12px 0 0;
        }

        .pin-header .tennis-icon {
          font-size: 40px;
          margin: 0 0 6px;
        }

        .pin-header h2 {
          margin: 0;
          font-size: 16px;
          font-weight: 500;
          color: #666;
        }

        .pin-header .group-name {
          margin: 4px 0 0;
          font-size: 20px;
          font-weight: 700;
          color: var(--color-primary-dark, #1a402b);
        }

        .pin-instruction {
          text-align: center;
          color: #666;
          margin: 16px 0 12px;
          font-size: 13px;
        }

        .pin-input {
          width: 100%;
          padding: 14px;
          font-size: 22px;
          text-align: center;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          margin-bottom: 14px;
          letter-spacing: 6px;
          transition: border-color 0.2s;
        }

        .pin-input:focus {
          outline: none;
          border-color: var(--color-primary, #2C6E49);
        }

        .error-message {
          color: var(--color-error, #f44336);
          font-size: 13px;
          margin-bottom: 14px;
          text-align: center;
        }

        .pin-submit-btn {
          width: 100%;
          padding: 14px;
          background: var(--color-primary, #2C6E49);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 12px var(--shadow-primary, rgba(44, 110, 73, 0.25));
          transition: all 0.2s;
        }

        .pin-submit-btn:hover {
          background: var(--color-primary-dark, #1a402b);
        }

        .pin-help {
          font-size: 11px;
          color: #999;
          margin-top: 14px;
          text-align: center;
        }
      `}</style>
    </Modal>
  );
}
