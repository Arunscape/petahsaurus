import React, { useState } from 'react';
import Header from '../components/Header'
import styled from 'styled-components';
import profile from '../assets/profilebrown.svg'

import useGlobalState from '../hooks/useGlobalState';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const StyledDiv = styled.div`
`;

const StyledItem = styled.span`
font-size: 2vw;
padding: 1rem;
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


const StyledCheckBox = styled.input``;

const SearchOptions = styled.div`
display: flex;
flex-direction: column;
align-items: center;
font-family: 'Open Sans';
padding-top: 3vh;
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
const Description = styled.div`
color: #565149;
font-size: 3vw;
text-align: left;
padding-bottom: 5vh;
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

const Quality = styled.div`
display: flex;
flex-direction: column;
align-items: center;
border-style: solid;
border-color: #ABA59B;
border-top: none;
border-left: none;
border-right: none;`;

const Infosort = styled.div`
display: flex;
flex-direction: column;
align-items: center;
border-style: solid;
border-color: #ABA59B;
border-top: none;
border-left: none;
border-right: none;`;

const StyledInput = styled.input`
border-style: solid;
border-top: none;
border-right: none;
border-left: none;
border-color: #ABA59B;
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
        <Whomst>
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
        </Whomst>
        <Quality>
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
        </Quality>
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
        <Infosort>
        <StyledItem>
          By Location
          <StyledCheckBox
            type="checkbox"
            name="by_location"
            checked={by_location}
            onChange={handleCheckBox}
          />
        </StyledItem>
        </Infosort>
      </SearchOptions>
    </StyledDiv>
  );
};
export default SearchPage;
