import songs from "./play_list.js";
const audio = new Audio("../assets/sounds/Aqua Caelestis.mp3");
const playBtn = document.querySelector(".play");
const playList = document.querySelector(".play-list");

const progress = document.querySelector(".progress");
const progressTime = document.querySelector(".progress-time");

const volume = document.querySelector(".volume");

const songTitle = document.querySelector(".song-title");
const volumeBtn = document.getElementById("volume");

let playCount = 0;
function playAudio() {
  if (!isPlay) {
    let current = audio.currentTime;
    audio.currentTime = current;
    audio.play();
    playBtn.classList.add("pause");
    isPlay = !isPlay;
    itemActiveIcon();
  } else {
    audio.pause();
    playBtn.classList.remove("pause");
    isPlay = !isPlay;
  }
}

function nextAudio() {
  songNum === 3 ? (songNum = 0) : songNum++;
  songTitle.textContent = songs[songNum].title;
  audio.src = songs[songNum].src;
  audio.currentTime = 0;
  audio.play();
  playBtn.classList.add("pause");
  isPlay = !isPlay;
  itemActiveIcon();
}

function prevAudio() {
  songNum === 0 ? (songNum = 3) : songNum--;
  songTitle.textContent = songs[songNum].title;
  audio.src = songs[songNum].src;
  audio.currentTime = 0;
  audio.play();
  playBtn.classList.add("pause");
  isPlay = !isPlay;
  itemActiveIcon();
}

function makePlayList() {
  let loopCount = 0;
  songs.forEach((song) => {
    let li = document.createElement("li");
    li.textContent = song.title;
    li.classList.add("play-item");
    li.setAttribute("data-id", `${loopCount}`);
    li.addEventListener("click", (e) => {
      songTitle.textContent = songs[li.getAttribute("data-id")].title;
      audio.src = songs[li.getAttribute("data-id")].src;

      audio.currentTime = 0;
      audio.play();
      playBtn.classList.add("pause");
      songNum = parseInt(li.getAttribute("data-id"));
      if (!isPlay) {
        isPlay = !isPlay;
      }
    });
    li.addEventListener("click", itemActiveIcon);
    playList.append(li);
    loopCount++;
  });
}
function updateProgressBar(event) {
  const { currentTime, duration } = event.srcElement;
  const progressPersent = (currentTime / duration) * 100;
  progress.style.width = `${Math.round(progressPersent * 1.6)}px`;
  updateProgressTime(currentTime, duration);
}

function updateProgressTime(time, duration) {
  time = Math.round(time);
  duration = Math.round(duration);
  let seconds = 0;
  let minutes = 0;

  minutes = Math.floor(time / 60);
  seconds = time - 60 * minutes;
  if (String(seconds).length === 1) {
    seconds = "0" + String(seconds);
  } else {
    seconds = String(seconds);
  }
  progressTime.textContent = `${minutes}:${seconds} / ${Math.floor(
    duration / 60
  )}:${duration % 60}`;
}

function setProgress(event) {
  const width = this.clientWidth;
  const clickX = event.offsetX;
  progress.style.width = `${clickX}px`;
  audio.pause();
  audio.currentTime = (audio.duration * clickX) / 160;
  audio.play();
}
function adjustVolume(event) {
  const containerWidth = 60;
  const clickX = event.offsetX;
  const audioVol = clickX / containerWidth;
  volume.style.width = `${clickX}px`;
  audio.volume = audioVol;
  modifyImage();
}
function modifyImage() {
  if (audio.volume === 0) {
    volumeBtn.style.backgroundImage = `url("../assets/svg/volume-off.svg")`;
  } else if (audio.volume < 0.6) {
    volumeBtn.style.backgroundImage = `url("../assets/svg/volume-mid.svg")`;
  } else {
    volumeBtn.style.backgroundImage = `url("../assets/svg/volume-high.svg")`;
  }
}
function mute() {
  if (audio.volume != 0) {
    volumeStorage = audio.volume;
    audio.volume = 0;
    volume.style.width = "0px";
    modifyImage();
  } else {
    audio.volume = volumeStorage;
    volume.style.width = `${60 * volumeStorage}px`;
    modifyImage();
  }
}
function itemActiveIcon() {
  let listItem = document.querySelector(`[data-id="${songNum}"]`);
  let items = document.querySelectorAll("[data-id]");

  items.forEach((item) => {
    if (item.classList.contains("item-active")) {
      item.classList.remove("item-active");
    }
  });
  listItem.classList.add("item-active");

  listItem.classList.add("item-active");
}
let volumeStorage = 0;
let isPlay = false;
let songNum = 0;

export {
  audio,
  playAudio,
  prevAudio,
  nextAudio,
  makePlayList,
  updateProgressBar,
  setProgress,
  adjustVolume,
  mute,
  itemActiveIcon,
};
