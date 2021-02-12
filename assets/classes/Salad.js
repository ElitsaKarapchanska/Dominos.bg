class Salad extends Product {
    constructor(title, price, image, quantity, ingredients) {
        super(title, image, price, quantity);
        this.ingredients=ingredients;
    }
}
