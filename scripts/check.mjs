#!/usr/bin/env node
// Offline checks for the built client bundle: plugin contract, localization,
// stylesheet generation, saved-theme persistence and theme-file parsing.

import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const code = readFileSync(process.env.DSH_PURE_THEME_CLIENT || join(root, 'client.js'), 'utf8');

// --- minimal DOM -----------------------------------------------------------
const elements = new Map();
const headChildren = [];

function createElement(tagName) {
  return {
    tagName,
    id: '',
    dataset: {},
    textContent: '',
    style: {},
    children: [],
    appendChild(child) {
      this.children.push(child);
      if (child.id) elements.set(child.id, child);
      return child;
    },
    remove() {
      if (this.id) elements.delete(this.id);
      const index = headChildren.indexOf(this);
      if (index >= 0) headChildren.splice(index, 1);
    },
    click() {},
    querySelector() {
      return null;
    },
  };
}

const storage = new Map();
storage.set(
  'dsh-simple-theme:settings:v1',
  JSON.stringify({
    v: 3,
    palette: { sidebar: '#111111', canvas: '#202020', textPrimary: '#FFFFFF' },
    activeName: 'Legacy theme',
    activeSource: 'custom',
    savedThemes: [],
  }),
);

globalThis.BroadcastChannel = undefined;
globalThis.window = {
  __ModuleLoader__: {
    load(def) {
      globalThis.__plugin = def.factory(() => ReactStub);
    },
  },
  localStorage: {
    getItem: (key) => (storage.has(key) ? storage.get(key) : null),
    setItem: (key, value) => storage.set(key, String(value)),
    removeItem: (key) => storage.delete(key),
  },
  addEventListener() {},
  removeEventListener() {},
  crypto: { randomUUID: () => `test-${Math.random().toString(16).slice(2)}` },
  URL: { createObjectURL: () => 'blob:test', revokeObjectURL() {} },
};

globalThis.document = {
  head: { appendChild: (el) => headChildren.push(el) && el },
  body: { appendChild() {}, removeChild() {} },
  documentElement: {},
  getElementById: (id) => elements.get(id) || null,
  createElement,
  querySelector: () => null,
  querySelectorAll: () => [],
};

const ReactStub = {
  createElement: (type, props, ...children) => ({ type, props, children }),
  useState: (value) => [typeof value === 'function' ? value() : value, () => {}],
  useEffect: () => {},
  useRef: (value) => ({ current: value }),
  useMemo: (fn) => fn(),
  useCallback: (fn) => fn,
};

// --- load the bundle -------------------------------------------------------
// eslint-disable-next-line no-new-func
new Function(code)();
const plugin = globalThis.__plugin;
const api = plugin.__internals;

// --- plugin contract -------------------------------------------------------
assert.equal(plugin.name, 'dsh-pure-theme', 'plugin name');
assert.deepEqual(plugin.inject, ['slots', 'locale'], 'slots and locale are injected');

const effects = [];
const registrations = [];
const injections = [];
const dictionaries = [];
const registeredLocales = [];
let activeLocale = 'en';
const ctx = {
  effect(fn, label) {
    effects.push({ label, dispose: fn() });
  },
  locale: {
    bind: () => (key) => api.MESSAGES[activeLocale]?.[key] ?? api.MESSAGES.en[key] ?? key,
    register(namespace, dicts) {
      dictionaries.push({ namespace, dicts });
      registeredLocales.push(...Object.keys(dicts));
      return () => {};
    },
    subscribe() {
      return () => {};
    },
  },
  slots: {
    inject(name, callback) {
      injections.push(name);
      callback();
    },
    register(options, component) {
      registrations.push({ options, component });
      return () => {};
    },
  },
};

