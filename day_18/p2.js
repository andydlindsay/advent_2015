const Node = require('./classes/node');
const Board = require('./classes/board');
const fs = require('fs');

function solution(fileName, numSteps) {

    const buffer = fs.readFileSync(fileName);
    const rows = buffer.toString().split('\n');
    const height = rows.length;
    const width = rows[0].length;

    const board = new Board(width, height);
    rows.forEach((row, yIndex) => {
        row.split('').forEach((val, xIndex) => {
            const coords = { x: xIndex, y: yIndex };
            const state = val === '.' ? false : true;
            board.addNode(new Node(coords, state));
        });
    });

    const corners = [`0,0`, `0,${height - 1}`, `${width - 1},${height - 1}`, `${width - 1},0`];
    for (const corner of corners) {
        board.nodes[corner].state = true;
    }

    for (let step = 1; step <= numSteps; step++) {

        // calc nextState
        for (const nodeKey in board.nodes) {
            const node = board.nodes[nodeKey];
            node.nextState = board.getNextState(node);
        }

        // update board
        for (const nodeKey in board.nodes) {
            const node = board.nodes[nodeKey];
            node.state = node.nextState;
        }

        // turn corners on
        for (const corner of corners) {
            board.nodes[corner].state = true;
        }

    }

    return board.countLit();

}

module.exports = solution;
