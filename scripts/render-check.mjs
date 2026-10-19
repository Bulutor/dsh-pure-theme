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
  body: { appendChild() {}, removeChild() {} },
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

const html = renderToStaticMarkup(React.createElement(components.MinimalistPage));
assert.ok(html.length > 2000, 'settings page rendered something substantial');
for (const needle of [
  '极简主题',
  '主题库',
  '从其他 Agent 开始',
  '我的主题',
  '导入主题文件',
  '配色',
  '保存到我的主题',
  '恢复 Harness 默认',
  '侧边栏',
  '强调色',
  '预览',
]) {
  assert.ok(html.includes(needle), `page contains "${needle}"`);
}
assert.ok(html.includes('Claude Code · Warm ink'), 'current theme name is shown');
assert.ok(html.includes('My warm desk'), 'saved theme is listed');
assert.ok(!html.includes('炫彩'), 'Glitter module is gone');
assert.ok(!html.includes('data-dst-surface'), 'surface rules are gone');
assert.ok(!html.includes('undefined'), 'no literal undefined');

// The top-level section label is provided by the plugin registration, not by
// the page component; check it through the same translation binding.
assert.equal(plugin.__internals.MESSAGES.zh.nav, '极简主题');
assert.equal(plugin.__internals.MESSAGES.en.nav, 'Minimalist Theme');

console.log(`rendered MinimalistPage: ${html.length} bytes`);
console.log('ok — settings page renders with real React');
