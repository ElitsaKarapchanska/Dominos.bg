function changeElementVisibility(
  element,
  toShow = true,
  displayVisible = "block"
) {
  toShow
    ? (element.style.display = displayVisible)
    : (element.style.display = "none");
}

function getById(id) {
  return document.getElementById(id);
}

function loadTemplate(page, container, obj = {}) {
  return fetch("./assets/script/views/" + page)
    .then((res) => res.text())
    .then((res) => {
      let template = Handlebars.compile(res);
      let html = template(obj);
      container.innerHTML = html;
    });
}

function filterPizzas(productToGet, fromWhere) {
  productToGet.addEventListener("click", function () {
    if (productToGet.checked) {
      pizza.innerHTML = "";
      displayCustomizableProduct(fromWhere, pizza);
    } else {
      displayCustomizableProduct(pizzaManager.allPizzas, pizza);
    }
  });
}
function filterPastas(productToGet, fromWhere) {
  productToGet.addEventListener("click", function () {
    if (productToGet.checked) {
      pasta.innerHTML = "";
      displayCustomizableProduct(fromWhere, pasta);
    } else {
      displayCustomizableProduct(pastaManager.allPasta, pasta);
    }
  });
}
function filterSauces(productToGet, fromWhere) {
  productToGet.addEventListener("click", function () {
    if (productToGet.checked) {
      sauce.innerHTML = "";
      simpleProductController(fromWhere, sauce);
    } else {
      simpleProductController(sauceManager.allSauces, sauce);
    }
  });
}
function filterDesserts(productToGet, fromWhere) {
  productToGet.addEventListener("click", function () {
    if (productToGet.checked) {
      dessert.innerHTML = "";
      simpleProductController(fromWhere, dessert);
    } else {
      simpleProductController(dessertManager.allDesserts, dessert);
    }
  });
}
function filterStarters(productToGet, fromWhere) {
  productToGet.addEventListener("click", function () {
    if (productToGet.checked) {
      starter.innerHTML = "";
      simpleProductController(fromWhere, starter);
    } else {
      simpleProductController(starterManager.allStarters, starter);
    }
  });
}
