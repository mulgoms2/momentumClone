const greetForm = document.querySelector(".js-greeting"),
  nameBox = greetForm.querySelector("input"),
  greetSpan = greetForm.querySelector("span"),
  hello = document.querySelector(".js-hello"),
  clockContainer = document.querySelector(".js-clockContainer"),
  todoList = document.querySelector(".js-todoList");

const GREET_LS = "greet",
  HIDE_CN = "hide";

function askName() {
  clockContainer.classList.add(HIDE_CN);
  todoList.classList.add(HIDE_CN);
  hello.classList.add(HIDE_CN);
  greetSpan.innerHTML = "What is your name?";
  greetForm.addEventListener("submit", handleSubmit);
}

function handleSubmit(e) {
  e.preventDefault();
  const userName = nameBox.value;
  paintGreeting(userName);
  localStorage.setItem(GREET_LS, userName);
}

function paintGreeting(name) {
  greetForm.classList.add(HIDE_CN);
  clockContainer.classList.remove(HIDE_CN);
  todoList.classList.remove(HIDE_CN);
  hello.classList.remove(HIDE_CN);

  hello.innerHTML = `What are you doing Today ${name}`;
}

function loadName() {
  const name = localStorage.getItem(GREET_LS);
  if (name !== null) {
    paintGreeting(name);
  } else {
    askName();
  }
}

function init() {
  loadName();
}

init();
