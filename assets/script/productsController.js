const simpleProductSource = document.getElementById("simpleProduct").innerHTML;
const customizableProductSource = document.getElementById("customizableProduct")
  .innerHTML;

function displaySimpleProduct(products, categoryTab) {
  const template = Handlebars.compile(simpleProductSource);
  const html = template(products);

  categoryTab.innerHTML = html;
}

function displayCustomizableProduct(products, categoryTab) {
  const template = Handlebars.compile(customizableProductSource);
  const html = template(products);

  categoryTab.innerHTML = html;
}

let allDesertsPage = document.getElementById("allDessertsPage");
displaySimpleProduct(allDesertsData, allDesertsPage);

let allPizzasPage = document.getElementById("allPizzasPage");
displayCustomizableProduct(allPizzasData, allPizzasPage);
