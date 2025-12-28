/**
 * Firebase actions for AdminPage
 */
import { getDatabase } from '../../../config/firebase';
import { showToast } from '../../App';
import {
  isAuthenticated,
  siteAdminPin,
  loginError,
  isLoading,
  groups,
  newMemberName,
  addingMember,
  editingMemberInfo,
  editMemberNewName,
  expandedGroup,
} from './adminState';

export async function initializePage() {
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

export async function loadGroups() {
  try {
    const db = getDatabase();
    const snapshot = await db.ref('groups').once('value');
    groups.value = snapshot.val() || {};
  } catch (error) {
    console.error('Error loading groups:', error);
    showToast('Failed to load groups', 'error');
  }
}

export function handleLogin(e: Event) {
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

export function handleLogout() {
  sessionStorage.removeItem('siteAdminAuth');
  isAuthenticated.value = false;
  groups.value = {};
}

export function goToLanding() {
  window.location.hash = '';
  window.location.reload();
}

export async function addMemberToGroup(groupId: string) {
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

export async function removeMemberFromGroup(groupId: string, memberName: string) {
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

export async function archiveGroup(groupId: string, groupName: string) {
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

export async function unarchiveGroup(groupId: string, groupName: string) {
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

export async function systemDeleteGroup(groupId: string, groupName: string) {
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

export async function saveEditMember() {
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

    for (const [dateKey, dateCheckins] of Object.entries(allCheckinsData)) {
      if (dateCheckins && typeof dateCheckins === 'object') {
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

export function copyShareLink(shortCode: string) {
  const url = `${window.location.origin}/${shortCode}`;
  navigator.clipboard.writeText(url);
  showToast('Share link copied!', 'success');
}
