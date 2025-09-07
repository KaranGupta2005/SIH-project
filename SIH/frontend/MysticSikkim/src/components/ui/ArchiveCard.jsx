import { Calendar, MapPin } from "lucide-react";
import { motion } from "motion/react";

export function ArchiveCard({ item, onSelect, getConditionColor }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            whileHover={{
                scale: 1.03,
                boxShadow: "0 10px 30px rgba(234, 88, 12, 0.2)",
            }}
            className="group relative flex flex-col rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm border border-orange-200/50 shadow-lg cursor-pointer"
            onClick={() => onSelect(item)}
        >
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-lg font-bold text-white drop-shadow-md line-clamp-2">
                        {item.title}
                    </h3>
                </div>
                {item.condition && (
                    <div
                        className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold ${getConditionColor(
                            item.condition
                        )} shadow-sm`}
                    >
                        {item.condition}
                    </div>
                )}
            </div>

            <div className="p-4 flex-1 flex flex-col">
                <div className="space-y-2 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-orange-600" />
                        <span>{item.monastery}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-orange-600" />
                        <span>{item.date}</span>
                    </div>
                </div>
                <p className="text-gray-700 text-sm line-clamp-3 flex-grow">
                    {item.description}
                </p>
                <div className="mt-4 pt-3 border-t border-orange-200/70">
                    <span className="inline-block bg-orange-100 text-orange-800 text-xs font-medium px-3 py-1 rounded-full">
                        {item.type}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}