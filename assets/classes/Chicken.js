class Chicken extends Product {
    constructor(description, title, price, weight, image) {
        super(title, image, price, weight);
        this.description=description;
    }
}
