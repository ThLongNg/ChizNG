// Custom Sakura Cursor Trail
const supportsFinePointer = window.matchMedia('(pointer: fine)').matches;
let cursorPetalElement = null;
let lastTrailSpawn = 0;
const sakuraCursorMarkup = '<img src="assets/cherryblossom-cursor.svg" alt="Sakura cursor" draggable="false" />';
let cursorRotation = 0;

const createCursorTrail = (x, y) => {
  const petal = document.createElement('span');
  petal.className = 'cursor-trail';
  petal.style.left = `${x - 10}px`;
  petal.style.top = `${y - 10}px`;
  petal.style.setProperty('--drift-x', `${(Math.random() * 40) - 20}px`);
  petal.style.setProperty('--petal-rotation', `${Math.random() * 360}deg`);
  petal.innerHTML = sakuraCursorMarkup;
  document.body.appendChild(petal);
  setTimeout(() => petal.remove(), 1600);
};

// View counter (requires /api/views + Upstash env vars on Vercel)
const VIEW_COUNTER_STORAGE_KEY = 'chizng:viewCounter:lastHitMs';
const VIEW_COUNTER_MIN_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes

const shouldHitViewCounter = () => {
  try {
    const lastHit = Number.parseInt(localStorage.getItem(VIEW_COUNTER_STORAGE_KEY) || '0', 10);
    return Number.isNaN(lastHit) || (Date.now() - lastHit) > VIEW_COUNTER_MIN_INTERVAL_MS;
  } catch {
    return true;
  }
};

const markViewCounterHit = () => {
  try {
    localStorage.setItem(VIEW_COUNTER_STORAGE_KEY, String(Date.now()));
  } catch {
    // ignore
  }
};

const initViewCounter = async () => {
  const countEl = document.getElementById('site-view-count');
  if (!countEl) return;

  // Don’t count hidden/background loads.
  if (document.visibilityState && document.visibilityState !== 'visible') return;

  const shouldHit = shouldHitViewCounter();

  try {
    const response = await fetch(`/api/views?scope=site`, {
      method: shouldHit ? 'POST' : 'GET',
      headers: { 'Accept': 'application/json' },
    });

    const data = await response.json().catch(() => null);
    if (!response.ok || !data || typeof data.total !== 'number') {
      countEl.textContent = '—';
      return;
    }

    countEl.textContent = data.total.toLocaleString();
    if (shouldHit) markViewCounterHit();
  } catch (error) {
    countEl.textContent = '—';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initViewCounter();
});

const handlePointerMove = (event) => {
  if (!cursorPetalElement) return;
  cursorPetalElement.style.opacity = 1;
  cursorPetalElement.style.left = `${event.clientX}px`;
  cursorPetalElement.style.top = `${event.clientY}px`;
  cursorRotation += (Math.random() * 4) - 2;
  if (cursorRotation > 360 || cursorRotation < -360) {
    cursorRotation %= 360;
  }
  cursorPetalElement.style.setProperty('--cursor-rotation', `${cursorRotation}deg`);

  const now = Date.now();
  if (now - lastTrailSpawn > 60) {
    createCursorTrail(event.clientX, event.clientY);
    lastTrailSpawn = now;
  }
};

if (supportsFinePointer) {
  cursorPetalElement = document.createElement('div');
  cursorPetalElement.id = 'cursor-petal';
  cursorPetalElement.innerHTML = sakuraCursorMarkup;
  document.body.appendChild(cursorPetalElement);
  document.body.classList.add('custom-cursor-active');
  document.addEventListener('pointermove', handlePointerMove);
  document.addEventListener('pointerleave', () => {
    if (cursorPetalElement) cursorPetalElement.style.opacity = 0;
  });
}

