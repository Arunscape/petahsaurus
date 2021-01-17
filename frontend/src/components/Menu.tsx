import React from 'react'
import styled from 'styled-components'
import {Link } from 'react-router-dom'

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background: #EDEBD7;
  padding-bottom: 10rem;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  text-align: left;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  max-width: 50%;
  height: 100%;

  @media (max-width: 576px) {
      width: 100%;
    }

  a {
    text-transform: uppercase;
    padding-right: 2vw;
    padding-left: 2vw;
    font-family: 'Open Sans';
    font-weight: bold;
    color: #423E37;
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: 576px) {
      font-size: 100%;
    }

    &:hover {
      color: black;
    }
  }
`

const Menu = ({ open }) => {
  return (
    <StyledMenu open={open}>
      <Link to="/add">
        <span role="img">🦖</span>
        New Finding
      </Link>
      <Link to="/notifications">
        <span role="img">🔔</span>
        Notifications
        </Link>
      <Link to="/profile">
        <span role="img">👤</span>
        Profile
      </Link>
    </StyledMenu>
  )
}

export default Menu