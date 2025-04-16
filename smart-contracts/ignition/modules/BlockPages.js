const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("BlockPagesModule", (m) => {
  const blockPages = m.contract("BlockPages");

  return { blockPages };
});
