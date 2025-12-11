import { signal } from '@preact/signals';
import { Modal } from '../ui/Modal';
import { currentGroupId, coreMembers, memberDetails, showToast } from '../App';
import { removeMember, renameMember } from '../../hooks/useFirebase';
import { getDatabase } from '../../config/firebase';
import { showInvitePrompt } from './InvitePromptModal';

// Export for use in ProfileTab
export const showMemberModal = signal(false);

// Local form state
const newMemberInput = signal('');
const editingMember = signal<string | null>(null);
const editMemberName = signal('');
const editMemberPhone = signal('');
const editMemberEmail = signal('');
const editMemberNotes = signal('');
const searchQuery = signal('');

async function addCoreMember() {
  const name = newMemberInput.value.trim();
  if (!name) return;

  const groupId = currentGroupId.value;
  if (!groupId) return;

  if (coreMembers.value.includes(name)) {
    showToast('Member already exists', 'error');
    return;
  }

  try {
    const db = getDatabase();
    const settingsRef = db.ref(`groups/${groupId}/settings`);

    const newMembers = [...coreMembers.value, name].sort();
    await settingsRef.update({ members: newMembers });

    coreMembers.value = newMembers;
    newMemberInput.value = '';
    showToast(`${name} added`, 'success');
  } catch (error) {
    console.error('Error adding member:', error);
    showToast('Failed to add member', 'error');
  }
}

function handleRemoveMember(name: string) {
  if (confirm(`Remove ${name} from the group?`)) {
    removeMember(name);
  }
}

function openEditMember(name: string) {
  editingMember.value = name;
  editMemberName.value = name;
  const details = memberDetails.value[name] as { phone?: string; email?: string; notes?: string } || {};
  editMemberPhone.value = details.phone || '';
  editMemberEmail.value = details.email || '';
  editMemberNotes.value = details.notes || '';
}

async function saveEditMember() {
  const originalName = editingMember.value;
  if (!originalName) return;

  const groupId = currentGroupId.value;
  if (!groupId) return;

  const newName = editMemberName.value.trim();

  try {
    // Handle name change first if needed
    if (newName !== originalName) {
      const renamed = await renameMember(originalName, newName);
      if (!renamed) {
        return; // Error already shown by renameMember
      }
    }

    // Update member details (use new name if renamed)
    const targetName = newName !== originalName ? newName : originalName;
    const db = getDatabase();
    const detailsRef = db.ref(`groups/${groupId}/settings/memberDetails/${targetName}`);

    await detailsRef.update({
      phone: editMemberPhone.value,
      email: editMemberEmail.value,
      notes: editMemberNotes.value,
    });

    memberDetails.value = {
      ...memberDetails.value,
      [targetName]: {
        ...(memberDetails.value[targetName] as Record<string, unknown> || {}),
        phone: editMemberPhone.value,
        email: editMemberEmail.value,
        notes: editMemberNotes.value,
      },
    };

    editingMember.value = null;
    if (newName === originalName) {
      showToast('Member updated', 'success');
    }
    // If renamed, the toast is already shown by renameMember
  } catch (error) {
    console.error('Error updating member:', error);
    showToast('Failed to update member', 'error');
  }
}

function handleClose() {
  showMemberModal.value = false;
  editingMember.value = null;
  searchQuery.value = '';
}

