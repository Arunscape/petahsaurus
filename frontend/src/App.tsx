import React, { useState, useEffect, useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
} from 'react-router-dom';
import Home from './pages/Home';
import NewFinding from './pages/NewFinding';
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import SearchPage from './pages/SearchPage';
import Profile from './pages/Profile';
import * as Api from './api';
import FindingsPage from './pages/FindingsPage';
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
        <Route
          exact
          path="/"
          component={() => {
            const history = useHistory();
            Api.upgrade()
              .then(() => history.push('/home'))
              .catch(() => history.push('/signin'));

            return <div>loading...</div>;
          }}
        />
        <Route exact path="/add" component={NewFinding} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/map" component={Home} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/search" component={SearchPage} />
        <Route exact path="/profile" component={Profile} />
        <Route path="/finding" component={FindingsPage} />{' '}
        {/*route is not exact*/}
        <Route path="/edit" component={NewFinding} /> {/*route is not exact*/}
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
