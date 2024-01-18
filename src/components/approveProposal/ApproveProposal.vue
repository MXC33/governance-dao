<template>
  <div class="container">
    <div v-if="isLoading" class="loading">Loading proposals...</div>
    <div v-else>
      <h2 class="title">Proposals Awaiting Approval</h2>
      <div class="proposal-list">
        <div
          v-for="proposal in proposalsAwaitingApproval"
          :key="proposal.id"
          class="proposal-container"
        >
          <div class="proposal-item proposal-description">
            <strong>Title:</strong> {{ proposal.title }}
            <strong>Description:</strong> {{ proposal.description }}
          </div>
          <div class="proposal-item proposal-metadata">
            <div><strong>ID:</strong> {{ proposal.id }}</div>
            <div>
              <strong>Deadline:</strong>
              {{ new Date(proposal.deadline * 1000).toLocaleString() }}
            </div>
            <!-- Add additional metadata here if needed -->
          </div>
          <button @click="approve(proposal.id)" class="vote-button">
            Approve
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchAllProposals, approveProposal } from "../Web3/daoContractService";

export default {
  data() {
    return {
      proposals: [],
      proposalsAwaitingApproval: [],
      isLoading: false,
      errorMessage: "",
    };
  },
  async created() {
    await this.fetchProposalsAwaitingApproval();
  },
  methods: {
    async fetchProposalsAwaitingApproval() {
      this.isLoading = true;
      try {
        const response = await fetchAllProposals();
        this.proposals = response.proposals;
        this.proposalsAwaitingApproval = this.proposals.filter(
          (p) => !p.isApproved && !p.countConducted
        );
      } catch (error) {
        console.error("Error fetching proposals:", error);
        this.errorMessage = "Failed to load proposals: " + error.message;
      } finally {
        this.isLoading = false;
      }
    },
    async approve(proposalId) {
      try {
        this.isLoading = true;
        await approveProposal(proposalId); // Calls the function from the service
        alert("Proposal approved successfully");
        // Optionally, remove the approved proposal from the list
        this.proposalsAwaitingApproval = this.proposalsAwaitingApproval.filter(
          (p) => p.id !== proposalId
        );
      } catch (error) {
        console.error("Error approving proposal:", error);
        this.errorMessage = "Failed to approve proposal: " + error.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
/* You can use the styles from ViewList.vue or add modifications as needed */
</style>
