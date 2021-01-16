import React from 'react'

interface FindingsProps {
    image: string,
    description: string,
}

const FindingCard = (props: FindingsProps) => <div>
    <img src={props.image} />
    <p>{props.description}</p>
</div>


export default FindingCard;
