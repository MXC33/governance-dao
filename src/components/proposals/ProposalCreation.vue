<template lang="pug">
form(@submit.prevent="submitProposal")
  .input-group
    label(for="description") Proposal Description:
    input#description(type="text" v-model="proposalDescription" required)
  .input-group
    label(for="duration") Duration:
    select#duration(v-model="selectedDuration" required)
      option(value="OneMinute") 1 Minute
      option(value="TwentyFourHours") 24 Hours
      option(value="OneWeek") 1 Week
  button(type="submit") Submit Proposal
  div.error(v-if="errorMessage") {{ errorMessage }}
</template>

<script>
import { connectWallet } from "../Web3/blockchainService";
import { createProposal } from "../Web3/daoContractService";

export default {
  data() {
    return {
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
          this.proposalDescription,
          this.selectedDuration
        );
        await createProposal(this.proposalDescription, this.selectedDuration);
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
