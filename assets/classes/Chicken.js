class Chicken extends Product {
    constructor(description, title, price, quantity, image) {
        super(title, image, price, quantity);
        this.description=description;
    }
}
