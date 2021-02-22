const ingredient = (function () {
    class Ingredient {
        constructor(title, isAdditional, price) {
            this.title = title;
            this.isAdditional = isAdditional; // true or false;
            this.price = price; // if isAdditional = false, then price=0.00;
        }
    }
    return new Ingredient();
})();
