import { useState, useEffect } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
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

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Signup data:", formData);
      // Add your signup logic here
    } catch (err) {
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Animated Buddha SVG Component
  const AnimatedBuddha = () => {
    const [breathe, setBreathe] = useState(false);
    const [showAura, setShowAura] = useState(false);

    useEffect(() => {
      const breatheTimer = setInterval(() => setBreathe(prev => !prev), 4000);
      const auraTimer = setInterval(() => setShowAura(prev => !prev), 6000);
      return () => {
        clearInterval(breatheTimer);
        clearInterval(auraTimer);
      };
    }, []);

    return (
      <div className="relative flex items-center justify-center">
        {/* Sacred Mandala Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-80 h-80 rounded-full border-2 border-amber-400/30 transition-all duration-6000 ${
            showAura ? 'scale-110 opacity-60' : 'scale-100 opacity-30'
          }`}>
            <div className="absolute inset-4 rounded-full border border-yellow-300/20"></div>
            <div className="absolute inset-8 rounded-full border border-amber-300/15"></div>
            <div className="absolute inset-12 rounded-full border border-yellow-400/10"></div>
          </div>
        </div>

        {/* Floating Lotus Petals */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-8 bg-gradient-to-t from-pink-300 to-pink-100 rounded-full opacity-20"
              style={{
                top: '50%',
                left: '50%',
                transformOrigin: '2px 120px',
                transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                animation: `float 8s ease-in-out infinite ${i * 0.5}s`
              }}
            />
          ))}
        </div>

        {/* Main Buddha Figure */}
        <div className={`relative z-10 transition-all duration-4000 ${
          breathe ? 'scale-105' : 'scale-100'
        }`}>
          <svg width="280" height="320" viewBox="0 0 280 320" className="drop-shadow-2xl">
            {/* Enlightenment Aura */}
            <defs>
              <radialGradient id="auraGradient" cx="50%" cy="30%" r="60%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3"/>
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.1"/>
                <stop offset="100%" stopColor="#d97706" stopOpacity="0"/>
              </radialGradient>
              <linearGradient id="buddhaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b"/>
                <stop offset="50%" stopColor="#d97706"/>
                <stop offset="100%" stopColor="#b45309"/>
              </linearGradient>
            </defs>
            
            <ellipse cx="140" cy="160" rx="130" ry="140" fill="url(#auraGradient)" className="animate-pulse"/>

            {/* Lotus Throne Base */}
            <ellipse cx="140" cy="280" rx="60" ry="20" fill="url(#buddhaGradient)" opacity="0.3"/>
            <path d="M85 275 Q115 260 140 275 Q165 260 195 275 Q170 290 140 280 Q110 290 85 275" fill="url(#buddhaGradient)" opacity="0.4"/>
            
            {/* Additional lotus petals */}
            <path d="M100 270 Q120 255 140 270" fill="#ec4899" opacity="0.3"/>
            <path d="M140 270 Q160 255 180 270" fill="#ec4899" opacity="0.3"/>
            <path d="M120 275 Q140 265 160 275" fill="#f97316" opacity="0.2"/>

            {/* Body - meditation posture */}
            <ellipse cx="140" cy="180" rx="45" ry="60" fill="url(#buddhaGradient)" opacity="0.9"/>
            
            {/* Flowing robes with detailed folds */}
            <path d="M100 140 Q140 150 180 140 L185 250 Q140 265 95 250 Z" fill="url(#buddhaGradient)" opacity="0.7"/>
            <path d="M105 150 Q140 160 175 150" stroke="#b45309" strokeWidth="1.5" fill="none" opacity="0.4"/>
            <path d="M110 170 Q140 180 170 170" stroke="#b45309" strokeWidth="1.5" fill="none" opacity="0.4"/>
            <path d="M115 190 Q140 200 165 190" stroke="#b45309" strokeWidth="1.5" fill="none" opacity="0.4"/>
            
            {/* Arms in Dhyana mudra (meditation pose) */}
            <ellipse cx="110" cy="180" rx="12" ry="25" fill="url(#buddhaGradient)" opacity="0.85" transform="rotate(-25 110 180)"/>
            <ellipse cx="170" cy="180" rx="12" ry="25" fill="url(#buddhaGradient)" opacity="0.85" transform="rotate(25 170 180)"/>
            
            {/* Head with serene expression */}
            <circle cx="140" cy="100" r="50" fill="url(#buddhaGradient)" opacity="0.95"/>
            
            {/* Ushnisha (cranial protuberance) - symbol of wisdom */}
            <circle cx="140" cy="70" r="22" fill="url(#buddhaGradient)" opacity="0.8"/>
            <path d="M120 62 Q140 45 160 62 Q150 50 140 50 Q130 50 120 62" fill="url(#buddhaGradient)" opacity="0.7"/>
            
            {/* Hair details */}
            <circle cx="125" cy="75" r="3" fill="#92400e" opacity="0.6"/>
            <circle cx="140" cy="72" r="3" fill="#92400e" opacity="0.6"/>
            <circle cx="155" cy="75" r="3" fill="#92400e" opacity="0.6"/>
            <circle cx="132" cy="80" r="2" fill="#92400e" opacity="0.5"/>
            <circle cx="148" cy="80" r="2" fill="#92400e" opacity="0.5"/>

            {/* Peaceful facial features */}
            {/* Eyes - half-closed in meditation */}
            <path d="M125 95 Q130 98 135 95" stroke="#374151" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M145 95 Q150 98 155 95" stroke="#374151" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <circle cx="127" cy="97" r="1" fill="#374151" opacity="0.7"/>
            <circle cx="153" cy="97" r="1" fill="#374151" opacity="0.7"/>
            
            {/* Third eye - symbol of spiritual insight */}
            <circle cx="140" cy="85" r="3" fill="#fbbf24" opacity="0.8"/>
            <circle cx="140" cy="85" r="1.5" fill="#f59e0b"/>
            
            {/* Serene smile */}
            <path d="M130 115 Q140 125 150 115" stroke="#374151" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7"/>
            
            {/* Nose */}
            <path d="M140 105 L140 110" stroke="#b45309" strokeWidth="1" opacity="0.4"/>
            
            {/* Earlobes - elongated (sign of nobility) */}
            <ellipse cx="105" cy="105" rx="8" ry="12" fill="url(#buddhaGradient)" opacity="0.8"/>
            <ellipse cx="175" cy="105" rx="8" ry="12" fill="url(#buddhaGradient)" opacity="0.8"/>
            
            {/* Meditation mudra hands */}
            <ellipse cx="140" cy="200" rx="18" ry="12" fill="url(#buddhaGradient)" opacity="0.95"/>
            <ellipse cx="135" cy="200" rx="8" ry="5" fill="url(#buddhaGradient)" opacity="0.8"/>
            <ellipse cx="145" cy="200" rx="8" ry="5" fill="url(#buddhaGradient)" opacity="0.8"/>
            <circle cx="140" cy="198" r="4" fill="#fbbf24" opacity="0.6"/>
            
            {/* Legs in lotus position */}
            <ellipse cx="115" cy="250" rx="20" ry="12" fill="url(#buddhaGradient)" opacity="0.8" transform="rotate(-15 115 250)"/>
            <ellipse cx="165" cy="250" rx="20" ry="12" fill="url(#buddhaGradient)" opacity="0.8" transform="rotate(15 165 250)"/>
            
            {/* Feet details */}
            <ellipse cx="110" cy="255" rx="8" ry="6" fill="#b45309" opacity="0.6"/>
            <ellipse cx="170" cy="255" rx="8" ry="6" fill="#b45309" opacity="0.6"/>
            
            {/* Dharma wheel symbol on chest */}
            <circle cx="140" cy="160" r="8" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.4"/>
            <circle cx="140" cy="160" r="3" fill="#fbbf24" opacity="0.3"/>
            {[...Array(8)].map((_, i) => (
              <line
                key={i}
                x1="140"
                y1="160"
                x2={140 + 6 * Math.cos(i * Math.PI / 4)}
                y2={160 + 6 * Math.sin(i * Math.PI / 4)}
                stroke="#fbbf24"
                strokeWidth="1"
                opacity="0.3"
              />
            ))}

            {/* Floating energy orbs */}
            <circle cx="170" cy="120" r="3" fill="#fbbf24" opacity="0.6" className="animate-ping"/>
            <circle cx="110" cy="140" r="2" fill="#f59e0b" opacity="0.5" className="animate-ping" style={{animationDelay: '0.5s'}}/>
            <circle cx="180" cy="180" r="2" fill="#fcd34d" opacity="0.4" className="animate-ping" style={{animationDelay: '1s'}}/>
            <circle cx="100" cy="200" r="2" fill="#fbbf24" opacity="0.5" className="animate-ping" style={{animationDelay: '1.5s'}}/>
          </svg>
        </div>

        {/* Sacred mantras floating around */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-12 left-8 text-amber-300/30 text-sm font-serif animate-pulse">ॐ</div>
          <div className="absolute top-20 right-12 text-yellow-400/25 text-xs rotate-12 animate-pulse" style={{animationDelay: '1s'}}>peace</div>
          <div className="absolute bottom-24 left-16 text-amber-400/30 text-sm rotate-[-15deg] animate-pulse" style={{animationDelay: '2s'}}>☸</div>
          <div className="absolute bottom-16 right-8 text-yellow-300/25 text-xs font-serif animate-pulse" style={{animationDelay: '0.5s'}}>dharma</div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-amber-900 via-orange-800 to-yellow-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        {/* Animated particles */}
        {Array.from({ length: 25 }, (_, i) => (
          <div
            key={i}
            className="absolute bg-amber-300/10 rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 40 + 10}px`,
              height: `${Math.random() * 40 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 4 + 2}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
        {/* Flowing gradient waves */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-full h-full bg-gradient-to-r from-amber-500/20 via-transparent to-yellow-500/20 animate-pulse"></div>
        </div>
      </div>

      {/* Signup Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div
          className={`flex ${
            isMobile ? "flex-col" : "flex-row"
          } w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md bg-white/5 border border-white/10`}
        >
          {/* Left Section with Animated Buddha */}
          {!isMobile && (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[700px] p-12 bg-gradient-to-br from-amber-500/10 via-orange-600/10 to-yellow-500/10 backdrop-blur-md border-r border-white/10 relative">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-yellow-600/5 rounded-l-3xl"></div>
              
              <div className="relative z-10 text-center">
                <AnimatedBuddha />
                
                <div className="mt-8 space-y-4">
                  <h3 className="text-white text-3xl font-bold bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent">
                    Discover Inner Peace
                  </h3>
                  <p className="text-white/80 text-lg leading-relaxed max-w-md">
                    Begin your spiritual journey through the sacred monasteries of Sikkim. 
                    Find wisdom, peace, and enlightenment.
                  </p>
                  
                  {/* Spiritual quotes that rotate */}
                  <div className="mt-6 h-16 flex items-center justify-center">
                    <p className="text-amber-200/80 text-sm italic font-light text-center px-4 animate-pulse">
                      "The mind is everything. What you think you become." - Buddha
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right Section - Enhanced Form */}
          <div
            className={`flex-1 flex flex-col justify-center ${
              isMobile ? "p-8" : "p-16"
            } bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md relative`}
          >
            {/* Mobile Buddha */}
            {isMobile && (
              <div className="text-center mb-8">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-amber-400/20 to-yellow-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-amber-300/30">
                  <div className="text-4xl">🧘‍♂️</div>
                </div>
                <h3 className="text-white text-2xl font-bold mb-2 bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent">
                  Join MysticSikkim
                </h3>
                <p className="text-white/80 text-sm">Embark on your spiritual journey</p>
              </div>
            )}

            {/* Enhanced Form Header */}
            {!isMobile && (
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-300 bg-clip-text text-transparent">
                  Begin Your Journey
                </h2>
                <p className="text-white/70 text-lg">Create your account to explore sacred wisdom</p>
              </div>
            )}

            {/* Enhanced Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { field: "name", icon: "👤", placeholder: "Full Name", type: "text" },
                { field: "email", icon: "📧", placeholder: "Email Address", type: "email" },
                { field: "password", icon: "🔒", placeholder: "Password", type: "password" }
              ].map(({ field, icon, placeholder, type }) => (
                <div key={field} className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-300/70 text-lg z-10">
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
                        ? 'border-amber-400 bg-white/20 shadow-lg shadow-amber-500/20 scale-105' 
                        : 'border-white/20 hover:border-amber-300/50'
                    }`}
                    required
                  />
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/20 to-yellow-400/20 opacity-0 transition-opacity duration-300 pointer-events-none ${
                    focusedField === field ? 'opacity-100' : ''
                  }`}></div>
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-bold text-lg text-white shadow-lg transition-all duration-300 relative overflow-hidden group ${
                  loading
                    ? "opacity-70 cursor-not-allowed bg-amber-600/50"
                    : "bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/30 active:scale-95"
                }`}
              >
                <span className="relative z-10">
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating Your Sacred Account...
                    </div>
                  ) : (
                    "🚀 Begin Your Spiritual Journey"
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              {error && (
                <div className="text-red-200 text-center bg-red-600/20 p-4 rounded-2xl border border-red-400/40 backdrop-blur-md animate-pulse">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xl">⚠️</span>
                    {error}
                  </div>
                </div>
              )}

              <div className="text-center pt-6 border-t border-white/10">
                <p className="text-white/70 text-sm mb-3">Already on your spiritual path?</p>
                <button
                  type="button"
                  className="text-amber-400 font-semibold hover:text-yellow-300 transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-white/5"
                  onClick={() => console.log("Navigate to login")}
                >
                  ✨ Continue Your Journey
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

