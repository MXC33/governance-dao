<template>
  <div class="container">
    <div v-if="isLoading" class="loading">Loading proposals...</div>
    <div v-else>
      <h2 class="title">All Proposals</h2>
      <div class="proposal-list">
        <div
          v-for="proposal in proposals"
          :key="proposal.id"
          class="proposal-container"
        >
          <div class="proposal-item proposal-description">
            <div><strong>Title:</strong> {{ proposal.title }}</div>
            <strong>Description:</strong> {{ proposal.description }}
          </div>
          <div class="proposal-item proposal-metadata">
            <div><strong>ID:</strong> {{ proposal.id }}</div>
            <div><strong>Votes Up:</strong> {{ proposal.votesUp }}</div>
            <div><strong>Votes Down:</strong> {{ proposal.votesDown }}</div>
            <div><strong>Deadline:</strong> {{ proposal.deadline }}</div>
            <div><strong>Approved:</strong> {{ proposal.isApproved }}</div>
            <div>
              <strong>Count Conducted:</strong> {{ proposal.countConducted }}
            </div>
            <div><strong>Passed:</strong> {{ proposal.passed }}</div>
            <div v-if="calculateTimeLeft(proposal.deadline)" class="time-left">
              <strong>Time left:</strong>
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
      this.isLoading = true;
      try {
        const { proposals } = await fetchAllProposals();
        this.proposals = proposals;
      } catch (error) {
        console.error("Error fetching proposals:", error);
        // Handle the error appropriately
      } finally {
        this.isLoading = false;
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
/* Overall Component Styling */
.proposal-list {
  background-color: #1c1c1e; /* Dark background */
  color: #fff; /* Light text for contrast */
  font-family: Arial, sans-serif; /* Modern, readable font */
}

/* Proposal Container Styling */
.proposal-container {
  border: 1px solid #ffffff66; /* Semi-transparent white border */
  padding: 16px;
  border-radius: 8px; /* Rounded corners */
  background-color: #2c2c2e; /* Slightly lighter dark background for the proposal */
}

/* Proposal Item Styling */
.proposal-item {
  flex-basis: 100%; /* Make each item take full width */
  margin-bottom: 8px; /* Space between items */
}

/* Proposal Description Styling */
.proposal-description {
  font-size: 1.1rem; /* Slightly larger font for description */
  font-weight: bold; /* Bold font for emphasis */
  color: #0a84ff; /* A bright color for important info like description */
}

/* Proposal Metadata Styling */
.proposal-metadata {
  color: #8e8e93; /* Grey color for less important metadata */
  font-size: 0.9rem; /* Smaller font size for metadata */
}

/* Proposal Voting Button Styling */
.vote-button {
  padding: 8px 16px; /* Padding for buttons */
  font-weight: bold; /* Bold font for button text */
  color: #fff; /* White text color for buttons */
  border: none; /* No border for buttons */
  border-radius: 14px; /* Rounded corners for buttons */
  margin-right: 8px; /* Margin between buttons */
  cursor: pointer; /* Cursor pointer to indicate clickable */
}

.vote-yes {
  background-color: #30d158; /* Green background for 'Vote Yes' */
}

.vote-no {
  background-color: #ff3b30; /* Red background for 'Vote No' */
}

/* Loading and Error Styling */
.loading,
.error {
  color: #ff9f0a; /* Orange color for loading/error messages */
  font-size: 1.2rem; /* Larger font for visibility */
}
</style>
