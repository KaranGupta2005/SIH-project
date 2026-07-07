import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import useLanguageStore from "@/store/languageStore";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "user" });
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState("");
  const navigate = useNavigate();
  const { signup, loading } = useAuthStore();
  const t = useLanguageStore((s) => s.t);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(formData);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background - monastery amber theme */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#3a1a0d] via-[#2a1208] to-[#1a0d07]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="absolute bg-amber-400/5 rounded-full animate-pulse"
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

      {/* Signup Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md bg-white/5 border border-amber-700/30">
          {/* Left Section (desktop only) */}
          <div className="hidden md:flex flex-1 flex-col items-center justify-center min-h-[600px] p-12 bg-gradient-to-br from-amber-800/20 via-amber-700/15 to-amber-900/20 backdrop-blur-md border-r border-amber-700/20">
            <div className="w-24 h-24 mb-6 border-3 border-amber-500 rounded-full overflow-hidden">
              <img src="/Logo.png" alt="MysticSikkim" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-white text-3xl font-bold mb-4 bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent">
              {t("createAccount")}
            </h3>
            <p className="text-amber-200/70 text-lg max-w-sm text-center leading-relaxed">
              {t("signupDesc")}
            </p>
            <div className="mt-8 text-center">
              <p className="text-amber-400/50 text-sm italic">
                "The mind is everything. What you think you become." — Buddha
              </p>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="flex-1 flex flex-col justify-center p-8 md:p-14 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-300 bg-clip-text text-transparent">
                {t("createAccount")}
              </h2>
              <p className="text-amber-200/60">{t("signupDesc")}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { field: "name", placeholder: t("fullName"), type: "text" },
                { field: "email", placeholder: t("email"), type: "email" },
                { field: "password", placeholder: `${t("password")} (min 6)`, type: "password" },
              ].map(({ field, placeholder, type }) => (
                <div key={field} className="relative">
                  <input
                    type={type}
                    name={field}
                    placeholder={placeholder}
                    value={formData[field]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(field)}
                    onBlur={() => setFocusedField("")}
                    className={`w-full px-5 py-4 bg-white/10 backdrop-blur-md border-2 rounded-2xl text-white placeholder-white/40 transition-all duration-300 focus:outline-none ${
                      focusedField === field
                        ? "border-amber-400 bg-white/15 shadow-lg shadow-amber-500/10 scale-[1.02]"
                        : "border-white/15 hover:border-amber-500/40"
                    }`}
                    required
                  />
                </div>
              ))}

              {/* Role selector */}
              <div className="relative">
                <label className="block text-xs text-amber-300/60 mb-1.5 ml-1">{t("role")}</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-white/10 backdrop-blur-md border-2 border-white/15 rounded-2xl text-white focus:outline-none focus:border-amber-400 transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="user" className="bg-stone-900 text-white">{t("user")}</option>
                  <option value="admin" className="bg-stone-900 text-white">{t("adminRole")}</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-bold text-lg text-white shadow-lg transition-all duration-300 ${
                  loading
                    ? "opacity-70 cursor-not-allowed bg-amber-700/50"
                    : "bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-amber-500/30 active:scale-95"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {t("creatingAccount")}
                  </div>
                ) : (
                  t("signup")
                )}
              </button>

              {error && (
                <div className="text-red-200 text-center bg-red-900/30 p-4 rounded-2xl border border-red-500/40 backdrop-blur-md">
                  {error}
                </div>
              )}

              <div className="text-center pt-5 border-t border-white/10">
                <p className="text-amber-200/50 text-sm mb-2">{t("haveAccount")}</p>
                <NavLink
                  to="/login"
                  className="text-amber-400 font-semibold hover:text-yellow-300 transition-colors"
                >
                  {t("login")} →
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
