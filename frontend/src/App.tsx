import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound'

import useGlobalState from './useGlobalState';

// import logo from './logo.svg';
// import './App.css';

interface AppProps {}

const App = ({}: AppProps) => {
  // Create the count state.
  const [count, setCount] = useState(0);
  // const { user } = useGlobalState();
  // Create the counter (+1 every second).
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count, setCount]);
  // Return the App component.
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home"/>
        </Route>
      <Route exact path="/home" component={Home}/>
      <Route component={NotFound}/>
      </Switch>
    </Router>
  );
}

export default App;
