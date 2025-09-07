import { Button } from "../components/ui/button";
import { Filter, Search, MapPin, Calendar, X } from "lucide-react";
import { useState , useEffect } from "react";
import {Input} from "@/components/ui/input.jsx";
import {archiveData} from "../../public/info/archive.js";
import {ArchiveCard} from "@/components/ui/ArchiveCard.jsx";


export function SearchBar({ query, setQuery }) {
    return (
        <div className="flex items-center gap-2 w-full max-w-sm bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md border border-amber-200">
            <Search className="w-5 h-5 text-amber-600 ml-2" />
            <Input
                type="text"
                placeholder="Search archives..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-700 placeholder-gray-500 bg-transparent flex-grow"
            />
            {query && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full"
                    onClick={() => setQuery('')}
                >
                    <X className="h-4 w-4" />
                </Button>
            )}
        </div>
    );
}

// Sample data for different categories


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
                    (item.type && item.type.toLowerCase().includes(searchTerm.toLowerCase())))
            )
        }else {
            setFilteredItems(items);
        }
    }, [activeTab, searchTerm])

    const getConditionColor = (condition) => {
        switch (condition?.toLowerCase()) {
            case 'excellent': return 'text-green-600 bg-green-50';
            case 'well preserved': return 'text-green-600 bg-green-50';
            case 'good': return 'text-blue-600 bg-blue-50';
            case 'fragile': return 'text-orange-600 bg-orange-50';
            case 'restored': return 'text-purple-600 bg-purple-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };



    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 ">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <header className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-orange-200/50 p-4 mb-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-orange-800">Digital Archives</h1>
                        <div className="flex items-center gap-4">
                            <SearchBar query={searchTerm} setQuery={setSearchTerm} />
                            <button className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                                <Filter className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </header>

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
                        <ArchiveCard
                            key={item.id}
                            item={item}
                            onSelect={setSelectedItem}
                            getConditionColor={getConditionColor}
                        />
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className={'text-center py-12'}>
                        <div className={'text-gray-400 text-6xl mb-4'}>
                            📚
                        </div>
                        <h3 className={'text-xl font-semibold text-gray-600 mb-2'}>No archives found </h3>
                        <p className={'text-gray-500'}>
                            Try adjusting your search terms or browse different categories.
                        </p>

                    </div>
                ) }
            </div>

            {/* Modal for selected item */}
            {selectedItem && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm  flex items-center justify-center p-4 z-50" onClick={() => setSelectedItem(null)}>
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
                                            <span className={`px-2 py-1 rounded-full text-sm ${getConditionColor(selectedItem.condition)}`}>
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