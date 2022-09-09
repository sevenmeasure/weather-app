function formatDate(date) {
  var hours = date.getHours();

  if (hours < 10) {
    hours = "0".concat(hours);
  }

  var minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = "0".concat(minutes);
  }

  var dayIndex = date.getDay();
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  var day = days[dayIndex];
  return "".concat(day, " ").concat(hours, ":").concat(minutes);
}

function displayCity(e) {
  e.preventDefault();
  var cityTitle = document.querySelector("#city");
  var cityName = document.querySelector("#cityName");
  cityTitle.innerHTML = cityName.value.trim().toLowerCase();
}

function showTemp(response) {
  let temp = document.querySelector("#temp");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  temp.innerHTML = `${Math.round(response.data.main.temp)}`;
  wind.innerHTML = `${response.data.wind.speed} km/h`;
  humidity.innerHTML = `${response.data.main.humidity} %`;
}

function searchWeather() {
  let apiKey = "8678ae192384fc42897c60c124159d58";
  let cityName = document.querySelector("#cityName");
  let city = cityName.value;
  city = city.trim().toLowerCase();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

var search = document.querySelector("#search-form");
search.addEventListener("submit", displayCity);
search.addEventListener("submit", searchWeather);

var dateElement = document.querySelector("#date");
var currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function showCurrLocTemp(response) {
  let temp = document.querySelector("#temp");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  temp.innerHTML = `${Math.round(response.data.main.temp)}`;
  wind.innerHTML = `${response.data.wind.speed} km/h`;
  humidity.innerHTML = `${response.data.main.humidity} %`;
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let unit = "metric";
  let key = `8678ae192384fc42897c60c124159d58`;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${key}`;
  axios.get(url).then(showCurrLocTemp);
}

function findLocation(e) {
  e.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let locationButton = document.querySelector(".btn-current");
locationButton.addEventListener("click", findLocation);
