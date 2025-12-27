import { signal, computed } from '@preact/signals';
import { Modal } from './Modal';
import { currentGroupName, currentGroupId, sessionUser, coreMembers, showToast } from '../App';
import { selectedName, isFormExpanded } from '../pages/MainApp';
import { getDatabase } from '../../config/firebase';
import { linkUserToGroup } from '../../hooks/usePlatformUser';

export const showWelcomeModal = signal(false);
const searchQuery = signal('');
const showAddSelf = signal(false);
const newMemberName = signal('');
const isAddingSelf = signal(false);

async function logUserLogin(groupId: string, userName: string) {
  try {
    const db = getDatabase();
    const today = new Date().toISOString().split('T')[0];
    const activityRef = db.ref(`groups/${groupId}/activity/${today}`);
    await activityRef.push({
      timestamp: Date.now(),
      action: 'user_login',
      player: userName,
      by: userName,
    });
  } catch (error) {
    console.error('Error logging login activity:', error);
  }
}

function handleNameClick(name: string) {
  // Set as session user
  sessionUser.value = name;
  const groupId = currentGroupId.value;
  if (groupId) {
    localStorage.setItem(`sessionUser_${groupId}`, name);
    // Log the login to activity history
    logUserLogin(groupId, name);
    // Link user to group for cross-group identity (fire-and-forget)
    linkUserToGroup(groupId, name);
  }

  // Also set the dropdown selection and expand the form
  selectedName.value = name;
  isFormExpanded.value = true;

  // Close modal and reset add-self state
  showWelcomeModal.value = false;
  showAddSelf.value = false;
  newMemberName.value = '';

  // Scroll to top to ensure header is visible (especially on mobile browsers)
  window.scrollTo(0, 0);

  showToast(`Welcome, ${name}!`, 'success');
}

async function handleAddSelf() {
  const name = newMemberName.value.trim();
  if (!name) {
    showToast('Please enter your name', 'error');
    return;
  }

  const groupId = currentGroupId.value;
  if (!groupId) return;

  // Check if name already exists (case-insensitive)
  const existingMembers = coreMembers.value;
  if (existingMembers.some((m) => m.toLowerCase() === name.toLowerCase())) {
    showToast('This name is already in the group', 'error');
    return;
  }

  isAddingSelf.value = true;

  try {
    const db = getDatabase();
    const updatedMembers = [...existingMembers, name];
    await db.ref(`groups/${groupId}/settings/members`).set(updatedMembers);

    // Update local state
    coreMembers.value = updatedMembers;

    // Now proceed as if they clicked their name
    handleNameClick(name);
  } catch (error) {
    console.error('Error adding self to group:', error);
    showToast('Failed to add yourself. Please try again.', 'error');
  } finally {
    isAddingSelf.value = false;
  }
}

