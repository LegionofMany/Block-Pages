import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import WalletSearch from "../../pages/WalletSearch";

jest.mock('../../services/env', () => ({
  getContractAddress: () => "0x0000000000000000000000000000000000000000",
  getMoralisApiKey: () => "test"
}));
jest.mock('../../services/api', () => ({
  api: { get: jest.fn(), post: jest.fn() },
  getFlaggedWallets: jest.fn(),
  getWalletInfo: jest.fn(),
  flagWallet: jest.fn(),
  rateWallet: jest.fn(),
  getWalletRating: jest.fn(),
  getWalletFlaggedCount: jest.fn(),
  analyzeTransactions: jest.fn(),
  getTransactionHistory: jest.fn()
}));

describe("WalletSearch integration", () => {
  it("renders search input and MetaMask connect button", () => {
    render(<WalletSearch showToast={jest.fn()} />);
    expect(screen.getByPlaceholderText(/enter wallet address/i)).toBeInTheDocument();
    expect(screen.getByText(/connect metamask/i)).toBeInTheDocument();
  });

  it("shows on-chain actions after MetaMask connect and wallet input", () => {
    render(<WalletSearch showToast={jest.fn()} />);
    fireEvent.change(screen.getByPlaceholderText(/enter wallet address/i), { target: { value: "0x1234567890123456789012345678901234567890" } });
    // Simulate MetaMask connect
    fireEvent.click(screen.getByText(/connect metamask/i));
    // After connect, should show on-chain actions section
    // Use getByRole to match the h3 heading
    expect(screen.getByRole('heading', { level: 3, name: /on[- ]chain actions/i })).toBeInTheDocument();
  });
});
