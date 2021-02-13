class Sandwich extends Product {
    constructor(title, price, image, weight, ingredients) {
        super(title, price, image, weight);
        this.ingredients=[]; // array from Ingredients;
    }
}
