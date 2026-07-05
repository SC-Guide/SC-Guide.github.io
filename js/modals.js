// ===== МОДАЛЬНЫЕ ОКНА =====
function openProductModal(card) {
  const nameEl = card.querySelector('.card-name');
  const priceEl = card.querySelector('.card-price');
  const commentEl = card.querySelector('.card-comment');
  const starBadge = card.querySelector('.star-badge');
  const luxBadge = card.querySelector('.lux-badge');
  const shopChips = card.querySelectorAll('.shop-chip');
  const iconHtml = card.querySelector('.card-icon')?.innerHTML || '🧴';
  const name = nameEl ? nameEl.textContent : '';
  const price = priceEl ? priceEl.textContent : '';
  const comment = commentEl ? commentEl.textContent : '';
  const isRec = !!starBadge;
  const isLux = !!luxBadge;
  const shops = Array.from(shopChips).map(el => ({ name: el.textContent.trim(), url: el.href }));

  const skin = card.dataset.skin || '';
  const ingredients = card.dataset.ingredients || '';
  const usage = card.dataset.usage || '';
  const t = STR[currentLang];

  let extraHtml = '';
  const items = [];
  if (skin) items.push({ icon: '👤', label: t.skinType, value: skin });
  if (ingredients) items.push({ icon: '🧪', label: t.ingredients, value: ingredients });
  if (usage) items.push({ icon: '📖', label: t.usage, value: usage });
  if (items.length) {
    extraHtml = `<div class="product-detail-extra">` +
      items.map(item => `
        <div class="extra-item">
          <div class="extra-icon">${item.icon}</div>
          <div class="extra-content">
            <div class="extra-label">${item.label}</div>
            <div class="extra-value">${item.value}</div>
          </div>
        </div>
      `).join('') +
    `</div>`;
  }

  let shopsHtml = '';
  if (shops.length) {
    shopsHtml = `<div style="margin-top: 6px; font-weight: 600; font-size: 13px; color: var(--text-soft);">${currentLang === 'en' ? 'Where to buy:' : 'Где купить:'}</div>
      <div class="product-detail-shops">` +
      shops.map(s => `
        <a href="${s.url}" target="_blank" rel="noopener">
          ${s.name} ${ICONS.link}
        </a>
      `).join('') +
    `</div>`;
  }

  const disclaimerHtml = `<div class="product-detail-disclaimer">${t.disclaimer}</div>`;

  const modalHtml = `
    <div class="modal-overlay product-modal" id="productModal" onclick="if(event.target===this) closeProductModal()">
      <div class="modal-box">
        <button class="modal-close" onclick="closeProductModal()">✕</button>
        <div class="product-detail-header">
          <div class="product-detail-icon">${iconHtml}</div>
          <div>
            <div class="product-detail-name">${name}</div>
            <div class="product-detail-price">${price}</div>
          </div>
        </div>
        <div class="product-detail-badges">
          ${isRec ? `<span style="background:var(--accent-dark);color:white;">${t.recommended}</span>` : ''}
          ${isLux ? `<span style="background:var(--accent);color:white;">${t.luxAlt}</span>` : ''}
        </div>
        <div class="product-detail-comment">${comment}</div>
        ${extraHtml}
        ${shopsHtml}
        ${disclaimerHtml}
      </div>
    </div>
  `;
  const old = document.getElementById('productModal');
  if (old) old.remove();
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function closeProductModal() {
  const el = document.getElementById('productModal');
  if (el) el.remove();
}

function openDayModal(dateStr){
  const parts=dateStr.split('-');
  const y=parseInt(parts[0]), m=parseInt(parts[1])-1, d=parseInt(parts[2]);
  showModalForDate(y,m,d);
}

function showModalForDate(y,m,d){
  const routine = getRoutineForDay(y,m,d);
  const done = isDone(y,m,d);
  const t = STR[currentLang];
  const dateObj = new Date(y,m,d);
  const dateFormatted = dateObj.toLocaleDateString(currentLang === 'en' ? 'en-US' : 'ru-RU', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
  const daysInMonth = new Date(y,m+1,0).getDate();
  const hasPrev = d>1, hasNext = d<daysInMonth;
  let morningHtml = routine.morning.map(item=>`<div class="step-item"><span class="step-label">${item.label}:</span> <span class="product-name">${item.products}</span></div>`).join('');
  let eveningHtml = routine.evening.map(item=>`<div class="step-item"><span class="step-label">${item.label}:</span> <span class="product-name">${item.products}</span></div>`).join('');
  const html = `
    <div class="modal-overlay" id="modalOverlay" onclick="if(event.target===this) closeModal()">
      <div class="modal-box">
        <button class="modal-close" onclick="closeModal()">✕</button>
        <h2>${t.modalTitle} ${dateFormatted}</h2>
        <div class="routine-block morning-block"><h4>${t.morningLabel}</h4>${morningHtml}</div>
        <div class="routine-block evening-block"><h4>${t.eveningLabel}</h4>${eveningHtml}</div>
        <div class="routine-block special-block"><h4>${t.specialLabel}</h4><p>${routine.special || '—'}</p></div>
        <div class="routine-block" style="background:var(--accent);">
          <label class="done-label"><input type="checkbox" ${done?'checked':''} onchange="toggleDoneFromModal('${getDayKey(y,m,d)}', this.checked)"> ${t.doneLabel}</label>
        </div>
        <div class="modal-nav">
          <button ${hasPrev?'':'disabled'} onclick="navigateDay('${getDayKey(y,m,d)}', -1)">${t.prevDay}</button>
          <button ${hasNext?'':'disabled'} onclick="navigateDay('${getDayKey(y,m,d)}', 1)">${t.nextDay}</button>
        </div>
      </div>
    </div>
  `;
  const old=document.getElementById('modalOverlay');
  if(old) old.remove();
  document.body.insertAdjacentHTML('beforeend', html);
}

function navigateDay(dateStr, delta){
  const parts=dateStr.split('-');
  let y=parseInt(parts[0]), m=parseInt(parts[1])-1, d=parseInt(parts[2]);
  d += delta;
  const daysInMonth = new Date(y,m+1,0).getDate();
  if(d<1||d>daysInMonth) return;
  closeModal();
  showModalForDate(y,m,d);
}

function toggleDoneFromModal(dateStr, checked){
  const key=dateStr;
  if(checked) doneDays[key]=true; else delete doneDays[key];
  localStorage.setItem('doneDays', JSON.stringify(doneDays));
  renderSnake();
}

function closeModal(){ const el=document.getElementById('modalOverlay'); if(el) el.remove(); }

function openSettings(){
  const t=STR[currentLang];
  const html=`
    <div class="modal-overlay settings-modal" id="settingsModal" onclick="if(event.target===this) closeModal()">
      <div class="modal-box">
        <button class="modal-close" onclick="closeModal()">✕</button>
        <h2>${t.settingsTitle}</h2>
        <label>${t.startDateLabel}</label>
        <input type="date" id="retinalStartInput" value="${retinalStart}">
        <button class="btn-reset" onclick="resetAll()">${t.resetLabel}</button>
        <div style="display:flex;gap:8px;margin-top:16px;justify-content:flex-end;">
          <button onclick="saveSettings()" style="background:var(--accent-dark);color:white;border:none;padding:8px 20px;border-radius:12px;font-weight:600;cursor:pointer;">${currentLang === 'en' ? 'Save' : 'Сохранить'}</button>
        </div>
      </div>
    </div>
  `;
  const old=document.getElementById('settingsModal');
  if(old) old.remove();
  document.body.insertAdjacentHTML('beforeend', html);
}

function saveSettings(){
  const input=document.getElementById('retinalStartInput');
  if(input){ retinalStart=input.value; localStorage.setItem('retinalStart', retinalStart); }
  closeModal();
  renderSnake();
}

function resetAll(){
  const confirmText = currentLang === 'en' ? 'Reset all "done" marks?' : 'Сбросить все отметки "Выполнено"?';
  if(confirm(confirmText)){ doneDays={}; localStorage.setItem('doneDays', JSON.stringify(doneDays)); renderSnake(); closeModal(); }
}

// Обработчик клика по карточке продукта (делегирование)
document.addEventListener('click', function(e) {
  const card = e.target.closest('.product-card');
  if (card) {
    if (e.target.closest('.shop-chip') || e.target.closest('.owned-toggle')) return;
    e.preventDefault();
    openProductModal(card);
  }
});