let adminNotifications=[{id:101,type:"order",title:"New Order #ORD-10048",desc:"Abebe Kebede \u2022 2,750 ETB \u2022 Red Velvet Cake",time:"8m ago",unread:!0,action:()=>{toggleAdminNotifications(!1),switchAdminTab("orders"),setAdminFilter("All")}},{id:102,type:"payment",title:"Payment Pending Review",desc:"Selamawit Bekele uploaded CBE transfer receipt for #ORD-10047",time:"24m ago",unread:!0,action:()=>{toggleAdminNotifications(!1),switchAdminTab("orders"),setAdminFilter("Payment Pending")}},{id:103,type:"system",title:"Bole Kitchen Online",desc:"Bakery open & accepting chilled delivery orders in Addis",time:"1h ago",unread:!1,action:()=>{toggleAdminNotifications(!1),switchAdminTab("overview")}}];function toggleAdminNotifications(e){const t=document.getElementById("admin-notif-modal"),s=document.getElementById("admin-notif-backdrop");if(!t||!s)return;(e!==void 0?e:t.classList.contains("hidden"))?(renderAdminNotifications(),s.classList.remove("hidden"),t.classList.remove("hidden")):(s.classList.add("hidden"),t.classList.add("hidden"))}function renderAdminNotifications(){const e=document.getElementById("admin-notif-list"),t=document.getElementById("admin-notif-badge");if(!e)return;const s=adminNotifications.filter(n=>n.unread).length;if(t&&(t.textContent=s,t.classList.toggle("hidden",s===0)),!adminNotifications.length){e.innerHTML=`
          <div class="py-6 text-center text-ink-muted">
            <svg class="w-8 h-8 mx-auto text-ink-muted/40 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <div class="text-xs font-bold text-ink">No new notifications</div>
            <p class="text-[10px]">All kitchen and order alerts are cleared.</p>
          </div>
        `;return}e.innerHTML=adminNotifications.map(n=>`
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
      `).join("")}function handleAdminNotificationClick(e){const t=adminNotifications.find(s=>s.id===e);t&&(t.unread=!1,renderAdminNotifications(),typeof t.action=="function"&&t.action())}function clearAdminNotifications(){adminNotifications.forEach(e=>e.unread=!1),renderAdminNotifications(),showAdminToast("All notifications marked as read")}function addAdminNotification(e,t,s="system",n=null){adminNotifications.unshift({id:Date.now(),type:s,title:e,desc:t,time:"Just now",unread:!0,action:n||(()=>toggleAdminNotifications(!1))}),renderAdminNotifications()}let quickUploadActivePhoto="",quickUploadProductType="cake";function openQuickUploadModal(){toggleAdminNotifications(!1),quickUploadActivePhoto="",quickUploadProductType="cake",document.getElementById("quick-cake-name").value="",document.getElementById("quick-cake-price").value="2800",document.getElementById("quick-cake-desc").value="",document.getElementById("quick-cake-stock").value="true",setQuickProductType("cake");const e=document.getElementById("quick-upload-step-choose"),t=document.getElementById("quick-upload-step-details");e&&e.classList.remove("hidden"),t&&t.classList.add("hidden");const s=document.getElementById("quick-modal-title"),n=document.getElementById("quick-step-indicator");s&&(s.textContent="Add New Creation"),n&&(n.textContent="Choose photo source first");const o=document.getElementById("quick-photo-preview-img");o&&(o.src="");const a=document.getElementById("quick-upload-backdrop"),r=document.getElementById("quick-upload-sheet");a&&a.classList.remove("hidden"),r&&(r.classList.remove("hidden"),requestAnimationFrame(()=>r.classList.remove("translate-y-full")))}function closeQuickUploadModal(){const e=document.getElementById("quick-upload-backdrop"),t=document.getElementById("quick-upload-sheet");t&&t.classList.add("translate-y-full"),setTimeout(()=>{e&&e.classList.add("hidden"),t&&t.classList.add("hidden")},300)}function triggerQuickCamera(){const e=document.getElementById("quick-camera-input");e&&(e.value="",e.click())}function triggerQuickGallery(){const e=document.getElementById("quick-gallery-input");e&&(e.value="",e.click())}function backToPhotoStep(){const e=document.getElementById("quick-upload-step-choose"),t=document.getElementById("quick-upload-step-details");e&&e.classList.remove("hidden"),t&&t.classList.add("hidden");const s=document.getElementById("quick-modal-title"),n=document.getElementById("quick-step-indicator");s&&(s.textContent="Add New Creation"),n&&(n.textContent="Choose photo source first")}function handleQuickUploadFileInput(e){if(e.files&&e.files[0]){const t=e.files[0],s=new FileReader;s.onload=function(n){applyQuickPhotoSelected(n.target.result,t.name)},s.readAsDataURL(t)}}function selectQuickPresetPhoto(e,t,s,n){applyQuickPhotoSelected(e,t);const o=document.getElementById("quick-cake-name");if(o&&(o.value=t),s){const a=document.getElementById("quick-cake-cat");a&&(a.value=s)}if(n){const a=document.getElementById("quick-cake-price");a&&(a.value=n)}}function applyQuickPhotoSelected(e,t="Custom Bakery Photo"){quickUploadActivePhoto=e;const s=document.getElementById("quick-photo-preview-img");s&&(s.src=e);const n=document.getElementById("quick-photo-name-label");n&&(n.textContent=t);const o=document.getElementById("quick-upload-step-choose"),a=document.getElementById("quick-upload-step-details");o&&o.classList.add("hidden"),a&&a.classList.remove("hidden");const r=document.getElementById("quick-modal-title"),i=document.getElementById("quick-step-indicator");r&&(r.textContent="Creation Details"),i&&(i.textContent="Step 2: Fill details & publish");const l=document.getElementById("quick-cake-name");l&&!l.value&&setTimeout(()=>l.focus(),150)}function setQuickProductType(e){quickUploadProductType=e;const t=document.getElementById("quick-type-cake"),s=document.getElementById("quick-type-dec"),n=document.getElementById("quick-type-creation"),o=document.getElementById("quick-cake-cat"),a=document.getElementById("quick-price-wrap"),r=document.getElementById("quick-stock-wrap");if(!t||!s||!o)return;const i="py-1.5 px-1 rounded-xl text-[11px] font-bold bg-berry text-white shadow-rose-sm transition-all cursor-pointer truncate",l="py-1.5 px-1 rounded-xl text-[11px] font-bold bg-blush-100 text-ink hover:bg-blush-200 transition-all cursor-pointer truncate";t.className=e==="cake"?i:l,s.className=e==="dec"?i:l,n&&(n.className=e==="creation"?i:l),a&&a.classList.toggle("hidden",e==="creation"),r&&r.classList.toggle("hidden",e==="creation"),e==="cake"?o.innerHTML=`
          <option value="Bento">Bento</option>
          <option value="Birthday Cakes">Birthday Cakes</option>
          <option value="Wedding Cakes">Wedding Cakes</option>
          <option value="Normal">Normal</option>
          <option value="Special">Special</option>
          <option value="Cupples">Cupples</option>
          <option value="Mini Cakes">Mini Cakes</option>
        `:e==="creation"?o.innerHTML=`
          <option value="Birthday">Birthday</option>
          <option value="Wedding">Wedding</option>
          <option value="Bento">Bento</option>
          <option value="Chocolate Cakes">Chocolate Cakes</option>
          <option value="Anniversary">Anniversary</option>
          <option value="Custom">Custom</option>
        `:o.innerHTML=`
          <option value="Candles & Toppers">Candles &amp; Toppers</option>
          <option value="Surprise Items">Surprise Items</option>
          <option value="Party Accessories">Party Accessories</option>
          <option value="Tableware & Decor">Tableware &amp; Decor</option>
          <option value="Custom Packaging">Custom Packaging</option>
          <option value="Balloon Extras">Balloon Extras</option>
        `}function submitQuickUploadProduct(){const e=(document.getElementById("quick-cake-name").value||"").trim(),t=document.getElementById("quick-cake-cat").value,s=parseFloat(document.getElementById("quick-cake-price").value),n=document.getElementById("quick-cake-stock").value==="true",o=(document.getElementById("quick-cake-desc").value||"").trim();if(!quickUploadActivePhoto){showAdminToast("Please take or choose a photo first!","error"),backToPhotoStep();return}if(!e){showAdminToast("Please enter a title or product name!","error"),document.getElementById("quick-cake-name").focus();return}if(quickUploadProductType!=="creation"&&(isNaN(s)||s<=0)){showAdminToast("Please enter a valid price in ETB!","error"),document.getElementById("quick-cake-price").focus();return}if(quickUploadProductType==="cake"){const a={id:Date.now(),name:e,category:t,price:s,inStock:n,img:quickUploadActivePhoto,desc:o||"Handcrafted fresh daily in Bole with premium luxury ingredients.",rating:5,reviews:1,popular:!0};state.cakes.unshift(a),saveState(),syncAll(),addAdminNotification("New Cake Published",`${e} added to ${t} (${s} ETB)`,"order"),showAdminToast("Submitted successfully!","success"),showCustomerToast(`New Cake: ${e} added to menu!`,"success")}else if(quickUploadProductType==="creation"){Array.isArray(state.creations)||(state.creations=[]);const a={id:"cr-"+Date.now(),title:e,category:t,caption:o||"Freshly handcrafted in Bole Kitchen.",date:"Today",img:quickUploadActivePhoto,published:!0};state.creations.unshift(a),saveState(),syncAll(),addAdminNotification("New Recent Creation",`${e} added to Recent Creations (${t})`,"order"),showAdminToast("Submitted successfully!","success"),showCustomerToast(`New Creation: ${e} added!`,"success")}else{const a={id:Date.now(),name:e,category:t,price:s,inStock:n,img:quickUploadActivePhoto,desc:o||"Celebration party extra decoration."};state.decorations.unshift(a),saveState(),syncAll(),addAdminNotification("New Extra Added",`${e} added to ${t} (${s} ETB)`,"order"),showAdminToast("Submitted successfully!","success")}if(closeQuickUploadModal(),switchAdminTab("products"),quickUploadProductType==="creation"&&typeof setAdminMenuTab=="function")try{setAdminMenuTab("creations")}catch{}}function openAdminSidebar(){if(typeof isAdminSessionLocked<"u"&&isAdminSessionLocked){lockAdminPortal();return}const e=document.getElementById("admin-sidebar-backdrop"),t=document.getElementById("admin-sidebar-drawer");e&&(e.classList.remove("hidden"),requestAnimationFrame(()=>{e.classList.remove("opacity-0"),e.classList.add("opacity-100")})),t&&(t.classList.remove("-translate-x-full"),t.classList.add("translate-x-0"))}function closeAdminSidebar(){const e=document.getElementById("admin-sidebar-backdrop"),t=document.getElementById("admin-sidebar-drawer");t&&(t.classList.add("-translate-x-full"),t.classList.remove("translate-x-0")),e&&(e.classList.remove("opacity-100"),e.classList.add("opacity-0")),setTimeout(()=>{e&&e.classList.add("hidden")},280)}function selectAdminDrawerItem(e,t){if(document.querySelectorAll("#admin-drawer-nav-list .admin-drawer-item").forEach(s=>{const n=s.dataset.drawerItem===e;s.classList.toggle("bg-blush-50",n),s.classList.toggle("border-berry/40",n),s.classList.toggle("shadow-rose-sm",n),s.classList.toggle("bg-white",!n),s.classList.toggle("border-blush-100",!n);const o=s.querySelector(".drawer-item-icon");o&&(o.classList.toggle("bg-berry",n),o.classList.toggle("text-white",n),o.classList.toggle("bg-blush-100",!n),o.classList.toggle("text-berry",!n));const a=s.querySelector(".drawer-item-label");a&&(a.classList.toggle("text-berry",n),a.classList.toggle("text-ink",!n));const r=s.querySelector(".drawer-item-chevron");r&&(r.classList.toggle("text-berry",n),r.classList.toggle("text-ink-light",!n))}),e==="my-profile"){openMyProfilePage();return}if(e==="shop-management"){openShopManagementSection();return}if(e==="product-configuration"){openProductConfigSection();return}if(e==="marketing-promotions"){openMarketingSection();return}if(e==="settings"){openSettingsHubSection();return}if(e==="upgrade-plan"){openUpgradePlanPage();return}typeof showAdminToast=="function"&&showAdminToast(t+" selected")}let adminProfileData={id:"mgr-01",name:"Mahlet Mekonnen (Owner)",email:"owner@makcake.et",phone:"0911 23 45 67",role:"Owner",avatar:"./images/mak-cake-logo.webp",shopName:"MAK CAKE \u2022 Bole Kitchen",googleConnected:!1,googleEmail:"",googleClientId:""},isProfileEditMode=!1,pendingProfileAvatarData;function syncAdminProfileUI(){const e=adminProfileData,t=document.getElementById("drawer-admin-avatar"),s=document.getElementById("drawer-admin-name"),n=document.getElementById("drawer-admin-role"),o=document.getElementById("drawer-admin-shop");t&&e.avatar&&(t.src=e.avatar,t.style.display=""),s&&(s.textContent=e.name||"MAK CAKE Owner"),n&&(n.textContent=e.role||"Owner"),o&&(o.textContent=e.shopName||"MAK CAKE \u2022 Bole Kitchen");const a=document.getElementById("profile-avatar-preview"),r=document.getElementById("profile-display-name"),i=document.getElementById("profile-role-badge"),l=document.getElementById("profile-role-text"),u=document.getElementById("profile-input-name"),p=document.getElementById("profile-input-email"),c=document.getElementById("profile-input-phone");a&&(a.src=pendingProfileAvatarData||e.avatar||"./images/mak-cake-logo.webp",a.style.display=""),r&&(r.textContent=e.name||"MAK CAKE Owner"),i&&(i.textContent=e.role||"Owner"),l&&(l.textContent=e.role||"Owner"),u&&!isProfileEditMode&&(u.value=e.name||""),p&&!isProfileEditMode&&(p.value=e.email||""),c&&!isProfileEditMode&&(c.value=e.phone||"");const b=document.getElementById("profile-google-status-badge"),g=document.getElementById("profile-google-email-display"),f=document.getElementById("profile-google-connect-btn"),x=document.getElementById("profile-google-disconnect-btn");e.googleConnected&&e.googleEmail?(b&&(b.textContent="Connected",b.className="px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200"),g&&(g.textContent=e.googleEmail),f&&f.classList.add("hidden"),x&&x.classList.remove("hidden")):(b&&(b.textContent="Not Connected",b.className="px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold bg-blush-100 text-berry border border-blush-200"),g&&(g.textContent="No Google account linked"),f&&f.classList.remove("hidden"),x&&x.classList.add("hidden"))}async function loadAdminProfileFromDb(){try{const e=await fetch("/api/admin/profile",{cache:"no-store"});if(e.ok){const t=await e.json();if(t.success&&t.profile){adminProfileData={...adminProfileData,...t.profile},localStorage.setItem("mak_admin_profile_v1",JSON.stringify(adminProfileData)),syncAdminProfileUI();return}}}catch{}try{const e=localStorage.getItem("mak_admin_profile_v1");e&&(adminProfileData={...adminProfileData,...JSON.parse(e)})}catch{}syncAdminProfileUI()}function openMyProfilePage(){setProfileEditMode(!1),switchAdminTab("profile"),loadAdminProfileFromDb()}function setProfileEditMode(e){isProfileEditMode=e,pendingProfileAvatarData=void 0;const t=document.getElementById("profile-validation-error");t&&(t.classList.add("hidden"),t.textContent=""),[document.getElementById("profile-input-name"),document.getElementById("profile-input-email"),document.getElementById("profile-input-phone")].forEach(r=>{r&&(r.readOnly=!e,r.classList.toggle("bg-white",e),r.classList.toggle("border-berry/40",e),r.classList.toggle("bg-blush-50/70",!e),r.classList.toggle("border-blush-200/80",!e))});const n=document.getElementById("profile-change-photo-btn"),o=document.getElementById("profile-save-bar"),a=document.getElementById("profile-edit-toggle-label");n&&n.classList.toggle("hidden",!e),o&&o.classList.toggle("hidden",!e),a&&(a.textContent=e?"Editing":"Edit Profile"),e||syncAdminProfileUI()}function toggleProfileEditMode(){setProfileEditMode(!isProfileEditMode)}function cancelProfileEdit(){setProfileEditMode(!1)}function handleAdminProfilePhotoChange(e){const t=e.files&&e.files[0];if(!t)return;if(!t.type.startsWith("image/")){showProfileValidationError("Please select a valid image file (PNG, JPG, or WebP).");return}const s=new FileReader;s.onload=n=>{pendingProfileAvatarData=n.target.result;const o=document.getElementById("profile-avatar-preview");o&&(o.src=pendingProfileAvatarData,o.style.display=""),isProfileEditMode||setProfileEditMode(!0)},s.readAsDataURL(t)}function showProfileValidationError(e){const t=document.getElementById("profile-validation-error");t&&(t.textContent=e,t.classList.remove("hidden"))}async function saveAdminProfileChanges(){const e=(document.getElementById("profile-input-name")?.value||"").trim(),t=(document.getElementById("profile-input-email")?.value||"").trim().toLowerCase(),s=(document.getElementById("profile-input-phone")?.value||"").trim();if(e.length<2){showProfileValidationError("Full name must be at least 2 characters.");return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)){showProfileValidationError("Please enter a valid email address.");return}if(s.replace(/\D/g,"").length<9){showProfileValidationError("Please enter a valid phone number (at least 9 digits).");return}const n=document.getElementById("profile-save-btn");await runWithFeedback({lockKey:"save-admin-profile",btnEl:n,scope:"admin",loadingMsg:"Saving profile...",successMsg:"Changes saved successfully!",action:async()=>{const o={name:e,email:t,phone:s};pendingProfileAvatarData&&(o.avatar=pendingProfileAvatarData);const a=await fetch("/api/admin/profile",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}),r=await a.json();if(!a.ok||!r.success)throw showProfileValidationError(r.error||"Could not save profile changes."),new Error(r.error||"Could not save profile changes.");return adminProfileData={...adminProfileData,...r.profile},localStorage.setItem("mak_admin_profile_v1",JSON.stringify(adminProfileData)),setProfileEditMode(!1),syncAdminProfileUI(),!0}})}function openGoogleConnectModal(){const e=document.getElementById("profile-google-oauth-backdrop"),t=document.getElementById("profile-google-oauth-modal"),s=document.getElementById("profile-google-oauth-email"),n=document.getElementById("profile-google-oauth-error");n&&n.classList.add("hidden"),s&&!s.value&&(s.value=adminProfileData.googleEmail||adminProfileData.email||"natnaelagizew27@gmail.com"),e&&e.classList.remove("hidden"),t&&t.classList.remove("hidden")}function closeGoogleConnectModal(){const e=document.getElementById("profile-google-oauth-backdrop"),t=document.getElementById("profile-google-oauth-modal");e&&e.classList.add("hidden"),t&&t.classList.add("hidden")}async function openGoogleConnectFlow(){!window.FirebaseService&&!window.__firebaseServiceReady&&await new Promise(n=>{const o=()=>{window.removeEventListener("firebase-service-ready",o),n()};window.addEventListener("firebase-service-ready",o),setTimeout(n,2e3)});const e=document.getElementById("profile-google-connect-btn"),t=e?e.innerHTML:"";if(window.FirebaseService&&typeof window.FirebaseService.isAvailable=="function"&&window.FirebaseService.isAvailable()&&typeof firebaseConfig<"u"&&firebaseConfig.apiKey&&!firebaseConfig.apiKey.includes("B7hhbWoCyWJdc"))try{e&&(e.disabled=!0,e.innerHTML="<span>Connecting Google...</span>");const n=await window.FirebaseService.signInWithGoogle();if(!n)return;await completeGoogleConnectRequest({email:n.email,name:n.displayName||adminProfileData.name,picture:n.photoURL||adminProfileData.avatar});return}catch(n){if(console.warn("Firebase Google Auth error:",n),n&&n.code==="auth/popup-closed-by-user")return}finally{e&&(e.disabled=!1,e.innerHTML=t)}openGoogleConnectModal()}async function completeGoogleConnectRequest(e){try{await fetch("/api/admin/google-connect",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}catch{}adminProfileData.googleConnected=!0,adminProfileData.googleEmail=e.email,e.name&&(adminProfileData.name=e.name),e.picture&&(adminProfileData.avatar=e.picture),localStorage.setItem("mak_admin_profile_v1",JSON.stringify(adminProfileData)),typeof syncAdminProfileUI=="function"&&syncAdminProfileUI(),closeGoogleConnectModal(),typeof showAdminToast=="function"&&showAdminToast("\u2713 Google account connected: "+adminProfileData.googleEmail,"success")}async function submitGoogleConnect(){const e=(document.getElementById("profile-google-oauth-email")?.value||"").trim().toLowerCase(),t=document.getElementById("profile-google-oauth-error");if(!/^[^s@]+@[^s@]+.[^s@]+$/.test(e)){t&&(t.textContent="Please enter a valid Google email address.",t.classList.remove("hidden"));return}try{await completeGoogleConnectRequest({email:e,name:adminProfileData.name,picture:adminProfileData.avatar})}catch(s){t&&(t.textContent=s.message,t.classList.remove("hidden"))}}async function disconnectGoogleAccount(){try{await fetch("/api/admin/google-disconnect",{method:"POST"})}catch{}adminProfileData.googleConnected=!1,adminProfileData.googleEmail="",localStorage.setItem("mak_admin_profile_v1",JSON.stringify(adminProfileData)),syncAdminProfileUI(),typeof showAdminToast=="function"&&showAdminToast("Google account disconnected","success")}function openAdminShopScreen(){closeAdminSidebar(),switchAdminTab("shop")}function openAdminSettingsScreen(){closeAdminSidebar(),switchAdminTab("settings")}function openAdminProfileModal(){closeAdminSidebar();const e=document.getElementById("admin-profile-modal-backdrop"),t=document.getElementById("admin-profile-modal");e&&e.classList.remove("hidden"),t&&t.classList.remove("hidden")}function closeAdminProfileModal(){const e=document.getElementById("admin-profile-modal-backdrop"),t=document.getElementById("admin-profile-modal");e&&e.classList.add("hidden"),t&&t.classList.add("hidden")}let isAdminSessionLocked=!1;function handleAdminLogout(){closeAdminSidebar();const e=document.getElementById("admin-logout-backdrop"),t=document.getElementById("admin-logout-modal");e&&e.classList.remove("hidden"),t&&t.classList.remove("hidden")}function closeAdminLogoutModal(){const e=document.getElementById("admin-logout-backdrop"),t=document.getElementById("admin-logout-modal");e&&e.classList.add("hidden"),t&&t.classList.add("hidden")}async function confirmAdminLogout(){const e=document.getElementById("admin-confirm-logout-btn");e&&(e.disabled=!0);try{await fetch("/api/admin/logout",{method:"POST"})}catch{}try{localStorage.setItem("mak_admin_logged_out","1"),localStorage.removeItem("mak_admin_auth_token"),sessionStorage.clear(),window.google&&google.accounts&&google.accounts.id&&google.accounts.id.disableAutoSelect(),window.FirebaseService&&typeof window.FirebaseService.signOut=="function"&&window.FirebaseService.signOut().catch(()=>{})}catch{}closeAdminLogoutModal(),lockAdminPortal(),e&&(e.disabled=!1)}function lockAdminPortal(){isAdminSessionLocked=!0,closeAdminSidebar();const e=document.getElementById("admin-login-gate"),t=document.getElementById("admin-login-gate-err");t&&(t.classList.add("hidden"),t.textContent=""),e&&e.classList.remove("hidden")}async function signInAdminWithGoogle(){const e=document.getElementById("admin-google-signin-btn"),t=document.getElementById("admin-google-signin-label"),s=document.getElementById("admin-login-gate-err");if(s&&(s.classList.add("hidden"),s.textContent=""),!window.FirebaseService&&!window.__firebaseServiceReady&&(t&&(t.textContent="Connecting..."),await new Promise(n=>{const o=()=>{window.removeEventListener("firebase-service-ready",o),n()};window.addEventListener("firebase-service-ready",o),setTimeout(n,2e3)})),!window.FirebaseService||!window.FirebaseService.isAvailable||!window.FirebaseService.isAvailable()){s&&(s.textContent="Google OAuth service is unavailable offline. Please check your internet connection.",s.classList.remove("hidden"));return}try{e&&(e.disabled=!0),t&&(t.textContent="Opening Google...");const n=await window.FirebaseService.signInWithGoogle();if(!n)return;const o=typeof n.getIdToken=="function"?await n.getIdToken(!0):"";if(!o)throw new Error("Could not obtain verified Google credential.");let a=!1;try{const i=await fetch("/api/admin/google-login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({credential:o,email:n.email,name:n.displayName||"",picture:n.photoURL||""})});if(i.ok){const l=await i.json();l&&l.success&&(a=!0,adminProfileData.googleConnected=!0,adminProfileData.googleEmail=l.user?.email||n.email,l.user?.name&&(adminProfileData.name=l.user.name),l.user?.picture&&(adminProfileData.avatar=l.user.picture))}}catch{}a||(adminProfileData.googleConnected=!0,adminProfileData.googleEmail=n.email,n.displayName&&(adminProfileData.name=n.displayName),n.photoURL&&(adminProfileData.avatar=n.photoURL)),localStorage.setItem("mak_admin_profile_v1",JSON.stringify(adminProfileData)),typeof syncAdminProfileUI=="function"&&syncAdminProfileUI(),localStorage.removeItem("mak_admin_logged_out"),isAdminSessionLocked=!1;const r=document.getElementById("admin-login-gate");r&&r.classList.add("hidden"),switchAdminTab("overview"),typeof showAdminToast=="function"&&showAdminToast("Signed in with Google: "+(data.user?.email||n.email),"success")}catch(n){if(n&&n.code==="auth/popup-closed-by-user")return;const o=n&&n.code==="auth/unauthorized-domain"?"Domain "+window.location.hostname+" is not authorized in Firebase Auth > Authorized domains.":n&&n.message||"Google Sign-In failed.";s&&(s.textContent=o,s.classList.remove("hidden"))}finally{e&&(e.disabled=!1),t&&(t.textContent="Sign in with Google")}}async function submitAdminGateLogin(){const e=(document.getElementById("admin-login-passcode")?.value||"").trim(),t=document.getElementById("admin-login-gate-err");if(!e){t&&(t.textContent="Please enter your admin passcode.",t.classList.remove("hidden"));return}try{const s=await fetch("/api/admin/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({passcode:e})}),n=await s.json();if(!s.ok||!n.success){t&&(t.textContent=n.error||"Invalid passcode.",t.classList.remove("hidden"));return}localStorage.removeItem("mak_admin_logged_out"),isAdminSessionLocked=!1;const o=document.getElementById("admin-login-gate");o&&o.classList.add("hidden"),document.getElementById("admin-login-passcode")&&(document.getElementById("admin-login-passcode").value=""),switchAdminTab("overview"),typeof showAdminToast=="function"&&showAdminToast("Signed in to MAK CAKE Admin")}catch{t&&(t.textContent="Network error. Please try again.",t.classList.remove("hidden"))}}function checkInitialAdminLockState(){localStorage.getItem("mak_admin_logged_out")==="1"&&lockAdminPortal()}function switchAdminTab(e){if(typeof isAdminSessionLocked<"u"&&isAdminSessionLocked){lockAdminPortal();return}e==="menu"&&(e="products"),adminTab=e,closeAddCakeSheet(),closeAddDecorationSheet(),closeAdminReceiptModal(),closeAdminSidebar(),document.querySelectorAll(".a-tab-view").forEach(o=>{o.classList.add("hidden"),o.classList.remove("animate-view")});const t=e==="products"?"a-tab-menu":`a-tab-${e}`,s=document.getElementById(t);s&&(s.classList.remove("hidden"),s.offsetWidth,s.classList.add("animate-view")),document.querySelectorAll(".a-nav-btn").forEach(o=>{const a=o.dataset.atab===e||e==="products"&&o.dataset.atab==="menu";o.classList.toggle("text-berry",a),o.classList.toggle("font-bold",a),o.classList.toggle("text-ink",!a),o.classList.toggle("font-medium",!a);const r=o.querySelector(".a-nav-ind");r&&r.classList.toggle("hidden",!a)});const n=document.getElementById("admin-header-shop-btn");if(n){const o=e==="shop";n.classList.toggle("bg-berry",o),n.classList.toggle("text-white",o),n.classList.toggle("border-berry",o),n.classList.toggle("bg-white",!o),n.classList.toggle("text-ink",!o),n.classList.toggle("border-blush-200",!o)}document.getElementById("admin-scroll-area").scrollTop=0,e==="overview"&&renderAdminOverview(),e==="orders"&&renderAdminOrders(),e==="products"&&renderAdminProducts(),e==="analytics"&&renderAdminAnalytics(),e==="shop"&&renderAdminShop(),e==="settings"&&renderAdminPackages(),document.getElementById("admin-scroll-area").scrollTop=0,e==="overview"&&renderAdminOverview()}function renderAdminOverview(){renderAdminHero();const e=state.orders||[],t=e.length,s=e.filter(c=>c.status==="Payment Pending"||c.status==="Pending").length,n=e.filter(c=>c.status==="Completed").length,o=e.reduce((c,b)=>c+(b.total||0),0),a=document.getElementById("overview-total-orders");a&&(a.textContent=t);const r=document.getElementById("overview-pending-orders");r&&(r.textContent=s);const i=document.getElementById("overview-completed-orders");i&&(i.textContent=n);const l=document.getElementById("overview-today-revenue");l&&(l.textContent=fmtETB(o));const u=document.getElementById("overview-pending-badge");u&&(u.textContent=s);const p=document.getElementById("overview-recent-orders-list");if(p){const c=e.slice(0,3);c.length?p.innerHTML=c.map(b=>{const g=b.status==="Payment Pending"||b.status==="Pending",f=b.status==="Approved"||["Confirmed","Preparing","Ready"].includes(b.status),x=g?"Payment Pending":f?"Approved":"Completed",E=x==="Completed"?"bg-emerald-50 text-emerald-700 border border-emerald-200":x==="Approved"?"bg-sky-50 text-sky-700 border border-sky-200":"bg-amber-50 text-amber-700 border border-amber-200";return`
              <div onclick="openExactAdminOrder(${b.id})" class="p-2.5 rounded-xl bg-blush-50/80 hover:bg-blush-100/70 border border-blush-200/60 flex items-center justify-between gap-2.5 cursor-pointer transition-colors active:scale-[0.99]" title="View & select order #ORD-${b.id}">
                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-2">
                    <span class="font-extrabold text-xs text-ink">#ORD-${b.id}</span>
                    <span class="text-xs font-black text-berry">${fmtETB(b.total)}</span>
                  </div>
                  <div class="text-[11px] font-semibold text-ink mt-0.5 truncate">${b.customerName}</div>
                </div>
                <div class="flex items-center gap-1.5 shrink-0">
                  <span class="px-2 py-0.5 rounded-full text-[9.5px] font-extrabold ${E}">${x}</span>
                  <svg class="w-3.5 h-3.5 text-berry/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
              </div>
            `}).join(""):p.innerHTML='<div class="text-center py-4 text-xs text-ink-muted">No recent orders found.</div>'}}function openExactAdminOrder(e){switchAdminTab("orders"),setAdminFilter("All"),setTimeout(()=>{const t=document.getElementById(`admin-order-card-${e}`);t&&(t.scrollIntoView({behavior:"smooth",block:"center"}),t.classList.remove("order-highlight-selected"),t.offsetWidth,t.classList.add("order-highlight-selected"),showAdminToast(`Selected Order #ORD-${e}`),setTimeout(()=>{t.classList.remove("order-highlight-selected")},3200))},120)}let adminHeroIndex=0,adminHeroTimer=null;function getAdminBanners(){return(!state.adminBanners||!state.adminBanners.length)&&(state.adminBanners=[{id:1,top:"Fresh Daily Addis",script:"Mini Bento",sub:"Same-day chilled delivery in Bole",cta:"Order Bento",link:"products",img:"https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=700&q=85"},{id:2,top:"Handcrafted in Bole",script:"Weddings",sub:"Luxury tiered cakes for Addis galas",cta:"View Specials",link:"products",img:"https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=700&q=85"},{id:3,top:"Make Every Moment",script:"Sweeter",sub:"Premium celebration cakes baked fresh",cta:"Manage Menu",link:"products",img:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=85"}]),state.adminBanners}const ADMIN_OVERVIEW_SLIDES=getAdminBanners();function renderAdminHero(){const e=getAdminBanners(),t=e[adminHeroIndex%e.length]||e[0],s=document.getElementById("admin-hero-img");s&&s.src!==t.img&&(s.style.opacity="0.35",setTimeout(()=>{s.src=t.img,s.style.opacity="1"},140));const n=document.getElementById("admin-hero-top");n&&(n.textContent=t.top);const o=document.getElementById("admin-hero-script");o&&(o.textContent=t.script);const a=document.getElementById("admin-hero-sub");a&&(a.textContent=t.sub);const r=document.getElementById("admin-hero-cta");r&&(r.textContent=t.cta);const i=document.getElementById("admin-hero-dots");i&&(i.innerHTML=getAdminBanners().map((l,u)=>`
          <button onclick="setAdminHeroSlide(${u})" aria-label="Slide ${u+1}" class="h-1.5 rounded-full transition-all cursor-pointer ${u===adminHeroIndex?"w-4 bg-berry":"w-1.5 bg-white/85"}"></button>
        `).join(""))}function setAdminHeroSlide(e){adminHeroIndex=e%ADMIN_OVERVIEW_SLIDES.length,renderAdminHero(),resetAdminHeroTimer()}function handleAdminHeroClick(){const e=ADMIN_OVERVIEW_SLIDES[adminHeroIndex]||ADMIN_OVERVIEW_SLIDES[0];e&&e.action&&e.action()}function resetAdminHeroTimer(){adminHeroTimer&&clearInterval(adminHeroTimer),adminHeroTimer=setInterval(()=>{const e=getAdminBanners().length||1;adminHeroIndex=(adminHeroIndex+1)%e,renderAdminHero()},3e3)}function toggleAdminBell(){state.shop.bellOn=!state.shop.bellOn,saveState(),syncAll(),state.shop.bellOn&&playBell(!0),showAdminToast(state.shop.bellOn?"Kitchen Bell Activated":"Kitchen Bell Muted")}function setAdminFilter(e){adminFilter=e,document.querySelectorAll(".a-fchip").forEach(t=>{t.dataset.af===e?t.className="a-fchip shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold btn-berry text-white shadow-rose-sm":t.className="a-fchip shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold bg-white text-ink-muted border border-blush-200"}),renderAdminOrders()}function advanceOrder(e,t){const s=state.orders.find(n=>n.id===e);s&&(s.status=t,s.isNewFlash=!1,sendOrderStatusPush(s.id,t),saveState(),syncAll(),showAdminToast(`Order #${s.id} \u2192 ${t}`),showCustomerToast(`\u{1F514} Order #${s.id} updated: ${t}`))}function renderAdminOrders(){const e=state.orders.filter(r=>r.status==="Payment Pending"||r.status==="Pending").length,t=state.orders.filter(r=>r.status==="Approved"||["Confirmed","Preparing","Ready"].includes(r.status)).length,s=state.orders.reduce((r,i)=>r+i.total,0);document.getElementById("kpi-orders").textContent=state.orders.length,document.getElementById("kpi-pending").textContent=e,document.getElementById("kpi-baking").textContent=t,document.getElementById("kpi-revenue").textContent=fmtETB(s),document.getElementById("header-admin-badge").textContent=e;const n=document.getElementById("admin-nav-badge");n.textContent=e,n.classList.toggle("hidden",e===0);let o=state.orders;adminFilter!=="All"&&(o=state.orders.filter(r=>adminFilter==="Payment Pending"?r.status==="Payment Pending"||r.status==="Pending":adminFilter==="Approved"?r.status==="Approved"||["Confirmed","Preparing","Ready"].includes(r.status):r.status===adminFilter));const a=document.getElementById("admin-orders-list");if(!o.length){a.innerHTML=`<div class="bg-white rounded-[20px] p-6 text-center text-xs text-ink-muted shadow-rose">No orders in "${adminFilter}".</div>`;return}a.innerHTML=o.map((r,i)=>{const l=r.paymentPlan==="half"?"Half 50%":r.paymentPlan==="cod"?"On Delivery":"Full 100%",u=r.paymentStatus==="Paid",p=r.status==="Payment Pending"||r.status==="Pending",c=r.status==="Approved"||["Confirmed","Preparing","Ready"].includes(r.status),b=p?"Payment Pending":c?"Approved":"Completed";let g="";p?g=`<button onclick="advanceOrder(${r.id}, 'Approved')" class="flex-1 py-2 rounded-full btn-berry text-white font-bold text-[11px] shadow-rose-sm active:scale-[0.98] transition-transform flex items-center justify-center gap-1"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Approve Order</button>`:c?g=`<button onclick="advanceOrder(${r.id}, 'Completed')" class="flex-1 py-2 rounded-full bg-emerald-500 text-white font-bold text-[11px] active:scale-[0.98] transition-transform flex items-center justify-center gap-1"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Mark Completed</button>`:g='<div class="flex-1 text-center py-1.5 text-[11px] font-extrabold text-emerald-600 flex items-center justify-center gap-1"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Completed &amp; Delivered</div>';const f=b==="Completed"?"bg-emerald-50 text-emerald-700":b==="Approved"?"bg-sky-50 text-sky-700 border border-sky-200":"bg-amber-50 text-amber-700 border border-amber-200";return`
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
                  <span class="px-1.5 py-0.5 rounded-full text-[9px] font-extrabold ${u?"bg-emerald-50 text-emerald-700 border border-emerald-200":"bg-amber-50 text-amber-700 border border-amber-200"}">${u?"Paid":l}</span>
                  ${r.pushEnabled?'<span class="px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">\u{1F514} Push On</span>':""}
                </div>
                <div class="text-[11px] font-semibold text-ink mt-0.5 truncate">${r.customerName}</div>
                <div class="text-[10px] text-ink-muted truncate">
                  <a href="tel:${r.phone.replace(/\s+/g,"")}" onclick="showAdminToast('Calling ${r.customerName}...')" class="text-berry font-bold underline">${r.phone}</a> \u2022 ${r.address}
                </div>
              </div>
              <span class="shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${f}">${b}</span>
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
              <button onclick="openAdminReceiptModal(${r.id})" class="px-3 py-2 rounded-full bg-blush-100 hover:bg-blush-200 text-ink font-bold text-[10.5px] active:scale-95 transition-transform shrink-0 flex items-center justify-center gap-1">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>
                <span>Receipt</span>
              </button>
              ${u?"":`
                <button onclick="markOrderPaid(${r.id})" class="px-3 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-extrabold text-[10.5px] active:scale-95 transition-transform shrink-0 flex items-center justify-center gap-1">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Mark Paid</span>
                </button>
              `}
              ${g}
            </div>
          </article>
        `}).join("")}function openAdminReceiptModal(e){const t=state.orders.find(r=>r.id===e);if(!t)return;const s=t.paymentStatus==="Paid",n=t.paymentPlan==="half"?"Half Payment (50% Deposit)":t.paymentPlan==="cod"?"Pay on Delivery":"Full Payment (100%)";document.getElementById("receipt-modal-title").textContent=`Order #ORD-${t.id} Receipt`,document.getElementById("receipt-modal-sub").innerHTML=`${t.customerName} &bull; <span class="inline-flex items-center gap-1 text-ink">${getBrandLogo(t.paymentMethod,"w-3.5 h-3.5")} ${t.paymentMethod}</span>`,document.getElementById("receipt-modal-body").innerHTML=`
        ${t.receiptImg?`
          <div onclick="openFullscreenViewer('${t.receiptImg}', 'Order #ORD-${t.id} Receipt Screenshot')" class="relative rounded-2xl overflow-hidden border-2 border-blush-300 bg-black/5 cursor-zoom-in group shadow-xs">
            <img src="${t.receiptImg}" alt="Bank Receipt" class="w-full max-h-56 object-contain bg-white transition-transform group-hover:scale-[1.02]" />
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
          <div class="flex justify-between"><span class="text-ink-muted">Reference ID</span><span class="font-extrabold text-berry">${t.paymentRef}</span></div>
          <div class="flex justify-between"><span class="text-ink-muted">Order Total</span><span class="font-extrabold text-ink">${fmtETB(t.total)}</span></div>
          <div class="flex justify-between"><span class="text-ink-muted">Due Upfront</span><span class="font-extrabold text-emerald-700">${fmtETB(t.dueNow??t.total)}</span></div>
          <div class="flex justify-between"><span class="text-ink-muted">Balance on Delivery</span><span class="font-bold text-ink">${fmtETB(t.balanceDue??0)}</span></div>
          <div class="flex justify-between pt-1 border-t border-blush-200"><span class="text-ink-muted">Status</span><span class="font-extrabold ${s?"text-emerald-600":"text-amber-600"}">${s?"Verified & Paid":"Pending Verification"}</span></div>
        </div>
      `,document.getElementById("receipt-modal-footer").innerHTML=`
        ${s?`
          <div class="flex-1 py-2 text-center text-xs font-extrabold text-emerald-700">Payment Verified</div>
        `:`
          <button onclick="markOrderPaid(${t.id}); closeAdminReceiptModal();" class="flex-1 py-2.5 rounded-full bg-emerald-600 text-white font-bold text-xs shadow-sm active:scale-95 transition-transform">
            Verify &amp; Mark as Paid
          </button>
        `}
        <button onclick="closeAdminReceiptModal()" class="px-4 py-2.5 rounded-full bg-white border border-blush-300 text-ink font-bold text-xs">Close</button>
      `,closeAddCakeSheet(),closeAddDecorationSheet();const o=document.getElementById("admin-receipt-backdrop"),a=document.getElementById("admin-receipt-modal");o&&o.classList.remove("hidden"),a&&(a.classList.remove("hidden"),requestAnimationFrame(()=>a.classList.remove("translate-y-full")))}function closeAdminReceiptModal(){const e=document.getElementById("admin-receipt-backdrop"),t=document.getElementById("admin-receipt-modal");t&&t.classList.add("translate-y-full"),setTimeout(()=>{t&&t.classList.add("hidden"),e&&e.classList.add("hidden")},260)}function markOrderPaid(e){const t=state.orders.find(s=>s.id===e);t&&(t.paymentStatus="Paid",(t.status==="Payment Pending"||t.status==="Pending")&&(t.status="Approved"),t.isNewFlash=!1,state.notifications.unshift({id:Date.now(),title:`Order Approved (#ORD-${t.id})`,msg:`Payment verified. Your order for ${t.cakeName} has been approved by MAK CAKE Bole.`,time:"Just now"}),state.unreadNotifs++,saveState(),syncAll(),showAdminToast(`Order #ORD-${t.id} Approved`),showCustomerToast(`Order #ORD-${t.id} Approved`))}let adminCakeCatFilter="All",activeCakeFormPhoto="";function setAdminCakeCatFilter(e){adminCakeCatFilter=e,renderAdminMenu()}function renderAdminMenu(){const e=(document.getElementById("admin-menu-search")?.value||"").trim().toLowerCase(),t=state.cakes.filter(i=>{const l=adminCakeCatFilter==="All"||i.category===adminCakeCatFilter,u=!e||i.name.toLowerCase().includes(e)||i.category&&i.category.toLowerCase().includes(e)||i.desc&&i.desc.toLowerCase().includes(e);return l&&u}),s=state.cakes.filter(i=>i.inStock!==!1).length,n=document.getElementById("admin-menu-sub");n&&(n.textContent=`${s}/${state.cakes.length} available \u2022 Live sync to Customer Phone`);const o=document.getElementById("admin-sub-cakes-cnt");o&&(o.textContent=state.cakes.length);const a=document.getElementById("admin-cake-cat-pills");if(a){const i=["All","Normal","Special","Cupples","Mini Cakes"];a.innerHTML=i.map(l=>{const u=adminCakeCatFilter===l,p=l==="All"?state.cakes.length:state.cakes.filter(c=>c.category===l).length;return`
            <button onclick="setAdminCakeCatFilter('${l}')" class="shrink-0 px-2.5 py-1.5 rounded-full text-[10.5px] font-bold transition-all cursor-pointer ${u?"btn-berry text-white shadow-rose-sm":"bg-white text-ink-muted border border-blush-200 hover:text-ink"}">
              ${l} (${p})
            </button>
          `}).join("")}const r=document.getElementById("admin-menu-list");if(r){if(!t.length){r.innerHTML='<div class="bg-white rounded-[18px] p-5 text-center text-xs text-ink-muted shadow-rose-sm">No cakes found in this category. Tap "+ Add Cake" to create one.</div>';return}r.innerHTML=t.map((i,l)=>{const u=i.inStock!==!1;return`
          <div class="bg-white rounded-[18px] p-3 shadow-rose-sm border border-white flex items-center justify-between gap-2.5">
            <!-- Priority Swap Buttons (Up / Down) -->
            <div class="flex flex-col shrink-0 pr-1 py-0.5 gap-0.5 select-none">
              <button onclick="moveCakePriority(${i.id}, 'up'); event.stopPropagation();" title="Move Up" class="w-6 h-5 rounded bg-blush-100 hover:bg-berry hover:text-white text-ink-muted flex items-center justify-center text-[9px] font-bold transition-colors ${l===0?"opacity-25 pointer-events-none":"active:scale-110 cursor-pointer"}">\u25B2</button>
              <button onclick="moveCakePriority(${i.id}, 'down'); event.stopPropagation();" title="Move Down" class="w-6 h-5 rounded bg-blush-100 hover:bg-berry hover:text-white text-ink-muted flex items-center justify-center text-[9px] font-bold transition-colors ${l===t.length-1?"opacity-25 pointer-events-none":"active:scale-110 cursor-pointer"}">\u25BC</button>
            </div>

            <!-- Clickable Cake Thumbnail with Camera Overlay -->
            <div onclick="triggerCakePhotoUpload(${i.id})" class="relative group cursor-pointer w-14 h-14 rounded-xl overflow-hidden bg-blush-100 border border-blush-200 shrink-0 shadow-2xs flex items-center justify-center ${u?"":"grayscale opacity-60"}">
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
                <span class="px-2 py-0.5 rounded-full text-[8.5px] font-bold ${u?"bg-emerald-50 text-emerald-700 border border-emerald-200":"bg-rose-50 text-berry border border-rose-200"} shrink-0">
                  ${u?"Available":"Sold Out"}
                </span>
              </div>
              <div class="flex items-center gap-1.5 mt-0.5">
                <span class="px-2 py-0.5 rounded-full bg-blush-100 text-ink-muted text-[9.5px] font-bold">${i.category}</span>
                <span class="text-[11px] font-black text-berry">${fmtETB(i.price)}</span>
              </div>
            </div>

            <!-- Actions: Stock Switch + Full Edit Modal + Delete -->
            <div class="flex items-center gap-1.5 shrink-0">
              <button onclick="toggleCakeStock(${i.id})" title="Toggle Available / Sold Out" class="w-8 h-8 rounded-xl ${u?"bg-emerald-50 text-emerald-600 hover:bg-emerald-100":"bg-rose-50 text-berry hover:bg-rose-100"} flex items-center justify-center transition-all active:scale-90 shadow-2xs cursor-pointer">
                ${u?'<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>':'<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'}
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
        `}).join("")}}function moveCakePriority(e,t){const s=state.cakes.findIndex(a=>a.id===e);if(s===-1)return;const n=t==="up"?s-1:s+1;if(n<0||n>=state.cakes.length)return;const[o]=state.cakes.splice(s,1);state.cakes.splice(n,0,o),saveState(),syncAll(),showAdminToast(`Moved "${o.name}" ${t==="up"?"Up":"Down"}`)}function editCakePrice(e,t){const s=parseInt(t,10);if(isNaN(s)||s<100)return;const n=state.cakes.find(o=>o.id===e);n&&(n.price=s,saveState(),syncAll(),showAdminToast(`Updated ${n.name} \u2192 ${fmtETB(s)}`))}function toggleCakeStock(e){const t=state.cakes.find(s=>s.id===e);t&&(t.inStock=!t.inStock,saveState(),syncAll(),showAdminToast(`${t.name}: ${t.inStock?"Available":"Sold Out"}`))}function openAddCakeModal(){closeAddDecorationSheet(),closeAdminReceiptModal(),document.getElementById("cake-modal-title").textContent="+ Add New Cake",document.getElementById("cake-form-id").value="",document.getElementById("cake-form-name").value="",document.getElementById("cake-form-cat").value="Normal",document.getElementById("cake-form-price").value="2800",document.getElementById("cake-form-stock").value="true",document.getElementById("cake-form-desc").value="",document.getElementById("cake-form-img-preset").value="";const e="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80";document.getElementById("cake-form-img-preview").src=e,document.getElementById("cake-form-img-status").textContent="Default Preset Photo",document.getElementById("cake-form-delete-btn").classList.add("hidden"),activeCakeFormPhoto=e;const t=document.getElementById("add-cake-backdrop"),s=document.getElementById("add-cake-sheet");t&&t.classList.remove("hidden"),s&&(s.classList.remove("hidden"),requestAnimationFrame(()=>s.classList.remove("translate-y-full")))}function openAddCakeSheet(){openAddCakeModal()}function openEditCakeModal(e){const t=state.cakes.find(o=>o.id===e);if(!t)return;closeAddDecorationSheet(),closeAdminReceiptModal(),document.getElementById("cake-modal-title").textContent="Edit Cake: "+t.name,document.getElementById("cake-form-id").value=t.id,document.getElementById("cake-form-name").value=t.name,document.getElementById("cake-form-cat").value=t.category||"Normal",document.getElementById("cake-form-price").value=t.price,document.getElementById("cake-form-stock").value=t.inStock!==!1?"true":"false",document.getElementById("cake-form-desc").value=t.desc||"",document.getElementById("cake-form-img-preset").value="",document.getElementById("cake-form-img-preview").src=t.img||SVG_CAKE_FALLBACK,document.getElementById("cake-form-img-status").textContent="Current Product Photo",document.getElementById("cake-form-delete-btn").classList.remove("hidden"),activeCakeFormPhoto=t.img||"";const s=document.getElementById("add-cake-backdrop"),n=document.getElementById("add-cake-sheet");s&&s.classList.remove("hidden"),n&&(n.classList.remove("hidden"),requestAnimationFrame(()=>n.classList.remove("translate-y-full")))}function closeAddCakeSheet(){const e=document.getElementById("add-cake-backdrop"),t=document.getElementById("add-cake-sheet");t&&t.classList.add("translate-y-full"),setTimeout(()=>{t&&t.classList.add("hidden"),e&&e.classList.add("hidden")},260)}async function handleCakeFormPhotoUpload(e){const t=e.files&&e.files[0];if(t){if(!t.type||!t.type.startsWith("image/")){showAdminToast("Please select an image file only (PNG, JPG, WEBP)"),e.value="";return}try{showAdminToast("Compressing image on-the-fly...");const s=await compressImageFileToCanvas(t,800,.82);activeCakeFormPhoto=s.dataUrl,document.getElementById("cake-form-img-preview").src=s.dataUrl,document.getElementById("cake-form-img-status").textContent=`Attached (${s.kb}KB HQ Canvas Compressed)`,showAdminToast(`Cake photo compressed (${s.kb}KB)!`)}catch(s){showAdminToast("Error compressing image: "+s.message)}e.value=""}}function handleCakePresetSelect(e){e&&(activeCakeFormPhoto=e,document.getElementById("cake-form-img-preview").src=e,document.getElementById("cake-form-img-status").textContent="Preset Selected")}function triggerCakePhotoUpload(e){const t=document.getElementById(`cake-file-${e}`);t&&t.click()}async function uploadCakePhoto(e,t){const s=t.files&&t.files[0];if(!s)return;if(!s.type||!s.type.startsWith("image/")){showAdminToast("Please select an image file only (PNG, JPG, WEBP)"),t.value="";return}const n=state.cakes.find(o=>o.id===e);if(n){try{showAdminToast("Compressing image on-the-fly...");const o=await compressImageFileToCanvas(s,800,.82);n.img=o.dataUrl,saveState(),syncAll(),showAdminToast(`Photo updated for "${n.name}" (${o.kb}KB)!`)}catch(o){showAdminToast("Error compressing photo: "+o.message)}t.value=""}}function saveAdminCakeForm(){const e=document.getElementById("cake-form-id").value,t=document.getElementById("cake-form-name"),s=document.getElementById("cake-form-price"),n=t?t.value.trim():"",o=s?s.value.trim():"",a=parseInt(o,10),r=document.getElementById("cake-form-cat").value,i=document.getElementById("cake-form-stock").value==="true",l=document.getElementById("cake-form-desc").value.trim();if(!n){highlightMissingRequirement("cake-form-name","Required: Please enter cake name"),showAdminToast("\u26A0\uFE0F Please enter cake name");return}if(!o||isNaN(a)||a<100){highlightMissingRequirement("cake-form-price","Required: Please enter a valid price (min 100 ETB)"),showAdminToast("\u26A0\uFE0F Please enter a valid cake price");return}const u=activeCakeFormPhoto||"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80";if(e){const p=Number(e),c=state.cakes.find(b=>b.id===p);if(!c)return;c.name=n,c.category=r,c.price=a,c.inStock=i,c.desc=l||c.desc,activeCakeFormPhoto&&(c.img=activeCakeFormPhoto),saveState(),syncAll(),closeAddCakeSheet(),showAdminToast(`Updated "${c.name}" live!`)}else{const p={id:Date.now(),name:n,desc:l||"Handcrafted fresh daily with premium ingredients in Bole Medhanialem.",category:r,price:a,rating:5,reviews:"New",popular:!0,inStock:i,img:u};state.cakes.unshift(p),saveState(),syncAll(),closeAddCakeSheet(),showAdminToast(`Added cake "${n}" live!`),showCustomerToast(`New Cake: ${n} added to menu!`)}}function publishNewCake(){saveAdminCakeForm()}function deleteAdminCake(e){const t=state.cakes.find(n=>n.id===e);!t||!confirm(`Are you sure you want to delete cake "${t.name}"?

This will remove it from the live menu.`)||(state.cakes=state.cakes.filter(n=>n.id!==e),saveState(),syncAll(),showAdminToast(`Deleted cake "${t.name}"`))}function deleteAdminCakeFromModal(){const e=document.getElementById("cake-form-id").value;e&&(deleteAdminCake(Number(e)),closeAddCakeSheet())}function setAdminMenuSub(e){adminMenuSub=e;const t=e==="cakes",s=e==="decorations",n=e==="creations",o=document.getElementById("admin-sub-cakes"),a=document.getElementById("admin-sub-decorations"),r=document.getElementById("admin-sub-creations");o&&(o.className=`py-1.5 rounded-full text-[10.5px] font-extrabold transition-all flex items-center justify-center gap-1 ${t?"btn-berry text-white shadow-rose-sm":"text-ink-muted hover:text-ink"}`),a&&(a.className=`py-1.5 rounded-full text-[10.5px] font-extrabold transition-all flex items-center justify-center gap-1 ${s?"btn-berry text-white shadow-rose-sm":"text-ink-muted hover:text-ink"}`),r&&(r.className=`py-1.5 rounded-full text-[10.5px] font-extrabold transition-all flex items-center justify-center gap-1 ${n?"btn-berry text-white shadow-rose-sm":"text-ink-muted hover:text-ink"}`);const i=document.getElementById("admin-menu-cakes-panel"),l=document.getElementById("admin-menu-dec-panel"),u=document.getElementById("admin-subview-creations");i&&i.classList.toggle("hidden",!t),l&&l.classList.toggle("hidden",!s),u&&u.classList.toggle("hidden",!n),t?renderAdminMenu():s?renderAdminDecorations():n&&renderAdminCreations()}function renderAdminCreations(){const e=document.getElementById("admin-sub-creations-cnt");e&&(e.textContent=(state.creations||[]).length);const t=document.getElementById("admin-creations-list");if(!t)return;const s=state.creations||[];if(!s.length){t.innerHTML='<div class="bg-white rounded-[18px] p-5 text-center text-xs text-ink-muted shadow-rose-sm">No creations uploaded yet. Tap "+ Capture &amp; Upload" to post a real cake photo.</div>';return}t.innerHTML=s.map((n,o)=>`
        <div class="bg-white rounded-[18px] p-3 shadow-rose-sm border border-white flex items-center gap-2.5">
          <!-- Swap Place Buttons (Up / Down) -->
          <div class="flex flex-col shrink-0 pr-1 py-0.5 gap-0.5 select-none">
            <button onclick="moveCreationPriority('${n.id}', 'up'); event.stopPropagation();" title="Move Up" class="w-6 h-5 rounded bg-blush-100 hover:bg-berry hover:text-white text-ink-muted flex items-center justify-center text-[9px] font-bold transition-colors ${o===0?"opacity-25 pointer-events-none":"active:scale-110 cursor-pointer"}">\u25B2</button>
            <button onclick="moveCreationPriority('${n.id}', 'down'); event.stopPropagation();" title="Move Down" class="w-6 h-5 rounded bg-blush-100 hover:bg-berry hover:text-white text-ink-muted flex items-center justify-center text-[9px] font-bold transition-colors ${o===s.length-1?"opacity-25 pointer-events-none":"active:scale-110 cursor-pointer"}">\u25BC</button>
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
      `).join("")}function moveCreationPriority(e,t){const s=(state.creations||[]).findIndex(a=>String(a.id)===String(e));if(s===-1)return;const n=t==="up"?s-1:s+1;if(n<0||n>=state.creations.length)return;const[o]=state.creations.splice(s,1);state.creations.splice(n,0,o),saveState(),syncAll(),showAdminToast(`Moved "${o.title}" ${t==="up"?"Up":"Down"}`)}function openAddCreationSheet(){activeCreationPhoto="";const e=document.getElementById("new-cr-title");e&&(e.value="");const t=document.getElementById("new-cr-cat");t&&(t.value="Chocolate Cakes");const s=document.getElementById("new-cr-date");s&&(s.value="Today");const n=document.getElementById("new-cr-preview-box");n&&n.classList.add("hidden");const o=document.getElementById("new-cr-upload-btn");o&&o.classList.remove("hidden");const a=document.getElementById("admin-add-creation-modal");a&&a.classList.remove("hidden")}function closeAddCreationSheet(){document.getElementById("admin-add-creation-modal").classList.add("hidden")}function clearCreationPhoto(){activeCreationPhoto="",document.getElementById("new-cr-preview-box").classList.add("hidden"),document.getElementById("new-cr-upload-btn").classList.remove("hidden"),document.getElementById("new-cr-file").value=""}function handleCreationPhotoUpload(e){const t=e.files&&e.files[0];if(!t)return;if(!t.type||!t.type.startsWith("image/")){showAdminToast("Please select a photo only (PNG, JPG, WEBP)"),e.value="";return}const s=new FileReader;s.onload=function(n){const o=new Image;o.onload=function(){try{const r=Math.min(1,800/o.width),i=document.createElement("canvas");i.width=Math.round(o.width*r),i.height=Math.round(o.height*r),i.getContext("2d").drawImage(o,0,0,i.width,i.height),activeCreationPhoto=i.toDataURL("image/jpeg",.75)}catch{activeCreationPhoto=n.target.result}document.getElementById("new-cr-preview-img").src=activeCreationPhoto,document.getElementById("new-cr-preview-box").classList.remove("hidden"),document.getElementById("new-cr-upload-btn").classList.add("hidden"),showAdminToast("Real photo compressed and ready")},o.src=n.target.result},s.readAsDataURL(t)}function saveNewCreation(){const e=document.getElementById("new-cr-title"),t=e?e.value.trim():"",s=(document.getElementById("new-cr-cat")?.value||"Luxury Cake").trim(),n=(document.getElementById("new-cr-date")?.value||"Today").trim();if(!t){highlightMissingRequirement("new-cr-title","Required: Please enter the cake creation name"),showAdminToast("\u26A0\uFE0F Please enter the cake creation name");return}if(!activeCreationPhoto){highlightMissingRequirement("new-cr-preview-box","Required: Please capture or select a real cake photo"),showAdminToast("\u26A0\uFE0F Please capture or pick a real cake photo");return}const o={id:"cr-"+Date.now(),title:t,category:s,date:n,img:activeCreationPhoto,published:!0};state.creations=state.creations||[],state.creations.unshift(o),saveState(),syncAll(),closeAddCreationSheet(),showAdminToast(`Published "${t}" to storefront!`),showCustomerToast(`Fresh Cake Added: ${t}`)}async function uploadCreationPhoto(e,t){const s=t.files&&t.files[0];if(s){if(!s.type||!s.type.startsWith("image/")){showAdminToast("Please select an image file only (PNG, JPG, WEBP)"),t.value="";return}try{showAdminToast("Compressing photo on-the-fly...");const n=await compressImageFileToCanvas(s,800,.82),o=(state.creations||[]).find(a=>a.id===e);o&&(o.img=n.dataUrl,saveState(),syncAll(),showAdminToast(`Updated photo for "${o.title}" (${n.kb}KB HQ)!`),showGlobalToast("Creation photo updated on customer storefront!"))}catch(n){showAdminToast("Error compressing image: "+n.message)}t.value=""}}function deleteCreation(e){state.creations=(state.creations||[]).filter(t=>t.id!==e),saveState(),syncAll(),showAdminToast("Creation removed")}function setAdminDecCatFilter(e){adminDecCatFilter=e,renderAdminDecorations()}function renderAdminDecorations(){const e=document.getElementById("admin-sub-dec-cnt");e&&(e.textContent=state.decorations.length);const t=document.getElementById("admin-dec-sub"),s=state.decorations.filter(i=>i.inStock!==!1).length;t&&(t.textContent=`${s}/${state.decorations.length} active \u2022 5 predefined categories`);const n=document.getElementById("admin-dec-cat-pills");if(n){const i=[{id:"All",short:"All",svgKey:"sparkles"},...DECORATION_CATEGORIES];n.innerHTML=i.map(l=>{const u=adminDecCatFilter===l.id,p=l.id==="All"?state.decorations.length:state.decorations.filter(c=>c.category===l.id).length;return`
            <button onclick="setAdminDecCatFilter('${l.id.replace(/'/g,"\\'")}')" class="shrink-0 px-2.5 py-1.5 rounded-full text-[10.5px] font-bold transition-all ${u?"btn-berry text-white shadow-rose-sm":"bg-white text-ink-muted border border-blush-200"}">
              ${getLuxurySvg(l.svgKey||"sparkles","w-3.5 h-3.5 shrink-0 inline-block mr-1")} ${l.short} (${p})
            </button>
          `}).join("")}const o=(document.getElementById("admin-dec-search")?.value||"").trim().toLowerCase(),a=state.decorations.filter(i=>{const l=adminDecCatFilter==="All"||i.category===adminDecCatFilter,u=!o||i.name.toLowerCase().includes(o)||i.category&&i.category.toLowerCase().includes(o)||i.desc&&i.desc.toLowerCase().includes(o);return l&&u}),r=document.getElementById("admin-dec-list");if(r){if(!a.length){r.innerHTML='<div class="bg-white rounded-[18px] p-5 text-center text-xs text-ink-muted shadow-rose-sm">No decorations found matching your filter. Tap "+ Add Decoration" to create one.</div>';return}r.innerHTML=a.map((i,l)=>{const u=i.inStock!==!1;return`
          <div class="bg-white rounded-[18px] p-3 shadow-rose-sm border border-white flex items-center justify-between gap-2.5">
            <!-- Swap Place Buttons (Up / Down) -->
            <div class="flex flex-col shrink-0 pr-1 py-0.5 gap-0.5 select-none">
              <button onclick="moveDecorationPriority('${i.id}', 'up'); event.stopPropagation();" title="Move Up" class="w-6 h-5 rounded bg-blush-100 hover:bg-berry hover:text-white text-ink-muted flex items-center justify-center text-[9px] font-bold transition-colors ${l===0?"opacity-25 pointer-events-none":"active:scale-110 cursor-pointer"}">\u25B2</button>
              <button onclick="moveDecorationPriority('${i.id}', 'down'); event.stopPropagation();" title="Move Down" class="w-6 h-5 rounded bg-blush-100 hover:bg-berry hover:text-white text-ink-muted flex items-center justify-center text-[9px] font-bold transition-colors ${l===a.length-1?"opacity-25 pointer-events-none":"active:scale-110 cursor-pointer"}">\u25BC</button>
            </div>

            <!-- Clickable Photo Thumbnail with Camera Overlay -->
            <div onclick="triggerDecorationPhotoUpload('${i.id}')" class="relative group cursor-pointer w-14 h-14 rounded-xl overflow-hidden bg-blush-100 border border-blush-200 shrink-0 shadow-2xs flex items-center justify-center ${u?"":"grayscale opacity-60"}">
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
                <span class="px-2 py-0.5 rounded-full text-[8.5px] font-bold ${u?"bg-emerald-50 text-emerald-700 border border-emerald-200":"bg-rose-50 text-berry border border-rose-200"} shrink-0">
                  ${u?"Available":"Sold Out"}
                </span>
              </div>
              <div class="text-[9.5px] font-semibold text-ink-muted truncate mt-0.5">${i.category}</div>
              <div class="text-[11px] font-black text-berry mt-0.5">${fmtETB(i.price)}</div>
            </div>

            <!-- Actions: Stock Switch + Full Edit Modal + Delete -->
            <div class="flex items-center gap-1.5 shrink-0">
              <button onclick="toggleDecorationStock('${i.id}')" title="Toggle Available / Sold Out" class="w-8 h-8 rounded-xl ${u?"bg-emerald-50 text-emerald-600 hover:bg-emerald-100":"bg-rose-50 text-berry hover:bg-rose-100"} flex items-center justify-center transition-all active:scale-90 shadow-2xs">
                ${u?'<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>':'<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>'}
              </button>

              <button onclick="openEditDecorationModal('${i.id}')" title="Edit Decoration" class="w-8 h-8 rounded-xl bg-blush-100 text-ink hover:text-berry hover:bg-blush-200 flex items-center justify-center transition-all active:scale-90 shadow-2xs">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              </button>

              <button onclick="deleteAdminDecoration('${i.id}')" title="Delete Decoration" class="w-8 h-8 rounded-xl bg-blush-50 text-ink-muted hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-all active:scale-90">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
        `}).join("")}}function moveDecorationPriority(e,t){const s=state.decorations.findIndex(a=>String(a.id)===String(e));if(s===-1)return;const n=t==="up"?s-1:s+1;if(n<0||n>=state.decorations.length)return;const[o]=state.decorations.splice(s,1);state.decorations.splice(n,0,o),saveState(),syncAll(),showAdminToast(`Moved decoration "${o.name}" ${t==="up"?"Up":"Down"}`)}let activeAdminDecFormPhoto="";function openAddDecorationSheet(){openAddDecorationModal()}function openAddDecorationModal(){document.getElementById("admin-dec-modal-title").textContent="+ Add New Decoration",document.getElementById("admin-dec-form-id").value="",document.getElementById("admin-dec-form-name").value="",document.getElementById("admin-dec-form-cat").value="Candles & Toppers",document.getElementById("admin-dec-form-stock").value="true",document.getElementById("admin-dec-form-price").value="200",document.getElementById("admin-dec-form-desc").value="",document.getElementById("admin-dec-form-reqnum").checked=!1,document.getElementById("admin-dec-form-img-preview").src=SEED_DECORATIONS[0].img,document.getElementById("admin-dec-form-img-status").textContent="Default Category Photo",document.getElementById("admin-dec-form-delete-btn").classList.add("hidden"),activeAdminDecFormPhoto="",showAdminDecModal()}function openEditDecorationModal(e){const t=state.decorations.find(s=>s.id===e);t&&(document.getElementById("admin-dec-modal-title").textContent="Edit Decoration: "+t.name,document.getElementById("admin-dec-form-id").value=t.id,document.getElementById("admin-dec-form-name").value=t.name,document.getElementById("admin-dec-form-cat").value=t.category||"Candles & Toppers",document.getElementById("admin-dec-form-stock").value=t.inStock!==!1?"true":"false",document.getElementById("admin-dec-form-price").value=t.price,document.getElementById("admin-dec-form-desc").value=t.desc||"",document.getElementById("admin-dec-form-reqnum").checked=!!t.requiresNumber,document.getElementById("admin-dec-form-img-preview").src=t.img||SVG_CAKE_FALLBACK,document.getElementById("admin-dec-form-img-status").textContent="Current Decoration Photo",document.getElementById("admin-dec-form-delete-btn").classList.remove("hidden"),activeAdminDecFormPhoto=t.img||"",showAdminDecModal())}function showAdminDecModal(){closeAddCakeSheet(),closeAdminReceiptModal();const e=document.getElementById("admin-dec-backdrop"),t=document.getElementById("admin-dec-sheet");e&&e.classList.remove("hidden"),t&&(t.classList.remove("hidden"),requestAnimationFrame(()=>t.classList.remove("translate-y-full")))}function closeAdminDecModal(){const e=document.getElementById("admin-dec-backdrop"),t=document.getElementById("admin-dec-sheet");t&&t.classList.add("translate-y-full"),setTimeout(()=>{t&&t.classList.add("hidden"),e&&e.classList.add("hidden")},260)}function closeAddDecorationSheet(){closeAdminDecModal()}async function handleAdminDecFormPhotoUpload(e){const t=e.files&&e.files[0];if(t){if(!t.type||!t.type.startsWith("image/")){showAdminToast("Please select an image file only (PNG, JPG, WEBP)"),e.value="";return}try{showAdminToast("Compressing image on-the-fly...");const s=await compressImageFileToCanvas(t,800,.82);activeAdminDecFormPhoto=s.dataUrl,document.getElementById("admin-dec-form-img-preview").src=s.dataUrl,document.getElementById("admin-dec-form-img-status").textContent=`Attached (${s.kb}KB HQ Canvas Compressed)`,showAdminToast(`Decoration photo compressed (${s.kb}KB)!`)}catch(s){showAdminToast("Error compressing image: "+s.message)}e.value=""}}function saveAdminDecorationForm(){const e=document.getElementById("admin-dec-form-id").value,t=document.getElementById("admin-dec-form-name"),s=document.getElementById("admin-dec-form-price"),n=t?t.value.trim():"",o=s?s.value.trim():"",a=parseInt(o,10),r=document.getElementById("admin-dec-form-cat").value,i=document.getElementById("admin-dec-form-stock").value==="true",l=document.getElementById("admin-dec-form-desc").value.trim(),u=document.getElementById("admin-dec-form-reqnum").checked;if(!n){highlightMissingRequirement("admin-dec-form-name","Required: Please enter decoration product name"),showAdminToast("\u26A0\uFE0F Please enter decoration name");return}if(!o||isNaN(a)||a<10){highlightMissingRequirement("admin-dec-form-price","Required: Please enter a valid price (minimum 10 ETB)"),showAdminToast("\u26A0\uFE0F Please enter a valid price (minimum 10 ETB)");return}if(e){const p=state.decorations.findIndex(c=>c.id===e);p!==-1&&(state.decorations[p].name=n,state.decorations[p].category=r,state.decorations[p].inStock=i,state.decorations[p].price=a,state.decorations[p].desc=l,state.decorations[p].requiresNumber=u,activeAdminDecFormPhoto&&(state.decorations[p].img=activeAdminDecFormPhoto),saveState(),syncAll(),closeAdminDecModal(),showAdminToast(`Updated "${n}" successfully!`),showGlobalToast(`"${n}" updated and synced live to customer catalog!`))}else{const p={id:"dec-"+Date.now(),name:n,category:r,inStock:i,price:a,desc:l,requiresNumber:u,svgKey:(DECORATION_CATEGORIES.find(c=>c.id===r)||{}).svgKey||"sparkles",img:activeAdminDecFormPhoto||(SEED_DECORATIONS.find(c=>c.category===r)||SEED_DECORATIONS[0]).img};state.decorations.unshift(p),saveState(),syncAll(),closeAdminDecModal(),showAdminToast(`Created "${n}" in ${r}!`),showGlobalToast(`New decoration "${n}" synced to Customer Storefront!`)}}function deleteCurrentAdminDecoration(){const e=document.getElementById("admin-dec-form-id").value;e&&deleteAdminDecoration(e)}function deleteAdminDecoration(e){const t=state.decorations.find(n=>n.id===e);!t||!window.confirm(`Are you sure you want to delete "${t.name}" from Extra Decorations?

This action cannot be undone.`)||(state.decorations=state.decorations.filter(n=>n.id!==e),state.decSelections&&state.decSelections[e]&&delete state.decSelections[e],saveState(),syncAll(),closeAdminDecModal(),showAdminToast(`Deleted "${t.name}"`),showGlobalToast("Decoration removed from customer storefront catalog."))}function toggleDecorationStock(e){const t=state.decorations.find(s=>s.id===e);t&&(t.inStock=t.inStock===!1,saveState(),syncAll(),showAdminToast(`${t.name}: ${t.inStock?"Available (In Stock)":"Sold Out"}`),showGlobalToast(`${t.name} is now ${t.inStock?"available to order":"marked Sold Out"}`))}function triggerDecorationPhotoUpload(e){const t=document.getElementById("dec-file-"+e);t&&t.click()}async function uploadDecorationPhoto(e,t){const s=t.files&&t.files[0];if(s){if(!s.type||!s.type.startsWith("image/")){showAdminToast("Please select an image file only (PNG, JPG, WEBP)"),t.value="";return}try{showAdminToast("Compressing photo on-the-fly...");const n=await compressImageFileToCanvas(s,800,.82),o=state.decorations.find(a=>a.id===e);o&&(o.img=n.dataUrl,saveState(),syncAll(),showAdminToast(`Updated photo for "${o.name}" (${n.kb}KB HQ)!`),showGlobalToast("New decoration photo synced to customer catalog!"))}catch(n){showAdminToast("Error compressing image: "+n.message)}t.value=""}}let analyticsDateRange="all",analyticsProductTab="cakes";function setAnalyticsDateRange(e){analyticsDateRange=e,renderAdminAnalytics()}function setAnalyticsProductTab(e){analyticsProductTab=e,renderAdminAnalytics()}function getAnalyticsOrders(){const e=(state.orders||[]).filter(t=>t.status!=="Cancelled");return analyticsDateRange==="all"?e:analyticsDateRange==="today"?e.filter(t=>{if(t.deliveryDate==="Today")return!0;if(t.createdAt){const s=new Date(t.createdAt),n=new Date;return s.getDate()===n.getDate()&&s.getMonth()===n.getMonth()&&s.getFullYear()===n.getFullYear()}return!1}):analyticsDateRange==="7days"?e.filter(t=>t.deliveryDate==="Today"||t.deliveryDate==="Tomorrow"?!0:t.createdAt?(Date.now()-t.createdAt)/864e5<=7:!0):analyticsDateRange==="30days"?e.filter(t=>t.createdAt?(Date.now()-t.createdAt)/864e5<=30:!0):e}function renderAdminAnalytics(){const e=document.getElementById("admin-analytics-body");if(!e)return;const t=getAnalyticsOrders(),s=t.length,n=t.filter(d=>d.paymentStatus==="Paid"),o=n.reduce((d,m)=>d+(m.total||0),0),a=t.reduce((d,m)=>d+(m.total||0),0),r=t.filter(d=>d.paymentStatus!=="Paid"),i=r.reduce((d,m)=>d+(m.total||0),0),l=n.length?Math.round(o/n.length):s?Math.round(a/s):0,u=[{label:"Mon",rev:Math.round(o*.12),orders:Math.max(0,Math.round(s*.15))},{label:"Tue",rev:Math.round(o*.14),orders:Math.max(0,Math.round(s*.15))},{label:"Wed",rev:Math.round(o*.18),orders:Math.max(1,Math.round(s*.2))},{label:"Thu",rev:Math.round(o*.1),orders:Math.max(0,Math.round(s*.1))},{label:"Fri",rev:Math.round(o*.22),orders:Math.max(1,Math.round(s*.2))},{label:"Sat",rev:Math.round(o*.16),orders:Math.max(1,Math.round(s*.15))},{label:"Sun",rev:Math.round(o*.08),orders:Math.max(0,Math.round(s*.05))}],p=Math.max(...u.map(d=>d.rev),1e3),c={};t.forEach(d=>{const m=d.cakeName||"Custom Cake";c[m]||(c[m]={name:m,img:d.cakeImg||"",qty:0,rev:0}),c[m].qty+=1,c[m].rev+=d.total||0});const b=Object.values(c).sort((d,m)=>m.qty!==d.qty?m.qty-d.qty:m.rev-d.rev),g=b.length?Math.max(...b.map(d=>d.rev),1):1,f={};t.forEach(d=>{Array.isArray(d.addons)&&d.addons.length&&d.addons.forEach(m=>{const v=String(m||"").trim();if(!v)return;const h=(state.decorations||[]).find(A=>v.toLowerCase().includes(A.name.toLowerCase())||A.name.toLowerCase().includes(v.toLowerCase())),w=h?h.name:v.replace(/\s*\(\d+\s*ETB\)/i,"").trim(),B=h?h.price:150,C=h?h.img:"",$=h?h.category:"Decorations";f[w]||(f[w]={name:w,category:$,img:C,qty:0,rev:0}),f[w].qty+=1,f[w].rev+=B})});const x=Object.values(f).sort((d,m)=>m.qty!==d.qty?m.qty-d.qty:m.rev-d.rev),E=x.length?Math.max(...x.map(d=>d.rev),1):1,y={Telebirr:0,"CBE Transfer":0,"Pay on Delivery":0};t.forEach(d=>{const m=d.paymentMethod||"Telebirr";y[m]!==void 0?y[m]+=d.total||0:y["Pay on Delivery"]+=d.total||0});const k={today:"Today","7days":"Last 7 Days","30days":"Last 30 Days",all:"All Time"};e.innerHTML=`
        <!-- DATE RANGE SELECTOR (Today | Last 7 Days | Last 30 Days | All Time) -->
        <div class="bg-white rounded-[20px] p-1.5 shadow-rose-sm border border-white grid grid-cols-4 gap-1 select-none">
          ${["today","7days","30days","all"].map(d=>{const m=analyticsDateRange===d,v=k[d];return`
              <button onclick="setAnalyticsDateRange('${d}')" class="py-2 rounded-xl text-[10.5px] font-extrabold transition-all cursor-pointer ${m?"btn-berry text-white shadow-rose-sm":"text-ink-muted hover:text-ink hover:bg-blush-50"}">
                ${v}
              </button>
            `}).join("")}
        </div>

        <!-- 1. BUSINESS OVERVIEW: 4 KEY SUMMARY CARDS -->
        <div class="space-y-1.5">
          <div class="flex items-center justify-between px-0.5">
            <span class="text-xs font-extrabold text-ink">Business Overview</span>
            <span class="text-[10px] font-bold text-ink-muted">${k[analyticsDateRange]}</span>
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
              <div class="text-xl font-black text-ink">${s} <span class="text-xs font-bold text-ink-muted">orders</span></div>
              <div class="text-[9.5px] text-ink-muted flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>${n.length} verified paid</span>
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
              <div class="text-xl font-black text-berry">${fmtETB(o)}</div>
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
              <div class="text-xl font-black text-emerald-700">${fmtETB(a)}</div>
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
              <p class="text-[10px] text-ink-muted">Revenue &amp; order volume trend (${k[analyticsDateRange]})</p>
            </div>
            <span class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-blush-100 text-berry">
              ${s} Orders
            </span>
          </div>

          <!-- Sales Summary 3-Column Metrics -->
          <div class="grid grid-cols-3 gap-2 text-center">
            <div class="bg-blush-50/70 p-2 rounded-xl">
              <div class="text-[9px] font-bold text-ink-muted uppercase">Booked Sales</div>
              <div class="text-xs font-extrabold text-ink mt-0.5">${fmtETB(a)}</div>
            </div>
            <div class="bg-blush-50/70 p-2 rounded-xl">
              <div class="text-[9px] font-bold text-ink-muted uppercase">Orders Count</div>
              <div class="text-xs font-extrabold text-ink mt-0.5">${s} Orders</div>
            </div>
            <div class="bg-blush-50/70 p-2 rounded-xl">
              <div class="text-[9px] font-bold text-ink-muted uppercase">Received Rev</div>
              <div class="text-xs font-extrabold text-berry mt-0.5">${fmtETB(o)}</div>
            </div>
          </div>

          <!-- Sales Trend Bar Chart -->
          <div class="space-y-1.5 pt-1">
            <div class="flex items-center justify-between text-[10px] font-semibold text-ink-muted px-1">
              <span>Verified Revenue Trend (ETB)</span>
              <span>Peak: ${fmtETB(p)}</span>
            </div>

            <!-- SVG Bar Chart -->
            <div class="h-28 w-full bg-blush-50/50 rounded-xl p-2.5 flex items-end justify-between gap-1.5">
              ${u.map(d=>{const m=Math.max(6,Math.round(d.rev/p*88));return`
                  <div class="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                    <span class="text-[8px] font-extrabold text-ink opacity-0 group-hover:opacity-100 transition-opacity">${d.rev?d.rev>=1e3?(d.rev/1e3).toFixed(1)+"k":d.rev:"0"}</span>
                    <div class="w-full max-w-[24px] rounded-t-lg bg-gradient-to-t from-berry-dark to-berry shadow-rose-sm transition-all duration-300" style="height:${m}%;"></div>
                    <span class="text-[9px] font-bold text-ink-muted mt-0.5">${d.label}</span>
                  </div>
                `}).join("")}
            </div>
          </div>

          <!-- Unverified payment note if any -->
          ${i>0?`
            <div class="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/60 flex items-center justify-between text-xs">
              <div class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                <span class="text-[10.5px] font-semibold text-amber-900">${r.length} Pending / Unverified Orders</span>
              </div>
              <span class="text-[11px] font-bold text-amber-900">${fmtETB(i)}</span>
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
                Cakes (${b.length})
              </button>
              <button onclick="setAnalyticsProductTab('decorations')" class="px-2.5 py-1 rounded-full transition-all cursor-pointer ${analyticsProductTab==="decorations"?"bg-berry text-white shadow-rose-sm":"text-ink-muted hover:text-ink"}">
                Extra Decs (${x.length})
              </button>
            </div>
          </div>

          <!-- A. BEST-SELLING CAKES LIST -->
          ${analyticsProductTab==="cakes"?`
            <div class="space-y-2">
              ${b.length?b.map((d,m)=>{const v=m===0?"bg-stargold text-amber-900":m===1?"bg-slate-200 text-slate-800":m===2?"bg-amber-100 text-amber-800":"bg-blush-100 text-ink-muted",h=Math.round(d.rev/(g||1)*100);return`
                  <div class="bg-blush-50/70 p-2.5 rounded-2xl border border-blush-100 space-y-2">
                    <div class="flex items-center justify-between gap-2.5">
                      <div class="flex items-center gap-2.5 min-w-0">
                        <span class="w-5 h-5 rounded-full ${v} text-[9.5px] font-black flex items-center justify-center shrink-0">
                          #${m+1}
                        </span>
                        <div class="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-blush-100 border border-blush-200 shadow-2xs">
                          <img src="${d.img||SVG_CAKE_FALLBACK}" alt="${d.name}" class="w-full h-full object-cover" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
                        </div>
                        <div class="min-w-0">
                          <div class="text-[11.5px] font-extrabold text-ink truncate">${d.name}</div>
                          <div class="text-[10px] font-semibold text-ink-muted">${d.qty} sold in period</div>
                        </div>
                      </div>
                      <div class="text-right shrink-0">
                        <div class="text-[11.5px] font-black text-berry">${fmtETB(d.rev)}</div>
                        <div class="text-[9px] font-semibold text-emerald-600">Revenue</div>
                      </div>
                    </div>
                    <!-- Performance Share Progress Bar -->
                    <div class="h-1.5 rounded-full bg-blush-200/70 overflow-hidden">
                      <div class="h-full bg-berry rounded-full" style="width:${h}%"></div>
                    </div>
                  </div>
                `}).join(""):`
                <div class="p-6 text-center text-xs text-ink-muted">No cake sales recorded for this date range.</div>
              `}
            </div>
          `:`
            <!-- B. BEST-SELLING EXTRA DECORATIONS LIST -->
            <div class="space-y-2">
              ${x.length?x.map((d,m)=>{const v=m===0?"bg-stargold text-amber-900":m===1?"bg-slate-200 text-slate-800":m===2?"bg-amber-100 text-amber-800":"bg-blush-100 text-ink-muted",h=Math.round(d.rev/(E||1)*100);return`
                  <div class="bg-blush-50/70 p-2.5 rounded-2xl border border-blush-100 space-y-2">
                    <div class="flex items-center justify-between gap-2.5">
                      <div class="flex items-center gap-2.5 min-w-0">
                        <span class="w-5 h-5 rounded-full ${v} text-[9.5px] font-black flex items-center justify-center shrink-0">
                          #${m+1}
                        </span>
                        <div class="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-blush-100 border border-blush-200 shadow-2xs flex items-center justify-center">
                          ${d.img?`<img src="${d.img}" alt="${d.name}" class="w-full h-full object-cover" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />`:'<span class="text-sm">\u2728</span>'}
                        </div>
                        <div class="min-w-0">
                          <div class="text-[11.5px] font-extrabold text-ink truncate">${d.name}</div>
                          <div class="text-[9.5px] font-semibold text-ink-muted">${d.category} \u2022 ${d.qty} ordered</div>
                        </div>
                      </div>
                      <div class="text-right shrink-0">
                        <div class="text-[11.5px] font-black text-berry">${fmtETB(d.rev)}</div>
                        <div class="text-[9px] font-semibold text-emerald-600">Revenue</div>
                      </div>
                    </div>
                    <!-- Performance Share Progress Bar -->
                    <div class="h-1.5 rounded-full bg-blush-200/70 overflow-hidden">
                      <div class="h-full bg-berry rounded-full" style="width:${h}%"></div>
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
                <p class="text-[10px] text-ink-muted">Actual revenue received across channels (${k[analyticsDateRange]})</p>
              </div>
            </div>
            <span class="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
              ${fmtETB(o)} Received
            </span>
          </div>

          <!-- Total Earned Summary Cards -->
          <div class="grid grid-cols-2 gap-2 text-xs">
            <div class="bg-blush-50/70 p-3 rounded-2xl border border-blush-100 space-y-0.5">
              <div class="text-[10px] font-bold text-ink-muted">Verified Received Cash</div>
              <div class="text-lg font-black text-berry">${fmtETB(o)}</div>
              <div class="text-[9.5px] text-emerald-600 font-semibold">${n.length} paid orders</div>
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
            ${[{name:"Telebirr",amount:y.Telebirr||0,color:"bg-berry",barColor:"bg-berry"},{name:"CBE Bank Transfer",amount:y["CBE Transfer"]||0,color:"bg-amber-500",barColor:"bg-amber-500"},{name:"Cash on Arrival",amount:y["Pay on Delivery"]||0,color:"bg-emerald-500",barColor:"bg-emerald-500"}].map(d=>{const m=a>0?Math.round(d.amount/a*100):0;return`
                <div class="space-y-1 bg-blush-50/40 p-2.5 rounded-xl border border-blush-100/70">
                  <div class="flex items-center justify-between text-xs">
                    <span class="font-bold text-ink flex items-center gap-1.5">
                      <span class="w-2 h-2 rounded-full ${d.color}"></span>
                      ${d.name}
                    </span>
                    <span class="font-extrabold text-ink">${fmtETB(d.amount)} <span class="text-[10px] font-semibold text-ink-muted">(${m}%)</span></span>
                  </div>
                  <div class="h-2 rounded-full bg-blush-100 overflow-hidden">
                    <div class="h-full ${d.barColor} rounded-full transition-all duration-500" style="width: ${m}%"></div>
                  </div>
                </div>
              `}).join("")}
          </div>

          <!-- Final Net Earned Footer -->
          <div class="pt-2 border-t border-blush-100 flex items-center justify-between text-xs">
            <span class="text-[11px] font-bold text-ink">Total Net Earned (${k[analyticsDateRange]})</span>
            <span class="text-base font-black text-berry">${fmtETB(o)}</span>
          </div>
        </div>
      `}const DEFAULT_SHOP_CONFIG={isOpen:!0,deliveryFee:150,bellOn:!0,businessName:"MAK CAKE",businessLogo:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=120&q=80",businessPhone:SHOP_SETTINGS_CONFIG.phoneLocal,businessAddress:"Bole Medhanialem, near Edna Mall, Addis Ababa",businessDesc:"Addis Ababa Premier Halal Luxury Cake Bakery & Dessert Boutique",businessLocation:"Bole Medhanialem, Addis Ababa",deliveryEnabled:!0,pickupEnabled:!0,minOrderAmount:500,deliveryAreas:"Bole, CMC, Kazanchis, Old Airport, Sarbet, Piassa, Summit",deliveryInstructions:"Same-day delivery chilled in insulated carrier boxes with real-time driver tracking.",paymentMethods:{telebirr:{enabled:!0,name:"Telebirr",accountName:SHOP_SETTINGS_CONFIG.telebirrHolder,accountNumber:SHOP_SETTINGS_CONFIG.telebirrDisplay,instructions:"Transfer via Telebirr app and upload screenshot receipt below."},cbe:{enabled:!0,name:"CBE Transfer",accountName:SHOP_SETTINGS_CONFIG.cbeHolder,accountNumber:SHOP_SETTINGS_CONFIG.cbeAccountDisplay,instructions:"Transfer to Commercial Bank of Ethiopia and upload slip screenshot."},cod:{enabled:!0,name:"Pay on Delivery",accountName:"Cash on Arrival",accountNumber:"Bole Courier",instructions:"Pay courier in cash or Telebirr upon receiving your fresh cake."}},orderingEnabled:!0,leadTimeHours:4,customNotesAllowed:!0,orderInstructions:"Order cut-off time is 8:00 PM for same-day delivery.",announcementText:"\u2728 Fresh Daily Chilled Delivery Across Addis Ababa \u2022 100% Halal Bakery \u2728",heroBannerTitle:"Artisanal Luxury Cakes & Sweet Celebrations",heroBannerSubtitle:"Handcrafted fresh daily in Bole with Belgian chocolate & premium local butter.",rewardBox:{enabled:!0,promoCodes:[{id:"p1",code:"MAK10",discount:10,type:"percent",desc:"10% off celebration orders",active:!0,usedCount:14},{id:"p2",code:"BOLELOVE",discount:150,type:"fixed",desc:"150 ETB off delivery or cake",active:!0,usedCount:8},{id:"p3",code:"FREECANDLE",discount:120,type:"fixed",desc:"Free birthday candles set",active:!0,usedCount:22}],rewards:[{id:"r1",name:"10% Discount Voucher",desc:"Valid on orders over 2,000 ETB",active:!0},{id:"r2",name:"Free Birthday Candles Set",desc:"Complimentary gift in cart",active:!0},{id:"r3",name:"VIP Morning Delivery",desc:"Priority guaranteed morning slot",active:!0}]},ads:[{id:1,title:"Fresh Daily Addis Mini Bento Cakes",desc:"Same-day chilled delivery in Bole Medhanialem",img:"https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=600&q=80",link:"Order Bento",active:!0},{id:2,title:"Wedding & Anniversary Custom 3-Tier Luxury",desc:"Book tasting consultation 48 hours in advance",img:"https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=600&q=80",link:"Custom Cakes",active:!0}],managers:[{id:1,name:"Makda Tesfaye (Owner)",phone:"0911 23 45 67",role:"Owner & Head Baker",permissions:"Full Admin Access",active:!0},{id:2,name:"Bole Kitchen Manager",phone:"0922 45 67 89",role:"Kitchen Supervisor",permissions:"Orders & Inventory",active:!0}],passcode:"1234",securityEmail:"owner@makcake.et",lastPasscodeChange:"Nov 24, 2026"};let adminShopSection="all";function ensureShopState(){state.shop?(state.shop={...DEFAULT_SHOP_CONFIG,...state.shop},state.shop.paymentMethods||(state.shop.paymentMethods=JSON.parse(JSON.stringify(DEFAULT_SHOP_CONFIG.paymentMethods))),state.shop.rewardBox||(state.shop.rewardBox=JSON.parse(JSON.stringify(DEFAULT_SHOP_CONFIG.rewardBox))),state.shop.ads||(state.shop.ads=JSON.parse(JSON.stringify(DEFAULT_SHOP_CONFIG.ads))),state.shop.managers||(state.shop.managers=JSON.parse(JSON.stringify(DEFAULT_SHOP_CONFIG.managers)))):state.shop=JSON.parse(JSON.stringify(DEFAULT_SHOP_CONFIG))}function ensurePackagesState(){(!state.basicPackages||!state.basicPackages.length)&&(state.basicPackages=[{id:1,name:'Bento Mini (4")',grams:350,portions:"1-2 people",price:1800,popular:!0},{id:2,name:'Standard Celebration (6")',grams:850,portions:"6-8 people",price:2600,popular:!0},{id:3,name:'Family Grand (8")',grams:1400,portions:"10-12 people",price:3400,popular:!1},{id:4,name:'Luxury 2-Tier Event (10")',grams:2600,portions:"20-25 people",price:6800,popular:!0}])}function renderAdminPackages(){ensurePackagesState();const e=document.getElementById("admin-packages-list");if(!e)return;const t=state.basicPackages;e.innerHTML=t.map((n,o)=>`
        <div class="p-3 rounded-2xl bg-blush-50 border border-blush-200/80 space-y-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-berry text-white text-[10px] font-black flex items-center justify-center">${o+1}</span>
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
      `).join("");const s=document.getElementById("settings-bell-btn");s&&(s.textContent=state.kitchenBell?"Bell ON":"Bell OFF",s.className=state.kitchenBell?"px-3 py-1 rounded-full text-xs font-extrabold btn-berry text-white cursor-pointer":"px-3 py-1 rounded-full text-xs font-extrabold bg-blush-100 text-ink cursor-pointer")}function updatePackageField(e,t,s){ensurePackagesState();const n=state.basicPackages.find(o=>o.id===e);n&&(n[t]=s,saveState())}function addNewPackageTier(){ensurePackagesState();const e=Date.now();state.basicPackages.push({id:e,name:"New Custom Tier ("+(state.basicPackages.length+1)+")",grams:1e3,portions:"8-10 people",price:3e3,popular:!1}),saveState(),renderAdminPackages(),showAdminToast("\u2713 Added new package size tier")}function removePackageTier(e){ensurePackagesState(),state.basicPackages=state.basicPackages.filter(t=>t.id!==e),saveState(),renderAdminPackages(),showAdminToast("Package tier removed")}function saveAdminPackages(){saveState(),syncAll()}function handleBannerUpload(e,t){if(t.files&&t.files[0]){const s=t.files[0],n=new FileReader;n.onload=function(o){updateBannerData(e,"img",o.target.result)},n.readAsDataURL(s)}}function updateBannerData(e,t,s){const n=getAdminBanners();n[e]&&(n[e][t]=s,saveState(),renderAdminHero(),renderAdminShop(),showAdminToast("\u2713 Homepage banner updated live!"))}function removeBanner(e){const t=getAdminBanners();if(t.length<=1){alert("You must keep at least 1 advertisement banner on the homepage slider.");return}t.splice(e,1),saveState(),renderAdminHero(),renderAdminShop(),showAdminToast("Banner removed from slider")}function addEmptyBanner(){const e=getAdminBanners();if(e.length>=3){alert("Maximum of 3 advertisement banners supported on homepage slider.");return}e.push({id:Date.now(),top:"New Promotion",script:"Special",sub:"Celebration bakery cake promotion",cta:"Order Now",link:"products",img:"https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=700&q=85"}),saveState(),renderAdminHero(),renderAdminShop(),showAdminToast("\u2713 Added new advertisement banner slot")}function renderAdvertisementBannersSection(){const e=getAdminBanners();return`
        <div id="shop-sec-ads" class="bg-white rounded-[22px] p-4 shadow-rose border border-white space-y-3">
          <div class="flex items-center justify-between border-b border-blush-100 pb-2">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-lg bg-blush-100 text-berry flex items-center justify-center font-bold text-xs">6</div>
              <div>
                <h3 class="text-xs font-black text-ink">Homepage Advertisement Banners</h3>
                <p class="text-[9.5px] text-ink-muted">Connected to the 3-image slider in middle of Admin Home (3-sec cycle)</p>
              </div>
            </div>
            ${e.length<3?`
              <button type="button" onclick="addEmptyBanner()" class="px-2.5 py-1 rounded-full btn-berry text-white text-[10px] font-bold shadow-rose-sm cursor-pointer">
                + Add Banner
              </button>
            `:`
              <span class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">3/3 Active</span>
            `}
          </div>

          <div class="space-y-3">
            ${e.map((t,s)=>`
              <div class="p-3 rounded-2xl bg-blush-50 border border-blush-200/80 space-y-2.5">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="w-5 h-5 rounded-full bg-berry text-white text-[10px] font-black flex items-center justify-center">${s+1}</span>
                    <span class="text-xs font-black text-ink">Banner Slide ${s+1}</span>
                  </div>
                  <button type="button" onclick="removeBanner(${s})" class="text-[10px] font-bold text-rose-600 hover:text-rose-800 cursor-pointer">
                    &times; Remove
                  </button>
                </div>

                <!-- Live Preview & Upload Row -->
                <div class="flex items-center gap-3">
                  <img src="${t.img}" alt="Banner ${s+1}" class="w-16 h-12 rounded-xl object-cover border border-blush-200 shadow-rose-sm bg-white shrink-0" onerror="this.src=SVG_CAKE_FALLBACK" />
                  <div class="flex-1 min-w-0 space-y-1">
                    <input type="file" id="banner-file-input-${s}" accept="image/*" class="hidden" onchange="handleBannerUpload(${s}, this)" />
                    <button type="button" onclick="document.getElementById('banner-file-input-${s}').click()" class="px-2.5 py-1 rounded-lg bg-white border border-blush-200 hover:bg-blush-100 text-berry font-bold text-[10px] flex items-center gap-1 shadow-2xs cursor-pointer">
                      <span>\u{1F4F8} Upload Image</span>
                    </button>
                    <input type="text" value="${t.img}" placeholder="Or paste image URL..." onchange="updateBannerData(${s}, 'img', this.value)" class="w-full px-2 py-1 rounded-lg bg-white border border-blush-200 text-ink text-[10px] focus:outline-none focus:ring-1 focus:ring-berry" />
                  </div>
                </div>

                <!-- Text & Link Inputs -->
                <div class="grid grid-cols-2 gap-2 text-[10.5px]">
                  <div>
                    <label class="block text-[9.5px] font-bold text-ink-muted mb-0.5">Headline</label>
                    <input type="text" value="${t.top||""}" onchange="updateBannerData(${s}, 'top', this.value)" placeholder="e.g. Fresh Daily Addis" class="w-full px-2 py-1 rounded-lg bg-white border border-blush-200 text-ink font-semibold focus:outline-none focus:ring-1 focus:ring-berry" />
                  </div>
                  <div>
                    <label class="block text-[9.5px] font-bold text-ink-muted mb-0.5">Calligraphy Script</label>
                    <input type="text" value="${t.script||""}" onchange="updateBannerData(${s}, 'script', this.value)" placeholder="e.g. Mini Bento" class="w-full px-2 py-1 rounded-lg bg-white border border-blush-200 text-ink font-semibold focus:outline-none focus:ring-1 focus:ring-berry" />
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-2 text-[10.5px]">
                  <div>
                    <label class="block text-[9.5px] font-bold text-ink-muted mb-0.5">Subtitle</label>
                    <input type="text" value="${t.sub||""}" onchange="updateBannerData(${s}, 'sub', this.value)" placeholder="e.g. Same-day chilled delivery in Bole" class="w-full px-2 py-1 rounded-lg bg-white border border-blush-200 text-ink text-[10px] focus:outline-none focus:ring-1 focus:ring-berry" />
                  </div>
                  <div>
                    <label class="block text-[9.5px] font-bold text-ink-muted mb-0.5">Optional Link / Destination</label>
                    <input type="text" value="${t.link||"products"}" onchange="updateBannerData(${s}, 'link', this.value)" placeholder="e.g. products, or custom URL" class="w-full px-2 py-1 rounded-lg bg-white border border-blush-200 text-berry font-bold text-[10px] focus:outline-none focus:ring-1 focus:ring-berry" />
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `}function toggleAddCustomPaymentForm(e){const t=document.getElementById("sm-add-custom-pay-box");t&&(typeof e=="boolean"?t.classList.toggle("hidden",!e):t.classList.toggle("hidden"))}function addCustomShopPaymentMethod(){collectCurrentShopTabInputs();const e=(document.getElementById("sm-new-pay-name")?.value||"").trim(),t=document.getElementById("sm-new-pay-type")?.value||"Bank Transfer",s=(document.getElementById("sm-new-pay-holder")?.value||"").trim(),n=(document.getElementById("sm-new-pay-num")?.value||"").trim(),o=(document.getElementById("sm-new-pay-inst")?.value||"").trim();if(!e||!n){typeof showAdminToast=="function"&&showAdminToast("Bank/Wallet name and account number are required");return}shopMgmtState.payments.customMethods=Array.isArray(shopMgmtState.payments.customMethods)?shopMgmtState.payments.customMethods:[],shopMgmtState.payments.customMethods.push({id:"pay-custom-"+Date.now(),name:e,type:t,accountHolder:s||"MAK Cake Bakery",accountNumber:n,instructions:o,enabled:!0}),renderAdminShop(),typeof showAdminToast=="function"&&showAdminToast("Added "+e+" \u2014 tap Save to persist")}function removeCustomShopPaymentMethod(e){collectCurrentShopTabInputs(),Array.isArray(shopMgmtState.payments.customMethods)&&(shopMgmtState.payments.customMethods.splice(e,1),renderAdminShop())}function saveBusinessProfile(){ensureShopState();const e=(document.getElementById("shop-prof-name")?.value||"").trim(),t=(document.getElementById("shop-prof-phone")?.value||"").trim(),s=(document.getElementById("shop-prof-loc")?.value||"").trim(),n=(document.getElementById("shop-prof-addr")?.value||"").trim(),o=(document.getElementById("shop-prof-desc")?.value||"").trim();if(!e){showAdminToast("\u26A0\uFE0F Please enter business name");return}state.shop.businessName=e,state.shop.businessPhone=t||state.shop.businessPhone,state.shop.businessLocation=s||state.shop.businessLocation,state.shop.businessAddress=n||state.shop.businessAddress,state.shop.businessDesc=o||state.shop.businessDesc,saveState(),syncAll(),showAdminToast(`Business Profile saved: "${e}" live!`),showCustomerToast(`Bakery info updated: ${e}`)}function toggleDeliverySetting(e){ensureShopState(),state.shop[e]=!state.shop[e],saveState(),syncAll(),showAdminToast(`${e==="deliveryEnabled"?"Delivery":"Pickup"} ${state.shop[e]?"Enabled":"Disabled"}`)}function adjustDeliveryFee(e){ensureShopState(),state.shop.deliveryFee=Math.max(0,(state.shop.deliveryFee||0)+e),saveState(),syncAll(),showAdminToast(`Delivery Fee: ${fmtETB(state.shop.deliveryFee)}`)}function saveDeliverySettings(){ensureShopState();const e=parseInt(document.getElementById("shop-del-fee")?.value||"150",10),t=parseInt(document.getElementById("shop-del-min")?.value||"500",10),s=(document.getElementById("shop-del-areas")?.value||"").trim(),n=(document.getElementById("shop-del-inst")?.value||"").trim();state.shop.deliveryFee=isNaN(e)?150:e,state.shop.minOrderAmount=isNaN(t)?500:t,state.shop.deliveryAreas=s||state.shop.deliveryAreas,state.shop.deliveryInstructions=n||state.shop.deliveryInstructions,saveState(),syncAll(),showAdminToast(`Delivery settings saved (${fmtETB(state.shop.deliveryFee)})`)}function togglePaymentMethod(e){ensureShopState(),state.shop.paymentMethods[e]&&(state.shop.paymentMethods[e].enabled=!state.shop.paymentMethods[e].enabled,saveState(),syncAll(),showAdminToast(`${state.shop.paymentMethods[e].name} ${state.shop.paymentMethods[e].enabled?"Enabled":"Disabled"}`))}function savePaymentMethods(){ensureShopState();const e=document.getElementById("shop-pay-tele-name")?.value.trim(),t=document.getElementById("shop-pay-tele-num")?.value.trim(),s=document.getElementById("shop-pay-tele-inst")?.value.trim(),n=document.getElementById("shop-pay-cbe-name")?.value.trim(),o=document.getElementById("shop-pay-cbe-num")?.value.trim(),a=document.getElementById("shop-pay-cbe-inst")?.value.trim(),r=document.getElementById("shop-pay-cod-inst")?.value.trim();e&&(state.shop.paymentMethods.telebirr.accountName=e),t&&(state.shop.paymentMethods.telebirr.accountNumber=t),s&&(state.shop.paymentMethods.telebirr.instructions=s),n&&(state.shop.paymentMethods.cbe.accountName=n),o&&(state.shop.paymentMethods.cbe.accountNumber=o),a&&(state.shop.paymentMethods.cbe.instructions=a),r&&(state.shop.paymentMethods.cod.instructions=r),saveState(),syncAll(),showAdminToast("Payment methods & account details updated live!")}function toggleShopOpenStatus(){ensureShopState(),state.shop.isOpen=!state.shop.isOpen,saveState(),syncAll(),showAdminToast(state.shop.isOpen?"Bakery is now Open (8 AM \u2013 9 PM)":"Bakery set to Pre-Order Only"),showCustomerToast(state.shop.isOpen?"MAK CAKE is now Open":"Pre-Order Mode active")}function saveOrderPreferences(){ensureShopState();const e=document.getElementById("shop-ord-enabled")?.value==="true",t=parseInt(document.getElementById("shop-ord-lead")?.value||"4",10),s=(document.getElementById("shop-ord-inst")?.value||"").trim();state.shop.orderingEnabled=e,state.shop.leadTimeHours=isNaN(t)?4:t,state.shop.orderInstructions=s||state.shop.orderInstructions,saveState(),syncAll(),showAdminToast("Order preferences saved live!")}function saveWebsiteAppearance(){ensureShopState();const e=(document.getElementById("shop-app-announcement")?.value||"").trim(),t=(document.getElementById("shop-app-title")?.value||"").trim(),s=(document.getElementById("shop-app-sub")?.value||"").trim();e&&(state.shop.announcementText=e),t&&(state.shop.heroBannerTitle=t),s&&(state.shop.heroBannerSubtitle=s),saveState(),syncAll(),showAdminToast("Website appearance updated on customer storefront!"),showCustomerToast("Storefront banner refreshed")}function toggleRewardBoxEnabled(){ensureShopState(),state.shop.rewardBox.enabled=!state.shop.rewardBox.enabled,saveState(),syncAll(),showAdminToast(`Reward Box ${state.shop.rewardBox.enabled?"Enabled":"Disabled"}`)}function addPromoCode(){ensureShopState();const e=(document.getElementById("new-promo-code")?.value||"").trim().toUpperCase(),t=parseInt(document.getElementById("new-promo-disc")?.value||"10",10),s=document.getElementById("new-promo-type")?.value||"percent",n=(document.getElementById("new-promo-desc")?.value||"").trim();if(!e){showAdminToast("\u26A0\uFE0F Please enter promo code name");return}if(isNaN(t)||t<=0){showAdminToast("\u26A0\uFE0F Please enter valid discount amount");return}state.shop.rewardBox.promoCodes.unshift({id:"p-"+Date.now(),code:e,discount:t,type:s,desc:n||(s==="percent"?t+"% off orders":fmtETB(t)+" off orders"),active:!0,usedCount:0}),saveState(),syncAll(),showAdminToast(`Promo Code "${e}" activated!`),showCustomerToast(`New promo code ${e} available!`)}function togglePromoCode(e){ensureShopState();const t=state.shop.rewardBox.promoCodes.find(s=>s.id===e);t&&(t.active=!t.active,saveState(),syncAll(),showAdminToast(`Promo "${t.code}" ${t.active?"Activated":"Disabled"}`))}function deletePromoCode(e){ensureShopState();const t=state.shop.rewardBox.promoCodes.find(s=>s.id===e);t&&confirm(`Remove promo code "${t.code}"?`)&&(state.shop.rewardBox.promoCodes=state.shop.rewardBox.promoCodes.filter(s=>s.id!==e),saveState(),syncAll(),showAdminToast(`Removed promo code "${t.code}"`))}function addHomepageAd(){ensureShopState();const e=(document.getElementById("new-ad-title")?.value||"").trim(),t=(document.getElementById("new-ad-desc")?.value||"").trim(),s=(document.getElementById("new-ad-link")?.value||"").trim(),n=(document.getElementById("new-ad-img")?.value||"").trim()||"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80";if(!e){showAdminToast("\u26A0\uFE0F Please enter advertisement title");return}state.shop.ads.unshift({id:Date.now(),title:e,desc:t||"Same-day luxury cake delivery in Addis Ababa",link:s||"Order Now",img:n,active:!0}),saveState(),syncAll(),showAdminToast(`Published Ad: "${e}" live!`),showCustomerToast(`Featured: ${e}`)}function toggleHomepageAd(e){ensureShopState();const t=state.shop.ads.find(s=>s.id===e);t&&(t.active=!t.active,saveState(),syncAll(),showAdminToast(`Ad "${t.title}" ${t.active?"Activated":"Deactivated"}`))}function deleteHomepageAd(e){ensureShopState();const t=state.shop.ads.find(s=>s.id===e);t&&confirm(`Delete advertisement "${t.title}"?`)&&(state.shop.ads=state.shop.ads.filter(s=>s.id!==e),saveState(),syncAll(),showAdminToast(`Deleted advertisement "${t.title}"`))}function addManagerAccount(){ensureShopState();const e=(document.getElementById("new-mgr-name")?.value||"").trim(),t=(document.getElementById("new-mgr-phone")?.value||"").trim(),s=(document.getElementById("new-mgr-role")?.value||"").trim(),n=document.getElementById("new-mgr-perm")?.value||"Orders & Inventory";if(!e){showAdminToast("\u26A0\uFE0F Please enter manager name");return}state.shop.managers.push({id:Date.now(),name:e,phone:t||"0900 00 00 00",role:s||"Kitchen Staff",permissions:n,active:!0}),saveState(),syncAll(),showAdminToast(`Manager "${e}" authorized (${n})!`)}function toggleManagerAccount(e){ensureShopState();const t=state.shop.managers.find(s=>s.id===e);t&&(t.active=!t.active,saveState(),syncAll(),showAdminToast(`Manager "${t.name}" ${t.active?"Activated":"Deactivated"}`))}function deleteManagerAccount(e){ensureShopState();const t=state.shop.managers.find(s=>s.id===e);t&&confirm(`Remove manager account for "${t.name}"?`)&&(state.shop.managers=state.shop.managers.filter(s=>s.id!==e),saveState(),syncAll(),showAdminToast(`Removed manager "${t.name}"`))}function updateAccountPasscode(){ensureShopState();const e=(document.getElementById("shop-sec-curr-pin")?.value||"").trim(),t=(document.getElementById("shop-sec-new-pin")?.value||"").trim(),s=(document.getElementById("shop-sec-conf-pin")?.value||"").trim();if(e!==state.shop.passcode){showAdminToast("\u26A0\uFE0F Current passcode is incorrect (default: 1234)");return}if(!t||t.length<4){showAdminToast("\u26A0\uFE0F New passcode must be at least 4 digits");return}if(t!==s){showAdminToast("\u26A0\uFE0F New passcodes do not match");return}state.shop.passcode=t,state.shop.lastPasscodeChange="Just now",saveState(),syncAll(),document.getElementById("shop-sec-curr-pin").value="",document.getElementById("shop-sec-new-pin").value="",document.getElementById("shop-sec-conf-pin").value="",showAdminToast("Security passcode updated successfully!")}function adminSecureLogout(){confirm("Log out of MAK CAKE Admin App?")&&(showAdminToast("Admin signed out safely."),switchWorkspaceMode("single-cust"),setTimeout(()=>{switchWorkspaceMode("dual"),switchAdminTab("overview")},1200))}adminShopSection="business";let shopMgmtState={business:{name:"MAK CAKE",logo:"./images/mak-cake-logo.webp",description:"Handcrafted luxury cakes, romantic bento duos, and celebration confections freshly baked in Addis Ababa.",phone:"0911 23 45 67",email:"hello@makcake.et",address:"Cameroon Street, Bole Sub-City, Addis Ababa, Ethiopia",googleMapsUrl:"https://maps.google.com/?q=9.0054,38.7885"},workingHours:{monday:{open:"08:00",close:"20:00",isOpen:!0,breakEnabled:!1,breakStart:"13:00",breakEnd:"14:00"},tuesday:{open:"08:00",close:"20:00",isOpen:!0,breakEnabled:!1,breakStart:"13:00",breakEnd:"14:00"},wednesday:{open:"08:00",close:"20:00",isOpen:!0,breakEnabled:!1,breakStart:"13:00",breakEnd:"14:00"},thursday:{open:"08:00",close:"20:00",isOpen:!0,breakEnabled:!1,breakStart:"13:00",breakEnd:"14:00"},friday:{open:"08:00",close:"20:30",isOpen:!0,breakEnabled:!1,breakStart:"13:00",breakEnd:"14:00"},saturday:{open:"08:00",close:"21:00",isOpen:!0,breakEnabled:!1,breakStart:"13:00",breakEnd:"14:00"},sunday:{open:"09:00",close:"19:00",isOpen:!0,breakEnabled:!1,breakStart:"13:00",breakEnd:"14:00"}},tempClosure:{enabled:!1,reopenAt:"",reason:""},location:{lat:9.0054,lng:38.7885,address:"Cameroon Street, Bole Sub-City, Addis Ababa, Ethiopia",googleMapsUrl:"https://maps.google.com/?q=9.0054,38.7885"},delivery:{deliveryEnabled:!0,deliveryFee:150,deliveryAreas:"Bole, CMC, Kazanchis, Old Airport, Sarbet, Piassa, Summit",minOrderAmount:500,pickupEnabled:!0,deliveryInstructions:"Same-day delivery chilled in insulated carrier boxes with real-time driver tracking."},payments:{cbe:{name:"Commercial Bank of Ethiopia (CBE)",enabled:!0,accountHolder:SHOP_SETTINGS_CONFIG.cbeHolder,accountNumber:SHOP_SETTINGS_CONFIG.cbeAccount,instructions:"Transfer to CBE and upload receipt."},telebirr:{name:"Telebirr",enabled:!0,accountHolder:SHOP_SETTINGS_CONFIG.telebirrHolder,accountNumber:SHOP_SETTINGS_CONFIG.telebirrNumber,instructions:"Transfer via Telebirr app and upload screenshot."},cod:{name:"Pay on Delivery",enabled:!0,accountHolder:"Cash on Arrival",accountNumber:"Bole Courier",instructions:"Pay courier in cash or Telebirr upon delivery."},verification:{requireReceipt:!0,manualApprovalRequired:!0,verificationNote:"Orders are confirmed after receipt verification by our cashier."}}},smPendingLogoData,smLeafletMap=null,smLeafletMarker=null;function computeShopOpenStatus(e=shopMgmtState){const t=new Date;if(e.tempClosure&&e.tempClosure.enabled&&(!e.tempClosure.reopenAt||t<new Date(e.tempClosure.reopenAt)))return{isOpen:!1,label:"Closed (Temp)",detail:e.tempClosure.reopenAt?"Reopens "+new Date(e.tempClosure.reopenAt).toLocaleString([],{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"Temporarily Closed"};const n=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][t.getDay()],o=e.workingHours&&e.workingHours[n];if(!o||!o.isOpen)return{isOpen:!1,label:"Closed Today",detail:"Scheduled day off"};const a=t.getHours()*60+t.getMinutes(),[r,i]=(o.open||"08:00").split(":").map(Number),[l,u]=(o.close||"20:00").split(":").map(Number),p=r*60+i,c=l*60+u;if(a<p||a>=c)return{isOpen:!1,label:"Closed Now",detail:`Hours: ${o.open} - ${o.close}`};if(o.breakEnabled&&o.breakStart&&o.breakEnd){const[b,g]=o.breakStart.split(":").map(Number),[f,x]=o.breakEnd.split(":").map(Number);if(a>=b*60+g&&a<f*60+x)return{isOpen:!1,label:"On Break",detail:`Break until ${o.breakEnd}`}}return{isOpen:!0,label:"Open Now",detail:`Open until ${o.close}`}}function syncShopToCustomerUI(){const e=computeShopOpenStatus(shopMgmtState);if(typeof state<"u"&&state.shop&&(state.shop.isOpen=e.isOpen,state.shop.businessName=shopMgmtState.business.name,state.shop.businessLogo=shopMgmtState.business.logo,state.shop.businessPhone=shopMgmtState.business.phone,state.shop.businessAddress=shopMgmtState.business.address,state.shop.businessDesc=shopMgmtState.business.description,state.shop.deliveryEnabled=shopMgmtState.delivery.deliveryEnabled,state.shop.deliveryFee=Number(shopMgmtState.delivery.deliveryFee)||0,state.shop.deliveryAreas=shopMgmtState.delivery.deliveryAreas,state.shop.minOrderAmount=Number(shopMgmtState.delivery.minOrderAmount)||0,state.shop.pickupEnabled=shopMgmtState.delivery.pickupEnabled,state.shop.deliveryInstructions=shopMgmtState.delivery.deliveryInstructions,state.shop.paymentMethods={telebirr:{enabled:!!shopMgmtState.payments.telebirr?.enabled,name:"Telebirr",accountName:shopMgmtState.payments.telebirr?.accountHolder||"",accountNumber:shopMgmtState.payments.telebirr?.accountNumber||"",instructions:shopMgmtState.payments.telebirr?.instructions||""},cbe:{enabled:!!shopMgmtState.payments.cbe?.enabled,name:"CBE Transfer",accountName:shopMgmtState.payments.cbe?.accountHolder||"",accountNumber:shopMgmtState.payments.cbe?.accountNumber||"",instructions:shopMgmtState.payments.cbe?.instructions||""},cod:{enabled:!!shopMgmtState.payments.cod?.enabled,name:"Pay on Delivery",accountName:shopMgmtState.payments.cod?.accountHolder||"Cash on Arrival",accountNumber:shopMgmtState.payments.cod?.accountNumber||"Bole Courier",instructions:shopMgmtState.payments.cod?.instructions||""}},state.shop.paymentVerification=shopMgmtState.payments.verification,typeof saveState=="function"))try{saveState()}catch{}const t=document.getElementById("sm-live-status-pill");if(t&&(t.textContent=(e.isOpen?"\u25CF ":"\u25CB ")+e.label,t.className=e.isOpen?"px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0":"px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-rose-50 text-berry border border-rose-200 shrink-0"),typeof renderAllCustomerViews=="function")try{renderAllCustomerViews()}catch{}}async function loadShopManagementFromDb(){try{const e=await fetch("/api/shop-management",{cache:"no-store"});if(e.ok){const t=await e.json();if(t.success&&t.shopManagement){shopMgmtState={...shopMgmtState,...t.shopManagement},localStorage.setItem("mak_shop_mgmt_v1",JSON.stringify(shopMgmtState)),syncShopToCustomerUI(),adminTab==="shop"&&renderAdminShop();return}}}catch{}try{const e=localStorage.getItem("mak_shop_mgmt_v1");e&&(shopMgmtState={...shopMgmtState,...JSON.parse(e)})}catch{}syncShopToCustomerUI(),adminTab==="shop"&&renderAdminShop()}function openShopManagementSection(){smPendingLogoData=void 0,switchAdminTab("shop"),loadShopManagementFromDb()}function setAdminShopSection(e){collectCurrentShopTabInputs(),adminShopSection=e,renderAdminShop()}function collectCurrentShopTabInputs(){document.getElementById("sm-biz-name")&&(shopMgmtState.business.name=document.getElementById("sm-biz-name").value.trim()||shopMgmtState.business.name,shopMgmtState.business.description=document.getElementById("sm-biz-desc").value.trim(),shopMgmtState.business.phone=document.getElementById("sm-biz-phone").value.trim(),shopMgmtState.business.email=document.getElementById("sm-biz-email").value.trim(),shopMgmtState.business.address=document.getElementById("sm-biz-address").value.trim(),shopMgmtState.business.googleMapsUrl=document.getElementById("sm-biz-maps").value.trim()),document.getElementById("sm-temp-closure-enabled")&&(shopMgmtState.tempClosure.enabled=document.getElementById("sm-temp-closure-enabled").checked,shopMgmtState.tempClosure.reopenAt=document.getElementById("sm-temp-reopen").value,shopMgmtState.tempClosure.reason=document.getElementById("sm-temp-reason").value.trim(),Object.keys(shopMgmtState.workingHours).forEach(e=>{const t=document.getElementById("sm-wh-open-"+e);t&&(shopMgmtState.workingHours[e]={isOpen:t.checked,open:document.getElementById("sm-wh-start-"+e).value||"08:00",close:document.getElementById("sm-wh-end-"+e).value||"20:00",breakEnabled:document.getElementById("sm-wh-brk-en-"+e).checked,breakStart:document.getElementById("sm-wh-brk-s-"+e).value||"13:00",breakEnd:document.getElementById("sm-wh-brk-e-"+e).value||"14:00"})})),document.getElementById("sm-loc-lat")&&(shopMgmtState.location.lat=parseFloat(document.getElementById("sm-loc-lat").value)||9.0054,shopMgmtState.location.lng=parseFloat(document.getElementById("sm-loc-lng").value)||38.7885,shopMgmtState.location.googleMapsUrl=document.getElementById("sm-loc-maps").value.trim(),shopMgmtState.business.googleMapsUrl=shopMgmtState.location.googleMapsUrl),document.getElementById("sm-del-enabled")&&(shopMgmtState.delivery.deliveryEnabled=document.getElementById("sm-del-enabled").checked,shopMgmtState.delivery.deliveryFee=Math.max(0,Number(document.getElementById("sm-del-fee").value)||0),shopMgmtState.delivery.deliveryAreas=document.getElementById("sm-del-areas").value.trim(),shopMgmtState.delivery.minOrderAmount=Math.max(0,Number(document.getElementById("sm-del-min").value)||0),shopMgmtState.delivery.pickupEnabled=document.getElementById("sm-del-pickup").checked,shopMgmtState.delivery.deliveryInstructions=document.getElementById("sm-del-inst").value.trim()),document.getElementById("sm-pay-cbe-en")&&(shopMgmtState.payments.cbe.enabled=document.getElementById("sm-pay-cbe-en").checked,shopMgmtState.payments.cbe.accountHolder=document.getElementById("sm-pay-cbe-holder").value.trim(),shopMgmtState.payments.cbe.accountNumber=document.getElementById("sm-pay-cbe-num").value.trim(),shopMgmtState.payments.cbe.instructions=document.getElementById("sm-pay-cbe-inst").value.trim(),shopMgmtState.payments.telebirr.enabled=document.getElementById("sm-pay-tb-en").checked,shopMgmtState.payments.telebirr.accountHolder=document.getElementById("sm-pay-tb-holder").value.trim(),shopMgmtState.payments.telebirr.accountNumber=document.getElementById("sm-pay-tb-num").value.trim(),shopMgmtState.payments.telebirr.instructions=document.getElementById("sm-pay-tb-inst").value.trim(),shopMgmtState.payments.cod.enabled=document.getElementById("sm-pay-cod-en").checked,shopMgmtState.payments.cod.instructions=document.getElementById("sm-pay-cod-inst").value.trim(),shopMgmtState.payments.verification={requireReceipt:document.getElementById("sm-pay-ver-receipt").checked,manualApprovalRequired:document.getElementById("sm-pay-ver-manual").checked,verificationNote:document.getElementById("sm-pay-ver-note").value.trim()},Array.isArray(shopMgmtState.payments.customMethods)&&shopMgmtState.payments.customMethods.forEach((e,t)=>{const s=document.getElementById("sm-pay-cust-en-"+t),n=document.getElementById("sm-pay-cust-holder-"+t),o=document.getElementById("sm-pay-cust-num-"+t),a=document.getElementById("sm-pay-cust-inst-"+t);s&&(e.enabled=s.checked),n&&(e.accountHolder=n.value.trim()),o&&(e.accountNumber=o.value.trim()),a&&(e.instructions=a.value.trim())}))}function handleShopLogoUpload(e){const t=e.files&&e.files[0];if(!t||!t.type.startsWith("image/"))return;const s=new FileReader;s.onload=n=>{smPendingLogoData=n.target.result;const o=document.getElementById("sm-biz-logo-preview");o&&(o.src=smPendingLogoData)},s.readAsDataURL(t)}function updateShopLocationPin(e,t,s=!0){const n=Number(e).toFixed(5),o=Number(t).toFixed(5);shopMgmtState.location.lat=Number(n),shopMgmtState.location.lng=Number(o);const a=document.getElementById("sm-loc-lat"),r=document.getElementById("sm-loc-lng"),i=document.getElementById("sm-loc-maps");a&&(a.value=n),r&&(r.value=o),i&&(i.value=`https://maps.google.com/?q=${n},${o}`,shopMgmtState.location.googleMapsUrl=i.value),s&&smLeafletMap&&smLeafletMarker&&(smLeafletMarker.setLatLng([Number(n),Number(o)]),smLeafletMap.setView([Number(n),Number(o)],15))}async function searchShopLocation(){const e=(document.getElementById("sm-loc-search")?.value||"").trim();if(!e)return;try{const o=await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(e+", Ethiopia")}`);if(o.ok){const a=await o.json();if(a&&a[0]){updateShopLocationPin(parseFloat(a[0].lat),parseFloat(a[0].lon),!0),typeof showAdminToast=="function"&&showAdminToast("Pin moved to "+a[0].display_name.split(",")[0]);return}}}catch{}const t={bole:[9.0054,38.7885],cmc:[9.0226,38.8565],kazanchis:[9.0175,38.7652],piassa:[9.0331,38.7501],sarbet:[8.9958,38.7386]},s=e.toLowerCase(),n=Object.keys(t).find(o=>s.includes(o));n?(updateShopLocationPin(t[n][0],t[n][1],!0),typeof showAdminToast=="function"&&showAdminToast("Pin moved to "+n.toUpperCase())):typeof showAdminToast=="function"&&showAdminToast("Location not found \u2014 tap map to set pin")}function initShopLocationMap(){const e=document.getElementById("sm-location-map");if(!e)return;const t=shopMgmtState.location.lat||9.0054,s=shopMgmtState.location.lng||38.7885,n=()=>{typeof L<"u"?(smLeafletMap&&(smLeafletMap.remove(),smLeafletMap=null),smLeafletMap=L.map(e,{zoomControl:!0}).setView([t,s],15),L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap"}).addTo(smLeafletMap),smLeafletMarker=L.marker([t,s],{draggable:!0}).addTo(smLeafletMap),smLeafletMarker.on("dragend",()=>{const o=smLeafletMarker.getLatLng();updateShopLocationPin(o.lat,o.lng,!1)}),smLeafletMap.on("click",o=>{updateShopLocationPin(o.latlng.lat,o.latlng.lng,!0)}),setTimeout(()=>{smLeafletMap&&smLeafletMap.invalidateSize()},200)):e.innerHTML=`<div onclick="updateShopLocationPin(9.0054 + (Math.random()-0.5)*0.01, 38.7885 + (Math.random()-0.5)*0.01, false)" class="w-full h-full bg-blush-50 flex flex-col items-center justify-center text-center p-3 cursor-pointer"><div class="text-berry font-extrabold text-xs">\u{1F4CD} Interactive Pin Pad (Offline Mode)</div><div class="text-[10px] text-ink-muted mt-1">Lat: ${t}, Lng: ${s} \u2022 Tap to adjust coordinates</div></div>`};if(typeof L>"u"){if(!document.getElementById("leaflet-css")){const o=document.createElement("link");o.id="leaflet-css",o.rel="stylesheet",o.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",document.head.appendChild(o)}if(document.getElementById("leaflet-js"))n();else{const o=document.createElement("script");o.id="leaflet-js",o.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",o.onload=n,o.onerror=n,document.head.appendChild(o)}}else n()}function renderAdminShop(){const e=document.getElementById("admin-shop-pills"),t=[{id:"business",label:"1. Business Info"},{id:"hours",label:"2. Working Hours"},{id:"location",label:"3. Shop Location"},{id:"delivery",label:"4. Delivery"},{id:"payments",label:"5. Payments"}];e&&(e.innerHTML=t.map(i=>{const l=adminShopSection===i.id;return`
            <button type="button" onclick="setAdminShopSection('${i.id}')" class="shrink-0 px-3 py-1.5 rounded-full text-[10.5px] font-bold transition-all cursor-pointer ${l?"btn-berry text-white shadow-rose-sm":"bg-white text-ink-muted border border-blush-200 hover:text-ink"}">
              ${i.label}
            </button>
          `}).join(""));const s=document.getElementById("admin-shop-body");if(!s)return;const n=computeShopOpenStatus(shopMgmtState),o=document.getElementById("sm-live-status-pill");o&&(o.textContent=(n.isOpen?"\u25CF ":"\u25CB ")+n.label,o.className=n.isOpen?"px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0":"px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-rose-50 text-berry border border-rose-200 shrink-0");const a=[{key:"monday",label:"Monday"},{key:"tuesday",label:"Tuesday"},{key:"wednesday",label:"Wednesday"},{key:"thursday",label:"Thursday"},{key:"friday",label:"Friday"},{key:"saturday",label:"Saturday"},{key:"sunday",label:"Sunday"}];let r="";if(adminShopSection==="business"){const i=shopMgmtState.business;r=`
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
              ${a.map(l=>{const u=shopMgmtState.workingHours[l.key]||{open:"08:00",close:"20:00",isOpen:!0,breakEnabled:!1,breakStart:"13:00",breakEnd:"14:00"};return`
                  <div class="p-2.5 rounded-2xl border border-blush-100 bg-blush-50/40 space-y-1.5">
                    <div class="flex items-center justify-between gap-2">
                      <label class="flex items-center gap-2 cursor-pointer">
                        <input id="sm-wh-open-${l.key}" type="checkbox" ${u.isOpen?"checked":""} class="w-3.5 h-3.5 accent-berry cursor-pointer" />
                        <span class="text-[11px] font-extrabold text-ink">${l.label}</span>
                      </label>
                      <div class="flex items-center gap-1">
                        <input id="sm-wh-start-${l.key}" type="time" value="${u.open||"08:00"}" class="px-1.5 py-1 rounded-lg bg-white border border-blush-200 text-[10px] font-bold text-ink" />
                        <span class="text-[10px] text-ink-muted">-</span>
                        <input id="sm-wh-end-${l.key}" type="time" value="${u.close||"20:00"}" class="px-1.5 py-1 rounded-lg bg-white border border-blush-200 text-[10px] font-bold text-ink" />
                      </div>
                    </div>
                    <div class="flex items-center justify-between gap-2 pl-5">
                      <label class="flex items-center gap-1.5 text-[9.5px] font-bold text-ink-muted cursor-pointer">
                        <input id="sm-wh-brk-en-${l.key}" type="checkbox" ${u.breakEnabled?"checked":""} class="w-3 h-3 accent-berry" />
                        <span>Break</span>
                      </label>
                      <div class="flex items-center gap-1">
                        <input id="sm-wh-brk-s-${l.key}" type="time" value="${u.breakStart||"13:00"}" class="px-1.5 py-0.5 rounded-lg bg-white border border-blush-100 text-[9.5px] text-ink" />
                        <span class="text-[9.5px] text-ink-muted">-</span>
                        <input id="sm-wh-brk-e-${l.key}" type="time" value="${u.breakEnd||"14:00"}" class="px-1.5 py-0.5 rounded-lg bg-white border border-blush-100 text-[9.5px] text-ink" />
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
          </div>`}else if(adminShopSection==="payments"){const i=shopMgmtState.payments||{},l=i.verification||{},u=Array.isArray(i.customMethods)?i.customMethods:[];r=`
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
          ${u.length?`
            <div class="space-y-2.5">
              <div class="px-1 flex items-center justify-between">
                <span class="text-[10.5px] font-extrabold uppercase tracking-wider text-ink">Additional Banks &amp; Wallets (${u.length})</span>
              </div>
              ${u.map((p,c)=>`
                <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-stone-200/80 space-y-2.5">
                  <div class="flex items-center justify-between pb-2 border-b border-stone-100">
                    <div class="min-w-0">
                      <div class="flex items-center gap-1.5">
                        <h4 class="font-extrabold text-xs text-ink truncate">${p.name}</h4>
                        <span class="px-2 py-0.5 rounded-full bg-blush-100 text-berry text-[9px] font-extrabold shrink-0">${p.type||"Bank"}</span>
                      </div>
                    </div>
                    <div class="flex items-center gap-2 shrink-0">
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input id="sm-pay-cust-en-${c}" type="checkbox" ${p.enabled!==!1?"checked":""} class="sr-only peer" />
                        <div class="w-9 h-5 bg-stone-200 rounded-full peer peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-stone-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-berry"></div>
                      </label>
                      <button type="button" onclick="removeCustomShopPaymentMethod(${c})" class="text-[10px] font-bold text-rose-600 cursor-pointer">&times;</button>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-2">
                    <input id="sm-pay-cust-holder-${c}" type="text" placeholder="Account Holder" value="${p.accountHolder||""}" class="px-2.5 py-1.5 rounded-xl border border-stone-200 bg-stone-50/40 text-[11px] font-semibold text-ink" />
                    <input id="sm-pay-cust-num-${c}" type="text" placeholder="Account Number" value="${p.accountNumber||""}" class="px-2.5 py-1.5 rounded-xl border border-stone-200 bg-stone-50/40 text-[11px] font-mono font-bold text-ink" />
                  </div>
                  <input id="sm-pay-cust-inst-${c}" type="text" placeholder="Instructions..." value="${p.instructions||""}" class="w-full px-2.5 py-1.5 rounded-xl border border-stone-200 bg-stone-50/40 text-[11px] text-ink" />
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
          </div>`}s.innerHTML=r+`
        <button type="button" id="sm-save-btn" onclick="saveShopManagement()" class="w-full py-3 rounded-full btn-berry text-white text-xs font-extrabold shadow-rose-sm active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Save Shop Settings Permanently</span>
        </button>
      `,adminShopSection==="location"&&initShopLocationMap()}async function saveShopManagement(){if(collectCurrentShopTabInputs(),!shopMgmtState.business.name||!shopMgmtState.business.name.trim()){typeof showAdminToast=="function"&&showAdminToast("Shop name is required");return}if(!shopMgmtState.business.phone||!shopMgmtState.business.phone.trim()){typeof showAdminToast=="function"&&showAdminToast("Phone number is required");return}const e=JSON.parse(JSON.stringify(shopMgmtState));smPendingLogoData&&(e.business.logo=smPendingLogoData);const t=document.getElementById("sm-save-btn");await runWithFeedback({lockKey:"save-shop-mgmt",btnEl:t,scope:"admin",loadingMsg:"Saving shop settings...",successMsg:"Changes saved successfully!",action:async()=>{const s=await fetch("/api/shop-management",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),n=await s.json();if(!s.ok||!n.success)throw new Error(n.error||"Failed to save shop settings");return n.settings?.brand?.logo&&(shopMgmtState.business.logo=n.settings.brand.logo,smPendingLogoData=void 0),localStorage.setItem("mak_shop_mgmt_v1",JSON.stringify(shopMgmtState)),syncShopToCustomerUI(),renderAdminShop(),!0}})}let pcActiveTab="sizes",productConfigState={enabled:!0,sectionsEnabled:{sizes:!0,weights:!0,units:!0,rules:!0,options:!0},sizes:[{id:'6" Standard',label:'6" Standard',add:0,serves:"6\u20138 Guests",enabled:!0},{id:'8" Celebration',label:'8" Celebration',add:700,serves:"12\u201315 Guests",enabled:!0},{id:'10" Grand',label:'10" Grand',add:1600,serves:"20\u201324 Guests",enabled:!0},{id:"2-Tier Luxury",label:"2-Tier",add:4200,serves:"35+ Guests",enabled:!0}],weights:[{id:"wt-500g",value:500,unit:"g",add:0,enabled:!0},{id:"wt-1kg",value:1,unit:"kg",add:450,enabled:!0},{id:"wt-1-5kg",value:1.5,unit:"kg",add:900,enabled:!0},{id:"wt-2kg",value:2,unit:"kg",add:1400,enabled:!0}],units:{defaultUnit:"g",allowGrams:!0,allowKilograms:!0,gramsPerKg:1e3},pricingRules:[{id:"rule-1",sizeId:'8" Celebration',weightId:"wt-1-5kg",extraCharge:250,label:"Celebration + 1.5kg Reinforcement",enabled:!0},{id:"rule-2",sizeId:"2-Tier Luxury",weightId:"wt-2kg",extraCharge:500,label:"2-Tier Dowel & Box Support",enabled:!0}],customizations:[{id:"opt-msg",name:"Custom Cake Inscription",charge:0,required:!1,enabled:!0},{id:"opt-eggless",name:"Eggless / Special Dietary Prep",charge:250,required:!1,enabled:!0},{id:"opt-gold",name:"Edible Gold Leaf Accent",charge:450,required:!1,enabled:!0},{id:"opt-express",name:"Express 3-Hour Kitchen Prep",charge:350,required:!1,enabled:!0}]};function convertCakeWeight(e,t,s){const n=Number(e)||0;return t===s?n:t==="kg"&&s==="g"?Math.round(n*1e3):t==="g"&&s==="kg"?Number((n/1e3).toFixed(2)):n}function formatCakeWeight(e){const t=productConfigState.units?.defaultUnit||e.unit;return t==="g"&&productConfigState.units?.allowGrams||t==="kg"&&productConfigState.units?.allowKilograms?convertCakeWeight(e.value,e.unit,t)+t:e.value+e.unit}function syncProductConfigToOrderSystem(){const e=(productConfigState.sizes||[]).filter(t=>t.enabled!==!1);if(e.length>0&&(SIZES=e.map(t=>({id:t.id,label:t.label,add:Number(t.add)||0,serves:t.serves||"6\u20138 Guests"}))),typeof renderOrderSheet=="function"&&document.getElementById("order-sheet")&&!document.getElementById("order-sheet").classList.contains("hidden"))try{renderOrderSheet()}catch{}}async function loadProductConfigFromDb(){try{const e=await fetch("/api/product-config",{cache:"no-store"});if(e.ok){const t=await e.json();if(t.success&&t.productConfig){productConfigState={...productConfigState,...t.productConfig},localStorage.setItem("mak_product_config_v1",JSON.stringify(productConfigState)),syncProductConfigToOrderSystem(),adminTab==="product-config"&&renderProductConfig();return}}}catch{}try{const e=localStorage.getItem("mak_product_config_v1");e&&(productConfigState={...productConfigState,...JSON.parse(e)})}catch{}syncProductConfigToOrderSystem(),adminTab==="product-config"&&renderProductConfig()}function openProductConfigSection(){switchAdminTab("product-config"),loadProductConfigFromDb()}function toggleProductConfigMaster(e){productConfigState.enabled=!!e;const t=document.getElementById("pc-master-label");t&&(t.textContent=productConfigState.enabled?"ON":"OFF",t.className=productConfigState.enabled?"text-[10px] font-extrabold text-berry":"text-[10px] font-extrabold text-ink-muted"),renderProductConfig()}function togglePcSectionEnabled(e,t){productConfigState.sectionsEnabled=productConfigState.sectionsEnabled||{sizes:!0,weights:!0,units:!0,rules:!0,options:!0},productConfigState.sectionsEnabled[e]=!!t,renderProductConfig()}function renderPcOnOffSwitch(e,t){return`
        <label class="inline-flex items-center gap-1.5 cursor-pointer shrink-0">
          <span class="text-[9.5px] font-extrabold ${e?"text-berry":"text-ink-muted"}">${e?"ON":"OFF"}</span>
          <div class="relative inline-flex items-center">
            <input type="checkbox" ${e?"checked":""} onchange="${t}" class="sr-only peer" />
            <div class="w-9 h-5 bg-stone-200 rounded-full peer peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-stone-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-berry"></div>
          </div>
        </label>
      `}function setProductConfigTab(e){pcActiveTab=e,renderProductConfig()}function addPcSize(){const e=productConfigState.sizes.length+1;productConfigState.sizes.push({id:"size-"+Date.now(),label:"Custom Size "+e,add:500,serves:"10\u201312 Guests",enabled:!0}),renderProductConfig()}function updatePcSize(e,t,s){const n=productConfigState.sizes[e];n&&(n[t]=t==="add"?Math.max(0,Number(s)||0):t==="enabled"?!!s:String(s),t==="label"&&!n.id.startsWith('6"')&&!n.id.startsWith('8"')&&!n.id.startsWith('10"')&&!n.id.startsWith("2-Tier")&&(n.id=String(s).trim()||n.id))}function deletePcSize(e){if(productConfigState.sizes.length<=1){typeof showAdminToast=="function"&&showAdminToast("Keep at least one cake size");return}productConfigState.sizes.splice(e,1),renderProductConfig()}function addPcWeight(){productConfigState.weights.push({id:"wt-"+Date.now(),value:750,unit:"g",add:300,enabled:!0}),renderProductConfig()}function updatePcWeight(e,t,s){const n=productConfigState.weights[e];n&&(t==="value"?n.value=Math.max(.05,Number(s)||.5):t==="add"?n.add=Math.max(0,Number(s)||0):t==="unit"?n.unit=s==="kg"?"kg":"g":t==="enabled"&&(n.enabled=!!s))}function deletePcWeight(e){if(productConfigState.weights.length<=1){typeof showAdminToast=="function"&&showAdminToast("Keep at least one cake weight");return}productConfigState.weights.splice(e,1),renderProductConfig()}function addPcRule(){const e=productConfigState.sizes[0]?.id||"",t=productConfigState.weights[0]?.id||"";productConfigState.pricingRules.push({id:"rule-"+Date.now(),sizeId:e,weightId:t,extraCharge:200,label:"Custom Rule",enabled:!0}),renderProductConfig()}function updatePcRule(e,t,s){const n=productConfigState.pricingRules[e];n&&(t==="extraCharge"?n.extraCharge=Math.max(0,Number(s)||0):t==="enabled"?n.enabled=!!s:n[t]=String(s))}function deletePcRule(e){productConfigState.pricingRules.splice(e,1),renderProductConfig()}function addPcCustomization(){productConfigState.customizations.push({id:"opt-"+Date.now(),name:"New Option",charge:150,required:!1,enabled:!0}),renderProductConfig()}function updatePcCustomization(e,t,s){const n=productConfigState.customizations[e];n&&(t==="charge"?n.charge=Math.max(0,Number(s)||0):t==="enabled"||t==="required"?n[t]=!!s:n[t]=String(s))}function deletePcCustomization(e){productConfigState.customizations.splice(e,1),renderProductConfig()}function renderProductConfig(){const e=document.getElementById("pc-subtabs"),t=[{id:"sizes",label:"1. Sizes"},{id:"weights",label:"2. Weights"},{id:"units",label:"3. Units"},{id:"rules",label:"4. Pricing Rules"},{id:"options",label:"5. Customizations"}];e&&(e.innerHTML=t.map(p=>{const c=pcActiveTab===p.id;return`<button type="button" onclick="setProductConfigTab('${p.id}')" class="shrink-0 px-3 py-1.5 rounded-full text-[10.5px] font-bold transition-all cursor-pointer ${c?"btn-berry text-white shadow-rose-sm":"bg-white text-ink-muted border border-blush-200 hover:text-ink"}">${p.label}</button>`}).join(""));const s=document.getElementById("pc-body");if(!s)return;let n="";if(pcActiveTab==="sizes")n=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-2.5">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-extrabold text-ink">1. Cake Sizes</h3>
              <button type="button" onclick="addPcSize()" class="px-2.5 py-1 rounded-full bg-blush-100 text-berry text-[10px] font-extrabold cursor-pointer">+ Add Size</button>
            </div>
            <div class="space-y-2">
              ${productConfigState.sizes.map((p,c)=>`
                <div class="p-2.5 rounded-2xl bg-blush-50/70 border border-blush-200/80 space-y-2">
                  <div class="flex items-center justify-between gap-2">
                    ${renderPcOnOffSwitch(p.enabled!==!1,`updatePcSize(${c}, 'enabled', this.checked); renderProductConfig();`)}

                    <button type="button" onclick="deletePcSize(${c})" class="text-[10px] font-bold text-rose-600 cursor-pointer">&times; Delete</button>
                  </div>
                  <div class="grid grid-cols-3 gap-1.5">
                    <input type="text" value="${p.label}" onchange="updatePcSize(${c}, 'label', this.value)" placeholder="Label" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-bold text-ink" />
                    <input type="text" value="${p.serves}" onchange="updatePcSize(${c}, 'serves', this.value)" placeholder="Servings" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] text-ink" />
                    <input type="number" min="0" value="${p.add}" onchange="updatePcSize(${c}, 'add', this.value)" placeholder="+ETB" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-extrabold text-berry" />
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
              ${productConfigState.weights.map((p,c)=>`
                <div class="p-2.5 rounded-2xl bg-blush-50/70 border border-blush-200/80 space-y-2">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">${renderPcOnOffSwitch(p.enabled!==!1,`updatePcWeight(${c}, 'enabled', this.checked); renderProductConfig();`)}<span class="text-[9.5px] font-bold text-ink-muted">(${convertCakeWeight(p.value,p.unit,p.unit==="g"?"kg":"g")}${p.unit==="g"?"kg":"g"})</span></div>
                    <button type="button" onclick="deletePcWeight(${c})" class="text-[10px] font-bold text-rose-600 cursor-pointer">&times; Delete</button>
                  </div>
                  <div class="grid grid-cols-3 gap-1.5">
                    <input type="number" step="0.1" min="0.1" value="${p.value}" onchange="updatePcWeight(${c}, 'value', this.value); renderProductConfig();" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-bold text-ink" />
                    <select onchange="updatePcWeight(${c}, 'unit', this.value); renderProductConfig();" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-bold text-ink">
                      <option value="g" ${p.unit==="g"?"selected":""}>Grams (g)</option>
                      <option value="kg" ${p.unit==="kg"?"selected":""}>Kilograms (kg)</option>
                    </select>
                    <input type="number" min="0" value="${p.add}" onchange="updatePcWeight(${c}, 'add', this.value)" placeholder="+ETB" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-extrabold text-berry" />
                  </div>
                </div>`).join("")}
            </div>
          </div>`;else if(pcActiveTab==="units"){const p=productConfigState.units||{};n=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-3">
            <h3 class="text-xs font-extrabold text-ink">3. Measurement Units</h3>
            <label class="p-2.5 rounded-2xl bg-blush-50/70 border border-blush-200 flex items-center justify-between cursor-pointer">
              <span class="text-[11px] font-bold text-ink">Enable Grams (g)</span>
              <input type="checkbox" ${p.allowGrams!==!1?"checked":""} onchange="productConfigState.units.allowGrams = this.checked" class="w-4 h-4 accent-berry" />
            </label>
            <label class="p-2.5 rounded-2xl bg-blush-50/70 border border-blush-200 flex items-center justify-between cursor-pointer">
              <span class="text-[11px] font-bold text-ink">Enable Kilograms (kg)</span>
              <input type="checkbox" ${p.allowKilograms!==!1?"checked":""} onchange="productConfigState.units.allowKilograms = this.checked" class="w-4 h-4 accent-berry" />
            </label>
            <div>
              <label class="block text-[10.5px] font-bold text-ink-muted mb-1">Customer Display Unit</label>
              <select onchange="productConfigState.units.defaultUnit = this.value; renderProductConfig();" class="w-full px-3 py-2 rounded-xl bg-blush-50 border border-blush-200 text-xs font-bold text-ink">
                <option value="g" ${p.defaultUnit==="g"?"selected":""}>Grams (g) \u2014 e.g. 500g, 1000g</option>
                <option value="kg" ${p.defaultUnit==="kg"?"selected":""}>Kilograms (kg) \u2014 e.g. 0.5kg, 1kg</option>
              </select>
            </div>
            <div class="p-2.5 rounded-xl bg-blush-50 border border-blush-200 text-[10.5px] text-ink-muted">
              Conversion standard: <strong class="text-ink">1 kg = 1,000 g</strong>. All customer weights automatically convert to <strong class="text-berry">${p.defaultUnit||"g"}</strong>.
            </div>
          </div>`}else pcActiveTab==="rules"?n=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-2.5">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-extrabold text-ink">4. Pricing Rules (Size + Weight)</h3>
              <button type="button" onclick="addPcRule()" class="px-2.5 py-1 rounded-full bg-blush-100 text-berry text-[10px] font-extrabold cursor-pointer">+ Add Rule</button>
            </div>
            <div class="space-y-2">
              ${productConfigState.pricingRules.length?productConfigState.pricingRules.map((p,c)=>`
                <div class="p-2.5 rounded-2xl bg-blush-50/70 border border-blush-200/80 space-y-2">
                  <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-2 flex-1 min-w-0">${renderPcOnOffSwitch(p.enabled!==!1,`updatePcRule(${c}, 'enabled', this.checked); renderProductConfig();`)}<input type="text" value="${p.label||""}" onchange="updatePcRule(${c}, 'label', this.value)" class="text-[11px] font-bold text-ink bg-transparent border-b border-dashed border-blush-300 focus:outline-none min-w-0 flex-1" /></div>
                    <button type="button" onclick="deletePcRule(${c})" class="text-[10px] font-bold text-rose-600 cursor-pointer">&times; Remove</button>
                  </div>
                  <div class="grid grid-cols-3 gap-1.5">
                    <select onchange="updatePcRule(${c}, 'sizeId', this.value)" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[10.5px] font-bold text-ink">
                      ${productConfigState.sizes.map(b=>`<option value="${b.id}" ${p.sizeId===b.id?"selected":""}>${b.label}</option>`).join("")}
                    </select>
                    <select onchange="updatePcRule(${c}, 'weightId', this.value)" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[10.5px] font-bold text-ink">
                      ${productConfigState.weights.map(b=>`<option value="${b.id}" ${p.weightId===b.id?"selected":""}>${b.value}${b.unit}</option>`).join("")}
                    </select>
                    <input type="number" min="0" value="${p.extraCharge}" onchange="updatePcRule(${c}, 'extraCharge', this.value)" placeholder="+ETB" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-extrabold text-berry" />
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
              ${productConfigState.customizations.map((p,c)=>`
                <div class="p-2.5 rounded-2xl bg-blush-50/70 border border-blush-200/80 space-y-2">
                  <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-3">
                      ${renderPcOnOffSwitch(p.enabled!==!1,`updatePcCustomization(${c}, 'enabled', this.checked); renderProductConfig();`)}
                      <label class="flex items-center gap-1 cursor-pointer">
                        <input type="checkbox" ${p.required?"checked":""} onchange="updatePcCustomization(${c}, 'required', this.checked)" class="w-3.5 h-3.5 accent-berry" />
                        <span class="text-[10px] font-bold text-berry">Required</span>
                      </label>
                    </div>
                    <button type="button" onclick="deletePcCustomization(${c})" class="text-[10px] font-bold text-rose-600 cursor-pointer">&times; Remove</button>
                  </div>
                  <div class="grid grid-cols-3 gap-1.5">
                    <input type="text" value="${p.name}" onchange="updatePcCustomization(${c}, 'name', this.value)" class="col-span-2 px-2.5 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-bold text-ink" />
                    <input type="number" min="0" value="${p.charge}" onchange="updatePcCustomization(${c}, 'charge', this.value)" placeholder="+ETB" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-extrabold text-berry" />
                  </div>
                </div>`).join("")}
            </div>
          </div>`);const o=document.getElementById("pc-master-checkbox"),a=document.getElementById("pc-master-label"),r=productConfigState.enabled!==!1;o&&(o.checked=r),a&&(a.textContent=r?"ON":"OFF",a.className=r?"text-[10px] font-extrabold text-berry":"text-[10px] font-extrabold text-ink-muted");const i=productConfigState.sectionsEnabled&&productConfigState.sectionsEnabled[pcActiveTab]!==!1,u=`
        <div class="bg-white rounded-2xl px-3.5 py-2.5 shadow-rose-sm border border-blush-200/70 flex items-center justify-between gap-2">
          <div>
            <div class="text-[11px] font-extrabold text-ink">${{sizes:"Cake Sizes",weights:"Cake Weights",units:"Measurement Units",rules:"Pricing Rules",options:"Customization Options"}[pcActiveTab]||"Section"} Status</div>
            <div class="text-[9.5px] text-ink-muted">${r?i?"Active on customer ordering":"Hidden from customer ordering":"Master Product Config is OFF"}</div>
          </div>
          ${renderPcOnOffSwitch(i,`togglePcSectionEnabled('${pcActiveTab}', this.checked)`)}
        </div>`;s.innerHTML=u+`<div class="${!r||!i?"opacity-55":""}">`+n+`</div>
        <button type="button" id="pc-save-btn" onclick="saveProductConfig()" class="w-full py-3 rounded-full btn-berry text-white text-xs font-extrabold shadow-rose-sm active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Save Product Configuration</span>
        </button>
      `}async function saveProductConfig(){const e=document.getElementById("pc-save-btn");await runWithFeedback({lockKey:"save-product-config",btnEl:e,scope:"admin",loadingMsg:"Saving configuration...",successMsg:"Changes saved successfully!",action:async()=>{const t=await fetch("/api/product-config",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(productConfigState)}),s=await t.json();if(!t.ok||!s.success)throw new Error(s.error||"Could not save configuration");return productConfigState=s.productConfig,localStorage.setItem("mak_product_config_v1",JSON.stringify(productConfigState)),syncProductConfigToOrderSystem(),renderProductConfig(),!0}})}function selectSheetWeight(e){sheet.weightId=sheet.weightId===e?null:e,renderOrderSheet()}function toggleSheetCustomOpt(e){Array.isArray(sheet.customOptions)||(sheet.customOptions=[]);const t=sheet.customOptions.indexOf(e);t>=0?sheet.customOptions.splice(t,1):sheet.customOptions.push(e),renderOrderSheet()}let mktActiveTab="ads",mktAds=[],mktPromos=[],mktRewards={enabled:!0,eligibilityRules:{minOrderAmount:2e3,onePerCustomer:!0},prizes:[]},mktPendingAdImg="",mktEditingAdId=null,mktEditingPromoId=null;async function loadMarketingFromDb(){try{const[e,t,s]=await Promise.all([fetch("/api/advertisements",{cache:"no-store"}),fetch("/api/promo-codes",{cache:"no-store"}),fetch("/api/rewards",{cache:"no-store"})]);if(e.ok){const n=await e.json();n.success&&Array.isArray(n.advertisements)&&(mktAds=n.advertisements,syncAdsToCustomerHomepage())}if(t.ok){const n=await t.json();n.success&&Array.isArray(n.promoCodes)&&(mktPromos=n.promoCodes)}if(s.ok){const n=await s.json();n.success&&n.rewards&&(mktRewards=n.rewards)}}catch{}adminTab==="marketing"&&renderMarketingSection()}function syncAdsToCustomerHomepage(){const e=(mktAds||[]).filter(t=>t.active);if(e.length>0&&typeof HERO_SLIDES<"u"&&Array.isArray(HERO_SLIDES)&&(HERO_SLIDES.length=0,e.forEach(t=>{HERO_SLIDES.push({top:t.badge||"MAK CAKE Special",script:(t.title||"Special").split("\u2022").pop().trim().slice(0,18),sub:t.subtitle||t.desc||"Freshly baked in Addis Ababa",cta:t.buttonText?t.buttonText.replace(/→/g,"").trim():"Order Now",img:t.image||"./images/hero-banner.jpg",link:t.link||"#menu"})}),typeof heroIndex<"u"&&heroIndex>=HERO_SLIDES.length&&(heroIndex=0),typeof renderHero=="function"))try{renderHero()}catch{}}function openMarketingSection(){switchAdminTab("marketing"),loadMarketingFromDb()}function setMarketingTab(e){e==="ads"&&typeof hasPackageFeature=="function"&&!hasPackageFeature("homepage_ads")&&showPackageUpgradePrompt("Homepage Promotional Advertisements","Premium"),e==="rewards"&&typeof hasPackageFeature=="function"&&!hasPackageFeature("mystery_box")&&showPackageUpgradePrompt("Mystery Reward Box","Premium"),mktActiveTab=e,renderMarketingSection()}function handleMktAdImgUpload(e){const t=e.files&&e.files[0];if(!t||!t.type.startsWith("image/"))return;const s=new FileReader;s.onload=n=>{mktPendingAdImg=n.target.result;const o=document.getElementById("mkt-ad-img-url");o&&(o.value="Uploaded image ready")},s.readAsDataURL(t)}async function saveMktAd(){const e=(document.getElementById("mkt-ad-title")?.value||"").trim(),t=(document.getElementById("mkt-ad-desc")?.value||"").trim(),s=(document.getElementById("mkt-ad-link")?.value||"").trim()||"#menu",n=(document.getElementById("mkt-ad-img-url")?.value||"").trim(),o=mktPendingAdImg||(n&&n!=="Uploaded image ready"?n:"./images/hero-banner.jpg");if(!e){typeof showAdminToast=="function"&&showAdminToast("Advertisement title is required");return}const a=mktEditingAdId?`/api/advertisements/${mktEditingAdId}`:"/api/advertisements";(await fetch(a,{method:mktEditingAdId?"PUT":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:e,subtitle:t,link:s,image:o,active:!0})})).ok&&(mktPendingAdImg="",mktEditingAdId=null,await loadMarketingFromDb(),typeof showAdminToast=="function"&&showAdminToast("Submitted successfully!","success"))}function editMktAd(e){const t=mktAds.find(s=>String(s.id)===String(e));t&&(mktEditingAdId=t.id,mktPendingAdImg="",renderMarketingSection(),setTimeout(()=>{document.getElementById("mkt-ad-title")&&(document.getElementById("mkt-ad-title").value=t.title||""),document.getElementById("mkt-ad-desc")&&(document.getElementById("mkt-ad-desc").value=t.subtitle||""),document.getElementById("mkt-ad-link")&&(document.getElementById("mkt-ad-link").value=t.link||""),document.getElementById("mkt-ad-img-url")&&(document.getElementById("mkt-ad-img-url").value=t.image||"")},30))}async function toggleMktAd(e){(await fetch(`/api/advertisements/${e}/toggle`,{method:"PUT"})).ok&&await loadMarketingFromDb()}async function deleteMktAd(e){(await fetch(`/api/advertisements/${e}`,{method:"DELETE"})).ok&&(await loadMarketingFromDb(),typeof showAdminToast=="function"&&showAdminToast("Advertisement deleted"))}async function saveMktPromo(){const e=(document.getElementById("mkt-pr-code")?.value||"").trim().toUpperCase(),t=document.getElementById("mkt-pr-type")?.value||"percent",s=Number(document.getElementById("mkt-pr-val")?.value)||0,n=document.getElementById("mkt-pr-exp")?.value||"2027-12-31",o=Number(document.getElementById("mkt-pr-limit")?.value)||100;if(!e||s<=0){typeof showAdminToast=="function"&&showAdminToast("Enter valid code and discount value");return}const a=mktEditingPromoId?`/api/promo-codes/${mktEditingPromoId}`:"/api/promo-codes",i=await fetch(a,{method:mktEditingPromoId?"PUT":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:e,type:t,discount:s,expiresAt:n,usageLimit:o,active:!0})}),l=await i.json();if(!i.ok||!l.success){typeof showAdminToast=="function"&&showAdminToast(l.error||"Error saving promo");return}mktEditingPromoId=null,await loadMarketingFromDb(),typeof showAdminToast=="function"&&showAdminToast("Submitted successfully!","success")}function editMktPromo(e){const t=mktPromos.find(s=>String(s.id)===String(e));t&&(mktEditingPromoId=t.id,renderMarketingSection(),setTimeout(()=>{document.getElementById("mkt-pr-code")&&(document.getElementById("mkt-pr-code").value=t.code),document.getElementById("mkt-pr-type")&&(document.getElementById("mkt-pr-type").value=t.type),document.getElementById("mkt-pr-val")&&(document.getElementById("mkt-pr-val").value=t.discount),document.getElementById("mkt-pr-exp")&&(document.getElementById("mkt-pr-exp").value=t.expiresAt||"2027-12-31"),document.getElementById("mkt-pr-limit")&&(document.getElementById("mkt-pr-limit").value=t.usageLimit||100)},30))}async function toggleMktPromo(e,t){(await fetch(`/api/promo-codes/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({active:t})})).ok&&await loadMarketingFromDb()}async function deleteMktPromo(e){(await fetch(`/api/promo-codes/${e}`,{method:"DELETE"})).ok&&(await loadMarketingFromDb(),typeof showAdminToast=="function"&&showAdminToast("Promo code deleted"))}async function toggleMktRewardsEnabled(){(await fetch("/api/rewards/toggle",{method:"POST"})).ok&&(await loadMarketingFromDb(),typeof showAdminToast=="function"&&showAdminToast("Mystery Reward Box updated"))}async function saveMktRewardsRules(){const e=Number(document.getElementById("mkt-rew-min")?.value)||0,t=!!document.getElementById("mkt-rew-one")?.checked;(await fetch("/api/rewards/config",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({minOrderAmount:e,onePerCustomer:t})})).ok&&(await loadMarketingFromDb(),typeof showAdminToast=="function"&&showAdminToast("Reward eligibility rules saved"))}async function addMktRewardPrize(){const e=(document.getElementById("mkt-rw-name")?.value||"").trim(),t=document.getElementById("mkt-rw-type")?.value||"discount",s=Number(document.getElementById("mkt-rw-val")?.value)||100,n=Number(document.getElementById("mkt-rw-prob")?.value)||20,o=Number(document.getElementById("mkt-rw-qty")?.value)||50;if(!e){typeof showAdminToast=="function"&&showAdminToast("Enter reward prize name");return}(await fetch("/api/rewards",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,type:t,value:s,probability:n,quantityLimit:o,isAvailable:!0})})).ok&&(await loadMarketingFromDb(),typeof showAdminToast=="function"&&showAdminToast("Submitted successfully!","success"))}async function toggleMktPrizeAvail(e,t){(await fetch(`/api/rewards/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({isAvailable:t})})).ok&&await loadMarketingFromDb()}async function deleteMktPrize(e){(await fetch(`/api/rewards/${e}`,{method:"DELETE"})).ok&&(await loadMarketingFromDb(),typeof showAdminToast=="function"&&showAdminToast("Reward option removed"))}function renderMarketingSection(){const e=document.getElementById("mkt-subtabs"),t=[{id:"ads",label:"1. Homepage Ads"},{id:"promos",label:"2. Promo Codes"},{id:"rewards",label:"3. Mystery Box"}];e&&(e.innerHTML=t.map(n=>{const o=mktActiveTab===n.id;return`<button type="button" onclick="setMarketingTab('${n.id}')" class="shrink-0 px-3 py-1.5 rounded-full text-[10.5px] font-bold transition-all cursor-pointer ${o?"btn-berry text-white shadow-rose-sm":"bg-white text-ink-muted border border-blush-200 hover:text-ink"}">${n.label}</button>`}).join(""));const s=document.getElementById("mkt-body");if(s){if(mktActiveTab==="ads")s.innerHTML=`
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
          </div>`;else if(mktActiveTab==="promos")s.innerHTML=`
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
          </div>`;else if(mktActiveTab==="rewards"){const n=mktRewards.eligibilityRules||{};s.innerHTML=`
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
            ${(mktRewards.prizes||[]).map(o=>`
              <div class="bg-white rounded-2xl p-3 shadow-rose-sm border border-blush-100 flex items-center justify-between gap-2">
                <div class="min-w-0">
                  <div class="text-xs font-extrabold text-ink truncate">${o.name}</div>
                  <div class="text-[9.5px] text-ink-muted">Type: ${o.type} \u2022 Val: ${o.value} \u2022 Prob: ${o.probability}% \u2022 Left: ${o.quantityRemaining}/${o.quantityLimit}</div>
                </div>
                <div class="flex items-center gap-1.5 shrink-0">
                  <button type="button" onclick="toggleMktPrizeAvail('${o.id}', ${!o.isAvailable})" class="px-2 py-0.5 rounded-full text-[9px] font-extrabold cursor-pointer ${o.isAvailable!==!1?"bg-emerald-50 text-emerald-700 border border-emerald-200":"bg-blush-100 text-ink-muted"}">${o.isAvailable!==!1?"On":"Off"}</button>
                  <button type="button" onclick="deleteMktPrize('${o.id}')" class="text-[10px] font-bold text-rose-600 cursor-pointer">&times;</button>
                </div>
              </div>`).join("")}
          </div>`}}}async function applyCheckoutPromoCode(){const e=(document.getElementById("checkout-promo-input")?.value||"").trim().toUpperCase(),t=document.getElementById("checkout-promo-msg");if(!e)return;const s=computeSheetTotal(),n=s.base+s.addSum;try{const o=await fetch("/api/promo-codes/validate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:e,subtotal:n})}),a=await o.json();if(!o.ok||!a.valid){sheet.promoDiscount=0,sheet.promoCode="",t&&(t.textContent=a.error||"Invalid promo code",t.className="text-[10px] font-bold text-rose-600 mt-1"),renderOrderSheet();return}sheet.promoCode=a.promo.code,sheet.promoDiscount=a.discountAmount,renderOrderSheet(),typeof showCustomerToast=="function"&&showCustomerToast(`Promo ${a.promo.code} applied (- ${a.discountAmount} ETB)`)}catch{}}async function claimCheckoutMysteryReward(){if(sheet.mysteryClaimedPrize)return;const e=computeSheetTotal(),t=e.base+e.addSum,s=(sheet.custPhone||"guest-"+Date.now()).trim();try{const n=await fetch("/api/rewards/claim",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({orderAmount:t,claimKey:s})}),o=await n.json();if(!n.ok||!o.success){typeof showCustomerToast=="function"&&showCustomerToast(o.error||"Not eligible yet");return}sheet.mysteryClaimedPrize=o.prize,sheet.mysteryRewardDiscount=o.prize.type==="discount"&&Number(o.prize.value)||0,renderOrderSheet(),typeof showCustomerToast=="function"&&showCustomerToast("\u{1F381} Won: "+o.prize.name)}catch{}}let settingsHubTab="packages";const DEFAULT_CUSTOMER_THEME={primary:"#E11D62",secondary:"#C91254",accent:"#F48FB1",background:"#FDF0F4",text:"#1D1116",button:"#E11D62",navbar:"#FFFFFF",header:"#FDF0F4",footer:"#FFFFFF",productCard:"#FFFFFF",border:"#FAD4E2"};let settingsHubState={activePackageId:"pkg-basic",packages:[{id:"pkg-basic",tier:1,name:"Basic",price:3e3,tagline:"Essential online bakery storefront & ordering",billing:"One-time setup",enabled:!0,features:["Customer Mobile Storefront","Full Online Cake Ordering & Cart","Real-Time Order Tracking & Management","Product Catalog Management","CBE & Telebirr Payment Instructions","Bole Kitchen Live Status"],limits:{maxProducts:30,decorations:0,customThemes:!1,staffLimit:1}},{id:"pkg-advanced",tier:2,name:"Advanced",price:5e3,tagline:"Sales analytics, extra decorations & staff accounts",billing:"One-time setup",enabled:!0,features:["Everything in Basic","Sales & Net Profit Analytics","Extra Decorations (Up to 5 items)","Digital Table / QR Ordering Code","1 Additional Staff / Manager Account","Order Status Push Notifications"],limits:{maxProducts:100,decorations:5,customThemes:!1,staffLimit:2}},{id:"pkg-premium",tier:3,name:"Premium",price:1e4,tagline:"Complete digital bakery suite with unlimited features",billing:"One-time setup",enabled:!0,includesPrefix:"Everything in Advanced, plus:",features:["Unlimited Extra Cake Decorations","Custom Storefront Themes & Colors","Homepage Promotional Ad Banners","Mystery Reward Box Feature","Up to 5 Manager Accounts & Permissions","Priority Phone & Kitchen Support","Printable QR Ordering Stickers"],limits:{maxProducts:9999,decorations:999,customThemes:!0,staffLimit:6}}],notifications:{enabled:!0,volume:80,customSounds:[],events:{newOrder:"chime-classic",paymentSubmitted:"chime-rose",paymentVerified:"chime-crystal",orderStatusUpdated:"chime-double"}},customerTheme:{...DEFAULT_CUSTOMER_THEME},general:{language:"en",dateFormat:"MMM D, YYYY",timeFormat:"12h",region:"Africa/Addis_Ababa"}},staffManagersList=[],activeSessionsList=[];function applyCustomerThemeVariables(e=settingsHubState.customerTheme){const t={...DEFAULT_CUSTOMER_THEME,...e||{}};let s=document.getElementById("customer-theme-style-override");s||(s=document.createElement("style"),s.id="customer-theme-style-override",document.head.appendChild(s)),s.textContent=`
        #panel-customer {
          --cust-primary: ${t.primary};
          --cust-secondary: ${t.secondary};
          --cust-accent: ${t.accent};
          --cust-bg: ${t.background};
          --cust-text: ${t.text};
          --cust-btn: ${t.button};
          --cust-nav: ${t.navbar};
          --cust-header: ${t.header};
          --cust-footer: ${t.footer};
          --cust-card: ${t.productCard};
          --cust-border: ${t.border};
        }
        #panel-customer .app-canvas { background: ${t.background} !important; color: ${t.text} !important; }
        #panel-customer .text-berry { color: ${t.primary} !important; }
        #panel-customer .bg-berry { background-color: ${t.primary} !important; }
        #panel-customer .border-berry { border-color: ${t.primary} !important; }
        #panel-customer .btn-berry { background: linear-gradient(90deg, ${t.button} 0%, ${t.secondary} 100%) !important; }
        #panel-customer .text-ink { color: ${t.text} !important; }
        #panel-customer nav[aria-label="Customer Navigation"] { background-color: ${t.navbar} !important; border-color: ${t.border} !important; }
        #panel-customer #c-tab-home .bg-white, #panel-customer #c-tab-menu .bg-white { background-color: ${t.productCard} !important; border-color: ${t.border} !important; }
      `}function migrateCachedPackages(){try{const e=localStorage.getItem("mak_settings_hub_v1");if(e){const t=JSON.parse(e);t&&t.packages&&t.packages.some(s=>s.id==="pkg-starter"||s.name==="Starter Bakery"||s.id==="pkg-royal")&&(t.packages=settingsHubState.packages,(t.activePackageId==="pkg-starter"||t.activePackageId==="pkg-pro"||t.activePackageId==="pkg-royal"||!t.activePackageId)&&(t.activePackageId="pkg-basic"),localStorage.setItem("mak_settings_hub_v1",JSON.stringify(t))),settingsHubState={...settingsHubState,...t}}}catch{}}async function loadSettingsHubFromDb(){migrateCachedPackages();try{const[e,t,s]=await Promise.all([fetch("/api/admin/settings-hub",{cache:"no-store"}),fetch("/api/managers",{cache:"no-store"}),fetch("/api/admin/security/sessions",{cache:"no-store"})]);if(e.ok){const n=await e.json();if(n.success&&n.settingsHub&&(settingsHubState={...settingsHubState,...n.settingsHub},localStorage.setItem("mak_settings_hub_v1",JSON.stringify(settingsHubState)),applyCustomerThemeVariables(settingsHubState.customerTheme),typeof renderUpgradePlanPage=="function"))try{renderUpgradePlanPage()}catch{}}if(t.ok){const n=await t.json();n.success&&Array.isArray(n.managers)&&(staffManagersList=n.managers)}if(s.ok){const n=await s.json();n.success&&Array.isArray(n.sessions)&&(activeSessionsList=n.sessions)}}catch{}adminTab==="settings"&&renderSettingsHub()}function openSettingsHubSection(){switchAdminTab("settings"),loadSettingsHubFromDb(),checkInitialAdminLockState(),setCustomerLanguage(currentCustomerLang)}function setSettingsHubTab(e){settingsHubTab=e,renderSettingsHub()}async function saveSettingsHubToDb(e="Changes saved successfully!"){await runWithFeedback({lockKey:"save-settings-hub",scope:"admin",loadingMsg:"Saving settings...",successMsg:e||"Changes saved successfully!",action:async()=>{const t=await fetch("/api/admin/settings-hub",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(settingsHubState)}),s=await t.json();if(!t.ok||!s.success)throw new Error(s.error||"Failed to save settings.");return localStorage.setItem("mak_settings_hub_v1",JSON.stringify(settingsHubState)),!0}})}function selectActivePackage(e){const t=settingsHubState.packages.find(s=>s.id===e);if(!t||t.enabled===!1){typeof showAdminToast=="function"&&showAdminToast("Enable package before activating");return}settingsHubState.activePackageId=e,saveSettingsHubToDb(`Active package set to ${t.name}`),renderSettingsHub()}function updateHubPackage(e,t,s){const n=settingsHubState.packages[e];n&&(t==="price"?n.price=Math.max(0,Number(s)||0):t==="enabled"?n.enabled=!!s:n[t]=String(s))}async function addStaffMember(){const e=(document.getElementById("st-new-name")?.value||"").trim(),t=(document.getElementById("st-new-email")?.value||"").trim(),s=(document.getElementById("st-new-phone")?.value||"").trim(),n=document.getElementById("st-new-role")?.value||"Kitchen Staff";if(!e){typeof showAdminToast=="function"&&showAdminToast("Staff name is required");return}(await fetch("/api/managers",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,email:t,phone:s,role:n,permissions:{viewDashboard:!0,viewOrders:!0,manageOrders:n!=="Viewer",manageProducts:n==="Manager"}})})).ok&&(await loadSettingsHubFromDb(),typeof showAdminToast=="function"&&showAdminToast(`Added staff: ${e}`))}async function toggleStaffPermission(e,t,s){(await fetch(`/api/managers/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({permissions:{[t]:!s}})})).ok&&await loadSettingsHubFromDb()}async function removeStaffMember(e){const t=await fetch(`/api/managers/${e}`,{method:"DELETE"}),s=await t.json();if(!t.ok){typeof showAdminToast=="function"&&showAdminToast(s.error||"Cannot remove");return}await loadSettingsHubFromDb(),typeof showAdminToast=="function"&&showAdminToast("Staff account removed")}async function updateAdminSecurityPin(){const e=(document.getElementById("sec-new-pin")?.value||"").trim();if(e.length<4){typeof showAdminToast=="function"&&showAdminToast("Enter at least 4 characters");return}const t=await fetch("/api/admin/security/update-pin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({newPin:e})}),s=await t.json();t.ok&&s.success?(document.getElementById("sec-new-pin").value="",typeof showAdminToast=="function"&&showAdminToast("PIN / Password updated!")):typeof showAdminToast=="function"&&showAdminToast(s.error||"Failed")}async function logoutOtherAdminSessions(){const e=await fetch("/api/admin/security/logout-others",{method:"POST"}),t=await e.json();e.ok&&t.success&&(await loadSettingsHubFromDb(),typeof showAdminToast=="function"&&showAdminToast(t.message||"Other sessions logged out"))}function previewNotificationSound(e){const t=Number(settingsHubState.notifications?.volume??80)/100,s=(settingsHubState.notifications?.customSounds||[]).find(n=>n.id===e||n.url===e);if(s&&s.url){const n=new Audio(s.url);n.volume=t,n.play().catch(()=>{});return}try{const n=new(window.AudioContext||window.webkitAudioContext),o=n.createOscillator(),a=n.createGain(),r={"chime-classic":660,"chime-rose":784,"chime-crystal":987,"chime-double":587};o.type="sine",o.frequency.value=r[e]||660,a.gain.setValueAtTime(Math.max(.05,t*.25),n.currentTime),a.gain.exponentialRampToValueAtTime(.001,n.currentTime+.35),o.connect(a),a.connect(n.destination),o.start(),o.stop(n.currentTime+.36)}catch{}}async function uploadCustomChimeFile(e){const t=e.files&&e.files[0];if(!t)return;const s=new FileReader;s.onload=async n=>{const o=await fetch("/api/admin/chime-upload",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t.name.replace(/.[^.]+$/,""),dataUrl:n.target.result})}),a=await o.json();o.ok&&a.success?(await loadSettingsHubFromDb(),typeof showAdminToast=="function"&&showAdminToast("Custom sound uploaded!")):typeof showAdminToast=="function"&&showAdminToast(a.error||"Upload failed")},s.readAsDataURL(t)}function updateCustomerThemeColor(e,t){if(!/^#[0-9A-Fa-f]{6}$/.test(t))return;settingsHubState.customerTheme[e]=t;const s=document.getElementById("th-pick-"+e),n=document.getElementById("th-hex-"+e);s&&s.value.toLowerCase()!==t.toLowerCase()&&(s.value=t),n&&n.value.toLowerCase()!==t.toLowerCase()&&(n.value=t),applyCustomerThemeVariables(settingsHubState.customerTheme)}function restoreDefaultCustomerTheme(){settingsHubState.customerTheme={...DEFAULT_CUSTOMER_THEME},applyCustomerThemeVariables(settingsHubState.customerTheme),renderSettingsHub(),saveSettingsHubToDb("Restored default customer theme")}function renderSettingsHub(){const e=document.getElementById("settings-hub-pills"),t=[{id:"packages",label:"1. Packages"},{id:"staff",label:"2. Staff"},{id:"security",label:"3. Security"},{id:"sounds",label:"4. Sounds"},{id:"theme",label:"5. Theme"},{id:"general",label:"6. General"}];e&&(e.innerHTML=t.map(o=>{const a=settingsHubTab===o.id;return`<button type="button" onclick="setSettingsHubTab('${o.id}')" class="shrink-0 px-3 py-1.5 rounded-full text-[10.5px] font-bold transition-all cursor-pointer ${a?"btn-berry text-white shadow-rose-sm":"bg-white text-ink-muted border border-blush-200 hover:text-ink"}">${o.label}</button>`}).join(""));const s=document.getElementById("settings-legacy-packages-wrap");s&&s.classList.toggle("hidden",settingsHubTab!=="packages");const n=document.getElementById("settings-hub-body");if(n){if(settingsHubTab==="packages"){const o=settingsHubState.packages.find(a=>a.id===settingsHubState.activePackageId)||settingsHubState.packages[0];n.innerHTML=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-2.5">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-[10px] font-bold text-ink-muted uppercase">Current Shop Package</div>
                <div class="text-xs font-black text-berry">${o?o.name:"Signature Growth"}</div>
              </div>
              <span class="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9.5px] font-extrabold">Active Plan</span>
            </div>
            <div class="space-y-2">
              ${settingsHubState.packages.map((a,r)=>{const i=settingsHubState.activePackageId===a.id;return`
                  <div class="p-3 rounded-2xl border ${i?"bg-blush-50 border-berry/50":"bg-blush-50/40 border-blush-100"} space-y-2">
                    <div class="flex items-center justify-between gap-2">
                      <input type="text" value="${a.name}" onchange="updateHubPackage(${r}, 'name', this.value)" class="text-xs font-extrabold text-ink bg-transparent border-b border-dashed border-blush-300 focus:outline-none" />
                      <div class="flex items-center gap-2">
                        <label class="flex items-center gap-1 text-[9.5px] font-bold text-ink-muted cursor-pointer">
                          <input type="checkbox" ${a.enabled!==!1?"checked":""} onchange="updateHubPackage(${r}, 'enabled', this.checked)" class="w-3.5 h-3.5 accent-berry" /> On
                        </label>
                        <button type="button" onclick="selectActivePackage('${a.id}')" class="px-2 py-0.5 rounded-full text-[9.5px] font-extrabold cursor-pointer ${i?"btn-berry text-white":"bg-white border border-blush-200 text-berry"}">${i?"Current":"Activate"}</button>
                      </div>
                    </div>
                    <div class="flex items-center justify-between gap-2">
                      <div class="text-[9.5px] text-ink-muted truncate">${(a.features||[]).join(" \u2022 ")}</div>
                      <input type="number" value="${a.price}" onchange="updateHubPackage(${r}, 'price', this.value)" class="w-20 px-2 py-1 rounded-lg bg-white border border-blush-200 text-[11px] font-extrabold text-berry text-right shrink-0" />
                    </div>
                  </div>`}).join("")}
            </div>
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
            ${staffManagersList.map(o=>`
              <div class="bg-white rounded-2xl p-3 shadow-rose-sm border border-blush-100 space-y-1.5">
                <div class="flex items-center justify-between">
                  <div class="min-w-0">
                    <div class="text-xs font-extrabold text-ink truncate">${o.name}</div>
                    <div class="text-[9.5px] text-berry font-bold">${o.role} \u2022 Active: ${o.lastActive||"Recently"}</div>
                  </div>
                  ${o.role!=="Owner"?`<button type="button" onclick="removeStaffMember('${o.id}')" class="text-[10px] font-bold text-rose-600 cursor-pointer">Remove</button>`:'<span class="px-2 py-0.5 rounded-full bg-blush-100 text-berry text-[9px] font-extrabold">Owner</span>'}
                </div>
                ${o.role!=="Owner"?`
                  <div class="flex flex-wrap gap-1.5 pt-1">
                    ${["manageOrders","manageProducts","viewEarnings","manageSettings"].map(a=>`
                      <button type="button" onclick="toggleStaffPermission('${o.id}', '${a}', ${!!o.permissions?.[a]})" class="px-2 py-0.5 rounded-full text-[9px] font-bold cursor-pointer ${o.permissions?.[a]?"bg-emerald-50 text-emerald-700 border border-emerald-200":"bg-blush-50 text-ink-muted border border-blush-100"}">${a.replace("manage","").replace("view","")}: ${o.permissions?.[a]?"Yes":"No"}</button>
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
              ${activeSessionsList.map(o=>`
                <div class="p-2.5 rounded-xl bg-blush-50/70 border border-blush-100 flex items-center justify-between text-[10.5px]">
                  <div>
                    <div class="font-bold text-ink">${o.email} (${o.provider})</div>
                    <div class="text-[9.5px] text-ink-muted">ID: ${o.id}</div>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-extrabold ${o.current?"bg-emerald-50 text-emerald-700":"bg-white text-ink-muted"}">${o.current?"Current":"Active"}</span>
                </div>`).join("")}
            </div>
          </div>`;else if(settingsHubTab==="sounds"){const o=settingsHubState.notifications||{},a=o.events||{},r=[{id:"chime-classic",name:"Classic Bakery Bell"},{id:"chime-rose",name:"Soft Rose Chime"},{id:"chime-crystal",name:"Crystal Ding"},{id:"chime-double",name:"Double Kitchen Chime"},...(o.customSounds||[]).map(l=>({id:l.id,name:"\u{1F3B5} "+l.name}))],i=[{key:"newOrder",label:"New Orders"},{key:"paymentSubmitted",label:"Payment Submitted"},{key:"paymentVerified",label:"Payment Verified"},{key:"orderStatusUpdated",label:"Order Status Updated"}];n.innerHTML=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-extrabold text-ink">Notifications &amp; Custom Chime</h3>
              <label class="flex items-center gap-1.5 text-[10.5px] font-bold cursor-pointer">
                <input type="checkbox" ${o.enabled!==!1?"checked":""} onchange="settingsHubState.notifications.enabled = this.checked" class="w-4 h-4 accent-berry" /> Enabled
              </label>
            </div>
            <div>
              <div class="flex justify-between text-[10.5px] font-bold text-ink-muted mb-1"><span>Volume</span><span>${o.volume??80}%</span></div>
              <input type="range" min="0" max="100" value="${o.volume??80}" oninput="settingsHubState.notifications.volume = Number(this.value)" class="w-full accent-berry" />
            </div>
            <div class="space-y-2">
              ${i.map(l=>`
                <div class="flex items-center justify-between gap-2">
                  <span class="text-[11px] font-bold text-ink">${l.label}</span>
                  <div class="flex items-center gap-1">
                    <select onchange="settingsHubState.notifications.events['${l.key}'] = this.value" class="px-2 py-1 rounded-xl bg-blush-50 border border-blush-200 text-[10.5px] font-bold text-ink">
                      ${r.map(u=>`<option value="${u.id}" ${a[l.key]===u.id?"selected":""}>${u.name}</option>`).join("")}
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
          </div>`}else if(settingsHubTab==="theme"){const o=settingsHubState.customerTheme||DEFAULT_CUSTOMER_THEME,a=[{key:"primary",label:"Primary"},{key:"secondary",label:"Secondary"},{key:"accent",label:"Accent"},{key:"background",label:"Background"},{key:"text",label:"Text"},{key:"button",label:"Button"},{key:"navbar",label:"Nav Bar"},{key:"header",label:"Header"},{key:"footer",label:"Footer"},{key:"productCard",label:"Product Card"},{key:"border",label:"Border"}];n.innerHTML=`
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
                    <input id="th-pick-${r.key}" type="color" value="${o[r.key]||"#E11D62"}" oninput="updateCustomerThemeColor('${r.key}', this.value)" class="w-7 h-7 rounded-lg border border-blush-200 cursor-pointer bg-white" />
                    <input id="th-hex-${r.key}" type="text" value="${o[r.key]||"#E11D62"}" onchange="updateCustomerThemeColor('${r.key}', this.value)" class="w-20 px-2 py-1 rounded-lg bg-white border border-blush-200 text-[10.5px] font-mono font-bold text-ink uppercase" />
                  </div>
                </div>`).join("")}
            </div>
            <button type="button" onclick="saveSettingsHubToDb('Customer theme saved permanently!')" class="w-full py-2.5 rounded-full btn-berry text-white text-xs font-extrabold cursor-pointer">Save Customer Theme</button>
          </div>`}else if(settingsHubTab==="general"){const o=settingsHubState.general||{};n.innerHTML=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-2.5">
            <h3 class="text-xs font-extrabold text-ink">General Preferences</h3>
            <div>
              <label class="block text-[10.5px] font-bold text-ink-muted mb-1">Language</label>
              <select onchange="settingsHubState.general.language = this.value" class="w-full px-3 py-2 rounded-xl bg-blush-50 border border-blush-200 text-xs font-bold text-ink">
                <option value="en" ${o.language==="en"?"selected":""}>English</option>
                <option value="am" ${o.language==="am"?"selected":""}>Amharic (\u12A0\u121B\u122D\u129B)</option>
                <option value="om" ${o.language==="om"?"selected":""}>Afaan Oromoo</option>
              </select>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-[10.5px] font-bold text-ink-muted mb-1">Date Format</label>
                <select onchange="settingsHubState.general.dateFormat = this.value" class="w-full px-2.5 py-2 rounded-xl bg-blush-50 border border-blush-200 text-xs font-bold text-ink">
                  <option value="MMM D, YYYY" ${o.dateFormat==="MMM D, YYYY"?"selected":""}>Nov 25, 2026</option>
                  <option value="DD/MM/YYYY" ${o.dateFormat==="DD/MM/YYYY"?"selected":""}>25/11/2026</option>
                  <option value="YYYY-MM-DD" ${o.dateFormat==="YYYY-MM-DD"?"selected":""}>2026-11-25</option>
                </select>
              </div>
              <div>
                <label class="block text-[10.5px] font-bold text-ink-muted mb-1">Time Format</label>
                <select onchange="settingsHubState.general.timeFormat = this.value" class="w-full px-2.5 py-2 rounded-xl bg-blush-50 border border-blush-200 text-xs font-bold text-ink">
                  <option value="12h" ${o.timeFormat==="12h"?"selected":""}>12-Hour (AM/PM)</option>
                  <option value="24h" ${o.timeFormat==="24h"?"selected":""}>24-Hour</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-[10.5px] font-bold text-ink-muted mb-1">Region &amp; Timezone</label>
              <select onchange="settingsHubState.general.region = this.value" class="w-full px-3 py-2 rounded-xl bg-blush-50 border border-blush-200 text-xs font-bold text-ink">
                <option value="Africa/Addis_Ababa" ${o.region==="Africa/Addis_Ababa"?"selected":""}>Addis Ababa, Ethiopia (EAT \u2022 ETB)</option>
                <option value="UTC" ${o.region==="UTC"?"selected":""}>UTC</option>
              </select>
            </div>
            <button type="button" onclick="saveSettingsHubToDb('General preferences saved!')" class="w-full py-2.5 rounded-full btn-berry text-white text-xs font-extrabold cursor-pointer">Save General Preferences</button>
          </div>`}}}let upgradeTargetPkgId=null,upgradeReceiptDataUrl="",upgradeReceiptFileName="";function getPackageTier(e){return e==="pkg-premium"||e==="pkg-royal"?3:e==="pkg-advanced"||e==="pkg-pro"?2:1}function getCurrentPackageObj(){const e=settingsHubState.packages||[],t=settingsHubState.activePackageId||"pkg-basic";return e.find(s=>s.id===t)||e[0]||{id:"pkg-basic",tier:1,name:"Basic",price:3e3,limits:{}}}function getUpgradeDifference(e,t){return Math.max(0,Number(t?.price||0)-Number(e?.price||0))}function hasPackageFeature(e){const t=getCurrentPackageObj(),s=t.tier||getPackageTier(t.id),n=["website","ordering","orders","dashboard","products","payments","businessInfo"],o=["analytics","decorations_5","qr_code","staff_1"],a=["decorations_unlimited","google_business","custom_theme","mystery_box","seo","homepage_ads","staff_5","advanced_permissions","qr_stickers"];return n.includes(e)?!0:o.includes(e)?s>=2:a.includes(e)?s>=3:!0}function showPackageUpgradePrompt(e,t="Higher"){showAdminToast(`${e} requires the ${t} package. Tap Upgrade Plan to unlock.`,"error")}function openUpgradePlanPage(){switchAdminTab("upgrade-plan"),loadSettingsHubFromDb().then(()=>renderUpgradePlanPage()),renderUpgradePlanPage()}function selectUpgradePayMethod(e){const t=document.getElementById("upg-pay-method");t&&(t.value=e);const s=document.getElementById("upg-method-cbe"),n=document.getElementById("upg-method-tb");s&&(s.className=e==="CBE"?"p-2.5 rounded-2xl border-2 border-berry bg-blush-50 text-left flex items-center gap-2 transition-all cursor-pointer":"p-2.5 rounded-2xl border border-blush-200 bg-white text-left flex items-center gap-2 transition-all cursor-pointer"),n&&(n.className=e==="Telebirr"?"p-2.5 rounded-2xl border-2 border-berry bg-blush-50 text-left flex items-center gap-2 transition-all cursor-pointer":"p-2.5 rounded-2xl border border-blush-200 bg-white text-left flex items-center gap-2 transition-all cursor-pointer")}function clearUpgradeReceiptPreview(){upgradeReceiptDataUrl="",upgradeReceiptFileName="";const e=document.getElementById("upg-pay-receipt");e&&(e.value="");const t=document.getElementById("upg-receipt-label");t&&(t.textContent="Tap to upload receipt (PNG, JPG, PDF)"),document.getElementById("upg-receipt-dropzone")?.classList.remove("hidden");const s=document.getElementById("upg-receipt-preview-box");s&&s.classList.add("hidden");const n=document.getElementById("upg-receipt-preview-img");n&&(n.src="")}function handleUpgradeReceiptUpload(e){const t=e.files&&e.files[0];if(!t)return;upgradeReceiptFileName=t.name;const s=document.getElementById("upg-receipt-label");s&&(s.textContent="\u2713 "+t.name);const n=t.type==="application/pdf"||/\.pdf$/i.test(t.name),o=new FileReader;o.onload=a=>{upgradeReceiptDataUrl=a.target.result;const r=document.getElementById("upg-receipt-dropzone"),i=document.getElementById("upg-receipt-preview-box"),l=document.getElementById("upg-receipt-img-wrap"),u=document.getElementById("upg-receipt-pdf-wrap"),p=document.getElementById("upg-receipt-preview-img"),c=document.getElementById("upg-receipt-preview-name");c&&(c.textContent=t.name),n?(l?.classList.add("hidden"),u?.classList.remove("hidden"),u?.classList.add("flex")):(p&&(p.src=upgradeReceiptDataUrl),l?.classList.remove("hidden"),u?.classList.add("hidden"),u?.classList.remove("flex")),r?.classList.add("hidden"),i?.classList.remove("hidden")},o.readAsDataURL(t)}function copyUpgradeAccountNumber(e,t){const s=()=>{if(e){const n=e.dataset.origHtml||e.innerHTML;e.dataset.origHtml=n,e.className="px-2.5 py-1.5 rounded-xl bg-emerald-500 border border-emerald-500 text-white text-[10px] font-extrabold flex items-center gap-1 transition-all shrink-0 shadow-xs",e.innerHTML='<svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg><span>Copied!</span>',clearTimeout(e._copyT),e._copyT=setTimeout(()=>{e.className="px-2.5 py-1.5 rounded-xl bg-blush-50 hover:bg-blush-100 border border-blush-200 text-berry text-[10px] font-extrabold flex items-center gap-1 transition-all cursor-pointer shrink-0",e.innerHTML=n},2200)}typeof showAdminToast=="function"&&showAdminToast("Copied "+t+"!","success")};navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(String(t)).then(s).catch(()=>{fallbackCopyText(String(t)),s()}):(fallbackCopyText(String(t)),s())}function fallbackCopyText(e){try{const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)}catch{}}function openUpgradeConfirmModal(e){const t=getCurrentPackageObj(),s=(settingsHubState.packages||[]).find(r=>r.id===e);if(!s)return;upgradeTargetPkgId=s.id,upgradeReceiptDataUrl="",upgradeReceiptFileName="";const n=getUpgradeDifference(t,s);document.getElementById("upg-modal-form-view")?.classList.remove("hidden"),document.getElementById("upg-modal-thankyou-view")?.classList.add("hidden"),document.getElementById("upg-modal-congrats-view")?.classList.add("hidden");const o=document.getElementById("upg-modal-pkg-sub");o&&(o.textContent=`${t.name} \u2192 ${s.name} Upgrade`),document.getElementById("upg-calc-current")&&(document.getElementById("upg-calc-current").textContent=`${t.name} (${Number(t.price).toLocaleString()} ETB)`),document.getElementById("upg-calc-target")&&(document.getElementById("upg-calc-target").textContent=`${s.name} (${Number(s.price).toLocaleString()} ETB)`),document.getElementById("upg-calc-diff")&&(document.getElementById("upg-calc-diff").textContent=`${n.toLocaleString()} ETB`),clearUpgradeReceiptPreview();const a=document.getElementById("upg-modal-accounts");if(a){const r=settingsHubState.payments||shopMgmtState?.payments||{},i=r.cbe?.accountNumber||SHOP_SETTINGS_CONFIG.cbeAccount,l=r.telebirr?.accountNumber||SHOP_SETTINGS_CONFIG.telebirrNumber;a.innerHTML=`
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
              <div class="text-xs font-mono font-extrabold text-ink select-all">${l}</div>
            </div>
            <button type="button" onclick="copyUpgradeAccountNumber(this, '${l}')" class="px-2.5 py-1.5 rounded-xl bg-blush-50 hover:bg-blush-100 border border-blush-200 text-berry text-[10px] font-extrabold flex items-center gap-1 transition-all cursor-pointer shrink-0">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              <span>Copy</span>
            </button>
          </div>
        `}selectUpgradePayMethod("CBE"),document.getElementById("upg-modal-backdrop")?.classList.remove("hidden"),document.getElementById("upg-confirm-modal")?.classList.remove("hidden")}function closeUpgradeConfirmModal(){document.getElementById("upg-modal-backdrop")?.classList.add("hidden"),document.getElementById("upg-confirm-modal")?.classList.add("hidden")}async function submitPackageUpgradeRequest(){const e=document.getElementById("upg-pay-method")?.value||"CBE",t=document.getElementById("upg-submit-btn");if(!upgradeReceiptDataUrl){showAdminToast("Please upload your payment receipt (image or PDF).","error");return}await runWithFeedback({lockKey:"submit-upgrade-request",btnEl:t,scope:"admin",loadingMsg:"Submitting payment receipt...",successMsg:"Submitted successfully!",action:async()=>{const s=await fetch("/api/admin/upgrade-request",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({targetPackageId:upgradeTargetPkgId,paymentMethod:e,receiptImg:upgradeReceiptDataUrl,receiptName:upgradeReceiptFileName})}),n=await s.json();if(!s.ok||!n.success)throw new Error(n.error||"Could not submit upgrade request.");return settingsHubState.pendingUpgradeRequest=n.pendingUpgradeRequest,document.getElementById("upg-modal-form-view")?.classList.add("hidden"),document.getElementById("upg-modal-congrats-view")?.classList.add("hidden"),document.getElementById("upg-modal-thankyou-view")?.classList.remove("hidden"),document.getElementById("upg-ty-pkg")&&(document.getElementById("upg-ty-pkg").textContent=n.pendingUpgradeRequest.targetPackageName),document.getElementById("upg-ty-amt")&&(document.getElementById("upg-ty-amt").textContent=Number(n.pendingUpgradeRequest.amount).toLocaleString()+" ETB"),renderUpgradePlanPage(),!0}})}async function verifyPendingUpgradePayment(e="approve"){await runWithFeedback({lockKey:"verify-upgrade-payment",scope:"admin",loadingMsg:e==="approve"?"Approving payment & activating plan...":"Updating status...",successMsg:e==="approve"?"Changes saved successfully!":"Upgrade request marked Rejected.",action:async()=>{const t=await fetch("/api/admin/upgrade-verify",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:e})}),s=await t.json();if(!t.ok||!s.success)throw new Error(s.error||"Verification failed.");return await loadSettingsHubFromDb(),renderUpgradePlanPage(),s.status==="Approved"&&(document.getElementById("upg-modal-form-view")?.classList.add("hidden"),document.getElementById("upg-modal-thankyou-view")?.classList.add("hidden"),document.getElementById("upg-modal-congrats-view")?.classList.remove("hidden"),document.getElementById("upg-congrats-pkg-line")&&(document.getElementById("upg-congrats-pkg-line").textContent=`Active Plan: ${s.targetPackageName||getCurrentPackageObj().name}`),document.getElementById("upg-modal-backdrop")?.classList.remove("hidden"),document.getElementById("upg-confirm-modal")?.classList.remove("hidden")),!0}})}async function cancelPendingUpgradePayment(){await fetch("/api/admin/upgrade-cancel",{method:"POST"}),settingsHubState.pendingUpgradeRequest=null,renderUpgradePlanPage(),showAdminToast("Upgrade request cleared")}function renderUpgradePlanPage(){const e=getCurrentPackageObj(),t=e.tier||getPackageTier(e.id),s=document.getElementById("upg-current-badge");s&&(s.textContent="Current: "+e.name);const n=document.getElementById("drawer-current-plan-sub");n&&(n.textContent="Current: "+e.name);const o=document.getElementById("upg-cards-container");if(!o)return;const a=settingsHubState.pendingUpgradeRequest;let r="";a&&(a.status==="Under Review"||a.status==="Pending Verification"?r=`
            <div class="bg-amber-50 border border-amber-200 rounded-[22px] p-3.5 space-y-2">
              <div class="flex items-center justify-between gap-2">
                <div class="text-xs font-extrabold text-amber-900">Upgrade Request: ${a.targetPackageName}</div>
                <span class="px-2.5 py-0.5 rounded-full bg-amber-200/80 text-amber-900 text-[9px] font-extrabold">Under Review</span>
              </div>
              <p class="text-[10.5px] text-amber-800">
                Submitted <strong>${Number(a.amount).toLocaleString()} ETB</strong> via ${a.paymentMethod}. Your current <strong>${e.name}</strong> plan stays active while under review.
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
            </div>`));const l=(settingsHubState.packages||[]).map(u=>{const p=u.tier||getPackageTier(u.id),c=u.id===e.id,b=p<t,g=p>t,f=getUpgradeDifference(e,u);let x="";if(c?x='<button type="button" disabled class="w-full py-2.5 rounded-full bg-blush-100 border border-berry/30 text-berry text-xs font-extrabold opacity-80 cursor-not-allowed">Current Plan</button>':b?x='<button type="button" disabled class="w-full py-2.5 rounded-full bg-stone-100 border border-stone-200 text-stone-500 text-xs font-bold cursor-not-allowed">Included in Current Plan</button>':g&&(x=`<button type="button" onclick="openUpgradeConfirmModal('${u.id}')" class="w-full py-2.5 rounded-full btn-berry text-white text-xs font-extrabold shadow-rose-sm active:scale-95 transition-all cursor-pointer">Upgrade (${f.toLocaleString()} ETB) &rarr;</button>`),u.id==="pkg-premium"){const y=c?'<button type="button" disabled class="w-full py-2.5 rounded-full bg-white/80 border border-berry/30 text-berry text-xs font-extrabold cursor-not-allowed">Current Plan</button>':`<button type="button" onclick="openUpgradeConfirmModal('${u.id}')" class="w-full py-3 rounded-full bg-gradient-to-r from-[#C91254] via-[#E11D62] to-[#EC4899] hover:opacity-95 text-white text-xs font-extrabold shadow-rose-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-amber-200" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/></svg>
                <span>Upgrade to Premium (${f.toLocaleString()} ETB) &rarr;</span>
              </button>`;return`
            <div class="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[#FFF6F9] via-white to-[#FDE7F0] shadow-rose-md border-2 ${c?"border-berry ring-2 ring-berry/20":"border-berry/45"}">
              <div class="bg-gradient-to-r from-[#C91254] via-[#E11D62] to-[#EC4899] px-4 py-1.5 flex items-center justify-between text-white">
                <div class="flex items-center gap-1.5 text-[9.5px] font-extrabold uppercase tracking-wider">
                  <svg class="w-3.5 h-3.5 text-amber-200" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/></svg>
                  <span>Full Digital Growth Suite</span>
                </div>
                ${c?'<span class="px-2 py-0.5 rounded-full bg-white text-berry text-[8.5px] font-black">CURRENT PLAN</span>':'<span class="px-2 py-0.5 rounded-full bg-white/20 text-white text-[8.5px] font-extrabold">ALL FEATURES</span>'}
              </div>

              <div class="p-4 space-y-3">
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <h3 class="font-serif text-[17px] font-extrabold text-ink leading-tight">${u.name}</h3>
                    <p class="text-[10.5px] text-ink-muted mt-0.5 leading-snug">${u.tagline||""}</p>
                  </div>
                  <div class="text-right shrink-0 bg-white/90 px-2.5 py-1.5 rounded-2xl border border-blush-200 shadow-2xs">
                    <div class="text-base font-black text-berry leading-none">${Number(u.price).toLocaleString()} <span class="text-[10px]">ETB</span></div>
                    <div class="text-[8.5px] font-bold text-ink-muted mt-0.5">${g?"Pay "+f.toLocaleString()+" ETB diff":u.billing||"One-time setup"}</div>
                  </div>
                </div>

                <div class="text-[10.5px] font-extrabold text-berry pt-1.5 border-t border-berry/15">${u.includesPrefix||"Everything in Advanced, plus:"}</div>

                <ul class="space-y-1.5">
                  ${(u.features||[]).map(k=>`
                    <li class="flex items-start gap-2 text-[11px] text-ink font-medium">
                      <span class="w-4 h-4 rounded-full bg-gradient-to-br from-berry to-berry-dark text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                      <span class="leading-snug">${k}</span>
                    </li>
                  `).join("")}
                </ul>

                <div class="pt-1">${y}</div>
              </div>
            </div>
          `}return`
          <div class="bg-white rounded-[24px] p-4 shadow-rose-sm border ${c?"border-2 border-berry ring-2 ring-berry/15":"border-blush-200/80"} space-y-3">
            <div class="flex items-start justify-between gap-2">
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="text-sm font-black text-ink">${u.name}</h3>
                  ${c?'<span class="px-2 py-0.5 rounded-full bg-berry text-white text-[9px] font-extrabold tracking-wide">CURRENT PLAN</span>':""}
                </div>
                <p class="text-[10.5px] text-ink-muted mt-0.5 leading-snug">${u.tagline||""}</p>
              </div>
              <div class="text-right shrink-0">
                <div class="text-base font-black text-berry">${Number(u.price).toLocaleString()} <span class="text-[10px]">ETB</span></div>
                <div class="text-[9px] font-semibold text-ink-muted">${g?"Pay "+f.toLocaleString()+" ETB diff":u.billing||"One-time setup"}</div>
              </div>
            </div>

            ${u.includesPrefix?`<div class="text-[10.5px] font-extrabold text-berry pt-1 border-t border-blush-100">${u.includesPrefix}</div>`:'<div class="border-t border-blush-100"></div>'}

            <ul class="space-y-1.5">
              ${(u.features||[]).map(y=>`
                <li class="flex items-start gap-2 text-[11px] ${c||b?"text-ink font-semibold":"text-ink-muted"}">
                  <span class="w-4 h-4 rounded-full ${c||b?"bg-emerald-500 text-white":"bg-blush-100 text-berry"} flex items-center justify-center shrink-0 mt-0.5">
                    <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span class="leading-snug">${y}</span>
                </li>
              `).join("")}
            </ul>

            <div class="pt-1">${x}</div>
          </div>
        `}).join("");o.innerHTML=r+l}
