const { utils } = require("ethers");


async function main() {
    const contractFactory = await hre.ethers.getContractFactory("MoensNFTs"); 
    const nftContract = await contractFactory.deploy(); 
    await nftContract.deployed(); 
  
    let txn = await nftContract.mintNft(1, "SMH by Steve", "Oh shake my head!!", "https://imgur.com/ZzGpVtJ", {
    value: utils.parseEther("0.01")
    }); 

    await txn.wait(); 
    
  
    console.log("Contract deployed to: ", nftContract.address); 
  }
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();