// import React, { useContext, useRef, useState } from "react";
// import { AuthContext } from "../provider/Auth_provider.jsx";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import RegisterForm from "./signup.jsx";

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const { signIn, googleLog } = useContext(AuthContext);
//   const formRef = useRef(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     signIn(email, password)
//       .then((result) => {
//         if (result.user) {
//           alert("User successfully logged in");
//           formRef.current.reset();
//           navigate(location.state?.from || "/");
//         }
//       })
//       .catch((error) => {
//         console.error(error.message);
//         alert(error.message);
//       });
//   };

//   const handleGoogleLogin = () => {
//     googleLog()
//       .then((result) => {
//         if (result.user) {
//           alert("Signed in with Google!");
//           navigate(location.state?.from || "/");
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//         alert(error.message);
//       });
//   };

//   return (
//     <div className="relative flex items-center justify-center min-h-screen overflow-hidden px-4 bg-black animate-uniqueGalaxy">

//       {/* Drifting nebula clouds */}
//       <div className="absolute inset-0 pointer-events-none">
//         {Array.from({ length: 5 }).map((_, i) => (
//           <div
//             key={i}
//             className="absolute rounded-full blur-3xl opacity-25 animate-nebulaSlow"
//             style={{
//               width: `${Math.random() * 600 + 400}px`,
//               height: `${Math.random() * 600 + 400}px`,
//               top: `${Math.random() * 70}%`,
//               left: `${Math.random() * 70}%`,
//               background: `radial-gradient(circle at center, rgba(${50 + i*40},${0 + i*30},${100 + i*40},0.3), transparent 70%)`,
//               animationDuration: `${30 + i*10}s`,
//               animationDelay: `${i*5}s`,
//             }}
//           ></div>
//         ))}
//       </div>

//       {/* Star clusters */}
//       <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
//         {Array.from({ length: 120 }).map((_, i) => (
//           <span
//             key={i}
//             className="absolute rounded-full bg-white opacity-50 animate-twinkleUnique"
//             style={{
//               width: `${Math.random() * 2 + 0.5}px`,
//               height: `${Math.random() * 2 + 0.5}px`,
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               animationDuration: `${Math.random() * 6 + 4}s`,
//               animationDelay: `${Math.random() * 5}s`,
//             }}
//           ></span>
//         ))}
//       </div>

//       {/* Cosmic streaks */}
//       <div className="absolute inset-0 pointer-events-none">
//         {Array.from({ length: 10 }).map((_, i) => (
//           <div
//             key={i}
//             className="absolute bg-white/20 rounded-full animate-streak"
//             style={{
//               width: `${Math.random() * 2 + 1}px`,
//               height: `${Math.random() * 80 + 50}px`,
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               animationDuration: `${10 + Math.random()*20}s`,
//               animationDelay: `${Math.random() * 10}s`,
//             }}
//           ></div>
//         ))}
//       </div>

//       {/* Card */}
//       <div className="relative z-10 w-full max-w-md bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 animate-cardEntrance">
//         <h2 className="text-4xl font-extrabold text-center text-purple-400 mb-8">
//           Welcome 👋 <br /><span>Log into your account</span>
//         </h2>

//         <form ref={formRef} className="space-y-6" onSubmit={handleLogin}>
//           {/* Email */}
//           <div className="relative animate-inputGlow delay-100">
//             <label htmlFor="email" className="block text-gray-300 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="you@example.com"
//               className="w-full px-5 py-3 rounded-2xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.7)]"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="relative animate-inputGlow delay-200">
//             <label htmlFor="password" className="block text-gray-300 mb-1">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 name="password"
//                 placeholder="••••••••"
//                 className="w-full px-5 py-3 rounded-2xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.7)]"
//                 required
//               />
//               <button
//                 type="button"
//                 className="absolute right-4 top-3 text-gray-400 hover:text-purple-400 text-lg"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? "🙈" : "👁️"}
//               </button>
//             </div>
//           </div>

//           {/* Options */}
//           <div className="flex items-center justify-between text-sm text-gray-400 animate-inputGlow delay-300">
//             <label className="flex items-center">
//               <input type="checkbox" className="mr-2 accent-purple-500" />
//               Remember me
//             </label>
//             <a href="#" className="text-purple-400 hover:text-purple-300">
//               Forgot password?
//             </a>
//           </div>

//           {/* Sign In Button */}
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-purple-600 to-purple-600 text-white font-bold py-3 rounded-2xl transition-transform duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.7)] animate-buttonPulse delay-400"
//           >
//             Sign In
//           </button>

//           {/* Divider */}
//           <div className="flex items-center my-4 text-gray-400 animate-inputGlow delay-500">
//             <hr className="flex-grow border-gray-600" />
//             <span className="mx-2">OR</span>
//             <hr className="flex-grow border-gray-600" />
//           </div>

//           {/* Google Login */}
//           <button
//             type="button"
//             onClick={handleGoogleLogin}
//             className="w-full flex items-center justify-center gap-3 border border-gray-500 rounded-2xl py-3 text-white bg-gradient-to-r from-purple-700 via-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-600 transition-all duration-500 animate-googleBounce delay-600"
//           >
//             <span className="text-2xl">🌐</span>
//             Sign in with Google
//           </button>

//           {/* Footer */}
//           <p className="text-gray-400 text-center mt-4 text-sm animate-inputGlow delay-700">
//             Don’t have an account?{" "}
//             <Link
//               to="/register"
//               className="text-purple-400 hover:text-purple-300 font-medium"
//             >
//               Sign up
//             </Link>
//           </p>
//         </form>
//       </div>

