const dessertManager = (function () {
    class Dessert extends Product {
        constructor(title, image, price, weight, description, tags) {
            super(title, image, price, weight);
            this.description = description;
            this.tags = tags;
        }
    }
    class DessertManager {
        constructor() {
            this.desserts = [];
            this.icecreams = [];
            this.allDesserts = [];
        }
    }
    return new DessertManager();
})();
