/**
 * MAK CAKE — Service Worker for Web Push Notifications
 * Supports Android Chrome, Desktop, and iOS 16.4+ Safari (Standalone PWA)
 */

const CACHE_NAME = 'mak-cake-sw-v1';
const ICON_URL = '/images/mak-cake-logo.png';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Push Event: Triggered when backend sends Web Push
self.addEventListener('push', (event) => {
  let payload = {
    title: 'MAK CAKE Notification',
    body: 'Your cake order status has been updated.',
    orderId: '',
    url: '/'
  };

  if (event.data) {
    try {
      payload = Object.assign(payload, event.data.json());
    } catch (e) {
      payload.body = event.data.text() || payload.body;
    }
  }

  const options = {
    body: payload.body,
    icon: payload.icon || ICON_URL,
    badge: payload.badge || ICON_URL,
    tag: payload.orderId ? `mak-order-${payload.orderId}` : 'mak-cake-general',
    renotify: true,
    vibrate: [200, 100, 200],
    data: {
      orderId: payload.orderId,
      url: payload.url || (payload.orderId ? `/?track=${payload.orderId}` : '/')
    },
    actions: [
      { action: 'track', title: 'Track Order Live' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(payload.title, options)
  );
});

// Notification Click: Focuses open window or opens order tracking
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const orderId = event.notification.data && event.notification.data.orderId;
  const targetUrl = event.notification.data && event.notification.data.url ? event.notification.data.url : '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          client.focus();
          if (orderId) {
            client.postMessage({
              type: 'OPEN_ORDER_TRACKER',
              orderId: orderId
            });
          }
          return;
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});

// Message listener from webapp page (for direct service-worker notification triggers)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const { title, options } = event.data;
    self.registration.showNotification(title, options || {});
  }
});
