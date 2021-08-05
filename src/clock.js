const clockDiv = document.querySelector(".js-clockContainer"),
  clock = clockDiv.querySelector(".js-clock"),
  calendar = document.querySelector(".js-calendar"),
  options = { weekday: "long", month: "short", day: "numeric" };

function getTime() {
  const date = new Date(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();

  // calendar.innerHTML = date.toLocaleDateString("kr", options);

  clock.innerHTML = `${hours < 10 ? `0${hours}` : hours} : ${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}
init();
