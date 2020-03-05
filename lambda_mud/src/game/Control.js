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
        <div>
            <h3>{user.error_msg}</h3>
        <button onClick={(_ => movement('n'))} >N</button>
        <button onClick={(_ => movement('s'))} >S</button>
        <button onClick={(_ => movement('e'))} >E</button>
        <button onClick={(_ => movement('w'))} >W</button>
        </div>
    )
}

export default Control;