const songs = [];
let currentSong = 0;

const audio = document.getElementById('audio');
const title = document.getElementById('song-title');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const fileInput = document.getElementById('file-input');

/* ===== Load and Play Songs ===== */
function loadSong(index) {
  const song = songs[index];
  if (!song) return;
  title.textContent = song.title;
  audio.src = song.src;
}

function playSong() {
  if (!audio.src) return;
  audio.play();
  playBtn.classList.add('playing');
}

function pauseSong() {
  audio.pause();
  playBtn.classList.remove('playing');
}

/* ===== Controls ===== */
playBtn.addEventListener('click', () => {
  if (audio.paused) playSong();
  else pauseSong();
});

nextBtn.addEventListener('click', () => {
  if (songs.length === 0) return;
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  playSong();
});

prevBtn.addEventListener('click', () => {
  if (songs.length === 0) return;
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  playSong();
});

audio.addEventListener('timeupdate', () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${progressPercent}%`;
});

audio.addEventListener('ended', () => {
  nextBtn.click();
});

/* ===== Upload MP3 feature ===== */
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file && file.type.includes('audio')) {
    const url = URL.createObjectURL(file);
    const songTitle = file.name.replace(/\.[^/.]+$/, ""); // remove .mp3 extension
    songs.push({ title: songTitle, src: url });
    currentSong = songs.length - 1;
    loadSong(currentSong);
    playSong();
  }
});
