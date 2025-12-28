import { signal, computed } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import { initializeFirebase, getDatabase } from '../config/firebase';
import { createLogger } from '../utils/logger';
import { initializePlatformUser } from '../hooks/usePlatformUser';

const logger = createLogger('App');
import { LandingPage } from './pages/LandingPage';
import { HubLandingPage } from './pages/HubLandingPage';
import { MainApp } from './pages/MainApp';
import { AdminPage } from './pages/AdminPage';
import { Toast } from './ui/Toast';
import { SportLoadingScreen } from './ui/SportEffects';
import { sport } from '../config/sport';

// App State Signals
export const currentGroupId = signal<string | null>(null);
export const currentGroupName = signal<string>('');
export const selectedDate = signal<string | null>(null);
export const sessionUser = signal<string>('');
export const isLoading = signal<boolean>(true);
export const toasts = signal<
  Array<{ id: number; message: string; type: 'success' | 'error' | 'info' }>
>([]);

// Check-ins state
export const allCheckins = signal<Record<string, any[]>>({});
export const coreMembers = signal<string[]>([]);
export const memberDetails = signal<Record<string, any>>({});

// Computed values
export const currentCheckins = computed(() => {
  if (!selectedDate.value) {
    return [];
  }
  return allCheckins.value[selectedDate.value] || [];
});

// Toast helper
let toastId = 0;
export function showToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
  const id = ++toastId;
  toasts.value = [...toasts.value, { id, message, type }];
  setTimeout(() => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }, 3000);
}

// Resolve short code or group ID to actual group ID
async function resolveShortCodeOrGroupId(code: string): Promise<string | null> {
  try {
    const db = getDatabase();

    // First, try the shortCodeIndex for fast lookup (new groups)
    const indexSnapshot = await db.ref(`shortCodeIndex/${code.toUpperCase()}`).once('value');
    if (indexSnapshot.exists()) {
      const groupId = indexSnapshot.val();
      logger.debug(`Resolved short code "${code}" via index to group ID: ${groupId}`);
      return groupId;
    }

    // Check if the code is a direct group ID
    const directGroupSnapshot = await db.ref(`groups/${code}`).once('value');
    if (directGroupSnapshot.exists()) {
      logger.debug(`"${code}" is a direct group ID`);
      return code;
    }

    // Fallback: scan groups for legacy short codes in settings
    const groupsSnapshot = await db.ref('groups').once('value');
    const groups = (groupsSnapshot.val() || {}) as Record<
      string,
      { settings?: { shortCode?: string }; metadata?: { shortCode?: string } }
    >;

    for (const [groupId, groupData] of Object.entries(groups)) {
      // Check settings.shortCode (legacy)
      if (groupData.settings?.shortCode === code) {
        logger.debug(`Resolved short code "${code}" via settings to group ID: ${groupId}`);
        return groupId;
      }
      // Check metadata.shortCode (new groups)
      if (groupData.metadata?.shortCode === code.toUpperCase()) {
        logger.debug(`Resolved short code "${code}" via metadata to group ID: ${groupId}`);
        return groupId;
      }
    }

    logger.debug(`No match found for "${code}"`);
    return null;
  } catch (error) {
    logger.error('resolveShortCodeOrGroupId Error:', error);
    return null;
  }
}

// URL parsing
async function getGroupIdFromUrl(): Promise<string | null> {
  // Check for redirect from 404.html
  const redirect = sessionStorage.getItem('redirect');
  if (redirect) {
    sessionStorage.removeItem('redirect');
    const groupPath = redirect.replace(/^\/+|\/+$/g, '');

    if (groupPath === 'admin') {
      history.replaceState(null, '', redirect);
      return 'admin';
    }

    if (groupPath && groupPath !== 'index.html' && groupPath !== 'app.html') {
      history.replaceState(null, '', redirect);
      // Check if it's a short code - only use if it resolves to a real group
      const resolvedGroupId = await resolveShortCodeOrGroupId(groupPath);
      if (resolvedGroupId) {
        return resolvedGroupId;
      }
      // Short code doesn't exist, redirect to landing
      history.replaceState(null, '', '/');
      return null;
    }
  }

  // Check hash for group ID (e.g., /app.html#ttmd)
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (hash && hash !== 'admin') {
    // Check if it's a short code - only use if it resolves to a real group
    const resolvedGroupId = await resolveShortCodeOrGroupId(hash);
    if (resolvedGroupId) {
      return resolvedGroupId;
    }
    // Short code doesn't exist, redirect to landing
    history.replaceState(null, '', '/');
    return null;
  }
  if (hash === 'admin') {
    return 'admin';
  }

  // Check query param (e.g., /app.html?group=ttmd)
  const params = new URLSearchParams(window.location.search);
  const groupParam = params.get('group');
  if (groupParam) {
    // Check if it's a short code - only use if it resolves to a real group
    const resolvedGroupId = await resolveShortCodeOrGroupId(groupParam);
    if (resolvedGroupId) {
      return resolvedGroupId;
    }
    // Short code doesn't exist, redirect to landing
    history.replaceState(null, '', '/');
    return null;
  }

  // Check pathname
  const path = window.location.pathname;
  const groupPath = path.replace(/^\/+|\/+$/g, '');

  if (groupPath === 'admin') {
    return 'admin';
  }
  if (!groupPath || groupPath === 'index.html' || groupPath === 'app.html') {
    return null;
  }

  // Check if it's a short code - only use if it resolves to a real group
  const resolvedGroupId = await resolveShortCodeOrGroupId(groupPath);
  if (resolvedGroupId) {
    return resolvedGroupId;
  }
  // Short code doesn't exist, redirect to landing
  history.replaceState(null, '', '/');
  return null;
}

export function App() {
  useEffect(() => {
    async function init() {
      try {
        initializeFirebase();

        // Initialize platform user (fire-and-forget, doesn't block app)
        initializePlatformUser().catch((err) => {
          logger.warn('Platform user init failed (non-fatal):', err);
        });

        const groupId = await getGroupIdFromUrl();
        currentGroupId.value = groupId;

        // Restore session user from localStorage
        if (groupId && groupId !== 'admin') {
          const savedUser = localStorage.getItem(`sessionUser_${groupId}`);
          if (savedUser) {
            sessionUser.value = savedUser;
          }
        }
      } catch (error) {
        logger.error('Initialization error:', error);
        showToast('Failed to initialize app', 'error');
      } finally {
        isLoading.value = false;
      }
    }

    init();
  }, []);

  if (isLoading.value) {
    return <SportLoadingScreen text="Loading..." />;
  }

  // Hub site shows only the hub landing page
  if (sport.id === 'hub') {
    return (
      <>
        <HubLandingPage />
        <div class="toast-container">
          {toasts.value.map((toast) => (
            <Toast key={toast.id} message={toast.message} type={toast.type} />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      {currentGroupId.value === null && <LandingPage />}
      {currentGroupId.value === 'admin' && <AdminPage />}
      {currentGroupId.value && currentGroupId.value !== 'admin' && <MainApp />}

      {/* Toast notifications */}
      <div class="toast-container">
        {toasts.value.map((toast) => (
          <Toast key={toast.id} message={toast.message} type={toast.type} />
        ))}
      </div>
    </>
  );
}
