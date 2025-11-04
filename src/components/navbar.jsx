import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/Auth_provider.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const logOut = () => {
    logout()
      .then(() => {
        alert("Signed out successfully");
        navigate("/login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const missions = [
    { id: 1, name: "মানসিক স্বাস্থ্য পরীক্ষা", path: "/mission1", icon: "🧠" },
    { id: 2, name: "কমিউনিটি মানচিত্র", path: "/mission2", icon: "🗺️" },
    { id: 3, name: "সহায়তা অনুরোধ", path: "/mission3", icon: "💬" },
    { id: 4, name: "স্বাস্থ্য টিপস", path: "/mission4", icon: "🌱" },
    { id: 5, name: "মাতৃ ও শিশু ট্র্যাকার", path: "/mission5", icon: "👶" },
    { id: 6, name: "লক্ষণ সচেতনতা", path: "/mission6", icon: "🔍" },
    { id: 7, name: "কমিউনিটি ইভেন্টস", path: "/mission7", icon: "🎉" },
    { id: 8, name: "স্বাস্থ্যকর্মী ডিরেক্টরি", path: "/mission8", icon: "📇" },
    { id: 9, name: "ডেটা এক্সপোর্ট", path: "/mission9", icon: "💾" },
    { id: 10, name: "ভয়েস-সহকারী", path: "/mission10", icon: "🎤" },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-[#4caf50] via-[#81c784] to-[#4dd0e1] text-white shadow-xl z-50">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 pt-6 pb-4 border-b border-green-700">
        <Link to="/" className="text-white font-bold text-3xl">
          🌿
        </Link>
        <Link
          to="/"
          className="text-white font-bold text-2xl hover:text-green-50 transition-colors"
        >
          মনবন্ধু
        </Link>
      </div>

      {/* Missions */}
      <ul className="mt-6 space-y-3 overflow-y-auto px-2 pb-24 h-[70vh] scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-transparent">
        {missions.map((m) => (
          <li key={m.id}>
            <NavLink
              to={m.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                  isActive
                    ? "bg-green-800/60 shadow-[0_0_10px_rgba(0,128,0,0.5)] text-white text-lg"
                    : "text-white hover:bg-green-700/50 text-lg"
                }`
              }
            >
              <span className="text-2xl">{m.icon}</span>
              <span>{m.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Bottom Section */}
      <div className="absolute bottom-6 left-0 w-full px-4">
        {!user && (
          <div className="flex flex-col space-y-3">
            <NavLink
              to="/login"
              className="text-center bg-green-700 hover:bg-green-600 rounded-lg py-3 font-semibold transition text-lg"
            >
              লগ ইন
            </NavLink>
            <NavLink
              to="/register"
              className="text-center bg-green-700 hover:bg-green-600 rounded-lg py-3 font-semibold transition text-lg"
            >
              সাইন আপ
            </NavLink>
          </div>
        )}
        {user && (
          <button
            onClick={logOut}
            className="w-full bg-red-500 hover:bg-red-400 text-white py-3 rounded-lg font-semibold transition text-lg"
          >
            লগ আউট
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
