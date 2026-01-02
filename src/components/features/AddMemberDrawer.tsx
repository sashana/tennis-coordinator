import { signal } from '@preact/signals';
import { sessionUser, showToast } from '../App';
import { addMember } from '../../hooks/useFirebase';

// Drawer state signals
export const showAddMemberDrawer = signal(false);

// Form state
const memberName = signal('');
const memberPhone = signal('');
const memberEmail = signal('');
const memberNotes = signal('');

function resetForm() {
  memberName.value = '';
  memberPhone.value = '';
  memberEmail.value = '';
  memberNotes.value = '';
}

export function AddMemberDrawer() {
  const handleAddMember = async () => {
    const name = memberName.value.trim();
    const phone = memberPhone.value.trim();

    if (!name) {
      showToast('Please enter member name', 'error');
      return;
    }

    if (!phone) {
      showToast('Please enter phone number for notifications', 'error');
      return;
    }

    await addMember({
      name: name,
      phone: memberPhone.value.trim(),
      email: memberEmail.value.trim(),
      notes: memberNotes.value.trim(),
      addedBy: sessionUser.value || 'Unknown',
    });

    closeDrawer();
  };

  const closeDrawer = () => {
    showAddMemberDrawer.value = false;
    resetForm();
  };

  const handleBackdropClick = (e: Event) => {
    if ((e.target as HTMLElement).classList.contains('drawer-backdrop')) {
      closeDrawer();
    }
  };

  if (!showAddMemberDrawer.value) {
    return null;
  }

  return (
    <div class="drawer-backdrop" onClick={handleBackdropClick}>
      <div class="add-member-drawer">
        {/* Drawer Handle */}
        <div class="drawer-handle">
          <div class="handle-bar"></div>
        </div>

        {/* Header */}
        <div class="add-member-header">
          <h2>Add New Member</h2>
          <p class="drawer-subtitle">Add a teammate to your group</p>
        </div>

        {/* Name */}
        <div class="drawer-section">
          <label class="field-label">
            Name <span class="required">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter member's full name"
            value={memberName.value}
            onInput={(e) => {
              memberName.value = (e.target as HTMLInputElement).value;
            }}
            class="drawer-input"
            autoFocus
          />
        </div>

        {/* Phone (Required) */}
        <div class="drawer-section">
          <label class="field-label">
            Phone <span class="required">*</span>
          </label>
          <div class="input-with-icon">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="#999">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            <input
              type="tel"
              placeholder="Phone number"
              value={memberPhone.value}
              onInput={(e) => {
                memberPhone.value = (e.target as HTMLInputElement).value;
              }}
              class="drawer-input with-icon"
            />
          </div>
          <p class="field-hint">Required for game notifications</p>
        </div>

        {/* Email (Optional) */}
        <div class="drawer-section">
          <label class="field-label">
            Email <span class="optional-tag">optional</span>
          </label>
          <div class="input-with-icon">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="#999">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            <input
              type="email"
              placeholder="Email address"
              value={memberEmail.value}
              onInput={(e) => {
                memberEmail.value = (e.target as HTMLInputElement).value;
              }}
              class="drawer-input with-icon"
            />
          </div>
        </div>

        {/* Notes */}
        <div class="drawer-section">
          <label class="field-label">
            Notes <span class="optional-tag">optional</span>
          </label>
          <textarea
            placeholder="Skill level, how you know them, etc."
            rows={2}
            value={memberNotes.value}
            onInput={(e) => {
              memberNotes.value = (e.target as HTMLTextAreaElement).value;
            }}
            class="drawer-textarea"
          />
        </div>

        {/* Added By Info */}
        <div class="added-by-info">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="#999">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
          </svg>
          <span>
            Added by: <strong>{sessionUser.value || 'Unknown'}</strong>
          </span>
        </div>

        {/* Action Buttons */}
        <div class="drawer-actions">
          <button class="cancel-btn" onClick={closeDrawer}>
            Cancel
          </button>
          <button class="confirm-btn" onClick={handleAddMember}>
            Add Member
          </button>
        </div>
      </div>

      <style>{`
        .drawer-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .add-member-drawer {
          background: white;
          border-radius: 20px 20px 0 0;
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 0 20px calc(30px + env(safe-area-inset-bottom, 0px));
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .drawer-handle {
          display: flex;
          justify-content: center;
          padding: 12px 0 8px;
          position: sticky;
          top: 0;
          background: white;
        }

        .handle-bar {
          width: 40px;
          height: 4px;
          background: #ddd;
          border-radius: 2px;
        }

        .add-member-header {
          text-align: center;
          margin-bottom: 20px;
        }

        .add-member-header h2 {
          margin: 0 0 4px;
          font-size: 22px;
          color: #333;
        }

        .drawer-subtitle {
          margin: 0;
          font-size: 14px;
          color: #666;
        }

        .drawer-section {
          margin-bottom: 20px;
        }

        .field-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }

        .required {
          color: #e53935;
        }

        .optional-tag {
          font-weight: normal;
          color: #999;
          font-size: 12px;
        }

        .drawer-input {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 16px;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }

        .drawer-input:focus {
          outline: none;
          border-color: var(--color-primary, #2C6E49);
        }

        .drawer-input.with-icon {
          padding-left: 44px;
        }

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .input-with-icon {
          position: relative;
        }

        .input-with-icon svg {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
        }

        .field-hint {
          margin: 8px 0 0;
          font-size: 12px;
          color: #888;
        }

        .drawer-textarea {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 16px;
          box-sizing: border-box;
          resize: vertical;
          font-family: inherit;
          transition: border-color 0.2s;
        }

        .drawer-textarea:focus {
          outline: none;
          border-color: var(--color-primary, #2C6E49);
        }

        .added-by-info {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: #f9f9f9;
          border-radius: 10px;
          font-size: 13px;
          color: #666;
          margin-bottom: 20px;
        }

        .drawer-actions {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }

        .cancel-btn {
          flex: 1;
          padding: 16px;
          background: #f5f5f5;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 500;
          color: #666;
          cursor: pointer;
        }

        .cancel-btn:hover {
          background: #e8e8e8;
        }

        .cancel-btn:active {
          transform: scale(0.98);
          background: #e0e0e0;
        }

        .confirm-btn {
          flex: 2;
          padding: 16px;
          background: var(--color-primary, #2C6E49);
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          color: white;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(var(--color-primary-rgb, 44, 110, 73), 0.25);
        }

        .confirm-btn:hover {
          background: var(--color-primary-dark, #1a402b);
        }

        .confirm-btn:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
}

// Helper function to open drawer
export function openAddMemberDrawer() {
  resetForm();
  showAddMemberDrawer.value = true;
}
