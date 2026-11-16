# TIME GLOBAL stone collection

A responsive, static wholesale stone catalog in English, Arabic and Turkish. No build or package installation is required. Use a current Node.js release for the development helpers.

## Preview and checks

```sh
node scripts/serve.mjs
```

Open <http://127.0.0.1:4173>. Pass another port as an argument if needed. The preview server listens only on the local computer and serves public page assets.

```sh
node scripts/check.mjs
```

Checks cover JavaScript syntax, translation coverage, original prices, product content, image references and local assets. Review desktop, mobile and Arabic RTL layouts in a browser as well.

## Content and behavior

- `assets/catalog.js` contains the ten products and business-supplied base prices in **USD per metric tonne (1,000 kg)**, including stone packed in 18 kg bags. English and Arabic display USD. Turkish displays approximate TL conversions using the dated TCMB USD selling rate in `assets/pricing.js`, rounded to whole lira; the rate and date appear in the pricing notes. This is a reference conversion, not a fixed TL quotation. Prices are ex-factory; VAT, freight and destination costs are excluded. International orders start at 27 tonnes.
- Public supplier research in `pricing-research.md` provides nonbinding comparisons. It does not replace TIME GLOBAL prices or substantiate a lowest-price guarantee. `research-notes.md` records material guidance and sources.
- `assets/translations.js` contains all three languages. Arabic switches the page to RTL. The first visit offers a language picker; the selected language is remembered in browser `localStorage`. A `?lang=en`, `?lang=ar` or `?lang=tr` URL selects that language directly. Storage restrictions may prevent preferences surviving a reload.
- Filters, search, packing comparisons and price sorting run in the browser. Printing uses the browser print dialog.
- This is a browsing catalogue. Buyers call the existing business number to confirm details and arrange orders directly; WhatsApp and Instagram are secondary contact options. There is no online order form or checkout.
- The page scrolls above a separate WhatsApp contact dock, so the icon cannot cover prices or controls. Product photos live in `assets/images/`: nine newly supplied photos replace the old ones, and the previous pumice photo is retained as the missing replacement.
- Bootstrap 5.3.9 (both LTR and RTL stylesheets) is bundled in `assets/vendor/` with its MIT license. Google Fonts needs an internet connection; system fonts provide a fallback. The page and product photos are served from this repository.

Deploy the repository as a static site with `index.html`, `assets/` and the product photographs together.

## Icon attribution

The social, contact, navigation and catalog control icons are from [Bootstrap Icons 1.13.2](https://github.com/twbs/icons/tree/v1.13.2), copyright The Bootstrap Authors, under the MIT license. The 13 original SVGs, a shared `social.svg` sprite and the full `LICENSE-bootstrap-icons` are bundled in `assets/icons/`; these downloaded icons are served locally and need no CDN.
