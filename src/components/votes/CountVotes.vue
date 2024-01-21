<template>
  <div>
    <button @click="count" :disabled="isCounting || !proposalId">
      Count Votes
    </button>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { countVotes, getProposal } from "../Web3/daoContractService";

export default {
  props: {
    // Accept proposalId from the parent component
    proposalId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      errorMessage: "",
      isCounting: false,
    };
  },
  methods: {
    async count() {
      this.errorMessage = "";
      // No need to check if proposalId is empty since it's required via props
      try {
        this.isCounting = true;
        const proposal = await getProposal(this.proposalId);
        const nowInSeconds = Math.floor(Date.now() / 1000);

        if (proposal.deadline > nowInSeconds) {
          throw new Error("Voting period has not ended yet.");
        }

        if (proposal.countConducted) {
          throw new Error("Votes have already been counted for this proposal.");
        }

        await countVotes(this.proposalId);
        alert("Votes counted successfully");
      } catch (error) {
        console.error("Error counting votes:", error);
        this.errorMessage = "Failed to count votes: " + error.message;
      } finally {
        this.isCounting = false;
      }
    },
  },
};
</script>

<style scoped>
.error-message {
  color: red;
}
</style>
