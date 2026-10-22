#!/usr/bin/env node
// Render the settings page with real React (react-dom/server) to catch the
// class of bugs an offline syntax check cannot see: bad props, missing hooks,
// undefined child components. React is installed into .tmp-render and is not a
// dependency of the published package.

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const renderDir = join(root, '.tmp-render');
const requireFromRender = createRequire(join(renderDir, 'package.json'));
const React = requireFromRender('react');
const { renderToStaticMarkup } = requireFromRender('react-dom/server');

const code = readFileSync(process.env.DSH_PURE_THEME_CLIENT || join(root, 'client.js'), 'utf8');
globalThis.BroadcastChannel = undefined;

// Minimal DOM so the module graph can initialise.
const storage = new Map([
  [
    'dsh-pure-theme:settings:v1',
    JSON.stringify({
      v: 3,
      palette: {
        sidebar: '#191817',
        canvas: '#1F1E1D',
        input: '#262422',
        surface: '#242220',
        surfaceAlt: '#2E2B28',
        border: '#3A3632',
        textPrimary: '#F2EEE8',
        textSecondary: '#A9A29A',
        accent: '#D97757',
        accentText: '#1A120E',
      },
      tokens: null,
      activeName: 'Claude Code · Warm ink',
      activeSource: 'preset',
      activeThemeId: null,
      savedThemes: [
        {
          id: 'saved-1',
          name: 'My warm desk',
          palette: {
            sidebar: '#201A17',
            canvas: '#26201C',
            input: '#2C2521',
            surface: '#2A231F',
            surfaceAlt: '#332B26',
            border: '#443A33',
            textPrimary: '#F5EFE8',
            textSecondary: '#B5AAA0',
            accent: '#D97757',
            accentText: '#1A120E',
          },
          tokens: null,
          source: 'vscode',
          createdAt: 1792320000000,
        },
      ],
    }),
  ],
]);