export function MemberManagementModal() {
  // Filter members by search query
  const filteredMembers = coreMembers.value
    .filter(name => name.toLowerCase().includes(searchQuery.value.toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

  return (
    <Modal
      isOpen={showMemberModal.value}
      onClose={handleClose}
      title="Manage Members"
      subtitle={`${coreMembers.value.length} members in group`}
    >
      {/* Edit Member Sub-Modal */}
      {editingMember.value && (
        <div style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1001;">
          <div style="background: white; padding: 24px; border-radius: 12px; max-width: 400px; width: 90%;">
            <h3 style="margin-top: 0;">Edit Member</h3>

            <div style="margin-bottom: 12px;">
              <label style="font-size: 12px; color: #666; display: block; margin-bottom: 4px;">Name</label>
              <input
                type="text"
                placeholder="Member name"
                value={editMemberName.value}
                onInput={(e) => { editMemberName.value = (e.target as HTMLInputElement).value; }}
                style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; box-sizing: border-box;"
              />
            </div>

            <div style="margin-bottom: 12px;">
              <label style="font-size: 12px; color: #666; display: block; margin-bottom: 4px;">Phone</label>
              <input
                type="tel"
                placeholder="Phone number"
                value={editMemberPhone.value}
                onInput={(e) => { editMemberPhone.value = (e.target as HTMLInputElement).value; }}
                style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; box-sizing: border-box;"
              />
            </div>

            <div style="margin-bottom: 12px;">
              <label style="font-size: 12px; color: #666; display: block; margin-bottom: 4px;">Email</label>
              <input
                type="email"
                placeholder="Email address"
                value={editMemberEmail.value}
                onInput={(e) => { editMemberEmail.value = (e.target as HTMLInputElement).value; }}
                style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; box-sizing: border-box;"
              />
            </div>

            <div style="margin-bottom: 16px;">
              <label style="font-size: 12px; color: #666; display: block; margin-bottom: 4px;">Notes</label>
              <textarea
                placeholder="Notes (skill level, etc.)"
                rows={2}
                value={editMemberNotes.value}
                onInput={(e) => { editMemberNotes.value = (e.target as HTMLTextAreaElement).value; }}
                style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; resize: vertical; box-sizing: border-box;"
              />
            </div>

            <div style="display: flex; gap: 8px;">
              <button onClick={() => { editingMember.value = null; }} style="flex: 1; background: #ccc; color: #333;">
                Cancel
              </button>
              <button onClick={saveEditMember} style="flex: 1; background: #4CAF50; color: white;">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div style="margin-bottom: 16px;">
        <div style="position: relative;">
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="#999"
            style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%);"
          >
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input
            type="text"
            placeholder="Search members..."
            value={searchQuery.value}
            onInput={(e) => { searchQuery.value = (e.target as HTMLInputElement).value; }}
            style="width: 100%; padding: 12px 12px 12px 40px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; box-sizing: border-box;"
          />
          {searchQuery.value && (
            <button
              onClick={() => { searchQuery.value = ''; }}
              style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; padding: 0;"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#999">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Member List */}
      <div style="max-height: 400px; overflow-y: auto; margin-bottom: 16px;">
        {filteredMembers.length === 0 ? (
          <div style="text-align: center; padding: 20px; color: #888;">
            {searchQuery.value ? 'No members found' : 'No members yet'}
          </div>
        ) : (
          filteredMembers.map((name) => {
            const details = memberDetails.value[name] as { phone?: string; email?: string; notes?: string; addedBy?: string; addedDate?: number } | undefined;
            const hasDetails = details && (details.phone || details.email || details.addedBy);
            const hasContact = details && (details.phone || details.email);
            const addedDate = details?.addedDate
              ? new Date(details.addedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
              : null;

            return (
              <div key={name} style="flex-direction: column; align-items: flex-start; padding: 12px; background: #f9f9f9; border-radius: 8px; margin-bottom: 8px;">
                <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
                  <span style="font-weight: 500;">{name}</span>
                  <div style="display: flex; gap: 4px;">
                    <button
                      onClick={() => openEditMember(name)}
                      style={{
                        background: 'rgba(76, 175, 80, 0.1)',
                        color: '#4CAF50',
                        border: 'none',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0',
                      }}
                      title="Edit"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                      </svg>
                    </button>
                    {hasContact && (
                      <button
                        onClick={() => showInvitePrompt(name, details?.phone, details?.email)}
                        style={{
                          background: 'rgba(33, 150, 243, 0.1)',
                          color: '#2196F3',
                          border: 'none',
                          borderRadius: '50%',
                          width: '32px',
                          height: '32px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '0',
                        }}
                        title="Invite"
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                      </button>
                    )}
                    <button
                      onClick={() => handleRemoveMember(name)}
                      style={{
                        background: 'rgba(255, 82, 82, 0.1)',
                        color: '#e57373',
                        border: 'none',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0',
                      }}
                      title="Remove"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                      </svg>
                    </button>
                  </div>
                </div>
                {hasDetails && (
                  <div style="font-size: 12px; color: #666; margin-top: 8px; padding-left: 12px; border-left: 3px solid #4CAF50;">
                    {details.addedBy && (
                      <div>Added by: <strong>{details.addedBy}</strong>{addedDate && ` on ${addedDate}`}</div>
                    )}
                    {details.phone && <div>📱 {details.phone}</div>}
                    {details.email && <div>📧 {details.email}</div>}
                    {details.notes && <div>Notes: {details.notes}</div>}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Add Member Input */}
      <div style="display: flex; gap: 8px; padding-top: 12px; border-top: 1px solid #e0e0e0;">
        <input
          type="text"
          placeholder="New member name"
          value={newMemberInput.value}
          onInput={(e) => { newMemberInput.value = (e.target as HTMLInputElement).value; }}
          onKeyPress={(e) => { if (e.key === 'Enter') addCoreMember(); }}
          style="flex: 1; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px;"
        />
        <button
          onClick={addCoreMember}
          style="padding: 12px 24px; background: #4CAF50; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500;"
        >
          Add
        </button>
      </div>
    </Modal>
  );
}
