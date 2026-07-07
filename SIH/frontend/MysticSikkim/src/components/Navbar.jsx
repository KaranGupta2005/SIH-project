import { useState, useRef, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import useAuthStore from "@/store/authStore";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownTimeout = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const navItems = [
    {
      name: "Explore",
      links: [
        { name: "Virtual Tours", path: "/virtualtour", desc: "360° monastery walkthroughs" },
        { name: "Interactive Map", path: "/exploremap", desc: "Directions & nearby places" },
        { name: "Digital Archives", path: "/archives", desc: "Manuscripts, murals & photos" },
      ],
    },
    {
      name: "Plan",
      links: [
        { name: "Cultural Calendar", path: "/calendar", desc: "Festivals & events year-round" },
        { name: "Travel Guide", path: "/travel-guide", desc: "Permits, seasons & tips" },
        { name: "Contact Us", path: "/contact", desc: "Get in touch" },
      ],
    },
    {
      name: "Experience",
      links: [
        { name: "Virtual Tours", path: "/virtualtour", desc: "Walk through ancient monasteries" },
        { name: "AI Guide", path: "#chatbot", desc: "Ask anything about Sikkim" },
        { name: "Offline Mode", path: "/travel-guide", desc: "Works without internet" },
      ],
    },
  ];

  const handleDropdownEnter = (name) => {
    clearTimeout(dropdownTimeout.current);
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 250);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const baseLink =
    "relative px-4 py-2 text-amber-200 hover:text-amber-100 transition-all duration-200 text-lg tracking-wide cursor-pointer select-none";

  return (
    <nav className="fixed top-0 z-50 w-full bg-gradient-to-b from-[#3a1a0d]/95 to-[#1a0d07]/95 backdrop-blur-xl border-b border-amber-800/60 shadow-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <div className="h-14 w-14 border-3 border-amber-400 rounded-full overflow-hidden flex items-center justify-center shadow-lg shadow-amber-900/50">
            <img
              src="/Logo.png"
              alt="MysticSikkim Logo"
              className="h-full w-full object-contain hover:scale-110 transition-transform duration-300"
            />
          </div>
          <span className="text-xl lg:text-2xl font-extrabold text-amber-200 tracking-wide hidden sm:block">
            MysticSikkim
          </span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1">
          {/* Home link (no dropdown) */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? "text-white font-semibold" : ""}`
            }
          >
            Home
          </NavLink>

          {/* Dropdown nav items */}
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => handleDropdownEnter(item.name)}
              onMouseLeave={handleDropdownLeave}
            >
              <span
                className={`${baseLink} inline-flex items-center gap-1 ${
                  activeDropdown === item.name ? "text-amber-100" : ""
                }`}
              >
                {item.name}
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === item.name ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>

              {/* Dropdown Panel */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 mt-2 w-72 bg-gradient-to-br from-[#2a1008] to-[#1a0a05] border border-amber-700/40 rounded-xl shadow-2xl shadow-black/60 p-4 transition-all duration-250 origin-top ${
                  activeDropdown === item.name
                    ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
                    : "opacity-0 scale-95 pointer-events-none -translate-y-2"
                }`}
              >
                <p className="text-amber-500/70 text-[10px] uppercase tracking-widest font-bold mb-3 px-2">
                  {item.name}
                </p>
                <div className="space-y-1">
                  {item.links.map((link) => (
                    <NavLink
                      key={link.name + link.path}
                      to={link.path}
                      className="block px-3 py-2.5 rounded-lg hover:bg-amber-900/40 transition-all duration-200 group"
                    >
                      <p className="text-amber-100 font-medium text-sm group-hover:text-amber-300 transition-colors">
                        {link.name}
                      </p>
                      <p className="text-amber-600/80 text-xs mt-0.5">{link.desc}</p>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter("user")}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="flex items-center gap-2 px-4 py-2 bg-amber-800/40 hover:bg-amber-700/50 rounded-lg border border-amber-700/40 transition-all">
                <img
                  src={user.avatar || "/Logo.png"}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover border border-amber-500/50"
                />
                <span className="text-sm font-medium text-amber-200 max-w-[100px] truncate">
                  {user.name}
                </span>
              </button>
              {/* User dropdown */}
              <div
                className={`absolute right-0 mt-2 w-48 bg-gradient-to-br from-[#2a1008] to-[#1a0a05] border border-amber-700/40 rounded-xl shadow-2xl p-3 transition-all duration-250 origin-top-right ${
                  activeDropdown === "user"
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <NavLink
                  to="/dashboard"
                  className="block px-3 py-2 rounded-lg text-sm text-amber-200 hover:bg-amber-900/40 transition-colors"
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-300 hover:bg-red-900/20 transition-colors mt-1"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className="px-4 py-2 text-sm font-medium text-amber-300 hover:text-amber-100 transition-colors"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="px-5 py-2 text-sm font-semibold bg-amber-600 hover:bg-amber-500 text-white rounded-lg shadow-lg transition-all hover:shadow-amber-600/30"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="text-amber-100 hover:scale-110 transition-transform p-1"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 ease-in-out ${
          mobileOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#1a0d07]/98 backdrop-blur-xl text-white px-6 pb-6 pt-3 border-t border-amber-800/40">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block text-lg py-2 transition-all ${isActive ? "font-bold text-amber-400" : "text-amber-200 hover:text-amber-100"}`
            }
          >
            Home
          </NavLink>

          {navItems.map((section) => (
            <div key={section.name} className="mt-4">
              <p className="text-xs text-amber-500/60 uppercase tracking-widest font-bold mb-2">
                {section.name}
              </p>
              {section.links.map((link) => (
                <NavLink
                  key={link.name + link.path}
                  to={link.path}
                  className="block text-base py-2 text-amber-200 hover:text-amber-100 transition-colors"
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          ))}

          {/* Auth section for mobile */}
          <div className="mt-6 pt-4 border-t border-amber-800/40 flex gap-3">
            {user ? (
              <>
                <NavLink
                  to="/dashboard"
                  className="flex-1 text-center py-3 bg-amber-800/40 text-amber-200 rounded-lg font-medium"
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="flex-1 text-center py-3 border border-red-700/40 text-red-300 rounded-lg font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="flex-1 text-center py-3 border border-amber-700/50 text-amber-200 rounded-lg font-medium"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="flex-1 text-center py-3 bg-amber-600 text-white rounded-lg font-semibold"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
