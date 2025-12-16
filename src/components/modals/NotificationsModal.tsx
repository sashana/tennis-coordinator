import { signal } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import { Modal } from '../ui/Modal';
import { currentGroupId, sessionUser, coreMembers, showToast, selectedDate } from '../App';
import { getDatabase } from '../../config/firebase';
import { normalizeName } from '../../utils/helpers';

// Modal visibility - kept for legacy support but not used with tab navigation
const showNotificationsModal = signal(false);

interface Notification {
  id: string;
  message: string;
  timestamp: number;
  read: boolean;
  date?: string;
}

// Notification settings - default to false until loaded from Firebase
const activityAlertsEnabled = signal(false);
const matchConfirmationsEnabled = signal(false);
const mutedMembers = signal<string[]>([]);
const showSettings = signal(false);
const notifications = signal<Notification[]>([]);
const showMutePicker = signal(false);

// Firebase ref for cleanup
let notificationsUnsubscribe: (() => void) | null = null;

async function loadNotificationPrefs() {
  const groupId = currentGroupId.value;
  const user = sessionUser.value;
  if (!groupId || !user) {
    return;
  }

  try {
    const db = getDatabase();
    const prefsRef = db.ref(
      `groups/${groupId}/userNotifications/${normalizeName(user)}/preferences`
    );
    const snapshot = await prefsRef.once('value');
    const prefs =
      (snapshot.val() as {
        activityAlerts?: boolean;
        matchConfirmations?: boolean;
        mutedMembers?: string[];
      }) || {};

    // Activity alerts default OFF (must opt-in), Match confirmations default ON
    activityAlertsEnabled.value = prefs.activityAlerts === true;
    matchConfirmationsEnabled.value = prefs.matchConfirmations !== false; // Default ON
    mutedMembers.value = prefs.mutedMembers || [];
  } catch (error) {
    console.error('Error loading notification prefs from Firebase:', error);
  }
}

async function saveNotificationPrefs() {
  const groupId = currentGroupId.value;
  const user = sessionUser.value;
  if (!groupId || !user) {
    return;
  }

  const prefs = {
    activityAlerts: activityAlertsEnabled.value,
    matchConfirmations: matchConfirmationsEnabled.value,
    mutedMembers: mutedMembers.value,
  };

  try {
    const db = getDatabase();
    const prefsRef = db.ref(
      `groups/${groupId}/userNotifications/${normalizeName(user)}/preferences`
    );
    await prefsRef.set(prefs);
    showToast('Notification preferences saved', 'success');
  } catch (error) {
    console.error('Error saving notification prefs:', error);
    showToast('Failed to save preferences', 'error');
  }
}

function subscribeToNotifications() {
  const groupId = currentGroupId.value;
  const user = sessionUser.value;
  if (!groupId || !user) {
    return;
  }

  // Cleanup previous subscription
  if (notificationsUnsubscribe) {
    notificationsUnsubscribe();
  }

  try {
    const db = getDatabase();
    const notifsRef = db.ref(`groups/${groupId}/userNotifications/${normalizeName(user)}/items`);

    const callback = notifsRef.on('value', (snapshot) => {
      const data = snapshot.val() || {};
      const items = Object.entries(data).map(([id, notif]) => ({
        id,
        ...(notif as { message: string; timestamp: number; read: boolean; date?: string }),
      }));
      // Sort by timestamp descending (newest first)
      notifications.value = items.sort((a, b) => b.timestamp - a.timestamp);
    });

    notificationsUnsubscribe = () => {
      notifsRef.off('value', callback);
    };
  } catch (error) {
    console.error('Error subscribing to notifications:', error);
  }
}

async function markAsRead(notifId: string) {
  const groupId = currentGroupId.value;
  const user = sessionUser.value;
  if (!groupId || !user) {
    return;
  }

  try {
    const db = getDatabase();
    await db
      .ref(`groups/${groupId}/userNotifications/${normalizeName(user)}/items/${notifId}/read`)
      .set(true);
  } catch (error) {
    console.error('Error marking notification as read:', error);
  }
}

async function clearAllNotifications() {
  const groupId = currentGroupId.value;
  const user = sessionUser.value;
  if (!groupId || !user) {
    return;
  }

  try {
    const db = getDatabase();
    await db.ref(`groups/${groupId}/userNotifications/${normalizeName(user)}/items`).remove();
    showToast('Notifications cleared', 'info');
  } catch (error) {
    console.error('Error clearing notifications:', error);
    showToast('Failed to clear notifications', 'error');
  }
}

