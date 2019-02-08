//Author: Mahmoud Mokhtar
//Email: mahmok@gmail.com

const CANVAS = document.getElementById("canvas");
const CTX = CANVAS.getContext("2d");
const CANVAS_SIZE = 600;
const LAST_RECT_OFFSET = 3;
var CELL_WIDTH = 60;
var NUMBER_OF_CELLS = Math.floor(CANVAS_SIZE / CELL_WIDTH);
var FRAME_RATE = 0.01;
var GAME_LOOP = null;

var debug = true;
var cells = [];
var current = null;
var stack = [];



index = (x, y) => {
    if(x < 0 || y < 0 || x > NUMBER_OF_CELLS - 1 || y > NUMBER_OF_CELLS - 1)
    {
        return -1;
    }
    return y + x * NUMBER_OF_CELLS;
}


removeWallBetweenCells = (current, next) => {

    var x_diff = next.x_index - current.x_index;
    var y_diff = next.y_index - current.y_index;
    if(x_diff == 1)
    {
       current.rightWall = false;
       next.leftWall = false;
    }
    else if(x_diff == -1)
    {
        next.rightWall = false;
        current.leftWall = false;
    }

    
    if(y_diff == 1)
    {
       current.bottomWall = false;
       next.topWall = false;
    }
    else if(y_diff == -1)
    {
        next.bottomWall = false;
        current.topWall = false;
    }  

}

drawStack = () => {
    for(let i = 0; i < stack.length; i++)
    {
        drawRect(stack[i].x, stack[i].y, CELL_WIDTH, CELL_WIDTH, "#3363FF")
    }
}

drawLine = (x, y, x2, y2) => {
    CTX.beginPath();
    CTX.strokeStyle = "#000000";
    CTX.moveTo(x, y);
    CTX.lineTo(x2, y2);
    CTX.stroke();
}

drawRect = (x, y, w, h, fillStyle) => {
    if(debug)
    {
        CTX.fillStyle = fillStyle;
    }
    else
    {
        CTX.fillStyle = "#FFFFFF";
    }

    CTX.strokeStyle = "0px";
    CTX.fillRect(x, y, w, h);
};

render = () => {
    console.log("...RENDERING...")
    CTX.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    
    for(let i = 0; i < cells.length; i++)
    {
        cells[i].draw(drawLine, drawRect);
    }
    drawStack();

    drawRect(current.x, current.y, CELL_WIDTH, CELL_WIDTH, "#33F1FF");
    var neighbors = current.getNeighbors(index, cells);
    
    if(neighbors.length > 0)
    {
        var next = neighbors[Math.floor(Math.random()*neighbors.length)];
        removeWallBetweenCells(current, next);
        current = next;
        current.visited = true;
       
        stack.push(current);
    }
    else
    {
        current = stack.pop();
    }
    
    if(stack.length <= 0)
    {
        
        clearInterval(GAME_LOOP)
        CTX.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        for (let i = 0; i < NUMBER_OF_CELLS; i++) 
        {
            for (let j = 0; j < NUMBER_OF_CELLS; j++) 
            {
                if(cells[index(i, j)].x_index == 0)
                {
                    cells[index(i, j)].leftWall = true;
                    //cells[index(i, j)].draw(drawLine, drawRect);
                    drawRect(current.x + LAST_RECT_OFFSET, current.y + LAST_RECT_OFFSET, CELL_WIDTH - 6, CELL_WIDTH - 6, "#33F1FF")
                }
                if(cells[index(i, j)].x_index == NUMBER_OF_CELLS - 1)
                {
                    cells[index(i, j)].rightWall = true;
                    //cells[index(i, j)].draw(drawLine, drawRect);
                    drawRect(current.x + LAST_RECT_OFFSET, current.y + LAST_RECT_OFFSET, CELL_WIDTH - 6, CELL_WIDTH - 6, "#33F1FF")
                }
                if(cells[index(i, j)].y_index == 0)
                {
                    cells[index(i, j)].topWall = true;
                    //cells[index(i, j)].draw(drawLine, drawRect);
                    drawRect(current.x + LAST_RECT_OFFSET, current.y + LAST_RECT_OFFSET, CELL_WIDTH - 6, CELL_WIDTH - 6, "#33F1FF")
                }
                if(cells[index(i, j)].y_index == NUMBER_OF_CELLS - 1)
                {
                    cells[index(i, j)].bottomWall = true;
                    //cells[index(i, j)].draw(drawLine, drawRect);
                    drawRect(current.x + LAST_RECT_OFFSET, current.y + LAST_RECT_OFFSET, CELL_WIDTH - 6, CELL_WIDTH - 6, "#33F1FF")
                }
                cells[index(i, j)].draw(drawLine, drawRect);
            }
        }
        
        cells[0].leftWall = false;
        cells[0].draw(drawLine, drawRect);
        cells[cells.length - 1].rightWall = false;
        cells[cells.length - 1].draw(drawLine, drawRect);
    }



}


init = (debugMode, cellWidth, frameRate) => {
    debug = parseInt(debugMode);
    CELL_WIDTH = parseInt(cellWidth);
    FRAME_RATE = parseFloat(frameRate);
    cells = [];
    current = null;
    NUMBER_OF_CELLS = Math.floor(CANVAS_SIZE / CELL_WIDTH);
    stack = [];
    // Initializing
    for(let i = 0; i < NUMBER_OF_CELLS; i++)
    {
        for(let j = 0; j < NUMBER_OF_CELLS; j++)
        {
            let cell = new Cell(i, j, CELL_WIDTH);
            cells.push(cell);
        }
    }
    
    current = cells[Math.floor(Math.random()*cells.length)];
    current.visited = true;
    stack.push(current);

    if(GAME_LOOP)
    {
        clearInterval(GAME_LOOP);
        GAME_LOOP = null;
    }
    GAME_LOOP = setInterval(() => render(), FRAME_RATE);

} 


