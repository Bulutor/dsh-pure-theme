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
