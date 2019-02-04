const fs = require('fs');

let stdinBuffer = fs.readFileSync(0);
const inputs = stdinBuffer.toString().trim().split('\n');

class Destination {
    constructor(name) {
        this.name = name;
        this.destinations = [];
    }
    getShortestPath(alreadyVisited) {
        let shortestDistance = -Infinity;
        let nearestNeighbour;
        const possibleNeighbours = this.destinations.filter((destination) => {
            if (alreadyVisited.includes(destination.destination)) {
                return false;
            } else {
                return true;
            }
        });
        if (possibleNeighbours.length === 0) {
            return null;
        }
        possibleNeighbours.forEach((destination) => {
            if (destination.distanceBetween > shortestDistance) {
                shortestDistance = destination.distanceBetween;
                nearestNeighbour = destination.destination;
            }
        });
        return { nearestNeighbour, shortestDistance };
    }
}

const destinationNames = [];
const destinations = [];

// populate destinations array
inputs.forEach((input) => {
    let inputPart = input.split(' = ');
    let destinationParts = inputPart[0].split(' to ');
    const destinationOne = destinationParts[0];
    const destinationTwo = destinationParts[1];
    if (destinationNames.indexOf(destinationOne) === -1) {
        destinationNames.push(destinationOne);
        destinations.push(new Destination(destinationOne));
    }
    if (destinationNames.indexOf(destinationTwo) === -1) {
        destinationNames.push(destinationTwo);
        destinations.push(new Destination(destinationTwo));
    }
});

// add distances between destinations
inputs.forEach((input) => {
    let inputPart = input.split(' = ');
    const distanceBetween = Number(inputPart[1]);
    let destinationParts = inputPart[0].split(' to ');
    const destinationOne = destinationParts[0];
    const destinationTwo = destinationParts[1];

    let destOneIndex;
    let destTwoIndex;
    destinations.forEach((destination, index) => {
        if (destination.name === destinationOne) {
            destOneIndex = index;
        }
        if (destination.name === destinationTwo) {
            destTwoIndex = index;
        }
    });

    // push into destinations arrays
    const destOne = destinations[destOneIndex];
    const destTwo = destinations[destTwoIndex];
    destOne.destinations.push({
        destination: destTwo,
        distanceBetween
    });
    destTwo.destinations.push({
        destination: destOne,
        distanceBetween
    });
});

const pathLengths = [];

// try shortest path from each starting point
destinations.forEach((destination) => {
    pathLengths.push(visit(destination));
});

function visit(destination, visited = [], distanceBetween = 0) {
    let distance = 0;
    if (!~visited.indexOf(destination)) {
        // first time visiting here
        visited.push(destination);
        const shortestPath = destination.getShortestPath(visited);
        if (shortestPath) {
            const { nearestNeighbour, shortestDistance } = shortestPath;
            distance += shortestDistance;
            distance += visit(nearestNeighbour, visited, distanceBetween);
        }
    }
    return distance;
}

console.log(pathLengths);
