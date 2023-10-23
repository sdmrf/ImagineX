import Web3 from "web3";
import imaginex from "../artifacts/contracts/imaginex.sol/Imaginex.json";
import { create } from "ipfs-http-client";

// Variables
const apiKey = import.meta.env.VITE_API_KEY;
const apiKeySecret = import.meta.env.VITE_API_KEY_SECRET;
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractABI = imaginex.abi;


// IPFS
const authorization = "Basic " + btoa(apiKey + ":" + apiKeySecret);
export const ipfs = create({
  url: "https://ipfs.infura.io:5001/api/v0",
  headers: {
    authorization,
  },
});

// Function to upload an image to IPFS
export const uploadImageToIPFS = async (file) => {
    try {
        const result = await ipfs.add(file);
        return result.path;
    } catch (error) {
        console.error('Error uploading to IPFS:', error);
        throw error;
    }
};


// Initialize Web3
const initializeWeb3 = () => {
  if (window.ethereum) {
    return new Web3(window.ethereum);
  } else {
    throw new Error("Install Metamask");
  }
};

// Check if wallet is connected
export const checkWallet = async () => {
  try {
    const web3 = initializeWeb3();
    return web3.currentProvider ? true : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Connect Wallet
export const connectWallet = async () => {
  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    return accounts[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Get Contract
export const getContract = () => {
  const web3 = initializeWeb3();
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  return contract;
};
