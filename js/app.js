/**
 * MAK CAKE — Client Side Application
 * Cake Showcase, Dynamic Pricing, Gallery Filtering, and Online Ordering
 */

// Global State
let allCakes = [];
let selectedCakeForOrder = null;
let publicCreations = [];
let currentLightboxIndex = 0;
let showAllCreations = false;
let favoriteCakeIds = [];

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initFavorites();
  setupNavigation();
  fetchProducts();
  fetchCreations();
  setupOrderFormListeners();
  setDefaultOrderDate();
  fetchBusinessSettings();
  updateMyOrdersCountBadge();
  fetchAppearanceTheme();
  fetchDecorationsCatalog();
});

// ============================================================
// STOREFRONT THEME & DECORATIONS API INTEGRATION
// ============================================================
let apiDecorationsList = [];

async function fetchDecorationsCatalog() {
  try {
    const res = await fetch('/api/decorations');
    const data = await res.json();
    if (data && data.decorations && Array.isArray(data.decorations)) {
      apiDecorationsList = data.decorations;
      console.log('Loaded ' + apiDecorationsList.length + ' decorations from /api/decorations');
    }
  } catch (err) {
    console.warn('Could not fetch /api/decorations:', err);
  }
}

async function fetchAppearanceTheme() {
  try {
    const res = await fetch('/api/appearance');
    const data = await res.json();
    if (data && data.theme) {
      applyThemeToStorefront(data.theme);
    }
  } catch (err) {
    console.warn('Could not fetch /api/appearance:', err);
  }
}

function applyThemeToStorefront(theme) {
  if (!theme) return;
  const root = document.documentElement;
  if (theme.primaryColor) {
    root.style.setProperty('--theme-primary', theme.primaryColor);
    root.style.setProperty('--primary-pink', theme.primaryColor);
  }
  if (theme.accentColor) {
    root.style.setProperty('--theme-accent', theme.accentColor);
    root.style.setProperty('--accent-pink', theme.accentColor);
  }
  if (theme.backgroundColor) {
    root.style.setProperty('--theme-bg', theme.backgroundColor);
  }
  if (theme.fontFamily) {
    root.style.setProperty('--theme-font', theme.fontFamily);
  }
}


// ============================================================
// FAVORITES SYSTEM (PERSISTENT & INTERACTIVE)
// ============================================================

function initFavorites() {
  try {
    const saved = localStorage.getItem('mak_cake_favorites');
    favoriteCakeIds = saved ? JSON.parse(saved) : [];
    if (!Array.isArray(favoriteCakeIds)) favoriteCakeIds = [];
  } catch (e) {
    favoriteCakeIds = [];
  }
  updateFavoriteBadges();
}

function updateFavoriteBadges() {
  const count = favoriteCakeIds.length;
  const navBadge = document.getElementById('navFavBadge');
  const navBadgeMobile = document.getElementById('navFavBadgeMobile');
  const filterBadge = document.getElementById('favFilterCounterBadge');

  if (navBadge) {
    navBadge.textContent = count;
    navBadge.classList.toggle('hidden', count === 0);
  }
  if (navBadgeMobile) {
    navBadgeMobile.textContent = count;
    navBadgeMobile.classList.toggle('hidden', count === 0);
  }
  if (filterBadge) {
    filterBadge.textContent = count;
  }
}

function isFavorite(cakeId) {
  return favoriteCakeIds.includes(cakeId);
}

function toggleFavorite(cakeId, event = window.event) {
  const idx = favoriteCakeIds.indexOf(cakeId);
  const cake = allCakes.find(c => c.id === cakeId);
  const cakeName = cake ? cake.name : 'Cake';

  let added = false;
  if (idx === -1) {
    favoriteCakeIds.push(cakeId);
    added = true;
    showFavToast(`Added "${cakeName}" to Favorites ❤️`, true);
  } else {
    favoriteCakeIds.splice(idx, 1);
    showFavToast(`Removed "${cakeName}" from Favorites`, false);
  }

  try {
    localStorage.setItem('mak_cake_favorites', JSON.stringify(favoriteCakeIds));
  } catch (e) {}

  updateFavoriteBadges();

  // If added to favorites, trigger the flying love heart parabolic arc animation to the top Favorites section!
  if (added) {
    let sourceEl = null;
    if (event && (event.currentTarget || event.target)) {
      sourceEl = event.currentTarget || event.target.closest('button');
    }
    if (!sourceEl) {
      sourceEl = document.getElementById(`fav-card-${cakeId}`);
    }
    if (!sourceEl) {
      sourceEl = document.getElementById('detailModalFavBtn');
    }
    if (sourceEl) {
      animateFlyingHeartToFavorites(sourceEl);
    }
  }

  // Update heart icon on card
  const cardBtn = document.getElementById(`fav-card-${cakeId}`);
  if (cardBtn) {
    cardBtn.innerHTML = added
      ? '<i class="fa-solid fa-heart text-[#c94968] heart-pop text-xs sm:text-sm"></i>'
      : '<i class="fa-regular fa-heart text-stone-400 hover:text-[#c94968] text-xs sm:text-sm"></i>';
    cardBtn.title = added ? 'Remove from Favorites' : 'Save to Favorites';
  }

  // Update heart icon in Detail Modal if open on this cake
  const detailCake = currentActiveCakesList[currentDetailCakeIndex];
  if (detailCake && detailCake.id === cakeId) {
    updateDetailModalFavState(added);
  }

  // If currently filtering by Favorites category, live re-render gallery
  const activePill = document.querySelector('.category-pill.active');
  if (activePill && activePill.dataset.category === 'Favorites') {
    const favCakes = allCakes.filter(c => favoriteCakeIds.includes(c.id));
    renderGalleryCakes(favCakes);
  }
}

// Animate floating love heart in a parabolic arc to the Favorites section on top
function animateFlyingHeartToFavorites(sourceEl) {
  if (!sourceEl) return;

  // 1. Determine target element (favorites pill in filter bar or sticky top nav)
  const filterBtn = document.getElementById('favFilterBtn');
  const navBtn = window.innerWidth < 768
    ? document.getElementById('navFavBadgeMobile')
    : document.getElementById('navFavBadge');

  let targetEl = filterBtn;
  if (filterBtn) {
    const rect = filterBtn.getBoundingClientRect();
    // If filterBtn is scrolled above or out of view, use sticky top nav heart
    if (rect.bottom < 50 || rect.top > window.innerHeight) {
      targetEl = navBtn || filterBtn;
    }
  } else {
    targetEl = navBtn;
  }

  if (!targetEl) return;

  // 2. Get start & end center coordinates
  const startRect = sourceEl.getBoundingClientRect();
  const targetRect = targetEl.getBoundingClientRect();

  const startX = startRect.left + startRect.width / 2;
  const startY = startRect.top + startRect.height / 2;

  const endX = targetRect.left + targetRect.width / 2;
  const endY = targetRect.top + targetRect.height / 2;

  const dx = endX - startX;
  const dy = endY - startY;
  const dist = Math.hypot(dx, dy);

  // Parabolic peak height: bends upward gracefully
  const arcPeak = Math.max(90, Math.min(260, dist * 0.38 + 40));
  const controlY = Math.min(startY, endY) - arcPeak;
  const controlX = startX + dx * 0.5 - (dx > 0 ? 25 : -25);

  // 3. Create the flying love heart element
  const flyingHeart = document.createElement('div');
  flyingHeart.className = 'flying-fav-heart';
  flyingHeart.innerHTML = '<i class="fa-solid fa-heart"></i>';
  flyingHeart.style.left = '0px';
  flyingHeart.style.top = '0px';
  document.body.appendChild(flyingHeart);

  const duration = Math.max(680, Math.min(950, dist * 0.9 + 500)); // 680ms - 950ms based on distance
  const startTime = performance.now();
  let lastSparkleTime = 0;

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing: smooth ease-in-out quadratic
    const t = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    // Quadratic Bézier curve: B(t) = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
    const oneMinusT = 1 - t;
    const currentX = oneMinusT * oneMinusT * startX + 2 * oneMinusT * t * controlX + t * t * endX;
    const currentY = oneMinusT * oneMinusT * startY + 2 * oneMinusT * t * controlY + t * t * endY;

    // Scale: starts normal, expands mid-flight, shrinks as it dives into the target
    const scale = 1 + Math.sin(progress * Math.PI) * 0.55 - (progress > 0.8 ? (progress - 0.8) * 1.5 : 0);
    // Subtle tilt along flight direction
    const rot = Math.sin(progress * Math.PI * 2) * 22;

    flyingHeart.style.transform = `translate3d(${currentX - 12}px, ${currentY - 12}px, 0) scale(${Math.max(0.4, scale)}) rotate(${rot}deg)`;

    // Spawn tiny trailing glitter/sparkle particles every 75ms
    if (elapsed - lastSparkleTime > 75 && progress < 0.88) {
      lastSparkleTime = elapsed;
      createTrailSparkle(currentX, currentY);
    }

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      // Landed!
      flyingHeart.remove();
      onHeartLanded(targetEl, endX, endY);
    }
  }

  requestAnimationFrame(step);
}

// Sparkle trail behind flying heart
function createTrailSparkle(x, y) {
  const sparkle = document.createElement('div');
  sparkle.className = 'fav-sparkle-particle';
  const symbols = ['✨', '💖', '⭐', '💕', '✨'];
  sparkle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  sparkle.style.left = `${x - 6 + (Math.random() * 12 - 6)}px`;
  sparkle.style.top = `${y - 6 + (Math.random() * 12 - 6)}px`;
  sparkle.style.fontSize = `${Math.floor(Math.random() * 6 + 10)}px`;
  sparkle.style.opacity = '0.9';
  sparkle.style.transform = 'scale(1)';
  document.body.appendChild(sparkle);

  requestAnimationFrame(() => {
    sparkle.style.opacity = '0';
    sparkle.style.transform = `translateY(${Math.random() * 12 - 4}px) scale(0.4)`;
    setTimeout(() => sparkle.remove(), 400);
  });
}

// Celebration burst when heart hits the target
function onHeartLanded(targetEl, x, y) {
  // Target pulse animation
  targetEl.classList.remove('fav-landing-pulse');
  void targetEl.offsetWidth; // trigger reflow
  targetEl.classList.add('fav-landing-pulse');

  // Trigger bounce on badges
  const navBadge = document.getElementById('navFavBadge');
  const navBadgeMobile = document.getElementById('navFavBadgeMobile');
  const filterBadge = document.getElementById('favFilterCounterBadge');
  [navBadge, navBadgeMobile, filterBadge].forEach(badge => {
    if (badge) {
      badge.classList.remove('heart-pop');
      void badge.offsetWidth;
      badge.classList.add('heart-pop');
    }
  });

  // Radiating burst of micro hearts & confetti
  const burstCount = 6;
  for (let i = 0; i < burstCount; i++) {
    const angle = (i / burstCount) * 2 * Math.PI;
    const distance = 25 + Math.random() * 20;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance;

    const burst = document.createElement('div');
    burst.className = 'fav-sparkle-particle';
    burst.textContent = i % 2 === 0 ? '❤️' : '✨';
    burst.style.left = `${x - 6}px`;
    burst.style.top = `${y - 6}px`;
    burst.style.fontSize = `${Math.floor(Math.random() * 5 + 10)}px`;
    burst.style.opacity = '1';
    burst.style.transform = 'scale(0.8)';
    document.body.appendChild(burst);

    requestAnimationFrame(() => {
      burst.style.opacity = '0';
      burst.style.transform = `translate3d(${destX}px, ${destY}px, 0) scale(1.3)`;
      setTimeout(() => burst.remove(), 500);
    });
  }
}

// ============================================================
// FLYING ORDER BASKET PARABOLIC ARC ANIMATION
// ============================================================

function animateFlyingOrderToBasket(sourceEl) {
  // 1. Determine target element (desktop basket or mobile basket)
  const navBtn = window.innerWidth < 768
    ? (document.getElementById('navOrdersBasketBtnMobile') || document.getElementById('navOrdersBasketBtn'))
    : (document.getElementById('navOrdersBasketBtn') || document.getElementById('navOrdersBasketBtnMobile'));

  if (!navBtn) return;

  // 2. Get start & end center coordinates
  let startX = window.innerWidth / 2;
  let startY = window.innerHeight * 0.45;
  if (sourceEl) {
    const startRect = sourceEl.getBoundingClientRect();
    if (startRect.width > 0 && startRect.height > 0) {
      startX = startRect.left + startRect.width / 2;
      startY = startRect.top + startRect.height / 2;
    }
  }

  const targetRect = navBtn.getBoundingClientRect();
  const endX = targetRect.left + targetRect.width / 2;
  const endY = targetRect.top + targetRect.height / 2;

  const dx = endX - startX;
  const dy = endY - startY;
  const dist = Math.hypot(dx, dy);

  // Parabolic peak height: bends upward gracefully
  const arcPeak = Math.max(90, Math.min(260, dist * 0.38 + 40));
  const controlY = Math.min(startY, endY) - arcPeak;
  const controlX = startX + dx * 0.5 - (dx > 0 ? 25 : -25);

  // 3. Create the flying order basket element
  const flyingBasket = document.createElement('div');
  flyingBasket.className = 'flying-order-basket';
  flyingBasket.innerHTML = '<i class="fa-solid fa-basket-shopping"></i>';
  flyingBasket.style.left = '0px';
  flyingBasket.style.top = '0px';
  document.body.appendChild(flyingBasket);

  const duration = Math.max(680, Math.min(950, dist * 0.85 + 480));
  const startTime = performance.now();
  let lastSparkleTime = 0;

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing: smooth ease-in-out quadratic
    const t = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    // Quadratic Bézier curve: B(t) = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
    const oneMinusT = 1 - t;
    const currentX = oneMinusT * oneMinusT * startX + 2 * oneMinusT * t * controlX + t * t * endX;
    const currentY = oneMinusT * oneMinusT * startY + 2 * oneMinusT * t * controlY + t * t * endY;

    // Scale: starts slightly larger, peaks, then dives into the basket
    const scale = 1 + Math.sin(progress * Math.PI) * 0.45 - (progress > 0.8 ? (progress - 0.8) * 1.8 : 0);
    const rot = Math.sin(progress * Math.PI * 2) * 20;

    flyingBasket.style.transform = `translate3d(${currentX - 22}px, ${currentY - 22}px, 0) scale(${Math.max(0.35, scale)}) rotate(${rot}deg)`;

    // Spawn tiny trailing glitter/sparkle particles
    if (elapsed - lastSparkleTime > 70 && progress < 0.88) {
      lastSparkleTime = elapsed;
      createBasketTrailSparkle(currentX, currentY);
    }

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      // Landed!
      flyingBasket.remove();
      onBasketLanded(navBtn, endX, endY);
    }
  }

  requestAnimationFrame(step);
}

// Sparkle trail behind flying basket
function createBasketTrailSparkle(x, y) {
  const sparkle = document.createElement('div');
  sparkle.className = 'basket-sparkle-particle';
  const symbols = ['✨', '🎂', '⭐', '🛍️', '✨'];
  sparkle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  sparkle.style.left = `${x - 6 + (Math.random() * 14 - 7)}px`;
  sparkle.style.top = `${y - 6 + (Math.random() * 14 - 7)}px`;
  sparkle.style.fontSize = `${Math.floor(Math.random() * 6 + 12)}px`;
  sparkle.style.opacity = '0.9';
  sparkle.style.transform = 'scale(1)';
  document.body.appendChild(sparkle);

  requestAnimationFrame(() => {
    sparkle.style.opacity = '0';
    sparkle.style.transform = `translateY(${Math.random() * 14 - 6}px) scale(0.35)`;
    setTimeout(() => sparkle.remove(), 420);
  });
}

// Celebration burst when basket hits the target
function onBasketLanded(targetEl, x, y) {
  // Target pulse animation on basket
  targetEl.classList.remove('basket-landing-pulse');
  void targetEl.offsetWidth; // trigger reflow
  targetEl.classList.add('basket-landing-pulse');

  // Update order count badges
  updateMyOrdersCountBadge();

  // Trigger bounce pop on badges
  const badgeDesktop = document.getElementById('myOrdersCountBadge');
  const badgeMobile = document.getElementById('myOrdersCountBadgeMobile');
  const menuBadge = document.getElementById('mobileMenuOrdersBadge');
  [badgeDesktop, badgeMobile, menuBadge].forEach(badge => {
    if (badge) {
      badge.classList.remove('heart-pop');
      void badge.offsetWidth;
      badge.classList.add('heart-pop');
    }
  });

  // Radiating burst of micro sparkles
  const burstCount = 8;
  for (let i = 0; i < burstCount; i++) {
    const angle = (i / burstCount) * 2 * Math.PI;
    const distance = 26 + Math.random() * 22;
    const burstEl = document.createElement('div');
    burstEl.className = 'basket-sparkle-particle';
    const burstIcons = ['✨', '🛍️', '⭐', '🎂', '💖'];
    burstEl.textContent = burstIcons[i % burstIcons.length];
    burstEl.style.left = `${x}px`;
    burstEl.style.top = `${y}px`;
    burstEl.style.fontSize = `${Math.floor(Math.random() * 6 + 11)}px`;
    burstEl.style.opacity = '1';
    burstEl.style.transform = 'translate(-50%, -50%) scale(0.5)';
    document.body.appendChild(burstEl);

    const targetBurstX = Math.cos(angle) * distance;
    const targetBurstY = Math.sin(angle) * distance;

    requestAnimationFrame(() => {
      burstEl.style.opacity = '0';
      burstEl.style.transform = `translate(calc(-50% + ${targetBurstX}px), calc(-50% + ${targetBurstY}px)) scale(1.15)`;
      setTimeout(() => burstEl.remove(), 480);
    });
  }
}

function toggleDetailFavorite(event = window.event) {
  const cake = currentActiveCakesList[currentDetailCakeIndex];
  if (!cake) return;
  toggleFavorite(cake.id, event);
}

function updateDetailModalFavState(isFav) {
  const icon = document.getElementById('detailModalFavIcon');
  const btn = document.getElementById('detailModalFavBtn');
  if (icon) {
    icon.className = isFav ? 'fa-solid fa-heart text-[#c94968] heart-pop text-base' : 'fa-regular fa-heart text-stone-400 text-base';
  }
  if (btn) {
    btn.classList.toggle('text-[#c94968]', isFav);
    btn.classList.toggle('bg-rose-50', isFav);
    btn.title = isFav ? 'Remove from Favorites' : 'Save to Favorites';
  }
}

function showFavoritesSection() {
  const gallerySection = document.getElementById('gallery');
  if (gallerySection) {
    gallerySection.scrollIntoView({ behavior: 'smooth' });
  }

  // Activate Favorites category pill
  document.querySelectorAll('.category-pill').forEach(btn => btn.classList.remove('active'));
  const favBtn = document.getElementById('favFilterBtn');
  if (favBtn) favBtn.classList.add('active');

  const favCakes = allCakes.filter(c => favoriteCakeIds.includes(c.id));
  renderGalleryCakes(favCakes);
}

function resetToAllCakes() {
  document.querySelectorAll('.category-pill').forEach(btn => btn.classList.remove('active'));
  const allBtn = document.querySelector('.category-pill[data-category="All"]');
  if (allBtn) allBtn.classList.add('active');
  renderGalleryCakes(allCakes);
}

let toastTimer = null;
function showFavToast(message, isAdded) {
  const toast = document.getElementById('favToast');
  const msgEl = document.getElementById('favToastMsg');
  const iconEl = document.getElementById('favToastIcon');
  if (!toast) return;

  clearTimeout(toastTimer);
  if (msgEl) msgEl.textContent = message;
  if (iconEl) {
    iconEl.className = isAdded ? 'fa-solid fa-heart text-[#c94968] text-sm heart-pop' : 'fa-regular fa-heart text-stone-300 text-sm';
  }

  toast.classList.remove('hidden');
  toastTimer = setTimeout(() => {
    toast.classList.add('hidden');
  }, 2200);
}

// Update Copyright Year & Nav smooth scrolling
function setupNavigation() {
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();

  // Mobile menu toggle with smooth animated overlay (never pushes page)
  window.toggleMobileMenu = function(forceState) {
    const mobileMenu = document.getElementById('mobileMenu');
    const backdrop = document.getElementById('mobileMenuBackdrop');
    const mobileBtn = document.getElementById('mobileMenuBtn');
    if (!mobileMenu) return;

    const isOpen = mobileMenu.classList.contains('translate-y-0');
    const shouldOpen = (typeof forceState === 'boolean') ? forceState : !isOpen;

    if (shouldOpen) {
      mobileMenu.classList.remove('-translate-y-4', 'opacity-0', 'pointer-events-none');
      mobileMenu.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
      if (backdrop) {
        backdrop.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
        backdrop.classList.add('opacity-100', 'pointer-events-auto');
      }
      if (mobileBtn) mobileBtn.setAttribute('aria-expanded', 'true');
    } else {
      mobileMenu.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
      mobileMenu.classList.add('-translate-y-4', 'opacity-0', 'pointer-events-none');
      if (backdrop) {
        backdrop.classList.remove('opacity-100', 'pointer-events-auto');
        backdrop.classList.add('opacity-0', 'pointer-events-none');
        setTimeout(() => {
          if (!mobileMenu.classList.contains('translate-y-0')) backdrop.classList.add('hidden');
        }, 300);
      }
      if (mobileBtn) mobileBtn.setAttribute('aria-expanded', 'false');
    }
  };

  const mobileBtn = document.getElementById('mobileMenuBtn');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.toggleMobileMenu();
    });
  }

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      window.toggleMobileMenu(false);
    });
  });

  // Search input filter
  const searchInput = document.getElementById('cakeSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterCakes(e.target.value.trim().toLowerCase(), getActiveCategory());
    });
  }

  // Category filter pills
  const categoryPills = document.querySelectorAll('.category-pill');
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.getAttribute('data-category');
      const query = (document.getElementById('cakeSearchInput')?.value || '').trim().toLowerCase();
      filterCakes(query, cat);
    });
  });
}

function getActiveCategory() {
  const activePill = document.querySelector('.category-pill.active');
  return activePill ? activePill.getAttribute('data-category') : 'All';
}

// Fetch products from backend or cloud/static fallback
async function fetchProducts() {
  try {
    let prods = null;

    // 1. Try local Express API if running
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) prods = data;
        else if (data && data.success && Array.isArray(data.products)) prods = data.products;
      }
    } catch (_) {}

    // 2. Try Cloud Firestore (Spark Free Tier)
    if (!prods && window.FirebaseService && typeof window.FirebaseService.getProducts === 'function') {
      try {
        const fsProds = await window.FirebaseService.getProducts();
        if (Array.isArray(fsProds) && fsProds.length > 0) prods = fsProds;
      } catch (_) {}
    }

    // 3. Fallback to bundled static catalog
    if (!prods) {
      try {
        const res = await fetch('/data/products.json');
        if (res.ok) {
          const data = await res.json();
          prods = Array.isArray(data) ? data : (data.products || null);
        }
      } catch (_) {}
    }

    if (prods && prods.length > 0) {
      allCakes = prods;
      renderFeaturedCakes(allCakes);
      renderGalleryCakes(allCakes);
      populateOrderCakeSelect(allCakes);
    } else {
      throw new Error('No products available');
    }
  } catch (err) {
    console.error('Error fetching products:', err);
    document.getElementById('cakesGalleryGrid').innerHTML = `
      <div class="col-span-full text-center py-12 text-rose-500">
        <p class="font-bold">Could not load cake gallery</p>
        <p class="text-xs text-stone-500 mt-1">Please make sure the MAK CAKE server is running.</p>
      </div>
    `;
  }
}

