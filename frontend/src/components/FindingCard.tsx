import React from 'react'
import styled from 'styled-components'

const Card = styled.div``
const StyledImg = styled.img``
const Description = styled.p``

interface FindingsProps {
    image: string,
    description: string,
}

const FindingCard = (props: FindingsProps) => <Card>
    <StyledImg src={props.image} />
    <Description>{props.description}</Description>
</Card>


export default FindingCard;
