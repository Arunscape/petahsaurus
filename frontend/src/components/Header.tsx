import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import React from 'react'

import back from '../assets/backarrow.svg'

const BackButton = styled.button`
height: 4rem;
width: 4rem;
background-color: transparent;
border: transparent;
`;

const StyledHeader = styled.div`
box-sizing: border-box;
width: 100vw;
position: relative;
display: block;
justify-content: center;
align-items: baseline;
padding: 1em;
margin-bottom: 2em;
background-color: #E3B23C;
`;


const Header = () => {
    const history = useHistory();

    return (
      <StyledHeader>
        <BackButton onClick={() => history.goBack()}>
        <img src={back} />
        </BackButton>
      </StyledHeader>
    );
  };



  export default Header;