// Render Featured Cakes on Homepage
function renderFeaturedCakes(cakes) {
  const container = document.getElementById('featuredCakesGrid');
  if (!container) return;

  const featured = cakes.filter(c => c.featured);
  const displayCakes = featured.length ? featured.slice(0, 3) : cakes.slice(0, 3);

  container.innerHTML = displayCakes.map(cake => `
    <div class="cake-card bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm flex flex-col justify-between">
      <div>
        <div class="relative h-64 overflow-hidden bg-stone-100 cursor-pointer" onclick="openProductDetailModal('${cake.id}')">
          <img src="${cake.image}" alt="${cake.name}" class="card-img w-full h-full object-cover" onerror="this.onerror=null; this.src='/images/hero-cake-only.jpg'">
          <div class="absolute top-4 left-4 bg-chocolate/85 backdrop-blur text-gold-light text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            ${cake.category}
          </div>
          ${cake.popular ? `
            <div class="absolute top-4 right-4 bg-gold text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
              ★ Popular
            </div>
          ` : ''}
        </div>

        <div class="p-6">
          <div class="flex items-center justify-between text-xs text-amber-500 mb-1">
            <div class="flex items-center gap-1">
              <i class="fa-solid fa-star"></i>
              <span class="font-bold text-chocolate text-xs">${cake.rating || '4.9'}</span>
            </div>
            <span class="text-stone-400">${cake.servings || '8-12 servings'}</span>
          </div>

          <h3 class="font-serif-luxury font-bold text-xl text-chocolate hover:text-gold transition cursor-pointer" onclick="openProductDetailModal('${cake.id}')">
            ${cake.name}
          </h3>

          <p class="text-xs text-stone-500 mt-2 line-clamp-2 leading-relaxed">
            ${cake.description}
          </p>
        </div>
      </div>

      <div class="px-6 pb-6 pt-2 border-t border-stone-100 flex items-center justify-between">
        <div>
          <span class="text-[10px] text-stone-400 uppercase tracking-wider font-semibold block">From</span>
          <span class="text-lg font-extrabold text-chocolate">${cake.price.toLocaleString()} <span class="text-xs font-semibold text-gold-dark">ETB</span></span>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="openProductDetailModal('${cake.id}')" class="px-3.5 py-2 rounded-xl text-xs font-bold text-stone-600 bg-stone-100 hover:bg-stone-200 transition">
            Details
          </button>
          <button onclick="openOrderModal('${cake.id}')" class="btn-gold px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider">
            Order
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Render Gallery Cakes with filter & favorites
function renderGalleryCakes(cakes) {
  currentActiveCakesList = cakes;
  const container = document.getElementById('cakesGalleryGrid');
  const noResults = document.getElementById('noResultsMessage');
  if (!container) return;

  const activePill = document.querySelector('.category-pill.active');
  const isFavoritesFilter = activePill && activePill.dataset.category === 'Favorites';

  if (cakes.length === 0) {
    if (isFavoritesFilter) {
      if (noResults) noResults.classList.add('hidden');
      container.innerHTML = `
        <div class="col-span-full text-center py-16 bg-rose-50/40 rounded-3xl border border-rose-100 p-8 my-4">
          <div class="w-16 h-16 rounded-full bg-white text-[#c94968] flex items-center justify-center text-2xl mx-auto mb-3 shadow-xs">
            <i class="fa-regular fa-heart"></i>
          </div>
          <h4 class="font-serif-luxury font-bold text-chocolate text-lg">No Favorite Cakes Yet</h4>
          <p class="text-stone-500 text-xs sm:text-sm mt-1 max-w-sm mx-auto">
            Click the <i class="fa-solid fa-heart text-[#c94968] mx-1"></i> icon on any cake to add it to your favorites for instant access!
          </p>
          <button onclick="resetToAllCakes()" class="btn-gold px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider mt-5 shadow-sm">
            Browse All Cakes
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = '';
    if (noResults) noResults.classList.remove('hidden');
    return;
  }

  if (noResults) noResults.classList.add('hidden');

  container.innerHTML = cakes.map(cake => {
    const isFav = isFavorite(cake.id);
    return `
      <div class="cake-card bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm flex flex-col justify-between group">
        <div>
          <div class="relative h-36 sm:h-52 overflow-hidden bg-stone-100 cursor-pointer" onclick="openProductDetailModal('${cake.id}')">
            <img src="${cake.image}" alt="${escapeHtml(cake.name)}" class="card-img w-full h-full object-cover" onerror="this.onerror=null; this.src='/images/hero-cake-only.jpg'">
            
            <!-- Category Tag -->
            <div class="absolute top-2 left-2 sm:top-3 sm:left-3 bg-chocolate/85 backdrop-blur text-gold-light text-[9px] sm:text-[10px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full uppercase tracking-wider">
              ${escapeHtml(cake.category)}
            </div>

            ${cake.isSoldOut ? `
              <div class="absolute bottom-2 left-2 sm:bottom-2.5 sm:left-2.5 bg-rose-600/90 backdrop-blur text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                <i class="fa-solid fa-ban text-[8px]"></i>
                <span>Sold Out</span>
              </div>
            ` : ''}

            <!-- Favorite Heart Button -->
            <button onclick="event.stopPropagation(); toggleFavorite('${cake.id}', event)"
                    id="fav-card-${cake.id}"
                    class="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 backdrop-blur shadow-sm flex items-center justify-center transition active:scale-90 hover:scale-110"
                    aria-label="Add to Favorites" title="${isFav ? 'Remove from Favorites' : 'Save to Favorites'}">
              <i class="${isFav ? 'fa-solid fa-heart text-[#c94968] heart-pop' : 'fa-regular fa-heart text-stone-400 hover:text-[#c94968]'} text-xs sm:text-sm"></i>
            </button>
          </div>

          <div class="p-3 sm:p-5">
            <div class="flex items-center justify-between text-[10px] sm:text-xs text-stone-400 mb-1">
              <span class="font-medium text-amber-600 flex items-center gap-0.5">
                <i class="fa-solid fa-star text-[9px] sm:text-[10px]"></i>
                <span>${cake.rating || '4.9'}</span>
              </span>
              <span class="truncate ml-1 text-[10px] sm:text-[11px]">${escapeHtml(cake.servings || 'Standard')}</span>
            </div>

            <h4 class="font-serif-luxury font-bold text-xs sm:text-base text-chocolate leading-snug cursor-pointer hover:text-gold transition line-clamp-1" onclick="openProductDetailModal('${cake.id}')">
              ${escapeHtml(cake.name)}
            </h4>

            <p class="text-[10px] sm:text-[11px] text-stone-500 mt-1 line-clamp-1 sm:line-clamp-2 leading-relaxed">
              ${escapeHtml(cake.description)}
            </p>
          </div>
        </div>

        <div class="p-3 sm:p-5 pt-0">
          <div class="pt-2 sm:pt-3 border-t border-stone-100 flex items-center justify-between gap-1">
            <div>
              <span class="text-xs sm:text-base font-extrabold text-chocolate block">${cake.price.toLocaleString()} <span class="text-[9px] sm:text-[10px] font-bold text-gold-dark">ETB</span></span>
            </div>
            <div class="flex items-center gap-1">
              <button onclick="openProductDetailModal('${cake.id}')" class="hidden sm:inline-flex p-2 rounded-lg text-stone-600 hover:bg-stone-100 text-xs transition" title="View Details">
                <i class="fa-regular fa-eye"></i>
              </button>
              ${cake.isSoldOut ? `
                <button disabled class="bg-stone-200 text-stone-400 cursor-not-allowed px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                  Sold Out
                </button>
              ` : `
                <button onclick="openOrderModal('${cake.id}')" class="btn-gold px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                  Order
                </button>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Filter cakes based on search query & category
function filterCakes(query, category) {
  let filtered = allCakes;

  if (category && category !== 'All') {
    if (category === 'Favorites') {
      filtered = filtered.filter(c => favoriteCakeIds.includes(c.id));
    } else if (category === 'Cupcakes' || category === 'Cup Cake') {
      filtered = filtered.filter(c => c.category === 'Cupcakes' || c.category === 'Cup Cake' || c.category === 'Cupcakes & Pastries');
    } else if (category === 'Extra Decorations' || category === 'Cake Accessories') {
      filtered = filtered.filter(c => c.category === 'Extra Decorations' || c.category === 'Cake Accessories');
    } else {
      filtered = filtered.filter(c => c.category === category);
    }
  }

  if (query) {
    filtered = filtered.filter(c => 
      c.name.toLowerCase().includes(query) ||
      c.description.toLowerCase().includes(query) ||
      (c.flavors && c.flavors.some(f => f.toLowerCase().includes(query)))
    );
  }

  renderGalleryCakes(filtered);
}

// Product Details Modal Navigation State
let currentActiveCakesList = [];
let currentDetailCakeIndex = 0;
let detailTouchStartX = 0;
let detailTouchStartY = 0;
let detailTouchEndX = 0;
let detailTouchEndY = 0;

function populateProductDetailModal(cake, animType = 'open') {
  if (!cake) return;

  const imgEl = document.getElementById('detailModalImage');
  const catBadge = document.getElementById('detailModalCategoryBadge');
  const catPill = document.getElementById('detailModalCategoryPill');
  const titleEl = document.getElementById('detailModalTitle');
  const ratingEl = document.getElementById('detailModalRating');
  const servingsEl = document.getElementById('detailModalServings');
  const descEl = document.getElementById('detailModalDescription');
  const priceEl = document.getElementById('detailModalPrice');
  const counterEl = document.getElementById('detailModalCounter');
  const sizesList = document.getElementById('detailModalSizesList');
  const flavorsContainer = document.getElementById('detailModalFlavorsTags');
  const orderBtn = document.getElementById('detailModalOrderBtn');

  // Animated image transition based on click / swap direction
  if (imgEl) {
    imgEl.src = cake.image || '/images/hero-cake-only.jpg';
    imgEl.alt = cake.name;
    imgEl.onerror = () => { imgEl.src = '/images/hero-cake-only.jpg'; };
    imgEl.classList.remove('anim-detail-img-open', 'anim-detail-img-next', 'anim-detail-img-prev');
    void imgEl.offsetWidth; // force reflow
    const imgAnim = animType === 'next' ? 'anim-detail-img-next' : (animType === 'prev' ? 'anim-detail-img-prev' : 'anim-detail-img-open');
    imgEl.classList.add(imgAnim);
  }

  if (catBadge) catBadge.textContent = cake.category;
  if (catPill) catPill.textContent = cake.category;
  if (titleEl) titleEl.textContent = cake.name;
  if (ratingEl) ratingEl.textContent = cake.rating || '5.0';
  if (servingsEl) servingsEl.textContent = cake.servings || '8-12 servings';
  if (descEl) descEl.textContent = cake.description;
  if (priceEl) priceEl.innerHTML = `${cake.price.toLocaleString()} <span class="text-xs font-bold text-[#c94968]">ETB</span>`;

  // Update Favorite State
  updateDetailModalFavState(isFavorite(cake.id));

  // Update Counter (e.g. "14 / 34") with pulse pop
  if (counterEl) {
    const total = currentActiveCakesList.length || allCakes.length;
    counterEl.textContent = `${currentDetailCakeIndex + 1} / ${total}`;
    counterEl.classList.remove('heart-pop');
    void counterEl.offsetWidth;
    counterEl.classList.add('heart-pop');
  }

  // Trigger smooth staggered animated text transition
  triggerDetailTextAnimation(animType);

  // Interactive Size Chips (Clean, Modern & Intuitive)
  if (sizesList) {
    if (cake.sizes && cake.sizes.length) {
      sizesList.innerHTML = cake.sizes.map((s, idx) => `
        <button onclick="selectDetailSize(this, ${s.price})"
                class="size-chip px-3 py-1.5 rounded-xl border text-left transition ${idx === 0 ? 'border-[#c94968] bg-rose-50 text-chocolate font-bold shadow-xs' : 'border-stone-200 text-stone-600 hover:border-stone-300'}">
          <span class="block font-medium text-xs">${escapeHtml(s.name)}</span>
          <span class="text-[11px] text-[#c94968] font-bold">${s.price.toLocaleString()} ETB</span>
        </button>
      `).join('');
    } else {
      sizesList.innerHTML = `
        <div class="px-3 py-1.5 rounded-xl border border-rose-100 bg-rose-50/50 text-stone-700 text-xs font-medium">
          Standard Portion &bull; <strong class="text-chocolate">${cake.price.toLocaleString()} ETB</strong>
        </div>
      `;
    }
  }

  // Flavors (Clean Tags)
  if (flavorsContainer) {
    if (cake.flavors && cake.flavors.length) {
      flavorsContainer.innerHTML = cake.flavors.map(f => `
        <span class="px-2.5 py-1 bg-stone-100 text-stone-600 rounded-lg text-[11px] font-medium border border-stone-200/60">${escapeHtml(f)}</span>
      `).join('');
    } else {
      flavorsContainer.innerHTML = `<span class="px-2.5 py-1 bg-stone-100 text-stone-600 rounded-lg text-[11px] border border-stone-200/60">Signature Vanilla & Buttercream</span>`;
    }
  }

  // Setup order button with Sold Out support
  if (orderBtn) {
    if (cake.isSoldOut) {
      orderBtn.disabled = true;
      orderBtn.className = 'px-6 py-3 rounded-2xl text-xs font-bold tracking-wide uppercase bg-stone-200 text-stone-400 cursor-not-allowed flex items-center gap-2';
      orderBtn.innerHTML = '<i class="fa-solid fa-ban"></i><span>Currently Sold Out</span>';
      orderBtn.onclick = null;
    } else {
      orderBtn.disabled = false;
      orderBtn.className = 'btn-gold px-6 py-3 rounded-2xl text-xs font-bold tracking-wide uppercase shadow-md flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition';
      orderBtn.innerHTML = '<i class="fa-solid fa-cart-shopping"></i><span>Order Cake</span>';
      orderBtn.onclick = () => {
        closeProductDetailModal();
        openOrderModal(cake.id);
      };
    }
  }
}

// Trigger smooth staggered text animations for cake detail modal
function triggerDetailTextAnimation(animType) {
  const animClass = animType === 'next'
    ? 'anim-detail-next'
    : (animType === 'prev' ? 'anim-detail-prev' : 'anim-detail-open');

  const targets = [
    { id: 'detailModalCategoryPill', delay: 'anim-delay-1' },
    { id: 'detailModalServings', delay: 'anim-delay-1' },
    { id: 'detailModalTitle', delay: 'anim-delay-1' },
    { id: 'detailModalDescription', delay: 'anim-delay-2' },
    { id: 'detailModalSizesSection', delay: 'anim-delay-3' },
    { id: 'detailModalFlavorsSection', delay: 'anim-delay-3' },
    { id: 'detailModalPrice', delay: 'anim-delay-4' }
  ];

  targets.forEach(({ id, delay }) => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove('anim-detail-open', 'anim-detail-next', 'anim-detail-prev', 'anim-delay-1', 'anim-delay-2', 'anim-delay-3', 'anim-delay-4');
      void el.offsetWidth; // Force CSS reflow to cleanly restart the animation
      el.classList.add(animClass, delay);
    }
  });

  const catBadge = document.getElementById('detailModalCategoryBadge');
  if (catBadge) {
    catBadge.classList.remove('heart-pop');
    void catBadge.offsetWidth;
    catBadge.classList.add('heart-pop');
  }
}

function selectDetailSize(btn, price) {
  document.querySelectorAll('.size-chip').forEach(b => {
    b.className = 'size-chip px-3 py-1.5 rounded-xl border border-stone-200 text-stone-600 hover:border-stone-300 text-left transition';
  });
  btn.className = 'size-chip px-3 py-1.5 rounded-xl border border-[#c94968] bg-rose-50 text-chocolate font-bold shadow-xs text-left transition';
  
  const priceEl = document.getElementById('detailModalPrice');
  if (priceEl) {
    priceEl.innerHTML = `${price.toLocaleString()} <span class="text-xs font-bold text-[#c94968]">ETB</span>`;
  }
}

// Open Product Details Modal
function openProductDetailModal(cakeId) {
  if (!currentActiveCakesList || currentActiveCakesList.length === 0) {
    currentActiveCakesList = allCakes;
  }

  let idx = currentActiveCakesList.findIndex(c => c.id === cakeId);
  if (idx === -1) {
    currentActiveCakesList = allCakes;
    idx = currentActiveCakesList.findIndex(c => c.id === cakeId);
    if (idx === -1) idx = 0;
  }

  currentDetailCakeIndex = idx;
  const cake = currentActiveCakesList[currentDetailCakeIndex];
  if (!cake) return;

  populateProductDetailModal(cake, 'open');

  const modal = document.getElementById('productDetailModal');
  if (modal) modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  setupProductDetailNavigation();
}

// Navigate to Next (+1) or Previous (-1) Cake
function navigateProductDetail(direction) {
  if (!currentActiveCakesList || currentActiveCakesList.length <= 1) return;

  const total = currentActiveCakesList.length;
  currentDetailCakeIndex = (currentDetailCakeIndex + direction + total) % total;
  const nextCake = currentActiveCakesList[currentDetailCakeIndex];

  // Subtle animated slide bounce
  const card = document.getElementById('productDetailModalCard');
  if (card) {
    card.classList.add(direction > 0 ? 'translate-x-1' : '-translate-x-1');
    setTimeout(() => {
      card.classList.remove('translate-x-1', '-translate-x-1');
    }, 120);
  }

  populateProductDetailModal(nextCake, direction > 0 ? 'next' : 'prev');
}

// Touch swipe and Keyboard Listeners
function setupProductDetailNavigation() {
  const card = document.getElementById('productDetailModalCard');
  if (card && !card.dataset.navBound) {
    card.dataset.navBound = 'true';

    // Touch Swipe Listeners for Mobile
    card.addEventListener('touchstart', (e) => {
      detailTouchStartX = e.changedTouches[0].clientX;
      detailTouchStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    card.addEventListener('touchend', (e) => {
      detailTouchEndX = e.changedTouches[0].clientX;
      detailTouchEndY = e.changedTouches[0].clientY;
      handleProductDetailSwipe();
    }, { passive: true });
  }

  // Keyboard Navigation (Left / Right Arrow)
  if (!window._detailKeyNavBound) {
    window._detailKeyNavBound = true;
    window.addEventListener('keydown', (e) => {
      const modal = document.getElementById('productDetailModal');
      if (!modal || modal.classList.contains('hidden')) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateProductDetail(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateProductDetail(-1);
      } else if (e.key === 'Escape') {
        closeProductDetailModal();
      }
    });
  }
}

function handleProductDetailSwipe() {
  const diffX = detailTouchEndX - detailTouchStartX;
  const diffY = detailTouchEndY - detailTouchStartY;

  // Horizontal swipe must be > 35px and dominant over vertical scrolling
  if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY) * 1.2) {
    if (diffX < 0) {
      // Swiped Left -> go to Next cake
      navigateProductDetail(1);
    } else {
      // Swiped Right -> go to Previous cake
      navigateProductDetail(-1);
    }
  }
}

function closeProductDetailModal() {
  const modal = document.getElementById('productDetailModal');
  if (modal) modal.classList.add('hidden');
  document.body.style.overflow = '';
}

// ============================================================
// CAKE ACCESSORIES & PARTY ADD-ONS ("MAKE IT EXTRA SPECIAL! 💕")
// ============================================================

const ACCESSORY_CATALOG = [
  {
    id: 'mak-acc-01',
    name: 'Number Candles (0-9 Metallic)',
    subtitle: 'Elegant 3D metallic candles for milestone ages',
    price: 150,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=300&h=300&q=80',
    recommendedCategories: ['Birthday Cakes', 'Anniversary', 'Couples'],
    requiresAge: true,
    isRecommended: true,
    hasDetailPrompt: false
  },
  {
    id: 'mak-acc-02',
    name: 'Birthday Candles (Pastel Spiral Pack)',
    subtitle: 'Classic spiral pastel birthday candles (pack of 12)',
    price: 120,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=300&h=300&q=80',
    recommendedCategories: ['Birthday Cakes'],
    requiresAge: true,
    isRecommended: true,
    hasDetailPrompt: false
  },
  {
    id: 'mak-acc-03',
    name: 'Sparkler Celebration Candles',
    subtitle: 'Safe celebration fountain sparklers',
    price: 250,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&h=300&q=80',
    recommendedCategories: ['Birthday Cakes', 'Anniversary', 'New Year', 'Holiday'],
    requiresAge: false,
    isRecommended: true,
    hasDetailPrompt: false
  },
  {
    id: 'mak-acc-04',
    name: 'Happy Birthday Letter Candles Set',
    subtitle: 'Full 13-letter glittering candles spelling HAPPY BIRTHDAY',
    price: 350,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=300&h=300&q=80',
    recommendedCategories: ['Birthday Cakes'],
    requiresAge: false,
    isRecommended: true,
    hasDetailPrompt: false
  },
  {
    id: 'mak-acc-05',
    name: 'Birthday Cake Topper (Laser Acrylic)',
    subtitle: 'Precision laser-cut mirror gold acrylic topper',
    price: 400,
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=300&h=300&q=80',
    recommendedCategories: ['Birthday Cakes'],
    requiresAge: false,
    isRecommended: true,
    hasDetailPrompt: true,
    promptLabel: 'Topper text / inscription?',
    promptPlaceholder: 'e.g. Happy Birthday Sarah!'
  },
  {
    id: 'mak-acc-12',
    name: 'Birthday Balloons & Party Poppers Bundle',
    subtitle: 'Celebration kit with confetti poppers & helium balloons',
    price: 450,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=300&h=300&q=80',
    recommendedCategories: ['Birthday Cakes'],
    requiresAge: false,
    isRecommended: true,
    hasDetailPrompt: false
  },
  {
    id: 'mak-acc-grad-01',
    name: 'Graduation Cake Topper (Congrats Grad!)',
    subtitle: 'Mirror gold acrylic topper with cap silhouette',
    price: 350,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=300&h=300&q=80',
    recommendedCategories: ['Graduation'],
    requiresAge: false,
    isRecommended: true,
    hasDetailPrompt: false
  },
  {
    id: 'mak-acc-wed-01',
    name: 'Wedding Cake Topper (Mr & Mrs Script)',
    subtitle: 'Timeless laser-cut bridal script topper',
    price: 450,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=300&h=300&q=80',
    recommendedCategories: ['Wedding Cakes'],
    requiresAge: false,
    isRecommended: true,
    hasDetailPrompt: false
  },
  {
    id: 'mak-acc-ann-01',
    name: 'Anniversary Cake Topper ("Happy Anniversary")',
    subtitle: 'Gleaming gold script topper with infinity hearts',
    price: 400,
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=300&h=300&q=80',
    recommendedCategories: ['Anniversary', 'Couples'],
    requiresAge: false,
    isRecommended: true,
    hasDetailPrompt: false
  }
];

let selectedOrderAccessories = {}; // key: accId -> { id, name, displayName, price, qty, note, candleAge, requiresAge, image }
let candleAgeValue = '';
let currentOrderStep = 1;
let selectedQuickDateType = 'tomorrow';
let selectedQuickTimeSlot = 'Afternoon';

// Automatic Inscription Suggestions per Cake Category
const CATEGORY_MESSAGE_SUGGESTIONS = {
  'Couples': [
    'Happy Anniversary My Love 💖',
    'Forever & Always 💍',
    'You & Me Together 🌹',
    'Happy Sweetheart Day 💑',
    'To Many More Years With You ✨'
  ],
  'Normal Cakes': [
    'Happy Birthday! 🎉',
    'Wishing You Sweet Joy 🍰',
    'Best Wishes & Congratulations 🎈',
    'Celebrate Every Moment ✨',
    'Cheers to You 🥂'
  ],
  'Mini Cakes': [
    'Sweet Treat for You 🧁',
    'Thinking of You 💕',
    'Just for You 🌸',
    'Happy Mini Celebration 🎉',
    'Love in Every Bite 🍓'
  ],
  'Wedding Cakes': [
    'Happy Wedding Day 💍',
    'Mr & Mrs — Forever in Love 🕊️',
    'Happily Ever After 💒',
    'Congratulations on Your Marriage 🥂',
    'Two Hearts, One Love 💖'
  ],
  'Graduation': [
    'Congratulations Graduate! 🎓',
    'Class of 2026 — You Did It! 🌟',
    'So Proud of You! 🚀',
    'The Best is Yet to Come 📚',
    'Dream Big & Shine ✨'
  ],
  'Fasting Cakes': [
    'Melkam Beal! 🌿',
    'Fasting Friendly & Pure 🍇',
    'Blessed Celebration 🕊️',
    'Peace, Love & Blessings 🙏',
    'Healthy & Sweet Holiday 🍃'
  ],
  'default': [
    'Happy Birthday! 🎂',
    'Congratulations! 🎉',
    'With Love & Best Wishes 💖',
    'Celebrate in Sweet Style ✨',
    'Special Celebration for You 🎈'
  ]
};

// ============================================================
// 4-STEP STREAMLINED ORDERING WIZARD CONTROLLER
// ============================================================

// Switch between wizard steps (1..6) with animated smooth transition
function goToOrderStep(step) {
  // If advancing forward from Step 2, validate candle age if age candle is selected
  if (step > 2 && currentOrderStep === 2) {
    if (!validateStep2CandleAge()) return;
  }

  // If moving forward from Step 4 (Contact & Date), validate inputs first
  if (step >= 5 && currentOrderStep === 4) {
    if (!validateStep4()) return;
  }

  currentOrderStep = Math.max(1, Math.min(6, step));

  // Update subtitle
  const subtitleEl = document.getElementById('orderStepIndicatorSubtitle');
  const subtitles = {
    1: 'Step 1 of 6: Size & Flavor',
    2: 'Step 2 of 6: Extra Decorations (Optional)',
    3: 'Step 3 of 6: What to Write on the Cake',
    4: 'Step 4 of 6: Contact & Delivery Date',
    5: 'Step 5 of 6: Review Your Order Details',
    6: 'Step 6 of 6: Payment Transfer & Receipt'
  };
  if (subtitleEl) subtitleEl.textContent = subtitles[currentOrderStep] || '';

  // Update Stepper Dots & Lines (1 to 6)
  for (let s = 1; s <= 6; s++) {
    const dot = document.getElementById(`stepperDot${s}`);
    const line = document.getElementById(`stepperLine${s}`);
    if (dot) {
      if (s === currentOrderStep) {
        dot.className = 'w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold stepper-circle active';
        dot.innerHTML = `${s}`;
      } else if (s < currentOrderStep) {
        dot.className = 'w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold stepper-circle bg-emerald-500 text-white';
        dot.innerHTML = '<i class="fa-solid fa-check text-[9px]"></i>';
      } else {
        dot.className = 'w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold stepper-circle bg-stone-100 text-stone-400';
        dot.innerHTML = `${s}`;
      }
    }
    if (line) {
      if (s < currentOrderStep) {
        line.className = 'flex-1 h-0.5 bg-emerald-400 mx-1 transition-all';
      } else {
        line.className = 'flex-1 h-0.5 bg-stone-200 mx-1 transition-all';
      }
    }
  }

  // Toggle Step Panels (1 to 6)
  for (let p = 1; p <= 6; p++) {
    const panel = document.getElementById(`orderStepPanel${p}`);
    if (panel) {
      if (p === currentOrderStep) {
        panel.classList.remove('hidden');
      } else {
        panel.classList.add('hidden');
      }
    }
  }

  // Step-specific initializations
  if (currentOrderStep === 2) {
    renderStep2AccessoriesList();
  } else if (currentOrderStep === 3) {
    if (selectedCakeForOrder) {
      renderCategoryMessageSuggestions(selectedCakeForOrder.category);
    }
  } else if (currentOrderStep === 4) {
    const dateInput = document.getElementById('orderDate');
    populateWeekdayDropdownOptions(selectedQuickDateType === 'custom' && dateInput ? dateInput.value : '');
  } else if (currentOrderStep === 5) {
    populateOrderReviewSummary();
  } else if (currentOrderStep === 6) {
    populateOrderReviewSummary();
    updatePaymentOptionBreakdown();
    if (!selectedPaymentOption) {
      const container = document.getElementById('selectedPaymentDetailsContainer');
      if (container) container.classList.add('hidden');
      const submitText = document.getElementById('btnSubmitOrderText');
      if (submitText) submitText.textContent = 'Please Select a Payment Plan';
    }
  }

  // Scroll wizard container to top
  const modalContent = document.querySelector('#orderModal .overflow-y-auto');
  if (modalContent) modalContent.scrollTop = 0;
}

// Open Order Modal (can be triggered with pre-selected cake)
function openOrderModal(cakeId, customName, customPrice) {
  const modal = document.getElementById('orderModal');
  const alertEl = document.getElementById('orderFormAlert');
  if (alertEl) alertEl.classList.add('hidden');

  // Reset accessories selection and candle age for fresh order
  selectedOrderAccessories = {};
  candleAgeValue = '';
  selectedPaymentOption = null;
  currentPaymentReceiptDataUrl = null;
  const receiptInput = document.getElementById('orderPaymentReceiptInput');
  if (receiptInput) receiptInput.value = '';
  const receiptPreview = document.getElementById('receiptPreviewCard');
  if (receiptPreview) receiptPreview.classList.add('hidden');
  const detailsContainer = document.getElementById('selectedPaymentDetailsContainer');
  if (detailsContainer) detailsContainer.classList.add('hidden');
  const ageInput = document.getElementById('candleAgeInput');
  if (ageInput) ageInput.value = '';
  const promptCard = document.getElementById('candleAgePromptCard');
  if (promptCard) promptCard.classList.add('hidden');
  const errorMsg = document.getElementById('candleAgeErrorMsg');
  if (errorMsg) errorMsg.classList.add('hidden');
  const previewText = document.getElementById('candleAgePreviewText');
  if (previewText) previewText.textContent = 'Enter age (1–120)';

  const select = document.getElementById('orderCakeSelect');
  if (cakeId && select) {
    select.value = cakeId;
  } else if (allCakes.length > 0 && select) {
    select.value = allCakes[0].id;
  }

  updateOrderCakeOptions();
  initQuickDateAndTimes();
  goToOrderStep(1);

  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeOrderModal() {
  const modal = document.getElementById('orderModal');
  if (modal) modal.classList.add('hidden');
  document.body.style.overflow = '';
}

// Update sizes, flavors, and message suggestions when cake changes
function updateOrderCakeOptions() {
  const select = document.getElementById('orderCakeSelect');
  const sizeSelect = document.getElementById('orderCakeSize');
  const flavorSelect = document.getElementById('orderCakeFlavor');
  if (!select) return;

  const cakeId = select.value;
  const cake = allCakes.find(c => c.id === cakeId) || allCakes[0];
  selectedCakeForOrder = cake;

  if (!cake) return;

  // Update live preview thumbnail in order modal
  const thumb = document.getElementById('orderCakeThumbnail');
  if (thumb) {
    thumb.src = cake.image || '/images/hero-cake-only.jpg';
    thumb.classList.remove('heart-pop');
    void thumb.offsetWidth;
    thumb.classList.add('heart-pop');
  }

  const catBadge = document.getElementById('orderCakeCategoryBadge');
  if (catBadge) {
    catBadge.textContent = cake.category || 'Cake';
  }

  const descSnippet = document.getElementById('orderCakeDescSnippet');
  if (descSnippet) {
    descSnippet.textContent = cake.description || 'Artisanal cake handcrafted in Addis Ababa.';
  }

  // Update sizes (Select & Horizontal Chips)
  if (sizeSelect) {
    if (cake.sizes && cake.sizes.length) {
      sizeSelect.innerHTML = cake.sizes.map((s, idx) => `
        <option value="${s.price}" data-name="${s.name}" ${idx === 1 ? 'selected' : ''}>
          ${s.name} (${s.price.toLocaleString()} ETB)
        </option>
      `).join('');
    } else {
      sizeSelect.innerHTML = `<option value="${cake.price}" data-name="Standard">${cake.name} (${cake.price.toLocaleString()} ETB)</option>`;
    }
  }
  renderOrderSizeChips(cake);

  // Update flavors (Select & Horizontal Chips)
  if (flavorSelect) {
    if (cake.flavors && cake.flavors.length) {
      flavorSelect.innerHTML = cake.flavors.map(f => `
        <option value="${f}">${f}</option>
      `).join('');
    } else {
      flavorSelect.innerHTML = `<option value="Signature Vanilla">Signature Vanilla</option>`;
    }
  }
  renderOrderFlavorChips(cake);

  // Update category-based message suggestions
  renderCategoryMessageSuggestions(cake.category);

  // Dynamically refresh Step 2 accessories recommendations to match new category
  renderStep2AccessoriesList();

  recalculateOrderTotal();
}

// Render Cake Sizes as clean horizontal clickable chips
function renderOrderSizeChips(cake) {
  const container = document.getElementById('orderSizeChipsContainer');
  const sizeSelect = document.getElementById('orderCakeSize');
  if (!container || !sizeSelect) return;

  const sizes = (cake.sizes && cake.sizes.length) ? cake.sizes : [{ name: 'Standard Size', price: cake.price || 3000 }];
  const defaultIdx = sizes.length > 1 ? 1 : 0;

  container.innerHTML = sizes.map((s, idx) => {
    const isSelected = idx === defaultIdx;
    return `
      <button type="button" 
              onclick="selectOrderSizeChip(${idx}, '${escapeHtml(s.name).replace(/'/g, "\\'")}', ${s.price}, this)" 
              class="order-size-chip px-3.5 py-1.5 rounded-full text-[11px] font-semibold border flex items-center gap-1.5 ${isSelected ? 'border-[#c94968] bg-rose-50 text-[#c94968] font-bold choice-glow-active' : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'}">
        <span>${escapeHtml(s.name)}</span>
        <span class="${isSelected ? 'text-[#c94968]' : 'text-stone-400'} font-bold">(${s.price.toLocaleString()} ETB)</span>
      </button>
    `;
  }).join('');

  if (sizeSelect.options.length > defaultIdx) {
    sizeSelect.selectedIndex = defaultIdx;
  }
}

// Select a Size Chip with Glow Animation
function selectOrderSizeChip(idx, name, price, btn) {
  const container = document.getElementById('orderSizeChipsContainer');
  const sizeSelect = document.getElementById('orderCakeSize');
  if (!container || !sizeSelect) return;

  container.querySelectorAll('.order-size-chip').forEach(b => {
    b.className = 'order-size-chip px-3.5 py-1.5 rounded-full text-[11px] font-semibold border flex items-center gap-1.5 border-stone-200 bg-white text-stone-700 hover:border-stone-300';
    const spans = b.querySelectorAll('span');
    if (spans.length > 1) spans[1].className = 'text-stone-400 font-bold';
  });

  if (btn) {
    btn.className = 'order-size-chip px-3.5 py-1.5 rounded-full text-[11px] font-semibold border flex items-center gap-1.5 border-[#c94968] bg-rose-50 text-[#c94968] font-bold choice-glow-active';
    const spans = btn.querySelectorAll('span');
    if (spans.length > 1) spans[1].className = 'text-[#c94968] font-bold';
  }

  if (sizeSelect.options.length > idx) {
    sizeSelect.selectedIndex = idx;
  }
  recalculateOrderTotal();
}

// Render Flavors as clean horizontal clickable chips
function renderOrderFlavorChips(cake) {
  const container = document.getElementById('orderFlavorChipsContainer');
  const flavorSelect = document.getElementById('orderCakeFlavor');
  if (!container || !flavorSelect) return;

  const flavors = (cake.flavors && cake.flavors.length) ? cake.flavors : ['Signature Vanilla'];

  container.innerHTML = flavors.map((f, idx) => {
    const isSelected = idx === 0;
    return `
      <button type="button" 
              onclick="selectOrderFlavorChip('${escapeHtml(f).replace(/'/g, "\\'")}', this)" 
              class="order-flavor-chip px-3.5 py-1.5 rounded-full text-[11px] font-semibold border ${isSelected ? 'border-[#c94968] bg-rose-50 text-[#c94968] font-bold choice-glow-active' : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'}">
        ${escapeHtml(f)}
      </button>
    `;
  }).join('');

  if (flavorSelect.options.length > 0) {
    flavorSelect.selectedIndex = 0;
  }
}

// Select a Flavor Chip with Glow Animation
function selectOrderFlavorChip(flavor, btn) {
  const container = document.getElementById('orderFlavorChipsContainer');
  const flavorSelect = document.getElementById('orderCakeFlavor');
  if (!container || !flavorSelect) return;

  container.querySelectorAll('.order-flavor-chip').forEach(b => {
    b.className = 'order-flavor-chip px-3.5 py-1.5 rounded-full text-[11px] font-semibold border border-stone-200 bg-white text-stone-700 hover:border-stone-300';
  });

  if (btn) {
    btn.className = 'order-flavor-chip px-3.5 py-1.5 rounded-full text-[11px] font-semibold border border-[#c94968] bg-rose-50 text-[#c94968] font-bold choice-glow-active';
  }

  if (flavorSelect) {
    flavorSelect.value = flavor;
  }
}

// Render dynamic automatic inscription suggestions based on chosen cake category
function renderCategoryMessageSuggestions(category) {
  const container = document.getElementById('orderCategorySuggestionsContainer');
  if (!container) return;

  const suggestions = CATEGORY_MESSAGE_SUGGESTIONS[category] || CATEGORY_MESSAGE_SUGGESTIONS['default'];
  
  container.innerHTML = suggestions.map(text => `
    <button type="button" 
            onclick="applyMessageSuggestion('${escapeHtml(text).replace(/'/g, "\\'")}')" 
            class="suggestion-chip px-2.5 py-1 rounded-full text-[11px] font-semibold border border-rose-200/90 text-stone-600 bg-white hover:bg-rose-50 hover:border-rose-400 hover:text-rose-700 transition active:scale-95">
      ${escapeHtml(text)}
    </button>
  `).join('');
}

// Click suggested text to automatically populate the inscription input
function applyMessageSuggestion(text) {
  const input = document.getElementById('orderInscription');
  if (input) {
    input.value = text;
    input.focus();
    input.classList.add('ring-2', 'ring-rose-400');
    setTimeout(() => {
      input.classList.remove('ring-2', 'ring-rose-400');
    }, 400);
  }
}

// Dynamic Accessories Catalog (derives live from allCakes with fallback)
function getLiveAccessoriesCatalog() {
  if (apiDecorationsList && apiDecorationsList.length > 0) {
    return apiDecorationsList.map(item => {
      const fallback = ACCESSORY_CATALOG.find(a => a.id === item.id || a.name.toLowerCase() === item.name.toLowerCase());
      const isNumCandle = item.name.includes('Number') || (fallback && fallback.requiresAge);
      return {
        id: item.id,
        name: item.name,
        category: item.category || 'Candles & Toppers',
        subtitle: item.description || (fallback ? fallback.subtitle : 'Celebration accessory'),
        price: item.price || 0,
        image: item.image || (fallback ? fallback.image : '/images/hero-cake-only.jpg'),
        isSoldOut: item.inStock === false,
        recommendedCategories: item.recommendedCategories || (fallback ? fallback.recommendedCategories : ['Birthday Cakes', 'Couples', 'Anniversary']),
        requiresAge: Boolean(item.requiresAge !== undefined ? item.requiresAge : (fallback ? fallback.requiresAge : isNumCandle)),
        isRecommended: Boolean(item.isRecommended !== undefined ? item.isRecommended : (fallback ? fallback.isRecommended : true)),
        hasDetailPrompt: fallback ? fallback.hasDetailPrompt : false,
        promptLabel: fallback ? fallback.promptLabel : 'Custom instructions:',
        promptPlaceholder: fallback ? fallback.promptPlaceholder : 'e.g. Note or specifications'
      };
    });
  }
  const dynamicAccessories = allCakes.filter(c => c.category === 'Extra Decorations' || c.category === 'Cake Accessories');
  if (dynamicAccessories && dynamicAccessories.length > 0) {
    return dynamicAccessories.map(p => {
      const fallback = ACCESSORY_CATALOG.find(a => a.id === p.id || a.name.toLowerCase() === p.name.toLowerCase());
      return {
        id: p.id,
        name: p.name,
        category: p.category || 'Candles & Toppers',
        subtitle: p.description || (fallback ? fallback.subtitle : 'Celebration accessory'),
        price: p.price,
        image: p.image || (fallback ? fallback.image : '/images/hero-cake-only.jpg'),
        isSoldOut: Boolean(p.isSoldOut),
        recommendedCategories: Array.isArray(p.recommendedCategories) ? p.recommendedCategories : (fallback ? fallback.recommendedCategories : []),
        requiresAge: Boolean(p.requiresAge !== undefined ? p.requiresAge : (fallback ? fallback.requiresAge : false)),
        isRecommended: Boolean(p.isRecommended !== undefined ? p.isRecommended : (fallback ? fallback.isRecommended : true)),
        hasDetailPrompt: fallback ? fallback.hasDetailPrompt : false,
        promptLabel: fallback ? fallback.promptLabel : 'Custom instructions:',
        promptPlaceholder: fallback ? fallback.promptPlaceholder : 'e.g. Note or specifications'
      };
    });
  }
  return ACCESSORY_CATALOG;
}

// Check whether an accessory is recommended for a given cake category
function isItemRecommendedForCake(item, cakeCategory) {
  if (!item || !cakeCategory) return false;
  if (item.isRecommended === false) return false;

  const rawRecs = Array.isArray(item.recommendedCategories) ? item.recommendedCategories : [];
  const recCats = rawRecs.map(c => String(c).trim().toLowerCase());
  const normCakeCat = String(cakeCategory).trim().toLowerCase();

  // 1. Direct case-insensitive match
  if (recCats.includes(normCakeCat)) return true;

  // 2. Birthday Cake match
  if (normCakeCat.includes('birthday')) {
    if (recCats.some(c => c.includes('birthday'))) return true;
    if (item.name.toLowerCase().includes('birthday') || item.id === 'mak-acc-01' || item.id === 'mak-acc-02' || item.id === 'mak-acc-04' || item.id === 'mak-acc-05' || item.id === 'mak-acc-06' || item.id === 'mak-acc-12') return true;
  }

  // 3. Graduation Cake match
  if (normCakeCat.includes('grad')) {
    if (recCats.some(c => c.includes('grad'))) return true;
    if (item.id.includes('grad') || item.name.toLowerCase().includes('grad') || item.name.toLowerCase().includes('diploma')) return true;
  }

  // 4. Wedding Cake match
  if (normCakeCat.includes('wedding')) {
    if (recCats.some(c => c.includes('wedding'))) return true;
    if (item.id.includes('wed') || item.name.toLowerCase().includes('wedding') || item.name.toLowerCase().includes('bride') || item.id === 'mak-acc-10') return true;
  }

  // 5. Anniversary Cake & Couples Cake match
  if (normCakeCat.includes('anniversary') || normCakeCat.includes('couple')) {
    if (recCats.some(c => c.includes('anniversary') || c.includes('couple'))) return true;
    if (item.id.includes('ann') || item.id === 'mak-acc-01' || item.id === 'mak-acc-11' || item.name.toLowerCase().includes('anniversary') || item.name.toLowerCase().includes('heart')) return true;
  }

  // 6. Mini Cakes / Cupcakes / Cookies
  if (normCakeCat.includes('mini') && recCats.some(c => c.includes('mini'))) return true;
  if (normCakeCat.includes('cupcake') && recCats.some(c => c.includes('cupcake'))) return true;

  return false;
}

// Check if any selected accessory requires age input
function hasAgeRequiredAccessorySelected() {
  const catalog = getLiveAccessoriesCatalog();
  for (const accId in selectedOrderAccessories) {
    const item = catalog.find(a => a.id === accId);
    if (item && item.requiresAge) return true;
    if (accId === 'mak-acc-01' || accId === 'mak-acc-02' || accId === 'acc_number_candles' || accId === 'acc_bday_candles') {
      return true;
    }
  }
  return false;
}

// Toggle candle age prompt visibility immediately
function updateCandleAgePromptVisibility() {
  const promptCard = document.getElementById('candleAgePromptCard');
  if (!promptCard) return;

  const needsAge = hasAgeRequiredAccessorySelected();
  if (needsAge) {
    promptCard.classList.remove('hidden');
    const ageInput = document.getElementById('candleAgeInput');
    if (ageInput && candleAgeValue && ageInput.value != candleAgeValue) {
      ageInput.value = candleAgeValue;
    }
    const previewText = document.getElementById('candleAgePreviewText');
    const previewBox = document.getElementById('candleAgeRecommendationPreview');
    if (candleAgeValue) {
      if (previewText) previewText.innerHTML = `<span class="text-rose-700 font-extrabold">Selected:</span> Number Candle — <b>${candleAgeValue}</b>`;
      if (previewBox) previewBox.className = 'flex-1 min-w-0 p-2 rounded-xl bg-rose-50 border border-[#c94968] text-[11px] font-bold text-[#c94968] flex items-center gap-1.5 truncate shadow-2xs';
    } else {
      if (previewText) previewText.textContent = 'Enter age (1–120) for number candle';
      if (previewBox) previewBox.className = 'flex-1 min-w-0 p-2 rounded-xl bg-white/90 border border-rose-200/80 text-[11px] font-semibold text-stone-600 flex items-center gap-1.5 truncate shadow-2xs';
    }
  } else {
    promptCard.classList.add('hidden');
    const errorMsg = document.getElementById('candleAgeErrorMsg');
    if (errorMsg) errorMsg.classList.add('hidden');
  }
}

// Realtime candle age input handler & validation (1 to 120, whole number)
function onCandleAgeInput(rawVal) {
  const errorMsg = document.getElementById('candleAgeErrorMsg');
  const previewText = document.getElementById('candleAgePreviewText');
  const previewBox = document.getElementById('candleAgeRecommendationPreview');

  const trimmed = String(rawVal).trim();
  if (!trimmed) {
    candleAgeValue = '';
    if (errorMsg) errorMsg.classList.add('hidden');
    if (previewText) previewText.textContent = 'Enter age (1–120) for number candle';
    if (previewBox) previewBox.className = 'flex-1 min-w-0 p-2 rounded-xl bg-white/90 border border-rose-200/80 text-[11px] font-semibold text-stone-600 flex items-center gap-1.5 truncate shadow-2xs';
    syncCandleAgeToSelectedAccessories('');
    return;
  }

  const num = Number(trimmed);
  const isValid = Number.isInteger(num) && num >= 1 && num <= 120;

  if (isValid) {
    candleAgeValue = num;
    if (errorMsg) errorMsg.classList.add('hidden');
    if (previewText) {
      previewText.innerHTML = `<span class="text-rose-700 font-extrabold">Ready:</span> Number Candle — <b>${num}</b>`;
    }
    if (previewBox) {
      previewBox.className = 'flex-1 min-w-0 p-2 rounded-xl bg-rose-50 border border-[#c94968] text-[11px] font-bold text-[#c94968] flex items-center gap-1.5 truncate shadow-2xs';
    }
    syncCandleAgeToSelectedAccessories(num);
  } else {
    candleAgeValue = '';
    if (errorMsg) errorMsg.classList.remove('hidden');
    if (previewText) previewText.textContent = 'Age must be a whole number (1–120)';
    if (previewBox) {
      previewBox.className = 'flex-1 min-w-0 p-2 rounded-xl bg-stone-50 border border-stone-200 text-[11px] font-semibold text-stone-400 flex items-center gap-1.5 truncate';
    }
    syncCandleAgeToSelectedAccessories('');
  }
  recalculateOrderTotal();
}

// Sync age to any selected candle accessories requiring age
function syncCandleAgeToSelectedAccessories(age) {
  const catalog = getLiveAccessoriesCatalog();
  for (const accId in selectedOrderAccessories) {
    const item = catalog.find(a => a.id === accId);
    if ((item && item.requiresAge) || accId === 'mak-acc-01' || accId === 'acc_number_candles' || accId === 'mak-acc-02') {
      selectedOrderAccessories[accId].candleAge = age ? age : undefined;
      if (age) {
        selectedOrderAccessories[accId].displayName = `Number Candle — ${age}`;
      } else {
        selectedOrderAccessories[accId].displayName = item ? item.name : selectedOrderAccessories[accId].name;
      }
    }
  }
}

// Validate candle age before advancing to next step
function validateStep2CandleAge() {
  if (!hasAgeRequiredAccessorySelected()) return true;

  const ageInput = document.getElementById('candleAgeInput');
  const errorMsg = document.getElementById('candleAgeErrorMsg');
  const val = parseInt(candleAgeValue || (ageInput ? ageInput.value : ''), 10);

  if (isNaN(val) || val < 1 || val > 120) {
    if (errorMsg) errorMsg.classList.remove('hidden');
    if (ageInput) {
      ageInput.focus();
      ageInput.classList.add('ring-2', 'ring-rose-500', 'border-rose-500');
      setTimeout(() => {
        ageInput.classList.remove('ring-2', 'ring-rose-500');
      }, 1500);
    }
    return false;
  }

  if (errorMsg) errorMsg.classList.add('hidden');
  return true;
}

// Render clean product card HTML for an accessory
function renderAccessoryCardHtml(item, isRecommendedGroup) {
  const isSoldOut = Boolean(item.isSoldOut);
  const isSelected = !!selectedOrderAccessories[item.id] && !isSoldOut;
  const currentQty = isSelected ? (selectedOrderAccessories[item.id].qty || 1) : 1;
  const currentNote = isSelected ? (selectedOrderAccessories[item.id].note || '') : '';
  const itemTotal = item.price * currentQty;

  if (isSoldOut) {
    return `
      <div class="rounded-xl border border-stone-200 bg-stone-50 p-2 space-y-1.5 opacity-60 cursor-not-allowed select-none">
        <div class="flex items-center gap-2.5">
          <div class="w-5 h-5 rounded-md flex items-center justify-center shrink-0 border border-stone-300 bg-stone-200 text-stone-400">
            <i class="fa-solid fa-ban text-[9px]"></i>
          </div>
          <img src="${item.image}" alt="${escapeHtml(item.name)}" 
               class="w-10 h-10 rounded-lg object-cover shrink-0 grayscale border border-stone-200" 
               style="width: 40px; height: 40px; min-width: 40px; max-width: 40px; min-height: 40px; max-height: 40px;"
               onerror="this.src='/images/hero-cake-only.jpg'">
          <div class="flex-1 min-w-0 pr-1">
            <div class="flex items-center gap-1.5 flex-wrap">
              <h4 class="text-xs font-bold text-stone-500 leading-tight">${escapeHtml(item.name)}</h4>
              <span class="text-[9px] font-extrabold uppercase tracking-wider text-rose-700 bg-rose-100 px-1.5 py-0.2 rounded">
                Sold Out
              </span>
            </div>
            <p class="text-[10px] text-stone-400 leading-tight truncate mt-0.5">${escapeHtml(item.subtitle || 'Currently unavailable')}</p>
          </div>
          <div class="text-right shrink-0 whitespace-nowrap">
            <span class="text-[11px] font-semibold text-stone-400 line-through">${item.price.toLocaleString()} ETB</span>
          </div>
        </div>
      </div>
    `;
  }

  // Display name with custom age if candle age is entered
  let titleDisplay = escapeHtml(item.name);
  if (item.requiresAge && candleAgeValue && isSelected) {
    titleDisplay = `${escapeHtml(item.name)} <span class="text-[10px] text-[#c94968] font-bold bg-rose-100 px-1.5 py-0.2 rounded">Age: ${candleAgeValue}</span>`;
  }

  return `
    <div class="rounded-xl transition-all border ${isSelected ? 'border-[#c94968] bg-rose-50/25 shadow-2xs choice-glow-active' : 'border-stone-200/80 bg-white hover:border-stone-300'} p-2 space-y-1.5">
      <!-- Main Clickable Header Row -->
      <div class="flex items-center gap-2.5 cursor-pointer select-none" onclick="toggleStep2Accessory('${item.id}', event)">
        
        <!-- Styled Checkbox -->
        <div class="w-5 h-5 rounded-md flex items-center justify-center transition shrink-0 ${isSelected ? 'bg-[#c94968] text-white shadow-2xs' : 'border border-stone-300 hover:border-rose-400 bg-white'}">
          <i class="fa-solid fa-check text-[10px] ${isSelected ? 'block' : 'hidden'}"></i>
        </div>

        <!-- Thumbnail Image -->
        <img src="${item.image}" alt="${escapeHtml(item.name)}" 
             class="w-10 h-10 rounded-lg object-cover shrink-0 shadow-2xs border border-stone-100" 
             style="width: 40px; height: 40px; min-width: 40px; max-width: 40px; min-height: 40px; max-height: 40px;"
             onerror="this.src='/images/hero-cake-only.jpg'">

        <!-- Title & Subtitle -->
        <div class="flex-1 min-w-0 pr-1">
          <div class="flex items-center gap-1.5 flex-wrap">
            <h4 class="text-xs font-bold text-chocolate leading-tight">${titleDisplay}</h4>
            ${isRecommendedGroup ? `
              <span class="text-[9px] font-bold text-amber-700 bg-amber-50 border border-amber-200/80 px-1.5 py-0.2 rounded-full inline-flex items-center gap-0.5">
                <i class="fa-solid fa-star text-[8px] text-amber-500"></i> Recommended
              </span>
            ` : ''}
          </div>
          <p class="text-[10px] text-stone-400 leading-tight mt-0.5 truncate">${escapeHtml(item.subtitle)}</p>
        </div>

        <!-- Price Tag -->
        <div class="text-right shrink-0 whitespace-nowrap">
          <span class="text-xs font-bold text-[#c94968]">+${item.price.toLocaleString()} ETB</span>
        </div>

      </div>

      <!-- Customization Controls (Shown when checked) -->
      ${isSelected ? `
        <div class="pt-1.5 border-t border-rose-100 flex items-center justify-between gap-2 bg-rose-50/50 p-2 rounded-lg text-xs">
          <!-- Quantity Stepper -->
          <div class="flex items-center gap-1.5">
            <span class="text-[10px] font-bold text-stone-500">Qty:</span>
            <div class="inline-flex items-center bg-white rounded-md border border-rose-200">
              <button type="button" onclick="changeStep2AccessoryQty('${item.id}', -1)" class="w-6 h-6 flex items-center justify-center text-stone-600 hover:text-rose-600 font-bold transition">
                <i class="fa-solid fa-minus text-[9px]"></i>
              </button>
              <span class="w-6 text-center text-xs font-bold text-chocolate">${currentQty}</span>
              <button type="button" onclick="changeStep2AccessoryQty('${item.id}', 1)" class="w-6 h-6 flex items-center justify-center text-stone-600 hover:text-rose-600 font-bold transition">
                <i class="fa-solid fa-plus text-[9px]"></i>
              </button>
            </div>
            <span class="text-[10px] text-[#c94968] font-bold">= ${itemTotal.toLocaleString()} ETB</span>
          </div>

          <!-- Age reminder badge or detail prompt -->
          ${item.requiresAge ? `
            <div class="flex items-center gap-1 text-[11px] font-bold text-stone-600">
              <i class="fa-solid fa-cake-candles text-rose-500 text-[10px]"></i>
              <span class="text-[10px] ${candleAgeValue ? 'text-[#c94968]' : 'text-amber-700 italic'}">
                ${candleAgeValue ? `Age: ${candleAgeValue}` : 'Please enter age above'}
              </span>
            </div>
          ` : (item.hasDetailPrompt ? `
            <div class="flex-1 min-w-[120px]">
              <input type="text" 
                     value="${escapeHtml(currentNote)}" 
                     placeholder="${escapeHtml(item.promptPlaceholder)}" 
                     oninput="updateStep2AccessoryNote('${item.id}', this.value)"
                     class="w-full text-[11px] px-2 py-1 rounded-md border border-rose-200 bg-white focus:outline-none focus:border-rose-400 placeholder:text-stone-400"
                     title="${escapeHtml(item.promptLabel)}">
            </div>
          ` : '')}
        </div>
      ` : ''}

    </div>
  `;
}

// ============================================================
// STEP 2: DYNAMIC ACCESSORIES LIST (RECOMMENDED & ALL GROUPS)
// ============================================================

function renderStep2AccessoriesList() {
  const container = document.getElementById('step2AccessoriesContainer');
  const badge = document.getElementById('step2AccessoriesTotalBadge');
  if (!container) return;

  const currentCategory = selectedCakeForOrder ? selectedCakeForOrder.category : 'Birthday Cakes';
  const catalog = getLiveAccessoriesCatalog();

  // Auto-remove any selected item that became sold out
  catalog.forEach(item => {
    if (item.isSoldOut && selectedOrderAccessories[item.id]) {
      delete selectedOrderAccessories[item.id];
    }
  });

  // Calculate total accessories cost
  let totalAccessoriesCost = 0;
  Object.values(selectedOrderAccessories).forEach(item => {
    totalAccessoriesCost += (item.price || 0) * (item.qty || 1);
  });

  if (badge) {
    badge.textContent = `+${totalAccessoriesCost.toLocaleString()} ETB`;
  }

  // Partition into GROUP 1 (Recommended for Your Cake) and GROUP 2 (All Extra Decorations)
  const recommendedItems = catalog.filter(item => isItemRecommendedForCake(item, currentCategory));
  const otherItems = catalog.filter(item => !recommendedItems.some(r => r.id === item.id));

  let html = '';

  // GROUP 1: Recommended for Your Cake (Always appears FIRST)
  if (recommendedItems.length > 0) {
    html += `
      <div class="space-y-2">
        <div class="p-2.5 rounded-2xl bg-gradient-to-r from-rose-50 via-white to-rose-50/60 border border-rose-200/90 shadow-2xs">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#c94968] text-white shadow-2xs">
                <i class="fa-solid fa-star text-[9px] text-amber-300"></i>
                <span>Recommended for Your Cake</span>
              </span>
            </div>
            <span class="text-[9px] font-extrabold text-[#c94968] bg-rose-100/90 px-2 py-0.5 rounded-full border border-rose-200">
              ${escapeHtml(currentCategory)}
            </span>
          </div>
          <p class="text-[11px] text-stone-600 font-medium mt-1">Complete your cake with these matching extras!</p>
        </div>

        <div class="space-y-1.5">
          ${recommendedItems.map(item => renderAccessoryCardHtml(item, true)).join('')}
        </div>
      </div>
    `;
  }

  // GROUP 2: All Extra Decorations
  if (otherItems.length > 0) {
    html += `
      <div class="space-y-2 pt-2">
        <div class="pt-2.5 pb-1 border-t border-stone-200/80 flex items-center justify-between">
          <div>
            <h5 class="text-xs font-bold text-chocolate flex items-center gap-1.5">
              <i class="fa-solid fa-wand-magic-sparkles text-amber-500 text-[11px]"></i>
              <span>All Extra Decorations</span>
            </h5>
            <p class="text-[10px] text-stone-400">Browse and select additional extras to customize your cake.</p>
          </div>
          <span class="text-[10px] font-bold text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">${otherItems.length} items</span>
        </div>

        <div class="space-y-1.5">
          ${otherItems.map(item => renderAccessoryCardHtml(item, false)).join('')}
        </div>
      </div>
    `;
  }

  container.innerHTML = html;

  updateCandleAgePromptVisibility();
  recalculateOrderTotal();
}

function toggleStep2Accessory(id, event) {
  if (event && (event.target.closest('button') || event.target.tagName === 'INPUT')) return;

  const catalog = getLiveAccessoriesCatalog();
  const item = catalog.find(a => a.id === id);
  if (!item || item.isSoldOut) return;

  if (selectedOrderAccessories[id]) {
    delete selectedOrderAccessories[id];
  } else {
    const isAgeReq = Boolean(item.requiresAge) || id === 'mak-acc-01' || id === 'mak-acc-02' || id === 'acc_number_candles';
    selectedOrderAccessories[id] = {
      id: item.id,
      name: item.name,
      displayName: (isAgeReq && candleAgeValue) ? `Number Candle — ${candleAgeValue}` : item.name,
      price: item.price,
      qty: 1,
      note: '',
      candleAge: (isAgeReq && candleAgeValue) ? candleAgeValue : undefined,
      requiresAge: isAgeReq,
      image: item.image
    };
  }

  renderStep2AccessoriesList();

  // If selecting an age candle without an entered age, focus the age input
  if (selectedOrderAccessories[id] && selectedOrderAccessories[id].requiresAge && !candleAgeValue) {
    setTimeout(() => {
      const ageInput = document.getElementById('candleAgeInput');
      if (ageInput) ageInput.focus();
    }, 150);
  }
}

function changeStep2AccessoryQty(id, delta) {
  if (!selectedOrderAccessories[id]) return;
  const current = selectedOrderAccessories[id].qty || 1;
  const newQty = Math.max(1, Math.min(20, current + delta));
  selectedOrderAccessories[id].qty = newQty;
  renderStep2AccessoriesList();
}

function updateStep2AccessoryNote(id, note) {
  if (!selectedOrderAccessories[id]) return;
  selectedOrderAccessories[id].note = note.trim();
}

// Legacy helpers mapped for compatibility
function openAccessoriesModal() {
  goToOrderStep(2);
}
function closeAccessoriesModal() {
  const modal = document.getElementById('accessoriesModal');
  if (modal) modal.classList.add('hidden');
}
function saveAndCloseAccessoriesModal() {
  closeAccessoriesModal();
  recalculateOrderTotal();
}
function renderAccessoriesModalList() {
  renderStep2AccessoriesList();
}

// ============================================================
// STEP 3: QUICK DATE & TIME SELECTION
// ============================================================

function initQuickDateAndTimes() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const todayStr = `${yyyy}-${mm}-${dd}`;

  const dateInput = document.getElementById('orderDate');
  if (dateInput) {
    dateInput.min = todayStr;
  }

  // Populate the 7-day dropdown options
  populateWeekdayDropdownOptions();

  // Default to Tomorrow, do not auto-scroll on initial load
  setQuickDate('tomorrow', false);
  setQuickTime('Afternoon');
}

function setQuickDate(type, autoScroll = true) {
  selectedQuickDateType = type;
  const btnToday = document.getElementById('quickDateToday');
  const btnTomorrow = document.getElementById('quickDateTomorrow');
  const selectChooseDay = document.getElementById('chooseDaySelect');
  const dateInput = document.getElementById('orderDate');

  [btnToday, btnTomorrow, selectChooseDay].forEach(btn => {
    if (btn) {
      btn.classList.remove('active');
      btn.classList.remove('choice-glow-active');
    }
  });

  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');

  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tYyyy = tomorrow.getFullYear();
  const tMm = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const tDd = String(tomorrow.getDate()).padStart(2, '0');

  let activeBtn = null;
  if (type === 'today') {
    if (btnToday) {
      btnToday.classList.add('active');
      activeBtn = btnToday;
    }
    if (selectChooseDay) {
      selectChooseDay.value = '';
    }
    if (dateInput) dateInput.value = `${yyyy}-${mm}-${dd}`;
    const todayFormatted = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const preview = document.getElementById('selectedDayTextPreview');
    if (preview) preview.textContent = `Today (${todayFormatted})`;
    const summary = document.getElementById('selectedFullDateSummary');
    if (summary) summary.textContent = `Delivery scheduled for: Today, ${todayFormatted}`;
    if (autoScroll) scrollToTimeOfDay();
  } else if (type === 'tomorrow') {
    if (btnTomorrow) {
      btnTomorrow.classList.add('active');
      activeBtn = btnTomorrow;
    }
    if (selectChooseDay) {
      selectChooseDay.value = '';
    }
    if (dateInput) dateInput.value = `${tYyyy}-${tMm}-${tDd}`;
    const tomFormatted = tomorrow.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const preview = document.getElementById('selectedDayTextPreview');
    if (preview) preview.textContent = `Tomorrow (${tomFormatted})`;
    const summary = document.getElementById('selectedFullDateSummary');
    if (summary) summary.textContent = `Delivery scheduled for: Tomorrow, ${tomFormatted}`;
    if (autoScroll) scrollToTimeOfDay();
  }

  if (activeBtn) {
    activeBtn.classList.add('choice-glow-active');
    setTimeout(() => activeBtn.classList.remove('choice-glow-active'), 400);
  }
}

function setQuickTime(slot) {
  selectedQuickTimeSlot = slot;
  const btnM = document.getElementById('quickTimeMorning');
  const btnA = document.getElementById('quickTimeAfternoon');
  const btnE = document.getElementById('quickTimeEvening');
  const timeSelect = document.getElementById('orderTime');

  [btnM, btnA, btnE].forEach(btn => {
    if (btn) {
      btn.classList.remove('active');
      btn.classList.remove('choice-glow-active');
    }
  });

  let activeBtn = null;
  if (slot === 'Morning' && btnM) {
    btnM.classList.add('active');
    activeBtn = btnM;
  }
  if (slot === 'Afternoon' && btnA) {
    btnA.classList.add('active');
    activeBtn = btnA;
  }
  if (slot === 'Evening' && btnE) {
    btnE.classList.add('active');
    activeBtn = btnE;
  }

  if (activeBtn) {
    activeBtn.classList.add('choice-glow-active');
    setTimeout(() => activeBtn.classList.remove('choice-glow-active'), 400);
  }

  if (timeSelect) timeSelect.value = slot;
}

function validateStep3() {
  const nameInput = document.getElementById('orderCustomerName');
  const phoneInput = document.getElementById('orderPhoneNumber');
  const dateInput = document.getElementById('orderDate');

  const customerName = nameInput ? nameInput.value.trim() : '';
  const phoneNumber = phoneInput ? phoneInput.value.trim() : '';
  const deliveryDate = dateInput ? dateInput.value : '';

  if (!customerName) {
    showAlert('Please enter your full name.', 'error');
    if (nameInput) nameInput.focus();
    return false;
  }

  if (!phoneNumber || phoneNumber.length < 8) {
    showAlert('Please enter a valid phone number (e.g. 0911 234 567).', 'error');
    if (phoneInput) phoneInput.focus();
    return false;
  }

  if (!deliveryDate) {
    showAlert('Please select when you need the cake.', 'error');
    if (dateInput) dateInput.focus();
    return false;
  }

  const alertEl = document.getElementById('orderFormAlert');
  if (alertEl) alertEl.classList.add('hidden');
  return true;
}

function validateStep4() {
  return validateStep3();
}

function validateStep4AndProceed() {
  if (validateStep4()) {
    goToOrderStep(5);
  }
}

function validateStep3AndProceed() {
  validateStep4AndProceed();
}

// ============================================================
// STEP 5: ORDER PREVIEW & REVIEW (MOVED TO STEP 5)
// ============================================================

function populateOrderReviewSummary() {
  const cakeSelect = document.getElementById('orderCakeSelect');
  const sizeSelect = document.getElementById('orderCakeSize');
  const flavorSelect = document.getElementById('orderCakeFlavor');
  const qtyInput = document.getElementById('orderQuantity');
  const inscriptionInput = document.getElementById('orderInscription');
  const nameInput = document.getElementById('orderCustomerName');
  const phoneInput = document.getElementById('orderPhoneNumber');
  const dateInput = document.getElementById('orderDate');
  const timeSelect = document.getElementById('orderTime');

  const selectedCake = allCakes.find(c => c.id === (cakeSelect ? cakeSelect.value : '')) || allCakes[0];
  const sizeOption = sizeSelect && sizeSelect.options[sizeSelect.selectedIndex];
  const sizeName = sizeOption ? sizeOption.getAttribute('data-name') : 'Standard';
  const unitPrice = parseFloat(sizeSelect ? sizeSelect.value : (selectedCake ? selectedCake.price : 3000));
  const qty = parseInt(qtyInput ? qtyInput.value : 1, 10) || 1;
  const flavor = flavorSelect ? flavorSelect.value : 'Signature';
  const inscription = inscriptionInput ? inscriptionInput.value.trim() : '';

  // Populate Cake Review Info
  const imgEl = document.getElementById('reviewCakeImg');
  if (imgEl && selectedCake) imgEl.src = selectedCake.image || '/images/hero-cake-only.jpg';

  const catEl = document.getElementById('reviewCakeCategory');
  if (catEl && selectedCake) catEl.textContent = selectedCake.category || 'Cake';

  const qtyEl = document.getElementById('reviewCakeQty');
  if (qtyEl) qtyEl.textContent = `Qty: ${qty}`;

  const nameEl = document.getElementById('reviewCakeName');
  if (nameEl && selectedCake) nameEl.textContent = selectedCake.name;

  const specsEl = document.getElementById('reviewCakeSpecs');
  if (specsEl) specsEl.textContent = `${sizeName} • ${flavor}`;

  const priceEl = document.getElementById('reviewCakePrice');
  if (priceEl) priceEl.textContent = `${(unitPrice * qty).toLocaleString()} ETB`;

  // Inscription
  const inscEl = document.getElementById('reviewCakeInscription');
  if (inscEl) {
    if (inscription) {
      inscEl.textContent = `"${inscription}"`;
      inscEl.className = 'font-bold text-chocolate italic';
    } else {
      inscEl.textContent = 'None requested';
      inscEl.className = 'font-normal text-stone-400 italic';
    }
  }

  // Accessories Review List
  const accListContainer = document.getElementById('reviewAccessoriesList');
  const selectedAccessories = Object.values(selectedOrderAccessories);
  let accessoriesTotal = 0;

  if (accListContainer) {
    if (selectedAccessories.length > 0) {
      accListContainer.innerHTML = selectedAccessories.map(acc => {
        const itemTotal = acc.price * (acc.qty || 1);
        accessoriesTotal += itemTotal;
        const displayName = acc.candleAge ? `Number Candle — ${acc.candleAge}` : (acc.displayName || acc.name);
        return `
          <div class="flex items-center justify-between text-xs py-1 border-b border-stone-100 last:border-none">
            <div class="flex items-center gap-1.5 min-w-0">
              <i class="fa-solid fa-sparkles text-[#c94968] text-[10px]"></i>
              <span class="font-bold text-chocolate">${escapeHtml(displayName)}</span>
              <span class="text-rose-600 font-bold">x${acc.qty || 1}</span>
              ${acc.note ? `<span class="text-stone-400 italic truncate max-w-[130px]">("${escapeHtml(acc.note)}")</span>` : ''}
            </div>
            <span class="font-bold text-chocolate shrink-0">+${itemTotal.toLocaleString()} ETB</span>
          </div>
        `;
      }).join('');
    } else {
      accListContainer.innerHTML = `
        <div class="text-[11px] text-stone-400 flex items-center justify-between">
          <span>No extra decorations added.</span>
          <button type="button" onclick="goToOrderStep(2)" class="text-[#c94968] hover:underline font-bold">+ Add Extra Decorations</button>
        </div>
      `;
    }
  }

  // Customer & Schedule Review Info
  const custNameEl = document.getElementById('reviewCustomerName');
  if (custNameEl) custNameEl.textContent = nameInput ? nameInput.value.trim() : 'Customer';

  const custPhoneEl = document.getElementById('reviewPhoneNumber');
  if (custPhoneEl) custPhoneEl.textContent = phoneInput ? phoneInput.value.trim() : '';

  const delivDateEl = document.getElementById('reviewDeliveryDate');
  if (delivDateEl) {
    const rawDate = dateInput ? dateInput.value : '';
    if (selectedQuickDateType === 'today') {
      delivDateEl.textContent = `Today (${rawDate})`;
    } else if (selectedQuickDateType === 'tomorrow') {
      delivDateEl.textContent = `Tomorrow (${rawDate})`;
    } else {
      delivDateEl.textContent = rawDate || 'Chosen Date';
    }
  }

  // Populate Live Payment Method & Accounts in Step 5 Review
  const paymentDetailsEl = document.getElementById('reviewPaymentDetails');
  if (paymentDetailsEl) {
    paymentDetailsEl.innerHTML = getPaymentAccountsHtml();
  }

  const delivTimeEl = document.getElementById('reviewDeliveryTime');
  if (delivTimeEl) delivTimeEl.textContent = timeSelect ? timeSelect.value : selectedQuickTimeSlot;

  // Grand Total Calculation
  const grandTotal = (unitPrice * qty) + accessoriesTotal;
  const grandTotalEl = document.getElementById('reviewGrandTotal');
  if (grandTotalEl) grandTotalEl.textContent = `${grandTotal.toLocaleString()} ETB`;

  const paymentGrandTotalEl = document.getElementById('paymentGrandTotal');
  if (paymentGrandTotalEl) paymentGrandTotalEl.textContent = `${grandTotal.toLocaleString()} ETB`;

  const calculatedTotal = document.getElementById('orderCalculatedTotal');
  if (calculatedTotal) calculatedTotal.textContent = `${grandTotal.toLocaleString()} ETB`;

  // Synchronize Step 6 payment breakdown card & options
  if (typeof updatePaymentOptionBreakdown === 'function') {
    updatePaymentOptionBreakdown();
  }
}

// Recalculate Live Total in ETB (including cake size and any selected accessories)
function recalculateOrderTotal() {
  const sizeSelect = document.getElementById('orderCakeSize');
  const qtyInput = document.getElementById('orderQuantity');
  const totalDisplay = document.getElementById('orderCalculatedTotal');
  const badgeDisplay = document.getElementById('orderCakePriceBadge');

  const unitPrice = parseFloat(sizeSelect ? sizeSelect.value : (selectedCakeForOrder ? selectedCakeForOrder.price : 3000));
  const qty = parseInt(qtyInput ? qtyInput.value : 1, 10) || 1;

  let accessoriesTotal = 0;
  if (selectedOrderAccessories) {
    Object.values(selectedOrderAccessories).forEach(item => {
      accessoriesTotal += (item.price || 0) * (item.qty || 1);
    });
  }

  const total = (unitPrice * qty) + accessoriesTotal;

  if (totalDisplay) totalDisplay.textContent = `${total.toLocaleString()} ETB`;
  if (badgeDisplay) badgeDisplay.textContent = `${unitPrice.toLocaleString()} ETB`;

  if (typeof updatePaymentOptionBreakdown === 'function') {
    updatePaymentOptionBreakdown();
  }
}

// Setup Event Listeners for Order Form
function setupOrderFormListeners() {
  const cakeSelect = document.getElementById('orderCakeSelect');
  if (cakeSelect) {
    cakeSelect.addEventListener('change', () => {
      updateOrderCakeOptions();
    });
  }

  const sizeSelect = document.getElementById('orderCakeSize');
  if (sizeSelect) {
    sizeSelect.addEventListener('change', () => {
      recalculateOrderTotal();
    });
  }

  // Quantity buttons
  const btnDec = document.getElementById('btnDecreaseQty');
  const btnInc = document.getElementById('btnIncreaseQty');
  const qtyInput = document.getElementById('orderQuantity');

  if (btnDec && btnInc && qtyInput) {
    btnDec.addEventListener('click', () => {
      let val = parseInt(qtyInput.value, 10) || 1;
      if (val > 1) {
        qtyInput.value = val - 1;
        recalculateOrderTotal();
      }
    });

    btnInc.addEventListener('click', () => {
      let val = parseInt(qtyInput.value, 10) || 1;
      if (val < 20) {
        qtyInput.value = val + 1;
        recalculateOrderTotal();
      }
    });
  }
}

function setDefaultOrderDate() {
  initQuickDateAndTimes();
}

// Payment Account 1-Click Clipboard Copy Helper
function copyPaymentDetail(text, btnElement) {
  if (!text) return;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text);
  } else {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
  if (btnElement) {
    const originalHtml = btnElement.innerHTML;
    btnElement.innerHTML = '<i class="fa-solid fa-check text-emerald-600"></i><span>Copied!</span>';
    btnElement.classList.add('bg-emerald-50', 'border-emerald-300', 'text-emerald-800');
    setTimeout(() => {
      btnElement.innerHTML = originalHtml;
      btnElement.classList.remove('bg-emerald-50', 'border-emerald-300', 'text-emerald-800');
    }, 2000);
  }
}

