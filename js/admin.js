let adminNotifications=[];function toggleAdminNotifications(t){const e=document.getElementById("admin-notif-modal"),o=document.getElementById("admin-notif-backdrop");if(!e||!o)return;(t!==void 0?t:e.classList.contains("hidden"))?(renderAdminNotifications(),o.classList.remove("hidden"),e.classList.remove("hidden")):(o.classList.add("hidden"),e.classList.add("hidden"))}function renderAdminNotifications(){const t=document.getElementById("admin-notif-list"),e=document.getElementById("admin-notif-badge");if(!t)return;const o=adminNotifications.filter(n=>n.unread).length;if(e&&(e.textContent=o,e.classList.toggle("hidden",o===0)),!adminNotifications.length){t.innerHTML=`
          <div class="py-6 text-center text-ink-muted">
            <svg class="w-8 h-8 mx-auto text-ink-muted/40 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <div class="text-xs font-bold text-ink">No new notifications</div>
            <p class="text-[10px]">All kitchen and order alerts are cleared.</p>
          </div>
        `;return}t.innerHTML=adminNotifications.map(n=>`
        <div onclick="handleAdminNotificationClick(${n.id})" class="p-2.5 rounded-2xl border ${n.unread?"bg-blush-50/90 border-berry/30 shadow-2xs":"bg-white border-blush-100"} hover:bg-blush-100/60 transition-all cursor-pointer flex items-start gap-2.5">
          <div class="w-7 h-7 rounded-full ${n.type==="order"?"bg-berry/15 text-berry":n.type==="payment"?"bg-amber-100 text-amber-800":"bg-emerald-100 text-emerald-800"} flex items-center justify-center shrink-0 mt-0.5">
            ${n.type==="order"?'<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>':n.type==="payment"?'<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>':'<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <span class="text-[11px] font-extrabold text-ink truncate">${n.title}</span>
              <span class="text-[9.5px] text-ink-muted shrink-0">${n.time}</span>
            </div>
            <p class="text-[10px] text-ink-muted leading-tight mt-0.5 line-clamp-2">${n.desc}</p>
          </div>
          ${n.unread?'<span class="w-2 h-2 rounded-full bg-berry shrink-0 mt-1.5"></span>':""}
        </div>
      `).join("")}function handleAdminNotificationClick(t){const e=adminNotifications.find(o=>o.id===t);e&&(e.unread=!1,renderAdminNotifications(),typeof e.action=="function"&&e.action())}function clearAdminNotifications(){adminNotifications=[],renderAdminNotifications(),showAdminToast("Notifications cleared")}function addAdminNotification(t,e,o="system",n=null){adminNotifications.unshift({id:Date.now(),type:o,title:t,desc:e,time:"Just now",unread:!0,action:n||(()=>toggleAdminNotifications(!1))}),renderAdminNotifications()}let quickUploadActivePhoto="",quickUploadProductType="cake";function openQuickUploadModal(){toggleAdminNotifications(!1),quickUploadActivePhoto="",quickUploadProductType="cake",document.getElementById("quick-cake-name").value="",document.getElementById("quick-cake-price").value="2800",document.getElementById("quick-cake-desc").value="",document.getElementById("quick-cake-stock").value="true",setQuickProductType("cake");const t=document.getElementById("quick-upload-step-choose"),e=document.getElementById("quick-upload-step-details");t&&t.classList.remove("hidden"),e&&e.classList.add("hidden");const o=document.getElementById("quick-modal-title"),n=document.getElementById("quick-step-indicator");o&&(o.textContent="Add New Creation"),n&&(n.textContent="Choose photo source first");const s=document.getElementById("quick-photo-preview-img");s&&(s.src="");const a=document.getElementById("quick-upload-backdrop"),i=document.getElementById("quick-upload-sheet");a&&a.classList.remove("hidden"),i&&(i.classList.remove("hidden"),requestAnimationFrame(()=>i.classList.remove("translate-y-full")))}function closeQuickUploadModal(){const t=document.getElementById("quick-upload-backdrop"),e=document.getElementById("quick-upload-sheet");e&&e.classList.add("translate-y-full"),setTimeout(()=>{t&&t.classList.add("hidden"),e&&e.classList.add("hidden")},300)}function triggerQuickCamera(){const t=document.getElementById("quick-camera-input");t&&(t.value="",t.click())}function triggerQuickGallery(){const t=document.getElementById("quick-gallery-input");t&&(t.value="",t.click())}function backToPhotoStep(){const t=document.getElementById("quick-upload-step-choose"),e=document.getElementById("quick-upload-step-details");t&&t.classList.remove("hidden"),e&&e.classList.add("hidden");const o=document.getElementById("quick-modal-title"),n=document.getElementById("quick-step-indicator");o&&(o.textContent="Add New Creation"),n&&(n.textContent="Choose photo source first")}function handleQuickUploadFileInput(t){const e=t.files&&t.files[0];if(!e)return;if(e.type&&!e.type.startsWith("image/")){showAdminToast("Please select a photo only (PNG, JPG, WEBP)"),t.value="";return}const o=new FileReader;o.onload=function(n){const s=new Image;s.onload=function(){let a="";try{const r=Math.min(1,800/s.width),l=document.createElement("canvas");l.width=Math.round(s.width*r),l.height=Math.round(s.height*r);const c=l.getContext("2d");if(c.drawImage(s,0,0,l.width,l.height),a=l.toDataURL("image/jpeg",.76),a.length>5e5){const d=Math.min(1,520/s.width);l.width=Math.round(s.width*d),l.height=Math.round(s.height*d),c.drawImage(s,0,0,l.width,l.height),a=l.toDataURL("image/jpeg",.58)}}catch{a=n.target.result}applyQuickPhotoSelected(a,e.name||"Bakery Photo")},s.onerror=function(){showAdminToast("Could not read this image format. Please choose JPG, PNG, or WEBP.")},s.src=n.target.result},o.readAsDataURL(e)}function selectQuickPresetPhoto(t,e,o,n){applyQuickPhotoSelected(t,e);const s=document.getElementById("quick-cake-name");if(s&&(s.value=e),o){const a=document.getElementById("quick-cake-cat");a&&(a.value=o)}if(n){const a=document.getElementById("quick-cake-price");a&&(a.value=n)}}function applyQuickPhotoSelected(t,e="Custom Bakery Photo"){quickUploadActivePhoto=t;const o=document.getElementById("quick-photo-preview-img");o&&(o.src=t);const n=document.getElementById("quick-photo-name-label");n&&(n.textContent=e);const s=document.getElementById("quick-upload-step-choose"),a=document.getElementById("quick-upload-step-details");s&&s.classList.add("hidden"),a&&a.classList.remove("hidden");const i=document.getElementById("quick-modal-title"),r=document.getElementById("quick-step-indicator");i&&(i.textContent="Creation Details"),r&&(r.textContent="Step 2: Fill details & publish");const l=document.getElementById("quick-cake-name");l&&!l.value&&setTimeout(()=>l.focus(),150)}function setQuickProductType(t){quickUploadProductType=t;const e=document.getElementById("quick-type-cake"),o=document.getElementById("quick-type-dec"),n=document.getElementById("quick-type-creation"),s=document.getElementById("quick-cake-cat"),a=document.getElementById("quick-price-wrap"),i=document.getElementById("quick-stock-wrap");if(!e||!o||!s)return;const r="py-1.5 px-1 rounded-xl text-[11px] font-bold bg-berry text-white shadow-rose-sm transition-all cursor-pointer truncate",l="py-1.5 px-1 rounded-xl text-[11px] font-bold bg-blush-100 text-ink hover:bg-blush-200 transition-all cursor-pointer truncate";e.className=t==="cake"?r:l,o.className=t==="dec"?r:l,n&&(n.className=t==="creation"?r:l),a&&a.classList.toggle("hidden",t==="creation"),i&&i.classList.toggle("hidden",t==="creation"),t==="cake"?s.innerHTML=`
          <option value="Bento">Bento</option>
          <option value="Birthday Cakes">Birthday Cakes</option>
          <option value="Wedding Cakes">Wedding Cakes</option>
          <option value="Normal">Normal</option>
          <option value="Special">Special</option>
          <option value="Cupples">Cupples</option>
          <option value="Mini Cakes">Mini Cakes</option>
        `:t==="creation"?s.innerHTML=`
          <option value="Birthday">Birthday</option>
          <option value="Wedding">Wedding</option>
          <option value="Bento">Bento</option>
          <option value="Chocolate Cakes">Chocolate Cakes</option>
          <option value="Anniversary">Anniversary</option>
          <option value="Custom">Custom</option>
        `:s.innerHTML=`
          <option value="Candles & Toppers">Candles &amp; Toppers</option>
          <option value="Surprise Items">Surprise Items</option>
          <option value="Party Accessories">Party Accessories</option>
          <option value="Tableware & Decor">Tableware &amp; Decor</option>
          <option value="Custom Packaging">Custom Packaging</option>
          <option value="Balloon Extras">Balloon Extras</option>
        `}function submitQuickUploadProduct(){const t=(document.getElementById("quick-cake-name").value||"").trim(),e=document.getElementById("quick-cake-cat").value,o=parseFloat(document.getElementById("quick-cake-price").value),n=document.getElementById("quick-cake-stock").value==="true",s=(document.getElementById("quick-cake-desc").value||"").trim();if(!quickUploadActivePhoto){showAdminToast("Please take or choose a photo first!","error"),backToPhotoStep();return}if(!t){showAdminToast("Please enter a title or product name!","error"),document.getElementById("quick-cake-name").focus();return}if(quickUploadProductType!=="creation"&&(isNaN(o)||o<=0)){showAdminToast("Please enter a valid price in ETB!","error"),document.getElementById("quick-cake-price").focus();return}if(quickUploadProductType==="cake"){const a={id:Date.now(),name:t,category:e,price:o,inStock:n,img:quickUploadActivePhoto,desc:s||"Handcrafted fresh daily in Bole with premium luxury ingredients.",rating:5,reviews:1,popular:!0};state.cakes.unshift(a),saveState(),syncAll(),window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.saveProduct=="function"&&window.FirebaseService.saveProduct(a).catch(i=>console.warn("Cloud product sync failed:",i)),addAdminNotification("New Cake Published",`${t} added to ${e} (${o} ETB)`,"order"),showAdminToast("Submitted successfully!","success"),showCustomerToast(`New Cake: ${t} added to menu!`,"success")}else if(quickUploadProductType==="creation"){Array.isArray(state.creations)||(state.creations=[]);const a={id:"cr-"+Date.now(),title:t,category:e,caption:s||"Freshly handcrafted in Bole Kitchen.",date:"Today",img:quickUploadActivePhoto,published:!0,createdAt:new Date().toISOString()};state.creations.unshift(a),saveState(),syncAll(),window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.saveCreation=="function"&&window.FirebaseService.saveCreation(a).catch(i=>{console.warn("Cloud creation sync failed:",i),showAdminToast("Saved locally; cloud sync failed.","error")}),addAdminNotification("New Recent Creation",`${t} added to Recent Creations (${e})`,"order"),showAdminToast("Submitted successfully!","success"),showCustomerToast(`New Creation: ${t} added!`,"success")}else{const a={id:Date.now(),name:t,category:e,price:o,inStock:n,img:quickUploadActivePhoto,desc:s||"Celebration party extra decoration."};state.decorations.unshift(a),saveState(),syncAll(),window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.saveDecoration=="function"&&ensureDecorationsSeededInCloud(state.decorations).then(()=>window.FirebaseService.saveDecoration(a)).catch(i=>console.warn("Cloud decoration sync failed:",i)),addAdminNotification("New Extra Added",`${t} added to ${e} (${o} ETB)`,"order"),showAdminToast("Submitted successfully!","success")}if(closeQuickUploadModal(),switchAdminTab("products"),quickUploadProductType==="creation"&&typeof setAdminMenuTab=="function")try{setAdminMenuTab("creations")}catch{}}function openAdminSidebar(){if(typeof isAdminSessionLocked<"u"&&isAdminSessionLocked){lockAdminPortal();return}const t=document.getElementById("admin-sidebar-backdrop"),e=document.getElementById("admin-sidebar-drawer");t&&(t.classList.remove("hidden"),requestAnimationFrame(()=>{t.classList.remove("opacity-0"),t.classList.add("opacity-100")})),e&&(e.classList.remove("-translate-x-full"),e.classList.add("translate-x-0"))}function closeAdminSidebar(){const t=document.getElementById("admin-sidebar-backdrop"),e=document.getElementById("admin-sidebar-drawer");e&&(e.classList.add("-translate-x-full"),e.classList.remove("translate-x-0")),t&&(t.classList.remove("opacity-100"),t.classList.add("opacity-0")),setTimeout(()=>{t&&t.classList.add("hidden")},280)}function selectAdminDrawerItem(t,e){if(document.querySelectorAll("#admin-drawer-nav-list .admin-drawer-item").forEach(o=>{const n=o.dataset.drawerItem===t;o.classList.toggle("bg-blush-50",n),o.classList.toggle("border-berry/40",n),o.classList.toggle("shadow-rose-sm",n),o.classList.toggle("bg-white",!n),o.classList.toggle("border-blush-100",!n);const s=o.querySelector(".drawer-item-icon");s&&(s.classList.toggle("bg-berry",n),s.classList.toggle("text-white",n),s.classList.toggle("bg-blush-100",!n),s.classList.toggle("text-berry",!n));const a=o.querySelector(".drawer-item-label");a&&(a.classList.toggle("text-berry",n),a.classList.toggle("text-ink",!n));const i=o.querySelector(".drawer-item-chevron");i&&(i.classList.toggle("text-berry",n),i.classList.toggle("text-ink-light",!n))}),t==="my-profile"){openMyProfilePage();return}if(t==="shop-management"){openShopManagementSection();return}if(t==="product-configuration"){openProductConfigSection();return}if(t==="marketing-promotions"){openMarketingSection();return}if(t==="settings"){openSettingsHubSection();return}if(t==="upgrade-plan"){openUpgradePlanPage();return}typeof showAdminToast=="function"&&showAdminToast(e+" selected")}let adminProfileData={id:"mgr-01",name:"Mahlet Mekonnen (Owner)",email:"owner@makcake.et",phone:"0911 23 45 67",role:"Owner",avatar:"./images/mak-cake-logo.webp",shopName:"MAK CAKE \u2022 Bole Kitchen",googleConnected:!1,googleEmail:"",googleClientId:""},isProfileEditMode=!1,pendingProfileAvatarData;function syncAdminProfileUI(){const t=adminProfileData,e=document.getElementById("drawer-admin-avatar"),o=document.getElementById("drawer-admin-name"),n=document.getElementById("drawer-admin-role"),s=document.getElementById("drawer-admin-shop");e&&t.avatar&&(e.src=t.avatar,e.style.display=""),o&&(o.textContent=t.name||"MAK CAKE Owner"),n&&(n.textContent=t.role||"Owner"),s&&(s.textContent=t.shopName||"MAK CAKE \u2022 Bole Kitchen");const a=document.getElementById("profile-avatar-preview"),i=document.getElementById("profile-display-name"),r=document.getElementById("profile-role-badge"),l=document.getElementById("profile-role-text"),c=document.getElementById("profile-input-name"),d=document.getElementById("profile-input-email"),u=document.getElementById("profile-input-phone");a&&(a.src=pendingProfileAvatarData||t.avatar||"./images/mak-cake-logo.webp",a.style.display=""),i&&(i.textContent=t.name||"MAK CAKE Owner"),r&&(r.textContent=t.role||"Owner"),l&&(l.textContent=t.role||"Owner"),c&&!isProfileEditMode&&(c.value=t.name||""),d&&!isProfileEditMode&&(d.value=t.email||""),u&&!isProfileEditMode&&(u.value=t.phone||"");const m=document.getElementById("profile-google-status-badge"),f=document.getElementById("profile-google-email-display"),g=document.getElementById("profile-google-connect-btn"),b=document.getElementById("profile-google-disconnect-btn");t.googleConnected&&t.googleEmail?(m&&(m.textContent="Connected",m.className="px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200"),f&&(f.textContent=t.googleEmail),g&&g.classList.add("hidden"),b&&b.classList.remove("hidden")):(m&&(m.textContent="Not Connected",m.className="px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold bg-blush-100 text-berry border border-blush-200"),f&&(f.textContent="No Google account linked"),g&&g.classList.remove("hidden"),b&&b.classList.add("hidden"))}async function loadAdminProfileFromDb(){try{const t=await fetch("/api/admin/profile",{cache:"no-store"});if(t.ok){const e=await t.json();if(e.success&&e.profile){adminProfileData={...adminProfileData,...e.profile},localStorage.setItem("mak_admin_profile_v1",JSON.stringify(adminProfileData)),syncAdminProfileUI();return}}}catch{}try{const t=localStorage.getItem("mak_admin_profile_v1");t&&(adminProfileData={...adminProfileData,...JSON.parse(t)})}catch{}syncAdminProfileUI()}function openMyProfilePage(){setProfileEditMode(!1),switchAdminTab("profile"),loadAdminProfileFromDb()}function setProfileEditMode(t){isProfileEditMode=t,pendingProfileAvatarData=void 0;const e=document.getElementById("profile-validation-error");e&&(e.classList.add("hidden"),e.textContent=""),[document.getElementById("profile-input-name"),document.getElementById("profile-input-email"),document.getElementById("profile-input-phone")].forEach(i=>{i&&(i.readOnly=!t,i.classList.toggle("bg-white",t),i.classList.toggle("border-berry/40",t),i.classList.toggle("bg-blush-50/70",!t),i.classList.toggle("border-blush-200/80",!t))});const n=document.getElementById("profile-change-photo-btn"),s=document.getElementById("profile-save-bar"),a=document.getElementById("profile-edit-toggle-label");n&&n.classList.toggle("hidden",!t),s&&s.classList.toggle("hidden",!t),a&&(a.textContent=t?"Editing":"Edit Profile"),t||syncAdminProfileUI()}function toggleProfileEditMode(){setProfileEditMode(!isProfileEditMode)}function cancelProfileEdit(){setProfileEditMode(!1)}function handleAdminProfilePhotoChange(t){const e=t.files&&t.files[0];if(!e)return;if(!e.type.startsWith("image/")){showProfileValidationError("Please select a valid image file (PNG, JPG, or WebP).");return}const o=new FileReader;o.onload=n=>{pendingProfileAvatarData=n.target.result;const s=document.getElementById("profile-avatar-preview");s&&(s.src=pendingProfileAvatarData,s.style.display=""),isProfileEditMode||setProfileEditMode(!0)},o.readAsDataURL(e)}function showProfileValidationError(t){const e=document.getElementById("profile-validation-error");e&&(e.textContent=t,e.classList.remove("hidden"))}async function saveAdminProfileChanges(){const t=(document.getElementById("profile-input-name")?.value||"").trim(),e=(document.getElementById("profile-input-email")?.value||"").trim().toLowerCase(),o=(document.getElementById("profile-input-phone")?.value||"").trim();if(t.length<2){showProfileValidationError("Full name must be at least 2 characters.");return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)){showProfileValidationError("Please enter a valid email address.");return}if(o.replace(/\D/g,"").length<9){showProfileValidationError("Please enter a valid phone number (at least 9 digits).");return}const n=document.getElementById("profile-save-btn");await runWithFeedback({lockKey:"save-admin-profile",btnEl:n,scope:"admin",loadingMsg:"Saving profile...",successMsg:"Changes saved successfully!",action:async()=>{const s={name:t,email:e,phone:o};pendingProfileAvatarData&&(s.avatar=pendingProfileAvatarData);const a=await fetch("/api/admin/profile",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)}),i=await a.json();if(!a.ok||!i.success)throw showProfileValidationError(i.error||"Could not save profile changes."),new Error(i.error||"Could not save profile changes.");return adminProfileData={...adminProfileData,...i.profile},localStorage.setItem("mak_admin_profile_v1",JSON.stringify(adminProfileData)),setProfileEditMode(!1),syncAdminProfileUI(),!0}})}function openGoogleConnectModal(){const t=document.getElementById("profile-google-oauth-backdrop"),e=document.getElementById("profile-google-oauth-modal"),o=document.getElementById("profile-google-oauth-email"),n=document.getElementById("profile-google-oauth-error");n&&n.classList.add("hidden"),o&&!o.value&&(o.value=adminProfileData.googleEmail||adminProfileData.email||"natnaelagizew27@gmail.com"),t&&t.classList.remove("hidden"),e&&e.classList.remove("hidden")}function closeGoogleConnectModal(){const t=document.getElementById("profile-google-oauth-backdrop"),e=document.getElementById("profile-google-oauth-modal");t&&t.classList.add("hidden"),e&&e.classList.add("hidden")}function openGoogleConnectFlow(){typeof showAdminToast=="function"&&showAdminToast("Admin uses Firebase Username & Password authentication.")}async function completeGoogleConnectRequest(t){try{await fetch("/api/admin/google-connect",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}catch{}adminProfileData.googleConnected=!0,adminProfileData.googleEmail=t.email,t.name&&(adminProfileData.name=t.name),t.picture&&(adminProfileData.avatar=t.picture),localStorage.setItem("mak_admin_profile_v1",JSON.stringify(adminProfileData)),typeof syncAdminProfileUI=="function"&&syncAdminProfileUI(),closeGoogleConnectModal(),typeof showAdminToast=="function"&&showAdminToast("\u2713 Google account connected: "+adminProfileData.googleEmail,"success")}async function submitGoogleConnect(){const t=(document.getElementById("profile-google-oauth-email")?.value||"").trim().toLowerCase(),e=document.getElementById("profile-google-oauth-error");if(!/^[^s@]+@[^s@]+.[^s@]+$/.test(t)){e&&(e.textContent="Please enter a valid Google email address.",e.classList.remove("hidden"));return}try{await completeGoogleConnectRequest({email:t,name:adminProfileData.name,picture:adminProfileData.avatar})}catch(o){e&&(e.textContent=o.message,e.classList.remove("hidden"))}}async function disconnectGoogleAccount(){try{await fetch("/api/admin/google-disconnect",{method:"POST"})}catch{}adminProfileData.googleConnected=!1,adminProfileData.googleEmail="",localStorage.setItem("mak_admin_profile_v1",JSON.stringify(adminProfileData)),syncAdminProfileUI(),typeof showAdminToast=="function"&&showAdminToast("Google account disconnected","success")}function openAdminShopScreen(){closeAdminSidebar(),switchAdminTab("shop")}function openAdminSettingsScreen(){closeAdminSidebar(),switchAdminTab("settings")}function openAdminProfileModal(){closeAdminSidebar();const t=document.getElementById("admin-profile-modal-backdrop"),e=document.getElementById("admin-profile-modal");t&&t.classList.remove("hidden"),e&&e.classList.remove("hidden")}function closeAdminProfileModal(){const t=document.getElementById("admin-profile-modal-backdrop"),e=document.getElementById("admin-profile-modal");t&&t.classList.add("hidden"),e&&e.classList.add("hidden")}let isAdminSessionLocked=!1;function handleAdminLogout(){closeAdminSidebar();const t=document.getElementById("admin-logout-backdrop"),e=document.getElementById("admin-logout-modal");t&&t.classList.remove("hidden"),e&&e.classList.remove("hidden")}function closeAdminLogoutModal(){const t=document.getElementById("admin-logout-backdrop"),e=document.getElementById("admin-logout-modal");t&&t.classList.add("hidden"),e&&e.classList.add("hidden")}async function confirmAdminLogout(){const t=document.getElementById("admin-confirm-logout-btn");t&&(t.disabled=!0);try{await fetch("/api/admin/logout",{method:"POST"})}catch{}try{localStorage.setItem("mak_admin_logged_out","1"),localStorage.removeItem("mak_admin_auth_token"),sessionStorage.clear(),window.google&&google.accounts&&google.accounts.id&&google.accounts.id.disableAutoSelect(),window.FirebaseService&&typeof window.FirebaseService.signOut=="function"&&window.FirebaseService.signOut().catch(()=>{}),typeof unsubscribeAdminOrders=="function"&&unsubscribeAdminOrders()}catch{}closeAdminLogoutModal(),lockAdminPortal(),t&&(t.disabled=!1)}function lockAdminPortal(){isAdminSessionLocked=!0,typeof state<"u"&&state&&(state.orders=[],typeof saveState=="function"&&saveState()),closeAdminSidebar();const t=document.getElementById("admin-login-gate"),e=document.getElementById("admin-login-gate-err");e&&(e.classList.add("hidden"),e.textContent=""),t&&t.classList.remove("hidden")}const ADMIN_USERNAME_MAP={admin:typeof DEFAULT_OWNER_EMAIL=="string"&&DEFAULT_OWNER_EMAIL?DEFAULT_OWNER_EMAIL:"natnaelagizew27@gmail.com",makcake:typeof DEFAULT_OWNER_EMAIL=="string"&&DEFAULT_OWNER_EMAIL?DEFAULT_OWNER_EMAIL:"natnaelagizew27@gmail.com",owner:typeof DEFAULT_OWNER_EMAIL=="string"&&DEFAULT_OWNER_EMAIL?DEFAULT_OWNER_EMAIL:"natnaelagizew27@gmail.com"};function resolveAdminLoginEmail(t){const e=(t||"").trim().toLowerCase();return e?e.includes("@")?e:ADMIN_USERNAME_MAP[e]||"":""}function toggleAdminPasswordVisibility(){const t=document.getElementById("admin-login-password"),e=document.getElementById("admin-password-eye-open"),o=document.getElementById("admin-password-eye-closed"),n=document.getElementById("admin-password-toggle-btn");if(!t)return;const s=t.type==="password";t.type=s?"text":"password",e&&e.classList.toggle("hidden",s),o&&o.classList.toggle("hidden",!s),n&&n.setAttribute("aria-label",s?"Hide password":"Show password")}async function submitAdminGateLogin(t){t&&typeof t.preventDefault=="function"&&t.preventDefault();const e=document.getElementById("admin-login-username"),o=document.getElementById("admin-login-password"),n=document.getElementById("admin-login-submit-btn"),s=document.getElementById("admin-login-gate-err"),a=(e?.value||"").trim(),i=o?.value||"";if(s&&(s.classList.add("hidden"),s.textContent=""),!a||!i){s&&(s.textContent="Please enter both username and password.",s.classList.remove("hidden"));return}const r=resolveAdminLoginEmail(a);if(!r){s&&(s.textContent="Invalid username or password.",s.classList.remove("hidden"));return}n&&(n.disabled=!0,n.classList.add("opacity-75"),n.textContent="Signing in...");try{if(!window.FirebaseService&&!window.__firebaseServiceReady&&await new Promise(c=>{const d=()=>{window.removeEventListener("firebase-service-ready",d),c()};window.addEventListener("firebase-service-ready",d),setTimeout(c,2e3)}),!window.FirebaseService||!window.FirebaseService.isAvailable||!window.FirebaseService.isAvailable()||typeof window.FirebaseService.signInWithEmailPassword!="function")throw new Error("Authentication service is unavailable. Please check your internet connection.");const l=await window.FirebaseService.signInWithEmailPassword(r,i);if(!isAuthorizedAdminUser(l))throw await window.FirebaseService.signOut().catch(()=>{}),new Error("Unauthorized account. Only the authorized admin can access this dashboard.");o&&(o.value=""),unlockAdminWithAuthorizedUser(l),switchAdminTab("overview"),typeof showAdminToast=="function"&&showAdminToast("Signed in to MAK CAKE Admin","success")}catch(l){const c=l&&l.code?l.code:"";let d=l&&l.message||"Sign in failed. Please try again.";["auth/wrong-password","auth/user-not-found","auth/invalid-credential","auth/invalid-login-credentials"].includes(c)?d="Invalid username or password.":c==="auth/too-many-requests"?d="Too many failed attempts. Please wait a moment and try again.":c==="auth/operation-not-allowed"?d="Email/Password sign-in is not enabled in Firebase Authentication.":c==="auth/network-request-failed"&&(d="Network error. Please check your internet connection."),s&&(s.textContent=d,s.classList.remove("hidden"))}finally{n&&(n.disabled=!1,n.classList.remove("opacity-75"),n.textContent="Sign In")}}function checkInitialAdminLockState(){if(localStorage.getItem("mak_admin_logged_out")==="1"){lockAdminPortal();return}if(!document.getElementById("panel-customer")){const t=window.FirebaseService&&typeof window.FirebaseService.getCurrentUser=="function"?window.FirebaseService.getCurrentUser():null;isAuthorizedAdminUser(t)||lockAdminPortal()}}let _adminAuthSyncBound=!1,_adminOrdersUnsub=null;function isAuthorizedAdminUser(t){if(!t||!t.email)return!1;const e=typeof DEFAULT_OWNER_EMAIL=="string"&&DEFAULT_OWNER_EMAIL?DEFAULT_OWNER_EMAIL.toLowerCase():"natnaelagizew27@gmail.com";return t.email.toLowerCase()===e}function unsubscribeAdminOrders(){if(typeof _adminOrdersUnsub=="function"){try{_adminOrdersUnsub()}catch{}_adminOrdersUnsub=null}}function mergeCloudOrdersWithLocal(t){if(!Array.isArray(t))return;const e=t.map(o=>({...o,firestoreDocId:o.firestoreDocId||String(o.id)}));e.sort((o,n)=>{const s=o.createdAt?Date.parse(o.createdAt):0,a=n.createdAt?Date.parse(n.createdAt):0;return s!==a?a-s:Number(n.id||0)-Number(o.id||0)}),state.orders=e}function applyCloudOrderSnapshot(t,e){if(mergeCloudOrdersWithLocal(t),saveState(),typeof invalidateAdminTabCache=="function"&&invalidateAdminTabCache(),typeof renderAdminNotifications=="function"&&renderAdminNotifications(),typeof renderActiveAdminTab=="function"){const o=typeof adminTab<"u"&&adminTab?adminTab:"overview";renderActiveAdminTab(o),typeof loadedAdminTabs<"u"&&loadedAdminTabs.add(o==="menu"?"products":o)}e&&(typeof playBell=="function"&&playBell(),typeof showAdminToast=="function"&&showAdminToast(`New Order #ORD-${e.id} from ${e.customerName||"Customer"}!`,"success"))}function startAdminOrderSubscription(){_adminOrdersUnsub||window.MAK_ENABLE_FIRESTORE_ORDER_SYNC!==!0||!window.FirebaseService||typeof window.FirebaseService.subscribeToOrders!="function"||(_adminOrdersUnsub=window.FirebaseService.subscribeToOrders({onInitialLoad:t=>applyCloudOrderSnapshot(t,null),onSnapshot:t=>applyCloudOrderSnapshot(t,null),onNewOrder:t=>{typeof addAdminNotification=="function"&&addAdminNotification(`New Order #ORD-${t.id}`,`${t.customerName||"Customer"} \u2022 ${t.cakeName||"Custom Cake"}`,"order"),typeof playBell=="function"&&playBell(),typeof showAdminToast=="function"&&showAdminToast(`New Order #ORD-${t.id} from ${t.customerName||"Customer"}!`,"success")},onError:t=>{t&&t.code==="permission-denied"&&unsubscribeAdminOrders()}}))}function unlockAdminWithAuthorizedUser(t){if(!isAuthorizedAdminUser(t))return;localStorage.removeItem("mak_admin_logged_out"),isAdminSessionLocked=!1,adminProfileData.googleConnected=!0,adminProfileData.googleEmail=t.email,t.displayName&&(adminProfileData.name=t.displayName),t.photoURL&&(adminProfileData.avatar=t.photoURL),localStorage.setItem("mak_admin_profile_v1",JSON.stringify(adminProfileData)),typeof syncAdminProfileUI=="function"&&syncAdminProfileUI();const e=document.getElementById("admin-login-gate");e&&e.classList.add("hidden");const o=document.getElementById("admin-login-gate-err");o&&(o.classList.add("hidden"),o.textContent=""),typeof applyPackageLocksToUI=="function"&&applyPackageLocksToUI(),typeof syncCustomCategoryOptions=="function"&&syncCustomCategoryOptions(),startAdminOrderSubscription()}function initAdminFirestoreSync(){if(_adminAuthSyncBound){const t=window.FirebaseService&&typeof window.FirebaseService.getCurrentUser=="function"?window.FirebaseService.getCurrentUser():null;isAuthorizedAdminUser(t)&&localStorage.getItem("mak_admin_logged_out")!=="1"&&unlockAdminWithAuthorizedUser(t);return}if(!window.FirebaseService||typeof window.FirebaseService.onAuthStateChanged!="function"){window.addEventListener("firebase-service-ready",()=>initAdminFirestoreSync(),{once:!0});return}_adminAuthSyncBound=!0,window.FirebaseService.onAuthStateChanged(t=>{if(t&&!isAuthorizedAdminUser(t)){if(unsubscribeAdminOrders(),window.FirebaseService.signOut().catch(()=>{}),!document.getElementById("panel-customer")){lockAdminPortal();const e=document.getElementById("admin-login-gate-err");e&&(e.textContent="Unauthorized account ("+(t.email||"unknown")+"). Only the authorized admin can access this dashboard.",e.classList.remove("hidden"))}return}isAuthorizedAdminUser(t)&&localStorage.getItem("mak_admin_logged_out")!=="1"?(unlockAdminWithAuthorizedUser(t),typeof renderActiveAdminTab=="function"&&renderActiveAdminTab(typeof adminTab<"u"?adminTab:"overview")):(unsubscribeAdminOrders(),document.getElementById("panel-customer")||lockAdminPortal())})}function applyPackageLocksToUI(){const t=typeof getActivePackageConfig=="function"?getActivePackageConfig():{id:"pkg-basic",name:"Basic",price:3e3},e=document.querySelector('.a-nav-btn[data-atab="analytics"]');if(e){const s=typeof hasPackageFeature=="function"&&!hasPackageFeature("analytics");e.classList.toggle("opacity-60",s),e.title=s?"Locked \u2014 Requires Advanced (5,000 ETB) package":"Analytics"}const o=document.getElementById("upg-current-badge");o&&(o.textContent="Current: "+t.name);const n=document.getElementById("drawer-current-plan-sub");n&&(n.textContent="Current: "+t.name+" ("+t.price.toLocaleString()+" ETB)")}function switchAdminTab(t){if(typeof isAdminSessionLocked<"u"&&isAdminSessionLocked){lockAdminPortal();return}t==="menu"&&(t="products"),adminTab=t,closeAddCakeSheet(),closeAddDecorationSheet(),closeAdminReceiptModal(),closeAdminSidebar(),document.querySelectorAll(".a-tab-view").forEach(s=>{s.classList.add("hidden"),s.classList.remove("animate-view")});const e=t==="products"?"a-tab-menu":`a-tab-${t}`,o=document.getElementById(e);o&&(o.classList.remove("hidden"),o.offsetWidth,o.classList.add("animate-view")),document.querySelectorAll(".a-nav-btn").forEach(s=>{const a=s.dataset.atab===t||t==="products"&&s.dataset.atab==="menu";s.classList.toggle("text-berry",a),s.classList.toggle("font-bold",a),s.classList.toggle("text-ink",!a),s.classList.toggle("font-medium",!a);const i=s.querySelector(".a-nav-ind");i&&i.classList.toggle("hidden",!a)});const n=document.getElementById("admin-header-shop-btn");if(n){const s=t==="shop";n.classList.toggle("bg-berry",s),n.classList.toggle("text-white",s),n.classList.toggle("border-berry",s),n.classList.toggle("bg-white",!s),n.classList.toggle("text-ink",!s),n.classList.toggle("border-blush-200",!s)}document.getElementById("admin-scroll-area").scrollTop=0,loadedAdminTabs.has(t)||(renderActiveAdminTab(t),loadedAdminTabs.add(t))}function renderActiveAdminTab(t){const e=t==="menu"?"products":t||adminTab||"overview";e==="overview"?renderAdminOverview():e==="orders"?renderAdminOrders():e==="products"?(typeof renderAdminMenu=="function"&&renderAdminMenu(),typeof renderAdminDecorations=="function"&&renderAdminDecorations(),typeof renderAdminCreations=="function"&&renderAdminCreations()):e==="analytics"?renderAdminAnalytics():e==="shop"?renderAdminShop():e==="settings"&&typeof renderAdminPackages=="function"&&renderAdminPackages()}function renderAdminOverview(){renderAdminHero();const t=state.orders||[],e=t.length,o=t.filter(u=>u.status==="Payment Pending"||u.status==="Pending").length,n=t.filter(u=>u.status==="Completed").length,s=t.reduce((u,m)=>u+(m.total||0),0),a=document.getElementById("overview-total-orders");a&&(a.textContent=e);const i=document.getElementById("overview-pending-orders");i&&(i.textContent=o);const r=document.getElementById("overview-completed-orders");r&&(r.textContent=n);const l=document.getElementById("overview-today-revenue");l&&(l.textContent=fmtETB(s));const c=document.getElementById("overview-pending-badge");c&&(c.textContent=o);const d=document.getElementById("overview-recent-orders-list");if(d){const u=t.slice(0,3);u.length?d.innerHTML=u.map(m=>{const f=m.status==="Payment Pending"||m.status==="Pending",g=m.status==="Approved"||["Confirmed","Preparing","Ready"].includes(m.status),b=f?"Payment Pending":g?"Approved":"Completed",y=b==="Completed"?"bg-emerald-50 text-emerald-700 border border-emerald-200":b==="Approved"?"bg-sky-50 text-sky-700 border border-sky-200":"bg-amber-50 text-amber-700 border border-amber-200";return`
              <div onclick="openExactAdminOrder(${m.id})" class="p-2.5 rounded-xl bg-blush-50/80 hover:bg-blush-100/70 border border-blush-200/60 flex items-center justify-between gap-2.5 cursor-pointer transition-colors active:scale-[0.99]" title="View & select order #ORD-${m.id}">
                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-2">
                    <span class="font-extrabold text-xs text-ink">#ORD-${m.id}</span>
                    <span class="text-xs font-black text-berry">${fmtETB(m.total)}</span>
                  </div>
                  <div class="text-[11px] font-semibold text-ink mt-0.5 truncate">${m.customerName}</div>
                </div>
                <div class="flex items-center gap-1.5 shrink-0">
                  <span class="px-2 py-0.5 rounded-full text-[9.5px] font-extrabold ${y}">${b}</span>
                  <svg class="w-3.5 h-3.5 text-berry/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
              </div>
            `}).join(""):d.innerHTML='<div class="text-center py-4 text-xs text-ink-muted">No recent orders found.</div>'}}function openExactAdminOrder(t){switchAdminTab("orders"),setAdminFilter("All"),setTimeout(()=>{const e=document.getElementById(`admin-order-card-${t}`);e&&(e.scrollIntoView({behavior:"smooth",block:"center"}),e.classList.remove("order-highlight-selected"),e.offsetWidth,e.classList.add("order-highlight-selected"),showAdminToast(`Selected Order #ORD-${t}`),setTimeout(()=>{e.classList.remove("order-highlight-selected")},3200))},120)}let adminHeroIndex=0,adminHeroTimer=null;function getAdminBanners(){return(!state.adminBanners||!state.adminBanners.length)&&(state.adminBanners=[{id:1,top:"Fresh Daily Addis",script:"Mini Bento",sub:"Same-day chilled delivery in Bole",cta:"Order Bento",link:"products",img:"https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=700&q=85"},{id:2,top:"Handcrafted in Bole",script:"Weddings",sub:"Luxury tiered cakes for Addis galas",cta:"View Specials",link:"products",img:"https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=700&q=85"},{id:3,top:"Make Every Moment",script:"Sweeter",sub:"Premium celebration cakes baked fresh",cta:"Manage Menu",link:"products",img:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=85"}]),state.adminBanners}const ADMIN_OVERVIEW_SLIDES=getAdminBanners();function renderAdminHero(){const t=getAdminBanners(),e=t[adminHeroIndex%t.length]||t[0],o=document.getElementById("admin-hero-img");o&&o.src!==e.img&&(o.style.opacity="0.35",setTimeout(()=>{o.src=e.img,o.style.opacity="1"},140));const n=document.getElementById("admin-hero-top");n&&(n.textContent=e.top);const s=document.getElementById("admin-hero-script");s&&(s.textContent=e.script);const a=document.getElementById("admin-hero-sub");a&&(a.textContent=e.sub);const i=document.getElementById("admin-hero-cta");i&&(i.textContent=e.cta);const r=document.getElementById("admin-hero-dots");r&&(r.innerHTML=getAdminBanners().map((l,c)=>`
          <button onclick="setAdminHeroSlide(${c})" aria-label="Slide ${c+1}" class="h-1.5 rounded-full transition-all cursor-pointer ${c===adminHeroIndex?"w-4 bg-berry":"w-1.5 bg-white/85"}"></button>
        `).join(""))}function setAdminHeroSlide(t){adminHeroIndex=t%ADMIN_OVERVIEW_SLIDES.length,renderAdminHero(),resetAdminHeroTimer()}function handleAdminHeroClick(){const t=ADMIN_OVERVIEW_SLIDES[adminHeroIndex]||ADMIN_OVERVIEW_SLIDES[0];t&&t.action&&t.action()}function resetAdminHeroTimer(){adminHeroTimer&&clearInterval(adminHeroTimer),adminHeroTimer=setInterval(()=>{if(adminTab!=="overview")return;const t=getAdminBanners().length||1;adminHeroIndex=(adminHeroIndex+1)%t,renderAdminHero()},3e3)}function toggleAdminBell(){state.shop.bellOn=!state.shop.bellOn,saveState(),updateAdminBellUI(),state.shop.bellOn&&playBell(!0),showAdminToast(state.shop.bellOn?"Kitchen Bell Activated":"Kitchen Bell Muted")}function setAdminFilter(t){adminFilter=t,document.querySelectorAll(".a-fchip").forEach(e=>{e.dataset.af===t?e.className="a-fchip shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold btn-berry text-white shadow-rose-sm":e.className="a-fchip shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold bg-white text-ink-muted border border-blush-200"}),renderAdminOrders()}function advanceOrder(t,e){const o=state.orders.find(n=>String(n.id)===String(t));if(o){if(o.status=e,o.isNewFlash=!1,typeof sendOrderStatusPush=="function"&&sendOrderStatusPush(o.id,e),saveState(),syncAll(),window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.updateOrder=="function"){const n=o.firestoreDocId||String(o.id);window.FirebaseService.updateOrder(n,{status:o.status,isNewFlash:!1}).catch(s=>{console.warn("Firestore order status update failed (saved locally):",s),showAdminToast("Saved locally; cloud sync failed.","error")})}showAdminToast(`Order #${o.id} \u2192 ${e}`),showCustomerToast(`\u{1F514} Order #${o.id} updated: ${e}`)}}function renderAdminOrders(){const t=state.orders.filter(i=>i.status==="Payment Pending"||i.status==="Pending").length,e=state.orders.filter(i=>i.status==="Approved"||["Confirmed","Preparing","Ready"].includes(i.status)).length,o=state.orders.reduce((i,r)=>i+r.total,0);document.getElementById("kpi-orders").textContent=state.orders.length,document.getElementById("kpi-pending").textContent=t,document.getElementById("kpi-baking").textContent=e,document.getElementById("kpi-revenue").textContent=fmtETB(o),document.getElementById("header-admin-badge").textContent=t;const n=document.getElementById("admin-nav-badge");n.textContent=t,n.classList.toggle("hidden",t===0);let s=state.orders;adminFilter!=="All"&&(s=state.orders.filter(i=>adminFilter==="Payment Pending"?i.status==="Payment Pending"||i.status==="Pending":adminFilter==="Approved"?i.status==="Approved"||["Confirmed","Preparing","Ready"].includes(i.status):i.status===adminFilter));const a=document.getElementById("admin-orders-list");if(!s.length){a.innerHTML=`<div class="bg-white rounded-[20px] p-6 text-center text-xs text-ink-muted shadow-rose">No orders in "${adminFilter}".</div>`;return}a.innerHTML=s.map((i,r)=>{const l=i.paymentPlan==="half"?"Half 50%":i.paymentPlan==="cod"?"On Delivery":"Full 100%",c=i.paymentStatus==="Paid",d=i.status==="Payment Pending"||i.status==="Pending",u=i.status==="Approved"||["Confirmed","Preparing","Ready"].includes(i.status),m=d?"Payment Pending":u?"Approved":"Completed";let f="";d?f=`<button onclick="advanceOrder('${i.id}', 'Approved')" class="flex-1 py-2 rounded-full btn-berry text-white font-bold text-[11px] shadow-rose-sm active:scale-[0.98] transition-transform flex items-center justify-center gap-1"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Approve Order</button>`:u?f=`<button onclick="advanceOrder('${i.id}', 'Completed')" class="flex-1 py-2 rounded-full bg-emerald-500 text-white font-bold text-[11px] active:scale-[0.98] transition-transform flex items-center justify-center gap-1"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Mark Completed</button>`:f='<div class="flex-1 text-center py-1.5 text-[11px] font-extrabold text-emerald-600 flex items-center justify-center gap-1"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Completed &amp; Delivered</div>';const g=m==="Completed"?"bg-emerald-50 text-emerald-700":m==="Approved"?"bg-sky-50 text-sky-700 border border-sky-200":"bg-amber-50 text-amber-700 border border-amber-200";return`
          <article
            id="admin-order-card-${i.id}"
            class="admin-order-card cake-card-animate bg-white rounded-[20px] p-3.5 shadow-rose border transition-all duration-200 ${i.isNewFlash?"border-berry admin-new-flash":"border-white"} space-y-2.5"
            style="animation-delay: ${r*30}ms"
          >
            <!-- Header Row: Order ID, Price, Badges, Status -->
            <div class="flex items-start justify-between gap-2">
              <div class="min-w-0">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span class="font-extrabold text-xs text-ink">#ORD-${i.id}</span>
                  <span class="text-xs font-extrabold text-berry">${fmtETB(i.total)}</span>
                  <span class="px-1.5 py-0.5 rounded-full text-[9px] font-extrabold ${c?"bg-emerald-50 text-emerald-700 border border-emerald-200":"bg-amber-50 text-amber-700 border border-amber-200"}">${c?"Paid":l}</span>
                  ${i.pushEnabled?'<span class="px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">\u{1F514} Push On</span>':""}
                </div>
                <div class="text-[11px] font-semibold text-ink mt-0.5 truncate">${i.customerName}</div>
                <div class="text-[10px] text-ink-muted truncate">
                  <a href="tel:${i.phone.replace(/\s+/g,"")}" onclick="showAdminToast('Calling ${i.customerName}...')" class="text-berry font-bold underline">${i.phone}</a> \u2022 ${i.address}
                </div>
              </div>
              <span class="shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${g}">${m}</span>
            </div>

            <!-- Item Details Row: Proportional fixed aspect-ratio image thumbnail -->
            <div class="bg-blush-50 rounded-2xl p-2.5 flex items-center gap-2.5">
              <div class="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-blush-100 border border-blush-200 shadow-2xs flex items-center justify-center">
                <img loading="lazy" decoding="async" width="48" height="48" src="${i.cakeImg||SVG_CAKE_FALLBACK}" alt="${i.cakeName}" class="w-full h-full object-cover" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
              </div>
              <div class="min-w-0 flex-1 text-[11px]">
                <div class="font-bold text-ink truncate">${i.cakeName}</div>
                <div class="text-[10px] text-ink-muted truncate">${i.size} \u2022 ${i.flavor}</div>
                ${i.inscription?`<div class="text-[10px] text-berry font-bold truncate">${getLuxurySvg("pen","w-3.5 h-3.5 inline-block mr-1")} "${i.inscription}"</div>`:""}
                ${i.addons&&i.addons.length?`<div class="text-[9.5px] text-ink-muted truncate">${i.addons.join(", ")}</div>`:""}
              </div>
            </div>

            <div class="flex items-center justify-between text-[10px] text-ink-muted">
              <span class="truncate flex items-center gap-1"><svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg> ${i.paymentMethod} (${i.paymentRef})</span>
              <span class="shrink-0 ml-2">${i.timeSlot}</span>
            </div>

            <!-- Action Row: Inspect Receipt + One-Click Mark Paid + Lifecycle Advance -->
            <div class="flex items-center gap-1.5">
              <button onclick="openAdminReceiptModal('${i.id}')" class="px-3 py-2 rounded-full bg-blush-100 hover:bg-blush-200 text-ink font-bold text-[10.5px] active:scale-95 transition-transform shrink-0 flex items-center justify-center gap-1">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>
                <span>Receipt</span>
              </button>
              ${c?"":`
                <button onclick="markOrderPaid('${i.id}')" class="px-3 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-extrabold text-[10.5px] active:scale-95 transition-transform shrink-0 flex items-center justify-center gap-1">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Mark Paid</span>
                </button>
              `}
              ${f}
            </div>
          </article>
        `}).join("")}function openAdminReceiptModal(t){const e=state.orders.find(i=>String(i.id)===String(t));if(!e)return;const o=e.paymentStatus==="Paid",n=e.paymentPlan==="half"?"Half Payment (50% Deposit)":e.paymentPlan==="cod"?"Pay on Delivery":"Full Payment (100%)";document.getElementById("receipt-modal-title").textContent=`Order #ORD-${e.id} Receipt`,document.getElementById("receipt-modal-sub").innerHTML=`${e.customerName} &bull; <span class="inline-flex items-center gap-1 text-ink">${getBrandLogo(e.paymentMethod,"w-3.5 h-3.5")} ${e.paymentMethod}</span>`,document.getElementById("receipt-modal-body").innerHTML=`
        ${e.receiptImg?`
          <div onclick="openFullscreenViewer('${e.receiptImg}', 'Order #ORD-${e.id} Receipt Screenshot')" class="relative rounded-2xl overflow-hidden border-2 border-blush-300 bg-black/5 cursor-zoom-in group shadow-xs">
            <img src="${e.receiptImg}" alt="Bank Receipt" class="w-full max-h-56 object-contain bg-white transition-transform group-hover:scale-[1.02]" />
            <div class="absolute bottom-2.5 right-2.5 px-3 py-1.5 rounded-full bg-ink/80 hover:bg-berry backdrop-blur text-white text-[11px] font-black flex items-center gap-1.5 shadow-md transition-colors">
              <svg class="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
              </svg>
              <span>Tap to Zoom Fullscreen</span>
            </div>
            
          </div>
        `:`
          <div class="rounded-2xl p-5 bg-blush-50 border border-blush-200 text-center text-xs text-ink-muted">
            Cash / Pay on Delivery \u2014 No bank screenshot attached.
          </div>
        `}

        <div class="bg-blush-50 rounded-2xl p-3 space-y-1.5 text-[11px]">
          <div class="flex justify-between"><span class="text-ink-muted">Payment Plan</span><span class="font-extrabold text-ink">${n}</span></div>
          <div class="flex justify-between"><span class="text-ink-muted">Reference ID</span><span class="font-extrabold text-berry">${e.paymentRef}</span></div>
          <div class="flex justify-between"><span class="text-ink-muted">Order Total</span><span class="font-extrabold text-ink">${fmtETB(e.total)}</span></div>
          <div class="flex justify-between"><span class="text-ink-muted">Due Upfront</span><span class="font-extrabold text-emerald-700">${fmtETB(e.dueNow??e.total)}</span></div>
          <div class="flex justify-between"><span class="text-ink-muted">Balance on Delivery</span><span class="font-bold text-ink">${fmtETB(e.balanceDue??0)}</span></div>
          <div class="flex justify-between pt-1 border-t border-blush-200"><span class="text-ink-muted">Status</span><span class="font-extrabold ${o?"text-emerald-600":"text-amber-600"}">${o?"Verified & Paid":"Pending Verification"}</span></div>
        </div>
      `,document.getElementById("receipt-modal-footer").innerHTML=`
        ${o?`
          <div class="flex-1 py-2 text-center text-xs font-extrabold text-emerald-700">Payment Verified</div>
        `:`
          <button onclick="markOrderPaid('${e.id}'); closeAdminReceiptModal();" class="flex-1 py-2.5 rounded-full bg-emerald-600 text-white font-bold text-xs shadow-sm active:scale-95 transition-transform">
            Verify &amp; Mark as Paid
          </button>
        `}
        <button onclick="closeAdminReceiptModal()" class="px-4 py-2.5 rounded-full bg-white border border-blush-300 text-ink font-bold text-xs">Close</button>
      `,closeAddCakeSheet(),closeAddDecorationSheet();const s=document.getElementById("admin-receipt-backdrop"),a=document.getElementById("admin-receipt-modal");s&&s.classList.remove("hidden"),a&&(a.classList.remove("hidden"),requestAnimationFrame(()=>a.classList.remove("translate-y-full")))}function closeAdminReceiptModal(){const t=document.getElementById("admin-receipt-backdrop"),e=document.getElementById("admin-receipt-modal");e&&e.classList.add("translate-y-full"),setTimeout(()=>{e&&e.classList.add("hidden"),t&&t.classList.add("hidden")},260)}function markOrderPaid(t){const e=state.orders.find(o=>String(o.id)===String(t));if(e){if(e.paymentStatus="Paid",(e.status==="Payment Pending"||e.status==="Pending")&&(e.status="Approved"),e.isNewFlash=!1,state.notifications.unshift({id:Date.now(),title:`Order Approved (#ORD-${e.id})`,msg:`Payment verified. Your order for ${e.cakeName} has been approved by MAK CAKE Bole.`,time:"Just now"}),state.unreadNotifs++,saveState(),syncAll(),window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.updateOrder=="function"){const o=e.firestoreDocId||String(e.id);window.FirebaseService.updateOrder(o,{status:e.status,paymentStatus:e.paymentStatus,isNewFlash:!1}).catch(n=>{console.warn("Firestore payment update failed (saved locally):",n),showAdminToast("Saved locally; cloud sync failed.","error")})}showAdminToast(`Order #ORD-${e.id} Approved`),showCustomerToast(`Order #ORD-${e.id} Approved`)}}let adminCakeCatFilter="All",activeCakeFormPhoto="";function setAdminCakeCatFilter(t){adminCakeCatFilter=t,renderAdminMenu()}function renderAdminMenu(){const t=(document.getElementById("admin-menu-search")?.value||"").trim().toLowerCase(),e=state.cakes.filter(d=>{const u=adminCakeCatFilter==="All"||d.category===adminCakeCatFilter,m=!t||d.name.toLowerCase().includes(t)||d.category&&d.category.toLowerCase().includes(t)||d.desc&&d.desc.toLowerCase().includes(t);return u&&m}),o=state.cakes.filter(d=>d.inStock!==!1).length,n=document.getElementById("admin-menu-sub");n&&(n.textContent=`${o}/${state.cakes.length} available \u2022 Live sync to Customer Phone`);const s=document.getElementById("admin-sub-cakes-cnt");s&&(s.textContent=state.cakes.length);const a=document.getElementById("admin-cake-cat-pills");if(a){const u=["All",...typeof getProductCategories=="function"?getProductCategories(!1).map(m=>m.id):["Normal","Special","Cupples","Mini Cakes"]];a.innerHTML=u.map(m=>{const f=adminCakeCatFilter===m,g=m==="All"?state.cakes.length:state.cakes.filter(b=>b.category===m).length;return`
            <button onclick="setAdminCakeCatFilter('${m}')" class="shrink-0 px-2.5 py-1.5 rounded-full text-[10.5px] font-bold transition-all cursor-pointer ${f?"btn-berry text-white shadow-rose-sm":"bg-white text-ink-muted border border-blush-200 hover:text-ink"}">
              ${m} (${g})
            </button>
          `}).join("")}const i=document.getElementById("admin-menu-list");if(!i)return;if(!e.length){i.innerHTML='<div class="bg-white rounded-[18px] p-5 text-center text-xs text-ink-muted shadow-rose-sm">No cakes found in this category. Tap "+ Add Cake" to create one.</div>';return}const r=document.getElementById("admin-popular-summary"),l=getPopularCakeIds();if(r){const d=l.map(u=>(state.cakes||[]).find(m=>String(m.id)===u)?.name).filter(Boolean);r.innerHTML=`
          <div class="flex items-center justify-between gap-2">
            <span class="font-extrabold">\u2605 Homepage Popular Cakes (${l.length}/4)</span>
            <span class="text-[9.5px] font-bold text-amber-700">${l.length===4?"Max reached":`${4-l.length} slot(s) left`}</span>
          </div>
          <div class="text-[9.5px] text-amber-800 mt-0.5 truncate">${d.length?d.join(" \u2022 "):"None selected \u2014 tap \u2605 on any cake below to feature it"}</div>
        `}const c=(d,u,m)=>{const f=d.inStock!==!1,g=l.includes(String(d.id)),b=String(d.id).replace(/'/g,"\\'");return`
          <div class="bg-white rounded-[18px] p-3 shadow-rose-sm border border-white flex flex-col gap-2.5 min-w-0">
            <div class="flex items-center gap-2.5 min-w-0">
              <!-- Priority Swap Buttons (Up / Down) -->
              <div class="flex flex-col shrink-0 gap-1 select-none">
                <button onclick="moveCakePriority('${b}', 'up'); event.stopPropagation();" title="Move Up" class="w-6 h-6 rounded-md bg-blush-100 hover:bg-berry hover:text-white text-ink-muted flex items-center justify-center text-[9px] font-bold transition-colors ${u===0?"opacity-25 pointer-events-none":"active:scale-110 cursor-pointer"}">\u25B2</button>
                <button onclick="moveCakePriority('${b}', 'down'); event.stopPropagation();" title="Move Down" class="w-6 h-6 rounded-md bg-blush-100 hover:bg-berry hover:text-white text-ink-muted flex items-center justify-center text-[9px] font-bold transition-colors ${u===m-1?"opacity-25 pointer-events-none":"active:scale-110 cursor-pointer"}">\u25BC</button>
              </div>

              <!-- Clickable Cake Thumbnail with Camera Overlay -->
              <div onclick="triggerCakePhotoUpload('${b}')" class="relative group cursor-pointer w-14 h-14 rounded-xl overflow-hidden bg-blush-100 border border-blush-200 shrink-0 shadow-2xs flex items-center justify-center ${f?"":"grayscale opacity-60"}">
                <img loading="lazy" decoding="async" width="112" height="112" src="${d.img||SVG_CAKE_FALLBACK}" alt="${d.name}" class="w-full h-full object-cover" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
                <div class="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[8px] font-extrabold">
                  Change
                </div>
                <div class="absolute bottom-0 right-0 p-0.5 bg-berry text-white rounded-tl-md">
                  <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                </div>
              </div>
              <input type="file" id="cake-file-${d.id}" accept="image/png,image/jpeg,image/webp,image/jpg" onchange="uploadCakePhoto('${b}', this)" class="hidden" />

              <div class="min-w-0 flex-1">
                <div class="flex items-center justify-between gap-1.5">
                  <span class="text-[12.5px] font-extrabold text-ink leading-tight truncate">${d.name}</span>
                  <span class="px-2 py-0.5 rounded-full text-[8.5px] font-bold ${f?"bg-emerald-50 text-emerald-700 border border-emerald-200":"bg-rose-50 text-berry border border-rose-200"} shrink-0">
                    ${f?"Available":"Sold Out"}
                  </span>
                </div>
                <div class="flex items-center justify-between gap-2 mt-1">
                  <span class="px-2 py-0.5 rounded-full bg-blush-100 text-ink-muted text-[9.5px] font-bold truncate max-w-[140px]">${d.category}</span>
                  <span class="text-[12px] font-black text-berry whitespace-nowrap shrink-0">${fmtETB(d.price)}</span>
                </div>
              </div>
            </div>

            <!-- Actions Bar: Popular Star + Stock Switch + Consistent Edit + Delete -->
            <div class="flex items-center justify-between gap-1.5 pt-2 border-t border-blush-100/80">
              <div class="flex items-center gap-1.5">
                <button onclick="toggleCakePopular('${b}')" title="${g?"Remove from Homepage Popular Cakes":"Feature in Homepage Popular Cakes (Max 4)"}" class="px-2.5 h-8 rounded-xl ${g?"bg-amber-100 text-amber-700 border border-amber-300":"bg-blush-50 text-ink-muted hover:text-amber-600 border border-blush-200/70"} flex items-center justify-center gap-1 text-[10px] font-bold transition-all active:scale-95 cursor-pointer">
                  <span>${g?"\u2605":"\u2606"}</span>
                  <span class="hidden min-[360px]:inline">${g?"Popular":"Star"}</span>
                </button>
                <button onclick="toggleCakeStock('${b}')" title="Toggle Available / Sold Out" class="px-2.5 h-8 rounded-xl ${f?"bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100":"bg-rose-50 text-berry border border-rose-200 hover:bg-rose-100"} flex items-center justify-center gap-1 text-[10px] font-bold transition-all active:scale-95 cursor-pointer">
                  ${f?'<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>':'<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'}
                  <span class="hidden min-[400px]:inline">${f?"In Stock":"Sold Out"}</span>
                </button>
              </div>
              <div class="flex items-center gap-1.5 shrink-0">
                <button onclick="openEditCakeModal('${b}')" title="Edit Cake" class="px-3 h-8 rounded-xl bg-berry text-white text-[10.5px] font-bold shadow-rose-sm active:scale-95 transition-all flex items-center gap-1 cursor-pointer">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  <span>Edit</span>
                </button>
                <button onclick="deleteAdminCake('${b}')" title="Delete Cake" class="w-8 h-8 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-berry flex items-center justify-center transition-all active:scale-95 cursor-pointer">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
              </div>
            </div>
          </div>
        `};if(adminCakeCatFilter==="All"){const d=[{bg:"#fff1f5",border:"#fecdd3",badgeBg:"#be185d",text:"#9d174d"},{bg:"#f5f3ff",border:"#ddd6fe",badgeBg:"#6d28d9",text:"#5b21b6"},{bg:"#f0f9ff",border:"#bae6fd",badgeBg:"#0369a1",text:"#075985"},{bg:"#fffbeb",border:"#fde68a",badgeBg:"#b45309",text:"#92400e"},{bg:"#ecfdf5",border:"#a7f3d0",badgeBg:"#047857",text:"#065f46"},{bg:"#fdf2f8",border:"#fbcfe8",badgeBg:"#a21caf",text:"#86198f"}],u=typeof getProductCategories=="function"?getProductCategories(!1).map(b=>b.id):[],m=new Map;u.forEach(b=>m.set(b,[])),e.forEach(b=>{const y=b.category||"Uncategorized";m.has(y)||m.set(y,[]),m.get(y).push(b)});let f=0;const g=[];m.forEach((b,y)=>{if(!b.length)return;const x=d[f%d.length];f+=1,g.push(`
            <div class="rounded-[22px] p-2.5 sm:p-3 space-y-2.5" style="background:${x.bg};border:1.5px solid ${x.border};">
              <div class="flex items-center justify-between px-1.5 pt-0.5">
                <div class="flex items-center gap-2 min-w-0">
                  <span class="w-2.5 h-2.5 rounded-full shrink-0" style="background:${x.badgeBg};"></span>
                  <span class="text-xs font-black tracking-tight truncate" style="color:${x.text};">${y}</span>
                </div>
                <span class="px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold text-white shrink-0" style="background:${x.badgeBg};">${b.length} ${b.length===1?"cake":"cakes"}</span>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                ${b.map((w,E)=>c(w,E,b.length)).join("")}
              </div>
            </div>
          `)}),i.innerHTML=g.join("")}else i.innerHTML=`<div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">${e.map((d,u)=>c(d,u,e.length)).join("")}</div>`}function getPopularCakeIds(){ensureShopState(),Array.isArray(state.shop.popularCakeIds)||(state.shop.popularCakeIds=(state.cakes||[]).filter(e=>e.popular).slice(0,4).map(e=>String(e.id)));const t=new Set((state.cakes||[]).map(e=>String(e.id)));return Array.from(new Set(state.shop.popularCakeIds.map(String))).filter(e=>t.has(e)).slice(0,4)}async function toggleCakePopular(t){ensureShopState();const e=String(t),o=(state.cakes||[]).find(a=>String(a.id)===e);if(!o)return;let n=getPopularCakeIds();const s=n.includes(e);if(!s&&n.length>=4){showAdminToast("\u26A0\uFE0F Maximum 4 Popular Cakes allowed! Remove one first to select another.","error");return}s?(n=n.filter(a=>a!==e),o.popular=!1):(n.push(e),o.popular=!0),state.shop.popularCakeIds=n,saveState(),syncAll();try{window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&(typeof window.FirebaseService.saveSettings=="function"&&await window.FirebaseService.saveSettings({popularCakeIds:n}),typeof window.FirebaseService.saveProduct=="function"&&(await ensureProductsSeededInCloud(state.cakes),await window.FirebaseService.saveProduct(o))),showAdminToast(s?`Removed "${o.name}" from Popular Cakes`:`\u2605 Added "${o.name}" to Popular Cakes (${n.length}/4)`)}catch(a){showAdminToast("Failed to sync Popular Cakes: "+(a&&a.message?a.message:"Error"),"error")}}function moveCakePriority(t,e){const o=state.cakes.findIndex(a=>String(a.id)===String(t));if(o===-1)return;const n=e==="up"?o-1:o+1;if(n<0||n>=state.cakes.length)return;const[s]=state.cakes.splice(o,1);state.cakes.splice(n,0,s),saveState(),syncAll(),showAdminToast(`Moved "${s.name}" ${e==="up"?"Up":"Down"}`)}function editCakePrice(t,e){const o=parseInt(e,10);if(isNaN(o)||o<100)return;const n=state.cakes.find(s=>String(s.id)===String(t));n&&(n.price=o,saveState(),syncAll(),showAdminToast(`Updated ${n.name} \u2192 ${fmtETB(o)}`))}async function toggleCakeStock(t){const e=state.cakes.find(n=>String(n.id)===String(t));if(!e)return;const o=!e.inStock;try{window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.saveProduct=="function"&&(await ensureProductsSeededInCloud(state.cakes),await window.FirebaseService.saveProduct({...e,inStock:o})),e.inStock=o,saveState(),syncAll(),showAdminToast(`${e.name}: ${e.inStock?"Available":"Sold Out"}`)}catch(n){showAdminToast("Update failed: "+(n&&n.message?n.message:"Error"),"error")}}function clearCakeFormPhoto(){activeCakeFormPhoto=SVG_CAKE_FALLBACK;const t=document.getElementById("cake-form-img-preview");t&&(t.src=SVG_CAKE_FALLBACK);const e=document.getElementById("cake-form-img-status");e&&(e.textContent="Photo removed (default placeholder)");const o=document.getElementById("cake-form-photo-input");o&&(o.value="")}let _cakeSheetCloseTimer=null;function openAddCakeModal(){const t=typeof getPackageLimit=="function"?getPackageLimit("maxProducts"):30;if((state.cakes||[]).length>=t){const r=typeof getActivePackageConfig=="function"?getActivePackageConfig():{name:"Basic"};showAdminToast(`\u{1F512} Product limit (${t}) reached on ${r.name} plan. Upgrade to add more cakes.`,"error");return}_cakeSheetCloseTimer&&(clearTimeout(_cakeSheetCloseTimer),_cakeSheetCloseTimer=null),closeAddDecorationSheet(),closeAdminReceiptModal(),typeof syncAllCategoryDropdowns=="function"&&syncAllCategoryDropdowns(),document.getElementById("cake-modal-title").textContent="+ Add New Cake",document.getElementById("cake-form-id").value="",document.getElementById("cake-form-name").value="",document.getElementById("cake-form-cat").value="Normal",document.getElementById("cake-form-price").value="2800",document.getElementById("cake-form-stock").value="true",document.getElementById("cake-form-desc").value="";const e=document.getElementById("cake-form-img-preset");e&&(e.value="");const o=document.getElementById("cake-form-popular");o&&(o.checked=!1);const n=document.getElementById("cake-form-photo-input");n&&(n.value="");const s="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80";document.getElementById("cake-form-img-preview").src=s,document.getElementById("cake-form-img-status").textContent="Default Preset Photo",document.getElementById("cake-form-delete-btn").classList.add("hidden"),activeCakeFormPhoto=s;const a=document.getElementById("add-cake-backdrop"),i=document.getElementById("add-cake-sheet");a&&a.classList.remove("hidden"),i&&(i.classList.remove("hidden"),requestAnimationFrame(()=>i.classList.remove("translate-y-full")))}function openAddCakeSheet(){openAddCakeModal()}function openEditCakeModal(t){const e=state.cakes.find(c=>String(c.id)===String(t));if(!e)return;_cakeSheetCloseTimer&&(clearTimeout(_cakeSheetCloseTimer),_cakeSheetCloseTimer=null),closeAddDecorationSheet(),closeAdminReceiptModal(),typeof syncAllCategoryDropdowns=="function"&&syncAllCategoryDropdowns(),document.getElementById("cake-modal-title").textContent="Edit Cake: "+e.name,document.getElementById("cake-form-id").value=e.id,document.getElementById("cake-form-name").value=e.name;const o=document.getElementById("cake-form-cat"),n=e.category||"Normal";if(o){if(!Array.from(o.options).some(c=>c.value===n)){const c=document.createElement("option");c.value=n,c.textContent=n,o.insertBefore(c,o.firstChild)}o.value=n}document.getElementById("cake-form-price").value=e.price,document.getElementById("cake-form-stock").value=e.inStock!==!1?"true":"false",document.getElementById("cake-form-desc").value=e.desc||"";const s=document.getElementById("cake-form-img-preset");s&&(s.value="");const a=document.getElementById("cake-form-popular");a&&(a.checked=getPopularCakeIds().includes(String(e.id)));const i=document.getElementById("cake-form-photo-input");i&&(i.value=""),document.getElementById("cake-form-img-preview").src=e.img||SVG_CAKE_FALLBACK,document.getElementById("cake-form-img-status").textContent="Current Product Photo",document.getElementById("cake-form-delete-btn").classList.remove("hidden"),activeCakeFormPhoto=e.img||"";const r=document.getElementById("add-cake-backdrop"),l=document.getElementById("add-cake-sheet");r&&r.classList.remove("hidden"),l&&(l.classList.remove("hidden"),requestAnimationFrame(()=>l.classList.remove("translate-y-full")))}function closeAddCakeSheet(){const t=document.getElementById("add-cake-backdrop"),e=document.getElementById("add-cake-sheet");e&&e.classList.add("translate-y-full"),_cakeSheetCloseTimer&&clearTimeout(_cakeSheetCloseTimer),_cakeSheetCloseTimer=setTimeout(()=>{_cakeSheetCloseTimer=null,e&&e.classList.contains("translate-y-full")&&(e.classList.add("hidden"),t&&t.classList.add("hidden"))},260)}async function handleCakeFormPhotoUpload(t){const e=t.files&&t.files[0];if(e){if(!e.type||!e.type.startsWith("image/")){showAdminToast("Please select an image file only (PNG, JPG, WEBP)"),t.value="";return}try{showAdminToast("Compressing image on-the-fly...");const o=await compressImageFileToCanvas(e,800,.82);activeCakeFormPhoto=o.dataUrl,document.getElementById("cake-form-img-preview").src=o.dataUrl,document.getElementById("cake-form-img-status").textContent=`Attached (${o.kb}KB HQ Canvas Compressed)`,showAdminToast(`Cake photo compressed (${o.kb}KB)!`)}catch(o){showAdminToast("Error compressing image: "+o.message)}t.value=""}}function handleCakePresetSelect(t){t&&(activeCakeFormPhoto=t,document.getElementById("cake-form-img-preview").src=t,document.getElementById("cake-form-img-status").textContent="Preset Selected")}function triggerCakePhotoUpload(t){const e=document.getElementById(`cake-file-${t}`);e&&e.click()}async function uploadCakePhoto(t,e){const o=e.files&&e.files[0];if(!o)return;if(!o.type||!o.type.startsWith("image/")){showAdminToast("Please select an image file only (PNG, JPG, WEBP)"),e.value="";return}const n=state.cakes.find(s=>String(s.id)===String(t));if(n){try{showAdminToast("Compressing & saving photo...");const s=await compressImageFileToCanvas(o,800,.82),a={...n,img:s.dataUrl};window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.saveProduct=="function"&&(await window.FirebaseService.saveProduct(a),localStorage.setItem("mak_products_cloud_synced","1")),n.img=s.dataUrl,saveState(),syncAll(),showAdminToast(`Photo saved for "${n.name}" (${s.kb}KB)!`)}catch(s){showAdminToast("Failed to save photo: "+(s&&s.message?s.message:"Error"),"error")}e.value=""}}async function ensureProductsSeededInCloud(t){if(window.MAK_ENABLE_FIRESTORE_ORDER_SYNC!==!0||!window.FirebaseService||state.shop&&state.shop.productsSeeded===!0)return;const e=Array.isArray(t)&&t.length?t:typeof SEED_CAKES<"u"?SEED_CAKES:[];if(typeof window.FirebaseService.saveProduct=="function")for(const o of e)await window.FirebaseService.saveProduct(o);state.shop||(state.shop={}),state.shop.productsSeeded=!0,typeof window.FirebaseService.saveSettings=="function"&&await window.FirebaseService.saveSettings({productsSeeded:!0})}let _isSavingCakeForm=!1;async function saveAdminCakeForm(){if(_isSavingCakeForm)return;const t=document.getElementById("cake-form-id").value,e=document.getElementById("cake-form-name"),o=document.getElementById("cake-form-price"),n=e?e.value.trim():"",s=o?o.value.trim():"",a=parseInt(s,10),i=document.getElementById("cake-form-cat").value,r=document.getElementById("cake-form-stock").value==="true",l=document.getElementById("cake-form-desc").value.trim();if(!n){highlightMissingRequirement("cake-form-name","Required: Please enter cake name"),showAdminToast("\u26A0\uFE0F Please enter cake name");return}if(!s||isNaN(a)||a<100){highlightMissingRequirement("cake-form-price","Required: Please enter a valid price (min 100 ETB)"),showAdminToast("\u26A0\uFE0F Please enter a valid cake price");return}const c=activeCakeFormPhoto||"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",d=document.getElementById("cake-form-save-btn");d&&(d.disabled=!0,d.classList.add("opacity-70","pointer-events-none")),_isSavingCakeForm=!0;try{const u=!!document.getElementById("cake-form-popular")?.checked;let m=getPopularCakeIds();if(t){const f=state.cakes.find(x=>String(x.id)===String(t));if(!f)return;const g=String(f.id),b=m.includes(g);if(u&&!b&&m.length>=4){showAdminToast("\u26A0\uFE0F Maximum 4 Popular Cakes allowed! Remove one first.","error");return}u&&!b?m.push(g):!u&&b&&(m=m.filter(x=>x!==g));const y={...f,name:n,category:i,price:a,popular:u,inStock:r,desc:l||f.desc,img:activeCakeFormPhoto||f.img};window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.saveProduct=="function"&&(await ensureProductsSeededInCloud(state.cakes),await window.FirebaseService.saveProduct(y),u!==b&&typeof window.FirebaseService.saveSettings=="function"&&await window.FirebaseService.saveSettings({popularCakeIds:m}),localStorage.setItem("mak_products_cloud_synced","1")),state.shop.popularCakeIds=m,Object.assign(f,y),saveState(),syncAll(),closeAddCakeSheet(),showAdminToast(`Successfully changed "${f.name}"!`)}else{if(u&&m.length>=4){showAdminToast("\u26A0\uFE0F Maximum 4 Popular Cakes allowed! Uncheck Popular or remove one first.","error");return}const f={id:Date.now(),name:n,desc:l||"Handcrafted fresh daily with premium ingredients in Bole Medhanialem.",category:i,price:a,rating:5,reviews:"New",popular:u,inStock:r,img:c};u&&(m.push(String(f.id)),state.shop.popularCakeIds=m),window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.saveProduct=="function"&&(await ensureProductsSeededInCloud(state.cakes),await window.FirebaseService.saveProduct(f),u&&typeof window.FirebaseService.saveSettings=="function"&&await window.FirebaseService.saveSettings({popularCakeIds:m}),localStorage.setItem("mak_products_cloud_synced","1")),state.cakes.unshift(f),saveState(),syncAll(),closeAddCakeSheet(),showAdminToast(`Successfully added "${n}"!`),showCustomerToast(`New Cake: ${n} added to menu!`)}}catch(u){showAdminToast("Save failed: "+(u&&u.message?u.message:"Please try again"),"error")}finally{_isSavingCakeForm=!1,d&&(d.disabled=!1,d.classList.remove("opacity-70","pointer-events-none"))}}function publishNewCake(){saveAdminCakeForm()}async function deleteAdminCake(t){const e=state.cakes.find(n=>String(n.id)===String(t));if(!(!e||!confirm(`Are you sure you want to delete cake "${e.name}"?

This will remove it from the live menu.`)))try{const n=state.cakes.filter(a=>String(a.id)!==String(t)),s=getPopularCakeIds().filter(a=>a!==String(t));window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.deleteProduct=="function"&&(showAdminToast("Deleting from Firebase..."),await ensureProductsSeededInCloud(n),await window.FirebaseService.deleteProduct(t),typeof window.FirebaseService.saveSettings=="function"&&await window.FirebaseService.saveSettings({popularCakeIds:s}),localStorage.setItem("mak_products_cloud_synced","1")),state.cakes=n,state.shop||(state.shop={}),state.shop.popularCakeIds=s,saveState(),syncAll(),showAdminToast(`Deleted cake "${e.name}" permanently`)}catch(n){showAdminToast("Delete failed: "+(n&&n.message?n.message:"Firebase error"),"error")}}function deleteAdminCakeFromModal(){const t=document.getElementById("cake-form-id").value;t&&(deleteAdminCake(t),closeAddCakeSheet())}function setAdminMenuSub(t){adminMenuSub=t;const e=t==="cakes",o=t==="decorations",n=t==="creations",s=t==="categories",a=document.getElementById("admin-sub-cakes"),i=document.getElementById("admin-sub-decorations"),r=document.getElementById("admin-sub-creations"),l=document.getElementById("admin-sub-categories");a&&(a.className=`py-1.5 rounded-full text-[9.5px] font-extrabold transition-all flex items-center justify-center gap-0.5 cursor-pointer ${e?"btn-berry text-white shadow-rose-sm":"text-ink-muted hover:text-ink"}`),i&&(i.className=`py-1.5 rounded-full text-[9.5px] font-extrabold transition-all flex items-center justify-center gap-0.5 cursor-pointer ${o?"btn-berry text-white shadow-rose-sm":"text-ink-muted hover:text-ink"}`),r&&(r.className=`py-1.5 rounded-full text-[9.5px] font-extrabold transition-all flex items-center justify-center gap-0.5 cursor-pointer ${n?"btn-berry text-white shadow-rose-sm":"text-ink-muted hover:text-ink"}`),l&&(l.className=`py-1.5 rounded-full text-[9.5px] font-extrabold transition-all flex items-center justify-center gap-0.5 cursor-pointer ${s?"btn-berry text-white shadow-rose-sm":"text-ink-muted hover:text-ink"}`);const c=document.getElementById("admin-menu-cakes-panel"),d=document.getElementById("admin-menu-dec-panel"),u=document.getElementById("admin-subview-creations"),m=document.getElementById("admin-subview-categories");c&&c.classList.toggle("hidden",!e),d&&d.classList.toggle("hidden",!o),u&&u.classList.toggle("hidden",!n),m&&m.classList.toggle("hidden",!s),e?renderAdminMenu():o?renderAdminDecorations():n?renderAdminCreations():s&&typeof renderAdminCategoryManager=="function"&&renderAdminCategoryManager()}function renderAdminCreations(){const t=document.getElementById("admin-sub-creations-cnt");t&&(t.textContent=(state.creations||[]).length);const e=document.getElementById("admin-creations-list");if(!e)return;const o=state.creations||[];if(!o.length){e.innerHTML='<div class="bg-white rounded-[18px] p-5 text-center text-xs text-ink-muted shadow-rose-sm">No creations uploaded yet. Tap "+ Capture &amp; Upload" to post a real cake photo.</div>';return}e.innerHTML='<div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">'+o.map((n,s)=>{const a=String(n.id).replace(/'/g,"\\'");return`
        <div class="bg-white rounded-[18px] p-3 shadow-rose-sm border border-white flex flex-col gap-2.5 min-w-0">
          <div class="flex items-center gap-2.5 min-w-0">
            <!-- Swap Place Buttons (Up / Down) -->
            <div class="flex flex-col shrink-0 gap-1 select-none">
              <button onclick="moveCreationPriority('${a}', 'up'); event.stopPropagation();" title="Move Up" class="w-6 h-6 rounded-md bg-blush-100 hover:bg-berry hover:text-white text-ink-muted flex items-center justify-center text-[9px] font-bold transition-colors ${s===0?"opacity-25 pointer-events-none":"active:scale-110 cursor-pointer"}">\u25B2</button>
              <button onclick="moveCreationPriority('${a}', 'down'); event.stopPropagation();" title="Move Down" class="w-6 h-6 rounded-md bg-blush-100 hover:bg-berry hover:text-white text-ink-muted flex items-center justify-center text-[9px] font-bold transition-colors ${s===o.length-1?"opacity-25 pointer-events-none":"active:scale-110 cursor-pointer"}">\u25BC</button>
            </div>
            <div class="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-blush-100 border border-blush-200 shadow-2xs flex items-center justify-center"><img src="${n.img||SVG_CAKE_FALLBACK}" alt="${n.title}" class="w-full h-full object-cover" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" /></div>
            <div class="min-w-0 flex-1">
              <div class="text-[12.5px] font-extrabold text-ink truncate">${n.title}</div>
              <div class="flex items-center justify-between gap-2 mt-1">
                <span class="text-[10px] text-ink-muted font-semibold truncate">${n.category||"Luxury Cake"} \u2022 ${n.date||"Today"}</span>
                ${n.price?`<span class="text-[11.5px] font-black text-berry whitespace-nowrap shrink-0">${fmtETB(n.price)}</span>`:""}
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between gap-1.5 pt-2 border-t border-blush-100/80">
            <button onclick="document.getElementById('cr-file-${n.id}').click()" class="px-2.5 h-8 rounded-xl bg-blush-50 border border-blush-200/80 hover:bg-blush-100 text-berry text-[10px] font-extrabold flex items-center gap-1 active:scale-95 transition-transform cursor-pointer">
              <svg class="w-3.5 h-3.5 text-berry" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
              <span>Photo</span>
            </button>
            <input type="file" id="cr-file-${n.id}" accept="image/png,image/jpeg,image/webp,image/jpg" onchange="uploadCreationPhoto('${a}', this)" class="hidden" />
            <div class="flex items-center gap-1.5 shrink-0">
              <button onclick="openEditCreationSheet('${a}')" title="Edit Creation" class="px-3 h-8 rounded-xl bg-berry text-white text-[10.5px] font-bold shadow-rose-sm active:scale-95 transition-all flex items-center gap-1 cursor-pointer">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                <span>Edit</span>
              </button>
              <button onclick="deleteCreation('${a}')" class="w-8 h-8 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-berry flex items-center justify-center transition-colors shrink-0 cursor-pointer" title="Delete">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
        </div>
      `}).join("")+"</div>"}function moveCreationPriority(t,e){const o=(state.creations||[]).findIndex(a=>String(a.id)===String(t));if(o===-1)return;const n=e==="up"?o-1:o+1;if(n<0||n>=state.creations.length)return;const[s]=state.creations.splice(o,1);state.creations.splice(n,0,s),saveState(),syncAll(),showAdminToast(`Moved "${s.title}" ${e==="up"?"Up":"Down"}`)}let editingCreationId=null;function openAddCreationSheet(){editingCreationId=null,activeCreationPhoto="",typeof syncAllCategoryDropdowns=="function"&&syncAllCategoryDropdowns();const t=document.getElementById("creation-modal-title");t&&(t.textContent="+ Capture & Upload Real Cake");const e=document.getElementById("creation-save-btn");e&&(e.textContent="Publish to Customer Storefront");const o=document.getElementById("new-cr-file");o&&(o.value="");const n=document.getElementById("new-cr-title");n&&(n.value="");const s=document.getElementById("new-cr-cat");s&&s.options.length&&(s.value="Chocolate Cakes");const a=document.getElementById("new-cr-date");a&&(a.value="Today");const i=document.getElementById("new-cr-price");i&&(i.value="");const r=document.getElementById("new-cr-preview-box");r&&r.classList.add("hidden");const l=document.getElementById("new-cr-upload-btn");l&&l.classList.remove("hidden");const c=document.getElementById("admin-add-creation-modal");c&&c.classList.remove("hidden")}function openEditCreationSheet(t){const e=(state.creations||[]).find(g=>String(g.id)===String(t));if(!e)return;editingCreationId=e.id,activeCreationPhoto=e.img||"",typeof syncAllCategoryDropdowns=="function"&&syncAllCategoryDropdowns();const o=document.getElementById("creation-modal-title");o&&(o.textContent="Edit Creation: "+(e.title||"Cake"));const n=document.getElementById("creation-save-btn");n&&(n.textContent="Save Creation Changes");const s=document.getElementById("new-cr-file");s&&(s.value="");const a=document.getElementById("new-cr-title");a&&(a.value=e.title||"");const i=document.getElementById("new-cr-cat"),r=e.category||"Chocolate Cakes";if(i){if(!Array.from(i.options).some(g=>g.value===r)){const g=document.createElement("option");g.value=r,g.textContent=r,i.insertBefore(g,i.firstChild)}i.value=r}const l=document.getElementById("new-cr-date");if(l){const g=e.date||"Today";if(!Array.from(l.options).some(b=>b.value===g)){const b=document.createElement("option");b.value=g,b.textContent=g,l.insertBefore(b,l.firstChild)}l.value=g}const c=document.getElementById("new-cr-price");c&&(c.value=e.price||"");const d=document.getElementById("new-cr-preview-img"),u=document.getElementById("new-cr-preview-box"),m=document.getElementById("new-cr-upload-btn");activeCreationPhoto&&d&&u?(d.src=activeCreationPhoto,u.classList.remove("hidden"),m&&m.classList.add("hidden")):(u&&u.classList.add("hidden"),m&&m.classList.remove("hidden"));const f=document.getElementById("admin-add-creation-modal");f&&f.classList.remove("hidden")}function closeAddCreationSheet(){editingCreationId=null;const t=document.getElementById("admin-add-creation-modal");t&&t.classList.add("hidden")}function clearCreationPhoto(){activeCreationPhoto="",document.getElementById("new-cr-preview-box").classList.add("hidden"),document.getElementById("new-cr-upload-btn").classList.remove("hidden"),document.getElementById("new-cr-file").value=""}function handleCreationPhotoUpload(t){const e=t.files&&t.files[0];if(!e)return;if(e.type&&!e.type.startsWith("image/")){showAdminToast("Please select a photo only (PNG, JPG, WEBP)"),t.value="";return}const o=new FileReader;o.onload=function(n){const s=new Image;s.onload=function(){try{const i=Math.min(1,800/s.width),r=document.createElement("canvas");r.width=Math.round(s.width*i),r.height=Math.round(s.height*i);const l=r.getContext("2d");l.drawImage(s,0,0,r.width,r.height);let c=r.toDataURL("image/jpeg",.75);if(c.length>5e5){const d=Math.min(1,520/s.width);r.width=Math.round(s.width*d),r.height=Math.round(s.height*d),l.drawImage(s,0,0,r.width,r.height),c=r.toDataURL("image/jpeg",.58)}activeCreationPhoto=c}catch{activeCreationPhoto=n.target.result}document.getElementById("new-cr-preview-img").src=activeCreationPhoto,document.getElementById("new-cr-preview-box").classList.remove("hidden"),document.getElementById("new-cr-upload-btn").classList.add("hidden"),showAdminToast("Real photo compressed and ready")},s.onerror=function(){showAdminToast("Could not read this image format. Please choose JPG, PNG, or WEBP.")},s.src=n.target.result},o.readAsDataURL(e)}let _isSavingCreation=!1;async function saveNewCreation(){if(_isSavingCreation)return;const t=document.getElementById("new-cr-title"),e=t?t.value.trim():"",o=(document.getElementById("new-cr-cat")?.value||"Luxury Cake").trim(),n=(document.getElementById("new-cr-date")?.value||"Today").trim(),s=(document.getElementById("new-cr-price")?.value||"").trim(),a=parseInt(s,10);if(!e){highlightMissingRequirement("new-cr-title","Required: Please enter the cake creation name"),showAdminToast("\u26A0\uFE0F Please enter the cake creation name");return}if(!s||isNaN(a)||a<100){highlightMissingRequirement("new-cr-price","Required: Please enter a valid price (min 100 ETB)"),showAdminToast("\u26A0\uFE0F Please enter a valid cake price (min 100 ETB)");return}if(!activeCreationPhoto){highlightMissingRequirement("new-cr-preview-box","Required: Please capture or select a real cake photo"),showAdminToast("\u26A0\uFE0F Please capture or pick a real cake photo");return}const i=document.getElementById("creation-save-btn");i&&(i.disabled=!0,i.classList.add("opacity-70","pointer-events-none")),_isSavingCreation=!0;try{if(editingCreationId){const r=(state.creations||[]).find(c=>String(c.id)===String(editingCreationId));if(!r)return;const l={...r,title:e,category:o,date:n,price:a,img:activeCreationPhoto};window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.saveCreation=="function"&&(await window.FirebaseService.saveCreation(l),localStorage.setItem("mak_creations_cloud_synced","1")),Object.assign(r,l),saveState(),syncAll(),editingCreationId=null,closeAddCreationSheet(),showAdminToast(`Successfully changed "${e}"!`)}else{const r={id:"cr-"+Date.now(),title:e,category:o,date:n,price:a,img:activeCreationPhoto,published:!0,createdAt:new Date().toISOString()};window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.saveCreation=="function"&&(await window.FirebaseService.saveCreation(r),localStorage.setItem("mak_creations_cloud_synced","1")),state.creations=state.creations||[],state.creations.unshift(r),saveState(),syncAll(),closeAddCreationSheet(),showAdminToast(`Successfully added "${e}"!`),showCustomerToast(`Fresh Cake Added: ${e}`)}}catch(r){showAdminToast("Save failed: "+(r&&r.message?r.message:"Please try again"),"error")}finally{_isSavingCreation=!1,i&&(i.disabled=!1,i.classList.remove("opacity-70","pointer-events-none"))}}async function uploadCreationPhoto(t,e){const o=e.files&&e.files[0];if(o){if(!o.type||!o.type.startsWith("image/")){showAdminToast("Please select an image file only (PNG, JPG, WEBP)"),e.value="";return}try{showAdminToast("Compressing & saving photo...");const n=await compressImageFileToCanvas(o,800,.82),s=(state.creations||[]).find(a=>String(a.id)===String(t));if(s){const a={...s,img:n.dataUrl};window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.saveCreation=="function"&&(await window.FirebaseService.saveCreation(a),localStorage.setItem("mak_creations_cloud_synced","1")),s.img=n.dataUrl,saveState(),syncAll(),showAdminToast(`Saved photo for "${s.title}" (${n.kb}KB)!`),showGlobalToast("Creation photo updated on customer storefront!")}}catch(n){showAdminToast("Error saving photo: "+(n&&n.message?n.message:"Firebase error"),"error")}e.value=""}}async function deleteCreation(t){const e=(state.creations||[]).filter(o=>String(o.id)!==String(t));try{if(window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService){if(showAdminToast("Updating photos in Firebase..."),!(state.shop&&state.shop.creationsSeeded===!0)&&typeof window.FirebaseService.saveCreation=="function"){for(const o of e)await window.FirebaseService.saveCreation(o);state.shop||(state.shop={}),state.shop.creationsSeeded=!0,typeof window.FirebaseService.saveSettings=="function"&&await window.FirebaseService.saveSettings({creationsSeeded:!0})}typeof window.FirebaseService.deleteCreation=="function"&&await window.FirebaseService.deleteCreation(t),localStorage.setItem("mak_creations_cloud_synced","1")}state.creations=e,saveState(),syncAll(),showAdminToast("Creation permanently removed")}catch(o){showAdminToast("Delete failed: "+(o&&o.message?o.message:"Firebase error"),"error")}}async function ensureDecorationsSeededInCloud(t){if(window.MAK_ENABLE_FIRESTORE_ORDER_SYNC!==!0||!window.FirebaseService||state.shop&&state.shop.decorationsSeeded===!0)return;const e=Array.isArray(t)&&t.length>=SEED_DECORATIONS.length?t:mergeCloudArrayById(t||[],SEED_DECORATIONS);if(typeof window.FirebaseService.saveDecoration=="function")for(const o of e)await window.FirebaseService.saveDecoration(o);state.shop||(state.shop={}),state.shop.decorationsSeeded=!0,typeof window.FirebaseService.saveSettings=="function"&&await window.FirebaseService.saveSettings({decorationsSeeded:!0})}function setAdminDecCatFilter(t){adminDecCatFilter=t,renderAdminDecorations()}function renderAdminDecorations(){const t=document.getElementById("admin-sub-dec-cnt");t&&(t.textContent=state.decorations.length);const e=document.getElementById("admin-dec-sub"),o=state.decorations.filter(r=>r.inStock!==!1).length;e&&(e.textContent=`${o}/${state.decorations.length} active \u2022 5 predefined categories`);const n=document.getElementById("admin-dec-cat-pills");if(n){const r=typeof getDecorationCategories=="function"?getDecorationCategories():DECORATION_CATEGORIES,l=[{id:"All",short:"All",svgKey:"sparkles"},...r];n.innerHTML=l.map(c=>{const d=adminDecCatFilter===c.id,u=c.id==="All"?state.decorations.length:state.decorations.filter(m=>m.category===c.id).length;return`
            <button onclick="setAdminDecCatFilter('${c.id.replace(/'/g,"\\'")}')" class="shrink-0 px-2.5 py-1.5 rounded-full text-[10.5px] font-bold transition-all ${d?"btn-berry text-white shadow-rose-sm":"bg-white text-ink-muted border border-blush-200"}">
              ${getLuxurySvg(c.svgKey||"sparkles","w-3.5 h-3.5 shrink-0 inline-block mr-1")} ${c.short} (${u})
            </button>
          `}).join("")}const s=(document.getElementById("admin-dec-search")?.value||"").trim().toLowerCase(),a=state.decorations.filter(r=>{const l=adminDecCatFilter==="All"||r.category===adminDecCatFilter,c=!s||r.name.toLowerCase().includes(s)||r.category&&r.category.toLowerCase().includes(s)||r.desc&&r.desc.toLowerCase().includes(s);return l&&c}),i=document.getElementById("admin-dec-list");if(i){if(!a.length){i.innerHTML='<div class="bg-white rounded-[18px] p-5 text-center text-xs text-ink-muted shadow-rose-sm">No decorations found matching your filter. Tap "+ Add Decoration" to create one.</div>';return}i.innerHTML='<div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">'+a.map((r,l)=>{const c=r.inStock!==!1,d=String(r.id).replace(/'/g,"\\'");return`
          <div class="bg-white rounded-[18px] p-3 shadow-rose-sm border border-white flex flex-col gap-2.5 min-w-0">
            <div class="flex items-center gap-2.5 min-w-0">
              <!-- Swap Place Buttons (Up / Down) -->
              <div class="flex flex-col shrink-0 gap-1 select-none">
                <button onclick="moveDecorationPriority('${d}', 'up'); event.stopPropagation();" title="Move Up" class="w-6 h-6 rounded-md bg-blush-100 hover:bg-berry hover:text-white text-ink-muted flex items-center justify-center text-[9px] font-bold transition-colors ${l===0?"opacity-25 pointer-events-none":"active:scale-110 cursor-pointer"}">\u25B2</button>
                <button onclick="moveDecorationPriority('${d}', 'down'); event.stopPropagation();" title="Move Down" class="w-6 h-6 rounded-md bg-blush-100 hover:bg-berry hover:text-white text-ink-muted flex items-center justify-center text-[9px] font-bold transition-colors ${l===a.length-1?"opacity-25 pointer-events-none":"active:scale-110 cursor-pointer"}">\u25BC</button>
              </div>

              <!-- Clickable Photo Thumbnail with Camera Overlay -->
              <div onclick="triggerDecorationPhotoUpload('${d}')" class="relative group cursor-pointer w-14 h-14 rounded-xl overflow-hidden bg-blush-100 border border-blush-200 shrink-0 shadow-2xs flex items-center justify-center ${c?"":"grayscale opacity-60"}">
                <img src="${r.img||SVG_CAKE_FALLBACK}" alt="${r.name}" class="w-full h-full object-cover" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
                <div class="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[8px] font-extrabold">
                  Change
                </div>
                <div class="absolute bottom-0 right-0 p-0.5 bg-berry text-white rounded-tl-md">
                  <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                </div>
              </div>
              <input type="file" id="dec-file-${r.id}" accept="image/png,image/jpeg,image/webp,image/jpg" onchange="uploadDecorationPhoto('${d}', this)" class="hidden" />

              <div class="min-w-0 flex-1">
                <div class="flex items-center justify-between gap-1.5">
                  <span class="text-[12.5px] font-extrabold text-ink leading-tight truncate">${r.name}</span>
                  <span class="px-2 py-0.5 rounded-full text-[8.5px] font-bold ${c?"bg-emerald-50 text-emerald-700 border border-emerald-200":"bg-rose-50 text-berry border border-rose-200"} shrink-0">
                    ${c?"Available":"Sold Out"}
                  </span>
                </div>
                <div class="flex items-center justify-between gap-2 mt-1">
                  <span class="px-2 py-0.5 rounded-full bg-blush-100 text-ink-muted text-[9.5px] font-bold truncate max-w-[140px]">${r.category}</span>
                  <span class="text-[12px] font-black text-berry whitespace-nowrap shrink-0">${fmtETB(r.price)}</span>
                </div>
              </div>
            </div>

            <!-- Actions Bar: Stock Switch + Consistent Edit + Delete -->
            <div class="flex items-center justify-between gap-1.5 pt-2 border-t border-blush-100/80">
              <button onclick="toggleDecorationStock('${d}')" title="Toggle Available / Sold Out" class="px-2.5 h-8 rounded-xl ${c?"bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100":"bg-rose-50 text-berry border border-rose-200 hover:bg-rose-100"} flex items-center justify-center gap-1 text-[10px] font-bold transition-all active:scale-95 cursor-pointer">
                ${c?'<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>':'<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>'}
                <span>${c?"In Stock":"Sold Out"}</span>
              </button>

              <div class="flex items-center gap-1.5 shrink-0">
                <button onclick="openEditDecorationModal('${d}')" title="Edit Decoration" class="px-3 h-8 rounded-xl bg-berry text-white text-[10.5px] font-bold shadow-rose-sm active:scale-95 transition-all flex items-center gap-1 cursor-pointer">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  <span>Edit</span>
                </button>
                <button onclick="deleteAdminDecoration('${d}')" title="Delete Decoration" class="w-8 h-8 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-berry flex items-center justify-center transition-all active:scale-95 cursor-pointer">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
              </div>
            </div>
          </div>
        `}).join("")+"</div>"}}function moveDecorationPriority(t,e){const o=state.decorations.findIndex(a=>String(a.id)===String(t));if(o===-1)return;const n=e==="up"?o-1:o+1;if(n<0||n>=state.decorations.length)return;const[s]=state.decorations.splice(o,1);state.decorations.splice(n,0,s),saveState(),syncAll(),showAdminToast(`Moved decoration "${s.name}" ${e==="up"?"Up":"Down"}`)}let activeAdminDecFormPhoto="",_decSheetCloseTimer=null,_isSavingDecForm=!1;function openAddDecorationSheet(){openAddDecorationModal()}function openAddDecorationModal(){if(typeof requirePackageFeature=="function"&&!requirePackageFeature("decorations","Extra Decorations"))return;const t=typeof getPackageLimit=="function"?getPackageLimit("decorations"):0;if((state.decorations||[]).length>=t){const n=typeof getActivePackageConfig=="function"?getActivePackageConfig():{name:"Basic"};showAdminToast(`\u{1F512} Decorations limit (${t}) reached on ${n.name} plan. Upgrade to Premium (10,000 ETB) for unlimited.`,"error");return}typeof syncAllCategoryDropdowns=="function"&&syncAllCategoryDropdowns(),document.getElementById("admin-dec-modal-title").textContent="+ Add New Decoration",document.getElementById("admin-dec-form-id").value="",document.getElementById("admin-dec-form-name").value="";const e=document.getElementById("admin-dec-form-cat");e&&e.options.length&&(e.value="Candles & Toppers"),document.getElementById("admin-dec-form-stock").value="true",document.getElementById("admin-dec-form-price").value="200",document.getElementById("admin-dec-form-desc").value="",document.getElementById("admin-dec-form-reqnum").checked=!1,document.getElementById("admin-dec-form-img-preview").src=SEED_DECORATIONS[0].img,document.getElementById("admin-dec-form-img-status").textContent="Default Category Photo",document.getElementById("admin-dec-form-delete-btn").classList.add("hidden");const o=document.querySelector('#admin-dec-sheet input[type="file"]');o&&(o.value=""),activeAdminDecFormPhoto="",showAdminDecModal()}function openEditDecorationModal(t){const e=state.decorations.find(a=>String(a.id)===String(t));if(!e)return;typeof syncAllCategoryDropdowns=="function"&&syncAllCategoryDropdowns(),document.getElementById("admin-dec-modal-title").textContent="Edit Decoration: "+e.name,document.getElementById("admin-dec-form-id").value=e.id,document.getElementById("admin-dec-form-name").value=e.name;const o=document.getElementById("admin-dec-form-cat"),n=e.category||"Candles & Toppers";if(o){if(!Array.from(o.options).some(a=>a.value===n)){const a=document.createElement("option");a.value=n,a.textContent=n,o.insertBefore(a,o.firstChild)}o.value=n}document.getElementById("admin-dec-form-stock").value=e.inStock!==!1?"true":"false",document.getElementById("admin-dec-form-price").value=e.price,document.getElementById("admin-dec-form-desc").value=e.desc||"",document.getElementById("admin-dec-form-reqnum").checked=!!e.requiresNumber,document.getElementById("admin-dec-form-img-preview").src=e.img||SVG_CAKE_FALLBACK,document.getElementById("admin-dec-form-img-status").textContent="Current Decoration Photo",document.getElementById("admin-dec-form-delete-btn").classList.remove("hidden");const s=document.querySelector('#admin-dec-sheet input[type="file"]');s&&(s.value=""),activeAdminDecFormPhoto=e.img||"",showAdminDecModal()}function showAdminDecModal(){_decSheetCloseTimer&&(clearTimeout(_decSheetCloseTimer),_decSheetCloseTimer=null),closeAddCakeSheet(),closeAdminReceiptModal();const t=document.getElementById("admin-dec-backdrop"),e=document.getElementById("admin-dec-sheet");t&&t.classList.remove("hidden"),e&&(e.classList.remove("hidden"),requestAnimationFrame(()=>e.classList.remove("translate-y-full")))}function closeAdminDecModal(){const t=document.getElementById("admin-dec-backdrop"),e=document.getElementById("admin-dec-sheet");e&&e.classList.add("translate-y-full"),_decSheetCloseTimer&&clearTimeout(_decSheetCloseTimer),_decSheetCloseTimer=setTimeout(()=>{_decSheetCloseTimer=null,e&&e.classList.contains("translate-y-full")&&(e.classList.add("hidden"),t&&t.classList.add("hidden"))},260)}function closeAddDecorationSheet(){closeAdminDecModal()}async function handleAdminDecFormPhotoUpload(t){const e=t.files&&t.files[0];if(e){if(!e.type||!e.type.startsWith("image/")){showAdminToast("Please select an image file only (PNG, JPG, WEBP)"),t.value="";return}try{showAdminToast("Compressing image on-the-fly...");const o=await compressImageFileToCanvas(e,800,.82);activeAdminDecFormPhoto=o.dataUrl,document.getElementById("admin-dec-form-img-preview").src=o.dataUrl,document.getElementById("admin-dec-form-img-status").textContent=`Attached (${o.kb}KB HQ Canvas Compressed)`,showAdminToast(`Decoration photo compressed (${o.kb}KB)!`)}catch(o){showAdminToast("Error compressing image: "+o.message)}t.value=""}}async function saveAdminDecorationForm(){if(_isSavingDecForm)return;const t=document.getElementById("admin-dec-form-id").value,e=document.getElementById("admin-dec-form-name"),o=document.getElementById("admin-dec-form-price"),n=e?e.value.trim():"",s=o?o.value.trim():"",a=parseInt(s,10),i=document.getElementById("admin-dec-form-cat").value,r=document.getElementById("admin-dec-form-stock").value==="true",l=document.getElementById("admin-dec-form-desc").value.trim(),c=document.getElementById("admin-dec-form-reqnum").checked;if(!n){highlightMissingRequirement("admin-dec-form-name","Required: Please enter decoration product name"),showAdminToast("\u26A0\uFE0F Please enter decoration name");return}if(!s||isNaN(a)||a<10){highlightMissingRequirement("admin-dec-form-price","Required: Please enter a valid price (minimum 10 ETB)"),showAdminToast("\u26A0\uFE0F Please enter a valid price (minimum 10 ETB)");return}const d=document.getElementById("admin-dec-save-btn");d&&(d.disabled=!0,d.classList.add("opacity-70","pointer-events-none")),_isSavingDecForm=!0;try{if(t){const u=state.decorations.findIndex(m=>String(m.id)===String(t));if(u!==-1){const m={...state.decorations[u],name:n,category:i,inStock:r,price:a,desc:l,requiresNumber:c,img:activeAdminDecFormPhoto||state.decorations[u].img};window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.saveDecoration=="function"&&(await ensureDecorationsSeededInCloud(state.decorations),await window.FirebaseService.saveDecoration(m),localStorage.setItem("mak_decs_cloud_synced","1")),Object.assign(state.decorations[u],m),saveState(),syncAll(),closeAdminDecModal(),showAdminToast(`Successfully changed "${n}"!`)}}else{const u={id:"dec-"+Date.now(),name:n,category:i,inStock:r,price:a,desc:l,requiresNumber:c,svgKey:(DECORATION_CATEGORIES.find(m=>m.id===i)||{}).svgKey||"sparkles",img:activeAdminDecFormPhoto||(SEED_DECORATIONS.find(m=>m.category===i)||SEED_DECORATIONS[0]).img};window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.saveDecoration=="function"&&(await ensureDecorationsSeededInCloud(state.decorations),await window.FirebaseService.saveDecoration(u),localStorage.setItem("mak_decs_cloud_synced","1")),state.decorations.unshift(u),saveState(),syncAll(),closeAdminDecModal(),showAdminToast(`Successfully added "${n}"!`)}}catch(u){showAdminToast("Save failed: "+(u&&u.message?u.message:"Please try again"),"error")}finally{_isSavingDecForm=!1,d&&(d.disabled=!1,d.classList.remove("opacity-70","pointer-events-none"))}}function deleteCurrentAdminDecoration(){const t=document.getElementById("admin-dec-form-id").value;t&&deleteAdminDecoration(t)}async function deleteAdminDecoration(t){const e=state.decorations.find(s=>String(s.id)===String(t));if(!e||!window.confirm(`Are you sure you want to delete "${e.name}" from Extra Decorations?

This action cannot be undone.`))return;const n=state.decorations.filter(s=>String(s.id)!==String(t));try{if(window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService){if(showAdminToast("Updating decorations in Firebase..."),!(state.shop&&state.shop.decorationsSeeded===!0)&&typeof window.FirebaseService.saveDecoration=="function"){for(const s of n)await window.FirebaseService.saveDecoration(s);state.shop||(state.shop={}),state.shop.decorationsSeeded=!0,typeof window.FirebaseService.saveSettings=="function"&&await window.FirebaseService.saveSettings({decorationsSeeded:!0})}typeof window.FirebaseService.deleteDecoration=="function"&&await window.FirebaseService.deleteDecoration(t),localStorage.setItem("mak_decs_cloud_synced","1")}state.decorations=n,state.decSelections&&state.decSelections[t]&&delete state.decSelections[t],saveState(),syncAll(),closeAdminDecModal(),showAdminToast(`Deleted "${e.name}" permanently`),showGlobalToast("Decoration removed from customer storefront catalog.")}catch(s){showAdminToast("Delete failed: "+(s&&s.message?s.message:"Firebase error"),"error")}}async function toggleDecorationStock(t){const e=state.decorations.find(n=>String(n.id)===String(t));if(!e)return;const o=e.inStock===!1;try{window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.saveDecoration=="function"&&(await window.FirebaseService.saveDecoration({...e,inStock:o}),localStorage.setItem("mak_decs_cloud_synced","1")),e.inStock=o,saveState(),syncAll(),showAdminToast(`${e.name}: ${e.inStock?"Available (In Stock)":"Sold Out"}`),showGlobalToast(`${e.name} is now ${e.inStock?"available to order":"marked Sold Out"}`)}catch(n){showAdminToast("Update failed: "+(n&&n.message?n.message:"Firebase error"),"error")}}function triggerDecorationPhotoUpload(t){const e=document.getElementById("dec-file-"+t);e&&e.click()}async function uploadDecorationPhoto(t,e){const o=e.files&&e.files[0];if(o){if(!o.type||!o.type.startsWith("image/")){showAdminToast("Please select an image file only (PNG, JPG, WEBP)"),e.value="";return}try{showAdminToast("Compressing photo on-the-fly...");const n=await compressImageFileToCanvas(o,800,.82),s=state.decorations.find(a=>String(a.id)===String(t));if(s){const a={...s,img:n.dataUrl};window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.saveDecoration=="function"&&(await ensureDecorationsSeededInCloud(state.decorations),await window.FirebaseService.saveDecoration(a),localStorage.setItem("mak_decs_cloud_synced","1")),s.img=n.dataUrl,saveState(),syncAll(),showAdminToast(`Updated photo for "${s.name}" (${n.kb}KB HQ)!`),showGlobalToast("New decoration photo synced to customer catalog!")}}catch(n){showAdminToast("Error compressing image: "+n.message)}e.value=""}}let analyticsDateRange="all",analyticsProductTab="cakes";function setAnalyticsDateRange(t){analyticsDateRange=t,renderAdminAnalytics()}function setAnalyticsProductTab(t){analyticsProductTab=t,renderAdminAnalytics()}function getAnalyticsOrders(){const t=(state.orders||[]).filter(e=>e.status!=="Cancelled");return analyticsDateRange==="all"?t:analyticsDateRange==="today"?t.filter(e=>{if(e.deliveryDate==="Today")return!0;if(e.createdAt){const o=new Date(e.createdAt),n=new Date;return o.getDate()===n.getDate()&&o.getMonth()===n.getMonth()&&o.getFullYear()===n.getFullYear()}return!1}):analyticsDateRange==="7days"?t.filter(e=>e.deliveryDate==="Today"||e.deliveryDate==="Tomorrow"?!0:e.createdAt?(Date.now()-e.createdAt)/864e5<=7:!0):analyticsDateRange==="30days"?t.filter(e=>e.createdAt?(Date.now()-e.createdAt)/864e5<=30:!0):t}function renderAdminAnalytics(){const t=document.getElementById("admin-analytics-body");if(!t)return;const e=typeof hasPackageFeature=="function"&&!hasPackageFeature("analytics"),o=getAnalyticsOrders(),n=o.length,s=o.filter(p=>p.paymentStatus==="Paid"),a=s.reduce((p,h)=>p+(h.total||0),0),i=o.reduce((p,h)=>p+(h.total||0),0),r=o.filter(p=>p.paymentStatus!=="Paid"),l=r.reduce((p,h)=>p+(h.total||0),0),c=s.length?Math.round(a/s.length):n?Math.round(i/n):0,d=[{label:"Mon",rev:Math.round(a*.12),orders:Math.max(0,Math.round(n*.15))},{label:"Tue",rev:Math.round(a*.14),orders:Math.max(0,Math.round(n*.15))},{label:"Wed",rev:Math.round(a*.18),orders:Math.max(1,Math.round(n*.2))},{label:"Thu",rev:Math.round(a*.1),orders:Math.max(0,Math.round(n*.1))},{label:"Fri",rev:Math.round(a*.22),orders:Math.max(1,Math.round(n*.2))},{label:"Sat",rev:Math.round(a*.16),orders:Math.max(1,Math.round(n*.15))},{label:"Sun",rev:Math.round(a*.08),orders:Math.max(0,Math.round(n*.05))}],u=Math.max(...d.map(p=>p.rev),1e3),m={};o.forEach(p=>{const h=p.cakeName||"Custom Cake";m[h]||(m[h]={name:h,img:p.cakeImg||"",qty:0,rev:0}),m[h].qty+=1,m[h].rev+=p.total||0});const f=Object.values(m).sort((p,h)=>h.qty!==p.qty?h.qty-p.qty:h.rev-p.rev),g=f.length?Math.max(...f.map(p=>p.rev),1):1,b={};o.forEach(p=>{Array.isArray(p.addons)&&p.addons.length&&p.addons.forEach(h=>{const k=String(h||"").trim();if(!k)return;const v=(state.decorations||[]).find(C=>k.toLowerCase().includes(C.name.toLowerCase())||C.name.toLowerCase().includes(k.toLowerCase())),S=v?v.name:k.replace(/\s*\(\d+\s*ETB\)/i,"").trim(),A=v?v.price:150,B=v?v.img:"",I=v?v.category:"Decorations";b[S]||(b[S]={name:S,category:I,img:B,qty:0,rev:0}),b[S].qty+=1,b[S].rev+=A})});const y=Object.values(b).sort((p,h)=>h.qty!==p.qty?h.qty-p.qty:h.rev-p.rev),x=y.length?Math.max(...y.map(p=>p.rev),1):1,w={Telebirr:0,"CBE Transfer":0,"Pay on Delivery":0};o.forEach(p=>{const h=p.paymentMethod||"Telebirr";w[h]!==void 0?w[h]+=p.total||0:w["Pay on Delivery"]+=p.total||0});const E={today:"Today","7days":"Last 7 Days","30days":"Last 30 Days",all:"All Time"};if(t.innerHTML=`
        <div class="bg-white rounded-[20px] p-1.5 shadow-rose-sm border border-white grid grid-cols-4 gap-1 select-none">
          ${["today","7days","30days","all"].map(p=>{const h=analyticsDateRange===p,k=E[p];return`
              <button onclick="setAnalyticsDateRange('${p}')" class="py-2 rounded-xl text-[10.5px] font-extrabold transition-all cursor-pointer ${h?"btn-berry text-white shadow-rose-sm":"text-ink-muted hover:text-ink hover:bg-blush-50"}">
                ${k}
              </button>
            `}).join("")}
        </div>

        <!-- 1. BUSINESS OVERVIEW: 4 KEY SUMMARY CARDS -->
        <div class="space-y-1.5">
          <div class="flex items-center justify-between px-0.5">
            <span class="text-xs font-extrabold text-ink">Business Overview</span>
            <span class="text-[10px] font-bold text-ink-muted">${E[analyticsDateRange]}</span>
          </div>

          <div class="grid grid-cols-2 gap-2.5">
            <!-- Card 1: Total Orders -->
            <div class="bg-white rounded-[20px] p-3.5 shadow-rose-sm border border-white space-y-1 relative overflow-hidden">
              <div class="flex items-center justify-between">
                <span class="text-[10.5px] font-bold text-ink-muted">Total Orders</span>
                <div class="w-7 h-7 rounded-lg bg-blush-100 text-berry flex items-center justify-center">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                </div>
              </div>
              <div class="text-xl font-black text-ink">${n} <span class="text-xs font-bold text-ink-muted">orders</span></div>
              <div class="text-[9.5px] text-ink-muted flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>${s.length} verified paid</span>
              </div>
            </div>

            <!-- Card 2: Total Revenue -->
            <div class="bg-white rounded-[20px] p-3.5 shadow-rose-sm border border-white space-y-1 relative overflow-hidden">
              <div class="flex items-center justify-between">
                <span class="text-[10.5px] font-bold text-ink-muted">Verified Received</span>
                <div class="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
              </div>
              <div class="text-xl font-black text-berry">${fmtETB(a)}</div>
              <div class="text-[9.5px] text-emerald-600 font-semibold truncate">
                Verified received payments
              </div>
            </div>

            <!-- Card 3: Total Earned / Booked Sales -->
            <div class="bg-white rounded-[20px] p-3.5 shadow-rose-sm border border-white space-y-1 relative overflow-hidden">
              <div class="flex items-center justify-between">
                <span class="text-[10.5px] font-bold text-ink-muted">Total Earned</span>
                <div class="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
              </div>
              <div class="text-xl font-black text-emerald-700">${fmtETB(i)}</div>
              <div class="text-[9.5px] text-ink-muted">All customer orders</div>
            </div>

            <!-- Card 4: Average Order Value -->
            <div class="bg-white rounded-[20px] p-3.5 shadow-rose-sm border border-white space-y-1 relative overflow-hidden">
              <div class="flex items-center justify-between">
                <span class="text-[10.5px] font-bold text-ink-muted">Avg Order Value</span>
                <div class="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                </div>
              </div>
              <div class="text-xl font-black text-ink">${fmtETB(c)}</div>
              <div class="text-[9.5px] text-ink-muted">Per paid customer order</div>
            </div>
          </div>
        </div>

        <!-- 2. SALES PERFORMANCE & TREND CHART -->
        <div class="bg-white rounded-[22px] p-4 shadow-rose border border-white space-y-3.5">
          <div class="flex items-center justify-between border-b border-blush-100 pb-2">
            <div>
              <h3 class="text-xs font-extrabold text-ink">Sales Performance Over Time</h3>
              <p class="text-[10px] text-ink-muted">Revenue &amp; order volume trend (${E[analyticsDateRange]})</p>
            </div>
            <span class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-blush-100 text-berry">
              ${n} Orders
            </span>
          </div>

          <!-- Sales Summary 3-Column Metrics -->
          <div class="grid grid-cols-3 gap-2 text-center">
            <div class="bg-blush-50/70 p-2 rounded-xl">
              <div class="text-[9px] font-bold text-ink-muted uppercase">Booked Sales</div>
              <div class="text-xs font-extrabold text-ink mt-0.5">${fmtETB(i)}</div>
            </div>
            <div class="bg-blush-50/70 p-2 rounded-xl">
              <div class="text-[9px] font-bold text-ink-muted uppercase">Orders Count</div>
              <div class="text-xs font-extrabold text-ink mt-0.5">${n} Orders</div>
            </div>
            <div class="bg-blush-50/70 p-2 rounded-xl">
              <div class="text-[9px] font-bold text-ink-muted uppercase">Received Rev</div>
              <div class="text-xs font-extrabold text-berry mt-0.5">${fmtETB(a)}</div>
            </div>
          </div>

          <!-- Sales Trend Bar Chart -->
          <div class="space-y-1.5 pt-1">
            <div class="flex items-center justify-between text-[10px] font-semibold text-ink-muted px-1">
              <span>Verified Revenue Trend (ETB)</span>
              <span>Peak: ${fmtETB(u)}</span>
            </div>

            <!-- SVG Bar Chart -->
            <div class="h-28 w-full bg-blush-50/50 rounded-xl p-2.5 flex items-end justify-between gap-1.5">
              ${d.map(p=>{const h=Math.max(6,Math.round(p.rev/u*88));return`
                  <div class="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                    <span class="text-[8px] font-extrabold text-ink opacity-0 group-hover:opacity-100 transition-opacity">${p.rev?p.rev>=1e3?(p.rev/1e3).toFixed(1)+"k":p.rev:"0"}</span>
                    <div class="w-full max-w-[24px] rounded-t-lg bg-gradient-to-t from-berry-dark to-berry shadow-rose-sm transition-all duration-300" style="height:${h}%;"></div>
                    <span class="text-[9px] font-bold text-ink-muted mt-0.5">${p.label}</span>
                  </div>
                `}).join("")}
            </div>
          </div>

          <!-- Unverified payment note if any -->
          ${l>0?`
            <div class="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/60 flex items-center justify-between text-xs">
              <div class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                <span class="text-[10.5px] font-semibold text-amber-900">${r.length} Pending / Unverified Orders</span>
              </div>
              <span class="text-[11px] font-bold text-amber-900">${fmtETB(l)}</span>
            </div>
          `:""}
        </div>

        <!-- 3. PRODUCT PERFORMANCE (Cakes & Extra Decorations) -->
        <div class="bg-white rounded-[22px] p-4 shadow-rose border border-white space-y-3">
          <div class="flex items-center justify-between border-b border-blush-100 pb-2">
            <div>
              <h3 class="text-xs font-extrabold text-ink">Product Performance</h3>
              <p class="text-[10px] text-ink-muted">Best-selling products ranked by popularity &amp; revenue</p>
            </div>
            <!-- Sub-tab switcher between Cakes & Extra Decorations -->
            <div class="flex rounded-full bg-blush-100 p-0.5 text-[9.5px] font-extrabold select-none">
              <button onclick="setAnalyticsProductTab('cakes')" class="px-2.5 py-1 rounded-full transition-all cursor-pointer ${analyticsProductTab==="cakes"?"bg-berry text-white shadow-rose-sm":"text-ink-muted hover:text-ink"}">
                Cakes (${f.length})
              </button>
              <button onclick="setAnalyticsProductTab('decorations')" class="px-2.5 py-1 rounded-full transition-all cursor-pointer ${analyticsProductTab==="decorations"?"bg-berry text-white shadow-rose-sm":"text-ink-muted hover:text-ink"}">
                Extra Decs (${y.length})
              </button>
            </div>
          </div>

          <!-- A. BEST-SELLING CAKES LIST -->
          ${analyticsProductTab==="cakes"?`
            <div class="space-y-2">
              ${f.length?f.map((p,h)=>{const k=h===0?"bg-stargold text-amber-900":h===1?"bg-slate-200 text-slate-800":h===2?"bg-amber-100 text-amber-800":"bg-blush-100 text-ink-muted",v=Math.round(p.rev/(g||1)*100);return`
                  <div class="bg-blush-50/70 p-2.5 rounded-2xl border border-blush-100 space-y-2">
                    <div class="flex items-center justify-between gap-2.5">
                      <div class="flex items-center gap-2.5 min-w-0">
                        <span class="w-5 h-5 rounded-full ${k} text-[9.5px] font-black flex items-center justify-center shrink-0">
                          #${h+1}
                        </span>
                        <div class="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-blush-100 border border-blush-200 shadow-2xs">
                          <img src="${p.img||SVG_CAKE_FALLBACK}" alt="${p.name}" class="w-full h-full object-cover" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
                        </div>
                        <div class="min-w-0">
                          <div class="text-[11.5px] font-extrabold text-ink truncate">${p.name}</div>
                          <div class="text-[10px] font-semibold text-ink-muted">${p.qty} sold in period</div>
                        </div>
                      </div>
                      <div class="text-right shrink-0">
                        <div class="text-[11.5px] font-black text-berry">${fmtETB(p.rev)}</div>
                        <div class="text-[9px] font-semibold text-emerald-600">Revenue</div>
                      </div>
                    </div>
                    <!-- Performance Share Progress Bar -->
                    <div class="h-1.5 rounded-full bg-blush-200/70 overflow-hidden">
                      <div class="h-full bg-berry rounded-full" style="width:${v}%"></div>
                    </div>
                  </div>
                `}).join(""):`
                <div class="p-6 text-center text-xs text-ink-muted">No cake sales recorded for this date range.</div>
              `}
            </div>
          `:`
            <!-- B. BEST-SELLING EXTRA DECORATIONS LIST -->
            <div class="space-y-2">
              ${y.length?y.map((p,h)=>{const k=h===0?"bg-stargold text-amber-900":h===1?"bg-slate-200 text-slate-800":h===2?"bg-amber-100 text-amber-800":"bg-blush-100 text-ink-muted",v=Math.round(p.rev/(x||1)*100);return`
                  <div class="bg-blush-50/70 p-2.5 rounded-2xl border border-blush-100 space-y-2">
                    <div class="flex items-center justify-between gap-2.5">
                      <div class="flex items-center gap-2.5 min-w-0">
                        <span class="w-5 h-5 rounded-full ${k} text-[9.5px] font-black flex items-center justify-center shrink-0">
                          #${h+1}
                        </span>
                        <div class="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-blush-100 border border-blush-200 shadow-2xs flex items-center justify-center">
                          ${p.img?`<img src="${p.img}" alt="${p.name}" class="w-full h-full object-cover" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />`:'<span class="text-sm">\u2728</span>'}
                        </div>
                        <div class="min-w-0">
                          <div class="text-[11.5px] font-extrabold text-ink truncate">${p.name}</div>
                          <div class="text-[9.5px] font-semibold text-ink-muted">${p.category} \u2022 ${p.qty} ordered</div>
                        </div>
                      </div>
                      <div class="text-right shrink-0">
                        <div class="text-[11.5px] font-black text-berry">${fmtETB(p.rev)}</div>
                        <div class="text-[9px] font-semibold text-emerald-600">Revenue</div>
                      </div>
                    </div>
                    <!-- Performance Share Progress Bar -->
                    <div class="h-1.5 rounded-full bg-blush-200/70 overflow-hidden">
                      <div class="h-full bg-berry rounded-full" style="width:${v}%"></div>
                    </div>
                  </div>
                `}).join(""):`
                <div class="p-6 text-center text-xs text-ink-muted">No extra decorations ordered in this date range.</div>
              `}
            </div>
          `}
        </div>

        <!-- 4. TOTAL EARNINGS BREAKDOWN (CALCULATE TOTAL EARNINGS ONLY - NO COSTS) -->
        <div class="bg-white rounded-[22px] p-4 shadow-rose border border-white space-y-3.5">
          <div class="flex items-center justify-between border-b border-blush-100 pb-2">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <div>
                <h3 class="text-xs font-extrabold text-ink">Total Earnings Summary</h3>
                <p class="text-[10px] text-ink-muted">Actual revenue received across channels (${E[analyticsDateRange]})</p>
              </div>
            </div>
            <span class="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
              ${fmtETB(a)} Received
            </span>
          </div>

          <!-- Total Earned Summary Cards -->
          <div class="grid grid-cols-2 gap-2 text-xs">
            <div class="bg-blush-50/70 p-3 rounded-2xl border border-blush-100 space-y-0.5">
              <div class="text-[10px] font-bold text-ink-muted">Verified Received Cash</div>
              <div class="text-lg font-black text-berry">${fmtETB(a)}</div>
              <div class="text-[9.5px] text-emerald-600 font-semibold">${s.length} paid orders</div>
            </div>
            <div class="bg-blush-50/70 p-3 rounded-2xl border border-blush-100 space-y-0.5">
              <div class="text-[10px] font-bold text-ink-muted">Average Earned / Order</div>
              <div class="text-lg font-black text-ink">${fmtETB(c)}</div>
              <div class="text-[9.5px] text-ink-muted">Per customer order</div>
            </div>
          </div>

          <!-- Earnings by Payment Channel with Progress Bars -->
          <div class="space-y-2.5 pt-1">
            <div class="text-[10.5px] font-extrabold text-ink px-0.5">Earnings by Payment Channel</div>
            ${[{name:"Telebirr",amount:w.Telebirr||0,color:"bg-berry",barColor:"bg-berry"},{name:"CBE Bank Transfer",amount:w["CBE Transfer"]||0,color:"bg-amber-500",barColor:"bg-amber-500"},{name:"Cash on Arrival",amount:w["Pay on Delivery"]||0,color:"bg-emerald-500",barColor:"bg-emerald-500"}].map(p=>{const h=i>0?Math.round(p.amount/i*100):0;return`
                <div class="space-y-1 bg-blush-50/40 p-2.5 rounded-xl border border-blush-100/70">
                  <div class="flex items-center justify-between text-xs">
                    <span class="font-bold text-ink flex items-center gap-1.5">
                      <span class="w-2 h-2 rounded-full ${p.color}"></span>
                      ${p.name}
                    </span>
                    <span class="font-extrabold text-ink">${fmtETB(p.amount)} <span class="text-[10px] font-semibold text-ink-muted">(${h}%)</span></span>
                  </div>
                  <div class="h-2 rounded-full bg-blush-100 overflow-hidden">
                    <div class="h-full ${p.barColor} rounded-full transition-all duration-500" style="width: ${h}%"></div>
                  </div>
                </div>
              `}).join("")}
          </div>

          <!-- Final Net Earned Footer -->
          <div class="pt-2 border-t border-blush-100 flex items-center justify-between text-xs">
            <span class="text-[11px] font-bold text-ink">Total Net Earned (${E[analyticsDateRange]})</span>
            <span class="text-base font-black text-berry">${fmtETB(a)}</span>
          </div>
        </div>
      `,e){const p=t.innerHTML;t.innerHTML=`
          <div class="relative" style="min-height:72vh;">
            <div class="pointer-events-none select-none overflow-hidden" style="filter:blur(5px);opacity:0.65;max-height:74vh;">${p}</div>
            <div class="absolute inset-0 flex items-start justify-center px-4" style="padding-top:64px;background:rgba(255,249,250,0.55);backdrop-filter:blur(3px);">
              <div class="bg-white rounded-3xl p-6 shadow-2xl border border-blush-200 max-w-xs w-full text-center">
                <div style="font-size:38px;line-height:1;margin-bottom:10px;">\u{1F4CA}</div>
                <div style="font-size:15px;font-weight:900;color:#6d28d9;margin-bottom:6px;">Unlock Sales Analytics</div>
                <div style="font-size:11px;color:#6b7280;line-height:1.5;margin-bottom:14px;">See your real revenue, net profit, top-selling cakes &amp; payment channels. Upgrade to <strong style="color:#7c3aed;">Advanced</strong> to earn smarter.</div>
                <div class="text-left" style="display:flex;flex-direction:column;gap:6px;margin-bottom:18px;">
                  ${["\u{1F4C8} Total Revenue & Net Profit","\u{1F3C6} Top Selling Cakes Ranked","\u{1F4B3} Earnings by Payment Channel","\u{1F4CA} Weekly Sales Trend Chart"].map(h=>`<div style="display:flex;align-items:center;gap:8px;font-size:11px;font-weight:600;color:#1f2937;"><span style="color:#10b981;font-weight:900;">\u2713</span><span>${h}</span></div>`).join("")}
                </div>
                <button onclick="openUpgradePlanPage();" style="background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;width:100%;padding:13px;border-radius:50px;font-size:12.5px;font-weight:900;border:none;cursor:pointer;box-shadow:0 4px 15px rgba(124,58,237,0.35);">
                  \u{1F680} View Upgrade Plans \u2192
                </button>
                <div style="font-size:9.5px;color:#6b7280;margin-top:10px;">Pay once \xB7 Contact MAK CAKE after payment</div>
              </div>
            </div>
          </div>`}}const DEFAULT_SHOP_CONFIG={isOpen:!0,deliveryFee:150,bellOn:!0,businessName:"MAK CAKE",businessLogo:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=120&q=80",businessPhone:SHOP_SETTINGS_CONFIG.phoneLocal,businessAddress:"Bole Medhanialem, near Edna Mall, Addis Ababa",businessDesc:"Addis Ababa Premier Halal Luxury Cake Bakery & Dessert Boutique",businessLocation:"Bole Medhanialem, Addis Ababa",deliveryEnabled:!0,pickupEnabled:!0,minOrderAmount:500,deliveryAreas:"Bole, CMC, Kazanchis, Old Airport, Sarbet, Piassa, Summit",deliveryInstructions:"Same-day delivery chilled in insulated carrier boxes with real-time driver tracking.",paymentMethods:{telebirr:{enabled:!0,name:"Telebirr",accountName:SHOP_SETTINGS_CONFIG.telebirrHolder,accountNumber:SHOP_SETTINGS_CONFIG.telebirrDisplay,instructions:"Transfer via Telebirr app and upload screenshot receipt below."},cbe:{enabled:!0,name:"CBE Transfer",accountName:SHOP_SETTINGS_CONFIG.cbeHolder,accountNumber:SHOP_SETTINGS_CONFIG.cbeAccountDisplay,instructions:"Transfer to Commercial Bank of Ethiopia and upload slip screenshot."},cod:{enabled:!0,name:"Pay on Delivery",accountName:"Cash on Arrival",accountNumber:"Bole Courier",instructions:"Pay courier in cash or Telebirr upon receiving your fresh cake."}},orderingEnabled:!0,leadTimeHours:4,customNotesAllowed:!0,orderInstructions:"Order cut-off time is 8:00 PM for same-day delivery.",announcementText:"\u2728 Fresh Daily Chilled Delivery Across Addis Ababa \u2022 100% Halal Bakery \u2728",heroBannerTitle:"Artisanal Luxury Cakes & Sweet Celebrations",heroBannerSubtitle:"Handcrafted fresh daily in Bole with Belgian chocolate & premium local butter.",rewardBox:{enabled:!0,promoCodes:[{id:"p1",code:"MAK10",discount:10,type:"percent",desc:"10% off celebration orders",active:!0,usedCount:0},{id:"p2",code:"BOLELOVE",discount:150,type:"fixed",desc:"150 ETB off delivery or cake",active:!0,usedCount:0},{id:"p3",code:"FREECANDLE",discount:120,type:"fixed",desc:"Free birthday candles set",active:!0,usedCount:0}],rewards:[{id:"r1",name:"10% Discount Voucher",desc:"Valid on orders over 2,000 ETB",active:!0},{id:"r2",name:"Free Birthday Candles Set",desc:"Complimentary gift in cart",active:!0},{id:"r3",name:"VIP Morning Delivery",desc:"Priority guaranteed morning slot",active:!0}]},ads:[{id:1,title:"Fresh Daily Addis Mini Bento Cakes",desc:"Same-day chilled delivery in Bole Medhanialem",img:"https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=600&q=80",link:"Order Bento",active:!0},{id:2,title:"Wedding & Anniversary Custom 3-Tier Luxury",desc:"Book tasting consultation 48 hours in advance",img:"https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=600&q=80",link:"Custom Cakes",active:!0}],managers:[],passcode:"1234",securityEmail:"owner@makcake.et",lastPasscodeChange:"Nov 24, 2026"};let adminShopSection="all";function ensureShopState(){state.shop?(state.shop={...DEFAULT_SHOP_CONFIG,...state.shop},state.shop.paymentMethods||(state.shop.paymentMethods=JSON.parse(JSON.stringify(DEFAULT_SHOP_CONFIG.paymentMethods))),state.shop.rewardBox||(state.shop.rewardBox=JSON.parse(JSON.stringify(DEFAULT_SHOP_CONFIG.rewardBox))),state.shop.ads||(state.shop.ads=JSON.parse(JSON.stringify(DEFAULT_SHOP_CONFIG.ads))),state.shop.managers||(state.shop.managers=JSON.parse(JSON.stringify(DEFAULT_SHOP_CONFIG.managers)))):state.shop=JSON.parse(JSON.stringify(DEFAULT_SHOP_CONFIG))}function ensurePackagesState(){(!state.basicPackages||!state.basicPackages.length)&&(state.basicPackages=[{id:1,name:'Bento Mini (4")',grams:350,portions:"1-2 people",price:1800,popular:!0},{id:2,name:'Standard Celebration (6")',grams:850,portions:"6-8 people",price:2600,popular:!0},{id:3,name:'Family Grand (8")',grams:1400,portions:"10-12 people",price:3400,popular:!1},{id:4,name:'Luxury 2-Tier Event (10")',grams:2600,portions:"20-25 people",price:6800,popular:!0}])}function renderAdminPackages(){ensurePackagesState();const t=document.getElementById("admin-packages-list");if(!t)return;const e=state.basicPackages;t.innerHTML=e.map((n,s)=>`
        <div class="p-3 rounded-2xl bg-blush-50 border border-blush-200/80 space-y-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-berry text-white text-[10px] font-black flex items-center justify-center">${s+1}</span>
              <input type="text" value="${n.name}" onchange="updatePackageField(${n.id}, 'name', this.value)" class="font-extrabold text-xs text-ink bg-transparent border-b border-dashed border-blush-300 focus:outline-none focus:border-berry" />
            </div>
            <button onclick="removePackageTier(${n.id})" class="text-[10px] font-bold text-rose-600 hover:text-rose-800 transition-colors p-1 cursor-pointer">
              &times; Remove
            </button>
          </div>
          <div class="grid grid-cols-3 gap-2 text-[10.5px]">
            <div>
              <label class="block text-[9.5px] font-bold text-ink-muted">Weight (Grams)</label>
              <input type="number" step="50" value="${n.grams}" onchange="updatePackageField(${n.id}, 'grams', parseFloat(this.value))" class="w-full px-2 py-1 rounded-lg bg-white border border-blush-200 text-ink font-bold focus:outline-none focus:ring-1 focus:ring-berry" />
            </div>
            <div>
              <label class="block text-[9.5px] font-bold text-ink-muted">Portions</label>
              <input type="text" value="${n.portions}" onchange="updatePackageField(${n.id}, 'portions', this.value)" class="w-full px-2 py-1 rounded-lg bg-white border border-blush-200 text-ink font-semibold focus:outline-none focus:ring-1 focus:ring-berry" />
            </div>
            <div>
              <label class="block text-[9.5px] font-bold text-ink-muted">Price (ETB)</label>
              <input type="number" step="50" value="${n.price}" onchange="updatePackageField(${n.id}, 'price', parseFloat(this.value))" class="w-full px-2 py-1 rounded-lg bg-white border border-blush-200 text-berry font-black focus:outline-none focus:ring-1 focus:ring-berry" />
            </div>
          </div>
        </div>
      `).join("");const o=document.getElementById("settings-bell-btn");o&&(o.textContent=state.kitchenBell?"Bell ON":"Bell OFF",o.className=state.kitchenBell?"px-3 py-1 rounded-full text-xs font-extrabold btn-berry text-white cursor-pointer":"px-3 py-1 rounded-full text-xs font-extrabold bg-blush-100 text-ink cursor-pointer")}function updatePackageField(t,e,o){ensurePackagesState();const n=state.basicPackages.find(s=>s.id===t);n&&(n[e]=o,saveState())}function addNewPackageTier(){ensurePackagesState();const t=Date.now();state.basicPackages.push({id:t,name:"New Custom Tier ("+(state.basicPackages.length+1)+")",grams:1e3,portions:"8-10 people",price:3e3,popular:!1}),saveState(),renderAdminPackages(),showAdminToast("\u2713 Added new package size tier")}function removePackageTier(t){ensurePackagesState(),state.basicPackages=state.basicPackages.filter(e=>e.id!==t),saveState(),renderAdminPackages(),showAdminToast("Package tier removed")}function saveAdminPackages(){saveState(),syncAll()}async function exportOrdersBackupJson(){try{let t=Array.isArray(state.orders)?[...state.orders]:[];if(window.FirebaseService&&typeof window.FirebaseService.getOrders=="function")try{const r=await window.FirebaseService.getOrders();Array.isArray(r)&&r.length&&(t=r)}catch{}const o=`MAK-CAKE-Orders-Backup-${new Date().toISOString().slice(0,10)}.json`,n={exportedAt:new Date().toISOString(),account:window.FirebaseService?.getCurrentUser?.()?.email||"local",ordersCount:t.length,orders:t,shop:state.shop||{}},s=new Blob([JSON.stringify(n,null,2)],{type:"application/json"}),a=URL.createObjectURL(s),i=document.createElement("a");i.href=a,i.download=o,document.body.appendChild(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(a),1e3),typeof showAdminToast=="function"&&showAdminToast(`\u2713 Backup generated: ${o} (${n.ordersCount} orders)`)}catch(t){typeof showAdminToast=="function"&&showAdminToast(`Backup failed: ${t&&t.message?t.message:"Error"}`,"error")}}let _isDeletingAllOrders=!1;function openDeleteAllOrdersModal(){const t=window.FirebaseService&&typeof window.FirebaseService.getCurrentUser=="function"?window.FirebaseService.getCurrentUser():null;if(!isAuthorizedAdminUser(t)){typeof showAdminToast=="function"&&showAdminToast("Authorized business owner sign-in required","error");return}const e=document.getElementById("delete-all-orders-modal"),o=document.getElementById("del-orders-password"),n=document.getElementById("del-orders-confirm-text"),s=document.getElementById("del-orders-error"),a=document.getElementById("del-orders-submit-btn");o&&(o.value=""),n&&(n.value=""),s&&(s.classList.add("hidden"),s.textContent=""),a&&(a.disabled=!1,a.textContent="Permanently Delete All Orders"),e&&e.classList.remove("hidden")}function closeDeleteAllOrdersModal(){if(_isDeletingAllOrders)return;const t=document.getElementById("delete-all-orders-modal");t&&t.classList.add("hidden")}async function executeDeleteAllOrders(){if(_isDeletingAllOrders)return;const t=document.getElementById("del-orders-error"),e=document.getElementById("del-orders-password"),o=document.getElementById("del-orders-confirm-text"),n=document.getElementById("del-orders-submit-btn"),s=l=>{t&&(t.textContent=l,t.classList.remove("hidden"))},a=window.FirebaseService&&typeof window.FirebaseService.getCurrentUser=="function"?window.FirebaseService.getCurrentUser():null;if(!isAuthorizedAdminUser(a)){s("Unauthorized: Only the authenticated business owner can delete orders.");return}const i=e?e.value:"",r=o?o.value.trim():"";if(!i){s("Please enter your current account password.");return}if(r!=="DELETE ALL ORDERS"){s("Please type DELETE ALL ORDERS exactly to confirm.");return}_isDeletingAllOrders=!0,t&&t.classList.add("hidden"),n&&(n.disabled=!0,n.textContent="Deleting...");try{await window.FirebaseService.reauthenticateWithPassword(i);const l=await window.FirebaseService.deleteAllOrdersForAccount();state.orders=[],typeof adminNotifications<"u"&&(adminNotifications=[]),saveState();try{localStorage.removeItem(CUSTOMER_ORDERS_KEY)}catch{}typeof invalidateAdminTabCache=="function"&&invalidateAdminTabCache(),typeof renderAdminNotifications=="function"&&renderAdminNotifications(),typeof renderAdminOverview=="function"&&renderAdminOverview(),typeof renderAdminOrders=="function"&&renderAdminOrders(),typeof renderAdminAnalytics=="function"&&renderAdminAnalytics(),_isDeletingAllOrders=!1,closeDeleteAllOrdersModal(),typeof showAdminToast=="function"&&showAdminToast(`\u2713 Permanently deleted ${l.deletedOrdersCount} orders`)}catch(l){_isDeletingAllOrders=!1,n&&(n.disabled=!1,n.textContent="Permanently Delete All Orders");const c=l&&l.code?l.code:"";s(c==="auth/wrong-password"||c==="auth/invalid-credential"||c==="auth/invalid-login-credentials"?"Incorrect account password. Deletion aborted.":c==="auth/too-many-requests"?"Too many failed attempts. Please wait a moment and try again.":l&&l.message?l.message:"Deletion failed. Please check your connection.")}}async function runDevDemoReset(){const t=window.FirebaseService&&typeof window.FirebaseService.getCurrentUser=="function"?window.FirebaseService.getCurrentUser():null;if(!isAuthorizedAdminUser(t)){typeof showAdminToast=="function"&&showAdminToast("Authorized administrator sign-in required","error");return}if(!confirm("Delete ONLY demo-marked records (isDemo: true)? Real customer orders and payments will NOT be touched."))return;let e=0;if(window.FirebaseService&&typeof window.FirebaseService.deleteDemoOrders=="function")try{const o=await window.FirebaseService.deleteDemoOrders();e=o&&o.deleted?o.deleted:0}catch(o){console.warn("Dev demo reset cloud notice:",o)}state.orders=(state.orders||[]).filter(o=>o&&o.isDemo!==!0),saveState(),syncAll(),typeof showAdminToast=="function"&&showAdminToast(`\u2713 Demo reset complete (${e} demo records removed; real orders preserved)`)}function handleBannerUpload(t,e){if(e.files&&e.files[0]){const o=e.files[0],n=new FileReader;n.onload=function(s){updateBannerData(t,"img",s.target.result)},n.readAsDataURL(o)}}function updateBannerData(t,e,o){const n=getAdminBanners();n[t]&&(n[t][e]=o,saveState(),renderAdminHero(),renderAdminShop(),showAdminToast("\u2713 Homepage banner updated live!"))}function removeBanner(t){const e=getAdminBanners();if(e.length<=1){alert("You must keep at least 1 advertisement banner on the homepage slider.");return}e.splice(t,1),saveState(),renderAdminHero(),renderAdminShop(),showAdminToast("Banner removed from slider")}function addEmptyBanner(){const t=getAdminBanners();if(t.length>=3){alert("Maximum of 3 advertisement banners supported on homepage slider.");return}t.push({id:Date.now(),top:"New Promotion",script:"Special",sub:"Celebration bakery cake promotion",cta:"Order Now",link:"products",img:"https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=700&q=85"}),saveState(),renderAdminHero(),renderAdminShop(),showAdminToast("\u2713 Added new advertisement banner slot")}function renderAdvertisementBannersSection(){const t=getAdminBanners();return`
        <div id="shop-sec-ads" class="bg-white rounded-[22px] p-4 shadow-rose border border-white space-y-3">
          <div class="flex items-center justify-between border-b border-blush-100 pb-2">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-lg bg-blush-100 text-berry flex items-center justify-center font-bold text-xs">6</div>
              <div>
                <h3 class="text-xs font-black text-ink">Homepage Advertisement Banners</h3>
                <p class="text-[9.5px] text-ink-muted">Connected to the 3-image slider in middle of Admin Home (3-sec cycle)</p>
              </div>
            </div>
            ${t.length<3?`
              <button type="button" onclick="addEmptyBanner()" class="px-2.5 py-1 rounded-full btn-berry text-white text-[10px] font-bold shadow-rose-sm cursor-pointer">
                + Add Banner
              </button>
            `:`
              <span class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">3/3 Active</span>
            `}
          </div>

          <div class="space-y-3">
            ${t.map((e,o)=>`
              <div class="p-3 rounded-2xl bg-blush-50 border border-blush-200/80 space-y-2.5">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="w-5 h-5 rounded-full bg-berry text-white text-[10px] font-black flex items-center justify-center">${o+1}</span>
                    <span class="text-xs font-black text-ink">Banner Slide ${o+1}</span>
                  </div>
                  <button type="button" onclick="removeBanner(${o})" class="text-[10px] font-bold text-rose-600 hover:text-rose-800 cursor-pointer">
                    &times; Remove
                  </button>
                </div>

                <!-- Live Preview & Upload Row -->
                <div class="flex items-center gap-3">
                  <img src="${e.img}" alt="Banner ${o+1}" class="w-16 h-12 rounded-xl object-cover border border-blush-200 shadow-rose-sm bg-white shrink-0" onerror="this.src=SVG_CAKE_FALLBACK" />
                  <div class="flex-1 min-w-0 space-y-1">
                    <input type="file" id="banner-file-input-${o}" accept="image/*" class="hidden" onchange="handleBannerUpload(${o}, this)" />
                    <button type="button" onclick="document.getElementById('banner-file-input-${o}').click()" class="px-2.5 py-1 rounded-lg bg-white border border-blush-200 hover:bg-blush-100 text-berry font-bold text-[10px] flex items-center gap-1 shadow-2xs cursor-pointer">
                      <span>\u{1F4F8} Upload Image</span>
                    </button>
                    <input type="text" value="${e.img}" placeholder="Or paste image URL..." onchange="updateBannerData(${o}, 'img', this.value)" class="w-full px-2 py-1 rounded-lg bg-white border border-blush-200 text-ink text-[10px] focus:outline-none focus:ring-1 focus:ring-berry" />
                  </div>
                </div>

                <!-- Text & Link Inputs -->
                <div class="grid grid-cols-2 gap-2 text-[10.5px]">
                  <div>
                    <label class="block text-[9.5px] font-bold text-ink-muted mb-0.5">Headline</label>
                    <input type="text" value="${e.top||""}" onchange="updateBannerData(${o}, 'top', this.value)" placeholder="e.g. Fresh Daily Addis" class="w-full px-2 py-1 rounded-lg bg-white border border-blush-200 text-ink font-semibold focus:outline-none focus:ring-1 focus:ring-berry" />
                  </div>
                  <div>
                    <label class="block text-[9.5px] font-bold text-ink-muted mb-0.5">Calligraphy Script</label>
                    <input type="text" value="${e.script||""}" onchange="updateBannerData(${o}, 'script', this.value)" placeholder="e.g. Mini Bento" class="w-full px-2 py-1 rounded-lg bg-white border border-blush-200 text-ink font-semibold focus:outline-none focus:ring-1 focus:ring-berry" />
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-2 text-[10.5px]">
                  <div>
                    <label class="block text-[9.5px] font-bold text-ink-muted mb-0.5">Subtitle</label>
                    <input type="text" value="${e.sub||""}" onchange="updateBannerData(${o}, 'sub', this.value)" placeholder="e.g. Same-day chilled delivery in Bole" class="w-full px-2 py-1 rounded-lg bg-white border border-blush-200 text-ink text-[10px] focus:outline-none focus:ring-1 focus:ring-berry" />
                  </div>
                  <div>
                    <label class="block text-[9.5px] font-bold text-ink-muted mb-0.5">Optional Link / Destination</label>
                    <input type="text" value="${e.link||"products"}" onchange="updateBannerData(${o}, 'link', this.value)" placeholder="e.g. products, or custom URL" class="w-full px-2 py-1 rounded-lg bg-white border border-blush-200 text-berry font-bold text-[10px] focus:outline-none focus:ring-1 focus:ring-berry" />
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `}function toggleAddCustomPaymentForm(t){const e=document.getElementById("sm-add-custom-pay-box");e&&(typeof t=="boolean"?e.classList.toggle("hidden",!t):e.classList.toggle("hidden"))}function addCustomShopPaymentMethod(){collectCurrentShopTabInputs();const t=(document.getElementById("sm-new-pay-name")?.value||"").trim(),e=document.getElementById("sm-new-pay-type")?.value||"Bank Transfer",o=(document.getElementById("sm-new-pay-holder")?.value||"").trim(),n=(document.getElementById("sm-new-pay-num")?.value||"").trim(),s=(document.getElementById("sm-new-pay-inst")?.value||"").trim();if(!t||!n){typeof showAdminToast=="function"&&showAdminToast("Bank/Wallet name and account number are required");return}shopMgmtState.payments.customMethods=Array.isArray(shopMgmtState.payments.customMethods)?shopMgmtState.payments.customMethods:[],shopMgmtState.payments.customMethods.push({id:"pay-custom-"+Date.now(),name:t,type:e,accountHolder:o||"MAK Cake Bakery",accountNumber:n,instructions:s,enabled:!0}),renderAdminShop(),typeof showAdminToast=="function"&&showAdminToast("Added "+t+" \u2014 tap Save to persist")}function removeCustomShopPaymentMethod(t){collectCurrentShopTabInputs(),Array.isArray(shopMgmtState.payments.customMethods)&&(shopMgmtState.payments.customMethods.splice(t,1),renderAdminShop())}async function syncSettingsToCloud(){if(window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.saveSettings=="function")try{await window.FirebaseService.saveSettings(state.shop)}catch(t){console.warn("Cloud settings sync failed:",t),typeof showAdminToast=="function"&&showAdminToast("Cloud settings save failed: "+(t&&t.message?t.message:"Error"),"error")}}function syncAllCategoryDropdowns(){[{id:"cake-form-cat",items:typeof getProductCategories=="function"?getProductCategories(!1).map(e=>e.id):["Normal","Special","Cupples","Mini Cakes"]},{id:"new-cr-cat",items:typeof getCreationCategories=="function"?getCreationCategories().map(e=>e.name):SEED_CREATION_CATEGORIES},{id:"admin-dec-form-cat",items:typeof getDecorationCategories=="function"?getDecorationCategories().map(e=>e.id):DECORATION_CATEGORIES.map(e=>e.id)}].forEach(({id:e,items:o})=>{const n=document.getElementById(e);if(!n)return;const s=n.value;n.innerHTML="",o.forEach(i=>{const r=document.createElement("option");r.value=i,r.textContent=i,n.appendChild(r)});const a=document.createElement("option");a.value="__add_new__",a.textContent="+ Add New Category...",n.appendChild(a),s&&o.includes(s)&&(n.value=s)})}function syncCustomCategoryOptions(){syncAllCategoryDropdowns()}let adminCatScope="product";function setAdminCategoryScope(t){adminCatScope=t,renderAdminCategoryManager()}async function ensureCategoriesSeededInCloud(){if(window.MAK_ENABLE_FIRESTORE_ORDER_SYNC!==!0||!window.FirebaseService||state.shop&&state.shop.categoriesSeeded===!0)return;const t=Array.isArray(state.categories)&&state.categories.length?state.categories:getDefaultCategoriesSeed();if(typeof window.FirebaseService.saveCategory=="function")for(const e of t)await window.FirebaseService.saveCategory(e);state.shop||(state.shop={}),state.shop.categoriesSeeded=!0,typeof window.FirebaseService.saveSettings=="function"&&await window.FirebaseService.saveSettings({categoriesSeeded:!0})}function getItemsCountForCategory(t,e){return t==="product"?(state.cakes||[]).filter(o=>o.category===e).length:t==="decoration"?(state.decorations||[]).filter(o=>o.category===e).length:t==="creation"?(state.creations||[]).filter(o=>o.category===e).length:0}function renderAdminCategoryManager(){const t=document.getElementById("admin-subview-categories");if(!t)return;(!Array.isArray(state.categories)||!state.categories.length)&&(state.categories=getDefaultCategoriesSeed());const e=state.categories.filter(n=>n&&n.scope===adminCatScope),o=[{id:"product",label:"Products"},{id:"decoration",label:"Decorations"},{id:"creation",label:"Recent Photos"}];t.innerHTML=`
    <div class="flex items-center justify-between gap-2">
      <div>
        <h2 class="font-extrabold text-[15px] text-ink">Category Manager</h2>
        <p class="text-[10.5px] text-ink-muted">${e.length} categories \u2022 Syncs live to Storefront &amp; Dropdowns</p>
      </div>
      <button type="button" onclick="addDynamicCategoryFromManager()" class="px-3.5 py-2 rounded-full btn-berry text-white text-xs font-bold shadow-rose-sm active:scale-95 transition-transform shrink-0 cursor-pointer">
        + Add Category
      </button>
    </div>

    <div class="flex gap-1.5 bg-white p-1 rounded-full shadow-rose-sm border border-blush-200">
      ${o.map(n=>`
        <button type="button" onclick="setAdminCategoryScope('${n.id}')" class="flex-1 py-1.5 rounded-full text-[10.5px] font-extrabold transition-all cursor-pointer ${adminCatScope===n.id?"btn-berry text-white shadow-rose-sm":"text-ink-muted hover:text-ink"}">
          ${n.label}
        </button>
      `).join("")}
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">
      ${e.length?e.map(n=>{const s=getItemsCountForCategory(n.scope,n.name),a=String(n.id).replace(/'/g,"\\'");return`
          <div class="bg-white rounded-[18px] p-3 shadow-rose-sm border border-white flex items-center gap-3 min-w-0">
            <div class="relative w-12 h-12 rounded-xl overflow-hidden bg-blush-100 border border-blush-200 shrink-0 flex items-center justify-center">
              ${n.img?`<img src="${n.img}" alt="${n.name}" class="w-full h-full object-cover" />`:getLuxurySvg(n.svgKey||"normal","w-5 h-5 text-berry")}
              <button type="button" onclick="document.getElementById('cat-img-${n.id}').click()" title="Change Category Photo" class="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full btn-berry text-white flex items-center justify-center shadow-xs cursor-pointer text-[9px]">\u{1F4F7}</button>
              <input type="file" id="cat-img-${n.id}" accept="image/png,image/jpeg,image/webp,image/jpg" onchange="uploadCategoryImage('${a}', this)" class="hidden" />
            </div>
            <div class="min-w-0 flex-1">
              <div class="text-xs font-extrabold text-ink truncate">${n.name}</div>
              <div class="text-[10px] text-ink-muted font-semibold">${s} ${s===1?"item":"items"} assigned</div>
            </div>
            <div class="flex items-center gap-1.5 shrink-0">
              <button type="button" onclick="renameDynamicCategory('${a}')" title="Edit Category Name" class="px-2.5 h-8 rounded-xl bg-berry text-white text-[10.5px] font-bold shadow-rose-sm active:scale-95 transition-all flex items-center gap-1 cursor-pointer">
                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                <span>Edit</span>
              </button>
              <button type="button" onclick="deleteDynamicCategory('${a}')" class="w-8 h-8 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-berry flex items-center justify-center transition-colors cursor-pointer" title="Delete Category">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
        `}).join(""):'<div class="bg-white rounded-[18px] p-5 text-center text-xs text-ink-muted shadow-rose-sm md:col-span-2">No categories in this section yet.</div>'}
    </div>
  `}async function createAndSaveCategory(t,e){const o=String(e||"").trim().slice(0,40);if(!o)return null;(!Array.isArray(state.categories)||!state.categories.length)&&(state.categories=getDefaultCategoriesSeed());const n=state.categories.find(a=>a.scope===t&&a.name.toLowerCase()===o.toLowerCase());if(n)return n;const s={id:slugCategoryId(t,o),name:o,scope:t,svgKey:t==="decoration"?"sparkles":"normal",img:"",customImg:!1,sortOrder:state.categories.length+1,active:!0,createdAt:new Date().toISOString()};return window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.saveCategory=="function"&&(await ensureCategoriesSeededInCloud(),await window.FirebaseService.saveCategory(s)),state.categories.push(s),saveState(),syncAllCategoryDropdowns(),renderAdminCategoryManager(),syncAll(),s}async function addDynamicCategoryFromManager(){const t=window.prompt(`Enter new ${adminCatScope} category name:`);if(!(!t||!t.trim()))try{showAdminToast("Saving category to Firebase...");const e=await createAndSaveCategory(adminCatScope,t.trim());e&&showAdminToast(`\u2713 Category "${e.name}" synced everywhere!`)}catch(e){showAdminToast("Failed to add category: "+(e&&e.message?e.message:"Error"),"error")}}async function renameDynamicCategory(t){const e=(state.categories||[]).find(a=>String(a.id)===String(t));if(!e)return;const o=e.name,n=window.prompt(`Rename category "${o}" to:`,o);if(!n||!n.trim()||n.trim()===o)return;const s=n.trim().slice(0,40);try{if(showAdminToast("Renaming category across catalog..."),window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&(await ensureCategoriesSeededInCloud(),await window.FirebaseService.saveCategory({...e,name:s})),e.name=s,e.scope==="product")for(const a of state.cakes||[])a.category===o&&(a.category=s,window.FirebaseService?.saveProduct&&await window.FirebaseService.saveProduct(a));else if(e.scope==="decoration")for(const a of state.decorations||[])a.category===o&&(a.category=s,window.FirebaseService?.saveDecoration&&await window.FirebaseService.saveDecoration(a));else if(e.scope==="creation")for(const a of state.creations||[])a.category===o&&(a.category=s,window.FirebaseService?.saveCreation&&await window.FirebaseService.saveCreation(a));saveState(),syncAllCategoryDropdowns(),renderAdminCategoryManager(),syncAll(),showAdminToast(`\u2713 Renamed "${o}" \u2192 "${s}" everywhere!`)}catch(a){showAdminToast("Rename failed: "+(a&&a.message?a.message:"Error"),"error")}}async function uploadCategoryImage(t,e){const o=e.files&&e.files[0];if(!o)return;const n=(state.categories||[]).find(s=>String(s.id)===String(t));if(n){try{showAdminToast("Compressing & saving category photo...");const s=await compressImageFileToCanvas(o,400,.8),a={...n,img:s.dataUrl,customImg:!0};window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&(await ensureCategoriesSeededInCloud(),await window.FirebaseService.saveCategory(a)),n.img=s.dataUrl,n.customImg=!0,saveState(),renderAdminCategoryManager(),syncAll(),showAdminToast(`\u2713 Updated photo for "${n.name}"`)}catch(s){showAdminToast("Photo upload failed: "+(s&&s.message?s.message:"Error"),"error")}e.value=""}}async function deleteDynamicCategory(t){const e=(state.categories||[]).find(a=>String(a.id)===String(t));if(!e)return;const o=(state.categories||[]).filter(a=>a.scope===e.scope&&String(a.id)!==String(t)),n=getItemsCountForCategory(e.scope,e.name);if(n>0&&!o.length){showAdminToast("Cannot delete the only category while items are assigned to it.","error");return}let s=null;if(n>0){const a=o.map(l=>l.name).join(", "),i=window.prompt(`\u26A0\uFE0F WARNING: ${n} item(s) are assigned to "${e.name}".
Products will NOT be deleted.

Type the category name to reassign them to:
(${a})`,o[0].name);if(!i||!i.trim())return;const r=o.find(l=>l.name.toLowerCase()===i.trim().toLowerCase());if(!r){showAdminToast(`Invalid category "${i}". Deletion cancelled.`,"error");return}s=r.name}else if(!window.confirm(`Delete category "${e.name}"?`))return;try{if(showAdminToast("Updating category & catalog..."),window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&await ensureCategoriesSeededInCloud(),n>0&&s){if(e.scope==="product")for(const a of state.cakes||[])a.category===e.name&&(a.category=s,window.FirebaseService?.saveProduct&&await window.FirebaseService.saveProduct(a));else if(e.scope==="decoration")for(const a of state.decorations||[])a.category===e.name&&(a.category=s,window.FirebaseService?.saveDecoration&&await window.FirebaseService.saveDecoration(a));else if(e.scope==="creation")for(const a of state.creations||[])a.category===e.name&&(a.category=s,window.FirebaseService?.saveCreation&&await window.FirebaseService.saveCreation(a))}window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService?.deleteCategory&&await window.FirebaseService.deleteCategory(e.id),state.categories=(state.categories||[]).filter(a=>String(a.id)!==String(e.id)),saveState(),syncAllCategoryDropdowns(),renderAdminCategoryManager(),syncAll(),showAdminToast(s?`\u2713 Deleted "${e.name}" & moved ${n} items to "${s}"`:`\u2713 Deleted "${e.name}"`)}catch(a){showAdminToast("Delete failed: "+(a&&a.message?a.message:"Error"),"error")}}async function promptAndAddCustomCategory(t,e){const n={cakes:"product",decorations:"decoration",creations:"creation"}[t]||"product",s=document.getElementById(e),a=window.prompt("Enter new category name:");if(!a||!a.trim()){s&&s.value==="__add_new__"&&s.options.length>0&&(s.selectedIndex=0);return}try{showAdminToast("Adding category to Firebase...");const i=await createAndSaveCategory(n,a.trim());i&&s&&(s.value=i.name),i&&showAdminToast(`\u2713 Added "${i.name}" everywhere!`)}catch(i){showAdminToast("Failed to add category: "+(i&&i.message?i.message:"Error"),"error")}}function saveBusinessProfile(){ensureShopState();const t=(document.getElementById("shop-prof-name")?.value||"").trim(),e=(document.getElementById("shop-prof-phone")?.value||"").trim(),o=(document.getElementById("shop-prof-loc")?.value||"").trim(),n=(document.getElementById("shop-prof-addr")?.value||"").trim(),s=(document.getElementById("shop-prof-desc")?.value||"").trim();if(!t){showAdminToast("\u26A0\uFE0F Please enter business name");return}state.shop.businessName=t,state.shop.businessPhone=e||state.shop.businessPhone,state.shop.businessLocation=o||state.shop.businessLocation,state.shop.businessAddress=n||state.shop.businessAddress,state.shop.businessDesc=s||state.shop.businessDesc,saveState(),syncAll(),syncSettingsToCloud(),showAdminToast(`Business Profile saved: "${t}" live!`),showCustomerToast(`Bakery info updated: ${t}`)}function toggleDeliverySetting(t){ensureShopState(),state.shop[t]=!state.shop[t],saveState(),syncAll(),showAdminToast(`${t==="deliveryEnabled"?"Delivery":"Pickup"} ${state.shop[t]?"Enabled":"Disabled"}`)}function adjustDeliveryFee(t){ensureShopState(),state.shop.deliveryFee=Math.max(0,(state.shop.deliveryFee||0)+t),saveState(),syncAll(),showAdminToast(`Delivery Fee: ${fmtETB(state.shop.deliveryFee)}`)}function saveDeliverySettings(){ensureShopState();const t=parseInt(document.getElementById("shop-del-fee")?.value||"150",10),e=parseInt(document.getElementById("shop-del-min")?.value||"500",10),o=(document.getElementById("shop-del-areas")?.value||"").trim(),n=(document.getElementById("shop-del-inst")?.value||"").trim();state.shop.deliveryFee=isNaN(t)?150:t,state.shop.minOrderAmount=isNaN(e)?500:e,state.shop.deliveryAreas=o||state.shop.deliveryAreas,state.shop.deliveryInstructions=n||state.shop.deliveryInstructions,saveState(),syncAll(),syncSettingsToCloud(),showAdminToast(`Delivery settings saved (${fmtETB(state.shop.deliveryFee)})`)}function togglePaymentMethod(t){ensureShopState(),state.shop.paymentMethods[t]&&(state.shop.paymentMethods[t].enabled=!state.shop.paymentMethods[t].enabled,saveState(),syncAll(),showAdminToast(`${state.shop.paymentMethods[t].name} ${state.shop.paymentMethods[t].enabled?"Enabled":"Disabled"}`))}function savePaymentMethods(){ensureShopState();const t=document.getElementById("shop-pay-tele-name")?.value.trim(),e=document.getElementById("shop-pay-tele-num")?.value.trim(),o=document.getElementById("shop-pay-tele-inst")?.value.trim(),n=document.getElementById("shop-pay-cbe-name")?.value.trim(),s=document.getElementById("shop-pay-cbe-num")?.value.trim(),a=document.getElementById("shop-pay-cbe-inst")?.value.trim(),i=document.getElementById("shop-pay-cod-inst")?.value.trim();t&&(state.shop.paymentMethods.telebirr.accountName=t),e&&(state.shop.paymentMethods.telebirr.accountNumber=e),o&&(state.shop.paymentMethods.telebirr.instructions=o),n&&(state.shop.paymentMethods.cbe.accountName=n),s&&(state.shop.paymentMethods.cbe.accountNumber=s),a&&(state.shop.paymentMethods.cbe.instructions=a),i&&(state.shop.paymentMethods.cod.instructions=i),saveState(),syncAll(),syncSettingsToCloud(),showAdminToast("Payment methods & account details updated live!")}function toggleShopOpenStatus(){ensureShopState(),state.shop.isOpen=!state.shop.isOpen,saveState(),syncAll(),syncSettingsToCloud(),showAdminToast(state.shop.isOpen?"Bakery is now Open (8 AM \u2013 9 PM)":"Bakery set to Pre-Order Only"),showCustomerToast(state.shop.isOpen?"MAK CAKE is now Open":"Pre-Order Mode active")}function saveOrderPreferences(){ensureShopState();const t=document.getElementById("shop-ord-enabled")?.value==="true",e=parseInt(document.getElementById("shop-ord-lead")?.value||"4",10),o=(document.getElementById("shop-ord-inst")?.value||"").trim();state.shop.orderingEnabled=t,state.shop.leadTimeHours=isNaN(e)?4:e,state.shop.orderInstructions=o||state.shop.orderInstructions,saveState(),syncAll(),showAdminToast("Order preferences saved live!")}function saveWebsiteAppearance(){ensureShopState();const t=(document.getElementById("shop-app-announcement")?.value||"").trim(),e=(document.getElementById("shop-app-title")?.value||"").trim(),o=(document.getElementById("shop-app-sub")?.value||"").trim();t&&(state.shop.announcementText=t),e&&(state.shop.heroBannerTitle=e),o&&(state.shop.heroBannerSubtitle=o),saveState(),syncAll(),showAdminToast("Website appearance updated on customer storefront!"),showCustomerToast("Storefront banner refreshed")}function toggleRewardBoxEnabled(){typeof requirePackageFeature=="function"&&!requirePackageFeature("rewardBox","Mystery Reward Box")||(ensureShopState(),state.shop.rewardBox.enabled=!state.shop.rewardBox.enabled,saveState(),syncAll(),showAdminToast(`Reward Box ${state.shop.rewardBox.enabled?"Enabled":"Disabled"}`))}function addPromoCode(){if(typeof requirePackageFeature=="function"&&!requirePackageFeature("rewardBox","Promo Codes & Reward Box"))return;ensureShopState();const t=(document.getElementById("new-promo-code")?.value||"").trim().toUpperCase(),e=parseInt(document.getElementById("new-promo-disc")?.value||"10",10),o=document.getElementById("new-promo-type")?.value||"percent",n=(document.getElementById("new-promo-desc")?.value||"").trim();if(!t){showAdminToast("\u26A0\uFE0F Please enter promo code name");return}if(isNaN(e)||e<=0){showAdminToast("\u26A0\uFE0F Please enter valid discount amount");return}state.shop.rewardBox.promoCodes.unshift({id:"p-"+Date.now(),code:t,discount:e,type:o,desc:n||(o==="percent"?e+"% off orders":fmtETB(e)+" off orders"),active:!0,usedCount:0}),saveState(),syncAll(),showAdminToast(`Promo Code "${t}" activated!`),showCustomerToast(`New promo code ${t} available!`)}function togglePromoCode(t){ensureShopState();const e=state.shop.rewardBox.promoCodes.find(o=>o.id===t);e&&(e.active=!e.active,saveState(),syncAll(),showAdminToast(`Promo "${e.code}" ${e.active?"Activated":"Disabled"}`))}function deletePromoCode(t){ensureShopState();const e=state.shop.rewardBox.promoCodes.find(o=>o.id===t);e&&confirm(`Remove promo code "${e.code}"?`)&&(state.shop.rewardBox.promoCodes=state.shop.rewardBox.promoCodes.filter(o=>o.id!==t),saveState(),syncAll(),showAdminToast(`Removed promo code "${e.code}"`))}function addHomepageAd(){ensureShopState();const t=(document.getElementById("new-ad-title")?.value||"").trim(),e=(document.getElementById("new-ad-desc")?.value||"").trim(),o=(document.getElementById("new-ad-link")?.value||"").trim(),n=(document.getElementById("new-ad-img")?.value||"").trim()||"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80";if(!t){showAdminToast("\u26A0\uFE0F Please enter advertisement title");return}state.shop.ads.unshift({id:Date.now(),title:t,desc:e||"Same-day luxury cake delivery in Addis Ababa",link:o||"Order Now",img:n,active:!0}),saveState(),syncAll(),showAdminToast(`Published Ad: "${t}" live!`),showCustomerToast(`Featured: ${t}`)}function toggleHomepageAd(t){ensureShopState();const e=state.shop.ads.find(o=>o.id===t);e&&(e.active=!e.active,saveState(),syncAll(),showAdminToast(`Ad "${e.title}" ${e.active?"Activated":"Deactivated"}`))}function deleteHomepageAd(t){ensureShopState();const e=state.shop.ads.find(o=>o.id===t);e&&confirm(`Delete advertisement "${e.title}"?`)&&(state.shop.ads=state.shop.ads.filter(o=>o.id!==t),saveState(),syncAll(),showAdminToast(`Deleted advertisement "${e.title}"`))}function addManagerAccount(){if(typeof requirePackageFeature=="function"&&!requirePackageFeature("staffManagers","Additional Staff & Manager Accounts"))return;ensureShopState();const t=typeof getPackageLimit=="function"?getPackageLimit("staffLimit"):1;if((state.shop.managers||[]).length+1>=t){showAdminToast(`\u{1F512} Staff limit (${t}) reached on your current plan. Upgrade to add more managers.`,"error");return}const e=(document.getElementById("new-mgr-name")?.value||"").trim(),o=(document.getElementById("new-mgr-phone")?.value||"").trim(),n=(document.getElementById("new-mgr-role")?.value||"").trim(),s=document.getElementById("new-mgr-perm")?.value||"Orders & Inventory";if(!e){showAdminToast("\u26A0\uFE0F Please enter manager name");return}state.shop.managers.push({id:Date.now(),name:e,phone:o||"0900 00 00 00",role:n||"Kitchen Staff",permissions:s,active:!0}),saveState(),syncAll(),showAdminToast(`Manager "${e}" authorized (${s})!`)}function toggleManagerAccount(t){ensureShopState();const e=state.shop.managers.find(o=>o.id===t);e&&(e.active=!e.active,saveState(),syncAll(),showAdminToast(`Manager "${e.name}" ${e.active?"Activated":"Deactivated"}`))}function deleteManagerAccount(t){ensureShopState();const e=state.shop.managers.find(o=>o.id===t);e&&confirm(`Remove manager account for "${e.name}"?`)&&(state.shop.managers=state.shop.managers.filter(o=>o.id!==t),saveState(),syncAll(),showAdminToast(`Removed manager "${e.name}"`))}function updateAccountPasscode(){ensureShopState();const t=(document.getElementById("shop-sec-curr-pin")?.value||"").trim(),e=(document.getElementById("shop-sec-new-pin")?.value||"").trim(),o=(document.getElementById("shop-sec-conf-pin")?.value||"").trim();if(t!==state.shop.passcode){showAdminToast("\u26A0\uFE0F Current passcode is incorrect (default: 1234)");return}if(!e||e.length<4){showAdminToast("\u26A0\uFE0F New passcode must be at least 4 digits");return}if(e!==o){showAdminToast("\u26A0\uFE0F New passcodes do not match");return}state.shop.passcode=e,state.shop.lastPasscodeChange="Just now",saveState(),syncAll(),document.getElementById("shop-sec-curr-pin").value="",document.getElementById("shop-sec-new-pin").value="",document.getElementById("shop-sec-conf-pin").value="",showAdminToast("Security passcode updated successfully!")}function adminSecureLogout(){confirm("Log out of MAK CAKE Admin App?")&&(showAdminToast("Admin signed out safely."),switchWorkspaceMode("single-cust"),setTimeout(()=>{switchWorkspaceMode("dual"),switchAdminTab("overview")},1200))}adminShopSection="business";let shopMgmtState={business:{name:"MAK CAKE",logo:"./images/mak-cake-logo.webp",description:"Handcrafted luxury cakes, romantic bento duos, and celebration confections freshly baked in Addis Ababa.",phone:"0911 23 45 67",email:"hello@makcake.et",address:"Cameroon Street, Bole Sub-City, Addis Ababa, Ethiopia",googleMapsUrl:"https://maps.google.com/?q=9.0054,38.7885"},workingHours:{monday:{open:"08:00",close:"20:00",isOpen:!0,breakEnabled:!1,breakStart:"13:00",breakEnd:"14:00"},tuesday:{open:"08:00",close:"20:00",isOpen:!0,breakEnabled:!1,breakStart:"13:00",breakEnd:"14:00"},wednesday:{open:"08:00",close:"20:00",isOpen:!0,breakEnabled:!1,breakStart:"13:00",breakEnd:"14:00"},thursday:{open:"08:00",close:"20:00",isOpen:!0,breakEnabled:!1,breakStart:"13:00",breakEnd:"14:00"},friday:{open:"08:00",close:"20:30",isOpen:!0,breakEnabled:!1,breakStart:"13:00",breakEnd:"14:00"},saturday:{open:"08:00",close:"21:00",isOpen:!0,breakEnabled:!1,breakStart:"13:00",breakEnd:"14:00"},sunday:{open:"09:00",close:"19:00",isOpen:!0,breakEnabled:!1,breakStart:"13:00",breakEnd:"14:00"}},tempClosure:{enabled:!1,reopenAt:"",reason:""},location:{lat:9.0054,lng:38.7885,address:"Cameroon Street, Bole Sub-City, Addis Ababa, Ethiopia",googleMapsUrl:"https://maps.google.com/?q=9.0054,38.7885"},delivery:{deliveryEnabled:!0,deliveryFee:150,deliveryAreas:"Bole, CMC, Kazanchis, Old Airport, Sarbet, Piassa, Summit",minOrderAmount:500,pickupEnabled:!0,deliveryInstructions:"Same-day delivery chilled in insulated carrier boxes with real-time driver tracking."},payments:{cbe:{name:"Commercial Bank of Ethiopia (CBE)",enabled:!0,accountHolder:SHOP_SETTINGS_CONFIG.cbeHolder,accountNumber:SHOP_SETTINGS_CONFIG.cbeAccount,instructions:"Transfer to CBE and upload receipt."},telebirr:{name:"Telebirr",enabled:!0,accountHolder:SHOP_SETTINGS_CONFIG.telebirrHolder,accountNumber:SHOP_SETTINGS_CONFIG.telebirrNumber,instructions:"Transfer via Telebirr app and upload screenshot."},cod:{name:"Pay on Delivery",enabled:!0,accountHolder:"Cash on Arrival",accountNumber:"Bole Courier",instructions:"Pay courier in cash or Telebirr upon delivery."},verification:{requireReceipt:!0,manualApprovalRequired:!0,verificationNote:"Orders are confirmed after receipt verification by our cashier."}},socialLinks:{facebook:{enabled:!1,url:""},instagram:{enabled:!1,url:""},tiktok:{enabled:!1,url:""}}},smPendingLogoData,smLeafletMap=null,smLeafletMarker=null;function computeShopOpenStatus(t=shopMgmtState){const e=new Date;if(t.tempClosure&&t.tempClosure.enabled&&(!t.tempClosure.reopenAt||e<new Date(t.tempClosure.reopenAt)))return{isOpen:!1,label:"Closed (Temp)",detail:t.tempClosure.reopenAt?"Reopens "+new Date(t.tempClosure.reopenAt).toLocaleString([],{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"Temporarily Closed"};const n=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][e.getDay()],s=t.workingHours&&t.workingHours[n];if(!s||!s.isOpen)return{isOpen:!1,label:"Closed Today",detail:"Scheduled day off"};const a=e.getHours()*60+e.getMinutes(),[i,r]=(s.open||"08:00").split(":").map(Number),[l,c]=(s.close||"20:00").split(":").map(Number),d=i*60+r,u=l*60+c;if(a<d||a>=u)return{isOpen:!1,label:"Closed Now",detail:`Hours: ${s.open} - ${s.close}`};if(s.breakEnabled&&s.breakStart&&s.breakEnd){const[m,f]=s.breakStart.split(":").map(Number),[g,b]=s.breakEnd.split(":").map(Number);if(a>=m*60+f&&a<g*60+b)return{isOpen:!1,label:"On Break",detail:`Break until ${s.breakEnd}`}}return{isOpen:!0,label:"Open Now",detail:`Open until ${s.close}`}}function syncShopToCustomerUI(){const t=computeShopOpenStatus(shopMgmtState);if(typeof state<"u"&&state.shop&&(state.shop.isOpen=t.isOpen,state.shop.businessName=shopMgmtState.business.name,state.shop.businessLogo=shopMgmtState.business.logo,state.shop.businessPhone=shopMgmtState.business.phone,state.shop.businessAddress=shopMgmtState.business.address,state.shop.businessDesc=shopMgmtState.business.description,state.shop.deliveryEnabled=shopMgmtState.delivery.deliveryEnabled,state.shop.deliveryFee=Number(shopMgmtState.delivery.deliveryFee)||0,state.shop.deliveryAreas=shopMgmtState.delivery.deliveryAreas,state.shop.minOrderAmount=Number(shopMgmtState.delivery.minOrderAmount)||0,state.shop.pickupEnabled=shopMgmtState.delivery.pickupEnabled,state.shop.deliveryInstructions=shopMgmtState.delivery.deliveryInstructions,state.shop.paymentMethods={telebirr:{enabled:!!shopMgmtState.payments.telebirr?.enabled,name:"Telebirr",accountName:shopMgmtState.payments.telebirr?.accountHolder||"",accountNumber:shopMgmtState.payments.telebirr?.accountNumber||"",instructions:shopMgmtState.payments.telebirr?.instructions||""},cbe:{enabled:!!shopMgmtState.payments.cbe?.enabled,name:"CBE Transfer",accountName:shopMgmtState.payments.cbe?.accountHolder||"",accountNumber:shopMgmtState.payments.cbe?.accountNumber||"",instructions:shopMgmtState.payments.cbe?.instructions||""},cod:{enabled:!!shopMgmtState.payments.cod?.enabled,name:"Pay on Delivery",accountName:shopMgmtState.payments.cod?.accountHolder||"Cash on Arrival",accountNumber:shopMgmtState.payments.cod?.accountNumber||"Bole Courier",instructions:shopMgmtState.payments.cod?.instructions||""}},state.shop.paymentVerification=shopMgmtState.payments.verification,typeof saveState=="function"))try{saveState()}catch{}const e=document.getElementById("sm-live-status-pill");if(e&&(e.textContent=(t.isOpen?"\u25CF ":"\u25CB ")+t.label,e.className=t.isOpen?"px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0":"px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-rose-50 text-berry border border-rose-200 shrink-0"),typeof renderAllCustomerViews=="function")try{renderAllCustomerViews()}catch{}}async function loadShopManagementFromDb(){try{const t=await fetch("/api/shop-management",{cache:"no-store"});if(t.ok){const e=await t.json();if(e.success&&e.shopManagement){shopMgmtState={...shopMgmtState,...e.shopManagement},localStorage.setItem("mak_shop_mgmt_v1",JSON.stringify(shopMgmtState)),syncShopToCustomerUI(),adminTab==="shop"&&renderAdminShop();return}}}catch{}try{const t=localStorage.getItem("mak_shop_mgmt_v1");t&&(shopMgmtState={...shopMgmtState,...JSON.parse(t)})}catch{}syncShopToCustomerUI(),adminTab==="shop"&&renderAdminShop()}function openShopManagementSection(){smPendingLogoData=void 0,switchAdminTab("shop"),loadShopManagementFromDb()}function setAdminShopSection(t){collectCurrentShopTabInputs(),adminShopSection=t,renderAdminShop()}function collectCurrentShopTabInputs(){document.getElementById("sm-biz-name")&&(shopMgmtState.business.name=document.getElementById("sm-biz-name").value.trim()||shopMgmtState.business.name,shopMgmtState.business.description=document.getElementById("sm-biz-desc").value.trim(),shopMgmtState.business.phone=document.getElementById("sm-biz-phone").value.trim(),shopMgmtState.business.email=document.getElementById("sm-biz-email").value.trim(),shopMgmtState.business.address=document.getElementById("sm-biz-address").value.trim(),shopMgmtState.business.googleMapsUrl=document.getElementById("sm-biz-maps").value.trim()),document.getElementById("sm-temp-closure-enabled")&&(shopMgmtState.tempClosure.enabled=document.getElementById("sm-temp-closure-enabled").checked,shopMgmtState.tempClosure.reopenAt=document.getElementById("sm-temp-reopen").value,shopMgmtState.tempClosure.reason=document.getElementById("sm-temp-reason").value.trim(),Object.keys(shopMgmtState.workingHours).forEach(t=>{const e=document.getElementById("sm-wh-open-"+t);e&&(shopMgmtState.workingHours[t]={isOpen:e.checked,open:document.getElementById("sm-wh-start-"+t).value||"08:00",close:document.getElementById("sm-wh-end-"+t).value||"20:00",breakEnabled:document.getElementById("sm-wh-brk-en-"+t).checked,breakStart:document.getElementById("sm-wh-brk-s-"+t).value||"13:00",breakEnd:document.getElementById("sm-wh-brk-e-"+t).value||"14:00"})})),document.getElementById("sm-loc-lat")&&(shopMgmtState.location.lat=parseFloat(document.getElementById("sm-loc-lat").value)||9.0054,shopMgmtState.location.lng=parseFloat(document.getElementById("sm-loc-lng").value)||38.7885,shopMgmtState.location.googleMapsUrl=document.getElementById("sm-loc-maps").value.trim(),shopMgmtState.business.googleMapsUrl=shopMgmtState.location.googleMapsUrl),document.getElementById("sm-del-enabled")&&(shopMgmtState.delivery.deliveryEnabled=document.getElementById("sm-del-enabled").checked,shopMgmtState.delivery.deliveryFee=Math.max(0,Number(document.getElementById("sm-del-fee").value)||0),shopMgmtState.delivery.deliveryAreas=document.getElementById("sm-del-areas").value.trim(),shopMgmtState.delivery.minOrderAmount=Math.max(0,Number(document.getElementById("sm-del-min").value)||0),shopMgmtState.delivery.pickupEnabled=document.getElementById("sm-del-pickup").checked,shopMgmtState.delivery.deliveryInstructions=document.getElementById("sm-del-inst").value.trim()),document.getElementById("sm-pay-cbe-en")&&(shopMgmtState.payments.cbe.enabled=document.getElementById("sm-pay-cbe-en").checked,shopMgmtState.payments.cbe.accountHolder=document.getElementById("sm-pay-cbe-holder").value.trim(),shopMgmtState.payments.cbe.accountNumber=document.getElementById("sm-pay-cbe-num").value.trim(),shopMgmtState.payments.cbe.instructions=document.getElementById("sm-pay-cbe-inst").value.trim(),shopMgmtState.payments.telebirr.enabled=document.getElementById("sm-pay-tb-en").checked,shopMgmtState.payments.telebirr.accountHolder=document.getElementById("sm-pay-tb-holder").value.trim(),shopMgmtState.payments.telebirr.accountNumber=document.getElementById("sm-pay-tb-num").value.trim(),shopMgmtState.payments.telebirr.instructions=document.getElementById("sm-pay-tb-inst").value.trim(),shopMgmtState.payments.cod.enabled=document.getElementById("sm-pay-cod-en").checked,shopMgmtState.payments.cod.instructions=document.getElementById("sm-pay-cod-inst").value.trim(),shopMgmtState.payments.verification={requireReceipt:document.getElementById("sm-pay-ver-receipt").checked,manualApprovalRequired:document.getElementById("sm-pay-ver-manual").checked,verificationNote:document.getElementById("sm-pay-ver-note").value.trim()},Array.isArray(shopMgmtState.payments.customMethods)&&shopMgmtState.payments.customMethods.forEach((t,e)=>{const o=document.getElementById("sm-pay-cust-en-"+e),n=document.getElementById("sm-pay-cust-holder-"+e),s=document.getElementById("sm-pay-cust-num-"+e),a=document.getElementById("sm-pay-cust-inst-"+e);o&&(t.enabled=o.checked),n&&(t.accountHolder=n.value.trim()),s&&(t.accountNumber=s.value.trim()),a&&(t.instructions=a.value.trim())})),document.getElementById("sm-social-fb-url")&&(shopMgmtState.socialLinks={facebook:{enabled:!!document.getElementById("sm-social-fb-en")?.checked,url:(document.getElementById("sm-social-fb-url")?.value||"").trim()},instagram:{enabled:!!document.getElementById("sm-social-ig-en")?.checked,url:(document.getElementById("sm-social-ig-url")?.value||"").trim()},tiktok:{enabled:!!document.getElementById("sm-social-tt-en")?.checked,url:(document.getElementById("sm-social-tt-url")?.value||"").trim()}})}function handleShopLogoUpload(t){const e=t.files&&t.files[0];if(!e||!e.type.startsWith("image/"))return;const o=new FileReader;o.onload=n=>{smPendingLogoData=n.target.result;const s=document.getElementById("sm-biz-logo-preview");s&&(s.src=smPendingLogoData)},o.readAsDataURL(e)}function updateShopLocationPin(t,e,o=!0){const n=Number(t).toFixed(5),s=Number(e).toFixed(5);shopMgmtState.location.lat=Number(n),shopMgmtState.location.lng=Number(s);const a=document.getElementById("sm-loc-lat"),i=document.getElementById("sm-loc-lng"),r=document.getElementById("sm-loc-maps");a&&(a.value=n),i&&(i.value=s),r&&(r.value=`https://maps.google.com/?q=${n},${s}`,shopMgmtState.location.googleMapsUrl=r.value),o&&smLeafletMap&&smLeafletMarker&&(smLeafletMarker.setLatLng([Number(n),Number(s)]),smLeafletMap.setView([Number(n),Number(s)],15))}async function searchShopLocation(){const t=(document.getElementById("sm-loc-search")?.value||"").trim();if(!t)return;try{const s=await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(t+", Ethiopia")}`);if(s.ok){const a=await s.json();if(a&&a[0]){updateShopLocationPin(parseFloat(a[0].lat),parseFloat(a[0].lon),!0),typeof showAdminToast=="function"&&showAdminToast("Pin moved to "+a[0].display_name.split(",")[0]);return}}}catch{}const e={bole:[9.0054,38.7885],cmc:[9.0226,38.8565],kazanchis:[9.0175,38.7652],piassa:[9.0331,38.7501],sarbet:[8.9958,38.7386]},o=t.toLowerCase(),n=Object.keys(e).find(s=>o.includes(s));n?(updateShopLocationPin(e[n][0],e[n][1],!0),typeof showAdminToast=="function"&&showAdminToast("Pin moved to "+n.toUpperCase())):typeof showAdminToast=="function"&&showAdminToast("Location not found \u2014 tap map to set pin")}function initShopLocationMap(){const t=document.getElementById("sm-location-map");if(!t)return;const e=shopMgmtState.location.lat||9.0054,o=shopMgmtState.location.lng||38.7885,n=()=>{typeof L<"u"?(smLeafletMap&&(smLeafletMap.remove(),smLeafletMap=null),smLeafletMap=L.map(t,{zoomControl:!0}).setView([e,o],15),L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap"}).addTo(smLeafletMap),smLeafletMarker=L.marker([e,o],{draggable:!0}).addTo(smLeafletMap),smLeafletMarker.on("dragend",()=>{const s=smLeafletMarker.getLatLng();updateShopLocationPin(s.lat,s.lng,!1)}),smLeafletMap.on("click",s=>{updateShopLocationPin(s.latlng.lat,s.latlng.lng,!0)}),setTimeout(()=>{smLeafletMap&&smLeafletMap.invalidateSize()},200)):t.innerHTML=`<div onclick="updateShopLocationPin(9.0054 + (Math.random()-0.5)*0.01, 38.7885 + (Math.random()-0.5)*0.01, false)" class="w-full h-full bg-blush-50 flex flex-col items-center justify-center text-center p-3 cursor-pointer"><div class="text-berry font-extrabold text-xs">\u{1F4CD} Interactive Pin Pad (Offline Mode)</div><div class="text-[10px] text-ink-muted mt-1">Lat: ${e}, Lng: ${o} \u2022 Tap to adjust coordinates</div></div>`};if(typeof L>"u"){if(!document.getElementById("leaflet-css")){const s=document.createElement("link");s.id="leaflet-css",s.rel="stylesheet",s.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",document.head.appendChild(s)}if(document.getElementById("leaflet-js"))n();else{const s=document.createElement("script");s.id="leaflet-js",s.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",s.onload=n,s.onerror=n,document.head.appendChild(s)}}else n()}function renderAdminShop(){const t=document.getElementById("admin-shop-pills"),e=[{id:"business",label:"1. Business Info"},{id:"hours",label:"2. Working Hours"},{id:"location",label:"3. Shop Location"},{id:"delivery",label:"4. Delivery"},{id:"payments",label:"5. Payments"},{id:"social",label:"6. Social Links"}];t&&(t.innerHTML=e.map(r=>{const l=adminShopSection===r.id;return`
            <button type="button" onclick="setAdminShopSection('${r.id}')" class="shrink-0 px-3 py-1.5 rounded-full text-[10.5px] font-bold transition-all cursor-pointer ${l?"btn-berry text-white shadow-rose-sm":"bg-white text-ink-muted border border-blush-200 hover:text-ink"}">
              ${r.label}
            </button>
          `}).join(""));const o=document.getElementById("admin-shop-body");if(!o)return;const n=computeShopOpenStatus(shopMgmtState),s=document.getElementById("sm-live-status-pill");s&&(s.textContent=(n.isOpen?"\u25CF ":"\u25CB ")+n.label,s.className=n.isOpen?"px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0":"px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-rose-50 text-berry border border-rose-200 shrink-0");const a=[{key:"monday",label:"Monday"},{key:"tuesday",label:"Tuesday"},{key:"wednesday",label:"Wednesday"},{key:"thursday",label:"Thursday"},{key:"friday",label:"Friday"},{key:"saturday",label:"Saturday"},{key:"sunday",label:"Sunday"}];let i="";if(adminShopSection==="business"){const r=shopMgmtState.business;i=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-3">
            <h3 class="text-xs font-extrabold text-ink">1. Business Information</h3>
            <div class="flex items-center gap-3 p-2.5 rounded-2xl bg-blush-50/70 border border-blush-200/70">
              <img id="sm-biz-logo-preview" src="${smPendingLogoData||r.logo||"./images/mak-cake-logo.webp"}" alt="Shop Logo" class="w-12 h-12 rounded-xl object-cover bg-white border border-blush-200 shrink-0" />
              <div class="flex-1 min-w-0">
                <div class="text-[11px] font-bold text-ink">Shop Logo</div>
                <input type="file" id="sm-biz-logo-file" accept="image/png,image/jpeg,image/webp" class="hidden" onchange="handleShopLogoUpload(this)" />
                <button type="button" onclick="document.getElementById('sm-biz-logo-file').click()" class="mt-1 px-2.5 py-1 rounded-full bg-white border border-blush-200 text-berry text-[10px] font-extrabold shadow-2xs cursor-pointer">
                  Change Logo
                </button>
              </div>
            </div>
            <div>
              <label class="block text-[10.5px] font-bold text-ink-muted mb-1">Shop Name *</label>
              <input id="sm-biz-name" type="text" value="${r.name||""}" class="w-full px-3 py-2 rounded-xl bg-blush-50/70 border border-blush-200 text-xs font-bold text-ink focus:outline-none focus:ring-2 focus:ring-berry/30" />
            </div>
            <div>
              <label class="block text-[10.5px] font-bold text-ink-muted mb-1">Business Description</label>
              <textarea id="sm-biz-desc" rows="2" class="w-full px-3 py-2 rounded-xl bg-blush-50/70 border border-blush-200 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-berry/30">${r.description||""}</textarea>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-[10.5px] font-bold text-ink-muted mb-1">Phone Number *</label>
                <input id="sm-biz-phone" type="tel" value="${r.phone||""}" class="w-full px-3 py-2 rounded-xl bg-blush-50/70 border border-blush-200 text-xs font-bold text-ink focus:outline-none focus:ring-2 focus:ring-berry/30" />
              </div>
              <div>
                <label class="block text-[10.5px] font-bold text-ink-muted mb-1">Email</label>
                <input id="sm-biz-email" type="email" value="${r.email||""}" class="w-full px-3 py-2 rounded-xl bg-blush-50/70 border border-blush-200 text-xs font-bold text-ink focus:outline-none focus:ring-2 focus:ring-berry/30" />
              </div>
            </div>
            <div>
              <label class="block text-[10.5px] font-bold text-ink-muted mb-1">Business Address</label>
              <input id="sm-biz-address" type="text" value="${r.address||""}" class="w-full px-3 py-2 rounded-xl bg-blush-50/70 border border-blush-200 text-xs font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-berry/30" />
            </div>
            <div>
              <label class="block text-[10.5px] font-bold text-ink-muted mb-1">Google Maps Link</label>
              <input id="sm-biz-maps" type="url" value="${r.googleMapsUrl||""}" class="w-full px-3 py-2 rounded-xl bg-blush-50/70 border border-blush-200 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-berry/30" />
            </div>
          </div>`}else if(adminShopSection==="hours"){const r=shopMgmtState.tempClosure||{};i=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-extrabold text-ink">2. Working Hours</h3>
              <span class="px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold ${n.isOpen?"bg-emerald-50 text-emerald-700 border border-emerald-200":"bg-rose-50 text-berry border border-rose-200"}">
                ${n.label} \u2022 ${n.detail}
              </span>
            </div>

            <!-- Temporary Shop Closure -->
            <div class="p-3 rounded-2xl bg-blush-50/80 border border-blush-200 space-y-2">
              <label class="flex items-center justify-between cursor-pointer">
                <div>
                  <div class="text-[11.5px] font-extrabold text-ink">Temporary Shop Closure</div>
                  <div class="text-[9.5px] text-ink-muted">Override hours and set reopening time</div>
                </div>
                <input id="sm-temp-closure-enabled" type="checkbox" ${r.enabled?"checked":""} class="w-4 h-4 accent-berry rounded cursor-pointer" />
              </label>
              <div class="grid grid-cols-1 gap-2">
                <div>
                  <label class="block text-[10px] font-bold text-ink-muted mb-0.5">Reopening Date &amp; Time</label>
                  <input id="sm-temp-reopen" type="datetime-local" value="${r.reopenAt||""}" class="w-full px-2.5 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-bold text-ink" />
                </div>
                <div>
                  <label class="block text-[10px] font-bold text-ink-muted mb-0.5">Closure Note (Optional)</label>
                  <input id="sm-temp-reason" type="text" value="${r.reason||""}" placeholder="e.g. Holiday baking break" class="w-full px-2.5 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] text-ink" />
                </div>
              </div>
            </div>

            <!-- Per-day Schedule -->
            <div class="space-y-2">
              ${a.map(l=>{const c=shopMgmtState.workingHours[l.key]||{open:"08:00",close:"20:00",isOpen:!0,breakEnabled:!1,breakStart:"13:00",breakEnd:"14:00"};return`
                  <div class="p-2.5 rounded-2xl border border-blush-100 bg-blush-50/40 space-y-1.5">
                    <div class="flex items-center justify-between gap-2">
                      <label class="flex items-center gap-2 cursor-pointer">
                        <input id="sm-wh-open-${l.key}" type="checkbox" ${c.isOpen?"checked":""} class="w-3.5 h-3.5 accent-berry cursor-pointer" />
                        <span class="text-[11px] font-extrabold text-ink">${l.label}</span>
                      </label>
                      <div class="flex items-center gap-1">
                        <input id="sm-wh-start-${l.key}" type="time" value="${c.open||"08:00"}" class="px-1.5 py-1 rounded-lg bg-white border border-blush-200 text-[10px] font-bold text-ink" />
                        <span class="text-[10px] text-ink-muted">-</span>
                        <input id="sm-wh-end-${l.key}" type="time" value="${c.close||"20:00"}" class="px-1.5 py-1 rounded-lg bg-white border border-blush-200 text-[10px] font-bold text-ink" />
                      </div>
                    </div>
                    <div class="flex items-center justify-between gap-2 pl-5">
                      <label class="flex items-center gap-1.5 text-[9.5px] font-bold text-ink-muted cursor-pointer">
                        <input id="sm-wh-brk-en-${l.key}" type="checkbox" ${c.breakEnabled?"checked":""} class="w-3 h-3 accent-berry" />
                        <span>Break</span>
                      </label>
                      <div class="flex items-center gap-1">
                        <input id="sm-wh-brk-s-${l.key}" type="time" value="${c.breakStart||"13:00"}" class="px-1.5 py-0.5 rounded-lg bg-white border border-blush-100 text-[9.5px] text-ink" />
                        <span class="text-[9.5px] text-ink-muted">-</span>
                        <input id="sm-wh-brk-e-${l.key}" type="time" value="${c.breakEnd||"14:00"}" class="px-1.5 py-0.5 rounded-lg bg-white border border-blush-100 text-[9.5px] text-ink" />
                      </div>
                    </div>
                  </div>`}).join("")}
            </div>
          </div>`}else if(adminShopSection==="location"){const r=shopMgmtState.location;i=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-3">
            <h3 class="text-xs font-extrabold text-ink">3. Shop Location</h3>
            <div class="flex gap-1.5">
              <input id="sm-loc-search" type="text" placeholder="Search Addis Ababa area (e.g. Bole)..." class="flex-1 px-3 py-2 rounded-xl bg-blush-50 border border-blush-200 text-xs text-ink focus:outline-none" />
              <button type="button" onclick="searchShopLocation()" class="px-3 py-2 rounded-xl btn-berry text-white text-xs font-bold cursor-pointer shrink-0">Find</button>
            </div>
            <div id="sm-location-map" class="w-full h-[180px] rounded-2xl overflow-hidden border border-blush-200 z-10 relative"></div>
            <p class="text-[9.5px] text-ink-muted">Tap anywhere on the map or drag the pin to adjust coordinates.</p>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-[10px] font-bold text-ink-muted mb-0.5">Latitude</label>
                <input id="sm-loc-lat" type="number" step="0.00001" value="${r.lat}" class="w-full px-2.5 py-1.5 rounded-xl bg-blush-50 border border-blush-200 text-xs font-bold text-ink" />
              </div>
              <div>
                <label class="block text-[10px] font-bold text-ink-muted mb-0.5">Longitude</label>
                <input id="sm-loc-lng" type="number" step="0.00001" value="${r.lng}" class="w-full px-2.5 py-1.5 rounded-xl bg-blush-50 border border-blush-200 text-xs font-bold text-ink" />
              </div>
            </div>
            <div>
              <label class="block text-[10px] font-bold text-ink-muted mb-0.5">Google Maps Link</label>
              <input id="sm-loc-maps" type="url" value="${r.googleMapsUrl||""}" class="w-full px-2.5 py-1.5 rounded-xl bg-blush-50 border border-blush-200 text-xs text-ink" />
            </div>
          </div>`}else if(adminShopSection==="delivery"){const r=shopMgmtState.delivery;i=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-3">
            <h3 class="text-xs font-extrabold text-ink">4. Delivery Settings</h3>
            <div class="grid grid-cols-2 gap-2">
              <label class="p-2.5 rounded-2xl bg-blush-50/70 border border-blush-200 flex items-center justify-between cursor-pointer">
                <span class="text-[11px] font-extrabold text-ink">Delivery Enabled</span>
                <input id="sm-del-enabled" type="checkbox" ${r.deliveryEnabled?"checked":""} class="w-4 h-4 accent-berry" />
              </label>
              <label class="p-2.5 rounded-2xl bg-blush-50/70 border border-blush-200 flex items-center justify-between cursor-pointer">
                <span class="text-[11px] font-extrabold text-ink">Pickup Available</span>
                <input id="sm-del-pickup" type="checkbox" ${r.pickupEnabled?"checked":""} class="w-4 h-4 accent-berry" />
              </label>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-[10.5px] font-bold text-ink-muted mb-1">Delivery Fee (ETB)</label>
                <input id="sm-del-fee" type="number" min="0" value="${r.deliveryFee}" class="w-full px-3 py-2 rounded-xl bg-blush-50 border border-blush-200 text-xs font-extrabold text-ink" />
              </div>
              <div>
                <label class="block text-[10.5px] font-bold text-ink-muted mb-1">Min Order (ETB)</label>
                <input id="sm-del-min" type="number" min="0" value="${r.minOrderAmount}" class="w-full px-3 py-2 rounded-xl bg-blush-50 border border-blush-200 text-xs font-extrabold text-ink" />
              </div>
            </div>
            <div>
              <label class="block text-[10.5px] font-bold text-ink-muted mb-1">Delivery Areas</label>
              <input id="sm-del-areas" type="text" value="${r.deliveryAreas||""}" class="w-full px-3 py-2 rounded-xl bg-blush-50 border border-blush-200 text-xs font-semibold text-ink" />
            </div>
            <div>
              <label class="block text-[10.5px] font-bold text-ink-muted mb-1">Delivery Instructions</label>
              <textarea id="sm-del-inst" rows="2" class="w-full px-3 py-2 rounded-xl bg-blush-50 border border-blush-200 text-xs text-ink">${r.deliveryInstructions||""}</textarea>
            </div>
          </div>`}else if(adminShopSection==="payments"){const r=shopMgmtState.payments||{},l=r.verification||{},c=Array.isArray(r.customMethods)?r.customMethods:[];i=`
          <!-- MAK CAKE Website Admin Payment Account Management Header Card -->
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-stone-200/80 space-y-2.5">
            <div class="flex items-start justify-between gap-2">
              <div>
                <span class="text-[9px] font-extrabold uppercase tracking-widest text-berry">Financial Accounts</span>
                <h3 class="font-serif text-[15px] font-extrabold text-ink leading-tight">Payment Account Management</h3>
                <p class="text-[10px] text-ink-muted mt-0.5 leading-snug">Configure bank accounts &amp; mobile wallets shown during customer checkout.</p>
              </div>
              <button type="button" onclick="toggleAddCustomPaymentForm()" class="px-2.5 py-1.5 rounded-xl bg-[#2D1A21] hover:bg-ink text-white text-[10px] font-bold flex items-center gap-1 shadow-xs shrink-0 cursor-pointer">
                <span>+ Add Method</span>
              </button>
            </div>

            <!-- Historical Integrity Notice (Matches MAK CAKE Website Admin) -->
            <div class="p-2.5 rounded-2xl bg-amber-50/90 border border-amber-200/80 text-amber-900 flex items-start gap-2">
              <svg class="w-4 h-4 text-amber-600 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
              <div class="text-[10px] leading-snug">
                <span class="font-extrabold block">Historical Payment Record Integrity</span>
                <span class="text-amber-800">Changes apply only to future checkouts; past orders retain their payment snapshot.</span>
              </div>
            </div>
          </div>

          <!-- Inline Add Custom Payment Method Drawer Card -->
          <div id="sm-add-custom-pay-box" class="hidden bg-white rounded-[22px] p-4 shadow-rose-sm border border-berry/30 space-y-2.5">
            <div class="flex items-center justify-between border-b border-stone-100 pb-2">
              <span class="text-xs font-extrabold text-ink">Add Bank Account / Mobile Wallet</span>
              <button type="button" onclick="toggleAddCustomPaymentForm(false)" class="text-xs text-ink-muted hover:text-berry cursor-pointer">&times;</button>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-[10px] font-bold text-ink mb-0.5">Bank / Wallet Name *</label>
                <input id="sm-new-pay-name" type="text" placeholder="e.g. Bank of Abyssinia" class="w-full px-2.5 py-1.5 rounded-xl border border-stone-200 bg-stone-50/60 text-[11px] font-bold text-ink" />
              </div>
              <div>
                <label class="block text-[10px] font-bold text-ink mb-0.5">Method Type</label>
                <select id="sm-new-pay-type" class="w-full px-2.5 py-1.5 rounded-xl border border-stone-200 bg-stone-50/60 text-[11px] font-bold text-ink">
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Mobile Wallet">Mobile Wallet</option>
                </select>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-[10px] font-bold text-ink mb-0.5">Account Holder *</label>
                <input id="sm-new-pay-holder" type="text" placeholder="MAK Cake Bakery" class="w-full px-2.5 py-1.5 rounded-xl border border-stone-200 bg-stone-50/60 text-[11px] font-bold text-ink" />
              </div>
              <div>
                <label class="block text-[10px] font-bold text-ink mb-0.5">Account / Phone No. *</label>
                <input id="sm-new-pay-num" type="text" placeholder="123456789" class="w-full px-2.5 py-1.5 rounded-xl border border-stone-200 bg-stone-50/60 text-[11px] font-mono font-bold text-ink" />
              </div>
            </div>
            <div>
              <label class="block text-[10px] font-bold text-ink mb-0.5">Payment Instructions</label>
              <input id="sm-new-pay-inst" type="text" placeholder="Put order phone as transfer note" class="w-full px-2.5 py-1.5 rounded-xl border border-stone-200 bg-stone-50/60 text-[11px] text-ink" />
            </div>
            <button type="button" onclick="addCustomShopPaymentMethod()" class="w-full py-2 rounded-xl btn-berry text-white text-xs font-extrabold cursor-pointer">Add Payment Account</button>
          </div>

          <!-- 1. Commercial Bank of Ethiopia (CBE) Card -->
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-stone-200/80 space-y-3">
            <div class="flex items-center justify-between pb-2.5 border-b border-stone-100">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-white border border-purple-200 p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                  <img src="./images/cbe-logo.webp" alt="CBE" class="w-full h-full object-contain" onerror="this.onerror=null; this.src='https://play-lh.googleusercontent.com/OnO5ce1wjlp7B5Sx9aX29cr85C5aJdqoKwJ9YPEjPbaACr0daPOZQ1b-L8w9plUMR1p0NVkRkDAbS0_8eSn46A';" />
                </div>
                <div>
                  <h4 class="font-extrabold text-xs text-ink">Commercial Bank of Ethiopia</h4>
                  <span class="text-[9.5px] text-stone-500 font-medium">Primary Ethiopian Bank</span>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer shrink-0">
                <input id="sm-pay-cbe-en" type="checkbox" ${r.cbe?.enabled?"checked":""} class="sr-only peer" />
                <div class="w-10 h-5 bg-stone-200 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-stone-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
            <div class="space-y-2">
              <div>
                <label class="block text-[10px] font-bold text-ink mb-1">Account Holder Name</label>
                <input id="sm-pay-cbe-holder" type="text" placeholder="e.g. MAK Cake Artisanal Bakery" value="${r.cbe?.accountHolder||""}" class="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/40 text-xs font-semibold text-ink focus:outline-none focus:border-berry" />
              </div>
              <div>
                <label class="block text-[10px] font-bold text-ink mb-1">CBE Account Number</label>
                <input id="sm-pay-cbe-num" type="text" placeholder="e.g. 1000123456789" value="${r.cbe?.accountNumber||""}" class="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/40 text-xs font-mono font-bold text-ink focus:outline-none focus:border-berry" />
              </div>
              <div>
                <label class="block text-[10px] font-bold text-ink mb-1">Customer Payment Instructions</label>
                <input id="sm-pay-cbe-inst" type="text" placeholder="Transfer to CBE and upload receipt..." value="${r.cbe?.instructions||""}" class="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/40 text-[11px] text-ink focus:outline-none focus:border-berry" />
              </div>
            </div>
          </div>

          <!-- 2. Telebirr Mobile Money Card -->
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-stone-200/80 space-y-3">
            <div class="flex items-center justify-between pb-2.5 border-b border-stone-100">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-white border border-sky-200 p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                  <img src="./images/telebirr-logo.webp" alt="Telebirr" class="w-full h-full object-contain" onerror="this.onerror=null; this.src='https://upload.wikimedia.org/wikipedia/en/a/a4/Telebirr.png';" />
                </div>
                <div>
                  <h4 class="font-extrabold text-xs text-ink">Telebirr Mobile Money</h4>
                  <span class="text-[9.5px] text-stone-500 font-medium">Ethio Telecom Mobile Payment</span>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer shrink-0">
                <input id="sm-pay-tb-en" type="checkbox" ${r.telebirr?.enabled?"checked":""} class="sr-only peer" />
                <div class="w-10 h-5 bg-stone-200 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-stone-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-600"></div>
              </label>
            </div>
            <div class="space-y-2">
              <div>
                <label class="block text-[10px] font-bold text-ink mb-1">Account Holder Name</label>
                <input id="sm-pay-tb-holder" type="text" placeholder="e.g. MAK Cake Bakery" value="${r.telebirr?.accountHolder||""}" class="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/40 text-xs font-semibold text-ink focus:outline-none focus:border-berry" />
              </div>
              <div>
                <label class="block text-[10px] font-bold text-ink mb-1">Telebirr Number</label>
                <input id="sm-pay-tb-num" type="text" placeholder="e.g. 0911234567" value="${r.telebirr?.accountNumber||""}" class="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/40 text-xs font-mono font-bold text-ink focus:outline-none focus:border-berry" />
              </div>
              <div>
                <label class="block text-[10px] font-bold text-ink mb-1">Customer Payment Instructions</label>
                <input id="sm-pay-tb-inst" type="text" placeholder="Transfer via Telebirr app and upload screenshot..." value="${r.telebirr?.instructions||""}" class="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/40 text-[11px] text-ink focus:outline-none focus:border-berry" />
              </div>
            </div>
          </div>

          <!-- 3. Pay on Delivery (Cash) Card -->
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-stone-200/80 space-y-3">
            <div class="flex items-center justify-between pb-2.5 border-b border-stone-100">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-blush-50 border border-blush-200 text-berry flex items-center justify-center shrink-0">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                </div>
                <div>
                  <h4 class="font-extrabold text-xs text-ink">Pay on Delivery (Cash)</h4>
                  <span class="text-[9.5px] text-stone-500 font-medium">Courier Cash / POS Upon Arrival</span>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer shrink-0">
                <input id="sm-pay-cod-en" type="checkbox" ${r.cod?.enabled?"checked":""} class="sr-only peer" />
                <div class="w-10 h-5 bg-stone-200 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-stone-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-berry"></div>
              </label>
            </div>
            <div>
              <label class="block text-[10px] font-bold text-ink mb-1">Courier Payment Instructions</label>
              <input id="sm-pay-cod-inst" type="text" placeholder="Pay courier in cash or Telebirr upon delivery..." value="${r.cod?.instructions||""}" class="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/40 text-[11px] text-ink focus:outline-none focus:border-berry" />
            </div>
          </div>

          <!-- 4. Additional Bank Accounts & Mobile Wallets (Custom Methods) -->
          ${c.length?`
            <div class="space-y-2.5">
              <div class="px-1 flex items-center justify-between">
                <span class="text-[10.5px] font-extrabold uppercase tracking-wider text-ink">Additional Banks &amp; Wallets (${c.length})</span>
              </div>
              ${c.map((d,u)=>`
                <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-stone-200/80 space-y-2.5">
                  <div class="flex items-center justify-between pb-2 border-b border-stone-100">
                    <div class="min-w-0">
                      <div class="flex items-center gap-1.5">
                        <h4 class="font-extrabold text-xs text-ink truncate">${d.name}</h4>
                        <span class="px-2 py-0.5 rounded-full bg-blush-100 text-berry text-[9px] font-extrabold shrink-0">${d.type||"Bank"}</span>
                      </div>
                    </div>
                    <div class="flex items-center gap-2 shrink-0">
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input id="sm-pay-cust-en-${u}" type="checkbox" ${d.enabled!==!1?"checked":""} class="sr-only peer" />
                        <div class="w-9 h-5 bg-stone-200 rounded-full peer peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-stone-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-berry"></div>
                      </label>
                      <button type="button" onclick="removeCustomShopPaymentMethod(${u})" class="text-[10px] font-bold text-rose-600 cursor-pointer">&times;</button>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-2">
                    <input id="sm-pay-cust-holder-${u}" type="text" placeholder="Account Holder" value="${d.accountHolder||""}" class="px-2.5 py-1.5 rounded-xl border border-stone-200 bg-stone-50/40 text-[11px] font-semibold text-ink" />
                    <input id="sm-pay-cust-num-${u}" type="text" placeholder="Account Number" value="${d.accountNumber||""}" class="px-2.5 py-1.5 rounded-xl border border-stone-200 bg-stone-50/40 text-[11px] font-mono font-bold text-ink" />
                  </div>
                  <input id="sm-pay-cust-inst-${u}" type="text" placeholder="Instructions..." value="${d.instructions||""}" class="w-full px-2.5 py-1.5 rounded-xl border border-stone-200 bg-stone-50/40 text-[11px] text-ink" />
                </div>`).join("")}
            </div>`:""}

          <!-- 5. Payment Verification Settings Card -->
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-stone-200/80 space-y-3">
            <div class="pb-2 border-b border-stone-100">
              <h4 class="font-extrabold text-xs text-ink">Payment Verification Controls</h4>
              <p class="text-[9.5px] text-stone-500">Order confirmation &amp; transfer proof requirements</p>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="text-[11px] font-bold text-ink">Require Payment Receipt Screenshot</span>
              <label class="relative inline-flex items-center cursor-pointer shrink-0">
                <input id="sm-pay-ver-receipt" type="checkbox" ${l.requireReceipt!==!1?"checked":""} class="sr-only peer" />
                <div class="w-10 h-5 bg-stone-200 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-stone-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-berry"></div>
              </label>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="text-[11px] font-bold text-ink">Require Admin/Cashier Approval</span>
              <label class="relative inline-flex items-center cursor-pointer shrink-0">
                <input id="sm-pay-ver-manual" type="checkbox" ${l.manualApprovalRequired!==!1?"checked":""} class="sr-only peer" />
                <div class="w-10 h-5 bg-stone-200 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-stone-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-berry"></div>
              </label>
            </div>
            <div>
              <label class="block text-[10px] font-bold text-ink mb-1">Customer Verification Note</label>
              <input id="sm-pay-ver-note" type="text" placeholder="Customer verification note..." value="${l.verificationNote||""}" class="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/40 text-[11px] text-ink focus:outline-none focus:border-berry" />
            </div>
          </div>`}if(adminShopSection==="social"){const r=shopMgmtState.socialLinks||state.shop&&state.shop.socialLinks||{},l=r.facebook||{enabled:!1,url:""},c=r.instagram||{enabled:!1,url:""},d=r.tiktok||{enabled:!1,url:""};i=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-3.5">
            <div>
              <h3 class="text-xs font-extrabold text-ink">6. Social Media Links</h3>
              <p class="text-[10px] text-ink-muted mt-0.5">Active HTTPS links appear automatically on the customer homepage</p>
            </div>

            <!-- Facebook -->
            <div class="p-3 rounded-2xl bg-blush-50/70 border border-blush-200/80 space-y-2">
              <div class="flex items-center justify-between gap-2">
                <span class="text-xs font-extrabold text-ink">Facebook</span>
                <label class="inline-flex items-center gap-1.5 text-[10.5px] font-bold text-ink cursor-pointer">
                  <input id="sm-social-fb-en" type="checkbox" ${l.enabled?"checked":""} class="w-4 h-4 accent-berry cursor-pointer" />
                  <span>Show on Homepage</span>
                </label>
              </div>
              <div class="flex items-center gap-1.5">
                <input id="sm-social-fb-url" type="url" value="${l.url||""}" placeholder="https://www.facebook.com/yourpage" class="flex-1 min-w-0 px-3 py-2 rounded-xl bg-white border border-blush-200 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-berry/30" />
                <button type="button" onclick="document.getElementById('sm-social-fb-url').value=''; document.getElementById('sm-social-fb-en').checked=false;" class="px-2.5 py-2 rounded-xl bg-rose-50 text-berry text-[10px] font-bold border border-rose-200 shrink-0 cursor-pointer">Clear</button>
              </div>
            </div>

            <!-- Instagram -->
            <div class="p-3 rounded-2xl bg-blush-50/70 border border-blush-200/80 space-y-2">
              <div class="flex items-center justify-between gap-2">
                <span class="text-xs font-extrabold text-ink">Instagram</span>
                <label class="inline-flex items-center gap-1.5 text-[10.5px] font-bold text-ink cursor-pointer">
                  <input id="sm-social-ig-en" type="checkbox" ${c.enabled?"checked":""} class="w-4 h-4 accent-berry cursor-pointer" />
                  <span>Show on Homepage</span>
                </label>
              </div>
              <div class="flex items-center gap-1.5">
                <input id="sm-social-ig-url" type="url" value="${c.url||""}" placeholder="https://www.instagram.com/yourhandle" class="flex-1 min-w-0 px-3 py-2 rounded-xl bg-white border border-blush-200 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-berry/30" />
                <button type="button" onclick="document.getElementById('sm-social-ig-url').value=''; document.getElementById('sm-social-ig-en').checked=false;" class="px-2.5 py-2 rounded-xl bg-rose-50 text-berry text-[10px] font-bold border border-rose-200 shrink-0 cursor-pointer">Clear</button>
              </div>
            </div>

            <!-- TikTok -->
            <div class="p-3 rounded-2xl bg-blush-50/70 border border-blush-200/80 space-y-2">
              <div class="flex items-center justify-between gap-2">
                <span class="text-xs font-extrabold text-ink">TikTok</span>
                <label class="inline-flex items-center gap-1.5 text-[10.5px] font-bold text-ink cursor-pointer">
                  <input id="sm-social-tt-en" type="checkbox" ${d.enabled?"checked":""} class="w-4 h-4 accent-berry cursor-pointer" />
                  <span>Show on Homepage</span>
                </label>
              </div>
              <div class="flex items-center gap-1.5">
                <input id="sm-social-tt-url" type="url" value="${d.url||""}" placeholder="https://www.tiktok.com/@yourhandle" class="flex-1 min-w-0 px-3 py-2 rounded-xl bg-white border border-blush-200 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-berry/30" />
                <button type="button" onclick="document.getElementById('sm-social-tt-url').value=''; document.getElementById('sm-social-tt-en').checked=false;" class="px-2.5 py-2 rounded-xl bg-rose-50 text-berry text-[10px] font-bold border border-rose-200 shrink-0 cursor-pointer">Clear</button>
              </div>
            </div>
          </div>
        `}o.innerHTML=i+`
        <button type="button" id="sm-save-btn" onclick="saveShopManagement()" class="w-full py-3 rounded-full btn-berry text-white text-xs font-extrabold shadow-rose-sm active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Save Shop Settings Permanently</span>
        </button>
      `,adminShopSection==="location"&&initShopLocationMap()}async function saveShopManagement(){if(collectCurrentShopTabInputs(),!shopMgmtState.business.name||!shopMgmtState.business.name.trim()){typeof showAdminToast=="function"&&showAdminToast("Shop name is required","error");return}if(!shopMgmtState.business.phone||!shopMgmtState.business.phone.trim()){typeof showAdminToast=="function"&&showAdminToast("Phone number is required","error");return}const t=shopMgmtState.socialLinks||{},e=[{key:"facebook",label:"Facebook"},{key:"instagram",label:"Instagram"},{key:"tiktok",label:"TikTok"}];for(const s of e){const a=t[s.key]||{enabled:!1,url:""};if(a.url&&typeof validateSocialMediaUrl=="function"){const i=validateSocialMediaUrl(s.key,a.url);if(!i.valid){typeof showAdminToast=="function"&&showAdminToast(i.error,"error");return}a.url=i.cleanUrl}if(a.enabled&&!a.url){typeof showAdminToast=="function"&&showAdminToast(`Enter a valid HTTPS ${s.label} URL or disable it.`,"error");return}}const o=JSON.parse(JSON.stringify(shopMgmtState));smPendingLogoData&&(o.business.logo=smPendingLogoData);const n=document.getElementById("sm-save-btn");await runWithFeedback({lockKey:"save-shop-mgmt",btnEl:n,scope:"admin",loadingMsg:"Saving shop settings...",successMsg:"Changes saved successfully!",action:async()=>{try{const s=await fetch("/api/shop-management",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});if(s.ok){const a=await s.json();a&&a.settings?.brand?.logo&&(shopMgmtState.business.logo=a.settings.brand.logo,smPendingLogoData=void 0)}}catch{}return localStorage.setItem("mak_shop_mgmt_v1",JSON.stringify(shopMgmtState)),typeof state<"u"&&state.shop&&(state.shop.businessName=shopMgmtState.business.name||state.shop.businessName,state.shop.businessPhone=shopMgmtState.business.phone||state.shop.businessPhone,state.shop.businessAddress=shopMgmtState.business.address||state.shop.businessAddress,state.shop.businessDesc=shopMgmtState.business.description||state.shop.businessDesc,state.shop.googleMapsUrl=shopMgmtState.location.googleMapsUrl||shopMgmtState.business.googleMapsUrl||state.shop.googleMapsUrl,state.shop.lat=shopMgmtState.location.lat,state.shop.lng=shopMgmtState.location.lng,state.shop.socialLinks=JSON.parse(JSON.stringify(shopMgmtState.socialLinks||{})),saveState(),syncSettingsToCloud(),typeof renderCustomerSocialLinks=="function"&&renderCustomerSocialLinks()),syncShopToCustomerUI(),renderAdminShop(),!0}})}let pcActiveTab="sizes",productConfigState={enabled:!0,sectionsEnabled:{sizes:!0,weights:!0,units:!0,rules:!0,options:!0},sizes:[{id:'6" Standard',label:'6" Standard',add:0,serves:"6\u20138 Guests",enabled:!0},{id:'8" Celebration',label:'8" Celebration',add:700,serves:"12\u201315 Guests",enabled:!0},{id:'10" Grand',label:'10" Grand',add:1600,serves:"20\u201324 Guests",enabled:!0},{id:"2-Tier Luxury",label:"2-Tier",add:4200,serves:"35+ Guests",enabled:!0}],weights:[{id:"wt-500g",value:500,unit:"g",add:0,enabled:!0},{id:"wt-1kg",value:1,unit:"kg",add:450,enabled:!0},{id:"wt-1-5kg",value:1.5,unit:"kg",add:900,enabled:!0},{id:"wt-2kg",value:2,unit:"kg",add:1400,enabled:!0}],units:{defaultUnit:"g",allowGrams:!0,allowKilograms:!0,gramsPerKg:1e3},pricingRules:[{id:"rule-1",sizeId:'8" Celebration',weightId:"wt-1-5kg",extraCharge:250,label:"Celebration + 1.5kg Reinforcement",enabled:!0},{id:"rule-2",sizeId:"2-Tier Luxury",weightId:"wt-2kg",extraCharge:500,label:"2-Tier Dowel & Box Support",enabled:!0}],customizations:[{id:"opt-msg",name:"Custom Cake Inscription",charge:0,required:!1,enabled:!0},{id:"opt-eggless",name:"Eggless / Special Dietary Prep",charge:250,required:!1,enabled:!0},{id:"opt-gold",name:"Edible Gold Leaf Accent",charge:450,required:!1,enabled:!0},{id:"opt-express",name:"Express 3-Hour Kitchen Prep",charge:350,required:!1,enabled:!0}]};function convertCakeWeight(t,e,o){const n=Number(t)||0;return e===o?n:e==="kg"&&o==="g"?Math.round(n*1e3):e==="g"&&o==="kg"?Number((n/1e3).toFixed(2)):n}function formatCakeWeight(t){const e=productConfigState.units?.defaultUnit||t.unit;return e==="g"&&productConfigState.units?.allowGrams||e==="kg"&&productConfigState.units?.allowKilograms?convertCakeWeight(t.value,t.unit,e)+e:t.value+t.unit}function syncProductConfigToOrderSystem(){const t=(productConfigState.sizes||[]).filter(e=>e.enabled!==!1);if(t.length>0&&(SIZES=t.map(e=>({id:e.id,label:e.label,add:Number(e.add)||0,serves:e.serves||"6\u20138 Guests"}))),typeof renderOrderSheet=="function"&&document.getElementById("order-sheet")&&!document.getElementById("order-sheet").classList.contains("hidden"))try{renderOrderSheet()}catch{}}async function loadProductConfigFromDb(){try{const t=await fetch("/api/product-config",{cache:"no-store"});if(t.ok){const e=await t.json();if(e.success&&e.productConfig){productConfigState={...productConfigState,...e.productConfig},localStorage.setItem("mak_product_config_v1",JSON.stringify(productConfigState)),syncProductConfigToOrderSystem(),adminTab==="product-config"&&renderProductConfig();return}}}catch{}try{const t=localStorage.getItem("mak_product_config_v1");t&&(productConfigState={...productConfigState,...JSON.parse(t)})}catch{}syncProductConfigToOrderSystem(),adminTab==="product-config"&&renderProductConfig()}function openProductConfigSection(){switchAdminTab("product-config"),loadProductConfigFromDb()}function toggleProductConfigMaster(t){productConfigState.enabled=!!t;const e=document.getElementById("pc-master-label");e&&(e.textContent=productConfigState.enabled?"ON":"OFF",e.className=productConfigState.enabled?"text-[10px] font-extrabold text-berry":"text-[10px] font-extrabold text-ink-muted"),renderProductConfig()}function togglePcSectionEnabled(t,e){productConfigState.sectionsEnabled=productConfigState.sectionsEnabled||{sizes:!0,weights:!0,units:!0,rules:!0,options:!0},productConfigState.sectionsEnabled[t]=!!e,renderProductConfig()}function renderPcOnOffSwitch(t,e){return`
        <label class="inline-flex items-center gap-1.5 cursor-pointer shrink-0">
          <span class="text-[9.5px] font-extrabold ${t?"text-berry":"text-ink-muted"}">${t?"ON":"OFF"}</span>
          <div class="relative inline-flex items-center">
            <input type="checkbox" ${t?"checked":""} onchange="${e}" class="sr-only peer" />
            <div class="w-9 h-5 bg-stone-200 rounded-full peer peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-stone-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-berry"></div>
          </div>
        </label>
      `}function setProductConfigTab(t){pcActiveTab=t,renderProductConfig()}function addPcSize(){const t=productConfigState.sizes.length+1;productConfigState.sizes.push({id:"size-"+Date.now(),label:"Custom Size "+t,add:500,serves:"10\u201312 Guests",enabled:!0}),renderProductConfig()}function updatePcSize(t,e,o){const n=productConfigState.sizes[t];n&&(n[e]=e==="add"?Math.max(0,Number(o)||0):e==="enabled"?!!o:String(o),e==="label"&&!n.id.startsWith('6"')&&!n.id.startsWith('8"')&&!n.id.startsWith('10"')&&!n.id.startsWith("2-Tier")&&(n.id=String(o).trim()||n.id))}function deletePcSize(t){if(productConfigState.sizes.length<=1){typeof showAdminToast=="function"&&showAdminToast("Keep at least one cake size");return}productConfigState.sizes.splice(t,1),renderProductConfig()}function addPcWeight(){productConfigState.weights.push({id:"wt-"+Date.now(),value:750,unit:"g",add:300,enabled:!0}),renderProductConfig()}function updatePcWeight(t,e,o){const n=productConfigState.weights[t];n&&(e==="value"?n.value=Math.max(.05,Number(o)||.5):e==="add"?n.add=Math.max(0,Number(o)||0):e==="unit"?n.unit=o==="kg"?"kg":"g":e==="enabled"&&(n.enabled=!!o))}function deletePcWeight(t){if(productConfigState.weights.length<=1){typeof showAdminToast=="function"&&showAdminToast("Keep at least one cake weight");return}productConfigState.weights.splice(t,1),renderProductConfig()}function addPcRule(){const t=productConfigState.sizes[0]?.id||"",e=productConfigState.weights[0]?.id||"";productConfigState.pricingRules.push({id:"rule-"+Date.now(),sizeId:t,weightId:e,extraCharge:200,label:"Custom Rule",enabled:!0}),renderProductConfig()}function updatePcRule(t,e,o){const n=productConfigState.pricingRules[t];n&&(e==="extraCharge"?n.extraCharge=Math.max(0,Number(o)||0):e==="enabled"?n.enabled=!!o:n[e]=String(o))}function deletePcRule(t){productConfigState.pricingRules.splice(t,1),renderProductConfig()}function addPcCustomization(){productConfigState.customizations.push({id:"opt-"+Date.now(),name:"New Option",charge:150,required:!1,enabled:!0}),renderProductConfig()}function updatePcCustomization(t,e,o){const n=productConfigState.customizations[t];n&&(e==="charge"?n.charge=Math.max(0,Number(o)||0):e==="enabled"||e==="required"?n[e]=!!o:n[e]=String(o))}function deletePcCustomization(t){productConfigState.customizations.splice(t,1),renderProductConfig()}function renderProductConfig(){const t=document.getElementById("pc-subtabs"),e=[{id:"sizes",label:"1. Sizes"},{id:"weights",label:"2. Weights"},{id:"units",label:"3. Units"},{id:"rules",label:"4. Pricing Rules"},{id:"options",label:"5. Customizations"}];t&&(t.innerHTML=e.map(d=>{const u=pcActiveTab===d.id;return`<button type="button" onclick="setProductConfigTab('${d.id}')" class="shrink-0 px-3 py-1.5 rounded-full text-[10.5px] font-bold transition-all cursor-pointer ${u?"btn-berry text-white shadow-rose-sm":"bg-white text-ink-muted border border-blush-200 hover:text-ink"}">${d.label}</button>`}).join(""));const o=document.getElementById("pc-body");if(!o)return;let n="";if(pcActiveTab==="sizes")n=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-2.5">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-extrabold text-ink">1. Cake Sizes</h3>
              <button type="button" onclick="addPcSize()" class="px-2.5 py-1 rounded-full bg-blush-100 text-berry text-[10px] font-extrabold cursor-pointer">+ Add Size</button>
            </div>
            <div class="space-y-2">
              ${productConfigState.sizes.map((d,u)=>`
                <div class="p-2.5 rounded-2xl bg-blush-50/70 border border-blush-200/80 space-y-2">
                  <div class="flex items-center justify-between gap-2">
                    ${renderPcOnOffSwitch(d.enabled!==!1,`updatePcSize(${u}, 'enabled', this.checked); renderProductConfig();`)}

                    <button type="button" onclick="deletePcSize(${u})" class="text-[10px] font-bold text-rose-600 cursor-pointer">&times; Delete</button>
                  </div>
                  <div class="grid grid-cols-3 gap-1.5">
                    <input type="text" value="${d.label}" onchange="updatePcSize(${u}, 'label', this.value)" placeholder="Label" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-bold text-ink" />
                    <input type="text" value="${d.serves}" onchange="updatePcSize(${u}, 'serves', this.value)" placeholder="Servings" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] text-ink" />
                    <input type="number" min="0" value="${d.add}" onchange="updatePcSize(${u}, 'add', this.value)" placeholder="+ETB" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-extrabold text-berry" />
                  </div>
                </div>`).join("")}
            </div>
          </div>`;else if(pcActiveTab==="weights")n=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-2.5">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-extrabold text-ink">2. Cake Weights</h3>
              <button type="button" onclick="addPcWeight()" class="px-2.5 py-1 rounded-full bg-blush-100 text-berry text-[10px] font-extrabold cursor-pointer">+ Add Weight</button>
            </div>
            <div class="space-y-2">
              ${productConfigState.weights.map((d,u)=>`
                <div class="p-2.5 rounded-2xl bg-blush-50/70 border border-blush-200/80 space-y-2">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">${renderPcOnOffSwitch(d.enabled!==!1,`updatePcWeight(${u}, 'enabled', this.checked); renderProductConfig();`)}<span class="text-[9.5px] font-bold text-ink-muted">(${convertCakeWeight(d.value,d.unit,d.unit==="g"?"kg":"g")}${d.unit==="g"?"kg":"g"})</span></div>
                    <button type="button" onclick="deletePcWeight(${u})" class="text-[10px] font-bold text-rose-600 cursor-pointer">&times; Delete</button>
                  </div>
                  <div class="grid grid-cols-3 gap-1.5">
                    <input type="number" step="0.1" min="0.1" value="${d.value}" onchange="updatePcWeight(${u}, 'value', this.value); renderProductConfig();" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-bold text-ink" />
                    <select onchange="updatePcWeight(${u}, 'unit', this.value); renderProductConfig();" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-bold text-ink">
                      <option value="g" ${d.unit==="g"?"selected":""}>Grams (g)</option>
                      <option value="kg" ${d.unit==="kg"?"selected":""}>Kilograms (kg)</option>
                    </select>
                    <input type="number" min="0" value="${d.add}" onchange="updatePcWeight(${u}, 'add', this.value)" placeholder="+ETB" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-extrabold text-berry" />
                  </div>
                </div>`).join("")}
            </div>
          </div>`;else if(pcActiveTab==="units"){const d=productConfigState.units||{};n=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-3">
            <h3 class="text-xs font-extrabold text-ink">3. Measurement Units</h3>
            <label class="p-2.5 rounded-2xl bg-blush-50/70 border border-blush-200 flex items-center justify-between cursor-pointer">
              <span class="text-[11px] font-bold text-ink">Enable Grams (g)</span>
              <input type="checkbox" ${d.allowGrams!==!1?"checked":""} onchange="productConfigState.units.allowGrams = this.checked" class="w-4 h-4 accent-berry" />
            </label>
            <label class="p-2.5 rounded-2xl bg-blush-50/70 border border-blush-200 flex items-center justify-between cursor-pointer">
              <span class="text-[11px] font-bold text-ink">Enable Kilograms (kg)</span>
              <input type="checkbox" ${d.allowKilograms!==!1?"checked":""} onchange="productConfigState.units.allowKilograms = this.checked" class="w-4 h-4 accent-berry" />
            </label>
            <div>
              <label class="block text-[10.5px] font-bold text-ink-muted mb-1">Customer Display Unit</label>
              <select onchange="productConfigState.units.defaultUnit = this.value; renderProductConfig();" class="w-full px-3 py-2 rounded-xl bg-blush-50 border border-blush-200 text-xs font-bold text-ink">
                <option value="g" ${d.defaultUnit==="g"?"selected":""}>Grams (g) \u2014 e.g. 500g, 1000g</option>
                <option value="kg" ${d.defaultUnit==="kg"?"selected":""}>Kilograms (kg) \u2014 e.g. 0.5kg, 1kg</option>
              </select>
            </div>
            <div class="p-2.5 rounded-xl bg-blush-50 border border-blush-200 text-[10.5px] text-ink-muted">
              Conversion standard: <strong class="text-ink">1 kg = 1,000 g</strong>. All customer weights automatically convert to <strong class="text-berry">${d.defaultUnit||"g"}</strong>.
            </div>
          </div>`}else pcActiveTab==="rules"?n=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-2.5">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-extrabold text-ink">4. Pricing Rules (Size + Weight)</h3>
              <button type="button" onclick="addPcRule()" class="px-2.5 py-1 rounded-full bg-blush-100 text-berry text-[10px] font-extrabold cursor-pointer">+ Add Rule</button>
            </div>
            <div class="space-y-2">
              ${productConfigState.pricingRules.length?productConfigState.pricingRules.map((d,u)=>`
                <div class="p-2.5 rounded-2xl bg-blush-50/70 border border-blush-200/80 space-y-2">
                  <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-2 flex-1 min-w-0">${renderPcOnOffSwitch(d.enabled!==!1,`updatePcRule(${u}, 'enabled', this.checked); renderProductConfig();`)}<input type="text" value="${d.label||""}" onchange="updatePcRule(${u}, 'label', this.value)" class="text-[11px] font-bold text-ink bg-transparent border-b border-dashed border-blush-300 focus:outline-none min-w-0 flex-1" /></div>
                    <button type="button" onclick="deletePcRule(${u})" class="text-[10px] font-bold text-rose-600 cursor-pointer">&times; Remove</button>
                  </div>
                  <div class="grid grid-cols-3 gap-1.5">
                    <select onchange="updatePcRule(${u}, 'sizeId', this.value)" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[10.5px] font-bold text-ink">
                      ${productConfigState.sizes.map(m=>`<option value="${m.id}" ${d.sizeId===m.id?"selected":""}>${m.label}</option>`).join("")}
                    </select>
                    <select onchange="updatePcRule(${u}, 'weightId', this.value)" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[10.5px] font-bold text-ink">
                      ${productConfigState.weights.map(m=>`<option value="${m.id}" ${d.weightId===m.id?"selected":""}>${m.value}${m.unit}</option>`).join("")}
                    </select>
                    <input type="number" min="0" value="${d.extraCharge}" onchange="updatePcRule(${u}, 'extraCharge', this.value)" placeholder="+ETB" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-extrabold text-berry" />
                  </div>
                </div>`).join(""):'<div class="text-xs text-ink-muted text-center py-3">No pricing rules added yet.</div>'}
            </div>
          </div>`:pcActiveTab==="options"&&(n=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-2.5">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-extrabold text-ink">5. Cake Customization Options</h3>
              <button type="button" onclick="addPcCustomization()" class="px-2.5 py-1 rounded-full bg-blush-100 text-berry text-[10px] font-extrabold cursor-pointer">+ Add Option</button>
            </div>
            <div class="space-y-2">
              ${productConfigState.customizations.map((d,u)=>`
                <div class="p-2.5 rounded-2xl bg-blush-50/70 border border-blush-200/80 space-y-2">
                  <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-3">
                      ${renderPcOnOffSwitch(d.enabled!==!1,`updatePcCustomization(${u}, 'enabled', this.checked); renderProductConfig();`)}
                      <label class="flex items-center gap-1 cursor-pointer">
                        <input type="checkbox" ${d.required?"checked":""} onchange="updatePcCustomization(${u}, 'required', this.checked)" class="w-3.5 h-3.5 accent-berry" />
                        <span class="text-[10px] font-bold text-berry">Required</span>
                      </label>
                    </div>
                    <button type="button" onclick="deletePcCustomization(${u})" class="text-[10px] font-bold text-rose-600 cursor-pointer">&times; Remove</button>
                  </div>
                  <div class="grid grid-cols-3 gap-1.5">
                    <input type="text" value="${d.name}" onchange="updatePcCustomization(${u}, 'name', this.value)" class="col-span-2 px-2.5 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-bold text-ink" />
                    <input type="number" min="0" value="${d.charge}" onchange="updatePcCustomization(${u}, 'charge', this.value)" placeholder="+ETB" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-extrabold text-berry" />
                  </div>
                </div>`).join("")}
            </div>
          </div>`);const s=document.getElementById("pc-master-checkbox"),a=document.getElementById("pc-master-label"),i=productConfigState.enabled!==!1;s&&(s.checked=i),a&&(a.textContent=i?"ON":"OFF",a.className=i?"text-[10px] font-extrabold text-berry":"text-[10px] font-extrabold text-ink-muted");const r=productConfigState.sectionsEnabled&&productConfigState.sectionsEnabled[pcActiveTab]!==!1,c=`
        <div class="bg-white rounded-2xl px-3.5 py-2.5 shadow-rose-sm border border-blush-200/70 flex items-center justify-between gap-2">
          <div>
            <div class="text-[11px] font-extrabold text-ink">${{sizes:"Cake Sizes",weights:"Cake Weights",units:"Measurement Units",rules:"Pricing Rules",options:"Customization Options"}[pcActiveTab]||"Section"} Status</div>
            <div class="text-[9.5px] text-ink-muted">${i?r?"Active on customer ordering":"Hidden from customer ordering":"Master Product Config is OFF"}</div>
          </div>
          ${renderPcOnOffSwitch(r,`togglePcSectionEnabled('${pcActiveTab}', this.checked)`)}
        </div>`;if(o.innerHTML=c+`<div class="${!i||!r?"opacity-55":""}">`+n+`</div>
        <button type="button" id="pc-save-btn" onclick="saveProductConfig()" class="w-full py-3 rounded-full btn-berry text-white text-xs font-extrabold shadow-rose-sm active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Save Product Configuration</span>
        </button>
      `,analyticsLocked){const d=container.innerHTML;container.innerHTML=`
          <div class="relative" style="min-height:72vh;">
            <div class="pointer-events-none select-none overflow-hidden" style="filter:blur(5px);opacity:0.65;max-height:74vh;">${d}</div>
            <div class="absolute inset-0 flex items-start justify-center px-4" style="padding-top:64px;background:rgba(255,249,250,0.55);backdrop-filter:blur(3px);">
              <div class="bg-white rounded-3xl p-6 shadow-2xl border border-blush-200 max-w-xs w-full text-center">
                <div style="font-size:38px;line-height:1;margin-bottom:10px;">\u{1F4CA}</div>
                <div style="font-size:15px;font-weight:900;color:#6d28d9;margin-bottom:6px;">Unlock Sales Analytics</div>
                <div style="font-size:11px;color:#6b7280;line-height:1.5;margin-bottom:14px;">See your real revenue, net profit, top-selling cakes &amp; payment channels. Upgrade to <strong style="color:#7c3aed;">Advanced</strong> to earn smarter.</div>
                <div class="text-left" style="display:flex;flex-direction:column;gap:6px;margin-bottom:18px;">
                  ${["\u{1F4C8} Total Revenue & Net Profit","\u{1F3C6} Top Selling Cakes Ranked","\u{1F4B3} Earnings by Payment Channel","\u{1F4CA} Weekly Sales Trend Chart"].map(u=>`<div style="display:flex;align-items:center;gap:8px;font-size:11px;font-weight:600;color:#1f2937;"><span style="color:#10b981;font-weight:900;">\u2713</span><span>${u}</span></div>`).join("")}
                </div>
                <button onclick="openUpgradePlanPage();" style="background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;width:100%;padding:13px;border-radius:50px;font-size:12.5px;font-weight:900;border:none;cursor:pointer;box-shadow:0 4px 15px rgba(124,58,237,0.35);">
                  \u{1F680} View Upgrade Plans \u2192
                </button>
                <div style="font-size:9.5px;color:#6b7280;margin-top:10px;">Pay once \xB7 Contact MAK CAKE after payment</div>
              </div>
            </div>
          </div>`}}async function saveProductConfig(){const t=document.getElementById("pc-save-btn");await runWithFeedback({lockKey:"save-product-config",btnEl:t,scope:"admin",loadingMsg:"Saving configuration...",successMsg:"Changes saved successfully!",action:async()=>{const e=await fetch("/api/product-config",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(productConfigState)}),o=await e.json();if(!e.ok||!o.success)throw new Error(o.error||"Could not save configuration");return productConfigState=o.productConfig,localStorage.setItem("mak_product_config_v1",JSON.stringify(productConfigState)),syncProductConfigToOrderSystem(),renderProductConfig(),!0}})}function selectSheetWeight(t){sheet.weightId=sheet.weightId===t?null:t,renderOrderSheet()}function toggleSheetCustomOpt(t){Array.isArray(sheet.customOptions)||(sheet.customOptions=[]);const e=sheet.customOptions.indexOf(t);e>=0?sheet.customOptions.splice(e,1):sheet.customOptions.push(t),renderOrderSheet()}let mktActiveTab="ads",mktAds=[],mktPromos=[],mktRewards={enabled:!0,eligibilityRules:{minOrderAmount:2e3,onePerCustomer:!0},prizes:[]},mktPendingAdImg="",mktEditingAdId=null,mktEditingPromoId=null;async function loadMarketingFromDb(){try{const[t,e,o]=await Promise.all([fetch("/api/advertisements",{cache:"no-store"}),fetch("/api/promo-codes",{cache:"no-store"}),fetch("/api/rewards",{cache:"no-store"})]);if(t.ok){const n=await t.json();n.success&&Array.isArray(n.advertisements)&&(mktAds=n.advertisements,syncAdsToCustomerHomepage())}if(e.ok){const n=await e.json();n.success&&Array.isArray(n.promoCodes)&&(mktPromos=n.promoCodes)}if(o.ok){const n=await o.json();n.success&&n.rewards&&(mktRewards=n.rewards)}}catch{}adminTab==="marketing"&&renderMarketingSection()}function syncAdsToCustomerHomepage(){const t=(mktAds||[]).filter(e=>e.active);if(t.length>0&&typeof HERO_SLIDES<"u"&&Array.isArray(HERO_SLIDES)&&(HERO_SLIDES.length=0,t.forEach(e=>{HERO_SLIDES.push({top:e.badge||"MAK CAKE Special",script:(e.title||"Special").split("\u2022").pop().trim().slice(0,18),sub:e.subtitle||e.desc||"Freshly baked in Addis Ababa",cta:e.buttonText?e.buttonText.replace(/→/g,"").trim():"Order Now",img:e.image||"./images/hero-banner.jpg",link:e.link||"#menu"})}),typeof heroIndex<"u"&&heroIndex>=HERO_SLIDES.length&&(heroIndex=0),typeof renderHero=="function"))try{renderHero()}catch{}}function openMarketingSection(){switchAdminTab("marketing"),loadMarketingFromDb()}function setMarketingTab(t){t==="ads"&&typeof hasPackageFeature=="function"&&!hasPackageFeature("homepage_ads")&&showPackageUpgradePrompt("Homepage Promotional Advertisements","Premium"),t==="rewards"&&typeof hasPackageFeature=="function"&&!hasPackageFeature("mystery_box")&&showPackageUpgradePrompt("Mystery Reward Box","Premium"),mktActiveTab=t,renderMarketingSection()}function handleMktAdImgUpload(t){const e=t.files&&t.files[0];if(!e||!e.type.startsWith("image/"))return;const o=new FileReader;o.onload=n=>{mktPendingAdImg=n.target.result;const s=document.getElementById("mkt-ad-img-url");s&&(s.value="Uploaded image ready")},o.readAsDataURL(e)}async function saveMktAd(){const t=(document.getElementById("mkt-ad-title")?.value||"").trim(),e=(document.getElementById("mkt-ad-desc")?.value||"").trim(),o=(document.getElementById("mkt-ad-link")?.value||"").trim()||"#menu",n=(document.getElementById("mkt-ad-img-url")?.value||"").trim(),s=mktPendingAdImg||(n&&n!=="Uploaded image ready"?n:"./images/hero-banner.jpg");if(!t){typeof showAdminToast=="function"&&showAdminToast("Advertisement title is required");return}const a=mktEditingAdId?`/api/advertisements/${mktEditingAdId}`:"/api/advertisements",i=mktEditingAdId?"PUT":"POST";try{(await fetch(a,{method:i,headers:{"Content-Type":"application/json"},body:JSON.stringify({title:t,subtitle:e,link:o,image:s,active:!0})})).ok?(mktPendingAdImg="",mktEditingAdId=null,await loadMarketingFromDb(),typeof showAdminToast=="function"&&showAdminToast("Submitted successfully!","success")):typeof showAdminToast=="function"&&showAdminToast("Could not save advertisement","error")}catch{typeof showAdminToast=="function"&&showAdminToast("Advertisement service unavailable","error")}}function editMktAd(t){const e=mktAds.find(o=>String(o.id)===String(t));e&&(mktEditingAdId=e.id,mktPendingAdImg="",renderMarketingSection(),setTimeout(()=>{document.getElementById("mkt-ad-title")&&(document.getElementById("mkt-ad-title").value=e.title||""),document.getElementById("mkt-ad-desc")&&(document.getElementById("mkt-ad-desc").value=e.subtitle||""),document.getElementById("mkt-ad-link")&&(document.getElementById("mkt-ad-link").value=e.link||""),document.getElementById("mkt-ad-img-url")&&(document.getElementById("mkt-ad-img-url").value=e.image||"")},30))}async function toggleMktAd(t){(await fetch(`/api/advertisements/${t}/toggle`,{method:"PUT"})).ok&&await loadMarketingFromDb()}async function deleteMktAd(t){(await fetch(`/api/advertisements/${t}`,{method:"DELETE"})).ok&&(await loadMarketingFromDb(),typeof showAdminToast=="function"&&showAdminToast("Advertisement deleted"))}async function saveMktPromo(){const t=(document.getElementById("mkt-pr-code")?.value||"").trim().toUpperCase(),e=document.getElementById("mkt-pr-type")?.value||"percent",o=Number(document.getElementById("mkt-pr-val")?.value)||0,n=document.getElementById("mkt-pr-exp")?.value||"2027-12-31",s=Number(document.getElementById("mkt-pr-limit")?.value)||100;if(!t||o<=0){typeof showAdminToast=="function"&&showAdminToast("Enter valid code and discount value");return}const a=mktEditingPromoId?`/api/promo-codes/${mktEditingPromoId}`:"/api/promo-codes",i=mktEditingPromoId?"PUT":"POST";try{const r=await fetch(a,{method:i,headers:{"Content-Type":"application/json"},body:JSON.stringify({code:t,type:e,discount:o,expiresAt:n,usageLimit:s,active:!0})}),l=await r.json();if(!r.ok||!l.success){typeof showAdminToast=="function"&&showAdminToast(l.error||"Error saving promo","error");return}mktEditingPromoId=null,await loadMarketingFromDb(),typeof showAdminToast=="function"&&showAdminToast("Submitted successfully!","success")}catch{typeof showAdminToast=="function"&&showAdminToast("Promo service unavailable","error")}}function editMktPromo(t){const e=mktPromos.find(o=>String(o.id)===String(t));e&&(mktEditingPromoId=e.id,renderMarketingSection(),setTimeout(()=>{document.getElementById("mkt-pr-code")&&(document.getElementById("mkt-pr-code").value=e.code),document.getElementById("mkt-pr-type")&&(document.getElementById("mkt-pr-type").value=e.type),document.getElementById("mkt-pr-val")&&(document.getElementById("mkt-pr-val").value=e.discount),document.getElementById("mkt-pr-exp")&&(document.getElementById("mkt-pr-exp").value=e.expiresAt||"2027-12-31"),document.getElementById("mkt-pr-limit")&&(document.getElementById("mkt-pr-limit").value=e.usageLimit||100)},30))}async function toggleMktPromo(t,e){(await fetch(`/api/promo-codes/${t}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({active:e})})).ok&&await loadMarketingFromDb()}async function deleteMktPromo(t){(await fetch(`/api/promo-codes/${t}`,{method:"DELETE"})).ok&&(await loadMarketingFromDb(),typeof showAdminToast=="function"&&showAdminToast("Promo code deleted"))}async function toggleMktRewardsEnabled(){(await fetch("/api/rewards/toggle",{method:"POST"})).ok&&(await loadMarketingFromDb(),typeof showAdminToast=="function"&&showAdminToast("Mystery Reward Box updated"))}async function saveMktRewardsRules(){const t=Number(document.getElementById("mkt-rew-min")?.value)||0,e=!!document.getElementById("mkt-rew-one")?.checked;(await fetch("/api/rewards/config",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({minOrderAmount:t,onePerCustomer:e})})).ok&&(await loadMarketingFromDb(),typeof showAdminToast=="function"&&showAdminToast("Reward eligibility rules saved"))}async function addMktRewardPrize(){const t=(document.getElementById("mkt-rw-name")?.value||"").trim(),e=document.getElementById("mkt-rw-type")?.value||"discount",o=Number(document.getElementById("mkt-rw-val")?.value)||100,n=Number(document.getElementById("mkt-rw-prob")?.value)||20,s=Number(document.getElementById("mkt-rw-qty")?.value)||50;if(!t){typeof showAdminToast=="function"&&showAdminToast("Enter reward prize name");return}(await fetch("/api/rewards",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,type:e,value:o,probability:n,quantityLimit:s,isAvailable:!0})})).ok&&(await loadMarketingFromDb(),typeof showAdminToast=="function"&&showAdminToast("Submitted successfully!","success"))}async function toggleMktPrizeAvail(t,e){(await fetch(`/api/rewards/${t}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({isAvailable:e})})).ok&&await loadMarketingFromDb()}async function deleteMktPrize(t){(await fetch(`/api/rewards/${t}`,{method:"DELETE"})).ok&&(await loadMarketingFromDb(),typeof showAdminToast=="function"&&showAdminToast("Reward option removed"))}function renderMarketingSection(){const t=document.getElementById("mkt-subtabs"),e=[{id:"ads",label:"1. Homepage Ads"},{id:"promos",label:"2. Promo Codes"},{id:"rewards",label:"3. Mystery Box"}];t&&(t.innerHTML=e.map(n=>{const s=mktActiveTab===n.id;return`<button type="button" onclick="setMarketingTab('${n.id}')" class="shrink-0 px-3 py-1.5 rounded-full text-[10.5px] font-bold transition-all cursor-pointer ${s?"btn-berry text-white shadow-rose-sm":"bg-white text-ink-muted border border-blush-200 hover:text-ink"}">${n.label}</button>`}).join(""));const o=document.getElementById("mkt-body");if(o){if(mktActiveTab==="ads")o.innerHTML=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-2.5">
            <h3 class="text-xs font-extrabold text-ink">${mktEditingAdId?"Edit Advertisement":"Add Homepage Advertisement"}</h3>
            <input id="mkt-ad-title" type="text" placeholder="Ad Title (e.g. Valentine Bento Special)" class="w-full px-3 py-2 rounded-xl bg-blush-50 border border-blush-200 text-xs font-bold text-ink" />
            <input id="mkt-ad-desc" type="text" placeholder="Short description..." class="w-full px-3 py-2 rounded-xl bg-blush-50 border border-blush-200 text-xs text-ink" />
            <input id="mkt-ad-link" type="text" placeholder="Optional destination link (e.g. #menu)" class="w-full px-3 py-2 rounded-xl bg-blush-50 border border-blush-200 text-xs text-ink" />
            <div class="flex gap-1.5">
              <input id="mkt-ad-img-url" type="text" placeholder="Image URL or upload \u2192" class="flex-1 px-3 py-2 rounded-xl bg-blush-50 border border-blush-200 text-xs text-ink" />
              <input id="mkt-ad-img-file" type="file" accept="image/*" class="hidden" onchange="handleMktAdImgUpload(this)" />
              <button type="button" onclick="document.getElementById('mkt-ad-img-file').click()" class="px-3 py-2 rounded-xl bg-blush-100 text-berry text-[10.5px] font-extrabold cursor-pointer shrink-0">Upload</button>
            </div>
            <button type="button" onclick="saveMktAd()" class="w-full py-2.5 rounded-full btn-berry text-white text-xs font-extrabold shadow-rose-sm cursor-pointer">${mktEditingAdId?"Update Advertisement":"Add Advertisement"}</button>
          </div>
          <div class="space-y-2">
            ${mktAds.map(n=>`
              <div class="bg-white rounded-2xl p-3 shadow-rose-sm border border-blush-100 flex items-center gap-2.5">
                <img src="${n.image||"./images/hero-banner.jpg"}" class="w-12 h-12 rounded-xl object-cover bg-blush-50 shrink-0" />
                <div class="flex-1 min-w-0">
                  <div class="text-xs font-extrabold text-ink truncate">${n.title}</div>
                  <div class="text-[10px] text-ink-muted truncate">${n.subtitle||""}</div>
                  <div class="flex items-center gap-2 mt-1">
                    <button type="button" onclick="toggleMktAd('${n.id}')" class="px-2 py-0.5 rounded-full text-[9px] font-extrabold cursor-pointer ${n.active?"bg-emerald-50 text-emerald-700 border border-emerald-200":"bg-blush-100 text-ink-muted"}">${n.active?"Enabled":"Disabled"}</button>
                    <button type="button" onclick="editMktAd('${n.id}')" class="text-[10px] font-bold text-berry cursor-pointer">Edit</button>
                    <button type="button" onclick="deleteMktAd('${n.id}')" class="text-[10px] font-bold text-rose-600 cursor-pointer">Delete</button>
                  </div>
                </div>
              </div>`).join("")}
          </div>`;else if(mktActiveTab==="promos")o.innerHTML=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-2.5">
            <h3 class="text-xs font-extrabold text-ink">${mktEditingPromoId?"Edit Promo Code":"Create Promo Code"}</h3>
            <div class="grid grid-cols-2 gap-2">
              <input id="mkt-pr-code" type="text" placeholder="CODE (e.g. MAK20)" class="px-3 py-2 rounded-xl bg-blush-50 border border-blush-200 text-xs font-extrabold uppercase text-ink" />
              <select id="mkt-pr-type" class="px-3 py-2 rounded-xl bg-blush-50 border border-blush-200 text-xs font-bold text-ink">
                <option value="percent">Percentage (%)</option>
                <option value="fixed">Fixed (ETB)</option>
              </select>
            </div>
            <div class="grid grid-cols-3 gap-1.5">
              <div>
                <label class="block text-[9.5px] font-bold text-ink-muted mb-0.5">Value</label>
                <input id="mkt-pr-val" type="number" min="1" value="10" class="w-full px-2.5 py-1.5 rounded-xl bg-blush-50 border border-blush-200 text-xs font-bold text-berry" />
              </div>
              <div>
                <label class="block text-[9.5px] font-bold text-ink-muted mb-0.5">Expires</label>
                <input id="mkt-pr-exp" type="date" value="2027-12-31" class="w-full px-2 py-1.5 rounded-xl bg-blush-50 border border-blush-200 text-[10.5px] font-bold text-ink" />
              </div>
              <div>
                <label class="block text-[9.5px] font-bold text-ink-muted mb-0.5">Usage Limit</label>
                <input id="mkt-pr-limit" type="number" min="1" value="100" class="w-full px-2.5 py-1.5 rounded-xl bg-blush-50 border border-blush-200 text-xs font-bold text-ink" />
              </div>
            </div>
            <button type="button" onclick="saveMktPromo()" class="w-full py-2.5 rounded-full btn-berry text-white text-xs font-extrabold shadow-rose-sm cursor-pointer">${mktEditingPromoId?"Update Promo Code":"Save Promo Code"}</button>
          </div>
          <div class="space-y-2">
            ${mktPromos.map(n=>`
              <div class="bg-white rounded-2xl p-3 shadow-rose-sm border border-blush-100 flex items-center justify-between gap-2">
                <div class="min-w-0">
                  <div class="text-xs font-black text-berry">${n.code} <span class="text-ink font-bold">\u2022 ${n.type==="percent"?n.discount+"%":n.discount+" ETB"} Off</span></div>
                  <div class="text-[9.5px] text-ink-muted">Exp: ${n.expiresAt||"None"} \u2022 Used: ${n.usedCount||0}/${n.usageLimit||"\u221E"}</div>
                </div>
                <div class="flex items-center gap-1.5 shrink-0">
                  <button type="button" onclick="toggleMktPromo('${n.id}', ${!n.active})" class="px-2 py-1 rounded-full text-[9px] font-extrabold cursor-pointer ${n.active?"bg-emerald-50 text-emerald-700 border border-emerald-200":"bg-blush-100 text-ink-muted"}">${n.active?"Active":"Off"}</button>
                  <button type="button" onclick="editMktPromo('${n.id}')" class="text-[10px] font-bold text-berry cursor-pointer">Edit</button>
                  <button type="button" onclick="deleteMktPromo('${n.id}')" class="text-[10px] font-bold text-rose-600 cursor-pointer">&times;</button>
                </div>
              </div>`).join("")}
          </div>`;else if(mktActiveTab==="rewards"){const n=mktRewards.eligibilityRules||{};o.innerHTML=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-2.5">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-extrabold text-ink">Mystery Reward Box</h3>
              <button type="button" onclick="toggleMktRewardsEnabled()" class="px-3 py-1 rounded-full text-[10px] font-extrabold cursor-pointer ${mktRewards.enabled?"bg-emerald-50 text-emerald-700 border border-emerald-200":"bg-rose-50 text-berry border border-rose-200"}">${mktRewards.enabled?"Enabled":"Disabled"}</button>
            </div>
            <div class="grid grid-cols-2 gap-2 items-center">
              <div>
                <label class="block text-[9.5px] font-bold text-ink-muted mb-0.5">Min Order (ETB)</label>
                <input id="mkt-rew-min" type="number" min="0" value="${n.minOrderAmount||2e3}" class="w-full px-2.5 py-1.5 rounded-xl bg-blush-50 border border-blush-200 text-xs font-bold text-ink" />
              </div>
              <label class="flex items-center gap-2 text-[10.5px] font-bold text-ink cursor-pointer pt-4">
                <input id="mkt-rew-one" type="checkbox" ${n.onePerCustomer!==!1?"checked":""} class="w-4 h-4 accent-berry" />
                <span>One claim / order</span>
              </label>
            </div>
            <button type="button" onclick="saveMktRewardsRules()" class="w-full py-2 rounded-full bg-blush-100 text-berry text-xs font-extrabold cursor-pointer">Save Rules</button>
          </div>

          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-2">
            <div class="text-xs font-extrabold text-ink">Add Reward Option</div>
            <input id="mkt-rw-name" type="text" placeholder="Reward name (e.g. 200 ETB Off)" class="w-full px-3 py-1.5 rounded-xl bg-blush-50 border border-blush-200 text-xs font-bold text-ink" />
            <div class="grid grid-cols-4 gap-1.5">
              <select id="mkt-rw-type" class="px-1.5 py-1.5 rounded-xl bg-blush-50 border border-blush-200 text-[10px] font-bold text-ink">
                <option value="discount">Discount</option>
                <option value="gift">Free Gift</option>
                <option value="treat">Treat</option>
              </select>
              <input id="mkt-rw-val" type="number" placeholder="Val" value="150" class="px-2 py-1.5 rounded-xl bg-blush-50 border border-blush-200 text-[11px] font-bold text-berry" />
              <input id="mkt-rw-prob" type="number" placeholder="Prob%" value="25" class="px-2 py-1.5 rounded-xl bg-blush-50 border border-blush-200 text-[11px] font-bold text-ink" />
              <input id="mkt-rw-qty" type="number" placeholder="Limit" value="50" class="px-2 py-1.5 rounded-xl bg-blush-50 border border-blush-200 text-[11px] font-bold text-ink" />
            </div>
            <button type="button" onclick="addMktRewardPrize()" class="w-full py-2 rounded-full btn-berry text-white text-xs font-extrabold cursor-pointer">+ Add Reward Prize</button>
          </div>

          <div class="space-y-2">
            ${(mktRewards.prizes||[]).map(s=>`
              <div class="bg-white rounded-2xl p-3 shadow-rose-sm border border-blush-100 flex items-center justify-between gap-2">
                <div class="min-w-0">
                  <div class="text-xs font-extrabold text-ink truncate">${s.name}</div>
                  <div class="text-[9.5px] text-ink-muted">Type: ${s.type} \u2022 Val: ${s.value} \u2022 Prob: ${s.probability}% \u2022 Left: ${s.quantityRemaining}/${s.quantityLimit}</div>
                </div>
                <div class="flex items-center gap-1.5 shrink-0">
                  <button type="button" onclick="toggleMktPrizeAvail('${s.id}', ${!s.isAvailable})" class="px-2 py-0.5 rounded-full text-[9px] font-extrabold cursor-pointer ${s.isAvailable!==!1?"bg-emerald-50 text-emerald-700 border border-emerald-200":"bg-blush-100 text-ink-muted"}">${s.isAvailable!==!1?"On":"Off"}</button>
                  <button type="button" onclick="deleteMktPrize('${s.id}')" class="text-[10px] font-bold text-rose-600 cursor-pointer">&times;</button>
                </div>
              </div>`).join("")}
          </div>`}}}async function applyCheckoutPromoCode(){const t=(document.getElementById("checkout-promo-input")?.value||"").trim().toUpperCase(),e=document.getElementById("checkout-promo-msg");if(!t)return;const o=computeSheetTotal(),n=o.base+o.addSum;try{const s=await fetch("/api/promo-codes/validate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:t,subtotal:n})}),a=await s.json();if(!s.ok||!a.valid){sheet.promoDiscount=0,sheet.promoCode="",e&&(e.textContent=a.error||"Invalid promo code",e.className="text-[10px] font-bold text-rose-600 mt-1"),renderOrderSheet();return}sheet.promoCode=a.promo.code,sheet.promoDiscount=a.discountAmount,renderOrderSheet(),typeof showCustomerToast=="function"&&showCustomerToast(`Promo ${a.promo.code} applied (- ${a.discountAmount} ETB)`)}catch{}}async function claimCheckoutMysteryReward(){if(sheet.mysteryClaimedPrize)return;const t=computeSheetTotal(),e=t.base+t.addSum,o=(sheet.custPhone||"guest-"+Date.now()).trim();try{const n=await fetch("/api/rewards/claim",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({orderAmount:e,claimKey:o})}),s=await n.json();if(!n.ok||!s.success){typeof showCustomerToast=="function"&&showCustomerToast(s.error||"Not eligible yet");return}sheet.mysteryClaimedPrize=s.prize,sheet.mysteryRewardDiscount=s.prize.type==="discount"&&Number(s.prize.value)||0,renderOrderSheet(),typeof showCustomerToast=="function"&&showCustomerToast("\u{1F381} Won: "+s.prize.name)}catch{}}let settingsHubTab="packages";const DEFAULT_CUSTOMER_THEME={primary:"#E11D62",secondary:"#C91254",accent:"#F48FB1",background:"#FDF0F4",text:"#1D1116",button:"#E11D62",navbar:"#FFFFFF",header:"#FDF0F4",footer:"#FFFFFF",productCard:"#FFFFFF",border:"#FAD4E2"};let settingsHubState={activePackageId:"pkg-basic",packages:[{id:"pkg-basic",tier:1,name:"Basic",price:3e3,tagline:"Essential online bakery storefront & ordering",billing:"One-time setup",enabled:!0,features:["Customer Mobile Storefront","Full Online Cake Ordering & Cart","Real-Time Order Tracking & Management","Product Catalog Management","CBE & Telebirr Payment Instructions","Bole Kitchen Live Status"],limits:{maxProducts:30,decorations:0,customThemes:!1,staffLimit:1}},{id:"pkg-advanced",tier:2,name:"Advanced",price:5e3,tagline:"Sales analytics, extra decorations & staff accounts",billing:"One-time setup",enabled:!0,features:["Everything in Basic","Sales & Net Profit Analytics","Extra Decorations (Up to 5 items)","Digital Table / QR Ordering Code","1 Additional Staff / Manager Account","Order Status Push Notifications"],limits:{maxProducts:100,decorations:5,customThemes:!1,staffLimit:2}},{id:"pkg-premium",tier:3,name:"Premium",price:1e4,tagline:"Complete digital bakery suite with unlimited features",billing:"One-time setup",enabled:!0,includesPrefix:"Everything in Advanced, plus:",features:["Unlimited Extra Cake Decorations","Custom Storefront Themes & Colors","Homepage Promotional Ad Banners","Mystery Reward Box Feature","Up to 5 Manager Accounts & Permissions","Priority Phone & Kitchen Support","Printable QR Ordering Stickers"],limits:{maxProducts:9999,decorations:999,customThemes:!0,staffLimit:6}}],notifications:{enabled:!0,volume:80,customSounds:[],events:{newOrder:"chime-classic",paymentSubmitted:"chime-rose",paymentVerified:"chime-crystal",orderStatusUpdated:"chime-double"}},customerTheme:{...DEFAULT_CUSTOMER_THEME},general:{language:"en",dateFormat:"MMM D, YYYY",timeFormat:"12h",region:"Africa/Addis_Ababa"}},staffManagersList=[],activeSessionsList=[];function applyCustomerThemeVariables(t=settingsHubState.customerTheme){const e={...DEFAULT_CUSTOMER_THEME,...t||{}};let o=document.getElementById("customer-theme-style-override");if(o||(o=document.createElement("style"),o.id="customer-theme-style-override",document.head.appendChild(o)),o.textContent=`
        #panel-customer {
          --cust-primary: ${e.primary};
          --cust-secondary: ${e.secondary};
          --cust-accent: ${e.accent};
          --cust-bg: ${e.background};
          --cust-text: ${e.text};
          --cust-btn: ${e.button};
          --cust-nav: ${e.navbar};
          --cust-header: ${e.header};
          --cust-footer: ${e.footer};
          --cust-card: ${e.productCard};
          --cust-border: ${e.border};
        }
        #panel-customer .app-canvas { background: ${e.background} !important; color: ${e.text} !important; }
        #panel-customer .text-berry { color: ${e.primary} !important; }
        #panel-customer .bg-berry { background-color: ${e.primary} !important; }
        #panel-customer .border-berry { border-color: ${e.primary} !important; }
        #panel-customer .btn-berry { background: linear-gradient(90deg, ${e.button} 0%, ${e.secondary} 100%) !important; }
        #panel-customer .text-ink { color: ${e.text} !important; }
        #panel-customer nav[aria-label="Customer Navigation"] { background-color: ${e.navbar} !important; border-color: ${e.border} !important; }
        #panel-customer #c-tab-home .bg-white, #panel-customer #c-tab-menu .bg-white { background-color: ${e.productCard} !important; border-color: ${e.border} !important; }
      `,analyticsLocked){const n=container.innerHTML;container.innerHTML=`
          <div class="relative" style="min-height:72vh;">
            <div class="pointer-events-none select-none overflow-hidden" style="filter:blur(5px);opacity:0.65;max-height:74vh;">${n}</div>
            <div class="absolute inset-0 flex items-start justify-center px-4" style="padding-top:64px;background:rgba(255,249,250,0.55);backdrop-filter:blur(3px);">
              <div class="bg-white rounded-3xl p-6 shadow-2xl border border-blush-200 max-w-xs w-full text-center">
                <div style="font-size:38px;line-height:1;margin-bottom:10px;">\u{1F4CA}</div>
                <div style="font-size:15px;font-weight:900;color:#6d28d9;margin-bottom:6px;">Unlock Sales Analytics</div>
                <div style="font-size:11px;color:#6b7280;line-height:1.5;margin-bottom:14px;">See your real revenue, net profit, top-selling cakes &amp; payment channels. Upgrade to <strong style="color:#7c3aed;">Advanced</strong> to earn smarter.</div>
                <div class="text-left" style="display:flex;flex-direction:column;gap:6px;margin-bottom:18px;">
                  ${["\u{1F4C8} Total Revenue & Net Profit","\u{1F3C6} Top Selling Cakes Ranked","\u{1F4B3} Earnings by Payment Channel","\u{1F4CA} Weekly Sales Trend Chart"].map(s=>`<div style="display:flex;align-items:center;gap:8px;font-size:11px;font-weight:600;color:#1f2937;"><span style="color:#10b981;font-weight:900;">\u2713</span><span>${s}</span></div>`).join("")}
                </div>
                <button onclick="openUpgradePlanPage();" style="background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;width:100%;padding:13px;border-radius:50px;font-size:12.5px;font-weight:900;border:none;cursor:pointer;box-shadow:0 4px 15px rgba(124,58,237,0.35);">
                  \u{1F680} View Upgrade Plans \u2192
                </button>
                <div style="font-size:9.5px;color:#6b7280;margin-top:10px;">Pay once \xB7 Contact MAK CAKE after payment</div>
              </div>
            </div>
          </div>`}}function migrateCachedPackages(){try{const t=localStorage.getItem("mak_settings_hub_v1");if(t){const e=JSON.parse(t);e&&e.packages&&e.packages.some(o=>o.id==="pkg-starter"||o.name==="Starter Bakery"||o.id==="pkg-royal")&&(e.packages=settingsHubState.packages,(e.activePackageId==="pkg-starter"||e.activePackageId==="pkg-pro"||e.activePackageId==="pkg-royal"||!e.activePackageId)&&(e.activePackageId="pkg-basic"),localStorage.setItem("mak_settings_hub_v1",JSON.stringify(e))),settingsHubState={...settingsHubState,...e}}}catch{}}async function loadSettingsHubFromDb(){migrateCachedPackages();try{const[t,e,o]=await Promise.all([fetch("/api/admin/settings-hub",{cache:"no-store"}),fetch("/api/managers",{cache:"no-store"}),fetch("/api/admin/security/sessions",{cache:"no-store"})]);if(t.ok){const n=await t.json();if(n.success&&n.settingsHub&&(settingsHubState={...settingsHubState,...n.settingsHub},localStorage.setItem("mak_settings_hub_v1",JSON.stringify(settingsHubState)),applyCustomerThemeVariables(settingsHubState.customerTheme),typeof renderUpgradePlanPage=="function"))try{renderUpgradePlanPage()}catch{}}if(e.ok){const n=await e.json();n.success&&Array.isArray(n.managers)&&(staffManagersList=n.managers)}if(o.ok){const n=await o.json();n.success&&Array.isArray(n.sessions)&&(activeSessionsList=n.sessions)}}catch{}adminTab==="settings"&&renderSettingsHub()}function openSettingsHubSection(){switchAdminTab("settings"),loadSettingsHubFromDb(),checkInitialAdminLockState(),setCustomerLanguage(currentCustomerLang)}function setSettingsHubTab(t){settingsHubTab=t,renderSettingsHub()}async function saveSettingsHubToDb(t="Changes saved successfully!"){await runWithFeedback({lockKey:"save-settings-hub",scope:"admin",loadingMsg:"Saving settings...",successMsg:t||"Changes saved successfully!",action:async()=>{const e=await fetch("/api/admin/settings-hub",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(settingsHubState)}),o=await e.json();if(!e.ok||!o.success)throw new Error(o.error||"Failed to save settings.");return localStorage.setItem("mak_settings_hub_v1",JSON.stringify(settingsHubState)),!0}})}function selectActivePackage(t){const e=settingsHubState.packages.find(o=>o.id===t);if(!e||e.enabled===!1){typeof showAdminToast=="function"&&showAdminToast("Enable package before activating");return}settingsHubState.activePackageId=t,saveSettingsHubToDb(`Active package set to ${e.name}`),renderSettingsHub()}function updateHubPackage(t,e,o){const n=settingsHubState.packages[t];n&&(e==="price"?n.price=Math.max(0,Number(o)||0):e==="enabled"?n.enabled=!!o:n[e]=String(o))}async function addStaffMember(){const t=(document.getElementById("st-new-name")?.value||"").trim(),e=(document.getElementById("st-new-email")?.value||"").trim(),o=(document.getElementById("st-new-phone")?.value||"").trim(),n=document.getElementById("st-new-role")?.value||"Kitchen Staff";if(!t){typeof showAdminToast=="function"&&showAdminToast("Staff name is required");return}(await fetch("/api/managers",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,email:e,phone:o,role:n,permissions:{viewDashboard:!0,viewOrders:!0,manageOrders:n!=="Viewer",manageProducts:n==="Manager"}})})).ok&&(await loadSettingsHubFromDb(),typeof showAdminToast=="function"&&showAdminToast(`Added staff: ${t}`))}async function toggleStaffPermission(t,e,o){(await fetch(`/api/managers/${t}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({permissions:{[e]:!o}})})).ok&&await loadSettingsHubFromDb()}async function removeStaffMember(t){const e=await fetch(`/api/managers/${t}`,{method:"DELETE"}),o=await e.json();if(!e.ok){typeof showAdminToast=="function"&&showAdminToast(o.error||"Cannot remove");return}await loadSettingsHubFromDb(),typeof showAdminToast=="function"&&showAdminToast("Staff account removed")}async function updateAdminSecurityPin(){const t=(document.getElementById("sec-new-pin")?.value||"").trim();if(t.length<4){typeof showAdminToast=="function"&&showAdminToast("Enter at least 4 characters");return}const e=await fetch("/api/admin/security/update-pin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({newPin:t})}),o=await e.json();e.ok&&o.success?(document.getElementById("sec-new-pin").value="",typeof showAdminToast=="function"&&showAdminToast("PIN / Password updated!")):typeof showAdminToast=="function"&&showAdminToast(o.error||"Failed")}async function logoutOtherAdminSessions(){const t=await fetch("/api/admin/security/logout-others",{method:"POST"}),e=await t.json();t.ok&&e.success&&(await loadSettingsHubFromDb(),typeof showAdminToast=="function"&&showAdminToast(e.message||"Other sessions logged out"))}function previewNotificationSound(t){const e=Number(settingsHubState.notifications?.volume??80)/100,o=(settingsHubState.notifications?.customSounds||[]).find(n=>n.id===t||n.url===t);if(o&&o.url){const n=new Audio(o.url);n.volume=e,n.play().catch(()=>{});return}try{const n=new(window.AudioContext||window.webkitAudioContext),s=n.createOscillator(),a=n.createGain(),i={"chime-classic":660,"chime-rose":784,"chime-crystal":987,"chime-double":587};s.type="sine",s.frequency.value=i[t]||660,a.gain.setValueAtTime(Math.max(.05,e*.25),n.currentTime),a.gain.exponentialRampToValueAtTime(.001,n.currentTime+.35),s.connect(a),a.connect(n.destination),s.start(),s.stop(n.currentTime+.36)}catch{}}async function uploadCustomChimeFile(t){const e=t.files&&t.files[0];if(!e)return;const o=new FileReader;o.onload=async n=>{const s=await fetch("/api/admin/chime-upload",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e.name.replace(/.[^.]+$/,""),dataUrl:n.target.result})}),a=await s.json();s.ok&&a.success?(await loadSettingsHubFromDb(),typeof showAdminToast=="function"&&showAdminToast("Custom sound uploaded!")):typeof showAdminToast=="function"&&showAdminToast(a.error||"Upload failed")},o.readAsDataURL(e)}function updateCustomerThemeColor(t,e){if(!/^#[0-9A-Fa-f]{6}$/.test(e))return;settingsHubState.customerTheme[t]=e;const o=document.getElementById("th-pick-"+t),n=document.getElementById("th-hex-"+t);o&&o.value.toLowerCase()!==e.toLowerCase()&&(o.value=e),n&&n.value.toLowerCase()!==e.toLowerCase()&&(n.value=e),applyCustomerThemeVariables(settingsHubState.customerTheme)}function restoreDefaultCustomerTheme(){settingsHubState.customerTheme={...DEFAULT_CUSTOMER_THEME},applyCustomerThemeVariables(settingsHubState.customerTheme),renderSettingsHub(),saveSettingsHubToDb("Restored default customer theme")}function renderSettingsHub(){const t=document.getElementById("settings-hub-pills"),e=[{id:"packages",label:"1. Packages"},{id:"staff",label:"2. Staff"},{id:"security",label:"3. Security"},{id:"sounds",label:"4. Sounds"},{id:"theme",label:"5. Theme"},{id:"general",label:"6. General"}];t&&(t.innerHTML=e.map(s=>{const a=settingsHubTab===s.id;return`<button type="button" onclick="setSettingsHubTab('${s.id}')" class="shrink-0 px-3 py-1.5 rounded-full text-[10.5px] font-bold transition-all cursor-pointer ${a?"btn-berry text-white shadow-rose-sm":"bg-white text-ink-muted border border-blush-200 hover:text-ink"}">${s.label}</button>`}).join(""));const o=document.getElementById("settings-legacy-packages-wrap");o&&o.classList.toggle("hidden",settingsHubTab!=="packages");const n=document.getElementById("settings-hub-body");if(n){if(settingsHubTab==="packages"){const s=settingsHubState.packages.find(r=>r.id===settingsHubState.activePackageId)||settingsHubState.packages[0],a=s?s.tier||getPackageTier(s.id):1,i={"pkg-basic":{icon:"\u{1F9C1}",color:"#0284c7",border:"#bae6fd",bg:"#f0f9ff"},"pkg-advanced":{icon:"\u{1F382}",color:"#7c3aed",border:"#ddd6fe",bg:"#f5f3ff"},"pkg-premium":{icon:"\u{1F451}",color:"#d97706",border:"#fde68a",bg:"#fffbeb"}};n.innerHTML=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-3">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-[10px] font-bold text-ink-muted uppercase">Current Shop Package</div>
                <div class="text-sm font-black text-berry">${s?s.name:"Basic"}</div>
              </div>
              <span class="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9.5px] font-extrabold">Active Plan</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:10px;">
              ${settingsHubState.packages.map(r=>{const l=settingsHubState.activePackageId===r.id,d=(r.tier||getPackageTier(r.id))>a;if(!l&&!d)return"";const u=i[r.id]||i["pkg-basic"],f={"pkg-advanced":{headline:"\u{1F680} Unlock Advanced & Earn More!",sub:"Get Analytics, Extra Decorations & Promo Tools"},"pkg-premium":{headline:"\u{1F451} Go Premium \u2014 Unlimited Growth!",sub:"Custom Storefront, Staff Accounts & Priority Support"}}[r.id]||{headline:"Upgrade to unlock",sub:""};return d?`
                  <div class="relative rounded-2xl overflow-hidden cursor-pointer" style="border:1px solid ${u.border};min-height:112px;" onclick="openUpgradePlanPage()">
                    <div class="pointer-events-none select-none p-3.5 space-y-2" style="filter:blur(4px);opacity:0.35;">
                      <div class="flex items-center justify-between gap-2">
                        <span class="text-xs font-extrabold text-ink">${u.icon} ${r.name}</span>
                        <span class="text-[11px] font-extrabold">${Number(r.price).toLocaleString()} ETB</span>
                      </div>
                      <div class="text-[10px] text-ink-muted">${(r.features||[]).join(" \u2022 ")}</div>
                    </div>
                    <div class="absolute inset-0 flex flex-col items-center justify-center text-center" style="background:rgba(255,255,255,0.78);backdrop-filter:blur(3px);padding:12px 14px;gap:6px;">
                      <div style="font-size:12.5px;font-weight:900;color:${u.color};line-height:1.2;">${f.headline}</div>
                      <div style="font-size:10px;color:#6b7280;line-height:1.3;">${f.sub}</div>
                      <button type="button" onclick="event.stopPropagation(); openUpgradePlanPage();" style="background:${u.bg};color:${u.color};border:1px solid ${u.border};padding:6px 14px;border-radius:9999px;font-size:10.5px;font-weight:800;cursor:pointer;margin-top:2px;">
                        \u2728 Upgrade Now \u2014 ${Number(r.price).toLocaleString()} ETB
                      </button>
                    </div>
                  </div>`:`
                    <div class="rounded-2xl border border-berry/50 bg-blush-50 p-3.5 space-y-2">
                      <div class="flex items-center justify-between gap-2">
                        <div class="flex items-center gap-2">
                          <span style="font-size:16px;">${u.icon}</span>
                          <span class="text-xs font-extrabold text-ink">${r.name}</span>
                        </div>
                        <span class="px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold btn-berry text-white">Current Plan</span>
                      </div>
                      <div class="flex items-center justify-between gap-2">
                        <div class="text-[10px] text-ink-muted leading-snug">${(r.features||[]).slice(0,3).join(" \u2022 ")}</div>
                        <div class="px-2.5 py-1 rounded-lg bg-white border border-blush-200 text-[11px] font-extrabold text-berry shrink-0">${Number(r.price).toLocaleString()} ETB</div>
                      </div>
                    </div>`}).join("")}
            </div>
            ${a<3?'<div class="text-center text-[9.5px] text-ink-muted pt-0.5">\u{1F4A1} Contact MAK CAKE after payment to activate your upgraded plan</div>':""}
          </div>`}else if(settingsHubTab==="staff")n.innerHTML=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-2.5">
            <h3 class="text-xs font-extrabold text-ink">Add Staff Account</h3>
            <div class="grid grid-cols-2 gap-1.5">
              <input id="st-new-name" type="text" placeholder="Full Name" class="px-2.5 py-1.5 rounded-xl bg-blush-50 border border-blush-200 text-xs font-bold text-ink" />
              <select id="st-new-role" class="px-2.5 py-1.5 rounded-xl bg-blush-50 border border-blush-200 text-xs font-bold text-ink">
                <option value="Kitchen Head Baker">Kitchen Baker</option>
                <option value="Cashier & Customer Care">Cashier</option>
                <option value="Dispatch & Delivery Courier">Courier</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
            <div class="grid grid-cols-2 gap-1.5">
              <input id="st-new-email" type="email" placeholder="Email" class="px-2.5 py-1.5 rounded-xl bg-blush-50 border border-blush-200 text-xs text-ink" />
              <input id="st-new-phone" type="tel" placeholder="Phone" class="px-2.5 py-1.5 rounded-xl bg-blush-50 border border-blush-200 text-xs text-ink" />
            </div>
            <button type="button" onclick="addStaffMember()" class="w-full py-2 rounded-full btn-berry text-white text-xs font-extrabold cursor-pointer">+ Add Staff Account</button>
          </div>
          <div class="space-y-2">
            ${staffManagersList.map(s=>`
              <div class="bg-white rounded-2xl p-3 shadow-rose-sm border border-blush-100 space-y-1.5">
                <div class="flex items-center justify-between">
                  <div class="min-w-0">
                    <div class="text-xs font-extrabold text-ink truncate">${s.name}</div>
                    <div class="text-[9.5px] text-berry font-bold">${s.role} \u2022 Active: ${s.lastActive||"Recently"}</div>
                  </div>
                  ${s.role!=="Owner"?`<button type="button" onclick="removeStaffMember('${s.id}')" class="text-[10px] font-bold text-rose-600 cursor-pointer">Remove</button>`:'<span class="px-2 py-0.5 rounded-full bg-blush-100 text-berry text-[9px] font-extrabold">Owner</span>'}
                </div>
                ${s.role!=="Owner"?`
                  <div class="flex flex-wrap gap-1.5 pt-1">
                    ${["manageOrders","manageProducts","viewEarnings","manageSettings"].map(a=>`
                      <button type="button" onclick="toggleStaffPermission('${s.id}', '${a}', ${!!s.permissions?.[a]})" class="px-2 py-0.5 rounded-full text-[9px] font-bold cursor-pointer ${s.permissions?.[a]?"bg-emerald-50 text-emerald-700 border border-emerald-200":"bg-blush-50 text-ink-muted border border-blush-100"}">${a.replace("manage","").replace("view","")}: ${s.permissions?.[a]?"Yes":"No"}</button>
                    `).join("")}
                  </div>`:""}
              </div>`).join("")}
          </div>`;else if(settingsHubTab==="security")n.innerHTML=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-3">
            <h3 class="text-xs font-extrabold text-ink">Security &amp; Login</h3>
            <div>
              <label class="block text-[10.5px] font-bold text-ink-muted mb-1">Change Admin Password / PIN</label>
              <div class="flex gap-1.5">
                <input id="sec-new-pin" type="password" placeholder="New PIN or Password (min 4 chars)" class="flex-1 px-3 py-2 rounded-xl bg-blush-50 border border-blush-200 text-xs font-bold text-ink" />
                <button type="button" onclick="updateAdminSecurityPin()" class="px-3 py-2 rounded-xl btn-berry text-white text-xs font-bold cursor-pointer">Update</button>
              </div>
            </div>
            <div class="pt-2 border-t border-blush-100 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-extrabold text-ink">Active Sessions (${activeSessionsList.length})</span>
                <button type="button" onclick="logoutOtherAdminSessions()" class="px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 text-[10px] font-extrabold cursor-pointer">Log Out Others</button>
              </div>
              ${activeSessionsList.map(s=>`
                <div class="p-2.5 rounded-xl bg-blush-50/70 border border-blush-100 flex items-center justify-between text-[10.5px]">
                  <div>
                    <div class="font-bold text-ink">${s.email} (${s.provider})</div>
                    <div class="text-[9.5px] text-ink-muted">ID: ${s.id}</div>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-extrabold ${s.current?"bg-emerald-50 text-emerald-700":"bg-white text-ink-muted"}">${s.current?"Current":"Active"}</span>
                </div>`).join("")}
            </div>
          </div>`;else if(settingsHubTab==="sounds"){const s=settingsHubState.notifications||{},a=s.events||{},i=[{id:"chime-classic",name:"Classic Bakery Bell"},{id:"chime-rose",name:"Soft Rose Chime"},{id:"chime-crystal",name:"Crystal Ding"},{id:"chime-double",name:"Double Kitchen Chime"},...(s.customSounds||[]).map(l=>({id:l.id,name:"\u{1F3B5} "+l.name}))],r=[{key:"newOrder",label:"New Orders"},{key:"paymentSubmitted",label:"Payment Submitted"},{key:"paymentVerified",label:"Payment Verified"},{key:"orderStatusUpdated",label:"Order Status Updated"}];n.innerHTML=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-extrabold text-ink">Notifications &amp; Custom Chime</h3>
              <label class="flex items-center gap-1.5 text-[10.5px] font-bold cursor-pointer">
                <input type="checkbox" ${s.enabled!==!1?"checked":""} onchange="settingsHubState.notifications.enabled = this.checked" class="w-4 h-4 accent-berry" /> Enabled
              </label>
            </div>
            <div>
              <div class="flex justify-between text-[10.5px] font-bold text-ink-muted mb-1"><span>Volume</span><span>${s.volume??80}%</span></div>
              <input type="range" min="0" max="100" value="${s.volume??80}" oninput="settingsHubState.notifications.volume = Number(this.value)" class="w-full accent-berry" />
            </div>
            <div class="space-y-2">
              ${r.map(l=>`
                <div class="flex items-center justify-between gap-2">
                  <span class="text-[11px] font-bold text-ink">${l.label}</span>
                  <div class="flex items-center gap-1">
                    <select onchange="settingsHubState.notifications.events['${l.key}'] = this.value" class="px-2 py-1 rounded-xl bg-blush-50 border border-blush-200 text-[10.5px] font-bold text-ink">
                      ${i.map(c=>`<option value="${c.id}" ${a[l.key]===c.id?"selected":""}>${c.name}</option>`).join("")}
                    </select>
                    <button type="button" onclick="previewNotificationSound(settingsHubState.notifications.events['${l.key}'] || 'chime-classic')" class="px-2 py-1 rounded-xl bg-blush-100 text-berry text-[10px] font-extrabold cursor-pointer">\u25B6</button>
                  </div>
                </div>`).join("")}
            </div>
            <div class="pt-2 border-t border-blush-100 flex items-center justify-between gap-2">
              <input id="hub-chime-file" type="file" accept="audio/mpeg,audio/mp3,audio/wav,.mp3,.wav" class="hidden" onchange="uploadCustomChimeFile(this)" />
              <button type="button" onclick="document.getElementById('hub-chime-file').click()" class="px-3 py-2 rounded-full bg-blush-50 border border-blush-200 text-berry text-[10.5px] font-extrabold cursor-pointer">+ Upload MP3 / WAV</button>
              <button type="button" onclick="saveSettingsHubToDb('Sound preferences saved!')" class="px-4 py-2 rounded-full btn-berry text-white text-xs font-extrabold cursor-pointer">Save Sounds</button>
            </div>
          </div>`}else if(settingsHubTab==="theme"){const s=settingsHubState.customerTheme||DEFAULT_CUSTOMER_THEME,a=[{key:"primary",label:"Primary"},{key:"secondary",label:"Secondary"},{key:"accent",label:"Accent"},{key:"background",label:"Background"},{key:"text",label:"Text"},{key:"button",label:"Button"},{key:"navbar",label:"Nav Bar"},{key:"header",label:"Header"},{key:"footer",label:"Footer"},{key:"productCard",label:"Product Card"},{key:"border",label:"Border"}];n.innerHTML=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-3">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-xs font-extrabold text-ink">Customer Website Theme Editor</h3>
                <p class="text-[9.5px] text-ink-muted">Live preview on Customer Phone only (Admin stays unchanged)</p>
              </div>
              <button type="button" onclick="restoreDefaultCustomerTheme()" class="px-2.5 py-1 rounded-full bg-blush-50 border border-blush-200 text-berry text-[10px] font-extrabold cursor-pointer">Restore Default</button>
            </div>
            <div class="grid grid-cols-1 gap-1.5">
              ${a.map(i=>`
                <div class="flex items-center justify-between gap-2 p-2 rounded-xl bg-blush-50/60 border border-blush-100">
                  <span class="text-[11px] font-bold text-ink">${i.label}</span>
                  <div class="flex items-center gap-1.5">
                    <input id="th-pick-${i.key}" type="color" value="${s[i.key]||"#E11D62"}" oninput="updateCustomerThemeColor('${i.key}', this.value)" class="w-7 h-7 rounded-lg border border-blush-200 cursor-pointer bg-white" />
                    <input id="th-hex-${i.key}" type="text" value="${s[i.key]||"#E11D62"}" onchange="updateCustomerThemeColor('${i.key}', this.value)" class="w-20 px-2 py-1 rounded-lg bg-white border border-blush-200 text-[10.5px] font-mono font-bold text-ink uppercase" />
                  </div>
                </div>`).join("")}
            </div>
            <button type="button" onclick="saveSettingsHubToDb('Customer theme saved permanently!')" class="w-full py-2.5 rounded-full btn-berry text-white text-xs font-extrabold cursor-pointer">Save Customer Theme</button>
          </div>`}else if(settingsHubTab==="general"){const s=settingsHubState.general||{};n.innerHTML=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-2.5">
            <h3 class="text-xs font-extrabold text-ink">General Preferences</h3>
            <div>
              <label class="block text-[10.5px] font-bold text-ink-muted mb-1">Language</label>
              <select onchange="settingsHubState.general.language = this.value" class="w-full px-3 py-2 rounded-xl bg-blush-50 border border-blush-200 text-xs font-bold text-ink">
                <option value="en" ${s.language==="en"?"selected":""}>English</option>
                <option value="am" ${s.language==="am"?"selected":""}>Amharic (\u12A0\u121B\u122D\u129B)</option>
                <option value="om" ${s.language==="om"?"selected":""}>Afaan Oromoo</option>
              </select>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-[10.5px] font-bold text-ink-muted mb-1">Date Format</label>
                <select onchange="settingsHubState.general.dateFormat = this.value" class="w-full px-2.5 py-2 rounded-xl bg-blush-50 border border-blush-200 text-xs font-bold text-ink">
                  <option value="MMM D, YYYY" ${s.dateFormat==="MMM D, YYYY"?"selected":""}>Nov 25, 2026</option>
                  <option value="DD/MM/YYYY" ${s.dateFormat==="DD/MM/YYYY"?"selected":""}>25/11/2026</option>
                  <option value="YYYY-MM-DD" ${s.dateFormat==="YYYY-MM-DD"?"selected":""}>2026-11-25</option>
                </select>
              </div>
              <div>
                <label class="block text-[10.5px] font-bold text-ink-muted mb-1">Time Format</label>
                <select onchange="settingsHubState.general.timeFormat = this.value" class="w-full px-2.5 py-2 rounded-xl bg-blush-50 border border-blush-200 text-xs font-bold text-ink">
                  <option value="12h" ${s.timeFormat==="12h"?"selected":""}>12-Hour (AM/PM)</option>
                  <option value="24h" ${s.timeFormat==="24h"?"selected":""}>24-Hour</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-[10.5px] font-bold text-ink-muted mb-1">Region &amp; Timezone</label>
              <select onchange="settingsHubState.general.region = this.value" class="w-full px-3 py-2 rounded-xl bg-blush-50 border border-blush-200 text-xs font-bold text-ink">
                <option value="Africa/Addis_Ababa" ${s.region==="Africa/Addis_Ababa"?"selected":""}>Addis Ababa, Ethiopia (EAT \u2022 ETB)</option>
                <option value="UTC" ${s.region==="UTC"?"selected":""}>UTC</option>
              </select>
            </div>
            <button type="button" onclick="saveSettingsHubToDb('General preferences saved!')" class="w-full py-2.5 rounded-full btn-berry text-white text-xs font-extrabold cursor-pointer">Save General Preferences</button>
          </div>`}}}let upgradeTargetPkgId=null,upgradeReceiptDataUrl="",upgradeReceiptFileName="";function getPackageTier(t){return t==="pkg-premium"||t==="pkg-royal"?3:t==="pkg-advanced"||t==="pkg-pro"?2:1}function getCurrentPackageObj(){const t=settingsHubState.packages||[],e=settingsHubState.activePackageId||"pkg-basic";return t.find(o=>o.id===e)||t[0]||{id:"pkg-basic",tier:1,name:"Basic",price:3e3,limits:{}}}function getUpgradeDifference(t,e){return Math.max(0,Number(e?.price||0)-Number(t?.price||0))}function hasPackageFeature(t){const e=getCurrentPackageObj(),o=e.tier||getPackageTier(e.id),n=["website","ordering","orders","dashboard","products","payments","businessInfo"],s=["analytics","decorations_5","qr_code","staff_1"],a=["decorations_unlimited","google_business","custom_theme","mystery_box","seo","homepage_ads","staff_5","advanced_permissions","qr_stickers"];return n.includes(t)?!0:s.includes(t)?o>=2:a.includes(t)?o>=3:!0}function openUpgradePlanPage(){switchAdminTab("upgrade-plan"),loadSettingsHubFromDb().then(()=>renderUpgradePlanPage()),renderUpgradePlanPage()}function selectUpgradePayMethod(t){const e=document.getElementById("upg-pay-method");e&&(e.value=t);const o=document.getElementById("upg-method-cbe"),n=document.getElementById("upg-method-tb");o&&(o.className=t==="CBE"?"p-2.5 rounded-2xl border-2 border-berry bg-blush-50 text-left flex items-center gap-2 transition-all cursor-pointer":"p-2.5 rounded-2xl border border-blush-200 bg-white text-left flex items-center gap-2 transition-all cursor-pointer"),n&&(n.className=t==="Telebirr"?"p-2.5 rounded-2xl border-2 border-berry bg-blush-50 text-left flex items-center gap-2 transition-all cursor-pointer":"p-2.5 rounded-2xl border border-blush-200 bg-white text-left flex items-center gap-2 transition-all cursor-pointer")}function clearUpgradeReceiptPreview(){upgradeReceiptDataUrl="",upgradeReceiptFileName="";const t=document.getElementById("upg-pay-receipt");t&&(t.value="");const e=document.getElementById("upg-receipt-label");e&&(e.textContent="Tap to upload receipt (PNG, JPG, PDF)"),document.getElementById("upg-receipt-dropzone")?.classList.remove("hidden");const o=document.getElementById("upg-receipt-preview-box");o&&o.classList.add("hidden");const n=document.getElementById("upg-receipt-preview-img");n&&(n.src="")}function handleUpgradeReceiptUpload(t){const e=t.files&&t.files[0];if(!e)return;upgradeReceiptFileName=e.name;const o=document.getElementById("upg-receipt-label");o&&(o.textContent="\u2713 "+e.name);const n=e.type==="application/pdf"||/\.pdf$/i.test(e.name),s=new FileReader;s.onload=a=>{upgradeReceiptDataUrl=a.target.result;const i=document.getElementById("upg-receipt-dropzone"),r=document.getElementById("upg-receipt-preview-box"),l=document.getElementById("upg-receipt-img-wrap"),c=document.getElementById("upg-receipt-pdf-wrap"),d=document.getElementById("upg-receipt-preview-img"),u=document.getElementById("upg-receipt-preview-name");u&&(u.textContent=e.name),n?(l?.classList.add("hidden"),c?.classList.remove("hidden"),c?.classList.add("flex")):(d&&(d.src=upgradeReceiptDataUrl),l?.classList.remove("hidden"),c?.classList.add("hidden"),c?.classList.remove("flex")),i?.classList.add("hidden"),r?.classList.remove("hidden")},s.readAsDataURL(e)}function copyUpgradeAccountNumber(t,e){const o=()=>{if(t){const n=t.dataset.origHtml||t.innerHTML;t.dataset.origHtml=n,t.className="px-2.5 py-1.5 rounded-xl bg-emerald-500 border border-emerald-500 text-white text-[10px] font-extrabold flex items-center gap-1 transition-all shrink-0 shadow-xs",t.innerHTML='<svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg><span>Copied!</span>',clearTimeout(t._copyT),t._copyT=setTimeout(()=>{t.className="px-2.5 py-1.5 rounded-xl bg-blush-50 hover:bg-blush-100 border border-blush-200 text-berry text-[10px] font-extrabold flex items-center gap-1 transition-all cursor-pointer shrink-0",t.innerHTML=n},2200)}typeof showAdminToast=="function"&&showAdminToast("Copied "+e+"!","success")};navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(String(e)).then(o).catch(()=>{fallbackCopyText(String(e)),o()}):(fallbackCopyText(String(e)),o())}function fallbackCopyText(t){try{const e=document.createElement("textarea");e.value=t,e.style.position="fixed",e.style.opacity="0",document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e)}catch{}}function showPackageUpgradePrompt(t){const e=(settingsHubState.packages||[]).find(a=>a.id===t);if(!e)return;const n={"pkg-advanced":{icon:"\u{1F680}",color:"#7c3aed",bg:"#f5f3ff",border:"#c4b5fd",headline:"Unlock Advanced Plan",perks:["\u{1F4CA} Sales & Net Profit Analytics","\u{1F380} Extra Cake Decorations","\u{1F39F}\uFE0F Promo Codes & Discounts","\u{1F49D} Reward Box for Loyal Customers"]},"pkg-premium":{icon:"\u{1F451}",color:"#d97706",bg:"#fffbeb",border:"#fcd34d",headline:"Go Premium \u2014 Unlimited!",perks:["\u2705 Everything in Advanced","\u{1F3A8} Custom Storefront Theme","\u{1F465} Staff & Manager Accounts","\u2B50 Priority Support from MAK CAKE"]}}[t]||{icon:"\u2728",color:"#be185d",bg:"#fff1f2",border:"#fda4af",headline:"Upgrade Your Plan",perks:[]};document.getElementById("pkg-upgrade-prompt")?.remove();const s=document.createElement("div");if(s.id="pkg-upgrade-prompt",s.style.cssText="position:fixed;inset:0;z-index:9999;display:flex;align-items:flex-end;justify-content:center;background:rgba(0,0,0,0.45);backdrop-filter:blur(4px);",s.innerHTML=`
        <div style="background:#fff;border-radius:28px 28px 0 0;padding:28px 24px 36px;max-width:420px;width:100%;animation:slideUp .3s ease;">
          <div style="text-align:center;margin-bottom:20px;">
            <div style="font-size:40px;margin-bottom:8px;">${n.icon}</div>
            <div style="font-size:17px;font-weight:900;color:${n.color};margin-bottom:4px;">${n.headline}</div>
            <div style="font-size:11px;color:#6b7280;">${e.name} Plan \u2014 <strong style="color:${n.color}">${Number(e.price).toLocaleString()} ETB</strong></div>
          </div>
          <div style="background:${n.bg};border:1px solid ${n.border};border-radius:16px;padding:14px 16px;margin-bottom:20px;space-y:8px;">
            ${n.perks.map(a=>`<div style="font-size:11.5px;font-weight:700;color:#374151;padding:4px 0;border-bottom:1px solid ${n.border}20;">${a}</div>`).join("")}
          </div>
          <p style="font-size:10.5px;color:#6b7280;text-align:center;margin-bottom:16px;">Pay once, unlock instantly. Contact MAK CAKE admin to activate your plan after payment.</p>
          <button onclick="document.getElementById('pkg-upgrade-prompt').remove(); document.querySelector('[data-settings-tab=\\'packages\\']')?.click() || switchAdminTab('settings');" style="width:100%;padding:14px;border-radius:50px;background:linear-gradient(135deg,${n.color},${n.border});color:#fff;font-size:13px;font-weight:900;border:none;cursor:pointer;margin-bottom:10px;">
            \u2728 Upgrade to ${e.name} \u2014 ${Number(e.price).toLocaleString()} ETB
          </button>
          <button onclick="document.getElementById('pkg-upgrade-prompt').remove();" style="width:100%;padding:11px;border-radius:50px;background:transparent;color:#9ca3af;font-size:11px;font-weight:700;border:1px solid #e5e7eb;cursor:pointer;">
            Maybe later
          </button>
        </div>`,s.addEventListener("click",a=>{a.target===s&&s.remove()}),document.body.appendChild(s),!document.getElementById("pkg-upgrade-anim")){const a=document.createElement("style");a.id="pkg-upgrade-anim",a.textContent="@keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}",document.head.appendChild(a)}}function openUpgradeConfirmModal(t){const e=getCurrentPackageObj(),o=(settingsHubState.packages||[]).find(i=>i.id===t);if(!o)return;upgradeTargetPkgId=o.id,upgradeReceiptDataUrl="",upgradeReceiptFileName="";const n=getUpgradeDifference(e,o);document.getElementById("upg-modal-form-view")?.classList.remove("hidden"),document.getElementById("upg-modal-thankyou-view")?.classList.add("hidden"),document.getElementById("upg-modal-congrats-view")?.classList.add("hidden");const s=document.getElementById("upg-modal-pkg-sub");s&&(s.textContent=`${e.name} \u2192 ${o.name} Upgrade`),document.getElementById("upg-calc-current")&&(document.getElementById("upg-calc-current").textContent=`${e.name} (${Number(e.price).toLocaleString()} ETB)`),document.getElementById("upg-calc-target")&&(document.getElementById("upg-calc-target").textContent=`${o.name} (${Number(o.price).toLocaleString()} ETB)`),document.getElementById("upg-calc-diff")&&(document.getElementById("upg-calc-diff").textContent=`${n.toLocaleString()} ETB`),clearUpgradeReceiptPreview();const a=document.getElementById("upg-modal-accounts");if(a){const i=settingsHubState.payments||shopMgmtState?.payments||{},r=i.cbe?.accountNumber||SHOP_SETTINGS_CONFIG.cbeAccount,l=i.telebirr?.accountNumber||SHOP_SETTINGS_CONFIG.telebirrNumber;a.innerHTML=`
          <div class="flex items-center justify-between gap-2 p-2 rounded-xl bg-white border border-blush-200/80">
            <div class="min-w-0">
              <div class="text-[10px] font-bold text-ink-muted">CBE \u2022 ${i.cbe?.accountHolder||"MAK Cake Artisanal Bakery"}</div>
              <div class="text-xs font-mono font-extrabold text-ink select-all">${r}</div>
            </div>
            <button type="button" onclick="copyUpgradeAccountNumber(this, '${r}')" class="px-2.5 py-1.5 rounded-xl bg-blush-50 hover:bg-blush-100 border border-blush-200 text-berry text-[10px] font-extrabold flex items-center gap-1 transition-all cursor-pointer shrink-0">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              <span>Copy</span>
            </button>
          </div>
          <div class="flex items-center justify-between gap-2 p-2 rounded-xl bg-white border border-blush-200/80">
            <div class="min-w-0">
              <div class="text-[10px] font-bold text-ink-muted">Telebirr \u2022 ${i.telebirr?.accountHolder||"MAK Cake Bakery"}</div>
              <div class="text-xs font-mono font-extrabold text-ink select-all">${l}</div>
            </div>
            <button type="button" onclick="copyUpgradeAccountNumber(this, '${l}')" class="px-2.5 py-1.5 rounded-xl bg-blush-50 hover:bg-blush-100 border border-blush-200 text-berry text-[10px] font-extrabold flex items-center gap-1 transition-all cursor-pointer shrink-0">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              <span>Copy</span>
            </button>
          </div>
        `}selectUpgradePayMethod("CBE"),document.getElementById("upg-modal-backdrop")?.classList.remove("hidden"),document.getElementById("upg-confirm-modal")?.classList.remove("hidden")}function closeUpgradeConfirmModal(){document.getElementById("upg-modal-backdrop")?.classList.add("hidden"),document.getElementById("upg-confirm-modal")?.classList.add("hidden")}async function submitPackageUpgradeRequest(){const t=document.getElementById("upg-pay-method")?.value||"CBE",e=document.getElementById("upg-submit-btn");if(!upgradeReceiptDataUrl){showAdminToast("Please upload your payment receipt (image or PDF).","error");return}await runWithFeedback({lockKey:"submit-upgrade-request",btnEl:e,scope:"admin",loadingMsg:"Submitting payment receipt...",successMsg:"Submitted successfully!",action:async()=>{const o=await fetch("/api/admin/upgrade-request",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({targetPackageId:upgradeTargetPkgId,paymentMethod:t,receiptImg:upgradeReceiptDataUrl,receiptName:upgradeReceiptFileName})}),n=await o.json();if(!o.ok||!n.success)throw new Error(n.error||"Could not submit upgrade request.");return settingsHubState.pendingUpgradeRequest=n.pendingUpgradeRequest,document.getElementById("upg-modal-form-view")?.classList.add("hidden"),document.getElementById("upg-modal-congrats-view")?.classList.add("hidden"),document.getElementById("upg-modal-thankyou-view")?.classList.remove("hidden"),document.getElementById("upg-ty-pkg")&&(document.getElementById("upg-ty-pkg").textContent=n.pendingUpgradeRequest.targetPackageName),document.getElementById("upg-ty-amt")&&(document.getElementById("upg-ty-amt").textContent=Number(n.pendingUpgradeRequest.amount).toLocaleString()+" ETB"),renderUpgradePlanPage(),!0}})}async function verifyPendingUpgradePayment(t="approve"){await runWithFeedback({lockKey:"verify-upgrade-payment",scope:"admin",loadingMsg:t==="approve"?"Approving payment & activating plan...":"Updating status...",successMsg:t==="approve"?"Changes saved successfully!":"Upgrade request marked Rejected.",action:async()=>{const e=await fetch("/api/admin/upgrade-verify",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:t})}),o=await e.json();if(!e.ok||!o.success)throw new Error(o.error||"Verification failed.");return await loadSettingsHubFromDb(),renderUpgradePlanPage(),o.status==="Approved"&&(document.getElementById("upg-modal-form-view")?.classList.add("hidden"),document.getElementById("upg-modal-thankyou-view")?.classList.add("hidden"),document.getElementById("upg-modal-congrats-view")?.classList.remove("hidden"),document.getElementById("upg-congrats-pkg-line")&&(document.getElementById("upg-congrats-pkg-line").textContent=`Active Plan: ${o.targetPackageName||getCurrentPackageObj().name}`),document.getElementById("upg-modal-backdrop")?.classList.remove("hidden"),document.getElementById("upg-confirm-modal")?.classList.remove("hidden")),!0}})}async function cancelPendingUpgradePayment(){await fetch("/api/admin/upgrade-cancel",{method:"POST"}),settingsHubState.pendingUpgradeRequest=null,renderUpgradePlanPage(),showAdminToast("Upgrade request cleared")}function renderUpgradePlanPage(){const t=getCurrentPackageObj(),e=t.tier||getPackageTier(t.id),o=document.getElementById("upg-current-badge");o&&(o.textContent="Current: "+t.name);const n=document.getElementById("drawer-current-plan-sub");n&&(n.textContent="Current: "+t.name);const s=document.getElementById("upg-cards-container");if(!s)return;const a=settingsHubState.pendingUpgradeRequest;let i="";a&&(a.status==="Under Review"||a.status==="Pending Verification"?i=`
            <div class="bg-amber-50 border border-amber-200 rounded-[22px] p-3.5 space-y-2">
              <div class="flex items-center justify-between gap-2">
                <div class="text-xs font-extrabold text-amber-900">Upgrade Request: ${a.targetPackageName}</div>
                <span class="px-2.5 py-0.5 rounded-full bg-amber-200/80 text-amber-900 text-[9px] font-extrabold">Under Review</span>
              </div>
              <p class="text-[10.5px] text-amber-800">
                Submitted <strong>${Number(a.amount).toLocaleString()} ETB</strong> via ${a.paymentMethod}. Your current <strong>${t.name}</strong> plan stays active while under review.
              </p>
              <div class="flex items-center gap-1.5 pt-0.5">
                <button type="button" onclick="verifyPendingUpgradePayment('approve')" class="flex-1 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[10.5px] font-extrabold shadow-xs cursor-pointer">Approve</button>
                <button type="button" onclick="verifyPendingUpgradePayment('reject')" class="px-3 py-2 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[10.5px] font-bold cursor-pointer">Reject</button>
                <button type="button" onclick="cancelPendingUpgradePayment()" class="px-2.5 py-2 rounded-full bg-white border border-amber-200 text-amber-900 text-[10.5px] font-bold cursor-pointer">Cancel</button>
              </div>
            </div>`:a.status==="Rejected"&&(i=`
            <div class="bg-rose-50 border border-rose-200 rounded-[22px] p-3.5 space-y-2">
              <div class="flex items-center justify-between gap-2">
                <div class="text-xs font-extrabold text-rose-800">Upgrade Payment Rejected</div>
                <span class="px-2.5 py-0.5 rounded-full bg-rose-200 text-rose-800 text-[9px] font-extrabold">Rejected</span>
              </div>
              <p class="text-[10.5px] text-rose-700">${a.rejectReason||"Receipt could not be verified. Please upload a valid receipt."}</p>
              <button type="button" onclick="openUpgradeConfirmModal('${a.targetPackageId}')" class="w-full py-2 rounded-full btn-berry text-white text-[11px] font-extrabold cursor-pointer">Re-submit Payment Receipt</button>
            </div>`));const l=(settingsHubState.packages||[]).map(c=>{const d=c.tier||getPackageTier(c.id),u=c.id===t.id,m=d<e,f=d>e,g=getUpgradeDifference(t,c);let b="";if(u?b='<button type="button" disabled class="w-full py-2.5 rounded-full bg-blush-100 border border-berry/30 text-berry text-xs font-extrabold opacity-80 cursor-not-allowed">Current Plan</button>':m?b='<button type="button" disabled class="w-full py-2.5 rounded-full bg-stone-100 border border-stone-200 text-stone-500 text-xs font-bold cursor-not-allowed">Included in Current Plan</button>':f&&(b=`<button type="button" onclick="openUpgradeConfirmModal('${c.id}')" class="w-full py-2.5 rounded-full btn-berry text-white text-xs font-extrabold shadow-rose-sm active:scale-95 transition-all cursor-pointer">Upgrade (${g.toLocaleString()} ETB) &rarr;</button>`),c.id==="pkg-premium"){const x=u?'<button type="button" disabled class="w-full py-2.5 rounded-full bg-white/80 border border-berry/30 text-berry text-xs font-extrabold cursor-not-allowed">Current Plan</button>':`<button type="button" onclick="openUpgradeConfirmModal('${c.id}')" class="w-full py-3 rounded-full bg-gradient-to-r from-[#C91254] via-[#E11D62] to-[#EC4899] hover:opacity-95 text-white text-xs font-extrabold shadow-rose-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-amber-200" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/></svg>
                <span>Upgrade to Premium (${g.toLocaleString()} ETB) &rarr;</span>
              </button>`;return`
            <div class="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[#FFF6F9] via-white to-[#FDE7F0] shadow-rose-md border-2 ${u?"border-berry ring-2 ring-berry/20":"border-berry/45"}">
              <div class="bg-gradient-to-r from-[#C91254] via-[#E11D62] to-[#EC4899] px-4 py-1.5 flex items-center justify-between text-white">
                <div class="flex items-center gap-1.5 text-[9.5px] font-extrabold uppercase tracking-wider">
                  <svg class="w-3.5 h-3.5 text-amber-200" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/></svg>
                  <span>Full Digital Growth Suite</span>
                </div>
                ${u?'<span class="px-2 py-0.5 rounded-full bg-white text-berry text-[8.5px] font-black">CURRENT PLAN</span>':'<span class="px-2 py-0.5 rounded-full bg-white/20 text-white text-[8.5px] font-extrabold">ALL FEATURES</span>'}
              </div>

              <div class="p-4 space-y-3">
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <h3 class="font-serif text-[17px] font-extrabold text-ink leading-tight">${c.name}</h3>
                    <p class="text-[10.5px] text-ink-muted mt-0.5 leading-snug">${c.tagline||""}</p>
                  </div>
                  <div class="text-right shrink-0 bg-white/90 px-2.5 py-1.5 rounded-2xl border border-blush-200 shadow-2xs">
                    <div class="text-base font-black text-berry leading-none">${Number(c.price).toLocaleString()} <span class="text-[10px]">ETB</span></div>
                    <div class="text-[8.5px] font-bold text-ink-muted mt-0.5">${f?"Pay "+g.toLocaleString()+" ETB diff":c.billing||"One-time setup"}</div>
                  </div>
                </div>

                <div class="text-[10.5px] font-extrabold text-berry pt-1.5 border-t border-berry/15">${c.includesPrefix||"Everything in Advanced, plus:"}</div>

                <ul class="space-y-1.5">
                  ${(c.features||[]).map(w=>`
                    <li class="flex items-start gap-2 text-[11px] text-ink font-medium">
                      <span class="w-4 h-4 rounded-full bg-gradient-to-br from-berry to-berry-dark text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                      <span class="leading-snug">${w}</span>
                    </li>
                  `).join("")}
                </ul>

                <div class="pt-1">${x}</div>
              </div>
            </div>
          `}return`
          <div class="bg-white rounded-[24px] p-4 shadow-rose-sm border ${u?"border-2 border-berry ring-2 ring-berry/15":"border-blush-200/80"} space-y-3">
            <div class="flex items-start justify-between gap-2">
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="text-sm font-black text-ink">${c.name}</h3>
                  ${u?'<span class="px-2 py-0.5 rounded-full bg-berry text-white text-[9px] font-extrabold tracking-wide">CURRENT PLAN</span>':""}
                </div>
                <p class="text-[10.5px] text-ink-muted mt-0.5 leading-snug">${c.tagline||""}</p>
              </div>
              <div class="text-right shrink-0">
                <div class="text-base font-black text-berry">${Number(c.price).toLocaleString()} <span class="text-[10px]">ETB</span></div>
                <div class="text-[9px] font-semibold text-ink-muted">${f?"Pay "+g.toLocaleString()+" ETB diff":c.billing||"One-time setup"}</div>
              </div>
            </div>

            ${c.includesPrefix?`<div class="text-[10.5px] font-extrabold text-berry pt-1 border-t border-blush-100">${c.includesPrefix}</div>`:'<div class="border-t border-blush-100"></div>'}

            <ul class="space-y-1.5">
              ${(c.features||[]).map(x=>`
                <li class="flex items-start gap-2 text-[11px] ${u||m?"text-ink font-semibold":"text-ink-muted"}">
                  <span class="w-4 h-4 rounded-full ${u||m?"bg-emerald-500 text-white":"bg-blush-100 text-berry"} flex items-center justify-center shrink-0 mt-0.5">
                    <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span class="leading-snug">${x}</span>
                </li>
              `).join("")}
            </ul>

            <div class="pt-1">${b}</div>
          </div>
        `}).join("");s.innerHTML=i+l}
