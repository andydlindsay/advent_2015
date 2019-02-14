const { assert, expect } = require('chai');
const solution1 = require('../p1');
const solution2 = require('../p2');
const Ingredient = require('../classes/ingredient');
const Recipe = require('../classes/recipe');

describe('Tests for day 15 problem', () => {

    describe('Ingredient class', () => {

        it('creates a new Ingredient object', () => {
            const options = {
                name: 'Cinnamon',
                capacity: 2,
                durability: 3,
                flavor: -2,
                texture: -1,
                calories: 8
            };
            const cinnamon = new Ingredient(options);
            expect(cinnamon).to.be.instanceof(Ingredient);
        });

    });

    describe('Recipe class', () => {

        it('creates a new Recipe object', () => {
            const newRecipe = new Recipe();
            expect(newRecipe).to.be.instanceof(Recipe);
        });

    });

    describe('Solution 1 tests', () => {

        describe('Test data check', () => {

            it('returns 62842880 given the test data', () => {
                const input = 'test.txt';
                const output = 62842880;
                assert.equal(solution1(input), output);
            });
    
        });

    });

    describe('Solution 2 tests', () => {



    });

});