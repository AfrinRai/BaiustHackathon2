import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1b0030] via-[#2a004d] to-[#3d0066] text-white px-4">
      <div className="text-center">
        {/* Animated 404 */}
        <h1 className="text-[8rem] font-extrabold text-purple-400 animate-bounce">
          404
        </h1>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fadeIn">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-300 mb-8 animate-fadeIn delay-200">
          The page you are looking for does not exist or has been moved.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-transform transform hover:scale-105 shadow-lg animate-fadeIn delay-400"
        >
          Go Back Home
        </Link>

        {/* Decorative Floating Circles */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          {Array.from({ length: 15 }).map((_, i) => (
            <span
              key={i}
              className="absolute bg-purple-500/20 rounded-full animate-floating"
              style={{
                width: `${Math.random() * 50 + 20}px`,
                height: `${Math.random() * 50 + 20}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 5}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(-30px); opacity: 0.7; }
          100% { transform: translateY(0); opacity: 0.3; }
        }
        .animate-floating { animation: float linear infinite; }

        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 1s forwards; }
        .animate-fadeIn.delay-200 { animation-delay: 0.2s; }
        .animate-fadeIn.delay-400 { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
};

export default NotFound;