// Music Player - Enhanced
const songs = [
  {
    name: "If I Can Stop One Heart From Breaking - Honkai Star Rail",
    src: "https://cdn.glitch.global/5a6ae0fa-88dd-4643-a115-3363478e8816/If%20I%20Can%20Stop%20One%20Heart%20From%20Breaking%20Honkai%20Star%20Rail.mp3?v=1732554406022"
  },
  {
    name: "Everything Goes On - Porter Robinson",
    src: "https://cdn.glitch.global/5a6ae0fa-88dd-4643-a115-3363478e8816/9convert.com%20-%20Porter%20Robinson%20%20Everything%20Goes%20On%20Official%20Lyric%20Video%20%20Star%20Guardian%202022.mp3?v=1734087780501"
  },
  {
    name: "Hope Is The Thing With  - Honkai Star Rail",
    src: "https://cdn.glitch.global/5a6ae0fa-88dd-4643-a115-3363478e8816/9convert.com%20-%20Hope%20Is%20the%20Thing%20With%20Feathers.mp3?v=1734088005075"
  },
  {
    name: "Had I Not Seen the Sun - Honkai Star Rail",
    src: "https://cdn.glitch.global/5a6ae0fa-88dd-4643-a115-3363478e8816/9convert.com%20-%20Had%20I%20Not%20Seen%20the%20Sun.mp3?v=1734090661570"
  }
];

let currentSongIndex = 0;
const audio = document.getElementById("background-music");
const cdDisk = document.getElementById("cd-disk");
const songInfoBox = document.getElementById("song-info-box");
const songName = document.getElementById("song-name");

function playSong() {
  const song = songs[currentSongIndex];
  audio.pause();
  audio.src = song.src;
  audio.load();
  audio.play();
  songName.textContent = song.name;
  songInfoBox.classList.remove("hidden");
  songInfoBox.classList.add("show");
  cdDisk.classList.add("playing");
}

audio.addEventListener("ended", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  playSong();
});

cdDisk.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    audio.pause();
    cdDisk.classList.remove("playing");
    songInfoBox.classList.add("hidden");
  }
});

cdDisk.addEventListener("dblclick", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  playSong();
});

audio.style.display = "none";

// Web Audio setup (safe + prevents duplicate source creation)
const ctx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = ctx.createAnalyser();
if (!window.audioSourceCreated) {
  const source = ctx.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(ctx.destination);
  window.audioSourceCreated = true;
}
analyser.fftSize = 256;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// Generate static wave bars
const waveContainer = document.createElement("div");
waveContainer.id = "wave-container";
document.body.appendChild(waveContainer);

const numBars = 64;
const bars = [];

for (let i = 0; i < numBars; i++) {
  const bar = document.createElement("div");
  bar.className = "wave-bar";
  waveContainer.appendChild(bar);
  bars.push(bar);
}

// Animate wave bars with audio
function animateVisualizer() {
  requestAnimationFrame(animateVisualizer);
  analyser.getByteFrequencyData(dataArray);
  for (let i = 0; i < numBars; i++) {
    const value = dataArray[i];
    const height = Math.max(4, (value / 255) * 100);
    bars[i].style.height = `${height}%`;
  }
}

audio.addEventListener("play", () => {
  if (ctx.state === "suspended") ctx.resume();
  animateVisualizer();
});

