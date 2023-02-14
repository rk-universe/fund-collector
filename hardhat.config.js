

require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config({path: './.env'})

/** @type import('hardhat/config').HardhatUserConfig */

task('accounts','this will display all the account in our wallet',async (taskArgs,hre)=>{
  const accounts=await hre.ethers.getSigners();
  for(const account of accounts)
  {
    console.log(account.address)
  }
})

const privatekeys=process.env.NEXT_PUBLIC_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.17",
  defaultNetwork:'polygon',
  networks:{
    hardhat:{},
    polygon:{
      url:process.env.NEXT_PUBLIC_RPC_URL,
      accounts:[privatekeys]
    }
  }
};
