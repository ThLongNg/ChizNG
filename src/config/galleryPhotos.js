/**
 * ════════════════════════════════════════════════════════════
 *  GALLERY CONFIG  —  Thêm ảnh vào đây là xong!
 * ════════════════════════════════════════════════════════════
 *
 *  Cách thêm ảnh:
 *  1. Đặt file ảnh vào thư mục  /public/gallery/
 *  2. Thêm một object vào mảng PHOTOS bên dưới:
 *
 *     {
 *       src:     '/gallery/ten-file.jpg',   ← ảnh local
 *       title:   'Tiêu đề',                 ← hiện khi hover (tùy chọn)
 *       caption: 'Chú thích ngắn',          ← hiện dưới ảnh (tùy chọn)
 *       wide:    true,                      ← true = ảnh chiếm 2 cột (tùy chọn)
 *     }
 *
 *  Cũng có thể dùng URL ngoài (Google Photos, Imgur...):
 *     { src: 'https://...', title: '...' }
 *
 *  Thứ tự trong mảng = thứ tự hiển thị trong gallery.
 * ════════════════════════════════════════════════════════════
 */

export const PHOTOS = [
  // ── Thêm ảnh của bạn vào đây ──────────────────────────
  // Ví dụ:
  // { src: '/gallery/chiz001.jpg', title: 'My setup', caption: '2025' },
  // { src: '/gallery/chiz002.jpg', title: 'Outing', wide: true },
  // { src: 'https://i.imgur.com/abc123.jpg', title: 'Event' },

  // Placeholder cho đến khi bạn thêm ảnh thật
  {
    src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&auto=format',
    title: 'Placeholder 1',
    caption: 'Thay bằng ảnh của bạn',
  },
  {
    src: 'https://images.unsplash.com/photo-1503437313881-503a91226402?w=800&auto=format',
    title: 'Placeholder 2',
    caption: 'Thay bằng ảnh của bạn',
    wide: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1604079628040-94301bb21b91?w=800&auto=format',
    title: 'Placeholder 3',
    caption: 'Thay bằng ảnh của bạn',
  },
  {
    src: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&auto=format',
    title: 'Placeholder 4',
    caption: 'Thay bằng ảnh của bạn',
  },
  {
    src: 'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=800&auto=format',
    title: 'Placeholder 5',
    caption: 'Thay bằng ảnh của bạn',
    wide: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1560743173-567a3b5658b1?w=800&auto=format',
    title: 'Placeholder 6',
    caption: 'Thay bằng ảnh của bạn',
  },
];
