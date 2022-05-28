/*Day and Time*/

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#day-hour");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "8adbbd0d7569023dba5ab7e20a2e5cd6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function search(city) {
  let apiKey = "8adbbd0d7569023dba5ab7e20a2e5cd6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML =
    response.data.name + ", " + response.data.sys.country;
  document.querySelector("#current-temperature-value").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#highest-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#lowest-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#pressure").innerHTML =
    response.data.main.pressure / 100;
}

function searchCityFunction(event) {
  event.preventDefault();
  let city = document.querySelector("#search-form").value;
  search(city);
}

let citySearchForm = document.querySelector(".input-group");
citySearchForm.addEventListener("submit", searchCityFunction);

let currentLocationButton = document.querySelector(".current-location-btn");
currentLocationButton.addEventListener("click", displayCurrentLocation);

search("New York");
