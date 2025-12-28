/**
 * CompactPlayerList - Compact view of players in a match
 */
import { sessionUser } from '../../App';
import { formatTimeRange, normalizeName, getPreferenceLabel } from '../../../utils/helpers';
import type { CheckinData } from '../../../types';

interface CompactPlayerListProps {
  players: CheckinData[];
  checkins: CheckinData[];
}

export function CompactPlayerList({ players, checkins }: CompactPlayerListProps) {
  const currentUserName = sessionUser.value ? normalizeName(sessionUser.value) : '';

  return (
    <div style="padding: 4px 0;">
      {players.map((player) => {
        const isCurrentUser = currentUserName && normalizeName(player.name) === currentUserName;
        const globalIdx = checkins.findIndex(
          (c) =>
            normalizeName(c.name) === normalizeName(player.name) && c.timestamp === player.timestamp
        );

        const timeInfo = player.timeRange
          ? formatTimeRange(player.timeRange.start, player.timeRange.end)
          : '';

        return (
          <div
            key={player.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 12px',
              borderBottom: '1px solid var(--color-border-light, #f0f0f0)',
              fontSize: '14px',
              background: isCurrentUser ? 'var(--color-primary-light, #E8F5E9)' : 'transparent',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  color: 'var(--color-text-muted, #999)',
                  fontSize: '13px',
                  minWidth: '20px',
                }}
              >
                {globalIdx >= 0 ? `${globalIdx + 1}.` : ''}
              </span>
              <span
                style={
                  isCurrentUser ? { fontWeight: 600, color: 'var(--color-primary, #2C6E49)' } : {}
                }
              >
                {player.name}
              </span>
              {isCurrentUser && (
                <span
                  style={{
                    fontSize: '10px',
                    background: 'var(--color-primary, #2C6E49)',
                    color: 'white',
                    padding: '1px 4px',
                    borderRadius: '4px',
                  }}
                >
                  YOU
                </span>
              )}
              {timeInfo && (
                <span
                  style={{
                    fontSize: '12px',
                    color: 'var(--color-text-muted, #999)',
                    marginLeft: '4px',
                  }}
                >
                  {timeInfo}
                </span>
              )}
            </span>
            <span
              style={{
                fontSize: '11px',
                padding: '2px 6px',
                borderRadius: '4px',
                background:
                  player.playStyle === 'singles'
                    ? 'var(--color-blue-light, #E3F2FD)'
                    : player.playStyle === 'doubles'
                      ? 'var(--color-orange-light, #FFF3E0)'
                      : 'var(--color-primary-light, #E8F5E9)',
                color:
                  player.playStyle === 'singles'
                    ? 'var(--color-blue-base, #1976D2)'
                    : player.playStyle === 'doubles'
                      ? 'var(--color-orange-base, #F57C00)'
                      : 'var(--color-primary, #2C6E49)',
                fontWeight: 500,
              }}
            >
              {getPreferenceLabel(player.playStyle || 'both')}
            </span>
          </div>
        );
      })}
    </div>
  );
}
