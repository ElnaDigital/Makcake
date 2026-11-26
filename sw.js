/**
 * MAK CAKE — Progressive Web App (PWA) Service Worker
 * Version: mak-cake-pwa-v1.3
 * 
 * Features:
 * 1. Network-first strategy for HTML pages: Guarantees GitHub updates appear immediately.
 * 2. Stale-while-revalidate for static assets (images, CSS, JS): Superfast instant loading.
 * 3. Offline resilience: Core app shell works smoothly without internet.
 * 4. Zero state loss: LocalStorage and Firestore caches are never cleared.
 * 5. Web Push Notifications for live order status & Bole Kitchen updates.
 */

const CACHE_NAME = 'mak-cake-pwa-v1.3';
const APP_SHELL = [
  './',
  './index.html',
  './admin.html',
  './dual.html',
  './manifest.json',
  './css/styles.css',
  './images/mak-cake-logo.png',
  './images/mak-cake-logo.jpg',
  './images/mak-cake-logo.webp',
  './images/hero-banner.jpg',
  './images/hero-cake-only.jpg',
  './images/cbe-logo.png',
  './images/telebirr-logo.png',
  './js/firebase-config.js',
  './js/firebase-service.js'
];

// Pre-cache core app shell on install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[MAK CAKE SW] Pre-caching core app shell...');
      return cache.addAll(APP_SHELL.map(url => new Request(url, { cache: 'reload' }))).catch(err => {
        console.warn('[MAK CAKE SW] Pre-cache partial notice:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate: clean up old cache versions & take immediate control
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[MAK CAKE SW] Removing outdated cache:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Strategy depending on request type
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Bypass non-GET requests and Firestore / Firebase auth calls
  if (req.method !== 'GET') return;
  if (url.origin.includes('firestore.googleapis.com') ||
      url.origin.includes('identitytoolkit.googleapis.com') ||
      url.origin.includes('securetoken.googleapis.com') ||
      url.pathname.includes('/api/')) {
    return;
  }

  // 1. HTML Navigation Requests (Pages): Network-First with Cache Fallback
  // Guarantees new updates pushed to GitHub appear instantly on page reload.
  if (req.mode === 'navigate' || req.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(req)
        .then((networkRes) => {
          if (networkRes && networkRes.status === 200) {
            const clone = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          }
          return networkRes;
        })
        .catch(() => {
          // If offline or network unavailable, serve cached HTML
          return caches.match(req).then((cachedRes) => {
            if (cachedRes) return cachedRes;
            // Fallback to index.html or admin.html
            const fallbackPath = url.pathname.includes('admin') ? './admin.html' : './index.html';
            return caches.match(fallbackPath);
          });
        })
    );
    return;
  }

  // 2. Static Assets (Images, Styles, Fonts, Scripts): Stale-While-Revalidate
  event.respondWith(
    caches.match(req).then((cachedRes) => {
      const fetchPromise = fetch(req).then((networkRes) => {
        if (networkRes && networkRes.status === 200) {
          const clone = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
        }
        return networkRes;
      }).catch(() => {
        // Offline asset fetch ignored
      });

      return cachedRes || fetchPromise;
    })
  );
});

// Push Notifications
self.addEventListener('push', (event) => {
  let payload = {
    title: 'MAK CAKE Notification',
    body: 'Your cake order status has been updated.',
    orderId: '',
    url: './index.html'
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
    icon: payload.icon || './images/mak-cake-logo.png',
    badge: payload.badge || './images/mak-cake-logo.png',
    tag: payload.orderId ? `mak-order-${payload.orderId}` : 'mak-cake-general',
    renotify: true,
    vibrate: [200, 100, 200],
    data: {
      orderId: payload.orderId,
      url: payload.url || (payload.orderId ? `./index.html?track=${payload.orderId}` : './index.html')
    },
    actions: [
      { action: 'track', title: 'Track Order Live' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(payload.title, options)
  );
});

// Notification Click: Focus existing window or open target URL
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const orderId = event.notification.data && event.notification.data.orderId;
  const targetUrl = (event.notification.data && event.notification.data.url) ? event.notification.data.url : './index.html';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          client.focus();
          if (orderId) {
            client.postMessage({ type: 'OPEN_ORDER_TRACKER', orderId: orderId });
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

// Direct message listener
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const { title, options } = event.data;
    self.registration.showNotification(title, options || {});
  }
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
