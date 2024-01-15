import { ethers } from "ethers";

let provider;
let signer;

const connectWallet = async () => {
  if (window.ethereum) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    console.log("Signer initialized:", signer);
  } else {
    throw new Error("Metamask not found");
  }
};

export const isWalletConnected = async () => {
  if (typeof window.ethereum !== "undefined") {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    return accounts.length > 0;
  }
  return false; // Return false if Metamask is not available
};

export { connectWallet, signer, provider };
