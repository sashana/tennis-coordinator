/**
 * GameProgressCard Component
 *
 * Compact card showing game status with avatar stack,
 * progress bar, and action buttons.
 */

import { JSX } from 'preact';
import { signal } from '@preact/signals';
import type { GameActivity } from '@/types/activity';
import { formatRelativeTime } from '@/hooks/useActivityFeed';
import { sport } from '@/config/sport';

interface GameProgressCardProps {
  game: GameActivity;
  currentUserCheckedIn: boolean;
  currentUserInGame: boolean;
  onJoin: (game: GameActivity) => void;
  onView: (game: GameActivity) => void;
  onShare: (game: GameActivity, method: 'whatsapp' | 'sms' | 'copy') => void;
}

// Track which card has share dropdown open
const activeShareDropdown = signal<string | null>(null);

// Close dropdown when clicking outside
if (typeof document !== 'undefined') {
  document.addEventListener('click', (e) => {
    if (activeShareDropdown.value) {
      const target = e.target as HTMLElement;
      if (!target.closest('.share-dropdown') && !target.closest('[data-share-button]')) {
        activeShareDropdown.value = null;
      }
    }
  });
}

/**
 * Format date in short form (Mon, Jan 6)
 */
function formatShortDate(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const gameDay = new Date(date);
  gameDay.setHours(0, 0, 0, 0);

  if (gameDay.getTime() === today.getTime()) {
    return 'Today';
  }
  if (gameDay.getTime() === tomorrow.getTime()) {
    return 'Tomorrow';
  }
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

/**
 * Check if date is in the past
 */
function isPastDate(dateStr: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const gameDay = new Date(dateStr + 'T00:00:00');
  return gameDay < today;
}

/**
 * Progress bar showing filled/needed slots
 */
function ProgressBar({ have, total, muted = false }: { have: number; total: number; muted?: boolean }): JSX.Element {
  const percentage = (have / total) * 100;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
      <div
        style={{
          width: '50px',
          height: '5px',
          background: muted ? '#e0e0e0' : 'var(--color-bg-muted, #e8e8e8)',
          borderRadius: '3px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${percentage}%`,
            background: muted
              ? '#bbb'
              : have === total
                ? 'var(--color-primary, #2C6E49)'
                : 'linear-gradient(90deg, #2C6E49 0%, #4CAF50 100%)',
            borderRadius: '3px',
          }}
        />
      </div>
      <span
        style={{
          fontSize: '11px',
          fontWeight: '600',
          color: muted ? '#999' : have === total ? 'var(--color-primary, #2C6E49)' : 'var(--color-text-secondary, #666)',
        }}
      >
        {have}/{total}
      </span>
    </div>
  );
}

