function simpleProductController(products, categoryTab) {
  loadTemplate("simpleProduct.hbs", categoryTab, products).then(() => {
    // selecting the cards within the current tab
    let allCards = document.querySelectorAll(
      "#" + categoryTab.id + " .simple-card"
    );

    // selecting all buttons which when pressed add the product to the cart
    let allAddButtons = document.querySelectorAll(
      "#" + categoryTab.id + " .simple-card .addBtn"
    );

    let allQuantityControllerButtons = document.querySelectorAll(
      "#" + categoryTab.id + " .simple-card .quantity-controller"
    );

    // saving the last opened section so that we can close it, when another one is opened
    let openedSection;

    allCards.forEach((card) => {
      card.addEventListener("click", function (ev) {
        // finding the actual card that was clicked from the 'event.path'
        let id = -1;
        let path = ev.path || (ev.composedPath && ev.composedPath());
        path.forEach((el) => {
          if (el.tagName === "ARTICLE") {
            id = el.id;
          }
        });

        // selecting the 'slide-up' section from the card
        let slideUpSection = document.querySelector(
          "#" + id + " section.slide-up"
        );
        if (slideUpSection.classList.contains("opened")) {
          slideUpSection.classList.remove("opened");
          slideUpSection.classList.add("closed");
          openedSection = null;
        } else {
          slideUpSection.classList.remove("closed");
          slideUpSection.classList.add("opened");
          // if there is a section already opened, we close it
          if (openedSection) {
            openedSection.classList.remove("opened");
            openedSection.classList.add("closed");
          }
          openedSection = slideUpSection;
        }
      });
    });

    allAddButtons.forEach((btn) => {
      btn.addEventListener("click", function (event) {
        // select the product and the quantity
        let id = -1;
        let path = event.path || (event.composedPath && event.composedPath());
        path.forEach((el) => {
          if (el.tagName === "ARTICLE") id = el.id;
        });

        // get product from the id
        let product = getProductByWholeId(id);

        let quantityElement = document.querySelector(
          "#" + id + " .quantity-number"
        );
        let quantity = parseInt(quantityElement.innerText);
        addToCartBtn(product, quantity);
      });
    });

    allQuantityControllerButtons.forEach((btn) => {
      btn.addEventListener("click", quantityButtonClick);
    });

    if (categoryTab.id === "allDrinksPage") {
      let typesDropdown = document.querySelectorAll(
        "#" + categoryTab.id + " .simple-card .productTypes"
      );

      if (typesDropdown) {
        typesDropdown.forEach((dropdown) => {
          dropdown.addEventListener("click", function (event) {
            event.stopPropagation();
          });

          dropdown.addEventListener("change", function (event) {
            // select the product and the quantity
            let id = -1;
            let path =
              event.path || (event.composedPath && event.composedPath());
            path.forEach((el) => {
              if (el.tagName === "ARTICLE") id = el.id;
            });

            // get product from the id
            let product = getProductByWholeId(id);

            let priceElement = document.querySelector("#" + id + " .price-sum");

            let quantityElement = document.querySelector(
              "#" + id + " .quantity-number"
            );
            let currentQuantity = parseInt(quantityElement.innerText);

            let typeIndex = parseInt(event.target.value);
            product.selectedType = product.types[typeIndex];

            priceElement.innerText =
              (product.price[typeIndex] * currentQuantity).toFixed(2) + "лв";
          });
        });
      }
    }
  });
}
