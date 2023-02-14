
require('@nomicfoundation/hardhat-toolbox');
async function main(){
    console.log("deploying start")
    const CampaignInsance=await hre.ethers.getContractFactory("CampaigFactory");
    const campaignInsance = await CampaignInsance.deploy();
    console.log(campaignInsance)
    await campaignInsance.deployed();
    console.log("contract deployed at ",campaignInsance.address);
}

main()
    .then(()=>{
        process.exit(0);
    })
    .catch((error)=>{
        console.error(error);
        process.exit(1)
    })