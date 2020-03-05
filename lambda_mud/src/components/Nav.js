import React from 'react'
import { Link, useLocation } from "react-router-dom";


const NavBar = () => {

    const location = useLocation();

    const isPlaying = location.pathname.includes('play') && localStorage.getItem("key")

    return (
        <div className = 'nav'>    
            <h1>Py City<span>.</span></h1>
            <nav>
                {
                    isPlaying ?
                    <Link to = '/login' onClick = {() => {
                        localStorage.removeItem('key');
                    }}>Logout</Link>
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