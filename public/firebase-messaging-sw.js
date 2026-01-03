/**
 * Firebase Messaging Service Worker
 *
 * Handles push notifications when the app is in the background.
 * Must be at the root of the domain for FCM to work.
 */

// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

// Firebase config (same as main app)
const firebaseConfig = {
  apiKey: 'AIzaSyCr-Ej5jeuV3kdvquu2W_R0ffSrUW0OUcQ',
  authDomain: 'tennis-coordinator-43f53.firebaseapp.com',
  databaseURL: 'https://tennis-coordinator-43f53-default-rtdb.firebaseio.com',
  projectId: 'tennis-coordinator-43f53',
  storageBucket: 'tennis-coordinator-43f53.firebasestorage.app',
  messagingSenderId: '665148711646',
  appId: '1:665148711646:web:66d14722800a12f5a3184f',
};

// Initialize Firebase in the service worker
firebase.initializeApp(firebaseConfig);

// Get messaging instance
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[SW] Background message received:', payload);

  const notificationTitle = payload.notification?.title || 'Game Update';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a game update',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: payload.data?.gameId || 'game-notification',
    data: payload.data,
    // Actions for the notification
    actions: [
      { action: 'view', title: 'View Game' },
    ],
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event);
  event.notification.close();

  // Get the game URL from notification data
  const gameDate = event.notification.data?.gameDate;
  const groupId = event.notification.data?.groupId;

  let url = '/';
  if (groupId) {
    url = `/#${groupId}`;
    if (gameDate) {
      // Could add date to URL if needed
    }
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If app is already open, focus it
      for (const client of clientList) {
        if (client.url.includes(groupId || '') && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise open new window
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
