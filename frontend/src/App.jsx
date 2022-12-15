import './styles/App.css';
// import twitterLogo from './assets/twitter-logo.svg';
import React from "react";
import { useState } from 'react';

// Constants
const TWITTER_HANDLE = 'stevekimoi';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = '';
const TOTAL_MINT_COUNT = 50;

const App = () => {
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
  // Render Methods
  const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button" onClick={connectWallet}>
      Connect to Wallet
    </button>
  );

  return (
    <div className="App">
      <div className="container">football
        <div className="header-container">
          <p className="header gradient-text">My NFT Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          {renderNotConnectedContainer()}
        </div>
        <div className="footer-container">
          {/* <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} /> */}
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;