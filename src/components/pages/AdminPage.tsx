/**
 * AdminPage - Site administration dashboard
 * Refactored to use extracted components from ./admin/
 */
import { useEffect } from 'preact/hooks';
import { sport } from '../../config/sport';
import {
  isAuthenticated,
  isLoading,
  groups,
  searchQuery,
  activeTab,
  openMenuId,
  closeMenu,
  LoginForm,
  GroupRow,
  DetailsDrawer,
} from './admin';
import { initializePage, handleLogout } from './admin/adminActions';

export function AdminPage() {
  useEffect(() => {
    initializePage();
  }, []);

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
    return <LoginForm />;
  }

  const groupEntries = Object.entries(groups.value);

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

  return (
    <div class="site-admin-page" onClick={() => openMenuId.value && closeMenu()}>
      <div class="site-admin-dashboard">
        <header class="site-admin-dashboard-header">
          <div class="header-left">
            <h1>{sport.sportEmoji} Site Administration</h1>
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
              onClick={() => {
                searchQuery.value = '';
              }}
            >
              ×
            </button>
          )}
        </div>

        {/* Tabs */}
        <div class="admin-tabs">
          <button
            class={`admin-tab ${activeTab.value === 'active' ? 'active' : ''}`}
            onClick={() => {
              activeTab.value = 'active';
            }}
          >
            Active ({activeCount})
          </button>
          <button
            class={`admin-tab ${activeTab.value === 'archived' ? 'active' : ''}`}
            onClick={() => {
              activeTab.value = 'archived';
            }}
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
              {filteredGroups.map(([groupId, group]: [string, any]) => (
                <GroupRow key={groupId} groupId={groupId} group={group} />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Details Drawer */}
      <DetailsDrawer />
    </div>
  );
}
