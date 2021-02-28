const simpleProductSource = document.getElementById("simpleProduct").innerHTML;
const customizableProductSource = document.getElementById("customizableProduct").innerHTML;
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
  let allCards = document.querySelectorAll("#" + categoryTab.id + " .simple-card");

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
function showCard(hashLocation) {
  let productPage = hashLocation.split("-");
  let productCategory = productPage[1];
  let productId = productPage[2];
  switch (productCategory) {
      case 'pizza':
          {
            let pizza = getProductByProductCategoryAndId(pizzaManager.allPizzas, productId);
            displayComplexProductPage(pizza[0], allPages.complexProductPage);
          }
          break;
      case 'pasta':
          {
            let pasta = getProductByProductCategoryAndId(pastaManager.allPasta, productId);
            displayComplexProductPage(pasta[0], allPages.complexProductPage);
          }
          break;
      case 'salad':
          {
            let salad = getProductByProductCategoryAndId(saladManager.allSalads, productId);
            displayComplexProductPage(salad[0], allPages.complexProductPage);
          }
          break;
    }
}
function getProductByProductCategoryAndId(data, id) {
    return data.filter(element => element.id === id);
}
function displayComplexProductPage(products, categoryTab) {
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
