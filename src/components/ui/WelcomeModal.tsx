import { signal, computed } from '@preact/signals';
import { Modal } from './Modal';
import { currentGroupName, currentGroupId, sessionUser, coreMembers, showToast } from '../App';
import { selectedName, isFormExpanded } from '../pages/MainApp';
import { getDatabase } from '../../config/firebase';

export const showWelcomeModal = signal(false);
const searchQuery = signal('');

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
  }

  // Also set the dropdown selection and expand the form
  selectedName.value = name;
  isFormExpanded.value = true;

  // Close modal
  showWelcomeModal.value = false;

  // Scroll to top to ensure header is visible (especially on mobile browsers)
  window.scrollTo(0, 0);

  showToast(`Welcome, ${name}!`, 'success');
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
          {filteredMembers.length === 0 && <p class="no-results">No members found</p>}
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
      `}</style>
    </Modal>
  );
}
