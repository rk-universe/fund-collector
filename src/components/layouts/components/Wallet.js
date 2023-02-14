
import { ethers } from 'ethers';
import React, { useState } from 'react'
import styled from 'styled-components';


const Wallet = () => {
    
    const [addre,setAdd] = useState('');
    const [bal,setbal] = useState('');

  const connectWallet = async ()=>{
    await window.ethereum.request({method:'eth_requestAccounts'})
    const myprovider= new ethers.providers.Web3Provider(window.ethereum,'any')
    const myaccounts=myprovider.getSigner();
    

    const address= await myaccounts.getAddress();
    console.log(address)
    
    const balance=await myaccounts.getBalance();
    console.log(ethers.utils.formatEther(balance))
    setAdd(address);
    setbal(ethers.utils.formatEther(balance))
  }

    return (
      <Outerconnect onClick={connectWallet}>
       {addre == '' ? <ConnectWallet>Connect Wallet</ConnectWallet> : <ConnectWallet>{addre.slice(0,6)}...{addre.slice(38)}</ConnectWallet>}
       {bal == '' ? <Walletbalance></Walletbalance> : <Walletbalance>{bal.slice(0,4)} Matic</Walletbalance>}
       </Outerconnect>
    )
}
const Outerconnect=styled.div`
width: auto;
height: 100%;
background-color: ${(props)=>props.theme.bgdiv};
display: flex;
justify-content: space-between;
border-radius: 10px;
align-items: center;
padding:2px 20px;
position: relative;
left: 100px;


`
const ConnectWallet=styled.h3`
width: auto;
height: 60%;
display: flex;
justify-content: space-between;
border-radius: 10px;
align-items: center;
background-color: ${(props)=>props.theme.bgsub};
padding:10px;
cursor: pointer;
`
const Walletbalance=styled.h3`
margin-left:10px;
`
export default Wallet

