import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
} from 'react-router-dom';
import Header from '../components/HomeHeader';
import FindingCard from '../components/FindingCard';
import * as Api from '../api';
import styled from 'styled-components';
import background from '../assets/background.svg'
import useGlobalState from '../hooks/useGlobalState';

const Background = styled.div`
  background-image: url(${background});
  background-repeat: repeat;
  height: 100vh;
  overflow: auto;
`;

const Home = () => {
  const [findings, setFindings] = useState([]);
  const location = useLocation();

  useEffect(() => {
    Api.getAllFindings().then((res) => setFindings(res.data));
  }, []);

  const HomeList = () => (
    <>
      {findings.map((finding: Api.Finding) => (
        <FindingCard finding={finding} />
      ))}
    </>
  );
  const HomeMap = () => <></>
  const {filterOpts} = useGlobalState(); 
  

  return (
    <Background>
      <Header />
        {location.pathname.startsWith("/home") && <HomeList/>}
        {location.pathname.startsWith("/map") && <HomeMap/>}
    </Background>
  );
};

export default Home;
