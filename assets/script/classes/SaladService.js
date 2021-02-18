const saladManager = (function () {
    class Salad extends Product {
        constructor(title, price, image, weight) {
            super(title, image, price, weight);
            this.ingredients = []; // array from Ingredients;
            this.tags = [];
        }
    }
    class SaladManager {
        constructor() {
            this.allSalads = [];
        }
    }
    return new SaladManager();
})
