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

// New UI state
const searchQuery = signal('');
const activeTab = signal<'active' | 'archived'>('active');
const openMenuId = signal<string | null>(null);
const detailsDrawerGroup = signal<string | null>(null);

export function AdminPage() {
  useEffect(() => {
    initializePage();
  }, []);

  async function initializePage() {
    try {
      // Load site admin PIN from Firebase
      const db = getDatabase();
      const siteSettingsSnapshot = await db.ref('siteSettings').once('value');
      const siteSettings = siteSettingsSnapshot.val() as { siteAdminPin?: string } | null;
      siteAdminPin.value = siteSettings?.siteAdminPin || null;

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
      loginError.value =
        'Site admin PIN not configured. Please set siteAdminPin in siteSettings in Firebase.';
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

  async function archiveGroup(groupId: string, groupName: string) {
    const confirmed = confirm(
      `ARCHIVE: "${groupName}"\n\nThis will:\n• Mark the group as archived (hidden from active lists)\n• Disable the share link\n• Preserve all data for historical purposes\n• Keep user links for future history features\n\nThe group can be unarchived later if needed.`
    );

    if (!confirmed) {
      return;
    }

    try {
      const db = getDatabase();
      const group = groups.value[groupId];
      const shortCode = group?.metadata?.shortCode;

      // 1. Mark group as archived
      await db.ref(`groups/${groupId}/metadata/archived`).set(true);
      await db.ref(`groups/${groupId}/metadata/archivedAt`).set(Date.now());

      // 2. Remove from shortCodeIndex (disable the share link)
      if (shortCode) {
        await db.ref(`shortCodeIndex/${shortCode}`).remove();
      }

      // Update local state
      const updatedGroups = { ...groups.value };
      if (updatedGroups[groupId]) {
        updatedGroups[groupId] = {
          ...updatedGroups[groupId],
          metadata: {
            ...updatedGroups[groupId].metadata,
            archived: true,
            archivedAt: Date.now(),
          },
        };
      }
      groups.value = updatedGroups;

      showToast(`Archived "${groupName}"`, 'success');
    } catch (error) {
      console.error('Error archiving group:', error);
      showToast('Failed to archive group', 'error');
    }
  }

  async function unarchiveGroup(groupId: string, groupName: string) {
    try {
      const db = getDatabase();
      const group = groups.value[groupId];
      const shortCode = group?.metadata?.shortCode;

      // 1. Remove archived flag
      await db.ref(`groups/${groupId}/metadata/archived`).remove();
      await db.ref(`groups/${groupId}/metadata/archivedAt`).remove();

      // 2. Restore shortCodeIndex entry
      if (shortCode) {
        await db.ref(`shortCodeIndex/${shortCode}`).set(groupId);
      }

      // Update local state
      const updatedGroups = { ...groups.value };
      if (updatedGroups[groupId]?.metadata) {
        const { archived, archivedAt, ...restMetadata } = updatedGroups[groupId].metadata;
        updatedGroups[groupId] = {
          ...updatedGroups[groupId],
          metadata: restMetadata,
        };
      }
      groups.value = updatedGroups;

      showToast(`Unarchived "${groupName}"`, 'success');
    } catch (error) {
      console.error('Error unarchiving group:', error);
      showToast('Failed to unarchive group', 'error');
    }
  }

  async function systemDeleteGroup(groupId: string, groupName: string) {
    const confirmed = confirm(
      `SYSTEM DELETE: "${groupName}"\n\nThis will permanently remove ALL traces:\n• Group data (members, check-ins, notes, settings)\n• Short code index entry\n• All platform user links\n\nUse this only for test data cleanup.\n\nThis action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      const db = getDatabase();

      // Get the group's short code to also delete from shortCodeIndex
      const group = groups.value[groupId];
      const shortCode = group?.metadata?.shortCode;

      // 1. Delete the group data
      await db.ref(`groups/${groupId}`).remove();

      // 2. Delete from shortCodeIndex if exists
      if (shortCode) {
        await db.ref(`shortCodeIndex/${shortCode}`).remove();
      }

      // 3. Clean up platform user links to this group
      // Also remove platform users that have no remaining group links
      const platformUsersSnapshot = await db.ref('platform/users').once('value');
      const platformUsers = platformUsersSnapshot.val() || {};

      const cleanupPromises: Promise<void>[] = [];
      let usersRemoved = 0;

      for (const deviceToken of Object.keys(platformUsers)) {
        const userGroupLinks = platformUsers[deviceToken]?.groupLinks;
        if (userGroupLinks && userGroupLinks[groupId]) {
          // Check if this is their only group link
          const groupLinkCount = Object.keys(userGroupLinks).length;
          if (groupLinkCount === 1) {
            // This was their only group - remove the entire platform user
            cleanupPromises.push(db.ref(`platform/users/${deviceToken}`).remove());
            usersRemoved++;
          } else {
            // They have other groups - just remove this link
            cleanupPromises.push(
              db.ref(`platform/users/${deviceToken}/groupLinks/${groupId}`).remove()
            );
          }
        }
      }

      if (cleanupPromises.length > 0) {
        await Promise.all(cleanupPromises);
      }

      // Update local state
      const updatedGroups = { ...groups.value };
      delete updatedGroups[groupId];
      groups.value = updatedGroups;

      // Collapse if this group was expanded
      if (expandedGroup.value === groupId) {
        expandedGroup.value = null;
      }

      const linksRemoved = cleanupPromises.length;
      let message = `System deleted "${groupName}"`;
      if (usersRemoved > 0) {
        message += ` (${usersRemoved} orphaned user${usersRemoved > 1 ? 's' : ''} removed)`;
      } else if (linksRemoved > 0) {
        message += ` (${linksRemoved} user link${linksRemoved > 1 ? 's' : ''} removed)`;
      }
      showToast(message, 'success');
    } catch (error) {
      console.error('Error in system delete:', error);
      showToast('Failed to delete group', 'error');
    }
  }

  function startEditMember(groupId: string, memberName: string) {
    editingMemberInfo.value = { groupId, originalName: memberName };
    editMemberNewName.value = memberName;
  }

  async function saveEditMember() {
    const editInfo = editingMemberInfo.value;
    if (!editInfo) {
      return;
    }

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
    if (
      currentMembers.some(
        (m: string) => m.toLowerCase() === newName.toLowerCase() && m !== editInfo.originalName
      )
    ) {
      showToast('A member with this name already exists', 'error');
      return;
    }

    try {
      const db = getDatabase();
      const updatedMembers = currentMembers.map((m: string) =>
        m === editInfo.originalName ? newName : m
      );
      await db.ref(`groups/${editInfo.groupId}/settings/members`).set(updatedMembers);

      // Also move member details if they exist
      const memberDetails = group?.settings?.memberDetails || {};
      if (memberDetails[editInfo.originalName]) {
        const details = memberDetails[editInfo.originalName];
        await db
          .ref(`groups/${editInfo.groupId}/settings/memberDetails/${editInfo.originalName}`)
          .remove();
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
          const checkinsArray = Object.values(dateCheckins) as Array<{
            name?: string;
            [key: string]: unknown;
          }>;
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

  // Filter groups by search and tab
  const filteredGroups = groupEntries.filter(([, group]: [string, any]) => {
    const isArchived = group.metadata?.archived === true;
    const matchesTab = activeTab.value === 'archived' ? isArchived : !isArchived;

    if (!matchesTab) return false;

    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase();
      const name = (group.settings?.groupName || '').toLowerCase();
      const creator = (group.metadata?.creator?.name || '').toLowerCase();
      const location = (group.settings?.location?.name || '').toLowerCase();
      return name.includes(query) || creator.includes(query) || location.includes(query);
    }

    return true;
  });

  const activeCount = groupEntries.filter(([, g]) => !g.metadata?.archived).length;
  const archivedCount = groupEntries.filter(([, g]) => g.metadata?.archived).length;

  function toggleMenu(groupId: string) {
    openMenuId.value = openMenuId.value === groupId ? null : groupId;
  }

  function closeMenu() {
    openMenuId.value = null;
  }

  function copyShareLink(shortCode: string) {
    const url = `${window.location.origin}/${shortCode}`;
    navigator.clipboard.writeText(url);
    showToast('Share link copied!', 'success');
    closeMenu();
  }

  function openDetails(groupId: string) {
    detailsDrawerGroup.value = groupId;
    closeMenu();
  }

  function closeDetails() {
    detailsDrawerGroup.value = null;
    expandedGroup.value = null;
  }

  const detailsGroup = detailsDrawerGroup.value ? groups.value[detailsDrawerGroup.value] : null;

  return (
    <div class="site-admin-page" onClick={() => openMenuId.value && closeMenu()}>
      <div class="site-admin-dashboard">
        <header class="site-admin-dashboard-header">
          <div class="header-left">
            <h1>🎾 Site Administration</h1>
          </div>
          <button onClick={handleLogout} class="logout-button">
            Sign Out
          </button>
        </header>

        {/* Search bar */}
        <div class="admin-search-bar">
          <span class="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search groups by name, creator, or location..."
            value={searchQuery.value}
            onInput={(e) => {
              searchQuery.value = (e.target as HTMLInputElement).value;
            }}
            class="admin-search-input"
          />
          {searchQuery.value && (
            <button
              class="search-clear"
              onClick={() => { searchQuery.value = ''; }}
            >
              ×
            </button>
          )}
        </div>

        {/* Tabs */}
        <div class="admin-tabs">
          <button
            class={`admin-tab ${activeTab.value === 'active' ? 'active' : ''}`}
            onClick={() => { activeTab.value = 'active'; }}
          >
            Active ({activeCount})
          </button>
          <button
            class={`admin-tab ${activeTab.value === 'archived' ? 'active' : ''}`}
            onClick={() => { activeTab.value = 'archived'; }}
          >
            Archived ({archivedCount})
          </button>
        </div>

        {/* Groups list */}
        <section class="site-admin-section">
          {filteredGroups.length === 0 ? (
            <div class="empty-state">
              {searchQuery.value ? (
                <p>No groups match "{searchQuery.value}"</p>
              ) : activeTab.value === 'archived' ? (
                <p>No archived groups.</p>
              ) : (
                <p>No active groups yet.</p>
              )}
            </div>
          ) : (
            <div class="groups-list">
              {filteredGroups.map(([groupId, group]: [string, any]) => {
                const members = group.settings?.members || [];
                const isMenuOpen = openMenuId.value === groupId;
                const creatorName = group.metadata?.creator?.name;
                const createdAt = group.metadata?.createdAt;

                return (
                  <div key={groupId} class="group-row">
                    <div class="group-row-main">
                      <div class="group-row-info">
                        <h3 class="group-row-name">
                          {group.settings?.groupName || 'Unnamed Group'}
                        </h3>
                        <div class="group-row-meta">
                          <span class="group-row-members">👥 {members.length}</span>
                          {group.settings?.location?.name && (
                            <span class="group-row-location">
                              📍 {group.settings.location.name}
                            </span>
                          )}
                        </div>
                        {(creatorName || createdAt) && (
                          <div class="group-row-creator">
                            {createdAt && (
                              <span>
                                Created {new Date(createdAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </span>
                            )}
                            {creatorName && <span> by {creatorName}</span>}
                          </div>
                        )}
                      </div>

                      <div class="group-row-actions">
                        {activeTab.value === 'active' ? (
                          <a
                            href={`#${groupId}`}
                            class="view-group-btn"
                            onClick={(e) => {
                              e.preventDefault();
                              // Set group and admin auth for site admin access
                              sessionStorage.setItem(`pinAuth_${groupId}`, 'true');
                              sessionStorage.setItem(`adminAuth_${groupId}`, 'true');
                              window.location.hash = groupId;
                              window.location.reload();
                            }}
                          >
                            View Group →
                          </a>
                        ) : (
                          <button
                            onClick={() => unarchiveGroup(groupId, group.settings?.groupName || groupId)}
                            class="unarchive-btn"
                          >
                            Unarchive
                          </button>
                        )}

                        {/* Kebab menu */}
                        <div class="kebab-menu-container">
                          <button
                            class="kebab-menu-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMenu(groupId);
                            }}
                          >
                            ⋮
                          </button>
                          {isMenuOpen && (
                            <div class="kebab-menu" onClick={(e) => e.stopPropagation()}>
                              <button
                                class="kebab-menu-item"
                                onClick={() => {
                                  openDetails(groupId);
                                }}
                              >
                                <span class="menu-icon">👥</span>
                                Manage Members
                              </button>
                              {group.metadata?.shortCode && (
                                <button
                                  class="kebab-menu-item"
                                  onClick={() => copyShareLink(group.metadata.shortCode)}
                                >
                                  <span class="menu-icon">🔗</span>
                                  Copy Share Link
                                </button>
                              )}
                              <button
                                class="kebab-menu-item"
                                onClick={() => openDetails(groupId)}
                              >
                                <span class="menu-icon">ℹ️</span>
                                View Details
                              </button>
                              <div class="kebab-menu-divider" />
                              {activeTab.value === 'active' ? (
                                <button
                                  class="kebab-menu-item"
                                  onClick={() => {
                                    closeMenu();
                                    archiveGroup(groupId, group.settings?.groupName || groupId);
                                  }}
                                >
                                  <span class="menu-icon">📦</span>
                                  Archive Group
                                </button>
                              ) : (
                                <button
                                  class="kebab-menu-item"
                                  onClick={() => {
                                    closeMenu();
                                    unarchiveGroup(groupId, group.settings?.groupName || groupId);
                                  }}
                                >
                                  <span class="menu-icon">📤</span>
                                  Unarchive Group
                                </button>
                              )}
                              <div class="kebab-menu-divider" />
                              <button
                                class="kebab-menu-item danger"
                                onClick={() => {
                                  closeMenu();
                                  systemDeleteGroup(groupId, group.settings?.groupName || groupId);
                                }}
                              >
                                <span class="menu-icon">🗑️</span>
                                System Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* Details Drawer */}
      {detailsDrawerGroup.value && detailsGroup && (
        <div class="details-drawer-overlay" onClick={closeDetails}>
          <div class="details-drawer" onClick={(e) => e.stopPropagation()}>
            <div class="drawer-header">
              <h2>{detailsGroup.settings?.groupName || 'Group Details'}</h2>
              <button class="drawer-close" onClick={closeDetails}>×</button>
            </div>

            <div class="drawer-content">
              {/* Group Info Section */}
              <div class="drawer-section">
                <h3>Group Info</h3>
                <div class="detail-row">
                  <span class="detail-label">Members:</span>
                  <span class="detail-value">{detailsGroup.settings?.members?.length || 0}</span>
                </div>
                {detailsGroup.settings?.location?.name && (
                  <div class="detail-row">
                    <span class="detail-label">Location:</span>
                    <span class="detail-value">{detailsGroup.settings.location.name}</span>
                  </div>
                )}
                {detailsGroup.metadata?.shortCode && (
                  <div class="detail-row">
                    <span class="detail-label">Short Code:</span>
                    <span class="detail-value code">{detailsGroup.metadata.shortCode}</span>
                  </div>
                )}
                {detailsGroup.metadata?.archetype && (
                  <div class="detail-row">
                    <span class="detail-label">Type:</span>
                    <span class="detail-value">{detailsGroup.metadata.archetype}</span>
                  </div>
                )}
              </div>

              {/* Creator Section */}
              {detailsGroup.metadata?.creator && (
                <div class="drawer-section">
                  <h3>Creator</h3>
                  <div class="detail-row">
                    <span class="detail-label">Name:</span>
                    <span class="detail-value">{detailsGroup.metadata.creator.name}</span>
                  </div>
                  {detailsGroup.metadata.creator.email && (
                    <div class="detail-row">
                      <span class="detail-label">Email:</span>
                      <a href={`mailto:${detailsGroup.metadata.creator.email}`} class="detail-link">
                        {detailsGroup.metadata.creator.email}
                      </a>
                    </div>
                  )}
                  {detailsGroup.metadata.creator.phone && (
                    <div class="detail-row">
                      <span class="detail-label">Phone:</span>
                      <a href={`tel:${detailsGroup.metadata.creator.phone}`} class="detail-link">
                        {detailsGroup.metadata.creator.phone}
                      </a>
                    </div>
                  )}
                  {detailsGroup.metadata.createdAt && (
                    <div class="detail-row">
                      <span class="detail-label">Created:</span>
                      <span class="detail-value">
                        {new Date(detailsGroup.metadata.createdAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* PINs Section */}
              <div class="drawer-section">
                <h3>Access PINs</h3>
                <div class="detail-row">
                  <span class="detail-label">Group PIN:</span>
                  <span class="detail-value code">{detailsGroup.settings?.groupPin || 'Not set'}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Admin PIN:</span>
                  <span class="detail-value code">{detailsGroup.settings?.adminPin || 'Not set'}</span>
                </div>
              </div>

              {/* Members Section */}
              <div class="drawer-section">
                <h3>Members ({detailsGroup.settings?.members?.length || 0})</h3>

                {/* Add member form */}
                <div class="add-member-form">
                  <input
                    type="text"
                    placeholder="Add new member..."
                    value={newMemberName.value}
                    onInput={(e) => {
                      newMemberName.value = (e.target as HTMLInputElement).value;
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addMemberToGroup(detailsDrawerGroup.value!);
                      }
                    }}
                    class="member-input"
                    disabled={addingMember.value}
                  />
                  <button
                    onClick={() => addMemberToGroup(detailsDrawerGroup.value!)}
                    class="add-member-btn"
                    disabled={addingMember.value}
                  >
                    {addingMember.value ? '...' : 'Add'}
                  </button>
                </div>

                {/* Member list */}
                <div class="members-list">
                  {(detailsGroup.settings?.members || []).length === 0 ? (
                    <p class="no-members">No members yet.</p>
                  ) : (
                    (detailsGroup.settings?.members || []).map((member: string) => {
                      const isEditing =
                        editingMemberInfo.value?.groupId === detailsDrawerGroup.value &&
                        editingMemberInfo.value?.originalName === member;
                      return (
                        <div key={member} class="member-item">
                          {isEditing ? (
                            <>
                              <input
                                type="text"
                                value={editMemberNewName.value}
                                onInput={(e) => {
                                  editMemberNewName.value = (e.target as HTMLInputElement).value;
                                }}
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
                              <button onClick={saveEditMember} class="save-member-btn" title="Save">
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
                                onClick={() => startEditMember(detailsDrawerGroup.value!, member)}
                                class="edit-member-btn"
                                title="Edit name"
                              >
                                ✎
                              </button>
                              <button
                                onClick={() => removeMemberFromGroup(detailsDrawerGroup.value!, member)}
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

              {/* Technical Info */}
              <div class="drawer-section technical">
                <h3>Technical</h3>
                <div class="detail-row">
                  <span class="detail-label">Group ID:</span>
                  <span class="detail-value code small">{detailsDrawerGroup.value}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
