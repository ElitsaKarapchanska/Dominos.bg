function customizableProductPageController(products, categoryTab) {
  loadTemplate("customizableProductPage.hbs", categoryTab, products).then(
    () => {
      // a number to add or subtract from the product price to get the final price pre unit
      // (depends on pizza dough type, added and subtracted ingredients, but not on size)
      let priceModifiers = 0;

      let editToppingsBtn = getById("edit-toppings-btn");
      let toppingsWrapper = getById("toppings-wrapper");

      let close = getById("closeIcon");
      close.addEventListener("click", function () {
        // reset the product if new ingredients have been added
        products.resetProductIngredients();
        toppingsWrapper.classList.add("hidden");
        window.history.back();
      });

      let quantity = getById("selectedQuantity");
      let price = getById("currentPrice");

      let аddButton = getById("addBtn");

      function getDisplayedProductPrice() {
        let currentPrice = 0;
        if (products.category === "pizza") {
          let selectSize = getById("pizza-size");
          let size = parseInt(selectSize.value);
          currentPrice = products.price[size] + priceModifiers;
        } else {
          currentPrice = products.price + priceModifiers;
        }
        return currentPrice;
      }

      let minus = getById("minus");
      minus.addEventListener("click", function () {
        let count = Number(quantity.innerText);
        let currPricePerUnit = getDisplayedProductPrice();

        if (count >= 2) {
          // check if the quantity is more than 1;
          count--;
          price.innerHTML = (currPricePerUnit * count).toFixed(2);
        }
        quantity.innerText = count;
      });

      let plus = getById("plus");
      plus.addEventListener("click", function () {
        let count = Number(quantity.innerText);
        let currPricePerUnit = getDisplayedProductPrice();
        count++;

        quantity.innerText = count;
        price.innerHTML = (currPricePerUnit * count).toFixed(2);
      });

      if (products.category === "pizza") {
        let selectSize = getById("pizza-size");

        selectSize.addEventListener("change", function () {
          let size = Number(selectSize.value);
          let price_size = products.price[size];

          quantity.innerHTML = 1; // the default quantity is always 1;

          selectPizzaDough.value = "Traditional";
          // the default pizza dough is always traditional with every size choice
          price.innerHTML = price_size.toFixed(2);
        });

        let selectPizzaDough = getById("pizza-pan");

        selectPizzaDough.addEventListener("change", function () {
          let size = Number(selectSize.value);
          let price_size = products.price[size];

          let dough = selectPizzaDough.value;

          if (dough === "Philadelphia") {
            priceModifiers += PHILLADELPHIA_CRUST_PRICE;

            price.innerHTML = products.price[size] + PHILLADELPHIA_CRUST_PRICE;
            quantity.innerHTML = 1;
          } else {
            price.innerHTML = price_size.toFixed(2);
            quantity.innerHTML = 1;
          }
        });
      }

      editToppingsBtn.addEventListener("click", function () {
        toppingsWrapper.classList.toggle("hidden");
      });

      let mainIngredientInputs = document.querySelectorAll(
        "#complexProductPage .toppings-container input.single-ingredient"
      );

      mainIngredientInputs.forEach((input) => {
        input.addEventListener("change", function (event) {
          let id = event.target.id;
          // select the 'additional' checkbox
          let additional = getById(id + "-Add");

          let ingredientTitle = event.target.value;
          let ingredient = ingredientManager.getIngredientCopy(
            ingredientTitle,
            false
          );

          let strIngredientContainer = getById("strIngredientContainer");
          let stringifiedIngr = "";

          if (event.target.checked) {
            // if it's a sauce, uncheck all other sauces and remove them from the product
            if (event.target.classList.contains("sauces")) {
              let allSaucesCheckboxes = document.querySelectorAll(
                "#complexProductPage .toppings-container input.single-ingredient.sauces"
              );

              allSaucesCheckboxes.forEach((checkbox) => {
                // all sauces checkmarks except for the one that was just checked
                if (checkbox !== event.target) {
                  checkbox.checked = false;
                  let sauceTitle = checkbox.value;
                  let sauce = ingredientManager.getIngredientCopy(
                    sauceTitle,
                    false
                  );
                  products.removeIngredient(sauce);
                }
              });
            }

            stringifiedIngr = products.addIngredient(ingredient);
          } else {
            stringifiedIngr = products.removeIngredient(ingredient);
            additional.checked = false;
          }

          // update the price
          let quantityNumber = parseInt(quantity.innerText);
          let currentPrice = getDisplayedProductPrice();

          price.innerText = (currentPrice * quantityNumber).toFixed(2);
          strIngredientContainer.innerText = stringifiedIngr;
        });
      });

      let additionalIngredientInputs = document.querySelectorAll(
        "#complexProductPage .toppings-container input.additional"
      );

      additionalIngredientInputs.forEach((input) => {
        input.addEventListener("change", function (event) {
          let ingredientTitle = event.target.value;
          let ingredient = ingredientManager.getIngredientCopy(
            ingredientTitle,
            false
          );

          let strIngredientContainer = getById("strIngredientContainer");

          let toAdd = event.target.checked;

          let stringifiedIngr = products.changeAdditionalIngredient(
            ingredient,
            toAdd
          );

          priceModifiers = toAdd
            ? priceModifiers + ingredient.price[1]
            : priceModifiers - ingredient.price[1];

          strIngredientContainer.innerText = stringifiedIngr;

          // update the price
          let quantityNumber = parseInt(quantity.innerText);
          let currentPrice = getDisplayedProductPrice();

          price.innerText = (currentPrice * quantityNumber).toFixed(2);
        });
      });

      аddButton.addEventListener("click", function () {
        let category = location.hash.split("-")[1];
        let productToAdd;
        switch (category) {
          case "pizza": {
            let selectSize = getById("pizza-size");
            let size = parseInt(selectSize.value);
            switch (size) {
              case 0:
                products.changePizzaSize(PIZZA_SIZES.MEDIUM);
                break;
              case 1:
                products.changePizzaSize(PIZZA_SIZES.BIG);
                break;
              case 2:
                products.changePizzaSize(PIZZA_SIZES.JUMBO);
                break;
            }

            let selectPizzaDough = document.getElementById("pizza-pan");
            let crust = selectPizzaDough.value;
            switch (crust) {
              case "Traditional":
                products.changePizzaCrust(PIZZA_CRUST_TYPES.TRADITIONAL);
                break;
              case "Italian":
                products.changePizzaCrust(PIZZA_CRUST_TYPES.ITALLIAN);
                break;
              case "Thin":
                products.changePizzaCrust(PIZZA_CRUST_TYPES.THIN);
                break;
              case "Philadelphia":
                products.changePizzaCrust(PIZZA_CRUST_TYPES.PHILLADELPHIA);
                break;
              case "Whole grain":
                products.changePizzaCrust(PIZZA_CRUST_TYPES.WHOLEGRAIN);
                break;
            }
            productToAdd = pizzaManager.getProductCopy(products);
            break;
          }
          case "pasta":
            productToAdd = pastaManager.getProductCopy(products);
            break;
          case "salad":
            productToAdd = saladManager.getProductCopy(products);
            break;
          case "sandwich":
            productToAdd = sandwichManager.getProductCopy(products);
            break;
        }

        // reset the product if new ingredients have been added
        products.resetProductIngredients();

        let quantityNumber = parseInt(quantity.innerText);
        addToCartBtn(productToAdd, quantityNumber, priceModifiers);
        window.history.back();
      });
    }
  );
}
