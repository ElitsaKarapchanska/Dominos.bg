const body = document.body;
const loadingScreen = getById("loadingScreen");
const allPages = {
  homePage: getById("homePage"),
  allDealsPage: getById("allDealsPage"),
  allPizzasPage: getById("allPizzasPage"),
  allStartersPage: getById("allStartersPage"),
  allChickenPage: getById("allChickenPage"),
  allPastaPage: getById("allPastaPage"),
  allSaladsPage: getById("allSaladsPage"),
  allSandwichPage: getById("allSandwichPage"),
  allSaucesPage: getById("allSaucesPage"),
  allDessertsPage: getById("allDessertsPage"),
  allDerinksPage: getById("allDrinksPage"),
  registrationPage: getById("registrationPage"),
  complexProductPage: getById("complexProductPage"),
};
const errorPage = getById("errorPage");
const menuPage = getById("menuPage");
const placeholderDiv = getById("placeholder");
const header = document.querySelector("header");
const footer = document.querySelector("footer");

const userIcon = getById("loggedIn");
const menuLink = getById("menu");
const orderNowBtn = getById("orderNowBtn");
const cartIcon = getById("cartIcon");
const cartIconResponsive = getById("cartIconResponsive");
const registrationForm = getById("registrationForm");

// modals
const popupModal = getById("popupModal");
const modalContent = getById("modalContent");
const modalBackdrop = getById("modalBackdrop");
const closeModal = getById("closeModal");
const loginForm = getById("loginForm");