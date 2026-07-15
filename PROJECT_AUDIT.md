# 90 PROJECT 项目审查报告

审查日期：2026-07-13
当前分支：`codex/90project-commercial-upgrade`

## 1. 当前技术架构

- 静态 HTML 多页面站点，入口为 `index.html`、`catering.html`、`cocktail.html`、`styling.html`、`admin.html`、`member.html`、`referral.html`、`rewards.html`。
- 样式由 `css/style.css`、`css/redesign.css`、`css/detail-pages.css`、`css/admin.css`、`css/growth.css` 组成。
- 主要业务逻辑集中在 `js/app.js`，增长系统逻辑位于 `js/growth-domain.mjs` 与 `js/growth-mock.js`。
- 当前可在本地 Mock 模式运行；Supabase 配置入口已准备，但云端迁移尚未执行。
- 构建由 `scripts/build-static-site.mjs` 复制到 `public/`，本地服务由 `scripts/serve-static-site.mjs` 提供。

## 2. 已有可保留功能

- 首页导航、Hero、服务入口、每周菜单示例与联系表单。
- 包伙食日期计算、工作日餐数计算、套餐选择与 WhatsApp 摘要。
- 外餐自由搭配、套餐预设、人数与服务形式估价。
- 会员注册、登录、个人资料、询问记录和本地保存。
- 后台内容、每周菜单、外餐菜单、案例、视频字段和询问记录管理。
- 中文 / English 切换，以及增长系统的推荐官、会员奖励和佣金 Mock 流程。
- 既有项目图片已包含 Hero、餐饮、场地、鸡尾酒、员工餐、菜单和案例素材。

## 3. 当前问题与风险

- 首页仍以单一 Hero 图为主，服务内容没有形成高端品牌的主体切换体验。
- `video-spot` 目前默认隐藏，视频源仍为占位路径。
- 项目内未找到用户指定的 `129186.mp4`，需要用户提供到 `reference/129186.mp4` 后才可接入。
- 首页视觉需要强化 2.5D 深度、服务切换、案例转场和移动端触摸反馈。
- 后台目前以本地内容管理为主，Supabase 生产迁移和真正的 Storage 上传还未完成。
- 当前 `package.json` 只有增长域单元测试，没有完整 lint/typecheck 脚本；需以现有静态脚本检查和新增关键逻辑测试补足。
- 正式站点尚未在本轮修改中部署，避免把未验收的视觉和数据结构送到生产环境。

## 4. 修改影响评估

- 首页视觉会大幅调整，但保留现有服务入口和锚点，避免破坏既有业务路径。
- 包伙食与外餐计算逻辑优先复用现有函数，不复制第二套价格算法。
- 会员、询问、WhatsApp、后台和语言切换作为兼容边界，不直接删除现有 localStorage 数据键。
- 新增的动画只使用 transform、opacity 和轻量 CSS 视差；移动端减少悬浮和高耗能效果。
- 不使用参考视频中的品牌、Logo、产品、文案、图片或配色；新视觉只使用 90 PROJECT 自有素材或原创布局。

## 5. 推荐实施顺序

1. 首页 Hero 与四项服务切换 Demo。
2. 服务卡片、品牌故事转场和案例展示。
3. 自定义菜单确认页、WhatsApp 摘要和错误状态。
4. 包伙食期限、日历、套餐与配送规则校验。
5. 会员中心、案例 Portfolio、后台内容管理和图片上传边界。
6. 多语言完整性、移动端、性能、SEO 和生产前检查。

## 6. 备份与权限状态

- 已建立独立 Git 分支：`codex/90project-commercial-upgrade`。
- 未执行 GitHub 推送、Vercel 部署、正式域名修改或正式数据库删除。
- Supabase 迁移文件只保留在本地，待登录并完成云端核验后再执行。
