"use client";

import { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion, AnimatePresence } from "motion/react";

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const monasteries = [
  { id: 1, name: "Rumtek Monastery", coords: [27.3256, 88.6126], region: "East", description: "Seat of the Karmapa, Kagyu Buddhism.", year: 1740 },
  { id: 2, name: "Enchey Monastery", coords: [27.3415, 88.6167], region: "East", description: "Famous for tantric Buddhist practices.", year: 1909 },
  { id: 3, name: "Phodong Monastery", coords: [27.3891, 88.6115], region: "North", description: "One of six important Sikkim monasteries.", year: 1740 },
  { id: 4, name: "Dubdi Monastery", coords: [27.2641, 88.2357], region: "West", description: "Oldest monastery of Sikkim.", year: 1701 },
  { id: 5, name: "Gonjang Monastery", coords: [27.3618, 88.5938], region: "East", description: "Near Tashi Viewpoint, Buddhist philosophy.", year: 1981 },
  { id: 6, name: "Pemayangtse Monastery", coords: [27.3166, 88.2325], region: "West", description: "Oldest Nyingma sect monastery.", year: 1705 },
  { id: 7, name: "Tashiding Monastery", coords: [27.2976, 88.2971], region: "West", description: "Sacred Bumchu Festival site.", year: 1717 },
  { id: 8, name: "Ralang Monastery", coords: [27.2237, 88.3635], region: "South", description: "Built for 4th Chogyal's Tibet visit.", year: 1768 },
];

function FitRoute({ route, position, destination, follow }) {
  const map = useMap();
  useEffect(() => {
    if (!follow && route.length > 0 && destination) {
      map.fitBounds([position, destination], { padding: [60, 60] });
    }
  }, [route, position, destination, follow, map]);
  return null;
}

function FollowUser({ position, follow }) {
  const map = useMap();
  useEffect(() => {
    if (follow && position) map.setView(position, 16);
  }, [position, follow, map]);
  return null;
}

export default function MonasteryMap() {
  const [position, setPosition] = useState([27.3389, 88.6065]);
  const [route, setRoute] = useState([]);
  const [destination, setDestination] = useState(null);
  const [search, setSearch] = useState("");
  const [followUser, setFollowUser] = useState(false);
  const [instructions, setInstructions] = useState([]);
  const [regionFilter, setRegionFilter] = useState("All");
  const mapRef = useRef(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    const id = navigator.geolocation.watchPosition(
      (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
      () => {},
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(id);
  }, []);

  const getRoute = async (destCoords) => {
    try {
      const key = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjJjYjNlYTlkNjIyYjQ0MGJhZjgwODI3MDJhYmU0MmYwIiwiaCI6Im11cm11cjY0In0=";
      const res = await fetch(
        `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${key}&start=${position[1]},${position[0]}&end=${destCoords[1]},${destCoords[0]}`
      );
      const data = await res.json();
      const coords = data.features[0].geometry.coordinates.map((c) => [c[1], c[0]]);
      setRoute(coords);
      setDestination(destCoords);
      const steps = data.features[0].properties.segments[0].steps.map((s) => ({
        instruction: s.instruction,
        distance: (s.distance / 1000).toFixed(2),
        duration: Math.round(s.duration / 60),
      }));
      setInstructions([...steps]);
    } catch {
      setRoute([position, destCoords]);
      setDestination(destCoords);
      setInstructions([]);
    }
  };

  const filtered = monasteries.filter(
    (m) => regionFilter === "All" || m.region === regionFilter
  );

  return (
    <div className="text-amber-50 pb-8">
      <div className="max-w-7xl mx-auto px-6 pt-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-amber-200 tracking-tight">
            Interactive Map
          </h1>
          <p className="mt-2 text-amber-400/60 text-sm">
            Explore monastery locations with live directions. Click a marker to navigate.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3 items-center mb-5">
          <div className="flex items-center gap-2 bg-stone-800/60 border border-amber-700/30 rounded-lg px-3 py-2">
            <input
              placeholder="Search monastery..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-amber-100 placeholder-amber-600/50 text-sm focus:outline-none w-40"
            />
            <button
              onClick={() => {
                const found = monasteries.find((m) => m.name.toLowerCase().includes(search.toLowerCase()));
                if (found) getRoute(found.coords);
              }}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-md transition-colors"
            >
              Go
            </button>
          </div>

          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="px-3 py-2 bg-stone-800/60 border border-amber-700/30 rounded-lg text-sm text-amber-200 focus:outline-none"
          >
            <option value="All">All Regions</option>
            <option value="East">East</option>
            <option value="West">West</option>
            <option value="North">North</option>
            <option value="South">South</option>
          </select>

          <button
            onClick={() => setFollowUser(!followUser)}
            className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${
              followUser
                ? "border-amber-500 text-amber-300 bg-amber-900/30"
                : "border-amber-700/30 text-amber-400/60 hover:text-amber-200 bg-stone-800/60"
            }`}
          >
            {followUser ? "● Following" : "○ Follow Me"}
          </button>
        </div>

        {/* Map + Directions */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Map */}
          <div className="lg:col-span-3 rounded-2xl overflow-hidden border border-amber-700/30 shadow-xl" style={{ height: "70vh" }}>
            <MapContainer
              whenCreated={(map) => (mapRef.current = map)}
              center={position}
              zoom={13}
              className="w-full h-full"
              scrollWheelZoom={true}
              style={{ height: "70vh" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://openstreetmap.org">OSM</a>'
              />
              <Marker position={position}>
                <Popup><span className="font-semibold">Your Location</span></Popup>
              </Marker>

              {destination && <Marker position={destination} />}
              {route.length > 0 && (
                <Polyline positions={route} pathOptions={{ color: "#d97706", weight: 4, opacity: 0.8 }} />
              )}

              {filtered.map((m) => (
                <Marker key={m.id} position={m.coords}>
                  <Popup>
                    <div className="p-1 min-w-[180px]">
                      <h3 className="font-bold text-sm text-stone-800">{m.name}</h3>
                      <p className="text-xs text-stone-600 mt-1">{m.description}</p>
                      <p className="text-xs text-stone-500 mt-1">Est. {m.year}</p>
                      <button
                        onClick={() => getRoute(m.coords)}
                        className="mt-2 w-full py-1.5 text-xs bg-amber-600 hover:bg-amber-500 text-white rounded font-semibold transition-colors"
                      >
                        Get Directions
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}

              <FitRoute route={route} position={position} destination={destination} follow={followUser} />
              <FollowUser position={position} follow={followUser} />
            </MapContainer>
          </div>

          {/* Directions Panel */}
          <div className="lg:col-span-1 rounded-2xl border border-amber-700/30 bg-stone-800/40 backdrop-blur-sm p-4 flex flex-col" style={{ maxHeight: "70vh" }}>
            <h3 className="text-sm font-bold text-amber-300 mb-3 pb-2 border-b border-amber-800/30">
              Directions
            </h3>
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              <AnimatePresence>
                {instructions.length > 0 ? (
                  instructions.map((step, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-3 rounded-lg bg-stone-700/40 border border-amber-900/20"
                    >
                      <p className="text-xs text-amber-100/80 leading-relaxed">{step.instruction}</p>
                      <p className="text-[10px] text-amber-500/50 mt-1">
                        {step.distance} km · {step.duration} min
                      </p>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-amber-500/40 text-xs">
                      Click a monastery marker on the map and press "Get Directions" to see the route.
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
