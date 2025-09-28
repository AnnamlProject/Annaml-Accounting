import React, { useMemo } from 'react';

interface ParticlesProps {
  count?: number;
}

const Particles: React.FC<ParticlesProps> = ({ count = 20 }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 5 + 3}s`,
      animationDelay: `${Math.random() * 3}s`,
      size: `${Math.floor(Math.random() * 3) + 2}px`,
    }));
  }, [count]);

  return (
    <>
      <style>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1); }
        }
        .particle {
          position: absolute;
          background-color: white;
          border-radius: 50%;
          pointer-events: none;
          animation-name: sparkle;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
      `}</style>
      <div className="absolute inset-0 z-0 overflow-hidden">
        {particles.map(p => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDuration: p.animationDuration,
              animationDelay: p.animationDelay,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default Particles;
