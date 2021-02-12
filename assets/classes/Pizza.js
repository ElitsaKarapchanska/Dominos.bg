class Pizza extends Product{
    constructor(title,image,ingredients,price, quantity){
        super(title,image,price,quantity);
        this.ingredients=ingredients;
    }

}