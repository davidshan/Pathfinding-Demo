class Cell {
    constructor(offsetX, offsetY, size, traversable) {
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.size = size;
        this.traversable = traversable;
        this.path = false;
        this.wall = Math.random() < 0.3;
        this.stage = 0;

        this.start = false;
        this.end = false;

        this.x = offsetX / Math.floor(size);
        this.y = offsetY / Math.floor(size);

        this.currentColour = Cell.stages[0];

        // TODO: error checking
    }

    static stages = {
        0: 'rgba(255, 255, 255, 1)',
        1: 'rgba(102, 204, 0, 0.1)',
        5: 'rgba(102, 204, 0, 0.2)',
        10: 'rgba(102, 204, 0, 0.3)',
        15: 'rgba(102, 204, 0, 0.4)',
        20: 'rgba(102, 204, 0, 0.5)',
        25: 'rgba(102, 204, 0, 0.6)',
        30: 'rgba(102, 204, 0, 0.7)',
        35: 'rgba(102, 204, 0, 0.8)',
        40: 'rgba(102, 204, 0, 0.9)',
        45: 'rgba(102, 204, 0, 1)'
    };

    // Getters
    isTraversable() {
        return this.traversable && !this.wall;
    }

    isWall() {
        return this.wall;
    }

    isStart() {
        return this.start;
    }

    isEnd() {
        return this.end;
    }

    // Setters
    setTraversable(value) {
        this.traversable = value;
    }

    setPath(value) {
        this.path = value;
    }

    setStart() {
        this.wall = false;
        this.start = true;
    }

    setEnd() {
        this.wall = false;
        this.end = true;
    }

    increaseStage() {
        if (!this.traversable) {
            this.stage++;
        }
    }

    display() {
        this.determineColour();
        square(this.offsetX, this.offsetY, this.size);
    }

    determineColour() {
        // Display different colour based on traversable and
        // other variables (yet to be defined)
        if (this.traversable) {
            fill(255, 255, 255);
        } else {
            if (this.stage in Cell.stages) {
                this.currentColour = Cell.stages[this.stage];
            }

            fill(this.currentColour);
        }

        if (this.path) {
            fill(0, 0, 255);
        }

        if (this.start) {
            fill(255, 0, 0);
        }

        if (this.end) {
            fill(237, 217, 16);
        }

        if (this.wall) {
            fill(0, 0, 0);
        }
    }

    toString() {
        return this.x + ", " + this.y;
    }
}
