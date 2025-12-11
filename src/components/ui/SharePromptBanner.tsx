import { useEffect } from 'preact/hooks';
import { showToast } from '../App';
import { showSharePrompt, sharePromptData } from '../pages/MainApp';
import {
  formatCheckinForWhatsApp,
  formatRemovalForWhatsApp,
  buildWhatsAppUrl,
  copyToClipboard,
} from '../../utils/sharing';

export function SharePromptBanner() {
  // Auto-dismiss after 8 seconds
  useEffect(() => {
    if (showSharePrompt.value) {
      const timer = setTimeout(() => {
        showSharePrompt.value = false;
        sharePromptData.value = null;
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [showSharePrompt.value]);

  if (!showSharePrompt.value || !sharePromptData.value) {
    return null;
  }

  const data = sharePromptData.value;
  const isRemoval = data.action === 'removal';

  const getMessage = () => {
    if (isRemoval) {
      return formatRemovalForWhatsApp(data.name, data.date);
    }
    return formatCheckinForWhatsApp(data.name, data.date, {
      playStyle: (data.playStyle as 'singles' | 'doubles' | 'both') || 'both',
      timeRange: data.timeRange,
    });
  };

  const handleWhatsAppShare = () => {
    const message = getMessage();
    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank');

    // Dismiss banner
    showSharePrompt.value = false;
    sharePromptData.value = null;
  };

  const handleCopy = async () => {
    const message = getMessage();
    const success = await copyToClipboard(message);
    if (success) {
      showToast('Copied to clipboard', 'success');
    } else {
      showToast('Failed to copy', 'error');
    }

    // Dismiss banner
    showSharePrompt.value = false;
    sharePromptData.value = null;
  };

  const handleDismiss = () => {
    showSharePrompt.value = false;
    sharePromptData.value = null;
  };

  // Different styling for check-in vs removal
  const bgColor = isRemoval ? '#FFF3E0' : '#E8F5E9';
  const textColor = isRemoval ? '#E65100' : '#2E7D32';
  const titleText = isRemoval ? 'Removed!' : 'Checked in!';
  const promptText = isRemoval ? 'Let others know?' : 'Share with the group?';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '70px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 24px)',
        maxWidth: '456px',
        background: bgColor,
        borderRadius: '12px',
        padding: '12px 16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: 1000,
        animation: 'slideUp 0.3s ease-out',
      }}
    >
      <div style={{ flex: 1, fontSize: '14px', color: textColor }}>
        <strong>{titleText}</strong> {promptText}
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={handleWhatsAppShare}
          style={{
            background: '#25D366',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 12px',
            fontSize: '13px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </button>
        <button
          onClick={handleCopy}
          style={{
            background: '#f5f5f5',
            color: '#333',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '8px 12px',
            fontSize: '13px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="#666">
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
          </svg>
          Copy
        </button>
        <button
          onClick={handleDismiss}
          style={{
            background: 'transparent',
            border: 'none',
            padding: '4px',
            cursor: 'pointer',
            color: '#666',
            fontSize: '18px',
            lineHeight: 1,
          }}
          title="Dismiss"
        >
          &times;
        </button>
      </div>
      <style>{`
        @keyframes slideUp {
          from {
            transform: translate(-50%, 100%);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
