import { useState, useEffect } from "react";

// Gangtok coordinates
const LAT = 27.3389;
const LNG = 88.6065;

const weatherCodes = {
  0: "Clear", 1: "Mostly Clear", 2: "Partly Cloudy", 3: "Overcast",
  45: "Foggy", 48: "Rime Fog", 51: "Light Drizzle", 53: "Drizzle",
  55: "Heavy Drizzle", 61: "Light Rain", 63: "Rain", 65: "Heavy Rain",
  71: "Light Snow", 73: "Snow", 75: "Heavy Snow", 80: "Rain Showers",
  81: "Heavy Showers", 82: "Violent Showers", 95: "Thunderstorm",
};

export default function WeatherWidget({ compact = false }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LNG}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=Asia/Kolkata&forecast_days=5`
        );
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.warn("Weather fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse bg-stone-800/40 border border-amber-800/30 rounded-xl p-4 h-24" />
    );
  }

  if (!weather?.current) return null;

  const current = weather.current;
  const daily = weather.daily;
  const temp = Math.round(current.temperature_2m);
  const condition = weatherCodes[current.weather_code] || "Unknown";
  const humidity = current.relative_humidity_2m;
  const wind = Math.round(current.wind_speed_10m);

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-xs text-amber-300/70">
        <span className="text-lg">{temp}°C</span>
        <span className="text-amber-500/50">·</span>
        <span>{condition}</span>
      </div>
    );
  }

  return (
    <div className="bg-stone-800/40 border border-amber-800/30 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-amber-200">Gangtok Weather</h3>
        <span className="text-[10px] text-amber-500/40">Live</span>
      </div>

      {/* Current */}
      <div className="flex items-center gap-4 mb-4">
        <div>
          <p className="text-3xl font-bold text-amber-100">{temp}°C</p>
          <p className="text-xs text-amber-400/60">{condition}</p>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-2 text-[11px] text-amber-300/60">
          <span>Humidity: {humidity}%</span>
          <span>Wind: {wind} km/h</span>
        </div>
      </div>

      {/* 5-day forecast */}
      {daily && (
        <div className="flex gap-2 pt-3 border-t border-amber-800/20">
          {daily.time.slice(0, 5).map((date, i) => {
            const day = new Date(date).toLocaleDateString("en", { weekday: "short" });
            const max = Math.round(daily.temperature_2m_max[i]);
            const min = Math.round(daily.temperature_2m_min[i]);
            return (
              <div key={date} className="flex-1 text-center">
                <p className="text-[10px] text-amber-500/50">{day}</p>
                <p className="text-xs text-amber-200 font-medium mt-0.5">{max}°</p>
                <p className="text-[10px] text-amber-500/40">{min}°</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
