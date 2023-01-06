const { utils } = require("ethers");

async function main() {
  const contractFactory = await hre.ethers.getContractFactory("MoensNFTs"); 
  const nftContract = await contractFactory.deploy(); 
  await nftContract.deployed(); 

  let txn = await nftContract.mintNft(0, "Hi by Steve", "This is me saying hi to you", "https://imgur.com/j3CI7VT", {
    value: utils.parseEther("0.01")
  }); 

  await txn.wait();


  let txn2 = await nftContract.mintNft(1, "Hi by Steve", "This is me saying hi to you", "https://imgur.com/j3CI7VT", {
    value: utils.parseEther("0.01")
  }); 

  await txn2.wait();

  let mintedNfts = await nftContract.showMintedNfts(); 
  // txn = await nftContract.mintNft(); 
  // await txn.wait(); 

  await nftContract.showBalance(); 

  console.log("IDs of minted NFTs are: ", mintedNfts); 

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