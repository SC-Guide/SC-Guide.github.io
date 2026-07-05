// ===== ГЛАВНЫЙ ФАЙЛ: ИНИЦИАЛИЗАЦИЯ И РЕНДЕРИНГ =====
let currentLang = localStorage.getItem('lang') || 'en';

function toggleLanguage() {
  currentLang = (currentLang === 'en') ? 'ru' : 'en';
  localStorage.setItem('lang', currentLang);
  renderAll();
  updateLangToggle();
}

function updateLangToggle() {
  const btn = document.getElementById('langToggle');
  if (btn) {
    btn.textContent = currentLang === 'en' ? '🇷🇺 RU' : '🇬🇧 EN';
  }
}

// === РАЗДЕЛ "МОИ ПРОДУКТЫ" ===
function renderMyProducts() {
  const container = document.getElementById('my-products-container');
  if (!container) return;
  const t = STR[currentLang];
  const ownedList = [];

  morningSteps.forEach(step => {
    if (step.products) {
      step.products.forEach(p => {
        const key = getProductKey(p, step.num, 'morning');
        if (isOwned(key)) {
          ownedList.push({ product: p, category: 'morning', step: step.num, label: tr(step.label) });
        }
      });
    }
    if (step.split) {
      ['a','b'].forEach(side => {
        step.split[side].products.forEach(p => {
          const key = getProductKey(p, step.num, 'morning');
          if (isOwned(key)) {
            ownedList.push({ product: p, category: 'morning', step: step.num, label: tr(step.label) + ' (' + tr(step.split[side].title) + ')' });
          }
        });
      });
    }
  });

  eveningSteps.forEach(step => {
    if (step.products) {
      step.products.forEach(p => {
        const key = getProductKey(p, step.num, 'evening');
        if (isOwned(key)) {
          ownedList.push({ product: p, category: 'evening', step: step.num, label: tr(step.label) });
        }
      });
    }
  });

  kitGroups.forEach(group => {
    group.products.forEach(p => {
      const key = getProductKey(p, 0, 'kit');
      if (isOwned(key)) {
        ownedList.push({ product: p, category: 'kit', step: 0, label: tr(group.title) });
      }
    });
  });

  if (ownedList.length === 0) {
    container.innerHTML = `<div class="my-products-empty"><span class="empty-icon">🧴</span>${t.noOwnedProducts}</div>`;
    return;
  }

  const groups = {
    morning: { title: t.groupMorning, icon: '☀️', items: [] },
    evening: { title: t.groupEvening, icon: '🌙', items: [] },
    kit: { title: t.groupKit, icon: '🧴', items: [] }
  };
  ownedList.forEach(item => {
    if (item.category === 'morning') groups.morning.items.push(item);
    else if (item.category === 'evening') groups.evening.items.push(item);
    else if (item.category === 'kit') groups.kit.items.push(item);
  });

  let html = '<div class="my-products-grid">';
  for (const [key, group] of Object.entries(groups)) {
    if (group.items.length === 0) continue;
    html += `<div class="my-products-group">
      <div class="my-products-group-title"><span class="group-icon">${group.icon}</span> ${group.title}</div>
      <div class="card-row">`;
    group.items.forEach(item => {
      const p = item.product;
      const comment = tr(p.comment);
      const skin = tr(p.skinType||'');
      const ingredients = tr(p.ingredients||'');
      const usage = tr(p.usage||'');
      const key = getProductKey(p, item.step, item.category);
      html += `<div class="card product-card" data-name="${tr(p.name).toLowerCase()}" data-comment="${comment.toLowerCase()}" data-rec="${p.rec?1:0}" data-skin="${skin.toLowerCase()}" data-ingredients="${ingredients.toLowerCase()}" data-usage="${usage.toLowerCase()}" data-key="${key}">
        <div class="card-icon">${ICONS[p.icon]}</div>
        <div class="card-body">
          <div class="card-name-row">
            <div class="card-name">${tr(p.name)}</div>
            <div class="card-price">${p.price}</div>
          </div>
          ${p.rec?'<div class="star-badge"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'+STR[currentLang].recommended+'</div>':''}
          ${p.lux?'<div class="lux-badge">'+ICONS.lux+STR[currentLang].luxAlt+'</div>':''}
          <div class="card-comment">${comment}</div>
          ${p.shops && p.shops.length ? shopChips(p.shops) : ''}
          <div class="owned-toggle active" onclick="event.stopPropagation(); toggleOwned('${key}');">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            ${STR[currentLang].ownedLabel}
          </div>
        </div>
      </div>`;
    });
    html += `</div></div>`;
  }
  html += '</div>';
  container.innerHTML = html;
}

