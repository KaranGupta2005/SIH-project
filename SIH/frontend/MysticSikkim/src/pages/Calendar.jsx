import React, { useState, useEffect } from 'react';

// A new component for the festival details modal
const FestivalModal = ({ festivals, onClose }) => {
    if (!festivals || festivals.length === 0) return null;

    return (
        // Modal backdrop
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose} // Close modal on backdrop click
        >
            {/* Modal content */}
            <div
                className="bg-gray-900 border border-amber-700 rounded-2xl shadow-2xl shadow-amber-500/20 max-w-lg w-full p-6 relative transform transition-all duration-300 scale-95 hover:scale-100 max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                {festivals.map((festival, index) => (
                    <div key={festival.name} className={index > 0 ? "mt-6 pt-6 border-t border-amber-800" : ""}>
                        <h3 className="text-2xl font-bold text-amber-400 mb-3">{festival.name}</h3>
                        <p className="text-amber-100/90 leading-relaxed">{festival.description}</p>
                    </div>
                ))}
                <button
                    onClick={onClose}
                    className="mt-6 px-5 py-2 rounded-lg border border-amber-700/70 text-amber-200 font-semibold bg-black/40 hover:bg-amber-600/40 transition-all duration-300"
                >
                    Close
                </button>
            </div>
        </div>
    );
};


