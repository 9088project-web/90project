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
- 四个服务卡片：餐饮、包伙食、活动策划、布置设计
- 三个包伙食配套卡
- 每周菜单
- 自由加购 Add-ons
- WhatsApp 下单系统
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