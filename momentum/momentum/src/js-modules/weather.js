import { isEng } from "..";
const weather = {
  getWeather: async function () {
    const weatherIcon = document.querySelector(".weather-icon");
    const temperature = document.querySelector(".temperature");
    const weatherDescription = document.querySelector(".weather-description");
    const windDisplay = document.querySelector(".wind");
    const humidityDisplay = document.querySelector(".humidity");
    const city = document.querySelector(".city");
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=c5a284080e5746c93a0a265e4496d59e&units=metric`;
      if (!isEng) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=c5a284080e5746c93a0a265e4496d59e&units=metric`;
      }
      const response = await fetch(url);
      const data = await response.json();
      weatherIcon.className = "weather-icon owf";
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      if (isEng) {
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        windDisplay.textContent = `Wind speed: ${Math.round(
          data.wind.speed
        )} m/s`;
        humidityDisplay.textContent = `Humidity: ${data.main.humidity}%`;
      } else {
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        windDisplay.textContent = `Скорость ветра: ${Math.round(
          data.wind.speed
        )} м/с`;
        humidityDisplay.textContent = `Влажность: ${data.main.humidity}%`;
      }
    } catch (error) {
      city.value = "City wasn't found";

      weatherIcon.innerHTML = "";
      temperature.textContent = "";
      weatherDescription.textContent = "";
      windDisplay.textContent = "";
      humidityDisplay.textContent = "";
    }
  },
};

export const { getWeather } = weather;
