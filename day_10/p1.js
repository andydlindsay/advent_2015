const fs = require('fs');

let stdinBuffer = fs.readFileSync(0);
const input = stdinBuffer.toString().trim().split('\n')[0];

const numLoops = 50;
let currentValue = input;
let previousValue;

for (let turn = 0; turn < numLoops; turn++) {
    previousValue = currentValue;

    // calculate currentValue based on previousValue
    previousValue = previousValue.toString();
    let currentChar;
    let previousChar;
    let previousStreak;
    let currentStreak = 1;
    let nextValue = '';
    for (let i = 0; i <= previousValue.length; i++) {
        currentChar = previousValue[i];
        if (currentChar === previousChar) {
            currentStreak += 1;
        } else {
            // new character
            previousStreak = currentStreak;
            currentStreak = 1;
            if (previousChar) {
                nextValue = nextValue + previousStreak.toString() + previousChar;
            }
        }
        previousChar = currentChar;
    }

    currentValue = nextValue;
    // console.log(`${previousValue} becomes ${currentValue}`);
}

const answer = currentValue.length;
console.log(`The answer is ${answer}!`);
