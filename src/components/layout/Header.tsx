import { signal } from '@preact/signals';
import { useState, useEffect } from 'preact/hooks';
import { currentGroupName, sessionUser, currentGroupId } from '../App';
import { goToProfile } from '../navigation/BottomTabBar';

// UI state - exported for use in modals and ProfileTab
export const showActivityModal = signal(false);
export const showSettingsModal = signal(false);

// Check if user is logged in as group admin
function isGroupAdmin(): boolean {
  const groupId = currentGroupId.value;
  if (!groupId) return false;
  return sessionStorage.getItem(`adminAuth_${groupId}`) === 'true';
}

export function Header() {
  const [adminStatus, setAdminStatus] = useState(isGroupAdmin());

  // Re-check admin status periodically (for when user logs in as admin)
  useEffect(() => {
    const interval = setInterval(() => {
      setAdminStatus(isGroupAdmin());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <h1 style="display: flex; justify-content: space-between; align-items: center;">
      <span>
        <span id="groupNameDisplay">🎾 {currentGroupName.value || 'Tennis Coordinator'}</span>
        {currentGroupName.value && (
          <>
            <br />
            <small style="font-size: 12px; font-weight: 400; opacity: 0.8;">
              Tennis Coordinator
            </small>
          </>
        )}
      </span>

      {/* User identity badge - clickable to go to Profile */}
      {sessionUser.value && (
        <button
          onClick={goToProfile}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: adminStatus ? '#FFF3E0' : '#f5f5f5',
            border: adminStatus ? '2px solid #FF9800' : '1px solid #e0e0e0',
            borderRadius: '20px',
            padding: '6px 12px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#333',
            cursor: 'pointer',
          }}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style="opacity: 0.7;">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <span>{sessionUser.value}</span>
          {adminStatus && (
            <span
              style={{
                background: '#FF9800',
                color: 'white',
                fontSize: '10px',
                padding: '2px 6px',
                borderRadius: '10px',
                fontWeight: '600',
              }}
            >
              ADMIN
            </span>
          )}
        </button>
      )}
    </h1>
  );
}
