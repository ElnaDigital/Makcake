window.SVG_CAKE_FALLBACK="data:image/svg+xml;utf8,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="#FCE8EF"/><circle cx="200" cy="145" r="70" fill="#FAD4E2"/><text x="200" y="155" font-family="Georgia,serif" font-size="24" font-weight="bold" fill="#E11D62" text-anchor="middle">MAK CAKE</text></svg>');var SVG_CAKE_FALLBACK=window.SVG_CAKE_FALLBACK;const BRAND_LOGOS={telebirr:"./images/telebirr-logo.webp",cbe:"./images/cbe-logo.webp"};function getBrandLogo(t,e="w-5 h-5"){const n=String(t||"").toLowerCase();return n.includes("telebirr")?`<img src="${BRAND_LOGOS.telebirr}" alt="Telebirr" class="${e} object-contain rounded-lg shrink-0 shadow-2xs bg-white" onerror="this.style.display='none'" />`:n.includes("cbe")?`<img src="${BRAND_LOGOS.cbe}" alt="Commercial Bank of Ethiopia" class="${e} object-contain rounded-lg shrink-0 shadow-2xs bg-white" onerror="this.style.display='none'" />`:""}function getLuxurySvg(t,e="w-5 h-5"){const n={allCakes:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s2-1 4-1 4 1 4 1 2-1 4-1 4 1 4 1"/><path d="M2 21h20"/><path d="M7 8v3"/><path d="M12 8v3"/><path d="M17 8v3"/><path d="M7 4h.01"/><path d="M12 4h.01"/><path d="M17 4h.01"/></svg>`,couples:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l.96-.83"/></svg>`,miniCakes:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3c0 .35.06.68.17 1H6a3 3 0 0 0-3 3v2c0 2 1.5 3 3 3h12c1.5 0 3-1 3-3V9a3 3 0 0 0-3-3h-3.17c.11-.32.17-.65.17-1a3 3 0 0 0-3-3Z"/><path d="M3 14v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5"/><path d="M8 14v7"/><path d="M16 14v7"/></svg>`,normal:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v3"/><circle cx="12" cy="2" r="1" fill="currentColor"/><path d="M5 8h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2Z"/><path d="M3 14c2.5 0 3.5 1.5 6 1.5s3.5-1.5 6-1.5 3.5 1.5 6 1.5"/></svg>`,special:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 4.8 0 0 1 12 8a4.8 4.8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>`,bento:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 11h18"/><path d="M10 11v9"/><circle cx="15.5" cy="15.5" r="2"/><circle cx="6.5" cy="7.5" r="1.5"/></svg>`,birthday:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5.8 11.3 2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/><path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 2.45v0a2.9 2.9 0 0 1-2.27 2.76L13 8.5"/><path d="m10 13 4 4"/><path d="m13 10 4 4"/></svg>`,wedding:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="6"/><circle cx="15" cy="12" r="6"/><path d="M12 6.5 13.5 5l1.5 1.5L13.5 8Z" fill="currentColor"/></svg>`,anniversary:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 22h8"/><path d="M12 15v7"/><path d="M8 15h8a4 4 0 0 0 4-4V3H4v8a4 4 0 0 0 4 4Z"/><path d="M4 7h16"/><path d="m9 11 3 3 3-3"/></svg>`,cupcakes:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 10h12"/><path d="M7 10v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9"/><path d="M6 10a4 4 0 0 1-2-3.5C4 4 6 3 8 3c1 0 2 .5 2.5 1.5C11.5 3 13 3 14 3c2 0 4 1 4 3.5 0 1.5-.7 2.7-2 3.5"/><circle cx="12" cy="2" r="1" fill="currentColor"/></svg>`,graduation:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,holiday:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 2.4 6.8H21l-5.6 4.3 2.1 6.9L12 15.8 6.5 20l2.1-6.9L3 8.8h6.6Z"/></svg>`,candle:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a2 2 0 0 0-2 2c0 1.1 2 3 2 3s2-1.9 2-3a2 2 0 0 0-2-2Z"/><path d="M8 9h8v12a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V9Z"/><path d="M8 13h8"/></svg>`,sparkler:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="M12 18v4"/><path d="m4.93 4.93 2.83 2.83"/><path d="m16.24 16.24 2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="m4.93 19.07 2.83-2.83"/><path d="m16.24 7.76 2.83-2.83"/></svg>`,topper:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,themeset:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" x2="8.12" y1="4" y2="15.88"/><line x1="14.47" x2="20" y1="14.48" y2="20"/><line x1="8.12" x2="12" y1="8.12" y2="12"/></svg>`,figurine:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="4"/><path d="M6 21v-2a6 6 0 0 1 12 0v2"/><circle cx="12" cy="14" r="1"/></svg>`,floral:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m4.5 3a4.5 4.5 0 1 1-4.5 4.5M16.5 12H15m-3 4.5a4.5 4.5 0 1 1-4.5-4.5M12 16.5V15m-4.5-3H9"/><circle cx="12" cy="12" r="2"/></svg>`,chocolate:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>`,photo:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>`,packaging:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,knife:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8L3 21"/><path d="m14 10 4 4"/></svg>`,balloon:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a6 6 0 0 0-6 6c0 4.2 3.8 8 6 8s6-3.8 6-8a6 6 0 0 0-6-6Z"/><path d="M11 16h2l-1 2-1-2Z"/><path d="M12 18c-1 2 1 3 0 5"/></svg>`,sparkles:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z"/><path d="M19 3v4"/><path d="M21 5h-4"/></svg>`,check:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,close:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,star:`<svg class="${e}" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,pen:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>`,phone:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>`,bank:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m2 9 10-6 10 6"/><path d="M4 10v10"/><path d="M10 10v10"/><path d="M14 10v10"/><path d="M20 10v10"/><path d="M2 21h20"/></svg>`,cash:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>`,receipt:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M8 7h8"/><path d="M8 11h8"/><path d="M8 15h5"/></svg>`,card:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>`,bell:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`,bellOff:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8.7 3A6 6 0 0 1 18 8a21.3 21.3 0 0 0 .6 5"/><path d="M17 17H3s3-2 3-9a4.67 4.67 0 0 1 .3-1.7"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/><line x1="2" x2="22" y1="2" y2="22"/></svg>`,pin:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,box:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,camera:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>`,alert:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`,cart:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>`,heart:`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`};return n[t]||n.allCakes}var SVG_CAKE_FALLBACK=window.SVG_CAKE_FALLBACK;const SHOP_SETTINGS_CONFIG={phoneDisplay:"+251 911 234 567",phoneTel:"+251911234567",phoneLocal:"0911 23 45 67",telebirrNumber:"0911234567",telebirrDisplay:"0911 23 45 67",telebirrHolder:"MAK Cake Bakery",cbeAccount:"1000123456789",cbeAccountDisplay:"1000 1234 56789",cbeHolder:"MAK Cake Artisanal Bakery"};function applyShopSettingsConfigToDom(){const t=SHOP_SETTINGS_CONFIG.phoneDisplay,e=SHOP_SETTINGS_CONFIG.phoneTel,n=document.getElementById("success-call-link"),o=document.getElementById("success-call-label");n&&(n.href="tel:"+e),o&&(o.textContent="Call Us: "+t);const s=document.getElementById("contact-call-link");s&&(s.href="tel:"+e,s.onclick=()=>showCustomerToast("Calling "+t+"..."));const r=document.getElementById("contact-copy-phone-btn");r&&(r.onclick=function(){copyText(e,"Phone Number","customer",this)});const a=document.getElementById("contact-telebirr-line");a&&(a.innerHTML='<strong class="text-ink">Telebirr:</strong> '+SHOP_SETTINGS_CONFIG.telebirrDisplay+" ("+SHOP_SETTINGS_CONFIG.telebirrHolder+")");const i=document.getElementById("contact-cbe-line");i&&(i.innerHTML='<strong class="text-ink">CBE:</strong> '+SHOP_SETTINGS_CONFIG.cbeAccountDisplay+" ("+SHOP_SETTINGS_CONFIG.cbeHolder+")")}async function loadShopSettingsFromJson(){try{const t=await fetch("./data/settings.json",{cache:"no-cache"});if(!t.ok)return;const e=await t.json();e.contact&&e.contact.primaryPhone&&(SHOP_SETTINGS_CONFIG.phoneDisplay=e.contact.primaryPhone,SHOP_SETTINGS_CONFIG.phoneTel=e.contact.primaryPhone.replace(/\s+/g,""),SHOP_SETTINGS_CONFIG.phoneLocal=e.contact.primaryPhone),e.payments&&e.payments.telebirr&&e.payments.telebirr.accountNumber&&(SHOP_SETTINGS_CONFIG.telebirrNumber=String(e.payments.telebirr.accountNumber).replace(/\s+/g,""),SHOP_SETTINGS_CONFIG.telebirrDisplay=String(e.payments.telebirr.accountNumber),e.payments.telebirr.accountHolder&&(SHOP_SETTINGS_CONFIG.telebirrHolder=e.payments.telebirr.accountHolder)),e.payments&&e.payments.cbe&&e.payments.cbe.accountNumber&&(SHOP_SETTINGS_CONFIG.cbeAccount=String(e.payments.cbe.accountNumber).replace(/\s+/g,""),SHOP_SETTINGS_CONFIG.cbeAccountDisplay=String(e.payments.cbe.accountNumber),e.payments.cbe.accountHolder&&(SHOP_SETTINGS_CONFIG.cbeHolder=e.payments.cbe.accountHolder)),typeof state<"u"&&state.shop&&(state.shop.businessPhone=SHOP_SETTINGS_CONFIG.phoneLocal,state.shop.paymentMethods&&(state.shop.paymentMethods.telebirr&&(state.shop.paymentMethods.telebirr.accountNumber=SHOP_SETTINGS_CONFIG.telebirrDisplay,state.shop.paymentMethods.telebirr.accountName=SHOP_SETTINGS_CONFIG.telebirrHolder),state.shop.paymentMethods.cbe&&(state.shop.paymentMethods.cbe.accountNumber=SHOP_SETTINGS_CONFIG.cbeAccountDisplay,state.shop.paymentMethods.cbe.accountName=SHOP_SETTINGS_CONFIG.cbeHolder))),applyShopSettingsConfigToDom()}catch{}}const HERO_SLIDES=[{top:"Make Every Moment",script:"Sweeter",sub:"Premium cakes for every occasion",cta:"Explore Cakes",img:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=420&q=75"},{top:"Handcrafted in Bole",script:"Weddings",sub:"Luxury tiered cakes for Addis galas",cta:"View Special",img:"https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=700&q=85"},{top:"Personalize With",script:"Calligraphy",sub:"Custom hand-piped celebration notes",cta:"Customize Now",img:"https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=700&q=85"},{top:"Fresh Daily Addis",script:"Mini Bento",sub:"Same-day chilled delivery in Bole",cta:"Order Bento",img:"https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=700&q=85"}],CATEGORY_META=[{id:"All Cakes",name:"All Cakes",svgKey:"allCakes",img:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=200&q=80"},{id:"Extra Decorations",name:"Extra Decorations",svgKey:"sparkles",isDecoration:!0,img:"https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=200&q=80"},{id:"Cupples",name:"Cupples",svgKey:"couples",img:"https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=200&q=80"},{id:"Mini Cakes",name:"Mini Cakes",svgKey:"miniCakes",img:"https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=200&q=80"},{id:"Normal",name:"Normal",svgKey:"normal",img:"https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=200&q=80"},{id:"Special",name:"Special",svgKey:"special",isGift:!0,img:"https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=200&q=80"},{id:"Bento",name:"Bento",svgKey:"bento",img:"https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=200&q=80"},{id:"Birthday",name:"Birthday",svgKey:"birthday",img:"https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=200&q=80"},{id:"Wedding",name:"Wedding",svgKey:"wedding",img:"https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=200&q=80"},{id:"Anniversary",name:"Anniversary",svgKey:"anniversary",img:"https://images.unsplash.com/photo-1562440499-64c9a111f713?auto=format&fit=crop&w=200&q=80"},{id:"Cupcakes",name:"Cupcakes",svgKey:"cupcakes",img:"https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=200&q=80"},{id:"Graduation",name:"Graduation",svgKey:"graduation",img:"https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=200&q=80"},{id:"Holiday",name:"Holiday",svgKey:"holiday",img:"https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=200&q=80"}],SEED_CAKES=[{id:1,name:"Chocolate Dream Cake",desc:"Rich chocolate cake with creamy chocolate frosting.",category:"Normal",price:2500,rating:4.9,reviews:"120+",popular:!0,inStock:!0,img:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80"},{id:2,name:"Red Velvet Cake",desc:"Classic red velvet with cream cheese frosting.",category:"Normal",price:2600,rating:4.8,reviews:"98+",popular:!0,inStock:!0,img:"https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=600&q=80"},{id:3,name:"Oreo Dream Cake",desc:"Decadent cake with Oreo cookies.",category:"Normal",price:2700,rating:4.7,reviews:"76+",popular:!0,inStock:!0,img:"https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=600&q=80"},{id:4,name:"Strawberry Bliss Cake",desc:"Fresh strawberry cake with light cream.",category:"Normal",price:2600,rating:4.8,reviews:"90+",popular:!0,inStock:!0,img:"https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80"},{id:5,name:"Black Forest Classic",desc:"Halal dark cocoa layers with tart cherry compote.",category:"Normal",price:2550,rating:4.9,reviews:"84+",popular:!1,inStock:!0,img:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"},{id:6,name:"Vanilla Bean Buttercream",desc:"Fluffy Madagascar vanilla sponge with silky cream.",category:"Normal",price:2200,rating:4.8,reviews:"64+",popular:!1,inStock:!0,img:"https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=600&q=80"},{id:7,name:"Ethiopian Mocha Torte",desc:"Yirgacheffe espresso-infused sponge & cocoa cream.",category:"Normal",price:2800,rating:4.9,reviews:"71+",popular:!1,inStock:!0,img:"https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=600&q=80"},{id:8,name:"Mango Passion Cream",desc:"Fresh tropical mango glaze with light Chantilly.",category:"Normal",price:2650,rating:4.8,reviews:"52+",popular:!1,inStock:!0,img:"https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=600&q=80"},{id:9,name:"Caramel Butterscotch Cake",desc:"Warm salted caramel drip over golden sponge.",category:"Normal",price:2750,rating:4.8,reviews:"49+",popular:!1,inStock:!0,img:"https://images.unsplash.com/photo-1602351447937-745cb720612f?auto=format&fit=crop&w=600&q=80"},{id:10,name:"Blueberry Velvet Cake",desc:"Wild blueberry compote with whipped mascarpone.",category:"Normal",price:2900,rating:4.7,reviews:"41+",popular:!1,inStock:!0,img:"https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80"},{id:11,name:"Funfetti Celebration Cake",desc:"Joyful confetti sponge with pastel vanilla swirls.",category:"Normal",price:2400,rating:4.9,reviews:"63+",popular:!1,inStock:!0,img:"https://images.unsplash.com/photo-1557925923-cd4648e211a0?auto=format&fit=crop&w=600&q=80"},{id:12,name:"White Chocolate Berry",desc:"Belgian white chocolate mousse with Ziway berries.",category:"Normal",price:2850,rating:4.9,reviews:"58+",popular:!1,inStock:!0,img:"https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=600&q=80"},{id:13,name:"Pink Rose Cupcake Box (12)",desc:"Twelve tall-swirled strawberry & vanilla cupcakes.",category:"Cupples",price:1650,rating:4.9,reviews:"88+",popular:!1,inStock:!0,img:"https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=600&q=80"},{id:14,name:"Red Velvet Cupples (6)",desc:"Six plush red velvet cupcakes with cream cheese.",category:"Cupples",price:1200,rating:4.8,reviews:"54+",popular:!1,inStock:!0,img:"https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80"},{id:15,name:"Belgian Choco Cupples (12)",desc:"Rich dark chocolate ganache cupcakes with sprinkles.",category:"Cupples",price:1750,rating:4.9,reviews:"67+",popular:!1,inStock:!0,img:"https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80"},{id:16,name:"Pistachio Rose Cupples (6)",desc:"Roasted pistachio cupcakes topped with rose petals.",category:"Cupples",price:1450,rating:4.9,reviews:"39+",popular:!1,inStock:!0,img:"https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=600&q=80"},{id:17,name:"Korean Pastel Bento Cake",desc:"Cute 0.5kg lunchbox cake with custom calligraphy.",category:"Mini Cakes",price:1350,rating:4.9,reviews:"112+",popular:!1,inStock:!0,img:"https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=600&q=80"},{id:18,name:"Mini Berry Chantilly",desc:"Petite 5-inch berry cream cake for two.",category:"Mini Cakes",price:1500,rating:4.8,reviews:"46+",popular:!1,inStock:!0,img:"https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80"},{id:19,name:"Blush Heart Mini Cake",desc:"Romantic vintage piped mini heart bento cake.",category:"Mini Cakes",price:1450,rating:4.9,reviews:"73+",popular:!1,inStock:!0,img:"https://images.unsplash.com/photo-1562440499-64c9a111f713?auto=format&fit=crop&w=600&q=80"},{id:20,name:"Lotus Biscoff Drip Luxury",desc:"Caramelized Belgian Speculoos drip & mascarpone.",category:"Special",price:3600,rating:5,reviews:"104+",popular:!1,inStock:!0,img:"https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=600&q=80"},{id:21,name:"Royal 3-Tier Wedding Cake",desc:"Grand Addis wedding centerpiece with floral pearls.",category:"Special",price:12500,rating:5,reviews:"42+",popular:!1,inStock:!0,img:"https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=600&q=80"},{id:22,name:"Pistachio Rose Gold Leaf",desc:"Iranian pistachio sponge with 24k edible gold leaf.",category:"Special",price:4200,rating:5,reviews:"61+",popular:!1,inStock:!0,img:"https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=600&q=80"},{id:23,name:"San Sebastian Cheesecake",desc:"Caramelized Basque burnt cheesecake with choco pour.",category:"Special",price:3400,rating:4.9,reviews:"85+",popular:!1,inStock:!0,img:"https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80"},{id:24,name:"Ferrero Hazelnut Royale",desc:"Piedmont hazelnut praline mousse & whole truffles.",category:"Special",price:3900,rating:5,reviews:"77+",popular:!1,inStock:!0,img:"https://images.unsplash.com/photo-1602351447937-745cb720612f?auto=format&fit=crop&w=600&q=80"},{id:25,name:"French Macaron Crown Cake",desc:"Salted caramel sponge topped with artisan macarons.",category:"Special",price:4500,rating:4.9,reviews:"38+",popular:!1,inStock:!0,img:"https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80"},{id:26,name:"Golden Anniversary 2-Tier",desc:"Champagne buttercream tiered cake for milestones.",category:"Special",price:7800,rating:5,reviews:"29+",popular:!1,inStock:!0,img:"https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=600&q=80"}];let SIZES=[{id:'6" Standard',label:'6" Standard',add:0,serves:"6\u20138 Guests"},{id:'8" Celebration',label:'8" Celebration',add:700,serves:"12\u201315 Guests"},{id:'10" Grand',label:'10" Grand',add:1600,serves:"20\u201324 Guests"},{id:"2-Tier Luxury",label:"2-Tier",add:4200,serves:"35+ Guests"}];const FLAVORS=["Belgian Chocolate","Red Velvet","Madagascar Vanilla","Strawberry Cream","Oreo Fudge","Lotus Biscoff"],DECORATION_CATEGORIES=[{id:"Candles & Toppers",short:"Candles & Toppers",svgKey:"candle"},{id:"Surprise Items",short:"Surprise Items",svgKey:"sparkles"},{id:"Party Accessories",short:"Party Accessories",svgKey:"balloon"},{id:"Tableware & Decor",short:"Tableware & Decor",svgKey:"packaging"},{id:"Personalized Extras",short:"Personalized Extras",svgKey:"photo"}],SEED_CREATIONS=[{id:"cr-1",title:"Belgian Chocolate Drip Luxury",category:"Chocolate Cakes",caption:"Fresh chocolate sponge with rich ganache, gold flakes & hazelnut crunch",date:"Today",img:SEED_CAKES[0].img,published:!0},{id:"cr-2",title:"Lotus Biscoff Celebration Stack",category:"Caramel & Biscoff",caption:"Spiced caramel biscuit cream, drip glaze and lotus biscuit crumbs",date:"1 day ago",img:SEED_CAKES[19].img,published:!0},{id:"cr-3",title:"Red Velvet Classic Birthday Cake",category:"Red Velvet",caption:"Silky cream cheese frosting with ruby sponge layers & fresh berries",date:"1 day ago",img:SEED_CAKES[1].img,published:!0},{id:"cr-4",title:"Korean Pastel Bento Cake",category:"Bento & Pastel",caption:"Custom inscription with buttercream floral piping & pastel palette",date:"2 days ago",img:SEED_CAKES[16].img,published:!0},{id:"cr-5",title:"Strawberry Cream Dream",category:"Fruit & Berry",caption:"Fresh organic Ethiopian strawberries with whipped vanilla mascarpone",date:"2 days ago",img:SEED_CAKES[3].img,published:!0},{id:"cr-6",title:"Oreo Fudge Birthday Cake",category:"Cookies & Cream",caption:"Cookies & cream infusion with chocolate fudge drip and whole Oreos",date:"3 days ago",img:SEED_CAKES[2].img,published:!0}],SEED_DECORATIONS=[{id:"dec-1",name:"Standard Birthday Candles",category:"Candles & Toppers",price:120,inStock:!0,requiresNumber:!1,svgKey:"candle",img:"https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=360&q=80",desc:"Classic colorful birthday candles with protective drip guards for festive celebration cakes."},{id:"dec-2",name:"Number Candles (0\u20139)",category:"Candles & Toppers",price:150,inStock:!0,requiresNumber:!0,svgKey:"candle",img:"https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=360&q=80",desc:"Lustrous metallic finish numeral candles (0 to 9) for milestone birthdays and anniversaries."},{id:"dec-3",name:"Flammable Candles",category:"Candles & Toppers",price:180,inStock:!0,requiresNumber:!1,svgKey:"candle",img:"https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",desc:"Vibrant slow-burning celebration flame candles designed for dramatic cake presentations."},{id:"dec-4",name:"Sparkler Candles",category:"Candles & Toppers",price:220,inStock:!0,requiresNumber:!1,svgKey:"sparkler",img:"https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&w=360&q=80",desc:"Smokeless glittering celebration sparkler fountains for unforgettable photo and video moments."},{id:"dec-5",name:"Cake Toppers",category:"Candles & Toppers",price:300,inStock:!0,requiresNumber:!1,svgKey:"topper",img:"https://images.unsplash.com/photo-1562440499-64c9a111f713?auto=format&fit=crop&w=360&q=80",desc:"Laser-cut acrylic gold and mirrored celebration toppers in elegant calligraphy script."},{id:"dec-6",name:"Decorative Candle Wraps",category:"Candles & Toppers",price:140,inStock:!0,requiresNumber:!1,svgKey:"candle",img:"https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=360&q=80",desc:"Decorative glitter and floral base wraps that add an artisanal accent to your cake candles."},{id:"dec-7",name:"Party Popper / Confetti Cannon",category:"Surprise Items",price:250,inStock:!0,requiresNumber:!1,svgKey:"sparkles",img:"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=360&q=80",desc:"Spring-loaded celebration confetti cannon with shimmering metallic flutter ribbons."},{id:"dec-8",name:"Balloon Numbers (0\u20139)",category:"Party Accessories",price:280,inStock:!0,requiresNumber:!0,svgKey:"balloon",img:"https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=360&q=80",desc:"Large metallic foil number balloons (0\u20139) in radiant rose gold and champagne."},{id:"dec-9",name:"HBD Foil Balloons",category:"Party Accessories",price:350,inStock:!0,requiresNumber:!1,svgKey:"balloon",img:"https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=360&q=80",desc:"Complete Happy Birthday letter foil balloon banner set with hanging ribbon and straw."},{id:"dec-10",name:"5 Heart Balloons",category:"Party Accessories",price:200,inStock:!0,requiresNumber:!1,svgKey:"balloon",img:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=360&q=80",desc:"Set of 5 ruby and blush metallic foil heart balloons for romantic occasions."},{id:"dec-11",name:"Manual Balloon Pump",category:"Party Accessories",price:150,inStock:!0,requiresNumber:!1,svgKey:"packaging",img:"https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=360&q=80",desc:"Compact dual-action hand air pump for effortless latex and foil balloon inflation."},{id:"dec-12",name:"Electric Balloon Pump",category:"Party Accessories",price:1200,inStock:!0,requiresNumber:!1,svgKey:"packaging",img:"https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=360&q=80",desc:"High-speed dual nozzle electric air inflator for fast balloon styling and parties."},{id:"dec-13",name:"Ready-made Balloon Sets",category:"Party Accessories",price:450,inStock:!0,requiresNumber:!1,svgKey:"balloon",img:"https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=360&q=80",desc:"Curated 12-piece color-coordinated balloon bouquets with confetti and pearl balloons."},{id:"dec-14",name:"Balloon Garland Kits",category:"Party Accessories",price:850,inStock:!0,requiresNumber:!1,svgKey:"balloon",img:"https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=360&q=80",desc:"Complete DIY balloon arch garland kit with connecting strip, dot glue and assorted balloons."},{id:"dec-15",name:"Plastic Cups",category:"Tableware & Decor",price:180,inStock:!0,requiresNumber:!1,svgKey:"packaging",img:"https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=360&q=80",desc:"Pack of 10 heavyweight crystal blush party cups with gold rim."},{id:"dec-16",name:"Plastic Plates",category:"Tableware & Decor",price:220,inStock:!0,requiresNumber:!1,svgKey:"packaging",img:"https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=360&q=80",desc:"Pack of 10 scalloped dessert and cake serving plates in rose blush with gold trim."},{id:"dec-17",name:"Plastic Forks",category:"Tableware & Decor",price:120,inStock:!0,requiresNumber:!1,svgKey:"packaging",img:"https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=360&q=80",desc:"Pack of 12 reusable luxury metallic gold dessert forks."},{id:"dec-18",name:"Plastic Spoons",category:"Tableware & Decor",price:120,inStock:!0,requiresNumber:!1,svgKey:"packaging",img:"https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=360&q=80",desc:"Pack of 12 luxury metallic gold dessert spoons."},{id:"dec-19",name:"Plastic Knives",category:"Tableware & Decor",price:120,inStock:!0,requiresNumber:!1,svgKey:"packaging",img:"https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=360&q=80",desc:"Pack of 12 serrated metallic gold cake cutting and serving knives."},{id:"dec-20",name:"Decorative Ribbons",category:"Tableware & Decor",price:160,inStock:!0,requiresNumber:!1,svgKey:"packaging",img:"https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=360&q=80",desc:"Roll of 25mm double-face satin ribbon in rose gold and blush for cake boxes and balloons."},{id:"dec-21",name:"Double-Sided Tape",category:"Tableware & Decor",price:90,inStock:!0,requiresNumber:!1,svgKey:"packaging",img:"https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=360&q=80",desc:"Traceless heavy-duty double sided party decor mounting tape for walls and balloons."},{id:"dec-22",name:"Printed Photo",category:"Personalized Extras",price:350,inStock:!0,requiresNumber:!1,svgKey:"photo",img:"https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=360&q=80",desc:"High-definition personalized photo print on food-safe edible sugar icing sheet or keepsake stand."}],TIME_SLOTS=["Morning","Afternoon","Evening"],STATUS_STAGES=["Payment Pending","Approved","Completed"];function makeDemoReceiptSVG(t,e,n,o){return"data:image/svg+xml;utf8,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="340" height="210" viewBox="0 0 340 210">
          <rect width="340" height="210" rx="14" fill="#FFF7FA" stroke="#FAD4E2" stroke-width="2"/>
          <rect width="340" height="44" rx="14" fill="${t==="Telebirr"?"#E11D62":"#1E3A5F"}"/>
          <text x="170" y="27" font-family="Arial,sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">${t} Transfer Confirmed</text>
          <text x="20" y="74" font-family="Arial,sans-serif" font-size="11" fill="#6E5D64">Amount Transferred</text>
          <text x="320" y="74" font-family="Arial,sans-serif" font-size="15" font-weight="bold" fill="#E11D62" text-anchor="end">${fmtETB(n)}</text>
          <line x1="20" y1="88" x2="320" y2="88" stroke="#FCE8EF" stroke-width="1.5"/>
          <text x="20" y="112" font-family="Arial,sans-serif" font-size="11" fill="#6E5D64">Transaction Ref:</text>
          <text x="320" y="112" font-family="Arial,sans-serif" font-size="11" font-weight="bold" fill="#1D1116" text-anchor="end">${e}</text>
          <text x="20" y="136" font-family="Arial,sans-serif" font-size="11" fill="#6E5D64">Sender:</text>
          <text x="320" y="136" font-family="Arial,sans-serif" font-size="11" font-weight="bold" fill="#1D1116" text-anchor="end">${o}</text>
          <text x="20" y="160" font-family="Arial,sans-serif" font-size="11" fill="#6E5D64">Receiver:</text>
          <text x="320" y="160" font-family="Arial,sans-serif" font-size="11" font-weight="bold" fill="#1D1116" text-anchor="end">MAK CAKE Bakery (Addis)</text>
          <text x="170" y="192" font-family="Arial,sans-serif" font-size="10" fill="#059669" font-weight="bold" text-anchor="middle">Compressed Receipt Proof \u2022 Ready for Verification</text>
        </svg>`)}function todayStr(){return new Date().toISOString().split("T")[0]}function tomorrowStr(){const t=new Date;return t.setDate(t.getDate()+1),t.toISOString().split("T")[0]}function getMondayToSundayDays(){const t=new Date,e=t.getDay(),n=e===0?1:e===1?0:8-e,o=new Date(t);o.setDate(t.getDate()+n);const s=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return s.map((a,i)=>{const l=new Date(o);return l.setDate(o.getDate()+i),{dayName:a,shortLabel:`${r[l.getMonth()]} ${l.getDate()}`,iso:l.toISOString().split("T")[0]}})}function fmtETB(t){return Math.round(t).toLocaleString("en-US")+" ETB"}const STORE_KEY="mak_cake_blush_pro_v5",CUSTOMER_ORDERS_KEY="mak_cake_customer_orders",SEED_ORDERS=[{id:10046,status:"Payment Pending",customerName:"Selamawit Bekele",phone:"0911 45 88 21",fulfillment:"delivery",address:"Bole Atlas, near Edna Mall",deliveryDate:"Tomorrow",timeSlot:"01:00 \u2013 05:00",paymentPlan:"full",paymentMethod:"Telebirr",paymentRef:"Receipt Uploaded",paymentStatus:"Unpaid",dueNow:3650,balanceDue:0,receiptImg:makeDemoReceiptSVG("Telebirr","TB-884210",3650,"Selamawit Bekele"),cakeName:"Chocolate Dream Cake",cakeImg:SEED_CAKES[0].img,size:'8" Celebration',flavor:"Belgian Chocolate",inscription:"Happy Birthday Dawit!",addons:['Acrylic Gold "Happy Birthday" Toppers'],total:3650,isNewFlash:!1},{id:10045,status:"Payment Pending",customerName:"Natnael Girma",phone:"0922 71 33 04",fulfillment:"delivery",address:"CMC Michael, Sunshine Compound",deliveryDate:"Today",timeSlot:"05:00 \u2013 08:00",paymentPlan:"half",paymentMethod:"CBE Transfer",paymentRef:"Receipt Uploaded",paymentStatus:"Unpaid",dueNow:2200,balanceDue:2200,receiptImg:makeDemoReceiptSVG("CBE Transfer","FT26119A82",2200,"Natnael Girma"),cakeName:"Lotus Biscoff Drip Luxury",cakeImg:SEED_CAKES[19].img,size:'6" Standard',flavor:"Lotus Biscoff",inscription:"Congrats Grad!",addons:["Gold Leaf & Sugar Pearl Decoration Sets"],total:4400,isNewFlash:!1},{id:10044,status:"Approved",customerName:"Hanna Tadesse",phone:"0913 88 12 90",fulfillment:"delivery",address:"Kazanchis, near Radisson Blu",deliveryDate:"Today",timeSlot:"01:00 \u2013 05:00",paymentPlan:"full",paymentMethod:"Telebirr",paymentRef:"Receipt Uploaded",paymentStatus:"Paid",dueNow:2930,balanceDue:0,receiptImg:makeDemoReceiptSVG("Telebirr","TB-773109",2930,"Hanna Tadesse"),cakeName:"Red Velvet Cake",cakeImg:SEED_CAKES[1].img,size:'6" Standard',flavor:"Red Velvet",inscription:"Melkam Lidet Mom",addons:["Pastel Spiral Candles Set"],total:2930,isNewFlash:!1},{id:10043,status:"Approved",customerName:"Yonas Kebede",phone:"0911 90 54 12",fulfillment:"delivery",address:"Old Airport, near ICS",deliveryDate:"Today",timeSlot:"01:00 \u2013 05:00",paymentPlan:"full",paymentMethod:"CBE Transfer",paymentRef:"Receipt Uploaded",paymentStatus:"Paid",dueNow:3150,balanceDue:0,receiptImg:makeDemoReceiptSVG("CBE Transfer","FT26118Z11",3150,"Yonas Kebede"),cakeName:"Strawberry Bliss Cake",cakeImg:SEED_CAKES[3].img,size:'6" Standard',flavor:"Strawberry Cream",inscription:"Happy Anniversary!",addons:['"Happy Anniversary" Elegant Script Toppers'],total:3150,isNewFlash:!1},{id:10042,status:"Approved",customerName:"Meron Alemu",phone:"0930 14 77 65",fulfillment:"delivery",address:"Sarbet, Adams Pavilion",deliveryDate:"Today",timeSlot:"09:00 \u2013 12:00",paymentPlan:"cod",paymentMethod:"Pay on Delivery",paymentRef:"Pay on Delivery",paymentStatus:"Unpaid",dueNow:0,balanceDue:2850,receiptImg:"",cakeName:"Oreo Dream Cake",cakeImg:SEED_CAKES[2].img,size:'6" Standard',flavor:"Oreo Fudge",inscription:"Happy Birthday Robel!",addons:[],candleNumber:"",total:2850,isNewFlash:!1},{id:10041,status:"Completed",customerName:"Biniyam Tesfaye",phone:"0912 66 20 88",fulfillment:"delivery",address:"Bole Bulbula, Mariam Mazoria",deliveryDate:"Nov 27, 2026",timeSlot:"09:00 \u2013 12:00",paymentPlan:"full",paymentMethod:"Telebirr",paymentRef:"Receipt Uploaded",paymentStatus:"Paid",dueNow:3300,balanceDue:0,receiptImg:makeDemoReceiptSVG("Telebirr","TB-662018",3300,"Biniyam Tesfaye"),cakeName:"Korean Pastel Bento Cake",cakeImg:SEED_CAKES[16].img,size:'6" Standard',flavor:"Madagascar Vanilla",inscription:"Best Wishes!",addons:["Romantic Rose Petal Kits"],total:3300,isNewFlash:!1}],SEED_NOTIFS=[{id:1,title:"Fresh Batch Ready in Bole",msg:"Chocolate Dream, Red Velvet & Strawberry Bliss cakes are freshly baked today.",time:"15m ago"},{id:2,title:"Order #ORD-10042 is Ready!",msg:"Your Oreo Dream Cake is boxed and chilled for Addis Ababa delivery.",time:"40m ago"}];let state={cakes:[],decorations:[],creations:[],orders:[],notifications:[],favorites:[1,2],cart:[{id:"seed-c1",cakeId:1,name:"Chocolate Dream Cake",img:SEED_CAKES[0].img,size:'6" Standard',flavor:"Belgian Chocolate",qty:1,unitPrice:2500}],unreadNotifs:2,shop:{isOpen:!0,deliveryFee:150,bellOn:!0}},workspaceMode="dual",customerTab="home",adminTab="overview",activeHomeCat="All Cakes",homeSearch="",menuCat="All Cakes",menuSearch="",menuSort="featured",sheetAddonCat=DECORATION_CATEGORIES[0].id,adminMenuSub="cakes",adminDecCatFilter="All",adminFilter="All",heroIndex=0,trackerDateFilter="all",sheet={step:1,mode:"single",cake:null,size:SIZES[0].id,flavor:FLAVORS[0],decChoice:null,addons:[],candleNumber:"",inscription:"",fulfillment:"delivery",name:"",phone:"",address:"",dateOption:"tomorrow",datePickerOpen:!1,date:tomorrowStr(),dateLabel:"Tomorrow",timeSlot:TIME_SLOTS[1],paymentPlan:"full",paymentMethod:"Telebirr",receiptImg:"",receiptName:"",errors:{}},lastSubmittedOrderId=null;function loadState(){try{const t=localStorage.getItem(STORE_KEY);if(t){const e=JSON.parse(t);state={...state,...e},(!state.cakes||!state.cakes.length)&&(state.cakes=JSON.parse(JSON.stringify(SEED_CAKES))),!state.decorations||!state.decorations.length||state.decorations.some(o=>o.category==="Candles & Sparklers"||o.category==="Keepsakes & Figurines")?state.decorations=JSON.parse(JSON.stringify(SEED_DECORATIONS)):state.decorations=state.decorations.map(o=>(o.category||(o.category="Candles & Toppers"),o.inStock===void 0&&(o.inStock=!0),o)),!state.creations||!state.creations.length?state.creations=JSON.parse(JSON.stringify(SEED_CREATIONS)):state.creations.forEach(n=>{n.date&&n.date.includes("Bole Kitchen")&&(n.date=n.date.includes("Yesterday")?"1 day ago":"Today")}),!state.orders||!state.orders.length?state.orders=JSON.parse(JSON.stringify(SEED_ORDERS)):state.orders.forEach(n=>{n.status==="Pending"?n.status="Payment Pending":["Confirmed","Preparing","Ready"].includes(n.status)&&(n.status="Approved")}),(!state.notifications||!state.notifications.length)&&(state.notifications=JSON.parse(JSON.stringify(SEED_NOTIFS)));return}}catch{}state.cakes=JSON.parse(JSON.stringify(SEED_CAKES)),state.decorations=JSON.parse(JSON.stringify(SEED_DECORATIONS)),state.creations=JSON.parse(JSON.stringify(SEED_CREATIONS)),state.orders=JSON.parse(JSON.stringify(SEED_ORDERS)),state.notifications=JSON.parse(JSON.stringify(SEED_NOTIFS))}function saveState(){try{localStorage.setItem(STORE_KEY,JSON.stringify(state)),localStorage.setItem(CUSTOMER_ORDERS_KEY,JSON.stringify(state.orders))}catch{}}let scrollListenersBound=!1;function checkVisibleCards(){window._observeCakeCards&&window._observeCakeCards()}function initScrollTiltObserver(){if(!window._tiltObserverInit)if(window._tiltObserverInit=!0,"IntersectionObserver"in window){const t=new IntersectionObserver(e=>{e.forEach(n=>{n.isIntersecting&&(n.target.classList.add("is-scroll-animated"),t.unobserve(n.target))})},{root:null,rootMargin:"60px",threshold:.05});window._observeCakeCards=function(){document.querySelectorAll(".cake-card-animate:not(.is-scroll-animated)").forEach(e=>{t.observe(e)})},window._observeCakeCards()}else document.querySelectorAll(".cake-card-animate").forEach(t=>t.classList.add("is-scroll-animated"))}let loadedCustomerTabs=new Set(["home"]);function invalidateCustomerTabCache(t){t?loadedCustomerTabs.delete(t):(loadedCustomerTabs.clear(),loadedCustomerTabs.add("home"))}function syncAll(){renderHero(),renderHomeCategories(),renderHomePopular(),renderRecentCreations(),updateCustomerBadges(),customerTab==="menu"?(renderMenuTab(),loadedCustomerTabs.add("menu")):customerTab==="categories"?(renderCategoriesTab(),loadedCustomerTabs.add("categories")):customerTab==="favorites"?(renderFavoritesTab(),loadedCustomerTabs.add("favorites")):customerTab==="cart"?(renderCartTab(),loadedCustomerTabs.add("cart")):(loadedCustomerTabs.delete("favorites"),loadedCustomerTabs.delete("cart"));const t=document.getElementById("panel-admin");(t&&!t.classList.contains("hidden")&&t.offsetParent!==null||workspaceMode==="admin"||workspaceMode==="dual")&&(renderAdminOverview(),typeof renderAdminNotifications=="function"&&renderAdminNotifications(),renderAdminOrders(),renderAdminMenu(),renderAdminDecorations(),renderAdminCreations(),renderAdminAnalytics(),renderAdminShop()),initScrollTiltObserver(),ensureShopState();const n=document.getElementById("cust-brand-name");n&&(n.textContent=state.shop.businessName||"MAK CAKE");const o=document.getElementById("cust-closed-pill");o&&(o.classList.toggle("hidden",state.shop.isOpen),o.textContent=state.shop.isOpen?"":"Pre-Order Only");const s=document.getElementById("admin-bell-icon");s&&(s.innerHTML=state.shop.bellOn?'<svg class="w-3.5 h-3.5 text-berry" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>':'<svg class="w-3.5 h-3.5 text-ink-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13.73 21a2 2 0 0 1-3.46 0"/><path d="M18.63 13A17.89 17.89 0 0 1 18 8"/><path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"/><line x1="1" y1="1" x2="23" y2="23"/></svg>');const r=document.getElementById("admin-bell-txt");r&&(r.textContent=state.shop.bellOn?"Bell ON":"Muted");const a=document.getElementById("tracker-sheet");a&&!a.classList.contains("hidden")&&renderTrackerList();const i=document.getElementById("order-success-page");i&&!i.classList.contains("hidden")&&updateSuccessPageLiveStatus();const l=document.getElementById("order-wizard-page");l&&!l.classList.contains("hidden")&&renderOrderSheet()}function playBell(t=!1){if(!(!state.shop.bellOn&&!t))try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const n=new e,o=n.currentTime;[880,1320].forEach((s,r)=>{const a=n.createOscillator(),i=n.createGain();a.type="sine",a.frequency.setValueAtTime(s,o+r*.14),i.gain.setValueAtTime(.18,o+r*.14),i.gain.exponentialRampToValueAtTime(.001,o+r*.14+.42),a.connect(i),i.connect(n.destination),a.start(o+r*.14),a.stop(o+r*.14+.45)})}catch{}}function playCustomerNotificationSound(t="default"){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const n=new e;n.state==="suspended"&&n.resume();const o=n.currentTime;let s=[];t==="Approved"||t==="Paid"||t==="Verified"?s=[{f:587.33,t:0,d:.18,vol:.18},{f:739.99,t:.12,d:.18,vol:.22},{f:880,t:.24,d:.22,vol:.25},{f:1174.66,t:.36,d:.45,vol:.28}]:t==="Completed"||t==="Delivered"?s=[{f:523.25,t:0,d:.15,vol:.2},{f:659.25,t:.1,d:.15,vol:.22},{f:783.99,t:.2,d:.2,vol:.25},{f:1046.5,t:.3,d:.5,vol:.3}]:t==="Payment Pending"||t==="Pending"?s=[{f:698.46,t:0,d:.18,vol:.2},{f:880,t:.14,d:.38,vol:.24}]:s=[{f:659.25,t:.16,d:.2,vol:.2},{f:987.77,t:.14,d:.4,vol:.25}],s.forEach(r=>{const a=n.createOscillator(),i=n.createGain();a.type="sine",a.frequency.setValueAtTime(r.f,o+r.t),i.gain.setValueAtTime(r.vol,o+r.t),i.gain.exponentialRampToValueAtTime(1e-4,o+r.t+r.d),a.connect(i),i.connect(n.destination),a.start(o+r.t),a.stop(o+r.t+r.d+.05)}),navigator.vibrate&&navigator.vibrate([70,40,90])}catch(e){console.warn("Customer notification audio:",e)}}let custToastT,adminToastT,globalToastT;function copyText(t,e,n="customer",o=null){try{const r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.opacity="0",document.body.appendChild(r),r.select(),document.execCommand("copy"),document.body.removeChild(r)}catch{}o&&(o.dataset.origHtml||(o.dataset.origHtml=o.innerHTML),clearTimeout(o._copyTimer),o.classList.remove("copy-copied-btn"),o.offsetWidth,o.classList.add("copy-copied-btn"),o.innerHTML=`
          <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Copied</span>
        `,o._copyTimer=setTimeout(()=>{o.classList.remove("copy-copied-btn"),o.dataset.origHtml&&(o.innerHTML=o.dataset.origHtml)},2200));const s=`${e} copied: ${t}`;n==="admin"?showAdminToast(s):showCustomerToast(s)}function setWorkspaceMode(t){workspaceMode=t;const e=document.getElementById("panel-customer"),n=document.getElementById("panel-admin");t==="dual"?(e.classList.remove("hidden"),n.classList.remove("hidden")):t==="customer"?(e.classList.remove("hidden"),n.classList.add("hidden")):(e.classList.add("hidden"),n.classList.remove("hidden")),["customer","dual","admin"].forEach(o=>{const s=document.getElementById(`mode-btn-${o}`);if(!s)return;const r=o===t;s.classList.toggle("btn-berry",r),s.classList.toggle("text-white",r),s.classList.toggle("shadow-rose-sm",r),s.classList.toggle("text-ink-muted",!r)})}function switchCustomerTab(t){customerTab=t,document.querySelectorAll(".c-tab-view").forEach(o=>{o.classList.add("hidden"),o.classList.remove("animate-view")});const e=document.getElementById(`c-tab-${t}`);e&&(e.classList.remove("hidden"),e.offsetWidth,e.classList.add("animate-view")),document.querySelectorAll(".c-nav-btn").forEach(o=>{const s=o.dataset.ctab===t;o.classList.toggle("text-berry",s),o.classList.toggle("font-bold",s),o.classList.toggle("text-ink",!s),o.classList.toggle("font-medium",!s);const r=o.querySelector(".c-nav-indicator");r&&r.classList.toggle("hidden",!s)});const n=document.getElementById("customer-scroll-area");n&&(n.scrollTop=0),loadedCustomerTabs.has(t)||(t==="home"?(renderHero(),renderHomeCategories(),renderHomePopular(),renderRecentCreations()):t==="menu"?renderMenuTab():t==="categories"?renderCategoriesTab():t==="favorites"?renderFavoritesTab():t==="cart"&&renderCartTab(),loadedCustomerTabs.add(t)),setTimeout(()=>initScrollTiltObserver(),40)}function focusMainSearch(){switchCustomerTab("home"),setTimeout(()=>{const t=document.getElementById("home-search-input");t&&t.focus()},60)}function handleHomeSearch(t){homeSearch=t.trim();const e=document.getElementById("home-search-clear");e&&e.classList.toggle("hidden",!homeSearch),renderHomePopular()}function clearHomeSearch(){homeSearch="";const t=document.getElementById("home-search-input");t&&(t.value="");const e=document.getElementById("home-search-clear");e&&e.classList.add("hidden"),renderHomePopular()}function scrollCategoryStrip(){const t=document.getElementById("home-category-strip");t&&t.scrollBy({left:150,behavior:"smooth"})}function updateCustomerBadges(){const t=document.getElementById("nav-fav-badge"),e=document.getElementById("nav-cart-badge"),n=document.getElementById("cust-bell-badge"),o=state.cart.reduce((s,r)=>s+r.qty,0);t&&(t.textContent=state.favorites.length,t.classList.toggle("hidden",state.favorites.length===0)),e&&(e.textContent=o,e.classList.toggle("hidden",o===0)),n&&(n.textContent=state.unreadNotifs,n.classList.toggle("hidden",state.unreadNotifs===0))}function setHeroSlide(t){heroIndex=t,renderHero()}let heroSlidesInitialized=!1;function ensureHeroSlideImages(){if(heroSlidesInitialized)return;const t=document.getElementById("hero-slides-images");t&&(HERO_SLIDES.forEach((e,n)=>{if(n===0)return;const o=document.createElement("img");o.setAttribute("data-slide-idx",String(n)),o.width=420,o.height=162,o.loading="lazy",o.decoding="async",o.alt=e.script||"MAK CAKE",o.src=e.img,o.className="hero-slide-layer absolute right-0 top-0 h-full w-[58%] object-cover object-center hero-cake-mask transition-opacity duration-500 ease-in-out opacity-0 pointer-events-none",o.onerror=function(){this.onerror=null,this.src=SVG_CAKE_FALLBACK},t.appendChild(o)}),heroSlidesInitialized=!0)}function renderHero(){ensureHeroSlideImages();const t=HERO_SLIDES[heroIndex]||HERO_SLIDES[0];document.querySelectorAll("#hero-slides-images .hero-slide-layer").forEach(i=>{const l=Number(i.getAttribute("data-slide-idx"))===heroIndex;i.classList.toggle("opacity-100",l),i.classList.toggle("opacity-0",!l)});const n=document.getElementById("hero-slide-top");n&&(n.textContent=t.top);const o=document.getElementById("hero-slide-script");o&&(o.textContent=t.script);const s=document.getElementById("hero-slide-sub");s&&(s.textContent=t.sub);const r=document.getElementById("hero-slide-cta");r&&(r.textContent=t.cta);const a=document.getElementById("hero-dots");a&&(a.innerHTML=HERO_SLIDES.map((i,l)=>`
          <button onclick="setHeroSlide(${l})" aria-label="Slide ${l+1}" class="h-1.5 rounded-full transition-all ${l===heroIndex?"w-4 bg-berry":"w-1.5 bg-white/85"}"></button>
        `).join(""))}function getCategoryCount(t){return!t||t==="All Cakes"||t==="all"?state.cakes.length:t==="Extra Decorations"?state.decorations.filter(e=>e.inStock).length:t==="Bento"?state.cakes.filter(e=>e.category==="Bento"||e.category==="Mini Cakes"||e.name.toLowerCase().includes("bento")).length:t==="Birthday"?state.cakes.filter(e=>e.category==="Birthday Cakes"||e.category==="Birthday"||e.name.toLowerCase().includes("birthday")||e.popular).length:t==="Wedding"?state.cakes.filter(e=>e.category==="Wedding Cakes"||e.category==="Wedding"||e.name.toLowerCase().includes("wedding")||e.name.toLowerCase().includes("tier")).length:t==="Couples"||t==="Cupples"?state.cakes.filter(e=>e.category==="Couples"||e.category==="Cupples"||e.name.toLowerCase().includes("couple")).length:t==="Anniversary"?state.cakes.filter(e=>e.category==="Anniversary"||e.name.toLowerCase().includes("anniversary")).length:t==="Cupcakes"?state.cakes.filter(e=>e.category==="Cupcakes"||e.category==="Cupples"||e.name.toLowerCase().includes("cupcake")).length:t==="Graduation"?state.cakes.filter(e=>e.category==="Graduation"||e.name.toLowerCase().includes("grad")||e.name.toLowerCase().includes("gold")).length:t==="New Year & Holiday"||t==="Holiday"?state.cakes.filter(e=>e.category==="Holiday"||e.category==="New Year & Holiday"||e.name.toLowerCase().includes("holiday")||e.category==="Fasting Cake"||e.name.toLowerCase().includes("celebration")).length:state.cakes.filter(e=>e.category===t).length}function filterCakesByCategory(t,e){return!t||t==="All Cakes"||t==="all"?e:t==="Bento"?e.filter(n=>n.category==="Bento"||n.category==="Mini Cakes"||n.name.toLowerCase().includes("bento")):t==="Birthday"?e.filter(n=>n.category==="Birthday Cakes"||n.category==="Birthday"||n.name.toLowerCase().includes("birthday")||n.popular):t==="Wedding"?e.filter(n=>n.category==="Wedding Cakes"||n.category==="Wedding"||n.name.toLowerCase().includes("wedding")||n.name.toLowerCase().includes("tier")):t==="Couples"||t==="Cupples"?e.filter(n=>n.category==="Couples"||n.category==="Cupples"||n.name.toLowerCase().includes("couple")):t==="Anniversary"?e.filter(n=>n.category==="Anniversary"||n.name.toLowerCase().includes("anniversary")):t==="Cupcakes"?e.filter(n=>n.category==="Cupcakes"||n.category==="Cupples"||n.name.toLowerCase().includes("cupcake")):t==="Graduation"?e.filter(n=>n.category==="Graduation"||n.name.toLowerCase().includes("grad")||n.name.toLowerCase().includes("gold")):t==="New Year & Holiday"||t==="Holiday"?e.filter(n=>n.category==="Holiday"||n.category==="New Year & Holiday"||n.name.toLowerCase().includes("holiday")||n.category==="Fasting Cake"||n.name.toLowerCase().includes("celebration")):e.filter(n=>n.category===t)}function selectHomeCategory(t){activeHomeCat=t,renderHomeCategories(),renderHomePopular()}function renderHomeCategories(){const t=document.getElementById("home-category-strip");t&&(t.innerHTML=CATEGORY_META.map(e=>{const n=activeHomeCat===e.id,o=getCategoryCount(e.id);return`
          <button onclick="selectHomeCategory('${e.id}')" class="shrink-0 w-[78px] h-[78px] rounded-[18px] p-1.5 flex flex-col items-center justify-center transition-all active:scale-95 cursor-pointer ${n?"bg-blush-50/90 border-[1.5px] border-berry shadow-rose-sm":"bg-white border border-blush-200/70 shadow-rose-sm"}">
            <!-- Proportional Rounded-Square Icon -->
            <div class="w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0 transition-all ${n?"bg-berry text-white shadow-rose-sm":"bg-blush-100/90 text-berry border border-blush-200/50"}">
              ${getLuxurySvg(e.svgKey,"w-4 h-4")}
            </div>
            <div class="mt-1 text-center leading-tight w-full px-0.5">
              <div class="text-[9.5px] font-bold text-ink truncate">${e.name||e.id}</div>
              <div class="text-[8.5px] font-semibold text-ink-muted leading-none mt-0.5">(${o})</div>
            </div>
          </button>
        `}).join(""))}function triggerFavoriteArcAnimation(t){if(!t)return;const e=document.querySelector('[data-ctab="favorites"]'),n=document.getElementById("nav-fav-badge")||e;if(!n)return;const o=t.getBoundingClientRect(),s=n.getBoundingClientRect(),r=o.left+o.width/2,a=o.top+o.height/2,i=s.left+s.width/2,l=s.top+s.height/2,d=i-r,u=l-a,p=Math.hypot(d,u),m=Math.max(90,Math.min(240,p*.38+35)),g=Math.min(a,l)-m,f=r+d*.45+(d>=0?35:-35),b=document.createElement("div");b.className="flying-fav-heart-dual",b.innerHTML=`
        <svg class="w-4 h-4 fill-white text-white" viewBox="0 0 24 24">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      `,b.style.left="0px",b.style.top="0px",document.body.appendChild(b);const y=740,k=performance.now();let C=0;function c(h){const w=h-k,v=Math.min(w/y,1),x=v<.5?4*v*v*v:1-Math.pow(-2*v+2,3)/2,E=1-x,B=E*E*r+2*E*x*f+x*x*i,$=E*E*a+2*E*x*g+x*x*l,A=.9+Math.sin(v*Math.PI)*.55,I=Math.sin(v*Math.PI*2)*18;if(b.style.transform=`translate3d(${B-15}px, ${$-15}px, 0) scale(${A}) rotate(${I}deg)`,h-C>55&&v<.92){C=h;const S=document.createElement("div");S.className="fav-sparkle-dual",S.style.left=`${B-3.5}px`,S.style.top=`${$-3.5}px`,S.style.setProperty("--tx",`${(Math.random()-.5)*26}px`),S.style.setProperty("--ty",`${(Math.random()-.5)*26}px`),document.body.appendChild(S),setTimeout(()=>S.remove(),650)}if(v<1)requestAnimationFrame(c);else{b.remove(),e&&(e.classList.remove("fav-tab-burst"),e.offsetWidth,e.classList.add("fav-tab-burst"),setTimeout(()=>e.classList.remove("fav-tab-burst"),480));for(let S=0;S<6;S++){const M=S/6*Math.PI*2,T=24+Math.random()*14,P=document.createElement("div");P.className="fav-sparkle-dual",P.style.left=`${i-3.5}px`,P.style.top=`${l-3.5}px`,P.style.setProperty("--tx",`${Math.cos(M)*T}px`),P.style.setProperty("--ty",`${Math.sin(M)*T}px`),document.body.appendChild(P),setTimeout(()=>P.remove(),650)}}}requestAnimationFrame(c)}function toggleFavorite(t,e){e&&(e.stopPropagation(),e.preventDefault());const n=state.favorites.indexOf(t),o=n===-1;o?(state.favorites.push(t),showCustomerToast("Saved to Favorites")):(state.favorites.splice(n,1),showCustomerToast("Removed from Favorites")),saveState(),updateCustomerBadges(),invalidateCustomerTabCache("favorites");const s=e?e.currentTarget||e.target&&e.target.closest("button"):null;document.querySelectorAll(`button[data-fav-btn="${t}"]`).forEach(i=>{const l=i.querySelector("svg");l&&(o?(l.setAttribute("fill","currentColor"),l.classList.remove("text-ink"),l.classList.add("text-berry","fill-berry")):(l.setAttribute("fill","none"),l.classList.remove("text-berry","fill-berry"),l.classList.add("text-ink"))),i.classList.remove("animate-fav-pop"),i.offsetWidth,i.classList.add("animate-fav-pop"),setTimeout(()=>i.classList.remove("animate-fav-pop"),400)}),o&&s&&triggerFavoriteArcAnimation(s);const a=document.getElementById("c-tab-favorites");if(a&&!a.classList.contains("hidden")&&!o){const i=s?s.closest("article"):document.getElementById(`cake-card-fav-${t}`);i&&(i.style.transition="transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease",i.style.transform="scale(0.85)",i.style.opacity="0",setTimeout(()=>{i.remove();const l=document.getElementById("favorites-grid");l&&!l.querySelectorAll("article").length&&renderFavoritesTab()},260))}}function renderCakeCard(t,e=0){const n=state.favorites.includes(t.id),o=t.price>=1e4,s=Math.min(e*35,380);return`
        <article id="cake-card-${t.id}" data-cake-id="${t.id}" class="cake-card-animate bg-white rounded-[20px] shadow-rose border border-white overflow-hidden flex flex-col h-full" style="animation-delay: ${s}ms">
          <div class="relative h-[112px] w-full bg-blush-100 overflow-hidden shrink-0 cursor-pointer" onclick="openOrderSheet(${t.id})">
            <img loading="lazy" decoding="async" width="200" height="112" src="${t.img}" alt="${t.name}" class="w-full h-full object-cover ${t.inStock?"":"grayscale opacity-60"}" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
            <button onclick="toggleFavorite(${t.id}, event)" data-fav-btn="${t.id}" aria-label="Favorite ${t.name}" class="fav-action-btn absolute top-2 right-2 w-[26px] h-[26px] rounded-full bg-white/95 shadow-sm flex items-center justify-center active:scale-90 transition-transform cursor-pointer">
              <svg class="fav-heart-icon w-3.5 h-3.5 ${n?"text-berry fill-berry":"text-ink"}" viewBox="0 0 24 24" fill="${n?"currentColor":"none"}" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
            ${t.inStock?"":'<span class="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-full bg-ink/80 text-white text-[9px] font-bold">Sold Out</span>'}
          </div>
          <div class="cake-card-body">
            <h3 onclick="openOrderSheet(${t.id})" class="cake-title-txt cursor-pointer">${t.name}</h3>
            <p class="cake-desc-clamp">${t.desc}</p>
            <div class="cake-rating-row">
              <svg class="w-3 h-3 text-stargold fill-current inline-block" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <span>${t.rating.toFixed(1)} (${t.reviews})</span>
            </div>
            <div class="cake-card-footer">
              <span class="cake-price-txt ${o?"cake-price-lg":""}">${fmtETB(t.price)}</span>
              ${t.inStock?`
                <button onclick="openOrderSheet(${t.id})" class="cake-order-btn">
                  <svg class="w-[8.5px] h-[8.5px] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 7V6a5 5 0 0 1 10 0v1h3a1 1 0 0 1 1 1.1l-1.2 12A2 2 0 0 1 17.8 22H6.2a2 2 0 0 1-2-1.9L3 8.1A1 1 0 0 1 4 7h3zm2 0h6V6a3 3 0 0 0-6 0v1z"/>
                  </svg>
                  <span>Order Now &rarr;</span>
                </button>
              `:`
                <span class="text-[9px] font-bold text-ink-light">Unavailable</span>
              `}
            </div>
          </div>
        </article>
      `}function renderHomePopular(){const t=document.getElementById("home-grid-heading"),e=document.getElementById("home-popular-grid");if(!e)return;let n=state.cakes;if(homeSearch){const o=homeSearch.toLowerCase();n=state.cakes.filter(s=>s.name.toLowerCase().includes(o)||s.desc.toLowerCase().includes(o)||s.category.toLowerCase().includes(o)),t&&(t.textContent=`Search Results (${n.length})`)}else if(activeHomeCat==="Extra Decorations"){const o=state.decorations.filter(i=>!homeSearch||i.name.toLowerCase().includes(homeSearch.toLowerCase())||i.category.toLowerCase().includes(homeSearch.toLowerCase()));t&&(t.textContent=`Extra Decorations (${o.length})`);const s=getDecorationTotals();if(!o.length){e.innerHTML='<div class="col-span-2 bg-white rounded-[22px] p-6 text-center text-xs text-ink-muted shadow-rose">No decorations found.</div>';return}let r="";DECORATION_CATEGORIES.forEach(i=>{const l=o.filter(d=>d.category===i.id);l.length&&(r+=`
            <div class="col-span-2 pt-3 first:pt-0">
              <div class="flex items-center justify-between pb-2 border-b border-blush-200">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-full bg-berry-soft text-berry flex items-center justify-center shadow-2xs shrink-0">
                    ${getLuxurySvg(i.svgKey,"w-3.5 h-3.5")}
                  </div>
                  <div>
                    <h3 class="text-xs font-black text-ink tracking-tight">${i.id}</h3>
                    <p class="text-[9.5px] text-ink-muted">Handcrafted party accents &amp; celebration extras</p>
                  </div>
                </div>
                <span class="text-[10px] font-black text-berry bg-berry-soft px-2.5 py-0.5 rounded-full border border-berry/15">${l.length} ${l.length===1?"Product":"Products"}</span>
              </div>
            </div>
          `,l.forEach((d,u)=>{const p=state.decSelections&&state.decSelections[d.id]||0,m=d.inStock!==!1;r+=`
              <div onclick="handleDecCardClick('${d.id}', event)" class="cake-card-animate transition-all rounded-[22px] p-2.5 flex flex-col justify-between h-[218px] ${m?p>0?"bg-rose-50/45 border-2 border-berry ring-2 ring-berry/35 shadow-rose-sm cursor-pointer":"bg-white border border-white shadow-rose cursor-pointer":"bg-blush-50/70 border border-blush-200 opacity-75 grayscale-[0.25] cursor-not-allowed"}" style="animation-delay: ${u*20}ms">
                <!-- Small category label inside image + status / zoom button -->
                <div class="relative h-28 rounded-[16px] overflow-hidden bg-blush-100 shrink-0 group">
                  <img loading="lazy" decoding="async" width="180" height="120" src="${d.img||SVG_CAKE_FALLBACK}" alt="${d.name}" class="w-full h-full object-cover transition-transform group-hover:scale-105" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
                  <span class="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur text-berry text-[8.5px] font-black shadow-2xs truncate max-w-[70%]">${d.category}</span>
                  
                  ${m?p>0?`
                    <span class="absolute top-2 right-2 px-2 py-0.5 rounded-full btn-berry text-white text-[9px] font-black shadow-xs flex items-center gap-1">
                      <svg class="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                      <span>${p}&times;</span>
                    </span>
                  `:`
                    <button onclick="openDecorationDetailModal('${d.id}'); event.stopPropagation();" title="View decoration detail" class="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 text-berry hover:bg-berry hover:text-white flex items-center justify-center text-[10px] shadow-2xs transition-all">
                      <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    </button>
                  `:`
                    <span class="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-ink/80 text-white text-[8.5px] font-black shadow-2xs uppercase tracking-wider">Sold Out</span>
                  `}
                </div>

                <!-- Clean visual hierarchy: ONLY Product Name below image -->
                <div class="p-1 flex flex-col justify-between flex-1 mt-1">
                  <div class="font-extrabold text-[11.5px] text-ink line-clamp-1 leading-snug" title="${d.name}">${d.name}</div>
                  
                  <!-- Horizontal Footer: Unit Price and Compact Quantity Controls (\u2212 0 +) -->
                  <div class="flex items-center justify-between pt-1.5 border-t border-blush-100 gap-1">
                    <div class="shrink-0">
                      <span class="font-black text-xs text-berry whitespace-nowrap">${fmtETB(d.price)}</span>
                      ${m?"":'<div class="text-[9px] font-bold text-ink-muted">Unavailable</div>'}
                    </div>
                    
                    ${m?`
                      <div class="flex items-center gap-1 shrink-0 bg-blush-50 rounded-full p-0.5 border border-blush-200" onclick="event.stopPropagation()">
                        <button onclick="changeDecQty('${d.id}', -1, event)" aria-label="Decrease quantity" class="w-6 h-6 rounded-full bg-white text-berry hover:bg-berry hover:text-white flex items-center justify-center font-black text-xs shadow-2xs active:scale-90 transition-all ${p===0?"opacity-35 cursor-not-allowed":"cursor-pointer"}">
                          &minus;
                        </button>
                        <span class="w-5 text-center font-extrabold text-xs text-ink select-none">${p}</span>
                        <button onclick="changeDecQty('${d.id}', 1, event)" aria-label="Increase quantity" class="w-6 h-6 rounded-full btn-berry text-white flex items-center justify-center font-black text-xs shadow-2xs active:scale-90 transition-all cursor-pointer">
                          +
                        </button>
                      </div>
                    `:`
                      <span class="px-2.5 py-1 rounded-full bg-blush-100 text-ink-muted text-[10px] font-bold select-none">
                        Sold Out
                      </span>
                    `}
                  </div>
                </div>
              </div>
            `}))});const a=s.count>0?`
          <div class="col-span-2 sticky bottom-2 z-20 bg-white rounded-2xl p-3 shadow-rose-lg border border-blush-200 flex items-center justify-between gap-2 mt-2 animate-scaleIn">
            <div class="min-w-0 flex items-center gap-2">
              <button onclick="clearDecSelections()" title="Cancel &amp; Clear Selection" class="w-7 h-7 rounded-full bg-blush-100 hover:bg-rose-100 text-ink-muted hover:text-berry flex items-center justify-center font-bold text-xs active:scale-90 transition-all shrink-0">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
              <div class="min-w-0">
                <div class="text-[11px] font-black text-ink flex items-center gap-1.5">
                  <span class="w-5 h-5 rounded-full btn-berry text-white flex items-center justify-center text-[10px] font-black">${s.count}</span>
                  <span class="truncate">Decorations Selected</span>
                </div>
                <div class="text-[10.5px] font-black text-berry mt-0.5">${fmtETB(s.total)} combined total</div>
              </div>
            </div>
            <button onclick="orderDecorationsWithCake()" class="px-4 py-2 rounded-full btn-berry text-white text-xs font-black shadow-rose-sm active:scale-95 transition-transform flex items-center gap-1 shrink-0">
              <span>Order Now &rarr;</span>
            </button>
          </div>
        `:"";e.innerHTML=r+a;return}else activeHomeCat!=="All Cakes"&&activeHomeCat!=="all"?(n=filterCakesByCategory(activeHomeCat,state.cakes),t&&(t.textContent=`${activeHomeCat} (${n.length})`)):(n=state.cakes.filter(o=>o.popular&&!o.name.includes("Pastel Mini Bento")&&!o.name.includes("Royal Gala")),n.length<4&&(n=state.cakes.slice(0,4)),n.length<4&&(n=state.cakes.slice(0,4)),t&&(t.textContent="Popular Cakes"));if(!n.length){e.innerHTML=`<div class="col-span-2 bg-white rounded-[20px] p-6 text-center text-xs text-ink-muted shadow-rose">No cakes match "${homeSearch||activeHomeCat}".</div>`;return}e.innerHTML=n.map((o,s)=>renderCakeCard(o,s).replace(`id="cake-card-${o.id}"`,`id="cake-card-fav-${o.id}"`)).join("")}function openMenuCategory(t){menuCat=t,switchCustomerTab("menu"),renderMenuTab()}function renderCategoriesTab(){const t=document.getElementById("categories-full-grid");t&&(t.innerHTML=CATEGORY_META.filter(e=>e.id!=="All Cakes").map((e,n)=>{const o=getCategoryCount(e.id),s=n*35;return`
          <button onclick="openMenuCategory('${e.id}')" class="cake-card-animate bg-white rounded-[22px] p-3.5 shadow-rose border border-white flex flex-col items-center text-center gap-2 active:scale-[0.98] transition-transform" style="animation-delay: ${s}ms">
            <div class="w-16 h-16 rounded-2xl bg-blush-100 text-berry flex items-center justify-center shadow-rose-sm">
              ${getLuxurySvg(e.svgKey,"w-8 h-8")}
            </div>
            <div>
              <div class="text-xs font-extrabold text-ink">${e.name||e.id}</div>
              <div class="text-[10.5px] font-semibold text-berry">${o} Cakes &rarr;</div>
            </div>
          </button>
        `}).join(""))}function selectMenuCategory(t){menuCat=t,renderMenuTab()}function renderMenuTab(){const t=document.getElementById("menu-filter-pills");if(t&&(t.innerHTML=CATEGORY_META.map(s=>{const r=menuCat===s.id;return`
            <button onclick="selectMenuCategory('${s.id}')" class="shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${r?"btn-berry text-white shadow-rose-sm":"bg-white text-ink-muted border border-blush-200"}">
              ${getLuxurySvg(s.svgKey,"w-3.5 h-3.5 shrink-0 inline-block mr-1 "+(r?"text-white":"text-berry"))} <span>${s.name||s.id}</span> <span class="text-[10px] opacity-75">(${getCategoryCount(s.id)})</span>
            </button>
          `}).join("")),menuCat==="Extra Decorations"){const s=document.getElementById("menu-cakes-grid"),r=menuSearch.trim().toLowerCase(),a=state.decorations.filter(d=>!r||d.name.toLowerCase().includes(r)||d.category.toLowerCase().includes(r)||d.desc&&d.desc.toLowerCase().includes(r)),i=getDecorationTotals(),l=document.getElementById("menu-count-label");if(l&&(l.textContent=`Showing ${a.length} celebration decorations across ${DECORATION_CATEGORIES.length} categories`),s){if(!a.length){s.innerHTML=`<div class="col-span-2 bg-white rounded-[20px] p-6 text-center text-xs text-ink-muted shadow-rose">No decorations match "${menuSearch}".</div>`;return}let d="";DECORATION_CATEGORIES.forEach(p=>{const m=a.filter(g=>g.category===p.id);m.length&&(d+=`
              <div class="col-span-2 pt-3 first:pt-0">
                <div class="flex items-center justify-between pb-2 border-b border-blush-200">
                  <div class="flex items-center gap-2">
                    <div class="w-7 h-7 rounded-full bg-berry-soft text-berry flex items-center justify-center shadow-2xs shrink-0">
                      ${getLuxurySvg(p.svgKey,"w-3.5 h-3.5")}
                    </div>
                    <div>
                      <h3 class="text-xs font-black text-ink tracking-tight">${p.id}</h3>
                      <p class="text-[9.5px] text-ink-muted">Handcrafted party accents &amp; celebration extras</p>
                    </div>
                  </div>
                  <span class="text-[10px] font-black text-berry bg-berry-soft px-2.5 py-0.5 rounded-full border border-berry/15">${m.length} ${m.length===1?"Product":"Products"}</span>
                </div>
              </div>
            `,m.forEach((g,f)=>{const b=state.decSelections&&state.decSelections[g.id]||0,y=g.inStock!==!1;d+=`
                <div onclick="handleDecCardClick('${g.id}', event)" class="cake-card-animate transition-all rounded-[22px] p-2.5 flex flex-col justify-between h-[218px] ${y?b>0?"bg-rose-50/45 border-2 border-berry ring-2 ring-berry/35 shadow-rose-sm cursor-pointer":"bg-white border border-white shadow-rose cursor-pointer":"bg-blush-50/70 border border-blush-200 opacity-75 grayscale-[0.25] cursor-not-allowed"}" style="animation-delay: ${f*20}ms">
                  <!-- Small category label inside image + status / zoom button -->
                  <div class="relative h-28 rounded-[16px] overflow-hidden bg-blush-100 shrink-0 group">
                    <img src="${g.img||SVG_CAKE_FALLBACK}" alt="${g.name}" class="w-full h-full object-cover transition-transform group-hover:scale-105" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
                    <span class="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur text-berry text-[8.5px] font-black shadow-2xs truncate max-w-[70%]">${g.category}</span>
                    
                    ${y?b>0?`
                      <span class="absolute top-2 right-2 px-2 py-0.5 rounded-full btn-berry text-white text-[8.5px] font-black shadow-2xs">${b}&times;</span>
                    `:`
                      <button onclick="openDecorationDetailModal('${g.id}'); event.stopPropagation();" title="View decoration detail" class="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 text-berry hover:bg-berry hover:text-white flex items-center justify-center text-[10px] shadow-2xs transition-all">
                        <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                      </button>
                    `:`
                      <span class="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-ink/80 text-white text-[8.5px] font-black shadow-2xs uppercase tracking-wider">Sold Out</span>
                    `}
                  </div>

                  <!-- Clean visual hierarchy: ONLY Product Name below image -->
                  <div class="p-1 flex flex-col justify-between flex-1 mt-1">
                    <div class="font-extrabold text-[11.5px] text-ink line-clamp-1 leading-snug" title="${g.name}">${g.name}</div>
                    
                    <!-- Horizontal Footer: Unit Price and Compact Quantity Controls (\u2212 0 +) -->
                    <div class="flex items-center justify-between pt-1.5 border-t border-blush-100 gap-1">
                      <div class="shrink-0">
                        <span class="font-black text-xs text-berry whitespace-nowrap">${fmtETB(g.price)}</span>
                        ${y?"":'<div class="text-[9px] font-bold text-ink-muted">Unavailable</div>'}
                      </div>
                      
                      ${y?`
                        <div class="flex items-center gap-1 shrink-0 bg-blush-50 rounded-full p-0.5 border border-blush-200" onclick="event.stopPropagation()">
                          <button onclick="changeDecQty('${g.id}', -1, event)" aria-label="Decrease quantity" class="w-6 h-6 rounded-full bg-white text-berry hover:bg-berry hover:text-white flex items-center justify-center font-black text-xs shadow-2xs active:scale-90 transition-all ${b===0?"opacity-35 cursor-not-allowed":"cursor-pointer"}">
                            &minus;
                          </button>
                          <span class="w-5 text-center font-extrabold text-xs text-ink select-none">${b}</span>
                          <button onclick="changeDecQty('${g.id}', 1, event)" aria-label="Increase quantity" class="w-6 h-6 rounded-full btn-berry text-white flex items-center justify-center font-black text-xs shadow-2xs active:scale-90 transition-all cursor-pointer">
                            +
                          </button>
                        </div>
                      `:`
                        <span class="px-2.5 py-1 rounded-full bg-blush-100 text-ink-muted text-[10px] font-bold select-none">
                          Sold Out
                        </span>
                      `}
                    </div>
                  </div>
                </div>
              `}))});const u=i.count>0?`
            <div class="col-span-2 sticky bottom-2 z-20 bg-white rounded-2xl p-3 shadow-rose-lg border border-blush-200 flex items-center justify-between gap-2 mt-2 animate-scaleIn">
              <div class="min-w-0 flex items-center gap-2">
                <button onclick="clearDecSelections()" title="Cancel &amp; Clear Selection" class="w-7 h-7 rounded-full bg-blush-100 hover:bg-rose-100 text-ink-muted hover:text-berry flex items-center justify-center font-bold text-xs active:scale-90 transition-all shrink-0">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
                <div class="min-w-0">
                  <div class="text-[11px] font-black text-ink flex items-center gap-1.5">
                    <span class="w-5 h-5 rounded-full btn-berry text-white flex items-center justify-center text-[10px] font-black">${i.count}</span>
                    <span class="truncate">Decorations Selected</span>
                  </div>
                  <div class="text-[10.5px] font-black text-berry mt-0.5">${fmtETB(i.total)} combined total</div>
                </div>
              </div>
              <button onclick="orderDecorationsWithCake()" class="px-4 py-2 rounded-full btn-berry text-white text-xs font-black shadow-rose-sm active:scale-95 transition-transform flex items-center gap-1 shrink-0">
                <span>Order Now &rarr;</span>
              </button>
            </div>
          `:"";s.innerHTML=d+u}return}let e=[...state.cakes];if(menuCat!=="All Cakes"&&menuCat!=="all"&&(e=filterCakesByCategory(menuCat,e)),menuSearch.trim()){const s=menuSearch.trim().toLowerCase();e=e.filter(r=>r.name.toLowerCase().includes(s)||r.desc.toLowerCase().includes(s))}menuSort==="price-asc"?e.sort((s,r)=>s.price-r.price):menuSort==="price-desc"?e.sort((s,r)=>r.price-s.price):menuSort==="rating"&&e.sort((s,r)=>r.rating-s.rating);const n=document.getElementById("menu-count-label");n&&(n.textContent=`Showing ${e.length} handcrafted cakes`);const o=document.getElementById("menu-cakes-grid");if(o){if(!e.length){o.innerHTML='<div class="col-span-2 bg-white rounded-[20px] p-6 text-center text-xs text-ink-muted shadow-rose">No cakes found.</div>';return}o.innerHTML=e.map((s,r)=>renderCakeCard(s,r)).join("")}}function renderFavoritesTab(){const t=document.getElementById("favorites-grid");if(!t)return;const e=state.cakes.filter(n=>state.favorites.includes(n.id));if(!e.length){t.innerHTML=`
          <div class="col-span-2 bg-white rounded-[22px] p-7 text-center shadow-rose space-y-2">
            <div class="w-16 h-16 rounded-full bg-blush-100 text-berry/70 flex items-center justify-center mx-auto mb-2"><svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg></div>
            <div class="text-xs font-extrabold text-ink">No Favorites Saved Yet</div>
            <p class="text-[11px] text-ink-muted">Tap the heart on any cake to save it here.</p>
            <button onclick="switchCustomerTab('menu')" class="mt-1 px-4 py-2 rounded-full btn-berry text-white text-xs font-bold">Explore Menu</button>
          </div>
        `;return}t.innerHTML=e.map((n,o)=>renderCakeCard(n,o)).join("")}function updateCartQty(t,e){const n=state.cart.findIndex(o=>o.id===t);n!==-1&&(state.cart[n].qty+=e,state.cart[n].qty<=0&&state.cart.splice(n,1),saveState(),syncAll())}function clearCart(){state.cart=[],invalidateCustomerTabCache("cart"),saveState(),syncAll(),showCustomerToast("Cart cleared")}function renderCartTab(){const t=document.getElementById("cart-items-list"),e=document.getElementById("cart-summary-box"),n=document.getElementById("cart-clear-btn");if(!t)return;if(!state.cart.length){t.innerHTML=`
          <div class="bg-white rounded-[22px] p-7 text-center shadow-rose space-y-2">
            <div class="w-16 h-16 rounded-full bg-blush-100 text-berry/70 flex items-center justify-center mx-auto mb-2"><svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg></div>
            <div class="text-xs font-extrabold text-ink">Your Cake Cart is Empty</div>
            <p class="text-[11px] text-ink-muted">Choose a handcrafted cake from Bole Kitchen.</p>
            <button onclick="switchCustomerTab('home')" class="mt-1 px-4 py-2 rounded-full btn-berry text-white text-xs font-bold">Browse Cakes</button>
          </div>
        `,e.classList.add("hidden"),n.classList.add("hidden");return}n.classList.remove("hidden"),e.classList.remove("hidden");const o=state.cart.reduce((r,a)=>r+a.unitPrice*a.qty,0),s=state.shop.deliveryFee;document.getElementById("cart-subtotal-txt").textContent=fmtETB(o),document.getElementById("cart-delivery-txt").textContent=fmtETB(s),document.getElementById("cart-total-txt").textContent=fmtETB(o+s),t.innerHTML=state.cart.map(r=>`
        <div class="bg-white rounded-[18px] p-3 shadow-rose-sm border border-white flex items-center gap-3">
          <img loading="lazy" decoding="async" width="56" height="56" src="${r.img}" alt="${r.name}" class="w-14 h-14 rounded-xl object-cover shrink-0" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
          <div class="min-w-0 flex-1">
            <div class="text-xs font-extrabold text-ink truncate">${r.name}</div>
            <div class="text-[10.5px] text-ink-muted truncate">${r.size} \u2022 ${r.flavor}</div>
            <div class="text-xs font-extrabold text-berry mt-1">${fmtETB(r.unitPrice*r.qty)}</div>
          </div>
          <div class="flex items-center gap-1.5 bg-blush-100 rounded-full p-1 shrink-0">
            <button onclick="updateCartQty('${r.id}', -1)" class="w-6 h-6 rounded-full bg-white text-ink font-extrabold text-xs shadow-xs">\u2212</button>
            <span class="text-xs font-extrabold w-4 text-center">${r.qty}</span>
            <button onclick="updateCartQty('${r.id}', 1)" class="w-6 h-6 rounded-full btn-berry text-white font-extrabold text-xs shadow-xs">+</button>
          </div>
        </div>
      `).join("")}const WIZARD_META={1:{title:"Cake Size & Flavor"},2:{title:"Make It Extra Special"},3:{title:"Chef Calligraphy Note"},4:{title:"Delivery & Contact"},5:{title:"Payment Plan & Receipt"},6:{title:"Review & Submit Order"}};function getDecorationTotals(t=null){const e=t!==null?t:state.decSelections||{};let n=0,o=0;const s=[];for(const[r,a]of Object.entries(e)){const i=Number(a)||0;if(i>0){const l=state.decorations.find(d=>d.id===r);if(l){const d=l.price*i;n+=i,o+=d,s.push({id:l.id,name:l.name,category:l.category,price:l.price,qty:i,subtotal:d,img:l.img,requiresNumber:l.requiresNumber||l.name.toLowerCase().includes("number")||l.name.toLowerCase().includes("balloon")})}}}return{count:n,total:o,items:s}}let currentDetailDecId=null,detailDecQty=1;function openDecorationDetailModal(t){const e=state.decorations.find(d=>d.id===t);if(!e)return;currentDetailDecId=t;const n=state.decSelections&&state.decSelections[t]||0;detailDecQty=n>0?n:1;const o=document.getElementById("dec-modal-cat"),s=document.getElementById("dec-modal-img"),r=document.getElementById("dec-modal-title"),a=document.getElementById("dec-modal-price"),i=document.getElementById("dec-modal-desc");o&&(o.textContent=e.category),s&&(s.src=e.img||SVG_CAKE_FALLBACK),r&&(r.textContent=e.name),a&&(a.textContent=`${fmtETB(e.price)} each`),i&&(i.textContent=e.desc||"Handpicked celebration extra from MAK CAKE bakery collection. Perfect complement for handcrafted birthday and celebration cakes."),updateDecModalQtyUI();const l=document.getElementById("decoration-detail-modal");l&&l.classList.remove("hidden")}function updateDecModalQtyUI(){const t=state.decorations.find(s=>s.id===currentDetailDecId),e=document.getElementById("dec-modal-qty"),n=document.getElementById("dec-modal-subtotal"),o=document.getElementById("dec-modal-confirm-btn");e&&(e.textContent=detailDecQty),t&&n&&(n.textContent=`Subtotal: ${fmtETB(t.price*detailDecQty)}`),o&&(o.innerHTML=`<span>Save &amp; Select ${detailDecQty}&times; (${t?fmtETB(t.price*detailDecQty):""})</span>`)}function adjustDecModalQty(t){detailDecQty=Math.max(1,detailDecQty+t),updateDecModalQtyUI()}function confirmDecModalSelection(){if(!currentDetailDecId)return;state.decSelections=state.decSelections||{},state.decSelections[currentDetailDecId]=detailDecQty,typeof sheet<"u"&&sheet&&(sheet.decQuantities={...state.decSelections},sheet.addons=Object.keys(state.decSelections).filter(o=>state.decSelections[o]>0)),saveState(),closeDecorationDetailModal();const t=document.getElementById("customer-scroll-area"),e=t?t.scrollTop:0;menuCat==="Extra Decorations"&&renderMenuTab(),activeHomeCat==="Extra Decorations"&&renderHomePopular(),t&&e>0&&(t.scrollTop=e);const n=document.getElementById("order-wizard-page");if(n&&!n.classList.contains("hidden")&&typeof sheet<"u"&&sheet&&sheet.step){const o=document.getElementById("order-sheet-body"),s=o?o.scrollTop:0;renderOrderSheet(),o&&s>0&&(o.scrollTop=s)}showCustomerToast(`\u2728 Saved ${detailDecQty}\xD7 decoration selection`)}function closeDecorationDetailModal(){const t=document.getElementById("decoration-detail-modal");t&&t.classList.add("hidden"),currentDetailDecId=null}function handleDecCardClick(t,e){if(e&&e.target&&(e.target.tagName==="BUTTON"||e.target.closest("button")))return;const n=state.decorations.find(s=>s.id===t);if(!n)return;if(n.inStock===!1){showCustomerToast(`"${n.name}" is currently Sold Out`);return}(state.decSelections&&state.decSelections[t]||0)===0?(changeDecQty(t,1,e),showCustomerToast("\u2728 Added to celebration decorations")):openDecorationDetailModal(t)}function changeDecQty(t,e,n){n&&(n.stopPropagation(),n.preventDefault&&n.target&&n.target.tagName==="BUTTON"&&n.preventDefault());const o=state.decorations.find(d=>d.id===t);if(o&&o.inStock===!1&&e>0){showCustomerToast(`"${o.name}" is currently Sold Out`);return}state.decSelections=state.decSelections||{};const s=Number(state.decSelections[t])||0,r=Math.max(0,s+e);r===0?delete state.decSelections[t]:state.decSelections[t]=r,typeof sheet<"u"&&sheet&&(sheet.decQuantities={...state.decSelections},sheet.addons=Object.keys(state.decSelections).filter(d=>state.decSelections[d]>0)),saveState();const a=document.getElementById("customer-scroll-area"),i=a?a.scrollTop:0;menuCat==="Extra Decorations"&&renderMenuTab(),activeHomeCat==="Extra Decorations"&&renderHomePopular(),a&&i>0&&(a.scrollTop=i);const l=document.getElementById("order-wizard-page");if(l&&!l.classList.contains("hidden")&&typeof sheet<"u"&&sheet&&sheet.step){const d=document.getElementById("order-sheet-body"),u=d?d.scrollTop:0;renderOrderSheet(),d&&u>0&&(d.scrollTop=u)}}function openCakePickerModal(){const t=getDecorationTotals(state.decSelections),e=document.getElementById("cake-picker-sub");e&&(e.textContent=`\u2728 ${t.count} decoration${t.count!==1?"s":""} (${fmtETB(t.total)}) will be added`);const n=document.getElementById("cake-picker-list");n&&(n.innerHTML=state.cakes.map(s=>`
          <div onclick="selectCakeForDecorations('${s.id}')" class="bg-blush-50 hover:bg-rose-50 border border-blush-200 hover:border-berry p-2.5 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-all active:scale-[0.98]">
            <div class="flex items-center gap-2.5 min-w-0">
              <img src="${s.img||SVG_CAKE_FALLBACK}" alt="${s.name}" class="w-12 h-12 rounded-xl object-cover shrink-0" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
              <div class="min-w-0">
                <div class="text-xs font-bold text-ink truncate">${s.name}</div>
                <div class="text-[10px] text-ink-muted line-clamp-1">${s.desc}</div>
                <div class="text-[10px] font-black text-berry mt-0.5">Base: ${fmtETB(s.price)}</div>
              </div>
            </div>
            <button class="px-3 py-1.5 rounded-full btn-berry text-white text-[10.5px] font-bold shrink-0 shadow-2xs">
              Select &rarr;
            </button>
          </div>
        `).join(""));const o=document.getElementById("cake-picker-modal");o&&o.classList.remove("hidden")}function closeCakePickerModal(){const t=document.getElementById("cake-picker-modal");t&&t.classList.add("hidden")}function selectCakeForDecorations(t){closeCakePickerModal();const e=state.cakes.find(o=>o.id===t||String(o.id)===String(t));if(!e)return;openOrderSheet(e),sheet.step=2,sheet.decChoice="add",renderOrderSheet();const n=getDecorationTotals(sheet.decQuantities);showCustomerToast(`\u2728 ${n.count} decorations paired with ${e.name}!`)}function clearDecSelections(){state.decSelections={},typeof sheet<"u"&&sheet&&(sheet.decQuantities={},sheet.addons=[]),saveState(),activeHomeCat==="Extra Decorations"&&renderHomePopular(),menuCat==="Extra Decorations"&&renderMenuTab();const t=document.getElementById("order-wizard-page");t&&!t.classList.contains("hidden")&&typeof sheet<"u"&&sheet&&sheet.step&&renderOrderSheet(),showCustomerToast("Decoration selection cleared")}function openDecorationOrderChoice(){const t=getDecorationTotals(state.decSelections);if(t.count===0){showCustomerToast("Please select at least 1 decoration");return}const e=document.getElementById("dec-choice-sub");e&&(e.textContent=`${t.count} decoration${t.count!==1?"s":""} selected (${fmtETB(t.total)})`);const n=document.getElementById("dec-choice-modal");n&&n.classList.remove("hidden")}function closeDecorationOrderChoice(){const t=document.getElementById("dec-choice-modal");t&&t.classList.add("hidden")}function openCakePickerModalFromChoice(){closeDecorationOrderChoice(),openCakePickerModal()}function orderDecorationsWithCake(){openDecorationOrderChoice()}function openDecorationQuickOrder(t){changeDecQty(t,1),openDecorationOrderChoice()}function orderDecorationsOnly(){closeDecorationOrderChoice(),closeCakePickerModal();const t=getDecorationTotals(state.decSelections);if(t.count===0){showCustomerToast("Please select at least 1 decoration");return}sheet={step:4,mode:"decorations_only",cake:null,size:"Party Pack",flavor:"Decorations Only",decChoice:"add",decQuantities:{...state.decSelections||{}},addons:Object.keys(state.decSelections||{}).filter(e=>state.decSelections[e]>0),candleNumber:"",inscription:"",fulfillment:"delivery",name:typeof sheet<"u"&&sheet&&sheet.name?sheet.name:"",phone:typeof sheet<"u"&&sheet&&sheet.phone?sheet.phone:"",address:typeof sheet<"u"&&sheet&&sheet.address?sheet.address:"",dateOption:"tomorrow",datePickerOpen:!1,date:tomorrowStr(),dateLabel:"Tomorrow",timeSlot:TIME_SLOTS[1],paymentPlan:"full",paymentMethod:"Telebirr",receiptImg:"",receiptName:"",errors:{}},document.getElementById("order-wizard-page").classList.remove("hidden"),renderOrderSheet(),showCustomerToast(`\u2728 Proceeding to checkout with ${t.count} decorations!`)}function openOrderSheet(t){closeContactSheet(),closeNotificationsSheet(),closeTrackerSheet();let e=null;typeof t=="object"&&t!==null?e=t:e=state.cakes.find(n=>n.id===t||String(n.id)===String(t)),e&&(sheet={step:1,mode:"single",cake:e,size:SIZES[0].id,flavor:FLAVORS[0],decChoice:Object.keys(state.decSelections||{}).length?"add":null,decQuantities:{...state.decSelections||{}},addons:Object.keys(state.decSelections||{}).filter(n=>state.decSelections[n]>0),candleNumber:"",inscription:sheet.inscription||"",fulfillment:"delivery",name:sheet.name||"",phone:sheet.phone||"",address:sheet.address||"",dateOption:"tomorrow",datePickerOpen:!1,date:tomorrowStr(),dateLabel:"Tomorrow",timeSlot:TIME_SLOTS[1],paymentPlan:"full",paymentMethod:"Telebirr",receiptImg:"",receiptName:"",errors:{}},sheetAddonCat=DECORATION_CATEGORIES[0].id,document.getElementById("order-wizard-page").classList.remove("hidden"),renderOrderSheet())}function openCheckoutFromCart(){closeContactSheet(),closeNotificationsSheet(),closeTrackerSheet(),state.cart.length&&(sheet={step:4,mode:"cart",cake:null,size:"",flavor:"",decChoice:null,addons:[],candleNumber:"",inscription:"",fulfillment:"delivery",name:sheet.name||"",phone:sheet.phone||"",address:sheet.address||"",dateOption:"tomorrow",datePickerOpen:!1,date:tomorrowStr(),dateLabel:"Tomorrow",timeSlot:TIME_SLOTS[1],paymentPlan:"full",paymentMethod:"Telebirr",receiptImg:"",receiptName:"",errors:{}},document.getElementById("order-wizard-page").classList.remove("hidden"),renderOrderSheet())}function closeOrderSheet(){document.getElementById("order-wizard-page").classList.add("hidden")}function goToWizardStep(t){const e=sheet.mode==="cart"||sheet.mode==="decorations_only"?4:1;sheet.step=Math.max(e,Math.min(6,t)),sheet.errors={};try{history.pushState({makStep:sheet.step},"")}catch{}renderOrderSheet();const n=document.getElementById("order-sheet-body");n&&(n.scrollTop=0)}function wizardBackOrClose(){const t=sheet.mode==="cart"||sheet.mode==="decorations_only"?4:1;sheet.step<=t?closeOrderSheet():wizardBack()}function wizardBack(){const t=sheet.mode==="cart"||sheet.mode==="decorations_only"?4:1;if(sheet.step===2&&sheet.decChoice==="add"){sheet.decChoice=null,renderOrderSheet();return}sheet.step>t&&goToWizardStep(sheet.step-1)}function getPhoneDigits(t){return(t||"").replace(/\D/g,"")}function wizardNext(){if(sheet.step===2&&hasNumberDecorationSelected()&&!sheet.candleNumber){sheet.errors=sheet.errors||{},sheet.errors.candleNumber=!0,renderOrderSheet(),showCustomerToast("Please enter the candle or balloon milestone number");return}if(sheet.errors={},sheet.step===4){const t=getPhoneDigits(sheet.phone);if(sheet.name.trim()||(sheet.errors.name="\u26A0\uFE0F Required: Please enter your full name"),t.length?!t.startsWith("09")&&!t.startsWith("07")?sheet.errors.phone="\u26A0\uFE0F Required: Must start with 09 or 07 (e.g. 0911232323)":t.length!==10&&(sheet.errors.phone=`\u26A0\uFE0F Required: Must be exactly 10 digits (${t.length}/10 entered)`):sheet.errors.phone="\u26A0\uFE0F Required: Please enter your phone number",sheet.address.trim()||(sheet.errors.address="\u26A0\uFE0F Required: Please enter your Addis Ababa delivery address"),Object.keys(sheet.errors).length>0){renderOrderSheet();const e=sheet.errors.name?"step4-name-input":sheet.errors.phone?"step4-phone-input":"step4-address-input",n=sheet.errors.name||sheet.errors.phone||sheet.errors.address;highlightMissingRequirement(e,n),showCustomerToast("Please fill in the highlighted required fields");return}}if(sheet.step===5&&sheet.paymentPlan!=="cod"&&!sheet.receiptImg){sheet.errors.receipt=`\u26A0\uFE0F Required: Please upload your ${sheet.paymentMethod} transfer receipt screenshot`,renderOrderSheet(),highlightMissingRequirement("step5-receipt-dropzone",sheet.errors.receipt),showCustomerToast(`Upload ${sheet.paymentMethod} receipt first`);return}sheet.step<6&&goToWizardStep(sheet.step+1)}function chooseDecStep(t){t==="add"?(sheet.decChoice="add",renderOrderSheet()):(sheet.decChoice=null,goToWizardStep(3))}function selectDateOption(t){sheet.dateOption=t,t==="today"?(sheet.date=todayStr(),sheet.dateLabel="Today",sheet.datePickerOpen=!1):t==="tomorrow"?(sheet.date=tomorrowStr(),sheet.dateLabel="Tomorrow",sheet.datePickerOpen=!1):sheet.datePickerOpen=!sheet.datePickerOpen,renderOrderSheet()}function pickWeekDate(t,e,n){sheet.dateOption="select",sheet.date=t,sheet.dateLabel=`${e} (${n})`,sheet.datePickerOpen=!1,renderOrderSheet()}function handlePhoneInput(t){sheet.phone=t,sheet.errors.phone&&delete sheet.errors.phone;let e=getPhoneDigits(t);if(e.startsWith("251")&&e.length>=5&&(e.startsWith("2519")||e.startsWith("2517"))){e="0"+e.slice(3),t=e,sheet.phone=t;const r=document.getElementById("step4-phone-input");r&&(r.value=t)}const n=document.getElementById("step4-phone-input"),o=document.getElementById("step4-phone-hint");if(!n||!o)return;n.classList.remove("border-blush-200","bg-blush-50","text-ink","border-emerald-500","bg-emerald-50/70","text-emerald-800","ring-emerald-200","border-berry","bg-berry-soft/60","text-berry","ring-berry/25");const s=e.startsWith("09")||e.startsWith("07");e.length===0?(n.classList.add("border-blush-200","bg-blush-50","text-ink"),o.className="text-[10px] font-semibold text-ink-muted mt-1",o.textContent="Must start with 09 or 07 (10 digits)"):s?e.length===10?(n.classList.add("border-emerald-500","bg-emerald-50/70","text-emerald-800"),o.className="text-[10px] font-bold text-emerald-600 mt-1",o.textContent="\u2713 Valid phone number ("+(e.startsWith("09")?"Ethio Telecom 09":"Safaricom 07")+")"):e.length<10?(n.classList.add("border-berry","bg-berry-soft/60","text-berry"),o.className="text-[10px] font-bold text-berry mt-1",o.textContent=`${e.length}/10 digits \u2014 enter ${10-e.length} more digit${10-e.length>1?"s":""}`):(n.classList.add("border-berry","bg-berry-soft/60","text-berry","ring-1","ring-berry/25"),o.className="text-[10px] font-bold text-berry mt-1",o.textContent=`\u274C ${e.length}/10 digits \u2014 too many digits (maximum 10 digits)`):(n.classList.add("border-berry","bg-berry-soft/60","text-berry","ring-1","ring-berry/25"),o.className="text-[10px] font-bold text-berry mt-1",o.textContent="\u274C Must start with 09 or 07 \u2014 other prefixes not accepted")}function setPaymentPlan(t){sheet.paymentPlan=t,sheet.errors.receipt&&delete sheet.errors.receipt,t==="cod"?sheet.paymentMethod="Pay on Delivery":sheet.paymentMethod==="Pay on Delivery"&&(sheet.paymentMethod="Telebirr"),renderOrderSheet()}function handleReceiptUpload(t){const e=t.files&&t.files[0];if(!e)return;if(!e.type||!e.type.startsWith("image/")){showCustomerToast("Please select a photo or screenshot only (PNG, JPG, WEBP)"),t.value="";return}const n=new FileReader;n.onload=function(o){const s=new Image;s.onload=function(){try{const a=Math.min(1,720/s.width),i=document.createElement("canvas");i.width=Math.round(s.width*a),i.height=Math.round(s.height*a),i.getContext("2d").drawImage(s,0,0,i.width,i.height),sheet.receiptImg=i.toDataURL("image/jpeg",.72)}catch{sheet.receiptImg=o.target.result}sheet.receiptName=e.name,sheet.errors.receipt&&delete sheet.errors.receipt,renderOrderSheet(),showCustomerToast("Transfer screenshot received & attached")},s.src=o.target.result},n.readAsDataURL(e)}function clearReceiptUpload(){sheet.receiptImg="",sheet.receiptName="",renderOrderSheet()}function computeSheetTotal(){let t=0,e=0;if(sheet.mode==="single"&&sheet.cake){const i=SIZES.find(m=>m.id===sheet.size)||SIZES[0],l=typeof productConfigState<"u"&&sheet.weightId?(productConfigState.weights||[]).find(m=>m.id===sheet.weightId&&m.enabled!==!1):null,d=typeof productConfigState<"u"&&l?(productConfigState.pricingRules||[]).find(m=>m.enabled!==!1&&m.sizeId===i.id&&m.weightId===l.id):null,u=typeof productConfigState<"u"&&Array.isArray(sheet.customOptions)?sheet.customOptions.reduce((m,g)=>{const f=(productConfigState.customizations||[]).find(b=>b.id===g&&b.enabled!==!1);return m+(f&&Number(f.charge)||0)},0):0;t=sheet.cake.price+i.add+(l&&Number(l.add)||0)+(d&&Number(d.extraCharge)||0)+u,e=getDecorationTotals(sheet.decQuantities).total}else sheet.mode==="decorations_only"?(t=0,e=getDecorationTotals(sheet.decQuantities).total):t=state.cart.reduce((i,l)=>i+l.unitPrice*l.qty,0);const n=sheet.fulfillment==="pickup"||state.shop.deliveryEnabled===!1?0:state.shop.deliveryFee||0,o=(sheet.promoDiscount||0)+(sheet.mysteryRewardDiscount||0),s=Math.max(0,t+e+n-o),r=sheet.paymentPlan==="full"?s:sheet.paymentPlan==="half"?Math.round(s*.5):0,a=Math.max(0,s-r);return{base:t,addSum:e,deliv:n,total:s,dueNow:r,balanceDue:a}}function renderOrderSheet(){const t=document.getElementById("order-sheet-body"),e=computeSheetTotal(),n=sheet.mode==="single"&&sheet.cake,o=sheet.mode==="cart"||sheet.mode==="decorations_only",s=o?4:1,r=o?sheet.step-3:sheet.step,a=o?3:6;document.getElementById("wizard-step-kicker").textContent=o?`Step ${r} of ${a}`:`Step ${sheet.step} of 6`,document.getElementById("wizard-step-title").textContent=WIZARD_META[sheet.step].title,document.getElementById("wizard-progress-bars").innerHTML=(o?[4,5,6]:[1,2,3,4,5,6]).map(f=>`
        <div class="h-1.5 rounded-full transition-all ${f===sheet.step?"bg-berry":f<sheet.step?"bg-blush-400":"bg-blush-200"}"></div>
      `).join(""),document.getElementById("order-sheet-total-label").textContent=sheet.step>=5&&sheet.paymentPlan==="half"?"50% Deposit Now":"Order Total",document.getElementById("order-sheet-total").textContent=fmtETB(sheet.step>=5&&sheet.paymentPlan==="half"?e.dueNow:e.total);const i=document.getElementById("wizard-top-total"),l=document.getElementById("wizard-top-total-label");i&&(i.textContent=fmtETB(sheet.step>=5&&sheet.paymentPlan==="half"?e.dueNow:e.total)),l&&(l.textContent=sheet.step>=5&&sheet.paymentPlan==="half"?"50% Deposit":"Order Total");const d=document.getElementById("order-back-btn"),u=document.getElementById("order-next-btn"),p=document.getElementById("order-submit-btn");d.classList.toggle("hidden",sheet.step<=s&&!(sheet.step===2&&sheet.decChoice==="add")),u.classList.toggle("hidden",sheet.step===6||sheet.step===2&&sheet.decChoice===null),p.classList.toggle("hidden",sheet.step!==6);const m=sheet.addons.map(f=>state.decorations.find(b=>b.id===f)).filter(Boolean);if(sheet.step===1&&n){t.innerHTML=`
          <div class="bg-white rounded-[20px] p-3 shadow-rose-sm border border-white flex items-center gap-3">
            <img loading="lazy" decoding="async" width="64" height="64" src="${sheet.cake.img}" alt="${sheet.cake.name}" class="w-16 h-16 rounded-2xl object-cover shrink-0" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
            <div class="min-w-0 flex-1">
              <div class="text-sm font-extrabold text-ink truncate">${sheet.cake.name}</div>
              <div class="text-[11px] text-ink-muted line-clamp-2 mt-0.5">${sheet.cake.desc}</div>
              <div class="text-xs font-extrabold text-berry mt-1">Base: ${fmtETB(sheet.cake.price)}</div>
            </div>
          </div>

          <div class="bg-white rounded-[20px] p-4 shadow-rose-sm border border-white space-y-2.5">
            <div class="text-xs font-extrabold text-ink">1. Choose Cake Size</div>
            <div class="grid grid-cols-2 gap-2">
              ${SIZES.map((f,b)=>{const y=sheet.size===f.id;return`
                  <button onclick="selectSheetSize(${b})" class="p-2.5 rounded-2xl border text-left transition-all ${y?"bg-berry-soft border-berry border-[1.5px] shadow-rose-sm":"bg-blush-50 border-blush-200"}">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-extrabold text-ink">${f.label}</span>
                      <span class="text-[10px] font-bold text-berry">${f.add?"+"+f.add:"Base"}</span>
                    </div>
                    <div class="text-[10px] text-ink-muted mt-0.5">${f.serves}</div>
                  </button>
                `}).join("")}
            </div>
          </div>

          
          ${typeof productConfigState<"u"&&productConfigState.enabled!==!1&&productConfigState.sectionsEnabled?.weights!==!1&&(productConfigState.weights||[]).some(f=>f.enabled!==!1)?`
          <div class="bg-white rounded-[20px] p-4 shadow-rose-sm border border-white space-y-2">
            <div class="text-xs font-extrabold text-ink">1b. Cake Weight (Optional)</div>
            <div class="flex flex-wrap gap-1.5">
              ${productConfigState.weights.filter(f=>f.enabled!==!1).map(f=>{const b=sheet.weightId===f.id;return`<button onclick="selectSheetWeight('${f.id}')" class="px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all ${b?"btn-berry text-white border-transparent shadow-rose-sm":"bg-blush-50 text-ink border-blush-200"}">${formatCakeWeight(f)} ${f.add?"(+"+f.add+")":""}</button>`}).join("")}
            </div>
          </div>`:""}

          ${typeof productConfigState<"u"&&productConfigState.enabled!==!1&&productConfigState.sectionsEnabled?.options!==!1&&(productConfigState.customizations||[]).some(f=>f.enabled!==!1)?`
          <div class="bg-white rounded-[20px] p-4 shadow-rose-sm border border-white space-y-2">
            <div class="text-xs font-extrabold text-ink">1c. Customization Options</div>
            <div class="space-y-1.5">
              ${productConfigState.customizations.filter(f=>f.enabled!==!1).map(f=>{const b=Array.isArray(sheet.customOptions)&&sheet.customOptions.includes(f.id);return`<button onclick="toggleSheetCustomOpt('${f.id}')" class="w-full px-3 py-2 rounded-xl border text-left flex items-center justify-between text-[11px] font-bold transition-all ${b?"bg-berry-soft border-berry text-berry":"bg-blush-50 border-blush-200 text-ink"}"><span>${f.name}</span><span>${f.charge?"+"+f.charge+" ETB":"Included"}</span></button>`}).join("")}
            </div>
          </div>`:""}

          <div class="bg-white rounded-[20px] p-4 shadow-rose-sm border border-white space-y-2.5">
            <div class="text-xs font-extrabold text-ink">2. Choose Sponge Flavor</div>
            <div class="flex flex-wrap gap-1.5">
              ${FLAVORS.map((f,b)=>{const y=sheet.flavor===f;return`
                  <button onclick="selectSheetFlavor(${b})" class="px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all ${y?"btn-berry text-white border-transparent shadow-rose-sm":"bg-blush-50 text-ink border-blush-200"}">
                    ${f}
                  </button>
                `}).join("")}
            </div>
          </div>
        `;return}if(sheet.step===2&&n){if(sheet.decChoice===null){t.innerHTML=`
            <div class="bg-white rounded-[24px] p-5 shadow-rose border border-white text-center space-y-4 mt-2">
              <div class="w-16 h-16 mx-auto rounded-full bg-berry-soft text-berry flex items-center justify-center shadow-rose-sm">${getLuxurySvg("sparkles","w-8 h-8")}</div>
              <div class="space-y-1.5">
                <div class="text-[11px] font-extrabold uppercase tracking-wider text-berry">Step 2 \u2013 Make It Extra Special</div>
                <h4 class="text-base font-extrabold text-ink leading-snug">Would you like to add a little something extra to your special moment?</h4>
                <p class="text-xs text-ink-muted leading-relaxed">Explore our extra decorations and make your celebration even more memorable!</p>
              </div>

              <div class="grid grid-cols-3 gap-2 pt-1">
                ${SEED_DECORATIONS.slice(0,3).map(b=>`
                  <div class="rounded-2xl overflow-hidden border border-blush-200 bg-blush-50">
                    <img src="${b.img}" alt="${b.name}" class="w-full h-16 object-cover" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
                  </div>
                `).join("")}
              </div>

              <div class="space-y-2.5 pt-2">
                <button onclick="chooseDecStep('add')" class="w-full py-3.5 rounded-full btn-berry text-white font-extrabold text-xs shadow-rose-md active:scale-[0.98] transition-transform">
                  ${getLuxurySvg("sparkles","w-4 h-4 text-white inline-block mr-1")} Add Decorations
                </button>
                <button onclick="chooseDecStep('skip')" class="w-full py-3 rounded-full bg-blush-100 border border-blush-300 text-ink font-bold text-xs active:scale-[0.98] transition-transform">
                  Continue Without Extras &rarr;
                </button>
              </div>
            </div>
          `;return}const f=state.decorations.filter(b=>b.category===sheetAddonCat);t.innerHTML=`
          <div class="bg-white rounded-[20px] p-3.5 shadow-rose-sm border border-white space-y-3">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-xs font-extrabold text-ink">Extra Decorations &amp; Add-ons</div>
                <div class="text-[10px] text-ink-muted">Tap any item to add to your cake</div>
              </div>
              <span class="px-2.5 py-0.5 rounded-full bg-berry-soft text-berry text-[10px] font-extrabold">${m.length} Selected</span>
            </div>

            <div class="flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
              ${DECORATION_CATEGORIES.map(b=>{const y=sheetAddonCat===b.id,k=m.filter(C=>C.category===b.id).length;return`
                  <button onclick="sheetAddonCat='${b.id.replace(/'/g,"\\'")}'; renderOrderSheet();" class="shrink-0 px-2.5 py-1.5 rounded-full text-[10.5px] font-bold transition-all ${y?"btn-berry text-white shadow-rose-sm":"bg-blush-50 text-ink-muted border border-blush-200"}">
                    ${getLuxurySvg(b.svgKey,"w-3.5 h-3.5 shrink-0 inline-block mr-1")} ${b.short}${k?" ("+k+")":""}
                  </button>
                `}).join("")}
            </div>

            ${hasNumberDecorationSelected()?`
              <!-- Ask for Candle / Balloon Milestone Number -->
              <div class="bg-blush-50/95 rounded-2xl p-3.5 border-2 ${sheet.errors&&sheet.errors.candleNumber?"border-berry bg-rose-50/50 ring-2 ring-berry/20":"border-blush-300"} shadow-rose-2xs space-y-2.5 animate-scaleIn">
                <div class="flex items-center justify-between gap-2">
                  <div class="flex items-center gap-2 min-w-0">
                    <div class="w-8 h-8 rounded-xl btn-berry text-white flex items-center justify-center shrink-0 shadow-2xs">
                      ${getLuxurySvg("candle","w-4 h-4")}
                    </div>
                    <div class="min-w-0">
                      <div class="text-xs font-extrabold text-ink truncate">Choose Candle / Balloon Number</div>
                      <div class="text-[9.5px] text-ink-muted truncate">Enter milestone age or number (e.g., 4, 18, 25)</div>
                    </div>
                  </div>
                  <span class="text-[9.5px] font-black text-berry bg-berry-soft px-2.5 py-0.5 rounded-full border border-berry/20 shrink-0 flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-berry animate-pulse"></span>
                    <span>Required</span>
                  </span>
                </div>

                <div class="space-y-2">
                  <!-- Custom Clean Number Input with No Native Spin Arrows -->
                  <div class="relative">
                    <input
                      type="text"
                      inputmode="numeric"
                      pattern="[0-9]*"
                      maxlength="3"
                      id="sheet-candle-number"
                      placeholder="Enter milestone number (e.g. 4)"
                      value="${sheet.candleNumber||""}"
                      oninput="updateCandleNumber(this.value.replace(/[^0-9]/g, ''))"
                      class="w-full px-3.5 py-2.5 rounded-xl border ${sheet.errors&&sheet.errors.candleNumber?"border-berry ring-1 ring-berry":"border-blush-300"} bg-white text-ink text-sm font-black focus:outline-none focus:border-berry shadow-inner placeholder:text-ink-light placeholder:font-normal"
                    />
                    ${sheet.candleNumber?`
                      <button type="button" onclick="updateCandleNumber('')" class="absolute right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-blush-100 text-ink hover:text-berry flex items-center justify-center text-xs font-bold active:scale-90 transition-transform">
                        &times;
                      </button>
                    `:""}
                  </div>

                  <!-- Clean Preset Age Chips Underneath (Never overflows or clips) -->
                  <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                    <span class="text-[10px] font-bold text-ink-muted shrink-0 mr-0.5">Popular:</span>
                    ${["1","4","18","21","25","30","50"].map(b=>`
                      <button
                        type="button"
                        onclick="updateCandleNumber('${b}')"
                        class="px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${sheet.candleNumber===b?"btn-berry text-white shadow-2xs scale-105":"bg-white text-ink-muted hover:bg-blush-100 border border-blush-200"}"
                      >
                        ${b}
                      </button>
                    `).join("")}
                  </div>
                </div>

                ${sheet.errors&&sheet.errors.candleNumber?`
                  <div class="text-[10.5px] font-bold text-berry flex items-center gap-1 pt-0.5">
                    ${getLuxurySvg("alert","w-3 h-3 text-berry")} Please choose or enter the candle / balloon number to continue.
                  </div>
                `:""}
              </div>
            `:""}

            <div class="grid grid-cols-2 gap-2.5">
              ${f.map(b=>{const y=sheet.decQuantities&&sheet.decQuantities[b.id]||state.decSelections&&state.decSelections[b.id]||0,k=b.inStock!==!1;return`
                  <div onclick="${k?`changeDecQty('${b.id}', 1, event)`:`showCustomerToast('${b.name} is currently Sold Out')`}" class="rounded-2xl border overflow-hidden text-left flex flex-col justify-between transition-all p-2 ${k?y>0?"border-2 border-berry ring-2 ring-berry/20 bg-rose-50/30 shadow-rose-sm cursor-pointer":"border-blush-200 bg-white shadow-2xs cursor-pointer":"bg-blush-50/70 border-blush-200 opacity-70 grayscale-[0.25] cursor-not-allowed"}">
                    <div class="relative h-20 w-full bg-blush-100 rounded-xl overflow-hidden shrink-0">
                      <img src="${b.img||SVG_CAKE_FALLBACK}" alt="${b.name}" class="w-full h-full object-cover" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
                      ${k?y>0?`
                        <span class="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full btn-berry text-white text-[9px] font-black shadow">${y}&times;</span>
                      `:"":`
                        <span class="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full bg-ink/80 text-white text-[8px] font-black uppercase">Sold Out</span>
                      `}
                    </div>
                    <div class="p-1 flex-1 flex flex-col justify-between mt-1 gap-1">
                      <div class="text-[10.5px] font-bold text-ink leading-tight line-clamp-1" title="${b.name}">${b.name}</div>
                      <div class="flex items-center justify-between pt-1 border-t border-blush-100 gap-1">
                        <span class="text-[10.5px] font-extrabold text-berry shrink-0 whitespace-nowrap">+${fmtETB(b.price)}</span>
                        ${k?`
                          <div class="flex items-center gap-1 shrink-0 bg-blush-50 rounded-full p-0.5 border border-blush-200" onclick="event.stopPropagation()">
                            <button onclick="changeDecQty('${b.id}', -1, event)" aria-label="Decrease quantity" class="w-5 h-5 rounded-full bg-white text-berry flex items-center justify-center font-black text-[10px] shadow-2xs active:scale-90 ${y===0?"opacity-35 cursor-not-allowed":"cursor-pointer"}">
                              &minus;
                            </button>
                            <span class="w-4 text-center font-extrabold text-[10px] text-ink select-none">${y}</span>
                            <button onclick="changeDecQty('${b.id}', 1, event)" aria-label="Increase quantity" class="w-5 h-5 rounded-full btn-berry text-white flex items-center justify-center font-black text-[10px] shadow-2xs active:scale-90 cursor-pointer">
                              +
                            </button>
                          </div>
                        `:`
                          <span class="px-2 py-0.5 rounded-full bg-blush-100 text-ink-muted text-[9px] font-bold select-none">Sold Out</span>
                        `}
                      </div>
                    </div>
                  </div>
                `}).join("")}
            </div>

            ${(()=>{const b=getDecorationTotals(sheet.decQuantities);return b.items.length?`
                <div class="pt-2 border-t border-blush-100 flex flex-wrap gap-1.5">
                  ${b.items.map(y=>`
                    <span onclick="changeDecQty('${y.id}', -${y.qty}, event)" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-berry-soft text-berry text-[10px] font-bold cursor-pointer hover:bg-rose-100" title="Tap to remove">
                      <span>${y.qty}&times; ${y.name} (${fmtETB(y.subtotal)})</span>
                      <svg class="w-2.5 h-2.5 text-berry" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </span>
                  `).join("")}
                </div>
              `:""})()}
          </div>
        `;return}if(sheet.step===3&&n){const f=["Happy Birthday!","Melkam Lidet!","Congrats Grad!","Happy Anniversary"];t.innerHTML=`
          <div class="bg-white rounded-[20px] p-4 shadow-rose-sm border border-white space-y-3">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-xs font-extrabold text-ink">Chef Calligraphy Inscription</div>
                <div class="text-[10.5px] text-ink-muted">Hand-piped on top of your cake (Free)</div>
              </div>
              <span id="sheet-insc-count" class="text-[10.5px] font-extrabold text-berry">${sheet.inscription.length}/35</span>
            </div>

            <input
              type="text"
              maxlength="35"
              value="${sheet.inscription}"
              oninput="updateSheetInsc(this.value)"
              placeholder="e.g., Happy Birthday Sarah!"
              class="w-full px-3.5 py-2.5 rounded-2xl bg-blush-50 border border-blush-200 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-berry/30"
            />

            <div class="flex flex-wrap gap-1.5">
              ${f.map(b=>`
                <button onclick="updateSheetInsc('${b.replace(/'/g,"\\'")}'); renderOrderSheet();" class="px-2.5 py-1 rounded-full bg-blush-100 text-[10.5px] font-bold text-ink hover:bg-berry-soft hover:text-berry transition-colors">${b}</button>
              `).join("")}
            </div>

            <div class="rounded-2xl hero-bg border border-blush-200 p-4 text-center space-y-1">
              <div class="text-[9.5px] font-bold uppercase tracking-wider text-ink-muted">Live Piping Preview</div>
              <div id="sheet-insc-preview" class="font-script text-[28px] leading-tight text-berry break-words">
                ${sheet.inscription||"Make Every Moment Sweeter"}
              </div>
            </div>
          </div>
        `;return}if(sheet.step===4){const f=sheet.errors||{},b=getPhoneDigits(sheet.phone),y=b.startsWith("09")||b.startsWith("07"),k=b.length===0?"empty":y&&b.length===10?"valid":"invalid",C=f.phone||k==="invalid"?"border-berry bg-berry-soft/60 text-berry ring-1 ring-berry/25":k==="valid"?"border-emerald-500 bg-emerald-50/70 text-emerald-800 ring-1 ring-emerald-200":"border-blush-200 bg-blush-50 text-ink",c=getMondayToSundayDays();t.innerHTML=`
          <div class="bg-white rounded-[20px] p-4 shadow-rose-sm border border-white space-y-3.5">
            <div class="text-xs font-extrabold text-ink">Recipient &amp; Addis Delivery Details</div>

            <!-- Full Name with Rounded Error Border -->
            <div id="field-step4-name" class="space-y-1">
              <label class="block text-[10.5px] font-bold ${f.name?"field-error-label":"text-ink-muted"}">Full Name *</label>
              <input
                id="step4-name-input" autocomplete="name" enterkeyhint="next"
                type="text"
                value="${sheet.name}"
                oninput="sheet.name=this.value; if(sheet.errors.name){delete sheet.errors.name; renderOrderSheet();}"
                placeholder="e.g., Selamawit Bekele"
                class="w-full px-3.5 py-2.5 rounded-2xl border text-xs font-bold focus:outline-none focus:ring-2 focus:ring-berry/30 transition-all ${f.name?"field-error-round":"border-blush-200 bg-blush-50 text-ink"}"
              />
              ${f.name?`<div class="field-error-msg"><svg class="w-3.5 h-3.5 shrink-0 text-berry" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span>${f.name}</span></div>`:""}
            </div>

            <!-- Phone Number with Live Green (09/07 10 digits) / Berry-Red Validation -->
            <div id="field-step4-phone" class="space-y-1">
              <label class="block text-[10.5px] font-bold ${f.phone||k==="invalid"?"text-berry":k==="valid"?"text-emerald-600":"text-ink-muted"}">Phone Number (10 digits, starts with 09 or 07) *</label>
              <input
                id="step4-phone-input" type="tel" inputmode="tel" autocomplete="tel" enterkeyhint="next"
                type="tel"
                inputmode="numeric"
                value="${sheet.phone}"
                oninput="handlePhoneInput(this.value)"
                placeholder="0911232323"
                class="w-full px-3.5 py-2.5 rounded-2xl border text-xs font-bold focus:outline-none transition-colors ${C}"
              />
              <div id="step4-phone-hint" class="text-[10px] font-bold mt-1 ${f.phone||k==="invalid"?"text-berry":k==="valid"?"text-emerald-600":"text-ink-muted font-semibold"}">
                ${f.phone?" "+f.phone:k==="valid"?"\u2713 Valid phone number ("+(b.startsWith("09")?"Ethio Telecom 09":"Safaricom 07")+")":k==="invalid"?y?b.length<10?`${b.length}/10 digits \u2014 enter ${10-b.length} more`:`\u274C ${b.length}/10 digits \u2014 too many digits (max 10)`:"\u274C Must start with 09 or 07 \u2014 other prefixes not accepted":"Must start with 09 or 07 (10 digits)"}
              </div>
            </div>

            <!-- Delivery Address with Rounded Error Border -->
            <div id="field-step4-address" class="space-y-1">
              <label class="block text-[10.5px] font-bold ${f.address?"field-error-label":"text-ink-muted"}">Delivery Address (Addis Ababa) *</label>
              <input
                id="step4-address-input" autocomplete="street-address" enterkeyhint="done"
                type="text"
                value="${sheet.address}"
                oninput="sheet.address=this.value; if(sheet.errors.address){delete sheet.errors.address; renderOrderSheet();}"
                placeholder="e.g., Bole Medhanialem, near Edna Mall"
                class="w-full px-3.5 py-2.5 rounded-2xl border text-xs font-bold focus:outline-none focus:ring-2 focus:ring-berry/30 transition-all ${f.address?"field-error-round":"border-blush-200 bg-blush-50 text-ink"}"
              />
              ${f.address?`<div class="field-error-msg"><svg class="w-3.5 h-3.5 shrink-0 text-berry" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span>${f.address}</span></div>`:""}
            </div>

            <!-- Compact Delivery Date Selector: Today / Tomorrow / Select Date -->
            <div class="space-y-2">
              <label class="block text-[10.5px] font-bold text-ink-muted">Delivery Date *</label>
              <div class="grid grid-cols-3 gap-2">
                <button onclick="selectDateOption('today')" class="py-2.5 px-2 rounded-2xl text-[11px] font-extrabold border transition-all ${sheet.dateOption==="today"?"btn-berry text-white border-transparent shadow-rose-sm":"bg-blush-50 text-ink border-blush-200"}">
                  Today
                </button>
                <button onclick="selectDateOption('tomorrow')" class="py-2.5 px-2 rounded-2xl text-[11px] font-extrabold border transition-all ${sheet.dateOption==="tomorrow"?"btn-berry text-white border-transparent shadow-rose-sm":"bg-blush-50 text-ink border-blush-200"}">
                  Tomorrow
                </button>
                <button onclick="selectDateOption('select')" class="py-2.5 px-2 rounded-2xl text-[11px] font-extrabold border transition-all truncate ${sheet.dateOption==="select"?"btn-berry text-white border-transparent shadow-rose-sm":"bg-blush-50 text-ink border-blush-200"}">
                  ${sheet.dateOption==="select"&&!sheet.datePickerOpen?sheet.dateLabel.split(" ")[0]+" \u25BE":"Select Date"}
                </button>
              </div>

              ${sheet.datePickerOpen?`
                <div class="bg-blush-50 rounded-2xl p-2.5 border border-blush-200 space-y-1.5 animate-view">
                  <div class="flex items-center justify-between px-1">
                    <span class="text-[10.5px] font-extrabold text-berry">Choose Day (Monday \u2013 Sunday)</span>
                    <button onclick="sheet.datePickerOpen=false; renderOrderSheet();" class="text-[10px] font-bold text-ink-muted">Close</button>
                  </div>
                  ${c.map(h=>{const w=sheet.date===h.iso;return`
                      <button onclick="pickWeekDate('${h.iso}', '${h.dayName}', '${h.shortLabel}')" class="w-full px-3 py-2 rounded-xl border text-xs flex items-center justify-between transition-all ${w?"bg-berry-soft border-berry text-berry font-extrabold":"bg-white border-blush-100 text-ink font-bold hover:border-blush-300"}">
                        <span>${h.dayName}</span>
                        <span class="text-[11px] ${w?"text-berry":"text-ink-muted"}">${h.shortLabel}${w?" \u2022":""}</span>
                      </button>
                    `}).join("")}
                </div>
              `:""}

              <!-- 3-Option Time Window: Morning / Afternoon / Evening -->
              <div class="space-y-1.5">
                <label class="block text-[10.5px] font-bold text-ink-muted">Time Window *</label>
                <div class="grid grid-cols-3 gap-2">
                  ${TIME_SLOTS.map(h=>{const w=sheet.timeSlot===h;return`
                      <button onclick="sheet.timeSlot='${h}'; renderOrderSheet();" class="py-2.5 px-2 rounded-2xl text-[11px] font-extrabold border transition-all flex items-center justify-center gap-1.5 active:scale-95 ${w?"btn-berry text-white border-transparent shadow-rose-sm":"bg-blush-50 text-ink border-blush-200 hover:bg-white"}">
                        ${h==="Morning"?`<svg class="w-4 h-4 shrink-0 transition-colors ${w?"text-white":"text-amber-500"}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 18a5 5 0 0 0-10 0"/><path d="M12 2v7"/><path d="m4.93 10.93 1.41 1.41"/><path d="m19.07 10.93-1.41 1.41"/><path d="M2 18h20"/><path d="M20 22H4"/></svg>`:h==="Afternoon"?`<svg class="w-4 h-4 shrink-0 transition-colors ${w?"text-white":"text-amber-500"}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`:`<svg class="w-4 h-4 shrink-0 transition-colors ${w?"text-white":"text-indigo-500"}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="M19 3v4"/><path d="M21 5h-4"/></svg>`}
                        <span>${h}</span>
                      </button>
                    `}).join("")}
                </div>
              </div>
            </div>
          </div>
        `;return}if(sheet.step===5){const f=sheet.errors||{};t.innerHTML=`
          
          <!-- Promo Code & Mystery Reward Box (Step 5 Checkout) -->
          <div class="bg-white rounded-[20px] p-3.5 shadow-rose-sm border border-white space-y-2.5">
            <div class="text-xs font-extrabold text-ink">Promo Code &amp; Rewards</div>
            <div class="flex gap-1.5">
              <input id="checkout-promo-input" type="text" value="${sheet.promoCode||""}" placeholder="Enter promo code (e.g. MAK10)" class="flex-1 px-3 py-1.5 rounded-xl bg-blush-50 border border-blush-200 text-xs font-bold uppercase text-ink" />
              <button type="button" onclick="applyCheckoutPromoCode()" class="px-3 py-1.5 rounded-xl btn-berry text-white text-xs font-bold cursor-pointer">Apply</button>
            </div>
            ${sheet.promoCode?`<div id="checkout-promo-msg" class="text-[10px] font-bold text-emerald-700">\u2713 ${sheet.promoCode} applied (-${sheet.promoDiscount} ETB)</div>`:'<div id="checkout-promo-msg" class="text-[10px] text-ink-muted">Have a promo code? Apply above.</div>'}
            ${typeof mktRewards<"u"&&mktRewards.enabled?`
              <div class="pt-1 border-t border-blush-100 flex items-center justify-between gap-2">
                <div class="text-[10.5px] font-bold text-ink">${sheet.mysteryClaimedPrize?"\u{1F381} Won: "+sheet.mysteryClaimedPrize.name:"\u{1F381} Mystery Reward Box"}</div>
                ${sheet.mysteryClaimedPrize?'<span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[9.5px] font-extrabold">Claimed</span>':'<button type="button" onclick="claimCheckoutMysteryReward()" class="px-2.5 py-1 rounded-full bg-blush-100 text-berry text-[10px] font-extrabold cursor-pointer">Open Box</button>'}
              </div>`:""}
          </div>

          <div class="bg-white rounded-[20px] p-4 shadow-rose-sm border border-white space-y-3">
            <div class="text-xs font-extrabold text-ink">Choose Payment Plan</div>

            <div class="grid grid-cols-3 gap-2">
              <button onclick="setPaymentPlan('full')" class="p-2.5 rounded-2xl border text-center transition-all ${sheet.paymentPlan==="full"?"bg-berry-soft border-berry border-[1.5px] shadow-rose-sm":"bg-blush-50 border-blush-200"}">
                <div class="text-[11px] font-extrabold text-ink">Full 100%</div>
                <div class="text-[10.5px] font-extrabold text-berry mt-1">${fmtETB(e.total)}</div>
                <div class="text-[9px] text-ink-muted mt-0.5">Pay upfront</div>
              </button>
              <button onclick="setPaymentPlan('half')" class="p-2.5 rounded-2xl border text-center transition-all ${sheet.paymentPlan==="half"?"bg-berry-soft border-berry border-[1.5px] shadow-rose-sm":"bg-blush-50 border-blush-200"}">
                <div class="text-[11px] font-extrabold text-ink">Half 50%</div>
                <div class="text-[10.5px] font-extrabold text-berry mt-1">${fmtETB(Math.round(e.total*.5))}</div>
                <div class="text-[9px] text-ink-muted mt-0.5">Deposit now</div>
              </button>
              <button onclick="setPaymentPlan('cod')" class="p-2.5 rounded-2xl border text-center transition-all ${sheet.paymentPlan==="cod"?"bg-berry-soft border-berry border-[1.5px] shadow-rose-sm":"bg-blush-50 border-blush-200"}">
                <div class="text-[11px] font-extrabold text-ink">On Delivery</div>
                <div class="text-[10.5px] font-extrabold text-emerald-700 mt-1">0 ETB Now</div>
                <div class="text-[9px] text-ink-muted mt-0.5">Pay on arrival</div>
              </button>
            </div>

            <div class="bg-blush-50 rounded-xl px-3 py-2 flex items-center justify-between text-[11px] border border-blush-200/70">
              <span class="text-ink-muted">Due Now: <strong class="text-berry">${fmtETB(e.dueNow)}</strong></span>
              <span class="text-ink-muted">Balance on Delivery: <strong class="text-ink">${fmtETB(e.balanceDue)}</strong></span>
            </div>
          </div>

          ${sheet.paymentPlan!=="cod"?`
            <div class="bg-white rounded-[20px] p-4 shadow-rose-sm border border-white space-y-3">
              <div class="text-xs font-extrabold text-ink">Select Payment Account</div>
              <div class="grid grid-cols-2 gap-2.5">
                <!-- Telebirr Account Button with Official Logo -->
                <button onclick="sheet.paymentMethod='Telebirr'; renderOrderSheet();" class="py-2.5 px-3 rounded-2xl text-xs font-extrabold border transition-all flex items-center justify-center gap-2 active:scale-95 ${sheet.paymentMethod==="Telebirr"?"btn-berry text-white border-transparent shadow-rose-sm ring-2 ring-berry/20":"bg-blush-50 text-ink border-blush-200 hover:border-berry/30"}">
                  ${getBrandLogo("telebirr","w-5 h-5")}
                  <span class="tracking-tight">Telebirr</span>
                </button>

                <!-- CBE Bank Button with Official Logo -->
                <button onclick="sheet.paymentMethod='CBE Transfer'; renderOrderSheet();" class="py-2.5 px-3 rounded-2xl text-xs font-extrabold border transition-all flex items-center justify-center gap-2 active:scale-95 ${sheet.paymentMethod==="CBE Transfer"?"btn-berry text-white border-transparent shadow-rose-sm":"bg-blush-50 text-ink border-blush-200 hover:border-berry/30"}">
                  ${getBrandLogo("cbe","w-5 h-5")}
                  <span class="tracking-tight">CBE Bank</span>
                </button>
              </div>

              ${sheet.paymentMethod==="Telebirr"?`
                <!-- Telebirr Official Account Card -->
                <div class="bg-gradient-to-r from-blush-100 via-blush-50 to-blush-100 rounded-2xl p-3.5 flex items-center justify-between gap-2.5 border border-blush-200 shadow-2xs">
                  <div class="flex items-center gap-2.5 min-w-0">
                    ${getBrandLogo("telebirr","w-10 h-10")}
                    <div class="min-w-0">
                      <div class="text-[10px] font-black uppercase text-[#0071CE] tracking-wider">Telebirr Account</div>
                      <div class="text-sm font-black text-ink mt-0.5 tracking-tight">${state.shop.paymentMethods?.telebirr?.accountNumber||SHOP_SETTINGS_CONFIG.telebirrDisplay}</div>
                      <div class="text-[10px] text-ink-muted truncate">Name: ${state.shop.paymentMethods?.telebirr?.accountName||SHOP_SETTINGS_CONFIG.telebirrHolder}</div>
                    </div>
                  </div>
                  <button onclick="copyText('${(state.shop.paymentMethods?.telebirr?.accountNumber||SHOP_SETTINGS_CONFIG.telebirrNumber).replace(/\\s+/g,"")}', 'Telebirr', 'customer', this)" class="px-3.5 py-1.5 rounded-full bg-white border border-blush-200 hover:border-berry/40 text-berry font-extrabold text-[11px] shadow-xs shrink-0 inline-flex items-center gap-1.5 transition-all active:scale-95">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    <span>Copy</span>
                  </button>
                </div>
              `:`
                <!-- CBE Official Account Card -->
                <div class="bg-gradient-to-r from-blush-100 via-blush-50 to-blush-100 rounded-2xl p-3.5 flex items-center justify-between gap-2.5 border border-blush-200 shadow-2xs">
                  <div class="flex items-center gap-2.5 min-w-0">
                    ${getBrandLogo("cbe","w-10 h-10")}
                    <div class="min-w-0">
                      <div class="text-[10px] font-black uppercase text-[#501C65] tracking-wider">Commercial Bank of Ethiopia</div>
                      <div class="text-sm font-black text-ink mt-0.5 tracking-tight">${state.shop.paymentMethods?.cbe?.accountNumber||SHOP_SETTINGS_CONFIG.cbeAccountDisplay}</div>
                      <div class="text-[10px] text-ink-muted truncate">Account: ${state.shop.paymentMethods?.cbe?.accountName||SHOP_SETTINGS_CONFIG.cbeHolder}</div>
                    </div>
                  </div>
                  <button onclick="copyText('${(state.shop.paymentMethods?.cbe?.accountNumber||SHOP_SETTINGS_CONFIG.cbeAccount).replace(/\\s+/g,"")}', 'CBE', 'customer', this)" class="px-3.5 py-1.5 rounded-full bg-white border border-blush-200 hover:border-berry/40 text-berry font-extrabold text-[11px] shadow-xs shrink-0 inline-flex items-center gap-1.5 transition-all active:scale-95">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    <span>Copy</span>
                  </button>
                </div>
              `}

              <!-- Upload Bank Screenshot (Client-Side Compressed) -->
              <div id="field-step5-receipt" class="space-y-1.5">
                <label class="block text-[11px] font-extrabold ${f.receipt?"text-berry":"text-ink"}">Upload ${sheet.paymentMethod} Screenshot *</label>
                ${sheet.receiptImg?`
                  <div class="relative rounded-2xl overflow-hidden border-2 border-emerald-500 bg-emerald-50/40 shadow-rose-xs animate-scaleIn">
                    <!-- Received confirmation header -->
                    <div class="bg-emerald-600 text-white px-3 py-1.5 flex items-center justify-between">
                      <div class="flex items-center gap-1.5 text-[11px] font-extrabold tracking-wide">
                        <svg class="w-4 h-4 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span>Receipt Screenshot Received</span>
                      </div>
                      <span class="text-[9.5px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">Ready</span>
                    </div>

                    <!-- Clean image container -->
                    <div class="p-2.5 bg-white flex items-center justify-center">
                      <img src="${sheet.receiptImg}" alt="Receipt Preview" class="w-full max-h-44 object-contain rounded-xl border border-emerald-100" />
                    </div>

                    <!-- Green reassurance bar -->
                    <div class="px-3 py-2 flex items-center justify-between bg-emerald-50 border-t border-emerald-200 text-[11px]">
                      <div class="flex items-center gap-1.5 min-w-0">
                        <span class="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse"></span>
                        <span class="font-extrabold text-emerald-800 truncate">${sheet.receiptName||"Receipt screenshot attached"}</span>
                      </div>
                      <button onclick="clearReceiptUpload()" class="text-emerald-700 hover:text-berry font-extrabold text-xs ml-2 shrink-0 underline">Change Photo</button>
                    </div>
                  </div>
                `:`
                  <label id="step5-receipt-dropzone" class="flex flex-col items-center justify-center py-5 px-3 rounded-2xl border-2 border-dashed ${f.receipt?"field-error-round":"border-blush-400 bg-blush-50/70"} cursor-pointer hover:bg-berry-soft/40 transition-all">
                    <div class="w-10 h-10 rounded-full bg-blush-100 text-berry flex items-center justify-center mx-auto mb-1"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg></div>
                    <span class="text-[11.5px] font-extrabold text-berry mt-1">Tap to Upload ${sheet.paymentMethod} Receipt</span>
                    <span class="text-[9.5px] text-ink-muted">Auto-compressed for fast mobile transfer</span>
                    <input type="file" accept="image/png,image/jpeg,image/webp,image/jpg" onchange="handleReceiptUpload(this)" class="hidden" />
                  </label>
                  ${f.receipt?`<div class="text-[10.5px] font-bold text-berry"> ${f.receipt}</div>`:""}
                `}
              </div>
            </div>
          `:`
            <div class="bg-white rounded-[20px] p-4 shadow-rose-sm border border-emerald-200 space-y-1.5 text-xs">
              <div class="font-extrabold text-emerald-700 flex items-center gap-1.5"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/></svg> Cash / Mobile Transfer on Arrival</div>
              <p class="text-[11px] text-ink-muted leading-relaxed">No upfront deposit required. Please have <strong>${fmtETB(e.total)}</strong> ready when your cake arrives.</p>
            </div>
          `}
        `;return}const g=sheet.paymentPlan==="full"?"Full Payment (100%)":sheet.paymentPlan==="half"?"Half Deposit (50%)":"Pay on Delivery";t.innerHTML=`
        <div class="bg-white rounded-[20px] p-4 shadow-rose-sm border border-white space-y-3">
          <div class="flex items-center justify-between border-b border-blush-100 pb-2.5">
            <div class="text-xs font-extrabold text-ink">Order Summary</div>
            <button onclick="goToWizardStep(${s})" class="text-[10.5px] font-bold text-berry">Edit</button>
          </div>

          ${n?`
            <div class="flex items-center gap-3">
              <img src="${sheet.cake.img}" class="w-14 h-14 rounded-xl object-cover shrink-0" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
              <div class="min-w-0 flex-1 text-xs">
                <div class="font-extrabold text-ink truncate">${sheet.cake.name}</div>
                <div class="text-[11px] text-ink-muted">${sheet.size} \u2022 ${sheet.flavor}</div>
                ${sheet.inscription?`<div class="text-[11px] text-berry font-bold truncate">${getLuxurySvg("pen","w-3.5 h-3.5 inline-block mr-1")} "${sheet.inscription}"</div>`:""}
              </div>
            </div>
            ${(()=>{const f=getDecorationTotals(sheet.decQuantities);return f.items.length?`
                <div class="bg-blush-50 rounded-xl p-2.5 text-[10.5px] space-y-1.5 border border-blush-200">
                  <div class="font-extrabold text-ink flex items-center justify-between border-b border-blush-200 pb-1">
                    <span>Extra Decorations (${f.count} items)</span>
                    <span class="text-berry font-black">${fmtETB(f.total)}</span>
                  </div>
                  <div class="space-y-1 pt-0.5">
                    ${f.items.map(b=>`
                      <div class="flex items-center justify-between text-ink-muted">
                        <span>${b.qty}&times; ${b.name}${b.requiresNumber&&sheet.candleNumber?` (No. ${sheet.candleNumber})`:""}</span>
                        <span class="font-bold text-ink">${fmtETB(b.subtotal)}</span>
                      </div>
                    `).join("")}
                  </div>
                </div>
              `:""})()}
          `:sheet.mode==="decorations_only"?`
            <div class="space-y-2.5">
              <div class="flex items-center gap-3 bg-blush-50 p-2.5 rounded-2xl border border-blush-200">
                <div class="w-12 h-12 rounded-xl bg-berry-soft border border-rose-200 flex items-center justify-center text-berry shrink-0 text-xl font-bold">
                  \u2728
                </div>
                <div class="min-w-0 flex-1 text-xs">
                  <div class="font-extrabold text-ink">Celebration Extras</div>
                  <div class="text-[11px] text-berry font-bold">Decorations Only Order (No Cake)</div>
                </div>
              </div>
              ${(()=>{const f=getDecorationTotals(sheet.decQuantities);return`
                  <div class="bg-blush-50 rounded-xl p-2.5 text-[10.5px] space-y-1.5 border border-blush-200">
                    <div class="font-extrabold text-ink flex items-center justify-between border-b border-blush-200 pb-1">
                      <span>Selected Items (${f.count})</span>
                      <span class="text-berry font-black">${fmtETB(f.total)}</span>
                    </div>
                    <div class="space-y-1 pt-0.5">
                      ${f.items.map(b=>`
                        <div class="flex items-center justify-between text-ink-muted">
                          <span class="truncate pr-2">${b.qty}&times; ${b.name}${b.requiresNumber&&sheet.candleNumber?` (No. ${sheet.candleNumber})`:""}</span>
                          <span class="font-bold text-ink shrink-0">${fmtETB(b.subtotal)}</span>
                        </div>
                      `).join("")}
                    </div>
                  </div>
                `})()}
            </div>
          `:`
            <div class="space-y-1 text-xs">
              ${state.cart.map(f=>`<div class="flex justify-between"><span>${f.qty}\xD7 ${f.name}</span><span class="font-bold text-berry">${fmtETB(f.unitPrice*f.qty)}</span></div>`).join("")}
            </div>
          `}

          <div class="space-y-1.5 pt-2 border-t border-blush-100 text-[11px]">
            <div class="flex justify-between"><span class="text-ink-muted">Recipient</span><span class="font-bold text-ink">${sheet.name} (${sheet.phone})</span></div>
            <div class="flex justify-between"><span class="text-ink-muted">Delivery Address</span><span class="font-bold text-ink text-right max-w-[60%] truncate">${sheet.address}</span></div>
            <div class="flex justify-between"><span class="text-ink-muted">Schedule</span><span class="font-bold text-ink">${sheet.dateLabel||sheet.date} \u2022 ${sheet.timeSlot}</span></div>
            <div class="flex justify-between"><span class="text-ink-muted">Payment Plan</span><span class="font-bold text-berry">${g}</span></div>
            <div class="flex justify-between items-center"><span class="text-ink-muted">Payment Channel</span><span class="font-bold text-ink flex items-center gap-1.5">${getBrandLogo(sheet.paymentMethod,"w-4 h-4")} <span>${sheet.paymentMethod}</span></span></div>
          </div>

          ${sheet.receiptImg?`
            <div class="rounded-xl border border-blush-200 overflow-hidden bg-blush-50 p-2 flex items-center gap-2.5">
              <img src="${sheet.receiptImg}" class="w-12 h-12 rounded-lg object-cover shrink-0 border border-white" />
              <div class="text-[10.5px]">
                <div class="font-extrabold text-emerald-700 flex items-center gap-1.5"><svg class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Transfer Receipt Attached</div>
                <div class="text-ink-muted">Ready for Admin instant verification</div>
              </div>
            </div>
          `:""}

          <div class="bg-blush-100 rounded-2xl p-3 space-y-1 text-xs">
            <div class="flex justify-between text-ink-muted"><span>${sheet.mode==="decorations_only"?"Decorations Subtotal":"Cake &amp; Add-ons"}</span><span class="font-bold text-ink">${fmtETB(e.base+e.addSum)}</span></div>
            <div class="flex justify-between text-ink-muted"><span>Chilled Delivery</span><span class="font-bold text-ink">${fmtETB(e.deliv)}</span></div>
            <div class="flex justify-between font-extrabold text-ink pt-1.5 border-t border-blush-200"><span>Grand Total</span><span class="text-berry">${fmtETB(e.total)}</span></div>
            <div class="flex justify-between text-[11px] font-bold text-emerald-700"><span>Due Now</span><span>${fmtETB(e.dueNow)}</span></div>
            ${e.balanceDue>0?`<div class="flex justify-between text-[11px] font-semibold text-ink-muted"><span>Balance on Delivery</span><span>${fmtETB(e.balanceDue)}</span></div>`:""}
          </div>
        </div>
      `}function selectSheetSize(t){SIZES[t]&&(sheet.size=SIZES[t].id,renderOrderSheet())}function selectSheetFlavor(t){FLAVORS[t]&&(sheet.flavor=FLAVORS[t],renderOrderSheet())}function hasNumberDecorationSelected(){return sheet.addons.some(t=>{const e=state.decorations.find(o=>o.id===t);if(!e)return!1;if(e.requiresNumber)return!0;const n=e.name.toLowerCase();return n.includes("number candle")||n.includes("metallic number")})}function updateCandleNumber(t){sheet.candleNumber=String(t).trim(),sheet.errors&&sheet.errors.candleNumber&&sheet.candleNumber&&delete sheet.errors.candleNumber,renderOrderSheet()}function toggleSheetAddon(t){const e=sheet&&sheet.decQuantities&&sheet.decQuantities[t]||state.decSelections&&state.decSelections[t]||0;changeDecQty(t,e>0?-e:1)}function updateSheetInsc(t){sheet.inscription=t.slice(0,35);const e=document.getElementById("sheet-insc-count"),n=document.getElementById("sheet-insc-preview");e&&(e.textContent=`${sheet.inscription.length}/35`),n&&(n.textContent=sheet.inscription||"Make Every Moment Sweeter")}function addCustomizedToCart(){if(sheet.mode!=="single"||!sheet.cake)return;const t=computeSheetTotal();state.cart.push({id:"c-"+Date.now(),cakeId:sheet.cake.id,name:sheet.cake.name,img:sheet.cake.img,size:sheet.size,flavor:sheet.flavor,qty:1,unitPrice:t.base+t.addSum}),saveState(),window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.saveOrder=="function"&&window.FirebaseService.saveOrder({...newOrder,id:String(newOrder.id)}).catch(e=>{console.warn("Background Firestore order sync notice:",e)}),syncAll(),closeOrderSheet(),showCustomerToast(`Added ${sheet.cake.name} to Cart`)}function submitLiveOrder(){const t=getPhoneDigits(sheet.phone);if(!sheet.name.trim()||!sheet.phone.trim()){goToWizardStep(4),showCustomerToast("Please enter your name & phone number");return}if(!t.startsWith("09")&&!t.startsWith("07")){goToWizardStep(4),showCustomerToast("Phone number must start with 09 or 07");return}if(t.length!==10){goToWizardStep(4),showCustomerToast("Phone number must be exactly 10 digits");return}if(!sheet.address.trim()){goToWizardStep(4),showCustomerToast("Please enter your Addis Ababa delivery address");return}if(sheet.paymentPlan!=="cod"&&!sheet.receiptImg){goToWizardStep(5),showCustomerToast(`Please upload your ${sheet.paymentMethod} receipt screenshot`);return}const e=computeSheetTotal(),n=state.orders.reduce((d,u)=>Math.max(d,u.id),10046)+1,o=state.cart[0],s=getDecorationTotals(sheet.decQuantities),r=sheet.mode==="decorations_only",a=s.items[0]&&s.items[0].img||"https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80",i=r?`Celebration Decorations (${s.count} items)`:o?`${o.name}${state.cart.length>1?` (+${state.cart.length-1} more)`:""}`:"Celebration Order",l={id:n,status:"Payment Pending",customerName:sheet.name.trim(),phone:sheet.phone.trim(),fulfillment:"delivery",address:sheet.address.trim(),deliveryDate:sheet.dateLabel||sheet.date,timeSlot:sheet.timeSlot,paymentPlan:sheet.paymentPlan,paymentMethod:sheet.paymentMethod,paymentRef:sheet.paymentPlan==="cod"?"Pay on Delivery":"Receipt Uploaded",paymentStatus:"Unpaid",dueNow:e.dueNow,balanceDue:e.balanceDue,receiptImg:sheet.receiptImg||"",cakeName:sheet.mode==="single"?sheet.cake.name:r?`Celebration Decorations (${s.count} items)`:i,cakeImg:sheet.mode==="single"?sheet.cake.img:r?a:o?o.img:a,size:sheet.mode==="single"?sheet.size:r?"Party Pack":o?o.size:"Standard",flavor:sheet.mode==="single"?sheet.flavor:r?"Decorations Only":o?o.flavor:"Standard",inscription:sheet.inscription,decorations:s.items.map(d=>({id:d.id,name:d.name,category:d.category,price:d.price,qty:d.qty,subtotal:d.subtotal})),addons:s.items.map(d=>`${d.qty}\xD7 ${d.name}${d.requiresNumber&&sheet.candleNumber?` (No. ${sheet.candleNumber})`:""} (${fmtETB(d.subtotal)})`),total:e.total,isNewFlash:!0};state.orders.unshift(l),state.notifications.unshift({id:Date.now(),title:`Order #ORD-${l.id} Placed`,msg:`Your ${l.cakeName} (${fmtETB(l.total)}) is placed with status: Payment Pending.`,time:"Just now"}),state.unreadNotifs++,sheet.mode==="cart"&&(state.cart=[]),state.decSelections={},sheet.mode==="decorations_only"&&(sheet.decQuantities={}),saveState(),syncAll(),closeOrderSheet(),playCustomerNotificationSound("Payment Pending"),playBell(),showCustomerToast("Submitted successfully!","success"),showAdminToast(`New Order #ORD-${l.id} from ${l.customerName}!`,"success"),showGlobalToast(`Submitted successfully! Order #ORD-${l.id}`,"success"),openOrderSuccessPage(l)}function updateSuccessPageLiveStatus(){const t=document.getElementById("order-success-page");if(!t||t.classList.contains("hidden"))return;const e=state.orders.find(d=>String(d.id)===String(lastSubmittedOrderId))||state.orders[0];if(!e)return;const n=document.getElementById("success-hero-icon-container"),o=document.getElementById("success-status-pill-container"),s=document.getElementById("success-status-card-container"),r=document.getElementById("success-order-sub"),a=e.paymentStatus==="Paid",i=e.status==="Approved";e.status==="Completed"?(n&&(n.innerHTML=`
            <div class="relative w-20 h-20 mx-auto flex items-center justify-center animate-scaleIn">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-30"></span>
              <div class="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white shadow-rose-sm flex items-center justify-center">
                <svg class="w-9 h-9 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
            </div>
          `),o&&(o.innerHTML=`
            <div class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10.5px] font-black uppercase tracking-wider shadow-xs animate-scaleIn">
              <svg class="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Order Completed Successfully</span>
            </div>
          `),r&&(r.textContent=`Congratulations, ${e.customerName}! Your MAK CAKE order has been completed & delivered.`),s&&(s.innerHTML=`
            <div class="w-full bg-gradient-to-r from-emerald-50 via-blush-50 to-emerald-50 rounded-2xl p-3.5 border-2 border-emerald-300 shadow-sm text-center space-y-1 animate-scaleIn">
              <div class="text-xs font-black text-emerald-900 flex items-center justify-center gap-1.5">
                <svg class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Sweet Moments Delivered!</span>
              </div>
              <p class="text-[10.5px] text-ink-muted">Your order is delivered and ready for your celebration. Enjoy every sweet bite!</p>
            </div>
          `)):i||a?(n&&(n.innerHTML=`
            <div class="relative w-20 h-20 mx-auto flex items-center justify-center animate-scaleIn">
              <div class="absolute inset-0 rounded-full border-4 border-emerald-200 animate-pulse"></div>
              <div class="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white shadow-rose-sm flex items-center justify-center">
                <svg class="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
            </div>
          `),o&&(o.innerHTML=`
            <div class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10.5px] font-black uppercase tracking-wider shadow-xs animate-scaleIn">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Payment Confirmed &bull; Order Accepted</span>
            </div>
          `),r&&(r.textContent=`Great news, ${e.customerName}! Bole Kitchen confirmed your payment and accepted your order.`),s&&(s.innerHTML=`
            <div class="w-full bg-emerald-50 rounded-2xl p-3.5 border-2 border-emerald-300 shadow-rose-xs space-y-1.5 text-left animate-scaleIn">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 text-emerald-900 font-extrabold text-xs">
                  <svg class="w-4 h-4 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Payment Verified by Bole Kitchen</span>
                </div>
                <span class="text-[9.5px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full">Accepted</span>
              </div>
              <p class="text-[10.5px] text-emerald-900/80 leading-relaxed font-medium">
                Your transfer screenshot was verified and accepted. Our bakers are now preparing your cake fresh for your delivery window!
              </p>
            </div>
          `)):(n&&(n.innerHTML=`
            <div class="relative w-20 h-20 mx-auto flex items-center justify-center shrink-0">
              <div class="absolute inset-0 rounded-full border-[3px] border-amber-200 border-t-amber-500 animate-spin" style="animation-duration: 2s;"></div>
              <div class="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-amber-400 text-white shadow-rose-sm flex items-center justify-center">
                <svg class="w-7 h-7 text-white animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
            </div>
          `),o&&(o.innerHTML=`
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-[10.5px] font-extrabold uppercase tracking-wider shadow-xs">
              <span class="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              <span>Payment On Pending</span>
            </div>
          `),r&&(r.textContent=`Thank you, ${e.customerName}! Your payment verification is in progress at MAK CAKE Bole Kitchen.`),s&&(s.innerHTML=`
            <!-- 20-Minute Live Countdown Timer Card -->
            <div class="w-full bg-white rounded-2xl p-3 border border-amber-200/90 shadow-rose-xs space-y-2">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <svg class="w-4 h-4 animate-spin" style="animation-duration: 4s;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div class="text-left">
                    <div class="text-[11px] font-extrabold text-ink">Bole Kitchen Verification</div>
                    <div class="text-[9.5px] text-ink-muted">Estimated approval within</div>
                  </div>
                </div>
                <div class="bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl">
                  <span id="success-countdown-timer" class="font-mono text-sm font-black text-amber-800 tracking-wider">20:00</span>
                </div>
              </div>
              <div class="w-full bg-blush-100 h-1.5 rounded-full overflow-hidden">
                <div id="success-countdown-bar" class="h-full bg-amber-500 transition-all duration-1000" style="width: 100%;"></div>
              </div>
              <div class="flex items-center justify-between text-[10px] text-ink-muted px-0.5">
                <span>Payment will be approved shortly</span>
                <span class="font-bold text-amber-700">~20 min max</span>
              </div>
            </div>

            <!-- Payment Verification Policy Notice (20 min) -->
            <div class="w-full bg-amber-50/80 rounded-2xl p-3.5 border border-amber-200/90 shadow-2xs space-y-1.5 text-left animate-scaleIn">
              <div class="flex items-center gap-2 text-amber-900 font-extrabold text-xs">
                <svg class="w-4 h-4 text-amber-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 5v5l4 2"/>
                </svg>
                <span>Payment Verification</span>
              </div>
              <p class="text-[10.5px] text-amber-900/80 leading-relaxed font-medium">
                We will verify your payment within 20 minutes. If your payment is not confirmed within 20 minutes, please call us for assistance. You can also view your order status or contact us directly by phone if you need help.
              </p>
            </div>
          `,updateSuccessCountdownUI()))}function openOrderSuccessPage(t){lastSubmittedOrderId=String(t.id),document.getElementById("success-order-id").textContent=`#ORD-${t.id}`,document.getElementById("success-order-sub").textContent=`Thank you, ${t.customerName}! Your order is now live in MAK CAKE Bole Kitchen.`,document.getElementById("success-order-card").innerHTML=`
        <div class="flex items-center gap-3 pb-2.5 border-b border-blush-100">
          <img src="${t.cakeImg||SVG_CAKE_FALLBACK}" class="w-12 h-12 rounded-xl object-cover shrink-0" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
          <div class="min-w-0 flex-1">
            <div class="font-extrabold text-ink truncate">${t.cakeName}</div>
            <div class="text-[11px] text-ink-muted">${t.deliveryDate} \u2022 ${t.timeSlot}</div>
          </div>
        </div>
        <div class="flex justify-between text-[11px]"><span class="text-ink-muted">Address</span><span class="font-bold text-ink truncate max-w-[65%]">${t.address}</span></div>
        <div class="flex justify-between text-[11px] items-center"><span class="text-ink-muted">Payment</span><span class="font-bold text-ink flex items-center gap-1.5">${getBrandLogo(t.paymentMethod,"w-4 h-4")} <span>${t.paymentMethod}</span></span></div>
        <div class="flex justify-between text-xs font-extrabold pt-1 border-t border-blush-100"><span class="text-ink">Total</span><span class="text-berry">${fmtETB(t.total)}</span></div>
      `,startSuccessCountdown(),document.getElementById("order-success-page").classList.remove("hidden"),updateSuccessPageLiveStatus(),updateSuccessNotifBanner(t.id,t.pushEnabled?"active":"prompt"),checkAndPromptOrderNotifications(t.id)}let swRegistration=null;async function initPushNotifications(){if("serviceWorker"in navigator){try{swRegistration=await navigator.serviceWorker.register("./sw.js"),console.log("MAK CAKE Service Worker registered:",swRegistration.scope)}catch(t){console.log("SW registration notice:",t.message)}navigator.serviceWorker.addEventListener("message",t=>{t.data&&t.data.type==="OPEN_ORDER_TRACKER"&&t.data.orderId&&openTrackerSheet(String(t.data.orderId))})}}function isIOSDevice(){return/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1}function isStandalonePWA(){return"standalone"in window.navigator&&window.navigator.standalone||window.matchMedia("(display-mode: standalone)").matches}function isPushSupported(){return"Notification"in window}function checkAndPromptOrderNotifications(t){const e=state.orders.find(n=>String(n.id)===String(t));if(e){if(e.pushEnabled){updateSuccessNotifBanner(t,"active");return}if(e.notifDismissed){updateSuccessNotifBanner(t,"dismissed");return}setTimeout(()=>{const n=document.getElementById("order-notif-permission-modal");n&&n.classList.remove("hidden")},450)}}function dismissOrderNotificationPrompt(){const t=document.getElementById("order-notif-permission-modal");t&&t.classList.add("hidden");const e=state.orders.find(n=>String(n.id)===String(lastSubmittedOrderId));e&&(e.notifDismissed=!0),saveState(),updateSuccessNotifBanner(lastSubmittedOrderId,"dismissed"),showCustomerToast("You can turn on notifications anytime")}function openOrderNotifPromptDirect(){const t=document.getElementById("order-notif-permission-modal");t&&t.classList.remove("hidden")}function openIosInstructionModal(){const t=document.getElementById("ios-pwa-instruction-modal");t&&t.classList.remove("hidden")}async function handleCustomerTurnOnNotifs(){const t=document.getElementById("order-notif-permission-modal");if(t&&t.classList.add("hidden"),isIOSDevice()&&!isStandalonePWA()){const e=document.getElementById("ios-pwa-instruction-modal");e&&e.classList.remove("hidden");return}if(!isPushSupported()){showCustomerToast("Push notifications are not supported on this browser. Live tracking is active on your screen!"),updateSuccessNotifBanner(lastSubmittedOrderId,"unsupported");return}try{const e=await Notification.requestPermission();if(e==="granted")await registerDevicePush(lastSubmittedOrderId),showCustomerToast(`Notifications Enabled! \u{1F514}
We'll keep you updated about your order.`),markOrderNotificationsActive(lastSubmittedOrderId),dispatchBrowserNotification("MAK CAKE Addis Ababa \u{1F382}",`Notifications enabled! We'll alert you when order #ORD-${lastSubmittedOrderId} is confirmed or ready.`,lastSubmittedOrderId);else if(e==="denied"){state.notifDeniedPermanently=!0,saveState();const n=document.getElementById("notif-denied-guide-modal");n&&n.classList.remove("hidden"),updateSuccessNotifBanner(lastSubmittedOrderId,"denied")}else updateSuccessNotifBanner(lastSubmittedOrderId,"dismissed")}catch(e){console.error("Notification permission error:",e),showCustomerToast("Notification request cancelled")}}function urlBase64ToUint8Array(t){const e="=".repeat((4-t.length%4)%4),n=(t+e).replace(/\-/g,"+").replace(/_/g,"/"),o=window.atob(n),s=new Uint8Array(o.length);for(let r=0;r<o.length;++r)s[r]=o.charCodeAt(r);return s}async function registerDevicePush(t){const e=state.orders.find(n=>String(n.id)===String(t));if(e&&(e.pushEnabled=!0,e.notifiedStatuses=e.notifiedStatuses||{},saveState()),"serviceWorker"in navigator)try{const n=await navigator.serviceWorker.ready;swRegistration=n;const o=typeof window.MAK_PUSH_BACKEND_URL=="string"&&window.MAK_PUSH_BACKEND_URL.trim()?window.MAK_PUSH_BACKEND_URL.trim().replace(/\/$/,""):"";if(o&&"PushManager"in window&&n.pushManager){let s=await n.pushManager.getSubscription();if(!s)try{const r=await fetch(o+"/api/push/vapid-key").then(a=>a.json()).catch(()=>null);if(r&&r.publicKey){const a=urlBase64ToUint8Array(r.publicKey);s=await n.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:a})}}catch(r){console.log("PushManager subscription notice:",r.message)}s&&fetch(o+"/api/push/subscribe",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({orderId:t,subscription:s,customerName:e?e.customerName:"",phone:e?e.phone:""})}).catch(()=>{})}}catch(n){console.log("SW ready note:",n)}}function markOrderNotificationsActive(t){const e=state.orders.find(n=>String(n.id)===String(t));e&&(e.pushEnabled=!0,e.notifiedStatuses=e.notifiedStatuses||{},saveState()),updateSuccessNotifBanner(t,"active")}function updateSuccessNotifBanner(t,e){const n=document.getElementById("success-notif-status-banner");n&&(e==="active"?n.innerHTML=`
          <div class="w-full bg-emerald-50 border border-emerald-300 rounded-2xl p-2.5 px-3 flex items-center justify-between gap-2 shadow-2xs animate-fadeIn">
            <div class="flex items-center gap-2 min-w-0">
              <span class="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm shrink-0">\u{1F514}</span>
              <div class="text-left min-w-0">
                <div class="text-[11px] font-extrabold text-emerald-900 truncate">Push Notifications Active</div>
                <div class="text-[9.5px] text-emerald-700 font-semibold truncate">You'll receive alerts when status changes</div>
              </div>
            </div>
            <div class="flex items-center gap-1.5 shrink-0">
              <button onclick="openIosInstructionModal()" title="iPhone Setup Info" class="text-[10px] font-bold text-emerald-800 bg-white hover:bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200 transition-colors shadow-2xs">\u{1F4F1} iPhone Info</button>
              <span class="text-[10px] font-black text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">\u2713 On</span>
            </div>
          </div>
        `:e==="denied"?n.innerHTML=`
          <div onclick="document.getElementById('notif-denied-guide-modal').classList.remove('hidden')" class="w-full bg-blush-50 border border-blush-200 hover:border-berry/40 rounded-2xl p-2.5 px-3 flex items-center justify-between gap-2 cursor-pointer shadow-2xs transition-all">
            <div class="flex items-center gap-2 min-w-0">
              <span class="w-7 h-7 rounded-xl bg-blush-200 text-ink-muted flex items-center justify-center text-sm shrink-0">\u{1F515}</span>
              <div class="text-left min-w-0">
                <div class="text-[11px] font-bold text-ink truncate">Notifications Blocked in Browser</div>
                <div class="text-[9.5px] text-berry font-bold underline truncate">Tap for instructions to unblock</div>
              </div>
            </div>
            <span class="text-[10px] font-bold text-berry shrink-0">Help &rarr;</span>
          </div>
        `:n.innerHTML=`
          <div onclick="openOrderNotifPromptDirect()" class="w-full bg-gradient-to-r from-berry-soft via-blush-50 to-rose-50 border border-rose-200 hover:border-berry/60 rounded-2xl p-2.5 px-3 flex items-center justify-between gap-2 cursor-pointer shadow-2xs transition-all active:scale-[0.99]">
            <div class="flex items-center gap-2 min-w-0">
              <span class="w-7 h-7 rounded-xl bg-berry text-white flex items-center justify-center text-xs shrink-0 shadow-2xs">\u{1F514}</span>
              <div class="text-left min-w-0">
                <div class="text-[11px] font-black text-ink truncate">Stay Updated on Your Order</div>
                <div class="text-[9.5px] text-berry font-bold truncate">Tap to turn on status push notifications</div>
              </div>
            </div>
            <div class="flex items-center gap-1.5 shrink-0">
              <button onclick="event.stopPropagation(); openIosInstructionModal();" title="iPhone Setup Info" class="text-[10px] font-bold text-ink bg-white px-2 py-1 rounded-full border border-blush-200 hover:border-berry/40">\u{1F4F1} iOS</button>
              <button onclick="event.stopPropagation(); handleCustomerTurnOnNotifs();" class="px-2.5 py-1 rounded-full btn-berry text-white text-[10.5px] font-extrabold shadow-2xs">
                Turn On
              </button>
            </div>
          </div>
        `)}function sendOrderStatusPush(t,e){const n=state.orders.find(i=>String(i.id)===String(t));if(!n)return;n.notifiedStatuses=n.notifiedStatuses||{};const o=e==="Pending"?"Payment Pending":e==="Confirmed"?"Approved":e==="Ready"?"Completed":e;if(n.notifiedStatuses[o]){console.log(`Notification already sent for order #${t} status: ${o}. Skipping duplicate.`);return}n.notifiedStatuses[o]=!0,saveState();let s=`MAK CAKE \u2014 #ORD-${n.id}`,r="";o==="Payment Pending"||o==="Received"?r=`Your order has been received! \u{1F382} MAK CAKE has received your order (#ORD-${n.id}).`:o==="Approved"?r=`Your order is confirmed! \u2728 We're getting everything ready for order #ORD-${n.id}.`:o==="Completed"?r=`Your cake order is ready! \u{1F389} Thank you for choosing MAK CAKE (#ORD-${n.id}).`:r=`Your order #ORD-${n.id} status is now: ${o}.`,state.notifications.unshift({id:Date.now(),title:s,msg:r,time:"Just now",orderId:n.id}),state.unreadNotifs++,playCustomerNotificationSound(o),isPushSupported()&&Notification.permission==="granted"&&dispatchBrowserNotification(s,r,n.id);const a=typeof window.MAK_PUSH_BACKEND_URL=="string"&&window.MAK_PUSH_BACKEND_URL.trim()?window.MAK_PUSH_BACKEND_URL.trim().replace(/\/$/,""):"";a&&fetch(a+"/api/push/send-status",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({orderId:n.id,status:o})}).catch(()=>{})}function dispatchBrowserNotification(t,e,n){const o={body:e,icon:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=192&auto=format&fit=crop&q=80",badge:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=96&auto=format&fit=crop&q=80",tag:`mak-order-${n}`,renotify:!0,data:{orderId:n,url:`/?track=${n}`}};if(navigator.serviceWorker&&navigator.serviceWorker.controller){navigator.serviceWorker.controller.postMessage({type:"SHOW_NOTIFICATION",title:t,options:o});return}swRegistration&&swRegistration.showNotification?swRegistration.showNotification(t,o).catch(s=>{console.log("SW notification fallback:",s),tryFallbackNotification(t,o,n)}):tryFallbackNotification(t,o,n)}function tryFallbackNotification(t,e,n){try{const o=new Notification(t,e);o.onclick=function(){window.focus(),openTrackerSheet(String(n)),o.close()}}catch(o){console.log("Fallback notification note:",o)}}let successCountdownInterval=null,successSecondsRemaining=1200;function startSuccessCountdown(){successCountdownInterval&&clearInterval(successCountdownInterval),successSecondsRemaining=1200,updateSuccessCountdownUI(),successCountdownInterval=setInterval(()=>{successSecondsRemaining--,successSecondsRemaining<=0&&(clearInterval(successCountdownInterval),successSecondsRemaining=0),updateSuccessCountdownUI()},1e3)}function updateSuccessCountdownUI(){const t=document.getElementById("success-countdown-timer"),e=document.getElementById("success-countdown-bar");if(!t)return;const n=Math.floor(successSecondsRemaining/60),o=successSecondsRemaining%60;if(t.textContent=`${String(n).padStart(2,"0")}:${String(o).padStart(2,"0")}`,e){const s=Math.max(0,successSecondsRemaining/1200*100);e.style.width=s+"%"}}function backToHomeFromSuccess(){successCountdownInterval&&clearInterval(successCountdownInterval),document.getElementById("order-success-page").classList.add("hidden"),switchCustomerTab("home")}function openTrackerFromSuccess(){successCountdownInterval&&clearInterval(successCountdownInterval),document.getElementById("order-success-page").classList.add("hidden"),openTrackerSheet(lastSubmittedOrderId||"")}function backToHomeFromTracker(){closeTrackerSheet(),switchCustomerTab("home")}function openTrackerSheet(t=""){document.getElementById("tracker-search").value=t,trackerDateFilter="all",document.getElementById("tracker-sheet").classList.remove("hidden"),renderTrackerList()}function closeTrackerSheet(){document.getElementById("tracker-sheet").classList.add("hidden")}function setTrackerDateFilter(t){trackerDateFilter=t,renderTrackerList()}function getOrderDateCategory(t){const e=(t.deliveryDate||"").trim().toLowerCase();return e==="today"||e.includes("today")?"today":e==="tomorrow"||e.includes("tomorrow")?"tomorrow":"upcoming"}function renderTrackerList(){const t=document.getElementById("tracker-search").value.trim().toLowerCase(),e=state.orders.filter(m=>!t||String(m.id).includes(t)||m.phone&&m.phone.includes(t)||m.customerName&&m.customerName.toLowerCase().includes(t)||m.cakeName&&m.cakeName.toLowerCase().includes(t)),n=document.getElementById("tracker-list"),o=document.getElementById("tracker-date-filter-bar"),s=e.length,r=e.filter(m=>getOrderDateCategory(m)==="today").length,a=e.filter(m=>getOrderDateCategory(m)==="tomorrow").length,i=e.filter(m=>getOrderDateCategory(m)==="upcoming").length;if(o){const m=[{id:"all",label:"All Dates",count:s},{id:"today",label:"Today",count:r},{id:"tomorrow",label:"Tomorrow",count:a},{id:"upcoming",label:"Upcoming",count:i}];o.innerHTML=m.map(g=>{const f=trackerDateFilter===g.id;return`
            <button onclick="setTrackerDateFilter('${g.id}')" class="px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all active:scale-95 flex items-center gap-1.5 ${f?"btn-berry text-white shadow-rose-sm":"bg-white text-ink border border-blush-200/90 hover:bg-blush-50"}">
              <span>${g.label}</span>
              <span class="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold ${f?"bg-white/20 text-white":"bg-blush-100 text-berry"}">${g.count}</span>
            </button>
          `}).join("")}const l=trackerDateFilter==="all"?e:e.filter(m=>getOrderDateCategory(m)===trackerDateFilter);if(!l.length){n.innerHTML=`<div class="bg-white rounded-[20px] p-6 text-center text-xs text-ink-muted shadow-rose space-y-1">
          <div class="font-bold text-ink">No orders found</div>
          <div>No orders match the selected date classification or search term.</div>
        </div>`;return}const d=[{id:"today",title:"Today's Deliveries",badgeColor:"bg-emerald-100 text-emerald-800",dotColor:"bg-emerald-500",orders:l.filter(m=>getOrderDateCategory(m)==="today")},{id:"tomorrow",title:"Tomorrow's Deliveries",badgeColor:"bg-amber-100 text-amber-800",dotColor:"bg-amber-500",orders:l.filter(m=>getOrderDateCategory(m)==="tomorrow")},{id:"upcoming",title:"Upcoming & Scheduled Deliveries",badgeColor:"bg-purple-100 text-purple-800",dotColor:"bg-purple-500",orders:l.filter(m=>getOrderDateCategory(m)==="upcoming")}].filter(m=>m.orders.length>0);let u="",p=0;d.forEach(m=>{u+=`
          <div class="pt-2 pb-1 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full ${m.dotColor}"></span>
              <h4 class="text-xs font-black uppercase tracking-wider text-ink">${m.title}</h4>
            </div>
            <span class="px-2 py-0.5 rounded-full text-[9.5px] font-extrabold ${m.badgeColor}">${m.orders.length} ${m.orders.length===1?"Order":"Orders"}</span>
          </div>
        `,m.orders.forEach(g=>{p++;const f=g.status==="Pending"||g.status==="Payment Pending"?"Payment Pending":g.status==="Completed"?"Completed":"Approved",b=Math.max(0,STATUS_STAGES.indexOf(f)),y=f==="Completed"?"bg-emerald-50 text-emerald-700 border border-emerald-200":f==="Approved"?"bg-sky-50 text-sky-700 border border-sky-200":"bg-amber-50 text-amber-700 border border-amber-200";u+=`
            <div class="cake-card-animate bg-white rounded-[20px] p-3.5 shadow-rose border border-white space-y-2.5 mb-2.5" style="animation-delay: ${p*40}ms">
              <div class="flex items-start justify-between gap-2">
                <div>
                  <div class="flex items-center gap-1.5">
                    <span class="font-extrabold text-sm text-ink">Order #${g.id}</span>
                    <span class="px-1.5 py-0.5 rounded-md bg-blush-50 border border-blush-200 text-[9px] font-bold text-berry">${g.deliveryDate}</span>
                  </div>
                  <div class="text-[11px] text-ink-muted">${g.customerName} \u2022 ${g.phone}</div>
                </div>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${y}">${f}</span>
              </div>

              <!-- 3-Stage Progress Bar -->
              <div class="space-y-1">
                <div class="grid grid-cols-3 gap-1.5">
                  ${STATUS_STAGES.map((k,C)=>`<div class="h-1.5 rounded-full ${C<=b?b===2?"bg-emerald-500":"bg-berry":"bg-blush-200"}"></div>`).join("")}
                </div>
                <div class="grid grid-cols-3 text-[9px] font-bold text-center text-ink-muted">
                  <span>Payment Pending</span><span>Approved</span><span>Completed</span>
                </div>
              </div>

              <!-- Cake Item Summary -->
              <div class="bg-blush-50 rounded-2xl p-2.5 flex items-center gap-2.5">
                <img src="${g.cakeImg||SVG_CAKE_FALLBACK}" class="w-11 h-11 rounded-xl object-cover shrink-0" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
                <div class="min-w-0 flex-1 text-[11px]">
                  <div class="font-bold text-ink truncate">${g.cakeName}</div>
                  <div class="text-ink-muted truncate">${g.size} \u2022 ${g.flavor}</div>
                  ${g.inscription?`<div class="text-berry font-semibold truncate">${getLuxurySvg("pen","w-3.5 h-3.5 inline-block mr-1")} "${g.inscription}"</div>`:""}
                </div>
                <div class="text-right shrink-0">
                  <div class="text-xs font-extrabold text-berry">${fmtETB(g.total)}</div>
                  <div class="text-[9px] font-bold ${g.paymentStatus==="Paid"?"text-emerald-600":"text-amber-600"}">${g.paymentStatus==="Paid"?"Paid":g.paymentPlan==="half"?"50% Deposit":g.paymentPlan==="cod"?"Pay on Delivery":"Verifying"}</div>
                </div>
              </div>

              <!-- Delivery Schedule Badge -->
              <div class="flex items-center justify-between pt-1 border-t border-blush-100 text-[10.5px]">
                <div class="flex items-center gap-1.5 text-berry font-bold">
                  <svg class="w-3.5 h-3.5 shrink-0 text-berry" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span>Scheduled: <strong class="text-ink">${g.deliveryDate}</strong></span>
                </div>
                <div class="flex items-center gap-1 text-ink-muted font-medium">
                  <svg class="w-3 h-3 text-ink-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <span>${g.timeSlot}</span>
                </div>
              </div>
            </div>
          `})}),n.innerHTML=u}function openNotificationsSheet(){state.unreadNotifs=0,saveState(),updateCustomerBadges(),document.getElementById("notif-sheet").classList.remove("hidden"),renderNotificationsList()}let isClearingNotifs=!1;function renderNotificationsList(){const t=document.getElementById("notif-list"),e=document.getElementById("notif-clear-btn");if(t){if(!state.notifications||!state.notifications.length){e&&e.classList.add("hidden"),t.innerHTML=`
          <div class="bg-white rounded-[22px] p-8 text-center shadow-rose space-y-2.5 animate-view">
            <div class="w-14 h-14 mx-auto rounded-full bg-blush-100 text-berry flex items-center justify-center">${getLuxurySvg("bell","w-7 h-7")}</div>
            <div class="text-xs font-extrabold text-ink">No Notifications</div>
            <p class="text-[11px] text-ink-muted leading-relaxed">You're all caught up! Order updates and bakery alerts will appear here.</p>
          </div>
        `;return}e&&e.classList.remove("hidden"),t.innerHTML=state.notifications.map((n,o)=>`
        <div class="notif-item bg-white rounded-[18px] p-3.5 shadow-rose border border-white space-y-1 relative group" style="animation-delay: ${o*40}ms">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5 min-w-0">
              <span class="w-2 h-2 rounded-full bg-berry shrink-0"></span>
              <span class="text-xs font-extrabold text-ink truncate">${n.title}</span>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              <span class="text-[10px] text-ink-light">${n.time}</span>
              <button onclick="dismissSingleNotification(${n.id}, this)" aria-label="Clear notification" class="w-5 h-5 rounded-full hover:bg-blush-100 text-ink-light hover:text-berry flex items-center justify-center text-xs active:scale-90 transition-all">
                &times;
              </button>
            </div>
          </div>
          <p class="text-[11px] text-ink-muted leading-relaxed pl-3.5">${n.msg}</p>
        </div>
      `).join("")}}function clearNotifications(){if(isClearingNotifs)return;const t=document.getElementById("notif-list");if(!t)return;const e=Array.from(t.querySelectorAll(".notif-item"));if(!e.length){state.notifications=[],state.unreadNotifs=0,saveState(),updateCustomerBadges(),renderNotificationsList();return}isClearingNotifs=!0;const n=document.getElementById("notif-clear-btn");n&&n.classList.add("opacity-50","pointer-events-none");const o=110;e.forEach((r,a)=>{setTimeout(()=>{r.classList.add("is-clearing")},a*o)});const s=(e.length-1)*o+450;setTimeout(()=>{state.notifications=[],state.unreadNotifs=0,saveState(),updateCustomerBadges(),renderNotificationsList(),showCustomerToast("All notifications cleared"),isClearingNotifs=!1,n&&n.classList.remove("opacity-50","pointer-events-none")},s)}function dismissSingleNotification(t,e){const n=e?e.closest(".notif-item"):null;n?(n.classList.add("is-clearing"),setTimeout(()=>{state.notifications=(state.notifications||[]).filter(o=>o.id!==t),state.unreadNotifs=Math.max(0,state.unreadNotifs-1),saveState(),updateCustomerBadges(),renderNotificationsList()},430)):(state.notifications=(state.notifications||[]).filter(o=>o.id!==t),state.unreadNotifs=Math.max(0,state.unreadNotifs-1),saveState(),updateCustomerBadges(),renderNotificationsList())}function closeNotificationsSheet(){document.getElementById("notif-sheet").classList.add("hidden")}function openContactSheet(){const t=document.getElementById("notif-sheet");t&&t.classList.add("hidden");const e=document.getElementById("tracker-sheet");e&&e.classList.add("hidden");const n=document.getElementById("order-wizard-page");if(n&&!n.classList.contains("hidden"))return;const o=document.getElementById("contact-backdrop"),s=document.getElementById("contact-sheet");o&&o.classList.remove("hidden"),s&&(s.classList.remove("hidden"),requestAnimationFrame(()=>s.classList.remove("translate-y-full")))}function closeContactSheet(){const t=document.getElementById("contact-sheet"),e=document.getElementById("contact-backdrop");t&&t.classList.add("translate-y-full"),setTimeout(()=>{e&&e.classList.add("hidden"),t&&t.classList.contains("translate-y-full")&&t.classList.add("hidden")},260)}let activeScrollContainer=null,keyboardResetTimer=null;function findClosestScrollContainer(t){return t?t.closest("#order-wizard-page")?document.getElementById("order-sheet-body"):t.closest("#customer-scroll-area, #admin-scroll-area, #order-sheet-body, #quick-upload-sheet > div, #add-cake-sheet > div, #add-dec-sheet > div, #admin-add-creation-modal > div, .phone-scroll, .overflow-y-auto"):null}function initUniversalKeyboardHandling(){document.addEventListener("focusin",t=>{const e=t.target;if(!e||!["INPUT","TEXTAREA","SELECT"].includes(e.tagName))return;keyboardResetTimer&&(clearTimeout(keyboardResetTimer),keyboardResetTimer=null);const n=findClosestScrollContainer(e);n&&(activeScrollContainer&&activeScrollContainer!==n&&activeScrollContainer.classList.remove("keyboard-active-container"),activeScrollContainer=n,n.classList.add("keyboard-active-container")),setTimeout(()=>{e.scrollIntoView({behavior:"smooth",block:"center",inline:"nearest"})},120)},!0),document.addEventListener("focusout",t=>{const e=t.target;!e||!["INPUT","TEXTAREA","SELECT"].includes(e.tagName)||(keyboardResetTimer=setTimeout(()=>{activeScrollContainer&&(activeScrollContainer.classList.remove("keyboard-active-container"),activeScrollContainer=null)},180))},!0),document.addEventListener("keydown",t=>{const e=t.target,n=e&&["INPUT","TEXTAREA","SELECT"].includes(e.tagName);if(t.key==="Escape"){n&&e.blur();const o=document.getElementById("admin-notif-modal");if(o&&!o.classList.contains("hidden")){toggleAdminNotifications(!1);return}const s=document.getElementById("quick-upload-sheet");if(s&&!s.classList.contains("hidden")){closeQuickUploadModal();return}const r=document.getElementById("add-cake-sheet");if(r&&!r.classList.contains("hidden")){closeAddCakeSheet();return}const a=document.getElementById("add-dec-sheet");if(a&&!a.classList.contains("hidden")){closeAddDecorationSheet();return}const i=document.getElementById("order-wizard-page");if(i&&!i.classList.contains("hidden")){closeOrderSheet();return}const l=document.getElementById("admin-add-creation-modal");if(l&&!l.classList.contains("hidden")){closeAdminAddCreationModal();return}const d=document.getElementById("contact-sheet");if(d&&!d.classList.contains("hidden")){closeContactSheet();return}return}if(t.key==="Enter"&&n){if(e.tagName==="TEXTAREA")return;if(t.preventDefault(),["home-search-input","menu-search-input","admin-menu-search","admin-dec-search","tracker-search"].includes(e.id)){e.blur();return}if(e.id==="step4-name-input"){const s=document.getElementById("step4-phone-input");s&&s.focus();return}if(e.id==="step4-phone-input"){const s=document.getElementById("step4-address-input");s&&s.focus();return}if(e.id==="step4-address-input"){e.blur();return}if(e.id==="quick-cake-name"){const s=document.getElementById("quick-cake-price");s&&s.focus();return}if(e.id==="quick-cake-price"){const s=document.getElementById("quick-cake-desc");s&&s.focus();return}if(e.id==="cake-form-name"){const s=document.getElementById("cake-form-price");s&&s.focus();return}if(e.id==="cake-form-price"){const s=document.getElementById("cake-form-desc");s&&s.focus();return}if(e.id==="shop-sec-curr-pin"){const s=document.getElementById("shop-sec-new-pin");s&&s.focus();return}if(e.id==="shop-sec-new-pin"){const s=document.getElementById("shop-sec-conf-pin");s&&s.focus();return}if(e.id==="shop-sec-conf-pin"){e.blur(),updateAccountPasscode();return}if(e.id==="new-promo-code"){const s=document.getElementById("new-promo-disc");s&&s.focus();return}if(e.id==="new-promo-disc"){const s=document.getElementById("new-promo-desc");s&&s.focus();return}const o=findClosestScrollContainer(e)||e.form||e.parentElement;if(o){const s=Array.from(o.querySelectorAll('input:not([type="hidden"]), select, textarea, button:not([disabled])')).filter(a=>a.offsetParent!==null&&!a.disabled),r=s.indexOf(e);if(r>-1&&r<s.length-1){s[r+1].focus();return}}e.blur()}}),document.addEventListener("pointerdown",t=>{const e=document.activeElement;if(!e||!["INPUT","TEXTAREA"].includes(e.tagName))return;t.target.closest('input, textarea, select, button, a, label, [role="button"]')||e.blur()})}let adminNotifications=[{id:101,type:"order",title:"New Order #ORD-10048",desc:"Abebe Kebede \u2022 2,750 ETB \u2022 Red Velvet Cake",time:"8m ago",unread:!0,action:()=>{toggleAdminNotifications(!1),switchAdminTab("orders"),setAdminFilter("All")}},{id:102,type:"payment",title:"Payment Pending Review",desc:"Selamawit Bekele uploaded CBE transfer receipt for #ORD-10047",time:"24m ago",unread:!0,action:()=>{toggleAdminNotifications(!1),switchAdminTab("orders"),setAdminFilter("Payment Pending")}},{id:103,type:"system",title:"Bole Kitchen Online",desc:"Bakery open & accepting chilled delivery orders in Addis",time:"1h ago",unread:!1,action:()=>{toggleAdminNotifications(!1),switchAdminTab("overview")}}];function toggleAdminNotifications(t){const e=document.getElementById("admin-notif-modal"),n=document.getElementById("admin-notif-backdrop");if(!e||!n)return;(t!==void 0?t:e.classList.contains("hidden"))?(renderAdminNotifications(),n.classList.remove("hidden"),e.classList.remove("hidden")):(n.classList.add("hidden"),e.classList.add("hidden"))}function renderAdminNotifications(){const t=document.getElementById("admin-notif-list"),e=document.getElementById("admin-notif-badge");if(!t)return;const n=adminNotifications.filter(o=>o.unread).length;if(e&&(e.textContent=n,e.classList.toggle("hidden",n===0)),!adminNotifications.length){t.innerHTML=`
          <div class="py-6 text-center text-ink-muted">
            <svg class="w-8 h-8 mx-auto text-ink-muted/40 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <div class="text-xs font-bold text-ink">No new notifications</div>
            <p class="text-[10px]">All kitchen and order alerts are cleared.</p>
          </div>
        `;return}t.innerHTML=adminNotifications.map(o=>`
        <div onclick="handleAdminNotificationClick(${o.id})" class="p-2.5 rounded-2xl border ${o.unread?"bg-blush-50/90 border-berry/30 shadow-2xs":"bg-white border-blush-100"} hover:bg-blush-100/60 transition-all cursor-pointer flex items-start gap-2.5">
          <div class="w-7 h-7 rounded-full ${o.type==="order"?"bg-berry/15 text-berry":o.type==="payment"?"bg-amber-100 text-amber-800":"bg-emerald-100 text-emerald-800"} flex items-center justify-center shrink-0 mt-0.5">
            ${o.type==="order"?'<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>':o.type==="payment"?'<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>':'<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <span class="text-[11px] font-extrabold text-ink truncate">${o.title}</span>
              <span class="text-[9.5px] text-ink-muted shrink-0">${o.time}</span>
            </div>
            <p class="text-[10px] text-ink-muted leading-tight mt-0.5 line-clamp-2">${o.desc}</p>
          </div>
          ${o.unread?'<span class="w-2 h-2 rounded-full bg-berry shrink-0 mt-1.5"></span>':""}
        </div>
      `).join("")}function handleAdminNotificationClick(t){const e=adminNotifications.find(n=>n.id===t);e&&(e.unread=!1,renderAdminNotifications(),typeof e.action=="function"&&e.action())}function clearAdminNotifications(){adminNotifications.forEach(t=>t.unread=!1),renderAdminNotifications(),showAdminToast("All notifications marked as read")}function addAdminNotification(t,e,n="system",o=null){adminNotifications.unshift({id:Date.now(),type:n,title:t,desc:e,time:"Just now",unread:!0,action:o||(()=>toggleAdminNotifications(!1))}),renderAdminNotifications()}let quickUploadActivePhoto="",quickUploadProductType="cake";function openQuickUploadModal(){toggleAdminNotifications(!1),quickUploadActivePhoto="",quickUploadProductType="cake",document.getElementById("quick-cake-name").value="",document.getElementById("quick-cake-price").value="2800",document.getElementById("quick-cake-desc").value="",document.getElementById("quick-cake-stock").value="true",setQuickProductType("cake");const t=document.getElementById("quick-upload-step-choose"),e=document.getElementById("quick-upload-step-details");t&&t.classList.remove("hidden"),e&&e.classList.add("hidden");const n=document.getElementById("quick-modal-title"),o=document.getElementById("quick-step-indicator");n&&(n.textContent="Add New Creation"),o&&(o.textContent="Choose photo source first");const s=document.getElementById("quick-photo-preview-img");s&&(s.src="");const r=document.getElementById("quick-upload-backdrop"),a=document.getElementById("quick-upload-sheet");r&&r.classList.remove("hidden"),a&&(a.classList.remove("hidden"),requestAnimationFrame(()=>a.classList.remove("translate-y-full")))}function closeQuickUploadModal(){const t=document.getElementById("quick-upload-backdrop"),e=document.getElementById("quick-upload-sheet");e&&e.classList.add("translate-y-full"),setTimeout(()=>{t&&t.classList.add("hidden"),e&&e.classList.add("hidden")},300)}function triggerQuickCamera(){const t=document.getElementById("quick-camera-input");t&&(t.value="",t.click())}function triggerQuickGallery(){const t=document.getElementById("quick-gallery-input");t&&(t.value="",t.click())}function backToPhotoStep(){const t=document.getElementById("quick-upload-step-choose"),e=document.getElementById("quick-upload-step-details");t&&t.classList.remove("hidden"),e&&e.classList.add("hidden");const n=document.getElementById("quick-modal-title"),o=document.getElementById("quick-step-indicator");n&&(n.textContent="Add New Creation"),o&&(o.textContent="Choose photo source first")}function handleQuickUploadFileInput(t){if(t.files&&t.files[0]){const e=t.files[0],n=new FileReader;n.onload=function(o){applyQuickPhotoSelected(o.target.result,e.name)},n.readAsDataURL(e)}}function selectQuickPresetPhoto(t,e,n,o){applyQuickPhotoSelected(t,e);const s=document.getElementById("quick-cake-name");if(s&&(s.value=e),n){const r=document.getElementById("quick-cake-cat");r&&(r.value=n)}if(o){const r=document.getElementById("quick-cake-price");r&&(r.value=o)}}function applyQuickPhotoSelected(t,e="Custom Bakery Photo"){quickUploadActivePhoto=t;const n=document.getElementById("quick-photo-preview-img");n&&(n.src=t);const o=document.getElementById("quick-photo-name-label");o&&(o.textContent=e);const s=document.getElementById("quick-upload-step-choose"),r=document.getElementById("quick-upload-step-details");s&&s.classList.add("hidden"),r&&r.classList.remove("hidden");const a=document.getElementById("quick-modal-title"),i=document.getElementById("quick-step-indicator");a&&(a.textContent="Creation Details"),i&&(i.textContent="Step 2: Fill details & publish");const l=document.getElementById("quick-cake-name");l&&!l.value&&setTimeout(()=>l.focus(),150)}function setQuickProductType(t){quickUploadProductType=t;const e=document.getElementById("quick-type-cake"),n=document.getElementById("quick-type-dec"),o=document.getElementById("quick-type-creation"),s=document.getElementById("quick-cake-cat"),r=document.getElementById("quick-price-wrap"),a=document.getElementById("quick-stock-wrap");if(!e||!n||!s)return;const i="py-1.5 px-1 rounded-xl text-[11px] font-bold bg-berry text-white shadow-rose-sm transition-all cursor-pointer truncate",l="py-1.5 px-1 rounded-xl text-[11px] font-bold bg-blush-100 text-ink hover:bg-blush-200 transition-all cursor-pointer truncate";e.className=t==="cake"?i:l,n.className=t==="dec"?i:l,o&&(o.className=t==="creation"?i:l),r&&r.classList.toggle("hidden",t==="creation"),a&&a.classList.toggle("hidden",t==="creation"),t==="cake"?s.innerHTML=`
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
        `}function submitQuickUploadProduct(){const t=(document.getElementById("quick-cake-name").value||"").trim(),e=document.getElementById("quick-cake-cat").value,n=parseFloat(document.getElementById("quick-cake-price").value),o=document.getElementById("quick-cake-stock").value==="true",s=(document.getElementById("quick-cake-desc").value||"").trim();if(!quickUploadActivePhoto){showAdminToast("Please take or choose a photo first!","error"),backToPhotoStep();return}if(!t){showAdminToast("Please enter a title or product name!","error"),document.getElementById("quick-cake-name").focus();return}if(quickUploadProductType!=="creation"&&(isNaN(n)||n<=0)){showAdminToast("Please enter a valid price in ETB!","error"),document.getElementById("quick-cake-price").focus();return}if(quickUploadProductType==="cake"){const r={id:Date.now(),name:t,category:e,price:n,inStock:o,img:quickUploadActivePhoto,desc:s||"Handcrafted fresh daily in Bole with premium luxury ingredients.",rating:5,reviews:1,popular:!0};state.cakes.unshift(r),saveState(),syncAll(),addAdminNotification("New Cake Published",`${t} added to ${e} (${n} ETB)`,"order"),showAdminToast("Submitted successfully!","success"),showCustomerToast(`New Cake: ${t} added to menu!`,"success")}else if(quickUploadProductType==="creation"){Array.isArray(state.creations)||(state.creations=[]);const r={id:"cr-"+Date.now(),title:t,category:e,caption:s||"Freshly handcrafted in Bole Kitchen.",date:"Today",img:quickUploadActivePhoto,published:!0};state.creations.unshift(r),saveState(),syncAll(),addAdminNotification("New Recent Creation",`${t} added to Recent Creations (${e})`,"order"),showAdminToast("Submitted successfully!","success"),showCustomerToast(`New Creation: ${t} added!`,"success")}else{const r={id:Date.now(),name:t,category:e,price:n,inStock:o,img:quickUploadActivePhoto,desc:s||"Celebration party extra decoration."};state.decorations.unshift(r),saveState(),syncAll(),addAdminNotification("New Extra Added",`${t} added to ${e} (${n} ETB)`,"order"),showAdminToast("Submitted successfully!","success")}if(closeQuickUploadModal(),switchAdminTab("products"),quickUploadProductType==="creation"&&typeof setAdminMenuTab=="function")try{setAdminMenuTab("creations")}catch{}}function openAdminSidebar(){if(typeof isAdminSessionLocked<"u"&&isAdminSessionLocked){lockAdminPortal();return}const t=document.getElementById("admin-sidebar-backdrop"),e=document.getElementById("admin-sidebar-drawer");t&&(t.classList.remove("hidden"),requestAnimationFrame(()=>{t.classList.remove("opacity-0"),t.classList.add("opacity-100")})),e&&(e.classList.remove("-translate-x-full"),e.classList.add("translate-x-0"))}function closeAdminSidebar(){const t=document.getElementById("admin-sidebar-backdrop"),e=document.getElementById("admin-sidebar-drawer");e&&(e.classList.add("-translate-x-full"),e.classList.remove("translate-x-0")),t&&(t.classList.remove("opacity-100"),t.classList.add("opacity-0")),setTimeout(()=>{t&&t.classList.add("hidden")},280)}function selectAdminDrawerItem(t,e){if(document.querySelectorAll("#admin-drawer-nav-list .admin-drawer-item").forEach(n=>{const o=n.dataset.drawerItem===t;n.classList.toggle("bg-blush-50",o),n.classList.toggle("border-berry/40",o),n.classList.toggle("shadow-rose-sm",o),n.classList.toggle("bg-white",!o),n.classList.toggle("border-blush-100",!o);const s=n.querySelector(".drawer-item-icon");s&&(s.classList.toggle("bg-berry",o),s.classList.toggle("text-white",o),s.classList.toggle("bg-blush-100",!o),s.classList.toggle("text-berry",!o));const r=n.querySelector(".drawer-item-label");r&&(r.classList.toggle("text-berry",o),r.classList.toggle("text-ink",!o));const a=n.querySelector(".drawer-item-chevron");a&&(a.classList.toggle("text-berry",o),a.classList.toggle("text-ink-light",!o))}),t==="my-profile"){openMyProfilePage();return}if(t==="shop-management"){openShopManagementSection();return}if(t==="product-configuration"){openProductConfigSection();return}if(t==="marketing-promotions"){openMarketingSection();return}if(t==="settings"){openSettingsHubSection();return}if(t==="upgrade-plan"){openUpgradePlanPage();return}typeof showAdminToast=="function"&&showAdminToast(e+" selected")}let adminProfileData={id:"mgr-01",name:"Mahlet Mekonnen (Owner)",email:"owner@makcake.et",phone:"0911 23 45 67",role:"Owner",avatar:"./images/mak-cake-logo.webp",shopName:"MAK CAKE \u2022 Bole Kitchen",googleConnected:!1,googleEmail:"",googleClientId:""},isProfileEditMode=!1,pendingProfileAvatarData;function syncAdminProfileUI(){const t=adminProfileData,e=document.getElementById("drawer-admin-avatar"),n=document.getElementById("drawer-admin-name"),o=document.getElementById("drawer-admin-role"),s=document.getElementById("drawer-admin-shop");e&&t.avatar&&(e.src=t.avatar,e.style.display=""),n&&(n.textContent=t.name||"MAK CAKE Owner"),o&&(o.textContent=t.role||"Owner"),s&&(s.textContent=t.shopName||"MAK CAKE \u2022 Bole Kitchen");const r=document.getElementById("profile-avatar-preview"),a=document.getElementById("profile-display-name"),i=document.getElementById("profile-role-badge"),l=document.getElementById("profile-role-text"),d=document.getElementById("profile-input-name"),u=document.getElementById("profile-input-email"),p=document.getElementById("profile-input-phone");r&&(r.src=pendingProfileAvatarData||t.avatar||"./images/mak-cake-logo.webp",r.style.display=""),a&&(a.textContent=t.name||"MAK CAKE Owner"),i&&(i.textContent=t.role||"Owner"),l&&(l.textContent=t.role||"Owner"),d&&!isProfileEditMode&&(d.value=t.name||""),u&&!isProfileEditMode&&(u.value=t.email||""),p&&!isProfileEditMode&&(p.value=t.phone||"");const m=document.getElementById("profile-google-status-badge"),g=document.getElementById("profile-google-email-display"),f=document.getElementById("profile-google-connect-btn"),b=document.getElementById("profile-google-disconnect-btn");t.googleConnected&&t.googleEmail?(m&&(m.textContent="Connected",m.className="px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200"),g&&(g.textContent=t.googleEmail),f&&f.classList.add("hidden"),b&&b.classList.remove("hidden")):(m&&(m.textContent="Not Connected",m.className="px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold bg-blush-100 text-berry border border-blush-200"),g&&(g.textContent="No Google account linked"),f&&f.classList.remove("hidden"),b&&b.classList.add("hidden"))}async function loadAdminProfileFromDb(){try{const t=await fetch("/api/admin/profile",{cache:"no-store"});if(t.ok){const e=await t.json();if(e.success&&e.profile){adminProfileData={...adminProfileData,...e.profile},localStorage.setItem("mak_admin_profile_v1",JSON.stringify(adminProfileData)),syncAdminProfileUI();return}}}catch{}try{const t=localStorage.getItem("mak_admin_profile_v1");t&&(adminProfileData={...adminProfileData,...JSON.parse(t)})}catch{}syncAdminProfileUI()}function openMyProfilePage(){setProfileEditMode(!1),switchAdminTab("profile"),loadAdminProfileFromDb()}function setProfileEditMode(t){isProfileEditMode=t,pendingProfileAvatarData=void 0;const e=document.getElementById("profile-validation-error");e&&(e.classList.add("hidden"),e.textContent=""),[document.getElementById("profile-input-name"),document.getElementById("profile-input-email"),document.getElementById("profile-input-phone")].forEach(a=>{a&&(a.readOnly=!t,a.classList.toggle("bg-white",t),a.classList.toggle("border-berry/40",t),a.classList.toggle("bg-blush-50/70",!t),a.classList.toggle("border-blush-200/80",!t))});const o=document.getElementById("profile-change-photo-btn"),s=document.getElementById("profile-save-bar"),r=document.getElementById("profile-edit-toggle-label");o&&o.classList.toggle("hidden",!t),s&&s.classList.toggle("hidden",!t),r&&(r.textContent=t?"Editing":"Edit Profile"),t||syncAdminProfileUI()}function toggleProfileEditMode(){setProfileEditMode(!isProfileEditMode)}function cancelProfileEdit(){setProfileEditMode(!1)}function handleAdminProfilePhotoChange(t){const e=t.files&&t.files[0];if(!e)return;if(!e.type.startsWith("image/")){showProfileValidationError("Please select a valid image file (PNG, JPG, or WebP).");return}const n=new FileReader;n.onload=o=>{pendingProfileAvatarData=o.target.result;const s=document.getElementById("profile-avatar-preview");s&&(s.src=pendingProfileAvatarData,s.style.display=""),isProfileEditMode||setProfileEditMode(!0)},n.readAsDataURL(e)}function showProfileValidationError(t){const e=document.getElementById("profile-validation-error");e&&(e.textContent=t,e.classList.remove("hidden"))}async function saveAdminProfileChanges(){const t=(document.getElementById("profile-input-name")?.value||"").trim(),e=(document.getElementById("profile-input-email")?.value||"").trim().toLowerCase(),n=(document.getElementById("profile-input-phone")?.value||"").trim();if(t.length<2){showProfileValidationError("Full name must be at least 2 characters.");return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)){showProfileValidationError("Please enter a valid email address.");return}if(n.replace(/\D/g,"").length<9){showProfileValidationError("Please enter a valid phone number (at least 9 digits).");return}const o=document.getElementById("profile-save-btn");await runWithFeedback({lockKey:"save-admin-profile",btnEl:o,scope:"admin",loadingMsg:"Saving profile...",successMsg:"Changes saved successfully!",action:async()=>{const s={name:t,email:e,phone:n};pendingProfileAvatarData&&(s.avatar=pendingProfileAvatarData);const r=await fetch("/api/admin/profile",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)}),a=await r.json();if(!r.ok||!a.success)throw showProfileValidationError(a.error||"Could not save profile changes."),new Error(a.error||"Could not save profile changes.");return adminProfileData={...adminProfileData,...a.profile},localStorage.setItem("mak_admin_profile_v1",JSON.stringify(adminProfileData)),setProfileEditMode(!1),syncAdminProfileUI(),!0}})}function openGoogleConnectModal(){const t=document.getElementById("profile-google-oauth-backdrop"),e=document.getElementById("profile-google-oauth-modal"),n=document.getElementById("profile-google-oauth-email"),o=document.getElementById("profile-google-oauth-error");o&&o.classList.add("hidden"),n&&!n.value&&(n.value=adminProfileData.googleEmail||adminProfileData.email||"natnaelagizew27@gmail.com"),t&&t.classList.remove("hidden"),e&&e.classList.remove("hidden")}function closeGoogleConnectModal(){const t=document.getElementById("profile-google-oauth-backdrop"),e=document.getElementById("profile-google-oauth-modal");t&&t.classList.add("hidden"),e&&e.classList.add("hidden")}async function openGoogleConnectFlow(){!window.FirebaseService&&!window.__firebaseServiceReady&&await new Promise(o=>{const s=()=>{window.removeEventListener("firebase-service-ready",s),o()};window.addEventListener("firebase-service-ready",s),setTimeout(o,2e3)});const t=document.getElementById("profile-google-connect-btn"),e=t?t.innerHTML:"";if(window.FirebaseService&&typeof window.FirebaseService.isAvailable=="function"&&window.FirebaseService.isAvailable()&&typeof firebaseConfig<"u"&&firebaseConfig.apiKey&&!firebaseConfig.apiKey.includes("B7hhbWoCyWJdc"))try{t&&(t.disabled=!0,t.innerHTML="<span>Connecting Google...</span>");const o=await window.FirebaseService.signInWithGoogle();if(!o)return;await completeGoogleConnectRequest({email:o.email,name:o.displayName||adminProfileData.name,picture:o.photoURL||adminProfileData.avatar});return}catch(o){if(console.warn("Firebase Google Auth error:",o),o&&o.code==="auth/popup-closed-by-user")return}finally{t&&(t.disabled=!1,t.innerHTML=e)}openGoogleConnectModal()}async function completeGoogleConnectRequest(t){try{await fetch("/api/admin/google-connect",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}catch{}adminProfileData.googleConnected=!0,adminProfileData.googleEmail=t.email,t.name&&(adminProfileData.name=t.name),t.picture&&(adminProfileData.avatar=t.picture),localStorage.setItem("mak_admin_profile_v1",JSON.stringify(adminProfileData)),typeof syncAdminProfileUI=="function"&&syncAdminProfileUI(),closeGoogleConnectModal(),typeof showAdminToast=="function"&&showAdminToast("\u2713 Google account connected: "+adminProfileData.googleEmail,"success")}async function submitGoogleConnect(){const t=(document.getElementById("profile-google-oauth-email")?.value||"").trim().toLowerCase(),e=document.getElementById("profile-google-oauth-error");if(!/^[^s@]+@[^s@]+.[^s@]+$/.test(t)){e&&(e.textContent="Please enter a valid Google email address.",e.classList.remove("hidden"));return}try{await completeGoogleConnectRequest({email:t,name:adminProfileData.name,picture:adminProfileData.avatar})}catch(n){e&&(e.textContent=n.message,e.classList.remove("hidden"))}}async function disconnectGoogleAccount(){try{await fetch("/api/admin/google-disconnect",{method:"POST"})}catch{}adminProfileData.googleConnected=!1,adminProfileData.googleEmail="",localStorage.setItem("mak_admin_profile_v1",JSON.stringify(adminProfileData)),syncAdminProfileUI(),typeof showAdminToast=="function"&&showAdminToast("Google account disconnected","success")}function openAdminShopScreen(){closeAdminSidebar(),switchAdminTab("shop")}function openAdminSettingsScreen(){closeAdminSidebar(),switchAdminTab("settings")}function openAdminProfileModal(){closeAdminSidebar();const t=document.getElementById("admin-profile-modal-backdrop"),e=document.getElementById("admin-profile-modal");t&&t.classList.remove("hidden"),e&&e.classList.remove("hidden")}function closeAdminProfileModal(){const t=document.getElementById("admin-profile-modal-backdrop"),e=document.getElementById("admin-profile-modal");t&&t.classList.add("hidden"),e&&e.classList.add("hidden")}let isAdminSessionLocked=!1;function handleAdminLogout(){closeAdminSidebar();const t=document.getElementById("admin-logout-backdrop"),e=document.getElementById("admin-logout-modal");t&&t.classList.remove("hidden"),e&&e.classList.remove("hidden")}function closeAdminLogoutModal(){const t=document.getElementById("admin-logout-backdrop"),e=document.getElementById("admin-logout-modal");t&&t.classList.add("hidden"),e&&e.classList.add("hidden")}async function confirmAdminLogout(){const t=document.getElementById("admin-confirm-logout-btn");t&&(t.disabled=!0);try{await fetch("/api/admin/logout",{method:"POST"})}catch{}try{localStorage.setItem("mak_admin_logged_out","1"),localStorage.removeItem("mak_admin_auth_token"),sessionStorage.clear(),window.google&&google.accounts&&google.accounts.id&&google.accounts.id.disableAutoSelect(),window.FirebaseService&&typeof window.FirebaseService.signOut=="function"&&window.FirebaseService.signOut().catch(()=>{})}catch{}closeAdminLogoutModal(),lockAdminPortal(),t&&(t.disabled=!1)}function lockAdminPortal(){isAdminSessionLocked=!0,closeAdminSidebar();const t=document.getElementById("admin-login-gate"),e=document.getElementById("admin-login-gate-err");e&&(e.classList.add("hidden"),e.textContent=""),t&&t.classList.remove("hidden")}async function signInAdminWithGoogle(){const t=document.getElementById("admin-google-signin-btn"),e=document.getElementById("admin-google-signin-label"),n=document.getElementById("admin-login-gate-err");if(n&&(n.classList.add("hidden"),n.textContent=""),!window.FirebaseService&&!window.__firebaseServiceReady&&(e&&(e.textContent="Connecting..."),await new Promise(o=>{const s=()=>{window.removeEventListener("firebase-service-ready",s),o()};window.addEventListener("firebase-service-ready",s),setTimeout(o,2e3)})),!window.FirebaseService||!window.FirebaseService.isAvailable||!window.FirebaseService.isAvailable()){n&&(n.textContent="Google OAuth service is unavailable offline. Please check your internet connection.",n.classList.remove("hidden"));return}try{t&&(t.disabled=!0),e&&(e.textContent="Opening Google...");const o=await window.FirebaseService.signInWithGoogle();if(!o)return;const s=typeof o.getIdToken=="function"?await o.getIdToken(!0):"";if(!s)throw new Error("Could not obtain verified Google credential.");let r=!1;try{const i=await fetch("/api/admin/google-login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({credential:s,email:o.email,name:o.displayName||"",picture:o.photoURL||""})});if(i.ok){const l=await i.json();l&&l.success&&(r=!0,adminProfileData.googleConnected=!0,adminProfileData.googleEmail=l.user?.email||o.email,l.user?.name&&(adminProfileData.name=l.user.name),l.user?.picture&&(adminProfileData.avatar=l.user.picture))}}catch{}r||(adminProfileData.googleConnected=!0,adminProfileData.googleEmail=o.email,o.displayName&&(adminProfileData.name=o.displayName),o.photoURL&&(adminProfileData.avatar=o.photoURL)),localStorage.setItem("mak_admin_profile_v1",JSON.stringify(adminProfileData)),typeof syncAdminProfileUI=="function"&&syncAdminProfileUI(),localStorage.removeItem("mak_admin_logged_out"),isAdminSessionLocked=!1;const a=document.getElementById("admin-login-gate");a&&a.classList.add("hidden"),switchAdminTab("overview"),typeof showAdminToast=="function"&&showAdminToast("Signed in with Google: "+(data.user?.email||o.email),"success")}catch(o){if(o&&o.code==="auth/popup-closed-by-user")return;const s=o&&o.code==="auth/unauthorized-domain"?"Domain "+window.location.hostname+" is not authorized in Firebase Auth > Authorized domains.":o&&o.message||"Google Sign-In failed.";n&&(n.textContent=s,n.classList.remove("hidden"))}finally{t&&(t.disabled=!1),e&&(e.textContent="Sign in with Google")}}async function submitAdminGateLogin(){const t=(document.getElementById("admin-login-passcode")?.value||"").trim(),e=document.getElementById("admin-login-gate-err");if(!t){e&&(e.textContent="Please enter your admin passcode.",e.classList.remove("hidden"));return}try{const n=await fetch("/api/admin/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({passcode:t})}),o=await n.json();if(!n.ok||!o.success){e&&(e.textContent=o.error||"Invalid passcode.",e.classList.remove("hidden"));return}localStorage.removeItem("mak_admin_logged_out"),isAdminSessionLocked=!1;const s=document.getElementById("admin-login-gate");s&&s.classList.add("hidden"),document.getElementById("admin-login-passcode")&&(document.getElementById("admin-login-passcode").value=""),switchAdminTab("overview"),typeof showAdminToast=="function"&&showAdminToast("Signed in to MAK CAKE Admin")}catch{e&&(e.textContent="Network error. Please try again.",e.classList.remove("hidden"))}}function checkInitialAdminLockState(){localStorage.getItem("mak_admin_logged_out")==="1"&&lockAdminPortal()}function switchAdminTab(t){if(typeof isAdminSessionLocked<"u"&&isAdminSessionLocked){lockAdminPortal();return}t==="menu"&&(t="products"),adminTab=t,closeAddCakeSheet(),closeAddDecorationSheet(),closeAdminReceiptModal(),closeAdminSidebar(),document.querySelectorAll(".a-tab-view").forEach(s=>{s.classList.add("hidden"),s.classList.remove("animate-view")});const e=t==="products"?"a-tab-menu":`a-tab-${t}`,n=document.getElementById(e);n&&(n.classList.remove("hidden"),n.offsetWidth,n.classList.add("animate-view")),document.querySelectorAll(".a-nav-btn").forEach(s=>{const r=s.dataset.atab===t||t==="products"&&s.dataset.atab==="menu";s.classList.toggle("text-berry",r),s.classList.toggle("font-bold",r),s.classList.toggle("text-ink",!r),s.classList.toggle("font-medium",!r);const a=s.querySelector(".a-nav-ind");a&&a.classList.toggle("hidden",!r)});const o=document.getElementById("admin-header-shop-btn");if(o){const s=t==="shop";o.classList.toggle("bg-berry",s),o.classList.toggle("text-white",s),o.classList.toggle("border-berry",s),o.classList.toggle("bg-white",!s),o.classList.toggle("text-ink",!s),o.classList.toggle("border-blush-200",!s)}document.getElementById("admin-scroll-area").scrollTop=0,t==="overview"&&renderAdminOverview(),t==="shop"&&renderAdminShop(),t==="settings"&&renderAdminPackages(),document.getElementById("admin-scroll-area").scrollTop=0,t==="overview"&&renderAdminOverview()}function renderAdminOverview(){renderAdminHero();const t=state.orders||[],e=t.length,n=t.filter(p=>p.status==="Payment Pending"||p.status==="Pending").length,o=t.filter(p=>p.status==="Completed").length,s=t.reduce((p,m)=>p+(m.total||0),0),r=document.getElementById("overview-total-orders");r&&(r.textContent=e);const a=document.getElementById("overview-pending-orders");a&&(a.textContent=n);const i=document.getElementById("overview-completed-orders");i&&(i.textContent=o);const l=document.getElementById("overview-today-revenue");l&&(l.textContent=fmtETB(s));const d=document.getElementById("overview-pending-badge");d&&(d.textContent=n);const u=document.getElementById("overview-recent-orders-list");if(u){const p=t.slice(0,3);p.length?u.innerHTML=p.map(m=>{const g=m.status==="Payment Pending"||m.status==="Pending",f=m.status==="Approved"||["Confirmed","Preparing","Ready"].includes(m.status),b=g?"Payment Pending":f?"Approved":"Completed",y=b==="Completed"?"bg-emerald-50 text-emerald-700 border border-emerald-200":b==="Approved"?"bg-sky-50 text-sky-700 border border-sky-200":"bg-amber-50 text-amber-700 border border-amber-200";return`
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
            `}).join(""):u.innerHTML='<div class="text-center py-4 text-xs text-ink-muted">No recent orders found.</div>'}}function openExactAdminOrder(t){switchAdminTab("orders"),setAdminFilter("All"),setTimeout(()=>{const e=document.getElementById(`admin-order-card-${t}`);e&&(e.scrollIntoView({behavior:"smooth",block:"center"}),e.classList.remove("order-highlight-selected"),e.offsetWidth,e.classList.add("order-highlight-selected"),showAdminToast(`Selected Order #ORD-${t}`),setTimeout(()=>{e.classList.remove("order-highlight-selected")},3200))},120)}let adminHeroIndex=0,adminHeroTimer=null;function getAdminBanners(){return(!state.adminBanners||!state.adminBanners.length)&&(state.adminBanners=[{id:1,top:"Fresh Daily Addis",script:"Mini Bento",sub:"Same-day chilled delivery in Bole",cta:"Order Bento",link:"products",img:"https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=700&q=85"},{id:2,top:"Handcrafted in Bole",script:"Weddings",sub:"Luxury tiered cakes for Addis galas",cta:"View Specials",link:"products",img:"https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=700&q=85"},{id:3,top:"Make Every Moment",script:"Sweeter",sub:"Premium celebration cakes baked fresh",cta:"Manage Menu",link:"products",img:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=85"}]),state.adminBanners}const ADMIN_OVERVIEW_SLIDES=getAdminBanners();function renderAdminHero(){const t=getAdminBanners(),e=t[adminHeroIndex%t.length]||t[0],n=document.getElementById("admin-hero-img");n&&n.src!==e.img&&(n.style.opacity="0.35",setTimeout(()=>{n.src=e.img,n.style.opacity="1"},140));const o=document.getElementById("admin-hero-top");o&&(o.textContent=e.top);const s=document.getElementById("admin-hero-script");s&&(s.textContent=e.script);const r=document.getElementById("admin-hero-sub");r&&(r.textContent=e.sub);const a=document.getElementById("admin-hero-cta");a&&(a.textContent=e.cta);const i=document.getElementById("admin-hero-dots");i&&(i.innerHTML=getAdminBanners().map((l,d)=>`
          <button onclick="setAdminHeroSlide(${d})" aria-label="Slide ${d+1}" class="h-1.5 rounded-full transition-all cursor-pointer ${d===adminHeroIndex?"w-4 bg-berry":"w-1.5 bg-white/85"}"></button>
        `).join(""))}function setAdminHeroSlide(t){adminHeroIndex=t%ADMIN_OVERVIEW_SLIDES.length,renderAdminHero(),resetAdminHeroTimer()}function handleAdminHeroClick(){const t=ADMIN_OVERVIEW_SLIDES[adminHeroIndex]||ADMIN_OVERVIEW_SLIDES[0];t&&t.action&&t.action()}function resetAdminHeroTimer(){adminHeroTimer&&clearInterval(adminHeroTimer),adminHeroTimer=setInterval(()=>{const t=getAdminBanners().length||1;adminHeroIndex=(adminHeroIndex+1)%t,renderAdminHero()},3e3)}function toggleAdminBell(){state.shop.bellOn=!state.shop.bellOn,saveState(),syncAll(),state.shop.bellOn&&playBell(!0),showAdminToast(state.shop.bellOn?"Kitchen Bell Activated":"Kitchen Bell Muted")}function setAdminFilter(t){adminFilter=t,document.querySelectorAll(".a-fchip").forEach(e=>{e.dataset.af===t?e.className="a-fchip shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold btn-berry text-white shadow-rose-sm":e.className="a-fchip shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold bg-white text-ink-muted border border-blush-200"}),renderAdminOrders()}function advanceOrder(t,e){const n=state.orders.find(o=>o.id===t);n&&(n.status=e,n.isNewFlash=!1,sendOrderStatusPush(n.id,e),saveState(),syncAll(),showAdminToast(`Order #${n.id} \u2192 ${e}`),showCustomerToast(`\u{1F514} Order #${n.id} updated: ${e}`))}function renderAdminOrders(){const t=state.orders.filter(a=>a.status==="Payment Pending"||a.status==="Pending").length,e=state.orders.filter(a=>a.status==="Approved"||["Confirmed","Preparing","Ready"].includes(a.status)).length,n=state.orders.reduce((a,i)=>a+i.total,0);document.getElementById("kpi-orders").textContent=state.orders.length,document.getElementById("kpi-pending").textContent=t,document.getElementById("kpi-baking").textContent=e,document.getElementById("kpi-revenue").textContent=fmtETB(n),document.getElementById("header-admin-badge").textContent=t;const o=document.getElementById("admin-nav-badge");o.textContent=t,o.classList.toggle("hidden",t===0);let s=state.orders;adminFilter!=="All"&&(s=state.orders.filter(a=>adminFilter==="Payment Pending"?a.status==="Payment Pending"||a.status==="Pending":adminFilter==="Approved"?a.status==="Approved"||["Confirmed","Preparing","Ready"].includes(a.status):a.status===adminFilter));const r=document.getElementById("admin-orders-list");if(!s.length){r.innerHTML=`<div class="bg-white rounded-[20px] p-6 text-center text-xs text-ink-muted shadow-rose">No orders in "${adminFilter}".</div>`;return}r.innerHTML=s.map((a,i)=>{const l=a.paymentPlan==="half"?"Half 50%":a.paymentPlan==="cod"?"On Delivery":"Full 100%",d=a.paymentStatus==="Paid",u=a.status==="Payment Pending"||a.status==="Pending",p=a.status==="Approved"||["Confirmed","Preparing","Ready"].includes(a.status),m=u?"Payment Pending":p?"Approved":"Completed";let g="";u?g=`<button onclick="advanceOrder(${a.id}, 'Approved')" class="flex-1 py-2 rounded-full btn-berry text-white font-bold text-[11px] shadow-rose-sm active:scale-[0.98] transition-transform flex items-center justify-center gap-1"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Approve Order</button>`:p?g=`<button onclick="advanceOrder(${a.id}, 'Completed')" class="flex-1 py-2 rounded-full bg-emerald-500 text-white font-bold text-[11px] active:scale-[0.98] transition-transform flex items-center justify-center gap-1"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Mark Completed</button>`:g='<div class="flex-1 text-center py-1.5 text-[11px] font-extrabold text-emerald-600 flex items-center justify-center gap-1"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Completed &amp; Delivered</div>';const f=m==="Completed"?"bg-emerald-50 text-emerald-700":m==="Approved"?"bg-sky-50 text-sky-700 border border-sky-200":"bg-amber-50 text-amber-700 border border-amber-200";return`
          <article
            id="admin-order-card-${a.id}"
            class="admin-order-card cake-card-animate bg-white rounded-[20px] p-3.5 shadow-rose border transition-all duration-200 ${a.isNewFlash?"border-berry admin-new-flash":"border-white"} space-y-2.5"
            style="animation-delay: ${i*30}ms"
          >
            <!-- Header Row: Order ID, Price, Badges, Status -->
            <div class="flex items-start justify-between gap-2">
              <div class="min-w-0">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span class="font-extrabold text-xs text-ink">#ORD-${a.id}</span>
                  <span class="text-xs font-extrabold text-berry">${fmtETB(a.total)}</span>
                  <span class="px-1.5 py-0.5 rounded-full text-[9px] font-extrabold ${d?"bg-emerald-50 text-emerald-700 border border-emerald-200":"bg-amber-50 text-amber-700 border border-amber-200"}">${d?"Paid":l}</span>
                  ${a.pushEnabled?'<span class="px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">\u{1F514} Push On</span>':""}
                </div>
                <div class="text-[11px] font-semibold text-ink mt-0.5 truncate">${a.customerName}</div>
                <div class="text-[10px] text-ink-muted truncate">
                  <a href="tel:${a.phone.replace(/\s+/g,"")}" onclick="showAdminToast('Calling ${a.customerName}...')" class="text-berry font-bold underline">${a.phone}</a> \u2022 ${a.address}
                </div>
              </div>
              <span class="shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${f}">${m}</span>
            </div>

            <!-- Item Details Row: Proportional fixed aspect-ratio image thumbnail -->
            <div class="bg-blush-50 rounded-2xl p-2.5 flex items-center gap-2.5">
              <div class="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-blush-100 border border-blush-200 shadow-2xs flex items-center justify-center">
                <img loading="lazy" decoding="async" width="48" height="48" src="${a.cakeImg||SVG_CAKE_FALLBACK}" alt="${a.cakeName}" class="w-full h-full object-cover" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
              </div>
              <div class="min-w-0 flex-1 text-[11px]">
                <div class="font-bold text-ink truncate">${a.cakeName}</div>
                <div class="text-[10px] text-ink-muted truncate">${a.size} \u2022 ${a.flavor}</div>
                ${a.inscription?`<div class="text-[10px] text-berry font-bold truncate">${getLuxurySvg("pen","w-3.5 h-3.5 inline-block mr-1")} "${a.inscription}"</div>`:""}
                ${a.addons&&a.addons.length?`<div class="text-[9.5px] text-ink-muted truncate">${a.addons.join(", ")}</div>`:""}
              </div>
            </div>

            <div class="flex items-center justify-between text-[10px] text-ink-muted">
              <span class="truncate flex items-center gap-1"><svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg> ${a.paymentMethod} (${a.paymentRef})</span>
              <span class="shrink-0 ml-2">${a.timeSlot}</span>
            </div>

            <!-- Action Row: Inspect Receipt + One-Click Mark Paid + Lifecycle Advance -->
            <div class="flex items-center gap-1.5">
              <button onclick="openAdminReceiptModal(${a.id})" class="px-3 py-2 rounded-full bg-blush-100 hover:bg-blush-200 text-ink font-bold text-[10.5px] active:scale-95 transition-transform shrink-0 flex items-center justify-center gap-1">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>
                <span>Receipt</span>
              </button>
              ${d?"":`
                <button onclick="markOrderPaid(${a.id})" class="px-3 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-extrabold text-[10.5px] active:scale-95 transition-transform shrink-0 flex items-center justify-center gap-1">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Mark Paid</span>
                </button>
              `}
              ${g}
            </div>
          </article>
        `}).join("")}let viewerZoom=1,viewerRotation=0,viewerPanX=0,viewerPanY=0,viewerIsDragging=!1,viewerStartX=0,viewerStartY=0;function openFullscreenViewer(t,e="Full View Inspection"){if(!t)return;const n=document.getElementById("fullscreen-image-viewer"),o=document.getElementById("viewer-img"),s=document.getElementById("viewer-img-title");s&&(s.textContent=e),o&&(o.src=t),resetViewerZoom(),n&&n.classList.remove("hidden"),initViewerEvents()}function closeFullscreenViewer(){const t=document.getElementById("fullscreen-image-viewer");t&&t.classList.add("hidden")}function resetViewerZoom(){viewerZoom=1,viewerRotation=0,viewerPanX=0,viewerPanY=0,applyViewerTransform()}function zoomViewer(t){viewerZoom=Math.min(4,Math.max(.5,viewerZoom+t)),applyViewerTransform()}function rotateViewerImg(){viewerRotation=(viewerRotation+90)%360,applyViewerTransform()}function applyViewerTransform(){const t=document.getElementById("viewer-img"),e=document.getElementById("viewer-zoom-badge");t&&(t.style.transform=`translate(${viewerPanX}px, ${viewerPanY}px) scale(${viewerZoom}) rotate(${viewerRotation}deg)`),e&&(e.textContent=`${Math.round(viewerZoom*100)}%`)}let viewerEventsInitialized=!1;function initViewerEvents(){if(viewerEventsInitialized)return;viewerEventsInitialized=!0;const t=document.getElementById("viewer-viewport");if(!t)return;t.addEventListener("mousedown",n=>{viewerIsDragging=!0,viewerStartX=n.clientX-viewerPanX,viewerStartY=n.clientY-viewerPanY}),window.addEventListener("mousemove",n=>{viewerIsDragging&&(viewerPanX=n.clientX-viewerStartX,viewerPanY=n.clientY-viewerStartY,applyViewerTransform())}),window.addEventListener("mouseup",()=>{viewerIsDragging=!1}),t.addEventListener("wheel",n=>{n.preventDefault();const o=n.deltaY<0?.2:-.2;zoomViewer(o)},{passive:!1}),t.addEventListener("dblclick",()=>{viewerZoom>1.2?resetViewerZoom():(viewerZoom=2.5,applyViewerTransform())});let e=null;t.addEventListener("touchstart",n=>{n.touches.length===1?(viewerIsDragging=!0,viewerStartX=n.touches[0].clientX-viewerPanX,viewerStartY=n.touches[0].clientY-viewerPanY):n.touches.length===2&&(e=Math.hypot(n.touches[0].clientX-n.touches[1].clientX,n.touches[0].clientY-n.touches[1].clientY))},{passive:!0}),t.addEventListener("touchmove",n=>{if(n.touches.length===1&&viewerIsDragging)viewerPanX=n.touches[0].clientX-viewerStartX,viewerPanY=n.touches[0].clientY-viewerStartY,applyViewerTransform();else if(n.touches.length===2&&e){const o=Math.hypot(n.touches[0].clientX-n.touches[1].clientX,n.touches[0].clientY-n.touches[1].clientY),s=o/e;viewerZoom=Math.min(4,Math.max(.5,viewerZoom*(s>1?1.05:.95))),e=o,applyViewerTransform()}},{passive:!0}),t.addEventListener("touchend",()=>{viewerIsDragging=!1,e=null})}function openAdminReceiptModal(t){const e=state.orders.find(a=>a.id===t);if(!e)return;const n=e.paymentStatus==="Paid",o=e.paymentPlan==="half"?"Half Payment (50% Deposit)":e.paymentPlan==="cod"?"Pay on Delivery":"Full Payment (100%)";document.getElementById("receipt-modal-title").textContent=`Order #ORD-${e.id} Receipt`,document.getElementById("receipt-modal-sub").innerHTML=`${e.customerName} &bull; <span class="inline-flex items-center gap-1 text-ink">${getBrandLogo(e.paymentMethod,"w-3.5 h-3.5")} ${e.paymentMethod}</span>`,document.getElementById("receipt-modal-body").innerHTML=`
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
          <div class="flex justify-between"><span class="text-ink-muted">Payment Plan</span><span class="font-extrabold text-ink">${o}</span></div>
          <div class="flex justify-between"><span class="text-ink-muted">Reference ID</span><span class="font-extrabold text-berry">${e.paymentRef}</span></div>
          <div class="flex justify-between"><span class="text-ink-muted">Order Total</span><span class="font-extrabold text-ink">${fmtETB(e.total)}</span></div>
          <div class="flex justify-between"><span class="text-ink-muted">Due Upfront</span><span class="font-extrabold text-emerald-700">${fmtETB(e.dueNow??e.total)}</span></div>
          <div class="flex justify-between"><span class="text-ink-muted">Balance on Delivery</span><span class="font-bold text-ink">${fmtETB(e.balanceDue??0)}</span></div>
          <div class="flex justify-between pt-1 border-t border-blush-200"><span class="text-ink-muted">Status</span><span class="font-extrabold ${n?"text-emerald-600":"text-amber-600"}">${n?"Verified & Paid":"Pending Verification"}</span></div>
        </div>
      `,document.getElementById("receipt-modal-footer").innerHTML=`
        ${n?`
          <div class="flex-1 py-2 text-center text-xs font-extrabold text-emerald-700">Payment Verified</div>
        `:`
          <button onclick="markOrderPaid(${e.id}); closeAdminReceiptModal();" class="flex-1 py-2.5 rounded-full bg-emerald-600 text-white font-bold text-xs shadow-sm active:scale-95 transition-transform">
            Verify &amp; Mark as Paid
          </button>
        `}
        <button onclick="closeAdminReceiptModal()" class="px-4 py-2.5 rounded-full bg-white border border-blush-300 text-ink font-bold text-xs">Close</button>
      `,closeAddCakeSheet(),closeAddDecorationSheet();const s=document.getElementById("admin-receipt-backdrop"),r=document.getElementById("admin-receipt-modal");s&&s.classList.remove("hidden"),r&&(r.classList.remove("hidden"),requestAnimationFrame(()=>r.classList.remove("translate-y-full")))}function closeAdminReceiptModal(){const t=document.getElementById("admin-receipt-backdrop"),e=document.getElementById("admin-receipt-modal");e&&e.classList.add("translate-y-full"),setTimeout(()=>{e&&e.classList.add("hidden"),t&&t.classList.add("hidden")},260)}function markOrderPaid(t){const e=state.orders.find(n=>n.id===t);e&&(e.paymentStatus="Paid",(e.status==="Payment Pending"||e.status==="Pending")&&(e.status="Approved"),e.isNewFlash=!1,state.notifications.unshift({id:Date.now(),title:`Order Approved (#ORD-${e.id})`,msg:`Payment verified. Your order for ${e.cakeName} has been approved by MAK CAKE Bole.`,time:"Just now"}),state.unreadNotifs++,saveState(),syncAll(),showAdminToast(`Order #ORD-${e.id} Approved`),showCustomerToast(`Order #ORD-${e.id} Approved`))}let adminCakeCatFilter="All",activeCakeFormPhoto="";function setAdminCakeCatFilter(t){adminCakeCatFilter=t,renderAdminMenu()}function renderAdminMenu(){const t=(document.getElementById("admin-menu-search")?.value||"").trim().toLowerCase(),e=state.cakes.filter(i=>{const l=adminCakeCatFilter==="All"||i.category===adminCakeCatFilter,d=!t||i.name.toLowerCase().includes(t)||i.category&&i.category.toLowerCase().includes(t)||i.desc&&i.desc.toLowerCase().includes(t);return l&&d}),n=state.cakes.filter(i=>i.inStock!==!1).length,o=document.getElementById("admin-menu-sub");o&&(o.textContent=`${n}/${state.cakes.length} available \u2022 Live sync to Customer Phone`);const s=document.getElementById("admin-sub-cakes-cnt");s&&(s.textContent=state.cakes.length);const r=document.getElementById("admin-cake-cat-pills");if(r){const i=["All","Normal","Special","Cupples","Mini Cakes"];r.innerHTML=i.map(l=>{const d=adminCakeCatFilter===l,u=l==="All"?state.cakes.length:state.cakes.filter(p=>p.category===l).length;return`
            <button onclick="setAdminCakeCatFilter('${l}')" class="shrink-0 px-2.5 py-1.5 rounded-full text-[10.5px] font-bold transition-all cursor-pointer ${d?"btn-berry text-white shadow-rose-sm":"bg-white text-ink-muted border border-blush-200 hover:text-ink"}">
              ${l} (${u})
            </button>
          `}).join("")}const a=document.getElementById("admin-menu-list");if(a){if(!e.length){a.innerHTML='<div class="bg-white rounded-[18px] p-5 text-center text-xs text-ink-muted shadow-rose-sm">No cakes found in this category. Tap "+ Add Cake" to create one.</div>';return}a.innerHTML=e.map((i,l)=>{const d=i.inStock!==!1;return`
          <div class="bg-white rounded-[18px] p-3 shadow-rose-sm border border-white flex items-center justify-between gap-2.5">
            <!-- Priority Swap Buttons (Up / Down) -->
            <div class="flex flex-col shrink-0 pr-1 py-0.5 gap-0.5 select-none">
              <button onclick="moveCakePriority(${i.id}, 'up'); event.stopPropagation();" title="Move Up" class="w-6 h-5 rounded bg-blush-100 hover:bg-berry hover:text-white text-ink-muted flex items-center justify-center text-[9px] font-bold transition-colors ${l===0?"opacity-25 pointer-events-none":"active:scale-110 cursor-pointer"}">\u25B2</button>
              <button onclick="moveCakePriority(${i.id}, 'down'); event.stopPropagation();" title="Move Down" class="w-6 h-5 rounded bg-blush-100 hover:bg-berry hover:text-white text-ink-muted flex items-center justify-center text-[9px] font-bold transition-colors ${l===e.length-1?"opacity-25 pointer-events-none":"active:scale-110 cursor-pointer"}">\u25BC</button>
            </div>

            <!-- Clickable Cake Thumbnail with Camera Overlay -->
            <div onclick="triggerCakePhotoUpload(${i.id})" class="relative group cursor-pointer w-14 h-14 rounded-xl overflow-hidden bg-blush-100 border border-blush-200 shrink-0 shadow-2xs flex items-center justify-center ${d?"":"grayscale opacity-60"}">
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
                <span class="px-2 py-0.5 rounded-full text-[8.5px] font-bold ${d?"bg-emerald-50 text-emerald-700 border border-emerald-200":"bg-rose-50 text-berry border border-rose-200"} shrink-0">
                  ${d?"Available":"Sold Out"}
                </span>
              </div>
              <div class="flex items-center gap-1.5 mt-0.5">
                <span class="px-2 py-0.5 rounded-full bg-blush-100 text-ink-muted text-[9.5px] font-bold">${i.category}</span>
                <span class="text-[11px] font-black text-berry">${fmtETB(i.price)}</span>
              </div>
            </div>

            <!-- Actions: Stock Switch + Full Edit Modal + Delete -->
            <div class="flex items-center gap-1.5 shrink-0">
              <button onclick="toggleCakeStock(${i.id})" title="Toggle Available / Sold Out" class="w-8 h-8 rounded-xl ${d?"bg-emerald-50 text-emerald-600 hover:bg-emerald-100":"bg-rose-50 text-berry hover:bg-rose-100"} flex items-center justify-center transition-all active:scale-90 shadow-2xs cursor-pointer">
                ${d?'<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>':'<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'}
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
        `}).join("")}}function moveCakePriority(t,e){const n=state.cakes.findIndex(r=>r.id===t);if(n===-1)return;const o=e==="up"?n-1:n+1;if(o<0||o>=state.cakes.length)return;const[s]=state.cakes.splice(n,1);state.cakes.splice(o,0,s),saveState(),syncAll(),showAdminToast(`Moved "${s.name}" ${e==="up"?"Up":"Down"}`)}function editCakePrice(t,e){const n=parseInt(e,10);if(isNaN(n)||n<100)return;const o=state.cakes.find(s=>s.id===t);o&&(o.price=n,saveState(),syncAll(),showAdminToast(`Updated ${o.name} \u2192 ${fmtETB(n)}`))}function toggleCakeStock(t){const e=state.cakes.find(n=>n.id===t);e&&(e.inStock=!e.inStock,saveState(),syncAll(),showAdminToast(`${e.name}: ${e.inStock?"Available":"Sold Out"}`))}function openAddCakeModal(){closeAddDecorationSheet(),closeAdminReceiptModal(),document.getElementById("cake-modal-title").textContent="+ Add New Cake",document.getElementById("cake-form-id").value="",document.getElementById("cake-form-name").value="",document.getElementById("cake-form-cat").value="Normal",document.getElementById("cake-form-price").value="2800",document.getElementById("cake-form-stock").value="true",document.getElementById("cake-form-desc").value="",document.getElementById("cake-form-img-preset").value="";const t="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80";document.getElementById("cake-form-img-preview").src=t,document.getElementById("cake-form-img-status").textContent="Default Preset Photo",document.getElementById("cake-form-delete-btn").classList.add("hidden"),activeCakeFormPhoto=t;const e=document.getElementById("add-cake-backdrop"),n=document.getElementById("add-cake-sheet");e&&e.classList.remove("hidden"),n&&(n.classList.remove("hidden"),requestAnimationFrame(()=>n.classList.remove("translate-y-full")))}function openAddCakeSheet(){openAddCakeModal()}function openEditCakeModal(t){const e=state.cakes.find(s=>s.id===t);if(!e)return;closeAddDecorationSheet(),closeAdminReceiptModal(),document.getElementById("cake-modal-title").textContent="Edit Cake: "+e.name,document.getElementById("cake-form-id").value=e.id,document.getElementById("cake-form-name").value=e.name,document.getElementById("cake-form-cat").value=e.category||"Normal",document.getElementById("cake-form-price").value=e.price,document.getElementById("cake-form-stock").value=e.inStock!==!1?"true":"false",document.getElementById("cake-form-desc").value=e.desc||"",document.getElementById("cake-form-img-preset").value="",document.getElementById("cake-form-img-preview").src=e.img||SVG_CAKE_FALLBACK,document.getElementById("cake-form-img-status").textContent="Current Product Photo",document.getElementById("cake-form-delete-btn").classList.remove("hidden"),activeCakeFormPhoto=e.img||"";const n=document.getElementById("add-cake-backdrop"),o=document.getElementById("add-cake-sheet");n&&n.classList.remove("hidden"),o&&(o.classList.remove("hidden"),requestAnimationFrame(()=>o.classList.remove("translate-y-full")))}function closeAddCakeSheet(){const t=document.getElementById("add-cake-backdrop"),e=document.getElementById("add-cake-sheet");e&&e.classList.add("translate-y-full"),setTimeout(()=>{e&&e.classList.add("hidden"),t&&t.classList.add("hidden")},260)}async function handleCakeFormPhotoUpload(t){const e=t.files&&t.files[0];if(e){if(!e.type||!e.type.startsWith("image/")){showAdminToast("Please select an image file only (PNG, JPG, WEBP)"),t.value="";return}try{showAdminToast("Compressing image on-the-fly...");const n=await compressImageFileToCanvas(e,800,.82);activeCakeFormPhoto=n.dataUrl,document.getElementById("cake-form-img-preview").src=n.dataUrl,document.getElementById("cake-form-img-status").textContent=`Attached (${n.kb}KB HQ Canvas Compressed)`,showAdminToast(`Cake photo compressed (${n.kb}KB)!`)}catch(n){showAdminToast("Error compressing image: "+n.message)}t.value=""}}function handleCakePresetSelect(t){t&&(activeCakeFormPhoto=t,document.getElementById("cake-form-img-preview").src=t,document.getElementById("cake-form-img-status").textContent="Preset Selected")}function triggerCakePhotoUpload(t){const e=document.getElementById(`cake-file-${t}`);e&&e.click()}async function uploadCakePhoto(t,e){const n=e.files&&e.files[0];if(!n)return;if(!n.type||!n.type.startsWith("image/")){showAdminToast("Please select an image file only (PNG, JPG, WEBP)"),e.value="";return}const o=state.cakes.find(s=>s.id===t);if(o){try{showAdminToast("Compressing image on-the-fly...");const s=await compressImageFileToCanvas(n,800,.82);o.img=s.dataUrl,saveState(),syncAll(),showAdminToast(`Photo updated for "${o.name}" (${s.kb}KB)!`)}catch(s){showAdminToast("Error compressing photo: "+s.message)}e.value=""}}function saveAdminCakeForm(){const t=document.getElementById("cake-form-id").value,e=document.getElementById("cake-form-name"),n=document.getElementById("cake-form-price"),o=e?e.value.trim():"",s=n?n.value.trim():"",r=parseInt(s,10),a=document.getElementById("cake-form-cat").value,i=document.getElementById("cake-form-stock").value==="true",l=document.getElementById("cake-form-desc").value.trim();if(!o){highlightMissingRequirement("cake-form-name","Required: Please enter cake name"),showAdminToast("\u26A0\uFE0F Please enter cake name");return}if(!s||isNaN(r)||r<100){highlightMissingRequirement("cake-form-price","Required: Please enter a valid price (min 100 ETB)"),showAdminToast("\u26A0\uFE0F Please enter a valid cake price");return}const d=activeCakeFormPhoto||"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80";if(t){const u=Number(t),p=state.cakes.find(m=>m.id===u);if(!p)return;p.name=o,p.category=a,p.price=r,p.inStock=i,p.desc=l||p.desc,activeCakeFormPhoto&&(p.img=activeCakeFormPhoto),saveState(),syncAll(),closeAddCakeSheet(),showAdminToast(`Updated "${p.name}" live!`)}else{const u={id:Date.now(),name:o,desc:l||"Handcrafted fresh daily with premium ingredients in Bole Medhanialem.",category:a,price:r,rating:5,reviews:"New",popular:!0,inStock:i,img:d};state.cakes.unshift(u),saveState(),syncAll(),closeAddCakeSheet(),showAdminToast(`Added cake "${o}" live!`),showCustomerToast(`New Cake: ${o} added to menu!`)}}function publishNewCake(){saveAdminCakeForm()}function deleteAdminCake(t){const e=state.cakes.find(o=>o.id===t);!e||!confirm(`Are you sure you want to delete cake "${e.name}"?

This will remove it from the live menu.`)||(state.cakes=state.cakes.filter(o=>o.id!==t),saveState(),syncAll(),showAdminToast(`Deleted cake "${e.name}"`))}function deleteAdminCakeFromModal(){const t=document.getElementById("cake-form-id").value;t&&(deleteAdminCake(Number(t)),closeAddCakeSheet())}function setAdminMenuSub(t){adminMenuSub=t;const e=t==="cakes",n=t==="decorations",o=t==="creations",s=document.getElementById("admin-sub-cakes"),r=document.getElementById("admin-sub-decorations"),a=document.getElementById("admin-sub-creations");s&&(s.className=`py-1.5 rounded-full text-[10.5px] font-extrabold transition-all flex items-center justify-center gap-1 ${e?"btn-berry text-white shadow-rose-sm":"text-ink-muted hover:text-ink"}`),r&&(r.className=`py-1.5 rounded-full text-[10.5px] font-extrabold transition-all flex items-center justify-center gap-1 ${n?"btn-berry text-white shadow-rose-sm":"text-ink-muted hover:text-ink"}`),a&&(a.className=`py-1.5 rounded-full text-[10.5px] font-extrabold transition-all flex items-center justify-center gap-1 ${o?"btn-berry text-white shadow-rose-sm":"text-ink-muted hover:text-ink"}`);const i=document.getElementById("admin-menu-cakes-panel"),l=document.getElementById("admin-menu-dec-panel"),d=document.getElementById("admin-subview-creations");i&&i.classList.toggle("hidden",!e),l&&l.classList.toggle("hidden",!n),d&&d.classList.toggle("hidden",!o),e?renderAdminMenu():n?renderAdminDecorations():o&&renderAdminCreations()}function renderRecentCreations(){const t=document.getElementById("home-recent-creations-grid");if(!t)return;const e=(state.creations||[]).filter(n=>n.published!==!1);if(!e.length){t.innerHTML='<div class="col-span-2 bg-white rounded-[20px] p-5 text-center text-xs text-ink-muted shadow-rose">No creations published yet. Check back soon!</div>';return}t.innerHTML=e.map((n,o)=>`
        <div onclick="openCreationModal('${n.id}')" class="cake-card-animate bg-white rounded-[22px] p-2.5 shadow-rose border border-white flex flex-col justify-between cursor-pointer active:scale-[0.98] hover:shadow-rose-lg transition-all group" style="animation-delay: ${o*35}ms">
          <!-- Large High-Visual Hero Cake Photo -->
          <div class="relative h-40 rounded-[18px] overflow-hidden bg-blush-100 shadow-2xs">
            <img loading="lazy" decoding="async" width="180" height="180" src="${n.img||SVG_CAKE_FALLBACK}" alt="${n.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
            
            <!-- Sleek Glass Timestamp Pill (e.g. Today, 1 day ago, 2 days ago) -->
            <div class="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/55 backdrop-blur-md text-white text-[9.5px] font-bold shadow-xs flex items-center gap-1">
              <svg class="w-2.5 h-2.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>${n.date||"Today"}</span>
            </div>

            <!-- Inspect detail pill on hover -->
            <div class="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-xs text-white text-[8px] font-extrabold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-xs">
              <svg class="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <span>Details</span>
            </div>
          </div>

          <!-- Clean Card Info: Category & Cake Name -->
          <div class="p-1 pt-2 flex flex-col gap-0.5">
            <span class="text-[9px] font-black text-berry uppercase tracking-wider truncate">${n.category||"Luxury Cake"}</span>
            <h3 class="font-extrabold text-[12px] text-ink line-clamp-1 leading-snug group-hover:text-berry transition-colors">${n.title}</h3>
          </div>

          <!-- Inviting CTA: Approach customer to view details & order same -->
          <div class="mt-1.5 pt-1.5 border-t border-blush-100 flex items-center justify-between">
            <span class="text-[9.5px] font-black text-berry flex items-center gap-1">
              <svg class="w-3 h-3 text-berry" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 7V6a5 5 0 0 1 10 0v1h3a1 1 0 0 1 1 1.1l-1.2 12A2 2 0 0 1 17.8 22H6.2a2 2 0 0 1-2-1.9L3 8.1A1 1 0 0 1 4 7h3zm2 0h6V6a3 3 0 0 0-6 0v1z"/>
              </svg>
              <span>View &amp; Order Like This</span>
            </span>
            <span class="text-[10px] font-black text-berry group-hover:translate-x-0.5 transition-transform">&rarr;</span>
          </div>
        </div>
      `).join("")}function openCreationModal(t){const e=(state.creations||[]).find(d=>d.id===t);if(!e)return;selectedCreationForOrder=e;const n=document.getElementById("creation-modal-title");n&&(n.textContent=e.title);const o=document.getElementById("creation-modal-cat");o&&(o.textContent=e.category||"Luxury Cake");const s=document.getElementById("creation-modal-date");s&&(s.textContent=e.date||"Today");const r=document.getElementById("creation-modal-img");r&&(r.src=e.img||SVG_CAKE_FALLBACK);let a=state.cakes.find(d=>d.name.toLowerCase().includes(e.title.toLowerCase())||e.title.toLowerCase().includes(d.name.toLowerCase()));!a&&e.category&&(a=state.cakes.find(d=>d.category&&d.category.toLowerCase()===e.category.toLowerCase()));const i=document.getElementById("creation-modal-price");i&&(i.textContent=fmtETB(a?a.price:2650));const l=document.getElementById("creation-lightbox-modal");l&&l.classList.remove("hidden")}function closeCreationModal(){document.getElementById("creation-lightbox-modal").classList.add("hidden")}function inspectCreationPhotoFullscreen(){selectedCreationForOrder&&selectedCreationForOrder.img&&openFullscreenViewer(selectedCreationForOrder.img,selectedCreationForOrder.title+" (Kitchen Photo)")}function orderSimilarCreation(){closeCreationModal();const t=selectedCreationForOrder||(state.creations||[])[0];if(!t)return;let e=state.cakes.find(o=>o.name.toLowerCase().includes(t.title.toLowerCase())||t.title.toLowerCase().includes(o.name.toLowerCase()));!e&&t.category&&(e=state.cakes.find(o=>o.category&&o.category.toLowerCase()===t.category.toLowerCase()));const n={id:"cr-"+t.id,name:t.title,category:t.category||(e?e.category:"Luxury Custom Cakes"),price:e?e.price:2650,img:t.img||(e?e.img:SVG_CAKE_FALLBACK),desc:`Artisan creation design (${t.category||"Luxury Cake"}). Custom baked with matching piping, sponge & luxury finish.`,rating:5,reviews:32,inStock:!0};openOrderSheet(n),sheet.inscription=t.title.length>25?t.title.slice(0,25):t.title,updateSheetInsc(sheet.inscription),renderOrderSheet(),showCustomerToast(`\u{1F382} Started 6-step order wizard for "${t.title}"!`)}function renderAdminCreations(){const t=document.getElementById("admin-sub-creations-cnt");t&&(t.textContent=(state.creations||[]).length);const e=document.getElementById("admin-creations-list");if(!e)return;const n=state.creations||[];if(!n.length){e.innerHTML='<div class="bg-white rounded-[18px] p-5 text-center text-xs text-ink-muted shadow-rose-sm">No creations uploaded yet. Tap "+ Capture &amp; Upload" to post a real cake photo.</div>';return}e.innerHTML=n.map((o,s)=>`
        <div class="bg-white rounded-[18px] p-3 shadow-rose-sm border border-white flex items-center gap-2.5">
          <!-- Swap Place Buttons (Up / Down) -->
          <div class="flex flex-col shrink-0 pr-1 py-0.5 gap-0.5 select-none">
            <button onclick="moveCreationPriority('${o.id}', 'up'); event.stopPropagation();" title="Move Up" class="w-6 h-5 rounded bg-blush-100 hover:bg-berry hover:text-white text-ink-muted flex items-center justify-center text-[9px] font-bold transition-colors ${s===0?"opacity-25 pointer-events-none":"active:scale-110 cursor-pointer"}">\u25B2</button>
            <button onclick="moveCreationPriority('${o.id}', 'down'); event.stopPropagation();" title="Move Down" class="w-6 h-5 rounded bg-blush-100 hover:bg-berry hover:text-white text-ink-muted flex items-center justify-center text-[9px] font-bold transition-colors ${s===n.length-1?"opacity-25 pointer-events-none":"active:scale-110 cursor-pointer"}">\u25BC</button>
          </div>
          <div class="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-blush-100 border border-blush-200 shadow-2xs flex items-center justify-center"><img src="${o.img||SVG_CAKE_FALLBACK}" alt="${o.title}" class="w-full h-full object-cover" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" /></div>
          <div class="min-w-0 flex-1">
            <div class="text-xs font-extrabold text-ink truncate">${o.title}</div>
            <div class="text-[10px] text-berry font-bold">${o.category||"Luxury Cake"} \u2022 <span class="text-ink-muted font-medium">${o.date||"Today"}</span></div>
            <div class="pt-1">
              <button onclick="document.getElementById('cr-file-${o.id}').click()" class="px-2 py-0.5 rounded-lg bg-blush-100 hover:bg-blush-200 text-berry text-[9.5px] font-extrabold flex items-center gap-1 active:scale-95 transition-transform">
                <svg class="w-3 h-3 text-berry" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                <span>Update Photo</span>
              </button>
              <input type="file" id="cr-file-${o.id}" accept="image/png,image/jpeg,image/webp,image/jpg" onchange="uploadCreationPhoto('${o.id}', this)" class="hidden" />
            </div>
          </div>
          <button onclick="deleteCreation('${o.id}')" class="p-2 rounded-full hover:bg-rose-50 text-ink-muted hover:text-berry transition-colors shrink-0" title="Delete">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>
      `).join("")}function moveCreationPriority(t,e){const n=(state.creations||[]).findIndex(r=>String(r.id)===String(t));if(n===-1)return;const o=e==="up"?n-1:n+1;if(o<0||o>=state.creations.length)return;const[s]=state.creations.splice(n,1);state.creations.splice(o,0,s),saveState(),syncAll(),showAdminToast(`Moved "${s.title}" ${e==="up"?"Up":"Down"}`)}function openAddCreationSheet(){activeCreationPhoto="";const t=document.getElementById("new-cr-title");t&&(t.value="");const e=document.getElementById("new-cr-cat");e&&(e.value="Chocolate Cakes");const n=document.getElementById("new-cr-date");n&&(n.value="Today");const o=document.getElementById("new-cr-preview-box");o&&o.classList.add("hidden");const s=document.getElementById("new-cr-upload-btn");s&&s.classList.remove("hidden");const r=document.getElementById("admin-add-creation-modal");r&&r.classList.remove("hidden")}function closeAddCreationSheet(){document.getElementById("admin-add-creation-modal").classList.add("hidden")}function clearCreationPhoto(){activeCreationPhoto="",document.getElementById("new-cr-preview-box").classList.add("hidden"),document.getElementById("new-cr-upload-btn").classList.remove("hidden"),document.getElementById("new-cr-file").value=""}function handleCreationPhotoUpload(t){const e=t.files&&t.files[0];if(!e)return;if(!e.type||!e.type.startsWith("image/")){showAdminToast("Please select a photo only (PNG, JPG, WEBP)"),t.value="";return}const n=new FileReader;n.onload=function(o){const s=new Image;s.onload=function(){try{const a=Math.min(1,800/s.width),i=document.createElement("canvas");i.width=Math.round(s.width*a),i.height=Math.round(s.height*a),i.getContext("2d").drawImage(s,0,0,i.width,i.height),activeCreationPhoto=i.toDataURL("image/jpeg",.75)}catch{activeCreationPhoto=o.target.result}document.getElementById("new-cr-preview-img").src=activeCreationPhoto,document.getElementById("new-cr-preview-box").classList.remove("hidden"),document.getElementById("new-cr-upload-btn").classList.add("hidden"),showAdminToast("Real photo compressed and ready")},s.src=o.target.result},n.readAsDataURL(e)}function saveNewCreation(){const t=document.getElementById("new-cr-title"),e=t?t.value.trim():"",n=(document.getElementById("new-cr-cat")?.value||"Luxury Cake").trim(),o=(document.getElementById("new-cr-date")?.value||"Today").trim();if(!e){highlightMissingRequirement("new-cr-title","Required: Please enter the cake creation name"),showAdminToast("\u26A0\uFE0F Please enter the cake creation name");return}if(!activeCreationPhoto){highlightMissingRequirement("new-cr-preview-box","Required: Please capture or select a real cake photo"),showAdminToast("\u26A0\uFE0F Please capture or pick a real cake photo");return}const s={id:"cr-"+Date.now(),title:e,category:n,date:o,img:activeCreationPhoto,published:!0};state.creations=state.creations||[],state.creations.unshift(s),saveState(),syncAll(),closeAddCreationSheet(),showAdminToast(`Published "${e}" to storefront!`),showCustomerToast(`Fresh Cake Added: ${e}`)}async function uploadCreationPhoto(t,e){const n=e.files&&e.files[0];if(n){if(!n.type||!n.type.startsWith("image/")){showAdminToast("Please select an image file only (PNG, JPG, WEBP)"),e.value="";return}try{showAdminToast("Compressing photo on-the-fly...");const o=await compressImageFileToCanvas(n,800,.82),s=(state.creations||[]).find(r=>r.id===t);s&&(s.img=o.dataUrl,saveState(),syncAll(),showAdminToast(`Updated photo for "${s.title}" (${o.kb}KB HQ)!`),showGlobalToast("Creation photo updated on customer storefront!"))}catch(o){showAdminToast("Error compressing image: "+o.message)}e.value=""}}function deleteCreation(t){state.creations=(state.creations||[]).filter(e=>e.id!==t),saveState(),syncAll(),showAdminToast("Creation removed")}function compressImageFileToCanvas(t,e=800,n=.82){return new Promise((o,s)=>{if(!t||!t.type||!t.type.startsWith("image/"))return s(new Error("Please select an image file only (PNG, JPG, WEBP)."));const r=new FileReader;r.onerror=()=>s(new Error("Failed to read file.")),r.onload=function(a){const i=new Image;i.onerror=()=>s(new Error("Failed to decode image.")),i.onload=function(){try{let l=i.width,d=i.height;(l>e||d>e)&&(l>d?(d=Math.round(d*e/l),l=e):(l=Math.round(l*e/d),d=e));const u=document.createElement("canvas");u.width=l,u.height=d;const p=u.getContext("2d");p.imageSmoothingEnabled=!0,p.imageSmoothingQuality="high",p.drawImage(i,0,0,l,d);const m=u.toDataURL("image/jpeg",n),g=Math.round(m.length*3/4/1024);o({dataUrl:m,kb:g})}catch{o({dataUrl:a.target.result,kb:Math.round(a.target.result.length/1024)})}},i.src=a.target.result},r.readAsDataURL(t)})}let activeNewDecPhoto="";function setAdminDecCatFilter(t){adminDecCatFilter=t,renderAdminDecorations()}function renderAdminDecorations(){const t=document.getElementById("admin-sub-dec-cnt");t&&(t.textContent=state.decorations.length);const e=document.getElementById("admin-dec-sub"),n=state.decorations.filter(i=>i.inStock!==!1).length;e&&(e.textContent=`${n}/${state.decorations.length} active \u2022 5 predefined categories`);const o=document.getElementById("admin-dec-cat-pills");if(o){const i=[{id:"All",short:"All",svgKey:"sparkles"},...DECORATION_CATEGORIES];o.innerHTML=i.map(l=>{const d=adminDecCatFilter===l.id,u=l.id==="All"?state.decorations.length:state.decorations.filter(p=>p.category===l.id).length;return`
            <button onclick="setAdminDecCatFilter('${l.id.replace(/'/g,"\\'")}')" class="shrink-0 px-2.5 py-1.5 rounded-full text-[10.5px] font-bold transition-all ${d?"btn-berry text-white shadow-rose-sm":"bg-white text-ink-muted border border-blush-200"}">
              ${getLuxurySvg(l.svgKey||"sparkles","w-3.5 h-3.5 shrink-0 inline-block mr-1")} ${l.short} (${u})
            </button>
          `}).join("")}const s=(document.getElementById("admin-dec-search")?.value||"").trim().toLowerCase(),r=state.decorations.filter(i=>{const l=adminDecCatFilter==="All"||i.category===adminDecCatFilter,d=!s||i.name.toLowerCase().includes(s)||i.category&&i.category.toLowerCase().includes(s)||i.desc&&i.desc.toLowerCase().includes(s);return l&&d}),a=document.getElementById("admin-dec-list");if(a){if(!r.length){a.innerHTML='<div class="bg-white rounded-[18px] p-5 text-center text-xs text-ink-muted shadow-rose-sm">No decorations found matching your filter. Tap "+ Add Decoration" to create one.</div>';return}a.innerHTML=r.map((i,l)=>{const d=i.inStock!==!1;return`
          <div class="bg-white rounded-[18px] p-3 shadow-rose-sm border border-white flex items-center justify-between gap-2.5">
            <!-- Swap Place Buttons (Up / Down) -->
            <div class="flex flex-col shrink-0 pr-1 py-0.5 gap-0.5 select-none">
              <button onclick="moveDecorationPriority('${i.id}', 'up'); event.stopPropagation();" title="Move Up" class="w-6 h-5 rounded bg-blush-100 hover:bg-berry hover:text-white text-ink-muted flex items-center justify-center text-[9px] font-bold transition-colors ${l===0?"opacity-25 pointer-events-none":"active:scale-110 cursor-pointer"}">\u25B2</button>
              <button onclick="moveDecorationPriority('${i.id}', 'down'); event.stopPropagation();" title="Move Down" class="w-6 h-5 rounded bg-blush-100 hover:bg-berry hover:text-white text-ink-muted flex items-center justify-center text-[9px] font-bold transition-colors ${l===r.length-1?"opacity-25 pointer-events-none":"active:scale-110 cursor-pointer"}">\u25BC</button>
            </div>

            <!-- Clickable Photo Thumbnail with Camera Overlay -->
            <div onclick="triggerDecorationPhotoUpload('${i.id}')" class="relative group cursor-pointer w-14 h-14 rounded-xl overflow-hidden bg-blush-100 border border-blush-200 shrink-0 shadow-2xs flex items-center justify-center ${d?"":"grayscale opacity-60"}">
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
                <span class="px-2 py-0.5 rounded-full text-[8.5px] font-bold ${d?"bg-emerald-50 text-emerald-700 border border-emerald-200":"bg-rose-50 text-berry border border-rose-200"} shrink-0">
                  ${d?"Available":"Sold Out"}
                </span>
              </div>
              <div class="text-[9.5px] font-semibold text-ink-muted truncate mt-0.5">${i.category}</div>
              <div class="text-[11px] font-black text-berry mt-0.5">${fmtETB(i.price)}</div>
            </div>

            <!-- Actions: Stock Switch + Full Edit Modal + Delete -->
            <div class="flex items-center gap-1.5 shrink-0">
              <button onclick="toggleDecorationStock('${i.id}')" title="Toggle Available / Sold Out" class="w-8 h-8 rounded-xl ${d?"bg-emerald-50 text-emerald-600 hover:bg-emerald-100":"bg-rose-50 text-berry hover:bg-rose-100"} flex items-center justify-center transition-all active:scale-90 shadow-2xs">
                ${d?'<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>':'<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>'}
              </button>

              <button onclick="openEditDecorationModal('${i.id}')" title="Edit Decoration" class="w-8 h-8 rounded-xl bg-blush-100 text-ink hover:text-berry hover:bg-blush-200 flex items-center justify-center transition-all active:scale-90 shadow-2xs">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              </button>

              <button onclick="deleteAdminDecoration('${i.id}')" title="Delete Decoration" class="w-8 h-8 rounded-xl bg-blush-50 text-ink-muted hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-all active:scale-90">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
        `}).join("")}}function moveDecorationPriority(t,e){const n=state.decorations.findIndex(r=>String(r.id)===String(t));if(n===-1)return;const o=e==="up"?n-1:n+1;if(o<0||o>=state.decorations.length)return;const[s]=state.decorations.splice(n,1);state.decorations.splice(o,0,s),saveState(),syncAll(),showAdminToast(`Moved decoration "${s.name}" ${e==="up"?"Up":"Down"}`)}let activeAdminDecFormPhoto="";function openAddDecorationSheet(){openAddDecorationModal()}function openAddDecorationModal(){document.getElementById("admin-dec-modal-title").textContent="+ Add New Decoration",document.getElementById("admin-dec-form-id").value="",document.getElementById("admin-dec-form-name").value="",document.getElementById("admin-dec-form-cat").value="Candles & Toppers",document.getElementById("admin-dec-form-stock").value="true",document.getElementById("admin-dec-form-price").value="200",document.getElementById("admin-dec-form-desc").value="",document.getElementById("admin-dec-form-reqnum").checked=!1,document.getElementById("admin-dec-form-img-preview").src=SEED_DECORATIONS[0].img,document.getElementById("admin-dec-form-img-status").textContent="Default Category Photo",document.getElementById("admin-dec-form-delete-btn").classList.add("hidden"),activeAdminDecFormPhoto="",showAdminDecModal()}function openEditDecorationModal(t){const e=state.decorations.find(n=>n.id===t);e&&(document.getElementById("admin-dec-modal-title").textContent="Edit Decoration: "+e.name,document.getElementById("admin-dec-form-id").value=e.id,document.getElementById("admin-dec-form-name").value=e.name,document.getElementById("admin-dec-form-cat").value=e.category||"Candles & Toppers",document.getElementById("admin-dec-form-stock").value=e.inStock!==!1?"true":"false",document.getElementById("admin-dec-form-price").value=e.price,document.getElementById("admin-dec-form-desc").value=e.desc||"",document.getElementById("admin-dec-form-reqnum").checked=!!e.requiresNumber,document.getElementById("admin-dec-form-img-preview").src=e.img||SVG_CAKE_FALLBACK,document.getElementById("admin-dec-form-img-status").textContent="Current Decoration Photo",document.getElementById("admin-dec-form-delete-btn").classList.remove("hidden"),activeAdminDecFormPhoto=e.img||"",showAdminDecModal())}function showAdminDecModal(){closeAddCakeSheet(),closeAdminReceiptModal();const t=document.getElementById("admin-dec-backdrop"),e=document.getElementById("admin-dec-sheet");t&&t.classList.remove("hidden"),e&&(e.classList.remove("hidden"),requestAnimationFrame(()=>e.classList.remove("translate-y-full")))}function closeAdminDecModal(){const t=document.getElementById("admin-dec-backdrop"),e=document.getElementById("admin-dec-sheet");e&&e.classList.add("translate-y-full"),setTimeout(()=>{e&&e.classList.add("hidden"),t&&t.classList.add("hidden")},260)}function closeAddDecorationSheet(){closeAdminDecModal()}async function handleAdminDecFormPhotoUpload(t){const e=t.files&&t.files[0];if(e){if(!e.type||!e.type.startsWith("image/")){showAdminToast("Please select an image file only (PNG, JPG, WEBP)"),t.value="";return}try{showAdminToast("Compressing image on-the-fly...");const n=await compressImageFileToCanvas(e,800,.82);activeAdminDecFormPhoto=n.dataUrl,document.getElementById("admin-dec-form-img-preview").src=n.dataUrl,document.getElementById("admin-dec-form-img-status").textContent=`Attached (${n.kb}KB HQ Canvas Compressed)`,showAdminToast(`Decoration photo compressed (${n.kb}KB)!`)}catch(n){showAdminToast("Error compressing image: "+n.message)}t.value=""}}function saveAdminDecorationForm(){const t=document.getElementById("admin-dec-form-id").value,e=document.getElementById("admin-dec-form-name"),n=document.getElementById("admin-dec-form-price"),o=e?e.value.trim():"",s=n?n.value.trim():"",r=parseInt(s,10),a=document.getElementById("admin-dec-form-cat").value,i=document.getElementById("admin-dec-form-stock").value==="true",l=document.getElementById("admin-dec-form-desc").value.trim(),d=document.getElementById("admin-dec-form-reqnum").checked;if(!o){highlightMissingRequirement("admin-dec-form-name","Required: Please enter decoration product name"),showAdminToast("\u26A0\uFE0F Please enter decoration name");return}if(!s||isNaN(r)||r<10){highlightMissingRequirement("admin-dec-form-price","Required: Please enter a valid price (minimum 10 ETB)"),showAdminToast("\u26A0\uFE0F Please enter a valid price (minimum 10 ETB)");return}if(t){const u=state.decorations.findIndex(p=>p.id===t);u!==-1&&(state.decorations[u].name=o,state.decorations[u].category=a,state.decorations[u].inStock=i,state.decorations[u].price=r,state.decorations[u].desc=l,state.decorations[u].requiresNumber=d,activeAdminDecFormPhoto&&(state.decorations[u].img=activeAdminDecFormPhoto),saveState(),syncAll(),closeAdminDecModal(),showAdminToast(`Updated "${o}" successfully!`),showGlobalToast(`"${o}" updated and synced live to customer catalog!`))}else{const u={id:"dec-"+Date.now(),name:o,category:a,inStock:i,price:r,desc:l,requiresNumber:d,svgKey:(DECORATION_CATEGORIES.find(p=>p.id===a)||{}).svgKey||"sparkles",img:activeAdminDecFormPhoto||(SEED_DECORATIONS.find(p=>p.category===a)||SEED_DECORATIONS[0]).img};state.decorations.unshift(u),saveState(),syncAll(),closeAdminDecModal(),showAdminToast(`Created "${o}" in ${a}!`),showGlobalToast(`New decoration "${o}" synced to Customer Storefront!`)}}function deleteCurrentAdminDecoration(){const t=document.getElementById("admin-dec-form-id").value;t&&deleteAdminDecoration(t)}function deleteAdminDecoration(t){const e=state.decorations.find(o=>o.id===t);!e||!window.confirm(`Are you sure you want to delete "${e.name}" from Extra Decorations?

This action cannot be undone.`)||(state.decorations=state.decorations.filter(o=>o.id!==t),state.decSelections&&state.decSelections[t]&&delete state.decSelections[t],saveState(),syncAll(),closeAdminDecModal(),showAdminToast(`Deleted "${e.name}"`),showGlobalToast("Decoration removed from customer storefront catalog."))}function toggleDecorationStock(t){const e=state.decorations.find(n=>n.id===t);e&&(e.inStock=e.inStock===!1,saveState(),syncAll(),showAdminToast(`${e.name}: ${e.inStock?"Available (In Stock)":"Sold Out"}`),showGlobalToast(`${e.name} is now ${e.inStock?"available to order":"marked Sold Out"}`))}function triggerDecorationPhotoUpload(t){const e=document.getElementById("dec-file-"+t);e&&e.click()}async function uploadDecorationPhoto(t,e){const n=e.files&&e.files[0];if(n){if(!n.type||!n.type.startsWith("image/")){showAdminToast("Please select an image file only (PNG, JPG, WEBP)"),e.value="";return}try{showAdminToast("Compressing photo on-the-fly...");const o=await compressImageFileToCanvas(n,800,.82),s=state.decorations.find(r=>r.id===t);s&&(s.img=o.dataUrl,saveState(),syncAll(),showAdminToast(`Updated photo for "${s.name}" (${o.kb}KB HQ)!`),showGlobalToast("New decoration photo synced to customer catalog!"))}catch(o){showAdminToast("Error compressing image: "+o.message)}e.value=""}}let analyticsDateRange="all",analyticsProductTab="cakes";function setAnalyticsDateRange(t){analyticsDateRange=t,renderAdminAnalytics()}function setAnalyticsProductTab(t){analyticsProductTab=t,renderAdminAnalytics()}function getAnalyticsOrders(){const t=(state.orders||[]).filter(e=>e.status!=="Cancelled");return analyticsDateRange==="all"?t:analyticsDateRange==="today"?t.filter(e=>{if(e.deliveryDate==="Today")return!0;if(e.createdAt){const n=new Date(e.createdAt),o=new Date;return n.getDate()===o.getDate()&&n.getMonth()===o.getMonth()&&n.getFullYear()===o.getFullYear()}return!1}):analyticsDateRange==="7days"?t.filter(e=>e.deliveryDate==="Today"||e.deliveryDate==="Tomorrow"?!0:e.createdAt?(Date.now()-e.createdAt)/864e5<=7:!0):analyticsDateRange==="30days"?t.filter(e=>e.createdAt?(Date.now()-e.createdAt)/864e5<=30:!0):t}function renderAdminAnalytics(){const t=document.getElementById("admin-analytics-body");if(!t)return;const e=getAnalyticsOrders(),n=e.length,o=e.filter(c=>c.paymentStatus==="Paid"),s=o.reduce((c,h)=>c+(h.total||0),0),r=e.reduce((c,h)=>c+(h.total||0),0),a=e.filter(c=>c.paymentStatus!=="Paid"),i=a.reduce((c,h)=>c+(h.total||0),0),l=o.length?Math.round(s/o.length):n?Math.round(r/n):0,d=[{label:"Mon",rev:Math.round(s*.12),orders:Math.max(0,Math.round(n*.15))},{label:"Tue",rev:Math.round(s*.14),orders:Math.max(0,Math.round(n*.15))},{label:"Wed",rev:Math.round(s*.18),orders:Math.max(1,Math.round(n*.2))},{label:"Thu",rev:Math.round(s*.1),orders:Math.max(0,Math.round(n*.1))},{label:"Fri",rev:Math.round(s*.22),orders:Math.max(1,Math.round(n*.2))},{label:"Sat",rev:Math.round(s*.16),orders:Math.max(1,Math.round(n*.15))},{label:"Sun",rev:Math.round(s*.08),orders:Math.max(0,Math.round(n*.05))}],u=Math.max(...d.map(c=>c.rev),1e3),p={};e.forEach(c=>{const h=c.cakeName||"Custom Cake";p[h]||(p[h]={name:h,img:c.cakeImg||"",qty:0,rev:0}),p[h].qty+=1,p[h].rev+=c.total||0});const m=Object.values(p).sort((c,h)=>h.qty!==c.qty?h.qty-c.qty:h.rev-c.rev),g=m.length?Math.max(...m.map(c=>c.rev),1):1,f={};e.forEach(c=>{Array.isArray(c.addons)&&c.addons.length&&c.addons.forEach(h=>{const w=String(h||"").trim();if(!w)return;const v=(state.decorations||[]).find(A=>w.toLowerCase().includes(A.name.toLowerCase())||A.name.toLowerCase().includes(w.toLowerCase())),x=v?v.name:w.replace(/\s*\(\d+\s*ETB\)/i,"").trim(),E=v?v.price:150,B=v?v.img:"",$=v?v.category:"Decorations";f[x]||(f[x]={name:x,category:$,img:B,qty:0,rev:0}),f[x].qty+=1,f[x].rev+=E})});const b=Object.values(f).sort((c,h)=>h.qty!==c.qty?h.qty-c.qty:h.rev-c.rev),y=b.length?Math.max(...b.map(c=>c.rev),1):1,k={Telebirr:0,"CBE Transfer":0,"Pay on Delivery":0};e.forEach(c=>{const h=c.paymentMethod||"Telebirr";k[h]!==void 0?k[h]+=c.total||0:k["Pay on Delivery"]+=c.total||0});const C={today:"Today","7days":"Last 7 Days","30days":"Last 30 Days",all:"All Time"};t.innerHTML=`
        <!-- DATE RANGE SELECTOR (Today | Last 7 Days | Last 30 Days | All Time) -->
        <div class="bg-white rounded-[20px] p-1.5 shadow-rose-sm border border-white grid grid-cols-4 gap-1 select-none">
          ${["today","7days","30days","all"].map(c=>{const h=analyticsDateRange===c,w=C[c];return`
              <button onclick="setAnalyticsDateRange('${c}')" class="py-2 rounded-xl text-[10.5px] font-extrabold transition-all cursor-pointer ${h?"btn-berry text-white shadow-rose-sm":"text-ink-muted hover:text-ink hover:bg-blush-50"}">
                ${w}
              </button>
            `}).join("")}
        </div>

        <!-- 1. BUSINESS OVERVIEW: 4 KEY SUMMARY CARDS -->
        <div class="space-y-1.5">
          <div class="flex items-center justify-between px-0.5">
            <span class="text-xs font-extrabold text-ink">Business Overview</span>
            <span class="text-[10px] font-bold text-ink-muted">${C[analyticsDateRange]}</span>
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
                <span>${o.length} verified paid</span>
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
              <div class="text-xl font-black text-berry">${fmtETB(s)}</div>
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
              <p class="text-[10px] text-ink-muted">Revenue &amp; order volume trend (${C[analyticsDateRange]})</p>
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
              <div class="text-xs font-extrabold text-berry mt-0.5">${fmtETB(s)}</div>
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
              ${d.map(c=>{const h=Math.max(6,Math.round(c.rev/u*88));return`
                  <div class="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                    <span class="text-[8px] font-extrabold text-ink opacity-0 group-hover:opacity-100 transition-opacity">${c.rev?c.rev>=1e3?(c.rev/1e3).toFixed(1)+"k":c.rev:"0"}</span>
                    <div class="w-full max-w-[24px] rounded-t-lg bg-gradient-to-t from-berry-dark to-berry shadow-rose-sm transition-all duration-300" style="height:${h}%;"></div>
                    <span class="text-[9px] font-bold text-ink-muted mt-0.5">${c.label}</span>
                  </div>
                `}).join("")}
            </div>
          </div>

          <!-- Unverified payment note if any -->
          ${i>0?`
            <div class="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/60 flex items-center justify-between text-xs">
              <div class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                <span class="text-[10.5px] font-semibold text-amber-900">${a.length} Pending / Unverified Orders</span>
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
                Cakes (${m.length})
              </button>
              <button onclick="setAnalyticsProductTab('decorations')" class="px-2.5 py-1 rounded-full transition-all cursor-pointer ${analyticsProductTab==="decorations"?"bg-berry text-white shadow-rose-sm":"text-ink-muted hover:text-ink"}">
                Extra Decs (${b.length})
              </button>
            </div>
          </div>

          <!-- A. BEST-SELLING CAKES LIST -->
          ${analyticsProductTab==="cakes"?`
            <div class="space-y-2">
              ${m.length?m.map((c,h)=>{const w=h===0?"bg-stargold text-amber-900":h===1?"bg-slate-200 text-slate-800":h===2?"bg-amber-100 text-amber-800":"bg-blush-100 text-ink-muted",v=Math.round(c.rev/(g||1)*100);return`
                  <div class="bg-blush-50/70 p-2.5 rounded-2xl border border-blush-100 space-y-2">
                    <div class="flex items-center justify-between gap-2.5">
                      <div class="flex items-center gap-2.5 min-w-0">
                        <span class="w-5 h-5 rounded-full ${w} text-[9.5px] font-black flex items-center justify-center shrink-0">
                          #${h+1}
                        </span>
                        <div class="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-blush-100 border border-blush-200 shadow-2xs">
                          <img src="${c.img||SVG_CAKE_FALLBACK}" alt="${c.name}" class="w-full h-full object-cover" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
                        </div>
                        <div class="min-w-0">
                          <div class="text-[11.5px] font-extrabold text-ink truncate">${c.name}</div>
                          <div class="text-[10px] font-semibold text-ink-muted">${c.qty} sold in period</div>
                        </div>
                      </div>
                      <div class="text-right shrink-0">
                        <div class="text-[11.5px] font-black text-berry">${fmtETB(c.rev)}</div>
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
              ${b.length?b.map((c,h)=>{const w=h===0?"bg-stargold text-amber-900":h===1?"bg-slate-200 text-slate-800":h===2?"bg-amber-100 text-amber-800":"bg-blush-100 text-ink-muted",v=Math.round(c.rev/(y||1)*100);return`
                  <div class="bg-blush-50/70 p-2.5 rounded-2xl border border-blush-100 space-y-2">
                    <div class="flex items-center justify-between gap-2.5">
                      <div class="flex items-center gap-2.5 min-w-0">
                        <span class="w-5 h-5 rounded-full ${w} text-[9.5px] font-black flex items-center justify-center shrink-0">
                          #${h+1}
                        </span>
                        <div class="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-blush-100 border border-blush-200 shadow-2xs flex items-center justify-center">
                          ${c.img?`<img src="${c.img}" alt="${c.name}" class="w-full h-full object-cover" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />`:'<span class="text-sm">\u2728</span>'}
                        </div>
                        <div class="min-w-0">
                          <div class="text-[11.5px] font-extrabold text-ink truncate">${c.name}</div>
                          <div class="text-[9.5px] font-semibold text-ink-muted">${c.category} \u2022 ${c.qty} ordered</div>
                        </div>
                      </div>
                      <div class="text-right shrink-0">
                        <div class="text-[11.5px] font-black text-berry">${fmtETB(c.rev)}</div>
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
                <p class="text-[10px] text-ink-muted">Actual revenue received across channels (${C[analyticsDateRange]})</p>
              </div>
            </div>
            <span class="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
              ${fmtETB(s)} Received
            </span>
          </div>

          <!-- Total Earned Summary Cards -->
          <div class="grid grid-cols-2 gap-2 text-xs">
            <div class="bg-blush-50/70 p-3 rounded-2xl border border-blush-100 space-y-0.5">
              <div class="text-[10px] font-bold text-ink-muted">Verified Received Cash</div>
              <div class="text-lg font-black text-berry">${fmtETB(s)}</div>
              <div class="text-[9.5px] text-emerald-600 font-semibold">${o.length} paid orders</div>
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
            ${[{name:"Telebirr",amount:k.Telebirr||0,color:"bg-berry",barColor:"bg-berry"},{name:"CBE Bank Transfer",amount:k["CBE Transfer"]||0,color:"bg-amber-500",barColor:"bg-amber-500"},{name:"Cash on Arrival",amount:k["Pay on Delivery"]||0,color:"bg-emerald-500",barColor:"bg-emerald-500"}].map(c=>{const h=r>0?Math.round(c.amount/r*100):0;return`
                <div class="space-y-1 bg-blush-50/40 p-2.5 rounded-xl border border-blush-100/70">
                  <div class="flex items-center justify-between text-xs">
                    <span class="font-bold text-ink flex items-center gap-1.5">
                      <span class="w-2 h-2 rounded-full ${c.color}"></span>
                      ${c.name}
                    </span>
                    <span class="font-extrabold text-ink">${fmtETB(c.amount)} <span class="text-[10px] font-semibold text-ink-muted">(${h}%)</span></span>
                  </div>
                  <div class="h-2 rounded-full bg-blush-100 overflow-hidden">
                    <div class="h-full ${c.barColor} rounded-full transition-all duration-500" style="width: ${h}%"></div>
                  </div>
                </div>
              `}).join("")}
          </div>

          <!-- Final Net Earned Footer -->
          <div class="pt-2 border-t border-blush-100 flex items-center justify-between text-xs">
            <span class="text-[11px] font-bold text-ink">Total Net Earned (${C[analyticsDateRange]})</span>
            <span class="text-base font-black text-berry">${fmtETB(s)}</span>
          </div>
        </div>
      `}const DEFAULT_SHOP_CONFIG={isOpen:!0,deliveryFee:150,bellOn:!0,businessName:"MAK CAKE",businessLogo:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=120&q=80",businessPhone:SHOP_SETTINGS_CONFIG.phoneLocal,businessAddress:"Bole Medhanialem, near Edna Mall, Addis Ababa",businessDesc:"Addis Ababa Premier Halal Luxury Cake Bakery & Dessert Boutique",businessLocation:"Bole Medhanialem, Addis Ababa",deliveryEnabled:!0,pickupEnabled:!0,minOrderAmount:500,deliveryAreas:"Bole, CMC, Kazanchis, Old Airport, Sarbet, Piassa, Summit",deliveryInstructions:"Same-day delivery chilled in insulated carrier boxes with real-time driver tracking.",paymentMethods:{telebirr:{enabled:!0,name:"Telebirr",accountName:SHOP_SETTINGS_CONFIG.telebirrHolder,accountNumber:SHOP_SETTINGS_CONFIG.telebirrDisplay,instructions:"Transfer via Telebirr app and upload screenshot receipt below."},cbe:{enabled:!0,name:"CBE Transfer",accountName:SHOP_SETTINGS_CONFIG.cbeHolder,accountNumber:SHOP_SETTINGS_CONFIG.cbeAccountDisplay,instructions:"Transfer to Commercial Bank of Ethiopia and upload slip screenshot."},cod:{enabled:!0,name:"Pay on Delivery",accountName:"Cash on Arrival",accountNumber:"Bole Courier",instructions:"Pay courier in cash or Telebirr upon receiving your fresh cake."}},orderingEnabled:!0,leadTimeHours:4,customNotesAllowed:!0,orderInstructions:"Order cut-off time is 8:00 PM for same-day delivery.",announcementText:"\u2728 Fresh Daily Chilled Delivery Across Addis Ababa \u2022 100% Halal Bakery \u2728",heroBannerTitle:"Artisanal Luxury Cakes & Sweet Celebrations",heroBannerSubtitle:"Handcrafted fresh daily in Bole with Belgian chocolate & premium local butter.",rewardBox:{enabled:!0,promoCodes:[{id:"p1",code:"MAK10",discount:10,type:"percent",desc:"10% off celebration orders",active:!0,usedCount:14},{id:"p2",code:"BOLELOVE",discount:150,type:"fixed",desc:"150 ETB off delivery or cake",active:!0,usedCount:8},{id:"p3",code:"FREECANDLE",discount:120,type:"fixed",desc:"Free birthday candles set",active:!0,usedCount:22}],rewards:[{id:"r1",name:"10% Discount Voucher",desc:"Valid on orders over 2,000 ETB",active:!0},{id:"r2",name:"Free Birthday Candles Set",desc:"Complimentary gift in cart",active:!0},{id:"r3",name:"VIP Morning Delivery",desc:"Priority guaranteed morning slot",active:!0}]},ads:[{id:1,title:"Fresh Daily Addis Mini Bento Cakes",desc:"Same-day chilled delivery in Bole Medhanialem",img:"https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=600&q=80",link:"Order Bento",active:!0},{id:2,title:"Wedding & Anniversary Custom 3-Tier Luxury",desc:"Book tasting consultation 48 hours in advance",img:"https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=600&q=80",link:"Custom Cakes",active:!0}],managers:[{id:1,name:"Makda Tesfaye (Owner)",phone:"0911 23 45 67",role:"Owner & Head Baker",permissions:"Full Admin Access",active:!0},{id:2,name:"Bole Kitchen Manager",phone:"0922 45 67 89",role:"Kitchen Supervisor",permissions:"Orders & Inventory",active:!0}],passcode:"1234",securityEmail:"owner@makcake.et",lastPasscodeChange:"Nov 24, 2026"};let adminShopSection="all";function ensureShopState(){state.shop?(state.shop={...DEFAULT_SHOP_CONFIG,...state.shop},state.shop.paymentMethods||(state.shop.paymentMethods=JSON.parse(JSON.stringify(DEFAULT_SHOP_CONFIG.paymentMethods))),state.shop.rewardBox||(state.shop.rewardBox=JSON.parse(JSON.stringify(DEFAULT_SHOP_CONFIG.rewardBox))),state.shop.ads||(state.shop.ads=JSON.parse(JSON.stringify(DEFAULT_SHOP_CONFIG.ads))),state.shop.managers||(state.shop.managers=JSON.parse(JSON.stringify(DEFAULT_SHOP_CONFIG.managers)))):state.shop=JSON.parse(JSON.stringify(DEFAULT_SHOP_CONFIG))}function ensurePackagesState(){(!state.basicPackages||!state.basicPackages.length)&&(state.basicPackages=[{id:1,name:'Bento Mini (4")',grams:350,portions:"1-2 people",price:1800,popular:!0},{id:2,name:'Standard Celebration (6")',grams:850,portions:"6-8 people",price:2600,popular:!0},{id:3,name:'Family Grand (8")',grams:1400,portions:"10-12 people",price:3400,popular:!1},{id:4,name:'Luxury 2-Tier Event (10")',grams:2600,portions:"20-25 people",price:6800,popular:!0}])}function renderAdminPackages(){ensurePackagesState();const t=document.getElementById("admin-packages-list");if(!t)return;const e=state.basicPackages;t.innerHTML=e.map((o,s)=>`
        <div class="p-3 rounded-2xl bg-blush-50 border border-blush-200/80 space-y-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-berry text-white text-[10px] font-black flex items-center justify-center">${s+1}</span>
              <input type="text" value="${o.name}" onchange="updatePackageField(${o.id}, 'name', this.value)" class="font-extrabold text-xs text-ink bg-transparent border-b border-dashed border-blush-300 focus:outline-none focus:border-berry" />
            </div>
            <button onclick="removePackageTier(${o.id})" class="text-[10px] font-bold text-rose-600 hover:text-rose-800 transition-colors p-1 cursor-pointer">
              &times; Remove
            </button>
          </div>
          <div class="grid grid-cols-3 gap-2 text-[10.5px]">
            <div>
              <label class="block text-[9.5px] font-bold text-ink-muted">Weight (Grams)</label>
              <input type="number" step="50" value="${o.grams}" onchange="updatePackageField(${o.id}, 'grams', parseFloat(this.value))" class="w-full px-2 py-1 rounded-lg bg-white border border-blush-200 text-ink font-bold focus:outline-none focus:ring-1 focus:ring-berry" />
            </div>
            <div>
              <label class="block text-[9.5px] font-bold text-ink-muted">Portions</label>
              <input type="text" value="${o.portions}" onchange="updatePackageField(${o.id}, 'portions', this.value)" class="w-full px-2 py-1 rounded-lg bg-white border border-blush-200 text-ink font-semibold focus:outline-none focus:ring-1 focus:ring-berry" />
            </div>
            <div>
              <label class="block text-[9.5px] font-bold text-ink-muted">Price (ETB)</label>
              <input type="number" step="50" value="${o.price}" onchange="updatePackageField(${o.id}, 'price', parseFloat(this.value))" class="w-full px-2 py-1 rounded-lg bg-white border border-blush-200 text-berry font-black focus:outline-none focus:ring-1 focus:ring-berry" />
            </div>
          </div>
        </div>
      `).join("");const n=document.getElementById("settings-bell-btn");n&&(n.textContent=state.kitchenBell?"Bell ON":"Bell OFF",n.className=state.kitchenBell?"px-3 py-1 rounded-full text-xs font-extrabold btn-berry text-white cursor-pointer":"px-3 py-1 rounded-full text-xs font-extrabold bg-blush-100 text-ink cursor-pointer")}function updatePackageField(t,e,n){ensurePackagesState();const o=state.basicPackages.find(s=>s.id===t);o&&(o[e]=n,saveState())}function addNewPackageTier(){ensurePackagesState();const t=Date.now();state.basicPackages.push({id:t,name:"New Custom Tier ("+(state.basicPackages.length+1)+")",grams:1e3,portions:"8-10 people",price:3e3,popular:!1}),saveState(),renderAdminPackages(),showAdminToast("\u2713 Added new package size tier")}function removePackageTier(t){ensurePackagesState(),state.basicPackages=state.basicPackages.filter(e=>e.id!==t),saveState(),renderAdminPackages(),showAdminToast("Package tier removed")}function saveAdminPackages(){saveState(),syncAll()}function handleBannerUpload(t,e){if(e.files&&e.files[0]){const n=e.files[0],o=new FileReader;o.onload=function(s){updateBannerData(t,"img",s.target.result)},o.readAsDataURL(n)}}function updateBannerData(t,e,n){const o=getAdminBanners();o[t]&&(o[t][e]=n,saveState(),renderAdminHero(),renderAdminShop(),showAdminToast("\u2713 Homepage banner updated live!"))}function removeBanner(t){const e=getAdminBanners();if(e.length<=1){alert("You must keep at least 1 advertisement banner on the homepage slider.");return}e.splice(t,1),saveState(),renderAdminHero(),renderAdminShop(),showAdminToast("Banner removed from slider")}function addEmptyBanner(){const t=getAdminBanners();if(t.length>=3){alert("Maximum of 3 advertisement banners supported on homepage slider.");return}t.push({id:Date.now(),top:"New Promotion",script:"Special",sub:"Celebration bakery cake promotion",cta:"Order Now",link:"products",img:"https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=700&q=85"}),saveState(),renderAdminHero(),renderAdminShop(),showAdminToast("\u2713 Added new advertisement banner slot")}function renderAdvertisementBannersSection(){const t=getAdminBanners();return`
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
            ${t.map((e,n)=>`
              <div class="p-3 rounded-2xl bg-blush-50 border border-blush-200/80 space-y-2.5">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="w-5 h-5 rounded-full bg-berry text-white text-[10px] font-black flex items-center justify-center">${n+1}</span>
                    <span class="text-xs font-black text-ink">Banner Slide ${n+1}</span>
                  </div>
                  <button type="button" onclick="removeBanner(${n})" class="text-[10px] font-bold text-rose-600 hover:text-rose-800 cursor-pointer">
                    &times; Remove
                  </button>
                </div>

                <!-- Live Preview & Upload Row -->
                <div class="flex items-center gap-3">
                  <img src="${e.img}" alt="Banner ${n+1}" class="w-16 h-12 rounded-xl object-cover border border-blush-200 shadow-rose-sm bg-white shrink-0" onerror="this.src=SVG_CAKE_FALLBACK" />
                  <div class="flex-1 min-w-0 space-y-1">
                    <input type="file" id="banner-file-input-${n}" accept="image/*" class="hidden" onchange="handleBannerUpload(${n}, this)" />
                    <button type="button" onclick="document.getElementById('banner-file-input-${n}').click()" class="px-2.5 py-1 rounded-lg bg-white border border-blush-200 hover:bg-blush-100 text-berry font-bold text-[10px] flex items-center gap-1 shadow-2xs cursor-pointer">
                      <span>\u{1F4F8} Upload Image</span>
                    </button>
                    <input type="text" value="${e.img}" placeholder="Or paste image URL..." onchange="updateBannerData(${n}, 'img', this.value)" class="w-full px-2 py-1 rounded-lg bg-white border border-blush-200 text-ink text-[10px] focus:outline-none focus:ring-1 focus:ring-berry" />
                  </div>
                </div>

                <!-- Text & Link Inputs -->
                <div class="grid grid-cols-2 gap-2 text-[10.5px]">
                  <div>
                    <label class="block text-[9.5px] font-bold text-ink-muted mb-0.5">Headline</label>
                    <input type="text" value="${e.top||""}" onchange="updateBannerData(${n}, 'top', this.value)" placeholder="e.g. Fresh Daily Addis" class="w-full px-2 py-1 rounded-lg bg-white border border-blush-200 text-ink font-semibold focus:outline-none focus:ring-1 focus:ring-berry" />
                  </div>
                  <div>
                    <label class="block text-[9.5px] font-bold text-ink-muted mb-0.5">Calligraphy Script</label>
                    <input type="text" value="${e.script||""}" onchange="updateBannerData(${n}, 'script', this.value)" placeholder="e.g. Mini Bento" class="w-full px-2 py-1 rounded-lg bg-white border border-blush-200 text-ink font-semibold focus:outline-none focus:ring-1 focus:ring-berry" />
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-2 text-[10.5px]">
                  <div>
                    <label class="block text-[9.5px] font-bold text-ink-muted mb-0.5">Subtitle</label>
                    <input type="text" value="${e.sub||""}" onchange="updateBannerData(${n}, 'sub', this.value)" placeholder="e.g. Same-day chilled delivery in Bole" class="w-full px-2 py-1 rounded-lg bg-white border border-blush-200 text-ink text-[10px] focus:outline-none focus:ring-1 focus:ring-berry" />
                  </div>
                  <div>
                    <label class="block text-[9.5px] font-bold text-ink-muted mb-0.5">Optional Link / Destination</label>
                    <input type="text" value="${e.link||"products"}" onchange="updateBannerData(${n}, 'link', this.value)" placeholder="e.g. products, or custom URL" class="w-full px-2 py-1 rounded-lg bg-white border border-blush-200 text-berry font-bold text-[10px] focus:outline-none focus:ring-1 focus:ring-berry" />
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `}function toggleAddCustomPaymentForm(t){const e=document.getElementById("sm-add-custom-pay-box");e&&(typeof t=="boolean"?e.classList.toggle("hidden",!t):e.classList.toggle("hidden"))}function addCustomShopPaymentMethod(){collectCurrentShopTabInputs();const t=(document.getElementById("sm-new-pay-name")?.value||"").trim(),e=document.getElementById("sm-new-pay-type")?.value||"Bank Transfer",n=(document.getElementById("sm-new-pay-holder")?.value||"").trim(),o=(document.getElementById("sm-new-pay-num")?.value||"").trim(),s=(document.getElementById("sm-new-pay-inst")?.value||"").trim();if(!t||!o){typeof showAdminToast=="function"&&showAdminToast("Bank/Wallet name and account number are required");return}shopMgmtState.payments.customMethods=Array.isArray(shopMgmtState.payments.customMethods)?shopMgmtState.payments.customMethods:[],shopMgmtState.payments.customMethods.push({id:"pay-custom-"+Date.now(),name:t,type:e,accountHolder:n||"MAK Cake Bakery",accountNumber:o,instructions:s,enabled:!0}),renderAdminShop(),typeof showAdminToast=="function"&&showAdminToast("Added "+t+" \u2014 tap Save to persist")}function removeCustomShopPaymentMethod(t){collectCurrentShopTabInputs(),Array.isArray(shopMgmtState.payments.customMethods)&&(shopMgmtState.payments.customMethods.splice(t,1),renderAdminShop())}function saveBusinessProfile(){ensureShopState();const t=(document.getElementById("shop-prof-name")?.value||"").trim(),e=(document.getElementById("shop-prof-phone")?.value||"").trim(),n=(document.getElementById("shop-prof-loc")?.value||"").trim(),o=(document.getElementById("shop-prof-addr")?.value||"").trim(),s=(document.getElementById("shop-prof-desc")?.value||"").trim();if(!t){showAdminToast("\u26A0\uFE0F Please enter business name");return}state.shop.businessName=t,state.shop.businessPhone=e||state.shop.businessPhone,state.shop.businessLocation=n||state.shop.businessLocation,state.shop.businessAddress=o||state.shop.businessAddress,state.shop.businessDesc=s||state.shop.businessDesc,saveState(),syncAll(),showAdminToast(`Business Profile saved: "${t}" live!`),showCustomerToast(`Bakery info updated: ${t}`)}function toggleDeliverySetting(t){ensureShopState(),state.shop[t]=!state.shop[t],saveState(),syncAll(),showAdminToast(`${t==="deliveryEnabled"?"Delivery":"Pickup"} ${state.shop[t]?"Enabled":"Disabled"}`)}function adjustDeliveryFee(t){ensureShopState(),state.shop.deliveryFee=Math.max(0,(state.shop.deliveryFee||0)+t),saveState(),syncAll(),showAdminToast(`Delivery Fee: ${fmtETB(state.shop.deliveryFee)}`)}function saveDeliverySettings(){ensureShopState();const t=parseInt(document.getElementById("shop-del-fee")?.value||"150",10),e=parseInt(document.getElementById("shop-del-min")?.value||"500",10),n=(document.getElementById("shop-del-areas")?.value||"").trim(),o=(document.getElementById("shop-del-inst")?.value||"").trim();state.shop.deliveryFee=isNaN(t)?150:t,state.shop.minOrderAmount=isNaN(e)?500:e,state.shop.deliveryAreas=n||state.shop.deliveryAreas,state.shop.deliveryInstructions=o||state.shop.deliveryInstructions,saveState(),syncAll(),showAdminToast(`Delivery settings saved (${fmtETB(state.shop.deliveryFee)})`)}function togglePaymentMethod(t){ensureShopState(),state.shop.paymentMethods[t]&&(state.shop.paymentMethods[t].enabled=!state.shop.paymentMethods[t].enabled,saveState(),syncAll(),showAdminToast(`${state.shop.paymentMethods[t].name} ${state.shop.paymentMethods[t].enabled?"Enabled":"Disabled"}`))}function savePaymentMethods(){ensureShopState();const t=document.getElementById("shop-pay-tele-name")?.value.trim(),e=document.getElementById("shop-pay-tele-num")?.value.trim(),n=document.getElementById("shop-pay-tele-inst")?.value.trim(),o=document.getElementById("shop-pay-cbe-name")?.value.trim(),s=document.getElementById("shop-pay-cbe-num")?.value.trim(),r=document.getElementById("shop-pay-cbe-inst")?.value.trim(),a=document.getElementById("shop-pay-cod-inst")?.value.trim();t&&(state.shop.paymentMethods.telebirr.accountName=t),e&&(state.shop.paymentMethods.telebirr.accountNumber=e),n&&(state.shop.paymentMethods.telebirr.instructions=n),o&&(state.shop.paymentMethods.cbe.accountName=o),s&&(state.shop.paymentMethods.cbe.accountNumber=s),r&&(state.shop.paymentMethods.cbe.instructions=r),a&&(state.shop.paymentMethods.cod.instructions=a),saveState(),syncAll(),showAdminToast("Payment methods & account details updated live!")}function toggleShopOpenStatus(){ensureShopState(),state.shop.isOpen=!state.shop.isOpen,saveState(),syncAll(),showAdminToast(state.shop.isOpen?"Bakery is now Open (8 AM \u2013 9 PM)":"Bakery set to Pre-Order Only"),showCustomerToast(state.shop.isOpen?"MAK CAKE is now Open":"Pre-Order Mode active")}function saveOrderPreferences(){ensureShopState();const t=document.getElementById("shop-ord-enabled")?.value==="true",e=parseInt(document.getElementById("shop-ord-lead")?.value||"4",10),n=(document.getElementById("shop-ord-inst")?.value||"").trim();state.shop.orderingEnabled=t,state.shop.leadTimeHours=isNaN(e)?4:e,state.shop.orderInstructions=n||state.shop.orderInstructions,saveState(),syncAll(),showAdminToast("Order preferences saved live!")}function saveWebsiteAppearance(){ensureShopState();const t=(document.getElementById("shop-app-announcement")?.value||"").trim(),e=(document.getElementById("shop-app-title")?.value||"").trim(),n=(document.getElementById("shop-app-sub")?.value||"").trim();t&&(state.shop.announcementText=t),e&&(state.shop.heroBannerTitle=e),n&&(state.shop.heroBannerSubtitle=n),saveState(),syncAll(),showAdminToast("Website appearance updated on customer storefront!"),showCustomerToast("Storefront banner refreshed")}function toggleRewardBoxEnabled(){ensureShopState(),state.shop.rewardBox.enabled=!state.shop.rewardBox.enabled,saveState(),syncAll(),showAdminToast(`Reward Box ${state.shop.rewardBox.enabled?"Enabled":"Disabled"}`)}function addPromoCode(){ensureShopState();const t=(document.getElementById("new-promo-code")?.value||"").trim().toUpperCase(),e=parseInt(document.getElementById("new-promo-disc")?.value||"10",10),n=document.getElementById("new-promo-type")?.value||"percent",o=(document.getElementById("new-promo-desc")?.value||"").trim();if(!t){showAdminToast("\u26A0\uFE0F Please enter promo code name");return}if(isNaN(e)||e<=0){showAdminToast("\u26A0\uFE0F Please enter valid discount amount");return}state.shop.rewardBox.promoCodes.unshift({id:"p-"+Date.now(),code:t,discount:e,type:n,desc:o||(n==="percent"?e+"% off orders":fmtETB(e)+" off orders"),active:!0,usedCount:0}),saveState(),syncAll(),showAdminToast(`Promo Code "${t}" activated!`),showCustomerToast(`New promo code ${t} available!`)}function togglePromoCode(t){ensureShopState();const e=state.shop.rewardBox.promoCodes.find(n=>n.id===t);e&&(e.active=!e.active,saveState(),syncAll(),showAdminToast(`Promo "${e.code}" ${e.active?"Activated":"Disabled"}`))}function deletePromoCode(t){ensureShopState();const e=state.shop.rewardBox.promoCodes.find(n=>n.id===t);e&&confirm(`Remove promo code "${e.code}"?`)&&(state.shop.rewardBox.promoCodes=state.shop.rewardBox.promoCodes.filter(n=>n.id!==t),saveState(),syncAll(),showAdminToast(`Removed promo code "${e.code}"`))}function addHomepageAd(){ensureShopState();const t=(document.getElementById("new-ad-title")?.value||"").trim(),e=(document.getElementById("new-ad-desc")?.value||"").trim(),n=(document.getElementById("new-ad-link")?.value||"").trim(),o=(document.getElementById("new-ad-img")?.value||"").trim()||"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80";if(!t){showAdminToast("\u26A0\uFE0F Please enter advertisement title");return}state.shop.ads.unshift({id:Date.now(),title:t,desc:e||"Same-day luxury cake delivery in Addis Ababa",link:n||"Order Now",img:o,active:!0}),saveState(),syncAll(),showAdminToast(`Published Ad: "${t}" live!`),showCustomerToast(`Featured: ${t}`)}function toggleHomepageAd(t){ensureShopState();const e=state.shop.ads.find(n=>n.id===t);e&&(e.active=!e.active,saveState(),syncAll(),showAdminToast(`Ad "${e.title}" ${e.active?"Activated":"Deactivated"}`))}function deleteHomepageAd(t){ensureShopState();const e=state.shop.ads.find(n=>n.id===t);e&&confirm(`Delete advertisement "${e.title}"?`)&&(state.shop.ads=state.shop.ads.filter(n=>n.id!==t),saveState(),syncAll(),showAdminToast(`Deleted advertisement "${e.title}"`))}function addManagerAccount(){ensureShopState();const t=(document.getElementById("new-mgr-name")?.value||"").trim(),e=(document.getElementById("new-mgr-phone")?.value||"").trim(),n=(document.getElementById("new-mgr-role")?.value||"").trim(),o=document.getElementById("new-mgr-perm")?.value||"Orders & Inventory";if(!t){showAdminToast("\u26A0\uFE0F Please enter manager name");return}state.shop.managers.push({id:Date.now(),name:t,phone:e||"0900 00 00 00",role:n||"Kitchen Staff",permissions:o,active:!0}),saveState(),syncAll(),showAdminToast(`Manager "${t}" authorized (${o})!`)}function toggleManagerAccount(t){ensureShopState();const e=state.shop.managers.find(n=>n.id===t);e&&(e.active=!e.active,saveState(),syncAll(),showAdminToast(`Manager "${e.name}" ${e.active?"Activated":"Deactivated"}`))}function deleteManagerAccount(t){ensureShopState();const e=state.shop.managers.find(n=>n.id===t);e&&confirm(`Remove manager account for "${e.name}"?`)&&(state.shop.managers=state.shop.managers.filter(n=>n.id!==t),saveState(),syncAll(),showAdminToast(`Removed manager "${e.name}"`))}function updateAccountPasscode(){ensureShopState();const t=(document.getElementById("shop-sec-curr-pin")?.value||"").trim(),e=(document.getElementById("shop-sec-new-pin")?.value||"").trim(),n=(document.getElementById("shop-sec-conf-pin")?.value||"").trim();if(t!==state.shop.passcode){showAdminToast("\u26A0\uFE0F Current passcode is incorrect (default: 1234)");return}if(!e||e.length<4){showAdminToast("\u26A0\uFE0F New passcode must be at least 4 digits");return}if(e!==n){showAdminToast("\u26A0\uFE0F New passcodes do not match");return}state.shop.passcode=e,state.shop.lastPasscodeChange="Just now",saveState(),syncAll(),document.getElementById("shop-sec-curr-pin").value="",document.getElementById("shop-sec-new-pin").value="",document.getElementById("shop-sec-conf-pin").value="",showAdminToast("Security passcode updated successfully!")}function adminSecureLogout(){confirm("Log out of MAK CAKE Admin App?")&&(showAdminToast("Admin signed out safely."),switchWorkspaceMode("single-cust"),setTimeout(()=>{switchWorkspaceMode("dual"),switchAdminTab("overview")},1200))}function resetDemo(){localStorage.removeItem(STORE_KEY),loadState(),state.favorites=[1,2],state.cart=[{id:"seed-c1",cakeId:1,name:"Chocolate Dream Cake",img:SEED_CAKES[0].img,size:'6" Standard',flavor:"Belgian Chocolate",qty:1,unitPrice:2500}],state.unreadNotifs=2,state.shop={isOpen:!0,deliveryFee:150,bellOn:!0},saveState(),syncAll(),showGlobalToast("Reset to default MAK CAKE data")}window.addEventListener("resize",()=>{!document.body.classList.contains("standalone-app")&&window.innerWidth<900&&workspaceMode==="dual"&&setWorkspaceMode("customer")});let refreshToastTimeoutCustomer=null,refreshToastTimeoutAdmin=null;function showRefreshPageToast(){}window.showRefreshPageToast=showRefreshPageToast,adminShopSection="business";let shopMgmtState={business:{name:"MAK CAKE",logo:"./images/mak-cake-logo.webp",description:"Handcrafted luxury cakes, romantic bento duos, and celebration confections freshly baked in Addis Ababa.",phone:"0911 23 45 67",email:"hello@makcake.et",address:"Cameroon Street, Bole Sub-City, Addis Ababa, Ethiopia",googleMapsUrl:"https://maps.google.com/?q=9.0054,38.7885"},workingHours:{monday:{open:"08:00",close:"20:00",isOpen:!0,breakEnabled:!1,breakStart:"13:00",breakEnd:"14:00"},tuesday:{open:"08:00",close:"20:00",isOpen:!0,breakEnabled:!1,breakStart:"13:00",breakEnd:"14:00"},wednesday:{open:"08:00",close:"20:00",isOpen:!0,breakEnabled:!1,breakStart:"13:00",breakEnd:"14:00"},thursday:{open:"08:00",close:"20:00",isOpen:!0,breakEnabled:!1,breakStart:"13:00",breakEnd:"14:00"},friday:{open:"08:00",close:"20:30",isOpen:!0,breakEnabled:!1,breakStart:"13:00",breakEnd:"14:00"},saturday:{open:"08:00",close:"21:00",isOpen:!0,breakEnabled:!1,breakStart:"13:00",breakEnd:"14:00"},sunday:{open:"09:00",close:"19:00",isOpen:!0,breakEnabled:!1,breakStart:"13:00",breakEnd:"14:00"}},tempClosure:{enabled:!1,reopenAt:"",reason:""},location:{lat:9.0054,lng:38.7885,address:"Cameroon Street, Bole Sub-City, Addis Ababa, Ethiopia",googleMapsUrl:"https://maps.google.com/?q=9.0054,38.7885"},delivery:{deliveryEnabled:!0,deliveryFee:150,deliveryAreas:"Bole, CMC, Kazanchis, Old Airport, Sarbet, Piassa, Summit",minOrderAmount:500,pickupEnabled:!0,deliveryInstructions:"Same-day delivery chilled in insulated carrier boxes with real-time driver tracking."},payments:{cbe:{name:"Commercial Bank of Ethiopia (CBE)",enabled:!0,accountHolder:SHOP_SETTINGS_CONFIG.cbeHolder,accountNumber:SHOP_SETTINGS_CONFIG.cbeAccount,instructions:"Transfer to CBE and upload receipt."},telebirr:{name:"Telebirr",enabled:!0,accountHolder:SHOP_SETTINGS_CONFIG.telebirrHolder,accountNumber:SHOP_SETTINGS_CONFIG.telebirrNumber,instructions:"Transfer via Telebirr app and upload screenshot."},cod:{name:"Pay on Delivery",enabled:!0,accountHolder:"Cash on Arrival",accountNumber:"Bole Courier",instructions:"Pay courier in cash or Telebirr upon delivery."},verification:{requireReceipt:!0,manualApprovalRequired:!0,verificationNote:"Orders are confirmed after receipt verification by our cashier."}}},smPendingLogoData,smLeafletMap=null,smLeafletMarker=null;function computeShopOpenStatus(t=shopMgmtState){const e=new Date;if(t.tempClosure&&t.tempClosure.enabled&&(!t.tempClosure.reopenAt||e<new Date(t.tempClosure.reopenAt)))return{isOpen:!1,label:"Closed (Temp)",detail:t.tempClosure.reopenAt?"Reopens "+new Date(t.tempClosure.reopenAt).toLocaleString([],{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"Temporarily Closed"};const o=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][e.getDay()],s=t.workingHours&&t.workingHours[o];if(!s||!s.isOpen)return{isOpen:!1,label:"Closed Today",detail:"Scheduled day off"};const r=e.getHours()*60+e.getMinutes(),[a,i]=(s.open||"08:00").split(":").map(Number),[l,d]=(s.close||"20:00").split(":").map(Number),u=a*60+i,p=l*60+d;if(r<u||r>=p)return{isOpen:!1,label:"Closed Now",detail:`Hours: ${s.open} - ${s.close}`};if(s.breakEnabled&&s.breakStart&&s.breakEnd){const[m,g]=s.breakStart.split(":").map(Number),[f,b]=s.breakEnd.split(":").map(Number);if(r>=m*60+g&&r<f*60+b)return{isOpen:!1,label:"On Break",detail:`Break until ${s.breakEnd}`}}return{isOpen:!0,label:"Open Now",detail:`Open until ${s.close}`}}function syncShopToCustomerUI(){const t=computeShopOpenStatus(shopMgmtState);if(typeof state<"u"&&state.shop&&(state.shop.isOpen=t.isOpen,state.shop.businessName=shopMgmtState.business.name,state.shop.businessLogo=shopMgmtState.business.logo,state.shop.businessPhone=shopMgmtState.business.phone,state.shop.businessAddress=shopMgmtState.business.address,state.shop.businessDesc=shopMgmtState.business.description,state.shop.deliveryEnabled=shopMgmtState.delivery.deliveryEnabled,state.shop.deliveryFee=Number(shopMgmtState.delivery.deliveryFee)||0,state.shop.deliveryAreas=shopMgmtState.delivery.deliveryAreas,state.shop.minOrderAmount=Number(shopMgmtState.delivery.minOrderAmount)||0,state.shop.pickupEnabled=shopMgmtState.delivery.pickupEnabled,state.shop.deliveryInstructions=shopMgmtState.delivery.deliveryInstructions,state.shop.paymentMethods={telebirr:{enabled:!!shopMgmtState.payments.telebirr?.enabled,name:"Telebirr",accountName:shopMgmtState.payments.telebirr?.accountHolder||"",accountNumber:shopMgmtState.payments.telebirr?.accountNumber||"",instructions:shopMgmtState.payments.telebirr?.instructions||""},cbe:{enabled:!!shopMgmtState.payments.cbe?.enabled,name:"CBE Transfer",accountName:shopMgmtState.payments.cbe?.accountHolder||"",accountNumber:shopMgmtState.payments.cbe?.accountNumber||"",instructions:shopMgmtState.payments.cbe?.instructions||""},cod:{enabled:!!shopMgmtState.payments.cod?.enabled,name:"Pay on Delivery",accountName:shopMgmtState.payments.cod?.accountHolder||"Cash on Arrival",accountNumber:shopMgmtState.payments.cod?.accountNumber||"Bole Courier",instructions:shopMgmtState.payments.cod?.instructions||""}},state.shop.paymentVerification=shopMgmtState.payments.verification,typeof saveState=="function"))try{saveState()}catch{}const e=document.getElementById("sm-live-status-pill");if(e&&(e.textContent=(t.isOpen?"\u25CF ":"\u25CB ")+t.label,e.className=t.isOpen?"px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0":"px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-rose-50 text-berry border border-rose-200 shrink-0"),typeof renderAllCustomerViews=="function")try{renderAllCustomerViews()}catch{}}async function loadShopManagementFromDb(){try{const t=await fetch("/api/shop-management",{cache:"no-store"});if(t.ok){const e=await t.json();if(e.success&&e.shopManagement){shopMgmtState={...shopMgmtState,...e.shopManagement},localStorage.setItem("mak_shop_mgmt_v1",JSON.stringify(shopMgmtState)),syncShopToCustomerUI(),adminTab==="shop"&&renderAdminShop();return}}}catch{}try{const t=localStorage.getItem("mak_shop_mgmt_v1");t&&(shopMgmtState={...shopMgmtState,...JSON.parse(t)})}catch{}syncShopToCustomerUI(),adminTab==="shop"&&renderAdminShop()}function openShopManagementSection(){smPendingLogoData=void 0,switchAdminTab("shop"),loadShopManagementFromDb()}function setAdminShopSection(t){collectCurrentShopTabInputs(),adminShopSection=t,renderAdminShop()}function collectCurrentShopTabInputs(){document.getElementById("sm-biz-name")&&(shopMgmtState.business.name=document.getElementById("sm-biz-name").value.trim()||shopMgmtState.business.name,shopMgmtState.business.description=document.getElementById("sm-biz-desc").value.trim(),shopMgmtState.business.phone=document.getElementById("sm-biz-phone").value.trim(),shopMgmtState.business.email=document.getElementById("sm-biz-email").value.trim(),shopMgmtState.business.address=document.getElementById("sm-biz-address").value.trim(),shopMgmtState.business.googleMapsUrl=document.getElementById("sm-biz-maps").value.trim()),document.getElementById("sm-temp-closure-enabled")&&(shopMgmtState.tempClosure.enabled=document.getElementById("sm-temp-closure-enabled").checked,shopMgmtState.tempClosure.reopenAt=document.getElementById("sm-temp-reopen").value,shopMgmtState.tempClosure.reason=document.getElementById("sm-temp-reason").value.trim(),Object.keys(shopMgmtState.workingHours).forEach(t=>{const e=document.getElementById("sm-wh-open-"+t);e&&(shopMgmtState.workingHours[t]={isOpen:e.checked,open:document.getElementById("sm-wh-start-"+t).value||"08:00",close:document.getElementById("sm-wh-end-"+t).value||"20:00",breakEnabled:document.getElementById("sm-wh-brk-en-"+t).checked,breakStart:document.getElementById("sm-wh-brk-s-"+t).value||"13:00",breakEnd:document.getElementById("sm-wh-brk-e-"+t).value||"14:00"})})),document.getElementById("sm-loc-lat")&&(shopMgmtState.location.lat=parseFloat(document.getElementById("sm-loc-lat").value)||9.0054,shopMgmtState.location.lng=parseFloat(document.getElementById("sm-loc-lng").value)||38.7885,shopMgmtState.location.googleMapsUrl=document.getElementById("sm-loc-maps").value.trim(),shopMgmtState.business.googleMapsUrl=shopMgmtState.location.googleMapsUrl),document.getElementById("sm-del-enabled")&&(shopMgmtState.delivery.deliveryEnabled=document.getElementById("sm-del-enabled").checked,shopMgmtState.delivery.deliveryFee=Math.max(0,Number(document.getElementById("sm-del-fee").value)||0),shopMgmtState.delivery.deliveryAreas=document.getElementById("sm-del-areas").value.trim(),shopMgmtState.delivery.minOrderAmount=Math.max(0,Number(document.getElementById("sm-del-min").value)||0),shopMgmtState.delivery.pickupEnabled=document.getElementById("sm-del-pickup").checked,shopMgmtState.delivery.deliveryInstructions=document.getElementById("sm-del-inst").value.trim()),document.getElementById("sm-pay-cbe-en")&&(shopMgmtState.payments.cbe.enabled=document.getElementById("sm-pay-cbe-en").checked,shopMgmtState.payments.cbe.accountHolder=document.getElementById("sm-pay-cbe-holder").value.trim(),shopMgmtState.payments.cbe.accountNumber=document.getElementById("sm-pay-cbe-num").value.trim(),shopMgmtState.payments.cbe.instructions=document.getElementById("sm-pay-cbe-inst").value.trim(),shopMgmtState.payments.telebirr.enabled=document.getElementById("sm-pay-tb-en").checked,shopMgmtState.payments.telebirr.accountHolder=document.getElementById("sm-pay-tb-holder").value.trim(),shopMgmtState.payments.telebirr.accountNumber=document.getElementById("sm-pay-tb-num").value.trim(),shopMgmtState.payments.telebirr.instructions=document.getElementById("sm-pay-tb-inst").value.trim(),shopMgmtState.payments.cod.enabled=document.getElementById("sm-pay-cod-en").checked,shopMgmtState.payments.cod.instructions=document.getElementById("sm-pay-cod-inst").value.trim(),shopMgmtState.payments.verification={requireReceipt:document.getElementById("sm-pay-ver-receipt").checked,manualApprovalRequired:document.getElementById("sm-pay-ver-manual").checked,verificationNote:document.getElementById("sm-pay-ver-note").value.trim()},Array.isArray(shopMgmtState.payments.customMethods)&&shopMgmtState.payments.customMethods.forEach((t,e)=>{const n=document.getElementById("sm-pay-cust-en-"+e),o=document.getElementById("sm-pay-cust-holder-"+e),s=document.getElementById("sm-pay-cust-num-"+e),r=document.getElementById("sm-pay-cust-inst-"+e);n&&(t.enabled=n.checked),o&&(t.accountHolder=o.value.trim()),s&&(t.accountNumber=s.value.trim()),r&&(t.instructions=r.value.trim())}))}function handleShopLogoUpload(t){const e=t.files&&t.files[0];if(!e||!e.type.startsWith("image/"))return;const n=new FileReader;n.onload=o=>{smPendingLogoData=o.target.result;const s=document.getElementById("sm-biz-logo-preview");s&&(s.src=smPendingLogoData)},n.readAsDataURL(e)}function updateShopLocationPin(t,e,n=!0){const o=Number(t).toFixed(5),s=Number(e).toFixed(5);shopMgmtState.location.lat=Number(o),shopMgmtState.location.lng=Number(s);const r=document.getElementById("sm-loc-lat"),a=document.getElementById("sm-loc-lng"),i=document.getElementById("sm-loc-maps");r&&(r.value=o),a&&(a.value=s),i&&(i.value=`https://maps.google.com/?q=${o},${s}`,shopMgmtState.location.googleMapsUrl=i.value),n&&smLeafletMap&&smLeafletMarker&&(smLeafletMarker.setLatLng([Number(o),Number(s)]),smLeafletMap.setView([Number(o),Number(s)],15))}async function searchShopLocation(){const t=(document.getElementById("sm-loc-search")?.value||"").trim();if(!t)return;try{const s=await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(t+", Ethiopia")}`);if(s.ok){const r=await s.json();if(r&&r[0]){updateShopLocationPin(parseFloat(r[0].lat),parseFloat(r[0].lon),!0),typeof showAdminToast=="function"&&showAdminToast("Pin moved to "+r[0].display_name.split(",")[0]);return}}}catch{}const e={bole:[9.0054,38.7885],cmc:[9.0226,38.8565],kazanchis:[9.0175,38.7652],piassa:[9.0331,38.7501],sarbet:[8.9958,38.7386]},n=t.toLowerCase(),o=Object.keys(e).find(s=>n.includes(s));o?(updateShopLocationPin(e[o][0],e[o][1],!0),typeof showAdminToast=="function"&&showAdminToast("Pin moved to "+o.toUpperCase())):typeof showAdminToast=="function"&&showAdminToast("Location not found \u2014 tap map to set pin")}function initShopLocationMap(){const t=document.getElementById("sm-location-map");if(!t)return;const e=shopMgmtState.location.lat||9.0054,n=shopMgmtState.location.lng||38.7885,o=()=>{typeof L<"u"?(smLeafletMap&&(smLeafletMap.remove(),smLeafletMap=null),smLeafletMap=L.map(t,{zoomControl:!0}).setView([e,n],15),L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap"}).addTo(smLeafletMap),smLeafletMarker=L.marker([e,n],{draggable:!0}).addTo(smLeafletMap),smLeafletMarker.on("dragend",()=>{const s=smLeafletMarker.getLatLng();updateShopLocationPin(s.lat,s.lng,!1)}),smLeafletMap.on("click",s=>{updateShopLocationPin(s.latlng.lat,s.latlng.lng,!0)}),setTimeout(()=>{smLeafletMap&&smLeafletMap.invalidateSize()},200)):t.innerHTML=`<div onclick="updateShopLocationPin(9.0054 + (Math.random()-0.5)*0.01, 38.7885 + (Math.random()-0.5)*0.01, false)" class="w-full h-full bg-blush-50 flex flex-col items-center justify-center text-center p-3 cursor-pointer"><div class="text-berry font-extrabold text-xs">\u{1F4CD} Interactive Pin Pad (Offline Mode)</div><div class="text-[10px] text-ink-muted mt-1">Lat: ${e}, Lng: ${n} \u2022 Tap to adjust coordinates</div></div>`};if(typeof L>"u"){if(!document.getElementById("leaflet-css")){const s=document.createElement("link");s.id="leaflet-css",s.rel="stylesheet",s.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",document.head.appendChild(s)}if(document.getElementById("leaflet-js"))o();else{const s=document.createElement("script");s.id="leaflet-js",s.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",s.onload=o,s.onerror=o,document.head.appendChild(s)}}else o()}function renderAdminShop(){const t=document.getElementById("admin-shop-pills"),e=[{id:"business",label:"1. Business Info"},{id:"hours",label:"2. Working Hours"},{id:"location",label:"3. Shop Location"},{id:"delivery",label:"4. Delivery"},{id:"payments",label:"5. Payments"}];t&&(t.innerHTML=e.map(i=>{const l=adminShopSection===i.id;return`
            <button type="button" onclick="setAdminShopSection('${i.id}')" class="shrink-0 px-3 py-1.5 rounded-full text-[10.5px] font-bold transition-all cursor-pointer ${l?"btn-berry text-white shadow-rose-sm":"bg-white text-ink-muted border border-blush-200 hover:text-ink"}">
              ${i.label}
            </button>
          `}).join(""));const n=document.getElementById("admin-shop-body");if(!n)return;const o=computeShopOpenStatus(shopMgmtState),s=document.getElementById("sm-live-status-pill");s&&(s.textContent=(o.isOpen?"\u25CF ":"\u25CB ")+o.label,s.className=o.isOpen?"px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0":"px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-rose-50 text-berry border border-rose-200 shrink-0");const r=[{key:"monday",label:"Monday"},{key:"tuesday",label:"Tuesday"},{key:"wednesday",label:"Wednesday"},{key:"thursday",label:"Thursday"},{key:"friday",label:"Friday"},{key:"saturday",label:"Saturday"},{key:"sunday",label:"Sunday"}];let a="";if(adminShopSection==="business"){const i=shopMgmtState.business;a=`
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
          </div>`}else if(adminShopSection==="hours"){const i=shopMgmtState.tempClosure||{};a=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-extrabold text-ink">2. Working Hours</h3>
              <span class="px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold ${o.isOpen?"bg-emerald-50 text-emerald-700 border border-emerald-200":"bg-rose-50 text-berry border border-rose-200"}">
                ${o.label} \u2022 ${o.detail}
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
              ${r.map(l=>{const d=shopMgmtState.workingHours[l.key]||{open:"08:00",close:"20:00",isOpen:!0,breakEnabled:!1,breakStart:"13:00",breakEnd:"14:00"};return`
                  <div class="p-2.5 rounded-2xl border border-blush-100 bg-blush-50/40 space-y-1.5">
                    <div class="flex items-center justify-between gap-2">
                      <label class="flex items-center gap-2 cursor-pointer">
                        <input id="sm-wh-open-${l.key}" type="checkbox" ${d.isOpen?"checked":""} class="w-3.5 h-3.5 accent-berry cursor-pointer" />
                        <span class="text-[11px] font-extrabold text-ink">${l.label}</span>
                      </label>
                      <div class="flex items-center gap-1">
                        <input id="sm-wh-start-${l.key}" type="time" value="${d.open||"08:00"}" class="px-1.5 py-1 rounded-lg bg-white border border-blush-200 text-[10px] font-bold text-ink" />
                        <span class="text-[10px] text-ink-muted">-</span>
                        <input id="sm-wh-end-${l.key}" type="time" value="${d.close||"20:00"}" class="px-1.5 py-1 rounded-lg bg-white border border-blush-200 text-[10px] font-bold text-ink" />
                      </div>
                    </div>
                    <div class="flex items-center justify-between gap-2 pl-5">
                      <label class="flex items-center gap-1.5 text-[9.5px] font-bold text-ink-muted cursor-pointer">
                        <input id="sm-wh-brk-en-${l.key}" type="checkbox" ${d.breakEnabled?"checked":""} class="w-3 h-3 accent-berry" />
                        <span>Break</span>
                      </label>
                      <div class="flex items-center gap-1">
                        <input id="sm-wh-brk-s-${l.key}" type="time" value="${d.breakStart||"13:00"}" class="px-1.5 py-0.5 rounded-lg bg-white border border-blush-100 text-[9.5px] text-ink" />
                        <span class="text-[9.5px] text-ink-muted">-</span>
                        <input id="sm-wh-brk-e-${l.key}" type="time" value="${d.breakEnd||"14:00"}" class="px-1.5 py-0.5 rounded-lg bg-white border border-blush-100 text-[9.5px] text-ink" />
                      </div>
                    </div>
                  </div>`}).join("")}
            </div>
          </div>`}else if(adminShopSection==="location"){const i=shopMgmtState.location;a=`
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
          </div>`}else if(adminShopSection==="delivery"){const i=shopMgmtState.delivery;a=`
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
          </div>`}else if(adminShopSection==="payments"){const i=shopMgmtState.payments||{},l=i.verification||{},d=Array.isArray(i.customMethods)?i.customMethods:[];a=`
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
          ${d.length?`
            <div class="space-y-2.5">
              <div class="px-1 flex items-center justify-between">
                <span class="text-[10.5px] font-extrabold uppercase tracking-wider text-ink">Additional Banks &amp; Wallets (${d.length})</span>
              </div>
              ${d.map((u,p)=>`
                <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-stone-200/80 space-y-2.5">
                  <div class="flex items-center justify-between pb-2 border-b border-stone-100">
                    <div class="min-w-0">
                      <div class="flex items-center gap-1.5">
                        <h4 class="font-extrabold text-xs text-ink truncate">${u.name}</h4>
                        <span class="px-2 py-0.5 rounded-full bg-blush-100 text-berry text-[9px] font-extrabold shrink-0">${u.type||"Bank"}</span>
                      </div>
                    </div>
                    <div class="flex items-center gap-2 shrink-0">
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input id="sm-pay-cust-en-${p}" type="checkbox" ${u.enabled!==!1?"checked":""} class="sr-only peer" />
                        <div class="w-9 h-5 bg-stone-200 rounded-full peer peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-stone-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-berry"></div>
                      </label>
                      <button type="button" onclick="removeCustomShopPaymentMethod(${p})" class="text-[10px] font-bold text-rose-600 cursor-pointer">&times;</button>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-2">
                    <input id="sm-pay-cust-holder-${p}" type="text" placeholder="Account Holder" value="${u.accountHolder||""}" class="px-2.5 py-1.5 rounded-xl border border-stone-200 bg-stone-50/40 text-[11px] font-semibold text-ink" />
                    <input id="sm-pay-cust-num-${p}" type="text" placeholder="Account Number" value="${u.accountNumber||""}" class="px-2.5 py-1.5 rounded-xl border border-stone-200 bg-stone-50/40 text-[11px] font-mono font-bold text-ink" />
                  </div>
                  <input id="sm-pay-cust-inst-${p}" type="text" placeholder="Instructions..." value="${u.instructions||""}" class="w-full px-2.5 py-1.5 rounded-xl border border-stone-200 bg-stone-50/40 text-[11px] text-ink" />
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
          </div>`}n.innerHTML=a+`
        <button type="button" id="sm-save-btn" onclick="saveShopManagement()" class="w-full py-3 rounded-full btn-berry text-white text-xs font-extrabold shadow-rose-sm active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Save Shop Settings Permanently</span>
        </button>
      `,adminShopSection==="location"&&initShopLocationMap()}async function saveShopManagement(){if(collectCurrentShopTabInputs(),!shopMgmtState.business.name||!shopMgmtState.business.name.trim()){typeof showAdminToast=="function"&&showAdminToast("Shop name is required");return}if(!shopMgmtState.business.phone||!shopMgmtState.business.phone.trim()){typeof showAdminToast=="function"&&showAdminToast("Phone number is required");return}const t=JSON.parse(JSON.stringify(shopMgmtState));smPendingLogoData&&(t.business.logo=smPendingLogoData);const e=document.getElementById("sm-save-btn");await runWithFeedback({lockKey:"save-shop-mgmt",btnEl:e,scope:"admin",loadingMsg:"Saving shop settings...",successMsg:"Changes saved successfully!",action:async()=>{const n=await fetch("/api/shop-management",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),o=await n.json();if(!n.ok||!o.success)throw new Error(o.error||"Failed to save shop settings");return o.settings?.brand?.logo&&(shopMgmtState.business.logo=o.settings.brand.logo,smPendingLogoData=void 0),localStorage.setItem("mak_shop_mgmt_v1",JSON.stringify(shopMgmtState)),syncShopToCustomerUI(),renderAdminShop(),!0}})}let pcActiveTab="sizes",productConfigState={enabled:!0,sectionsEnabled:{sizes:!0,weights:!0,units:!0,rules:!0,options:!0},sizes:[{id:'6" Standard',label:'6" Standard',add:0,serves:"6\u20138 Guests",enabled:!0},{id:'8" Celebration',label:'8" Celebration',add:700,serves:"12\u201315 Guests",enabled:!0},{id:'10" Grand',label:'10" Grand',add:1600,serves:"20\u201324 Guests",enabled:!0},{id:"2-Tier Luxury",label:"2-Tier",add:4200,serves:"35+ Guests",enabled:!0}],weights:[{id:"wt-500g",value:500,unit:"g",add:0,enabled:!0},{id:"wt-1kg",value:1,unit:"kg",add:450,enabled:!0},{id:"wt-1-5kg",value:1.5,unit:"kg",add:900,enabled:!0},{id:"wt-2kg",value:2,unit:"kg",add:1400,enabled:!0}],units:{defaultUnit:"g",allowGrams:!0,allowKilograms:!0,gramsPerKg:1e3},pricingRules:[{id:"rule-1",sizeId:'8" Celebration',weightId:"wt-1-5kg",extraCharge:250,label:"Celebration + 1.5kg Reinforcement",enabled:!0},{id:"rule-2",sizeId:"2-Tier Luxury",weightId:"wt-2kg",extraCharge:500,label:"2-Tier Dowel & Box Support",enabled:!0}],customizations:[{id:"opt-msg",name:"Custom Cake Inscription",charge:0,required:!1,enabled:!0},{id:"opt-eggless",name:"Eggless / Special Dietary Prep",charge:250,required:!1,enabled:!0},{id:"opt-gold",name:"Edible Gold Leaf Accent",charge:450,required:!1,enabled:!0},{id:"opt-express",name:"Express 3-Hour Kitchen Prep",charge:350,required:!1,enabled:!0}]};function convertCakeWeight(t,e,n){const o=Number(t)||0;return e===n?o:e==="kg"&&n==="g"?Math.round(o*1e3):e==="g"&&n==="kg"?Number((o/1e3).toFixed(2)):o}function formatCakeWeight(t){const e=productConfigState.units?.defaultUnit||t.unit;return e==="g"&&productConfigState.units?.allowGrams||e==="kg"&&productConfigState.units?.allowKilograms?convertCakeWeight(t.value,t.unit,e)+e:t.value+t.unit}function syncProductConfigToOrderSystem(){const t=(productConfigState.sizes||[]).filter(e=>e.enabled!==!1);if(t.length>0&&(SIZES=t.map(e=>({id:e.id,label:e.label,add:Number(e.add)||0,serves:e.serves||"6\u20138 Guests"}))),typeof renderOrderSheet=="function"&&document.getElementById("order-sheet")&&!document.getElementById("order-sheet").classList.contains("hidden"))try{renderOrderSheet()}catch{}}async function loadProductConfigFromDb(){try{const t=await fetch("/api/product-config",{cache:"no-store"});if(t.ok){const e=await t.json();if(e.success&&e.productConfig){productConfigState={...productConfigState,...e.productConfig},localStorage.setItem("mak_product_config_v1",JSON.stringify(productConfigState)),syncProductConfigToOrderSystem(),adminTab==="product-config"&&renderProductConfig();return}}}catch{}try{const t=localStorage.getItem("mak_product_config_v1");t&&(productConfigState={...productConfigState,...JSON.parse(t)})}catch{}syncProductConfigToOrderSystem(),adminTab==="product-config"&&renderProductConfig()}function openProductConfigSection(){switchAdminTab("product-config"),loadProductConfigFromDb()}function toggleProductConfigMaster(t){productConfigState.enabled=!!t;const e=document.getElementById("pc-master-label");e&&(e.textContent=productConfigState.enabled?"ON":"OFF",e.className=productConfigState.enabled?"text-[10px] font-extrabold text-berry":"text-[10px] font-extrabold text-ink-muted"),renderProductConfig()}function togglePcSectionEnabled(t,e){productConfigState.sectionsEnabled=productConfigState.sectionsEnabled||{sizes:!0,weights:!0,units:!0,rules:!0,options:!0},productConfigState.sectionsEnabled[t]=!!e,renderProductConfig()}function renderPcOnOffSwitch(t,e){return`
        <label class="inline-flex items-center gap-1.5 cursor-pointer shrink-0">
          <span class="text-[9.5px] font-extrabold ${t?"text-berry":"text-ink-muted"}">${t?"ON":"OFF"}</span>
          <div class="relative inline-flex items-center">
            <input type="checkbox" ${t?"checked":""} onchange="${e}" class="sr-only peer" />
            <div class="w-9 h-5 bg-stone-200 rounded-full peer peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-stone-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-berry"></div>
          </div>
        </label>
      `}function setProductConfigTab(t){pcActiveTab=t,renderProductConfig()}function addPcSize(){const t=productConfigState.sizes.length+1;productConfigState.sizes.push({id:"size-"+Date.now(),label:"Custom Size "+t,add:500,serves:"10\u201312 Guests",enabled:!0}),renderProductConfig()}function updatePcSize(t,e,n){const o=productConfigState.sizes[t];o&&(o[e]=e==="add"?Math.max(0,Number(n)||0):e==="enabled"?!!n:String(n),e==="label"&&!o.id.startsWith('6"')&&!o.id.startsWith('8"')&&!o.id.startsWith('10"')&&!o.id.startsWith("2-Tier")&&(o.id=String(n).trim()||o.id))}function deletePcSize(t){if(productConfigState.sizes.length<=1){typeof showAdminToast=="function"&&showAdminToast("Keep at least one cake size");return}productConfigState.sizes.splice(t,1),renderProductConfig()}function addPcWeight(){productConfigState.weights.push({id:"wt-"+Date.now(),value:750,unit:"g",add:300,enabled:!0}),renderProductConfig()}function updatePcWeight(t,e,n){const o=productConfigState.weights[t];o&&(e==="value"?o.value=Math.max(.05,Number(n)||.5):e==="add"?o.add=Math.max(0,Number(n)||0):e==="unit"?o.unit=n==="kg"?"kg":"g":e==="enabled"&&(o.enabled=!!n))}function deletePcWeight(t){if(productConfigState.weights.length<=1){typeof showAdminToast=="function"&&showAdminToast("Keep at least one cake weight");return}productConfigState.weights.splice(t,1),renderProductConfig()}function addPcRule(){const t=productConfigState.sizes[0]?.id||"",e=productConfigState.weights[0]?.id||"";productConfigState.pricingRules.push({id:"rule-"+Date.now(),sizeId:t,weightId:e,extraCharge:200,label:"Custom Rule",enabled:!0}),renderProductConfig()}function updatePcRule(t,e,n){const o=productConfigState.pricingRules[t];o&&(e==="extraCharge"?o.extraCharge=Math.max(0,Number(n)||0):e==="enabled"?o.enabled=!!n:o[e]=String(n))}function deletePcRule(t){productConfigState.pricingRules.splice(t,1),renderProductConfig()}function addPcCustomization(){productConfigState.customizations.push({id:"opt-"+Date.now(),name:"New Option",charge:150,required:!1,enabled:!0}),renderProductConfig()}function updatePcCustomization(t,e,n){const o=productConfigState.customizations[t];o&&(e==="charge"?o.charge=Math.max(0,Number(n)||0):e==="enabled"||e==="required"?o[e]=!!n:o[e]=String(n))}function deletePcCustomization(t){productConfigState.customizations.splice(t,1),renderProductConfig()}function renderProductConfig(){const t=document.getElementById("pc-subtabs"),e=[{id:"sizes",label:"1. Sizes"},{id:"weights",label:"2. Weights"},{id:"units",label:"3. Units"},{id:"rules",label:"4. Pricing Rules"},{id:"options",label:"5. Customizations"}];t&&(t.innerHTML=e.map(u=>{const p=pcActiveTab===u.id;return`<button type="button" onclick="setProductConfigTab('${u.id}')" class="shrink-0 px-3 py-1.5 rounded-full text-[10.5px] font-bold transition-all cursor-pointer ${p?"btn-berry text-white shadow-rose-sm":"bg-white text-ink-muted border border-blush-200 hover:text-ink"}">${u.label}</button>`}).join(""));const n=document.getElementById("pc-body");if(!n)return;let o="";if(pcActiveTab==="sizes")o=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-2.5">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-extrabold text-ink">1. Cake Sizes</h3>
              <button type="button" onclick="addPcSize()" class="px-2.5 py-1 rounded-full bg-blush-100 text-berry text-[10px] font-extrabold cursor-pointer">+ Add Size</button>
            </div>
            <div class="space-y-2">
              ${productConfigState.sizes.map((u,p)=>`
                <div class="p-2.5 rounded-2xl bg-blush-50/70 border border-blush-200/80 space-y-2">
                  <div class="flex items-center justify-between gap-2">
                    ${renderPcOnOffSwitch(u.enabled!==!1,`updatePcSize(${p}, 'enabled', this.checked); renderProductConfig();`)}

                    <button type="button" onclick="deletePcSize(${p})" class="text-[10px] font-bold text-rose-600 cursor-pointer">&times; Delete</button>
                  </div>
                  <div class="grid grid-cols-3 gap-1.5">
                    <input type="text" value="${u.label}" onchange="updatePcSize(${p}, 'label', this.value)" placeholder="Label" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-bold text-ink" />
                    <input type="text" value="${u.serves}" onchange="updatePcSize(${p}, 'serves', this.value)" placeholder="Servings" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] text-ink" />
                    <input type="number" min="0" value="${u.add}" onchange="updatePcSize(${p}, 'add', this.value)" placeholder="+ETB" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-extrabold text-berry" />
                  </div>
                </div>`).join("")}
            </div>
          </div>`;else if(pcActiveTab==="weights")o=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-2.5">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-extrabold text-ink">2. Cake Weights</h3>
              <button type="button" onclick="addPcWeight()" class="px-2.5 py-1 rounded-full bg-blush-100 text-berry text-[10px] font-extrabold cursor-pointer">+ Add Weight</button>
            </div>
            <div class="space-y-2">
              ${productConfigState.weights.map((u,p)=>`
                <div class="p-2.5 rounded-2xl bg-blush-50/70 border border-blush-200/80 space-y-2">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">${renderPcOnOffSwitch(u.enabled!==!1,`updatePcWeight(${p}, 'enabled', this.checked); renderProductConfig();`)}<span class="text-[9.5px] font-bold text-ink-muted">(${convertCakeWeight(u.value,u.unit,u.unit==="g"?"kg":"g")}${u.unit==="g"?"kg":"g"})</span></div>
                    <button type="button" onclick="deletePcWeight(${p})" class="text-[10px] font-bold text-rose-600 cursor-pointer">&times; Delete</button>
                  </div>
                  <div class="grid grid-cols-3 gap-1.5">
                    <input type="number" step="0.1" min="0.1" value="${u.value}" onchange="updatePcWeight(${p}, 'value', this.value); renderProductConfig();" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-bold text-ink" />
                    <select onchange="updatePcWeight(${p}, 'unit', this.value); renderProductConfig();" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-bold text-ink">
                      <option value="g" ${u.unit==="g"?"selected":""}>Grams (g)</option>
                      <option value="kg" ${u.unit==="kg"?"selected":""}>Kilograms (kg)</option>
                    </select>
                    <input type="number" min="0" value="${u.add}" onchange="updatePcWeight(${p}, 'add', this.value)" placeholder="+ETB" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-extrabold text-berry" />
                  </div>
                </div>`).join("")}
            </div>
          </div>`;else if(pcActiveTab==="units"){const u=productConfigState.units||{};o=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-3">
            <h3 class="text-xs font-extrabold text-ink">3. Measurement Units</h3>
            <label class="p-2.5 rounded-2xl bg-blush-50/70 border border-blush-200 flex items-center justify-between cursor-pointer">
              <span class="text-[11px] font-bold text-ink">Enable Grams (g)</span>
              <input type="checkbox" ${u.allowGrams!==!1?"checked":""} onchange="productConfigState.units.allowGrams = this.checked" class="w-4 h-4 accent-berry" />
            </label>
            <label class="p-2.5 rounded-2xl bg-blush-50/70 border border-blush-200 flex items-center justify-between cursor-pointer">
              <span class="text-[11px] font-bold text-ink">Enable Kilograms (kg)</span>
              <input type="checkbox" ${u.allowKilograms!==!1?"checked":""} onchange="productConfigState.units.allowKilograms = this.checked" class="w-4 h-4 accent-berry" />
            </label>
            <div>
              <label class="block text-[10.5px] font-bold text-ink-muted mb-1">Customer Display Unit</label>
              <select onchange="productConfigState.units.defaultUnit = this.value; renderProductConfig();" class="w-full px-3 py-2 rounded-xl bg-blush-50 border border-blush-200 text-xs font-bold text-ink">
                <option value="g" ${u.defaultUnit==="g"?"selected":""}>Grams (g) \u2014 e.g. 500g, 1000g</option>
                <option value="kg" ${u.defaultUnit==="kg"?"selected":""}>Kilograms (kg) \u2014 e.g. 0.5kg, 1kg</option>
              </select>
            </div>
            <div class="p-2.5 rounded-xl bg-blush-50 border border-blush-200 text-[10.5px] text-ink-muted">
              Conversion standard: <strong class="text-ink">1 kg = 1,000 g</strong>. All customer weights automatically convert to <strong class="text-berry">${u.defaultUnit||"g"}</strong>.
            </div>
          </div>`}else pcActiveTab==="rules"?o=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-2.5">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-extrabold text-ink">4. Pricing Rules (Size + Weight)</h3>
              <button type="button" onclick="addPcRule()" class="px-2.5 py-1 rounded-full bg-blush-100 text-berry text-[10px] font-extrabold cursor-pointer">+ Add Rule</button>
            </div>
            <div class="space-y-2">
              ${productConfigState.pricingRules.length?productConfigState.pricingRules.map((u,p)=>`
                <div class="p-2.5 rounded-2xl bg-blush-50/70 border border-blush-200/80 space-y-2">
                  <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-2 flex-1 min-w-0">${renderPcOnOffSwitch(u.enabled!==!1,`updatePcRule(${p}, 'enabled', this.checked); renderProductConfig();`)}<input type="text" value="${u.label||""}" onchange="updatePcRule(${p}, 'label', this.value)" class="text-[11px] font-bold text-ink bg-transparent border-b border-dashed border-blush-300 focus:outline-none min-w-0 flex-1" /></div>
                    <button type="button" onclick="deletePcRule(${p})" class="text-[10px] font-bold text-rose-600 cursor-pointer">&times; Remove</button>
                  </div>
                  <div class="grid grid-cols-3 gap-1.5">
                    <select onchange="updatePcRule(${p}, 'sizeId', this.value)" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[10.5px] font-bold text-ink">
                      ${productConfigState.sizes.map(m=>`<option value="${m.id}" ${u.sizeId===m.id?"selected":""}>${m.label}</option>`).join("")}
                    </select>
                    <select onchange="updatePcRule(${p}, 'weightId', this.value)" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[10.5px] font-bold text-ink">
                      ${productConfigState.weights.map(m=>`<option value="${m.id}" ${u.weightId===m.id?"selected":""}>${m.value}${m.unit}</option>`).join("")}
                    </select>
                    <input type="number" min="0" value="${u.extraCharge}" onchange="updatePcRule(${p}, 'extraCharge', this.value)" placeholder="+ETB" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-extrabold text-berry" />
                  </div>
                </div>`).join(""):'<div class="text-xs text-ink-muted text-center py-3">No pricing rules added yet.</div>'}
            </div>
          </div>`:pcActiveTab==="options"&&(o=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-2.5">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-extrabold text-ink">5. Cake Customization Options</h3>
              <button type="button" onclick="addPcCustomization()" class="px-2.5 py-1 rounded-full bg-blush-100 text-berry text-[10px] font-extrabold cursor-pointer">+ Add Option</button>
            </div>
            <div class="space-y-2">
              ${productConfigState.customizations.map((u,p)=>`
                <div class="p-2.5 rounded-2xl bg-blush-50/70 border border-blush-200/80 space-y-2">
                  <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-3">
                      ${renderPcOnOffSwitch(u.enabled!==!1,`updatePcCustomization(${p}, 'enabled', this.checked); renderProductConfig();`)}
                      <label class="flex items-center gap-1 cursor-pointer">
                        <input type="checkbox" ${u.required?"checked":""} onchange="updatePcCustomization(${p}, 'required', this.checked)" class="w-3.5 h-3.5 accent-berry" />
                        <span class="text-[10px] font-bold text-berry">Required</span>
                      </label>
                    </div>
                    <button type="button" onclick="deletePcCustomization(${p})" class="text-[10px] font-bold text-rose-600 cursor-pointer">&times; Remove</button>
                  </div>
                  <div class="grid grid-cols-3 gap-1.5">
                    <input type="text" value="${u.name}" onchange="updatePcCustomization(${p}, 'name', this.value)" class="col-span-2 px-2.5 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-bold text-ink" />
                    <input type="number" min="0" value="${u.charge}" onchange="updatePcCustomization(${p}, 'charge', this.value)" placeholder="+ETB" class="px-2 py-1.5 rounded-xl bg-white border border-blush-200 text-[11px] font-extrabold text-berry" />
                  </div>
                </div>`).join("")}
            </div>
          </div>`);const s=document.getElementById("pc-master-checkbox"),r=document.getElementById("pc-master-label"),a=productConfigState.enabled!==!1;s&&(s.checked=a),r&&(r.textContent=a?"ON":"OFF",r.className=a?"text-[10px] font-extrabold text-berry":"text-[10px] font-extrabold text-ink-muted");const i=productConfigState.sectionsEnabled&&productConfigState.sectionsEnabled[pcActiveTab]!==!1,d=`
        <div class="bg-white rounded-2xl px-3.5 py-2.5 shadow-rose-sm border border-blush-200/70 flex items-center justify-between gap-2">
          <div>
            <div class="text-[11px] font-extrabold text-ink">${{sizes:"Cake Sizes",weights:"Cake Weights",units:"Measurement Units",rules:"Pricing Rules",options:"Customization Options"}[pcActiveTab]||"Section"} Status</div>
            <div class="text-[9.5px] text-ink-muted">${a?i?"Active on customer ordering":"Hidden from customer ordering":"Master Product Config is OFF"}</div>
          </div>
          ${renderPcOnOffSwitch(i,`togglePcSectionEnabled('${pcActiveTab}', this.checked)`)}
        </div>`;n.innerHTML=d+`<div class="${!a||!i?"opacity-55":""}">`+o+`</div>
        <button type="button" id="pc-save-btn" onclick="saveProductConfig()" class="w-full py-3 rounded-full btn-berry text-white text-xs font-extrabold shadow-rose-sm active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Save Product Configuration</span>
        </button>
      `}async function saveProductConfig(){const t=document.getElementById("pc-save-btn");await runWithFeedback({lockKey:"save-product-config",btnEl:t,scope:"admin",loadingMsg:"Saving configuration...",successMsg:"Changes saved successfully!",action:async()=>{const e=await fetch("/api/product-config",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(productConfigState)}),n=await e.json();if(!e.ok||!n.success)throw new Error(n.error||"Could not save configuration");return productConfigState=n.productConfig,localStorage.setItem("mak_product_config_v1",JSON.stringify(productConfigState)),syncProductConfigToOrderSystem(),renderProductConfig(),!0}})}function selectSheetWeight(t){sheet.weightId=sheet.weightId===t?null:t,renderOrderSheet()}function toggleSheetCustomOpt(t){Array.isArray(sheet.customOptions)||(sheet.customOptions=[]);const e=sheet.customOptions.indexOf(t);e>=0?sheet.customOptions.splice(e,1):sheet.customOptions.push(t),renderOrderSheet()}let mktActiveTab="ads",mktAds=[],mktPromos=[],mktRewards={enabled:!0,eligibilityRules:{minOrderAmount:2e3,onePerCustomer:!0},prizes:[]},mktPendingAdImg="",mktEditingAdId=null,mktEditingPromoId=null;async function loadMarketingFromDb(){try{const[t,e,n]=await Promise.all([fetch("/api/advertisements",{cache:"no-store"}),fetch("/api/promo-codes",{cache:"no-store"}),fetch("/api/rewards",{cache:"no-store"})]);if(t.ok){const o=await t.json();o.success&&Array.isArray(o.advertisements)&&(mktAds=o.advertisements,syncAdsToCustomerHomepage())}if(e.ok){const o=await e.json();o.success&&Array.isArray(o.promoCodes)&&(mktPromos=o.promoCodes)}if(n.ok){const o=await n.json();o.success&&o.rewards&&(mktRewards=o.rewards)}}catch{}adminTab==="marketing"&&renderMarketingSection()}function syncAdsToCustomerHomepage(){const t=(mktAds||[]).filter(e=>e.active);if(t.length>0&&typeof HERO_SLIDES<"u"&&Array.isArray(HERO_SLIDES)&&(HERO_SLIDES.length=0,t.forEach(e=>{HERO_SLIDES.push({top:e.badge||"MAK CAKE Special",script:(e.title||"Special").split("\u2022").pop().trim().slice(0,18),sub:e.subtitle||e.desc||"Freshly baked in Addis Ababa",cta:e.buttonText?e.buttonText.replace(/→/g,"").trim():"Order Now",img:e.image||"./images/hero-banner.jpg",link:e.link||"#menu"})}),typeof heroIndex<"u"&&heroIndex>=HERO_SLIDES.length&&(heroIndex=0),typeof renderHero=="function"))try{renderHero()}catch{}}function openMarketingSection(){switchAdminTab("marketing"),loadMarketingFromDb()}function setMarketingTab(t){t==="ads"&&typeof hasPackageFeature=="function"&&!hasPackageFeature("homepage_ads")&&showPackageUpgradePrompt("Homepage Promotional Advertisements","Premium"),t==="rewards"&&typeof hasPackageFeature=="function"&&!hasPackageFeature("mystery_box")&&showPackageUpgradePrompt("Mystery Reward Box","Premium"),mktActiveTab=t,renderMarketingSection()}function handleMktAdImgUpload(t){const e=t.files&&t.files[0];if(!e||!e.type.startsWith("image/"))return;const n=new FileReader;n.onload=o=>{mktPendingAdImg=o.target.result;const s=document.getElementById("mkt-ad-img-url");s&&(s.value="Uploaded image ready")},n.readAsDataURL(e)}async function saveMktAd(){const t=(document.getElementById("mkt-ad-title")?.value||"").trim(),e=(document.getElementById("mkt-ad-desc")?.value||"").trim(),n=(document.getElementById("mkt-ad-link")?.value||"").trim()||"#menu",o=(document.getElementById("mkt-ad-img-url")?.value||"").trim(),s=mktPendingAdImg||(o&&o!=="Uploaded image ready"?o:"./images/hero-banner.jpg");if(!t){typeof showAdminToast=="function"&&showAdminToast("Advertisement title is required");return}const r=mktEditingAdId?`/api/advertisements/${mktEditingAdId}`:"/api/advertisements";(await fetch(r,{method:mktEditingAdId?"PUT":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:t,subtitle:e,link:n,image:s,active:!0})})).ok&&(mktPendingAdImg="",mktEditingAdId=null,await loadMarketingFromDb(),typeof showAdminToast=="function"&&showAdminToast("Submitted successfully!","success"))}function editMktAd(t){const e=mktAds.find(n=>String(n.id)===String(t));e&&(mktEditingAdId=e.id,mktPendingAdImg="",renderMarketingSection(),setTimeout(()=>{document.getElementById("mkt-ad-title")&&(document.getElementById("mkt-ad-title").value=e.title||""),document.getElementById("mkt-ad-desc")&&(document.getElementById("mkt-ad-desc").value=e.subtitle||""),document.getElementById("mkt-ad-link")&&(document.getElementById("mkt-ad-link").value=e.link||""),document.getElementById("mkt-ad-img-url")&&(document.getElementById("mkt-ad-img-url").value=e.image||"")},30))}async function toggleMktAd(t){(await fetch(`/api/advertisements/${t}/toggle`,{method:"PUT"})).ok&&await loadMarketingFromDb()}async function deleteMktAd(t){(await fetch(`/api/advertisements/${t}`,{method:"DELETE"})).ok&&(await loadMarketingFromDb(),typeof showAdminToast=="function"&&showAdminToast("Advertisement deleted"))}async function saveMktPromo(){const t=(document.getElementById("mkt-pr-code")?.value||"").trim().toUpperCase(),e=document.getElementById("mkt-pr-type")?.value||"percent",n=Number(document.getElementById("mkt-pr-val")?.value)||0,o=document.getElementById("mkt-pr-exp")?.value||"2027-12-31",s=Number(document.getElementById("mkt-pr-limit")?.value)||100;if(!t||n<=0){typeof showAdminToast=="function"&&showAdminToast("Enter valid code and discount value");return}const r=mktEditingPromoId?`/api/promo-codes/${mktEditingPromoId}`:"/api/promo-codes",i=await fetch(r,{method:mktEditingPromoId?"PUT":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:t,type:e,discount:n,expiresAt:o,usageLimit:s,active:!0})}),l=await i.json();if(!i.ok||!l.success){typeof showAdminToast=="function"&&showAdminToast(l.error||"Error saving promo");return}mktEditingPromoId=null,await loadMarketingFromDb(),typeof showAdminToast=="function"&&showAdminToast("Submitted successfully!","success")}function editMktPromo(t){const e=mktPromos.find(n=>String(n.id)===String(t));e&&(mktEditingPromoId=e.id,renderMarketingSection(),setTimeout(()=>{document.getElementById("mkt-pr-code")&&(document.getElementById("mkt-pr-code").value=e.code),document.getElementById("mkt-pr-type")&&(document.getElementById("mkt-pr-type").value=e.type),document.getElementById("mkt-pr-val")&&(document.getElementById("mkt-pr-val").value=e.discount),document.getElementById("mkt-pr-exp")&&(document.getElementById("mkt-pr-exp").value=e.expiresAt||"2027-12-31"),document.getElementById("mkt-pr-limit")&&(document.getElementById("mkt-pr-limit").value=e.usageLimit||100)},30))}async function toggleMktPromo(t,e){(await fetch(`/api/promo-codes/${t}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({active:e})})).ok&&await loadMarketingFromDb()}async function deleteMktPromo(t){(await fetch(`/api/promo-codes/${t}`,{method:"DELETE"})).ok&&(await loadMarketingFromDb(),typeof showAdminToast=="function"&&showAdminToast("Promo code deleted"))}async function toggleMktRewardsEnabled(){(await fetch("/api/rewards/toggle",{method:"POST"})).ok&&(await loadMarketingFromDb(),typeof showAdminToast=="function"&&showAdminToast("Mystery Reward Box updated"))}async function saveMktRewardsRules(){const t=Number(document.getElementById("mkt-rew-min")?.value)||0,e=!!document.getElementById("mkt-rew-one")?.checked;(await fetch("/api/rewards/config",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({minOrderAmount:t,onePerCustomer:e})})).ok&&(await loadMarketingFromDb(),typeof showAdminToast=="function"&&showAdminToast("Reward eligibility rules saved"))}async function addMktRewardPrize(){const t=(document.getElementById("mkt-rw-name")?.value||"").trim(),e=document.getElementById("mkt-rw-type")?.value||"discount",n=Number(document.getElementById("mkt-rw-val")?.value)||100,o=Number(document.getElementById("mkt-rw-prob")?.value)||20,s=Number(document.getElementById("mkt-rw-qty")?.value)||50;if(!t){typeof showAdminToast=="function"&&showAdminToast("Enter reward prize name");return}(await fetch("/api/rewards",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,type:e,value:n,probability:o,quantityLimit:s,isAvailable:!0})})).ok&&(await loadMarketingFromDb(),typeof showAdminToast=="function"&&showAdminToast("Submitted successfully!","success"))}async function toggleMktPrizeAvail(t,e){(await fetch(`/api/rewards/${t}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({isAvailable:e})})).ok&&await loadMarketingFromDb()}async function deleteMktPrize(t){(await fetch(`/api/rewards/${t}`,{method:"DELETE"})).ok&&(await loadMarketingFromDb(),typeof showAdminToast=="function"&&showAdminToast("Reward option removed"))}function renderMarketingSection(){const t=document.getElementById("mkt-subtabs"),e=[{id:"ads",label:"1. Homepage Ads"},{id:"promos",label:"2. Promo Codes"},{id:"rewards",label:"3. Mystery Box"}];t&&(t.innerHTML=e.map(o=>{const s=mktActiveTab===o.id;return`<button type="button" onclick="setMarketingTab('${o.id}')" class="shrink-0 px-3 py-1.5 rounded-full text-[10.5px] font-bold transition-all cursor-pointer ${s?"btn-berry text-white shadow-rose-sm":"bg-white text-ink-muted border border-blush-200 hover:text-ink"}">${o.label}</button>`}).join(""));const n=document.getElementById("mkt-body");if(n){if(mktActiveTab==="ads")n.innerHTML=`
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
            ${mktAds.map(o=>`
              <div class="bg-white rounded-2xl p-3 shadow-rose-sm border border-blush-100 flex items-center gap-2.5">
                <img src="${o.image||"./images/hero-banner.jpg"}" class="w-12 h-12 rounded-xl object-cover bg-blush-50 shrink-0" />
                <div class="flex-1 min-w-0">
                  <div class="text-xs font-extrabold text-ink truncate">${o.title}</div>
                  <div class="text-[10px] text-ink-muted truncate">${o.subtitle||""}</div>
                  <div class="flex items-center gap-2 mt-1">
                    <button type="button" onclick="toggleMktAd('${o.id}')" class="px-2 py-0.5 rounded-full text-[9px] font-extrabold cursor-pointer ${o.active?"bg-emerald-50 text-emerald-700 border border-emerald-200":"bg-blush-100 text-ink-muted"}">${o.active?"Enabled":"Disabled"}</button>
                    <button type="button" onclick="editMktAd('${o.id}')" class="text-[10px] font-bold text-berry cursor-pointer">Edit</button>
                    <button type="button" onclick="deleteMktAd('${o.id}')" class="text-[10px] font-bold text-rose-600 cursor-pointer">Delete</button>
                  </div>
                </div>
              </div>`).join("")}
          </div>`;else if(mktActiveTab==="promos")n.innerHTML=`
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
            ${mktPromos.map(o=>`
              <div class="bg-white rounded-2xl p-3 shadow-rose-sm border border-blush-100 flex items-center justify-between gap-2">
                <div class="min-w-0">
                  <div class="text-xs font-black text-berry">${o.code} <span class="text-ink font-bold">\u2022 ${o.type==="percent"?o.discount+"%":o.discount+" ETB"} Off</span></div>
                  <div class="text-[9.5px] text-ink-muted">Exp: ${o.expiresAt||"None"} \u2022 Used: ${o.usedCount||0}/${o.usageLimit||"\u221E"}</div>
                </div>
                <div class="flex items-center gap-1.5 shrink-0">
                  <button type="button" onclick="toggleMktPromo('${o.id}', ${!o.active})" class="px-2 py-1 rounded-full text-[9px] font-extrabold cursor-pointer ${o.active?"bg-emerald-50 text-emerald-700 border border-emerald-200":"bg-blush-100 text-ink-muted"}">${o.active?"Active":"Off"}</button>
                  <button type="button" onclick="editMktPromo('${o.id}')" class="text-[10px] font-bold text-berry cursor-pointer">Edit</button>
                  <button type="button" onclick="deleteMktPromo('${o.id}')" class="text-[10px] font-bold text-rose-600 cursor-pointer">&times;</button>
                </div>
              </div>`).join("")}
          </div>`;else if(mktActiveTab==="rewards"){const o=mktRewards.eligibilityRules||{};n.innerHTML=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-2.5">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-extrabold text-ink">Mystery Reward Box</h3>
              <button type="button" onclick="toggleMktRewardsEnabled()" class="px-3 py-1 rounded-full text-[10px] font-extrabold cursor-pointer ${mktRewards.enabled?"bg-emerald-50 text-emerald-700 border border-emerald-200":"bg-rose-50 text-berry border border-rose-200"}">${mktRewards.enabled?"Enabled":"Disabled"}</button>
            </div>
            <div class="grid grid-cols-2 gap-2 items-center">
              <div>
                <label class="block text-[9.5px] font-bold text-ink-muted mb-0.5">Min Order (ETB)</label>
                <input id="mkt-rew-min" type="number" min="0" value="${o.minOrderAmount||2e3}" class="w-full px-2.5 py-1.5 rounded-xl bg-blush-50 border border-blush-200 text-xs font-bold text-ink" />
              </div>
              <label class="flex items-center gap-2 text-[10.5px] font-bold text-ink cursor-pointer pt-4">
                <input id="mkt-rew-one" type="checkbox" ${o.onePerCustomer!==!1?"checked":""} class="w-4 h-4 accent-berry" />
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
          </div>`}}}async function applyCheckoutPromoCode(){const t=(document.getElementById("checkout-promo-input")?.value||"").trim().toUpperCase(),e=document.getElementById("checkout-promo-msg");if(!t)return;const n=computeSheetTotal(),o=n.base+n.addSum;try{const s=await fetch("/api/promo-codes/validate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:t,subtotal:o})}),r=await s.json();if(!s.ok||!r.valid){sheet.promoDiscount=0,sheet.promoCode="",e&&(e.textContent=r.error||"Invalid promo code",e.className="text-[10px] font-bold text-rose-600 mt-1"),renderOrderSheet();return}sheet.promoCode=r.promo.code,sheet.promoDiscount=r.discountAmount,renderOrderSheet(),typeof showCustomerToast=="function"&&showCustomerToast(`Promo ${r.promo.code} applied (- ${r.discountAmount} ETB)`)}catch{}}async function claimCheckoutMysteryReward(){if(sheet.mysteryClaimedPrize)return;const t=computeSheetTotal(),e=t.base+t.addSum,n=(sheet.custPhone||"guest-"+Date.now()).trim();try{const o=await fetch("/api/rewards/claim",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({orderAmount:e,claimKey:n})}),s=await o.json();if(!o.ok||!s.success){typeof showCustomerToast=="function"&&showCustomerToast(s.error||"Not eligible yet");return}sheet.mysteryClaimedPrize=s.prize,sheet.mysteryRewardDiscount=s.prize.type==="discount"&&Number(s.prize.value)||0,renderOrderSheet(),typeof showCustomerToast=="function"&&showCustomerToast("\u{1F381} Won: "+s.prize.name)}catch{}}let settingsHubTab="packages";const DEFAULT_CUSTOMER_THEME={primary:"#E11D62",secondary:"#C91254",accent:"#F48FB1",background:"#FDF0F4",text:"#1D1116",button:"#E11D62",navbar:"#FFFFFF",header:"#FDF0F4",footer:"#FFFFFF",productCard:"#FFFFFF",border:"#FAD4E2"};let settingsHubState={activePackageId:"pkg-basic",packages:[{id:"pkg-basic",tier:1,name:"Basic",price:3e3,tagline:"Essential online bakery storefront & ordering",billing:"One-time setup",enabled:!0,features:["Customer Mobile Storefront","Full Online Cake Ordering & Cart","Real-Time Order Tracking & Management","Product Catalog Management","CBE & Telebirr Payment Instructions","Bole Kitchen Live Status"],limits:{maxProducts:30,decorations:0,customThemes:!1,staffLimit:1}},{id:"pkg-advanced",tier:2,name:"Advanced",price:5e3,tagline:"Sales analytics, extra decorations & staff accounts",billing:"One-time setup",enabled:!0,features:["Everything in Basic","Sales & Net Profit Analytics","Extra Decorations (Up to 5 items)","Digital Table / QR Ordering Code","1 Additional Staff / Manager Account","Order Status Push Notifications"],limits:{maxProducts:100,decorations:5,customThemes:!1,staffLimit:2}},{id:"pkg-premium",tier:3,name:"Premium",price:1e4,tagline:"Complete digital bakery suite with unlimited features",billing:"One-time setup",enabled:!0,includesPrefix:"Everything in Advanced, plus:",features:["Unlimited Extra Cake Decorations","Custom Storefront Themes & Colors","Homepage Promotional Ad Banners","Mystery Reward Box Feature","Up to 5 Manager Accounts & Permissions","Priority Phone & Kitchen Support","Printable QR Ordering Stickers"],limits:{maxProducts:9999,decorations:999,customThemes:!0,staffLimit:6}}],notifications:{enabled:!0,volume:80,customSounds:[],events:{newOrder:"chime-classic",paymentSubmitted:"chime-rose",paymentVerified:"chime-crystal",orderStatusUpdated:"chime-double"}},customerTheme:{...DEFAULT_CUSTOMER_THEME},general:{language:"en",dateFormat:"MMM D, YYYY",timeFormat:"12h",region:"Africa/Addis_Ababa"}},staffManagersList=[],activeSessionsList=[];function applyCustomerThemeVariables(t=settingsHubState.customerTheme){const e={...DEFAULT_CUSTOMER_THEME,...t||{}};let n=document.getElementById("customer-theme-style-override");n||(n=document.createElement("style"),n.id="customer-theme-style-override",document.head.appendChild(n)),n.textContent=`
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
      `}function migrateCachedPackages(){try{const t=localStorage.getItem("mak_settings_hub_v1");if(t){const e=JSON.parse(t);e&&e.packages&&e.packages.some(n=>n.id==="pkg-starter"||n.name==="Starter Bakery"||n.id==="pkg-royal")&&(e.packages=settingsHubState.packages,(e.activePackageId==="pkg-starter"||e.activePackageId==="pkg-pro"||e.activePackageId==="pkg-royal"||!e.activePackageId)&&(e.activePackageId="pkg-basic"),localStorage.setItem("mak_settings_hub_v1",JSON.stringify(e))),settingsHubState={...settingsHubState,...e}}}catch{}}async function loadSettingsHubFromDb(){migrateCachedPackages();try{const[t,e,n]=await Promise.all([fetch("/api/admin/settings-hub",{cache:"no-store"}),fetch("/api/managers",{cache:"no-store"}),fetch("/api/admin/security/sessions",{cache:"no-store"})]);if(t.ok){const o=await t.json();if(o.success&&o.settingsHub&&(settingsHubState={...settingsHubState,...o.settingsHub},localStorage.setItem("mak_settings_hub_v1",JSON.stringify(settingsHubState)),applyCustomerThemeVariables(settingsHubState.customerTheme),typeof renderUpgradePlanPage=="function"))try{renderUpgradePlanPage()}catch{}}if(e.ok){const o=await e.json();o.success&&Array.isArray(o.managers)&&(staffManagersList=o.managers)}if(n.ok){const o=await n.json();o.success&&Array.isArray(o.sessions)&&(activeSessionsList=o.sessions)}}catch{}adminTab==="settings"&&renderSettingsHub()}function openSettingsHubSection(){switchAdminTab("settings"),loadSettingsHubFromDb(),checkInitialAdminLockState(),setCustomerLanguage(currentCustomerLang)}function setSettingsHubTab(t){settingsHubTab=t,renderSettingsHub()}async function saveSettingsHubToDb(t="Changes saved successfully!"){await runWithFeedback({lockKey:"save-settings-hub",scope:"admin",loadingMsg:"Saving settings...",successMsg:t||"Changes saved successfully!",action:async()=>{const e=await fetch("/api/admin/settings-hub",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(settingsHubState)}),n=await e.json();if(!e.ok||!n.success)throw new Error(n.error||"Failed to save settings.");return localStorage.setItem("mak_settings_hub_v1",JSON.stringify(settingsHubState)),!0}})}function selectActivePackage(t){const e=settingsHubState.packages.find(n=>n.id===t);if(!e||e.enabled===!1){typeof showAdminToast=="function"&&showAdminToast("Enable package before activating");return}settingsHubState.activePackageId=t,saveSettingsHubToDb(`Active package set to ${e.name}`),renderSettingsHub()}function updateHubPackage(t,e,n){const o=settingsHubState.packages[t];o&&(e==="price"?o.price=Math.max(0,Number(n)||0):e==="enabled"?o.enabled=!!n:o[e]=String(n))}async function addStaffMember(){const t=(document.getElementById("st-new-name")?.value||"").trim(),e=(document.getElementById("st-new-email")?.value||"").trim(),n=(document.getElementById("st-new-phone")?.value||"").trim(),o=document.getElementById("st-new-role")?.value||"Kitchen Staff";if(!t){typeof showAdminToast=="function"&&showAdminToast("Staff name is required");return}(await fetch("/api/managers",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,email:e,phone:n,role:o,permissions:{viewDashboard:!0,viewOrders:!0,manageOrders:o!=="Viewer",manageProducts:o==="Manager"}})})).ok&&(await loadSettingsHubFromDb(),typeof showAdminToast=="function"&&showAdminToast(`Added staff: ${t}`))}async function toggleStaffPermission(t,e,n){(await fetch(`/api/managers/${t}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({permissions:{[e]:!n}})})).ok&&await loadSettingsHubFromDb()}async function removeStaffMember(t){const e=await fetch(`/api/managers/${t}`,{method:"DELETE"}),n=await e.json();if(!e.ok){typeof showAdminToast=="function"&&showAdminToast(n.error||"Cannot remove");return}await loadSettingsHubFromDb(),typeof showAdminToast=="function"&&showAdminToast("Staff account removed")}async function updateAdminSecurityPin(){const t=(document.getElementById("sec-new-pin")?.value||"").trim();if(t.length<4){typeof showAdminToast=="function"&&showAdminToast("Enter at least 4 characters");return}const e=await fetch("/api/admin/security/update-pin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({newPin:t})}),n=await e.json();e.ok&&n.success?(document.getElementById("sec-new-pin").value="",typeof showAdminToast=="function"&&showAdminToast("PIN / Password updated!")):typeof showAdminToast=="function"&&showAdminToast(n.error||"Failed")}async function logoutOtherAdminSessions(){const t=await fetch("/api/admin/security/logout-others",{method:"POST"}),e=await t.json();t.ok&&e.success&&(await loadSettingsHubFromDb(),typeof showAdminToast=="function"&&showAdminToast(e.message||"Other sessions logged out"))}function previewNotificationSound(t){const e=Number(settingsHubState.notifications?.volume??80)/100,n=(settingsHubState.notifications?.customSounds||[]).find(o=>o.id===t||o.url===t);if(n&&n.url){const o=new Audio(n.url);o.volume=e,o.play().catch(()=>{});return}try{const o=new(window.AudioContext||window.webkitAudioContext),s=o.createOscillator(),r=o.createGain(),a={"chime-classic":660,"chime-rose":784,"chime-crystal":987,"chime-double":587};s.type="sine",s.frequency.value=a[t]||660,r.gain.setValueAtTime(Math.max(.05,e*.25),o.currentTime),r.gain.exponentialRampToValueAtTime(.001,o.currentTime+.35),s.connect(r),r.connect(o.destination),s.start(),s.stop(o.currentTime+.36)}catch{}}async function uploadCustomChimeFile(t){const e=t.files&&t.files[0];if(!e)return;const n=new FileReader;n.onload=async o=>{const s=await fetch("/api/admin/chime-upload",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e.name.replace(/.[^.]+$/,""),dataUrl:o.target.result})}),r=await s.json();s.ok&&r.success?(await loadSettingsHubFromDb(),typeof showAdminToast=="function"&&showAdminToast("Custom sound uploaded!")):typeof showAdminToast=="function"&&showAdminToast(r.error||"Upload failed")},n.readAsDataURL(e)}function updateCustomerThemeColor(t,e){if(!/^#[0-9A-Fa-f]{6}$/.test(e))return;settingsHubState.customerTheme[t]=e;const n=document.getElementById("th-pick-"+t),o=document.getElementById("th-hex-"+t);n&&n.value.toLowerCase()!==e.toLowerCase()&&(n.value=e),o&&o.value.toLowerCase()!==e.toLowerCase()&&(o.value=e),applyCustomerThemeVariables(settingsHubState.customerTheme)}function restoreDefaultCustomerTheme(){settingsHubState.customerTheme={...DEFAULT_CUSTOMER_THEME},applyCustomerThemeVariables(settingsHubState.customerTheme),renderSettingsHub(),saveSettingsHubToDb("Restored default customer theme")}function renderSettingsHub(){const t=document.getElementById("settings-hub-pills"),e=[{id:"packages",label:"1. Packages"},{id:"staff",label:"2. Staff"},{id:"security",label:"3. Security"},{id:"sounds",label:"4. Sounds"},{id:"theme",label:"5. Theme"},{id:"general",label:"6. General"}];t&&(t.innerHTML=e.map(s=>{const r=settingsHubTab===s.id;return`<button type="button" onclick="setSettingsHubTab('${s.id}')" class="shrink-0 px-3 py-1.5 rounded-full text-[10.5px] font-bold transition-all cursor-pointer ${r?"btn-berry text-white shadow-rose-sm":"bg-white text-ink-muted border border-blush-200 hover:text-ink"}">${s.label}</button>`}).join(""));const n=document.getElementById("settings-legacy-packages-wrap");n&&n.classList.toggle("hidden",settingsHubTab!=="packages");const o=document.getElementById("settings-hub-body");if(o){if(settingsHubTab==="packages"){const s=settingsHubState.packages.find(r=>r.id===settingsHubState.activePackageId)||settingsHubState.packages[0];o.innerHTML=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-2.5">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-[10px] font-bold text-ink-muted uppercase">Current Shop Package</div>
                <div class="text-xs font-black text-berry">${s?s.name:"Signature Growth"}</div>
              </div>
              <span class="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9.5px] font-extrabold">Active Plan</span>
            </div>
            <div class="space-y-2">
              ${settingsHubState.packages.map((r,a)=>{const i=settingsHubState.activePackageId===r.id;return`
                  <div class="p-3 rounded-2xl border ${i?"bg-blush-50 border-berry/50":"bg-blush-50/40 border-blush-100"} space-y-2">
                    <div class="flex items-center justify-between gap-2">
                      <input type="text" value="${r.name}" onchange="updateHubPackage(${a}, 'name', this.value)" class="text-xs font-extrabold text-ink bg-transparent border-b border-dashed border-blush-300 focus:outline-none" />
                      <div class="flex items-center gap-2">
                        <label class="flex items-center gap-1 text-[9.5px] font-bold text-ink-muted cursor-pointer">
                          <input type="checkbox" ${r.enabled!==!1?"checked":""} onchange="updateHubPackage(${a}, 'enabled', this.checked)" class="w-3.5 h-3.5 accent-berry" /> On
                        </label>
                        <button type="button" onclick="selectActivePackage('${r.id}')" class="px-2 py-0.5 rounded-full text-[9.5px] font-extrabold cursor-pointer ${i?"btn-berry text-white":"bg-white border border-blush-200 text-berry"}">${i?"Current":"Activate"}</button>
                      </div>
                    </div>
                    <div class="flex items-center justify-between gap-2">
                      <div class="text-[9.5px] text-ink-muted truncate">${(r.features||[]).join(" \u2022 ")}</div>
                      <input type="number" value="${r.price}" onchange="updateHubPackage(${a}, 'price', this.value)" class="w-20 px-2 py-1 rounded-lg bg-white border border-blush-200 text-[11px] font-extrabold text-berry text-right shrink-0" />
                    </div>
                  </div>`}).join("")}
            </div>
            <button type="button" onclick="saveSettingsHubToDb('Package configuration saved!')" class="w-full py-2.5 rounded-full btn-berry text-white text-xs font-extrabold cursor-pointer">Save Packages</button>
          </div>`}else if(settingsHubTab==="staff")o.innerHTML=`
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
                    ${["manageOrders","manageProducts","viewEarnings","manageSettings"].map(r=>`
                      <button type="button" onclick="toggleStaffPermission('${s.id}', '${r}', ${!!s.permissions?.[r]})" class="px-2 py-0.5 rounded-full text-[9px] font-bold cursor-pointer ${s.permissions?.[r]?"bg-emerald-50 text-emerald-700 border border-emerald-200":"bg-blush-50 text-ink-muted border border-blush-100"}">${r.replace("manage","").replace("view","")}: ${s.permissions?.[r]?"Yes":"No"}</button>
                    `).join("")}
                  </div>`:""}
              </div>`).join("")}
          </div>`;else if(settingsHubTab==="security")o.innerHTML=`
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
          </div>`;else if(settingsHubTab==="sounds"){const s=settingsHubState.notifications||{},r=s.events||{},a=[{id:"chime-classic",name:"Classic Bakery Bell"},{id:"chime-rose",name:"Soft Rose Chime"},{id:"chime-crystal",name:"Crystal Ding"},{id:"chime-double",name:"Double Kitchen Chime"},...(s.customSounds||[]).map(l=>({id:l.id,name:"\u{1F3B5} "+l.name}))],i=[{key:"newOrder",label:"New Orders"},{key:"paymentSubmitted",label:"Payment Submitted"},{key:"paymentVerified",label:"Payment Verified"},{key:"orderStatusUpdated",label:"Order Status Updated"}];o.innerHTML=`
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
              ${i.map(l=>`
                <div class="flex items-center justify-between gap-2">
                  <span class="text-[11px] font-bold text-ink">${l.label}</span>
                  <div class="flex items-center gap-1">
                    <select onchange="settingsHubState.notifications.events['${l.key}'] = this.value" class="px-2 py-1 rounded-xl bg-blush-50 border border-blush-200 text-[10.5px] font-bold text-ink">
                      ${a.map(d=>`<option value="${d.id}" ${r[l.key]===d.id?"selected":""}>${d.name}</option>`).join("")}
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
          </div>`}else if(settingsHubTab==="theme"){const s=settingsHubState.customerTheme||DEFAULT_CUSTOMER_THEME,r=[{key:"primary",label:"Primary"},{key:"secondary",label:"Secondary"},{key:"accent",label:"Accent"},{key:"background",label:"Background"},{key:"text",label:"Text"},{key:"button",label:"Button"},{key:"navbar",label:"Nav Bar"},{key:"header",label:"Header"},{key:"footer",label:"Footer"},{key:"productCard",label:"Product Card"},{key:"border",label:"Border"}];o.innerHTML=`
          <div class="bg-white rounded-[22px] p-4 shadow-rose-sm border border-blush-200/70 space-y-3">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-xs font-extrabold text-ink">Customer Website Theme Editor</h3>
                <p class="text-[9.5px] text-ink-muted">Live preview on Customer Phone only (Admin stays unchanged)</p>
              </div>
              <button type="button" onclick="restoreDefaultCustomerTheme()" class="px-2.5 py-1 rounded-full bg-blush-50 border border-blush-200 text-berry text-[10px] font-extrabold cursor-pointer">Restore Default</button>
            </div>
            <div class="grid grid-cols-1 gap-1.5">
              ${r.map(a=>`
                <div class="flex items-center justify-between gap-2 p-2 rounded-xl bg-blush-50/60 border border-blush-100">
                  <span class="text-[11px] font-bold text-ink">${a.label}</span>
                  <div class="flex items-center gap-1.5">
                    <input id="th-pick-${a.key}" type="color" value="${s[a.key]||"#E11D62"}" oninput="updateCustomerThemeColor('${a.key}', this.value)" class="w-7 h-7 rounded-lg border border-blush-200 cursor-pointer bg-white" />
                    <input id="th-hex-${a.key}" type="text" value="${s[a.key]||"#E11D62"}" onchange="updateCustomerThemeColor('${a.key}', this.value)" class="w-20 px-2 py-1 rounded-lg bg-white border border-blush-200 text-[10.5px] font-mono font-bold text-ink uppercase" />
                  </div>
                </div>`).join("")}
            </div>
            <button type="button" onclick="saveSettingsHubToDb('Customer theme saved permanently!')" class="w-full py-2.5 rounded-full btn-berry text-white text-xs font-extrabold cursor-pointer">Save Customer Theme</button>
          </div>`}else if(settingsHubTab==="general"){const s=settingsHubState.general||{};o.innerHTML=`
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
          </div>`}}}const CUST_I18N={en:{badge:"EN",searchPlaceholder:"Search cakes by name, flavor...",popularCakes:"Popular Cakes",viewAll:"View All \u2192",navHome:"Home",navCategories:"Categories",navMenu:"Menu",navFavorites:"Favorites",navCart:"Cart",toast:"Language: English"},am:{badge:"\u12A0\u121B",searchPlaceholder:"\u12AC\u12AE\u127D\u1295 \u1260\u1235\u121D \u12C8\u12ED\u121D \u1260\u1323\u12D5\u121D \u12ED\u1348\u120D\u1309...",popularCakes:"\u1270\u12C8\u12F3\u1305 \u12AC\u12AE\u127D",viewAll:"\u1201\u1209\u1295\u121D \u12ED\u1218\u120D\u12A8\u1271 \u2192",navHome:"\u1218\u1290\u123B",navCategories:"\u121D\u12F5\u1266\u127D",navMenu:"\u121C\u1291",navFavorites:"\u1270\u12C8\u12F3\u1306\u127D",navCart:"\u130B\u122A",toast:"\u124B\u1295\u124B: \u12A0\u121B\u122D\u129B"},om:{badge:"OM",searchPlaceholder:"Keekii maqaa ykn mi'aan barbaadi...",popularCakes:"Keekii Jaallatamoo",viewAll:"Hunda Ilaali \u2192",navHome:"Mana",navCategories:"Gosa",navMenu:"Meenuu",navFavorites:"Filatamoo",navCart:"Gaarii",toast:"Afaan: Afaan Oromoo"}};let currentCustomerLang=localStorage.getItem("mak_cust_lang")||"en";function toggleCustomerLangMenu(t){t&&t.stopPropagation();const e=document.getElementById("cust-lang-menu");e&&e.classList.toggle("hidden")}function setCustomerLanguage(t){CUST_I18N[t]||(t="en"),currentCustomerLang=t;try{localStorage.setItem("mak_cust_lang",t)}catch{}const e=CUST_I18N[t],n=document.getElementById("cust-lang-code-badge");n&&(n.textContent=e.badge);const o=document.getElementById("home-search-input");o&&(o.placeholder=e.searchPlaceholder);const s=document.getElementById("home-grid-heading");s&&(s.textContent=e.popularCakes);const r=Array.from(document.querySelectorAll('#c-tab-home button[onclick*="menu"]')).find(l=>l.dataset.i18nViewall==="1"||l.textContent.includes("View All"));r&&(r.dataset.i18nViewall="1",r.textContent=e.viewAll);const a={home:e.navHome,categories:e.navCategories,menu:e.navMenu,favorites:e.navFavorites,cart:e.navCart};document.querySelectorAll(".c-nav-btn").forEach(l=>{const d=l.dataset.ctab;if(d&&a[d]){const u=l.querySelector(":scope > span:not(.c-nav-indicator)");u&&(u.textContent=a[d])}}),document.querySelectorAll("#cust-lang-menu .cust-lang-opt").forEach(l=>{const d=l.dataset.clang===t;l.classList.toggle("bg-blush-50",d),l.classList.toggle("text-berry",d),l.classList.toggle("text-ink",!d);const u=l.querySelector(".lang-check");u&&u.classList.toggle("hidden",!d)});const i=document.getElementById("cust-lang-menu");i&&i.classList.add("hidden"),typeof showCustomerToast=="function"&&window._custLangInitDone&&showCustomerToast(e.toast),window._custLangInitDone=!0}document.addEventListener("click",t=>{const e=document.getElementById("cust-lang-menu"),n=document.getElementById("cust-lang-btn");e&&!e.classList.contains("hidden")&&!e.contains(t.target)&&(!n||!n.contains(t.target))&&e.classList.add("hidden")});const _toastTimers={},_activeSubmitLocks=new Set;function _inferToastType(t,e){if(e)return e;const n=String(t||"").toLowerCase();return n.startsWith("\u26A0\uFE0F")||n.includes("error")||n.includes("failed")||n.includes("invalid")||n.includes("required")||n.includes("cannot")||n.includes("not eligible")||n.includes("denied")?"error":"success"}function _renderToast(t,e,n="success",o=!1){const s=document.getElementById(t);if(!s)return;const r=_inferToastType(e,n),a=String(e||"").replace(/^⚠️\s*/,"").replace(/^✓\s*/,""),i=s.firstElementChild;if(!i)return;let l=i.querySelector(".toast-icon-slot")||i.querySelector("span"),d=i.querySelector(".toast-msg-slot")||document.getElementById(t+"-text")||document.getElementById(t+"-msg");if(r==="loading"?(i.className="bg-white/95 backdrop-blur-md text-ink px-3.5 py-2.5 rounded-2xl shadow-lg border border-blush-200 flex items-center gap-2.5 transition-all",l&&(l.className="toast-icon-slot w-5 h-5 rounded-full bg-blush-100 text-berry flex items-center justify-center shrink-0",l.innerHTML='<svg class="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="9" opacity="0.25"/><path d="M21 12a9 9 0 0 0-9-9" stroke-linecap="round"/></svg>')):r==="error"?(i.className="bg-rose-50/95 backdrop-blur-md text-rose-800 px-3.5 py-2.5 rounded-2xl shadow-lg border border-rose-200 flex items-center gap-2.5 transition-all",l&&(l.className="toast-icon-slot w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0",l.innerHTML='<svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>')):(i.className="bg-white/95 backdrop-blur-md text-ink px-3.5 py-2.5 rounded-2xl shadow-lg border border-emerald-200 flex items-center gap-2.5 transition-all scale-100",l&&(l.className="toast-icon-slot w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 animate-bounce-once",l.innerHTML='<svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>')),d&&(d.className="toast-msg-slot text-xs font-bold truncate",d.textContent=a),s.classList.remove("opacity-0","-translate-y-2","translate-y-4"),clearTimeout(_toastTimers[t]),r!=="loading"){const u=r==="error"?3200:2600;_toastTimers[t]=setTimeout(()=>{s.classList.add("opacity-0",o?"translate-y-4":"-translate-y-2")},u)}}function showAdminToast(t,e){_renderToast("admin-toast",t,e,!1)}function showCustomerToast(t,e){_renderToast("cust-toast",t,e,!1)}function showGlobalToast(t,e){_renderToast("global-toast",t,e,!0)}async function runWithFeedback({lockKey:t,btnEl:e,scope:n="admin",loadingMsg:o="Saving...",successMsg:s="Changes saved successfully!",action:r}){if(t&&_activeSubmitLocks.has(t))return;t&&_activeSubmitLocks.add(t),e&&(e.disabled=!0,e.classList.add("opacity-70","pointer-events-none"));const a=n==="customer"?showCustomerToast:showAdminToast;a(o,"loading");try{const i=await r();return i!==!1&&a(s,"success"),i}catch(i){return a(i?.message||"Could not save changes. Please try again.","error"),!1}finally{t&&_activeSubmitLocks.delete(t),e&&(e.disabled=!1,e.classList.remove("opacity-70","pointer-events-none"))}}let upgradeTargetPkgId=null,upgradeReceiptDataUrl="",upgradeReceiptFileName="";function getPackageTier(t){return t==="pkg-premium"||t==="pkg-royal"?3:t==="pkg-advanced"||t==="pkg-pro"?2:1}function getCurrentPackageObj(){const t=settingsHubState.packages||[],e=settingsHubState.activePackageId||"pkg-basic";return t.find(n=>n.id===e)||t[0]||{id:"pkg-basic",tier:1,name:"Basic",price:3e3,limits:{}}}function getUpgradeDifference(t,e){return Math.max(0,Number(e?.price||0)-Number(t?.price||0))}function hasPackageFeature(t){const e=getCurrentPackageObj(),n=e.tier||getPackageTier(e.id),o=["website","ordering","orders","dashboard","products","payments","businessInfo"],s=["analytics","decorations_5","qr_code","staff_1"],r=["decorations_unlimited","google_business","custom_theme","mystery_box","seo","homepage_ads","staff_5","advanced_permissions","qr_stickers"];return o.includes(t)?!0:s.includes(t)?n>=2:r.includes(t)?n>=3:!0}function showPackageUpgradePrompt(t,e="Higher"){showAdminToast(`${t} requires the ${e} package. Tap Upgrade Plan to unlock.`,"error")}function openUpgradePlanPage(){switchAdminTab("upgrade-plan"),loadSettingsHubFromDb().then(()=>renderUpgradePlanPage()),renderUpgradePlanPage()}function selectUpgradePayMethod(t){const e=document.getElementById("upg-pay-method");e&&(e.value=t);const n=document.getElementById("upg-method-cbe"),o=document.getElementById("upg-method-tb");n&&(n.className=t==="CBE"?"p-2.5 rounded-2xl border-2 border-berry bg-blush-50 text-left flex items-center gap-2 transition-all cursor-pointer":"p-2.5 rounded-2xl border border-blush-200 bg-white text-left flex items-center gap-2 transition-all cursor-pointer"),o&&(o.className=t==="Telebirr"?"p-2.5 rounded-2xl border-2 border-berry bg-blush-50 text-left flex items-center gap-2 transition-all cursor-pointer":"p-2.5 rounded-2xl border border-blush-200 bg-white text-left flex items-center gap-2 transition-all cursor-pointer")}function clearUpgradeReceiptPreview(){upgradeReceiptDataUrl="",upgradeReceiptFileName="";const t=document.getElementById("upg-pay-receipt");t&&(t.value="");const e=document.getElementById("upg-receipt-label");e&&(e.textContent="Tap to upload receipt (PNG, JPG, PDF)"),document.getElementById("upg-receipt-dropzone")?.classList.remove("hidden");const n=document.getElementById("upg-receipt-preview-box");n&&n.classList.add("hidden");const o=document.getElementById("upg-receipt-preview-img");o&&(o.src="")}function handleUpgradeReceiptUpload(t){const e=t.files&&t.files[0];if(!e)return;upgradeReceiptFileName=e.name;const n=document.getElementById("upg-receipt-label");n&&(n.textContent="\u2713 "+e.name);const o=e.type==="application/pdf"||/\.pdf$/i.test(e.name),s=new FileReader;s.onload=r=>{upgradeReceiptDataUrl=r.target.result;const a=document.getElementById("upg-receipt-dropzone"),i=document.getElementById("upg-receipt-preview-box"),l=document.getElementById("upg-receipt-img-wrap"),d=document.getElementById("upg-receipt-pdf-wrap"),u=document.getElementById("upg-receipt-preview-img"),p=document.getElementById("upg-receipt-preview-name");p&&(p.textContent=e.name),o?(l?.classList.add("hidden"),d?.classList.remove("hidden"),d?.classList.add("flex")):(u&&(u.src=upgradeReceiptDataUrl),l?.classList.remove("hidden"),d?.classList.add("hidden"),d?.classList.remove("flex")),a?.classList.add("hidden"),i?.classList.remove("hidden")},s.readAsDataURL(e)}function copyUpgradeAccountNumber(t,e){const n=()=>{if(t){const o=t.dataset.origHtml||t.innerHTML;t.dataset.origHtml=o,t.className="px-2.5 py-1.5 rounded-xl bg-emerald-500 border border-emerald-500 text-white text-[10px] font-extrabold flex items-center gap-1 transition-all shrink-0 shadow-xs",t.innerHTML='<svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg><span>Copied!</span>',clearTimeout(t._copyT),t._copyT=setTimeout(()=>{t.className="px-2.5 py-1.5 rounded-xl bg-blush-50 hover:bg-blush-100 border border-blush-200 text-berry text-[10px] font-extrabold flex items-center gap-1 transition-all cursor-pointer shrink-0",t.innerHTML=o},2200)}typeof showAdminToast=="function"&&showAdminToast("Copied "+e+"!","success")};navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(String(e)).then(n).catch(()=>{fallbackCopyText(String(e)),n()}):(fallbackCopyText(String(e)),n())}function fallbackCopyText(t){try{const e=document.createElement("textarea");e.value=t,e.style.position="fixed",e.style.opacity="0",document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e)}catch{}}function openUpgradeConfirmModal(t){const e=getCurrentPackageObj(),n=(settingsHubState.packages||[]).find(a=>a.id===t);if(!n)return;upgradeTargetPkgId=n.id,upgradeReceiptDataUrl="",upgradeReceiptFileName="";const o=getUpgradeDifference(e,n);document.getElementById("upg-modal-form-view")?.classList.remove("hidden"),document.getElementById("upg-modal-thankyou-view")?.classList.add("hidden"),document.getElementById("upg-modal-congrats-view")?.classList.add("hidden");const s=document.getElementById("upg-modal-pkg-sub");s&&(s.textContent=`${e.name} \u2192 ${n.name} Upgrade`),document.getElementById("upg-calc-current")&&(document.getElementById("upg-calc-current").textContent=`${e.name} (${Number(e.price).toLocaleString()} ETB)`),document.getElementById("upg-calc-target")&&(document.getElementById("upg-calc-target").textContent=`${n.name} (${Number(n.price).toLocaleString()} ETB)`),document.getElementById("upg-calc-diff")&&(document.getElementById("upg-calc-diff").textContent=`${o.toLocaleString()} ETB`),clearUpgradeReceiptPreview();const r=document.getElementById("upg-modal-accounts");if(r){const a=settingsHubState.payments||shopMgmtState?.payments||{},i=a.cbe?.accountNumber||SHOP_SETTINGS_CONFIG.cbeAccount,l=a.telebirr?.accountNumber||SHOP_SETTINGS_CONFIG.telebirrNumber;r.innerHTML=`
          <div class="flex items-center justify-between gap-2 p-2 rounded-xl bg-white border border-blush-200/80">
            <div class="min-w-0">
              <div class="text-[10px] font-bold text-ink-muted">CBE \u2022 ${a.cbe?.accountHolder||"MAK Cake Artisanal Bakery"}</div>
              <div class="text-xs font-mono font-extrabold text-ink select-all">${i}</div>
            </div>
            <button type="button" onclick="copyUpgradeAccountNumber(this, '${i}')" class="px-2.5 py-1.5 rounded-xl bg-blush-50 hover:bg-blush-100 border border-blush-200 text-berry text-[10px] font-extrabold flex items-center gap-1 transition-all cursor-pointer shrink-0">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              <span>Copy</span>
            </button>
          </div>
          <div class="flex items-center justify-between gap-2 p-2 rounded-xl bg-white border border-blush-200/80">
            <div class="min-w-0">
              <div class="text-[10px] font-bold text-ink-muted">Telebirr \u2022 ${a.telebirr?.accountHolder||"MAK Cake Bakery"}</div>
              <div class="text-xs font-mono font-extrabold text-ink select-all">${l}</div>
            </div>
            <button type="button" onclick="copyUpgradeAccountNumber(this, '${l}')" class="px-2.5 py-1.5 rounded-xl bg-blush-50 hover:bg-blush-100 border border-blush-200 text-berry text-[10px] font-extrabold flex items-center gap-1 transition-all cursor-pointer shrink-0">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              <span>Copy</span>
            </button>
          </div>
        `}selectUpgradePayMethod("CBE"),document.getElementById("upg-modal-backdrop")?.classList.remove("hidden"),document.getElementById("upg-confirm-modal")?.classList.remove("hidden")}function closeUpgradeConfirmModal(){document.getElementById("upg-modal-backdrop")?.classList.add("hidden"),document.getElementById("upg-confirm-modal")?.classList.add("hidden")}async function submitPackageUpgradeRequest(){const t=document.getElementById("upg-pay-method")?.value||"CBE",e=document.getElementById("upg-submit-btn");if(!upgradeReceiptDataUrl){showAdminToast("Please upload your payment receipt (image or PDF).","error");return}await runWithFeedback({lockKey:"submit-upgrade-request",btnEl:e,scope:"admin",loadingMsg:"Submitting payment receipt...",successMsg:"Submitted successfully!",action:async()=>{const n=await fetch("/api/admin/upgrade-request",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({targetPackageId:upgradeTargetPkgId,paymentMethod:t,receiptImg:upgradeReceiptDataUrl,receiptName:upgradeReceiptFileName})}),o=await n.json();if(!n.ok||!o.success)throw new Error(o.error||"Could not submit upgrade request.");return settingsHubState.pendingUpgradeRequest=o.pendingUpgradeRequest,document.getElementById("upg-modal-form-view")?.classList.add("hidden"),document.getElementById("upg-modal-congrats-view")?.classList.add("hidden"),document.getElementById("upg-modal-thankyou-view")?.classList.remove("hidden"),document.getElementById("upg-ty-pkg")&&(document.getElementById("upg-ty-pkg").textContent=o.pendingUpgradeRequest.targetPackageName),document.getElementById("upg-ty-amt")&&(document.getElementById("upg-ty-amt").textContent=Number(o.pendingUpgradeRequest.amount).toLocaleString()+" ETB"),renderUpgradePlanPage(),!0}})}async function verifyPendingUpgradePayment(t="approve"){await runWithFeedback({lockKey:"verify-upgrade-payment",scope:"admin",loadingMsg:t==="approve"?"Approving payment & activating plan...":"Updating status...",successMsg:t==="approve"?"Changes saved successfully!":"Upgrade request marked Rejected.",action:async()=>{const e=await fetch("/api/admin/upgrade-verify",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:t})}),n=await e.json();if(!e.ok||!n.success)throw new Error(n.error||"Verification failed.");return await loadSettingsHubFromDb(),renderUpgradePlanPage(),n.status==="Approved"&&(document.getElementById("upg-modal-form-view")?.classList.add("hidden"),document.getElementById("upg-modal-thankyou-view")?.classList.add("hidden"),document.getElementById("upg-modal-congrats-view")?.classList.remove("hidden"),document.getElementById("upg-congrats-pkg-line")&&(document.getElementById("upg-congrats-pkg-line").textContent=`Active Plan: ${n.targetPackageName||getCurrentPackageObj().name}`),document.getElementById("upg-modal-backdrop")?.classList.remove("hidden"),document.getElementById("upg-confirm-modal")?.classList.remove("hidden")),!0}})}async function cancelPendingUpgradePayment(){await fetch("/api/admin/upgrade-cancel",{method:"POST"}),settingsHubState.pendingUpgradeRequest=null,renderUpgradePlanPage(),showAdminToast("Upgrade request cleared")}function renderUpgradePlanPage(){const t=getCurrentPackageObj(),e=t.tier||getPackageTier(t.id),n=document.getElementById("upg-current-badge");n&&(n.textContent="Current: "+t.name);const o=document.getElementById("drawer-current-plan-sub");o&&(o.textContent="Current: "+t.name);const s=document.getElementById("upg-cards-container");if(!s)return;const r=settingsHubState.pendingUpgradeRequest;let a="";r&&(r.status==="Under Review"||r.status==="Pending Verification"?a=`
            <div class="bg-amber-50 border border-amber-200 rounded-[22px] p-3.5 space-y-2">
              <div class="flex items-center justify-between gap-2">
                <div class="text-xs font-extrabold text-amber-900">Upgrade Request: ${r.targetPackageName}</div>
                <span class="px-2.5 py-0.5 rounded-full bg-amber-200/80 text-amber-900 text-[9px] font-extrabold">Under Review</span>
              </div>
              <p class="text-[10.5px] text-amber-800">
                Submitted <strong>${Number(r.amount).toLocaleString()} ETB</strong> via ${r.paymentMethod}. Your current <strong>${t.name}</strong> plan stays active while under review.
              </p>
              <div class="flex items-center gap-1.5 pt-0.5">
                <button type="button" onclick="verifyPendingUpgradePayment('approve')" class="flex-1 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[10.5px] font-extrabold shadow-xs cursor-pointer">Approve</button>
                <button type="button" onclick="verifyPendingUpgradePayment('reject')" class="px-3 py-2 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[10.5px] font-bold cursor-pointer">Reject</button>
                <button type="button" onclick="cancelPendingUpgradePayment()" class="px-2.5 py-2 rounded-full bg-white border border-amber-200 text-amber-900 text-[10.5px] font-bold cursor-pointer">Cancel</button>
              </div>
            </div>`:r.status==="Rejected"&&(a=`
            <div class="bg-rose-50 border border-rose-200 rounded-[22px] p-3.5 space-y-2">
              <div class="flex items-center justify-between gap-2">
                <div class="text-xs font-extrabold text-rose-800">Upgrade Payment Rejected</div>
                <span class="px-2.5 py-0.5 rounded-full bg-rose-200 text-rose-800 text-[9px] font-extrabold">Rejected</span>
              </div>
              <p class="text-[10.5px] text-rose-700">${r.rejectReason||"Receipt could not be verified. Please upload a valid receipt."}</p>
              <button type="button" onclick="openUpgradeConfirmModal('${r.targetPackageId}')" class="w-full py-2 rounded-full btn-berry text-white text-[11px] font-extrabold cursor-pointer">Re-submit Payment Receipt</button>
            </div>`));const l=(settingsHubState.packages||[]).map(d=>{const u=d.tier||getPackageTier(d.id),p=d.id===t.id,m=u<e,g=u>e,f=getUpgradeDifference(t,d);let b="";if(p?b='<button type="button" disabled class="w-full py-2.5 rounded-full bg-blush-100 border border-berry/30 text-berry text-xs font-extrabold opacity-80 cursor-not-allowed">Current Plan</button>':m?b='<button type="button" disabled class="w-full py-2.5 rounded-full bg-stone-100 border border-stone-200 text-stone-500 text-xs font-bold cursor-not-allowed">Included in Current Plan</button>':g&&(b=`<button type="button" onclick="openUpgradeConfirmModal('${d.id}')" class="w-full py-2.5 rounded-full btn-berry text-white text-xs font-extrabold shadow-rose-sm active:scale-95 transition-all cursor-pointer">Upgrade (${f.toLocaleString()} ETB) &rarr;</button>`),d.id==="pkg-premium"){const k=p?'<button type="button" disabled class="w-full py-2.5 rounded-full bg-white/80 border border-berry/30 text-berry text-xs font-extrabold cursor-not-allowed">Current Plan</button>':`<button type="button" onclick="openUpgradeConfirmModal('${d.id}')" class="w-full py-3 rounded-full bg-gradient-to-r from-[#C91254] via-[#E11D62] to-[#EC4899] hover:opacity-95 text-white text-xs font-extrabold shadow-rose-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-amber-200" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/></svg>
                <span>Upgrade to Premium (${f.toLocaleString()} ETB) &rarr;</span>
              </button>`;return`
            <div class="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[#FFF6F9] via-white to-[#FDE7F0] shadow-rose-md border-2 ${p?"border-berry ring-2 ring-berry/20":"border-berry/45"}">
              <div class="bg-gradient-to-r from-[#C91254] via-[#E11D62] to-[#EC4899] px-4 py-1.5 flex items-center justify-between text-white">
                <div class="flex items-center gap-1.5 text-[9.5px] font-extrabold uppercase tracking-wider">
                  <svg class="w-3.5 h-3.5 text-amber-200" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/></svg>
                  <span>Full Digital Growth Suite</span>
                </div>
                ${p?'<span class="px-2 py-0.5 rounded-full bg-white text-berry text-[8.5px] font-black">CURRENT PLAN</span>':'<span class="px-2 py-0.5 rounded-full bg-white/20 text-white text-[8.5px] font-extrabold">ALL FEATURES</span>'}
              </div>

              <div class="p-4 space-y-3">
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <h3 class="font-serif text-[17px] font-extrabold text-ink leading-tight">${d.name}</h3>
                    <p class="text-[10.5px] text-ink-muted mt-0.5 leading-snug">${d.tagline||""}</p>
                  </div>
                  <div class="text-right shrink-0 bg-white/90 px-2.5 py-1.5 rounded-2xl border border-blush-200 shadow-2xs">
                    <div class="text-base font-black text-berry leading-none">${Number(d.price).toLocaleString()} <span class="text-[10px]">ETB</span></div>
                    <div class="text-[8.5px] font-bold text-ink-muted mt-0.5">${g?"Pay "+f.toLocaleString()+" ETB diff":d.billing||"One-time setup"}</div>
                  </div>
                </div>

                <div class="text-[10.5px] font-extrabold text-berry pt-1.5 border-t border-berry/15">${d.includesPrefix||"Everything in Advanced, plus:"}</div>

                <ul class="space-y-1.5">
                  ${(d.features||[]).map(C=>`
                    <li class="flex items-start gap-2 text-[11px] text-ink font-medium">
                      <span class="w-4 h-4 rounded-full bg-gradient-to-br from-berry to-berry-dark text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                      <span class="leading-snug">${C}</span>
                    </li>
                  `).join("")}
                </ul>

                <div class="pt-1">${k}</div>
              </div>
            </div>
          `}return`
          <div class="bg-white rounded-[24px] p-4 shadow-rose-sm border ${p?"border-2 border-berry ring-2 ring-berry/15":"border-blush-200/80"} space-y-3">
            <div class="flex items-start justify-between gap-2">
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="text-sm font-black text-ink">${d.name}</h3>
                  ${p?'<span class="px-2 py-0.5 rounded-full bg-berry text-white text-[9px] font-extrabold tracking-wide">CURRENT PLAN</span>':""}
                </div>
                <p class="text-[10.5px] text-ink-muted mt-0.5 leading-snug">${d.tagline||""}</p>
              </div>
              <div class="text-right shrink-0">
                <div class="text-base font-black text-berry">${Number(d.price).toLocaleString()} <span class="text-[10px]">ETB</span></div>
                <div class="text-[9px] font-semibold text-ink-muted">${g?"Pay "+f.toLocaleString()+" ETB diff":d.billing||"One-time setup"}</div>
              </div>
            </div>

            ${d.includesPrefix?`<div class="text-[10.5px] font-extrabold text-berry pt-1 border-t border-blush-100">${d.includesPrefix}</div>`:'<div class="border-t border-blush-100"></div>'}

            <ul class="space-y-1.5">
              ${(d.features||[]).map(k=>`
                <li class="flex items-start gap-2 text-[11px] ${p||m?"text-ink font-semibold":"text-ink-muted"}">
                  <span class="w-4 h-4 rounded-full ${p||m?"bg-emerald-500 text-white":"bg-blush-100 text-berry"} flex items-center justify-center shrink-0 mt-0.5">
                    <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span class="leading-snug">${k}</span>
                </li>
              `).join("")}
            </ul>

            <div class="pt-1">${b}</div>
          </div>
        `}).join("");s.innerHTML=a+l}function initGlobalRubberBanding(){return;function a(x,E=64){return x<=0?0:(1-1/(x*.42/E+1))*E}function i(x,E=0){if(x===0)E>0?e.style.transition="transform "+E+"ms cubic-bezier(0.25, 1, 0.5, 1)":e.style.transition="none",e.style.transform="",E>0&&setTimeout(()=>{e.style.transform===""&&(e.style.transition="",e.style.willChange="auto")},E+50);else{e.style.willChange="transform",e.style.transition="none";const B=1+Math.min(x/3200,.022);e.style.transformOrigin="center top",e.style.transform="translateY("+x.toFixed(2)+"px) scaleY("+B.toFixed(4)+")"}}function l(x){if(!(!n||r))if(x>3){n.style.transition="none";const E=Math.min(1,Math.max(0,(x-3)/18));n.style.opacity=E.toFixed(2);const B=Math.min(x,42);if(n.style.transform="translateY("+B.toFixed(1)+"px)",o){const $=.85+.15*Math.min(1,x/24);o.style.transform="scale("+$.toFixed(3)+")"}s&&!s.classList.contains("animate-spin-refresh")&&s.classList.add("animate-spin-refresh")}else n.style.opacity="0",n.style.transform="translateY(0px)",s&&s.classList.remove("animate-spin-refresh")}function d(){r||(r=!0,s&&(s.style.transition="none",s.classList.add("animate-spin-refresh")),i(0,180),n&&(n.style.transition="transform 120ms cubic-bezier(0.22, 1, 0.36, 1)",n.style.transform="translateY(24px)",n.style.opacity="1"),setTimeout(()=>{if(typeof renderAllCustomerViews=="function")try{renderAllCustomerViews()}catch{}n&&(n.style.transition="opacity 130ms cubic-bezier(0.22, 1, 0.36, 1), transform 130ms cubic-bezier(0.22, 1, 0.36, 1)",n.style.opacity="0",n.style.transform="translateY(-8px) scale(0.85)"),setTimeout(()=>{s&&(s.classList.remove("animate-spin-refresh"),s.style.transform=""),o&&(o.style.transform=""),n&&(n.style.transition="",n.style.transform="",n.style.opacity="0"),r=!1},140)},180))}function u(){r||(i(0,160),n&&(n.style.transition="opacity 120ms ease-out, transform 120ms ease-out",n.style.opacity="0",n.style.transform="translateY(-6px) scale(0.85)"),setTimeout(()=>{!r&&n&&(n.style.transition="",n.style.transform="",n.style.opacity="0",s&&(s.classList.remove("animate-spin-refresh"),s.style.transform=""),o&&(o.style.transform=""))},130))}function p(x){return x&&(x===t||t.contains(x))}function k(){if(f){if(f=!1,b&&!r){const x=e.style.transform.match(/translateY\(([-0-9.]+)px\)/);(x?parseFloat(x[1]):0)>=24?d():u()}b=!1,y=!1}}}function highlightMissingRequirement(t,e){const n=typeof t=="string"?document.getElementById(t):t;if(!n)return;n.classList.remove("field-error-round"),n.offsetWidth,n.classList.add("field-error-round");const o=n.closest(".space-y-1")||n.closest('[class*="space-y-1.5"]')||n.closest(".space-y-2")||n.parentElement;if(o){const r=o.querySelector("label");r&&r.classList.add("field-error-label");const a=o.querySelector(".field-error-msg");if(a&&a.remove(),e){const i=document.createElement("div");i.className="field-error-msg",i.innerHTML='<svg class="w-3.5 h-3.5 shrink-0 text-berry" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span>'+e+"</span>",o.appendChild(i)}}const s=()=>{if(n.classList.remove("field-error-round"),o){const r=o.querySelector("label");r&&r.classList.remove("field-error-label");const a=o.querySelector(".field-error-msg");a&&a.remove()}n.removeEventListener("input",s),n.removeEventListener("change",s),n.removeEventListener("click",s)};n.addEventListener("input",s),n.addEventListener("change",s),n.addEventListener("click",s),n.scrollIntoView({behavior:"smooth",block:"center"}),typeof n.focus=="function"&&setTimeout(()=>{try{n.focus()}catch{}},100)}window.highlightMissingRequirement=highlightMissingRequirement;function initApp(){try{loadState();const t=new URLSearchParams(window.location.search),e=(window.location.pathname||"").toLowerCase(),n=t.get("mode")||t.get("view");let o="customer";n==="admin"||e.includes("/admin")||e.endsWith("admin.html")?(o="admin",document.body.classList.add("standalone-app","standalone-admin"),document.title="MAK CAKE Admin \u2014 Bakery Management Portal"):n==="dual"||e.includes("/dual")||e.endsWith("dual.html")?o=window.innerWidth>=900?"dual":"customer":(o="customer",document.body.classList.add("standalone-app","standalone-customer"),document.title="MAK CAKE \u2014 Artisanal Luxury Cakes Addis Ababa"),applyShopSettingsConfigToDom(),loadShopSettingsFromJson(),setWorkspaceMode(o),syncAll(),switchAdminTab("overview"),renderAdminHero(),resetAdminHeroTimer(),initPushNotifications(),initGlobalRubberBanding(),initUniversalKeyboardHandling()}catch(t){console.error("Init error:",t)}setInterval(()=>{if(customerTab==="home"){heroIndex=(heroIndex+1)%HERO_SLIDES.length;try{renderHero()}catch{}}},5500)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",initApp):initApp(),(function(){try{history.replaceState({makRoot:!0},"")}catch{}const e=n=>{if(typeof window[n]=="function"){const o=window[n];window[n]=function(...s){try{history.pushState({makModal:n},"")}catch{}return o.apply(this,s)}}};if(["openOrderSheet","openTrackerSheet","openNotificationsSheet","openContactSheet","openDecorationDetailModal","openDecorationOrderChoice","openCakePickerModal","openCreationModal","openAdminSidebar","openAddCakeSheet","openAddDecorationSheet","openAdminReceiptModal","openUpgradeConfirmModal","openGoogleConnectFlow","openAdminProfileModal","openQuickUploadModal"].forEach(e),typeof window.switchCustomerTab=="function"){const n=window.switchCustomerTab;window.switchCustomerTab=function(o){if(o!=="home"&&customerTab==="home")try{history.pushState({makTab:o},"")}catch{}return n.apply(this,arguments)}}if(typeof window.switchAdminTab=="function"){const n=window.switchAdminTab;window.switchAdminTab=function(o){if(o!=="overview"&&adminTab==="overview")try{history.pushState({makTab:o},"")}catch{}return n.apply(this,arguments)}}window.addEventListener("popstate",n=>{const o=document.getElementById("contact-sheet");if(o&&!o.classList.contains("hidden")&&!o.classList.contains("translate-y-full")){closeContactSheet();return}const s=document.getElementById("notif-sheet");if(s&&!s.classList.contains("hidden")){closeNotificationsSheet();return}const r=document.getElementById("tracker-sheet");if(r&&!r.classList.contains("hidden")){closeTrackerSheet();return}const a=document.getElementById("order-wizard-page");if(a&&!a.classList.contains("hidden")){const k=sheet&&(sheet.mode==="cart"||sheet.mode==="decorations_only")?4:1;sheet&&sheet.step>k?wizardBack():closeOrderSheet();return}const i=document.getElementById("decoration-detail-modal");if(i&&!i.classList.contains("hidden")){closeDecorationDetailModal();return}const l=document.getElementById("dec-choice-modal");if(l&&!l.classList.contains("hidden")){closeDecorationOrderChoice();return}const d=document.getElementById("cake-picker-modal");if(d&&!d.classList.contains("hidden")){closeCakePickerModal();return}const u=document.getElementById("creation-lightbox-modal");if(u&&!u.classList.contains("hidden")){closeCreationModal();return}const p=document.getElementById("admin-sidebar-drawer");if(p&&!p.classList.contains("hidden")){closeAdminSidebar();return}const m=document.getElementById("add-cake-sheet");if(m&&!m.classList.contains("hidden")){closeAddCakeSheet();return}const g=document.getElementById("admin-dec-sheet");if(g&&!g.classList.contains("hidden")){closeAddDecorationSheet();return}const f=document.getElementById("admin-receipt-modal");if(f&&!f.classList.contains("hidden")){closeAdminReceiptModal();return}const b=document.getElementById("upg-confirm-modal");if(b&&!b.classList.contains("hidden")){closeUpgradeConfirmModal();return}const y=document.getElementById("profile-google-oauth-modal");if(y&&!y.classList.contains("hidden")){closeGoogleConnectModal();return}if(customerTab&&customerTab!=="home"){switchCustomerTab("home");return}if(adminTab&&adminTab!=="overview"){switchAdminTab("overview");return}})})();
