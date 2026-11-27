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
          icon: './images/mak-cake-logo.webp',
          badge: './images/mak-cake-logo.webp',
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

    const docRef = orderData.firestoreDocId
      ? firestoreDb.collection('orders').doc(String(orderData.firestoreDocId))
      : firestoreDb.collection('orders').doc();
    const docId = docRef.id;
    const orderNumber = orderData.id || ('ORD-' + Math.floor(10000 + Math.random() * 90000));

    // Deep clone and strip all undefined values (which Firestore rejects)
    const sanitized = JSON.parse(JSON.stringify(orderData, (key, value) => {
      return value === undefined ? null : value;
    }));

    // Guard against Firestore 1 MB document limit on base64 receipt images
    if (typeof sanitized.receiptImg === 'string' && sanitized.receiptImg.length > 750000) {
      console.warn('Receipt image exceeds safe Firestore document limit; omitting image from cloud copy.');
      sanitized.receiptImg = '';
      sanitized.receiptOmitted = true;
    }

    const activeOwnerEmail = (typeof DEFAULT_OWNER_EMAIL === 'string' && DEFAULT_OWNER_EMAIL)
      ? DEFAULT_OWNER_EMAIL.toLowerCase()
      : 'natnaelagizew27@gmail.com';
    const cleanOrder = {
      ...sanitized,
      id: orderNumber,
      firestoreDocId: docId,
      businessId: (sanitized.businessId ? String(sanitized.businessId).toLowerCase() : activeOwnerEmail),
      isDemo: Boolean(sanitized.isDemo),
      createdAt: sanitized.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      source: 'web_firestore'
    };

    await docRef.set(cleanOrder);
    // Write minimal zero-PII status projection for live customer tracking
    try {
      await firestoreDb.collection('order_status').doc(docId).set({
        id: orderNumber,
        firestoreDocId: docId,
        status: cleanOrder.status || 'Payment Pending',
        paymentStatus: cleanOrder.paymentStatus || 'Unpaid',
        updatedAt: cleanOrder.updatedAt
      });
    } catch (statusErr) {
      console.warn('Order status projection write notice:', statusErr.message || statusErr);
    }
    return { success: true, order: cleanOrder, orderId: orderNumber, firestoreDocId: docId };
  }

  function _belongsToCurrentBusinessAccount(orderData) {
    const cur = getCurrentUser();
    if (!cur || !cur.email) return false;
    const curEmail = cur.email.toLowerCase();
    const orderBiz = orderData && orderData.businessId ? String(orderData.businessId).toLowerCase() : '';
    const primaryOwner = (typeof DEFAULT_OWNER_EMAIL === 'string' && DEFAULT_OWNER_EMAIL)
      ? DEFAULT_OWNER_EMAIL.toLowerCase()
      : 'natnaelagizew27@gmail.com';
    if (!orderBiz) return curEmail === primaryOwner;
    return orderBiz === curEmail;
  }

  /**
   * Fetch all orders from Firestore for the authenticated business account
   */
  async function getOrders() {
    if (!isFirebaseAvailable()) return [];
    const snap = await firestoreDb.collection('orders').orderBy('createdAt', 'desc').get();
    const orders = [];
    snap.forEach(doc => {
      const data = doc.data();
      if (_belongsToCurrentBusinessAccount(data)) {
        orders.push({ ...data, firestoreDocId: data.firestoreDocId || doc.id });
      }
    });
    return orders;
  }

  /**
   * Development-only: delete ONLY records explicitly marked isDemo === true
   * for the authenticated business account. Never deletes real customer orders.
   */
  async function deleteDemoOrders() {
    if (!isFirebaseAvailable()) return { deleted: 0 };
    const cur = getCurrentUser();
    if (!cur || !cur.email) throw new Error('Admin authentication required');
    const snap = await firestoreDb.collection('orders').where('isDemo', '==', true).get();
    let deleted = 0;
    for (const doc of snap.docs) {
      const d = doc.data();
      if (!_belongsToCurrentBusinessAccount(d)) continue;
      await doc.ref.delete();
      try { await firestoreDb.collection('order_status').doc(doc.id).delete(); } catch (_) {}
      deleted += 1;
    }
    return { deleted };
  }

  /**
   * Update an order's status or details in Firestore
   */
  async function updateOrder(docId, updates) {
    if (!isFirebaseAvailable() || !docId) return false;
    const nowIso = new Date().toISOString();
    await firestoreDb.collection('orders').doc(String(docId)).update({
      ...updates,
      updatedAt: nowIso
    });
    // Mirror status/paymentStatus to zero-PII order_status projection for live customer tracking
    const statusPatch = { firestoreDocId: String(docId), updatedAt: nowIso };
    if (updates.status !== undefined) statusPatch.status = updates.status;
    if (updates.paymentStatus !== undefined) statusPatch.paymentStatus = updates.paymentStatus;
    if (updates.status !== undefined || updates.paymentStatus !== undefined) {
      firestoreDb.collection('order_status').doc(String(docId)).set(statusPatch, { merge: true }).catch((err) => {
        console.warn('Order status projection update notice:', err.message || err);
      });
    }
    return true;
  }

  function subscribeToOrderStatus(docId, onUpdate) {
    if (!isFirebaseAvailable() || !docId || typeof onUpdate !== 'function') return () => {};
    return firestoreDb.collection('order_status').doc(String(docId)).onSnapshot((doc) => {
      if (doc.exists) onUpdate(doc.data());
    }, (err) => {
      console.warn('Order status listener notice:', err.message || err);
    });
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
          snapshot.forEach(doc => {
            const d = doc.data();
            if (_belongsToCurrentBusinessAccount(d)) {
              allOrders.push({ ...d, firestoreDocId: d.firestoreDocId || doc.id });
            }
          });
          if (callbacks.onInitialLoad) callbacks.onInitialLoad(allOrders);
          return;
        }

        // Handle real-time updates after initial load
        changes.forEach(change => {
          const raw = change.doc.data();
          if (!_belongsToCurrentBusinessAccount(raw)) return;
          const order = { ...raw, firestoreDocId: raw.firestoreDocId || change.doc.id };
          if (change.type === 'added') {
            // Play luxury audio chime & desktop notification
            playBakeryChime();
            const displayTotal = order.total ?? order.totalAmount ?? 0;
            showBrowserNotification(`🎂 New Order #${order.id}!`, {
              body: `${order.customerName || 'Customer'} ordered ${order.cakeName || 'Custom Cake'} (${displayTotal} ETB)`
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
          snapshot.forEach(doc => {
            const d = doc.data();
            if (_belongsToCurrentBusinessAccount(d)) {
              allOrders.push({ ...d, firestoreDocId: d.firestoreDocId || doc.id });
            }
          });
          callbacks.onSnapshot(allOrders);
        }
      }, (err) => {
        if (err.code === 'permission-denied') {
          console.warn('Firestore live sync waiting for owner authentication.');
        } else {
          console.error('Firestore orders subscription error:', err);
        }
        if (callbacks.onError) callbacks.onError(err);
      });

    return () => {
      if (orderUnsubscribe) {
        orderUnsubscribe();
        orderUnsubscribe = null;
      }
    };
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
    const clean = JSON.parse(JSON.stringify(product, (k, v) => (v === undefined ? null : v)));
    clean.updatedAt = new Date().toISOString();
    await firestoreDb.collection('products').doc(docId).set(clean, { merge: true });
    return true;
  }

  async function deleteProduct(productId) {
    if (!isFirebaseAvailable()) return false;
    await firestoreDb.collection('products').doc(String(productId)).delete();
    return true;
  }

  function subscribeToProducts(onUpdate) {
    if (!isFirebaseAvailable() || typeof onUpdate !== 'function') return () => {};
    return firestoreDb.collection('products').onSnapshot((snap) => {
      const list = [];
      snap.forEach(doc => list.push(doc.data()));
      onUpdate(list);
    }, (err) => console.warn('Products sync notice:', err.message || err));
  }

  // -------------------------------------------------------------
  // 5b. RECENT CREATIONS & DECORATIONS SYNC
  // -------------------------------------------------------------
  async function saveCreation(creation) {
    if (!isFirebaseAvailable()) return false;
    const docId = String(creation.id);
    const clean = JSON.parse(JSON.stringify(creation, (k, v) => (v === undefined ? null : v)));
    if (typeof clean.img === 'string' && clean.img.length > 750000) {
      throw new Error('Creation image exceeds 750KB safe Firestore limit.');
    }
    clean.createdAt = clean.createdAt || new Date().toISOString();
    clean.updatedAt = new Date().toISOString();
    await firestoreDb.collection('creations').doc(docId).set(clean, { merge: true });
    return true;
  }

  async function deleteCreation(creationId) {
    if (!isFirebaseAvailable()) return false;
    await firestoreDb.collection('creations').doc(String(creationId)).delete();
    return true;
  }

  function subscribeToCreations(onUpdate) {
    if (!isFirebaseAvailable() || typeof onUpdate !== 'function') return () => {};
    return firestoreDb.collection('creations').orderBy('createdAt', 'desc').onSnapshot((snap) => {
      const list = [];
      snap.forEach(doc => list.push(doc.data()));
      onUpdate(list);
    }, (err) => console.warn('Creations sync notice:', err.message || err));
  }

  async function saveDecoration(dec) {
    if (!isFirebaseAvailable()) return false;
    const docId = String(dec.id);
    const clean = JSON.parse(JSON.stringify(dec, (k, v) => (v === undefined ? null : v)));
    if (typeof clean.img === 'string' && clean.img.length > 750000) {
      throw new Error('Decoration image exceeds 750KB safe Firestore limit.');
    }
    clean.updatedAt = new Date().toISOString();
    await firestoreDb.collection('decorations').doc(docId).set(clean, { merge: true });
    return true;
  }

  async function deleteDecoration(decId) {
    if (!isFirebaseAvailable()) return false;
    await firestoreDb.collection('decorations').doc(String(decId)).delete();
    return true;
  }

  function subscribeToDecorations(onUpdate) {
    if (!isFirebaseAvailable() || typeof onUpdate !== 'function') return () => {};
    return firestoreDb.collection('decorations').onSnapshot((snap) => {
      const list = [];
      snap.forEach(doc => list.push(doc.data()));
      onUpdate(list);
    }, (err) => console.warn('Decorations sync notice:', err.message || err));
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
    const clean = JSON.parse(JSON.stringify(settings, (k, v) => (v === undefined ? null : v)));
    clean.updatedAt = new Date().toISOString();
    await firestoreDb.collection('settings').doc('business').set(clean, { merge: true });
    return true;
  }

  function subscribeToSettings(onUpdate) {
    if (!isFirebaseAvailable() || typeof onUpdate !== 'function') return () => {};
    return firestoreDb.collection('settings').doc('business').onSnapshot((doc) => {
      if (doc.exists) onUpdate(doc.data());
    }, (err) => console.warn('Settings sync notice:', err.message || err));
  }

  function subscribeToSubscription(onUpdate) {
    if (!isFirebaseAvailable() || typeof onUpdate !== 'function') return () => {};
    return firestoreDb.collection('settings').doc('subscription').onSnapshot((doc) => {
      if (doc.exists) onUpdate(doc.data());
    }, (err) => console.warn('Subscription sync notice:', err.message || err));
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
  // 8. ADMIN AUTHENTICATION (EMAIL/PASSWORD + GOOGLE LEGACY)
  // -------------------------------------------------------------
  async function reauthenticateWithPassword(password) {
    if (!isFirebaseAvailable() || !firebaseAuth || !firebaseAuth.currentUser) {
      throw new Error('Admin session expired. Please sign in again.');
    }
    const user = firebaseAuth.currentUser;
    if (!user.email) {
      throw new Error('No email associated with this admin account.');
    }
    const cred = firebase.auth.EmailAuthProvider.credential(user.email, String(password || ''));
    await user.reauthenticateWithCredential(cred);
    return user;
  }

  /**
   * Permanently delete all orders and paired order_status docs for the
   * authenticated business account using batched writes (max 400 ops/batch).
   * Preserves products, decorations, creations, settings, and auth credentials.
   * Writes an immutable audit log entry (never stores passwords).
   */
  async function deleteAllOrdersForAccount() {
    if (!isFirebaseAvailable()) {
      throw new Error('Firebase Firestore is not initialized');
    }
    const cur = getCurrentUser();
    if (!cur || !cur.email) {
      throw new Error('Authorized admin sign-in required');
    }

    let deletedOrdersCount = 0;
    let deletedStatusCount = 0;

    try {
      while (true) {
        const snap = await firestoreDb.collection('orders').limit(200).get();
        if (snap.empty) break;

        const batch = firestoreDb.batch();
        let ops = 0;
        let matchedInPage = 0;

        snap.forEach((doc) => {
          const data = doc.data();
          if (!_belongsToCurrentBusinessAccount(data)) return;
          matchedInPage += 1;
          batch.delete(doc.ref);
          ops += 1;
          deletedOrdersCount += 1;

          const statusRef = firestoreDb.collection('order_status').doc(doc.id);
          batch.delete(statusRef);
          ops += 1;
          deletedStatusCount += 1;
        });

        if (ops === 0 || matchedInPage === 0) break;
        await batch.commit();

        // If fewer than 200 docs returned, we reached the end
        if (snap.size < 200) break;
      }

      // Write audit log (best effort; never stores password)
      try {
        await firestoreDb.collection('audit_logs').add({
          action: 'DELETE_ALL_ORDERS',
          accountEmail: cur.email.toLowerCase(),
          accountUid: cur.uid || '',
          deletedOrdersCount,
          deletedStatusCount,
          status: 'success',
          timestamp: new Date().toISOString()
        });
      } catch (auditErr) {
        console.warn('Audit log write notice:', auditErr && auditErr.message ? auditErr.message : auditErr);
      }

      return { success: true, deletedOrdersCount, deletedStatusCount };
    } catch (err) {
      try {
        await firestoreDb.collection('audit_logs').add({
          action: 'DELETE_ALL_ORDERS',
          accountEmail: cur.email.toLowerCase(),
          accountUid: cur.uid || '',
          deletedOrdersCount,
          deletedStatusCount,
          status: 'error',
          errorMessage: err && err.message ? String(err.message).slice(0, 200) : 'Unknown error',
          timestamp: new Date().toISOString()
        });
      } catch (_) {}
      throw err;
    }
  }

  async function signInWithEmailPassword(email, password) {
    if (!isFirebaseAvailable() || !firebaseAuth) {
      throw new Error('Firebase Auth is not available');
    }
    const result = await firebaseAuth.signInWithEmailAndPassword(email, password);
    return result.user;
  }

  async function signInWithGoogle() {
    if (!isFirebaseAvailable() || !firebaseAuth) {
      throw new Error('Firebase Auth is not available');
    }
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    // Direct popup attempt for all modern browsers

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
    deleteDemoOrders,
    deleteAllOrdersForAccount,
    reauthenticateWithPassword,
    subscribeToOrders,
    subscribeToOrderStatus,
    getProducts,
    saveProduct,
    deleteProduct,
    subscribeToProducts,
    saveCreation,
    deleteCreation,
    subscribeToCreations,
    saveDecoration,
    deleteDecoration,
    subscribeToDecorations,
    getSettings,
    saveSettings,
    subscribeToSettings,
    subscribeToSubscription,
    seedFirestoreFromLocal,
    signInWithEmailPassword,
    signInWithGoogle,
    getRedirectResult,
    signOut,
    onAuthStateChanged,
    getCurrentUser
  };
})();

// Attach to window
window.FirebaseService = FirebaseService;
if (typeof window !== 'undefined') {
  window.__firebaseServiceReady = true;
  try {
    window.dispatchEvent(new CustomEvent('firebase-service-ready', { detail: FirebaseService }));
  } catch (_) {}
}
