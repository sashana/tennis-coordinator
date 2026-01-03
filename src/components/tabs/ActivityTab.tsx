/**
 * ActivityTab Component
 *
 * Main activity feed tab showing:
 * - Games forming/confirmed with player lists (sorted by urgency)
 * - Recent activity (check-ins, new members, dissolved games)
 * - Notification settings (via header icon)
 * - Pull-to-refresh and slide-in animations
 */

import { signal } from '@preact/signals';
import { useEffect, useRef, useState, useLayoutEffect } from 'preact/hooks';
import { useActivityFeed } from '@/hooks/useActivityFeed';
import { GameProgressCard } from '@/components/features/activity/GameProgressCard';
import { ActivityItemComponent } from '@/components/features/activity/ActivityItem';
import { ActivitySettings } from '@/components/features/activity/ActivitySettings';
import { EmptyState } from '@/components/features/activity/EmptyState';
import { openAddMemberDrawer } from '@/components/features/AddMemberDrawer';
import {
  currentGroupId,
  sessionUser,
  coreMembers,
  selectedDate,
  allCheckins,
  showToast,
} from '@/components/App';
import { allMatchNotes } from '@/hooks/useFirebase';
import { activeTab } from '@/components/navigation/BottomTabBar';
import { normalizeName } from '@/utils/helpers';
import { sport } from '@/config/sport';
import type { ActivityItem, GameActivity } from '@/types/activity';

// UI state signals
const showSettings = signal(false);
const activityFilter = signal<'all' | 'forming' | 'confirmed' | 'recent'>('all');
const showShareAllDropdown = signal(false);

/**
 * Check if user is logged in as group admin
 */
function isGroupAdmin(): boolean {
  const groupId = currentGroupId.value;
  if (!groupId) {
    return false;
  }
  return sessionStorage.getItem(`adminAuth_${groupId}`) === 'true';
}

/**
 * Check if current user is checked in for a given date
 */
function isUserCheckedIn(date: string): boolean {
  const user = sessionUser.value;
  if (!user) return false;

  const checkins = allCheckins.value[date] || [];
  return checkins.some((c) => normalizeName(c.name) === normalizeName(user));
}

/**
 * Check if current user is in a specific game
 */
function isUserInGame(game: GameActivity): boolean {
  const user = sessionUser.value;
  if (!user) return false;

  return game.activities.some(
    (a) => normalizeName(a.memberName) === normalizeName(user)
  );
}

/**
 * Navigate to check-in tab for a specific date
 */
function navigateToCheckIn(date?: string) {
  if (date) {
    selectedDate.value = date;
  }
  activeTab.value = 'checkin';
}

/**
 * Get match note for a game activity
 */
function getGameNote(game: GameActivity): string {
  // Try to find a note for this play style on this date
  // Match notes are keyed by `{type}-{matchNumber}`, so check for the first one
  const dateNotes = allMatchNotes.value[game.gameDate];
  if (!dateNotes) return '';

  // Look for any note matching this play style
  for (const key of Object.keys(dateNotes)) {
    if (key.startsWith(game.playStyle)) {
      return dateNotes[key] || '';
    }
  }
  return '';
}

/**
 * Generate share message for a game
 */
function generateShareMessage(game: GameActivity): string {
  const dateObj = new Date(game.gameDate + 'T12:00:00');
  const dateStr = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
  const playStyle = game.playStyle === 'doubles' ? 'doubles' : 'singles';
  const groupId = currentGroupId.value;
  const appUrl = `${window.location.origin}${window.location.pathname}#${groupId}`;

  // Get player names
  const playerNames = game.activities.map((a) => a.memberName);
  const playersText = playerNames.length === 1
    ? playerNames[0]
    : playerNames.slice(0, -1).join(', ') + ' & ' + playerNames[playerNames.length - 1];

  // Get match note if available
  const note = getGameNote(game);

  if (game.playersNeed > 0) {
    const neededText = game.playersNeed === 1 ? '1 more player needed' : `${game.playersNeed} more players needed`;
    let message = `${sport.sportEmoji} ${neededText} for ${playStyle}!\n`;
    message += `📅 ${dateStr}\n`;
    message += `👥 ${playersText} ${playerNames.length === 1 ? 'is' : 'are'} in\n`;
    if (note) {
      message += `📝 ${note}\n`;
    }
    message += `\nCan you make it? ${appUrl}`;
    return message;
  } else {
    let message = `${sport.sportEmoji} ${playStyle.charAt(0).toUpperCase() + playStyle.slice(1)} game confirmed!\n`;
    message += `📅 ${dateStr}\n`;
    message += `👥 ${playersText}`;
    if (note) {
      message += `\n📝 ${note}`;
    }
    return message;
  }
}

