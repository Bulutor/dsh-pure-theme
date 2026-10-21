# 主题文件格式

`dsh-pure-theme` 接受两种文件：

1. **本插件格式**（`.json` / `.dshtheme`）——推荐，写 10 个语义角色，可以只写深色、只写浅色，或两者都写；
2. **VS Code 主题**（`*.json`，含 `"colors"` 字段）——插件会自动映射，并按 `type` / 背景亮度放入深色或浅色。

## 1. 本插件格式（v2）

```json
{
  "$schema": "https://github.com/Bulutor/dsh-pure-theme/blob/main/docs/theme-format.md",
  "version": 2,
  "name": "Jade desk",
  "author": "you",
  "palettes": {
    "dark": {
      "sidebar": "#1D2724",
      "canvas": "#222F2A",
      "input": "#222F2A",
      "surface": "#222F2A",
      "surfaceAlt": "#26332E",
      "border": "#2E3D36",
      "textPrimary": "#E6EFE9",
      "textSecondary": "#9FB3A8",
      "accent": "#8FD3B4",
      "accentText": "#12201A"
    },
    "light": {
      "sidebar": "#EEF4F1",
      "canvas": "#F7FAF8",
      "input": "#FFFFFF",
      "surface": "#FFFFFF",
      "surfaceAlt": "#E4EDE8",
      "border": "#C6D6CE",
      "textPrimary": "#15201B",
      "textSecondary": "#5C6F65",
      "accent": "#2F7D5E",
      "accentText": "#FFFFFF"
    }
  }
}
```

### palette 的 10 个角色

| 角色 | 作用 | 深色映射 | 浅色映射 |
|---|---|---|---|
| `sidebar` | 左侧功能/项目栏、标题栏 | `--dsw-static-neutral-bluish-900`、`--dsw-specific-sidebar-fill` | `--dsw-specific-sidebar-fill` + hover/active 派生 |
| `canvas` | 中间对话区 + 右栏底色 | `--dsw-static-neutral-bluish-950`、`--dsw-alias-bg-base` | `--dsw-alias-bg-base` |
| `input` | 输入区所在面 | `--dsw-static-neutral-bluish-875` | `--dsw-specific-input-major` |
| `surface` | 浮起卡片、消息气泡 | `--dsw-static-neutral-bluish-850` | `--dsw-alias-bg-layer-1/2` |
| `surfaceAlt` | 菜单、Toast、弹层 | `--dsw-static-neutral-bluish-800`、`--dsw-alias-bg-overlay` | `--dsw-alias-bg-overlay`、`--dsw-alias-bg-layer-3` |
| `border` | 分隔线、卡片描边 | `--dsw-alias-border-l1 ~ l4` | `--dsw-alias-border-l1 ~ l4`（按透明度派生） |
| `textPrimary` | 正文与标题 | `--dsw-alias-label-primary` | `--dsw-alias-label-primary` |
| `textSecondary` | 说明、时间戳、占位符 | `--dsw-alias-label-secondary / tertiary / caption` | `--dsw-alias-label-secondary` + 派生层级 |
| `accent` | 按钮、链接、选中态 | `--dsw-alias-brand-primary`、`--dsw-alias-link`、`--dsw-alias-state-business-primary` | 同左 + 按钮 hover 派生 |
| `accentText` | 强调色上的文字 | `--dsw-alias-label-primary-foreground` | 同左 |

- 至少提供一个模式、且该模式至少 3 个角色才会被接受。
- 可以只有 `dark`，或只有 `light`；缺失的模式保持 DSH 原生配色。
- 深色保留 0.3 的静态 ramp 覆盖；浅色只覆盖 alias/specific 层，不改写浅色的静态 ramp。
- 色值支持 `#RGB`、`#RRGGBB`、`#RRGGBBAA`（8 位会取前 6 位）。

### 进阶：`tokens`

需要精确控制某个 DSH token 时，可加 `tokens` 字段，按模式分开（仅允许 `--dsw-` 前缀）：

```json
"tokens": {
  "dark": {
    "--dsw-alias-markdown-code-block": "#181818"
  },
  "light": {
    "--dsw-alias-markdown-code-block": "#F2F7F4"
  }
}
```

`tokens` 里的值会覆盖同名 palette 映射。旧格式的扁平 `tokens` 会被当作深色 tokens。

## 2. VS Code 主题

插件识别以下键，按顺序取第一个命中的：

| 角色 | 读取的 VS Code 键 |
|---|---|
| sidebar | `sideBar.background`、`activityBar.background` |
| canvas | `editor.background`、`editorGroupHeader.tabsBackground` |
| input | `input.background`、`editorWidget.background` |
| surface | `panel.background`、`terminal.background` |
| surfaceAlt | `menu.background`、`quickInput.background`、`dropdown.background` |
| border | `panel.border`、`sideBar.border`、`editorGroup.border`、`contrastBorder` |
| textPrimary | `editor.foreground`、`foreground` |
| textSecondary | `descriptionForeground`、`sideBar.foreground`、`input.placeholderForeground` |
| accent | `button.background`、`focusBorder`、`activityBarBadge.background`、`textLink.foreground` |
| accentText | `button.foreground` |

- `type: "light"` 或 `editor.background` 亮度 > 0.5 → 放进 `light`；
- 否则放进 `dark`；
- 映射后建议按 [migration.md](migration.md) 的清单微调——编辑器配色直接套到聊天界面上，通常会出现“侧栏和画布一样黑/一样白”“强调色太刺眼”两个问题。

## 3. 旧格式兼容

```json
{
  "name": "Old dark",
  "basedOn": "dark",
  "palette": { "...": "..." },
  "tokens": { "--dsw-alias-brand-primary": "#123456" }
}
```

- 旧 `palette` → `palettes.dark`；
- `basedOn: "light"` → `palettes.light`（这不是旧插件的常规写法，但可以识别）；
- 旧扁平 `tokens` → `tokens.dark`；
- 不自动生成另一模式的色板。

## 校验规则

- 文件必须是 JSON 对象；BOM 会被自动去掉。
- `palettes` 里未知角色会被忽略，非法色值会被忽略。
- 所有模式都无效 → 拒绝导入并提示。
- 导入后先进入「主题库」的草稿区，确认名称后再「保存到我的主题」；也可以只应用不保存。颜色只在本机读取，不会上传。
- v2 文件写出 `version: 2`；导出的深色主题同时保留旧 `palette` 字段，方便 0.3 用户至少拿到深色那一半。
