import { useState, useEffect } from 'preact/hooks';
import { signal } from '@preact/signals';
import { currentGroupId, coreMembers, memberDetails, allCheckins, sessionUser } from '../App';
import { openAddMemberDrawer } from '../features/AddMemberDrawer';
import { openEditMemberDrawer } from '../features/EditMemberDrawer';
import { currentPlatformUser } from '../../hooks/usePlatformUser';
import { sport } from '../../config/sport';

// Track which member's contact dropdown is open
const activeContactDropdown = signal<string | null>(null);

// Close dropdown when clicking outside
if (typeof document !== 'undefined') {
  document.addEventListener('click', (e) => {
    if (activeContactDropdown.value) {
      const target = e.target as HTMLElement;
      if (!target.closest('.contact-dropdown') && !target.closest('[data-contact-button]')) {
        activeContactDropdown.value = null;
      }
    }
  });
}

// Check if user is logged in as group admin
function isGroupAdmin(): boolean {
  const groupId = currentGroupId.value;
  if (!groupId) {
    return false;
  }
  return sessionStorage.getItem(`adminAuth_${groupId}`) === 'true';
}

// Get member stats from checkins
function getMemberStats(memberName: string): { totalGames: number; lastPlayDate: Date | null; upcomingDates: string[] } {
  const checkins = allCheckins.value;
  if (!checkins) {
    return { totalGames: 0, lastPlayDate: null, upcomingDates: [] };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let totalGames = 0;
  let lastPlayDate: Date | null = null;
  const upcomingDates: string[] = [];

  Object.keys(checkins).forEach((dateStr) => {
    const dateCheckins = checkins[dateStr];
    if (!dateCheckins || !Array.isArray(dateCheckins)) return;

    const [year, month, day] = dateStr.split('-').map(Number);
    const checkDate = new Date(year, month - 1, day);
    checkDate.setHours(0, 0, 0, 0);

    const memberCheckedIn = dateCheckins.some(
      (checkin: any) => checkin && checkin.name === memberName
    );

    if (memberCheckedIn) {
      if (checkDate < today) {
        // Past date - count as game played
        totalGames++;
        if (!lastPlayDate || checkDate > lastPlayDate) {
          lastPlayDate = checkDate;
        }
      } else {
        // Today or future - add to upcoming
        upcomingDates.push(dateStr);
      }
    }
  });

  // Sort upcoming dates
  upcomingDates.sort();

  return { totalGames, lastPlayDate, upcomingDates };
}

// Format date for display
function formatDate(date: Date): string {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);

  const diffTime = now.getTime() - compareDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Format upcoming date
function formatUpcomingDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);

  if (checkDate.getTime() === today.getTime()) return 'Today';
  if (checkDate.getTime() === tomorrow.getTime()) return 'Tomorrow';
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

// Send invite message
function sendInvite(memberName: string, method: 'whatsapp' | 'sms', phone: string) {
  const groupId = currentGroupId.value;
  const appUrl = `${window.location.origin}${window.location.pathname}#${groupId}`;

  const message = `Hey ${memberName}! 🎾 We need players for upcoming ${sport.name.toLowerCase()} games. Can you check in? ${appUrl}`;
  const cleanPhone = phone.replace(/\D/g, '');

  if (method === 'whatsapp') {
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  } else {
    window.open(`sms:${cleanPhone}?body=${encodeURIComponent(message)}`, '_blank');
  }
}

type FilterType = 'all' | 'active';
type SortType = 'activity' | 'name' | 'games';

