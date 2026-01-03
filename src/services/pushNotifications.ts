/**
 * Push Notifications Service
 *
 * Handles Firebase Cloud Messaging for web push notifications.
 * - Request permission
 * - Get/store FCM token
 * - Subscribe/unsubscribe to notifications
 */

import { createLogger } from '@/utils/logger';

const logger = createLogger('PushNotifications');

// Firebase Messaging types
interface FirebaseMessaging {
  getToken(options?: { vapidKey?: string; serviceWorkerRegistration?: ServiceWorkerRegistration }): Promise<string>;
  onMessage(callback: (payload: MessagePayload) => void): () => void;
  deleteToken(): Promise<boolean>;
}

interface MessagePayload {
  notification?: {
    title?: string;
    body?: string;
  };
  data?: Record<string, string>;
}

declare global {
  interface Window {
    firebase: {
      initializeApp(config: Record<string, string>): void;
      messaging(): FirebaseMessaging;
      database(): unknown;
    };
  }
}

// VAPID key for web push (from Firebase Console > Project Settings > Cloud Messaging)
const VAPID_KEY = 'BNIfYokuXxf22KTM3IUXrOwypDjbOgxcd_TZV4lCf_jmtEM3Z6VMpK2uAFIyKCjTzN82uSjzAvQ6GjoswhXwMGI';

let messaging: FirebaseMessaging | null = null;
let currentToken: string | null = null;
let messagingScriptLoaded = false;

/**
 * Load Firebase Messaging SDK dynamically
 */
async function loadMessagingScript(): Promise<boolean> {
  if (messagingScriptLoaded || typeof window.firebase?.messaging === 'function') {
    return true;
  }

  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js';
    script.onload = () => {
      messagingScriptLoaded = true;
      logger.info('Firebase Messaging SDK loaded dynamically');
      resolve(true);
    };
    script.onerror = () => {
      logger.error('Failed to load Firebase Messaging SDK');
      resolve(false);
    };
    document.head.appendChild(script);
  });
}

/**
 * Check if push notifications are supported
 */
export function isPushSupported(): boolean {
  return 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
}

/**
 * Get current notification permission status
 */
export function getPermissionStatus(): NotificationPermission | 'unsupported' {
  if (!isPushSupported()) {
    return 'unsupported';
  }
  return Notification.permission;
}

/**
 * Initialize Firebase Messaging
 */
async function initMessaging(): Promise<FirebaseMessaging | null> {
  if (messaging) {
    return messaging;
  }

  if (!isPushSupported()) {
    logger.warn('Push notifications not supported in this browser');
    return null;
  }

  try {
    // Load messaging script if not already loaded
    const scriptLoaded = await loadMessagingScript();
    if (!scriptLoaded) {
      logger.error('Could not load Firebase Messaging SDK');
      return null;
    }

    // Check if Firebase Messaging SDK is loaded
    if (!window.firebase || typeof window.firebase.messaging !== 'function') {
      logger.error('Firebase Messaging SDK not available after loading');
      return null;
    }

    // Register service worker
    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    logger.info('Service worker registered:', registration.scope);

    // Get messaging instance
    messaging = window.firebase.messaging();
    return messaging;
  } catch (error) {
    logger.error('Failed to initialize messaging:', error);
    return null;
  }
}

/**
 * Request notification permission and get FCM token
 */
export async function requestPermissionAndGetToken(): Promise<string | null> {
  if (!isPushSupported()) {
    logger.warn('Push not supported');
    return null;
  }

  try {
    // Request permission
    logger.info('Requesting notification permission...');
    const permission = await Notification.requestPermission();
    logger.info('Permission result:', permission);

    if (permission !== 'granted') {
      logger.info('Notification permission denied');
      return null;
    }

    // Initialize messaging
    logger.info('Initializing messaging...');
    const msg = await initMessaging();
    if (!msg) {
      logger.error('Failed to initialize messaging');
      return null;
    }

    // Get registration
    logger.info('Getting service worker registration...');
    const registration = await navigator.serviceWorker.ready;
    logger.info('Service worker ready:', registration.scope);

    // Get token options
    const tokenOptions: { serviceWorkerRegistration: ServiceWorkerRegistration; vapidKey?: string } = {
      serviceWorkerRegistration: registration,
    };

    // Add VAPID key if available
    if (VAPID_KEY) {
      tokenOptions.vapidKey = VAPID_KEY;
    }

    // Get token
    logger.info('Getting FCM token...');
    const token = await msg.getToken(tokenOptions);

    if (token) {
      currentToken = token;
      logger.info('FCM token obtained:', token.substring(0, 20) + '...');
      return token;
    } else {
      logger.warn('No FCM token available - VAPID key may be missing');
      return null;
    }
  } catch (error) {
    logger.error('Error getting FCM token:', error);
    // Log more details
    if (error instanceof Error) {
      logger.error('Error message:', error.message);
      logger.error('Error stack:', error.stack);
    }
    return null;
  }
}

/**
 * Get current FCM token (if already obtained)
 */
export function getCurrentToken(): string | null {
  return currentToken;
}

/**
 * Delete FCM token (unsubscribe from notifications)
 */
