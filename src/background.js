const body = document.querySelector("body");

const IMG_NUM = 9;

function paintImg(imgNum) {
  const image = new Image();
  image.src = `./src/images/${imgNum}.jpg`;
  image.classList.add("backgroundImg");
  body.appendChild(image);
}

function genRandNum() {
  const randNum = Math.ceil(Math.random() * IMG_NUM);
  return randNum;
}

function init() {
  const randomNumber = genRandNum();
  paintImg(randomNumber);
}

init();
setInterval(init, 600000);
