import { signal } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import { notifications, markAsRead, markAllAsRead, clearNotification } from '../modals/NotificationsModal';
import { formatDate } from '../../utils/helpers';
import { currentGroupId, sessionUser, coreMembers, showToast, selectedDate } from '../App';
import { activeTab } from '../navigation/BottomTabBar';
import { getDatabase } from '../../config/firebase';

// Local signals for settings UI
const showSettings = signal(false);
const showWatchedPicker = signal(false);
const activityAlertsEnabled = signal(false);
const matchConfirmationsEnabled = signal(false);
const unwatchedMembers = signal<string[]>([]); // Store unwatched for efficiency (default = watch all)

function normalizeName(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '');
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
    <div style="padding: 16px 0;">
      {/* Watched Members Picker Modal */}
      {showWatchedPicker.value && (
        <div style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1002;">
          <div style="background: white; padding: 20px; border-radius: 12px; max-width: 350px; width: 90%;">
            <h3 style="margin-top: 0; margin-bottom: 8px; color: #333;">Watched Members</h3>
            <p style="margin: 0 0 12px 0; font-size: 13px; color: #666;">
              Get activity alerts from these members
            </p>

            {/* Select/Deselect All buttons */}
            <div style="display: flex; gap: 8px; margin-bottom: 12px;">
              <button
                onClick={selectAllMembers}
                style="flex: 1; padding: 8px; background: #E8F5E9; color: #2E7D32; border: 1px solid #A5D6A7; border-radius: 6px; font-size: 13px; cursor: pointer; font-weight: 500;"
              >
                Select All
              </button>
              <button
                onClick={deselectAllMembers}
                style="flex: 1; padding: 8px; background: #f5f5f5; color: #666; border: 1px solid #e0e0e0; border-radius: 6px; font-size: 13px; cursor: pointer; font-weight: 500;"
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
                        gap: '10px',
                        width: '100%',
                        textAlign: 'left',
                        padding: '12px',
                        marginBottom: '4px',
                        border: watched ? '1px solid #A5D6A7' : '1px solid #e0e0e0',
                        borderRadius: '8px',
                        background: watched ? '#E8F5E9' : 'white',
                        color: '#333',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'normal',
                      }}
                    >
                      <span style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '4px',
                        border: watched ? 'none' : '2px solid #ccc',
                        background: watched ? '#4CAF50' : 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '14px',
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
              style="width: 100%; margin-top: 12px; background: #4CAF50; color: white;"
            >
              Done
            </button>
          </div>
        </div>
      )}

      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h2 style="margin: 0; font-size: 20px;">
          Notifications
          {unreadCount > 0 && (
            <span style="margin-left: 8px; font-size: 14px; color: #666; font-weight: 400;">
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
              color: '#4CAF50',
              fontSize: '14px',
              cursor: 'pointer',
              padding: '4px 8px',
            }}
          >
            Mark all read
          </button>
        )}
      </div>

      {/* Settings Section */}
      <div style="margin-bottom: 16px; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
        <button
          onClick={() => { showSettings.value = !showSettings.value; }}
          style="width: 100%; padding: 14px 16px; background: #f9f9f9; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: 15px; font-weight: 500;"
        >
          <span style="display: flex; align-items: center; gap: 8px; color: #333;">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="#666">
              <path d="M19.14,12.94c0.04-0.31,0.06-0.63,0.06-0.94c0-0.31-0.02-0.63-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.37,4.82,11.69,4.82,12s0.02,0.63,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
            </svg>
            Alert Settings
          </span>
          <span style={{ color: '#999', transform: showSettings.value ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
            ▼
          </span>
        </button>

        {showSettings.value && (
          <div style="padding: 16px; background: #fff; border-top: 1px solid #e0e0e0;">
            {/* Activity Alerts Toggle */}
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
              <div>
                <div style="font-weight: 500; font-size: 14px; color: #333;">Activity alerts</div>
                <div style="font-size: 12px; color: #666;">Check-ins, cancellations, notes</div>
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
                    backgroundColor: activityAlertsEnabled.value ? '#4CAF50' : '#ccc',
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

            {/* Game Confirmations Toggle */}
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <div>
                <div style="font-weight: 500; font-size: 14px; color: #333;">Game confirmations</div>
                <div style="font-size: 12px; color: #666;">When placed in or removed from a confirmed game</div>
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
                    backgroundColor: matchConfirmationsEnabled.value ? '#4CAF50' : '#ccc',
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

            {/* Watched Members */}
            <div style="padding-top: 12px; border-top: 1px solid #e0e0e0;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <div>
                  <div style="font-weight: 500; font-size: 14px; color: #333;">Watched members</div>
                  <div style="font-size: 12px; color: #666;">
                    {(() => {
                      const otherMembers = coreMembers.value.filter(m => m !== sessionUser.value);
                      const watchedCount = otherMembers.length - unwatchedMembers.value.length;
                      return `Watching ${watchedCount} of ${otherMembers.length} members`;
                    })()}
                  </div>
                </div>
                <button
                  onClick={() => { showWatchedPicker.value = true; }}
                  style="background: #E8F5E9; color: #2E7D32; border: 1px solid #A5D6A7; padding: 6px 12px; border-radius: 6px; font-size: 13px; cursor: pointer; font-weight: 500;"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <div style="text-align: center; padding: 48px 24px; background: #f9f9f9; border-radius: 12px;">
          <div style="font-size: 48px; margin-bottom: 16px;">🔔</div>
          <p style="font-size: 18px; margin: 0 0 8px 0; color: #333;">No notifications</p>
          <p style="font-size: 14px; color: #666; margin: 0;">
            You'll see updates about matches and check-ins here
          </p>
        </div>
      ) : (
        <div style="display: flex; flex-direction: column; gap: 8px;">
          {items.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              style={{
                padding: '14px 16px',
                background: notification.read ? '#f9f9f9' : '#E8F5E9',
                borderRadius: '10px',
                cursor: notification.date ? 'pointer' : 'default',
                border: notification.read ? '1px solid #e0e0e0' : '1px solid #A5D6A7',
                position: 'relative',
              }}
            >
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div style="flex: 1;">
                  <div style="font-size: 15px; color: #333; margin-bottom: 6px;">
                    {!notification.read && (
                      <span style="display: inline-block; width: 8px; height: 8px; background: #4CAF50; border-radius: 50%; margin-right: 8px;" />
                    )}
                    {notification.message}
                  </div>
                  <div style="font-size: 12px; color: #888; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                    <span>{formatTimestamp(notification.timestamp)}</span>
                    {notification.date && (
                      <span style="color: #4CAF50; font-weight: 500; display: flex; align-items: center; gap: 2px;">
                        {formatDate(notification.date)} →
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearNotification(notification.id);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#999',
                    fontSize: '18px',
                    cursor: 'pointer',
                    padding: '0 4px',
                    marginLeft: '8px',
                  }}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