/**
 * Share game via different methods
 */
function shareGame(game: GameActivity, method: 'whatsapp' | 'sms' | 'copy') {
  const message = generateShareMessage(game);

  if (method === 'whatsapp') {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  } else if (method === 'sms') {
    const encoded = encodeURIComponent(message);
    window.open(`sms:?body=${encoded}`, '_blank');
  } else if (method === 'copy') {
    navigator.clipboard
      .writeText(message)
      .then(() => showToast('Message copied!', 'success'))
      .catch(() => showToast('Failed to copy', 'error'));
  }
}

/**
 * Generate share message for ALL forming games
 */
function generateAllFormingGamesMessage(games: GameActivity[]): string {
  if (games.length === 0) return '';

  const groupId = currentGroupId.value;
  const appUrl = `${window.location.origin}${window.location.pathname}#${groupId}`;

  let message = `${sport.sportEmoji} We need players this week!\n\n`;

  games.forEach((game) => {
    const dateObj = new Date(game.gameDate + 'T12:00:00');
    const dateStr = dateObj.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    const playStyle = game.playStyle === 'doubles' ? 'Doubles' : 'Singles';
    const playerNames = game.activities.map((a) => a.memberName);
    const playersText = playerNames.join(', ');
    const neededText = game.playersNeed === 1 ? 'need 1' : `need ${game.playersNeed}`;

    message += `📅 ${dateStr} - ${playStyle} (${neededText})\n`;
    message += `   → ${playersText} ${playerNames.length === 1 ? 'is' : 'are'} in\n\n`;
  });

  message += `Join here: ${appUrl}`;
  return message;
}

/**
 * Share all forming games via different methods
 */
function shareAllFormingGames(games: GameActivity[], method: 'whatsapp' | 'sms' | 'copy') {
  const message = generateAllFormingGamesMessage(games);

  if (method === 'whatsapp') {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  } else if (method === 'sms') {
    const encoded = encodeURIComponent(message);
    window.open(`sms:?body=${encoded}`, '_blank');
  } else if (method === 'copy') {
    navigator.clipboard
      .writeText(message)
      .then(() => showToast('Message copied!', 'success'))
      .catch(() => showToast('Failed to copy', 'error'));
  }
  showShareAllDropdown.value = false;
}

/**
 * Sort games by urgency: soonest date first, then by players needed
 */
function sortByUrgency(games: GameActivity[]): GameActivity[] {
  return [...games].sort((a, b) => {
    // Soonest date first
    if (a.gameDate !== b.gameDate) {
      return a.gameDate.localeCompare(b.gameDate);
    }
    // Then games needing fewer players (more urgent)
    if (a.playersNeed !== b.playersNeed) {
      return a.playersNeed - b.playersNeed;
    }
    // Then by most recent activity
    return b.lastActivity - a.lastActivity;
  });
}

