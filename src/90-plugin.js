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
          patchState({
            palettes: both,
            tokens: { dark: null, light: null },
            activeName: name || T.untitled,
            activeSource: 'custom',
            activeThemeId: null,
          });
        },
        applyMode(mode, palette, name) {
          const palettes = clonePalettes(getState().palettes);
          palettes[mode] = normalizePalette(palette);
          patchState({
            palettes,
            activeName: name || T.untitled,
            activeSource: 'custom',
            activeThemeId: null,
          });
        },
        reset() {
          patchState({
            palettes: { dark: null, light: null },
            tokens: { dark: null, light: null },
            activeName: '',
            activeSource: null,
            activeThemeId: null,
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
  buildStylesheet,
  readThemeFile,
  exportThemeFile,
  sanitizePalette,
  sanitizePalettes,
  sanitizeTokens,
  sanitizeTokensByMode,
  sanitizeSavedThemes,
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
  components: { PureThemePage, Card, ColorSwatch, ImportDraft, ColorEditor, PresetPicker, SavedThemeList, MiniPreview },
};
