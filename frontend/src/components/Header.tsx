import styled from 'styled-components';
import { useHistory, useLocation, Link } from 'react-router-dom';
import React from 'react'

import back from '../assets/backarrow.svg'
import edit from '../assets/backarrow.svg'

const BackButton = styled.button`
width: 10vw;
max-width: 4rem;
background-color: transparent;
border: transparent;
`;

const EditButton = styled.button`
height: 4rem;
width: 4rem;
background-color: transparent;
border: transparent;
float: right;
background-color: #79b473;
`

const StyledHeader = styled.div`
box-sizing: border-box;
width: 100vw;
position: relative;
display: block;
justify-content: center;
align-items: baseline;
padding: 1em;
background-color: #393E41;
`;

const Navi1 = styled.div`
/*background-color: green;*/
`
const Navi2 = styled.div`
/*background-color: blue;*/
`
const Navi3 = styled.div`
/*background-color: red;*/
`
const Map = styled.img`
height: 4rem;
width: 4rem;
`

const Header = () => {
    const history = useHistory();
    const location = useLocation();

    const id = location.pathname.replace("/finding/", "");

    return (
      <StyledHeader>
        <BackButton onClick={() => history.goBack()}>
          <img src={back} />
        </BackButton>

        {location.pathname.startsWith('/finding') && (
          <Link to={`/edit/${id}`}>
            <EditButton>
              <img src={edit} />
            </EditButton>
          </Link>
        )}
      </StyledHeader>
    );
  };



  export default Header;
