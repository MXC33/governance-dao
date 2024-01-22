<template lang="pug">
//- PageStyle
DashboardLayout
  SideBarNavigation


  
</template>

<script>
import RegisterMember from "./components/registerMember/RegisterMember.vue";
import voteOnProposal from "./components/votes/ProposalVote.vue";
import approveProposal from "./components/approveProposal/ApproveProposal.vue";
import countVotes from "./components/votes/CountVotes.vue";
import ConnectWallet from "./components/ConnectWallet.vue";
import DashboardLayout from "./components/Dashboard/DashboardLayout.vue";
import SideBarNavigation from "./components/Dashboard/SideBarNavigation.vue";
import PageStyle from "./style/PageStyle.vue";
export default {
  name: "App",
  components: {
    PageStyle,
    DashboardLayout,
    SideBarNavigation,
    RegisterMember,
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
