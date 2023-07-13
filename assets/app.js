const cityInput = document.querySelector("#city");
const cityForm = document.querySelector("#city-search-form");
const citySearchInput = document.querySelector("#searched-city");
const forecastHeading = document.querySelector("#forecast");
const weatherContainer = document.querySelector("#current-weather-container");
const forecastContainer = document.querySelector("#fiveday-container");
const pastSearchButtonEl = document.querySelector("#past-search-buttons");

// Array to hold cities
const cities = [];

// Fetching data from openweathermap
const getCityWeather = function(city) {
  let apiKey = "YOUR_API_KEY";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(apiURL)
    .then(function(response) {
      response.json().then(function(data) {
        displayWeather(data, city);
      });
    });
};

// Event for form submission
const formSubmitHandler = function(event) {
  event.preventDefault();
  let city = cityInput.value.trim();
  if (city) {
    getCityWeather(city);
    cities.unshift({ city });
    cityInput.value = "";
  } else {
    alert("Must enter a city");
  }
  saveSearch();
  prevSearch(city);
};

// Save search with local storage
const saveSearch = function() {
  localStorage.setItem("cities", JSON.stringify(cities));
};

// Function that displays weather information
const displayWeather = function(weather, searchCity) {
  citySearchInput.textContent = searchCity;
  weatherContainer.innerHTML = "";

  let temperatureEl = document.createElement("p");
  temperatureEl.innerHTML = `Temperature: ${weather.main.temp} &#8451;`;
  weatherContainer.appendChild(temperatureEl);

  let humidityEl = document.createElement("p");
  humidityEl.innerHTML = `Humidity: ${weather.main.humidity}%`;
  weatherContainer.appendChild(humidityEl);

  let windSpeedEl = document.createElement("p");
  windSpeedEl.innerHTML = `Wind Speed: ${weather.wind.speed} m/s`;
  weatherContainer.appendChild(windSpeedEl);
};

// Function for previous search
const prevSearch = function(prevSearch) {
  prevSearchEl = document.createElement("button");
  prevSearchEl.textContent = prevSearch;
  prevSearchEl.classList = "btn btn-secondary btn-sm mb-2";
  prevSearchEl.setAttribute("data-city", prevSearch);
  pastSearchButtonEl.prepend(prevSearchEl);
};

// Event handler for previous search
const pastSearchHandler = function(event) {
  let city = event.target.getAttribute("data-city");
  if (city) {
    getCityWeather(city);
  }
};

pastSearchButtonEl.addEventListener("click", pastSearchHandler);
cityForm.addEventListener("submit", formSubmitHandler);
