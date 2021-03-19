// 
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
  loadTemplate("dealsPage.hbs", categoryTab, products);
}

function displayCustomizableProduct(products, categoryTab) {
  loadTemplate("customizableProduct.hbs", categoryTab, products);
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
        customizableProductPageController(pizza, allPages.complexProductPage);
      }
      break;
    case "pasta":
      {
        let pasta = getProductFromCategoryById(
          pastaManager.allPasta,
          productId
        );
        customizableProductPageController(pasta, allPages.complexProductPage);
      }
      break;
    case "salad":
      {
        let salad = getProductFromCategoryById(
          saladManager.allSalads,
          productId
        );
        customizableProductPageController(salad, allPages.complexProductPage);
      }
      break;
    case "sandwich":
      {
        let sandwich = getProductFromCategoryById(
          sandwichManager.allSandwiches,
          productId
        );
        customizableProductPageController(sandwich, allPages.complexProductPage);
      }
      break;
    default:
      return false;
  }
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

  loadTemplate("filterSection.hbs", where, products)
     .then(() => {

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
})
}

simpleProductController(chickenManager.allChicken, allPages.allChickenPage);
displayDeals(dealManager.allDeals, allPages.allDealsPage);
// simpleProductController(dessertManager.allDesserts, allPages.allDessertsPage);//filter;
simpleProductController(drinkManager.allDrinks, allPages.allDrinksPage);
// displayCustomizableProduct(pastaManager.allPasta, allPages.allPastaPage);//filter;
// displayCustomizableProduct(pizzaManager.allPizzas, allPages.allPizzasPage);//filter;
displayCustomizableProduct(saladManager.allSalads, allPages.allSaladsPage);
displayCustomizableProduct(
  sandwichManager.allSandwiches,
  allPages.allSandwichPage
);
// simpleProductController(sauceManager.allSauces, allPages.allSaucesPage);//filter;
// simpleProductController(starterManager.allStarters, allPages.allStartersPage);//filter;

//with filter-checkboxes;
displayCustomizableProduct(pizzaManager.allPizzas, pizza);
simpleProductController(starterManager.allStarters, starter);
displayCustomizableProduct(pastaManager.allPasta, pasta);
simpleProductController(sauceManager.allSauces, sauce);
simpleProductController(dessertManager.allDesserts, dessert);

filterCheckBoxesAndProducts(pizzaManager.allPizzas[0], filteredPizza); //pizza checkboxes
filterCheckBoxesAndProducts(starterManager.allStarters[0], filteredStarter); //starters checkboxes
filterCheckBoxesAndProducts(pastaManager.allPasta[0], filterPasta); //pasta checkboxes
filterCheckBoxesAndProducts(sauceManager.allSauces[0], filterSauce); //sauces checkboxes
filterCheckBoxesAndProducts(dessertManager.allDesserts[0], filterDessert); //dessert checkboxes