export function WelcomeModal() {
  const sortedMembers = [...coreMembers.value].sort((a, b) => a.localeCompare(b));
  const query = searchQuery.value.toLowerCase();
  const filteredMembers = query
    ? sortedMembers.filter((name) => name.toLowerCase().includes(query))
    : sortedMembers;

  const handleSearchInput = (e: Event) => {
    searchQuery.value = (e.target as HTMLInputElement).value;
  };

  return (
    <Modal isOpen={showWelcomeModal.value} title="" showCloseButton={false}>
      <div class="welcome-modal-content">
        <div class="welcome-header">
          <h2>Welcome Back</h2>
          <p class="group-name">{currentGroupName.value}</p>
        </div>

        <p class="instruction">Select your name to start</p>

        <div class="search-container">
          <input
            type="text"
            placeholder="Search member..."
            value={searchQuery.value}
            onInput={handleSearchInput}
            class="search-input"
          />
        </div>

        <div class="member-list">
          {filteredMembers.map((name) => (
            <button key={name} class="member-row" onClick={() => handleNameClick(name)}>
              <div class="member-avatar">{name.charAt(0).toUpperCase()}</div>
              <span class="member-name">{name}</span>
            </button>
          ))}
          {filteredMembers.length === 0 && !showAddSelf.value && (
            <p class="no-results">No members found</p>
          )}
        </div>

        {/* Add yourself section */}
        <div class="add-self-section">
          {!showAddSelf.value ? (
            <button
              class="add-self-link"
              onClick={() => {
                showAddSelf.value = true;
              }}
            >
              Not in the list? <strong>Add yourself</strong>
            </button>
          ) : (
            <div class="add-self-form">
              <p class="add-self-label">Enter your name to join:</p>
              <div class="add-self-input-row">
                <input
                  type="text"
                  class="add-self-input"
                  placeholder="Your name"
                  value={newMemberName.value}
                  onInput={(e) => {
                    newMemberName.value = (e.target as HTMLInputElement).value;
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSelf();
                    }
                  }}
                  disabled={isAddingSelf.value}
                  autoFocus
                />
                <button
                  class="add-self-btn"
                  onClick={handleAddSelf}
                  disabled={isAddingSelf.value || !newMemberName.value.trim()}
                >
                  {isAddingSelf.value ? '...' : 'Join'}
                </button>
              </div>
              <button
                class="add-self-cancel"
                onClick={() => {
                  showAddSelf.value = false;
                  newMemberName.value = '';
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .welcome-modal-content {
          padding: 0;
        }

        .welcome-header {
          text-align: center;
          padding: 16px 20px 12px;
          background: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
          margin: -20px -20px 0;
          border-radius: 12px 12px 0 0;
        }

        .welcome-header h2 {
          margin: 0 0 4px;
          font-size: 22px;
          font-weight: 700;
          color: var(--color-primary-dark, #1a402b);
        }

        .welcome-header .group-name {
          margin: 0;
          font-size: 13px;
          font-weight: 500;
          color: var(--color-primary, #2C6E49);
        }

        .instruction {
          text-align: center;
          color: #6b7280;
          margin: 16px 0 12px;
          font-size: 13px;
        }

        .search-container {
          padding: 0 4px;
          margin-bottom: 8px;
        }

        .search-input {
          width: 100%;
          background: #f3f4f6;
          border: none;
          border-radius: 10px;
          padding: 12px 16px;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
        }

        .search-input:focus {
          background: #fff;
          box-shadow: 0 0 0 2px var(--color-primary, #2C6E49);
        }

        .search-input::placeholder {
          color: #9ca3af;
        }

        .member-list {
          max-height: 50vh;
          overflow-y: auto;
          padding: 4px;
        }

        .member-row {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: left;
        }

        .member-row:hover {
          background: var(--color-primary-lightest, #ecfdf5);
          color: var(--color-primary, #2C6E49);
        }

        .member-row:active {
          background: var(--color-primary-lighter, #d1fae5);
        }

        .member-avatar {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--color-primary, #2C6E49) 0%, var(--color-primary, #2C6E49) 100%);
          border-radius: 50%;
          color: white;
          font-size: 15px;
          font-weight: 600;
          flex-shrink: 0;
          border: 2px solid #e5e7eb;
        }

        .member-name {
          font-size: 14px;
          font-weight: 500;
          color: #333;
        }

        .member-row:hover .member-name {
          color: var(--color-primary, #2C6E49);
        }

        .no-results {
          text-align: center;
          color: #9ca3af;
          padding: 24px;
          font-size: 14px;
        }

        .add-self-section {
          border-top: 1px solid #e5e7eb;
          padding: 16px 4px 0;
          margin-top: 8px;
        }

        .add-self-link {
          width: 100%;
          padding: 12px;
          background: transparent;
          border: none;
          font-size: 14px;
          color: #6b7280;
          cursor: pointer;
          text-align: center;
        }

        .add-self-link:hover {
          color: var(--color-primary, #2C6E49);
        }

        .add-self-link strong {
          color: var(--color-primary, #2C6E49);
        }

        .add-self-form {
          padding: 0 4px;
        }

        .add-self-label {
          font-size: 13px;
          color: #6b7280;
          margin: 0 0 10px 0;
          text-align: center;
        }

        .add-self-input-row {
          display: flex;
          gap: 8px;
        }

        .add-self-input {
          flex: 1;
          padding: 12px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 15px;
          outline: none;
        }

        .add-self-input:focus {
          border-color: var(--color-primary, #2C6E49);
        }

        .add-self-btn {
          padding: 12px 20px;
          background: var(--color-primary, #2C6E49);
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          color: white;
          cursor: pointer;
        }

        .add-self-btn:hover:not(:disabled) {
          background: var(--color-primary-dark, #1a402b);
        }

        .add-self-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .add-self-cancel {
          width: 100%;
          padding: 10px;
          margin-top: 8px;
          background: transparent;
          border: none;
          font-size: 13px;
          color: #9ca3af;
          cursor: pointer;
        }

        .add-self-cancel:hover {
          color: #6b7280;
        }
      `}</style>
    </Modal>
  );
}
