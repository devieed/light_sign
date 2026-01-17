# 🚀 Quick Reference Guide

## 📋 Project Overview

LED Scrolling Sign is a fully-featured, SEO-optimized, multi-language web application for creating scrolling LED text displays.

## 🗂️ File Structure

```
light_sign/
├── .github/workflows/
│   └── deploy.yml              # GitHub Actions auto-deploy
├── public/
│   ├── CNAME                   # Custom domain: botcode.cc
│   ├── favicon.svg             # Site icon
│   ├── manifest.json           # PWA manifest
│   ├── robots.txt              # SEO: search engine rules
│   └── sitemap.xml             # SEO: complete sitemap
├── src/
│   ├── components/
│   │   └── MarqueeText.vue     # Scrolling text component
│   ├── views/
│   │   ├── Home.vue            # Main page (scrolling sign creator)
│   │   ├── About.vue           # About us page
│   │   ├── Terms.vue           # Terms of service
│   │   └── Privacy.vue         # Privacy policy
│   ├── App.vue                 # Root component (router wrapper)
│   ├── i18n.js                 # 19 language translations
│   ├── router.js               # Vue Router configuration
│   ├── main.js                 # App entry point
│   └── style.css               # Global styles
├── index.html                  # HTML with SEO & Analytics
├── package.json                # Dependencies
├── vite.config.js              # Build configuration
└── README.md                   # Documentation
```

## 🌍 Supported Languages

1. 🇨🇳 Chinese (Simplified) - `zh-CN`
2. 🇭🇰 Chinese (Traditional) - `zh-TW`
3. 🇬🇧 English - `en`
4. 🇯🇵 Japanese - `ja`
5. 🇰🇷 Korean - `ko`
6. 🇪🇸 Spanish - `es`
7. 🇫🇷 French - `fr`
8. 🇩🇪 German - `de`
9. 🇷🇺 Russian - `ru`
10. 🇸🇦 Arabic - `ar`
11. 🇵🇹 Portuguese - `pt`
12. 🇮🇹 Italian - `it`
13. 🇳🇱 Dutch - `nl`
14. 🇵🇱 Polish - `pl`
15. 🇹🇷 Turkish - `tr`
16. 🇻🇳 Vietnamese - `vi`
17. 🇹🇭 Thai - `th`
18. 🇮🇩 Indonesian - `id`
19. 🇮🇳 Hindi - `hi`

## 🔗 URL Patterns

### Language Selection
```
https://botcode.cc/?lang=en
https://botcode.cc/?lang=zh-CN
https://botcode.cc/?lang=ja
... etc
```

### Pages
```
https://botcode.cc/           # Home
https://botcode.cc/about      # About
https://botcode.cc/terms      # Terms
https://botcode.cc/privacy    # Privacy
```

## 🎨 Features

### Core Functionality
- ✅ Scrolling text display
- ✅ Custom text (200 chars max)
- ✅ Text color picker
- ✅ Background color picker
- ✅ Font size (20-300px)
- ✅ Scroll speed (5-60s)
- ✅ Direction (left/right)
- ✅ Bold toggle
- ✅ Auto-save to LocalStorage

### User Experience
- ✅ Welcome modal for first-time visitors
- ✅ Language selector
- ✅ Settings panel (collapsible)
- ✅ Mobile-optimized (landscape)
- ✅ Responsive design
- ✅ Smooth animations

### Technical
- ✅ Vue 3 + Vite
- ✅ Vue Router
- ✅ 19 languages (i18n)
- ✅ Google Analytics (G-RGXXZFTW0F)
- ✅ SEO optimized
- ✅ PWA-ready
- ✅ GitHub Actions CI/CD

## 📊 SEO Features

### Meta Tags
- ✅ Title & Description
- ✅ Keywords
- ✅ Open Graph (Facebook)
- ✅ Twitter Cards
- ✅ Canonical URLs
- ✅ Language alternates (hreflang)

### Files
- ✅ sitemap.xml (with language variants)
- ✅ robots.txt
- ✅ manifest.json (PWA)
- ✅ favicon.svg

### Structured Data
- ✅ Schema.org WebApplication
- ✅ AggregateRating
- ✅ Offers (Free)

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment

### Automatic (GitHub Actions)
1. Push to `main` branch
2. GitHub Actions builds automatically
3. Deploys to GitHub Pages
4. Live at https://botcode.cc

### Manual
```bash
git add .
git commit -m "Your message"
git push origin main
```

## 📈 Analytics

**Google Analytics ID**: G-RGXXZFTW0F

Tracks:
- Page views
- User sessions
- Language preferences
- Page navigation
- Device types

## 🔒 Privacy

- ✅ No user accounts
- ✅ No server-side data storage
- ✅ LocalStorage only
- ✅ Google Analytics (anonymous)
- ✅ GDPR-friendly

## 🎯 Key Code Locations

### Add New Language
File: `src/i18n.js`
1. Add to `languages` object
2. Add complete translation to `translations` object
3. Add hreflang tag in `index.html`
4. Update `sitemap.xml`

### Modify Welcome Message
File: `src/views/Home.vue`
- Look for `showWelcome` and `.welcome-modal`

### Update SEO
File: `index.html`
- Meta tags in `<head>`
- Structured data in `<script type="application/ld+json">`

### Add New Page
1. Create component in `src/views/`
2. Add route in `src/router.js`
3. Update `public/sitemap.xml`

## 🐛 Troubleshooting

### Language not switching
- Check URL parameter: `?lang=xx`
- Clear browser cache
- Check `localStorage` in dev tools

### Settings not saving
- Check browser LocalStorage permissions
- Try different browser
- Check console for errors

### Build fails
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Routing not working
- Ensure Vue Router is installed
- Check `src/router.js` configuration
- Verify GitHub Pages settings

## 📞 Support

- Documentation: See README.md
- Deployment: See DEPLOY.md
- Updates: See UPDATE_SUMMARY.md
- Quick Start: See QUICKSTART.md

## ✅ Checklist for Launch

- [ ] All pages load correctly
- [ ] Language switching works
- [ ] Settings save/load properly
- [ ] Mobile display perfect
- [ ] Google Analytics tracking
- [ ] Domain configured (botcode.cc)
- [ ] HTTPS enabled
- [ ] Sitemap submitted to search engines
- [ ] All links work
- [ ] No console errors

## 🎉 You're Ready!

Everything is configured and optimized. Just push to GitHub and enjoy your multi-language, SEO-optimized LED Scrolling Sign! 🚀

