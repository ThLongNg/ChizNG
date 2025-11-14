// Tên file: /api/spotify.js

// Lấy các biến môi trường bí mật
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN; // Token bạn vừa lấy

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

// Hàm lấy Access Token mới
async function getAccessToken() {
  const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(`Spotify token error: ${data.error_description}`);
  }
  return data.access_token;
}

// Hàm API chính mà Vercel sẽ chạy
export default async function handler(req, res) {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    let songData = {};

    if (response.status === 204 || response.status > 400) {
      songData = { isPlaying: false };
    } else {
      const song = await response.json();
      songData = {
        isPlaying: song.is_playing,
        songUrl: song.item?.external_urls?.spotify,
        songName: song.item?.name,
        artistName: (song.item?.artists || []).map(a => a.name).join(', '),
        albumArtUrl: song.item?.album?.images[0]?.url,
        progressMs: song.progress_ms,
        durationMs: song.item?.duration_ms,
      };
    }

    // Vercel tự xử lý CORS khi frontend và backend cùng tên miền
    res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate');
    return res.status(200).json(songData);
    
} catch (error) {
  console.error(error); // Vẫn log lỗi trên Vercel

  // Gửi lỗi chi tiết về trình duyệt để debug
  return res.status(500).json({ 
    error: 'Internal Server Error',
    details: error.message // <-- Thêm chi tiết lỗi vào đây
  });
}