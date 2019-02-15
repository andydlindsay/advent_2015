class Node {
    constructor(coords, state) {
        this.name = `${coords.x},${coords.y}`;
        this.nextState = null;
        this.state = state;
        this.x = coords.x;
        this.y = coords.y;
    }
}

module.exports = Node;
