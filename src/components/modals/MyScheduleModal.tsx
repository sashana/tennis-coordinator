import { signal, computed } from '@preact/signals';
import { Modal } from '../ui/Modal';
import { allCheckins, sessionUser, selectedDate } from '../App';
import { organizeMatches } from '../../utils/matching';
import { formatDate, normalizeName } from '../../utils/helpers';
import { memberDetails } from '../App';

// Modal state
export const showMyScheduleModal = signal(false);


interface ScheduledMatch {
  date: string;
  type: string;
  matchNumber: number;
  players: string[];
  isForming: boolean;
  needed?: number;
}

// Compute user's matches across all dates
const userSchedule = computed(() => {
  const user = sessionUser.value;
  if (!user) return [];

  const normalizedUser = normalizeName(user);
  const schedule: ScheduledMatch[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get all dates and sort them
  const dates = Object.keys(allCheckins.value).sort();

  for (const date of dates) {
    // Skip past dates
    const dateObj = new Date(date + 'T00:00:00');
    if (dateObj < today) continue;

    const checkins = allCheckins.value[date] || [];
    if (checkins.length === 0) continue;

    // Build user preferences from member details
    const userPreferences: Record<string, { include: string[]; exclude: string[] }> = {};
    const details = memberDetails.value || {};
    for (const [name, prefs] of Object.entries(details)) {
      if (prefs && typeof prefs === 'object') {
        userPreferences[normalizeName(name)] = {
          include: (prefs as any).include || [],
          exclude: (prefs as any).exclude || [],
        };
      }
    }

    // Organize matches for this date
    const result = organizeMatches(checkins, userPreferences);

    // Find matches where user is a player
    for (const match of result.matches) {
      const playerNames = match.players.map((p: any) => normalizeName(p.name));

      if (playerNames.includes(normalizedUser)) {
        const isForming = match.type === 'doubles-forming' || match.type === 'singles-forming';
        schedule.push({
          date,
          type: match.type,
          matchNumber: match.number || 1,
          players: match.players.map((p: any) => p.name),
          isForming,
          needed: match.needed,
        });
      }
    }
  }

  return schedule;
});

function getMatchTypeLabel(type: string): string {
  switch (type) {
    case 'doubles': return 'Doubles';
    case 'singles': return 'Singles';
    case 'rotation': return '3-Player Rotation';
    case 'doubles-forming': return 'Doubles (forming)';
    case 'singles-forming': return 'Singles (forming)';
    default: return type;
  }
}

function getMatchIcon(type: string): string {
  switch (type) {
    case 'doubles':
    case 'doubles-forming':
      return '👥';
    case 'singles':
    case 'singles-forming':
      return '👤';
    case 'rotation':
      return '🔄';
    default:
      return '🎾';
  }
}

function handleDateClick(date: string) {
  selectedDate.value = date;
  showMyScheduleModal.value = false;
}

export function MyScheduleModal() {
  const schedule = userSchedule.value;

  return (
    <Modal
      isOpen={showMyScheduleModal.value}
      onClose={() => { showMyScheduleModal.value = false; }}
      title="My Schedule"
    >
      <div style="max-height: 400px; overflow-y: auto;">
        {schedule.length === 0 ? (
          <div style="text-align: center; padding: 24px; color: #666;">
            <p style="font-size: 18px; margin-bottom: 8px;">No upcoming matches</p>
            <p style="font-size: 14px;">Check in for a date to get matched with other players!</p>
          </div>
        ) : (
          <div style="display: flex; flex-direction: column; gap: 12px;">
            {schedule.map((match, idx) => {
              const otherPlayers = match.players.filter(
                p => normalizeName(p) !== normalizeName(sessionUser.value)
              );

              return (
                <div
                  key={idx}
                  onClick={() => handleDateClick(match.date)}
                  style={{
                    padding: '12px 16px',
                    background: match.isForming ? '#FFF8E1' : '#E8F5E9',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    border: match.isForming ? '1px solid #FFE082' : '1px solid #A5D6A7',
                  }}
                >
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <span style="font-weight: 600; color: #333;">
                      {formatDate(match.date)}
                    </span>
                    <span style={{
                      fontSize: '12px',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      background: match.isForming ? '#FFF3E0' : '#C8E6C9',
                      color: match.isForming ? '#E65100' : '#2E7D32',
                    }}>
                      {getMatchIcon(match.type)} {getMatchTypeLabel(match.type)}
                    </span>
                  </div>
                  <div style="font-size: 14px; color: #555;">
                    {otherPlayers.length > 0 ? (
                      <>
                        <span style="color: #888;">with </span>
                        <span style="font-weight: 500;">{otherPlayers.join(', ')}</span>
                      </>
                    ) : (
                      <span style="color: #888; font-style: italic;">
                        Waiting for {match.needed || 1} more player{(match.needed || 1) > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {schedule.length > 0 && (
        <p style="font-size: 12px; color: #888; text-align: center; margin-top: 12px;">
          Tap a match to view that day
        </p>
      )}
    </Modal>
  );
}
