import { signal } from '@preact/signals';
import { Modal } from '../ui/Modal';
import { currentGroupId, currentGroupName, showToast } from '../App';
import { groupSettings } from '../../hooks/useFirebase';

// Invite modal state
export const showInviteModal = signal(false);
export const inviteMemberName = signal('');
export const inviteMemberPhone = signal('');
export const inviteMemberEmail = signal('');

function getInviteMessage(memberName: string): string {
  const gName = currentGroupName.value || 'our tennis group';
  const groupId = currentGroupId.value;
  const groupUrl = window.location.href.split('?')[0] + '?group=' + groupId;
  const pin = groupSettings.value.groupPin || '';

  return `Hi ${memberName}! You've been added to ${gName} tennis coordination.

Check in for upcoming matches here:
${groupUrl}

PIN: ${pin}

Just select your name and check in when you can play!`;
}

function getSmsUrl(phone: string, message: string): string {
  // Clean phone number - remove spaces, dashes, parentheses
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  // Platform-specific SMS URL format:
  // iOS: sms:number&body=message (uses & separator)
  // Android/others: sms:number?body=message (uses ? separator)
  const userAgent = navigator.userAgent || '';
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  return isIOS
    ? `sms:${cleanPhone}&body=${encodeURIComponent(message)}`
    : `sms:${cleanPhone}?body=${encodeURIComponent(message)}`;
}

function getEmailUrl(email: string, subject: string, body: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

async function handleShare(memberName: string) {
  const inviteMessage = getInviteMessage(memberName);
  const gName = currentGroupName.value || 'Tennis Group';

  try {
    await navigator.share({
      title: `Join ${gName}`,
      text: inviteMessage,
    });
    handleClose();
    showToast('Shared successfully!', 'success');
  } catch (err) {
    if ((err as Error).name !== 'AbortError') {
      console.error('Share failed:', err);
      // Fallback to copy
      handleCopy(memberName);
    }
  }
}

async function handleCopy(memberName: string) {
  const inviteMessage = getInviteMessage(memberName);

  try {
    await navigator.clipboard.writeText(inviteMessage);
    handleClose();
    showToast('Message copied! Paste in SMS or email.', 'success');
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = inviteMessage;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    handleClose();
    showToast('Message copied! Paste in SMS or email.', 'success');
  }
}

function handleClose() {
  showInviteModal.value = false;
  inviteMemberName.value = '';
  inviteMemberPhone.value = '';
  inviteMemberEmail.value = '';
}

// Helper function to show the invite modal
export function showInvitePrompt(name: string, phone?: string, email?: string) {
  inviteMemberName.value = name;
  inviteMemberPhone.value = phone || '';
  inviteMemberEmail.value = email || '';
  showInviteModal.value = true;
}

export function InvitePromptModal() {
  const memberName = inviteMemberName.value;
  const phone = inviteMemberPhone.value;
  const email = inviteMemberEmail.value;
  const inviteMessage = getInviteMessage(memberName);
  const gName = currentGroupName.value || 'Tennis Group';

  // Check if Web Share API is available (mobile devices)
  const canShare = typeof navigator !== 'undefined' && navigator.share !== undefined;

  return (
    <Modal isOpen={showInviteModal.value} onClose={handleClose} title="" showCloseButton={false}>
      <div style={{ textAlign: 'center', padding: '10px 0' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Invite {memberName}?</h3>
        <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px' }}>
          Send them an invite with the group link and PIN
        </p>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {/* SMS button if phone provided */}
          {phone && (
            <a
              href={getSmsUrl(phone, inviteMessage)}
              onClick={() => setTimeout(handleClose, 500)}
              style={{
                background: '#25D366',
                color: 'white',
                padding: '12px 20px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
              }}
            >
              <span>📱</span> Text {phone}
            </a>
          )}

          {/* Email button if email provided */}
          {email && (
            <a
              href={getEmailUrl(email, `You're invited to ${gName}`, inviteMessage)}
              onClick={() => setTimeout(handleClose, 500)}
              style={{
                background: '#4285F4',
                color: 'white',
                padding: '12px 20px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
              }}
            >
              <span>📧</span> Email
            </a>
          )}

          {/* Share button if Web Share API is available */}
          {canShare && (
            <button
              onClick={() => handleShare(memberName)}
              style={{
                background: '#9C27B0',
                color: 'white',
                padding: '12px 20px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>📤</span> Other
            </button>
          )}

          {/* Copy button (always available) */}
          <button
            onClick={() => handleCopy(memberName)}
            style={{
              background: '#607D8B',
              color: 'white',
              padding: '12px 20px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>📋</span> Copy
          </button>
        </div>

        <button
          onClick={handleClose}
          style={{
            marginTop: '12px',
            background: 'none',
            border: 'none',
            color: '#999',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Skip
        </button>
      </div>
    </Modal>
  );
}
