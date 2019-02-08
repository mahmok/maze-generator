//Author: Mahmoud Mokhtar
//Email: mahmok@gmail.com
class Cell 
{
    constructor(x, y, cellWidth)
    {
        this.cellWidth = cellWidth
        this.x = x * this.cellWidth;
        this.y = y * this.cellWidth;
        this.x_index = x;
        this.y_index = y;
        this.topWall = true;
        this.bottomWall = true;
        this.leftWall = true;
        this.rightWall = true;
        this.visited = false;

    }

    draw(drawLine, drawRect) 
    {
        //


        if(this.visited)
        {
            drawRect(this.x, this.y, this.cellWidth, this.cellWidth, "#33FF7C");
        }
        if(this.topWall) drawLine(this.x, this.y, this.x + this.cellWidth, this.y);
        if(this.bottomWall) drawLine(this.x, this.y + this.cellWidth, this.x + this.cellWidth, this.y + this.cellWidth);
        if(this.rightWall) drawLine(this.x + this.cellWidth, this.y, this.x + this.cellWidth, this.y + this.cellWidth);
        if(this.leftWall) drawLine(this.x, this.y, this.x, this. y + this.cellWidth);
    }


    getNeighbors(index, cells)
    {
        var neighbors = [];
        var top = cells[index(this.x_index, this.y_index - 1)];
        var bottom = cells[index(this.x_index, this.y_index + 1)];
        var left = cells[index(this.x_index - 1, this.y_index)];
        var right = cells[index(this.x_index + 1, this.y_index)];

        if(top && !top.visited)
        {
            neighbors.push(top);
        }
        if(bottom && !bottom.visited)
        {
            neighbors.push(bottom);
        }
        if(right && !right.visited)
        {
            neighbors.push(right);
        }
        if(left && !left.visited)
        {
            neighbors.push(left);
        }
        return neighbors;
    }

}

