# ChizNG Portfolio - React Migration

## 🎉 Chào mừng đã migrate sang React!

Dự án portfolio của bạn đang được chuyển đổi từ vanilla HTML/CSS/JS sang React + Vite. Tài liệu này sẽ hướng dẫn bạn hoàn thành migration và deploy.

## 📁 Cấu trúc dự án

```
ChizNG/
├── public/
│   ├── assets/
│   │   ├── cherryblossom-cursor.svg
│   │   └── cyrene.png
│   ├── Cyrene_ video.mp4        # TODO: Upload to cloud
│   ├── Cyrene-audio.m4a         # TODO: Upload to cloud
│   └── CLOUD_ASSETS_README.md   # Hướng dẫn upload
├── src/
│   ├── components/
│   │   ├── Navigation.jsx       ✅ Hoàn thành
│   │   ├── Navigation.css
│   │   ├── MusicPlayer.jsx      ✅ Hoàn thành
│   │   └── MusicPlayer.css
│   ├── hooks/
│   │   ├── useSakuraCursor.js   ✅ Hoàn thành
│   │   ├── useSakuraSnow.js     ✅ Hoàn thành
│   │   ├── useViewCounter.js    ✅ Hoàn thành
│   │   └── useMusicPlayer.js    ✅ Hoàn thành
│   ├── pages/
│   │   ├── SplashPage.jsx       ✅ Hoàn thành
│   │   ├── SplashPage.css
│   │   ├── HomePage.jsx         🚧 Cần hoàn thiện
│   │   ├── HomePage.css
│   │   ├── ProjectsPage.jsx     🚧 Cần hoàn thiện
│   │   ├── ProjectsPage.css
│   │   ├── GalleryPage.jsx      🚧 Cần hoàn thiện
│   │   └── GalleryPage.css
│   ├── config/
│   │   └── mediaUrls.js         ✅ Hoàn thành
│   ├── App.jsx                  ✅ Hoàn thành
│   ├── main.jsx                 ✅ Hoàn thành
│   └── index.css                🚧 Cần copy styles
├── api/                         ⚠️ Cần tạo
│   ├── views.js                 # Vercel serverless
│   └── spotify.js               # Vercel serverless
├── package.json                 ✅ Hoàn thành
├── vite.config.js               ✅ Hoàn thành
├── index.html                   ✅ Hoàn thành
├── index.old.html               📦 Backup file gốc
├── MIGRATION_GUIDE.md           ✅ Hoàn thành
└── README.md                    📖 Bạn đang đọc

Các file gốc (giữ để tham khảo):
├── home.html
├── projects.html
├── gallery.html
├── script.js
├── character-popup.js
├── gallery.js
├── gallery-data.js
└── index.css (original)
```

## 🚀 Bắt đầu

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Chạy development server

```bash
npm run dev
```

Website sẽ chạy tại: http://localhost:3000

### 3. Build cho production

```bash
npm run build
```

Output trong folder `dist/`

## ✅ Đã hoàn thành

- ✅ Setup React + Vite project
- ✅ React Router configuration
- ✅ SplashPage component với video/audio background
- ✅ Navigation component
- ✅ MusicPlayer component với visualizer
- ✅ Sakura cursor effect hook
- ✅ Sakura snow effect hook
- ✅ View counter hook
- ✅ Music player hook
- ✅ Media URLs configuration

## 🚧 Cần hoàn thành

### 1. **Hoàn thiện HomePage.jsx**
- [ ] Implement HSREnkaAPI integration (convert từ class sang custom hook)
- [ ] Spotify Now Playing widget
- [ ] Character Popup component
- [ ] Language Switcher (EN/VI/JA)
- [ ] Dynamic clock greeting
- [ ] Contact cards với full styling
- [ ] Copy toàn bộ CSS từ `index.css` vào `HomePage.css`

### 2. **Hoàn thiện ProjectsPage.jsx**
- [ ] Certificate cards với data
- [ ] Project cards với data
- [ ] Copy styles từ `index.css` vào `ProjectsPage.css`

