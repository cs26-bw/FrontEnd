class GameLoop {

    lastTime;
    shouldLoop = false;

    //player movement animation
    playerMoving = false;
    from;
    to = undefined;
    moveSpeed = 1;
    progress = 0;
    interpolatedPosition;

    constructor(formattedRooms, currentRoom, canvas, characterImgRef) {
        console.log("Game loop constructor")
        this.c = canvas.getContext("2d");
        this.canvas = canvas
        this.formattedRooms = formattedRooms;
        this.currentRoom = currentRoom;
        this.characterImgRef = characterImgRef
    }

    startLoop() {
        this.shouldLoop = true;
        console.log("Starting", this.formattedRooms)
        this.frame();
    }

    stopLoop() {
        this.shouldLoop = false
    }

    setStyles(c) {
        c.font = '35px ' + 'Open Sans';
        c.globalAlpha = 1;
        c.lineWidth = 2;
        c.textBaseline = 'middle';
        c.textAlign = 'center';
    }

    movePlayer(newCurrentRoom) {

        //if we're already animating a move, just set from to where we currently are through the move animation, and reset progress so we start from there
        if(this.playerMoving) {
            this.from = { x: this.interpolatedPosition.x, y: this.interpolatedPosition.y };
            this.progress = 0;
        }
        else{
            this.from = {x: this.formattedRooms[this.currentRoom.id].x, y: this.formattedRooms[this.currentRoom.id].y}
        }
        this.to = {x: this.formattedRooms[newCurrentRoom.id].x, y: this.formattedRooms[newCurrentRoom.id].y}

        //start at from
        this.interpolatedPosition = {x: this.from.x, y: this.from.y}

        //update 
        this.currentRoom = newCurrentRoom;
        this.playerMoving = true;
    }

    lerp(num1, num2, amount) {
        return num1 + amount * (num2 - num1);
    }

    //draw map here
    frame(currentTime) {

        this.setStyles(this.c)

        this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);//clear previous frame
        
        if (!this.lastTime) this.lastTime = currentTime;
        let deltaTime = currentTime - this.lastTime;//time since last frame
        this.lastTime = currentTime;

        if(this.playerMoving) {

            this.progress += this.moveSpeed * deltaTime/250; //will move about .25 seconds to move from one position to another
            this.interpolatedPosition = { x: this.lerp(this.from.x, this.to.x, this.progress), y: this.lerp(this.from.y, this.to.y, this.progress) }

            if(this.progress >= 1) {

                //we've completed our animation
                this.playerMoving = false;
                this.interpolatedPosition = undefined;
                this.from = undefined;
                this.to = undefined;
                this.progress = 0;
            }
        }

        for (let room in this.formattedRooms) {
            this.formattedRooms[room].draw(this.c, this.formattedRooms[this.currentRoom.id], this.playerMoving ? this.interpolatedPosition : { x: this.formattedRooms[this.currentRoom.id].x, y: this.formattedRooms[this.currentRoom.id].y }, this.characterImgRef, deltaTime)
        }
        if(this.shouldLoop) {
            requestAnimationFrame(this.frame.bind(this));
        }
    }

}

export default GameLoop;