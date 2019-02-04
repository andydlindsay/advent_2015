const { assert, expect } = require('chai');
const Reindeer = require('../classes/reindeer');
const Race = require('../classes/race');
const solution1 = require('../p1');

describe('Tests for day 14 problem', () => {

    describe('Reindeer class', () => {

        it('creates a new Reindeer object', () => {
            const options = {
                name: 'Rudolph',
                flySpeed: 10,
                flyDuration: 10,
                restDuration: 100
            };
            const rudolph = new Reindeer(options);
            expect(rudolph).to.be.instanceof(Reindeer);
        });

    });

    describe('Race class', () => {

        it('creates a new Race object', () => {
            const race = new Race(1000);
            expect(race).to.be.instanceof(Race);
        });

    });

    describe('Solution 1 tests', () => {

        it('returns 1120 given 1000', () => {
            const input = 1000;
            const output = 1120;
            assert.equal(solution1(input), output);
        });    
        
        it('returns 2640 given 2503', () => {
            const input = 2503;
            const output = 2640;
            assert.equal(solution1(input), output);
        });

    });

});
