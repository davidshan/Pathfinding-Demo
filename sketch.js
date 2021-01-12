currXOffset = 0;
currYOffset = 0;
currSize = 32;

grid = new Array();

function setup() {
    createCanvas(2000, 2000);

    for (i = 0; i < 20; i++) {
        row = new Array();
        grid.push(row);
        for (j = 0; j < 20; j++) {
            posX = currXOffset * currSize;
            posY = currYOffset * currSize;
    
            let square = new Cell(posX, posY, true);
            row.push(square);
    
            currXOffset++;
        }

        currYOffset++;
        currXOffset = 0;
    }

    grid[1][2].setTraversed(false);
    console.log(grid);
}