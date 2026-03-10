import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'preferredLanguage';

export const TRANSLATIONS = {
  en: {
    'nav.about': 'About Me',
    'nav.projects': 'Projects',
    'hero.title': 'This is my Personal Profile',
    'profile.fullName': 'Full Name: Nguyễn Thành Long',
    'profile.jpName': 'グエン・タイン・ロン',
    'profile.education': 'FPT University HCM',
    'profile.birth': 'Birth Date: 07/10/2005',
    'profile.address': 'Address: Long Thanh My, TP Thu Duc, TP HCM',
    'contact.heading': 'Contact Me At:',
    'contact.facebook.cta': 'View Profile',
    'contact.discord.cta': 'Open Discord',
    'contact.gmail.cta': 'Send Email',
    'contact.instagram.cta': 'View Feed',
    'contact.twitter.cta': 'Visit Profile',
    'contact.github.cta': 'Visit Repos',
    'bio.heading': 'My Biography',
    'bio.body': 'Hello! My name is Nguyễn Thành Long, and I am currently a student at FPT University in Ho Chi Minh City. I have a strong enthusiasm for technology and coding, which drives me to continuously learn and grow in these fields. I enjoy tackling challenges and developing projects that can provide value to others. In my free time, I actively seek out new hobbies, and I find inspiration in listening to music and playing video games, which help me unwind and foster my creativity.',
    'github.heading': 'GitHub Contribution Graph',
    'github.note': 'Click the graph to view details on GitHub',
    'hsr.heading': 'Honkai Star Rail Info',
    'hsr.loading': 'Loading player data...',
    'hsr.achievements': 'Total Achievements',
    'hsr.simulated': 'Simulated Universe',
    'hsr.button': 'View Characters',
    'spotify.profile.heading': '🎧 My Spotify Profile',
    'spotify.profile.bio': '🎵 Music enthusiast | 🎮 Gamer | 💻 Developer',
    'spotify.profile.cta': 'Visit My Spotify Profile',
    'spotify.now.heading': '🎧 Now Listening',
    'spotify.now.loading': 'Loading track...',
    'spotify.now.offline': 'Not listening to anything right now (Offline)',
    'spotify.playlists.heading': '🎶 Featured Playlists',
    'gallery.cta.heading': '📸 Photo Gallery',
    'gallery.cta.desc': 'A curated collection of wildlife & nature photography.',
    'gallery.cta.btn': 'Explore Gallery',
    'gallery.page.title': '📷 Gallery',
    'gallery.page.subtitle.loading': 'Loading photos…',
    'gallery.page.subtitle.fallback': 'Sample photos — Google Drive not connected',
    'gallery.page.subtitle.loaded': '{n} photos — click to enlarge',
    'gallery.page.prev': 'Previous',
    'gallery.page.next': 'Next',
    'gallery.page.close': 'Close',
  },
  vi: {
    'nav.about': 'Về Tôi',
    'nav.projects': 'Dự Án',
    'hero.title': 'Đây là hồ sơ cá nhân của tôi',
    'profile.fullName': 'Họ và tên: Nguyễn Thành Long',
    'profile.jpName': 'グエン・タイン・ロン',
    'profile.education': 'ĐH FPT TP.HCM',
    'profile.birth': 'Ngày sinh: 07/10/2005',
    'profile.address': 'Địa chỉ: Long Thanh Mỹ, TP Thủ Đức, TP HCM',
    'contact.heading': 'Liên hệ với tôi tại:',
    'contact.facebook.cta': 'Xem hồ sơ',
    'contact.discord.cta': 'Mở Discord',
    'contact.gmail.cta': 'Gửi email',
    'contact.instagram.cta': 'Xem trang',
    'contact.twitter.cta': 'Đến trang cá nhân',
    'contact.github.cta': 'Xem kho mã',
    'bio.heading': 'Tiểu sử',
    'bio.body': 'Xin chào! Mình là Nguyễn Thành Long, hiện đang là sinh viên Đại học FPT TP.HCM. Niềm đam mê công nghệ và lập trình luôn thôi thúc mình học hỏi và phát triển mỗi ngày. Mình thích chinh phục thử thách, tạo ra những dự án mang lại giá trị cho mọi người và vẫn dành thời gian khám phá sở thích mới. Âm nhạc và trò chơi điện tử giúp mình thư giãn và nuôi dưỡng sự sáng tạo.',
    'github.heading': 'Biểu đồ đóng góp GitHub',
    'github.note': 'Nhấn vào bảng để xem chi tiết trên GitHub',
    'hsr.heading': 'Thông tin Honkai Star Rail',
    'hsr.loading': 'Đang tải thông tin người chơi...',
    'hsr.achievements': 'Tổng số thành tựu',
    'hsr.simulated': 'Vũ Trụ Mô Phỏng',
    'hsr.button': 'Xem nhân vật',
    'spotify.profile.heading': '🎧 Hồ sơ Spotify của tôi',
    'spotify.profile.bio': '🎵 Yêu âm nhạc | 🎮 Gamer | 💻 Lập trình viên',
    'spotify.profile.cta': 'Xem hồ sơ Spotify',
    'spotify.now.heading': '🎧 Đang nghe',
    'spotify.now.loading': 'Đang tải bài hát...',
    'spotify.now.offline': 'Hiện không nghe gì (Offline)',
    'spotify.playlists.heading': '🎶 Playlist nổi bật',
    'gallery.cta.heading': '📸 Bộ sưu tập ảnh',
    'gallery.cta.desc': 'Bộ ảnh thiên nhiên và động vật hoang dã được tuyển chọn.',
    'gallery.cta.btn': 'Khám phá Gallery',
    'gallery.page.title': '📷 Thư viện ảnh',
    'gallery.page.subtitle.loading': 'Đang tải ảnh…',
    'gallery.page.subtitle.fallback': 'Ảnh mẫu — chưa kết nối Google Drive',
    'gallery.page.subtitle.loaded': '{n} ảnh — bấm để xem lớn',
    'gallery.page.prev': 'Trước',
    'gallery.page.next': 'Tiếp',
    'gallery.page.close': 'Đóng',
  },
  ja: {
    'nav.about': '自己紹介',
    'nav.projects': 'プロジェクト',
    'hero.title': 'これは私の個人プロフィールです',
    'profile.fullName': '氏名: Nguyễn Thành Long',
    'profile.jpName': 'グエン・タイン・ロン',
    'profile.education': 'FPT大学ホーチミン校',
    'profile.birth': '生年月日: 2005年10月7日',
    'profile.address': '住所: ホーチミン市トゥードゥック市ロンタインミー',
    'contact.heading': 'お問い合わせ',
    'contact.facebook.cta': 'プロフィールを見る',
    'contact.discord.cta': 'Discordを開く',
    'contact.gmail.cta': 'メールを送る',
    'contact.instagram.cta': 'フィードを見る',
    'contact.twitter.cta': 'プロフィールへ',
    'contact.github.cta': 'リポジトリを見る',
    'bio.heading': '自己紹介文',
    'bio.body': 'こんにちは。Nguyễn Thành Long と申します。ホーチミン市のFPT大学で学びながら、テクノロジーとプログラミングへの情熱を原動力に日々成長しています。価値あるプロジェクトづくりや新しい挑戦が大好きで、音楽とゲームは創造力を養い、リラックスさせてくれる大切な時間です。',
    'github.heading': 'GitHub 貢献グラフ',
    'github.note': 'クリックするとGitHubで詳細を確認できます',
    'hsr.heading': '崩壊:スターレイル情報',
    'hsr.loading': 'プレイヤーデータを読み込み中...',
    'hsr.achievements': '実績合計',
    'hsr.simulated': '模擬宇宙',
    'hsr.button': 'キャラクターを見る',
    'spotify.profile.heading': '🎧 Spotifyプロフィール',
    'spotify.profile.bio': '🎵 音楽好き | 🎮 ゲーマー | 💻 デベロッパー',
    'spotify.profile.cta': 'Spotifyプロフィールへ',
    'spotify.now.heading': '🎧 再生中',
    'spotify.now.loading': '曲を読み込み中...',
    'spotify.now.offline': '現在は再生していません (オフライン)',
    'spotify.playlists.heading': '🎶 注目のプレイリスト',
    'gallery.cta.heading': '📸 フォトギャラリー',
    'gallery.cta.desc': '厳選した野生動物・自然写真のコレクション。',
    'gallery.cta.btn': 'ギャラリーを見る',
    'gallery.page.title': '📷 ギャラリー',
    'gallery.page.subtitle.loading': '写真を読み込み中…',
    'gallery.page.subtitle.fallback': 'サンプル写真 — Google Driveに未接続',
    'gallery.page.subtitle.loaded': '{n}枚 — クリックして拡大',
    'gallery.page.prev': '前へ',
    'gallery.page.next': '次へ',
    'gallery.page.close': '閉じる',
  },
};

export const useLanguage = () => {
  const getInitialLang = () => {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'en';
    } catch {
      return 'en';
    }
  };

  const [lang, setLangState] = useState(getInitialLang);

  const setLang = useCallback((newLang) => {
    if (!TRANSLATIONS[newLang]) return;
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // ignore
    }
    setLangState(newLang);
  }, []);

  const t = useCallback(
    (key) => TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.en[key] ?? key,
    [lang]
  );

  return { lang, setLang, t };
};
