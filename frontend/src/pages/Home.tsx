import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import FindingCard from '../components/FindingCard'

const Home = () => {

const [findings, setFindings] = useState([]);

useEffect(() => {
    const getFindings = async () => {

        const res = [
            {
                id: 1,
                image: "https://via.placeholder.com/150",
                description: "this is a dinosaur"
            },
            {
                id: 2,
                image: "https://via.placeholder.com/150",
                description: "this is another dinosaur"
            },
            {
                id: 3,
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
    {findings.map(({image, description, id}) => <FindingCard key={id} image={image} description={description}/>)} 
</div>
}

export default Home;