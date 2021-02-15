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
function openResponsiveNavBar(){
  let container=document.getElementById('navbar-rightt');
  container.classList.toggle('navbar-right-right');
  console.log(container);
  let telefonNumber=document.getElementById('telText');
  telefonNumber.classList.toggle('visible');
  
}

document.getElementById('faIcon').addEventListener('click', openResponsiveNavBar);
window.addEventListener("DOMContentLoaded", () =>
  showLoadingScreen(loadingScreen)
);
window.addEventListener("hashchange", () => showLoadingScreen(loadingScreen));
