// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

import "hardhat/console.sol";

contract MoensNFTs is ERC721 {
    using Counters for Counters.Counter; 
    Counters.Counter private _tokenIds;

    string[] wordsOne = ["Moen#1","Moen#2","Moen#3","Moen#4","Moen#5","Moen#6","Moen#7","Moen#8"]; 
    string[] wordsTwo = ["Steve#1","Steve#2","Steve#3","Steve#4","Steve#5","Steve#6","Steve#7","Steve#8"]; 
    string[] wordsThree = ["Don#1","Don#2","Don#3","Don#4","Don#5","Don#6","Don#7","Don#8"]; 

    constructor() ERC721("MoensNFT", "MFT"){
        console.log("I am about to create some NFTs!!"); 
    }

    function pickRandomFirstWord(uint256 tokenId) public view returns(string memory){
        uint256 randNum = random(string(abi.encodePacked("RANDOM#1", Strings.toString(tokenId)))); 
        randNum = randNum % wordsOne.length; 
        console.log("1st random number is: ", randNum); 
        return wordsOne[randNum];  
    } 

    function pickRandomSecondWord(uint256 tokenId) public view returns(string memory){
        uint256 randNum = random(string(abi.encodePacked("RANDOM#2", Strings.toString(tokenId)))); 
        randNum = randNum % wordsTwo.length; 
        console.log("2nd random number is: ", randNum); 
        return wordsTwo[randNum]; 
    }

    function pickRandomThirdWord(uint256 tokenId) public view returns(string memory){
        uint256 randNum = random(string(abi.encodePacked("RANDOM#3", Strings.toString(tokenId)))); 
        randNum = randNum % wordsThree.length; 
        console.log("3rd random number is: ", randNum); 
        return wordsThree[randNum]; 
    }

    function random(string memory input) internal pure returns(uint256) {
        return uint256(keccak256(abi.encodePacked(input))); 
    }    

    function mintNft() public {
       uint256 itemId = _tokenIds.current(); 
       
       _safeMint(msg.sender, itemId); 

       tokenURI(itemId); 

       _tokenIds.increment();     
    } 

    function tokenURI(uint256 _tokenId) public view override returns (string memory){
       require(_exists(_tokenId)); 
       console.log("An NFT with ID of %s has been minted to %s", _tokenId, msg.sender); 
       return string(
           abi.encodePacked(
               "data:application/json;base64,",
               "ewogICAgIm5hbWUiOiAiTW9lbiMxIiwKICAgICJkZXNjcmlwdGlvbiI6ICJUaGlzIGlzIE1vZW4gTkZUIG51bWJlciAxIiwKICAgICJpbWFnZSI6ICJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSEJ5WlhObGNuWmxRWE53WldOMFVtRjBhVzg5SW5oTmFXNVpUV2x1SUcxbFpYUWlJSFpwWlhkQ2IzZzlJakFnTUNBek5UQWdNelV3SWo0S0lDQWdJRHh6ZEhsc1pUNHVZbUZ6WlNCN0lHWnBiR3c2SUhkb2FYUmxPeUJtYjI1MExXWmhiV2xzZVRvZ2MyVnlhV1k3SUdadmJuUXRjMmw2WlRvZ01UUndlRHNnZlR3dmMzUjViR1UrQ2lBZ0lDQThjbVZqZENCM2FXUjBhRDBpTVRBd0pTSWdhR1ZwWjJoMFBTSXhNREFsSWlCbWFXeHNQU0ppYkdGamF5SWdMejRLSUNBZ0lEeDBaWGgwSUhnOUlqVXdKU0lnZVQwaU5UQWxJaUJqYkdGemN6MGlZbUZ6WlNJZ1pHOXRhVzVoYm5RdFltRnpaV3hwYm1VOUltMXBaR1JzWlNJZ2RHVjRkQzFoYm1Ob2IzSTlJbTFwWkdSc1pTSStUVzlsYmlNeFBDOTBaWGgwUGdvOEwzTjJaejQ9Igp9"
           )
       ); 
    } 
}