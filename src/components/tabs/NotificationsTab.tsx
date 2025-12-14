import { signal } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import { notifications, markAsRead, markAllAsRead, clearNotification } from '../modals/NotificationsModal';
import { formatDate } from '../../utils/helpers';
import { currentGroupId, sessionUser, coreMembers, showToast, selectedDate, currentGroupName } from '../App';
import { activeTab } from '../navigation/BottomTabBar';
import { getDatabase } from '../../config/firebase';

// Local signals for settings UI
const showSettings = signal(false);
const showWatchedPicker = signal(false);
const activityAlertsEnabled = signal(false);
const matchConfirmationsEnabled = signal(false);
const unwatchedMembers = signal<string[]>([]); // Store unwatched for efficiency (default = watch all)

// State for invite dropdown on dissolved notifications
const activeInviteDropdown = signal<string | null>(null);

function normalizeName(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '');
}

// Close dropdown when clicking outside
if (typeof document !== 'undefined') {
  document.addEventListener('click', (e) => {
    if (activeInviteDropdown.value) {
      const target = e.target as HTMLElement;
      if (!target.closest('.invite-dropdown') && !target.closest('[data-invite-button]')) {
        activeInviteDropdown.value = null;
      }
    }
  });
}

function generateInviteMessage(date: string, matchType: string): string {
  const dateObj = new Date(date + 'T00:00:00');
  const dateStr = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  const groupId = currentGroupId.value;
  const appUrl = `${window.location.origin}${window.location.pathname}#${groupId}`;
  const groupNameStr = currentGroupName.value || 'Tennis';

  if (matchType === 'Doubles') {
    let message = `🎾 Need players for doubles!\n`;
    message += `📅 ${dateStr}\n`;
    message += `🏟️ ${groupNameStr}\n\n`;
    message += `A match just opened up. Can you make it?\n\n`;
    message += `Check in: ${appUrl}`;
    return message;
  } else {
    let message = `🎾 Need 1 more player for singles!\n`;
    message += `📅 ${dateStr}\n`;
    message += `🏟️ ${groupNameStr}\n\n`;
    message += `A singles spot opened up. Can you make it?\n\n`;
    message += `Check in: ${appUrl}`;
    return message;
  }
}

function shareInvite(date: string, matchType: string, method: 'whatsapp' | 'sms' | 'copy') {
  const message = generateInviteMessage(date, matchType);

  if (method === 'whatsapp') {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  } else if (method === 'sms') {
    const encoded = encodeURIComponent(message);
    window.open(`sms:?body=${encoded}`, '_blank');
  } else if (method === 'copy') {
    navigator.clipboard.writeText(message).then(() => {
      showToast('Message copied!', 'success');
    }).catch(() => {
      showToast('Failed to copy', 'error');
    });
  }

  activeInviteDropdown.value = null;
}

async function loadNotificationPrefs() {
  const groupId = currentGroupId.value;
  const user = sessionUser.value;
  if (!groupId || !user) return;

  try {
    const db = getDatabase();
    const prefsRef = db.ref(`groups/${groupId}/userNotifications/${normalizeName(user)}/preferences`);
    const snapshot = await prefsRef.once('value');
    const prefs = snapshot.val() as { activityAlerts?: boolean; matchConfirmations?: boolean; mutedMembers?: string[]; unwatchedMembers?: string[] } || {};

    // Activity alerts default OFF, Match confirmations default ON
    activityAlertsEnabled.value = prefs.activityAlerts === true;
    matchConfirmationsEnabled.value = prefs.matchConfirmations !== false; // Default true
    // Support both old mutedMembers and new unwatchedMembers (they're equivalent)
    unwatchedMembers.value = prefs.unwatchedMembers || prefs.mutedMembers || [];
  } catch (error) {
    console.error('Error loading notification prefs from Firebase:', error);
  }
}

