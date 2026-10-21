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