export function DirectoryTab() {
  const [adminStatus, setAdminStatus] = useState(isGroupAdmin());
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('activity');

  useEffect(() => {
    const interval = setInterval(() => {
      setAdminStatus(isGroupAdmin());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Process members with stats
  const membersWithStats = (coreMembers.value || []).map((memberName) => {
    const stats = getMemberStats(memberName);
    const details = memberDetails.value?.[memberName];
    const isCurrentUser = sessionUser.value && memberName === sessionUser.value;

    // For current user, prefer platform user contact info
    const platformProfile = isCurrentUser ? currentPlatformUser.value?.profile : null;
    const effectivePhone = platformProfile?.phone || details?.phone;
    const effectiveEmail = platformProfile?.email || details?.email;
    const shareContact = details?.shareContactInDirectory === true;
    const hasContact = shareContact && (effectivePhone || effectiveEmail);

    // Check if active in last 14 days
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    const isActive = stats.lastPlayDate && stats.lastPlayDate >= twoWeeksAgo;

    return {
      name: memberName,
      stats,
      details,
      isCurrentUser,
      effectivePhone,
      effectiveEmail,
      hasContact,
      shareContact,
      isActive: isActive || stats.upcomingDates.length > 0,
    };
  });

  // Filter and sort
  let filteredMembers = membersWithStats
    .filter((m) => m.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((m) => filter === 'all' || m.isActive);

  // Sort
  filteredMembers.sort((a, b) => {
    // Current user always first
    if (a.isCurrentUser) return -1;
    if (b.isCurrentUser) return 1;

    if (sortBy === 'activity') {
      // By last activity (most recent first)
      const aTime = a.stats.upcomingDates.length > 0 ? Date.now() : (a.stats.lastPlayDate?.getTime() || 0);
      const bTime = b.stats.upcomingDates.length > 0 ? Date.now() : (b.stats.lastPlayDate?.getTime() || 0);
      if (aTime !== bTime) return bTime - aTime;
      return a.name.localeCompare(b.name);
    }
    if (sortBy === 'games') {
      if (a.stats.totalGames !== b.stats.totalGames) return b.stats.totalGames - a.stats.totalGames;
      return a.name.localeCompare(b.name);
    }
    return a.name.localeCompare(b.name);
  });

  const activeCount = membersWithStats.filter((m) => m.isActive).length;

  return (
    <div style="padding: var(--spacing-2xl, 16px) 0;">
      <h2 style="margin: 0 0 var(--spacing-2xl, 16px) 0; font-size: var(--font-size-3xl, 20px);">
        Group Members
      </h2>

      {/* Search Bar */}
      <div style={{ marginBottom: 'var(--spacing-xl, 12px)' }}>
        <input
          type="text"
          value={searchQuery}
          onInput={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
          placeholder="🔍 Search members..."
          style={{
            width: '100%',
            padding: 'var(--spacing-xl, 12px) var(--spacing-2xl, 16px)',
            border: '1px solid var(--color-border-light, #ddd)',
            borderRadius: 'var(--radius-xl, 12px)',
            fontSize: '16px',
            boxSizing: 'border-box',
            background: 'var(--color-bg-card, #fff)',
          }}
        />
      </div>

      {/* Filter and Sort Row */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: 'var(--spacing-xl, 12px)', flexWrap: 'wrap' }}>
        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {[
            { id: 'all' as FilterType, label: 'All' },
            { id: 'active' as FilterType, label: `Active (${activeCount})` },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                padding: '6px 12px',
                borderRadius: '16px',
                border: 'none',
                background: filter === f.id ? 'var(--color-primary, #2C6E49)' : '#f0f0f0',
                color: filter === f.id ? 'white' : '#666',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy((e.target as HTMLSelectElement).value as SortType)}
          style={{
            padding: '6px 10px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            background: 'white',
            fontSize: '12px',
            color: '#666',
            cursor: 'pointer',
            marginLeft: 'auto',
          }}
        >
          <option value="activity">Sort: Recent</option>
          <option value="games">Sort: Games</option>
          <option value="name">Sort: A-Z</option>
        </select>
      </div>

      {/* Invite Member Button */}
      <button
        onClick={() => {
          openAddMemberDrawer();
        }}
        style={{
          width: '100%',
          padding: '14px',
          background: 'var(--color-primary, #2C6E49)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '15px',
          fontWeight: '500',
          cursor: 'pointer',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
          <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
        Invite Member
      </button>

      {/* Member List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl, 12px)' }}>
        {filteredMembers.length === 0 ? (
          <div
            style={{
              background: 'var(--color-bg-card, #fff)',
              borderRadius: 'var(--radius-xl, 12px)',
              padding: '40px 20px',
              textAlign: 'center',
              border: '1px solid var(--color-border, #e0e0e0)',
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="48"
              height="48"
              fill="var(--color-border-light, #ddd)"
              style={{ marginBottom: 'var(--spacing-xl, 12px)' }}
            >
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
            <p style={{ color: 'var(--color-text-muted, #999)', fontSize: 'var(--font-size-md, 15px)', margin: 0 }}>
              {searchQuery ? 'No members found' : filter === 'active' ? 'No active members' : 'No members in group yet'}
            </p>
          </div>
        ) : (
          filteredMembers.map((member) => {
            const { name: memberName, stats, details, isCurrentUser, effectivePhone, effectiveEmail, hasContact, shareContact } = member;
            const shareNotes = details?.shareNotesInDirectory === true;
            const hasNotes = shareNotes && details?.notes;
            const hasUpcoming = stats.upcomingDates.length > 0;

            return (
              <div
                key={memberName}
                style={{
                  background: isCurrentUser
                    ? 'var(--color-primary-light, #e8f5e9)'
                    : 'var(--color-bg-card, #fff)',
                  borderRadius: 'var(--radius-xl, 12px)',
                  padding: 'var(--spacing-2xl, 16px)',
                  border: isCurrentUser
                    ? '2px solid var(--color-primary, #2C6E49)'
                    : '1px solid var(--color-border, #e0e0e0)',
                }}
              >
                {/* Header Row: Name + Badges + Edit */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  {/* Name */}
                  <div style={{ fontWeight: 600, fontSize: '16px', color: 'var(--color-text-primary, #333)' }}>
                    {memberName}
                    {isCurrentUser && (
                      <span style={{ marginLeft: '6px', fontSize: '12px', color: 'var(--color-primary, #2C6E49)', fontWeight: '500' }}>
                        (You)
                      </span>
                    )}
                  </div>

                  {/* Upcoming badge */}
                  {hasUpcoming && (
                    <span
                      style={{
                        background: '#E8F5E9',
                        color: '#2C6E49',
                        fontSize: '10px',
                        fontWeight: '600',
                        padding: '2px 8px',
                        borderRadius: '10px',
                      }}
                    >
                      {sport.sportEmoji} Playing {formatUpcomingDate(stats.upcomingDates[0])}
                    </span>
                  )}

                  <div style={{ flex: 1 }} />

                  {/* Edit Button */}
                  {(isCurrentUser || adminStatus) && (
                    <button
                      onClick={() => openEditMemberDrawer(memberName)}
                      style={{
                        background: 'transparent',
                        color: 'var(--color-text-muted, #999)',
                        border: 'none',
                        padding: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      title={isCurrentUser ? 'Edit your profile' : 'Edit member'}
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Stats Row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#888', marginBottom: '10px' }}>
                  {/* Games played */}
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="#888">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    {stats.totalGames} {stats.totalGames === 1 ? 'game' : 'games'}
                  </span>

                  {/* Last played */}
                  {stats.lastPlayDate && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="#888">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                      </svg>
                      Played {formatDate(stats.lastPlayDate)}
                    </span>
                  )}

                  {!stats.lastPlayDate && !hasUpcoming && (
                    <span style={{ color: '#bbb', fontStyle: 'italic' }}>New member</span>
                  )}
                </div>

                {/* Contact Button with Dropdown */}
                {!isCurrentUser && (hasContact || (shareContact && effectivePhone)) && (() => {
                  const isDropdownOpen = activeContactDropdown.value === memberName;
                  const needsInvite = !hasUpcoming && shareContact && effectivePhone;

                  return (
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <button
                        data-contact-button
                        onClick={(e) => {
                          e.stopPropagation();
                          activeContactDropdown.value = isDropdownOpen ? null : memberName;
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 12px',
                          background: needsInvite ? '#FF9800' : 'var(--color-primary, #2C6E49)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer',
                        }}
                      >
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="white">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                        {needsInvite ? 'Invite' : 'Contact'}
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="white">
                          <path d="M7 10l5 5 5-5z" />
                        </svg>
                      </button>

                      {isDropdownOpen && (
                        <div
                          className="contact-dropdown"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            marginTop: '4px',
                            background: 'white',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            zIndex: 100,
                            overflow: 'hidden',
                            minWidth: '140px',
                          }}
                        >
                          {/* Invite option - if member not checked in */}
                          {needsInvite && (
                            <button
                              onClick={() => {
                                sendInvite(memberName, 'whatsapp', effectivePhone!);
                                activeContactDropdown.value = null;
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 12px',
                                width: '100%',
                                border: 'none',
                                background: '#FFF3E0',
                                cursor: 'pointer',
                                fontSize: '13px',
                                color: '#E65100',
                                fontWeight: '500',
                              }}
                            >
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="#FF9800">
                                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
                              </svg>
                              Invite to Play
                            </button>
                          )}

                          {/* WhatsApp */}
                          {effectivePhone && (
                            <a
                              href={`https://wa.me/${effectivePhone.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => { activeContactDropdown.value = null; }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 12px',
                                width: '100%',
                                border: 'none',
                                background: 'white',
                                cursor: 'pointer',
                                fontSize: '13px',
                                color: '#25D366',
                                textDecoration: 'none',
                                borderTop: needsInvite ? '1px solid #f0f0f0' : 'none',
                              }}
                            >
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="#25D366">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                              </svg>
                              WhatsApp
                            </a>
                          )}

                          {/* SMS */}
                          {effectivePhone && (
                            <a
                              href={`sms:${effectivePhone}`}
                              onClick={() => { activeContactDropdown.value = null; }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 12px',
                                width: '100%',
                                border: 'none',
                                background: 'white',
                                cursor: 'pointer',
                                fontSize: '13px',
                                color: '#2196F3',
                                textDecoration: 'none',
                                borderTop: '1px solid #f0f0f0',
                              }}
                            >
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="#2196F3">
                                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z" />
                              </svg>
                              SMS
                            </a>
                          )}

                          {/* Email */}
                          {effectiveEmail && (
                            <a
                              href={`mailto:${effectiveEmail}`}
                              onClick={() => { activeContactDropdown.value = null; }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 12px',
                                width: '100%',
                                border: 'none',
                                background: 'white',
                                cursor: 'pointer',
                                fontSize: '13px',
                                color: '#666',
                                textDecoration: 'none',
                                borderTop: '1px solid #f0f0f0',
                              }}
                            >
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="#666">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                              </svg>
                              Email
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Notes */}
                {hasNotes && (
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#666',
                      marginTop: '10px',
                      padding: '8px',
                      background: 'var(--color-bg-subtle, #f9f9f9)',
                      borderRadius: '6px',
                      fontStyle: 'italic',
                    }}
                  >
                    "{details.notes}"
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Stats Footer */}
      {coreMembers.value.length > 0 && !searchQuery && (
        <div
          style={{
            marginTop: 'var(--spacing-2xl, 16px)',
            padding: 'var(--spacing-2xl, 16px)',
            background: 'var(--color-bg-card, #fff)',
            borderRadius: 'var(--radius-xl, 12px)',
            border: '1px solid var(--color-border, #e0e0e0)',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '13px', color: '#666' }}>
            <span style={{ fontWeight: '600', color: '#333' }}>{coreMembers.value.length}</span>
            {' '}{coreMembers.value.length === 1 ? 'member' : 'members'} in group
            {activeCount > 0 && (
              <span style={{ marginLeft: '8px', color: '#2C6E49' }}>
                • {activeCount} active
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
