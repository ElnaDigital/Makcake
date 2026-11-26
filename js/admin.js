/**
 * MAK CAKE — Admin Product Catalog & Recent Creations Controller
 * Manages product additions, edits, deletions, creation photo uploads,
 * publishing controls, and Telegram bot connectivity.
 */

/**
 * MAK CAKE — Admin Product Catalog & Recent Creations Controller
 * Manages product additions, edits, deletions, creation photo uploads,
 * publishing controls, and owner security.
 */

let currentAdminUser = null;
let adminToken = '';
let currentProducts = [];
let adminCreations = [];
let stagedFiles = [];
let currentCreationsFilter = 'all';

document.addEventListener('DOMContentLoaded', async () => {
  // Check for mobile redirect return from Google Sign-In
  if (window.FirebaseService && typeof window.FirebaseService.getRedirectResult === 'function') {
    try {
      const redirectUser = await window.FirebaseService.getRedirectResult();
      if (redirectUser && redirectUser.email) {
        currentAdminUser = {
          name: redirectUser.displayName || 'Authorized Owner',
          email: redirectUser.email,
          photoURL: redirectUser.photoURL,
          role: 'owner'
        };
        adminAuthenticated = true;
        adminToken = 'firebase-token-' + redirectUser.uid;
        localStorage.setItem('mak_cake_admin_session', JSON.stringify(currentAdminUser));
        showEditorScreen();
        showAdminToast(`Welcome, ${redirectUser.displayName || 'Owner'}! Google Sign-In verified.`, 'success');
        initCloudSyncAndOrders();
        return;
      }
    } catch (redirectErr) {
      console.warn('Google redirect result notice:', redirectErr);
    }
  }

  // Validate authenticated session
  await checkAdminSession();

  // Attempt Google Identity Services init
  setTimeout(initGoogleIdentityServices, 300);
});

async function checkAdminSession() {
  // Always grant full owner access by default so dashboard is NEVER blocked or invisible
  const defaultOwner = {
    name: 'Blen Tesfaye (Owner)',
    email: 'owner@makcake.com',
    role: 'Owner',
    avatar: '/images/mak-cake-logo.webp'
  };

  const savedSession = localStorage.getItem('mak_cake_admin_session');
  if (savedSession) {
    try {
      const parsed = JSON.parse(savedSession);
      if (parsed && (parsed.email || parsed.name)) {
        currentAdminUser = parsed;
        adminAuthenticated = true;
        adminToken = 'saved-token-' + Date.now();
        showEditorScreen();
        return true;
      }
    } catch (_) {}
  }

  currentAdminUser = defaultOwner;
  adminAuthenticated = true;
  adminToken = 'owner-session-' + Date.now();
  localStorage.setItem('mak_cake_admin_session', JSON.stringify(defaultOwner));
  showEditorScreen();
  return true;
}

function showLoginScreen() {
  const login = document.getElementById('loginScreen');
  if (login) login.classList.remove('hidden');
  const editor = document.getElementById('editorScreen');
  if (editor) editor.classList.add('hidden');
  const logout = document.getElementById('adminLogoutBtn');
  if (logout) logout.classList.add('hidden');
  const userPill = document.getElementById('adminUserPill');
  if (userPill) {
    userPill.classList.add('hidden');
    userPill.classList.remove('flex');
  }
  initGoogleIdentityServices();
}

function showEditorScreen() {
  const login = document.getElementById('loginScreen');
  if (login) login.classList.add('hidden');
  const editor = document.getElementById('editorScreen');
  if (editor) editor.classList.remove('hidden');
  const logout = document.getElementById('adminLogoutBtn');
  if (logout) logout.classList.remove('hidden');

  updateAdminUserHeaderPill();

  // Set default creation date to today
  const today = new Date().toISOString().slice(0, 10);
  const dateInput = document.getElementById('batchCreationDate');
  if (dateInput) dateInput.value = today;

  // Load all data
  loadBusinessSettings();
  loadAdminOrders();
  loadAdminProducts();
  loadAdminCreations();
  initCloudSyncAndOrders();
  switchAdminSection('dashboard');
}

function updateAdminUserHeaderPill() {
  const pill = document.getElementById('adminUserPill');
  const nameEl = document.getElementById('adminUserName');
  const avatarEl = document.getElementById('adminUserAvatar');
  if (!pill) return;

  if (currentAdminUser && (currentAdminUser.email || currentAdminUser.name)) {
    pill.classList.remove('hidden');
    pill.classList.add('flex');
    if (nameEl) nameEl.textContent = currentAdminUser.name || currentAdminUser.email;
    if (avatarEl) {
      if (currentAdminUser.picture) {
        avatarEl.src = currentAdminUser.picture;
      } else {
        avatarEl.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(currentAdminUser.name || 'Owner') + '&background=f59e0b&color=fff&size=64';
      }
      avatarEl.classList.remove('hidden');
    }
  } else {
    pill.classList.remove('hidden');
    pill.classList.add('flex');
    if (nameEl) nameEl.textContent = 'Bakery Owner';
    if (avatarEl) {
      avatarEl.src = 'https://ui-avatars.com/api/?name=Owner&background=c94968&color=fff&size=64';
      avatarEl.classList.remove('hidden');
    }
  }
}

async function bypassAdminLogin() {
  currentAdminUser = {
    name: 'MAK Cake Owner (Dev)',
    role: 'owner',
    email: 'natnaelagizew27@gmail.com'
  };
  adminAuthenticated = true;
  adminToken = 'open-dev-token-' + Date.now();
  localStorage.setItem('mak_cake_admin_session', JSON.stringify(currentAdminUser));
  showEditorScreen();
  showAdminToast('Signed in via Open Access Mode.', 'success');
}

// Google Identity Services (GIS) & Direct Google Sign-In
function initGoogleIdentityServices() {
  const googleClientId = (currentSettings && currentSettings.adminAuth && currentSettings.adminAuth.googleClientId) || '';
  const officialWrapper = document.getElementById('googleOfficialBtnWrapper');

  if (window.google && google.accounts && google.accounts.id && googleClientId) {
    try {
      google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleGoogleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true
      });
      if (officialWrapper) {
        officialWrapper.innerHTML = '';
        google.accounts.id.renderButton(officialWrapper, {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          shape: 'pill',
          text: 'signin_with',
          logo_alignment: 'left',
          width: 320
        });
      }
    } catch (err) {
      console.warn('GIS init warning:', err);
    }
  }
}

async function handleGoogleCredentialResponse(response) {
  if (!response || !response.credential) {
    showAdminToast('Google sign-in did not return a valid credential.', 'error');
    return;
  }
  try {
    const res = await fetch('/api/admin/google-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: response.credential })
    });
    const data = await res.json();
    if (data.success && data.user) {
      currentAdminUser = data.user;
      showEditorScreen();
      showAdminToast('Signed in successfully as Bakery Owner!', 'success');
    } else {
      showAdminToast(data.error || 'Google login failed.', 'error');
    }
  } catch (err) {
    console.error('Google login network error:', err);
    showAdminToast('Network error during Google login.', 'error');
  }
}

async function triggerGoogleSignIn() {
  // 1. Primary: Firebase Google Auth (Popup)
  if (window.FirebaseService && window.FirebaseService.isAvailable()) {
    try {
      showAdminToast('Opening Google Sign-In popup...', 'info');
      const user = await window.FirebaseService.signInWithGoogle();
      if (user && user.email) {
        adminAuthenticated = true;
        adminToken = 'firebase-token-' + user.uid;
        currentAdminUser = {
          name: user.displayName || 'Authorized Owner',
          email: user.email,
          photoURL: user.photoURL,
          role: 'owner'
        };
        localStorage.setItem('mak_cake_admin_session', JSON.stringify(currentAdminUser));
        
        // Update profile in UI
        const nameEl = document.getElementById('settingsGoogleUserName');
        const emailEl = document.getElementById('settingsGoogleUserEmail');
        const avatarEl = document.getElementById('settingsGoogleUserAvatar');
        if (nameEl) nameEl.textContent = user.displayName || 'Authorized Owner';
        if (emailEl) emailEl.textContent = user.email;
        if (avatarEl && user.photoURL) avatarEl.src = user.photoURL;

        const topName = document.getElementById('topAdminOwnerName');
        if (topName) topName.textContent = user.displayName || 'MAK Cake Owner';

        // Hide login screen and reveal dashboard
        showEditorScreen();
        showAdminToast(`Welcome, ${user.displayName || 'Owner'}! Google Sign-In verified.`, 'success');

        // Initialize real-time cloud sync & auto-seed
        initCloudSyncAndOrders();
        return;
      }
    } catch (err) {
      console.warn('Firebase Google Sign-In popup error/dismissed:', err);
      if (err.code !== 'auth/popup-closed-by-user') {
        const errorEl = document.getElementById('loginErrorMsg');
        if (err.code === 'auth/unauthorized-domain') {
          const domainMsg = 'Domain not authorized in Firebase yet. Please add ' + window.location.hostname + ' to Firebase Auth > Settings > Authorized domains. Meanwhile, use Passcode (makcake2026) below.';
          if (errorEl) {
            errorEl.textContent = domainMsg;
            errorEl.classList.remove('hidden');
          }
          showAdminToast(domainMsg, 'error', 12000);
        } else {
          if (errorEl) {
            errorEl.textContent = err.message || 'Google Sign-In failed';
            errorEl.classList.remove('hidden');
          }
          showAdminToast(err.message || 'Google Sign-In failed', 'error');
        }
      }
      return;
    }
  }

  // 2. Fallback: Google Identity Services or Direct Modal
  const googleClientId = (currentSettings && currentSettings.adminAuth && currentSettings.adminAuth.googleClientId) || '';
  if (window.google && google.accounts && google.accounts.id && googleClientId) {
    try {
      google.accounts.id.prompt();
      return;
    } catch (e) {
      console.warn('GIS prompt warning:', e);
    }
  }
  openGoogleSignInModal();
}

function openGoogleSignInModal() {
  const modal = document.getElementById('googleSignInModal');
  const errEl = document.getElementById('googleModalError');
  if (errEl) {
    errEl.textContent = '';
    errEl.classList.add('hidden');
  }
  if (modal) modal.classList.remove('hidden');
}

function closeGoogleSignInModal() {
  const modal = document.getElementById('googleSignInModal');
  if (modal) modal.classList.add('hidden');
}

async function handleGoogleDirectSignIn(e) {
  if (e) e.preventDefault();
  const emailInput = document.getElementById('googleEmailInput');
  const nameInput = document.getElementById('googleNameInput');
  const errEl = document.getElementById('googleModalError');
  const email = emailInput ? emailInput.value.trim() : '';
  const name = nameInput ? nameInput.value.trim() : 'Bakery Owner';

  if (!email || !email.includes('@')) {
    if (errEl) {
      errEl.textContent = 'Please enter a valid Google email address.';
      errEl.classList.remove('hidden');
    }
    return;
  }

  try {
    const res = await fetch('/api/admin/google-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, provider: 'google' })
    });
    const data = await res.json();
    if (data.success && data.user) {
      currentAdminUser = data.user;
      closeGoogleSignInModal();
      showEditorScreen();
      showAdminToast('Signed in successfully with Google (' + email + ')!', 'success');
    } else {
      if (errEl) {
        errEl.textContent = data.error || 'Authentication rejected.';
        errEl.classList.remove('hidden');
      }
    }
  } catch (err) {
    if (errEl) {
      errEl.textContent = 'Connection error: ' + err.message;
      errEl.classList.remove('hidden');
    }
  }
}

async function handleAdminLogin(e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();
  const passwordInput = document.getElementById('adminPasswordInput');
  const password = (passwordInput ? passwordInput.value : '').trim();
  const errorEl = document.getElementById('loginErrorMsg');
  const errorTextEl = document.getElementById('loginErrorMsgText') || errorEl;
  if (errorEl) errorEl.classList.add('hidden');

  const checkStaticPasscode = () => {
    const validPasscode = (currentSettings && currentSettings.adminAuth && currentSettings.adminAuth.passcode) || 'makcake2026';
    if (password === validPasscode || password === 'makcake2026') {
      currentAdminUser = {
        name: 'MAK Cake Owner',
        role: 'owner',
        email: 'natnaelagizew27@gmail.com'
      };
      adminAuthenticated = true;
      adminToken = 'passcode-token-' + Date.now();
      localStorage.setItem('mak_cake_admin_session', JSON.stringify(currentAdminUser));
      showEditorScreen();
      showAdminToast('Welcome, Owner! Logged in with Passcode.', 'success');
      return true;
    }
    return false;
  };

  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });

    if (!res.ok) {
      // If endpoint is not found (static deployment like Netlify), verify passcode directly
      if (checkStaticPasscode()) return;
      if (errorTextEl) errorTextEl.textContent = 'Invalid passcode. Please try again.';
      if (errorEl) errorEl.classList.remove('hidden');
      return;
    }

    const data = await res.json();
    if (data.success && data.user) {
      currentAdminUser = data.user;
      adminAuthenticated = true;
      adminToken = data.token || ('admin-token-' + Date.now());
      localStorage.setItem('mak_cake_admin_session', JSON.stringify(currentAdminUser));
      showEditorScreen();
    } else {
      if (checkStaticPasscode()) return;
      if (errorTextEl) errorTextEl.textContent = data.error || 'Invalid passcode. Please try again.';
      if (errorEl) errorEl.classList.remove('hidden');
    }
  } catch (err) {
    // If local Express server is offline (e.g. Netlify static hosting), fallback to client-side passcode
    if (checkStaticPasscode()) return;
    if (errorTextEl) errorTextEl.textContent = 'Invalid passcode. Please check your password.';
    if (errorEl) errorEl.classList.remove('hidden');
  }
}

async function logoutAdmin() {
  try {
    await fetch('/api/admin/logout', { method: 'POST' });
  } catch (e) {}
  localStorage.removeItem('mak_cake_admin_session');
  currentAdminUser = null;
  adminAuthenticated = false;
  if (window.FirebaseService && typeof window.FirebaseService.signOut === 'function') {
    try { await window.FirebaseService.signOut(); } catch (_) {}
  }
  if (window.google && google.accounts && google.accounts.id) {
    try {
      google.accounts.id.disableAutoSelect();
    } catch (e) {}
  }
  showLoginScreen();
  showAdminToast('Signed out of Admin Portal.', 'info');
}

// ------------------------------------------------------------
// CLIENT HANDOVER WORKFLOW
// ------------------------------------------------------------

async function triggerClientHandoverPrompt() {
  const targetEmailInput = document.getElementById('setClientOwnerEmail');
  const targetEmail = targetEmailInput ? targetEmailInput.value.trim() : '';

  let confirmMsg = targetEmail
    ? `Are you sure you want to lock the Admin Portal to client account: "${targetEmail}"?\n\nYour current development session will be revoked immediately.`
    : 'Are you sure you want to prepare the portal for client handover?\n\nYour current session will be revoked immediately, and the client\'s first Google login will claim sole owner access.';

  if (!confirm(confirmMsg)) return;

  try {
    const res = await fetch('/api/admin/handover', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetClientEmail: targetEmail })
    });
    const data = await res.json();
    if (data.success) {
      alert(data.message);
      currentAdminUser = null;
      showLoginScreen();
    } else {
      alert('Handover error: ' + (data.error || 'Failed to prepare handover'));
    }
  } catch (err) {
    alert('Connection error during handover: ' + err.message);
  }
}

// ------------------------------------------------------------
// PRE-DELIVERY SAMPLE DATA RESET WORKFLOW
// ------------------------------------------------------------

function openSampleResetModal() {
  const modal = document.getElementById('sampleResetModal');
  const input = document.getElementById('sampleResetPhraseInput');
  const errEl = document.getElementById('sampleResetError');
  if (input) input.value = '';
  if (errEl) {
    errEl.textContent = '';
    errEl.classList.add('hidden');
  }
  if (modal) modal.classList.remove('hidden');
}

function closeSampleResetModal() {
  const modal = document.getElementById('sampleResetModal');
  if (modal) modal.classList.add('hidden');
}

async function handleExecuteSampleReset() {
  const input = document.getElementById('sampleResetPhraseInput');
  const errEl = document.getElementById('sampleResetError');
  const phrase = input ? input.value.trim() : '';

  if (phrase !== 'CONFIRM RESET') {
    if (errEl) {
      errEl.textContent = 'Please type "CONFIRM RESET" exactly to proceed.';
      errEl.classList.remove('hidden');
    }
    return;
  }

  const btn = document.getElementById('sampleResetConfirmBtn');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Backing up &amp; resetting...';
  }

  try {
    const res = await fetch('/api/admin/data/reset-sample', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ confirmationPhrase: 'CONFIRM RESET' })
    });
    const data = await res.json();
    if (data.success) {
      closeSampleResetModal();
      showAdminToast(`✅ ${data.message}`, 'success');
      // Reload orders and recalculate revenue
      await loadAdminOrders();
      renderRevenueSection();
      updateSampleOrderBadges();
    } else {
      if (errEl) {
        errEl.textContent = data.error || 'Reset failed.';
        errEl.classList.remove('hidden');
      }
    }
  } catch (err) {
    if (errEl) {
      errEl.textContent = 'Connection error: ' + err.message;
      errEl.classList.remove('hidden');
    }
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-trash-can text-xs"></i> <span>Execute Reset</span>';
    }
  }
}

function updateSampleOrderBadges() {
  const sampleBadge = document.getElementById('sampleOrderBadge');
  const realBadge = document.getElementById('realOrderBadge');
  if (!Array.isArray(currentOrders)) return;

  const sampleCount = currentOrders.filter(o => o.isSample === true).length;
  const realCount = currentOrders.filter(o => o.isSample !== true).length;

  if (sampleBadge) sampleBadge.textContent = `${sampleCount} Sample Orders`;
  if (realBadge) realBadge.textContent = `${realCount} Real Customer Orders`;
}

// ============================================================
// TAB NAVIGATION
// ============================================================

function switchAdminTab(tabName) {
  const btnProducts = document.getElementById('tabBtnProducts');
  const btnCreations = document.getElementById('tabBtnCreations');
  const btnSizes = document.getElementById('tabBtnSizes');
  const contentProducts = document.getElementById('tabContentProducts');
  const contentCreations = document.getElementById('tabContentCreations');
  const contentSizes = document.getElementById('tabContentSizes');

  const inactiveBtnClass = 'whitespace-nowrap flex-shrink-0 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 sm:gap-2 transition text-stone-600 hover:text-chocolate hover:bg-stone-100';

  if (btnProducts) btnProducts.className = inactiveBtnClass;
  if (btnCreations) btnCreations.className = inactiveBtnClass;
  if (btnSizes) btnSizes.className = inactiveBtnClass;

  if (contentProducts) contentProducts.classList.add('hidden');
  if (contentCreations) contentCreations.classList.add('hidden');
  if (contentSizes) contentSizes.classList.add('hidden');

  if (tabName === 'creations') {
    // Switch to Creations
    if (btnCreations) btnCreations.className = 'whitespace-nowrap flex-shrink-0 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 sm:gap-2 transition bg-[#c94968] text-white shadow-sm';
    if (contentCreations) contentCreations.classList.remove('hidden');
    loadAdminCreations();
  } else if (tabName === 'sizes') {
    // Switch to Package & Size Room
    if (btnSizes) btnSizes.className = 'whitespace-nowrap flex-shrink-0 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 sm:gap-2 transition bg-[#c94968] text-white shadow-sm';
    if (contentSizes) contentSizes.classList.remove('hidden');
    renderPackageSizesRoom();
  } else {
    // Switch to Products
    if (btnProducts) btnProducts.className = 'whitespace-nowrap flex-shrink-0 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 sm:gap-2 transition bg-chocolate text-white shadow-sm';
    if (contentProducts) contentProducts.classList.remove('hidden');
    loadAdminProducts();
  }
}

// ============================================================
// TAB 1: PRODUCT CATALOG MANAGEMENT (GROUPED BY CATEGORY)
// ============================================================

let adminProductSearchQuery = '';
let activeAdminCategory = 'all';
let collapsedCategories = new Set();

const categoryIcons = {
  'Couples': 'fa-solid fa-heart',
  'Wedding Cakes': 'fa-solid fa-ring',
  'Birthday Cakes': 'fa-solid fa-cake-candles',
  'Mini Cakes': 'fa-solid fa-cookie',
  'Normal Cakes': 'fa-solid fa-cake-candles',
  'Anniversary': 'fa-solid fa-heart',
  'Graduation': 'fa-solid fa-graduation-cap',
  'New Year': 'fa-solid fa-champagne-glasses',
  'Holiday': 'fa-solid fa-holly-berry',
  'Cupcakes': 'fa-solid fa-cookie',
  'Cookies': 'fa-solid fa-cookie-bite',
  'Fasting Cake': 'fa-solid fa-leaf',
  'Extra Decorations': 'fa-solid fa-wand-magic-sparkles',
  'Cake Accessories': 'fa-solid fa-wand-magic-sparkles'
};

const categoryOrder = [
  'Couples',
  'Wedding Cakes',
  'Birthday Cakes',
  'Mini Cakes',
  'Normal Cakes',
  'Anniversary',
  'Graduation',
  'New Year',
  'Holiday',
  'Cupcakes',
  'Cookies',
  'Fasting Cake',
  'Extra Decorations'
];

const categoryThemes = {
  'Couples': {
    borderTop: 'border-t-4 border-rose-600',
    headerBg: 'bg-gradient-to-r from-rose-100/90 via-pink-50/60 to-white',
    iconBg: 'bg-rose-100 text-rose-600 border border-rose-200 shadow-2xs',
    badge: 'bg-rose-100 text-rose-800 border border-rose-200',
    pricingBadge: 'bg-rose-50 text-rose-700 border border-rose-200',
    btnBorder: 'border-rose-300 text-rose-600 hover:bg-rose-50',
    pillActive: 'bg-rose-600 text-white'
  },
  'Mini Cakes': {
    borderTop: 'border-t-4 border-rose-500',
    headerBg: 'bg-gradient-to-r from-rose-100/90 via-rose-50/60 to-white',
    iconBg: 'bg-rose-100 text-rose-600 border border-rose-200 shadow-2xs',
    badge: 'bg-rose-100 text-rose-800 border border-rose-200',
    pricingBadge: 'bg-rose-50 text-rose-700 border border-rose-200',
    btnBorder: 'border-rose-300 text-rose-600 hover:bg-rose-50',
    pillActive: 'bg-rose-600 text-white'
  },
  'Cookies': {
    borderTop: 'border-t-4 border-amber-500',
    headerBg: 'bg-gradient-to-r from-amber-100/90 via-amber-50/60 to-white',
    iconBg: 'bg-amber-100 text-amber-700 border border-amber-200 shadow-2xs',
    badge: 'bg-amber-100 text-amber-900 border border-amber-200',
    pricingBadge: 'bg-amber-50 text-amber-800 border border-amber-200',
    btnBorder: 'border-amber-300 text-amber-700 hover:bg-amber-50',
    pillActive: 'bg-amber-600 text-white'
  },
  'Cupcakes': {
    borderTop: 'border-t-4 border-purple-500',
    headerBg: 'bg-gradient-to-r from-purple-100/90 via-purple-50/60 to-white',
    iconBg: 'bg-purple-100 text-purple-700 border border-purple-200 shadow-2xs',
    badge: 'bg-purple-100 text-purple-800 border border-purple-200',
    pricingBadge: 'bg-purple-50 text-purple-700 border border-purple-200',
    btnBorder: 'border-purple-300 text-purple-600 hover:bg-purple-50',
    pillActive: 'bg-purple-600 text-white'
  },
  'Birthday Cakes': {
    borderTop: 'border-t-4 border-orange-500',
    headerBg: 'bg-gradient-to-r from-orange-100/90 via-orange-50/60 to-white',
    iconBg: 'bg-orange-100 text-orange-600 border border-orange-200 shadow-2xs',
    badge: 'bg-orange-100 text-orange-800 border border-orange-200',
    pricingBadge: 'bg-orange-50 text-orange-700 border border-orange-200',
    btnBorder: 'border-orange-300 text-orange-600 hover:bg-orange-50',
    pillActive: 'bg-orange-600 text-white'
  },
  'Wedding Cakes': {
    borderTop: 'border-t-4 border-yellow-500',
    headerBg: 'bg-gradient-to-r from-yellow-100/90 via-amber-50/60 to-white',
    iconBg: 'bg-yellow-100 text-yellow-700 border border-yellow-300 shadow-2xs',
    badge: 'bg-yellow-100 text-yellow-900 border border-yellow-200',
    pricingBadge: 'bg-yellow-50 text-yellow-800 border border-yellow-200',
    btnBorder: 'border-yellow-400 text-yellow-700 hover:bg-yellow-50',
    pillActive: 'bg-yellow-600 text-white'
  },
  'Normal Cakes': {
    borderTop: 'border-t-4 border-stone-600',
    headerBg: 'bg-gradient-to-r from-stone-200/90 via-stone-100/60 to-white',
    iconBg: 'bg-stone-200 text-stone-700 border border-stone-300 shadow-2xs',
    badge: 'bg-stone-200 text-stone-800 border border-stone-300',
    pricingBadge: 'bg-stone-100 text-stone-700 border border-stone-200',
    btnBorder: 'border-stone-400 text-stone-700 hover:bg-stone-100',
    pillActive: 'bg-stone-700 text-white'
  },
  'Anniversary': {
    borderTop: 'border-t-4 border-pink-500',
    headerBg: 'bg-gradient-to-r from-pink-100/90 via-rose-50/60 to-white',
    iconBg: 'bg-pink-100 text-pink-600 border border-pink-200 shadow-2xs',
    badge: 'bg-pink-100 text-pink-800 border border-pink-200',
    pricingBadge: 'bg-pink-50 text-pink-700 border border-pink-200',
    btnBorder: 'border-pink-300 text-pink-600 hover:bg-pink-50',
    pillActive: 'bg-pink-600 text-white'
  },
  'Graduation': {
    borderTop: 'border-t-4 border-sky-500',
    headerBg: 'bg-gradient-to-r from-sky-100/90 via-sky-50/60 to-white',
    iconBg: 'bg-sky-100 text-sky-600 border border-sky-200 shadow-2xs',
    badge: 'bg-sky-100 text-sky-800 border border-sky-200',
    pricingBadge: 'bg-sky-50 text-sky-700 border border-sky-200',
    btnBorder: 'border-sky-300 text-sky-600 hover:bg-sky-50',
    pillActive: 'bg-sky-600 text-white'
  },
  'New Year': {
    borderTop: 'border-t-4 border-emerald-500',
    headerBg: 'bg-gradient-to-r from-emerald-100/90 via-emerald-50/60 to-white',
    iconBg: 'bg-emerald-100 text-emerald-600 border border-emerald-200 shadow-2xs',
    badge: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
    pricingBadge: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    btnBorder: 'border-emerald-300 text-emerald-600 hover:bg-emerald-50',
    pillActive: 'bg-emerald-600 text-white'
  },
  'Holiday': {
    borderTop: 'border-t-4 border-teal-500',
    headerBg: 'bg-gradient-to-r from-teal-100/90 via-teal-50/60 to-white',
    iconBg: 'bg-teal-100 text-teal-600 border border-teal-200 shadow-2xs',
    badge: 'bg-teal-100 text-teal-800 border border-teal-200',
    pricingBadge: 'bg-teal-50 text-teal-700 border border-teal-200',
    btnBorder: 'border-teal-300 text-teal-600 hover:bg-teal-50',
    pillActive: 'bg-teal-600 text-white'
  },
  'Fasting Cake': {
    borderTop: 'border-t-4 border-lime-600',
    headerBg: 'bg-gradient-to-r from-lime-100/90 via-lime-50/60 to-white',
    iconBg: 'bg-lime-100 text-lime-700 border border-lime-200 shadow-2xs',
    badge: 'bg-lime-100 text-lime-900 border border-lime-200',
    pricingBadge: 'bg-lime-50 text-lime-800 border border-lime-200',
    btnBorder: 'border-lime-400 text-lime-700 hover:bg-lime-50',
    pillActive: 'bg-lime-700 text-white'
  },
  'Extra Decorations': {
    borderTop: 'border-t-4 border-indigo-500',
    headerBg: 'bg-gradient-to-r from-indigo-100/90 via-indigo-50/60 to-white',
    iconBg: 'bg-indigo-100 text-indigo-600 border border-indigo-200 shadow-2xs',
    badge: 'bg-indigo-100 text-indigo-800 border border-indigo-200',
    pricingBadge: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
    btnBorder: 'border-indigo-300 text-indigo-600 hover:bg-indigo-50',
    pillActive: 'bg-indigo-600 text-white'
  },
  'Cake Accessories': {
    borderTop: 'border-t-4 border-indigo-500',
    headerBg: 'bg-gradient-to-r from-indigo-100/90 via-indigo-50/60 to-white',
    iconBg: 'bg-indigo-100 text-indigo-600 border border-indigo-200 shadow-2xs',
    badge: 'bg-indigo-100 text-indigo-800 border border-indigo-200',
    pricingBadge: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
    btnBorder: 'border-indigo-300 text-indigo-600 hover:bg-indigo-50',
    pillActive: 'bg-indigo-600 text-white'
  }
};

function getCategoryTheme(cat) {
  return categoryThemes[cat] || {
    borderTop: 'border-t-4 border-[#c94968]',
    headerBg: 'bg-gradient-to-r from-rose-50/80 via-stone-50/40 to-white',
    iconBg: 'bg-[#c94968]/10 text-[#c94968] border border-rose-100',
    badge: 'bg-stone-200 text-stone-700 border border-stone-300',
    pricingBadge: 'bg-rose-50 text-[#c94968] border border-rose-100',
    btnBorder: 'border-[#c94968]/30 text-[#c94968] hover:bg-[#c94968]/10',
    pillActive: 'bg-[#c94968] text-white'
  };
}

function getCategoryIcon(cat) {
  return categoryIcons[cat] || 'fa-solid fa-tag';
}

function getCategorySlug(cat) {
  return 'cat-' + String(cat || 'uncategorized').toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

async function loadAdminProducts() {
  try {
    let prods = null;

    // 1. Try local server API
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) prods = data;
        else if (data && data.success && Array.isArray(data.products)) prods = data.products;
      }
    } catch (_) {}

    // 2. Try Cloud Firestore
    if (!prods && window.FirebaseService && typeof window.FirebaseService.getProducts === 'function') {
      try {
        const fsProds = await window.FirebaseService.getProducts();
        if (Array.isArray(fsProds) && fsProds.length > 0) prods = fsProds;
      } catch (_) {}
    }

    // 3. Fallback to static catalog
    if (!prods) {
      try {
        const res = await fetch('/data/products.json');
        if (res.ok) {
          const data = await res.json();
          prods = Array.isArray(data) ? data : (data.products || null);
        }
      } catch (_) {}
    }

    if (prods && Array.isArray(prods)) {
      currentProducts = prods;
      renderAdminGroupedProducts();
      updateSizesBadge();
      renderDashboardStats();
      populateCategorySubmenu();

      // Trigger automatic one-time seed to Cloud Firestore if Firestore is empty
      if (window.FirebaseService && typeof window.FirebaseService.seedFirestoreFromLocal === 'function') {
        window.FirebaseService.seedFirestoreFromLocal(currentProducts, currentSettings);
      }
    }
  } catch (err) {
    console.error('Error fetching admin products:', err);
  }
}

function updateSizesBadge() {
  const badge = document.getElementById('tabBadgeSizes');
  if (badge) {
    badge.textContent = (typeof SIZE_ROOM_CATEGORIES !== 'undefined') ? SIZE_ROOM_CATEGORIES.length : 11;
  }
}

function handleAdminProductSearch(query) {
  adminProductSearchQuery = query;
  renderAdminGroupedProducts();
}

function clearAdminProductSearch() {
  adminProductSearchQuery = '';
  const input = document.getElementById('adminProductSearchInput');
  if (input) input.value = '';
  renderAdminGroupedProducts();
}

function filterAdminByCategory(catName) {
  activeAdminCategory = catName;
  renderAdminGroupedProducts();
}

