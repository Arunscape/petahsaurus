import styled from 'styled-components';
import React from 'react';
import burger from '../assets/Hamburger_icon.svg'

const StyledBurger = styled.button`
  width: 10vw;
  max-width: 4rem;
  background: transparent;
  border: transparent;


  &:focus {
    outline: none;
  } 

 div {
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-child(2) {
      opacity: ${({ open }) => open ? '0' : '1'};
      transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`

const Burger = ({ open, setOpen }) => {
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <img src={burger}/>
    </StyledBurger>
  )
}

export default Burger