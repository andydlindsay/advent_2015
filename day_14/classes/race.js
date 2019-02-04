class Race {
    constructor(duration) {
        this.reindeer = [];
        this.timeElapsed = 0;
        this.duration = duration;
    }

    incrementTime() {
        this.timeElapsed += 1;
        this.checkReindeer();
        this.awardPoints();
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

    returnPointWinner() {
        let maxPoints = -Infinity;
        for (const reindeer of this.reindeer) {
            if (reindeer.points > maxPoints) {
                maxPoints = reindeer.points;
            }
        }
        return maxPoints;
    }

    awardPoints() {
        let leaders = [];
        let maxDistance = -Infinity;
        for (const reindeer of this.reindeer) {
            if (reindeer.distanceMoved > maxDistance) {
                maxDistance = reindeer.distanceMoved;
                leaders = [reindeer];
            } else if (reindeer.distanceMoved === maxDistance) {
                leaders.push(reindeer);
            }
        }
        for (const leader of leaders) {
            leader.points += 1;
        }
    }
}

module.exports = Race;
