# MAK CAKE Optimization Changelog

## Phase 1: Quick Wins

### 1. Logo Compression & WebP Conversion
- **`mak-cake-logo.webp`**: Resized to 512×512 with WebP compression (Target: < 30 KB)
  - **Before:** 621,648 bytes (607.1 KB PNG)
  - **After:** 27,024 bytes (26.4 KB WebP) — **95.6% reduction**
- **`cbe-logo.webp`**: Resized to 160×160 with WebP compression (Target: < 15 KB)
  - **Before:** 280,872 bytes (274.3 KB PNG)
  - **After:** 13,536 bytes (13.2 KB WebP) — **95.2% reduction**
- **`telebirr-logo.webp`**: Resized to 180w with WebP compression (Target: < 10 KB)
  - **Before:** 62,563 bytes (61.1 KB PNG)
  - **After:** 9,602 bytes (9.4 KB WebP) — **84.7% reduction**
- **Total Logo Savings:** Reduced from 942.5 KB to 49.0 KB (**−893.5 KB / 94.8% saved**).
- **Isolation of Originals:** All raw uncompressed PNG originals moved to `private/original_logos/` and excluded from deployment.
- **Reference Updates:** Updated `index.html`, `admin.html`, `dual.html`, `manifest.json`, `sw.js`, `app.js`, `admin.js`, and `settings.json`.

### 2. Lazy Loading & Image Dimensions
- Added `loading="lazy" decoding="async"` and explicit `width` and `height` attributes to all catalog, creation, decoration, modal, and receipt `<img>` tags and JS templates.
- Critical initial hero image (`#hero-slide-img`) and logos kept eager with high priority (`fetchpriority="high" loading="eager"`).

### 3. Non-Blocking Scripts & Dynamic Leaflet Loading
- **Leaflet Map (JS + CSS):** Removed synchronous render-blocking `leaflet.js` (144 KB) and `leaflet.css` (15 KB) from `<head>`. Implemented dynamic loading in `initShopLocationMap()` so customers never download Leaflet assets unless the shop map is opened.
- **Firebase SDKs:** Added `defer` to all Firebase scripts (`firebase-app-compat.js`, `firebase-auth-compat.js`, `firebase-firestore-compat.js`, `firebase-config.js`, `firebase-service.js`), allowing HTML parsing to proceed uninterrupted while maintaining exact execution order before `DOMContentLoaded`.

### 4. Broken Image 404 Resolution
- Replaced 404 image ID `photo-1535141192574-5d4897c13136` with valid cake image `photo-1535141192574-5d4897c12636` across all templates and data files.

### 5. Runtime Tailwind Script Cleanup
- Removed duplicate `gstatic.com/.../tailwindcss.min.js` (407 KB), retaining single `cdn.tailwindcss.com` compiler ahead of Phase 2 compilation.

---

### File Size Summary (Phase 1)

| Resource | Before Phase 1 | After Phase 1 | Net Change |
| :--- | :--- | :--- | :--- |
| `images/mak-cake-logo.*` | 607.1 KB (PNG) | 26.4 KB (WebP) | **−580.7 KB (−95.6%)** |
| `images/cbe-logo.*` | 274.3 KB (PNG) | 13.2 KB (WebP) | **−261.1 KB (−95.2%)** |
| `images/telebirr-logo.*` | 61.1 KB (PNG) | 9.4 KB (WebP) | **−51.7 KB (−84.7%)** |
| Render-Blocking `<head>` JS/CSS | ~965 KB | ~398 KB | **−567 KB (−58.7%)** |
| `public/index.html` | 923.4 KB | 923.3 KB | −0.1 KB |

---

## Pre-Phase 2 Checks & Defer Safety

1. **Service Worker Cache Version Bump (`sw.js`)**:
   - Bumped `CACHE_NAME` from `mak-cake-pwa-v1.4` to `mak-cake-pwa-v2.0` to force eviction of legacy caches (purging old raw PNG/JPG assets for returning visitors).
   - Removed duplicate/legacy logo paths from `APP_SHELL`.