export async function deleteToken(): Promise<boolean> {
  try {
    const msg = await initMessaging();
    if (!msg) {
      return false;
    }

    await msg.deleteToken();
    currentToken = null;
    logger.info('FCM token deleted');
    return true;
  } catch (error) {
    logger.error('Error deleting FCM token:', error);
    return false;
  }
}

/**
 * Listen for foreground messages
 */
export function onForegroundMessage(callback: (payload: MessagePayload) => void): () => void {
  if (!messaging) {
    return () => {};
  }

  return messaging.onMessage((payload) => {
    logger.info('Foreground message received:', payload);
    callback(payload);
  });
}

/**
 * Store FCM token in Firebase for a user
 */
export async function storeTokenInFirebase(
  groupId: string,
  memberId: string,
  token: string
): Promise<void> {
  const db = window.firebase.database() as any;
  const tokenPath = `groups/${groupId}/pushTokens/${memberId}`;

  try {
    await db.ref(tokenPath).set({
      token,
      updatedAt: Date.now(),
      platform: detectPlatform(),
    });
    logger.info('FCM token stored in Firebase');
  } catch (error) {
    logger.error('Error storing FCM token:', error);
    throw error;
  }
}

/**
 * Remove FCM token from Firebase
 */
export async function removeTokenFromFirebase(
  groupId: string,
  memberId: string
): Promise<void> {
  const db = window.firebase.database() as any;
  const tokenPath = `groups/${groupId}/pushTokens/${memberId}`;

  try {
    await db.ref(tokenPath).remove();
    logger.info('FCM token removed from Firebase');
  } catch (error) {
    logger.error('Error removing FCM token:', error);
    throw error;
  }
}

/**
 * Detect platform for analytics
 */
function detectPlatform(): string {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) {
    return 'ios';
  }
  if (/Android/.test(ua)) {
    return 'android';
  }
  if (/Mac/.test(ua)) {
    return 'mac';
  }
  if (/Windows/.test(ua)) {
    return 'windows';
  }
  return 'web';
}

/**
 * Show a local notification (for testing or foreground messages)
 */
export async function showLocalNotification(
  title: string,
  body: string,
  data?: Record<string, string>
): Promise<void> {
  logger.info('showLocalNotification called:', { title, body });

  if (Notification.permission !== 'granted') {
    logger.warn('Notification permission not granted:', Notification.permission);
    alert('Notification permission not granted. Please enable notifications first.');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    logger.info('Service worker ready, showing notification...');

    await registration.showNotification(title, {
      body,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      data,
      tag: 'test-notification',
      requireInteraction: true, // Keep notification visible until user interacts
    });

    logger.info('Notification shown via service worker');

    // Also try native Notification API as fallback
    try {
      const nativeNotif = new Notification(title, {
        body,
        icon: '/icon-192.png',
        tag: 'test-native',
      });
      logger.info('Native notification also shown');
    } catch (e) {
      logger.info('Native notification not available (expected on mobile)');
    }

    alert('Notification sent! Check your system notifications (top-right on Mac, or notification center).');
  } catch (error) {
    logger.error('Error showing notification:', error);
    alert('Error showing notification: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
}

// Firebase Functions types
interface FirebaseFunctions {
  httpsCallable(name: string): (data: unknown) => Promise<{ data: unknown }>;
}

declare global {
  interface Window {
    firebase: {
      initializeApp(config: Record<string, string>): void;
      messaging(): FirebaseMessaging;
      database(): unknown;
      functions(): FirebaseFunctions;
    };
  }
}

let functionsLoaded = false;

/**
 * Load Firebase Functions SDK dynamically
 */
async function loadFunctionsScript(): Promise<boolean> {
  if (functionsLoaded || typeof window.firebase?.functions === 'function') {
    return true;
  }

  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-functions-compat.js';
    script.onload = () => {
      functionsLoaded = true;
      logger.info('Firebase Functions SDK loaded dynamically');
      resolve(true);
    };
    script.onerror = () => {
      logger.error('Failed to load Firebase Functions SDK');
      resolve(false);
    };
    document.head.appendChild(script);
  });
}

/**
 * Notify players when a game is confirmed
 *
 * Calls the Cloud Function to send push notifications to all
 * opted-in players in the confirmed game.
 */
export async function notifyGameConfirmed(params: {
  groupId: string;
  gameDate: string;
  gameType: string;
  players: string[];
  excludePlayer?: string;
}): Promise<{ success: boolean; notifiedCount: number }> {
  logger.info('notifyGameConfirmed called:', params);

  try {
    // Load functions SDK if needed
    await loadFunctionsScript();

    if (typeof window.firebase?.functions !== 'function') {
      logger.error('Firebase Functions not available');
      return { success: false, notifiedCount: 0 };
    }

    const functions = window.firebase.functions();
    const notifyFn = functions.httpsCallable('notifyGameConfirmed');

    const result = await notifyFn(params);
    const data = result.data as { success: boolean; notifiedCount: number; notifiedPlayers?: string[] };

    logger.info('notifyGameConfirmed result:', data);
    return { success: data.success, notifiedCount: data.notifiedCount };
  } catch (error) {
    logger.error('notifyGameConfirmed error:', error);
    return { success: false, notifiedCount: 0 };
  }
}
