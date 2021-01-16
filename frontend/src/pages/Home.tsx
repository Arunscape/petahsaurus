import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import api from '../api';
import FindingCard from '../components/FindingCard'

const Home = () => {

const [findings, setFindings] = useState([]);

useEffect(() => {
    const getFindings = async () => {

        const res = [
            {
                image: "https://via.placeholder.com/150",
                description: "this is a dinosaur"
            },
            {
                image: "https://via.placeholder.com/150",
                description: "this is another dinosaur"
            },
            {
                image: "https://via.placeholder.com/150",
                description: "this is another another dinosaur"
            }
        ]
        setFindings(res)
    }

    getFindings()

}, [])

return <div>
    <Header/>
    {findings.map(({image, description}) => <FindingCard image={image} description={description}/>)} 
</div>
}

export default Home;