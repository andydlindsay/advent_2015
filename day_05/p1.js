const fs = require('fs');

let stdinBuffer = fs.readFileSync(0);
const inputs = stdinBuffer.toString().trim().split('\n');

// - at least one character appears twice in a row
// - does not contain ab, cd, pw, or xy

const vowels = [ 'a', 'e', 'i', 'o', 'u' ];
const illegalCombos = [ 'ab', 'cd', 'pq', 'xy' ];
let numNiceWords = 0;

inputs.forEach((input) => {
    let isNice = true;
    
    // contains 3 or more vowels
    let numVowels = 0;
    for (let i = 0; i < input.length; i++) {
        if (vowels.includes(input[i])) {
            numVowels++;
        }
    }
    if (numVowels < 3) {
        isNice = false;
    }

    // at least one character appears twice in a row
    let twiceInARow = false;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === input[i + 1]) {
            twiceInARow = true;
        }
    }
    if (!twiceInARow) {
        isNice = false;
    }

    // doesn't contain an illegal string
    let hasIllegalString = false;
    for (let i = 0; i < input.length; i++) {
        const testString = input[i] + input[i + 1];
        if (illegalCombos.includes(testString)) {
            hasIllegalString = true;
        }
    }
    if (hasIllegalString) {
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
