import { signal } from '@preact/signals';
import { useState, useEffect, useRef } from 'preact/hooks';
import { currentGroupName, sessionUser, currentGroupId, showToast } from '../App';
import { goToProfile } from '../navigation/BottomTabBar';
import { groupSettings, applyTheme } from '../../hooks/useFirebase';
import { getDatabase } from '../../config/firebase';

// Import local logo assets
import wimbledonLogo from '../../assets/logos/wimbledon.png';
import usOpenLogo from '../../assets/logos/usopen.png';

// UI state - exported for use in modals and ProfileTab
export const showActivityModal = signal(false);
export const showSettingsModal = signal(false);

// Theme definitions with official tournament logos
const THEMES = [
  {
    id: 'default',
    name: 'Classic',
    color: '#2C6E49',
    lightBg: '#E8F5E9', // Light green
    hoverBg: '#C8E6C9', // Slightly darker green for hover
    logo: null, // Uses tennis ball emoji
    emoji: '🎾',
  },
  {
    id: 'wimbledon',
    name: 'Wimbledon',
    color: '#1B5E20',
    lightBg: '#E8F5E9', // Wimbledon green light
    hoverBg: '#C8E6C9',
    logo: wimbledonLogo,
    emoji: '🏆',
  },
  {
    id: 'roland-garros',
    name: 'Roland-Garros',
    color: '#cc4e0e',
    lightBg: '#FBE9E7', // Clay/terracotta light
    hoverBg: '#FFCCBC',
    logo: 'https://images.prismic.io/fft-rg-site%2F95765448-c7fa-428b-b565-8368dba90b17_logo.svg',
    emoji: '🗼',
  },
  {
    id: 'australian-open',
    name: 'Australian Open',
    color: '#0277BD',
    lightBg: '#E1F5FE', // Light blue
    hoverBg: '#B3E5FC',
    logo: 'https://ausopen.com/sites/default/files/styles/medium/public/ao_blue_1.png?itok=dcy08jHH',
    emoji: '🦘',
  },
  {
    id: 'us-open',
    name: 'US Open',
    color: '#0D47A1',
    lightBg: '#E3F2FD', // US Open blue light
    hoverBg: '#BBDEFB',
    logo: usOpenLogo,
    emoji: '🗽',
  },
];

// Check if user is logged in as group admin
function isGroupAdmin(): boolean {
  const groupId = currentGroupId.value;
  if (!groupId) {
    return false;
  }
  return sessionStorage.getItem(`adminAuth_${groupId}`) === 'true';
}

