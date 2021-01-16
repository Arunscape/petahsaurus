import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import styled from 'styled-components'

const StyledDiv = styled.div`
color: red;
`;

import HamburgerMenu from './HamburgerMenu'
import Search from './Search';


const Header = () => {

    return <div>
        <HamburgerMenu/>
        <Link to="/map">
            Go to Map
        </Link>
        <Search/>
    </div>
}


export default Header;