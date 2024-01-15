<template>
  <form @submit.prevent="submitVote">
    <input v-model="proposalId" placeholder="Proposal ID" />
    <select v-model="vote">
      <option value="true">Yes</option>
      <option value="false">No</option>
    </select>
    <button type="submit">Vote</button>
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
    };
  },
  methods: {
    async submitVote() {
      try {
        await voteOnProposal(this.proposalId, this.vote === "true");
        alert("Vote submitted successfully");
      } catch (error) {
        console.error("Error submitting vote:", error);
        this.errorMessage = "Failed to submit vote: " + error.message;
      }
    },
  },
};
</script>

<style scoped>
/* CSS or UnoCSS styles */
</style>
