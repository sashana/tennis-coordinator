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
  type GroupStats,
} from '../../hooks/useOrgPermissions';
import { getDeviceToken } from '../../hooks/useCompatibility';
import type { GroupSettings, OrgInvite, OrgAdmin, AdminIndex } from '../../types';

// Local signals
const selectedGroupId = signal<string | null>(null);
const showGroupDetails = signal(false);
const locationFilter = signal<string>('all');
const sportFilter = signal<string>('all');
const searchQuery = signal('');

// Auth state
const isAuthenticated = signal(false);
const showSetupMode = signal(false);
const currentAdminName = signal<string>('');

// Invite modal state
const showInviteModal = signal(false);
const invites = signal<OrgInvite[]>([]);

interface ClubDashboardProps {
  orgId: string;
  isSetup?: boolean;
  inviteCode?: string;
}

export function ClubDashboard({ orgId, isSetup = false, inviteCode }: ClubDashboardProps) {
  const [isInitializing, setIsInitializing] = useState(true);
  const [pendingInvite, setPendingInvite] = useState<OrgInvite | null>(null);
  const [inviteError, setInviteError] = useState<string | null>(null);

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

      // Check for invite code
      if (inviteCode) {
        const db = getDatabase();
        const path = firebasePaths.organizationInvite(orgId, inviteCode);
        const snapshot = await db.ref(path).once('value');
        const data = snapshot.val() as Omit<OrgInvite, 'code'> | null;

        if (!data) {
          setInviteError('Invite not found');
        } else if (data.usedAt) {
          setInviteError('This invite has already been used');
        } else if (data.expiresAt < Date.now()) {
          setInviteError('This invite has expired');
        } else {
          setPendingInvite({ code: inviteCode, ...data });
        }
      }
      // Check if user has access
      else if (hasOrgAccess.value) {
        isAuthenticated.value = true;
        // Get current admin name
        const org = currentOrg.value;
        const admin = org?.admins?.find(a => a.id === token);
        currentAdminName.value = admin?.name || '';
      } else if (isSetup) {
        showSetupMode.value = true;
      }

      setIsInitializing(false);
    }

    init();
  }, [orgId, isSetup, inviteCode]);

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

  // Invite error state
  if (inviteError) {
    return (
      <div class="club-dashboard error">
        <h2>Invite Error</h2>
        <p>{inviteError}</p>
        <a href="#" class="back-link">
          &larr; Back to home
        </a>
        <style>{styles}</style>
      </div>
    );
  }

  // Pending invite - show acceptance form
  if (pendingInvite) {
    return (
      <AcceptInviteForm
        orgId={orgId}
        invite={pendingInvite}
        onSuccess={() => {
          // Reload admin index and redirect to dashboard
          const token = getDeviceToken();
          if (token) {
            loadAdminIndex(token).then(() => {
              isAuthenticated.value = true;
              setPendingInvite(null);
              window.location.hash = `#clubs/${orgId}`;
            });
          }
        }}
      />
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
      <Header org={org} orgId={orgId} />
      <HeroStats />
      <Filters org={org} />
      <GroupsList />
      {showGroupDetails.value && selectedGroupId.value && (
        <GroupDetailsDrawer groupId={selectedGroupId.value} />
      )}
      {showInviteModal.value && <InviteStaffModal orgId={orgId} org={org} />}
      <style>{styles}</style>
    </div>
  );
}

// Hero Stats component - aggregate stats across all groups
function HeroStats() {
  const groups = visibleGroups.value;

  // Calculate aggregate stats
  const totalMembers = groups.reduce((sum, g) => sum + (g.settings.members?.length || 0), 0);
  const totalCheckins = groups.reduce((sum, g) => sum + (g.stats?.totalCheckins || 0), 0);
  const totalSingles = groups.reduce((sum, g) => sum + (g.stats?.singlesGames || 0), 0);
  const totalDoubles = groups.reduce((sum, g) => sum + (g.stats?.doublesGames || 0), 0);
  const totalGames = totalSingles + totalDoubles;

  // Count active groups (had activity in last 14 days)
  const today = new Date();
  const twoWeeksAgo = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);
  const twoWeeksAgoStr = twoWeeksAgo.toISOString().split('T')[0];
  const activeGroups = groups.filter(g => {
    const lastActivity = g.stats?.lastActivity;
    return lastActivity && lastActivity >= twoWeeksAgoStr;
  }).length;

  return (
    <div class="hero-stats">
      <div class="hero-stat">
        <span class="hero-value">{totalMembers}</span>
        <span class="hero-label">Members</span>
      </div>
      <div class="hero-stat">
        <span class="hero-value">{totalCheckins}</span>
        <span class="hero-label">Check-ins</span>
      </div>
      <div class="hero-stat">
        <span class="hero-value">{totalGames}</span>
        <span class="hero-label">Games</span>
      </div>
      <div class="hero-stat">
        <span class="hero-value">{activeGroups}<span class="hero-total">/{groups.length}</span></span>
        <span class="hero-label">Active Groups</span>
      </div>
    </div>
  );
}

// Header component
const showUserMenu = signal(false);

