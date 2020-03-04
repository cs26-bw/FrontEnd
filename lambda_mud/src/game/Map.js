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

let formattedRooms = {}

function Map() {

    console.log("Rerendering Map", formattedRooms)
    
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
            res.data.id = res.data.room_id
            delete res.data.room_id
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

    // ! canvas logic starts here
    const [canvas, setCanvas] = useState();

    let canvasRef = React.createRef();
    let canvasContainerRef = React.createRef();

    useEffect(() => {
        setCanvas(canvasRef.current);
        resizeCanvas(); //do an initial resize for when it first renders, this function will also be called every time the window is resized too
    }, [canvasRef])

    useEffect(() => {
        window.addEventListener('resize', resizeCanvas)

        // ? cleanup function needed
    })

    function resizeCanvas() {
        if (canvas) {
            // console.log("setting canvas size to", canvasContainerRef.clientWidth, canvasContainerRef.clientHeight)
            // console.log(canvasContainerRef)
            canvas.width = canvasContainerRef.current.clientWidth
            canvas.height = canvasContainerRef.current.clientHeight
            frame(0);
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

    useEffect(() => {

        formattedRooms = {}

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

        
    }, [rooms])

    if (canvas) {
        //frame(0); //start the frame loop
    }

    //draw map here
    function frame(currentTime) {

        let c = canvas.getContext("2d")

        setStyles(c)

        c.clearRect(0, 0, canvas.width, canvas.height);//clear previous frame
        
        if (!lastTime) lastTime = currentTime;
        let deltaTime = currentTime - lastTime;//time since last frame
        lastTime = currentTime;
        
        c.fillStyle = "black";
    
        const roomsLength = Object.keys(formattedRooms).length
        
        for (let room in formattedRooms) {
            formattedRooms[room].draw(c, formattedRooms[currentRoom.id])
        }

        //requestAnimationFrame(frame);
    }

    // ! canvas logic ends here

    // !keyboard movement logic

    useEffect(() => {
        
        const handleMove = (e) => {
            
            // avoiding errors on initial render when current room is null
            if (!currentRoom){
                return
            } 
            
            const current = formattedRooms[currentRoom.id]

            // console.log(current)
            
            if (e.key === "ArrowRight") {
                if(current.east.id){
                    setCurrentRoom(formattedRooms[current.east.id])
                }else{
                    setCurrentRoom(formattedRooms[current.id])
                }
            }else if (e.key === "ArrowLeft") {
                if(current.west.id){
                    setCurrentRoom(formattedRooms[current.west.id])
                }else{
                    setCurrentRoom(formattedRooms[current.id])
                }

            }else if (e.key === "ArrowUp") {

                if(current.south.id){
                    setCurrentRoom(formattedRooms[current.south.id])
                }else{
                    setCurrentRoom(formattedRooms[current.id])
                }

            }else if (e.key === "ArrowDown") {

                if(current.north.id){
                    setCurrentRoom(formattedRooms[current.north.id])
                }else{
                    setCurrentRoom(formattedRooms[current.id])
                }
            }
            
        }
        
        window.addEventListener('keydown', e => handleMove(e))
        
        return window.removeEventListener('keydown', handleMove)

    }, [currentRoom])


    return ( 
    <div ref={canvasContainerRef} className = "Map">
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