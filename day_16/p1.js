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
                const val = analytic.split(' ')[1];
                if (aunt[prop] !== undefined && aunt[prop] !== parseInt(val)) {
                    aunt.valid = false;
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
