import React, { useState } from "react";

const Home = () => {
  const [language, setLanguage] = useState("bn");
  const [showPopup, setShowPopup] = useState(false);

  const toggleLanguage = () => setLanguage(language === "bn" ? "en" : "bn");

  const missions = [
    {
      id: 1,
      title: { bn: "মানসিক স্বাস্থ্য পরীক্ষা", en: "Mental Health Check-In" },
      desc: {
        bn: "প্রতিদিন নিজের মনের অবস্থা যাচাই করুন।",
        en: "Check your emotional state daily.",
      },
      emoji: "💚",
    },
    {
      id: 2,
      title: { bn: "কাছের ক্লিনিক খুঁজুন", en: "Find Nearby Clinic" },
      desc: {
        bn: "নিকটস্থ ক্লিনিক বা স্বাস্থ্যকর্মী খুঁজে পান।",
        en: "Find nearby clinics or health workers.",
      },
      emoji: "🏥",
    },
    {
      id: 3,
      title: { bn: "স্বাস্থ্য পরামর্শ", en: "Health Awareness Tips" },
      desc: {
        bn: "ঋতুভিত্তিক স্বাস্থ্য সচেতনতার টিপস পান।",
        en: "Get seasonal and preventive health advice.",
      },
      emoji: "🌿",
    },
    {
      id: 4,
      title: { bn: "সহায়তা অনুরোধ", en: "Request Help" },
      desc: {
        bn: "গোপনীয়ভাবে মানসিক সহায়তা চাওয়ার সুবিধা।",
        en: "Request mental health support anonymously.",
      },
      emoji: "🤝",
    },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-sky-100 via-emerald-50 to-yellow-100">
      {/* --- Top Toggle --- */}
      <div className="absolute top-5 right-5 z-20">
        <button
          onClick={toggleLanguage}
          className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-full shadow-lg hover:bg-green-700 transition"
        >
          {language === "bn" ? "English" : "বাংলা"}
        </button>
      </div>

      {/* --- Animated Background --- */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Sky gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-200 via-sky-300 to-sky-100 animate-skyShift"></div>

        {/* Sun */}
        <div className="absolute top-10 left-16 w-32 h-32 bg-yellow-300 rounded-full blur-xl animate-sunRise shadow-[0_0_80px_rgba(253,224,71,0.6)]"></div>

        {/* Clouds */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-40 h-20 bg-white/80 rounded-full blur-sm animate-cloudFlow"
            style={{
              top: `${10 + i * 10}%`,
              left: `${-100 + i * 25}%`,
              animationDelay: `${i * 5}s`,
              animationDuration: `${40 + i * 5}s`,
            }}
          ></div>
        ))}

        {/* Birds */}
        <div className="absolute top-32 left-0 w-full overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-6 h-6 rotate-45 border-t-2 border-l-2 border-black/40 animate-birdFly"
              style={{
                top: `${i * 15 + 10}%`,
                animationDelay: `${i * 4}s`,
                animationDuration: `${25 + i * 5}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Trees */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-green-700 via-green-600 to-transparent">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 bg-green-700 rounded-t-full animate-treeSway"
              style={{
                left: `${i * 8}%`,
                width: `${30 + Math.random() * 20}px`,
                height: `${100 + Math.random() * 40}px`,
                animationDelay: `${i * 1.5}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* --- Main Text --- */}
      <div className="z-10 text-center mt-28 md:mt-36 px-4">
        <h1 className="text-6xl md:text-7xl font-extrabold text-green-800 drop-shadow-[0_0_25px_rgba(34,197,94,0.5)] animate-breathe">
          {language === "bn" ? "মনবন্ধু" : "MonBondhu"}
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mt-4 max-w-2xl mx-auto leading-relaxed">
          {language === "bn"
            ? "আপনার মনের বন্ধু — যিনি শোনে, বোঝে এবং সাহায্য করে।"
            : "Your mind’s friend — who listens, understands, and helps."}
        </p>
      </div>

      {/* --- Mission Options --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 z-10 max-w-6xl px-6">
        {missions.map((m, i) => (
          <button
            key={m.id}
            onClick={() => setShowPopup(true)}
            className="p-6 bg-white/80 rounded-3xl shadow-lg text-left transform transition hover:scale-105 hover:bg-green-100 backdrop-blur-md animate-riseUp"
            style={{ animationDelay: `${i * 0.3}s` }}
          >
            <div className="text-4xl mb-3">{m.emoji}</div>
            <h2 className="text-2xl font-bold text-green-700 mb-2">
              {m.title[language]}
            </h2>
            <p className="text-gray-700">{m.desc[language]}</p>
          </button>
        ))}
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="absolute inset-0 flex justify-center items-center bg-black/50 z-30">
          <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-sm">
            <p className="text-lg text-gray-700 mb-6 font-medium">
              {language === "bn"
                ? "এই ফিচারটি ব্যবহার করতে লগ ইন করুন বা সাইন আপ করুন।"
                : "Please log in or sign up to use this feature."}
            </p>
            <button
              className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
              onClick={() => setShowPopup(false)}
            >
              {language === "bn" ? "ঠিক আছে" : "Okay"}
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="absolute bottom-4 text-gray-600 text-sm z-10">
        {language === "bn"
          ? "🌿 সুস্থ মনের জন্য প্রযুক্তি ও সহানুভূতি।"
          : "🌿 Technology with empathy for a healthier mind."}
      </footer>

      {/* --- Animations --- */}
      <style>{`
        @keyframes sunRise {
          0%,100% { transform: translateY(0); opacity: 0.9; }
          50% { transform: translateY(-10px); opacity: 1; }
        }
        .animate-sunRise { animation: sunRise 10s ease-in-out infinite; }

        @keyframes skyShift {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-skyShift { background-size: 200% 200%; animation: skyShift 60s ease-in-out infinite; }

        @keyframes cloudFlow {
          0% { transform: translateX(-200px); opacity: 0.8; }
          50% { opacity: 1; }
          100% { transform: translateX(110vw); opacity: 0.8; }
        }
        .animate-cloudFlow { animation: cloudFlow linear infinite; }

        @keyframes birdFly {
          0% { transform: translateX(-50px) translateY(0); opacity: 0.6; }
          50% { transform: translateX(110vw) translateY(-40px); opacity: 0.8; }
          100% { transform: translateX(-50px) translateY(0); opacity: 0.6; }
        }
        .animate-birdFly { animation: birdFly linear infinite; }

        @keyframes treeSway {
          0%,100% { transform: rotate(0deg); }
          50% { transform: rotate(2deg); }
        }
        .animate-treeSway {
          transform-origin: bottom center;
          animation: treeSway 5s ease-in-out infinite;
        }

        @keyframes breathe {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        .animate-breathe { animation: breathe 6s ease-in-out infinite; }

        @keyframes riseUp {
          0% { opacity: 0; transform: translateY(40px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-riseUp { animation: riseUp 1s ease-out forwards; }

      `}</style>
    </div>
  );
};

export default Home;
