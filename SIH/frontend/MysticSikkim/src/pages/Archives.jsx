import { Button } from "../components/ui/button";
import { Filter, Search, X, MapPin, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input.jsx";
import { archiveData } from "../../public/info/archive.js";
import { motion, AnimatePresence } from "motion/react";

// ---- Search Bar Component ----
export function SearchBar({ query, setQuery }) {
  return (
    <div className="flex items-center gap-2 w-full max-w-sm bg-black/30 backdrop-blur-md p-3 rounded-2xl border-2 border-amber-400/50 shadow-lg">
      <Search className="w-5 h-5 text-amber-400 ml-2" />
      <Input
        type="text"
        placeholder="Search archives..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-100 placeholder-gray-400 bg-transparent flex-grow"
      />
      {query && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-black/40 transition-colors"
          onClick={() => setQuery("")}
        >
          <X className="h-4 w-4 text-gray-100" />
        </Button>
      )}
    </div>
  );
}

// ---- Archive Card ----
function ArchiveCard({ item, onView360 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4 }}
      className="group relative cursor-pointer rounded-3xl overflow-hidden border-2 border-amber-400/50 shadow-lg bg-gray-800/40 backdrop-blur-sm hover:shadow-2xl transition-all duration-500"
      onClick={onView360}
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-600 opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-2xl"></div>
      <div className="relative z-10">
        <img
          src={item.thumbnail || item.fullImage}
          alt={item.title}
          className="w-full h-56 md:h-48 object-cover rounded-t-3xl ring-4 ring-amber-500 shadow-inner"
        />
        <div className="p-6 text-gray-100">
          <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
          <p className="text-sm mb-1">Monastery: {item.monastery}</p>
          <p className="text-sm mb-1">Date: {item.date}</p>
          {item.type && (
            <p className="text-sm mb-1">
              Type:{" "}
              <span className="bg-amber-900/30 px-3 py-1 rounded-2xl text-amber-200 font-medium text-sm">
                {item.type}
              </span>
            </p>
          )}
          {item.condition && (
            <p className="text-sm">
              Condition:{" "}
              <span
                className={`px-3 py-1 rounded-2xl text-sm font-medium ${
                  item.condition.toLowerCase() === "excellent" ||
                  item.condition.toLowerCase() === "well preserved"
                    ? "text-green-500 bg-green-900/30"
                    : item.condition.toLowerCase() === "good"
                    ? "text-blue-400 bg-blue-900/30"
                    : item.condition.toLowerCase() === "fragile"
                    ? "text-orange-400 bg-orange-900/30"
                    : item.condition.toLowerCase() === "restored"
                    ? "text-purple-400 bg-purple-900/30"
                    : "text-gray-300 bg-gray-900/30"
                }`}
              >
                {item.condition}
              </span>
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ---- Tabs ----
const tabs = [
  { id: "manuscripts", label: "Manuscripts", count: archiveData.manuscripts.length },
  { id: "murals", label: "Murals", count: archiveData.murals.length },
  { id: "photos", label: "Photos", count: archiveData.photos.length },
  { id: "documents", label: "Documents", count: archiveData.documents.length },
];

// ---- Archives Component ----
export default function Archives() {
  const [activeTab, setActiveTab] = useState("manuscripts");
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const items = archiveData[activeTab] || [];
    if (searchTerm) {
      setFilteredItems(
        items.filter(
          (item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.monastery.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.type && item.type.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      );
    } else {
      setFilteredItems(items);
    }
  }, [activeTab, searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-amber-900 to-gray-800 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <header className="bg-black/40 backdrop-blur-md rounded-3xl border border-amber-400/50 shadow-2xl p-6 mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-300">
              Digital Archives
            </h1>
            <div className="flex items-center gap-4">
              <SearchBar query={searchTerm} setQuery={setSearchTerm} />
              <button className="p-3 text-amber-300 hover:text-amber-500 hover:bg-black/30 rounded-2xl transition-colors shadow-lg">
                <Filter className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-10 justify-center">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-7 py-3 rounded-3xl font-medium transition-all duration-300 flex items-center gap-3 ${
                activeTab === tab.id
                  ? "bg-amber-400 text-black shadow-xl"
                  : "bg-black/30 text-gray-200 hover:bg-amber-500 hover:text-black shadow-md"
              }`}
            >
              {tab.label}
              <span
                className={`px-3 py-1 rounded-2xl text-sm font-medium ${
                  activeTab === tab.id ? "bg-black text-amber-200" : "bg-gray-700 text-gray-200"
                }`}
              >
                {tab.count}
              </span>
            </Button>
          ))}
        </div>

        {/* Archive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          {filteredItems.map((item) => (
            <ArchiveCard key={item.id} item={item} onView360={() => setSelectedItem(item)} />
          ))}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No archives found
            </h3>
            <p className="text-gray-400">
              Try adjusting your search terms or browse different categories.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-6xl max-h-[90vh] overflow-y-auto
                         bg-gradient-to-br from-yellow-950 via-amber-900 to-yellow-800
                         p-6 md:p-10 rounded-4xl shadow-2xl border-6 border-amber-950
                         flex flex-col md:flex-row gap-6 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{
                duration: 0.3,
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              {/* Left: Image */}
              <div className="md:flex-1 w-full min-h-[300px] md:min-h-[450px] rounded-3xl overflow-hidden shadow-inner border-4 border-amber-300 relative">
                <img
                  src={selectedItem.fullImage}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover rounded-3xl ring-2 ring-amber-400 shadow-lg"
                />
                {/* Close Button placed top-right inside image container */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-amber-600 hover:bg-amber-700 font-black text-white shadow-lg z-10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Right: Info Section */}
              <div className="flex-1 flex flex-col justify-center gap-6 text-amber-100">
                <h2 className="text-3xl md:text-5xl font-extrabold text-amber-300 drop-shadow-md">
                  {selectedItem.title}
                </h2>
                <div className="h-1 mt-1 w-auto rounded-full bg-gradient-to-r from-amber-400 via-amber-600 to-amber-800"></div>

                {selectedItem.monastery && (
                  <div>
                    <h3 className="text-2xl font-bold text-amber-100">Monastery:</h3>
                    <p className="text-gray-100/90 text-lg">{selectedItem.monastery}</p>
                  </div>
                )}
                {selectedItem.date && (
                  <div>
                    <h3 className="text-2xl font-bold text-amber-100">Date:</h3>
                    <p className="text-gray-100/90 text-lg">{selectedItem.date}</p>
                  </div>
                )}
                {selectedItem.type && (
                  <div>
                    <h3 className="text-2xl font-bold text-amber-100">Type:</h3>
                    <p className="text-gray-100/90 text-lg">{selectedItem.type}</p>
                  </div>
                )}
                {selectedItem.condition && (
                  <div>
                    <h3 className="text-2xl font-bold text-amber-100">Condition:</h3>
                    <p className="text-gray-100/90 text-lg">{selectedItem.condition}</p>
                  </div>
                )}
                {selectedItem.description && (
                  <div>
                    <h3 className="text-2xl font-bold text-amber-100">Description:</h3>
                    <p className="text-gray-100/90 text-lg">{selectedItem.description}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
