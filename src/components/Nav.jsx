import React from "react";
import FinanceHubLogo from "../Logo/StockPlayIcon-removebg-preview.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCurrency, CURRENCIES } from "../contexts/CurrencyContext";
import Theme from "./Theme";
import { 
  MdShowChart, 
  MdPieChart, 
  MdPerson, 
  MdLogout,
  MdMenu,
  MdClose,
  MdCurrencyExchange
} from "react-icons/md";
import { useState } from "react";

function Nav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { currency, setCurrency } = useCurrency();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const navLinks = [
    { to: "/financial-dashboard", icon: MdShowChart, label: "Dashboard" },
    { to: "/analytics", icon: MdPieChart, label: "Analytics" },
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
            <MdClose className="text-xl" />
          ) : (
            <MdMenu className="text-xl" />
          )}
        </button>
      </div>

      {/* Logo */}
      <div className="flex-shrink-0">
        <Link className="btn btn-ghost text-sm sm:text-lg md:text-xl px-2 sm:px-4" to="/">
          <img
            src={FinanceHubLogo}
            alt="FinanceHub Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
          />
          <span className="hidden sm:inline font-bold">FinanceHub</span>
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

      {/* Right Side Controls - Pushed to Extreme Right */}
      <div className="navbar-end flex items-center gap-2 sm:gap-4 ml-auto">
        <Theme />

        {/* Currency Selector Dropdown */}
        <div className="dropdown dropdown-end">
          <button
            tabIndex={0}
            className="btn btn-ghost btn-sm md:btn-md text-lg hover:bg-primary/20 transition-colors"
            title="Select Currency"
          >
            <MdCurrencyExchange />
          </button>
          <div
            tabIndex={0}
            className="dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-64 p-2 shadow-lg max-h-96 overflow-y-auto border border-base-300"
          >
            <div className="px-4 py-2 font-semibold text-sm border-b border-base-300">
              Currency ({currency})
            </div>
            {Object.values(CURRENCIES).map((curr) => (
              <button
                key={curr.code}
                onClick={() => {
                  setCurrency(curr.code);
                  // Close dropdown
                  if (document.querySelector('[tabIndex="0"]')) {
                    document.querySelector('[tabIndex="0"]').blur();
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-left ${
                  currency === curr.code
                    ? "bg-primary text-primary-content font-semibold"
                    : "hover:bg-base-200 dark:hover:bg-gray-700"
                }`}
              >
                <span className="text-xl">{curr.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{curr.code}</div>
                  <div className="text-xs opacity-70">{curr.name}</div>
                </div>
                {currency === curr.code && (
                  <span className="text-lg">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

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
                <MdPerson className="text-blue-500" />
                <span>My Profile</span>
              </Link>
            </li>

            <div className="divider my-1"></div>

            {/* Logout Option */}
            <li>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 gap-2"
              >
                <MdLogout />
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