2. **`defer` Safety & Ready Event Dispatch (`firebase-service.js`)**:
   - Added `window.dispatchEvent(new CustomEvent('firebase-service-ready', ...))` and `window.__firebaseServiceReady` flag.
   - Guarded `openGoogleConnectFlow()` and `signInAdminWithGoogle()` across `index.html`, `admin.html`, and `dual.html` with asynchronous readiness resolution so user clicks never fail if scripts are completing defer execution.
   - Connected `submitOrder()` to background `FirebaseService.saveOrder(newOrder)` write when Firebase is active.
3. **Deployment Scope Confirmation**:
   - Confirmed deployment pipeline is restricted strictly to `public/` files; `private/original_logos/` is isolated outside `public/` and never published.

---

## Phase 2: Remove Runtime Tailwind

### 1. Tailwind CLI & Configuration Setup
- Installed `tailwindcss@^3` build toolchain.
- Generated `tailwind.config.js` with all custom brand tokens:
  - **Colors:** `blush` (50–400), `berry` (DEFAULT, light, dark, soft), `ink` (DEFAULT, muted, light), and `stargold`.
  - **Typography:** `sans` (Plus Jakarta Sans), `serif` (Playfair Display), `script` (Great Vibes).
  - **Elevations:** `rose`, `rose-sm`, `rose-md`, `phone`.
- Targeted safelist configured for dynamic interactive UI classes (`scale-95`, `scale-100`, `opacity-*`, `translate-y-*`, and status badges `bg-emerald-50`, `text-emerald-700`, `bg-sky-50`, `text-sky-700`, `bg-amber-50`, `text-amber-700`, `bg-rose-50`, `text-berry`).

### 2. Runtime Tailwind Elimination & CSS Compilation
- Removed `https://cdn.tailwindcss.com` runtime compiler script tag (~407 KB).
- Removed inline `<script>tailwind.config = { ... }</script>` block from `index.html`, `admin.html`, and `dual.html`.
- Compiled minified static stylesheet `public/css/styles.css` from `src/input.css` using Tailwind CLI.
- Linked `<link rel="stylesheet" href="./css/styles.css" />` in document `<head>`.

### File Size & Performance Summary (Phase 2)

| Resource / Metric | Runtime Tailwind (Before) | Compiled CSS (After) | Net Savings |
| :--- | :--- | :--- | :--- |
| **Runtime Compiler Script** | 407.0 KB (`cdn.tailwindcss.com`) | **0 KB** (Removed) | **−407.0 KB (−100%)** |
| **Inline Config Script** | 1.1 KB (per HTML page) | **0 KB** (Extracted to config) | **−1.1 KB** |
| **`css/styles.css` (Gzip Transfer)** | N/A (compiled in browser) | **13.29 KB** | **Far below 30 KB target** |
| **`css/styles.css` (Brotli Transfer)** | N/A (compiled in browser) | **10.31 KB** | **−97.5% vs runtime JS** |
| **`css/styles.css` (Uncompressed)** | N/A | 82.70 KB | Static CSS file |
| **Runtime JS Evaluation Time** | ~350–650 ms on mobile CPU | **0 ms** | Instant native styling |
| **Console Errors** | 0 | **0** | Clean execution |

---

## Phase 2 Fixes (`phase2-fixes` Branch)

1. **Push 404 Eliminated**:
   - Gated `/api/push/vapid-key`, `/api/push/subscribe`, and `/api/push/send-status` behind `window.MAK_PUSH_BACKEND_URL` (default empty / OFF) across `index.html`, `admin.html`, and `dual.html`. Zero 404 requests on GitHub Pages.
2. **Dynamic Leaflet Verified**:
   - Confirmed `leaflet.css` and `leaflet.js` load strictly inside `initShopLocationMap()` when Admin → `3. Shop Location` is opened (0 requests on Customer pages).
3. **Leftover PNG Logo References Removed**:
   - Replaced remaining `/images/mak-cake-logo.png` notification icon/badge references in `js/firebase-service.js` and root-relative `/images/*.webp` paths in `data/settings.json` with `./images/*.webp`.
4. **Hero Slideshow Optimization**:
   - Refactored `renderHero()` so all 4 slide `<img>` layers render once inside `#hero-slides-images` (Slide 0 eager with `fetchpriority="high"`, Slides 1–3 `loading="lazy"`), toggling `opacity-100`/`opacity-0` instead of mutating `img.src`. Eliminates canceled in-flight requests and duplicate fetches.
