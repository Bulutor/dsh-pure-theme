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
