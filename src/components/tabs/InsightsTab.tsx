import { computed } from '@preact/signals';
import { allCheckins, coreMembers } from '../App';
import { organizeMatches } from '../../utils/matching';

function normalizeName(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '');
}

// Compute insights from all check-ins
const insights = computed(() => {
  const checkins = allCheckins.value;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Initialize stats
  let totalGames = 0;
  let doublesGames = 0;
  let singlesGames = 0;
  let rotationGames = 0;
  let last30DaysGames = 0;
  let last7DaysGames = 0;

  const playerStats: Record<string, {
    gamesPlayed: number;
    checkIns: number;
    lastPlayed: string;
    doublesPlayed: number;
    singlesPlayed: number;
  }> = {};

  const dayOfWeekCounts: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  const weeklyGames: Record<string, number> = {};

  // Track days with activity
  let activeDays = 0;
  let totalCheckIns = 0;

  // Process all dates
  const sortedDates = Object.keys(checkins).sort();

  for (const date of sortedDates) {
    const dateCheckins = checkins[date] || [];
    if (dateCheckins.length === 0) continue;

    const dateObj = new Date(date + 'T00:00:00');
    const isPast = dateObj < today;

    if (!isPast) continue; // Only count past dates for stats

    activeDays++;
    totalCheckIns += dateCheckins.length;

    const isLast30Days = dateObj >= thirtyDaysAgo;
    const isLast7Days = dateObj >= sevenDaysAgo;

    // Day of week stats
    const dayOfWeek = dateObj.getDay();

    // Week tracking
    const weekStart = new Date(dateObj);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekKey = weekStart.toISOString().split('T')[0];

    // Organize matches to count games
    const { matches } = organizeMatches(dateCheckins);

    for (const match of matches) {
      if (match.type === 'waiting' || match.type === 'doubles-forming' || match.type === 'singles-forming') {
        continue; // Don't count forming games
      }

      totalGames++;
      dayOfWeekCounts[dayOfWeek]++;
      weeklyGames[weekKey] = (weeklyGames[weekKey] || 0) + 1;

      if (isLast30Days) last30DaysGames++;
      if (isLast7Days) last7DaysGames++;

      if (match.type === 'doubles') {
        doublesGames++;
      } else if (match.type === 'singles') {
        singlesGames++;
      } else if (match.type === 'singles-or-practice') {
        rotationGames++;
      }

      // Player stats
      for (const player of match.players) {
        const playerKey = normalizeName(player.name);
        if (!playerStats[playerKey]) {
          playerStats[playerKey] = {
            gamesPlayed: 0,
            checkIns: 0,
            lastPlayed: date,
            doublesPlayed: 0,
            singlesPlayed: 0,
          };
        }
        playerStats[playerKey].gamesPlayed++;
        playerStats[playerKey].lastPlayed = date;
        if (match.type === 'doubles') {
          playerStats[playerKey].doublesPlayed++;
        } else {
          playerStats[playerKey].singlesPlayed++;
        }
      }
    }

    // Count check-ins per player
    for (const checkin of dateCheckins) {
      const playerKey = normalizeName(checkin.name);
      if (!playerStats[playerKey]) {
        playerStats[playerKey] = {
          gamesPlayed: 0,
          checkIns: 0,
          lastPlayed: '',
          doublesPlayed: 0,
          singlesPlayed: 0,
        };
      }
      playerStats[playerKey].checkIns++;
    }
  }

  // Calculate top players
  const topPlayers = Object.entries(playerStats)
    .map(([key, stats]) => {
      // Find display name from core members
      const displayName = coreMembers.value.find(m => normalizeName(m) === key) || key;
      return {
        name: displayName,
        ...stats,
        participationRate: stats.checkIns > 0 ? Math.round((stats.gamesPlayed / stats.checkIns) * 100) : 0,
      };
    })
    .sort((a, b) => b.gamesPlayed - a.gamesPlayed)
    .slice(0, 10);

  // Find most popular day
  const mostPopularDay = Object.entries(dayOfWeekCounts)
    .sort((a, b) => b[1] - a[1])[0];
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Recent weeks data for trend
  const recentWeeks = Object.entries(weeklyGames)
    .sort((a, b) => b[0].localeCompare(a[0]))
    .slice(0, 8)
    .reverse();

  return {
    totalGames,
    doublesGames,
    singlesGames,
    rotationGames,
    last30DaysGames,
    last7DaysGames,
    activeDays,
    totalCheckIns,
    averagePlayersPerDay: activeDays > 0 ? (totalCheckIns / activeDays).toFixed(1) : '0',
    topPlayers,
    mostPopularDay: mostPopularDay ? dayNames[parseInt(mostPopularDay[0])] : 'N/A',
    mostPopularDayCount: mostPopularDay ? mostPopularDay[1] : 0,
    dayOfWeekCounts,
    recentWeeks,
    totalMembers: coreMembers.value.length,
    activeMembersLast30Days: Object.values(playerStats).filter(p => {
      if (!p.lastPlayed) return false;
      const lastPlayedDate = new Date(p.lastPlayed + 'T00:00:00');
      return lastPlayedDate >= thirtyDaysAgo;
    }).length,
  };
});

