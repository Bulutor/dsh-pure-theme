window.__ModuleLoader__.load({
  id: 'dsh-pure-theme',
  factory(require) {
    const React = require('react');
    const { useState, useEffect, useRef, useMemo, useCallback } = React;
    const h = React.createElement;

    // ==== src/10-core.js ====================================================
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
        colorsDesc:
          'Click a swatch to pick a colour; changes are written to the dark or light mode you are editing. Saving applies the theme and adds it to My themes.',
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
        savedExportConfirm: 'Export “{name}” as a theme file?',
        importTitle: 'Import a theme file',
        importUpload: 'Choose file',
        importDrop: 'Drop a theme file here, or choose one',
        importHint: '.json · .dshtheme · VS Code theme · colours are read locally',
        importNameLabel: 'Theme name',
        importNamePlaceholder: 'Name this theme',
        importApply: 'Apply',
        importSave: 'Save to My themes',
        importCancel: 'Cancel',
        importSaveHint: 'Saving only adds the theme to My themes; it does not apply it. Use Apply to switch now.',
        importVscode: 'Mapped from a VS Code colour theme',
        importColors: '{count} colours recognised',
        importError: 'That file could not be read as a theme.',
        importReasonNotObject: 'The file does not contain a theme object.',
        importReasonNoPalette: 'No usable colours were found.',
        importReasonVscodeNoColors: 'No usable VS Code colours were found.',
        importReasonInvalidJson: 'The file is not valid JSON.',
        importReasonReadFailed: 'The file could not be read.',
        importReasonUnknown: 'The file format is not recognised.',
        importEmpty: 'Still using the colours already on screen.',
        importLoaded: 'Theme loaded. Name it, then save.',
        applied: 'Applied.',
        exampleName: 'Pure',
        exportCurrent: 'Export current theme',
        exportCurrentConfirm: 'Export the current colours as a theme file?',
        downloadExample: 'Download example',
        colorLiveHint: 'This mode has its own colours; edits apply immediately.',
        colorContrastWarn: 'Text and canvas contrast is low; reading may be hard.',
        colorSecondaryContrastWarn: 'Secondary text and canvas contrast is low.',
        colorAccentContrastWarn: 'Text on the accent colour is hard to read.',
        modeLabel: 'Mode',
        modeLabelPrefix: 'Mode:',
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
        appliedInactive: 'Applied; switch to {mode} to see it.',
        importModes: 'Recognised: {modes}',
        colorNameLabel: 'Save as',
        colorNamePlaceholder: 'My colours',
        colorSave: 'Save to My themes',
        colorReset: 'Restore Harness default',
        colorSaved: 'Saved to My themes.',
        colorSaveFailed: 'Could not write to this browser’s storage; the theme was not added to My themes.',
        colorResetDone: 'Restored the Harness default colours.',
        colorExported: 'Theme file exported.',
        colorSavedName: 'Saved as “{name}”.',
        colorSavedApplied: 'Saved and applied “{name}”.',
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
        colorsDesc: '点击色块取色；改色会写入正在编辑的深浅模式，保存后会应用并进入「我的主题」。',
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
        savedExportConfirm: '把「{name}」导出为主题文件？',
        importTitle: '导入主题文件',
        importUpload: '选择文件',
        importDrop: '把主题文件拖到这里，或选择文件',
        importHint: '.json · .dshtheme · VS Code 主题 · 颜色只在本机读取',
        importNameLabel: '主题名称',
        importNamePlaceholder: '给这个主题起个名字',
        importApply: '应用',
        importSave: '保存到我的主题',
        importCancel: '取消',
        importSaveHint: '「保存到我的主题」只会加入列表，不会应用；要立即切换请点「应用」。',
        importVscode: '已从 VS Code 配色映射',
        importColors: '识别到 {count} 个颜色',
        importError: '这个文件无法识别为主题。',
        importReasonNotObject: '文件内容不是主题对象。',
        importReasonNoPalette: '没有找到可用的配色。',
        importReasonVscodeNoColors: '没有找到可用的 VS Code 配色。',
        importReasonInvalidJson: '文件不是有效的 JSON。',
        importReasonReadFailed: '无法读取文件。',
        importReasonUnknown: '文件格式无法识别。',
        importEmpty: '仍使用屏幕上现有的颜色。',
        importLoaded: '已载入，先命名再保存。',
        applied: '已应用。',
        exampleName: '纯净',
        exportCurrent: '导出当前主题',
        exportCurrentConfirm: '把当前配色导出为主题文件？',
        downloadExample: '下载示例文件',
        colorLiveHint: '此模式有独立配色；改色会立即生效。',
        colorContrastWarn: '文字与画布对比度偏低，阅读可能吃力。',
        colorSecondaryContrastWarn: '次文字与画布对比度偏低。',
        colorAccentContrastWarn: '强调色上的文字对比度偏低。',
        modeLabel: '模式',
        modeLabelPrefix: '模式：',
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
        appliedInactive: '已应用；切到{mode}查看。',
        importModes: '识别到：{modes}',
        colorNameLabel: '保存为',
        colorNamePlaceholder: '我的配色',
        colorSave: '保存到我的主题',
        colorReset: '恢复 Harness 默认',
        colorSaved: '已保存到我的主题。',
        colorSaveFailed: '无法写入本机存储；主题没有保存到「我的主题」。',
        colorResetDone: '已恢复 Harness 默认配色。',
        colorExported: '主题文件已导出。',
        colorSavedName: '已保存为「{name}」。',
        colorSavedApplied: '已保存并应用「{name}」。',
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

    // ==== src/20-tokens.js ==================================================
    // ---------------------------------------------------------------------------
    // Token mapping: how a logical palette becomes DeepSeek Harness design tokens.
    //
    // A theme carries one optional palette per colour scheme. Dark keeps the
    // original mapping over the `--dsw-static-neutral-bluish-*` ramp; light uses
    // the alias/specific layer only, because the light ramp is shared by text,
    // code blocks and login surfaces, so recolouring it has wide side effects.
    // ---------------------------------------------------------------------------

    const MODES = ['dark', 'light'];

    const PALETTE_ROLES = [
      { key: 'sidebar', group: 'surfaces', labelKey: 'roleSidebar', hintKey: 'roleSidebarHint' },
      { key: 'canvas', group: 'surfaces', labelKey: 'roleCanvas', hintKey: 'roleCanvasHint' },
      { key: 'input', group: 'surfaces', labelKey: 'roleInput', hintKey: 'roleInputHint' },
      { key: 'surface', group: 'surfaces', labelKey: 'roleSurface', hintKey: 'roleSurfaceHint' },
      { key: 'surfaceAlt', group: 'surfaces', labelKey: 'roleSurfaceAlt', hintKey: 'roleSurfaceHint' },
      { key: 'border', group: 'text', labelKey: 'roleBorder', hintKey: 'roleBorderHint' },
      { key: 'textPrimary', group: 'text', labelKey: 'roleTextPrimary', hintKey: 'roleTextPrimaryHint' },
      { key: 'textSecondary', group: 'text', labelKey: 'roleTextSecondary', hintKey: 'roleTextSecondaryHint' },
      { key: 'accent', group: 'accent', labelKey: 'roleAccent', hintKey: 'roleAccentHint' },
      { key: 'accentText', group: 'accent', labelKey: 'roleAccentText', hintKey: 'roleAccentTextHint' },
    ];

    const COLOR_GROUPS = [
      { key: 'surfaces', titleKey: 'groupSurfaces', roles: ['sidebar', 'canvas', 'input', 'surface', 'surfaceAlt'] },
      { key: 'text', titleKey: 'groupText', roles: ['border', 'textPrimary', 'textSecondary'] },
      { key: 'accent', titleKey: 'groupAccent', roles: ['accent', 'accentText'] },
    ];

    /**
     * Token targets per colour scheme. Keys are ordered so that a later override
     * wins when two roles share a token. Light border/tertiary/hover tokens are
     * derived in `buildModeExtras`, not written here.
     */
    const ROLE_TOKENS = {
      dark: {
        sidebar: [
          '--dsw-static-neutral-bluish-900',
          '--dsw-specific-sidebar-fill',
          '--dsw-specific-sidebar-nav-item-hover',
        ],
        canvas: ['--dsw-static-neutral-bluish-950', '--dsw-alias-bg-base'],
        input: ['--dsw-static-neutral-bluish-875'],
        surface: ['--dsw-static-neutral-bluish-850'],
        surfaceAlt: ['--dsw-static-neutral-bluish-800', '--dsw-alias-bg-overlay'],
        border: [
          '--dsw-alias-border-l1',
          '--dsw-alias-border-l2',
          '--dsw-alias-border-l3',
          '--dsw-alias-border-l4',
        ],
        textPrimary: ['--dsw-alias-label-primary'],
        textSecondary: [
          '--dsw-alias-label-secondary',
          '--dsw-alias-label-tertiary',
          '--dsw-alias-label-caption',
        ],
        accent: ['--dsw-alias-brand-primary', '--dsw-alias-link', '--dsw-alias-state-business-primary'],
        accentText: ['--dsw-alias-label-primary-foreground'],
      },
      light: {
        sidebar: ['--dsw-specific-sidebar-fill'],
        canvas: ['--dsw-alias-bg-base'],
        input: ['--dsw-specific-input-major'],
        surface: ['--dsw-alias-bg-layer-1', '--dsw-alias-bg-layer-2'],
        surfaceAlt: ['--dsw-alias-bg-overlay', '--dsw-alias-bg-layer-3'],
        border: [],
        textPrimary: ['--dsw-alias-label-primary'],
        textSecondary: ['--dsw-alias-label-secondary'],
        accent: ['--dsw-alias-brand-primary', '--dsw-alias-link', '--dsw-alias-state-business-primary'],
        accentText: ['--dsw-alias-label-primary-foreground'],
      },
    };

    /**
     * The semantic colour a user sees on screen, read from the Harness body. The
     * body carries DSH's token declarations and the plugin's own overrides, so this
     * is an effective (not necessarily native) read, useful for debugging.
     */
    const EFFECTIVE_TOKENS = {
      dark: {
        sidebar: ['--dsw-specific-sidebar-fill', '--dsw-static-neutral-bluish-900'],
        canvas: ['--dsw-alias-bg-base', '--dsw-static-neutral-bluish-950'],
        input: ['--dsw-static-neutral-bluish-875'],
        surface: ['--dsw-static-neutral-bluish-850'],
        surfaceAlt: ['--dsw-static-neutral-bluish-800'],
        border: ['--dsw-alias-border-l3', '--dsw-alias-border-l2'],
        textPrimary: ['--dsw-alias-label-primary'],
        textSecondary: ['--dsw-alias-label-secondary'],
        accent: ['--dsw-alias-brand-primary'],
        accentText: ['--dsw-alias-label-primary-foreground'],
      },
      light: {
        sidebar: ['--dsw-specific-sidebar-fill'],
        canvas: ['--dsw-alias-bg-base'],
        input: ['--dsw-specific-input-major'],
        surface: ['--dsw-alias-bg-layer-2', '--dsw-alias-bg-layer-1'],
        surfaceAlt: ['--dsw-alias-bg-overlay'],
        border: ['--dsw-alias-border-l3', '--dsw-alias-border-l2'],
        textPrimary: ['--dsw-alias-label-primary'],
        textSecondary: ['--dsw-alias-label-secondary'],
        accent: ['--dsw-alias-brand-primary', '--dsw-alias-link'],
        accentText: ['--dsw-alias-label-primary-foreground'],
      },
    };

    /**
     * Snapshot of the Harness's own colours, used as the "native" fallback and as
     * the starting point when a mode has no custom palette. Keep this in sync with
     * the DSH release named in package.json's compatibility block.
     */
    const NATIVE_PALETTES = {
      dark: {
        sidebar: '#1B1B1C',
        canvas: '#151517',
        input: '#232324',
        surface: '#2C2C2E',
        surfaceAlt: '#353638',
        border: '#3A3A3A',
        textPrimary: '#F9FAFB',
        textSecondary: '#CFD3D6',
        accent: '#4D6BFE',
        accentText: '#FFFFFF',
      },
      light: {
        sidebar: '#F9FAFB',
        canvas: '#FFFFFF',
        input: '#FFFFFF',
        surface: '#FFFFFF',
        surfaceAlt: '#E9ECF2',
        border: '#D6D9DE',
        textPrimary: '#0F1115',
        textSecondary: '#61666B',
        accent: '#4176E6',
        accentText: '#FFFFFF',
      },
    };

    /** Backwards-compatible alias for the dark snapshot. */
    const NATIVE_PALETTE = NATIVE_PALETTES.dark;

    function isMode(value) {
      return value === 'dark' || value === 'light';
    }

    function emptyPalette(mode = 'dark') {
      return { ...(NATIVE_PALETTES[mode] || NATIVE_PALETTES.dark) };
    }

    function normalizePalette(input) {
      if (!input || typeof input !== 'object') return null;
      const palette = {};
      let count = 0;
      for (const role of PALETTE_ROLES) {
        const value = normalizeHex(input[role.key], null);
        if (!value) continue;
        palette[role.key] = value;
        count += 1;
      }
      return count >= 3 ? palette : null;
    }

    function paletteWithFallback(palette, mode = 'dark') {
      return { ...(NATIVE_PALETTES[mode] || NATIVE_PALETTES.dark), ...(palette || {}) };
    }

    function cssColorToHex(value) {
      if (!value) return null;
      const direct = normalizeHex(value, null);
      if (direct) return direct;
      if (typeof document === 'undefined' || !document.body || typeof window === 'undefined') return null;
      if (typeof window.getComputedStyle !== 'function') return null;
      const probe = document.createElement('span');
      probe.style.display = 'none';
      probe.style.color = value;
      document.body.appendChild(probe);
      let computed = '';
      try {
        computed = window.getComputedStyle(probe).color;
      } finally {
        probe.remove();
      }
      const match = computed.match(/rgba?\(([^)]+)\)/i);
      if (!match) return null;
      const parts = match[1].split(',').map((part) => Number.parseFloat(part));
      if (parts.length < 3 || parts.slice(0, 3).some((part) => !Number.isFinite(part))) return null;
      return rgbToHex(parts[0], parts[1], parts[2]);
    }

    function readElementPalette(element, mode = 'dark') {
      if (!element || typeof window === 'undefined' || typeof window.getComputedStyle !== 'function') return null;
      const computed = window.getComputedStyle(element);
      const palette = {};
      for (const [role, tokens] of Object.entries(EFFECTIVE_TOKENS[mode] || EFFECTIVE_TOKENS.dark)) {
        for (const token of tokens) {
          const value = computed.getPropertyValue(token).trim();
          const hex = cssColorToHex(value);
          if (hex) {
            palette[role] = hex;
            break;
          }
        }
      }
      return Object.keys(palette).length >= 5 ? palette : null;
    }

    /** Read the colours currently painted by the Harness (the body is authoritative). */
    function readEffectivePalette(mode = 'dark') {
      if (typeof document === 'undefined') return null;
      return readElementPalette(document.body, mode) || readElementPalette(document.documentElement, mode) || null;
    }

    function paletteFromState(state) {
      if (state && state.palettes && typeof state.palettes === 'object') return state.palettes;
      if (state && state.palette) return { dark: state.palette, light: null };
      return {};
    }

    function tokensFromState(state) {
      if (!state || !state.tokens || typeof state.tokens !== 'object') return {};
      const keys = Object.keys(state.tokens);
      if (keys.some((key) => key.startsWith('--dsw-'))) return { dark: state.tokens, light: null };
      return state.tokens;
    }

    function modeSelector(mode) {
      return mode === 'dark' ? 'body[data-ds-dark-theme]' : 'body:not([data-ds-dark-theme])';
    }

    /**
     * Light needs tokens that are not a single palette value: alpha borders,
     * hover/active tints and the tertiary text ramp. These are mixed toward the
     * palette's own text/canvas, so the same formula darkens in light mode and
     * lightens in dark mode.
     */
    function buildModeExtras(mode, palette) {
      if (mode !== 'light' || !palette) return [];
      const p = paletteWithFallback(palette, 'light');
      const mix = (a, b, percent) => `color-mix(in srgb, ${a} ${percent}%, ${b})`;
      return [
        ['--dsw-specific-sidebar-nav-item-hover', mix(p.sidebar, p.textPrimary, 92)],
        ['--dsw-specific-sidebar-nav-item-active', mix(p.sidebar, p.textPrimary, 86)],
        ['--dsw-specific-sidebar-nav-item-active-accent', mix(p.sidebar, p.accent, 82)],
        ['--dsw-alias-border-l1', `color-mix(in srgb, ${p.border} 30%, transparent)`],
        ['--dsw-alias-border-l2', `color-mix(in srgb, ${p.border} 50%, transparent)`],
        ['--dsw-alias-border-l3', `color-mix(in srgb, ${p.border} 70%, transparent)`],
        ['--dsw-alias-border-l4', p.border],
        ['--dsw-alias-label-tertiary', mix(p.textSecondary, p.canvas, 72)],
        ['--dsw-alias-label-caption', mix(p.textSecondary, p.canvas, 55)],
        ['--dsw-alias-button-primary-hover', mix(p.accent, p.textPrimary, 88)],
      ];
    }

    function buildDeclarations(mode, palette, tokens) {
      const declarations = new Map();
      const set = (token, value) => {
        if (!token || !value) return;
        declarations.set(token, `  ${token}: ${value} !important;`);
      };

      if (palette) {
        for (const role of PALETTE_ROLES) {
          const value = normalizeHex(palette[role.key], null);
          if (!value) continue;
          for (const token of ROLE_TOKENS[mode]?.[role.key] || []) set(token, value);
        }
        for (const [token, value] of buildModeExtras(mode, palette)) set(token, value);
      }

      if (tokens && typeof tokens === 'object') {
        for (const [token, value] of Object.entries(tokens)) {
          const hex = normalizeHex(value, null);
          if (!hex || !/^--dsw-[a-z0-9-]+$/i.test(token)) continue;
          set(token, hex);
        }
      }

      return [...declarations.values()];
    }

    /**
     * Build the runtime stylesheet for the current state.
     * @param {object} state persisted settings
     * @returns {string} CSS text
     */
    function buildStylesheet(state) {
      const palettes = paletteFromState(state);
      const tokens = tokensFromState(state);
      const blocks = [];
      for (const mode of ['light', 'dark']) {
        const declarations = buildDeclarations(mode, palettes[mode] || null, tokens[mode] || null);
        if (declarations.length) {
          blocks.push(`${modeSelector(mode)} {\n${declarations.join('\n')}\n}`);
        }
      }
      return blocks.join('\n');
    }

    /**
     * Contrast checks used by the settings UI and the offline checks.
     * @returns {Array<{kind: 'text'|'secondary'|'accent', ratio: number}>}
     */
    function paletteContrastWarnings(palette) {
      if (!palette) return [];
      const warnings = [];
      const text = normalizeHex(palette.textPrimary, null);
      const canvas = normalizeHex(palette.canvas, null);
      const secondary = normalizeHex(palette.textSecondary, null);
      const accent = normalizeHex(palette.accent, null);
      const accentText = normalizeHex(palette.accentText, null);
      if (text && canvas) {
        const ratio = contrastRatio(text, canvas);
        if (ratio < 4.5) warnings.push({ kind: 'text', ratio: Math.round(ratio * 10) / 10 });
      }
      if (secondary && canvas) {
        const ratio = contrastRatio(secondary, canvas);
        if (ratio < 3) warnings.push({ kind: 'secondary', ratio: Math.round(ratio * 10) / 10 });
      }
      if (accent && accentText) {
        const ratio = contrastRatio(accentText, accent);
        if (ratio < 3) warnings.push({ kind: 'accent', ratio: Math.round(ratio * 10) / 10 });
      }
      return warnings;
    }

    /** Backwards-compatible single warning for the primary text/canvas pair. */
    function paletteContrastWarning(palette) {
      return paletteContrastWarnings(palette).find((warning) => warning.kind === 'text') || null;
    }

    // ---------------------------------------------------------------------------
    // Light-draft generation. This is a starting point for a custom dark palette,
    // never a silent migration: the settings page shows it as an unsaved draft.
    // ---------------------------------------------------------------------------

    function mixHex(a, b, weight) {
      const first = hexToRgb(a);
      const second = hexToRgb(b);
      const t = clamp(weight, 0, 1);
      return rgbToHex(
        first.r + (second.r - first.r) * t,
        first.g + (second.g - first.g) * t,
        first.b + (second.b - first.b) * t,
      );
    }

    function deriveLightPalette(input) {
      const dark = paletteWithFallback(input, 'dark');
      const canvas = mixHex('#FFFFFF', dark.canvas, 0.055);
      const sidebar = mixHex(canvas, dark.sidebar, 0.1);
      const inputColor = mixHex('#FFFFFF', dark.input, 0.025);
      const surface = mixHex('#FFFFFF', dark.surface, 0.02);
      const surfaceAlt = mixHex(canvas, dark.surfaceAlt, 0.16);
      let textPrimary = mixHex('#0F1115', dark.textPrimary, 0.18);
      for (let weight = 0.18; weight > 0.02 && contrastRatio(textPrimary, canvas) < 7; weight -= 0.04) {
        textPrimary = mixHex('#0F1115', dark.textPrimary, weight);
      }
      let textSecondary = mixHex(textPrimary, canvas, 0.48);
      for (let weight = 0.48; weight > 0.1 && contrastRatio(textSecondary, canvas) < 3; weight -= 0.05) {
        textSecondary = mixHex(textPrimary, canvas, weight);
      }
      let accent = normalizeHex(dark.accent, '#4176E6');
      for (let step = 0; step < 12 && contrastRatio('#FFFFFF', accent) < 3.2; step += 1) {
        accent = mixHex(accent, '#0F1115', 0.08);
      }
      const accentText =
        contrastRatio('#FFFFFF', accent) >= contrastRatio('#0F1115', accent) ? '#FFFFFF' : '#0F1115';
      const border = mixHex(canvas, textPrimary, 0.2);
      return {
        sidebar,
        canvas,
        input: inputColor,
        surface,
        surfaceAlt,
        border,
        textPrimary,
        textSecondary,
        accent,
        accentText,
      };
    }

    // ==== src/25-presets.js =================================================
    // ---------------------------------------------------------------------------
    // Built-in presets: one entry per agent, each with one or more appearances.
    //
    // Every appearance carries a dark and a light palette. Names are neutral
    // ("Ink blue · inspired by Claude Code") on purpose: the palette is migrated
    // from public screenshots and brand material, not a reproduction of another
    // product's UI. `source` is shown in the panel so a user can judge the fidelity
    // themselves, and `confidence` says how the values were obtained.
    // ---------------------------------------------------------------------------

    const AGENTS = [
      {
        id: 'dsh',
        displayName: 'DeepSeek Harness',
        source: 'dsh-pure-theme',
        confidence: 'high',
        themes: [
          {
            id: 'jade-desk',
            displayName: '墨玉 · Jade desk',
            palettes: {
              dark: {
                sidebar: '#1D2724',
                canvas: '#222F2A',
                input: '#222F2A',
                surface: '#222F2A',
                surfaceAlt: '#26332E',
                border: '#2E3D36',
                textPrimary: '#E6EFE9',
                textSecondary: '#9FB3A8',
                accent: '#8FD3B4',
                accentText: '#12201A',
              },
              light: {
                sidebar: '#EEF4F1',
                canvas: '#F7FAF8',
                input: '#FFFFFF',
                surface: '#FFFFFF',
                surfaceAlt: '#E4EDE8',
                border: '#C6D6CE',
                textPrimary: '#15201B',
                textSecondary: '#5C6F65',
                accent: '#2F7D5E',
                accentText: '#FFFFFF',
              },
            },
          },
        ],
      },
      {
        id: 'claude-code',
        displayName: 'Claude Code',
        source: 'anthropic.com/claude-code',
        confidence: 'high',
        themes: [
          {
            id: 'warm-ink',
            displayName: '暖墨 · Warm ink',
            palettes: {
              dark: {
                sidebar: '#181818',
                canvas: '#1E1E1E',
                input: '#262626',
                surface: '#262626',
                surfaceAlt: '#2E2E2E',
                border: '#3A3A3A',
                textPrimary: '#EDE9E3',
                textSecondary: '#A6A19B',
                accent: '#DB7759',
                accentText: '#1E1E1E',
              },
              light: {
                sidebar: '#F6F1EA',
                canvas: '#FBF8F4',
                input: '#FFFFFF',
                surface: '#FFFFFF',
                surfaceAlt: '#EDE5DB',
                border: '#D8CCBD',
                textPrimary: '#241F1A',
                textSecondary: '#6B6258',
                accent: '#AE5336',
                accentText: '#FFFFFF',
              },
            },
          },
        ],
      },
      {
        id: 'codex',
        displayName: 'Codex',
        source: 'openai.com/codex',
        confidence: 'medium',
        themes: [
          {
            id: 'graphite',
            displayName: '石墨 · Graphite',
            palettes: {
              dark: {
                sidebar: '#0D0D0D',
                canvas: '#131313',
                input: '#1A1A1A',
                surface: '#1A1A1A',
                surfaceAlt: '#222222',
                border: '#2E2E2E',
                textPrimary: '#ECECEC',
                textSecondary: '#9B9B9B',
                accent: '#10A37F',
                accentText: '#FFFFFF',
              },
              light: {
                sidebar: '#F2F3F5',
                canvas: '#FFFFFF',
                input: '#FFFFFF',
                surface: '#FFFFFF',
                surfaceAlt: '#E7E9EC',
                border: '#D0D4DA',
                textPrimary: '#111214',
                textSecondary: '#5E6570',
                accent: '#0C7A5E',
                accentText: '#FFFFFF',
              },
            },
          },
        ],
      },
      {
        id: 'gemini',
        displayName: 'Gemini',
        source: 'gemini.google.com',
        confidence: 'medium',
        themes: [
          {
            id: 'google-dark',
            displayName: '雾灰 · Fog grey',
            palettes: {
              dark: {
                sidebar: '#131314',
                canvas: '#1E1F20',
                input: '#1E1F20',
                surface: '#282A2C',
                surfaceAlt: '#303134',
                border: '#3C4043',
                textPrimary: '#E3E3E3',
                textSecondary: '#9AA0A6',
                accent: '#8AB4F8',
                accentText: '#0B1220',
              },
              light: {
                sidebar: '#F1F4F9',
                canvas: '#FAFBFF',
                input: '#FFFFFF',
                surface: '#FFFFFF',
                surfaceAlt: '#E5EBF5',
                border: '#CBD6E8',
                textPrimary: '#141A24',
                textSecondary: '#5A6679',
                accent: '#2E69C9',
                accentText: '#FFFFFF',
              },
            },
          },
        ],
      },
      {
        id: 'codebuddy',
        displayName: 'CodeBuddy',
        source: 'copilot.tencent.com',
        confidence: 'high',
        themes: [
          {
            id: 'tencent-blue',
            displayName: '夜紫 · Night violet',
            palettes: {
              dark: {
                sidebar: '#121219',
                canvas: '#1C1C28',
                input: '#262730',
                surface: '#232330',
                surfaceAlt: '#2B2C3B',
                border: '#343545',
                textPrimary: '#E8E8F2',
                textSecondary: '#9A9CB0',
                accent: '#5A49F7',
                accentText: '#FFFFFF',
              },
              light: {
                sidebar: '#F3F2FA',
                canvas: '#FAF9FF',
                input: '#FFFFFF',
                surface: '#FFFFFF',
                surfaceAlt: '#E9E6F7',
                border: '#D2CCEB',
                textPrimary: '#1B1828',
                textSecondary: '#655F7A',
                accent: '#5340C9',
                accentText: '#FFFFFF',
              },
            },
          },
        ],
      },
      {
        id: 'workbuddy',
        displayName: 'WorkBuddy',
        source: 'workbuddy',
        confidence: 'low',
        themes: [
          {
            id: 'plum',
            displayName: '梅子 · Plum',
            palettes: {
              dark: {
                sidebar: '#17161A',
                canvas: '#1D1B21',
                input: '#232028',
                surface: '#232028',
                surfaceAlt: '#2A2731',
                border: '#34313C',
                textPrimary: '#EFEAF3',
                textSecondary: '#A39CAF',
                accent: '#FF7A45',
                accentText: '#1D1B21',
              },
              light: {
                sidebar: '#F7F1F0',
                canvas: '#FCF9F8',
                input: '#FFFFFF',
                surface: '#FFFFFF',
                surfaceAlt: '#F0E5E2',
                border: '#DDCCC7',
                textPrimary: '#241B19',
                textSecondary: '#705F5B',
                accent: '#B4532E',
                accentText: '#FFFFFF',
              },
            },
          },
        ],
      },
      {
        id: 'kimi-code',
        displayName: 'Kimi Code',
        source: 'kimi.moonshot.cn',
        confidence: 'low',
        themes: [
          {
            id: 'indigo',
            displayName: '靛青 · Indigo',
            palettes: {
              dark: {
                sidebar: '#101014',
                canvas: '#16161B',
                input: '#1C1C22',
                surface: '#1C1C22',
                surfaceAlt: '#24242C',
                border: '#2E2E38',
                textPrimary: '#ECEBF5',
                textSecondary: '#9C9AAD',
                accent: '#6C5CE7',
                accentText: '#FFFFFF',
              },
              light: {
                sidebar: '#F1F1F7',
                canvas: '#FAFAFF',
                input: '#FFFFFF',
                surface: '#FFFFFF',
                surfaceAlt: '#E7E6F3',
                border: '#CFCDE3',
                textPrimary: '#181725',
                textSecondary: '#615F76',
                accent: '#5145C9',
                accentText: '#FFFFFF',
              },
            },
          },
        ],
      },
      {
        id: 'qwen',
        displayName: '通义千问',
        source: 'tongyi.aliyun.com',
        confidence: 'low',
        themes: [
          {
            id: 'violet',
            displayName: '青紫 · Violet',
            palettes: {
              dark: {
                sidebar: '#14151A',
                canvas: '#1A1B21',
                input: '#1F2028',
                surface: '#1F2028',
                surfaceAlt: '#262832',
                border: '#32353F',
                textPrimary: '#EDEEF5',
                textSecondary: '#9DA1AE',
                accent: '#615CED',
                accentText: '#FFFFFF',
              },
              light: {
                sidebar: '#F2F1FA',
                canvas: '#FAF9FF',
                input: '#FFFFFF',
                surface: '#FFFFFF',
                surfaceAlt: '#E8E6F5',
                border: '#D0CDE7',
                textPrimary: '#191727',
                textSecondary: '#615E78',
                accent: '#5348C9',
                accentText: '#FFFFFF',
              },
            },
          },
        ],
      },
      {
        id: 'zhipu',
        displayName: '智谱清言',
        source: 'chatglm.cn',
        confidence: 'low',
        themes: [
          {
            id: 'cobalt',
            displayName: '钴蓝 · Cobalt',
            palettes: {
              dark: {
                sidebar: '#101319',
                canvas: '#161A22',
                input: '#1B2029',
                surface: '#1B2029',
                surfaceAlt: '#222833',
                border: '#2C3442',
                textPrimary: '#E8EDF5',
                textSecondary: '#93A0B4',
                accent: '#3D6BFF',
                accentText: '#FFFFFF',
              },
              light: {
                sidebar: '#F0F3F8',
                canvas: '#F9FBFF',
                input: '#FFFFFF',
                surface: '#FFFFFF',
                surfaceAlt: '#E4EAF4',
                border: '#C9D4E5',
                textPrimary: '#131A24',
                textSecondary: '#58667A',
                accent: '#2E5EDB',
                accentText: '#FFFFFF',
              },
            },
          },
        ],
      },
    ];

    // ==== src/30-storage.js =================================================
    // ---------------------------------------------------------------------------
    // Persistence: settings in localStorage, named themes in the same document.
    // v5 stores one optional palette per colour scheme plus the `baseline` of the
    // theme as it was applied, so one mode can be reset to its unedited colours
    // without touching the other. v3's single dark palette migrates to
    // `palettes.dark` so existing themes never change their meaning.
    // ---------------------------------------------------------------------------

    // The package was renamed; carry a profile's saved themes over once instead of
    // making the rename look like data loss.
    const LEGACY_STORAGE_KEYS = ['dsh-simple-theme:settings:v1'];
    const THEME_FILE_SCHEMA = 'https://github.com/Bulutor/dsh-pure-theme/blob/main/docs/theme-format.md';

    function defaultPalettes() {
      return { dark: null, light: null };
    }

    function defaultTokens() {
      return { dark: null, light: null };
    }

    function defaultState() {
      return {
        v: 5,
        palettes: defaultPalettes(),
        tokens: defaultTokens(),
        activeName: '',
        activeSource: null,
        activeThemeId: null,
        baseline: null,
        savedThemes: [],
      };
    }

    function loadState() {
      const base = defaultState();
      try {
        let raw = window.localStorage.getItem(STORAGE_KEY);
        let migrated = false;
        if (!raw) {
          for (const key of LEGACY_STORAGE_KEYS) {
            raw = window.localStorage.getItem(key);
            if (raw) {
              migrated = true;
              break;
            }
          }
        }
        if (!raw) return base;
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object') return base;
        const activeName =
          typeof parsed.activeName === 'string'
            ? parsed.activeName
            : typeof parsed.presetName === 'string'
              ? parsed.presetName
              : '';
        const activeSource = ['preset', 'custom', 'saved'].includes(parsed.activeSource)
          ? parsed.activeSource
          : parsed.presetId
            ? 'preset'
            : null;

        let palettes;
        let tokens;
        if (parsed.palettes && typeof parsed.palettes === 'object') {
          palettes = sanitizePalettes(parsed.palettes);
          tokens = sanitizeTokensByMode(parsed.tokens);
        } else {
          palettes = {
            dark: sanitizePalette(parsed.palette),
            light: sanitizePalette(parsed.lightPalette),
          };
          tokens = {
            dark: sanitizeTokens(parsed.tokens),
            light: sanitizeTokens(parsed.lightTokens),
          };
          migrated = true;
        }

        const next = {
          ...base,
          palettes,
          tokens,
          activeName,
          activeSource,
          activeThemeId: typeof parsed.activeThemeId === 'string' ? parsed.activeThemeId : null,
          baseline: sanitizeBaseline(parsed.baseline),
          savedThemes: sanitizeSavedThemes(parsed.savedThemes),
        };
        // v4 and older never stored a baseline. Treat the colours already on screen
        // as the unedited state so existing users see the new control immediately;
        // the first later edit still has a sensible starting point.
        if (!next.baseline && (palettes.dark || palettes.light || tokens.dark || tokens.light)) {
          next.baseline = baselineFromState(next);
          migrated = true;
        }
        if (migrated || parsed.v !== 5 || !parsed.palettes) saveState(next);
        return next;
      } catch {
        return base;
      }
    }

    /**
     * Persist state and report whether it reached localStorage.
     * A full or blocked localStorage must not break the settings page, but callers
     * that show "saved" copy need to know the write failed.
     * @returns {boolean}
     */
    function saveState(state) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        return true;
      } catch {
        return false;
      }
    }

    // ---------------------------------------------------------------------------
    // Baseline: the theme's colours at the moment it was applied. The colours card
    // edits one mode at a time, so this is what "discard the edits in this mode"
    // restores. It is deliberately a snapshot, not a reference: deleting or
    // overwriting a saved theme must not change what the button restores.
    // ---------------------------------------------------------------------------

    function clonePalettes(palettes) {
      return {
        dark: palettes && palettes.dark ? { ...palettes.dark } : null,
        light: palettes && palettes.light ? { ...palettes.light } : null,
      };
    }

    function cloneTokens(tokens) {
      return {
        dark: tokens && tokens.dark ? { ...tokens.dark } : null,
        light: tokens && tokens.light ? { ...tokens.light } : null,
      };
    }

    function createBaseline({ palettes, tokens, name, source, themeId } = {}) {
      return {
        palettes: clonePalettes(palettes),
        tokens: cloneTokens(tokens),
        name: typeof name === 'string' ? name.trim().slice(0, 80) : '',
        source: ['preset', 'saved', 'custom'].includes(source) ? source : null,
        themeId: typeof themeId === 'string' && themeId ? themeId : null,
      };
    }

    function baselineFromState(value) {
      return createBaseline({
        palettes: value.palettes,
        tokens: value.tokens,
        name: value.activeName,
        source: value.activeSource,
        themeId: value.activeThemeId,
      });
    }

    function sanitizeBaseline(input) {
      if (!input || typeof input !== 'object') return null;
      if (!('palettes' in input) && !('tokens' in input)) return null;
      const name = typeof input.name === 'string' ? input.name.trim().slice(0, 80) : '';
      const source = ['preset', 'saved', 'custom'].includes(input.source) ? input.source : null;
      return {
        palettes: sanitizePalettes(input.palettes),
        tokens: sanitizeTokensByMode(input.tokens),
        name,
        source,
        themeId: typeof input.themeId === 'string' && input.themeId ? input.themeId : null,
      };
    }

    /** Shallow value comparison for palette roles and token names. */
    function sameStringMap(left, right) {
      if (!left || !right) return !left && !right;
      const leftKeys = Object.keys(left);
      const rightKeys = Object.keys(right);
      if (leftKeys.length !== rightKeys.length) return false;
      return leftKeys.every((key) => left[key] === right[key]);
    }

    function hasModeEdits(value, baseline, mode) {
      if (!baseline || (mode !== 'dark' && mode !== 'light')) return false;
      return !(
        sameStringMap(value.palettes && value.palettes[mode], baseline.palettes[mode]) &&
        sameStringMap(value.tokens && value.tokens[mode], baseline.tokens[mode])
      );
    }

    function modesMatchBaseline(value, baseline) {
      if (!baseline) return false;
      return MODES.every((mode) => !hasModeEdits(value, baseline, mode));
    }

    /**
     * Build the state patch for discarding one mode's edits. `clean` says whether
     * both modes now match the baseline, which decides whether the theme can be
     * marked as active again.
     */
    function restoreModeFromBaseline(value, baseline, mode) {
      if (!baseline || (mode !== 'dark' && mode !== 'light')) return null;
      const palettes = clonePalettes(value.palettes);
      const tokens = cloneTokens(value.tokens);
      palettes[mode] = baseline.palettes[mode] ? { ...baseline.palettes[mode] } : null;
      tokens[mode] = baseline.tokens[mode] ? { ...baseline.tokens[mode] } : null;
      const clean = modesMatchBaseline({ palettes, tokens }, baseline);
      return {
        clean,
        patch: {
          palettes,
          tokens,
          activeName: clean ? baseline.name : (value.activeName || baseline.name || '').slice(0, 80),
          activeSource: clean ? baseline.source : 'custom',
          activeThemeId: clean ? baseline.themeId : null,
        },
      };
    }

    function sanitizePalette(input) {
      return normalizePalette(input);
    }

    function sanitizePalettes(input) {
      const palettes = defaultPalettes();
      if (!input || typeof input !== 'object') return palettes;
      palettes.dark = sanitizePalette(input.dark);
      palettes.light = sanitizePalette(input.light);
      return palettes;
    }

    function sanitizeTokens(input) {
      if (!input || typeof input !== 'object') return null;
      const tokens = {};
      let count = 0;
      for (const [key, value] of Object.entries(input)) {
        const hex = normalizeHex(value, null);
        if (!hex || !/^--dsw-[a-z0-9-]+$/i.test(key)) continue;
        tokens[key] = hex;
        count += 1;
      }
      return count ? tokens : null;
    }

    function sanitizeTokensByMode(input) {
      const tokens = defaultTokens();
      if (!input || typeof input !== 'object') return tokens;
      const keys = Object.keys(input);
      if (keys.some((key) => key.startsWith('--dsw-'))) {
        tokens.dark = sanitizeTokens(input);
        return tokens;
      }
      tokens.dark = sanitizeTokens(input.dark);
      tokens.light = sanitizeTokens(input.light);
      return tokens;
    }

    function newThemeId() {
      if (window.crypto?.randomUUID) return window.crypto.randomUUID();
      return `theme-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    }

    function sanitizeSavedThemes(input) {
      if (!Array.isArray(input)) return [];
      const out = [];
      const ids = new Set();
      for (const item of input) {
        if (!item || typeof item !== 'object') continue;
        const palettes =
          item.palettes && typeof item.palettes === 'object'
            ? sanitizePalettes(item.palettes)
            : { dark: sanitizePalette(item.palette), light: sanitizePalette(item.lightPalette) };
        const tokens = sanitizeTokensByMode(item.tokens);
        if (!palettes.dark && !palettes.light && !tokens.dark && !tokens.light) continue;
        let id = typeof item.id === 'string' && item.id ? item.id : newThemeId();
        if (ids.has(id)) id = newThemeId();
        ids.add(id);
        const name =
          typeof item.name === 'string' && item.name.trim()
            ? item.name.trim().slice(0, 80)
            : 'Untitled';
        out.push({
          id,
          name,
          palettes,
          tokens,
          source: ['vscode', 'file'].includes(item.source) ? item.source : 'custom',
          fileName: typeof item.fileName === 'string' ? item.fileName.slice(0, 120) : '',
          createdAt: Number.isFinite(item.createdAt) ? item.createdAt : Date.now(),
        });
        if (out.length >= 50) break;
      }
      return out;
    }

    /**
     * Build the record stored in "My themes". The record is a snapshot: later
     * edits to the active colours must not mutate a theme the user already saved.
     */
    function createSavedTheme({ name, palettes, tokens, source, fileName } = {}) {
      return {
        id: newThemeId(),
        name,
        palettes: clonePalettes(palettes),
        tokens: cloneTokens(tokens),
        source: ['vscode', 'file'].includes(source) ? source : 'custom',
        fileName: typeof fileName === 'string' ? fileName.slice(0, 120) : '',
        createdAt: Date.now(),
      };
    }

    /** The one field an import-save is allowed to change: the saved-theme list. */
    function savedThemesPatch(state, theme) {
      return {
        savedThemes: [theme, ...(Array.isArray(state.savedThemes) ? state.savedThemes : [])].slice(0, 50),
      };
    }

    // ---------------------------------------------------------------------------
    // Theme files.
    // ---------------------------------------------------------------------------

    /**
     * Strip `//` and block comments from a JSONC theme file. The scanner keeps
     * string contents untouched, so `https://…` in `$schema` is not mistaken for
     * a comment. BOM handling stays in `parseThemeText`.
     * @param {string} text
     * @returns {string}
     */
    function stripJsonComments(text) {
      const source = String(text ?? '');
      let out = '';
      let inString = false;
      let escaped = false;
      let inLine = false;
      let inBlock = false;

      for (let index = 0; index < source.length; index += 1) {
        const char = source[index];
        const next = source[index + 1];

        if (inLine) {
          if (char === '\n' || char === '\r') {
            inLine = false;
            out += char;
          }
          continue;
        }
        if (inBlock) {
          if (char === '*' && next === '/') {
            inBlock = false;
            index += 1;
          } else if (char === '\n' || char === '\r') {
            out += char;
          }
          continue;
        }
        if (inString) {
          out += char;
          if (escaped) escaped = false;
          else if (char === '\\') escaped = true;
          else if (char === '"') inString = false;
          continue;
        }
        if (char === '"') {
          inString = true;
          out += char;
          continue;
        }
        if (char === '/' && next === '/') {
          inLine = true;
          index += 1;
          continue;
        }
        if (char === '/' && next === '*') {
          inBlock = true;
          index += 1;
          continue;
        }
        out += char;
      }

      return out;
    }

    /**
     * Parse a theme file that may carry documentation comments, as the downloaded
     * example does. Throws like JSON.parse when the remaining text is invalid.
     * @param {string} text
     * @returns {unknown}
     */
    function parseThemeText(text) {
      return JSON.parse(stripJsonComments(String(text ?? '').replace(/^\uFEFF/, '')));
    }

    /** VS Code colour keys → palette roles, used when a user uploads a VS Code theme. */
    const VSCODE_KEYS = [
      ['sidebar', ['sideBar.background', 'activityBar.background']],
      ['canvas', ['editor.background', 'editorGroupHeader.tabsBackground']],
      ['input', ['input.background', 'editorWidget.background']],
      ['surface', ['panel.background', 'terminal.background']],
      ['surfaceAlt', ['menu.background', 'quickInput.background', 'dropdown.background']],
      ['border', ['panel.border', 'sideBar.border', 'editorGroup.border', 'contrastBorder']],
      ['textPrimary', ['editor.foreground', 'foreground']],
      ['textSecondary', ['descriptionForeground', 'sideBar.foreground', 'input.placeholderForeground']],
      ['accent', ['button.background', 'focusBorder', 'activityBarBadge.background', 'textLink.foreground']],
      ['accentText', ['button.foreground']],
    ];

    function paletteFromVscode(colors) {
      const palette = {};
      for (const [role, keys] of VSCODE_KEYS) {
        for (const key of keys) {
          const value = normalizeHex(colors[key], null);
          if (value) {
            palette[role] = value;
            break;
          }
        }
      }
      return sanitizePalette(palette);
    }

    function themeLooksLight(parsed) {
      if (parsed.type === 'light') return true;
      if (parsed.type === 'dark') return false;
      const colors = parsed.colors && typeof parsed.colors === 'object' ? parsed.colors : {};
      const background =
        normalizeHex(colors['editor.background'], null) ||
        normalizeHex(colors['sideBar.background'], null);
      return background ? relativeLuminance(background) > 0.5 : false;
    }

    function themeName(parsed, fallback) {
      return typeof parsed.name === 'string' && parsed.name.trim() ? parsed.name.trim() : fallback;
    }

    /**
     * Validate an uploaded theme file.
     * @param {unknown} parsed JSON.parse result
     * @returns {{ok: true, theme: object} | {ok: false, reason: string}}
     */
    function readThemeFile(parsed) {
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        return { ok: false, reason: 'not-an-object' };
      }

      // v2: explicit dark/light palettes.
      if (parsed.palettes && typeof parsed.palettes === 'object') {
        const palettes = sanitizePalettes(parsed.palettes);
        const tokens = sanitizeTokensByMode(parsed.tokens || parsed.tokensByMode);
        if (!palettes.dark && !palettes.light && !tokens.dark && !tokens.light) {
          return { ok: false, reason: 'no-palette' };
        }
        return {
          ok: true,
          theme: {
            name: themeName(parsed, 'Theme'),
            source: 'theme-file',
            palettes,
            tokens,
            version: 2,
          },
        };
      }

      // VS Code / VS Code-fork themes: { colors: { ... } }
      if (parsed.colors && typeof parsed.colors === 'object') {
        const palette = paletteFromVscode(parsed.colors);
        if (!palette) return { ok: false, reason: 'vscode-no-usable-colors' };
        const mode = themeLooksLight(parsed) ? 'light' : 'dark';
        return {
          ok: true,
          theme: {
            name: themeName(parsed, 'VS Code theme'),
            source: 'vscode',
            palettes: {
              dark: mode === 'dark' ? palette : null,
              light: mode === 'light' ? palette : null,
            },
            tokens: defaultTokens(),
            detectedMode: mode,
            version: 1,
          },
        };
      }

      // v1: a single palette, dark unless basedOn says otherwise.
      const mode = parsed.basedOn === 'light' ? 'light' : 'dark';
      const palette = sanitizePalette(parsed.palette || parsed.colors || parsed);
      const tokens = sanitizeTokens(parsed.tokens);
      if (!palette && !tokens) return { ok: false, reason: 'no-palette' };

      return {
        ok: true,
        theme: {
          name: themeName(parsed, 'Theme'),
          source: 'theme-file',
          palettes: {
            dark: mode === 'dark' ? palette : null,
            light: mode === 'light' ? palette : null,
          },
          tokens: {
            dark: mode === 'dark' ? tokens : null,
            light: mode === 'light' ? tokens : null,
          },
          detectedMode: mode,
          version: 1,
        },
      };
    }

    function exportThemeFile(state) {
      const palettes =
        state.palettes && typeof state.palettes === 'object'
          ? sanitizePalettes(state.palettes)
          : { dark: sanitizePalette(state.palette), light: sanitizePalette(state.lightPalette) };
      const tokens =
        state.tokens && typeof state.tokens === 'object'
          ? sanitizeTokensByMode(state.tokens)
          : { dark: sanitizeTokens(state.tokens), light: null };

      const file = {
        $schema: THEME_FILE_SCHEMA,
        version: 2,
        name: state.activeName || 'My DSH theme',
        author: '',
        palettes: {},
      };
      for (const mode of ['dark', 'light']) {
        if (palettes[mode]) file.palettes[mode] = palettes[mode];
      }
      if (tokens.dark || tokens.light) {
        file.tokens = {};
        for (const mode of ['dark', 'light']) {
          if (tokens[mode]) file.tokens[mode] = tokens[mode];
        }
      }
      // 0.3 clients understand the legacy fields; they only ever see the dark half.
      if (palettes.dark) file.palette = palettes.dark;
      return file;
    }

    // ==== src/40-engine.js ==================================================
    // ---------------------------------------------------------------------------
    // Runtime: single source of truth, stylesheet rendering, update check.
    // ---------------------------------------------------------------------------

    let state = defaultState();
    let updateInfo = { checked: false, latest: null, error: null };
    const listeners = new Set();
    let syncChannel = null;

    function notify() {
      for (const listener of [...listeners]) {
        try {
          listener(state, updateInfo);
        } catch (error) {
          console.error('[dsh-pure-theme] listener failed', error);
        }
      }
    }

    function subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }

    function getState() {
      return state;
    }

    function getUpdateInfo() {
      return updateInfo;
    }

    /**
     * Replace part of the persisted state and repaint.
     * @returns {boolean} whether the state was written to localStorage
     */
    function patchState(patch) {
      state = { ...state, ...patch };
      const persisted = saveState(state);
      // Other windows cannot load a state that never reached localStorage, so do
      // not ask them to reload and silently replace the in-memory theme.
      if (persisted) broadcastState();
      renderStylesheet();
      notify();
      return persisted;
    }

    /**
     * Persist a patch first and only then commit it in memory. Explicit "save"
     * actions use this so a blocked localStorage cannot leave a theme in the list
     * that was never written, or make the UI claim success.
     * @returns {boolean}
     */
    function tryPatchState(patch) {
      const next = { ...state, ...patch };
      if (!saveState(next)) return false;
      state = next;
      broadcastState();
      renderStylesheet();
      notify();
      return true;
    }

    function replaceState(next) {
      state = next;
      const persisted = saveState(state);
      if (persisted) broadcastState();
      renderStylesheet();
      notify();
      return persisted;
    }

    function ensureStyleTag() {
      let tag = document.getElementById(STYLE_ID);
      if (!tag) {
        tag = document.createElement('style');
        tag.id = STYLE_ID;
        document.head.appendChild(tag);
      }
      return tag;
    }

    /** Rebuild the runtime stylesheet from the current palette and tokens. */
    function renderStylesheet() {
      ensureStyleTag().textContent = buildStylesheet(state);
    }

    /** Remove every trace of the plugin's styling (used when disabled/unloaded). */
    function clearStylesheet() {
      document.getElementById(STYLE_ID)?.remove();
    }

    /** Pick up a state written by another window or tab. */
    function reloadFromStorage() {
      state = loadState();
      renderStylesheet();
      notify();
    }

    function setSyncChannel(channel) {
      syncChannel = channel;
    }

    function broadcastState() {
      if (!syncChannel) return;
      try {
        syncChannel.postMessage({ type: 'state', at: Date.now() });
      } catch {
        // A closed channel must not break a settings save.
      }
    }

    // ---------------------------------------------------------------------------
    // Update check — the plugin is versioned on npm, so the registry is the source
    // of truth. Failures stay silent: an offline machine must not see an error row.
    // ---------------------------------------------------------------------------

    const REGISTRY_URL = 'https://registry.npmjs.org/dsh-pure-theme/latest';

    function isNewerVersion(latest, current) {
      const parse = (value) =>
        String(value || '')
          .replace(/^v/, '')
          .split('-')[0]
          .split('.')
          .map((part) => Number.parseInt(part, 10) || 0);
      const a = parse(latest);
      const b = parse(current);
      for (let i = 0; i < 3; i += 1) {
        if ((a[i] || 0) > (b[i] || 0)) return true;
        if ((a[i] || 0) < (b[i] || 0)) return false;
      }
      return false;
    }

    async function checkForUpdate() {
      try {
        const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
        const timer = controller ? setTimeout(() => controller.abort(), 8000) : null;
        const response = await fetch(REGISTRY_URL, {
          signal: controller?.signal,
          headers: { accept: 'application/json' },
        });
        if (timer) clearTimeout(timer);
        if (!response.ok) throw new Error(`registry ${response.status}`);
        const body = await response.json();
        const latest = typeof body?.version === 'string' ? body.version : null;
        updateInfo = { checked: true, latest, error: null, newer: latest ? isNewerVersion(latest, VERSION) : false };
      } catch (error) {
        updateInfo = { checked: true, latest: null, error: String(error?.message || error), newer: false };
      }
      notify();
    }

    // ---------------------------------------------------------------------------
    // React binding.
    // ---------------------------------------------------------------------------

    function useSettings() {
      const [snapshot, setSnapshot] = useState({ state, updateInfo });
      useEffect(() => {
        setSnapshot({ state, updateInfo });
        return subscribe((nextState, nextUpdate) => setSnapshot({ state: nextState, updateInfo: nextUpdate }));
      }, []);
      return snapshot;
    }

    // ==== src/50-ui-style.js ================================================
    // ---------------------------------------------------------------------------
    // Settings-page styling. Every colour, radius and font comes from the host
    // theme tokens, so the page follows the active DSH theme instead of imposing
    // its own look.
    // ---------------------------------------------------------------------------

    // DSH 0.2.x picks settings-nav glyphs from a hard-coded id table and falls back
    // to a gear for section ids it does not know. The slot contract has no icon
    // option yet, so the plugin marks its own row and paints a palette with a mask.
    // The SVG is monochrome: the pseudo-element inherits `currentColor`.
    const NAV_ATTR = 'data-dsh-pure-theme-nav';
    const NAV_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="black" stroke-width="1.6" stroke-linejoin="round" d="M12 2.8C6.8 2.8 2.8 6.4 2.8 11c0 4.6 4 8.2 9.2 8.2 1.2 0 2.2-1 2.2-2.2 0-.6-.3-1.2-.7-1.6-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0 .4.4 1 .6 1.6.6h.9c2.2 0 3.8-1.7 3.8-3.8 0-4.5-4-8-9.2-8Z"/><circle cx="7.2" cy="11.2" r="1.4" fill="black"/><circle cx="9.8" cy="7.6" r="1.4" fill="black"/><circle cx="14.2" cy="7.6" r="1.4" fill="black"/><circle cx="16.8" cy="11.2" r="1.4" fill="black"/></svg>`;
    const NAV_ICON_MASK = `url("data:image/svg+xml,${encodeURIComponent(NAV_ICON_SVG)}")`;

    const UI_CSS = `
    .mst-page{display:flex;flex-direction:column;gap:14px;padding:16px 0 8px}
    .mst-badge{display:inline-flex;align-items:center;gap:4px;font-size:11px;line-height:16px;padding:2px 8px;border-radius:999px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);border:.5px solid var(--dsw-alias-border-l2);white-space:nowrap;max-width:min(320px,48%);min-width:0;flex:0 1 auto}
    .mst-badge-label{opacity:.62}
    .mst-badge-value{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:500}
    .mst-card{border:.5px solid var(--dsw-alias-border-l2);border-radius:var(--dsw-radius-lg);background:var(--dsw-alias-bg-layer-1,var(--dsw-alias-bg-layer-2));padding:14px 16px}
    .mst-card-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:10px}
    .mst-card-title{font-size:13px;line-height:20px;font-weight:500;color:var(--dsw-alias-label-primary)}
    .mst-card-desc{font-size:11px;line-height:17px;color:var(--dsw-alias-label-secondary);margin-top:2px}
    .mst-body{display:flex;flex-direction:column;gap:10px}
    .mst-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
    .mst-field{display:flex;align-items:center;gap:6px;font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary)}
    .mst-divider{height:.5px;background:var(--dsw-alias-border-l2);margin:2px 0}
    .mst-btn{height:28px;padding:0 10px;font:inherit;font-size:12px;line-height:1;border-radius:var(--dsw-radius-sm);border:.5px solid var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);cursor:pointer;display:inline-flex;align-items:center;gap:6px;white-space:nowrap}
    .mst-btn:hover{background:var(--dsw-alias-interactive-bg-hover)}
    .mst-btn:disabled{opacity:.5;cursor:default}
    .mst-btn-primary{background:var(--dsw-alias-brand-primary);border-color:transparent;color:var(--dsw-alias-label-primary-foreground,#fff)}
    .mst-btn-ghost{background:transparent;border-color:transparent;color:var(--dsw-alias-label-secondary);padding:0 6px}
    .mst-btn-ghost:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}
    .mst-btn-danger{color:var(--dsw-alias-state-error-primary,#ef4444)}
    .mst-input,.mst-select{height:28px;padding:0 8px;font:inherit;font-size:12px;border-radius:var(--dsw-radius-sm);border:.5px solid var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);box-sizing:border-box}
    .mst-input::placeholder{color:var(--dsw-alias-label-tertiary)}
    .mst-input:focus,.mst-select:focus{outline:1px solid var(--dsw-alias-brand-primary);outline-offset:-1px}
    .mst-grow{flex:1;min-width:0}
    .mst-dots{display:flex;gap:3px;flex:none}
    .mst-dot{width:12px;height:12px;border-radius:3px;border:.5px solid rgba(127,127,127,.45);box-shadow:0 0 0 .5px rgba(0,0,0,.22);flex:none}
    .mst-chip{display:inline-flex;align-items:center;gap:6px;padding:5px 8px;border-radius:var(--dsw-radius-sm);border:.5px solid var(--dsw-alias-border-l3);background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:12px;line-height:18px;cursor:pointer;text-align:left}
    .mst-chip:hover{background:var(--dsw-alias-interactive-bg-hover)}
    .mst-chip[aria-pressed=true]{border-color:var(--dsw-alias-brand-primary);background:color-mix(in srgb,var(--dsw-alias-brand-primary) 10%,transparent)}
    .mst-chips{display:flex;flex-wrap:wrap;gap:6px}
    .mst-mode-row{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap}
    .mst-mode-control{display:inline-flex;align-items:center;gap:8px;min-width:0}
    .mst-mode-label{font-size:11px;line-height:17px;color:var(--dsw-alias-label-secondary);white-space:nowrap}
    .mst-modes{display:inline-flex;padding:2px;border-radius:999px;border:.5px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2)}
    .mst-mode{height:24px;padding:0 10px;border:0;border-radius:999px;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:11px;line-height:1;cursor:pointer;display:inline-flex;align-items:center;gap:5px}
    .mst-mode:hover{color:var(--dsw-alias-label-primary)}
    .mst-mode[aria-pressed=true]{background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);box-shadow:0 0 0 .5px var(--dsw-alias-border-l3)}
    .mst-mode-dot{width:5px;height:5px;border-radius:999px;background:currentColor;opacity:.3}
    .mst-mode[data-custom=true] .mst-mode-dot{opacity:1;background:var(--dsw-alias-brand-primary)}
    .mst-mode-badge{display:inline-flex;align-items:center;padding:1px 6px;border-radius:999px;border:.5px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);font-size:10px;line-height:14px;white-space:nowrap;flex:none}
    .mst-hint{font-size:11px;line-height:17px;color:var(--dsw-alias-label-secondary)}
    .mst-mono{font-family:var(--ds-font-family-code,monospace)}
    .mst-empty{padding:10px 12px;border:.5px dashed var(--dsw-alias-border-l3);border-radius:var(--dsw-radius-md);font-size:11px;line-height:17px;color:var(--dsw-alias-label-secondary);text-align:center}
    .mst-saved{display:flex;align-items:center;gap:8px;flex:none;height:48px;box-sizing:border-box;padding:7px 8px;border-radius:var(--dsw-radius-md);border:.5px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2)}
    /* Three 48px rows + two 10px gaps; the fourth row scrolls. */
    .mst-saved-list{max-height:164px;overflow-y:auto;overscroll-behavior:contain;padding-right:2px;scrollbar-width:thin;scrollbar-color:var(--dsw-alias-border-l3) transparent}
    .mst-saved-list::-webkit-scrollbar{width:6px}
    .mst-saved-list::-webkit-scrollbar-track{background:transparent}
    .mst-saved-list::-webkit-scrollbar-thumb{background:var(--dsw-alias-border-l3);border-radius:999px}
    .mst-saved-list::-webkit-scrollbar-thumb:hover{background:var(--dsw-alias-label-tertiary)}
    .mst-saved[data-active=true]{border-color:var(--dsw-alias-brand-primary)}
    .mst-saved-main{flex:1;min-width:0}
    .mst-saved-name{font-size:12px;line-height:18px;color:var(--dsw-alias-label-primary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .mst-saved-meta{font-size:10px;line-height:15px;color:var(--dsw-alias-label-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .mst-saved-actions{display:flex;gap:2px;flex:none}
    .mst-drop{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;padding:16px;border:1px dashed var(--dsw-alias-border-l3);border-radius:var(--dsw-radius-md);cursor:pointer;text-align:center;color:var(--dsw-alias-label-secondary);transition:border-color .12s ease,background .12s ease}
    .mst-drop:hover,.mst-drop[data-over=true]{border-color:var(--dsw-alias-brand-primary);background:color-mix(in srgb,var(--dsw-alias-brand-primary) 6%,transparent)}
    .mst-drop-main{font-size:12px;line-height:18px;color:var(--dsw-alias-label-primary)}
    .mst-drop-sub{font-size:10px;line-height:15px;color:var(--dsw-alias-label-tertiary)}
    .mst-draft{display:flex;flex-direction:column;gap:8px;padding:10px;border-radius:var(--dsw-radius-md);border:.5px solid var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-layer-2)}
    .mst-color-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
    .mst-color{display:flex;align-items:center;gap:8px;min-width:0;padding:7px 8px;border-radius:var(--dsw-radius-md);border:.5px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2)}
    .mst-swatch{position:relative;width:32px;height:32px;border-radius:var(--dsw-radius-sm);border:.5px solid var(--dsw-alias-border-l3);box-shadow:inset 0 0 0 1px rgba(255,255,255,.04);flex:none;cursor:pointer;overflow:hidden}
    .mst-swatch input{position:absolute;inset:0;width:100%;height:100%;padding:0;border:0;opacity:0;cursor:pointer}
    .mst-swatch:focus-within{outline:1px solid var(--dsw-alias-brand-primary);outline-offset:1px}
    .mst-color-copy{flex:1;min-width:0}
    .mst-color-name{font-size:12px;line-height:17px;color:var(--dsw-alias-label-primary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .mst-color-hint{font-size:10px;line-height:14px;color:var(--dsw-alias-label-secondary);overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
    .mst-hex{width:74px;height:26px;padding:0 6px;font:inherit;font-size:11px;font-family:var(--ds-font-family-code,monospace);text-transform:uppercase;border-radius:var(--dsw-radius-sm);border:.5px solid var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-layer-1,var(--dsw-alias-bg-layer-2));color:var(--dsw-alias-label-primary);box-sizing:border-box;flex:none}
    .mst-hex:focus{outline:1px solid var(--dsw-alias-brand-primary);outline-offset:-1px}
    .mst-preview{display:flex;height:156px;border-radius:var(--dsw-radius-md);border:.5px solid var(--dsw-alias-border-l2);overflow:hidden;position:relative}
    .mst-preview-side{width:31%;padding:10px;display:flex;flex-direction:column;gap:7px;box-sizing:border-box}
    .mst-preview-brand{font-size:10px;line-height:14px;font-weight:600;letter-spacing:.04em}
    .mst-preview-nav{height:9px;border-radius:3px;opacity:.9}
    .mst-preview-main{flex:1;padding:12px;display:flex;flex-direction:column;gap:8px;box-sizing:border-box}
    .mst-preview-line{height:5px;border-radius:3px;opacity:.85}
    .mst-preview-line.short{width:46%}
    .mst-preview-spacer{flex:1}
    .mst-preview-card{padding:7px 8px;border:.5px solid;border-radius:6px;display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:10px;line-height:14px}
    .mst-preview-button{padding:2px 7px;border-radius:5px;font-size:9px;line-height:14px;white-space:nowrap}
    .mst-preview-input{height:28px;padding:0 8px;border:.5px solid;border-radius:6px;display:flex;align-items:center;font-size:10px;line-height:28px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .mst-preview-label{position:absolute;right:8px;top:8px;font-size:9px;line-height:14px;padding:1px 5px;border-radius:999px;background:rgba(0,0,0,.32);color:rgba(255,255,255,.72)}
    .mst-status{font-size:11px;line-height:17px}
    .mst-ok{color:var(--dsw-alias-state-success-primary,#22c55e)}
    .mst-warn{color:var(--dsw-alias-state-warn-primary,#d97706)}
    .mst-error{color:var(--dsw-alias-state-error-primary,#ef4444)}
    .mst-footer{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;padding:2px 2px 0}
    [${NAV_ATTR}]>svg{display:none}
    [${NAV_ATTR}]::before{content:"";width:16px;height:16px;flex:none;background:currentColor;-webkit-mask:${NAV_ICON_MASK} center/16px 16px no-repeat;mask:${NAV_ICON_MASK} center/16px 16px no-repeat}
    @media (max-width:720px){.mst-color-grid{grid-template-columns:1fr}.mst-preview{height:144px}}
    `;

    // ==== src/60-ui.js ======================================================
    // ---------------------------------------------------------------------------
    // Settings page UI. Registered as a top-level Settings section, so it sits in
    // the left rail next to the Harness's own General section and renders the
    // project's two modules in the right pane:
    //
    //   1. Theme library — presets, saved themes, import with a name field.
    //   2. Colours      — dark/light tabs with live swatches and an in-page preview.
    // ---------------------------------------------------------------------------

    const ROLE_BY_KEY = Object.fromEntries(PALETTE_ROLES.map((role) => [role.key, role]));

    // Transient feedback: long enough to read, short enough that a stale
    // "saved/applied" message never survives the next edit.
    const STATUS_TIMEOUT_MS = 3000;

    const IMPORT_REASON_KEYS = {
      'not-an-object': 'importReasonNotObject',
      'no-palette': 'importReasonNoPalette',
      'vscode-no-usable-colors': 'importReasonVscodeNoColors',
      'invalid-json': 'importReasonInvalidJson',
      'read-failed': 'importReasonReadFailed',
    };

    const EXAMPLE_THEME = {
      $schema: 'https://github.com/Bulutor/dsh-pure-theme/blob/main/docs/theme-format.md',
      version: 2,
      name: 'Pure',
      author: '',
      palettes: {
        dark: { ...NATIVE_PALETTES.dark },
        light: { ...NATIVE_PALETTES.light },
      },
    };

    /**
     * Field reference appended to the downloadable example. It stays outside the
     * JSON object, and `parseThemeText` strips it on import, so the file can be
     * read by this plugin while still opening as a documented template elsewhere.
     */
    const EXAMPLE_NOTES = [
      '/*',
      '  dsh-pure-theme 主题文件字段说明',
      '  ────────────────────────────────────────────────────────────────',
      '  $schema     字符串。主题格式文档地址。只给编辑器做提示，导入时忽略。',
      '  version     数字。文件格式版本，当前为 2。',
      '  name        字符串。主题名称；导入后可以在「主题名称」里改。',
      '  author      字符串。作者署名，可留空；只作记录，不参与渲染。',
      '  palettes    对象。配色对象，按深浅模式分组；dark / light 可以只写一个。',
      '    dark      对象。深色模式色板，DSH 处于深色时生效。',
      '    light     对象。浅色模式色板，DSH 处于浅色时生效。',
      '',
      '    每个模式至少写 3 个角色才会被接受；缺失的模式保持 DSH 原生配色。',
      '    每个角色是 #RGB、#RRGGBB 或 #RRGGBBAA 色值字符串（8 位只取前 6 位）。',
      '    palettes.dark / palettes.light 下的 10 个角色：',
      '',
      '      sidebar        侧边栏与标题栏底色',
      '      canvas         对话区与右栏底色',
      '      input          输入框所在面的底色',
      '      surface        浮起卡片、消息气泡的底色',
      '      surfaceAlt     菜单、Toast、浮层的底色',
      '      border         分隔线与卡片描边',
      '      textPrimary    正文与标题文字',
      '      textSecondary  说明、时间戳、占位符等次要文字',
      '      accent         按钮、链接、选中态的强调色',
      '      accentText     强调色填充上的文字颜色',
      '',
      '  tokens      对象，可选。按模式覆盖任意 --dsw-* 设计 token，会覆盖 palette 的映射。',
      '    dark      对象。深色模式的 token 覆盖，例如：',
      '                { "--dsw-alias-markdown-code-block": "#181818" }',
      '    light     对象。浅色模式的 token 覆盖，例如：',
      '                { "--dsw-alias-markdown-code-block": "#F2F7F4" }',
      '',
      '  说明：',
      '  - 导入时支持行注释与块注释，注释不会进入主题数据。',
      '  - 示例文件使用一套可直接导入的配色；把上面的值换成自己的颜色即可。',
      '  - 颜色只在本机读取，不会上传。',
      '*/',
    ].join('\n');

    function exampleThemeText(name) {
      const file = {
        ...EXAMPLE_THEME,
        name: name || EXAMPLE_THEME.name,
        palettes: clonePalettes(EXAMPLE_THEME.palettes),
      };
      return `${JSON.stringify(file, null, 2)}\n\n${EXAMPLE_NOTES}\n`;
    }

    function Card({ title, desc, right, children }) {
      return h(
        'section',
        { className: 'mst-card' },
        h(
          'div',
          { className: 'mst-card-head' },
          h('div', null, h('div', { className: 'mst-card-title' }, title), desc ? h('div', { className: 'mst-card-desc' }, desc) : null),
          right || null,
        ),
        h('div', { className: 'mst-body' }, children),
      );
    }

    function Status({ status }) {
      if (!status) return null;
      const tone = status.kind === 'error' ? 'mst-error' : status.kind === 'warn' ? 'mst-warn' : 'mst-ok';
      return h(
        'div',
        { className: `mst-status ${tone}`, role: 'status', 'aria-live': 'polite', 'aria-atomic': 'true' },
        status.message,
      );
    }

    /**
     * Status state that clears itself. A new message restarts the timer, and the
     * cleanup prevents a pending timer from touching an unmounted page.
     */
    function useStatus() {
      const [status, setStatus] = useState(null);
      const timer = useRef(0);

      const clear = useCallback(() => {
        if (timer.current) {
          clearTimeout(timer.current);
          timer.current = 0;
        }
        setStatus(null);
      }, []);

      const show = useCallback((next) => {
        if (timer.current) {
          clearTimeout(timer.current);
          timer.current = 0;
        }
        setStatus(next);
        if (!next) return;
        timer.current = setTimeout(() => {
          timer.current = 0;
          setStatus(null);
        }, STATUS_TIMEOUT_MS);
      }, []);

      useEffect(
        () => () => {
          if (timer.current) clearTimeout(timer.current);
        },
        [],
      );

      return [status, show, clear];
    }

    function importErrorText(reason) {
      const key = IMPORT_REASON_KEYS[reason];
      return key ? T[key] : T.importReasonUnknown;
    }

    function importErrorMessage(reason) {
      return `${T.importError} ${importErrorText(reason)}`;
    }

    function CurrentThemeBadge({ name, coverage }) {
      return h(
        'span',
        { className: 'mst-badge', title: name },
        h('span', { className: 'mst-badge-label' }, `${T.currentTheme}:`),
        h('span', { className: 'mst-badge-value' }, name),
        coverage ? h('span', { className: 'mst-badge-label' }, `· ${coverage}`) : null,
      );
    }

    function modesOf(value) {
      const palettes = value && value.palettes ? value.palettes : value || {};
      const modes = [];
      if (palettes.dark) modes.push('dark');
      if (palettes.light) modes.push('light');
      return modes;
    }

    function coverageLabel(value) {
      const modes = modesOf(value);
      if (modes.length === 2) return T.modeBoth;
      if (modes[0] === 'dark') return T.modeDarkOnly;
      if (modes[0] === 'light') return T.modeLightOnly;
      return T.modeNone;
    }

    function modeLabel(mode) {
      return mode === 'light' ? T.modeLight : T.modeDark;
    }

    function readDshMode() {
      if (typeof document === 'undefined' || !document.body || typeof document.body.hasAttribute !== 'function') {
        return 'dark';
      }
      return document.body.hasAttribute('data-ds-dark-theme') ? 'dark' : 'light';
    }

    function useDshMode() {
      const [mode, setMode] = useState(readDshMode);
      useEffect(() => {
        if (typeof document === 'undefined' || !document.body || typeof MutationObserver === 'undefined') {
          return undefined;
        }
        const observer = new MutationObserver(() => setMode(readDshMode()));
        observer.observe(document.body, { attributes: true, attributeFilter: ['data-ds-dark-theme'] });
        return () => observer.disconnect();
      }, []);
      return mode;
    }

    function statusForApply(palettes, dshMode) {
      const modes = modesOf({ palettes });
      if (modes.length === 2) return T.appliedBoth;
      if (!modes.length) return T.applied;
      if (modes[0] === dshMode) {
        return format(T.appliedNativeMode, { mode: modes[0] === 'dark' ? T.modeLight : T.modeDark });
      }
      return format(T.appliedInactive, { mode: modeLabel(modes[0]) });
    }

    function contrastWarningText(warning) {
      if (warning.kind === 'accent') return T.colorAccentContrastWarn;
      if (warning.kind === 'secondary') return T.colorSecondaryContrastWarn;
      return T.colorContrastWarn;
    }

    function ColorSwatch({ role, value, onChange }) {
      const meta = ROLE_BY_KEY[role];
      const [draft, setDraft] = useState(value);
      useEffect(() => setDraft(value), [value]);
      const commit = (next) => {
        const hex = normalizeHex(next, null);
        if (hex) onChange(hex);
      };
      return h(
        'div',
        { className: 'mst-color' },
        h(
          'label',
          { className: 'mst-swatch', style: { background: value }, title: tr(meta.labelKey) },
          h('input', {
            type: 'color',
            value: normalizeHex(value, '#000000'),
            onChange: (event) => onChange(normalizeHex(event.target.value, value)),
            'aria-label': tr(meta.labelKey),
          }),
        ),
        h(
          'div',
          { className: 'mst-color-copy' },
          h('div', { className: 'mst-color-name' }, tr(meta.labelKey)),
          h('div', { className: 'mst-color-hint' }, tr(meta.hintKey)),
        ),
        h('input', {
          className: 'mst-hex',
          value: draft,
          spellCheck: false,
          'aria-label': `${tr(meta.labelKey)} hex`,
          onChange: (event) => {
            const next = event.target.value;
            setDraft(next);
            if (isHex(next)) commit(next);
          },
          onBlur: () => setDraft(normalizeHex(value, '#000000')),
        }),
      );
    }

    function MiniPreview({ palette, mode }) {
      const colors = paletteWithFallback(palette, mode);
      return h(
        'div',
        { className: 'mst-preview', 'aria-hidden': true, 'data-mode': mode },
        h(
          'div',
          { className: 'mst-preview-side', style: { background: colors.sidebar } },
          h('div', { className: 'mst-preview-brand', style: { color: colors.textPrimary } }, T.previewBrand),
          h('div', { className: 'mst-preview-nav', style: { background: colors.surfaceAlt, border: `.5px solid ${colors.border}` } }),
          h('div', { className: 'mst-preview-nav', style: { background: colors.surfaceAlt, border: `.5px solid ${colors.border}` } }),
          h('div', { className: 'mst-preview-nav', style: { background: colors.surfaceAlt, border: `.5px solid ${colors.border}` } }),
          h('div', { className: 'mst-preview-spacer' }),
          h('div', { className: 'mst-preview-line short', style: { background: colors.textSecondary } }),
        ),
        h(
          'div',
          { className: 'mst-preview-main', style: { background: colors.canvas } },
          h('div', { className: 'mst-preview-line', style: { background: colors.textPrimary } }),
          h('div', { className: 'mst-preview-line short', style: { background: colors.textSecondary } }),
          h('div', { className: 'mst-preview-spacer' }),
          h(
            'div',
            {
              className: 'mst-preview-card',
              style: {
                background: colors.surface,
                borderColor: colors.border,
                boxShadow: mode === 'light' ? '0 1px 2px rgba(15,17,21,.06)' : 'none',
              },
            },
            h('span', { style: { color: colors.textPrimary } }, T.previewCard),
            h('span', { className: 'mst-preview-button', style: { background: colors.accent, color: colors.accentText } }, T.previewButton),
          ),
          h(
            'div',
            {
              className: 'mst-preview-input',
              style: {
                background: colors.input,
                borderColor: colors.border,
                color: colors.textSecondary,
                boxShadow: mode === 'light' ? '0 1px 2px rgba(15,17,21,.05)' : 'none',
              },
            },
            T.previewInput,
          ),
        ),
        h('span', { className: 'mst-preview-label' }, `${T.previewLabel} · ${modeLabel(mode)}`),
      );
    }

    function ModeSwitch({ mode, coverage, onChange }) {
      return h(
        'div',
        { className: 'mst-modes', role: 'group', 'aria-label': T.modeLabel },
        ['dark', 'light'].map((item) =>
          h(
            'button',
            {
              key: item,
              type: 'button',
              className: 'mst-mode',
              'aria-pressed': item === mode,
              'data-custom': coverage[item] ? 'true' : 'false',
              title: coverage[item] ? T.colorLiveHint : T.nativeModeHint,
              onClick: () => onChange(item),
            },
            h('span', { className: 'mst-mode-dot' }),
            modeLabel(item),
          ),
        ),
      );
    }

    function PresetPicker({ state, onApply }) {
      const initialAgent = AGENTS.find((item) => state.activeName?.startsWith(item.displayName))?.id || AGENTS[0]?.id || '';
      const [agentId, setAgentId] = useState(initialAgent);
      useEffect(() => {
        const matched = AGENTS.find((item) => state.activeName?.startsWith(item.displayName));
        if (matched) setAgentId(matched.id);
      }, [state.activeName]);
      const agent = AGENTS.find((item) => item.id === agentId) || AGENTS[0];
      if (!agent) return null;
      const provenance = `${T.presetsInspired}: ${agent.source} · ${tr(`confidence${agent.confidence[0].toUpperCase()}${agent.confidence.slice(1)}`)}`;
      return h(
        'div',
        { className: 'mst-body' },
        h(
          'div',
          { className: 'mst-field' },
          h('span', null, T.presetsAgent),
          h(
            'select',
            {
              className: 'mst-select',
              value: agent.id,
              'aria-label': T.presetsAgent,
              onChange: (event) => setAgentId(event.target.value),
            },
            AGENTS.map((item) => h('option', { key: item.id, value: item.id }, item.displayName)),
          ),
        ),
        h(
          'div',
          { className: 'mst-chips' },
          agent.themes.map((theme) => {
            const active = state.activeSource === 'preset' && state.activeName === `${agent.displayName} · ${theme.displayName}`;
            const palette = theme.palettes.dark || theme.palettes.light;
            const dots = [palette.sidebar, palette.canvas, palette.accent, palette.textPrimary];
            const coverage = coverageLabel(theme);
            return h(
              'button',
              {
                key: theme.id,
                type: 'button',
                className: 'mst-chip',
                title: `${provenance} · ${coverage}`,
                'aria-pressed': active,
                onClick: () => onApply(agent, theme),
              },
              h('span', { className: 'mst-dots' }, dots.map((color, index) => h('span', { key: index, className: 'mst-dot', style: { background: color } }))),
              h('span', null, theme.displayName),
              h('span', { className: 'mst-mode-badge' }, coverage),
              active ? h('span', { className: 'mst-hint' }, T.presetsApplied) : null,
            );
          }),
        ),
      );
    }

    function SavedThemeList({ state, onApply, onExport, onDelete }) {
      if (!state.savedThemes.length) return h('div', { className: 'mst-empty' }, T.savedEmpty);
      return h(
        'div',
        { className: 'mst-body mst-saved-list' },
        state.savedThemes.map((theme) => {
          const active = state.activeThemeId === theme.id;
          const palette = theme.palettes.dark || theme.palettes.light;
          const dots = palette ? [palette.sidebar, palette.canvas, palette.accent, palette.textPrimary] : [];
          const source = theme.source === 'vscode' ? T.savedFromVscode : theme.source === 'file' ? T.savedFromFile : T.savedFromCustom;
          const date = new Date(theme.createdAt).toLocaleDateString();
          const origin = theme.fileName ? ` · ${theme.fileName}` : '';
          return h(
            'div',
            { key: theme.id, className: 'mst-saved', 'data-active': active ? 'true' : 'false' },
            h('span', { className: 'mst-dots' }, dots.map((color, index) => h('span', { key: index, className: 'mst-dot', style: { background: color } }))),
            h(
              'div',
              { className: 'mst-saved-main' },
              h('div', { className: 'mst-saved-name' }, theme.name, active ? ` · ${T.savedActive}` : ''),
              h('div', { className: 'mst-saved-meta' }, `${coverageLabel(theme)} · ${source}${origin} · ${date}`),
            ),
            h(
              'div',
              { className: 'mst-saved-actions' },
              h('button', { type: 'button', className: 'mst-btn mst-btn-ghost', onClick: () => onApply(theme) }, T.savedApply),
              h('button', { type: 'button', className: 'mst-btn mst-btn-ghost', onClick: () => onExport(theme) }, T.savedExport),
              h('button', { type: 'button', className: 'mst-btn mst-btn-ghost mst-btn-danger', onClick: () => onDelete(theme) }, T.savedDelete),
            ),
          );
        }),
      );
    }

    function ImportDraft({ draft, name, onName, onFile, onApply, onSave, onCancel }) {
      const inputRef = useRef(null);
      const [over, setOver] = useState(false);
      const accept = '.json,.dshtheme,application/json';
      const onDrop = (event) => {
        event.preventDefault();
        setOver(false);
        const file = event.dataTransfer?.files?.[0];
        if (file) onFile(file);
      };
      const input = h('input', {
        ref: inputRef,
        type: 'file',
        accept,
        style: { display: 'none' },
        onChange: (event) => {
          const file = event.target.files?.[0];
          if (file) onFile(file);
          event.target.value = '';
        },
      });

      if (!draft) {
        return h(
          'div',
          {
            className: 'mst-drop',
            'data-over': over ? 'true' : 'false',
            role: 'button',
            tabIndex: 0,
            onClick: () => inputRef.current?.click(),
            onKeyDown: (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                inputRef.current?.click();
              }
            },
            onDragOver: (event) => {
              event.preventDefault();
              setOver(true);
            },
            onDragLeave: () => setOver(false),
            onDrop,
          },
          input,
          h('div', { className: 'mst-drop-main' }, T.importDrop),
          h('div', { className: 'mst-drop-sub' }, T.importHint),
        );
      }

      const modes = modesOf(draft);
      const count = modes.map((mode) => `${modeLabel(mode)} ${Object.keys(draft.palettes[mode] || {}).length}`).join(' · ');
      const source = draft.source === 'vscode' ? `${T.importVscode} · ${count}` : count;
      return h(
        'div',
        { className: 'mst-draft' },
        input,
        h(
          'div',
          { className: 'mst-row' },
          h('span', { className: 'mst-hint mst-grow' }, `${draft.fileName || ''} · ${source} · ${coverageLabel(draft)}`),
          h('button', { type: 'button', className: 'mst-btn mst-btn-ghost', onClick: () => inputRef.current?.click() }, T.importUpload),
        ),
        h(
          'label',
          { className: 'mst-field' },
          h('span', null, T.importNameLabel),
          h('input', {
            className: 'mst-input mst-grow',
            value: name,
            placeholder: T.importNamePlaceholder,
            onChange: (event) => onName(event.target.value),
          }),
        ),
        h(
          'div',
          { className: 'mst-row' },
          h('button', { type: 'button', className: 'mst-btn mst-btn-primary', onClick: onSave }, T.importSave),
          h('button', { type: 'button', className: 'mst-btn', onClick: onApply }, T.importApply),
          h('button', { type: 'button', className: 'mst-btn mst-btn-ghost', onClick: onCancel }, T.importCancel),
        ),
        h('div', { className: 'mst-hint' }, T.importSaveHint),
      );
    }

    function ColorEditor({
      draft,
      mode,
      dshMode,
      coverage,
      baseline,
      modeDirty,
      name,
      onName,
      onMode,
      onColor,
      onSave,
      onReset,
      onClearModeEdits,
      onGenerateLight,
      onExport,
      onExample,
      status,
    }) {
      const palette = paletteWithFallback(draft?.[mode], mode);
      const warnings = paletteContrastWarnings(palette);
      const inactive = mode !== dshMode;
      return h(
        'div',
        { className: 'mst-body' },
        h(
          'div',
          { className: 'mst-mode-row' },
          h(
            'div',
            { className: 'mst-mode-control' },
            h('span', { className: 'mst-mode-label' }, T.modeLabelPrefix),
            h(ModeSwitch, { mode, coverage, onChange: onMode }),
          ),
          h('span', { className: 'mst-hint' }, format(T.currentMode, { mode: modeLabel(dshMode) })),
        ),
        h(MiniPreview, { palette, mode }),
        !coverage[mode] ? h('div', { className: 'mst-hint' }, T.nativeModeHint) : null,
        inactive ? h('div', { className: 'mst-hint' }, format(T.editingInactive, { mode: modeLabel(mode) })) : null,
        mode === 'light' && !coverage.light && coverage.dark
          ? h(
              'div',
              { className: 'mst-row' },
              h('button', { type: 'button', className: 'mst-btn', onClick: onGenerateLight }, T.generateLight),
            )
          : null,
        COLOR_GROUPS.map((group) =>
          h(
            'div',
            { key: group.key, className: 'mst-body' },
            h('div', { className: 'mst-hint', style: { color: 'var(--dsw-alias-label-primary)', fontWeight: 500 } }, tr(group.titleKey)),
            h(
              'div',
              { className: 'mst-color-grid' },
              group.roles.map((role) => h(ColorSwatch, { key: role, role, value: palette[role], onChange: (hex) => onColor(role, hex) })),
            ),
          ),
        ),
        warnings.length
          ? warnings.map((warning, index) =>
              h('div', { key: index, className: 'mst-hint mst-warn' }, `${contrastWarningText(warning)} (${warning.ratio}:1)`),
            )
          : null,
        h('div', { className: 'mst-divider' }),
        h(
          'div',
          { className: 'mst-row' },
          h(
            'label',
            { className: 'mst-field mst-grow' },
            h('span', null, T.colorNameLabel),
            h('input', {
              className: 'mst-input mst-grow',
              value: name,
              placeholder: T.colorNamePlaceholder,
              onChange: (event) => onName(event.target.value),
            }),
          ),
          h('button', { type: 'button', className: 'mst-btn mst-btn-primary', onClick: onSave }, T.colorSave),
        ),
        h(
          'div',
          { className: 'mst-row' },
          baseline
            ? h(
                'button',
                {
                  type: 'button',
                  className: 'mst-btn',
                  disabled: !modeDirty,
                  title: modeDirty ? undefined : T.clearModeEditsIdle,
                  onClick: onClearModeEdits,
                },
                T.clearModeEdits,
              )
            : null,
          h('button', { type: 'button', className: 'mst-btn', onClick: onReset }, T.colorReset),
          h('button', { type: 'button', className: 'mst-btn', onClick: onExport }, T.exportCurrent),
          h('button', { type: 'button', className: 'mst-btn mst-btn-ghost', onClick: onExample }, T.downloadExample),
        ),
        h(Status, { status }),
      );
    }

    function fileSlug(value) {
      const slug = String(value || 'theme')
        .trim()
        .toLowerCase()
        .replace(/[^\p{L}\p{N}]+/gu, '-')
        .replace(/^-+|-+$/g, '');
      return slug || 'theme';
    }

    function downloadText(filename, text) {
      const blob = new Blob([text], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    function downloadJson(filename, data) {
      downloadText(filename, JSON.stringify(data, null, 2));
    }

    /** `window.confirm` is intentionally optional so SSR and tests can render. */
    function confirmAction(message) {
      if (typeof window === 'undefined' || typeof window.confirm !== 'function') return true;
      return window.confirm(message);
    }

    function PureThemePage() {
      const { state, updateInfo } = useSettings();
      useLocaleRevision();
      const dshMode = useDshMode();
      const [mode, setMode] = useState(dshMode);
      const [drafts, setDrafts] = useState(() => clonePalettes(state.palettes));
      const [name, setName] = useState(state.activeName || '');
      const [importDraft, setImportDraft] = useState(null);
      const [importName, setImportName] = useState('');
      // Agent presets and saved themes live in two different sections, so their
      // feedback must not share one slot under the Agent picker.
      const [agentStatus, showAgentStatus, clearAgentStatus] = useStatus();
      const [savedStatus, showSavedStatus, clearSavedStatus] = useStatus();
      const [importStatus, showImportStatus, clearImportStatus] = useStatus();
      const [colorStatus, showColorStatus, clearColorStatus] = useStatus();

      useEffect(() => {
        setDrafts(clonePalettes(state.palettes));
      }, [state.palettes]);

      useEffect(() => {
        setName(state.activeName || '');
      }, [state.activeName]);

      useEffect(() => {
        if (!updateInfo.checked) void checkForUpdate();
      }, [updateInfo.checked]);

      const coverage = { dark: Boolean(drafts.dark), light: Boolean(drafts.light) };
      const baseline = state.baseline;
      const modeDirty = baseline ? hasModeEdits(state, baseline, mode) : false;

      const applyPreset = (agent, theme) => {
        const palettes = clonePalettes(theme.palettes);
        const tokens = cloneTokens(theme.tokens);
        const activeName = `${agent.displayName} · ${theme.displayName}`;
        patchState({
          palettes,
          tokens,
          activeName,
          activeSource: 'preset',
          activeThemeId: null,
          baseline: createBaseline({ palettes, tokens, name: activeName, source: 'preset', themeId: null }),
        });
        clearColorStatus();
        clearSavedStatus();
        showAgentStatus({ kind: 'ok', message: statusForApply(palettes, dshMode) });
      };

      const applySaved = (theme) => {
        const palettes = clonePalettes(theme.palettes);
        const tokens = cloneTokens(theme.tokens);
        patchState({
          palettes,
          tokens,
          activeName: theme.name,
          activeSource: 'saved',
          activeThemeId: theme.id,
          baseline: createBaseline({ palettes, tokens, name: theme.name, source: 'saved', themeId: theme.id }),
        });
        clearColorStatus();
        clearAgentStatus();
        showSavedStatus({ kind: 'ok', message: statusForApply(palettes, dshMode) });
      };

      const saveCurrent = () => {
        const themeName = (name.trim() || T.untitled).slice(0, 80);
        const palettes = clonePalettes(drafts);
        if (!palettes.dark && !palettes.light) palettes[mode] = emptyPalette(mode);
        const tokens = cloneTokens(state.tokens);
        const item = createSavedTheme({ name: themeName, palettes, tokens, source: 'custom' });
        const saved = tryPatchState({
          ...savedThemesPatch(state, item),
          palettes,
          tokens,
          activeName: themeName,
          activeSource: 'saved',
          activeThemeId: item.id,
          baseline: createBaseline({ palettes, tokens, name: themeName, source: 'saved', themeId: item.id }),
        });
        clearAgentStatus();
        clearSavedStatus();
        showColorStatus(
          saved
            ? { kind: 'ok', message: format(T.colorSavedApplied, { name: themeName }) }
            : { kind: 'error', message: T.colorSaveFailed },
        );
      };

      const deleteSaved = (theme) => {
        clearSavedStatus();
        if (!confirmAction(T.savedDeleteConfirm)) return;
        const baseline =
          state.baseline && state.baseline.themeId === theme.id
            ? { ...state.baseline, themeId: null, source: 'custom' }
            : state.baseline;
        const wasActive = state.activeThemeId === theme.id;
        patchState({
          savedThemes: state.savedThemes.filter((item) => item.id !== theme.id),
          activeThemeId: wasActive ? null : state.activeThemeId,
          activeSource: wasActive ? 'custom' : state.activeSource,
          baseline,
        });
        if (wasActive) clearColorStatus();
        showSavedStatus({ kind: 'ok', message: T.savedDeleted });
      };

      const exportSaved = (theme) => {
        clearSavedStatus();
        if (!confirmAction(format(T.savedExportConfirm, { name: theme.name }))) return;
        downloadJson(
          `${fileSlug(theme.name)}.json`,
          exportThemeFile({ palettes: theme.palettes, tokens: theme.tokens, activeName: theme.name }),
        );
        showSavedStatus({ kind: 'ok', message: T.colorExported });
      };

      const exportCurrent = () => {
        clearColorStatus();
        if (!confirmAction(T.exportCurrentConfirm)) return;
        const palettes = clonePalettes(drafts);
        if (!palettes.dark && !palettes.light) palettes[mode] = emptyPalette(mode);
        downloadJson(
          `${fileSlug(name || T.untitled)}.json`,
          exportThemeFile({ palettes, tokens: state.tokens, activeName: name || T.untitled }),
        );
        showColorStatus({ kind: 'ok', message: T.colorExported });
      };

      const resetPalette = () => {
        patchState({
          palettes: { dark: null, light: null },
          tokens: { dark: null, light: null },
          activeName: '',
          activeSource: null,
          activeThemeId: null,
          baseline: null,
        });
        clearAgentStatus();
        clearSavedStatus();
        showColorStatus({ kind: 'ok', message: T.colorResetDone });
      };

      const clearModeEdits = () => {
        const current = getState();
        const result = restoreModeFromBaseline(current, current.baseline, mode);
        if (!result) return;
        patchState(result.patch);
        clearAgentStatus();
        clearSavedStatus();
        showColorStatus({
          kind: 'ok',
          message: format(T.clearModeEditsDone, {
            mode: modeLabel(mode),
            name: current.baseline.name || T.currentNone,
          }),
        });
      };

      const generateLight = () => {
        const dark = drafts.dark || state.palettes.dark;
        if (!dark) return;
        const light = deriveLightPalette(dark);
        setDrafts((value) => ({ ...value, light }));
        showColorStatus({ kind: 'ok', message: T.lightDraftCreated });
      };

      const onColor = (role, hex) => {
        const current = getState();
        const baseline = current.baseline || baselineFromState(current);
        const currentPalettes = clonePalettes(current.palettes);
        const base = paletteWithFallback(currentPalettes[mode] || drafts[mode], mode);
        const next = { ...base, [role]: hex };
        const palettes = { ...currentPalettes, [mode]: next };
        const clean = modesMatchBaseline({ palettes, tokens: current.tokens }, baseline);
        // The edit itself invalidates any "saved/applied/recognised" message and
        // changes the theme to custom, so every transient status becomes stale.
        clearColorStatus();
        clearAgentStatus();
        clearSavedStatus();
        clearImportStatus();
        patchState({
          palettes,
          baseline,
          activeName: clean ? baseline.name : (name.trim() || T.untitled).slice(0, 80),
          activeSource: clean ? baseline.source : 'custom',
          activeThemeId: clean ? baseline.themeId : null,
        });
      };

      const changeMode = (nextMode) => {
        setMode(nextMode);
        clearColorStatus();
      };

      const importFile = async (file) => {
        if (!file) return;
        let text;
        try {
          text = await file.text();
        } catch (error) {
          console.warn('[dsh-pure-theme] could not read the theme file', error);
          showImportStatus({ kind: 'error', message: importErrorMessage('read-failed') });
          return;
        }

        let parsed;
        try {
          parsed = parseThemeText(text);
        } catch (error) {
          console.warn('[dsh-pure-theme] theme file is not valid JSON', error);
          showImportStatus({ kind: 'error', message: importErrorMessage('invalid-json') });
          return;
        }

        const result = readThemeFile(parsed);
        if (!result.ok) {
          // Keep the machine code in the console for debugging, never in the UI.
          console.warn('[dsh-pure-theme] theme file rejected', result.reason);
          showImportStatus({ kind: 'error', message: importErrorMessage(result.reason) });
          return;
        }

        const theme = result.theme;
        setImportDraft({ ...theme, fileName: file.name });
        setImportName(theme.name || file.name.replace(/\.[^.]+$/, ''));
        showImportStatus({
          kind: 'ok',
          message: format(T.importModes, { modes: coverageLabel(theme) }),
        });
      };

      const applyImported = () => {
        if (!importDraft) return;
        const themeName = (importName.trim() || importDraft.name || T.untitled).slice(0, 80);
        const palettes = clonePalettes(importDraft.palettes);
        const tokens = cloneTokens(importDraft.tokens);
        patchState({
          palettes,
          tokens,
          activeName: themeName,
          activeSource: 'custom',
          activeThemeId: null,
          baseline: createBaseline({ palettes, tokens, name: themeName, source: 'custom', themeId: null }),
        });
        clearAgentStatus();
        clearSavedStatus();
        clearColorStatus();
        showImportStatus({ kind: 'ok', message: statusForApply(palettes, dshMode) });
      };

      const saveImported = () => {
        if (!importDraft) return;
        const themeName = (importName.trim() || importDraft.name || T.untitled).slice(0, 80);
        const item = createSavedTheme({
          name: themeName,
          palettes: importDraft.palettes,
          tokens: importDraft.tokens,
          source: importDraft.source === 'vscode' ? 'vscode' : 'file',
          fileName: importDraft.fileName,
        });
        // Saving is deliberately separate from applying: only the saved-theme list
        // changes here, so the colours currently on screen stay untouched.
        const saved = tryPatchState(savedThemesPatch(state, item));
        if (saved) {
          setImportDraft(null);
          setImportName('');
          clearSavedStatus();
        }
        showImportStatus(
          saved
            ? { kind: 'ok', message: format(T.colorSavedName, { name: themeName }) }
            : { kind: 'error', message: T.colorSaveFailed },
        );
      };

      const downloadExample = () => {
        downloadText('example-theme.json', exampleThemeText(T.exampleName));
      };

      const current = state.activeName || T.currentNone;
      return h(
        'div',
        { className: 'mst-page' },
        updateInfo.newer
          ? h(
              'a',
              { className: 'mst-hint mst-warn', href: 'https://www.npmjs.com/package/dsh-pure-theme', target: '_blank', rel: 'noreferrer' },
              format(T.updateAvailable, { version: updateInfo.latest }),
            )
          : null,
        h(
          Card,
          {
            title: T.themesTitle,
            right: h(CurrentThemeBadge, {
              name: current,
              coverage: state.activeName ? coverageLabel(state) : '',
            }),
          },
          h(PresetPicker, { state, onApply: applyPreset }),
          h(Status, { status: agentStatus }),
          h('div', { className: 'mst-divider' }),
          h(
            'div',
            { className: 'mst-body' },
            h('div', { className: 'mst-card-title' }, T.savedTitle),
            h(Status, { status: savedStatus }),
            h(SavedThemeList, {
              state,
              onApply: applySaved,
              onExport: exportSaved,
              onDelete: deleteSaved,
            }),
          ),
          h('div', { className: 'mst-divider' }),
          h(
            'div',
            { className: 'mst-body' },
            h('div', { className: 'mst-card-title' }, T.importTitle),
            h(ImportDraft, {
              draft: importDraft,
              name: importName,
              onName: setImportName,
              onFile: (file) => void importFile(file),
              onApply: applyImported,
              onSave: saveImported,
              onCancel: () => {
                setImportDraft(null);
                setImportName('');
                clearImportStatus();
              },
            }),
            h(Status, { status: importStatus }),
          ),
        ),
        h(
          Card,
          { title: T.colorsTitle, desc: T.colorsDesc },
          h(ColorEditor, {
            draft: drafts,
            mode,
            dshMode,
            coverage,
            baseline,
            modeDirty,
            name,
            onName: setName,
            onMode: changeMode,
            onColor,
            onSave: saveCurrent,
            onReset: resetPalette,
            onClearModeEdits: clearModeEdits,
            onGenerateLight: generateLight,
            onExport: exportCurrent,
            onExample: downloadExample,
            status: colorStatus,
          }),
        ),
        h(
          'div',
          { className: 'mst-footer' },
          h('span', { className: 'mst-hint mst-mono' }, `dsh-pure-theme v${VERSION}`),
        ),
      );
    }

    // ==== src/70-nav-icon.js ================================================
    // ---------------------------------------------------------------------------
    // Settings-nav identity.
    //
    // DSH 0.2.x renders the settings rail from a hard-coded section-id → glyph
    // table and falls back to the settings gear for any id it does not know. The
    // `settings.section` slot has no icon option yet, so a theme plugin otherwise
    // looks like another gear page. Mark our row and let the page stylesheet paint
    // the palette glyph instead; the marker is re-applied when the panel mounts or
    // React replaces the row.
    // ---------------------------------------------------------------------------

    const SETTINGS_NAV_SELECTOR = '[data-shortcut-modal="settings"] nav button';

    let navObserver = null;
    let navFrame = 0;

    function scheduleSettingsNavMark() {
      if (navFrame) return;
      if (typeof requestAnimationFrame === 'function') {
        navFrame = requestAnimationFrame(() => {
          navFrame = 0;
          markSettingsNav();
        });
      } else {
        navFrame = setTimeout(() => {
          navFrame = 0;
          markSettingsNav();
        }, 0);
      }
    }

    function markSettingsNav() {
      if (typeof document === 'undefined' || typeof document.querySelectorAll !== 'function') return;
      const label = String(tr('nav') || '').trim();
      if (!label) return;
      for (const button of document.querySelectorAll(SETTINGS_NAV_SELECTOR)) {
        if (typeof button?.getAttribute !== 'function' || typeof button?.setAttribute !== 'function') continue;
        if (button.getAttribute(NAV_ATTR) === 'true') continue;
        if (String(button.textContent || '').trim() !== label) continue;
        button.setAttribute(NAV_ATTR, 'true');
      }
    }

    function clearSettingsNavMarks() {
      if (typeof document === 'undefined' || typeof document.querySelectorAll !== 'function') return;
      for (const button of document.querySelectorAll(`[${NAV_ATTR}]`)) {
        button.removeAttribute?.(NAV_ATTR);
      }
    }

    function installSettingsNavIcon() {
      if (typeof document === 'undefined' || !document.body) return () => {};
      markSettingsNav();
      if (typeof MutationObserver !== 'function') return clearSettingsNavMarks;

      navObserver = new MutationObserver(scheduleSettingsNavMark);
      navObserver.observe(document.body, { childList: true, subtree: true });

      return () => {
        navObserver?.disconnect();
        navObserver = null;
        if (navFrame) {
          if (typeof cancelAnimationFrame === 'function') cancelAnimationFrame(navFrame);
          else clearTimeout(navFrame);
          navFrame = 0;
        }
        clearSettingsNavMarks();
      };
    }

    // ==== src/90-plugin.js ==================================================
    // ---------------------------------------------------------------------------
    // Plugin entry: what the Harness Client loads.
    // ---------------------------------------------------------------------------

    const plugin = {
      name: 'dsh-pure-theme',
      inject: ['slots', 'locale'],
      apply(ctx) {
        state = loadState();

        // Harness language first: the nav label and page copy read through `tr()`.
        const locale = ctx.locale;
        if (locale) {
          bindLocale(locale.bind(LOCALE_NS), (listener) => locale.subscribe(listener));
          ctx.effect(() => locale.register(LOCALE_NS, MESSAGES), 'dsh-pure-theme: dictionaries');
        } else {
          bindLocale(null, null);
        }

        ctx.effect(() => {
          const tag = document.createElement('style');
          tag.id = UI_STYLE_ID;
          tag.textContent = UI_CSS;
          document.head.appendChild(tag);
          return () => tag.remove();
        }, 'dsh-pure-theme: page stylesheet');

        ctx.effect(() => {
          renderStylesheet();
          return () => clearStylesheet();
        }, 'dsh-pure-theme: theme stylesheet');

        // DSH has no section-icon field in this release; decorate our rail row so
        // it does not fall back to the generic settings gear.
        ctx.effect(installSettingsNavIcon, 'dsh-pure-theme: settings nav icon');

        ctx.effect(() => {
          const onStorage = (event) => {
            if (event.key !== STORAGE_KEY) return;
            reloadFromStorage();
          };
          window.addEventListener('storage', onStorage);
          return () => window.removeEventListener('storage', onStorage);
        }, 'dsh-pure-theme: cross-tab sync');

        ctx.effect(() => {
          if (typeof BroadcastChannel === 'undefined') return () => {};
          const channel = new BroadcastChannel('dsh-pure-theme:sync');
          setSyncChannel(channel);
          const onMessage = () => reloadFromStorage();
          channel.addEventListener('message', onMessage);
          return () => {
            channel.removeEventListener('message', onMessage);
            setSyncChannel(null);
            channel.close();
          };
        }, 'dsh-pure-theme: cross-window sync');

        ctx.effect(() => {
          const onShow = () => renderStylesheet();
          window.addEventListener('pageshow', onShow);
          return () => window.removeEventListener('pageshow', onShow);
        }, 'dsh-pure-theme: page lifecycle');

        ctx.effect(() => {
          window.__dshPureTheme = {
            get state() {
              return getState();
            },
            get effectivePalette() {
              return readEffectivePalette('dark');
            },
            get effectivePalettes() {
              return { dark: readEffectivePalette('dark'), light: readEffectivePalette('light') };
            },
            apply(palettes, name) {
              const both =
                palettes && (palettes.dark || palettes.light)
                  ? { dark: normalizePalette(palettes.dark), light: normalizePalette(palettes.light) }
                  : { dark: normalizePalette(palettes), light: null };
              const activeName = name || T.untitled;
              const tokens = { dark: null, light: null };
              patchState({
                palettes: both,
                tokens,
                activeName,
                activeSource: 'custom',
                activeThemeId: null,
                baseline: createBaseline({ palettes: both, tokens, name: activeName, source: 'custom', themeId: null }),
              });
            },
            applyMode(mode, palette, name) {
              const palettes = clonePalettes(getState().palettes);
              palettes[mode] = normalizePalette(palette);
              const tokens = getState().tokens;
              const activeName = name || T.untitled;
              patchState({
                palettes,
                activeName,
                activeSource: 'custom',
                activeThemeId: null,
                baseline: createBaseline({ palettes, tokens, name: activeName, source: 'custom', themeId: null }),
              });
            },
            reset() {
              patchState({
                palettes: { dark: null, light: null },
                tokens: { dark: null, light: null },
                activeName: '',
                activeSource: null,
                activeThemeId: null,
                baseline: null,
              });
            },
          };
          return () => {
            delete window.__dshPureTheme;
          };
        }, 'dsh-pure-theme: debug handle');

        try {
          ctx.slots.inject('settings.section', () =>
            ctx.slots.register(
              {
                name: 'settings.section',
                id: 'theme',
                order: 1,
                label: () => tr('nav'),
                locale: LOCALE_NS,
              },
              PureThemePage,
            ),
          );
        } catch (error) {
          // A slot contract change upstream must not take the palette down with it:
          // the stylesheet is already installed above.
          console.error('[dsh-pure-theme] could not register the settings section', error);
        }
      },
    };

    // Exposed for the offline checks and for contributors debugging in the browser
    // console. Not part of the plugin contract.
    plugin.__internals = {
      VERSION,
      MESSAGES,
      STATUS_TIMEOUT_MS,
      importErrorText,
      importErrorMessage,
      statusForApply,
      saveState,
      tryPatchState,
      buildStylesheet,
      readThemeFile,
      exportThemeFile,
      stripJsonComments,
      parseThemeText,
      createSavedTheme,
      savedThemesPatch,
      exampleThemeText,
      EXAMPLE_NOTES,
      sanitizePalette,
      sanitizePalettes,
      sanitizeTokens,
      sanitizeTokensByMode,
      sanitizeSavedThemes,
      sanitizeBaseline,
      createBaseline,
      baselineFromState,
      hasModeEdits,
      modesMatchBaseline,
      restoreModeFromBaseline,
      paletteContrastWarning,
      paletteContrastWarnings,
      deriveLightPalette,
      isNewerVersion,
      defaultState,
      emptyPalette,
      NATIVE_PALETTE,
      NATIVE_PALETTES,
      MODES,
      AGENTS,
      ROLE_TOKENS,
      PALETTE_ROLES,
      COLOR_GROUPS,
      readEffectivePalette,
      NAV_ATTR,
      UI_CSS,
      markSettingsNav,
      installSettingsNavIcon,
      components: { PureThemePage, Status, Card, ColorSwatch, ImportDraft, ColorEditor, PresetPicker, SavedThemeList, MiniPreview },
    };

    return plugin;
  },
});
