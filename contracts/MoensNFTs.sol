// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol"; 
import "hardhat/console.sol";
import { Base64 } from "./libraries/Base64.sol"; 


contract MoensNFTs is ERC721URIStorage, IERC721Enumerable {
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
       } else if (_tokenId == 5) {
           json = "https://jsonkeeper.com/b/QYU0"; 
       } else if (_tokenId == 6) {
           json = "https://jsonkeeper.com/b/R196"; 
       } else if (_tokenId == 7) {
           json = "https://jsonkeeper.com/b/C0OD"; 
       } else if (_tokenId == 8) {
           json = "https://jsonkeeper.com/b/LOGZ"; 
       } else if (_tokenId == 9) {
           json = " https://jsonkeeper.com/b/EXP5"; 
       } else if (_tokenId == 10) {
           json = "https://jsonkeeper.com/b/KBGO"; 
       } else if (_tokenId == 11) {
           json = "https://jsonkeeper.com/b/1N8H"; 
       } else if (_tokenId == 12) {
           json = "https://jsonkeeper.com/b/5QN4"; 
       } else if (_tokenId == 13) {
           json = "https://jsonkeeper.com/b/6BNZ"; 
       } else if (_tokenId == 14) {
           json = "https://jsonkeeper.com/b/K5GD"; 
       } else if (_tokenId == 15) {
           json = "https://jsonkeeper.com/b/3OWB"; 
       } else if (_tokenId == 16) {
           json = "https://jsonkeeper.com/b/GO18"; 
       }else if (_tokenId == 17) {
           json = "https://jsonkeeper.com/b/TK89"; 
       }else if (_tokenId == 18) {
           json = "https://jsonkeeper.com/b/TTZF"; 
       }else if (_tokenId == 19) {
           json = "https://jsonkeeper.com/b/UMNB";  
       } else if (_tokenId == 20) {
           json = "https://jsonkeeper.com/b/A3JK"; 
       } else if (_tokenId == 21) {
           json = "https://jsonkeeper.com/b/2CRQ"; 
       }

       console.log("An NFT with ID of %s has been minted to %s", _tokenId, msg.sender); 

       return json;  
    }   
}