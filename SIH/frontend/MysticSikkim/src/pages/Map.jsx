import MapMarker from "../components/MapMarker";

export default function Map() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      
      {/* Map Section */}
      <main className="flex-1">
        
          <MapMarker />
        
      </main>
    </div>
  );
}



