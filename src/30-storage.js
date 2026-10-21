// ---------------------------------------------------------------------------
// Persistence: settings in localStorage, named themes in the same document.
// No images: the Glitter module was removed in 0.2.0.
// ---------------------------------------------------------------------------

// The package was renamed; carry a profile's saved themes over once instead of
// making the rename look like data loss.
const LEGACY_STORAGE_KEYS = ['dsh-simple-theme:settings:v1'];

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
    const next = {
      ...base,
      palette: sanitizePalette(parsed.palette),
      tokens: sanitizeTokens(parsed.tokens),
      activeName,
      activeSource,
      activeThemeId: typeof parsed.activeThemeId === 'string' ? parsed.activeThemeId : null,
      savedThemes: sanitizeSavedThemes(parsed.savedThemes),
    };
    if (migrated) saveState(next);
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
