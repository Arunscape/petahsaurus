import React from 'react'

interface FindingsProps {
    image: string,
    description: string,
}

const Findings = (props: FindingsProps) => <div>
    <img src="https://via.placeholder.com/150" />
    <p>this is a description for the component</p>
</div>


export default Findings;
