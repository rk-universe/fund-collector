import React from 'react'

import styled ,{div} from 'styled-components';
import HeaderLogo from './components/HeaderLogo'
import HeaderNav from './components/HeaderNav'
import HeaderRight from './components/HeaderRight'
import Wallet from './components/Wallet';


 const Header = () => {
  return (
    <div>
  <HeaderWrapper>

    <HeaderLogo/>
    <HeaderNav/>
    <Wallet/>
    <HeaderRight />
      
  </HeaderWrapper>
  </div>
 
  )
}

const HeaderWrapper = styled.div`
  height:70px;
  width:100vw;
  padding:10px 20px;
  align-items: center;
  display:flex;
  justify-content:space-between;
`
export default Header