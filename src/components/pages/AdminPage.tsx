import { signal } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import { getDatabase } from '../../config/firebase';
import { showToast } from '../App';

const isAuthenticated = signal(false);
const groups = signal<Record<string, any>>({});
const isLoading = signal(true);
const siteAdminPin = signal<string | null>(null);
const loginError = signal<string | null>(null);
const expandedGroup = signal<string | null>(null);
const newMemberName = signal('');
const addingMember = signal(false);
const editingMemberInfo = signal<{ groupId: string; originalName: string } | null>(null);
const editMemberNewName = signal('');

export function AdminPage() {
  useEffect(() => {
    initializePage();
  }, []);

  async function initializePage() {
    try {
      // Load site admin PIN from Firebase
      const db = getDatabase();
      const siteSettingsSnapshot = await db.ref('siteSettings').once('value');
      const siteSettings = siteSettingsSnapshot.val() || {};
      siteAdminPin.value = siteSettings.siteAdminPin || null;

      // Check if already authenticated
      const auth = sessionStorage.getItem('siteAdminAuth');
      if (auth === 'true') {
        isAuthenticated.value = true;
        await loadGroups();
      }
    } catch (error) {
      console.error('Error initializing admin page:', error);
      showToast('Failed to initialize', 'error');
    } finally {
      isLoading.value = false;
    }
  }

  async function loadGroups() {
    try {
      const db = getDatabase();
      const snapshot = await db.ref('groups').once('value');
      groups.value = snapshot.val() || {};
    } catch (error) {
      console.error('Error loading groups:', error);
      showToast('Failed to load groups', 'error');
    }
  }

  function handleLogin(e: Event) {
    e.preventDefault();
    loginError.value = null;
    const form = e.target as HTMLFormElement;
    const pinInput = form.querySelector('input') as HTMLInputElement;
    const pin = pinInput.value.trim();

    if (!pin) {
      loginError.value = 'Please enter a PIN';
      return;
    }

    if (!siteAdminPin.value) {
      loginError.value = 'Site admin PIN not configured. Please set siteAdminPin in siteSettings in Firebase.';
      return;
    }

    if (pin === siteAdminPin.value) {
      sessionStorage.setItem('siteAdminAuth', 'true');
      isAuthenticated.value = true;
      loginError.value = null;
      loadGroups();
    } else {
      loginError.value = 'Incorrect PIN. Please try again.';
      pinInput.value = '';
      pinInput.focus();
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('siteAdminAuth');
    isAuthenticated.value = false;
    groups.value = {};
  }

  function goToLanding() {
    window.location.hash = '';
    window.location.reload();
  }

  function toggleGroupExpand(groupId: string) {
    if (expandedGroup.value === groupId) {
      expandedGroup.value = null;
    } else {
      expandedGroup.value = groupId;
      newMemberName.value = '';
    }
  }

  async function addMemberToGroup(groupId: string) {
    const name = newMemberName.value.trim();
    if (!name) {
      showToast('Please enter a member name', 'error');
      return;
    }

    addingMember.value = true;
    try {
      const db = getDatabase();
      const group = groups.value[groupId];
      const currentMembers = group?.settings?.members || [];

      // Check for duplicate
      if (currentMembers.some((m: string) => m.toLowerCase() === name.toLowerCase())) {
        showToast('Member already exists', 'error');
        addingMember.value = false;
        return;
      }

      const updatedMembers = [...currentMembers, name];
      await db.ref(`groups/${groupId}/settings/members`).set(updatedMembers);

      // Update local state
      groups.value = {
        ...groups.value,
        [groupId]: {
          ...group,
          settings: {
            ...group?.settings,
            members: updatedMembers,
          },
        },
      };

      newMemberName.value = '';
      showToast(`Added ${name} to the group`, 'success');
    } catch (error) {
      console.error('Error adding member:', error);
      showToast('Failed to add member', 'error');
    } finally {
      addingMember.value = false;
    }
  }

  async function removeMemberFromGroup(groupId: string, memberName: string) {
    if (!confirm(`Remove ${memberName} from this group?`)) {
      return;
    }

    try {
      const db = getDatabase();
      const group = groups.value[groupId];
      const currentMembers = group?.settings?.members || [];
      const updatedMembers = currentMembers.filter((m: string) => m !== memberName);

      await db.ref(`groups/${groupId}/settings/members`).set(updatedMembers);

      // Update local state
      groups.value = {
        ...groups.value,
        [groupId]: {
          ...group,
          settings: {
            ...group?.settings,
            members: updatedMembers,
          },
        },
      };

      showToast(`Removed ${memberName}`, 'success');
    } catch (error) {
      console.error('Error removing member:', error);
      showToast('Failed to remove member', 'error');
    }
  }

  function startEditMember(groupId: string, memberName: string) {
    editingMemberInfo.value = { groupId, originalName: memberName };
    editMemberNewName.value = memberName;
  }

  async function saveEditMember() {
    const editInfo = editingMemberInfo.value;
    if (!editInfo) return;

    const newName = editMemberNewName.value.trim();
    if (!newName) {
      showToast('Name cannot be empty', 'error');
      return;
    }

    if (newName === editInfo.originalName) {
      editingMemberInfo.value = null;
      return;
    }

    const group = groups.value[editInfo.groupId];
    const currentMembers = group?.settings?.members || [];

    // Check for duplicate
    if (currentMembers.some((m: string) => m.toLowerCase() === newName.toLowerCase() && m !== editInfo.originalName)) {
      showToast('A member with this name already exists', 'error');
      return;
    }

    try {
      const db = getDatabase();
      const updatedMembers = currentMembers.map((m: string) => m === editInfo.originalName ? newName : m);
      await db.ref(`groups/${editInfo.groupId}/settings/members`).set(updatedMembers);

      // Also move member details if they exist
      const memberDetails = group?.settings?.memberDetails || {};
      if (memberDetails[editInfo.originalName]) {
        const details = memberDetails[editInfo.originalName];
        await db.ref(`groups/${editInfo.groupId}/settings/memberDetails/${editInfo.originalName}`).remove();
        await db.ref(`groups/${editInfo.groupId}/settings/memberDetails/${newName}`).set(details);

        // Update local member details
        const newMemberDetails = { ...memberDetails };
        newMemberDetails[newName] = details;
        delete newMemberDetails[editInfo.originalName];

        groups.value = {
          ...groups.value,
          [editInfo.groupId]: {
            ...group,
            settings: {
              ...group?.settings,
              members: updatedMembers,
              memberDetails: newMemberDetails,
            },
          },
        };
      } else {
        // Just update members array
        groups.value = {
          ...groups.value,
          [editInfo.groupId]: {
            ...group,
            settings: {
              ...group?.settings,
              members: updatedMembers,
            },
          },
        };
      }

      // Update all check-ins with the old name to the new name
      const checkinsSnapshot = await db.ref(`groups/${editInfo.groupId}/checkins`).once('value');
      const allCheckinsData = checkinsSnapshot.val() || {};

      // Process each date's check-ins (Firebase stores arrays as objects with numeric string keys)
      for (const [dateKey, dateCheckins] of Object.entries(allCheckinsData)) {
        if (dateCheckins && typeof dateCheckins === 'object') {
          // Convert to array, update names, then save back
          const checkinsArray = Object.values(dateCheckins) as Array<{ name?: string; [key: string]: unknown }>;
          let hasChanges = false;

          const updatedCheckins = checkinsArray.map((checkin) => {
            if (checkin && checkin.name === editInfo.originalName) {
              hasChanges = true;
              return { ...checkin, name: newName };
            }
            return checkin;
          });

          if (hasChanges) {
            await db.ref(`groups/${editInfo.groupId}/checkins/${dateKey}`).set(updatedCheckins);
          }
        }
      }

      editingMemberInfo.value = null;
      showToast(`Renamed ${editInfo.originalName} to ${newName}`, 'success');
    } catch (error) {
      console.error('Error renaming member:', error);
      showToast('Failed to rename member', 'error');
    }
  }

  if (isLoading.value) {
    return (
      <div class="site-admin-page">
        <div class="site-admin-container">
          <div class="site-admin-loading">
            <div class="loading-spinner-icon"></div>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated.value) {
    return (
      <div class="site-admin-page">
        <div class="site-admin-container">
          <div class="site-admin-login-card">
            <div class="site-admin-header">
              <span class="site-admin-icon">🔐</span>
              <h1>Site Administration</h1>
              <p class="site-admin-subtitle">Tennis Coordinator Platform</p>
            </div>

            <form onSubmit={handleLogin} class="site-admin-form">
              <div class="form-group">
                <label for="admin-pin">Administrator PIN</label>
                <input
                  id="admin-pin"
                  type="password"
                  placeholder="Enter your PIN"
                  class="site-admin-input"
                  autoFocus
                />
              </div>

              {loginError.value && (
                <div class="site-admin-error">
                  <span class="error-icon">⚠️</span>
                  {loginError.value}
                </div>
              )}

              <button type="submit" class="site-admin-submit">
                Sign In
              </button>
            </form>

            <div class="site-admin-footer">
              <button onClick={goToLanding} class="back-to-home">
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const groupEntries = Object.entries(groups.value);
  const totalMembers = groupEntries.reduce((sum, [, group]: [string, any]) => {
    return sum + (group.settings?.members?.length || 0);
  }, 0);

  return (
    <div class="site-admin-page">
      <div class="site-admin-dashboard">
        <header class="site-admin-dashboard-header">
          <div class="header-left">
            <h1>🎾 Site Administration</h1>
            <p class="header-subtitle">Tennis Coordinator Platform</p>
          </div>
          <button onClick={handleLogout} class="logout-button">
            Sign Out
          </button>
        </header>

        <div class="site-admin-stats">
          <div class="stat-card">
            <span class="stat-value">{groupEntries.length}</span>
            <span class="stat-label">Tennis Groups</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">{totalMembers}</span>
            <span class="stat-label">Total Members</span>
          </div>
        </div>

        <section class="site-admin-section">
          <h2>All Tennis Groups</h2>
          {groupEntries.length === 0 ? (
            <div class="empty-state">
              <p>No tennis groups have been created yet.</p>
            </div>
          ) : (
            <div class="groups-grid">
              {groupEntries.map(([groupId, group]: [string, any]) => {
                const members = group.settings?.members || [];
                const isExpanded = expandedGroup.value === groupId;

                return (
                  <div key={groupId} class={`group-card ${isExpanded ? 'expanded' : ''}`}>
                    <div class="group-card-header">
                      <h3>{group.settings?.groupName || groupId}</h3>
                      <span class="group-id">#{groupId}</span>
                    </div>
                    <div class="group-card-body">
                      <div class="group-stat">
                        <span class="group-stat-icon">👥</span>
                        <span>{members.length} members</span>
                      </div>
                      {group.settings?.location?.name && (
                        <div class="group-stat">
                          <span class="group-stat-icon">📍</span>
                          <span>{group.settings.location.name}</span>
                        </div>
                      )}
                    </div>

                    {/* Expandable member management */}
                    {isExpanded && (
                      <div class="group-members-section">
                        <div class="members-header">
                          <h4>Members</h4>
                        </div>

                        {/* Add member form */}
                        <div class="add-member-form">
                          <input
                            type="text"
                            placeholder="Enter member name"
                            value={newMemberName.value}
                            onInput={(e) => { newMemberName.value = (e.target as HTMLInputElement).value; }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                addMemberToGroup(groupId);
                              }
                            }}
                            class="member-input"
                            disabled={addingMember.value}
                          />
                          <button
                            onClick={() => addMemberToGroup(groupId)}
                            class="add-member-btn"
                            disabled={addingMember.value}
                          >
                            {addingMember.value ? '...' : 'Add'}
                          </button>
                        </div>

                        {/* Member list */}
                        <div class="members-list">
                          {members.length === 0 ? (
                            <p class="no-members">No members yet. Add the first member above.</p>
                          ) : (
                            members.map((member: string) => {
                              const isEditing = editingMemberInfo.value?.groupId === groupId && editingMemberInfo.value?.originalName === member;
                              return (
                                <div key={member} class="member-item">
                                  {isEditing ? (
                                    <>
                                      <input
                                        type="text"
                                        value={editMemberNewName.value}
                                        onInput={(e) => { editMemberNewName.value = (e.target as HTMLInputElement).value; }}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter') {
                                            e.preventDefault();
                                            saveEditMember();
                                          } else if (e.key === 'Escape') {
                                            editingMemberInfo.value = null;
                                          }
                                        }}
                                        class="edit-member-input"
                                        autoFocus
                                      />
                                      <button
                                        onClick={saveEditMember}
                                        class="save-member-btn"
                                        title="Save"
                                      >
                                        ✓
                                      </button>
                                      <button
                                        onClick={() => { editingMemberInfo.value = null; }}
                                        class="cancel-edit-btn"
                                        title="Cancel"
                                      >
                                        ✕
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <span class="member-name">{member}</span>
                                      <button
                                        onClick={() => startEditMember(groupId, member)}
                                        class="edit-member-btn"
                                        title="Edit name"
                                      >
                                        ✎
                                      </button>
                                      <button
                                        onClick={() => removeMemberFromGroup(groupId, member)}
                                        class="remove-member-btn"
                                        title="Remove member"
                                      >
                                        ×
                                      </button>
                                    </>
                                  )}
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    )}

                    <div class="group-card-footer">
                      <button
                        onClick={() => toggleGroupExpand(groupId)}
                        class="manage-members-btn"
                      >
                        {isExpanded ? 'Hide Members' : 'Manage Members'}
                      </button>
                      <a
                        href={`#${groupId}`}
                        class="view-group-link"
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.hash = groupId;
                          window.location.reload();
                        }}
                      >
                        View Group →
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
