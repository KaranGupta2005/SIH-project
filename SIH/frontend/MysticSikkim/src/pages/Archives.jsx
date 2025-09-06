import { Button } from "../components/ui/button";
import { Filter, Search, Eye, MapPin, Calendar, X } from "lucide-react";
import { useState , useEffect } from "react";

// Sample data for different categories
const archiveData = {
    manuscripts: [
        {
            id: 1,
            title: "Prajñāpāramitā Sutra",
            monastery: "Rumtek Monastery",
            date: "17th Century",
            description: "Ancient Buddhist text written on palm leaves, containing wisdom teachings on the perfection of wisdom. This manuscript is one of the oldest preserved texts in Sikkim's monastic libraries.",
            thumbnail: "/Psutra.jpg",
            fullImage: "/Psutra.jpg",
            type: "Religious Text",
            language: "Sanskrit/Tibetan",
            condition: "Well Preserved"
        },
        {
            id: 2,
            title: "Monastery Chronicle",
            monastery: "Pemayangtse Monastery",
            date: "18th Century",
            description: "Historical record of the monastery's founding and early years, including details about the monks, benefactors, and important events.",
            thumbnail: "/api/placeholder/300/200",
            fullImage: "/api/placeholder/800/600",
            type: "Historical Document",
            language: "Tibetan",
            condition: "Fragile"
        },
        {
            id: 3,
            title: "Tantric Ritual Manual",
            monastery: "Tashiding Monastery",
            date: "16th Century",
            description: "Detailed instructions for Buddhist tantric practices and rituals, hand-copied by monastery scribes with intricate calligraphy.",
            thumbnail: "/api/placeholder/300/200",
            fullImage: "/api/placeholder/800/600",
            type: "Ritual Text",
            language: "Tibetan",
            condition: "Good"
        },
        {
            id: 4,
            title: "Medical Treatise",
            monastery: "Enchey Monastery",
            date: "19th Century",
            description: "Traditional Tibetan medicine manuscript detailing herbal remedies and diagnostic techniques used by monastery physicians.",
            thumbnail: "/api/placeholder/300/200",
            fullImage: "/api/placeholder/800/600",
            type: "Medical Text",
            language: "Tibetan",
            condition: "Good"
        },
        {
            id: 5,
            title: "Philosophical Commentary",
            monastery: "Rumtek Monastery",
            date: "18th Century",
            description: "Commentary on Madhyamaka philosophy by a renowned Sikkimese scholar, featuring marginal notes and annotations.",
            thumbnail: "/api/placeholder/300/200",
            fullImage: "/api/placeholder/800/600",
            type: "Philosophical Text",
            language: "Tibetan",
            condition: "Well Preserved"
        },
        {
            id: 6,
            title: "Prayer Collection",
            monastery: "Dubdi Monastery",
            date: "17th Century",
            description: "Collection of daily prayers and liturgical texts used in monastery ceremonies, written in gold ink on dark paper.",
            thumbnail: "/api/placeholder/300/200",
            fullImage: "/api/placeholder/800/600",
            type: "Liturgical Text",
            language: "Tibetan",
            condition: "Restored"
        }
    ],
    murals: [
        {
            id: 7,
            title: "Wheel of Life Mural",
            monastery: "Rumtek Monastery",
            date: "20th Century",
            description: "Detailed depiction of the Buddhist Wheel of Life (Bhavachakra) showing the six realms of existence and the cycle of rebirth.",
            thumbnail: "/api/placeholder/300/200",
            fullImage: "/api/placeholder/800/600",
            type: "Religious Art",
            condition: "Excellent"
        },
        {
            id: 8,
            title: "Padmasambhava Stories",
            monastery: "Pemayangtse Monastery",
            date: "18th Century",
            description: "Series of murals depicting the life and teachings of Guru Padmasambhava, the founder of Tibetan Buddhism.",
            thumbnail: "/api/placeholder/300/200",
            fullImage: "/api/placeholder/800/600",
            type: "Biographical Art",
            condition: "Good"
        }
    ],
    photos: [
        {
            id: 9,
            title: "Historical Monastery Views",
            monastery: "Various",
            date: "Early 20th Century",
            description: "Black and white photographs documenting the monasteries as they appeared in the early 1900s.",
            thumbnail: "/api/placeholder/300/200",
            fullImage: "/api/placeholder/800/600",
            type: "Historical Photography"
        }
    ],
    documents: [
        {
            id: 10,
            title: "Land Grant Document",
            monastery: "Tashiding Monastery",
            date: "19th Century",
            description: "Official document granting land to the monastery by the Chogyal of Sikkim, written on traditional paper with royal seal.",
            thumbnail: "/api/placeholder/300/200",
            fullImage: "/api/placeholder/800/600",
            type: "Legal Document"
        }
    ]
};

