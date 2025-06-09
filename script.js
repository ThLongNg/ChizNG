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
    name: "Hope Is The Thing With  - Artist 3",
    src: "https://cdn.glitch.global/5a6ae0fa-88dd-4643-a115-3363478e8816/9convert.com%20-%20Hope%20Is%20the%20Thing%20With%20Feathers.mp3?v=1734088005075"
  },
  {
    name: "Had I Not Seen the Sun",
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
