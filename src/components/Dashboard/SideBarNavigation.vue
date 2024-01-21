<template>
  <aside class="sidebar-navigation">
    <button @click="$emit('connect-wallet')">Connect Wallet</button>
    <button v-if="!isMember" @click="$emit('register-member')">
      Register as Member
    </button>
    <button @click="emitSelect('ViewList')">Proposal List</button>
    <button @click="emitSelect('CreateProposal')">New Proposal</button>

    <div class="admin-actions">
      <button v-if="isContractCreator" @click="emitSelect('ApproveProposals')">
        Approve Proposals
      </button>
      <button v-if="isContractCreator" @click="emitSelect('CountVotes')">
        Count Votes
      </button>
    </div>
  </aside>
</template>

<script>
export default {
  name: "SidebarNavigation",
  data() {
    return {
      showCountInput: false,
      proposalIdInput: "",
    };
  },
  methods: {
    emitSelect(action) {
      console.log(`Emitting select event for: ${action}`);
      this.$emit("select", action);
    },
    toggleCountInput() {
      this.showCountInput = !this.showCountInput;
      if (!this.showCountInput) {
        // When hiding the input, also emit the count event if an ID is entered
        this.emitCount();
      }
    },
    emitCount() {
      if (this.proposalIdInput) {
        this.$emit("count-votes", this.proposalIdInput);
        this.proposalIdInput = ""; // Reset input after emitting
      }
    },
  },
  props: {
    isMember: Boolean,
    isContractCreator: Boolean,
  },
};
</script>

<style scoped>
.proposal-creation-inputs,
.proposal-actions {
  margin-top: 10px;
}

input[type="text"],
select {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #555;
  border-radius: 4px;
}
.sidebar-navigation {
  background-color: #333;
  color: #fff;
  padding: 20px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #555;
}

select,
button {
  margin-bottom: 8px;
}

.admin-actions {
  margin-top: 20px; /* Adjust the space as needed */
  padding-top: 10px;
  border-top: 1px solid #555; /* Optional visual separator */
}
</style>
