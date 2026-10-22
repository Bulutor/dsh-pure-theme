// ---------------------------------------------------------------------------
// dsh-pure-theme — shared constants, colour helpers and localized copy.
//
// The Harness owns the active language; this package only contributes a
// dictionary for its own namespace. Every visible string goes through `tr()`,
// so a language switch re-renders the settings page and the nav label.
// ---------------------------------------------------------------------------

const VERSION = '0.4.0';
const STORAGE_KEY = 'dsh-pure-theme:settings:v1';
const STYLE_ID = 'dsh-pure-theme-runtime';
const UI_STYLE_ID = 'dsh-pure-theme-ui';
const LOCALE_NS = 'dsh-pure-theme';

// ---------------------------------------------------------------------------
// Localized copy.
//
// `zh` and `en` are complete. Other languages contribute the section name and
// plugin-list title only; their remaining copy falls back to English through
// the Harness locale fallback chain. That keeps the nav label correct in every
// language DSH may add without pretending to ship a half-translated UI.
// ---------------------------------------------------------------------------

const MESSAGES = {
  en: {
    nav: 'Theme',
    title: 'Theme',
    themesTitle: 'Theme library',
    colorsTitle: 'Colours',
    colorsDesc: 'Click a swatch to pick a colour; changes apply to the mode you are editing.',
    currentTheme: 'Current',
    currentNone: 'Harness default',
    presetsAgent: 'Agent',
    presetsApply: 'Apply',
    presetsApplied: 'Active',
    presetsInspired: 'Inspired by',
    confidenceHigh: 'Sampled from official screenshots',
    confidenceMedium: 'Derived from public material',
    confidenceLow: 'Approximate reconstruction',
    savedTitle: 'My themes',
    savedEmpty: 'No saved themes yet. Import a file or save the current colours.',
    savedApply: 'Apply',
    savedExport: 'Export',
    savedDelete: 'Delete',
    savedActive: 'Active',
    savedDeleted: 'Theme deleted.',
    savedFromVscode: 'VS Code theme',
    savedFromFile: 'Theme file',
    savedFromCustom: 'Custom colours',
    savedDeleteConfirm: 'Delete this theme?',
    importTitle: 'Import a theme file',
    importUpload: 'Choose file',
    importDrop: 'Drop a theme file here, or choose one',
    importHint: '.json · .dshtheme · VS Code theme · colours are read locally',
    importNameLabel: 'Theme name',
    importNamePlaceholder: 'Name this theme',
    importApply: 'Apply',
    importSave: 'Save to My themes',
    importCancel: 'Cancel',
    importVscode: 'Mapped from a VS Code colour theme',
    importColors: '{count} colours recognised',
    importError: 'That file could not be read as a theme.',
    importEmpty: 'Still using the colours already on screen.',
    importLoaded: 'Theme loaded. Name it, then save.',
    applied: 'Applied.',
    exampleName: 'Pure',
    exportCurrent: 'Export current theme',
    downloadExample: 'Download example',
    colorLiveHint: 'Changes apply immediately. Save both modes to keep them in My themes.',
    colorContrastWarn: 'Text and canvas contrast is low; reading may be hard.',
    colorSecondaryContrastWarn: 'Secondary text and canvas contrast is low.',
    colorAccentContrastWarn: 'Text on the accent colour is hard to read.',
    modeLabel: 'Mode',
    modeDark: 'Dark',
    modeLight: 'Light',
    currentMode: 'Harness: {mode}',
    editingInactive: 'Editing {mode}; switch to it to see the result.',
    nativeModeHint: 'This mode uses the Harness palette. Change any colour to create one.',
    modeBoth: 'Dark + light',
    modeDarkOnly: 'Dark only',
    modeLightOnly: 'Light only',
    modeNone: 'No colours',
    generateLight: 'Generate a light draft',
    lightDraftCreated: 'Light draft generated. Review it, then save.',
    clearModeEdits: 'Clear current mode edits',
    clearModeEditsIdle: 'No colour edits to clear in this mode.',
    clearModeEditsDone: 'Cleared {mode} edits; restored the original colours from “{name}”.',
    appliedBoth: 'Applied to dark and light.',
    appliedNativeMode: 'Applied; {mode} stays native.',
    appliedInactive: 'Saved; switch to {mode} to see it.',
    importModes: 'Recognised: {modes}',
    colorNameLabel: 'Save as',
    colorNamePlaceholder: 'My colours',
    colorSave: 'Save to My themes',
    colorReset: 'Restore Harness default',
    colorSaved: 'Saved to My themes.',
    colorResetDone: 'Restored the Harness default colours.',
    colorExported: 'Theme file exported.',
    colorSavedName: 'Saved as “{name}”.',
    untitled: 'Custom colours',
    updateAvailable: 'Version {version} is available — open release notes',
    groupSurfaces: 'Surfaces',
    groupText: 'Text and borders',
    groupAccent: 'Accent',
    roleSidebar: 'Sidebar',
    roleSidebarHint: 'Left rail and title bar',
    roleCanvas: 'Canvas',
    roleCanvasHint: 'Conversation and right panel',
    roleInput: 'Composer',
    roleInputHint: 'The surface behind the input',
    roleSurface: 'Cards',
    roleSurfaceHint: 'Raised cards and bubbles',
    roleSurfaceAlt: 'Overlays',
    roleSurfaceHint: 'Menus and toasts',
    roleBorder: 'Borders',
    roleBorderHint: 'Dividers and card strokes',
    roleTextPrimary: 'Primary text',
    roleTextPrimaryHint: 'Body and headings',
    roleTextSecondary: 'Secondary text',
    roleTextSecondaryHint: 'Captions and timestamps',
    roleAccent: 'Accent',
    roleAccentHint: 'Buttons, links, selection',
    roleAccentText: 'On accent',
    roleAccentTextHint: 'Text on an accent fill',
    previewLabel: 'Preview',
    previewBrand: 'DSH',
    previewCard: 'Theme library',
    previewButton: 'Save',
    previewInput: 'Message the Harness…',
  },
  zh: {
    nav: '主题',
    title: '主题',
    themesTitle: '主题库',
    colorsTitle: '配色',
    colorsDesc: '点击色块取色；修改会写入正在编辑的模式。',
    currentTheme: '当前',
    currentNone: 'Harness 默认',
    presetsAgent: 'Agent',
    presetsApply: '应用',
    presetsApplied: '使用中',
    presetsInspired: '灵感来源',
    confidenceHigh: '配色取自官方截图',
    confidenceMedium: '依据公开资料推导',
    confidenceLow: '近似还原',
    savedTitle: '我的主题',
    savedEmpty: '还没有保存的主题。导入一个文件，或把当前配色存下来。',
    savedApply: '应用',
    savedExport: '导出',
    savedDelete: '删除',
    savedActive: '使用中',
    savedDeleted: '已删除该主题。',
    savedFromVscode: 'VS Code 主题',
    savedFromFile: '主题文件',
    savedFromCustom: '自定义配色',
    savedDeleteConfirm: '删除这个主题？',
    importTitle: '导入主题文件',
    importUpload: '选择文件',
    importDrop: '把主题文件拖到这里，或选择文件',
    importHint: '.json · .dshtheme · VS Code 主题 · 颜色只在本机读取',
    importNameLabel: '主题名称',
    importNamePlaceholder: '给这个主题起个名字',
    importApply: '应用',
    importSave: '保存到我的主题',
    importCancel: '取消',
    importVscode: '已从 VS Code 配色映射',
    importColors: '识别到 {count} 个颜色',
    importError: '这个文件无法识别为主题。',
    importEmpty: '仍使用屏幕上现有的颜色。',
    importLoaded: '已载入，先命名再保存。',
    applied: '已应用。',
    exampleName: '纯净',
    exportCurrent: '导出当前主题',
    downloadExample: '下载示例文件',
    colorLiveHint: '改色会立即写入对应模式；保存后两张色板一起进入「我的主题」。',
    colorContrastWarn: '文字与画布对比度偏低，阅读可能吃力。',
    colorSecondaryContrastWarn: '次文字与画布对比度偏低。',
    colorAccentContrastWarn: '强调色上的文字对比度偏低。',
    modeLabel: '模式',
    modeDark: '深色',
    modeLight: '浅色',
    currentMode: 'DSH 当前：{mode}',
    editingInactive: '正在编辑{mode}；切换后生效。',
    nativeModeHint: '此模式使用 Harness 原生配色；修改任一颜色即可创建。',
    modeBoth: '深色 + 浅色',
    modeDarkOnly: '仅深色',
    modeLightOnly: '仅浅色',
    modeNone: '未配色',
    generateLight: '生成浅色草稿',
    lightDraftCreated: '已生成浅色草稿，确认后保存。',
    clearModeEdits: '清除当前深浅模式配色编辑',
    clearModeEditsIdle: '当前模式没有配色编辑。',
    clearModeEditsDone: '已清除{mode}的配色编辑，恢复「{name}」的原配色。',
    appliedBoth: '已应用到深色和浅色。',
    appliedNativeMode: '已应用；{mode}保持原生。',
    appliedInactive: '已保存；切到{mode}查看。',
    importModes: '识别到：{modes}',
    colorNameLabel: '保存为',
    colorNamePlaceholder: '我的配色',
    colorSave: '保存到我的主题',
    colorReset: '恢复 Harness 默认',
    colorSaved: '已保存到我的主题。',
    colorResetDone: '已恢复 Harness 默认配色。',
    colorExported: '主题文件已导出。',
    colorSavedName: '已保存为「{name}」。',
    untitled: '自定义配色',
    updateAvailable: '有新版本 v{version}，点此查看更新',
    groupSurfaces: '表面',
    groupText: '文字与描边',
    groupAccent: '强调',
    roleSidebar: '侧边栏',
    roleSidebarHint: '左栏与标题栏',
    roleCanvas: '画布',
    roleCanvasHint: '对话区与右栏',
    roleInput: '输入区',
    roleInputHint: '输入框所在面',
    roleSurface: '卡片',
    roleSurfaceHint: '浮起卡片与气泡',
    roleSurfaceAlt: '浮层',
    roleSurfaceHint: '菜单、Toast',
    roleBorder: '描边',
    roleBorderHint: '分隔线与卡片描边',
    roleTextPrimary: '主文字',
    roleTextPrimaryHint: '正文与标题',
    roleTextSecondary: '次文字',
    roleTextSecondaryHint: '说明与时间戳',
    roleAccent: '强调色',
    roleAccentHint: '按钮、链接、选中态',
    roleAccentText: '强调色文字',
    roleAccentTextHint: '强调色上的文字',
    previewLabel: '预览',
    previewBrand: 'DSH',
    previewCard: '主题库',
    previewButton: '保存',
    previewInput: '给 Harness 发消息…',
  },
  'zh-TW': { nav: '主題', title: '主題' },
  ja: { nav: 'テーマ', title: 'テーマ' },
  ko: { nav: '테마', title: '테마' },
  fr: { nav: 'Thème', title: 'Thème' },
  de: { nav: 'Design', title: 'Design' },
  es: { nav: 'Tema', title: 'Tema' },
  pt: { nav: 'Tema', title: 'Tema' },
  'pt-BR': { nav: 'Tema', title: 'Tema' },
  ru: { nav: 'Тема', title: 'Тема' },
  it: { nav: 'Tema', title: 'Tema' },
  nl: { nav: 'Thema', title: 'Thema' },
  pl: { nav: 'Motyw', title: 'Motyw' },
  tr: { nav: 'Tema', title: 'Tema' },
  ar: { nav: 'السمة', title: 'السمة' },
  hi: { nav: 'थीम', title: 'थीम' },
  id: { nav: 'Tema', title: 'Tema' },
  vi: { nav: 'Chủ đề', title: 'Chủ đề' },
  th: { nav: 'ธีม', title: 'ธีม' },
  sv: { nav: 'Tema', title: 'Tema' },
  da: { nav: 'Tema', title: 'Tema' },
  fi: { nav: 'Teema', title: 'Teema' },
  nb: { nav: 'Tema', title: 'Tema' },
  cs: { nav: 'Motiv', title: 'Motiv' },
  el: { nav: 'Θέμα', title: 'Θέμα' },
  he: { nav: 'ערכת נושא', title: 'ערכת נושא' },
  ro: { nav: 'Temă', title: 'Temă' },
  hu: { nav: 'Téma', title: 'Téma' },
  bg: { nav: 'Тема', title: 'Тема' },
  sk: { nav: 'Téma', title: 'Téma' },
  hr: { nav: 'Tema', title: 'Tema' },
  sr: { nav: 'Tema', title: 'Tema' },
  uk: { nav: 'Тема', title: 'Тема' },
  ms: { nav: 'Tema', title: 'Tema' },
  fil: { nav: 'Tema', title: 'Tema' },
};

