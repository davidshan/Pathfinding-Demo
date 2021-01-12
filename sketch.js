const CELLSIZE = 32;
const GRIDSIZE = 20;

const grid = new Array();

/* CORE DRAWING FUNCTIONS (p5.js) */
function setup() {
    createCanvas(2000, 2000);
    initGrid();

    grid[1][2].setTraversed(false);
    console.log(grid);
}

function draw() {
    if (mouseIsPressed) {
        const old = grid[1][2].isTraversable;
        grid[1][2].setTraversed(!old);
    }
    displayGrid();
}

/* HELPER FUNCTIONS */
function displayGrid() {
    for (i = 0; i < GRIDSIZE; i++) {
        for (j = 0; j < GRIDSIZE; j++) {
            grid[i][j].display();
        }
    }
}

function initGrid() {
    for (i = 0; i < GRIDSIZE; i++) {
        row = new Array();
        grid.push(row);

        posY = i * CELLSIZE;

        for (j = 0; j < GRIDSIZE; j++) {
            posX = j * CELLSIZE;
            row.push(new Cell(posX, posY, true));
        }
    }
}