import React, { useState } from 'react'
import styled from 'styled-components'
import { Handeler } from '../Create_campaign'
import { useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {create as IPFSHTTPClient} from 'ipfs-http-client'
import { TailSpin } from 'react-loader-spinner';
import Header from '../../Header';
import {Buffer} from 'buffer';
import { ethers } from 'ethers'
import CampaignFactory from '../../../../contract_abi/CampaigFactory.json'






//=================== Authontication keys===================================
const projectId = '2LJdC1Fqy6Ph9H9Uxf5lCuVJIK6'
const projectSecret = '0cb4ad4949a9ef2598483b19835db0eb'
const auth = 'Basic ' + Buffer.from(projectId + ":" + projectSecret).toString('base64')
//====================== Main function =================================
const RightWrapper = () => {

    const myHandeler=useContext(Handeler)

//================== Connect to ipfs account ===============================
    const uploadfile = async(e)=>{
        const client = IPFSHTTPClient({
  
            host:'ipfs.infura.io',
            port:5001,
            protocol:'https',
            headers:{
                authorization:auth
            }
           
          })
        
        e.preventDefault();
        myHandeler.setuploading(true);
        console.log('file is uploading')

//===================Uplord image and story to ipfs==================================
        if(myHandeler.form.story != "" && myHandeler.image !== null)
        {
            try{
                const added=await client.add(myHandeler.form.story)
                myHandeler.setstoryurl(added.path)
                
            }
            catch(error)
            {
                toast.warn("error uploading story")
            }    
            
            try{
                const added=await client.add(myHandeler.image)
                myHandeler.setimageurl(added.path)
  
            }
            catch(error)
            {
                toast.warn("error uploading image")
            } 
            toast.success("file uploaded successfully")
        }
        else{
            toast.warn("please put data on story and image")
        }

        myHandeler.setuploading(false);
        myHandeler.setuploaded(true);
      
    }
//=====================================================================
//===========Start Campaign=================
  const startcampaign= async (e)=>{
    e.preventDefault();
    const myprovider= new ethers.providers.Web3Provider(window.ethereum)
    const myaccounts=myprovider.getSigner();

    if(myHandeler.form.Create_campaig=="")
    {
      toast.warn("Campaign name required")
    }
    else if(myHandeler.form.story=="")
    {
      toast.warn("Story of campaign required")
    }
    else if(myHandeler.form.required_amount=="")
    {
      toast.warn("Amount is required")
    }
    else if(myHandeler.uploaded==false)
    {
        toast.warn("please uploard image and story to ipfs first")
    }
    else{
        myHandeler.setloading(true)
        const mycontract= new ethers.Contract( 
            '0x08C35d33009cF785cfb730729C291a75Cc221628',
            CampaignFactory.abi, 
             myaccounts )
        console.log(mycontract)
        
        const Ream=ethers.utils.parseEther(myHandeler.form.required_amount)
        const CampaignData= await mycontract.createcampaign(
            myHandeler.form.Create_campaig,
            Ream,
            myHandeler.Imageurl,
            myHandeler.storyurl,
            myHandeler.form.category

        )
        await CampaignData.wait()
        myHandeler.setaddress(CampaignData.to)
        console.log(CampaignData.to)
        
    }


  }
 //======================================================================  

    return (
        <RigthWala>
            <Righinput>
                <RowInput>
                    <Righinput>
                        <label >Required Amount</label>
                        <Input type='number' placeholder="Required Amount"
                        value={myHandeler.form.required_amount}
                        onChange={myHandeler.formHandeler}
                        name="required_amount"
                        >
                        </Input>
                    </Righinput>

                    <Righinput2>
                        <label >Choose Cetagory</label>
                        <Select 
                        value={myHandeler.form.category}
                        onChange={myHandeler.formHandeler}
                        name="category">
                            <option>Education</option>
                            <option>Health</option>
                            <option>Animale</option>
                        </Select>
                    </Righinput2>
                </RowInput>

                <Righinput>
                        <label >uplord image</label>
                        <Image 
                        type='file'
                        onChange={myHandeler.imageHandeler}
                        >
                        </Image>
                </Righinput>
                { myHandeler.uploading == true ? <TailSpin/>:
                myHandeler.uploaded == false ? 
                <Button onClick={uploadfile}>
                    Uplord file to IPFS
                </Button>:
                <Button style={{cursor:'no-drop'}}>
                File Uploaded Successfuly
            </Button>
                }
               
                <Button onClick={startcampaign}>
                    Start Campaign
                </Button>

            </Righinput>
        </RigthWala >
    )
}
const RigthWala = styled.div`
width: 50%;
margin-top: 20px;
margin-right: 50px;


`
const Righinput = styled.div`
margin-bottom: 10px;
display: flex;
flex-direction: column;

`
const Righinput2=styled.div`
margin-right: 70px;
`
const RowInput = styled.div`
display: flex;
justify-content: space-between;

`
const Input = styled.input`
width: 100%;
padding: 15px;
margin-top: 7px;
border-radius: 10px;
color: ${(props) => props.theme.text};
background-color: ${(props) => props.theme.bgdiv};
outline: none;
border:  none;
font-size: large;

`
const Select = styled.select`
width: 100%;
padding: 15px;
margin-top: 7px;
border-radius: 10px;
color: ${(props) => props.theme.text};
background-color: ${(props) => props.theme.bgdiv};
outline: none;
border:  none;
font-size: large;
`
const Image=styled.input`
width: 88%;
padding: 15px;

margin-top: 7px;
border-radius: 10px;
color: ${(props) => props.theme.text};
background-color: ${(props) => props.theme.bgdiv};
outline: none;
border:  none;

`
const Button=styled.button`

width: 88%;
padding: 15px;

margin-top: 20px;
border-radius: 10px;
color: ${(props) => props.theme.text};
/* background-color: ${(props) => props.theme.bgsub}; */
background-color: #8ee01b;
outline: none;
border:  none;
`
export default RightWrapper