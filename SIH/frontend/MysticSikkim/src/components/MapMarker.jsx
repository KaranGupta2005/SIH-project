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

// 📍 Arrow Icon for User (rotates with heading)
const userArrowIcon = (heading) =>
    new L.DivIcon({
        className: "custom-user-icon",
        html: `<div style="
      transform: rotate(${heading}deg);
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <img src="https://cdn-icons-png.flaticon.com/512/64/64113.png"
           style="width: 32px; height: 32px;" />
    </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
    });

const destinationIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // red flag
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

// 🔹 Recenter on route (so full route fits in view)
function FitRoute({ route, position, destination, follow }) {
    const map = useMap();
    useEffect(() => {
        if (!follow && route.length > 0 && destination) {
            map.fitBounds([position, destination], { padding: [50, 50] });
        }
    }, [route, position, destination, follow, map]);
    return null;
}

// 🔹 Follow user (navigation mode)
function FollowUser({ position, follow }) {
    const map = useMap();
    useEffect(() => {
        if (follow && position) {
            map.setView(position, 18); // zoom into street level
        }
    }, [position, follow, map]);
    return null;
}

export default function LiveMap() {
    const [position, setPosition] = useState([28.6139, 77.2090]); // Default Delhi
    const [heading, setHeading] = useState(0);
    const smoothHeading = useSmoothHeading(heading);
    const [route, setRoute] = useState([]);
    const [destination, setDestination] = useState(null);
    const [search, setSearch] = useState("");
    const [followUser, setFollowUser] = useState(false);
    const [instructions, setInstructions] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const YOUR_API_KEY = 'enter yours'
    // 🔹 Track user live
    useEffect(() => {
        if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition(
                (pos) => {
                    const newPos = [pos.coords.latitude, pos.coords.longitude];
                    setPosition(newPos);
                    if (pos.coords.heading !== null) {
                        setHeading(pos.coords.heading); // degrees from north
                    }

                    // update active step
                    if (instructions.length > 0) {
                        let closestStep = 0;
                        let minDist = Infinity;
                        instructions.forEach((step, i) => {
                            if (step.waypoint) {
                                const d = Math.sqrt(
                                    Math.pow(step.waypoint[0] - newPos[0], 2) +
                                    Math.pow(step.waypoint[1] - newPos[1], 2)
                                );
                                if (d < minDist) {
                                    minDist = d;
                                    closestStep = i;
                                }
                            }
                        });
                        setActiveStep(closestStep);
                    }
                },
                (err) => console.error(err),
                { enableHighAccuracy: true }
            );
            return () => navigator.geolocation.clearWatch(watchId);
        }
    }, [instructions]);

    // 🔹 Smoothly animate heading changes
    function useSmoothHeading(targetHeading, speed = 5) {
        const [displayHeading, setDisplayHeading] = useState(targetHeading);

        useEffect(() => {
            let frame;
            const animate = () => {
                setDisplayHeading((prev) => {
                    const diff = targetHeading - prev;

                    // wrap around 360 (shortest rotation path)
                    let delta = ((diff + 540) % 360) - 180;

                    if (Math.abs(delta) < 0.5) return targetHeading; // close enough
                    return (prev + delta / speed + 360) % 360;
                });
                frame = requestAnimationFrame(animate);
            };

            frame = requestAnimationFrame(animate);
            return () => cancelAnimationFrame(frame);
        }, [targetHeading, speed]);

        return displayHeading;
    }

    // 🔹 Fetch route + instructions from OpenRouteService
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

            // Extract turn-by-turn instructions
            const steps =
                data.features[0].properties.segments[0].steps.map((step) => ({
                    instruction: step.instruction,
                    distance: (step.distance / 1000).toFixed(2), // km
                    duration: Math.round(step.duration / 60), // minutes
                    waypoint: step.way_points ? coords[step.way_points[0]] : null,
                }));
            setInstructions(steps);
            setActiveStep(0);
        } catch (error) {
            console.error("Error fetching route:", error);
        }
    };

    // 🔹 Convert search text → coordinates using Nominatim
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
            } else {
                alert("Location not found!");
            }
        } catch (error) {
            console.error("Error searching location:", error);
        }
    };

    return (
        <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
            {/* 🗺️ Map */}
            <div style={{ flex: 3, position: "relative" }}>
                {/* 🔍 Search + Buttons */}
                <div
                    style={{
                        position: "absolute",
                        top: 15,
                        left: 55,
                        zIndex: 1000,
                        background: "white",
                        padding: "10px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    }}
                >
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Enter destination..."
                        style={{
                            padding: "6px",
                            width: "220px",
                            marginRight: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    />
                    <button
                        onClick={searchLocation}
                        style={{
                            padding: "6px 12px",
                            background: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            marginRight: "5px",
                        }}
                    >
                        Search
                    </button>

                    <button
                        onClick={() => setFollowUser(!followUser)}
                        style={{
                            padding: "6px 12px",
                            background: followUser ? "green" : "gray",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        {followUser ? "Following You" : "Follow Me"}
                    </button>
                </div>

                <MapContainer
                    center={position}
                    zoom={14}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                    />
                    {/* User Marker (rotating arrow) */}
                    {position && (
                        <Marker position={position} icon={userArrowIcon(smoothHeading)}></Marker>
                    )}
                    {/* Destination Marker */}
                    {destination && (
                        <Marker position={destination} icon={destinationIcon}></Marker>
                    )}
                    {/* Route */}
                    {route.length > 0 && <Polyline positions={route} color="blue" />}
                    {/* Auto-fit route */}
                    <FitRoute
                        route={route}
                        position={position}
                        destination={destination}
                        follow={followUser}
                    />
                    {/* Follow user (toggle) */}
                    <FollowUser position={position} follow={followUser} />
                </MapContainer>
            </div>

            {/* 📋 Turn-by-turn Instructions */}
            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "15px",
                    background: "#f8f9fa",
                    borderLeft: "1px solid #ddd",
                }}
            >
                <h3>Directions</h3>
                {instructions.length > 0 ? (
                    <ol>
                        {instructions.map((step, idx) => (
                            <li
                                key={idx}
                                style={{
                                    marginBottom: "12px",
                                    fontWeight: idx === activeStep ? "bold" : "normal",
                                    color: idx === activeStep ? "#007bff" : "black",
                                }}
                            >
                                {step.instruction}
                                <br />
                                <small>
                                    {step.distance} km · {step.duration} min
                                </small>
                            </li>
                        ))}
                    </ol>
                ) : (
                    <p>No route selected.</p>
                )}
            </div> 
        </div>
    );
}
