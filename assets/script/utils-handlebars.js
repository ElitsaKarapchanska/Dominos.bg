Handlebars.registerHelper("ifCond", function (v1, operator, v2, options) {
  switch (operator) {
    case "==":
      return v1 == v2 ? options.fn(this) : options.inverse(this);
    case "===":
      return v1 === v2 ? options.fn(this) : options.inverse(this);
    case "!=":
      return v1 != v2 ? options.fn(this) : options.inverse(this);
    case "!==":
      return v1 !== v2 ? options.fn(this) : options.inverse(this);
    case "<":
      return v1 < v2 ? options.fn(this) : options.inverse(this);
    case "<=":
      return v1 <= v2 ? options.fn(this) : options.inverse(this);
    case ">":
      return v1 > v2 ? options.fn(this) : options.inverse(this);
    case ">=":
      return v1 >= v2 ? options.fn(this) : options.inverse(this);
    case "&&":
      return v1 && v2 ? options.fn(this) : options.inverse(this);
    case "||":
      return v1 || v2 ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});

Handlebars.registerHelper("printProductDetails", function (product) {
  let html = "";
  // checking through a template because once saved in localStorage, the products lose their constructors
  let productTemplate = getProductByWholeId(product.id);
  if (productTemplate instanceof CustomizableProduct) {
    if (product.category === "pizza") {
      html += `<div class="pizza-desc">${product.size.split(" ")[0]} ${
        product.crustType
      }</div>`;
    }

    // check if product.ingredients are different than template ingredients and add differences
    if (
      JSON.stringify(product.initialIngredients) !==
      JSON.stringify(product.ingredients)
    ) {
      let ingredientDiff = '<div class="ingredient-diff">';
      let commonIngredients = 0;
      product.initialIngredients.forEach((ingredient) => {
        let index = product.ingredients.findIndex(
          (el) => el.id === ingredient.id
        );
        if (index > -1) {
          if (
            ingredient.isAdditional !== product.ingredients[index].isAdditional
          ) {
            commonIngredients++;
            ingredient.isAdditional
              ? (ingredientDiff += `<div class="extra_topp_text1">- ${ingredient.title}</div>`)
              : (ingredientDiff += `<div class="extra_topp_text2">+ ${ingredient.title}</div>`);
          }
        } else {
          // an ingredient from the original has been removed
          ingredient.isAdditional
            ? (ingredientDiff += `<div class="extra_topp_text3">- x2 ${ingredient.title}</div>`)
            : (ingredientDiff += `<div class="extra_topp_text4">- ${ingredient.title}</div>`);
        }
      });

      if (commonIngredients < product.ingredients.length) {
        // new ingredients have been added
        product.ingredients.forEach((ingredient) => {
          let index = product.initialIngredients.findIndex(
            (el) => el.id === ingredient.id
          );
          if (index < 0) {
            ingredient.isAdditional
              ? (ingredientDiff += `<div class="extra_topp_text5">+ x2 ${ingredient.title}</div>`)
              : (ingredientDiff += `<div class="extra_topp_text6">+ ${ingredient.title}</div>`);
          }
        });
      }
      ingredientDiff += "</div>";
      html += ingredientDiff;
    }
  }
  // TODO: add discount ribbon, if it applies
  return html;
});

Handlebars.registerHelper("getPricePerUnit", function (item) {
  return Product.getFinalPrice(item).toFixed(2);
});

Handlebars.registerHelper("getProductFinalPrice", function (item) {
  return (Product.getFinalPrice(item) * item.quantity).toFixed(2);
});

Handlebars.registerHelper("getTotalPrice", function (items) {
  let totalPrice = items.reduce(
    (sum, item) => (sum += Product.getFinalPrice(item) * item.quantity),
    0
  );
  return totalPrice.toFixed(2);
});

Handlebars.registerHelper("printProductIngredients", function (product) {
  let html = "";

  let categoriesAndIngredients = [
    [INGREDIENT_CATEGORY_SAUCES, ...ingredientManager.sauces],
    [INGREDIENT_CATEGORY_HERBS, ...ingredientManager.herbs],
    [INGREDIENT_CATEGORY_CHEESES, ...ingredientManager.cheeses],
    [INGREDIENT_CATEGORY_MEATS, ...ingredientManager.meats],
    [INGREDIENT_CATEGORY_VEGETABLES, ...ingredientManager.vegetables],
    [INGREDIENT_CATEGORY_MISC, ...ingredientManager.misc],
  ];

  for (let i = 0; i < categoriesAndIngredients.length; i++) {
    let column = `<div class="category-col">
    <h3 class="category-header">${categoriesAndIngredients[i][0]}</h3><ul>`;

    for (let j = 1; j < categoriesAndIngredients[i].length; j++) {
      let currentIngredient = categoriesAndIngredients[i][j];

      let isInProduct = product.initialIngredients.find(
        (ingredient) => ingredient.id === currentIngredient.id
      );

      let ingredientHTML = `<li>
      <input class="ingredient single-ingredient ${
        isInProduct ? "added" : ""
      }" type=${
        categoriesAndIngredients[i][0] === INGREDIENT_CATEGORY_SAUCES
          ? `"radio" name="sauce"`
          : `"checkbox" name="${currentIngredient.id}"`
      } id="${currentIngredient.id}" value="${currentIngredient.title}" 
        ${isInProduct ? "checked" : ""}>
      <label class="ingredient ${isInProduct ? "added" : ""}" for="${
        currentIngredient.id
      }">${currentIngredient.title}</label>
      <div class="additional-container">
        <input class="additional" type="checkbox" id="${
          currentIngredient.id
        }-Add" name="${currentIngredient.id}-Add" value="${
        currentIngredient.title
      }" 
          ${isInProduct ? (isInProduct.isAdditional ? "checked" : "") : ""}>
        <label class="additional" for="${currentIngredient.id}-Add">${
        INGREDIENT_NAMES_CONSTANTS.EXTRA
      }</label>
      </div>
    </li>`;

      column += ingredientHTML;
    }
    column += `</ul></div>`;
    html += column;
  }
  return html;
});
