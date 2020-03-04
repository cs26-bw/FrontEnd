import React, { useState, useReducer } from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.scss';
import 'semantic-ui-css/semantic.min.css'

import NavBar from './components/Nav'

import Register from './components/Register'
import Login from './components/Login'
import Map from "./game/Map"
import RoomInfo from './game/RoomInfo'
import { UserContext } from './contexts/UserContext';

// small change

function App() {

  const [user, setUser] = useState({
    name: '',
    title: '',
    description: ''
  })
  
  return (
    <div className="App">
       <UserContext.Provider value={{user, setUser}}>
      <header className="App-header">
        <NavBar/>
        <Switch>
          <Route path='/register' component={Register} />
          <Route path='/login' component = {Login} />
          <Route path='/' exact component={Map} />
          <Route path='/room' component={RoomInfo} />
        </Switch>
      </header>
      </UserContext.Provider>
    </div>
  );
}

export default App;
