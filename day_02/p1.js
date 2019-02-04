const fs = require('fs');

let stdinBuffer = fs.readFileSync(0);
const input = stdinBuffer.toString().trim().split('\n');

class Present {
    constructor(l, w, h) {
        this.l = l;
        this.w = w;
        this.h = h;
        this.sides = [ 2 * this.l * this.w, 2 * this.w * this.h, 2 * this.h * this.l ];
        this.wrapNeeded = this.calcWrapNeeded();
    }
    calcWrapNeeded() {
        let smallestSide = Infinity;
        let totalNeeded = 0;
        this.sides.forEach((side) => {
            totalNeeded += side;
            if (side < smallestSide) {
                smallestSide = side;
            }
        });
        totalNeeded += smallestSide / 2;
        return totalNeeded;
    }
}

const presents = [];

input.forEach((row) => {
    const rowArray = row.split('x');
    const l = Number(rowArray[0]);
    const w = Number(rowArray[1]);
    const h = Number(rowArray[2]);
    presents.push(new Present(l, w, h));
});

let totalNeeded = 0;
presents.forEach((present) => {
    totalNeeded += present.wrapNeeded;
});

const answer = totalNeeded;
console.log(`The answer is ${answer}!`);