window.onload = () => {
  const audio = document.getElementById("background-music");
  const cdDisk = document.getElementById("cd-disk");
  const songInfoBox = document.getElementById("song-info-box");
  const songName = document.getElementById("song-name");

  // Validate essential elements
  if (!audio || !cdDisk || !songInfoBox || !songName) {
    console.error("Some required DOM elements are missing.");
    return;
  }

  const controlBox = document.createElement("div");
  controlBox.id = "music-controls";
  controlBox.innerHTML = `
    <label>🔊 Volume
      <input type="range" id="volume-control" min="0" max="1" step="0.01">
    </label>
    <div>
      <button id="prev-song">⏮ Prev</button>
      <button id="toggle-song">⏯ Play/Pause</button>
      <button id="next-song">⏭ Next</button>
    </div>
  `;
  document.body.appendChild(controlBox);

  const volumeControl = controlBox.querySelector("#volume-control");
  const toggleBtn = controlBox.querySelector("#toggle-song");
  const nextBtn = controlBox.querySelector("#next-song");
  const prevBtn = controlBox.querySelector("#prev-song");

  if (!volumeControl || !toggleBtn || !nextBtn || !prevBtn) {
    console.error("Control buttons or inputs are missing.");
    return;
  }

  // Initialize volume
  volumeControl.value = audio.volume;
  volumeControl.addEventListener("input", (e) => {
    audio.volume = e.target.value;
  });

  toggleBtn.addEventListener("click", () => {
    if (audio.paused) {
      playSong();
    } else {
      audio.pause();
      cdDisk.classList.remove("playing");
    }
  });

  nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong();
  });

  prevBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong();
  });

  // Toggle logic for both desktop and mobile
  let isControlsOpen = false;
  let closeTimeout;

  // Function to toggle controls
  const toggleControls = () => {
    isControlsOpen = !isControlsOpen;
    if (isControlsOpen) {
      controlBox.classList.add("show-controls");
      if (closeTimeout) clearTimeout(closeTimeout);
    } else {
      controlBox.classList.remove("show-controls");
    }
  };

  // Check if device supports touch
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  if (isTouchDevice) {
    // Mobile: Toggle on click
    cdDisk.addEventListener("click", (e) => {
      // Prevent double-triggering from both click and existing play/pause
      if (e.detail === 1) {
        toggleControls();
      }
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!cdDisk.contains(e.target) && !controlBox.contains(e.target) && isControlsOpen) {
        toggleControls();
      }
    });
  } else {
    // Desktop: Hover behavior
    let isHoveringBox = false;

    cdDisk.addEventListener("mouseenter", () => {
      controlBox.classList.add("show-controls");
      isControlsOpen = true;
      if (closeTimeout) clearTimeout(closeTimeout);
    });

    cdDisk.addEventListener("mouseleave", () => {
      closeTimeout = setTimeout(() => {
        if (!isHoveringBox) {
          controlBox.classList.remove("show-controls");
          isControlsOpen = false;
        }
      }, 300);
    });

    controlBox.addEventListener("mouseenter", () => {
      isHoveringBox = true;
      if (closeTimeout) clearTimeout(closeTimeout);
    });

    controlBox.addEventListener("mouseleave", () => {
      isHoveringBox = false;
      closeTimeout = setTimeout(() => {
        controlBox.classList.remove("show-controls");
        isControlsOpen = false;
      }, 300);
    });
  }
};








//-----------------------------------------------

// Sakura Snow Effect
function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");
  snowflake.textContent = "🌸";
  snowflake.style.left = Math.random() * 100 + "vw";
  snowflake.style.fontSize = Math.random() * 30 + 10 + "px";
  snowflake.style.animationDuration = Math.random() * 8 + 5 + "s";
  snowflake.style.animationDelay = Math.random() * 5 + "s";
  snowflake.style.opacity = Math.random() * (0.7 - 0.4) + 0.4;
  document.body.appendChild(snowflake);
  setTimeout(() => snowflake.remove(), 15000);
}
setInterval(createSnowflake, 200);

// Dynamic Glitch Text from data-text attribute
const chizuruContainer = document.getElementById('chizuru-glitch');
if (chizuruContainer) {
  const glitchText = chizuruContainer.getAttribute('data-text') || 'chizuru-グエン';
  const chizuruChars = glitchText.split('');
  
  chizuruChars.forEach((char, index) => {
    const span = document.createElement('span');
    span.className = 'char';
    span.textContent = char;
    span.style.animationDelay = `${index * 0.3}s`;
    chizuruContainer.appendChild(span);
  });
}



