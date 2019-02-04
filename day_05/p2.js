const fs = require('fs');

let stdinBuffer = fs.readFileSync(0);
const inputs = stdinBuffer.toString().trim().split('\n');

let numNiceWords = 0;

// contains a pair of any two letters that appears at least twice in the string without overlapping
// contains at least one letter which repeats with exactly one letter between them

inputs.forEach((input) => {
    let isNice = true;
    
    // contains a pair of any two letters that appears at least twice
    let dupesFound = false;
    for (let i = 0; i < input.length; i++) {
        const testLetters = input[i] + input[i + 1];
        for (let j = i + 2; j < input.length; j++) {
            const tester = input[j] + input[j + 1];
            if (testLetters === tester) {
                dupesFound = true;
            }
        }
    }
    if (!dupesFound) {
        isNice = false;
    }

    // contains letters that repeat with another letter between them
    let hasSpacedPair = false;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === input[i + 2]) {
            hasSpacedPair = true;
        }
    }
    if (!hasSpacedPair) {
        isNice = false;
    }

    if (isNice) {
        console.log(`${input} is a nice word`);
        numNiceWords++;
    } else {
        console.log(`${input} is a naughty word`);
    }
});

const answer = numNiceWords;
console.log(`The answer is ${answer}!`);

// 242 too high
