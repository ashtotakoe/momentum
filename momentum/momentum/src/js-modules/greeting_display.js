import { isEng } from "..";
const greeting = {
  showGreeting: function () {
    const greetingDisplay = document.querySelector(".greeting");

    if (isEng) {
      greetingDisplay.textContent = `Good ${getTimeOfDay()},`;
    } else {
      greetingDisplay.textContent = `${getTimeOfDay()},`;
    }

    setTimeout(showGreeting, 1000);
  },
  getTimeOfDay: function () {
    const date = new Date();
    const hours = date.getHours();
    // 0 1 night 1 2 morning 2 3 afternoon 3 4 evening
    const greetings = ["night", "morning", "afternoon", "evening"];
    const rusGreetings = [
      "Спокойной ночи",
      "Доброе утро",
      "Добрый день",
      "Добрый вечер",
    ];
    if (isEng) {
      return greetings[Math.floor(hours / 6)];
    } else {
      return rusGreetings[Math.floor(hours / 6)];
    }
  },
};
export const { showGreeting, getTimeOfDay } = greeting;
