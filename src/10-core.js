// ---------------------------------------------------------------------------
// dsh-pure-theme — shared constants, colour helpers and localized copy.
//
// The Harness owns the active language; this package only contributes a
// dictionary for its own namespace. Every visible string goes through `tr()`,
// so a language switch re-renders the settings page and the nav label.
// ---------------------------------------------------------------------------

const VERSION = '0.2.0';
const STORAGE_KEY = 'dsh-pure-theme:settings:v1';
const STYLE_ID = 'dsh-pure-theme-runtime';
const UI_STYLE_ID = 'dsh-pure-theme-ui';
const LOCALE_NS = 'dsh-pure-theme';

// ---------------------------------------------------------------------------
// Localized copy.
//
// `zh` and `en` are complete. Other languages contribute the section name and
// page title only; their remaining copy falls back to English through the
// Harness locale fallback chain. That keeps the nav label correct in every
// language DSH may add without pretending to ship a half-translated UI.
// ---------------------------------------------------------------------------

const MESSAGES = {
  en: {
    nav: 'Minimalist Theme',
    title: 'Minimalist Theme',
    subtitle: 'One quiet page for the theme file, saved themes and the colours of the Harness itself.',
    themesTitle: 'Theme library',
    themesDesc: 'Start from another agent, from a file, or from a theme you saved earlier.',
    colorsTitle: 'Colours',
    colorsDesc: 'Click a swatch to pick a colour; changes apply to the Harness immediately.',
    currentTheme: 'Current',
    currentNone: 'Harness default',
    presetsTitle: 'From another agent',
    presetsDesc: 'Palettes migrated from public screenshots and brand material, not reproductions.',
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
    importDesc: 'Upload a .json / .dshtheme file, or a VS Code colour theme. Name it before saving.',
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
    exampleName: 'Minimal dark',
    exportCurrent: 'Export current theme',
    downloadExample: 'Download example',
    colorLiveHint: 'Changes apply immediately. Save the current colours to keep them in My themes.',
    darkOnly: 'Colours apply to the dark theme only; the light theme stays native.',
    colorContrastWarn: 'Text and canvas contrast is low; reading may be hard.',
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
    previewNav: 'Projects',
    previewMessage: 'A quieter workspace, with the colours you choose.',
    previewCard: 'Theme library',
    previewButton: 'Save',
    previewInput: 'Message the Harness…',
  },
  zh: {
    nav: '极简主题',
    title: '极简主题',
    subtitle: '一个安静的地方：主题文件、我的主题，以及 Harness 各组件的颜色。',
    themesTitle: '主题库',
    themesDesc: '从其他 Agent、主题文件，或之前保存的主题开始。',
    colorsTitle: '配色',
    colorsDesc: '点击色块取色，修改会立即应用到 Harness。',
    currentTheme: '当前',
    currentNone: 'Harness 默认',
    presetsTitle: '从其他 Agent 开始',
    presetsDesc: '取自公开截图与品牌资料的配色，不是对原产品的复刻。',
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
    importDesc: '上传 .json / .dshtheme，或 VS Code 配色主题。保存前可以先命名。',
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
    exampleName: '极简暗色',
    exportCurrent: '导出当前主题',
    downloadExample: '下载示例文件',
    colorLiveHint: '改色会立即生效；保存后才会进入「我的主题」。',
    darkOnly: '颜色只作用于深色主题；浅色主题保持 DSH 原生配色。',
    colorContrastWarn: '文字与画布对比度偏低，阅读可能吃力。',
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
    previewNav: '项目',
    previewMessage: '一个更安静的工作区，用你选的颜色。',
    previewCard: '主题库',
    previewButton: '保存',
    previewInput: '给 Harness 发消息…',
  },
  'zh-TW': { nav: '極簡主題', title: '極簡主題' },
  ja: { nav: 'ミニマルテーマ', title: 'ミニマルテーマ' },
  ko: { nav: '미니멀 테마', title: '미니멀 테마' },
  fr: { nav: 'Thème minimaliste', title: 'Thème minimaliste' },
  de: { nav: 'Minimalistisches Thema', title: 'Minimalistisches Thema' },
  es: { nav: 'Tema minimalista', title: 'Tema minimalista' },
  pt: { nav: 'Tema minimalista', title: 'Tema minimalista' },
  'pt-BR': { nav: 'Tema minimalista', title: 'Tema minimalista' },
  ru: { nav: 'Минималистичная тема', title: 'Минималистичная тема' },
  it: { nav: 'Tema minimalista', title: 'Tema minimalista' },
  nl: { nav: 'Minimalistisch thema', title: 'Minimalistisch thema' },
  pl: { nav: 'Minimalistyczny motyw', title: 'Minimalistyczny motyw' },
  tr: { nav: 'Minimalist tema', title: 'Minimalist tema' },
  ar: { nav: 'سمة بسيطة', title: 'سمة بسيطة' },
  hi: { nav: 'मिनिमलिस्ट थीम', title: 'मिनिमलिस्ट थीम' },
  id: { nav: 'Tema minimalis', title: 'Tema minimalis' },
  vi: { nav: 'Chủ đề tối giản', title: 'Chủ đề tối giản' },
  th: { nav: 'ธีมมินิมอล', title: 'ธีมมินิมอล' },
  sv: { nav: 'Minimalistiskt tema', title: 'Minimalistiskt tema' },
  da: { nav: 'Minimalistisk tema', title: 'Minimalistisk tema' },
  fi: { nav: 'Minimalistinen teema', title: 'Minimalistinen teema' },
  nb: { nav: 'Minimalistisk tema', title: 'Minimalistisk tema' },
  cs: { nav: 'Minimalistický motiv', title: 'Minimalistický motiv' },
  el: { nav: 'Μινιμαλιστικό θέμα', title: 'Μινιμαλιστικό θέμα' },
  he: { nav: 'ערכת עיצוב מינימליסטית', title: 'ערכת עיצוב מינימליסטית' },
  ro: { nav: 'Temă minimalistă', title: 'Temă minimalistă' },
  hu: { nav: 'Minimalista téma', title: 'Minimalista téma' },
  bg: { nav: 'Минималистична тема', title: 'Минималистична тема' },
  sk: { nav: 'Minimalistická téma', title: 'Minimalistická téma' },
  hr: { nav: 'Minimalistička tema', title: 'Minimalistička tema' },
  sr: { nav: 'Minimalistička tema', title: 'Minimalistička tema' },
  uk: { nav: 'Мінімалістична тема', title: 'Мінімалістична тема' },
  ms: { nav: 'Tema minimalis', title: 'Tema minimalis' },
  fil: { nav: 'Minimalist na tema', title: 'Minimalist na tema' },
};

let boundTranslate = null;
let localeSubscribe = null;

/** Resolve one key through the Harness locale, or English before it is bound. */
function tr(key, params) {
  const template = boundTranslate ? boundTranslate(key, params) : MESSAGES.en[key] ?? key;
  return params && !boundTranslate ? format(template, params) : template;
}

/** String table facade: `T.title` always reads the current language. */
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
