import { useState, useEffect } from 'preact/hooks';
import { currentGroupId, coreMembers, memberDetails, allCheckins, sessionUser } from '../App';
import { openAddMemberDrawer } from '../features/AddMemberDrawer';
import { openEditMemberDrawer } from '../features/EditMemberDrawer';
import { currentPlatformUser } from '../../hooks/usePlatformUser';

// Check if user is logged in as group admin
function isGroupAdmin(): boolean {
  const groupId = currentGroupId.value;
  if (!groupId) {
    return false;
  }
  return sessionStorage.getItem(`adminAuth_${groupId}`) === 'true';
}

// Get last play date for a member
function getLastPlayDate(memberName: string): Date | null {
  const checkins = allCheckins.value;
  if (!checkins) {
    return null;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let lastDate: Date | null = null;
  let lastDateStr: string = '';

  // Get all PAST dates where this member checked in (excluding future dates)
  const memberDates: string[] = [];
  Object.keys(checkins).forEach((dateStr) => {
    const dateCheckins = checkins[dateStr];
    if (!dateCheckins || !Array.isArray(dateCheckins)) {
      return;
    }

    // Parse date to check if it's in the past or today
    const [year, month, day] = dateStr.split('-').map(Number);
    const checkDate = new Date(year, month - 1, day);
    checkDate.setHours(0, 0, 0, 0);

    // Only include dates that are today or in the past
    if (checkDate <= today) {
      // Check if this member checked in on this date
      const memberCheckedIn = dateCheckins.some(
        (checkin: any) => checkin && checkin.name === memberName
      );

      if (memberCheckedIn) {
        memberDates.push(dateStr);
      }
    }
  });

  // Sort dates in descending order (most recent first)
  memberDates.sort((a, b) => b.localeCompare(a));

  if (memberDates.length > 0) {
    lastDateStr = memberDates[0];
    // Parse the date string (format: YYYY-MM-DD)
    const [year, month, day] = lastDateStr.split('-').map(Number);
    lastDate = new Date(year, month - 1, day);
  }

  return lastDate;
}

// Format date for display
function formatDate(date: Date): string {
  // Set both dates to midnight to avoid time-of-day issues
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);

  const diffTime = now.getTime() - compareDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Today';
  }
  if (diffDays === 1) {
    return 'Yesterday';
  }
  if (diffDays < 7) {
    return `${diffDays} days ago`;
  }
  if (diffDays < 30) {
    return `${Math.floor(diffDays / 7)} weeks ago`;
  }

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function DirectoryTab() {
  const [adminStatus, setAdminStatus] = useState(isGroupAdmin());
  const [searchQuery, setSearchQuery] = useState('');

  // Re-check admin status periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setAdminStatus(isGroupAdmin());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style="padding: var(--spacing-2xl, 16px) 0;">
      <h2 style="margin: 0 0 var(--spacing-2xl, 16px) 0; font-size: var(--font-size-3xl, 20px);">
        {adminStatus ? 'Team Directory' : 'Team Directory'}
      </h2>

      {/* Search Bar */}
      <div style={{ marginBottom: 'var(--spacing-2xl, 16px)' }}>
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
            fontSize: 'var(--font-size-md, 15px)',
            boxSizing: 'border-box',
            background: 'var(--color-bg-card, #fff)',
          }}
        />
      </div>

      {/* Add Member Button (Available to Everyone) */}
      <button
        onClick={() => {
          openAddMemberDrawer();
        }}
        style={{
          width: '100%',
          padding: 'var(--spacing-xl, 14px)',
          background: 'var(--color-primary, #2C6E49)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-xl, 12px)',
          fontSize: 'var(--font-size-md, 15px)',
          fontWeight: '500',
          cursor: 'pointer',
          marginBottom: 'var(--spacing-2xl, 16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--spacing-md, 8px)',
        }}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
          <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
        Add New Member
      </button>

      {/* Member List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl, 12px)' }}>
        {(() => {
          const members = coreMembers.value || [];
          const filteredMembers = members
            .filter((memberName) => memberName.toLowerCase().includes(searchQuery.toLowerCase()))
            .sort((a, b) => a.localeCompare(b));

          if (filteredMembers.length === 0) {
            return (
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
                <p
                  style={{
                    color: 'var(--color-text-muted, #999)',
                    fontSize: 'var(--font-size-md, 15px)',
                    margin: 0,
                  }}
                >
                  {searchQuery ? 'No members found' : 'No members in team yet'}
                </p>
              </div>
            );
          }

          return filteredMembers.map((memberName) => {
            const details = memberDetails.value?.[memberName];
            const lastPlayDate = getLastPlayDate(memberName);
            const isCurrentUser = sessionUser.value && memberName === sessionUser.value;

            // For current user, prefer platform user contact info (shared across groups)
            const platformProfile = isCurrentUser ? currentPlatformUser.value?.profile : null;
            const effectivePhone = platformProfile?.phone || details?.phone;
            const effectiveEmail = platformProfile?.email || details?.email;

            const shareContact = details?.shareContactInDirectory === true;
            const hasContact = shareContact && (effectivePhone || effectiveEmail);
            const shareNotes = details?.shareNotesInDirectory === true;
            const hasNotes = shareNotes && details?.notes;

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
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyContent: 'space-between',
                    gap: 'var(--spacing-xl, 12px)',
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Name */}
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 'var(--font-size-lg, 16px)',
                        color: 'var(--color-text-primary, #333)',
                        marginBottom: 'var(--spacing-md, 8px)',
                      }}
                    >
                      {memberName}
                      {isCurrentUser && (
                        <span
                          style={{
                            marginLeft: 'var(--spacing-md, 8px)',
                            fontSize: 'var(--font-size-sm, 12px)',
                            color: 'var(--color-primary, #2C6E49)',
                            fontWeight: '500',
                          }}
                        >
                          (You)
                        </span>
                      )}
                    </div>

                    {/* Last Play Date (visible to everyone) */}
                    {lastPlayDate && (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--spacing-sm, 6px)',
                          fontSize: 'var(--font-size-sm, 13px)',
                          color: 'var(--color-text-secondary, #666)',
                          marginBottom: 'var(--spacing-md, 8px)',
                        }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="14"
                          height="14"
                          fill="var(--color-text-muted, #888)"
                        >
                          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                        </svg>
                        Last played: {formatDate(lastPlayDate)}
                      </div>
                    )}

                    {!lastPlayDate && (
                      <div
                        style={{
                          fontSize: 'var(--font-size-sm, 13px)',
                          color: 'var(--color-text-muted, #999)',
                          marginBottom: 'var(--spacing-md, 8px)',
                        }}
                      >
                        No recent games
                      </div>
                    )}

                    {/* Added By Info (visible to everyone) */}
                    {details?.addedBy && (
                      <div
                        style={{
                          fontSize: 'var(--font-size-sm, 12px)',
                          color: 'var(--color-text-muted, #999)',
                          marginBottom: 'var(--spacing-md, 8px)',
                        }}
                      >
                        Added by {details.addedBy}
                        {details.addedDate &&
                          ` • ${new Date(details.addedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}
                      </div>
                    )}

                    {/* Contact Buttons (only if member opted in) */}
                    {hasContact && (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--spacing-md, 8px)',
                          marginTop: 'var(--spacing-md, 8px)',
                          flexWrap: 'wrap',
                        }}
                      >
                        {effectivePhone && (
                          <>
                            {/* WhatsApp */}
                            <a
                              href={`https://wa.me/${effectivePhone.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-xs, 4px)',
                                padding: 'var(--spacing-xs, 6px) var(--spacing-sm, 10px)',
                                background: '#25D366',
                                color: 'white',
                                borderRadius: 'var(--radius-md, 6px)',
                                textDecoration: 'none',
                                fontSize: 'var(--font-size-sm, 13px)',
                                fontWeight: '500',
                              }}
                              className="hover-opacity"
                              title="Message on WhatsApp"
                            >
                              <svg viewBox="0 0 24 24" width="14" height="14" fill="white">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                              </svg>
                              WhatsApp
                            </a>
                            {/* SMS */}
                            <a
                              href={`sms:${effectivePhone}`}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-xs, 4px)',
                                padding: 'var(--spacing-xs, 6px) var(--spacing-sm, 10px)',
                                background: 'var(--color-info, #2196F3)',
                                color: 'white',
                                borderRadius: 'var(--radius-md, 6px)',
                                textDecoration: 'none',
                                fontSize: 'var(--font-size-sm, 13px)',
                                fontWeight: '500',
                              }}
                              className="hover-opacity"
                              title="Send SMS"
                            >
                              <svg viewBox="0 0 24 24" width="14" height="14" fill="white">
                                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z" />
                              </svg>
                              SMS
                            </a>
                          </>
                        )}
                        {effectiveEmail && (
                          <a
                            href={`mailto:${effectiveEmail}`}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 'var(--spacing-xs, 4px)',
                              padding: 'var(--spacing-xs, 6px) var(--spacing-sm, 10px)',
                              background: 'var(--color-text-secondary, #666)',
                              color: 'white',
                              borderRadius: 'var(--radius-md, 6px)',
                              textDecoration: 'none',
                              fontSize: 'var(--font-size-sm, 13px)',
                              fontWeight: '500',
                            }}
                            className="hover-opacity"
                            title="Send email"
                          >
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="white">
                              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                            </svg>
                            Email
                          </a>
                        )}
                      </div>
                    )}

                    {/* Notes (only if member opted in to share) */}
                    {hasNotes && (
                      <div
                        style={{
                          fontSize: 'var(--font-size-sm, 13px)',
                          color: 'var(--color-text-secondary, #666)',
                          marginTop: 'var(--spacing-md, 8px)',
                          padding: 'var(--spacing-md, 8px)',
                          background: 'var(--color-bg-subtle, #f9f9f9)',
                          borderRadius: 'var(--radius-md, 6px)',
                          fontStyle: 'italic',
                        }}
                      >
                        "{details.notes}"
                      </div>
                    )}
                  </div>

                  {/* Edit Button - for current user or admin */}
                  {(isCurrentUser || adminStatus) && (
                    <button
                      onClick={() => openEditMemberDrawer(memberName)}
                      style={{
                        background: isCurrentUser
                          ? 'var(--color-primary, #2C6E49)'
                          : 'var(--color-bg-muted, #f5f5f5)',
                        color: isCurrentUser ? 'white' : 'var(--color-text-secondary, #666)',
                        border: isCurrentUser ? 'none' : '1px solid var(--color-border, #e0e0e0)',
                        padding: 'var(--spacing-md, 8px) var(--spacing-xl, 12px)',
                        cursor: 'pointer',
                        borderRadius: 'var(--radius-lg, 8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        fontSize: 'var(--font-size-base, 14px)',
                        fontWeight: '500',
                        whiteSpace: 'nowrap',
                      }}
                      title={isCurrentUser ? 'Edit your profile' : 'Edit member'}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill={isCurrentUser ? 'white' : 'var(--color-text-secondary, #666)'}
                        style={{ marginRight: 'var(--spacing-xs, 4px)' }}
                      >
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                      </svg>
                      Edit
                    </button>
                  )}
                </div>
              </div>
            );
          });
        })()}
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
          <div
            style={{
              fontSize: 'var(--font-size-sm, 13px)',
              color: 'var(--color-text-secondary, #666)',
            }}
          >
            <span style={{ fontWeight: '600', color: 'var(--color-text-primary, #333)' }}>
              {coreMembers.value.length}
            </span>{' '}
            {coreMembers.value.length === 1 ? 'member' : 'members'} in team
          </div>
        </div>
      )}
    </div>
  );
}
