import React, {useState, useEffect} from 'react' 
import backgroundMusic from '../assets/backgroundMusic.ogg'
import { Icon } from 'semantic-ui-react'

const buttonStyles = {
    marginLeft: "5vw", 
    color: "#ffffff",
    cursor: "pointer"
}

const BGMusic = (props) => {

    const [mutedBG, setMutedBG] = useState(false)

    let music = React.createRef();

    useEffect(() => {
        
        if (music && !mutedBG){
            
            music.current.volume = .1
            music.current.loop = true
            music.current.play();

        }else if(music && mutedBG){

            music.current.pause();

        }

    }, [mutedBG])

    return (
        
        <div className="background-music">

            <Icon
            name = {mutedBG ? "volume off" : "volume up"}
            size = "big"
            
            onClick = {() => setMutedBG(!mutedBG)}
            style = {buttonStyles}
            />

            <audio ref = {music} >
                <source src ={backgroundMusic}  type = "audio/ogg" />
            </audio>

        </div>
    )


}

export default BGMusic