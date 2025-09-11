"use client";

import React, { useState, useEffect, useRef } from "react";
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
import { motion, AnimatePresence } from "framer-motion"; // ✅ fixed import
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// === Monasteries ===
const monasteries = [
  { id: 1, name: "Rumtek Monastery", coords: [27.3256, 88.6126], region: "East", description: "Seat of the Karmapa, Kagyu Buddhism.", popularity: 5, year: 1740 },
  { id: 2, name: "Enchey Monastery", coords: [27.3415, 88.6167], region: "East", description: "Famous for tantric Buddhist practices.", popularity: 4, year: 1909 },
  { id: 3, name: "Phodong Monastery", coords: [27.3891, 88.6115], region: "North", description: "One of six important Sikkim monasteries.", popularity: 4, year: 1740 },
  { id: 4, name: "Dubdi Monastery", coords: [27.2641, 88.2357], region: "West", description: "Oldest monastery of Sikkim.", popularity: 5, year: 1701 },
  { id: 5, name: "Gonjang Monastery", coords: [27.3618, 88.5938], region: "East", description: "Near Tashi Viewpoint, Buddhist philosophy.", popularity: 3, year: 1981 },
  { id: 6, name: "Pemayangtse Monastery", coords: [27.3166, 88.2325], region: "West", description: "Oldest Nyingma sect monastery.", popularity: 5, year: 1705 },
  { id: 7, name: "Tashiding Monastery", coords: [27.2976, 88.2971], region: "West", description: "Sacred Bumchu Festival site.", popularity: 4, year: 1717 },
  { id: 8, name: "Ralang Monastery", coords: [27.2237, 88.3635], region: "South", description: "Built for 4th Chogyal's Tibet visit.", popularity: 4, year: 1768 },
];

// === Icons ===
const destinationIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const userBlackIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png", // black marker
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// === Map Helpers ===
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

