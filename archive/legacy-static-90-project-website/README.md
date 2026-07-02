# 九零食刻 90 PROJECT Website

Static landing page for 九零食刻 90 PROJECT, focused on converting visitors into WhatsApp leads for food, catering, event styling, and drink services.

## Structure

```text
90-project-website/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   ├── hero.jpg
│   ├── food-1.jpg
│   ├── event-1.jpg
│   ├── catering-1.jpg
│   ├── styling-1.jpg
│   └── drink-1.jpg
└── README.md
```

## Local Preview

Open `index.html` directly in a browser, or serve the folder with any static server.

Example:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Deployment

This site has no backend and no build step.

### Netlify

1. Create a new site from this folder or drag the `90-project-website` folder into Netlify.
2. Build command: leave empty.
3. Publish directory: `/` if uploading this folder directly, or `90-project-website` if deploying from the parent folder.

### Vercel

1. Import the repository or folder.
2. Framework preset: Other.
3. Build command: leave empty.
4. Output directory: `90-project-website` if deploying from the parent folder.

### GitHub Pages

1. Commit the `90-project-website` folder.
2. In repository settings, enable Pages.
3. Choose the branch and folder that contains `index.html`.

### Cloudflare Pages

1. Create a Pages project.
2. Build command: leave empty.
3. Build output directory: `90-project-website` if deploying from the parent folder.

## Images

The current JPG files are local placeholders because the original `index-2.html` file and embedded base64 hero image were not available in the workspace. Replace files in `images/` with real service photos using the same filenames to keep the page working.

Recommended image sizes:

- `hero.jpg`: portrait or food/event hero image, at least 1200 x 1500.
- Gallery images: at least 1200 x 900.

## WhatsApp Lead Link

All WhatsApp CTAs use:

```text
https://wa.me/601110977166
```

JavaScript adds this prefilled message:

```text
你好，我想询问 90 PROJECT 的餐饮/活动服务。日期： 人数： 地点： 服务需求：
```

## Changelog

- Refactored the site into static HTML, CSS, JavaScript, and image folders.
- Added a mobile-first premium black, gold, cream, and warm food-service visual style.
- Added sticky header, hamburger navigation, smooth scrolling, floating WhatsApp button, and repeated quote CTAs.
- Added SEO title, description, keywords, Open Graph tags, and structured data.
- Added services, pricing, trust badges, gallery, inquiry process, FAQ, final CTA, and footer.
- Added accessible alt text for all images and semantic HTML5 section structure.

## License

AGPL-3.0 for the open-source community edition.
