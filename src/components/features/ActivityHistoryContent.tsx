import { signal } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import { currentGroupId } from '../App';
import { formatDate, formatTime, getPreferenceLabel } from '../../utils/helpers';
import { getDatabase } from '../../config/firebase';

interface ActivityItem {
  action: string;
  player: string;
  by: string;
  timestamp: number;
  date: string;
  playStyle?: string;
  timeRange?: { start: string; end: string };
  matchKey?: string;
  contact?: string;
  notes?: string;
  type?: string;
  noteContent?: string;
  previousNote?: string;
  oldName?: string;
  firebaseKey?: string;
  matchCount?: number;
  playerCount?: number;
  arrangementDetails?: string;
}

type FilterCategory = 'login' | 'checkin' | 'removal' | 'shared' | 'notes' | 'members' | 'arrangements';

const FILTER_CONFIG: Record<FilterCategory, { label: string; actions: string[] }> = {
  login: { label: 'Logins', actions: ['user_login'] },
  checkin: { label: 'Check-ins', actions: ['check-in', 'checkin'] },
  removal: { label: 'Removals', actions: ['removal'] },
  shared: { label: 'Shared', actions: ['whatsapp_share'] },
  notes: { label: 'Notes', actions: ['notes_saved', 'note_added', 'note_updated', 'note_removed'] },
  members: { label: 'Members', actions: ['member_added', 'member_removed', 'member_renamed'] },
  arrangements: { label: 'Arrangements', actions: ['arrangement_saved', 'arrangement_cleared'] },
};

const groupByPlayDate = signal(false);
const activityItems = signal<ActivityItem[]>([]);
const isLoading = signal(false);
const activeFilters = signal<Set<FilterCategory>>(new Set());

async function loadActivityLog() {
  const groupId = currentGroupId.value;
  if (!groupId) return;

  isLoading.value = true;

  try {
    const db = getDatabase();
    let allActivities: ActivityItem[] = [];

    const snapshot = await db.ref(`groups/${groupId}/activity`).once('value');
    const allActivityData = snapshot.val();

    if (allActivityData) {
      for (const [date, dateActivities] of Object.entries(allActivityData)) {
        if (dateActivities) {
          for (const [key, activity] of Object.entries(dateActivities as Record<string, ActivityItem>)) {
            allActivities.push({ ...activity, date, firebaseKey: key });
          }
        }
      }
    }

    allActivities.sort((a, b) => b.timestamp - a.timestamp);
    activityItems.value = allActivities;
  } catch (error) {
    console.error('Error loading activity:', error);
  } finally {
    isLoading.value = false;
  }
}

async function deleteActivity(item: ActivityItem) {
  const groupId = currentGroupId.value;
  if (!groupId || !item.firebaseKey || !item.date) return;

  if (!confirm('Remove this activity entry?')) return;

  try {
    const db = getDatabase();
    await db.ref(`groups/${groupId}/activity/${item.date}/${item.firebaseKey}`).remove();
    activityItems.value = activityItems.value.filter(
      a => !(a.date === item.date && a.firebaseKey === item.firebaseKey)
    );
  } catch (error) {
    console.error('Error deleting activity:', error);
    alert('Failed to delete activity');
  }
}

function formatActivityTime(timestamp: number): string {
  return formatTime(timestamp);
}

function getActivityIcon(action: string): string {
  switch (action) {
    case 'check-in':
    case 'checkin':
      return '✅';
    case 'removal':
      return '❌';
    case 'member_added':
      return '👤';
    case 'member_removed':
      return '🚫';
    case 'member_renamed':
      return '✏️';
    case 'whatsapp_share':
      return '📤';
    case 'notes_saved':
    case 'note_added':
      return '📝';
    case 'note_updated':
      return '✏️';
    case 'note_removed':
      return '🗑️';
    case 'user_login':
      return '🔓';
    case 'arrangement_saved':
      return '🔀';
    case 'arrangement_cleared':
      return '↩️';
    default:
      return '📋';
  }
}

