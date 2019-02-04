const fs = require('fs');

let stdinBuffer = fs.readFileSync(0);
const inputs = stdinBuffer.toString().trim().split('\n');

let totalCharactersInCode = 0;
let totalCharactersInMemory = 0;

inputs.forEach((input) => {
    // console.log(`${input}`);

    // characters of code for string literals
    totalCharactersInCode += input.length;

    let mutableString = input;

    // check if string contains any escaped characters
    while (~mutableString.indexOf('\\')) {
        if (~mutableString.indexOf('\\')) {
            // there are escaped character(s)
            const currentCharIndex = mutableString.indexOf('\\');
            if (mutableString[currentCharIndex + 1] === 'x') {
                // hex to follow
                mutableString = mutableString.slice(0, currentCharIndex) + "i" + mutableString.slice(currentCharIndex + 4);
            } else {
                // just escaped one character
                mutableString = mutableString.slice(0, currentCharIndex) + "i" + mutableString.slice(currentCharIndex + 2);
            }
        }
    }

    // remove 2 for the front and back double quotes
    let charactersInMemory = mutableString.length;
    charactersInMemory -= 2;

    totalCharactersInMemory += charactersInMemory;
});

const answer = totalCharactersInCode - totalCharactersInMemory;
console.log(`The answer is ${answer}!`);
console.log(`For clarity: ${totalCharactersInCode} - ${totalCharactersInMemory}`);
