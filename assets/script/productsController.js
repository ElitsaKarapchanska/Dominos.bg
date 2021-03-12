const simpleProductSource = getById("simpleProduct").innerHTML;
const customizableProductSource = getById("customizableProduct").innerHTML;
const complexCardProductSource = getById("complexCardProduct").innerHTML;
const filtersSource = getById("productFilters").innerHTML;

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
          event.path.forEach((el) => {
            if (el.tagName === "ARTICLE") id = el.id;
          });

          // get product from the id
          let product = getProductByWholeId(id);

          let priceElement = document.querySelector(
            "#" + id + " .price-sum"
          );

          let quantityElement = document.querySelector(
            "#" + id + " .quantity-number"
          );
          let currentQuantity = parseInt(quantityElement.innerText);

          let typeIndex = parseInt(event.target.value);
          product.selectedType = product.types[typeIndex];

          priceElement.innerText = (product.price[typeIndex] * currentQuantity).toFixed(2) + "лв";
        });
      });
    }
  }
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

  let close = getById("closeIcon");
  close.addEventListener("click", function () {
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

      currPrice = currPrice - itemPrice; // to modify the price;
      price.innerHTML = currPrice.toFixed(2);
    }
    quantity.innerText = count;
  });

  let plus = getById("plus");
  plus.addEventListener("click", function () {
    let count = Number(quantity.innerText);
    let currPrice = Number(price.innerHTML);

    count++;
    currPrice = itemPrice * count; // to modify the price;

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
  let currentPrice = parseFloat(priceEl.innerText);
  let pricePerUnit = currentPrice / currentQuantity;

  isMinusBtn ? currentQuantity-- : currentQuantity++;
  currentQuantity = currentQuantity < 1 ? 1 : currentQuantity;

  currentPrice = pricePerUnit * currentQuantity;
  quantityEl.innerText = currentQuantity;
  priceEl.innerText = currentPrice.toFixed(2) + "лв";
}
function filterCheckBoxesAndProducts(products,where){
  const template = Handlebars.compile(filtersSource);
  const html = template(products);

  where.innerHTML = html;
  let newPizza = getById("new_p");
  let vegetarianPizza = getById("vegeterian");
  let spicyPizzas = getById("hotP");
  let leanPizzas = getById("leanP");

  //pizzas;
  if(products.category ==="pizza"){

  newPizza.addEventListener("click",function(){
    if(newPizza.checked){
    pizza.innerHTML="";
    displayCustomizableProduct(pizzaManager.newPizzas, pizza);
    }else{
      displayCustomizableProduct(pizzaManager.allPizzas, pizza);
    }
  });
  vegetarianPizza.addEventListener("click",function(){
    if(vegetarianPizza.checked){
      pizza.innerHTML="";
      displayCustomizableProduct(pizzaManager.vegetariansPizzas, pizza);
      }else{
        displayCustomizableProduct(pizzaManager.allPizzas, pizza);
      }
    });
    spicyPizzas.addEventListener("click",function(){
      if(spicyPizzas.checked){
        pizza.innerHTML="";
        displayCustomizableProduct(pizzaManager.spicyPizzas, pizza);
        }else{
          displayCustomizableProduct(pizzaManager.allPizzas, pizza);
        }
    });
    leanPizzas.addEventListener("click",function(){
      if(leanPizzas.checked){
        pizza.innerHTML="";
        displayCustomizableProduct(pizzaManager.leanPizzas, pizza);
        }else{
          displayCustomizableProduct(pizzaManager.allPizzas, pizza);
        }
    });
  }
    //starters;
    else if(products.category ==="starter"){
    let vegeterianStarters = getById("vegeterianStarters");
    let newStarters = getById("newStarters");

    vegeterianStarters.addEventListener("click",function(){
      if(vegeterianStarters.checked){
        console.log(vegeterianStarters.checked);
        starter.innerHTML="";
        displaySimpleProduct(starterManager.spicyStarters, starter);
        }else{
        displaySimpleProduct(starterManager.allStarters, starter);
        }
    });
    newStarters.addEventListener("click",function(){
      if(vegeterianStarters.checked){
        starter.innerHTML="";
        displaySimpleProduct(starterManager.newStarters, starter);
        }else{
        displaySimpleProduct(starterManager.allStarters, starter);
        }
    });
  }
    //pasta;
    if(products.category ==="pasta"){
    let spicyPasta = getById("spicyPasta");
    let newPasta = getById("newPasta");

    spicyPasta.addEventListener("click",function(){
      if(spicyPasta.checked){
        pasta.innerHTML="";
        displayCustomizableProduct(pastaManager.spicyPasta, pasta);
        }else{
          displayCustomizableProduct(pastaManager.allPasta, pasta);
        }
    });
    newPasta.addEventListener("click",function(){
      if(newPasta.checked){
        pasta.innerHTML="";
        displayCustomizableProduct(pastaManager.newPasta, pasta);
        }else{
          displayCustomizableProduct(pastaManager.allPasta, pasta);
        }
    });
  }
    //sauce
   else if (products.category==="sauce"){
    let newSauces = getById("newSauces");
    let spicySauces = getById("spicySauces");

    newSauces.addEventListener("click",function(){
      if(newSauces.checked){
        sauce.innerHTML="";
        displaySimpleProduct(sauceManager.newSauces, sauce);
      }else{
        displaySimpleProduct(sauceManager.allSauces, sauce);
      }
    });
    spicySauces.addEventListener("click",function(){
      if(spicySauces.checked){
        sauce.innerHTML="";
        displaySimpleProduct(sauceManager.spicySauces, sauce);
      }else{
        displaySimpleProduct(sauceManager.allSauces, sauce);
      }
    });
  }

    //dessert
   else if(products.category==="dessert"){
     let desserts = getById("desserts");
     let icecreams = getById("icecreams");

     desserts.addEventListener("click",function(){
       if(desserts.checked){
        displaySimpleProduct(dessertManager.desserts, dessert);
       }else{
        displaySimpleProduct(dessertManager.allDesserts, dessert);
       }
     });

     icecreams.addEventListener("click",function(){
      if(desserts.checked){
       displaySimpleProduct(dessertManager.icecreams, dessert);
      }else{
       displaySimpleProduct(dessertManager.allDesserts, dessert);
      }
    });
  }

}

displaySimpleProduct(chickenManager.allChicken, allPages.allChickenPage);
// TODO: deals
// displaySimpleProduct(dessertManager.allDesserts, allPages.allDessertsPage);//filtered;
displaySimpleProduct(drinkManager.allDrinks, allPages.allDrinksPage);
// displayCustomizableProduct(pastaManager.allPasta, allPages.allPastaPage);//filtered;
// displayCustomizableProduct(pizzaManager.allPizzas, allPages.allPizzasPage);//filtered;
displayCustomizableProduct(saladManager.allSalads, allPages.allSaladsPage);
displayCustomizableProduct(
  sandwichManager.allSandwiches,
  allPages.allSandwichPage
);
// displaySimpleProduct(sauceManager.allSauces, allPages.allSaucesPage);//filtered;
// displaySimpleProduct(starterManager.allStarters, allPages.allStartersPage);//filtered;

//which have filter-checkboxes;
displayCustomizableProduct(pizzaManager.allPizzas, pizza);
displaySimpleProduct(starterManager.allStarters, starter);
displayCustomizableProduct(pastaManager.allPasta, pasta);
displaySimpleProduct(sauceManager.allSauces, sauce);
displaySimpleProduct(dessertManager.allDesserts, dessert);

filterCheckBoxesAndProducts(pizzaManager.allPizzas[0], filteredPizza);//pizza checkboxes
filterCheckBoxesAndProducts(starterManager.allStarters[0], filteredStarter);//starters checkboxes
filterCheckBoxesAndProducts(pastaManager.allPasta[0], filterPasta);//pasta checkboxes
filterCheckBoxesAndProducts(sauceManager.allSauces[0], filterSauce);//sauces checkboxes
filterCheckBoxesAndProducts(dessertManager.allDesserts[0], filterDessert); //dessert checkboxes





