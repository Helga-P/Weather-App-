let dt = new Date();
document.getElementById("date").innerHTML = dt.toLocaleDateString();

const apiKey = "b95f179627c8dd37f41e1be6e3250e19";
let units = "metric";
let cityName;

function search(event) {
  event.preventDefault();

  cityName = document.querySelector("#search-info").value;
  document.querySelector("h1").innerHTML = cityName;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  let apiUrlForHours = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrlForHours).then(showTempByHours);
}

let form = document.querySelector("#search");
form.addEventListener("submit", search);

function showTemperature(response) {
  let tempValue = Math.round(response.data.main.temp);
  document.querySelector("#temp").innerHTML = tempValue;

  let humidity = Math.round(response.data.main.humidity);
  document.querySelector("#humidity").innerHTML = humidity;

  let wind = response.data.wind.speed.toFixed(1);
  document.querySelector("#wind").innerHTML = wind;
}

function showTempByHours(response) {
  let TempFirstBlock = Math.round(response.data.list[0].main.temp);
  document.querySelector("#first-temp-block").innerHTML = TempFirstBlock;
  let timeFirstBlock = response.data.list[0].dt;
  let validDateOne = new Date(timeFirstBlock * 1000).getHours();
  document.querySelector("#first-time-block").innerHTML = `${validDateOne}:00`;
}

function showTempByGeo(response) {
  let tempValue = Math.round(response.data.main.temp);
  document.querySelector("#temp").innerHTML = tempValue;
  let humidity = Math.round(response.data.main.humidity);
  document.querySelector("#humidity").innerHTML = humidity;
  let wind = response.data.wind.speed.toFixed(1);
  document.querySelector("#wind").innerHTML = wind;
}

function getCoordinats(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiCoordinatsUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiCoordinatsUrl).then(showTempByGeo);
  document.querySelector("#city").innerHTML =
    "Location: " + lon.toFixed(2) + "  " + lat.toFixed(2);
}

function allowCordinats() {
  navigator.geolocation.getCurrentPosition(getCoordinats);
}

let geoBtn = document.querySelector("#get-geo");
geoBtn.addEventListener("click", allowCordinats);
