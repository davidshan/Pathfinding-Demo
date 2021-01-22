class Cell {
    constructor(offsetX, offsetY, size, traversable) {
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.size = size;
        this.traversable = traversable;
        this.path = false;
        this.isWall = Math.random() < 0.3;
        this.stage = 0;

        this.isStart = false;
        this.isEnd = false;

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
        return this.traversable;
    }

/*     isWall() {
        return this.isWall;
    }

    isStart() {
        return this.isStart;
    }

    isEnd() {
        return this.isEnd;
    } */

    // Setters
    setTraversed(value) {
        this.traversable = value;
    }

    setPath(value) {
        this.path = value;
    }

    setStart() {
        this.isWall = false;
        this.isStart = true;
    }

    setEnd() {
        this.isWall = false;
        this.isEnd = true;
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

        if (this.isStart) {
            fill(255, 0, 0);
        }

        if (this.isEnd) {
            fill(237, 217, 16);
        }

        if (this.isWall) {
            fill(0, 0, 0);
        }
    }

    toString() {
        return this.x + ", " + this.y;
    }
/*     // TODO
    constructor(colour) {

    }

    // TODO
    constructor(isWall) {

    } */
/* 
    fillColour() {

    }

    setTraversed() {

    }

    isTraversable() {
        return this.traversable;
    }

    draw() {

    } */
}