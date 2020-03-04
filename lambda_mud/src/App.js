import React, { useReducer } from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.scss';
import 'semantic-ui-css/semantic.min.css'

import NavBar from './components/Nav'

import Register from './components/Register'
import Login from './components/Login'
import Map from "./game/Map"

// small change

function App() {

  
  return (
    <div className="App">
      <header className="App-header">
        <NavBar/>
      <Switch>
          <Route path='/register' component={Register} />
          <Route path='/login' component = {Login} />
          <Route path='/' exact component={Map} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
