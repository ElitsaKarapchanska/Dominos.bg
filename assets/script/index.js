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
  let telefonNumber=document.getElementById('telText');
  telefonNumber.classList.toggle('visible');
}
function createFixedNavbar(){
  let headerNavbar=document.getElementById('navbar-default1');
  let fixed=headerNavbar.offsetTop;
  let logoImage=document.getElementById('whiteLogo');
  let logoImageBlue=document.getElementById('blueLogo');
  if(window.pageYOffset > fixed)
  {
  headerNavbar.classList.add('navbar-default');
  logoImage.style.display='none';
  logoImageBlue.style.display='inline';
  }
  else{
    headerNavbar.classList.remove('navbar-default');
    logoImage.style.display='inline';
    logoImageBlue.style.display='none';
  }
  
}
window.addEventListener('scroll', createFixedNavbar);
document.getElementById('faIcon').addEventListener('click', openResponsiveNavBar);
window.addEventListener("DOMContentLoaded", () =>
  showLoadingScreen(loadingScreen)
);
window.addEventListener("hashchange", () => showLoadingScreen(loadingScreen));
