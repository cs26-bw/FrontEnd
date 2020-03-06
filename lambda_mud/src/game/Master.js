import React from 'react'
import Players from './Players.js'
import Control from './Control.js'
import RoomInfo from './RoomInfo.js'
import Map from './Map'

const Master = () => {

    return(
        <div className='master-container'>
            <Players/>
            <Map />          
            <RoomInfo />
            <Control />
        </div>
    )
}

export default Master