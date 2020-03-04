import React, { useState, useEffect } from 'react';

import {axiosWithAuth} from '../utils/AxiosWithAuth'
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/core";
import Room from './Room'
const override = css`
  position: absolute;
  top:50%;
  left: 50%;
`;

function Map() {

    const [currentRoom, setCurrentRoom] = useState(null)
    const [requestErr, setRequestErr] = useState(null)
    const [loading, setLoading] = useState(false)
    const [rooms, setRooms] = useState(null)

    useEffect(() => {
        // this updates the starting room
        setLoading(true)
        axiosWithAuth()
        .get('https://ferrari-mud.herokuapp.com/api/adv/init')
        .then(res => {
            setCurrentRoom(res.data)
            setLoading(false)
        })
        .catch(err => {
            setLoading(false)
            setRequestErr(err)
        })
        
    },[])

    useEffect(() => {
        // gets all rooms
        setLoading(true)
        axiosWithAuth()
        .get('https://ferrari-mud.herokuapp.com/api/adv/rooms')
        .then(res => {
            setRooms(res.data)
            setLoading(false)
        })
        .catch( err => {
            setLoading(false)
            setRequestErr(err)
        })
    },[])

    console.log(rooms);
    
    const [canvas, setCanvas] = useState();

    let canvasRef = React.createRef();

    useEffect(() => {
        setCanvas(canvasRef.current);
        // console.log("Canvas:", canvas)
        resizeCanvas(); //do an initial resize for when it first renders, this function will also be called every time the window is resized too
    }, [canvasRef])

    useEffect(() => {
        window.addEventListener('resize', resizeCanvas)

        // ? cleanup function needed
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

    let formattedRooms = {};

    useEffect(() => {

        if(rooms){
            rooms.forEach(room => formattedRooms[`${room.id}`] = new Room(
                room.id, 
                room.title, 
                room.description, 
                room.north, 
                room.south, 
                room.east, 
                room.west, 
                room.x, 
                room.y
                ))

                frame(0)
        }


        
    },[rooms])

    if (canvas) {
        //frame(0); //start the frame loop
    }

    function frame(currentTime) {
        //draw map here
        let c = canvas.getContext("2d")

        setStyles(c)

        c.clearRect(0, 0, window.innerWidth, window.innerHeight);//clear previous frame
        
        if (!lastTime) lastTime = currentTime;
        let deltaTime = currentTime - lastTime;//time since last frame
        lastTime = currentTime;

        // textPos.x += textVel.x * deltaTime/4
        // textPos.y += textVel.y * deltaTime/4

        // if(textPos.x > window.innerWidth || textPos.x < 0){
        //     textVel.x *= -1
        // }

        // if(textPos.y > window.innerHeight || textPos.y < 0){
        //     textVel.y *= -1
        // }

        // //console.log("Drawing at", textPos.x, textPos.y)
        // c.fillText("Canvas Test", textPos.x, textPos.y);

        c.beginPath();
        c.arc(500, 500, 10, 0, 2 * Math.PI);
        c.fill();
        
        c.beginPath();
        c.fillRect(500, 498, 100, 5);

        c.beginPath();
        c.arc(600, 500, 10, 0, 2 * Math.PI);
        c.fill();
        
        
    
        const roomsLength = Object.keys(formattedRooms).length

        console.log("length", roomsLength)
        
        // for (let i = 1; i <= roomsLength; i++) {
        //     console.log('here');
        //     c.fillRect(200, 398, 300, 100);
        //     c.fillRect(500, 498, 100, 100);
        // }
        
        for (let room in formattedRooms) {
            console.log(formattedRooms[room])
            formattedRooms[room].draw(c)
            //c.fillRect(500, 498, 100, 100);
        }

        //requestAnimationFrame(frame);
    }



    return ( 
    <div className = "Map">
        {
            loading ?
            <HashLoader 
            css={override}
            size = {80}
            color = {"#313131"}
            />
            : <canvas ref={canvasRef}> </canvas>
        }
    </div>
    );
}

export default Map;