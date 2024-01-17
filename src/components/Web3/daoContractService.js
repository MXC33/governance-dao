import { ethers } from "ethers";
import contractAbi from "./contractAbi.json";
import { provider } from "./blockchainService";
import { connectWallet } from "./blockchainService";

const contractAddress = "0xB0B5E892da9EF3155680BE4cd226a9c95447AfE6";
// const contract = new ethers.Contract(contractAddress, contractAbi, signer);

const getContract = () => {
  if (!provider) {
    console.warn("Ethereum provider is not available");
    return null;
  }
  const signer = provider.getSigner();
  if (!signer) {
    console.warn("No Ethereum signer available");
    return null;
  }
  return new ethers.Contract(contractAddress, contractAbi, signer);
};

const registerMember = async () => {
  try {
    const contract = getContract();
    const transaction = await contract.registerMember();
    await transaction.wait();
    console.log("Member registered successfully");
  } catch (error) {
    console.error("Error in registering member:", error);
    throw error;
  }
};

// Function to create a proposal
const createProposal = async (description, duration) => {
  try {
    const contract = getContract();
    // Convert the duration string to the corresponding enum value
    const enumDuration = convertDurationToEnum(duration);
    const transaction = await contract.createProposal(
      description,
      enumDuration
    );
    await transaction.wait();
    console.log("Proposal created successfully");
  } catch (error) {
    console.error("Error in creating proposal:", error);
    throw error;
  }
};

// Helper function to convert duration string to enum value
const convertDurationToEnum = (duration) => {
  const durationEnum = {
    OneMinute: 0, // Corresponds to Duration.OneMinute in Solidity
    TwoMinutes: 1, // Corresponds to Duration.TwoMinutes
    FiveMinutes: 2, // Corresponds to Duration.FiveMinutes
  };

  if (Object.prototype.hasOwnProperty.call(durationEnum, duration)) {
    return durationEnum[duration];
  } else {
    throw new Error("Invalid duration");
  }
};

const approveProposal = async (proposalId) => {
  try {
    const contract = getContract();
    const transaction = await contract.approveProposal(proposalId);
    await transaction.wait();
    console.log("Proposal approved successfully");
  } catch (error) {
    console.error("Error approving proposal:", error);
    throw error;
  }
};

async function initializeContract() {
  await connectWallet(); // Ensure the wallet is connected first
  return getContract(); // Then get the contract instance
}

export const listenForProposalUpdates = (updateCallback) => {
  const contract = getContract();
  if (!contract) {
    console.warn("Contract instance is not available for event listening");
    return;
  }
  contract.on("ProposalUpdated", (id, isApproved) => {
    if (isApproved) {
      updateCallback(id);
    }
  });
};

const fetchAllProposals = async () => {
  console.log("Fetching all proposals from the contract.");
  const contract = await initializeContract();
  if (!contract) {
    console.error("Contract instance is not available");
    return { proposals: [], contract: null };
  }

  let proposals = [];

  try {
    const proposalCount = await contract.getProposalCount();
    console.log(`Total proposals: ${proposalCount}`);

    for (let i = 1; i <= proposalCount; i++) {
      const rawProposal = await contract.getProposal(i);
      console.log(`Raw proposal data for ID ${i}:`, rawProposal); // Log the raw proposal data

      if (rawProposal) {
        proposals.push({
          id: rawProposal[0].toString(),
          votesUp: rawProposal[1].toString(),
          votesDown: rawProposal[2].toString(),
          deadline: new Date(rawProposal[3].toNumber() * 1000).toLocaleString(),
          description: rawProposal[4],
          isApproved: rawProposal[5],
          countConducted: rawProposal[6],
          passed: rawProposal[7],
        });
      }
    }

    console.log("Proposals fetched:", proposals);
  } catch (error) {
    console.error("Error fetching proposals:", error);
    return { proposals: [], contract };
  }

  // Listen for `ProposalUpdated` event
  contract.on("ProposalUpdated", (id, isApproved, countConducted, passed) => {
    console.log(
      `Proposal ${id} updated: Approved = ${isApproved}, Count Conducted = ${countConducted}, Passed = ${passed}`
    );
    // Update your proposals array or state with the new information
  });

  // Listen for `Vote` event
  contract.on("Vote", (id, vote) => {
    console.log(`Vote received for proposal ${id}: Vote = ${vote}`);
    // Update the votes for the proposal in your state
  });

  return { proposals, contract };
};

const voteOnProposal = async (proposalId, vote) => {
  try {
    const contract = getContract();
    const transaction = await contract.voteOnProposal(proposalId, vote);
    await transaction.wait();
    console.log("Voted on proposal successfully");
  } catch (error) {
    console.error("Error voting on proposal:", error);
    throw error;
  }
};

const countVotes = async (proposalId) => {
  try {
    const contract = getContract();
    const transaction = await contract.countVotes(proposalId);
    await transaction.wait();
    console.log("Votes counted successfully");
  } catch (error) {
    console.error("Error counting votes:", error);
    throw error;
  }
};

export {
  contractAddress,
  provider,
  registerMember,
  createProposal,
  approveProposal,
  voteOnProposal,
  countVotes,
  fetchAllProposals,
};
