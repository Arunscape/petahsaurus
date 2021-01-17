import React, { useState } from 'react';
import Header from '../components/Header'
import styled from 'styled-components';
import profile from '../assets/profilebrown.svg'

import useGlobalState from '../hooks/useGlobalState';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const StyledDiv = styled.div``;

const StyledItem = styled.span`
font-size: 2vw;
font-size: min(1rem);
`;

const StyledDateStuff= styled.span`
display: flex;
flex-direction: row;
justify-content: space-space-between;
`

const Spacer = styled.div`
padding: 1em;
`


const HR = styled.hr`
  height: 1px;
  width: 80vw;
  border: 0;
  background-color: grey;
`;
const StyledCheckBox = styled.input``;

const SearchOptions = styled.div`
display: flex;
flex-direction: column;
align-items: center;
font-family: 'Open Sans';
padding-top: 3vh;
`;
const Description = styled.div`
color: #565149;
font-size: 3vw;
text-align: left;
padding-top: 2em;
padding-bottom: 1em;
font-size: min(1.5rem);
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
`;

const Whomst = styled.div``
const Quality = styled.div``;
const Infosort = styled.div``;
const StyledInput = styled.input``;

const Box = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding-bottom: 2vh;
font-size: 2vw;
font-size: min(1rem);
box-sizing: border-box;
`;



const SearchPage = () => {
  const { filterOpts, setFilterOpts } = useGlobalState();

  type DateStuff = {
    start: Date,
    end: DataCue,
    checked: boolean,
  }

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
        <Box>
          <Description>
          Sort by who made it
          </Description>
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
        </Box>
        <HR></HR>
        <Box>
        <Description>
          Sort by quality of data
          </Description>
        <StyledItem>
          <StyledDateStuff>

          Verified

          <StyledCheckBox
            type="checkbox"
            name="verified"
            checked={verified}
            onChange={handleCheckBox}
            />
            </StyledDateStuff>
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
        </Box>
        <HR></HR>
        <Box>
        <Description>
          Sort by information
          </Description>
        <StyledItem>
          <div>By Date</div>
          <DatePicker selected={filterOpts.date.start} onChange={start => setFilterOpts({
            ...filterOpts,
            date: {
              ...filterOpts.date,
              start,
              unix_start: start.getTime()/1000
            }
          })} />
          <DatePicker selected={filterOpts.date.end} onChange={end => setFilterOpts({
            ...filterOpts,
            date: {
              ...filterOpts.date,
              end,
              unix_end: end.getTime()/1000
            }
          })} />
          <StyledCheckBox
            type="checkbox"
            name="by_date"
            checked={filterOpts.date.checked}
            onChange={(e) => {
              setFilterOpts({
                ...filterOpts,
                date: {
                  ...filterOpts.date,
                  checked: e.target.checked
                }
              })
            }}
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
        </Box>
      </SearchOptions>
    </StyledDiv>
  );
};
export default SearchPage;
