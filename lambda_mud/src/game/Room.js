// 

class Room{
    constructor(id, title, description, north, south, east, west, x, y){
        this.id = id;
        this.title = title;
        this.description = description;
        this.north = north;
        this.east = east; 
        this.south = south;
        this.west = west;
        this.x = x * 100;
        this.y = y * 100;
    }
    // draw method

}

Room.prototype.draw = function(c) {

    c.beginPath();
    c.arc(this.x, this.y, 10, 0, 2 * Math.PI);
    c.fill();
    
    if(this.north) {
        c.beginPath();
        c.fillRect(this.x, this.y, 5, -100);
    }
    if(this.east) {
        c.beginPath();
        c.fillRect(this.x, this.y, 100, 5);
    }

    if(this.south) {
        c.beginPath();
        c.fillRect(this.x, this.y, 5, 100);
    }

    if(this.west) {
        c.beginPath();
        c.fillRect(this.x, this.y, -100, 5);
    }

    return c

}

export default Room