<template lang="pug">
div
  h1 DAO Frontend
  ConnectWallet
  RegisterMember
  ProposalCreation
  approveProposal
  voteOnProposal
  countVotes

  
</template>

<script>
import RegisterMember from "./components/registerMember/RegisterMember.vue";
import ProposalCreation from "./components/proposals/ProposalCreation.vue";
import voteOnProposal from "./components/votes/ProposalVote.vue";
import approveProposal from "./components/approveProposal/ApproveProposal.vue";
import countVotes from "./components/votes/CountVotes.vue";
import ConnectWallet from "./components/ConnectWallet.vue";

export default {
  name: "App",
  components: {
    RegisterMember,
    ProposalCreation,
    voteOnProposal,
    approveProposal,
    countVotes,
    ConnectWallet,
  },
};
</script>

<style scoped>
/* CSS or UnoCSS styles */
</style>
