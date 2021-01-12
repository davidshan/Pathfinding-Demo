class Cell {
    constructor(offsetX, offsetY, traversable) {
        this.traversable = traversable;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.size = 32;
        
        // TODO: error checking
    }

    get isTraversable() {
        return this.traversable;
    }

    setTraversed(value) {
        this.traversable = value;
    }

    display() {
        // Display different colour based on traversable and
        // other variables (yet to be defined)
        if (this.traversable) {
            fill(255, 255, 255);
        } else {
            fill(0, 0, 255); 
        }

        square(this.offsetX, this.offsetY, this.size);
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