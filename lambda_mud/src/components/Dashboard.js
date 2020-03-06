import React from 'react'
import {Link} from "react-router-dom"

import John from '../assets/John.JPG'
import Brandon from '../assets/Brandon.JPG'
import Armando from '../assets/Armando.JPG'
import Daniel from '../assets/Daniel.JPG'
import Luis from '../assets/Luis.JPG'
import map from '../assets/screenshot.JPG'

import '../styles/dashboard.scss'

function Dashboard() {

    return (
        <div className='dashboard-container'>
            <h1>Welcome To <span>PyCity</span>.</h1>
            <img className='header-img' src={map} alt='Map Screenshot'/>
            <h3>PyCity is a MUD consisting of 500 rooms for you to explore with other members of PyCity. Register with the button below to start your adventure!</h3>
            <Link to='/register'><button>REGISTER HERE!</button></Link>
            <div className='about-container'>
                <h1>Meet The Team</h1>
                <div className='team'>
                    <div className='armando'>
                        <img src={Armando} alt='Armando'/>
                        <p>Armando Roman</p>
                        <a href='https://github.com/armandoroman1016'>GitHub</a>
                    </div>
                    <div className='brandon'>
                        <img src={Brandon} alt='Brandon'/>
                        <p>Brandon Dong</p>
                        <a href='https://github.com/gasingdong'>GitHub</a>
                    </div>
                    <div className='daniel'>
                        <img src={Daniel} alt='Daniel'/>
                        <p>Daniel Firpo</p>
                        <a href='https://github.com/Turtled'>GitHub</a>
                    </div>
                    <div className='john'>
                        <img src={John} alt='John'/>
                        <p>John Watt</p>
                        <a href='https://github.com/theJOHNwatt'>GitHub</a>
                    </div>
                    <div className='luis'>
                        <img src={Luis} alt='Luis'/>
                        <p>Luis Mendes</p>
                        <a href='https://github.com/cvlopes88'>GitHub</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;