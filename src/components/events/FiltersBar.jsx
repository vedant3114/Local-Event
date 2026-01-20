import { Search, X } from 'lucide-react';
import { useEvents } from '../../context/EventContext';

export default function FiltersBar({ filters, setFilters }) {
    const { allLocations, allTypes } = useEvents();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const clearFilters = () => {
        setFilters({ query: '', type: '', location: '', date: '' });
    };

    return (
        <div className="p-4 rounded-2xl shadow-lg border border-white/20 glass mb-10 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:gap-4 transition-all duration-300 hover:shadow-xl">
            {/* Search */}
            <div className="relative flex-grow group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                    type="text"
                    name="query"
                    value={filters.query}
                    onChange={handleChange}
                    placeholder="Search events or hosts..."
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-600 rounded-xl leading-5 bg-white/50 dark:bg-gray-800/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-white transition-all backdrop-blur-sm"
                />
            </div>

            {/* Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:w-auto w-full">
                <select
                    name="type"
                    value={filters.type}
                    onChange={handleChange}
                    className="w-full pl-3 pr-8 py-3 text-base border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 sm:text-sm rounded-xl bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white backdrop-blur-sm cursor-pointer hover:bg-white/80 dark:hover:bg-gray-700/80 transition-colors"
                >
                    <option value="">All Types</option>
                    {allTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>

                <select
                    name="location"
                    value={filters.location}
                    onChange={handleChange}
                    className="w-full pl-3 pr-8 py-3 text-base border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 sm:text-sm rounded-xl bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white backdrop-blur-sm cursor-pointer hover:bg-white/80 dark:hover:bg-gray-700/80 transition-colors"
                >
                    <option value="">All Locations</option>
                    {allLocations.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                    ))}
                </select>

                <input
                    type="date"
                    name="date"
                    value={filters.date}
                    onChange={handleChange}
                    className="w-full pl-3 pr-3 py-3 text-base border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 sm:text-sm rounded-xl bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white backdrop-blur-sm cursor-pointer hover:bg-white/80 dark:hover:bg-gray-700/80 transition-colors"
                />
            </div>

            {/* Clear Button */}
            {(filters.query || filters.type || filters.location || filters.date) && (
                <button
                    onClick={clearFilters}
                    className="flex items-center justify-center gap-2 px-5 py-3 border border-red-200 text-sm font-semibold rounded-xl text-red-600 bg-red-50/50 hover:bg-red-100 dark:text-red-400 dark:bg-red-900/20 dark:border-red-900/30 transition-all w-full lg:w-auto hover:scale-105 active:scale-95"
                >
                    <X className="w-4 h-4" />
                    Clear
                </button>
            )}
        </div>
    );
}
