import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { DisplayCard } from "@/components/ui/displayCard";
import { AnimatePresence, motion } from "motion/react";
import Reveal from "@/components/ui/Reveal";

function SearchBar({ query, setQuery }) {
  return (
    <div className="flex items-center gap-3 w-full max-w-md bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-amber-200 mt-6">
      <Search className="w-5 h-5 text-amber-600" />
      <Input
        type="text"
        placeholder="Search monasteries..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-700 placeholder-gray-500"
      />
      <Button className="bg-amber-600 hover:bg-amber-700 text-white rounded-lg px-4">
        Search
      </Button>
    </div>
  );
}

export default function VirtualTour() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [openModal, setOpenModal] = useState(null);

  async function fetchData() {
    const res = await fetch("/info/monasteries.json");
    const json = await res.json();
    setData(json.monasteries || []);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (Array.isArray(data)) {
      setFilter(
        data.filter((item) =>
          item.name?.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [query, data]);

  const displayData = query ? filter : data;

  return (
    <div className="flex-1 w-full min-h-screen overflow-auto p-8 bg-gradient-to-br from-amber-100 via-amber-200 to-amber-300 scroll-smooth">
      {/* Header Section */}
      <div className="w-full bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 p-8 rounded-2xl shadow-xl">
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 text-transparent bg-clip-text drop-shadow-lg text-center w-full">
          360° Virtual Tour
        </h1>
        <div className="mt-3 h-1 w-full bg-gradient-to-r from-amber-400 via-amber-600 to-amber-800 rounded-full"></div>
        <p className="mt-6 text-lg font-medium text-gray-800 drop-shadow-sm text-center">
          Step inside, explore beyond boundaries, and experience heritage like
          never before.
        </p>
        <SearchBar query={query} setQuery={setQuery} />
      </div>

      {/* Cards Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayData.length > 0 ? (
          <AnimatePresence>
            {displayData.map((el) => (
              <Reveal key={el.name}>
                <div key={el.name} className="relative flex flex-col h-full">
                  <DisplayCard
                    name={el.name}
                    photo={el.photo}
                    description={el.description}
                    onView360={() => setOpenModal(el.name)}
                    className="h-full"
                  />

                  {openModal === el.name && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setOpenModal(null)}
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
                        {/* Close Button */}
                        <button
                          onClick={() => setOpenModal(null)}
                          className="absolute top-4 right-4 p-2 rounded-full bg-amber-600 hover:bg-amber-700 font-black text-white shadow-lg"
                        >
                          Close
                        </button>

                        {/* Left: Map iframe */}
                        <div className="md:flex-1 w-full min-h-[300px] md:min-h-[450px] border-b md:border-b-0 md:border-r rounded-3xl border-4 border-amber-100 overflow-hidden shadow-inner">
                          <iframe
                            srcDoc={el.mapIframe}
                            className="w-full h-full rounded-xl "
                            title={el.name}
                            allowFullScreen
                          ></iframe>
                        </div>

                        {/* Right: Info Section */}
                        <div className="flex-1 flex flex-col justify-center gap-6 text-amber-100">
                          <h2 className="text-3xl md:text-5xl font-extrabold text-amber-300 drop-shadow-md">
                            {el.name}
                          </h2>
                          <div className="h-1 mt-1 w-auto rounded-full bg-gradient-to-r from-amber-400 via-amber-600 to-amber-800 "></div>

                          {el.history && (
                            <div>
                              <h3 className="text-2xl font-bold text-amber-100">
                                History:
                              </h3>
                              <p className="text-gray-100/90 text-lg">
                                {el.history}
                              </p>
                            </div>
                          )}

                          {el.timings && (
                            <div>
                              <h3 className="text-2xl font-bold text-amber-100">
                                Timings:
                              </h3>
                              <p className="text-gray-100/90 text-lg">
                                {el.timings}
                              </p>
                            </div>
                          )}

                          {el.nearby?.length > 0 && (
                            <div>
                              <h3 className="text-2xl font-bold text-amber-100">
                                Nearby:
                              </h3>
                              <ul className="list-disc list-inside text-lg text-amber-200/90">
                                {el.nearby.map((place, index) => (
                                  <li key={index}>{place}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </div>
              </Reveal>
            ))}
          </AnimatePresence>
        ) : (
          <p className="text-gray-600 italic col-span-full text-center">
            No monasteries found.
          </p>
        )}
      </div>
    </div>
  );
}
