import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';

describe('Navbar', () => {
  it('renders navigation links', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    expect(screen.getByText(/Flagged Wallets/i)).toBeInTheDocument();
    expect(screen.getByText(/Wallet Search/i)).toBeInTheDocument();
  });
});