// === Main Component ===
export default function MonasteryMap() {
  const [position, setPosition] = useState([27.3389, 88.6065]);
  const [route, setRoute] = useState([]);
  const [destination, setDestination] = useState(null);
  const [search, setSearch] = useState("");
  const [followUser, setFollowUser] = useState(false);
  const [instructions, setInstructions] = useState([]);
  const [regionFilter, setRegionFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Popular");
  const mapRef = useRef(null);

  // Track geolocation
  useEffect(() => {
    if (!navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => console.warn(err),
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const getRoute = async (destCoords) => {
    try {
      const key =
        "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjJjYjNlYTlkNjIyYjQ0MGJhZjgwODI3MDJhYmU0MmYwIiwiaCI6Im11cm11cjY0In0="; 
      const res = await fetch(
        `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${key}&start=${position[1]},${position[0]}&end=${destCoords[1]},${destCoords[0]}`
      );
      const data = await res.json();
      const coords = data.features[0].geometry.coordinates.map((c) => [c[1], c[0]]);
      setRoute(coords);
      setDestination(destCoords);

      if (mapRef.current) {
        mapRef.current.setView(destCoords, 16);
      }

      const steps = data.features[0].properties.segments[0].steps.map((s) => ({
        instruction: s.instruction,
        distance: (s.distance / 1000).toFixed(2),
        duration: Math.round(s.duration / 60),
      }));
      setInstructions(steps);
    } catch (err) {
      console.warn("Route fetch failed", err);
      setRoute([position, destCoords]);
      setDestination(destCoords);
      if (mapRef.current) mapRef.current.setView(destCoords, 16);
      setInstructions([]);
    }
  };

  const filteredMonasteries = monasteries
    .filter((m) => regionFilter === "All" || m.region === regionFilter)
    .sort((a, b) => (sortBy === "Oldest" ? a.year - b.year : b.popularity - a.popularity));

  return (
    <div className="bg-gradient-to-b from-stone-900 via-amber-900 to-stone-800 text-amber-50 pb-12">
      <div className="pt-12 px-6 relative z-10">
        <h1 className="text-3xl font-extrabold mb-4">Monastery 360 — Sikkim</h1>
        <p className="text-sm text-amber-200 mb-6 max-w-2xl">
          Interactive map with directions. Click a monastery marker to open popup & get directions.
        </p>

        <div className="flex flex-wrap gap-3 items-center mb-4 z-20 relative">
          <Input
            placeholder="Search monastery..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-72 text-black font-semibold bg-stone-100"
          />
          <Button
            onClick={() => {
              const found = monasteries.find((m) =>
                m.name.toLowerCase().includes(search.toLowerCase())
              );
              if (found) getRoute(found.coords);
            }}
          >
            Search
          </Button>

          <Select onValueChange={setRegionFilter}>
            <SelectTrigger className="w-36 bg-stone-100 text-black font-semibold">
              <SelectValue placeholder={`Region: ${regionFilter}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="East">East</SelectItem>
              <SelectItem value="West">West</SelectItem>
              <SelectItem value="North">North</SelectItem>
              <SelectItem value="South">South</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setSortBy}>
            <SelectTrigger className="w-36 bg-stone-100 text-black font-semibold">
              <SelectValue placeholder={`Sort: ${sortBy}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Popular">Popular</SelectItem>
              <SelectItem value="Oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={() => setFollowUser(!followUser)}
            className={followUser ? "bg-amber-600" : "bg-slate-700"}
          >
            {followUser ? "Following You" : "Follow Me"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* === Map Section === */}
          <div
            className="lg:col-span-2 rounded-xl shadow-2xl"
            style={{ minHeight: "65vh" }}
          >
            <MapContainer
              whenCreated={(map) => (mapRef.current = map)}
              center={position}
              zoom={13}
              className="w-full h-full rounded-xl overflow-hidden" 
              scrollWheelZoom={true}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <Marker position={position} icon={userBlackIcon}>
                <Popup>You are here</Popup>
              </Marker>

              {destination && <Marker position={destination} icon={destinationIcon} />}
              {route.length > 0 && (
                <Polyline positions={route} pathOptions={{ color: "#f59e0b", weight: 5 }} />
              )}

              {filteredMonasteries.map((m) => (
                <Marker
                  key={m.id}
                  position={m.coords}
                  eventHandlers={{ click: () => getRoute(m.coords) }}
                >
                  <Popup>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="p-2 bg-stone-800 rounded-lg shadow-lg text-amber-50"
                    >
                      <h3 className="font-bold">{m.name}</h3>
                      <p className="text-sm">{m.description}</p>
                      <div className="flex gap-2 mt-2">
                        <Button
                          size="sm"
                          className="bg-amber-600"
                          onClick={() => getRoute(m.coords)}
                        >
                          Directions
                        </Button>
                      </div>
                    </motion.div>
                  </Popup>
                </Marker>
              ))}

              <FitRoute
                route={route}
                position={position}
                destination={destination}
                follow={followUser}
              />
              <FollowUser position={position} follow={followUser} />
            </MapContainer>
          </div>

          {/* === Directions Panel === */}
          <div className="lg:col-span-1">
            <Card className="bg-stone-800/70 border border-amber-600 h-[65vh] flex flex-col">
              <CardHeader className="shrink-0">
                <CardTitle className="text-lg text-amber-300">Directions</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto pr-2"> 
                <AnimatePresence>
                  {instructions.length > 0 ? (
                    <ol className="space-y-2">
                      {instructions.map((step, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="p-2 rounded bg-stone-700 text-amber-200 border border-amber-700"
                        >
                          {step.instruction}
                          <div className="text-xs text-amber-400">
                            {step.distance} km · {step.duration} min
                          </div>
                        </motion.li>
                      ))}
                    </ol>
                  ) : (
                    <p className="text-amber-400">No route selected.</p>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
