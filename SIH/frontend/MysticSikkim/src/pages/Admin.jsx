import { useState, useEffect } from "react";
import { motion } from "motion/react";
import useAuthStore from "@/store/authStore";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const { user, token } = useAuthStore();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/dashboard");
      return;
    }
    fetchDashboard();
  }, [user]);

  const fetchDashboard = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      const json = await res.json();
      setData(json);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-900 via-amber-950 to-stone-900 flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-900 via-amber-950 to-stone-900 flex items-center justify-center">
        <p className="text-amber-400">Admin access required or failed to load data.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 via-amber-950 to-stone-900 text-amber-50 pb-16">
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-amber-200 mb-2">Admin Panel</h1>
          <p className="text-amber-400/60 text-sm mb-8">Content management and analytics overview.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Total Users", value: data.stats.totalUsers },
            { label: "Total Reviews", value: data.stats.totalReviews },
            { label: "Trip Plans", value: data.stats.totalTrips },
            { label: "Search Queries", value: data.stats.totalSearches },
          ].map((stat) => (
            <div key={stat.label} className="bg-stone-800/50 border border-amber-800/30 rounded-xl p-4">
              <p className="text-2xl font-bold text-amber-100">{stat.value}</p>
              <p className="text-[11px] text-amber-500/50">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {["overview", "users", "reviews", "searches"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === tab ? "bg-amber-600 text-white" : "text-amber-400/60 hover:bg-stone-800/50"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Top Searches */}
            <div className="bg-stone-800/40 border border-amber-800/30 rounded-xl p-5">
              <h3 className="text-sm font-bold text-amber-200 mb-4">Top Searches (All Time)</h3>
              <div className="space-y-2">
                {data.topSearches.map((s, i) => (
                  <div key={s.query} className="flex items-center justify-between p-2 bg-stone-700/30 rounded-lg">
                    <span className="text-xs text-amber-200">#{i + 1} {s.query}</span>
                    <span className="text-[10px] text-amber-500/50">{s.count} searches</span>
                  </div>
                ))}
                {data.topSearches.length === 0 && <p className="text-xs text-amber-500/40">No searches yet.</p>}
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="bg-stone-800/40 border border-amber-800/30 rounded-xl p-5">
              <h3 className="text-sm font-bold text-amber-200 mb-4">Recent Reviews</h3>
              <div className="space-y-2">
                {data.recentReviews.slice(0, 5).map((r) => (
                  <div key={r._id} className="p-2 bg-stone-700/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-amber-200 font-medium">{r.monasteryName}</span>
                      <span className="text-[10px] text-amber-400">{"★".repeat(r.rating)}</span>
                    </div>
                    <p className="text-[11px] text-amber-300/60 mt-1 line-clamp-1">{r.comment}</p>
                  </div>
                ))}
                {data.recentReviews.length === 0 && <p className="text-xs text-amber-500/40">No reviews yet.</p>}
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="bg-stone-800/40 border border-amber-800/30 rounded-xl p-5">
            <h3 className="text-sm font-bold text-amber-200 mb-4">All Users ({data.recentUsers.length})</h3>
            <div className="space-y-2">
              {data.recentUsers.map((u) => (
                <div key={u._id} className="flex items-center justify-between p-3 bg-stone-700/30 rounded-lg">
                  <div>
                    <p className="text-sm text-amber-200">{u.name}</p>
                    <p className="text-[10px] text-amber-500/50">{u.email}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${u.role === "admin" ? "bg-red-900/40 text-red-300" : "bg-stone-600/40 text-stone-300"}`}>
                    {u.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="bg-stone-800/40 border border-amber-800/30 rounded-xl p-5">
            <h3 className="text-sm font-bold text-amber-200 mb-4">All Reviews</h3>
            <div className="space-y-2">
              {data.recentReviews.map((r) => (
                <div key={r._id} className="p-3 bg-stone-700/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-amber-200 font-medium">{r.monasteryName}</span>
                    <span className="text-xs text-amber-400">{"★".repeat(r.rating)} by {r.userName}</span>
                  </div>
                  <p className="text-xs text-amber-300/60 mt-1">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "searches" && (
          <div className="bg-stone-800/40 border border-amber-800/30 rounded-xl p-5">
            <h3 className="text-sm font-bold text-amber-200 mb-4">Search Analytics</h3>
            <div className="space-y-2">
              {data.topSearches.map((s, i) => (
                <div key={s.query} className="flex items-center gap-3 p-3 bg-stone-700/30 rounded-lg">
                  <span className="text-xs text-amber-500/50 w-6">#{i + 1}</span>
                  <span className="text-sm text-amber-200 flex-1">{s.query}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 rounded-full bg-stone-600 overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.min(100, (s.count / (data.topSearches[0]?.count || 1)) * 100)}%` }} />
                    </div>
                    <span className="text-[10px] text-amber-400/50 w-8 text-right">{s.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
