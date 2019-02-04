class Reindeer {
    constructor(options) {
        this.name = options.name;
        this.flySpeed = options.flySpeed;
        this.flyDuration = options.flyDuration;
        this.restDuration = options.restDuration;
        this.distanceMoved = 0;
        this.currentState = 'flying';
        this.timer = 0;
    }

    update() {
        this.timer += 1;
        switch (this.currentState) {
            case 'flying':
                this.distanceMoved += this.flySpeed;
                if (this.timer === this.flyDuration) {
                    this.timer = 0;
                    this.currentState = 'resting';
                }
                break;
            case 'resting':
                if (this.timer === this.restDuration) {
                    this.timer = 0;
                    this.currentState = 'flying';
                }
                break;
        }
    }
}

module.exports = Reindeer;
