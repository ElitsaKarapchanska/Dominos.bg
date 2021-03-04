const body = document.body;
const loadingScreen = document.getElementById("loadingScreen");
const allPages = {
  homePage: document.getElementById("homePage"),
  allDealsPage: document.getElementById("allDealsPage"),
  allPizzasPage: document.getElementById("allPizzasPage"),
  allStartersPage: document.getElementById("allStartersPage"),
  allChickenPage: document.getElementById("allChickenPage"),
  allPastaPage: document.getElementById("allPastaPage"),
  allSaladsPage: document.getElementById("allSaladsPage"),
  allSandwichPage: document.getElementById("allSandwichPage"),
  allSaucesPage: document.getElementById("allSaucesPage"),
  allDessertsPage: document.getElementById("allDessertsPage"),
  allDerinksPage: document.getElementById("allDrinksPage"),
  registrationPage: document.getElementById("registrationPage"),
  complexProductPage: document.getElementById("complexProductPage"),
};
const errorPage = document.getElementById("errorPage");
const menuPage = document.getElementById("menuPage");
const placeholderDiv = document.getElementById("placeholder");
const header = document.querySelector("header");
const footer = document.querySelector("footer");

const userIcon = document.getElementById("loggedIn");
const menuLink = document.getElementById("menu");
const orderNowBtn = document.getElementById("orderNowBtn");
const cartIcon = document.getElementById("cartIcon");
const cartIconResponsive = document.getElementById("cartIconResponsive");
const registrationForm = document.getElementById("registrationForm");

// modals
const popupModal = document.getElementById("popupModal");
const modalContent = document.getElementById("modalContent");
const modalBackdrop = document.getElementById("modalBackdrop");
const closeModal = document.getElementById("closeModal");
const loginForm = document.getElementById("loginForm");