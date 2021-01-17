import React from 'react';
import Header from '../components/Header'
import styled from 'styled-components';
import profile from '../assets/profilebrown.svg'

import useGlobalState from '../hooks/useGlobalState';



const StyledDiv = styled.div`
`;

const StyledItem = styled.span`
font-size: 2vw;
`;


const StyledCheckBox = styled.input``;

const SearchOptions = styled.div`
display: flex;
flex-direction: column;
align-items: center;
font-family: 'Open Sans';
`;
const Whomst = styled.div`
display: flex;
flex-direction: column;
align-items: center;
border-style: solid;
border-color: #ABA59B;
border-top: none;
border-left: none;
border-right: none;
`
const Whomsttag = styled.div`
color: #565149;
font-size: 3vw;
text-align: left;
`
const Profilebox = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`
const Profile = styled.img`
height: auto;
width: 3vw;
padding: 0.5rem;
`

const StyledInput = styled.input`
border-style: solid;
border-top: none;
border-right: none;
border-left: none;
border-color: #ABA59B;
font-size: 2vw;
box-sizing: border-box;
`;



const SearchPage = () => {
  const { filterOpts, setFilterOpts } = useGlobalState();

  const handleCheckBox = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;

    setFilterOpts({
      ...filterOpts,
      [name]: checked,
    });
  };

  const handleText = (e) =>
    setFilterOpts({ ...filterOpts, by_user: e.target.value });

  console.log(filterOpts);

  const {
    only_mine,
    by_user,
    verified,
    needs_id,
    by_date,
    by_location,
  } = filterOpts;

  return (
    <StyledDiv>
      <Header />
      <SearchOptions>
        <Whomst>
          <Whomsttag>
          Who made it?
          </Whomsttag>
        <StyledItem>
            Show only my observations
          <StyledCheckBox
            type="checkbox"
            name="only_mine"
            checked={only_mine}
            onChange={handleCheckBox}
          />
        </StyledItem>
        <StyledItem>
          <Profilebox>
            <Profile src={profile} />
          <StyledInput
            type="text"
            placeholder="User"
            name="by_user"
            value={by_user}
            onChange={handleText}
          />
          </Profilebox>
        </StyledItem>
        </Whomst>
        <StyledItem>
          Verified
          <StyledCheckBox
            type="checkbox"
            name="verified"
            checked={verified}
            onChange={handleCheckBox}
          />
        </StyledItem>
        <StyledItem>
          Needs ID
          <StyledCheckBox
            type="checkbox"
            name="needs_id"
            checked={needs_id}
            onChange={handleCheckBox}
          />
        </StyledItem>
        <StyledItem>
          By Date
          <StyledCheckBox
            type="checkbox"
            name="by_date"
            checked={by_date}
            onChange={handleCheckBox}
          />
        </StyledItem>
        <StyledItem>
          By Location
          <StyledCheckBox
            type="checkbox"
            name="by_location"
            checked={by_location}
            onChange={handleCheckBox}
          />
        </StyledItem>
      </SearchOptions>
    </StyledDiv>
  );
};
export default SearchPage;
