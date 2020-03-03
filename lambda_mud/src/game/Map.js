import React, {
    useState,
    useEffect
} from 'react';

import {axiosWithAuth} from '../utils/AxiosWithAuth'

function Map() {

    const [rooms, setRooms] = useState(null)


    useEffect(() => {

        axiosWithAuth()
        .get('https://ferrari-mud.herokuapp.com/api/adv/init')
        .then(res => console.log(res))
        .catch(err => console.log(err))
        
    },[])

    const [canvas, setCanvas] = useState();

    let canvasRef = React.createRef();

    useEffect(() => {
        setCanvas(canvasRef.current);
        console.log("Canvas:", canvas)
        resizeCanvas(); //do an initial resize for when it first renders, this function will also be called every time the window is resized too
    }, [canvasRef])

    useEffect(() => {
        window.addEventListener('resize', resizeCanvas)
    })

    function resizeCanvas() {
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }

    function setStyles(c) {
        c.font = '35px ' + 'Open Sans';
        c.globalAlpha = 1;
        c.lineWidth = 2;
        c.textBaseline = 'middle';
        c.textAlign = 'center';
    }

    let lastTime

    let textPos = {x: 0, y: 0}
    let textVel = {x: 1, y: 1}

    if (canvas) {
        frame(0); //start the frame loop
    }

    function frame(currentTime) {
        //draw map here
        let c = canvas.getContext("2d")

        setStyles(c)

        c.clearRect(0, 0, window.innerWidth, window.innerHeight);//clear previous frame
        
        if (!lastTime) lastTime = currentTime;
        let deltaTime = currentTime - lastTime;//time since last frame
        lastTime = currentTime;

        textPos.x += textVel.x * deltaTime/4
        textPos.y += textVel.y * deltaTime/4

        if(textPos.x > window.innerWidth || textPos.x < 0){
            textVel.x *= -1
        }

        if(textPos.y > window.innerHeight || textPos.y < 0){
            textVel.y *= -1
        }

        //console.log("Drawing at", textPos.x, textPos.y)
        c.fillText("Canvas Test", textPos.x, textPos.y);

        c.fillRect(100, 100, 100, 100)

        requestAnimationFrame(frame);
    }

    return ( 
    <div className = "Map">
        <canvas ref={canvasRef}> </canvas>
    </div>
    );
}

export default Map;