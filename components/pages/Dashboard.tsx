import React from 'react';
import Particles from '../ui/Particles';

const Dashboard: React.FC = () => {
  const backgroundImageUrl = 'https://images.unsplash.com/photo-1542337839-514752538418?q=80&w=2070&auto=format&fit=crop';

  return (
    <div 
      className="relative h-full w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <Particles count={50} />
      <div className="absolute inset-0 bg-black bg-opacity-10" />
      <div className="text-center z-10 p-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          <span className="bg-gradient-to-r from-cyan-300 to-blue-400 text-transparent bg-clip-text">
            Selamat sore, Admin
          </span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 shadow-lg">
          Waktunya menyelesaikan pekerjaan dengan tuntas.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;