// Helper to generate CBE and Telebirr bank accounts HTML with copy buttons
function getPaymentAccountsHtml() {
  const payments = (activeBusinessSettings && activeBusinessSettings.payments) || {};
  const cbe = payments.cbe;
  const telebirr = payments.telebirr;
  let paymentHtml = '';

  if (telebirr && telebirr.enabled) {
    paymentHtml += `
      <div class="flex items-center justify-between p-2 rounded-lg bg-sky-50 border border-sky-200">
        <div class="flex items-center gap-2.5">
          <img src="/images/telebirr-logo.png" alt="Telebirr" class="w-7 h-7 rounded-lg object-contain bg-white p-0.5 border border-sky-200 shadow-2xs shrink-0" onerror="this.onerror=null; this.src='https://upload.wikimedia.org/wikipedia/en/a/a4/Telebirr.png';">
          <div>
            <span class="font-bold text-chocolate block leading-tight">${escapeHtml(telebirr.name || 'Telebirr')}</span>
            <span class="text-[10px] text-stone-500">${escapeHtml(telebirr.accountHolder || '')}</span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="font-mono font-bold text-sky-800 text-xs">${escapeHtml(telebirr.accountNumber || '')}</span>
          <button type="button" onclick="copyPaymentDetail('${escapeHtml(telebirr.accountNumber || '')}', this)" class="px-2 py-1 rounded-md bg-white hover:bg-sky-100 text-sky-800 border border-sky-300 text-[10px] font-bold flex items-center gap-1 transition shadow-2xs cursor-pointer">
            <i class="fa-regular fa-copy"></i>
            <span>Copy</span>
          </button>
        </div>
      </div>
    `;
  }

  if (cbe && cbe.enabled) {
    paymentHtml += `
      <div class="flex items-center justify-between p-2 rounded-lg bg-purple-50 border border-purple-200">
        <div class="flex items-center gap-2.5">
          <img src="/images/cbe-logo.png" alt="CBE" class="w-7 h-7 rounded-lg object-contain bg-white p-0.5 border border-purple-200 shadow-2xs shrink-0" onerror="this.onerror=null; this.src='https://play-lh.googleusercontent.com/OnO5ce1wjlp7B5Sx9aX29cr85C5aJdqoKwJ9YPEjPbaACr0daPOZQ1b-L8w9plUMR1p0NVkRkDAbS0_8eSn46A';">
          <div>
            <span class="font-bold text-chocolate block leading-tight">${escapeHtml(cbe.name || 'Commercial Bank of Ethiopia')}</span>
            <span class="text-[10px] text-stone-500">${escapeHtml(cbe.accountHolder || '')}</span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="font-mono font-bold text-purple-900 text-xs">${escapeHtml(cbe.accountNumber || '')}</span>
          <button type="button" onclick="copyPaymentDetail('${escapeHtml(cbe.accountNumber || '')}', this)" class="px-2 py-1 rounded-md bg-white hover:bg-purple-100 text-purple-900 border border-purple-300 text-[10px] font-bold flex items-center gap-1 transition shadow-2xs cursor-pointer">
            <i class="fa-regular fa-copy"></i>
            <span>Copy</span>
          </button>
        </div>
      </div>
    `;
  }

  // Additional / Custom Payment Methods configured in Admin (e.g. Abyssinia, Awash, Dashen, etc.)
  const customMethods = Array.isArray(payments.customMethods) ? payments.customMethods.filter(m => m.enabled !== false) : [];
  customMethods.forEach(m => {
    const iconClass = m.icon || 'fa-building-columns';
    paymentHtml += `
      <div class="flex items-center justify-between p-2 rounded-lg bg-rose-50/70 border border-rose-200/80">
        <div class="flex items-center gap-2.5 min-w-0">
          <div class="w-7 h-7 rounded-lg bg-white border border-rose-200 text-[#c94968] flex items-center justify-center shrink-0 shadow-2xs">
            <i class="fa-solid ${escapeHtml(iconClass)} text-xs"></i>
          </div>
          <div class="min-w-0">
            <span class="font-bold text-chocolate block leading-tight truncate text-[11px]">${escapeHtml(m.name)}</span>
            <span class="text-[10px] text-stone-500 block truncate">${escapeHtml(m.accountHolder || '')}</span>
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <span class="font-mono font-bold text-[#c94968] text-xs">${escapeHtml(m.accountNumber || '')}</span>
          <button type="button" onclick="copyPaymentDetail('${escapeHtml(m.accountNumber || '')}', this)" class="px-2 py-1 rounded-md bg-white hover:bg-rose-100 text-[#c94968] border border-rose-300 text-[10px] font-bold flex items-center gap-1 transition shadow-2xs cursor-pointer">
            <i class="fa-regular fa-copy"></i>
            <span>Copy</span>
          </button>
        </div>
      </div>
    `;
  });

  if (!paymentHtml) {
    paymentHtml = `
      <div class="p-2 rounded-lg bg-stone-100 text-stone-600 text-center font-medium">
        💵 Cash on Delivery / In-Store Pickup
      </div>
    `;
  }
  return paymentHtml;
}

