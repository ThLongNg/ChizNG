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
    name: "Song 3 - Artist 3",
    src: "https://cdn.glitch.global/5a6ae0fa-88dd-4643-a115-3363478e8816/9convert.com%20-%20Hope%20Is%20the%20Thing%20With%20Feathers.mp3?v=1734088005075"
  },
  {name: " Had I Not Seen the Sun",
   src: " https://cdn.glitch.global/5a6ae0fa-88dd-4643-a115-3363478e8816/9convert.com%20-%20Had%20I%20Not%20Seen%20the%20Sun.mp3?v=1734090661570 "
}
];

let currentSongIndex = 0;

const audio = document.getElementById("background-music");
const cdDisk = document.getElementById("cd-disk");
const songInfoBox = document.getElementById("song-info-box");
const songName = document.getElementById("song-name");

function playSong() {
  const song = songs[currentSongIndex];
  audio.src = song.src;
  audio.play();
  songName.textContent = song.name;

  // Hiện box tên bài hát và thêm hiệu ứng trượt lên
  songInfoBox.classList.remove("hidden");
  songInfoBox.classList.add("show");
}

// Chuyển bài hát khi hoàn thành bài hát hiện tại
audio.addEventListener("ended", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  playSong();
});

// Thêm sự kiện click cho đĩa nhạc

cdDisk.addEventListener("click", () => {
    if (audio.paused) {
    playSong();
    cdDisk.classList.add("playing"); // Quay đĩa khi phát nhạc
  } else {
    audio.pause();
    cdDisk.classList.remove("playing"); // Dừng đĩa khi nhạc dừng
    songInfoBox.classList.add("hidden"); // Ẩn box tên bài hát khi nhạc dừng
  }
});
// Thêm sự kiện double click để chuyển bài hát
cdDisk.addEventListener("dblclick", () => {
  // Chuyển sang bài hát tiếp theo
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  playSong();
  cdDisk.classList.add("playing"); // Quay đĩa khi phát nhạc
});
document.querySelector("audio").style.display = "none";

