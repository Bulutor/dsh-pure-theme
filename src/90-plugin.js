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
