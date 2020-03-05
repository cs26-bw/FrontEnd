import React, {useContext} from 'react'
import { PlayersContext } from '../contexts/PlayersContext'


function Players() {

    const {players, setPlayers} = useContext(PlayersContext);
    

    return (
        <div>
            {
                players.map((player) => {
                    return <h3>{player}</h3>
                })
            }
        </div>
    )
}

export default Players;