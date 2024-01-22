<template lang="pug">
.dashboard-layout
  SidebarNavigation(
    @connect-wallet="connectToWallet"
    @register-member="registerMember"
    @select="handleComponentSelection"
    :is-member="isMember"
    :is-contract-creator="isContractCreator"
  )
  section.dashboard-content
    div(v-if="isConnected" class="connection-status") You are connected with address: {{ connectedAddress }}
    div(v-if="connectionError" class="connection-status error") Failed to connect: {{ connectionError }}
    div(v-if="registrationSuccess" class="connection-status") Registration successful!
    component(:is="currentComponent")
</template>

<script>
import { markRaw } from "vue";
import SidebarNavigation from "./SideBarNavigation.vue";
import ConnectWallet from "../ConnectWallet.vue";
import CreateProposal from "../proposals/ProposalCreation.vue";
import ViewList from "../proposals/ViewList.vue";
import ApproveProposals from "../approveProposal/ApproveProposal.vue";
import { connectWallet } from "../Web3/blockchainService.js";
import { registerMember, checkIfMember } from "../Web3/daoContractService";
import UnCountedProposalList from "../proposals/UnCountedProposalsList.vue";

export default {
  components: {
    SidebarNavigation,
    ConnectWallet,
    CreateProposal: markRaw(CreateProposal),
    ViewList: markRaw(ViewList),
    ApproveProposals: markRaw(ApproveProposals),
    UnCountedProposalList: markRaw(UnCountedProposalList),
  },
  data() {
    return {
      currentComponent: null,
      connectedAddress: "",
      errorMessage: "",
      isConnected: false,
      registrationSuccess: false,
      isMember: false,
      connectionError: "",
    };
  },

  computed: {
    isContractCreator() {
      return (
        this.connectedAddress.toLowerCase() ===
        "0xe2c1a7a8255cdecf7c82235e16954a8f366b84f2"
      );
    },
  },

  methods: {
    async connectToWallet() {
      try {
        await connectWallet();
        this.connectedAddress = await this.getCurrentAddress();
        this.isConnected = true;
        this.connectionError = "";
        this.isMember = await checkIfMember(this.connectedAddress);
      } catch (error) {
        console.error("Wallet connection failed:", error);
        this.connectionError = error.message;
        this.isConnected = false;
      }
    },
    async getCurrentAddress() {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        return accounts[0] || "";
      }
      return "";
    },
    async registerMember() {
      try {
        if (!this.isConnected) {
          throw new Error("Please connect your wallet first.");
        }
        await registerMember();
        this.registrationSuccess = true;
        setTimeout(() => (this.registrationSuccess = false), 3000);
        this.isMember = true;
      } catch (error) {
        console.error("Registration failed:", error);
        this.errorMessage = error.message;
      }
    },
    handleComponentSelection(componentName) {
      const componentMap = {
        ApproveProposals: ApproveProposals,
        ViewList: ViewList,
        CreateProposal: CreateProposal,
        CountVotes: UnCountedProposalList,
      };
      this.currentComponent = componentMap[componentName];
    },
  },
};
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  height: 100vh;
}

.dashboard-content {
  flex-grow: 1;
  padding: 20px;
  background-color: #1e1e1e;
  color: #fff;
  box-sizing: border-box;
}

.connection-status {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  color: #fff;
}

.connection-status.error {
  background-color: #ff3b30; /* Red for errors */
}

/* ... other styles ... */
</style>
