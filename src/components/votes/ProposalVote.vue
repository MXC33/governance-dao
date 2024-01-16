<template>
  <form @submit.prevent="submitVote">
    <input
      v-model="proposalId"
      placeholder="Proposal ID"
      :disabled="isLoading"
    />
    <select v-model="vote" :disabled="isLoading">
      <option value="true">Yes</option>
      <option value="false">No</option>
    </select>
    <button type="submit" :disabled="isLoading">Vote</button>
    <div v-if="errorMessage">{{ errorMessage }}</div>
  </form>
</template>

<script>
import { voteOnProposal } from "../Web3/daoContractService";

export default {
  data() {
    return {
      proposalId: "",
      vote: "true", // Default to 'Yes'
      errorMessage: "",
      isLoading: false, // New state for loading indication
    };
  },
  methods: {
    async submitVote() {
      if (!this.isValidProposalId(this.proposalId)) {
        this.errorMessage = "Invalid Proposal ID";
        return;
      }

      try {
        this.isLoading = true; // Start loading
        await voteOnProposal(this.proposalId, this.vote === "true");
        alert("Vote submitted successfully");
        this.isLoading = false; // Stop loading
      } catch (error) {
        console.error("Error submitting vote:", error);
        this.errorMessage = "Failed to submit vote: " + error.message;
        this.isLoading = false; // Stop loading on error
      }
    },
    isValidProposalId(id) {
      // Validate proposal ID
      return !isNaN(parseInt(id)) && isFinite(id);
    },
  },
};
</script>

<style scoped>
/* CSS or UnoCSS styles */
</style>
