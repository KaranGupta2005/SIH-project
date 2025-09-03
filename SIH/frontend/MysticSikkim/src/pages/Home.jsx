import { FlipWords } from "@/components/ui/flipWords";
import { Vortex } from "@/components/ui/Vortex";
import { motion } from "motion/react";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div
        className="relative h-screen w-screen bg-center bg-cover bg-no-repeat overflow-hidden flex items-start justify-center"
        style={{ backgroundImage: "url('/sikkim_bg.webp')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/40 via-black/50 to-black/85"></div>

        {/* Content */}
        <Vortex
          particleCount={400}
          rangeY={200}
          hue={40}
          className="relative z-10 flex flex-col items-center justify-start text-center mt-20 px-4"
        >
          {/* FlipWords */}

          <h1 className="text-3xl md:text-6xl lg:text-7xl font-serif font-extrabold text-amber-500 tracking-wide drop-shadow-[0_3px_10px_rgba(0,0,0,0.85)]">
            <FlipWords words={["Unravel", "Unveil", "Unfold"]} />
          </h1>

          {/* Tagline */}

          <p className="mt-6 text-4xl md:text-4xl lg:text-5xl font-serif font-extrabold italic bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-transparent bg-clip-text drop-shadow-[0_3px_8px_rgba(0,0,0,0.8)]">
            The Mystic of Sikkim
          </p>

          {/* Button */}

          <div className="flex justify-center mt-12 items-center space-x-10">
            <NavLink to="/virtualTour">
              <motion.button
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="px-6 py-3 md:px-8 md:py-4 rounded-full border border-amber-700/70 text-amber-200 font-semibold text-lg backdrop-blur-sm bg-black/40 hover:bg-amber-600/40 hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 ease-in-out"
              >
                Explore Tours
              </motion.button>
            </NavLink>
            <NavLink to="/exploreMap">
              <motion.button
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="px-6 py-3 md:px-8 md:py-4 rounded-full border border-amber-700/70 text-amber-200 font-semibold text-lg backdrop-blur-sm bg-black/40 hover:bg-amber-600/40 hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 ease-in-out"
              >
                View Maps
              </motion.button>
            </NavLink>
          </div>
        </Vortex>
      </div>
    </>
  );
}
