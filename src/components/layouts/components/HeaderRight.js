import React from 'react'
import { BsFillMoonStarsFill } from 'react-icons/bs';
import {WiDayCloudy} from 'react-icons/wi'
import styled from 'styled-components';
import {App} from '../Layout'
import { useContext } from 'react';
import Wallet from './Wallet';

const HeaderRight = () => {
 const themetogler= useContext(App)


  return (
    <IconWrapper>
      
         <IconTogle>
      
          {themetogler.theme ==='light' ?  <BsFillMoonStarsFill onClick={themetogler.toggleTheme}/>: <WiDayCloudy onClick={themetogler.toggleTheme}/> }
         </IconTogle>
        
    </IconWrapper>
  )
  
}

const IconWrapper = styled.div`
width: 4%;
height: 100%;
background-color: ${(props)=>props.theme.bgdiv};
display: flex;
justify-content: center;
border-radius: 10px;
align-items: center;

`
const IconTogle = styled.div`

padding: 2px 5px;
width: auto;
height: 45%;
display: flex;
justify-content: space-between;
border-radius: 10px;
align-items: center;
cursor: pointer;
transform: scale(1.6);


`
export default HeaderRight