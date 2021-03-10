function openAnyModal() {
  body.classList.add("modal-open");
  modalBackdrop.classList.add("in");
  modalBackdrop.style.visibility = "visible";
  popupModal.classList.add("in");
  popupModal.style.visibility = "visible";
}

function closeAnyModal() {
  body.classList.remove("modal-open");
  modalBackdrop.classList.remove("in");
  modalBackdrop.style.visibility = "hidden";
  popupModal.classList.remove("in");
  popupModal.style.visibility = "hidden";
}

function openLoginModal(
  toOpenDeliveryModal = true,
  toOpenRestaurantModal = true
) {
  openAnyModal();
  loadTemplate("modals/loginModal.hbs", modalContentContainer).then(() => {
    changeElementVisibility(modalCurvedBorder, false);
    let loginFields = {
      email: getById("login-email"),
      pass: getById("login-pass"),

      rememberPass: getById("remember-pass"),
    };
    const loginForm = getById("loginForm");
    loginForm.addEventListener("submit", function (ev) {
      isLoggedIn = userStorage.login(
        loginFields.email.value,
        loginFields.pass.value,
        loginFields.rememberPass.checked
      );

      ev.preventDefault();

      if (isLoggedIn) {
        if (toOpenDeliveryModal) {
          openDeliveryModal(toOpenRestaurantModal);
        } else {
          closeAnyModal();
        }
      } else {
        // TODO: show validationg messages
      }
    });
  });
}

function openDeliveryModal(toOpenRestaurantModal) {
  openAnyModal();
  loadTemplate("modals/deliveryModal.hbs", modalContentContainer).then(() => {
    changeElementVisibility(modalCurvedBorder, false);
    const choices = [getById("deliveryChoice"), getById("takeoutChoice")];

    choices.forEach((option) => {
      option.addEventListener("click", function (event) {
        event.target.id === "deliveryChoice"
          ? userStorage.setDeliveryChoice(true)
          : userStorage.setDeliveryChoice(false);

        toOpenRestaurantModal ? openRestaurantModal() : closeAnyModal();
      });
    });
  });
}

function openRestaurantModal() {
  openAnyModal();
  loadTemplate("modals/restaurantModal.hbs", modalContentContainer, {
    ...ALL_RESTAURANTS,
  }).then(() => {
    changeElementVisibility(modalCurvedBorder, true);
    const selectRestaurant = getById("selectRestaurant");
    selectRestaurant.addEventListener("change", function (event) {
      let restaurant = event.target.value;
      if (restaurant !== "empty") {
        let restaurantIndex = parseInt(restaurant);
        userStorage.setRestaurant(restaurantIndex);
        closeAnyModal();
      }
    });
  });
}

closeModal.addEventListener("click", closeAnyModal);
popupModal.addEventListener("click", closeAnyModal);
modalBackdrop.addEventListener("click", closeAnyModal);
modalContent.addEventListener("click", function (event) {
  event.stopPropagation();
});