function Header({ org, orgId }: { org: { name: string; branding?: { primaryColor?: string; logo?: string } }; orgId: string }) {
  const scope = adminScope.value;
  const scopeLabel =
    scope.level === 'org'
      ? 'Admin'
      : scope.level === 'location'
        ? `${scope.locations.length} Location${scope.locations.length > 1 ? 's' : ''}`
        : '';

  const canInvite = scope.level === 'org';
  const primaryColor = org.branding?.primaryColor || '#12365a';
  const userName = currentAdminName.value;
  // Fallback to 'A' for Admin if name not found (different device token)
  const userInitial = userName ? userName.charAt(0).toUpperCase() : 'A';

  const handleInviteClick = () => {
    showInviteModal.value = true;
    showUserMenu.value = false;

    const db = getDatabase();
    db.ref(firebasePaths.organizationInvites(orgId)).once('value').then((snapshot) => {
      const data = snapshot.val() as Record<string, Omit<OrgInvite, 'code'>> | null;
      const loadedInvites = data
        ? Object.entries(data).map(([code, invite]) => ({ code, ...invite }))
        : [];
      invites.value = loadedInvites;
    }).catch((err) => {
      console.error('Failed to load invites:', err);
    });
  };

  const handleLogout = () => {
    isAuthenticated.value = false;
    currentAdminName.value = '';
    showUserMenu.value = false;
    window.location.hash = '';
  };

  const toggleUserMenu = () => {
    showUserMenu.value = !showUserMenu.value;
  };

  // Close menu when clicking outside
  const handleOverlayClick = () => {
    showUserMenu.value = false;
  };

  return (
    <header class="dashboard-header" style={{ '--header-color': primaryColor } as any}>
      <div class="header-bar">
        {/* Logo */}
        {org.branding?.logo ? (
          <img src={org.branding.logo} alt={org.name} class="header-logo" />
        ) : (
          <div class="header-logo-placeholder">
            {org.name.charAt(0)}
          </div>
        )}

        {/* Spacer */}
        <div class="header-spacer" />

        {/* User Avatar */}
        <button class="header-avatar" onClick={toggleUserMenu}>
          {userInitial}
        </button>
      </div>

      {/* Dropdown Menu */}
      {showUserMenu.value && (
        <>
          <div class="menu-overlay" onClick={handleOverlayClick} />
          <div class="header-dropdown">
            <div class="dropdown-user">
              <div class="dropdown-avatar">{userInitial}</div>
              <div class="dropdown-info">
                <span class="dropdown-name">{userName || 'Admin'}</span>
                <span class="dropdown-role">{scope.level === 'org' ? 'Organization Admin' : 'Location Admin'}</span>
              </div>
            </div>
            <div class="dropdown-divider" />
            {canInvite && (
              <button class="dropdown-item" onClick={handleInviteClick}>
                <span class="dropdown-icon">+</span>
                Invite Staff
              </button>
            )}
            <button class="dropdown-item dropdown-logout" onClick={handleLogout}>
              <span class="dropdown-icon">↗</span>
              Sign Out
            </button>
          </div>
        </>
      )}
    </header>
  );
}

