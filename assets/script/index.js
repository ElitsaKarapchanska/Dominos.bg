function showPage() {
  let currentPage = location.hash.slice(1);
  if (currentPage === "") currentPage = "home";
  // placholder for behind the menu so that the space for it is not taken by the main, has display none on home page
  currentPage === "home"
    ? (placeholderDiv.style.display = "none")
    : (placeholderDiv.style.display = "block");
  let noPageWasShown = true;

  changeElementVisibility(userIcon, userStorage.loggedInUser);
  changeElementVisibility(menuLink, !userStorage.loggedInUser);

  for (let page in allPages) {
    if (allPages[page].id === currentPage + "Page") {
      noPageWasShown = false;
      allPages[page].style.display = "block";
      errorPage.style.display = "none";
      // changeElementVisibility(cartIcon, false);
      cartIcon.classList.replace("block", "hidden");
      if (allPages[page].id.includes("all")) {
        // meaning that the page a menu page -> show the menu navigation and the filters for the category
        allPages[page].style.display = "grid";
        // changeElementVisibility(cartIcon);
        cartIcon.classList.replace("hidden", "block");
      }
    } else {
      allPages[page].style.display = "none";
    }
  }
  if (noPageWasShown) {
    errorPage.style.display = "flex";
    cartIcon.classList.replace("block", "hidden");
  }
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
  setTimeout(() => hideLoadingScreen(loadingScreen), 1500);
}

function openResponsiveNavBar() {
  let container = document.getElementById("navbar-rightt");
  container.classList.toggle("navbar-right-right");
  let telefonNumber = document.getElementById("telText");
  telefonNumber.classList.toggle("visible");
}

function createFixedNavbar() {
  let headerNavbar = document.getElementById("navbar-default1");
  let fixed = headerNavbar.offsetTop;
  let logoImage = document.getElementById("whiteLogo");
  let logoImageBlue = document.getElementById("blueLogo");
  let greytel = document.getElementById("greytel");
  let whitetel = document.getElementById("whitetel");
  if (window.pageYOffset > fixed) {
    headerNavbar.classList.add("navbar-default");
    logoImage.style.display = "none";
    logoImageBlue.style.display = "inline";
    greytel.style.display = "inline";
    whitetel.style.display = "none";
  } else {
    headerNavbar.classList.remove("navbar-default");
    logoImage.style.display = "inline";
    logoImageBlue.style.display = "none";
    greytel.style.display = "none";
    whitetel.style.display = "inline";
  }
}
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("images");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

function showInitialNumberOfItemsInCart() {
  if (userStorage.loggedInUser) {
    let numberOfProductsInCart = userStorage.loggedInUser.cart.length;
    let cartNumber = document.getElementById("orderNumber");
    let cartNumberResp = document.getElementById("orderNumberResponsive");
    cartNumber.innerText = numberOfProductsInCart;
    cartNumberResp.innerText = numberOfProductsInCart;
  }
}

window.addEventListener("scroll", createFixedNavbar);
document
  .getElementById("faIcon")
  .addEventListener("click", openResponsiveNavBar);

window.addEventListener("DOMContentLoaded", () => {
  showLoadingScreen(loadingScreen);
  showPage();
  showInitialNumberOfItemsInCart();
});

window.addEventListener("hashchange", () => {
  showLoadingScreen(loadingScreen);
  showPage();
});
