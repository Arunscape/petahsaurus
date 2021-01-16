import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory } from 'react-router-dom';
import Home from './pages/Home';
import NewFinding from './pages/NewFinding';
import NotFound from './pages/NotFound'
import SignIn from './pages/SignIn';
import * as Api from './api'

// import logo from './logo.svg';
// import './App.css';

interface AppProps {}

const App = ({}: AppProps) => {

  //Api.createFinding({content: "eat shit", coords: {lat: 5.5, long: 5.5}})
  //    .then((resp) => Api.getFinding(resp.data.id))
  //    .then((data) => console.log(data.data));

  //Api.getAllFindings()
  //    .then((data) => console.log(data.data));

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/signin"/>
        </Route>
      <Route exact path="/add" component={NewFinding}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/signin" component={SignIn}/>
      <Route component={NotFound}/>
      </Switch>
    </Router>
  );
}

export default App;
