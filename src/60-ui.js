// ---------------------------------------------------------------------------
// Settings page UI. Registered as a top-level Settings section, so it sits in
// the left rail next to the Harness's own General section and renders the
// project's two modules in the right pane:
//
//   1. Theme library — presets, saved themes, import with a name field.
//   2. Colours      — dark/light tabs with live swatches and an in-page preview.
// ---------------------------------------------------------------------------

const ROLE_BY_KEY = Object.fromEntries(PALETTE_ROLES.map((role) => [role.key, role]));

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

function PureThemePage() {
  const { state, updateInfo } = useSettings();
  useLocaleRevision();
  const dshMode = useDshMode();
  const [mode, setMode] = useState(dshMode);
  const [drafts, setDrafts] = useState(() => clonePalettes(state.palettes));
  const [name, setName] = useState(state.activeName || '');
  const [importDraft, setImportDraft] = useState(null);
  const [importName, setImportName] = useState('');
  const [presetStatus, setPresetStatus] = useState(null);
  const [importStatus, setImportStatus] = useState(null);
  const [colorStatus, setColorStatus] = useState(null);

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
    setPresetStatus({ kind: 'ok', message: statusForApply(palettes, dshMode) });
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
    setPresetStatus({ kind: 'ok', message: statusForApply(palettes, dshMode) });
  };

  const saveCurrent = () => {
    const themeName = (name.trim() || T.untitled).slice(0, 80);
    const palettes = clonePalettes(drafts);
    if (!palettes.dark && !palettes.light) palettes[mode] = emptyPalette(mode);
    const tokens = cloneTokens(state.tokens);
    const item = {
      id: newThemeId(),
      name: themeName,
      palettes,
      tokens,
      source: 'custom',
      createdAt: Date.now(),
    };
    patchState({
      palettes,
      tokens,
      savedThemes: [item, ...state.savedThemes].slice(0, 50),
      activeName: themeName,
      activeSource: 'saved',
      activeThemeId: item.id,
      baseline: createBaseline({ palettes, tokens, name: themeName, source: 'saved', themeId: item.id }),
    });
    setColorStatus({ kind: 'ok', message: T.colorSavedName.replace('{name}', () => themeName) });
  };

  const deleteSaved = (theme) => {
    if (typeof window !== 'undefined' && typeof window.confirm === 'function' && !window.confirm(T.savedDeleteConfirm)) return;
    const baseline =
      state.baseline && state.baseline.themeId === theme.id
        ? { ...state.baseline, themeId: null, source: 'custom' }
        : state.baseline;
    patchState({
      savedThemes: state.savedThemes.filter((item) => item.id !== theme.id),
      activeThemeId: state.activeThemeId === theme.id ? null : state.activeThemeId,
      activeSource: state.activeThemeId === theme.id ? 'custom' : state.activeSource,
      baseline,
    });
    setPresetStatus({ kind: 'ok', message: T.savedDeleted });
  };

  const exportSaved = (theme) => {
    downloadJson(
      `${fileSlug(theme.name)}.json`,
      exportThemeFile({ palettes: theme.palettes, tokens: theme.tokens, activeName: theme.name }),
    );
    setPresetStatus({ kind: 'ok', message: T.colorExported });
  };

  const exportCurrent = () => {
    const palettes = clonePalettes(drafts);
    if (!palettes.dark && !palettes.light) palettes[mode] = emptyPalette(mode);
    downloadJson(
      `${fileSlug(name || T.untitled)}.json`,
      exportThemeFile({ palettes, tokens: state.tokens, activeName: name || T.untitled }),
    );
    setColorStatus({ kind: 'ok', message: T.colorExported });
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
    setColorStatus({ kind: 'ok', message: T.colorResetDone });
  };

  const clearModeEdits = () => {
    const current = getState();
    const result = restoreModeFromBaseline(current, current.baseline, mode);
    if (!result) return;
    patchState(result.patch);
    setColorStatus({
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
    setColorStatus({ kind: 'ok', message: T.lightDraftCreated });
  };

  const onColor = (role, hex) => {
    const current = getState();
    const baseline = current.baseline || baselineFromState(current);
    const currentPalettes = clonePalettes(current.palettes);
    const base = paletteWithFallback(currentPalettes[mode] || drafts[mode], mode);
    const next = { ...base, [role]: hex };
    const palettes = { ...currentPalettes, [mode]: next };
    const clean = modesMatchBaseline({ palettes, tokens: current.tokens }, baseline);
    patchState({
      palettes,
      baseline,
      activeName: clean ? baseline.name : (name.trim() || T.untitled).slice(0, 80),
      activeSource: clean ? baseline.source : 'custom',
      activeThemeId: clean ? baseline.themeId : null,
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
      setImportStatus({
        kind: 'ok',
        message: format(T.importModes, { modes: coverageLabel(theme) }),
      });
    } catch (error) {
      setImportStatus({ kind: 'error', message: `${T.importError} ${String(error?.message || error)}` });
    }
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
    setImportStatus({ kind: 'ok', message: statusForApply(palettes, dshMode) });
  };

  const saveImported = () => {
    if (!importDraft) return;
    const themeName = (importName.trim() || importDraft.name || T.untitled).slice(0, 80);
    const palettes = clonePalettes(importDraft.palettes);
    const tokens = cloneTokens(importDraft.tokens);
    const item = {
      id: newThemeId(),
      name: themeName,
      palettes,
      tokens,
      source: importDraft.source === 'vscode' ? 'vscode' : 'file',
      fileName: importDraft.fileName || '',
      createdAt: Date.now(),
    };
    patchState({
      palettes,
      tokens,
      savedThemes: [item, ...state.savedThemes].slice(0, 50),
      activeName: themeName,
      activeSource: 'saved',
      activeThemeId: item.id,
      baseline: createBaseline({ palettes, tokens, name: themeName, source: 'saved', themeId: item.id }),
    });
    setImportDraft(null);
    setImportName('');
    setImportStatus({ kind: 'ok', message: T.colorSavedName.replace('{name}', () => themeName) });
  };

  const downloadExample = () => {
    downloadJson('example-theme.json', {
      ...EXAMPLE_THEME,
      name: T.exampleName,
      palettes: clonePalettes(EXAMPLE_THEME.palettes),
    });
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
        draft: drafts,
        mode,
        dshMode,
        coverage,
        baseline,
        modeDirty,
        name,
        onName: setName,
        onMode: setMode,
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
