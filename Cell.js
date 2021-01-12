class Cell {
    constructor(offsetX, offsetY, traversable) {
        this.traversable = traversable;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.size = 32;

        square(offsetX, offsetY, this.size);
        
        // TODO: error checking
    }

    setTraversed(value) {
        if (value == true) {
            fill(255, 255, 255);
        } else {
            fill(0, 0, 255); 
        }
        this.traversable = value;
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