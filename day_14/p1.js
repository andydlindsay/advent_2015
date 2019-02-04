const fs = require('fs');
const Reindeer = require('./classes/reindeer');
const Race = require('./classes/race');

function reindeerRace(duration) {

    const race = new Race(duration);

    // create reindeer
    const buffer = fs.readFileSync('./input.txt');
    const reindeerArr = buffer.toString().split('\n');
    for (const reindeer of reindeerArr) {
        const info = reindeer.split(' ');
        const options = {
            name: info[0],
            flySpeed: parseInt(info[3]),
            flyDuration: parseInt(info[6]),
            restDuration: parseInt(info[13])
        };
        race.reindeer.push(new Reindeer(options));
    }

    for (let i = 1; i <= race.duration; i++) {
        race.incrementTime();
    }

    return race.returnWinner();

}

module.exports = reindeerRace;
