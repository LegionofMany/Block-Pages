require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/6ea3cc445fa7467999942125b907a2c8",
      accounts: ["d30f609ae6390748cfb7a96974ee8bd028104b53d959eebbf6fd4197531be9b4"],
    },
  },
};

