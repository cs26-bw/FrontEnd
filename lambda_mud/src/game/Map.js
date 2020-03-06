
import React, { useState, useEffect } from 'react';


import { axiosWithAuth } from '../utils/AxiosWithAuth'
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/core";
import GameLoop from "./GameLoop"

import Room from './Room'

import movement from '../assets/movement.mp3'
import characterOne from '../assets/characterOne.svg'
import { move } from 'formik';
import BGMusic from './BackgroundMusic';


const override = css`
  position: absolute;
  top:50%;
  left: 50%;
`;

let formattedRooms = {}

let gameLoop;//need to declare outside of Map() cause otherwise we'll lose reference to it and it will keep looping forever, never being garbage collected
let characterImgRef = React.createRef();

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
                res.data.id = res.data.room_id
                delete res.data.room_id
                setCurrentRoom(res.data)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                setRequestErr(err)
            })

    }, [])

    useEffect(() => {
        // gets all rooms
        setLoading(true)
        axiosWithAuth()
            .get('https://ferrari-mud.herokuapp.com/api/adv/rooms')
            .then(res => {
                setRooms(res.data)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                setRequestErr(err)
            })
    }, [])

    useEffect(() => {
        // prevent the page from scolling while pressing the arrow keys
        window.addEventListener("keydown", function (e) {
            // space and arrow keys
            if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                e.preventDefault();
            }
        }, false);
    }, [])

    // ! canvas logic starts here
    const [canvas, setCanvas] = useState();

    let canvasRef = React.createRef();
    let canvasContainerRef = React.createRef();
    let audioRef = React.createRef();

    useEffect(() => {
        setCanvas(canvasRef.current);
        resizeCanvas(); //do an initial resize for when it first renders, this function will also be called every time the window is resized too
    }, [canvasRef])

    useEffect(() => {
        window.addEventListener('resize', resizeCanvas)

        // ? cleanup function needed
        return () => window.removeEventListener('resize', resizeCanvas)
    })

    function resizeCanvas() {
        if (canvas && canvasContainerRef.current) {
            

            canvas.width = canvasContainerRef.current.clientWidth
            canvas.height = canvasContainerRef.current.clientHeight
            //frame(0);
        }
    }

    useEffect(() => {

        formattedRooms = {}

        if (rooms) {
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
        }


    }, [rooms])

    let frameCounter = 0

    //once we have all the state needed, start/restart the game loop
    useEffect(() => {
        if (canvas && currentRoom && rooms) {
            if (!gameLoop) {
                gameLoop = new GameLoop(formattedRooms, currentRoom, canvas, characterImgRef);
                gameLoop.startLoop(); //start the frame loop
            }
            //  else {
            //     gameLoop.stopLoop();
            //     gameLoop = new GameLoop(formattedRooms, currentRoom, canvas, characterImgRef);
            //     gameLoop.startLoop();
            // }
        }
    }, [rooms, canvas, currentRoom])

    // useEffect(() => {
    //     if(gameLoop) gameLoop.movePlayer(currentRoom);
    // }, [currentRoom])


    // ! canvas logic ends here

    // !keyboard movement logic

    useEffect(() => {

        const handleMove = (e) => {

            if (!currentRoom) {
                return
            }

            const current = formattedRooms[currentRoom.id]


            if (e.key === "ArrowRight") {
                if (current.east.id) {
                    setCurrentRoom(formattedRooms[current.east.id])
                    if(gameLoop) gameLoop.movePlayer(formattedRooms[current.east.id])
                } else {
                    return
                }
            } else if (e.key === "ArrowLeft") {
                if (current.west.id) {
                    setCurrentRoom(formattedRooms[current.west.id])
                    if(gameLoop) gameLoop.movePlayer(formattedRooms[current.west.id])
                } else {
                    return
                }

            } else if (e.key === "ArrowUp") {

                if (current.south.id) {
                    setCurrentRoom(formattedRooms[current.south.id])
                    if(gameLoop) gameLoop.movePlayer(formattedRooms[current.south.id])
                } else {
                    return
                }

            } else if (e.key === "ArrowDown") {

                if (current.north.id) {
                    setCurrentRoom(formattedRooms[current.north.id])
                    if(gameLoop) gameLoop.movePlayer(formattedRooms[current.north.id])
                } else {
                    return
                }
            }

        }

        console.log("new current room! + ", currentRoom)

        window.addEventListener('keydown', handleMove)

        return () => {
            window.removeEventListener('keydown', handleMove)
        }

    }, [currentRoom])

    return ( 
    <div style = {{position: "relative"}}>
        <div ref={canvasContainerRef} className = "Map" >
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
        <BGMusic />
        <audio ref = {audioRef}>
            <source src = {movement} type = "audio/mp3"></source>
        </audio>
        <img ref={characterImgRef} alt="character" className = "character" src={characterOne} style = {{display: "None", height: "10px", width: "10px"}} />
    </div>
    );
}

export default Map;