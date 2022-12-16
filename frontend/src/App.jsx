import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './styles/App.css'

function App() {
  const [count, setCount] = useState(0); 

  const [walletConnected, setWalletConnected] = useState(false); 

  // Connect wallet
  const connectWallet = async () => {
    console.log("Connecting wallet...")
    try {
      const { ethereum } = window; 

    
      const accounts = await ethereum.request({method: "eth_requestAccounts"}); 

      const chainId = await ethereum.chainId; 

    if(chainId != 5){
      console.log("Kindly switch to metamask!"); 
    }
    
    console.log("Wallet connected successully..."); 
    setWalletConnected(true); 
    return accounts[0]; 
    } catch (error) {
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

  
  // Render Methods
  // const renderNotConnectedContainer = () => (
  //   <button className="cta-button connect-wallet-button" onClick={connectWallet}>
  //     Connect to Wallet
  //   </button>
  // );



  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {
          !walletConnected && (
            <button onClick={connectWallet}>
              Connect wallet
            </button>
          )
        } 
        {
          walletConnected && (
            <button onClick={ () => console.log("Mint an NFT!")}>
              Mint an NFT
            </button>
          )
        }
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
