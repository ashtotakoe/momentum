import { isEng } from "..";
const time = {
  showTime: function () {
    const timeDisplay = document.querySelector(".time");
    const date = new Date();
    timeDisplay.textContent = date.toLocaleTimeString();
    showDate();

    setTimeout(showTime, 1000);
  },

  showDate: function () {
    const dateDisplay = document.querySelector(".date");
    const date = new Date();
    const options = { weekday: "long", month: "long", day: "numeric" };
    if (isEng) {
      dateDisplay.textContent = date.toLocaleDateString("en-US", options);
    } else {
      dateDisplay.textContent = date.toLocaleDateString("ru-RU", options);
    }
  },
};

export const { showTime, showDate } = time;
