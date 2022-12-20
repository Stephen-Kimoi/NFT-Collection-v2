import React from 'react'
import '../styles/Start.css'

const Start = (props) => {
  return (
    <div className='start-container'>

     <div className='start-heading'>
       <h1>MOENS NFT COLLECTION</h1>
     </div>

     <div className='start-intro'>
       <img src="./intro.png" />
       <p>Hey there!<br/> Welcome to Moens NFT collection.<br/>Kindly follow the prompts.</p>
     </div>

     {
        props.metamaskInstalled === true && props.goerliNetwork === true ? (
        <button className="button-connect" onClick={props.connectWallet}>
          Connect wallet
        </button>
        ) : 
        <div className='start-prompts'>
            {
                !props.metamaskInstalled && (
                  <p>
                      Kindly install Metamask to continue using the application.<br/>
                      You can check it out over <a className="metamask-link" target="blank" href='https://metamask.io/'>here</a>
                  </p>
                )
            }
            {
                !props.goerliNetwork && (
                    <p>
                        Kindly switch to goerli network provider to continue using the application. 
                        You can check out the instructions over <a className="metamask-link" target="blank" href='https://blog.cryptostars.is/goerli-g%C3%B6rli-testnet-network-to-metamask-and-receiving-test-ethereum-in-less-than-2-min-de13e6fe5677#:~:text=Step%201%3A%20Log%20in%20to%20your%20Metamask%20wallet%20and%20click%20on%20the%20dropdown%20of%20networks%3A'>here</a>
                    </p>
                )
            }
        </div>
     }
    
    </div>
  )
}

export default Start