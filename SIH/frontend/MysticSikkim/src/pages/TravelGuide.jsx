import { useState } from "react";
import { motion } from "motion/react";
import { NavLink } from "react-router-dom";

const seasons = [
  {
    name: "Spring (Mar–May)",
    best: true,
    weather: "15°C – 25°C, clear skies",
    highlights: "Rhododendron blooms, comfortable trekking weather, Losar & Holi celebrations",
    tips: "Pack layers. Ideal for Yumthang Valley flower trails.",
  },
  {
    name: "Summer / Monsoon (Jun–Sep)",
    best: false,
    weather: "18°C – 28°C, heavy rainfall",
    highlights: "Lush greenery, waterfalls at full force, fewer tourists",
    tips: "Roads may be blocked by landslides. Avoid North Sikkim. Carry rain gear.",
  },
  {
    name: "Autumn (Oct–Nov)",
    best: true,
    weather: "8°C – 20°C, crystal clear views",
    highlights: "Best mountain views, Diwali & Dasain festivals, perfect trekking",
    tips: "Book ahead — peak tourist season. Great for photography.",
  },
  {
    name: "Winter (Dec–Feb)",
    best: false,
    weather: "-5°C – 12°C, snowfall at altitude",
    highlights: "Snowfall at Nathula & Tsomgo, Losoong & Tamu Lochar festivals",
    tips: "Heavy woolens essential. Many high-altitude roads closed.",
  },
];

const permits = [
  {
    name: "Inner Line Permit (ILP)",
    required: "Indian nationals for Nathula, Tsomgo Lake, Gurudongmar, North Sikkim",
    howToGet: "Apply through Sikkim Tourism office in Gangtok or online via sikkimtourism.gov.in. Carry 2 passport-size photos + valid ID.",
    cost: "Free (processing fee ₹100–200 via agent)",
    duration: "Varies: 1–15 days depending on area",
  },
  {
    name: "Restricted Area Permit (RAP)",
    required: "Foreign nationals for all of Sikkim beyond Gangtok",
    howToGet: "Apply through a registered travel agency or online. Minimum 2 people required.",
    cost: "Varies by nationality",
    duration: "15 days (extendable)",
  },
  {
    name: "Protected Area Permit (PAP)",
    required: "Nathula Pass (Indian nationals only, foreigners not allowed)",
    howToGet: "Gangtok tourism office, apply 1 day in advance. Wednesdays closed.",
    cost: "₹200 per person",
    duration: "1 day only",
  },
];

const etiquette = [
  "Dress modestly when visiting monasteries — cover shoulders and knees",
  "Remove shoes before entering prayer halls",
  "Walk clockwise around stupas and prayer wheels (the Buddhist way)",
  "Ask permission before photographing monks, rituals, or sacred objects",
  "Keep silence inside prayer halls and meditation areas",
  "Do not touch or sit on religious artifacts or thrones",
  "Avoid pointing feet toward altars or Buddhist images",
  "Do not carry or consume meat/alcohol inside monastery grounds",
];

const essentials = [
  { item: "Valid ID (Aadhaar/Passport)", category: "Documents" },
  { item: "2 passport-size photos for permits", category: "Documents" },
  { item: "Warm layered clothing", category: "Clothing" },
  { item: "Waterproof jacket & trekking shoes", category: "Clothing" },
  { item: "Sunscreen, sunglasses, lip balm (UV is harsh at altitude)", category: "Health" },
  { item: "Altitude sickness medicine (Diamox)", category: "Health" },
  { item: "Power bank & offline maps (connectivity is poor in North)", category: "Tech" },
  { item: "Cash (ATMs scarce outside Gangtok)", category: "Finance" },
];

