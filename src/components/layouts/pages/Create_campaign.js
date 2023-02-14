import React, { createContext, useState } from 'react'
import styled from 'styled-components'
import LeftWrapper from './forms/LeftWrapper'
import RightWrapper from './forms/RightWrapper'
import { TailSpin } from 'react-loader-spinner';
import {NavLink} from "react-router-dom";


const Handeler = createContext();

const Create_campaign = () => {


//================ Use state =====================================
  const [form, setform] = useState({
    Create_campaign: "",
    story: "",
    required_amount: "",
    category: ""
  })
const [uploading,setuploading] = useState(false)
const [uploaded,setuploaded]=useState(false)
  const [loading, setloading] = useState(false)
  const [address, setaddress] = useState("")
  const [image, setimage] = useState(null)
  const [storyurl, setstoryurl] = useState()
  const [Imageurl, setimageurl] = useState()

//============== Handelers ==========================================
  const formHandeler = (e) => {
    setform({
      ...form, [e.target.name]: e.target.value
    })
  }

  const imageHandeler = (e) => {
    setimage(e.target.files[0])
  }

//======================= return ========================================
  return (<>
    <Handeler.Provider value={{ form, setform, formHandeler, image, setimage, 
      imageHandeler, setstoryurl, setimageurl,setloading,setaddress,
      setuploading,loading,setuploaded,uploaded,storyurl,Imageurl,uploading
      }}>
      
      {
        loading == true ?
          address == "" ?
                        <Spinner>
                          <TailSpin height={60}></TailSpin>
                        </Spinner>    : 
                        <Address>
                            <h1>Your Campaign Started Successfuly</h1>
                            <h2 style={{margin:'10px'}} > {address} </h2>
                            <NavLink to ={`/`} ><Button>
                              Back To Home
                              </Button></NavLink>
                            
                      </Address>      :
                      <>
            <Makecenter>
            Create Campaign
          </Makecenter>
          <FormWrapper>
            <LeftWrapper />
            <RightWrapper />
          </FormWrapper>
          </>
      }
    </Handeler.Provider>
  </>
  )
}
const Spinner=styled.div`
width: 100vw;
height: 70vh;
display: flex;
justify-content: center;
align-items: center;
`
const Address=styled.div`
width: 100vw;
height: 60vh;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;

`
const Button=styled.button`
width: 88vw;
padding: 15px;
margin-top: 20px;
border-radius: 10px;
color: ${(props) => props.theme.text};
background-color: #8ee01b;
outline: none;
border:  none;
`

const FormWrapper = styled.form`
margin-top: 30px;
width: 100%;
display: flex;
justify-content: space-between;

`
const Makecenter = styled.div`
margin-top: 30px;
display: flex;
justify-content: center;
font-size: 50px;


`

export default Create_campaign
export { Handeler }