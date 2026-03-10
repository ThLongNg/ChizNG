# Hướng dẫn upload Video/Audio lên Cloud

## Files cần upload:

### Video
- `Cyrene_ video.mp4` - Video background cho splash page

### Audio  
- `Cyrene-audio.m4a` - Audio background cho splash page
- Các file nhạc trong danh sách songs (hiện đang host trên cdn.glitch.global)

## Khuyến nghị Cloud Hosting:

### 1. Cloudflare R2 (Miễn phí tier 10GB)
- Tạo bucket tại: https://dash.cloudflare.com/
- Upload files
- Enable public access
- Lấy URL dạng: `https://pub-xxxxx.r2.dev/filename.mp4`

### 2. Vercel Blob Storage
- Nếu deploy trên Vercel
- Command: `vercel blob upload file.mp4`

### 3. AWS S3 + CloudFront
- Tốc độ cao nhất
- Có chi phí
- CDN toàn cầu

### 4. GitHub LFS + CDN (jsDelivr)
- Miễn phí
- URL: `https://cdn.jsdelivr.net/gh/username/repo@branch/file.mp4`

## Sau khi upload:
1. Copy URL của các files
2. Thay thế trong `src/config/mediaUrls.js`
3. Test loading speed

## Lưu ý:
- Video nên optimize về 720p để giảm dung lượng
- Audio nên compress ở bitrate 128kbps
- Sử dụng format webm cho video (nhẹ hơn mp4)
