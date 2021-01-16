import React from 'react';
import styled from 'styled-components'
import { useLocation, useHistory } from 'react-router-dom';


const StyledDiv = styled.div`
height: 100vh;
width: 100vw;
overflow: hidden;
display: flex;
flex-direction: column;
align-items: center; /* vertical */
justify-content: center; /* horizontal */
`

const StyledImg = styled.img`
height: auto;
width: 100%;
`

const StyledH1 = styled.h1`
`
const StyledButton = styled.button``;

import Arun from '../assets/Arun_idk.png'

const NotFound = () => {

    const location = useLocation();
    const history = useHistory();


    return <StyledDiv>
        <StyledImg src={Arun}/>
        <StyledH1>404 page not found {location.pathname}</StyledH1>
        <StyledButton onClick={() => history.goBack()}>Go Back</StyledButton>
        </StyledDiv>
}

export default NotFound;