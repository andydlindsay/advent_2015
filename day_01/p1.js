const fs = require('fs');

let stdinBuffer = fs.readFileSync(0);
const input = stdinBuffer.toString().trim().split('');

let currentFloor = 0;
let basementIndex;
let characterSet = false;

input.forEach((direction, index) => {
    switch(direction) {
        case '(':
            currentFloor++;
            break;
        case ')':
            currentFloor--;
            break;
    }
    if (currentFloor === -1 && !characterSet) {
        basementIndex = index + 1;
        characterSet = true;
    }
});

console.log(`The answer is ${currentFloor}!`);
console.log(`The basement index is ${basementIndex}!`);

// 6047 too high
// 6046 too high
