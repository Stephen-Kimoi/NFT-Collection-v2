// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

import "hardhat/console.sol";

abstract contract MoensNFT is ERC721 {
    using Counters for Counters.Counter; 
    Counters.Counter private _tokenIds;

    constructor() ERC721("MoensNFT", "MFT"){
        console.log("I am about to create some NFTs!!"); 
    }

    function mintNft() public {
       uint256 itemId = _tokenIds.current(); 
       
       _safeMint(msg.sender, itemId); 

       tokenURI(itemId); 

       _tokenIds.increment(); 

       console.log("An NFT with ID of %s has been minted to %s", itemId, msg.sender); 
       
    } 

    function tokenURI(uint256 _tokenId) public view override returns (string memory){
       require(_exists(_tokenId)); 
       return " https://jsonkeeper.com/b/LGJK"; 
    } 
}