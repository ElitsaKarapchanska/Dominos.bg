function showPage() {
  let currentPage = location.hash.slice(1);
  if (currentPage === "") {
    currentPage = "home";
  }

  // placholder for behind the menu so that the space for it is not taken by the main, has display none on home page
  if (currentPage === "home") {
    changeElementVisibility(placeholderDiv, false);
    changeElementVisibility(shadowDiv);
    window.addEventListener("scroll", createFixedNavbar);
    showTransparentHeader();
  } else {
    changeElementVisibility(placeholderDiv);
    changeElementVisibility(shadowDiv, false);
    window.removeEventListener("scroll", createFixedNavbar);
    showWhiteHeader();
  }
  let noPageWasShown = true;

  changeElementVisibility(userIcon, userStorage.loggedInUser);
  changeElementVisibility(menuLink, !userStorage.loggedInUser);
  changeElementVisibility(orderNowBtn, true, "list-item");

  for (let page in allPages) {
    if (allPages[page].id === currentPage + "Page") {
      noPageWasShown = false;
      changeElementVisibility(allPages[page]);
      cartIcon.classList.replace("block", "hidden");

      if (allPages[page].id.includes("all")) {
        // meaning that the page a menu page -> show the menu navigation and the filters for the category
        changeElementVisibility(allPages[page], true, "grid");
        cartIcon.classList.replace("hidden", "block");
        changeElementVisibility(orderNowBtn, false);
        changeElementVisibility(nav); // show menu
      } else {
        changeElementVisibility(nav, false);
      }
    } else {
      changeElementVisibility(allPages[page], false);
    }
  }

  if (currentPage.includes("product")) {
    showCard(currentPage);
    allPages.complexProductPage.style.display = "block";
    header.style.display = "none"; // can be change;
    footer.style.display = "none";
    placeholderDiv.style.display = "none";
    noPageWasShown = false;
    changeElementVisibility(nav, false); // hide menu
  } else {
    header.style.display = "block"; // can be change;
    footer.style.display = "block";
  }

  if (currentPage === "checkout") {
    checkoutController();
    noPageWasShown = false;
  } else {
    changeElementVisibility(checkoutPage, false);
  }

  if (noPageWasShown) {
    changeElementVisibility(errorPage, true, "flex");
    cartIcon.classList.replace("block", "hidden");
  } else {
    changeElementVisibility(errorPage, false);
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
  let container = getById("navbar-rightt");
  container.classList.toggle("navbar-right-right");
  let telefonNumber = getById("telText");
  telefonNumber.classList.toggle("visible");
}

function createFixedNavbar() {
  let fixed = headerNavbar.offsetTop;

  if (window.pageYOffset > fixed) {
    showWhiteHeader();
  } else {
    showTransparentHeader();
  }
}

function showTransparentHeader() {
  headerNavbar.classList.remove("navbar-default");
  logoImage.style.display = "inline";
  logoImageBlue.style.display = "none";
  greytel.style.display = "none";
  whitetel.style.display = "inline";
}

function showWhiteHeader() {
  headerNavbar.classList.add("navbar-default");
  logoImage.style.display = "none";
  logoImageBlue.style.display = "inline";
  greytel.style.display = "inline";
  whitetel.style.display = "none";
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
    let cartNumber = getById("orderNumber");
    let cartNumberResp = getById("orderNumberResponsive");
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
  closeAnyModal();
  showLoadingScreen(loadingScreen);
  showPage();
});
