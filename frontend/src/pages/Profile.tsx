import React from 'react';
import * as Api from '../api';
import Header from '../components/Header';
import styled from 'styled-components';
import friend from '../assets/rptr.png'

const StyledBackground = styled.div`
display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  font-family: 'Open Sans';
`;

const Friend = styled.img`
width: 30vw;
min-width: 20rem;
`;

const Profile = () => {
    return <StyledBackground>
        <Header></Header>
        <Friend src={friend} />
        <p>Your Profile :)</p>
        <span>Email: </span><span>{Api.getUserIdInfo().email}</span>
        </StyledBackground>
}

export default Profile;