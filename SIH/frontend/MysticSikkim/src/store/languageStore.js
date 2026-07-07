import { create } from "zustand";
import { persist } from "zustand/middleware";

// Multi-language support for key UI strings
const translations = {
  en: {
    home: "Home", virtualTour: "Virtual Tour", exploreMap: "Explore Map",
    archives: "Archives", calendar: "Calendar", travelGuide: "Travel Guide",
    contact: "Contact Us", login: "Login", signup: "Sign Up", dashboard: "Dashboard",
    logout: "Logout", search: "Search", close: "Close", viewTour: "View 360°",
    history: "History", highlights: "Highlights", timings: "Timings",
    nearby: "Nearby", audioGuide: "Audio Guide", share: "Share",
    weather: "Weather", reviews: "Reviews", tripPlanner: "Trip Planner",
    language: "Language", namaste: "Namaste",
    heroTitle: "360° Virtual Tour",
    heroDesc: "Step inside Sikkim's ancient monasteries. Explore their history, architecture, and spiritual significance.",
    noResults: "No monasteries found.",
  },
  hi: {
    home: "होम", virtualTour: "वर्चुअल टूर", exploreMap: "मैप देखें",
    archives: "अभिलेख", calendar: "कैलेंडर", travelGuide: "यात्रा गाइड",
    contact: "संपर्क करें", login: "लॉगिन", signup: "साइन अप", dashboard: "डैशबोर्ड",
    logout: "लॉगआउट", search: "खोजें", close: "बंद करें", viewTour: "360° देखें",
    history: "इतिहास", highlights: "मुख्य बातें", timings: "समय",
    nearby: "आस-पास", audioGuide: "ऑडियो गाइड", share: "शेयर करें",
    weather: "मौसम", reviews: "समीक्षा", tripPlanner: "यात्रा योजना",
    language: "भाषा", namaste: "नमस्ते",
    heroTitle: "360° वर्चुअल टूर",
    heroDesc: "सिक्किम के प्राचीन मठों में प्रवेश करें। उनके इतिहास, वास्तुकला और आध्यात्मिक महत्व का अन्वेषण करें।",
    noResults: "कोई मठ नहीं मिला।",
  },
  ne: {
    home: "गृहपृष्ठ", virtualTour: "भर्चुअल टूर", exploreMap: "नक्सा हेर्नुहोस्",
    archives: "अभिलेखालय", calendar: "पात्रो", travelGuide: "यात्रा गाइड",
    contact: "सम्पर्क", login: "लगइन", signup: "साइन अप", dashboard: "ड्यासबोर्ड",
    logout: "लगआउट", search: "खोज्नुहोस्", close: "बन्द", viewTour: "360° हेर्नुहोस्",
    history: "इतिहास", highlights: "मुख्य विशेषता", timings: "समय",
    nearby: "नजिकै", audioGuide: "अडियो गाइड", share: "साझा गर्नुहोस्",
    weather: "मौसम", reviews: "समीक्षा", tripPlanner: "यात्रा योजना",
    language: "भाषा", namaste: "नमस्ते",
    heroTitle: "360° भर्चुअल टूर",
    heroDesc: "सिक्किमका प्राचीन मठहरूमा प्रवेश गर्नुहोस्। तिनीहरूको इतिहास, वास्तुकला र आध्यात्मिक महत्व अन्वेषण गर्नुहोस्।",
    noResults: "कुनै मठ भेटिएन।",
  },
  bo: {
    home: "གཙོ་ངོས།", virtualTour: "དངོས་མེད་འཁོར་ལམ།", exploreMap: "ས་ཁྲ།",
    archives: "ཡིག་ཚགས།", calendar: "ལོ་ཐོ།", travelGuide: "འགྲུལ་བཞུད་ལམ་སྟོན།",
    contact: "འབྲེལ་གཏུགས།", login: "ནང་འཛུལ།", signup: "ཐོ་འགོད།", dashboard: "ལས་སྟེགས།",
    logout: "ཕྱིར་འཐོན།", search: "འཚོལ།", close: "སྒོ་རྒྱག", viewTour: "360° བལྟ།",
    history: "ལོ་རྒྱུས།", highlights: "གཙོ་གནད།", timings: "དུས་ཚོད།",
    nearby: "ཉེ་འགྲམ།", audioGuide: "སྒྲ་ལམ་སྟོན།", share: "མཉམ་སྤྱོད།",
    weather: "གནམ་གཤིས།", reviews: "བསམ་ཚུལ།", tripPlanner: "འགྲུལ་བཞུད་འཆར་གཞི།",
    language: "སྐད་ཡིག", namaste: "བཀྲ་ཤིས་བདེ་ལེགས།",
    heroTitle: "360° དངོས་མེད་འཁོར་ལམ།",
    heroDesc: "སིཀྐིམ་གྱི་དགོན་པ་རྙིང་པ་རྣམས་ལ་འཛུལ་ཞིག ། ལོ་རྒྱུས་དང་བཟོ་རིག་གཟིགས།",
    noResults: "དགོན་པ་མ་རྙེད།",
  },
};

const LANGUAGES = [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "ne", name: "Nepali", native: "नेपाली" },
  { code: "bo", name: "Tibetan", native: "བོད་སྐད།" },
];

const useLanguageStore = create(
  persist(
    (set, get) => ({
      currentLang: "en",
      setLang: (lang) => set({ currentLang: lang }),
      t: (key) => {
        const lang = get().currentLang;
        return translations[lang]?.[key] || translations.en[key] || key;
      },
      languages: LANGUAGES,
    }),
    { name: "mystic-sikkim-lang" }
  )
);

export default useLanguageStore;
