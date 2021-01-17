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
import background from '../assets/background.svg';
import useGlobalState from '../hooks/useGlobalState';

import ReactMapGL from 'react-map-gl';

import APIKEY from '../map_api_key';

const Background = styled.div`
  background-image: url(${background});
  background-repeat: repeat;
  height: 100vh;
  overflow: auto;
`;

const StyledMapBox = styled.div`
width: 100%;
height: 100%;
`;

const Home = () => {
  const [findings, setFindings] = useState<Api.Finding[]>([]);
  const location = useLocation();
  // findings is a list of all Api.findings
  const {filterOpts} = useGlobalState(); 

  useEffect(() => {
    Api.getAllFindings().then((res) => {
      setFindings(res.data);
      // filter findings to only those with veri tags
      //console.log("length: " + res.data.length);
    });
  }, []);

  useEffect(() => {
    if (findings.length > 0) {
      
      //setFindings(findings.filter(f => {f.tags && Object.entries(f.tags).find( ([k, v]) => {k === "veri"}) }));
    }
  }, [findings]);


  const HomeList = () => (
    <>
      {findings.map((finding: Api.Finding) => (
        <FindingCard finding={finding} />
      ))}
    </>
  );
  const HomeMap = () => {
    const [viewport, setViewport] = useState({
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8,
    });

    return (
      <StyledMapBox className="mapbox-react">
        <ReactMapGL
          {...viewport}
          width="100%"
          height="100%"
          // mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          mapboxApiAccessToken={APIKEY}
        />
      </StyledMapBox>
    );
  };

  return (
    <Background>
      <Header />
      {location.pathname.startsWith('/home') && <HomeList />}
      {location.pathname.startsWith('/map') && <HomeMap />}
    </Background>
  );
};

export default Home;
