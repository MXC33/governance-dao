<template>
  <div>
    <input v-model="proposalId" placeholder="Proposal ID" />
    <button @click="approve">Approve Proposal</button>
    <div v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { approveProposal } from "../Web3/daoContractService";

export default {
  data() {
    return {
      proposalId: "",
      errorMessage: "",
      isLoading: false, // New state for loading indication
    };
  },
  methods: {
    async approve() {
      try {
        this.isLoading = true; // Start loading
        await approveProposal(this.proposalId);
        alert("Proposal approved successfully");
        this.isLoading = false; // Stop loading
      } catch (error) {
        console.error("Error approving proposal:", error);
        this.errorMessage = "Failed to approve proposal: " + error.message;
        this.isLoading = false; // Stop loading on error
      }
    },
  },
};
</script>

<style scoped>
/* CSS or UnoCSS styles */
</style>
