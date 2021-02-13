let body = document.body;
let loadingScreen = document.getElementById("loadingScreen");

function hideLoadingScreen(loadingScreen) {
  loadingScreen.style.display = "none";
  body.style.overflow = "auto";
  body.style.height = "auto";
}

function showLoadingScreen(loadingScreen) {
  loadingScreen.style.display = "flex";
  body.style.overflow = "hidden";
  body.style.height = "100%";
  setTimeout(() => hideLoadingScreen(loadingScreen), 1000);
}

window.addEventListener("DOMContentLoaded", () =>
  showLoadingScreen(loadingScreen)
);

window.addEventListener("hashchange", () => showLoadingScreen(loadingScreen));
