// ---------------------------------------------------------------------------
// Built-in presets: one entry per agent, each with one or more appearances.
//
// Names are neutral ("Ink blue · inspired by Claude Code") on purpose: the
// palette is migrated from public screenshots and brand material, not a
// reproduction of another product's UI. `source` is shown in the panel so a
// user can judge the fidelity themselves, and `confidence` says how the values
// were obtained.
// ---------------------------------------------------------------------------

const AGENTS = [
  {
    id: 'dsh',
    displayName: 'DeepSeek Harness',
    source: 'dsh-pure-theme',
    confidence: 'high',
    themes: [
      {
        id: 'jade-desk',
        displayName: '墨玉 · Jade desk',
        palette: {
          sidebar: '#1D2724',
          canvas: '#222F2A',
          input: '#222F2A',
          surface: '#222F2A',
          surfaceAlt: '#26332E',
          border: '#2E3D36',
          textPrimary: '#E6EFE9',
          textSecondary: '#9FB3A8',
          accent: '#8FD3B4',
          accentText: '#12201A',
        },
      },
    ],
  },
  {
    id: 'claude-code',
    displayName: 'Claude Code',
    source: 'anthropic.com/claude-code',
    confidence: 'high',
    themes: [
      {
        id: 'warm-ink',
        displayName: '暖墨 · Warm ink',
        palette: {
          sidebar: '#181818',
          canvas: '#1E1E1E',
          input: '#262626',
          surface: '#262626',
          surfaceAlt: '#2E2E2E',
          border: '#3A3A3A',
          textPrimary: '#EDE9E3',
          textSecondary: '#A6A19B',
          accent: '#DB7759',
          accentText: '#1E1E1E',
        },
      },
    ],
  },
  {
    id: 'codex',
    displayName: 'Codex',
    source: 'openai.com/codex',
    confidence: 'medium',
    themes: [
      {
        id: 'graphite',
        displayName: '石墨 · Graphite',
        palette: {
          sidebar: '#0D0D0D',
          canvas: '#131313',
          input: '#1A1A1A',
          surface: '#1A1A1A',
          surfaceAlt: '#222222',
          border: '#2E2E2E',
          textPrimary: '#ECECEC',
          textSecondary: '#9B9B9B',
          accent: '#10A37F',
          accentText: '#FFFFFF',
        },
      },
    ],
  },
  {
    id: 'gemini',
    displayName: 'Gemini',
    source: 'gemini.google.com',
    confidence: 'medium',
    themes: [
      {
        id: 'google-dark',
        displayName: '雾灰 · Fog grey',
        palette: {
          sidebar: '#131314',
          canvas: '#1E1F20',
          input: '#1E1F20',
          surface: '#282A2C',
          surfaceAlt: '#303134',
          border: '#3C4043',
          textPrimary: '#E3E3E3',
          textSecondary: '#9AA0A6',
          accent: '#8AB4F8',
          accentText: '#0B1220',
        },
      },
    ],
  },
  {
    id: 'codebuddy',
    displayName: 'CodeBuddy',
    source: 'copilot.tencent.com',
    confidence: 'high',
    themes: [
      {
        id: 'tencent-blue',
        displayName: '夜紫 · Night violet',
        palette: {
          sidebar: '#121219',
          canvas: '#1C1C28',
          input: '#262730',
          surface: '#232330',
          surfaceAlt: '#2B2C3B',
          border: '#343545',
          textPrimary: '#E8E8F2',
          textSecondary: '#9A9CB0',
          accent: '#5A49F7',
          accentText: '#FFFFFF',
        },
      },
    ],
  },
  {
    id: 'workbuddy',
    displayName: 'WorkBuddy',
    source: 'workbuddy',
    confidence: 'low',
    themes: [
      {
        id: 'plum',
        displayName: '梅子 · Plum',
        palette: {
          sidebar: '#17161A',
          canvas: '#1D1B21',
          input: '#232028',
          surface: '#232028',
          surfaceAlt: '#2A2731',
          border: '#34313C',
          textPrimary: '#EFEAF3',
          textSecondary: '#A39CAF',
          accent: '#FF7A45',
          accentText: '#1D1B21',
        },
      },
    ],
  },
  {
    id: 'kimi-code',
    displayName: 'Kimi Code',
    source: 'kimi.moonshot.cn',
    confidence: 'low',
    themes: [
      {
        id: 'indigo',
        displayName: '靛青 · Indigo',
        palette: {
          sidebar: '#101014',
          canvas: '#16161B',
          input: '#1C1C22',
          surface: '#1C1C22',
          surfaceAlt: '#24242C',
          border: '#2E2E38',
          textPrimary: '#ECEBF5',
          textSecondary: '#9C9AAD',
          accent: '#6C5CE7',
          accentText: '#FFFFFF',
        },
      },
    ],
  },
  {
    id: 'qwen',
    displayName: '通义千问',
    source: 'tongyi.aliyun.com',
    confidence: 'low',
    themes: [
      {
        id: 'violet',
        displayName: '青紫 · Violet',
        palette: {
          sidebar: '#14151A',
          canvas: '#1A1B21',
          input: '#1F2028',
          surface: '#1F2028',
          surfaceAlt: '#262832',
          border: '#32353F',
          textPrimary: '#EDEEF5',
          textSecondary: '#9DA1AE',
          accent: '#615CED',
          accentText: '#FFFFFF',
        },
      },
    ],
  },
  {
    id: 'zhipu',
    displayName: '智谱清言',
    source: 'chatglm.cn',
    confidence: 'low',
    themes: [
      {
        id: 'cobalt',
        displayName: '钴蓝 · Cobalt',
        palette: {
          sidebar: '#101319',
          canvas: '#161A22',
          input: '#1B2029',
          surface: '#1B2029',
          surfaceAlt: '#222833',
          border: '#2C3442',
          textPrimary: '#E8EDF5',
          textSecondary: '#93A0B4',
          accent: '#3D6BFF',
          accentText: '#FFFFFF',
        },
      },
    ],
  },
];