plugin.apply(ctx);
assert.equal(window.__dshPureTheme.state.activeName, 'Legacy theme', 'legacy settings are read');
assert.ok(storage.has('dsh-pure-theme:settings:v1'), 'legacy settings are copied to the new key');
assert.deepEqual(injections, ['settings.section'], 'registers into the top-level settings section slot');
assert.equal(registrations.length, 1, 'one settings section');
assert.equal(registrations[0].options.name, 'settings.section');
assert.equal(registrations[0].options.id, 'theme');
assert.equal(registrations[0].options.order, 1, 'sits right after General');
assert.equal(registrations[0].options.label(), 'Theme', 'nav label follows the active locale');
activeLocale = 'zh';
assert.equal(registrations[0].options.label(), '主题', 'nav label updates with the Harness language');
activeLocale = 'en';
assert.equal(typeof registrations[0].component, 'function', 'section component registered');
assert.equal(dictionaries[0].namespace, 'dsh-pure-theme');
assert.ok(registeredLocales.includes('zh') && registeredLocales.includes('en'));
assert.ok(effects.length >= 5, 'stylesheets, nav icon and sync effects installed');
assert.ok(effects.every((effect) => typeof effect.dispose === 'function'), 'every effect is disposable');

// --- settings nav decoration ----------------------------------------------
const navButtons = [
  { textContent: '主题', attrs: {}, getAttribute(key) { return this.attrs[key] ?? null; }, setAttribute(key, value) { this.attrs[key] = value; } },
  { textContent: '通用设置', attrs: {}, getAttribute(key) { return this.attrs[key] ?? null; }, setAttribute(key, value) { this.attrs[key] = value; } },
];
globalThis.document.querySelectorAll = (selector) =>
  selector === '[data-shortcut-modal="settings"] nav button' ? navButtons : [];
activeLocale = 'zh';
api.markSettingsNav();
assert.equal(navButtons[0].attrs[api.NAV_ATTR], 'true', 'our rail row gets the palette marker');
assert.equal(navButtons[1].attrs[api.NAV_ATTR], undefined, 'other rail rows keep their host glyph');
activeLocale = 'en';

// --- localization ----------------------------------------------------------
assert.equal(api.MESSAGES.zh.nav, '主题');
assert.equal(api.MESSAGES.en.nav, 'Theme');
assert.equal(api.MESSAGES['zh-TW'].nav, '主題');
assert.equal(api.MESSAGES.ja.nav, 'テーマ');
assert.equal(api.MESSAGES.fr.nav, 'Thème');
assert.equal(api.MESSAGES.de.nav, 'Design');
assert.equal(api.MESSAGES.ar.nav, 'السمة');
assert.equal(api.MESSAGES.zh.title, '主题');
assert.equal(api.MESSAGES.en.title, 'Theme');

const enKeys = Object.keys(api.MESSAGES.en).sort();
const zhKeys = Object.keys(api.MESSAGES.zh).sort();
assert.deepEqual(zhKeys, enKeys, 'zh and en dictionaries carry the same keys');
for (const locale of Object.keys(api.MESSAGES)) {
  assert.ok(api.MESSAGES[locale].nav, `${locale} has a nav label`);
  assert.ok(api.MESSAGES[locale].title, `${locale} has a title`);
}

const localeFiles = readdirSync(join(root, 'locale')).filter((name) => name.endsWith('.json'));
assert.equal(localeFiles.length, Object.keys(api.MESSAGES).length, 'every message locale has package metadata');
for (const file of localeFiles) {
  const locale = file.slice(0, -'.json'.length);
  const meta = JSON.parse(readFileSync(join(root, 'locale', file), 'utf8')).meta;
  assert.equal(meta.title, api.MESSAGES[locale].nav, `${locale} plugin-list title matches the settings label`);
  assert.ok(meta.description, `${locale} has a plugin-list description`);
}

