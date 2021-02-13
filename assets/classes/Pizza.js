class Pizza extends Product {
    constructor(title, image, ingredients, price, weight) {
        super(title, image, price, weight);
        this.ingredients=[]; // array from Ingredients;
    }

}
