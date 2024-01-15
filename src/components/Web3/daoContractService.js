import { ethers } from "ethers";
import contractAbi from "./contractAbi.json";
import { provider, signer } from "./blockchainService";

const contractAddress = "0x6505dA8d29A3C3B4E2d8Ce581FD50b0D0d29B652";
const contract = new ethers.Contract(contractAddress, contractAbi, signer);

const registerMember = async () => {
  try {
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
    const durationInSeconds = convertDurationToSeconds(duration);
    const transaction = await contract.createProposal(
      description,
      durationInSeconds
    );
    await transaction.wait();
    console.log("Proposal created successfully");
  } catch (error) {
    console.error("Error in creating proposal:", error);
    throw error;
  }
};

// Helper function to convert duration to seconds as per the smart contract
const convertDurationToSeconds = (duration) => {
  switch (duration) {
    case "OneMinute":
      return 120; // 60 seconds * 2
    case "TwentyFourHours":
      return 24 * 60 * 60; // 24 hours
    case "OneWeek":
      return 7 * 24 * 60 * 60; // 7 days
    default:
      throw new Error("Invalid duration");
  }
};

const approveProposal = async (proposalId) => {
  try {
    const transaction = await contract.approveProposal(proposalId);
    await transaction.wait();
    console.log("Proposal approved successfully");
  } catch (error) {
    console.error("Error approving proposal:", error);
    throw error;
  }
};

const voteOnProposal = async (proposalId, vote) => {
  try {
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
  contract,
  provider,
  registerMember,
  createProposal,
  approveProposal,
  voteOnProposal,
  countVotes,
};
