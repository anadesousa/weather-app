function refreshWeather(response) {
  let maxTemperature = document.querySelector("#max-temperature");
  maxTemperature.innerHTML = Math.round(response.data.temperature.current);
  let newCity = document.querySelector("h1");
  newCity.innerHTML = response.data.city;
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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

searchCity("Porto");