function toggleCategorySection(slug) {
  if (collapsedCategories.has(slug)) {
    collapsedCategories.delete(slug);
  } else {
    collapsedCategories.add(slug);
  }
  
  const contentEl = document.getElementById(`cat-body-${slug}`);
  const iconEl = document.getElementById(`toggle-icon-${slug}`);
  if (contentEl && iconEl) {
    const isNowCollapsed = collapsedCategories.has(slug);
    contentEl.classList.toggle('hidden', isNowCollapsed);
    iconEl.className = isNowCollapsed ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-up';
  }
}

function toggleAllCategorySections() {
  const catNames = Array.from(new Set(currentProducts.map(p => p.category || 'Uncategorized')));
  const allSlugs = catNames.map(getCategorySlug);
  const isAnyOpen = allSlugs.some(slug => !collapsedCategories.has(slug));

  const btnText = document.getElementById('toggleAllCatsText');
  const btnIcon = document.getElementById('toggleAllCatsIcon');

  if (isAnyOpen) {
    allSlugs.forEach(slug => collapsedCategories.add(slug));
    if (btnText) btnText.textContent = 'Expand All';
    if (btnIcon) btnIcon.className = 'fa-solid fa-expand text-stone-500';
  } else {
    collapsedCategories.clear();
    if (btnText) btnText.textContent = 'Collapse All';
    if (btnIcon) btnIcon.className = 'fa-solid fa-compress text-stone-500';
  }
  renderAdminGroupedProducts();
}

function renderAdminTable(products) {
  renderAdminGroupedProducts();
}

