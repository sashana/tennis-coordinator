/**
 * ClubDashboard - Organization admin dashboard
 *
 * Allows organization admins to view and manage groups across locations.
 * Accessible at sportsconnector.com/#clubs/{orgId}
 */

import { useEffect, useState } from 'preact/hooks';
import { signal } from '@preact/signals';
import { getDatabase } from '../../config/firebase';
import { firebasePaths } from '../../services/firebase';
import {
  currentOrg,
  adminScope,
  visibleGroups,
  hasOrgAccess,
  isLoadingOrg,
  orgError,
  loadAdminIndex,
  loadOrganization,
  loadOrgGroups,
  getLocationNames,
} from '../../hooks/useOrgPermissions';
import { getDeviceToken } from '../../hooks/useCompatibility';
import type { GroupSettings } from '../../types';

// Local signals
const selectedGroupId = signal<string | null>(null);
const showGroupDetails = signal(false);
const locationFilter = signal<string>('all');
const sportFilter = signal<string>('all');
const searchQuery = signal('');

// Auth state
const isAuthenticated = signal(false);
const showSetupMode = signal(false);

interface ClubDashboardProps {
  orgId: string;
  isSetup?: boolean;
}

export function ClubDashboard({ orgId, isSetup = false }: ClubDashboardProps) {
  const [isInitializing, setIsInitializing] = useState(true);

  // Initialize on mount
  useEffect(() => {
    async function init() {
      setIsInitializing(true);

      // Load admin index for current device
      const token = getDeviceToken();
      if (token) {
        await loadAdminIndex(token);
      }

      // Load organization
      await loadOrganization(orgId);
      await loadOrgGroups(orgId);

      // Check if user has access
      if (hasOrgAccess.value) {
        isAuthenticated.value = true;
      } else if (isSetup) {
        showSetupMode.value = true;
      }

      setIsInitializing(false);
    }

    init();
  }, [orgId, isSetup]);

  // Set up real-time listener for groups
  useEffect(() => {
    if (!isAuthenticated.value) return;

    const db = getDatabase();
    const groupsRef = db.ref(firebasePaths.groups());

    const handler = groupsRef.on('value', () => {
      // Reload org groups when data changes
      loadOrgGroups(orgId);
    });

    return () => {
      groupsRef.off('value', handler);
    };
  }, [orgId, isAuthenticated.value]);

  // Loading state
  if (isInitializing || isLoadingOrg.value) {
    return (
      <div class="club-dashboard loading">
        <div class="loading-spinner"></div>
        <p>Loading organization...</p>
        <style>{styles}</style>
      </div>
    );
  }

  // Error state
  if (orgError.value) {
    return (
      <div class="club-dashboard error">
        <h2>Error</h2>
        <p>{orgError.value}</p>
        <a href="#" class="back-link">
          &larr; Back to home
        </a>
        <style>{styles}</style>
      </div>
    );
  }

  // Setup mode for new admins
  if (showSetupMode.value) {
    return <SetupMode orgId={orgId} />;
  }

  // Not authenticated
  if (!isAuthenticated.value) {
    return <AccessDenied orgId={orgId} />;
  }

  const org = currentOrg.value;
  if (!org) {
    return (
      <div class="club-dashboard error">
        <p>Organization not found</p>
        <style>{styles}</style>
      </div>
    );
  }

  return (
    <div class="club-dashboard">
      <Header org={org} />
      <Filters org={org} />
      <GroupsList />
      {showGroupDetails.value && selectedGroupId.value && (
        <GroupDetailsDrawer groupId={selectedGroupId.value} />
      )}
      <style>{styles}</style>
    </div>
  );
}

// Header component
function Header({ org }: { org: { name: string; branding?: { primaryColor?: string } } }) {
  const scope = adminScope.value;
  const scopeLabel =
    scope.level === 'org'
      ? 'Organization Admin'
      : scope.level === 'location'
        ? `Location Admin (${scope.locations.length} locations)`
        : 'Viewer';

  return (
    <header
      class="dashboard-header"
      style={{ backgroundColor: org.branding?.primaryColor || '#1a365d' }}
    >
      <div class="header-content">
        <a href="#" class="back-link">
          &larr; Back
        </a>
        <div class="org-info">
          <h1>{org.name}</h1>
          <span class="scope-badge">{scopeLabel}</span>
        </div>
      </div>
    </header>
  );
}

