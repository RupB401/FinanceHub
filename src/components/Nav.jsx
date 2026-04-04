import React from "react";
import StockPlayLogo from "../Logo/StockPlayIcon-removebg-preview.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Theme from "./Theme";
import { 
  FaChartLine, 
  FaWallet, 
  FaChartPie, 
  FaCog, 
  FaUser, 
  FaSignOutAlt,
  FaBars,
  FaTimes
} from "react-icons/fa";
import { useState } from "react";

function Nav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const navLinks = [
    { to: "/financial-dashboard", icon: FaChartLine, label: "Dashboard" },
    { to: "/portfolio", icon: FaWallet, label: "Portfolio" },
    { to: "/analytics", icon: FaChartPie, label: "Analytics" },
    { to: "/settings", icon: FaCog, label: "Settings" },
  ];

  return (
    <div className="navbar bg-base-100 shadow-lg fixed top-0 left-0 w-full z-50">
      {/* Mobile Menu Button */}
      <div className="flex-1 lg:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="btn btn-ghost btn-circle"
        >
          {mobileMenuOpen ? (
            <FaTimes className="text-xl" />
          ) : (
            <FaBars className="text-xl" />
          )}
        </button>
      </div>

      {/* Logo */}
      <div className="flex-shrink-0">
        <Link className="btn btn-ghost text-sm sm:text-lg md:text-xl px-2 sm:px-4" to="/">
          <img
            src={StockPlayLogo}
            alt="StockPlay Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
          />
          <span className="hidden sm:inline font-bold">StockPlay</span>
        </Link>
      </div>

      {/* Desktop Navigation Menu */}
      <div className="hidden lg:flex navbar-center">
        <ul className="menu menu-horizontal gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="font-semibold gap-2 px-3 py-2 hover:bg-primary hover:text-white transition-all"
                >
                  <Icon className="text-lg" />
                  <span>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Right Side Controls */}
      <div className="navbar-end flex items-center gap-2 sm:gap-4">
        <Theme />

        {/* User Profile Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar hover:bg-primary/20 transition-colors"
          >
            <div className="w-8 sm:w-10 rounded-full overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">
                  {user?.name?.charAt(0)?.toUpperCase() ||
                    user?.email?.charAt(0)?.toUpperCase() ||
                    "U"}
                </span>
              </div>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-56 p-2 shadow-lg"
          >
            <li className="menu-title px-4 py-2 pointer-events-none">
              <div>
                <span className="text-xs text-gray-500">Signed in as</span>
                <span className="font-bold truncate block">{user?.name || user?.email}</span>
                <span className="text-xs text-gray-400 truncate">{user?.email}</span>
              </div>
            </li>
            <div className="divider my-1"></div>
            
            {/* Profile Option */}
            <li>
              <Link to="/profile" className="gap-2">
                <FaUser className="text-blue-500" />
                <span>My Profile</span>
              </Link>
            </li>

            {/* Settings Option */}
            <li>
              <Link to="/settings" className="gap-2">
                <FaCog className="text-gray-500" />
                <span>Settings</span>
              </Link>
            </li>

            <div className="divider my-1"></div>

            {/* Logout Option */}
            <li>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 gap-2"
              >
                <FaSignOutAlt />
                <span>Sign Out</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-base-100 shadow-lg lg:hidden border-t">
          <ul className="menu menu-compact w-full">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="gap-2 px-4 py-2"
                  >
                    <Icon className="text-lg" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Nav;
