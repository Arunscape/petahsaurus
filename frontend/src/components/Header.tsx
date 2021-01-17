import React, { useState, useRef } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import styled from 'styled-components'
import map from '../assets/mapicon.svg'

import useClickOutside from '../hooks/useClickOutside'

const StyledHeader = styled.div`
width: 100%;
height: 4.5rem;
display: flex;
flex direction: row;
justify-content: space-around;
align-items: center;
padding: 1em;
margin-bottom: 2em;
background-color: rgb(192, 45, 26);
color: #fff;
`
const Navi1 = styled.div`
background-color: green;
`
const Navi2 = styled.div`
background-color: blue;
`
const Navi3 = styled.div`
background-color: red;
`
const Map = styled.img`
height: 4rem;
width: 4rem;
`


import HamburgerButton from './HamburgerButton'
import Search from './Search';
import Menu from './Menu'


const Header = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const node = useRef(); 
    useClickOutside(node, () => setMenuOpen(false));

    return <StyledHeader ref={node}>
        <Navi1>
        <HamburgerButton onClick={() => {
            setMenuOpen(!menuOpen)
            console.log("menuopen")
        }}
        setOpen={setMenuOpen}
        />
        <Menu open={menuOpen}/>
        </Navi1>
        <Navi2>
        <Link to="/map">
            <Map src={map} />
        </Link>
        </Navi2>
        <Navi3>
        <Search/>
        </Navi3>
    </StyledHeader>
}


export default Header;