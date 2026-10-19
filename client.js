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

    // ==== src/20-tokens.js ==================================================
    // ---------------------------------------------------------------------------
    // Token mapping: how a logical palette becomes DeepSeek Harness design tokens.
    //
    // The Harness derives every dark surface from the `--dsw-static-neutral-bluish-*`
    // ramp and then follows it with `--dsw-alias-*` tokens, so recolouring the ramp
    // repaints the sidebar, canvas, composer, cards, menus and popovers together.
    // Text, border and accent roles are overridden at the alias layer because they
    // are not part of the neutral ramp.
    // ---------------------------------------------------------------------------
    
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
     * Dark-mode token targets for each palette role. Keys are ordered so that a
     * later override wins when two roles share a token.
     */
    const ROLE_TOKENS = {
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
    };
    
    /**
     * The semantic colour a user sees on screen, read from the Harness root. The
     * plugin's own override lives on `body[data-ds-dark-theme]`, so reading the
     * root first gives the native palette even while a custom theme is active.
     */
    const EFFECTIVE_TOKENS = {
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
    };
    
    /** Fallback used before the DOM is available (SSR/tests) or if tokens are missing. */
    const NATIVE_PALETTE = {
      sidebar: '#1B1B1B',
      canvas: '#202020',
      input: '#262626',
      surface: '#242424',
      surfaceAlt: '#2E2E2E',
      border: '#3A3A3A',
      textPrimary: '#EDEDED',
      textSecondary: '#A6A6A6',
      accent: '#4D6BFE',
      accentText: '#FFFFFF',
    };
    
    function emptyPalette() {
      return { ...NATIVE_PALETTE };
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
    
    function paletteWithFallback(palette) {
      return { ...NATIVE_PALETTE, ...(palette || {}) };
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
    
    function readElementPalette(element) {
      if (!element || typeof window === 'undefined' || typeof window.getComputedStyle !== 'function') return null;
      const computed = window.getComputedStyle(element);
      const palette = {};
      for (const [role, tokens] of Object.entries(EFFECTIVE_TOKENS)) {
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
    
    /** Read the colours currently painted by the Harness, native first. */
    function readEffectivePalette() {
      if (typeof document === 'undefined') return null;
      return readElementPalette(document.documentElement) || readElementPalette(document.body) || null;
    }
    
    /**
     * Build the runtime stylesheet for the current state.
     * @param {object} state persisted settings
     * @returns {string} CSS text
     */
    function buildStylesheet(state) {
      const palette = state.palette;
      const declarations = [];
      const seen = new Set();
      if (palette) {
        for (const role of PALETTE_ROLES) {
          const value = normalizeHex(palette[role.key], null);
          if (!value) continue;
          for (const token of ROLE_TOKENS[role.key] || []) {
            if (seen.has(token)) continue;
            seen.add(token);
            declarations.push(`  ${token}: ${value} !important;`);
          }
        }
      }
      if (state.tokens && typeof state.tokens === 'object') {
        for (const [token, value] of Object.entries(state.tokens)) {
          const hex = normalizeHex(value, null);
          if (!hex || !/^--dsw-[a-z0-9-]+$/i.test(token) || seen.has(token)) continue;
          seen.add(token);
          declarations.push(`  ${token}: ${hex} !important;`);
        }
      }
      return declarations.length ? `body[data-ds-dark-theme] {\n${declarations.join('\n')}\n}` : '';
    }
    
    /** Contrast check used by the settings UI to warn about unreadable palettes. */
    function paletteContrastWarning(palette) {
      if (!palette) return null;
      const text = normalizeHex(palette.textPrimary, null);
      const canvas = normalizeHex(palette.canvas, null);
      if (!text || !canvas) return null;
      const ratio = contrastRatio(text, canvas);
      return ratio < 4.5 ? { ratio: Math.round(ratio * 10) / 10 } : null;
    }

    // ==== src/25-presets.js =================================================
    // ---------------------------------------------------------------------------
    // Built-in presets: one entry per agent, each with one or more appearances.
    //
    // Names are neutral ("Ink blue · inspired by Claude Code") on purpose: the
    // palette is migrated from public screenshots and brand material, not a
    // reproduction of another product's UI. `source` is shown in the panel so a
    // user can judge the fidelity themselves, and `confidence` says how the values
    // were obtained.
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
            palette: {
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
            palette: {
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
            palette: {
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
            palette: {
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
            palette: {
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
            palette: {
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
            palette: {
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
            palette: {
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
            palette: {
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
          },
        ],
      },
    ];

    // ==== src/30-storage.js =================================================
    // ---------------------------------------------------------------------------
    // Persistence: settings in localStorage, named themes in the same document.
    // No images: the Glitter module was removed in 0.2.0.
    // ---------------------------------------------------------------------------
    
    function defaultState() {
      return {
        v: 3,
        palette: null,
        tokens: null,
        activeName: '',
        activeSource: null,
        activeThemeId: null,
        savedThemes: [],
      };
    }
    
    function loadState() {
      const base = defaultState();
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
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
        return {
          ...base,
          palette: sanitizePalette(parsed.palette),
          tokens: sanitizeTokens(parsed.tokens),
          activeName,
          activeSource,
          activeThemeId: typeof parsed.activeThemeId === 'string' ? parsed.activeThemeId : null,
          savedThemes: sanitizeSavedThemes(parsed.savedThemes),
        };
      } catch {
        return base;
      }
    }
    
    function saveState(state) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        // A full or blocked localStorage must not break the settings page.
      }
    }
    
    function sanitizePalette(input) {
      return normalizePalette(input);
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
        const palette = sanitizePalette(item.palette);
        if (!palette) continue;
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
          palette,
          tokens: sanitizeTokens(item.tokens),
          source: ['vscode', 'file'].includes(item.source) ? item.source : 'custom',
          fileName: typeof item.fileName === 'string' ? item.fileName.slice(0, 120) : '',
          createdAt: Number.isFinite(item.createdAt) ? item.createdAt : Date.now(),
        });
        if (out.length >= 50) break;
      }
      return out;
    }
    
    // ---------------------------------------------------------------------------
    // Theme files.
    // ---------------------------------------------------------------------------
    
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
    
    /**
     * Validate an uploaded theme file.
     * @param {unknown} parsed JSON.parse result
     * @returns {{ok: true, theme: object} | {ok: false, reason: string}}
     */
    function readThemeFile(parsed) {
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        return { ok: false, reason: 'not-an-object' };
      }
    
      // VS Code / VS Code-fork themes: { colors: { ... } }
      if (parsed.colors && typeof parsed.colors === 'object') {
        const palette = paletteFromVscode(parsed.colors);
        if (!palette) return { ok: false, reason: 'vscode-no-usable-colors' };
        return {
          ok: true,
          theme: {
            name: typeof parsed.name === 'string' ? parsed.name : 'VS Code theme',
            source: 'vscode',
            palette,
            tokens: null,
          },
        };
      }
    
      const palette = sanitizePalette(parsed.palette || parsed.colors || parsed);
      if (!palette) return { ok: false, reason: 'no-palette' };
    
      return {
        ok: true,
        theme: {
          name: typeof parsed.name === 'string' ? parsed.name : 'Custom theme',
          source: 'theme-file',
          palette,
          tokens: sanitizeTokens(parsed.tokens),
        },
      };
    }
    
    function exportThemeFile(state) {
      const palette = state.palette || emptyPalette();
      return {
        $schema: 'https://github.com/Bulutor/dsh-pure-theme/blob/main/docs/theme-format.md',
        name: state.activeName || 'My DSH theme',
        author: '',
        basedOn: 'dark',
        palette,
        tokens: state.tokens || undefined,
      };
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
    
    /** Replace part of the persisted state and repaint. */
    function patchState(patch) {
      state = { ...state, ...patch };
      saveState(state);
      broadcastState();
      renderStylesheet();
      notify();
    }
    
    function replaceState(next) {
      state = next;
      saveState(state);
      broadcastState();
      renderStylesheet();
      notify();
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
    
    const UI_CSS = `
    .mst-page{display:flex;flex-direction:column;gap:14px;padding:24px 0 8px}
    .mst-page-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
    .mst-title{font-size:16px;line-height:24px;font-weight:500;color:var(--dsw-alias-label-primary)}
    .mst-sub{font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary);margin-top:2px;max-width:52em}
    .mst-badge{font-size:11px;line-height:16px;padding:1px 8px;border-radius:999px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);border:.5px solid var(--dsw-alias-border-l2);white-space:nowrap;max-width:42%;overflow:hidden;text-overflow:ellipsis}
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
    .mst-dot{width:12px;height:12px;border-radius:3px;border:.5px solid rgba(0,0,0,.14);flex:none}
    .mst-chip{display:inline-flex;align-items:center;gap:6px;padding:5px 8px;border-radius:var(--dsw-radius-sm);border:.5px solid var(--dsw-alias-border-l3);background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:12px;line-height:18px;cursor:pointer;text-align:left}
    .mst-chip:hover{background:var(--dsw-alias-interactive-bg-hover)}
    .mst-chip[aria-pressed=true]{border-color:var(--dsw-alias-brand-primary);background:color-mix(in srgb,var(--dsw-alias-brand-primary) 10%,transparent)}
    .mst-chips{display:flex;flex-wrap:wrap;gap:6px}
    .mst-hint{font-size:11px;line-height:17px;color:var(--dsw-alias-label-secondary)}
    .mst-mono{font-family:var(--ds-font-family-code,monospace)}
    .mst-empty{padding:10px 12px;border:.5px dashed var(--dsw-alias-border-l3);border-radius:var(--dsw-radius-md);font-size:11px;line-height:17px;color:var(--dsw-alias-label-secondary);text-align:center}
    .mst-saved{display:flex;align-items:center;gap:8px;padding:7px 8px;border-radius:var(--dsw-radius-md);border:.5px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2)}
    .mst-saved-list{max-height:224px;overflow-y:auto;padding-right:2px}
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
    @media (max-width:720px){.mst-color-grid{grid-template-columns:1fr}.mst-preview{height:144px}}
    `;

    // ==== src/60-ui.js ======================================================
    // ---------------------------------------------------------------------------
    // Settings page UI. Registered as a top-level Settings section, so it sits in
    // the left rail next to the Harness's own General section and renders the
    // project's two modules in the right pane:
    //
    //   1. Theme library — presets, saved themes, import with a name field.
    //   2. Colours      — live colour swatches with an in-page DSH preview.
    // ---------------------------------------------------------------------------
    
    const ROLE_BY_KEY = Object.fromEntries(PALETTE_ROLES.map((role) => [role.key, role]));
    
    const EXAMPLE_THEME = {
      $schema: 'https://github.com/Bulutor/dsh-pure-theme/blob/main/docs/theme-format.md',
      name: 'Minimal dark',
      author: '',
      basedOn: 'dark',
      palette: NATIVE_PALETTE,
    };
    
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
      return h('div', { className: `mst-status ${tone}` }, status.message);
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
    
    function MiniPreview({ palette }) {
      const colors = paletteWithFallback(palette);
      return h(
        'div',
        { className: 'mst-preview', 'aria-hidden': true },
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
            { className: 'mst-preview-card', style: { background: colors.surface, borderColor: colors.border } },
            h('span', { style: { color: colors.textPrimary } }, T.previewCard),
            h('span', { className: 'mst-preview-button', style: { background: colors.accent, color: colors.accentText } }, T.previewButton),
          ),
          h(
            'div',
            { className: 'mst-preview-input', style: { background: colors.input, borderColor: colors.border, color: colors.textSecondary } },
            T.previewInput,
          ),
        ),
        h('span', { className: 'mst-preview-label' }, T.previewLabel),
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
      return h(
        'div',
        { className: 'mst-body' },
        h('div', { className: 'mst-card-title' }, T.presetsTitle),
        h(
          'div',
          { className: 'mst-field' },
          h('span', null, T.presetsAgent),
          h(
            'select',
            { className: 'mst-select', value: agent.id, onChange: (event) => setAgentId(event.target.value) },
            AGENTS.map((item) => h('option', { key: item.id, value: item.id }, item.displayName)),
          ),
        ),
        h('div', { className: 'mst-hint' }, T.presetsDesc),
        h(
          'div',
          { className: 'mst-chips' },
          agent.themes.map((theme) => {
            const active = state.activeSource === 'preset' && state.activeName === `${agent.displayName} · ${theme.displayName}`;
            const dots = [theme.palette.sidebar, theme.palette.canvas, theme.palette.accent, theme.palette.textPrimary];
            return h(
              'button',
              {
                key: theme.id,
                type: 'button',
                className: 'mst-chip',
                'aria-pressed': active,
                onClick: () => onApply(agent, theme),
              },
              h('span', { className: 'mst-dots' }, dots.map((color, index) => h('span', { key: index, className: 'mst-dot', style: { background: color } }))),
              h('span', null, theme.displayName),
              active ? h('span', { className: 'mst-hint' }, T.presetsApplied) : null,
            );
          }),
        ),
        h(
          'div',
          { className: 'mst-hint' },
          `${T.presetsInspired}: ${agent.source} · ${tr(`confidence${agent.confidence[0].toUpperCase()}${agent.confidence.slice(1)}`)}`,
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
          const dots = [theme.palette.sidebar, theme.palette.canvas, theme.palette.accent, theme.palette.textPrimary];
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
              h('div', { className: 'mst-saved-meta' }, `${source}${origin} · ${date}`),
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
    
      const colors = Object.keys(draft.palette || {}).length;
      const colorCount = T.importColors.replace('{count}', String(colors));
      const source = draft.source === 'vscode' ? `${T.importVscode} · ${colorCount}` : colorCount;
      return h(
        'div',
        { className: 'mst-draft' },
        input,
        h(
          'div',
          { className: 'mst-row' },
          h('span', { className: 'mst-hint mst-grow' }, `${draft.fileName} · ${source}`),
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
      );
    }
    
    function ColorEditor({ draft, name, onName, onColor, onSave, onReset, onExport, onExample, status }) {
      const palette = paletteWithFallback(draft);
      const warning = paletteContrastWarning(palette);
      return h(
        'div',
        { className: 'mst-body' },
        h(MiniPreview, { palette }),
        h('div', { className: 'mst-hint' }, T.colorLiveHint),
        h('div', { className: 'mst-hint' }, T.darkOnly),
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
        warning ? h('div', { className: 'mst-hint mst-warn' }, `${T.colorContrastWarn} (${warning.ratio}:1)`) : null,
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
    
    function downloadJson(filename, data) {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
    
    function MinimalistPage() {
      const { state, updateInfo } = useSettings();
      useLocaleRevision();
      const [draft, setDraft] = useState(() => paletteWithFallback(state.palette || readEffectivePalette()));
      const [name, setName] = useState(state.activeName || '');
      const [importDraft, setImportDraft] = useState(null);
      const [importName, setImportName] = useState('');
      const [presetStatus, setPresetStatus] = useState(null);
      const [importStatus, setImportStatus] = useState(null);
      const [colorStatus, setColorStatus] = useState(null);
    
      useEffect(() => {
        setDraft(paletteWithFallback(state.palette || readEffectivePalette()));
      }, [state.palette]);
    
      useEffect(() => {
        setName(state.activeName || '');
      }, [state.activeName]);
    
      useEffect(() => {
        if (!updateInfo.checked) void checkForUpdate();
      }, [updateInfo.checked]);
    
      const applyPreset = (agent, theme) => {
        patchState({
          palette: { ...theme.palette },
          tokens: theme.tokens || null,
          activeName: `${agent.displayName} · ${theme.displayName}`,
          activeSource: 'preset',
          activeThemeId: null,
        });
        setPresetStatus({ kind: 'ok', message: T.applied });
      };
    
      const applySaved = (theme) => {
        patchState({
          palette: { ...theme.palette },
          tokens: theme.tokens ? { ...theme.tokens } : null,
          activeName: theme.name,
          activeSource: 'saved',
          activeThemeId: theme.id,
        });
        setPresetStatus({ kind: 'ok', message: T.applied });
      };
    
      const saveCurrent = () => {
        const themeName = (name.trim() || T.untitled).slice(0, 80);
        const item = {
          id: newThemeId(),
          name: themeName,
          palette: { ...draft },
          tokens: state.tokens ? { ...state.tokens } : null,
          source: 'custom',
          createdAt: Date.now(),
        };
        patchState({
          palette: { ...draft },
          savedThemes: [item, ...state.savedThemes].slice(0, 50),
          activeName: themeName,
          activeSource: 'saved',
          activeThemeId: item.id,
        });
        setColorStatus({ kind: 'ok', message: T.colorSavedName.replace('{name}', () => themeName) });
      };
    
      const deleteSaved = (theme) => {
        if (typeof window !== 'undefined' && typeof window.confirm === 'function' && !window.confirm(T.savedDeleteConfirm)) return;
        patchState({
          savedThemes: state.savedThemes.filter((item) => item.id !== theme.id),
          activeThemeId: state.activeThemeId === theme.id ? null : state.activeThemeId,
        });
        setPresetStatus({ kind: 'ok', message: T.savedDeleted });
      };
    
      const exportSaved = (theme) => {
        downloadJson(`${fileSlug(theme.name)}.json`, exportThemeFile({ palette: theme.palette, tokens: theme.tokens, activeName: theme.name }));
        setPresetStatus({ kind: 'ok', message: T.colorExported });
      };
    
      const exportCurrent = () => {
        downloadJson(
          `${fileSlug(name || T.untitled)}.json`,
          exportThemeFile({ palette: draft, tokens: state.tokens, activeName: name || T.untitled }),
        );
        setColorStatus({ kind: 'ok', message: T.colorExported });
      };
    
      const resetPalette = () => {
        patchState({ palette: null, tokens: null, activeName: '', activeSource: null, activeThemeId: null });
        setColorStatus({ kind: 'ok', message: T.colorResetDone });
      };
    
      const downloadExample = () => {
        downloadJson('example-theme.json', { ...EXAMPLE_THEME, name: T.exampleName, palette: { ...NATIVE_PALETTE } });
      };
    
      const onColor = (role, hex) => {
        const base = paletteWithFallback(getState().palette || draft);
        const next = { ...base, [role]: hex };
        setDraft(next);
        patchState({
          palette: next,
          activeName: (name.trim() || T.untitled).slice(0, 80),
          activeSource: 'custom',
          activeThemeId: null,
        });
      };
    
      const importFile = async (file) => {
        if (!file) return;
        try {
          const text = await file.text();
          const parsed = JSON.parse(text.replace(/^\uFEFF/, ''));
          const result = readThemeFile(parsed);
          if (!result.ok) {
            setImportStatus({ kind: 'error', message: `${T.importError} (${result.reason})` });
            return;
          }
          const theme = result.theme;
          setImportDraft({ ...theme, fileName: file.name });
          setImportName(theme.name || file.name.replace(/\.[^.]+$/, ''));
          setImportStatus({ kind: 'ok', message: T.importLoaded });
        } catch (error) {
          setImportStatus({ kind: 'error', message: `${T.importError} ${String(error?.message || error)}` });
        }
      };
    
      const applyImported = () => {
        if (!importDraft) return;
        const themeName = (importName.trim() || importDraft.name || T.untitled).slice(0, 80);
        patchState({
          palette: { ...importDraft.palette },
          tokens: importDraft.tokens ? { ...importDraft.tokens } : null,
          activeName: themeName,
          activeSource: 'custom',
          activeThemeId: null,
        });
        setImportStatus({ kind: 'ok', message: T.applied });
      };
    
      const saveImported = () => {
        if (!importDraft) return;
        const themeName = (importName.trim() || importDraft.name || T.untitled).slice(0, 80);
        const item = {
          id: newThemeId(),
          name: themeName,
          palette: { ...importDraft.palette },
          tokens: importDraft.tokens ? { ...importDraft.tokens } : null,
          source: importDraft.source === 'vscode' ? 'vscode' : 'file',
          fileName: importDraft.fileName || '',
          createdAt: Date.now(),
        };
        patchState({
          palette: { ...importDraft.palette },
          tokens: item.tokens,
          savedThemes: [item, ...state.savedThemes].slice(0, 50),
          activeName: themeName,
          activeSource: 'saved',
          activeThemeId: item.id,
        });
        setImportDraft(null);
        setImportName('');
        setImportStatus({ kind: 'ok', message: T.colorSavedName.replace('{name}', () => themeName) });
      };
    
      const current = state.activeName || T.currentNone;
      return h(
        'div',
        { className: 'mst-page' },
        h(
          'div',
          { className: 'mst-page-head' },
          h('div', null, h('div', { className: 'mst-title' }, T.title), h('div', { className: 'mst-sub' }, T.subtitle)),
          h('span', { className: 'mst-badge', title: current }, `${T.currentTheme}: ${current}`),
        ),
        updateInfo.newer
          ? h(
              'a',
              { className: 'mst-hint mst-warn', href: 'https://www.npmjs.com/package/dsh-pure-theme', target: '_blank', rel: 'noreferrer' },
              format(T.updateAvailable, { version: updateInfo.latest }),
            )
          : null,
        h(
          Card,
          { title: T.themesTitle, desc: T.themesDesc },
          h(PresetPicker, { state, onApply: applyPreset }),
          h(Status, { status: presetStatus }),
          h('div', { className: 'mst-divider' }),
          h('div', { className: 'mst-body' }, h('div', { className: 'mst-card-title' }, T.savedTitle), h(SavedThemeList, {
            state,
            onApply: applySaved,
            onExport: exportSaved,
            onDelete: deleteSaved,
          })),
          h('div', { className: 'mst-divider' }),
          h(
            'div',
            { className: 'mst-body' },
            h('div', { className: 'mst-card-title' }, T.importTitle),
            h('div', { className: 'mst-card-desc' }, T.importDesc),
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
                setImportStatus(null);
              },
            }),
            h(Status, { status: importStatus }),
          ),
        ),
        h(
          Card,
          { title: T.colorsTitle, desc: T.colorsDesc },
          h(ColorEditor, {
            draft,
            name,
            onName: setName,
            onColor,
            onSave: saveCurrent,
            onReset: resetPalette,
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
          window.__dshMinimalTheme = {
            get state() {
              return getState();
            },
            get effectivePalette() {
              return readEffectivePalette();
            },
            apply(palette, name) {
              patchState({
                palette: normalizePalette(palette),
                activeName: name || T.untitled,
                activeSource: 'custom',
                activeThemeId: null,
              });
            },
            reset() {
              patchState({ palette: null, tokens: null, activeName: '', activeSource: null, activeThemeId: null });
            },
          };
          return () => {
            delete window.__dshMinimalTheme;
          };
        }, 'dsh-pure-theme: debug handle');
    
        try {
          ctx.slots.inject('settings.section', () =>
            ctx.slots.register(
              {
                name: 'settings.section',
                id: 'minimalist-theme',
                order: 1,
                label: () => tr('nav'),
                locale: LOCALE_NS,
              },
              MinimalistPage,
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
      buildStylesheet,
      readThemeFile,
      exportThemeFile,
      sanitizePalette,
      sanitizeTokens,
      sanitizeSavedThemes,
      paletteContrastWarning,
      isNewerVersion,
      defaultState,
      emptyPalette,
      NATIVE_PALETTE,
      AGENTS,
      ROLE_TOKENS,
      PALETTE_ROLES,
      COLOR_GROUPS,
      readEffectivePalette,
      components: { MinimalistPage, Card, ColorSwatch, ImportDraft, ColorEditor, PresetPicker, SavedThemeList, MiniPreview },
    };

    return plugin;
  },
});
