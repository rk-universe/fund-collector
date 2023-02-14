import React from 'react'
import styled from 'styled-components'
import {NavLink} from "react-router-dom";

const HeaderNc = () => {
  return (
    <Navbar>
      <Navoption>
      {/* DESHBOARD */}
      <NavLink to ={`/`} ><Nav>DESHBOARD</Nav></NavLink>
      </Navoption>
      <Navoption>
      {/* CREATE CAMPAIGONS */}
        <NavLink to={`/create_campaigons`}><Nav>CREATE CAMPAIGONS</Nav></NavLink>
      </Navoption>
      <Navoption className='active'>
      {/* CAMPAIGONS */}
        <NavLink to={`/campaigons`} ><Nav>CAMPAIGONS</Nav></NavLink>
      </Navoption>
      
    </Navbar>
  )
}
const Navbar=styled.div`
width: 40%;
height: 100%;
background-color: ${(props)=>props.theme.bgdiv};
display: flex;
justify-content: space-between;
border-radius: 10px;
align-items: center;
padding:10px 20px;
position: relative;
left: 100px;
`
const Navoption=styled.div`
a{
  text-decoration: none;
  color:${(props)=>props.theme.text} ;  
  &.active{
    width: auto;
    height: 100%;
    padding: 6px 6px;
    display: flex;
    justify-content: center;
    border-radius: 10px;
    align-items: center;
    background-color: ${(props)=>props.theme.bgsub};
    
  }
}

`
const Nav=styled.p`
/* color:${(props)=>props.theme.text} ; */

`


export default HeaderNc