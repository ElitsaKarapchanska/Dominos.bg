class Salad extends Product {
    constructor(title, price, image, weight, ingredients) {
        super(title, image, price, weight);
        this.ingredients=[]; // array from Ingredients;
    }
}
