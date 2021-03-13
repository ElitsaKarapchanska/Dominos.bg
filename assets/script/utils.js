function changeElementVisibility(element, toShow = true, displayVisible = "block") {
  toShow ? (element.style.display = displayVisible) : (element.style.display = "none");
}

function getById(id) {
  return document.getElementById(id);
}

function filterPizzas(productToGet,fromWhere){
   
  productToGet.addEventListener("click",function(){
    if(productToGet.checked){
      pizza.innerHTML="";
      displayCustomizableProduct(fromWhere, pizza);
      }else{
        displayCustomizableProduct(pizzaManager.allPizzas, pizza);
      }
  })
}
function filterPastas(productToGet,fromWhere){
    productToGet.addEventListener("click",function(){
      if(productToGet.checked){
        pasta.innerHTML="";
        displayCustomizableProduct(fromWhere, pasta);
        }else{
          displayCustomizableProduct(pastaManager.allPasta, pasta);
        }
    })
}
function filterSauces(productToGet,fromWhere){
  productToGet.addEventListener("click",function(){
    if(productToGet.checked){
      sauce.innerHTML="";
      displaySimpleProduct(fromWhere, sauce);
    }else{
      displaySimpleProduct(sauceManager.allSauces, sauce);
    }
  })
}
function filterDesserts(productToGet,fromWhere){
  productToGet.addEventListener("click",function(){
    if(productToGet.checked){
      dessert.innerHTML="";
      displaySimpleProduct(fromWhere,  dessert);
    }else{
      displaySimpleProduct(dessertManager.allDesserts,  dessert);
    }
  })
}
function filterStarters(productToGet,fromWhere){
  productToGet.addEventListener("click",function(){
    if(productToGet.checked){
      starter.innerHTML="";
      displaySimpleProduct(fromWhere,  starter);
    }else{
      displaySimpleProduct(starterManager.allStarters, starter);
    }
  })
}
