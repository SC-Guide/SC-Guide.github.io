// ===== УПРАВЛЕНИЕ ОТМЕТКАМИ "В НАЛИЧИИ" =====
let ownedProducts = JSON.parse(localStorage.getItem('ownedProducts')) || {};

function toggleOwned(productKey) {
  ownedProducts[productKey] = !ownedProducts[productKey];
  localStorage.setItem('ownedProducts', JSON.stringify(ownedProducts));
  renderAll();
}

function isOwned(productKey) {
  return !!ownedProducts[productKey];
}

function getProductKey(product, stepIndex, zone) {
  let name = product.name;
  if (typeof name === 'object') {
    name = name.en || Object.values(name)[0] || '';
  }
  const cleanName = name.replace(/\s/g, '_').toLowerCase();
  return `${zone}-${stepIndex}-${cleanName}-${product.price}`;
}

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
function tr(field) {
  if (field == null) return '';
  if (typeof field === 'string') return field;
  return field[currentLang] != null ? field[currentLang] : (field.en || '');
}

function shopChips(shops){
  return '<div class="shop-row">'+shops.map(s=>`<a class="shop-chip" href="${s.url}" target="_blank" rel="noopener">${tr(s.name)}${ICONS.link}</a>`).join('')+'</div>';
}

function productCard(p, zoneClass, stepIndex, zone) {
  const name = tr(p.name);
  const comment = tr(p.comment);
  const skin = tr(p.skinType||'');
  const ingredients = tr(p.ingredients||'');
  const usage = tr(p.usage||'');
  const key = getProductKey(p, stepIndex, zone);
  const owned = isOwned(key);
  const t = STR[currentLang];
  const ownedLabel = owned ? t.ownedLabel : t.notOwnedLabel;

  return `<div class="card product-card ${zoneClass}${p.lux?' lux-card':''}" 
         data-name="${name.toLowerCase()}" 
         data-comment="${comment.toLowerCase()}" 
         data-rec="${p.rec?1:0}"
         data-skin="${skin.toLowerCase()}"
         data-ingredients="${ingredients.toLowerCase()}"
         data-usage="${usage.toLowerCase()}"
         data-key="${key}">
    <div class="card-icon">${ICONS[p.icon]}</div>
    <div class="card-body">
      <div class="card-name-row">
        <div class="card-name">${name}</div>
        <div class="card-price">${p.price}</div>
      </div>
      ${p.rec?'<div class="star-badge"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'+STR[currentLang].recommended+'</div>':''}
      ${p.lux?'<div class="lux-badge">'+ICONS.lux+STR[currentLang].luxAlt+'</div>':''}
      <div class="card-comment">${comment}</div>
      ${p.shops && p.shops.length ? shopChips(p.shops) : ''}
      <div class="owned-toggle ${owned?'active':''}" onclick="event.stopPropagation(); toggleOwned('${key}');">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          ${owned ? '<path d="M20 6L9 17l-5-5"/>' : '<path d="M12 5v14M5 12h14"/>'}
        </svg>
        ${ownedLabel}
      </div>
    </div>
  </div>`;
}

function refCard(text, anchor){
  return `<a class="ref-card" href="${anchor}">${ICONS.ref}${tr(text)}</a>`;
}

function renderPath(container, steps, zoneClass, zoneName) {
  container.innerHTML = steps.map((s) => {
    let body = '';
    if(s.ref){
      body = refCard(s.ref, s.anchor || '#morning');
    } else if(s.split){
      body = `<div class="split">
        <div><div class="split-col-label">${tr(s.split.a.title)}</div><div class="card-row">${s.split.a.products.map(p=>productCard(p, zoneClass, s.num, zoneName)).join('')}</div></div>
        <div><div class="split-col-label">${tr(s.split.b.title)}</div><div class="card-row">${s.split.b.products.map(p=>productCard(p, zoneClass, s.num, zoneName)).join('')}</div></div>
      </div>`;
    } else {
      body = `<div class="card-row">${s.products.map(p=>productCard(p, zoneClass, s.num, zoneName)).join('')}</div>`;
    }
    return `<div class="step ${zoneClass}">
      <div class="step-node">${s.num}</div>
      <div class="step-label">${tr(s.label)}</div>
      ${body}
    </div>`;
  }).join('');
}

function getOwnedProductsForStep(products, stepIndex, zone) {
  return products.filter(p => {
    const key = getProductKey(p, stepIndex, zone);
    return isOwned(key);
  });
}