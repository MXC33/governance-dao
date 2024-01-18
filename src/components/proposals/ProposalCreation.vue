<template lang="pug">
form(@submit.prevent="submitProposal")
  .input-group
    label(for="title") Proposal Title:
    input#title(type="text" v-model="proposalTitle" required)
  .input-group
    label(for="description") Proposal Description:
    input#description(type="text" v-model="proposalDescription" required)
  .input-group
    label(for="duration") Duration:
    select#duration(v-model="selectedDuration" required)
      option(value="OneMinute") 1 Minute
      option(value="TwoMinutes") 2 minutes
      option(value="FiveMinutes") 5 minutes
  button(type="submit") Submit Proposal
  div.error(v-if="errorMessage") {{ errorMessage }}
</template>

<script>
import { connectWallet } from "../Web3/blockchainService";
import { createProposal } from "../Web3/daoContractService";

export default {
  data() {
    return {
      proposalTitle: "",
      proposalDescription: "",
      selectedDuration: "OneMinute",
      errorMessage: "",
    };
  },
  methods: {
    async submitProposal() {
      try {
        await connectWallet();
        console.log(
          "Submitting proposal:",
          this.proposalTitle,
          this.proposalDescription,
          this.selectedDuration
        );
        await createProposal(
          this.proposalTitle,
          this.proposalDescription,
          this.selectedDuration
        );
        // Handle successful proposal submission
        console.log("Proposal submitted successfully");
      } catch (error) {
        console.error("Error submitting proposal:", error);
        this.errorMessage = "Failed to create proposal: " + error.message;
      }
    },
  },
};
</script>

<style scoped>
/* CSS or UnoCSS styles */
.error {
  color: red;
}
</style>
