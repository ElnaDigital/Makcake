/**
 * MAK CAKE — Client-Side Firebase Service (Spark Free Tier)
 * Handles:
 * 1. Cloud Firestore live sync (orders, products, creations, settings)
 * 2. Real-time order notifications (Web Audio API Chime + Desktop Web Push)
 * 3. Client-side Canvas Image Compression (< 60KB WebP/JPEG data URLs)
 * 4. Google Authentication for Admin Portal
 * 5. One-time Cloud Seeding (migrates local JSON catalog to Firestore automatically)
 */

const FirebaseService = (function () {
  const isFirebaseAvailable = () => {
    return typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length > 0 && !!firestoreDb;
  };

  // -------------------------------------------------------------
  // 1. NATIVE CLIENT-SIDE CANVAS IMAGE COMPRESSION (Zero API keys)
  // -------------------------------------------------------------
  /**
   * Compresses an image file directly on the user's device using HTML5 Canvas.
   * Scales down large photos (max 1000px dimension) and converts to WebP/JPEG at ~0.8 quality.
   * Resulting Data URL is typically 30KB - 65KB, safely fitting inside Firestore's 1MB doc limit.
   */
  async function compressImage(file, maxDimension = 1000, quality = 0.82) {
    if (!file) return null;
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = (e) => {
        const img = new Image();
        img.onerror = reject;
        img.onload = () => {
          let { width, height } = img;
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Try WebP first, fallback to JPEG
          let dataUrl = canvas.toDataURL('image/webp', quality);
          if (!dataUrl.startsWith('data:image/webp')) {
            dataUrl = canvas.toDataURL('image/jpeg', quality);
          }
          resolve(dataUrl);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  // -------------------------------------------------------------
  // 2. LUXURY BAKERY AUDIO CHIME (HTML5 Web Audio API)
  // -------------------------------------------------------------
  let audioCtx = null;
  function playBakeryChime() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!audioCtx) audioCtx = new AudioContext();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const now = audioCtx.currentTime;
      // High-end pleasant brass/bell 3-tone chime (E5 -> G#5 -> B5 -> E6)
      const notes = [
        { freq: 659.25, time: 0.00, dur: 0.6 }, // E5
        { freq: 830.61, time: 0.12, dur: 0.7 }, // G#5
        { freq: 987.77, time: 0.24, dur: 0.8 }, // B5
        { freq: 1318.51, time: 0.38, dur: 1.2 }  // E6 (sparkling finish)
      ];

      notes.forEach(({ freq, time, dur }) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + time);

        // Natural exponential decay like a luxury counter bell
        gain.gain.setValueAtTime(0.001, now + time);
        gain.gain.exponentialRampToValueAtTime(0.3, now + time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now + time);
        osc.stop(now + time + dur + 0.05);
      });
    } catch (err) {
      console.warn('Audio chime notice:', err);
    }
  }

  // -------------------------------------------------------------
  // 3. DESKTOP BROWSER PUSH NOTIFICATIONS & CHIMES
  // -------------------------------------------------------------
  async function requestNotificationPermission() {
    if (!('Notification' in window)) return 'unsupported';
    if (Notification.permission === 'granted') return 'granted';
    try {
      const perm = await Notification.requestPermission();
      return perm;
    } catch (e) {
      return 'denied';
    }
  }

  function showBrowserNotification(title, options = {}) {
    // 1. Play luxury audio chime immediately
    playBakeryChime();

    // 2. Vibrate mobile device if supported
    if ('vibrate' in navigator) {
      try { navigator.vibrate([200, 100, 200]); } catch (_) {}
    }

    // 3. Desktop browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        const notif = new Notification(title, {
          icon: '/images/mak-cake-logo.png',
          badge: '/images/mak-cake-logo.png',
          vibrate: [200, 100, 200],
          ...options
        });
        notif.onclick = () => {
          window.focus();
          notif.close();
        };
        return notif;
      } catch (e) {
        // Mobile Chrome may reject direct constructor without service worker
        console.warn('Native notification display notice:', e.message);
      }
    }
    return null;
  }

  // -------------------------------------------------------------
  // 4. CLOUD FIRESTORE ORDERS REPOSITORY
  // -------------------------------------------------------------
  /**
   * Save an order to Firestore. Returns { success, orderId, cloud: true }
   */
  async function saveOrder(orderData) {
    if (!isFirebaseAvailable()) {
      throw new Error('Firebase Firestore is not initialized');
    }

    const orderId = orderData.id || ('ORD-' + Math.floor(10000 + Math.random() * 90000));
    
    // Deep clone and strip all undefined values (which Firestore rejects)
    const sanitized = JSON.parse(JSON.stringify(orderData, (key, value) => {
      return value === undefined ? null : value;
    }));

    const cleanOrder = {
      ...sanitized,
      id: orderId,
      createdAt: sanitized.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      source: 'web_firestore'
    };

    await firestoreDb.collection('orders').doc(orderId).set(cleanOrder);
    return { success: true, order: cleanOrder, orderId };
  }

  /**
   * Fetch all orders from Firestore (sorted descending by creation time)
   */
  async function getOrders() {
    if (!isFirebaseAvailable()) return [];
    const snap = await firestoreDb.collection('orders').orderBy('createdAt', 'desc').get();
    const orders = [];
    snap.forEach(doc => orders.push(doc.data()));
    return orders;
  }

  /**
   * Update an order's status or details in Firestore
   */
  async function updateOrder(orderId, updates) {
    if (!isFirebaseAvailable()) return false;
    await firestoreDb.collection('orders').doc(orderId).update({
      ...updates,
      updatedAt: new Date().toISOString()
    });
    return true;
  }

  /**
   * Real-time listener for incoming orders
   * Calls onNewOrder(order) when a newly placed order arrives
   * Calls onOrderChange(order) on existing order updates
   */
  let orderUnsubscribe = null;
  let initialOrdersLoaded = false;

  function subscribeToOrders(callbacks = {}) {
    if (!isFirebaseAvailable()) return () => {};
    if (orderUnsubscribe) {
      orderUnsubscribe();
    }

    initialOrdersLoaded = false;
    orderUnsubscribe = firestoreDb.collection('orders')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const changes = snapshot.docChanges();

        // Handle full initial load
        if (!initialOrdersLoaded) {
          initialOrdersLoaded = true;
          const allOrders = [];
          snapshot.forEach(doc => allOrders.push(doc.data()));
          if (callbacks.onInitialLoad) callbacks.onInitialLoad(allOrders);
          return;
        }

        // Handle real-time updates after initial load
        changes.forEach(change => {
          const order = change.doc.data();
          if (change.type === 'added') {
            // Play luxury audio chime & desktop notification
            playBakeryChime();
            showBrowserNotification(`🎂 New Order #${order.id}!`, {
              body: `${order.customerName || 'Customer'} ordered ${order.cakeName || 'Custom Cake'} (${order.totalAmount || 0} ETB)`
            });
            if (callbacks.onNewOrder) callbacks.onNewOrder(order);
          } else if (change.type === 'modified') {
            if (callbacks.onOrderUpdated) callbacks.onOrderUpdated(order);
          } else if (change.type === 'removed') {
            if (callbacks.onOrderRemoved) callbacks.onOrderRemoved(order);
          }
        });

        if (callbacks.onSnapshot) {
          const allOrders = [];
          snapshot.forEach(doc => allOrders.push(doc.data()));
          callbacks.onSnapshot(allOrders);
        }
      }, (err) => {
        if (err.code === 'permission-denied') {
          console.warn('Firestore live sync waiting for owner authentication.');
        } else {
          console.error('Firestore orders subscription error:', err);
        }
      });

    return orderUnsubscribe;
  }

  // -------------------------------------------------------------
  // 5. PRODUCTS & CATALOG SYNC
  // -------------------------------------------------------------
  async function getProducts() {
    if (!isFirebaseAvailable()) return null;
    try {
      const snap = await firestoreDb.collection('products').get();
      if (snap.empty) return null; // Signal that Firestore needs initial seed
      const prods = [];
      snap.forEach(doc => prods.push(doc.data()));
      return prods;
    } catch (e) {
      console.warn('Error reading products from Firestore:', e);
      return null;
    }
  }

  async function saveProduct(product) {
    if (!isFirebaseAvailable()) return false;
    const docId = String(product.id);
    await firestoreDb.collection('products').doc(docId).set(product, { merge: true });
    return true;
  }

  async function deleteProduct(productId) {
    if (!isFirebaseAvailable()) return false;
    await firestoreDb.collection('products').doc(String(productId)).delete();
    return true;
  }

  // -------------------------------------------------------------
  // 6. BUSINESS SETTINGS SYNC
  // -------------------------------------------------------------
  async function getSettings() {
    if (!isFirebaseAvailable()) return null;
    try {
      const doc = await firestoreDb.collection('settings').doc('business').get();
      if (!doc.exists) return null;
      return doc.data();
    } catch (e) {
      console.warn('Error reading settings from Firestore:', e);
      return null;
    }
  }

  async function saveSettings(settings) {
    if (!isFirebaseAvailable()) return false;
    await firestoreDb.collection('settings').doc('business').set(settings, { merge: true });
    return true;
  }

  // -------------------------------------------------------------
  // 7. AUTO-SEEDING FROM LOCAL JSON (Runs seamlessly if Firestore empty)
  // -------------------------------------------------------------
  async function seedFirestoreFromLocal(localProducts, localSettings) {
    if (!isFirebaseAvailable()) return false;
    try {
      console.log('⚡ Checking if Firestore needs initial data seeding...');
      const prodSnap = await firestoreDb.collection('products').limit(1).get();
      if (prodSnap.empty && Array.isArray(localProducts) && localProducts.length > 0) {
        console.log(`📦 Seeding ${localProducts.length} products to Firestore...`);
        const batch = firestoreDb.batch();
        localProducts.forEach(prod => {
          const ref = firestoreDb.collection('products').doc(String(prod.id));
          batch.set(ref, prod);
        });
        await batch.commit();
        console.log('✅ Products successfully seeded into Cloud Firestore!');
      }

      const settingsDoc = await firestoreDb.collection('settings').doc('business').get();
      if (!settingsDoc.exists && localSettings) {
        console.log('⚙️ Seeding business settings to Firestore...');
        await firestoreDb.collection('settings').doc('business').set(localSettings);
        console.log('✅ Settings successfully seeded into Cloud Firestore!');
      }
      return true;
    } catch (e) {
      console.warn('Auto-seeding error (will continue normally):', e);
      return false;
    }
  }

  // -------------------------------------------------------------
  // 8. GOOGLE AUTHENTICATION FOR OWNER (POPUP + REDIRECT FALLBACK)
  // -------------------------------------------------------------
  async function signInWithGoogle() {
    if (!isFirebaseAvailable() || !firebaseAuth) {
      throw new Error('Firebase Auth is not available');
    }
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      await firebaseAuth.signInWithRedirect(provider);
      return null;
    }

    try {
      const result = await firebaseAuth.signInWithPopup(provider);
      return result.user;
    } catch (popupErr) {
      // If browser blocks popup, smoothly fall back to direct redirect
      if (popupErr.code === 'auth/popup-blocked' || popupErr.code === 'auth/cancelled-popup-request') {
        console.warn('Popup blocked by browser, redirecting directly to Google Sign-In...');
        await firebaseAuth.signInWithRedirect(provider);
        return null;
      }
      throw popupErr;
    }
  }

  async function getRedirectResult() {
    if (!isFirebaseAvailable() || !firebaseAuth) return null;
    try {
      const res = await firebaseAuth.getRedirectResult();
      return res ? res.user : null;
    } catch (e) {
      console.warn('getRedirectResult error:', e);
      throw e;
    }
  }

  async function signOut() {
    if (firebaseAuth) {
      await firebaseAuth.signOut();
    }
  }

  function onAuthStateChanged(callback) {
    if (!firebaseAuth) return () => {};
    return firebaseAuth.onAuthStateChanged(callback);
  }

  function getCurrentUser() {
    return firebaseAuth ? firebaseAuth.currentUser : null;
  }

  return {
    isAvailable: isFirebaseAvailable,
    compressImage,
    playBakeryChime,
    requestNotificationPermission,
    showBrowserNotification,
    saveOrder,
    getOrders,
    updateOrder,
    subscribeToOrders,
    getProducts,
    saveProduct,
    deleteProduct,
    getSettings,
    saveSettings,
    seedFirestoreFromLocal,
    signInWithGoogle,
    getRedirectResult,
    signOut,
    onAuthStateChanged,
    getCurrentUser
  };
})();

// Attach to window
window.FirebaseService = FirebaseService;