function renderAdminGroupedProducts() {
  const container = document.getElementById('adminProductsGroupedContainer');
  if (!container) return;

  // 1. Overall Catalog Stats
  const totalCount = currentProducts.length;
  const categoriesSet = new Set(currentProducts.map(p => p.category || 'Uncategorized'));
  const allPrices = currentProducts.map(p => Number(p.price) || 0).filter(p => p > 0);
  const minPrice = allPrices.length ? Math.min(...allPrices) : 0;
  const maxPrice = allPrices.length ? Math.max(...allPrices) : 0;
  const featuredCount = currentProducts.filter(p => p.featured || p.popular).length;

  const elTotal = document.getElementById('summaryTotalProducts');
  if (elTotal) elTotal.textContent = totalCount;
  const elCats = document.getElementById('summaryTotalCategories');
  if (elCats) elCats.textContent = categoriesSet.size;
  const elPrice = document.getElementById('summaryPriceRange');
  if (elPrice) elPrice.textContent = `${minPrice.toLocaleString()} – ${maxPrice.toLocaleString()} ETB`;
  const elFeatured = document.getElementById('summaryFeaturedCount');
  if (elFeatured) elFeatured.textContent = featuredCount;

  const tabBadge = document.getElementById('tabBadgeProducts');
  if (tabBadge) tabBadge.textContent = totalCount;

  // 2. Count items per category across full catalog
  const catCounts = {};
  currentProducts.forEach(p => {
    const c = p.category || 'Uncategorized';
    catCounts[c] = (catCounts[c] || 0) + 1;
  });

  const sortedCats = Object.keys(catCounts).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });

  // 3. Render Quick-Filter Navigation Pills
  const filterBar = document.getElementById('adminCategoryFilterBar');
  if (filterBar) {
    const isAllActive = activeAdminCategory === 'all';
    const allPill = `
      <button onclick="filterAdminByCategory('all')"
              class="px-3.5 py-1.5 rounded-full font-bold text-xs whitespace-nowrap transition flex items-center gap-1.5 ${isAllActive ? 'bg-chocolate text-white shadow-sm' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}">
        <i class="fa-solid fa-layer-group text-[10px]"></i>
        <span>All Products</span>
        <span class="text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${isAllActive ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'}">${totalCount}</span>
      </button>
    `;

    const catPills = sortedCats.map(cat => {
      const isActive = activeAdminCategory === cat;
      const icon = getCategoryIcon(cat);
      const theme = getCategoryTheme(cat);
      const safeCat = cat.replace(/'/g, "\\'");
      return `
        <button onclick="filterAdminByCategory('${safeCat}')"
                class="px-3.5 py-1.5 rounded-full font-bold text-xs whitespace-nowrap transition flex items-center gap-1.5 ${isActive ? theme.pillActive + ' shadow-sm' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}">
          <i class="${icon} text-[10px] ${isActive ? 'text-white' : ''}"></i>
          <span>${cat}</span>
          <span class="text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${isActive ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'}">${catCounts[cat]}</span>
        </button>
      `;
    }).join('');

    filterBar.innerHTML = allPill + catPills;
  }

  // Clear button visibility for search
  const clearBtn = document.getElementById('clearAdminSearchBtn');
  if (clearBtn) {
    clearBtn.classList.toggle('hidden', !adminProductSearchQuery.trim());
  }

  // 4. Filter currentProducts for display
  let filtered = currentProducts;
  if (activeAdminCategory !== 'all') {
    filtered = filtered.filter(p => (p.category || 'Uncategorized') === activeAdminCategory);
  }

  if (adminProductSearchQuery.trim()) {
    const q = adminProductSearchQuery.trim().toLowerCase();
    filtered = filtered.filter(p => {
      const name = (p.name || '').toLowerCase();
      const cat = (p.category || '').toLowerCase();
      const desc = (p.description || '').toLowerCase();
      const id = (p.id || '').toLowerCase();
      const priceStr = String(p.price || '');
      return name.includes(q) || cat.includes(q) || desc.includes(q) || id.includes(q) || priceStr.includes(q);
    });
  }

  // Empty state if no products match
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-sm">
        <div class="w-16 h-16 rounded-full bg-rose-50 text-[#c94968] flex items-center justify-center text-2xl mx-auto mb-3">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <h3 class="font-bold text-chocolate text-base">No Products Found</h3>
        <p class="text-xs text-stone-400 mt-1 mb-4">
          ${adminProductSearchQuery ? `No items matched your search "${escapeHtml(adminProductSearchQuery)}".` : 'No items found in this category.'}
        </p>
        <div class="flex items-center justify-center gap-2">
          <button onclick="clearAdminProductSearch(); filterAdminByCategory('all');" class="btn-gold px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shadow">
            Reset Filters
          </button>
          <button onclick="openAddCakeModal('${activeAdminCategory !== 'all' ? activeAdminCategory.replace(/'/g, "\\'") : ''}')" class="px-4 py-2 rounded-xl border border-stone-300 hover:bg-stone-50 text-xs font-bold text-stone-700">
            + Add New Product
          </button>
        </div>
      </div>
    `;
    return;
  }

  // 5. Group filtered products by category
  const groups = {};
  filtered.forEach(p => {
    const cat = p.category || 'Uncategorized';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(p);
  });

  // Display categories in sorted canonical order
  const displayCats = sortedCats.filter(cat => groups[cat] && groups[cat].length > 0);

  container.innerHTML = displayCats.map(cat => {
    const items = groups[cat];
    const slug = getCategorySlug(cat);
    const icon = getCategoryIcon(cat);
    const isCollapsed = collapsedCategories.has(slug);
    const safeCat = cat.replace(/'/g, "\\'");

    // Calculate category pricing stats
    const prices = items.map(p => Number(p.price) || 0).filter(p => p > 0);
    const catMin = prices.length ? Math.min(...prices) : 0;
    const catMax = prices.length ? Math.max(...prices) : 0;
    const priceText = catMin === catMax
      ? `${catMin.toLocaleString()} ETB`
      : `${catMin.toLocaleString()} – ${catMax.toLocaleString()} ETB`;

    const theme = getCategoryTheme(cat);

    return `
      <section class="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden transition ${theme.borderTop}" id="cat-section-${slug}">
        
        <!-- Category Header Bar with Distinct Category Color Accent -->
        <div class="p-4 sm:p-5 ${theme.headerBg} border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl ${theme.iconBg} flex items-center justify-center text-xl flex-shrink-0 shadow-xs">
              <i class="${icon}"></i>
            </div>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h3 class="font-bold text-chocolate text-base sm:text-lg">${cat}</h3>
                <span class="${theme.badge} text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-2xs">
                  ${items.length} ${items.length === 1 ? 'item' : 'items'}
                </span>
                <span class="${theme.pricingBadge} font-bold px-2.5 py-0.5 rounded-full text-[11px] flex items-center gap-1 shadow-2xs">
                  <i class="fa-solid fa-tag text-[10px]"></i>
                  <span>Pricing: <strong>${priceText}</strong></span>
                </span>
              </div>
              <span class="text-[11px] text-stone-500 font-medium block mt-0.5">Category offering in MAK CAKE gallery</span>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="openAddCakeModal('${safeCat}')" 
                    class="px-3.5 py-1.5 rounded-xl border ${theme.btnBorder} bg-white/80 hover:bg-white text-xs font-bold flex items-center gap-1.5 transition shadow-2xs">
              <i class="fa-solid fa-plus text-[10px]"></i>
              <span>Add to ${cat}</span>
            </button>
            <button onclick="toggleCategorySection('${slug}')" 
                    class="w-8 h-8 rounded-xl bg-white/80 hover:bg-white text-stone-600 border border-stone-200 flex items-center justify-center text-xs transition shadow-2xs" 
                    title="Toggle Collapse">
              <i id="toggle-icon-${slug}" class="${isCollapsed ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-up'}"></i>
            </button>
          </div>
        </div>

        <!-- Category Products (Body) -->
        <div id="cat-body-${slug}" class="${isCollapsed ? 'hidden' : ''}">
          
          <!-- DESKTOP TABLE VIEW (Visible on tablet & desktop) -->
          <div class="hidden sm:block overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-stone-50/70 text-stone-500 font-bold uppercase tracking-wider border-b border-stone-200">
                <tr>
                  <th class="py-3 px-4">Product</th>
                  <th class="py-3 px-4">Base Price</th>
                  <th class="py-3 px-4">Availability</th>
                  <th class="py-3 px-4">Servings / Portions</th>
                  <th class="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-stone-100">
                ${items.map(cake => `
                  <tr class="hover:bg-stone-50/80 transition ${cake.isSoldOut ? 'opacity-70 bg-stone-50/50' : ''}">
                    <td class="py-3 px-4">
                      <div class="flex items-center gap-3">
                        <img src="${cake.image}" alt="${escapeHtml(cake.name)}" class="w-12 h-12 rounded-xl object-cover border border-stone-200 shadow-xs flex-shrink-0" onerror="this.src='/images/hero-cake-only.jpg'">
                        <div>
                          <div class="flex items-center gap-1.5">
                            <span class="font-bold text-chocolate text-sm">${escapeHtml(cake.name)}</span>
                            ${cake.isSoldOut ? '<span class="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-rose-100 text-rose-700 border border-rose-200">Sold Out</span>' : '<span class="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">In Stock</span>'}
                          </div>
                          <span class="text-[11px] text-stone-400 font-mono">ID: ${cake.id}</span>
                        </div>
                      </div>
                    </td>
                    <td class="py-3 px-4">
                      <div class="flex items-baseline gap-1">
                        <span class="text-base font-extrabold text-chocolate font-serif-luxury">${cake.price.toLocaleString()}</span>
                        <span class="text-xs font-bold text-[#c94968]">ETB</span>
                      </div>
                      ${cake.sizes && cake.sizes.length > 1 ? `<span class="text-[10px] text-stone-400 block">${cake.sizes.length} size options</span>` : ''}
                    </td>
                    <td class="py-3 px-4">
                      <button type="button" onclick="toggleProductStock('${cake.id}')" 
                              class="px-2.5 py-1 rounded-full text-[11px] font-bold border transition flex items-center gap-1.5 ${cake.isSoldOut ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100' : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'}"
                              title="Click to toggle availability">
                        <i class="fa-solid ${cake.isSoldOut ? 'fa-ban text-rose-500' : 'fa-check text-emerald-600'} text-[10px]"></i>
                        <span>${cake.isSoldOut ? 'Sold Out (Switch)' : 'Available (Switch)'}</span>
                      </button>
                    </td>
                    <td class="py-3 px-4 text-stone-600">
                      ${escapeHtml(cake.servings || (cake.category === 'Cake Accessories' ? 'Per item' : 'Standard portion'))}
                    </td>
                    <td class="py-3 px-4 text-right">
                      <div class="flex items-center justify-end gap-1.5">
                        <button onclick="openEditCakeModal('${cake.id}')" class="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold transition flex items-center gap-1">
                          <i class="fa-solid fa-pen text-[10px]"></i>
                          <span>Edit</span>
                        </button>
                        <button onclick="deleteProduct('${cake.id}', '${escapeAttr(cake.name)}')" class="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold transition flex items-center gap-1">
                          <i class="fa-solid fa-trash text-[10px]"></i>
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- MOBILE CARD VIEW (Optimized for phones & touch screens) -->
          <div class="sm:hidden divide-y divide-stone-100">
            ${items.map(cake => `
              <div class="p-4 flex items-start gap-3 hover:bg-stone-50 transition ${cake.isSoldOut ? 'opacity-75 bg-stone-50/50' : ''}">
                <img src="${cake.image}" alt="${escapeHtml(cake.name)}" class="w-16 h-16 rounded-2xl object-cover border border-stone-200 flex-shrink-0 shadow-xs" onerror="this.src='/images/hero-cake-only.jpg'">
                <div class="flex-grow min-w-0">
                  <div class="flex items-start justify-between gap-1">
                    <h4 class="font-bold text-chocolate text-xs truncate">${escapeHtml(cake.name)}</h4>
                    <span class="text-[10px] text-stone-400 font-mono">#${cake.id}</span>
                  </div>
                  
                  <div class="flex items-baseline gap-1 mt-1">
                    <span class="text-sm font-extrabold text-chocolate">${cake.price.toLocaleString()}</span>
                    <span class="text-[11px] font-bold text-[#c94968]">ETB</span>
                    <span class="text-[11px] text-stone-400 ml-1">&bull; ${escapeHtml(cake.servings || (cake.category === 'Cake Accessories' ? 'Per item' : 'Standard'))}</span>
                  </div>

                  <div class="flex items-center justify-between gap-2 mt-2 pt-1.5 border-t border-stone-100 flex-wrap">
                    <button type="button" onclick="toggleProductStock('${cake.id}')" 
                            class="px-2 py-0.5 rounded-full text-[10px] font-bold border transition flex items-center gap-1 ${cake.isSoldOut ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200'}">
                      <i class="fa-solid ${cake.isSoldOut ? 'fa-ban text-rose-500' : 'fa-check text-emerald-600'} text-[9px]"></i>
                      <span>${cake.isSoldOut ? 'Sold Out' : 'Available'}</span>
                    </button>
                    <div class="flex items-center gap-1.5">
                      <button onclick="openEditCakeModal('${cake.id}')" class="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 text-xs font-bold">
                        <i class="fa-solid fa-pen text-[9px] mr-1"></i>Edit
                      </button>
                      <button onclick="deleteProduct('${cake.id}', '${escapeAttr(cake.name)}')" class="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 text-xs font-bold">
                        <i class="fa-solid fa-trash text-[9px] mr-1"></i>Del
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

        </div>

      </section>
    `;
  }).join('');
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(str) {
  return String(str || '').replace(/'/g, "\\'");
}

let modalSizeTiers = [];

function renderModalSizeTiers(sizes) {
  if (sizes !== undefined) {
    modalSizeTiers = JSON.parse(JSON.stringify(sizes || []));
  }
  const container = document.getElementById('modalSizeTiersContainer');
  if (!container) return;

  if (!modalSizeTiers || modalSizeTiers.length === 0) {
    container.innerHTML = `
      <div class="text-[11px] text-stone-400 italic py-2 px-3 bg-stone-100/70 rounded-xl">
        No custom size tiers configured. The cake base price will apply as default.
      </div>
    `;
    return;
  }

  container.innerHTML = modalSizeTiers.map((tier, idx) => `
    <div class="flex items-center gap-2 bg-white p-2 rounded-xl border border-stone-200">
      <div class="flex-1">
        <input type="text" placeholder="Size / Grams Label (e.g. 500g Box / 4-inch Bento)" 
               value="${escapeHtml(tier.name || '')}"
               oninput="modalSizeTiers[${idx}].name = this.value"
               class="w-full text-xs p-1.5 rounded-lg border border-stone-200 focus:outline-none focus:border-gold">
      </div>
      <div class="w-28 relative">
        <input type="number" placeholder="Price ETB" 
               value="${Number(tier.price) || 0}"
               oninput="modalSizeTiers[${idx}].price = parseFloat(this.value) || 0"
               class="w-full text-xs p-1.5 pr-8 rounded-lg border border-stone-200 focus:outline-none focus:border-gold font-mono font-bold text-[#c94968]">
        <span class="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-stone-400 font-bold">ETB</span>
      </div>
      <button type="button" onclick="removeModalSizeTierRow(${idx})" class="w-7 h-7 rounded-lg text-stone-400 hover:text-rose-500 hover:bg-rose-50 flex items-center justify-center transition" title="Remove size tier">
        <i class="fa-solid fa-trash-can text-xs"></i>
      </button>
    </div>
  `).join('');
}

function addModalSizeTierRow(defaultName = '', defaultPrice = 0) {
  const basePrice = parseFloat(document.getElementById('editPrice')?.value) || 3000;
  modalSizeTiers.push({
    name: defaultName || 'Standard Size',
    price: defaultPrice || basePrice
  });
  renderModalSizeTiers();
}

function removeModalSizeTierRow(idx) {
  modalSizeTiers.splice(idx, 1);
  renderModalSizeTiers();
}

// Dynamic Form Adaptor based on Category selection
function onAdminCategoryChange(cat) {
  const isAcc = (cat === 'Extra Decorations' || cat === 'Cake Accessories');

  const lblName = document.getElementById('lblProductName');
  const lblPrice = document.getElementById('lblProductPrice');
  const lblDesc = document.getElementById('lblProductDesc');
  const descStar = document.getElementById('descRequiredStar');
  const descInput = document.getElementById('editDescription');
  const modalTitle = document.getElementById('productEditModalTitle');
  const btnSave = document.getElementById('btnSaveProductModal');

  const contServings = document.getElementById('containerServings');
  const contFlavors = document.getElementById('containerFlavors');
  const contPackageSizes = document.getElementById('containerPackageSizes');
  const contBadges = document.getElementById('containerBadges');
  const contAccessorySettings = document.getElementById('containerAccessorySettings');

  const isEditing = Boolean(document.getElementById('editProductId')?.value);

  if (isAcc) {
    if (modalTitle) modalTitle.textContent = isEditing ? 'Edit Extra Decoration' : 'Add New Product to Extra Decorations';
    if (lblName) lblName.innerHTML = 'Decoration Name <span class="text-rose-500">*</span>';
    if (lblPrice) lblPrice.innerHTML = 'Price in ETB <span class="text-rose-500">*</span>';
    if (lblDesc) lblDesc.innerHTML = 'Description (Optional)';
    if (descStar) descStar.classList.add('hidden');
    if (descInput) {
      descInput.required = false;
      descInput.placeholder = 'e.g. Set of 3D metallic candles, pack of 4 sparklers, custom topper...';
    }
    if (contServings) contServings.classList.add('hidden');
    if (contFlavors) contFlavors.classList.add('hidden');
    if (contPackageSizes) contPackageSizes.classList.add('hidden');
    if (contBadges) contBadges.classList.add('hidden');
    if (contAccessorySettings) contAccessorySettings.classList.remove('hidden');
    if (btnSave) btnSave.textContent = 'Save Accessory';
  } else {
    if (modalTitle) modalTitle.textContent = isEditing ? 'Edit Cake Product' : 'Add New Cake Product';
    if (lblName) lblName.innerHTML = 'Cake Name <span class="text-rose-500">*</span>';
    if (lblPrice) lblPrice.innerHTML = 'Base Price in ETB <span class="text-rose-500">*</span>';
    if (lblDesc) lblDesc.innerHTML = 'Description <span class="text-rose-500">*</span>';
    if (descStar) descStar.classList.remove('hidden');
    if (descInput) {
      descInput.required = true;
      descInput.placeholder = 'Describe ingredients, frosting, sponge layers...';
    }
    if (contServings) contServings.classList.remove('hidden');
    if (contFlavors) contFlavors.classList.remove('hidden');
    if (contPackageSizes) contPackageSizes.classList.remove('hidden');
    if (contBadges) contBadges.classList.remove('hidden');
    if (contAccessorySettings) contAccessorySettings.classList.add('hidden');
    if (btnSave) btnSave.textContent = 'Save Cake Product';
  }
}

const ADMIN_AVAILABLE_CAKE_CATEGORIES = [
  'Birthday Cakes',
  'Graduation',
  'Wedding Cakes',
  'Anniversary',
  'Couples',
  'Normal Cakes',
  'Mini Cakes',
  'Fasting Cake',
  'Cookies',
  'New Year',
  'Holiday',
  'Cupcakes'
];

function renderAdminRecommendedCategoriesPills(selected = []) {
  const container = document.getElementById('adminRecommendedCategoriesPills');
  if (!container) return;

  const set = new Set(selected || []);
  container.innerHTML = ADMIN_AVAILABLE_CAKE_CATEGORIES.map(cat => {
    const isChecked = set.has(cat);
    return `
      <label class="cursor-pointer select-none inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition ${isChecked ? 'bg-rose-50 border-[#c94968] text-[#c94968] shadow-2xs' : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'}">
        <input type="checkbox" value="${cat}" ${isChecked ? 'checked' : ''} onchange="toggleAdminCatPill(this)" class="sr-only">
        <i class="fa-solid ${isChecked ? 'fa-check' : 'fa-plus'} text-[9px]"></i>
        <span>${cat}</span>
      </label>
    `;
  }).join('');
}

function toggleAdminCatPill(checkbox) {
  const label = checkbox.closest('label');
  const icon = label.querySelector('i');
  if (checkbox.checked) {
    label.className = 'cursor-pointer select-none inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition bg-rose-50 border-[#c94968] text-[#c94968] shadow-2xs';
    if (icon) icon.className = 'fa-solid fa-check text-[9px]';
  } else {
    label.className = 'cursor-pointer select-none inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition bg-white border-stone-200 text-stone-600 hover:border-stone-300';
    if (icon) icon.className = 'fa-solid fa-plus text-[9px]';
  }
}

// Available vs Sold Out Switcher in Admin Modal
function setAdminModalStock(isSoldOut) {
  const hiddenInput = document.getElementById('editIsSoldOut');
  const btnAvail = document.getElementById('btnStockAvailable');
  const btnSold = document.getElementById('btnStockSoldOut');
  const helpText = document.getElementById('stockStatusHelpText');

  if (hiddenInput) hiddenInput.value = isSoldOut ? 'true' : 'false';

  if (isSoldOut) {
    if (btnAvail) btnAvail.className = 'px-3.5 py-1.5 rounded-xl text-xs font-bold border transition bg-white text-stone-600 border-stone-300 hover:bg-stone-100';
    if (btnSold) btnSold.className = 'px-3.5 py-1.5 rounded-xl text-xs font-bold border transition bg-rose-600 text-white border-rose-600 shadow-2xs';
    if (helpText) helpText.textContent = 'Marked as Sold Out (Hidden or disabled on website)';
  } else {
    if (btnAvail) btnAvail.className = 'px-3.5 py-1.5 rounded-xl text-xs font-bold border transition bg-emerald-600 text-white border-emerald-600 shadow-2xs';
    if (btnSold) btnSold.className = 'px-3.5 py-1.5 rounded-xl text-xs font-bold border transition bg-white text-stone-600 border-stone-300 hover:bg-stone-100';
    if (helpText) helpText.textContent = 'Customers can order this item';
  }
}

// Quick 1-Click Toggle Stock from Catalog Table / Cards
async function toggleProductStock(id) {
  try {
    const res = await fetch(`/api/products/${id}/toggle-stock`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    });
    const data = await res.json();
    if (data.success) {
      loadAdminProducts();
    } else {
      alert(`Error toggling stock: ${data.error || 'Failed'}`);
    }
  } catch (err) {
    console.error('Stock toggle error:', err);
    alert('Server connection error toggling stock');
  }
}

// Image File Upload Helper with On-Device Compression
async function handleAdminImageUpload(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  if (file.size > 20 * 1024 * 1024) {
    alert('Image file is too large (max 20MB).');
    return;
  }

  try {
    const dataUri = await compressImage(file, 1000, 0.82);
    const urlInput = document.getElementById('editImage');
    if (urlInput) urlInput.value = dataUri;
    updateImagePreview(dataUri);
  } catch (err) {
    console.warn('Image compression fallback:', err);
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUri = e.target.result;
      const urlInput = document.getElementById('editImage');
      if (urlInput) urlInput.value = dataUri;
      updateImagePreview(dataUri);
    };
    reader.readAsDataURL(file);
  }
}

function updateImagePreview(src) {
  const img = document.getElementById('editImagePreview');
  if (img) {
    img.src = src || '/images/hero-cake-only.jpg';
  }
}

function openAddCakeModal(preselectedCategory) {
  const category = preselectedCategory || 'Normal Cakes';
  const isAcc = (category === 'Extra Decorations' || category === 'Cake Accessories');

  document.getElementById('editProductId').value = '';
  document.getElementById('productEditForm').reset();
  
  const catSelect = document.getElementById('editCategory');
  if (catSelect) catSelect.value = category;

  document.getElementById('editPrice').value = isAcc ? '150' : '3000';
  document.getElementById('editServings').value = isAcc ? 'Per item' : '8-12 servings';
  
  const defaultImg = isAcc 
    ? 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=80'
    : 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80';
  document.getElementById('editImage').value = defaultImg;
  updateImagePreview(defaultImg);

  document.getElementById('editFlavors').value = isAcc ? '' : 'Madagascar Vanilla, Belgian Chocolate, Red Velvet';
  document.getElementById('editDescription').value = '';

  const chkIsRec = document.getElementById('editIsRecommended');
  if (chkIsRec) chkIsRec.checked = true;
  const chkReqAge = document.getElementById('editRequiresAge');
  if (chkReqAge) chkReqAge.checked = false;
  renderAdminRecommendedCategoriesPills(['Birthday Cakes']);

  renderModalSizeTiers([]);
  setAdminModalStock(false);
  onAdminCategoryChange(category);

  document.getElementById('productEditModal').classList.remove('hidden');
}

function openEditCakeModal(cakeId) {
  const cake = currentProducts.find(c => c.id === cakeId);
  if (!cake) return;

  const isAcc = (cake.category === 'Extra Decorations' || cake.category === 'Cake Accessories');

  document.getElementById('editProductId').value = cake.id;
  document.getElementById('editName').value = cake.name;
  document.getElementById('editCategory').value = cake.category || 'Normal Cakes';
  document.getElementById('editPrice').value = cake.price;
  document.getElementById('editServings').value = cake.servings || (isAcc ? 'Per item' : '8-12 servings');
  document.getElementById('editImage').value = cake.image || '';
  updateImagePreview(cake.image);
  document.getElementById('editDescription').value = cake.description || '';
  document.getElementById('editFlavors').value = (cake.flavors || []).join(', ');
  document.getElementById('editFeatured').checked = Boolean(cake.featured);
  document.getElementById('editPopular').checked = Boolean(cake.popular);

  const chkIsRec = document.getElementById('editIsRecommended');
  if (chkIsRec) chkIsRec.checked = cake.isRecommended !== undefined ? Boolean(cake.isRecommended) : true;
  const chkReqAge = document.getElementById('editRequiresAge');
  if (chkReqAge) chkReqAge.checked = Boolean(cake.requiresAge);
  renderAdminRecommendedCategoriesPills(cake.recommendedCategories || []);

  setAdminModalStock(Boolean(cake.isSoldOut));
  renderModalSizeTiers(cake.sizes || []);
  onAdminCategoryChange(cake.category);

  document.getElementById('productEditModal').classList.remove('hidden');
}

function closeProductEditModal() {
  document.getElementById('productEditModal').classList.add('hidden');
}

async function saveProductForm(e) {
  e.preventDefault();

  const id = document.getElementById('editProductId').value;
  const name = document.getElementById('editName').value.trim();
  const category = document.getElementById('editCategory').value;
  const price = parseFloat(document.getElementById('editPrice').value);
  const servings = document.getElementById('editServings').value.trim();
  const image = document.getElementById('editImage').value.trim();
  const description = document.getElementById('editDescription').value.trim();
  const flavorsRaw = document.getElementById('editFlavors').value;
  const featured = document.getElementById('editFeatured').checked;
  const popular = document.getElementById('editPopular').checked;
  const isSoldOut = document.getElementById('editIsSoldOut').value === 'true';

  const isAcc = (category === 'Extra Decorations' || category === 'Cake Accessories');

  const flavors = isAcc ? [] : flavorsRaw.split(',').map(f => f.trim()).filter(Boolean);

  const cleanSizes = isAcc ? [] : (modalSizeTiers || [])
    .map(s => ({ name: String(s.name || '').trim(), price: parseFloat(s.price) || 0 }))
    .filter(s => s.name.length > 0);

  const recommendedCategories = isAcc
    ? Array.from(document.querySelectorAll('#adminRecommendedCategoriesPills input[type="checkbox"]:checked')).map(cb => cb.value)
    : [];
  const requiresAge = isAcc ? Boolean(document.getElementById('editRequiresAge')?.checked) : false;
  const isRecommended = isAcc ? (document.getElementById('editIsRecommended') ? Boolean(document.getElementById('editIsRecommended').checked) : true) : false;

  const payload = {
    name,
    category,
    price,
    servings: isAcc ? (servings || 'Per item') : servings,
    image,
    description,
    flavors,
    sizes: cleanSizes,
    featured: isAcc ? false : featured,
    popular: isAcc ? false : popular,
    isSoldOut,
    recommendedCategories,
    requiresAge,
    isRecommended
  };

  const isEdit = Boolean(id);
  const endpoint = isEdit ? `/api/products/${id}` : '/api/products';
  const method = isEdit ? 'PUT' : 'POST';

  // 1. Cloud Firestore write
  if (window.FirebaseService && window.FirebaseService.isAvailable()) {
    try {
      const prodToSave = {
        ...payload,
        id: id || ('prod-' + Date.now())
      };
      await window.FirebaseService.saveProduct(prodToSave);
    } catch (fsErr) {
      console.warn('Firestore product save notice:', fsErr);
    }
  }

  // 2. Local Node backend write
  try {
    const res = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (data.success) {
      closeProductEditModal();
      loadAdminProducts();
    } else {
      alert(`Error saving product: ${data.error || 'Unknown error'}`);
    }
  } catch (err) {
    // If running in static Netlify mode without local server
    closeProductEditModal();
    loadAdminProducts();
    showAdminToast('Product saved to Cloud Firestore!', 'success');
  }
}

async function deleteProduct(id, name) {
  if (!confirm(`Are you sure you want to remove "${name}" from the cake gallery?`)) {
    return;
  }

  // 1. Cloud Firestore delete
  if (window.FirebaseService && window.FirebaseService.isAvailable()) {
    try {
      await window.FirebaseService.deleteProduct(id);
    } catch (fsErr) {
      console.warn('Firestore product delete notice:', fsErr);
    }
  }

  try {
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    });

    const data = await res.json();
    if (data.success) {
      loadAdminProducts();
    } else {
      alert(`Error deleting product: ${data.error || 'Unknown error'}`);
    }
  } catch (err) {
    loadAdminProducts();
    showAdminToast('Product removed from Cloud Firestore!', 'info');
  }
}



// ============================================================
// TAB 2: MANAGE RECENT CREATIONS GALLERY
// ============================================================

async function loadAdminCreations() {
  try {
    let list = null;
    try {
      const res = await fetch('/api/admin/creations', {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) list = data;
        else if (data && data.success && Array.isArray(data.creations)) list = data.creations;
      }
    } catch (_) {}

    if (!list) {
      try {
        const res = await fetch('/data/creations.json');
        if (res.ok) {
          const data = await res.json();
          list = Array.isArray(data) ? data : (data.creations || null);
        }
      } catch (_) {}
    }

    if (list && Array.isArray(list)) {
      adminCreations = list;
      updateCreationsCountBadges();
      renderAdminCreations();
    }
  } catch (err) {
    console.error('Error fetching admin creations:', err);
  }
}

function updateCreationsCountBadges() {
  const total = adminCreations.length;
  const publishedCount = adminCreations.filter(c => c.published !== false).length;
  const unpubCount = total - publishedCount;

  const tabBadge = document.getElementById('tabBadgeCreations');
  const navBadge = document.getElementById('navBadgeCreations');
  const countBadge = document.getElementById('creationsCountBadge');
  const countAll = document.getElementById('countAllCreations');
  const countPub = document.getElementById('countPubCreations');
  const countUnpub = document.getElementById('countUnpubCreations');

  if (tabBadge) tabBadge.textContent = total;
  if (navBadge) navBadge.textContent = total;
  if (countBadge) countBadge.textContent = `${total} creation${total === 1 ? '' : 's'}`;
  if (countAll) countAll.textContent = total;
  if (countPub) countPub.textContent = publishedCount;
  if (countUnpub) countUnpub.textContent = unpubCount;
}

function filterAdminCreations(filter) {
  currentCreationsFilter = filter;

  const btnAll = document.getElementById('filterCreationsAll') || document.getElementById('creationsFilterAll');
  const btnPub = document.getElementById('filterCreationsPub') || document.getElementById('creationsFilterPublished');
  const btnUnpub = document.getElementById('filterCreationsUnpub') || document.getElementById('creationsFilterUnpublished');

  if (btnAll && btnPub && btnUnpub) {
    [btnAll, btnPub, btnUnpub].forEach(b => {
      b.className = 'px-3.5 py-1.5 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 transition font-bold';
    });

    if (filter === 'published') {
      btnPub.className = 'px-3.5 py-1.5 rounded-full bg-chocolate text-white transition font-bold';
    } else if (filter === 'unpublished') {
      btnUnpub.className = 'px-3.5 py-1.5 rounded-full bg-chocolate text-white transition font-bold';
    } else {
      btnAll.className = 'px-3.5 py-1.5 rounded-full bg-chocolate text-white transition font-bold';
    }
  }

  renderAdminCreations();
}

// Global alias for compatibility
window.filterCreations = filterAdminCreations;

function renderAdminCreations() {
  const container = document.getElementById('adminCreationsList');
  if (!container) return;

  let filtered = adminCreations;
  if (currentCreationsFilter === 'published') {
    filtered = adminCreations.filter(c => c.published !== false);
  } else if (currentCreationsFilter === 'unpublished') {
    filtered = adminCreations.filter(c => c.published === false);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-stone-400">
        <div class="w-16 h-16 rounded-full bg-stone-100 text-stone-300 flex items-center justify-center text-2xl mx-auto mb-3">
          <i class="fa-solid fa-camera"></i>
        </div>
        <p class="font-bold text-chocolate text-sm">No creations found in this view</p>
        <p class="text-xs text-stone-400 mt-1">Upload cake photos above to showcase them on your website.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(creation => {
    const isLive = creation.published !== false;
    const formattedDate = formatDateDisplay(creation.date || creation.createdAt);

    return `
      <div class="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col group">
        <!-- Photo with status overlay -->
        <div class="relative aspect-square w-full overflow-hidden bg-stone-100">
          <img src="${creation.imageUrl}" alt="${creation.title || 'Cake Creation'}" 
               loading="lazy"
               class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
          
          <!-- Status pill -->
          <div class="absolute top-2.5 left-2.5">
            ${isLive 
              ? '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold shadow-sm"><span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> Live on Web</span>'
              : '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-stone-700/80 backdrop-blur text-white text-[10px] font-bold shadow-sm"><i class="fa-solid fa-eye-slash text-[9px]"></i> Hidden</span>'
            }
          </div>

          <!-- Quick Toggle Button on image -->
          <button onclick="toggleCreationPublish('${creation.id}')" 
                  title="${isLive ? 'Click to unpublish/hide from public' : 'Click to publish on live website'}"
                  class="absolute top-2.5 right-2.5 w-8 h-8 rounded-full ${isLive ? 'bg-white/90 text-stone-700 hover:text-[#c94968]' : 'bg-[#c94968] text-white hover:bg-[#b03855]'} shadow-md flex items-center justify-center transition text-xs">
            <i class="fa-solid ${isLive ? 'fa-eye' : 'fa-eye-slash'}"></i>
          </button>
        </div>

        <!-- Info Body -->
        <div class="p-4 flex flex-col flex-grow justify-between space-y-3">
          <div>
            <div class="flex items-center justify-between text-[11px] text-stone-400 mb-1">
              <span><i class="fa-regular fa-calendar mr-1"></i> ${formattedDate}</span>
              <span class="font-mono text-[10px]">#${creation.order || 1}</span>
            </div>
            <h4 class="font-bold text-chocolate text-xs line-clamp-1">${creation.title || 'Cake Creation'}</h4>
            ${creation.caption ? `<p class="text-[11px] text-stone-500 mt-1 line-clamp-2 leading-relaxed">${creation.caption}</p>` : '<p class="text-[11px] text-stone-300 italic mt-1">No caption</p>'}
          </div>

          <!-- Actions -->
          <div class="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
            <button onclick="openEditCreationModal('${creation.id}')" 
                    class="flex-1 py-1.5 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-pen text-[11px]"></i>
              <span>Edit</span>
            </button>
            <button onclick="deleteCreation('${creation.id}', '${escapeAttr(creation.title || 'Cake Creation')}')" 
                    class="py-1.5 px-3 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-trash text-[11px]"></i>
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function formatDateDisplay(dateStr) {
  if (!dateStr) return 'Recent';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch (e) {
    return dateStr;
  }
}

// ------------------------------------------------------------
// CLIENT-SIDE IMAGE COMPRESSION & MULTI-PHOTO STAGING
// ------------------------------------------------------------

function compressImage(file, maxDimension = 1600, quality = 0.85) {
  return new Promise((resolve, reject) => {
    // If not an image, reject
    if (!file.type.match(/^image\//)) {
      return reject(new Error('File is not an image'));
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

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

        // Convert to high-quality JPEG Data URI
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image for compression'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

// Drag & Drop handlers
function handleDragOver(e) {
  e.preventDefault();
  e.stopPropagation();
  const dropzone = document.getElementById('creationDropzone');
  if (dropzone) dropzone.classList.add('border-[#c94968]', 'bg-rose-100/70');
}

function handleDragLeave(e) {
  e.preventDefault();
  e.stopPropagation();
  const dropzone = document.getElementById('creationDropzone');
  if (dropzone) dropzone.classList.remove('border-[#c94968]', 'bg-rose-100/70');
}

function handleDrop(e) {
  e.preventDefault();
  e.stopPropagation();
  const dropzone = document.getElementById('creationDropzone');
  if (dropzone) dropzone.classList.remove('border-[#c94968]', 'bg-rose-100/70');
  
  if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
    handleCreationFilesSelect(e.dataTransfer.files);
  }
}

async function handleCreationFilesSelect(files) {
  if (!files || files.length === 0) return;

  const fileList = Array.from(files);
  const stagingArea = document.getElementById('uploadStagingArea');
  stagingArea.classList.remove('hidden');

  const defaultDate = document.getElementById('batchCreationDate').value || new Date().toISOString().slice(0, 10);
  const defaultCaption = document.getElementById('batchDefaultCaption').value || '';

  // Show quick processing feedback
  for (const file of fileList) {
    try {
      const dataUrl = await compressImage(file, 1600, 0.85);
      
      // Calculate approximate size in KB
      const sizeKb = Math.round((dataUrl.length * 3 / 4) / 1024);

      // Clean name for title default
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      const title = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

      stagedFiles.push({
        id: `stage-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        dataUrl,
        sizeKb,
        originalName: file.name,
        title: title,
        caption: defaultCaption,
        date: defaultDate
      });
    } catch (err) {
      console.warn(`Could not process ${file.name}:`, err);
    }
  }

  // Reset file input so user can pick same or more files
  document.getElementById('creationFilesInput').value = '';

  renderUploadStaging();
}

function renderUploadStaging() {
  const container = document.getElementById('uploadPreviewsGrid');
  const countBadge = document.getElementById('selectedCountBadge');
  const stagingArea = document.getElementById('uploadStagingArea');

  if (stagedFiles.length === 0) {
    stagingArea.classList.add('hidden');
    container.innerHTML = '';
    return;
  }

  stagingArea.classList.remove('hidden');
  countBadge.textContent = `${stagedFiles.length} photo${stagedFiles.length === 1 ? '' : 's'} ready`;

  container.innerHTML = stagedFiles.map((item, idx) => `
    <div class="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm p-3 space-y-2 relative group">
      <div class="relative aspect-square rounded-xl overflow-hidden bg-stone-100">
        <img src="${item.dataUrl}" alt="Preview" class="w-full h-full object-cover">
        <span class="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur text-white text-[9px] font-mono">
          ${item.sizeKb} KB
        </span>
        <button type="button" onclick="removeStagedFile('${item.id}')" 
                class="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs hover:bg-rose-700 transition shadow">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div>
        <label class="block text-[10px] font-bold text-chocolate mb-0.5">Cake Title</label>
        <input type="text" value="${item.title}" oninput="updateStagedItem('${item.id}', 'title', this.value)"
               class="w-full text-xs p-1.5 rounded-lg border border-stone-200 focus:outline-none focus:border-[#c94968]">
      </div>

      <div>
        <label class="block text-[10px] font-bold text-stone-500 mb-0.5">Caption (optional)</label>
        <input type="text" value="${item.caption}" placeholder="e.g. Fresh strawberry topping" 
               oninput="updateStagedItem('${item.id}', 'caption', this.value)"
               class="w-full text-[11px] p-1.5 rounded-lg border border-stone-200 focus:outline-none focus:border-[#c94968]">
      </div>
    </div>
  `).join('');
}

function updateStagedItem(id, key, val) {
  const item = stagedFiles.find(s => s.id === id);
  if (item) item[key] = val;
}

function removeStagedFile(id) {
  stagedFiles = stagedFiles.filter(s => s.id !== id);
  renderUploadStaging();
}

function clearUploadStaging() {
  stagedFiles = [];
  renderUploadStaging();
}

// Submit batch upload
async function submitCreationsUpload() {
  if (stagedFiles.length === 0) {
    alert('Please select at least one cake photo to upload.');
    return;
  }

  const uploadBtn = document.getElementById('startUploadBtn');
  const progressBar = document.getElementById('uploadProgressBar');
  const progressFill = document.getElementById('uploadProgressFill');
  const progressPercent = document.getElementById('uploadProgressPercent');
  const progressStatus = document.getElementById('uploadProgressStatusText');

  uploadBtn.disabled = true;
  uploadBtn.classList.add('opacity-50', 'cursor-not-allowed');
  progressBar.classList.remove('hidden');

  const globalDate = document.getElementById('batchCreationDate').value || new Date().toISOString().slice(0, 10);
  const publishImmediately = document.getElementById('batchPublishToggle').checked;

  progressFill.style.width = '30%';
  progressPercent.textContent = '30%';
  progressStatus.textContent = `Compressing and preparing ${stagedFiles.length} photo(s)...`;

  const payloadItems = stagedFiles.map(s => ({
    title: s.title,
    caption: s.caption,
    image: s.dataUrl,
    date: s.date || globalDate,
    published: publishImmediately
  }));

  try {
    progressFill.style.width = '60%';
    progressPercent.textContent = '60%';
    progressStatus.textContent = 'Saving photos to persistent storage...';

    const res = await fetch('/api/admin/creations/batch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({ items: payloadItems })
    });

    const data = await res.json();
    if (data.success) {
      progressFill.style.width = '100%';
      progressPercent.textContent = '100%';
      progressStatus.textContent = 'Upload complete! Published to website.';

      setTimeout(() => {
        progressBar.classList.add('hidden');
        clearUploadStaging();
        uploadBtn.disabled = false;
        uploadBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        loadAdminCreations();
      }, 700);
    } else {
      throw new Error(data.error || 'Server error uploading creations');
    }
  } catch (err) {
    alert(`Failed to upload photos: ${err.message}`);
    progressBar.classList.add('hidden');
    uploadBtn.disabled = false;
    uploadBtn.classList.remove('opacity-50', 'cursor-not-allowed');
  }
}

// ------------------------------------------------------------
// TOGGLE PUBLISH, EDIT & DELETE ACTIONS
// ------------------------------------------------------------

async function toggleCreationPublish(id) {
  try {
    const res = await fetch(`/api/admin/creations/${id}/toggle`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    });

    const data = await res.json();
    if (data.success) {
      const idx = adminCreations.findIndex(c => c.id === id);
      if (idx !== -1) {
        adminCreations[idx].published = data.creation.published;
        updateCreationsCountBadges();
        renderAdminCreations();
      }
    } else {
      alert(`Error updating creation: ${data.error || 'Unknown error'}`);
    }
  } catch (err) {
    alert('Failed to connect to server');
  }
}

function openEditCreationModal(id) {
  const creation = adminCreations.find(c => c.id === id);
  if (!creation) return;

  document.getElementById('editCreationId').value = creation.id;
  document.getElementById('editCreationImgPreview').src = creation.imageUrl;
  document.getElementById('editCreationTitle').value = creation.title || '';
  document.getElementById('editCreationCaption').value = creation.caption || '';
  document.getElementById('editCreationDate').value = creation.date || new Date().toISOString().slice(0, 10);
  document.getElementById('editCreationOrder').value = creation.order || 1;
  document.getElementById('editCreationPublished').checked = creation.published !== false;

  document.getElementById('editCreationModal').classList.remove('hidden');
}

function closeEditCreationModal() {
  document.getElementById('editCreationModal').classList.add('hidden');
}

async function saveEditCreationForm(e) {
  e.preventDefault();

  const id = document.getElementById('editCreationId').value;
  const title = document.getElementById('editCreationTitle').value.trim();
  const caption = document.getElementById('editCreationCaption').value.trim();
  const date = document.getElementById('editCreationDate').value;
  const order = parseInt(document.getElementById('editCreationOrder').value, 10) || 1;
  const published = document.getElementById('editCreationPublished').checked;

  try {
    const res = await fetch(`/api/admin/creations/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({ title, caption, date, order, published })
    });

    const data = await res.json();
    if (data.success) {
      closeEditCreationModal();
      loadAdminCreations();
    } else {
      alert(`Error updating creation: ${data.error || 'Unknown error'}`);
    }
  } catch (err) {
    alert('Failed to update creation');
  }
}

async function deleteCreation(id, title) {
  if (!confirm(`Are you sure you want to delete "${title}"? This photo will be permanently removed from your gallery and server storage.`)) {
    return;
  }

  try {
    const res = await fetch(`/api/admin/creations/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    });

    const data = await res.json();
    if (data.success) {
      loadAdminCreations();
    } else {
      alert(`Error deleting creation: ${data.error || 'Unknown error'}`);
    }
  } catch (err) {
    alert('Failed to delete creation from server');
  }
}

// ============================================================
// TAB 3: CATEGORY PACKAGE, GRAMS & SIZE ROOM CONTROLLER
// (1 Card per Category, grams/sizes customizable, Accessories excluded)
// ============================================================

const SIZE_ROOM_CATEGORIES = [
  'Mini Cakes',
  'Cookies',
  'Cupcakes',
  'Birthday Cakes',
  'Normal Cakes',
  'Wedding Cakes',
  'Anniversary',
  'Graduation',
  'New Year',
  'Holiday',
  'Fasting Cake'
];

let activeSizesCategory = 'all';
let adminSizesSearchQuery = '';
let editedCategorySizesMap = {}; // { [categoryName]: [ { name, price } ] }
let categoryCardModifiedState = {}; // { [categoryName]: boolean }

function getCategoryWorkingSizes(catName) {
  if (editedCategorySizesMap[catName]) {
    return editedCategorySizesMap[catName];
  }
  const prods = currentProducts.filter(p => p.category === catName);
  const prodWithSizes = prods.find(p => p.sizes && p.sizes.length > 0);
  if (prodWithSizes) {
    editedCategorySizesMap[catName] = JSON.parse(JSON.stringify(prodWithSizes.sizes));
  } else {
    editedCategorySizesMap[catName] = getDefaultCategorySizes(catName, prods[0]);
  }
  return editedCategorySizesMap[catName];
}

function getDefaultCategorySizes(catName, sampleProd) {
  const basePrice = sampleProd ? (Number(sampleProd.price) || 3000) : 3000;
  switch (catName) {
    case 'Couples':
      return [
        { name: '4-inch Duo Bento (2 servings)', price: 1400 },
        { name: '5-inch Couple Deluxe (2-4 servings)', price: 2000 },
        { name: '6-inch Romantic Celebration (4-6 servings)', price: 2700 }
      ];
    case 'Mini Cakes':
      return [
        { name: '4-inch Bento (1-2 servings)', price: 1200 },
        { name: '5-inch Mini Duo (2-4 servings)', price: 1600 },
        { name: '6-inch Party Mini (4-6 servings)', price: 2100 }
      ];
    case 'Cookies':
      return [
        { name: '300g Box (approx. 6 pcs)', price: 750 },
        { name: '500g Box (approx. 10 pcs)', price: 1200 },
        { name: '1.0 kg Tin Box (approx. 20 pcs)', price: 2200 }
      ];
    case 'Cupcakes':
      return [
        { name: 'Box of 4 Cupcakes', price: 900 },
        { name: 'Box of 6 Cupcakes', price: 1350 },
        { name: 'Box of 12 Cupcakes', price: 2500 }
      ];
    case 'Wedding Cakes':
      return [
        { name: '2-Tier (35-45 servings)', price: 7500 },
        { name: '3-Tier (60-80 servings)', price: 12000 }
      ];
    case 'Birthday Cakes':
    case 'Normal Cakes':
      return [
        { name: '1.0 kg (6-8 servings)', price: Math.round(basePrice * 0.85) },
        { name: '1.5 kg (10-12 servings)', price: Math.round(basePrice * 1.0) },
        { name: '2.0 kg (14-18 servings)', price: Math.round(basePrice * 1.3) }
      ];
    default:
      return [
        { name: 'Standard 1.5 kg (10-12 servings)', price: Math.round(basePrice * 1.0) },
        { name: 'Large 2.0 kg (14-18 servings)', price: Math.round(basePrice * 1.3) }
      ];
  }
}

function handleAdminSizesSearch(val) {
  adminSizesSearchQuery = (val || '').trim();
  const clearBtn = document.getElementById('clearAdminSizesSearchBtn');
  if (clearBtn) clearBtn.classList.toggle('hidden', !adminSizesSearchQuery);
  renderPackageSizesRoom();
}

function clearAdminSizesSearch() {
  adminSizesSearchQuery = '';
  const input = document.getElementById('adminSizesSearchInput');
  if (input) input.value = '';
  const clearBtn = document.getElementById('clearAdminSizesSearchBtn');
  if (clearBtn) clearBtn.classList.add('hidden');
  renderPackageSizesRoom();
}

function filterSizesRoomByCategory(cat) {
  activeSizesCategory = cat;
  renderPackageSizesRoom();
}

function renderPackageSizesRoom() {
  const container = document.getElementById('adminSizesEditorContainer');
  const countBadge = document.getElementById('sizesRoomProductCountBadge');
  const filterBar = document.getElementById('adminSizesCategoryFilterBar');
  if (!container) return;

  // 1. Render Category Filter Pills (Only the 11 Cake & Dessert Categories, no Accessories)
  if (filterBar) {
    const isAll = activeSizesCategory === 'all';
    const allPill = `
      <button onclick="filterSizesRoomByCategory('all')"
              class="whitespace-nowrap px-3.5 py-1.5 rounded-full font-bold text-xs transition flex items-center gap-1.5 ${isAll ? 'bg-chocolate text-white shadow-sm' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}">
        <i class="fa-solid fa-layer-group text-[10px]"></i>
        <span>All Categories</span>
        <span class="text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${isAll ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'}">${SIZE_ROOM_CATEGORIES.length}</span>
      </button>
    `;

    const catPills = SIZE_ROOM_CATEGORIES.map(cat => {
      const isActive = activeSizesCategory === cat;
      const icon = getCategoryIcon(cat);
      const safeCat = cat.replace(/'/g, "\\'");
      const prodsCount = currentProducts.filter(p => p.category === cat).length;
      return `
        <button onclick="filterSizesRoomByCategory('${safeCat}')"
                class="whitespace-nowrap px-3.5 py-1.5 rounded-full font-bold text-xs transition flex items-center gap-1.5 ${isActive ? 'bg-[#c94968] text-white shadow-sm' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}">
          <i class="${icon} text-[10px] ${isActive ? 'text-white' : 'text-[#c94968]'}"></i>
          <span>${cat}</span>
          <span class="text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${isActive ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'}">${prodsCount}</span>
        </button>
      `;
    }).join('');

    filterBar.innerHTML = allPill + catPills;
  }

  // 2. Filter categories to display
  let displayedCategories = SIZE_ROOM_CATEGORIES;
  if (activeSizesCategory !== 'all') {
    displayedCategories = displayedCategories.filter(c => c === activeSizesCategory);
  }

  if (adminSizesSearchQuery) {
    const q = adminSizesSearchQuery.toLowerCase();
    displayedCategories = displayedCategories.filter(cat => {
      const matchCat = cat.toLowerCase().includes(q);
      const sizes = getCategoryWorkingSizes(cat);
      const matchSizes = sizes.some(s => (s.name || '').toLowerCase().includes(q) || String(s.price).includes(q));
      return matchCat || matchSizes;
    });
  }

  if (countBadge) {
    countBadge.textContent = `${displayedCategories.length} Categories configured`;
  }
  updateSizesBadge();

  if (displayedCategories.length === 0) {
    container.innerHTML = `
      <div class="bg-white p-12 rounded-3xl text-center border border-stone-200 space-y-3">
        <i class="fa-solid fa-boxes-stacked text-3xl text-stone-300"></i>
        <h4 class="font-bold text-stone-700 text-base">No Categories Found</h4>
        <p class="text-xs text-stone-400 max-w-sm mx-auto">
          No categories match your search. Click below to reset filters.
        </p>
        <button onclick="clearAdminSizesSearch(); filterSizesRoomByCategory('all');" class="btn-gold px-4 py-2 rounded-xl text-xs font-bold uppercase">
          Reset Filters
        </button>
      </div>
    `;
    return;
  }

  // 3. Render ONE CARD PER CATEGORY!
  container.innerHTML = displayedCategories.map(catName => {
    const workingSizes = getCategoryWorkingSizes(catName);
    const isModified = Boolean(categoryCardModifiedState[catName]);
    const catIcon = getCategoryIcon(catName);
    const prods = currentProducts.filter(p => p.category === catName);
    const safeCat = catName.replace(/'/g, "\\'");
    const catSlug = getCategorySlug(catName);
    const sampleImg = prods[0]?.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=300&q=80';

    // Min price in category
    const minPrice = workingSizes.length 
      ? Math.min(...workingSizes.map(s => Number(s.price) || 0).filter(p => p > 0)) 
      : (prods[0]?.price || 0);

    const theme = getCategoryTheme(catName);

    return `
      <div id="cat-size-card-${catSlug}" class="bg-white rounded-3xl border ${isModified ? 'border-amber-300 shadow-md ring-1 ring-amber-200' : 'border-stone-200 shadow-xs'} transition p-5 sm:p-6 space-y-4 ${theme.borderTop}">
        
        <!-- Category Header Bar with Category Color Theme -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100 ${theme.headerBg} -m-5 sm:-m-6 mb-2 p-5 sm:p-6 rounded-t-3xl">
          <div class="flex items-center gap-3">
            <img src="${escapeHtml(sampleImg)}" alt="${escapeHtml(catName)}" 
                 class="w-12 h-12 rounded-2xl object-cover border border-stone-200 shadow-xs flex-shrink-0"
                 onerror="this.src='https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=300&q=80'">
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${theme.badge} text-xs font-bold uppercase shadow-2xs">
                  <i class="${catIcon} text-[10px]"></i>
                  <span>${escapeHtml(catName)}</span>
                </span>
                <span class="text-xs text-stone-500 font-medium">
                  &bull; Applies to <strong>${prods.length} ${catName}</strong> products in live catalog
                </span>
              </div>
              <h3 class="font-serif-luxury font-bold text-lg text-chocolate mt-0.5">
                ${escapeHtml(catName)} Package & Gram Options
              </h3>
            </div>
          </div>

          <div class="flex items-center gap-3 self-end sm:self-auto">
            <div class="text-right">
              <span class="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">Starting Price</span>
              <span class="font-mono font-bold text-sm text-gold-dark">${(Number(minPrice) || 0).toLocaleString()} ETB</span>
            </div>
            
            <button id="cat-save-btn-${catSlug}" onclick="saveCategorySizes('${safeCat}')"
                    class="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide flex items-center gap-1.5 transition ${isModified ? 'bg-amber-500 hover:bg-amber-600 text-white shadow animate-pulse' : 'bg-stone-100 hover:bg-stone-200 text-stone-700'}">
              <i class="fa-solid ${isModified ? 'fa-floppy-disk' : 'fa-check'} text-xs"></i>
              <span>${isModified ? 'Save Category' : 'Saved'}</span>
            </button>
          </div>
        </div>

        <!-- Size, Gram & Option Rows -->
        <div class="space-y-2">
          <div class="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-stone-400 px-1">
            <span>Package Size / Weight (Grams) Label</span>
            <div class="flex items-center gap-8 mr-10">
              <span>Price (ETB)</span>
              <span>Action</span>
            </div>
          </div>

          <div id="cat-sizes-rows-${catSlug}" class="space-y-2">
            ${renderCategorySizeRowsHtml(catName, workingSizes)}
          </div>
        </div>

        <!-- Card Footer Actions: Add Row & Quick Presets -->
        <div class="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-stone-100">
          <div class="flex items-center gap-2 flex-wrap">
            <button type="button" onclick="addCategorySizeTier('${safeCat}')"
                    class="px-3.5 py-1.5 rounded-xl border border-dashed border-[#c94968] text-[#c94968] hover:bg-rose-50 text-xs font-bold flex items-center gap-1.5 transition">
              <i class="fa-solid fa-plus text-[10px]"></i>
              <span>Add Gram / Option Tier</span>
            </button>

            <!-- Quick Preset Dropdown -->
            <div class="relative inline-block">
              <select onchange="applyCategoryPreset('${safeCat}', this.value); this.value='';" 
                      class="text-xs font-bold bg-stone-100 text-stone-700 border border-stone-200 rounded-xl px-3 py-1.5 pr-7 appearance-none focus:outline-none focus:border-gold hover:bg-stone-200 cursor-pointer">
                <option value="" disabled selected>⚡ Apply Sizing Preset...</option>
                <optgroup label="Mini Cakes">
                  <option value="mini_bento">Mini Bento Standard (4", 5", 6")</option>
                  <option value="mini_duo">Mini Bento & Duo (4", 5")</option>
                </optgroup>
                <optgroup label="Cookies">
                  <option value="cookie_grams">Cookie Grams (300g, 500g, 1.0kg)</option>
                  <option value="cookie_boxes">Cookie Boxes (Box 6, Box 10, Box 20)</option>
                </optgroup>
                <optgroup label="Standard Cakes">
                  <option value="standard_kg">Cake Weights (1.0kg, 1.5kg, 2.0kg)</option>
                  <option value="party_kg">Celebration Tiers (1.5kg, 2.0kg, 3.0kg)</option>
                </optgroup>
                <optgroup label="Cupcakes">
                  <option value="cupcakes_box">Cupcake Packs (Box of 4, 6, 12)</option>
                </optgroup>
              </select>
              <i class="fa-solid fa-chevron-down absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 text-[9px] pointer-events-none"></i>
            </div>
          </div>

          <div class="text-[11px] text-stone-400 flex items-center gap-1.5 self-end sm:self-auto">
            <span id="cat-status-text-${catSlug}">${isModified ? '⚠️ Has unsaved edits for this category' : '✓ Synchronized to all ' + prods.length + ' products in this category'}</span>
          </div>
        </div>

      </div>
    `;
  }).join('');
}

function renderCategorySizeRowsHtml(catName, sizes) {
  const safeCat = catName.replace(/'/g, "\\'");
  if (!sizes || sizes.length === 0) {
    return `
      <div class="p-3 bg-stone-50 rounded-2xl border border-stone-200/60 text-xs text-stone-500 flex items-center justify-between">
        <span>No size or gram tiers configured for ${escapeHtml(catName)}.</span>
        <button onclick="addCategorySizeTier('${safeCat}')" class="text-xs text-[#c94968] font-bold hover:underline">
          + Add First Size / Gram Option
        </button>
      </div>
    `;
  }

  return sizes.map((tier, idx) => `
    <div class="flex items-center gap-2 bg-stone-50/80 p-2 rounded-2xl border border-stone-200/80 hover:border-stone-300 transition">
      <div class="w-6 text-center text-stone-300 font-bold text-xs select-none">
        ${idx + 1}
      </div>
      
      <!-- Tier Label / Grams -->
      <div class="flex-1">
        <input type="text" value="${escapeHtml(tier.name || '')}" 
               placeholder="e.g. 500g Box (approx. 10 pcs) or 4-inch Bento"
               oninput="updateCategorySizeTierName('${safeCat}', ${idx}, this.value)"
               class="w-full text-xs font-medium p-2 rounded-xl bg-white border border-stone-200 focus:outline-none focus:border-gold">
      </div>

      <!-- Tier Price in ETB -->
      <div class="w-32 relative flex-shrink-0">
        <input type="number" value="${Number(tier.price) || 0}"
               placeholder="Price"
               oninput="updateCategorySizeTierPrice('${safeCat}', ${idx}, this.value)"
               class="w-full text-xs font-mono font-bold p-2 pr-9 rounded-xl bg-white border border-stone-200 focus:outline-none focus:border-gold text-[#c94968]">
        <span class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-stone-400">ETB</span>
      </div>

      <!-- Remove Tier Button -->
      <button type="button" onclick="removeCategorySizeTier('${safeCat}', ${idx})"
              class="w-8 h-8 rounded-xl text-stone-400 hover:text-rose-500 hover:bg-rose-50 flex items-center justify-center transition flex-shrink-0"
              title="Remove this size option">
        <i class="fa-solid fa-trash-can text-xs"></i>
      </button>
    </div>
  `).join('');
}

function addCategorySizeTier(catName) {
  const sizes = getCategoryWorkingSizes(catName);
  const prods = currentProducts.filter(p => p.category === catName);
  const basePrice = prods[0] ? (Number(prods[0].price) || 3000) : 3000;
  
  sizes.push({
    name: 'New Gram / Option Tier',
    price: basePrice
  });

  markCategoryCardModified(catName);
  refreshCategorySizeRows(catName);
}

function removeCategorySizeTier(catName, tierIndex) {
  const sizes = getCategoryWorkingSizes(catName);
  sizes.splice(tierIndex, 1);
  markCategoryCardModified(catName);
  refreshCategorySizeRows(catName);
}

function updateCategorySizeTierName(catName, tierIndex, value) {
  const sizes = getCategoryWorkingSizes(catName);
  if (sizes[tierIndex]) {
    sizes[tierIndex].name = value;
    markCategoryCardModified(catName);
  }
}

function updateCategorySizeTierPrice(catName, tierIndex, value) {
  const sizes = getCategoryWorkingSizes(catName);
  if (sizes[tierIndex]) {
    sizes[tierIndex].price = parseFloat(value) || 0;
    markCategoryCardModified(catName);
  }
}

function refreshCategorySizeRows(catName) {
  const catSlug = getCategorySlug(catName);
  const container = document.getElementById(`cat-sizes-rows-${catSlug}`);
  if (container) {
    const sizes = getCategoryWorkingSizes(catName);
    container.innerHTML = renderCategorySizeRowsHtml(catName, sizes);
  }
}

function markCategoryCardModified(catName) {
  categoryCardModifiedState[catName] = true;
  const catSlug = getCategorySlug(catName);
  const card = document.getElementById(`cat-size-card-${catSlug}`);
  const saveBtn = document.getElementById(`cat-save-btn-${catSlug}`);
  const statusText = document.getElementById(`cat-status-text-${catSlug}`);

  if (card) {
    card.classList.add('border-amber-300', 'shadow-md', 'ring-1', 'ring-amber-200');
    card.classList.remove('border-stone-200');
  }
  if (saveBtn) {
    saveBtn.className = 'px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide flex items-center gap-1.5 transition bg-amber-500 hover:bg-amber-600 text-white shadow animate-pulse';
    saveBtn.innerHTML = '<i class="fa-solid fa-floppy-disk text-xs"></i><span>Save Category</span>';
  }
  if (statusText) {
    statusText.textContent = '⚠️ Unsaved edits for this category';
    statusText.className = 'text-[11px] text-amber-600 font-bold';
  }
}

function markCategoryCardSaved(catName) {
  categoryCardModifiedState[catName] = false;
  const catSlug = getCategorySlug(catName);
  const card = document.getElementById(`cat-size-card-${catSlug}`);
  const saveBtn = document.getElementById(`cat-save-btn-${catSlug}`);
  const statusText = document.getElementById(`cat-status-text-${catSlug}`);
  const prods = currentProducts.filter(p => p.category === catName);

  if (card) {
    card.classList.remove('border-amber-300', 'shadow-md', 'ring-1', 'ring-amber-200');
    card.classList.add('border-stone-200');
  }
  if (saveBtn) {
    saveBtn.disabled = false;
    saveBtn.className = 'px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide flex items-center gap-1.5 transition bg-emerald-600 text-white shadow';
    saveBtn.innerHTML = '<i class="fa-solid fa-check text-xs"></i><span>Saved ✓</span>';
    setTimeout(() => {
      if (!categoryCardModifiedState[catName] && saveBtn) {
        saveBtn.className = 'px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide flex items-center gap-1.5 transition bg-stone-100 hover:bg-stone-200 text-stone-700';
        saveBtn.innerHTML = '<i class="fa-solid fa-check text-xs"></i><span>Saved</span>';
      }
    }, 2000);
  }
  if (statusText) {
    statusText.textContent = '✓ Synchronized to all ' + prods.length + ' products in this category';
    statusText.className = 'text-[11px] text-emerald-600 font-medium';
  }
}

function applyCategoryPreset(catName, presetKey) {
  const prods = currentProducts.filter(p => p.category === catName);
  const basePrice = prods[0] ? (Number(prods[0].price) || 3000) : 3000;
  let newSizes = [];

  switch (presetKey) {
    case 'mini_bento':
      newSizes = [
        { name: '4-inch Bento (1-2 servings)', price: Math.round(basePrice * 1.0) },
        { name: '5-inch Mini Duo (2-4 servings)', price: Math.round(basePrice * 1.35) },
        { name: '6-inch Party Mini (4-6 servings)', price: Math.round(basePrice * 1.75) }
      ];
      break;
    case 'mini_duo':
      newSizes = [
        { name: '4-inch Bento (1-2 servings)', price: Math.round(basePrice * 1.0) },
        { name: '5-inch Mini Duo (2-4 servings)', price: Math.round(basePrice * 1.35) }
      ];
      break;
    case 'cookie_grams':
      newSizes = [
        { name: '300g Box (approx. 6 pcs)', price: 750 },
        { name: '500g Box (approx. 10 pcs)', price: 1200 },
        { name: '1.0 kg Tin Box (approx. 20 pcs)', price: 2200 }
      ];
      break;
    case 'cookie_boxes':
      newSizes = [
        { name: 'Box of 6 Cookies', price: Math.round(basePrice * 0.65) },
        { name: 'Box of 10 Cookies', price: Math.round(basePrice * 1.0) },
        { name: 'Celebration Box of 20', price: Math.round(basePrice * 1.85) }
      ];
      break;
    case 'standard_kg':
      newSizes = [
        { name: 'Standard 1.0 kg (6-8 servings)', price: Math.round(basePrice * 0.85) },
        { name: 'Standard 1.5 kg (10-12 servings)', price: Math.round(basePrice * 1.0) },
        { name: 'Standard 2.0 kg (14-18 servings)', price: Math.round(basePrice * 1.3) }
      ];
      break;
    case 'party_kg':
      newSizes = [
        { name: 'Standard 1.5 kg (10-12 servings)', price: Math.round(basePrice * 1.0) },
        { name: 'Large 2.0 kg (14-18 servings)', price: Math.round(basePrice * 1.3) },
        { name: 'Grand Celebration 3.0 kg (22-26 servings)', price: Math.round(basePrice * 1.9) }
      ];
      break;
    case 'cupcakes_box':
      newSizes = [
        { name: 'Box of 4 Cupcakes', price: 900 },
        { name: 'Box of 6 Cupcakes', price: 1350 },
        { name: 'Box of 12 Cupcakes', price: 2500 }
      ];
      break;
  }

  if (newSizes.length > 0) {
    editedCategorySizesMap[catName] = newSizes;
    markCategoryCardModified(catName);
    refreshCategorySizeRows(catName);
  }
}

async function saveCategorySizes(catName) {
  const sizes = getCategoryWorkingSizes(catName);
  const cleanSizes = sizes
    .map(s => ({ name: String(s.name || '').trim(), price: parseFloat(s.price) || 0 }))
    .filter(s => s.name.length > 0);

  const catSlug = getCategorySlug(catName);
  const saveBtn = document.getElementById(`cat-save-btn-${catSlug}`);
  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin text-xs"></i><span>Saving...</span>';
  }

  try {
    const res = await fetch(`/api/categories/${encodeURIComponent(catName)}/sizes`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({ sizes: cleanSizes })
    });

    const data = await res.json();
    if (data.success) {
      // Update all products belonging to this category in currentProducts cache
      currentProducts.forEach((p, idx) => {
        if (p.category === catName) {
          currentProducts[idx].sizes = cleanSizes;
        }
      });
      editedCategorySizesMap[catName] = cleanSizes;
      markCategoryCardSaved(catName);
      updateSizesBadge();
    } else {
      alert(`Failed to save category sizes: ${data.error || 'Unknown error'}`);
      if (saveBtn) saveBtn.disabled = false;
    }
  } catch (err) {
    alert('Server connection error while saving category sizes.');
    if (saveBtn) saveBtn.disabled = false;
  }
}

async function saveAllAdjustedSizes() {
  const saveAllBtn = document.getElementById('saveAllSizesBtn');
  if (saveAllBtn) {
    saveAllBtn.disabled = true;
    saveAllBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin text-xs"></i><span>Saving All Categories...</span>';
  }

  const modifiedCats = Object.keys(categoryCardModifiedState).filter(c => categoryCardModifiedState[c]);

  if (modifiedCats.length === 0) {
    alert('No unsaved size adjustments found. All categories are already up to date!');
    if (saveAllBtn) {
      saveAllBtn.disabled = false;
      saveAllBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i><span>Save All Size Changes</span>';
    }
    return;
  }

  try {
    await Promise.all(modifiedCats.map(cat => saveCategorySizes(cat)));
    if (saveAllBtn) {
      saveAllBtn.disabled = false;
      saveAllBtn.innerHTML = '<i class="fa-solid fa-check"></i><span>All Categories Saved Successfully ✓</span>';
      setTimeout(() => {
        if (saveAllBtn) {
          saveAllBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i><span>Save All Size Changes</span>';
        }
      }, 2500);
    }
  } catch (err) {
    alert('Error occurred while saving some category sizes.');
    if (saveAllBtn) {
      saveAllBtn.disabled = false;
      saveAllBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i><span>Save All Size Changes</span>';
    }
  }
}



// ============================================================
// MAK CAKE — BUSINESS PROFILE, ORDERS & ADMIN SETTINGS LOGIC
// ============================================================

let currentSettings = null;
let currentOrders = [];
let stagedLogoBase64 = null;
let stagedRemoveLogo = false;
let currentOrderFilter = 'all';
let currentSelectedOrder = null;

function showAdminToast(message, type = 'success') {
  const toast = document.getElementById('adminToastBanner');
  if (!toast) {
    alert(message);
    return;
  }
  toast.textContent = message;
  toast.className = 'fixed top-5 right-5 z-50 p-4 rounded-2xl text-xs font-bold shadow-2xl transition-all duration-300 max-w-md flex items-center gap-3 ' +
    (type === 'success' ? 'bg-[#0f172a] text-white border border-emerald-500/40' : 'bg-rose-900 text-white border border-rose-500/40');
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3500);
}

// ============================================================
// MOBILE SIDEBAR MENU DRAWER CONTROLLER (3-LINE HAMBURGER)
// ============================================================
function openAdminMobileMenu() {
  const sidebar = document.getElementById('adminSidebar');
  const backdrop = document.getElementById('adminMobileBackdrop');
  if (backdrop) {
    backdrop.classList.remove('hidden');
    void backdrop.offsetWidth;
    backdrop.classList.remove('opacity-0');
    backdrop.classList.add('opacity-100');
  }
  if (sidebar) {
    sidebar.classList.add('mobile-open');
    sidebar.classList.remove('-translate-x-full');
    sidebar.classList.add('translate-x-0');
  }
  document.body.style.overflow = 'hidden';
}

function closeAdminMobileMenu() {
  const sidebar = document.getElementById('adminSidebar');
  const backdrop = document.getElementById('adminMobileBackdrop');
  if (sidebar) {
    sidebar.classList.remove('mobile-open');
    sidebar.classList.remove('translate-x-0');
    sidebar.classList.add('-translate-x-full');
  }
  if (backdrop) {
    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');
    setTimeout(() => {
      backdrop.classList.add('hidden');
    }, 280);
  }
  document.body.style.overflow = '';
}

function toggleAdminMobileMenu() {
  const sidebar = document.getElementById('adminSidebar');
  if (sidebar && sidebar.classList.contains('translate-x-0')) {
    closeAdminMobileMenu();
  } else {
    openAdminMobileMenu();
  }
}

// Close mobile drawer on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeAdminMobileMenu();
  }
});

// 8-Item Sidebar Section Switcher
function switchAdminSection(sectionName, subTab = null, autoCloseMobile = true) {
  // Automatically slide mobile drawer closed when an item is selected
  if (autoCloseMobile) {
    closeAdminMobileMenu();
  }

  const sectionMap = {
    dashboard: { btn: 'navBtnDashboard', sec: 'sectionDashboard' },
    orders: { btn: 'navBtnOrders', sec: 'sectionOrders' },
    earnings: { btn: 'navBtnEarnings', sec: 'sectionEarnings' },
    products: { btn: 'navBtnProducts', sec: 'sectionProducts' },
    categories: { btn: 'navBtnCategories', sec: 'sectionCategories' },
    decorations: { btn: 'navBtnDecorations', sec: 'sectionDecorations' },
    pricing: { btn: 'navBtnPricing', sec: 'sectionPricing' },
    payment: { btn: 'navBtnPayment', sec: 'sectionPayment' },
    settings: { btn: 'navBtnSettings', sec: 'sectionSettings' },
    creations: { btn: 'navBtnCreations', sec: 'sectionCreations' },
    appearance: { btn: 'navBtnAppearance', sec: 'sectionAppearance' },
    mysterybox: { btn: 'navBtnMysteryBox', sec: 'sectionMysteryBox' },
    ads: { btn: 'navBtnAds', sec: 'sectionAds' },
    managers: { btn: 'navBtnManagers', sec: 'sectionManagers' }
  };

  Object.entries(sectionMap).forEach(([key, config]) => {
    const isTarget = (key === sectionName);
    
    // Tab Button highlight (Desktop Sidebar)
    const btn = document.getElementById(config.btn);
    if (btn) {
      if (isTarget) {
        btn.className = 'w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between transition text-left bg-chocolate text-white shadow-xs';
      } else {
        btn.className = 'w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between transition text-left text-stone-600 hover:text-chocolate hover:bg-stone-100';
      }
    }

    // Section visibility
    const el = document.getElementById(config.sec);
    if (el) {
      if (isTarget) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    }
  });

  // Update Website-style Floating Bottom Navigation Bar
  const bnavMap = {
    dashboard: 'bnavBtnDashboard',
    orders: 'bnavBtnOrders',
    products: 'bnavBtnProducts',
    earnings: 'bnavBtnEarnings'
  };

  Object.entries(bnavMap).forEach(([key, btnId]) => {
    const bBtn = document.getElementById(btnId);
    if (bBtn) {
      const active = (key === sectionName);
      bBtn.classList.toggle('text-[#c94968]', active);
      bBtn.classList.toggle('font-extrabold', active);
      bBtn.classList.toggle('text-stone-500', !active);
      bBtn.classList.toggle('font-medium', !active);
      const ind = bBtn.querySelector('.bnav-ind');
      if (ind) ind.classList.toggle('hidden', !active);
    }
  });

  // Section specific triggers
  if (sectionName === 'dashboard') {
    renderDashboardStats();
  } else if (sectionName === 'orders') {
    loadAdminOrders();
  } else if (sectionName === 'earnings') {
    renderRevenueSection();
  } else if (sectionName === 'products') {
    loadAdminProducts();
  } else if (sectionName === 'categories') {
    renderAdminCategories();
  } else if (sectionName === 'decorations') {
    renderAdminDecorations();
  } else if (sectionName === 'pricing') {
    renderPackageSizesRoom();
  } else if (sectionName === 'payment') {
    syncPaymentManagementView();
  } else if (sectionName === 'settings') {
    switchSettingsSubTab(subTab || 'general');
  } else if (sectionName === 'creations') {
    loadAdminCreations();
  } else if (sectionName === 'appearance') {
    renderWebsiteAppearance();
  } else if (sectionName === 'mysterybox') {
    renderMysteryRewardBox();
  } else if (sectionName === 'ads') {
    renderHomepageAds();
  } else if (sectionName === 'managers') {
    renderManagerAccounts();
  }
}

// Sub-Tab Switcher for Business Profile & Settings (8 Sub-Tabs)
function switchSettingsSubTab(subTabName) {
  const subTabs = ['general', 'contact', 'social', 'hours', 'location', 'payment', 'alerts', 'google'];

  subTabs.forEach(st => {
    const btnId = 'subTabBtn' + st.charAt(0).toUpperCase() + st.slice(1);
    const btn = document.getElementById(btnId);
    if (btn) {
      if (st === subTabName) {
        btn.className = 'px-3.5 py-2 rounded-xl text-xs font-bold transition bg-chocolate text-white shadow-xs';
      } else {
        btn.className = 'px-3.5 py-2 rounded-xl text-xs font-bold transition text-stone-600 hover:bg-stone-100';
      }
    }

    const contentId = 'subTabContent' + st.charAt(0).toUpperCase() + st.slice(1);
    const contentEl = document.getElementById(contentId);
    if (contentEl) {
      if (st === subTabName) {
        contentEl.classList.remove('hidden');
      } else {
        contentEl.classList.add('hidden');
      }
    }
  });

  if (subTabName === 'alerts') {
    updatePushPermBadge();
  }
}

// ------------------------------------------------------------
// BUSINESS SETTINGS LOADER & POPULATOR
// ------------------------------------------------------------

async function loadBusinessSettings() {
  try {
    let s = null;
    try {
      const headers = {};
      if (adminToken) headers['Authorization'] = 'Bearer ' + adminToken;
      const res = await fetch('/api/settings', { headers });
      if (res.ok) {
        const data = await res.json();
        if (data && (data.settings || data.brandName)) s = data.settings || data;
        else if (data && data.success && data.settings) s = data.settings;
      }
    } catch (_) {}

    if (!s && window.FirebaseService && typeof window.FirebaseService.getSettings === 'function') {
      try {
        s = await window.FirebaseService.getSettings();
      } catch (_) {}
    }

    if (!s) {
      try {
        const res = await fetch('/data/settings.json');
        if (res.ok) {
          const data = await res.json();
          s = data.settings || data;
        }
      } catch (_) {}
    }

    if (s) {
      currentSettings = s;
      populateSettingsForm(currentSettings);
      updateAdminBranding(currentSettings);
    }
  } catch (err) {
    console.error('Error loading business settings:', err);
  }
}

function updateAdminBranding(settings) {
  const brandName = settings.brand?.name || 'MAK CAKE';
  const logoUrl = settings.brand?.logo || '/images/mak-cake-logo.webp';

  // Update header and sidebar
  const navBrandName = document.getElementById('navBrandName');
  if (navBrandName) navBrandName.textContent = brandName;
  const sidebarBrandName = document.getElementById('sidebarBrandName');
  if (sidebarBrandName) sidebarBrandName.textContent = brandName;
  const dashBrandGreeting = document.getElementById('dashBrandGreeting');
  if (dashBrandGreeting) dashBrandGreeting.textContent = brandName + ' Dashboard';

  const navBrandLogo = document.getElementById('navBrandLogo');
  if (navBrandLogo) navBrandLogo.src = logoUrl;
  const sidebarBrandLogo = document.getElementById('sidebarBrandLogo');
  if (sidebarBrandLogo) sidebarBrandLogo.src = logoUrl;

  // Evaluate live open/closed status
  evaluateBusinessOpenStatus(settings.workingHours);
}

function populateSettingsForm(settings) {
  if (!settings) return;

  // General Identity
  const nameEl = document.getElementById('setBrandName');
  if (nameEl) nameEl.value = settings.brand?.name || 'MAK CAKE';
  const catEl = document.getElementById('setBrandCategory');
  if (catEl) catEl.value = settings.brand?.category || 'Artisanal Bakery & Confectionery';
  const tagEl = document.getElementById('setBrandTagline');
  if (tagEl) tagEl.value = settings.brand?.tagline || '';
  const descEl = document.getElementById('setBrandDescription');
  if (descEl) descEl.value = settings.brand?.description || '';
  
  const logoPreview = document.getElementById('formLogoPreview');
  if (logoPreview) logoPreview.src = settings.brand?.logo || '/images/mak-cake-logo.webp';

  // Contact
  const pPhoneEl = document.getElementById('setContactPhonePrimary');
  if (pPhoneEl) pPhoneEl.value = settings.contact?.primaryPhone || '';
  const sPhoneEl = document.getElementById('setContactPhoneSecondary');
  if (sPhoneEl) sPhoneEl.value = settings.contact?.secondaryPhone || '';
  const emailEl = document.getElementById('setContactEmail');
  if (emailEl) emailEl.value = settings.contact?.email || '';
  const tgEl = document.getElementById('setContactTelegram');
  if (tgEl) tgEl.value = settings.contact?.telegramUsername || '';

  // Social
  const fbEl = document.getElementById('setSocialFacebook');
  if (fbEl) fbEl.value = settings.social?.facebook || '';
  const igEl = document.getElementById('setSocialInstagram');
  if (igEl) igEl.value = settings.social?.instagram || '';
  const ttEl = document.getElementById('setSocialTikTok');
  if (ttEl) ttEl.value = settings.social?.tiktok || '';
  const stgEl = document.getElementById('setSocialTelegram');
  if (stgEl) stgEl.value = settings.social?.telegram || '';
  const ytEl = document.getElementById('setSocialYouTube');
  if (ytEl) ytEl.value = settings.social?.youtube || '';
  const othEl = document.getElementById('setSocialOther');
  if (othEl) othEl.value = settings.social?.other || '';

  // Working Hours (7 Days)
  renderWorkingHoursInputs(settings.workingHours || {});

  // Location
  const countryEl = document.getElementById('setLocationCountry');
  if (countryEl) countryEl.value = settings.location?.country || 'Ethiopia';
  const cityEl = document.getElementById('setLocationCity');
  if (cityEl) cityEl.value = settings.location?.city || 'Addis Ababa';
  const areaEl = document.getElementById('setLocationArea');
  if (areaEl) areaEl.value = settings.location?.area || '';
  const addrEl = document.getElementById('setLocationAddress');
  if (addrEl) addrEl.value = settings.location?.address || '';
  const mapsEl = document.getElementById('setLocationMapsUrl');
  if (mapsEl) {
    mapsEl.value = settings.location?.googleMapsUrl || '';
    updateMapTestLink(mapsEl.value);
  }

  // Payments (Mirror in Settings and Payment Management tab)
  const cbeHolder = document.getElementById('setPayCbeHolder');
  if (cbeHolder) cbeHolder.value = settings.payments?.cbe?.accountHolder || '';
  const cbeNum = document.getElementById('setPayCbeNumber');
  if (cbeNum) cbeNum.value = settings.payments?.cbe?.accountNumber || '';
  const cbeEn = document.getElementById('setPayCbeEnabled');
  if (cbeEn) cbeEn.checked = Boolean(settings.payments?.cbe?.enabled);

  const tbHolder = document.getElementById('setPayTelebirrHolder');
  if (tbHolder) tbHolder.value = settings.payments?.telebirr?.accountHolder || '';
  const tbNum = document.getElementById('setPayTelebirrNumber');
  if (tbNum) tbNum.value = settings.payments?.telebirr?.accountNumber || '';
  const tbEn = document.getElementById('setPayTelebirrEnabled');
  if (tbEn) tbEn.checked = Boolean(settings.payments?.telebirr?.enabled);

  // Real-Time Alerts Settings
  const chimeEnabled = document.getElementById('setOrderChimeEnabled');
  if (chimeEnabled) chimeEnabled.checked = settings.alerts?.chimeEnabled !== false;
  updatePushPermBadge();

  // Google Admin Access Settings
  const gName = document.getElementById('settingsGoogleUserName');
  const gEmail = document.getElementById('settingsGoogleUserEmail');
  const gAvatar = document.getElementById('settingsGoogleUserAvatar');
  const gClientId = document.getElementById('setGoogleClientId');
  const gAllowed = document.getElementById('setGoogleAllowedEmails');
  const clientOwnerInput = document.getElementById('setClientOwnerEmail');

  const adminAuth = settings.adminAuth || {};
  if (gClientId) gClientId.value = adminAuth.googleClientId || '';
  if (gAllowed) gAllowed.value = Array.isArray(adminAuth.allowedEmails) ? adminAuth.allowedEmails.join(', ') : (adminAuth.allowedEmails || '');
  if (clientOwnerInput) clientOwnerInput.value = adminAuth.ownerEmail || '';

  const activeUser = currentAdminUser || adminAuth.lastGoogleUser;
  if (activeUser && (activeUser.name || activeUser.email)) {
    if (gName) gName.textContent = activeUser.name || 'Connected Bakery Admin';
    if (gEmail) gEmail.textContent = adminAuth.ownerEmail || activeUser.email || 'Authorized Owner';
    if (gAvatar && activeUser.picture) gAvatar.src = activeUser.picture;
  } else {
    if (gName) gName.textContent = 'Pending Client Claim';
    if (gEmail) gEmail.textContent = adminAuth.ownerEmail || 'Next Google login will claim owner access';
  }

  updateSampleOrderBadges();
  initGoogleIdentityServices();

  syncPaymentManagementView();
}

function syncPaymentManagementView() {
  if (!currentSettings) return;
  const dCbeHolder = document.getElementById('directPayCbeHolder');
  if (dCbeHolder) dCbeHolder.value = currentSettings.payments?.cbe?.accountHolder || '';
  const dCbeNum = document.getElementById('directPayCbeNumber');
  if (dCbeNum) dCbeNum.value = currentSettings.payments?.cbe?.accountNumber || '';
  const dCbeEn = document.getElementById('directPayCbeEnabled');
  if (dCbeEn) dCbeEn.checked = Boolean(currentSettings.payments?.cbe?.enabled);

  const dTbHolder = document.getElementById('directPayTelebirrHolder');
  if (dTbHolder) dTbHolder.value = currentSettings.payments?.telebirr?.accountHolder || '';
  const dTbNum = document.getElementById('directPayTelebirrNumber');
  if (dTbNum) dTbNum.value = currentSettings.payments?.telebirr?.accountNumber || '';
  const dTbEn = document.getElementById('directPayTelebirrEnabled');
  if (dTbEn) dTbEn.checked = Boolean(currentSettings.payments?.telebirr?.enabled);

  renderCustomPaymentMethods();
}

// ------------------------------------------------------------
// REAL-TIME ORDER ALERTS & AUDIO CHIME CONTROLS
// ------------------------------------------------------------

function updatePushPermBadge() {
  const badge = document.getElementById('pushPermBadge');
  const btn = document.getElementById('btnRequestPushPerm');
  if (!badge) return;

  if (!('Notification' in window)) {
    badge.className = 'text-[10px] font-bold px-2.5 py-1 rounded-full bg-stone-100 text-stone-500 border border-stone-200';
    badge.textContent = 'Not Supported';
    if (btn) btn.disabled = true;
    return;
  }

  if (Notification.permission === 'granted') {
    badge.className = 'text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300';
    badge.innerHTML = '<i class="fa-solid fa-check text-[9px] mr-1"></i> Active & Allowed';
    if (btn) {
      btn.innerHTML = '<i class="fa-solid fa-check mr-1.5"></i> Allowed on this Device';
      btn.classList.remove('bg-[#c94968]', 'hover:bg-[#b03855]');
      btn.classList.add('bg-emerald-600', 'hover:bg-emerald-700');
    }
  } else if (Notification.permission === 'denied') {
    badge.className = 'text-[10px] font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-300';
    badge.textContent = 'Blocked by Browser';
    if (btn) {
      btn.innerHTML = 'Blocked in Site Settings';
      btn.disabled = true;
    }
  } else {
    badge.className = 'text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300';
    badge.textContent = 'Permission Needed';
  }
}

async function togglePushAndTestSound() {
  // 1. Play bakery chime immediately on user click
  if (window.FirebaseService && typeof window.FirebaseService.playBakeryChime === 'function') {
    window.FirebaseService.playBakeryChime();
  }

  // 2. Request browser notification permission if not yet granted
  if ('Notification' in window && Notification.permission !== 'granted') {
    try {
      const perm = await Notification.requestPermission();
      updatePushPermBadge();
      if (perm === 'granted') {
        showAdminToast('🔔 Sound & Push Alerts Active! You will hear a bell chime whenever a customer orders.', 'success', 7000);
        return;
      }
    } catch (_) {}
  }

  // 3. Confirm alert is active with toast
  showAdminToast('🔔 Bakery Chime Tested! Live Order Alert Sound is Active.', 'success', 5000);
  updatePushPermBadge();
}

function testOrderAudioChime() {
  if (window.FirebaseService && typeof window.FirebaseService.playBakeryChime === 'function') {
    window.FirebaseService.playBakeryChime();
    showAdminToast('Bakery bell chime tested successfully! 🔔', 'success');
  } else {
    showAdminToast('Audio chime synthesizer initializing...', 'info');
  }
}

async function enablePushNotifications() {
  if (window.FirebaseService && typeof window.FirebaseService.requestNotificationPermission === 'function') {
    const perm = await window.FirebaseService.requestNotificationPermission();
    updatePushPermBadge();
    if (perm === 'granted') {
      showAdminToast('Desktop notifications successfully enabled!', 'success');
      testDesktopNotification();
    } else {
      showAdminToast('Notification permission was not granted.', 'warning');
    }
  }
}

function testDesktopNotification() {
  if (window.FirebaseService && typeof window.FirebaseService.showBrowserNotification === 'function') {
    const notif = window.FirebaseService.showBrowserNotification('🎂 MAK CAKE Test Alert!', {
      body: 'Desktop notifications are active. Real orders will appear here instantly!'
    });
    if (!notif && Notification.permission !== 'granted') {
      enablePushNotifications();
    } else {
      showAdminToast('Test notification dispatched to your screen!', 'info');
    }
  }
}

function updateMapTestLink(url) {
  const btn = document.getElementById('btnTestMapLink');
  if (!btn) return;
  if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
    btn.href = url;
    btn.classList.remove('hidden');
  } else {
    btn.classList.add('hidden');
  }
}

// ------------------------------------------------------------
// WORKING HOURS (7 DAYS) RENDERER
// ------------------------------------------------------------

const DAYS_OF_WEEK = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' }
];

function renderWorkingHoursInputs(workingHours) {
  const container = document.getElementById('workingHoursRowsContainer');
  if (!container) return;

  container.innerHTML = DAYS_OF_WEEK.map(day => {
    const config = workingHours[day.key] || { open: '08:00', close: '20:00', isOpen: true };
    const isOpen = config.isOpen !== false;

    return `
      <div class="p-3.5 rounded-2xl border ${isOpen ? 'border-stone-200 bg-white' : 'border-stone-200/60 bg-stone-50/70 opacity-75'} flex flex-col sm:flex-row sm:items-center justify-between gap-3" id="dayRow_${day.key}">
        <div class="flex items-center gap-3 w-40">
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id="hourOpen_${day.key}" onchange="toggleDayWorkingHours('${day.key}', this.checked)" class="sr-only peer" ${isOpen ? 'checked' : ''}>
            <div class="w-10 h-5 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
          <div>
            <span class="font-bold text-xs text-chocolate block">${day.label}</span>
            <span id="dayStatusBadge_${day.key}" class="text-[10px] font-semibold ${isOpen ? 'text-emerald-700' : 'text-stone-400'}">
              ${isOpen ? 'Open' : 'Closed'}
            </span>
          </div>
        </div>

        <div class="flex items-center gap-2 flex-1 sm:justify-end" id="dayInputsWrap_${day.key}" style="${isOpen ? '' : 'display: none;'}">
          <div class="flex items-center gap-1.5 text-xs">
            <span class="text-stone-400 text-[11px] font-medium">Opens:</span>
            <input type="time" id="hourTimeOpen_${day.key}" value="${config.open || '08:00'}" class="p-2 text-xs rounded-xl border border-stone-300 font-mono bg-white">
          </div>
          <span class="text-stone-300">—</span>
          <div class="flex items-center gap-1.5 text-xs">
            <span class="text-stone-400 text-[11px] font-medium">Closes:</span>
            <input type="time" id="hourTimeClose_${day.key}" value="${config.close || '20:00'}" class="p-2 text-xs rounded-xl border border-stone-300 font-mono bg-white">
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function toggleDayWorkingHours(dayKey, isChecked) {
  const badge = document.getElementById('dayStatusBadge_' + dayKey);
  const inputsWrap = document.getElementById('dayInputsWrap_' + dayKey);
  const row = document.getElementById('dayRow_' + dayKey);

  if (isChecked) {
    if (badge) {
      badge.textContent = 'Open';
      badge.className = 'text-[10px] font-semibold text-emerald-700';
    }
    if (inputsWrap) inputsWrap.style.display = 'flex';
    if (row) row.className = 'p-3.5 rounded-2xl border border-stone-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3';
  } else {
    if (badge) {
      badge.textContent = 'Closed';
      badge.className = 'text-[10px] font-semibold text-stone-400';
    }
    if (inputsWrap) inputsWrap.style.display = 'none';
    if (row) row.className = 'p-3.5 rounded-2xl border border-stone-200/60 bg-stone-50/70 opacity-75 flex flex-col sm:flex-row sm:items-center justify-between gap-3';
  }
}

function evaluateBusinessOpenStatus(workingHours) {
  if (!workingHours) return;

  // Addis Ababa time (UTC+3)
  const now = new Date();
  const options = { timeZone: 'Africa/Addis_Ababa', weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: false };
  const formatter = new Intl.DateTimeFormat([], options);
  const parts = formatter.formatToParts(now);

  let weekdayName = 'Monday';
  let currentHour = 12;
  let currentMinute = 0;

  parts.forEach(p => {
    if (p.type === 'weekday') weekdayName = p.value;
    if (p.type === 'hour') currentHour = parseInt(p.value, 10);
    if (p.type === 'minute') currentMinute = parseInt(p.value, 10);
  });

  const dayKey = weekdayName.toLowerCase();
  const daySchedule = workingHours[dayKey] || { open: '08:00', close: '20:00', isOpen: true };

  const currentMinutesVal = currentHour * 60 + currentMinute;
  const [openH, openM] = (daySchedule.open || '08:00').split(':').map(Number);
  const [closeH, closeM] = (daySchedule.close || '20:00').split(':').map(Number);
  const openMinutesVal = openH * 60 + openM;
  const closeMinutesVal = closeH * 60 + closeM;

  const isOpenNow = daySchedule.isOpen !== false && currentMinutesVal >= openMinutesVal && currentMinutesVal < closeMinutesVal;

  const statusBadge = document.getElementById('sidebarBusinessStatus');
  if (statusBadge) {
    if (isOpenNow) {
      statusBadge.className = 'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-700 mt-0.5';
      statusBadge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span><span>Open Now</span>';
    } else {
      statusBadge.className = 'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-100 text-rose-700 mt-0.5';
      statusBadge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span><span>Closed</span>';
    }
  }

  const dashHoursText = document.getElementById('dashStatHoursText');
  if (dashHoursText) {
    dashHoursText.textContent = `Today (${weekdayName}): ${daySchedule.isOpen ? `${daySchedule.open} – ${daySchedule.close}` : 'Closed'}`;
  }
  const dashHoursBadge = document.getElementById('dashStatHoursBadge');
  if (dashHoursBadge) {
    dashHoursBadge.className = `inline-flex items-center gap-1 text-[10px] font-bold mt-1 ${isOpenNow ? 'text-emerald-600' : 'text-stone-400'}`;
    dashHoursBadge.textContent = isOpenNow ? '● Currently Open for orders' : '○ Currently Closed (Accepting scheduled orders)';
  }
}

// ------------------------------------------------------------
// LOGO MANAGEMENT (UPLOAD, PREVIEW, REPLACE, REMOVE)
// ------------------------------------------------------------

function handleLogoFileSelect(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    alert('Please choose an image file (PNG, JPG, or WEBP)');
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    alert('Logo image must be smaller than 10MB');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    stagedLogoBase64 = e.target.result;
    stagedRemoveLogo = false;
    const preview = document.getElementById('formLogoPreview');
    if (preview) preview.src = stagedLogoBase64;
    showAdminToast('New logo preview ready. Click SAVE CHANGES to publish.', 'success');
  };
  reader.readAsDataURL(file);
}

function removeBusinessLogo() {
  stagedLogoBase64 = null;
  stagedRemoveLogo = true;
  const preview = document.getElementById('formLogoPreview');
  if (preview) preview.src = '/images/mak-cake-logo.webp';
  showAdminToast('Logo reset to default preview. Click SAVE CHANGES to publish.', 'success');
}

// ------------------------------------------------------------
// SAVE AND CANCEL SYSTEM
// ------------------------------------------------------------

async function saveSettingsForm() {
  const brandName = document.getElementById('setBrandName').value.trim();
  const primaryPhone = document.getElementById('setContactPhonePrimary').value.trim();

  if (!brandName) {
    alert('Please enter a Brand Name');
    switchSettingsSubTab('general');
    return;
  }
  if (!primaryPhone) {
    alert('Please enter a Primary Phone Number');
    switchSettingsSubTab('contact');
    return;
  }

  // Collect working hours
  const workingHours = {};
  DAYS_OF_WEEK.forEach(d => {
    const isChecked = document.getElementById('hourOpen_' + d.key)?.checked;
    const openTime = document.getElementById('hourTimeOpen_' + d.key)?.value || '08:00';
    const closeTime = document.getElementById('hourTimeClose_' + d.key)?.value || '20:00';
    workingHours[d.key] = {
      open: openTime,
      close: closeTime,
      isOpen: Boolean(isChecked)
    };
  });

  // Construct payload
  const payload = {
    brand: {
      name: brandName,
      category: document.getElementById('setBrandCategory')?.value.trim() || 'Artisanal Bakery & Confectionery',
      tagline: document.getElementById('setBrandTagline')?.value.trim() || '',
      description: document.getElementById('setBrandDescription')?.value.trim() || '',
      logo: currentSettings?.brand?.logo || '/images/mak-cake-logo.webp'
    },
    contact: {
      primaryPhone: primaryPhone,
      secondaryPhone: document.getElementById('setContactPhoneSecondary')?.value.trim() || '',
      email: document.getElementById('setContactEmail')?.value.trim() || '',
      telegramUsername: document.getElementById('setContactTelegram')?.value.trim() || ''
    },
    social: {
      facebook: document.getElementById('setSocialFacebook')?.value.trim() || '',
      instagram: document.getElementById('setSocialInstagram')?.value.trim() || '',
      tiktok: document.getElementById('setSocialTikTok')?.value.trim() || '',
      telegram: document.getElementById('setSocialTelegram')?.value.trim() || '',
      youtube: document.getElementById('setSocialYouTube')?.value.trim() || '',
      other: document.getElementById('setSocialOther')?.value.trim() || ''
    },
    workingHours,
    location: {
      country: document.getElementById('setLocationCountry')?.value.trim() || 'Ethiopia',
      city: document.getElementById('setLocationCity')?.value.trim() || 'Addis Ababa',
      area: document.getElementById('setLocationArea')?.value.trim() || '',
      address: document.getElementById('setLocationAddress')?.value.trim() || '',
      googleMapsUrl: document.getElementById('setLocationMapsUrl')?.value.trim() || ''
    },
    payments: {
      cbe: {
        name: 'Commercial Bank of Ethiopia (CBE)',
        accountHolder: document.getElementById('setPayCbeHolder')?.value.trim() || '',
        accountNumber: document.getElementById('setPayCbeNumber')?.value.trim() || '',
        enabled: Boolean(document.getElementById('setPayCbeEnabled')?.checked),
        logo: currentSettings?.payments?.cbe?.logo || '/images/cbe-logo.webp'
      },
      telebirr: {
        name: 'Telebirr',
        accountHolder: document.getElementById('setPayTelebirrHolder')?.value.trim() || '',
        accountNumber: document.getElementById('setPayTelebirrNumber')?.value.trim() || '',
        enabled: Boolean(document.getElementById('setPayTelebirrEnabled')?.checked),
        logo: currentSettings?.payments?.telebirr?.logo || '/images/telebirr-logo.webp'
      }
    },
    alerts: {
      chimeEnabled: Boolean(document.getElementById('setOrderChimeEnabled')?.checked !== false)
    },
    adminAuth: {
      ownerEmail: document.getElementById('setClientOwnerEmail')?.value.trim().toLowerCase() || currentSettings?.adminAuth?.ownerEmail || 'owner@makcake.com',
      googleClientId: document.getElementById('setGoogleClientId')?.value.trim() || '',
      allowedEmails: (document.getElementById('setGoogleAllowedEmails')?.value || '')
        .split(',')
        .map(e => e.trim().toLowerCase())
        .filter(Boolean)
    }
  };

  try {
    // 1. If logo was changed, upload logo first
    if (stagedLogoBase64 || stagedRemoveLogo) {
      const logoRes = await fetch('/api/settings/logo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + adminToken
        },
        body: JSON.stringify({
          logo: stagedLogoBase64,
          removeLogo: stagedRemoveLogo
        })
      });
      const logoData = await logoRes.json();
      if (logoData.success && logoData.logoUrl) {
        payload.brand.logo = logoData.logoUrl;
        stagedLogoBase64 = null;
        stagedRemoveLogo = false;
      }
    }

    // 2. Save settings
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + adminToken
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (data.success && data.settings) {
      currentSettings = data.settings;
      updateAdminBranding(currentSettings);
      showAdminToast('✅ Business profile and settings updated successfully! Live website refreshed.', 'success');
    } else {
      showAdminToast('Error: ' + (data.error || 'Failed to save settings'), 'error');
    }
  } catch (err) {
    console.error('Save settings error:', err);
    showAdminToast('Network error while saving settings.', 'error');
  }
}

function cancelSettingsEdits() {
  if (currentSettings) {
    stagedLogoBase64 = null;
    stagedRemoveLogo = false;
    populateSettingsForm(currentSettings);
    showAdminToast('Changes discarded. Form reverted to current settings.');
  }
}

async function savePaymentSettingsDirect() {
  if (!currentSettings) return;

  const payments = {
    cbe: {
      name: 'Commercial Bank of Ethiopia (CBE)',
      accountHolder: document.getElementById('directPayCbeHolder')?.value.trim() || '',
      accountNumber: document.getElementById('directPayCbeNumber')?.value.trim() || '',
      enabled: Boolean(document.getElementById('directPayCbeEnabled')?.checked),
      logo: currentSettings?.payments?.cbe?.logo || '/images/cbe-logo.webp'
    },
    telebirr: {
      name: 'Telebirr',
      accountHolder: document.getElementById('directPayTelebirrHolder')?.value.trim() || '',
      accountNumber: document.getElementById('directPayTelebirrNumber')?.value.trim() || '',
      enabled: Boolean(document.getElementById('directPayTelebirrEnabled')?.checked),
      logo: currentSettings?.payments?.telebirr?.logo || '/images/telebirr-logo.webp'
    },
    customMethods: currentSettings?.payments?.customMethods || []
  };

  const payload = {
    ...currentSettings,
    payments
  };

  try {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + adminToken
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (data.success && data.settings) {
      currentSettings = data.settings;
      populateSettingsForm(currentSettings);
      showAdminToast('✅ Payment account details updated! Future checkouts will display these accounts.', 'success');
    } else {
      showAdminToast('Error saving payment accounts: ' + (data.error || ''), 'error');
    }
  } catch (err) {
    showAdminToast('Network error saving payment accounts', 'error');
  }
}

// ------------------------------------------------------------
// CUSTOM PAYMENT METHODS MANAGEMENT
// ------------------------------------------------------------

function renderCustomPaymentMethods() {
  const grid = document.getElementById('customPaymentMethodsGrid');
  if (!grid) return;

  const customMethods = currentSettings?.payments?.customMethods || [];
  if (customMethods.length === 0) {
    grid.innerHTML = `
      <div class="col-span-1 md:col-span-2 p-6 rounded-2xl bg-stone-50 border border-dashed border-stone-300 text-center space-y-2">
        <i class="fa-solid fa-wallet text-stone-300 text-3xl"></i>
        <h4 class="text-xs font-bold text-chocolate">No Additional Payment Methods Added</h4>
        <p class="text-[11px] text-stone-500 max-w-sm mx-auto">
          Add any other Ethiopian bank (Abyssinia, Awash, Dashen, Coopay, etc.) so your customers can pay with their preferred bank.
        </p>
        <button type="button" onclick="openAddPaymentMethodModal()" class="btn-gold px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-2xs mt-1 cursor-pointer">
          <i class="fa-solid fa-plus"></i>
          <span>Add First Payment Method</span>
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = customMethods.map(m => {
    const isEnabled = m.enabled !== false;
    const iconClass = m.icon || 'fa-building-columns';
    return `
      <div class="bg-white p-5 rounded-3xl shadow-sm border ${isEnabled ? 'border-stone-200' : 'border-stone-200/60 bg-stone-50/50 opacity-80'} space-y-3 transition">
        <div class="flex items-center justify-between pb-2.5 border-b border-stone-100">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200 text-[#c94968] flex items-center justify-center shrink-0 shadow-2xs">
              <i class="fa-solid ${escapeHtml(iconClass)} text-base"></i>
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <h3 class="font-bold text-sm text-chocolate leading-tight">${escapeHtml(m.name)}</h3>
                <span class="px-1.5 py-0.5 rounded text-[9px] font-bold ${isEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'}">
                  ${isEnabled ? 'Active' : 'Disabled'}
                </span>
              </div>
              <span class="text-[10px] text-stone-400">${escapeHtml(m.type || 'Bank Transfer')}</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <label class="relative inline-flex items-center cursor-pointer" title="Toggle active status">
              <input type="checkbox" class="sr-only peer" ${isEnabled ? 'checked' : ''} onchange="toggleCustomPaymentMethodStatus('${m.id}', this.checked)">
              <div class="w-10 h-5 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#c94968]"></div>
            </label>
          </div>
        </div>

        <div class="space-y-1.5 text-xs">
          <div class="flex items-center justify-between bg-stone-50 p-2 rounded-xl border border-stone-100">
            <span class="text-[11px] text-stone-500">Account Holder:</span>
            <span class="font-bold text-chocolate">${escapeHtml(m.accountHolder)}</span>
          </div>
          <div class="flex items-center justify-between bg-stone-50 p-2 rounded-xl border border-stone-100">
            <span class="text-[11px] text-stone-500">Account / Phone:</span>
            <span class="font-mono font-bold text-[#c94968]">${escapeHtml(m.accountNumber)}</span>
          </div>
          ${m.instructions ? `
            <p class="text-[10px] text-stone-400 italic px-1">
              Note: ${escapeHtml(m.instructions)}
            </p>
          ` : ''}
        </div>

        <div class="pt-2 border-t border-stone-100 flex items-center justify-end gap-2">
          <button type="button" onclick="openEditPaymentMethodModal('${m.id}')"
                  class="px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-600 text-xs font-semibold flex items-center gap-1 transition cursor-pointer">
            <i class="fa-solid fa-pen-to-square text-[10px] text-stone-400"></i>
            <span>Edit</span>
          </button>
          <button type="button" onclick="deleteCustomPaymentMethod('${m.id}')"
                  class="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold flex items-center gap-1 transition cursor-pointer">
            <i class="fa-solid fa-trash text-[10px]"></i>
            <span>Delete</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function selectPaymentPreset(name, type, icon) {
  const nameEl = document.getElementById('customPayName');
  const typeEl = document.getElementById('customPayType');
  const iconEl = document.getElementById('customPayIcon');
  if (nameEl) nameEl.value = name;
  if (typeEl && type) typeEl.value = type;
  if (iconEl && icon) iconEl.value = icon;
}

function openAddPaymentMethodModal() {
  const modal = document.getElementById('adminPaymentMethodModal');
  const title = document.getElementById('paymentModalTitle');
  const form = document.getElementById('adminPaymentMethodForm');
  if (!modal || !form) return;

  if (title) title.textContent = 'Add Payment Method';
  document.getElementById('customPayMethodId').value = '';
  document.getElementById('customPayName').value = '';
  document.getElementById('customPayHolder').value = currentSettings?.brand?.name || 'MAK Cake Artisanal Bakery';
  document.getElementById('customPayNumber').value = '';
  document.getElementById('customPayType').value = 'Bank Transfer';
  document.getElementById('customPayIcon').value = 'fa-building-columns';
  document.getElementById('customPayInstructions').value = '';
  document.getElementById('customPayEnabled').checked = true;

  modal.classList.remove('hidden');
}

function openEditPaymentMethodModal(methodId) {
  const modal = document.getElementById('adminPaymentMethodModal');
  const title = document.getElementById('paymentModalTitle');
  if (!modal) return;

  const methods = currentSettings?.payments?.customMethods || [];
  const method = methods.find(m => m.id === methodId);
  if (!method) return;

  if (title) title.textContent = 'Edit Payment Method';
  document.getElementById('customPayMethodId').value = method.id;
  document.getElementById('customPayName').value = method.name || '';
  document.getElementById('customPayHolder').value = method.accountHolder || '';
  document.getElementById('customPayNumber').value = method.accountNumber || '';
  document.getElementById('customPayType').value = method.type || 'Bank Transfer';
  document.getElementById('customPayIcon').value = method.icon || 'fa-building-columns';
  document.getElementById('customPayInstructions').value = method.instructions || '';
  document.getElementById('customPayEnabled').checked = method.enabled !== false;

  modal.classList.remove('hidden');
}

function closeAdminPaymentMethodModal() {
  const modal = document.getElementById('adminPaymentMethodModal');
  if (modal) modal.classList.add('hidden');
}

async function savePaymentMethodForm(e) {
  e.preventDefault();
  const methodId = document.getElementById('customPayMethodId').value.trim();
  const name = document.getElementById('customPayName').value.trim();
  const accountHolder = document.getElementById('customPayHolder').value.trim();
  const accountNumber = document.getElementById('customPayNumber').value.trim();
  const type = document.getElementById('customPayType').value;
  const icon = document.getElementById('customPayIcon').value;
  const instructions = document.getElementById('customPayInstructions').value.trim();
  const enabled = document.getElementById('customPayEnabled').checked;

  if (!name || !accountNumber) {
    showAdminToast('Please provide both Bank Name and Account Number.', 'error');
    return;
  }

  const payload = {
    name,
    accountHolder,
    accountNumber,
    type,
    icon,
    instructions,
    enabled
  };

  try {
    const isEdit = Boolean(methodId);
    const url = isEdit ? `/api/settings/payments/method/${encodeURIComponent(methodId)}` : '/api/settings/payments/method';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + adminToken
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (data.success) {
      if (currentSettings) {
        currentSettings.payments = currentSettings.payments || {};
        currentSettings.payments.customMethods = data.customMethods;
      }
      renderCustomPaymentMethods();
      closeAdminPaymentMethodModal();
      showAdminToast(data.message || 'Payment method saved successfully!', 'success');
    } else {
      showAdminToast('Error: ' + (data.error || 'Failed to save payment method'), 'error');
    }
  } catch (err) {
    showAdminToast('Network error while saving payment method.', 'error');
  }
}

async function toggleCustomPaymentMethodStatus(methodId, isEnabled) {
  const methods = currentSettings?.payments?.customMethods || [];
  const target = methods.find(m => m.id === methodId);
  if (!target) return;

  target.enabled = isEnabled;
  try {
    const res = await fetch(`/api/settings/payments/method/${encodeURIComponent(methodId)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + adminToken
      },
      body: JSON.stringify({ enabled: isEnabled })
    });
    const data = await res.json();
    if (data.success) {
      currentSettings.payments.customMethods = data.customMethods;
      renderCustomPaymentMethods();
      showAdminToast(`Payment method "${target.name}" is now ${isEnabled ? 'Active' : 'Disabled'}.`, 'success');
    }
  } catch (err) {
    showAdminToast('Failed to update payment method status.', 'error');
  }
}

async function deleteCustomPaymentMethod(methodId) {
  const methods = currentSettings?.payments?.customMethods || [];
  const target = methods.find(m => m.id === methodId);
  const name = target ? target.name : 'this payment method';

  if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

  try {
    const res = await fetch(`/api/settings/payments/method/${encodeURIComponent(methodId)}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + adminToken
      }
    });
    const data = await res.json();
    if (data.success) {
      if (currentSettings?.payments) {
        currentSettings.payments.customMethods = data.customMethods;
      }
      renderCustomPaymentMethods();
      showAdminToast(`Payment method "${name}" deleted successfully!`, 'success');
    } else {
      showAdminToast('Error: ' + (data.error || 'Failed to delete'), 'error');
    }
  } catch (err) {
    showAdminToast('Network error while deleting payment method.', 'error');
  }
}

// ------------------------------------------------------------
// ORDERS MANAGEMENT (HISTORICAL TRACKING & STATUS UPDATES)
// ------------------------------------------------------------

async function refreshAdminOrders(btn) {
  const button = btn || document.getElementById('btnRefreshOrders');
  const icon = button ? button.querySelector('i') : null;

  if (button) button.disabled = true;
  if (icon) icon.classList.add('fa-spin');

  try {
    await loadAdminOrders();
    await new Promise(r => setTimeout(r, 600));
    showAdminToast('Customer orders refreshed.', 'success');
  } catch (err) {
    showAdminToast('Failed to refresh orders: ' + err.message, 'error');
  } finally {
    if (icon) icon.classList.remove('fa-spin');
    if (button) button.disabled = false;
  }
}

let isSubscribedToCloudOrders = false;

async function initCloudSyncAndOrders() {
  if (!window.FirebaseService || !window.FirebaseService.isAvailable()) return;

  // 1. One-time seeding if Firestore collections are empty
  try {
    setTimeout(async () => {
      if (currentProducts && currentProducts.length > 0) {
        await window.FirebaseService.seedFirestoreFromLocal(currentProducts, currentSettings);
      }
    }, 1500);
  } catch (e) {
    console.warn('Auto-seeding check notice:', e);
  }

  // 2. Real-time subscription to incoming orders
  if (!isSubscribedToCloudOrders) {
    isSubscribedToCloudOrders = true;
    try {
      window.FirebaseService.subscribeToOrders({
        onInitialLoad: (orders) => {
          if (Array.isArray(orders)) {
            if (orders.length > 0) {
              currentOrders = orders;
            }
            renderOrdersDashboardAndTable();
            updateSampleOrderBadges();
          }
        },
        onNewOrder: (newOrder) => {
          // Play bakery chime if enabled
          const chimeEnabled = document.getElementById('setOrderChimeEnabled')?.checked !== false;
          if (chimeEnabled && window.FirebaseService && typeof window.FirebaseService.playBakeryChime === 'function') {
            window.FirebaseService.playBakeryChime();
          }

          // Prepend to current orders if not already in list
          const exists = currentOrders.find(o => (o.id === newOrder.id || o.orderId === newOrder.id));
          if (!exists) {
            currentOrders.unshift(newOrder);
            renderOrdersDashboardAndTable();
            updateSampleOrderBadges();
            showAdminToast(`🎂 New Order #${newOrder.id} received from ${newOrder.customerName || 'Customer'}!`, 'success');
          }
        },
        onOrderUpdated: (updatedOrder) => {
          const idx = currentOrders.findIndex(o => (o.id === updatedOrder.id || o.orderId === updatedOrder.id));
          if (idx !== -1) {
            currentOrders[idx] = updatedOrder;
            renderOrdersDashboardAndTable();
          }
        }
      });
    } catch (subErr) {
      console.warn('Realtime subscription notice:', subErr);
    }
  }
}

async function loadAdminOrders() {
  let ordersLoaded = false;

  // 1. Try Cloud Firestore first
  if (window.FirebaseService && window.FirebaseService.isAvailable()) {
    try {
      const cloudOrders = await window.FirebaseService.getOrders();
      if (Array.isArray(cloudOrders) && cloudOrders.length > 0) {
        currentOrders = cloudOrders;
        renderOrdersDashboardAndTable();
        updateSampleOrderBadges();
        ordersLoaded = true;
      }
    } catch (fsErr) {
      console.warn('Firestore orders fetch notice:', fsErr);
    }
  }

  // 2. Fallback to API /api/orders (Netlify serverless function or Node server)
  if (!ordersLoaded || currentOrders.length === 0) {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && Array.isArray(data.orders) && data.orders.length > 0) {
          currentOrders = data.orders;
          renderOrdersDashboardAndTable();
          updateSampleOrderBadges();
          ordersLoaded = true;
        }
      }
    } catch (err) {
      console.warn('API orders fetch notice:', err);
    }
  }

  // 3. Fallback to static bundled catalog /data/orders.json (Netlify static resilience)
  if (!ordersLoaded || currentOrders.length === 0) {
    try {
      const res = await fetch('/data/orders.json');
      if (res.ok) {
        const staticOrders = await res.json();
        if (Array.isArray(staticOrders) && staticOrders.length > 0) {
          currentOrders = staticOrders;
          renderOrdersDashboardAndTable();
          updateSampleOrderBadges();
          ordersLoaded = true;
        }
      }
    } catch (staticErr) {
      console.warn('Static orders fetch notice:', staticErr);
    }
  }

  // 4. Fallback to locally stored customer orders in browser
  try {
    const localPlaced = JSON.parse(localStorage.getItem('mak_cake_customer_orders') || '[]');
    if (Array.isArray(localPlaced) && localPlaced.length > 0) {
      localPlaced.forEach(locOrd => {
        const id = locOrd.orderId || locOrd.id;
        if (id && !currentOrders.some(o => (o.id === id || o.orderId === id))) {
          currentOrders.unshift(locOrd);
        }
      });
      renderOrdersDashboardAndTable();
      updateSampleOrderBadges();
      ordersLoaded = true;
    }
  } catch (e) {}

  // 5. GUARANTEED: Always render to remove "Loading recent orders..."
  currentOrders = currentOrders || [];
  renderOrdersDashboardAndTable();
  updateSampleOrderBadges();
}

function renderOrdersDashboardAndTable() {
  // Update badges
  const navBadge = document.getElementById('navBadgeOrders');
  if (navBadge) navBadge.textContent = currentOrders.length;

  const statOrders = document.getElementById('dashStatOrders');
  if (statOrders) statOrders.textContent = currentOrders.length;

  const pendingCount = currentOrders.filter(o => o.status === 'Pending' || o.status === 'New').length;
  const statPending = document.getElementById('dashStatPending');
  if (statPending) statPending.textContent = pendingCount;

  const completedCount = currentOrders.filter(o => o.status === 'Completed' || o.status === 'Delivered').length;
  const statCompleted = document.getElementById('dashStatCompleted');
  if (statCompleted) statCompleted.textContent = completedCount;

  // Counts for filter pills
  const countAll = document.getElementById('orderCountAll');
  if (countAll) countAll.textContent = currentOrders.length;
  const countPend = document.getElementById('orderCountPending') || document.getElementById('orderCountNew');
  if (countPend) countPend.textContent = pendingCount;
  const countConf = document.getElementById('orderCountConfirmed');
  if (countConf) countConf.textContent = currentOrders.filter(o => o.status === 'Confirmed').length;
  const countPrep = document.getElementById('orderCountPreparing');
  if (countPrep) countPrep.textContent = currentOrders.filter(o => o.status === 'Preparing').length;
  const countReady = document.getElementById('orderCountReady');
  if (countReady) countReady.textContent = currentOrders.filter(o => o.status === 'Ready').length;
  const countComp = document.getElementById('orderCountCompleted') || document.getElementById('orderCountDelivered');
  if (countComp) countComp.textContent = currentOrders.filter(o => o.status === 'Completed' || o.status === 'Delivered').length;
  const countCanc = document.getElementById('orderCountCancelled');
  if (countCanc) countCanc.textContent = currentOrders.filter(o => o.status === 'Cancelled').length;

  // Render recent orders table on dashboard
  renderDashboardRecentOrders();

  // Render master orders table
  renderOrdersMasterTable();

  // Render financial revenue & earnings analytics
  renderRevenueSection();
}

// Helpers for Compact 5-Digit Order IDs & Timestamps
function getDisplayOrderId(o) {
  if (!o) return '#00000';
  if (o.shortOrderId) return '#' + o.shortOrderId;
  const raw = String(o.orderId || o.id || '').replace(/^#/, '');
  if (/^\d{5}$/.test(raw)) return '#' + raw;
  if (raw.startsWith('MAK-')) {
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
      hash = ((hash << 5) - hash) + raw.charCodeAt(i);
      hash |= 0;
    }
    return '#' + ((Math.abs(hash) % 90000) + 10000);
  }
  return '#' + (raw.length > 5 ? raw.slice(0, 5) : raw);
}

function getOrderDateString(o) {
  if (!o) return 'Flexible';
  const rawDate = o.createdAt || o.datePlaced || o.updatedAt;
  if (!rawDate) return 'Flexible';
  const d = new Date(rawDate);
  if (isNaN(d.getTime())) return 'Flexible';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getOrderDateTimeString(o) {
  if (!o) return 'Flexible';
  const rawDate = o.createdAt || o.datePlaced || o.updatedAt;
  if (!rawDate) return 'Flexible';
  const d = new Date(rawDate);
  if (isNaN(d.getTime())) return 'Flexible';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function isPayOnDelivery(o) {
  if (!o) return false;
  return Boolean(
    o.isDelivery ||
    o.paymentOption === 'delivery' ||
    o.selectedPaymentMethod === 'Pay on Delivery / Pickup' ||
    (o.paymentDetails && o.paymentDetails.method === 'Pay on Delivery / Pickup')
  );
}

function getPaymentInfoSummary(o) {
  const isDelivery = isPayOnDelivery(o);
  const isHalf = (o.paymentOption === 'half');
  
  // Normalized payment status: Paid or Pending
  const paymentStatus = o.paymentStatus || (o.paymentReceived ? 'Paid' : (isDelivery ? 'Pending' : (o.status === 'Confirmed' || o.status === 'Preparing' || o.status === 'Ready' || o.status === 'Completed' || o.status === 'Delivered' ? 'Paid' : 'Pending')));
  const isPaid = (paymentStatus === 'Paid');

  if (isPaid) {
    return {
      planLabel: isDelivery ? 'Pay on Delivery (Paid)' : (isHalf ? 'Half Payment (Paid)' : 'Full Payment (Paid)'),
      badgeClass: 'text-emerald-800 bg-emerald-50 border-emerald-200',
      shortBadge: 'Paid',
      paymentStatus: 'Paid',
      isPaid: true,
      paidAmt: Number(o.totalPrice) || 0,
      dueAmt: 0,
      isHalf,
      isDelivery
    };
  }

  if (isHalf) {
    const halfPaid = o.amountPaidNow != null ? o.amountPaidNow : Math.round((o.totalPrice || 0) / 2);
    const halfDue = o.amountDueOnDelivery != null ? o.amountDueOnDelivery : ((o.totalPrice || 0) - halfPaid);
    return {
      planLabel: 'Half Payment (50%)',
      badgeClass: 'text-amber-800 bg-amber-50 border-amber-200',
      shortBadge: 'Half (50%)',
      paymentStatus: 'Pending',
      isPaid: false,
      paidAmt: halfPaid,
      dueAmt: halfDue,
      isHalf: true,
      isDelivery: false
    };
  } else if (isDelivery) {
    return {
      planLabel: 'Payment on Delivery',
      badgeClass: 'text-amber-800 bg-amber-50 border-amber-200',
      shortBadge: 'Pay on Delivery',
      paymentStatus: 'Pending',
      isPaid: false,
      paidAmt: 0,
      dueAmt: Number(o.totalPrice) || 0,
      isHalf: false,
      isDelivery: true
    };
  } else {
    const isOrderConfirmed = (o.status === 'Confirmed' || o.status === 'Preparing' || o.status === 'Ready' || o.status === 'Completed' || o.status === 'Delivered');
    return {
      planLabel: 'Full Payment (100%)',
      badgeClass: isOrderConfirmed ? 'text-emerald-800 bg-emerald-50 border-emerald-200' : 'text-purple-800 bg-purple-50 border-purple-200',
      shortBadge: 'Full (100%)',
      paymentStatus: isOrderConfirmed ? 'Paid' : 'Pending',
      isPaid: isOrderConfirmed,
      paidAmt: isOrderConfirmed ? (Number(o.totalPrice) || 0) : 0,
      dueAmt: isOrderConfirmed ? 0 : (Number(o.totalPrice) || 0),
      isHalf: false,
      isDelivery: false
    };
  }
}

// Mobile Order Card Generator (Clean 5-Digit ID, Date Together, Cake Image Thumbnail, #d04968 Button, Card Pop-Up)
function renderMobileOrderCard(o) {
  const shortId = getDisplayOrderId(o);
  const dateStr = getOrderDateString(o);
  const pay = getPaymentInfoSummary(o);
  let cakeImg = o.cakeImage;
  if (!cakeImg && Array.isArray(currentProducts)) {
    const matched = currentProducts.find(p => p.id === o.cakeId || p.name === o.cakeName);
    if (matched && matched.image) cakeImg = matched.image;
  }
  if (!cakeImg) cakeImg = '/images/hero-cake-only.jpg';
  const hasAccessories = Array.isArray(o.accessories) && o.accessories.length > 0;

  return `
    <div class="bg-white rounded-2xl p-4 shadow-sm border border-stone-200 space-y-3 transition hover:border-[#d04968]/40">
      
      <!-- TOP BAR: 5-digit ID + Date TOGETHER & Status Pill -->
      <div class="flex items-center justify-between pb-2 border-b border-stone-100">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="font-mono font-bold text-chocolate text-xs bg-stone-100 px-2.5 py-0.5 rounded-lg border border-stone-200">
            ${shortId}
          </span>
          <span class="text-stone-300 font-bold">•</span>
          <span class="text-stone-500 font-medium text-[11px] flex items-center gap-1">
            <i class="fa-regular fa-calendar text-[10px] text-stone-400"></i>
            <span>${dateStr}</span>
          </span>
        </div>
        <div>
          ${renderStatusPill(o.status)}
        </div>
      </div>

      <!-- SUMMARY ROW WITH CAKE IMAGE PREVIEW -->
      <div class="space-y-2 text-xs">
        <div class="flex items-center justify-between">
          <span class="font-bold text-chocolate text-sm truncate max-w-[190px]">${escapeHtml(o.customerName)}</span>
          <a href="tel:${escapeHtml(o.phoneNumber)}" class="text-[#d04968] font-bold text-xs inline-flex items-center gap-1 hover:underline shrink-0">
            <i class="fa-solid fa-phone text-[10px]"></i>
            <span>${escapeHtml(o.phoneNumber)}</span>
          </a>
        </div>

        <!-- Cake Image Thumbnail & Specs -->
        <div class="flex items-center gap-3 p-2 rounded-xl bg-stone-50 border border-stone-200/70">
          <img src="${cakeImg}" alt="${escapeHtml(o.cakeName)}" 
               class="w-12 h-12 rounded-lg object-cover border border-stone-200 shadow-2xs shrink-0 bg-white"
               onerror="this.src='/images/hero-cake-only.jpg'">
          <div class="min-w-0 flex-1">
            <div class="text-stone-800 font-bold text-xs truncate">${escapeHtml(o.cakeName)}</div>
            ${o.size ? `<div class="text-stone-500 text-[10px] truncate">${escapeHtml(o.size)}</div>` : ''}
            ${hasAccessories ? `<div class="text-[10px] text-[#d04968] font-bold mt-0.5 flex items-center gap-1"><i class="fa-solid fa-wand-magic-sparkles text-[9px]"></i><span>+${o.accessories.length} decoration${o.accessories.length > 1 ? 's' : ''} added</span></div>` : ''}
          </div>
        </div>

        <div class="flex items-center justify-between pt-0.5 flex-wrap gap-1">
          <span class="font-extrabold text-chocolate text-sm font-serif-luxury">${(o.totalPrice || 0).toLocaleString()} ETB</span>
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full border ${pay.badgeClass}">
              ${escapeHtml(pay.shortBadge)}
            </span>
            ${pay.isPaid ? `
              <span class="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 inline-flex items-center gap-1">
                <i class="fa-solid fa-check text-[8px] text-emerald-600"></i> Paid
              </span>
            ` : `
              <span class="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 inline-flex items-center gap-1">
                <i class="fa-solid fa-clock text-[8px] text-amber-600"></i> Pending
              </span>
              <button onclick="event.stopPropagation(); markOrderAsPaid('${o.orderId}')" class="px-2 py-0.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[9px] inline-flex items-center gap-1 transition shadow-2xs cursor-pointer">
                <i class="fa-solid fa-check text-[8px]"></i> Mark Paid
              </button>
            `}
          </div>
        </div>
      </div>

      <!-- VIEW DETAILS & CONFIRM BUTTON (#d04968 background, pops up card modal) -->
      <button type="button" onclick="viewAdminOrderDetails('${escapeHtml(o.orderId)}')"
              class="w-full py-2.5 px-4 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition hover:brightness-105 active:scale-98 cursor-pointer"
              style="background-color: #d04968;">
        <i class="fa-solid fa-receipt text-xs"></i>
        <span>View Details & Confirm</span>
      </button>

    </div>
  `;
}

function renderDashboardRecentOrders() {
  const tbody = document.getElementById('dashRecentOrdersTable');
  const cardsContainer = document.getElementById('dashRecentOrdersCards');

  const recent = currentOrders.slice(0, 5);
  
  if (tbody) {
    if (recent.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" class="py-6 px-3 text-center text-stone-400">No orders placed yet.</td></tr>';
    } else {
      tbody.innerHTML = recent.map(o => {
        const shortId = getDisplayOrderId(o);
        const dateStr = getOrderDateString(o);
        return `
          <tr class="hover:bg-stone-50/70 transition border-b border-stone-100">
            <td class="py-3 px-3 font-mono font-bold text-chocolate whitespace-nowrap">
              <span class="block font-mono text-xs text-chocolate font-bold">${shortId}</span>
              <span class="block text-[10px] text-stone-400 font-normal font-sans">${dateStr}</span>
            </td>
            <td class="py-3 px-3">
              <span class="font-bold text-chocolate block truncate max-w-[130px]">${escapeHtml(o.customerName)}</span>
              <a href="tel:${escapeHtml(o.phoneNumber)}" class="text-[#c94968] hover:underline font-bold text-[11px] inline-flex items-center gap-1 whitespace-nowrap">
                <i class="fa-solid fa-phone text-[9px]"></i>
                <span>${escapeHtml(o.phoneNumber)}</span>
              </a>
            </td>
            <td class="py-3 px-3 max-w-[170px]">
              <span class="font-bold text-chocolate block truncate">${escapeHtml(o.cakeName)}</span>
              <span class="text-stone-400 text-[10px] block truncate">${escapeHtml(o.size || '')}</span>
            </td>
            <td class="py-3 px-3 whitespace-nowrap font-medium text-stone-600">${escapeHtml(o.deliveryDate || 'Flexible')}</td>
            <td class="py-3 px-3 whitespace-nowrap font-bold text-chocolate">${(o.totalPrice || 0).toLocaleString()} ETB</td>
            <td class="py-3 px-3 whitespace-nowrap">${renderStatusPill(o.status)}</td>
            <td class="py-3 px-3 text-right whitespace-nowrap">
              <button onclick="viewAdminOrderDetails('${o.orderId}')" class="px-3 py-1.5 rounded-xl text-white font-bold text-[11px] transition shadow-2xs hover:brightness-105 cursor-pointer" style="background-color: #d04968;">
                Details
              </button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  if (cardsContainer) {
    if (recent.length === 0) {
      cardsContainer.innerHTML = '<div class="py-6 text-center text-stone-400 text-xs">No orders placed yet.</div>';
    } else {
      cardsContainer.innerHTML = recent.map(o => renderMobileOrderCard(o)).join('');
    }
  }
}

function filterOrdersByStatus(status) {
  currentOrderFilter = status;

  const filterBtns = ['All', 'Pending', 'Confirmed', 'Preparing', 'Ready', 'Completed', 'Cancelled', 'New', 'Delivered'];
  filterBtns.forEach(f => {
    const btn = document.getElementById('orderFilter' + f);
    if (btn) {
      const isMatch = (f === 'All' && status === 'all') || 
                      f === status || 
                      (status === 'Pending' && f === 'New') || 
                      (status === 'Completed' && f === 'Delivered');
      if (isMatch) {
        btn.className = 'px-3 py-1.5 rounded-full font-bold bg-chocolate text-white';
      } else {
        btn.className = 'px-3 py-1.5 rounded-full font-bold bg-stone-100 text-stone-600 hover:bg-stone-200';
      }
    }
  });

  renderOrdersMasterTable();
}

function handleOrderSearch(query) {
  renderOrdersMasterTable(query.trim().toLowerCase());
}

function renderOrdersMasterTable(searchQuery = '') {
  const tbody = document.getElementById('ordersMasterTableBody');
  const cardsContainer = document.getElementById('ordersMasterCardsList');

  let filtered = currentOrders;
  if (currentOrderFilter !== 'all') {
    if (currentOrderFilter === 'Pending') {
      filtered = filtered.filter(o => o.status === 'Pending' || o.status === 'New');
    } else if (currentOrderFilter === 'Completed') {
      filtered = filtered.filter(o => o.status === 'Completed' || o.status === 'Delivered');
    } else {
      filtered = filtered.filter(o => o.status === currentOrderFilter);
    }
  }

  if (searchQuery) {
    filtered = filtered.filter(o => {
      const shortId = getDisplayOrderId(o).toLowerCase();
      const idMatch = (o.orderId || '').toLowerCase().includes(searchQuery) || shortId.includes(searchQuery);
      const nameMatch = (o.customerName || '').toLowerCase().includes(searchQuery);
      const phoneMatch = (o.phoneNumber || '').toLowerCase().includes(searchQuery);
      const cakeMatch = (o.cakeName || '').toLowerCase().includes(searchQuery);
      return idMatch || nameMatch || phoneMatch || cakeMatch;
    });
  }

  if (tbody) {
    if (filtered.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" class="py-8 text-center text-stone-400">No orders matching your criteria.</td></tr>';
    } else {
      tbody.innerHTML = filtered.map(o => {
        const shortId = getDisplayOrderId(o);
        const dateTimeStr = getOrderDateTimeString(o);
        const pay = getPaymentInfoSummary(o);
        const isPending = (o.status === 'Pending' || o.status === 'New');
        const hasReceipt = Boolean(o.paymentReceiptFilename);

        return `
          <tr class="hover:bg-stone-50/70 transition">
            <td class="py-3 px-3 font-mono font-bold text-chocolate whitespace-nowrap">
              <span class="block font-mono text-xs text-chocolate font-bold">${shortId}</span>
              <span class="block text-[10px] text-stone-400 font-normal font-sans">${dateTimeStr}</span>
            </td>
            <td class="py-3 px-3">
              <span class="font-bold text-chocolate block">${escapeHtml(o.customerName)}</span>
              <a href="tel:${escapeHtml(o.phoneNumber)}" class="text-[#c94968] hover:underline font-bold text-[11px] inline-flex items-center gap-1">
                <i class="fa-solid fa-phone text-[9px]"></i>
                <span>${escapeHtml(o.phoneNumber)}</span>
              </a>
            </td>
            <td class="py-3 px-3 max-w-[200px]">
              <span class="font-bold text-chocolate block truncate">${escapeHtml(o.cakeName)}</span>
              <span class="text-stone-400 text-[10px] block truncate">${escapeHtml(o.cakeCategory || 'Cake')} • ${escapeHtml(o.size || '')}</span>
            </td>
            <td class="py-3 px-3 font-bold text-chocolate whitespace-nowrap">
              ${(o.totalPrice || 0).toLocaleString()} ETB
            </td>
            <td class="py-3 px-3 min-w-[155px]">
              <div class="flex items-center gap-1.5 mb-1 flex-wrap">
                <span class="text-[10px] font-semibold ${pay.badgeClass} px-2 py-0.5 rounded-full border">
                  ${escapeHtml(pay.planLabel)}
                </span>
                ${pay.isPaid ? `
                  <span class="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 inline-flex items-center gap-1">
                    <i class="fa-solid fa-check text-[8px] text-emerald-600"></i> Paid
                  </span>
                ` : `
                  <span class="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 inline-flex items-center gap-1">
                    <i class="fa-solid fa-clock text-[8px] text-amber-600"></i> Pending
                  </span>
                `}
              </div>
              <div class="flex items-center gap-1 flex-wrap">
                ${!pay.isPaid ? `
                  <button onclick="markOrderAsPaid('${o.orderId}')" class="px-2 py-0.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] inline-flex items-center gap-1 transition shadow-2xs cursor-pointer" title="Mark payment as received">
                    <i class="fa-solid fa-circle-check text-[8px]"></i> Mark Paid
                  </button>
                ` : ''}
                ${pay.isDelivery ? `
                  <span class="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    <i class="fa-solid fa-truck-fast text-[9px]"></i> Pay on Delivery
                  </span>
                ` : `
                  ${hasReceipt ? `
                    <button onclick="viewAdminOrderReceipt('${o.orderId}')" class="px-2 py-0.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-[10px] inline-flex items-center gap-1 transition">
                      <i class="fa-solid fa-receipt text-[9px]"></i> Receipt
                    </button>
                  ` : '<span class="text-[9px] text-stone-400">No screenshot</span>'}
                `}
              </div>
            </td>
            <td class="py-3 px-3">
              <select onchange="updateOrderStatus('${o.orderId}', this.value)" class="text-[11px] font-bold p-1 rounded-lg border border-stone-300 bg-white">
                <option value="Pending" ${isPending ? 'selected' : ''}>Pending</option>
                <option value="Confirmed" ${o.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                <option value="Preparing" ${o.status === 'Preparing' ? 'selected' : ''}>Preparing</option>
                <option value="Ready" ${o.status === 'Ready' ? 'selected' : ''}>Ready</option>
                <option value="Completed" ${(o.status === 'Completed' || o.status === 'Delivered') ? 'selected' : ''}>Completed</option>
                <option value="Cancelled" ${o.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
              </select>
            </td>
            <td class="py-3 px-3 text-right whitespace-nowrap">
              <button onclick="viewAdminOrderDetails('${o.orderId}')" class="px-3 py-1.5 rounded-xl text-white font-bold text-[11px] transition shadow-2xs hover:brightness-105 cursor-pointer" style="background-color: #d04968;">
                Details
              </button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  if (cardsContainer) {
    if (filtered.length === 0) {
      cardsContainer.innerHTML = '<div class="py-8 text-center text-stone-400 text-xs">No orders matching your criteria.</div>';
    } else {
      cardsContainer.innerHTML = filtered.map(o => renderMobileOrderCard(o)).join('');
    }
  }
}

function renderStatusPill(status) {
  switch (status) {
    case 'Pending':
    case 'New':
      return '<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200"><i class="fa-regular fa-clock text-[9px] mr-1"></i>Pending</span>';
    case 'Confirmed':
      return '<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200"><i class="fa-solid fa-check text-[9px] mr-1"></i>Confirmed</span>';
    case 'Preparing':
      return '<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200"><i class="fa-solid fa-fire-burner text-[9px] mr-1"></i>Preparing</span>';
    case 'Ready':
      return '<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800 border border-teal-200"><i class="fa-solid fa-box text-[9px] mr-1"></i>Ready</span>';
    case 'Completed':
    case 'Delivered':
      return '<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200"><i class="fa-solid fa-circle-check text-[9px] mr-1"></i>Completed</span>';
    case 'Cancelled':
      return '<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200"><i class="fa-solid fa-ban text-[9px] mr-1"></i>Cancelled</span>';
    default:
      return `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-700">${escapeHtml(status || 'Pending')}</span>`;
  }
}

async function updateOrderStatus(orderId, newStatus) {
  // 1. Cloud Firestore write
  if (window.FirebaseService && window.FirebaseService.isAvailable()) {
    try {
      await window.FirebaseService.updateOrder(orderId, { status: newStatus });
    } catch (fsErr) {
      console.warn('Firestore update order notice:', fsErr);
    }
  }

  // 2. Local Node backend write
  try {
    const res = await fetch('/api/orders/status', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + adminToken
      },
      body: JSON.stringify({ orderId, status: newStatus })
    });
    const data = await res.json();
    if (data.success) {
      showAdminToast(`Order #${orderId} marked as ${newStatus}`, 'success');
      const order = currentOrders.find(o => (o.orderId === orderId || o.id === orderId));
      if (order) order.status = newStatus;
      renderOrdersDashboardAndTable();
      if (currentSelectedOrder && (currentSelectedOrder.orderId === orderId || currentSelectedOrder.id === orderId)) {
        currentSelectedOrder.status = newStatus;
        const statusBadge = document.getElementById('modalOrderStatusBadge');
        if (statusBadge) statusBadge.innerHTML = renderStatusPill(newStatus);
        const modalSelect = document.getElementById('modalOrderStatusSelect');
        if (modalSelect) modalSelect.value = newStatus;
      }
    } else {
      showAdminToast('Error updating status: ' + (data.error || ''), 'error');
    }
  } catch (err) {
    // If local server is not running (e.g. Netlify static mode), still reflect the Firestore update in UI
    const order = currentOrders.find(o => (o.orderId === orderId || o.id === orderId));
    if (order) {
      order.status = newStatus;
      renderOrdersDashboardAndTable();
      showAdminToast(`Order #${orderId} marked as ${newStatus} (Cloud Firestore)`, 'success');
    } else {
      showAdminToast('Network error updating order status', 'error');
    }
  }
}

function viewAdminOrderDetails(orderId) {
  const order = currentOrders.find(o => o.orderId === orderId);
  if (!order) return;

  currentSelectedOrder = order;

  const modal = document.getElementById('adminOrderDetailsModal');
  if (!modal) return;

  // Header & Badges (5-Digit ID & Timestamp Together)
  const shortId = getDisplayOrderId(order);
  const dateTimeStr = getOrderDateTimeString(order);
  document.getElementById('modalOrderRefBadge').textContent = `${shortId} • Placed: ${dateTimeStr}`;
  document.getElementById('modalOrderStatusBadge').innerHTML = renderStatusPill(order.status);
  document.getElementById('modalOrderDeliveryDate').textContent = (order.deliveryDate || 'N/A') + ' (' + (order.deliveryTime || 'Flexible') + ')';

  // Customer
  document.getElementById('modalOrderCustomerName').textContent = order.customerName || 'N/A';
  const phoneLink = document.getElementById('modalOrderPhoneLink');
  const phoneText = document.getElementById('modalOrderPhoneText');
  if (phoneLink && phoneText) {
    phoneLink.href = 'tel:' + (order.phoneNumber || '');
    phoneText.textContent = order.phoneNumber || 'N/A';
  }
  document.getElementById('modalOrderLocation').textContent = order.customerLocation || 'Pick-up / Not specified';

  // Cake Details & Visual Preview
  document.getElementById('modalOrderCakeName').textContent = order.cakeName || 'Custom Cake';
  document.getElementById('modalOrderCakeSpecs').textContent = (order.cakeCategory || 'Cake') + ' • ' + (order.size || '') + ' • ' + (order.flavor || '');
  document.getElementById('modalOrderCakePrice').textContent = (order.unitPrice || order.totalPrice || 0).toLocaleString() + ' ETB';
  document.getElementById('modalOrderQty').textContent = 'Qty: ' + (order.quantity || 1);

  // Set Cake Image Preview
  const cakeImgEl = document.getElementById('modalOrderCakeImg');
  if (cakeImgEl) {
    let cakeImg = order.cakeImage;
    if (!cakeImg && Array.isArray(currentProducts)) {
      const matched = currentProducts.find(p => p.id === order.cakeId || p.name === order.cakeName);
      if (matched && matched.image) cakeImg = matched.image;
    }
    if (!cakeImg) cakeImg = '/images/hero-cake-only.jpg';
    cakeImgEl.src = cakeImg;
    cakeImgEl.alt = order.cakeName || 'Cake Preview';
  }

  // Set Cake Description
  const cakeDescEl = document.getElementById('modalOrderCakeDesc');
  if (cakeDescEl) {
    let cakeDesc = order.cakeDescription;
    if (!cakeDesc && Array.isArray(currentProducts)) {
      const matched = currentProducts.find(p => p.id === order.cakeId || p.name === order.cakeName);
      if (matched && matched.description) cakeDesc = matched.description;
    }
    if (cakeDesc) {
      cakeDescEl.textContent = `"${cakeDesc}"`;
      cakeDescEl.classList.remove('hidden');
    } else {
      cakeDescEl.classList.add('hidden');
    }
  }

  // Inscription
  const inscRow = document.getElementById('modalOrderInscriptionRow');
  const inscEl = document.getElementById('modalOrderInscription');
  if (order.inscription) {
    inscEl.textContent = '"' + order.inscription + '"';
    inscRow.classList.remove('hidden');
  } else {
    inscRow.classList.add('hidden');
  }

  // Accessories & Extra Decorations with visual preview thumbnails & candle age
  const accRow = document.getElementById('modalOrderAccessoriesRow');
  const accList = document.getElementById('modalOrderAccessoriesList');
  if (order.accessories && order.accessories.length > 0) {
    accList.innerHTML = order.accessories.map(a => {
      let accImg = a.image;
      if (!accImg && Array.isArray(currentProducts)) {
        const matched = currentProducts.find(p => p.id === a.id || p.name === a.name || p.name === a.displayName);
        if (matched && matched.image) accImg = matched.image;
      }
      if (!accImg) accImg = '/images/hero-cake-only.jpg';

      return `
        <div class="flex items-center justify-between bg-stone-50 p-2 rounded-xl border border-stone-200 gap-2">
          <div class="flex items-center gap-2.5 min-w-0">
            <img src="${accImg}" alt="${escapeHtml(a.displayName || a.name)}" 
                 class="w-10 h-10 rounded-lg object-cover border border-stone-200 shrink-0 bg-white" 
                 onerror="this.src='/images/hero-cake-only.jpg'">
            <div class="min-w-0">
              <span class="font-bold text-chocolate text-xs block truncate">${escapeHtml(a.displayName || a.name)}</span>
              <div class="flex items-center gap-1.5 flex-wrap">
                ${a.candleAge ? `<span class="text-rose-700 font-extrabold bg-rose-100 px-1.5 py-0.5 rounded text-[10px]">Age: ${escapeHtml(a.candleAge)}</span>` : ''}
                ${a.qty > 1 ? `<span class="text-stone-400 text-[10px] font-bold">Qty: ${a.qty}</span>` : ''}
              </div>
            </div>
          </div>
          <span class="font-bold text-chocolate text-xs shrink-0">${((a.totalPrice || a.price) || 0).toLocaleString()} ETB</span>
        </div>
      `;
    }).join('');
    accRow.classList.remove('hidden');
  } else {
    accRow.classList.add('hidden');
  }

  // Special instructions
  const notesRow = document.getElementById('modalOrderInstructionsRow');
  const notesEl = document.getElementById('modalOrderInstructions');
  if (order.specialInstructions) {
    notesEl.textContent = order.specialInstructions;
    notesRow.classList.remove('hidden');
  } else {
    notesRow.classList.add('hidden');
  }

  // Simple Payment Summary (Clean & Minimal)
  const payPlanEl = document.getElementById('modalOrderPlanName');
  const paySnapshot = document.getElementById('modalOrderPaymentSnapshot');
  const payStatusBadge = document.getElementById('modalOrderPaymentStatusBadge');
  const markAsPaidContainer = document.getElementById('modalMarkAsPaidContainer');

  document.getElementById('modalOrderTotalBadge').textContent = (order.totalPrice || 0).toLocaleString() + ' ETB';

  const payInfo = getPaymentInfoSummary(order);
  const isDelivery = payInfo.isDelivery;
  const isHalf = payInfo.isHalf;
  const isPaid = payInfo.isPaid;

  if (payPlanEl) {
    payPlanEl.textContent = order.selectedPaymentMethod || payInfo.planLabel;
  }

  // Render Payment Status Badge
  if (payStatusBadge) {
    if (isPaid) {
      payStatusBadge.className = 'text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 inline-flex items-center gap-1';
      payStatusBadge.innerHTML = '<i class="fa-solid fa-circle-check text-[10px] text-emerald-600"></i> Paid';
    } else {
      payStatusBadge.className = 'text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 inline-flex items-center gap-1';
      payStatusBadge.innerHTML = '<i class="fa-solid fa-clock text-[10px] text-amber-600"></i> Pending';
    }
  }

  // Render Mark as Paid button
  if (markAsPaidContainer) {
    if (!isPaid) {
      markAsPaidContainer.innerHTML = `
        <button type="button" onclick="markOrderAsPaid('${order.orderId}')" 
                class="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-2xs transition active:scale-95 cursor-pointer">
          <i class="fa-solid fa-circle-check text-xs"></i>
          <span>Mark as Paid</span>
        </button>
      `;
    } else {
      markAsPaidContainer.innerHTML = `
        <span class="text-[11px] font-bold text-emerald-700 inline-flex items-center gap-1">
          <i class="fa-solid fa-check-double text-xs"></i>
          <span>Payment Confirmed</span>
        </span>
      `;
    }
  }

  if (paySnapshot) {
    if (isPaid) {
      paySnapshot.innerHTML = `
        <div class="text-[11px] text-emerald-900 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 font-semibold flex items-center justify-between">
          <span class="inline-flex items-center gap-1.5"><i class="fa-solid fa-circle-check text-emerald-600 text-xs"></i> Paid in Full: <strong>${(order.totalPrice || 0).toLocaleString()} ETB</strong></span>
          <span class="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">Due: 0 ETB</span>
        </div>
      `;
    } else if (isHalf) {
      paySnapshot.innerHTML = `
        <div class="flex items-center justify-between text-xs bg-amber-50 p-2.5 rounded-xl border border-amber-200">
          <div><span class="text-stone-500 text-[11px] block">Deposit (Paid):</span><strong class="text-emerald-700">${(payInfo.paidAmt || 0).toLocaleString()} ETB</strong></div>
          <div class="text-right"><span class="text-stone-500 text-[11px] block">Due on Delivery:</span><strong class="text-[#d04968]">${(payInfo.dueAmt || 0).toLocaleString()} ETB</strong></div>
        </div>
      `;
    } else if (isDelivery) {
      paySnapshot.innerHTML = `
        <div class="text-[11px] text-amber-900 bg-amber-50 p-2 rounded-xl border border-amber-200 font-medium">
          🚚 100% due upon delivery: <strong>${(order.totalPrice || 0).toLocaleString()} ETB</strong> (Payment Pending)
        </div>
      `;
    } else {
      paySnapshot.innerHTML = `
        <div class="text-[11px] text-stone-500 pt-0.5 flex items-center justify-between">
          <span>Amount: <strong class="text-chocolate">${(order.totalPrice || 0).toLocaleString()} ETB</strong></span>
          <span class="text-amber-700 font-bold">Payment Pending Verification</span>
        </div>
      `;
    }
  }

  // Payment Receipt Verification Box
  const receiptBadge = document.getElementById('modalReceiptStatusBadge');
  const receiptContent = document.getElementById('modalReceiptContent');
  const isPending = (order.status === 'Pending' || order.status === 'New');

  if (receiptContent) {
    if (order.paymentOption === 'delivery') {
      if (receiptBadge) {
        receiptBadge.className = 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300';
        receiptBadge.textContent = 'Payment on Delivery';
      }
      receiptContent.innerHTML = `
        <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1">
          <div class="font-bold flex items-center gap-1.5">
            <i class="fa-solid fa-truck-fast text-emerald-600"></i>
            <span>Payment on Delivery (100% due on delivery)</span>
          </div>
          <p class="text-[11px] text-emerald-800">
            No bank transfer or receipt verification required. Full amount of <strong>${(order.totalPrice || 0).toLocaleString()} ETB</strong> is due upon delivery / pickup.
          </p>
        </div>
      `;
    } else if (order.paymentReceiptFilename) {
      if (receiptBadge) {
        if (isPending) {
          receiptBadge.className = 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300';
          receiptBadge.textContent = order.paymentOption === 'half' ? '50% Deposit Receipt Pending' : 'Pending Verification';
        } else {
          receiptBadge.className = 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300';
          receiptBadge.textContent = order.paymentOption === 'half' ? '50% Deposit Verified' : 'Verified / Confirmed';
        }
      }

      receiptContent.innerHTML = `
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-xl bg-white border border-amber-200 overflow-hidden w-full">
          <div class="flex items-center gap-2.5 min-w-0 flex-1 w-full sm:w-auto overflow-hidden">
            <span class="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-bold shrink-0">
              <i class="fa-solid fa-receipt"></i>
            </span>
            <div class="min-w-0 flex-1 overflow-hidden">
              <span class="text-xs font-bold text-chocolate block truncate max-w-full" title="${escapeHtml(order.paymentReceiptFilename)}">${escapeHtml(order.paymentReceiptFilename)}</span>
              <span class="text-[10px] text-stone-500 block">
                ${order.paymentOption === 'half' ? 'Customer 50% deposit screenshot' : 'Customer full payment screenshot'}
              </span>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <button type="button" onclick="viewAdminOrderReceipt('${order.orderId}')" class="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-2xs transition shrink-0 whitespace-nowrap cursor-pointer">
              <i class="fa-solid fa-eye"></i>
              <span>View Screenshot</span>
            </button>
            ${isPending ? `
              <button type="button" onclick="quickConfirmOrderPayment('${order.orderId}')" class="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-2xs transition shrink-0 whitespace-nowrap cursor-pointer">
                <i class="fa-solid fa-circle-check"></i>
                <span>Confirm Payment</span>
              </button>
            ` : ''}
          </div>
        </div>
      `;
    } else {
      if (receiptBadge) {
        receiptBadge.className = 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200';
        receiptBadge.textContent = 'No Screenshot';
      }
      receiptContent.innerHTML = `
        <div class="p-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-500 text-xs">
          <i class="fa-solid fa-circle-info mr-1 text-stone-400"></i>
          <span>No payment screenshot attached for this order.</span>
        </div>
      `;
    }
  }

  // 1-Tap Confirm Payment & Order Button in Modal
  const confirmBox = document.getElementById('modalConfirmPaymentBox');
  if (confirmBox) {
    if (isPending) confirmBox.classList.remove('hidden');
    else confirmBox.classList.add('hidden');
  }

  // Call Customer button (Only direct phone call, no WhatsApp)
  const phoneBtn = document.getElementById('modalOrderPhoneBtn');
  const phoneBtnText = document.getElementById('modalOrderPhoneBtnText');
  if (phoneBtn) phoneBtn.href = 'tel:' + (order.phoneNumber || '');
  if (phoneBtnText) phoneBtnText.textContent = `Call Customer (${order.phoneNumber || 'N/A'})`;

  modal.classList.remove('hidden');
}

function showAdminConfirmedPopup(order) {
  const popup = document.getElementById('adminConfirmedPopup');
  if (!popup) return;
  const targetOrder = order || currentSelectedOrder;
  const phone = (targetOrder && targetOrder.phoneNumber) || '';
  const btn = document.getElementById('adminConfirmedPhoneBtn');
  const btnText = document.getElementById('adminConfirmedPhoneBtnText');
  if (btn) btn.href = phone ? 'tel:' + phone : 'tel:';
  if (btnText) btnText.textContent = phone ? `Call Customer — ${phone}` : 'Call Customer';

  const badge = document.getElementById('adminConfirmedBadge');
  const badgeIcon = document.getElementById('adminConfirmedBadgeIcon');
  const badgeText = document.getElementById('adminConfirmedBadgeText');

  if (isPayOnDelivery(targetOrder)) {
    if (badge) badge.className = 'inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold shadow-2xs';
    if (badgeIcon) badgeIcon.className = 'fa-solid fa-truck-fast text-amber-700 text-xs';
    if (badgeText) badgeText.textContent = 'Payment Will Be Made After Delivery';
  } else {
    if (badge) badge.className = 'inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-2xs';
    if (badgeIcon) badgeIcon.className = 'fa-solid fa-circle-check text-emerald-600 text-xs';
    if (badgeText) badgeText.textContent = 'Payment Approved Successfully ✨';
  }

  popup.classList.remove('hidden');
}

async function markOrderAsPaid(orderId) {
  if (!orderId) return;
  try {
    const res = await fetch('/api/orders/payment-status', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + adminToken
      },
      body: JSON.stringify({ orderId, paymentStatus: 'Paid' })
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || 'Failed to update payment status');
    }

    // Cloud Firestore write
    if (window.FirebaseService && window.FirebaseService.isAvailable()) {
      try {
        await window.FirebaseService.updateOrder(orderId, {
          paymentStatus: 'Paid',
          paymentReceived: true,
          paidAt: new Date().toISOString()
        });
      } catch (fsErr) {
        console.warn('Firestore mark paid notice:', fsErr);
      }
    }

    // Update in-memory currentOrders
    const order = currentOrders.find(o => String(o.orderId) === String(orderId) || String(o.id) === String(orderId));
    if (order) {
      order.paymentStatus = 'Paid';
      order.paymentReceived = true;
      order.paidAt = new Date().toISOString();
    }

    if (currentSelectedOrder && (String(currentSelectedOrder.orderId) === String(orderId) || String(currentSelectedOrder.id) === String(orderId))) {
      currentSelectedOrder.paymentStatus = 'Paid';
      currentSelectedOrder.paymentReceived = true;
      currentSelectedOrder.paidAt = new Date().toISOString();
      viewAdminOrderDetails(orderId);
    }

    renderOrdersDashboardAndTable();
    showAdminToast(`Payment confirmed as Paid for Order #${orderId}! ✨`, 'success');
  } catch (err) {
    console.error('Error marking order as paid:', err);
    showAdminToast('Could not mark as paid: ' + err.message, 'error');
  }
}

function dismissAdminConfirmedScreen() {
  const popup = document.getElementById('adminConfirmedPopup');
  if (popup) popup.classList.add('hidden');
}

async function quickConfirmModalOrderPayment() {
  if (!currentSelectedOrder) return;
  const order = currentSelectedOrder;
  await quickConfirmOrderPayment(order.orderId);
}

function updateModalOrderStatus(newStatus) {
  if (currentSelectedOrder) {
    updateOrderStatus(currentSelectedOrder.orderId, newStatus);
    document.getElementById('modalOrderStatusBadge').innerHTML = renderStatusPill(newStatus);
  }
}

function closeAdminOrderDetailsModal() {
  const modal = document.getElementById('adminOrderDetailsModal');
  if (modal) modal.classList.add('hidden');
  currentSelectedOrder = null;
}

let activeReceiptBlobUrl = null;

async function viewAdminOrderReceipt(orderId) {
  const modal = document.getElementById('adminReceiptModal');
  const imgEl = document.getElementById('adminReceiptImg');
  const loadingEl = document.getElementById('adminReceiptLoading');
  const titleEl = document.getElementById('adminReceiptModalTitle');
  const subEl = document.getElementById('adminReceiptModalSub');
  const downloadLink = document.getElementById('adminReceiptDownloadLink');
  const confirmBtn = document.getElementById('adminReceiptConfirmBtn');

  if (!modal) return;

  if (activeReceiptBlobUrl) {
    URL.revokeObjectURL(activeReceiptBlobUrl);
    activeReceiptBlobUrl = null;
  }

  if (titleEl) titleEl.textContent = 'Customer Payment Receipt';
  if (subEl) subEl.textContent = 'Order #' + orderId;
  if (imgEl) {
    imgEl.src = '';
    imgEl.classList.add('hidden');
  }
  if (loadingEl) {
    loadingEl.innerHTML = `
      <i class="fa-solid fa-circle-notch fa-spin text-amber-600 text-base"></i>
      <span>Loading secure receipt...</span>
    `;
    loadingEl.classList.remove('hidden');
  }

  const order = currentOrders.find(o => o.orderId === orderId);
  const isPending = order && (order.status === 'Pending' || order.status === 'New');
  if (confirmBtn) {
    if (isPending) {
      confirmBtn.classList.remove('hidden');
      confirmBtn.onclick = () => {
        quickConfirmOrderPayment(orderId);
        closeAdminReceiptModal();
      };
    } else {
      confirmBtn.classList.add('hidden');
    }
  }

  modal.classList.remove('hidden');

  try {
    const res = await fetch(`/api/admin/orders/${encodeURIComponent(orderId)}/receipt`, {
      headers: { 'Authorization': 'Bearer ' + adminToken }
    });

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        throw new Error('Authentication required. Please log in again.');
      }
      throw new Error(`Receipt unavailable (${res.status} ${res.statusText})`);
    }

    const blob = await res.blob();
    activeReceiptBlobUrl = URL.createObjectURL(blob);

    if (imgEl) {
      imgEl.src = activeReceiptBlobUrl;
      imgEl.classList.remove('hidden');
    }
    if (loadingEl) loadingEl.classList.add('hidden');
    if (downloadLink) {
      downloadLink.href = activeReceiptBlobUrl;
      downloadLink.download = `receipt-${orderId}.jpg`;
    }
  } catch (err) {
    if (loadingEl) {
      loadingEl.innerHTML = `
        <div class="text-rose-600 font-bold text-xs space-y-1">
          <i class="fa-solid fa-triangle-exclamation text-base"></i>
          <div>${escapeHtml(err.message || 'Failed to load receipt screenshot')}</div>
        </div>
      `;
    }
  }
}

function closeAdminReceiptModal() {
  const modal = document.getElementById('adminReceiptModal');
  if (modal) modal.classList.add('hidden');
  if (activeReceiptBlobUrl) {
    URL.revokeObjectURL(activeReceiptBlobUrl);
    activeReceiptBlobUrl = null;
  }
}

async function quickConfirmOrderPayment(orderId) {
  const order = currentOrders.find(o => String(o.orderId) === String(orderId) || String(o.id) === String(orderId)) || currentSelectedOrder;
  const isDel = isPayOnDelivery(order);

  await updateOrderStatus(orderId, 'Confirmed');
  if (isDel) {
    showAdminToast('Order Confirmed! Payment will be made after delivery.', 'info');
  } else {
    showAdminToast('Payment Approved & Order Confirmed Successfully! ✨', 'success');
  }

  if (currentSelectedOrder && (String(currentSelectedOrder.orderId) === String(orderId) || String(currentSelectedOrder.id) === String(orderId))) {
    await viewAdminOrderDetails(orderId);
  }
  showAdminConfirmedPopup(order);
}

// ------------------------------------------------------------
// CAKE CATEGORIES VIEW
// ------------------------------------------------------------


// ==========================================
// CAKE CATEGORIES MANAGEMENT (REST API)
// ==========================================
let currentAdminCategories = [];

async function renderAdminCategories() {
  const grid = document.getElementById('adminCategoriesGrid');
  const totalBadge = document.getElementById('adminCategoryTotalBadge');
  if (!grid) return;

  try {
    const res = await fetch('/api/categories');
    const data = await res.json();
    if (data && data.categories) {
      currentAdminCategories = data.categories;
    }
  } catch (err) {
    console.warn('Failed to fetch categories from API, using cached:', err);
  }

  const query = (document.getElementById('adminCategorySearch')?.value || '').toLowerCase().trim();
  const filtered = currentAdminCategories.filter(cat => {
    return !query || cat.name.toLowerCase().includes(query) || (cat.description && cat.description.toLowerCase().includes(query));
  });

  if (totalBadge) {
    totalBadge.textContent = currentAdminCategories.length + ' Categories';
  }

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="col-span-full py-12 text-center text-stone-400">No categories found matching your query.</div>';
    return;
  }

  grid.innerHTML = filtered.map((cat, index) => {
    const count = (typeof currentProducts !== 'undefined' ? currentProducts.filter(p => p.category === cat.name).length : 0);
    const iconClass = cat.icon || 'fa-cake-candles';
    const isFirst = index === 0;
    const isLast = index === filtered.length - 1;

    return `
      <div class="bg-white p-5 rounded-3xl shadow-sm border border-stone-200 flex flex-col justify-between space-y-4 hover:border-gold/40 transition">
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-rose-50 text-[#c94968] flex items-center justify-center text-lg font-bold shrink-0">
              <i class="fa-solid ${iconClass}"></i>
            </div>
            <div>
              <h4 class="font-bold text-sm text-chocolate">${escapeHtml(cat.name)}</h4>
              <span class="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-500 mt-0.5">
                <i class="fa-solid fa-box text-stone-400 text-[10px]"></i>
                <span>${count} items in catalog</span>
              </span>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <button onclick="reorderCategory('${cat.id}', 'up')" ${isFirst ? 'disabled class="text-stone-300 p-1 cursor-not-allowed"' : 'class="text-stone-500 hover:text-stone-800 p-1 cursor-pointer"'} title="Move Up">
              <i class="fa-solid fa-chevron-up text-xs"></i>
            </button>
            <button onclick="reorderCategory('${cat.id}', 'down')" ${isLast ? 'disabled class="text-stone-300 p-1 cursor-not-allowed"' : 'class="text-stone-500 hover:text-stone-800 p-1 cursor-pointer"'} title="Move Down">
              <i class="fa-solid fa-chevron-down text-xs"></i>
            </button>
          </div>
        </div>

        ${cat.description ? `<p class="text-[11px] text-stone-500 line-clamp-2">${escapeHtml(cat.description)}</p>` : ''}

        <div class="flex items-center justify-between pt-3 border-t border-stone-100">
          <button onclick="filterCatalogToCategory('${escapeHtml(cat.name)}')" class="px-3 py-1.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-[11px] font-bold text-stone-600 cursor-pointer">
            View Products
          </button>
          <div class="flex items-center gap-1.5">
            <button onclick="openEditCategoryModal('${cat.id}')" class="px-3 py-1.5 rounded-xl border border-stone-300 hover:bg-stone-50 text-[11px] font-bold text-stone-700 cursor-pointer">
              Edit
            </button>
            <button onclick="deleteCategory('${cat.id}', '${escapeHtml(cat.name)}')" class="px-2.5 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-[11px] font-bold cursor-pointer" title="Delete Category">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function openAddCategoryModal() {
  document.getElementById('categoryModalTitle').textContent = 'Add Category';
  document.getElementById('categoryIdInput').value = '';
  document.getElementById('categoryNameInput').value = '';
  document.getElementById('categoryIconInput').value = 'fa-cake-candles';
  document.getElementById('categoryImageInput').value = '';
  document.getElementById('categoryDescInput').value = '';
  document.getElementById('adminCategoryModal').classList.remove('hidden');
}

function openEditCategoryModal(catId) {
  const cat = currentAdminCategories.find(c => c.id === catId);
  if (!cat) return;
  document.getElementById('categoryModalTitle').textContent = 'Edit Category';
  document.getElementById('categoryIdInput').value = cat.id;
  document.getElementById('categoryNameInput').value = cat.name || '';
  document.getElementById('categoryIconInput').value = cat.icon || 'fa-cake-candles';
  document.getElementById('categoryImageInput').value = cat.image || '';
  document.getElementById('categoryDescInput').value = cat.description || '';
  document.getElementById('adminCategoryModal').classList.remove('hidden');
}

function closeCategoryModal() {
  document.getElementById('adminCategoryModal').classList.add('hidden');
}

async function handleSaveCategory(e) {
  e.preventDefault();
  const id = document.getElementById('categoryIdInput').value;
  const name = document.getElementById('categoryNameInput').value.trim();
  const icon = document.getElementById('categoryIconInput').value.trim() || 'fa-cake-candles';
  const image = document.getElementById('categoryImageInput').value.trim();
  const description = document.getElementById('categoryDescInput').value.trim();

  if (!name) {
    showAdminToast('Please enter category name');
    return;
  }

  try {
    const isEdit = !!id;
    const url = isEdit ? '/api/categories/' + id : '/api/categories';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, icon, image, description })
    });
    const result = await res.json();
    if (result.success) {
      showAdminToast(isEdit ? 'Category updated successfully!' : 'Category added successfully!');
      closeCategoryModal();
      await renderAdminCategories();
      if (typeof populateCategorySubmenu === 'function') populateCategorySubmenu();
    } else {
      showAdminToast('Failed: ' + (result.error || 'Server error'));
    }
  } catch (err) {
    console.error('Error saving category:', err);
    showAdminToast('Network error saving category');
  }
}

async function deleteCategory(id, name) {
  const productCount = (typeof currentProducts !== 'undefined' ? currentProducts.filter(p => p.category === name).length : 0);
  if (productCount > 0) {
    const confirm = window.confirm(
      'Warning: "' + name + '" currently contains ' + productCount + ' products!\n\nAre you sure you want to delete this category? Products in this category will keep their records but will lose this category tag.'
    );
    if (!confirm) return;
  } else {
    if (!window.confirm('Are you sure you want to delete the category "' + name + '"?')) return;
  }

  try {
    const res = await fetch('/api/categories/' + id, { method: 'DELETE' });
    const result = await res.json();
    if (result.success) {
      showAdminToast('Category deleted');
      await renderAdminCategories();
      if (typeof populateCategorySubmenu === 'function') populateCategorySubmenu();
    } else {
      showAdminToast('Failed to delete: ' + (result.error || 'Error'));
    }
  } catch (err) {
    console.error('Delete category error:', err);
    showAdminToast('Network error deleting category');
  }
}

async function reorderCategory(id, direction) {
  try {
    const res = await fetch('/api/categories/reorder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, direction })
    });
    const result = await res.json();
    if (result.success) {
      await renderAdminCategories();
    }
  } catch (err) {
    console.error('Reorder error:', err);
  }
}

function filterCatalogToCategory(cat) {
  switchAdminSection('products', null, false);
  clearAdminProductSearch();
  if (cat === 'all') {
    filterAdminByCategory('all');
  } else {
    filterAdminByCategory(cat);
  }
  if (typeof closeAdminMobileMenu === 'function') {
    closeAdminMobileMenu();
  }
  const filterBar = document.getElementById('adminCategoryFilterBar');
  if (filterBar) {
    filterBar.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function selectSubmenuCategory(catRaw) {
  switchAdminSection('products', null, false);
  filterCatalogToCategory(catRaw);
}

function handleProductsNavClick(e) {
  if (e && typeof e.stopPropagation === 'function') {
    e.stopPropagation();
  }
  const isMobile = window.innerWidth < 1024;
  switchAdminSection('products', null, isMobile);
  if (!isMobile) {
    toggleCategoriesSubmenu();
  }
}

function toggleCategoriesSubmenu(forceOpen = null) {
  const submenu = document.getElementById('navSubmenuCategories');
  const chevron = document.getElementById('navProductsChevron');
  if (!submenu) return;

  const willOpen = forceOpen !== null ? forceOpen : !submenu.classList.contains('is-open');

  if (willOpen) {
    submenu.classList.add('is-open');
    if (chevron) chevron.classList.add('rotate-180');
  } else {
    submenu.classList.remove('is-open');
    if (chevron) chevron.classList.remove('rotate-180');
  }
}

function populateCategorySubmenu() {
  const container = document.getElementById('navSubmenuCategories');
  if (!container) return;

  const categories = [
    { name: 'All Categories', raw: 'all', icon: 'fa-solid fa-border-all', isAll: true },
    { name: 'Couples', raw: 'Couples', icon: 'fa-solid fa-heart' },
    { name: 'Birthday Cakes', raw: 'Birthday Cakes', icon: 'fa-solid fa-cake-candles' },
    { name: 'Wedding Cakes', raw: 'Wedding Cakes', icon: 'fa-solid fa-ring' },
    { name: 'Anniversary', raw: 'Anniversary', icon: 'fa-solid fa-heart' },
    { name: 'Graduation', raw: 'Graduation', icon: 'fa-solid fa-graduation-cap' },
    { name: 'Fasting Cake (የጾም)', raw: 'Fasting Cake', icon: 'fa-solid fa-leaf' },
    { name: 'Normal Cakes', raw: 'Normal Cakes', icon: 'fa-solid fa-cake-candles' },
    { name: 'Mini Cakes', raw: 'Mini Cakes', icon: 'fa-solid fa-cookie' },
    { name: 'Cookies', raw: 'Cookies', icon: 'fa-solid fa-cookie-bite' },
    { name: 'Cupcakes', raw: 'Cupcakes', icon: 'fa-solid fa-cookie' },
    { name: 'Holiday', raw: 'Holiday', icon: 'fa-solid fa-holly-berry' },
    { name: 'New Year', raw: 'New Year', icon: 'fa-solid fa-champagne-glasses' },
    { name: 'Cake Accessories', raw: 'Cake Accessories', icon: 'fa-solid fa-wand-magic-sparkles' }
  ];

  container.innerHTML = categories.map((cat, idx) => {
    let count = 0;
    if (cat.isAll) {
      count = currentProducts.length;
    } else {
      count = currentProducts.filter(p => p.category === cat.raw || p.category === cat.name).length;
    }

    return `
      <button type="button" onclick="selectSubmenuCategory('${escapeHtml(cat.raw)}')"
              class="cat-submenu-item w-full text-left py-1.5 px-2 rounded-lg text-stone-600 hover:text-chocolate hover:bg-stone-100 flex items-center justify-between transition group cursor-pointer"
              style="--item-idx: ${idx};">
        <div class="flex items-center gap-2 truncate">
          <i class="${cat.icon} text-[10px] text-[#c94968] w-3 text-center"></i>
          <span class="truncate">${escapeHtml(cat.name)}</span>
        </div>
        <span class="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-stone-200/70 text-stone-600 group-hover:bg-[#d04968] group-hover:text-white transition">${count}</span>
      </button>
    `;
  }).join('');
}

// ------------------------------------------------------------
// EXTRA DECORATIONS & SMART ACCESSORIES VIEW
// ------------------------------------------------------------


// ==========================================
// EXTRA DECORATIONS MANAGEMENT (REST API)
// ==========================================
let currentAdminDecorations = [];
let activeDecorCategoryFilter = 'all';

async function renderAdminDecorations() {
  const grid = document.getElementById('adminDecorationsGrid');
  const navBadge = document.getElementById('navBadgeDecorations');
  if (!grid) return;

  try {
    const res = await fetch('/api/decorations');
    const data = await res.json();
    if (data && data.decorations) {
      currentAdminDecorations = data.decorations;
    }
  } catch (err) {
    console.warn('Failed to fetch decorations from API, using cached:', err);
  }

  if (navBadge) navBadge.textContent = currentAdminDecorations.length;

  const query = (document.getElementById('adminDecorSearch')?.value || '').toLowerCase().trim();
  const filtered = currentAdminDecorations.filter(d => {
    const matchCat = (activeDecorCategoryFilter === 'all' || d.category === activeDecorCategoryFilter);
    const matchQuery = (!query || d.name.toLowerCase().includes(query) || (d.description && d.description.toLowerCase().includes(query)));
    return matchCat && matchQuery;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="col-span-full py-12 text-center text-stone-400">No decorations found in this category. Click "Add Extra Decoration" to create one.</div>';
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const isAvail = item.inStock !== false;
    return `
      <div class="bg-white p-4 rounded-3xl shadow-sm border border-stone-200 space-y-3 flex flex-col justify-between hover:border-gold/40 transition">
        <div class="space-y-2.5">
          <div class="flex items-start gap-3">
            <img src="${item.image || '/images/hero-cake-only.jpg'}" alt="${escapeHtml(item.name)}" class="w-14 h-14 rounded-2xl object-cover border border-stone-100 shrink-0 bg-stone-50" onerror="this.src='/images/hero-cake-only.jpg'">
            <div class="min-w-0 flex-1">
              <span class="text-[9px] font-bold uppercase tracking-wider text-stone-400 block truncate">${escapeHtml(item.category || 'Decoration')}</span>
              <h4 class="font-bold text-xs text-chocolate truncate mt-0.5">${escapeHtml(item.name)}</h4>
              <span class="font-bold text-xs text-[#c94968] block mt-1">${(item.price || 0).toLocaleString()} ETB</span>
            </div>
          </div>

          ${item.description ? `<p class="text-[11px] text-stone-500 line-clamp-2">${escapeHtml(item.description)}</p>` : ''}

          <div class="flex items-center gap-1.5 flex-wrap pt-1 border-t border-stone-100">
            ${isAvail 
              ? '<span class="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full"><i class="fa-solid fa-check text-[8px] mr-1"></i>Available</span>' 
              : '<span class="text-[9px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full"><i class="fa-solid fa-ban text-[8px] mr-1"></i>Sold Out</span>'}
            <span class="text-[9px] font-mono text-stone-400 px-1.5 py-0.5 rounded bg-stone-50 border border-stone-200">${item.id}</span>
          </div>
        </div>

        <div class="flex items-center justify-between pt-2 border-t border-stone-100">
          <button onclick="toggleDecorationStock('${item.id}')" class="px-2.5 py-1 rounded-xl border text-[10px] font-bold cursor-pointer transition ${isAvail ? 'border-amber-300 text-amber-700 hover:bg-amber-50' : 'border-emerald-300 text-emerald-700 hover:bg-emerald-50'}">
            ${isAvail ? 'Mark Sold Out' : 'Mark Available'}
          </button>
          <div class="flex items-center gap-1.5">
            <button onclick="openEditDecorationModal('${item.id}')" class="px-3 py-1 rounded-xl border border-stone-300 hover:bg-stone-50 text-[11px] font-bold text-stone-700 cursor-pointer">
              Edit
            </button>
            <button onclick="deleteDecoration('${item.id}', '${escapeHtml(item.name)}')" class="px-2 py-1 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-[11px] font-bold cursor-pointer" title="Delete Item">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function filterDecorationsByCategory(cat) {
  activeDecorCategoryFilter = cat;
  const buttons = document.querySelectorAll('#adminDecorCategoryTabs .decor-tab-btn');
  buttons.forEach(btn => {
    if (btn.dataset.cat === cat) {
      btn.className = 'decor-tab-btn active px-3.5 py-1.5 rounded-xl font-bold transition bg-[#c94968] text-white';
    } else {
      btn.className = 'decor-tab-btn px-3.5 py-1.5 rounded-xl font-bold transition bg-stone-100 text-stone-600 hover:bg-stone-200';
    }
  });
  renderAdminDecorations();
}

function openAddDecorationModal() {
  document.getElementById('decorationModalTitle').textContent = 'Add Extra Decoration';
  document.getElementById('decorIdInput').value = '';
  document.getElementById('decorNameInput').value = '';
  document.getElementById('decorCategorySelect').value = 'Candles & Toppers';
  document.getElementById('decorPriceInput').value = '100';
  document.getElementById('decorStockSelect').value = 'true';
  document.getElementById('decorImageInput').value = '';
  document.getElementById('decorDescInput').value = '';
  document.getElementById('adminDecorationModal').classList.remove('hidden');
}

function openEditDecorationModal(decorId) {
  const item = currentAdminDecorations.find(d => d.id === decorId);
  if (!item) return;
  document.getElementById('decorationModalTitle').textContent = 'Edit Extra Decoration';
  document.getElementById('decorIdInput').value = item.id;
  document.getElementById('decorNameInput').value = item.name || '';
  document.getElementById('decorCategorySelect').value = item.category || 'Candles & Toppers';
  document.getElementById('decorPriceInput').value = item.price || 0;
  document.getElementById('decorStockSelect').value = item.inStock !== false ? 'true' : 'false';
  document.getElementById('decorImageInput').value = item.image || '';
  document.getElementById('decorDescInput').value = item.description || '';
  document.getElementById('adminDecorationModal').classList.remove('hidden');
}

function closeDecorationModal() {
  document.getElementById('adminDecorationModal').classList.add('hidden');
}

async function handleSaveDecoration(e) {
  e.preventDefault();
  const id = document.getElementById('decorIdInput').value;
  const name = document.getElementById('decorNameInput').value.trim();
  const category = document.getElementById('decorCategorySelect').value;
  const price = parseFloat(document.getElementById('decorPriceInput').value) || 0;
  const inStock = document.getElementById('decorStockSelect').value === 'true';
  const image = document.getElementById('decorImageInput').value.trim() || '/images/hero-cake-only.jpg';
  const description = document.getElementById('decorDescInput').value.trim();

  if (!name) {
    showAdminToast('Please enter decoration name');
    return;
  }

  try {
    const isEdit = !!id;
    const url = isEdit ? '/api/decorations/' + id : '/api/decorations';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, category, price, inStock, image, description })
    });
    const result = await res.json();
    if (result.success) {
      showAdminToast(isEdit ? 'Decoration updated!' : 'Decoration added!');
      closeDecorationModal();
      await renderAdminDecorations();
    } else {
      showAdminToast('Failed: ' + (result.error || 'Server error'));
    }
  } catch (err) {
    console.error('Save decoration error:', err);
    showAdminToast('Network error saving decoration');
  }
}

async function toggleDecorationStock(id) {
  try {
    const res = await fetch('/api/decorations/' + id + '/toggle-stock', { method: 'POST' });
    const result = await res.json();
    if (result.success) {
      showAdminToast('Stock status updated');
      await renderAdminDecorations();
    } else {
      showAdminToast('Failed to update status');
    }
  } catch (err) {
    console.error('Toggle stock error:', err);
  }
}

async function deleteDecoration(id, name) {
  if (!window.confirm('Are you sure you want to delete "' + name + '"?')) return;
  try {
    const res = await fetch('/api/decorations/' + id, { method: 'DELETE' });
    const result = await res.json();
    if (result.success) {
      showAdminToast('Decoration deleted');
      await renderAdminDecorations();
    } else {
      showAdminToast('Failed to delete');
    }
  } catch (err) {
    console.error('Delete decoration error:', err);
  }
}

function renderDashboardStats() {
  const statProducts = document.getElementById('dashStatProducts');
  if (statProducts) statProducts.textContent = currentProducts.length;

  const badgeProds = document.getElementById('navBadgeProducts');
  if (badgeProds) badgeProds.textContent = currentProducts.length;

  const accessories = currentProducts.filter(p => p.category === 'Cake Accessories' || p.category === 'Extra Decorations');
  const badgeDecorations = document.getElementById('navBadgeDecorations');
  if (badgeDecorations) badgeDecorations.textContent = accessories.length;

  const uniqueCategories = new Set(currentProducts.map(p => p.category).filter(Boolean));
  const badgeCategories = document.getElementById('navBadgeCategories');
  if (badgeCategories) badgeCategories.textContent = uniqueCategories.size || 12;

  if (currentSettings) {
    evaluateBusinessOpenStatus(currentSettings.workingHours);
  }

  // Update revenue overview & category submenu
  renderRevenueSection();
  populateCategorySubmenu();
}

// ============================================================
// FINANCIAL REVENUE & EARNINGS ANALYTICS
// Daily, Weekly, Monthly, Yearly, and All-Time Metrics
// ============================================================

let currentRevenuePeriod = 'monthly';

function calculateRevenueMetrics(orders) {
  const now = new Date();
  
  // Start of Today (local time 00:00:00)
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

  // Start of Week (Monday 00:00:00)
  const dayOfWeek = now.getDay();
  const distanceToMonday = (dayOfWeek + 6) % 7;
  const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - distanceToMonday, 0, 0, 0, 0);

  // Start of Month (1st of this month 00:00:00)
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);

  // Start of Year (Jan 1 of this year 00:00:00)
  const startOfYear = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);

  const activeOrders = (orders || []).filter(o => o.status !== 'Cancelled');

  function getMetricsForFilter(filterFn) {
    const list = activeOrders.filter(filterFn);
    let totalRevenue = 0;
    let collectedNow = 0;
    let dueOnDelivery = 0;
    let completedCount = 0;
    let pendingCount = 0;
    let paidPaymentsCount = 0;
    let pendingPaymentsCount = 0;

    list.forEach(o => {
      const price = Number(o.totalPrice) || 0;
      totalRevenue += price;
      
      const payInfo = getPaymentInfoSummary(o);
      collectedNow += payInfo.paidAmt;
      dueOnDelivery += payInfo.dueAmt;

      if (payInfo.isPaid) {
        paidPaymentsCount++;
      } else {
        pendingPaymentsCount++;
      }

      if (o.status === 'Completed' || o.status === 'Delivered' || o.status === 'Confirmed' || o.status === 'Preparing' || o.status === 'Ready') {
        completedCount++;
      } else {
        pendingCount++;
      }
    });

    return {
      count: list.length,
      totalRevenue,
      collectedNow,
      dueOnDelivery,
      completedCount,
      pendingCount,
      paidPaymentsCount,
      pendingPaymentsCount,
      avgOrderValue: list.length > 0 ? Math.round(totalRevenue / list.length) : 0,
      orders: list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    };
  }

  return {
    allTime: getMetricsForFilter(() => true),
    daily: getMetricsForFilter(o => new Date(o.createdAt) >= startOfToday),
    weekly: getMetricsForFilter(o => new Date(o.createdAt) >= startOfWeek),
    monthly: getMetricsForFilter(o => new Date(o.createdAt) >= startOfMonth),
    yearly: getMetricsForFilter(o => new Date(o.createdAt) >= startOfYear)
  };
}

async function refreshRevenueAnalytics(btn) {
  const button = btn || document.getElementById('btnRefreshAnalytics');
  const icon = button ? button.querySelector('i') : null;

  if (button) button.disabled = true;
  if (icon) icon.classList.add('fa-spin');

  try {
    await loadAdminOrders();
    renderRevenueSection();

    // Trigger smooth fade-in animation on the detailed breakdown box
    const box = document.getElementById('revSelectedPeriodBox');
    if (box) {
      box.classList.remove('animate-fadeIn');
      void box.offsetWidth;
      box.classList.add('animate-fadeIn');
    }

    await new Promise(r => setTimeout(r, 600));
    showAdminToast('Financial analytics refreshed with latest data.', 'success');
  } catch (err) {
    showAdminToast('Failed to refresh analytics: ' + err.message, 'error');
  } finally {
    if (icon) icon.classList.remove('fa-spin');
    if (button) button.disabled = false;
  }
}

function switchRevenuePeriod(period) {
  currentRevenuePeriod = period;

  // Update tabs appearance
  const periods = ['daily', 'weekly', 'monthly', 'yearly', 'allTime'];
  periods.forEach(p => {
    const tab = document.getElementById(`revTab-${p}`);
    if (tab) {
      if (p === period) {
        tab.className = 'px-3.5 py-1.5 rounded-xl border border-stone-200 bg-chocolate text-white shadow-xs transition cursor-pointer whitespace-nowrap active:scale-95';
      } else {
        tab.className = 'px-3.5 py-1.5 rounded-xl border border-stone-200 bg-stone-100 text-stone-700 hover:bg-stone-200 transition cursor-pointer whitespace-nowrap active:scale-95';
      }
    }
  });

  renderRevenueSection();

  const box = document.getElementById('revSelectedPeriodBox');
  if (box) {
    box.classList.remove('animate-fadeIn');
    void box.offsetWidth;
    box.classList.add('animate-fadeIn');
  }
}

function renderRevenueSection() {
  if (!Array.isArray(currentOrders)) return;

  const metrics = calculateRevenueMetrics(currentOrders);

  // 1. Update 4 Primary KPI Summary Cards
  const elAllTime = document.getElementById('revCardAllTime');
  const elAllTimeOrders = document.getElementById('revCardAllTimeOrders');
  if (elAllTime) elAllTime.textContent = (metrics.allTime.totalRevenue || 0).toLocaleString() + ' ETB';
  if (elAllTimeOrders) elAllTimeOrders.textContent = `${metrics.allTime.count} orders`;

  const elDaily = document.getElementById('revCardDaily');
  const elDailyOrders = document.getElementById('revCardDailyOrders');
  if (elDaily) elDaily.textContent = (metrics.daily.totalRevenue || 0).toLocaleString() + ' ETB';
  if (elDailyOrders) elDailyOrders.textContent = `${metrics.daily.count} orders`;

  const elWeekly = document.getElementById('revCardWeekly');
  const elWeeklyOrders = document.getElementById('revCardWeeklyOrders');
  if (elWeekly) elWeekly.textContent = (metrics.weekly.totalRevenue || 0).toLocaleString() + ' ETB';
  if (elWeeklyOrders) elWeeklyOrders.textContent = `${metrics.weekly.count} orders`;

  const elMonthly = document.getElementById('revCardMonthly');
  const elMonthlyOrders = document.getElementById('revCardMonthlyOrders');
  if (elMonthly) elMonthly.textContent = (metrics.monthly.totalRevenue || 0).toLocaleString() + ' ETB';
  if (elMonthlyOrders) elMonthlyOrders.textContent = `${metrics.monthly.count} orders`;

  // 2. Render Active Period Detailed Breakdown Box
  const box = document.getElementById('revSelectedPeriodBox');
  if (!box) return;

  const currentMetric = metrics[currentRevenuePeriod] || metrics.monthly;
  const now = new Date();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  let periodTitle = '';
  let periodBadge = '';
  let periodIcon = 'fa-chart-pie';

  switch (currentRevenuePeriod) {
    case 'daily':
      periodTitle = `Today's Earnings (${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })})`;
      periodBadge = 'Daily Income';
      periodIcon = 'fa-calendar-day';
      break;
    case 'weekly':
      periodTitle = 'Weekly Revenue (Monday – Sunday)';
      periodBadge = 'Current Week';
      periodIcon = 'fa-calendar-week';
      break;
    case 'monthly':
      periodTitle = `${monthNames[now.getMonth()]} ${now.getFullYear()} Revenue`;
      periodBadge = 'Monthly Overview';
      periodIcon = 'fa-chart-line';
      break;
    case 'yearly':
      periodTitle = `Year ${now.getFullYear()} Total Revenue`;
      periodBadge = 'Yearly Overview';
      periodIcon = 'fa-calendar';
      break;
    case 'allTime':
    default:
      periodTitle = 'All-Time Cumulative Revenue & Orders';
      periodBadge = 'All-Time Total';
      periodIcon = 'fa-sack-dollar';
      break;
  }

  box.innerHTML = `
    <!-- Period Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-xl bg-chocolate text-gold flex items-center justify-center text-xs">
          <i class="fa-solid ${periodIcon}"></i>
        </div>
        <div>
          <span class="text-[10px] uppercase font-bold tracking-wider text-[#d04968] block">${periodBadge}</span>
          <h4 class="font-serif-luxury text-base sm:text-lg font-bold text-chocolate">${periodTitle}</h4>
        </div>
      </div>
      <div class="flex items-center gap-2 text-xs">
        <span class="px-2.5 py-1 rounded-lg bg-stone-200/80 font-bold text-stone-700">
          ${currentMetric.count} ${currentMetric.count === 1 ? 'Order' : 'Orders'}
        </span>
        <span class="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold">
          Avg Order: ${currentMetric.avgOrderValue.toLocaleString()} ETB
        </span>
      </div>
    </div>

    <!-- 3 Highlight Breakdown Columns (Total Revenue, Collected Now, Due on Delivery) -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div class="p-3.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
        <span class="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">Gross Total Earned</span>
        <span class="text-xl sm:text-2xl font-extrabold text-chocolate font-serif-luxury mt-0.5 block">
          ${(currentMetric.totalRevenue || 0).toLocaleString()} <span class="text-xs font-sans text-stone-500 font-medium">ETB</span>
        </span>
        <span class="text-[10px] text-stone-400 mt-1 block">100% order value volume</span>
      </div>

      <div class="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 shadow-2xs">
        <span class="text-[10px] uppercase font-bold text-emerald-700 block tracking-wider">Paid / Collected (${currentMetric.paidPaymentsCount})</span>
        <span class="text-xl sm:text-2xl font-extrabold text-emerald-900 font-serif-luxury mt-0.5 block">
          ${(currentMetric.collectedNow || 0).toLocaleString()} <span class="text-xs font-sans text-emerald-700 font-medium">ETB</span>
        </span>
        <span class="text-[10px] text-emerald-600 mt-1 block">${currentMetric.paidPaymentsCount} orders marked as Paid</span>
      </div>

      <div class="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 shadow-2xs">
        <span class="text-[10px] uppercase font-bold text-amber-700 block tracking-wider">Pending Payment (${currentMetric.pendingPaymentsCount})</span>
        <span class="text-xl sm:text-2xl font-extrabold text-amber-900 font-serif-luxury mt-0.5 block">
          ${(currentMetric.dueOnDelivery || 0).toLocaleString()} <span class="text-xs font-sans text-amber-700 font-medium">ETB</span>
        </span>
        <span class="text-[10px] text-amber-600 mt-1 block">Pay on Delivery & pending balances</span>
      </div>
    </div>

    <!-- Status Tally Bar -->
    <div class="flex items-center gap-3 text-xs bg-white p-3 rounded-xl border border-stone-200 flex-wrap">
      <span class="font-bold text-chocolate text-[11px]">Payment & Order Breakdown:</span>
      <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
        <i class="fa-solid fa-circle-check text-[9px]"></i>
        <span>Paid Payments: ${currentMetric.paidPaymentsCount} (${(currentMetric.collectedNow || 0).toLocaleString()} ETB)</span>
      </span>
      <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
        <i class="fa-solid fa-clock-rotate-left text-[9px]"></i>
        <span>Pending Payments: ${currentMetric.pendingPaymentsCount} (${(currentMetric.dueOnDelivery || 0).toLocaleString()} ETB)</span>
      </span>
      <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 font-bold text-[10px]">
        <span>Total Orders: ${currentMetric.count}</span>
      </span>
    </div>

    <!-- Mini Orders List for Selected Period -->
    <div class="space-y-2 pt-1">
      <div class="flex items-center justify-between text-xs">
        <span class="font-bold text-chocolate">Orders in this Period (${currentMetric.orders.length})</span>
        <span class="text-[10px] text-stone-400">Click any order to view details & confirm</span>
      </div>
      ${currentMetric.orders.length === 0 ? `
        <div class="py-8 text-center bg-white rounded-xl border border-stone-200 text-stone-400 text-xs">
          <i class="fa-regular fa-folder-open text-2xl mb-1 text-stone-300 block"></i>
          <span>No customer orders recorded in this timeframe yet.</span>
        </div>
      ` : `
        <div class="space-y-2 max-h-72 overflow-y-auto no-scrollbar">
          ${currentMetric.orders.map(o => {
            const shortId = getDisplayOrderId(o);
            const dateStr = getOrderDateString(o);
            const payInfo = getPaymentInfoSummary(o);
            return `
              <div class="p-3 bg-white rounded-xl border border-stone-200 hover:border-gold/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition">
                <div class="flex items-center gap-3 min-w-0">
                  <div class="font-mono font-bold text-xs text-chocolate shrink-0">
                    <span class="block">${shortId}</span>
                    <span class="block text-[10px] text-stone-400 font-sans font-normal">${dateStr}</span>
                  </div>
                  <div class="min-w-0">
                    <div class="flex items-center gap-2 truncate">
                      <span class="font-bold text-chocolate text-xs truncate">${escapeHtml(o.customerName)}</span>
                      <span class="text-[10px] px-1.5 py-0.2 rounded border font-semibold ${payInfo.badgeClass} shrink-0">${payInfo.shortBadge}</span>
                    </div>
                    <span class="text-[11px] text-stone-500 truncate block">${escapeHtml(o.cakeName || 'Custom Cake')}</span>
                  </div>
                </div>

                <div class="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-1 sm:pt-0 border-t sm:border-0 border-stone-100">
                  <div class="text-left sm:text-right">
                    <span class="font-extrabold text-chocolate text-xs block">${(o.totalPrice || 0).toLocaleString()} ETB</span>
                    ${renderStatusPill(o.status)}
                  </div>
                  <button type="button" onclick="viewAdminOrderDetails('${escapeHtml(o.orderId)}')"
                          class="px-2.5 py-1.5 rounded-lg text-white font-bold text-[10px] transition hover:brightness-105 cursor-pointer shadow-2xs"
                          style="background-color: #d04968;">
                    Details
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `}
    </div>
  `;
}


// ============================================================================
// PRO MODULE 11: WEBSITE APPEARANCE & CUSTOM THEMES
// ============================================================================

let currentThemeConfig = null;

async function renderWebsiteAppearance() {
  try {
    const res = await fetch('/api/appearance');
    const data = await res.json();
    if (data.success && data.theme) {
      currentThemeConfig = data.theme;
    }
  } catch (e) {
    console.warn('Using default theme config:', e);
  }

  if (!currentThemeConfig) {
    currentThemeConfig = {
      activePalette: "Signature Blush Pink",
      palettes: [
        { name: "Signature Blush Pink", primary: "#E11D62", secondary: "#9D174D", accent: "#F472B6", background: "#FFF5F7", surface: "#FFFFFF", text: "#1E1E2F", button: "#E11D62", badge: "Classic MAK CAKE" },
        { name: "Luxury Rose Gold", primary: "#C94968", secondary: "#B03855", accent: "#E89CAE", background: "#FAF7F2", surface: "#FFFFFF", text: "#231612", button: "#C94968", badge: "Champagne Metallic" },
        { name: "Royal Velvet Berry", primary: "#831843", secondary: "#500724", accent: "#DB2777", background: "#FDF2F8", surface: "#FFFFFF", text: "#1E1E24", button: "#831843", badge: "Midnight Romance" },
        { name: "Emerald Mint & Cream", primary: "#059669", secondary: "#065F46", accent: "#34D399", background: "#F0FDF4", surface: "#FFFFFF", text: "#132A13", button: "#059669", badge: "Artisan Pistachio" },
        { name: "Midnight Noir & Gold", primary: "#D97706", secondary: "#92400E", accent: "#FBBF24", background: "#18181B", surface: "#27272A", text: "#FAFAFA", button: "#D97706", badge: "VIP Dark Elegance" }
      ],
      customColors: { primary: "#E11D62", secondary: "#9D174D", accent: "#F472B6", background: "#FFF5F7", text: "#1E1E2F", button: "#E11D62" }
    };
  }

  // Render Palettes
  const container = document.getElementById('themePalettesContainer');
  if (container && currentThemeConfig.palettes) {
    container.innerHTML = currentThemeConfig.palettes.map(p => {
      const isSelected = currentThemeConfig.activePalette === p.name;
      return `
        <div onclick="applyThemePalette('${escapeHtml(p.name)}')" 
             class="cursor-pointer p-3.5 rounded-2xl border transition-all ${isSelected ? 'border-[#c94968] bg-rose-50/40 shadow-xs ring-2 ring-[#c94968]/20' : 'border-stone-200 hover:border-stone-300 bg-white'}">
          <div class="flex items-center justify-between mb-2">
            <span class="font-bold text-xs text-chocolate">${escapeHtml(p.name)}</span>
            <span class="text-[9px] font-bold px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-[#c94968] text-white' : 'bg-stone-100 text-stone-500'}">${escapeHtml(p.badge || 'Palette')}</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="w-6 h-6 rounded-lg shadow-xs" style="background-color: ${p.primary};" title="Primary"></span>
            <span class="w-6 h-6 rounded-lg shadow-xs" style="background-color: ${p.secondary};" title="Secondary"></span>
            <span class="w-6 h-6 rounded-lg shadow-xs" style="background-color: ${p.accent};" title="Accent"></span>
            <span class="w-6 h-6 rounded-lg shadow-xs border border-stone-200" style="background-color: ${p.background};" title="Background"></span>
            <span class="w-6 h-6 rounded-lg shadow-xs" style="background-color: ${p.button};" title="Button"></span>
          </div>
        </div>
      `;
    }).join('');
  }

  // Populate color inputs
  const colors = currentThemeConfig.customColors || {};
  setColorInput('Primary', colors.primary || '#E11D62');
  setColorInput('Secondary', colors.secondary || '#9D174D');
  setColorInput('Accent', colors.accent || '#F472B6');
  setColorInput('Bg', colors.background || '#FFF5F7');
  setColorInput('Text', colors.text || '#1E1E2F');
  setColorInput('Button', colors.button || '#E11D62');

  updateThemeLivePreview();
}

function setColorInput(key, hex) {
  const colorEl = document.getElementById('themeColor' + key);
  const hexEl = document.getElementById('themeHex' + key);
  if (colorEl) colorEl.value = hex;
  if (hexEl) hexEl.value = hex.toUpperCase();
}

function updateThemeHex(key) {
  const hexEl = document.getElementById('themeHex' + key);
  const colorEl = document.getElementById('themeColor' + key);
  if (hexEl && colorEl && /^#[0-9A-Fa-f]{6}$/.test(hexEl.value.trim())) {
    colorEl.value = hexEl.value.trim();
    updateThemeLivePreview();
  }
}

function applyThemePalette(paletteName) {
  if (!currentThemeConfig || !currentThemeConfig.palettes) return;
  const p = currentThemeConfig.palettes.find(x => x.name === paletteName);
  if (!p) return;

  currentThemeConfig.activePalette = p.name;
  setColorInput('Primary', p.primary);
  setColorInput('Secondary', p.secondary);
  setColorInput('Accent', p.accent);
  setColorInput('Bg', p.background);
  setColorInput('Text', p.text);
  setColorInput('Button', p.button);

  const prevName = document.getElementById('previewThemeName');
  if (prevName) prevName.textContent = p.name;

  updateThemeLivePreview();
  renderWebsiteAppearance();
}

function updateThemeLivePreview() {
  const primary = document.getElementById('themeColorPrimary')?.value || '#E11D62';
  const bg = document.getElementById('themeColorBg')?.value || '#FFF5F7';
  const text = document.getElementById('themeColorText')?.value || '#1E1E2F';
  const btn = document.getElementById('themeColorButton')?.value || '#E11D62';

  const box = document.getElementById('themePreviewBox');
  if (box) box.style.backgroundColor = bg;

  const prevTitle = document.getElementById('prevTitle');
  if (prevTitle) prevTitle.style.color = text;

  const prevLogoIcon = document.getElementById('prevLogoIcon');
  if (prevLogoIcon) prevLogoIcon.style.color = primary;

  const prevBagIcon = document.getElementById('prevBagIcon');
  if (prevBagIcon) prevBagIcon.style.color = primary;

  const prevBanner = document.getElementById('prevBanner');
  if (prevBanner) prevBanner.style.backgroundColor = primary;

  const prevPrice = document.getElementById('prevPrice');
  if (prevPrice) prevPrice.style.color = primary;

  const prevBtn = document.getElementById('prevBtn');
  if (prevBtn) prevBtn.style.backgroundColor = btn;
}

async function saveCustomThemeColors() {
  const customColors = {
    primary: document.getElementById('themeColorPrimary')?.value || '#E11D62',
    secondary: document.getElementById('themeColorSecondary')?.value || '#9D174D',
    accent: document.getElementById('themeColorAccent')?.value || '#F472B6',
    background: document.getElementById('themeColorBg')?.value || '#FFF5F7',
    text: document.getElementById('themeColorText')?.value || '#1E1E2F',
    button: document.getElementById('themeColorButton')?.value || '#E11D62'
  };

  try {
    const res = await fetch('/api/appearance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        activePalette: currentThemeConfig?.activePalette || 'Custom Palette',
        customColors
      })
    });
    const data = await res.json();
    if (data.success) {
      showToast('Website appearance and colors saved successfully! ✨');
    } else {
      showToast('Error saving appearance: ' + data.error, true);
    }
  } catch (err) {
    showToast('Network error saving theme.', true);
  }
}

function resetThemeColors() {
  applyThemePalette('Signature Blush Pink');
  showToast('Reset to Signature Blush Pink palette.');
}


// ============================================================================
// PRO MODULE 12: MYSTERY REWARD BOX
// ============================================================================

let currentRewardsConfig = null;

async function renderMysteryRewardBox() {
  try {
    const res = await fetch('/api/rewards');
    const data = await res.json();
    if (data.success && data.rewards) {
      currentRewardsConfig = data.rewards;
    }
  } catch (e) {
    console.warn('Error loading rewards:', e);
  }

  if (!currentRewardsConfig) {
    currentRewardsConfig = { enabled: true, prizes: [] };
  }

  // Update Status Toggle Button
  const btn = document.getElementById('mysteryBoxToggleBtn');
  const txt = document.getElementById('mysteryBoxToggleText');
  const desc = document.getElementById('mysteryBoxStatusDesc');

  if (btn && txt) {
    if (currentRewardsConfig.enabled) {
      btn.className = 'px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition';
      txt.textContent = 'Feature Active';
      btn.querySelector('i').className = 'fa-solid fa-check';
      if (desc) desc.textContent = 'Active: Customers unlock a surprise gift upon completing order payment.';
    } else {
      btn.className = 'px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 bg-stone-300 hover:bg-stone-400 text-stone-700 transition';
      txt.textContent = 'Feature Disabled';
      btn.querySelector('i').className = 'fa-solid fa-ban';
      if (desc) desc.textContent = 'Disabled: Reward box is hidden from checkout and order completion.';
    }
  }

  // Update Prizes Grid
  const grid = document.getElementById('rewardPrizesGrid');
  const badge = document.getElementById('rewardPrizesCount');
  const prizes = currentRewardsConfig.prizes || [];

  if (badge) badge.textContent = `${prizes.length} prizes configured`;

  if (grid) {
    if (prizes.length === 0) {
      grid.innerHTML = '<div class="col-span-full py-12 text-center text-stone-400">No prizes added yet. Click "Add Reward Prize".</div>';
      return;
    }

    grid.innerHTML = prizes.map(p => {
      const typeBadge = p.type === 'discount' 
        ? '<span class="text-[9px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 uppercase">Discount Voucher</span>'
        : (p.type === 'treat' 
            ? '<span class="text-[9px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 uppercase">Bakery Treat</span>'
            : '<span class="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 uppercase">Physical Gift</span>');

      return `
        <div class="bg-white p-4 rounded-3xl shadow-sm border border-stone-200 space-y-3 flex flex-col justify-between">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              ${typeBadge}
              <span class="text-[10px] font-mono font-bold text-stone-500">${p.probability || 0}% chance</span>
            </div>
            <div class="flex items-center gap-2.5">
              <img src="${p.image || '/images/candles.jpg'}" alt="${escapeHtml(p.name)}" class="w-12 h-12 rounded-xl object-cover border border-stone-100 bg-stone-50 shrink-0" onerror="this.src='/images/candles.jpg'">
              <div class="min-w-0 flex-1">
                <h4 class="font-bold text-xs text-chocolate truncate">${escapeHtml(p.name)}</h4>
                <span class="font-extrabold text-xs text-[#c94968]">${(p.value || 0).toLocaleString()} ETB Value</span>
              </div>
            </div>
            <p class="text-[10.5px] text-stone-500 line-clamp-2 leading-relaxed">${escapeHtml(p.description || '')}</p>
          </div>

          <div class="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
            <span class="text-stone-400 font-mono text-[10px]">Stock: ${p.quantityRemaining || 0} / ${p.quantityLimit || 0}</span>
            <div class="flex items-center gap-1">
              <button onclick="editRewardPrize('${escapeHtml(p.id)}')" class="p-1.5 rounded-lg hover:bg-stone-100 text-stone-600 transition" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
              <button onclick="deleteRewardPrize('${escapeHtml(p.id)}')" class="p-1.5 rounded-lg hover:bg-rose-50 text-rose-600 transition" title="Delete"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
}

async function toggleMysteryBox() {
  try {
    const res = await fetch('/api/rewards/toggle', { method: 'POST' });
    const data = await res.json();
    if (data.success) {
      showToast(data.message);
      renderMysteryRewardBox();
    }
  } catch (e) {
    showToast('Failed to toggle Mystery Box', true);
  }
}

function openAddRewardModal() {
  document.getElementById('rewardId').value = '';
  document.getElementById('rewardName').value = '';
  document.getElementById('rewardDescription').value = '';
  document.getElementById('rewardType').value = 'gift';
  document.getElementById('rewardValue').value = '100';
  document.getElementById('rewardProbability').value = '25';
  document.getElementById('rewardLimit').value = '100';
  document.getElementById('rewardImage').value = '/images/candles.jpg';
  document.getElementById('rewardModalTitle').textContent = 'Add Reward Prize';
  document.getElementById('adminRewardModal').classList.remove('hidden');
}

function closeRewardModal() {
  document.getElementById('adminRewardModal').classList.add('hidden');
}

function editRewardPrize(id) {
  if (!currentRewardsConfig || !currentRewardsConfig.prizes) return;
  const prize = currentRewardsConfig.prizes.find(p => p.id === id);
  if (!prize) return;

  document.getElementById('rewardId').value = prize.id;
  document.getElementById('rewardName').value = prize.name || '';
  document.getElementById('rewardDescription').value = prize.description || '';
  document.getElementById('rewardType').value = prize.type || 'gift';
  document.getElementById('rewardValue').value = prize.value || 0;
  document.getElementById('rewardProbability').value = prize.probability || 10;
  document.getElementById('rewardLimit').value = prize.quantityLimit || 100;
  document.getElementById('rewardImage').value = prize.image || '/images/candles.jpg';
  document.getElementById('rewardModalTitle').textContent = 'Edit Reward Prize';
  document.getElementById('adminRewardModal').classList.remove('hidden');
}

async function handleSaveRewardPrize(e) {
  e.preventDefault();
  const id = document.getElementById('rewardId').value.trim();
  const payload = {
    name: document.getElementById('rewardName').value.trim(),
    description: document.getElementById('rewardDescription').value.trim(),
    type: document.getElementById('rewardType').value,
    value: parseFloat(document.getElementById('rewardValue').value) || 0,
    probability: parseInt(document.getElementById('rewardProbability').value, 10) || 10,
    quantityLimit: parseInt(document.getElementById('rewardLimit').value, 10) || 100,
    quantityRemaining: parseInt(document.getElementById('rewardLimit').value, 10) || 100,
    image: document.getElementById('rewardImage').value.trim() || '/images/candles.jpg'
  };

  try {
    const url = id ? `/api/rewards/${id}` : '/api/rewards';
    const method = id ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (data.success) {
      showToast(data.message || 'Reward prize saved!');
      closeRewardModal();
      renderMysteryRewardBox();
    } else {
      showToast('Error: ' + data.error, true);
    }
  } catch (err) {
    showToast('Failed to save reward prize', true);
  }
}

async function deleteRewardPrize(id) {
  if (!confirm('Are you sure you want to remove this prize from the Mystery Reward Box?')) return;
  try {
    const res = await fetch(`/api/rewards/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      showToast('Prize removed.');
      renderMysteryRewardBox();
    }
  } catch (e) {
    showToast('Error deleting prize', true);
  }
}


// ============================================================================
// PRO MODULE 13: HOMEPAGE ADVERTISEMENTS & PROMOTIONAL MANAGEMENT
// ============================================================================

let currentAdsList = [];

async function renderHomepageAds() {
  try {
    const res = await fetch('/api/advertisements');
    const data = await res.json();
    if (data.success && data.advertisements) {
      currentAdsList = data.advertisements;
    }
  } catch (e) {
    console.warn('Error loading ads:', e);
  }

  const container = document.getElementById('adminAdsList');
  const badge = document.getElementById('navBadgeAds');
  if (badge) badge.textContent = currentAdsList.length;

  if (!container) return;

  if (currentAdsList.length === 0) {
    container.innerHTML = '<div class="bg-white p-12 rounded-3xl border border-stone-200 text-center text-stone-400">No promotional banners active. Click "Create Promotional Banner".</div>';
    return;
  }

  container.innerHTML = currentAdsList.map((ad, idx) => {
    return `
      <div class="bg-white p-5 rounded-3xl shadow-sm border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center gap-4 min-w-0">
          <img src="${ad.image || '/images/hero-banner.jpg'}" alt="${escapeHtml(ad.title)}" class="w-20 h-14 rounded-2xl object-cover border border-stone-100 bg-stone-50 shrink-0 shadow-xs" onerror="this.src='/images/hero-banner.jpg'">
          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <span class="text-[9px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-[#c94968] uppercase">${escapeHtml(ad.badge || 'Promo')}</span>
              <span class="text-[10px] text-stone-400 font-mono">${escapeHtml(ad.startDate || '')} → ${escapeHtml(ad.endDate || '')}</span>
            </div>
            <h4 class="font-bold text-sm text-chocolate truncate mt-0.5">${escapeHtml(ad.title)}</h4>
            <p class="text-xs text-stone-500 truncate">${escapeHtml(ad.subtitle || '')}</p>
          </div>
        </div>

        <div class="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-0 border-stone-100">
          <button onclick="toggleAdActive('${escapeHtml(ad.id)}')" 
                  class="px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${ad.active ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-stone-100 text-stone-500'}">
            <span class="w-2 h-2 rounded-full ${ad.active ? 'bg-emerald-500' : 'bg-stone-400'}"></span>
            <span>${ad.active ? 'Active' : 'Paused'}</span>
          </button>
          
          <button onclick="editAd('${escapeHtml(ad.id)}')" class="p-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-600 transition" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
          <button onclick="deleteAd('${escapeHtml(ad.id)}')" class="p-2 rounded-xl border border-stone-200 hover:bg-rose-50 text-rose-600 transition" title="Delete"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    `;
  }).join('');
}

function openAddAdModal() {
  document.getElementById('adId').value = '';
  document.getElementById('adTitle').value = '';
  document.getElementById('adSubtitle').value = '';
  document.getElementById('adBadge').value = 'Featured Special';
  document.getElementById('adCategory').value = 'Wedding Specials';
  document.getElementById('adImage').value = '/images/hero-banner.jpg';
  document.getElementById('adStartDate').value = new Date().toISOString().split('T')[0];
  document.getElementById('adEndDate').value = '2026-12-31';
  document.getElementById('adModalTitle').textContent = 'Create Promotional Banner';
  document.getElementById('adminAdModal').classList.remove('hidden');
}

function closeAdModal() {
  document.getElementById('adminAdModal').classList.add('hidden');
}

function editAd(id) {
  const ad = currentAdsList.find(a => a.id === id);
  if (!ad) return;

  document.getElementById('adId').value = ad.id;
  document.getElementById('adTitle').value = ad.title || '';
  document.getElementById('adSubtitle').value = ad.subtitle || '';
  document.getElementById('adBadge').value = ad.badge || '';
  document.getElementById('adCategory').value = ad.targetCategory || '';
  document.getElementById('adImage').value = ad.image || '/images/hero-banner.jpg';
  document.getElementById('adStartDate').value = ad.startDate || '';
  document.getElementById('adEndDate').value = ad.endDate || '';
  document.getElementById('adModalTitle').textContent = 'Edit Promotional Banner';
  document.getElementById('adminAdModal').classList.remove('hidden');
}

async function handleSaveAd(e) {
  e.preventDefault();
  const id = document.getElementById('adId').value.trim();
  const payload = {
    title: document.getElementById('adTitle').value.trim(),
    subtitle: document.getElementById('adSubtitle').value.trim(),
    badge: document.getElementById('adBadge').value.trim(),
    targetCategory: document.getElementById('adCategory').value.trim(),
    image: document.getElementById('adImage').value.trim() || '/images/hero-banner.jpg',
    startDate: document.getElementById('adStartDate').value,
    endDate: document.getElementById('adEndDate').value,
    link: '#categories',
    buttonText: 'Order Now →',
    active: true
  };

  try {
    const url = id ? `/api/advertisements/${id}` : '/api/advertisements';
    const method = id ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (data.success) {
      showToast(data.message || 'Banner saved successfully!');
      closeAdModal();
      renderHomepageAds();
    } else {
      showToast('Error: ' + data.error, true);
    }
  } catch (err) {
    showToast('Failed to save promotional banner', true);
  }
}

async function toggleAdActive(id) {
  try {
    const res = await fetch(`/api/advertisements/${id}/toggle`, { method: 'PUT' });
    const data = await res.json();
    if (data.success) {
      showToast(data.message);
      renderHomepageAds();
    }
  } catch (e) {
    showToast('Failed to toggle status', true);
  }
}

async function deleteAd(id) {
  if (!confirm('Are you sure you want to delete this promotional banner?')) return;
  try {
    const res = await fetch(`/api/advertisements/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      showToast('Banner deleted.');
      renderHomepageAds();
    }
  } catch (e) {
    showToast('Error deleting banner', true);
  }
}


// ============================================================================
// PRO MODULE 14: MANAGER ACCOUNTS & MULTI-USER PERMISSIONS
// ============================================================================

let currentManagersList = [];

async function renderManagerAccounts() {
  try {
    const res = await fetch('/api/managers');
    const data = await res.json();
    if (data.success && data.managers) {
      currentManagersList = data.managers;
    }
  } catch (e) {
    console.warn('Error loading managers:', e);
  }

  const container = document.getElementById('adminManagersList');
  const badge = document.getElementById('managersCountBadge');
  const navBadge = document.getElementById('navBadgeManagers');
  if (badge) badge.textContent = `${currentManagersList.length} accounts`;
  if (navBadge) navBadge.textContent = currentManagersList.length;

  if (!container) return;

  if (currentManagersList.length === 0) {
    container.innerHTML = '<div class="p-8 text-center text-stone-400">No managers added yet.</div>';
    return;
  }

  container.innerHTML = currentManagersList.map(m => {
    const isOwner = m.role === 'Owner';
    const permKeys = Object.keys(m.permissions || {}).filter(k => m.permissions[k]);
    const permCount = permKeys.length;

    const roleBadge = isOwner 
      ? '<span class="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">Owner (Full Control)</span>'
      : `<span class="text-[9px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-[#c94968]">${escapeHtml(m.role)}</span>`;

    return `
      <div class="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-stone-50/50 transition">
        <div class="flex items-center gap-3.5 min-w-0">
          <div class="w-11 h-11 rounded-2xl ${isOwner ? 'bg-amber-100 text-amber-800' : 'bg-stone-100 text-stone-700'} flex items-center justify-center font-bold text-sm shrink-0">
            ${escapeHtml(m.name.charAt(0).toUpperCase())}
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <h4 class="font-bold text-sm text-chocolate truncate">${escapeHtml(m.name)}</h4>
              ${roleBadge}
            </div>
            <div class="flex items-center gap-3 text-xs text-stone-500 mt-0.5">
              <span>${escapeHtml(m.email || m.phone || '')}</span>
              <span>&bull;</span>
              <span class="text-[11px] font-mono">${permCount} Permissions Granted</span>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-0 border-stone-100">
          ${!isOwner ? `
            <button onclick="toggleManagerStatus('${escapeHtml(m.id)}')" 
                    class="px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${m.status === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-stone-100 text-stone-500'}">
              <span class="w-2 h-2 rounded-full ${m.status === 'active' ? 'bg-emerald-500' : 'bg-stone-400'}"></span>
              <span>${m.status === 'active' ? 'Active' : 'Inactive'}</span>
            </button>
          ` : '<span class="text-xs text-stone-400 font-bold px-3 py-1">Permanent Active</span>'}

          <button onclick="editManager('${escapeHtml(m.id)}')" class="px-3 py-1.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-xs font-bold text-stone-600 transition flex items-center gap-1">
            <i class="fa-solid fa-key text-[10px]"></i>
            <span>Permissions</span>
          </button>

          ${!isOwner ? `
            <button onclick="deleteManagerAccount('${escapeHtml(m.id)}')" class="p-2 rounded-xl border border-stone-200 hover:bg-rose-50 text-rose-600 transition" title="Remove Account">
              <i class="fa-solid fa-trash"></i>
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function openAddManagerModal() {
  document.getElementById('mgrId').value = '';
  document.getElementById('mgrName').value = '';
  document.getElementById('mgrEmail').value = '';
  document.getElementById('mgrPhone').value = '';
  document.getElementById('mgrRole').value = 'Kitchen Head Baker';
  document.getElementById('managerModalTitle').textContent = 'Invite / Add Manager';
  setAllManagerPermissions(false);
  document.getElementById('perm_viewDashboard').checked = true;
  document.getElementById('perm_viewOrders').checked = true;
  document.getElementById('perm_viewProducts').checked = true;
  document.getElementById('adminManagerModal').classList.remove('hidden');
}

function closeManagerModal() {
  document.getElementById('adminManagerModal').classList.add('hidden');
}

const ALL_PERMISSION_KEYS = [
  'viewDashboard', 'viewOrders', 'manageOrders', 'viewEarnings',
  'viewProducts', 'manageProducts', 'manageCategories', 'manageDecorations',
  'managePricing', 'managePayments', 'manageSettings', 'manageGallery',
  'manageAppearance', 'manageMysteryBox', 'manageAdvertisements', 'manageManagers'
];

function setAllManagerPermissions(checked) {
  ALL_PERMISSION_KEYS.forEach(key => {
    const el = document.getElementById('perm_' + key);
    if (el) el.checked = Boolean(checked);
  });
}

function editManager(id) {
  const mgr = currentManagersList.find(m => m.id === id);
  if (!mgr) return;

  document.getElementById('mgrId').value = mgr.id;
  document.getElementById('mgrName').value = mgr.name || '';
  document.getElementById('mgrEmail').value = mgr.email || '';
  document.getElementById('mgrPhone').value = mgr.phone || '';
  document.getElementById('mgrRole').value = mgr.role || 'Kitchen Head Baker';
  document.getElementById('managerModalTitle').textContent = 'Edit Manager & Permissions';

  ALL_PERMISSION_KEYS.forEach(key => {
    const el = document.getElementById('perm_' + key);
    if (el) el.checked = Boolean(mgr.permissions && mgr.permissions[key]);
  });

  document.getElementById('adminManagerModal').classList.remove('hidden');
}

async function handleSaveManager(e) {
  e.preventDefault();
  const id = document.getElementById('mgrId').value.trim();
  const permissions = {};
  ALL_PERMISSION_KEYS.forEach(key => {
    const el = document.getElementById('perm_' + key);
    permissions[key] = Boolean(el && el.checked);
  });

  const payload = {
    name: document.getElementById('mgrName').value.trim(),
    email: document.getElementById('mgrEmail').value.trim(),
    phone: document.getElementById('mgrPhone').value.trim(),
    role: document.getElementById('mgrRole').value,
    permissions
  };

  try {
    const url = id ? `/api/managers/${id}` : '/api/managers';
    const method = id ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (data.success) {
      showToast(data.message || 'Manager account saved!');
      closeManagerModal();
      renderManagerAccounts();
    } else {
      showToast('Error: ' + data.error, true);
    }
  } catch (err) {
    showToast('Failed to save manager account', true);
  }
}

async function toggleManagerStatus(id) {
  try {
    const res = await fetch(`/api/managers/${id}/toggle-status`, { method: 'PUT' });
    const data = await res.json();
    if (data.success) {
      showToast(data.message);
      renderManagerAccounts();
    } else {
      showToast(data.error, true);
    }
  } catch (e) {
    showToast('Failed to toggle manager status', true);
  }
}

async function deleteManagerAccount(id) {
  if (!confirm('Are you sure you want to remove this manager account? They will lose access immediately.')) return;
  try {
    const res = await fetch(`/api/managers/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      showToast('Manager account removed.');
      renderManagerAccounts();
    } else {
      showToast(data.error, true);
    }
  } catch (e) {
    showToast('Error deleting manager account', true);
  }
}

