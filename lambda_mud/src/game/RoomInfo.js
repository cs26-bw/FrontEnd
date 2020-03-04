import React, {useEffect, useState, useContext} from 'react'
import {axiosWithAuth} from '../utils/AxiosWithAuth'
import {UserContext} from "../contexts/UserContext"

function RoomInfo() {

    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState(
        {
            name: '',
            title: '',
            description: ''
        }
    )
    const [players, setPlayers] = useState()
    console.log(`user:`, userInfo,' players:', players )
    

    useEffect(() => {
        setLoading(true)
        axiosWithAuth()
        .get('https://ferrari-mud.herokuapp.com/api/adv/init')
        .then(res => {
            setLoading(false)
            setUserInfo({...userInfo, name: res.data.name, title: res.data.title, description: res.data.description})
            setPlayers(res.data.players)
        })
        .catch(err => {
            setLoading(false)
        })
        
    },[])

    return (
        <div>
            <h1>User: {userInfo.name}</h1>
            <h3>Room: {userInfo.title}</h3>
            <h3>Description: {userInfo.description}</h3>
        </div>
    )
}

export default RoomInfo;