// Toggle Option for Another Payment Method / Bank in Step 6
function toggleAnotherPaymentMethodOption() {
  const container = document.getElementById('anotherPaymentMethodContainer');
  const chevron = document.getElementById('anotherPaymentMethodChevron');
  if (!container) return;
  const isHidden = container.classList.contains('hidden');
  if (isHidden) {
    container.classList.remove('hidden');
    if (chevron) chevron.classList.add('rotate-180');
  } else {
    container.classList.add('hidden');
    if (chevron) chevron.classList.remove('rotate-180');
  }
}

// Toggle Optional Bank Details for Payment on Delivery
function toggleDeliveryBankDetails() {
  const card = document.getElementById('deliveryBankDetailsCard');
  const chevron = document.getElementById('deliveryBankDetailsChevron');
  const list = document.getElementById('deliveryPaymentAccountsList');
  if (!card) return;
  const isCurrentlyHidden = card.classList.contains('hidden');
  if (isCurrentlyHidden) {
    if (list) list.innerHTML = getPaymentAccountsHtml();
    card.classList.remove('hidden');
    if (chevron) chevron.classList.add('rotate-180');
  } else {
    card.classList.add('hidden');
    if (chevron) chevron.classList.remove('rotate-180');
  }
}

// ============================================================
// STEP 6: 3-CHOICE PAYMENT SYSTEM (FULL / HALF / DELIVERY)
// ============================================================
let selectedPaymentOption = null; // null | 'full' | 'half' | 'delivery'

