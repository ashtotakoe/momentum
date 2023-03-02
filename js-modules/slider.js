import { getTimeOfDay } from "./greeting_display.js";
let bgNum = getRandomNum();
function getRandomNum() {
  return Math.floor(Math.random() * 20) + 1;
}
function setBg(bgNumber) {
  if (typeof bgNumber === "undefined") {
    bgNumber = bgNum;
  }
  const img = new Image();
  let timeOfDay = getTimeOfDay();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${String(
    bgNumber
  ).padStart(2, "0")}.jpg`;
  img.onload = () => {
    document.querySelector("body").style.backgroundImage = `url(${img.src})`;
  };
}
function getSlideNext() {
  if (bgNum === 20) {
    bgNum = 1;
  } else {
    bgNum++;
  }
  setBg(bgNum);
}
function getSlidePrev() {
  if (bgNum === 1) {
    bgNum = 20;
  } else {
    bgNum--;
  }
  setBg(bgNum);
}

export { setBg, getSlideNext, getSlidePrev };
