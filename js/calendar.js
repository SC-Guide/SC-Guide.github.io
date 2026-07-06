// ============================================================
// calendar.js — Snake-style calendar logic
// ============================================================

let currentYear = 2026;
let currentMonth = 6;
const today = new Date();
const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
let retinalStart = localStorage.getItem('retinalStart') || '2026-07-01';
let doneDays = JSON.parse(localStorage.getItem('doneDays')) || {};

function getDayKey(y, m, d) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

function generateRoutine(y, m, d) {
  const date = new Date(y, m, d);
  const start = new Date(retinalStart);
  const diffDays = Math.floor((date - start) / (24 * 60 * 60 * 1000));
  const dayOfWeek = date.getDay();
  let azelaicActive = diffDays >= 14;
  let retinalSchedule = 'none';
  if (diffDays >= 0) {
    if (diffDays < 14) {
      const wd = date.getDay();
      if (wd === 1 || wd === 3 || wd === 5) retinalSchedule = 'retinal';
    } else if (diffDays < 35) {
      if (diffDays % 2 === 0) retinalSchedule = 'retinal';
    } else {
      retinalSchedule = 'retinal';
    }
  }
  let special = null;
  if (dayOfWeek === 0 && diffDays >= 14) {
    const weekNum = Math.floor(diffDays / 7);
    const specials = ['Clay mask (Caudalie Detox)', 'Recovery mask (Dr Organic)', 'Scrub (Nuxe Very Rose)', 'Clay mask (Caudalie Detox)'];
    special = specials[weekNum % specials.length];
  }
  return { azelaicActive, retinalSchedule, special };
}

function getRoutineForDay(y, m, d) {
  const auto = generateRoutine(y, m, d);
  let activeProducts;
  if (auto.azelaicActive) {
    const step3b = morningSteps.find(s => s.num === 3)?.split?.b?.products;
    activeProducts = step3b ? step3b.map(p => tr(p.name)).join(', ') : 'Azelaic acid';
  } else {
    const step3a = morningSteps.find(s => s.num === 3)?.split?.a?.products;
    activeProducts = step3a ? step3a.map(p => tr(p.name)).join(', ') : 'Vitamin C';
  }
  const morningStep1 = morningSteps.find(s => s.num === 1);
  const morningStep2 = morningSteps.find(s => s.num === 2);
  const morningStep4 = morningSteps.find(s => s.num === 4);
  const morningProducts = [
    { label: tr(morningStep1.label), products: morningStep1.products.map(p => tr(p.name)).join(', ') },
    { label: tr(morningStep2.label), products: morningStep2.products.map(p => tr(p.name)).join(', ') },
    { label: currentLang === 'en' ? 'Active' : 'Актив', products: activeProducts },
    { label: tr(morningStep4.label), products: morningStep4.products.map(p => tr(p.name)).join(', ') }
  ];
  const eveningStep1 = eveningSteps.find(s => s.num === 1);
  const eveningStep4 = eveningSteps.find(s => s.num === 4);
  const eveningStep5 = eveningSteps.find(s => s.num === 5);
  let retinalProducts;
  if (auto.retinalSchedule === 'retinal') {
    retinalProducts = eveningStep4.products.map(p => tr(p.name)).join(', ');
  } else {
    retinalProducts = tr({ ru: 'Отдых от ретиналя — только увлажнение', en: 'Rest from retinal — just moisturizing' });
  }
  const eveningProducts = [
    { label: tr(eveningStep1.label), products: eveningStep1.products.map(p => tr(p.name)).join(', ') },
    { label: currentLang === 'en' ? 'Second cleanse' : 'Второе очищение', products: tr({ ru: 'CeraVe Hydrating Cleanser или Round Lab Dokdo Cleanser (см. утро)', en: 'CeraVe Hydrating Cleanser or Round Lab Dokdo Cleanser (see morning)' }) },
    { label: currentLang === 'en' ? 'Toner' : 'Тонер', products: tr({ ru: 'Etude House SoonJung или Aveeno Calm + Restore (см. утро)', en: 'Etude House SoonJung or Aveeno Calm + Restore (see morning)' }) },
    { label: tr(eveningStep4.label), products: retinalProducts },
    { label: tr(eveningStep5.label), products: eveningStep5.products.map(p => tr(p.name)).join(', ') }
  ];
  return { morning: morningProducts, evening: eveningProducts, special: auto.special || '' };
}

