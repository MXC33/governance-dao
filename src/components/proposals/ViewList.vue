<template>
  <div>
    <div v-if="isLoading">Loading proposals...</div>
    <div v-else>
      <h2>All Proposals</h2>
      <div class="proposal-list">
        <div
          v-for="proposal in proposals"
          :key="proposal.id"
          class="proposal-container"
        >
          <div class="proposal-item">ID: {{ proposal.id }}</div>
          <div class="proposal-item">
            Description: {{ proposal.description }}
          </div>
          <div class="proposal-item">Votes Up: {{ proposal.votesUp }}</div>
          <div class="proposal-item">Votes Down: {{ proposal.votesDown }}</div>
          <div class="proposal-item">Deadline: {{ proposal.deadline }}</div>
          <div class="proposal-item">Approved: {{ proposal.isApproved }}</div>
          <div class="proposal-item">
            Count Conducted: {{ proposal.countConducted }}
          </div>
          <div class="proposal-item">Passed: {{ proposal.passed }}</div>
          <div class="proposal-item">
            <div v-if="calculateTimeLeft(proposal.deadline)">
              Time left:
              {{ calculateTimeLeft(proposal.deadline).hours }} hours,
              {{ calculateTimeLeft(proposal.deadline).minutes }} minutes,
              {{ calculateTimeLeft(proposal.deadline).seconds }} seconds
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  fetchAllProposals,
  listenForProposalUpdates,
} from "../Web3/daoContractService";

export default {
  data() {
    return {
      proposals: [],
      isLoading: false,
      loadError: false,
      contract: null,
    };
  },
  async mounted() {
    try {
      await this.fetchProposals();
      listenForProposalUpdates(async () => {
        await this.fetchProposals();
      });
    } catch (error) {
      console.error(
        "Error setting up contract listeners or fetching proposals:",
        error
      );
      this.loadError = true;
    }
  },

  methods: {
    async fetchProposals() {
      console.log("Starting to fetch proposals.");
      this.isLoading = true;
      this.loadError = false;
      try {
        const { proposals, contract } = await fetchAllProposals();
        console.log("Proposals fetched successfully:", proposals);
        this.proposals = proposals;
        this.contract = contract;
      } catch (error) {
        console.error("Error fetching proposals:", error);
        this.loadError = true;
      } finally {
        this.isLoading = false;
        console.log("Finished fetching proposals, isLoading set to false.");
      }
    },

    calculateTimeLeft(deadlineInSeconds) {
      const now = new Date();
      const deadlineDate = new Date(deadlineInSeconds * 1000); // Use the converted deadline
      console.log(`Now: ${now}, Deadline: ${deadlineDate}`); // Debugging log

      if (deadlineDate > now) {
        const difference = deadlineDate.getTime() - now.getTime();
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      } else {
        return null;
      }
    },
  },
};
</script>

<style>
.proposal-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.proposal-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
}

.proposal-item {
  flex-basis: calc(50% - 1rem);
}

/* Additional styles as needed */
</style>
