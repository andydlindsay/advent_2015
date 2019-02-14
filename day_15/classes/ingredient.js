class Ingredient {
    constructor(options) {
        this.name = options.name;
        this.capacity = options.capacity;
        this.durability = options.durability;
        this.flavor = options.flavor;
        this.texture = options.texture;
        this.calories = options.calories;
    }
}

module.exports = Ingredient;
