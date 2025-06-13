import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MetaMaskConnect from "../MetaMaskConnect";

describe("MetaMaskConnect", () => {
  it("renders connect button and handles MetaMask not installed", () => {
    const { getByText } = render(<MetaMaskConnect />);
    const button = getByText(/connect metamask/i);
    // Remove window.ethereum if present
    const originalEthereum = window.ethereum;
    delete window.ethereum;
    fireEvent.click(button);
    expect(screen.getByText(/MetaMask is not installed/i)).toBeInTheDocument();
    window.ethereum = originalEthereum;
  });
});
