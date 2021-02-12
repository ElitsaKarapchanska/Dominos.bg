class Sandwich extends Product {
    constructor(title, price, image, quantity, ingredients) {
        super(title, price, image, quantity);
        this.ingredients=ingredients;
    }
}
