import React from "react";
import { Facebook, Instagram, Twitter, Phone } from "lucide-react";

export default function Footer() {
  const socials = [
    {
      name: "Facebook",
      icon: <Facebook size={18} />,
      href: "#", // Replace with real link
      color: "hover:text-[#f59e0b]",
    },
    {
      name: "Instagram",
      icon: <Instagram size={18} />,
      href: "#", // Replace with real link
      color: "hover:text-yellow-400",
    },
    {
      name: "X",
      icon: <Twitter size={18} />,
      href: "#", // Replace with real link
      color: "hover:text-gray-200",
    },
  ];

  return (
    <footer className="w-full bg-gradient-to-br from-amber-900 via-amber-800 to-yellow-900 text-white pt-10 pb-6 relative z-50 font-sans">
      
      {/* Logo & Tagline */}
      <div className="flex flex-col items-center text-center px-4">
        <div className="flex items-center gap-2">
          <img
            src="/Logo.png"
            alt="Monastery360 Logo"
            className="h-20 w-auto object-contain"
          />
          <h2 className="text-2xl font-bold text-yellow-400">MysticSikkim</h2>
        </div>
        <p className="text-yellow-200 text-sm mt-1 text-center">
          Explore the Heritage & Culture of Sikkim's Monasteries
        </p>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mt-10 px-6">

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-300 mb-4 border-b border-amber-700 pb-2">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {["Home", "Virtual Tours", "Interactive Map", "Archives", "Calendar", "About"].map(
              (link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="hover:text-yellow-400 transition duration-200"
                  >
                    {link}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-300 mb-4 border-b border-amber-700 pb-2">
            Follow Us
          </h3>
          <div className="flex flex-col gap-3">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg bg-amber-700 hover:bg-amber-600 transition ${social.color}`}
              >
                {social.icon}
                <span>{social.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-300 mb-4 border-b border-amber-700 pb-2">
            Contact Us
          </h3>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <Phone size={16} className="text-yellow-400" /> +91 12345 67890
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} className="text-yellow-400" /> +91 98765 43210
            </p>
          </div>
          <p className="text-sm mt-4 leading-6 text-yellow-200">
            Sikkim, India
          </p>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-300 mb-4 border-b border-amber-700 pb-2">
            Newsletter
          </h3>
          <p className="text-sm mb-3 text-yellow-200">
            Subscribe to our newsletter for updates on monasteries & cultural events.
          </p>
          <form className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Your Name"
              className="px-3 py-2 bg-amber-700 rounded-lg text-sm text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="px-3 py-2 bg-amber-700 rounded-lg text-sm text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-black text-sm py-2 rounded-lg transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-amber-700 mt-10 pt-4 text-center text-xs text-yellow-200">
        <p>&copy; {new Date().getFullYear()} MysticSikkim. All rights reserved.</p>
        <p className="mt-1">Website crafted with ❤️ by MysticSikkim Dev Team</p>
      </div>
    </footer>
  );
}

