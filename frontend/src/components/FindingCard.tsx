import React from 'react';
import type { Finding } from 'src/api';
import styled from 'styled-components';
import {Link} from 'react-router-dom'

const Card = styled.div`
  background-color: white;
  width: 80vw;
  margin-left: 10vw;
  border-radius: 10px;
  box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 50px;
`;
const StyledImg = styled.img``;
const Description = styled.p``;

const FindingCard = (props: { finding: Finding }) => (
  <Link to={`/finding/${props.finding.id}`}>
    <Card>
      <StyledImg src={props.finding.image} />
      <Description>{props.finding.content}</Description>
    </Card>
  </Link>
);

export default FindingCard;
