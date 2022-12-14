// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import { Base64 } from "./libraries/Base64.sol";

import "hardhat/console.sol";

contract MoensNFTs is ERC721URIStorage {
    using Counters for Counters.Counter; 
    Counters.Counter private _tokenIds;

    string baseSvg = "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

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

       string memory first = pickRandomFirstWord(itemId);
       string memory second = pickRandomSecondWord(itemId);
       string memory third = pickRandomThirdWord(itemId);
       string memory combinedWord = string(abi.encodePacked(first, second, third)); 

       string memory finalSvg = string(abi.encodePacked(baseSvg, first, second, third, "</text></svg>")); 
      
        // Encoding all JSON metadata in Base 64
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        combinedWord,
                        '", "description": "A highly acclaimed collection of squares.", "image": "data:image/svg+xml;base64,',
                        Base64.encode(bytes(finalSvg)),
                        '"}'
                    )
                )
            )
        );
        
       // Prepending all json data to data:application/json;base64
       string memory finalTokenURI = string(
           abi.encodePacked("data:application/json;base64,", json)
       ); 

       console.log("\n------------------------------");
       console.log(finalTokenURI); 
       console.log("-------------------------------\n"); 
       
       _safeMint(msg.sender, itemId); 

       _setTokenURI(itemId, finalTokenURI);

       _tokenIds.increment();     
       console.log("An NFT w/ ID %s has been minted to %s", itemId, msg.sender);
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