async function saveNotificationPrefs() {
  const groupId = currentGroupId.value;
  const user = sessionUser.value;
  if (!groupId || !user) return;

  const prefs = {
    activityAlerts: activityAlertsEnabled.value,
    matchConfirmations: matchConfirmationsEnabled.value,
    unwatchedMembers: unwatchedMembers.value,
  };

  try {
    const db = getDatabase();
    const prefsRef = db.ref(`groups/${groupId}/userNotifications/${normalizeName(user)}/preferences`);
    await prefsRef.set(prefs);
    showToast('Preferences saved', 'success');
  } catch (error) {
    console.error('Error saving notification prefs:', error);
    showToast('Failed to save preferences', 'error');
  }
}

function toggleWatchMember(name: string) {
  // If unwatched, remove from unwatched (= watch them)
  // If watched (not in unwatched), add to unwatched (= unwatch them)
  if (unwatchedMembers.value.includes(name)) {
    unwatchedMembers.value = unwatchedMembers.value.filter(m => m !== name);
  } else {
    unwatchedMembers.value = [...unwatchedMembers.value, name];
  }
  saveNotificationPrefs();
}

function selectAllMembers() {
  unwatchedMembers.value = [];
  saveNotificationPrefs();
}

function deselectAllMembers() {
  // Add all members except self to unwatched
  unwatchedMembers.value = coreMembers.value.filter(m => m !== sessionUser.value);
  saveNotificationPrefs();
}

function isWatching(name: string): boolean {
  return !unwatchedMembers.value.includes(name);
}

function handleNotificationClick(notif: { id: string; message: string; timestamp: number; read: boolean; date?: string }) {
  // Mark as read if not already
  if (!notif.read) {
    markAsRead(notif.id);
  }

  // Navigate to the date if available
  if (notif.date) {
    selectedDate.value = notif.date;
    activeTab.value = 'checkin'; // Switch to check-in tab
  }
}

function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - timestamp;

  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;

  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

