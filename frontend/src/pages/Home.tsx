import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

const Home = () => <div className="home">
    <p>This is the home page</p>
    <Link to="/404"/>
</div>

export default Home;