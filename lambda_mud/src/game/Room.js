class Room{

    constructor(id, title, description, north, south, east, west, x, y){
        this.id = id;
        this.title = title;
        this.description = description;
        this.north = north;
        this.east = east; 
        this.south = south;
        this.west = west;
        this.x = x;
        this.y = y;
    }

    // draw method
    draw (c, currentRoom, character, size = null,) {


        //adjust this room's position so that the player's room is always drawn in the center of the screen
        let adjustedPosition = { x: ((this.x - currentRoom.x) * 100 ) + (window.innerWidth / 2), y: ((this.y - currentRoom.y) * 100) + (window.innerHeight/2) }

        let isCurrentRoom = this.id === currentRoom.id ? true : false

        c.fillStyle = "black";
        
        if(this.north.title) {
            c.beginPath();
            c.fillRect(adjustedPosition.x, adjustedPosition.y, 5, 50);
        }
        if(this.east.title) {
            c.beginPath();
            c.fillRect(adjustedPosition.x, adjustedPosition.y, 50, 5);
        }
    
        if(this.south.title) {
            c.beginPath();
            c.fillRect(adjustedPosition.x, adjustedPosition.y, 5, -50);
        }
    
        if(this.west.title) {
            c.beginPath();
            c.fillRect(adjustedPosition.x, adjustedPosition.y, -50, 5);
        }
        
        
        if(isCurrentRoom) {
                        
            
            c.drawImage(character.current, adjustedPosition.x - 20, adjustedPosition.y - 25, 40, 50)
            
            return


        }else {
            c.fillStyle = "black";
        }

        c.beginPath();
        c.arc(adjustedPosition.x, adjustedPosition.y, 10, 0, 2 * Math.PI);
        c.fill();

    }

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

}

export default Room