// ===== ПОИСК И ФИЛЬТР =====
const searchInput=document.getElementById('search');
const recToggle=document.getElementById('recToggle');

function applyFilters(){
  const q=searchInput.value.trim().toLowerCase();
  const onlyRec=recToggle.classList.contains('active');
  let visibleCount=0;
  document.querySelectorAll('.product-card:not(.my-products-grid .product-card)').forEach(card=>{
    const name=card.dataset.name;
    const comment=card.dataset.comment;
    const isRec=card.dataset.rec==='1';
    const matchesQuery=!q || name.includes(q) || comment.includes(q);
    const matchesRec=!onlyRec || isRec;
    const show=matchesQuery && matchesRec;
    card.style.display=show?'':'none';
    if(show) visibleCount++;
  });
  document.getElementById('noResults').style.display=visibleCount===0?'block':'none';
  document.getElementById('resultCount').textContent=(q||onlyRec)?`${STR[currentLang].found}: ${visibleCount}`:'';
}

searchInput.addEventListener('input', applyFilters);
recToggle.addEventListener('click', ()=>{ recToggle.classList.toggle('active'); applyFilters(); });