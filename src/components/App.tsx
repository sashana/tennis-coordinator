import { signal, computed } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import { initializeFirebase, getDatabase } from '../config/firebase';
import { LandingPage } from './pages/LandingPage';
import { MainApp } from './pages/MainApp';
import { AdminPage } from './pages/AdminPage';
import { Toast } from './ui/Toast';
import { TennisLoadingScreen } from './ui/TennisEffects';

// App State Signals
export const currentGroupId = signal<string | null>(null);
export const currentGroupName = signal<string>('');
export const selectedDate = signal<string | null>(null);
export const sessionUser = signal<string>('');
export const isLoading = signal<boolean>(true);
export const toasts = signal<Array<{ id: number; message: string; type: 'success' | 'error' | 'info' }>>([]);

// Check-ins state
export const allCheckins = signal<Record<string, any[]>>({});
export const coreMembers = signal<string[]>([]);
export const memberDetails = signal<Record<string, any>>({});

// Computed values
export const currentCheckins = computed(() => {
  if (!selectedDate.value) return [];
  return allCheckins.value[selectedDate.value] || [];
});

// Toast helper
let toastId = 0;
export function showToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
  const id = ++toastId;
  toasts.value = [...toasts.value, { id, message, type }];
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id);
  }, 3000);
}

// Resolve short code to actual group ID
async function resolveShortCode(code: string): Promise<string | null> {
  try {
    const db = getDatabase();
    const groupsSnapshot = await db.ref('groups').once('value');
    const groups = (groupsSnapshot.val() || {}) as Record<string, { settings?: { shortCode?: string } }>;

    for (const [groupId, groupData] of Object.entries(groups)) {
      if (groupData.settings && groupData.settings.shortCode === code) {
        console.log(`[resolveShortCode] Resolved "${code}" to group ID: ${groupId}`);
        return groupId;
      }
    }
    console.log(`[resolveShortCode] No match found for "${code}", using as-is`);
    return null;
  } catch (error) {
    console.error('[resolveShortCode] Error:', error);
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
      // Check if it's a short code
      const resolvedGroupId = await resolveShortCode(groupPath);
      return resolvedGroupId || groupPath;
    }
  }

  // Check hash for group ID (e.g., /app.html#ttmd)
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (hash && hash !== 'admin') {
    // Check if it's a short code
    const resolvedGroupId = await resolveShortCode(hash);
    return resolvedGroupId || hash;
  }
  if (hash === 'admin') return 'admin';

  // Check query param (e.g., /app.html?group=ttmd)
  const params = new URLSearchParams(window.location.search);
  const groupParam = params.get('group');
  if (groupParam) {
    // Check if it's a short code
    const resolvedGroupId = await resolveShortCode(groupParam);
    return resolvedGroupId || groupParam;
  }

  // Check pathname
  const path = window.location.pathname;
  const groupPath = path.replace(/^\/+|\/+$/g, '');

  if (groupPath === 'admin') return 'admin';
  if (!groupPath || groupPath === 'index.html' || groupPath === 'app.html') return null;

  // Check if it's a short code
  const resolvedGroupId = await resolveShortCode(groupPath);
  return resolvedGroupId || groupPath;
}

export function App() {
  useEffect(() => {
    async function init() {
      try {
        initializeFirebase();
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
        console.error('Initialization error:', error);
        showToast('Failed to initialize app', 'error');
      } finally {
        isLoading.value = false;
      }
    }

    init();
  }, []);

  if (isLoading.value) {
    return <TennisLoadingScreen text="Loading..." />;
  }

  return (
    <>
      {currentGroupId.value === null && <LandingPage />}
      {currentGroupId.value === 'admin' && <AdminPage />}
      {currentGroupId.value && currentGroupId.value !== 'admin' && <MainApp />}

      {/* Toast notifications */}
      <div class="toast-container">
        {toasts.value.map(toast => (
          <Toast key={toast.id} message={toast.message} type={toast.type} />
        ))}
      </div>
    </>
  );
}
