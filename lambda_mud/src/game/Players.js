import React, {useContext} from 'react'
import { PlayersContext } from '../contexts/PlayersContext'


function Players() {

    const {players, setPlayers} = useContext(PlayersContext);
    

    return (
        <div className='players-container'>
            <h3>Players In Room:</h3>
            
                {
                    players.map((player) => {
                        return <div className='players'><h3><span>{player}</span></h3></div>  
                    })
                }
            
        </div>
    )
}

export default Players;