class Room {

    //start animation
    startAnimationPlaying = true;//play at start
    animationYPosition = Math.random() * -1000//starts somewhere a random distance above the screen
    //speed that the room is falling/ascending at (y velocity)
    animationYVelocity = 1
    bounceCounter = 0;
    bounceLimit = 2; //will bounce 1-3 times

    //growing connections animation
    connectionAnimationPlaying = false;
    connectionLength = 0;
    timeSinceStart = 0;
    connectionAnimationStartTime = 3000;//3 seconds after start


    constructor(id, title, description, north, south, east, west, x, y) {
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
    draw(c, currentRoom, playerPos, character, deltaTime, size = null) {

        if (!isNaN(deltaTime)) this.timeSinceStart += deltaTime;

        //adjust this room's position so that the player's room is always drawn in the center of the screen
        let adjustedPosition = { x: ((this.x - playerPos.x) * 100) + (window.innerWidth / 2), y: ((this.y - playerPos.y) * 100) + (window.innerHeight / 2) }

        if (this.startAnimationPlaying) {

            //console.log(( 9.81 * Math.pow(deltaTime, 2) ) / 10000)
            //this.animationYVelocity = this.animationYVelocity - 1;
            if (!isNaN(deltaTime)) {
                this.animationYVelocity = this.animationYVelocity + ((9.81 * Math.pow(deltaTime, 2)) / 10000); //add gravity to velocity
                //console.log(this.animationYVelocity)
                this.animationYPosition += this.animationYVelocity * deltaTime / 6;
            }
            //console.log(this.animationYPosition)

            if (this.animationYPosition >= adjustedPosition.y) {
                if (this.bounceCounter <= this.bounceLimit) {
                    this.animationYPosition -= 15;//make sure the bounce starts slightly above adjustedPosition.y or a new bounce will be counted immediatly
                    this.animationYVelocity *= -1;
                    this.animationYVelocity /= 2.2;
                }
                else {
                    this.startAnimationPlaying = false;//we've bounced our last bounce
                }
                this.bounceCounter++;
            }

            adjustedPosition.y = this.animationYPosition;

        }

        if(this.timeSinceStart >= this.connectionAnimationStartTime) {
            this.connectionAnimationPlaying = true;

            if (this.connectionLength >= 50) {
                this.connectionAnimationPlaying = false;
            }
        }

        if (this.connectionAnimationPlaying) {
            if (!isNaN(deltaTime)) {
                this.connectionLength += deltaTime / 10;
            }
        }

        let isCurrentRoom = this.id === currentRoom.id ? true : false

        c.fillStyle = "#ca3e47";
        //c.fillStyle = "#" + Math.floor(Math.random()*16777215).toString(16);

        if (this.north.title) {
            c.beginPath();
            c.fillRect(adjustedPosition.x - 2.5, adjustedPosition.y, 5, this.connectionLength);
        }
        if (this.east.title) {
            c.beginPath();
            c.fillRect(adjustedPosition.x, adjustedPosition.y - 2.5, this.connectionLength, 5);
        }

        if (this.south.title) {
            c.beginPath();
            c.fillRect(adjustedPosition.x - 2.5, adjustedPosition.y, 5, -this.connectionLength);
        }

        if (this.west.title) {
            c.beginPath();
            c.fillRect(adjustedPosition.x, adjustedPosition.y - 2.5, -this.connectionLength, 5);
        }

        if (isCurrentRoom) {
            if (character.current != null) {
                c.fillStyle = "lightblue";
                c.beginPath();
                c.arc(adjustedPosition.x, adjustedPosition.y, 10, 0, 2 * Math.PI);
                c.fill();
                c.drawImage(character.current, adjustedPosition.x - 20, adjustedPosition.y - 25, 40, 50)
            }

        } else {
            c.beginPath();
            c.arc(adjustedPosition.x, adjustedPosition.y, 10, 0, 2 * Math.PI);
            c.fill();
        }

    }


























































}

export default Room