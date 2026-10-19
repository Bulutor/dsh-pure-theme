# 发布与上架

这个包已经按 dsh-market 的收录要求准备好，剩下的是「用你自己的账号发布」这一步。

## 0. 发布前需要你替换的东西

| 位置 | 现在 | 改成 |
|---|---|---|
| `package.json` → `repository.url` | `https://github.com/Bulutor/dsh-pure-theme` | 你的 GitHub 仓库地址 |
| `package.json` → `author` | `dsh-pure-theme contributors` | 你的名字或组织 |
| `README.md` 徽章链接 | 同上 | 同上 |

## 1. 发到 npm

```sh
cd dsh-pure-theme
node scripts/build.mjs      # 生成 client.js
node scripts/check.mjs      # 离线自检必须全绿
npm pack --dry-run          # 看一眼实际打包内容
npm publish --access public
```

`files` 字段已经列全：`client.js`、`index.js`、`cordis.patch.yml`、`icon.svg`、`locale/*.json`、`src/`、`scripts/`、`docs/`、`examples/`。

## 2. 进 dsh-market

dsh-market 的目录**不是**按 npm 关键词抓的，而是读 [awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) 的 `data/plugins/*.yml`。所以需要开一个 PR，新增**一个文件**：

`data/plugins/<你的GitHub用户名>__dsh-pure-theme.yml`

```yaml
url: https://github.com/<你>/dsh-pure-theme
name: <你>/dsh-pure-theme
category: theme
description:
  en: Minimalist theming for DeepSeek Harness — edit component colours, save named themes, and import theme files from one quiet settings page.
  zh: 极简换肤：在设置页直接编辑 Harness 各组件颜色、保存命名主题、导入主题文件。
```

对方的硬性要求，本仓库已全部满足：

- [x] `package.json` 声明 `dsh.bundle`（只声明 `dsh.client` 会被拒，这是最常见的驳回原因）
- [x] 根目录有 `cordis.patch.yml`
- [x] 有真实可用的代码，不是占位仓库
- [ ] 仓库创建满 1 天（提交 PR 前确认）
- [ ] 仓库打了 `dsh-plugin` topic
- [x] 描述只陈述功能，不夸大

合并后市场目录通常一天内更新，用户在「插件市场」里搜索 `dsh-pure-theme` 即可一键安装。

## 3. 发新版本（更新提醒依赖它）

1. 修改 `package.json` 的 `version`；
2. 同步修改 `src/10-core.js` 里的 `VERSION`（`scripts/check.mjs` 会校验两者一致）；
3. 在 `CHANGELOG.md` 加一节；
4. `node scripts/build.mjs && node scripts/check.mjs`；
5. `npm publish`。

用户侧的提醒链路：插件在打开「极简主题」页面时请求 `https://registry.npmjs.org/dsh-pure-theme/latest`，比对本地 `VERSION`，发现更高版本就在页面顶部显示「有新版本 vX.Y.Z」。dsh-market 自己的更新检查也会读到新版本并给出升级按钮。

## 4. 发布检查清单

- [ ] `node scripts/build.mjs` 无报错，`client.js` 已更新
- [ ] `node scripts/check.mjs` 全绿（插件契约 / 样式生成 / 主题解析 / 对比度 / 版本号）
- [ ] `npm pack --dry-run` 里包含 `icon.svg` 与 `locale/zh.json`
- [ ] `icon.svg` 在浏览器里能正常显示（256×256，上衣图形）
- [ ] README 的安装命令与实际包名一致
- [ ] 版本号三处一致：`package.json`、`src/10-core.js`、`CHANGELOG.md`