const tabs = [
    { id: 'manuscripts', label: 'Manuscripts', count: archiveData.manuscripts.length },
    { id: 'murals', label: 'Murals', count: archiveData.murals.length },
    { id: 'photos', label: 'Photos', count: archiveData.photos.length },
    { id: 'documents', label: 'Documents', count: archiveData.documents.length }
];


export default function Archives() {
    const [activeTab, setActiveTab] = useState('manuscripts');
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        const items = archiveData[activeTab] || [];
        if(searchTerm){
            setFilteredItems(
                items.filter(item =>  item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.monastery.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.type.toLowerCase().includes(searchTerm.toLowerCase()))
            )
        }else {
            setFilteredItems(items);
        }
    }, [activeTab, searchTerm])

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 ">
            <header className="bg-white shadow-sm border-b border-orange-200">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-orange-800">Digital Archives</h1>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <input
                                    type="text"
                                    placeholder="Search archives..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-64"
                                />
                            </div>
                            <button className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                                <Filter className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-wrap gap-2 mb-8">
                    {tabs.map((tab) => (
                        <Button key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                                    activeTab === tab.id ? "bg-orange-600 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600 shadow-sm"
                                }`}>
                            {tab.label}
                            <span className={`px-2 py-1 rounded-full text-xs ${
                                activeTab === tab.id
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-gray-200 text-gray-600'
                            }`}>
                {tab.count}
              </span>
                        </Button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {filteredItems.map((item) => (
                        <div key={item.id}
                             className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
                             onClick={() => setSelectedItem(item)}>
                            <div className="relative">
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium`}>
                    {item.condition}
                  </span>
                                </div>
                                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                                    <Eye className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300 h-8 w-8" />
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                                <div className="space-y-2 text-sm text-gray-600 mb-4">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        {item.monastery}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        {item.date}
                                    </div>
                                    <div className="text-xs bg-gray-100 px-2 py-1 rounded-full inline-block">
                                        {item.type}
                                    </div>
                                </div>
                                <p className="text-gray-700 text-sm line-clamp-3">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for selected item */}
            {selectedItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedItem(null)}>
                    <div className="bg-white rounded-xl max-w-4xl max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
                        <div className="relative">
                            <img
                                src={selectedItem.fullImage}
                                alt={selectedItem.title}
                                className="w-full h-64 object-cover"
                            />
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="p-6">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedItem.title}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-orange-600" />
                                        <span className="font-medium">Monastery:</span>
                                        <span>{selectedItem.monastery}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-orange-600" />
                                        <span className="font-medium">Date:</span>
                                        <span>{selectedItem.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">Type:</span>
                                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm">
                      {selectedItem.type}
                    </span>
                                    </div>
                                    {selectedItem.language && (
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">Language:</span>
                                            <span>{selectedItem.language}</span>
                                        </div>
                                    )}
                                    {selectedItem.condition && (
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">Condition:</span>
                                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                        {selectedItem.condition}
                      </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-3">Description</h3>
                                <p className="text-gray-700 leading-relaxed">{selectedItem.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}