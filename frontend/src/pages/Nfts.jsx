import React, { useEffect, useState } from 'react'; 
import { data } from '../assets/Data/Data';
import '../styles/Nfts.css'; 



const Nfts = (props) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1); 
  
   
  const handleMouseEnter = (index) => {
    setHoveredIndex(index); 
  }

  const handleMouseLeave = () => {
    setHoveredIndex(-1); 
  }

  const nftDiv = data.map( one => {
    const isMinted = props.mintedNfts.includes(one.id);
    return (
      <div 
        className='nft-div' 
        onMouseEnter={() => handleMouseEnter(one.id)} 
        onMouseLeave={handleMouseLeave}
      >
        <img className='nft-image' src={one.image} /> 
        <p>{one.name}</p>
        { 
          hoveredIndex === one.id ? (
            <div>
              { isMinted && (<div className='minted'>MINTED</div>)}
              <div>
                <div className='hover-div'>
                  <p>Price: 0.01 Ether</p>
                  <button onClick={() => props.mintNft(one.id)} className="mint-button">Mint Nft</button>
                </div>
              </div>
            </div>
          ) : null 
        }
       </div>
    )
  })


  return (
    <div className='nft-data'> 
      {
        nftDiv
      }
    </div>
  )
}

export default Nfts; 