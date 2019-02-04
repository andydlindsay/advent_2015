const fs = require('fs');

let stdinBuffer = fs.readFileSync(0);
const input = JSON.parse(stdinBuffer.toString());

// argument to visit will be object, array, or value (string/number)

function visit(node) {
    let sum = 0;
    if (Array.isArray(node)) {
        node.forEach((elem) => {
            sum += visit(elem);
        });
    } else if (typeof node === 'object') {
        let cont = true;
        for (let key in node) {
            if (node[key] === 'red') {
                cont = false;
            }
        }
        if (cont) {
            for (let key in node) {
                sum += visit(node[key]);
            }
        }
    } else if (!isNaN(node)) {
        sum += Number(node);
    }
    return sum;
}

const sum = visit(input);

const answer = sum;
console.log(`The answer is ${answer}!`);

// 71802 too low
