/**
 * SelectionModeBar - Bottom bar for multi-select sharing
 */
import {
  selectedGames,
  showShareOptions,
  exitSelectionMode,
  ScheduledMatch,
} from './myMatchesState';
import { shareSelectedGames } from './shareUtils';

interface SelectionModeBarProps {
  schedule: ScheduledMatch[];
}

export function SelectionModeBar({ schedule }: SelectionModeBarProps) {
  const selectionCount = selectedGames.value.size;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '70px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)',
        maxWidth: '400px',
        background: 'white',
        borderRadius: '16px',
        padding: '12px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        zIndex: 100,
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
      }}
    >
      <button
        onClick={exitSelectionMode}
        style={{
          background: 'var(--color-gray-lightest, #f5f5f5)',
          border: '1px solid var(--color-gray-light, #ddd)',
          borderRadius: '20px',
          padding: '8px 16px',
          fontSize: '14px',
          cursor: 'pointer',
          color: 'var(--color-gray-base, #666)',
        }}
      >
        Cancel
      </button>
      <span style={{ fontSize: '14px', color: 'var(--color-gray-base, #666)' }}>
        {selectionCount} selected
      </span>
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => {
            showShareOptions.value = !showShareOptions.value;
          }}
          disabled={selectionCount === 0}
          style={{
            background:
              selectionCount > 0
                ? 'var(--color-primary, #2C6E49)'
                : 'var(--color-gray-disabled, #ccc)',
            border: 'none',
            borderRadius: '20px',
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: selectionCount > 0 ? 'pointer' : 'default',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          Share
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
          </svg>
        </button>
        {showShareOptions.value && selectionCount > 0 && (
          <div
            style={{
              position: 'absolute',
              bottom: '100%',
              right: '0',
              marginBottom: '8px',
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              overflow: 'hidden',
              minWidth: '160px',
            }}
          >
            {typeof navigator.share === 'function' && (
              <button
                onClick={() => shareSelectedGames('native', schedule)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 16px',
                  width: '100%',
                  border: 'none',
                  background: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#333',
                }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="var(--color-primary, #2C6E49)">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
                </svg>
                Share...
              </button>
            )}
            <button
              onClick={() => shareSelectedGames('whatsapp', schedule)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                width: '100%',
                border: 'none',
                background: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                color: 'var(--color-whatsapp, #25D366)',
                borderTop: typeof navigator.share === 'function' ? '1px solid #f0f0f0' : 'none',
              }}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </button>
            <button
              onClick={() => shareSelectedGames('sms', schedule)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                width: '100%',
                border: 'none',
                background: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                color: 'var(--color-sms, #2196F3)',
                borderTop: '1px solid #f0f0f0',
              }}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
              </svg>
              SMS
            </button>
            <button
              onClick={() => shareSelectedGames('copy', schedule)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                width: '100%',
                border: 'none',
                background: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                color: 'var(--color-gray-base, #666)',
                borderTop: '1px solid #f0f0f0',
              }}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
              </svg>
              Copy text
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