export function Header() {
  const [adminStatus, setAdminStatus] = useState(isGroupAdmin());
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Re-check admin status periodically (for when user logs in as admin)
  useEffect(() => {
    const interval = setInterval(() => {
      setAdminStatus(isGroupAdmin());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowThemeDropdown(false);
      }
    }
    if (showThemeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showThemeDropdown]);

  // Get current theme info
  const currentTheme = groupSettings.value?.theme || 'default';
  const currentThemeInfo = THEMES.find((t) => t.id === currentTheme) || THEMES[0];

  // Handle theme selection
  const handleThemeSelect = async (themeId: string) => {
    applyTheme(themeId === 'default' ? undefined : themeId);
    const groupId = currentGroupId.value;
    if (groupId) {
      try {
        const db = getDatabase();
        await db
          .ref(`groups/${groupId}/settings/theme`)
          .set(themeId === 'default' ? null : themeId);
        groupSettings.value = {
          ...groupSettings.value,
          theme: themeId === 'default' ? undefined : themeId,
        };
        const themeName = THEMES.find((t) => t.id === themeId)?.name || 'Classic';
        showToast(`Theme: ${themeName}`, 'success');
      } catch (error) {
        console.error('Error saving theme:', error);
      }
    }
    setShowThemeDropdown(false);
  };

  return (
    <h1 style="display: flex; justify-content: space-between; align-items: center; gap: var(--spacing-md, 8px);">
      {/* Group name with theme icon (clickable by admin) */}
      <div
        ref={dropdownRef}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-sm, 6px)',
          minWidth: 0,
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (adminStatus) {
              setShowThemeDropdown(!showThemeDropdown);
            }
          }}
          title={adminStatus ? 'Change theme' : currentThemeInfo.name}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '28px',
            height: '28px',
            background: adminStatus ? 'var(--color-bg-card, white)' : 'transparent',
            border: adminStatus ? `2px solid ${currentThemeInfo.color}` : 'none',
            borderRadius: 'var(--radius-full, 50%)',
            cursor: adminStatus ? 'pointer' : 'default',
            fontSize: 'var(--font-size-lg, 16px)',
            padding: currentThemeInfo.logo ? '3px' : '0',
            flexShrink: 0,
            boxShadow: adminStatus ? 'var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.1))' : 'none',
          }}
          className={adminStatus ? 'hover-admin-badge' : ''}
        >
          {currentThemeInfo.logo ? (
            <img
              src={currentThemeInfo.logo}
              alt={currentThemeInfo.name}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = 'none';
                const sibling = img.nextElementSibling as HTMLElement | null;
                if (sibling) {
                  sibling.style.display = 'block';
                }
              }}
            />
          ) : null}
          <span style={{ display: currentThemeInfo.logo ? 'none' : 'block' }}>
            {currentThemeInfo.emoji}
          </span>
        </button>
        <span
          id="groupNameDisplay"
          style="font-size: var(--font-size-xl, 18px); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.3; padding-top: 2px;"
        >
          {currentGroupName.value || 'Tennis Coordinator'}
        </span>

        {/* Theme Dropdown (only shown for admins) */}
        {showThemeDropdown && adminStatus && (
          <div
            style={{
              position: 'absolute',
              top: '32px',
              left: '0',
              background: 'var(--color-bg-card, white)',
              borderRadius: 'var(--radius-xl, 12px)',
              boxShadow: 'var(--shadow-lg, 0 4px 20px rgba(0,0,0,0.15))',
              padding: 'var(--spacing-md, 8px)',
              minWidth: '180px',
              zIndex: 1000,
            }}
          >
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeSelect(theme.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-lg, 10px)',
                  width: '100%',
                  padding: 'var(--spacing-lg, 10px) var(--spacing-xl, 12px)',
                  background: currentTheme === theme.id ? `${theme.color}15` : 'transparent',
                  border: 'none',
                  borderRadius: 'var(--radius-lg, 8px)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (currentTheme !== theme.id) {
                    (e.currentTarget as HTMLElement).style.background =
                      'var(--color-bg-muted, #f5f5f5)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentTheme !== theme.id) {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }
                }}
              >
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {theme.logo ? (
                    <img
                      src={theme.logo}
                      alt={theme.name}
                      style={{ width: '24px', height: '24px', objectFit: 'contain' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <span style={{ fontSize: 'var(--font-size-2xl, 20px)' }}>{theme.emoji}</span>
                  )}
                </span>
                <span
                  style={{
                    flex: 1,
                    fontWeight: currentTheme === theme.id ? '600' : '400',
                    color:
                      currentTheme === theme.id ? theme.color : 'var(--color-text-primary, #333)',
                  }}
                >
                  {theme.name}
                </span>
                {currentTheme === theme.id && (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill={theme.color}>
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* User badge - compact with theme accent and clear hover state */}
      {sessionUser.value && (
        <button
          onClick={goToProfile}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-sm, 6px)',
            background: adminStatus
              ? 'var(--color-warning-light, #FFF3E0)'
              : currentThemeInfo.lightBg,
            border: `1px solid ${adminStatus ? 'var(--color-warning, #FF9800)' : currentThemeInfo.color}40`,
            borderLeft: adminStatus
              ? '3px solid var(--color-warning, #FF9800)'
              : `3px solid ${currentThemeInfo.color}`,
            borderRadius: 'var(--radius-lg, 8px)',
            padding: 'var(--spacing-sm, 6px) var(--spacing-lg, 10px)',
            fontSize: 'var(--font-size-base, 14px)',
            fontWeight: '600',
            color: 'var(--color-text-primary, #333)',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.1))',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget as HTMLElement;
            btn.style.boxShadow = 'var(--shadow-md, 0 2px 8px rgba(0,0,0,0.15))';
            btn.style.transform = 'translateY(-1px)';
            btn.style.background = adminStatus ? '#FFE0B2' : currentThemeInfo.hoverBg;
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget as HTMLElement;
            btn.style.boxShadow = 'var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.1))';
            btn.style.transform = 'translateY(0)';
            btn.style.background = adminStatus
              ? 'var(--color-warning-light, #FFF3E0)'
              : currentThemeInfo.lightBg;
          }}
          onMouseDown={(e) => {
            const btn = e.currentTarget as HTMLElement;
            btn.style.transform = 'translateY(0)';
            btn.style.boxShadow = 'var(--shadow-xs, 0 1px 2px rgba(0,0,0,0.1))';
          }}
          onMouseUp={(e) => {
            const btn = e.currentTarget as HTMLElement;
            btn.style.transform = 'translateY(-1px)';
            btn.style.boxShadow = 'var(--shadow-md, 0 2px 8px rgba(0,0,0,0.15))';
          }}
        >
          <span
            style={{
              maxWidth: '120px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {sessionUser.value}
          </span>
          {adminStatus && (
            <span
              style={{
                background: 'var(--color-warning, #FF9800)',
                color: 'white',
                fontSize: 'var(--font-size-2xs, 9px)',
                padding: '1px var(--spacing-xs, 4px)',
                borderRadius: 'var(--radius-md, 4px)',
                fontWeight: '600',
                letterSpacing: '0.5px',
              }}
            >
              ADMIN
            </span>
          )}
          {/* Arrow indicator for clickability */}
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="currentColor"
            style={{ opacity: 0.5, marginLeft: '-2px' }}
          >
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
          </svg>
        </button>
      )}
    </h1>
  );
}
