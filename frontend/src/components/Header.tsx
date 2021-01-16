import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import styled from 'styled-components'

const Menu = styled.div`
background-color: red;
position: relative;
`;

import HamburgerMenu from './HamburgerMenu'
import Search from './Search';


const Header = () => {

    return <Menu>
            <div>
            <HamburgerMenu/>
            </div>
                <div>
                 <Link to="/map">
                    Go to Map
                 </Link>
                 </div>
                 <div>
                 <Search/>
                 </div>
    </Menu>
}


export default Header;