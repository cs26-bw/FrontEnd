import React from 'react'


const Footer = () => {

    return (
        <footer>
            <div className='footer-container'>
            <p className = 'footer-text'>&copy; {new Date().getFullYear()} <span>Py City</span></p>
            </div>
        </footer>
    )
}

export default Footer