import React, { useState, useReducer } from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.scss';
import 'semantic-ui-css/semantic.min.css'

import NavBar from './components/Nav'
import Footer from './components/Footer'
import Register from './components/Register'
import Login from './components/Login'
import Map from "./game/Map"
import RoomInfo from './game/RoomInfo'
import { UserContext } from './contexts/UserContext';
import { PlayersContext } from './contexts/PlayersContext'

// small change

function App() {

  const [user, setUser] = useState({
    name: '',
    title: '',
    description: '',
    room_id: '',
    error_msg: ''
  })

  const [players, setPlayers] = useState([])
  
  return (
    <div className="App">
       <UserContext.Provider value={{user, setUser}}>
       <PlayersContext.Provider value={{players, setPlayers}}>
       <NavBar/>
        <Switch>
          <Route path='/register' component={Register} />
          <Route path='/login' component = {Login} />
          <Route path='/play' exact component={Map} />
          <Route path='/room' component={RoomInfo} />
        </Switch>
      <Footer />
      </PlayersContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
