import { useState, useEffect } from 'preact/hooks';
import { sessionUser, currentGroupId, showToast, memberDetails, coreMembers } from '../App';
import { showWelcomeModal } from '../ui/WelcomeModal';
import { showSettingsModal } from '../layout/Header';
import { showActivityModal } from '../layout/Header';
import { updateMemberDetails, renameMember } from '../../hooks/useFirebase';
import { InsightsTab } from './InsightsTab';
import { showMemberModal } from '../modals/MemberManagementModal';

// Check if user is logged in as group admin
function isGroupAdmin(): boolean {
  const groupId = currentGroupId.value;
  if (!groupId) return false;
  return sessionStorage.getItem(`adminAuth_${groupId}`) === 'true';
}

export function ProfileTab() {
  const [adminStatus, setAdminStatus] = useState(isGroupAdmin());
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);
  const [showInsights, setShowInsights] = useState(false);

  // Re-check admin status periodically (for when user logs in as admin)
  useEffect(() => {
    const interval = setInterval(() => {
      setAdminStatus(isGroupAdmin());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Load current profile info when component mounts or user changes
  useEffect(() => {
    const userName = sessionUser.value;
    if (userName) {
      setName(userName);
      if (memberDetails.value) {
        const details = memberDetails.value[userName];
        if (details) {
          setPhone(details.phone || '');
          setEmail(details.email || '');
        }
      }
    }
  }, [sessionUser.value, memberDetails.value]);

  const handleSaveProfile = async () => {
    const currentName = sessionUser.value;
    if (!currentName) return;

    setSaving(true);

    // Check if name changed
    const trimmedName = name.trim();
    const nameChanged = trimmedName !== currentName;

    if (nameChanged) {
      // Rename member (this also updates check-ins)
      const renameSuccess = await renameMember(currentName, trimmedName);
      if (renameSuccess) {
        // Update session user to new name
        sessionUser.value = trimmedName;
        const groupId = currentGroupId.value;
        if (groupId) {
          localStorage.setItem(`sessionUser_${groupId}`, trimmedName);
        }
        // Update contact info with new name
        await updateMemberDetails(trimmedName, { phone, email });
      }
      setSaving(false);
      if (renameSuccess) {
        setIsEditing(false);
      }
    } else {
      // Just update contact info
      const success = await updateMemberDetails(currentName, { phone, email });
      setSaving(false);
      if (success) {
        setIsEditing(false);
      }
    }
  };

  const handleCancelEdit = () => {
    // Reset to saved values
    const userName = sessionUser.value;
    if (userName) {
      setName(userName);
      if (memberDetails.value) {
        const details = memberDetails.value[userName];
        if (details) {
          setPhone(details.phone || '');
          setEmail(details.email || '');
        }
      }
    }
    setIsEditing(false);
  };

  // Get current contact info for display
  const currentDetails = sessionUser.value && memberDetails.value
    ? memberDetails.value[sessionUser.value]
    : null;

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
    <div style="padding: 16px 0;">
      <h2 style="margin: 0 0 16px 0; font-size: 20px;">Profile</h2>

      {/* Profile Information Section */}
      <div
        style={{
          background: '#fff',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px',
          border: '1px solid #e0e0e0',
        }}
      >
        {!isEditing && (
          <div style="display: flex; justify-content: flex-end; margin-bottom: 8px;">
            <button
              onClick={() => setIsEditing(true)}
              style={{
                background: 'none',
                border: 'none',
                color: '#4CAF50',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
              Edit
            </button>
          </div>
        )}

        {isEditing ? (
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div>
              <label style="display: block; font-size: 13px; color: #666; margin-bottom: 4px;">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onInput={(e) => setName((e.target as HTMLInputElement).value)}
                placeholder="Your name"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style="display: block; font-size: 13px; color: #666; margin-bottom: 4px;">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onInput={(e) => setPhone((e.target as HTMLInputElement).value)}
                placeholder="e.g., (555) 123-4567"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style="display: block; font-size: 13px; color: #666; margin-bottom: 4px;">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
                placeholder="e.g., name@example.com"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div style="display: flex; gap: 8px; margin-top: 4px;">
              <button
                onClick={handleCancelEdit}
                disabled={saving}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: '#f5f5f5',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                disabled={saving}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: '#4CAF50',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  opacity: saving ? 0.7 : 1,
                }}
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        ) : (
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#888">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              <span style={{ color: '#333', fontSize: '14px' }}>
                {sessionUser.value || 'Not set'}
              </span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#888">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <span style={{ color: currentDetails?.phone ? '#333' : '#aaa', fontSize: '14px' }}>
                {currentDetails?.phone || 'No phone number'}
              </span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#888">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <span style={{ color: currentDetails?.email ? '#333' : '#aaa', fontSize: '14px' }}>
                {currentDetails?.email || 'No email address'}
              </span>
            </div>
            {!currentDetails?.phone && !currentDetails?.email && (
              <p style="font-size: 13px; color: #888; margin: 8px 0 0 0;">
                Add your contact info so organizers can reach you about matches.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style="display: flex; flex-direction: column; gap: 8px;">
        {/* Admin Settings (for admins only) */}
        {adminStatus && (
          <>
            <button
              onClick={() => { showMemberModal.value = true; }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                background: '#fff',
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
              }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="#4CAF50">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
              </div>
              <div style="flex: 1;">
                <div style="font-size: 16px; font-weight: 500; color: #333;">Manage Members</div>
                <div style="font-size: 13px; color: #888;">{coreMembers.value.length} members in group</div>
              </div>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="#ccc">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </button>

            <button
              onClick={() => { showSettingsModal.value = true; }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                background: '#fff',
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
              }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="#666">
                  <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                </svg>
              </div>
              <div style="flex: 1;">
                <div style="font-size: 16px; font-weight: 500; color: #333;">Group Settings</div>
                <div style="font-size: 13px; color: #888;">Name, PIN, location, and other settings</div>
              </div>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="#ccc">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </button>

            <button
              onClick={() => { showActivityModal.value = true; }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                background: '#fff',
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
              }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="#666">
                  <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
                </svg>
              </div>
              <div style="flex: 1;">
                <div style="font-size: 16px; font-weight: 500; color: #333;">Activity History</div>
                <div style="font-size: 13px; color: #888;">View recent check-ins and changes</div>
              </div>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="#ccc">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </button>

            <button
              onClick={() => setShowInsights(!showInsights)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                background: showInsights ? '#E3F2FD' : '#fff',
                border: showInsights ? '1px solid #90CAF9' : '1px solid #e0e0e0',
                borderRadius: '12px',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
              }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="#4CAF50">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                </svg>
              </div>
              <div style="flex: 1;">
                <div style="font-size: 16px; font-weight: 500; color: #333;">Group Insights</div>
                <div style="font-size: 13px; color: #888;">Game stats, player activity, and trends</div>
              </div>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="#ccc" style={{ transform: showInsights ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </button>

            {/* Insights Panel */}
            {showInsights && (
              <div style={{
                background: '#fff',
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                overflow: 'hidden',
              }}>
                <InsightsTab />
              </div>
            )}

            <button
              onClick={handleLogoutAdmin}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                background: '#fff',
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
              }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#FFF3E0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="#FF9800">
                  <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                </svg>
              </div>
              <div style="flex: 1;">
                <div style="font-size: 16px; font-weight: 500; color: #FF9800;">Exit Admin Mode</div>
                <div style="font-size: 13px; color: #888;">Return to regular user view</div>
              </div>
            </button>
          </>
        )}

        {/* Admin Login - shown when not logged in as admin */}
        {!adminStatus && (
          <button
            onClick={() => { showSettingsModal.value = true; }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px',
              background: '#fff',
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
            }}
          >
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#FFF3E0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="#FF9800">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
              </svg>
            </div>
            <div style="flex: 1;">
              <div style="font-size: 16px; font-weight: 500; color: #333;">Admin Login</div>
              <div style="font-size: 13px; color: #888;">Access group settings and member management</div>
            </div>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#ccc">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </button>
        )}

        {/* Change User - available to all */}
        <button
          onClick={handleChangeUser}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px',
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
            cursor: 'pointer',
            width: '100%',
            textAlign: 'left',
            marginTop: adminStatus ? '8px' : '0',
          }}
        >
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="#666">
              <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
            </svg>
          </div>
          <div style="flex: 1;">
            <div style="font-size: 16px; font-weight: 500; color: #333;">Change User</div>
            <div style="font-size: 13px; color: #888;">Switch to a different account</div>
          </div>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="#ccc">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </svg>
        </button>
      </div>

      {/* Version Info */}
      <p style="font-size: 12px; color: #aaa; text-align: center; margin-top: 32px;">
        Tennis Coordinator v0.8.12
      </p>
    </div>
  );
}
