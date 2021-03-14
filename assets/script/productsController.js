const customizableProductSource = getById("customizableProduct").innerHTML;
const complexCardProductSource = getById("complexCardProduct").innerHTML;
const filtersSource = getById("productFilters").innerHTML;
const dealsProductSource = getById("dealsProduct").innerHTML;

ingredientManager.addAllIngredients(allIngredientsData);
chickenManager.addAllChickenProducts(allChickenData);
dessertManager.addAllDessertProducts(allDessertsData);
drinkManager.addAllDrinkProducts(allDrinksData);
pastaManager.addAllPastaProducts(allPastaData);
pizzaManager.addAllPizzaProducts(allPizzasData);
saladManager.addAllSaladProducts(allSaladsData);
sandwichManager.addAllSandwichProducts(allSandwichData);
sauceManager.addAllSauceProducts(allSaucesData);
starterManager.addAllStarterProducts(allStartersData);
dealManager.addAllDealProducts(allDealsData);

function getProductFromCategoryById(data, id) {
  return data.filter((element) => element.id === id)[0];
}

function getProductByWholeId(id) {
  let category = id.slice(0, 2);

  let categoryArr;
  switch (category) {
    case "ch":
      categoryArr = chickenManager.allChicken;
      break;
    case "de":
      categoryArr = dessertManager.allDesserts;
      break;
    case "dr":
      categoryArr = drinkManager.allDrinks;
      break;
    case "pa":
      categoryArr = pastaManager.allPasta;
      break;
    case "pi":
      categoryArr = pizzaManager.allPizzas;
      break;
    case "sl":
      categoryArr = saladManager.allSalads;
      break;
    case "sn":
      categoryArr = sandwichManager.allSandwiches;
      break;
    case "su":
      categoryArr = sauceManager.allSauces;
      break;
    case "st":
      categoryArr = starterManager.allStarters;
      break;
  }
  return getProductFromCategoryById(categoryArr, id);
}

function displayDeals(products, categoryTab) {
  const template = Handlebars.compile(dealsProductSource);
  const html = template(products);

  categoryTab.innerHTML = html;
}

