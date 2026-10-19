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


