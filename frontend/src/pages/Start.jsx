import React from 'react'
import '../styles/Start.css'

const Start = ({ metamaskInstalled, goerliNetwork }) => {
  return (
    <div className='start-container'>

     <div className='start-heading'>
       <h1>MOENS NFT COLLECTION</h1>
     </div>

     <div className='start-intro'>
       <img src="./vite.svg" />
       <p>Hey there!<br/> Welcome to Moens NFT collection.<br/>Kindly follow the prompts.</p>
     </div>

     <div className='start-prompts'>
       {
           !metamaskInstalled && (
            <p>
                Kindly install Metamask to continue using the application.<br/>
                You can check it out over <a className="metamask-link" href='https://metamask.io/'>here</a>
            </p>
           )
       }
       {
           !goerliNetwork && (
               <p>
                   Kindly switch to goerli network provider. 
                   You can check out the instructions over <a className="metamask-link" href='https://metamask.io/'>here</a>
               </p>
           )
       }
    
     </div>
    
    </div>
  )
}

export default Start