// --- stylesheet generation -------------------------------------------------
const palette = api.emptyPalette();
for (const role of api.PALETTE_ROLES) {
  assert.ok(/^#[0-9A-F]{6}$/.test(palette[role.key]), `native palette has ${role.key}`);
}

const css = api.buildStylesheet({ palette, tokens: null });
assert.ok(css.includes('body[data-ds-dark-theme]'), 'palette scoped to dark theme');
assert.ok(css.includes('--dsw-static-neutral-bluish-950: #202020 !important;'), 'canvas maps to bluish-950');
assert.ok(css.includes('--dsw-specific-sidebar-fill: #1B1B1B !important;'), 'sidebar maps to the sidebar token');
assert.ok(!css.includes('data-dst-surface'), 'no glitter surface rules');
assert.equal(api.buildStylesheet({ palette: null, tokens: null }), '', 'no palette means no override');

const tokensCss = api.buildStylesheet({ palette: null, tokens: { '--dsw-alias-brand-primary': '#123456' } });
assert.ok(tokensCss.includes('--dsw-alias-brand-primary: #123456 !important;'), 'advanced tokens are honoured');

// --- roles and groups ------------------------------------------------------
const grouped = api.COLOR_GROUPS.flatMap((group) => group.roles).sort();
const roles = api.PALETTE_ROLES.map((role) => role.key).sort();
assert.deepEqual(grouped, roles, 'every role appears in exactly one colour group');
for (const role of api.PALETTE_ROLES) {
  assert.ok(api.MESSAGES.en[role.labelKey], `English label for ${role.key}`);
  assert.ok(api.MESSAGES.zh[role.labelKey], `Chinese label for ${role.key}`);
  assert.ok(api.MESSAGES.en[role.hintKey], `English hint for ${role.key}`);
}

// --- saved themes ----------------------------------------------------------
const saved = api.sanitizeSavedThemes([
  { id: 'a', name: 'Ink', palette: { canvas: '#101010', sidebar: '#111111', textPrimary: '#FFFFFF' }, source: 'vscode', fileName: 'ink.json', createdAt: 1 },
  { id: 'a', name: '', palette: { canvas: '#202020', sidebar: '#212121', textPrimary: '#EEEEEE' } },
  { id: 'bad', name: 'Bad', palette: { canvas: 'nope' } },
  null,
]);
assert.equal(saved.length, 2, 'invalid saved themes are dropped');
assert.equal(saved[0].name, 'Ink');
assert.equal(saved[0].source, 'vscode');
assert.equal(saved[0].fileName, 'ink.json');
assert.notEqual(saved[0].id, saved[1].id, 'duplicate ids are regenerated');
assert.equal(saved[1].name, 'Untitled', 'empty names get a fallback');
assert.equal(saved[1].source, 'custom', 'unknown sources become custom');

const many = Array.from({ length: 60 }, (_, index) => ({
  name: `T${index}`,
  palette: { canvas: '#101010', sidebar: '#111111', textPrimary: '#FFFFFF' },
}));
assert.equal(api.sanitizeSavedThemes(many).length, 50, 'saved themes are capped at 50');

const defaultState = api.defaultState();
assert.deepEqual(defaultState.savedThemes, []);
assert.equal(defaultState.palette, null);
assert.ok(!('glitter' in defaultState), 'glitter is gone');

// --- theme files -----------------------------------------------------------
const example = JSON.parse(readFileSync(join(root, 'examples/jade-desk.json'), 'utf8'));
const parsedExample = api.readThemeFile(example);
assert.equal(parsedExample.ok, true, 'example theme parses');
assert.equal(parsedExample.theme.palette.canvas, '#222F2A');

const vscode = api.readThemeFile({
  name: 'One Dark Pro',
  colors: {
    'sideBar.background': '#21252b',
    'editor.background': '#282c34',
    'editor.foreground': '#abb2bf',
    'button.background': '#61afef',
    'panel.border': '#181a1f',
  },
});
assert.equal(vscode.ok, true, 'VS Code theme maps');
assert.equal(vscode.theme.source, 'vscode');
assert.equal(vscode.theme.palette.sidebar, '#21252B');
assert.equal(vscode.theme.palette.accent, '#61AFEF');

assert.equal(api.readThemeFile({ hello: 'world' }).ok, false, 'rejects unknown JSON');
assert.equal(api.readThemeFile(null).ok, false, 'rejects null');
assert.equal(api.readThemeFile({ palette: { canvas: 'nope' } }).ok, false, 'rejects invalid colours');

const exported = api.exportThemeFile({ palette: api.emptyPalette(), tokens: null, activeName: 'Mine' });
assert.equal(exported.name, 'Mine');
assert.ok(exported.palette.canvas);
assert.ok(!('glitter' in exported), 'export has no glitter section');

// --- helpers ---------------------------------------------------------------
assert.equal(api.isNewerVersion('0.3.0', '0.2.9'), true);
assert.equal(api.isNewerVersion('0.2.0', '0.2.0'), false);
assert.equal(api.isNewerVersion('v1.0.0', '0.9.9'), true);
assert.equal(api.isNewerVersion('0.2.0-beta.1', '0.2.0'), false);

const warning = api.paletteContrastWarning({ textPrimary: '#101010', canvas: '#111111' });
assert.ok(warning && warning.ratio < 4.5, 'flags unreadable palettes');
assert.equal(api.paletteContrastWarning({ textPrimary: '#FFFFFF', canvas: '#000000' }), null);
assert.equal(api.readEffectivePalette(), null, 'effective palette is null without a real DOM');

const sanitized = api.sanitizePalette({ canvas: '#abcdef', sidebar: '#123456', textPrimary: '#F0F0F0' });
assert.equal(sanitized.canvas, '#ABCDEF');
assert.equal(api.sanitizePalette({ canvas: 'nope' }), null);

// --- repository consistency ------------------------------------------------
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
assert.equal(api.VERSION, pkg.version, 'VERSION matches package.json');
assert.ok(pkg.dsh?.bundle?.patch, 'package declares dsh.bundle.patch (market requirement)');
assert.ok(pkg.dsh?.client, 'package declares dsh.client');
assert.equal(pkg.icon, './icon.svg', 'package exposes the plugin-list icon');
assert.ok(readFileSync(join(root, 'cordis.patch.yml'), 'utf8').includes('dsh-pure-theme'), 'patch inserts the plugin row');
const icon = readFileSync(join(root, 'icon.svg'), 'utf8');
assert.ok(icon.startsWith('<svg'), 'icon is an SVG');
assert.ok(icon.includes('aria-label="dsh-pure-theme"'), 'icon is labelled');
assert.ok(icon.includes('<circle'), 'icon uses the palette glyph');
assert.ok(api.UI_CSS.includes(`[${api.NAV_ATTR}]`), 'page stylesheet carries the nav icon rule');

// --- presets ---------------------------------------------------------------
assert.equal(api.AGENTS.length, 9, 'nine agents ship as presets (Harness + 8 others)');
for (const agent of api.AGENTS) {
  assert.ok(agent.id && agent.displayName && agent.source, `agent ${agent.id} has display metadata`);
  assert.ok(['high', 'medium', 'low'].includes(agent.confidence), `agent ${agent.id} declares confidence`);
  assert.ok(agent.themes.length >= 1, `agent ${agent.id} has at least one theme`);
  for (const theme of agent.themes) {
    for (const role of Object.keys(api.emptyPalette())) {
      assert.ok(isHexLike(theme.palette[role]), `${agent.id}/${theme.id} has a valid ${role}`);
    }
    const ratio = contrastBetween(theme.palette.textPrimary, theme.palette.canvas);
    assert.ok(ratio >= 4.5, `${agent.id}/${theme.id} text contrast ${ratio.toFixed(2)} >= 4.5`);
  }
}

function isHexLike(value) {
  return typeof value === 'string' && /^#[0-9A-F]{6}$/i.test(value);
}

function contrastBetween(a, b) {
  const luminance = (hex) => {
    const value = hex.replace('#', '');
    const channel = (offset) => {
      const c = parseInt(value.slice(offset, offset + 2), 16) / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * channel(0) + 0.7152 * channel(2) + 0.0722 * channel(4);
  };
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

console.log(`ok — ${effects.length} effects, ${registrations.length} section, ${Object.keys(api.MESSAGES).length} locales, ${api.AGENTS.length} agents / ${api.AGENTS.reduce((sum, agent) => sum + agent.themes.length, 0)} presets`);
