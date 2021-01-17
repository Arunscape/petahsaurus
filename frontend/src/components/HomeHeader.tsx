import React, { useState, useRef } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
} from 'react-router-dom';
import styled from 'styled-components';
import map from '../assets/mapicon.svg';
import logo from '../assets/logofull.svg';
import appicon from '../assets/appicon.svg';

import useClickOutside from '../hooks/useClickOutside';

const StyledHeader = styled.div`
  color: #fff;
  height: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 1em;
  background-color: #393e41;
  color: #fff;
`;
const Navi1 = styled.div`
  /*background-color: green;*/
`;
const Navi2 = styled.div`
  /*background-color: blue;*/
`;
const Navi3 = styled.div`
  /*background-color: red;*/
`;
const Navi4 = styled.div``;
const Logo = styled.img`
  width: 30vw;
`;

const Map = styled.img`
  width: 10vw;
  max-width: 4rem;
`;

import HamburgerButton from './HamburgerButton';
import Search from './Search';
import Menu from './Menu';

const HomeHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const node = useRef();
  useClickOutside(node, () => setMenuOpen(false));
  const location = useLocation();

  return (
    <StyledHeader ref={node}>
      <Navi1>
        <HamburgerButton open={menuOpen} setOpen={setMenuOpen} />
        <Menu open={menuOpen} />
      </Navi1>
      <Navi2>
        {location.pathname.startsWith('/home') ? (
          <Link to="/map">
            <Map src={map} />
          </Link>
        ) : (
          <Link to="/home">
            <Map src={appicon} />
          </Link>
        )}
      </Navi2>
      <Navi3>
        <Search />
      </Navi3>
      <Navi4>
        <Logo src={logo} />
      </Navi4>
    </StyledHeader>
  );
};

export default HomeHeader;
