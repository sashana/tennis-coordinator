import { useState, useEffect } from 'preact/hooks';
import { sessionUser, currentGroupId, showToast, memberDetails } from '../App';
import { showWelcomeModal } from '../ui/WelcomeModal';
import { showSettingsModal } from '../layout/Header';
import { showActivityModal } from '../layout/Header';
import { updateMemberDetails, renameMember, groupSettings, applyTheme } from '../../hooks/useFirebase';
import { getDatabase } from '../../config/firebase';
import { InsightsTab } from './InsightsTab';
import { HelpTab } from './HelpTab';

// Available themes - 5 Grand Slam themes
const THEMES = [
  { id: 'default', name: 'Classic Green', description: 'Default theme' },
  { id: 'wimbledon', name: 'Wimbledon', description: 'Grass court elegance' },
  { id: 'roland-garros', name: 'Roland-Garros', description: 'Clay court warmth' },
  { id: 'australian-open', name: 'Australian Open', description: 'Melbourne blue' },
  { id: 'us-open', name: 'US Open', description: 'Flushing Meadows blue' },
];

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
  const [showHelp, setShowHelp] = useState(false);
  const [shareContactInDirectory, setShareContactInDirectory] = useState(false);
  const [shareNotesInDirectory, setShareNotesInDirectory] = useState(false);

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
          setShareContactInDirectory(details.shareContactInDirectory || false);
          setShareNotesInDirectory(details.shareNotesInDirectory || false);
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
        await updateMemberDetails(trimmedName, { phone, email, shareContactInDirectory, shareNotesInDirectory });
      }
      setSaving(false);
      if (renameSuccess) {
        setIsEditing(false);
      }
    } else {
      // Just update contact info
      const success = await updateMemberDetails(currentName, { phone, email, shareContactInDirectory, shareNotesInDirectory });
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
          setShareContactInDirectory(details.shareContactInDirectory || false);
          setShareNotesInDirectory(details.shareNotesInDirectory || false);
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
    <div style="padding: var(--spacing-2xl, 16px) 0;">
      <h2 style="margin: 0 0 var(--spacing-2xl, 16px) 0; font-size: var(--font-size-3xl, 20px);">Profile</h2>

      {/* Profile Information Section */}
      <div
        style={{
          background: 'var(--color-bg-card, #fff)',
          borderRadius: 'var(--radius-xl, 12px)',
          padding: 'var(--spacing-2xl, 16px)',
          marginBottom: 'var(--spacing-2xl, 16px)',
          border: '1px solid var(--color-border, #e0e0e0)',
        }}
      >
        {!isEditing && (
          <div style="display: flex; justify-content: flex-end; margin-bottom: var(--spacing-md, 8px);">
            <button
              onClick={() => setIsEditing(true)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-primary, #2C6E49)',
                cursor: 'pointer',
                fontSize: 'var(--font-size-base, 14px)',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-xs, 4px)',
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
          <div style="display: flex; flex-direction: column; gap: var(--spacing-xl, 12px);">
            <div>
              <label style="display: block; font-size: var(--font-size-sm, 13px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-xs, 4px);">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onInput={(e) => setName((e.target as HTMLInputElement).value)}
                placeholder="Your name"
                style={{
                  width: '100%',
                  padding: 'var(--spacing-lg, 10px) var(--spacing-xl, 12px)',
                  border: '1px solid var(--color-border-light, #ddd)',
                  borderRadius: 'var(--radius-lg, 8px)',
                  fontSize: 'var(--font-size-base, 14px)',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style="display: block; font-size: var(--font-size-sm, 13px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-xs, 4px);">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onInput={(e) => setPhone((e.target as HTMLInputElement).value)}
                placeholder="e.g., (555) 123-4567"
                style={{
                  width: '100%',
                  padding: 'var(--spacing-lg, 10px) var(--spacing-xl, 12px)',
                  border: '1px solid var(--color-border-light, #ddd)',
                  borderRadius: 'var(--radius-lg, 8px)',
                  fontSize: 'var(--font-size-base, 14px)',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style="display: block; font-size: var(--font-size-sm, 13px); color: var(--color-text-secondary, #666); margin-bottom: var(--spacing-xs, 4px);">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
                placeholder="e.g., name@example.com"
                style={{
                  width: '100%',
                  padding: 'var(--spacing-lg, 10px) var(--spacing-xl, 12px)',
                  border: '1px solid var(--color-border-light, #ddd)',
                  borderRadius: 'var(--radius-lg, 8px)',
                  fontSize: 'var(--font-size-base, 14px)',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div style={{
              padding: 'var(--spacing-xl, 12px)',
              background: 'var(--color-bg-subtle, #f9f9f9)',
              borderRadius: 'var(--radius-lg, 8px)',
              border: '1px solid var(--color-border, #e0e0e0)',
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'start',
                gap: 'var(--spacing-md, 8px)',
                cursor: 'pointer',
                fontSize: 'var(--font-size-base, 14px)',
              }}>
                <input
                  type="checkbox"
                  checked={shareContactInDirectory}
                  onChange={(e) => setShareContactInDirectory((e.target as HTMLInputElement).checked)}
                  style={{
                    marginTop: '2px',
                    cursor: 'pointer',
                  }}
                />
                <span style={{ color: 'var(--color-text-primary, #333)' }}>
                  Share my contact info in team directory
                  <div style={{ fontSize: 'var(--font-size-xs, 12px)', color: 'var(--color-text-secondary, #666)', marginTop: 'var(--spacing-xs, 4px)' }}>
                    When enabled, your phone and email will be visible to all team members in the directory
                  </div>
                </span>
              </label>
            </div>
            <div style={{
              padding: 'var(--spacing-xl, 12px)',
              background: 'var(--color-bg-subtle, #f9f9f9)',
              borderRadius: 'var(--radius-lg, 8px)',
              border: '1px solid var(--color-border, #e0e0e0)',
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'start',
                gap: 'var(--spacing-md, 8px)',
                cursor: 'pointer',
                fontSize: 'var(--font-size-base, 14px)',
              }}>
                <input
                  type="checkbox"
                  checked={shareNotesInDirectory}
                  onChange={(e) => setShareNotesInDirectory((e.target as HTMLInputElement).checked)}
                  style={{
                    marginTop: '2px',
                    cursor: 'pointer',
                  }}
                />
                <span style={{ color: 'var(--color-text-primary, #333)' }}>
                  Share my profile notes in team directory
                  <div style={{ fontSize: 'var(--font-size-xs, 12px)', color: 'var(--color-text-secondary, #666)', marginTop: 'var(--spacing-xs, 4px)' }}>
                    When enabled, your profile notes will be visible to all team members in the directory
                  </div>
                </span>
              </label>
            </div>
            <div style="display: flex; gap: var(--spacing-md, 8px); margin-top: var(--spacing-xs, 4px);">
              <button
                onClick={handleCancelEdit}
                disabled={saving}
                style={{
                  flex: 1,
                  padding: 'var(--spacing-lg, 10px)',
                  background: 'var(--color-bg-muted, #f5f5f5)',
                  border: '1px solid var(--color-border-light, #ddd)',
                  borderRadius: 'var(--radius-lg, 8px)',
                  cursor: 'pointer',
                  fontSize: 'var(--font-size-base, 14px)',
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
                  padding: 'var(--spacing-lg, 10px)',
                  background: 'var(--color-primary, #2C6E49)',
                  border: 'none',
                  borderRadius: 'var(--radius-lg, 8px)',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: 'var(--font-size-base, 14px)',
                  fontWeight: '500',
                  opacity: saving ? 0.7 : 1,
                }}
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        ) : (
          <div style="display: flex; flex-direction: column; gap: var(--spacing-md, 8px);">
            <div style="display: flex; align-items: center; gap: var(--spacing-md, 8px);">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="var(--color-text-muted, #888)">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              <span style={{ color: 'var(--color-text-primary, #333)', fontSize: 'var(--font-size-base, 14px)' }}>
                {sessionUser.value || 'Not set'}
              </span>
            </div>
            <div style="display: flex; align-items: center; gap: var(--spacing-md, 8px);">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="var(--color-text-muted, #888)">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <span style={{ color: currentDetails?.phone ? 'var(--color-text-primary, #333)' : 'var(--color-text-disabled, #aaa)', fontSize: 'var(--font-size-base, 14px)' }}>
                {currentDetails?.phone || 'No phone number'}
              </span>
            </div>
            <div style="display: flex; align-items: center; gap: var(--spacing-md, 8px);">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="var(--color-text-muted, #888)">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <span style={{ color: currentDetails?.email ? 'var(--color-text-primary, #333)' : 'var(--color-text-disabled, #aaa)', fontSize: 'var(--font-size-base, 14px)' }}>
                {currentDetails?.email || 'No email address'}
              </span>
            </div>
            {!currentDetails?.phone && !currentDetails?.email && (
              <p style="font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888); margin: var(--spacing-md, 8px) 0 0 0;">
                Add your contact info so organizers can reach you about matches.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style="display: flex; flex-direction: column; gap: var(--spacing-md, 8px);">
        {/* Admin Settings (for admins only) */}
        {adminStatus && (
          <>
            {/* Theme Selector */}
            <div
              style={{
                background: 'var(--color-bg-card, #fff)',
                border: '1px solid var(--color-border, #e0e0e0)',
                borderRadius: 'var(--radius-xl, 12px)',
                padding: 'var(--spacing-2xl, 16px)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md, 8px)', marginBottom: 'var(--spacing-xl, 12px)' }}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="var(--color-primary, #2C6E49)">
                  <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                </svg>
                <span style={{ fontWeight: 500, color: 'var(--color-text-primary, #333)', fontSize: 'var(--font-size-lg, 16px)' }}>Theme</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-md, 8px)' }}>
                {THEMES.map((theme) => {
                  const currentTheme = groupSettings.value?.theme || 'default';
                  const isSelected = currentTheme === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={async () => {
                        applyTheme(theme.id === 'default' ? undefined : theme.id);
                        const groupId = currentGroupId.value;
                        if (groupId) {
                          try {
                            const db = getDatabase();
                            await db.ref(`groups/${groupId}/settings/theme`).set(theme.id === 'default' ? null : theme.id);
                            groupSettings.value = { ...groupSettings.value, theme: theme.id === 'default' ? undefined : theme.id };
                            showToast(`Theme: ${theme.name}`, 'success');
                          } catch (error) {
                            console.error('Error saving theme:', error);
                          }
                        }
                      }}
                      style={{
                        padding: 'var(--spacing-lg, 10px) var(--spacing-md, 8px)',
                        background: isSelected ? 'var(--color-primary-light, #e8f5e9)' : 'var(--color-bg-card, white)',
                        border: isSelected ? '2px solid var(--color-primary, #2C6E49)' : '1px solid var(--color-border, #e0e0e0)',
                        borderRadius: 'var(--radius-lg, 8px)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div style={{ fontWeight: 500, fontSize: 'var(--font-size-sm, 13px)', color: 'var(--color-text-primary, #333)' }}>
                        {theme.name}
                      </div>
                      <div style={{ fontSize: 'var(--font-size-2xs, 10px)', color: 'var(--color-text-secondary, #666)' }}>
                        {theme.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => { showSettingsModal.value = true; }}
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
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-full, 50%)', background: 'var(--color-bg-muted, #f5f5f5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="var(--color-text-secondary, #666)">
                  <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                </svg>
              </div>
              <div style="flex: 1;">
                <div style="font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);">Group Settings</div>
                <div style="font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);">Name, PIN, location, and other settings</div>
              </div>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="var(--color-text-disabled, #ccc)">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </button>

            <button
              onClick={() => { showActivityModal.value = true; }}
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
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-full, 50%)', background: 'var(--color-bg-muted, #f5f5f5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="var(--color-text-secondary, #666)">
                  <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
                </svg>
              </div>
              <div style="flex: 1;">
                <div style="font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);">Activity History</div>
                <div style="font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);">View recent check-ins and changes</div>
              </div>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="var(--color-text-disabled, #ccc)">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </button>

            <button
              onClick={() => setShowInsights(!showInsights)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-xl, 12px)',
                padding: 'var(--spacing-2xl, 16px)',
                background: showInsights ? 'var(--color-info-light, #E3F2FD)' : 'var(--color-bg-card, #fff)',
                border: showInsights ? '1px solid var(--color-info-border, #90CAF9)' : '1px solid var(--color-border, #e0e0e0)',
                borderRadius: 'var(--radius-xl, 12px)',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
              }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-full, 50%)', background: 'var(--color-primary-light, #E8F5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="var(--color-primary, #2C6E49)">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                </svg>
              </div>
              <div style="flex: 1;">
                <div style="font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);">Group Insights</div>
                <div style="font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);">Game stats, player activity, and trends</div>
              </div>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="var(--color-text-disabled, #ccc)" style={{ transform: showInsights ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </button>

            {/* Insights Panel */}
            {showInsights && (
              <div style={{
                background: 'var(--color-bg-card, #fff)',
                border: '1px solid var(--color-border, #e0e0e0)',
                borderRadius: 'var(--radius-xl, 12px)',
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
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-full, 50%)', background: 'var(--color-warning-light, #FFF3E0)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="var(--color-warning, #FF9800)">
                  <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                </svg>
              </div>
              <div style="flex: 1;">
                <div style="font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-warning, #FF9800);">Exit Admin Mode</div>
                <div style="font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);">Return to regular user view</div>
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
            <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-full, 50%)', background: 'var(--color-warning-light, #FFF3E0)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="var(--color-warning, #FF9800)">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
              </svg>
            </div>
            <div style="flex: 1;">
              <div style="font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);">Admin Login</div>
              <div style="font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);">Access group settings and member management</div>
            </div>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="var(--color-text-disabled, #ccc)">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </button>
        )}

        {/* Help & Support - available to all users */}
        <button
          onClick={() => setShowHelp(!showHelp)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-xl, 12px)',
            padding: 'var(--spacing-2xl, 16px)',
            background: showHelp ? 'var(--color-info-light, #E3F2FD)' : 'var(--color-bg-card, #fff)',
            border: showHelp ? '1px solid var(--color-info-border, #90CAF9)' : '1px solid var(--color-border, #e0e0e0)',
            borderRadius: 'var(--radius-xl, 12px)',
            cursor: 'pointer',
            width: '100%',
            textAlign: 'left',
          }}
        >
          <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-full, 50%)', background: 'var(--color-primary-light, #E8F5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="var(--color-primary, #2C6E49)">
              <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/>
            </svg>
          </div>
          <div style="flex: 1;">
            <div style="font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);">Help & Support</div>
            <div style="font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);">How to use the app and get support</div>
          </div>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="var(--color-text-disabled, #ccc)" style={{ transform: showHelp ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </svg>
        </button>

        {/* Help Panel */}
        {showHelp && (
          <div style={{
            background: 'var(--color-bg-card, #fff)',
            border: '1px solid var(--color-border, #e0e0e0)',
            borderRadius: 'var(--radius-xl, 12px)',
            overflow: 'hidden',
          }}>
            <HelpTab />
          </div>
        )}

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
          <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-full, 50%)', background: 'var(--color-bg-muted, #f5f5f5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="var(--color-text-secondary, #666)">
              <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
            </svg>
          </div>
          <div style="flex: 1;">
            <div style="font-size: var(--font-size-lg, 16px); font-weight: 500; color: var(--color-text-primary, #333);">Change User</div>
            <div style="font-size: var(--font-size-sm, 13px); color: var(--color-text-muted, #888);">Switch to a different account</div>
          </div>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="var(--color-text-disabled, #ccc)">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </svg>
        </button>
      </div>

      {/* Version Info */}
      <p style="font-size: var(--font-size-sm, 12px); color: var(--color-text-disabled, #aaa); text-align: center; margin-top: var(--spacing-4xl, 32px);">
        Tennis Coordinator v0.9.0
      </p>
    </div>
  );
}
