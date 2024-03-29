import React from 'react'
import { Link } from 'react-router-dom'
import search from '../assets/searchicon.svg'
import styled from 'styled-components'

const StyledSearch = styled.img`
width: 10vw;
max-width: 4rem;
`

const Search = () => {

    return <Link to="/search">

        <StyledSearch src={search} />
    </Link>
}
export default Search;