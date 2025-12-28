/**
 * DetailsDrawer - Side drawer for group details and member management
 */
import {
  detailsDrawerGroup,
  groups,
  newMemberName,
  addingMember,
  editingMemberInfo,
  editMemberNewName,
  closeDetails,
  startEditMember,
  cancelEditMember,
  getSportBadge,
} from './adminState';
import { addMemberToGroup, removeMemberFromGroup, saveEditMember } from './adminActions';

export function DetailsDrawer() {
  const groupId = detailsDrawerGroup.value;
  if (!groupId) return null;

  const group = groups.value[groupId];
  if (!group) return null;

  return (
    <div class="details-drawer-overlay" onClick={closeDetails}>
      <div class="details-drawer" onClick={(e) => e.stopPropagation()}>
        <div class="drawer-header">
          <h2>{group.settings?.groupName || 'Group Details'}</h2>
          <button class="drawer-close" onClick={closeDetails}>
            ×
          </button>
        </div>

        <div class="drawer-content">
          {/* Group Info Section */}
          <div class="drawer-section">
            <h3>Group Info</h3>
            <div class="detail-row">
              <span class="detail-label">Members:</span>
              <span class="detail-value">{group.settings?.members?.length || 0}</span>
            </div>
            {group.settings?.location?.name && (
              <div class="detail-row">
                <span class="detail-label">Location:</span>
                <span class="detail-value">{group.settings.location.name}</span>
              </div>
            )}
            {group.metadata?.shortCode && (
              <div class="detail-row">
                <span class="detail-label">Short Code:</span>
                <span class="detail-value code">{group.metadata.shortCode}</span>
              </div>
            )}
            {group.metadata?.archetype && (
              <div class="detail-row">
                <span class="detail-label">Type:</span>
                <span class="detail-value">{group.metadata.archetype}</span>
              </div>
            )}
            <div class="detail-row">
              <span class="detail-label">Sport:</span>
              <span class="detail-value" style={{ textTransform: 'capitalize' }}>
                {getSportBadge(group.settings?.sportType).emoji}{' '}
                {group.settings?.sportType || 'tennis'}
              </span>
            </div>
          </div>

          {/* Creator Section */}
          {group.metadata?.creator && (
            <div class="drawer-section">
              <h3>Creator</h3>
              <div class="detail-row">
                <span class="detail-label">Name:</span>
                <span class="detail-value">{group.metadata.creator.name}</span>
              </div>
              {group.metadata.creator.email && (
                <div class="detail-row">
                  <span class="detail-label">Email:</span>
                  <a href={`mailto:${group.metadata.creator.email}`} class="detail-link">
                    {group.metadata.creator.email}
                  </a>
                </div>
              )}
              {group.metadata.creator.phone && (
                <div class="detail-row">
                  <span class="detail-label">Phone:</span>
                  <a href={`tel:${group.metadata.creator.phone}`} class="detail-link">
                    {group.metadata.creator.phone}
                  </a>
                </div>
              )}
              {group.metadata.createdAt && (
                <div class="detail-row">
                  <span class="detail-label">Created:</span>
                  <span class="detail-value">
                    {new Date(group.metadata.createdAt).toLocaleDateString('en-US', {
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
              <span class="detail-value code">{group.settings?.groupPin || 'Not set'}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Admin PIN:</span>
              <span class="detail-value code">{group.settings?.adminPin || 'Not set'}</span>
            </div>
          </div>

          {/* Members Section */}
          <div class="drawer-section">
            <h3>Members ({group.settings?.members?.length || 0})</h3>

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
              {(group.settings?.members || []).length === 0 ? (
                <p class="no-members">No members yet.</p>
              ) : (
                (group.settings?.members || []).map((member: string) => {
                  const isEditing =
                    editingMemberInfo.value?.groupId === groupId &&
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
                                cancelEditMember();
                              }
                            }}
                            class="edit-member-input"
                            autoFocus
                          />
                          <button onClick={saveEditMember} class="save-member-btn" title="Save">
                            ✓
                          </button>
                          <button onClick={cancelEditMember} class="cancel-edit-btn" title="Cancel">
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

          {/* Technical Info */}
          <div class="drawer-section technical">
            <h3>Technical</h3>
            <div class="detail-row">
              <span class="detail-label">Group ID:</span>
              <span class="detail-value code small">{groupId}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