let boundTranslate = null;
let localeSubscribe = null;

/** Resolve one key through the Harness locale, or English before it is bound. */
function tr(key, params) {
  const template = boundTranslate ? boundTranslate(key, params) : MESSAGES.en[key] ?? key;
  return params && !boundTranslate ? format(template, params) : template;
}

/** String table facade: `T.<key>` always reads the current language. */
const T = new Proxy(
  {},
  {
    get(_target, key) {
      return typeof key === 'string' ? tr(key) : undefined;
    },
  },
);

/** Called by the plugin once the Harness locale service is available. */
function bindLocale(translate, subscribe) {
  boundTranslate = translate;
  localeSubscribe = subscribe;
}

/** Re-render a component when the Harness language or dictionaries change. */
function useLocaleRevision() {
  const [, force] = useState(0);
  useEffect(() => {
    if (!localeSubscribe) return undefined;
    return localeSubscribe(() => force((value) => value + 1));
  }, []);
}

function format(template, values) {
  return String(template).replace(/\{(\w+)\}/g, (_, key) => (values && values[key] != null ? values[key] : ''));
}

// ---------------------------------------------------------------------------
// Colour helpers — deliberately dependency free so the bundle needs no build.
// ---------------------------------------------------------------------------

const HEX_RE = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

function isHex(value) {
  return typeof value === 'string' && HEX_RE.test(value.trim());
}

function normalizeHex(value, fallback) {
  if (!isHex(value)) return fallback;
  let hex = value.trim().toLowerCase();
  if (hex.length === 4) hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  return hex.slice(0, 7).toUpperCase();
}

function hexToRgb(hex) {
  const value = normalizeHex(hex, '#000000').slice(1);
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function rgbToHex(r, g, b) {
  const channel = (value) => Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, '0');
  return `#${channel(r)}${channel(g)}${channel(b)}`.toUpperCase();
}

function relativeLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const channel = (value) => {
    const c = value / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrastRatio(a, b) {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const light = Math.max(la, lb);
  const dark = Math.min(la, lb);
  return (light + 0.05) / (dark + 0.05);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
