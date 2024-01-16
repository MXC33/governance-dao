import { ethers } from "ethers";

// Initialize variables to hold the provider and signer
let provider;
let signer;

// Replace with your Sepolia RPC URL if you have one, or use a service like Infura
const sepoliaRPC = "https://sepolia.infura.io/v3/your_project_id";

// Function to connect to the user's wallet
const connectWallet = async () => {
  // Check if Ethereum object is injected in the window object
  if (window.ethereum) {
    try {
      // Request account access if needed
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Check if the connected network is Sepolia
      const network = await window.ethereum.request({ method: "net_version" });
      if (network !== "11155111") {
        // 11155111 is the network ID for Sepolia
        console.error("Please connect to the Sepolia Testnet");
        throw new Error("Incorrect network");
      }

      // If connected to Sepolia, create a Web3Provider from the window.ethereum object
      provider = new ethers.providers.Web3Provider(window.ethereum);

      // Get the signer object from the provider to sign transactions
      signer = provider.getSigner();
      console.log("Connected to Sepolia Testnet");
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      throw error;
    }
  } else {
    // If window.ethereum is not found, use the default RPC URL
    console.log(
      "MetaMask is not installed or the browser does not support Ethereum."
    );
    provider = new ethers.providers.JsonRpcProvider(sepoliaRPC);
  }
};

// Function to check if the wallet is connected
export const isWalletConnected = async () => {
  if (provider) {
    try {
      // List accounts the wallet is managing
      const accounts = await provider.listAccounts();
      return accounts.length > 0;
    } catch (error) {
      console.error("Error checking wallet connection:", error);
      return false;
    }
  }
  return false;
};

// Export the connectWallet function, the signer, and the provider
export { connectWallet, signer, provider };
