// ============================================================
// modals.js — Modal windows (product, settings, etc.)
// ============================================================

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

document.addEventListener('click', function(e) {
  const card = e.target.closest('.product-card');
  if (card) {
    if (e.target.closest('.shop-chip') || e.target.closest('.toggle-product')) return;
    e.preventDefault();
    openProductModal(card);
  }
});