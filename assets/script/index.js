let body = document.body;
let loadingScreen = document.getElementById("loadingScreen");
let allPages = [
  document.getElementById("homePage"),
  document.getElementById("allDealsPage"),
  document.getElementById("allPizzasPage"),
  document.getElementById("allStartersPage"),
  document.getElementById("allChickenPage"),
  document.getElementById("allPastaPage"),
  document.getElementById("allSaladsPage"),
  document.getElementById("allSandwichPage"),
  document.getElementById("allSaucesPage"),
  document.getElementById("allDessertsPage"),
  document.getElementById("allDrinksPage"),
  document.getElementById("registrationPage"),
];
let errorPage = document.getElementById("errorPage");
let menuPage = document.getElementById("menuPage");
let controllerCeckbox = document.getElementById("pData");
let hiddentCheckboxes = Array.from(
  document.querySelectorAll(".hiddenCheckbox")
);

function showPage() {
  let currentPage = location.hash.slice(1);
  if (currentPage === "") currentPage = "home";
  let anyPageWasShown = false;
  allPages.forEach((page) => {
    if (page.id === currentPage + "Page") {
      anyPageWasShown = true;
      page.style.display = "block";
      errorPage.style.display = "none";
      //   if (page.id.includes("all"))   meaning that the page a menu page -> show the menu navigation and the filters for the category
    } else {
      page.style.display = "none";
    }
  });
    if (!anyPageWasShown) errorPage.style.display = "flex";
}

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

function fadeElement(element, startOpacity = 1, endOpacity = 0) {
  if (startOpacity === endOpacity) return;
  if (startOpacity > endOpacity) startOpacity -= 0.05;
  if (startOpacity < endOpacity) startOpacity += 0.05;
  element.style.opacity = startOpacity;
  requestAnimationFrame(() =>
    fadeElement(element, startOpacity, endOpacity)
  );
}

window.addEventListener("DOMContentLoaded", () => {
  showLoadingScreen(loadingScreen);
  showPage();
});

window.addEventListener("hashchange", () => {
  showLoadingScreen(loadingScreen);
  showPage();
});

controllerCeckbox.addEventListener("change", (event) => {
  console.log(event.target.checked);
  if (event.target.checked) {
    hiddentCheckboxes.forEach((checkbox) => {
      checkbox.style.display = "flex";
      checkbox.classList.add('flex');
      fadeElement(checkbox, 0, 1);
    });
  } else {
    hiddentCheckboxes.forEach((checkbox) => {
      checkbox.style.display = "none";
    });
  }
});
