import React from 'react'
import styled from 'styled-components'
import Campaignabi from '../../../contract_abi/Campaign.json'
import { ethers } from 'ethers'
import { useState , useEffect} from 'react'
import {create as IPFSHTTPClient} from 'ipfs-http-client'
import {Buffer} from 'buffer';


const projectId = '2LJdC1Fqy6Ph9H9Uxf5lCuVJIK6'
const projectSecret = '0cb4ad4949a9ef2598483b19835db0eb'
const auth = 'Basic ' + Buffer.from(projectId + ":" + projectSecret).toString('base64')


const Mydonate = () => {

const[load,setload]=useState(true)
const [camdata,setcamdata]=useState({
    title : '',
    reqAmount:'',
    Image:'',
    story: '',
    recAmount:'',
    owner:'',
    donatedData:[]

})
const [onlyforstroy,setonlyforstroy] =useState('')


const [inputreq,setinputreq] =useState('')
const [donatePending,setdonatePending]=useState(false)

const [pleasewait,setpleasewait]=useState(false)


    const queryParameters = new URLSearchParams(window.location.search)
    const campaignAdd = queryParameters.get("add")
    
//################# functioins ###############################
const connecttowallet=async () =>{
    setload(true)

    const myprovider= new ethers.providers.JsonRpcProvider(
            'https://polygon-mumbai.infura.io/v3/1d92f090fdc542a18b75377eb7357a45'
        )


        
        const mycontract= new ethers.Contract(     
            campaignAdd,
            Campaignabi.abi, 
             myprovider )

const Mytitle=await mycontract.title()
const MyrequreAmount=await mycontract.requiredAmount()
const Myimage=await mycontract.image()
const Mystory=await mycontract.story()
const MyreceivedAmount=await mycontract.receivedAmount()
const myowner=await mycontract.owner()

const Donated=mycontract.filters.doneted()
const events=await mycontract.queryFilter(Donated)
const Alldonated=events.map((e)=>{
    return{
    donar : e.args.donar,
    valueDonated :ethers.utils.formatEther(e.args.value)
,    time : parseInt(e.args.timestamp)
    }})  


const client = IPFSHTTPClient({
  
    host:'ipfs.infura.io',
    port:5001,
    protocol:'https',
    headers:{
        authorization:auth
    }
   
  })

  let asyncitr=client.cat(Mystory)
  for await(const itr of asyncitr)
  {
let data = Buffer.from(itr).toString();
setonlyforstroy(data)

  }
                

return({
    title:Mytitle,
    reqAmount:ethers.utils.formatEther(MyrequreAmount),
    Image:Myimage,
    story:Mystory,
    recAmount:ethers.utils.formatEther(MyreceivedAmount),
    owner:myowner,
    donatedData:Alldonated
    

})

}


const getcamdata=async()=>{
    const campaigndata = await connecttowallet();
    console.log(campaigndata.donatedData)
  
    setcamdata(campaigndata)
    setload(false)
}

useEffect(()=>{ 
    getcamdata()

},[])


const handelInput =(e)=>{
    setinputreq(e.target.value)
}

const donatenow=async()=>{
    try{
        setdonatePending(true)
    await window.ethereum.request({method:'eth_requestAccounts'})
    const myprovider= new ethers.providers.Web3Provider(window.ethereum,'any')
    const myaccounts=myprovider.getSigner();
    

    const mycontract= new ethers.Contract( 
        campaignAdd,
        Campaignabi.abi, 
         myaccounts )


    const donatetrans=await mycontract.donate({value:ethers.utils.parseEther(inputreq)})
    setdonatePending(false)
    setpleasewait(true)
    await donatetrans.wait();
    setpleasewait(false)
    getcamdata()
    }
    catch(e){
        setdonatePending(false)
        console.log(e)
    }

    
}
//#####################################################
  return (

    <HomeWrapper>
{load == true ? <h1>Loading...</h1>:
donatePending==true ?<h1>Please make the payment</h1>:
pleasewait==true?<h1>Please wait...</h1>:
    <>
    <LeftWrapper>
        <Image src={"https://rksfunding.infura-ipfs.io/ipfs/"+camdata.Image} alt='this is image'/>
        <StoryWrapper>
            
            { onlyforstroy  }
        </StoryWrapper>
    </LeftWrapper>
    <RightWrapper>
        <Title> 
        {camdata.title}
        </Title>
        <Send>
           
            <Input type='number' placeholder='Enter the Amount'
            value={inputreq}
            onChange={handelInput}
            name="required_amount"
            ></Input>
            <Button onClick={donatenow}>Donate</Button>
        </Send>
        <Amount>
            <Required>
                <Text>Required Amount</Text>
                <Text> {camdata.reqAmount} Matic</Text>
            </Required>
            <Required>
                <Text>Received Amount</Text>
                <Text> {camdata.recAmount} Matic</Text>
            </Required>
        </Amount>
        <Donation>
        <RecemtTrans>Recent Transsition</RecemtTrans>

        <Transition>
        {camdata.donatedData.map((e)=>{
            return(
            <Trans>

            <Text> {e.donar.slice(0,4)}....{e.donar.slice(39)}</Text>
            <Text> {e.valueDonated} Matic</Text>
            <Text> {new Date(e.time*1000).toLocaleString()}</Text>

            </Trans>
            )
        })
}
        </Transition>
        </Donation>

        {/* <Donation>
        <RecemtTrans>My Recent Transsition</RecemtTrans>
        <Transition>
            <Trans>
            <Text> 222...333</Text>
            <Text> 60 Matic</Text>
            <Text> 22/12/23 23:23:23</Text>

            </Trans>
        </Transition>
        </Donation> */}
    </RightWrapper>
    </>
}
</HomeWrapper>
  )
}






