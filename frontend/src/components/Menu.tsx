import React from 'react'
import styled from 'styled-components'
import {Link } from 'react-router-dom'

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #EFFFFA;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  text-align: left;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  height: 100%;

  @media (max-width: 576px) {
      width: 100%;
    }

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: #0D0C1D;
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: 576px) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: #343078;
    }
  }
`

const Menu = ({ open }) => {
  return (
    <StyledMenu open={open}>
      <Link to="/add">
        <span role="img">🦖</span>
        Submit Observation
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