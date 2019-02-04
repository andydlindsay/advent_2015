const fs = require('fs');

let stdinBuffer = fs.readFileSync(0);
const inputs = stdinBuffer.toString().trim().split('\n');

let totalCharactersInEncoded = 0;
let totalCharactersInCode = 0;

inputs.forEach((input) => {
    // characters of code for string literals
    totalCharactersInCode += input.length;

    let mutableString = input;
    let bonusCharacters = 0;

    for (let i = 0; i < mutableString.length; i++) {
        if (mutableString[i] === "\\") {
            if (mutableString[i + 1] === 'x') {
                bonusCharacters += 1;
                i += 3;
            } else {
                bonusCharacters += 2;
                i += 1;
            }
        }
    }

    // remove 2 for the front and back double quotes
    let charactersInEncoded = mutableString.length;
    charactersInEncoded += bonusCharacters;
    charactersInEncoded += 4;

    totalCharactersInEncoded += charactersInEncoded;
});

const answer = totalCharactersInEncoded - totalCharactersInCode;
console.log(`The answer is ${answer}!`);
console.log(`For clarity: ${totalCharactersInEncoded} - ${totalCharactersInCode}`);
