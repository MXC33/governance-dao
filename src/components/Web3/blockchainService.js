import { ethers } from "ethers";

let provider, signer, contract;

const connectWallet = async () => {
  if (window.ethereum) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
  } else {
    throw new Error("Metamask not found");
  }
};

const isWalletConnected = async () => {
  if (typeof window.ethereum !== "undefined") {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    return accounts.length > 0;
  }
  return false; // Return false if Metamask is not available
};

export { connectWallet, isWalletConnected, signer, contract };
