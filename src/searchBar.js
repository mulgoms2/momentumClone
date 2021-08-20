const searchBtn = document.querySelector(".searchBar-button");
const searchInput = document.querySelector(".searchBar-input");

searchBtn.addEventListener("click", (e) => {
  if (searchInput.classList.contains("hide")) {
    showInput();
  } else {
    hideInput();
  }
});

function showInput() {
  searchInput.classList.remove("hide");
}

function hideInput() {
  searchInput.classList.add("fadeOut");
  setTimeout(() => {
    searchInput.classList.add("hide");
    searchInput.classList.remove("fadeOut");
  }, 595);
}
