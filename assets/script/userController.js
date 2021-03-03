// view

// registration page
let controllerCeckbox = document.getElementById("pData");
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
  fName: document.getElementById("fName"),
  lName: document.getElementById("lName"),
  regEmail: document.getElementById("regEmail"),
  regPass: document.getElementById("regPass"),
  confirm: document.getElementById("confirm"),

  // checkboxes:
  pData: document.getElementById("pData"),
  confidentiality: document.getElementById("confidentiality"),
  offers: document.getElementById("offers"),
  news: document.getElementById("news"),
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
    // show order modal (choose delivery or takeout)
  }
});

// other pages
let loginFields = {
  email: document.getElementById("login-email"),
  pass: document.getElementById("login-pass"),

  rememberPass: document.getElementById("remember-pass"),
};
loginForm.addEventListener("submit", function (ev) {
  isLoggedIn = userStorage.login(
    loginFields.email.value,
    loginFields.pass.value,
    loginFields.rememberPass.checked
  );

  if (isLoggedIn) {
    // TODO: show takeout or delivery modal
    closeAnyModal();
  } else {
    // TODO: show validationg messages
    ev.preventDefault();
  }
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
    let cartNumber = document.getElementById("orderNumber");
    let cartNumberResp = document.getElementById("orderNumberResponsive");
    cartNumber.innerText = numberOfProductsInCart;
    cartNumberResp.innerText = numberOfProductsInCart;
  }
}

cartIcon.addEventListener("click", function() {
  if (!userStorage.loggedInUser) {
    openLoginModal();
  } else {
    // TODO: redirect to cart page
  }
});

cartIconResponsive.addEventListener("click", function() {
  if (!userStorage.loggedInUser) {
    openLoginModal();
  } else {
    // TODO: redirect to cart page
  }
});