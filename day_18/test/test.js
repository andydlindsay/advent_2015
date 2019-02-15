const { assert, expect } = require('chai');
const Node = require('../classes/node');
const Board = require('../classes/board');
const p1Solution = require('../p1');
const p2Solution = require('../p2');

describe('Tests for Day 18', () => {

    describe('Tests for Node class', () => {

        it('creates a new Node instance when called', () => {
            const newNode = new Node({ x: 5, y: 3 }, true);
            assert.equal(newNode.name, '5,3');
            assert.equal(newNode.state, true);
            expect(newNode).to.be.instanceOf(Node);
        });

    });

    describe('Tests for Board class', () => {

        it('creates a new Board instance when called', () => {
            const newBoard = new Board(6, 6);
            assert.equal(newBoard.width, 6);
            assert.equal(newBoard.height, 6);
            expect(newBoard).to.be.instanceOf(Board);
        });

        it('can add a new Node to its nodes collection', () => {
            const newNode = new Node({ x: 3, y: 5 }, false);
            const newBoard = new Board(6, 6);
            newBoard.addNode(newNode);
            assert.equal(newBoard.nodes[newNode.name], newNode);
        });

        it('can return the neighbours of a Node', () => {
            const newBoard = new Board(6, 6);
            for (let row = 0; row < newBoard.height; row++) {
                for (let col = 0; col < newBoard.width; col++) {
                    newBoard.addNode(new Node({ x: col, y: row }, false));
                }
            }
            const node = newBoard.nodes['3,3'];
            const neighbours = newBoard.findNeighbours(node);
            assert.equal(neighbours.length, 8);
            const borderNode = newBoard.nodes['0,0'];
            const borderNeighbours = newBoard.findNeighbours(borderNode);
            assert.equal(borderNeighbours.length, 3);
        });

        it('can count the number of lights that are lit', () => {
            const newBoard = new Board(6, 6);
            for (let row = 0; row < newBoard.height; row++) {
                for (let col = 0; col < newBoard.width; col++) {
                    newBoard.addNode(new Node({ x: col, y: row }, true));
                }
            }
            assert.equal(newBoard.countLit(), 36);
        });

    });

    describe('Tests for part one solution', () => {

        it('p1Solution() is a function', () => {
            expect(p1Solution).to.be.a('function');
        });

        it('returns 4 given test data and 4 steps as input', () => {
            assert.equal(p1Solution('./data/data.txt', 4), 4);
        });

        it('returns 821 given question data and 100 steps as input', () => {
            assert.equal(p1Solution('./data/day18.txt', 100), 821);
        });

    });

    describe('Tests for part two solution', () => {

        it('p2Solution() is a function', () => {
            expect(p2Solution).to.be.a('function');
        });

        it('returns 17 after 5 steps with test data', () => {
            assert.equal(p2Solution('./data/data2.txt', 5), 17);
        });

        it('returns 886 given question data and 100 steps as input', () => {
            assert.equal(p2Solution('./data/day18.txt', 100), 886);
        });

    });

});
