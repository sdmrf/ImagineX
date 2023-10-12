// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Imaginex{

    struct Image {
        uint id;
        string imageHash;
    }

    mapping(uint => Image) public images;
    uint public imageCount;

    //Adding a new image
    function addImage(string memory _imageHash) public {
        imageCount++;
        images[imageCount] = Image(imageCount, _imageHash);
    }

    //Removing an image
    function removeImage(uint _id) public {
        delete images[_id];
    }

    // Getting an image
    function getImage(uint _id) public view returns (uint, string memory) {
        return (images[_id].id, images[_id].imageHash);
    }

}