const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("BlockPages", function () {
  async function deployBlockPagesFixture() {
    const BlockPages = await ethers.getContractFactory("BlockPages");
    const blockPages = await BlockPages.deploy();

    const [owner, otherAccount, anotherAccount] = await ethers.getSigners();

    return { blockPages, owner, otherAccount, anotherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { blockPages, owner } = await loadFixture(deployBlockPagesFixture);

      expect(await blockPages.owner()).to.equal(owner.address);
    });
  });

  describe("Wallet Flagging", function () {
    describe("Validations", function () {
      it("Should revert with the right error if called by an unauthorized account", async function () {
        const { blockPages, otherAccount, anotherAccount } = await loadFixture(
          deployBlockPagesFixture
        );

        await expect(
          blockPages.connect(otherAccount).flagWallet(anotherAccount.address)
        ).to.be.revertedWith("Only owner or wallet owner can perform this action");
      });

      it("Should allow the wallet owner to flag themselves", async function () {
        const { blockPages, otherAccount } = await loadFixture(
          deployBlockPagesFixture
        );
        await expect(blockPages.connect(otherAccount).flagWallet(otherAccount.address))
          .to.emit(blockPages, "WalletFlagged")
          .withArgs(otherAccount.address, 1);
      });

      it("Should revert with the right error if called with an invalid wallet address", async function () {
        const { blockPages } = await loadFixture(deployBlockPagesFixture);

        await expect(
          blockPages.flagWallet("0x0000000000000000000000000000000000000000")
        ).to.be.revertedWith("Invalid wallet address");
      });
    });

    describe("Events", function () {
      it("Should emit an event on wallet flagging", async function () {
        const { blockPages, owner } = await loadFixture(deployBlockPagesFixture);

        await expect(blockPages.flagWallet(owner.address))
          .to.emit(blockPages, "WalletFlagged")
          .withArgs(owner.address, 1);
      });
    });

    describe("Wallet Info", function () {
      it("Should update the wallet info on flagging", async function () {
        const { blockPages, owner } = await loadFixture(deployBlockPagesFixture);

        await blockPages.flagWallet(owner.address);

        const walletInfo = await blockPages.getWalletInfo(owner.address);
        expect(walletInfo.flaggedCount).to.equal(1);
      });
    });
  });

  describe("Wallet Rating", function () {
    describe("Validations", function () {
      it("Should revert with the right error if called by an unauthorized account", async function () {
        const { blockPages, otherAccount, owner } = await loadFixture(
          deployBlockPagesFixture
        );

        await expect(
          blockPages.connect(otherAccount).rateWallet(otherAccount.address, 1)
        ).to.be.revertedWith("Only owner can perform this action");

        await expect(
          blockPages.connect(otherAccount).rateWallet(owner.address, 1)
        ).to.be.revertedWith("Only owner can perform this action");
      });

      it("Should revert with the right error if called with an invalid rating value", async function () {
        const { blockPages, owner } = await loadFixture(deployBlockPagesFixture);

        await expect(blockPages.rateWallet(owner.address, 3)).to.be.revertedWith(
          "Invalid rating value"
        );
      });
    });

    describe("Events", function () {
      it("Should emit an event on wallet rating", async function () {
        const { blockPages, owner } = await loadFixture(deployBlockPagesFixture);

        await expect(blockPages.rateWallet(owner.address, 1))
          .to.emit(blockPages, "WalletRated")
          .withArgs(owner.address, 1);
      });
    });

    describe("Wallet Info", function () {
      it("Should update the wallet info on rating", async function () {
        const { blockPages, owner } = await loadFixture(deployBlockPagesFixture);

        await blockPages.rateWallet(owner.address, 1);

        const walletInfo = await blockPages.getWalletInfo(owner.address);
        expect(walletInfo.rating).to.equal(1);
      });
    });
  });

  describe("Wallet Info Retrieval", function () {
    it("Should return the correct wallet info", async function () {
      const { blockPages, owner } = await loadFixture(deployBlockPagesFixture);

      await blockPages.flagWallet(owner.address);
      await blockPages.rateWallet(owner.address, 1);

      const walletInfo = await blockPages.getWalletInfo(owner.address);
      expect(walletInfo.walletAddress).to.equal(owner.address);
      expect(walletInfo.flaggedCount).to.equal(1);
      expect(walletInfo.rating).to.equal(1);
    });

    it("Should return the correct wallet rating", async function () {
      const { blockPages, owner } = await loadFixture(deployBlockPagesFixture);

      await blockPages.rateWallet(owner.address, 1);

      const walletRating = await blockPages.getWalletRating(owner.address);
      expect(walletRating).to.equal(1);
    });

    it("Should return the correct wallet flagged count", async function () {
      const { blockPages, owner } = await loadFixture(deployBlockPagesFixture);

      await blockPages.flagWallet(owner.address);

      const walletFlaggedCount = await blockPages.getWalletFlaggedCount(
        owner.address
      );
      expect(walletFlaggedCount).to.equal(1);
    });
  });
});