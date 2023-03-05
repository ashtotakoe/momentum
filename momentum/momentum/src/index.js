import { showTime, showDate } from "./js-modules/time_display.js";
import { showGreeting, getTimeOfDay } from "./js-modules/greeting_display.js";
import { getSlideNext, getSlidePrev, setBg } from "./js-modules/slider.js";
import { getWeather } from "./js-modules/weather.js";
import { getQuote } from "./js-modules/quote.js";
import {
  audio,
  prevAudio,
  nextAudio,
  playAudio,
  makePlayList,
  updateProgressBar,
  setProgress,
  adjustVolume,
  mute,
  itemActiveIcon,
} from "./js-modules/audio.js";
import { setSettings, showSettings } from "./js-modules/settings.js";
import songs from "./js-modules/play_list.js";

let body = document.querySelector("body");
let name = document.querySelector(".name");

function setLocalStorage() {
  localStorage.setItem("name", name.value);
  localStorage.setItem("city", cityDisplay.value);
}
function getLocalStorage() {
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
    if (name.value === "[Enter name]") {
      name.style.color = "#ab9b9b";
    }
  } else {
    name.value = "[Enter name]";
    name.style.color = "#ab9b9b";
  }
  if (localStorage.getItem("city")) {
    cityDisplay.value = localStorage.getItem("city");
  } else {
    cityDisplay.value = "Minsk";
  }
}

export let isEng = true;

document.querySelector(".rus").addEventListener("click", () => {
  //translation buttons
  isEng = false;
  getWeather();
});
document.querySelector(".eng").addEventListener("click", () => {
  isEng = true;
  getWeather();
});

showTime();
showGreeting();

window.addEventListener("beforeunload", setLocalStorage);
let clickCount = 0;
name.addEventListener("click", () => {
  if (clickCount === 0) {
    name.value = "";
    name.style.color = "#fff";
  }
  clickCount++;
});
window.addEventListener("load", getLocalStorage);

setBg();

document.querySelector(".slide-next").addEventListener("click", getSlideNext);
document.querySelector(".slide-prev").addEventListener("click", getSlidePrev);

const cityDisplay = document.querySelector(".city");
window.addEventListener("load", getWeather);
cityDisplay.addEventListener("change", getWeather);

const changeQuoteBtn = document.querySelector(".change-quote");
getQuote();
changeQuoteBtn.addEventListener("click", getQuote);

const prevBtn = document.querySelector(".play-prev");
const playBtn = document.querySelector(".play");
const nextBtn = document.querySelector(".play-next");
const progressContainer = document.querySelector(".progress-container");
const volumeContainer = document.querySelector(".volume-container");
const volumeBtn = document.getElementById("volume");

makePlayList();

audio.volume = 0.7;

playBtn.addEventListener("click", playAudio);
prevBtn.addEventListener("click", prevAudio);
nextBtn.addEventListener("click", nextAudio);
progressContainer.addEventListener("click", setProgress);
volumeContainer.addEventListener("click", adjustVolume);
volumeBtn.addEventListener("click", mute);

audio.addEventListener("ended", nextAudio);
audio.addEventListener("timeupdate", updateProgressBar);

const settings = document.querySelector(".settings");
settings.addEventListener("click", showSettings);

const settingsPopup = document.querySelector(".settings-popup");
const toggles = document.querySelectorAll(".switch");
let toggleCount = 0;

for (let toggle of toggles) {
  toggle.setAttribute("data-id", `${toggleCount}`);
  toggle.addEventListener("click", () => {
    toggle.classList.toggle("toggled");
  });
  toggle.addEventListener("click", setSettings);
  toggleCount++;
}
const settingsCloseBtn = document.querySelector(".settings-cross");
settingsCloseBtn.addEventListener("click", () => {
  settingsPopup.classList.add("hidden");
});
