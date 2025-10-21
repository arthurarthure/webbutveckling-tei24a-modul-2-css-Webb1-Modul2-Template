const audio = document.getElementById('audio');
const play = document.getElementById('play');
const pause = document.getElementById('pause');
const next = document.getElementById('next');     // NEW
const prev = document.getElementById('prev');     // NEW
const progress = document.getElementById('progress');
const nowPlaying = document.getElementById('now-playing');
const songs = document.querySelectorAll('.playlist li');

let currentSongIndex = 0;

// Load a song
function loadSong(index) {
  const song = songs[index];
  songs.forEach(s => s.classList.remove('active'));
  song.classList.add('active');
  audio.src = song.dataset.src;
  nowPlaying.textContent = 'Now Playing: ' + song.textContent;
  currentSongIndex = index;
}

// Click a song to play it
songs.forEach((song, index) => {
  song.addEventListener('click', () => {
    loadSong(index);
    audio.play();
  });
});

// Controls
play.onclick = () => audio.play();
pause.onclick = () => audio.pause();

// NEW: Skip to next song
next.onclick = () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
};

// NEW: Skip to previous song
prev.onclick = () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
};

// Update progress bar
audio.ontimeupdate = () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
    progress.style.background = `linear-gradient(to right, #1db954 ${progress.value}%, #555 ${progress.value}%)`;
  }
};

// Scrub progress
progress.oninput = () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
};

// NEW: Auto-skip on song end
audio.onended = () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
};

// Load first song on page load
loadSong(0);