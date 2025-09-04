import { motion } from "motion/react";
import { MapPin, Globe, Calendar, Archive, BookOpen, Headphones, Shield, Gift, ChevronRight } from "lucide-react";

const monasteryFeatures = [
  {
    icon: <Globe className="w-10 h-10" />,
    title: "Virtual Tours",
    description: "Explore major monasteries in 360° with immersive virtual tours.",
    color: "from-amber-400 to-yellow-500"
  },
  {
    icon: <MapPin className="w-10 h-10" />,
    title: "Interactive Map",
    description: "Locate monasteries, view travel routes, nearby attractions, and planning tools.",
    color: "from-amber-500 to-amber-700"
  },
  {
    icon: <Calendar className="w-10 h-10" />,
    title: "Cultural Calendar",
    description: "Stay updated with festivals, rituals, and monastery events across Sikkim.",
    color: "from-yellow-400 to-amber-600"
  },
  {
    icon: <Archive className="w-10 h-10" />,
    title: "Digital Archives",
    description: "Access historical manuscripts, murals, photos, and documents digitally.",
    color: "from-yellow-500 to-amber-700"
  },
  {
    icon: <BookOpen className="w-10 h-10" />,
    title: "Smart Journaling",
    description: "Document your experiences and reflections on Sikkim monasteries with AI suggestions.",
    color: "from-orange-400 to-amber-500"
  },
  {
    icon: <Headphones className="w-10 h-10" />,
    title: "Audio Guide",
    description: "Listen to narrated walkthroughs and learn about monastery history and culture.",
    color: "from-amber-400 to-yellow-600"
  },
  {
    icon: <Shield className="w-10 h-10" />,
    title: "Secure Access",
    description: "Your data is safe with encrypted storage and secure authentication.",
    color: "from-green-400 to-amber-500"
  },
  {
    icon: <Gift className="w-10 h-10" />,
    title: "Completely Free",
    description: "All features are accessible without subscriptions or locked content.",
    color: "from-teal-400 to-yellow-500"
  }
];

export default function FeaturesSection() {
  return (
    <section className="px-6 py-24 bg-gradient-to-br from-gray-900 via-amber-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Discover the Key Features of{' '}
            <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
              MysticSikkim
            </span>
          </h2>
          <p className="text-xl opacity-80 max-w-3xl mx-auto leading-relaxed">
            Experience Sikkim's monasteries like never before — immersive tours, interactive maps, cultural insights, and digital archives at your fingertips.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {monasteryFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group relative p-8 rounded-3xl transition-all duration-500 hover:scale-105 cursor-pointer bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 shadow-lg hover:shadow-2xl"
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-25 transition-opacity duration-500 blur-2xl`}></div>

              {/* Content */}
              <div className="relative z-10 text-center flex flex-col items-center">
                <div className={`inline-flex p-5 rounded-3xl bg-gradient-to-r ${feature.color} text-white mb-6 shadow-xl`}>
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="opacity-80 leading-relaxed mb-4">{feature.description}</p>

                <div className="mt-4 flex justify-center items-center text-amber-400 group-hover:text-yellow-400 transition-colors">
                  <span className="font-semibold">Learn More</span>
                  <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