// ... (Class HSREnkaAPI của bạn bắt đầu ở đây) ...
// Honkai Star Rail API Integration
class HSREnkaAPI {
  constructor() {
    this.baseURL = 'https://enka.network/api/hsr/uid';
    this.defaultUID = '800264283';
    this.init();
  }

  init() {
    // Auto fetch data when page loads
    this.fetchPlayerData();
  }

  async fetchPlayerData() {
    const uid = this.defaultUID;

    this.showLoading(true);
    this.hideError();
    this.hidePlayerInfo();

    try {
      // Try multiple methods to fetch REAL data from Enka
      const fetchMethods = [
        // Method 1: Direct API call (works if CORS is enabled)
        async () => {
          const response = await fetch(`${this.baseURL}/${uid}`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            }
          });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return await response.json();
        },

        // Method 2: AllOrigins proxy
        async () => {
          const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`${this.baseURL}/${uid}`)}`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
          });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const data = await response.json();
          if (!data.contents) throw new Error('No contents in response');
          return JSON.parse(data.contents);
        },

        // Method 3: CORS Proxy
        async () => {
          const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(`${this.baseURL}/${uid}`)}`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
          });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return await response.json();
        },

        // Method 4: API.CODETABS proxy
        async () => {
          const response = await fetch(`https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(`${this.baseURL}/${uid}`)}`, {
            method: 'GET'
          });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return await response.json();
        },

        // Method 5: ThingProxy
        async () => {
          const response = await fetch(`https://thingproxy.freeboard.io/fetch/${this.baseURL}/${uid}`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
          });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return await response.json();
        }
      ];

      let apiData = null;
      let lastError = null;

      // Try each method until one succeeds
      for (let i = 0; i < fetchMethods.length; i++) {
        try {
          apiData = await fetchMethods[i]();

          // Validate that we got REAL data with proper structure
          if (apiData && apiData.detailInfo && apiData.detailInfo.uid) {
            break;
          } else {
            throw new Error('Invalid data structure - missing detailInfo or uid');
          }

        } catch (error) {
          lastError = error;
          apiData = null;

          // Add small delay before next attempt to avoid rate limiting
          if (i < fetchMethods.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 500));
          }
          continue;
        }
      }

      // If all methods failed, throw error (NO FALLBACK TO MOCK DATA)
      if (!apiData) {
        // Update button state to error
        if (typeof window.updateCharacterButtonState === 'function') {
          window.updateCharacterButtonState('error', 'Failed to load character data');
        }
        throw new Error(`Không thể tải dữ liệu từ Enka API. Vui lòng thử lại sau.`);
      }

      // Display REAL data
      console.log('🔍 Full API Response:', apiData);
      console.log('🔍 Available top-level keys:', Object.keys(apiData));
      if (apiData.detailInfo) {
        console.log('🔍 detailInfo keys:', Object.keys(apiData.detailInfo));
      }
      this.displayPlayerData(apiData);

    } catch (error) {
      console.error('Failed to load data from Enka API:', error);
      this.showError(`Không thể tải dữ liệu từ Enka API. Vui lòng thử lại sau.`);

    } finally {
      this.showLoading(false);
    }
  }

  displayPlayerData(data) {
    const playerInfo = data.detailInfo;

    // Display player avatar from Enka API
    let playerAvatarId = null;

    // Try to get avatar ID from multiple possible fields
    if (playerInfo.headIcon) {
      playerAvatarId = playerInfo.headIcon;
    } else if (playerInfo.profilePicture && playerInfo.profilePicture.avatarId) {
      playerAvatarId = playerInfo.profilePicture.avatarId;
    } else if (playerInfo.avatarId) {
      playerAvatarId = playerInfo.avatarId;
    } else {
      // Use first character avatar as fallback if available
      const avatarList = data.detailInfo?.avatarDetailList || data.avatarDetailList;
      if (avatarList && avatarList.length > 0) {
        playerAvatarId = avatarList[0].avatarId;
      } else {
        playerAvatarId = null;
      }
    }

    const playerAvatarImg = document.getElementById('player-avatar');

    if (playerAvatarId && playerAvatarImg) {
      // Enka Network official avatar URLs
      const avatarUrls = [
        // Primary Enka CDN paths
        `https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/Series/${playerAvatarId}.png`,
        `https://enka.network/ui/hsr/SpriteOutput/AvatarIcon/Series/${playerAvatarId}.png`,
        `https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/${playerAvatarId}.png`,
        `https://enka.network/ui/hsr/SpriteOutput/AvatarIcon/${playerAvatarId}.png`,

        // Legacy paths
        `https://enka.network/ui/hsr/AvatarRoundIcon/${playerAvatarId}.png`,
        `https://enka.network/ui/hsr/AvatarIcon/${playerAvatarId}.png`,

        // Community CDN fallbacks
        `https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/avatar/${playerAvatarId}.png`,
        `https://starrail.honeyhunterworld.com/img/character/${playerAvatarId}_icon.webp`,

        // Final fallback: SVG placeholder with avatar ID
        `data:image/svg+xml;base64,${btoa(`
          <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="40" fill="#4a9eff"/>
            <text fill="#fff" font-family="Arial" font-size="10" text-anchor="middle" x="40" y="35">Avatar</text>
            <text fill="#fff" font-family="Arial" font-size="12" font-weight="bold" text-anchor="middle" x="40" y="50">${playerAvatarId}</text>
          </svg>
        `)}`
      ];

      let currentUrlIndex = 0;
      let isLoaded = false;

      const loadNextAvatar = () => {
        if (isLoaded || currentUrlIndex >= avatarUrls.length) return;

        const currentUrl = avatarUrls[currentUrlIndex];
        playerAvatarImg.src = currentUrl;
        currentUrlIndex++;
      };

      playerAvatarImg.onload = () => {
        if (!isLoaded) {
          console.log('✅ REAL Avatar loaded successfully:', playerAvatarImg.src);
          isLoaded = true;
        }
      };

      playerAvatarImg.onerror = () => {
        if (!isLoaded) {
          console.log(`❌ Avatar URL failed, trying next...`);
          loadNextAvatar();
        }
      };

      // Start loading
      loadNextAvatar();

    } else if (playerAvatarImg) {
      // No avatar ID found, use generic placeholder
      console.warn('⚠️ No avatar ID available, using generic placeholder');
      playerAvatarImg.src = `data:image/svg+xml;base64,${btoa(`
        <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="40" fill="#667799"/>
          <text fill="#fff" font-family="Arial" font-size="16" text-anchor="middle" x="40" y="45">HSR</text>
        </svg>
      `)}`;
    }

    // Display REAL player info
    document.getElementById('player-nickname').textContent = playerInfo.nickname || 'Unknown';
    document.getElementById('player-level').textContent = playerInfo.level || '0';
    document.getElementById('world-level').textContent = playerInfo.worldLevel || '0';
    document.getElementById('player-uid').textContent = playerInfo.uid || this.defaultUID;
    document.getElementById('player-signature').textContent = playerInfo.signature || 'No signature';

    // Get REAL achievement count from API
    let achievementCount = 0;

    console.log('🔍 Checking for achievement count...');
    console.log('🔍 playerInfo.recordInfo exists?', !!playerInfo.recordInfo);
    if (playerInfo.recordInfo) {
      console.log('🔍 recordInfo.achievementCount value:', playerInfo.recordInfo.achievementCount);
    }

    // Check in recordInfo first (where Enka API stores it)
    if (playerInfo.recordInfo && playerInfo.recordInfo.achievementCount !== undefined) {
      achievementCount = playerInfo.recordInfo.achievementCount;
      console.log('✅ REAL achievements from recordInfo.achievementCount:', achievementCount);
    } else if (playerInfo.recordInfo && playerInfo.recordInfo.finishAchievementNum !== undefined) {
      achievementCount = playerInfo.recordInfo.finishAchievementNum;
      console.log('✅ REAL achievements from recordInfo.finishAchievementNum:', achievementCount);
    }
    // Fallback to direct fields
    else if (playerInfo.finishAchievementNum !== undefined) {
      achievementCount = playerInfo.finishAchievementNum;
      console.log('✅ REAL achievements from finishAchievementNum:', achievementCount);
    } else if (playerInfo.achievementCount !== undefined) {
      achievementCount = playerInfo.achievementCount;
      console.log('✅ REAL achievements from achievementCount:', achievementCount);
    } else if (playerInfo.achievements !== undefined) {
      achievementCount = playerInfo.achievements;
      console.log('✅ REAL achievements from achievements:', achievementCount);
    } else if (playerInfo.finishedAchievementNum !== undefined) {
      achievementCount = playerInfo.finishedAchievementNum;
      console.log('✅ REAL achievements from finishedAchievementNum:', achievementCount);
    } else {
      console.warn('⚠️ No achievement field found in REAL data');
      console.warn('Available recordInfo fields:', playerInfo.recordInfo ? Object.keys(playerInfo.recordInfo) : 'recordInfo is null');
      achievementCount = 0;
    }

    console.log('🎯 Final achievement count to display:', achievementCount);
    document.getElementById('achievement-count').textContent = achievementCount;

    // Store character data and create view button
    console.log('🔍 Checking for character data...');
    console.log('🔍 data.avatarDetailList exists?', !!data.avatarDetailList);
    console.log('🔍 data.detailInfo.avatarDetailList exists?', !!data.detailInfo?.avatarDetailList);

    // FIX: avatarDetailList is inside detailInfo, not at top level!
    const avatarList = data.detailInfo?.avatarDetailList || data.avatarDetailList;
    console.log('🔍 Final avatarList length:', avatarList ? avatarList.length : 'N/A');

    if (avatarList && avatarList.length > 0) {
      console.log('✅ Character data loaded:', avatarList.length, 'characters');

      // Create character popup instance
      if (!window.characterPopup) {
        window.characterPopup = new CharacterPopup();
      }
      window.characterPopup.setCharacterData(avatarList);

      console.log('✅ CharacterPopup instance created and data set');

      // Enable the enhanced button in home.html (no duplicate button creation)
      if (typeof window.enableCharacterViewButton === 'function') {
        console.log('✅ Calling enableCharacterViewButton with', avatarList.length, 'characters');
        window.enableCharacterViewButton(avatarList.length);
      } else {
        console.warn('⚠️ enableCharacterViewButton function not found - button may not enable automatically');
      }
    } else {
      console.warn('⚠️ No character data found in API response');
    }

    // Show player info container
    document.getElementById('hsr-player-info').classList.remove('hidden');
  }

  showLoading(show) {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
      if (show) {
        loadingIndicator.classList.remove('hidden');

      } else {
        loadingIndicator.classList.add('hidden');
      }
    }
  }

  showError(message) {
    const errorContainer = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');
    if (errorContainer && errorText) {
      errorText.textContent = message;
      errorContainer.classList.remove('hidden');
    }
    console.error('Error shown to user:', message);
  }

  hideError() {
    const errorContainer = document.getElementById('error-message');
    if (errorContainer) {
      errorContainer.classList.add('hidden');
    }
  }

  hidePlayerInfo() {
    const playerInfo = document.getElementById('hsr-player-info');
    if (playerInfo) {
      playerInfo.classList.add('hidden');
    }
  }
}

