import { useState, useEffect } from 'preact/hooks';
import { sessionUser, currentGroupId, showToast, memberDetails } from '../App';
import { showWelcomeModal } from '../ui/WelcomeModal';
import { showSettingsModal } from '../layout/Header';
import { InsightsTab } from './InsightsTab';
import { HelpTab } from './HelpTab';
import { openEditMemberDrawer } from '../features/EditMemberDrawer';
import { SubPage } from '../ui/SubPage';
import { GroupSettingsContent } from '../features/GroupSettingsContent';
import { ActivityHistoryContent } from '../features/ActivityHistoryContent';
import { MyGroupsContent } from '../features/MyGroupsContent';
import { linkedGroupsCount, currentPlatformUser } from '../../hooks/usePlatformUser';
import { sport } from '../../config/sport';

// Check if user is logged in as group admin
function isGroupAdmin(): boolean {
  const groupId = currentGroupId.value;
  if (!groupId) {
    return false;
  }
  return sessionStorage.getItem(`adminAuth_${groupId}`) === 'true';
}

// Track which sub-page is open
type SubPageType = 'settings' | 'activity' | 'insights' | 'help' | 'mygroups' | null;

export function ProfileTab() {
  const [adminStatus, setAdminStatus] = useState(isGroupAdmin());
  const [activeSubPage, setActiveSubPage] = useState<SubPageType>(null);

  // Re-check admin status periodically (for when user logs in as admin)
  useEffect(() => {
    const interval = setInterval(() => {
      setAdminStatus(isGroupAdmin());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Get current contact info for display (prefer platform user, fall back to group details)
  const currentDetails =
    sessionUser.value && memberDetails.value ? memberDetails.value[sessionUser.value] : null;
  const platformProfile = currentPlatformUser.value?.profile;
  const displayPhone = platformProfile?.phone || currentDetails?.phone;
  const displayEmail = platformProfile?.email || currentDetails?.email;

  const handleChangeUser = () => {
    if (confirm('Change user? This will clear your current session.')) {
      const groupId = currentGroupId.value;
      if (groupId) {
        localStorage.removeItem(`sessionUser_${groupId}`);
      }
      sessionUser.value = '';
      showToast('Please select your name', 'info');
      showWelcomeModal.value = true;
    }
  };

  const handleLogoutAdmin = () => {
    const groupId = currentGroupId.value;
    if (groupId) {
      sessionStorage.removeItem(`adminAuth_${groupId}`);
      setAdminStatus(false);
      showToast('Logged out of admin mode', 'info');
    }
  };

  return (
    <div style="padding: var(--spacing-2xl, 16px) 0;">
      <h2 style="margin: 0 0 var(--spacing-2xl, 16px) 0; font-size: var(--font-size-3xl, 20px);">
        Profile
      </h2>

      {/* Profile Information Section */}
      <button
        onClick={() => sessionUser.value && openEditMemberDrawer(sessionUser.value)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-xl, 12px)',
          padding: 'var(--spacing-2xl, 16px)',
          background: 'var(--color-bg-card, #fff)',
          border: '1px solid var(--color-border, #e0e0e0)',
          borderRadius: 'var(--radius-xl, 12px)',
          cursor: 'pointer',
          width: '100%',
          textAlign: 'left',
          marginBottom: 'var(--spacing-2xl, 16px)',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-full, 50%)',
            background: 'var(--color-primary-light, #E8F5E9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="var(--color-primary, #2C6E49)">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
        <div style="flex: 1;">
          <div style="font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);">
            {sessionUser.value || 'Not set'}
          </div>
          <div style="font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);">
            {displayPhone || displayEmail
              ? [displayPhone, displayEmail].filter(Boolean).join(' • ')
              : 'Tap to add contact info'}
          </div>
        </div>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="var(--color-text-disabled, #ccc)">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
        </svg>
      </button>

      {/* Action Buttons */}
      <div style="display: flex; flex-direction: column; gap: var(--spacing-md, 8px);">
        {/* My Groups - available to all users */}
        <button
          onClick={() => setActiveSubPage('mygroups')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-xl, 12px)',
            padding: 'var(--spacing-2xl, 16px)',
            background: 'var(--color-bg-card, #fff)',
            border: '1px solid var(--color-border, #e0e0e0)',
            borderRadius: 'var(--radius-xl, 12px)',
            cursor: 'pointer',
            width: '100%',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-full, 50%)',
              background: 'var(--color-primary-light, #E8F5E9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="var(--color-primary, #2C6E49)">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
          </div>
          <div style="flex: 1;">
            <div style="font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);">
              My Groups
              {linkedGroupsCount.value > 0 && (
                <span
                  style={{
                    marginLeft: '8px',
                    padding: '2px 8px',
                    background: 'var(--color-primary, #2C6E49)',
                    color: '#fff',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  {linkedGroupsCount.value}
                </span>
              )}
            </div>
            <div style="font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);">
              View all your groups on this device
            </div>
          </div>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="var(--color-text-disabled, #ccc)">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
          </svg>
        </button>

        {/* Admin Settings (for admins only) */}
        {adminStatus && (
          <>
            <button
              onClick={() => setActiveSubPage('settings')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-xl, 12px)',
                padding: 'var(--spacing-2xl, 16px)',
                background: 'var(--color-bg-card, #fff)',
                border: '1px solid var(--color-border, #e0e0e0)',
                borderRadius: 'var(--radius-xl, 12px)',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-full, 50%)',
                  background: 'var(--color-bg-muted, #f5f5f5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="var(--color-text-secondary, #666)"
                >
                  <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
                </svg>
              </div>
              <div style="flex: 1;">
                <div style="font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);">
                  Group Settings
                </div>
                <div style="font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);">
                  Name, PIN, location, and other settings
                </div>
              </div>
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="var(--color-text-disabled, #ccc)"
              >
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            </button>

            <button
              onClick={() => setActiveSubPage('activity')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-xl, 12px)',
                padding: 'var(--spacing-2xl, 16px)',
                background: 'var(--color-bg-card, #fff)',
                border: '1px solid var(--color-border, #e0e0e0)',
                borderRadius: 'var(--radius-xl, 12px)',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-full, 50%)',
                  background: 'var(--color-bg-muted, #f5f5f5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="var(--color-text-secondary, #666)"
                >
                  <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
                </svg>
              </div>
              <div style="flex: 1;">
                <div style="font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);">
                  Activity History
                </div>
                <div style="font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);">
                  View recent check-ins and changes
                </div>
              </div>
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="var(--color-text-disabled, #ccc)"
              >
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            </button>

            <button
              onClick={() => setActiveSubPage('insights')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-xl, 12px)',
                padding: 'var(--spacing-2xl, 16px)',
                background: 'var(--color-bg-card, #fff)',
                border: '1px solid var(--color-border, #e0e0e0)',
                borderRadius: 'var(--radius-xl, 12px)',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-full, 50%)',
                  background: 'var(--color-primary-light, #E8F5E9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="var(--color-primary, #2C6E49)"
                >
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                </svg>
              </div>
              <div style="flex: 1;">
                <div style="font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);">
                  Group Insights
                </div>
                <div style="font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);">
                  Game stats, player activity, and trends
                </div>
              </div>
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="var(--color-text-disabled, #ccc)"
              >
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            </button>

            <button
              onClick={handleLogoutAdmin}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-xl, 12px)',
                padding: 'var(--spacing-2xl, 16px)',
                background: 'var(--color-bg-card, #fff)',
                border: '1px solid var(--color-border, #e0e0e0)',
                borderRadius: 'var(--radius-xl, 12px)',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-full, 50%)',
                  background: 'var(--color-warning-light, #FFF3E0)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="var(--color-warning, #FF9800)"
                >
                  <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                </svg>
              </div>
              <div style="flex: 1;">
                <div style="font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-warning, #FF9800);">
                  Exit Admin Mode
                </div>
                <div style="font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);">
                  Return to regular user view
                </div>
              </div>
            </button>
          </>
        )}

        {/* Admin Login - shown when not logged in as admin */}
        {!adminStatus && (
          <button
            onClick={() => {
              showSettingsModal.value = true;
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-xl, 12px)',
              padding: 'var(--spacing-2xl, 16px)',
              background: 'var(--color-bg-card, #fff)',
              border: '1px solid var(--color-border, #e0e0e0)',
              borderRadius: 'var(--radius-xl, 12px)',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-full, 50%)',
                background: 'var(--color-warning-light, #FFF3E0)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="var(--color-warning, #FF9800)">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
              </svg>
            </div>
            <div style="flex: 1;">
              <div style="font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);">
                Admin Login
              </div>
              <div style="font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);">
                Access group settings and member management
              </div>
            </div>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="var(--color-text-disabled, #ccc)">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
            </svg>
          </button>
        )}

        {/* Help & Support - available to all users */}
        <button
          onClick={() => setActiveSubPage('help')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-xl, 12px)',
            padding: 'var(--spacing-2xl, 16px)',
            background: 'var(--color-bg-card, #fff)',
            border: '1px solid var(--color-border, #e0e0e0)',
            borderRadius: 'var(--radius-xl, 12px)',
            cursor: 'pointer',
            width: '100%',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-full, 50%)',
              background: 'var(--color-primary-light, #E8F5E9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="var(--color-primary, #2C6E49)">
              <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
            </svg>
          </div>
          <div style="flex: 1;">
            <div style="font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);">
              Help & Support
            </div>
            <div style="font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);">
              How to use the app and get support
            </div>
          </div>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="var(--color-text-disabled, #ccc)">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
          </svg>
        </button>

        {/* Change User - available to all */}
        <button
          onClick={handleChangeUser}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-xl, 12px)',
            padding: 'var(--spacing-2xl, 16px)',
            background: 'var(--color-bg-card, #fff)',
            border: '1px solid var(--color-border, #e0e0e0)',
            borderRadius: 'var(--radius-xl, 12px)',
            cursor: 'pointer',
            width: '100%',
            textAlign: 'left',
            marginTop: adminStatus ? 'var(--spacing-md, 8px)' : '0',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-full, 50%)',
              background: 'var(--color-bg-muted, #f5f5f5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="var(--color-text-secondary, #666)"
            >
              <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
            </svg>
          </div>
          <div style="flex: 1;">
            <div style="font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);">
              Change User
            </div>
            <div style="font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);">
              Switch to a different account
            </div>
          </div>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="var(--color-text-disabled, #ccc)">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
          </svg>
        </button>
      </div>

      {/* Version Info */}
      <p style="font-size: var(--font-size-sm, 12px); color: var(--color-text-disabled, #aaa); text-align: center; margin-top: var(--spacing-4xl, 32px);">
        {sport.appName}{' '}
        <a
          href="/release-notes.html"
          target="_blank"
          style="color: var(--color-primary, #2C6E49); text-decoration: none;"
        >
          v1.0.0
        </a>
      </p>

      {/* Sub-Pages */}
      <SubPage
        title="Group Settings"
        isOpen={activeSubPage === 'settings'}
        onBack={() => setActiveSubPage(null)}
      >
        <GroupSettingsContent />
      </SubPage>

      <SubPage
        title="Activity History"
        isOpen={activeSubPage === 'activity'}
        onBack={() => setActiveSubPage(null)}
      >
        <ActivityHistoryContent />
      </SubPage>

      <SubPage
        title="Group Insights"
        isOpen={activeSubPage === 'insights'}
        onBack={() => setActiveSubPage(null)}
      >
        <InsightsTab />
      </SubPage>

      <SubPage
        title="Help & Support"
        isOpen={activeSubPage === 'help'}
        onBack={() => setActiveSubPage(null)}
      >
        <HelpTab />
      </SubPage>

      <SubPage
        title="My Groups"
        isOpen={activeSubPage === 'mygroups'}
        onBack={() => setActiveSubPage(null)}
      >
        <MyGroupsContent />
      </SubPage>
    </div>
  );
}
