let currentDate = document.querySelector("#date");

function replaceDate() {
  let date = new Date();

  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let weekDay = weekDays[date.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];

  let day = date.getDate();
  let year = date.getFullYear();

  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let time = `${hour}:${minute}`;
  let currentDay = `${weekDay}, ${month} ${day}, ${year}`;

  currentDate.innerHTML = `${currentDay} ${time}`;
}

replaceDate();

let searchForm = document.querySelector("#search");

function replaceCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  let place = document.querySelector("#place");
  place.innerHTML = `${city.value}`;

  let apiKey = "4c9b53e4f8f5eb00df5915bdca340605";

  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather/?q=";

  let unit = "metric";

  let apiUrl = `${apiEndpoint}${city.value}&appid=${apiKey}&units=${unit}`;
  apiUrl = apiUrl.replace(" ", "+");
  console.log(apiUrl);

  function showCurrent(response) {
    let current = Math.round(response.data.main.temp);
    console.log(current);
    let currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = `${current}º C`;
  }

  axios.get(apiUrl).then(showCurrent);
}

searchForm.addEventListener("submit", replaceCity);

let currentLocation = document.querySelector("#current-lo");

function currentLocationWeather(event) {
  function localWeather(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    let apiKey = "4c9b53e4f8f5eb00df5915bdca340605";

    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";

    let unit = "metric";

    let apiUrlLocal = `${apiEndpoint}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;

    function currentCity(response) {
      let localCity = response.data.name;
      console.log(response.data.name);
      let temp = Math.round(response.data.main.temp);
      let city = document.querySelector("#place");
      let currentTemp = document.querySelector("#current-temp");

      city.innerHTML = localCity;
      currentTemp.innerHTML = `${temp}º C`;
    }

    axios.get(apiUrlLocal).then(currentCity);
  }

  navigator.geolocation.getCurrentPosition(localWeather);
}

currentLocation.addEventListener("click", currentLocationWeather);