function selectPaymentOption(opt) {
  selectedPaymentOption = (opt === 'half' || opt === 'delivery' || opt === 'full') ? opt : null;

  // Update button visual styles
  const btnFull = document.getElementById('payOptionBtnFull');
  const btnHalf = document.getElementById('payOptionBtnHalf');
  const btnDelivery = document.getElementById('payOptionBtnDelivery');

  const fullActiveClass = 'pay-option-toggle p-2 sm:p-2.5 rounded-2xl border-2 text-center transition flex flex-col items-center justify-center gap-1.5 border-[#c94968] bg-rose-50/90 text-chocolate shadow-xs cursor-pointer';
  const halfActiveClass = 'pay-option-toggle p-2 sm:p-2.5 rounded-2xl border-2 text-center transition flex flex-col items-center justify-center gap-1.5 border-amber-500 bg-amber-50/90 text-chocolate shadow-xs cursor-pointer';
  const deliveryActiveClass = 'pay-option-toggle p-2 sm:p-2.5 rounded-2xl border-2 text-center transition flex flex-col items-center justify-center gap-1.5 border-emerald-500 bg-emerald-50/90 text-chocolate shadow-xs cursor-pointer';
  const inactiveClass = 'pay-option-toggle p-2 sm:p-2.5 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1.5 border-stone-200 bg-white hover:bg-stone-50 text-stone-600 cursor-pointer';

  if (btnFull) btnFull.className = selectedPaymentOption === 'full' ? fullActiveClass : inactiveClass;
  if (btnHalf) btnHalf.className = selectedPaymentOption === 'half' ? halfActiveClass : inactiveClass;
  if (btnDelivery) btnDelivery.className = selectedPaymentOption === 'delivery' ? deliveryActiveClass : inactiveClass;

  // Reveal details container with smooth ease-in / fade-and-slide animation
  const container = document.getElementById('selectedPaymentDetailsContainer');
  if (container) {
    if (selectedPaymentOption) {
      const wasHidden = container.classList.contains('hidden');
      container.classList.remove('hidden');
      if (wasHidden) {
        container.classList.remove('anim-fade-slide');
        void container.offsetWidth; // Force reflow to re-trigger smooth animation
        container.classList.add('anim-fade-slide');
      }
    } else {
      container.classList.add('hidden');
    }
  }

  updatePaymentOptionBreakdown();
}

function updatePaymentOptionBreakdown() {
  const container = document.getElementById('selectedPaymentDetailsContainer');
  const sizeSelect = document.getElementById('orderCakeSize');
  const qtyInput = document.getElementById('orderQuantity');
  const unitPrice = parseFloat(sizeSelect ? sizeSelect.value : (selectedCakeForOrder ? selectedCakeForOrder.price : 3000));
  const qty = parseInt(qtyInput ? qtyInput.value : 1, 10) || 1;

  let accessoriesTotal = 0;
  if (selectedOrderAccessories) {
    Object.values(selectedOrderAccessories).forEach(item => {
      accessoriesTotal += (item.price || 0) * (item.qty || 1);
    });
  }

  const grandTotal = (unitPrice * qty) + accessoriesTotal;
  const halfTotal = Math.round(grandTotal / 2);

  // Update visible price numbers on the 3 plan selector buttons
  const btnPayFull = document.getElementById('btnPayFullAmount');
  const btnPayHalf = document.getElementById('btnPayHalfAmount');
  const btnPayDelivery = document.getElementById('btnPayDeliveryAmount');
  if (btnPayFull) btnPayFull.textContent = `${grandTotal.toLocaleString()} ETB`;
  if (btnPayHalf) btnPayHalf.textContent = `${halfTotal.toLocaleString()} ETB`;
  if (btnPayDelivery) btnPayDelivery.textContent = `${grandTotal.toLocaleString()} ETB`;

  const breakdownCard = document.getElementById('paymentBreakdownCard');
  const totalBadgeLabel = document.getElementById('paymentTotalBadgeLabel');
  const paymentGrandTotalEl = document.getElementById('paymentGrandTotal');
  const paymentSection = document.getElementById('reviewPaymentSection');
  const receiptSection = document.getElementById('reviewReceiptSection');
  const deliveryToggleSection = document.getElementById('deliveryBankDetailsToggleSection');
  const submitText = document.getElementById('btnSubmitOrderText');

  if (!selectedPaymentOption) {
    if (container) container.classList.add('hidden');
    if (totalBadgeLabel) totalBadgeLabel.textContent = 'Total Due';
    if (paymentGrandTotalEl) paymentGrandTotalEl.textContent = `${grandTotal.toLocaleString()} ETB`;
    if (submitText) submitText.textContent = 'Select a Payment Plan';
    return;
  }

  if (selectedPaymentOption === 'full') {
    if (totalBadgeLabel) totalBadgeLabel.textContent = 'Pay Now';
    if (paymentGrandTotalEl) paymentGrandTotalEl.textContent = `${grandTotal.toLocaleString()} ETB`;
    if (paymentSection) paymentSection.classList.remove('hidden');
    if (receiptSection) receiptSection.classList.remove('hidden');
    if (deliveryToggleSection) deliveryToggleSection.classList.add('hidden');
    if (submitText) submitText.textContent = 'Submit Order & Payment ✨';

    const receiptInstructions = document.getElementById('receiptSectionInstructions');
    if (receiptInstructions) {
      receiptInstructions.innerHTML = `Please transfer full amount (<strong>${grandTotal.toLocaleString()} ETB</strong>) to our CBE or Telebirr account above and attach your transaction screenshot below:`;
    }

    if (breakdownCard) {
      breakdownCard.innerHTML = `
        <div class="flex items-center justify-between text-stone-600">
          <span>Total Order Value:</span>
          <span class="font-bold text-chocolate">${grandTotal.toLocaleString()} ETB</span>
        </div>
        <div class="flex items-center justify-between font-bold text-chocolate pt-1 border-t border-stone-200/70">
          <span>Amount to Transfer Now:</span>
          <span class="text-[#c94968] font-extrabold text-xs sm:text-sm">${grandTotal.toLocaleString()} ETB (100%)</span>
        </div>
        <p class="text-[10px] text-stone-400 mt-0.5">Please transfer the full amount to CBE or Telebirr below and attach screenshot.</p>
      `;
    }
  } else if (selectedPaymentOption === 'half') {
    const halfAmount = Math.round(grandTotal / 2);
    const remainingBalance = grandTotal - halfAmount;

    if (totalBadgeLabel) totalBadgeLabel.textContent = '50% Deposit';
    if (paymentGrandTotalEl) paymentGrandTotalEl.textContent = `${halfAmount.toLocaleString()} ETB`;
    if (paymentSection) paymentSection.classList.remove('hidden');
    if (receiptSection) receiptSection.classList.remove('hidden');
    if (deliveryToggleSection) deliveryToggleSection.classList.add('hidden');
    if (submitText) submitText.textContent = 'Submit Order & 50% Deposit ✨';

    const receiptInstructions = document.getElementById('receiptSectionInstructions');
    if (receiptInstructions) {
      receiptInstructions.innerHTML = `Please transfer the 50% deposit (<strong>${halfAmount.toLocaleString()} ETB</strong>) to our CBE or Telebirr account above and attach your transaction screenshot below:`;
    }

    if (breakdownCard) {
      breakdownCard.innerHTML = `
        <div class="flex items-center justify-between text-stone-600">
          <span>Total Cake & Accessories:</span>
          <span class="font-bold text-chocolate">${grandTotal.toLocaleString()} ETB</span>
        </div>
        <div class="flex items-center justify-between font-bold text-chocolate pt-1 border-t border-stone-200/70">
          <span>Amount to Pay Now (50% Deposit):</span>
          <span class="text-[#c94968] font-extrabold text-xs sm:text-sm">${halfAmount.toLocaleString()} ETB</span>
        </div>
        <div class="flex items-center justify-between text-stone-600 font-semibold">
          <span>Remaining 50%:</span>
          <span class="text-chocolate font-bold">${remainingBalance.toLocaleString()} ETB</span>
        </div>
        <div class="p-2 mt-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-semibold flex items-center gap-1.5">
          <i class="fa-solid fa-circle-info text-amber-600 shrink-0"></i>
          <span>The remaining 50% must be paid after your cake is delivered.</span>
        </div>
      `;
    }
  } else if (selectedPaymentOption === 'delivery') {
    if (totalBadgeLabel) totalBadgeLabel.textContent = 'Due on Delivery';
    if (paymentGrandTotalEl) paymentGrandTotalEl.textContent = `${grandTotal.toLocaleString()} ETB`;
    if (paymentSection) paymentSection.classList.add('hidden');
    if (receiptSection) receiptSection.classList.add('hidden');
    if (deliveryToggleSection) deliveryToggleSection.classList.remove('hidden');

    // Collapse delivery bank details initially
    const deliveryCard = document.getElementById('deliveryBankDetailsCard');
    const deliveryChevron = document.getElementById('deliveryBankDetailsChevron');
    if (deliveryCard) deliveryCard.classList.add('hidden');
    if (deliveryChevron) deliveryChevron.classList.remove('rotate-180');

    if (submitText) submitText.textContent = 'Place Order (Payment on Delivery) ✨';

    if (breakdownCard) {
      breakdownCard.innerHTML = `
        <div class="flex items-center justify-between font-bold text-chocolate">
          <span>Full Amount Due on Delivery:</span>
          <span class="text-[#c94968] font-extrabold text-xs sm:text-sm">${grandTotal.toLocaleString()} ETB</span>
        </div>
        <div class="p-2.5 mt-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-[11px] font-semibold flex items-start gap-2">
          <i class="fa-solid fa-circle-check text-emerald-600 shrink-0 text-sm mt-0.5"></i>
          <span class="leading-relaxed">You can place your order now and pay when your cake is delivered. You can pay directly in cash or through a bank transfer.</span>
        </div>
      `;
    }
  }
}

// Payment Receipt Upload State & Event Handlers
let currentPaymentReceiptDataUrl = null;

async function handlePaymentReceiptSelected(event) {
  const file = event.target.files && event.target.files[0];
  const previewCard = document.getElementById('receiptPreviewCard');
  const previewThumb = document.getElementById('receiptPreviewThumb');
  const previewName = document.getElementById('receiptPreviewName');
  const previewSize = document.getElementById('receiptPreviewSize');
  const errorBanner = document.getElementById('receiptErrorBanner');

  if (errorBanner) errorBanner.classList.add('hidden');

  if (!file) {
    clearSelectedPaymentReceipt();
    return;
  }

  // File size limit (15MB raw input before compression)
  if (file.size > 15 * 1024 * 1024) {
    if (errorBanner) {
      errorBanner.textContent = 'Screenshot exceeds 15MB limit. Please choose a smaller image.';
      errorBanner.classList.remove('hidden');
    }
    event.target.value = '';
    clearSelectedPaymentReceipt();
    return;
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    if (errorBanner) {
      errorBanner.textContent = 'Only authentic JPEG, PNG, or WebP receipts are accepted.';
      errorBanner.classList.remove('hidden');
    }
    event.target.value = '';
    clearSelectedPaymentReceipt();
    return;
  }

  // Compress receipt on-device using Canvas (< 50KB WebP)
  try {
    let compressedUrl = null;
    if (window.FirebaseService && typeof window.FirebaseService.compressImage === 'function') {
      compressedUrl = await window.FirebaseService.compressImage(file, 900, 0.80);
    }
    
    if (!compressedUrl) {
      compressedUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    }

    currentPaymentReceiptDataUrl = compressedUrl;
    if (previewCard && previewThumb) {
      previewThumb.src = currentPaymentReceiptDataUrl;
      if (previewName) previewName.textContent = file.name;
      const approxKb = (compressedUrl.length * 0.75 / 1024).toFixed(1);
      if (previewSize) previewSize.textContent = `${approxKb} KB (Optimized)`;
      previewCard.classList.remove('hidden');
    }
  } catch (err) {
    console.error('Receipt compression error:', err);
    if (errorBanner) {
      errorBanner.textContent = 'Could not process receipt image. Please try another screenshot.';
      errorBanner.classList.remove('hidden');
    }
  }
}

function clearSelectedPaymentReceipt() {
  currentPaymentReceiptDataUrl = null;
  const input = document.getElementById('orderPaymentReceiptInput');
  if (input) input.value = '';
  const previewCard = document.getElementById('receiptPreviewCard');
  if (previewCard) previewCard.classList.add('hidden');
  const previewThumb = document.getElementById('receiptPreviewThumb');
  if (previewThumb) previewThumb.src = '';
  const errorBanner = document.getElementById('receiptErrorBanner');
  if (errorBanner) errorBanner.classList.add('hidden');
}

// ------------------------------------------------------------
// PAYMENT APPROVAL MONITORING & DYNAMIC MODAL STATES
// "Thank You!" appears ONLY when payment is approved.
// In pending payment, shows "Payment Under Review" with NO timer.
// ------------------------------------------------------------
let activeApprovalPollInterval = null;

function getOwnerContactNumbers() {
  const primary = activeBusinessSettings?.contact?.primaryPhone || '+251 91 123 4567';
  const secondary = activeBusinessSettings?.contact?.secondaryPhone || '+251 92 234 5678';
  return {
    primary,
    secondary,
    cleanPrimary: primary.replace(/[^0-9+]/g, ''),
    cleanSecondary: secondary ? secondary.replace(/[^0-9+]/g, '') : ''
  };
}

let approvalCountdownTimer = null;
let approvalCountdownSeconds = 15 * 60; // 900 seconds (15:00)