globalThis.window = {
  __ModuleLoader__: {
    load(def) {
      globalThis.__plugin = def.factory((id) => {
        if (id === 'react') return React;
        throw new Error(`unexpected require: ${id}`);
      });
    },
  },
  localStorage: {
    getItem: (key) => (storage.has(key) ? storage.get(key) : null),
    setItem: (key, value) => storage.set(key, String(value)),
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle: () => ({ getPropertyValue: () => '', color: '' }),
  URL: { createObjectURL: () => 'blob:x', revokeObjectURL() {} },
  crypto: { randomUUID: () => 'uuid' },
};

globalThis.document = {
  head: { appendChild() {} },
  body: { appendChild() {}, removeChild() {}, hasAttribute: () => true },
  documentElement: {},
  getElementById: () => null,
  createElement: () => ({
    dataset: {},
    style: {},
    appendChild() {},
    remove() {},
    click() {},
    querySelector() {
      return null;
    },
  }),
  querySelector: () => null,
  querySelectorAll: () => [],
};

// eslint-disable-next-line no-new-func
new Function(code)();
const plugin = globalThis.__plugin;
plugin.apply({
  effect(fn) {
    fn();
    return () => {};
  },
  locale: {
    bind: () => (key) => plugin.__internals.MESSAGES.zh[key] ?? key,
    register() {
      return () => {};
    },
    subscribe() {
      return () => {};
    },
  },
  slots: {
    inject(name, callback) {
      callback();
    },
    register() {
      return () => {};
    },
  },
});
const { components } = plugin.__internals;

const statusHtml = renderToStaticMarkup(
  React.createElement(components.Status, { status: { kind: 'ok', message: '已保存为「测试」。' } }),
);
assert.ok(statusHtml.includes('role="status"'), 'status line is a live region');
assert.ok(statusHtml.includes('aria-live="polite"'), 'status line is announced politely');
assert.ok(statusHtml.includes('aria-atomic="true"'), 'status line is announced atomically');
assert.ok(statusHtml.includes('已保存为「测试」。'), 'status message is rendered');

const draftHtml = renderToStaticMarkup(
  React.createElement(components.ImportDraft, {
    draft: {
      name: 'Imported',
      fileName: 'imported.json',
      source: 'theme-file',
      palettes: { dark: plugin.__internals.emptyPalette('dark'), light: null },
      tokens: { dark: null, light: null },
    },
    name: 'Imported',
    onName() {},
    onFile() {},
    onApply() {},
    onSave() {},
    onCancel() {},
  }),
);
assert.ok(draftHtml.includes('保存到我的主题'), 'import draft offers a save button');
assert.ok(draftHtml.includes('不会应用'), 'import draft explains that saving does not apply');

const presetHtml = renderToStaticMarkup(
  React.createElement(components.PresetPicker, {
    state: {
      activeName: 'DeepSeek Harness · 墨玉 · Jade desk',
      activeSource: 'preset',
    },
    onApply() {},
  }),
);
assert.ok(presetHtml.includes('原生 · Native'), 'DeepSeek Harness offers a native appearance');
assert.ok(presetHtml.includes('墨玉 · Jade'), 'the Jade appearance keeps its original name');
assert.ok(presetHtml.includes('灵感来源: dsh-pure-theme'), 'the Jade chip credits dsh-pure-theme');
assert.ok(presetHtml.includes('aria-pressed="true"'), 'an old Jade active name still marks the renamed chip');

const html = renderToStaticMarkup(React.createElement(components.PureThemePage));
assert.ok(html.length > 2000, 'settings page rendered something substantial');
for (const needle of [
  '主题库',
  '当前',
  '我的主题',
  '导入主题文件',
  '配色',
  '点击色块取色；改色会写入正在编辑的深浅模式，保存后会应用并进入「我的主题」。',
  '模式：',
  '保存到我的主题',
  '恢复 Harness 默认',
  '侧边栏',
  '强调色',
  '预览',
  '深色',
  '浅色',
  '仅深色',
  'DSH 当前：深色',
]) {
  assert.ok(html.includes(needle), `page contains "${needle}"`);
}
assert.ok(!html.includes('恢复此模式'), 'the native per-mode reset is gone');
assert.ok(!html.includes('修改会写入正在编辑的模式'), 'the old colours description is replaced');
assert.ok(!html.includes('改色会立即写入对应模式'), 'the old standalone colours hint is gone');
for (const removed of [
  '极简主题',
  '一个安静的地方',
  '从其他 Agent',
  '取自公开截图',
  '上传 .json',
]) {
  assert.ok(!html.includes(removed), `page no longer contains "${removed}"`);
}
assert.ok(html.includes('Claude Code · Warm ink'), 'current theme name is shown');
assert.ok(html.includes('My warm desk'), 'saved theme is listed');
assert.ok(!html.includes('炫彩'), 'Glitter module is gone');
assert.ok(!html.includes('data-dst-surface'), 'surface rules are gone');
assert.ok(!html.includes('undefined'), 'no literal undefined');

// The top-level section label is provided by the plugin registration, not by
// the page component; check it through the same translation binding.
assert.equal(plugin.__internals.MESSAGES.zh.nav, '主题');
assert.equal(plugin.__internals.MESSAGES.en.nav, 'Theme');

// A dark-only theme viewed in light mode offers a light-draft action.
document.body.hasAttribute = () => false;
const darkOnlyLightHtml = renderToStaticMarkup(React.createElement(components.PureThemePage));
assert.ok(darkOnlyLightHtml.includes('生成浅色草稿'), 'light tab offers a light-draft action');
assert.ok(darkOnlyLightHtml.includes('此模式使用 Harness 原生配色'), 'light tab explains the native fallback');
document.body.hasAttribute = () => true;

// A dual theme should render both-mode coverage and follow the active DSH mode.
window.__dshPureTheme.apply(
  {
    dark: plugin.__internals.emptyPalette('dark'),
    light: plugin.__internals.emptyPalette('light'),
  },
  'Dual palette',
);
const dualHtml = renderToStaticMarkup(React.createElement(components.PureThemePage));
assert.ok(dualHtml.includes('Dual palette'), 'dual theme name is shown');
assert.ok(dualHtml.includes('深色 + 浅色'), 'dual theme has a both-mode badge');
assert.ok(dualHtml.includes('清除当前深浅模式配色编辑'), 'the colours card offers a per-mode edit reset');

document.body.hasAttribute = () => false;
const lightHtml = renderToStaticMarkup(React.createElement(components.PureThemePage));
assert.ok(lightHtml.includes('DSH 当前：浅色'), 'the page follows the light Harness mode');
assert.ok(lightHtml.includes('预览 · 浅色'), 'the preview follows the light edit tab');

console.log(`rendered PureThemePage: ${html.length} bytes`);
console.log('ok — settings page renders with real React');
