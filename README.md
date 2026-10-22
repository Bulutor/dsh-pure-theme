# dsh-pure-theme

> DeepSeek Harness 的主题编辑器：**在设置里直接改各组件颜色、保存命名主题、导入主题文件。**
> Theme editor for DeepSeek Harness: edit dark and light component colours, save named themes, and import theme files.

为从其他编程 Agent 转到 DeepSeek Harness 的人而做。换肤不应该逼着人去翻 CSS 变量，也不应该把设置页塞满。

[![npm](https://img.shields.io/npm/v/dsh-pure-theme)](https://www.npmjs.com/package/dsh-pure-theme)
[![license](https://img.shields.io/npm/l/dsh-pure-theme)](LICENSE)

## 它长什么样

安装后，设置面板左侧会出现一个与「通用设置」同级的一级栏目：

> **设置 → 主题**（English: **Settings → Theme**）

右侧只有两个模块，上下排列：

1. **主题库**：从其他 Agent 的预设开始、应用「我的主题」、导入主题文件并命名保存；
2. **配色**：在色块上直接取色，实时修改 Harness 深色/浅色两套外观，并带一个 DSH 小预览。

栏目名与插件列表标题跟随 **DeepSeek Harness 当前语言**。内置完整中文/英文文案；日语、韩语、法语、德语、西班牙语、葡萄牙语、俄语、阿拉伯语、印地语等 30+ 语言的栏目名/标题已预置，其余文案按 DSH 的 locale fallback 走英文。

## 两个模块

### 1. 主题库

- **Agent 配色**：Agent 下拉 + 该 Agent 的主题 chips，点一下整套应用；每套主题带深色和浅色两张色板，来源与可信度收在 chips 的悬停提示里。应用结果显示在 Agent 选择器正下方。
- **我的主题**：保存过的命名主题，支持应用、导出、删除；最多保留 50 个。
  - 列表最多露出 **三条记录**，更多记录通过右侧滚动条查看，不会把整张设置页越拉越长。
  - 「导出」和「删除」都会先弹出确认；确认导出后才显示成功提示。
  - 应用、导出、删除的结果显示在「我的主题」标题下方，不再占用 Agent 预设的状态位置。
- **导入主题文件**：拖入或选择 `.json` / `.dshtheme` / VS Code 配色主题；识别后先进入草稿区，**先命名，再决定保存还是应用**。颜色只在本机读取。

### 2. 配色

- 10 个语义色块，覆盖 Harness 的主要组件：
  - 表面：侧边栏、画布、输入区、卡片、浮层；
  - 文字与描边：描边、主文字、次文字；
  - 强调：强调色、强调色文字。
- 顶部切换**深色 / 浅色**，分别编辑两套色板；修改会立即写入对应模式的样式，切到该模式即可看到。
- 某模式没有自定义色板时显示 Harness 原生值；修改任一颜色即创建该模式的色板。
- 浅色为空、深色已有色板时，可以「生成浅色草稿」，确认后再保存。
- 内置 DSH 小预览：侧边栏、卡片、按钮、输入框会按当前色板实时变化。
- 显示文字/画布对比度警告；支持清除当前模式的配色编辑、恢复 Harness 默认、导出当前主题、下载示例文件。
- 「清除当前深浅模式配色编辑」只把正在编辑的深色或浅色回退到应用主题时的原色板，另一模式的改动保留；两套都回到原色后，若主题来自预设或「我的主题」，恢复「使用中」标记。
- **保存到我的主题**：会同时保存深色和浅色两张色板，并立即应用当前配色。这与导入草稿的「保存」不同，见下表。

## 保存、应用、导出的区别

| 操作 | 加入「我的主题」 | 立即应用 | 需要确认 |
|---|---:|---:|---:|
| 导入草稿「保存到我的主题」 | 是 | **否** | 否 |
| 导入草稿「应用」 | 否 | 是 | 否 |
| 配色卡片「保存到我的主题」 | 是 | **是** | 否 |
| 「我的主题」行内「应用」 | 不变 | 是 | 否 |
| 「我的主题」行内「导出」 | 不变 | 否 | **是** |
| 「我的主题」行内「删除」 | 移除 | 当前配色保持不变 | **是** |
| 配色卡片「导出当前主题」 | 不变 | 否 | **是** |

状态提示只短暂保留 3 秒：Agent 的结果在 Agent 区，导入的结果在导入区，「我的主题」的结果在该模块标题下，配色保存/导出的结果在配色卡片底部。导出成功提示只在确认之后出现。

## 安装

```sh
dsh plugin --profile <profile> add dsh-pure-theme
```

或在 DeepSeek Harness 的插件市场搜索 `dsh-pure-theme`，或从本地目录安装：

```sh
dsh plugin --profile desktop add /path/to/dsh-pure-theme
```

安装/更新客户端 bundle 后刷新页面（Ctrl+R）。卸载即恢复原生外观——插件只写自己的 `<style>` 标签，不改 Host 代码。

## 主题文件

```json
{
  "$schema": "https://github.com/Bulutor/dsh-pure-theme/blob/main/docs/theme-format.md",
  "version": 2,
  "name": "Jade desk",
  "author": "",
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

- 10 个语义角色：`sidebar`、`canvas`、`input`、`surface`、`surfaceAlt`、`border`、`textPrimary`、`textSecondary`、`accent`、`accentText`。每个模式至少写 3 个角色；缺失的模式保持 DSH 原生配色。
- 也接受 VS Code 主题（`{ "colors": { "sideBar.background": "...", "editor.background": "..." } }`），插件按 `type` / 背景亮度判断放进深色还是浅色，并按颜色键自动迁移。
- 旧版单 `palette` 文件仍可导入，视为“仅深色”，浅色保持原生。
- 可选 `tokens` 字段可按模式覆盖任意 `--dsw-*` token。
- **支持 JSONC 注释**：`//` 行注释和 `/* … */` 块注释会在导入前剥离，字符串里的 `https://…` 不会被误删。
- 设置页「下载示例文件」生成的模板，会在 JSON 底部附一大段字段注释，逐项说明每个参数是什么；带注释的文件可以直接导入。仓库里的 [examples/jade-desk.json](examples/jade-desk.json) 也带同样的字段说明。
- 格式详见 [docs/theme-format.md](docs/theme-format.md)，迁移方法见 [docs/migration.md](docs/migration.md)。

## 它怎么工作

DSH 的深色表面从 `--dsw-static-neutral-bluish-*` 灰阶推导，浅色则主要走 alias/specific 层。插件做两件事：

- 在 `body[data-ds-dark-theme]` 上写深色色板；
- 在 `body:not([data-ds-dark-theme])` 上写浅色色板。

一个主题可以带 `palettes.dark` 和 `palettes.light`；应用时两张色板一起写入，但**不修改 DSH 的浅色/深色/跟随系统选择**。DSH 切到哪个模式，主题就显示对应那张色板。旧主题只有深色色板时，浅色继续使用 DSH 原生配色，不会自动生成浅色。

浅色/深色/跟随系统仍然由 DSH 原生「通用 → 外观」控制；插件不复制这个开关，只负责两种模式下的配色。这样外观只有一个入口，不会出现两套外观设置打架。

浅色不改写 `--dsw-static-neutral-bluish-00/50/75/100/150`：这些 token 还被文字前景、代码块、登录框等共用，只在 alias/specific 层覆盖更安全。描边、hover、三级文字等派生值用 `color-mix` 从色板本身计算，保持层级。

不注入 iframe、不替换根节点、不读取其他插件的页面内容。移除插件后所有样式随 `<style>` 标签一起消失。

设置导航的齿轮是 Host 的兜底图标：DSH 0.2.x 按栏目 id 硬编码图标，`settings.section` 还没有 icon 字段。插件给栏目标记后，用 CSS 掩码画一个调色盘；Host 以后支持 icon 时可以直接删掉这段兜底。插件列表里的图标则来自 `package.json` 的 `icon` 字段。

## 语言

- `en` / `zh`：完整页面文案。
- `zh-TW`、`ja`、`ko`、`fr`、`de`、`es`、`pt`、`pt-BR`、`ru`、`it`、`nl`、`pl`、`tr`、`ar`、`hi`、`id`、`vi`、`th`、`sv`、`da`、`fi`、`nb`、`cs`、`el`、`he`、`ro`、`hu`、`bg`、`sk`、`hr`、`sr`、`uk`、`ms`、`fil`：栏目名与插件列表标题；其余文案按 DSH fallback 走英文。
- 语言来自 DSH 的 `locale` 服务，不使用浏览器语言猜测。

## 开发

```sh
node scripts/build.mjs          # src/*.js → client.js
node scripts/check.mjs          # 离线检查：插件契约、locale、样式生成、主题解析、JSONC 导入
node scripts/render-check.mjs   # 用真实 React 渲染设置页（需要 .tmp-render/react）
```

源码在 `src/`，按职责拆分；`client.js` 是构建产物，也是 DSH 实际加载的文件。不引入打包器、不引入运行时依赖。

## 隐私

- 所有设置、命名主题、导入结果存 `localStorage`，不出本机；
- 不读取图片，不上传文件，不统计；
- 唯一的网络请求是查询 npm 上的最新版本号，失败即静默。

## 已知限制

- 浅色 token 覆盖集中在 alias/specific 层；代码块、菜单、滚动条等仍可能保留部分原生浅色值。
- 旧主题只有深色色板，浅色不会自动生成；需要在配色页补一张浅色色板。
- 「我的主题」存本机 `localStorage`，不跨设备同步。
- 主题文件里的注释只在本插件导入时剥离；如果交给其他只接受严格 JSON 的工具，请先删除底部注释。

## 许可证

MIT。图标为原创调色盘 SVG，随本项目以 MIT 分发。
