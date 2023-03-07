export function showSettings() {
  const settingsPopUp = document.querySelector(".settings-popup");
  settingsPopUp.classList.toggle("hidden");
  this.classList.toggle("clicked");
}

export function setSettings(event) {
  const elems = [
    "time",
    "date",
    "greeting-container",
    "quote-container",
    "weather",
    "player",
    "translate-buttons",
  ];
  const targetElem = document.querySelector(
    `.${elems[this.getAttribute("data-id")]}`
  );
  targetElem.classList.toggle("hidden");
}
