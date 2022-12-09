async function main() {
  const contractFactory = await hre.ethers.getContractFactory("MoensNFT"); 
  const nftContract = await contractFactory.deploy(); 
  await nftContract.deployed(); 

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