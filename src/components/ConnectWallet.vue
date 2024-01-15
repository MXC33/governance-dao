<template>
  <div>
    <button @click="connectToWallet">Connect Wallet</button>
    <div v-if="connectedAddress">Connected: {{ connectedAddress }}</div>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { connectWallet } from "./Web3/blockchainService.js";

export default {
  data() {
    return {
      connectedAddress: "",
      errorMessage: "",
    };
  },
  methods: {
    async connectToWallet() {
      try {
        await connectWallet();
        this.connectedAddress = await this.getCurrentAddress();
      } catch (error) {
        console.error("Wallet connection failed:", error);
        this.errorMessage = error.message;
      }
    },
    async getCurrentAddress() {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        return accounts[0] || "";
      }
      return "";
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
