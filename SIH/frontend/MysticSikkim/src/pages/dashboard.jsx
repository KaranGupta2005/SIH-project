import { useState, useMemo, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
import useAuthStore from "@/store/authStore";
import useOfflineStore from "@/store/offlineStore";
import useGamificationStore from "@/store/gamificationStore";
import {
  MapPin, Calendar, Heart, Camera, Mountain,
  Plane, Hotel, Star, Clock, Edit, BookOpen,
  Map, Settings, TrendingUp, Compass, LogOut, Wifi, WifiOff,
  Award, Zap,
} from "lucide-react";

const daysUntil = (dateString) => {
  const trip = new Date(dateString);
  const today = new Date();
  const diff = Math.ceil((trip - today) / (1000 * 3600 * 24));
  if (diff < 0) return "Past";
  if (diff === 0) return "Today!";
  if (diff === 1) return "Tomorrow";
  return `in ${diff} days`;
};

// Animated counter
function AnimatedNumber({ value, duration = 1000 }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = value / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value, duration]);
  return <span>{display}</span>;
}

export default function Dashboard() {
  const authUser = useAuthStore((s) => s.user);
  const isOnline = useOfflineStore((s) => s.isOnline);
  const { monasteries, monasteriesLoaded, loadMonasteries, lastSync } = useOfflineStore();
  const { xp, level, unlockedBadges, visitedMonasteries, streakDays, getBadges } = useGamificationStore();
  const allBadges = getBadges();

  useEffect(() => {
    if (!monasteriesLoaded) loadMonasteries();
  }, [monasteriesLoaded]);

  const [user] = useState({
    name: authUser?.name || "Explorer",
    avatar: authUser?.avatar || "/Logo.png",
    joinDate: authUser?.createdAt ? new Date(authUser.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "July 2025",
    tripsCompleted: 3,
    placesVisited: 12,
    daysExplored: 15,
    contributorLevel: "Sikkim Explorer",
  });

  const [upcomingTrips] = useState([
    { id: 1, destination: "Pelling", date: "2025-10-15", status: "confirmed", days: 3 },
    { id: 2, destination: "Yuksom", date: "2025-11-05", status: "pending", days: 2 },
    { id: 3, destination: "Lachung", date: "2025-12-20", status: "pending", days: 4 },
  ]);

  const [recentActivity] = useState([
    { id: 1, text: "Explored Rumtek Monastery virtual tour", time: "2 days ago", type: "tour" },
    { id: 2, text: "Saved Gurudongmar Lake to wishlist", time: "1 week ago", type: "save" },
    { id: 3, text: "Used AI guide for Phodong history", time: "1 week ago", type: "ai" },
    { id: 4, text: "Viewed Tashiding archives", time: "2 weeks ago", type: "archive" },
  ]);

  const [savedPlaces] = useState([
    { id: 1, name: "Gurudongmar Lake", image: "https://imgs.search.brave.com/VXF2s9yk6Ns6jY-vzS2Eay3EJmnI3FTeth8fBYhqqX8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9ibG9n/LnRvdXJpc21zaWtr/aW0uaW4vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjEvMTAvZ3Vy/dWRvbmdtYXItMzAw/eDIxMC5qcGc", category: "Lake" },
    { id: 2, name: "Rumtek Monastery", image: "https://static.toiimg.com/thumb/msid-48330676,width-550,height-433/48330676.jpg", category: "Monastery" },
    { id: 3, name: "Yumthang Valley", image: "https://imgs.search.brave.com/gq7anSue6mKGYmbh_w5U9ZydReqT-oaHQ96Ouey4Cck/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8w/LzA1L1l1bXRoYW5n/X1ZhbGxleV8yLmpw/Zw", category: "Valley" },
    { id: 4, name: "Tashiding Monastery", image: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tashiding_Monastery_in_West_Sikkim_05.jpg", category: "Monastery" },
  ]);

  const progress = useMemo(() => Math.min((user.placesVisited / 20) * 100, 100), [user.placesVisited]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 via-amber-950 to-stone-900 text-amber-50 pb-16">
      <div className="max-w-7xl mx-auto px-6 pt-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-16 w-16 rounded-full border-2 border-amber-500/60 object-cover shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                <TrendingUp className="h-3 w-3 text-black" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-amber-100">
                Namaste, {user.name}! 🏔️
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-amber-400/60">{user.contributorLevel}</span>
                <span className="text-xs text-amber-600/40">·</span>
                <span className="flex items-center gap-1 text-xs">
                  {isOnline ? <Wifi className="w-3 h-3 text-green-400" /> : <WifiOff className="w-3 h-3 text-red-400" />}
                  <span className={isOnline ? "text-green-400" : "text-red-400"}>{isOnline ? "Online" : "Offline"}</span>
                </span>
              </div>
              {/* Progress bar */}
              <div className="mt-2 flex items-center gap-2">
                <div className="w-32 h-1.5 rounded-full bg-stone-700 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
                  />
                </div>
                <span className="text-[10px] text-amber-500/60">{user.placesVisited}/20</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <NavLink to="/exploremap" className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-sm rounded-lg font-medium transition-all shadow-md">
              Start Exploring
            </NavLink>
            <NavLink to="/virtualtour" className="px-4 py-2 border border-amber-700/50 text-amber-300 text-sm rounded-lg font-medium hover:bg-amber-900/30 transition-all">
              Virtual Tour
            </NavLink>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Trips", value: user.tripsCompleted, icon: Mountain },
            { label: "Places Visited", value: user.placesVisited, icon: MapPin },
            { label: "Days Explored", value: user.daysExplored, icon: Compass },
            { label: "Monasteries Available", value: monasteries.length, icon: Star },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="bg-stone-800/50 border border-amber-800/30 rounded-xl p-4 group hover:border-amber-600/40 transition-all"
            >
              <stat.icon className="h-4 w-4 text-amber-500/70 mb-2" />
              <p className="text-2xl font-bold text-amber-100">
                <AnimatedNumber value={stat.value} />
              </p>
              <p className="text-[11px] text-amber-500/50 mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Gamification — XP & Badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-stone-800/40 border border-amber-800/30 rounded-xl p-5 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-600/20 flex items-center justify-center border border-amber-600/30">
                <Zap className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-amber-200">Level {level}</p>
                <p className="text-[10px] text-amber-500/50">{xp} XP · {streakDays} day streak · {visitedMonasteries.length} explored</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-amber-400/60">{xp % 50}/50 XP to next level</p>
              <div className="w-24 h-1.5 rounded-full bg-stone-700 mt-1 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full" style={{ width: `${(xp % 50) / 50 * 100}%` }} />
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {allBadges.map((badge) => {
              const unlocked = unlockedBadges.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] border transition-all ${
                    unlocked
                      ? "bg-amber-900/40 border-amber-600/40 text-amber-200"
                      : "bg-stone-700/30 border-stone-600/20 text-stone-500"
                  }`}
                  title={badge.desc}
                >
                  <Award className={`w-3 h-3 ${unlocked ? "text-amber-400" : "text-stone-600"}`} />
                  {badge.name}
                  {unlocked && <span className="text-[9px] text-amber-500/60">+{badge.xp}</span>}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
          {/* Upcoming Trips */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-stone-800/40 border border-amber-800/30 rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-amber-200">Upcoming Trips</h3>
              <Calendar className="h-4 w-4 text-amber-600/60" />
            </div>
            <div className="space-y-2.5">
              {upcomingTrips.map((trip) => (
                <div key={trip.id} className="p-3 bg-stone-700/30 border border-amber-900/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-amber-100">{trip.destination}</p>
                      <p className="text-[11px] text-amber-500/50 mt-0.5">{daysUntil(trip.date)} · {trip.days} days</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      trip.status === "confirmed" ? "bg-green-900/40 text-green-300 border border-green-700/30" : "bg-yellow-900/40 text-yellow-300 border border-yellow-700/30"
                    }`}>
                      {trip.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <NavLink to="/calendar" className="block mt-4 text-center py-2.5 bg-amber-700/80 hover:bg-amber-600 text-white text-xs rounded-lg font-semibold transition-all">
              + Plan New Trip
            </NavLink>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-stone-800/40 border border-amber-800/30 rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-amber-200">Recent Activity</h3>
              <Clock className="h-4 w-4 text-amber-600/60" />
            </div>
            <div className="space-y-1">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-stone-700/30 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-amber-100/80 leading-relaxed">{item.text}</p>
                    <p className="text-[10px] text-amber-600/40 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-stone-800/40 border border-amber-800/30 rounded-xl p-5"
          >
            <h3 className="text-sm font-bold text-amber-200 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { icon: Map, label: "Map", to: "/exploremap", color: "text-orange-400" },
                { icon: Mountain, label: "Tours", to: "/virtualtour", color: "text-amber-400" },
                { icon: BookOpen, label: "Archives", to: "/archives", color: "text-green-400" },
                { icon: Calendar, label: "Calendar", to: "/calendar", color: "text-blue-400" },
                { icon: Plane, label: "Travel Guide", to: "/travel-guide", color: "text-cyan-400" },
                { icon: Settings, label: "Settings", to: "#", color: "text-gray-400" },
              ].map((action) => (
                <NavLink
                  key={action.label}
                  to={action.to}
                  className="flex flex-col items-center justify-center p-3 bg-stone-700/30 border border-amber-900/20 rounded-lg hover:bg-amber-900/20 hover:border-amber-700/40 transition-all"
                >
                  <action.icon className={`h-5 w-5 ${action.color} mb-1.5`} />
                  <span className="text-[11px] font-medium text-amber-200/80">{action.label}</span>
                </NavLink>
              ))}
            </div>

            {/* Sync status */}
            {lastSync && (
              <div className="mt-4 pt-3 border-t border-amber-800/20 text-center">
                <p className="text-[10px] text-amber-600/40">
                  Last synced: {new Date(lastSync).toLocaleTimeString()}
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Wishlist */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-stone-800/40 border border-amber-800/30 rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-bold text-amber-200">Your Wishlist</h3>
            <span className="text-[10px] text-amber-500/50 bg-amber-900/30 px-2 py-0.5 rounded-full border border-amber-700/20">
              {savedPlaces.length} saved
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {savedPlaces.map((place) => (
              <div key={place.id} className="group relative rounded-xl overflow-hidden border border-amber-800/20 hover:border-amber-600/40 transition-all cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={place.image} alt={place.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-xs font-semibold text-white truncate">{place.name}</p>
                  <p className="text-[10px] text-amber-300/70">{place.category}</p>
                </div>
                <div className="absolute top-2 right-2">
                  <Heart className="h-3.5 w-3.5 text-red-400 fill-red-400" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
