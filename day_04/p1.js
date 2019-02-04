const fs = require('fs');
const md5 = require('md5');

let stdinBuffer = fs.readFileSync(0);
const input = stdinBuffer.toString().trim();

let numLoops = 0;

while (true) {
    const message = md5(input + String(numLoops));
    if (message.slice(0, 6) === '000000') {
        // found a match
        break;
    }
    numLoops++;
}

console.log(numLoops);
