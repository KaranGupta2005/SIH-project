import { NavLink } from "react-router-dom";

export default function Footer() {
  const footerSections = [
    {
      title: "Explore",
      links: [
        { name: "Virtual Tours", path: "/virtualtour" },
        { name: "Interactive Map", path: "/exploremap" },
        { name: "Digital Archives", path: "/archives" },
        { name: "Festival Calendar", path: "/calendar" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Travel Guide", path: "/travel-guide" },
        { name: "Contact Us", path: "/contact" },
        { name: "Dashboard", path: "/dashboard" },
      ],
    },
    {
      title: "Connect",
      links: [
        { name: "Facebook", path: "#" },
        { name: "Instagram", path: "#" },
        { name: "Twitter / X", path: "#" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-stone-900 to-[#0c0a09] border-t border-amber-800/30">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <img src="/Logo.png" alt="MysticSikkim" className="h-10 w-10 rounded-full object-cover border border-amber-600/40" />
              <span className="text-lg font-bold text-amber-200">MysticSikkim</span>
            </div>
            <p className="mt-4 text-sm text-amber-500/50 leading-relaxed max-w-xs">
              Digitizing Sikkim's monastic heritage through immersive virtual tours, interactive maps, and AI-powered cultural guides.
            </p>
          </div>

          {/* Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.path}
                      className="text-sm text-amber-300/50 hover:text-amber-200 transition-colors"
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-amber-800/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-amber-600/40">
            © {new Date().getFullYear()} MysticSikkim. All rights reserved.
          </p>
          <p className="text-xs text-amber-600/40">
            Built for Smart India Hackathon 2025
          </p>
        </div>
      </div>
    </footer>
  );
}