export function GameProgressCard({
  game,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  currentUserCheckedIn: _currentUserCheckedIn,
  currentUserInGame,
  onJoin,
  onView,
  onShare,
}: GameProgressCardProps): JSX.Element {
  const isDoubles = game.playStyle === 'doubles';
  const totalNeeded = isDoubles ? 4 : 2;
  const dateStr = formatShortDate(game.gameDate);
  const playStyleStr = isDoubles ? 'Doubles' : 'Singles';
  const gameKey = `${game.gameDate}-${game.playStyle}`;
  const isShareOpen = activeShareDropdown.value === gameKey;

  // Check if past date or today
  const isPast = isPastDate(game.gameDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const gameDay = new Date(game.gameDate + 'T00:00:00');
  const isToday = gameDay.getTime() === today.getTime();

  // Determine urgency (not applicable for past dates)
  // Urgent = 1 spot left OR doubles with only 1-2 players (needs 2-3 more)
  const isUrgent = !isPast && !game.isConfirmed && (game.playersNeed === 1 || (isDoubles && game.playersHave <= 2));
  const isConfirmed = game.isConfirmed;
  const isForming = !isPast && !isConfirmed && game.playersNeed > 1 && !isUrgent;

  // Get player names
  const playerNames = game.activities.map((a) => a.memberName);

  // Card styling based on state
  const getBorderColor = () => {
    if (isPast) return '#e0e0e0';
    if (isConfirmed) return '#2C6E49'; // Green
    if (isUrgent) return '#FF9800'; // Orange
    if (isForming) return '#1976D2'; // Blue
    return 'var(--color-border, #e0e0e0)';
  };

  return (
    <div
      style={{
        background: isPast ? '#fafafa' : 'white',
        borderRadius: '10px',
        border: `1px solid ${getBorderColor()}`,
        overflow: 'visible',
        opacity: isPast ? 0.7 : 1,
      }}
    >
      <div style={{ padding: '12px 14px' }}>
        {/* Row 1: Status tags */}
        {!isPast && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
            {/* Status tag */}
            {(game.playersNeed > 0 || isConfirmed) && (
              <span
                style={{
                  background: isUrgent
                    ? '#FF9800'
                    : isConfirmed
                      ? '#2C6E49'
                      : '#1976D2',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: '700',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  letterSpacing: '0.5px',
                }}
              >
                {isConfirmed
                  ? 'GAME ON'
                  : game.playersNeed === 1
                    ? 'NEED 1 PLAYER'
                    : `NEED ${game.playersNeed} PLAYERS`}
              </span>
            )}

            {/* Today tag */}
            {isToday && (
              <span
                style={{
                  background: '#E0F2F1',
                  color: '#00897B',
                  fontSize: '10px',
                  fontWeight: '700',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  letterSpacing: '0.5px',
                }}
              >
                TODAY
              </span>
            )}

            {/* YOU'RE IN tag */}
            {currentUserInGame && (
              <span
                style={{
                  border: '1.5px solid #2C6E49',
                  color: '#2C6E49',
                  fontSize: '10px',
                  fontWeight: '700',
                  padding: '3px 10px',
                  borderRadius: '4px',
                  letterSpacing: '0.5px',
                }}
              >
                YOU'RE IN
              </span>
            )}
          </div>
        )}

        {/* Row 2: Date · PlayStyle */}
        <div
          style={{
            fontWeight: '600',
            fontSize: '15px',
            color: isPast ? '#999' : 'var(--color-text-primary, #333)',
            marginBottom: '4px',
          }}
        >
          {dateStr} · {playStyleStr}
        </div>

        {/* Row 3: Player names */}
        <div
          style={{
            fontSize: '14px',
            color: isPast ? '#aaa' : 'var(--color-text-secondary, #666)',
            marginBottom: '12px',
            lineHeight: '1.4',
          }}
        >
          {playerNames.join(', ')}
        </div>

        {/* Row 4: Progress bar + Actions */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {/* Progress bar */}
          <ProgressBar have={game.playersHave} total={totalNeeded} muted={isPast} />

          <div style={{ flex: 1 }} />

          {/* Share button - icon only */}
          <button
            data-share-button
            onClick={(e) => {
              e.stopPropagation();
              activeShareDropdown.value = isShareOpen ? null : gameKey;
            }}
            style={{
              background: 'transparent',
              color: isPast ? '#bbb' : 'var(--color-text-secondary, #666)',
              border: 'none',
              padding: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
            </svg>

            {/* Share dropdown */}
            {isShareOpen && (
              <div
                className="share-dropdown"
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'absolute',
                  bottom: '100%',
                  right: 0,
                  marginBottom: '4px',
                  background: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  zIndex: 100,
                  overflow: 'hidden',
                  minWidth: '130px',
                  whiteSpace: 'nowrap',
                }}
              >
                {[
                  { method: 'whatsapp' as const, label: 'WhatsApp', color: '#25D366', icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' },
                  { method: 'sms' as const, label: 'SMS', color: '#2196F3', icon: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z' },
                  { method: 'copy' as const, label: 'Copy', color: '#666', icon: 'M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z' },
                ].map(({ method, label, color, icon }, i) => (
                  <button
                    key={method}
                    onClick={(e) => {
                      e.stopPropagation();
                      onShare(game, method);
                      activeShareDropdown.value = null;
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      width: '100%',
                      border: 'none',
                      background: 'white',
                      cursor: 'pointer',
                      fontSize: '13px',
                      color,
                      borderTop: i > 0 ? '1px solid #f0f0f0' : 'none',
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <path d={icon} />
                    </svg>
                    {label}
                  </button>
                ))}
              </div>
            )}
          </button>

          {/* Main action button */}
          {isPast ? (
            <button
              onClick={() => onView(game)}
              style={{
                background: '#f0f0f0',
                color: '#888',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              View
            </button>
          ) : !isConfirmed && !currentUserInGame ? (
            <button
              onClick={() => onJoin(game)}
              style={{
                background: isUrgent
                  ? 'linear-gradient(90deg, #ff9800 0%, #ffa726 100%)'
                  : 'var(--color-primary, #2C6E49)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              {isUrgent ? 'Join Now' : 'Join'}
            </button>
          ) : (
            <button
              onClick={() => onView(game)}
              style={{
                background: currentUserInGame
                  ? 'var(--color-primary-light, #E8F5E9)'
                  : 'var(--color-bg-muted, #f5f5f5)',
                color: currentUserInGame
                  ? 'var(--color-primary, #2C6E49)'
                  : 'var(--color-text-primary, #333)',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              View
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
