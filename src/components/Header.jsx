import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context, server } from "../main.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setIsAuthenticated(false);
    } catch (e) {
      toast.error(e.response?.data?.message || "Logout failed");
      setIsAuthenticated(true);
    } finally {
      setLoading(false);
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/">
              <h2 className="text-white text-2xl font-bold">TODO APP</h2>
            </Link>
          </div>

          <div className="hidden md:flex space-x-4">
            <Link
              to="/"
              className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:text-indigo-600 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/profile"
              className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:text-indigo-600 transition duration-300"
            >
              Profile
            </Link>
            {isAuthenticated ? (
              <button
                onClick={logoutHandler}
                disabled={loading}
                className={`text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:text-indigo-600 transition duration-300 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:text-indigo-600 transition duration-300"
              >
                Login
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-indigo-700">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-purple-700 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/profile"
              onClick={() => setIsMenuOpen(false)}
              className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-purple-700 transition duration-300"
            >
              Profile
            </Link>
            {isAuthenticated ? (
              <button
                onClick={logoutHandler}
                disabled={loading}
                className={`block w-full text-left text-white px-3 py-2 rounded-md text-base font-medium hover:bg-purple-700 transition duration-300 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-purple-700 transition duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
