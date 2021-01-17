import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import useGlobalState from '../hooks/useGlobalState';

const BackButton = styled.button``;

const StyledDiv = styled.div`
`;

const StyledItem = styled.span``;

const StyledHeader = styled.div`
  box-sizing: border-box;
  width: 100%;
  position: relative;
  display: block;
  justify-content: center;
  align-items: baseline;
  padding: 1em;
  margin-bottom: 2em;
  background-color: rgb(192, 45, 26);
  color: #fff;
`;

const StyledCheckBox = styled.input``;

const SearchOptions = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

const StyledInput = styled.input``;

const SearchHeader = () => {
  const history = useHistory();

  return (
    <StyledHeader>
      <BackButton onClick={() => history.goBack()}>Go Back</BackButton>
    </StyledHeader>
  );
};

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
      <SearchHeader />
      <SearchOptions>
        <StyledItem>
            Only Mine
          <StyledCheckBox
            type="checkbox"
            name="only_mine"
            checked={only_mine}
            onChange={handleCheckBox}
          />
        </StyledItem>
        <StyledItem>
            By User
          <StyledInput
            type="text"
            name="by_user"
            value={by_user}
            onChange={handleText}
          />
        </StyledItem>
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
