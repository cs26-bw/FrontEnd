import React from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';

import Register from './components/Register'
import Login from './components/Login'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route path='/register' render={_ => <Register />} />
          <Route path='/login' render={_=> <Login />} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
