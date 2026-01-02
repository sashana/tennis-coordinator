import { signal } from '@preact/signals';
import { sessionUser, showToast, memberDetails, currentGroupId } from '../App';
import { updateMemberDetails, renameMember, removeMember } from '../../hooks/useFirebase';
import { currentPlatformUser, updateProfile, refreshPlatformUser } from '../../hooks/usePlatformUser';
import { sport } from '../../config/sport';

// Drawer state signals
export const showEditMemberDrawer = signal(false);
export const editingMemberName = signal<string | null>(null);

// Form state
const memberName = signal('');
const memberPhone = signal('');
const memberEmail = signal('');
const memberNotes = signal('');
const shareContactInDirectory = signal(false);
const shareNotesInDirectory = signal(false);
const skillLevel = signal('');
const ntrpRating = signal('');
const saving = signal(false);
const confirmingRemove = signal(false);

// Skill level options
const SKILL_LEVELS = [
  { value: '', label: 'Not specified' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'competitive', label: 'Competitive' },
  { value: 'pro', label: 'Pro' },
];

// Check if user is logged in as group admin
function isGroupAdmin(): boolean {
  const groupId = currentGroupId.value;
  if (!groupId) {
    return false;
  }
  return sessionStorage.getItem(`adminAuth_${groupId}`) === 'true';
}

function resetForm() {
  memberName.value = '';
  memberPhone.value = '';
  memberEmail.value = '';
  memberNotes.value = '';
  shareContactInDirectory.value = false;
  shareNotesInDirectory.value = false;
  skillLevel.value = '';
  ntrpRating.value = '';
  saving.value = false;
  confirmingRemove.value = false;
}

