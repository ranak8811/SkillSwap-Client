import React from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/skill.png";
import { FaPlus, FaUser, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, logOutUser } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = (
    <>
      <li>
        <Link
          to="/"
          className={`text-[--color-text] font-medium transition-colors duration-300 ${
            isActive("/")
              ? "text-[--color-primary] underline underline-offset-4"
              : ""
          }`}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/about"
          className={`text-[--color-text] font-medium transition-colors duration-300 ${
            isActive("/about")
              ? "text-[--color-primary] underline underline-offset-4"
              : ""
          }`}
        >
          About Us
        </Link>
      </li>
      <li>
        <Link
          to="/trending"
          className={`text-[--color-text] font-medium transition-colors duration-300 ${
            isActive("/trending")
              ? "text-[--color-primary] underline underline-offset-4"
              : ""
          }`}
        >
          Trending Skills
        </Link>
      </li>
    </>
  );

  return (
    <motion.div
      className="navbar bg-[--color-background] shadow-sm px-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-[--color-background] rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="flex items-center gap-2">
          <motion.img
            src={logo}
            alt="SkillSwap Logo"
            className="w-10"
            whileHover={{ rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <span className="text-xl font-bold text-[--color-primary]">
            SkillSwap
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
      </div>

      <div className="navbar-end space-x-2">
        {user ? (
          <>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={
                      user?.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    }
                    alt={user?.displayName || "User profile"}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[--color-background] rounded-box w-52"
              >
                <li className="text-center font-semibold text-[--color-text]">
                  {user?.displayName}
                </li>
                <li>
                  <Link to="/dashboard" className="flex items-center gap-2">
                    <FaTachometerAlt /> Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/add-skill"
                    className="flex items-center gap-2"
                  >
                    <FaPlus /> Add Skill
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/create-skill"
                    className="flex items-center gap-2"
                  >
                    <FaPlus /> Create Skill
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="flex items-center gap-2">
                    <FaUser /> Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logOutUser}
                    className="flex items-center gap-2 text-red-600"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link to="/signup" className="btn btn-sm bg-[#54b689] text-white">
              Sign Up
            </Link>
            <Link
              to="/login"
              className="btn btn-sm btn-outline border-[--color-primary] text-[--color-primary]"
            >
              Log In
            </Link>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Navbar;