### 3. **Hoàn thiện GalleryPage.jsx**
- [ ] Import full gallery data từ `gallery-data.js`
- [ ] Implement auto-rotate logic
- [ ] Pause on hover functionality
- [ ] Scroll control
- [ ] Copy styles từ `gallery.css` vào `GalleryPage.css`

### 4. **Tạo API Routes (Vercel Serverless)**

**api/views.js:**
```javascript
// View counter API
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  const { method } = req;
  const scope = req.query.scope || 'site';
  const key = `views:${scope}`;

  if (method === 'POST') {
    const count = await redis.incr(key);
    return res.json({ total: count });
  }

  const count = await redis.get(key) || 0;
  return res.json({ total: count });
}
```

**api/spotify.js:**
```javascript
// Spotify Now Playing API
// TODO: Add implementation
```

### 5. **Upload Video/Audio lên Cloud**

**Khuyến nghị: Cloudflare R2 (Free 10GB)**

```bash
# 1. Tạo account tại https://dash.cloudflare.com
# 2. Tạo R2 bucket
# 3. Upload Cyrene_ video.mp4 và Cyrene-audio.m4a
# 4. Enable public access
# 5. Copy URLs
```

Sau khi upload, cập nhật `src/config/mediaUrls.js`:

```javascript
export const MEDIA_URLS = {
  splashVideo: 'https://pub-xxxxx.r2.dev/cyrene-video.mp4',
  splashAudio: 'https://pub-xxxxx.r2.dev/cyrene-audio.m4a',
  // ...
};
```

### 6. **Copy CSS Styles**

Hiện tại các CSS file trong `src/` chỉ là template. Bạn cần:

1. Mở `index.css` (file gốc)
2. Copy các styles liên quan vào:
   - `src/index.css` (global styles)
   - `src/pages/HomePage.css`
   - `src/pages/ProjectsPage.css`
3. Copy `gallery.css` vào `src/pages/GalleryPage.css`

## 📦 Deploy

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables (Vercel)

Thêm trong Vercel dashboard:

```env
UPSTASH_REDIS_REST_URL=your_url
UPSTASH_REDIS_REST_TOKEN=your_token
SPOTIFY_CLIENT_ID=your_id
SPOTIFY_CLIENT_SECRET=your_secret
SPOTIFY_REFRESH_TOKEN=your_token
```

### Netlify

```bash
npm run build
# Deploy /dist folder
```

## 🎨 Giữ nguyên tất cả hiệu ứng

✅ Các hiệu ứng sau đã được migrate:
- Sakura cursor trail
- Sakura snow effect
- Music visualizer
- Gradient animations
- Smooth scrolling
- Card animations

⚠️ Cần kiểm tra:
- Character popup animations
- Gallery auto-rotate
- HSR widget loading animations

## 📚 Tài liệu tham khảo

- Xem `MIGRATION_GUIDE.md` để biết chi tiết migration
- Xem `public/CLOUD_ASSETS_README.md` để biết cách upload media
- Files gốc vẫn còn trong project để tham khảo

## 🆘 Hỗ trợ

Nếu gặp lỗi:
1. Check console trong browser dev tools
2. Check terminal output khi chạy `npm run dev`
3. Tham khảo file gốc tương ứng

## 📝 Checklist cuối cùng

- [ ] Chạy `npm install`
- [ ] Test SplashPage
- [ ] Hoàn thiện HomePage
- [ ] Hoàn thiện ProjectsPage
- [ ] Hoàn thiện GalleryPage
- [ ] Upload video/audio lên cloud
- [ ] Cập nhật mediaUrls.js
- [ ] Tạo API routes
- [ ] Setup environment variables
- [ ] Test toàn bộ trên local
- [ ] Deploy lên Vercel
- [ ] Test trên production

## 🎯 Next Steps

1. **Ngay bây giờ**: Chạy `npm install` và `npm run dev`
2. **Sau đó**: Hoàn thiện các page components
3. **Cuối cùng**: Upload media lên cloud và deploy

Good luck! 🚀