function StatCard({ label, value, subtext }: { label: string; value: string | number; subtext?: string }) {
  return (
    <div style={{
      background: '#f9f9f9',
      borderRadius: '12px',
      padding: '16px',
      textAlign: 'center',
      flex: '1',
      minWidth: '100px',
    }}>
      <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--color-primary, #2C6E49)' }}>{value}</div>
      <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>{label}</div>
      {subtext && <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>{subtext}</div>}
    </div>
  );
}

function ProgressBar({ value, max, color = 'var(--color-primary, #2C6E49)' }: { value: number; max: number; color?: string }) {
  const percent = max > 0 ? (value / max) * 100 : 0;
  return (
    <div style={{
      background: '#e0e0e0',
      borderRadius: '4px',
      height: '8px',
      flex: '1',
      overflow: 'hidden',
    }}>
      <div style={{
        background: color,
        height: '100%',
        width: `${percent}%`,
        borderRadius: '4px',
        transition: 'width 0.3s ease',
      }} />
    </div>
  );
}

export function InsightsTab() {
  const data = insights.value;
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const maxDayCount = Math.max(...Object.values(data.dayOfWeekCounts));

  return (
    <div style="padding: 16px;">
      <h3 style="margin: 0 0 16px 0; font-size: 18px; color: #333;">Group Insights</h3>

      {/* Summary Stats */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '20px',
        flexWrap: 'wrap',
      }}>
        <StatCard label="Total Games" value={data.totalGames} subtext="all time" />
        <StatCard label="Last 30 Days" value={data.last30DaysGames} />
        <StatCard label="Last 7 Days" value={data.last7DaysGames} />
      </div>

      {/* Game Types */}
      <div style={{
        background: '#f9f9f9',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '16px',
      }}>
        <h3 style="margin: 0 0 12px 0; font-size: 16px;">Game Types</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '70px', fontSize: '14px' }}>Doubles</span>
            <ProgressBar value={data.doublesGames} max={data.totalGames} color="var(--color-primary, #2C6E49)" />
            <span style={{ width: '40px', textAlign: 'right', fontSize: '14px', fontWeight: '600' }}>{data.doublesGames}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '70px', fontSize: '14px' }}>Singles</span>
            <ProgressBar value={data.singlesGames} max={data.totalGames} color="#2196F3" />
            <span style={{ width: '40px', textAlign: 'right', fontSize: '14px', fontWeight: '600' }}>{data.singlesGames}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '70px', fontSize: '14px' }}>Rotation</span>
            <ProgressBar value={data.rotationGames} max={data.totalGames} color="#FF9800" />
            <span style={{ width: '40px', textAlign: 'right', fontSize: '14px', fontWeight: '600' }}>{data.rotationGames}</span>
          </div>
        </div>
      </div>

      {/* Popular Days */}
      <div style={{
        background: '#f9f9f9',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '16px',
      }}>
        <h3 style="margin: 0 0 12px 0; font-size: 16px;">Activity by Day</h3>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '80px' }}>
          {dayNames.map((day, idx) => {
            const count = data.dayOfWeekCounts[idx];
            const height = maxDayCount > 0 ? (count / maxDayCount) * 60 : 0;
            return (
              <div key={day} style={{ flex: '1', textAlign: 'center' }}>
                <div style={{
                  background: idx === Number(Object.entries(data.dayOfWeekCounts).sort((a, b) => b[1] - a[1])[0]?.[0]) ? 'var(--color-primary, #2C6E49)' : '#c8e6c9',
                  height: `${Math.max(height, 4)}px`,
                  borderRadius: '4px 4px 0 0',
                  marginBottom: '4px',
                  transition: 'height 0.3s ease',
                }} />
                <span style={{ fontSize: '10px', color: '#666' }}>{day}</span>
              </div>
            );
          })}
        </div>
        <p style={{ fontSize: '13px', color: '#666', margin: '12px 0 0 0', textAlign: 'center' }}>
          Most popular: <strong>{data.mostPopularDay}</strong> ({data.mostPopularDayCount} games)
        </p>
      </div>

      {/* Weekly Trend */}
      {data.recentWeeks.length > 0 && (
        <div style={{
          background: '#f9f9f9',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px',
        }}>
          <h3 style="margin: 0 0 12px 0; font-size: 16px;">Weekly Trend</h3>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '60px' }}>
            {data.recentWeeks.map(([week, count]) => {
              const maxWeekCount = Math.max(...data.recentWeeks.map(w => w[1]));
              const height = maxWeekCount > 0 ? (count / maxWeekCount) * 50 : 0;
              const weekDate = new Date(week + 'T00:00:00');
              const label = `${weekDate.getMonth() + 1}/${weekDate.getDate()}`;
              return (
                <div key={week} style={{ flex: '1', textAlign: 'center' }}>
                  <div style={{
                    background: 'var(--color-primary, #2C6E49)',
                    height: `${Math.max(height, 4)}px`,
                    borderRadius: '4px 4px 0 0',
                    marginBottom: '4px',
                  }} />
                  <span style={{ fontSize: '9px', color: '#666' }}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Player Stats */}
      <div style={{
        background: '#f9f9f9',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '16px',
      }}>
        <h3 style="margin: 0 0 12px 0; font-size: 16px;">Most Active Players</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#888', marginBottom: '8px', padding: '0 4px' }}>
          <span>Player</span>
          <span>Games</span>
        </div>
        {data.topPlayers.length === 0 ? (
          <p style={{ fontSize: '14px', color: '#666', textAlign: 'center', margin: '16px 0' }}>
            No game data yet
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.topPlayers.map((player, idx) => (
              <div key={player.name} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px',
                background: idx < 3 ? '#E8F5E9' : 'white',
                borderRadius: '8px',
              }}>
                <span style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: idx === 0 ? '#FFD700' : idx === 1 ? '#C0C0C0' : idx === 2 ? '#CD7F32' : '#e0e0e0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: '600',
                  color: idx < 3 ? '#333' : '#666',
                }}>
                  {idx + 1}
                </span>
                <span style={{ flex: '1', fontSize: '14px' }}>{player.name}</span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-primary, #2C6E49)' }}>
                  {player.gamesPlayed}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Group Health */}
      <div style={{
        background: '#E3F2FD',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '16px',
      }}>
        <h3 style="margin: 0 0 12px 0; font-size: 16px;">Group Health</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
            <span style={{ color: '#666' }}>Total members</span>
            <span style={{ fontWeight: '600' }}>{data.totalMembers}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
            <span style={{ color: '#666' }}>Active last 30 days</span>
            <span style={{ fontWeight: '600' }}>{data.activeMembersLast30Days}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
            <span style={{ color: '#666' }}>Avg players/day</span>
            <span style={{ fontWeight: '600' }}>{data.averagePlayersPerDay}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
            <span style={{ color: '#666' }}>Days with activity</span>
            <span style={{ fontWeight: '600' }}>{data.activeDays}</span>
          </div>
        </div>
      </div>

      <p style="font-size: 13px; color: #888; text-align: center; margin-top: 16px;">
        Stats are based on completed games from past dates
      </p>
    </div>
  );
}
