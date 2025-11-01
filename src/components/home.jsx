import React from "react";

const Home = () => {
  const cards = [
    { title: "Explore Features", description: "Discover what you can do here." },
    { title: "Stay Organized", description: "Manage and track your activities easily." },
    { title: "Connect", description: "Interact and collaborate with others." },
  ];

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen overflow-hidden px-4 py-16 bg-black animate-uniqueGalaxy">

      {/* Drifting nebula clouds */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-3xl opacity-25 animate-nebulaSlow"
            style={{
              width: `${Math.random() * 600 + 400}px`,
              height: `${Math.random() * 600 + 400}px`,
              top: `${Math.random() * 70}%`,
              left: `${Math.random() * 70}%`,
              background: `radial-gradient(circle at center, rgba(${50 + i*40},${0 + i*30},${100 + i*40},0.3), transparent 70%)`,
              animationDuration: `${30 + i*10}s`,
              animationDelay: `${i*5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Star clusters */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {Array.from({ length: 120 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white opacity-50 animate-twinkleUnique"
            style={{
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 6 + 4}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></span>
        ))}
      </div>

      {/* Cosmic streaks */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/20 rounded-full animate-streak"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 80 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${10 + Math.random()*20}s`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Heading */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-purple-300 mb-12 relative z-10 animate-headingEntrance drop-shadow-[0_0_30px_rgba(180,120,255,0.6)]">
        Welcome
      </h1>
      <p className="text-gray-300 text-center max-w-xl mb-12 z-10 animate-headingEntrance delay-200">
        Explore, learn, and engage with our features. A beautiful experience awaits!
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl z-10">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`bg-gray-900/70 backdrop-blur-2xl rounded-3xl shadow-[0_0_30px_rgba(88,28,135,0.5)] p-8 text-white transform transition-transform duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] animate-cardEntrance delay-${index * 200 + 300}`}
          >
            <h2 className="text-2xl font-bold mb-4">{card.title}</h2>
            <p className="text-gray-300">{card.description}</p>
          </div>
        ))}
      </div>

      <style>{`
        /* Nebula slow drift */
        @keyframes nebulaSlow {
          0% { transform: translateX(0) translateY(0); opacity: 0.2; }
          50% { transform: translateX(30px) translateY(-20px); opacity: 0.35; }
          100% { transform: translateX(0) translateY(0); opacity: 0.2; }
        }
        .animate-nebulaSlow { animation: nebulaSlow linear infinite; }

        /* Twinkle stars */
        @keyframes twinkleUnique {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.4); }
        }
        .animate-twinkleUnique { animation: twinkleUnique linear infinite; }

        /* Cosmic streaks */
        @keyframes streak {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          50% { opacity: 0.6; }
          100% { transform: translateY(200px) translateX(50px) rotate(10deg); opacity: 0; }
        }
        .animate-streak { animation: streak linear infinite; }

        /* Heading entrance */
        @keyframes headingEntrance {
          0% { opacity: 0; transform: translateY(-30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-headingEntrance { animation: headingEntrance 1.2s ease forwards; }

        /* Card entrance */
        @keyframes cardEntrance {
          0% { opacity: 0; transform: scale(0.85); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-cardEntrance { animation: cardEntrance 1s ease forwards; }

        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>
    </div>
  );
};

export default Home;
