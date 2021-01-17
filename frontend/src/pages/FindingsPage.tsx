import React, { useEffect, useState } from 'react';
import type { Finding } from 'src/api';
import * as Api from '../api'
import styled from 'styled-components';
import {useLocation } from 'react-router-dom'
import Header from '../components/Header';

const Background = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;
const StyledImg = styled.img`
max-width:50%;
`;
const Description = styled.p``;
const StyledDate = styled.div``;
const StyledCoords = styled.div``;
const StyledTags = styled.div``;
const Tag = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 80vw;
  max-width: 300px;
  box-shadow: 2px 2px 4px 0px rgba(0,0,0,0.75);
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 10px;
`;
const ShareButton = styled.button``;

const FindingsPage = () => {

  const [finding, setFinding] = useState<Finding>()

  const location = useLocation();

  useEffect(()=> {
    const id = location.pathname.replace("/finding/", "");
    
    Api.getFinding(id).then(res => {
      setFinding(res.data)
      console.log(res.data)
    })


  }, [])
  
  
  return finding ? <Background>
    <Header/>
    <StyledImg src={finding.image} />
    <Description>{finding.content}</Description>
    <StyledDate></StyledDate>
    <StyledCoords></StyledCoords>
    <StyledTags>

        { finding.tags &&
            Object.entries(finding.tags).map(([key, value]: [string, string]) => 
            <Tag>
                <div>{key}</div>
                <div>{value}</div>
            </Tag>)
        }

    </StyledTags>
    <ShareButton onClick={() => finding.id}>Share Finding</ShareButton>
  </Background> : <div>Loading...</div>
};

export default FindingsPage;
