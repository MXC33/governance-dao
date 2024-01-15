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
    };
  },
  methods: {
    async approve() {
      try {
        await approveProposal(this.proposalId);
        alert("Proposal approved successfully");
      } catch (error) {
        console.error("Error approving proposal:", error);
        this.errorMessage = "Failed to approve proposal: " + error.message;
      }
    },
  },
};
</script>

<style scoped>
/* CSS or UnoCSS styles */
</style>
