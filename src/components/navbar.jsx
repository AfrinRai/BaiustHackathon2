import React, { useContext } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/Auth_provider.jsx";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const logOut = () => {
    logout()
      .then(() => {
        alert("Signed out successfully");
        navigate("/login"); // redirect to login after logout
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#1b0030] via-[#2a004d] to-[#3d0066] shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-purple-400 font-bold text-2xl hover:text-purple-300 transition-colors"
            >
              Duita Pothik
            </Link>
          </div>

          {/* Links */}
          <ul className="flex space-x-6 items-center">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "bg-purple-700/60 text-purple-200 px-3 py-2 rounded-lg shadow-[0_0_10px_rgba(139,92,246,0.7)]"
                    : "text-white px-3 py-2 rounded-lg hover:bg-purple-600/50 hover:text-purple-300"
                }
              >
                Home
              </NavLink>
            </li>

            {!user && (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-purple-700/60 text-purple-200 px-3 py-2 rounded-lg shadow-[0_0_10px_rgba(139,92,246,0.7)]"
                        : "text-white px-3 py-2 rounded-lg hover:bg-purple-600/50 hover:text-purple-300"
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-purple-700/60 text-purple-200 px-3 py-2 rounded-lg shadow-[0_0_10px_rgba(139,92,246,0.7)]"
                        : "text-white px-3 py-2 rounded-lg hover:bg-purple-600/50 hover:text-purple-300"
                    }
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}

            {user && (
              <li className="relative group">
                <button
                  onClick={logOut}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold transition-all duration-300"
                >
                  Logout
                </button>
                {/* Tooltip below the button */}
                <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-800 text-white text-sm px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {user.email || user.providerData?.[0]?.email}
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
