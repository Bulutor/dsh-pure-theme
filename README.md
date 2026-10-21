# dsh-pure-theme

> DeepSeek Harness 的主题：**在设置里直接改各组件颜色、保存命名主题、导入主题文件。**
> Theming for DeepSeek Harness: edit component colours, save named themes, import theme files.

为从其他编程 Agent 转到 DeepSeek Harness 的人而做。换肤不应该逼着人去翻 CSS 变量，也不应该把界面塞满。

[![npm](https://img.shields.io/npm/v/dsh-pure-theme)](https://www.npmjs.com/package/dsh-pure-theme)
[![license](https://img.shields.io/npm/l/dsh-pure-theme)](LICENSE)

## 它长什么样

安装后，设置面板左侧会出现一个与「通用设置」同级的一级栏目：

> **设置 → 主题**（English: **Settings → Theme**）

右侧内容区只有两个模块，上下排列：

1. **主题库**：从其他 Agent 的预设开始、应用「我的主题」、导入主题文件并命名保存；
2. **配色**：在色块上直接取色，实时修改 Harness 各组件颜色，并带一个 DSH 小预览。

栏目名与插件列表标题跟随 **DeepSeek Harness 当前语言**。内置完整中文/英文文案；日语、韩语、法语、德语、西班牙语、葡萄牙语、俄语、阿拉伯语、印地语等 30+ 语言的栏目名/标题已预置，其余文案按 DSH 的 locale fallback 走英文，等 DSH 增加对应语言包后会自动使用。

## 两个模块

### 1. 主题库

- **Agent 配色**：Agent 下拉 + 该 Agent 的主题 chips，点一下整套应用；来源与可信度收在 chips 的悬停提示里。
- **我的主题**：保存过的命名主题，支持应用、导出、删除；最多保留 50 个。
- **导入主题文件**：拖入或选择 `.json` / `.dshtheme` / VS Code 配色主题；识别后先进入草稿区，**先命名，再「保存到我的主题」**（也可以只应用不保存）。颜色只在本机读取。

### 2. 配色

- 10 个语义色块，覆盖 Harness 的主要组件：
  - 表面：侧边栏、画布、输入区、卡片、浮层；
  - 文字与描边：描边、主文字、次文字；
  - 强调：强调色、强调色文字。
- 点色块打开系统取色器，旁边的 hex 输入框可直接粘贴色值；修改**立即应用**到 Harness。
- 内置 DSH 小预览：侧边栏、卡片、按钮、输入框会按当前配色实时变化。
- 显示文字/画布对比度警告；支持恢复 Harness 默认、导出当前主题、下载示例文件。
- 保存时给主题命名，进入「我的主题」。

> 0.2.0 起移除了「炫彩」图片背景模块：它让三栏视觉变重，与主题的目标不符。旧版本保存的图片数据不会迁移，也不再读取。

## 安装

```sh
dsh plugin --profile <profile> add dsh-pure-theme
```

或在 DeepSeek Harness 的插件市场搜索 `dsh-pure-theme`，或从本地目录安装：

```sh
dsh plugin --profile desktop add /path/to/dsh-pure-theme
```

安装/更新客户端 bundle 后刷新页面（Ctrl+R）。卸载即恢复原生外观——插件只写自己的 `<style>` 标签，不改 Host 代码。

## 它怎么工作

DSH 的所有深色表面都从 `--dsw-static-neutral-bluish-*` 灰阶推导，再由 `--dsw-alias-*` 承接。插件只做一件事：

在 `body[data-ds-dark-theme]` 上，把用户选的 10 个语义色映射到对应的 DSH token；文字、描边、强调色在 alias 层覆盖。

不注入 iframe、不替换根节点、不读取其他插件的页面内容。移除插件后所有样式随 `<style>` 标签一起消失。

设置导航的齿轮是 Host 的兜底图标：DSH 0.2.x 按栏目 id 硬编码图标，`settings.section` 还没有 icon 字段。插件给栏目标记后，用 CSS 掩码画一个调色盘；Host 以后支持 icon 时可以直接删掉这段兜底。插件列表里的图标则来自 `package.json` 的 `icon` 字段。

## 主题文件

```json
{
  "name": "My theme",
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

- 也接受 VS Code 主题（`{ "colors": { "sideBar.background": "...", "editor.background": "..." } }`），插件按颜色键自动迁移。
- 可选 `tokens` 字段可直接覆盖任意 `--dsw-*` token。
- 格式详见 [docs/theme-format.md](docs/theme-format.md)，迁移方法见 [docs/migration.md](docs/migration.md)。

## 语言

- `en` / `zh`：完整页面文案。
- `zh-TW`、`ja`、`ko`、`fr`、`de`、`es`、`pt`、`pt-BR`、`ru`、`it`、`nl`、`pl`、`tr`、`ar`、`hi`、`id`、`vi`、`th`、`sv`、`da`、`fi`、`nb`、`cs`、`el`、`he`、`ro`、`hu`、`bg`、`sk`、`hr`、`sr`、`uk`、`ms`、`fil`：栏目名与插件列表标题；其余文案按 DSH fallback 走英文。
- 语言来自 DSH 的 `locale` 服务，不使用浏览器语言猜测。

## 开发

```sh
node scripts/build.mjs   # src/*.js → client.js
node scripts/check.mjs   # 离线检查：插件契约、locale、样式生成、主题解析
node scripts/render-check.mjs  # 用真实 React 渲染设置页（需要 .tmp-render/react）
```

源码在 `src/`，按职责拆分；`client.js` 是构建产物，也是 DSH 实际加载的文件。不引入打包器、不引入运行时依赖。

## 隐私

- 所有设置、命名主题、导入结果存 `localStorage`，不出本机；
- 不读取图片，不上传文件，不统计；
- 唯一的网络请求是查询 npm 上的最新版本号，失败即静默。

## 许可证

MIT。图标为原创调色盘 SVG，随本项目以 MIT 分发。
