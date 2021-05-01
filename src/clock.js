const clockDiv = document.querySelector(".js-clockContainer"),
  clock = clockDiv.querySelector(".js-clock"),
  calendar = document.querySelector(".js-calendar"),
  options = { weekday: "long", month: "short", day: "numeric" };

function time() {
  const today = new Date(),
    hours = today.getHours(),
    minutes = today.getMinutes(),
    seconds = today.getSeconds();

  // calendar.innerHTML = today.toLocaleDateString("kr", options);

  clock.innerHTML = `${hours < 10 ? `0${hours}` : hours} : ${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
}

function init() {
  setInterval(time, 1000);
}
init();
