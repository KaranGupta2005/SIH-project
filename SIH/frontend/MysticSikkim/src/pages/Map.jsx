import MapMarker from "../components/MapMarker";

export default function Map() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* Header */}
      <header className="pt-14 px-6 text-center">
        <h1 className="text-5xl font-extrabold tracking-wide drop-shadow-xl">
          Monasteries of Sikkim
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          Journey through Sikkim’s spiritual heritage with an interactive monastery map.
        </p>
      </header>

      {/* Map Section */}
      <main className="flex-1 p-6">
        <div className="w-full rounded-2xl overflow-hidden shadow-xl border border-gray-800">
          <MapMarker />
        </div>
      </main>
    </div>
  );
}



