require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); 

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    goerli:{
      url: process.env.QUICKNODE_HTTP_URL, 
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
