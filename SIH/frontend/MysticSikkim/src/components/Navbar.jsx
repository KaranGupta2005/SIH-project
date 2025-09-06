import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Virtual Tour", path: "/virtualTour" },
    { name: "Explore Map", path: "/exploreMap" },
    { name: "Archives", path: "/archives" },
    { name: "Calendar", path: "/calendar" },
  ];

  const moreLinks = [
    { name: "Travel Guide", href: "/travel-guide" },
    { name: "User Profile", href: "/user-profile" },
    { name: "Contact Us", href: "/contact" },
  ];

  const baseLink =
    "relative px-4 py-2 text-amber-200 hover:text-amber-100 after:block after:scale-x-0 after:bg-amber-400 after:h-[2px] after:rounded-full after:transition-transform hover:after:scale-x-100 transition-all duration-200 text-lg lg:text-xl tracking-wide";

  return (
    <nav className="fixed top-0 z-50 w-full bg-gradient-to-b from-[#3a1a0d]/95 to-[#1a0d07]/95 backdrop-blur-xl border-b border-amber-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-6 h-24 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-4">
          <img
            src="/Logo.png"
            alt="MysticSikkim Logo"
            className="h-20 w-auto object-contain hover:scale-110 transition-transform duration-300 drop-shadow-lg"
          />
          <span className="text-3xl lg:text-5xl font-extrabold text-amber-200 tracking-wide drop-shadow-xl hidden sm:block">
            MysticSikkim
          </span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `${baseLink} ${
                  isActive ? "text-white font-semibold scale-110" : ""
                }`
              }
            >
              {name}
            </NavLink>
          ))}

          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="px-5 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded-xl shadow-lg transition-all text-lg lg:text-xl font-medium"
            >
              More
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-52 bg-white text-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-300">
                {moreLinks.map(({ name, href }) => (
                  <a
                    key={name}
                    href={href}
                    className="block px-6 py-3 text-lg hover:bg-gray-100 transition-colors"
                  >
                    {name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="text-amber-100 hover:scale-110 transition-transform"
          >
            {mobileOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#1a0d07]/95 text-white px-6 pb-5 space-y-4 border-t border-amber-800">
          {navLinks.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block text-xl transition-all duration-200 ${
                  isActive
                    ? "scale-110 font-bold text-amber-400"
                    : "hover:text-amber-400"
                }`
              }
            >
              {name}
            </NavLink>
          ))}

          {moreLinks.map(({ name, href }) => (
            <a
              key={name}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="block text-xl hover:text-amber-400 transition-colors"
            >
              {name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
