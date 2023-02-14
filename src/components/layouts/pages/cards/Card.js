import React, { useEffect, useState,createContext } from 'react'
import styled from 'styled-components'
import { ethers } from 'ethers'
import CampaignFactory from '../../../../contract_abi/CampaigFactory.json'
import {NavLink} from "react-router-dom";




const Addhandler = createContext()
const Card = () => {
const [load,setload]=useState(false)

const [All,setAll]=useState([])
const [Health,setHealth]=useState([])
const [Edu,setEdu]=useState([])
const [Ani,setAni]=useState([])





const [filter,setfilter]=useState([])

    const data = async ()=>{
        setload(true)
        const myprovider= new ethers.providers.JsonRpcProvider(
            'https://polygon-mumbai.infura.io/v3/1d92f090fdc542a18b75377eb7357a45'
        )
        
        const mycontract= new ethers.Contract( 
            
            '0x08C35d33009cF785cfb730729C291a75Cc221628',
            CampaignFactory.abi, 
             myprovider )
    
            const getAllContracts=  mycontract.filters.createdCampaign()
            const ALlCampaign=await mycontract.queryFilter(getAllContracts)
            const  Alldata=ALlCampaign.map((e)=>{
                return{
                    title : e.args.title,
                    owner : e.args.owner,
                    image :e.args.imageurl,
                    required : ethers.utils.formatEther(e.args.requreAmount),
                    time : parseInt(e.args.timestamp),
                    Mycampaignaddress : e.args.campaignaddress
                }})
           
    // console.log(ALlCampaign)
                const getHealthContracts=mycontract.filters.createdCampaign(null,null,null,null,null,null,'Health')
                const HealthCampaign=await mycontract.queryFilter(getHealthContracts)
                const Healthdata=HealthCampaign.map((e)=>{
                    return{
                        title : e.args.title,
                        owner : e.args.owner,
                        image : e.args.imageurl,
                        required : ethers.utils.formatEther(e.args.requreAmount),
                        time : parseInt(e.args.timestamp),
                    }})
    
                    const getEducationContracts=mycontract.filters.createdCampaign(null,null,null,null,null,null,'Education')
                    const EducationCampaign=await mycontract.queryFilter(getEducationContracts)
                    const Educationdata=EducationCampaign.map((e)=>{
                        return{
                            title : e.args.title,
                            owner : e.args.owner,
                            image : e.args.imageurl,
                            required : ethers.utils.formatEther(e.args.requreAmount),
                            time : parseInt(e.args.timestamp),
                        }})
                
                        const getAnimalContracts=mycontract.filters.createdCampaign(null,null,null,null,null,null,'Animal')
                        const AnimalCampaign=await mycontract.queryFilter(getAnimalContracts)
                        const Animaldata=AnimalCampaign.map((e)=>{
                            return{
                                title : e.args.title,
                                owner : e.args.owner,
                                image : e.args.imageurl,
                                required : ethers.utils.formatEther(e.args.requreAmount),
                                time : parseInt(e.args.timestamp),
                            }})   
                            
                           
try{
    setAll(Alldata)
    setHealth(Healthdata)
    setEdu(Educationdata)
    setAni(Animaldata)
    setfilter(Alldata)
    console.log(Alldata)
    

    setload(false)
}
catch(e){
    setload(false)
    console.log(e)
    
}
                       
                        
                       
                       
            
    }






useEffect(()=>{
    data();
},[])


//<Image src={"https://rksfunding.infura-ipfs.io/ipfs/"+e.image} alt='this is image'/> 



    return (<>

<HomeWrappper>
<FilterWrapper>
        <Category onClick={()=>setfilter(All)} >    All   </Category>
        <Category onClick={()=>setfilter(Edu)} >Education</Category>
        <Category onClick={()=>setfilter(Health)} >Health</Category>
        <Category onClick={()=>setfilter(Ani)} >Animale</Category>
    </FilterWrapper>
   

<Cards>
  {
load ==true ? <h1>Loading....</h1>:
        
     filter.map((e)=>{
        return (
            <Cardwrapper>
           <Image src={"https://rksfunding.infura-ipfs.io/ipfs/"+e.image} alt='this is image'/>
            <Title>
            {e.title}
            </Title>
            <CardDate>
                <Test>owner</Test>
                <Test>{e.owner.slice(0,4)}....{e.owner.slice(39)}</Test>
            </CardDate>
            <CardDate>
                <Test>Amount</Test>
                <Test>{e.required} matic</Test>
            </CardDate>
            <CardDate>
                <Test>time</Test>
                <Test>{new Date(e.time*1000).toLocaleString()}</Test>
            </CardDate>
            <Button >
            <NavLink key={new Date(e.time*1000).toLocaleString()} to ={`/gotocampaign?add=${e.Mycampaignaddress}`} >Go To Campaign</NavLink>
            </Button>
        </Cardwrapper>
        )
     })       
        

        
}
    </Cards>
</HomeWrappper>

</>

    )

}
















const HomeWrappper=styled.div`
display: flex;
flex-direction: column;
align-items: center;
font-size: large;
font: bold;
width: 100%;





`
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

const Cards=styled.div`
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
flex-wrap: wrap;
margin: 30px;


`
const Cardwrapper=styled.div`
display: flex;
flex-direction: column;
width: 25vw;
margin: 20px 10px;



`
const CardImage= styled.div`
width: 100%;
height: auto;
border: 2px solid black;
`
const CardDate=styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
background-color: ${(props)=>props.theme.bgsub}; 
margin: 2px;
`
const Image=styled.img`
width: 100%;
height: 30vh;


`
const Title=styled.div`
width: auto;
height: auto;
background-color: ${(props)=>props.theme.bgsub}; 
margin: 2px;
`
const Test=styled.div`
width: auto;
padding: 2px;
display: flex;
justify-content:space-between;
background-color: ${(props)=>props.theme.bgsub}; 

`

const Button=styled.button`

font-size: large;
font: bold;
padding: 4px;
color: ${(props) => props.theme.text};
background-color: #8ee01b;
outline: none;
border:  none;
`

export default Card
