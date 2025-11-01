import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../provider/Auth_provider.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { CreateUser, googleLog } = useContext(AuthContext);
  const formRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!pattern.test(email)) {
      alert("Invalid email");
      return;
    }

    CreateUser(email, password)
      .then((result) => {
        if (result.user) {
          alert("Registered successfully!");
          formRef.current.reset();
          navigate(location.state?.from || "/");
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
      });
  };

  const handleGoogleSignUp = () => {
    googleLog()
      .then((result) => {
        alert("Signed up with Google!");
        navigate(location.state?.from || "/");
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
      });
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden px-4 bg-black animate-uniqueGalaxy">

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

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 transform transition-transform duration-500 animate-cardEntrance">
        <h2 className="text-4xl font-extrabold text-center text-purple-400 mb-8">
          Create Account ✨
        </h2>

        <form ref={formRef} className="space-y-6" onSubmit={handleRegister}>
          {/* Name */}
          <div className="relative animate-inputGlow delay-100">
            <label htmlFor="name" className="block text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="w-full px-5 py-3 rounded-2xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300"
              required
            />
          </div>

          {/* Email */}
          <div className="relative animate-inputGlow delay-200">
            <label htmlFor="email" className="block text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-5 py-3 rounded-2xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300"
              required
            />
          </div>

          {/* Password */}
          <div className="relative animate-inputGlow delay-300">
            <label htmlFor="password" className="block text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="••••••••"
                className="w-full px-5 py-3 rounded-2xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300"
                required
              />
              <button
                type="button"
                className="absolute right-4 top-3 text-gray-400 hover:text-purple-400 text-lg"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-400 animate-inputGlow delay-400">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 accent-purple-500" />
              I agree to Terms & Conditions
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-2xl transition-transform duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.7)] animate-buttonPulse delay-500"
          >
            Sign Up
          </button>

          <div className="flex items-center my-4 text-gray-400 animate-inputGlow delay-600">
            <hr className="flex-grow border-gray-600" />
            <span className="mx-2">OR</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="w-full flex items-center justify-center gap-3 border border-gray-500 rounded-2xl py-3 text-white bg-gradient-to-r from-purple-700 via-pink-700 to-purple-700 hover:from-pink-600 hover:to-purple-600 transition-all duration-500 animate-googleBounce delay-700"
          >
            <span className="text-2xl">🌐</span>
            Sign up with Google
          </button>

          <p className="text-gray-400 text-center mt-4 text-sm animate-inputGlow delay-800">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              Login
            </Link>
          </p>
        </form>
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

        /* Card entrance */
        @keyframes cardEntrance {
          0% { opacity: 0; transform: scale(0.85); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-cardEntrance { animation: cardEntrance 1s ease forwards; }
      `}</style>
    </div>
  );
};

export default RegisterForm;
