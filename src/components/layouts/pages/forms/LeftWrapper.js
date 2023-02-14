import React, { useState } from 'react'
import styled from 'styled-components'
import campaigns from '../Campaigns'
import { Handeler } from '../Create_campaign'
import { useContext } from 'react'


const LeftWrapper = () => {
  const myHandeler=useContext(Handeler)
   return(
    <Leftwala>
        <LeftInput>
            <label >Campaign Name</label>
            <Input placeholder="Campaign Name"
            value={myHandeler.form.Create_campaig}
            onChange={myHandeler.formHandeler}
            name="Create_campaig"
            >

            </Input>
        </LeftInput>
        <LeftInput>
            <label >Story</label>
            <Textarea placeholder='write a story about why you want the funding'
             value={myHandeler.form.story}
             onChange={myHandeler.formHandeler}
             name="story">

            </Textarea>
        </LeftInput>
       
    </Leftwala>
   );
    
}

const Leftwala=styled.div`
width: 50%;
margin-top: 20px;
margin-left: 10%;

`
const LeftInput = styled.div`
margin-bottom: 10px;
display: flex;
flex-direction: column;

`
const Input=styled.input`
width: 85%;
padding: 15px;
margin-top: 7px;
border-radius: 10px;
color: ${(props)=>props.theme.text};
background-color: ${(props)=>props.theme.bgdiv};
outline: none;
border:  none;
font-size: large;

`

const Textarea=styled.textarea`

width: 85%;
padding: 15px;
margin-top: 7px;
border-radius: 10px;
color: ${(props)=>props.theme.text};
background-color: ${(props)=>props.theme.bgdiv};
outline: none;
border:  none;
font-size: large;
max-width: 85%;
min-width: 85%;
max-height: 100%;
font-size: large;

`
export default LeftWrapper