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
let registrationForm = document.getElementById("registrationForm");
let fields = {
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
    fields.regEmail.value,
    fields.regPass.value,
    fields.confirm.value,
    fields.fName.value,
    fields.lName.value,
    fields.pData.checked,
    fields.confidentiality.checked,
    fields.offers.checked,
    fields.news.checked
  );
  ev.preventDefault();

  if (isRegistered) {
    userStorage.login(fields.regEmail.value, fields.regPass.value);
    // show order modal (choose delivery or takeout)
  }
});

// other pages
orderNowBtn.addEventListener("click", function(event) {
  if (!userStorage.loggedInUser) {
    event.preventDefault();
    // TODO: open login modal
  }
});

// product pages
function addToCartBtn(product, quantity) {
  if (!userStorage.loggedInUser) {
    // TODO: open login modal
  } else {
    let numberOfProductsInCart = userStorage.addToCart(product, quantity);
    let cartNumber = document.getElementById("orderNumber");
    cartNumber.innerText = numberOfProductsInCart;
  }
}