function start15MinApprovalCountdown() {
  stop15MinApprovalCountdown();
  approvalCountdownSeconds = 15 * 60;
  const countdownEl = document.getElementById('pendingApprovalCountdown');
  const countdownCard = document.getElementById('confirmCountdownCard');
  if (countdownCard) countdownCard.classList.remove('hidden');

  function updateDisplay() {
    if (!countdownEl) return;
    const mins = Math.floor(approvalCountdownSeconds / 60);
    const secs = approvalCountdownSeconds % 60;
    countdownEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  updateDisplay();

  approvalCountdownTimer = setInterval(() => {
    if (approvalCountdownSeconds > 0) {
      approvalCountdownSeconds--;
      updateDisplay();
    } else {
      stop15MinApprovalCountdown();
      if (countdownEl) countdownEl.textContent = '00:00';
    }
  }, 1000);
}

function stop15MinApprovalCountdown() {
  if (approvalCountdownTimer) {
    clearInterval(approvalCountdownTimer);
    approvalCountdownTimer = null;
  }
  const countdownCard = document.getElementById('confirmCountdownCard');
  if (countdownCard) countdownCard.classList.add('hidden');
}

function stopPaymentApprovalCountdown() {
  stop15MinApprovalCountdown();
  if (activeApprovalPollInterval) {
    clearInterval(activeApprovalPollInterval);
    activeApprovalPollInterval = null;
  }
}

function setConfirmationModalPendingState(orderId, details = {}) {
  // 1. Header Icon: Animated Loop Waiting Animation (Dual amber pulsing ripple rings, smooth spinning ring, and flipping hourglass)
  const iconEl = document.getElementById('confirmHeaderIcon');
  if (iconEl) {
    iconEl.innerHTML = `
      <!-- Dual Pulsing Ripple Rings -->
      <div class="waiting-ripple" style="width: 76px; height: 76px;"></div>
      <div class="waiting-ripple-2" style="width: 76px; height: 76px;"></div>

      <!-- Outer Amber Ring with Rotating Spinner Border -->
      <div class="w-20 h-20 rounded-full border-[3px] border-amber-200 border-t-amber-500 bg-amber-50 flex items-center justify-center shadow-md anim-waiting-spin relative z-10">
      </div>
      <!-- Inner Disc with Flipping Hourglass -->
      <div class="w-13 h-13 rounded-full bg-amber-100 flex items-center justify-center absolute z-20 shadow-inner">
        <i class="fa-solid fa-hourglass-half text-amber-700 text-xl anim-waiting-flip"></i>
      </div>
    `;
  }

  // 2. Headline: Payment Under Review (NOT "Thank You!")
  const headlineEl = document.getElementById('confirmHeadlineText');
  if (headlineEl) headlineEl.textContent = 'Payment Under Review';

  // 3. Subtitle: Your payment is under review. Please wait for confirmation.
  const subEl = document.getElementById('confirmSubtitleText');
  if (subEl) subEl.textContent = 'Your payment is under review. Please wait for confirmation.';

  // 4. Status Badge on Cake Card: Under Review (amber)
  const badgeContainer = document.getElementById('confirmStatusBadgeContainer');
  const badgeIcon = document.getElementById('confirmStatusBadgeIcon');
  const badgeText = document.getElementById('confirmStatusBadgeText');
  if (badgeContainer) {
    badgeContainer.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-300 shadow-2xs';
  }
  if (badgeIcon) {
    badgeIcon.className = 'fa-solid fa-clock text-[11px] text-amber-600';
  }
  if (badgeText) {
    badgeText.textContent = 'Under Review';
  }

  // 5. Start 15-Minute Countdown Timer
  start15MinApprovalCountdown();

  // 6. Clean simple layout: HIDE the redundant yellow alert box below the card!
  const payAlertEl = document.getElementById('confirmPaymentReviewAlert');
  if (payAlertEl) {
    payAlertEl.innerHTML = '';
    payAlertEl.className = 'hidden';
    payAlertEl.style.display = 'none';
  }

  // 7. Show 15-Minute Reassurance Notice Card
  const noticeCard = document.getElementById('confirm15MinNoticeCard');
  if (noticeCard) {
    noticeCard.classList.remove('hidden');
    noticeCard.style.display = 'block';
  }
}

function setConfirmationModalApprovedState(order, details = {}) {
  // Stop countdown and hide countdown card when approved
  stop15MinApprovalCountdown();

  // Hide 15-minute notice card upon approval
  const noticeCard = document.getElementById('confirm15MinNoticeCard');
  if (noticeCard) {
    noticeCard.classList.add('hidden');
    noticeCard.style.display = 'none';
  }

  // 1. Header Icon: Celebration Green Checkmark with Animated Ripple Rings!
  const iconEl = document.getElementById('confirmHeaderIcon');
  if (iconEl) {
    iconEl.innerHTML = `
      <!-- Dual Pulsing Ripple Rings -->
      <div class="checkmark-ripple" style="width: 76px; height: 76px;"></div>
      <div class="checkmark-ripple-2" style="width: 76px; height: 76px;"></div>

      <!-- Outer Mint Ring with green outline & Celebratory Pop Animation -->
      <div class="w-20 h-20 rounded-full border-[3px] border-[#22c55e] bg-[#edfbf3] flex items-center justify-center shadow-md anim-check-pop relative z-10">
        <!-- Inner Disc -->
        <div class="w-13 h-13 rounded-full bg-[#a7f3d0]/75 flex items-center justify-center">
          <!-- Bold Rounded Checkmark Icon with Smooth Pulse -->
          <svg class="w-8 h-8 text-[#16a34a] animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      </div>
    `;
  }

  // 2. Headline: Thank You! (Only when approved!)
  const headlineEl = document.getElementById('confirmHeadlineText');
  if (headlineEl) headlineEl.textContent = 'Thank You!';

  // 3. Subtitle: Your order has been submitted successfully.
  const subEl = document.getElementById('confirmSubtitleText');
  if (subEl) subEl.textContent = 'Your order has been submitted successfully.';

  // 4. Status Badge on Cake Card: Order Placed / Confirmed (green)
  const badgeContainer = document.getElementById('confirmStatusBadgeContainer');
  const badgeIcon = document.getElementById('confirmStatusBadgeIcon');
  const badgeText = document.getElementById('confirmStatusBadgeText');
  if (badgeContainer) {
    badgeContainer.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ecfdf5] text-[#16a34a] text-xs font-bold border border-[#bbf7d0] shadow-2xs';
  }
  if (badgeIcon) {
    badgeIcon.className = 'fa-solid fa-circle-check text-[11px] text-[#16a34a]';
  }
  if (badgeText) {
    badgeText.textContent = (order?.status === 'Confirmed') ? 'Order Confirmed' : 'Order Placed';
  }

  // 5. Box below card: Green Payment Approved card (matching reference screenshot)
  const payAlertEl = document.getElementById('confirmPaymentReviewAlert');
  if (payAlertEl) {
    payAlertEl.style.display = 'block';
    const isDelivery = (order?.paymentOption === 'delivery' || details.paymentOption === 'delivery');
    const isHalf = (order?.paymentOption === 'half' || details.paymentOption === 'half');
    const totalPrice = (order?.totalPrice || details.totalPrice || 0);
    const dueAmt = order?.amountDueOnDelivery != null ? order.amountDueOnDelivery : (details.amountDueOnDelivery != null ? details.amountDueOnDelivery : Math.round(totalPrice / 2));

    payAlertEl.className = 'mt-3.5 p-3.5 rounded-2xl bg-[#ecfdf5] border border-[#bbf7d0] text-emerald-950 text-xs anim-text-in text-left space-y-1 block';

    if (isDelivery) {
      payAlertEl.innerHTML = `
        <div class="flex items-center gap-2 font-bold text-sm text-[#16a34a]">
          <i class="fa-solid fa-circle-check text-[#16a34a] text-base"></i>
          <span>Order Confirmed!</span>
        </div>
        <div class="mt-1 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200">
          <i class="fa-solid fa-truck-fast text-amber-700 text-xs"></i>
          <span>Payment Will Be Made After Delivery</span>
        </div>
        <p class="text-[11px] text-stone-600 leading-relaxed mt-1.5">
          Payment Method: <strong>Pay on Delivery / Pickup</strong>.<br>
          Full amount of <strong>${totalPrice.toLocaleString()} ETB</strong> will be collected after your cake is delivered.
        </p>
      `;
    } else if (isHalf) {
      payAlertEl.innerHTML = `
        <div class="flex items-center gap-2 font-bold text-sm text-[#16a34a]">
          <i class="fa-solid fa-circle-check text-[#16a34a] text-base"></i>
          <span>Payment Approved! Your order has been successfully confirmed.</span>
        </div>
        <p class="text-[11px] text-emerald-800 leading-relaxed font-semibold">
          Your 50% deposit has been verified by the owner! The remaining 50% must be paid after your cake is delivered. (Remaining balance: <strong>${(dueAmt || 0).toLocaleString()} ETB</strong>)
        </p>
      `;
    } else {
      payAlertEl.innerHTML = `
        <div class="flex items-center gap-2 font-bold text-sm text-[#16a34a]">
          <i class="fa-solid fa-circle-check text-[#16a34a] text-base"></i>
          <span>Payment Approved! Your order has been successfully confirmed.</span>
        </div>
        <p class="text-[11px] text-emerald-800 leading-relaxed">
          Your full payment has been verified by the owner! Your cake order is now officially confirmed and scheduled for baking.
        </p>
      `;
    }
  }

  // 6. Celebration Glow & Satisfying Animation on the Order Confirmed Card!
  const cakeCard = document.getElementById('confirmCakeCard');
  if (cakeCard) {
    cakeCard.classList.remove('border-slate-200/80');
    cakeCard.classList.add('border-emerald-300', 'ring-4', 'ring-emerald-100', 'bg-emerald-50/15', 'shadow-md', 'transition-all', 'duration-500');
  }

  // Trigger celebration confetti shower on approval!
  if (typeof launchOrderConfetti === 'function') {
    launchOrderConfetti();
  }
}

function startPaymentApprovalMonitoring(orderId, details = {}) {
  stopPaymentApprovalCountdown();

  // Set initial pending review state (NO timer, NO Thank You yet!)
  setConfirmationModalPendingState(orderId, details);

  // Poll backend every 3 seconds for status transition to Confirmed
  async function pollStatus() {
    try {
      const cleanRef = encodeURIComponent(String(orderId).replace(/^#/, '').toUpperCase());
      const res = await fetch(`/api/order/${cleanRef}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.order && data.order.status !== 'Pending' && data.order.status !== 'New') {
          // Status changed from Pending -> Switch to Approved "Thank You!" state!
          stopPaymentApprovalCountdown();
          setConfirmationModalApprovedState(data.order, details);
        }
      }
    } catch (e) {
      // background poll catch
    }
  }

  activeApprovalPollInterval = setInterval(pollStatus, 3000);
}

async function pollOrderApprovalStatusDirect(orderId, btn) {
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin text-stone-400"></i> Checking...';
  }
  try {
    const cleanRef = encodeURIComponent(String(orderId).replace(/^#/, '').toUpperCase());
    const res = await fetch(`/api/order/${cleanRef}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.order) {
        if (data.order.status !== 'Pending' && data.order.status !== 'New') {
          stopPaymentApprovalCountdown();
          setConfirmationModalApprovedState(data.order, { paymentOption: data.order.paymentOption });
          return;
        }
      }
    }
  } catch (e) {}
  if (btn) {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-arrows-rotate text-stone-500"></i> Refresh Status';
  }
}

// Public Live Order Status Tracking
async function searchLiveOrderStatus() {
  const input = document.getElementById('trackOrderSearchInput');
  const container = document.getElementById('liveTrackResultCard');
  if (!input || !container) return;

  const rawVal = input.value.trim();
  if (!rawVal) {
    container.innerHTML = `
      <div class="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
        Please enter an order reference (e.g. MAK-A3F8E1C9-7B2D4F0E).
      </div>
    `;
    container.classList.remove('hidden');
    return;
  }

  const cleanRef = encodeURIComponent(rawVal.replace(/^#/, '').toUpperCase());
  container.innerHTML = `
    <div class="text-xs text-stone-500 flex items-center justify-center gap-2 py-3">
      <i class="fa-solid fa-spinner fa-spin text-[#c94968]"></i>
      <span>Looking up live order status...</span>
    </div>
  `;
  container.classList.remove('hidden');

  try {
    const res = await fetch(`/api/order/${cleanRef}`);
    const data = await res.json();

    if (res.ok && data.success && data.order) {
      const o = data.order;
      const statusSteps = ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Completed'];
      const currentIdx = statusSteps.indexOf(o.status);
      const isCancelled = o.status === 'Cancelled';

      let stepHtml = '';
      if (isCancelled) {
        stepHtml = `
          <div class="p-3 bg-rose-50 rounded-xl border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
            <i class="fa-solid fa-circle-xmark text-base"></i>
            <span>This order was marked as Cancelled.</span>
          </div>
        `;
      } else {
        stepHtml = `
          <div class="grid grid-cols-5 gap-1 text-center pt-2">
            ${statusSteps.map((st, i) => {
              const isPastOrCurrent = currentIdx !== -1 && i <= currentIdx;
              const isCurrent = i === currentIdx;
              return `
                <div class="flex flex-col items-center">
                  <div class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${isCurrent ? 'bg-[#c94968] text-white ring-4 ring-rose-100 shadow' : (isPastOrCurrent ? 'bg-emerald-500 text-white' : 'bg-stone-200 text-stone-500')}">
                    ${isPastOrCurrent && !isCurrent ? '✓' : (i + 1)}
                  </div>
                  <span class="text-[9px] font-bold mt-1 block truncate w-full ${isCurrent ? 'text-[#c94968]' : (isPastOrCurrent ? 'text-emerald-700' : 'text-stone-400')}">${st}</span>
                </div>
              `;
            }).join('')}
          </div>
        `;
      }

      container.innerHTML = `
        <div class="space-y-2.5">
          <div class="flex items-center justify-between border-b border-stone-100 pb-2">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="font-mono font-bold text-xs text-chocolate">#${escapeHtml(o.orderId)}</span>
              <span class="text-[10px] px-2 py-0.5 rounded-full font-bold ${o.status === 'Pending' ? 'bg-amber-100 text-amber-800 border border-amber-200' : (o.status === 'Confirmed' ? 'bg-blue-100 text-blue-800 border border-blue-200' : (o.status === 'Preparing' ? 'bg-purple-100 text-purple-800 border border-purple-200' : (o.status === 'Ready' ? 'bg-teal-100 text-teal-800 border border-teal-200' : (o.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-rose-100 text-rose-800 border border-rose-200'))))}">
                ${escapeHtml(o.status)}
              </span>
            </div>
            <span class="font-extrabold text-sm text-[#c94968]">${(o.totalPrice || 0).toLocaleString()} ETB</span>
          </div>

          <div class="text-xs space-y-0.5">
            <p class="font-bold text-chocolate">${escapeHtml(o.cakeName)} (${escapeHtml(o.size)})</p>
            <p class="text-[11px] text-stone-500">Needed by: <strong>${escapeHtml(o.deliveryDate)}</strong> (${escapeHtml(o.deliveryTime || 'Flexible')})</p>
            ${o.inscription ? `<p class="text-[10px] text-[#c94968] italic font-medium">"${escapeHtml(o.inscription)}"</p>` : ''}
          </div>

          <!-- Dynamic Payment Review / Approval Banner with 10-Min Countdown -->
          ${(() => {
            const contacts = getOwnerContactNumbers();
            if (o.status === 'Pending') {
              if (o.paymentOption === 'delivery') {
                return `
                  <div class="p-2.5 rounded-xl border text-[11px] bg-emerald-50 border-emerald-200 text-emerald-900">
                    <div class="flex items-center gap-1.5 font-bold">
                      <i class="fa-solid fa-truck-fast text-emerald-600"></i>
                      <span>Order Placed — Payment on Delivery</span>
                    </div>
                    <p class="text-[10px] mt-0.5 text-emerald-800">
                      Full total of ${(o.totalPrice || 0).toLocaleString()} ETB will be paid upon delivery/pickup.
                    </p>
                  </div>
                `;
              }

              // Full or Half payment with screenshot
              // Full or Half payment with screenshot (Clean Review State, NO countdown timer)
              return `
                <div class="p-3 rounded-xl border text-[11px] bg-amber-50 border-amber-300 text-amber-950 space-y-1.5">
                  <div class="flex items-center gap-1.5 font-bold text-amber-900">
                    <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                    <span>Your payment is under review. Please wait for confirmation.</span>
                  </div>
                  <p class="text-[10px] text-amber-900 leading-relaxed">
                    ${o.paymentOption === 'half'
                      ? `50% deposit screenshot (${(o.amountPaidNow || 0).toLocaleString()} ETB) is under review. The remaining 50% must be paid after your cake is delivered.`
                      : `Full payment screenshot (${(o.totalPrice || 0).toLocaleString()} ETB) is being verified by our bakery owner.`}
                  </p>
                  <div class="pt-1 text-[10px] text-stone-600 border-t border-amber-200/70 flex items-center justify-between flex-wrap gap-1">
                    <span>Questions? Call us:</span>
                    <a href="tel:${contacts.cleanPrimary}" class="font-bold text-[#c94968] underline">${escapeHtml(contacts.primary)}</a>
                  </div>
                </div>
              `;
            } else if (o.status === 'Cancelled') {
              return `
                <div class="p-2.5 rounded-xl border text-[11px] bg-rose-50 border-rose-200 text-rose-800">
                  <div class="flex items-center gap-1.5 font-bold">
                    <i class="fa-solid fa-circle-xmark text-rose-600"></i>
                    <span>Order Cancelled</span>
                  </div>
                  <p class="text-[10px] mt-0.5 text-rose-700">This order has been cancelled.</p>
                </div>
              `;
            } else if (o.paymentOption === 'delivery' || o.isDelivery || (o.paymentDetails && o.paymentDetails.method === 'Pay on Delivery / Pickup')) {
              return `
                <div class="p-2.5 rounded-xl border text-[11px] bg-amber-50 border-amber-200 text-amber-900">
                  <div class="flex items-center gap-1.5 font-bold">
                    <i class="fa-solid fa-truck-fast text-amber-700"></i>
                    <span>Payment Will Be Made After Delivery</span>
                  </div>
                  <p class="text-[10px] mt-0.5 text-amber-800">
                    Order confirmed. Full amount of ${(o.totalPrice || 0).toLocaleString()} ETB will be paid upon delivery / pickup.
                  </p>
                </div>
              `;
            } else {
              // Approved / Confirmed / Preparing / Ready / Completed for Advance Payments
              return `
                <div class="p-2.5 rounded-xl border text-[11px] bg-emerald-50 border-emerald-200 text-emerald-900">
                  <div class="flex items-center gap-1.5 font-bold">
                    <i class="fa-solid fa-circle-check text-emerald-600"></i>
                    <span>Payment Approved! Your order has been successfully confirmed.</span>
                  </div>
                  <p class="text-[10px] mt-0.5 text-emerald-800">
                    ${o.paymentOption === 'half'
                      ? `50% deposit (${(o.amountPaidNow || 0).toLocaleString()} ETB) verified! The remaining 50% must be paid after your cake is delivered. (Remaining balance: ${(o.amountDueOnDelivery || 0).toLocaleString()} ETB)`
                      : `Full payment of ${(o.totalPrice || 0).toLocaleString()} ETB verified & approved!`}
                  </p>
                </div>
              `;
            }
          })()}

          <!-- Step Progression -->
          ${stepHtml}
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="text-xs text-rose-700 bg-rose-50 p-3 rounded-xl border border-rose-200 flex items-center gap-2">
          <i class="fa-solid fa-triangle-exclamation text-sm shrink-0"></i>
          <span>${escapeHtml(data.error || 'Order reference not found. Please check your reference string.')}</span>
        </div>
      `;
    }
  } catch (err) {
    container.innerHTML = `
      <div class="text-xs text-rose-700 bg-rose-50 p-3 rounded-xl border border-rose-200">
        Connection error looking up order. Please verify your connection.
      </div>
    `;
  }
}

// Direct Order Submission to Backend -> LocalStorage sync
async function submitOrderForm() {
  const alertEl = document.getElementById('orderFormAlert');
  if (alertEl) alertEl.className = 'hidden';

  const cakeSelect = document.getElementById('orderCakeSelect');
  const sizeSelect = document.getElementById('orderCakeSize');
  const flavorSelect = document.getElementById('orderCakeFlavor');
  const qtyInput = document.getElementById('orderQuantity');
  const inscriptionInput = document.getElementById('orderInscription');
  const nameInput = document.getElementById('orderCustomerName');
  const phoneInput = document.getElementById('orderPhoneNumber');
  const dateInput = document.getElementById('orderDate');
  const timeSelect = document.getElementById('orderTime');
  const locationInput = document.getElementById('orderCustomerLocation');
  const specialNotesInput = document.getElementById('orderSpecialInstructions');

  // Validation
  const customerName = nameInput.value.trim();
  const phoneNumber = phoneInput.value.trim();
  const deliveryDate = dateInput.value;

  if (!customerName || !phoneNumber || !deliveryDate) {
    goToOrderStep(4);
    showAlert('Please provide your name, phone number, and delivery date.', 'error');
    return;
  }

  if (!selectedPaymentOption) {
    goToOrderStep(6);
    showAlert('Please select a payment plan (Full Payment, Half Payment, or Payment on Delivery) to proceed.', 'error');
    return;
  }

  if (selectedPaymentOption !== 'delivery' && !currentPaymentReceiptDataUrl) {
    goToOrderStep(6);
    showAlert('Please attach your payment transfer screenshot in Step 6 before submitting.', 'error');
    const input = document.getElementById('orderPaymentReceiptInput');
    if (input) input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const selectedCake = allCakes.find(c => c.id === cakeSelect.value) || allCakes[0];
  const sizeOption = sizeSelect.options[sizeSelect.selectedIndex];
  const sizeName = sizeOption ? sizeOption.getAttribute('data-name') : 'Standard';
  const unitPrice = parseFloat(sizeSelect.value || selectedCake.price);
  const quantity = parseInt(qtyInput.value || 1, 10);

  // Selected Accessories & Party Add-ons
  const accessoriesList = Object.values(selectedOrderAccessories).map(a => ({
    id: a.id,
    name: a.name,
    displayName: a.candleAge ? `Number Candle — ${a.candleAge}` : (a.displayName || a.name),
    price: a.price,
    qty: a.qty || 1,
    note: a.note || '',
    candleAge: a.candleAge || (a.requiresAge && candleAgeValue ? candleAgeValue : undefined),
    totalPrice: (a.price || 0) * (a.qty || 1)
  }));
  const accessoriesTotal = accessoriesList.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalPrice = (unitPrice * quantity) + accessoriesTotal;

  // Calculate payment breakdown based on selected option
  let amountPaidNow = 0;
  let amountDueOnDelivery = 0;
  if (selectedPaymentOption === 'full') {
    amountPaidNow = totalPrice;
    amountDueOnDelivery = 0;
  } else if (selectedPaymentOption === 'half') {
    amountPaidNow = Math.round(totalPrice / 2);
    amountDueOnDelivery = totalPrice - amountPaidNow;
  } else if (selectedPaymentOption === 'delivery') {
    amountPaidNow = 0;
    amountDueOnDelivery = totalPrice;
  }

  // Full detailed order information sent to server -> Telegram
  const payload = {
    customerName,
    phoneNumber,
    cakeId: selectedCake.id,
    cakeName: selectedCake.name,
    cakeImage: selectedCake.image || '/images/hero-cake-only.jpg',
    category: selectedCake.category || 'Cake',
    cakeCategory: selectedCake.category || 'Cake',
    size: sizeName,
    flavor: flavorSelect.value || 'Signature',
    inscription: inscriptionInput.value.trim(),
    quantity,
    unitPrice,
    totalPrice,
    paymentOption: selectedPaymentOption,
    amountPaidNow,
    amountDueOnDelivery,
    accessories: accessoriesList,
    accessoriesTotal,
    candleAge: candleAgeValue || undefined,
    deliveryDate,
    deliveryTime: timeSelect.value || selectedQuickTimeSlot,
    customerLocation: locationInput ? locationInput.value.trim() : '',
    specialInstructions: specialNotesInput ? specialNotesInput.value.trim() : '',
    selectedPaymentMethod: (() => {
      if (selectedPaymentOption === 'delivery') return 'Pay on Delivery / Pickup';
      const bankEl = document.getElementById('customerSelectedBank');
      const refEl = document.getElementById('customerPaymentRefInput');
      const bankVal = bankEl ? bankEl.value : 'Bank / Mobile Transfer';
      const refVal = refEl ? refEl.value.trim() : '';
      return refVal ? `${bankVal} (Ref: ${refVal})` : bankVal;
    })(),
    paymentScreenshot: selectedPaymentOption === 'delivery' ? null : currentPaymentReceiptDataUrl
  };

  // Submit button loading state
  const submitBtn = document.getElementById('btnSubmitOrder');
  const submitText = document.getElementById('btnSubmitOrderText');
  const submitSpinner = document.getElementById('btnSubmitOrderSpinner');

  if (submitBtn) submitBtn.disabled = true;
  if (submitText) submitText.textContent = 'Transmitting Order...';
  if (submitSpinner) submitSpinner.classList.remove('hidden');

  try {
    let data = null;

    // 1. Cloud Firestore Write (Spark Free Tier)
    if (window.FirebaseService && window.FirebaseService.isAvailable()) {
      try {
        const generatedId = 'ORD-' + Math.floor(10000 + Math.random() * 90000);
        const fsPayload = {
          ...payload,
          id: generatedId,
          createdAt: new Date().toISOString(),
          status: 'Pending',
          paymentVerification: (selectedPaymentOption === 'delivery') ? 'verified' : (currentPaymentReceiptDataUrl ? 'review_pending' : 'pending')
        };
        const fsResult = await window.FirebaseService.saveOrder(fsPayload);
        if (fsResult && fsResult.success) {
          data = {
            success: true,
            orderId: fsResult.orderId,
            status: 'Pending',
            source: 'firestore'
          };
        }
      } catch (fsErr) {
        console.warn('Firestore write warning, checking local server fallback:', fsErr);
      }
    }

    // 2. Dual-mode fallback to local server (if available in development)
    if (!data) {
      try {
        const res = await fetch('/api/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          data = await res.json();
        }
      } catch (apiErr) {
        console.warn('Server API order submit warning:', apiErr);
      }
    }

    // 3. Resilient fallback for static hosting / offline
    if (!data) {
      const fallbackOrderId = 'ORD-' + Math.floor(10000 + Math.random() * 90000);
      data = {
        success: true,
        orderId: fallbackOrderId,
        status: (selectedPaymentOption === 'delivery') ? 'Confirmed' : 'Pending',
        source: 'client_store'
      };
    }

    if (data && data.success) {
      // Clear attached receipt after successful placement
      clearSelectedPaymentReceipt();

      // Save order to LocalStorage for "My Orders" order history & editing
      const orderRecord = {
        orderId: data.orderId,
        datePlaced: new Date().toISOString(),
        status: data.status || 'Pending',
        ...payload
      };
      saveOrderToLocalStorage(orderRecord);
      updateMyOrdersCountBadge();

      // Close order modal and open confirmation receipt
      closeOrderModal();
      showOrderConfirmation(payload, data);
    } else {
      showAlert((data && data.error) || 'Failed to submit order. Please try again.', 'error');
    }
  } catch (err) {
    console.error('Submission error:', err);
    showAlert('Network error communicating with bakery server. Please verify your connection.', 'error');
  } finally {
    if (submitBtn) submitBtn.disabled = false;
    if (submitText) submitText.textContent = 'Confirm & Place Order ✨';
    if (submitSpinner) submitSpinner.classList.add('hidden');
  }
}

function showAlert(message, type) {
  const alertEl = document.getElementById('orderFormAlert');
  if (!alertEl) return;
  alertEl.textContent = message;
  alertEl.classList.remove('hidden');
  if (type === 'error') {
    alertEl.className = 'mx-5 mt-3 p-3 rounded-xl text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 block';
  } else {
    alertEl.className = 'mx-5 mt-3 p-3 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 block';
  }
}

// ============================================================
// MY ORDERS: ORDER HISTORY & MANAGEMENT SYSTEM (LOCALSTORAGE)
// ============================================================

const STORAGE_KEY_ORDERS = 'mak_cake_customer_orders';

function getCustomerOrders() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_ORDERS);
    const orders = data ? JSON.parse(data) : [];
    // Only active (non-cancelled) orders belong in the cart/orders list
    const activeOrders = orders.filter(o => o && o.status !== 'Cancelled');
    if (activeOrders.length !== orders.length) {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(activeOrders));
    }
    return activeOrders;
  } catch (e) {
    console.error('Failed to parse customer orders from storage:', e);
    return [];
  }
}

function saveOrderToLocalStorage(orderRecord) {
  try {
    const orders = getCustomerOrders();
    orders.unshift(orderRecord);
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
  } catch (e) {
    console.error('Failed to save order to storage:', e);
  }
}

function updateOrderInLocalStorage(orderId, updatedFields) {
  try {
    const orders = getCustomerOrders();
    const index = orders.findIndex(o => o.orderId === orderId);
    if (index !== -1) {
      orders[index] = { ...orders[index], ...updatedFields };
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
      return true;
    }
  } catch (e) {
    console.error('Failed to update order in storage:', e);
  }
  return false;
}

function deleteOrderFromLocalStorage(orderId) {
  try {
    const orders = getCustomerOrders();
    const filtered = orders.filter(o => o.orderId !== orderId && o.status !== 'Cancelled');
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(filtered));
    return true;
  } catch (e) {
    console.error('Failed to remove order from storage:', e);
  }
  return false;
}

function updateMyOrdersCountBadge() {
  const orders = getCustomerOrders();
  const count = orders.length;

  const countBadgeDesktop = document.getElementById('myOrdersCountBadge');
  const countBadgeMobile = document.getElementById('myOrdersCountBadgeMobile');
  const menuBadge = document.getElementById('mobileMenuOrdersBadge');
  const modalCountBadge = document.getElementById('myOrdersModalCountBadge');

  if (countBadgeDesktop) {
    countBadgeDesktop.textContent = count;
    countBadgeDesktop.classList.toggle('hidden', count === 0);
  }
  if (countBadgeMobile) {
    countBadgeMobile.textContent = count;
    countBadgeMobile.classList.toggle('hidden', count === 0);
  }
  if (menuBadge) {
    menuBadge.textContent = count;
    menuBadge.classList.toggle('hidden', count === 0);
  }
  if (modalCountBadge) {
    modalCountBadge.textContent = `${count} ${count === 1 ? 'Order' : 'Orders'}`;
  }
}

// Open My Orders Modal (supports focusing on specific target order)
let currentCustomerViewingOrderId = null;

async function syncCustomerOrdersWithBackend() {
  const orders = getCustomerOrders();
  if (!orders || orders.length === 0) return;
  let updatedAny = false;
  for (const order of orders.slice(0, 10)) {
    if (order.status === 'Cancelled') continue;
    try {
      const cleanRef = encodeURIComponent(String(order.orderId).replace(/^#/, '').toUpperCase());
      const res = await fetch(`/api/order/${cleanRef}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.order) {
          const newStatus = data.order.status;
          if (newStatus && newStatus !== order.status) {
            updateOrderInLocalStorage(order.orderId, {
              status: newStatus,
              paymentStatus: data.order.paymentStatus || (newStatus === 'Confirmed' ? 'Approved' : 'Under Review')
            });
            updatedAny = true;
          }
        }
      }
    } catch (e) {
      // background sync catch
    }
  }
  if (updatedAny) {
    renderMyOrdersList(currentCustomerViewingOrderId);
  }
}

function openMyOrdersModal(targetOrderId = null) {
  currentCustomerViewingOrderId = targetOrderId;
  renderMyOrdersList(targetOrderId);
  updateMyOrdersCountBadge();
  const modal = document.getElementById('myOrdersModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
  // Sync latest order status from backend in background
  syncCustomerOrdersWithBackend();
}

function closeMyOrdersModal() {
  const modal = document.getElementById('myOrdersModal');
  if (modal) modal.classList.add('hidden');
  document.body.style.overflow = '';
}

// Render dynamic customer order history with full details
function renderMyOrdersList(targetOrderId = null) {
  const container = document.getElementById('myOrdersListContainer');
  if (!container) return;

  const orders = getCustomerOrders();

  if (orders.length === 0) {
    container.innerHTML = `
      <div class="py-12 text-center space-y-3">
        <div class="w-16 h-16 mx-auto rounded-3xl bg-rose-50 flex items-center justify-center text-[#c94968] text-2xl shadow-inner">
          <i class="fa-solid fa-basket-shopping"></i>
        </div>
        <h4 class="font-bold text-chocolate text-base">Your cart is empty</h4>
        <p class="text-xs text-stone-500 max-w-xs mx-auto">
          Explore our signature creations, custom couple cakes, or mini bento cakes and place your sweet order!
        </p>
        <div class="pt-2">
          <button onclick="closeMyOrdersModal();" class="btn-gold px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide">
            Browse Cakes
          </button>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = orders.map(order => {
    const isTarget = targetOrderId && (String(order.orderId) === String(targetOrderId) || String(order.orderId) === String(targetOrderId).replace(/^#/, ''));
    const isCancelled = order.status === 'Cancelled';
    const isConfirmed = order.status === 'Confirmed';
    const isDelivery = order.paymentOption === 'delivery';

    let statusBadge = '';
    if (isCancelled) {
      statusBadge = `
        <span class="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full border bg-stone-100 text-stone-600 border-stone-200">
          <i class="fa-solid fa-ban text-[9px] text-stone-400"></i>
          <span>Cancelled</span>
        </span>
      `;
    } else if (isConfirmed) {
      statusBadge = `
        <span class="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full border bg-emerald-50 text-emerald-800 border-emerald-300">
          <i class="fa-solid fa-circle-check text-[10px] text-emerald-600"></i>
          <span>Payment Confirmed</span>
        </span>
      `;
    } else if (isDelivery) {
      statusBadge = `
        <span class="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full border bg-blue-50 text-blue-800 border-blue-200">
          <i class="fa-solid fa-truck text-[10px] text-blue-600"></i>
          <span>Pay on Delivery</span>
        </span>
      `;
    } else {
      statusBadge = `
        <span class="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full border bg-amber-50 text-amber-800 border-amber-300">
          <i class="fa-solid fa-hourglass-half text-[10px] text-amber-600 animate-pulse"></i>
          <span>Payment Under Review</span>
        </span>
      `;
    }

    const accessoriesChips = (order.accessories && order.accessories.length > 0)
      ? order.accessories.map(a => `
          <span class="inline-flex items-center gap-1 bg-white border border-rose-200 text-[#c94968] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
            <i class="fa-solid fa-wand-magic-sparkles text-[8px]"></i>
            <span>${escapeHtml(a.name || a.displayName)}${a.qty > 1 ? ` (x${a.qty})` : ''}</span>
          </span>
        `).join('')
      : '';

    const cardClasses = isTarget
      ? 'border-[#c94968] bg-rose-50/20 ring-2 ring-[#c94968]/30 shadow-md'
      : (isCancelled ? 'border-stone-200 bg-stone-50/70 opacity-75' : 'border-rose-100 bg-white hover:border-rose-300 shadow-sm');

    return `
      <div id="customerOrderCard-${escapeHtml(order.orderId)}" class="p-4 sm:p-5 rounded-2xl border ${cardClasses} transition space-y-3">
        
        <!-- Header: Order ID & Live Payment Status -->
        <div class="flex items-center justify-between border-b border-stone-100 pb-2.5">
          <div class="flex items-center gap-2">
            <span class="font-mono font-black text-xs text-chocolate tracking-wide">Order ID: #${escapeHtml(order.orderId)}</span>
            <span class="text-[10px] text-stone-400 font-medium">Placed ${formatCreationDate(order.datePlaced)}</span>
          </div>
          <div>
            ${statusBadge}
          </div>
        </div>

        <!-- Product, Quantity & Specs Row -->
        <div class="flex items-center gap-3">
          <img src="${order.cakeImage || '/images/hero-cake-only.jpg'}" alt="${escapeHtml(order.cakeName)}" 
               class="w-14 h-14 rounded-xl object-cover shrink-0 border border-stone-200" 
               style="width: 56px; height: 56px; min-width: 56px; max-width: 56px; min-height: 56px; max-height: 56px;"
               onerror="this.src='/images/hero-cake-only.jpg'">
          <div class="flex-1 min-w-0">
            <h5 class="font-bold text-sm text-chocolate truncate">${escapeHtml(order.cakeName)}</h5>
            <div class="flex items-center gap-2 mt-0.5 flex-wrap">
              <span class="text-[11px] text-stone-500">${escapeHtml(order.size)} • ${escapeHtml(order.flavor)}</span>
              <span class="inline-flex items-center px-1.5 py-0.2 rounded bg-rose-100 text-[#c94968] font-black text-[10px]">
                Qty: ${order.quantity || 1}
              </span>
            </div>
            ${order.inscription ? `
              <p class="text-[11px] text-[#c94968] italic truncate mt-0.5 font-medium">
                <i class="fa-solid fa-pen-nib text-[9px] mr-1"></i>"${escapeHtml(order.inscription)}"
              </p>
            ` : ''}
          </div>
          <div class="text-right shrink-0">
            <span class="text-[10px] text-stone-400 uppercase font-semibold block">Total Price</span>
            <span class="font-extrabold text-sm text-[#c94968]">${(order.totalPrice || 0).toLocaleString()} ETB</span>
          </div>
        </div>

        <!-- Accessories Chips if any -->
        ${accessoriesChips ? `
          <div class="flex flex-wrap items-center gap-1.5 pt-1">
            <span class="text-[10px] font-bold text-stone-400 uppercase tracking-wide">Extra:</span>
            ${accessoriesChips}
          </div>
        ` : ''}

        <!-- Delivery & Contact Details -->
        <div class="grid grid-cols-2 gap-2 text-xs bg-stone-50/80 p-2.5 rounded-xl border border-stone-200/60">
          <div>
            <span class="text-[10px] text-stone-400 uppercase font-semibold block">Needed By:</span>
            <span class="font-bold text-chocolate">${escapeHtml(order.deliveryDate)} (${escapeHtml(order.deliveryTime || 'Afternoon')})</span>
          </div>
          <div>
            <span class="text-[10px] text-stone-400 uppercase font-semibold block">Contact:</span>
            <span class="font-bold text-chocolate truncate block">${escapeHtml(order.customerName)} (${escapeHtml(order.phoneNumber)})</span>
          </div>
        </div>

        <!-- Actions: Edit or Cancel (Only available if not cancelled) -->
        ${!isCancelled ? `
          <div class="pt-2 flex items-center justify-between border-t border-stone-100">
            <button type="button" onclick="cancelCustomerOrder('${order.orderId}')" class="text-rose-600 hover:text-rose-800 text-xs font-semibold flex items-center gap-1 transition">
              <i class="fa-solid fa-ban text-[10px]"></i>
              <span>Cancel Order</span>
            </button>
            <button type="button" onclick="openEditOrderModal('${order.orderId}')" class="px-4 py-1.5 rounded-full text-xs font-bold bg-chocolate hover:bg-stone-800 text-white transition flex items-center gap-1.5 shadow-2xs">
              <i class="fa-solid fa-pen-to-square text-[10px]"></i>
              <span>Edit Details</span>
            </button>
          </div>
        ` : `
          <div class="pt-1 text-[11px] text-stone-400 italic">
            This order was cancelled.
          </div>
        `}

      </div>
    `;
  }).join('');

  if (targetOrderId) {
    const cleanId = String(targetOrderId).replace(/^#/, '');
    const cardEl = document.getElementById(`customerOrderCard-${cleanId}`);
    if (cardEl) {
      setTimeout(() => {
        cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
    }
  }
}

// ============================================================
// EDIT ORDER MODAL CONTROLLER
// ============================================================

let currentEditingOrderId = null;

function openEditOrderModal(orderId) {
  const orders = getCustomerOrders();
  const order = orders.find(o => o.orderId === orderId);
  if (!order) return;

  currentEditingOrderId = orderId;
  const refTitle = document.getElementById('editOrderRefTitle');
  if (refTitle) refTitle.textContent = `#${order.orderId} • ${order.cakeName}`;

  const inscInput = document.getElementById('editOrderInscription');
  if (inscInput) inscInput.value = order.inscription || '';

  const dateInput = document.getElementById('editOrderDate');
  if (dateInput) dateInput.value = order.deliveryDate || '';

  const timeSelect = document.getElementById('editOrderTime');
  if (timeSelect) timeSelect.value = order.deliveryTime || 'Afternoon';

  const phoneInput = document.getElementById('editOrderPhone');
  if (phoneInput) phoneInput.value = order.phoneNumber || '';

  const modal = document.getElementById('editOrderModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeEditOrderModal() {
  const modal = document.getElementById('editOrderModal');
  if (modal) modal.classList.add('hidden');
  currentEditingOrderId = null;
}

async function saveEditedOrder() {
  if (!currentEditingOrderId) return;

  const inscInput = document.getElementById('editOrderInscription');
  const dateInput = document.getElementById('editOrderDate');
  const timeSelect = document.getElementById('editOrderTime');
  const phoneInput = document.getElementById('editOrderPhone');

  const updatedFields = {
    inscription: inscInput ? inscInput.value.trim() : '',
    deliveryDate: dateInput ? dateInput.value : '',
    deliveryTime: timeSelect ? timeSelect.value : 'Afternoon',
    phoneNumber: phoneInput ? phoneInput.value.trim() : ''
  };

  // Sync with backend API to notify Telegram
  try {
    await fetch('/api/order/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: currentEditingOrderId,
        ...updatedFields
      })
    });
  } catch (err) {
    console.warn('Backend update notification failed (operating offline/cached):', err);
  }

  // Update in LocalStorage
  updateOrderInLocalStorage(currentEditingOrderId, updatedFields);
  closeEditOrderModal();
  renderMyOrdersList();
}

async function cancelCustomerOrder(orderId) {
  const confirmed = confirm(`Are you sure you want to cancel order #${orderId}?\nThis will remove it from your cart.`);
  if (!confirmed) return;

  // Sync with backend API
  try {
    await fetch('/api/order/cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId,
        reason: 'Customer cancelled from cart / My Orders menu'
      })
    });
  } catch (err) {
    console.warn('Backend cancel notification failed:', err);
  }

  // Remove order from cart & LocalStorage
  deleteOrderFromLocalStorage(orderId);
  updateMyOrdersCountBadge();
  renderMyOrdersList();
}

// Click outside / empty area to close modals
function handleBackdropClick(event, modalId) {
  if (!event || !event.target) return;
  if (!event.target.closest('.modal-content')) {
    if (modalId === 'productDetailModal') {
      closeProductDetailModal();
    } else if (modalId === 'orderModal') {
      closeOrderModal();
    } else if (modalId === 'accessoriesModal') {
      closeAccessoriesModal();
    } else if (modalId === 'orderConfirmationModal') {
      closeConfirmationModal();
    } else if (modalId === 'myOrdersModal') {
      closeMyOrdersModal();
    } else if (modalId === 'editOrderModal') {
      closeEditOrderModal();
    }
  }
}

// Populate Cake select in order modal (excluding standalone accessories)
function populateOrderCakeSelect(cakes) {
  const select = document.getElementById('orderCakeSelect');
  if (!select) return;

  const validCakes = cakes.filter(c => c.category !== 'Cake Accessories' && c.category !== 'Extra Decorations');
  select.innerHTML = validCakes.map(cake => `
    <option value="${cake.id}" ${cake.isSoldOut ? 'disabled' : ''}>${cake.name} — ${cake.price.toLocaleString()} ETB ${cake.isSoldOut ? '(Sold Out)' : ''}</option>
  `).join('');
}

function formatFriendlyDeliveryDate(dateStr, timeSlot) {
  if (!dateStr) return '';
  const parts = String(dateStr).split('-');
  let d;
  if (parts.length === 3) {
    d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  } else {
    d = new Date(dateStr);
  }
  if (isNaN(d.getTime())) return `${dateStr}${timeSlot ? ` (${timeSlot})` : ''}`;
  const weekday = d.toLocaleDateString('en-US', { weekday: 'long' });
  const month = d.toLocaleDateString('en-US', { month: 'short' });
  const day = d.getDate();
  const timeFormatted = timeSlot ? ` (${timeSlot})` : '';
  return `${weekday}, ${month} ${day}${timeFormatted}`;
}

// Show Order Confirmation Receipt Modal
let latestPlacedOrderId = null;

function showOrderConfirmation(payload, response) {
  latestPlacedOrderId = response.orderId;
  const refEl = document.getElementById('confirmOrderRef');
  if (refEl) refEl.textContent = `#${response.orderId}`;

  const custEl = document.getElementById('confirmCustomerName');
  if (custEl) custEl.textContent = payload.customerName;

  const cakeNameEl = document.getElementById('confirmCakeName');
  if (cakeNameEl) cakeNameEl.textContent = payload.cakeName;

  const cakeSpecsEl = document.getElementById('confirmCakeSpecs');
  if (cakeSpecsEl) cakeSpecsEl.textContent = `${payload.size} • ${payload.flavor}`;

  // Populate Ordered Cake Visual Preview Card with photo & badges
  const cake = allCakes.find(c => c.id === payload.cakeId || c.name === payload.cakeName) || allCakes[0];
  const cakeImg = document.getElementById('confirmCakeImg');
  if (cakeImg && cake) {
    cakeImg.src = cake.image || '/images/hero-cake-only.jpg';
  }
  const previewTitle = document.getElementById('confirmCakePreviewTitle');
  if (previewTitle) previewTitle.textContent = payload.cakeName;

  const previewSpecs = document.getElementById('confirmCakePreviewSpecs');
  if (previewSpecs) {
    let specsText = `${escapeHtml(payload.size)} • ${escapeHtml(payload.flavor)}`;
    if (payload.inscription) {
      specsText += `<span class="block text-[#c94968] font-semibold mt-0.5 italic">✏️ "${escapeHtml(payload.inscription)}"</span>`;
    }
    previewSpecs.innerHTML = specsText;
  }

  const catBadge = document.getElementById('confirmCakeCategoryBadge');
  if (catBadge && cake) {
    catBadge.textContent = cake.category || 'Cake';
  }

  // Populate Cake Description in confirmation card
  const descEl = document.getElementById('confirmCakeDescription');
  if (descEl) {
    if (cake && cake.description) {
      descEl.textContent = `"${cake.description}"`;
      descEl.classList.remove('hidden');
    } else {
      descEl.classList.add('hidden');
    }
  }

  // Populate Customer Phone for direct call reassurance
  const phoneDisplay = document.getElementById('confirmCustomerPhoneDisplay');
  if (phoneDisplay) {
    phoneDisplay.textContent = payload.phoneNumber || 'your phone number';
  }

  // Populate accessory mini chips inside the preview card
  const chipsContainer = document.getElementById('confirmCakeAccessoriesChips');
  if (chipsContainer) {
    if (payload.accessories && payload.accessories.length > 0) {
      chipsContainer.innerHTML = payload.accessories.map(a => `
        <span class="inline-flex items-center gap-1 bg-white/95 border border-rose-200 text-[#c94968] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
          <i class="fa-solid fa-wand-magic-sparkles text-[8px]"></i>
          <span>${escapeHtml(a.name)}${a.qty > 1 ? ` (x${a.qty})` : ''}</span>
        </span>
      `).join('');
      chipsContainer.classList.remove('hidden');
    } else {
      chipsContainer.innerHTML = '';
      chipsContainer.classList.add('hidden');
    }
  }
  
  // Show accessories in confirmation receipt if selected
  const accRow = document.getElementById('confirmAccessoriesRow');
  const accListEl = document.getElementById('confirmAccessoriesList');
  if (accRow && accListEl) {
    if (payload.accessories && payload.accessories.length > 0) {
      accRow.classList.remove('hidden');
      accListEl.textContent = payload.accessories.map(a => {
        const qtyStr = (a.qty && a.qty > 1) ? ` (x${a.qty})` : '';
        const ageStr = a.candleAge ? ` (Age: ${a.candleAge})` : '';
        const noteStr = a.note ? ` ["${a.note}"]` : '';
        return `${a.displayName || a.name}${ageStr}${qtyStr}${noteStr}`;
      }).join(', ');
    } else {
      accRow.classList.add('hidden');
    }
  }
  
  const neededDateEl = document.getElementById('confirmNeededDate');
  if (neededDateEl) {
    neededDateEl.textContent = formatFriendlyDeliveryDate(payload.deliveryDate, payload.deliveryTime);
  }
  
  const totalEl = document.getElementById('confirmTotalPrice');
  if (totalEl) totalEl.textContent = `${payload.totalPrice.toLocaleString()} ETB`;

  // Dynamic Payment Status Alert Box in Confirmation Modal
  if (payload.paymentOption === 'delivery') {
    stopPaymentApprovalCountdown();
    setConfirmationModalApprovedState(response.order || payload, payload);
  } else {
    if (response.order && response.order.status !== 'Pending' && response.order.status !== 'New') {
      stopPaymentApprovalCountdown();
      setConfirmationModalApprovedState(response.order, payload);
    } else {
      startPaymentApprovalMonitoring(response.orderId, {
        paymentOption: payload.paymentOption,
        amountPaidNow: payload.amountPaidNow,
        amountDueOnDelivery: payload.amountDueOnDelivery,
        totalPrice: payload.totalPrice
      });
    }
  }

  const statusText = document.getElementById('confirmationTelegramStatusText');
  if (statusText) {
    if (response.telegramStatus === 'delivered') {
      statusText.innerHTML = `✅ Successfully transmitted to the <strong>MAK CAKE Telegram Bot</strong>! The business owner has received your full order details on their phone.`;
    } else if (response.telegramStatus === 'simulated') {
      statusText.innerHTML = `🔔 <strong>Order Transmitted (Simulation Mode)</strong>: Full order details sent to server console. (Add bot token to <code>.env</code> for live Telegram alerts).`;
    } else {
      statusText.innerHTML = `Your order details have been received. Our head baker will contact you at <strong>${payload.phoneNumber}</strong>.`;
    }
  }

  const modal = document.getElementById('orderConfirmationModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  // Trigger celebration confetti shower ONLY when approved or payment on delivery!
  if (payload.paymentOption === 'delivery' || (response.order && response.order.status === 'Confirmed')) {
    launchOrderConfetti();
  }

  // Trigger smooth parabolic arc flight of order into the top basket icon!
  setTimeout(() => {
    const sourceCard = document.getElementById('confirmCakeCard') || document.getElementById('confirmCheckEmblem');
    animateFlyingOrderToBasket(sourceCard);
  }, 240);
}

// ------------------------------------------------------------
// CONFIRMATION MODAL BUTTON ACTIONS
// ------------------------------------------------------------

function handleConfirmViewOrderClick() {
  closeConfirmationModal();
  openMyOrdersModal(latestPlacedOrderId);
}

function handleDirectCall(e) {
  const rawPhone = (activeBusinessSettings?.contact?.primaryPhone || '+251 91 123 4567');
  const cleanPhone = rawPhone.replace(/[^0-9+]/g, '');
  const link = document.getElementById('confirmCallPhoneLink');
  if (link) {
    link.href = `tel:${cleanPhone}`;
  }
  // Programmatically trigger dialer for maximum mobile & desktop reliability
  try {
    window.location.href = `tel:${cleanPhone}`;
  } catch (err) {
    console.warn('Dialer trigger fallback:', err);
  }
}

window.handleConfirmViewOrderClick = handleConfirmViewOrderClick;
window.handleDirectCall = handleDirectCall;

// Joyful Celebration Confetti Shower on Order Confirmation
function launchOrderConfetti() {
  const colors = ['#c94968', '#d4af37', '#10b981', '#f43f5e', '#fbbf24', '#8b5cf6', '#ec4899', '#38bdf8'];
  const symbols = ['🎂', '✨', '💖', '⭐', '🎉', '🍰'];
  const count = 48;
  const particles = [];

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'order-confetti-piece';
    
    const isSymbol = Math.random() > 0.65;
    if (isSymbol) {
      el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      el.style.fontSize = `${Math.floor(Math.random() * 10 + 14)}px`;
    } else {
      const w = Math.random() * 8 + 6;
      const h = Math.random() * 6 + 6;
      el.style.width = `${w}px`;
      el.style.height = `${h}px`;
      el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      el.style.borderRadius = Math.random() > 0.5 ? '2px' : '50%';
      el.style.boxShadow = '0 2px 6px rgba(0,0,0,0.12)';
    }

    // Launch from top center of the viewport
    const startX = window.innerWidth * 0.5 + (Math.random() * 220 - 110);
    const startY = Math.max(30, window.innerHeight * 0.18 + (Math.random() * 60 - 30));

    document.body.appendChild(el);

    particles.push({
      el,
      x: startX,
      y: startY,
      vx: (Math.random() - 0.5) * 14,
      vy: -(Math.random() * 8 + 5), // initial upward burst
      gravity: 0.28 + Math.random() * 0.18,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 15,
      opacity: 1,
      decay: 0.008 + Math.random() * 0.006
    });
  }

  const startTime = performance.now();
  const maxDuration = 2800;

  function animate(now) {
    const elapsed = now - startTime;
    let anyActive = false;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.985; // air resistance
      p.rotation += p.vRot;
      p.opacity -= p.decay;

      if (p.opacity > 0 && p.y < window.innerHeight + 50) {
        anyActive = true;
        p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rotation}deg)`;
        p.el.style.opacity = Math.max(0, p.opacity);
      } else {
        p.el.style.opacity = '0';
      }
    });

    if (anyActive && elapsed < maxDuration) {
      requestAnimationFrame(animate);
    } else {
      particles.forEach(p => p.el.remove());
    }
  }

  requestAnimationFrame(animate);
}

function closeConfirmationModal() {
  stopPaymentApprovalCountdown();
  const modal = document.getElementById('orderConfirmationModal');
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

// ============================================================
// OUR RECENT CREATIONS GALLERY & LIGHTBOX
// ============================================================

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function fetchCreations() {
  const container = document.getElementById('recentCreationsGrid');
  if (!container) return;

  try {
    let list = null;
    try {
      const res = await fetch('/api/creations');
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
      publicCreations = list;
      renderRecentCreations();
    } else {
      container.innerHTML = `
        <div class="col-span-full text-center py-8 text-stone-400">
          No creations published yet. Check back soon!
        </div>
      `;
    }
  } catch (err) {
    console.error('Error loading creations:', err);
    container.innerHTML = `
      <div class="col-span-full text-center py-8 text-stone-400">
        Could not load recent creations.
      </div>
    `;
  }
}

function renderRecentCreations() {
  const container = document.getElementById('recentCreationsGrid');
  const toggleBtnContainer = document.getElementById('creationsViewAllContainer');
  if (!container) return;

  if (publicCreations.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12 text-stone-400">
        <div class="w-12 h-12 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-[#c94968] text-xl mb-2">
          <i class="fa-solid fa-camera"></i>
        </div>
        <p class="font-bold text-chocolate text-sm">New cake creations coming soon!</p>
        <p class="text-xs text-stone-400 mt-1">Our bakers are busy in the kitchen decorating new masterpieces.</p>
      </div>
    `;
    if (toggleBtnContainer) toggleBtnContainer.classList.add('hidden');
    return;
  }

  // Determine display slice
  const limit = 6;
  const itemsToDisplay = showAllCreations ? publicCreations : publicCreations.slice(0, limit);

  // Show/Hide "View All" button
  if (toggleBtnContainer) {
    if (publicCreations.length > limit) {
      toggleBtnContainer.classList.remove('hidden');
      const textEl = document.getElementById('btnToggleAllText');
      const iconEl = document.getElementById('btnToggleAllIcon');
      if (textEl) textEl.textContent = showAllCreations ? 'Show Less' : `View All Creations (${publicCreations.length})`;
      if (iconEl) iconEl.className = showAllCreations ? 'fa-solid fa-chevron-up ml-1.5 text-[10px]' : 'fa-solid fa-chevron-down ml-1.5 text-[10px]';
    } else {
      toggleBtnContainer.classList.add('hidden');
    }
  }

  container.innerHTML = itemsToDisplay.map((item, index) => {
    const formattedDate = formatCreationDate(item.date || item.createdAt);
    return `
      <div class="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200/80 cursor-pointer flex flex-col justify-between"
           onclick="openCreationsLightbox(${index})">
        
        <!-- Image with aspect ratio and zoom on hover -->
        <div class="relative aspect-square overflow-hidden bg-stone-100">
          <img src="${item.imageUrl}" 
               alt="${escapeHtml(item.title || 'Cake Creation')}" 
               loading="lazy"
               class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out">
        
          <!-- Date Badge -->
          <div class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-chocolate text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            <i class="fa-solid fa-calendar-day text-[#c94968] mr-1"></i>
            ${formattedDate}
          </div>

          <!-- Hover Overlay with View Icon -->
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span class="w-10 h-10 rounded-full bg-white/90 text-chocolate flex items-center justify-center text-sm shadow-md transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <i class="fa-solid fa-magnifying-glass-plus"></i>
            </span>
          </div>
        </div>

        <!-- Card Caption Footer -->
        <div class="p-3.5 bg-white">
          <h4 class="font-bold text-chocolate text-xs line-clamp-1 group-hover:text-[#c94968] transition">
            ${escapeHtml(item.title || 'Custom Creation')}
          </h4>
          ${item.caption ? `
            <p class="text-[11px] text-stone-500 line-clamp-1 mt-0.5 leading-snug">
              ${escapeHtml(item.caption)}
            </p>
          ` : ''}
        </div>

      </div>
    `;
  }).join('');
}

function formatCreationDate(dateStr) {
  if (!dateStr) return 'Recently Baked';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch (e) {
    return dateStr;
  }
}

function toggleAllCreationsView() {
  showAllCreations = !showAllCreations;
  renderRecentCreations();
}

// Lightbox controller
function openCreationsLightbox(index) {
  if (index < 0 || index >= publicCreations.length) return;
  currentLightboxIndex = index;

  const item = publicCreations[currentLightboxIndex];
  if (!item) return;

  const modal = document.getElementById('creationsLightboxModal');
  const imgEl = document.getElementById('lightboxImage');
  const titleEl = document.getElementById('lightboxTitle');
  const captionEl = document.getElementById('lightboxCaption');
  const dateEl = document.getElementById('lightboxDate');
  const orderBtn = document.getElementById('lightboxOrderBtn');

  imgEl.src = item.imageUrl;
  imgEl.alt = item.title || 'Recent Cake Creation';
  titleEl.textContent = item.title || 'Handcrafted Cake Creation';
  captionEl.textContent = item.caption || 'Baked fresh for a celebration with love and care.';
  dateEl.textContent = formatCreationDate(item.date || item.createdAt);

  // Setup order button to pre-fill note
  orderBtn.onclick = () => {
    closeCreationsLightbox();
    openOrderModal(null, item.title, 3000);
    const noteInput = document.getElementById('orderInscription');
    if (noteInput) {
      noteInput.value = `I would like a custom cake inspired by your recent creation: "${item.title}"`;
    }
  };

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function navigateLightbox(direction) {
  if (publicCreations.length <= 1) return;
  let newIndex = currentLightboxIndex + direction;
  if (newIndex < 0) newIndex = publicCreations.length - 1;
  if (newIndex >= publicCreations.length) newIndex = 0;
  openCreationsLightbox(newIndex);
}

function closeCreationsLightbox(e) {
  if (e && e.target && e.target.id !== 'creationsLightboxModal' && !e.target.closest('button')) {
    return;
  }
  const modal = document.getElementById('creationsLightboxModal');
  if (modal) modal.classList.add('hidden');
  document.body.style.overflow = '';
}

// Keyboard navigation support for lightbox
document.addEventListener('keydown', (e) => {
  const modal = document.getElementById('creationsLightboxModal');
  if (modal && !modal.classList.contains('hidden')) {
    if (e.key === 'Escape') closeCreationsLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  }
});



// ============================================================
// MAK CAKE — DAY LIST (MONDAY TO SUNDAY) & BUSINESS SETTINGS SYNC
// ============================================================

let activeBusinessSettings = null;

const WEEKDAYS_LIST = [
  { dayIndex: 1, name: 'Monday', short: 'Mon' },
  { dayIndex: 2, name: 'Tuesday', short: 'Tue' },
  { dayIndex: 3, name: 'Wednesday', short: 'Wed' },
  { dayIndex: 4, name: 'Thursday', short: 'Thu' },
  { dayIndex: 5, name: 'Friday', short: 'Fri' },
  { dayIndex: 6, name: 'Saturday', short: 'Sat' },
  { dayIndex: 0, name: 'Sunday', short: 'Sun' }
];

function populateWeekdayDropdownOptions(selectedIso = '') {
  const select = document.getElementById('chooseDaySelect');
  if (!select) return;

  const now = new Date();
  const currentDayIndex = now.getDay();

  let html = `<option value="" disabled ${!selectedIso ? 'selected' : ''}>📅 Choose Day ▾</option>`;

  WEEKDAYS_LIST.forEach(day => {
    let diff = day.dayIndex - currentDayIndex;
    if (diff < 0) diff += 7;

    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + diff);

    const yyyy = targetDate.getFullYear();
    const mm = String(targetDate.getMonth() + 1).padStart(2, '0');
    const dd = String(targetDate.getDate()).padStart(2, '0');
    const isoDate = `${yyyy}-${mm}-${dd}`;

    const monthShort = targetDate.toLocaleDateString('en-US', { month: 'short' });
    const dayNum = targetDate.getDate();

    let extraBadge = '';
    if (diff === 0) extraBadge = ' (Today)';
    else if (diff === 1) extraBadge = ' (Tomorrow)';

    const label = `${day.name} — ${monthShort} ${dayNum}${extraBadge}`;
    const isSelected = (selectedIso === isoDate);

    html += `<option value="${isoDate}" data-label="${day.name}, ${monthShort} ${dayNum}" ${isSelected ? 'selected' : ''}>${label}</option>`;
  });

  select.innerHTML = html;
}

function onWeekdayDropdownChange(isoDate) {
  if (!isoDate) return;
  const select = document.getElementById('chooseDaySelect');
  const selectedOpt = select ? select.options[select.selectedIndex] : null;
  const displayStr = selectedOpt ? selectedOpt.getAttribute('data-label') : isoDate;

  const dateInput = document.getElementById('orderDate');
  if (dateInput) {
    dateInput.value = isoDate;
  }

  // Deactivate Today / Tomorrow buttons
  selectedQuickDateType = 'custom';
  const btnToday = document.getElementById('quickDateToday');
  const btnTomorrow = document.getElementById('quickDateTomorrow');
  if (btnToday) btnToday.classList.remove('active', 'choice-glow-active');
  if (btnTomorrow) btnTomorrow.classList.remove('active', 'choice-glow-active');

  // Activate Choose Day select button styling
  if (select) {
    select.classList.add('active', 'choice-glow-active');
    setTimeout(() => select.classList.remove('choice-glow-active'), 400);
  }

  // Update preview badge & summary
  const preview = document.getElementById('selectedDayTextPreview');
  if (preview) {
    preview.textContent = `Selected: ${displayStr}`;
  }
  const summary = document.getElementById('selectedFullDateSummary');
  if (summary) {
    summary.textContent = `Delivery scheduled for: ${displayStr}`;
  }

  // Smoothly glide to the next question: Time of Day
  scrollToTimeOfDay();
}

function renderWeekdayChips(targetIsoDate = null) {
  const container = document.getElementById('orderWeekdayChipsContainer');
  if (!container) return;

  const now = new Date();
  const currentDayIndex = now.getDay();
  const currentDateInput = document.getElementById('orderDate');
  const activeDateVal = targetIsoDate || (currentDateInput ? currentDateInput.value : '');

  container.innerHTML = WEEKDAYS_LIST.map(day => {
    // Calculate upcoming date for this weekday
    let diff = day.dayIndex - currentDayIndex;
    if (diff < 0) diff += 7; // next week

    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + diff);

    const yyyy = targetDate.getFullYear();
    const mm = String(targetDate.getMonth() + 1).padStart(2, '0');
    const dd = String(targetDate.getDate()).padStart(2, '0');
    const isoDate = `${yyyy}-${mm}-${dd}`;

    const monthShort = targetDate.toLocaleDateString('en-US', { month: 'short' });
    const dayNum = targetDate.getDate();
    const dateFormatted = `${monthShort} ${dayNum}`;

    const isToday = (diff === 0);
    const isTomorrow = (diff === 1);
    const isSelected = (activeDateVal === isoDate);

    if (isSelected) {
      const preview = document.getElementById('selectedDayTextPreview');
      if (preview) preview.textContent = `Selected: ${day.name}, ${dateFormatted}`;
      const summary = document.getElementById('selectedFullDateSummary');
      if (summary) summary.textContent = `Delivery scheduled for: ${day.name}, ${dateFormatted}`;
    }

    let badgeText = '';
    if (isToday) badgeText = '<span class="text-[8px] font-extrabold uppercase tracking-wide bg-amber-100 text-amber-800 px-1 rounded-sm mt-0.5">Today</span>';
    else if (isTomorrow) badgeText = '<span class="text-[8px] font-extrabold uppercase tracking-wide bg-emerald-100 text-emerald-800 px-1 rounded-sm mt-0.5">Tomorrow</span>';

    return `
      <button type="button" 
              onclick="selectWeekdayDate('${isoDate}', '${day.name}', '${day.name}, ${dateFormatted}', this)"
              id="weekdayChip_${day.name.toLowerCase()}"
              class="weekday-chip p-2 rounded-xl border text-center transition flex flex-col items-center justify-center gap-0.5 shadow-2xs group cursor-pointer ${isSelected ? 'active-weekday choice-glow-active' : 'border-stone-200 bg-white hover:border-[#c94968]'}">
        <span class="text-xs font-bold ${isSelected ? 'text-white' : 'text-chocolate group-hover:text-[#c94968]'}">${day.name}</span>
        <span class="text-[10px] font-medium ${isSelected ? 'text-white/90' : 'text-stone-500'}">${dateFormatted}</span>
        ${badgeText}
      </button>
    `;
  }).join('');
}

function selectWeekdayDate(isoDate, dayName, displayStr, chipEl) {
  const dateInput = document.getElementById('orderDate');
  if (dateInput) {
    dateInput.value = isoDate;
  }

  // Update preview text
  const preview = document.getElementById('selectedDayTextPreview');
  if (preview) {
    preview.textContent = `Selected: ${displayStr}`;
  }
  const summary = document.getElementById('selectedFullDateSummary');
  if (summary) {
    summary.textContent = `Delivery scheduled for: ${displayStr}`;
  }

  // Highlight chip
  document.querySelectorAll('.weekday-chip').forEach(c => {
    c.classList.remove('active-weekday', 'choice-glow-active');
    c.className = 'weekday-chip p-2 rounded-xl border text-center transition flex flex-col items-center justify-center gap-0.5 shadow-2xs group cursor-pointer border-stone-200 bg-white hover:border-[#c94968]';
    const spans = c.querySelectorAll('span');
    if (spans[0]) spans[0].className = 'text-xs font-bold text-chocolate group-hover:text-[#c94968]';
    if (spans[1]) spans[1].className = 'text-[10px] font-medium text-stone-500';
  });

  if (chipEl) {
    chipEl.className = 'weekday-chip p-2 rounded-xl border text-center transition flex flex-col items-center justify-center gap-0.5 shadow-2xs group cursor-pointer active-weekday choice-glow-active';
    const spans = chipEl.querySelectorAll('span');
    if (spans[0]) spans[0].className = 'text-xs font-bold text-white';
    if (spans[1]) spans[1].className = 'text-[10px] font-medium text-white/90';
    setTimeout(() => chipEl.classList.remove('choice-glow-active'), 400);
  }

  // Update top button state: activate Choose Day
  selectedQuickDateType = 'custom';
  const btnToday = document.getElementById('quickDateToday');
  const btnTomorrow = document.getElementById('quickDateTomorrow');
  const btnCustom = document.getElementById('quickDateCustom');
  if (btnToday) btnToday.classList.remove('active', 'choice-glow-active');
  if (btnTomorrow) btnTomorrow.classList.remove('active', 'choice-glow-active');
  if (btnCustom) btnCustom.classList.add('active');

  // Smoothly glide down to the next question: Time of Day
  scrollToTimeOfDay();
}

function scrollToTimeOfDay() {
  setTimeout(() => {
    const timeQuestionEl = document.getElementById('orderTimeQuestionContainer');
    if (timeQuestionEl) {
      timeQuestionEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      timeQuestionEl.classList.add('time-focus-hint');
      setTimeout(() => timeQuestionEl.classList.remove('time-focus-hint'), 800);
    }
  }, 160);
}

function toggleCustomDatePickerInput() {
  const wrap = document.getElementById('manualDatePickerWrap');
  if (wrap) {
    wrap.classList.toggle('hidden');
  }
}

function handleManualDatePicked(val) {
  if (!val) return;
  const dateInput = document.getElementById('orderDate');
  if (dateInput) dateInput.value = val;

  const d = new Date(val + 'T00:00:00');
  const dayName = d.toLocaleDateString('en-US', { weekday: 'long' });
  const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const preview = document.getElementById('selectedDayTextPreview');
  if (preview) preview.textContent = `Selected: ${dayName}, ${dateStr}`;

  const summary = document.getElementById('selectedFullDateSummary');
  if (summary) summary.textContent = `Specific Date: ${dayName}, ${dateStr}`;

  renderWeekdayChips(val);
}

// ------------------------------------------------------------
// DYNAMIC BUSINESS SETTINGS FETCH & APPLY
// ------------------------------------------------------------

async function fetchBusinessSettings() {
  try {
    let s = null;
    try {
      const res = await fetch('/api/settings');
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
      activeBusinessSettings = s;
      applyDynamicBusinessSettings(activeBusinessSettings);
    }
  } catch (err) {
    console.error('Error fetching settings on customer page:', err);
  }
}

function applyDynamicBusinessSettings(settings) {
  if (!settings) return;

  const brandName = settings.brand?.name || 'MAK CAKE';
  const logoUrl = settings.brand?.logo || '/images/mak-cake-logo.png';
  const primaryPhone = settings.contact?.primaryPhone || '+251 91 123 4567';
  const secondaryPhone = settings.contact?.secondaryPhone || '+251 92 234 5678';
  const email = settings.contact?.email || 'hello@makcake.et';
  const address = settings.location?.address || 'Cameroon Street, Bole Sub-City, Addis Ababa, Ethiopia';
  const mapsUrl = settings.location?.googleMapsUrl || 'https://maps.google.com/?q=Bole+Medhanialem+Addis+Ababa';

  // 1. Update Brand Name in titles and headers
  document.querySelectorAll('.brand-logo-title').forEach(el => {
    el.textContent = brandName;
  });

  // 2. Update Logos
  document.querySelectorAll('.brand-logo-img').forEach(el => {
    el.src = logoUrl;
  });
  const mainNavLogo = document.querySelector('header img[alt="MAK CAKE Logo"]');
  if (mainNavLogo) mainNavLogo.src = logoUrl;

  // 3. Update Phone Numbers with Clickable Direct Dialing (tel: format)
  const cleanPrimaryPhone = primaryPhone.replace(/[^0-9+]/g, '');
  const cleanSecondaryPhone = secondaryPhone.replace(/[^0-9+]/g, '');

  document.querySelectorAll('.dynamic-primary-phone').forEach(el => {
    el.textContent = primaryPhone;
  });
  document.querySelectorAll('.dynamic-secondary-phone').forEach(el => {
    el.textContent = secondaryPhone;
  });

  // Top header phone link
  const topPhone = document.getElementById('topHeaderPhoneLink');
  if (topPhone) {
    topPhone.href = `tel:${cleanPrimaryPhone}`;
  }

  // Contact section links
  const contactPrimary = document.getElementById('contactPrimaryPhoneLink');
  if (contactPrimary) {
    contactPrimary.href = `tel:${cleanPrimaryPhone}`;
  }
  const contactSecondary = document.getElementById('contactSecondaryPhoneLink');
  if (contactSecondary) {
    contactSecondary.href = `tel:${cleanSecondaryPhone}`;
  }
  const contactDirectBtn = document.getElementById('contactDirectCallBtn');
  if (contactDirectBtn) {
    contactDirectBtn.href = `tel:${cleanPrimaryPhone}`;
  }

  // Footer direct call button
  const footerDirectBtn = document.getElementById('footerDirectCallBtn');
  if (footerDirectBtn) {
    footerDirectBtn.href = `tel:${cleanPrimaryPhone}`;
  }

  // Confirmation modal support phone link
  const confirmSupportPhone = document.getElementById('confirmCallPhoneLink');
  if (confirmSupportPhone) {
    confirmSupportPhone.href = `tel:${cleanPrimaryPhone}`;
  }

  // My Orders modal support phone link
  const myOrdersPhone = document.getElementById('myOrdersPhoneLink');
  if (myOrdersPhone) {
    myOrdersPhone.href = `tel:${cleanPrimaryPhone}`;
  }

  // 4. Update Location in Contact section
  const contactAddressEl = document.querySelector('#contact h4.font-bold + p');
  if (contactAddressEl && settings.location?.area) {
    contactAddressEl.textContent = `${settings.location.area}, ${settings.location.city || 'Addis Ababa'}, Ethiopia`;
  }
  const contactMapsLink = document.querySelector('#contact a[href*="maps.google.com"]');
  if (contactMapsLink && mapsUrl) {
    contactMapsLink.href = mapsUrl;
  }

  // 5. Update Working Hours in Contact section
  if (settings.workingHours) {
    const mon = settings.workingHours.monday;
    const sat = settings.workingHours.saturday;
    const sun = settings.workingHours.sunday;
    const hoursP = document.querySelector('#contact .space-y-0\\.5');
    if (hoursP && mon && sun) {
      hoursP.innerHTML = `
        <p><strong>Mon – Sat:</strong> ${mon.open || '08:00'} – ${sat?.close || mon.close || '20:00'}</p>
        <p><strong>Sunday:</strong> ${sun.isOpen ? `${sun.open || '09:00'} – ${sun.close || '19:00'}` : 'Closed'}</p>
      `;
    }
  }

  // 6. Update Social Media Links
  if (settings.social) {
    const s = settings.social;
    const tgLink = document.querySelector('#contact a[title="Telegram Channel"]');
    if (tgLink && s.telegram) tgLink.href = s.telegram;

    const igLink = document.querySelector('#contact a[title="Instagram"]');
    if (igLink && s.instagram) igLink.href = s.instagram;

    const ttLink = document.querySelector('#contact a[title="TikTok"]');
    if (ttLink && s.tiktok) ttLink.href = s.tiktok;
  }
}
