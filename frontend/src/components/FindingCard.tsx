import React from 'react';
import type { Finding } from 'src/api';
import styled from 'styled-components';
import {Link} from 'react-router-dom'

const Card = styled.div``;
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