5. **Centralized Shop Settings & Dynamic Success Order ID**:
   - Added `SHOP_SETTINGS_CONFIG` (with clear `TODO` markers) loaded dynamically from `./data/settings.json` via `loadShopSettingsFromJson()`.
   - Fixed Checkout Step 2 Telebirr & CBE Copy buttons to copy live config numbers instead of hardcoded strings.
   - Removed hardcoded `#ORD-10047` from `#success-order-id` (populated dynamically by `openOrderSuccessPage()`).
6. **Service Worker Bump**:
   - Bumped `sw.js` `CACHE_NAME` to `mak-cake-pwa-v2.1` and verified all 13 `APP_SHELL` entries exist in `public/`.

---

## Phase 3: Performance Optimization & Code Restructuring (`phase3` Branch)

Branched from approved `phase2-fixes` commit `d769073c9761e449129d74a24505455382d04c7f`.

### Step 1 — Extract Inline CSS & JavaScript (`113a01f`)
- Extracted inline `<style>` (~22.5 KB) into `src/app.css` and minified to `public/css/app.css` (14,002 bytes / 13.7 KB) via `esbuild`.
- Extracted inline `<script>` (~694.9 KB) into `src/app.js` and minified to `public/js/app.js` (~471.7 KB).
- Fixed `pointer-events-none;` CSS syntax bug in `src/app.css` and guarded inline `<img onerror>` handlers with `if(window.SVG_CAKE_FALLBACK)` for `defer` safety.
- Added `npm run build` (`build:css` + `build:js`) in `package.json`.
- Reduced `index.html`, `admin.html`, and `dual.html` from ~932 KB each to ~215 KB each.

### Step 2 — Separate Customer Storefront from Admin Dashboard (`9f4204d`)
- Split `src/app.js` into three source files:
  - `src/shared.js` → `public/js/shared.js` (shared state, icons, catalog data, toasts, keyboard handling, `initApp`, back navigation)
  - `src/customer.js` → `public/js/app.js` (customer hero, home/menu/categories/favorites/cart renderers, 6-step order wizard, order success, tracker, notifications, contact sheet)
  - `src/admin.js` → `public/js/admin.js` (admin overview, orders, products, analytics, shop management, receipts, profile, login/logout)
- Removed `#panel-admin` from `public/index.html` (reduced to 83,030 bytes / ~81.1 KB) and `#panel-customer` from `public/admin.html` (reduced to 140,934 bytes / ~137.6 KB); kept both in `public/dual.html` (214,652 bytes / ~209.6 KB).
- Updated `/admin` links to `./admin.html` and added null/function guards in `shared.js` for standalone pages.
- Verified customer pages download zero admin HTML or JavaScript.

### Step 3 — Remove Duplicate & Dead Code (`3827c64`)
- Removed ~66.6 KB of shadowed/duplicate source code across `src/shared.js` and `src/admin.js`:
  - Legacy `showCustomerToast`, `showAdminToast`, and `showGlobalToast` in `src/shared.js` (1,264 bytes)
  - Duplicate `var SVG_CAKE_FALLBACK` declaration in `src/shared.js` (123 bytes)
  - Legacy `setAnalyticsProductTab`, `getAnalyticsOrders`, and `renderAdminAnalytics` in `src/admin.js` (24,877 bytes)
  - Legacy `setAdminShopSection` in `src/admin.js` (85 bytes)
  - Legacy `renderAdminShop` in `src/admin.js` (41,852 bytes)
- Replaced stale `renderAdminProducts()` call in `switchAdminTab()` with guarded `renderAdminMenu()`, `renderAdminDecorations()`, and `renderAdminCreations()` calls.

### Step 4 — Optimize `syncAll()` & Initial Rendering (`21fd051`)
- Added `loadedAdminTabs`, `invalidateAdminTabCache()`, and `renderActiveAdminTab()` so `syncAll()` and `initApp()` render only the active tab on initial load and lazily render hidden tabs on first visit.
- Removed redundant `renderAdminOverview()` and `renderAdminHero()` boot calls and gated `resetAdminHeroTimer()` to run only while `adminTab === 'overview'`.
- Updated customer `syncAll()` to render only the active `customerTab` instead of re-rendering Home sections while on other tabs.
- Replaced full `syncAll()` calls with targeted DOM updates:
  - `toggleAdminBell()` → `updateAdminBellUI()`
  - `updateCartQty()`, `clearCart()`, `addToCartFromSheet()` → `updateCustomerBadges()` + `renderCartTab()` / `invalidateCustomerTabCache('cart')`
