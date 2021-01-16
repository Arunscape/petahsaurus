import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound'
import SignIn from './pages/SignIn';

// import logo from './logo.svg';
// import './App.css';

interface AppProps {}

const App = ({}: AppProps) => {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/signin"/>
        </Route>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/signin" component={SignIn}/>
      <Route component={NotFound}/>
      </Switch>
    </Router>
  );
}

export default App;
