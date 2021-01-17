import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import Header from '../components/HomeHeader';
import FindingCard from '../components/FindingCard';
import * as Api from '../api';
import styled from 'styled-components';
import background from '../assets/background.svg'

const Background = styled.div`
background-image: url(${background});
background-repeat: repeat;
height: 100vh;
`

const Home = () => {
  const [findings, setFindings] = useState([]);

  useEffect(() => {
    Api.getAllFindings()
      .then((res) => setFindings(res.data))
  }, []);

  return (
    <Background>
      <Header />
      {findings.map((finding: Api.Finding) => (
        <FindingCard finding={finding}/>
      ))}
    </Background>
  );
};

export default Home;