// Main App Component
export default function App() {
    // --- STATE ---
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedFestivals, setSelectedFestivals] = useState(null); // State for the modal (can hold multiple festivals)

    // --- FESTIVAL DATA ---
    // A comprehensive list of Sikkim's festivals with descriptions.
    // Dates are approximated for 2025 for lunar-based festivals.
    const festivals = [
        { date: '01-14', name: 'Maghe Sankranti', description: 'Also known as Makar Sankranti, this festival marks the onset of warmer weather and is a major secular festival for the Nepalese, falling on the fourteenth of January every year.' },
        { date: '01-29', name: 'Sonam Lochar', description: 'The first day of the twelfth month in the lunar calendar is celebrated as the New Year by the Tamang Community with great joy and fervor.' },
        { date: '02-28', name: 'Losar', description: 'Losar, the Tibetan New Year as per the lunar calendar, is celebrated across the state with great enthusiasm on the first day of the first month of the Tibetan lunar calendar.' },
        { date: '03-25', name: 'Holi', description: 'This Hindu festival of colors symbolizes the victory of good over evil and marks the advent of spring. It is celebrated on the full moon day of the Phalgun month.' },
        { date: '04-06', name: 'Ramnawami (Chaite Dasain)', description: 'This festival commemorates the birth of Lord Rama, who is remembered for his prosperous and righteous reign. It occurs on the ninth day of Chaitra, the first month of the Hindu calendar.' },
        { date: '04-18', name: 'Good Friday', description: 'Observed by Christians worldwide, this day commemorates the crucifixion of Jesus. It is the Friday immediately preceding Easter Sunday.' },
        { date: '05-12', name: 'Sakewa', description: 'A religious festival celebrated by the Kirat Khambu Rai community, also known as Bhoomi puja (worship of mother earth). It begins on the full moon day of the Baisakh month.' },
        { date: '06-11', name: 'Saga Dawa', description: 'The most important religious day for Buddhists, marking the birth, enlightenment, and parinirvana of Lord Buddha. It falls on the full moon of the fourth Tibetan lunar month.' },
        { date: '03-31', name: 'Id Ul Fitr', description: 'An important religious festival of the Muslim community that marks the end of Ramadan, the Islamic holy month of fasting.' },
        { date: '07-13', name: 'Bhanu Jayanti', description: 'This day marks the birth anniversary of the Nepali poet Adikabi Bhanu Bhakta Acharya, born in 1814 in Nepal.' },
        { date: '08-01', name: 'Drukpa Tshechi', description: 'This day commemorates Lord Buddha\'s first teaching to his five disciples at Sarnath. It falls on the fourth day of the 6th month of the Buddhist lunar calendar.' },
        { date: '07-06', name: 'Guru Rinpoche’s Thrungkar Tshechu', description: 'This festival celebrates the birth anniversary of Guru Padmasambhava, the patron saint of Sikkim. It falls on the tenth day of the fifth month of the Buddhist lunar calendar.' },
        { date: '08-08', name: 'Tendong Lho Rum Faat', description: 'One of the oldest festivals for the Lepcha community, paying respect to Mount Tendong for saving them from a great deluge.' },
        { date: '08-26', name: 'Janmasthami', description: 'A Hindu festival celebrating the birth anniversary of Lord Krishna, occurring on the 8th day of the Krishnapaksha in the month of Shravan.' },
        { date: '09-16', name: 'Indrajatra', description: 'A festival celebrated by the Newar community to pay homage to Lord Indra and his mother for rains and a good harvest.' },
        { date: '09-08', name: 'Pang Lhabsol', description: 'A festival unique to Sikkim that honors Mount Khangchendzonga, the guardian deity of Sikkim. It falls on the fifteenth day of the seventh month of the lunar calendar.' },
        { date: '09-23', name: 'Durga Puja (Dasain)', description: 'A major Hindu festival marking the victory of goddess Durga over the demon Mahishasura, symbolizing the victory of good over evil.' },
        { date: '10-21', name: 'Diwali (Laxmi Puja)', description: 'The festival of lights, symbolizing the victory of light over darkness, good over evil, and knowledge over ignorance.' },
        { date: '11-13', name: 'Lhabab Dhuechen', description: 'This day marks the descent of Lord Buddha from heaven back to earth after teaching the gods. It occurs on the 22nd day of the ninth month of the Tibetan lunar calendar.' },
        { date: '12-23', name: 'Teyongsi Sirijunga Sawan Tongnam', description: 'Marks the birth anniversary of the Limboo revivalist and scholar Teyongsi Sirijunga.' },
        { date: '12-19', name: 'Kagyed Dance', description: 'A post-harvest masked dance to ward off evil and bring good fortune. It symbolizes the destruction of evil forces and occurs on the 28th and 29th day of the 10th Tibetan month.' },
        { date: '12-21', name: 'Losoong/Namsoong', description: 'The Sikkimese New Year, marking the end of the harvest season. It is celebrated by both the Lepchas (Namsoong) and Bhutias (Losoong).' },
        { date: '12-25', name: 'Christmas', description: 'Commemorates the birth of Lord Jesus Christ and is celebrated as a religious and cultural festival by billions worldwide.' },
        { date: '12-30', name: 'Tamu Lochar', description: 'The New Year of the Gurung community, marking the change of their animal sign (lho).' },
    ];

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // --- DERIVED STATE & HELPERS ---
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // --- EVENT HANDLERS ---
    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const handleGoToToday = () => {
        setCurrentDate(new Date());
    };

    // --- RENDER LOGIC ---
    const renderCalendarDays = () => {
        const days = [];
        // Add blank cells for days before the 1st of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="border-t border-r border-amber-900"></div>);
        }

        // Add cells for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const today = new Date();
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

            // Check for festivals on the current day (can be multiple)
            const monthStr = String(month + 1).padStart(2, '0');
            const dayStr = String(day).padStart(2, '0');
            const dateStr = `${monthStr}-${dayStr}`;
            const dailyFestivals = festivals.filter(f => f.date === dateStr);

            days.push(
                <div
                    key={day}
                    className={`p-2 border-t border-r border-amber-900 flex flex-col h-24 md:h-32 transition-colors duration-300 ${dailyFestivals.length > 0 ? 'bg-amber-900/50 hover:bg-amber-800/80 cursor-pointer' : 'hover:bg-white/10'}`}
                    onClick={() => dailyFestivals.length > 0 && setSelectedFestivals(dailyFestivals)} // Open modal on click
                >
                    <div className="flex justify-between items-center">
                        <span
                            className={`text-sm font-medium ${isToday ? 'bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center' : 'text-gray-200'}`}
                        >
                            {day}
                        </span>
                    </div>
                    {dailyFestivals.length > 0 && (
                        <div className="mt-1 text-xs text-center">
                            <p className="text-yellow-200 bg-amber-700/50 rounded-md px-1 py-0.5 overflow-hidden truncate">
                                {dailyFestivals[0].name}
                            </p>
                            {dailyFestivals.length > 1 && (
                                <p className="text-amber-300 mt-1 text-[10px]">+ {dailyFestivals.length - 1} more</p>
                            )}
                        </div>
                    )}
                </div>
            );
        }
        // Add border-b to the last row for a complete grid
        const totalCells = firstDayOfMonth + daysInMonth;
        const lastRowStartIndex = totalCells - (totalCells % 7 === 0 ? 7 : totalCells % 7) ;

        for(let i = lastRowStartIndex; i < totalCells; i++){
            if(days[i]?.props) { // Check if it's a valid React element
                days[i] = React.cloneElement(days[i], {
                    ...days[i].props,
                    className: days[i].props.className + ' border-b'
                });
            }
        }

        // Add left border to the first column
        for(let i = 0; i < totalCells; i+=7) {
            if(days[i]?.props) {
                days[i] = React.cloneElement(days[i], {
                    ...days[i].props,
                    className: days[i].props.className + ' border-l'
                });
            }
        }

        return days;
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white font-sans p-4 md:p-8">
            <div className="max-w-7xl mx-auto bg-black/50 rounded-2xl shadow-2xl shadow-amber-500/10 backdrop-blur-sm border border-amber-900 overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-amber-900">
                    <h1 className="text-3xl font-bold text-center text-amber-400">Sikkim Festival Calendar</h1>
                    <p className="text-center text-amber-100/80 mt-2">A glimpse into the vibrant culture of Sikkim</p>
                </div>

                {/* Controls and Month/Year Display */}
                <div className="flex items-center justify-between p-4 bg-black/30">
                    <button
                        onClick={handlePrevMonth}
                        className="px-6 py-2 rounded-lg border border-amber-700/70 text-amber-200 font-semibold backdrop-blur-sm bg-black/40 hover:bg-amber-600/40 hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 ease-in-out"
                    >
                        &larr; Prev
                    </button>
                    <div className="flex flex-col items-center">
                        <h2 className="text-2xl font-semibold w-64 text-center text-amber-200">
                            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
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
                        className="px-6 py-2 rounded-lg border border-amber-700/70 text-amber-200 font-semibold backdrop-blur-sm bg-black/40 hover:bg-amber-600/40 hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 ease-in-out"
                    >
                        Next &rarr;
                    </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7">
                    {/* Weekday headers */}
                    {weekDays.map(day => (
                        <div key={day} className="text-center font-bold text-amber-300/90 p-3 border-b border-r border-t border-amber-900 bg-black/50">
                            <span className="hidden md:inline">{day}</span>
                            <span className="md:hidden">{day.charAt(0)}</span>
                        </div>
                    ))}
                    {/* Calendar days */}
                    {renderCalendarDays()}
                </div>
            </div>

            {/* Render the modal */}
            <FestivalModal festivals={selectedFestivals} onClose={() => setSelectedFestivals(null)} />

            <footer className="text-center text-gray-500 mt-8 text-sm">
                <p>Note: Festival dates may vary slightly, especially for those based on the lunar calendar.</p>
            </footer>
        </div>
    );
}


