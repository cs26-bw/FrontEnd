import React from 'react'
import { Link, useLocation } from "react-router-dom";
import BGMusic from '../game/BackgroundMusic.js';


const NavBar = () => {

    const location = useLocation();

    const isPlaying = location.pathname.includes('play') && localStorage.getItem("key")

    return (
        <div className = 'nav'>    
            <Link to='/'><h1>Py City<span>.</span></h1></Link>
            <nav style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                {
                    isPlaying ?
                    <>
                        <Link to = '/login' onClick = {() => {
                            localStorage.removeItem('key');
                        }}>Logout</Link>
                        <BGMusic />
                    </>
                    :
                    <>
                        <Link to='/login'>Log in</Link>
                        <Link to='/register'>Register</Link> 
                    </>
                }
            </nav> 
        </div>
    )
}

export default NavBar;