const fs = require('fs');

let stdinBuffer = fs.readFileSync(0);
const inputs = stdinBuffer.toString().trim().split('\n');

function isPasswordValid(testPassword) {
    let isValid = true;

    // contains at least one increasing straight of 3 characters
    let previousChar;
    let currentChar;
    let nextChar;
    let hasStraight = false;
    for (let i = 0; i < testPassword.length; i++) {
        previousChar = currentChar;
        currentChar = testPassword[i];
        nextChar = testPassword[i + 1];
        if (previousChar) {
            const startingCharCode = previousChar.charCodeAt();
            const secondCharacter = String.fromCharCode(startingCharCode + 1);
            const thirdCharacter = String.fromCharCode(startingCharCode + 2);
            if (currentChar === secondCharacter && nextChar === thirdCharacter) {
                hasStraight = true;
            }
        }
    }
    if (!hasStraight) {
        isValid = false;
    }

    // may not contain i, o, or l
    const invalidLetters = [ 'i', 'o', 'l' ];
    for (let i = 0; i < testPassword.length; i++) {
        if (invalidLetters.includes(testPassword[i])) {
            isValid = false;
        }
    }

    // contains at least 2 different non-overlapping pairs of letters
    currentChar = undefined;
    previousChar = undefined;
    let numPairs = 0;
    for (let i = 0; i < testPassword.length; i++) {
        previousChar = currentChar;
        currentChar = testPassword[i];
        if (currentChar === previousChar) {
            numPairs++;
            currentChar = undefined;
        }
    }
    if (numPairs < 2) {
        isValid = false;
    }

    return isValid;
}

function nextPassword(currentPassword) {
    let newPassword = currentPassword.split('');
    let currentIndex = newPassword.length - 1;
    while (true) {
        const charCode = newPassword[currentIndex].charCodeAt();
        const newCharCode = charCode + 1 > 122 ? 97 : charCode + 1;
        newPassword[currentIndex] = String.fromCharCode(newCharCode);
        if (charCode + 1 > 122) {
            // it wrapped
            currentIndex--;
        } else {
            return newPassword.join('');
        }
    }
}

function nextValidPassword(startingPassword) {
    let currentPassword = startingPassword;
    while (true) {
        currentPassword = nextPassword(currentPassword);
        if (isPasswordValid(currentPassword)) {
            return currentPassword;
        }
    }
}

// tests
console.log();
inputs.forEach((input) => {
    const result = isPasswordValid(input);
    console.log(`${input} ${result ? 'is' : 'is not'} a valid password`);
    const newPassword = nextValidPassword(input);
    console.log(`The next password after ${input} is ${newPassword}`);
    console.log();
});
