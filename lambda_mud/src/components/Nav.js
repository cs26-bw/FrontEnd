import React from 'react'
import { Link } from "react-router-dom";

import './nav.scss'

const NavBar = () => {

    return (
        <div>
            <nav>
            <Link to='/'>Home</Link>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>  
            </nav>  
        </div>
    )
}

export default NavBar;