function getActivityDescription(activity: ActivityItem): string {
  const { action, player, by, playStyle, timeRange, matchKey, type } = activity;

  switch (action) {
    case 'check-in':
    case 'checkin': {
      let desc = `${player} checked in`;
      if (by && by !== player) {
        desc += ` (by ${by})`;
      }
      if (playStyle) {
        desc += ` - ${getPreferenceLabel(playStyle)}`;
        if (timeRange?.start || timeRange?.end) {
          desc += ` (${timeRange.start || 'anytime'}–${timeRange.end || 'anytime'})`;
        }
      }
      return desc;
    }

    case 'removal': {
      if (by && by !== player) {
        return `${by} removed ${player}`;
      }
      return `${player} removed themselves`;
    }

    case 'member_added':
      return `${by} added ${player} as member`;

    case 'member_removed':
      return `${by} removed ${player} from members`;

    case 'member_renamed':
      return `${by} renamed ${activity.oldName} to ${player}`;

    case 'whatsapp_share': {
      const shareType = type === 'matches' ? 'matches' :
                        type === 'checkin' ? 'check-in' : 'removal';
      let desc = `${by} shared ${shareType} to WhatsApp`;
      if (player && player !== by) {
        desc += ` (for ${player})`;
      }
      return desc;
    }

    case 'notes_saved':
    case 'note_added': {
      const matchLabel = matchKey ? matchKey.replace('-', ' #').replace('forming 1', 'forming') : 'match';
      const notePreview = activity.noteContent
        ? `: "${activity.noteContent.length > 30 ? activity.noteContent.substring(0, 30) + '...' : activity.noteContent}"`
        : '';
      return `${by} added note to ${matchLabel}${notePreview}`;
    }

    case 'note_updated': {
      const matchLabel = matchKey ? matchKey.replace('-', ' #').replace('forming 1', 'forming') : 'match';
      const notePreview = activity.noteContent
        ? `: "${activity.noteContent.length > 30 ? activity.noteContent.substring(0, 30) + '...' : activity.noteContent}"`
        : '';
      return `${by} updated note on ${matchLabel}${notePreview}`;
    }

    case 'note_removed': {
      const matchLabel = matchKey ? matchKey.replace('-', ' #').replace('forming 1', 'forming') : 'match';
      return `${by} removed note from ${matchLabel}`;
    }

    case 'user_login':
      return `${player} logged in`;

    case 'arrangement_saved': {
      const { matchCount } = activity;
      let desc = `${by} arranged matches`;
      if (matchCount) {
        desc += ` (${matchCount} match${matchCount > 1 ? 'es' : ''})`;
      }
      return desc;
    }

    case 'arrangement_cleared':
      return `${by} cleared arrangement (back to auto)`;

    default:
      return `${player} - ${action}`;
  }
}

function toggleFilter(category: FilterCategory) {
  const newFilters = new Set(activeFilters.value);
  if (newFilters.has(category)) {
    newFilters.delete(category);
  } else {
    newFilters.add(category);
  }
  activeFilters.value = newFilters;
}

function getFilteredActivities(): ActivityItem[] {
  if (activeFilters.value.size === 0) {
    return activityItems.value;
  }

  const allowedActions = new Set<string>();
  activeFilters.value.forEach(category => {
    FILTER_CONFIG[category].actions.forEach(action => allowedActions.add(action));
  });

  return activityItems.value.filter(item => allowedActions.has(item.action));
}