- **Measured DOM reduction on `admin.html` initial load:** **3,572 → 1,130 DOM elements (−2,442 / −68.4%)**; customer storefront remains **987** elements on initial Home load (expanding lazily to **1,789** after opening all tabs).

### Step 5 — Update Service Worker & Caching (`1af5275`)
- Updated `public/sw.js` `CACHE_NAME` to `mak-cake-pwa-v3.0` and added separate `ADMIN_CACHE_NAME = 'mak-cake-admin-v3.0'`.
- Updated `APP_SHELL` (14 customer & shared entries) to cache `./css/styles.css?v=2`, `./css/app.css?v=2`, `./js/shared.js?v=6`, `./js/app.js?v=4`, Firebase scripts, manifest, and WebP/hero images, while excluding `admin.html`, `dual.html`, and `js/admin.js` from customer pre-caching.
- Routed `/admin.html`, `/dual.html`, and `/js/admin.js` to `mak-cake-admin-v3.0` via `isAdminAsset(url)` and bumped asset query strings in `index.html`, `admin.html`, and `dual.html`.

### File Size Summary (End of Phase 3)

| File | Before Phase 3 (`phase2-fixes`) | After Phase 3 (`phase3`) | Notes |
| :--- | :--- | :--- | :--- |
| `public/index.html` | ~923 KB | **83,030 bytes (~81.1 KB)** | Customer-only HTML; CSS/JS externalized |
| `public/admin.html` | ~923 KB | **140,934 bytes (~137.6 KB)** | Admin-only HTML; CSS/JS externalized |
| `public/dual.html` | ~923 KB | **214,652 bytes (~209.6 KB)** | Dual-view HTML; CSS/JS externalized |
| `public/css/app.css` | Inline in HTML | **14,002 bytes (13.7 KB)** | Minified custom CSS |
| `public/css/styles.css` | 56,030 bytes | **56,030 bytes (54.7 KB)** | Compiled Tailwind CSS |
| `public/js/shared.js` | Inline in HTML | **71,728 bytes (70.0 KB)** | Minified shared runtime |
| `public/js/app.js` | Inline in HTML | **149,112 bytes (145.6 KB)** | Minified customer bundle |
| `public/js/admin.js` | Inline in HTML | **263,508 bytes (257.3 KB)** | Minified admin bundle (never loaded on `index.html`) |

### Phase 3 Verification Results
- **Build:** `npm run build` completed cleanly with exit code `0`.
- **Console Errors:** Customer storefront (`index.html`) and Admin dashboard (`admin.html`) loaded and operated with **0 JavaScript console errors**.
- **Asset Separation:** Confirmed `admin.js` and `admin.html` are not requested or pre-cached for customer visitors.
- **`APP_SHELL` Integrity:** All **14** `APP_SHELL` entries verified present on disk and returning **HTTP 200**.
- **Service Worker & Offline (Chrome DevTools):**
  - Service Worker (`sw.js`, `mak-cake-pwa-v3.0`) activated and controlling pages.
  - Customer cache (`mak-cake-pwa-v3.0`) and admin cache (`mak-cake-admin-v3.0`) verified separately in Chrome Cache Storage.
  - Customer storefront worked offline; admin dashboard worked offline after its first online visit; both pages recovered normally after restoring **No throttling**.

### Known Limitations & Future Phase Notes
- **Google Sign-In / Firebase Auth:** Not fully verified against the live Firebase-authorized domain (`elnadigital.github.io`); local testing on `127.0.0.1` returns `auth/api-key-not-valid` as expected.
- **Static-Host `/api/*` Endpoints:** `/api/shop-management` and `/api/admin/*` return HTTP 404 on static hosting and fall back to local/default state.
- **`index.html` Size (~81.1 KB):** Reduced ~91% from ~923 KB, but remains above a strict `< 60 KB` target due to static customer modal/sheet/wizard HTML markup (candidate for a future phase if further HTML templating/extraction is desired).
- **Push Notifications & Firestore Order Sync:** Gated OFF by default (`MAK_PUSH_BACKEND_URL` empty, `MAK_ENABLE_FIRESTORE_ORDER_SYNC` not enabled) until backend and Firestore security rules are configured.
