class Cell {
    constructor(offsetX, offsetY, size, traversable) {
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.size = size;
        this.traversable = traversable;
        this.isWall = Math.random() < 0.3;

        this.isStart = false;
        this.isEnd = false;

        this.x = offsetX / Math.floor(size);
        this.y = offsetY / Math.floor(size);

        // TODO: error checking
    }

    static stages = {
        1: [0, 0, 255, 0.9],
        10: [0, 0, 255, 0.7],
        20: [0, 0, 255, 0.5],
        30: [0, 0, 255, 0.3],
        50: [0, 0, 255, 0.1],
        80: [0, 0, 255, 0]
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

    setStart() {
        this.isWall = false;
        this.isStart = true;
    }

    setEnd() {
        this.isWall = false;
        this.isEnd = true;
    }

    display() {
        // Display different colour based on traversable and
        // other variables (yet to be defined)
        if (this.traversable) {
            fill(255, 255, 255);
        } else {
            fill(0, 0, 255); 
        }

        if (this.isStart) {
            fill(255, 0, 0);
        }

        if (this.isEnd) {
            fill(0, 255, 0);
        }

        if (this.isWall) {
            fill(0, 0, 0);
        }

        square(this.offsetX, this.offsetY, this.size);
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