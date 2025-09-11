import { useState, useEffect } from "react";
import { 
  MapPin, 
  Calendar, 
  Heart, 
  User, 
  Camera, 
  Mountain, 
  Plane, 
  Hotel,
  Star,
  Clock,
  Navigation,
  Edit,
  BookOpen,
  Map,
  Settings
} from "lucide-react";

// Helper function to calculate days until a future date
const daysUntil = (dateString) => {
  const tripDate = new Date(dateString);
  const today = new Date();
  const differenceInTime = tripDate.getTime() - today.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  if (differenceInDays < 0) return "Past";
  if (differenceInDays === 0) return "Today!";
  if (differenceInDays === 1) return "Tomorrow";
  return `in ${differenceInDays} days`;
};

export default function DashBoard() {
  const [user] = useState({
    name: "Varun",
    avatar: "/Logo.png", // Using your logo as a placeholder avatar
    joinDate: "March 2024",
    tripsCompleted: 3,
    placesVisited: 12,
    daysExplored: 15,
    contributorLevel: "Sikkim Explorer"
  });

  const [recentActivities] = useState([
    { id: 1, type: "review", place: "Tsomgo Lake", date: "2 days ago", rating: 5, link: "#" },
    { id: 2, type: "booking", place: "Mayfair Spa Resort", date: "1 week ago", status: "confirmed", link: "#" },
    { id: 3, type: "photo", place: "Nathula Pass", date: "2 weeks ago", photoCount: 12, link: "#" }
  ]);

  const [upcomingTrips] = useState([
    { id: 1, destination: "Pelling", date: "2025-10-15", status: "confirmed" },
    { id: 2, destination: "Yuksom", date: "2025-11-05", status: "pending" }
  ]);

  const [savedPlaces] = useState([
    { id: 1, name: "Gurudongmar Lake", image: "https://imgs.search.brave.com/VXF2s9yk6Ns6jY-vzS2Eay3EJmnI3FTeth8fBYhqqX8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9ibG9n/LnRvdXJpc21zaWtr/aW0uaW4vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjEvMTAvZ3Vy/dWRvbmdtYXItMzAw/eDIxMC5qcGc", category: "High-Altitude Lake" },
    { id: 2, name: "Rumtek Monastery", image: "https://static.toiimg.com/thumb/msid-48330676,width-550,height-433/48330676.jpg", category: "Monastery" },
    { id: 3, name: "Yumthang Valley", image: "https://imgs.search.brave.com/gq7anSue6mKGYmbh_w5U9ZydReqT-oaHQ96Ouey4Cck/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8w/LzA1L1l1bXRoYW5n/X1ZhbGxleV8yLmpw/Zw", category: "Valley of Flowers" }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf6e8] to-[#f7eace] p-6 pt-28">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#3a1a0d] mb-2">
            Your Mystic Dashboard, {user.name}! 🏔️
          </h1>
          <p className="text-amber-800 text-lg">This is your command center for all things Sikkim.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Trips Completed Card */}
          <div className="group relative bg-gradient-to-br from-amber-50 to-orange-100 rounded-xl p-6 shadow-lg border border-amber-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-amber-800 text-sm font-medium">Trips Completed</p>
                <p className="text-4xl font-bold text-[#3a1a0d] mt-1">{user.tripsCompleted}</p>
              </div>
              <Mountain className="h-8 w-8 text-amber-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="mt-4">
              <p className="text-amber-800 text-sm font-medium">Days Explored</p>
              <p className="text-xl font-semibold text-[#3a1a0d]">{user.daysExplored}</p>
            </div>
            <a href="#" className="absolute bottom-4 right-4 text-xs text-amber-700 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              View History &rarr;
            </a>
          </div>
          
          {/* Places Visited Card */}
          <div className="group relative bg-gradient-to-br from-amber-50 to-orange-100 rounded-xl p-6 shadow-lg border border-amber-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-amber-800 text-sm font-medium">Places Visited</p>
                <p className="text-4xl font-bold text-[#3a1a0d] mt-1">{user.placesVisited}</p>
              </div>
              <MapPin className="h-8 w-8 text-amber-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="mt-4">
              <p className="text-amber-800 text-sm font-medium">Highest Altitude</p>
              <p className="text-xl font-semibold text-[#3a1a0d]">17,800 ft</p>
            </div>
            <a href="#" className="absolute bottom-4 right-4 text-xs text-amber-700 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              View Journal &rarr;
            </a>
          </div>

          {/* Saved Places Card */}
          <div className="group relative bg-gradient-to-br from-amber-50 to-orange-100 rounded-xl p-6 shadow-lg border border-amber-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-amber-800 text-sm font-medium">Saved Places</p>
                <p className="text-4xl font-bold text-[#3a1a0d] mt-1">{savedPlaces.length}</p>
              </div>
              <Heart className="h-8 w-8 text-amber-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="mt-4">
              <p className="text-amber-800 text-sm font-medium">Categories</p>
              <p className="text-xl font-semibold text-[#3a1a0d]">3</p>
            </div>
            <a href="#saved-places" className="absolute bottom-4 right-4 text-xs text-amber-700 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              View Wishlist &rarr;
            </a>
          </div>

          {/* User Profile Card */}
          <div className="group relative bg-gradient-to-br from-amber-50 to-orange-100 rounded-xl p-6 shadow-lg border border-amber-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center">
            <img src={user.avatar} alt="User Avatar" className="h-16 w-16 rounded-full border-2 border-amber-300 object-cover mb-3"/>
            <p className="text-lg font-bold text-[#3a1a0d]">{user.contributorLevel}</p>
            <p className="text-xs text-amber-700">Member since {user.joinDate}</p>
            <a href="#" className="absolute top-3 right-3 text-amber-600 hover:text-[#3a1a0d] opacity-0 group-hover:opacity-100 transition-opacity">
              <Edit size={18} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Trips */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-amber-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#3a1a0d]">Upcoming Trips</h2>
              <Calendar className="h-5 w-5 text-amber-700" />
            </div>
            <div className="space-y-4">
              {upcomingTrips.map((trip) => (
                <div key={trip.id} className="p-4 bg-amber-50/50 rounded-lg hover:bg-amber-100/60 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-amber-900">{trip.destination}</p>
                      <p className="text-sm text-amber-700">{daysUntil(trip.date)}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      trip.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {trip.status}
                    </span>
                  </div>
                  <a href="#" className="text-xs text-amber-800 font-semibold mt-2 inline-block hover:underline">Manage &rarr;</a>
                </div>
              ))}
              <button className="w-full py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-all shadow-md hover:shadow-lg">
                + Plan a New Mystic Trip
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-amber-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#3a1a0d]">Recent Activity</h2>
              <Clock className="h-5 w-5 text-amber-700" />
            </div>
            <div className="space-y-1">
              {recentActivities.map((activity) => (
                <a href={activity.link} key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-amber-50/50 transition-colors">
                  <div className="flex-shrink-0 bg-amber-100/80 p-2 rounded-full">
                    {activity.type === 'review' && <Star className="h-5 w-5 text-yellow-600" />}
                    {activity.type === 'booking' && <Hotel className="h-5 w-5 text-cyan-600" />}
                    {activity.type === 'photo' && <Camera className="h-5 w-5 text-purple-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-amber-900">
                      {activity.type === 'review' && `You reviewed ${activity.place}`}
                      {activity.type === 'booking' && `Booked ${activity.place}`}
                      {activity.type === 'photo' && `Added ${activity.photoCount} photos of ${activity.place}`}
                    </p>
                    <p className="text-xs text-amber-700">{activity.date}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-amber-200">
            <h2 className="text-xl font-semibold text-[#3a1a0d] mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center p-4 bg-amber-100/50 rounded-lg hover:bg-amber-100 hover:scale-105 transition-all">
                <Map className="h-6 w-6 text-orange-600 mb-2" />
                <span className="text-sm font-medium text-amber-900">Explore Map</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-amber-100/50 rounded-lg hover:bg-amber-100 hover:scale-105 transition-all">
                <BookOpen className="h-6 w-6 text-green-600 mb-2" />
                <span className="text-sm font-medium text-amber-900">Travel Guide</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-amber-100/50 rounded-lg hover:bg-amber-100 hover:scale-105 transition-all">
                <Plane className="h-6 w-6 text-blue-600 mb-2" />
                <span className="text-sm font-medium text-amber-900">Plan Trip</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-amber-100/50 rounded-lg hover:bg-amber-100 hover:scale-105 transition-all">
                <Settings className="h-6 w-6 text-gray-600 mb-2" />
                <span className="text-sm font-medium text-amber-900">Settings</span>
              </button>
            </div>
          </div>
        </div>

        {/* Saved Places */}
        <div id="saved-places" className="mt-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-amber-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#3a1a0d]">Your Wishlist</h2>
            <Heart className="h-5 w-5 text-amber-700" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {savedPlaces.map((place) => (
              <div key={place.id} className="group cursor-pointer relative overflow-hidden rounded-lg shadow-md">
                <img 
                  src={place.image} 
                  alt={place.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="font-bold text-white text-lg">{place.name}</h3>
                  <p className="text-sm text-amber-200">{place.category}</p>
                </div>
                <div className="absolute top-3 right-3 p-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                  <Heart className="h-5 w-5 text-white fill-white" />
                </div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="px-4 py-2 bg-amber-600 text-white rounded-md font-semibold mb-3">View Details</button>
                  <button className="text-white text-sm hover:underline">Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
