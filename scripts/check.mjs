import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const languages = ['en', 'ar', 'tr'];
const expectedPrices = [
  [116, 136, 168], [136, 157, 178], [136, 157, 178],
  [157, 178, 200], [210, 231, 252], [210, 231, 252],
  [126, 147, 168], [84, 105, 136], [63, 95, null], [230, null, null]
];
const errors = [];
let checks = 0;

async function check(label, operation) {
  try {
    await operation();
    checks += 1;
    console.log(`PASS ${label}`);
  } catch (error) {
    errors.push(`${label}: ${error.message}`);
    console.error(`FAIL ${label}: ${error.message}`);
  }
}

const html = await readFile(path.join(root, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)]
  .map(match => match[1]).filter(isLocal).map(reference => reference.split(/[?#]/, 1)[0]);
const context = vm.createContext({ window: {} });
const scriptSources = new Map();

function isLocal(reference) {
  return reference && !/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(reference);
}

async function assertLocalFile(reference) {
  const clean = decodeURIComponent(reference.split(/[?#]/, 1)[0]);
  const target = path.resolve(root, clean.replace(/^\//, ''));
  assert.ok(target.startsWith(`${root}${path.sep}`), `Asset escapes project: ${reference}`);
  assert.ok((await stat(target)).isFile(), `Not a file: ${reference}`);
}

await check('HTML ids are unique', () => {
  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML id');
});

await check('HTML local assets exist', async () => {
  const references = [...html.matchAll(/\b(?:src|href)=["']([^"']+)["']/g)]
    .map(match => match[1]).filter(isLocal);
  await Promise.all(references.map(assertLocalFile));
});

for (const filename of scripts) {
  await check(`JavaScript syntax: ${filename}`, async () => {
    const source = await readFile(path.join(root, filename), 'utf8');
    scriptSources.set(filename, source);
    const script = new vm.Script(source, { filename });
    if (/\/(?:catalog|translations)\.js$/.test(filename)) {
      script.runInContext(context, { timeout: 1000 });
    }
  });
}

await check('English, Arabic and Turkish translations are complete', () => {
  const messages = context.window.STONE_I18N;
  assert.ok(messages, 'window.STONE_I18N missing');
  assert.deepEqual(Object.keys(messages).sort(), [...languages].sort());
  const expectedKeys = Object.keys(messages.en).sort();
  assert.ok(expectedKeys.length > 0, 'Empty English dictionary');
  for (const language of languages) {
    assert.deepEqual(Object.keys(messages[language]).sort(), expectedKeys, `${language}: different translation keys`);
    for (const [key, value] of Object.entries(messages[language])) {
      assert.equal(typeof value, 'string', `${language}.${key}: expected text`);
      assert.ok(value.trim(), `${language}.${key}: empty translation`);
    }
  }
  const usedKeys = [...html.matchAll(/\bdata-i18n(?:-placeholder)?=["']([^"']+)["']/g)]
    .map(match => match[1]);
  for (const source of scriptSources.values()) {
    usedKeys.push(...[...source.matchAll(/\bt\(["']([^"']+)["']\)/g)].map(match => match[1]));
  }
  for (const language of languages) {
    for (const key of usedKeys) assert.ok(Object.hasOwn(messages[language], key), `${language}.${key}: missing referenced translation`);
  }
});

await check('All ten products preserve the original USD/tonne prices', () => {
  const products = context.window.STONE_PRODUCTS;
  assert.ok(Array.isArray(products), 'window.STONE_PRODUCTS missing');
  assert.equal(products.length, 10);
  assert.equal(new Set(products.map(product => product.id)).size, 10, 'Duplicate product ids');
  for (let index = 0; index < products.length; index += 1) {
    const product = products[index];
    const code = `A-${String(index + 1).padStart(2, '0')}`;
    assert.equal(product.code, code);
    assert.deepEqual(Array.from(product.prices), expectedPrices[index], `${code}: altered prices`);
    for (const price of product.prices) assert.ok(price === null || (Number.isFinite(price) && price > 0), `${code}: invalid price`);
    assert.ok(['decorative', 'natural', 'volcanic'].includes(product.category), `${code}: unknown category`);
    assert.ok(typeof product.sizes === 'string' && product.sizes.trim(), `${code}: missing sizes`);
    for (const language of languages) {
      for (const field of ['name', 'desc']) {
        assert.ok(typeof product[field]?.[language] === 'string' && product[field][language].trim(), `${code}: missing ${language} ${field}`);
      }
      assert.ok(Array.isArray(product.uses?.[language]) && product.uses[language].length > 0, `${code}: missing ${language} uses`);
      assert.ok(product.uses[language].every(use => typeof use === 'string' && use.trim()), `${code}: empty ${language} use`);
      assert.equal(typeof product.note?.[language], 'string', `${code}: missing ${language} note`);
    }
  }
});

await check('Every catalog photograph exists', async () => {
  assert.ok(Array.isArray(context.window.STONE_PRODUCTS), 'Catalog did not load');
  await Promise.all(context.window.STONE_PRODUCTS.map(product => assertLocalFile(product.img)));
});

await check('Local CSS assets exist', async () => {
  const styles = [...html.matchAll(/<link\b[^>]*\bhref=["']([^"']+\.css(?:\?[^"']*)?)["'][^>]*>/gi)]
    .map(match => match[1]).filter(isLocal).map(reference => reference.split(/[?#]/, 1)[0]);
  for (const filename of styles) {
    const css = await readFile(path.join(root, filename), 'utf8');
    const urls = [...css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)].map(match => match[1].trim()).filter(isLocal);
    for (const reference of urls) await assertLocalFile(path.join(path.dirname(filename), reference));
  }
});

if (errors.length) {
  console.error(`\n${errors.length} check(s) failed.`);
  process.exitCode = 1;
} else {
  console.log(`\n${checks} checks passed. Browser interaction and layout checks remain separate.`);
}
