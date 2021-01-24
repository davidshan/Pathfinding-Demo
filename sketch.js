const CELLSIZE = 16;
const GRIDSIZE = 40;

const grid = new Array();

// Pathfinding Variables

// A* search variables
const frontier = new PriorityQueue();
const costs = {};
const parents = {};

// DFS (or general) search variables
const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
const stack = [];
let finished = false;
let pathExists = false;
let currCell = null;

let start = end = null;

/* CORE DRAWING FUNCTIONS (p5.js) */
function setup() {
    createCanvas(2000, 2000);
    frameRate(30);
    initGrid();

    chooseEnds();
    //console.log(grid);
}

function draw() {
    // Update state of the grid and handle 'finish' conditions
    if (!finished) {
        searchAStar(goal);
    } else {
        if (pathExists) {
            colourPath(goal);
        } else {
            console.log('No path exists!');
        }

        noLoop();
    }

    // Render the grid
    displayGrid();
}

/* HELPER FUNCTIONS */
function displayGrid() {
    for (i = 0; i < GRIDSIZE; i++) {
        for (j = 0; j < GRIDSIZE; j++) {
            grid[i][j].increaseStage();
            grid[i][j].display();
        }
    }
}

// TODO: clean up code a bit
function initGrid() {
    for (i = 0; i < GRIDSIZE; i++) {
        const row = new Array();
        const posY = i * CELLSIZE;

        grid.push(row);

        for (j = 0; j < GRIDSIZE; j++) {
            const posX = j * CELLSIZE;
            row.push(new Cell(posX, posY, CELLSIZE, true));
        }
    }
}

function chooseEnds() {
    stack.push(grid[2][3]);

    grid[2][3].setStart();
    grid[GRIDSIZE - 3][GRIDSIZE - 3].setEnd();
    goal = grid[GRIDSIZE - 3][GRIDSIZE - 3];
    start = grid[2][3];

    costs[start] = 0;
    parents[start] = null;
    frontier.push(start, 0);
}


/* SEARCH FUNCTIONS */
function dfs() {
    if (stack.length == 0) {
        // the goal is unreachable (we've exhausted all of our options)
        finished = true;
        return null;
    }

    currCell = stack.pop();

    if (currCell.isEnd()) {
        finished = true;
        pathExists = true;
        return null;
    }

    currCell.setTraversable(false);
    //visited[currCell.toString()] = true;

    for (let i = 0; i < directions.length; i++) {
        const newX = directions[i][0] + Math.floor(currCell.offsetX / CELLSIZE);
        const newY = directions[i][1] + Math.floor(currCell.offsetY / CELLSIZE);

        if ( withinGridBounds(newX, newY) && (grid[newY][newX].isTraversable()) ) {
            stack.push(grid[newY][newX]);
            parents[grid[newY][newX]] = currCell;
        }
    }
}

function searchAStar(end) {
    if (frontier.length() == 0) {
        finished = true;
        return null;
    }

    const q = frontier.pop();

    // Win condition
    if (q == end) {
        finished = true;
        pathExists = true;
        return costs[q];
    }

    // Expand successors to current node
    for (let i = 0; i < directions.length; i++) {
        const newX = directions[i][0] + q.x;
        const newY = directions[i][1] + q.y;

        if (withinGridBounds(newX, newY)) {
            const successor = grid[newY][newX];
            const newCost = costs[q] + 1;
            // todo: underlying graph costs data structure

            if ( (!(successor in costs) || (newCost < costs[successor]) )
                    && (successor.isTraversable()) ) {

                const heuristic = manhattanDistance([newX, newY], [end.x, end.y]);
                const priority = newCost + heuristic;

                costs[successor] = newCost;
                frontier.push(successor, priority);
                parents[successor] = q;
            }

            q.setTraversable(false);
        }
    }
}

function colourPath(node) {
    let curr = node;

    while (curr != null) {
        if (!(curr in parents)) {
            throw Error("Not a valid path", "coordinates:", curr);
        }

        curr.setPath(true);
        curr = parents[curr];
    }
}

function increaseStages() {
    for (i = 0; i < GRIDSIZE; i++) {
        for (j = 0; j < GRIDSIZE; j++) {
            grid[i][j].increaseStage();
        }
    }
}

function withinGridBounds(x, y) {
    return ( (0 <= x)
        && (x < GRIDSIZE)
        && (0 <= y)
        && (y < GRIDSIZE)
    );
}

/* HEURISTIC FUNCTIONS (for A* search) */
function euclideanDistance(start, end) {
    x0 = start[0], x1 = end[0];
    y0 = start[1], y1 = end[1];

    return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
}

function manhattanDistance(start, end) {
    x0 = start[0], x1 = end[0];
    y0 = start[1], y1 = end[1];

    return Math.abs(x0 - x1) + Math.abs(y0 - y1);
}
