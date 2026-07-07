import { useEffect, useState, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import useOfflineStore from "@/store/offlineStore";
import useGamificationStore from "@/store/gamificationStore";
import useLanguageStore from "@/store/languageStore";
import AudioGuideButton from "@/components/AudioGuideButton";
import ShareButton from "@/components/ShareButton";

const MonasteryTrail3D = lazy(() => import("@/components/MonasteryTrail3D"));

export default function VirtualTour() {
  const [query, setQuery] = useState("");
  const [openModal, setOpenModal] = useState(null);
  const { monasteries: data, monasteriesLoaded, loadMonasteries } = useOfflineStore();
  const visitMonastery = useGamificationStore((s) => s.visitMonastery);
  const unlockBadge = useGamificationStore((s) => s.unlockBadge);
  const t = useLanguageStore((s) => s.t);

  // Track monastery visit when modal opens
  useEffect(() => {
    if (openModal?.name) {
      visitMonastery(openModal.name);
    }
  }, [openModal]);

  useEffect(() => {
    if (!monasteriesLoaded) loadMonasteries();
  }, [monasteriesLoaded]);

  // Keyboard: Escape to close modal
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" && openModal) setOpenModal(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [openModal]);

  const displayData = query
    ? data.filter((item) => item.name?.toLowerCase().includes(query.toLowerCase()))
    : data;

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 via-amber-950 to-stone-900 text-amber-50 pb-16">
      <div className="max-w-7xl mx-auto px-6 pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-amber-200 tracking-tight">
            {t("heroTitle")}
          </h1>
          <p className="mt-3 text-amber-400/70 max-w-xl mx-auto">
            {t("heroDesc")}
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3 w-full max-w-md bg-stone-800/60 backdrop-blur-md px-4 py-3 rounded-xl border border-amber-700/40">
            <Search className="w-4 h-4 text-amber-500" />
            <input
              type="text"
              placeholder={`${t("search")}...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-amber-100 placeholder-amber-600/60 text-sm focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-amber-500 hover:text-amber-300">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 3D Trail */}
        {data.length > 0 && (
          <div className="mb-10">
            <p className="text-center text-amber-500/60 text-xs mb-3 uppercase tracking-widest font-semibold">
              Drag to orbit · Click a marker to explore
            </p>
            <Suspense
              fallback={
                <div className="w-full h-[480px] rounded-2xl bg-stone-900 border border-amber-800/30 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-amber-400/60 text-sm">Loading 3D scene...</p>
                  </div>
                </div>
              }
            >
              <MonasteryTrail3D monasteries={data} onSelectMonastery={(m) => setOpenModal(m)} />
            </Suspense>
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayData.length > 0 ? (
            displayData.map((el, i) => (
              <motion.div
                key={el.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setOpenModal(el)}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-amber-800/30 bg-stone-800/40 hover:border-amber-600/50 hover:shadow-xl hover:shadow-amber-900/20 transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden bg-stone-900">
                  <img
                    src={el.photo}
                    alt={el.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = "/Logo.png"; }}
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-amber-200 group-hover:text-amber-300 transition-colors">
                    {el.name}
                  </h3>
                  <p className="mt-2 text-sm text-amber-400/60 line-clamp-2">
                    {Array.isArray(el.description) ? el.description[0] : el.description}
                  </p>
                  {el.timings && (
                    <p className="mt-3 text-xs text-amber-600/50">{el.timings}</p>
                  )}
                  <span className="inline-block mt-4 text-xs text-amber-500 font-medium">{t("viewTour")} →</span>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center text-amber-500/50 py-12">{t("noResults")}</p>
          )}
        </div>
      </div>

      {/* Modal — centered popup with iframe filling the space */}
      <AnimatePresence>
        {openModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenModal(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-6xl h-[80vh] bg-stone-900 rounded-2xl border border-amber-700/30 shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-amber-800/30 flex-shrink-0">
                <h2 className="text-lg font-bold text-amber-200 truncate">{openModal.name}</h2>
                <button
                  onClick={() => setOpenModal(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-700 text-amber-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content — iframe on left, info on right */}
              <div className="flex-1 flex flex-col md:flex-row min-h-0">
                {/* Street View iframe — direct src, no nesting */}
                <div className="flex-1 min-h-[200px] relative">
                  {(() => {
                    // Extract src URL from the mapIframe HTML string
                    const srcMatch = openModal.mapIframe?.match(/src=["']([^"']+)["']/);
                    const iframeSrc = srcMatch ? srcMatch[1] : null;
                    
                    if (iframeSrc) {
                      return (
                        <iframe
                          src={iframeSrc}
                          className="absolute inset-0 w-full h-full border-0"
                          title={openModal.name}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      );
                    }
                    return (
                      <img
                        src={openModal.photo}
                        alt={openModal.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = "/Logo.png"; }}
                      />
                    );
                  })()}
                </div>

                {/* Info sidebar */}
                <div className="w-full md:w-[300px] overflow-y-auto border-t md:border-t-0 md:border-l border-amber-800/30 p-5 flex-shrink-0 bg-stone-900">
                  {/* Audio Guide + Share */}
                  <div className="flex flex-wrap gap-2 mb-5 pb-4 border-b border-amber-800/20">
                    <AudioGuideButton
                      text={openModal.history || (Array.isArray(openModal.description) ? openModal.description.join(". ") : "")}
                      name={openModal.name}
                    />
                    <ShareButton
                      title={openModal.name}
                      text={`Explore ${openModal.name} on MysticSikkim — 360° virtual tour of Sikkim's monasteries`}
                      url={window.location.href}
                    />
                  </div>
                  {openModal.history && (
                    <div className="mb-5">
                      <h4 className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-1.5">{t("history")}</h4>
                      <p className="text-amber-100/80 text-sm leading-relaxed">{openModal.history}</p>
                    </div>
                  )}

                  {Array.isArray(openModal.description) && (
                    <div className="mb-5">
                      <h4 className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-1.5">{t("highlights")}</h4>
                      <ul className="space-y-1.5">
                        {openModal.description.map((line, idx) => (
                          <li key={idx} className="text-amber-100/70 text-xs pl-3 border-l-2 border-amber-700/40 leading-relaxed">
                            {line}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {openModal.timings && (
                    <div className="mb-5">
                      <h4 className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-1.5">{t("timings")}</h4>
                      <p className="text-amber-100/80 text-sm">{openModal.timings}</p>
                    </div>
                  )}

                  {openModal.nearby?.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-1.5">{t("nearby")}</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {openModal.nearby.map((place, i) => (
                          <span key={i} className="text-[11px] px-2 py-0.5 rounded-full bg-amber-900/30 text-amber-300/80 border border-amber-700/20">
                            {place}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
