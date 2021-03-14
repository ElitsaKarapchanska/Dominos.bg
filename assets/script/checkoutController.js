function checkoutController() {
  loadTemplate(
    "checkoutPage.hbs",
    checkoutPage,
    userStorage.loggedInUser.cart.productsWithIDs
  ).then(() => {
    let allQuantityControllerButtons = document.querySelectorAll(
      "#" + checkoutPage.id + " .cart-item .quantity-controller"
    );

    let allRemoveButtons = document.querySelectorAll(
      "#" + checkoutPage.id + " .cart-item .remove-x"
    );

    let backBtn = getById("backBtn");

    let checkOutBtn = getById("checkOutBtn");

    allQuantityControllerButtons.forEach((btn) => {
      btn.addEventListener("click", function (event) {
        let isMinusBtn = event.target.classList.contains("minus");
        let quantityContainer = event.target.parentElement;
        let quantityEl = quantityContainer.children[1];
        let currentQuantity = parseInt(quantityEl.innerText);

        let productUUID = parseInt(
          quantityContainer.parentElement.getAttribute("data-uuid")
        );

        let priceEl = quantityContainer.parentElement.children[3];

        let pricePerUnit = parseFloat(priceEl.getAttribute("data-price"));

        isMinusBtn ? currentQuantity-- : currentQuantity++;
        currentQuantity = currentQuantity < 1 ? 1 : currentQuantity;

        // change the quantity in the cart
        let productInCartIndex = userStorage.loggedInUser.cart.getIndexInCartByUUID(
          productUUID
        );
        let productInCart =
          userStorage.loggedInUser.cart.products[productInCartIndex];
        userStorage.editCartProductQuantity(productInCart, !isMinusBtn);

        currentPrice = pricePerUnit * currentQuantity;
        quantityEl.innerText = currentQuantity;
        priceEl.innerText = currentPrice.toFixed(2) + "лв";

        // change the total price in the cart
        let totalPriceContainer = getById("totalPriceCart");
        let cartTotalPrice = userStorage.loggedInUser.cart.finalPrice;
        totalPriceContainer.innerText = cartTotalPrice.toFixed(2) + "лв";
      });
    });

    allRemoveButtons.forEach((btn) => {
      btn.addEventListener("click", function (event) {
        let removeBtnContainer = event.target.parentElement;
        let productContainer = removeBtnContainer.parentElement;

        let productUUID = parseInt(productContainer.getAttribute("data-uuid"));

        // remove from the cart in local storage
        let productInCartIndex = userStorage.loggedInUser.cart.getIndexInCartByUUID(
          productUUID
        );
        let productInCart =
          userStorage.loggedInUser.cart.products[productInCartIndex];
        userStorage.removeFromCart(productInCart);

        // remove from dom
        productContainer.parentElement.removeChild(productContainer);

        // change the total price in the cart
        let totalPriceContainer = getById("totalPriceCart");
        let cartTotalPrice = userStorage.loggedInUser.cart.finalPrice;
        totalPriceContainer.innerText = cartTotalPrice.toFixed(2) + "лв";
      });
    });

    backBtn.addEventListener("click", function() {
      location.hash = "#allDeals";
      location.reload();
    })

    // TODO: checkoutBtn - on click -> empty cart
  });
}

function checkoutPreviewController() {
  loadTemplate(
    "checkoutPreview.hbs",
    cartPreviewContainer,
    userStorage.loggedInUser.cart.productsWithIDs
  ).then(() => {
    let allQuantityControllerButtons = document.querySelectorAll(
      "#" + cartPreviewContainer.id + " .cart-item .quantity-controller"
    );

    let allRemoveButtons = document.querySelectorAll(
      "#" + cartPreviewContainer.id + " .cart-item .remove-x"
    );

    let finalizeBtn = getById("finalizeBtn");

    allQuantityControllerButtons.forEach((btn) => {
      btn.addEventListener("click", function (event) {
        event.stopImmediatePropagation();
        let isMinusBtn = event.target.classList.contains("minus");
        let quantityContainer = event.target.parentElement;
        let quantityEl = quantityContainer.children[1];
        let currentQuantity = parseInt(quantityEl.innerText);

        let productUUID = parseInt(
          quantityContainer.parentElement.getAttribute("data-uuid")
        );

        let priceEl = quantityContainer.parentElement.children[3];

        let pricePerUnit = parseFloat(priceEl.getAttribute("data-price"));

        isMinusBtn ? currentQuantity-- : currentQuantity++;
        currentQuantity = currentQuantity < 1 ? 1 : currentQuantity;

        // change the quantity in the cart
        let productInCartIndex = userStorage.loggedInUser.cart.getIndexInCartByUUID(
          productUUID
        );
        let productInCart =
          userStorage.loggedInUser.cart.products[productInCartIndex];
        userStorage.editCartProductQuantity(productInCart, !isMinusBtn);

        currentPrice = pricePerUnit * currentQuantity;
        quantityEl.innerText = currentQuantity;
        priceEl.innerText = currentPrice.toFixed(2) + "лв";

        // change the total price in the cart
        let totalPriceContainer = getById("totalPricePreview");
        let cartTotalPrice = userStorage.loggedInUser.cart.finalPrice;
        totalPriceContainer.innerText = cartTotalPrice.toFixed(2) + "лв";
      });
    });

    allRemoveButtons.forEach((btn) => {
      btn.addEventListener("click", function (event) {
        event.stopImmediatePropagation();
        let removeBtnContainer = event.target.parentElement;
        let productContainer = removeBtnContainer.parentElement;

        let productUUID = parseInt(productContainer.getAttribute("data-uuid"));

        // remove from the cart in local storage
        let productInCartIndex = userStorage.loggedInUser.cart.getIndexInCartByUUID(
          productUUID
        );
        let productInCart =
          userStorage.loggedInUser.cart.products[productInCartIndex];
        userStorage.removeFromCart(productInCart);

        // remove from dom
        productContainer.parentElement.removeChild(productContainer);

        // change the total price in the cart
        let totalPriceContainer = getById("totalPricePreview");
        let cartTotalPrice = userStorage.loggedInUser.cart.finalPrice;
        totalPriceContainer.innerText = cartTotalPrice.toFixed(2) + "лв";
      });
    });
  });
}

checkoutPreviewController();