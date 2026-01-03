/**
 * ActivityItem Component
 *
 * Compact activity item with tag, message, time, and action button.
 */

import { JSX } from 'preact';
import type { ActivityItem as ActivityItemType } from '@/types/activity';
import { formatRelativeTime, getActivityAction } from '@/hooks/useActivityFeed';

interface ActivityItemProps {
  item: ActivityItemType;
  currentUserCheckedIn: boolean;
  onAction: (action: string, item: ActivityItemType) => void;
}

/**
 * Format date smartly - "Today", "Tomorrow", "Mon", or "Jan 6"
 */
function formatSmartDate(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const gameDay = new Date(date);
  gameDay.setHours(0, 0, 0, 0);

  if (gameDay.getTime() === today.getTime()) {
    return 'today';
  }
  if (gameDay.getTime() === tomorrow.getTime()) {
    return 'tomorrow';
  }

  // Within the same week, show day name
  const diffDays = Math.abs((gameDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays <= 6) {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }

  // Otherwise show month + day
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/**
 * Get message for activity type
 */
function getActivityMessage(item: ActivityItemType): string {
  const dateStr = item.gameDate ? formatSmartDate(item.gameDate) : '';

  const playStyleStr =
    item.playStyle === 'singles'
      ? 'Singles'
      : item.playStyle === 'doubles'
        ? 'Doubles'
        : '';

  switch (item.type) {
    case 'checkin':
      return playStyleStr
        ? `Checked in for ${playStyleStr.toLowerCase()} ${dateStr}`
        : `Checked in for ${dateStr}`;

    case 'game-needs':
      return `${playStyleStr} ${dateStr} · needs ${item.playersNeed}`;

    case 'game-confirmed':
      return `${playStyleStr} ${dateStr} confirmed!`;

    case 'new-member':
      return 'Joined the group';

    case 'invite':
      return `Invited to ${playStyleStr.toLowerCase()} ${dateStr}`;

    case 'game-dissolved':
      return `Left ${playStyleStr.toLowerCase()} ${dateStr}`;

    default:
      return '';
  }
}

export function ActivityItemComponent({
  item,
  currentUserCheckedIn,
  onAction,
}: ActivityItemProps): JSX.Element {
  const action = getActivityAction(item, currentUserCheckedIn);
  const message = getActivityMessage(item);
  const relativeTime = formatRelativeTime(item.timestamp);

  // Check if past date
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const gameDate = item.gameDate ? new Date(item.gameDate + 'T00:00:00') : null;
  const isPast = gameDate && gameDate < today;

  // Past dates: only grey out if not a check-in or removal (those stay prominent)
  const shouldMute = isPast && item.type !== 'checkin' && item.type !== 'game-dissolved';

  if (shouldMute) {
    return (
      <div
        style={{
          padding: '10px 12px',
          background: '#fafafa',
          borderRadius: '8px',
          border: '1px solid #eee',
          opacity: 0.7,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        {/* Tag */}
        <span
          style={{
            background: '#ddd',
            color: '#888',
            fontSize: '9px',
            fontWeight: '700',
            padding: '3px 8px',
            borderRadius: '4px',
            letterSpacing: '0.5px',
          }}
        >
          {item.type === 'new-member' ? 'JOINED' : 'VIEW'}
        </span>

        {/* Message */}
        <div style={{ flex: 1, fontSize: '12px', color: '#999' }}>
          <span style={{ fontWeight: '500', color: '#777' }}>{item.memberName}</span>
          {' · '}
          {message}
        </div>

        {/* Time */}
        <span style={{ fontSize: '10px', color: '#bbb' }}>{relativeTime}</span>
      </div>
    );
  }

  // Tag styling based on activity type
  const getTagStyle = () => {
    if (item.type === 'new-member') {
      return { bg: '#9C27B0', color: 'white', label: 'JOINED', border: '1px solid #CE93D8' };
    }
    if (item.type === 'game-dissolved') {
      return { bg: '#FF9800', color: 'white', label: 'LEFT', border: '1px solid #FFB74D' };
    }
    if (item.type === 'checkin') {
      return { bg: '#2C6E49', color: 'white', label: 'IN', border: '1px solid #4CAF50' };
    }
    return { bg: '#E8F5E9', color: '#2C6E49', label: '', border: '1px solid #C8E6C9' };
  };

  const tagStyle = getTagStyle();
  const isUnread = !item.isRead;

  return (
    <div
      style={{
        padding: '10px 12px',
        background: isUnread ? '#F3F8FF' : 'white',
        borderRadius: '8px',
        border: isUnread ? '1px solid #BBDEFB' : tagStyle.border,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      {/* Tag */}
      {tagStyle.label && (
        <span
          style={{
            background: tagStyle.bg,
            color: tagStyle.color,
            fontSize: '9px',
            fontWeight: '700',
            padding: '3px 8px',
            borderRadius: '4px',
            letterSpacing: '0.5px',
            flexShrink: 0,
          }}
        >
          {tagStyle.label}
        </span>
      )}

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <span
          style={{
            fontWeight: '600',
            color: 'var(--color-text-primary, #333)',
            fontSize: '13px',
          }}
        >
          {item.memberName}
        </span>
        <span style={{ color: '#999', margin: '0 6px' }}>·</span>
        <span
          style={{
            color: 'var(--color-text-secondary, #666)',
            fontSize: '13px',
          }}
        >
          {message}
        </span>
      </div>

      {/* Time */}
      <span
        style={{
          color: 'var(--color-text-muted, #999)',
          fontSize: '11px',
          flexShrink: 0,
        }}
      >
        {relativeTime}
      </span>

      {/* Action button */}
      {action && (
        <button
          onClick={() => onAction(action.type, item)}
          style={{
            background: action.primary
              ? 'var(--color-primary, #2C6E49)'
              : 'var(--color-bg-muted, #f5f5f5)',
            color: action.primary ? 'white' : 'var(--color-text-primary, #333)',
            border: 'none',
            borderRadius: '6px',
            padding: '5px 12px',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          {action.label}
        </button>
      )}

      {/* Unread indicator */}
      {!item.isRead && (
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#2196F3',
            flexShrink: 0,
            boxShadow: '0 0 4px rgba(33, 150, 243, 0.5)',
          }}
        />
      )}
    </div>
  );
}
