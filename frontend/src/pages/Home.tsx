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

const { SNOWPACK_PUBLIC_APIKEY } = import.meta.env;

import { fromJS } from 'immutable';

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
    Api.getAllFindingsWithTags().then((res) => {
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
          if (!only_mine) {
            return true;
          }
          const { sub } = Api.getUserIdInfo();
          return sub === finding.id;
        })
        .filter((finding) => {
          if (!by_user) {
            return true;
          }
          const { sub } = Api.getUserIdInfo();
          return by_user === sub;
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
          // ok now it returns tags thanks Peter <3
          return (
            date.unix_start <= finding.date && finding.date <= date.unix_end
          );
        })
        .filter((finding) => {
          if (!by_location) {
            return true;
          }
          const { lat, long } = finding.coords;

          return (
            Math.abs(lat - finding.coords.lat) +
              Math.abs(long - finding.coords.long) <
            1
          );
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
    type Coord = {
      latitude: number;
      longitude: number;
      zoom: number;
    };
    const [viewport, setViewport] = useState<Coord>({
      latitude: 51.4792,
      longitude: -112.7901,
      zoom: 8,
    });

    useEffect(() => {
      if (!('geolocation' in navigator)) {
        alert('geolocation not available');
        return;
      }
      navigator.geolocation.getCurrentPosition((pos) => {
        setViewport({
          ...viewport,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      });
    }, []);

    const mapStyle = fromJS({
      version: 8,
      sources: {
        points: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              // {
              //   type: 'Feature',
              //   geometry: { type: 'Point', coordinates: [-122.45, 37.78] },
              // },
              findings.map(f => ({
                type: 'Feature',
                geometry: {type: 'Point', coordinates: [f.coords.long, f.coords.lat]}
              }))
            ],
          },
        },
      },
      layers: [
        {
          id: 'my-layer',
          type: 'circle',
          source: 'points',
          paint: {
            'circle-color': '#f00',
            'circle-radius': 4,
          },
        },
      ],
    });

    return (
      <StyledMapBox className="mapbox-react">
        <ReactMapGL
          {...viewport}
          mapStype={mapStyle}
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
      <Header/>
      {location.pathname.startsWith('/home') && <HomeList />}
      {location.pathname.startsWith('/map') && <HomeMap />}
    </Background>
  );
};

export default Home;
