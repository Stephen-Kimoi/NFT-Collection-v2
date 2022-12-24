import React from 'react';
import '../styles/Loading.css'
import { InfinitySpin, ColorRing, MutatingDots, MagnifyingGlass  } from 'react-loader-spinner';

const Loading = (props) => {
  return (
    <div className="loading-container">
      <div className="loading-modal">
        {
            props.patience && (
              <div className="patience-text">
                <p>Kindly be patient 🙂 this may take a few minutes</p>
                <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />
              </div>
            )
        }
        {
            props.mintingNft && (
              <div className="minting-text">
                <p>Minting an NFT 😛</p>
                <InfinitySpin 
                    width='200'
                    color="#4fa94d"
                />
              </div>
            )
        }
        {
            props.almost && (
                <div className="almost-text">
                  <p>Almost there 🤩</p>
                  <MagnifyingGlass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="MagnifyingGlass-loading"
                    wrapperStyle={{}}
                    wrapperClass="MagnifyingGlass-wrapper"
                    glassColor = '#c0efff'
                    color = '#e15b64'
                    />
                </div>
            )
        }
        {
            props.success && (
              <div className="success-text">
                <p>NFT minted successfully 🥳</p>
                <a href={`${props.openseaLink}`} target="_blank">View your NFT on opensea</a><br/>
                <button onClick={props.goBack}>Go back</button>
              </div>
            )
        }
        {
            props.error && (
              <div className="error-text">
                <p>Opps! An error occured 😕 <br/> Try again in a few minutes</p>
                <button onClick={props.goBack}>Go back</button>
              </div>
            )
        }
        {
            props.connectingWallet && (
                <div className="wallet-text">
                  <p>Connecting your wallet 🫣</p>
                  <MutatingDots 
                    height="100"
                    width="100"
                    color="#4fa94d"
                    secondaryColor= '#4fa94d'
                    radius='12.5'
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{"align-items": "center"}}
                    wrapperClass=""
                    visible={true}
                    />
                </div>
            )
        }
      </div>
    </div>
  );
};

export default Loading;
