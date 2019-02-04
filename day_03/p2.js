const fs = require('fs');

let stdinBuffer = fs.readFileSync(0);
const input = stdinBuffer.toString().trim().split('');

class House {
    constructor(x, y) {
        this.timesVisited = 1;
        this.up = null;
        this.right = null;
        this.down = null;
        this.left = null;
        this.neighbours = [];
        this.x = x;
        this.y = y;
    }
    calcNeighbours() {
        if (this.up) {
            this.neighbours.push(this.up);
        }
        if (this.right) {
            this.neighbours.push(this.right);
        }
        if (this.down) {
            this.neighbours.push(this.down);
        }
        if (this.left) {
            this.neighbours.push(this.left);
        }
    }
}

const startingHouse = new House(0, 0);
const santas = [startingHouse, startingHouse];
let currentTurn = 0;
let currentHouse;
const houses = [startingHouse];

// generate houses
input.forEach((instruction) => {
    let direction;
    currentHouse = santas[currentTurn % santas.length];
    let { x, y } = currentHouse;
    switch (instruction) {
        case '^':
            direction = 'up';
            y--;
            break;
        case '>':
            direction = 'right';
            x++;
            break;
        case 'v':
            direction = 'down';
            y++;
            break;
        case '<':
            direction = 'left';
            x--;
            break;
    }
    if (currentHouse[direction]) {
        // house already exists
        currentHouse = currentHouse[direction];
        currentHouse.timesVisited++;
    } else {
        // new house
        let oppositeDirection;
        switch (direction) {
            case 'up':
                oppositeDirection = 'down';
                break;
            case 'right':
                oppositeDirection = 'left';
                break;
            case 'down':
                oppositeDirection = 'up';
                break;
            case 'left':
                oppositeDirection = 'right';
                break;
        }
        const newHouse = new House(x, y);

        // check if house already exists
        let alreadyExists = false;
        houses.forEach((house) => {
            if (house.x === newHouse.x && house.y === newHouse.y) {
                currentHouse[direction] = house;
                house[oppositeDirection] = currentHouse;
                currentHouse = house;
                alreadyExists = true;
                currentHouse.timesVisited++;
            }
        });

        // create new house if necessary
        if (!alreadyExists) {
            currentHouse[direction] = newHouse;
            houses.push(newHouse);
            newHouse[oppositeDirection] = currentHouse;
            currentHouse = currentHouse[direction];
        }
    }
    // switch santas
    santas[currentTurn % santas.length] = currentHouse;
    currentTurn++;
});

let multiplePresents = 0;
let numHouses = 0;

function visit(node, visited = []) {
    if (!visited.includes(node)) {
        numHouses += 1;
        visited.push(node);
        if (node.timesVisited > 1) {
            multiplePresents++;
        }
        node.calcNeighbours();
        node.neighbours.forEach((neighbour) => {
            visit(neighbour, visited);
        });
    }
}

visit(startingHouse);

const answer = numHouses;
console.log(`The answer is ${answer}!`);
console.log(`And ${multiplePresents} houses received multiple presents!`);
