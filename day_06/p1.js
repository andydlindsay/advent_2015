const fs = require('fs');

let stdinBuffer = fs.readFileSync(0);
const inputs = stdinBuffer.toString().trim().split('\n');

class Light {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.lit = false;
    }
    toggleLit() {
        this.lit = !this.lit;
    }
    turnOn() {
        this.lit = true;
    }
    turnOff() {
        this.lit = false;
    }
}

const lights = [];

for (let y = 0; y < 1000; y++) {
    lights.push([]);
    for (let x = 0; x < 1000; x++) {
        lights[y].push(new Light(x, y));
    }
}

class Instruction {
    constructor(instructionType, topCoord, bottomCoord) {
        this.instructionType = instructionType;
        this.topLeftX = topCoord.x;
        this.topLeftY = topCoord.y;
        this.bottomRightX = bottomCoord.x;
        this.bottomRightY = bottomCoord.y;
    }
}

const instructions = [];

inputs.forEach((input) => {
    inputArray = input.split(' ');
    let instructionType = 'toggle';
    let topLeft;
    if (inputArray.length === 5) {
        // instruction is turn on or turn off
        if (inputArray[1] === 'on') {
            instructionType = 'on';
        } else {
            instructionType = 'off';
        }
        topLeft = inputArray[2].split(',');
    } else {
        topLeft = inputArray[1].split(',');
    }
    const bottomRight = inputArray[inputArray.length - 1].split(',');
    const topCoord = {
        x: Number(topLeft[0]),
        y: Number(topLeft[1])
    };
    const bottomCoord = {
        x: Number(bottomRight[0]),
        y: Number(bottomRight[1])
    };
    instructions.push(new Instruction(instructionType, topCoord, bottomCoord));
});

// execute instructions
instructions.forEach(({ topLeftX, topLeftY, bottomRightX, bottomRightY, instructionType }) => {
    for (let y = topLeftY; y <= bottomRightY; y++) {
        for (let x = topLeftX; x <= bottomRightX; x++) {
            switch (instructionType) {
                case 'toggle':
                    lights[y][x].toggleLit();
                    break;
                case 'on':
                    lights[y][x].turnOn();
                    break;
                case 'off':
                    lights[y][x].turnOff();
                    break;
            }
        }
    }
});

let numLit = 0;
for (let y = 0; y < 1000; y++) {
    for (let x = 0; x < 1000; x++) {
        if (lights[y][x].lit) {
            numLit++;
        }
    }
}

const answer = numLit;
console.log(`The answer is ${answer}!`);