//       <style>{`
//         /* Nebula slow drift */
//         @keyframes nebulaSlow {
//           0% { transform: translateX(0) translateY(0); opacity: 0.2; }
//           50% { transform: translateX(30px) translateY(-20px); opacity: 0.35; }
//           100% { transform: translateX(0) translateY(0); opacity: 0.2; }
//         }
//         .animate-nebulaSlow { animation: nebulaSlow linear infinite; }

//         /* Twinkle stars */
//         @keyframes twinkleUnique {
//           0%, 100% { opacity: 0.2; transform: scale(1); }
//           50% { opacity: 0.9; transform: scale(1.4); }
//         }
//         .animate-twinkleUnique { animation: twinkleUnique linear infinite; }

//         /* Cosmic streaks */
//         @keyframes streak {
//           0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
//           50% { opacity: 0.6; }
//           100% { transform: translateY(200px) translateX(50px) rotate(10deg); opacity: 0; }
//         }
//         .animate-streak { animation: streak linear infinite; }

//         /* Card entrance */
//         @keyframes cardEntrance {
//           0% { opacity: 0; transform: scale(0.85); }
//           100% { opacity: 1; transform: scale(1); }
//         }
//         .animate-cardEntrance { animation: cardEntrance 1s ease forwards; }

//         /* Input glow delays */
//         .delay-100 { animation-delay: 0.1s; }
//         .delay-200 { animation-delay: 0.2s; }
//         .delay-300 { animation-delay: 0.3s; }
//         .delay-400 { animation-delay: 0.4s; }
//         .delay-500 { animation-delay: 0.5s; }
//         .delay-600 { animation-delay: 0.6s; }
//         .delay-700 { animation-delay: 0.7s; }
//       `}</style>
//     </div>
//   );
// };

// export default Login;

import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../provider/Auth_provider.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = ({ sidebarOpen }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [lang, setLang] = useState("bn"); // 'bn' = Bengali, 'en' = English
  const { signIn, googleLog } = useContext(AuthContext);
  const formRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn(email, password)
      .then((result) => {
        if (result.user) {
          alert(lang === "bn" ? "সফলভাবে লগইন হয়েছে" : "Logged in successfully");
          formRef.current.reset();
          navigate(location.state?.from || "/");
        }
      })
      .catch((error) => {
        console.error(error.message);
        alert(error.message);
      });
  };

  const handleGoogleLogin = () => {
    googleLog()
      .then((result) => {
        if (result.user) {
          alert(lang === "bn" ? "Google দিয়ে লগইন হয়েছে" : "Signed in with Google!");
          navigate(location.state?.from || "/");
        }
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
  };

  const toggleLang = () => setLang(lang === "bn" ? "en" : "bn");

  return (
    <div
      className="min-h-screen flex items-center justify-center transition-all duration-300 px-4"
      style={{ marginLeft: sidebarOpen ? "16rem" : "0" }}
    >
      {/* Language Toggle Button (outside form) */}
      <button
        onClick={toggleLang}
        className="absolute top-5 right-5 z-20 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-500 transition-colors"
      >
        {lang === "bn" ? "EN" : "বাংলা"}
      </button>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-green-200 to-green-300 -z-10"></div>

      {/* Card/Form */}
      <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 sm:p-10 flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-green-700 mb-6">
          {lang === "bn" ? "স্বাগতম! লগইন করুন" : "Welcome! Log in"}
        </h2>

        <form ref={formRef} className="w-full space-y-6" onSubmit={handleLogin}>
          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">
              {lang === "bn" ? "ইমেইল" : "Email"}
            </label>
            <input
              type="email"
              name="email"
              placeholder={lang === "bn" ? "আপনার ইমেইল লিখুন" : "Enter your email"}
              className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm transition-all"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col relative">
            <label className="mb-1 font-medium text-gray-700">
              {lang === "bn" ? "পাসওয়ার্ড" : "Password"}
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder={lang === "bn" ? "••••••••" : "••••••••"}
              className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Remember / Forgot */}
          <div className="flex justify-between items-center text-sm text-gray-500">
            <label className="flex items-center gap-1">
              <input type="checkbox" className="accent-green-500" />
              {lang === "bn" ? "মনে রাখুন" : "Remember me"}
            </label>
            <a href="#" className="hover:text-green-600">
              {lang === "bn" ? "পাসওয়ার্ড ভুলে গেছেন?" : "Forgot password?"}
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-2xl font-bold hover:bg-green-500 transition-all shadow-md"
          >
            {lang === "bn" ? "লগইন করুন" : "Sign In"}
          </button>

          {/* Divider */}
          <div className="flex items-center text-gray-400 my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2">{lang === "bn" ? "অথবা" : "OR"}</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-2xl py-3 hover:bg-green-100 transition-all shadow-sm"
          >
            🌐 {lang === "bn" ? "Google দিয়ে লগইন করুন" : "Sign in with Google"}
          </button>

          {/* Register Link */}
          <p className="text-center text-gray-500 text-sm">
            {lang === "bn"
              ? "আপনার কোন একাউন্ট নেই? "
              : "Don’t have an account? "}
            <Link to="/register" className="text-green-600 hover:underline">
              {lang === "bn" ? "রেজিস্টার করুন" : "Sign up"}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
