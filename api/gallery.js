/**
 * GET /api/gallery
 * Lấy danh sách ảnh từ một Google Drive folder public.
 *
 * Env vars cần set trên Vercel (hoặc .env.local khi dev):
 *   GOOGLE_DRIVE_FOLDER_ID  — ID của folder (phần sau /folders/ trong URL)
 *   GOOGLE_DRIVE_API_KEY    — API key từ Google Cloud Console (chỉ cần Drive API read-only)
 */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  const apiKey   = process.env.GOOGLE_DRIVE_API_KEY;

  if (!folderId || !apiKey) {
    return res.status(500).json({
      error: 'Missing env vars: GOOGLE_DRIVE_FOLDER_ID and/or GOOGLE_DRIVE_API_KEY',
    });
  }

  try {
    // Lấy tất cả file ảnh trong folder (tối đa 1000 file)
    const url = new URL('https://www.googleapis.com/drive/v3/files');
    url.searchParams.set('q', `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`);
    url.searchParams.set('key', apiKey);
    url.searchParams.set('fields', 'files(id,name,description,imageMediaMetadata)');
    url.searchParams.set('orderBy', 'name');
    url.searchParams.set('pageSize', '1000');

    const driveRes = await fetch(url.toString());
    if (!driveRes.ok) {
      const err = await driveRes.text();
      return res.status(driveRes.status).json({ error: err });
    }

    const data = await driveRes.json();

    // Chuyển sang format PHOTOS mà GalleryPage hiểu
    const photos = (data.files || []).map((file) => ({
      // URL trực tiếp từ Google CDN — nhanh hơn /uc?export=view
      src:     `https://lh3.googleusercontent.com/d/${file.id}=s1600`,
      srcFull: `https://lh3.googleusercontent.com/d/${file.id}=s4096`,
      // Tên file bỏ đuôi làm title, description làm caption
      title:   file.name.replace(/\.[^/.]+$/, ''),
      caption: file.description || '',
      // Ảnh ngang (landscape) tự động wide
      wide:    file.imageMediaMetadata
               && file.imageMediaMetadata.width > file.imageMediaMetadata.height * 1.4,
    }));

    // Cache 5 phút ở edge
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(200).json({ photos });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
