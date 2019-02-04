class Race {
    constructor(duration) {
        this.reindeer = [];
        this.timeElapsed = 0;
        this.duration = duration;
    }

    incrementTime() {
        this.timeElapsed += 1;
        this.checkReindeer();
    }

    checkReindeer() {
        for (const reindeer of this.reindeer) {
            reindeer.update();
        }
    }

    returnWinner() {
        let maxDist = -Infinity;
        for (const reindeer of this.reindeer) {
            if (reindeer.distanceMoved > maxDist) {
                maxDist = reindeer.distanceMoved;
            }
        }
        return maxDist;
    }
}

module.exports = Race;
