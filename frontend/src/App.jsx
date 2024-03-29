import { useEffect, useState } from 'react'
import { ethers } from "ethers";
import './styles/App.css'
import { contractAbi, contractAddress } from '../constants'; 
import Nfts from './pages/Nfts';
import Start from './pages/Start';
import Loading from './pages/Loading';

function App() {
  const [openseaLink, setOpenseaLink] = useState("");  
  const [walletConnected, setWalletConnected] = useState(false); 
  const [metamaskInstalled, setMetamaskInstalled] = useState(false);
  const [goerliNetwork, setGoerliNetwork] = useState(true); 
  const [isLoading, setIsLoading] = useState(false);
  const [mintingNft, setMintingNft] = useState(false); 
  const [patience, setPatience] = useState(false); 
  const [almost, setAlmost] = useState(false); 
  const [success, setSuccess] = useState(false); 
  const [error, setError] = useState(false); 
  const [connectingWallet, setConnectingWallet] = useState(false); 
  const [mintedNfts, setMintedNfts] = useState([]);


  // Connect wallet
  const connectWallet = async () => {
    setIsLoading(true); 
    setConnectingWallet(true); 
    console.log("Connecting wallet...")
    try {

      const { ethereum } = window;  
    
      const accounts = await ethereum.request({method: "eth_requestAccounts"}); 
      
      getMintedNfts(); 

      console.log("Wallet connected successully..."); 
      setWalletConnected(true); 
      setConnectingWallet(false); 

      setIsLoading(false); 

      return accounts[0]; 

    } catch (error) {
      setError(true)
      setIsLoading(false); 
      console.error(error); 
    }
    
  }

  const getProviderOrSigner = async (needSigner) => {
    const { ethereum } = window; 
    
    let signer; 
    let provider; 

    if(ethereum) {
      provider = new ethers.providers.Web3Provider(ethereum); 

      if(needSigner){
        signer = provider.getSigner(); 
        return signer; 
      } else {
        return provider; 
      }
    }
  }

  async function mintNft(id) {
    setIsLoading(true)
    setMintingNft(true)
    console.log("Minting an nft...")

    try {
      const signer = await getProviderOrSigner(true); 

      const nftContract = new ethers.Contract(contractAddress, contractAbi, signer); 
      
      setMintingNft(false); 
      setPatience(true); 
      console.log("Be patient, this may take a while.."); 

      const event = await nftContract.emit("Transfer")

      console.log("The event is: ", event); 

      const txn = await nftContract.mintNft(id, "Hi by Steve", "This is me saying hi", "https://imgur.com/j3CI7VT.png",{
        value: ethers.utils.parseEther("0.01")
      }); 
      
      setPatience(false); 
      setAlmost(true); 
      console.log("Almost there..."); 

      await txn.wait(); 

      getMintedNfts(); 
      
      setAlmost(false); 
      setSuccess(true); 
      console.log("NFT minted successfully!"); 

      setOpenseaLink(`https://testnets.opensea.io/assets/goerli/${contractAddress}/${id}`);

      return openseaLink; 
    } catch(error) { 
      setPatience(false); 
      setError(true); 
      console.log("Sorry transaction failed...")
      console.error(error); 
    }

  } 

  const goBack = () => {
    setIsLoading(false); 
    setSuccess(false); 
    setError(false); 
  }

  async function getMintedNfts() {
    try {
      const signer = await getProviderOrSigner(true); 

      const nftContract = new ethers.Contract(contractAddress, contractAbi, signer); 

      const mintedNfts = await nftContract.showMintedNfts(); 

      for(let i = 0; i < mintedNfts.length; i++){
        const number = Number(mintedNfts[i])
        setMintedNfts(prevMintedNfts => [...prevMintedNfts, number])
        // console.log(`Minted NFT ${i} is: `, number)
      }

      // const number1 = Number(mintedNfts[0]); 
      // const number2 = Number(mintedNfts[1]); 
      // const number3 = Number(mintedNfts[2]); 
      // const number4 = Number(mintedNfts[3]); 
      // const number5 = Number(mintedNfts[4]); 

      // console.log("Number1 is: ", number1); 
      // console.log("Number2 is: ", number2); 
      // console.log("Number3 is: ", number3); 
      // console.log("Number4 is: ", number4); 
      // console.log("Number5 is: ", number5); 

    } catch (error) {
      console.error(error); 
    }
  }



  useEffect( () => {

    async function checkProviders() {
      const { ethereum } = window;  

      if(ethereum) {
        setMetamaskInstalled(true); 
      }
  
      const chainId = await ethereum.chainId; 
  
      if(chainId != 5){
        setGoerliNetwork(false); 
        console.log("Kindly switch to goerli!"); 
      }
    }
    
    checkProviders(); 
    // getAllNfts(); 

  }, [])


  return (
    <div className="app-container">
      { 
        isLoading && ( 
          <Loading 
            mintingNft={mintingNft}
            success={success}
            error={error}
            patience={patience} 
            almost={almost}
            connectingWallet={connectingWallet}
            openseaLink={openseaLink}
            goBack={goBack}
          />
        )
      }

      {
        !walletConnected ? (
          <Start walletConnected={walletConnected} connectWallet={connectWallet} metamaskInstalled={metamaskInstalled} goerliNetwork={goerliNetwork}/> 
        ) : 
        <div className='app-heading'>
          <h2>MOENS NFT COLLECTION</h2>
          <p>Hover on the NFT to check its price and mint it!</p>
        </div>
      }


      <div className="app-nfts">
        {
          walletConnected && (
            <Nfts 
              mintedNfts={mintedNfts}
              mintNft={mintNft}
              /> 
          )
        }
      
        
      </div>
    </div>
  )
}

export default App
