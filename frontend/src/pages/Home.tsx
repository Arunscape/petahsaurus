import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Header from '../components/Header';


const Home = () => <div>

    <Header/>
    <p>This is the home page</p>
    <Link to="/404"/>
   
</div>

export default Home;