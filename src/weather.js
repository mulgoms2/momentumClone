const weatherTag = document.querySelector(".js-weather");

const COORDS = "coords";
const API_KEY = "6159b7632c7cd1ebbddd00bbdbee5818";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const temp = json.main.temp,
        city = json.name,
        wind = json.wind.speed;
      weatherTag.innerText = `${temp}°C  @  ${city} 💨${wind}m/s`;
    }); //then make wait fetching finished
}

function saveGeoLocation(locationObj) {
  localStorage.setItem(COORDS, JSON.stringify(locationObj));
}

function handleGeoSucess(position) {
  const latitude = position.coords.latitude,
    longitude = position.coords.longitude,
    locationObj = {
      latitude,
      longitude, // same as longitude = longitude;
    };
  saveGeoLocation(locationObj);
  getWeather(latitude, latitude);
}

function handleGeoError() {
  console.log("fail to get Geo Location");
}

function askGeoLocation() {
  const geoLocation = navigator.geolocation.getCurrentPosition(
    handleGeoSucess,
    handleGeoError
  );
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askGeoLocation();
  } else {
    const locationObj = JSON.parse(loadedCoords),
      lat = locationObj.latitude,
      lon = locationObj.longitude;
    getWeather(lat, lon);
  }
}

function weatherInit() {
  loadCoords();
}

weatherInit();
