# 90 PROJECT 测试报告

## 基线测试

执行日期：2026-07-13

- `npm run test:growth`: 4 passed, 0 failed。
- `npm run build`: passed。
- `node --check js/app.js`: passed。
- `node --check js/redesign-effects.js`: passed。
- `git diff --check`: passed；仅有 Windows 换行提示。

## 已覆盖的增长逻辑

- 推荐官审核与直接推荐关系绑定。
- 完成订单后的推荐佣金和积分。
- 观察期释放、退款反转佣金和积分。
- 提现审核、最低金额和重复开放申请限制。

## 待覆盖

- 首页四项服务切换。
- 自定义菜单数量限制与确认摘要。
- 包伙食跨月、周末、公共假期和自定义不配送日。
- 会员中英切换完整性。
- 后台内容保存、导出、导入和图片失败状态。
- 360px、390px、430px、768px、1366px、1920px 视觉回归。

## 2026-07-13 Homepage Commercial Demo Verification

- `node --check js/home-experience.js`: passed.
- `node --check js/app.js`: passed.
- `npm run test:growth`: 4 passed, 0 failed.
- `npm run build`: passed.
- `git diff --check`: passed with Windows line-ending warnings only.
- Playwright mobile snapshot confirmed the new Hero service switcher appears and has no blank Hero state.
- Playwright desktop snapshot confirmed the new Hero stage, service tabs and brand story section render.
- Playwright English snapshot confirmed the new Hero copy, weekly menu and service showcase update in English.
- Screenshots:
  - `output/playwright/commercial-home-mobile-final.png`
  - `output/playwright/commercial-home-cli-desktop.png`
  - `output/playwright/commercial-home-cli-english.png`

Remaining visual QA:

- 360px, 430px, 768px and 1920px screenshot passes.
- Lighthouse performance, accessibility, SEO and best-practice scores.
- Full inquiry flow and admin content save/import/export regression.
