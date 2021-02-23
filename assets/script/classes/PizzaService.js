const pizzaManager = (function () {
    class Pizza extends Product {
        constructor(title, image, price, weight) {
            super(title, image, price, weight);
            this.ingredients = []; // array from Ingredients;
        }

    }
    class PizzaManager {
        constructor() {
            this.newPizzas = [];
            this.spicyPizzas = [];
            this.vegetariansPizzas = [];
            this.leanPizzas = [];
            this.allPizzas = [];
        }
    }
    return new PizzaManager();
})();
