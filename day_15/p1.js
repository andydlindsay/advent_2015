const fs = require('fs');
const Recipe = require('./classes/recipe');
const Ingredient = require('./classes/ingredient');

function solution(fileName) {

    const buffer = fs.readFileSync(fileName);
    const ingredients = buffer.toString().split('\n');
    const maxIngredients = 100;
    const recipe = new Recipe();
    let maxValue = -Infinity;

    // parse ingredients
    for (const ingredient of ingredients) {
        const info = ingredient.split(' ');
        const options = {
            name: info[0].slice(0, info[0].length - 1),
            capacity: parseInt(info[2]),
            durability: parseInt(info[4]),
            flavor: parseInt(info[6]),
            texture: parseInt(info[8]),
            calories: parseInt(info[10])
        };
        recipe.ingredients.push(new Ingredient(options));
    }

    // test all possible recipes
    for (let i = 0; i <= maxIngredients; i++) {
        const ingredientQuantities = {};
        recipe.ingredients.forEach((ingredient) => {
            ingredientQuantities[ingredient] = i;
        });
    }

    return maxValue;

}

solution('test.txt');


// 2 ingredients
// choose 1 value less than 100
// other value is 100 - first value

// 3 ingredients
// choose 1 value less than 100
// choose 2nd value less than 100 - first value
// 3rd value is 100 - first value - second value
