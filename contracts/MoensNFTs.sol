// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import { Base64 } from "./libraries/Base64.sol"; 


contract MoensNFTs is ERC721URIStorage {
    using Counters for Counters.Counter; 
    Counters.Counter private _tokenIds;
    uint256 public _price = 0.01 ether; 

    constructor() ERC721("MoensNFT", "MFT"){
        console.log("I am about to create some NFTs!!"); 
    }

    function mintNft(uint256 id, string memory name, string memory description, string memory image) public payable {
       // uint256 itemId = _tokenIds.current();

       uint256 itemId = id;  


       require(msg.value >= _price, "Insufficient amount of Ether! Kindly top up.");  

       string memory json = Base64.encode(
           bytes(
               string(
                   abi.encodePacked(
                       '{"name": "',name,
                        '", "description": "',description,
                        '", "image": "', Base64.encode(bytes(image)),
                        // Base64.encode(bytes(finalSvg)),
                        '"}'
                   )
               )
           )
       ); 

       string memory finalTokenURI = string(
           abi.encodePacked("data:application/json;base64,", json)
       ); 

       console.log("Final token URI is: ", finalTokenURI); 
       
       _safeMint(msg.sender, itemId); 

       tokenURI(itemId); 

       _setTokenURI(itemId, finalTokenURI); 

       _tokenIds.increment();     
    } 

    function tokenURI(uint256 _tokenId) public view override returns (string memory){
       require(_exists(_tokenId));  

       string memory json; 

       if (_tokenId == 0 ) {
          json = "https://www.jsonkeeper.com/b/23TS"; 
       } else if (_tokenId == 1 ) {
          json = "https://www.jsonkeeper.com/b/7E87"; 
       } else if (_tokenId == 2 ) {
          json = "https://www.jsonkeeper.com/b/HG7W"; 
       } else if (_tokenId == 3) {
           json = "https://www.jsonkeeper.com/b/X7VS"; 
       } else if (_tokenId == 4) {
           json = "https://www.jsonkeeper.com/b/C7OS"; 
       } 

       console.log("An NFT with ID of %s has been minted to %s", _tokenId, msg.sender); 

       return json;  
    }   
}