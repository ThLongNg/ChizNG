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

  // Hover logic
  let isHoveringBox = false;

  cdDisk.addEventListener("mouseenter", () => {
    controlBox.classList.add("show-controls");
  });

  cdDisk.addEventListener("mouseleave", () => {
    setTimeout(() => {
      if (!isHoveringBox) controlBox.classList.remove("show-controls");
    }, 300);
  });

  controlBox.addEventListener("mouseenter", () => {
    isHoveringBox = true;
  });

  controlBox.addEventListener("mouseleave", () => {
    isHoveringBox = false;
    controlBox.classList.remove("show-controls");
  });
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

// Chizuru Glitch Text
const chizuruChars = ['ち', 'ず', 'る', '-','グ', 'エ', 'ン'];
const chizuruContainer = document.getElementById('chizuru-glitch');
chizuruChars.forEach((char, index) => {
  const span = document.createElement('span');
  span.className = 'char';
  span.textContent = char;
  span.style.animationDelay = `${index * 0.3}s`;
  chizuruContainer.appendChild(span);
});

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
      console.log('Fetching data for UID:', uid);
      
      // Try multiple proxy services
      const proxies = [
        {
          name: 'corsproxy.io',
          url: `https://corsproxy.io/?${encodeURIComponent(`${this.baseURL}/${uid}`)}`
        },
        {
          name: 'cors-anywhere',
          url: `https://cors-anywhere.herokuapp.com/${this.baseURL}/${uid}`
        },
        {
          name: 'allorigins',
          url: `https://api.allorigins.win/get?url=${encodeURIComponent(`${this.baseURL}/${uid}`)}`
        }
      ];
      
      let apiData = null;
      let lastError = null;
      
      for (const proxy of proxies) {
        try {
          console.log(`Trying ${proxy.name}:`, proxy.url);
          
          const response = await fetch(proxy.url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            }
          });

          if (!response.ok) {
            throw new Error(`${proxy.name} responded with ${response.status}`);
          }

          if (proxy.name === 'allorigins') {
            const proxyData = await response.json();
            if (!proxyData.contents) {
              throw new Error('No contents from allorigins');
            }
            apiData = JSON.parse(proxyData.contents);
          } else {
            apiData = await response.json();
          }
          
          console.log(`${proxy.name} successful, got data:`, apiData);
          break;
          
        } catch (error) {
          console.log(`${proxy.name} failed:`, error.message);
          lastError = error;
          continue;
        }
      }
      
      if (!apiData) {
        // All proxies failed, use mock data for demo
        console.log('All proxies failed, using mock data');
        apiData = this.getMockData();
      }

      this.displayPlayerData(apiData);
      
    } catch (error) {
      console.error('HSR API Error:', error);
      console.error('Full error details:', {
        message: error.message,
        stack: error.stack
      });
      this.showError('Không thể kết nối đến API. Đang hiển thị dữ liệu demo.');
      // Show mock data when all fails
      this.displayPlayerData(this.getMockData());
    } finally {
      this.showLoading(false);
    }
  }

  getMockData() {
    return {
      detailInfo: {
        nickname: "Demo Player",
        level: 70,
        worldLevel: 6,
        uid: "800264283",
        signature: "Demo signature for testing",
        finishAchievementNum: 583,
        headIcon: 200144
      },
      avatarDetailList: [
        {
          avatarId: 1005,
          level: 80,
          promotion: 6,
          skillTreeList: [1, 2, 3, 4, 5]
        },
        {
          avatarId: 1213,
          level: 80,
          promotion: 6,
          skillTreeList: [1, 2, 3, 4]
        },
        {
          avatarId: 1102,
          level: 75,
          promotion: 6,
          skillTreeList: [1, 2, 3]
        }
      ]
    };
  }

  displayPlayerData(data) {
    const playerInfo = data.detailInfo;

    // Debug log to see data structure
    console.log('Full API Response:', data);
    console.log('Player Info:', playerInfo);
    console.log('Available fields in playerInfo:', Object.keys(playerInfo));

    // Display player avatar from Enka API
    let playerAvatarId = null;
    
    // Try to get avatar ID from multiple possible fields
    if (playerInfo.headIcon) {
      playerAvatarId = playerInfo.headIcon;
      console.log('Found player avatar ID from headIcon:', playerAvatarId);
    } else if (playerInfo.profilePicture && playerInfo.profilePicture.avatarId) {
      playerAvatarId = playerInfo.profilePicture.avatarId;
      console.log('Found player avatar ID from profilePicture:', playerAvatarId);
    } else {
      // Use default avatar if no avatar found
      playerAvatarId = 200001;
      console.log('No avatar found, using default avatar:', playerAvatarId);
    }
    
    console.log('Final Avatar ID:', playerAvatarId);
    
    const playerAvatarImg = document.getElementById('player-avatar');
    
    if (playerAvatarId && playerAvatarImg) {
      // Enka Network official avatar URLs with correct format
      const avatarUrls = [
        // Correct Enka Network format with /Series/
        `https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/Series/${playerAvatarId}.png`,
        `https://enka.network/ui/hsr/SpriteOutput/AvatarIcon/Series/${playerAvatarId}.png`,
        `https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/Avatar_${playerAvatarId}.png`,
        `https://enka.network/ui/hsr/SpriteOutput/AvatarIcon/Avatar_${playerAvatarId}.png`,
        
        // Legacy format without /Series/ (fallback)
        `https://enka.network/ui/hsr/AvatarRoundIcon/Avatar_${playerAvatarId}.png`,
        `https://enka.network/ui/hsr/AvatarIcon/Avatar_${playerAvatarId}.png`,
        
        // Alternative community sources (fallback)
        `https://starrail.honeyhunterworld.com/img/character/${playerAvatarId}_icon.webp`,
        `https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/avatar/${playerAvatarId}.png`,
        
        // Generate base64 placeholder with avatar ID
        `data:image/svg+xml;base64,${btoa(`
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="40" fill="#4a9eff"/>
            <text fill="#ffffff" font-family="Arial, sans-serif" font-size="12" text-anchor="middle" dy="-0.3em" x="40" y="35">HSR</text>
            <text fill="#ffffff" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" dy="0.3em" x="40" y="50">${playerAvatarId}</text>
          </svg>
        `)}`
      ];
      
      let currentUrlIndex = 0;
      let isLoaded = false;
      
      const loadNextAvatar = () => {
        if (isLoaded) return;
        
        if (currentUrlIndex < avatarUrls.length - 1) { // -1 because last one is always base64
          const currentUrl = avatarUrls[currentUrlIndex];
          console.log(`Trying Enka avatar URL ${currentUrlIndex + 1}:`, currentUrl);
          playerAvatarImg.src = currentUrl;
          currentUrlIndex++;
        } else {
          // Use base64 placeholder as final fallback
          playerAvatarImg.src = avatarUrls[avatarUrls.length - 1];
          console.log('Using base64 avatar placeholder');
          isLoaded = true;
        }
      };
      
      playerAvatarImg.onload = () => {
        if (!isLoaded) {
          console.log('✅ Avatar loaded successfully from Enka:', playerAvatarImg.src);
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
      
    } else {
      // No avatar found, use generic placeholder
      if (playerAvatarImg) {
        playerAvatarImg.src = `data:image/svg+xml;base64,${btoa(`
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="40" fill="#4a9eff"/>
            <text fill="#ffffff" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" dy="0.3em" x="40" y="40">HSR</text>
          </svg>
        `)}`;
        console.log('No avatar ID found, using generic placeholder');
      }
    }

    // Display basic player info
    document.getElementById('player-nickname').textContent = playerInfo.nickname || 'N/A';
    document.getElementById('player-level').textContent = playerInfo.level || 'N/A';
    document.getElementById('world-level').textContent = playerInfo.worldLevel || 'N/A';
    document.getElementById('player-uid').textContent = playerInfo.uid || 'N/A';
    document.getElementById('player-signature').textContent = playerInfo.signature || 'キャストリス、西国の果てでまた会おう。';
    
    // Try multiple fields for achievement count
    let achievementCount = 0;
    if (playerInfo.finishAchievementNum !== undefined) {
      achievementCount = playerInfo.finishAchievementNum;
      console.log('Found achievements from finishAchievementNum:', achievementCount);
    } else if (playerInfo.achievementCount !== undefined) {
      achievementCount = playerInfo.achievementCount;
      console.log('Found achievements from achievementCount:', achievementCount);
    } else if (playerInfo.achievements !== undefined) {
      achievementCount = playerInfo.achievements;
      console.log('Found achievements from achievements:', achievementCount);
    } else if (playerInfo.finishedAchievementNum !== undefined) {
      achievementCount = playerInfo.finishedAchievementNum;
      console.log('Found achievements from finishedAchievementNum:', achievementCount);
    } else {
      console.log('No achievement field found, using default 583');
      achievementCount = 583; // Default fallback
    }
    
    document.getElementById('achievement-count').textContent = achievementCount;

    // Show player info container
    document.getElementById('hsr-player-info').classList.remove('hidden');
  }

  showLoading(show) {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (show) {
      loadingIndicator.classList.remove('hidden');
    } else {
      loadingIndicator.classList.add('hidden');
    }
  }

  showError(message) {
    const errorContainer = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');
    errorText.textContent = message;
    errorContainer.classList.remove('hidden');
  }

  hideError() {
    const errorContainer = document.getElementById('error-message');
    errorContainer.classList.add('hidden');
  }

  hidePlayerInfo() {
    const playerInfo = document.getElementById('hsr-player-info');
    playerInfo.classList.add('hidden');
  }
}

// Initialize HSR API when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new HSREnkaAPI();
});
