import React, {useEffect, useState, useContext} from 'react'
import {axiosWithAuth} from '../utils/AxiosWithAuth'
import {UserContext} from "../contexts/UserContext"
import { PlayersContext } from '../contexts/PlayersContext'
import Control from './Control'
import Players from './Players'

import '../styles/game.scss'


function RoomInfo() {

    const [loading, setLoading] = useState(false)
    const {user, setUser} = useContext(UserContext)
    const {players, setPlayers} = useContext(PlayersContext)
    console.log(players)
    

    useEffect(() => {
        setLoading(true)
        axiosWithAuth()
        .get('https://ferrari-mud.herokuapp.com/api/adv/init')
        .then(res => {
            setLoading(false)
            setUser({...user, name: res.data.name, title: res.data.title, description: res.data.description, room_id: res.data.room_id})
            setPlayers(res.data.players)
        })
        .catch(err => {
            setLoading(false)
        })
        
    },[])

    return (
        <div>
        <div className='roominfo-container'>
            <h3>User: <span>{user.name}</span></h3>
            <h3>Room: <span>{user.title}</span></h3>
            <h3>Description: <span>{user.description}</span></h3>
            <h3>Room Id: <span>{user.room_id}</span></h3>
        </div>
        <div>
            <Control />
            <Players />
        </div>
        </div>
    )
}

export default RoomInfo;