export function NotificationsTab() {
  const items = notifications.value;
  const unreadCount = items.filter(n => !n.read).length;

  // Load preferences when tab is displayed
  useEffect(() => {
    loadNotificationPrefs();
  }, []);

  return (
    <div style="padding: var(--spacing-2xl, 16px) 0;">
      {/* Followed Members Picker Modal */}
      {showWatchedPicker.value && (
        <div style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1002;">
          <div style="background: var(--color-bg-card, white); padding: var(--spacing-3xl, 20px); border-radius: var(--radius-xl, 12px); max-width: 350px; width: 90%;">
            <h3 style="margin-top: 0; margin-bottom: var(--spacing-md, 8px); color: var(--color-text-primary, #333);">Followed Members</h3>
            <p style="margin: 0 0 var(--spacing-xl, 12px) 0; font-size: var(--font-size-sm, 13px); color: var(--color-text-secondary, #666);">
              Get activity alerts for these members
            </p>

            {/* Select/Deselect All buttons */}
            <div style="display: flex; gap: var(--spacing-md, 8px); margin-bottom: var(--spacing-xl, 12px);">
              <button
                onClick={selectAllMembers}
                style="flex: 1; padding: var(--spacing-md, 8px); background: var(--color-primary-light, #E8F5E9); color: var(--color-primary, #2C6E49); border: 1px solid var(--color-primary-lighter, #A5D6A7); border-radius: var(--radius-md, 6px); font-size: var(--font-size-sm, 13px); cursor: pointer; font-weight: 500;"
              >
                Select All
              </button>
              <button
                onClick={deselectAllMembers}
                style="flex: 1; padding: var(--spacing-md, 8px); background: var(--color-bg-muted, #f5f5f5); color: var(--color-text-secondary, #666); border: 1px solid var(--color-border, #e0e0e0); border-radius: var(--radius-md, 6px); font-size: var(--font-size-sm, 13px); cursor: pointer; font-weight: 500;"
              >
                Deselect All
              </button>
            </div>

            <div style="max-height: 300px; overflow-y: auto;">
              {coreMembers.value
                .filter(name => name !== sessionUser.value)
                .map(name => {
                  const watched = isWatching(name);
                  return (
                    <button
                      key={name}
                      onClick={() => toggleWatchMember(name)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-lg, 10px)',
                        width: '100%',
                        textAlign: 'left',
                        padding: 'var(--spacing-xl, 12px)',
                        marginBottom: 'var(--spacing-xs, 4px)',
                        border: watched ? '1px solid var(--color-primary-lighter, #A5D6A7)' : '1px solid var(--color-border, #e0e0e0)',
                        borderRadius: 'var(--radius-lg, 8px)',
                        background: watched ? 'var(--color-primary-light, #E8F5E9)' : 'var(--color-bg-card, white)',
                        color: 'var(--color-text-primary, #333)',
                        cursor: 'pointer',
                        fontSize: 'var(--font-size-base, 14px)',
                        fontWeight: 'normal',
                      }}
                    >
                      <span style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: 'var(--radius-sm, 4px)',
                        border: watched ? 'none' : '2px solid #ccc',
                        background: watched ? 'var(--color-primary, #2C6E49)' : 'var(--color-bg-card, white)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-text-inverse, white)',
                        fontSize: 'var(--font-size-base, 14px)',
                        flexShrink: 0,
                      }}>
                        {watched && '✓'}
                      </span>
                      {name}
                    </button>
                  );
                })
              }
            </div>
            <button
              onClick={() => { showWatchedPicker.value = false; }}
              style="width: 100%; margin-top: var(--spacing-xl, 12px); background: var(--color-primary, #2C6E49); color: var(--color-text-inverse, white);"
            >
              Done
            </button>
          </div>
        </div>
      )}

      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-2xl, 16px);">
        <h2 style="margin: 0; font-size: var(--font-size-2xl, 20px);">
          Notifications
          {unreadCount > 0 && (
            <span style="margin-left: var(--spacing-md, 8px); font-size: var(--font-size-base, 14px); color: var(--color-text-secondary, #666); font-weight: 400;">
              ({unreadCount} unread)
            </span>
          )}
        </h2>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-primary, #2C6E49)',
              fontSize: 'var(--font-size-base, 14px)',
              cursor: 'pointer',
              padding: 'var(--spacing-xs, 4px) var(--spacing-md, 8px)',
            }}
          >
            Mark all read
          </button>
        )}
      </div>

      {/* Settings Section */}
      <div style="margin-bottom: var(--spacing-2xl, 16px); border: 1px solid var(--color-border, #e0e0e0); border-radius: var(--radius-xl, 12px); overflow: hidden;">
        <button
          onClick={() => { showSettings.value = !showSettings.value; }}
          style="width: 100%; padding: 14px var(--spacing-2xl, 16px); background: var(--color-bg-subtle, #f9f9f9); border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: var(--font-size-md, 15px); font-weight: 500;"
        >
          <span style="display: flex; align-items: center; gap: var(--spacing-md, 8px); color: var(--color-text-primary, #333);">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="var(--color-text-secondary, #666)">
              <path d="M19.14,12.94c0.04-0.31,0.06-0.63,0.06-0.94c0-0.31-0.02-0.63-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.37,4.82,11.69,4.82,12s0.02,0.63,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
            </svg>
            Alert Settings
          </span>
          <span style={{ color: 'var(--color-text-muted, #999)', transform: showSettings.value ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
            ▼
          </span>
        </button>

        {showSettings.value && (
          <div style="padding: var(--spacing-2xl, 16px); background: var(--color-bg-card, #fff); border-top: 1px solid var(--color-border, #e0e0e0);">
            {/* Game Confirmations Toggle */}
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
              <div>
                <div style="font-weight: 500; font-size: var(--font-size-base, 14px); color: var(--color-text-primary, #333);">Game confirmations</div>
                <div style="font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666);">When placed in or removed from a confirmed game</div>
              </div>
              <label style="position: relative; display: inline-block; width: 48px; height: 26px;">
                <input
                  type="checkbox"
                  checked={matchConfirmationsEnabled.value}
                  onChange={(e) => {
                    matchConfirmationsEnabled.value = (e.target as HTMLInputElement).checked;
                    saveNotificationPrefs();
                  }}
                  style="opacity: 0; width: 0; height: 0;"
                />
                <span
                  style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: matchConfirmationsEnabled.value ? 'var(--color-primary, #2C6E49)' : '#ccc',
                    transition: '0.3s',
                    borderRadius: '26px',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      height: '20px',
                      width: '20px',
                      left: matchConfirmationsEnabled.value ? '25px' : '3px',
                      bottom: '3px',
                      backgroundColor: 'white',
                      transition: '0.3s',
                      borderRadius: '50%',
                    }}
                  />
                </span>
              </label>
            </div>

            {/* Activity Alerts Toggle */}
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-2xl, 16px);">
              <div>
                <div style="font-weight: 500; font-size: var(--font-size-base, 14px); color: var(--color-text-primary, #333);">Activity alerts</div>
                <div style="font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666);">Check-ins, removals, notes</div>
              </div>
              <label style="position: relative; display: inline-block; width: 48px; height: 26px;">
                <input
                  type="checkbox"
                  checked={activityAlertsEnabled.value}
                  onChange={(e) => {
                    activityAlertsEnabled.value = (e.target as HTMLInputElement).checked;
                    saveNotificationPrefs();
                  }}
                  style="opacity: 0; width: 0; height: 0;"
                />
                <span
                  style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: activityAlertsEnabled.value ? 'var(--color-primary, #2C6E49)' : '#ccc',
                    transition: '0.3s',
                    borderRadius: '26px',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      height: '20px',
                      width: '20px',
                      left: activityAlertsEnabled.value ? '25px' : '3px',
                      bottom: '3px',
                      backgroundColor: 'white',
                      transition: '0.3s',
                      borderRadius: '50%',
                    }}
                  />
                </span>
              </label>
            </div>

            {/* Followed Members */}
            <div style="padding-top: var(--spacing-xl, 12px); border-top: 1px solid var(--color-border, #e0e0e0);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-lg, 10px);">
                <div>
                  <div style="font-weight: 500; font-size: var(--font-size-base, 14px); color: var(--color-text-primary, #333);">Followed members</div>
                  <div style="font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666);">
                    {(() => {
                      const otherMembers = coreMembers.value.filter(m => m !== sessionUser.value);
                      const followedCount = otherMembers.length - unwatchedMembers.value.length;
                      return `Following ${followedCount} of ${otherMembers.length} members`;
                    })()}
                  </div>
                </div>
                <button
                  onClick={() => { showWatchedPicker.value = true; }}
                  style="background: var(--color-primary-light, #E8F5E9); color: var(--color-primary, #2C6E49); border: 1px solid var(--color-primary-lighter, #A5D6A7); padding: var(--spacing-sm, 6px) var(--spacing-xl, 12px); border-radius: var(--radius-md, 6px); font-size: var(--font-size-sm, 13px); cursor: pointer; font-weight: 500;"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <div style="text-align: center; padding: 48px var(--spacing-4xl, 24px); background: var(--color-bg-subtle, #f9f9f9); border-radius: var(--radius-xl, 12px);">
          <div style="font-size: 48px; margin-bottom: var(--spacing-2xl, 16px);">🔔</div>
          <p style="font-size: var(--font-size-xl, 18px); margin: 0 0 var(--spacing-md, 8px) 0; color: var(--color-text-primary, #333);">No notifications</p>
          <p style="font-size: var(--font-size-base, 14px); color: var(--color-text-secondary, #666); margin: 0;">
            You'll see updates about matches and check-ins here
          </p>
        </div>
      ) : (
        <div style="display: flex; flex-direction: column; gap: var(--spacing-md, 8px);">
          {items.map((notification) => {
            const isDropdownOpen = activeInviteDropdown.value === notification.id;
            const isDissolvedMatch = notification.type === 'match_dissolved';

            return (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                style={{
                  padding: '14px var(--spacing-2xl, 16px)',
                  background: notification.read ? 'var(--color-bg-subtle, #f9f9f9)' : 'var(--color-primary-light, #E8F5E9)',
                  borderRadius: 'var(--radius-lg, 10px)',
                  cursor: notification.date ? 'pointer' : 'default',
                  border: notification.read ? '1px solid var(--color-border, #e0e0e0)' : '1px solid var(--color-primary-lighter, #A5D6A7)',
                  position: 'relative',
                }}
              >
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <div style="flex: 1;">
                    <div style="font-size: var(--font-size-md, 15px); color: var(--color-text-primary, #333); margin-bottom: var(--spacing-sm, 6px);">
                      {!notification.read && (
                        <span style="display: inline-block; width: 8px; height: 8px; background: var(--color-primary, #2C6E49); border-radius: var(--radius-full, 50%); margin-right: var(--spacing-md, 8px);" />
                      )}
                      {notification.message}
                    </div>
                    <div style="font-size: var(--font-size-sm, 12px); color: var(--color-text-muted, #888); display: flex; align-items: center; gap: var(--spacing-md, 8px); flex-wrap: wrap;">
                      <span>{formatTimestamp(notification.timestamp)}</span>
                      {notification.date && (
                        <span style="color: var(--color-primary, #2C6E49); font-weight: 500; display: flex; align-items: center; gap: 2px;">
                          {formatDate(notification.date)} →
                        </span>
                      )}
                    </div>

                    {/* Invite button for dissolved matches */}
                    {isDissolvedMatch && notification.date && notification.matchType && (
                      <div style="margin-top: var(--spacing-xl, 12px); position: relative;">
                        <button
                          data-invite-button
                          onClick={(e) => {
                            e.stopPropagation();
                            activeInviteDropdown.value = isDropdownOpen ? null : notification.id;
                          }}
                          style={{
                            background: isDropdownOpen ? '#e65100' : '#ff9800',
                            border: 'none',
                            borderRadius: '16px',
                            padding: '6px 14px',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            color: 'white',
                            transition: 'all 0.2s',
                            boxShadow: '0 2px 6px rgba(255, 152, 0, 0.4)',
                          }}
                        >
                          <span>Invite</span>
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                            <path d="M7 10l5 5 5-5z"/>
                          </svg>
                        </button>

                        {isDropdownOpen && (
                          <div
                            class="invite-dropdown"
                            style={{
                              position: 'absolute',
                              bottom: '100%',
                              left: '0',
                              marginBottom: '4px',
                              background: 'white',
                              borderRadius: '8px',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                              zIndex: 100,
                              overflow: 'hidden',
                              minWidth: '140px',
                            }}
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                shareInvite(notification.date!, notification.matchType as string, 'whatsapp');
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 14px',
                                width: '100%',
                                border: 'none',
                                background: 'white',
                                cursor: 'pointer',
                                fontSize: '14px',
                                color: '#25D366',
                              }}
                            >
                              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                              </svg>
                              WhatsApp
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                shareInvite(notification.date!, notification.matchType as string, 'sms');
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 14px',
                                width: '100%',
                                border: 'none',
                                background: 'white',
                                cursor: 'pointer',
                                fontSize: '14px',
                                color: '#2196F3',
                                borderTop: '1px solid #f0f0f0',
                              }}
                            >
                              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                              </svg>
                              SMS
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                shareInvite(notification.date!, notification.matchType as string, 'copy');
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 14px',
                                width: '100%',
                                border: 'none',
                                background: 'white',
                                cursor: 'pointer',
                                fontSize: '14px',
                                color: '#666',
                                borderTop: '1px solid #f0f0f0',
                              }}
                            >
                              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                              </svg>
                              Copy
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      clearNotification(notification.id);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-text-muted, #999)',
                      fontSize: 'var(--font-size-xl, 18px)',
                      cursor: 'pointer',
                      padding: '0 var(--spacing-xs, 4px)',
                      marginLeft: 'var(--spacing-md, 8px)',
                    }}
                  >
                    ×
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
