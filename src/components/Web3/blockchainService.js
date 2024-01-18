import { ethers } from "ethers";

let provider;
let signer;

const sepoliaRPC = "https://sepolia.infura.io/v3/your_project_id";

const connectWallet = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const network = await window.ethereum.request({ method: "net_version" });
      if (network !== "11155111") {
        console.error("Please connect to the Sepolia Testnet");
        throw new Error("Incorrect network");
      }
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      console.log("Connected to Sepolia Testnet");
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      throw error;
    }
  } else {
    console.log(
      "MetaMask is not installed or the browser does not support Ethereum."
    );
    provider = new ethers.providers.JsonRpcProvider(sepoliaRPC);
  }
};

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
