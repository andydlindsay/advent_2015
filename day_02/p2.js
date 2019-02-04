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
        this.ribbonNeeded = this.calcRibbonNeeded();
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
    calcRibbonNeeded() {
        const bowAmount = this.l * this.h * this.w;
        let dimArray = [ this.l, this.h, this.w ];
        // console.log(dimArray);
        dimArray = dimArray.sort((a, b) => {
            if (a > b) {
                return 1;
            } else {
                return 0;
            }
        });
        dimArray.pop();
        // console.log(dimArray);
        let totalNeeded = 0;
        dimArray.forEach((elem) => {
            totalNeeded += 2 * elem;
        });
        totalNeeded += bowAmount;
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
let ribbonNeeded = 0;
presents.forEach((present) => {
    totalNeeded += present.wrapNeeded;
    ribbonNeeded += present.ribbonNeeded;
});

const answer = totalNeeded;
console.log(`The answer is ${answer}!`);
console.log(`The amount of ribbon needed is ${ribbonNeeded}!`);

// 3829537 too high
