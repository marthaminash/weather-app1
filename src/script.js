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
    console.log(response);
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

    let weatherEmoji = document.querySelector("#weather-emoji-picture");
    let currentWeatherDescription = response.data.weather[0].main;
    let readyWeatherDescription = currentWeatherDescription.trim();
    
    if(readyWeatherDescription === "Thunderstorm"){
        weatherEmoji.setAttribute("src", "img/Thunderstorm.png")
    }else if (readyWeatherDescription === "Drizzle"){
        weatherEmoji.setAttribute("src", "img/Drizzle.png")
    }else if (readyWeatherDescription === "Rain"){
        weatherEmoji.setAttribute("src", "img/Rain.png")
    }else if (readyWeatherDescription === "Snow"){
        weatherEmoji.setAttribute("src", "img/Snow.png")
    }else if (readyWeatherDescription === "Mist" || readyWeatherDescription === "Smoke" || readyWeatherDescription === "Haze"
    || readyWeatherDescription === "Dust" || readyWeatherDescription === "Fog" || readyWeatherDescription === "Sand" || 
    readyWeatherDescription === "Ash" || readyWeatherDescription === "Squall" || readyWeatherDescription === "Tornado"){
        weatherEmoji.setAttribute("src", "img/Mist.png")
    }else if (readyWeatherDescription === "Clear"){
        weatherEmoji.setAttribute("src", "img/Clear.png")
    }else if (readyWeatherDescription === "Clouds"){
        weatherEmoji.setAttribute("src", "img/Clouds.png")
    }

    celsiusTemperature = response.data.main.temp;
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

function displayFahrenheitTemperature(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#current-temperature-value");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = Math.round((celsiusTemperature * 9/5) + 32);
    temperatureElement.innerHTML = fahrenheitTemperature;
    let currentUnitSign = document.querySelector("#current-unit-sign");
    currentUnitSign.innerHTML = "°F";
}

function displayCelsiusTemperature(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#current-temperature-value");
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    let currentUnitSign = document.querySelector("#current-unit-sign");
    currentUnitSign.innerHTML = "°C";
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");