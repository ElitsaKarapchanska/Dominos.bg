const ingredient = (function () {
    class Ingredient {
        constructor(title, isAdditional, price, id) {
            this.title = title;
            this.isAdditional = isAdditional; // true or false;
            this.price = price; // if isAdditional = false, then price=0.00;
            this.id = id;
        }
    }
    return new Ingredient();
})();
