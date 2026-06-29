# 九零食刻 90 PROJECT 最终静态网站

这是以 `90project_final_design.zip` 为主整理出来的最终黑金品牌网站版本。网站可以本地打开测试，也可以部署到 Vercel；Supabase 属于可选云端同步层，未连接时会自动使用浏览器本地记录。

## 本地查看

直接打开：

```text
C:\Users\manma\Desktop\90project\index.html
```

或在项目目录启动本地静态服务：

```bash
python -m http.server 8080
```

然后打开：

```text
http://127.0.0.1:8080/
```

当前也可以使用已开启的本地预览：

```text
http://127.0.0.1:3040/
```

## 最终结构

```text
index.html
css/style.css
js/app.js
assets/images/logo/
assets/images/brand/
assets/images/meal/
assets/images/event/
README.md
```

## 已使用图片

Logo:

- `assets/images/logo/logo-full-dark.jpg`
- `assets/images/logo/logo-full-light.jpg`
- `assets/images/logo/logo-icon-dark.jpg`
- `assets/images/logo/logo-icon-light.jpg`
- `assets/images/logo/logo-sticker.jpg`
- `assets/images/logo/logo-watermark-light.jpg`

Brand:

- `assets/images/brand/hero-banquet.jpg`
- `assets/images/brand/reference-approved-layout.jpg`

Meal:

- `assets/images/meal/meal-standard.jpg`
- `assets/images/meal/meal-rich.jpg`
- `assets/images/meal/meal-family.jpg`

Event:

- `assets/images/event/catering-event.jpg`
- `assets/images/event/catering-setup.jpg`
- `assets/images/event/styling-bar.jpg`

## 页面模块

- 黑金 Hero：首页、品牌文案、右侧氛围图
- 中文 / English 语言切换
- 四个服务卡片：餐饮、包伙食、活动策划、布置设计
- 三个包伙食配套卡
- 每周菜单
- 自由加购 Add-ons
- 本地 Admin 后台，可修改每周菜单与自由加购
- 本地 Admin 后台，可查看顾客询问与修改状态
- WhatsApp 下单系统
- 本地会员系统
- 会员推荐奖励
- SEO / Open Graph 分享资料
- `robots.txt`、`sitemap.xml`、`site.webmanifest` 与 favicon
- WebP 图片优化，JPG 自动后备
- 外餐 Catering
- 外餐自由搭配菜单与初步价格计算器
- 活动布置 Styling
- FAQ
- Footer CTA

## 视频投放素材

已新增一套 15 秒竖版广告投放稿：

- `ads/video-ad-15s.html`：9:16 本地预览稿，可用于手机广告画面确认或屏幕录制。
- `ads/video-ad-brief.md`：投放目标、15 秒脚本、广告文案、Headline 和受众建议。
- `ads/DESIGN.md`：视频广告黑金视觉规范。
- `ads/media/your-video.mp4`：预留给自拍视频的位置；放入这个文件名后，广告预览会自动载入。

本地查看：

```text
http://127.0.0.1:3040/ads/video-ad-15s.html
```

## WhatsApp 下单

按钮会打开：

```text
https://wa.me/601110977166?text=编码后的订单内容
```

JavaScript 使用 `encodeURIComponent` 处理中文内容。

提交后会自动生成 WhatsApp 询问内容，并保存到本机浏览器的本地记录，Admin 可以在隐藏后台查看。

## 中英双语

网站顶部已加入 `中文 / EN` 切换按钮。语言选择会保存在浏览器本地，刷新后会保留上次选择。

已支持双语切换：

- 首页导航
- Hero 文案
- 服务与配套
- 推荐奖励
- 每周菜单
- WhatsApp 下单表单
- 包装 / 外餐 / 活动布置
- FAQ
- 会员中心
- WhatsApp 询问内容

## 会员与推荐奖励

会员系统现在是「本地可用 + Supabase cloud-ready」版本。Supabase 还没完成 SQL 设置时，资料会继续保存在浏览器 `localStorage`；Supabase 设置好后，会员注册 / 登录会尝试同步到 Supabase Auth 与 `profiles`，会员询问会同步到 `inquiries`，推荐奖励会写入 `referral_rewards` 供 admin 审核。

已加入：