// Initialize HSR API when DOM is loaded

document.addEventListener('DOMContentLoaded', () => {
  // === BẮT ĐẦU: LOGIC SPOTIFY NOW LISTENING ===

// API URL bây giờ là một đường dẫn tương đối!
const SPOTIFY_API_URL = '/api/spotify'; 

const loadingEl = document.getElementById('spotify-loading');
const offlineEl = document.getElementById('spotify-offline');
const playingEl = document.getElementById('spotify-playing');

// Kiểm tra xem các element có tồn tại không
if (loadingEl && offlineEl && playingEl) {
  const albumArtEl = document.getElementById('spotify-album-art');
  const songLinkEl = document.getElementById('spotify-song-link');
  const songNameEl = document.getElementById('spotify-song-name');
  const artistNameEl = document.getElementById('spotify-artist-name');
  const progressEl = document.getElementById('spotify-progress');

// THAY THẾ TOÀN BỘ HÀM NÀY
async function getSpotifyData() {
  let res; // Khai báo res ở phạm vi này
  try {
    res = await fetch(SPOTIFY_API_URL);

    // KIỂM TRA QUAN TRỌNG: Nếu response KHÔNG OK (ví dụ: 500)
    if (!res.ok) {
      let errorDetails = `Lỗi ${res.status}`;
      try {
        // Cố gắng đọc JSON lỗi chi tiết từ backend
        const errorData = await res.json();
        errorDetails = errorData.details || errorData.error || `Lỗi ${res.status}`;
      } catch (e) {
        // Không thể đọc JSON, chỉ dùng status
      }
      // Ném lỗi với chi tiết đã đọc được
      throw new Error(errorDetails);
    }

    const data = await res.json();

    if (data.isPlaying && data.songName) {
      loadingEl.classList.add('hidden');
      offlineEl.classList.add('hidden');
      playingEl.classList.remove('hidden');

      if (songNameEl.textContent !== data.songName) {
        albumArtEl.src = data.albumArtUrl;
        songLinkEl.href = data.songUrl;
        songNameEl.textContent = data.songName;
        artistNameEl.textContent = data.artistName;
      }

      const progressPercent = (data.progressMs / data.durationMs) * 100;
      progressEl.style.width = `${progressPercent}%`;

    } else {
      loadingEl.classList.add('hidden');
      offlineEl.classList.remove('hidden');
      playingEl.classList.add('hidden');
    }

  } catch (error) {
    // Bây giờ error.message sẽ chứa thông tin chi tiết
    console.error("Lỗi tải Spotify:", error.message); 

    loadingEl.classList.add('hidden');
    offlineEl.classList.remove('hidden');
    playingEl.classList.add('hidden');
  }
}

  getSpotifyData(); 
  setInterval(getSpotifyData, 5000); // Cập nhật mỗi 5 giây
}
// === KẾT THÚC: LOGIC SPOTIFY NOW LISTENING ===

  // === BẮT ĐẦU: ĐỒNG HỒ THỜI GIAN THỰC ===
  try {
    const clockElement = document.getElementById('dynamic-greeting');

    if (clockElement) {
      function updateClock() {
        const now = new Date();

        // Lấy giờ, phút, giây và đảm bảo chúng luôn có 2 chữ số
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        // Gán vào thẻ <p>
        clockElement.textContent = `${hours} : ${minutes} : ${seconds}`;
      }

      // Chạy 1 lần ngay khi tải trang
      updateClock();

      // Tự động cập nhật đồng hồ mỗi giây (1000ms)
      setInterval(updateClock, 1000);
    }
  } catch (error) {
    console.error("Lỗi khi chạy đồng hồ:", error);
  }
  // === KẾT THÚC: ĐỒNG HỒ THỜI GIAN THỰC ===

  if (document.getElementById('hsr-player-info')) {
    console.log('🚀 Initializing HSR Enka API - REAL DATA MODE ONLY');
    new HSREnkaAPI();
  } else {
    console.log('ℹ️ HSR widget not present on this page, skipping API init');
  }
});
