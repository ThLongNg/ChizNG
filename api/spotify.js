// Tên file: /api/spotify.js

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

// Hàm lấy Access Token mới
async function getAccessToken() {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    const missing = [];
    if (!CLIENT_ID) missing.push('SPOTIFY_CLIENT_ID');
    if (!CLIENT_SECRET) missing.push('SPOTIFY_CLIENT_SECRET');
    if (!REFRESH_TOKEN) missing.push('SPOTIFY_REFRESH_TOKEN');
    throw new Error(`Missing environment variables on Vercel: ${missing.join(', ')}`);
  }

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
    const errDetail = data.error_description || data.error || 'Unknown token error';
    throw new Error(`Spotify token error: ${errDetail}`);
  }
  return data.access_token;
}

// Hàm API chính mà Vercel sẽ chạy
export default async function handler(req, res) {
  // Thiết lập CORS để frontend có thể gọi được từ mọi domain / localhost
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const accessToken = await getAccessToken();

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    let songData = {};

    // 204 = không có bài hát nào đang phát, > 400 = lỗi từ Spotify
    if (response.status === 204 || response.status > 400) {
      songData = { isPlaying: false };
    } else {
      const song = await response.json();
      songData = {
        isPlaying: Boolean(song && song.is_playing),
        songUrl: song?.item?.external_urls?.spotify || null,
        songName: song?.item?.name || null,
        artistName: (song?.item?.artists || []).map((a) => a.name).join(', ') || null,
        albumArtUrl: song?.item?.album?.images?.[0]?.url || null,
        progressMs: song?.progress_ms || 0,
        durationMs: song?.item?.duration_ms || 0,
      };
    }

    res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate');
    return res.status(200).json(songData);
  } catch (error) {
    console.error('Vercel Spotify API Error:', error.message);

    return res.status(500).json({
      error: 'Spotify API Error',
      details: error.message,
    });
  }
}