const drinkManager = (function () {
    class Drink {
        constructor(title, price, image) {
            this.title = title;
            this.price = price;
            this.image = image;
            this.tags = []; // array;
            this.types = [];
        }
    }
    class DrinkManager {
        constructor() {
            this.drinks = [];
        }
    }
    return new DrinkManager();
})();
