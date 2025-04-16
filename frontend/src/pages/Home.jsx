import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Home() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 xl:p-10 bg-cover bg-center h-screen" style={{ backgroundImage: 'url(https://example.com/background-image.jpg)' }}>
      <div className="bg-black bg-opacity-50 h-full flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">Welcome to BlockPages</h1> {/* Tailwind heading */}
          <p className="text-sm md:text-md lg:text-lg xl:text-xl mb-4 text-gray-400">Your gateway to blockchain transparency.</p>
          <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl mb-8 text-gray-200">Explore wallet transparency on
            the blockchain.</p>
          <Link to="/search" className="button"> {/* Use the 'button' class */}
            Explore Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;