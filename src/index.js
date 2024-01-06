function refreshWeather(response) {
  let maxTemperature = document.querySelector("#max-temperature");
  let newCity = document.querySelector("h1");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector("#weather-icon");

  newCity.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  maxTemperature.innerHTML = `${Math.round(
    response.data.temperature.current
  )}°C`;
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "fob4ff543854365ted34aac90ba53717";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "fob4ff543854365ted34aac90ba53717";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
          <div class="row">
            <div class="col-2">
              <div class="forecast-date">${formatDay(day.time)}</div>
              <img src ="${day.condition.icon_url}" class="forecast-icon"/> 
              <div class="forecast-temperatures">
                <span class="forecast-temperature-max">${Math.round(
                  day.temperature.maximum
                )}°</span>
                <span class="forecast-temperature-min">${Math.round(
                  day.temperature.minimum
                )}°</span>
              </div>
            </div>
          </div>
          `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

searchCity("Porto");
