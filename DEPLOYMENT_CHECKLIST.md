# 90 PROJECT 部署检查清单

## 当前状态

- [x] 未执行本轮 Vercel 部署。
- [x] 未执行本轮 GitHub 推送。
- [x] 正式域名未修改。
- [x] Supabase 迁移未自动执行。
- [ ] 完成新首页和成交流程本地验收。
- [ ] 确认生产环境变量由 Vercel 配置，不写入 Git。
- [ ] 确认 Supabase RLS、Storage 和迁移结果。

## 发布前必须确认

- `SUPABASE_URL` 和 `SUPABASE_ANON_KEY` 已在部署平台环境变量设置。
- 任何 `service_role` 密钥都不出现在前端、Git 或构建产物。
- 图片与视频已压缩并有明确尺寸，Hero 不造成移动端横向溢出。
- WhatsApp 号码、表单摘要和备用复制流程已验证。
- 中英文导航、按钮、服务说明、错误提示和 WhatsApp 内容一致。
- Supabase 迁移已经在目标项目完成并通过读写权限检查。
- 完成桌面、手机、控制台、构建和回滚检查后才允许部署。
