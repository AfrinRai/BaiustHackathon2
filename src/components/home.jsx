import React from "react";

const Home = () => {
  const cards = [
    { title: "Explore Features", description: "Discover what you can do here." },
    { title: "Stay Organized", description: "Manage and track your activities easily." },
    { title: "Connect", description: "Interact and collaborate with others." },
  ];

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen overflow-hidden bg-gradient-to-br from-[#1b0030] via-[#2a004d] to-[#3d0066] px-4 py-16 animate-bgShift">

      {/* Particle circles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute bg-purple-500/30 rounded-full animate-particle"
            style={{
              width: `${Math.random() * 25 + 10}px`,
              height: `${Math.random() * 25 + 10}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></span>
        ))}
      </div>

      {/* Heading */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-purple-400 mb-12 relative z-10 animate-headingEntrance">
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
            className={`bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 text-white transform transition-transform duration-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.7)] animate-cardEntrance delay-${index * 200 + 300}`}
          >
            <h2 className="text-2xl font-bold mb-4">{card.title}</h2>
            <p className="text-gray-300">{card.description}</p>
          </div>
        ))}
      </div>

      {/* Animations CSS */}
      <style>
        {`
          /* Background color shift */
          @keyframes bgShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-bgShift { background-size: 200% 200%; animation: bgShift 15s ease infinite; }

          /* Card zoom entrance */
          @keyframes cardEntrance {
            0% { opacity: 0; transform: scale(0.8); }
            70% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(1); }
          }
          .animate-cardEntrance { animation: cardEntrance 1s ease forwards; }

          /* Heading slide */
          @keyframes headingEntrance {
            0% { opacity: 0; transform: translateY(-30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-headingEntrance { animation: headingEntrance 1s ease forwards; }

          /* Particle animation */
          @keyframes particle {
            0% { transform: translateY(0) scale(1); opacity: 0.3; }
            50% { transform: translateY(-50px) scale(1.5); opacity: 0.6; }
            100% { transform: translateY(0) scale(1); opacity: 0.3; }
          }
          .animate-particle { animation: particle linear infinite; }

          /* Animation delays */
          .delay-200 { animation-delay: 0.2s; }
          .delay-300 { animation-delay: 0.3s; }
          .delay-500 { animation-delay: 0.5s; }
          .delay-700 { animation-delay: 0.7s; }
          .delay-900 { animation-delay: 0.9s; }
        `}
      </style>
    </div>
  );
};

export default Home;
