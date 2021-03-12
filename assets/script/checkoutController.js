function checkoutController() {
  loadTemplate("checkoutPage.hbs", checkoutPage, userStorage.loggedInUser.cart);
}
