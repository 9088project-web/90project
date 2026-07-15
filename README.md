# 九零食刻 90 PROJECT 最终静态网站

这是以 `90project_final_design.zip` 为主整理出来的最终黑金品牌网站版本。网站可以本地打开测试，也可以部署到 Vercel；Supabase 属于可选云端同步层，未连接时会自动使用浏览器本地记录。

## 本地查看

直接打开：

```text
C:\Users\manma\Desktop\90project\index.html
```

或在项目目录启动本地静态服务：

```bash
npm run dev
```

然后打开：

```text
http://127.0.0.1:3040/
```

当前也可以使用已开启的本地预览：

```text
http://127.0.0.1:3040/
```

构建静态发布文件：

```bash
npm run build
```

构建后会输出到 `public/`，Vercel 会按照 `vercel.json` 使用这个目录发布，避免误判成旧 Next.js 项目。

## 最终结构

```text
index.html
css/style.css
js/app.js
assets/images/logo/
assets/images/brand/
assets/images/meal/
assets/images/event/
ads/media/
archive/
supabase/schema.sql
README.md
```

`archive/` 只保留旧静态版、旧 Next.js 版本和备份文件，正式网站入口只看根目录的 `index.html`、`css/style.css`、`js/app.js`。

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
- `assets/images/event/styling-backdrop.webp` / `.avif`
- `assets/images/event/styling-floral-table.webp` / `.avif`
- `assets/images/event/catering-display-case.webp` / `.avif`
- `assets/images/event/styling-photo-lounge.webp` / `.avif`
- `assets/images/event/mocktail-bar-case.webp` / `.avif`
- `assets/images/event/table-menu-detail.webp` / `.avif`

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
- 动态活动布置案例展示
- FAQ
- Footer CTA

## 视频投放素材

已新增首页视频展示区与一套 15 秒竖版广告投放稿：

- 首页 `#video-spot`：客户进入网站时可看到你的品牌短视频展示位。
- `ads/video-ad-15s.html`：9:16 本地预览稿，可用于手机广告画面确认或屏幕录制。
- `ads/video-ad-brief.md`：投放目标、15 秒脚本、广告文案、Headline 和受众建议。
- `ads/DESIGN.md`：视频广告黑金视觉规范。
- `ads/media/your-video.mp4`：预留给自拍视频的位置；放入这个文件名后，首页视频区会自动载入。

后台 `?admin=1` 的「媒体案例」也可以改视频标题、说明、视频路径和海报图。

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

- 全站主要文案设定
- SEO 标题与描述
- 首页 Hero、导航、服务卡、包伙食配套、推荐奖励、外餐、活动布置、FAQ、最终 CTA
- WhatsApp 下单表单字段、提示文字和配套选项
- 每周菜单示例
- 每周菜单说明
- 自由加购 Add-ons
- 加购价格说明
- 外餐自由搭配菜单分类、每人价格、菜式列表和最低预算
- 活动布置案例图片、标题、说明
- 首页视频投放区标题、说明、视频路径和海报图
- 推荐奖励规则、条款和展示文案
- 中文与英文内容
- 顾客 WhatsApp 询问记录
- 询问状态：new / contacted / quoted / confirmed / completed / cancelled
- 会员与推荐奖励
- 推荐奖励状态：pending / approved / redeemed / cancelled
- WhatsApp 点击与订单提交来源追踪
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
9088project@gmail.com
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
- WhatsApp 转化来源记录

更换电脑或浏览器前，请先导出 JSON；到新环境后再通过 Admin 后台导入。

## Supabase 连接

网站现在支持可选 Supabase 云端同步。没有填写 Supabase 资料时，网站会继续使用本地 `localStorage`；连接后，WhatsApp 表单询问会同步到 Supabase，后台 admin 登录后可以读取云端询问、更新状态，并把每周菜单、Add-ons、媒体案例、会员、推荐奖励与转化来源资料同步到云端。

1. 在 Supabase 新建项目。
2. 打开 Supabase SQL Editor，执行 `supabase/schema.sql`。
3. 到 Supabase Authentication 创建 admin 用户：

```text
9088project@gmail.com
admin123456
```

4. 在 SQL Editor 把该用户设成 admin：

```sql
update public.profiles
set role = 'admin'
where user_id = (
  select id from auth.users where email = '9088project@gmail.com'
);
```

5. 到 Supabase Project Settings > API，复制 Project URL 和 anon public key。
6. 本地测试可以创建被 Git 忽略的 `js/supabase-config.local.json`，填入：

```json
{
  "url": "https://你的项目.supabase.co",
  "anonKey": "你的 anon public key"
}
```

项目地址已经预填在本机的 `js/supabase-config.local.json`。只需补上 Supabase Dashboard > Project Settings > API 中的 `anon public` key；不要使用或提交 `service_role` key。

注意：不要把 `service_role` key 放进网页。前端只可以使用 anon public key。

Vercel 线上版本建议使用 Environment Variables，不要把 key 写进源码：

```text
SUPABASE_URL=你的 Supabase Project URL
SUPABASE_ANON_KEY=你的 anon public key
```

上线时，`api/supabase-config.js` 会从 Vercel 环境变量读取这些资料；没有设置时，网站会继续使用本地模式。

如果线上显示已连接 Supabase 但会员、询问或奖励无法读取，通常是 `supabase/schema.sql` 还没有在 Supabase SQL Editor 执行，或 admin 用户还没在 `profiles` 里设成 `admin`。前端不能用 anon key 自动创建资料表，这是 Supabase 的安全限制。

这次 schema 已包含：

- `profiles.member_tier`
- `profiles.default_area`
- `profiles.default_package`
- `profiles.taste_preference`
- `inquiries.lead_source`
- `conversion_events`

## 图片优化

所有原 JPG 图片已保留，同时生成对应 `.webp` 版本。新增活动案例大图已生成 `.webp` 与 `.avif`，前台默认使用 `.webp` 以提升手机加载速度；原始 PNG 仍保留在 `assets/images/event/` 方便后续重新压缩。

如之后上传新大图，建议同时生成：

```text
xxx.webp
xxx.avif
```

## 备份文件

执行最终整理前已归档：

- `archive/backup-index.html`
- `archive/backup-style.css`
- `archive/backup-app.js`
- `archive/backup-assets-images/`
- `archive/legacy-static-90-project-website/`
- `archive/legacy-next/`

## GitHub 上传

确认本地版本后，可以执行：

```bash
git status
git add index.html css/style.css js/app.js scripts/serve-static-site.mjs package.json package-lock.json vercel.json README.md supabase/schema.sql assets/images/event ads/media/.gitkeep archive
git commit -m "Finalize dynamic static website system"
git push
```
