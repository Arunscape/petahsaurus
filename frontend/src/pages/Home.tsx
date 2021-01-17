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

const {SNOWPACK_PUBLIC_APIKEY} = import.meta.env;

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
  const { filterOpts } = useGlobalState();

  // PETER THE BACKEND IS SUPPOSED TO DO THE FILTERING
  // THIS IS NOT SCALABLE AT ALL
  // THIS IS NOT MAINTAINABLE AT ALL
  // YOU SHOULD FEEL BAD ABOUT THIS

  useEffect(() => {
    console.log('filteropts changed', filterOpts);
    Api.getAllFindings().then((res) => {
      console.log('unfiltered results', res.data);

      const {
        only_mine,
        by_user,
        verified,
        needs_id,
        date,
        by_location,
      } = filterOpts;
      const filteredResults = res.data
        .filter((finding) => {
          // todo get own user id
          if (!only_mine) {
            return true;
          }
          const my_user_id = '';
          return my_user_id === finding.id;
        })
        .filter((finding) => {
          if (!by_user) {
            return true;
          }
          return by_user === finding.tags.user; // PETER WHY IS THERE NO USER FIELD
        })
        .filter((finding) => {
          if (!verified) {
            return true;
          }
          return finding.tags.verified;
        })
        .filter((finding) => {
          if (!needs_id) {
            return true;
          }
          return finding.tags.needs_id;
        })
        .filter((finding) => {
          if (!date.checked) {
            return true;
          }
          // JESUS CHRIST WHY DOESN'T THE BACKEND RETURN TAGS UNLESS YOU ASK FOR EACH ID SPECIFCALLY I WASTED AN HOUR ON THIS PETER
          // WHYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
          // REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
          //  FILTERING IS BROKEN UNTIL THAT IS FIXED
          // (╯°Д°)╯︵/(.□ . \)
          alert(1);
          console.log(
            date.start_unix <= finding.tags.date &&
              finding.tags.date <= date.end_unix,
          );
          return (
            date.start_unix <= finding.tags.date &&
            finding.tags.date <= date.end_unix
          );
        })
        .filter((finding) => {
          if (!by_location) {
            return true;
          }
          // bruv we have tdo create a geofence :/
          return true;
        });
      console.log('filtered', filteredResults);
      setFindings(filteredResults);
    });
  }, [filterOpts]);

  const HomeList = () => (
    <>
      {findings.map((finding: Api.Finding) => (
        <FindingCard key={finding.id} finding={finding} />
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
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          mapboxApiAccessToken={SNOWPACK_PUBLIC_APIKEY}
        />
      </StyledMapBox>
    );
  };

  return (
    <Background>
      <Header isHome={location.pathname.startsWith('/home')}/>
      {location.pathname.startsWith('/home') && <HomeList />}
      {location.pathname.startsWith('/map') && <HomeMap />}
    </Background>
  );
};

export default Home;
