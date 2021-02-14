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
let menuPage = document.getElementById("menuPage");

function showPage() {
  let currentPage = location.hash.slice(1);
  if (currentPage === "") currentPage = "home";
  let anyPageWasShown = false;
  allPages.forEach((page) => {
    if (page.id === currentPage + "Page") {
      anyPageWasShown = true;
      page.style.display = "block";
      if (page.id.includes("all")) menuPage.style.display = "block";
    } else {
      page.style.display = "none";
    }
  });
  //   if (!anyPageWasShown) show error page
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

window.addEventListener("DOMContentLoaded", () => {
  showLoadingScreen(loadingScreen);
  showPage();
});

window.addEventListener("hashchange", () => {
  showLoadingScreen(loadingScreen);
  showPage();
});
