import React, {useEffect, useState, useContext} from 'react'
import {axiosWithAuth} from '../utils/AxiosWithAuth'
import {UserContext} from "../contexts/UserContext"
import { PlayersContext } from '../contexts/PlayersContext'
import axios from 'axios'

function Control() {

    const {user, setUser} = useContext(UserContext)
    const {players, setPlayers} = useContext(PlayersContext)
    // const [direction, setDirection] = useState({direction: ''})

    

    const handlePost = (compass) => {
        
        axiosWithAuth()
        .post('https://ferrari-mud.herokuapp.com/api/adv/move', {direction: compass})
        .then(res => {
            setUser({...user, name: res.data.name, title: res.data.title, description: res.data.description, room_id: res.data.room_id, error_msg: res.data.error_msg})
            console.log(user, 'user in control')
            setPlayers(res.data.players)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const movement = async (move) => {
         
        let post = await handlePost(move)
        return post;
    }

    return (
        <div className='btn-container'>
            <p>PYCITY CONTROLLER</p>
            
        <button onClick={(_ => movement("n"))}>N</button>
        <div className="btn-middle">
        <button onClick={(_ => movement("w"))}>W</button>
        <button onClick={(_ => movement("e"))}>E</button>
        </div>
        <button onClick={(_ => movement("s"))}>S</button>
        </div>
    )
}

export default Control;