// Filters component
function Filters({ org }: { org: { locations: Record<string, { name: string }> } }) {
  const locations = Object.entries(org.locations);

  return (
    <div class="filters-bar">
      <div class="filter-group">
        <label>Location:</label>
        <select
          value={locationFilter.value}
          onChange={(e) => {
            locationFilter.value = (e.target as HTMLSelectElement).value;
          }}
        >
          <option value="all">All Locations</option>
          {locations.map(([id, loc]) => (
            <option key={id} value={id}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      <div class="filter-group">
        <label>Sport:</label>
        <select
          value={sportFilter.value}
          onChange={(e) => {
            sportFilter.value = (e.target as HTMLSelectElement).value;
          }}
        >
          <option value="all">All Sports</option>
          <option value="tennis">Tennis</option>
          <option value="pickleball">Pickleball</option>
          <option value="squash">Squash</option>
        </select>
      </div>

      <div class="filter-group search">
        <input
          type="text"
          placeholder="Search groups..."
          value={searchQuery.value}
          onInput={(e) => {
            searchQuery.value = (e.target as HTMLInputElement).value;
          }}
        />
      </div>
    </div>
  );
}

// Groups list component
function GroupsList() {
  const groups = visibleGroups.value;

  // Apply filters
  const filteredGroups = groups.filter((g) => {
    // Location filter
    if (locationFilter.value !== 'all') {
      if (!g.settings.locations?.includes(locationFilter.value)) {
        return false;
      }
    }

    // Sport filter
    if (sportFilter.value !== 'all') {
      if (g.settings.sportType !== sportFilter.value) {
        return false;
      }
    }

    // Search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      const name = g.settings.groupName.toLowerCase();
      const level = g.settings.level?.toLowerCase() || '';
      if (!name.includes(query) && !level.includes(query)) {
        return false;
      }
    }

    return true;
  });

  if (filteredGroups.length === 0) {
    return (
      <div class="groups-list empty">
        <p>No groups found</p>
        {groups.length > 0 && <p class="hint">Try adjusting your filters</p>}
      </div>
    );
  }

  return (
    <div class="groups-list">
      <div class="list-header">
        <span class="count">{filteredGroups.length} groups</span>
      </div>
      <div class="groups-grid">
        {filteredGroups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
}

// Group card component
function GroupCard({ group }: { group: { id: string; settings: GroupSettings } }) {
  const { settings } = group;
  const sportEmoji = settings.sportType === 'pickleball' ? '🟡' : '🎾';
  const locationNames = getLocationNames(settings.locations || []);

  const handleClick = () => {
    selectedGroupId.value = group.id;
    showGroupDetails.value = true;
  };

  return (
    <div class="group-card" onClick={handleClick}>
      <div class="card-header">
        <span class="sport-icon">{sportEmoji}</span>
        <h3>{settings.groupName}</h3>
      </div>
      <div class="card-body">
        <div class="stat">
          <span class="icon">👥</span>
          <span>{settings.members?.length || 0} members</span>
        </div>
        {locationNames.length > 0 && (
          <div class="stat">
            <span class="icon">📍</span>
            <span>{locationNames.join(', ')}</span>
          </div>
        )}
        {settings.level && (
          <div class="stat">
            <span class="icon">⭐</span>
            <span>Level: {settings.level}</span>
          </div>
        )}
        {settings.type && <span class="type-badge">{settings.type}</span>}
      </div>
    </div>
  );
}

// Group details drawer
function GroupDetailsDrawer({ groupId }: { groupId: string }) {
  const group = visibleGroups.value.find((g) => g.id === groupId);

  if (!group) {
    return null;
  }

  const { settings } = group;
  const locationNames = getLocationNames(settings.locations || []);

  const handleClose = () => {
    showGroupDetails.value = false;
    selectedGroupId.value = null;
  };

  const handleOpenGroup = () => {
    // Open the group in the main app
    const sport = settings.sportType || 'tennis';
    window.open(`https://${sport}.sportsconnector.com/#${groupId}`, '_blank');
  };

  return (
    <div class="drawer-overlay" onClick={handleClose}>
      <div class="drawer" onClick={(e) => e.stopPropagation()}>
        <div class="drawer-header">
          <h2>{settings.groupName}</h2>
          <button class="close-btn" onClick={handleClose}>
            &times;
          </button>
        </div>

        <div class="drawer-content">
          <section>
            <h3>Group Info</h3>
            <div class="info-grid">
              <div class="info-item">
                <label>Sport</label>
                <span>{settings.sportType || 'tennis'}</span>
              </div>
              <div class="info-item">
                <label>Members</label>
                <span>{settings.members?.length || 0}</span>
              </div>
              {settings.level && (
                <div class="info-item">
                  <label>Level</label>
                  <span>{settings.level}</span>
                </div>
              )}
              {settings.format && (
                <div class="info-item">
                  <label>Format</label>
                  <span>{settings.format}</span>
                </div>
              )}
              {settings.type && (
                <div class="info-item">
                  <label>Type</label>
                  <span>{settings.type}</span>
                </div>
              )}
            </div>
          </section>

          {locationNames.length > 0 && (
            <section>
              <h3>Locations</h3>
              <ul class="locations-list">
                {locationNames.map((name, i) => (
                  <li key={i}>📍 {name}</li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h3>Access</h3>
            <div class="info-grid">
              <div class="info-item">
                <label>Group PIN</label>
                <code>{settings.groupPin}</code>
              </div>
              <div class="info-item">
                <label>Admin PIN</label>
                <code>{settings.adminPin}</code>
              </div>
            </div>
          </section>

          <section>
            <h3>Members ({settings.members?.length || 0})</h3>
            <ul class="members-list">
              {settings.members?.slice(0, 20).map((name) => (
                <li key={name}>{name}</li>
              ))}
              {(settings.members?.length || 0) > 20 && (
                <li class="more">+{settings.members!.length - 20} more</li>
              )}
            </ul>
          </section>

          <div class="drawer-actions">
            <button class="primary-btn" onClick={handleOpenGroup}>
              Open Group
            </button>
          </div>

          <div class="group-id">
            <small>Group ID: {groupId}</small>
          </div>
        </div>
      </div>
    </div>
  );
}

// Setup mode for new admins
function SetupMode({ orgId: _orgId }: { orgId: string }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // For now, just show a message - actual setup would register the device token
      const org = currentOrg.value;
      if (!org) {
        setError('Organization not found');
        return;
      }

      // Check if PIN matches any admin entry
      // In production, this would validate against a setup PIN
      setError('Setup functionality coming soon. Please contact your organization admin.');
    } catch {
      setError('Setup failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div class="club-dashboard setup-mode">
      <div class="setup-card">
        <h2>Setup Your Access</h2>
        <p>Enter the setup PIN provided by your organization admin.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Setup PIN"
            value={pin}
            onInput={(e) => setPin((e.target as HTMLInputElement).value)}
            disabled={isSubmitting}
          />
          {error && <p class="error-message">{error}</p>}
          <button type="submit" disabled={isSubmitting || !pin}>
            {isSubmitting ? 'Setting up...' : 'Complete Setup'}
          </button>
        </form>

        <a href="#" class="back-link">
          &larr; Back to home
        </a>
      </div>
      <style>{styles}</style>
    </div>
  );
}

// Access denied view
function AccessDenied({ orgId: _orgId }: { orgId: string }) {
  return (
    <div class="club-dashboard access-denied">
      <div class="denied-card">
        <h2>Access Required</h2>
        <p>You don't have access to this organization's dashboard.</p>
        <p>If you should have access, please contact your organization admin.</p>
        <a href="#" class="back-link">
          &larr; Back to home
        </a>
      </div>
      <style>{styles}</style>
    </div>
  );
}

// Styles
const styles = `
  .club-dashboard {
    min-height: 100vh;
    background: #f5f7fa;
    font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  .club-dashboard.loading,
  .club-dashboard.error,
  .club-dashboard.setup-mode,
  .club-dashboard.access-denied {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #e0e0e0;
    border-top-color: #1a365d;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .back-link {
    color: #1a365d;
    text-decoration: none;
    font-size: 0.9rem;
    margin-top: 1rem;
  }

  .back-link:hover {
    text-decoration: underline;
  }

  /* Header */
  .dashboard-header {
    color: white;
    padding: 1rem 1.5rem;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .dashboard-header .back-link {
    color: rgba(255, 255, 255, 0.8);
  }

  .org-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
  }

  .org-info h1 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
  }

  .scope-badge {
    background: rgba(255, 255, 255, 0.2);
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
  }

  /* Filters */
  .filters-bar {
    background: white;
    padding: 1rem 1.5rem;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: center;
    border-bottom: 1px solid #e0e0e0;
  }

  .filter-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .filter-group label {
    font-size: 0.85rem;
    color: #666;
  }

  .filter-group select,
  .filter-group input {
    padding: 0.5rem 0.75rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 0.9rem;
  }

  .filter-group.search {
    flex: 1;
    min-width: 200px;
  }

  .filter-group.search input {
    width: 100%;
  }

  /* Groups list */
  .groups-list {
    padding: 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .groups-list.empty {
    text-align: center;
    padding: 3rem;
    color: #666;
  }

  .groups-list .hint {
    font-size: 0.85rem;
    color: #999;
    margin-top: 0.5rem;
  }

  .list-header {
    margin-bottom: 1rem;
  }

  .list-header .count {
    font-size: 0.9rem;
    color: #666;
  }

  .groups-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }

  /* Group card */
  .group-card {
    background: white;
    border-radius: 12px;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid #e0e0e0;
  }

  .group-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .card-header .sport-icon {
    font-size: 1.5rem;
  }

  .card-header h3 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card-body {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .card-body .stat {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: #666;
  }

  .card-body .stat .icon {
    font-size: 0.9rem;
  }

  .type-badge {
    display: inline-block;
    background: #e8f5e9;
    color: #2e7d32;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    text-transform: capitalize;
    margin-top: 0.25rem;
    width: fit-content;
  }

  /* Drawer */
  .drawer-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 200;
    display: flex;
    justify-content: flex-end;
  }

  .drawer {
    background: white;
    width: 100%;
    max-width: 400px;
    height: 100%;
    overflow-y: auto;
    animation: slideIn 0.3s ease-out;
  }

  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }

  .drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e0e0e0;
    position: sticky;
    top: 0;
    background: white;
  }

  .drawer-header h2 {
    font-size: 1.25rem;
    margin: 0;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
    padding: 0.25rem;
  }

  .drawer-content {
    padding: 1.5rem;
  }

  .drawer-content section {
    margin-bottom: 1.5rem;
  }

  .drawer-content h3 {
    font-size: 0.9rem;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0 0 0.75rem;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .info-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .info-item label {
    font-size: 0.75rem;
    color: #999;
    text-transform: uppercase;
  }

  .info-item span,
  .info-item code {
    font-size: 0.9rem;
  }

  .info-item code {
    font-family: monospace;
    background: #f5f5f5;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
  }

  .locations-list,
  .members-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .locations-list li,
  .members-list li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #f0f0f0;
  }

  .members-list li.more {
    color: #666;
    font-style: italic;
  }

  .drawer-actions {
    margin-top: 2rem;
  }

  .primary-btn {
    width: 100%;
    padding: 0.75rem;
    background: #1a365d;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
  }

  .primary-btn:hover {
    background: #2d4a7c;
  }

  .group-id {
    margin-top: 1.5rem;
    text-align: center;
  }

  .group-id small {
    font-size: 0.75rem;
    color: #999;
    font-family: monospace;
  }

  /* Setup and Access Denied */
  .setup-card,
  .denied-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    max-width: 400px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  .setup-card h2,
  .denied-card h2 {
    margin: 0 0 0.5rem;
    color: #1a365d;
  }

  .setup-card p,
  .denied-card p {
    color: #666;
    margin-bottom: 1rem;
  }

  .setup-card form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .setup-card input {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    text-align: center;
  }

  .setup-card button {
    padding: 0.75rem;
    background: #1a365d;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
  }

  .setup-card button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  .error-message {
    color: #d32f2f;
    font-size: 0.9rem;
    margin: 0;
  }

  /* Responsive */
  @media (max-width: 600px) {
    .filters-bar {
      flex-direction: column;
      align-items: stretch;
    }

    .filter-group {
      width: 100%;
    }

    .filter-group select,
    .filter-group input {
      flex: 1;
    }

    .groups-grid {
      grid-template-columns: 1fr;
    }

    .drawer {
      max-width: 100%;
    }
  }
`;

export default ClubDashboard;
