const simpleProductSource = document.getElementById("simpleProduct").innerHTML;
const customizableProductSource = document.getElementById("customizableProduct")
  .innerHTML;
const complexCardProductSource = document.getElementById("complexCardProduct")
  .innerHTML;

chickenManager.addAllChickenProducts(allChickenData);
dessertManager.addAllDessertProducts(allDessertsData);
drinkManager.addAllDrinkProducts(allDrinksData);
pastaManager.addAllPastaProducts(allPastaData);
pizzaManager.addAllPizzaProducts(allPizzasData);
saladManager.addAllSaladProducts(allSaladsData);
sandwichManager.addAllSandwichProducts(allSandwichData);
sauceManager.addAllSauceProducts(allSaucesData);
starterManager.addAllStarterProducts(allStartersData);

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

function displaySimpleProduct(products, categoryTab) {
  const template = Handlebars.compile(simpleProductSource);
  const html = template(products);

  categoryTab.innerHTML = html;

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
      ev.path.forEach((el) => {
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
      event.path.forEach((el) => {
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
  }
}

function displayComplexProductPage(products, categoryTab) {
  const template = Handlebars.compile(complexCardProductSource);
  const html = template(products);

  categoryTab.innerHTML = html;

  let close = document.getElementById("closeIcon");
  close.addEventListener("click", function () {
    window.history.back();
  });

  let quantity = document.getElementById("selectedQuantity");
  let price = document.getElementById("currentPrice");
  const firstPrice = document.getElementById("currentPrice");
  let itemPrice = Number(firstPrice.innerHTML);

  let аddButton = document.getElementById("addBtn");

  let minus = document.getElementById("minus");
  minus.addEventListener("click", function () {
    let count = Number(quantity.innerText);
    let currPrice = Number(price.innerHTML);

    if (count >= 2) {
      // check if the quantity is more than 1;
      count--;

      currPrice = currPrice - itemPrice; // to modify the price;
      price.innerHTML = currPrice.toFixed(2);
    }
    quantity.innerText = count;
  });

  let plus = document.getElementById("plus");
  plus.addEventListener("click", function () {
    let count = Number(quantity.innerText);
    let currPrice = Number(price.innerHTML);

    count++;
    currPrice = itemPrice * count; // to modify the price;

    quantity.innerText = count;
    price.innerHTML = currPrice.toFixed(2);
  });

  аddButton.addEventListener("click", function () {
    let category = location.hash.split("-")[1];
    let productToAdd;
    switch (category) {
      case "pizza":
        productToAdd = pizzaManager.getProductCopy(products);
        break;
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
    // products.resetProductIngredients();

    let quantityNumber = parseInt(quantity.innerText);
    addToCartBtn(productToAdd, quantityNumber);
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
  let currentPrice = parseInt(priceEl.innerText);
  console.log(priceEl);
  let pricePerUnit = currentPrice / currentQuantity;

  isMinusBtn ? currentQuantity-- : currentQuantity++;
  currentQuantity = currentQuantity < 1 ? 1 : currentQuantity;

  currentPrice = pricePerUnit * currentQuantity;
  quantityEl.innerText = currentQuantity;
  priceEl.innerText = currentPrice.toFixed(2) + "лв";
}

displaySimpleProduct(chickenManager.allChicken, allPages.allChickenPage);
// TODO: deals
displaySimpleProduct(dessertManager.allDesserts, allPages.allDessertsPage);
// TODO: drinks
displayCustomizableProduct(pastaManager.allPasta, allPages.allPastaPage);
displayCustomizableProduct(pizzaManager.allPizzas, allPages.allPizzasPage);
displayCustomizableProduct(saladManager.allSalads, allPages.allSaladsPage);
displayCustomizableProduct(sandwichManager.allSandwiches, allPages.allSandwichPage);
displaySimpleProduct(sauceManager.allSauces, allPages.allSaucesPage);
displaySimpleProduct(starterManager.allStarters, allPages.allStartersPage);
