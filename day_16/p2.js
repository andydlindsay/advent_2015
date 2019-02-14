const fs = require('fs');
const Aunt = require('./classes/aunt');

function solution() {

    // parse aunts
    let buffer = fs.readFileSync('./aunts.txt');
    const auntArray = buffer.toString().split('\n');
    const aunts = {};

    for (const aunt of auntArray) {
        const name = aunt.slice(0, aunt.indexOf(':'));
        const newAunt = new Aunt(name);
        const options = aunt.replace(`${name}:`, '').trim().split(' ');
        newAunt.addOptions(options);
        aunts[name] = newAunt;
    }

    // parse ticker
    buffer = fs.readFileSync('./analysis.txt');
    const analysisArray = buffer.toString().split('\n');

    for (const analytic of analysisArray) {
        for(const auntKey in aunts) {
            const aunt = aunts[auntKey];
            if (aunt.valid) {

                const prop = analytic.slice(0, analytic.indexOf(':'));
                const val = parseInt(analytic.split(' ')[1]);
                const greaterThan = ['cats', 'trees'];
                const lessThan = ['pomeranians', 'goldfish'];

                if (aunt[prop] !== undefined) {

                    if (greaterThan.includes(prop)) {
                        aunt.valid = aunt[prop] > val;
                    } else if (lessThan.includes(prop)) {
                        aunt.valid = aunt[prop] < val;
                    } else {
                        aunt.valid = aunt[prop] == val;
                    }

                }

            }
        }
    }

    for (const auntKey in aunts) {
        if (aunts[auntKey].valid) {
            console.log(aunts[auntKey]);
        }
    }

}

solution();
