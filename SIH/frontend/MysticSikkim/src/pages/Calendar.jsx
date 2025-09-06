"use client";

import React, { useState } from "react";

// === Festival Modal ===
const FestivalModal = ({ festivals, onClose }) => {
  if (!festivals || festivals.length === 0) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-stone-900 border border-amber-700 rounded-2xl shadow-2xl shadow-amber-500/20 max-w-lg w-full p-6 relative transform transition-all duration-300 scale-95 hover:scale-100 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {festivals.map((festival, index) => (
          <div
            key={festival.name}
            className={index > 0 ? "mt-6 pt-6 border-t border-amber-800" : ""}
          >
            <h3 className="text-2xl font-bold text-amber-400 mb-3">
              {festival.name}
            </h3>
            <p className="text-amber-100/90 leading-relaxed">
              {festival.description}
            </p>
          </div>
        ))}
        <button
          onClick={onClose}
          className="mt-6 px-5 py-2 rounded-lg border border-amber-700/70 text-amber-200 font-semibold bg-stone-800 hover:bg-amber-600/40 transition-all duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// === Main App ===
export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedFestivals, setSelectedFestivals] = useState(null);

  const festivals = [
    { date: "01-14", name: "Maghe Sankranti", description: "Also known as Makar Sankranti, this festival marks the onset of warmer weather and is a major secular festival for the Nepalese, falling on the fourteenth of January every year." },
    { date: "01-29", name: "Sonam Lochar", description: "The first day of the twelfth month in the lunar calendar is celebrated as the New Year by the Tamang Community with great joy and fervor." },
    { date: "02-28", name: "Losar", description: "Losar, the Tibetan New Year as per the lunar calendar, is celebrated across the state with great enthusiasm on the first day of the first month of the Tibetan lunar calendar." },
    { date: "03-25", name: "Holi", description: "This Hindu festival of colors symbolizes the victory of good over evil and marks the advent of spring." },
    { date: "04-06", name: "Ramnawami (Chaite Dasain)", description: "This festival commemorates the birth of Lord Rama, who is remembered for his prosperous and righteous reign." },
    { date: "04-18", name: "Good Friday", description: "Observed by Christians worldwide, this day commemorates the crucifixion of Jesus." },
    { date: "05-12", name: "Sakewa", description: "A religious festival celebrated by the Kirat Khambu Rai community, also known as Bhoomi puja (worship of mother earth)." },
    { date: "06-11", name: "Saga Dawa", description: "The most important religious day for Buddhists, marking the birth, enlightenment, and parinirvana of Lord Buddha." },
    { date: "03-31", name: "Id Ul Fitr", description: "An important religious festival of the Muslim community that marks the end of Ramadan." },
    { date: "07-13", name: "Bhanu Jayanti", description: "Birth anniversary of Nepali poet Adikabi Bhanu Bhakta Acharya." },
    { date: "08-01", name: "Drukpa Tshechi", description: "Commemorates Lord Buddha's first teaching to his five disciples at Sarnath." },
    { date: "07-06", name: "Guru Rinpoche’s Thrungkar Tshechu", description: "Festival celebrating the birth anniversary of Guru Padmasambhava." },
    { date: "08-08", name: "Tendong Lho Rum Faat", description: "Lepcha festival paying respect to Mount Tendong for saving them from a great deluge." },
    { date: "08-26", name: "Janmasthami", description: "Celebrating the birth anniversary of Lord Krishna." },
    { date: "09-16", name: "Indrajatra", description: "Festival celebrated by the Newar community to pay homage to Lord Indra." },
    { date: "09-08", name: "Pang Lhabsol", description: "Honors Mount Khangchendzonga, the guardian deity of Sikkim." },
    { date: "09-23", name: "Durga Puja (Dasain)", description: "Marks the victory of goddess Durga over the demon Mahishasura." },
    { date: "10-21", name: "Diwali (Laxmi Puja)", description: "The festival of lights, symbolizing the victory of light over darkness." },
    { date: "11-13", name: "Lhabab Dhuechen", description: "Marks the descent of Lord Buddha from heaven back to earth after teaching the gods." },
    { date: "12-23", name: "Teyongsi Sirijunga Sawan Tongnam", description: "Marks the birth anniversary of the Limboo revivalist and scholar Teyongsi Sirijunga." },
    { date: "12-19", name: "Kagyed Dance", description: "A post-harvest masked dance to ward off evil and bring good fortune." },
    { date: "12-21", name: "Losoong/Namsoong", description: "The Sikkimese New Year, marking the end of the harvest season." },
    { date: "12-25", name: "Christmas", description: "Commemorates the birth of Lord Jesus Christ." },
    { date: "12-30", name: "Tamu Lochar", description: "The New Year of the Gurung community." },
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const handleGoToToday = () => setCurrentDate(new Date());

  // === Render Calendar Days ===
  const renderCalendarDays = () => {
    const days = [];

    // empty slots
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="border-t border-r border-amber-900 bg-stone-800/30"
        ></div>
      );
    }

    // actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const today = new Date();
      const isToday =
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      const monthStr = String(month + 1).padStart(2, "0");
      const dayStr = String(day).padStart(2, "0");
      const dateStr = `${monthStr}-${dayStr}`;

      const dailyFestivals = festivals.filter((f) => f.date === dateStr);

      days.push(
        <div
          key={day}
          onClick={() =>
            dailyFestivals.length > 0 && setSelectedFestivals(dailyFestivals)
          }
          className={`p-2 border-t border-r border-amber-900 flex flex-col h-24 md:h-32 transition-colors duration-300 ${
            dailyFestivals.length > 0
              ? "bg-amber-900/40 hover:bg-amber-800/70 cursor-pointer"
              : "hover:bg-stone-800/40"
          }`}
        >
          <div className="flex justify-between items-center">
            <span
              className={`text-sm font-medium ${
                isToday
                  ? "bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center"
                  : "text-amber-100"
              }`}
            >
              {day}
            </span>
          </div>

          {dailyFestivals.length > 0 && (
            <div className="mt-1 text-xs text-center">
              <p className="text-yellow-200 bg-amber-700/40 rounded-md px-1 py-0.5 truncate">
                {dailyFestivals[0].name}
              </p>
              {dailyFestivals.length > 1 && (
                <p className="text-amber-300 mt-1 text-[10px]">
                  + {dailyFestivals.length - 1} more
                </p>
              )}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-stone-900 min-h-screen text-amber-50 font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-stone-950/70 rounded-2xl shadow-2xl shadow-amber-500/10 backdrop-blur-sm border border-amber-900 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-amber-900">
          <h1 className="text-3xl font-bold text-center text-amber-400">
            Sikkim Festival Calendar
          </h1>
          <p className="text-center text-amber-200/80 mt-2">
            A glimpse into the vibrant culture of Sikkim
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between p-4 bg-stone-900/60">
          <button
            onClick={handlePrevMonth}
            className="px-6 py-2 rounded-lg border border-amber-700/70 text-amber-200 font-semibold bg-stone-800 hover:bg-amber-600/40 transition-all duration-300"
          >
            &larr; Prev
          </button>

          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold w-64 text-center text-amber-200">
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <button
              onClick={handleGoToToday}
              className="mt-2 px-4 py-1 text-sm rounded-md border border-amber-800 text-amber-300 hover:bg-amber-700/30 transition-colors"
            >
              Today
            </button>
          </div>

          <button
            onClick={handleNextMonth}
            className="px-6 py-2 rounded-lg border border-amber-700/70 text-amber-200 font-semibold bg-stone-800 hover:bg-amber-600/40 transition-all duration-300"
          >
            Next &rarr;
          </button>
        </div>

        {/* Calendar */}
        <div className="grid grid-cols-7">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center font-bold text-amber-300/90 p-3 border-b border-r border-t border-amber-900 bg-stone-800/40"
            >
              <span className="hidden md:inline">{day}</span>
              <span className="md:hidden">{day.charAt(0)}</span>
            </div>
          ))}
          {renderCalendarDays()}
        </div>
      </div>

      <FestivalModal
        festivals={selectedFestivals}
        onClose={() => setSelectedFestivals(null)}
      />

      <footer className="text-center text-amber-400/70 mt-8 text-sm">
        <p>
          Note: Festival dates may vary slightly, especially those based on the
          lunar calendar.
        </p>
      </footer>
    </div>
  );
}


