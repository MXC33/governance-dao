<template lang="pug">
form(@submit.prevent="submitProposal" class="proposal-form")
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
      option(value="TwoMinutes") 2 Minutes
      option(value="FiveMinutes") 5 Minutes
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
.proposal-form {
  background-color: #2c2c2e;
  padding: 20px;
  border-radius: 8px;
  color: #fff;
}

.input-group {
  margin-bottom: 15px;
}

input[type="text"],
select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #555;
  background-color: #3c3c3e;
  color: white;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #30d158;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #28a745;
}

.error {
  color: #ff3b30;
  margin-top: 10px;
}
</style>
