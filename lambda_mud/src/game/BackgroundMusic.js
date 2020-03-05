import React, {useState, useEffect} from 'react' 

const BGMusic = (props) => {

    const [mutedBG, setMutedBG] = useState(false)

    let music = React.createRef();

    useEffect(() => {
        
        console.log(music)
    }, [music])

    return (
        
        <div>
        
            <audio ref = {(el) => music = el}>
                <source src = '../assets/backgroundMusic.ogg'>
                </source>
            </audio>
        </div>
    )


}

export default BGMusic