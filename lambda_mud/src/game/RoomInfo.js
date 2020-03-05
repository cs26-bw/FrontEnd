import React, {useEffect, useState, useContext} from 'react'
import {axiosWithAuth} from '../utils/AxiosWithAuth'
import {UserContext} from "../contexts/UserContext"
import { PlayersContext } from '../contexts/PlayersContext'
import Control from './Control'
import Players from './Players'


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
            <h1>User: {user.name}</h1>
            <h3>Room: {user.title}</h3>
            <h3>Description: {user.description}</h3>
            <h3>Room Id: {user.room_id}</h3>
            <Control />
            <Players />
        </div>
    )
}

export default RoomInfo;