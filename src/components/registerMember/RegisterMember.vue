<template>
  <div>
    <button @click="registerMember">Register as Member</button>
    <div v-if="showWelcomePopup">Welcome to the DAO!</div>
    <!-- Other UI elements -->
  </div>
</template>

<script>
import { registerMember } from "../Web3/daoContractService";
import { connectWallet } from "../Web3/blockchainService";

export default {
  data() {
    return {
      showWelcomePopup: false,
    };
  },
  methods: {
    async registerMember() {
      try {
        await connectWallet();
        await registerMember();
        this.showWelcomePopup = true;
        setTimeout(() => (this.showWelcomePopup = false), 3000);
      } catch (error) {
        console.error("Registration failed:", error);
      }
    },
  },
};
</script>

<style scoped>
/* CSS or UnoCSS styles */
</style>
