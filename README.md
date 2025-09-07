# MysticSikkim 🌄✨
*A Digital Heritage Platform for Sikkim’s Monasteries*  

MysticSikkim is a web-based platform designed to **digitize and showcase the monasteries of Sikkim** through immersive technologies.  
It combines **virtual tours, digital archives, cultural events, and smart tourism integration** – making Sikkim’s spiritual and cultural treasures accessible to tourists, researchers, and locals.  

---

## 🚀 Features

### 🏯 Monastery360 – Virtual Tours
- 360° panoramic walkthrough of monastery interiors and surroundings.  
- Narrated audio guides in multiple languages.  
- Hotspots for murals, scriptures, and artifacts with detailed info.  

### 🗺️ Interactive Map
- Geo-tagged monastery locations with routes and directions.  
- Nearby attractions (restaurants, hotels, tourist spots) powered by Places API.  
- Travel integration for planning trips.  

### 📜 Digital Archives
- Scanned manuscripts, murals, and documents.  
- AI-powered search & categorization for easy research.  

### 🎧 Smart Audio Guide
- Location-based narration using **GPS / Bluetooth beacons**.  
- Offline mode support for remote monastery areas.  

### 📅 Cultural Calendar
- Upcoming monastery festivals, events, and rituals.  
- Booking and participation options for tourists.  

### 🌐 Offline Support (PWA)
- Website works offline with cached monastery info and assets.  
- Installable as a mobile/web app.  

---

## 🛠️ Tech Stack

- **Frontend:** React, TailwindCSS, Framer Motion, Aceternity UI  
- **Mapping & Geo Services:** Google Maps API / Mapbox, Places API, Directions API  
- **3D & VR:** Three.js, Panolens.js for 360° tours  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (monastery details, events, user data)  
- **AI/ML:** NLP-powered search & categorization, Text-to-Speech APIs for narration  
- **PWA & Offline:** Service Workers, IndexedDB for caching data  

---

## 📂 Project Structure
MysticSikkim/
├── public/ # Static files (manifest.json, icons, 360° assets)
├── src/
│ ├── components/ # UI components (Navbar, Cards, Modals, etc.)
│ ├── pages/ # Main pages (Home, Map, Archives, Calendar)
│ ├── services/ # API integrations (Maps, Places, Audio Guide)
│ ├── assets/ # Images, audio narrations, etc.
│ └── App.js # Root React file
├── backend/ # Node.js + Express API server
├── package.json
└── README.md


---

## ⚡ How to Run

1. Clone this repo:
   ```bash
   git clone https://github.com/<your-username>/MysticSikkim.git
   cd MysticSikkim


Install dependencies:

npm install


Create a .env file and add:

REACT_APP_GOOGLE_MAPS_KEY=your_api_key_here


Start development server:

npm start


Build production version:

npm run build

🎯 Impact

Tourism Boost: Virtual + on-site experiences attract more tourists.

Cultural Preservation: Digital archiving saves endangered manuscripts & murals.

Community Empowerment: Local monks, guides & artisans can contribute.

Education & Research: Provides structured access to global scholars & students.

👥 Team MysticSikkim

Developers: [Your Team Names]

Domain Experts: [Mentors / Guides]

Role in SIH: Preserving Sikkim’s heritage with cutting-edge digital solutions.

🏆 Acknowledgements

Special thanks to SIH 2025, mentors, and the Sikkim tourism & monastery communities who inspired this project.
