# 90 PROJECT 实施进度

更新时间：2026-07-13

## Phase 1：安全审查

- [x] 识别静态 HTML/CSS/JS 架构
- [x] 盘点首页、详情页、菜单、包伙食、会员、后台和语言功能
- [x] 建立 Git 分支 `codex/90project-commercial-upgrade`
- [x] 运行现有增长测试和静态构建
- [x] 检查 `129186.mp4`，当前项目未找到
- [x] 输出 `PROJECT_AUDIT.md`

## Phase 2：设计系统

- [x] 输出 `DESIGN_SYSTEM.md`
- [ ] 完成首页 Hero 服务切换视觉
- [ ] 完成移动端服务入口与 CTA 规则
- [ ] 完成品牌故事转场视觉

## Phase 3：首页 Demo

- [ ] Hero 餐饮主视觉
- [ ] 四项服务切换
- [ ] 2.5D 深度与鼠标视差
- [ ] 服务卡片交互
- [ ] 品牌故事 / 案例转场
- [ ] 桌面与移动端截图验收

## Phase 4：成交流程

- [ ] 自定义菜单确认页
- [ ] 菜单数量限制与取消选择
- [ ] 参考价格与人工确认提示
- [ ] WhatsApp 摘要预览与备用复制
- [ ] 包伙食日历、工作日和配送规则核验

## Phase 5：会员与后台

- [x] 增长系统本地 Mock 基础
- [ ] 会员中心商业字段完善
- [ ] Portfolio / 案例管理
- [ ] 后台服务、菜单、内容、案例管理整合
- [ ] 图片上传与失败状态

## Phase 6：验收

- [ ] 中文 / English 全页面检查
- [ ] 360px、390px、430px、768px、1366px、1920px 检查
- [ ] 浏览器控制台与网络错误检查
- [ ] build、关键逻辑测试、移动端截图
- [ ] 生产部署清单确认

## 2026-07-13 Checkpoint: Homepage Commercial Demo

- [x] Added homepage Hero service switcher for Meal Plan, Event Catering, Event Styling and Beverage Bar.
- [x] Added service-specific Hero image switching, CTA links, highlights and language-aware copy.
- [x] Added lightweight pointer depth on desktop and reduced mobile treatment.
- [x] Added brand story transition: daily meals to memorable celebrations.
- [x] Added Choose Your Experience section before service cards.
- [x] Connected new homepage module to existing Chinese / English language switch.
- [x] Preserved current service strip, meal plan, weekly menu, contact form, member/admin and growth-system paths.
- [x] Captured verification screenshots:
  - `output/playwright/commercial-home-mobile-final.png`
  - `output/playwright/commercial-home-cli-desktop.png`
  - `output/playwright/commercial-home-cli-english.png`
- [ ] `reference/129186.mp4` is still missing, so the real video module remains pending supplied source footage.
