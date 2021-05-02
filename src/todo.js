const pendingList = document.getElementById("js-pending"),
  finishedList = document.getElementById("js-finished"),
  form = document.getElementById("js-form"),
  input = form.querySelector("input"),
  pendAndFin = document.querySelector(".pendAndFin"),
  finishedDiv = document.querySelector(".finished"),
  pendingDiv = document.querySelector(".pending");
const PENDING = "PENDING";
const FINISHED = "FINISHED";
const BUTTON_CN = "allBtn";
const HIDE = "hide";

let pendingTasks, finishedTasks;

function getTaskObject(text) {
  return {
    id: String(Date.now()),
    text,
  };
}

function savePendingTask(task) {
  pendingTasks.push(task);
}

function findInFinished(taskId) {
  return finishedTasks.find(function (task) {
    return task.id === taskId;
  });
}

function findInPending(taskId) {
  return pendingTasks.find(function (task) {
    return task.id === taskId;
  });
}

function removeFromPending(taskId) {
  pendingTasks = pendingTasks.filter(function (task) {
    return task.id !== taskId;
  });
}

function removeFromFinished(taskId) {
  finishedTasks = finishedTasks.filter(function (task) {
    return task.id !== taskId;
  });
}

function addToFinished(task) {
  finishedTasks.push(task);
}

function addToPending(task) {
  pendingTasks.push(task);
}

function deleteTask(e) {
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  removeFromFinished(li.id);
  removeFromPending(li.id);
  saveState();
  showClass(input);
  hideClass(pendingDiv);
  hideClass(finishedDiv);
}

function handleFinishClick(e) {
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  const task = findInPending(li.id);
  removeFromPending(li.id);
  showClass(finishedDiv);
  hideClass(pendingDiv);
  addToFinished(task);
  paintFinishedTask(task);
  saveState();
}

function handleBackClick(e) {
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  const task = findInFinished(li.id);
  removeFromFinished(li.id);
  hideClass(finishedDiv);
  showClass(pendingDiv);
  addToPending(task);
  paintPendingTask(task);
  saveState();
}

function buildGenericLi(task) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("i");
  span.innerText = task.text;
  span.classList.add("todoText");
  deleteBtn.className = `far fa-trash-alt`;
  deleteBtn.addEventListener("click", deleteTask);
  li.append(deleteBtn, span);
  li.id = task.id;
  return li;
}

function paintPendingTask(task) {
  const genericLi = buildGenericLi(task);
  const completeBtn = document.createElement("i");
  completeBtn.className = `fas fa-check`;
  // completeBtn.classList.add(BUTTON_CN);
  // completeBtn.innerText = "V";
  completeBtn.addEventListener("click", handleFinishClick);
  genericLi.append(completeBtn);
  pendingList.append(genericLi);
}

function paintFinishedTask(task) {
  const genericLi = buildGenericLi(task);
  const backBtn = document.createElement("i");
  backBtn.className = `fas fa-step-backward`;
  // backBtn.classList.add(BUTTON_CN);
  // backBtn.innerHTML = "🔙";
  backBtn.addEventListener("click", handleBackClick);
  genericLi.append(backBtn);
  finishedList.append(genericLi);
}

function saveState() {
  localStorage.setItem(PENDING, JSON.stringify(pendingTasks));
  localStorage.setItem(FINISHED, JSON.stringify(finishedTasks));
}

function loadState() {
  pendingTasks = JSON.parse(localStorage.getItem(PENDING)) || []; //어레이 메소드를 사용하고있어서, 비었을 경우에도 빈 배열로 초기화
  finishedTasks = JSON.parse(localStorage.getItem(FINISHED)) || [];
  if (pendingTasks.length != 0) {
    hideClass(input);
    showClass(pendingDiv);
  } else if (finishedTasks.length != 0) {
    hideClass(input);
    showClass(finishedDiv);
  }
}

function restoreState() {
  pendingTasks.forEach(function (task) {
    paintPendingTask(task);
  });
  finishedTasks.forEach(function (task) {
    paintFinishedTask(task);
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  const taskObj = getTaskObject(input.value);
  input.value = "";
  hideClass(input);
  hideClass(finishedDiv);
  paintPendingTask(taskObj);
  savePendingTask(taskObj);
  saveState();
  showClass(pendingDiv);
}

function hideClass(thing) {
  thing.classList.add(HIDE);
}
function showClass(thing) {
  thing.classList.remove(HIDE);
}

function init() {
  hideClass(finishedDiv);
  hideClass(pendingDiv);
  form.addEventListener("submit", handleFormSubmit);
  loadState();
  restoreState();
  input.addEventListener("focusout", (event) => {
    event.target.placeholder = "Today's focus";
  });
}
init();
