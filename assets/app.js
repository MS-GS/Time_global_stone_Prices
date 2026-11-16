(() => {
  'use strict';

  const products = window.STONE_PRODUCTS;
  const pricing = window.STONE_PRICING;
  const translations = window.STONE_I18N;
  const languages = ['en', 'ar', 'tr'];
  const storageKey = 'time-global-language';
  const $ = (id) => document.getElementById(id);
  const state = { language: 'en', category: 'all', search: '', packing: 0, sort: 'featured' };
  const languageNames = { en: 'English', ar: 'العربية', tr: 'Türkçe' };
  const languageToggle = $('languageToggle');
  const languageMenu = $('languageMenu');
  const languageOptions = Array.from(document.querySelectorAll('[data-language-choice]'));
  const t = (key) => translations[state.language][key] ?? translations.en[key] ?? key;
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const price = (value) => state.language === 'tr'
    ? `<span class="price-number">${new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 }).format(value * pricing.usdTry)}</span><span class="price-currency">TL</span>`
    : `$${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value)}`;
  const normalize = (value) => value.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase().replace(/ı/g, 'i');
  const packingNames = () => [t('bigBag'), t('packs'), t('cage')];

  function setText(element, value) {
    // Only line breaks are allowed in translated text; no translated HTML executes.
    const lines = value.split(/<br\s*\/?>/i);
    element.replaceChildren(...lines.flatMap((line, index) => index ? [document.createElement('br'), document.createTextNode(line)] : [document.createTextNode(line)]));
  }

  function matchingProducts(printAll = false) {
    const query = normalize(state.search.trim());
    const list = products.filter((product) => printAll || (
      (state.category === 'all' || product.category === state.category) &&
      (!query || normalize([product.code, ...Object.values(product.name), ...Object.values(product.desc), ...Object.values(product.uses).flat()].join(' ')).includes(query))
    ));
    if (!printAll && state.sort !== 'featured') {
      list.sort((a, b) => {
        const first = a.prices[state.packing];
        const second = b.prices[state.packing];
        if (first === null) return second === null ? 0 : 1;
        if (second === null) return -1;
        return state.sort === 'low' ? first - second : second - first;
      });
    }
    return list;
  }

  function renderGrid(printAll = false) {
    const list = matchingProducts(printAll);
    const names = packingNames();
    $('productGrid').innerHTML = list.map((product) => {
      const name = product.name[state.language];
      return `<div class="col-sm-6 col-lg-4"><article class="stone-card" id="stone-${product.id}">
        <div class="stone-image"><img src="${product.img}" alt="${escapeHTML(name)}" loading="lazy" decoding="async" width="600" height="420"><span class="product-code" dir="ltr">${product.code}</span><span class="stone-category">${escapeHTML(t(product.category))}</span></div>
        <div class="stone-body"><div class="stone-title-row"><h3>${escapeHTML(name)}</h3><a href="#quote" class="stone-link" aria-label="${escapeHTML(`${t('enquire')}: ${name}`)}">↗</a></div>
        <p class="stone-description">${escapeHTML(product.desc[state.language])}</p>
        <div class="use-tags" aria-label="${escapeHTML(t('bestFor'))}">${product.uses[state.language].map((use) => `<span>${escapeHTML(use)}</span>`).join('')}</div>
        <div class="stone-sizes"><span><svg class="ui-icon" viewBox="0 0 16 16" aria-hidden="true"><use href="assets/icons/social.svg#rulers"></use></svg>${escapeHTML(t('sizeLabel'))}</span><span><bdi dir="ltr">${escapeHTML(product.sizes)}</bdi> ${escapeHTML(t('cm'))}</span></div>
        <p class="price-basis">${escapeHTML(t('priceUnit'))}</p>
        <div class="stone-prices">${product.prices.map((value, index) => `<div class="price-option ${index === state.packing ? 'selected' : ''} ${value === null ? 'on-request' : state.language === 'tr' ? 'converted-price' : ''}"><span class="packing-name">${escapeHTML(names[index])}</span><strong class="price-value" dir="${value === null ? 'auto' : 'ltr'}">${value === null ? escapeHTML(t('noPrice')) : price(value)}</strong><small class="price-unit">${value === null ? '—' : escapeHTML(t('perTonne'))}</small></div>`).join('')}</div>
        ${product.note[state.language] ? `<p class="stone-note">${escapeHTML(product.note[state.language])}</p>` : ''}
        <a href="#quote" class="card-enquire"><span>${escapeHTML(t('enquire'))}</span><span aria-hidden="true">↗</span></a></div>
      </article></div>`;
    }).join('');
    $('resultCount').textContent = t('resultCount').replace('{count}', list.length);
    $('emptyState').hidden = list.length !== 0;
  }

  function setLanguage(language, remember = false) {
    if (!languages.includes(language)) language = 'en';
    state.language = language;
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    const bootstrapPath = `assets/vendor/bootstrap${language === 'ar' ? '.rtl' : ''}.min.css`;
    if ($('bs-css').getAttribute('href') !== bootstrapPath) $('bs-css').href = bootstrapPath;
    document.querySelectorAll('[data-i18n]').forEach((element) => setText(element, t(element.dataset.i18n)));
    document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => { element.placeholder = t(element.dataset.i18nPlaceholder); });
    $('currentLanguage').textContent = languageNames[language];
    $('currentLanguage').lang = language;
    languageToggle.setAttribute('aria-label', `${t('currentLanguageLabel')}: ${languageNames[language]}`);
    languageMenu.setAttribute('aria-label', t('languageMenuLabel'));
    languageOptions.forEach((option) => option.setAttribute('aria-checked', String(option.dataset.languageChoice === language)));
    document.querySelector('.main-nav').setAttribute('aria-label', t('navLabel'));
    document.querySelector('.filter-list').setAttribute('aria-label', t('categoriesLabel'));
    document.querySelector('.facts-strip').setAttribute('aria-label', t('orderInfo'));
    document.querySelector('.brand').setAttribute('aria-label', t('homeLabel'));
    $('heroImage').alt = products[0].name[language];
    document.querySelector('.hero-swatch img').alt = products[1].name[language];
    $('exchangeRateNote').hidden = language !== 'tr';
    const rateDate = new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${pricing.rateDate}T12:00:00Z`));
    const rateValue = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 4, maximumFractionDigits: 4 }).format(pricing.usdTry);
    $('exchangeRateDetails').textContent = t('fxReference').replace('{date}', rateDate).replace('{rate}', rateValue);
    $('exchangeRateSource').href = pricing.source;
    document.title = `TIME GLOBAL — ${t('navCollection')} · ${t('unit')}`;
    renderGrid();
    if (remember) {
      try { localStorage.setItem(storageKey, language); } catch { /* A language choice still works when storage is blocked. */ }
      // Keep an explicitly shared language URL consistent with subsequent choices.
      const url = new URL(location.href);
      if (url.searchParams.has('lang')) {
        url.searchParams.set('lang', language);
        history.replaceState(null, '', url);
      }
    }
  }

  function resetCollection() {
    state.category = 'all';
    state.search = '';
    $('searchInput').value = '';
    document.querySelectorAll('[data-filter]').forEach((button) => {
      button.classList.toggle('active', button.dataset.filter === 'all');
      button.setAttribute('aria-pressed', String(button.dataset.filter === 'all'));
    });
    renderGrid();
  }

  function closeLanguageMenu(restoreFocus = false) {
    languageMenu.hidden = true;
    languageToggle.setAttribute('aria-expanded', 'false');
    if (restoreFocus) languageToggle.focus();
  }

  function openLanguageMenu() {
    languageMenu.hidden = false;
    languageToggle.setAttribute('aria-expanded', 'true');
    languageOptions.find((option) => option.dataset.languageChoice === state.language).focus();
  }

  languageToggle.addEventListener('click', () => languageMenu.hidden ? openLanguageMenu() : closeLanguageMenu());
  languageToggle.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      openLanguageMenu();
    }
  });
  languageOptions.forEach((option) => option.addEventListener('click', () => {
    setLanguage(option.dataset.languageChoice, true);
    closeLanguageMenu(true);
  }));
  languageMenu.addEventListener('keydown', (event) => {
    const index = languageOptions.indexOf(document.activeElement);
    if (event.key === 'Escape') { event.preventDefault(); closeLanguageMenu(true); }
    else if (event.key === 'Tab') closeLanguageMenu(true);
    else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? languageOptions.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + languageOptions.length) % languageOptions.length;
      languageOptions[next].focus();
    }
  });
  document.addEventListener('click', (event) => { if (!languageToggle.parentElement.contains(event.target)) closeLanguageMenu(); });
  document.addEventListener('focusin', (event) => { if (!languageToggle.parentElement.contains(event.target)) closeLanguageMenu(); });
  document.querySelectorAll('[data-language]').forEach((button) => button.addEventListener('click', () => {
    setLanguage(button.dataset.language, true);
    $('languageDialog').close();
  }));
  $('languageDialog').addEventListener('cancel', () => setLanguage(state.language, true));
  $('languageDialog').addEventListener('close', () => { document.body.classList.remove('choosing-language'); });
  document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => {
    state.category = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach((item) => {
      item.classList.toggle('active', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    renderGrid();
  }));
  $('searchInput').addEventListener('input', (event) => { state.search = event.target.value; renderGrid(); });
  $('packingSelect').addEventListener('change', (event) => { state.packing = Number(event.target.value); renderGrid(); });
  $('sortSelect').addEventListener('change', (event) => { state.sort = event.target.value; renderGrid(); });
  $('resetSearch').addEventListener('click', resetCollection);
  // Anchor links land below the sticky header, including its mobile navigation row.
  const header = document.querySelector('.site-header');
  const updateHeaderOffset = () => document.documentElement.style.setProperty('--header-height', `${Math.ceil(header.getBoundingClientRect().height)}px`);
  if ('ResizeObserver' in window) new ResizeObserver(updateHeaderOffset).observe(header);
  window.addEventListener('resize', updateHeaderOffset);
  updateHeaderOffset();
  // Print every product even if the on-screen catalogue has been filtered.
  window.addEventListener('beforeprint', () => renderGrid(true));
  window.addEventListener('afterprint', () => renderGrid());
  $('printCatalog').addEventListener('click', () => window.print());

  let savedLanguage = null;
  try { savedLanguage = localStorage.getItem(storageKey); } catch { /* Use browser language as a starting point. */ }
  const urlLanguage = new URLSearchParams(location.search).get('lang');
  const browserLanguage = navigator.language.split('-')[0];
  const explicitLanguage = languages.includes(urlLanguage) ? urlLanguage : languages.includes(savedLanguage) ? savedLanguage : null;
  setLanguage(explicitLanguage || (languages.includes(browserLanguage) ? browserLanguage : 'en'));
  if (!explicitLanguage) {
    document.body.classList.add('choosing-language');
    $('languageDialog').showModal();
  } else if (languages.includes(urlLanguage)) {
    setLanguage(urlLanguage, true);
  }
})();
