<template>
  <div>
    <input v-model="proposalId" placeholder="Proposal ID" />
    <button @click="count">Count Votes</button>
    <div v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { countVotes } from "../Web3/daoContractService";

export default {
  data() {
    return {
      proposalId: "",
      errorMessage: "",
    };
  },
  methods: {
    async count() {
      try {
        await countVotes(this.proposalId);
        alert("Votes counted successfully");
      } catch (error) {
        console.error("Error counting votes:", error);
        this.errorMessage = "Failed to count votes: " + error.message;
      }
    },
  },
};
</script>

<style scoped>
/* CSS or UnoCSS styles */
</style>
