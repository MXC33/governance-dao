<template>
  <div class="uncounted-proposals-list">
    <div v-if="isLoading" class="loading">Loading...</div>
    <div v-else>
      <h2>Proposals Awaiting Vote Count</h2>
      <ul>
        <li v-for="proposal in uncountedProposals" :key="proposal.id">
          {{ proposal.title }} - {{ proposal.description }}
          <button @click="count(proposal.id)">Count Votes</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { fetchAllProposals, countVotes } from "../Web3/daoContractService";

export default {
  data() {
    return {
      proposals: [],
      isLoading: false,
    };
  },
  computed: {
    uncountedProposals() {
      return this.proposals.filter((p) => !p.countConducted && !p.passed);
    },
  },
  created() {
    this.loadProposals();
  },
  methods: {
    async loadProposals() {
      this.isLoading = true;
      try {
        const { proposals } = await fetchAllProposals();
        this.proposals = proposals;
      } catch (error) {
        console.error("Error fetching proposals:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async count(proposalId) {
      try {
        await countVotes(proposalId);
        alert("Votes counted successfully for proposal " + proposalId);
        this.loadProposals(); // Refresh the list
      } catch (error) {
        console.error("Error counting votes:", error);
        alert("Failed to count votes: " + error.message);
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