export default function TravelGuide() {
  const [activeTab, setActiveTab] = useState("seasons");

  const tabs = [
    { id: "seasons", label: "Best Time to Visit" },
    { id: "permits", label: "Permits & Entry" },
    { id: "etiquette", label: "Monastery Etiquette" },
    { id: "packing", label: "Packing Essentials" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 via-amber-950 to-stone-900 text-amber-50 pb-16">
      <div className="max-w-6xl mx-auto px-6 pt-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-amber-200 tracking-tight">
            Sikkim Travel Guide
          </h1>
          <p className="mt-4 text-lg text-amber-400/80 max-w-2xl leading-relaxed">
            Everything you need to know before visiting Sikkim's sacred monasteries
            — permits, weather, cultural etiquette, and packing tips.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap gap-2 bg-stone-800/60 p-2 rounded-xl border border-amber-800/40 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-amber-600 text-white shadow-lg"
                  : "text-amber-300 hover:bg-stone-700/60 hover:text-amber-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8"
        >
          {/* Seasons */}
          {activeTab === "seasons" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {seasons.map((season) => (
                <div
                  key={season.name}
                  className={`p-6 rounded-xl border backdrop-blur-sm ${
                    season.best
                      ? "bg-amber-900/30 border-amber-600/50"
                      : "bg-stone-800/50 border-amber-800/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-amber-100">{season.name}</h3>
                    {season.best && (
                      <span className="text-xs px-3 py-1 bg-green-900/50 text-green-300 border border-green-700/50 rounded-full font-semibold">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-amber-400 font-medium mb-2">{season.weather}</p>
                  <p className="text-sm text-amber-200/80 mb-3">{season.highlights}</p>
                  <p className="text-xs text-amber-500 italic border-t border-amber-800/30 pt-3">
                    💡 {season.tips}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Permits */}
          {activeTab === "permits" && (
            <div className="space-y-5">
              {permits.map((permit) => (
                <div
                  key={permit.name}
                  className="p-6 rounded-xl bg-stone-800/50 border border-amber-800/30"
                >
                  <h3 className="text-lg font-bold text-amber-200 mb-3">{permit.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-amber-500 font-medium mb-1">Required for:</p>
                      <p className="text-amber-100/80">{permit.required}</p>
                    </div>
                    <div>
                      <p className="text-amber-500 font-medium mb-1">How to get:</p>
                      <p className="text-amber-100/80">{permit.howToGet}</p>
                    </div>
                    <div>
                      <p className="text-amber-500 font-medium mb-1">Cost:</p>
                      <p className="text-amber-100/80">{permit.cost}</p>
                    </div>
                    <div>
                      <p className="text-amber-500 font-medium mb-1">Validity:</p>
                      <p className="text-amber-100/80">{permit.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Etiquette */}
          {activeTab === "etiquette" && (
            <div className="p-6 rounded-xl bg-stone-800/50 border border-amber-800/30">
              <h3 className="text-lg font-bold text-amber-200 mb-5">
                Dos and Don'ts at Sikkim's Monasteries
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {etiquette.map((rule, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-lg bg-stone-700/30 border border-amber-900/20"
                  >
                    <span className="text-amber-500 font-bold text-sm mt-0.5">
                      {i + 1}.
                    </span>
                    <p className="text-sm text-amber-100/90 leading-relaxed">{rule}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Packing */}
          {activeTab === "packing" && (
            <div className="p-6 rounded-xl bg-stone-800/50 border border-amber-800/30">
              <h3 className="text-lg font-bold text-amber-200 mb-5">
                What to Pack for Sikkim
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {essentials.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg bg-stone-700/30 border border-amber-900/20"
                  >
                    <p className="text-sm text-amber-100/90">{item.item}</p>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-amber-900/40 text-amber-400 border border-amber-700/40">
                      {item.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* CTA */}
        <div className="mt-12 p-6 rounded-xl bg-amber-900/30 border border-amber-700/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-amber-200">Ready to explore?</h3>
            <p className="text-sm text-amber-400/70 mt-1">
              Start planning your monastery trail across Sikkim.
            </p>
          </div>
          <div className="flex gap-3">
            <NavLink
              to="/exploremap"
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-semibold transition-all text-sm shadow-md"
            >
              View Map
            </NavLink>
            <NavLink
              to="/virtualtour"
              className="px-5 py-2.5 border border-amber-700/60 text-amber-300 hover:bg-amber-800/30 rounded-lg font-medium transition-all text-sm"
            >
              Virtual Tours
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
