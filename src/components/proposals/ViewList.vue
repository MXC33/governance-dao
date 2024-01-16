<template>
  <div>
    <div v-if="proposals.length === 0">No proposals have been made yet.</div>
    <div v-else>
      <!-- Display the list of proposals here -->
      <div v-for="proposal in proposals" :key="proposal.id">
        <!-- Render each proposal details -->
        <p>Proposal ID: {{ proposal.id }}</p>
        <p>Description: {{ proposal.description }}</p>
        <p>Proposer: {{ proposal.proposer }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchAllProposals } from "../Web3/daoContractService";

// Vue component script
export default {
  data() {
    return {
      proposals: [],
      isProviderReady: false,
      // Other data properties
    };
  },
  created() {
    this.checkProvider();
  },
  methods: {
    async checkProvider() {
      if (this.isProviderReady) {
        await this.loadProposals();
      }
    },
    async loadProposals() {
      try {
        const proposals = await fetchAllProposals();
        if (proposals) {
          this.proposals = proposals;
        }
      } catch (error) {
        console.error("Error fetching proposals:", error);
      }
    },
    // Other methods
  },
  watch: {
    // Watch for changes in provider's state
    isProviderReady(newValue) {
      if (newValue) {
        this.loadProposals();
      }
    },
  },
};
</script>
