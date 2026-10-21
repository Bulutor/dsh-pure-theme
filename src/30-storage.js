// ---------------------------------------------------------------------------
// Persistence: settings in localStorage, named themes in the same document.
// v4 stores one optional palette per colour scheme; v3's single dark palette
// migrates to `palettes.dark` so existing themes never change their meaning.
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
    v: 4,
    palettes: defaultPalettes(),
    tokens: defaultTokens(),
    activeName: '',
    activeSource: null,
    activeThemeId: null,
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
      savedThemes: sanitizeSavedThemes(parsed.savedThemes),
    };
    if (migrated || parsed.v !== 4 || !parsed.palettes) saveState(next);
    return next;
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
