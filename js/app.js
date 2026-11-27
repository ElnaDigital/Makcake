const HERO_SLIDES=[{top:"Make Every Moment",script:"Sweeter",sub:"Premium cakes for every occasion",cta:"Explore Cakes",img:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=420&q=75"},{top:"Handcrafted in Bole",script:"Weddings",sub:"Luxury tiered cakes for Addis galas",cta:"View Special",img:"https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=700&q=85"},{top:"Personalize With",script:"Calligraphy",sub:"Custom hand-piped celebration notes",cta:"Customize Now",img:"https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=700&q=85"},{top:"Fresh Daily Addis",script:"Mini Bento",sub:"Same-day chilled delivery in Bole",cta:"Order Bento",img:"https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=700&q=85"}];function setHeroSlide(e){heroIndex=e,renderHero()}let heroSlidesInitialized=!1;function ensureHeroSlideImages(){if(heroSlidesInitialized)return;const e=document.getElementById("hero-slides-images");e&&(HERO_SLIDES.forEach((t,s)=>{if(s===0)return;const n=document.createElement("img");n.setAttribute("data-slide-idx",String(s)),n.width=420,n.height=162,n.loading="lazy",n.decoding="async",n.alt=t.script||"MAK CAKE",n.src=t.img,n.className="hero-slide-layer absolute right-0 top-0 h-full w-[58%] object-cover object-center hero-cake-mask transition-opacity duration-500 ease-in-out opacity-0 pointer-events-none",n.onerror=function(){this.onerror=null,this.src=SVG_CAKE_FALLBACK},e.appendChild(n)}),heroSlidesInitialized=!0)}function renderHero(){ensureHeroSlideImages();const e=HERO_SLIDES[heroIndex]||HERO_SLIDES[0];document.querySelectorAll("#hero-slides-images .hero-slide-layer").forEach(c=>{const i=Number(c.getAttribute("data-slide-idx"))===heroIndex;c.classList.toggle("opacity-100",i),c.classList.toggle("opacity-0",!i)});const s=document.getElementById("hero-slide-top");s&&(s.textContent=e.top);const n=document.getElementById("hero-slide-script");n&&(n.textContent=e.script);const r=document.getElementById("hero-slide-sub");r&&(r.textContent=e.sub);const o=document.getElementById("hero-slide-cta");o&&(o.textContent=e.cta);const u=document.getElementById("hero-dots");u&&(u.innerHTML=HERO_SLIDES.map((c,i)=>`
          <button onclick="setHeroSlide(${i})" aria-label="Slide ${i+1}" class="h-1.5 rounded-full transition-all ${i===heroIndex?"w-4 bg-berry":"w-1.5 bg-white/85"}"></button>
        `).join(""))}function getCategoryCount(e){return!e||e==="All Cakes"||e==="all"?state.cakes.length:e==="Extra Decorations"?state.decorations.filter(t=>t.inStock).length:e==="Bento"?state.cakes.filter(t=>t.category==="Bento"||t.category==="Mini Cakes"||(t.name||"").toLowerCase().includes("bento")).length:e==="Birthday"?state.cakes.filter(t=>t.category==="Birthday Cakes"||t.category==="Birthday"||(t.name||"").toLowerCase().includes("birthday")||t.popular).length:e==="Wedding"?state.cakes.filter(t=>t.category==="Wedding Cakes"||t.category==="Wedding"||(t.name||"").toLowerCase().includes("wedding")||(t.name||"").toLowerCase().includes("tier")).length:e==="Couples"||e==="Cupples"?state.cakes.filter(t=>t.category==="Couples"||t.category==="Cupples"||(t.name||"").toLowerCase().includes("couple")).length:e==="Anniversary"?state.cakes.filter(t=>t.category==="Anniversary"||(t.name||"").toLowerCase().includes("anniversary")).length:e==="Cupcakes"?state.cakes.filter(t=>t.category==="Cupcakes"||t.category==="Cupples"||(t.name||"").toLowerCase().includes("cupcake")).length:e==="Graduation"?state.cakes.filter(t=>t.category==="Graduation"||(t.name||"").toLowerCase().includes("grad")||(t.name||"").toLowerCase().includes("gold")).length:e==="New Year & Holiday"||e==="Holiday"?state.cakes.filter(t=>t.category==="Holiday"||t.category==="New Year & Holiday"||(t.name||"").toLowerCase().includes("holiday")||t.category==="Fasting Cake"||(t.name||"").toLowerCase().includes("celebration")).length:state.cakes.filter(t=>t.category===e).length}function filterCakesByCategory(e,t){return!e||e==="All Cakes"||e==="all"?t:e==="Bento"?t.filter(s=>s.category==="Bento"||s.category==="Mini Cakes"||(s.name||"").toLowerCase().includes("bento")):e==="Birthday"?t.filter(s=>s.category==="Birthday Cakes"||s.category==="Birthday"||(s.name||"").toLowerCase().includes("birthday")||s.popular):e==="Wedding"?t.filter(s=>s.category==="Wedding Cakes"||s.category==="Wedding"||(s.name||"").toLowerCase().includes("wedding")||(s.name||"").toLowerCase().includes("tier")):e==="Couples"||e==="Cupples"?t.filter(s=>s.category==="Couples"||s.category==="Cupples"||(s.name||"").toLowerCase().includes("couple")):e==="Anniversary"?t.filter(s=>s.category==="Anniversary"||(s.name||"").toLowerCase().includes("anniversary")):e==="Cupcakes"?t.filter(s=>s.category==="Cupcakes"||s.category==="Cupples"||(s.name||"").toLowerCase().includes("cupcake")):e==="Graduation"?t.filter(s=>s.category==="Graduation"||(s.name||"").toLowerCase().includes("grad")||(s.name||"").toLowerCase().includes("gold")):e==="New Year & Holiday"||e==="Holiday"?t.filter(s=>s.category==="Holiday"||s.category==="New Year & Holiday"||(s.name||"").toLowerCase().includes("holiday")||s.category==="Fasting Cake"||(s.name||"").toLowerCase().includes("celebration")):t.filter(s=>s.category===e)}function selectHomeCategory(e){activeHomeCat=e,renderHomeCategories(),renderHomePopular()}function renderHomeCategories(){const e=document.getElementById("home-category-strip");e&&(e.innerHTML=CATEGORY_META.map(t=>{const s=activeHomeCat===t.id,n=getCategoryCount(t.id);return`
          <button onclick="selectHomeCategory('${t.id}')" class="shrink-0 w-[78px] h-[78px] rounded-[18px] p-1.5 flex flex-col items-center justify-center transition-all active:scale-95 cursor-pointer ${s?"bg-blush-50/90 border-[1.5px] border-berry shadow-rose-sm":"bg-white border border-blush-200/70 shadow-rose-sm"}">
            <!-- Proportional Rounded-Square Icon -->
            <div class="w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0 transition-all ${s?"bg-berry text-white shadow-rose-sm":"bg-blush-100/90 text-berry border border-blush-200/50"}">
              ${getLuxurySvg(t.svgKey,"w-4 h-4")}
            </div>
            <div class="mt-1 text-center leading-tight w-full px-0.5">
              <div class="text-[9.5px] font-bold text-ink truncate">${t.name||t.id}</div>
              <div class="text-[8.5px] font-semibold text-ink-muted leading-none mt-0.5">(${n})</div>
            </div>
          </button>
        `}).join(""))}function triggerFavoriteArcAnimation(e){if(!e)return;const t=document.querySelector('[data-ctab="favorites"]'),s=document.getElementById("nav-fav-badge")||t;if(!s)return;const n=e.getBoundingClientRect(),r=s.getBoundingClientRect(),o=n.left+n.width/2,u=n.top+n.height/2,c=r.left+r.width/2,i=r.top+r.height/2,a=c-o,h=i-u,x=Math.hypot(a,h),p=Math.max(90,Math.min(240,x*.38+35)),m=Math.min(u,i)-p,l=o+a*.45+(a>=0?35:-35),d=document.createElement("div");d.className="flying-fav-heart-dual",d.innerHTML=`
        <svg class="w-4 h-4 fill-white text-white" viewBox="0 0 24 24">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      `,d.style.left="0px",d.style.top="0px",document.body.appendChild(d);const b=740,f=performance.now();let k=0;function $(g){const v=g-f,w=Math.min(v/b,1),C=w<.5?4*w*w*w:1-Math.pow(-2*w+2,3)/2,E=1-C,B=E*E*o+2*E*C*l+C*C*c,T=E*E*u+2*E*C*m+C*C*i,I=.9+Math.sin(w*Math.PI)*.55,P=Math.sin(w*Math.PI*2)*18;if(d.style.transform=`translate3d(${B-15}px, ${T-15}px, 0) scale(${I}) rotate(${P}deg)`,g-k>55&&w<.92){k=g;const y=document.createElement("div");y.className="fav-sparkle-dual",y.style.left=`${B-3.5}px`,y.style.top=`${T-3.5}px`,y.style.setProperty("--tx",`${(Math.random()-.5)*26}px`),y.style.setProperty("--ty",`${(Math.random()-.5)*26}px`),document.body.appendChild(y),setTimeout(()=>y.remove(),650)}if(w<1)requestAnimationFrame($);else{d.remove(),t&&(t.classList.remove("fav-tab-burst"),t.offsetWidth,t.classList.add("fav-tab-burst"),setTimeout(()=>t.classList.remove("fav-tab-burst"),480));for(let y=0;y<6;y++){const L=y/6*Math.PI*2,A=24+Math.random()*14,S=document.createElement("div");S.className="fav-sparkle-dual",S.style.left=`${c-3.5}px`,S.style.top=`${i-3.5}px`,S.style.setProperty("--tx",`${Math.cos(L)*A}px`),S.style.setProperty("--ty",`${Math.sin(L)*A}px`),document.body.appendChild(S),setTimeout(()=>S.remove(),650)}}}requestAnimationFrame($)}function toggleFavorite(e,t){t&&(t.stopPropagation(),t.preventDefault());const s=state.favorites.indexOf(e),n=s===-1;n?(state.favorites.push(e),showCustomerToast("Saved to Favorites")):(state.favorites.splice(s,1),showCustomerToast("Removed from Favorites")),saveState(),updateCustomerBadges(),invalidateCustomerTabCache("favorites");const r=t?t.currentTarget||t.target&&t.target.closest("button"):null;document.querySelectorAll(`button[data-fav-btn="${e}"]`).forEach(c=>{const i=c.querySelector("svg");i&&(n?(i.setAttribute("fill","currentColor"),i.classList.remove("text-ink"),i.classList.add("text-berry","fill-berry")):(i.setAttribute("fill","none"),i.classList.remove("text-berry","fill-berry"),i.classList.add("text-ink"))),c.classList.remove("animate-fav-pop"),c.offsetWidth,c.classList.add("animate-fav-pop"),setTimeout(()=>c.classList.remove("animate-fav-pop"),400)}),n&&r&&triggerFavoriteArcAnimation(r);const u=document.getElementById("c-tab-favorites");if(u&&!u.classList.contains("hidden")&&!n){const c=r?r.closest("article"):document.getElementById(`cake-card-fav-${e}`);c&&(c.style.transition="transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease",c.style.transform="scale(0.85)",c.style.opacity="0",setTimeout(()=>{c.remove();const i=document.getElementById("favorites-grid");i&&!i.querySelectorAll("article").length&&renderFavoritesTab()},260))}}function renderCakeCard(e,t=0){const s=state.favorites.includes(e.id),n=e.price>=1e4,r=Math.min(t*35,380);return`
        <article id="cake-card-${e.id}" data-cake-id="${e.id}" class="cake-card-animate bg-white rounded-[20px] shadow-rose border border-white overflow-hidden flex flex-col h-full" style="animation-delay: ${r}ms">
          <div class="relative h-[112px] w-full bg-blush-100 overflow-hidden shrink-0 cursor-pointer" onclick="openOrderSheet(${e.id})">
            <img loading="lazy" decoding="async" width="200" height="112" src="${e.img}" alt="${e.name}" class="w-full h-full object-cover ${e.inStock?"":"grayscale opacity-60"}" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
            <button onclick="toggleFavorite(${e.id}, event)" data-fav-btn="${e.id}" aria-label="Favorite ${e.name}" class="fav-action-btn absolute top-2 right-2 w-[26px] h-[26px] rounded-full bg-white/95 shadow-sm flex items-center justify-center active:scale-90 transition-transform cursor-pointer">
              <svg class="fav-heart-icon w-3.5 h-3.5 ${s?"text-berry fill-berry":"text-ink"}" viewBox="0 0 24 24" fill="${s?"currentColor":"none"}" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
            ${e.inStock?"":'<span class="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-full bg-ink/80 text-white text-[9px] font-bold">Sold Out</span>'}
          </div>
          <div class="cake-card-body">
            <h3 onclick="openOrderSheet(${e.id})" class="cake-title-txt cursor-pointer">${e.name}</h3>
            <p class="cake-desc-clamp">${e.desc}</p>
            <div class="cake-rating-row">
              <svg class="w-3 h-3 text-stargold fill-current inline-block" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <span>${e.rating.toFixed(1)} (${e.reviews})</span>
            </div>
            <div class="cake-card-footer">
              <span class="cake-price-txt ${n?"cake-price-lg":""}">${fmtETB(e.price)}</span>
              ${e.inStock?`
                <button onclick="openOrderSheet(${e.id})" class="cake-order-btn">
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
      `}function renderHomePopular(){const e=document.getElementById("home-grid-heading"),t=document.getElementById("home-popular-grid");if(!t)return;let s=state.cakes;if(homeSearch){const n=homeSearch.toLowerCase();s=state.cakes.filter(r=>(r.name||"").toLowerCase().includes(n)||(r.desc||"").toLowerCase().includes(n)||(r.category||"").toLowerCase().includes(n)),e&&(e.textContent=`Search Results (${s.length})`)}else if(activeHomeCat==="Extra Decorations"){const n=state.decorations.filter(c=>!homeSearch||c.name.toLowerCase().includes(homeSearch.toLowerCase())||c.category.toLowerCase().includes(homeSearch.toLowerCase()));e&&(e.textContent=`Extra Decorations (${n.length})`);const r=getDecorationTotals();if(!n.length){t.innerHTML='<div class="col-span-2 bg-white rounded-[22px] p-6 text-center text-xs text-ink-muted shadow-rose">No decorations found.</div>';return}let o="";DECORATION_CATEGORIES.forEach(c=>{const i=n.filter(a=>a.category===c.id);i.length&&(o+=`
            <div class="col-span-2 pt-3 first:pt-0">
              <div class="flex items-center justify-between pb-2 border-b border-blush-200">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-full bg-berry-soft text-berry flex items-center justify-center shadow-2xs shrink-0">
                    ${getLuxurySvg(c.svgKey,"w-3.5 h-3.5")}
                  </div>
                  <div>
                    <h3 class="text-xs font-black text-ink tracking-tight">${c.id}</h3>
                    <p class="text-[9.5px] text-ink-muted">Handcrafted party accents &amp; celebration extras</p>
                  </div>
                </div>
                <span class="text-[10px] font-black text-berry bg-berry-soft px-2.5 py-0.5 rounded-full border border-berry/15">${i.length} ${i.length===1?"Product":"Products"}</span>
              </div>
            </div>
          `,i.forEach((a,h)=>{const x=state.decSelections&&state.decSelections[a.id]||0,p=a.inStock!==!1;o+=`
              <div onclick="handleDecCardClick('${a.id}', event)" class="cake-card-animate transition-all rounded-[22px] p-2.5 flex flex-col justify-between h-[218px] ${p?x>0?"bg-rose-50/45 border-2 border-berry ring-2 ring-berry/35 shadow-rose-sm cursor-pointer":"bg-white border border-white shadow-rose cursor-pointer":"bg-blush-50/70 border border-blush-200 opacity-75 grayscale-[0.25] cursor-not-allowed"}" style="animation-delay: ${h*20}ms">
                <!-- Small category label inside image + status / zoom button -->
                <div class="relative h-28 rounded-[16px] overflow-hidden bg-blush-100 shrink-0 group">
                  <img loading="lazy" decoding="async" width="180" height="120" src="${a.img||SVG_CAKE_FALLBACK}" alt="${a.name}" class="w-full h-full object-cover transition-transform group-hover:scale-105" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
                  <span class="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur text-berry text-[8.5px] font-black shadow-2xs truncate max-w-[70%]">${a.category}</span>
                  
                  ${p?x>0?`
                    <span class="absolute top-2 right-2 px-2 py-0.5 rounded-full btn-berry text-white text-[9px] font-black shadow-xs flex items-center gap-1">
                      <svg class="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                      <span>${x}&times;</span>
                    </span>
                  `:`
                    <button onclick="openDecorationDetailModal('${a.id}'); event.stopPropagation();" title="View decoration detail" class="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 text-berry hover:bg-berry hover:text-white flex items-center justify-center text-[10px] shadow-2xs transition-all">
                      <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    </button>
                  `:`
                    <span class="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-ink/80 text-white text-[8.5px] font-black shadow-2xs uppercase tracking-wider">Sold Out</span>
                  `}
                </div>

                <!-- Clean visual hierarchy: ONLY Product Name below image -->
                <div class="p-1 flex flex-col justify-between flex-1 mt-1">
                  <div class="font-extrabold text-[11.5px] text-ink line-clamp-1 leading-snug" title="${a.name}">${a.name}</div>
                  
                  <!-- Horizontal Footer: Unit Price and Compact Quantity Controls (\u2212 0 +) -->
                  <div class="flex items-center justify-between pt-1.5 border-t border-blush-100 gap-1">
                    <div class="shrink-0">
                      <span class="font-black text-xs text-berry whitespace-nowrap">${fmtETB(a.price)}</span>
                      ${p?"":'<div class="text-[9px] font-bold text-ink-muted">Unavailable</div>'}
                    </div>
                    
                    ${p?`
                      <div class="flex items-center gap-1 shrink-0 bg-blush-50 rounded-full p-0.5 border border-blush-200" onclick="event.stopPropagation()">
                        <button onclick="changeDecQty('${a.id}', -1, event)" aria-label="Decrease quantity" class="w-6 h-6 rounded-full bg-white text-berry hover:bg-berry hover:text-white flex items-center justify-center font-black text-xs shadow-2xs active:scale-90 transition-all ${x===0?"opacity-35 cursor-not-allowed":"cursor-pointer"}">
                          &minus;
                        </button>
                        <span class="w-5 text-center font-extrabold text-xs text-ink select-none">${x}</span>
                        <button onclick="changeDecQty('${a.id}', 1, event)" aria-label="Increase quantity" class="w-6 h-6 rounded-full btn-berry text-white flex items-center justify-center font-black text-xs shadow-2xs active:scale-90 transition-all cursor-pointer">
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
            `}))});const u=r.count>0?`
          <div class="col-span-2 sticky bottom-2 z-20 bg-white rounded-2xl p-3 shadow-rose-lg border border-blush-200 flex items-center justify-between gap-2 mt-2 animate-scaleIn">
            <div class="min-w-0 flex items-center gap-2">
              <button onclick="clearDecSelections()" title="Cancel &amp; Clear Selection" class="w-7 h-7 rounded-full bg-blush-100 hover:bg-rose-100 text-ink-muted hover:text-berry flex items-center justify-center font-bold text-xs active:scale-90 transition-all shrink-0">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
              <div class="min-w-0">
                <div class="text-[11px] font-black text-ink flex items-center gap-1.5">
                  <span class="w-5 h-5 rounded-full btn-berry text-white flex items-center justify-center text-[10px] font-black">${r.count}</span>
                  <span class="truncate">Decorations Selected</span>
                </div>
                <div class="text-[10.5px] font-black text-berry mt-0.5">${fmtETB(r.total)} combined total</div>
              </div>
            </div>
            <button onclick="orderDecorationsWithCake()" class="px-4 py-2 rounded-full btn-berry text-white text-xs font-black shadow-rose-sm active:scale-95 transition-transform flex items-center gap-1 shrink-0">
              <span>Order Now &rarr;</span>
            </button>
          </div>
        `:"";t.innerHTML=o+u;return}else activeHomeCat!=="All Cakes"&&activeHomeCat!=="all"?(s=filterCakesByCategory(activeHomeCat,state.cakes),e&&(e.textContent=`${activeHomeCat} (${s.length})`)):(s=state.cakes.filter(n=>n.popular&&!n.name.includes("Pastel Mini Bento")&&!n.name.includes("Royal Gala")),s.length<4&&(s=state.cakes.slice(0,4)),s.length<4&&(s=state.cakes.slice(0,4)),e&&(e.textContent="Popular Cakes"));if(!s.length){t.innerHTML=`<div class="col-span-2 bg-white rounded-[20px] p-6 text-center text-xs text-ink-muted shadow-rose">No cakes match "${homeSearch||activeHomeCat}".</div>`;return}t.innerHTML=s.map((n,r)=>renderCakeCard(n,r).replace(`id="cake-card-${n.id}"`,`id="cake-card-fav-${n.id}"`)).join("")}function openMenuCategory(e){menuCat=e,switchCustomerTab("menu"),renderMenuTab()}function renderCategoriesTab(){const e=document.getElementById("categories-full-grid");e&&(e.innerHTML=CATEGORY_META.filter(t=>t.id!=="All Cakes").map((t,s)=>{const n=getCategoryCount(t.id),r=s*35;return`
          <button onclick="openMenuCategory('${t.id}')" class="cake-card-animate bg-white rounded-[22px] p-3.5 shadow-rose border border-white flex flex-col items-center text-center gap-2 active:scale-[0.98] transition-transform" style="animation-delay: ${r}ms">
            <div class="w-16 h-16 rounded-2xl bg-blush-100 text-berry flex items-center justify-center shadow-rose-sm">
              ${getLuxurySvg(t.svgKey,"w-8 h-8")}
            </div>
            <div>
              <div class="text-xs font-extrabold text-ink">${t.name||t.id}</div>
              <div class="text-[10.5px] font-semibold text-berry">${n} Cakes &rarr;</div>
            </div>
          </button>
        `}).join(""))}function selectMenuCategory(e){menuCat=e,renderMenuTab()}function renderMenuTab(){const e=document.getElementById("menu-filter-pills");if(e&&(e.innerHTML=CATEGORY_META.map(r=>{const o=menuCat===r.id;return`
            <button onclick="selectMenuCategory('${r.id}')" class="shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${o?"btn-berry text-white shadow-rose-sm":"bg-white text-ink-muted border border-blush-200"}">
              ${getLuxurySvg(r.svgKey,"w-3.5 h-3.5 shrink-0 inline-block mr-1 "+(o?"text-white":"text-berry"))} <span>${r.name||r.id}</span> <span class="text-[10px] opacity-75">(${getCategoryCount(r.id)})</span>
            </button>
          `}).join("")),menuCat==="Extra Decorations"){const r=document.getElementById("menu-cakes-grid");if(typeof hasPackageFeature=="function"&&!hasPackageFeature("decorations")){const a=document.getElementById("menu-count-label");a&&(a.textContent="Extra Decorations (Advanced Package Feature)"),r&&(r.innerHTML=`<div class="col-span-2 bg-white rounded-[20px] p-6 text-center text-xs text-ink-muted shadow-rose space-y-1.5">
              <div class="font-extrabold text-ink">\u{1F512} Extra Decorations Locked</div>
              <div>This feature requires the <strong>Advanced (5,000 ETB)</strong> package or higher.</div>
            </div>`);return}const o=menuSearch.trim().toLowerCase(),u=state.decorations.filter(a=>!o||a.name.toLowerCase().includes(o)||a.category.toLowerCase().includes(o)||a.desc&&a.desc.toLowerCase().includes(o)),c=getDecorationTotals(),i=document.getElementById("menu-count-label");if(i&&(i.textContent=`Showing ${u.length} celebration decorations across ${DECORATION_CATEGORIES.length} categories`),r){if(!u.length){r.innerHTML=`<div class="col-span-2 bg-white rounded-[20px] p-6 text-center text-xs text-ink-muted shadow-rose">No decorations match "${menuSearch}".</div>`;return}let a="";DECORATION_CATEGORIES.forEach(x=>{const p=u.filter(m=>m.category===x.id);p.length&&(a+=`
              <div class="col-span-2 pt-3 first:pt-0">
                <div class="flex items-center justify-between pb-2 border-b border-blush-200">
                  <div class="flex items-center gap-2">
                    <div class="w-7 h-7 rounded-full bg-berry-soft text-berry flex items-center justify-center shadow-2xs shrink-0">
                      ${getLuxurySvg(x.svgKey,"w-3.5 h-3.5")}
                    </div>
                    <div>
                      <h3 class="text-xs font-black text-ink tracking-tight">${x.id}</h3>
                      <p class="text-[9.5px] text-ink-muted">Handcrafted party accents &amp; celebration extras</p>
                    </div>
                  </div>
                  <span class="text-[10px] font-black text-berry bg-berry-soft px-2.5 py-0.5 rounded-full border border-berry/15">${p.length} ${p.length===1?"Product":"Products"}</span>
                </div>
              </div>
            `,p.forEach((m,l)=>{const d=state.decSelections&&state.decSelections[m.id]||0,b=m.inStock!==!1;a+=`
                <div onclick="handleDecCardClick('${m.id}', event)" class="cake-card-animate transition-all rounded-[22px] p-2.5 flex flex-col justify-between h-[218px] ${b?d>0?"bg-rose-50/45 border-2 border-berry ring-2 ring-berry/35 shadow-rose-sm cursor-pointer":"bg-white border border-white shadow-rose cursor-pointer":"bg-blush-50/70 border border-blush-200 opacity-75 grayscale-[0.25] cursor-not-allowed"}" style="animation-delay: ${l*20}ms">
                  <!-- Small category label inside image + status / zoom button -->
                  <div class="relative h-28 rounded-[16px] overflow-hidden bg-blush-100 shrink-0 group">
                    <img src="${m.img||SVG_CAKE_FALLBACK}" alt="${m.name}" class="w-full h-full object-cover transition-transform group-hover:scale-105" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
                    <span class="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur text-berry text-[8.5px] font-black shadow-2xs truncate max-w-[70%]">${m.category}</span>
                    
                    ${b?d>0?`
                      <span class="absolute top-2 right-2 px-2 py-0.5 rounded-full btn-berry text-white text-[8.5px] font-black shadow-2xs">${d}&times;</span>
                    `:`
                      <button onclick="openDecorationDetailModal('${m.id}'); event.stopPropagation();" title="View decoration detail" class="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 text-berry hover:bg-berry hover:text-white flex items-center justify-center text-[10px] shadow-2xs transition-all">
                        <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                      </button>
                    `:`
                      <span class="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-ink/80 text-white text-[8.5px] font-black shadow-2xs uppercase tracking-wider">Sold Out</span>
                    `}
                  </div>

                  <!-- Clean visual hierarchy: ONLY Product Name below image -->
                  <div class="p-1 flex flex-col justify-between flex-1 mt-1">
                    <div class="font-extrabold text-[11.5px] text-ink line-clamp-1 leading-snug" title="${m.name}">${m.name}</div>
                    
                    <!-- Horizontal Footer: Unit Price and Compact Quantity Controls (\u2212 0 +) -->
                    <div class="flex items-center justify-between pt-1.5 border-t border-blush-100 gap-1">
                      <div class="shrink-0">
                        <span class="font-black text-xs text-berry whitespace-nowrap">${fmtETB(m.price)}</span>
                        ${b?"":'<div class="text-[9px] font-bold text-ink-muted">Unavailable</div>'}
                      </div>
                      
                      ${b?`
                        <div class="flex items-center gap-1 shrink-0 bg-blush-50 rounded-full p-0.5 border border-blush-200" onclick="event.stopPropagation()">
                          <button onclick="changeDecQty('${m.id}', -1, event)" aria-label="Decrease quantity" class="w-6 h-6 rounded-full bg-white text-berry hover:bg-berry hover:text-white flex items-center justify-center font-black text-xs shadow-2xs active:scale-90 transition-all ${d===0?"opacity-35 cursor-not-allowed":"cursor-pointer"}">
                            &minus;
                          </button>
                          <span class="w-5 text-center font-extrabold text-xs text-ink select-none">${d}</span>
                          <button onclick="changeDecQty('${m.id}', 1, event)" aria-label="Increase quantity" class="w-6 h-6 rounded-full btn-berry text-white flex items-center justify-center font-black text-xs shadow-2xs active:scale-90 transition-all cursor-pointer">
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
              `}))});const h=c.count>0?`
            <div class="col-span-2 sticky bottom-2 z-20 bg-white rounded-2xl p-3 shadow-rose-lg border border-blush-200 flex items-center justify-between gap-2 mt-2 animate-scaleIn">
              <div class="min-w-0 flex items-center gap-2">
                <button onclick="clearDecSelections()" title="Cancel &amp; Clear Selection" class="w-7 h-7 rounded-full bg-blush-100 hover:bg-rose-100 text-ink-muted hover:text-berry flex items-center justify-center font-bold text-xs active:scale-90 transition-all shrink-0">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
                <div class="min-w-0">
                  <div class="text-[11px] font-black text-ink flex items-center gap-1.5">
                    <span class="w-5 h-5 rounded-full btn-berry text-white flex items-center justify-center text-[10px] font-black">${c.count}</span>
                    <span class="truncate">Decorations Selected</span>
                  </div>
                  <div class="text-[10.5px] font-black text-berry mt-0.5">${fmtETB(c.total)} combined total</div>
                </div>
              </div>
              <button onclick="orderDecorationsWithCake()" class="px-4 py-2 rounded-full btn-berry text-white text-xs font-black shadow-rose-sm active:scale-95 transition-transform flex items-center gap-1 shrink-0">
                <span>Order Now &rarr;</span>
              </button>
            </div>
          `:"";r.innerHTML=a+h}return}let t=[...state.cakes];if(menuCat!=="All Cakes"&&menuCat!=="all"&&(t=filterCakesByCategory(menuCat,t)),menuSearch.trim()){const r=menuSearch.trim().toLowerCase();t=t.filter(o=>(o.name||"").toLowerCase().includes(r)||(o.desc||"").toLowerCase().includes(r))}menuSort==="price-asc"?t.sort((r,o)=>r.price-o.price):menuSort==="price-desc"?t.sort((r,o)=>o.price-r.price):menuSort==="rating"&&t.sort((r,o)=>o.rating-r.rating);const s=document.getElementById("menu-count-label");s&&(s.textContent=`Showing ${t.length} handcrafted cakes`);const n=document.getElementById("menu-cakes-grid");if(n){if(!t.length){n.innerHTML='<div class="col-span-2 bg-white rounded-[20px] p-6 text-center text-xs text-ink-muted shadow-rose">No cakes found.</div>';return}n.innerHTML=t.map((r,o)=>renderCakeCard(r,o)).join("")}}function renderFavoritesTab(){const e=document.getElementById("favorites-grid");if(!e)return;const t=state.cakes.filter(s=>state.favorites.includes(s.id));if(!t.length){e.innerHTML=`
          <div class="col-span-2 bg-white rounded-[22px] p-7 text-center shadow-rose space-y-2">
            <div class="w-16 h-16 rounded-full bg-blush-100 text-berry/70 flex items-center justify-center mx-auto mb-2"><svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg></div>
            <div class="text-xs font-extrabold text-ink">No Favorites Saved Yet</div>
            <p class="text-[11px] text-ink-muted">Tap the heart on any cake to save it here.</p>
            <button onclick="switchCustomerTab('menu')" class="mt-1 px-4 py-2 rounded-full btn-berry text-white text-xs font-bold">Explore Menu</button>
          </div>
        `;return}e.innerHTML=t.map((s,n)=>renderCakeCard(s,n)).join("")}function updateCartQty(e,t){const s=state.cart.findIndex(n=>n.id===e);s!==-1&&(state.cart[s].qty+=t,state.cart[s].qty<=0&&state.cart.splice(s,1),saveState(),updateCustomerBadges(),customerTab==="cart"?renderCartTab():invalidateCustomerTabCache("cart"))}function clearCart(){state.cart=[],saveState(),updateCustomerBadges(),customerTab==="cart"?renderCartTab():invalidateCustomerTabCache("cart"),showCustomerToast("Cart cleared")}function renderCartTab(){const e=document.getElementById("cart-items-list"),t=document.getElementById("cart-summary-box"),s=document.getElementById("cart-clear-btn");if(!e)return;if(!state.cart.length){e.innerHTML=`
          <div class="bg-white rounded-[22px] p-7 text-center shadow-rose space-y-2">
            <div class="w-16 h-16 rounded-full bg-blush-100 text-berry/70 flex items-center justify-center mx-auto mb-2"><svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg></div>
            <div class="text-xs font-extrabold text-ink">Your Cake Cart is Empty</div>
            <p class="text-[11px] text-ink-muted">Choose a handcrafted cake from Bole Kitchen.</p>
            <button onclick="switchCustomerTab('home')" class="mt-1 px-4 py-2 rounded-full btn-berry text-white text-xs font-bold">Browse Cakes</button>
          </div>
        `,t.classList.add("hidden"),s.classList.add("hidden");return}s.classList.remove("hidden"),t.classList.remove("hidden");const n=state.cart.reduce((o,u)=>o+u.unitPrice*u.qty,0),r=state.shop.deliveryFee;document.getElementById("cart-subtotal-txt").textContent=fmtETB(n),document.getElementById("cart-delivery-txt").textContent=fmtETB(r),document.getElementById("cart-total-txt").textContent=fmtETB(n+r),e.innerHTML=state.cart.map(o=>`
        <div class="bg-white rounded-[18px] p-3 shadow-rose-sm border border-white flex items-center gap-3">
          <img loading="lazy" decoding="async" width="56" height="56" src="${o.img}" alt="${o.name}" class="w-14 h-14 rounded-xl object-cover shrink-0" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
          <div class="min-w-0 flex-1">
            <div class="text-xs font-extrabold text-ink truncate">${o.name}</div>
            <div class="text-[10.5px] text-ink-muted truncate">${o.size} \u2022 ${o.flavor}</div>
            <div class="text-xs font-extrabold text-berry mt-1">${fmtETB(o.unitPrice*o.qty)}</div>
          </div>
          <div class="flex items-center gap-1.5 bg-blush-100 rounded-full p-1 shrink-0">
            <button onclick="updateCartQty('${o.id}', -1)" class="w-6 h-6 rounded-full bg-white text-ink font-extrabold text-xs shadow-xs">\u2212</button>
            <span class="text-xs font-extrabold w-4 text-center">${o.qty}</span>
            <button onclick="updateCartQty('${o.id}', 1)" class="w-6 h-6 rounded-full btn-berry text-white font-extrabold text-xs shadow-xs">+</button>
          </div>
        </div>
      `).join("")}const WIZARD_META={1:{title:"Cake Size & Flavor"},2:{title:"Make It Extra Special"},3:{title:"Chef Calligraphy Note"},4:{title:"Delivery & Contact"},5:{title:"Payment Plan & Receipt"},6:{title:"Review & Submit Order"}};function getDecorationTotals(e=null){const t=e!==null?e:state.decSelections||{};let s=0,n=0;const r=[];for(const[o,u]of Object.entries(t)){const c=Number(u)||0;if(c>0){const i=state.decorations.find(a=>a.id===o);if(i){const a=i.price*c;s+=c,n+=a,r.push({id:i.id,name:i.name,category:i.category,price:i.price,qty:c,subtotal:a,img:i.img,requiresNumber:i.requiresNumber||i.name.toLowerCase().includes("number")||i.name.toLowerCase().includes("balloon")})}}}return{count:s,total:n,items:r}}let currentDetailDecId=null,detailDecQty=1;function openDecorationDetailModal(e){const t=state.decorations.find(a=>a.id===e);if(!t)return;currentDetailDecId=e;const s=state.decSelections&&state.decSelections[e]||0;detailDecQty=s>0?s:1;const n=document.getElementById("dec-modal-cat"),r=document.getElementById("dec-modal-img"),o=document.getElementById("dec-modal-title"),u=document.getElementById("dec-modal-price"),c=document.getElementById("dec-modal-desc");n&&(n.textContent=t.category),r&&(r.src=t.img||SVG_CAKE_FALLBACK),o&&(o.textContent=t.name),u&&(u.textContent=`${fmtETB(t.price)} each`),c&&(c.textContent=t.desc||"Handpicked celebration extra from MAK CAKE bakery collection. Perfect complement for handcrafted birthday and celebration cakes."),updateDecModalQtyUI();const i=document.getElementById("decoration-detail-modal");i&&i.classList.remove("hidden")}function updateDecModalQtyUI(){const e=state.decorations.find(r=>r.id===currentDetailDecId),t=document.getElementById("dec-modal-qty"),s=document.getElementById("dec-modal-subtotal"),n=document.getElementById("dec-modal-confirm-btn");t&&(t.textContent=detailDecQty),e&&s&&(s.textContent=`Subtotal: ${fmtETB(e.price*detailDecQty)}`),n&&(n.innerHTML=`<span>Save &amp; Select ${detailDecQty}&times; (${e?fmtETB(e.price*detailDecQty):""})</span>`)}function adjustDecModalQty(e){detailDecQty=Math.max(1,detailDecQty+e),updateDecModalQtyUI()}function confirmDecModalSelection(){if(!currentDetailDecId)return;state.decSelections=state.decSelections||{},state.decSelections[currentDetailDecId]=detailDecQty,typeof sheet<"u"&&sheet&&(sheet.decQuantities={...state.decSelections},sheet.addons=Object.keys(state.decSelections).filter(n=>state.decSelections[n]>0)),saveState(),closeDecorationDetailModal();const e=document.getElementById("customer-scroll-area"),t=e?e.scrollTop:0;menuCat==="Extra Decorations"&&renderMenuTab(),activeHomeCat==="Extra Decorations"&&renderHomePopular(),e&&t>0&&(e.scrollTop=t);const s=document.getElementById("order-wizard-page");if(s&&!s.classList.contains("hidden")&&typeof sheet<"u"&&sheet&&sheet.step){const n=document.getElementById("order-sheet-body"),r=n?n.scrollTop:0;renderOrderSheet(),n&&r>0&&(n.scrollTop=r)}showCustomerToast(`\u2728 Saved ${detailDecQty}\xD7 decoration selection`)}function closeDecorationDetailModal(){const e=document.getElementById("decoration-detail-modal");e&&e.classList.add("hidden"),currentDetailDecId=null}function handleDecCardClick(e,t){if(t&&t.target&&(t.target.tagName==="BUTTON"||t.target.closest("button")))return;const s=state.decorations.find(r=>r.id===e);if(!s)return;if(s.inStock===!1){showCustomerToast(`"${s.name}" is currently Sold Out`);return}(state.decSelections&&state.decSelections[e]||0)===0?(changeDecQty(e,1,t),showCustomerToast("\u2728 Added to celebration decorations")):openDecorationDetailModal(e)}function changeDecQty(e,t,s){s&&(s.stopPropagation(),s.preventDefault&&s.target&&s.target.tagName==="BUTTON"&&s.preventDefault());const n=state.decorations.find(a=>a.id===e);if(n&&n.inStock===!1&&t>0){showCustomerToast(`"${n.name}" is currently Sold Out`);return}state.decSelections=state.decSelections||{};const r=Number(state.decSelections[e])||0,o=Math.max(0,r+t);o===0?delete state.decSelections[e]:state.decSelections[e]=o,typeof sheet<"u"&&sheet&&(sheet.decQuantities={...state.decSelections},sheet.addons=Object.keys(state.decSelections).filter(a=>state.decSelections[a]>0)),saveState();const u=document.getElementById("customer-scroll-area"),c=u?u.scrollTop:0;menuCat==="Extra Decorations"&&renderMenuTab(),activeHomeCat==="Extra Decorations"&&renderHomePopular(),u&&c>0&&(u.scrollTop=c);const i=document.getElementById("order-wizard-page");if(i&&!i.classList.contains("hidden")&&typeof sheet<"u"&&sheet&&sheet.step){const a=document.getElementById("order-sheet-body"),h=a?a.scrollTop:0;renderOrderSheet(),a&&h>0&&(a.scrollTop=h)}}function openCakePickerModal(){const e=getDecorationTotals(state.decSelections),t=document.getElementById("cake-picker-sub");t&&(t.textContent=`\u2728 ${e.count} decoration${e.count!==1?"s":""} (${fmtETB(e.total)}) will be added`);const s=document.getElementById("cake-picker-list");s&&(s.innerHTML=state.cakes.map(r=>`
          <div onclick="selectCakeForDecorations('${r.id}')" class="bg-blush-50 hover:bg-rose-50 border border-blush-200 hover:border-berry p-2.5 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-all active:scale-[0.98]">
            <div class="flex items-center gap-2.5 min-w-0">
              <img src="${r.img||SVG_CAKE_FALLBACK}" alt="${r.name}" class="w-12 h-12 rounded-xl object-cover shrink-0" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
              <div class="min-w-0">
                <div class="text-xs font-bold text-ink truncate">${r.name}</div>
                <div class="text-[10px] text-ink-muted line-clamp-1">${r.desc}</div>
                <div class="text-[10px] font-black text-berry mt-0.5">Base: ${fmtETB(r.price)}</div>
              </div>
            </div>
            <button class="px-3 py-1.5 rounded-full btn-berry text-white text-[10.5px] font-bold shrink-0 shadow-2xs">
              Select &rarr;
            </button>
          </div>
        `).join(""));const n=document.getElementById("cake-picker-modal");n&&n.classList.remove("hidden")}function closeCakePickerModal(){const e=document.getElementById("cake-picker-modal");e&&e.classList.add("hidden")}function selectCakeForDecorations(e){closeCakePickerModal();const t=state.cakes.find(n=>n.id===e||String(n.id)===String(e));if(!t)return;openOrderSheet(t),sheet.step=2,sheet.decChoice="add",renderOrderSheet();const s=getDecorationTotals(sheet.decQuantities);showCustomerToast(`\u2728 ${s.count} decorations paired with ${t.name}!`)}function clearDecSelections(){state.decSelections={},typeof sheet<"u"&&sheet&&(sheet.decQuantities={},sheet.addons=[]),saveState(),activeHomeCat==="Extra Decorations"&&renderHomePopular(),menuCat==="Extra Decorations"&&renderMenuTab();const e=document.getElementById("order-wizard-page");e&&!e.classList.contains("hidden")&&typeof sheet<"u"&&sheet&&sheet.step&&renderOrderSheet(),showCustomerToast("Decoration selection cleared")}function openDecorationOrderChoice(){const e=getDecorationTotals(state.decSelections);if(e.count===0){showCustomerToast("Please select at least 1 decoration");return}const t=document.getElementById("dec-choice-sub");t&&(t.textContent=`${e.count} decoration${e.count!==1?"s":""} selected (${fmtETB(e.total)})`);const s=document.getElementById("dec-choice-modal");s&&s.classList.remove("hidden")}function closeDecorationOrderChoice(){const e=document.getElementById("dec-choice-modal");e&&e.classList.add("hidden")}function openCakePickerModalFromChoice(){closeDecorationOrderChoice(),openCakePickerModal()}function orderDecorationsWithCake(){openDecorationOrderChoice()}function openDecorationQuickOrder(e){changeDecQty(e,1),openDecorationOrderChoice()}function orderDecorationsOnly(){closeDecorationOrderChoice(),closeCakePickerModal();const e=getDecorationTotals(state.decSelections);if(e.count===0){showCustomerToast("Please select at least 1 decoration");return}sheet={step:4,mode:"decorations_only",cake:null,size:"Party Pack",flavor:"Decorations Only",decChoice:"add",decQuantities:{...state.decSelections||{}},addons:Object.keys(state.decSelections||{}).filter(t=>state.decSelections[t]>0),candleNumber:"",inscription:"",fulfillment:"delivery",name:typeof sheet<"u"&&sheet&&sheet.name?sheet.name:"",phone:typeof sheet<"u"&&sheet&&sheet.phone?sheet.phone:"",address:typeof sheet<"u"&&sheet&&sheet.address?sheet.address:"",dateOption:"tomorrow",datePickerOpen:!1,date:tomorrowStr(),dateLabel:"Tomorrow",timeSlot:TIME_SLOTS[1],paymentPlan:"full",paymentMethod:"Telebirr",receiptImg:"",receiptName:"",errors:{}},document.getElementById("order-wizard-page").classList.remove("hidden"),renderOrderSheet(),showCustomerToast(`\u2728 Proceeding to checkout with ${e.count} decorations!`)}function openOrderSheet(e){closeContactSheet(),closeNotificationsSheet(),closeTrackerSheet();let t=null;typeof e=="object"&&e!==null?t=e:t=state.cakes.find(s=>s.id===e||String(s.id)===String(e)),t&&(sheet={step:1,mode:"single",cake:t,size:SIZES[0].id,flavor:FLAVORS[0],decChoice:Object.keys(state.decSelections||{}).length?"add":null,decQuantities:{...state.decSelections||{}},addons:Object.keys(state.decSelections||{}).filter(s=>state.decSelections[s]>0),candleNumber:"",inscription:sheet.inscription||"",fulfillment:"delivery",name:sheet.name||"",phone:sheet.phone||"",address:sheet.address||"",dateOption:"tomorrow",datePickerOpen:!1,date:tomorrowStr(),dateLabel:"Tomorrow",timeSlot:TIME_SLOTS[1],paymentPlan:"full",paymentMethod:"Telebirr",receiptImg:"",receiptName:"",errors:{}},sheetAddonCat=DECORATION_CATEGORIES[0].id,document.getElementById("order-wizard-page").classList.remove("hidden"),renderOrderSheet())}function openCheckoutFromCart(){closeContactSheet(),closeNotificationsSheet(),closeTrackerSheet(),state.cart.length&&(sheet={step:4,mode:"cart",cake:null,size:"",flavor:"",decChoice:null,addons:[],candleNumber:"",inscription:"",fulfillment:"delivery",name:sheet.name||"",phone:sheet.phone||"",address:sheet.address||"",dateOption:"tomorrow",datePickerOpen:!1,date:tomorrowStr(),dateLabel:"Tomorrow",timeSlot:TIME_SLOTS[1],paymentPlan:"full",paymentMethod:"Telebirr",receiptImg:"",receiptName:"",errors:{}},document.getElementById("order-wizard-page").classList.remove("hidden"),renderOrderSheet())}function closeOrderSheet(){document.getElementById("order-wizard-page").classList.add("hidden")}function goToWizardStep(e){const t=sheet.mode==="cart"||sheet.mode==="decorations_only"?4:1;sheet.step=Math.max(t,Math.min(6,e)),sheet.errors={};try{history.pushState({makStep:sheet.step},"")}catch{}renderOrderSheet();const s=document.getElementById("order-sheet-body");s&&(s.scrollTop=0)}function wizardBackOrClose(){const e=sheet.mode==="cart"||sheet.mode==="decorations_only"?4:1;sheet.step<=e?closeOrderSheet():wizardBack()}function wizardBack(){const e=sheet.mode==="cart"||sheet.mode==="decorations_only"?4:1;if(sheet.step===2&&sheet.decChoice==="add"){sheet.decChoice=null,renderOrderSheet();return}sheet.step>e&&goToWizardStep(sheet.step-1)}function getPhoneDigits(e){return(e||"").replace(/\D/g,"")}function wizardNext(){if(sheet.step===2&&hasNumberDecorationSelected()&&!sheet.candleNumber){sheet.errors=sheet.errors||{},sheet.errors.candleNumber=!0,renderOrderSheet(),showCustomerToast("Please enter the candle or balloon milestone number");return}if(sheet.errors={},sheet.step===4){const e=getPhoneDigits(sheet.phone);if(sheet.name.trim()||(sheet.errors.name="\u26A0\uFE0F Required: Please enter your full name"),e.length?!e.startsWith("09")&&!e.startsWith("07")?sheet.errors.phone="\u26A0\uFE0F Required: Must start with 09 or 07 (e.g. 0911232323)":e.length!==10&&(sheet.errors.phone=`\u26A0\uFE0F Required: Must be exactly 10 digits (${e.length}/10 entered)`):sheet.errors.phone="\u26A0\uFE0F Required: Please enter your phone number",sheet.address.trim()||(sheet.errors.address="\u26A0\uFE0F Required: Please enter your Addis Ababa delivery address"),Object.keys(sheet.errors).length>0){renderOrderSheet();const t=sheet.errors.name?"step4-name-input":sheet.errors.phone?"step4-phone-input":"step4-address-input",s=sheet.errors.name||sheet.errors.phone||sheet.errors.address;highlightMissingRequirement(t,s),showCustomerToast("Please fill in the highlighted required fields");return}}if(sheet.step===5&&sheet.paymentPlan!=="cod"&&!sheet.receiptImg){sheet.errors.receipt=`\u26A0\uFE0F Required: Please upload your ${sheet.paymentMethod} transfer receipt screenshot`,renderOrderSheet(),highlightMissingRequirement("step5-receipt-dropzone",sheet.errors.receipt),showCustomerToast(`Upload ${sheet.paymentMethod} receipt first`);return}sheet.step<6&&goToWizardStep(sheet.step+1)}function chooseDecStep(e){e==="add"?(sheet.decChoice="add",renderOrderSheet()):(sheet.decChoice=null,goToWizardStep(3))}function selectDateOption(e){sheet.dateOption=e,e==="today"?(sheet.date=todayStr(),sheet.dateLabel="Today",sheet.datePickerOpen=!1):e==="tomorrow"?(sheet.date=tomorrowStr(),sheet.dateLabel="Tomorrow",sheet.datePickerOpen=!1):sheet.datePickerOpen=!sheet.datePickerOpen,renderOrderSheet()}function pickWeekDate(e,t,s){sheet.dateOption="select",sheet.date=e,sheet.dateLabel=`${t} (${s})`,sheet.datePickerOpen=!1,renderOrderSheet()}function handlePhoneInput(e){sheet.phone=e,sheet.errors.phone&&delete sheet.errors.phone;let t=getPhoneDigits(e);if(t.startsWith("251")&&t.length>=5&&(t.startsWith("2519")||t.startsWith("2517"))){t="0"+t.slice(3),e=t,sheet.phone=e;const o=document.getElementById("step4-phone-input");o&&(o.value=e)}const s=document.getElementById("step4-phone-input"),n=document.getElementById("step4-phone-hint");if(!s||!n)return;s.classList.remove("border-blush-200","bg-blush-50","text-ink","border-emerald-500","bg-emerald-50/70","text-emerald-800","ring-emerald-200","border-berry","bg-berry-soft/60","text-berry","ring-berry/25");const r=t.startsWith("09")||t.startsWith("07");t.length===0?(s.classList.add("border-blush-200","bg-blush-50","text-ink"),n.className="text-[10px] font-semibold text-ink-muted mt-1",n.textContent="Must start with 09 or 07 (10 digits)"):r?t.length===10?(s.classList.add("border-emerald-500","bg-emerald-50/70","text-emerald-800"),n.className="text-[10px] font-bold text-emerald-600 mt-1",n.textContent="\u2713 Valid phone number ("+(t.startsWith("09")?"Ethio Telecom 09":"Safaricom 07")+")"):t.length<10?(s.classList.add("border-berry","bg-berry-soft/60","text-berry"),n.className="text-[10px] font-bold text-berry mt-1",n.textContent=`${t.length}/10 digits \u2014 enter ${10-t.length} more digit${10-t.length>1?"s":""}`):(s.classList.add("border-berry","bg-berry-soft/60","text-berry","ring-1","ring-berry/25"),n.className="text-[10px] font-bold text-berry mt-1",n.textContent=`\u274C ${t.length}/10 digits \u2014 too many digits (maximum 10 digits)`):(s.classList.add("border-berry","bg-berry-soft/60","text-berry","ring-1","ring-berry/25"),n.className="text-[10px] font-bold text-berry mt-1",n.textContent="\u274C Must start with 09 or 07 \u2014 other prefixes not accepted")}function setPaymentPlan(e){sheet.paymentPlan=e,sheet.errors.receipt&&delete sheet.errors.receipt,e==="cod"?sheet.paymentMethod="Pay on Delivery":sheet.paymentMethod==="Pay on Delivery"&&(sheet.paymentMethod="Telebirr"),renderOrderSheet()}function handleReceiptUpload(e){const t=e.files&&e.files[0];if(!t)return;if(t.type&&!t.type.startsWith("image/")){showCustomerToast("Please select a photo or screenshot only (PNG, JPG, WEBP)"),e.value="";return}const s=new FileReader;s.onload=function(n){const r=new Image;r.onload=function(){try{const u=Math.min(1,720/r.width),c=document.createElement("canvas");c.width=Math.round(r.width*u),c.height=Math.round(r.height*u);const i=c.getContext("2d");i.drawImage(r,0,0,c.width,c.height);let a=c.toDataURL("image/jpeg",.72);if(a.length>5e5){const h=Math.min(1,480/r.width);c.width=Math.round(r.width*h),c.height=Math.round(r.height*h),i.drawImage(r,0,0,c.width,c.height),a=c.toDataURL("image/jpeg",.55)}sheet.receiptImg=a}catch{if(typeof n.target.result=="string"&&n.target.result.length<=7e5)sheet.receiptImg=n.target.result;else{showCustomerToast("Receipt image is too large to process. Please choose a smaller photo."),e.value="";return}}sheet.receiptName=t.name,sheet.errors.receipt&&delete sheet.errors.receipt,renderOrderSheet(),showCustomerToast("Transfer screenshot received & attached")},r.src=n.target.result},s.readAsDataURL(t)}function clearReceiptUpload(){sheet.receiptImg="",sheet.receiptName="",renderOrderSheet()}function computeSheetTotal(){let e=0,t=0;if(sheet.mode==="single"&&sheet.cake){const c=SIZES.find(p=>p.id===sheet.size)||SIZES[0],i=typeof productConfigState<"u"&&sheet.weightId?(productConfigState.weights||[]).find(p=>p.id===sheet.weightId&&p.enabled!==!1):null,a=typeof productConfigState<"u"&&i?(productConfigState.pricingRules||[]).find(p=>p.enabled!==!1&&p.sizeId===c.id&&p.weightId===i.id):null,h=typeof productConfigState<"u"&&Array.isArray(sheet.customOptions)?sheet.customOptions.reduce((p,m)=>{const l=(productConfigState.customizations||[]).find(d=>d.id===m&&d.enabled!==!1);return p+(l&&Number(l.charge)||0)},0):0;e=sheet.cake.price+c.add+(i&&Number(i.add)||0)+(a&&Number(a.extraCharge)||0)+h,t=getDecorationTotals(sheet.decQuantities).total}else sheet.mode==="decorations_only"?(e=0,t=getDecorationTotals(sheet.decQuantities).total):e=state.cart.reduce((c,i)=>c+i.unitPrice*i.qty,0);const s=sheet.fulfillment==="pickup"||state.shop.deliveryEnabled===!1?0:state.shop.deliveryFee||0,n=(sheet.promoDiscount||0)+(sheet.mysteryRewardDiscount||0),r=Math.max(0,e+t+s-n),o=sheet.paymentPlan==="full"?r:sheet.paymentPlan==="half"?Math.round(r*.5):0,u=Math.max(0,r-o);return{base:e,addSum:t,deliv:s,total:r,dueNow:o,balanceDue:u}}function renderOrderSheet(){const e=document.getElementById("order-sheet-body"),t=computeSheetTotal(),s=sheet.mode==="single"&&sheet.cake,n=sheet.mode==="cart"||sheet.mode==="decorations_only",r=n?4:1,o=n?sheet.step-3:sheet.step,u=n?3:6;document.getElementById("wizard-step-kicker").textContent=n?`Step ${o} of ${u}`:`Step ${sheet.step} of 6`,document.getElementById("wizard-step-title").textContent=WIZARD_META[sheet.step].title,document.getElementById("wizard-progress-bars").innerHTML=(n?[4,5,6]:[1,2,3,4,5,6]).map(l=>`
        <div class="h-1.5 rounded-full transition-all ${l===sheet.step?"bg-berry":l<sheet.step?"bg-blush-400":"bg-blush-200"}"></div>
      `).join(""),document.getElementById("order-sheet-total-label").textContent=sheet.step>=5&&sheet.paymentPlan==="half"?"50% Deposit Now":"Order Total",document.getElementById("order-sheet-total").textContent=fmtETB(sheet.step>=5&&sheet.paymentPlan==="half"?t.dueNow:t.total);const c=document.getElementById("wizard-top-total"),i=document.getElementById("wizard-top-total-label");c&&(c.textContent=fmtETB(sheet.step>=5&&sheet.paymentPlan==="half"?t.dueNow:t.total)),i&&(i.textContent=sheet.step>=5&&sheet.paymentPlan==="half"?"50% Deposit":"Order Total");const a=document.getElementById("order-back-btn"),h=document.getElementById("order-next-btn"),x=document.getElementById("order-submit-btn");a.classList.toggle("hidden",sheet.step<=r&&!(sheet.step===2&&sheet.decChoice==="add")),h.classList.toggle("hidden",sheet.step===6||sheet.step===2&&sheet.decChoice===null),x.classList.toggle("hidden",sheet.step!==6);const p=sheet.addons.map(l=>state.decorations.find(d=>d.id===l)).filter(Boolean);if(sheet.step===1&&s){e.innerHTML=`
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
              ${SIZES.map((l,d)=>{const b=sheet.size===l.id;return`
                  <button onclick="selectSheetSize(${d})" class="p-2.5 rounded-2xl border text-left transition-all ${b?"bg-berry-soft border-berry border-[1.5px] shadow-rose-sm":"bg-blush-50 border-blush-200"}">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-extrabold text-ink">${l.label}</span>
                      <span class="text-[10px] font-bold text-berry">${l.add?"+"+l.add:"Base"}</span>
                    </div>
                    <div class="text-[10px] text-ink-muted mt-0.5">${l.serves}</div>
                  </button>
                `}).join("")}
            </div>
          </div>

          
          ${typeof productConfigState<"u"&&productConfigState.enabled!==!1&&productConfigState.sectionsEnabled?.weights!==!1&&(productConfigState.weights||[]).some(l=>l.enabled!==!1)?`
          <div class="bg-white rounded-[20px] p-4 shadow-rose-sm border border-white space-y-2">
            <div class="text-xs font-extrabold text-ink">1b. Cake Weight (Optional)</div>
            <div class="flex flex-wrap gap-1.5">
              ${productConfigState.weights.filter(l=>l.enabled!==!1).map(l=>{const d=sheet.weightId===l.id;return`<button onclick="selectSheetWeight('${l.id}')" class="px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all ${d?"btn-berry text-white border-transparent shadow-rose-sm":"bg-blush-50 text-ink border-blush-200"}">${formatCakeWeight(l)} ${l.add?"(+"+l.add+")":""}</button>`}).join("")}
            </div>
          </div>`:""}

          ${typeof productConfigState<"u"&&productConfigState.enabled!==!1&&productConfigState.sectionsEnabled?.options!==!1&&(productConfigState.customizations||[]).some(l=>l.enabled!==!1)?`
          <div class="bg-white rounded-[20px] p-4 shadow-rose-sm border border-white space-y-2">
            <div class="text-xs font-extrabold text-ink">1c. Customization Options</div>
            <div class="space-y-1.5">
              ${productConfigState.customizations.filter(l=>l.enabled!==!1).map(l=>{const d=Array.isArray(sheet.customOptions)&&sheet.customOptions.includes(l.id);return`<button onclick="toggleSheetCustomOpt('${l.id}')" class="w-full px-3 py-2 rounded-xl border text-left flex items-center justify-between text-[11px] font-bold transition-all ${d?"bg-berry-soft border-berry text-berry":"bg-blush-50 border-blush-200 text-ink"}"><span>${l.name}</span><span>${l.charge?"+"+l.charge+" ETB":"Included"}</span></button>`}).join("")}
            </div>
          </div>`:""}

          <div class="bg-white rounded-[20px] p-4 shadow-rose-sm border border-white space-y-2.5">
            <div class="text-xs font-extrabold text-ink">2. Choose Sponge Flavor</div>
            <div class="flex flex-wrap gap-1.5">
              ${FLAVORS.map((l,d)=>{const b=sheet.flavor===l;return`
                  <button onclick="selectSheetFlavor(${d})" class="px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all ${b?"btn-berry text-white border-transparent shadow-rose-sm":"bg-blush-50 text-ink border-blush-200"}">
                    ${l}
                  </button>
                `}).join("")}
            </div>
          </div>
        `;return}if(sheet.step===2&&s){if(sheet.decChoice===null){e.innerHTML=`
            <div class="bg-white rounded-[24px] p-5 shadow-rose border border-white text-center space-y-4 mt-2">
              <div class="w-16 h-16 mx-auto rounded-full bg-berry-soft text-berry flex items-center justify-center shadow-rose-sm">${getLuxurySvg("sparkles","w-8 h-8")}</div>
              <div class="space-y-1.5">
                <div class="text-[11px] font-extrabold uppercase tracking-wider text-berry">Step 2 \u2013 Make It Extra Special</div>
                <h4 class="text-base font-extrabold text-ink leading-snug">Would you like to add a little something extra to your special moment?</h4>
                <p class="text-xs text-ink-muted leading-relaxed">Explore our extra decorations and make your celebration even more memorable!</p>
              </div>

              <div class="grid grid-cols-3 gap-2 pt-1">
                ${SEED_DECORATIONS.slice(0,3).map(d=>`
                  <div class="rounded-2xl overflow-hidden border border-blush-200 bg-blush-50">
                    <img src="${d.img}" alt="${d.name}" class="w-full h-16 object-cover" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
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
          `;return}const l=state.decorations.filter(d=>d.category===sheetAddonCat);e.innerHTML=`
          <div class="bg-white rounded-[20px] p-3.5 shadow-rose-sm border border-white space-y-3">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-xs font-extrabold text-ink">Extra Decorations &amp; Add-ons</div>
                <div class="text-[10px] text-ink-muted">Tap any item to add to your cake</div>
              </div>
              <span class="px-2.5 py-0.5 rounded-full bg-berry-soft text-berry text-[10px] font-extrabold">${p.length} Selected</span>
            </div>

            <div class="flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
              ${DECORATION_CATEGORIES.map(d=>{const b=sheetAddonCat===d.id,f=p.filter(k=>k.category===d.id).length;return`
                  <button onclick="sheetAddonCat='${d.id.replace(/'/g,"\\'")}'; renderOrderSheet();" class="shrink-0 px-2.5 py-1.5 rounded-full text-[10.5px] font-bold transition-all ${b?"btn-berry text-white shadow-rose-sm":"bg-blush-50 text-ink-muted border border-blush-200"}">
                    ${getLuxurySvg(d.svgKey,"w-3.5 h-3.5 shrink-0 inline-block mr-1")} ${d.short}${f?" ("+f+")":""}
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
                    ${["1","4","18","21","25","30","50"].map(d=>`
                      <button
                        type="button"
                        onclick="updateCandleNumber('${d}')"
                        class="px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${sheet.candleNumber===d?"btn-berry text-white shadow-2xs scale-105":"bg-white text-ink-muted hover:bg-blush-100 border border-blush-200"}"
                      >
                        ${d}
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
              ${l.map(d=>{const b=sheet.decQuantities&&sheet.decQuantities[d.id]||state.decSelections&&state.decSelections[d.id]||0,f=d.inStock!==!1;return`
                  <div onclick="${f?`changeDecQty('${d.id}', 1, event)`:`showCustomerToast('${d.name} is currently Sold Out')`}" class="rounded-2xl border overflow-hidden text-left flex flex-col justify-between transition-all p-2 ${f?b>0?"border-2 border-berry ring-2 ring-berry/20 bg-rose-50/30 shadow-rose-sm cursor-pointer":"border-blush-200 bg-white shadow-2xs cursor-pointer":"bg-blush-50/70 border-blush-200 opacity-70 grayscale-[0.25] cursor-not-allowed"}">
                    <div class="relative h-20 w-full bg-blush-100 rounded-xl overflow-hidden shrink-0">
                      <img src="${d.img||SVG_CAKE_FALLBACK}" alt="${d.name}" class="w-full h-full object-cover" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
                      ${f?b>0?`
                        <span class="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full btn-berry text-white text-[9px] font-black shadow">${b}&times;</span>
                      `:"":`
                        <span class="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full bg-ink/80 text-white text-[8px] font-black uppercase">Sold Out</span>
                      `}
                    </div>
                    <div class="p-1 flex-1 flex flex-col justify-between mt-1 gap-1">
                      <div class="text-[10.5px] font-bold text-ink leading-tight line-clamp-1" title="${d.name}">${d.name}</div>
                      <div class="flex items-center justify-between pt-1 border-t border-blush-100 gap-1">
                        <span class="text-[10.5px] font-extrabold text-berry shrink-0 whitespace-nowrap">+${fmtETB(d.price)}</span>
                        ${f?`
                          <div class="flex items-center gap-1 shrink-0 bg-blush-50 rounded-full p-0.5 border border-blush-200" onclick="event.stopPropagation()">
                            <button onclick="changeDecQty('${d.id}', -1, event)" aria-label="Decrease quantity" class="w-5 h-5 rounded-full bg-white text-berry flex items-center justify-center font-black text-[10px] shadow-2xs active:scale-90 ${b===0?"opacity-35 cursor-not-allowed":"cursor-pointer"}">
                              &minus;
                            </button>
                            <span class="w-4 text-center font-extrabold text-[10px] text-ink select-none">${b}</span>
                            <button onclick="changeDecQty('${d.id}', 1, event)" aria-label="Increase quantity" class="w-5 h-5 rounded-full btn-berry text-white flex items-center justify-center font-black text-[10px] shadow-2xs active:scale-90 cursor-pointer">
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

            ${(()=>{const d=getDecorationTotals(sheet.decQuantities);return d.items.length?`
                <div class="pt-2 border-t border-blush-100 flex flex-wrap gap-1.5">
                  ${d.items.map(b=>`
                    <span onclick="changeDecQty('${b.id}', -${b.qty}, event)" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-berry-soft text-berry text-[10px] font-bold cursor-pointer hover:bg-rose-100" title="Tap to remove">
                      <span>${b.qty}&times; ${b.name} (${fmtETB(b.subtotal)})</span>
                      <svg class="w-2.5 h-2.5 text-berry" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </span>
                  `).join("")}
                </div>
              `:""})()}
          </div>
        `;return}if(sheet.step===3&&s){const l=["Happy Birthday!","Melkam Lidet!","Congrats Grad!","Happy Anniversary"];e.innerHTML=`
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
              ${l.map(d=>`
                <button onclick="updateSheetInsc('${d.replace(/'/g,"\\'")}'); renderOrderSheet();" class="px-2.5 py-1 rounded-full bg-blush-100 text-[10.5px] font-bold text-ink hover:bg-berry-soft hover:text-berry transition-colors">${d}</button>
              `).join("")}
            </div>

            <div class="rounded-2xl hero-bg border border-blush-200 p-4 text-center space-y-1">
              <div class="text-[9.5px] font-bold uppercase tracking-wider text-ink-muted">Live Piping Preview</div>
              <div id="sheet-insc-preview" class="font-script text-[28px] leading-tight text-berry break-words">
                ${sheet.inscription||"Make Every Moment Sweeter"}
              </div>
            </div>
          </div>
        `;return}if(sheet.step===4){const l=sheet.errors||{},d=getPhoneDigits(sheet.phone),b=d.startsWith("09")||d.startsWith("07"),f=d.length===0?"empty":b&&d.length===10?"valid":"invalid",k=l.phone||f==="invalid"?"border-berry bg-berry-soft/60 text-berry ring-1 ring-berry/25":f==="valid"?"border-emerald-500 bg-emerald-50/70 text-emerald-800 ring-1 ring-emerald-200":"border-blush-200 bg-blush-50 text-ink",$=getMondayToSundayDays();e.innerHTML=`
          <div class="bg-white rounded-[20px] p-4 shadow-rose-sm border border-white space-y-3.5">
            <div class="text-xs font-extrabold text-ink">Recipient &amp; Addis Delivery Details</div>

            <!-- Full Name with Rounded Error Border -->
            <div id="field-step4-name" class="space-y-1">
              <label class="block text-[10.5px] font-bold ${l.name?"field-error-label":"text-ink-muted"}">Full Name *</label>
              <input
                id="step4-name-input" autocomplete="name" enterkeyhint="next"
                type="text"
                value="${sheet.name}"
                oninput="sheet.name=this.value; if(sheet.errors.name){delete sheet.errors.name; renderOrderSheet();}"
                placeholder="e.g., Selamawit Bekele"
                class="w-full px-3.5 py-2.5 rounded-2xl border text-xs font-bold focus:outline-none focus:ring-2 focus:ring-berry/30 transition-all ${l.name?"field-error-round":"border-blush-200 bg-blush-50 text-ink"}"
              />
              ${l.name?`<div class="field-error-msg"><svg class="w-3.5 h-3.5 shrink-0 text-berry" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span>${l.name}</span></div>`:""}
            </div>

            <!-- Phone Number with Live Green (09/07 10 digits) / Berry-Red Validation -->
            <div id="field-step4-phone" class="space-y-1">
              <label class="block text-[10.5px] font-bold ${l.phone||f==="invalid"?"text-berry":f==="valid"?"text-emerald-600":"text-ink-muted"}">Phone Number (10 digits, starts with 09 or 07) *</label>
              <input
                id="step4-phone-input" type="tel" inputmode="tel" autocomplete="tel" enterkeyhint="next"
                type="tel"
                inputmode="numeric"
                value="${sheet.phone}"
                oninput="handlePhoneInput(this.value)"
                placeholder="0911232323"
                class="w-full px-3.5 py-2.5 rounded-2xl border text-xs font-bold focus:outline-none transition-colors ${k}"
              />
              <div id="step4-phone-hint" class="text-[10px] font-bold mt-1 ${l.phone||f==="invalid"?"text-berry":f==="valid"?"text-emerald-600":"text-ink-muted font-semibold"}">
                ${l.phone?" "+l.phone:f==="valid"?"\u2713 Valid phone number ("+(d.startsWith("09")?"Ethio Telecom 09":"Safaricom 07")+")":f==="invalid"?b?d.length<10?`${d.length}/10 digits \u2014 enter ${10-d.length} more`:`\u274C ${d.length}/10 digits \u2014 too many digits (max 10)`:"\u274C Must start with 09 or 07 \u2014 other prefixes not accepted":"Must start with 09 or 07 (10 digits)"}
              </div>
            </div>

            <!-- Delivery Address with Rounded Error Border -->
            <div id="field-step4-address" class="space-y-1">
              <label class="block text-[10.5px] font-bold ${l.address?"field-error-label":"text-ink-muted"}">Delivery Address (Addis Ababa) *</label>
              <input
                id="step4-address-input" autocomplete="street-address" enterkeyhint="done"
                type="text"
                value="${sheet.address}"
                oninput="sheet.address=this.value; if(sheet.errors.address){delete sheet.errors.address; renderOrderSheet();}"
                placeholder="e.g., Bole Medhanialem, near Edna Mall"
                class="w-full px-3.5 py-2.5 rounded-2xl border text-xs font-bold focus:outline-none focus:ring-2 focus:ring-berry/30 transition-all ${l.address?"field-error-round":"border-blush-200 bg-blush-50 text-ink"}"
              />
              ${l.address?`<div class="field-error-msg"><svg class="w-3.5 h-3.5 shrink-0 text-berry" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span>${l.address}</span></div>`:""}
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
                  ${$.map(g=>{const v=sheet.date===g.iso;return`
                      <button onclick="pickWeekDate('${g.iso}', '${g.dayName}', '${g.shortLabel}')" class="w-full px-3 py-2 rounded-xl border text-xs flex items-center justify-between transition-all ${v?"bg-berry-soft border-berry text-berry font-extrabold":"bg-white border-blush-100 text-ink font-bold hover:border-blush-300"}">
                        <span>${g.dayName}</span>
                        <span class="text-[11px] ${v?"text-berry":"text-ink-muted"}">${g.shortLabel}${v?" \u2022":""}</span>
                      </button>
                    `}).join("")}
                </div>
              `:""}

              <!-- 3-Option Time Window: Morning / Afternoon / Evening -->
              <div class="space-y-1.5">
                <label class="block text-[10.5px] font-bold text-ink-muted">Time Window *</label>
                <div class="grid grid-cols-3 gap-2">
                  ${TIME_SLOTS.map(g=>{const v=sheet.timeSlot===g;return`
                      <button onclick="sheet.timeSlot='${g}'; renderOrderSheet();" class="py-2.5 px-2 rounded-2xl text-[11px] font-extrabold border transition-all flex items-center justify-center gap-1.5 active:scale-95 ${v?"btn-berry text-white border-transparent shadow-rose-sm":"bg-blush-50 text-ink border-blush-200 hover:bg-white"}">
                        ${g==="Morning"?`<svg class="w-4 h-4 shrink-0 transition-colors ${v?"text-white":"text-amber-500"}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 18a5 5 0 0 0-10 0"/><path d="M12 2v7"/><path d="m4.93 10.93 1.41 1.41"/><path d="m19.07 10.93-1.41 1.41"/><path d="M2 18h20"/><path d="M20 22H4"/></svg>`:g==="Afternoon"?`<svg class="w-4 h-4 shrink-0 transition-colors ${v?"text-white":"text-amber-500"}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`:`<svg class="w-4 h-4 shrink-0 transition-colors ${v?"text-white":"text-indigo-500"}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="M19 3v4"/><path d="M21 5h-4"/></svg>`}
                        <span>${g}</span>
                      </button>
                    `}).join("")}
                </div>
              </div>
            </div>
          </div>
        `;return}if(sheet.step===5){const l=sheet.errors||{};e.innerHTML=`
          
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
                <div class="text-[10.5px] font-extrabold text-berry mt-1">${fmtETB(t.total)}</div>
                <div class="text-[9px] text-ink-muted mt-0.5">Pay upfront</div>
              </button>
              <button onclick="setPaymentPlan('half')" class="p-2.5 rounded-2xl border text-center transition-all ${sheet.paymentPlan==="half"?"bg-berry-soft border-berry border-[1.5px] shadow-rose-sm":"bg-blush-50 border-blush-200"}">
                <div class="text-[11px] font-extrabold text-ink">Half 50%</div>
                <div class="text-[10.5px] font-extrabold text-berry mt-1">${fmtETB(Math.round(t.total*.5))}</div>
                <div class="text-[9px] text-ink-muted mt-0.5">Deposit now</div>
              </button>
              <button onclick="setPaymentPlan('cod')" class="p-2.5 rounded-2xl border text-center transition-all ${sheet.paymentPlan==="cod"?"bg-berry-soft border-berry border-[1.5px] shadow-rose-sm":"bg-blush-50 border-blush-200"}">
                <div class="text-[11px] font-extrabold text-ink">On Delivery</div>
                <div class="text-[10.5px] font-extrabold text-emerald-700 mt-1">0 ETB Now</div>
                <div class="text-[9px] text-ink-muted mt-0.5">Pay on arrival</div>
              </button>
            </div>

            <div class="bg-blush-50 rounded-xl px-3 py-2 flex items-center justify-between text-[11px] border border-blush-200/70">
              <span class="text-ink-muted">Due Now: <strong class="text-berry">${fmtETB(t.dueNow)}</strong></span>
              <span class="text-ink-muted">Balance on Delivery: <strong class="text-ink">${fmtETB(t.balanceDue)}</strong></span>
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
                <label class="block text-[11px] font-extrabold ${l.receipt?"text-berry":"text-ink"}">Upload ${sheet.paymentMethod} Screenshot *</label>
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
                  <label id="step5-receipt-dropzone" class="flex flex-col items-center justify-center py-5 px-3 rounded-2xl border-2 border-dashed ${l.receipt?"field-error-round":"border-blush-400 bg-blush-50/70"} cursor-pointer hover:bg-berry-soft/40 transition-all">
                    <div class="w-10 h-10 rounded-full bg-blush-100 text-berry flex items-center justify-center mx-auto mb-1"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg></div>
                    <span class="text-[11.5px] font-extrabold text-berry mt-1">Tap to Upload ${sheet.paymentMethod} Receipt</span>
                    <span class="text-[9.5px] text-ink-muted">Auto-compressed for fast mobile transfer</span>
                    <input type="file" accept="image/png,image/jpeg,image/webp,image/jpg" onchange="handleReceiptUpload(this)" class="hidden" />
                  </label>
                  ${l.receipt?`<div class="text-[10.5px] font-bold text-berry"> ${l.receipt}</div>`:""}
                `}
              </div>
            </div>
          `:`
            <div class="bg-white rounded-[20px] p-4 shadow-rose-sm border border-emerald-200 space-y-1.5 text-xs">
              <div class="font-extrabold text-emerald-700 flex items-center gap-1.5"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/></svg> Cash / Mobile Transfer on Arrival</div>
              <p class="text-[11px] text-ink-muted leading-relaxed">No upfront deposit required. Please have <strong>${fmtETB(t.total)}</strong> ready when your cake arrives.</p>
            </div>
          `}
        `;return}const m=sheet.paymentPlan==="full"?"Full Payment (100%)":sheet.paymentPlan==="half"?"Half Deposit (50%)":"Pay on Delivery";e.innerHTML=`
        <div class="bg-white rounded-[20px] p-4 shadow-rose-sm border border-white space-y-3">
          <div class="flex items-center justify-between border-b border-blush-100 pb-2.5">
            <div class="text-xs font-extrabold text-ink">Order Summary</div>
            <button onclick="goToWizardStep(${r})" class="text-[10.5px] font-bold text-berry">Edit</button>
          </div>

          ${s?`
            <div class="flex items-center gap-3">
              <img src="${sheet.cake.img}" class="w-14 h-14 rounded-xl object-cover shrink-0" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
              <div class="min-w-0 flex-1 text-xs">
                <div class="font-extrabold text-ink truncate">${sheet.cake.name}</div>
                <div class="text-[11px] text-ink-muted">${sheet.size} \u2022 ${sheet.flavor}</div>
                ${sheet.inscription?`<div class="text-[11px] text-berry font-bold truncate">${getLuxurySvg("pen","w-3.5 h-3.5 inline-block mr-1")} "${sheet.inscription}"</div>`:""}
              </div>
            </div>
            ${(()=>{const l=getDecorationTotals(sheet.decQuantities);return l.items.length?`
                <div class="bg-blush-50 rounded-xl p-2.5 text-[10.5px] space-y-1.5 border border-blush-200">
                  <div class="font-extrabold text-ink flex items-center justify-between border-b border-blush-200 pb-1">
                    <span>Extra Decorations (${l.count} items)</span>
                    <span class="text-berry font-black">${fmtETB(l.total)}</span>
                  </div>
                  <div class="space-y-1 pt-0.5">
                    ${l.items.map(d=>`
                      <div class="flex items-center justify-between text-ink-muted">
                        <span>${d.qty}&times; ${d.name}${d.requiresNumber&&sheet.candleNumber?` (No. ${sheet.candleNumber})`:""}</span>
                        <span class="font-bold text-ink">${fmtETB(d.subtotal)}</span>
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
              ${(()=>{const l=getDecorationTotals(sheet.decQuantities);return`
                  <div class="bg-blush-50 rounded-xl p-2.5 text-[10.5px] space-y-1.5 border border-blush-200">
                    <div class="font-extrabold text-ink flex items-center justify-between border-b border-blush-200 pb-1">
                      <span>Selected Items (${l.count})</span>
                      <span class="text-berry font-black">${fmtETB(l.total)}</span>
                    </div>
                    <div class="space-y-1 pt-0.5">
                      ${l.items.map(d=>`
                        <div class="flex items-center justify-between text-ink-muted">
                          <span class="truncate pr-2">${d.qty}&times; ${d.name}${d.requiresNumber&&sheet.candleNumber?` (No. ${sheet.candleNumber})`:""}</span>
                          <span class="font-bold text-ink shrink-0">${fmtETB(d.subtotal)}</span>
                        </div>
                      `).join("")}
                    </div>
                  </div>
                `})()}
            </div>
          `:`
            <div class="space-y-1 text-xs">
              ${state.cart.map(l=>`<div class="flex justify-between"><span>${l.qty}\xD7 ${l.name}</span><span class="font-bold text-berry">${fmtETB(l.unitPrice*l.qty)}</span></div>`).join("")}
            </div>
          `}

          <div class="space-y-1.5 pt-2 border-t border-blush-100 text-[11px]">
            <div class="flex justify-between"><span class="text-ink-muted">Recipient</span><span class="font-bold text-ink">${sheet.name} (${sheet.phone})</span></div>
            <div class="flex justify-between"><span class="text-ink-muted">Delivery Address</span><span class="font-bold text-ink text-right max-w-[60%] truncate">${sheet.address}</span></div>
            <div class="flex justify-between"><span class="text-ink-muted">Schedule</span><span class="font-bold text-ink">${sheet.dateLabel||sheet.date} \u2022 ${sheet.timeSlot}</span></div>
            <div class="flex justify-between"><span class="text-ink-muted">Payment Plan</span><span class="font-bold text-berry">${m}</span></div>
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
            <div class="flex justify-between text-ink-muted"><span>${sheet.mode==="decorations_only"?"Decorations Subtotal":"Cake &amp; Add-ons"}</span><span class="font-bold text-ink">${fmtETB(t.base+t.addSum)}</span></div>
            <div class="flex justify-between text-ink-muted"><span>Chilled Delivery</span><span class="font-bold text-ink">${fmtETB(t.deliv)}</span></div>
            <div class="flex justify-between font-extrabold text-ink pt-1.5 border-t border-blush-200"><span>Grand Total</span><span class="text-berry">${fmtETB(t.total)}</span></div>
            <div class="flex justify-between text-[11px] font-bold text-emerald-700"><span>Due Now</span><span>${fmtETB(t.dueNow)}</span></div>
            ${t.balanceDue>0?`<div class="flex justify-between text-[11px] font-semibold text-ink-muted"><span>Balance on Delivery</span><span>${fmtETB(t.balanceDue)}</span></div>`:""}
          </div>
        </div>
      `}function selectSheetSize(e){SIZES[e]&&(sheet.size=SIZES[e].id,renderOrderSheet())}function selectSheetFlavor(e){FLAVORS[e]&&(sheet.flavor=FLAVORS[e],renderOrderSheet())}function hasNumberDecorationSelected(){return sheet.addons.some(e=>{const t=state.decorations.find(n=>n.id===e);if(!t)return!1;if(t.requiresNumber)return!0;const s=t.name.toLowerCase();return s.includes("number candle")||s.includes("metallic number")})}function updateCandleNumber(e){sheet.candleNumber=String(e).trim(),sheet.errors&&sheet.errors.candleNumber&&sheet.candleNumber&&delete sheet.errors.candleNumber,renderOrderSheet()}function toggleSheetAddon(e){const t=sheet&&sheet.decQuantities&&sheet.decQuantities[e]||state.decSelections&&state.decSelections[e]||0;changeDecQty(e,t>0?-t:1)}function updateSheetInsc(e){sheet.inscription=e.slice(0,35);const t=document.getElementById("sheet-insc-count"),s=document.getElementById("sheet-insc-preview");t&&(t.textContent=`${sheet.inscription.length}/35`),s&&(s.textContent=sheet.inscription||"Make Every Moment Sweeter")}function addCustomizedToCart(){if(sheet.mode!=="single"||!sheet.cake)return;const e=computeSheetTotal();state.cart.push({id:"c-"+Date.now(),cakeId:sheet.cake.id,name:sheet.cake.name,img:sheet.cake.img,size:sheet.size,flavor:sheet.flavor,qty:1,unitPrice:e.base+e.addSum}),saveState(),updateCustomerBadges(),customerTab==="cart"?renderCartTab():invalidateCustomerTabCache("cart"),closeOrderSheet(),showCustomerToast(`Added ${sheet.cake.name} to Cart`)}let isSubmittingLiveOrder=!1;function submitLiveOrder(){if(isSubmittingLiveOrder)return;const e=getPhoneDigits(sheet.phone);if(!sheet.name.trim()||!sheet.phone.trim()){goToWizardStep(4),showCustomerToast("Please enter your name & phone number");return}if(!e.startsWith("09")&&!e.startsWith("07")){goToWizardStep(4),showCustomerToast("Phone number must start with 09 or 07");return}if(e.length!==10){goToWizardStep(4),showCustomerToast("Phone number must be exactly 10 digits");return}if(!sheet.address.trim()){goToWizardStep(4),showCustomerToast("Please enter your Addis Ababa delivery address");return}if(sheet.paymentPlan!=="cod"&&!sheet.receiptImg){goToWizardStep(5),showCustomerToast(`Please upload your ${sheet.paymentMethod} receipt screenshot`);return}isSubmittingLiveOrder=!0;const t=document.getElementById("wizard-next-btn");t&&(t.disabled=!0);try{const s=computeSheetTotal(),n=Number(String(Date.now()).slice(-6)+String(Math.floor(10+Math.random()*89))),r=state.cart[0],o=getDecorationTotals(sheet.decQuantities),u=sheet.mode==="decorations_only",c=o.items[0]&&o.items[0].img||"https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80",i=u?`Celebration Decorations (${o.count} items)`:r?`${r.name}${state.cart.length>1?` (+${state.cart.length-1} more)`:""}`:"Celebration Order",a={id:n,status:"Payment Pending",customerName:sheet.name.trim(),phone:sheet.phone.trim(),fulfillment:"delivery",address:sheet.address.trim(),deliveryDate:sheet.dateLabel||sheet.date,timeSlot:sheet.timeSlot,paymentPlan:sheet.paymentPlan,paymentMethod:sheet.paymentMethod,paymentRef:sheet.paymentPlan==="cod"?"Pay on Delivery":"Receipt Uploaded",paymentStatus:"Unpaid",dueNow:s.dueNow,balanceDue:s.balanceDue,receiptImg:sheet.receiptImg||"",cakeName:sheet.mode==="single"?sheet.cake.name:u?`Celebration Decorations (${o.count} items)`:i,cakeImg:sheet.mode==="single"?sheet.cake.img:u?c:r?r.img:c,size:sheet.mode==="single"?sheet.size:u?"Party Pack":r?r.size:"Standard",flavor:sheet.mode==="single"?sheet.flavor:u?"Decorations Only":r?r.flavor:"Standard",inscription:sheet.inscription,decorations:o.items.map(h=>({id:h.id,name:h.name,category:h.category,price:h.price,qty:h.qty,subtotal:h.subtotal})),addons:o.items.map(h=>`${h.qty}\xD7 ${h.name}${h.requiresNumber&&sheet.candleNumber?` (No. ${sheet.candleNumber})`:""} (${fmtETB(h.subtotal)})`),total:s.total,isNewFlash:!0,createdAt:new Date().toISOString()};state.orders.unshift(a),state.notifications.unshift({id:Date.now(),title:`Order #ORD-${a.id} Placed`,msg:`Your ${a.cakeName} (${fmtETB(a.total)}) is placed with status: Payment Pending.`,time:"Just now"}),state.unreadNotifs++,sheet.mode==="cart"&&(state.cart=[]),state.decSelections={},sheet.mode==="decorations_only"&&(sheet.decQuantities={}),saveState(),syncAll(),closeOrderSheet(),playCustomerNotificationSound("Payment Pending"),playBell(),showCustomerToast("Submitted successfully!","success"),showAdminToast(`New Order #ORD-${a.id} from ${a.customerName}!`,"success"),showGlobalToast(`Submitted successfully! Order #ORD-${a.id}`,"success"),openOrderSuccessPage(a),window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0&&window.FirebaseService&&typeof window.FirebaseService.saveOrder=="function"&&window.FirebaseService.saveOrder({...a}).then(h=>{h&&h.firestoreDocId&&(a.firestoreDocId=h.firestoreDocId,a.cloudSynced=!0,saveState(),typeof syncCustomerOrdersStatusFromCloud=="function"&&syncCustomerOrdersStatusFromCloud())}).catch(h=>{a.cloudSynced=!1,saveState(),console.warn("Firestore order sync failed (order preserved in localStorage):",h),showCustomerToast("Order saved locally; cloud sync pending.")})}finally{isSubmittingLiveOrder=!1,t&&(t.disabled=!1)}}function updateSuccessPageLiveStatus(){const e=document.getElementById("order-success-page");if(!e||e.classList.contains("hidden"))return;const t=state.orders.find(a=>String(a.id)===String(lastSubmittedOrderId))||state.orders[0];if(!t)return;const s=document.getElementById("success-hero-icon-container"),n=document.getElementById("success-status-pill-container"),r=document.getElementById("success-status-card-container"),o=document.getElementById("success-order-sub"),u=t.paymentStatus==="Paid",c=t.status==="Approved";if(t.status==="Completed")s&&(s.innerHTML=`
            <div class="relative w-20 h-20 mx-auto flex items-center justify-center animate-scaleIn">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-30"></span>
              <div class="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white shadow-rose-sm flex items-center justify-center">
                <svg class="w-9 h-9 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
            </div>
          `),n&&(n.innerHTML=`
            <div class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10.5px] font-black uppercase tracking-wider shadow-xs animate-scaleIn">
              <svg class="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Order Completed Successfully</span>
            </div>
          `),o&&(o.textContent=`Congratulations, ${t.customerName}! Your MAK CAKE order has been completed & delivered.`),r&&(r.innerHTML=`
            <div class="w-full bg-gradient-to-r from-emerald-50 via-blush-50 to-emerald-50 rounded-2xl p-3.5 border-2 border-emerald-300 shadow-sm text-center space-y-1 animate-scaleIn">
              <div class="text-xs font-black text-emerald-900 flex items-center justify-center gap-1.5">
                <svg class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Sweet Moments Delivered!</span>
              </div>
              <p class="text-[10.5px] text-ink-muted">Your order is delivered and ready for your celebration. Enjoy every sweet bite!</p>
            </div>
          `);else if(c||u){if(s&&(s.innerHTML=`
            <div class="relative w-20 h-20 mx-auto flex items-center justify-center animate-scaleIn">
              <div class="absolute inset-0 rounded-full border-4 border-emerald-200 animate-pulse"></div>
              <div class="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white shadow-rose-sm flex items-center justify-center">
                <svg class="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
            </div>
          `),n){const a=t.paymentPlan==="cod"&&!u?"Order Accepted &bull; Pay on Delivery":"Payment Confirmed &bull; Order Accepted";n.innerHTML=`
            <div class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10.5px] font-black uppercase tracking-wider shadow-xs animate-scaleIn">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>${a}</span>
            </div>
          `}if(o&&(o.textContent=t.paymentPlan==="cod"&&!u?`Great news, ${t.customerName}! Bole Kitchen accepted your Pay on Delivery order.`:`Great news, ${t.customerName}! Bole Kitchen confirmed your payment and accepted your order.`),r){const a=t.paymentPlan==="cod"&&!u?"Order Accepted (Pay on Delivery)":"Payment Verified by Bole Kitchen",h=t.paymentPlan==="cod"&&!u?`Your order is accepted! Our bakers are preparing your cake fresh. Pay ${fmtETB(t.total)} upon delivery.`:"Your transfer screenshot was verified and accepted. Our bakers are now preparing your cake fresh for your delivery window!";r.innerHTML=`
            <div class="w-full bg-emerald-50 rounded-2xl p-3.5 border-2 border-emerald-300 shadow-rose-xs space-y-1.5 text-left animate-scaleIn">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 text-emerald-900 font-extrabold text-xs">
                  <svg class="w-4 h-4 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>${a}</span>
                </div>
                <span class="text-[9.5px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full">Accepted</span>
              </div>
              <p class="text-[10.5px] text-emerald-900/80 leading-relaxed font-medium">
                ${h}
              </p>
            </div>
          `}}else{const a=t.paymentPlan==="cod";s&&(s.innerHTML=`
            <div class="relative w-20 h-20 mx-auto flex items-center justify-center shrink-0">
              <div class="absolute inset-0 rounded-full border-[3px] border-amber-200 border-t-amber-500 animate-spin" style="animation-duration: 2s;"></div>
              <div class="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-amber-400 text-white shadow-rose-sm flex items-center justify-center">
                <svg class="w-7 h-7 text-white animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
            </div>
          `),n&&(n.innerHTML=`
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-[10.5px] font-extrabold uppercase tracking-wider shadow-xs">
              <span class="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              <span>${a?"Pending Confirmation \u2022 Pay on Delivery":"Payment On Pending"}</span>
            </div>
          `),o&&(o.textContent=a?`Thank you, ${t.customerName}! Your Cash on Delivery order is awaiting confirmation at MAK CAKE Bole Kitchen.`:`Thank you, ${t.customerName}! Your payment verification is in progress at MAK CAKE Bole Kitchen.`),r&&(r.innerHTML=`
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
                    <div class="text-[11px] font-extrabold text-ink">${a?"Bole Kitchen Order Confirmation":"Bole Kitchen Verification"}</div>
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
                <span>${a?"Pay "+fmtETB(t.total)+" on delivery":"Payment will be approved shortly"}</span>
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
          `,updateSuccessCountdownUI())}}function openOrderSuccessPage(e){lastSubmittedOrderId=String(e.id),document.getElementById("success-order-id").textContent=`#ORD-${e.id}`,document.getElementById("success-order-sub").textContent=`Thank you, ${e.customerName}! Your order is now live in MAK CAKE Bole Kitchen.`,document.getElementById("success-order-card").innerHTML=`
        <div class="flex items-center gap-3 pb-2.5 border-b border-blush-100">
          <img src="${e.cakeImg||SVG_CAKE_FALLBACK}" class="w-12 h-12 rounded-xl object-cover shrink-0" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
          <div class="min-w-0 flex-1">
            <div class="font-extrabold text-ink truncate">${e.cakeName}</div>
            <div class="text-[11px] text-ink-muted">${e.deliveryDate} \u2022 ${e.timeSlot}</div>
          </div>
        </div>
        <div class="flex justify-between text-[11px]"><span class="text-ink-muted">Address</span><span class="font-bold text-ink truncate max-w-[65%]">${e.address}</span></div>
        <div class="flex justify-between text-[11px] items-center"><span class="text-ink-muted">Payment</span><span class="font-bold text-ink flex items-center gap-1.5">${getBrandLogo(e.paymentMethod,"w-4 h-4")} <span>${e.paymentMethod}</span></span></div>
        <div class="flex justify-between text-xs font-extrabold pt-1 border-t border-blush-100"><span class="text-ink">Total</span><span class="text-berry">${fmtETB(e.total)}</span></div>
      `,startSuccessCountdown(),document.getElementById("order-success-page").classList.remove("hidden"),updateSuccessPageLiveStatus(),updateSuccessNotifBanner(e.id,e.pushEnabled?"active":"prompt"),checkAndPromptOrderNotifications(e.id)}let swRegistration=null;async function initPushNotifications(){if("serviceWorker"in navigator){try{swRegistration=await navigator.serviceWorker.register("./sw.js"),console.log("MAK CAKE Service Worker registered:",swRegistration.scope)}catch(e){console.log("SW registration notice:",e.message)}navigator.serviceWorker.addEventListener("message",e=>{e.data&&e.data.type==="OPEN_ORDER_TRACKER"&&e.data.orderId&&openTrackerSheet(String(e.data.orderId))})}}function isIOSDevice(){return/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1}function isStandalonePWA(){return"standalone"in window.navigator&&window.navigator.standalone||window.matchMedia("(display-mode: standalone)").matches}function isPushSupported(){return"Notification"in window}function checkAndPromptOrderNotifications(e){const t=state.orders.find(s=>String(s.id)===String(e));if(t){if(t.pushEnabled){updateSuccessNotifBanner(e,"active");return}if(t.notifDismissed){updateSuccessNotifBanner(e,"dismissed");return}setTimeout(()=>{const s=document.getElementById("order-notif-permission-modal");s&&s.classList.remove("hidden")},450)}}function dismissOrderNotificationPrompt(){const e=document.getElementById("order-notif-permission-modal");e&&e.classList.add("hidden");const t=state.orders.find(s=>String(s.id)===String(lastSubmittedOrderId));t&&(t.notifDismissed=!0),saveState(),updateSuccessNotifBanner(lastSubmittedOrderId,"dismissed"),showCustomerToast("You can turn on notifications anytime")}function openOrderNotifPromptDirect(){const e=document.getElementById("order-notif-permission-modal");e&&e.classList.remove("hidden")}function openIosInstructionModal(){const e=document.getElementById("ios-pwa-instruction-modal");e&&e.classList.remove("hidden")}async function handleCustomerTurnOnNotifs(){const e=document.getElementById("order-notif-permission-modal");if(e&&e.classList.add("hidden"),isIOSDevice()&&!isStandalonePWA()){const t=document.getElementById("ios-pwa-instruction-modal");t&&t.classList.remove("hidden");return}if(!isPushSupported()){showCustomerToast("Push notifications are not supported on this browser. Live tracking is active on your screen!"),updateSuccessNotifBanner(lastSubmittedOrderId,"unsupported");return}try{const t=await Notification.requestPermission();if(t==="granted")await registerDevicePush(lastSubmittedOrderId),showCustomerToast(`Notifications Enabled! \u{1F514}
We'll keep you updated about your order.`),markOrderNotificationsActive(lastSubmittedOrderId),dispatchBrowserNotification("MAK CAKE Addis Ababa \u{1F382}",`Notifications enabled! We'll alert you when order #ORD-${lastSubmittedOrderId} is confirmed or ready.`,lastSubmittedOrderId);else if(t==="denied"){state.notifDeniedPermanently=!0,saveState();const s=document.getElementById("notif-denied-guide-modal");s&&s.classList.remove("hidden"),updateSuccessNotifBanner(lastSubmittedOrderId,"denied")}else updateSuccessNotifBanner(lastSubmittedOrderId,"dismissed")}catch(t){console.error("Notification permission error:",t),showCustomerToast("Notification request cancelled")}}function urlBase64ToUint8Array(e){const t="=".repeat((4-e.length%4)%4),s=(e+t).replace(/\-/g,"+").replace(/_/g,"/"),n=window.atob(s),r=new Uint8Array(n.length);for(let o=0;o<n.length;++o)r[o]=n.charCodeAt(o);return r}async function registerDevicePush(e){const t=state.orders.find(s=>String(s.id)===String(e));if(t&&(t.pushEnabled=!0,t.notifiedStatuses=t.notifiedStatuses||{},saveState()),"serviceWorker"in navigator)try{const s=await navigator.serviceWorker.ready;swRegistration=s;const n=typeof window.MAK_PUSH_BACKEND_URL=="string"&&window.MAK_PUSH_BACKEND_URL.trim()?window.MAK_PUSH_BACKEND_URL.trim().replace(/\/$/,""):"";if(n&&"PushManager"in window&&s.pushManager){let r=await s.pushManager.getSubscription();if(!r)try{const o=await fetch(n+"/api/push/vapid-key").then(u=>u.json()).catch(()=>null);if(o&&o.publicKey){const u=urlBase64ToUint8Array(o.publicKey);r=await s.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:u})}}catch(o){console.log("PushManager subscription notice:",o.message)}r&&fetch(n+"/api/push/subscribe",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({orderId:e,subscription:r,customerName:t?t.customerName:"",phone:t?t.phone:""})}).catch(()=>{})}}catch(s){console.log("SW ready note:",s)}}function markOrderNotificationsActive(e){const t=state.orders.find(s=>String(s.id)===String(e));t&&(t.pushEnabled=!0,t.notifiedStatuses=t.notifiedStatuses||{},saveState()),updateSuccessNotifBanner(e,"active")}function updateSuccessNotifBanner(e,t){const s=document.getElementById("success-notif-status-banner");s&&(t==="active"?s.innerHTML=`
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
        `:t==="denied"?s.innerHTML=`
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
        `:s.innerHTML=`
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
        `)}function sendOrderStatusPush(e,t){const s=state.orders.find(c=>String(c.id)===String(e));if(!s)return;s.notifiedStatuses=s.notifiedStatuses||{};const n=t==="Pending"?"Payment Pending":t==="Confirmed"?"Approved":t==="Ready"?"Completed":t;if(s.notifiedStatuses[n]){console.log(`Notification already sent for order #${e} status: ${n}. Skipping duplicate.`);return}s.notifiedStatuses[n]=!0,saveState();let r=`MAK CAKE \u2014 #ORD-${s.id}`,o="";n==="Payment Pending"||n==="Received"?o=`Your order has been received! \u{1F382} MAK CAKE has received your order (#ORD-${s.id}).`:n==="Approved"?o=`Your order is confirmed! \u2728 We're getting everything ready for order #ORD-${s.id}.`:n==="Completed"?o=`Your cake order is ready! \u{1F389} Thank you for choosing MAK CAKE (#ORD-${s.id}).`:o=`Your order #ORD-${s.id} status is now: ${n}.`,state.notifications.unshift({id:Date.now(),title:r,msg:o,time:"Just now",orderId:s.id}),state.unreadNotifs++,playCustomerNotificationSound(n),isPushSupported()&&Notification.permission==="granted"&&dispatchBrowserNotification(r,o,s.id);const u=typeof window.MAK_PUSH_BACKEND_URL=="string"&&window.MAK_PUSH_BACKEND_URL.trim()?window.MAK_PUSH_BACKEND_URL.trim().replace(/\/$/,""):"";u&&fetch(u+"/api/push/send-status",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({orderId:s.id,status:n})}).catch(()=>{})}function dispatchBrowserNotification(e,t,s){const n={body:t,icon:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=192&auto=format&fit=crop&q=80",badge:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=96&auto=format&fit=crop&q=80",tag:`mak-order-${s}`,renotify:!0,data:{orderId:s,url:`/?track=${s}`}};if(navigator.serviceWorker&&navigator.serviceWorker.controller){navigator.serviceWorker.controller.postMessage({type:"SHOW_NOTIFICATION",title:e,options:n});return}swRegistration&&swRegistration.showNotification?swRegistration.showNotification(e,n).catch(r=>{console.log("SW notification fallback:",r),tryFallbackNotification(e,n,s)}):tryFallbackNotification(e,n,s)}function tryFallbackNotification(e,t,s){try{const n=new Notification(e,t);n.onclick=function(){window.focus(),openTrackerSheet(String(s)),n.close()}}catch(n){console.log("Fallback notification note:",n)}}let successCountdownInterval=null,successSecondsRemaining=1200;function startSuccessCountdown(){successCountdownInterval&&clearInterval(successCountdownInterval),successSecondsRemaining=1200,updateSuccessCountdownUI(),successCountdownInterval=setInterval(()=>{successSecondsRemaining--,successSecondsRemaining<=0&&(clearInterval(successCountdownInterval),successSecondsRemaining=0),updateSuccessCountdownUI()},1e3)}function updateSuccessCountdownUI(){const e=document.getElementById("success-countdown-timer"),t=document.getElementById("success-countdown-bar");if(!e)return;const s=Math.floor(successSecondsRemaining/60),n=successSecondsRemaining%60;if(e.textContent=`${String(s).padStart(2,"0")}:${String(n).padStart(2,"0")}`,t){const r=Math.max(0,successSecondsRemaining/1200*100);t.style.width=r+"%"}}function backToHomeFromSuccess(){successCountdownInterval&&clearInterval(successCountdownInterval),document.getElementById("order-success-page").classList.add("hidden"),switchCustomerTab("home")}function openTrackerFromSuccess(){successCountdownInterval&&clearInterval(successCountdownInterval),document.getElementById("order-success-page").classList.add("hidden"),openTrackerSheet(lastSubmittedOrderId||"")}function backToHomeFromTracker(){closeTrackerSheet(),switchCustomerTab("home")}const _customerOrderStatusUnsubs=new Map;function syncCustomerOrdersStatusFromCloud(){if(window.MAK_ENABLE_FIRESTORE_ORDER_SYNC===!0){if(!window.FirebaseService||typeof window.FirebaseService.subscribeToOrderStatus!="function"){window.addEventListener("firebase-service-ready",()=>syncCustomerOrdersStatusFromCloud(),{once:!0});return}(state.orders||[]).forEach(e=>{const t=e&&e.firestoreDocId;if(!t||_customerOrderStatusUnsubs.has(String(t)))return;const s=window.FirebaseService.subscribeToOrderStatus(t,n=>{if(!n)return;const r=(state.orders||[]).find(a=>a.firestoreDocId===t||String(a.id)===String(n.id));if(!r)return;const o=n.status&&n.status!==r.status,u=n.paymentStatus&&n.paymentStatus!==r.paymentStatus;if(!o&&!u)return;n.status&&(r.status=n.status),n.paymentStatus&&(r.paymentStatus=n.paymentStatus),saveState();const c=document.getElementById("tracker-sheet");c&&!c.classList.contains("hidden")&&renderTrackerList();const i=document.getElementById("order-success-page");i&&!i.classList.contains("hidden")&&updateSuccessPageLiveStatus(),o&&(typeof playCustomerNotificationSound=="function"&&playCustomerNotificationSound(r.status),typeof showCustomerToast=="function"&&showCustomerToast(`Order #ORD-${r.id} is now ${r.status}`,"success"))});_customerOrderStatusUnsubs.set(String(t),s)})}}function openTrackerSheet(e=""){document.getElementById("tracker-search").value=e,trackerDateFilter="all",document.getElementById("tracker-sheet").classList.remove("hidden"),renderTrackerList(),syncCustomerOrdersStatusFromCloud()}function closeTrackerSheet(){document.getElementById("tracker-sheet").classList.add("hidden")}function setTrackerDateFilter(e){trackerDateFilter=e,renderTrackerList()}function getOrderDateCategory(e){const t=(e.deliveryDate||"").trim().toLowerCase();return t==="today"||t.includes("today")?"today":t==="tomorrow"||t.includes("tomorrow")?"tomorrow":"upcoming"}function renderTrackerList(){const e=document.getElementById("tracker-search").value.trim().toLowerCase(),t=state.orders.filter(p=>!e||String(p.id).includes(e)||p.phone&&p.phone.includes(e)||p.customerName&&p.customerName.toLowerCase().includes(e)||p.cakeName&&p.cakeName.toLowerCase().includes(e)),s=document.getElementById("tracker-list"),n=document.getElementById("tracker-date-filter-bar"),r=t.length,o=t.filter(p=>getOrderDateCategory(p)==="today").length,u=t.filter(p=>getOrderDateCategory(p)==="tomorrow").length,c=t.filter(p=>getOrderDateCategory(p)==="upcoming").length;if(n){const p=[{id:"all",label:"All Dates",count:r},{id:"today",label:"Today",count:o},{id:"tomorrow",label:"Tomorrow",count:u},{id:"upcoming",label:"Upcoming",count:c}];n.innerHTML=p.map(m=>{const l=trackerDateFilter===m.id;return`
            <button onclick="setTrackerDateFilter('${m.id}')" class="px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all active:scale-95 flex items-center gap-1.5 ${l?"btn-berry text-white shadow-rose-sm":"bg-white text-ink border border-blush-200/90 hover:bg-blush-50"}">
              <span>${m.label}</span>
              <span class="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold ${l?"bg-white/20 text-white":"bg-blush-100 text-berry"}">${m.count}</span>
            </button>
          `}).join("")}const i=trackerDateFilter==="all"?t:t.filter(p=>getOrderDateCategory(p)===trackerDateFilter);if(!i.length){s.innerHTML=`<div class="bg-white rounded-[20px] p-6 text-center text-xs text-ink-muted shadow-rose space-y-1">
          <div class="font-bold text-ink">No orders found</div>
          <div>No orders match the selected date classification or search term.</div>
        </div>`;return}const a=[{id:"today",title:"Today's Deliveries",badgeColor:"bg-emerald-100 text-emerald-800",dotColor:"bg-emerald-500",orders:i.filter(p=>getOrderDateCategory(p)==="today")},{id:"tomorrow",title:"Tomorrow's Deliveries",badgeColor:"bg-amber-100 text-amber-800",dotColor:"bg-amber-500",orders:i.filter(p=>getOrderDateCategory(p)==="tomorrow")},{id:"upcoming",title:"Upcoming & Scheduled Deliveries",badgeColor:"bg-purple-100 text-purple-800",dotColor:"bg-purple-500",orders:i.filter(p=>getOrderDateCategory(p)==="upcoming")}].filter(p=>p.orders.length>0);let h="",x=0;a.forEach(p=>{h+=`
          <div class="pt-2 pb-1 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full ${p.dotColor}"></span>
              <h4 class="text-xs font-black uppercase tracking-wider text-ink">${p.title}</h4>
            </div>
            <span class="px-2 py-0.5 rounded-full text-[9.5px] font-extrabold ${p.badgeColor}">${p.orders.length} ${p.orders.length===1?"Order":"Orders"}</span>
          </div>
        `,p.orders.forEach(m=>{x++;const l=m.status==="Pending"||m.status==="Payment Pending"?"Payment Pending":m.status==="Completed"?"Completed":"Approved",d=l==="Payment Pending"&&m.paymentPlan==="cod"?"Pending Confirmation":l,b=Math.max(0,STATUS_STAGES.indexOf(l)),f=l==="Completed"?"bg-emerald-50 text-emerald-700 border border-emerald-200":l==="Approved"?"bg-sky-50 text-sky-700 border border-sky-200":"bg-amber-50 text-amber-700 border border-amber-200";h+=`
            <div class="cake-card-animate bg-white rounded-[20px] p-3.5 shadow-rose border border-white space-y-2.5 mb-2.5" style="animation-delay: ${x*40}ms">
              <div class="flex items-start justify-between gap-2">
                <div>
                  <div class="flex items-center gap-1.5">
                    <span class="font-extrabold text-sm text-ink">Order #${m.id}</span>
                    <span class="px-1.5 py-0.5 rounded-md bg-blush-50 border border-blush-200 text-[9px] font-bold text-berry">${m.deliveryDate}</span>
                  </div>
                  <div class="text-[11px] text-ink-muted">${m.customerName} \u2022 ${m.phone}</div>
                </div>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${f}">${d}</span>
              </div>

              <!-- 3-Stage Progress Bar -->
              <div class="space-y-1">
                <div class="grid grid-cols-3 gap-1.5">
                  ${STATUS_STAGES.map((k,$)=>`<div class="h-1.5 rounded-full ${$<=b?b===2?"bg-emerald-500":"bg-berry":"bg-blush-200"}"></div>`).join("")}
                </div>
                <div class="grid grid-cols-3 text-[9px] font-bold text-center text-ink-muted">
                  <span>${m.paymentPlan==="cod"?"Order Placed":"Payment Pending"}</span><span>Approved</span><span>Completed</span>
                </div>
              </div>

              <!-- Cake Item Summary -->
              <div class="bg-blush-50 rounded-2xl p-2.5 flex items-center gap-2.5">
                <img src="${m.cakeImg||SVG_CAKE_FALLBACK}" class="w-11 h-11 rounded-xl object-cover shrink-0" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
                <div class="min-w-0 flex-1 text-[11px]">
                  <div class="font-bold text-ink truncate">${m.cakeName}</div>
                  <div class="text-ink-muted truncate">${m.size} \u2022 ${m.flavor}</div>
                  ${m.inscription?`<div class="text-berry font-semibold truncate">${getLuxurySvg("pen","w-3.5 h-3.5 inline-block mr-1")} "${m.inscription}"</div>`:""}
                </div>
                <div class="text-right shrink-0">
                  <div class="text-xs font-extrabold text-berry">${fmtETB(m.total)}</div>
                  <div class="text-[9px] font-bold ${m.paymentStatus==="Paid"?"text-emerald-600":"text-amber-600"}">${m.paymentStatus==="Paid"?"Paid":m.paymentPlan==="half"?"50% Deposit":m.paymentPlan==="cod"?"Pay on Delivery":"Verifying"}</div>
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
                  <span>Scheduled: <strong class="text-ink">${m.deliveryDate}</strong></span>
                </div>
                <div class="flex items-center gap-1 text-ink-muted font-medium">
                  <svg class="w-3 h-3 text-ink-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <span>${m.timeSlot}</span>
                </div>
              </div>
            </div>
          `})}),s.innerHTML=h}function openNotificationsSheet(){state.unreadNotifs=0,saveState(),updateCustomerBadges(),document.getElementById("notif-sheet").classList.remove("hidden"),renderNotificationsList()}let isClearingNotifs=!1;function renderNotificationsList(){const e=document.getElementById("notif-list"),t=document.getElementById("notif-clear-btn");if(e){if(!state.notifications||!state.notifications.length){t&&t.classList.add("hidden"),e.innerHTML=`
          <div class="bg-white rounded-[22px] p-8 text-center shadow-rose space-y-2.5 animate-view">
            <div class="w-14 h-14 mx-auto rounded-full bg-blush-100 text-berry flex items-center justify-center">${getLuxurySvg("bell","w-7 h-7")}</div>
            <div class="text-xs font-extrabold text-ink">No Notifications</div>
            <p class="text-[11px] text-ink-muted leading-relaxed">You're all caught up! Order updates and bakery alerts will appear here.</p>
          </div>
        `;return}t&&t.classList.remove("hidden"),e.innerHTML=state.notifications.map((s,n)=>`
        <div class="notif-item bg-white rounded-[18px] p-3.5 shadow-rose border border-white space-y-1 relative group" style="animation-delay: ${n*40}ms">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5 min-w-0">
              <span class="w-2 h-2 rounded-full bg-berry shrink-0"></span>
              <span class="text-xs font-extrabold text-ink truncate">${s.title}</span>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              <span class="text-[10px] text-ink-light">${s.time}</span>
              <button onclick="dismissSingleNotification(${s.id}, this)" aria-label="Clear notification" class="w-5 h-5 rounded-full hover:bg-blush-100 text-ink-light hover:text-berry flex items-center justify-center text-xs active:scale-90 transition-all">
                &times;
              </button>
            </div>
          </div>
          <p class="text-[11px] text-ink-muted leading-relaxed pl-3.5">${s.msg}</p>
        </div>
      `).join("")}}function clearNotifications(){if(isClearingNotifs)return;const e=document.getElementById("notif-list");if(!e)return;const t=Array.from(e.querySelectorAll(".notif-item"));if(!t.length){state.notifications=[],state.unreadNotifs=0,saveState(),updateCustomerBadges(),renderNotificationsList();return}isClearingNotifs=!0;const s=document.getElementById("notif-clear-btn");s&&s.classList.add("opacity-50","pointer-events-none");const n=110;t.forEach((o,u)=>{setTimeout(()=>{o.classList.add("is-clearing")},u*n)});const r=(t.length-1)*n+450;setTimeout(()=>{state.notifications=[],state.unreadNotifs=0,saveState(),updateCustomerBadges(),renderNotificationsList(),showCustomerToast("All notifications cleared"),isClearingNotifs=!1,s&&s.classList.remove("opacity-50","pointer-events-none")},r)}function dismissSingleNotification(e,t){const s=t?t.closest(".notif-item"):null;s?(s.classList.add("is-clearing"),setTimeout(()=>{state.notifications=(state.notifications||[]).filter(n=>n.id!==e),state.unreadNotifs=Math.max(0,state.unreadNotifs-1),saveState(),updateCustomerBadges(),renderNotificationsList()},430)):(state.notifications=(state.notifications||[]).filter(n=>n.id!==e),state.unreadNotifs=Math.max(0,state.unreadNotifs-1),saveState(),updateCustomerBadges(),renderNotificationsList())}function closeNotificationsSheet(){document.getElementById("notif-sheet").classList.add("hidden")}function openContactSheet(){const e=document.getElementById("notif-sheet");e&&e.classList.add("hidden");const t=document.getElementById("tracker-sheet");t&&t.classList.add("hidden");const s=document.getElementById("order-wizard-page");if(s&&!s.classList.contains("hidden"))return;typeof updateShopLocationLinks=="function"&&updateShopLocationLinks();const n=document.getElementById("contact-backdrop"),r=document.getElementById("contact-sheet");n&&n.classList.remove("hidden"),r&&(r.classList.remove("hidden"),requestAnimationFrame(()=>r.classList.remove("translate-y-full")))}function closeContactSheet(){const e=document.getElementById("contact-sheet"),t=document.getElementById("contact-backdrop");e&&e.classList.add("translate-y-full"),setTimeout(()=>{t&&t.classList.add("hidden"),e&&e.classList.contains("translate-y-full")&&e.classList.add("hidden")},260)}function renderRecentCreations(){const e=document.getElementById("home-recent-creations-grid");if(!e)return;const t=(state.creations||[]).filter(s=>s.published!==!1);if(!t.length){e.innerHTML='<div class="col-span-2 bg-white rounded-[20px] p-5 text-center text-xs text-ink-muted shadow-rose">No creations published yet. Check back soon!</div>';return}e.innerHTML=t.map((s,n)=>`
        <div onclick="openCreationModal('${s.id}')" class="cake-card-animate bg-white rounded-[22px] p-2.5 shadow-rose border border-white flex flex-col justify-between cursor-pointer active:scale-[0.98] hover:shadow-rose-lg transition-all group" style="animation-delay: ${n*35}ms">
          <!-- Large High-Visual Hero Cake Photo -->
          <div class="relative h-40 rounded-[18px] overflow-hidden bg-blush-100 shadow-2xs">
            <img loading="lazy" decoding="async" width="180" height="180" src="${s.img||SVG_CAKE_FALLBACK}" alt="${s.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.onerror=null; this.src=SVG_CAKE_FALLBACK;" />
            
            <!-- Sleek Glass Timestamp Pill (e.g. Today, 1 day ago, 2 days ago) -->
            <div class="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/55 backdrop-blur-md text-white text-[9.5px] font-bold shadow-xs flex items-center gap-1">
              <svg class="w-2.5 h-2.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>${s.date||"Today"}</span>
            </div>

            <!-- Inspect detail pill on hover -->
            <div class="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-xs text-white text-[8px] font-extrabold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-xs">
              <svg class="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <span>Details</span>
            </div>
          </div>

          <!-- Clean Card Info: Category & Cake Name -->
          <div class="p-1 pt-2 flex flex-col gap-0.5">
            <span class="text-[9px] font-black text-berry uppercase tracking-wider truncate">${s.category||"Luxury Cake"}</span>
            <h3 class="font-extrabold text-[12px] text-ink line-clamp-1 leading-snug group-hover:text-berry transition-colors">${s.title}</h3>
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
      `).join("")}function openCreationModal(e){const t=(state.creations||[]).find(a=>a.id===e);if(!t)return;selectedCreationForOrder=t;const s=document.getElementById("creation-modal-title");s&&(s.textContent=t.title);const n=document.getElementById("creation-modal-cat");n&&(n.textContent=t.category||"Luxury Cake");const r=document.getElementById("creation-modal-date");r&&(r.textContent=t.date||"Today");const o=document.getElementById("creation-modal-img");o&&(o.src=t.img||SVG_CAKE_FALLBACK);let u=state.cakes.find(a=>a.name.toLowerCase().includes(t.title.toLowerCase())||t.title.toLowerCase().includes(a.name.toLowerCase()));!u&&t.category&&(u=state.cakes.find(a=>a.category&&a.category.toLowerCase()===t.category.toLowerCase()));const c=document.getElementById("creation-modal-price");c&&(c.textContent=fmtETB(u?u.price:2650));const i=document.getElementById("creation-lightbox-modal");i&&i.classList.remove("hidden")}function closeCreationModal(){document.getElementById("creation-lightbox-modal").classList.add("hidden")}function inspectCreationPhotoFullscreen(){selectedCreationForOrder&&selectedCreationForOrder.img&&openFullscreenViewer(selectedCreationForOrder.img,selectedCreationForOrder.title+" (Kitchen Photo)")}function orderSimilarCreation(){closeCreationModal();const e=selectedCreationForOrder||(state.creations||[])[0];if(!e)return;let t=state.cakes.find(n=>n.name.toLowerCase().includes(e.title.toLowerCase())||e.title.toLowerCase().includes(n.name.toLowerCase()));!t&&e.category&&(t=state.cakes.find(n=>n.category&&n.category.toLowerCase()===e.category.toLowerCase()));const s={id:"cr-"+e.id,name:e.title,category:e.category||(t?t.category:"Luxury Custom Cakes"),price:t?t.price:2650,img:e.img||(t?t.img:SVG_CAKE_FALLBACK),desc:`Artisan creation design (${e.category||"Luxury Cake"}). Custom baked with matching piping, sponge & luxury finish.`,rating:5,reviews:32,inStock:!0};openOrderSheet(s),sheet.inscription=e.title.length>25?e.title.slice(0,25):e.title,updateSheetInsc(sheet.inscription),renderOrderSheet(),showCustomerToast(`\u{1F382} Started 6-step order wizard for "${e.title}"!`)}const CUST_I18N={en:{badge:"EN",searchPlaceholder:"Search cakes by name, flavor...",popularCakes:"Popular Cakes",viewAll:"View All \u2192",navHome:"Home",navCategories:"Categories",navMenu:"Menu",navFavorites:"Favorites",navCart:"Cart",toast:"Language: English"},am:{badge:"\u12A0\u121B",searchPlaceholder:"\u12AC\u12AE\u127D\u1295 \u1260\u1235\u121D \u12C8\u12ED\u121D \u1260\u1323\u12D5\u121D \u12ED\u1348\u120D\u1309...",popularCakes:"\u1270\u12C8\u12F3\u1305 \u12AC\u12AE\u127D",viewAll:"\u1201\u1209\u1295\u121D \u12ED\u1218\u120D\u12A8\u1271 \u2192",navHome:"\u1218\u1290\u123B",navCategories:"\u121D\u12F5\u1266\u127D",navMenu:"\u121C\u1291",navFavorites:"\u1270\u12C8\u12F3\u1306\u127D",navCart:"\u130B\u122A",toast:"\u124B\u1295\u124B: \u12A0\u121B\u122D\u129B"},om:{badge:"OM",searchPlaceholder:"Keekii maqaa ykn mi'aan barbaadi...",popularCakes:"Keekii Jaallatamoo",viewAll:"Hunda Ilaali \u2192",navHome:"Mana",navCategories:"Gosa",navMenu:"Meenuu",navFavorites:"Filatamoo",navCart:"Gaarii",toast:"Afaan: Afaan Oromoo"}};let currentCustomerLang=localStorage.getItem("mak_cust_lang")||"en";function toggleCustomerLangMenu(e){e&&e.stopPropagation();const t=document.getElementById("cust-lang-menu");t&&t.classList.toggle("hidden")}function setCustomerLanguage(e){CUST_I18N[e]||(e="en"),currentCustomerLang=e;try{localStorage.setItem("mak_cust_lang",e)}catch{}const t=CUST_I18N[e],s=document.getElementById("cust-lang-code-badge");s&&(s.textContent=t.badge);const n=document.getElementById("home-search-input");n&&(n.placeholder=t.searchPlaceholder);const r=document.getElementById("home-grid-heading");r&&(r.textContent=t.popularCakes);const o=Array.from(document.querySelectorAll('#c-tab-home button[onclick*="menu"]')).find(i=>i.dataset.i18nViewall==="1"||i.textContent.includes("View All"));o&&(o.dataset.i18nViewall="1",o.textContent=t.viewAll);const u={home:t.navHome,categories:t.navCategories,menu:t.navMenu,favorites:t.navFavorites,cart:t.navCart};document.querySelectorAll(".c-nav-btn").forEach(i=>{const a=i.dataset.ctab;if(a&&u[a]){const h=i.querySelector(":scope > span:not(.c-nav-indicator)");h&&(h.textContent=u[a])}}),document.querySelectorAll("#cust-lang-menu .cust-lang-opt").forEach(i=>{const a=i.dataset.clang===e;i.classList.toggle("bg-blush-50",a),i.classList.toggle("text-berry",a),i.classList.toggle("text-ink",!a);const h=i.querySelector(".lang-check");h&&h.classList.toggle("hidden",!a)});const c=document.getElementById("cust-lang-menu");c&&c.classList.add("hidden"),typeof showCustomerToast=="function"&&window._custLangInitDone&&showCustomerToast(t.toast),window._custLangInitDone=!0}document.addEventListener("click",e=>{const t=document.getElementById("cust-lang-menu"),s=document.getElementById("cust-lang-btn");t&&!t.classList.contains("hidden")&&!t.contains(e.target)&&(!s||!s.contains(e.target))&&t.classList.add("hidden")});
