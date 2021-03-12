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
      html += `<div class="pizza-desc">${product.size.split(" ")[0]} ${product.crustType}</div>`;
    }

    // check if product.ingredients are different than template ingredients and add differences
    if (JSON.stringify(product.initialIngredients) !== JSON.stringify(product.ingredients)) {
      let ingredientDiff = "<div class=\"ingredient-diff\">";
      let commonIngredients = 0;
      product.initialIngredients.forEach(ingredient => {
        let index = product.ingredients.findIndex(el => el.id === ingredient.id);
        if (index > -1) {
          if (ingredient.isAdditional !== product.ingredients[index].isAdditional) {
            commonIngredients++;
            ingredient.isAdditional ? 
              ingredientDiff += `<div class="extra_topp_text1">- ${ingredient.title}</div>` :
              ingredientDiff += `<div class="extra_topp_text2">+ ${ingredient.title}</div>`;
          }
        } else {    // an ingredient from the original has been removed
          ingredient.isAdditional ?
            ingredientDiff += `<div class="extra_topp_text3">- x2 ${ingredient.title}</div>` :
            ingredientDiff += `<div class="extra_topp_text4">- ${ingredient.title}</div>`;  
        }
      })

      if (commonIngredients < product.ingredients.length) {   // new ingredients have been added
        product.ingredients.forEach(ingredient => {
          let index = product.initialIngredients.findIndex(el => el.id === ingredient.id);
          if (index < 0) {
            ingredient.isAdditional ? 
              ingredientDiff += `<div class="extra_topp_text5">+ x2 ${ingredient.title}</div>` :
              ingredientDiff += `<div class="extra_topp_text6">+ ${ingredient.title}</div>`;
          }
        })
      }
      ingredientDiff += "</div>";
      html += ingredientDiff;
    }
  }
  // TODO: add discount ribbon if it applies
  return html;
});
