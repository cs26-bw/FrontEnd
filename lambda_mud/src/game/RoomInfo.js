import React, {useEffect, useState, useContext} from 'react'
import {axiosWithAuth} from '../utils/AxiosWithAuth'
import {UserContext} from "../contexts/UserContext"

function RoomInfo() {

    const [loading, setLoading] = useState(false)
    const { user, setUser } = useContext(UserContext)
    console.log(user)

    // useEffect(() => {
    //     setLoading(true)
    //     axiosWithAuth()
    //     .get('https://ferrari-mud.herokuapp.com/api/adv/init')
    //     .then(res => {
    //         setLoading(false)
    //         console.log(res)
    //     })
    //     .catch(err => {
    //         setLoading(false)
    //     })
        
    // },[])

    return (
        <div>

        </div>
    )
}

export default RoomInfo;