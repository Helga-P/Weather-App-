let date = new Date();
document.getElementById("date").innerHTML = date.toLocaleDateString();

const apiKey = "b95f179627c8dd37f41e1be6e3250e19";
let units = "metric";
let cityName;
let tempValue = null;
let fahrenheitSymbol = "°F";

function search(event) {
  event.preventDefault();

  cityName = document.querySelector("#search-info").value;
  document.querySelector("h1").innerHTML = cityName;
  let apiUrl =
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=` +
    units;
  let apiUrlForHours = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrlForHours).then(showTempByHours);
}

let form = document.querySelector("#search");
form.addEventListener("submit", search);

function showTemperature(response) {
  tempValue = Math.round(response.data.main.temp);
  document.querySelector("#temp").innerHTML = tempValue;

  let humidity = Math.round(response.data.main.humidity);
  document.querySelector("#humidity").innerHTML = humidity;

  let wind = response.data.wind.speed.toFixed(1);
  document.querySelector("#wind").innerHTML = wind;
}

let weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "April",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

let currentDay = weekday[date.getDay()];
let currentMonth = months[date.getMonth()];
let dayNumb = date.getDate();

let nextDay = `${currentDay + 1} `;

function showTempByHours(response) {
  let TempFirstBlock = Math.round(response.data.list[0].main.temp);
  document.querySelector("#first-temp-block").innerHTML = TempFirstBlock;
  let timeFirstBlock = response.data.list[0].dt;
  let validDateOne = new Date(timeFirstBlock * 1000).getHours();
  document.querySelector("#first-time-block").innerHTML = `${validDateOne}:00`;

  let tempSecondBlock = Math.round(response.data.list[1].main.temp);
  document.querySelector("#second-temp-block").innerHTML = tempSecondBlock;
  let timeSecondBlock = response.data.list[1].dt;
  let validDateTwo = new Date(timeSecondBlock * 1000).getHours();
  document.querySelector("#second-time-block").innerHTML = `${validDateTwo}:00`;

  let tempThirdBlock = Math.round(response.data.list[2].main.temp);
  document.querySelector("#third-temp-block").innerHTML = tempThirdBlock;
  let timeThirdBlock = response.data.list[2].dt;
  let validDateThree = new Date(timeThirdBlock * 1000).getHours();
  document.querySelector(
    "#third-time-block"
  ).innerHTML = `${validDateThree}:00`;
  console.log(response);

  let nextDaysNoonTemp = response.data.list.filter(function (timePoint) {
    let dateTime = timePoint.dt_txt;
    let time = dateTime.split(" ")[1];
    if (time === "12:00:00") {
      return true;
    } else {
      return false;
    }
  });
  console.log(nextDaysNoonTemp);

  let tempNextDay = Math.round(nextDaysNoonTemp[0].main.temp);
  document.querySelector("#next-day-temp").innerHTML = tempNextDay;
  let feelsNextDay = Math.round(nextDaysNoonTemp[0].main.feels_like);
  document.querySelector("#next-day-feels").innerHTML = feelsNextDay;

  let tempThirdDay = Math.round(nextDaysNoonTemp[1].main.temp);
  document.querySelector("#third-day-temp").innerHTML = tempThirdDay;
  let feelsThirdDay = Math.round(nextDaysNoonTemp[1].main.feels_like);
  document.querySelector("#third-day-feels").innerHTML = feelsThirdDay;

  let tempFourthDay = Math.round(nextDaysNoonTemp[2].main.temp);
  document.querySelector("#fourth-day-temp").innerHTML = tempFourthDay;
  let feelsFourthDay = Math.round(nextDaysNoonTemp[2].main.feels_like);
  document.querySelector("#fourth-day-feels").innerHTML = feelsFourthDay;

  let tempFifthDay = Math.round(nextDaysNoonTemp[3].main.temp);
  document.querySelector("#fifth-day-temp").innerHTML = tempFifthDay;
  let feelsFifthDay = Math.round(nextDaysNoonTemp[3].main.feels_like);
  document.querySelector("#fifth-day-feels").innerHTML = feelsFifthDay;

  let tempSixthDay = Math.round(nextDaysNoonTemp[4].main.temp);
  document.querySelector("#sixth-day-temp").innerHTML = tempSixthDay;
  let feelsSixthDay = Math.round(nextDaysNoonTemp[4].main.feels_like);
  document.querySelector("#sixth-day-feels").innerHTML = feelsSixthDay;

  let unixNextDay = nextDaysNoonTemp[0].dt;
  let validNextDayDate = new Date(unixNextDay * 1000);
  let nextDayName = weekday[validNextDayDate.getDay()];
  let nextDayMonth = months[validNextDayDate.getMonth()];
  let nextDayNumb = validNextDayDate.getDate();
  let fullNextDayDate = `${nextDayName}, ${nextDayMonth} ${nextDayNumb}`;
  document.querySelector("#next-day-date").innerHTML = fullNextDayDate;

  let unixThirdDay = nextDaysNoonTemp[1].dt;
  let validThirdDayDate = new Date(unixThirdDay * 1000);
  let thirdDayName = weekday[validThirdDayDate.getDay()];
  let thirdDayMonth = months[validThirdDayDate.getMonth()];
  let thirdDayNumb = validThirdDayDate.getDate();
  let fullThirdDayDate = `${thirdDayName}, ${thirdDayMonth} ${thirdDayNumb}`;
  document.querySelector("#third-day").innerHTML = fullThirdDayDate;

  let unixFourthDay = nextDaysNoonTemp[2].dt;
  let validFourthDayDate = new Date(unixFourthDay * 1000);
  let fourthDayName = weekday[validFourthDayDate.getDay()];
  let fourthDayMonth = months[validFourthDayDate.getMonth()];
  let fourthDayNumb = validFourthDayDate.getDate();
  let fullFourthDayDate = `${fourthDayName}, ${fourthDayMonth} ${fourthDayNumb}`;
  document.querySelector("#fourth-day").innerHTML = fullFourthDayDate;

  let unixFifthDay = nextDaysNoonTemp[3].dt;
  let validFifthDayDate = new Date(unixFifthDay * 1000);
  let fifthDayName = weekday[validFifthDayDate.getDay()];
  let fifthDayMonth = months[validFifthDayDate.getMonth()];
  let fifthDayNumb = validFifthDayDate.getDate();
  let fullFifthDayDate = `${fifthDayName}, ${fifthDayMonth} ${fifthDayNumb}`;
  document.querySelector("#fifth-day").innerHTML = fullFifthDayDate;

  let unixSixthDay = nextDaysNoonTemp[4].dt;
  let validSixthDayDate = new Date(unixSixthDay * 1000);
  let sixthDayName = weekday[validSixthDayDate.getDay()];
  let sixthDayMonth = months[validSixthDayDate.getMonth()];
  let sixthDayNumb = validSixthDayDate.getDate();
  let fullSixthDayDate = `${sixthDayName}, ${sixthDayMonth} ${sixthDayNumb}`;
  document.querySelector("#sixth-day").innerHTML = fullSixthDayDate;
}

function showTempByGeo(response) {
  tempValue = Math.round(response.data.main.temp);
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

function showFahrenheitTemp(event) {
  event.preventDefault();
  // let tempToFahrenheit = Math.round((tempValue * 9) / 5 + 32);
  // let tempElement = document.querySelector("#temp");
  // tempElement.innerHTML = tempToFahrenheit;
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let unitsSymbols = document.querySelectorAll(".units-symbol");
  if (units === "metric") {
    units = "imperial";
    allTemperatures.forEach(function (tempHtmlElement) {
      let temp = parseInt(tempHtmlElement.innerHTML);
      let tempFahrenheit = (temp * 9) / 5 + 32;
      tempHtmlElement.innerHTML = tempFahrenheit;
    });
    unitsSymbols.forEach(function (element) {
      element.innerHTML = fahrenheitSymbol;
    });
  }
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = tempValue;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

let allTemperatures = document.querySelectorAll(".temp-value");
