let adminNotifications=[{id:101,type:"order",title:"New Order #ORD-10048",desc:"Abebe Kebede \u2022 2,750 ETB \u2022 Red Velvet Cake",time:"8m ago",unread:!0,action:()=>{toggleAdminNotifications(!1),switchAdminTab("orders"),setAdminFilter("All")}},{id:102,type:"payment",title:"Payment Pending Review",desc:"Selamawit Bekele uploaded CBE transfer receipt for #ORD-10047",time:"24m ago",unread:!0,action:()=>{toggleAdminNotifications(!1),switchAdminTab("orders"),setAdminFilter("Payment Pending")}},{id:103,type:"system",title:"Bole Kitchen Online",desc:"Bakery open & accepting chilled delivery orders in Addis",time:"1h ago",unread:!1,action:()=>{toggleAdminNotifications(!1),switchAdminTab("overview")}}];function toggleAdminNotifications(t){const e=document.getElementById("admin-notif-modal"),o=document.getElementById("admin-notif-backdrop");if(!e||!o)return;(t!==void 0?t:e.classList.contains("hidden"))?(renderAdminNotifications(),o.classList.remove("hidden"),e.classList.remove("hidden")):(o.classList.add("hidden"),e.classList.add("hidden"))}function renderAdminNotifications(){const t=document.getElementById("admin-notif-list"),e=document.getElementById("admin-notif-badge");if(!t)return;const o=adminNotifications.filter(n=>n.unread).length;if(e&&(e.textContent=o,e.classList.toggle("hidden",o===0)),!adminNotifications.length){t.innerHTML=`
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
      `).join("")}function handleAdminNotificationClick(t){const e=adminNotifications.find(o=>o.id===t);e&&(e.unread=!1,renderAdminNotifications(),typeof e.action=="function"&&e.action())}function clearAdminNotifications(){adminNotifications.forEach(t=>t.unread=!1),renderAdminNotifications(),showAdminToast("All notifications marked as read")}function addAdminNotification(t,e,o="system",n=null){adminNotifications.unshift({id:Date.now(),type:o,title:t,desc:e,time:"Just now",unread:!0,action:n||(()=>toggleAdminNotifications(!1))}),renderAdminNotifications()}let quickUploadActivePhoto="",quickUploadProductType="cake";function openQuickUploadModal(){toggleAdminNotifications(!1),quickUploadActivePhoto="",quickUploadProductType="cake",document.getElementById("quick-cake-name").value="",document.getElementById("quick-cake-price").value="2800",document.getElementById("quick-cake-desc").value="",document.getElementById("quick-cake-stock").value="true",setQuickProductType("cake");const t=document.getElementById("quick-upload-step-choose"),e=document.getElementById("quick-upload-step-details");t&&t.classList.remove("hidden"),e&&e.classList.add("hidden");const o=document.getElementById("quick-modal-title"),n=document.getElementById("quick-step-indicator");o&&(o.textContent="Add New Creation"),n&&(n.textContent="Choose photo source first");const s=document.getElementById("quick-photo-preview-img");s&&(s.src="");const a=document.getElementById("quick-upload-backdrop"),r=document.getElementById("quick-upload-sheet");a&&a.classList.remove("hidden"),r&&(r.classList.remove("hidden"),requestAnimationFrame(()=>r.classList.remove("translate-y-full")))}function closeQuickUploadModal(){const t=document.getElementById("quick-upload-backdrop"),e=document.getElementById("quick-upload-sheet");e&&e.classList.add("translate-y-full"),setTimeout(()=>{t&&t.classList.add("hidden"),e&&e.classList.add("hidden")},300)}function triggerQuickCamera(){const t=document.getElementById("quick-camera-input");t&&(t.value="",t.click())}function triggerQuickGallery(){const t=document.getElementById("quick-gallery-input");t&&(t.value="",t.click())}function backToPhotoStep(){const t=document.getElementById("quick-upload-step-choose"),e=document.getElementById("quick-upload-step-details");t&&t.classList.remove("hidden"),e&&e.classList.add("hidden");const o=document.getElementById("quick-modal-title"),n=document.getElementById("quick-step-indicator");o&&(o.textContent="Add New Creation"),n&&(n.textContent="Choose photo source first")}function handleQuickUploadFileInput(t){const e=t.files&&t.files[0];if(!e)return;if(e.type&&!e.type.startsWith("image/")){showAdminToast("Please select a photo only (PNG, JPG, WEBP)"),t.value="";return}const o=new FileReader;o.onload=function(n){const s=new Image;s.onload=function(){let a="";try{const i=Math.min(1,800/s.width),d=document.createElement("canvas");d.width=Math.round(s.width*i),d.height=Math.round(s.height*i);const l=d.getContext("2d");if(l.drawImage(s,0,0,d.width,d.height),a=d.toDataURL("image/jpeg",.76),a.length>5e5){const c=Math.min(1,520/s.width);d.width=Math.round(s.width*c),d.height=Math.round(s.height*c),l.drawImage(s,0,0,d.width,d.height),a=d.toDataURL("image/jpeg",.58)}}catch{a=n.target.result}applyQuickPhotoSelected(a,e.name||"Bakery Photo")},s.onerror=function(){showAdminToast("Could not read this image format. Please choose JPG, PNG, or WEBP.")},s.src=n.target.result},o.readAsDataURL(e)}function selectQuickPresetPhoto(t,e,o,n){applyQuickPhotoSelected(t,e);const s=document.getElementById("quick-cake-name");if(s&&(s.value=e),o){const a=document.getElementById("quick-cake-cat");a&&(a.value=o)}if(n){const a=document.getElementById("quick-cake-price");a&&(a.value=n)}}function applyQuickPhotoSelected(t,e="Custom Bakery Photo"){quickUploadActivePhoto=t;const o=document.getElementById("quick-photo-preview-img");o&&(o.src=t);const n=document.getElementById("quick-photo-name-label");n&&(n.textContent=e);const s=document.getElementById("quick-upload-step-choose"),a=document.getElementById("quick-upload-step-details");s&&s.classList.add("hidden"),a&&a.classList.remove("hidden");const r=document.getElementById("quick-modal-title"),i=document.getElementById("quick-step-indicator");r&&(r.textContent="Creation Details"),i&&(i.textContent="Step 2: Fill details & publish");const d=document.getElementById("quick-cake-name");d&&!d.value&&setTimeout(()=>d.focus(),150)}function setQuickProductType(t){quickUploadProductType=t;const e=document.getElementById("quick-type-cake"),o=document.getElementById("quick-type-dec"),n=document.getElementById("quick-type-creation"),s=document.getElementById("quick-cake-cat"),a=document.getElementById("quick-price-wrap"),r=document.getElementById("quick-stock-wrap");if(!e||!o||!s)return;const i="py-1.5 px-1 rounded-xl text-[11px] font-bold bg-berry text-white shadow-rose-sm transition-all cursor-pointer truncate",d="py-1.5 px-1 rounded-xl text-[11px] font-bold bg-blush-100 text-ink hover:bg-blush-200 transition-all cursor-pointer truncate";e.className=t==="cake"?i:d,o.className=t==="dec"?i:d,n&&(n.className=t==="creation"?i:d),a&&a.classList.toggle("hidden",t==="creation"),r&&r.classList.toggle("hidden",t==="creation"),t==="cake"?s.innerHTML=`
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
        `}function submitQuickUploadProduct(){const t=(document.getElementById("quick-cake-name").value||"").trim(),e=document.getElementById("quick-cake-cat").value,o=parseFloat(document.getElementById("quick-cake-price").value),n=document.getElementById("quick-cake-stock").value==="true",s=(document.getElementById("quick-cake-desc").value||"").trim();if(!quickUploadActivePhoto){showAdminToast("Please take or choose a photo first!","error"),backToPhotoStep();return}if(!t){showAdminToast("Please enter a title or product name!","error"),document.getElementById("quick-cake-name").focus();return}if(quickUploadProductType!=="creation"&&(isNaN(o)||o<=0)){showAdminToast("Please enter a valid price in ETB!","error"),document.getElementById("quick-cake-price").focus();return}if(quickUploadProductType==="cake"){const a={id:Date.now(),name:t,category:e,price:o,inStock:n,img:quickUploadActivePhoto,desc:s||"Handcrafted fresh daily in Bole with premium luxury ingredients.",rating:5,reviews:1,popular:!0};state.cakes.unshift(a),saveState(),syncAll(),window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.saveProduct=="function"&&window.FirebaseService.saveProduct(a).catch(r=>console.warn("Cloud product sync failed:",r)),addAdminNotification("New Cake Published",`${t} added to ${e} (${o} ETB)`,"order"),showAdminToast("Submitted successfully!","success"),showCustomerToast(`New Cake: ${t} added to menu!`,"success")}else if(quickUploadProductType==="creation"){Array.isArray(state.creations)||(state.creations=[]);const a={id:"cr-"+Date.now(),title:t,category:e,caption:s||"Freshly handcrafted in Bole Kitchen.",date:"Today",img:quickUploadActivePhoto,published:!0,createdAt:new Date().toISOString()};state.creations.unshift(a),saveState(),syncAll(),window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.saveCreation=="function"&&window.FirebaseService.saveCreation(a).catch(r=>{console.warn("Cloud creation sync failed:",r),showAdminToast("Saved locally; cloud sync failed.","error")}),addAdminNotification("New Recent Creation",`${t} added to Recent Creations (${e})`,"order"),showAdminToast("Submitted successfully!","success"),showCustomerToast(`New Creation: ${t} added!`,"success")}else{const a={id:Date.now(),name:t,category:e,price:o,inStock:n,img:quickUploadActivePhoto,desc:s||"Celebration party extra decoration."};state.decorations.unshift(a),saveState(),syncAll(),window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.saveDecoration=="function"&&window.FirebaseService.saveDecoration(a).catch(r=>console.warn("Cloud decoration sync failed:",r)),addAdminNotification("New Extra Added",`${t} added to ${e} (${o} ETB)`,"order"),showAdminToast("Submitted successfully!","success")}if(closeQuickUploadModal(),switchAdminTab("products"),quickUploadProductType==="creation"&&typeof setAdminMenuTab=="function")try{setAdminMenuTab("creations")}catch{}}function openAdminSidebar(){if(typeof isAdminSessionLocked<"u"&&isAdminSessionLocked){lockAdminPortal();return}const t=document.getElementById("admin-sidebar-backdrop"),e=document.getElementById("admin-sidebar-drawer");t&&(t.classList.remove("hidden"),requestAnimationFrame(()=>{t.classList.remove("opacity-0"),t.classList.add("opacity-100")})),e&&(e.classList.remove("-translate-x-full"),e.classList.add("translate-x-0"))}function closeAdminSidebar(){const t=document.getElementById("admin-sidebar-backdrop"),e=document.getElementById("admin-sidebar-drawer");e&&(e.classList.add("-translate-x-full"),e.classList.remove("translate-x-0")),t&&(t.classList.remove("opacity-100"),t.classList.add("opacity-0")),setTimeout(()=>{t&&t.classList.add("hidden")},280)}function selectAdminDrawerItem(t,e){if(document.querySelectorAll("#admin-drawer-nav-list .admin-drawer-item").forEach(o=>{const n=o.dataset.drawerItem===t;o.classList.toggle("bg-blush-50",n),o.classList.toggle("border-berry/40",n),o.classList.toggle("shadow-rose-sm",n),o.classList.toggle("bg-white",!n),o.classList.toggle("border-blush-100",!n);const s=o.querySelector(".drawer-item-icon");s&&(s.classList.toggle("bg-berry",n),s.classList.toggle("text-white",n),s.classList.toggle("bg-blush-100",!n),s.classList.toggle("text-berry",!n));const a=o.querySelector(".drawer-item-label");a&&(a.classList.toggle("text-berry",n),a.classList.toggle("text-ink",!n));const r=o.querySelector(".drawer-item-chevron");r&&(r.classList.toggle("text-berry",n),r.classList.toggle("text-ink-light",!n))}),t==="my-profile"){openMyProfilePage();return}if(t==="shop-management"){openShopManagementSection();return}if(t==="product-configuration"){openProductConfigSection();return}if(t==="marketing-promotions"){openMarketingSection();return}if(t==="settings"){openSettingsHubSection();return}if(t==="upgrade-plan"){openUpgradePlanPage();return}typeof showAdminToast=="function"&&showAdminToast(e+" selected")}let adminProfileData={id:"mgr-01",name:"Mahlet Mekonnen (Owner)",email:"owner@makcake.et",phone:"0911 23 45 67",role:"Owner",avatar:"./images/mak-cake-logo.webp",shopName:"MAK CAKE \u2022 Bole Kitchen",googleConnected:!1,googleEmail:"",googleClientId:""},isProfileEditMode=!1,pendingProfileAvatarData;function syncAdminProfileUI(){const t=adminProfileData,e=document.getElementById("drawer-admin-avatar"),o=document.getElementById("drawer-admin-name"),n=document.getElementById("drawer-admin-role"),s=document.getElementById("drawer-admin-shop");e&&t.avatar&&(e.src=t.avatar,e.style.display=""),o&&(o.textContent=t.name||"MAK CAKE Owner"),n&&(n.textContent=t.role||"Owner"),s&&(s.textContent=t.shopName||"MAK CAKE \u2022 Bole Kitchen");const a=document.getElementById("profile-avatar-preview"),r=document.getElementById("profile-display-name"),i=document.getElementById("profile-role-badge"),d=document.getElementById("profile-role-text"),l=document.getElementById("profile-input-name"),c=document.getElementById("profile-input-email"),u=document.getElementById("profile-input-phone");a&&(a.src=pendingProfileAvatarData||t.avatar||"./images/mak-cake-logo.webp",a.style.display=""),r&&(r.textContent=t.name||"MAK CAKE Owner"),i&&(i.textContent=t.role||"Owner"),d&&(d.textContent=t.role||"Owner"),l&&!isProfileEditMode&&(l.value=t.name||""),c&&!isProfileEditMode&&(c.value=t.email||""),u&&!isProfileEditMode&&(u.value=t.phone||"");const p=document.getElementById("profile-google-status-badge"),f=document.getElementById("profile-google-email-display"),h=document.getElementById("profile-google-connect-btn"),g=document.getElementById("profile-google-disconnect-btn");t.googleConnected&&t.googleEmail?(p&&(p.textContent="Connected",p.className="px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200"),f&&(f.textContent=t.googleEmail),h&&h.classList.add("hidden"),g&&g.classList.remove("hidden")):(p&&(p.textContent="Not Connected",p.className="px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold bg-blush-100 text-berry border border-blush-200"),f&&(f.textContent="No Google account linked"),h&&h.classList.remove("hidden"),g&&g.classList.add("hidden"))}async function loadAdminProfileFromDb(){try{const t=await fetch("/api/admin/profile",{cache:"no-store"});if(t.ok){const e=await t.json();if(e.success&&e.profile){adminProfileData={...adminProfileData,...e.profile},localStorage.setItem("mak_admin_profile_v1",JSON.stringify(adminProfileData)),syncAdminProfileUI();return}}}catch{}try{const t=localStorage.getItem("mak_admin_profile_v1");t&&(adminProfileData={...adminProfileData,...JSON.parse(t)})}catch{}syncAdminProfileUI()}function openMyProfilePage(){setProfileEditMode(!1),switchAdminTab("profile"),loadAdminProfileFromDb()}function setProfileEditMode(t){isProfileEditMode=t,pendingProfileAvatarData=void 0;const e=document.getElementById("profile-validation-error");e&&(e.classList.add("hidden"),e.textContent=""),[document.getElementById("profile-input-name"),document.getElementById("profile-input-email"),document.getElementById("profile-input-phone")].forEach(r=>{r&&(r.readOnly=!t,r.classList.toggle("bg-white",t),r.classList.toggle("border-berry/40",t),r.classList.toggle("bg-blush-50/70",!t),r.classList.toggle("border-blush-200/80",!t))});const n=document.getElementById("profile-change-photo-btn"),s=document.getElementById("profile-save-bar"),a=document.getElementById("profile-edit-toggle-label");n&&n.classList.toggle("hidden",!t),s&&s.classList.toggle("hidden",!t),a&&(a.textContent=t?"Editing":"Edit Profile"),t||syncAdminProfileUI()}function toggleProfileEditMode(){setProfileEditMode(!isProfileEditMode)}function cancelProfileEdit(){setProfileEditMode(!1)}function handleAdminProfilePhotoChange(t){const e=t.files&&t.files[0];if(!e)return;if(!e.type.startsWith("image/")){showProfileValidationError("Please select a valid image file (PNG, JPG, or WebP).");return}const o=new FileReader;o.onload=n=>{pendingProfileAvatarData=n.target.result;const s=document.getElementById("profile-avatar-preview");s&&(s.src=pendingProfileAvatarData,s.style.display=""),isProfileEditMode||setProfileEditMode(!0)},o.readAsDataURL(e)}function showProfileValidationError(t){const e=document.getElementById("profile-validation-error");e&&(e.textContent=t,e.classList.remove("hidden"))}async function saveAdminProfileChanges(){const t=(document.getElementById("profile-input-name")?.value||"").trim(),e=(document.getElementById("profile-input-email")?.value||"").trim().toLowerCase(),o=(document.getElementById("profile-input-phone")?.value||"").trim();if(t.length<2){showProfileValidationError("Full name must be at least 2 characters.");return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)){showProfileValidationError("Please enter a valid email address.");return}if(o.replace(/\D/g,"").length<9){showProfileValidationError("Please enter a valid phone number (at least 9 digits).");return}const n=document.getElementById("profile-save-btn");await runWithFeedback({lockKey:"save-admin-profile",btnEl:n,scope:"admin",loadingMsg:"Saving profile...",successMsg:"Changes saved successfully!",action:async()=>{const s={name:t,email:e,phone:o};pendingProfileAvatarData&&(s.avatar=pendingProfileAvatarData);const a=await fetch("/api/admin/profile",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)}),r=await a.json();if(!a.ok||!r.success)throw showProfileValidationError(r.error||"Could not save profile changes."),new Error(r.error||"Could not save profile changes.");return adminProfileData={...adminProfileData,...r.profile},localStorage.setItem("mak_admin_profile_v1",JSON.stringify(adminProfileData)),setProfileEditMode(!1),syncAdminProfileUI(),!0}})}function openGoogleConnectModal(){const t=document.getElementById("profile-google-oauth-backdrop"),e=document.getElementById("profile-google-oauth-modal"),o=document.getElementById("profile-google-oauth-email"),n=document.getElementById("profile-google-oauth-error");n&&n.classList.add("hidden"),o&&!o.value&&(o.value=adminProfileData.googleEmail||adminProfileData.email||"natnaelagizew27@gmail.com"),t&&t.classList.remove("hidden"),e&&e.classList.remove("hidden")}function closeGoogleConnectModal(){const t=document.getElementById("profile-google-oauth-backdrop"),e=document.getElementById("profile-google-oauth-modal");t&&t.classList.add("hidden"),e&&e.classList.add("hidden")}function openGoogleConnectFlow(){typeof showAdminToast=="function"&&showAdminToast("Admin uses Firebase Username & Password authentication.")}async function completeGoogleConnectRequest(t){try{await fetch("/api/admin/google-connect",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}catch{}adminProfileData.googleConnected=!0,adminProfileData.googleEmail=t.email,t.name&&(adminProfileData.name=t.name),t.picture&&(adminProfileData.avatar=t.picture),localStorage.setItem("mak_admin_profile_v1",JSON.stringify(adminProfileData)),typeof syncAdminProfileUI=="function"&&syncAdminProfileUI(),closeGoogleConnectModal(),typeof showAdminToast=="function"&&showAdminToast("\u2713 Google account connected: "+adminProfileData.googleEmail,"success")}async function submitGoogleConnect(){const t=(document.getElementById("profile-google-oauth-email")?.value||"").trim().toLowerCase(),e=document.getElementById("profile-google-oauth-error");if(!/^[^s@]+@[^s@]+.[^s@]+$/.test(t)){e&&(e.textContent="Please enter a valid Google email address.",e.classList.remove("hidden"));return}try{await completeGoogleConnectRequest({email:t,name:adminProfileData.name,picture:adminProfileData.avatar})}catch(o){e&&(e.textContent=o.message,e.classList.remove("hidden"))}}async function disconnectGoogleAccount(){try{await fetch("/api/admin/google-disconnect",{method:"POST"})}catch{}adminProfileData.googleConnected=!1,adminProfileData.googleEmail="",localStorage.setItem("mak_admin_profile_v1",JSON.stringify(adminProfileData)),syncAdminProfileUI(),typeof showAdminToast=="function"&&showAdminToast("Google account disconnected","success")}function openAdminShopScreen(){closeAdminSidebar(),switchAdminTab("shop")}function openAdminSettingsScreen(){closeAdminSidebar(),switchAdminTab("settings")}function openAdminProfileModal(){closeAdminSidebar();const t=document.getElementById("admin-profile-modal-backdrop"),e=document.getElementById("admin-profile-modal");t&&t.classList.remove("hidden"),e&&e.classList.remove("hidden")}function closeAdminProfileModal(){const t=document.getElementById("admin-profile-modal-backdrop"),e=document.getElementById("admin-profile-modal");t&&t.classList.add("hidden"),e&&e.classList.add("hidden")}let isAdminSessionLocked=!1;function handleAdminLogout(){closeAdminSidebar();const t=document.getElementById("admin-logout-backdrop"),e=document.getElementById("admin-logout-modal");t&&t.classList.remove("hidden"),e&&e.classList.remove("hidden")}function closeAdminLogoutModal(){const t=document.getElementById("admin-logout-backdrop"),e=document.getElementById("admin-logout-modal");t&&t.classList.add("hidden"),e&&e.classList.add("hidden")}async function confirmAdminLogout(){const t=document.getElementById("admin-confirm-logout-btn");t&&(t.disabled=!0);try{await fetch("/api/admin/logout",{method:"POST"})}catch{}try{localStorage.setItem("mak_admin_logged_out","1"),localStorage.removeItem("mak_admin_auth_token"),sessionStorage.clear(),window.google&&google.accounts&&google.accounts.id&&google.accounts.id.disableAutoSelect(),window.FirebaseService&&typeof window.FirebaseService.signOut=="function"&&window.FirebaseService.signOut().catch(()=>{}),typeof unsubscribeAdminOrders=="function"&&unsubscribeAdminOrders()}catch{}closeAdminLogoutModal(),lockAdminPortal(),t&&(t.disabled=!1)}function lockAdminPortal(){isAdminSessionLocked=!0,closeAdminSidebar();const t=document.getElementById("admin-login-gate"),e=document.getElementById("admin-login-gate-err");e&&(e.classList.add("hidden"),e.textContent=""),t&&t.classList.remove("hidden")}const ADMIN_USERNAME_MAP={admin:typeof DEFAULT_OWNER_EMAIL=="string"&&DEFAULT_OWNER_EMAIL?DEFAULT_OWNER_EMAIL:"natnaelagizew27@gmail.com",makcake:typeof DEFAULT_OWNER_EMAIL=="string"&&DEFAULT_OWNER_EMAIL?DEFAULT_OWNER_EMAIL:"natnaelagizew27@gmail.com",owner:typeof DEFAULT_OWNER_EMAIL=="string"&&DEFAULT_OWNER_EMAIL?DEFAULT_OWNER_EMAIL:"natnaelagizew27@gmail.com"};function resolveAdminLoginEmail(t){const e=(t||"").trim().toLowerCase();return e?e.includes("@")?e:ADMIN_USERNAME_MAP[e]||"":""}function toggleAdminPasswordVisibility(){const t=document.getElementById("admin-login-password"),e=document.getElementById("admin-password-eye-open"),o=document.getElementById("admin-password-eye-closed"),n=document.getElementById("admin-password-toggle-btn");if(!t)return;const s=t.type==="password";t.type=s?"text":"password",e&&e.classList.toggle("hidden",s),o&&o.classList.toggle("hidden",!s),n&&n.setAttribute("aria-label",s?"Hide password":"Show password")}async function submitAdminGateLogin(t){t&&typeof t.preventDefault=="function"&&t.preventDefault();const e=document.getElementById("admin-login-username"),o=document.getElementById("admin-login-password"),n=document.getElementById("admin-login-submit-btn"),s=document.getElementById("admin-login-gate-err"),a=(e?.value||"").trim(),r=o?.value||"";if(s&&(s.classList.add("hidden"),s.textContent=""),!a||!r){s&&(s.textContent="Please enter both username and password.",s.classList.remove("hidden"));return}const i=resolveAdminLoginEmail(a);if(!i){s&&(s.textContent="Invalid username or password.",s.classList.remove("hidden"));return}n&&(n.disabled=!0,n.classList.add("opacity-75"),n.textContent="Signing in...");try{if(!window.FirebaseService&&!window.__firebaseServiceReady&&await new Promise(l=>{const c=()=>{window.removeEventListener("firebase-service-ready",c),l()};window.addEventListener("firebase-service-ready",c),setTimeout(l,2e3)}),!window.FirebaseService||!window.FirebaseService.isAvailable||!window.FirebaseService.isAvailable()||typeof window.FirebaseService.signInWithEmailPassword!="function")throw new Error("Authentication service is unavailable. Please check your internet connection.");const d=await window.FirebaseService.signInWithEmailPassword(i,r);if(!isAuthorizedAdminUser(d))throw await window.FirebaseService.signOut().catch(()=>{}),new Error("Unauthorized account. Only the authorized admin can access this dashboard.");o&&(o.value=""),unlockAdminWithAuthorizedUser(d),switchAdminTab("overview"),typeof showAdminToast=="function"&&showAdminToast("Signed in to MAK CAKE Admin","success")}catch(d){const l=d&&d.code?d.code:"";let c=d&&d.message||"Sign in failed. Please try again.";["auth/wrong-password","auth/user-not-found","auth/invalid-credential","auth/invalid-login-credentials"].includes(l)?c="Invalid username or password.":l==="auth/too-many-requests"?c="Too many failed attempts. Please wait a moment and try again.":l==="auth/operation-not-allowed"?c="Email/Password sign-in is not enabled in Firebase Authentication.":l==="auth/network-request-failed"&&(c="Network error. Please check your internet connection."),s&&(s.textContent=c,s.classList.remove("hidden"))}finally{n&&(n.disabled=!1,n.classList.remove("opacity-75"),n.textContent="Sign In")}}function checkInitialAdminLockState(){if(localStorage.getItem("mak_admin_logged_out")==="1"){lockAdminPortal();return}if(!document.getElementById("panel-customer")){const t=window.FirebaseService&&typeof window.FirebaseService.getCurrentUser=="function"?window.FirebaseService.getCurrentUser():null;isAuthorizedAdminUser(t)||lockAdminPortal()}}let _adminAuthSyncBound=!1,_adminOrdersUnsub=null;function isAuthorizedAdminUser(t){if(!t||!t.email)return!1;const e=typeof DEFAULT_OWNER_EMAIL=="string"&&DEFAULT_OWNER_EMAIL?DEFAULT_OWNER_EMAIL.toLowerCase():"natnaelagizew27@gmail.com";return t.email.toLowerCase()===e}function unsubscribeAdminOrders(){if(typeof _adminOrdersUnsub=="function"){try{_adminOrdersUnsub()}catch{}_adminOrdersUnsub=null}}function mergeCloudOrdersWithLocal(t){if(!Array.isArray(t))return;const e=new Set((typeof SEED_ORDERS<"u"?SEED_ORDERS:[]).map(i=>String(i.id))),o=new Map,n=new Map,s=t.map(i=>{const d={...i,firestoreDocId:i.firestoreDocId||String(i.id)};return o.set(String(d.firestoreDocId),d),n.set(String(d.id),d),d}),a=(state.orders||[]).filter(i=>!(i.firestoreDocId&&o.has(String(i.firestoreDocId))||n.has(String(i.id))||s.length>0&&e.has(String(i.id)))),r=[...s,...a];r.sort((i,d)=>{const l=i.createdAt?Date.parse(i.createdAt):0,c=d.createdAt?Date.parse(d.createdAt):0;return l!==c?c-l:Number(d.id||0)-Number(i.id||0)}),state.orders=r}function applyCloudOrderSnapshot(t,e){if(mergeCloudOrdersWithLocal(t),saveState(),typeof invalidateAdminTabCache=="function"&&invalidateAdminTabCache(),typeof renderAdminNotifications=="function"&&renderAdminNotifications(),typeof renderActiveAdminTab=="function"){const o=typeof adminTab<"u"&&adminTab?adminTab:"overview";renderActiveAdminTab(o),typeof loadedAdminTabs<"u"&&loadedAdminTabs.add(o==="menu"?"products":o)}e&&(typeof playBell=="function"&&playBell(),typeof showAdminToast=="function"&&showAdminToast(`New Order #ORD-${e.id} from ${e.customerName||"Customer"}!`,"success"))}function startAdminOrderSubscription(){_adminOrdersUnsub||window.MAK_ENABLE_FIRESTORE_ORDER_SYNC!==!0||!window.FirebaseService||typeof window.FirebaseService.subscribeToOrders!="function"||(_adminOrdersUnsub=window.FirebaseService.subscribeToOrders({onInitialLoad:t=>applyCloudOrderSnapshot(t,null),onSnapshot:t=>applyCloudOrderSnapshot(t,null),onNewOrder:t=>{typeof addAdminNotification=="function"&&addAdminNotification(`New Order #ORD-${t.id}`,`${t.customerName||"Customer"} \u2022 ${t.cakeName||"Custom Cake"}`,"order"),typeof playBell=="function"&&playBell(),typeof showAdminToast=="function"&&showAdminToast(`New Order #ORD-${t.id} from ${t.customerName||"Customer"}!`,"success")},onError:t=>{t&&t.code==="permission-denied"&&unsubscribeAdminOrders()}}))}function unlockAdminWithAuthorizedUser(t){if(!isAuthorizedAdminUser(t))return;localStorage.removeItem("mak_admin_logged_out"),isAdminSessionLocked=!1,adminProfileData.googleConnected=!0,adminProfileData.googleEmail=t.email,t.displayName&&(adminProfileData.name=t.displayName),t.photoURL&&(adminProfileData.avatar=t.photoURL),localStorage.setItem("mak_admin_profile_v1",JSON.stringify(adminProfileData)),typeof syncAdminProfileUI=="function"&&syncAdminProfileUI();const e=document.getElementById("admin-login-gate");e&&e.classList.add("hidden");const o=document.getElementById("admin-login-gate-err");o&&(o.classList.add("hidden"),o.textContent=""),typeof applyPackageLocksToUI=="function"&&applyPackageLocksToUI(),startAdminOrderSubscription()}function initAdminFirestoreSync(){if(_adminAuthSyncBound){const t=window.FirebaseService&&typeof window.FirebaseService.getCurrentUser=="function"?window.FirebaseService.getCurrentUser():null;isAuthorizedAdminUser(t)&&localStorage.getItem("mak_admin_logged_out")!=="1"&&unlockAdminWithAuthorizedUser(t);return}if(!window.FirebaseService||typeof window.FirebaseService.onAuthStateChanged!="function"){window.addEventListener("firebase-service-ready",()=>initAdminFirestoreSync(),{once:!0});return}_adminAuthSyncBound=!0,window.FirebaseService.onAuthStateChanged(t=>{if(t&&!isAuthorizedAdminUser(t)){if(unsubscribeAdminOrders(),window.FirebaseService.signOut().catch(()=>{}),!document.getElementById("panel-customer")){lockAdminPortal();const e=document.getElementById("admin-login-gate-err");e&&(e.textContent="Unauthorized account ("+(t.email||"unknown")+"). Only the authorized admin can access this dashboard.",e.classList.remove("hidden"))}return}isAuthorizedAdminUser(t)&&localStorage.getItem("mak_admin_logged_out")!=="1"?(unlockAdminWithAuthorizedUser(t),typeof renderActiveAdminTab=="function"&&renderActiveAdminTab(typeof adminTab<"u"?adminTab:"overview")):(unsubscribeAdminOrders(),document.getElementById("panel-customer")||lockAdminPortal())})}function applyPackageLocksToUI(){const t=typeof getActivePackageConfig=="function"?getActivePackageConfig():{id:"pkg-basic",name:"Basic",price:3e3},e=document.querySelector('.a-nav-btn[data-atab="analytics"]');if(e){const s=typeof hasPackageFeature=="function"&&!hasPackageFeature("analytics");e.classList.toggle("opacity-60",s),e.title=s?"Locked \u2014 Requires Advanced (5,000 ETB) package":"Analytics"}const o=document.getElementById("upg-current-badge");o&&(o.textContent="Current: "+t.name);const n=document.getElementById("drawer-current-plan-sub");n&&(n.textContent="Current: "+t.name+" ("+t.price.toLocaleString()+" ETB)")}function switchAdminTab(t){if(typeof isAdminSessionLocked<"u"&&isAdminSessionLocked){lockAdminPortal();return}t==="menu"&&(t="products"),adminTab=t,closeAddCakeSheet(),closeAddDecorationSheet(),closeAdminReceiptModal(),closeAdminSidebar(),document.querySelectorAll(".a-tab-view").forEach(s=>{s.classList.add("hidden"),s.classList.remove("animate-view")});const e=t==="products"?"a-tab-menu":`a-tab-${t}`,o=document.getElementById(e);o&&(o.classList.remove("hidden"),o.offsetWidth,o.classList.add("animate-view")),document.querySelectorAll(".a-nav-btn").forEach(s=>{const a=s.dataset.atab===t||t==="products"&&s.dataset.atab==="menu";s.classList.toggle("text-berry",a),s.classList.toggle("font-bold",a),s.classList.toggle("text-ink",!a),s.classList.toggle("font-medium",!a);const r=s.querySelector(".a-nav-ind");r&&r.classList.toggle("hidden",!a)});const n=document.getElementById("admin-header-shop-btn");if(n){const s=t==="shop";n.classList.toggle("bg-berry",s),n.classList.toggle("text-white",s),n.classList.toggle("border-berry",s),n.classList.toggle("bg-white",!s),n.classList.toggle("text-ink",!s),n.classList.toggle("border-blush-200",!s)}document.getElementById("admin-scroll-area").scrollTop=0,loadedAdminTabs.has(t)||(renderActiveAdminTab(t),loadedAdminTabs.add(t))}function renderActiveAdminTab(t){const e=t==="menu"?"products":t||adminTab||"overview";e==="overview"?renderAdminOverview():e==="orders"?renderAdminOrders():e==="products"?(typeof renderAdminMenu=="function"&&renderAdminMenu(),typeof renderAdminDecorations=="function"&&renderAdminDecorations(),typeof renderAdminCreations=="function"&&renderAdminCreations()):e==="analytics"?renderAdminAnalytics():e==="shop"?renderAdminShop():e==="settings"&&typeof renderAdminPackages=="function"&&renderAdminPackages()}function renderAdminOverview(){renderAdminHero();const t=state.orders||[],e=t.length,o=t.filter(u=>u.status==="Payment Pending"||u.status==="Pending").length,n=t.filter(u=>u.status==="Completed").length,s=t.reduce((u,p)=>u+(p.total||0),0),a=document.getElementById("overview-total-orders");a&&(a.textContent=e);const r=document.getElementById("overview-pending-orders");r&&(r.textContent=o);const i=document.getElementById("overview-completed-orders");i&&(i.textContent=n);const d=document.getElementById("overview-today-revenue");d&&(d.textContent=fmtETB(s));const l=document.getElementById("overview-pending-badge");l&&(l.textContent=o);const c=document.getElementById("overview-recent-orders-list");if(c){const u=t.slice(0,3);u.length?c.innerHTML=u.map(p=>{const f=p.status==="Payment Pending"||p.status==="Pending",h=p.status==="Approved"||["Confirmed","Preparing","Ready"].includes(p.status),g=f?"Payment Pending":h?"Approved":"Completed",v=g==="Completed"?"bg-emerald-50 text-emerald-700 border border-emerald-200":g==="Approved"?"bg-sky-50 text-sky-700 border border-sky-200":"bg-amber-50 text-amber-700 border border-amber-200";return`
              <div onclick="openExactAdminOrder(${p.id})" class="p-2.5 rounded-xl bg-blush-50/80 hover:bg-blush-100/70 border border-blush-200/60 flex items-center justify-between gap-2.5 cursor-pointer transition-colors active:scale-[0.99]" title="View & select order #ORD-${p.id}">
                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-2">
                    <span class="font-extrabold text-xs text-ink">#ORD-${p.id}</span>
                    <span class="text-xs font-black text-berry">${fmtETB(p.total)}</span>
                  </div>
                  <div class="text-[11px] font-semibold text-ink mt-0.5 truncate">${p.customerName}</div>
                </div>
                <div class="flex items-center gap-1.5 shrink-0">
                  <span class="px-2 py-0.5 rounded-full text-[9.5px] font-extrabold ${v}">${g}</span>
                  <svg class="w-3.5 h-3.5 text-berry/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
              </div>
            `}).join(""):c.innerHTML='<div class="text-center py-4 text-xs text-ink-muted">No recent orders found.</div>'}}function openExactAdminOrder(t){switchAdminTab("orders"),setAdminFilter("All"),setTimeout(()=>{const e=document.getElementById(`admin-order-card-${t}`);e&&(e.scrollIntoView({behavior:"smooth",block:"center"}),e.classList.remove("order-highlight-selected"),e.offsetWidth,e.classList.add("order-highlight-selected"),showAdminToast(`Selected Order #ORD-${t}`),setTimeout(()=>{e.classList.remove("order-highlight-selected")},3200))},120)}let adminHeroIndex=0,adminHeroTimer=null;function getAdminBanners(){return(!state.adminBanners||!state.adminBanners.length)&&(state.adminBanners=[{id:1,top:"Fresh Daily Addis",script:"Mini Bento",sub:"Same-day chilled delivery in Bole",cta:"Order Bento",link:"products",img:"https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=700&q=85"},{id:2,top:"Handcrafted in Bole",script:"Weddings",sub:"Luxury tiered cakes for Addis galas",cta:"View Specials",link:"products",img:"https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=700&q=85"},{id:3,top:"Make Every Moment",script:"Sweeter",sub:"Premium celebration cakes baked fresh",cta:"Manage Menu",link:"products",img:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=85"}]),state.adminBanners}const ADMIN_OVERVIEW_SLIDES=getAdminBanners();function renderAdminHero(){const t=getAdminBanners(),e=t[adminHeroIndex%t.length]||t[0],o=document.getElementById("admin-hero-img");o&&o.src!==e.img&&(o.style.opacity="0.35",setTimeout(()=>{o.src=e.img,o.style.opacity="1"},140));const n=document.getElementById("admin-hero-top");n&&(n.textContent=e.top);const s=document.getElementById("admin-hero-script");s&&(s.textContent=e.script);const a=document.getElementById("admin-hero-sub");a&&(a.textContent=e.sub);const r=document.getElementById("admin-hero-cta");r&&(r.textContent=e.cta);const i=document.getElementById("admin-hero-dots");i&&(i.innerHTML=getAdminBanners().map((d,l)=>`
          <button onclick="setAdminHeroSlide(${l})" aria-label="Slide ${l+1}" class="h-1.5 rounded-full transition-all cursor-pointer ${l===adminHeroIndex?"w-4 bg-berry":"w-1.5 bg-white/85"}"></button>
        `).join(""))}function setAdminHeroSlide(t){adminHeroIndex=t%ADMIN_OVERVIEW_SLIDES.length,renderAdminHero(),resetAdminHeroTimer()}function handleAdminHeroClick(){const t=ADMIN_OVERVIEW_SLIDES[adminHeroIndex]||ADMIN_OVERVIEW_SLIDES[0];t&&t.action&&t.action()}function resetAdminHeroTimer(){adminHeroTimer&&clearInterval(adminHeroTimer),adminHeroTimer=setInterval(()=>{if(adminTab!=="overview")return;const t=getAdminBanners().length||1;adminHeroIndex=(adminHeroIndex+1)%t,renderAdminHero()},3e3)}function toggleAdminBell(){state.shop.bellOn=!state.shop.bellOn,saveState(),updateAdminBellUI(),state.shop.bellOn&&playBell(!0),showAdminToast(state.shop.bellOn?"Kitchen Bell Activated":"Kitchen Bell Muted")}function setAdminFilter(t){adminFilter=t,document.querySelectorAll(".a-fchip").forEach(e=>{e.dataset.af===t?e.className="a-fchip shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold btn-berry text-white shadow-rose-sm":e.className="a-fchip shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold bg-white text-ink-muted border border-blush-200"}),renderAdminOrders()}function advanceOrder(t,e){const o=state.orders.find(n=>String(n.id)===String(t));if(o){if(o.status=e,o.isNewFlash=!1,typeof sendOrderStatusPush=="function"&&sendOrderStatusPush(o.id,e),saveState(),syncAll(),window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.updateOrder=="function"){const n=o.firestoreDocId||String(o.id);window.FirebaseService.updateOrder(n,{status:o.status,isNewFlash:!1}).catch(s=>{console.warn("Firestore order status update failed (saved locally):",s),showAdminToast("Saved locally; cloud sync failed.","error")})}showAdminToast(`Order #${o.id} \u2192 ${e}`),showCustomerToast(`\u{1F514} Order #${o.id} updated: ${e}`)}}function renderAdminOrders(){const t=state.orders.filter(r=>r.status==="Payment Pending"||r.status==="Pending").length,e=state.orders.filter(r=>r.status==="Approved"||["Confirmed","Preparing","Ready"].includes(r.status)).length,o=state.orders.reduce((r,i)=>r+i.total,0);document.getElementById("kpi-orders").textContent=state.orders.length,document.getElementById("kpi-pending").textContent=t,document.getElementById("kpi-baking").textContent=e,document.getElementById("kpi-revenue").textContent=fmtETB(o),document.getElementById("header-admin-badge").textContent=t;const n=document.getElementById("admin-nav-badge");n.textContent=t,n.classList.toggle("hidden",t===0);let s=state.orders;adminFilter!=="All"&&(s=state.orders.filter(r=>adminFilter==="Payment Pending"?r.status==="Payment Pending"||r.status==="Pending":adminFilter==="Approved"?r.status==="Approved"||["Confirmed","Preparing","Ready"].includes(r.status):r.status===adminFilter));const a=document.getElementById("admin-orders-list");if(!s.length){a.innerHTML=`<div class="bg-white rounded-[20px] p-6 text-center text-xs text-ink-muted shadow-rose">No orders in "${adminFilter}".</div>`;return}a.innerHTML=s.map((r,i)=>{const d=r.paymentPlan==="half"?"Half 50%":r.paymentPlan==="cod"?"On Delivery":"Full 100%",l=r.paymentStatus==="Paid",c=r.status==="Payment Pending"||r.status==="Pending",u=r.status==="Approved"||["Confirmed","Preparing","Ready"].includes(r.status),p=c?"Payment Pending":u?"Approved":"Completed";let f="";c?f=`<button onclick="advanceOrder('${r.id}', 'Approved')" class="flex-1 py-2 rounded-full btn-berry text-white font-bold text-[11px] shadow-rose-sm active:scale-[0.98] transition-transform flex items-center justify-center gap-1"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Approve Order</button>`:u?f=`<button onclick="advanceOrder('${r.id}', 'Completed')" class="flex-1 py-2 rounded-full bg-emerald-500 text-white font-bold text-[11px] active:scale-[0.98] transition-transform flex items-center justify-center gap-1"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Mark Completed</button>`:f='<div class="flex-1 text-center py-1.5 text-[11px] font-extrabold text-emerald-600 flex items-center justify-center gap-1"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Completed &amp; Delivered</div>';const h=p==="Completed"?"bg-emerald-50 text-emerald-700":p==="Approved"?"bg-sky-50 text-sky-700 border border-sky-200":"bg-amber-50 text-amber-700 border border-amber-200";return`
          <article
            id="admin-order-card-${r.id}"
            class="admin-order-card cake-card-animate bg-white rounded-[20px] p-3.5 shadow-rose border transition-all duration-200 ${r.isNewFlash?"border-berry admin-new-flash":"border-white"} space-y-2.5"
            style="animation-delay: ${i*30}ms"
          >
            <!-- Header Row: Order ID, Price, Badges, Status -->
            <div class="flex items-start justify-between gap-2">
              <div class="min-w-0">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span class="font-extrabold text-xs text-ink">#ORD-${r.id}</span>
                  <span class="text-xs font-extrabold text-berry">${fmtETB(r.total)}</span>
                  <span class="px-1.5 py-0.5 rounded-full text-[9px] font-extrabold ${l?"bg-emerald-50 text-emerald-700 border border-emerald-200":"bg-amber-50 text-amber-700 border border-amber-200"}">${l?"Paid":d}</span>
                  ${r.pushEnabled?'<span class="px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">\u{1F514} Push On</span>':""}
                </div>
                <div class="text-[11px] font-semibold text-ink mt-0.5 truncate">${r.customerName}</div>
                <div class="text-[10px] text-ink-muted truncate">
                  <a href="tel:${r.phone.replace(/\s+/g,"")}" onclick="showAdminToast('Calling ${r.customerName}...')" class="text-berry font-bold underline">${r.phone}</a> \u2022 ${r.address}
                </div>
              </div>
              <span class="shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${h}">${p}</span>
            </div>

            <!-- Item Details Row: Proportional fixed aspect-ratio image thumbnail -->
            <div class="bg-blush-50 rounded-2xl p-2.5 flex items-center gap-2.5">
              <div class="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-blush-100 border border-blush-200 shadow-2xs flex items-center justify-center">
                <img loading="lazy" decoding="async" width="48" height="48" src="${r.cakeImg||SVG_CAKE_FALLBACK}" alt="${r.cakeName}" class="w-full h-full object-cover" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
              </div>
              <div class="min-w-0 flex-1 text-[11px]">
                <div class="font-bold text-ink truncate">${r.cakeName}</div>
                <div class="text-[10px] text-ink-muted truncate">${r.size} \u2022 ${r.flavor}</div>
                ${r.inscription?`<div class="text-[10px] text-berry font-bold truncate">${getLuxurySvg("pen","w-3.5 h-3.5 inline-block mr-1")} "${r.inscription}"</div>`:""}
                ${r.addons&&r.addons.length?`<div class="text-[9.5px] text-ink-muted truncate">${r.addons.join(", ")}</div>`:""}
              </div>
            </div>

            <div class="flex items-center justify-between text-[10px] text-ink-muted">
              <span class="truncate flex items-center gap-1"><svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg> ${r.paymentMethod} (${r.paymentRef})</span>
              <span class="shrink-0 ml-2">${r.timeSlot}</span>
            </div>

            <!-- Action Row: Inspect Receipt + One-Click Mark Paid + Lifecycle Advance -->
            <div class="flex items-center gap-1.5">
              <button onclick="openAdminReceiptModal('${r.id}')" class="px-3 py-2 rounded-full bg-blush-100 hover:bg-blush-200 text-ink font-bold text-[10.5px] active:scale-95 transition-transform shrink-0 flex items-center justify-center gap-1">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>
                <span>Receipt</span>
              </button>
              ${l?"":`
                <button onclick="markOrderPaid('${r.id}')" class="px-3 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-extrabold text-[10.5px] active:scale-95 transition-transform shrink-0 flex items-center justify-center gap-1">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Mark Paid</span>
                </button>
              `}
              ${f}
            </div>
          </article>
        `}).join("")}function openAdminReceiptModal(t){const e=state.orders.find(r=>String(r.id)===String(t));if(!e)return;const o=e.paymentStatus==="Paid",n=e.paymentPlan==="half"?"Half Payment (50% Deposit)":e.paymentPlan==="cod"?"Pay on Delivery":"Full Payment (100%)";document.getElementById("receipt-modal-title").textContent=`Order #ORD-${e.id} Receipt`,document.getElementById("receipt-modal-sub").innerHTML=`${e.customerName} &bull; <span class="inline-flex items-center gap-1 text-ink">${getBrandLogo(e.paymentMethod,"w-3.5 h-3.5")} ${e.paymentMethod}</span>`,document.getElementById("receipt-modal-body").innerHTML=`
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
      `,closeAddCakeSheet(),closeAddDecorationSheet();const s=document.getElementById("admin-receipt-backdrop"),a=document.getElementById("admin-receipt-modal");s&&s.classList.remove("hidden"),a&&(a.classList.remove("hidden"),requestAnimationFrame(()=>a.classList.remove("translate-y-full")))}function closeAdminReceiptModal(){const t=document.getElementById("admin-receipt-backdrop"),e=document.getElementById("admin-receipt-modal");e&&e.classList.add("translate-y-full"),setTimeout(()=>{e&&e.classList.add("hidden"),t&&t.classList.add("hidden")},260)}function markOrderPaid(t){const e=state.orders.find(o=>String(o.id)===String(t));if(e){if(e.paymentStatus="Paid",(e.status==="Payment Pending"||e.status==="Pending")&&(e.status="Approved"),e.isNewFlash=!1,state.notifications.unshift({id:Date.now(),title:`Order Approved (#ORD-${e.id})`,msg:`Payment verified. Your order for ${e.cakeName} has been approved by MAK CAKE Bole.`,time:"Just now"}),state.unreadNotifs++,saveState(),syncAll(),window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.updateOrder=="function"){const o=e.firestoreDocId||String(e.id);window.FirebaseService.updateOrder(o,{status:e.status,paymentStatus:e.paymentStatus,isNewFlash:!1}).catch(n=>{console.warn("Firestore payment update failed (saved locally):",n),showAdminToast("Saved locally; cloud sync failed.","error")})}showAdminToast(`Order #ORD-${e.id} Approved`),showCustomerToast(`Order #ORD-${e.id} Approved`)}}let adminCakeCatFilter="All",activeCakeFormPhoto="";function setAdminCakeCatFilter(t){adminCakeCatFilter=t,renderAdminMenu()}function renderAdminMenu(){const t=(document.getElementById("admin-menu-search")?.value||"").trim().toLowerCase(),e=state.cakes.filter(i=>{const d=adminCakeCatFilter==="All"||i.category===adminCakeCatFilter,l=!t||i.name.toLowerCase().includes(t)||i.category&&i.category.toLowerCase().includes(t)||i.desc&&i.desc.toLowerCase().includes(t);return d&&l}),o=state.cakes.filter(i=>i.inStock!==!1).length,n=document.getElementById("admin-menu-sub");n&&(n.textContent=`${o}/${state.cakes.length} available \u2022 Live sync to Customer Phone`);const s=document.getElementById("admin-sub-cakes-cnt");s&&(s.textContent=state.cakes.length);const a=document.getElementById("admin-cake-cat-pills");if(a){const i=["All","Normal","Special","Cupples","Mini Cakes"];a.innerHTML=i.map(d=>{const l=adminCakeCatFilter===d,c=d==="All"?state.cakes.length:state.cakes.filter(u=>u.category===d).length;return`
            <button onclick="setAdminCakeCatFilter('${d}')" class="shrink-0 px-2.5 py-1.5 rounded-full text-[10.5px] font-bold transition-all cursor-pointer ${l?"btn-berry text-white shadow-rose-sm":"bg-white text-ink-muted border border-blush-200 hover:text-ink"}">
              ${d} (${c})
            </button>
          `}).join("")}const r=document.getElementById("admin-menu-list");if(r){if(!e.length){r.innerHTML='<div class="bg-white rounded-[18px] p-5 text-center text-xs text-ink-muted shadow-rose-sm">No cakes found in this category. Tap "+ Add Cake" to create one.</div>';return}r.innerHTML=e.map((i,d)=>{const l=i.inStock!==!1;return`
          <div class="bg-white rounded-[18px] p-3 shadow-rose-sm border border-white flex items-center justify-between gap-2.5">
            <!-- Priority Swap Buttons (Up / Down) -->
            <div class="flex flex-col shrink-0 pr-1 py-0.5 gap-0.5 select-none">
              <button onclick="moveCakePriority(${i.id}, 'up'); event.stopPropagation();" title="Move Up" class="w-6 h-5 rounded bg-blush-100 hover:bg-berry hover:text-white text-ink-muted flex items-center justify-center text-[9px] font-bold transition-colors ${d===0?"opacity-25 pointer-events-none":"active:scale-110 cursor-pointer"}">\u25B2</button>
              <button onclick="moveCakePriority(${i.id}, 'down'); event.stopPropagation();" title="Move Down" class="w-6 h-5 rounded bg-blush-100 hover:bg-berry hover:text-white text-ink-muted flex items-center justify-center text-[9px] font-bold transition-colors ${d===e.length-1?"opacity-25 pointer-events-none":"active:scale-110 cursor-pointer"}">\u25BC</button>
            </div>

            <!-- Clickable Cake Thumbnail with Camera Overlay -->
            <div onclick="triggerCakePhotoUpload(${i.id})" class="relative group cursor-pointer w-14 h-14 rounded-xl overflow-hidden bg-blush-100 border border-blush-200 shrink-0 shadow-2xs flex items-center justify-center ${l?"":"grayscale opacity-60"}">
              <img loading="lazy" decoding="async" width="200" height="112" src="${i.img||SVG_CAKE_FALLBACK}" alt="${i.name}" class="w-full h-full object-cover" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
              <div class="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[8px] font-extrabold">
                Change
              </div>
              <div class="absolute bottom-0 right-0 p-0.5 bg-berry text-white rounded-tl-md">
                <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
              </div>
            </div>
            <input type="file" id="cake-file-${i.id}" accept="image/png,image/jpeg,image/webp,image/jpg" onchange="uploadCakePhoto(${i.id}, this)" class="hidden" />

            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="text-[12px] font-extrabold text-ink leading-tight truncate">${i.name}</span>
                <span class="px-2 py-0.5 rounded-full text-[8.5px] font-bold ${l?"bg-emerald-50 text-emerald-700 border border-emerald-200":"bg-rose-50 text-berry border border-rose-200"} shrink-0">
                  ${l?"Available":"Sold Out"}
                </span>
              </div>
              <div class="flex items-center gap-1.5 mt-0.5">
                <span class="px-2 py-0.5 rounded-full bg-blush-100 text-ink-muted text-[9.5px] font-bold">${i.category}</span>
                <span class="text-[11px] font-black text-berry">${fmtETB(i.price)}</span>
              </div>
            </div>

            <!-- Actions: Stock Switch + Full Edit Modal + Delete -->
            <div class="flex items-center gap-1.5 shrink-0">
              <button onclick="toggleCakeStock(${i.id})" title="Toggle Available / Sold Out" class="w-8 h-8 rounded-xl ${l?"bg-emerald-50 text-emerald-600 hover:bg-emerald-100":"bg-rose-50 text-berry hover:bg-rose-100"} flex items-center justify-center transition-all active:scale-90 shadow-2xs cursor-pointer">
                ${l?'<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>':'<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'}
              </button>
              <button onclick="openEditCakeModal(${i.id})" title="Edit Cake" class="px-2.5 h-8 rounded-xl bg-berry text-white text-[10.5px] font-bold shadow-rose-sm active:scale-90 transition-all flex items-center gap-1 cursor-pointer">
                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                <span>Edit</span>
              </button>
              <button onclick="deleteAdminCake(${i.id})" title="Delete Cake" class="w-8 h-8 rounded-xl bg-rose-50 hover:bg-rose-100 text-berry flex items-center justify-center transition-all active:scale-90 shadow-2xs cursor-pointer">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              </button>
            </div>
          </div>
        `}).join("")}}function moveCakePriority(t,e){const o=state.cakes.findIndex(a=>a.id===t);if(o===-1)return;const n=e==="up"?o-1:o+1;if(n<0||n>=state.cakes.length)return;const[s]=state.cakes.splice(o,1);state.cakes.splice(n,0,s),saveState(),syncAll(),showAdminToast(`Moved "${s.name}" ${e==="up"?"Up":"Down"}`)}function editCakePrice(t,e){const o=parseInt(e,10);if(isNaN(o)||o<100)return;const n=state.cakes.find(s=>s.id===t);n&&(n.price=o,saveState(),syncAll(),showAdminToast(`Updated ${n.name} \u2192 ${fmtETB(o)}`))}function toggleCakeStock(t){const e=state.cakes.find(o=>o.id===t);e&&(e.inStock=!e.inStock,saveState(),syncAll(),showAdminToast(`${e.name}: ${e.inStock?"Available":"Sold Out"}`))}function openAddCakeModal(){const t=typeof getPackageLimit=="function"?getPackageLimit("maxProducts"):30;if((state.cakes||[]).length>=t){const s=typeof getActivePackageConfig=="function"?getActivePackageConfig():{name:"Basic"};showAdminToast(`\u{1F512} Product limit (${t}) reached on ${s.name} plan. Upgrade to add more cakes.`,"error");return}closeAddDecorationSheet(),closeAdminReceiptModal(),document.getElementById("cake-modal-title").textContent="+ Add New Cake",document.getElementById("cake-form-id").value="",document.getElementById("cake-form-name").value="",document.getElementById("cake-form-cat").value="Normal",document.getElementById("cake-form-price").value="2800",document.getElementById("cake-form-stock").value="true",document.getElementById("cake-form-desc").value="",document.getElementById("cake-form-img-preset").value="";const e="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80";document.getElementById("cake-form-img-preview").src=e,document.getElementById("cake-form-img-status").textContent="Default Preset Photo",document.getElementById("cake-form-delete-btn").classList.add("hidden"),activeCakeFormPhoto=e;const o=document.getElementById("add-cake-backdrop"),n=document.getElementById("add-cake-sheet");o&&o.classList.remove("hidden"),n&&(n.classList.remove("hidden"),requestAnimationFrame(()=>n.classList.remove("translate-y-full")))}function openAddCakeSheet(){openAddCakeModal()}function openEditCakeModal(t){const e=state.cakes.find(s=>s.id===t);if(!e)return;closeAddDecorationSheet(),closeAdminReceiptModal(),document.getElementById("cake-modal-title").textContent="Edit Cake: "+e.name,document.getElementById("cake-form-id").value=e.id,document.getElementById("cake-form-name").value=e.name,document.getElementById("cake-form-cat").value=e.category||"Normal",document.getElementById("cake-form-price").value=e.price,document.getElementById("cake-form-stock").value=e.inStock!==!1?"true":"false",document.getElementById("cake-form-desc").value=e.desc||"",document.getElementById("cake-form-img-preset").value="",document.getElementById("cake-form-img-preview").src=e.img||SVG_CAKE_FALLBACK,document.getElementById("cake-form-img-status").textContent="Current Product Photo",document.getElementById("cake-form-delete-btn").classList.remove("hidden"),activeCakeFormPhoto=e.img||"";const o=document.getElementById("add-cake-backdrop"),n=document.getElementById("add-cake-sheet");o&&o.classList.remove("hidden"),n&&(n.classList.remove("hidden"),requestAnimationFrame(()=>n.classList.remove("translate-y-full")))}function closeAddCakeSheet(){const t=document.getElementById("add-cake-backdrop"),e=document.getElementById("add-cake-sheet");e&&e.classList.add("translate-y-full"),setTimeout(()=>{e&&e.classList.add("hidden"),t&&t.classList.add("hidden")},260)}async function handleCakeFormPhotoUpload(t){const e=t.files&&t.files[0];if(e){if(!e.type||!e.type.startsWith("image/")){showAdminToast("Please select an image file only (PNG, JPG, WEBP)"),t.value="";return}try{showAdminToast("Compressing image on-the-fly...");const o=await compressImageFileToCanvas(e,800,.82);activeCakeFormPhoto=o.dataUrl,document.getElementById("cake-form-img-preview").src=o.dataUrl,document.getElementById("cake-form-img-status").textContent=`Attached (${o.kb}KB HQ Canvas Compressed)`,showAdminToast(`Cake photo compressed (${o.kb}KB)!`)}catch(o){showAdminToast("Error compressing image: "+o.message)}t.value=""}}function handleCakePresetSelect(t){t&&(activeCakeFormPhoto=t,document.getElementById("cake-form-img-preview").src=t,document.getElementById("cake-form-img-status").textContent="Preset Selected")}function triggerCakePhotoUpload(t){const e=document.getElementById(`cake-file-${t}`);e&&e.click()}async function uploadCakePhoto(t,e){const o=e.files&&e.files[0];if(!o)return;if(!o.type||!o.type.startsWith("image/")){showAdminToast("Please select an image file only (PNG, JPG, WEBP)"),e.value="";return}const n=state.cakes.find(s=>s.id===t);if(n){try{showAdminToast("Compressing image on-the-fly...");const s=await compressImageFileToCanvas(o,800,.82);n.img=s.dataUrl,saveState(),syncAll(),showAdminToast(`Photo updated for "${n.name}" (${s.kb}KB)!`)}catch(s){showAdminToast("Error compressing photo: "+s.message)}e.value=""}}function saveAdminCakeForm(){const t=document.getElementById("cake-form-id").value,e=document.getElementById("cake-form-name"),o=document.getElementById("cake-form-price"),n=e?e.value.trim():"",s=o?o.value.trim():"",a=parseInt(s,10),r=document.getElementById("cake-form-cat").value,i=document.getElementById("cake-form-stock").value==="true",d=document.getElementById("cake-form-desc").value.trim();if(!n){highlightMissingRequirement("cake-form-name","Required: Please enter cake name"),showAdminToast("\u26A0\uFE0F Please enter cake name");return}if(!s||isNaN(a)||a<100){highlightMissingRequirement("cake-form-price","Required: Please enter a valid price (min 100 ETB)"),showAdminToast("\u26A0\uFE0F Please enter a valid cake price");return}const l=activeCakeFormPhoto||"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80";if(t){const c=Number(t),u=state.cakes.find(p=>p.id===c);if(!u)return;u.name=n,u.category=r,u.price=a,u.inStock=i,u.desc=d||u.desc,activeCakeFormPhoto&&(u.img=activeCakeFormPhoto),saveState(),syncAll(),window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.saveProduct=="function"&&window.FirebaseService.saveProduct(u).catch(p=>console.warn("Cloud product sync failed:",p)),closeAddCakeSheet(),showAdminToast(`Updated "${u.name}" live!`)}else{const c={id:Date.now(),name:n,desc:d||"Handcrafted fresh daily with premium ingredients in Bole Medhanialem.",category:r,price:a,rating:5,reviews:"New",popular:!0,inStock:i,img:l};state.cakes.unshift(c),saveState(),syncAll(),window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.saveProduct=="function"&&window.FirebaseService.saveProduct(c).catch(u=>console.warn("Cloud product sync failed:",u)),closeAddCakeSheet(),showAdminToast(`Added cake "${n}" live!`),showCustomerToast(`New Cake: ${n} added to menu!`)}}function publishNewCake(){saveAdminCakeForm()}function deleteAdminCake(t){const e=state.cakes.find(n=>n.id===t);!e||!confirm(`Are you sure you want to delete cake "${e.name}"?

This will remove it from the live menu.`)||(state.cakes=state.cakes.filter(n=>n.id!==t),saveState(),syncAll(),window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.deleteProduct=="function"&&window.FirebaseService.deleteProduct(t).catch(n=>console.warn("Cloud product delete failed:",n)),showAdminToast(`Deleted cake "${e.name}"`))}function deleteAdminCakeFromModal(){const t=document.getElementById("cake-form-id").value;t&&(deleteAdminCake(Number(t)),closeAddCakeSheet())}function setAdminMenuSub(t){adminMenuSub=t;const e=t==="cakes",o=t==="decorations",n=t==="creations",s=document.getElementById("admin-sub-cakes"),a=document.getElementById("admin-sub-decorations"),r=document.getElementById("admin-sub-creations");s&&(s.className=`py-1.5 rounded-full text-[10.5px] font-extrabold transition-all flex items-center justify-center gap-1 ${e?"btn-berry text-white shadow-rose-sm":"text-ink-muted hover:text-ink"}`),a&&(a.className=`py-1.5 rounded-full text-[10.5px] font-extrabold transition-all flex items-center justify-center gap-1 ${o?"btn-berry text-white shadow-rose-sm":"text-ink-muted hover:text-ink"}`),r&&(r.className=`py-1.5 rounded-full text-[10.5px] font-extrabold transition-all flex items-center justify-center gap-1 ${n?"btn-berry text-white shadow-rose-sm":"text-ink-muted hover:text-ink"}`);const i=document.getElementById("admin-menu-cakes-panel"),d=document.getElementById("admin-menu-dec-panel"),l=document.getElementById("admin-subview-creations");i&&i.classList.toggle("hidden",!e),d&&d.classList.toggle("hidden",!o),l&&l.classList.toggle("hidden",!n),e?renderAdminMenu():o?renderAdminDecorations():n&&renderAdminCreations()}function renderAdminCreations(){const t=document.getElementById("admin-sub-creations-cnt");t&&(t.textContent=(state.creations||[]).length);const e=document.getElementById("admin-creations-list");if(!e)return;const o=state.creations||[];if(!o.length){e.innerHTML='<div class="bg-white rounded-[18px] p-5 text-center text-xs text-ink-muted shadow-rose-sm">No creations uploaded yet. Tap "+ Capture &amp; Upload" to post a real cake photo.</div>';return}e.innerHTML=o.map((n,s)=>`
        <div class="bg-white rounded-[18px] p-3 shadow-rose-sm border border-white flex items-center gap-2.5">
          <!-- Swap Place Buttons (Up / Down) -->
          <div class="flex flex-col shrink-0 pr-1 py-0.5 gap-0.5 select-none">
            <button onclick="moveCreationPriority('${n.id}', 'up'); event.stopPropagation();" title="Move Up" class="w-6 h-5 rounded bg-blush-100 hover:bg-berry hover:text-white text-ink-muted flex items-center justify-center text-[9px] font-bold transition-colors ${s===0?"opacity-25 pointer-events-none":"active:scale-110 cursor-pointer"}">\u25B2</button>
            <button onclick="moveCreationPriority('${n.id}', 'down'); event.stopPropagation();" title="Move Down" class="w-6 h-5 rounded bg-blush-100 hover:bg-berry hover:text-white text-ink-muted flex items-center justify-center text-[9px] font-bold transition-colors ${s===o.length-1?"opacity-25 pointer-events-none":"active:scale-110 cursor-pointer"}">\u25BC</button>
          </div>
          <div class="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-blush-100 border border-blush-200 shadow-2xs flex items-center justify-center"><img src="${n.img||SVG_CAKE_FALLBACK}" alt="${n.title}" class="w-full h-full object-cover" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" /></div>
          <div class="min-w-0 flex-1">
            <div class="text-xs font-extrabold text-ink truncate">${n.title}</div>
            <div class="text-[10px] text-berry font-bold">${n.category||"Luxury Cake"} \u2022 <span class="text-ink-muted font-medium">${n.date||"Today"}</span></div>
            <div class="pt-1">
              <button onclick="document.getElementById('cr-file-${n.id}').click()" class="px-2 py-0.5 rounded-lg bg-blush-100 hover:bg-blush-200 text-berry text-[9.5px] font-extrabold flex items-center gap-1 active:scale-95 transition-transform">
                <svg class="w-3 h-3 text-berry" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                <span>Update Photo</span>
              </button>
              <input type="file" id="cr-file-${n.id}" accept="image/png,image/jpeg,image/webp,image/jpg" onchange="uploadCreationPhoto('${n.id}', this)" class="hidden" />
            </div>
          </div>
          <button onclick="deleteCreation('${n.id}')" class="p-2 rounded-full hover:bg-rose-50 text-ink-muted hover:text-berry transition-colors shrink-0" title="Delete">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>
      `).join("")}function moveCreationPriority(t,e){const o=(state.creations||[]).findIndex(a=>String(a.id)===String(t));if(o===-1)return;const n=e==="up"?o-1:o+1;if(n<0||n>=state.creations.length)return;const[s]=state.creations.splice(o,1);state.creations.splice(n,0,s),saveState(),syncAll(),showAdminToast(`Moved "${s.title}" ${e==="up"?"Up":"Down"}`)}function openAddCreationSheet(){activeCreationPhoto="";const t=document.getElementById("new-cr-title");t&&(t.value="");const e=document.getElementById("new-cr-cat");e&&(e.value="Chocolate Cakes");const o=document.getElementById("new-cr-date");o&&(o.value="Today");const n=document.getElementById("new-cr-preview-box");n&&n.classList.add("hidden");const s=document.getElementById("new-cr-upload-btn");s&&s.classList.remove("hidden");const a=document.getElementById("admin-add-creation-modal");a&&a.classList.remove("hidden")}function closeAddCreationSheet(){document.getElementById("admin-add-creation-modal").classList.add("hidden")}function clearCreationPhoto(){activeCreationPhoto="",document.getElementById("new-cr-preview-box").classList.add("hidden"),document.getElementById("new-cr-upload-btn").classList.remove("hidden"),document.getElementById("new-cr-file").value=""}function handleCreationPhotoUpload(t){const e=t.files&&t.files[0];if(!e)return;if(e.type&&!e.type.startsWith("image/")){showAdminToast("Please select a photo only (PNG, JPG, WEBP)"),t.value="";return}const o=new FileReader;o.onload=function(n){const s=new Image;s.onload=function(){try{const r=Math.min(1,800/s.width),i=document.createElement("canvas");i.width=Math.round(s.width*r),i.height=Math.round(s.height*r);const d=i.getContext("2d");d.drawImage(s,0,0,i.width,i.height);let l=i.toDataURL("image/jpeg",.75);if(l.length>5e5){const c=Math.min(1,520/s.width);i.width=Math.round(s.width*c),i.height=Math.round(s.height*c),d.drawImage(s,0,0,i.width,i.height),l=i.toDataURL("image/jpeg",.58)}activeCreationPhoto=l}catch{activeCreationPhoto=n.target.result}document.getElementById("new-cr-preview-img").src=activeCreationPhoto,document.getElementById("new-cr-preview-box").classList.remove("hidden"),document.getElementById("new-cr-upload-btn").classList.add("hidden"),showAdminToast("Real photo compressed and ready")},s.onerror=function(){showAdminToast("Could not read this image format. Please choose JPG, PNG, or WEBP.")},s.src=n.target.result},o.readAsDataURL(e)}function saveNewCreation(){const t=document.getElementById("new-cr-title"),e=t?t.value.trim():"",o=(document.getElementById("new-cr-cat")?.value||"Luxury Cake").trim(),n=(document.getElementById("new-cr-date")?.value||"Today").trim();if(!e){highlightMissingRequirement("new-cr-title","Required: Please enter the cake creation name"),showAdminToast("\u26A0\uFE0F Please enter the cake creation name");return}if(!activeCreationPhoto){highlightMissingRequirement("new-cr-preview-box","Required: Please capture or select a real cake photo"),showAdminToast("\u26A0\uFE0F Please capture or pick a real cake photo");return}const s={id:"cr-"+Date.now(),title:e,category:o,date:n,img:activeCreationPhoto,published:!0,createdAt:new Date().toISOString()};state.creations=state.creations||[],state.creations.unshift(s),saveState(),syncAll(),window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.saveCreation=="function"&&window.FirebaseService.saveCreation(s).catch(a=>{console.warn("Cloud creation sync failed:",a),showAdminToast("Saved locally; cloud sync failed.","error")}),closeAddCreationSheet(),showAdminToast(`Published "${e}" to storefront!`),showCustomerToast(`Fresh Cake Added: ${e}`)}async function uploadCreationPhoto(t,e){const o=e.files&&e.files[0];if(o){if(!o.type||!o.type.startsWith("image/")){showAdminToast("Please select an image file only (PNG, JPG, WEBP)"),e.value="";return}try{showAdminToast("Compressing photo on-the-fly...");const n=await compressImageFileToCanvas(o,800,.82),s=(state.creations||[]).find(a=>a.id===t);s&&(s.img=n.dataUrl,saveState(),syncAll(),window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.saveCreation=="function"&&window.FirebaseService.saveCreation(s).catch(a=>console.warn("Cloud creation photo sync failed:",a)),showAdminToast(`Updated photo for "${s.title}" (${n.kb}KB HQ)!`),showGlobalToast("Creation photo updated on customer storefront!"))}catch(n){showAdminToast("Error compressing image: "+n.message)}e.value=""}}function deleteCreation(t){state.creations=(state.creations||[]).filter(e=>e.id!==t),saveState(),syncAll(),window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.deleteCreation=="function"&&window.FirebaseService.deleteCreation(t).catch(e=>console.warn("Cloud creation delete failed:",e)),showAdminToast("Creation removed")}function setAdminDecCatFilter(t){adminDecCatFilter=t,renderAdminDecorations()}function renderAdminDecorations(){const t=document.getElementById("admin-sub-dec-cnt");t&&(t.textContent=state.decorations.length);const e=document.getElementById("admin-dec-sub"),o=state.decorations.filter(i=>i.inStock!==!1).length;e&&(e.textContent=`${o}/${state.decorations.length} active \u2022 5 predefined categories`);const n=document.getElementById("admin-dec-cat-pills");if(n){const i=[{id:"All",short:"All",svgKey:"sparkles"},...DECORATION_CATEGORIES];n.innerHTML=i.map(d=>{const l=adminDecCatFilter===d.id,c=d.id==="All"?state.decorations.length:state.decorations.filter(u=>u.category===d.id).length;return`
            <button onclick="setAdminDecCatFilter('${d.id.replace(/'/g,"\\'")}')" class="shrink-0 px-2.5 py-1.5 rounded-full text-[10.5px] font-bold transition-all ${l?"btn-berry text-white shadow-rose-sm":"bg-white text-ink-muted border border-blush-200"}">
              ${getLuxurySvg(d.svgKey||"sparkles","w-3.5 h-3.5 shrink-0 inline-block mr-1")} ${d.short} (${c})
            </button>
          `}).join("")}const s=(document.getElementById("admin-dec-search")?.value||"").trim().toLowerCase(),a=state.decorations.filter(i=>{const d=adminDecCatFilter==="All"||i.category===adminDecCatFilter,l=!s||i.name.toLowerCase().includes(s)||i.category&&i.category.toLowerCase().includes(s)||i.desc&&i.desc.toLowerCase().includes(s);return d&&l}),r=document.getElementById("admin-dec-list");if(r){if(!a.length){r.innerHTML='<div class="bg-white rounded-[18px] p-5 text-center text-xs text-ink-muted shadow-rose-sm">No decorations found matching your filter. Tap "+ Add Decoration" to create one.</div>';return}r.innerHTML=a.map((i,d)=>{const l=i.inStock!==!1;return`
          <div class="bg-white rounded-[18px] p-3 shadow-rose-sm border border-white flex items-center justify-between gap-2.5">
            <!-- Swap Place Buttons (Up / Down) -->
            <div class="flex flex-col shrink-0 pr-1 py-0.5 gap-0.5 select-none">
              <button onclick="moveDecorationPriority('${i.id}', 'up'); event.stopPropagation();" title="Move Up" class="w-6 h-5 rounded bg-blush-100 hover:bg-berry hover:text-white text-ink-muted flex items-center justify-center text-[9px] font-bold transition-colors ${d===0?"opacity-25 pointer-events-none":"active:scale-110 cursor-pointer"}">\u25B2</button>
              <button onclick="moveDecorationPriority('${i.id}', 'down'); event.stopPropagation();" title="Move Down" class="w-6 h-5 rounded bg-blush-100 hover:bg-berry hover:text-white text-ink-muted flex items-center justify-center text-[9px] font-bold transition-colors ${d===a.length-1?"opacity-25 pointer-events-none":"active:scale-110 cursor-pointer"}">\u25BC</button>
            </div>

            <!-- Clickable Photo Thumbnail with Camera Overlay -->
            <div onclick="triggerDecorationPhotoUpload('${i.id}')" class="relative group cursor-pointer w-14 h-14 rounded-xl overflow-hidden bg-blush-100 border border-blush-200 shrink-0 shadow-2xs flex items-center justify-center ${l?"":"grayscale opacity-60"}">
              <img src="${i.img||SVG_CAKE_FALLBACK}" alt="${i.name}" class="w-full h-full object-cover" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
              <div class="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[8px] font-extrabold">
                Change
              </div>
              <div class="absolute bottom-0 right-0 p-0.5 bg-berry text-white rounded-tl-md">
                <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
              </div>
            </div>
            <input type="file" id="dec-file-${i.id}" accept="image/png,image/jpeg,image/webp,image/jpg" onchange="uploadDecorationPhoto('${i.id}', this)" class="hidden" />

            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="text-[12px] font-extrabold text-ink leading-tight truncate">${i.name}</span>
                <span class="px-2 py-0.5 rounded-full text-[8.5px] font-bold ${l?"bg-emerald-50 text-emerald-700 border border-emerald-200":"bg-rose-50 text-berry border border-rose-200"} shrink-0">
                  ${l?"Available":"Sold Out"}
                </span>
              </div>
              <div class="text-[9.5px] font-semibold text-ink-muted truncate mt-0.5">${i.category}</div>
              <div class="text-[11px] font-black text-berry mt-0.5">${fmtETB(i.price)}</div>
            </div>

            <!-- Actions: Stock Switch + Full Edit Modal + Delete -->
            <div class="flex items-center gap-1.5 shrink-0">
              <button onclick="toggleDecorationStock('${i.id}')" title="Toggle Available / Sold Out" class="w-8 h-8 rounded-xl ${l?"bg-emerald-50 text-emerald-600 hover:bg-emerald-100":"bg-rose-50 text-berry hover:bg-rose-100"} flex items-center justify-center transition-all active:scale-90 shadow-2xs">
                ${l?'<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>':'<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>'}
              </button>

              <button onclick="openEditDecorationModal('${i.id}')" title="Edit Decoration" class="w-8 h-8 rounded-xl bg-blush-100 text-ink hover:text-berry hover:bg-blush-200 flex items-center justify-center transition-all active:scale-90 shadow-2xs">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              </button>

              <button onclick="deleteAdminDecoration('${i.id}')" title="Delete Decoration" class="w-8 h-8 rounded-xl bg-blush-50 text-ink-muted hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-all active:scale-90">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
        `}).join("")}}function moveDecorationPriority(t,e){const o=state.decorations.findIndex(a=>String(a.id)===String(t));if(o===-1)return;const n=e==="up"?o-1:o+1;if(n<0||n>=state.decorations.length)return;const[s]=state.decorations.splice(o,1);state.decorations.splice(n,0,s),saveState(),syncAll(),showAdminToast(`Moved decoration "${s.name}" ${e==="up"?"Up":"Down"}`)}let activeAdminDecFormPhoto="";function openAddDecorationSheet(){openAddDecorationModal()}function openAddDecorationModal(){if(typeof requirePackageFeature=="function"&&!requirePackageFeature("decorations","Extra Decorations"))return;const t=typeof getPackageLimit=="function"?getPackageLimit("decorations"):0;if((state.decorations||[]).length>=t){const e=typeof getActivePackageConfig=="function"?getActivePackageConfig():{name:"Basic"};showAdminToast(`\u{1F512} Decorations limit (${t}) reached on ${e.name} plan. Upgrade to Premium (10,000 ETB) for unlimited.`,"error");return}document.getElementById("admin-dec-modal-title").textContent="+ Add New Decoration",document.getElementById("admin-dec-form-id").value="",document.getElementById("admin-dec-form-name").value="",document.getElementById("admin-dec-form-cat").value="Candles & Toppers",document.getElementById("admin-dec-form-stock").value="true",document.getElementById("admin-dec-form-price").value="200",document.getElementById("admin-dec-form-desc").value="",document.getElementById("admin-dec-form-reqnum").checked=!1,document.getElementById("admin-dec-form-img-preview").src=SEED_DECORATIONS[0].img,document.getElementById("admin-dec-form-img-status").textContent="Default Category Photo",document.getElementById("admin-dec-form-delete-btn").classList.add("hidden"),activeAdminDecFormPhoto="",showAdminDecModal()}function openEditDecorationModal(t){const e=state.decorations.find(o=>o.id===t);e&&(document.getElementById("admin-dec-modal-title").textContent="Edit Decoration: "+e.name,document.getElementById("admin-dec-form-id").value=e.id,document.getElementById("admin-dec-form-name").value=e.name,document.getElementById("admin-dec-form-cat").value=e.category||"Candles & Toppers",document.getElementById("admin-dec-form-stock").value=e.inStock!==!1?"true":"false",document.getElementById("admin-dec-form-price").value=e.price,document.getElementById("admin-dec-form-desc").value=e.desc||"",document.getElementById("admin-dec-form-reqnum").checked=!!e.requiresNumber,document.getElementById("admin-dec-form-img-preview").src=e.img||SVG_CAKE_FALLBACK,document.getElementById("admin-dec-form-img-status").textContent="Current Decoration Photo",document.getElementById("admin-dec-form-delete-btn").classList.remove("hidden"),activeAdminDecFormPhoto=e.img||"",showAdminDecModal())}function showAdminDecModal(){closeAddCakeSheet(),closeAdminReceiptModal();const t=document.getElementById("admin-dec-backdrop"),e=document.getElementById("admin-dec-sheet");t&&t.classList.remove("hidden"),e&&(e.classList.remove("hidden"),requestAnimationFrame(()=>e.classList.remove("translate-y-full")))}function closeAdminDecModal(){const t=document.getElementById("admin-dec-backdrop"),e=document.getElementById("admin-dec-sheet");e&&e.classList.add("translate-y-full"),setTimeout(()=>{e&&e.classList.add("hidden"),t&&t.classList.add("hidden")},260)}function closeAddDecorationSheet(){closeAdminDecModal()}async function handleAdminDecFormPhotoUpload(t){const e=t.files&&t.files[0];if(e){if(!e.type||!e.type.startsWith("image/")){showAdminToast("Please select an image file only (PNG, JPG, WEBP)"),t.value="";return}try{showAdminToast("Compressing image on-the-fly...");const o=await compressImageFileToCanvas(e,800,.82);activeAdminDecFormPhoto=o.dataUrl,document.getElementById("admin-dec-form-img-preview").src=o.dataUrl,document.getElementById("admin-dec-form-img-status").textContent=`Attached (${o.kb}KB HQ Canvas Compressed)`,showAdminToast(`Decoration photo compressed (${o.kb}KB)!`)}catch(o){showAdminToast("Error compressing image: "+o.message)}t.value=""}}function saveAdminDecorationForm(){const t=document.getElementById("admin-dec-form-id").value,e=document.getElementById("admin-dec-form-name"),o=document.getElementById("admin-dec-form-price"),n=e?e.value.trim():"",s=o?o.value.trim():"",a=parseInt(s,10),r=document.getElementById("admin-dec-form-cat").value,i=document.getElementById("admin-dec-form-stock").value==="true",d=document.getElementById("admin-dec-form-desc").value.trim(),l=document.getElementById("admin-dec-form-reqnum").checked;if(!n){highlightMissingRequirement("admin-dec-form-name","Required: Please enter decoration product name"),showAdminToast("\u26A0\uFE0F Please enter decoration name");return}if(!s||isNaN(a)||a<10){highlightMissingRequirement("admin-dec-form-price","Required: Please enter a valid price (minimum 10 ETB)"),showAdminToast("\u26A0\uFE0F Please enter a valid price (minimum 10 ETB)");return}if(t){const c=state.decorations.findIndex(u=>u.id===t);c!==-1&&(state.decorations[c].name=n,state.decorations[c].category=r,state.decorations[c].inStock=i,state.decorations[c].price=a,state.decorations[c].desc=d,state.decorations[c].requiresNumber=l,activeAdminDecFormPhoto&&(state.decorations[c].img=activeAdminDecFormPhoto),saveState(),syncAll(),window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.saveDecoration=="function"&&window.FirebaseService.saveDecoration(state.decorations[c]).catch(u=>console.warn("Cloud decoration sync failed:",u)),closeAdminDecModal(),showAdminToast(`Updated "${n}" successfully!`),showGlobalToast(`"${n}" updated and synced live to customer catalog!`))}else{const c={id:"dec-"+Date.now(),name:n,category:r,inStock:i,price:a,desc:d,requiresNumber:l,svgKey:(DECORATION_CATEGORIES.find(u=>u.id===r)||{}).svgKey||"sparkles",img:activeAdminDecFormPhoto||(SEED_DECORATIONS.find(u=>u.category===r)||SEED_DECORATIONS[0]).img};state.decorations.unshift(c),saveState(),syncAll(),window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.saveDecoration=="function"&&window.FirebaseService.saveDecoration(c).catch(u=>console.warn("Cloud decoration sync failed:",u)),closeAdminDecModal(),showAdminToast(`Created "${n}" in ${r}!`),showGlobalToast(`New decoration "${n}" synced to Customer Storefront!`)}}function deleteCurrentAdminDecoration(){const t=document.getElementById("admin-dec-form-id").value;t&&deleteAdminDecoration(t)}function deleteAdminDecoration(t){const e=state.decorations.find(n=>n.id===t);!e||!window.confirm(`Are you sure you want to delete "${e.name}" from Extra Decorations?

This action cannot be undone.`)||(state.decorations=state.decorations.filter(n=>n.id!==t),state.decSelections&&state.decSelections[t]&&delete state.decSelections[t],saveState(),window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.deleteDecoration=="function"&&window.FirebaseService.deleteDecoration(t).catch(n=>console.warn("Cloud decoration delete failed:",n)),syncAll(),closeAdminDecModal(),showAdminToast(`Deleted "${e.name}"`),showGlobalToast("Decoration removed from customer storefront catalog."))}function toggleDecorationStock(t){const e=state.decorations.find(o=>o.id===t);e&&(e.inStock=e.inStock===!1,saveState(),syncAll(),showAdminToast(`${e.name}: ${e.inStock?"Available (In Stock)":"Sold Out"}`),showGlobalToast(`${e.name} is now ${e.inStock?"available to order":"marked Sold Out"}`))}function triggerDecorationPhotoUpload(t){const e=document.getElementById("dec-file-"+t);e&&e.click()}async function uploadDecorationPhoto(t,e){const o=e.files&&e.files[0];if(o){if(!o.type||!o.type.startsWith("image/")){showAdminToast("Please select an image file only (PNG, JPG, WEBP)"),e.value="";return}try{showAdminToast("Compressing photo on-the-fly...");const n=await compressImageFileToCanvas(o,800,.82),s=state.decorations.find(a=>a.id===t);s&&(s.img=n.dataUrl,saveState(),syncAll(),showAdminToast(`Updated photo for "${s.name}" (${n.kb}KB HQ)!`),showGlobalToast("New decoration photo synced to customer catalog!"))}catch(n){showAdminToast("Error compressing image: "+n.message)}e.value=""}}let analyticsDateRange="all",analyticsProductTab="cakes";function setAnalyticsDateRange(t){analyticsDateRange=t,renderAdminAnalytics()}function setAnalyticsProductTab(t){analyticsProductTab=t,renderAdminAnalytics()}function getAnalyticsOrders(){const t=(state.orders||[]).filter(e=>e.status!=="Cancelled");return analyticsDateRange==="all"?t:analyticsDateRange==="today"?t.filter(e=>{if(e.deliveryDate==="Today")return!0;if(e.createdAt){const o=new Date(e.createdAt),n=new Date;return o.getDate()===n.getDate()&&o.getMonth()===n.getMonth()&&o.getFullYear()===n.getFullYear()}return!1}):analyticsDateRange==="7days"?t.filter(e=>e.deliveryDate==="Today"||e.deliveryDate==="Tomorrow"?!0:e.createdAt?(Date.now()-e.createdAt)/864e5<=7:!0):analyticsDateRange==="30days"?t.filter(e=>e.createdAt?(Date.now()-e.createdAt)/864e5<=30:!0):t}function renderAdminAnalytics(){const t=document.getElementById("admin-analytics-body");if(!t)return;const e=typeof hasPackageFeature=="function"&&!hasPackageFeature("analytics"),o=getAnalyticsOrders(),n=o.length,s=o.filter(m=>m.paymentStatus==="Paid"),a=s.reduce((m,b)=>m+(b.total||0),0),r=o.reduce((m,b)=>m+(b.total||0),0),i=o.filter(m=>m.paymentStatus!=="Paid"),d=i.reduce((m,b)=>m+(b.total||0),0),l=s.length?Math.round(a/s.length):n?Math.round(r/n):0,c=[{label:"Mon",rev:Math.round(a*.12),orders:Math.max(0,Math.round(n*.15))},{label:"Tue",rev:Math.round(a*.14),orders:Math.max(0,Math.round(n*.15))},{label:"Wed",rev:Math.round(a*.18),orders:Math.max(1,Math.round(n*.2))},{label:"Thu",rev:Math.round(a*.1),orders:Math.max(0,Math.round(n*.1))},{label:"Fri",rev:Math.round(a*.22),orders:Math.max(1,Math.round(n*.2))},{label:"Sat",rev:Math.round(a*.16),orders:Math.max(1,Math.round(n*.15))},{label:"Sun",rev:Math.round(a*.08),orders:Math.max(0,Math.round(n*.05))}],u=Math.max(...c.map(m=>m.rev),1e3),p={};o.forEach(m=>{const b=m.cakeName||"Custom Cake";p[b]||(p[b]={name:b,img:m.cakeImg||"",qty:0,rev:0}),p[b].qty+=1,p[b].rev+=m.total||0});const f=Object.values(p).sort((m,b)=>b.qty!==m.qty?b.qty-m.qty:b.rev-m.rev),h=f.length?Math.max(...f.map(m=>m.rev),1):1,g={};o.forEach(m=>{Array.isArray(m.addons)&&m.addons.length&&m.addons.forEach(b=>{const y=String(b||"").trim();if(!y)return;const x=(state.decorations||[]).find(C=>y.toLowerCase().includes(C.name.toLowerCase())||C.name.toLowerCase().includes(y.toLowerCase())),A=x?x.name:y.replace(/\s*\(\d+\s*ETB\)/i,"").trim(),B=x?x.price:150,S=x?x.img:"",I=x?x.category:"Decorations";g[A]||(g[A]={name:A,category:I,img:S,qty:0,rev:0}),g[A].qty+=1,g[A].rev+=B})});const v=Object.values(g).sort((m,b)=>b.qty!==m.qty?b.qty-m.qty:b.rev-m.rev),k=v.length?Math.max(...v.map(m=>m.rev),1):1,w={Telebirr:0,"CBE Transfer":0,"Pay on Delivery":0};o.forEach(m=>{const b=m.paymentMethod||"Telebirr";w[b]!==void 0?w[b]+=m.total||0:w["Pay on Delivery"]+=m.total||0});const E={today:"Today","7days":"Last 7 Days","30days":"Last 30 Days",all:"All Time"};if(t.innerHTML=`
        <div class="bg-white rounded-[20px] p-1.5 shadow-rose-sm border border-white grid grid-cols-4 gap-1 select-none">
          ${["today","7days","30days","all"].map(m=>{const b=analyticsDateRange===m,y=E[m];return`
              <button onclick="setAnalyticsDateRange('${m}')" class="py-2 rounded-xl text-[10.5px] font-extrabold transition-all cursor-pointer ${b?"btn-berry text-white shadow-rose-sm":"text-ink-muted hover:text-ink hover:bg-blush-50"}">
                ${y}
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
              <div class="text-xl font-black text-emerald-700">${fmtETB(r)}</div>
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
              <div class="text-xl font-black text-ink">${fmtETB(l)}</div>
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
              <div class="text-xs font-extrabold text-ink mt-0.5">${fmtETB(r)}</div>
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
              ${c.map(m=>{const b=Math.max(6,Math.round(m.rev/u*88));return`
                  <div class="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                    <span class="text-[8px] font-extrabold text-ink opacity-0 group-hover:opacity-100 transition-opacity">${m.rev?m.rev>=1e3?(m.rev/1e3).toFixed(1)+"k":m.rev:"0"}</span>
                    <div class="w-full max-w-[24px] rounded-t-lg bg-gradient-to-t from-berry-dark to-berry shadow-rose-sm transition-all duration-300" style="height:${b}%;"></div>
                    <span class="text-[9px] font-bold text-ink-muted mt-0.5">${m.label}</span>
                  </div>
                `}).join("")}
            </div>
          </div>

          <!-- Unverified payment note if any -->
          ${d>0?`
            <div class="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/60 flex items-center justify-between text-xs">
              <div class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                <span class="text-[10.5px] font-semibold text-amber-900">${i.length} Pending / Unverified Orders</span>
              </div>
              <span class="text-[11px] font-bold text-amber-900">${fmtETB(d)}</span>
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
                Extra Decs (${v.length})
              </button>
            </div>
          </div>

          <!-- A. BEST-SELLING CAKES LIST -->
          ${analyticsProductTab==="cakes"?`
            <div class="space-y-2">
              ${f.length?f.map((m,b)=>{const y=b===0?"bg-stargold text-amber-900":b===1?"bg-slate-200 text-slate-800":b===2?"bg-amber-100 text-amber-800":"bg-blush-100 text-ink-muted",x=Math.round(m.rev/(h||1)*100);return`
                  <div class="bg-blush-50/70 p-2.5 rounded-2xl border border-blush-100 space-y-2">
                    <div class="flex items-center justify-between gap-2.5">
                      <div class="flex items-center gap-2.5 min-w-0">
                        <span class="w-5 h-5 rounded-full ${y} text-[9.5px] font-black flex items-center justify-center shrink-0">
                          #${b+1}
                        </span>
                        <div class="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-blush-100 border border-blush-200 shadow-2xs">
                          <img src="${m.img||SVG_CAKE_FALLBACK}" alt="${m.name}" class="w-full h-full object-cover" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
                        </div>
                        <div class="min-w-0">
                          <div class="text-[11.5px] font-extrabold text-ink truncate">${m.name}</div>
                          <div class="text-[10px] font-semibold text-ink-muted">${m.qty} sold in period</div>
                        </div>
                      </div>
                      <div class="text-right shrink-0">
                        <div class="text-[11.5px] font-black text-berry">${fmtETB(m.rev)}</div>
                        <div class="text-[9px] font-semibold text-emerald-600">Revenue</div>
                      </div>
                    </div>
                    <!-- Performance Share Progress Bar -->
                    <div class="h-1.5 rounded-full bg-blush-200/70 overflow-hidden">
                      <div class="h-full bg-berry rounded-full" style="width:${x}%"></div>
                    </div>
                  </div>
                `}).join(""):`
                <div class="p-6 text-center text-xs text-ink-muted">No cake sales recorded for this date range.</div>
              `}
            </div>
          `:`
            <!-- B. BEST-SELLING EXTRA DECORATIONS LIST -->
            <div class="space-y-2">
              ${v.length?v.map((m,b)=>{const y=b===0?"bg-stargold text-amber-900":b===1?"bg-slate-200 text-slate-800":b===2?"bg-amber-100 text-amber-800":"bg-blush-100 text-ink-muted",x=Math.round(m.rev/(k||1)*100);return`
                  <div class="bg-blush-50/70 p-2.5 rounded-2xl border border-blush-100 space-y-2">
                    <div class="flex items-center justify-between gap-2.5">
                      <div class="flex items-center gap-2.5 min-w-0">
                        <span class="w-5 h-5 rounded-full ${y} text-[9.5px] font-black flex items-center justify-center shrink-0">
                          #${b+1}
                        </span>
                        <div class="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-blush-100 border border-blush-200 shadow-2xs flex items-center justify-center">
                          ${m.img?`<img src="${m.img}" alt="${m.name}" class="w-full h-full object-cover" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />`:'<span class="text-sm">\u2728</span>'}
                        </div>
                        <div class="min-w-0">
                          <div class="text-[11.5px] font-extrabold text-ink truncate">${m.name}</div>
                          <div class="text-[9.5px] font-semibold text-ink-muted">${m.category} \u2022 ${m.qty} ordered</div>
                        </div>
                      </div>
                      <div class="text-right shrink-0">
                        <div class="text-[11.5px] font-black text-berry">${fmtETB(m.rev)}</div>
                        <div class="text-[9px] font-semibold text-emerald-600">Revenue</div>
                      </div>
                    </div>
                    <!-- Performance Share Progress Bar -->
                    <div class="h-1.5 rounded-full bg-blush-200/70 overflow-hidden">
                      <div class="h-full bg-berry rounded-full" style="width:${x}%"></div>
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
              <div class="text-lg font-black text-ink">${fmtETB(l)}</div>
              <div class="text-[9.5px] text-ink-muted">Per customer order</div>
            </div>
          </div>

          <!-- Earnings by Payment Channel with Progress Bars -->
          <div class="space-y-2.5 pt-1">
            <div class="text-[10.5px] font-extrabold text-ink px-0.5">Earnings by Payment Channel</div>
            ${[{name:"Telebirr",amount:w.Telebirr||0,color:"bg-berry",barColor:"bg-berry"},{name:"CBE Bank Transfer",amount:w["CBE Transfer"]||0,color:"bg-amber-500",barColor:"bg-amber-500"},{name:"Cash on Arrival",amount:w["Pay on Delivery"]||0,color:"bg-emerald-500",barColor:"bg-emerald-500"}].map(m=>{const b=r>0?Math.round(m.amount/r*100):0;return`
                <div class="space-y-1 bg-blush-50/40 p-2.5 rounded-xl border border-blush-100/70">
                  <div class="flex items-center justify-between text-xs">
                    <span class="font-bold text-ink flex items-center gap-1.5">
                      <span class="w-2 h-2 rounded-full ${m.color}"></span>
                      ${m.name}
                    </span>
                    <span class="font-extrabold text-ink">${fmtETB(m.amount)} <span class="text-[10px] font-semibold text-ink-muted">(${b}%)</span></span>
                  </div>
                  <div class="h-2 rounded-full bg-blush-100 overflow-hidden">
                    <div class="h-full ${m.barColor} rounded-full transition-all duration-500" style="width: ${b}%"></div>
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
      `,e){const m=t.innerHTML;t.innerHTML=`
          <div class="relative">
            <div class="blur-[5px] pointer-events-none select-none opacity-70 overflow-hidden max-h-[75vh]">${m}</div>
            <div class="absolute inset-0 flex items-start justify-center pt-24 px-4" style="background:rgba(255,249,250,0.55);backdrop-filter:blur(3px);">
              <div class="bg-white rounded-3xl p-6 shadow-2xl border border-violet-100 max-w-xs w-full text-center">
                <div class="text-4xl mb-2">\u{1F4CA}</div>
                <div class="text-[15px] font-black text-violet-700 mb-1">Unlock Sales Analytics</div>
                <div class="text-[11px] text-ink-muted mb-4 leading-relaxed">See your real revenue, net profit, top-selling cakes &amp; payment channels. Upgrade to <strong class="text-violet-600">Advanced</strong> to earn smarter.</div>
                <div class="text-left space-y-1 mb-5">
                  ${["\u{1F4C8} Total Revenue & Net Profit","\u{1F3C6} Top Selling Cakes Ranked","\u{1F4B3} Earnings by Payment Channel","\u{1F4CA} Weekly Sales Trend Chart"].map(b=>`<div class="flex items-center gap-2 text-[10.5px] font-semibold text-ink"><span class="text-emerald-500 font-black">\u2713</span>${b}</div>`).join("")}
                </div>
                <button onclick="openUpgradePlanPage();" style="background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;width:100%;padding:13px;border-radius:50px;font-size:12.5px;font-weight:900;border:none;cursor:pointer;box-shadow:0 4px 15px rgba(124,58,237,0.35);">
                  \u{1F680} View Upgrade Plans \u2192
                </button>
                <div class="text-[9.5px] text-ink-muted mt-2">Pay once \xB7 Contact MAK CAKE after payment</div>
              </div>
            </div>
          </div>`}}const DEFAULT_SHOP_CONFIG={isOpen:!0,deliveryFee:150,bellOn:!0,businessName:"MAK CAKE",businessLogo:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=120&q=80",businessPhone:SHOP_SETTINGS_CONFIG.phoneLocal,businessAddress:"Bole Medhanialem, near Edna Mall, Addis Ababa",businessDesc:"Addis Ababa Premier Halal Luxury Cake Bakery & Dessert Boutique",businessLocation:"Bole Medhanialem, Addis Ababa",deliveryEnabled:!0,pickupEnabled:!0,minOrderAmount:500,deliveryAreas:"Bole, CMC, Kazanchis, Old Airport, Sarbet, Piassa, Summit",deliveryInstructions:"Same-day delivery chilled in insulated carrier boxes with real-time driver tracking.",paymentMethods:{telebirr:{enabled:!0,name:"Telebirr",accountName:SHOP_SETTINGS_CONFIG.telebirrHolder,accountNumber:SHOP_SETTINGS_CONFIG.telebirrDisplay,instructions:"Transfer via Telebirr app and upload screenshot receipt below."},cbe:{enabled:!0,name:"CBE Transfer",accountName:SHOP_SETTINGS_CONFIG.cbeHolder,accountNumber:SHOP_SETTINGS_CONFIG.cbeAccountDisplay,instructions:"Transfer to Commercial Bank of Ethiopia and upload slip screenshot."},cod:{enabled:!0,name:"Pay on Delivery",accountName:"Cash on Arrival",accountNumber:"Bole Courier",instructions:"Pay courier in cash or Telebirr upon receiving your fresh cake."}},orderingEnabled:!0,leadTimeHours:4,customNotesAllowed:!0,orderInstructions:"Order cut-off time is 8:00 PM for same-day delivery.",announcementText:"\u2728 Fresh Daily Chilled Delivery Across Addis Ababa \u2022 100% Halal Bakery \u2728",heroBannerTitle:"Artisanal Luxury Cakes & Sweet Celebrations",heroBannerSubtitle:"Handcrafted fresh daily in Bole with Belgian chocolate & premium local butter.",rewardBox:{enabled:!0,promoCodes:[{id:"p1",code:"MAK10",discount:10,type:"percent",desc:"10% off celebration orders",active:!0,usedCount:14},{id:"p2",code:"BOLELOVE",discount:150,type:"fixed",desc:"150 ETB off delivery or cake",active:!0,usedCount:8},{id:"p3",code:"FREECANDLE",discount:120,type:"fixed",desc:"Free birthday candles set",active:!0,usedCount:22}],rewards:[{id:"r1",name:"10% Discount Voucher",desc:"Valid on orders over 2,000 ETB",active:!0},{id:"r2",name:"Free Birthday Candles Set",desc:"Complimentary gift in cart",active:!0},{id:"r3",name:"VIP Morning Delivery",desc:"Priority guaranteed morning slot",active:!0}]},ads:[{id:1,title:"Fresh Daily Addis Mini Bento Cakes",desc:"Same-day chilled delivery in Bole Medhanialem",img:"https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=600&q=80",link:"Order Bento",active:!0},{id:2,title:"Wedding & Anniversary Custom 3-Tier Luxury",desc:"Book tasting consultation 48 hours in advance",img:"https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=600&q=80",link:"Custom Cakes",active:!0}],managers:[{id:1,name:"Makda Tesfaye (Owner)",phone:"0911 23 45 67",role:"Owner & Head Baker",permissions:"Full Admin Access",active:!0},{id:2,name:"Bole Kitchen Manager",phone:"0922 45 67 89",role:"Kitchen Supervisor",permissions:"Orders & Inventory",active:!0}],passcode:"1234",securityEmail:"owner@makcake.et",lastPasscodeChange:"Nov 24, 2026"};let adminShopSection="all";function ensureShopState(){state.shop?(state.shop={...DEFAULT_SHOP_CONFIG,...state.shop},state.shop.paymentMethods||(state.shop.paymentMethods=JSON.parse(JSON.stringify(DEFAULT_SHOP_CONFIG.paymentMethods))),state.shop.rewardBox||(state.shop.rewardBox=JSON.parse(JSON.stringify(DEFAULT_SHOP_CONFIG.rewardBox))),state.shop.ads||(state.shop.ads=JSON.parse(JSON.stringify(DEFAULT_SHOP_CONFIG.ads))),state.shop.managers||(state.shop.managers=JSON.parse(JSON.stringify(DEFAULT_SHOP_CONFIG.managers)))):state.shop=JSON.parse(JSON.stringify(DEFAULT_SHOP_CONFIG))}function ensurePackagesState(){(!state.basicPackages||!state.basicPackages.length)&&(state.basicPackages=[{id:1,name:'Bento Mini (4")',grams:350,portions:"1-2 people",price:1800,popular:!0},{id:2,name:'Standard Celebration (6")',grams:850,portions:"6-8 people",price:2600,popular:!0},{id:3,name:'Family Grand (8")',grams:1400,portions:"10-12 people",price:3400,popular:!1},{id:4,name:'Luxury 2-Tier Event (10")',grams:2600,portions:"20-25 people",price:6800,popular:!0}])}function renderAdminPackages(){ensurePackagesState();const t=document.getElementById("admin-packages-list");if(!t)return;const e=state.basicPackages;t.innerHTML=e.map((n,s)=>`
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
      `).join("");const o=document.getElementById("settings-bell-btn");o&&(o.textContent=state.kitchenBell?"Bell ON":"Bell OFF",o.className=state.kitchenBell?"px-3 py-1 rounded-full text-xs font-extrabold btn-berry text-white cursor-pointer":"px-3 py-1 rounded-full text-xs font-extrabold bg-blush-100 text-ink cursor-pointer")}function updatePackageField(t,e,o){ensurePackagesState();const n=state.basicPackages.find(s=>s.id===t);n&&(n[e]=o,saveState())}function addNewPackageTier(){ensurePackagesState();const t=Date.now();state.basicPackages.push({id:t,name:"New Custom Tier ("+(state.basicPackages.length+1)+")",grams:1e3,portions:"8-10 people",price:3e3,popular:!1}),saveState(),renderAdminPackages(),showAdminToast("\u2713 Added new package size tier")}function removePackageTier(t){ensurePackagesState(),state.basicPackages=state.basicPackages.filter(e=>e.id!==t),saveState(),renderAdminPackages(),showAdminToast("Package tier removed")}function saveAdminPackages(){saveState(),syncAll()}function handleBannerUpload(t,e){if(e.files&&e.files[0]){const o=e.files[0],n=new FileReader;n.onload=function(s){updateBannerData(t,"img",s.target.result)},n.readAsDataURL(o)}}function updateBannerData(t,e,o){const n=getAdminBanners();n[t]&&(n[t][e]=o,saveState(),renderAdminHero(),renderAdminShop(),showAdminToast("\u2713 Homepage banner updated live!"))}function removeBanner(t){const e=getAdminBanners();if(e.length<=1){alert("You must keep at least 1 advertisement banner on the homepage slider.");return}e.splice(t,1),saveState(),renderAdminHero(),renderAdminShop(),showAdminToast("Banner removed from slider")}function addEmptyBanner(){const t=getAdminBanners();if(t.length>=3){alert("Maximum of 3 advertisement banners supported on homepage slider.");return}t.push({id:Date.now(),top:"New Promotion",script:"Special",sub:"Celebration bakery cake promotion",cta:"Order Now",link:"products",img:"https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=700&q=85"}),saveState(),renderAdminHero(),renderAdminShop(),showAdminToast("\u2713 Added new advertisement banner slot")}function renderAdvertisementBannersSection(){const t=getAdminBanners();return`
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
      `}function toggleAddCustomPaymentForm(t){const e=document.getElementById("sm-add-custom-pay-box");e&&(typeof t=="boolean"?e.classList.toggle("hidden",!t):e.classList.toggle("hidden"))}function addCustomShopPaymentMethod(){collectCurrentShopTabInputs();const t=(document.getElementById("sm-new-pay-name")?.value||"").trim(),e=document.getElementById("sm-new-pay-type")?.value||"Bank Transfer",o=(document.getElementById("sm-new-pay-holder")?.value||"").trim(),n=(document.getElementById("sm-new-pay-num")?.value||"").trim(),s=(document.getElementById("sm-new-pay-inst")?.value||"").trim();if(!t||!n){typeof showAdminToast=="function"&&showAdminToast("Bank/Wallet name and account number are required");return}shopMgmtState.payments.customMethods=Array.isArray(shopMgmtState.payments.customMethods)?shopMgmtState.payments.customMethods:[],shopMgmtState.payments.customMethods.push({id:"pay-custom-"+Date.now(),name:t,type:e,accountHolder:o||"MAK Cake Bakery",accountNumber:n,instructions:s,enabled:!0}),renderAdminShop(),typeof showAdminToast=="function"&&showAdminToast("Added "+t+" \u2014 tap Save to persist")}function removeCustomShopPaymentMethod(t){collectCurrentShopTabInputs(),Array.isArray(shopMgmtState.payments.customMethods)&&(shopMgmtState.payments.customMethods.splice(t,1),renderAdminShop())}function syncSettingsToCloud(){window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.saveSettings=="function"&&window.FirebaseService.saveSettings(state.shop).catch(t=>console.warn("Cloud settings sync failed:",t))}function saveBusinessProfile(){ensureShopState();const t=(document.getElementById("shop-prof-name")?.value||"").trim(),e=(document.getElementById("shop-prof-phone")?.value||"").trim(),o=(document.getElementById("shop-prof-loc")?.value||"").trim(),n=(document.getElementById("shop-prof-addr")?.value||"").trim(),s=(document.getElementById("shop-prof-desc")?.value||"").trim();if(!t){showAdminToast("\u26A0\uFE0F Please enter business name");return}state.shop.businessName=t,state.shop.businessPhone=e||state.shop.businessPhone,state.shop.businessLocation=o||state.shop.businessLocation,state.shop.businessAddress=n||state.shop.businessAddress,state.shop.businessDesc=s||state.shop.businessDesc,saveState(),syncAll(),syncSettingsToCloud(),showAdminToast(`Business Profile saved: "${t}" live!`),showCustomerToast(`Bakery info updated: ${t}`)}function toggleDeliverySetting(t){ensureShopState(),state.shop[t]=!state.shop[t],saveState(),syncAll(),showAdminToast(`${t==="deliveryEnabled"?"Delivery":"Pickup"} ${state.shop[t]?"Enabled":"Disabled"}`)}function adjustDeliveryFee(t){ensureShopState(),state.shop.deliveryFee=Math.max(0,(state.shop.deliveryFee||0)+t),saveState(),syncAll(),showAdminToast(`Delivery Fee: ${fmtETB(state.shop.deliveryFee)}`)}function saveDeliverySettings(){ensureShopState();const t=parseInt(document.getElementById("shop-del-fee")?.value||"150",10),e=parseInt(document.getElementById("shop-del-min")?.value||"500",10),o=(document.getElementById("shop-del-areas")?.value||"").trim(),n=(document.getElementById("shop-del-inst")?.value||"").trim();state.shop.deliveryFee=isNaN(t)?150:t,state.shop.minOrderAmount=isNaN(e)?500:e,state.shop.deliveryAreas=o||state.shop.deliveryAreas,state.shop.deliveryInstructions=n||state.shop.deliveryInstructions,saveState(),syncAll(),syncSettingsToCloud(),showAdminToast(`Delivery settings saved (${fmtETB(state.shop.deliveryFee)})`)}function togglePaymentMethod(t){ensureShopState(),state.shop.paymentMethods[t]&&(state.shop.paymentMethods[t].enabled=!state.shop.paymentMethods[t].enabled,saveState(),syncAll(),showAdminToast(`${state.shop.paymentMethods[t].name} ${state.shop.paymentMethods[t].enabled?"Enabled":"Disabled"}`))}function savePaymentMethods(){ensureShopState();const t=document.getElementById("shop-pay-tele-name")?.value.trim(),e=document.getElementById("shop-pay-tele-num")?.value.trim(),o=document.getElementById("shop-pay-tele-inst")?.value.trim(),n=document.getElementById("shop-pay-cbe-name")?.value.trim(),s=document.getElementById("shop-pay-cbe-num")?.value.trim(),a=document.getElementById("shop-pay-cbe-inst")?.value.trim(),r=document.getElementById("shop-pay-cod-inst")?.value.trim();t&&(state.shop.paymentMethods.telebirr.accountName=t),e&&(state.shop.paymentMethods.telebirr.accountNumber=e),o&&(state.shop.paymentMethods.telebirr.instructions=o),n&&(state.shop.paymentMethods.cbe.accountName=n),s&&(state.shop.paymentMethods.cbe.accountNumber=s),a&&(state.shop.paymentMethods.cbe.instructions=a),r&&(state.shop.paymentMethods.cod.instructions=r),saveState(),syncAll(),syncSettingsToCloud(),showAdminToast("Payment methods & account details updated live!")}function toggleShopOpenStatus(){ensureShopState(),state.shop.isOpen=!state.shop.isOpen,saveState(),syncAll(),syncSettingsToCloud(),showAdminToast(state.shop.isOpen?"Bakery is now Open (8 AM \u2013 9 PM)":"Bakery set to Pre-Order Only"),showCustomerToast(state.shop.isOpen?"MAK CAKE is now Open":"Pre-Order Mode active")}function saveOrderPreferences(){ensureShopState();const t=document.getElementById("shop-ord-enabled")?.value==="true",e=parseInt(document.getElementById("shop-ord-lead")?.value||"4",10),o=(document.getElementById("shop-ord-inst")?.value||"").trim();state.shop.orderingEnabled=t,state.shop.leadTimeHours=isNaN(e)?4:e,state.shop.orderInstructions=o||state.shop.orderInstructions,saveState(),syncAll(),showAdminToast("Order preferences saved live!")}function saveWebsiteAppearance(){ensureShopState();const t=(document.getElementById("shop-app-announcement")?.value||"").trim(),e=(document.getElementById("shop-app-title")?.value||"").trim(),o=(document.getElementById("shop-app-sub")?.value||"").trim();t&&(state.shop.announcementText=t),e&&(state.shop.heroBannerTitle=e),o&&(state.shop.heroBannerSubtitle=o),saveState(),syncAll(),showAdminToast("Website appearance updated on customer storefront!"),showCustomerToast("Storefront banner refreshed")}function toggleRewardBoxEnabled(){typeof requirePackageFeature=="function"&&!requirePackageFeature("rewardBox","Mystery Reward Box")||(ensureShopState(),state.shop.rewardBox.enabled=!state.shop.rewardBox.enabled,saveState(),syncAll(),showAdminToast(`Reward Box ${state.shop.rewardBox.enabled?"Enabled":"Disabled"}`))}function addPromoCode(){if(typeof requirePackageFeature=="function"&&!requirePackageFeature("rewardBox","Promo Codes & Reward Box"))return;ensureShopState();const t=(document.getElementById("new-promo-code")?.value||"").trim().toUpperCase(),e=parseInt(document.getElementById("new-promo-disc")?.value||"10",10),o=document.getElementById("new-promo-type")?.value||"percent",n=(document.getElementById("new-promo-desc")?.value||"").trim();if(!t){showAdminToast("\u26A0\uFE0F Please enter promo code name");return}if(isNaN(e)||e<=0){showAdminToast("\u26A0\uFE0F Please enter valid discount amount");return}state.shop.rewardBox.promoCodes.unshift({id:"p-"+Date.now(),code:t,discount:e,type:o,desc:n||(o==="percent"?e+"% off orders":fmtETB(e)+" off orders"),active:!0,usedCount:0}),saveState(),syncAll(),showAdminToast(`Promo Code "${t}" activated!`),showCustomerToast(`New promo code ${t} available!`)}function togglePromoCode(t){ensureShopState();const e=state.shop.rewardBox.promoCodes.find(o=>o.id===t);e&&(e.active=!e.active,saveState(),syncAll(),showAdminToast(`Promo "${e.code}" ${e.active?"Activated":"Disabled"}`))}function deletePromoCode(t){ensureShopState();const e=state.shop.rewardBox.promoCodes.find(o=>o.id===t);e&&confirm(`Remove promo code "${e.code}"?`)&&(state.shop.rewardBox.promoCodes=state.shop.rewardBox.promoCodes.filter(o=>o.id!==t),saveState(),syncAll(),showAdminToast(`Removed promo code "${e.code}"`))}function addHomepageAd(){ensureShopState();const t=(document.getElementById("new-ad-title")?.value||"").trim(),e=(document.getElementById("new-ad-desc")?.value||"").trim(),o=(document.getElementById("new-ad-link")?.value||"").trim(),n=(document.getElementById("new-ad-img")?.value||"").trim()||"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80";if(!t){showAdminToast("\u26A0\uFE0F Please enter advertisement title");return}state.shop.ads.unshift({id:Date.now(),title:t,desc:e||"Same-day luxury cake delivery in Addis Ababa",link:o||"Order Now",img:n,active:!0}),saveState(),syncAll(),showAdminToast(`Published Ad: "${t}" live!`),showCustomerToast(`Featured: ${t}`)}function toggleHomepageAd(t){ensureShopState();const e=state.shop.ads.find(o=>o.id===t);e&&(e.active=!e.active,saveState(),syncAll(),showAdminToast(`Ad "${e.title}" ${e.active?"Activated":"Deactivated"}`))}function deleteHomepageAd(t){ensureShopState();const e=state.shop.ads.find(o=>o.id===t);e&&confirm(`Delete advertisement "${e.title}"?`)&&(state.shop.ads=state.shop.ads.filter(o=>o.id!==t),saveState(),syncAll(),showAdminToast(`Deleted advertisement "${e.title}"`))}function addManagerAccount(){if(typeof requirePackageFeature=="function"&&!requirePackageFeature("staffManagers","Additional Staff & Manager Accounts"))return;ensureShopState();const t=typeof getPackageLimit=="function"?getPackageLimit("staffLimit"):1;if((state.shop.managers||[]).length+1>=t){showAdminToast(`\u{1F512} Staff limit (${t}) reached on your current plan. Upgrade to add more managers.`,"error");return}const e=(document.getElementById("new-mgr-name")?.value||"").trim(),o=(document.getElementById("new-mgr-phone")?.value||"").trim(),n=(document.getElementById("new-mgr-role")?.value||"").trim(),s=document.getElementById("new-mgr-perm")?.value||"Orders & Inventory";if(!e){showAdminToast("\u26A0\uFE0F Please enter manager name");return}state.shop.managers.push({id:Date.now(),name:e,phone:o||"0900 00 00 00",role:n||"Kitchen Staff",permissions:s,active:!0}),saveState(),syncAll(),showAdminToast(`Manager "${e}" authorized (${s})!`)}function toggleManagerAccount(t){ensureShopState();const e=state.shop.managers.find(o=>o.id===t);e&&(e.active=!e.active,saveState(),syncAll(),showAdminToast(`Manager "${e.name}" ${e.active?"Activated":"Deactivated"}`))}function deleteManagerAccount(t){ensureShopState();const e=state.shop.managers.find(o=>o.id===t);e&&confirm(`Remove manager account for "${e.name}"?`)&&(state.shop.managers=state.shop.managers.filter(o=>o.id!==t),saveState(),syncAll(),showAdminToast(`Removed manager "${e.name}"`))}function updateAccountPasscode(){ensureShopState();const t=(document.getElementById("shop-sec-curr-pin")?.value||"").trim(),e=(document.getElementById("shop-sec-new-pin")?.value||"").trim(),o=(document.getElementById("shop-sec-conf-pin")?.value||"").trim();if(t!==state.shop.passcode){showAdminToast("\u26A0\uFE0F Current passcode is incorrect (default: 1234)");return}if(!e||e.length<4){showAdminToast("\u26A0\uFE0F New passcode must be at least 4 digits");return}if(e!==o){showAdminToast("\u26A0\uFE0F New passcodes do not match");return}state.shop.passcode=e,state.shop.lastPasscodeChange="Just now",saveState(),syncAll(),document.getElementById("shop-sec-curr-pin").value="",document.getElementById("shop-sec-new-pin").value="",document.getElementById("shop-sec-conf-pin").value="",showAdminToast("Security passcode updated successfully!")}function adminSecureLogout(){confirm("Log out of MAK CAKE Admin App?")&&(showAdminToast("Admin signed out safely."),switchWorkspaceMode("single-cust"),setTimeout(()=>{switchWorkspaceMode("dual"),switchAdminTab("overview")},1200))}adminShopSection="business";let shopMgmtState={business:{name:"MAK CAKE",logo:"./images/mak-cake-logo.webp",description:"Handcrafted luxury cakes, romantic bento duos, and celebration confections freshly baked in Addis Ababa.",phone:"0911 23 45 67",email:"hello@makcake.et",address:"Cameroon Street, Bole Sub-City, Addis Ababa, Ethiopia",googleMapsUrl:"https://maps.google.com/?q=9.0054,38.7885"},workingHours:{monday:{open:"08:00",close:"20:00",isOpen:!0,breakEnabled:!1,breakStart:"13:00",breakEnd:"14:00"},tuesday:{open:"08:00",close:"20:00",isOpen:!0,breakEnabled:!1,breakStart:"13:00",breakEnd:"14:00"},wednesday:{open:"08:00",close:"20:00",isOpen:!0,breakEnabled:!1,breakStart:"13:00",breakEnd:"14:00"},thursday:{open:"08:00",close:"20:00",isOpen:!0,breakEnabled:!1,breakStart:"13:00",breakEnd:"14:00"},friday:{open:"08:00",close:"20:30",isOpen:!0,breakEnabled:!1,breakStart:"13:00",breakEnd:"14:00"},saturday:{open:"08:00",close:"21:00",isOpen:!0,breakEnabled:!1,breakStart:"13:00",breakEnd:"14:00"},sunday:{open:"09:00",close:"19:00",isOpen:!0,breakEnabled:!1,breakStart:"13:00",breakEnd:"14:00"}},tempClosure:{enabled:!1,reopenAt:"",reason:""},location:{lat:9.0054,lng:38.7885,address:"Cameroon Street, Bole Sub-City, Addis Ababa, Ethiopia",googleMapsUrl:"https://maps.google.com/?q=9.0054,38.7885"},delivery:{deliveryEnabled:!0,deliveryFee:150,deliveryAreas:"Bole, CMC, Kazanchis, Old Airport, Sarbet, Piassa, Summit",minOrderAmount:500,pickupEnabled:!0,deliveryInstructions:"Same-day delivery chilled in insulated carrier boxes with real-time driver tracking."},payments:{cbe:{name:"Commercial Bank of Ethiopia (CBE)",enabled:!0,accountHolder:SHOP_SETTINGS_CONFIG.cbeHolder,accountNumber:SHOP_SETTINGS_CONFIG.cbeAccount,instructions:"Transfer to CBE and upload receipt."},telebirr:{name:"Telebirr",enabled:!0,accountHolder:SHOP_SETTINGS_CONFIG.telebirrHolder,accountNumber:SHOP_SETTINGS_CONFIG.telebirrNumber,instructions:"Transfer via Telebirr app and upload screenshot."},cod:{name:"Pay on Delivery",enabled:!0,accountHolder:"Cash on Arrival",accountNumber:"Bole Courier",instructions:"Pay courier in cash or Telebirr upon delivery."},verification:{requireReceipt:!0,manualApprovalRequired:!0,verificationNote:"Orders are confirmed after receipt verification by our cashier."}}},smPendingLogoData,smLeafletMap=null,smLeafletMarker=null;function computeShopOpenStatus(t=shopMgmtState){const e=new Date;if(t.tempClosure&&t.tempClosure.enabled&&(!t.tempClosure.reopenAt||e<new Date(t.tempClosure.reopenAt)))return{isOpen:!1,label:"Closed (Temp)",detail:t.tempClosure.reopenAt?"Reopens "+new Date(t.tempClosure.reopenAt).toLocaleString([],{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"Temporarily Closed"};const n=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][e.getDay()],s=t.workingHours&&t.workingHours[n];if(!s||!s.isOpen)return{isOpen:!1,label:"Closed Today",detail:"Scheduled day off"};const a=e.getHours()*60+e.getMinutes(),[r,i]=(s.open||"08:00").split(":").map(Number),[d,l]=(s.close||"20:00").split(":").map(Number),c=r*60+i,u=d*60+l;if(a<c||a>=u)return{isOpen:!1,label:"Closed Now",detail:`Hours: ${s.open} - ${s.close}`};if(s.breakEnabled&&s.breakStart&&s.breakEnd){const[p,f]=s.breakStart.split(":").map(Number),[h,g]=s.breakEnd.split(":").map(Number);if(a>=p*60+f&&a<h*60+g)return{isOpen:!1,label:"On Break",detail:`Break until ${s.breakEnd}`}}return{isOpen:!0,label:"Open Now",detail:`Open until ${s.close}`}}function syncShopToCustomerUI(){const t=computeShopOpenStatus(shopMgmtState);if(typeof state<"u"&&state.shop&&(state.shop.isOpen=t.isOpen,state.shop.businessName=shopMgmtState.business.name,state.shop.businessLogo=shopMgmtState.business.logo,state.shop.businessPhone=shopMgmtState.business.phone,state.shop.businessAddress=shopMgmtState.business.address,state.shop.businessDesc=shopMgmtState.business.description,state.shop.deliveryEnabled=shopMgmtState.delivery.deliveryEnabled,state.shop.deliveryFee=Number(shopMgmtState.delivery.deliveryFee)||0,state.shop.deliveryAreas=shopMgmtState.delivery.deliveryAreas,state.shop.minOrderAmount=Number(shopMgmtState.delivery.minOrderAmount)||0,state.shop.pickupEnabled=shopMgmtState.delivery.pickupEnabled,state.shop.deliveryInstructions=shopMgmtState.delivery.deliveryInstructions,state.shop.paymentMethods={telebirr:{enabled:!!shopMgmtState.payments.telebirr?.enabled,name:"Telebirr",accountName:shopMgmtState.payments.telebirr?.accountHolder||"",accountNumber:shopMgmtState.payments.telebirr?.accountNumber||"",instructions:shopMgmtState.payments.telebirr?.instructions||""},cbe:{enabled:!!shopMgmtState.payments.cbe?.enabled,name:"CBE Transfer",accountName:shopMgmtState.payments.cbe?.accountHolder||"",accountNumber:shopMgmtState.payments.cbe?.accountNumber||"",instructions:shopMgmtState.payments.cbe?.instructions||""},cod:{enabled:!!shopMgmtState.payments.cod?.enabled,name:"Pay on Delivery",accountName:shopMgmtState.payments.cod?.accountHolder||"Cash on Arrival",accountNumber:shopMgmtState.payments.cod?.accountNumber||"Bole Courier",instructions:shopMgmtState.payments.cod?.instructions||""}},state.shop.paymentVerification=shopMgmtState.payments.verification,typeof saveState=="function"))try{saveState()}catch{}const e=document.getElementById("sm-live-status-pill");if(e&&(e.textContent=(t.isOpen?"\u25CF ":"\u25CB ")+t.label,e.className=t.isOpen?"px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0":"px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-rose-50 text-berry border border-rose-200 shrink-0"),typeof renderAllCustomerViews=="function")try{renderAllCustomerViews()}catch{}}async function loadShopManagementFromDb(){try{const t=await fetch("/api/shop-management",{cache:"no-store"});if(t.ok){const e=await t.json();if(e.success&&e.shopManagement){shopMgmtState={...shopMgmtState,...e.shopManagement},localStorage.setItem("mak_shop_mgmt_v1",JSON.stringify(shopMgmtState)),syncShopToCustomerUI(),adminTab==="shop"&&renderAdminShop();return}}}catch{}try{const t=localStorage.getItem("mak_shop_mgmt_v1");t&&(shopMgmtState={...shopMgmtState,...JSON.parse(t)})}catch{}syncShopToCustomerUI(),adminTab==="shop"&&renderAdminShop()}function openShopManagementSection(){smPendingLogoData=void 0,switchAdminTab("shop"),loadShopManagementFromDb()}function setAdminShopSection(t){collectCurrentShopTabInputs(),adminShopSection=t,renderAdminShop()}function collectCurrentShopTabInputs(){document.getElementById("sm-biz-name")&&(shopMgmtState.business.name=document.getElementById("sm-biz-name").value.trim()||shopMgmtState.business.name,shopMgmtState.business.description=document.getElementById("sm-biz-desc").value.trim(),shopMgmtState.business.phone=document.getElementById("sm-biz-phone").value.trim(),shopMgmtState.business.email=document.getElementById("sm-biz-email").value.trim(),shopMgmtState.business.address=document.getElementById("sm-biz-address").value.trim(),shopMgmtState.business.googleMapsUrl=document.getElementById("sm-biz-maps").value.trim()),document.getElementById("sm-temp-closure-enabled")&&(shopMgmtState.tempClosure.enabled=document.getElementById("sm-temp-closure-enabled").checked,shopMgmtState.tempClosure.reopenAt=document.getElementById("sm-temp-reopen").value,shopMgmtState.tempClosure.reason=document.getElementById("sm-temp-reason").value.trim(),Object.keys(shopMgmtState.workingHours).forEach(t=>{const e=document.getElementById("sm-wh-open-"+t);e&&(shopMgmtState.workingHours[t]={isOpen:e.checked,open:document.getElementById("sm-wh-start-"+t).value||"08:00",close:document.getElementById("sm-wh-end-"+t).value||"20:00",breakEnabled:document.getElementById("sm-wh-brk-en-"+t).checked,breakStart:document.getElementById("sm-wh-brk-s-"+t).value||"13:00",breakEnd:document.getElementById("sm-wh-brk-e-"+t).value||"14:00"})})),document.getElementById("sm-loc-lat")&&(shopMgmtState.location.lat=parseFloat(document.getElementById("sm-loc-lat").value)||9.0054,shopMgmtState.location.lng=parseFloat(document.getElementById("sm-loc-lng").value)||38.7885,shopMgmtState.location.googleMapsUrl=document.getElementById("sm-loc-maps").value.trim(),shopMgmtState.business.googleMapsUrl=shopMgmtState.location.googleMapsUrl),document.getElementById("sm-del-enabled")&&(shopMgmtState.delivery.deliveryEnabled=document.getElementById("sm-del-enabled").checked,shopMgmtState.delivery.deliveryFee=Math.max(0,Number(document.getElementById("sm-del-fee").value)||0),shopMgmtState.delivery.deliveryAreas=document.getElementById("sm-del-areas").value.trim(),shopMgmtState.delivery.minOrderAmount=Math.max(0,Number(document.getElementById("sm-del-min").value)||0),shopMgmtState.delivery.pickupEnabled=document.getElementById("sm-del-pickup").checked,shopMgmtState.delivery.deliveryInstructions=document.getElementById("sm-del-inst").value.trim()),document.getElementById("sm-pay-cbe-en")&&(shopMgmtState.payments.cbe.enabled=document.getElementById("sm-pay-cbe-en").checked,shopMgmtState.payments.cbe.accountHolder=document.getElementById("sm-pay-cbe-holder").value.trim(),shopMgmtState.payments.cbe.accountNumber=document.getElementById("sm-pay-cbe-num").value.trim(),shopMgmtState.payments.cbe.instructions=document.getElementById("sm-pay-cbe-inst").value.trim(),shopMgmtState.payments.telebirr.enabled=document.getElementById("sm-pay-tb-en").checked,shopMgmtState.payments.telebirr.accountHolder=document.getElementById("sm-pay-tb-holder").value.trim(),shopMgmtState.payments.telebirr.accountNumber=document.getElementById("sm-pay-tb-num").value.trim(),shopMgmtState.payments.telebirr.instructions=document.getElementById("sm-pay-tb-inst").value.trim(),shopMgmtState.payments.cod.enabled=document.getElementById("sm-pay-cod-en").checked,shopMgmtState.payments.cod.instructions=document.getElementById("sm-pay-cod-inst").value.trim(),shopMgmtState.payments.verification={requireReceipt:document.getElementById("sm-pay-ver-receipt").checked,manualApprovalRequired:document.getElementById("sm-pay-ver-manual").checked,verificationNote:document.getElementById("sm-pay-ver-note").value.trim()},Array.isArray(shopMgmtState.payments.customMethods)&&shopMgmtState.payments.customMethods.forEach((t,e)=>{const o=document.getElementById("sm-pay-cust-en-"+e),n=document.getElementById("sm-pay-cust-holder-"+e),s=document.getElementById("sm-pay-cust-num-"+e),a=document.getElementById("sm-pay-cust-inst-"+e);o&&(t.enabled=o.checked),n&&(t.accountHolder=n.value.trim()),s&&(t.accountNumber=s.value.trim()),a&&(t.instructions=a.value.trim())}))}function handleShopLogoUpload(t){const e=t.files&&t.files[0];if(!e||!e.type.startsWith("image/"))return;const o=new FileReader;o.onload=n=>{smPendingLogoData=n.target.result;const s=document.getElementById("sm-biz-logo-preview");s&&(s.src=smPendingLogoData)},o.readAsDataURL(e)}function updateShopLocationPin(t,e,o=!0){const n=Number(t).toFixed(5),s=Number(e).toFixed(5);shopMgmtState.location.lat=Number(n),shopMgmtState.location.lng=Number(s);const a=document.getElementById("sm-loc-lat"),r=document.getElementById("sm-loc-lng"),i=document.getElementById("sm-loc-maps");a&&(a.value=n),r&&(r.value=s),i&&(i.value=`https://maps.google.com/?q=${n},${s}`,shopMgmtState.location.googleMapsUrl=i.value),o&&smLeafletMap&&smLeafletMarker&&(smLeafletMarker.setLatLng([Number(n),Number(s)]),smLeafletMap.setView([Number(n),Number(s)],15))}async function searchShopLocation(){const t=(document.getElementById("sm-loc-search")?.value||"").trim();if(!t)return;try{const s=await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(t+", Ethiopia")}`);if(s.ok){const a=await s.json();if(a&&a[0]){updateShopLocationPin(parseFloat(a[0].lat),parseFloat(a[0].lon),!0),typeof showAdminToast=="function"&&showAdminToast("Pin moved to "+a[0].display_name.split(",")[0]);return}}}catch{}const e={bole:[9.0054,38.7885],cmc:[9.0226,38.8565],kazanchis:[9.0175,38.7652],piassa:[9.0331,38.7501],sarbet:[8.9958,38.7386]},o=t.toLowerCase(),n=Object.keys(e).find(s=>o.includes(s));n?(updateShopLocationPin(e[n][0],e[n][1],!0),typeof showAdminToast=="function"&&showAdminToast("Pin moved to "+n.toUpperCase())):typeof showAdminToast=="function"&&showAdminToast("Location not found \u2014 tap map to set pin")}function initShopLocationMap(){const t=document.getElementById("sm-location-map");if(!t)return;const e=shopMgmtState.location.lat||9.0054,o=shopMgmtState.location.lng||38.7885,n=()=>{typeof L<"u"?(smLeafletMap&&(smLeafletMap.remove(),smLeafletMap=null),smLeafletMap=L.map(t,{zoomControl:!0}).setView([e,o],15),L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap"}).addTo(smLeafletMap),smLeafletMarker=L.marker([e,o],{draggable:!0}).addTo(smLeafletMap),smLeafletMarker.on("dragend",()=>{const s=smLeafletMarker.getLatLng();updateShopLocationPin(s.lat,s.lng,!1)}),smLeafletMap.on("click",s=>{updateShopLocationPin(s.latlng.lat,s.latlng.lng,!0)}),setTimeout(()=>{smLeafletMap&&smLeafletMap.invalidateSize()},200)):t.innerHTML=`<div onclick="updateShopLocationPin(9.0054 + (Math.random()-0.5)*0.01, 38.7885 + (Math.random()-0.5)*0.01, false)" class="w-full h-full bg-blush-50 flex flex-col items-center justify-center text-center p-3 cursor-pointer"><div class="text-berry font-extrabold text-xs">\u{1F4CD} Interactive Pin Pad (Offline Mode)</div><div class="text-[10px] text-ink-muted mt-1">Lat: ${e}, Lng: ${o} \u2022 Tap to adjust coordinates</div></div>`};if(typeof L>"u"){if(!document.getElementById("leaflet-css")){const s=document.createElement("link");s.id="leaflet-css",s.rel="stylesheet",s.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",document.head.appendChild(s)}if(document.getElementById("leaflet-js"))n();else{const s=document.createElement("script");s.id="leaflet-js",s.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",s.onload=n,s.onerror=n,document.head.appendChild(s)}}else n()}function renderAdminShop(){const t=document.getElementById("admin-shop-pills"),e=[{id:"business",label:"1. Business Info"},{id:"hours",label:"2. Working Hours"},{id:"location",label:"3. Shop Location"},{id:"delivery",label:"4. Delivery"},{id:"payments",label:"5. Payments"}];t&&(t.innerHTML=e.map(i=>{const d=adminShopSection===i.id;return`
            <button type="button" onclick="setAdminShopSection('${i.id}')" class="shrink-0 px-3 py-1.5 rounded-full text-[10.5px] font-bold transition-all cursor-pointer ${d?"btn-berry text-white shadow-rose-sm":"bg-white text-ink-muted border border-blush-200 hover:text-ink"}">
              ${i.label}
            </button>
          `}).join(""));const o=document.getElementById("admin-shop-body");if(!o)return;const n=computeShopOpenStatus(shopMgmtState),s=document.getElementById("sm-live-status-pill");s&&(s.textContent=(n.isOpen?"\u25CF ":"\u25CB ")+n.label,s.className=n.isOpen?"px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0":"px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-rose-50 text-berry border border-rose-200 shrink-0");const a=[{key:"monday",label:"Monday"},{key:"tuesday",label:"Tuesday"},{key:"wednesday",label:"Wednesday"},{key:"thursday",label:"Thursday"},{key:"friday",label:"Friday"},{key:"saturday",label:"Saturday"},{key:"sunday",label:"Sunday"}];let r="";if(adminShopSection==="business"){const i=shopMgmtState.business;r=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-3">
            <h3 class="text-xs font-extrabold text-ink">1. Business Information</h3>
            <div class="flex items-center gap-3 p-2.5 rounded-2xl bg-blush-50/70 border border-blush-200/70">
              <img id="sm-biz-logo-preview" src="${smPendingLogoData||i.logo||"./images/mak-cake-logo.webp"}" alt="Shop Logo" class="w-12 h-12 rounded-xl object-cover bg-white border border-blush-200 shrink-0" />
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
              <input id="sm-biz-name" type="text" value="${i.name||""}" class="w-full px-3 py-2 rounded-xl bg-blush-50/70 border border-blush-200 text-xs font-bold text-ink focus:outline-none focus:ring-2 focus:ring-berry/30" />
            </div>
            <div>
              <label class="block text-[10.5px] font-bold text-ink-muted mb-1">Business Description</label>
              <textarea id="sm-biz-desc" rows="2" class="w-full px-3 py-2 rounded-xl bg-blush-50/70 border border-blush-200 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-berry/30">${i.description||""}</textarea>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-[10.5px] font-bold text-ink-muted mb-1">Phone Number *</label>
                <input id="sm-biz-phone" type="tel" value="${i.phone||""}" class="w-full px-3 py-2 rounded-xl bg-blush-50/70 border border-blush-200 text-xs font-bold text-ink focus:outline-none focus:ring-2 focus:ring-berry/30" />
              </div>
              <div>
                <label class="block text-[10.5px] font-bold text-ink-muted mb-1">Email</label>
                <input id="sm-biz-email" type="email" value="${i.email||""}" class="w-full px-3 py-2 rounded-xl bg-blush-50/70 border border-blush-200 text-xs font-bold text-ink focus:outline-none focus:ring-2 focus:ring-berry/30" />
              </div>
            </div>
            <div>
              <label class="block text-[10.5px] font-bold text-ink-muted mb-1">Business Address</label>
              <input id="sm-biz-address" type="text" value="${i.address||""}" class="w-full px-3 py-2 rounded-xl bg-blush-50/70 border border-blush-200 text-xs font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-berry/30" />
            </div>
            <div>
              <label class="block text-[10.5px] font-bold text-ink-muted mb-1">Google Maps Link</label>
              <input id="sm-biz-maps" type="url" value="${i.googleMapsUrl||""}" class="w-full px-3 py-2 rounded-xl bg-blush-50/70 border border-blush-200 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-berry/30" />
            </div>
          </div>`}else if(adminShopSection==="hours"){const i=shopMgmtState.tempClosure||{};r=`
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
                <input id="sm-temp-closure-enabled" type="checkbox" ${i.enabled?"checked":""} class="w-4 h-4 accent-berry rounded cursor-pointer" />
              </label>
              <div class="grid grid-cols-1 gap-2">
                <div>
                  <label class="block text-[10px] font-bold text-ink-muted mb-0.5">Reopening Date &amp; Time</label>
                  <input id="sm-temp-reopen" type="datetime-local" value="${i.reopenAt||""}" class="w-full px-2.5 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-bold text-ink" />
                </div>
                <div>
                  <label class="block text-[10px] font-bold text-ink-muted mb-0.5">Closure Note (Optional)</label>
                  <input id="sm-temp-reason" type="text" value="${i.reason||""}" placeholder="e.g. Holiday baking break" class="w-full px-2.5 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] text-ink" />
                </div>
              </div>
            </div>

            <!-- Per-day Schedule -->
            <div class="space-y-2">
              ${a.map(d=>{const l=shopMgmtState.workingHours[d.key]||{open:"08:00",close:"20:00",isOpen:!0,breakEnabled:!1,breakStart:"13:00",breakEnd:"14:00"};return`
                  <div class="p-2.5 rounded-2xl border border-blush-100 bg-blush-50/40 space-y-1.5">
                    <div class="flex items-center justify-between gap-2">
                      <label class="flex items-center gap-2 cursor-pointer">
                        <input id="sm-wh-open-${d.key}" type="checkbox" ${l.isOpen?"checked":""} class="w-3.5 h-3.5 accent-berry cursor-pointer" />
                        <span class="text-[11px] font-extrabold text-ink">${d.label}</span>
                      </label>
                      <div class="flex items-center gap-1">
                        <input id="sm-wh-start-${d.key}" type="time" value="${l.open||"08:00"}" class="px-1.5 py-1 rounded-lg bg-white border border-blush-200 text-[10px] font-bold text-ink" />
                        <span class="text-[10px] text-ink-muted">-</span>
                        <input id="sm-wh-end-${d.key}" type="time" value="${l.close||"20:00"}" class="px-1.5 py-1 rounded-lg bg-white border border-blush-200 text-[10px] font-bold text-ink" />
                      </div>
                    </div>
                    <div class="flex items-center justify-between gap-2 pl-5">
                      <label class="flex items-center gap-1.5 text-[9.5px] font-bold text-ink-muted cursor-pointer">
                        <input id="sm-wh-brk-en-${d.key}" type="checkbox" ${l.breakEnabled?"checked":""} class="w-3 h-3 accent-berry" />
                        <span>Break</span>
                      </label>
                      <div class="flex items-center gap-1">
                        <input id="sm-wh-brk-s-${d.key}" type="time" value="${l.breakStart||"13:00"}" class="px-1.5 py-0.5 rounded-lg bg-white border border-blush-100 text-[9.5px] text-ink" />
                        <span class="text-[9.5px] text-ink-muted">-</span>
                        <input id="sm-wh-brk-e-${d.key}" type="time" value="${l.breakEnd||"14:00"}" class="px-1.5 py-0.5 rounded-lg bg-white border border-blush-100 text-[9.5px] text-ink" />
                      </div>
                    </div>
                  </div>`}).join("")}
            </div>
          </div>`}else if(adminShopSection==="location"){const i=shopMgmtState.location;r=`
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
                <input id="sm-loc-lat" type="number" step="0.00001" value="${i.lat}" class="w-full px-2.5 py-1.5 rounded-xl bg-blush-50 border border-blush-200 text-xs font-bold text-ink" />
              </div>
              <div>
                <label class="block text-[10px] font-bold text-ink-muted mb-0.5">Longitude</label>
                <input id="sm-loc-lng" type="number" step="0.00001" value="${i.lng}" class="w-full px-2.5 py-1.5 rounded-xl bg-blush-50 border border-blush-200 text-xs font-bold text-ink" />
              </div>
            </div>
            <div>
              <label class="block text-[10px] font-bold text-ink-muted mb-0.5">Google Maps Link</label>
              <input id="sm-loc-maps" type="url" value="${i.googleMapsUrl||""}" class="w-full px-2.5 py-1.5 rounded-xl bg-blush-50 border border-blush-200 text-xs text-ink" />
            </div>
          </div>`}else if(adminShopSection==="delivery"){const i=shopMgmtState.delivery;r=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-3">
            <h3 class="text-xs font-extrabold text-ink">4. Delivery Settings</h3>
            <div class="grid grid-cols-2 gap-2">
              <label class="p-2.5 rounded-2xl bg-blush-50/70 border border-blush-200 flex items-center justify-between cursor-pointer">
                <span class="text-[11px] font-extrabold text-ink">Delivery Enabled</span>
                <input id="sm-del-enabled" type="checkbox" ${i.deliveryEnabled?"checked":""} class="w-4 h-4 accent-berry" />
              </label>
              <label class="p-2.5 rounded-2xl bg-blush-50/70 border border-blush-200 flex items-center justify-between cursor-pointer">
                <span class="text-[11px] font-extrabold text-ink">Pickup Available</span>
                <input id="sm-del-pickup" type="checkbox" ${i.pickupEnabled?"checked":""} class="w-4 h-4 accent-berry" />
              </label>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-[10.5px] font-bold text-ink-muted mb-1">Delivery Fee (ETB)</label>
                <input id="sm-del-fee" type="number" min="0" value="${i.deliveryFee}" class="w-full px-3 py-2 rounded-xl bg-blush-50 border border-blush-200 text-xs font-extrabold text-ink" />
              </div>
              <div>
                <label class="block text-[10.5px] font-bold text-ink-muted mb-1">Min Order (ETB)</label>
                <input id="sm-del-min" type="number" min="0" value="${i.minOrderAmount}" class="w-full px-3 py-2 rounded-xl bg-blush-50 border border-blush-200 text-xs font-extrabold text-ink" />
              </div>
            </div>
            <div>
              <label class="block text-[10.5px] font-bold text-ink-muted mb-1">Delivery Areas</label>
              <input id="sm-del-areas" type="text" value="${i.deliveryAreas||""}" class="w-full px-3 py-2 rounded-xl bg-blush-50 border border-blush-200 text-xs font-semibold text-ink" />
            </div>
            <div>
              <label class="block text-[10.5px] font-bold text-ink-muted mb-1">Delivery Instructions</label>
              <textarea id="sm-del-inst" rows="2" class="w-full px-3 py-2 rounded-xl bg-blush-50 border border-blush-200 text-xs text-ink">${i.deliveryInstructions||""}</textarea>
            </div>
          </div>`}else if(adminShopSection==="payments"){const i=shopMgmtState.payments||{},d=i.verification||{},l=Array.isArray(i.customMethods)?i.customMethods:[];r=`
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
                <input id="sm-pay-cbe-en" type="checkbox" ${i.cbe?.enabled?"checked":""} class="sr-only peer" />
                <div class="w-10 h-5 bg-stone-200 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-stone-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
            <div class="space-y-2">
              <div>
                <label class="block text-[10px] font-bold text-ink mb-1">Account Holder Name</label>
                <input id="sm-pay-cbe-holder" type="text" placeholder="e.g. MAK Cake Artisanal Bakery" value="${i.cbe?.accountHolder||""}" class="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/40 text-xs font-semibold text-ink focus:outline-none focus:border-berry" />
              </div>
              <div>
                <label class="block text-[10px] font-bold text-ink mb-1">CBE Account Number</label>
                <input id="sm-pay-cbe-num" type="text" placeholder="e.g. 1000123456789" value="${i.cbe?.accountNumber||""}" class="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/40 text-xs font-mono font-bold text-ink focus:outline-none focus:border-berry" />
              </div>
              <div>
                <label class="block text-[10px] font-bold text-ink mb-1">Customer Payment Instructions</label>
                <input id="sm-pay-cbe-inst" type="text" placeholder="Transfer to CBE and upload receipt..." value="${i.cbe?.instructions||""}" class="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/40 text-[11px] text-ink focus:outline-none focus:border-berry" />
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
                <input id="sm-pay-tb-en" type="checkbox" ${i.telebirr?.enabled?"checked":""} class="sr-only peer" />
                <div class="w-10 h-5 bg-stone-200 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-stone-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-600"></div>
              </label>
            </div>
            <div class="space-y-2">
              <div>
                <label class="block text-[10px] font-bold text-ink mb-1">Account Holder Name</label>
                <input id="sm-pay-tb-holder" type="text" placeholder="e.g. MAK Cake Bakery" value="${i.telebirr?.accountHolder||""}" class="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/40 text-xs font-semibold text-ink focus:outline-none focus:border-berry" />
              </div>
              <div>
                <label class="block text-[10px] font-bold text-ink mb-1">Telebirr Number</label>
                <input id="sm-pay-tb-num" type="text" placeholder="e.g. 0911234567" value="${i.telebirr?.accountNumber||""}" class="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/40 text-xs font-mono font-bold text-ink focus:outline-none focus:border-berry" />
              </div>
              <div>
                <label class="block text-[10px] font-bold text-ink mb-1">Customer Payment Instructions</label>
                <input id="sm-pay-tb-inst" type="text" placeholder="Transfer via Telebirr app and upload screenshot..." value="${i.telebirr?.instructions||""}" class="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/40 text-[11px] text-ink focus:outline-none focus:border-berry" />
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
                <input id="sm-pay-cod-en" type="checkbox" ${i.cod?.enabled?"checked":""} class="sr-only peer" />
                <div class="w-10 h-5 bg-stone-200 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-stone-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-berry"></div>
              </label>
            </div>
            <div>
              <label class="block text-[10px] font-bold text-ink mb-1">Courier Payment Instructions</label>
              <input id="sm-pay-cod-inst" type="text" placeholder="Pay courier in cash or Telebirr upon delivery..." value="${i.cod?.instructions||""}" class="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/40 text-[11px] text-ink focus:outline-none focus:border-berry" />
            </div>
          </div>

          <!-- 4. Additional Bank Accounts & Mobile Wallets (Custom Methods) -->
          ${l.length?`
            <div class="space-y-2.5">
              <div class="px-1 flex items-center justify-between">
                <span class="text-[10.5px] font-extrabold uppercase tracking-wider text-ink">Additional Banks &amp; Wallets (${l.length})</span>
              </div>
              ${l.map((c,u)=>`
                <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-stone-200/80 space-y-2.5">
                  <div class="flex items-center justify-between pb-2 border-b border-stone-100">
                    <div class="min-w-0">
                      <div class="flex items-center gap-1.5">
                        <h4 class="font-extrabold text-xs text-ink truncate">${c.name}</h4>
                        <span class="px-2 py-0.5 rounded-full bg-blush-100 text-berry text-[9px] font-extrabold shrink-0">${c.type||"Bank"}</span>
                      </div>
                    </div>
                    <div class="flex items-center gap-2 shrink-0">
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input id="sm-pay-cust-en-${u}" type="checkbox" ${c.enabled!==!1?"checked":""} class="sr-only peer" />
                        <div class="w-9 h-5 bg-stone-200 rounded-full peer peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-stone-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-berry"></div>
                      </label>
                      <button type="button" onclick="removeCustomShopPaymentMethod(${u})" class="text-[10px] font-bold text-rose-600 cursor-pointer">&times;</button>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-2">
                    <input id="sm-pay-cust-holder-${u}" type="text" placeholder="Account Holder" value="${c.accountHolder||""}" class="px-2.5 py-1.5 rounded-xl border border-stone-200 bg-stone-50/40 text-[11px] font-semibold text-ink" />
                    <input id="sm-pay-cust-num-${u}" type="text" placeholder="Account Number" value="${c.accountNumber||""}" class="px-2.5 py-1.5 rounded-xl border border-stone-200 bg-stone-50/40 text-[11px] font-mono font-bold text-ink" />
                  </div>
                  <input id="sm-pay-cust-inst-${u}" type="text" placeholder="Instructions..." value="${c.instructions||""}" class="w-full px-2.5 py-1.5 rounded-xl border border-stone-200 bg-stone-50/40 text-[11px] text-ink" />
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
                <input id="sm-pay-ver-receipt" type="checkbox" ${d.requireReceipt!==!1?"checked":""} class="sr-only peer" />
                <div class="w-10 h-5 bg-stone-200 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-stone-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-berry"></div>
              </label>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="text-[11px] font-bold text-ink">Require Admin/Cashier Approval</span>
              <label class="relative inline-flex items-center cursor-pointer shrink-0">
                <input id="sm-pay-ver-manual" type="checkbox" ${d.manualApprovalRequired!==!1?"checked":""} class="sr-only peer" />
                <div class="w-10 h-5 bg-stone-200 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-stone-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-berry"></div>
              </label>
            </div>
            <div>
              <label class="block text-[10px] font-bold text-ink mb-1">Customer Verification Note</label>
              <input id="sm-pay-ver-note" type="text" placeholder="Customer verification note..." value="${d.verificationNote||""}" class="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/40 text-[11px] text-ink focus:outline-none focus:border-berry" />
            </div>
          </div>`}o.innerHTML=r+`
        <button type="button" id="sm-save-btn" onclick="saveShopManagement()" class="w-full py-3 rounded-full btn-berry text-white text-xs font-extrabold shadow-rose-sm active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Save Shop Settings Permanently</span>
        </button>
      `,adminShopSection==="location"&&initShopLocationMap()}async function saveShopManagement(){if(collectCurrentShopTabInputs(),!shopMgmtState.business.name||!shopMgmtState.business.name.trim()){typeof showAdminToast=="function"&&showAdminToast("Shop name is required");return}if(!shopMgmtState.business.phone||!shopMgmtState.business.phone.trim()){typeof showAdminToast=="function"&&showAdminToast("Phone number is required");return}const t=JSON.parse(JSON.stringify(shopMgmtState));smPendingLogoData&&(t.business.logo=smPendingLogoData);const e=document.getElementById("sm-save-btn");await runWithFeedback({lockKey:"save-shop-mgmt",btnEl:e,scope:"admin",loadingMsg:"Saving shop settings...",successMsg:"Changes saved successfully!",action:async()=>{try{const o=await fetch("/api/shop-management",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(o.ok){const n=await o.json();n&&n.settings?.brand?.logo&&(shopMgmtState.business.logo=n.settings.brand.logo,smPendingLogoData=void 0)}}catch{}return localStorage.setItem("mak_shop_mgmt_v1",JSON.stringify(shopMgmtState)),typeof state<"u"&&state.shop&&(state.shop.businessName=shopMgmtState.business.name||state.shop.businessName,state.shop.businessPhone=shopMgmtState.business.phone||state.shop.businessPhone,state.shop.businessAddress=shopMgmtState.business.address||state.shop.businessAddress,state.shop.businessDesc=shopMgmtState.business.description||state.shop.businessDesc,state.shop.googleMapsUrl=shopMgmtState.location.googleMapsUrl||shopMgmtState.business.googleMapsUrl||state.shop.googleMapsUrl,state.shop.lat=shopMgmtState.location.lat,state.shop.lng=shopMgmtState.location.lng,saveState(),syncSettingsToCloud()),syncShopToCustomerUI(),renderAdminShop(),!0}})}let pcActiveTab="sizes",productConfigState={enabled:!0,sectionsEnabled:{sizes:!0,weights:!0,units:!0,rules:!0,options:!0},sizes:[{id:'6" Standard',label:'6" Standard',add:0,serves:"6\u20138 Guests",enabled:!0},{id:'8" Celebration',label:'8" Celebration',add:700,serves:"12\u201315 Guests",enabled:!0},{id:'10" Grand',label:'10" Grand',add:1600,serves:"20\u201324 Guests",enabled:!0},{id:"2-Tier Luxury",label:"2-Tier",add:4200,serves:"35+ Guests",enabled:!0}],weights:[{id:"wt-500g",value:500,unit:"g",add:0,enabled:!0},{id:"wt-1kg",value:1,unit:"kg",add:450,enabled:!0},{id:"wt-1-5kg",value:1.5,unit:"kg",add:900,enabled:!0},{id:"wt-2kg",value:2,unit:"kg",add:1400,enabled:!0}],units:{defaultUnit:"g",allowGrams:!0,allowKilograms:!0,gramsPerKg:1e3},pricingRules:[{id:"rule-1",sizeId:'8" Celebration',weightId:"wt-1-5kg",extraCharge:250,label:"Celebration + 1.5kg Reinforcement",enabled:!0},{id:"rule-2",sizeId:"2-Tier Luxury",weightId:"wt-2kg",extraCharge:500,label:"2-Tier Dowel & Box Support",enabled:!0}],customizations:[{id:"opt-msg",name:"Custom Cake Inscription",charge:0,required:!1,enabled:!0},{id:"opt-eggless",name:"Eggless / Special Dietary Prep",charge:250,required:!1,enabled:!0},{id:"opt-gold",name:"Edible Gold Leaf Accent",charge:450,required:!1,enabled:!0},{id:"opt-express",name:"Express 3-Hour Kitchen Prep",charge:350,required:!1,enabled:!0}]};function convertCakeWeight(t,e,o){const n=Number(t)||0;return e===o?n:e==="kg"&&o==="g"?Math.round(n*1e3):e==="g"&&o==="kg"?Number((n/1e3).toFixed(2)):n}function formatCakeWeight(t){const e=productConfigState.units?.defaultUnit||t.unit;return e==="g"&&productConfigState.units?.allowGrams||e==="kg"&&productConfigState.units?.allowKilograms?convertCakeWeight(t.value,t.unit,e)+e:t.value+t.unit}function syncProductConfigToOrderSystem(){const t=(productConfigState.sizes||[]).filter(e=>e.enabled!==!1);if(t.length>0&&(SIZES=t.map(e=>({id:e.id,label:e.label,add:Number(e.add)||0,serves:e.serves||"6\u20138 Guests"}))),typeof renderOrderSheet=="function"&&document.getElementById("order-sheet")&&!document.getElementById("order-sheet").classList.contains("hidden"))try{renderOrderSheet()}catch{}}async function loadProductConfigFromDb(){try{const t=await fetch("/api/product-config",{cache:"no-store"});if(t.ok){const e=await t.json();if(e.success&&e.productConfig){productConfigState={...productConfigState,...e.productConfig},localStorage.setItem("mak_product_config_v1",JSON.stringify(productConfigState)),syncProductConfigToOrderSystem(),adminTab==="product-config"&&renderProductConfig();return}}}catch{}try{const t=localStorage.getItem("mak_product_config_v1");t&&(productConfigState={...productConfigState,...JSON.parse(t)})}catch{}syncProductConfigToOrderSystem(),adminTab==="product-config"&&renderProductConfig()}function openProductConfigSection(){switchAdminTab("product-config"),loadProductConfigFromDb()}function toggleProductConfigMaster(t){productConfigState.enabled=!!t;const e=document.getElementById("pc-master-label");e&&(e.textContent=productConfigState.enabled?"ON":"OFF",e.className=productConfigState.enabled?"text-[10px] font-extrabold text-berry":"text-[10px] font-extrabold text-ink-muted"),renderProductConfig()}function togglePcSectionEnabled(t,e){productConfigState.sectionsEnabled=productConfigState.sectionsEnabled||{sizes:!0,weights:!0,units:!0,rules:!0,options:!0},productConfigState.sectionsEnabled[t]=!!e,renderProductConfig()}function renderPcOnOffSwitch(t,e){return`
        <label class="inline-flex items-center gap-1.5 cursor-pointer shrink-0">
          <span class="text-[9.5px] font-extrabold ${t?"text-berry":"text-ink-muted"}">${t?"ON":"OFF"}</span>
          <div class="relative inline-flex items-center">
            <input type="checkbox" ${t?"checked":""} onchange="${e}" class="sr-only peer" />
            <div class="w-9 h-5 bg-stone-200 rounded-full peer peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-stone-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-berry"></div>
          </div>
        </label>
      `}function setProductConfigTab(t){pcActiveTab=t,renderProductConfig()}function addPcSize(){const t=productConfigState.sizes.length+1;productConfigState.sizes.push({id:"size-"+Date.now(),label:"Custom Size "+t,add:500,serves:"10\u201312 Guests",enabled:!0}),renderProductConfig()}function updatePcSize(t,e,o){const n=productConfigState.sizes[t];n&&(n[e]=e==="add"?Math.max(0,Number(o)||0):e==="enabled"?!!o:String(o),e==="label"&&!n.id.startsWith('6"')&&!n.id.startsWith('8"')&&!n.id.startsWith('10"')&&!n.id.startsWith("2-Tier")&&(n.id=String(o).trim()||n.id))}function deletePcSize(t){if(productConfigState.sizes.length<=1){typeof showAdminToast=="function"&&showAdminToast("Keep at least one cake size");return}productConfigState.sizes.splice(t,1),renderProductConfig()}function addPcWeight(){productConfigState.weights.push({id:"wt-"+Date.now(),value:750,unit:"g",add:300,enabled:!0}),renderProductConfig()}function updatePcWeight(t,e,o){const n=productConfigState.weights[t];n&&(e==="value"?n.value=Math.max(.05,Number(o)||.5):e==="add"?n.add=Math.max(0,Number(o)||0):e==="unit"?n.unit=o==="kg"?"kg":"g":e==="enabled"&&(n.enabled=!!o))}function deletePcWeight(t){if(productConfigState.weights.length<=1){typeof showAdminToast=="function"&&showAdminToast("Keep at least one cake weight");return}productConfigState.weights.splice(t,1),renderProductConfig()}function addPcRule(){const t=productConfigState.sizes[0]?.id||"",e=productConfigState.weights[0]?.id||"";productConfigState.pricingRules.push({id:"rule-"+Date.now(),sizeId:t,weightId:e,extraCharge:200,label:"Custom Rule",enabled:!0}),renderProductConfig()}function updatePcRule(t,e,o){const n=productConfigState.pricingRules[t];n&&(e==="extraCharge"?n.extraCharge=Math.max(0,Number(o)||0):e==="enabled"?n.enabled=!!o:n[e]=String(o))}function deletePcRule(t){productConfigState.pricingRules.splice(t,1),renderProductConfig()}function addPcCustomization(){productConfigState.customizations.push({id:"opt-"+Date.now(),name:"New Option",charge:150,required:!1,enabled:!0}),renderProductConfig()}function updatePcCustomization(t,e,o){const n=productConfigState.customizations[t];n&&(e==="charge"?n.charge=Math.max(0,Number(o)||0):e==="enabled"||e==="required"?n[e]=!!o:n[e]=String(o))}function deletePcCustomization(t){productConfigState.customizations.splice(t,1),renderProductConfig()}function renderProductConfig(){const t=document.getElementById("pc-subtabs"),e=[{id:"sizes",label:"1. Sizes"},{id:"weights",label:"2. Weights"},{id:"units",label:"3. Units"},{id:"rules",label:"4. Pricing Rules"},{id:"options",label:"5. Customizations"}];t&&(t.innerHTML=e.map(c=>{const u=pcActiveTab===c.id;return`<button type="button" onclick="setProductConfigTab('${c.id}')" class="shrink-0 px-3 py-1.5 rounded-full text-[10.5px] font-bold transition-all cursor-pointer ${u?"btn-berry text-white shadow-rose-sm":"bg-white text-ink-muted border border-blush-200 hover:text-ink"}">${c.label}</button>`}).join(""));const o=document.getElementById("pc-body");if(!o)return;let n="";if(pcActiveTab==="sizes")n=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-2.5">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-extrabold text-ink">1. Cake Sizes</h3>
              <button type="button" onclick="addPcSize()" class="px-2.5 py-1 rounded-full bg-blush-100 text-berry text-[10px] font-extrabold cursor-pointer">+ Add Size</button>
            </div>
            <div class="space-y-2">
              ${productConfigState.sizes.map((c,u)=>`
                <div class="p-2.5 rounded-2xl bg-blush-50/70 border border-blush-200/80 space-y-2">
                  <div class="flex items-center justify-between gap-2">
                    ${renderPcOnOffSwitch(c.enabled!==!1,`updatePcSize(${u}, 'enabled', this.checked); renderProductConfig();`)}

                    <button type="button" onclick="deletePcSize(${u})" class="text-[10px] font-bold text-rose-600 cursor-pointer">&times; Delete</button>
                  </div>
                  <div class="grid grid-cols-3 gap-1.5">
                    <input type="text" value="${c.label}" onchange="updatePcSize(${u}, 'label', this.value)" placeholder="Label" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-bold text-ink" />
                    <input type="text" value="${c.serves}" onchange="updatePcSize(${u}, 'serves', this.value)" placeholder="Servings" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] text-ink" />
                    <input type="number" min="0" value="${c.add}" onchange="updatePcSize(${u}, 'add', this.value)" placeholder="+ETB" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-extrabold text-berry" />
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
              ${productConfigState.weights.map((c,u)=>`
                <div class="p-2.5 rounded-2xl bg-blush-50/70 border border-blush-200/80 space-y-2">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">${renderPcOnOffSwitch(c.enabled!==!1,`updatePcWeight(${u}, 'enabled', this.checked); renderProductConfig();`)}<span class="text-[9.5px] font-bold text-ink-muted">(${convertCakeWeight(c.value,c.unit,c.unit==="g"?"kg":"g")}${c.unit==="g"?"kg":"g"})</span></div>
                    <button type="button" onclick="deletePcWeight(${u})" class="text-[10px] font-bold text-rose-600 cursor-pointer">&times; Delete</button>
                  </div>
                  <div class="grid grid-cols-3 gap-1.5">
                    <input type="number" step="0.1" min="0.1" value="${c.value}" onchange="updatePcWeight(${u}, 'value', this.value); renderProductConfig();" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-bold text-ink" />
                    <select onchange="updatePcWeight(${u}, 'unit', this.value); renderProductConfig();" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-bold text-ink">
                      <option value="g" ${c.unit==="g"?"selected":""}>Grams (g)</option>
                      <option value="kg" ${c.unit==="kg"?"selected":""}>Kilograms (kg)</option>
                    </select>
                    <input type="number" min="0" value="${c.add}" onchange="updatePcWeight(${u}, 'add', this.value)" placeholder="+ETB" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-extrabold text-berry" />
                  </div>
                </div>`).join("")}
            </div>
          </div>`;else if(pcActiveTab==="units"){const c=productConfigState.units||{};n=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-3">
            <h3 class="text-xs font-extrabold text-ink">3. Measurement Units</h3>
            <label class="p-2.5 rounded-2xl bg-blush-50/70 border border-blush-200 flex items-center justify-between cursor-pointer">
              <span class="text-[11px] font-bold text-ink">Enable Grams (g)</span>
              <input type="checkbox" ${c.allowGrams!==!1?"checked":""} onchange="productConfigState.units.allowGrams = this.checked" class="w-4 h-4 accent-berry" />
            </label>
            <label class="p-2.5 rounded-2xl bg-blush-50/70 border border-blush-200 flex items-center justify-between cursor-pointer">
              <span class="text-[11px] font-bold text-ink">Enable Kilograms (kg)</span>
              <input type="checkbox" ${c.allowKilograms!==!1?"checked":""} onchange="productConfigState.units.allowKilograms = this.checked" class="w-4 h-4 accent-berry" />
            </label>
            <div>
              <label class="block text-[10.5px] font-bold text-ink-muted mb-1">Customer Display Unit</label>
              <select onchange="productConfigState.units.defaultUnit = this.value; renderProductConfig();" class="w-full px-3 py-2 rounded-xl bg-blush-50 border border-blush-200 text-xs font-bold text-ink">
                <option value="g" ${c.defaultUnit==="g"?"selected":""}>Grams (g) \u2014 e.g. 500g, 1000g</option>
                <option value="kg" ${c.defaultUnit==="kg"?"selected":""}>Kilograms (kg) \u2014 e.g. 0.5kg, 1kg</option>
              </select>
            </div>
            <div class="p-2.5 rounded-xl bg-blush-50 border border-blush-200 text-[10.5px] text-ink-muted">
              Conversion standard: <strong class="text-ink">1 kg = 1,000 g</strong>. All customer weights automatically convert to <strong class="text-berry">${c.defaultUnit||"g"}</strong>.
            </div>
          </div>`}else pcActiveTab==="rules"?n=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-2.5">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-extrabold text-ink">4. Pricing Rules (Size + Weight)</h3>
              <button type="button" onclick="addPcRule()" class="px-2.5 py-1 rounded-full bg-blush-100 text-berry text-[10px] font-extrabold cursor-pointer">+ Add Rule</button>
            </div>
            <div class="space-y-2">
              ${productConfigState.pricingRules.length?productConfigState.pricingRules.map((c,u)=>`
                <div class="p-2.5 rounded-2xl bg-blush-50/70 border border-blush-200/80 space-y-2">
                  <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-2 flex-1 min-w-0">${renderPcOnOffSwitch(c.enabled!==!1,`updatePcRule(${u}, 'enabled', this.checked); renderProductConfig();`)}<input type="text" value="${c.label||""}" onchange="updatePcRule(${u}, 'label', this.value)" class="text-[11px] font-bold text-ink bg-transparent border-b border-dashed border-blush-300 focus:outline-none min-w-0 flex-1" /></div>
                    <button type="button" onclick="deletePcRule(${u})" class="text-[10px] font-bold text-rose-600 cursor-pointer">&times; Remove</button>
                  </div>
                  <div class="grid grid-cols-3 gap-1.5">
                    <select onchange="updatePcRule(${u}, 'sizeId', this.value)" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[10.5px] font-bold text-ink">
                      ${productConfigState.sizes.map(p=>`<option value="${p.id}" ${c.sizeId===p.id?"selected":""}>${p.label}</option>`).join("")}
                    </select>
                    <select onchange="updatePcRule(${u}, 'weightId', this.value)" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[10.5px] font-bold text-ink">
                      ${productConfigState.weights.map(p=>`<option value="${p.id}" ${c.weightId===p.id?"selected":""}>${p.value}${p.unit}</option>`).join("")}
                    </select>
                    <input type="number" min="0" value="${c.extraCharge}" onchange="updatePcRule(${u}, 'extraCharge', this.value)" placeholder="+ETB" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-extrabold text-berry" />
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
              ${productConfigState.customizations.map((c,u)=>`
                <div class="p-2.5 rounded-2xl bg-blush-50/70 border border-blush-200/80 space-y-2">
                  <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-3">
                      ${renderPcOnOffSwitch(c.enabled!==!1,`updatePcCustomization(${u}, 'enabled', this.checked); renderProductConfig();`)}
                      <label class="flex items-center gap-1 cursor-pointer">
                        <input type="checkbox" ${c.required?"checked":""} onchange="updatePcCustomization(${u}, 'required', this.checked)" class="w-3.5 h-3.5 accent-berry" />
                        <span class="text-[10px] font-bold text-berry">Required</span>
                      </label>
                    </div>
                    <button type="button" onclick="deletePcCustomization(${u})" class="text-[10px] font-bold text-rose-600 cursor-pointer">&times; Remove</button>
                  </div>
                  <div class="grid grid-cols-3 gap-1.5">
                    <input type="text" value="${c.name}" onchange="updatePcCustomization(${u}, 'name', this.value)" class="col-span-2 px-2.5 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-bold text-ink" />
                    <input type="number" min="0" value="${c.charge}" onchange="updatePcCustomization(${u}, 'charge', this.value)" placeholder="+ETB" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-extrabold text-berry" />
                  </div>
                </div>`).join("")}
            </div>
          </div>`);const s=document.getElementById("pc-master-checkbox"),a=document.getElementById("pc-master-label"),r=productConfigState.enabled!==!1;s&&(s.checked=r),a&&(a.textContent=r?"ON":"OFF",a.className=r?"text-[10px] font-extrabold text-berry":"text-[10px] font-extrabold text-ink-muted");const i=productConfigState.sectionsEnabled&&productConfigState.sectionsEnabled[pcActiveTab]!==!1,l=`
        <div class="bg-white rounded-2xl px-3.5 py-2.5 shadow-rose-sm border border-blush-200/70 flex items-center justify-between gap-2">
          <div>
            <div class="text-[11px] font-extrabold text-ink">${{sizes:"Cake Sizes",weights:"Cake Weights",units:"Measurement Units",rules:"Pricing Rules",options:"Customization Options"}[pcActiveTab]||"Section"} Status</div>
            <div class="text-[9.5px] text-ink-muted">${r?i?"Active on customer ordering":"Hidden from customer ordering":"Master Product Config is OFF"}</div>
          </div>
          ${renderPcOnOffSwitch(i,`togglePcSectionEnabled('${pcActiveTab}', this.checked)`)}
        </div>`;if(o.innerHTML=l+`<div class="${!r||!i?"opacity-55":""}">`+n+`</div>
        <button type="button" id="pc-save-btn" onclick="saveProductConfig()" class="w-full py-3 rounded-full btn-berry text-white text-xs font-extrabold shadow-rose-sm active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Save Product Configuration</span>
        </button>
      `,analyticsLocked){const c=container.innerHTML;container.innerHTML=`
          <div class="relative">
            <div class="blur-[5px] pointer-events-none select-none opacity-70 overflow-hidden max-h-[75vh]">${c}</div>
            <div class="absolute inset-0 flex items-start justify-center pt-24 px-4" style="background:rgba(255,249,250,0.55);backdrop-filter:blur(3px);">
              <div class="bg-white rounded-3xl p-6 shadow-2xl border border-violet-100 max-w-xs w-full text-center">
                <div class="text-4xl mb-2">\u{1F4CA}</div>
                <div class="text-[15px] font-black text-violet-700 mb-1">Unlock Sales Analytics</div>
                <div class="text-[11px] text-ink-muted mb-4 leading-relaxed">See your real revenue, net profit, top-selling cakes &amp; payment channels. Upgrade to <strong class="text-violet-600">Advanced</strong> to earn smarter.</div>
                <div class="text-left space-y-1 mb-5">
                  ${["\u{1F4C8} Total Revenue & Net Profit","\u{1F3C6} Top Selling Cakes Ranked","\u{1F4B3} Earnings by Payment Channel","\u{1F4CA} Weekly Sales Trend Chart"].map(u=>`<div class="flex items-center gap-2 text-[10.5px] font-semibold text-ink"><span class="text-emerald-500 font-black">\u2713</span>${u}</div>`).join("")}
                </div>
                <button onclick="openUpgradePlanPage();" style="background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;width:100%;padding:13px;border-radius:50px;font-size:12.5px;font-weight:900;border:none;cursor:pointer;box-shadow:0 4px 15px rgba(124,58,237,0.35);">
                  \u{1F680} View Upgrade Plans \u2192
                </button>
                <div class="text-[9.5px] text-ink-muted mt-2">Pay once \xB7 Contact MAK CAKE after payment</div>
              </div>
            </div>
          </div>`}}async function saveProductConfig(){const t=document.getElementById("pc-save-btn");await runWithFeedback({lockKey:"save-product-config",btnEl:t,scope:"admin",loadingMsg:"Saving configuration...",successMsg:"Changes saved successfully!",action:async()=>{const e=await fetch("/api/product-config",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(productConfigState)}),o=await e.json();if(!e.ok||!o.success)throw new Error(o.error||"Could not save configuration");return productConfigState=o.productConfig,localStorage.setItem("mak_product_config_v1",JSON.stringify(productConfigState)),syncProductConfigToOrderSystem(),renderProductConfig(),!0}})}function selectSheetWeight(t){sheet.weightId=sheet.weightId===t?null:t,renderOrderSheet()}function toggleSheetCustomOpt(t){Array.isArray(sheet.customOptions)||(sheet.customOptions=[]);const e=sheet.customOptions.indexOf(t);e>=0?sheet.customOptions.splice(e,1):sheet.customOptions.push(t),renderOrderSheet()}let mktActiveTab="ads",mktAds=[],mktPromos=[],mktRewards={enabled:!0,eligibilityRules:{minOrderAmount:2e3,onePerCustomer:!0},prizes:[]},mktPendingAdImg="",mktEditingAdId=null,mktEditingPromoId=null;async function loadMarketingFromDb(){try{const[t,e,o]=await Promise.all([fetch("/api/advertisements",{cache:"no-store"}),fetch("/api/promo-codes",{cache:"no-store"}),fetch("/api/rewards",{cache:"no-store"})]);if(t.ok){const n=await t.json();n.success&&Array.isArray(n.advertisements)&&(mktAds=n.advertisements,syncAdsToCustomerHomepage())}if(e.ok){const n=await e.json();n.success&&Array.isArray(n.promoCodes)&&(mktPromos=n.promoCodes)}if(o.ok){const n=await o.json();n.success&&n.rewards&&(mktRewards=n.rewards)}}catch{}adminTab==="marketing"&&renderMarketingSection()}function syncAdsToCustomerHomepage(){const t=(mktAds||[]).filter(e=>e.active);if(t.length>0&&typeof HERO_SLIDES<"u"&&Array.isArray(HERO_SLIDES)&&(HERO_SLIDES.length=0,t.forEach(e=>{HERO_SLIDES.push({top:e.badge||"MAK CAKE Special",script:(e.title||"Special").split("\u2022").pop().trim().slice(0,18),sub:e.subtitle||e.desc||"Freshly baked in Addis Ababa",cta:e.buttonText?e.buttonText.replace(/→/g,"").trim():"Order Now",img:e.image||"./images/hero-banner.jpg",link:e.link||"#menu"})}),typeof heroIndex<"u"&&heroIndex>=HERO_SLIDES.length&&(heroIndex=0),typeof renderHero=="function"))try{renderHero()}catch{}}function openMarketingSection(){switchAdminTab("marketing"),loadMarketingFromDb()}function setMarketingTab(t){t==="ads"&&typeof hasPackageFeature=="function"&&!hasPackageFeature("homepage_ads")&&showPackageUpgradePrompt("Homepage Promotional Advertisements","Premium"),t==="rewards"&&typeof hasPackageFeature=="function"&&!hasPackageFeature("mystery_box")&&showPackageUpgradePrompt("Mystery Reward Box","Premium"),mktActiveTab=t,renderMarketingSection()}function handleMktAdImgUpload(t){const e=t.files&&t.files[0];if(!e||!e.type.startsWith("image/"))return;const o=new FileReader;o.onload=n=>{mktPendingAdImg=n.target.result;const s=document.getElementById("mkt-ad-img-url");s&&(s.value="Uploaded image ready")},o.readAsDataURL(e)}async function saveMktAd(){const t=(document.getElementById("mkt-ad-title")?.value||"").trim(),e=(document.getElementById("mkt-ad-desc")?.value||"").trim(),o=(document.getElementById("mkt-ad-link")?.value||"").trim()||"#menu",n=(document.getElementById("mkt-ad-img-url")?.value||"").trim(),s=mktPendingAdImg||(n&&n!=="Uploaded image ready"?n:"./images/hero-banner.jpg");if(!t){typeof showAdminToast=="function"&&showAdminToast("Advertisement title is required");return}const a=mktEditingAdId?`/api/advertisements/${mktEditingAdId}`:"/api/advertisements";(await fetch(a,{method:mktEditingAdId?"PUT":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:t,subtitle:e,link:o,image:s,active:!0})})).ok&&(mktPendingAdImg="",mktEditingAdId=null,await loadMarketingFromDb(),typeof showAdminToast=="function"&&showAdminToast("Submitted successfully!","success"))}function editMktAd(t){const e=mktAds.find(o=>String(o.id)===String(t));e&&(mktEditingAdId=e.id,mktPendingAdImg="",renderMarketingSection(),setTimeout(()=>{document.getElementById("mkt-ad-title")&&(document.getElementById("mkt-ad-title").value=e.title||""),document.getElementById("mkt-ad-desc")&&(document.getElementById("mkt-ad-desc").value=e.subtitle||""),document.getElementById("mkt-ad-link")&&(document.getElementById("mkt-ad-link").value=e.link||""),document.getElementById("mkt-ad-img-url")&&(document.getElementById("mkt-ad-img-url").value=e.image||"")},30))}async function toggleMktAd(t){(await fetch(`/api/advertisements/${t}/toggle`,{method:"PUT"})).ok&&await loadMarketingFromDb()}async function deleteMktAd(t){(await fetch(`/api/advertisements/${t}`,{method:"DELETE"})).ok&&(await loadMarketingFromDb(),typeof showAdminToast=="function"&&showAdminToast("Advertisement deleted"))}async function saveMktPromo(){const t=(document.getElementById("mkt-pr-code")?.value||"").trim().toUpperCase(),e=document.getElementById("mkt-pr-type")?.value||"percent",o=Number(document.getElementById("mkt-pr-val")?.value)||0,n=document.getElementById("mkt-pr-exp")?.value||"2027-12-31",s=Number(document.getElementById("mkt-pr-limit")?.value)||100;if(!t||o<=0){typeof showAdminToast=="function"&&showAdminToast("Enter valid code and discount value");return}const a=mktEditingPromoId?`/api/promo-codes/${mktEditingPromoId}`:"/api/promo-codes",i=await fetch(a,{method:mktEditingPromoId?"PUT":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:t,type:e,discount:o,expiresAt:n,usageLimit:s,active:!0})}),d=await i.json();if(!i.ok||!d.success){typeof showAdminToast=="function"&&showAdminToast(d.error||"Error saving promo");return}mktEditingPromoId=null,await loadMarketingFromDb(),typeof showAdminToast=="function"&&showAdminToast("Submitted successfully!","success")}function editMktPromo(t){const e=mktPromos.find(o=>String(o.id)===String(t));e&&(mktEditingPromoId=e.id,renderMarketingSection(),setTimeout(()=>{document.getElementById("mkt-pr-code")&&(document.getElementById("mkt-pr-code").value=e.code),document.getElementById("mkt-pr-type")&&(document.getElementById("mkt-pr-type").value=e.type),document.getElementById("mkt-pr-val")&&(document.getElementById("mkt-pr-val").value=e.discount),document.getElementById("mkt-pr-exp")&&(document.getElementById("mkt-pr-exp").value=e.expiresAt||"2027-12-31"),document.getElementById("mkt-pr-limit")&&(document.getElementById("mkt-pr-limit").value=e.usageLimit||100)},30))}async function toggleMktPromo(t,e){(await fetch(`/api/promo-codes/${t}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({active:e})})).ok&&await loadMarketingFromDb()}async function deleteMktPromo(t){(await fetch(`/api/promo-codes/${t}`,{method:"DELETE"})).ok&&(await loadMarketingFromDb(),typeof showAdminToast=="function"&&showAdminToast("Promo code deleted"))}async function toggleMktRewardsEnabled(){(await fetch("/api/rewards/toggle",{method:"POST"})).ok&&(await loadMarketingFromDb(),typeof showAdminToast=="function"&&showAdminToast("Mystery Reward Box updated"))}async function saveMktRewardsRules(){const t=Number(document.getElementById("mkt-rew-min")?.value)||0,e=!!document.getElementById("mkt-rew-one")?.checked;(await fetch("/api/rewards/config",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({minOrderAmount:t,onePerCustomer:e})})).ok&&(await loadMarketingFromDb(),typeof showAdminToast=="function"&&showAdminToast("Reward eligibility rules saved"))}async function addMktRewardPrize(){const t=(document.getElementById("mkt-rw-name")?.value||"").trim(),e=document.getElementById("mkt-rw-type")?.value||"discount",o=Number(document.getElementById("mkt-rw-val")?.value)||100,n=Number(document.getElementById("mkt-rw-prob")?.value)||20,s=Number(document.getElementById("mkt-rw-qty")?.value)||50;if(!t){typeof showAdminToast=="function"&&showAdminToast("Enter reward prize name");return}(await fetch("/api/rewards",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,type:e,value:o,probability:n,quantityLimit:s,isAvailable:!0})})).ok&&(await loadMarketingFromDb(),typeof showAdminToast=="function"&&showAdminToast("Submitted successfully!","success"))}async function toggleMktPrizeAvail(t,e){(await fetch(`/api/rewards/${t}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({isAvailable:e})})).ok&&await loadMarketingFromDb()}async function deleteMktPrize(t){(await fetch(`/api/rewards/${t}`,{method:"DELETE"})).ok&&(await loadMarketingFromDb(),typeof showAdminToast=="function"&&showAdminToast("Reward option removed"))}function renderMarketingSection(){const t=document.getElementById("mkt-subtabs"),e=[{id:"ads",label:"1. Homepage Ads"},{id:"promos",label:"2. Promo Codes"},{id:"rewards",label:"3. Mystery Box"}];t&&(t.innerHTML=e.map(n=>{const s=mktActiveTab===n.id;return`<button type="button" onclick="setMarketingTab('${n.id}')" class="shrink-0 px-3 py-1.5 rounded-full text-[10.5px] font-bold transition-all cursor-pointer ${s?"btn-berry text-white shadow-rose-sm":"bg-white text-ink-muted border border-blush-200 hover:text-ink"}">${n.label}</button>`}).join(""));const o=document.getElementById("mkt-body");if(o){if(mktActiveTab==="ads")o.innerHTML=`
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
          <div class="relative">
            <div class="blur-[5px] pointer-events-none select-none opacity-70 overflow-hidden max-h-[75vh]">${n}</div>
            <div class="absolute inset-0 flex items-start justify-center pt-24 px-4" style="background:rgba(255,249,250,0.55);backdrop-filter:blur(3px);">
              <div class="bg-white rounded-3xl p-6 shadow-2xl border border-violet-100 max-w-xs w-full text-center">
                <div class="text-4xl mb-2">\u{1F4CA}</div>
                <div class="text-[15px] font-black text-violet-700 mb-1">Unlock Sales Analytics</div>
                <div class="text-[11px] text-ink-muted mb-4 leading-relaxed">See your real revenue, net profit, top-selling cakes &amp; payment channels. Upgrade to <strong class="text-violet-600">Advanced</strong> to earn smarter.</div>
                <div class="text-left space-y-1 mb-5">
                  ${["\u{1F4C8} Total Revenue & Net Profit","\u{1F3C6} Top Selling Cakes Ranked","\u{1F4B3} Earnings by Payment Channel","\u{1F4CA} Weekly Sales Trend Chart"].map(s=>`<div class="flex items-center gap-2 text-[10.5px] font-semibold text-ink"><span class="text-emerald-500 font-black">\u2713</span>${s}</div>`).join("")}
                </div>
                <button onclick="openUpgradePlanPage();" style="background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;width:100%;padding:13px;border-radius:50px;font-size:12.5px;font-weight:900;border:none;cursor:pointer;box-shadow:0 4px 15px rgba(124,58,237,0.35);">
                  \u{1F680} View Upgrade Plans \u2192
                </button>
                <div class="text-[9.5px] text-ink-muted mt-2">Pay once \xB7 Contact MAK CAKE after payment</div>
              </div>
            </div>
          </div>`}}function migrateCachedPackages(){try{const t=localStorage.getItem("mak_settings_hub_v1");if(t){const e=JSON.parse(t);e&&e.packages&&e.packages.some(o=>o.id==="pkg-starter"||o.name==="Starter Bakery"||o.id==="pkg-royal")&&(e.packages=settingsHubState.packages,(e.activePackageId==="pkg-starter"||e.activePackageId==="pkg-pro"||e.activePackageId==="pkg-royal"||!e.activePackageId)&&(e.activePackageId="pkg-basic"),localStorage.setItem("mak_settings_hub_v1",JSON.stringify(e))),settingsHubState={...settingsHubState,...e}}}catch{}}async function loadSettingsHubFromDb(){migrateCachedPackages();try{const[t,e,o]=await Promise.all([fetch("/api/admin/settings-hub",{cache:"no-store"}),fetch("/api/managers",{cache:"no-store"}),fetch("/api/admin/security/sessions",{cache:"no-store"})]);if(t.ok){const n=await t.json();if(n.success&&n.settingsHub&&(settingsHubState={...settingsHubState,...n.settingsHub},localStorage.setItem("mak_settings_hub_v1",JSON.stringify(settingsHubState)),applyCustomerThemeVariables(settingsHubState.customerTheme),typeof renderUpgradePlanPage=="function"))try{renderUpgradePlanPage()}catch{}}if(e.ok){const n=await e.json();n.success&&Array.isArray(n.managers)&&(staffManagersList=n.managers)}if(o.ok){const n=await o.json();n.success&&Array.isArray(n.sessions)&&(activeSessionsList=n.sessions)}}catch{}adminTab==="settings"&&renderSettingsHub()}function openSettingsHubSection(){switchAdminTab("settings"),loadSettingsHubFromDb(),checkInitialAdminLockState(),setCustomerLanguage(currentCustomerLang)}function setSettingsHubTab(t){settingsHubTab=t,renderSettingsHub()}async function saveSettingsHubToDb(t="Changes saved successfully!"){await runWithFeedback({lockKey:"save-settings-hub",scope:"admin",loadingMsg:"Saving settings...",successMsg:t||"Changes saved successfully!",action:async()=>{const e=await fetch("/api/admin/settings-hub",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(settingsHubState)}),o=await e.json();if(!e.ok||!o.success)throw new Error(o.error||"Failed to save settings.");return localStorage.setItem("mak_settings_hub_v1",JSON.stringify(settingsHubState)),!0}})}function selectActivePackage(t){const e=settingsHubState.packages.find(o=>o.id===t);if(!e||e.enabled===!1){typeof showAdminToast=="function"&&showAdminToast("Enable package before activating");return}settingsHubState.activePackageId=t,saveSettingsHubToDb(`Active package set to ${e.name}`),renderSettingsHub()}function updateHubPackage(t,e,o){const n=settingsHubState.packages[t];n&&(e==="price"?n.price=Math.max(0,Number(o)||0):e==="enabled"?n.enabled=!!o:n[e]=String(o))}async function addStaffMember(){const t=(document.getElementById("st-new-name")?.value||"").trim(),e=(document.getElementById("st-new-email")?.value||"").trim(),o=(document.getElementById("st-new-phone")?.value||"").trim(),n=document.getElementById("st-new-role")?.value||"Kitchen Staff";if(!t){typeof showAdminToast=="function"&&showAdminToast("Staff name is required");return}(await fetch("/api/managers",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,email:e,phone:o,role:n,permissions:{viewDashboard:!0,viewOrders:!0,manageOrders:n!=="Viewer",manageProducts:n==="Manager"}})})).ok&&(await loadSettingsHubFromDb(),typeof showAdminToast=="function"&&showAdminToast(`Added staff: ${t}`))}async function toggleStaffPermission(t,e,o){(await fetch(`/api/managers/${t}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({permissions:{[e]:!o}})})).ok&&await loadSettingsHubFromDb()}async function removeStaffMember(t){const e=await fetch(`/api/managers/${t}`,{method:"DELETE"}),o=await e.json();if(!e.ok){typeof showAdminToast=="function"&&showAdminToast(o.error||"Cannot remove");return}await loadSettingsHubFromDb(),typeof showAdminToast=="function"&&showAdminToast("Staff account removed")}async function updateAdminSecurityPin(){const t=(document.getElementById("sec-new-pin")?.value||"").trim();if(t.length<4){typeof showAdminToast=="function"&&showAdminToast("Enter at least 4 characters");return}const e=await fetch("/api/admin/security/update-pin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({newPin:t})}),o=await e.json();e.ok&&o.success?(document.getElementById("sec-new-pin").value="",typeof showAdminToast=="function"&&showAdminToast("PIN / Password updated!")):typeof showAdminToast=="function"&&showAdminToast(o.error||"Failed")}async function logoutOtherAdminSessions(){const t=await fetch("/api/admin/security/logout-others",{method:"POST"}),e=await t.json();t.ok&&e.success&&(await loadSettingsHubFromDb(),typeof showAdminToast=="function"&&showAdminToast(e.message||"Other sessions logged out"))}function previewNotificationSound(t){const e=Number(settingsHubState.notifications?.volume??80)/100,o=(settingsHubState.notifications?.customSounds||[]).find(n=>n.id===t||n.url===t);if(o&&o.url){const n=new Audio(o.url);n.volume=e,n.play().catch(()=>{});return}try{const n=new(window.AudioContext||window.webkitAudioContext),s=n.createOscillator(),a=n.createGain(),r={"chime-classic":660,"chime-rose":784,"chime-crystal":987,"chime-double":587};s.type="sine",s.frequency.value=r[t]||660,a.gain.setValueAtTime(Math.max(.05,e*.25),n.currentTime),a.gain.exponentialRampToValueAtTime(.001,n.currentTime+.35),s.connect(a),a.connect(n.destination),s.start(),s.stop(n.currentTime+.36)}catch{}}async function uploadCustomChimeFile(t){const e=t.files&&t.files[0];if(!e)return;const o=new FileReader;o.onload=async n=>{const s=await fetch("/api/admin/chime-upload",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e.name.replace(/.[^.]+$/,""),dataUrl:n.target.result})}),a=await s.json();s.ok&&a.success?(await loadSettingsHubFromDb(),typeof showAdminToast=="function"&&showAdminToast("Custom sound uploaded!")):typeof showAdminToast=="function"&&showAdminToast(a.error||"Upload failed")},o.readAsDataURL(e)}function updateCustomerThemeColor(t,e){if(!/^#[0-9A-Fa-f]{6}$/.test(e))return;settingsHubState.customerTheme[t]=e;const o=document.getElementById("th-pick-"+t),n=document.getElementById("th-hex-"+t);o&&o.value.toLowerCase()!==e.toLowerCase()&&(o.value=e),n&&n.value.toLowerCase()!==e.toLowerCase()&&(n.value=e),applyCustomerThemeVariables(settingsHubState.customerTheme)}function restoreDefaultCustomerTheme(){settingsHubState.customerTheme={...DEFAULT_CUSTOMER_THEME},applyCustomerThemeVariables(settingsHubState.customerTheme),renderSettingsHub(),saveSettingsHubToDb("Restored default customer theme")}function renderSettingsHub(){const t=document.getElementById("settings-hub-pills"),e=[{id:"packages",label:"1. Packages"},{id:"staff",label:"2. Staff"},{id:"security",label:"3. Security"},{id:"sounds",label:"4. Sounds"},{id:"theme",label:"5. Theme"},{id:"general",label:"6. General"}];t&&(t.innerHTML=e.map(s=>{const a=settingsHubTab===s.id;return`<button type="button" onclick="setSettingsHubTab('${s.id}')" class="shrink-0 px-3 py-1.5 rounded-full text-[10.5px] font-bold transition-all cursor-pointer ${a?"btn-berry text-white shadow-rose-sm":"bg-white text-ink-muted border border-blush-200 hover:text-ink"}">${s.label}</button>`}).join(""));const o=document.getElementById("settings-legacy-packages-wrap");o&&o.classList.toggle("hidden",settingsHubTab!=="packages");const n=document.getElementById("settings-hub-body");if(n){if(settingsHubTab==="packages"){const s=settingsHubState.packages.find(i=>i.id===settingsHubState.activePackageId)||settingsHubState.packages[0],a=s?s.tier||getPackageTier(s.id):1,r={"pkg-basic":{icon:"\u{1F9C1}",color:"text-sky-600",border:"border-sky-200",bg:"bg-sky-50"},"pkg-advanced":{icon:"\u{1F382}",color:"text-violet-600",border:"border-violet-200",bg:"bg-violet-50"},"pkg-premium":{icon:"\u{1F451}",color:"text-amber-600",border:"border-amber-200",bg:"bg-amber-50"}};n.innerHTML=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-2.5">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-[10px] font-bold text-ink-muted uppercase">Current Shop Package</div>
                <div class="text-xs font-black text-berry">${s?s.name:"Basic"}</div>
              </div>
              <span class="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9.5px] font-extrabold">Active Plan</span>
            </div>
            <div class="space-y-2">
              ${settingsHubState.packages.map((i,d)=>{const l=settingsHubState.activePackageId===i.id,u=(i.tier||getPackageTier(i.id))>a,p=r[i.id]||r["pkg-basic"],h={"pkg-advanced":{headline:"\u{1F680} Unlock Advanced & Earn More!",sub:"Get Analytics, Extra Decorations & Promo Tools"},"pkg-premium":{headline:"\u{1F451} Go Premium \u2014 Unlimited Growth!",sub:"Everything + Custom Storefront, Staff & Priority Support"}}[i.id]||{headline:"Upgrade to unlock",sub:""};return`
                  <div class="relative rounded-2xl border ${l?"bg-blush-50 border-berry/50":u?p.border+" "+p.bg+"/30":"bg-blush-50/40 border-blush-100"} overflow-hidden">
                    <!-- Package content (blurred when locked) -->
                    <div class="${u?"blur-[2px] pointer-events-none select-none":""} p-3 space-y-2">
                      <div class="flex items-center justify-between gap-2">
                        <div class="flex items-center gap-1.5">
                          <span class="text-sm">${p.icon}</span>
                          <input type="text" value="${i.name}" onchange="updateHubPackage(${d}, 'name', this.value)" class="text-xs font-extrabold text-ink bg-transparent border-b border-dashed border-blush-300 focus:outline-none ${u?"pointer-events-none":""}" ${u?"readonly":""} />
                        </div>
                        <div class="flex items-center gap-2">
                          ${u?`<span class="px-2 py-0.5 rounded-full text-[9px] font-extrabold ${p.color} border ${p.border} bg-white">\u{1F512} Locked</span>`:`<label class="flex items-center gap-1 text-[9.5px] font-bold text-ink-muted cursor-pointer">
                            <input type="checkbox" ${i.enabled!==!1?"checked":""} onchange="updateHubPackage(${d}, 'enabled', this.checked)" class="w-3.5 h-3.5 accent-berry" /> On
                          </label>
                          <button type="button" onclick="selectActivePackage('${i.id}')" class="px-2 py-0.5 rounded-full text-[9.5px] font-extrabold cursor-pointer ${l?"btn-berry text-white":"bg-white border border-blush-200 text-berry"}">${l?"Current":"Activate"}</button>`}
                        </div>
                      </div>
                      <div class="flex items-center justify-between gap-2">
                        <div class="text-[9.5px] text-ink-muted truncate">${(i.features||[]).join(" \u2022 ")}</div>
                        <div class="w-20 px-2 py-1 rounded-lg bg-white border border-blush-200 text-[11px] font-extrabold ${p.color} text-right shrink-0">${i.price.toLocaleString()} ETB</div>
                      </div>
                    </div>
                    <!-- Lock overlay shown on top of blurred content -->
                    ${u?`
                    <div class="absolute inset-0 flex flex-col items-center justify-center gap-1.5 cursor-pointer" onclick="showPackageUpgradePrompt('${i.id}')">
                      <div class="text-center px-3">
                        <div class="text-sm font-black ${p.color}">${h.headline}</div>
                        <div class="text-[9.5px] text-ink-muted mt-0.5">${h.sub}</div>
                      </div>
                      <button class="${p.bg} ${p.color} border ${p.border} px-4 py-1.5 rounded-full text-[10px] font-extrabold shadow-sm">
                        \u2728 Upgrade Now
                      </button>
                    </div>`:""}
                  </div>`}).join("")}
            </div>
            ${a<3?'<div class="text-center text-[9.5px] text-ink-muted pt-1">\u{1F4A1} Contact MAK CAKE to upgrade your plan</div>':""}
            <button type="button" onclick="saveSettingsHubToDb('Package configuration saved!')" class="w-full py-2.5 rounded-full btn-berry text-white text-xs font-extrabold cursor-pointer">Save Packages</button>
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
          </div>`;else if(settingsHubTab==="sounds"){const s=settingsHubState.notifications||{},a=s.events||{},r=[{id:"chime-classic",name:"Classic Bakery Bell"},{id:"chime-rose",name:"Soft Rose Chime"},{id:"chime-crystal",name:"Crystal Ding"},{id:"chime-double",name:"Double Kitchen Chime"},...(s.customSounds||[]).map(d=>({id:d.id,name:"\u{1F3B5} "+d.name}))],i=[{key:"newOrder",label:"New Orders"},{key:"paymentSubmitted",label:"Payment Submitted"},{key:"paymentVerified",label:"Payment Verified"},{key:"orderStatusUpdated",label:"Order Status Updated"}];n.innerHTML=`
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
              ${i.map(d=>`
                <div class="flex items-center justify-between gap-2">
                  <span class="text-[11px] font-bold text-ink">${d.label}</span>
                  <div class="flex items-center gap-1">
                    <select onchange="settingsHubState.notifications.events['${d.key}'] = this.value" class="px-2 py-1 rounded-xl bg-blush-50 border border-blush-200 text-[10.5px] font-bold text-ink">
                      ${r.map(l=>`<option value="${l.id}" ${a[d.key]===l.id?"selected":""}>${l.name}</option>`).join("")}
                    </select>
                    <button type="button" onclick="previewNotificationSound(settingsHubState.notifications.events['${d.key}'] || 'chime-classic')" class="px-2 py-1 rounded-xl bg-blush-100 text-berry text-[10px] font-extrabold cursor-pointer">\u25B6</button>
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
              ${a.map(r=>`
                <div class="flex items-center justify-between gap-2 p-2 rounded-xl bg-blush-50/60 border border-blush-100">
                  <span class="text-[11px] font-bold text-ink">${r.label}</span>
                  <div class="flex items-center gap-1.5">
                    <input id="th-pick-${r.key}" type="color" value="${s[r.key]||"#E11D62"}" oninput="updateCustomerThemeColor('${r.key}', this.value)" class="w-7 h-7 rounded-lg border border-blush-200 cursor-pointer bg-white" />
                    <input id="th-hex-${r.key}" type="text" value="${s[r.key]||"#E11D62"}" onchange="updateCustomerThemeColor('${r.key}', this.value)" class="w-20 px-2 py-1 rounded-lg bg-white border border-blush-200 text-[10.5px] font-mono font-bold text-ink uppercase" />
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
          </div>`}}}let upgradeTargetPkgId=null,upgradeReceiptDataUrl="",upgradeReceiptFileName="";function getPackageTier(t){return t==="pkg-premium"||t==="pkg-royal"?3:t==="pkg-advanced"||t==="pkg-pro"?2:1}function getCurrentPackageObj(){const t=settingsHubState.packages||[],e=settingsHubState.activePackageId||"pkg-basic";return t.find(o=>o.id===e)||t[0]||{id:"pkg-basic",tier:1,name:"Basic",price:3e3,limits:{}}}function getUpgradeDifference(t,e){return Math.max(0,Number(e?.price||0)-Number(t?.price||0))}function hasPackageFeature(t){const e=getCurrentPackageObj(),o=e.tier||getPackageTier(e.id),n=["website","ordering","orders","dashboard","products","payments","businessInfo"],s=["analytics","decorations_5","qr_code","staff_1"],a=["decorations_unlimited","google_business","custom_theme","mystery_box","seo","homepage_ads","staff_5","advanced_permissions","qr_stickers"];return n.includes(t)?!0:s.includes(t)?o>=2:a.includes(t)?o>=3:!0}function openUpgradePlanPage(){switchAdminTab("upgrade-plan"),loadSettingsHubFromDb().then(()=>renderUpgradePlanPage()),renderUpgradePlanPage()}function selectUpgradePayMethod(t){const e=document.getElementById("upg-pay-method");e&&(e.value=t);const o=document.getElementById("upg-method-cbe"),n=document.getElementById("upg-method-tb");o&&(o.className=t==="CBE"?"p-2.5 rounded-2xl border-2 border-berry bg-blush-50 text-left flex items-center gap-2 transition-all cursor-pointer":"p-2.5 rounded-2xl border border-blush-200 bg-white text-left flex items-center gap-2 transition-all cursor-pointer"),n&&(n.className=t==="Telebirr"?"p-2.5 rounded-2xl border-2 border-berry bg-blush-50 text-left flex items-center gap-2 transition-all cursor-pointer":"p-2.5 rounded-2xl border border-blush-200 bg-white text-left flex items-center gap-2 transition-all cursor-pointer")}function clearUpgradeReceiptPreview(){upgradeReceiptDataUrl="",upgradeReceiptFileName="";const t=document.getElementById("upg-pay-receipt");t&&(t.value="");const e=document.getElementById("upg-receipt-label");e&&(e.textContent="Tap to upload receipt (PNG, JPG, PDF)"),document.getElementById("upg-receipt-dropzone")?.classList.remove("hidden");const o=document.getElementById("upg-receipt-preview-box");o&&o.classList.add("hidden");const n=document.getElementById("upg-receipt-preview-img");n&&(n.src="")}function handleUpgradeReceiptUpload(t){const e=t.files&&t.files[0];if(!e)return;upgradeReceiptFileName=e.name;const o=document.getElementById("upg-receipt-label");o&&(o.textContent="\u2713 "+e.name);const n=e.type==="application/pdf"||/\.pdf$/i.test(e.name),s=new FileReader;s.onload=a=>{upgradeReceiptDataUrl=a.target.result;const r=document.getElementById("upg-receipt-dropzone"),i=document.getElementById("upg-receipt-preview-box"),d=document.getElementById("upg-receipt-img-wrap"),l=document.getElementById("upg-receipt-pdf-wrap"),c=document.getElementById("upg-receipt-preview-img"),u=document.getElementById("upg-receipt-preview-name");u&&(u.textContent=e.name),n?(d?.classList.add("hidden"),l?.classList.remove("hidden"),l?.classList.add("flex")):(c&&(c.src=upgradeReceiptDataUrl),d?.classList.remove("hidden"),l?.classList.add("hidden"),l?.classList.remove("flex")),r?.classList.add("hidden"),i?.classList.remove("hidden")},s.readAsDataURL(e)}function copyUpgradeAccountNumber(t,e){const o=()=>{if(t){const n=t.dataset.origHtml||t.innerHTML;t.dataset.origHtml=n,t.className="px-2.5 py-1.5 rounded-xl bg-emerald-500 border border-emerald-500 text-white text-[10px] font-extrabold flex items-center gap-1 transition-all shrink-0 shadow-xs",t.innerHTML='<svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg><span>Copied!</span>',clearTimeout(t._copyT),t._copyT=setTimeout(()=>{t.className="px-2.5 py-1.5 rounded-xl bg-blush-50 hover:bg-blush-100 border border-blush-200 text-berry text-[10px] font-extrabold flex items-center gap-1 transition-all cursor-pointer shrink-0",t.innerHTML=n},2200)}typeof showAdminToast=="function"&&showAdminToast("Copied "+e+"!","success")};navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(String(e)).then(o).catch(()=>{fallbackCopyText(String(e)),o()}):(fallbackCopyText(String(e)),o())}function fallbackCopyText(t){try{const e=document.createElement("textarea");e.value=t,e.style.position="fixed",e.style.opacity="0",document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e)}catch{}}function showPackageUpgradePrompt(t){const e=(settingsHubState.packages||[]).find(a=>a.id===t);if(!e)return;const n={"pkg-advanced":{icon:"\u{1F680}",color:"#7c3aed",bg:"#f5f3ff",border:"#c4b5fd",headline:"Unlock Advanced Plan",perks:["\u{1F4CA} Sales & Net Profit Analytics","\u{1F380} Extra Cake Decorations","\u{1F39F}\uFE0F Promo Codes & Discounts","\u{1F49D} Reward Box for Loyal Customers"]},"pkg-premium":{icon:"\u{1F451}",color:"#d97706",bg:"#fffbeb",border:"#fcd34d",headline:"Go Premium \u2014 Unlimited!",perks:["\u2705 Everything in Advanced","\u{1F3A8} Custom Storefront Theme","\u{1F465} Staff & Manager Accounts","\u2B50 Priority Support from MAK CAKE"]}}[t]||{icon:"\u2728",color:"#be185d",bg:"#fff1f2",border:"#fda4af",headline:"Upgrade Your Plan",perks:[]};document.getElementById("pkg-upgrade-prompt")?.remove();const s=document.createElement("div");if(s.id="pkg-upgrade-prompt",s.style.cssText="position:fixed;inset:0;z-index:9999;display:flex;align-items:flex-end;justify-content:center;background:rgba(0,0,0,0.45);backdrop-filter:blur(4px);",s.innerHTML=`
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
        </div>`,s.addEventListener("click",a=>{a.target===s&&s.remove()}),document.body.appendChild(s),!document.getElementById("pkg-upgrade-anim")){const a=document.createElement("style");a.id="pkg-upgrade-anim",a.textContent="@keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}",document.head.appendChild(a)}}function openUpgradeConfirmModal(t){const e=getCurrentPackageObj(),o=(settingsHubState.packages||[]).find(r=>r.id===t);if(!o)return;upgradeTargetPkgId=o.id,upgradeReceiptDataUrl="",upgradeReceiptFileName="";const n=getUpgradeDifference(e,o);document.getElementById("upg-modal-form-view")?.classList.remove("hidden"),document.getElementById("upg-modal-thankyou-view")?.classList.add("hidden"),document.getElementById("upg-modal-congrats-view")?.classList.add("hidden");const s=document.getElementById("upg-modal-pkg-sub");s&&(s.textContent=`${e.name} \u2192 ${o.name} Upgrade`),document.getElementById("upg-calc-current")&&(document.getElementById("upg-calc-current").textContent=`${e.name} (${Number(e.price).toLocaleString()} ETB)`),document.getElementById("upg-calc-target")&&(document.getElementById("upg-calc-target").textContent=`${o.name} (${Number(o.price).toLocaleString()} ETB)`),document.getElementById("upg-calc-diff")&&(document.getElementById("upg-calc-diff").textContent=`${n.toLocaleString()} ETB`),clearUpgradeReceiptPreview();const a=document.getElementById("upg-modal-accounts");if(a){const r=settingsHubState.payments||shopMgmtState?.payments||{},i=r.cbe?.accountNumber||SHOP_SETTINGS_CONFIG.cbeAccount,d=r.telebirr?.accountNumber||SHOP_SETTINGS_CONFIG.telebirrNumber;a.innerHTML=`
          <div class="flex items-center justify-between gap-2 p-2 rounded-xl bg-white border border-blush-200/80">
            <div class="min-w-0">
              <div class="text-[10px] font-bold text-ink-muted">CBE \u2022 ${r.cbe?.accountHolder||"MAK Cake Artisanal Bakery"}</div>
              <div class="text-xs font-mono font-extrabold text-ink select-all">${i}</div>
            </div>
            <button type="button" onclick="copyUpgradeAccountNumber(this, '${i}')" class="px-2.5 py-1.5 rounded-xl bg-blush-50 hover:bg-blush-100 border border-blush-200 text-berry text-[10px] font-extrabold flex items-center gap-1 transition-all cursor-pointer shrink-0">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              <span>Copy</span>
            </button>
          </div>
          <div class="flex items-center justify-between gap-2 p-2 rounded-xl bg-white border border-blush-200/80">
            <div class="min-w-0">
              <div class="text-[10px] font-bold text-ink-muted">Telebirr \u2022 ${r.telebirr?.accountHolder||"MAK Cake Bakery"}</div>
              <div class="text-xs font-mono font-extrabold text-ink select-all">${d}</div>
            </div>
            <button type="button" onclick="copyUpgradeAccountNumber(this, '${d}')" class="px-2.5 py-1.5 rounded-xl bg-blush-50 hover:bg-blush-100 border border-blush-200 text-berry text-[10px] font-extrabold flex items-center gap-1 transition-all cursor-pointer shrink-0">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              <span>Copy</span>
            </button>
          </div>
        `}selectUpgradePayMethod("CBE"),document.getElementById("upg-modal-backdrop")?.classList.remove("hidden"),document.getElementById("upg-confirm-modal")?.classList.remove("hidden")}function closeUpgradeConfirmModal(){document.getElementById("upg-modal-backdrop")?.classList.add("hidden"),document.getElementById("upg-confirm-modal")?.classList.add("hidden")}async function submitPackageUpgradeRequest(){const t=document.getElementById("upg-pay-method")?.value||"CBE",e=document.getElementById("upg-submit-btn");if(!upgradeReceiptDataUrl){showAdminToast("Please upload your payment receipt (image or PDF).","error");return}await runWithFeedback({lockKey:"submit-upgrade-request",btnEl:e,scope:"admin",loadingMsg:"Submitting payment receipt...",successMsg:"Submitted successfully!",action:async()=>{const o=await fetch("/api/admin/upgrade-request",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({targetPackageId:upgradeTargetPkgId,paymentMethod:t,receiptImg:upgradeReceiptDataUrl,receiptName:upgradeReceiptFileName})}),n=await o.json();if(!o.ok||!n.success)throw new Error(n.error||"Could not submit upgrade request.");return settingsHubState.pendingUpgradeRequest=n.pendingUpgradeRequest,document.getElementById("upg-modal-form-view")?.classList.add("hidden"),document.getElementById("upg-modal-congrats-view")?.classList.add("hidden"),document.getElementById("upg-modal-thankyou-view")?.classList.remove("hidden"),document.getElementById("upg-ty-pkg")&&(document.getElementById("upg-ty-pkg").textContent=n.pendingUpgradeRequest.targetPackageName),document.getElementById("upg-ty-amt")&&(document.getElementById("upg-ty-amt").textContent=Number(n.pendingUpgradeRequest.amount).toLocaleString()+" ETB"),renderUpgradePlanPage(),!0}})}async function verifyPendingUpgradePayment(t="approve"){await runWithFeedback({lockKey:"verify-upgrade-payment",scope:"admin",loadingMsg:t==="approve"?"Approving payment & activating plan...":"Updating status...",successMsg:t==="approve"?"Changes saved successfully!":"Upgrade request marked Rejected.",action:async()=>{const e=await fetch("/api/admin/upgrade-verify",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:t})}),o=await e.json();if(!e.ok||!o.success)throw new Error(o.error||"Verification failed.");return await loadSettingsHubFromDb(),renderUpgradePlanPage(),o.status==="Approved"&&(document.getElementById("upg-modal-form-view")?.classList.add("hidden"),document.getElementById("upg-modal-thankyou-view")?.classList.add("hidden"),document.getElementById("upg-modal-congrats-view")?.classList.remove("hidden"),document.getElementById("upg-congrats-pkg-line")&&(document.getElementById("upg-congrats-pkg-line").textContent=`Active Plan: ${o.targetPackageName||getCurrentPackageObj().name}`),document.getElementById("upg-modal-backdrop")?.classList.remove("hidden"),document.getElementById("upg-confirm-modal")?.classList.remove("hidden")),!0}})}async function cancelPendingUpgradePayment(){await fetch("/api/admin/upgrade-cancel",{method:"POST"}),settingsHubState.pendingUpgradeRequest=null,renderUpgradePlanPage(),showAdminToast("Upgrade request cleared")}function renderUpgradePlanPage(){const t=getCurrentPackageObj(),e=t.tier||getPackageTier(t.id),o=document.getElementById("upg-current-badge");o&&(o.textContent="Current: "+t.name);const n=document.getElementById("drawer-current-plan-sub");n&&(n.textContent="Current: "+t.name);const s=document.getElementById("upg-cards-container");if(!s)return;const a=settingsHubState.pendingUpgradeRequest;let r="";a&&(a.status==="Under Review"||a.status==="Pending Verification"?r=`
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
            </div>`:a.status==="Rejected"&&(r=`
            <div class="bg-rose-50 border border-rose-200 rounded-[22px] p-3.5 space-y-2">
              <div class="flex items-center justify-between gap-2">
                <div class="text-xs font-extrabold text-rose-800">Upgrade Payment Rejected</div>
                <span class="px-2.5 py-0.5 rounded-full bg-rose-200 text-rose-800 text-[9px] font-extrabold">Rejected</span>
              </div>
              <p class="text-[10.5px] text-rose-700">${a.rejectReason||"Receipt could not be verified. Please upload a valid receipt."}</p>
              <button type="button" onclick="openUpgradeConfirmModal('${a.targetPackageId}')" class="w-full py-2 rounded-full btn-berry text-white text-[11px] font-extrabold cursor-pointer">Re-submit Payment Receipt</button>
            </div>`));const d=(settingsHubState.packages||[]).map(l=>{const c=l.tier||getPackageTier(l.id),u=l.id===t.id,p=c<e,f=c>e,h=getUpgradeDifference(t,l);let g="";if(u?g='<button type="button" disabled class="w-full py-2.5 rounded-full bg-blush-100 border border-berry/30 text-berry text-xs font-extrabold opacity-80 cursor-not-allowed">Current Plan</button>':p?g='<button type="button" disabled class="w-full py-2.5 rounded-full bg-stone-100 border border-stone-200 text-stone-500 text-xs font-bold cursor-not-allowed">Included in Current Plan</button>':f&&(g=`<button type="button" onclick="openUpgradeConfirmModal('${l.id}')" class="w-full py-2.5 rounded-full btn-berry text-white text-xs font-extrabold shadow-rose-sm active:scale-95 transition-all cursor-pointer">Upgrade (${h.toLocaleString()} ETB) &rarr;</button>`),l.id==="pkg-premium"){const k=u?'<button type="button" disabled class="w-full py-2.5 rounded-full bg-white/80 border border-berry/30 text-berry text-xs font-extrabold cursor-not-allowed">Current Plan</button>':`<button type="button" onclick="openUpgradeConfirmModal('${l.id}')" class="w-full py-3 rounded-full bg-gradient-to-r from-[#C91254] via-[#E11D62] to-[#EC4899] hover:opacity-95 text-white text-xs font-extrabold shadow-rose-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-amber-200" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/></svg>
                <span>Upgrade to Premium (${h.toLocaleString()} ETB) &rarr;</span>
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
                    <h3 class="font-serif text-[17px] font-extrabold text-ink leading-tight">${l.name}</h3>
                    <p class="text-[10.5px] text-ink-muted mt-0.5 leading-snug">${l.tagline||""}</p>
                  </div>
                  <div class="text-right shrink-0 bg-white/90 px-2.5 py-1.5 rounded-2xl border border-blush-200 shadow-2xs">
                    <div class="text-base font-black text-berry leading-none">${Number(l.price).toLocaleString()} <span class="text-[10px]">ETB</span></div>
                    <div class="text-[8.5px] font-bold text-ink-muted mt-0.5">${f?"Pay "+h.toLocaleString()+" ETB diff":l.billing||"One-time setup"}</div>
                  </div>
                </div>

                <div class="text-[10.5px] font-extrabold text-berry pt-1.5 border-t border-berry/15">${l.includesPrefix||"Everything in Advanced, plus:"}</div>

                <ul class="space-y-1.5">
                  ${(l.features||[]).map(w=>`
                    <li class="flex items-start gap-2 text-[11px] text-ink font-medium">
                      <span class="w-4 h-4 rounded-full bg-gradient-to-br from-berry to-berry-dark text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                      <span class="leading-snug">${w}</span>
                    </li>
                  `).join("")}
                </ul>

                <div class="pt-1">${k}</div>
              </div>
            </div>
          `}return`
          <div class="bg-white rounded-[24px] p-4 shadow-rose-sm border ${u?"border-2 border-berry ring-2 ring-berry/15":"border-blush-200/80"} space-y-3">
            <div class="flex items-start justify-between gap-2">
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="text-sm font-black text-ink">${l.name}</h3>
                  ${u?'<span class="px-2 py-0.5 rounded-full bg-berry text-white text-[9px] font-extrabold tracking-wide">CURRENT PLAN</span>':""}
                </div>
                <p class="text-[10.5px] text-ink-muted mt-0.5 leading-snug">${l.tagline||""}</p>
              </div>
              <div class="text-right shrink-0">
                <div class="text-base font-black text-berry">${Number(l.price).toLocaleString()} <span class="text-[10px]">ETB</span></div>
                <div class="text-[9px] font-semibold text-ink-muted">${f?"Pay "+h.toLocaleString()+" ETB diff":l.billing||"One-time setup"}</div>
              </div>
            </div>

            ${l.includesPrefix?`<div class="text-[10.5px] font-extrabold text-berry pt-1 border-t border-blush-100">${l.includesPrefix}</div>`:'<div class="border-t border-blush-100"></div>'}

            <ul class="space-y-1.5">
              ${(l.features||[]).map(k=>`
                <li class="flex items-start gap-2 text-[11px] ${u||p?"text-ink font-semibold":"text-ink-muted"}">
                  <span class="w-4 h-4 rounded-full ${u||p?"bg-emerald-500 text-white":"bg-blush-100 text-berry"} flex items-center justify-center shrink-0 mt-0.5">
                    <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span class="leading-snug">${k}</span>
                </li>
              `).join("")}
            </ul>

            <div class="pt-1">${g}</div>
          </div>
        `}).join("");s.innerHTML=r+d}