function isDone(y, m, d) {
  return !!doneDays[getDayKey(y, m, d)];
}

function renderSnake() {
  const container = document.getElementById('snakeContainer');
  if (!container) return;
  const y = currentYear,
    m = currentMonth;
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const firstDay = new Date(y, m, 1).getDay();
  const monthName = new Date(y, m).toLocaleString(currentLang === 'en' ? 'en-US' : 'ru-RU', { month: 'long', year: 'numeric' });
  document.getElementById('calendarMonthLabel').textContent = monthName;
  let rows = [],
    cur = [];
  let offset = (firstDay === 0) ? 6 : firstDay - 1;
  for (let i = 0; i < offset; i++) cur.push(null);
  for (let d = 1; d <= daysInMonth; d++) { cur.push(d); if (cur.length === 7) { rows.push(cur); cur = []; } }
  if (cur.length > 0) { while (cur.length < 7) cur.push(null); rows.push(cur); }
  let html = '';
  rows.forEach((row, idx) => {
    const isReverse = idx % 2 === 1;
    html += `<div class="snake-row ${isReverse ? 'reverse' : ''}">`;
    row.forEach(day => {
      if (day === null) { html += `<div class="day-node" style="opacity:0;pointer-events:none;"><div class="day-circle" style="background:transparent;border:transparent;"></div></div>`; return; }
      const key = getDayKey(y, m, day);
      const done = isDone(y, m, day);
      const routine = getRoutineForDay(y, m, day);
      const hasSpecial = routine.special && routine.special.length > 0;
      const isToday = key === todayStr;
      let cls = 'day-circle';
      if (day % 2 === 0) cls += ' alt';
      if (done) cls += ' done';
      if (hasSpecial) cls += ' has-special';
      if (isToday) cls += ' today';
      const dayLabel = new Date(y, m, day).toLocaleString(currentLang === 'en' ? 'en-US' : 'ru-RU', { weekday: 'short' });
      html += `<div class="day-node" data-date="${key}"><div class="${cls}" onclick="openDayModal('${key}')">${day}</div><div class="day-label">${dayLabel}</div></div>`;
    });
    html += `</div>`;
  });
  html += `<svg class="snake-svg-overlay" id="snakeSvgOverlay"></svg>`;
  container.innerHTML = html;
  requestAnimationFrame(() => requestAnimationFrame(drawSnakeConnectors));
}

function drawSnakeConnectors() {
  const container = document.getElementById('snakeContainer');
  const svg = document.getElementById('snakeSvgOverlay');
  if (!container || !svg) return;
  const rect = container.getBoundingClientRect();
  svg.setAttribute('width', rect.width);
  svg.setAttribute('height', rect.height);
  svg.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
  const circles = Array.from(container.querySelectorAll('.day-node[data-date] .day-circle'));
  let paths = '';
  for (let i = 0; i < circles.length - 1; i++) {
    const a = circles[i],
      b = circles[i + 1];
    const sameRow = a.closest('.snake-row') === b.closest('.snake-row');
    const aR = a.getBoundingClientRect(),
      bR = b.getBoundingClientRect();
    const x1 = aR.left + aR.width / 2 - rect.left,
      y1 = aR.top + aR.height / 2 - rect.top;
    const x2 = bR.left + bR.width / 2 - rect.left,
      y2 = bR.top + bR.height / 2 - rect.top;
    const dx = x2 - x1,
      dy = y2 - y1,
      dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const ux = dx / dist,
      uy = dy / dist;
    const rA = aR.width / 2,
      rB = bR.width / 2;
    const sx = x1 + ux * rA,
      sy = y1 + uy * rA,
      ex = x2 - ux * rB,
      ey = y2 - uy * rB;
    if (sameRow) {
      paths += `<path class="snake-path" d="M ${sx.toFixed(1)} ${sy.toFixed(1)} L ${ex.toFixed(1)} ${ey.toFixed(1)}" />`;
    } else {
      const bulge = (x1 > rect.width / 2) ? 38 : -38;
      const midY = (sy + ey) / 2;
      paths += `<path class="snake-path" d="M ${sx.toFixed(1)} ${sy.toFixed(1)} C ${(sx + bulge).toFixed(1)} ${midY.toFixed(1)}, ${(ex + bulge).toFixed(1)} ${midY.toFixed(1)}, ${ex.toFixed(1)} ${ey.toFixed(1)}" />`;
    }
  }
  svg.innerHTML = paths;
}

