(() => {
  'use strict';

  const products = window.STONE_PRODUCTS;
  const translations = window.STONE_I18N;
  const languages = ['en', 'ar', 'tr'];
  const storageKey = 'time-global-language';
  const $ = (id) => document.getElementById(id);
  const state = { language: 'en', category: 'all', search: '', packing: 0, sort: 'featured' };
  const t = (key) => translations[state.language][key] ?? translations.en[key] ?? key;
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const price = (value) => `$${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value)}`;
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
        <div class="stone-sizes"><span>${escapeHTML(t('sizeLabel'))}</span><span><bdi dir="ltr">${escapeHTML(product.sizes)}</bdi> ${escapeHTML(t('cm'))}</span></div>
        <p class="price-basis">${escapeHTML(t('priceUnit'))}</p>
        <div class="stone-prices">${product.prices.map((value, index) => `<div class="price-option ${index === state.packing ? 'selected' : ''} ${value === null ? 'on-request' : ''}"><span class="packing-name">${escapeHTML(names[index])}</span><strong class="price-value" dir="${value === null ? 'auto' : 'ltr'}">${value === null ? escapeHTML(t('noPrice')) : price(value)}</strong><small class="price-unit">${value === null ? '—' : escapeHTML(t('perTonne'))}</small></div>`).join('')}</div>
        ${product.note[state.language] ? `<p class="stone-note">${escapeHTML(product.note[state.language])}</p>` : ''}
        <a href="#quote" class="card-enquire"><span>${escapeHTML(t('enquire'))}</span><span aria-hidden="true">↗</span></a></div>
      </article></div>`;
    }).join('');
    $('resultCount').textContent = t('resultCount').replace('{count}', list.length).replace('{total}', products.length);
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
    $('languageSelect').value = language;
    $('languageSelect').setAttribute('aria-label', t('language'));
    document.querySelector('.main-nav').setAttribute('aria-label', t('navLabel'));
    document.querySelector('.filter-list').setAttribute('aria-label', t('categoriesLabel'));
    document.querySelector('.facts-strip').setAttribute('aria-label', t('orderInfo'));
    document.querySelector('.brand').setAttribute('aria-label', t('homeLabel'));
    $('heroImage').alt = products[0].name[language];
    document.querySelector('.hero-swatch img').alt = products[1].name[language];
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

  $('languageSelect').addEventListener('change', (event) => setLanguage(event.target.value, true));
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
