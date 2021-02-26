const simpleProductSource = document.getElementById("simpleProduct").innerHTML;
const customizableProductSource = document.getElementById("customizableProduct")
  .innerHTML;
const complexCardProductSource = document.getElementById("complexCardProduct").innerHTML;

chickenManager.addAllChickenProducts(allChickenData);
dessertManager.addAllDessertProducts(allDessertsData);
drinkManager.addAllDrinkProducts(allDrinksData);
pastaManager.addAllPastaProducts(allPastaData);
pizzaManager.addAllPizzaProducts(allPizzasData);
saladManager.addAllSaladProducts(allSaladsData);
sandwichManager.addAllSandwichProducts(allSandwichData);
sauceManager.addAllSauceProducts(allSaucesData);
starterManager.addAllStarterProducts(allStartersData);

function displaySimpleProduct(products, categoryTab) {
  const template = Handlebars.compile(simpleProductSource);
  const html = template(products);

  categoryTab.innerHTML = html;

  // selecting the cards within the current tab
  let allCards = document.querySelectorAll(
    "#" + categoryTab.id + " .simple-card"
  );

  // saving the last opened section so that we can close it, when another one is opened
  let openedSection;

  allCards.forEach((card) => {
    card.addEventListener("click", function (ev) {
      // finding the actual card that was clicked from the 'event.path'
      let id = -1;
      ev.path.forEach((el) => {
        if (el.tagName === "ARTICLE") id = el.id;
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
}
function showCard(hashLocation){
  let product = hashLocation.split("-");
  let productCategory = currentPorduct[1];
  let productId = product[2];
  switch(productCategory){
    case 'pizza': let product = getProductByProductCategoryAndId(pizzaManager.allPizzas,productId);
                  displayCard(product,tab); 
                  // where to display them;
    break;
    case 'pasta': let product = getProductByProductCategoryAndId(pastaManager.allPasta,productId);
                   displayCard(product,tab); 
                   // where to display them;
    break;
    case 'salad':  let product = getProductByProductCategoryAndId(saladManager.allSalads,productId);
                  displayCard(product,tab); 
                 // where to display them;
    break;
  }
}
function getProductByProductCategoryAndId(data,id){
     return data.filter( element => element.id === id);
}
function displayCard(products, categoryTab){
  const template = Handlebars.compile(complexCardProductSource);
  const html = template(products);

  categoryTab.innerHTML = html;
}

function displayCustomizableProduct(products, categoryTab) {
  const template = Handlebars.compile(customizableProductSource);
  const html = template(products);

  categoryTab.innerHTML = html;
}

displaySimpleProduct(dessertManager.allDesserts, allPages.allDessertsPage);
displayCustomizableProduct(pizzaManager.allPizzas, allPages.allPizzasPage);
