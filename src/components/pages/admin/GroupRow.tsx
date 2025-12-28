/**
 * GroupRow - Single group row with kebab menu
 */
import {
  activeTab,
  openMenuId,
  getSportBadge,
  toggleMenu,
  closeMenu,
  openDetails,
} from './adminState';
import {
  archiveGroup,
  unarchiveGroup,
  systemDeleteGroup,
  copyShareLink,
} from './adminActions';

interface GroupRowProps {
  groupId: string;
  group: any;
}

export function GroupRow({ groupId, group }: GroupRowProps) {
  const members = group.settings?.members || [];
  const isMenuOpen = openMenuId.value === groupId;
  const creatorName = group.metadata?.creator?.name;
  const createdAt = group.metadata?.createdAt;
  const sportBadge = getSportBadge(group.settings?.sportType);

  return (
    <div class="group-row">
      <div class="group-row-main">
        <div class="group-row-info">
          <h3 class="group-row-name">
            {group.settings?.groupName || 'Unnamed Group'}
            <span
              class="sport-badge"
              style={{
                marginLeft: '8px',
                padding: '2px 8px',
                background: sportBadge.color + '20',
                color: sportBadge.color,
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 500,
                textTransform: 'capitalize',
              }}
              title={sportBadge.sport}
            >
              {sportBadge.emoji} {sportBadge.sport}
            </span>
          </h3>
          <div class="group-row-meta">
            <span class="group-row-members">👥 {members.length}</span>
            {group.settings?.location?.name && (
              <span class="group-row-location">📍 {group.settings.location.name}</span>
            )}
          </div>
          {(creatorName || createdAt) && (
            <div class="group-row-creator">
              {createdAt && (
                <span>
                  Created{' '}
                  {new Date(createdAt).toLocaleDateString('en-US', {
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
                    onClick={() => {
                      copyShareLink(group.metadata.shortCode);
                      closeMenu();
                    }}
                  >
                    <span class="menu-icon">🔗</span>
                    Copy Share Link
                  </button>
                )}
                <button class="kebab-menu-item" onClick={() => openDetails(groupId)}>
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
}
