import React from 'react'
import styled from 'styled-components'

const Filter = () => {
  return (
    <FilterWrapper>
        <Category>    Icon   </Category>
        <Category>Education</Category>
        <Category>Health</Category>
        <Category>Animale</Category>
    </FilterWrapper>

  )
}

const FilterWrapper= styled.div`

display: flex;
align-items: center;
width: 80%;
margin-top: 20px;

`
const Category=styled.div`
margin: 10px;
background-color: ${(props)=>props.theme.bgdiv};
padding: 10px 20px;
border-radius: 15px;
cursor: pointer;
`
export default Filter