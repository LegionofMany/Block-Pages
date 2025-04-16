import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-sky-400 py-2">
      <div className="container mx-auto flex justify-center items-center">
        <ul className="flex w-full justify-between">
          <li className="flex-1 text-center">
            <Link to="/flagged" className="text-white py-2 block w-full hover:bg-sky-600">
              Flagged Wallets
            </Link>
          </li>
          <li className="flex-1 text-center">
            <Link to="/search" className="text-white py-2 block w-full hover:bg-sky-600">
              Wallet Search
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;