function toggleMuteMember(name: string) {
  if (mutedMembers.value.includes(name)) {
    mutedMembers.value = mutedMembers.value.filter((m) => m !== name);
  } else {
    mutedMembers.value = [...mutedMembers.value, name];
  }
  saveNotificationPrefs();
}

function removeMutedMember(name: string) {
  mutedMembers.value = mutedMembers.value.filter((m) => m !== name);
  saveNotificationPrefs();
}

function handleClose() {
  showNotificationsModal.value = false;
  showSettings.value = false;
  showMutePicker.value = false;
}

function handleNotificationClick(notif: Notification) {
  // Mark as read if not already
  if (!notif.read) {
    markAsRead(notif.id);
  }

  // Navigate to the date if available
  if (notif.date) {
    selectedDate.value = notif.date;
    handleClose();
  }
}

function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - timestamp;

  if (diff < 60000) {
    return 'Just now';
  }
  if (diff < 3600000) {
    return `${Math.floor(diff / 60000)}m ago`;
  }
  if (diff < 86400000) {
    return `${Math.floor(diff / 3600000)}h ago`;
  }

  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

export function NotificationsModal() {
  // Load prefs and subscribe to notifications when modal opens
  useEffect(() => {
    if (showNotificationsModal.value) {
      loadNotificationPrefs();
      subscribeToNotifications();
    }

    return () => {
      if (notificationsUnsubscribe) {
        notificationsUnsubscribe();
        notificationsUnsubscribe = null;
      }
    };
  }, [showNotificationsModal.value]);

  const unreadCount = notifications.value.filter((n) => !n.read).length;

  return (
    <>
      {/* Mute Member Picker */}
      {showMutePicker.value && (
        <div style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1002;">
          <div style="background: white; padding: 20px; border-radius: 12px; max-width: 350px; width: 90%;">
            <h3 style="margin-top: 0; margin-bottom: 16px; color: #333;">Select member to mute</h3>
            <div style="max-height: 300px; overflow-y: auto;">
              {coreMembers.value
                .filter((name) => name !== sessionUser.value && !mutedMembers.value.includes(name))
                .map((name) => (
                  <button
                    key={name}
                    onClick={() => {
                      toggleMuteMember(name);
                      showMutePicker.value = false;
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '12px',
                      marginBottom: '4px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      background: 'white',
                      color: '#333',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'normal',
                    }}
                  >
                    {name}
                  </button>
                ))}
            </div>
            <button
              onClick={() => {
                showMutePicker.value = false;
              }}
              style="width: 100%; margin-top: 12px; background: #ccc; color: #333;"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <Modal
        isOpen={showNotificationsModal.value}
        onClose={handleClose}
        title="Notifications"
        showCloseButton={false}
      >
        <div style="margin: -20px; margin-top: -16px;">
          {/* Header with Clear All */}
          <div style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; color: #666;">
              {unreadCount > 0 ? `${unreadCount} new` : 'No new notifications'}
            </span>
            <div style="display: flex; gap: 12px; align-items: center;">
              {notifications.value.length > 0 && (
                <button
                  onClick={clearAllNotifications}
                  style="background: none; border: none; color: var(--color-primary, #2C6E49); font-size: 14px; cursor: pointer; font-weight: 500;"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={handleClose}
                style="background: none; border: none; font-size: 24px; cursor: pointer; color: #999;"
              >
                &times;
              </button>
            </div>
          </div>

          {/* Collapsible Settings */}
          <div style="border-bottom: 1px solid #e0e0e0;">
            <button
              onClick={() => {
                showSettings.value = !showSettings.value;
              }}
              style="width: 100%; padding: 12px 20px; background: #f9f9f9; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: 14px;"
            >
              <span style="display: flex; align-items: center; gap: 8px; color: #666;">
                <span>Settings</span>
              </span>
              <span
                style={{
                  color: '#999',
                  transform: showSettings.value ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s',
                }}
              >
                ▼
              </span>
            </button>

            {showSettings.value && (
              <div style="padding: 16px 20px; background: #fafafa;">
                {/* Activity Alerts Toggle */}
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                  <div>
                    <div style="font-weight: 500; font-size: 14px;">Activity alerts</div>
                    <div style="font-size: 12px; color: #666;">
                      Check-ins, cancellations, and note changes
                    </div>
                  </div>
                  <label
                    class="toggle-switch"
                    style="position: relative; display: inline-block; width: 48px; height: 26px;"
                  >
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
                        backgroundColor: activityAlertsEnabled.value
                          ? 'var(--color-primary, #2C6E49)'
                          : '#ccc',
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
                    <div style="font-weight: 500; font-size: 14px;">Game confirmations</div>
                    <div style="font-size: 12px; color: #666;">
                      When placed in or removed from a confirmed game
                    </div>
                  </div>
                  <label
                    class="toggle-switch"
                    style="position: relative; display: inline-block; width: 48px; height: 26px;"
                  >
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
                        backgroundColor: matchConfirmationsEnabled.value
                          ? 'var(--color-primary, #2C6E49)'
                          : '#ccc',
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

                {/* Muted Members */}
                <div style="padding-top: 12px; border-top: 1px solid #e0e0e0;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <div>
                      <div style="font-weight: 500; font-size: 13px; color: #333;">
                        Muted members
                      </div>
                      <div style="font-size: 11px; color: #666;">No alerts from these members</div>
                    </div>
                    <button
                      onClick={() => {
                        showMutePicker.value = true;
                      }}
                      style="background: #e8e8e8; color: #333; border: none; padding: 5px 10px; border-radius: 6px; font-size: 12px; cursor: pointer; font-weight: 500;"
                    >
                      + Add
                    </button>
                  </div>
                  <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                    {mutedMembers.value.map((name) => (
                      <span
                        key={name}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          background: '#e0e0e0',
                          color: '#333',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '12px',
                        }}
                      >
                        {name}
                        <button
                          onClick={() => removeMutedMember(name)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '14px',
                            color: '#666',
                            padding: '0',
                            lineHeight: '1',
                          }}
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                    {mutedMembers.value.length === 0 && (
                      <span style="font-size: 12px; color: #999;">None</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notifications List */}
          <div style="max-height: 300px; overflow-y: auto;">
            {notifications.value.length === 0 ? (
              <div style="padding: 40px 20px; text-align: center; color: #999;">
                No notifications yet
              </div>
            ) : (
              notifications.value.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  style={{
                    padding: '12px 20px',
                    borderBottom: '1px solid #f0f0f0',
                    background: notif.read ? 'white' : '#f9fff9',
                    cursor: notif.date ? 'pointer' : notif.read ? 'default' : 'pointer',
                  }}
                >
                  <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div style="flex: 1;">
                      <div style="font-size: 14px;">{notif.message}</div>
                      <div style="font-size: 12px; color: #999; margin-top: 4px; display: flex; align-items: center; gap: 8px;">
                        <span>{formatTimestamp(notif.timestamp)}</span>
                        {notif.date && (
                          <span style="color: var(--color-primary, #2C6E49); font-weight: 500;">
                            View date →
                          </span>
                        )}
                      </div>
                    </div>
                    {!notif.read && (
                      <span style="width: 8px; height: 8px; background: var(--color-primary, #2C6E49); border-radius: 50%; margin-top: 6px; flex-shrink: 0;" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}

// Hook to subscribe to notifications on app load
export function useNotifications() {
  useEffect(() => {
    const groupId = currentGroupId.value;
    const user = sessionUser.value;

    if (groupId && user) {
      subscribeToNotifications();
    }

    return () => {
      if (notificationsUnsubscribe) {
        notificationsUnsubscribe();
        notificationsUnsubscribe = null;
      }
    };
  }, [currentGroupId.value, sessionUser.value]);
}

// Clear single notification
async function clearNotification(notifId: string) {
  const groupId = currentGroupId.value;
  const user = sessionUser.value;
  if (!groupId || !user) {
    return;
  }

  try {
    const db = getDatabase();
    await db
      .ref(`groups/${groupId}/userNotifications/${normalizeName(user)}/items/${notifId}`)
      .remove();
  } catch (error) {
    console.error('Error clearing notification:', error);
  }
}

// Mark all as read
async function markAllAsRead() {
  const groupId = currentGroupId.value;
  const user = sessionUser.value;
  if (!groupId || !user) {
    return;
  }

  try {
    const db = getDatabase();
    const updates: Record<string, boolean> = {};
    notifications.value.forEach((n) => {
      if (!n.read) {
        updates[`${n.id}/read`] = true;
      }
    });
    if (Object.keys(updates).length > 0) {
      await db
        .ref(`groups/${groupId}/userNotifications/${normalizeName(user)}/items`)
        .update(updates);
    }
  } catch (error) {
    console.error('Error marking all as read:', error);
  }
}

// Export for checking notification count in header and for NotificationsTab
export { notifications, markAsRead, clearNotification, markAllAsRead };
