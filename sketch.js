const CELLSIZE = 32;
const GRIDSIZE = 20;

const grid = new Array();

// Pathfinding Variables
frontier = new PriorityQueue();
costs = {};
parents = {};

const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
const stack = [];
let winner = false;
let currCell = null;

let start = end = null;

/* CORE DRAWING FUNCTIONS (p5.js) */
function setup() {
    createCanvas(2000, 2000);
    initGrid();
    frameRate(5);

    chooseEnds();
    console.log(grid);
}

function draw() {
    if (!winner) {
        searchAStar(goal);
    } else {
        console.log('yay!');
        noLoop();
        colorPath(goal);
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

// TODO: clean up code a bit
function initGrid() {
    for (i = 0; i < GRIDSIZE; i++) {
        row = new Array();
        grid.push(row);

        posY = i * CELLSIZE;

        for (j = 0; j < GRIDSIZE; j++) {
            posX = j * CELLSIZE;
            row.push(new Cell(posX, posY, CELLSIZE, true));
        }
    }
}

function chooseEnds() {
    stack.push(grid[2][3]);

    grid[1][2].setTraversed(false);
    grid[2][3].setStart();
    grid[10][10].setEnd();
    goal = grid[10][10];
    start = grid[2][3];

    costs[start] = 0;
    parents[start] = null;
    frontier.push(start, 0);
}

function dfs() {
    if (stack.length == 0) {
        // the node is unreachable (we've exhausted all of our options)
        winner = true;
        return null;
    }

    currCell = stack.pop();

    if (currCell.isEnd) {
        winner = true;
        return null;
    }

    currCell.setTraversed(false);
    //visited[currCell.toString()] = true;

    for (let i = 0; i < directions.length; i++) {
        newX = directions[i][0] + Math.floor(currCell.offsetX / CELLSIZE);
        newY = directions[i][1] + Math.floor(currCell.offsetY / CELLSIZE);

        if ( (0 <= newX) && (newX < GRIDSIZE) && (0 <= newY) && (newY < GRIDSIZE)
                && (grid[newY][newX].isTraversable())) {
            stack.push(grid[newY][newX]);
        }
    }
}

function searchAStar(end) {
    while (frontier.length() > 0) {
        const q = frontier.pop();

        if (q.toString() == end.toString()) {
            winner = true;
            return costs[q.toString()];
        }

        for (let i = 0; i < directions.length; i++) {
            const newX = directions[i][0] + q.x;
            const newY = directions[i][1] + q.y;

            if ( (0 <= newX) && (newX < GRIDSIZE) && (0 <= newY) && (newY < GRIDSIZE) ) {
                const successor = grid[newY][newX];

                // todo: if successor in closed then skip

                newCost = costs[q.toString()] + 1; // todo: underlying graph costs data structure

                if ( (!(successor.toString() in costs) || (newCost < costs[successor.toString()]))
                        && (!successor.isWall) ) {
                    costs[successor.toString()] = newCost;
                    priority = newCost + manhattanDistance([newX, newY], [end.x, end.y]);
                    frontier.push(successor, priority);
                    parents[successor.toString()] = q;
                } 
            }
        }
    }
}

function colorPath(node) {
    console.log(node);
    if ( (node == null) || (!(node.toString() in parents)) ) {
        return null;
    }

    node.setTraversed(false);
    colorPath(parents[node.toString()]);
}
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