let _resizeTimer = null;
window.addEventListener('resize', () => { clearTimeout(_resizeTimer); _resizeTimer = setTimeout(drawSnakeConnectors, 150); });

function openDayModal(dateStr) {
  const parts = dateStr.split('-');
  const y = parseInt(parts[0]),
    m = parseInt(parts[1]) - 1,
    d = parseInt(parts[2]);
  showModalForDate(y, m, d);
}

function showModalForDate(y, m, d) {
  const routine = getRoutineForDay(y, m, d);
  const done = isDone(y, m, d);
  const t = STR[currentLang];
  const dateObj = new Date(y, m, d);
  const dateFormatted = dateObj.toLocaleDateString(currentLang === 'en' ? 'en-US' : 'ru-RU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const hasPrev = d > 1,
    hasNext = d < daysInMonth;
  let morningHtml = routine.morning.map(item => `<div class="step-item"><span class="step-label">${item.label}:</span> <span class="product-name">${item.products}</span></div>`).join('');
  let eveningHtml = routine.evening.map(item => `<div class="step-item"><span class="step-label">${item.label}:</span> <span class="product-name">${item.products}</span></div>`).join('');
  const html = `
    <div class="modal-overlay" id="modalOverlay" onclick="if(event.target===this) closeModal()">
      <div class="modal-box">
        <button class="modal-close" onclick="closeModal()">✕</button>
        <h2>${t.modalTitle} ${dateFormatted}</h2>
        <div class="routine-block morning-block"><h4>${t.morningLabel}</h4>${morningHtml}</div>
        <div class="routine-block evening-block"><h4>${t.eveningLabel}</h4>${eveningHtml}</div>
        <div class="routine-block special-block"><h4>${t.specialLabel}</h4><p>${routine.special || '—'}</p></div>
        <div class="routine-block" style="background:var(--accent);">
          <label class="done-label"><input type="checkbox" ${done ? 'checked' : ''} onchange="toggleDoneFromModal('${getDayKey(y, m, d)}', this.checked)"> ${t.doneLabel}</label>
        </div>
        <div class="modal-nav">
          <button ${hasPrev ? '' : 'disabled'} onclick="navigateDay('${getDayKey(y, m, d)}', -1)">${t.prevDay}</button>
          <button ${hasNext ? '' : 'disabled'} onclick="navigateDay('${getDayKey(y, m, d)}', 1)">${t.nextDay}</button>
        </div>
      </div>
    </div>
  `;
  const old = document.getElementById('modalOverlay');
  if (old) old.remove();
  document.body.insertAdjacentHTML('beforeend', html);
}

function navigateDay(dateStr, delta) {
  const parts = dateStr.split('-');
  let y = parseInt(parts[0]),
    m = parseInt(parts[1]) - 1,
    d = parseInt(parts[2]);
  d += delta;
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  if (d < 1 || d > daysInMonth) return;
  closeModal();
  showModalForDate(y, m, d);
}

function toggleDoneFromModal(dateStr, checked) {
  const key = dateStr;
  if (checked) doneDays[key] = true;
  else delete doneDays[key];
  localStorage.setItem('doneDays', JSON.stringify(doneDays));
  renderSnake();
}

function closeModal() {
  const el = document.getElementById('modalOverlay');
  if (el) el.remove();
}

function changeMonth(delta) {
  currentMonth += delta;
  if (currentMonth > 11) { currentMonth = 0; currentYear++; }
  if (currentMonth < 0) { currentMonth = 11; currentYear--; }
  localStorage.setItem('calendarMonth', `${currentYear}-${currentMonth}`);
  renderSnake();
}

function openSettings() {
  const t = STR[currentLang];
  const html = `
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
  const old = document.getElementById('settingsModal');
  if (old) old.remove();
  document.body.insertAdjacentHTML('beforeend', html);
}

function saveSettings() {
  const input = document.getElementById('retinalStartInput');
  if (input) { retinalStart = input.value; localStorage.setItem('retinalStart', retinalStart); }
  closeModal();
  renderSnake();
}

function resetAll() {
  const confirmText = currentLang === 'en' ? 'Reset all "done" marks?' : 'Сбросить все отметки "Выполнено"?';
  if (confirm(confirmText)) { doneDays = {}; localStorage.setItem('doneDays', JSON.stringify(doneDays)); renderSnake(); closeModal(); }
}