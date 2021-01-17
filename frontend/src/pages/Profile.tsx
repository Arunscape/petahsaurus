import React from 'react';
import * as Api from '../api';
import Header from '../components/Header';
import styled from 'styled-components';

const StyledBackground = styled.div`
display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
`;

const Profile = () => {
    return <StyledBackground>
        <Header></Header>
        <p>Your Profile :)</p>
        <span>Email: </span><span>{Api.getUserIdInfo().email}</span>
        </StyledBackground>
}

export default Profile;