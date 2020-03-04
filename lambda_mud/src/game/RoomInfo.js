import React, {useEffect, useState} from 'react'
import {axiosWithAuth} from '../utils/AxiosWithAuth'

function RoomInfo() {

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axiosWithAuth()
        .get('https://ferrari-mud.herokuapp.com/api/adv/init')
        .then(res => {
            setLoading(false)
            console.log(res)
        })
        .catch(err => {
            setLoading(false)
        })
        
    },[])

    return (
        <div>

        </div>
    )
}

export default RoomInfo;