class Aunt {
    constructor(name) {
        this.name = name;
        this.valid = true;
    }

    addOptions(options) {
        for (let i = 0; i < options.length; i += 2) {
            this[options[i].slice(0, options[i].length - 1)] = parseInt(options[i + 1]);
        }
    }
}

module.exports = Aunt;
