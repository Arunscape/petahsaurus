import React from 'react'
import type { Finding } from 'src/api'
import styled from 'styled-components'

const Card = styled.div``
const StyledImg = styled.img``
const Description = styled.p``

const FindingCard = (props: {finding: Finding}) => <Card>
    <StyledImg src={props.finding.image} />
    <Description>{props.finding.content}</Description>
</Card>


export default FindingCard;
