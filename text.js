
require('dotenv').config()
const {ethers} = require('ethers')
const CampaignFactory=require("./artifacts/contracts/donate.sol//Campaign.json")

const main = async()=>{
    // const myprovider= new ethers.providers.JsonRpcProvider(
    //     process.env.NEXT_PUBLIC_RPC_URL
    // )
    
    // const mycontract= new ethers.Contract( 
    //     '0x39d762bFf030621Bce2C13BDA57A57601855890D',
    //     CampaignFactory.abi, 
    //      myprovider )

    //     const getDeployedContracts=mycontract.filters.createdCampaign()
    //     const events=await mycontract.queryFilter(getDeployedContracts)
    //     console.log(events)
    
    try{
        
    await window.ethereum.request({method:'eth_requestAccounts'})
    const myprovider= new ethers.providers.Web3Provider(window.ethereum)
    const myaccounts=myprovider.getSigner();

    const mycontract= new ethers.Contract( 
        '0x5B8d0677fb36B04596a10Eecbe4ce6A7ba5ed4b7',
        CampaignFactory.abi, 
        myaccounts )

       

    const getDeployedContracts = await mycontract.donate({value:ethers.utils.parseEther(2)})
       //  const events=await mycontract.queryFilter(getDeployedContracts 
       await getDeployedContracts.wait()
        console.log(getDeployedContracts)
   
}
catch(e){
    console.log(e)
}
}

main();

// 0x08C35d33009cF785cfb730729C291a75Cc221628  -real address
// 0x5B8d0677fb36B04596a10Eecbe4ce6A7ba5ed4b7  - addrss from url