export function ActivityHistoryContent() {
  useEffect(() => {
    loadActivityLog();
    return () => {
      groupByPlayDate.value = false;
      activeFilters.value = new Set();
    };
  }, []);

  const filteredActivities = getFilteredActivities();

  const groupedActivities: Record<string, ActivityItem[]> = {};

  if (groupByPlayDate.value) {
    filteredActivities.forEach(item => {
      if (!groupedActivities[item.date]) {
        groupedActivities[item.date] = [];
      }
      groupedActivities[item.date].push(item);
    });
  } else {
    filteredActivities.forEach(item => {
      const changeDate = new Date(item.timestamp).toISOString().split('T')[0];
      if (!groupedActivities[changeDate]) {
        groupedActivities[changeDate] = [];
      }
      groupedActivities[changeDate].push(item);
    });
  }

  return (
    <div>
      {/* Filter chips */}
      <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px;">
        {(Object.entries(FILTER_CONFIG) as [FilterCategory, { label: string; actions: string[] }][]).map(([category, config]) => {
          const isActive = activeFilters.value.has(category);
          return (
            <button
              key={category}
              onClick={() => toggleFilter(category)}
              style={{
                padding: '4px 10px',
                fontSize: '12px',
                border: isActive ? '1px solid var(--color-primary, #2C6E49)' : '1px solid var(--color-border, #ddd)',
                borderRadius: 'var(--radius-2xl, 16px)',
                background: isActive ? 'var(--color-primary-light, #E8F5E9)' : 'var(--color-bg-card, #fff)',
                color: isActive ? 'var(--color-primary, #2E7D32)' : 'var(--color-text-secondary, #666)',
                cursor: 'pointer',
                fontWeight: isActive ? '500' : '400',
              }}
            >
              {config.label}
            </button>
          );
        })}
        {activeFilters.value.size > 0 && (
          <button
            onClick={() => { activeFilters.value = new Set(); }}
            style={{
              padding: '4px 10px',
              fontSize: 'var(--font-size-sm, 12px)',
              border: '1px solid var(--color-error, #f44336)',
              borderRadius: 'var(--radius-2xl, 16px)',
              background: 'var(--color-bg-card, #fff)',
              color: 'var(--color-error, #f44336)',
              cursor: 'pointer',
            }}
          >
            Clear
          </button>
        )}
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <p style="font-size: var(--font-size-sm, 13px); color: var(--color-text-secondary, #666); margin: 0;">
          {groupByPlayDate.value
            ? 'Grouped by play date'
            : 'Grouped by when changes were made'
          }
          {activeFilters.value.size > 0 && ` (${filteredActivities.length} filtered)`}
        </p>
        <label style="font-size: var(--font-size-sm, 13px); color: var(--color-text-secondary, #666); cursor: pointer; display: flex; align-items: center; gap: 4px;">
          <input
            type="checkbox"
            checked={groupByPlayDate.value}
            onChange={(e) => {
              groupByPlayDate.value = (e.target as HTMLInputElement).checked;
            }}
          />
          Group by Play Date
        </label>
      </div>

      <div>
        {isLoading.value ? (
          <p style="color: var(--color-text-muted, #999); text-align: center; padding: var(--spacing-4xl, 24px);">Loading...</p>
        ) : filteredActivities.length === 0 ? (
          <p style="color: var(--color-text-muted, #999); text-align: center; padding: var(--spacing-4xl, 24px);">
            {activeFilters.value.size > 0 ? 'No matching activities' : 'No activity recorded yet'}
          </p>
        ) : (
          Object.entries(groupedActivities)
            .sort(([a], [b]) => b.localeCompare(a))
            .map(([date, items]) => (
              <div key={date}>
                <div style="font-weight: bold; color: var(--color-text-secondary, #666); margin-top: 12px; padding-bottom: 4px; border-bottom: 1px solid var(--color-border, #ddd);">
                  {formatDate(date)}
                </div>
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    style="padding: 10px; background: var(--color-bg-subtle, #f9f9f9); border-radius: var(--radius-md, 6px); font-size: var(--font-size-base, 14px); margin-top: 8px; position: relative;"
                  >
                    <div style="display: flex; align-items: flex-start; gap: 6px;">
                      <span>{getActivityIcon(item.action)}</span>
                      <div style="flex: 1;">
                        <div style="white-space: pre-wrap;">{getActivityDescription(item)}</div>
                        {item.arrangementDetails && (
                          <div style="font-size: var(--font-size-sm, 12px); color: var(--color-text-secondary, #666); margin-top: 4px; background: var(--color-bg-card, #fff); padding: 6px 8px; border-radius: var(--radius-sm, 4px); border: 1px solid var(--color-border, #e0e0e0);">
                            {item.arrangementDetails}
                          </div>
                        )}
                        <div style="font-size: var(--font-size-sm, 12px); color: var(--color-text-muted, #999); margin-top: 4px; display: flex; gap: 8px; flex-wrap: wrap;">
                          <span>{formatActivityTime(item.timestamp)}</span>
                          {groupByPlayDate.value ? (
                            <span style="color: var(--color-text-secondary, #666);">changed on {formatDate(new Date(item.timestamp).toISOString().split('T')[0])}</span>
                          ) : (
                            <span style="color: var(--color-primary, #2C6E49);">for {formatDate(item.date)}</span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => deleteActivity(item)}
                        title="Remove this activity"
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: 'var(--spacing-xs, 4px)',
                          cursor: 'pointer',
                          color: 'var(--color-text-muted, #999)',
                          fontSize: 'var(--font-size-lg, 16px)',
                          lineHeight: '1',
                          borderRadius: 'var(--radius-sm, 4px)',
                        }}
                        className="hover-danger"
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))
        )}
      </div>
    </div>
  );
}