function displaySimpleProduct(products, categoryTab) {
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

function displayCustomizableProduct(products, categoryTab) {
  const template = Handlebars.compile(customizableProductSource);
  const html = template(products);

  categoryTab.innerHTML = html;
}

function showCard(hashLocation) {
  let productPage = hashLocation.split("-");
  let productCategory = productPage[1];
  let productId = productPage[2];
  switch (productCategory) {
    case "pizza":
      {
        let pizza = getProductFromCategoryById(
          pizzaManager.allPizzas,
          productId
        );
        displayComplexProductPage(pizza, allPages.complexProductPage);
      }
      break;
    case "pasta":
      {
        let pasta = getProductFromCategoryById(
          pastaManager.allPasta,
          productId
        );
        displayComplexProductPage(pasta, allPages.complexProductPage);
      }
      break;
    case "salad":
      {
        let salad = getProductFromCategoryById(
          saladManager.allSalads,
          productId
        );
        displayComplexProductPage(salad, allPages.complexProductPage);
      }
      break;
    case "sandwich":
      {
        let sandwich = getProductFromCategoryById(
          sandwichManager.allSandwiches,
          productId
        );
        displayComplexProductPage(sandwich, allPages.complexProductPage);
      }
      break;
    default:
      return false;
  }
}

function displayComplexProductPage(products, categoryTab) {
  const template = Handlebars.compile(complexCardProductSource);
  const html = template(products);

  categoryTab.innerHTML = html;

  // a number to add or subtract from the product price to get the final price pre unit
  // (depends on pizza dough type, added and subtracted ingredients, but not on size)
  let priceModifiers = 0;

  let close = getById("closeIcon");
  close.addEventListener("click", function () {
    // reset the product if new ingredients have been added
    products.resetProductIngredients();
    window.history.back();
  });

  let quantity = getById("selectedQuantity");
  let price = getById("currentPrice");
  let itemPrice = Number(price.innerHTML);

  let аddButton = getById("addBtn");

  let minus = getById("minus");
  minus.addEventListener("click", function () {
    let count = Number(quantity.innerText);
    let currPrice = Number(price.innerHTML);

    if (count >= 2) {
      // check if the quantity is more than 1;
      count--;

      currPrice /= count + 1; // to modify the price;
      price.innerHTML = currPrice.toFixed(2);
    }
    quantity.innerText = count;
  });

  let plus = getById("plus");
  plus.addEventListener("click", function () {
    let count = Number(quantity.innerText);
    let currPrice = Number(price.innerHTML);

    count++;
    currPrice *= count; // to modify the price;

    quantity.innerText = count;
    price.innerHTML = currPrice.toFixed(2);
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
      itemPrice = price_size.toFixed(2);
    });

    let selectPizzaDough = document.getElementById("pizza-pan");

    selectPizzaDough.addEventListener("change", function () {
      let size = Number(selectSize.value);
      let price_size = products.price[size];

      let dough = selectPizzaDough.value;

      if (dough === "Philadelphia") {
        let price_dough = 2.25;

        price.innerHTML = products.price[size] + price_dough;
        itemPrice = price.innerHTML; // change the item price;
        quantity.innerHTML = 1;
      } else {
        price.innerHTML = price_size.toFixed(2);
        itemPrice = price.innerHTML;
        quantity.innerHTML = 1;
      }
    });
  }

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
      let currentPrice = 0;
      if (products.category === "pizza") {
        let selectSize = getById("pizza-size");
        let size = parseInt(selectSize.value);
        currentPrice = products.price[size];
      } else {
        currentPrice = products.price;
      }

      price.innerText = (
        (currentPrice + priceModifiers) *
        quantityNumber
      ).toFixed(2);

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
      let currentPrice = 0;
      if (products.category === "pizza") {
        let selectSize = getById("pizza-size");
        let size = parseInt(selectSize.value);
        currentPrice = products.price[size];
      } else {
        currentPrice = products.price;
      }

      price.innerText = (
        (currentPrice + priceModifiers) *
        quantityNumber
      ).toFixed(2);
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
            priceModifiers += 2.25;
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

function quantityButtonClick(event) {
  event.stopImmediatePropagation();
  let isMinusBtn = event.target.classList.contains("minus");
  let quantityContainer = event.target.parentElement;
  let quantityEl = quantityContainer.children[1];
  let currentQuantity = parseInt(quantityEl.innerText);

  let priceContainer =
    quantityContainer.parentElement.parentElement.children[1];
  let priceEl = priceContainer.children[1];
  let currentPrice = parseFloat(priceEl.innerText);
  let pricePerUnit = currentPrice / currentQuantity;

  isMinusBtn ? currentQuantity-- : currentQuantity++;
  currentQuantity = currentQuantity < 1 ? 1 : currentQuantity;

  currentPrice = pricePerUnit * currentQuantity;
  quantityEl.innerText = currentQuantity;
  priceEl.innerText = currentPrice.toFixed(2) + "лв";
}

function filterCheckBoxesAndProducts(products, where) {
  const template = Handlebars.compile(filtersSource);
  const html = template(products);

  where.innerHTML = html;

  //pizzas;
  if (products.category === "pizza") {
    let newPizzas = getById("new_p");
    let vegetariansPizzas = getById("vegeterian");
    let spicyPizzas = getById("hotP");
    let leanPizzas = getById("leanP");

    filterPizzas(newPizzas, pizzaManager.newPizzas);
    filterPizzas(vegetariansPizzas, pizzaManager.vegetariansPizzas);
    filterPizzas(spicyPizzas, pizzaManager.spicyPizzas);
    filterPizzas(leanPizzas, pizzaManager.leanPizzas);
  }
  //starters;
  else if (products.category === "starter") {
    let vegeterianStarters = getById("vegeterianStarters");
    let newStarters = getById("newStarters");

    filterStarters(vegeterianStarters, starterManager.vegetarianStarters);
    filterStarters(newStarters, starterManager.newStarters);
  }
  //pasta;
  else if (products.category === "pasta") {
    let spicyPasta = getById("spicyPasta");
    let newPasta = getById("newPasta");

    filterPastas(spicyPasta, pastaManager.spicyPasta);
    filterPastas(newPasta, pastaManager.newPasta);
  }
  //sauce
  else if (products.category === "sauce") {
    let newSauces = getById("newSauces");
    let spicySauces = getById("spicySauces");

    filterSauces(newSauces, sauceManager.newSauces);
    filterSauces(spicySauces, sauceManager.spicySauces);
  }
  //dessert
  else if (products.category === "dessert") {
    let desserts = getById("desserts");
    let icecreams = getById("icecreams");

    filterDesserts(desserts, dessertManager.desserts);
    filterDesserts(icecreams, dessertManager.icecreams);
  }
}

displaySimpleProduct(chickenManager.allChicken, allPages.allChickenPage);
displayDeals(dealManager.allDeals, allPages.allDealsPage);
// displaySimpleProduct(dessertManager.allDesserts, allPages.allDessertsPage);//filter;
displaySimpleProduct(drinkManager.allDrinks, allPages.allDrinksPage);
// displayCustomizableProduct(pastaManager.allPasta, allPages.allPastaPage);//filter;
// displayCustomizableProduct(pizzaManager.allPizzas, allPages.allPizzasPage);//filter;
displayCustomizableProduct(saladManager.allSalads, allPages.allSaladsPage);
displayCustomizableProduct(
  sandwichManager.allSandwiches,
  allPages.allSandwichPage
);
// displaySimpleProduct(sauceManager.allSauces, allPages.allSaucesPage);//filter;
// displaySimpleProduct(starterManager.allStarters, allPages.allStartersPage);//filter;

//with filter-checkboxes;
displayCustomizableProduct(pizzaManager.allPizzas, pizza);
displaySimpleProduct(starterManager.allStarters, starter);
displayCustomizableProduct(pastaManager.allPasta, pasta);
displaySimpleProduct(sauceManager.allSauces, sauce);
displaySimpleProduct(dessertManager.allDesserts, dessert);

filterCheckBoxesAndProducts(pizzaManager.allPizzas[0], filteredPizza); //pizza checkboxes
filterCheckBoxesAndProducts(starterManager.allStarters[0], filteredStarter); //starters checkboxes
filterCheckBoxesAndProducts(pastaManager.allPasta[0], filterPasta); //pasta checkboxes
filterCheckBoxesAndProducts(sauceManager.allSauces[0], filterSauce); //sauces checkboxes
filterCheckBoxesAndProducts(dessertManager.allDesserts[0], filterDessert); //dessert checkboxes
