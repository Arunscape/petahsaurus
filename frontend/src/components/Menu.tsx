import React from 'react'
import styled from 'styled-components'
import {Link } from 'react-router-dom'
import newobs from '../assets/addtag.svg'
import notif from '../assets/notification.svg'
import profile from '../assets/editprofile.svg'

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background: #D8CFC0;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  text-align: left;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  max-width: 40%;
  height: 100%;

  @media (max-width: 576px) {
      width: 100%;
    }

  a {
    text-transform: uppercase;
    padding-right: 2vw;
    padding-left: 2vw;
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    color: #423E37;
    text-decoration: none;
    transition: color 0.3s linear;
    display: flex;
    align-items: center;

    @media (max-width: 576px) {
      font-size: 4vw;
    }

    &:hover {
      color: black;
    }
  }
`
const Icon = styled.img`
width: 5vw;
max-width: 2rem;
padding: 0.5rem;
`;

const Menu = ({ open }) => {
  return (
    <StyledMenu open={open}>
      <Link to="/add">
        <Icon src={newobs}/>
        New Finding
      </Link>
      <Link to="/notifications">
        <Icon src={notif}/>
        Activity
        </Link>
      <Link to="/profile">
        <Icon src={profile}/>
        Profile
      </Link>
    </StyledMenu>
  )
}

export default Menu