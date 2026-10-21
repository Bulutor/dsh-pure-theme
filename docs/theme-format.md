# 主题文件格式

`dsh-pure-theme` 接受两种文件：

1. **本插件格式**（`.json` / `.dshtheme`）——推荐，写 10 个语义角色即可；
2. **VS Code 主题**（`*.json`，含 `"colors"` 字段）——插件会自动映射，适合从 VS Code 系 Agent 直接搬。

## 1. 本插件格式

```json
{
  "$schema": "https://github.com/Bulutor/dsh-pure-theme/blob/main/docs/theme-format.md",
  "name": "Pure desk",
  "author": "you",
  "basedOn": "dark",
  "palette": {
    "sidebar": "#1B1B1B",
    "canvas": "#202020",
    "input": "#262626",
    "surface": "#242424",
    "surfaceAlt": "#2E2E2E",
    "border": "#3A3A3A",
    "textPrimary": "#EDEDED",
    "textSecondary": "#A6A6A6",
    "accent": "#4D6BFE",
    "accentText": "#FFFFFF"
  }
}
```

### palette 的 10 个角色

| 角色 | 作用 | 映射到的 DSH token |
|---|---|---|
| `sidebar` | 左侧功能/项目栏、标题栏 | `--dsw-static-neutral-bluish-900`、`--dsw-specific-sidebar-fill` |
| `canvas` | 中间对话区 + 右栏底色 | `--dsw-static-neutral-bluish-950`、`--dsw-alias-bg-base` |
| `input` | 输入区所在面 | `--dsw-static-neutral-bluish-875` |
| `surface` | 浮起卡片、消息气泡 | `--dsw-static-neutral-bluish-850` |
| `surfaceAlt` | 菜单、Toast、弹层 | `--dsw-static-neutral-bluish-800`、`--dsw-alias-bg-overlay` |
| `border` | 分隔线、卡片描边 | `--dsw-alias-border-l1 ~ l4` |
| `textPrimary` | 正文与标题 | `--dsw-alias-label-primary` |
| `textSecondary` | 说明、时间戳、占位符 | `--dsw-alias-label-secondary / tertiary / caption` |
| `accent` | 按钮、链接、选中态 | `--dsw-alias-brand-primary`、`--dsw-alias-link`、`--dsw-alias-state-business-primary` |
| `accentText` | 强调色上的文字 | `--dsw-alias-label-primary-foreground` |

- 只作用于**深色主题**（`body[data-ds-dark-theme]`），不会破坏浅色模式。
- 至少提供 3 个角色才会被接受；缺的角色保持 DSH 默认值。
- 色值支持 `#RGB`、`#RRGGBB`、`#RRGGBBAA`。

### 进阶：`tokens`

需要精确控制某个 DSH token 时，可加 `tokens` 字段（仅允许 `--dsw-` 前缀）：

```json
"tokens": {
  "--dsw-alias-markdown-code-block": "#181818",
  "--dsw-alias-scrollbar-bg-l1": "#3A3A3A"
}
```

## 2. VS Code 主题

插件识别三类键，按顺序取第一个命中的：

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

映射后建议按 [migration.md](migration.md) 的清单微调——编辑器配色直接套到聊天界面上，通常会出现“侧栏和画布一样黑”“强调色太刺眼”两个问题。

## 校验规则

- 文件必须是 JSON 对象；BOM 会被自动去掉。
- `palette` 里未知角色会被忽略，非法色值会被忽略。
- 少于 3 个有效角色 → 拒绝导入并提示。
- 导入后先进入「主题库」的草稿区，确认名称后再「保存到我的主题」；也可以只应用不保存。颜色只在本机读取，不会上传。
