import React from 'react'; 
import '../styles/Nfts.css'; 

const nftData  = [
  {
    name: "Hi by Steve",
    description: "This is me saying hi to you", 
    image: "https://imgur.com/j3CI7VT.png"
  }, 
  {
    name: "SMH by Steve",
    description: "Ah!! Really, was that necessary!", 
    image: "https://imgur.com/ZzGpVtJ.png"
  }, 
  {
    name: "Robot by Steve",
    description: "I am now a robot!", 
    image: "https://i.imgur.com/jgVjdzm.png"
  }
]

const Nfts = () => {
  
  const nftDivs = nftData.map( data => {
                    return (
                      <div className="nft-div"> 
                        <p>{ data.name }</p>
                        <p>{ data.description }</p>
                        <img src={data.image } />
                      </div>
                    )
                  })


  return (
    <div>
      {
        nftDivs
      }
    </div>
  )
}

export default Nfts; 