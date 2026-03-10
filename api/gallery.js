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
    // Lấy tất cả file ảnh VÀ video trong folder (tối đa 1000 file)
    const url = new URL('https://www.googleapis.com/drive/v3/files');
    url.searchParams.set('q', `'${folderId}' in parents and (mimeType contains 'image/' or mimeType contains 'video/') and trashed = false`);
    url.searchParams.set('key', apiKey);
    url.searchParams.set('fields', 'files(id,name,description,mimeType,imageMediaMetadata,videoMediaMetadata)');
    url.searchParams.set('orderBy', 'name');
    url.searchParams.set('pageSize', '1000');

    const driveRes = await fetch(url.toString());
    if (!driveRes.ok) {
      const err = await driveRes.text();
      return res.status(driveRes.status).json({ error: err });
    }

    const data = await driveRes.json();

    // Chuyển sang format PHOTOS mà GalleryPage hiểu
    const photos = (data.files || []).map((file) => {
      const isVideo = file.mimeType && file.mimeType.startsWith('video/');
      const meta    = file.imageMediaMetadata || file.videoMediaMetadata || {};
      return {
        src:     isVideo
                   ? `https://drive.google.com/file/d/${file.id}/preview`
                   : `https://lh3.googleusercontent.com/d/${file.id}=s1600`,
        srcFull: isVideo
                   ? `https://drive.google.com/file/d/${file.id}/preview`
                   : `https://lh3.googleusercontent.com/d/${file.id}=s4096`,
        thumb:   isVideo
                   ? `https://drive.google.com/thumbnail?id=${file.id}&sz=w600`
                   : null,
        title:   file.name.replace(/\.[^/.]+$/, ''),
        caption: file.description || '',
        isVideo,
        // Ảnh/video ngang tự động wide
        wide: meta.width && meta.height
              ? meta.width > meta.height * 1.4
              : false,
      };
    });

    // Cache 5 phút ở edge
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(200).json({ photos });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
