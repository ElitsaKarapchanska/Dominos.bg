const simpleProductSource = document.getElementById("simpleProduct").innerHTML;
const customizableProductSource = document.getElementById("customizableProduct")
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


let allDealsPage = document.getElementById("allDealsPage");

let allChickenPage = document.getElementById("allChickenPage");
let allDessertsPage = document.getElementById("allDessertsPage");
let allDrinksPage = document.getElementById("allDrinksPage");
let allPastaPage = document.getElementById("allPastaPage");
let allPizzasPage = document.getElementById("allPizzasPage");
let allSaladsPage = document.getElementById("allSaladsPage");
let allSandwichPage = document.getElementById("allSandwichPage");
let allSaucesPage = document.getElementById("allSaucesPage");
let allStartersPage = document.getElementById("allStartersPage");

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
      let index = -1;
      ev.path.forEach((el, i) => {
        if (el.tagName === "ARTICLE") index = i;
      });

      // selecting the 'slide-up' section from the card
      let slideUpSection = ev.path[index].querySelector(
        ":scope section.slide-up"
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

function displayCustomizableProduct(products, categoryTab) {
  const template = Handlebars.compile(customizableProductSource);
  const html = template(products);

  categoryTab.innerHTML = html;
}


displaySimpleProduct(dessertManager.allDesserts, allDessertsPage);
displayCustomizableProduct(pizzaManager.allPizzas, allPizzasPage);
