import React, { useState, useRef } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import styled from 'styled-components'

import useClickOutside from '../hooks/useClickOutside'

const StyledHeader = styled.div`
box-sizing: border-box;
width: 100%;
position: relative;
display: block;
justify-content: center;
align-items: baseline;
padding: 1em;
margin-bottom: 2em;
background-color: rgb(192, 45, 26);
color: #fff;
`;

import HamburgerButton from './HamburgerButton'
import Search from './Search';
import Menu from './Menu'


const Header = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const node = useRef(); 
    useClickOutside(node, () => setMenuOpen(false));

    return <StyledHeader ref={node}>
        <HamburgerButton onClick={() => {
            setMenuOpen(!menuOpen)
            console.log("menuopen")
        }}
        setOpen={setMenuOpen}
        />
        <Menu open={menuOpen}/>
        <Link to="/map">
            Go to Map
        </Link>
        <Search/>
    </StyledHeader>
}


export default Header;