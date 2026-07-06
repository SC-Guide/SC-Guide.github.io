// ============================================================
// lang.js — Language & strings
// ============================================================

let currentLang = localStorage.getItem('lang') || 'en';

const STR = {
  en: {
    subtitle: 'A step-by-step guide to your skincare routine — from morning cleanse to bedtime',
    tabTitle: 'Skincare Guide — Planner',
    nav: {morning:'Morning', evening:'Evening', kit:'First Aid Kit', rules:'Rules', shops:'Shops', calendar:'Calendar'},
    searchPlaceholder: 'Search products…',
    recOnly: 'Recommended only',
    found: 'Found',
    noResults: 'Nothing found — try a different search.',
    statLabels: {morning:'MORNING STEPS', evening:'EVENING STEPS', kit:'KIT ITEMS', rules:'RULES'},
    kitSub: 'Products for flare-ups, irritation, or days without retinal.',
    shopsSub: 'Where the products on this list are usually sold.',
    recommended: 'recommended',
    luxAlt: 'luxury alternative',
    footerLine: 'Created from your personal skincare data · update as your routine evolves',
    footerCredit: '© 2026 · Anastasiia Vyshnevska',
    modalTitle: 'Routine for',
    morningLabel: '☀️ Day',
    eveningLabel: '🌙 Night',
    specialLabel: '✨ Extra care',
    doneLabel: 'Done',
    settingsTitle: 'Settings',
    startDateLabel: 'Retinal start date',
    resetLabel: 'Reset all marks',
    prevDay: '← Previous day',
    nextDay: 'Next day →',
    skinType: 'Skin Type',
    ingredients: 'Key Ingredients',
    usage: 'How to use',
    disclaimer: '⚠️ Disclaimer: This website provides general information for educational and navigational purposes only. It does not constitute medical advice, diagnosis, or treatment. All product recommendations are based on publicly available information and personal experience, not medical expertise. Always consult a qualified dermatologist or healthcare professional before starting any new skincare routine. Use of this information is at your own risk. The author assumes no responsibility for any adverse effects.'
  },
  ru: {
    subtitle: 'Пошаговое руководство по уходу за кожей — от утреннего умывания до сна',
    tabTitle: 'Skincare Guide — Планер',
    nav: {morning:'Утро', evening:'Вечер', kit:'Аптечка', rules:'Правила', shops:'Магазины', calendar:'Календарь'},
    searchPlaceholder: 'Поиск продуктов…',
    recOnly: 'Только рекомендованные',
    found: 'Найдено',
    noResults: 'Ничего не найдено — попробуйте другой запрос.',
    statLabels: {morning:'УТРЕННИЕ ШАГИ', evening:'ВЕЧЕРНИЕ ШАГИ', kit:'СРЕДСТВА В АПТЕЧКЕ', rules:'ПРАВИЛА'},
    kitSub: 'Средства для воспалений, раздражений или дней без ретиналя.',
    shopsSub: 'Где обычно продаются продукты из этого списка.',
    recommended: 'рекомендовано',
    luxAlt: 'люкс-альтернатива',
    footerLine: 'Создано на основе ваших личных данных по уходу · обновляйте по мере изменения рутины',
    footerCredit: '© 2026 · Анастасия Вышневская',
    modalTitle: 'Рутина на',
    morningLabel: '☀️ День',
    eveningLabel: '🌙 Ночь',
    specialLabel: '✨ Дополнительный уход',
    doneLabel: 'Выполнено',
    settingsTitle: 'Настройки',
    startDateLabel: 'Дата начала ретиналя',
    resetLabel: 'Сбросить все отметки',
    prevDay: '← Предыдущий день',
    nextDay: 'Следующий день →',
    skinType: 'Тип кожи',
    ingredients: 'Ключевые ингредиенты',
    usage: 'Как использовать',
    disclaimer: '⚠️ Предупреждение: Данный сайт предоставляет общую информацию для ознакомления и навигации. Это не является медицинской консультацией, диагнозом или лечением. Все рекомендации по продуктам основаны на общедоступной информации и личном опыте, а не на медицинской экспертизе. Перед началом использования любых средств обязательно проконсультируйтесь с дерматологом или специалистом. Использование информации осуществляется на ваш собственный риск. Автор не несёт ответственности за возможные негативные последствия.'
  }
};

function tr(field) {
  if (field == null) return '';
  if (typeof field === 'string') return field;
  return field[currentLang] != null ? field[currentLang] : (field.en || '');
}

function toggleLanguage() {
  currentLang = (currentLang === 'en') ? 'ru' : 'en';
  localStorage.setItem('lang', currentLang);
  renderAll();
  updateLangToggle();
}

function updateLangToggle() {
  const btn = document.getElementById('langToggle');
  if (btn) btn.textContent = currentLang === 'en' ? '🇷🇺 RU' : '🇬🇧 EN';
}