// === ГЛАВНАЯ ФУНКЦИЯ РЕНДЕРИНГА ===
function renderAll(){
  const t = STR[currentLang];
  document.documentElement.lang = currentLang;
  document.title = t.tabTitle;
  document.getElementById('siteSubtitle').textContent = t.subtitle;
  document.getElementById('search').placeholder = t.searchPlaceholder;
  document.getElementById('recToggleLabel').textContent = t.recOnly;
  document.getElementById('noResults').textContent = t.noResults;
  document.querySelectorAll('#mainNav a').forEach(a=>{ 
    a.textContent = t.nav[a.dataset.nav] || a.textContent;
    a.classList.toggle('active', a.getAttribute('href') === '#' + window.location.hash.replace('#',''));
  });
  document.getElementById('statMorningLbl').textContent = t.statLabels.morning;
  document.getElementById('statEveningLbl').textContent = t.statLabels.evening;
  document.getElementById('statKitLbl').textContent = t.statLabels.kit;
  document.getElementById('statRulesLbl').textContent = t.statLabels.rules;
  document.getElementById('titleMorning').textContent = t.nav.morning;
  document.getElementById('titleEvening').textContent = t.nav.evening;
  document.getElementById('titleKit').textContent = t.nav.kit;
  document.getElementById('titleRules').textContent = t.nav.rules;
  document.getElementById('titleShops').textContent = t.nav.shops;
  document.getElementById('titleCalendar').textContent = t.nav.calendar;
  document.getElementById('titleMyProducts').textContent = t.myProductsTitle;
  document.getElementById('subKit').textContent = t.kitSub;
  document.getElementById('subShops').textContent = t.shopsSub;
  document.getElementById('subMyProducts').textContent = t.myProductsSub;
  document.getElementById('footerLine').textContent = t.footerLine;
  document.getElementById('footerCredit').textContent = t.footerCredit;
  document.getElementById('footerDisclaimer').textContent = t.disclaimer;
  renderPath(document.getElementById('morning-path'), morningSteps, 'morning', 'morning');
  renderPath(document.getElementById('evening-path'), eveningSteps, 'evening', 'evening');
  document.getElementById('kit-groups').innerHTML = kitGroups.map(g=>`
    <div class="kit-group ${g.key}">
      <div class="kit-group-head">
        <div class="kit-group-icon">${ICONS[g.products[0].icon]}</div>
        <div>
          <div class="kit-group-title">${tr(g.title)}</div>
          <div class="kit-group-sub">${tr(g.sub)}</div>
        </div>
      </div>
      ${g.analysis?'<div class="kit-analysis">'+ICONS.note+'<div>'+tr(g.analysis)+'</div></div>':''}
      <div class="card-row">${g.products.map(p=>productCard(p, g.key, 0, 'kit')).join('')}</div>
    </div>
  `).join('');
  document.getElementById('rules-grid').innerHTML = rules.map((r,i)=>`
    <div class="rule${r.caution?' caution':''}">
      <div class="rule-num">${i+1}</div>
      <div class="rule-text">${r.caution?ICONS.warn:''}${tr(r.text)}</div>
    </div>
  `).join('');
  document.getElementById('shops-grid').innerHTML = shopsInfo.map(s=>`
    <div class="shop-card">
      <div class="shop-card-name"><a href="${s.url}" target="_blank" rel="noopener">${tr(s.name)}${ICONS.link}</a></div>
      <div class="shop-card-items">${tr(s.items)}</div>
    </div>
  `).join('');
  renderSnake();
  renderMyProducts();
  applyFilters();
  updateLangToggle();
}

// === ОБРАБОТЧИКИ ===
window.addEventListener('hashchange', () => {
  document.querySelectorAll('#mainNav a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + window.location.hash.replace('#',''));
  });
});

document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('prevMonthBtn').addEventListener('click', ()=>changeMonth(-1));
  document.getElementById('nextMonthBtn').addEventListener('click', ()=>changeMonth(1));
  document.getElementById('settingsBtn').addEventListener('click', openSettings);
  document.getElementById('langToggle').addEventListener('click', toggleLanguage);
  const saved=localStorage.getItem('calendarMonth');
  if(saved){ const parts=saved.split('-'); currentYear=parseInt(parts[0]); currentMonth=parseInt(parts[1]); }
  else { currentYear=2026; currentMonth=6; }
  renderAll();
});