import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Fake API call
      console.log("Login data:", formData);
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        {/* Particles */}
        {Array.from({ length: 25 }, (_, i) => (
          <div
            key={i}
            className="absolute bg-indigo-300/10 rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 30 + 10}px`,
              height: `${Math.random() * 30 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 4 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Login Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div
          className={`flex ${
            isMobile ? "flex-col" : "flex-row"
          } w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md bg-white/5 border border-white/10`}
        >
          {/* Left Section (only desktop) */}
          {!isMobile && (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[600px] p-12 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-violet-600/20 backdrop-blur-md border-r border-white/10 relative">
              <h3 className="text-white text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                Welcome Back ✨
              </h3>
              <p className="text-white/80 text-lg max-w-sm text-center">
                Log in to continue your journey. Discover wisdom, connect with
                your inner self, and keep growing.
              </p>
            </div>
          )}

          {/* Right Section - Form */}
          <div
            className={`flex-1 flex flex-col justify-center ${
              isMobile ? "p-8" : "p-16"
            } bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md relative`}
          >
            {/* Mobile header */}
            {isMobile && (
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-indigo-400/30 to-purple-500/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-indigo-300/30">
                  <div className="text-3xl">🔑</div>
                </div>
                <h3 className="text-white text-2xl font-bold mb-2 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                  Login
                </h3>
                <p className="text-white/80 text-sm">
                  Continue your spiritual journey
                </p>
              </div>
            )}

            {/* Desktop header */}
            {!isMobile && (
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
                  Login to Your Account
                </h2>
                <p className="text-white/70 text-lg">
                  Enter your credentials to continue
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                {
                  field: "email",
                  icon: "📧",
                  placeholder: "Email Address",
                  type: "email",
                },
                {
                  field: "password",
                  icon: "🔒",
                  placeholder: "Password",
                  type: "password",
                },
              ].map(({ field, icon, placeholder, type }) => (
                <div key={field} className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-300/70 text-lg z-10">
                    {icon}
                  </div>
                  <input
                    type={type}
                    name={field}
                    placeholder={placeholder}
                    value={formData[field]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(field)}
                    onBlur={() => setFocusedField("")}
                    className={`w-full pl-14 pr-6 py-4 bg-white/10 backdrop-blur-md border-2 rounded-2xl text-white placeholder-white/50 transition-all duration-300 ${
                      focusedField === field
                        ? "border-indigo-400 bg-white/20 shadow-lg shadow-indigo-500/20 scale-105"
                        : "border-white/20 hover:border-indigo-300/50"
                    }`}
                    required
                  />
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400/20 to-purple-400/20 opacity-0 transition-opacity duration-300 pointer-events-none ${
                      focusedField === field ? "opacity-100" : ""
                    }`}
                  ></div>
                </div>
              ))}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-bold text-lg text-white shadow-lg transition-all duration-300 relative overflow-hidden group ${
                  loading
                    ? "opacity-70 cursor-not-allowed bg-indigo-600/50"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/30 active:scale-95"
                }`}
              >
                <span className="relative z-10">
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Logging in...
                    </div>
                  ) : (
                    "🔑 Login"
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              {error && (
                <div className="text-red-200 text-center bg-red-600/20 p-4 rounded-2xl border border-red-400/40 backdrop-blur-md animate-pulse">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xl">⚠️</span>
                    {error}
                  </div>
                </div>
              )}

              {/* Bottom link */}
              <div className="text-center pt-6 border-t border-white/10">
                <p className="text-white/70 text-sm mb-3">
                  Don’t have an account?
                </p>
                <NavLink
                  to="/signup"
                  className="text-indigo-400 font-semibold hover:text-purple-300 transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-white/5 inline-block"
                >
                  ✨ Sign Up
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
