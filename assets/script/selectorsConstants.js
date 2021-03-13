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
  allDrinksPage: getById("allDrinksPage"),
  registrationPage: getById("registrationPage"),
  complexProductPage: getById("complexProductPage"),
};
const errorPage = getById("errorPage");
const menuPage = getById("menuPage");
const placeholderDiv = getById("placeholder");
const shadowDiv = getById("shadow");
const header = document.querySelector("header");
const footer = document.querySelector("footer");
const nav = getById("menuNav");

const userIcon = getById("loggedIn");
const menuLink = getById("menu");
const orderNowBtn = getById("orderNowBtn");
const cartIcon = getById("cartIcon");
const cartIconResponsive = getById("cartIconResponsive");
const registrationForm = getById("registrationForm");
const profileDropdown = getById("profileDropdown");
const logoutBtn = getById("logoutBtn");

// modals
const popupModal = getById("popupModal");
const modalContent = getById("modalContent");
const modalBackdrop = getById("modalBackdrop");
const closeModal = getById("closeModal");
const loginForm = getById("loginForm");

// header
const headerNavbar = getById("navbar-default1");
const logoImage = getById("whiteLogo");
const logoImageBlue = getById("blueLogo");
const greytel = getById("greytel");
const whitetel = getById("whitetel");

//menu
const activePage = document.querySelectorAll(".main-menu > li");

//filters;
const filteredPizza = getById("filter-pizza");
const filteredStarter =getById("filter-starter");
const filterPasta = getById("filter-pasta");
const filterSauce = getById("filter-sauce");
const filterDessert = getById("filter-dessert");


//product containers
const pizza = getById("pizza-container");
const starter = getById("starter-container");
const pasta = getById("pasta-container");
const sauce = getById("sauce-container");
const dessert = getById("dessert-container");