// Filters component
function Filters({ org }: { org: { locations: Record<string, { name: string }> } }) {
  const locations = Object.entries(org.locations);

  return (
    <div class="filters-bar">
      <div class="filters-row">
        <div class="search-box">
          <span class="search-icon">⌕</span>
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
      <div class="filters-row">
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

// Format relative time
function formatLastActivity(dateStr: string | null): string {
  if (!dateStr) return 'No activity';
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}

// Sport display config
const sportConfig: Record<string, { label: string; color: string; bg: string }> = {
  tennis: { label: 'Tennis', color: '#1b5e20', bg: '#e8f5e9' },
  pickleball: { label: 'Pickleball', color: '#f57f17', bg: '#fffde7' },
  squash: { label: 'Squash', color: '#0d47a1', bg: '#e3f2fd' },
  padel: { label: 'Padel', color: '#e65100', bg: '#fff3e0' },
  badminton: { label: 'Badminton', color: '#6a1b9a', bg: '#f3e5f5' },
};

// Group card component
function GroupCard({ group }: { group: { id: string; settings: GroupSettings; stats?: GroupStats } }) {
  const { settings, stats } = group;
  const sport = settings.sportType || 'tennis';
  const sportInfo = sportConfig[sport] || sportConfig.tennis;
  const sportColor = sportInfo.color;
  const locationNames = getLocationNames(settings.locations || []);
  const memberCount = settings.members?.length || 0;

  const handleCardClick = () => {
    selectedGroupId.value = group.id;
    showGroupDetails.value = true;
  };

  const handleOpenGroup = (e: Event) => {
    e.stopPropagation();
    window.open(`https://${sport}.sportsconnector.com/#${group.id}`, '_blank');
  };

  return (
    <div class="group-card" onClick={handleCardClick}>
      <div class="card-accent" style={{ backgroundColor: sportColor }} />
      <div class="card-body">
        {/* Row 1: Name + Sport */}
        <div class="card-row-1">
          <h3 class="card-title">{settings.groupName}</h3>
          <span
            class="card-sport"
            style={{ backgroundColor: sportInfo.bg, color: sportInfo.color }}
          >
            {sportInfo.label}
          </span>
        </div>
        {/* Row 2: Level + Format (under sport) */}
        <div class="card-row-2">
          {locationNames.length > 0 && (
            <span class="card-location">{locationNames.join(', ')}</span>
          )}
          <div class="card-tags">
            {settings.level && (
              <span class="card-level">{settings.level}</span>
            )}
            {settings.format && (
              <span class="card-format">{settings.format}</span>
            )}
          </div>
        </div>
        {/* Footer: Stats + Actions */}
        <div class="card-footer">
          <div class="card-stats">
            <span class="stat">{memberCount} members</span>
            <span class="stat-divider">·</span>
            <span class="stat">{stats?.totalGames || 0} games</span>
            <span class="stat-divider">·</span>
            <span class="stat">{formatLastActivity(stats?.lastActivity || null)}</span>
          </div>
          <div class="card-actions">
            <button class="card-action-btn" onClick={handleOpenGroup} title="Open group">
              ↗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Format date for display
function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  // Parse as local time (not UTC) by adding time component
  const date = new Date(dateStr + 'T12:00:00');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// Progress bar component for game types
function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const percent = max > 0 ? (value / max) * 100 : 0;
  return (
    <div class="progress-bar">
      <div class="progress-fill" style={{ width: `${percent}%`, backgroundColor: color }} />
    </div>
  );
}

// Group details drawer
function GroupDetailsDrawer({ groupId }: { groupId: string }) {
  const [showAllPlayers, setShowAllPlayers] = useState(false);
  const group = visibleGroups.value.find((g) => g.id === groupId);

  if (!group) {
    return null;
  }

  const { settings, stats } = group;
  const sport = settings.sportType || 'tennis';
  const sportInfo = sportConfig[sport] || sportConfig.tennis;
  const locationNames = getLocationNames(settings.locations || []);
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const maxDayCount = Math.max(...Object.values(stats?.dayOfWeekCounts || {}));
  const allPlayers = stats?.allPlayers || [];
  const displayedPlayers = showAllPlayers ? allPlayers : allPlayers.slice(0, 5);
  const hasMorePlayers = allPlayers.length > 5;

  const handleClose = () => {
    showGroupDetails.value = false;
    selectedGroupId.value = null;
    setShowAllPlayers(false);
  };

  const handleOpenGroup = () => {
    window.open(`https://${sport}.sportsconnector.com/#${groupId}`, '_blank');
  };

  return (
    <div class="drawer-overlay" onClick={handleClose}>
      <div class="drawer" onClick={(e) => e.stopPropagation()}>
        <div class="drawer-header">
          <div class="drawer-title-row">
            <h2>{settings.groupName}</h2>
            <span
              class="drawer-sport-badge"
              style={{ backgroundColor: sportInfo.bg, color: sportInfo.color }}
            >
              {sportInfo.label}
            </span>
          </div>
          <button class="close-btn" onClick={handleClose}>
            &times;
          </button>
        </div>

        <div class="drawer-content">
          {/* Summary Stats */}
          <section class="stats-section">
            <div class="stats-grid">
              <div class="stat-box">
                <span class="stat-value">{stats?.totalGames || 0}</span>
                <span class="stat-label">Total Games</span>
              </div>
              <div class="stat-box">
                <span class="stat-value">{stats?.last30DaysGames || 0}</span>
                <span class="stat-label">Last 30 Days</span>
              </div>
              <div class="stat-box">
                <span class="stat-value">{stats?.last7DaysGames || 0}</span>
                <span class="stat-label">Last 7 Days</span>
              </div>
              <div class="stat-box">
                <span class="stat-value">{settings.members?.length || 0}</span>
                <span class="stat-label">Members</span>
              </div>
            </div>
          </section>

          {/* Game Types */}
          <section class="insight-card">
            <h3>Game Types</h3>
            <div class="game-types">
              <div class="game-type-row">
                <span class="game-type-label">Doubles</span>
                <ProgressBar value={stats?.doublesGames || 0} max={stats?.totalGames || 1} color="#2c6e49" />
                <span class="game-type-count">{stats?.doublesGames || 0}</span>
              </div>
              <div class="game-type-row">
                <span class="game-type-label">Singles</span>
                <ProgressBar value={stats?.singlesGames || 0} max={stats?.totalGames || 1} color="#2196F3" />
                <span class="game-type-count">{stats?.singlesGames || 0}</span>
              </div>
              {(stats?.rotationGames || 0) > 0 && (
                <div class="game-type-row">
                  <span class="game-type-label">Rotation</span>
                  <ProgressBar value={stats?.rotationGames || 0} max={stats?.totalGames || 1} color="#FF9800" />
                  <span class="game-type-count">{stats?.rotationGames || 0}</span>
                </div>
              )}
            </div>
          </section>

          {/* Activity by Day */}
          <section class="insight-card">
            <h3>Activity by Day</h3>
            <div class="day-chart">
              {dayNames.map((day, idx) => {
                const count = stats?.dayOfWeekCounts?.[idx] || 0;
                const height = maxDayCount > 0 ? (count / maxDayCount) * 50 : 0;
                const isMax = count === maxDayCount && count > 0;
                return (
                  <div key={day} class="day-bar-container">
                    <div
                      class={`day-bar ${isMax ? 'day-bar-max' : ''}`}
                      style={{ height: `${Math.max(height, 4)}px` }}
                    />
                    <span class="day-label">{day}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Players */}
          {allPlayers.length > 0 && (
            <section class="insight-card">
              <div class="insight-header">
                <h3>Players ({allPlayers.length})</h3>
              </div>
              <div class={`top-players ${showAllPlayers ? 'expanded' : ''}`}>
                {displayedPlayers.map((player, idx) => (
                  <div key={player.name} class={`player-row ${idx < 3 ? 'player-top3' : ''}`}>
                    <span class={`player-rank rank-${idx + 1}`}>{idx + 1}</span>
                    <div class="player-info">
                      <span class="player-name">{player.name}</span>
                      <span class="player-details">
                        {player.checkins} check-ins
                        {player.doublesGames > 0 && ` · ${player.doublesGames}D`}
                        {player.singlesGames > 0 && ` · ${player.singlesGames}S`}
                        {player.lastActive && ` · ${formatLastActivity(player.lastActive)}`}
                      </span>
                    </div>
                    <span class="player-games">{player.gamesPlayed}</span>
                  </div>
                ))}
              </div>
              {hasMorePlayers && (
                <button
                  class="view-all-btn"
                  onClick={() => setShowAllPlayers(!showAllPlayers)}
                >
                  {showAllPlayers ? 'Show Less' : `View All ${allPlayers.length} Players`}
                </button>
              )}
            </section>
          )}

          {/* Group Info */}
          <section class="insight-card">
            <h3>Group Info</h3>
            <div class="info-rows">
              {locationNames.length > 0 && (
                <div class="info-row">
                  <span class="info-label">Location</span>
                  <span class="info-value">{locationNames.join(', ')}</span>
                </div>
              )}
              {settings.level && (
                <div class="info-row">
                  <span class="info-label">Level</span>
                  <span class="info-value">{settings.level}</span>
                </div>
              )}
              {settings.format && (
                <div class="info-row">
                  <span class="info-label">Format</span>
                  <span class="info-value" style={{ textTransform: 'capitalize' }}>{settings.format}</span>
                </div>
              )}
              <div class="info-row">
                <span class="info-label">Active Days</span>
                <span class="info-value">{stats?.activeDays || 0}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Total Check-ins</span>
                <span class="info-value">{stats?.totalCheckins || 0}</span>
              </div>
              <div class="info-row">
                <span class="info-label">First Activity</span>
                <span class="info-value">{formatDate(stats?.firstActivity || null)}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Last Activity</span>
                <span class="info-value">{formatDate(stats?.lastActivity || null)}</span>
              </div>
            </div>
          </section>

          <div class="drawer-actions">
            <button class="primary-btn" onClick={handleOpenGroup}>
              Open Group →
            </button>
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

// Accept invite form
function AcceptInviteForm({
  orgId,
  invite,
  onSuccess,
}: {
  orgId: string;
  invite: OrgInvite;
  onSuccess: () => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const org = currentOrg.value;
  const locationNames = invite.locations
    ? invite.locations.map(id => org?.locations[id]?.name || id).join(', ')
    : 'All locations';

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const db = getDatabase();
      const token = getDeviceToken();

      if (!token) {
        setError('Unable to register device. Please try again.');
        return;
      }

      // Mark invite as used
      await db.ref(firebasePaths.organizationInvite(orgId, invite.code)).update({
        usedAt: Date.now(),
        usedBy: token,
        usedByName: name,
      });

      // Add new admin to organization
      const orgSnapshot = await db.ref(firebasePaths.organization(orgId)).once('value');
      const orgData = orgSnapshot.val() as { admins?: OrgAdmin[] } | null;
      if (!orgData) {
        setError('Organization not found');
        return;
      }

      const newAdmin: OrgAdmin = {
        id: token,
        name,
        email,
        scope: invite.scope,
        addedAt: Date.now(),
        addedBy: invite.createdBy,
      };
      // Only add optional fields if they have values (Firebase doesn't accept undefined)
      if (phone) {
        newAdmin.phone = phone;
      }
      if (invite.locations && invite.locations.length > 0) {
        newAdmin.locations = invite.locations;
      }

      const existingAdmins = orgData.admins || [];
      await db.ref(firebasePaths.organizationAdmins(orgId)).set([...existingAdmins, newAdmin]);

      // Update admin index for fast permission lookup
      const indexSnapshot = await db.ref(firebasePaths.adminIndex(token)).once('value');
      const existingIndex = (indexSnapshot.val() as AdminIndex) || {};
      const newIndex: AdminIndex = { ...existingIndex };

      if (invite.scope === 'org') {
        newIndex.orgAdmin = [...(newIndex.orgAdmin || []), orgId];
      } else if (invite.scope === 'locations' && invite.locations) {
        newIndex.locationAdmin = {
          ...(newIndex.locationAdmin || {}),
          [orgId]: invite.locations,
        };
      }

      await db.ref(firebasePaths.adminIndex(token)).set(newIndex);

      onSuccess();
    } catch (err) {
      console.error('Accept invite error:', err);
      setError('Failed to accept invite. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div class="club-dashboard invite-accept">
      <div class="invite-card">
        <h2>Join {org?.name || 'Organization'}</h2>
        <p>You've been invited by {invite.createdByName}</p>

        <div class="invite-details">
          <div class="detail-row">
            <span class="label">Access Level:</span>
            <span class="value">{invite.scope === 'org' ? 'Organization Admin' : 'Location Admin'}</span>
          </div>
          {invite.scope === 'locations' && (
            <div class="detail-row">
              <span class="label">Locations:</span>
              <span class="value">{locationNames}</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <label>Your Name *</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onInput={(e) => setName((e.target as HTMLInputElement).value)}
              disabled={isSubmitting}
              required
            />
          </div>

          <div class="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
              disabled={isSubmitting}
              required
            />
          </div>

          <div class="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone (optional)"
              value={phone}
              onInput={(e) => setPhone((e.target as HTMLInputElement).value)}
              disabled={isSubmitting}
            />
          </div>

          {error && <p class="error-message">{error}</p>}

          <button type="submit" disabled={isSubmitting || !name || !email}>
            {isSubmitting ? 'Joining...' : 'Accept Invite'}
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

// Generate random invite code
function generateInviteCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No I, O, 0, 1 for clarity
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Invite Staff Modal
function InviteStaffModal({ orgId, org }: { orgId: string; org: { name: string; locations?: Record<string, { name: string }> } }) {
  const [scope, setScope] = useState<'org' | 'locations'>('org');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [createdInvite, setCreatedInvite] = useState<{ code: string; url: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const locations = Object.entries(org?.locations || {});

  const handleClose = () => {
    showInviteModal.value = false;
    setCreatedInvite(null);
    setCopied(false);
  };

  const handleLocationToggle = (locId: string) => {
    if (selectedLocations.includes(locId)) {
      setSelectedLocations(selectedLocations.filter(l => l !== locId));
    } else {
      setSelectedLocations([...selectedLocations, locId]);
    }
  };

  const handleCreateInvite = async () => {
    if (scope === 'locations' && selectedLocations.length === 0) {
      return;
    }

    setIsCreating(true);

    try {
      const db = getDatabase();
      const token = getDeviceToken();

      // Get current admin name from org
      const orgData = currentOrg.value;
      const currentAdmin = orgData?.admins?.find(a => a.id === token);
      const creatorName = currentAdmin?.name || 'Admin';

      const code = generateInviteCode();

      const inviteData = {
        scope,
        locations: scope === 'locations' ? selectedLocations : null,
        createdAt: Date.now(),
        createdBy: token || '',
        createdByName: creatorName,
        expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
      };

      await db.ref(firebasePaths.organizationInvite(orgId, code)).set(inviteData);

      const inviteUrl = `${window.location.origin}/#clubs/${orgId}/invite/${code}`;
      setCreatedInvite({ code, url: inviteUrl });

      // Refresh invites list
      const snapshot = await db.ref(firebasePaths.organizationInvites(orgId)).once('value');
      const data = snapshot.val() as Record<string, Omit<OrgInvite, 'code'>> | null;
      const loadedInvites = data
        ? Object.entries(data).map(([c, invite]) => ({ code: c, ...invite }))
        : [];
      invites.value = loadedInvites;
    } catch (error) {
      console.error('Failed to create invite:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleCopyLink = () => {
    if (createdInvite) {
      navigator.clipboard.writeText(createdInvite.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDeleteInvite = async (code: string) => {
    const db = getDatabase();
    await db.ref(firebasePaths.organizationInvite(orgId, code)).remove();
    invites.value = invites.value.filter(i => i.code !== code);
  };

  // Show created invite success view
  if (createdInvite) {
    return (
      <div class="modal-overlay" onClick={handleClose}>
        <div class="modal invite-success" onClick={(e) => e.stopPropagation()}>
          <div class="modal-header">
            <h2>Invite Created</h2>
            <button class="close-btn" onClick={handleClose}>&times;</button>
          </div>
          <div class="modal-content" style={{ textAlign: 'center' }}>
            <div class="success-icon">✓</div>
            <p>Share this link with your team member:</p>
            <div class="invite-url-box">
              <code>{createdInvite.url}</code>
              <button class="copy-btn" onClick={handleCopyLink}>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p style={{ color: '#666', fontSize: '0.85rem' }}>This invite expires in 7 days and can only be used once.</p>
            <button class="primary-btn" onClick={handleClose} style={{ marginTop: '1rem' }}>Done</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div class="modal-overlay" onClick={handleClose}>
      <div class="modal" onClick={(e) => e.stopPropagation()}>
        <div class="modal-header">
          <h2>Invite Staff</h2>
          <button class="close-btn" onClick={handleClose}>&times;</button>
        </div>
        <div class="modal-content">
          <section>
            <h3>Access Level</h3>
            <div class="scope-options">
              <label class={`scope-option ${scope === 'org' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="scope"
                  value="org"
                  checked={scope === 'org'}
                  onChange={() => setScope('org')}
                />
                <div class="option-content">
                  <strong>Organization Admin</strong>
                  <span>Full access to all locations and groups</span>
                </div>
              </label>
              <label class={`scope-option ${scope === 'locations' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="scope"
                  value="locations"
                  checked={scope === 'locations'}
                  onChange={() => setScope('locations')}
                />
                <div class="option-content">
                  <strong>Location Admin</strong>
                  <span>Access to specific locations only</span>
                </div>
              </label>
            </div>
          </section>

          {scope === 'locations' && (
            <section>
              <h3>Select Locations</h3>
              <div class="location-checkboxes">
                {locations.map(([id, loc]) => (
                  <label key={id} class="location-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedLocations.includes(id)}
                      onChange={() => handleLocationToggle(id)}
                    />
                    <span>{loc.name}</span>
                  </label>
                ))}
              </div>
            </section>
          )}

          <button
            class="primary-btn"
            onClick={handleCreateInvite}
            disabled={isCreating || (scope === 'locations' && selectedLocations.length === 0)}
          >
            {isCreating ? 'Creating...' : 'Create Invite Link'}
          </button>

          {invites.value.length > 0 && (
            <section class="existing-invites">
              <h3>Pending Invites</h3>
              <ul class="invites-list">
                {invites.value.filter(i => !i.usedAt && i.expiresAt > Date.now()).map(invite => (
                  <li key={invite.code}>
                    <div class="invite-info">
                      <code>{invite.code}</code>
                      <span class="invite-scope">
                        {invite.scope === 'org' ? 'Org Admin' : `${invite.locations?.length || 0} locations`}
                      </span>
                    </div>
                    <button class="delete-btn" onClick={() => handleDeleteInvite(invite.code)}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
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
    background: var(--header-color, #12365a);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .header-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .header-logo {
    width: 40px;
    height: 40px;
    object-fit: contain;
    background: white;
    border-radius: 10px;
    padding: 6px;
    flex-shrink: 0;
  }

  .header-logo-placeholder {
    width: 40px;
    height: 40px;
    background: rgba(255,255,255,0.15);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 18px;
    flex-shrink: 0;
  }

  .header-spacer {
    flex: 1;
  }

  .header-avatar {
    width: 36px;
    height: 36px;
    background: rgba(255,255,255,0.2);
    border: 2px solid rgba(255,255,255,0.3);
    border-radius: 50%;
    color: white;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.15s ease;
  }

  .header-avatar:hover {
    background: rgba(255,255,255,0.3);
    transform: scale(1.05);
  }

  /* Menu Overlay */
  .menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 199;
  }

  /* Dropdown Menu */
  .header-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 16px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05);
    min-width: 240px;
    z-index: 200;
    overflow: hidden;
    animation: dropdownSlide 0.15s ease-out;
  }

  @keyframes dropdownSlide {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .dropdown-user {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
  }

  .dropdown-avatar {
    width: 44px;
    height: 44px;
    background: var(--header-color, #12365a);
    border-radius: 50%;
    color: white;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .dropdown-info {
    flex: 1;
    min-width: 0;
  }

  .dropdown-name {
    display: block;
    font-size: 15px;
    font-weight: 600;
    color: #1a1a1a;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .dropdown-role {
    display: block;
    font-size: 13px;
    color: #666;
    margin-top: 2px;
  }

  .dropdown-divider {
    height: 1px;
    background: #eee;
    margin: 0 16px;
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 14px 16px;
    border: none;
    background: none;
    font-size: 15px;
    color: #333;
    cursor: pointer;
    text-align: left;
    transition: background 0.1s;
  }

  .dropdown-item:hover {
    background: #f5f5f5;
  }

  .dropdown-icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #666;
  }

  .dropdown-logout {
    color: #c0392b;
  }

  .dropdown-logout .dropdown-icon {
    color: #c0392b;
  }

  /* Desktop enhancements */
  @media (min-width: 768px) {
    .header-bar {
      padding: 14px 24px;
    }

    .header-logo {
      width: 48px;
      height: 48px;
      padding: 8px;
    }

    .header-logo-placeholder {
      width: 48px;
      height: 48px;
      font-size: 20px;
    }

    .header-avatar {
      width: 40px;
      height: 40px;
      font-size: 16px;
    }

    .header-dropdown {
      right: 24px;
    }
  }

  /* Hero Stats */
  .hero-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
  }

  .hero-stat {
    background: white;
    padding: 20px 16px;
    text-align: center;
  }

  .hero-value {
    display: block;
    font-size: 2rem;
    font-weight: 700;
    color: #1a365d;
    line-height: 1.1;
  }

  .hero-total {
    font-size: 1rem;
    font-weight: 500;
    color: #999;
  }

  .hero-label {
    display: block;
    font-size: 0.75rem;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-top: 6px;
  }

  @media (max-width: 480px) {
    .hero-stats {
      grid-template-columns: repeat(2, 1fr);
    }

    .hero-stat {
      padding: 16px 12px;
    }

    .hero-value {
      font-size: 1.5rem;
    }

    .hero-label {
      font-size: 0.65rem;
    }
  }

  /* Filters */
  .filters-bar {
    background: white;
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-bottom: 1px solid #eee;
  }

  .filters-row {
    display: flex;
    gap: 8px;
  }

  .search-box {
    flex: 1;
    position: relative;
  }

  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
    font-size: 16px;
    pointer-events: none;
  }

  .search-box input {
    width: 100%;
    padding: 10px 12px 10px 36px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 15px;
    background: #f8f9fa;
    transition: all 0.15s;
    box-sizing: border-box;
  }

  .search-box input:focus {
    outline: none;
    border-color: #12365a;
    background: white;
  }

  .search-box input::placeholder {
    color: #999;
  }

  .filters-row select {
    padding: 10px 28px 10px 12px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 14px;
    background: white url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E") no-repeat right 10px center;
    appearance: none;
    cursor: pointer;
    color: #333;
    flex: 1;
  }

  .filters-row select:focus {
    outline: none;
    border-color: #12365a;
  }

  /* Groups list */
  .groups-list {
    padding: 16px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .groups-list.empty {
    text-align: center;
    padding: 48px 16px;
    color: #666;
  }

  .groups-list .hint {
    font-size: 14px;
    color: #999;
    margin-top: 8px;
  }

  .list-header {
    margin-bottom: 12px;
  }

  .list-header .count {
    font-size: 13px;
    color: #666;
    font-weight: 500;
  }

  .groups-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  /* Group card */
  .group-card {
    background: white;
    border-radius: 12px;
    display: flex;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.15s;
    border: 1px solid #e8e8e8;
  }

  .group-card:hover {
    border-color: #ccc;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }

  .group-card:active {
    transform: scale(0.995);
  }

  .card-accent {
    width: 5px;
    flex-shrink: 0;
  }

  .card-body {
    flex: 1;
    padding: 14px 16px;
    min-width: 0;
  }

  .card-row-1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 6px;
  }

  .card-title {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    color: #1a1a1a;
    line-height: 1.3;
    flex: 1;
    min-width: 0;
  }

  .card-sport {
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    flex-shrink: 0;
  }

  .card-row-2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 10px;
  }

  .card-location {
    font-size: 14px;
    color: #666;
    flex: 1;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card-tags {
    display: flex;
    gap: 6px;
    flex-shrink: 0;
  }

  .card-level {
    background: #e3f2fd;
    color: #1565c0;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
  }

  .card-format {
    background: #f3e5f5;
    color: #7b1fa2;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    text-transform: capitalize;
  }


  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding-top: 10px;
    border-top: 1px solid #f0f0f0;
  }

  .card-stats {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    color: #666;
    flex-wrap: wrap;
  }

  .card-stats .stat {
    white-space: nowrap;
  }

  .stat-divider {
    color: #ccc;
  }

  .card-actions {
    display: flex;
    gap: 6px;
    flex-shrink: 0;
  }

  .card-action-btn {
    width: 32px;
    height: 32px;
    border: 1px solid #e0e0e0;
    background: white;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
  }

  .card-action-btn:hover {
    background: #f5f5f5;
    border-color: #ccc;
    color: #333;
  }

  .card-action-btn:active {
    transform: scale(0.95);
  }

  /* Desktop: grid layout */
  @media (min-width: 768px) {
    .filters-bar {
      padding: 14px 24px;
    }

    .groups-list {
      padding: 20px 24px;
    }

    .groups-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: 12px;
    }

    .card-body {
      padding: 16px 20px;
    }

    .card-title {
      font-size: 17px;
    }
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
    align-items: flex-start;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e0e0e0;
    position: sticky;
    top: 0;
    background: white;
    gap: 1rem;
  }

  .drawer-title-row {
    flex: 1;
    min-width: 0;
  }

  .drawer-title-row h2 {
    font-size: 1.25rem;
    margin: 0 0 0.5rem 0;
    line-height: 1.3;
  }

  .drawer-sport-badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    flex-shrink: 0;
    color: #666;
    padding: 0.25rem;
  }

  .drawer-content {
    padding: 1.5rem;
  }

  .stats-section {
    margin-bottom: 1.5rem;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }

  .stat-box {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 12px 8px;
    text-align: center;
  }

  .stat-value {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a1a1a;
    line-height: 1.2;
  }

  .stat-label {
    display: block;
    font-size: 0.7rem;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    margin-top: 4px;
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

  /* Insight Cards */
  .insight-card {
    background: #f8f9fa;
    border-radius: 10px;
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .insight-card h3 {
    font-size: 0.8rem;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0 0 0.75rem;
  }

  /* Progress Bar */
  .progress-bar {
    flex: 1;
    height: 8px;
    background: #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  /* Game Types */
  .game-types {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .game-type-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .game-type-label {
    width: 60px;
    font-size: 0.85rem;
    color: #333;
    font-weight: 500;
  }

  .game-type-count {
    width: 36px;
    text-align: right;
    font-size: 0.9rem;
    font-weight: 600;
    color: #1a1a1a;
  }

  /* Day Chart */
  .day-chart {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 70px;
    padding-top: 10px;
  }

  .day-bar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    flex: 1;
  }

  .day-bar {
    width: 20px;
    background: #d0d0d0;
    border-radius: 3px 3px 0 0;
    transition: height 0.3s ease;
  }

  .day-bar.day-bar-max {
    background: #2c6e49;
  }

  .day-label {
    font-size: 0.7rem;
    color: #666;
    font-weight: 500;
  }

  /* Insight Header */
  .insight-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .insight-header h3 {
    margin: 0;
  }

  /* Top Players */
  .top-players {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .top-players.expanded {
    max-height: 400px;
    overflow-y: auto;
  }

  .view-all-btn {
    width: 100%;
    margin-top: 10px;
    padding: 10px;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 500;
    color: #1a365d;
    cursor: pointer;
    transition: all 0.15s;
  }

  .view-all-btn:hover {
    background: #f5f7fa;
    border-color: #ccc;
  }

  .player-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    background: white;
    border-radius: 6px;
  }

  .player-row.player-top3 {
    background: #fff8e1;
  }

  .player-rank {
    width: 22px;
    height: 22px;
    background: #e0e0e0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 600;
    color: #666;
    flex-shrink: 0;
  }

  .player-row.player-top3 .player-rank {
    background: #ffc107;
    color: #1a1a1a;
  }

  .player-rank.rank-1 {
    background: #ffd700;
  }

  .player-rank.rank-2 {
    background: #c0c0c0;
  }

  .player-rank.rank-3 {
    background: #cd7f32;
    color: white;
  }

  .player-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .player-name {
    font-size: 0.9rem;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .player-details {
    font-size: 0.75rem;
    color: #888;
  }

  .player-games {
    font-size: 0.95rem;
    font-weight: 700;
    color: #1a365d;
    flex-shrink: 0;
  }

  /* Info Rows */
  .info-rows {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #e8e8e8;
  }

  .info-row:last-child {
    border-bottom: none;
  }

  .info-label {
    font-size: 0.85rem;
    color: #666;
  }

  .info-value {
    font-size: 0.9rem;
    color: #1a1a1a;
    font-weight: 500;
    text-align: right;
  }

  /* Setup, Access Denied, and Invite Accept */
  .club-dashboard.invite-accept {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .setup-card,
  .denied-card,
  .invite-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    max-width: 400px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  .setup-card h2,
  .denied-card h2,
  .invite-card h2 {
    margin: 0 0 0.5rem;
    color: #1a365d;
  }

  .setup-card p,
  .denied-card p,
  .invite-card p {
    color: #666;
    margin-bottom: 1rem;
  }

  .invite-details {
    background: #f5f7fa;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1.5rem;
    text-align: left;
  }

  .detail-row {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
  }

  .detail-row:not(:last-child) {
    border-bottom: 1px solid #e0e0e0;
  }

  .detail-row .label {
    color: #666;
    font-size: 0.9rem;
  }

  .detail-row .value {
    font-weight: 500;
    color: #333;
    font-size: 0.9rem;
  }

  .form-group {
    margin-bottom: 1rem;
    text-align: left;
  }

  .form-group label {
    display: block;
    font-size: 0.85rem;
    font-weight: 500;
    color: #333;
    margin-bottom: 0.5rem;
  }

  .form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    box-sizing: border-box;
  }

  .form-group input:focus {
    outline: none;
    border-color: #1a365d;
  }

  .invite-card form button {
    width: 100%;
    padding: 0.75rem;
    background: #1a365d;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    margin-top: 0.5rem;
  }

  .invite-card form button:hover:not(:disabled) {
    background: #2d4a7c;
  }

  .invite-card form button:disabled {
    background: #ccc;
    cursor: not-allowed;
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

  /* Modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  .modal {
    background: white;
    border-radius: 12px;
    max-width: 480px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    animation: fadeIn 0.2s ease-out;
  }

  .modal.invite-success .modal-content {
    text-align: center;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e0e0e0;
  }

  .modal-header h2 {
    font-size: 1.25rem;
    margin: 0;
  }

  .modal-content {
    padding: 1.5rem;
  }

  .modal-content section {
    margin-bottom: 1.5rem;
  }

  .modal-content h3 {
    font-size: 0.85rem;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0 0 0.75rem;
  }

  /* Invite Modal Specific */
  .success-icon {
    width: 60px;
    height: 60px;
    background: #e8f5e9;
    color: #2e7d32;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    margin: 0 auto 1rem;
  }

  .invite-url-box {
    background: #f5f7fa;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .invite-url-box code {
    flex: 1;
    font-size: 0.75rem;
    word-break: break-all;
    color: #333;
  }

  .copy-btn {
    background: #1a365d;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.85rem;
    cursor: pointer;
    white-space: nowrap;
  }

  .copy-btn:hover {
    background: #2d4a7c;
  }

  .scope-options {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .scope-option {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .scope-option:hover {
    border-color: #1a365d;
  }

  .scope-option.selected {
    border-color: #1a365d;
    background: #f5f7fa;
  }

  .scope-option input {
    margin-top: 2px;
  }

  .scope-option .option-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .scope-option strong {
    font-size: 0.95rem;
  }

  .scope-option span {
    font-size: 0.85rem;
    color: #666;
  }

  .location-checkboxes {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .location-checkbox {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    cursor: pointer;
  }

  .location-checkbox:hover {
    background: #f5f7fa;
    border-radius: 4px;
  }

  .existing-invites {
    border-top: 1px solid #e0e0e0;
    padding-top: 1rem;
  }

  .invites-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .invites-list li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem;
    background: #f5f7fa;
    border-radius: 6px;
    margin-bottom: 0.5rem;
  }

  .invite-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .invite-info code {
    font-family: monospace;
    font-size: 0.9rem;
    background: white;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    border: 1px solid #e0e0e0;
  }

  .invite-scope {
    font-size: 0.8rem;
    color: #666;
  }

  .delete-btn {
    background: none;
    border: none;
    color: #d32f2f;
    font-size: 0.85rem;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
  }

  .delete-btn:hover {
    text-decoration: underline;
  }

  .primary-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  /* Responsive */
  @media (max-width: 600px) {
    .card-title {
      font-size: 15px;
    }

    .card-row-2 {
      margin-bottom: 8px;
    }

    .card-footer {
      flex-wrap: wrap;
      gap: 8px;
    }

    .card-stats {
      width: 100%;
    }

    .drawer {
      max-width: 100%;
    }
  }
`;

export default ClubDashboard;
