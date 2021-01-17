import React from 'react';
import type { Finding } from 'src/api';
import styled from 'styled-components';

const Background = styled.div``;
const StyledImg = styled.img``;
const Description = styled.p``;
const StyledDate = styled.div``;
const StyledCoords = styled.div``;
const StyledTags = styled.div``;
const Tag = styled.div``;
const ShareButton = styled.button``;

const FindingsPage = (props: { finding: Finding }) => (
  <Background>
    <StyledImg src={props.finding.image} />
    <Description>{props.finding.content}</Description>
    <StyledDate></StyledDate>
    <StyledCoords></StyledCoords>
    <StyledTags>

        {
            Object.entries(props.finding.tags).map(([key, value]: [string, string]) => 
            <Tag>
                <div>{key}</div>
                <div>{value}</div>
            </Tag>)
        }

    </StyledTags>
    <ShareButton onClick={() => props.finding.id}>Share Finding</ShareButton>
  </Background>
);

export default FindingsPage;
