<template>
  <aside class="sidebar-navigation">
    <button @click="$emit('connect-wallet')">Connect Wallet</button>
    <button v-if="!isMember" @click="$emit('register-member')">
      Register as Member
    </button>
    <button @click="emitSelect('ViewList')">Proposal List</button>
    <button @click="emitSelect('CreateProposal')">New Proposal</button>

    <div class="proposal-actions">
      <button @click="$emit('select', 'ApproveProposals')">
        Approve Proposals
      </button>

      <button @click="emitSelect('Vote')">Vote</button>
      <button @click="emitSelect('CountVotes')">Count Votes</button>
    </div>
  </aside>
</template>

<script>
export default {
  name: "SidebarNavigation",
  methods: {
    emitSelect(action) {
      console.log(`Emitting select event for: ${action}`);
      this.$emit("select", action);
    },
  },
  props: {
    isMember: Boolean,
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
</style>