export function ActivityTab() {
  const groupId = currentGroupId.value;
  const {
    activities,
    gameActivities,
    unreadCount,
    isLoading,
    notificationPrefs,
    markAsRead,
    markAllAsRead,
    updateNotificationPrefs,
    saveNotificationPrefs,
  } = useActivityFeed(groupId);

  // Safety: ensure body scroll is enabled when tab mounts
  // (in case a drawer left it locked)
  useLayoutEffect(() => {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.transform = '';
    document.body.style.paddingRight = '';
  }, []);

  // Close share dropdown on outside click
  useEffect(() => {
    const handleClick = () => {
      if (showShareAllDropdown.value) {
        showShareAllDropdown.value = false;
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Admin status for Share All button
  const [isAdmin, setIsAdmin] = useState(isGroupAdmin());
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAdmin(isGroupAdmin());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Pull-to-refresh state
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);

  // Track new activities for animations
  const [newActivityIds, setNewActivityIds] = useState<Set<string>>(new Set());
  const prevActivityCount = useRef(0);

  // Detect new activities for slide-in animation
  useEffect(() => {
    const currentCount = gameActivities.value.length + activities.value.length;
    if (currentCount > prevActivityCount.current && prevActivityCount.current > 0) {
      // New activity arrived - mark recent ones for animation
      const recentIds = new Set<string>();
      gameActivities.value.slice(0, 2).forEach((g) => {
        recentIds.add(`${g.gameDate}-${g.playStyle}`);
      });
      activities.value.slice(0, 2).forEach((a) => {
        recentIds.add(a.id);
      });
      setNewActivityIds(recentIds);

      // Clear animation class after animation completes
      setTimeout(() => setNewActivityIds(new Set()), 500);
    }
    prevActivityCount.current = currentCount;
  }, [gameActivities.value.length, activities.value.length]);

  // Mark visible items as read after a delay
  useEffect(() => {
    if (activities.value.length === 0) return;

    const timer = setTimeout(() => {
      markAllAsRead();
    }, 5000); // Increased to 5s

    return () => clearTimeout(timer);
  }, [activities.value.length]);

  // Pull-to-refresh handlers
  const handleTouchStart = (e: TouchEvent) => {
    if (containerRef.current?.scrollTop === 0) {
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (containerRef.current?.scrollTop !== 0 || touchStartY.current === 0) return;

    const currentY = e.touches[0].clientY;
    const distance = Math.max(0, currentY - touchStartY.current);
    setPullDistance(Math.min(distance * 0.5, 80)); // Max 80px with resistance
  };

  const handleTouchEnd = () => {
    if (pullDistance > 60) {
      setIsRefreshing(true);
      // Simulate refresh (data is already real-time via Firebase)
      setTimeout(() => {
        setIsRefreshing(false);
        setPullDistance(0);
        showToast('Feed updated', 'success');
      }, 800);
    } else {
      setPullDistance(0);
    }
    touchStartY.current = 0;
  };

  // Handle activity item action
  const handleActivityAction = (action: string, item: ActivityItem) => {
    markAsRead(item.id);

    switch (action) {
      case 'join':
      case 'view':
        navigateToCheckIn(item.gameDate);
        break;
      case 'welcome':
        // Could open member profile or send welcome message
        break;
    }
  };

  // Handle game card action
  const handleGameAction = (game: GameActivity, _action: 'join' | 'view') => {
    navigateToCheckIn(game.gameDate);
  };

  // Get today's date for filtering
  const today = new Date().toISOString().split('T')[0];
  const isCheckedInToday = isUserCheckedIn(today);

  // Sort and filter game activities
  const formingGames = sortByUrgency(
    gameActivities.value.filter((g) => !g.isConfirmed)
  );
  const confirmedGames = gameActivities.value.filter((g) => g.isConfirmed);

  // Filter standalone activities (check-ins, new members, dissolved games)
  const standaloneActivities = activities.value.filter(
    (a) => a.type === 'checkin' || a.type === 'new-member' || a.type === 'game-dissolved'
  );

  const hasActivity =
    formingGames.length > 0 ||
    confirmedGames.length > 0 ||
    standaloneActivities.length > 0;

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ padding: 'var(--spacing-2xl, 16px) 0', position: 'relative' }}
    >
      {/* Pull-to-refresh indicator */}
      {(pullDistance > 0 || isRefreshing) && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: `translateX(-50%) translateY(${pullDistance - 40}px)`,
            transition: isRefreshing ? 'none' : 'transform 0.2s',
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--color-primary, #2C6E49)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              animation: isRefreshing ? 'spin 0.8s linear infinite' : 'none',
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="white"
              style={{
                transform: `rotate(${pullDistance * 3}deg)`,
              }}
            >
              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
            </svg>
          </div>
        </div>
      )}

      {/* Header with settings icon */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--spacing-2xl, 16px)',
          transform: pullDistance > 0 ? `translateY(${pullDistance}px)` : 'none',
          transition: pullDistance > 0 ? 'none' : 'transform 0.2s',
        }}
      >
        <h2 style={{ margin: 0, fontSize: 'var(--font-size-2xl, 20px)' }}>
          Feed
          {unreadCount.value > 0 && (
            <span
              style={{
                marginLeft: '8px',
                fontSize: 'var(--font-size-base, 14px)',
                color: 'var(--color-text-secondary, #666)',
                fontWeight: '400',
              }}
            >
              ({unreadCount.value} new)
            </span>
          )}
        </h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {unreadCount.value > 0 && (
            <button
              onClick={markAllAsRead}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-primary, #2C6E49)',
                fontSize: 'var(--font-size-sm, 13px)',
                cursor: 'pointer',
                padding: '4px 8px',
              }}
            >
              Mark read
            </button>
          )}

          {/* Settings gear icon */}
          <button
            onClick={() => {
              showSettings.value = true;
            }}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="var(--color-text-secondary, #666)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '16px',
          overflowX: 'auto',
          paddingBottom: '4px',
          transform: pullDistance > 0 ? `translateY(${pullDistance}px)` : 'none',
          transition: pullDistance > 0 ? 'none' : 'transform 0.2s',
        }}
      >
        {[
          { key: 'all' as const, label: 'All' },
          { key: 'forming' as const, label: `Forming${formingGames.length > 0 ? ` (${formingGames.length})` : ''}` },
          { key: 'confirmed' as const, label: `Confirmed${confirmedGames.length > 0 ? ` (${confirmedGames.length})` : ''}` },
          { key: 'recent' as const, label: 'Recent' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => { activityFilter.value = key; }}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              background: activityFilter.value === key
                ? 'var(--color-primary, #2C6E49)'
                : '#f0f0f0',
              color: activityFilter.value === key ? 'white' : '#666',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Settings Modal */}
      {showSettings.value && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            zIndex: 1002,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              showSettings.value = false;
            }
          }}
        >
          <div
            style={{
              background: 'var(--color-bg-card, white)',
              borderRadius: 'var(--radius-xl, 12px) var(--radius-xl, 12px) 0 0',
              width: '100%',
              maxWidth: '480px',
              maxHeight: '70vh',
              overflow: 'auto',
            }}
          >
            {/* Modal header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                borderBottom: '1px solid var(--color-border, #e0e0e0)',
                position: 'sticky',
                top: 0,
                background: 'var(--color-bg-card, white)',
              }}
            >
              <h3 style={{ margin: 0, fontSize: 'var(--font-size-lg, 17px)' }}>
                Notification Settings
              </h3>
              <button
                onClick={() => {
                  showSettings.value = false;
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  color: 'var(--color-text-muted, #999)',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                ×
              </button>
            </div>

            <ActivitySettings
              prefs={notificationPrefs.value}
              members={coreMembers.value}
              currentUser={sessionUser.value || ''}
              onUpdatePrefs={updateNotificationPrefs}
              onSave={saveNotificationPrefs}
            />
          </div>
        </div>
      )}

      {/* Main content with pull offset */}
      <div
        style={{
          transform: pullDistance > 0 ? `translateY(${pullDistance}px)` : 'none',
          transition: pullDistance > 0 ? 'none' : 'transform 0.2s',
        }}
      >
        {/* Loading state */}
        {isLoading.value && (
          <div
            style={{
              textAlign: 'center',
              padding: '32px',
              color: 'var(--color-text-secondary, #666)',
            }}
          >
            Loading activity...
          </div>
        )}

        {/* Empty state */}
        {!isLoading.value && !hasActivity && (
          <EmptyState onCheckIn={() => navigateToCheckIn()} />
        )}

        {/* Activity content */}
        {!isLoading.value && hasActivity && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Forming games - sorted by urgency */}
            {(activityFilter.value === 'all' || activityFilter.value === 'forming') && formingGames.length > 0 && (
              <div>
                {/* Header with Share All button */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px',
                  }}
                >
                  {activityFilter.value === 'all' && (
                    <h3
                      style={{
                        margin: 0,
                        fontSize: 'var(--font-size-md, 15px)',
                        color: 'var(--color-text-secondary, #666)',
                        fontWeight: '500',
                      }}
                    >
                      Games Forming
                    </h3>
                  )}
                  {activityFilter.value === 'forming' && <div />}

                  {/* Share All button - admin only */}
                  {isAdmin && (
                    <div style={{ position: 'relative' }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); showShareAllDropdown.value = !showShareAllDropdown.value; }}
                        style={{
                          background: '#1976D2',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '5px 10px',
                          fontSize: '11px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        Invite All
                        <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor">
                          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
                        </svg>
                      </button>

                      {/* Dropdown */}
                      {showShareAllDropdown.value && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            position: 'absolute',
                            top: '100%',
                            right: 0,
                            marginTop: '4px',
                            background: 'white',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            zIndex: 100,
                            overflow: 'hidden',
                            minWidth: '120px',
                          }}
                        >
                          {[
                            { method: 'whatsapp' as const, label: 'WhatsApp', color: '#25D366' },
                            { method: 'sms' as const, label: 'SMS', color: '#2196F3' },
                            { method: 'copy' as const, label: 'Copy', color: '#666' },
                          ].map(({ method, label, color }, i) => (
                            <button
                              key={method}
                              onClick={() => shareAllFormingGames(formingGames, method)}
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
                              {label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {formingGames.map((game) => {
                    const gameKey = `${game.gameDate}-${game.playStyle}`;
                    const isNew = newActivityIds.has(gameKey);
                    return (
                      <div
                        key={gameKey}
                        style={{
                          animation: isNew ? 'slideIn 0.3s ease-out' : 'none',
                        }}
                      >
                        <GameProgressCard
                          game={game}
                          currentUserCheckedIn={isUserCheckedIn(game.gameDate)}
                          currentUserInGame={isUserInGame(game)}
                          onJoin={(g) => handleGameAction(g, 'join')}
                          onView={(g) => handleGameAction(g, 'view')}
                          onShare={shareGame}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Invite prompt */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    marginTop: '12px',
                    padding: '10px',
                    fontSize: '13px',
                    color: '#666',
                  }}
                >
                  <span>Know a player?</span>
                  <button
                    onClick={() => openAddMemberDrawer()}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-primary, #2C6E49)',
                      fontWeight: '600',
                      fontSize: '13px',
                      cursor: 'pointer',
                      padding: '0',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    Invite to group
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Confirmed games */}
            {(activityFilter.value === 'all' || activityFilter.value === 'confirmed') && confirmedGames.length > 0 && (
              <div>
                {activityFilter.value === 'all' && (
                  <h3
                    style={{
                      margin: '0 0 12px 0',
                      fontSize: 'var(--font-size-md, 15px)',
                      color: 'var(--color-text-secondary, #666)',
                      fontWeight: '500',
                    }}
                  >
                    Confirmed Games
                  </h3>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {confirmedGames.map((game) => {
                    const gameKey = `${game.gameDate}-${game.playStyle}`;
                    return (
                      <GameProgressCard
                        key={gameKey}
                        game={game}
                        currentUserCheckedIn={isUserCheckedIn(game.gameDate)}
                        currentUserInGame={isUserInGame(game)}
                        onJoin={(g) => handleGameAction(g, 'join')}
                        onView={(g) => handleGameAction(g, 'view')}
                        onShare={shareGame}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Recent activity (new members, dissolved games) */}
            {(activityFilter.value === 'all' || activityFilter.value === 'recent') && standaloneActivities.length > 0 && (
              <div>
                {activityFilter.value === 'all' && (
                  <h3
                    style={{
                      margin: '0 0 12px 0',
                      fontSize: 'var(--font-size-md, 15px)',
                      color: 'var(--color-text-secondary, #666)',
                      fontWeight: '500',
                    }}
                  >
                    Recent
                  </h3>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {standaloneActivities.map((activity) => {
                    const isNew = newActivityIds.has(activity.id);
                    return (
                      <div
                        key={activity.id}
                        style={{
                          animation: isNew ? 'slideIn 0.3s ease-out' : 'none',
                        }}
                      >
                        <ActivityItemComponent
                          item={activity}
                          currentUserCheckedIn={isCheckedInToday}
                          onAction={handleActivityAction}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Empty state for filtered view */}
            {activityFilter.value === 'forming' && formingGames.length === 0 && (
              <div style={{ textAlign: 'center', padding: '32px', color: '#999' }}>
                No games forming right now
              </div>
            )}
            {activityFilter.value === 'confirmed' && confirmedGames.length === 0 && (
              <div style={{ textAlign: 'center', padding: '32px', color: '#999' }}>
                No confirmed games yet
              </div>
            )}
            {activityFilter.value === 'recent' && standaloneActivities.length === 0 && (
              <div style={{ textAlign: 'center', padding: '32px', color: '#999' }}>
                No recent activity
              </div>
            )}
          </div>
        )}
      </div>

      {/* CSS for animations */}
      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
