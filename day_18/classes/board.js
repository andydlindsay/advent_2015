class Board {
    constructor(width, height) {
        this.nodes = {};
        this.width = width;
        this.height = height;
    }

    addNode(node) {
        this.nodes[node.name] = node;
    }

    findNeighbours(node) {
        const neighbours = [];
        const { x, y } = node;

        // above left
        if (x - 1 >= 0 && y - 1 >= 0) {
            neighbours.push(this.nodes[`${x - 1},${y - 1}`]);
        }

        // above
        if (y - 1 >= 0) {
            neighbours.push(this.nodes[`${x},${y - 1}`]);
        }

        // above right
        if (x + 1 < this.width && y - 1 >= 0) {
            neighbours.push(this.nodes[`${x + 1},${y - 1}`]);
        }

        // right
        if (x + 1 < this.width) {
            neighbours.push(this.nodes[`${x + 1},${y}`]);
        }

        // below right
        if (x + 1 < this.width && y + 1 < this.height) {
            neighbours.push(this.nodes[`${x + 1},${y + 1}`]);
        }

        // below
        if (y + 1 < this.height) {
            neighbours.push(this.nodes[`${x},${y + 1}`]);
        }

        // below left
        if (x - 1 >= 0 && y + 1 < this.height) {
            neighbours.push(this.nodes[`${x - 1},${y + 1}`]);
        }

        // left
        if (x - 1 >= 0) {
            neighbours.push(this.nodes[`${x - 1},${y}`]);
        }

        return neighbours;
    }

    countLit() {
        let litCount = 0;
        for (const node in this.nodes) {
            if (this.nodes[node].state) {
                litCount++;
            }
        }
        return litCount;
    }

    getNextState(node) {
        const neighbours = this.findNeighbours(node);
        const litNeighbours = neighbours
            .filter(neighbour => neighbour.state)
            .length;
        if (node.state) {
            return [2, 3].includes(litNeighbours);
        } else {
            return litNeighbours === 3;
        }
    }

}

module.exports = Board;