- 会员注册 / 登录
- 会员中心
- 会员推荐码
- WhatsApp 分享推荐码
- 朋友下单填写推荐码
- 推荐人可记录 RM20 下次服务抵扣
- 推荐人可记录直接推荐 1% 与上级推荐链多层待确认回馈
- 会员可查看本机订单询问与推荐奖励记录
- Supabase 设置完成后，会员可读取云端自己的询问与奖励记录

推荐奖励开放多层记录，但仍需以管理员审核、付款记录与 WhatsApp 确认为准；真实上线后建议改成后端数据库和管理员审核结算。

## 本地 Admin 后台

当前已加入本地离线 Admin 后台，可修改：

- 每周菜单示例
- 每周菜单说明
- 自由加购 Add-ons
- 加购价格说明
- 中文与英文内容
- 顾客 WhatsApp 询问记录
- 询问状态：new / contacted / quoted / confirmed / completed / cancelled
- 会员与推荐奖励
- 推荐奖励状态：pending / approved / redeemed / cancelled
- 本地资料 JSON 导出 / 导入

后台不会显示在主页顶部。管理员使用隐藏入口进入：

```text
http://127.0.0.1:3040/?admin=1
```

或：

```text
http://127.0.0.1:3040/#admin-login
```

本地测试管理员账号：

```text
admin@90project.local
```

本地测试密码：

```text
admin123456
```

保存后的内容会储存在浏览器 `localStorage`，刷新页面仍会保留。这个版本适合 offline 测试；真实上线后建议改成数据库后台和正式管理员登录。

后台登录已加入本地哈希比对和错误次数短暂锁定，避免密码直接明文出现在脚本里。不过静态网站无法做到真正安全的管理员权限；正式上线前仍建议迁移到后端数据库和后端登录验证。

## 本地数据备份

Admin 后台可以导出 JSON，本地保存以下资料：

- 首页可编辑内容
- 顾客询问记录
- 本地会员资料与推荐奖励记录

更换电脑或浏览器前，请先导出 JSON；到新环境后再通过 Admin 后台导入。

## Supabase 连接

网站现在支持可选 Supabase 云端同步。没有填写 Supabase 资料时，网站会继续使用本地 `localStorage`；连接后，WhatsApp 表单询问会同步到 Supabase，后台 admin 登录后可以读取云端询问、更新状态，并把每周菜单、Add-ons、会员与推荐奖励资料同步到云端。

1. 在 Supabase 新建项目。
2. 打开 Supabase SQL Editor，执行 `supabase/schema.sql`。
3. 到 Supabase Authentication 创建 admin 用户：

```text
admin@90project.local
admin123456
```

4. 在 SQL Editor 把该用户设成 admin：

```sql
update public.profiles
set role = 'admin'
where user_id = (
  select id from auth.users where email = 'admin@90project.local'
);
```

5. 到 Supabase Project Settings > API，复制 Project URL 和 anon public key。
6. 本地测试可以打开 `js/supabase-config.json`，填入：

```json
{
  "url": "https://你的项目.supabase.co",
  "anonKey": "你的 anon public key"
}
```

注意：不要把 `service_role` key 放进网页。前端只可以使用 anon public key。

Vercel 线上版本建议使用 Environment Variables，不要把 key 写进源码：

```text
SUPABASE_URL=你的 Supabase Project URL
SUPABASE_ANON_KEY=你的 anon public key
```

上线时，`api/supabase-config.js` 会从 Vercel 环境变量读取这些资料；没有设置时，网站会继续使用本地模式。

如果线上显示已连接 Supabase 但会员、询问或奖励无法读取，通常是 `supabase/schema.sql` 还没有在 Supabase SQL Editor 执行，或 admin 用户还没在 `profiles` 里设成 `admin`。前端不能用 anon key 自动创建资料表，这是 Supabase 的安全限制。

## 图片优化

所有原 JPG 图片已保留，同时生成对应 `.webp` 版本。首页会优先加载 WebP，浏览器不支持时自动使用 JPG 后备。

## 备份文件

执行最终整理前已备份：

- `backup-index.html`
- `backup-style.css`
- `backup-app.js`
- `backup-assets-images/`

## GitHub 上传

确认本地版本后，可以执行：

```bash
git status
git add index.html css/style.css js/app.js js/supabase-config.json api/supabase-config.js robots.txt sitemap.xml site.webmanifest README.md supabase/schema.sql
git commit -m "Connect Supabase and polish order flow"
git push
```