export function EditMemberDrawer() {
  const currentMember = editingMemberName.value;
  const isAdmin = isGroupAdmin();
  const isEditingSelf = currentMember === sessionUser.value;
  const canEditName = isAdmin && !isEditingSelf; // Admin can rename others, not self
  const canRemove = isAdmin && !isEditingSelf; // Admin can remove others

  const handleSave = async () => {
    if (!currentMember) {
      return;
    }

    const trimmedName = memberName.value.trim();
    if (!trimmedName) {
      showToast('Please enter member name', 'error');
      return;
    }

    saving.value = true;

    // Check if name changed (admin renaming another member)
    if (canEditName && trimmedName !== currentMember) {
      const renameSuccess = await renameMember(currentMember, trimmedName);
      if (!renameSuccess) {
        saving.value = false;
        return;
      }
      // Update the editing name to reflect the rename
      editingMemberName.value = trimmedName;
    }

    // Now update the member details
    const success = await updateMemberDetails(trimmedName, {
      phone: memberPhone.value.trim(),
      email: memberEmail.value.trim(),
      notes: memberNotes.value.trim(),
      shareContactInDirectory: shareContactInDirectory.value,
      shareNotesInDirectory: shareNotesInDirectory.value,
    });

    // If editing self, also save to platform user (shared across groups)
    if (isEditingSelf && currentPlatformUser.value) {
      try {
        const profileUpdates: Record<string, unknown> = {};

        // Contact info (shared across groups)
        const phone = memberPhone.value.trim();
        const email = memberEmail.value.trim();
        if (phone) {
          profileUpdates.phone = phone;
        }
        if (email) {
          profileUpdates.email = email;
        }

        // Tennis profile
        if (skillLevel.value) {
          profileUpdates.skillLevel = skillLevel.value;
        }
        if (ntrpRating.value) {
          const rating = parseFloat(ntrpRating.value);
          if (!isNaN(rating) && rating >= 1.0 && rating <= 7.0) {
            profileUpdates.ntrpRating = rating;
          }
        }
        if (Object.keys(profileUpdates).length > 0) {
          await updateProfile(profileUpdates);
        }
      } catch (err) {
        console.warn('Failed to update platform profile:', err);
        // Don't fail the whole save for this
      }
    }

    saving.value = false;

    if (success) {
      showToast('Profile updated', 'success');
      closeDrawer();
    } else {
      showToast('Failed to update profile', 'error');
    }
  };

  const handleRemove = async () => {
    if (!currentMember || !canRemove) {
      return;
    }

    if (!confirmingRemove.value) {
      confirmingRemove.value = true;
      return;
    }

    saving.value = true;
    const success = await removeMember(currentMember);
    saving.value = false;

    if (success) {
      showToast(`${currentMember} removed from team`, 'success');
      closeDrawer();
    } else {
      showToast('Failed to remove member', 'error');
    }
  };

  const closeDrawer = () => {
    showEditMemberDrawer.value = false;
    editingMemberName.value = null;
    resetForm();
  };

  const handleBackdropClick = (e: Event) => {
    if ((e.target as HTMLElement).classList.contains('drawer-backdrop')) {
      closeDrawer();
    }
  };

  if (!showEditMemberDrawer.value || !currentMember) {
    return null;
  }

  return (
    <div class="drawer-backdrop" onClick={handleBackdropClick}>
      <div class="edit-member-drawer">
        {/* Drawer Handle */}
        <div class="drawer-handle">
          <div class="handle-bar"></div>
        </div>

        {/* Header */}
        <div class="edit-member-header">
          <h2>{isEditingSelf ? 'Edit Your Profile' : 'Edit Member'}</h2>
          <p class="drawer-subtitle">
            {isEditingSelf
              ? 'Update your contact info and privacy settings'
              : `Update ${currentMember}'s information`}
          </p>
        </div>

        {/* Name (editable by admin for other members) */}
        <div class="drawer-section">
          <label class="field-label">
            Name {canEditName && <span class="optional-tag">editable</span>}
          </label>
          <input
            type="text"
            placeholder="Member name"
            value={memberName.value}
            onInput={(e) => {
              memberName.value = (e.target as HTMLInputElement).value;
            }}
            class="drawer-input"
            disabled={!canEditName}
            style={!canEditName ? { background: '#f5f5f5', color: '#666' } : {}}
          />
        </div>

        {/* Contact Info */}
        <div class="drawer-section">
          <label class="field-label">
            Contact Info <span class="optional-tag">optional</span>
          </label>
          <div class="contact-inputs">
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
        </div>

        {/* Notes */}
        <div class="drawer-section">
          <label class="field-label">
            Notes <span class="optional-tag">optional</span>
          </label>
          <textarea
            placeholder="Availability, preferences, etc."
            rows={2}
            value={memberNotes.value}
            onInput={(e) => {
              memberNotes.value = (e.target as HTMLTextAreaElement).value;
            }}
            class="drawer-textarea"
          />
        </div>

        {/* Player Profile - only shown when editing self */}
        {isEditingSelf && (
          <div class="drawer-section">
            <label class="field-label">Player Profile</label>
            <div class="player-profile-fields">
              <div class="field-row">
                <label class="field-sublabel">Skill Level</label>
                <select
                  value={skillLevel.value}
                  onChange={(e) => {
                    skillLevel.value = (e.target as HTMLSelectElement).value;
                  }}
                  class="drawer-select"
                >
                  {SKILL_LEVELS.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
              {sport.features.skillRating && (
                <div class="field-row">
                  <label class="field-sublabel">{sport.features.skillRating} Rating</label>
                  <input
                    type="number"
                    placeholder="e.g., 3.5"
                    value={ntrpRating.value}
                    onInput={(e) => {
                      ntrpRating.value = (e.target as HTMLInputElement).value;
                    }}
                    min="1.0"
                    max="7.0"
                    step="0.5"
                    class="drawer-input ntrp-input"
                  />
                </div>
              )}
            </div>
            <p class="field-hint">Your skill info is saved across all your groups</p>
          </div>
        )}

        {/* Privacy Options */}
        <div class="drawer-section">
          <label class="field-label">Privacy Settings</label>
          <div class="privacy-options">
            <label class="privacy-option">
              <input
                type="checkbox"
                checked={shareContactInDirectory.value}
                onChange={(e) => {
                  shareContactInDirectory.value = (e.target as HTMLInputElement).checked;
                }}
              />
              <div class="privacy-option-content">
                <span class="privacy-option-title">Share contact info in directory</span>
                <span class="privacy-option-desc">Phone and email visible to all members</span>
              </div>
            </label>
            <label class="privacy-option">
              <input
                type="checkbox"
                checked={shareNotesInDirectory.value}
                onChange={(e) => {
                  shareNotesInDirectory.value = (e.target as HTMLInputElement).checked;
                }}
              />
              <div class="privacy-option-content">
                <span class="privacy-option-title">Share profile notes in directory</span>
                <span class="privacy-option-desc">Notes visible to all members</span>
              </div>
            </label>
          </div>
        </div>

        {/* Remove Member Button (Admin only, not for self) */}
        {canRemove && (
          <div class="drawer-section">
            <button
              class={`remove-btn ${confirmingRemove.value ? 'confirming' : ''}`}
              onClick={handleRemove}
              disabled={saving.value}
            >
              {confirmingRemove.value ? 'Tap again to confirm removal' : 'Remove from Team'}
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div class="drawer-actions">
          <button class="cancel-btn" onClick={closeDrawer} disabled={saving.value}>
            Cancel
          </button>
          <button class="confirm-btn" onClick={handleSave} disabled={saving.value}>
            {saving.value ? 'Saving...' : 'Save Changes'}
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

        .edit-member-drawer {
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

        .edit-member-header {
          text-align: center;
          margin-bottom: 20px;
        }

        .edit-member-header h2 {
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

        .drawer-input:disabled {
          cursor: not-allowed;
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

        .privacy-options {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .privacy-option {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          cursor: pointer;
        }

        .privacy-option input[type="checkbox"] {
          width: 20px;
          height: 20px;
          min-width: 20px;
          flex-shrink: 0;
          cursor: pointer;
          accent-color: var(--color-primary, #2C6E49);
          margin: 0;
        }

        .privacy-option-content {
          display: inline;
        }

        .privacy-option-title {
          font-size: 13px;
          color: #333;
        }

        .privacy-option-desc {
          display: none;
        }

        .remove-btn {
          width: 100%;
          padding: 14px;
          background: #fff;
          border: 2px solid #e53935;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 500;
          color: #e53935;
          cursor: pointer;
          transition: all 0.2s;
        }

        .remove-btn:hover {
          background: #ffebee;
        }

        .remove-btn:active {
          transform: scale(0.98);
        }

        .remove-btn.confirming {
          background: #e53935;
          color: white;
        }

        .remove-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
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

        .cancel-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
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

        .confirm-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .drawer-select {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 16px;
          box-sizing: border-box;
          background: white;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23666' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 24px;
          padding-right: 40px;
          transition: border-color 0.2s;
          cursor: pointer;
        }

        .drawer-select:focus {
          outline: none;
          border-color: var(--color-primary, #2C6E49);
        }

        .player-profile-fields {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .field-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .field-sublabel {
          font-size: 13px;
          color: #666;
          font-weight: 500;
        }

        .field-hint {
          font-size: 12px;
          color: #999;
          margin: 8px 0 0 0;
        }

        .ntrp-input {
          max-width: 120px;
        }
      `}</style>
    </div>
  );
}

// Helper function to load platform user data into form
function loadPlatformUserData(details: Record<string, unknown> | undefined) {
  const profile = currentPlatformUser.value?.profile;
  if (!profile) {
    // No platform user, use group details
    memberPhone.value = (details?.phone as string) || '';
    memberEmail.value = (details?.email as string) || '';
    skillLevel.value = '';
    ntrpRating.value = '';
    return;
  }

  // Lazy migration: if platform user has no contact but group does, migrate it
  if (!profile.phone && !profile.email && (details?.phone || details?.email)) {
    const migrationUpdates: Record<string, string> = {};
    if (details?.phone) migrationUpdates.phone = details.phone as string;
    if (details?.email) migrationUpdates.email = details.email as string;

    // Migrate in background (fire-and-forget)
    updateProfile(migrationUpdates).catch((err) => {
      console.warn('Contact migration failed (non-fatal):', err);
    });

    // Use group details for this session (will be in platform next time)
    memberPhone.value = (details?.phone as string) || '';
    memberEmail.value = (details?.email as string) || '';
  } else {
    // Prefer platform user contact info (shared), fall back to group details
    memberPhone.value = profile.phone || (details?.phone as string) || '';
    memberEmail.value = profile.email || (details?.email as string) || '';
  }

  skillLevel.value = profile.skillLevel || '';
  ntrpRating.value = profile.ntrpRating?.toString() || '';
}

// Helper function to open drawer for editing a specific member
export async function openEditMemberDrawer(memberNameToEdit: string) {
  // Load current member details from group
  const details = memberDetails.value?.[memberNameToEdit];

  memberName.value = memberNameToEdit;
  memberNotes.value = (details?.notes as string) || '';
  shareContactInDirectory.value = details?.shareContactInDirectory === true;
  shareNotesInDirectory.value = details?.shareNotesInDirectory === true;
  confirmingRemove.value = false;

  // Load from platform user if editing self (shared across groups)
  const isEditingSelf = memberNameToEdit === sessionUser.value;
  if (isEditingSelf) {
    // Refresh platform user data to get latest (e.g., after switching groups)
    await refreshPlatformUser();
    loadPlatformUserData(details);
  } else {
    // Not editing self - use group-specific details
    memberPhone.value = (details?.phone as string) || '';
    memberEmail.value = (details?.email as string) || '';
    skillLevel.value = '';
    ntrpRating.value = '';
  }

  editingMemberName.value = memberNameToEdit;
  showEditMemberDrawer.value = true;
}
