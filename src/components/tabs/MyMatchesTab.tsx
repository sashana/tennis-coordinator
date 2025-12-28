/**
 * MyMatchesTab - View user's scheduled matches across all dates
 */
import { sessionUser } from '../App';
import { useAllMatchNotes } from '../../hooks/useFirebase';
import { activeTab } from '../navigation/BottomTabBar';

// Import from extracted components
import {
  allUserMatches,
  gamesView,
  viewingUser,
  isSelectionMode,
  exitSelectionMode,
  isGroupAdmin,
} from './mymatches/myMatchesState';
import { SelectionModeBar } from './mymatches/SelectionModeBar';
import { MemberPicker } from './mymatches/MemberPicker';
import { MatchCard } from './mymatches/MatchCard';

// Segmented control for Upcoming/Past toggle
function GamesViewToggle({ upcomingCount, pastCount }: { upcomingCount: number; pastCount: number }) {
  return (
    <div
      style={{
        display: 'flex',
        background: 'var(--color-gray-lightest, #f0f0f0)',
        borderRadius: '10px',
        padding: '4px',
        marginBottom: '16px',
      }}
    >
      <button
        onClick={() => {
          gamesView.value = 'upcoming';
          exitSelectionMode();
        }}
        style={{
          flex: 1,
          padding: '10px 16px',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s',
          background: gamesView.value === 'upcoming' ? 'white' : 'transparent',
          color:
            gamesView.value === 'upcoming'
              ? 'var(--color-primary, #2C6E49)'
              : 'var(--color-gray-base, #666)',
          boxShadow: gamesView.value === 'upcoming' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
        }}
      >
        Upcoming ({upcomingCount})
      </button>
      <button
        onClick={() => {
          gamesView.value = 'past';
          exitSelectionMode();
        }}
        style={{
          flex: 1,
          padding: '10px 16px',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s',
          background: gamesView.value === 'past' ? 'white' : 'transparent',
          color:
            gamesView.value === 'past'
              ? 'var(--color-primary, #2C6E49)'
              : 'var(--color-gray-base, #666)',
          boxShadow: gamesView.value === 'past' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
        }}
      >
        Past ({pastCount})
      </button>
    </div>
  );
}

// Header with title and share button
function TabHeader({
  isViewingOther,
  isPastView,
  hasGames,
  inSelectionMode,
}: {
  isViewingOther: boolean;
  isPastView: boolean;
  hasGames: boolean;
  inSelectionMode: boolean;
}) {
  return (
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <h2 style="margin: 0; font-size: 20px;">
        {isViewingOther
          ? `${viewingUser.value}'s ${isPastView ? 'Past' : 'Upcoming'} Games`
          : `My ${isPastView ? 'Past' : 'Upcoming'} Games`}
      </h2>
      <div style="display: flex; gap: 8px; align-items: center;">
        {isViewingOther && (
          <button
            onClick={() => {
              viewingUser.value = null;
            }}
            style={{
              background: 'var(--color-gray-lightest, #f5f5f5)',
              border: '1px solid var(--color-gray-light, #ddd)',
              borderRadius: '16px',
              padding: '4px 12px',
              fontSize: '12px',
              cursor: 'pointer',
              color: 'var(--color-gray-base, #666)',
            }}
          >
            Back to mine
          </button>
        )}
        {!isViewingOther && hasGames && !inSelectionMode && (
          <button
            onClick={() => {
              isSelectionMode.value = true;
            }}
            style={{
              background: 'var(--color-gray-lightest, #f5f5f5)',
              border: '1px solid var(--color-gray-light, #ddd)',
              borderRadius: '16px',
              padding: '6px 12px',
              fontSize: '13px',
              cursor: 'pointer',
              color: 'var(--color-gray-base, #666)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
            </svg>
            Share
          </button>
        )}
      </div>
    </div>
  );
}

// Empty state when no games
function EmptyState({ isPastView, isViewingOther }: { isPastView: boolean; isViewingOther: boolean }) {
  return (
    <div style="text-align: center; padding: 48px 24px; background: #f9f9f9; border-radius: 12px;">
      <div style="font-size: 48px; margin-bottom: 16px;">{isPastView ? '📜' : '📅'}</div>
      <p style="font-size: 18px; margin: 0 0 8px 0; color: var(--color-gray-dark, #333);">
        {isPastView ? 'No past games' : 'No upcoming games'}
      </p>
      <p style="font-size: 14px; color: var(--color-gray-base, #666); margin: 0 0 16px 0;">
        {isPastView
          ? isViewingOther
            ? `${viewingUser.value} has no past games on record.`
            : 'Your game history will appear here.'
          : isViewingOther
            ? `${viewingUser.value} has no upcoming games.`
            : 'Check in for a date to get matched with other players!'}
      </p>
      {/* Check In button for upcoming empty state (only for self, not when viewing others) */}
      {!isPastView && !isViewingOther && (
        <button
          onClick={() => {
            activeTab.value = 'checkin';
          }}
          style={{
            background: 'var(--color-primary, #2C6E49)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(var(--color-primary-rgb, 44, 110, 73), 0.25)',
          }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
          Check In
        </button>
      )}
    </div>
  );
}

export function MyMatchesTab() {
  // Load all match notes for upcoming games
  useAllMatchNotes();

  // Get schedule based on current view (upcoming or past)
  const allMatches = allUserMatches.value;
  const schedule = gamesView.value === 'upcoming' ? allMatches.upcoming : allMatches.past;
  const isAdmin = isGroupAdmin();
  const currentViewUser = viewingUser.value || sessionUser.value;
  const isViewingOther = viewingUser.value && viewingUser.value !== sessionUser.value;
  const inSelectionMode = isSelectionMode.value;
  const isPastView = gamesView.value === 'past';

  return (
    <div style="padding: 16px 0;">
      {/* Selection mode bottom bar */}
      {inSelectionMode && <SelectionModeBar schedule={schedule} />}

      {/* Segmented control for Upcoming/Past */}
      <GamesViewToggle upcomingCount={allMatches.upcoming.length} pastCount={allMatches.past.length} />

      {/* Header */}
      <TabHeader
        isViewingOther={!!isViewingOther}
        isPastView={isPastView}
        hasGames={schedule.length > 0}
        inSelectionMode={inSelectionMode}
      />

      {/* Admin user selector */}
      {isAdmin && !isViewingOther && <MemberPicker />}

      {/* Games list or empty state */}
      {schedule.length === 0 ? (
        <EmptyState isPastView={isPastView} isViewingOther={!!isViewingOther} />
      ) : (
        <div style="display: flex; flex-direction: column; gap: 12px;">
          {schedule.map((match, idx) => (
            <MatchCard
              key={idx}
              match={match}
              idx={idx}
              currentViewUser={currentViewUser || ''}
            />
          ))}
        </div>
      )}

      {schedule.length > 0 && (
        <p style="font-size: 13px; color: var(--color-gray-muted, #999); text-align: center; margin-top: 16px;">
          {isPastView
            ? "Tap a game to view that day's history"
            : "Tap a game to view that day's details"}
        </p>
      )}
    </div>
  );
}