const HomeWrapper=styled.div`
width: 100%;
height: 100%;
margin-top: 30px;
display: flex;
justify-content: space-between;

`
const LeftWrapper=styled.div`
width: 40%;
margin: 20px;

`
const RightWrapper=styled.div`
width: 60%;
height: 100%;
margin: 20px;

`
const Image=styled.img`
width: 95%;
height: 50vh;
border: 2px solid black;
`
const StoryWrapper=styled.div`
margin-top: 30px;
margin-left: 10px;
width: 80%;
height: auto;
`
const Title=styled.div`
width: 100%;
font: bold;
font-size: xx-large

`
const Amount=styled.div`
width: 100%;
display: flex;
margin-top: 20px;
justify-content: space-between;

`
const Required=styled.div`
display: flex;
flex-direction: column;
width: 40%;
height: 15vh;
justify-content: center;
align-items: center;
border-radius: 15px;
border: 2px solid black;
margin-bottom: 20px;
background-color: ${(props)=>props.theme.bgdiv};
font: bolder;
font-size: larger;
`
const Text=styled.div`
font: bolder;
font-weight: 900;
`


const Donation=styled.div`
width: 100%;
display: flex;
flex-direction: column;
margin-top: 20px;

`
const RecemtTrans=styled.div`
width: 100%;
background-color: green;
display: flex;
align-items: center;

`
const Transition=styled.div`
width: 100%;
height: 15vh;
border: 2px solid black;
background-color: ${(props)=>props.theme.bgdiv};

`

const Trans=styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
background-color: ${(props)=>props.theme.bgsub};
padding: 2px;
`

const Input=styled.input`
display: flex;
flex-direction: column;
width: 40%;
height: 10vh;
padding-left: 10px;
justify-content: center;
align-items: center;
border-radius: 15px;
border: 2px solid black;
color: ${(props)=>props.theme.text};
background-color: ${(props)=>props.theme.bgdiv};
/* outline: none;
border:  none; */
font-size: large;
`

const Button=styled.button`

width: 40%;
padding: 15px;
height: 10vh;
border-radius: 15px;
color: ${(props) => props.theme.text};
background-color: #8ee01b;
font-size: larger;
`
const Send=styled.div`
width: 100%;
display: flex;
margin-top: 10px;
justify-content: space-between;
align-items: center;

`

export default Mydonate