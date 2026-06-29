# 九零食刻 90 PROJECT 最终静态网站

这是以 `90project_final_design.zip` 为主整理出来的最终 offline 本地版本。当前没有上传 GitHub，没有部署，也没有连接任何云端服务。

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
- `assets/images/brand/packaging-full.jpg`
- `assets/images/brand/packaging-kit.jpg`
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
- WhatsApp 下单预览
- 本地会员系统
- 会员推荐奖励
- SEO / Open Graph 分享资料
- WebP 图片优化，JPG 自动后备
- 品牌级餐饮包装
- 外餐 Catering
- 活动布置 Styling
- FAQ
- Footer CTA

## WhatsApp 下单

按钮会打开：

```text
https://wa.me/601110977166?text=编码后的订单内容
```

JavaScript 使用 `encodeURIComponent` 处理中文内容。

表单下方会即时显示 WhatsApp 信息预览，方便发送前检查姓名、电话、配套、人数、配送区域、加购和备注。提交后，该笔询问也会保存到本机浏览器的本地记录，Admin 可以在隐藏后台查看。

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

## 本地会员与推荐奖励

当前会员系统是 offline 本地测试版，资料保存在浏览器 `localStorage`，没有连接云端数据库。

已加入：

- 会员注册 / 登录
- 会员中心
- 会员推荐码
- WhatsApp 分享推荐码
- 朋友下单填写推荐码
- 推荐人可记录 RM20 下次服务抵扣
- 推荐人可记录直接推荐消费额 1% 待确认回馈
- 会员可查看本机订单询问与推荐奖励记录

推荐奖励只按直接推荐计算，不做层级累计；真实上线后建议改成后端数据库和管理员审核结算。

## 本地 Admin 后台

当前已加入本地离线 Admin 后台，可修改：

- 每周菜单示例
- 每周菜单说明
- 自由加购 Add-ons
- 加购价格说明
- 中文与英文内容
- 顾客 WhatsApp 询问记录
- 询问状态：new / contacted / quoted / confirmed / completed / cancelled
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

## 图片优化

所有原 JPG 图片已保留，同时生成对应 `.webp` 版本。首页会优先加载 WebP，浏览器不支持时自动使用 JPG 后备。

## 备份文件

执行最终整理前已备份：

- `backup-index.html`
- `backup-style.css`
- `backup-app.js`
- `backup-assets-images/`

## GitHub 上传

现在先不要上传。确认本地版本后，可以再执行：

```bash
git status
git add index.html css/style.css js/app.js assets/images README.md backup-index.html backup-style.css backup-app.js
git commit -m "Finalize 90 PROJECT website"
git push
```
