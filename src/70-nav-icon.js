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
