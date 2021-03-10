// view

// registration page
let controllerCeckbox = getById("pData");
let hiddentCheckboxes = Array.from(
  document.querySelectorAll(".hiddenCheckbox")
);

// fade checkboxes on registration page
controllerCeckbox.addEventListener("change", (event) => {
  if (event.target.checked) {
    hiddentCheckboxes.forEach((checkbox) => {
      checkbox.style.display = "flex";
      checkbox.classList.add("flex");
    });
  } else {
    hiddentCheckboxes.forEach((checkbox) => {
      checkbox.style.display = "none";
    });
  }
});

// functionality

// registration page
let registrationFields = {
  fName: getById("fName"),
  lName: getById("lName"),
  regEmail: getById("regEmail"),
  regPass: getById("regPass"),
  confirm: getById("confirm"),

  // checkboxes:
  pData: getById("pData"),
  confidentiality: getById("confidentiality"),
  offers: getById("offers"),
  news: getById("news"),
};

registrationForm.addEventListener("submit", function (ev) {
  // TODO: show validating messages
  let isRegistered = userStorage.register(
    registrationFields.regEmail.value,
    registrationFields.regPass.value,
    registrationFields.confirm.value,
    registrationFields.fName.value,
    registrationFields.lName.value,
    registrationFields.pData.checked,
    registrationFields.confidentiality.checked,
    registrationFields.offers.checked,
    registrationFields.news.checked
  );
  ev.preventDefault();

  if (isRegistered) {
    userStorage.login(
      registrationFields.regEmail.value,
      registrationFields.regPass.value
    );
    // TODO: show order modal (choose delivery or takeout)
  }
});

// other pages
// let loginFields = {
//   email: getById("login-email"),
//   pass: getById("login-pass"),

//   rememberPass: getById("remember-pass"),
// };
// loginForm.addEventListener("submit", function (ev) {
//   isLoggedIn = userStorage.login(
//     loginFields.email.value,
//     loginFields.pass.value,
//     loginFields.rememberPass.checked
//   );

//   if (isLoggedIn) {
//     // TODO: show takeout or delivery modal
//     closeAnyModal();
//     ev.preventDefault();
//   } else {
//     // TODO: show validationg messages
//     ev.preventDefault();
//   }
// });

userIcon.addEventListener("click", function () {
  profileDropdown.classList.toggle("hidden");
});

// closing the dropdown on click anywhere except the profile icon
window.addEventListener("click", function (event) {
  let toClose = !event.path.some((el) => el.id === "loggedIn");
  if (toClose) {
    profileDropdown.classList.add("hidden");
  }
});

logoutBtn.addEventListener("click", function () {
  userStorage.logout();
  changeElementVisibility(userIcon, userStorage.loggedInUser);
  changeElementVisibility(menuLink, !userStorage.loggedInUser);
});

orderNowBtn.addEventListener("click", function (event) {
  if (!userStorage.loggedInUser) {
    event.preventDefault();
    openLoginModal();
  }
});

// product pages
function addToCartBtn(product, quantity) {
  if (!userStorage.loggedInUser) {
    openLoginModal();
  } else {
    let numberOfProductsInCart = userStorage.addToCart(product, quantity);
    let cartNumber = getById("orderNumber");
    let cartNumberResp = getById("orderNumberResponsive");
    cartNumber.innerText = numberOfProductsInCart;
    cartNumberResp.innerText = numberOfProductsInCart;
  }
}

cartIcon.addEventListener("click", function () {
  if (!userStorage.loggedInUser) {
    openLoginModal();
  } else {
    // TODO: redirect to cart page
  }
});

cartIconResponsive.addEventListener("click", function () {
  if (!userStorage.loggedInUser) {
    openLoginModal();
  } else {
    // TODO: redirect to cart page
  }
});
