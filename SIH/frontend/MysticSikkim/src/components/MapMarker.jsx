"use client";

import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion, AnimatePresence } from "framer-motion";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// 🔹 Custom hook MUST be outside component
function useSmoothHeading(targetHeading, speed = 5) {
  const [displayHeading, setDisplayHeading] = useState(targetHeading);

  useEffect(() => {
    let frame;
    const animate = () => {
      setDisplayHeading((prev) => {
        const diff = targetHeading - prev;
        let delta = ((diff + 540) % 360) - 180;
        if (Math.abs(delta) < 0.5) return targetHeading;
        return (prev + delta / speed + 360) % 360;
      });
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [targetHeading, speed]);

  return displayHeading;
}

// 📍 User icon with arrow
const userArrowIcon = (heading) =>
  new L.DivIcon({
    className: "custom-user-icon",
    html: `<div style="transform: rotate(${heading}deg); width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
      <img src="https://cdn-icons-png.flaticon.com/512/64/64113.png" style="width: 32px; height: 32px;" />
    </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

const destinationIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// 🔹 Auto-fit route view
function FitRoute({ route, position, destination, follow }) {
  const map = useMap();
  useEffect(() => {
    if (!follow && route.length > 0 && destination) {
      map.fitBounds([position, destination], { padding: [50, 50] });
    }
  }, [route, position, destination, follow, map]);
  return null;
}

// 🔹 Follow user mode
function FollowUser({ position, follow }) {
  const map = useMap();
  useEffect(() => {
    if (follow && position) {
      map.setView(position, 18);
    }
  }, [position, follow, map]);
  return null;
}

// Main component
export default function LiveMap() {
  const [position, setPosition] = useState([28.6139, 77.209]);
  const [heading, setHeading] = useState(0);
  const smoothHeading = useSmoothHeading(heading);
  const [route, setRoute] = useState([]);
  const [destination, setDestination] = useState(null);
  const [search, setSearch] = useState("");
  const [followUser, setFollowUser] = useState(false);
  const [instructions, setInstructions] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

  const YOUR_API_KEY =
    "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjJjYjNlYTlkNjIyYjQ0MGJhZjgwODI3MDJhYmU0MmYwIiwiaCI6Im11cm11cjY0In0=";

  // 🔹 Track live user
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const newPos = [pos.coords.latitude, pos.coords.longitude];
          setPosition(newPos);
          if (pos.coords.heading !== null) {
            setHeading(pos.coords.heading);
          }
        },
        (err) => console.error(err),
        { enableHighAccuracy: true }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  // 🔹 Fetch route
  const getRoute = async (destCoords) => {
    try {
      const res = await fetch(
        `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${YOUR_API_KEY}&start=${position[1]},${position[0]}&end=${destCoords[1]},${destCoords[0]}`
      );
      const data = await res.json();
      const coords = data.features[0].geometry.coordinates.map((c) => [
        c[1],
        c[0],
      ]);
      setRoute(coords);

      const steps = data.features[0].properties.segments[0].steps.map((step) => ({
        instruction: step.instruction,
        distance: (step.distance / 1000).toFixed(2),
        duration: Math.round(step.duration / 60),
        waypoint: step.way_points ? coords[step.way_points[0]] : null,
      }));
      setInstructions(steps);
      setActiveStep(0);
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  // 🔹 Search destination
  const searchLocation = async () => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          search
        )}`
      );
      const data = await res.json();
      if (data.length > 0) {
        const dest = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        setDestination(dest);
        getRoute(dest);
      }
    } catch (error) {
      console.error("Error searching location:", error);
    }
  };

  return (
    <div className="flex h-screen w-screen">
      {/* 🗺️ Map */}
      <div className="relative flex-[3]">
        {/* 🔍 Search Panel */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute top-4 left-6 z-[1000] bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl flex gap-3 border border-gray-200"
        >
          <Input
            placeholder="Enter destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 border-gray-300 focus:ring-2 focus:ring-indigo-500"
          />
          <Button
            onClick={searchLocation}
            className="bg-indigo-600 hover:bg-indigo-500 shadow-md"
          >
            Search
          </Button>
          <Button
            onClick={() => setFollowUser(!followUser)}
            className={cn(
              "transition shadow-md",
              followUser
                ? "bg-green-600 hover:bg-green-500"
                : "bg-gray-600 hover:bg-gray-500"
            )}
          >
            {followUser ? "Following You" : "Follow Me"}
          </Button>
        </motion.div>

        <MapContainer
          center={position}
          zoom={14}
          className="h-full w-full rounded-xl overflow-hidden shadow-lg"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {position && (
            <Marker position={position} icon={userArrowIcon(smoothHeading)} />
          )}
          {destination && <Marker position={destination} icon={destinationIcon} />}
          {route.length > 0 && <Polyline positions={route} color="blue" />}
          <FitRoute
            route={route}
            position={position}
            destination={destination}
            follow={followUser}
          />
          <FollowUser position={position} follow={followUser} />
        </MapContainer>
      </div>

      {/* 📋 Directions */}
      <motion.div
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-1 bg-gradient-to-b from-gray-50 to-gray-100 border-l border-gray-200 overflow-y-auto"
      >
        <Card className="m-6 shadow-xl border border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-indigo-700">
              Directions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="popLayout">
              {instructions.length > 0 ? (
                <ol className="space-y-4">
                  {instructions.map((step, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        "p-4 rounded-lg shadow-sm border",
                        idx === activeStep
                          ? "bg-indigo-100 text-indigo-700 border-indigo-300 font-semibold"
                          : "bg-white text-gray-700 border-gray-200"
                      )}
                    >
                      {step.instruction}
                      <div className="text-sm text-gray-500 mt-1">
                        {step.distance} km · {step.duration} min
                      </div>
                    </motion.li>
                  ))}
                </ol>
              ) : (
                <p className="text-gray-500">No route selected.</p>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
