// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract BlockPages {
    struct Wallet {
        address walletAddress;
        uint256 flaggedCount;
        uint8 rating; // 0 = Poor, 1 = Good, 2 = Qualified
    }

    mapping(address => Wallet) public wallets;
    address public owner;

    event WalletFlagged(address indexed wallet, uint256 flaggedCount);
    event WalletRated(address indexed wallet, uint8 rating);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    modifier onlyAuthorized(address _wallet) {
        require(msg.sender == owner || msg.sender == _wallet, "Only owner or wallet owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function flagWallet(address _wallet) public onlyAuthorized(_wallet) {
        require(_wallet != address(0), "Invalid wallet address");
        if (wallets[_wallet].walletAddress == address(0)) {
            wallets[_wallet].walletAddress = _wallet;
        }
        wallets[_wallet].flaggedCount++;
        emit WalletFlagged(_wallet, wallets[_wallet].flaggedCount);
    }

    function rateWallet(address _wallet, uint8 _rating) public onlyOwner onlyAuthorized(_wallet) {
        require(_wallet != address(0), "Invalid wallet address");
        require(_rating <= 2, "Invalid rating value");
        wallets[_wallet].rating = _rating;
        emit WalletRated(_wallet, _rating);
    }

    function getWalletInfo(address _wallet) public view returns (Wallet memory) {
        return wallets[_wallet];
    }

    function getWalletRating(address _wallet) public view returns (uint8) {
        return wallets[_wallet].rating;
    }

    function getWalletFlaggedCount(address _wallet) public view returns (uint256) {
        return wallets[_wallet].flaggedCount;
    }
}