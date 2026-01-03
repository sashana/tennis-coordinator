import { signal } from '@preact/signals';
import { useEffect, useState } from 'preact/hooks';
import { activityUnreadCount } from '../../hooks/useActivityFeed';
import { sport } from '../../config/sport';

// Navigation state
export type TabId = 'checkin' | 'matches' | 'notifications' | 'directory' | 'profile';
export const activeTab = signal<TabId>('checkin');

// Helper to navigate to profile (used by Header)
export function goToProfile() {
  activeTab.value = 'profile';
}

interface TabConfig {
  id: TabId;
  label: string;
  icon: string;
  activeIcon: string;
  useImageIcon?: boolean; // If true, icon/activeIcon are image URLs instead of SVG strings
}

const tabs: TabConfig[] = [
  {
    id: 'checkin',
    label: 'Check-in',
    icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/></svg>`,
    activeIcon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/></svg>`,
  },
  {
    id: 'matches',
    label: 'My Games',
    // Use sport-specific icon if available, otherwise generic ball icon
    icon: sport.sportIcon
      ? sport.sportIcon
      : `<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="10" fill="currentColor"/></svg>`,
    activeIcon: sport.sportIcon
      ? sport.sportIcon
      : `<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="10" fill="currentColor"/></svg>`,
    useImageIcon: !!sport.sportIcon,
  },
  {
    id: 'notifications',
    label: 'Feed',
    // Feed/stream icon - stacked cards representing updates
    icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>`,
    activeIcon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M3 5h18c.55 0 1 .45 1 1s-.45 1-1 1H3c-.55 0-1-.45-1-1s.45-1 1-1zm0 6h18c.55 0 1 .45 1 1s-.45 1-1 1H3c-.55 0-1-.45-1-1s.45-1 1-1zm0 6h18c.55 0 1 .45 1 1s-.45 1-1 1H3c-.55 0-1-.45-1-1s.45-1 1-1z"/></svg>`,
  },
  {
    id: 'directory',
    label: 'Group',
    icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`,
    activeIcon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`,
  },
  // Help and Profile tabs removed from bottom nav - access via Profile tab
];

export function BottomTabBar() {
  // Track if component has mounted - used to trigger re-render for safe area calculation
  const [mounted, setMounted] = useState(false);

  // Force re-render after mount to ensure safe area values are properly evaluated
  // This fixes the initial render padding issue in PWA mode
  useEffect(() => {
    // Use requestAnimationFrame to ensure layout is complete before triggering re-render
    const rafId = requestAnimationFrame(() => {
      // Double RAF ensures styles have been computed
      requestAnimationFrame(() => {
        setMounted(true);
      });
    });
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '480px',
        // Use calc to add safe area for devices with home indicator
        height: 'calc(56px + env(safe-area-inset-bottom, 0px))',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        background: '#fff',
        borderTop: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        paddingTop: '4px',
        zIndex: 1000,
        boxShadow: 'var(--shadow-lg, 0 -2px 10px rgba(0,0,0,0.1))',
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab.value === tab.id;
        const showBadge = tab.id === 'notifications' && activityUnreadCount.value > 0;

        return (
          <button
            key={tab.id}
            onClick={() => {
              activeTab.value = tab.id;
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              background: 'none',
              border: 'none',
              padding: '8px 12px',
              cursor: 'pointer',
              color: isActive ? 'var(--color-primary, #2C6E49)' : '#666',
              position: 'relative',
              minWidth: '60px',
            }}
          >
            {tab.useImageIcon ? (
              <img
                src={isActive ? tab.activeIcon : tab.icon}
                alt={tab.label}
                style={{
                  width: '24px',
                  height: '24px',
                  opacity: isActive ? 1 : 0.7,
                }}
              />
            ) : (
              <div
                style={{ position: 'relative' }}
                dangerouslySetInnerHTML={{ __html: isActive ? tab.activeIcon : tab.icon }}
              />
            )}
            {showBadge && (
              <span
                style={{
                  position: 'absolute',
                  top: '2px',
                  right: '8px',
                  background: '#f44336',
                  color: 'white',
                  fontSize: '10px',
                  padding: '1px 5px',
                  borderRadius: '10px',
                  minWidth: '16px',
                  textAlign: 'center',
                }}
              >
                {activityUnreadCount.value > 9 ? '9+' : activityUnreadCount.value}
              </span>
            )}
            <span
              style={{
                fontSize: '10px',
                fontWeight: isActive ? '600' : '400',
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
