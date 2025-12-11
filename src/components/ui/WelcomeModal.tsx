import { signal } from '@preact/signals';
import { Modal } from './Modal';
import { currentGroupName, currentGroupId, sessionUser, coreMembers, showToast } from '../App';
import { selectedName, isFormExpanded } from '../pages/MainApp';
import { getDatabase } from '../../config/firebase';

export const showWelcomeModal = signal(false);

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

function handleNameSelect(e: Event) {
  const name = (e.target as HTMLSelectElement).value;
  if (!name) return;

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

  showToast(`Welcome, ${name}!`, 'success');
}

export function WelcomeModal() {
  const sortedMembers = [...coreMembers.value].sort((a, b) => a.localeCompare(b));

  return (
    <Modal
      isOpen={showWelcomeModal.value}
      title=""
      showCloseButton={false}
    >
      <div style="text-align: center; padding: 10px 0;">
        <h2 style="margin-top: 0; font-size: 24px;">Welcome!</h2>
        <p style="color: #4CAF50; font-weight: 500; margin-bottom: 16px; font-size: 16px;">
          {currentGroupName.value}
        </p>
        <p style="color: #666; margin-bottom: 20px;">Select your name to start</p>
        <select
          onChange={handleNameSelect}
          style="width: 100%; padding: 12px; font-size: 16px; border: 2px solid #e0e0e0; border-radius: 8px;"
        >
          <option value="">Select your name...</option>
          {sortedMembers.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>
    </Modal>
  );
}
