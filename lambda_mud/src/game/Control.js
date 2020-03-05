import React, {useEffect, useState, useContext} from 'react'
import {axiosWithAuth} from '../utils/AxiosWithAuth'
import {UserContext} from "../contexts/UserContext"
import { PlayersContext } from '../contexts/PlayersContext'
import axios from 'axios'

function Control() {

    const {user, setUser} = useContext(UserContext)
    const {players, setPlayers} = useContext(PlayersContext)
    const [direction, setDirection] = useState({direction: ''})

    const movement = (move) => {
        
        axiosWithAuth()
        .post('https://ferrari-mud.herokuapp.com/api/adv/move', direction)
        .then(res => {
            setUser({...user, name: res.data.name, title: res.data.title, description: res.data.description, room_id: res.data.room_id})
            console.log(user, 'user')
            setPlayers(res.data.players)
        })
        .catch(err => {
            console.log(err)
        })
        setDirection({direction : move}) 
    }
    


    return (
        <div className='btn-container'>
            <p>PYCITY CONTROLLER</p>
            {/* <h3>{user.error_msg}</h3> */}
            {/* error message removed due to bug */}
        <button onClick={(_ => movement('n'))}>N</button>
        <div className='btn-middle'>
        <button onClick={(_ => movement('w'))}>W</button>
        <button onClick={(_ => movement('e'))}>E</button>
        </div>
        <button onClick={(_ => movement('s'))}>S</button>
        </div>
    )
}

export default Control;