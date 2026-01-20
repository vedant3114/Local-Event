import { useState } from 'react';
import { useEvents } from '../context/EventContext';
import EventCard from '../components/events/EventCard';
import FiltersBar from '../components/events/FiltersBar';
import Pagination from '../components/events/Pagination';
import { Loader2 } from 'lucide-react';

export default function Home() {
    const { searchEvents, loading } = useEvents();
    const [filters, setFilters] = useState({
        query: '',
        type: '',
        location: '',
        date: ''
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Show 8 events per page

    // Filter events
    const filteredEvents = searchEvents(filters);

    // Pagination logic
    const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
    const paginatedEvents = filteredEvents.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleFilterChange = (newFiltersFn) => {
        setFilters(newFiltersFn);
        setCurrentPage(1); // Reset to first page on filter change
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="mb-12 text-center relative overflow-hidden py-10 rounded-3xl bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30">
                <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))] pointer-events-none" />
                <h1 className="relative text-5xl md:text-7xl font-extrabold mb-4 animate-slide-down">
                    <span className="text-gradient">Explore Events</span>
                </h1>
                <p className="relative text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in stagger-1">
                    Discover and join amazing community events near you. Connect, learn, and grow.
                </p>
            </div>

            <div className="animate-slide-up stagger-2">
                <FiltersBar filters={filters} setFilters={handleFilterChange} />
            </div>

            {filteredEvents.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 animate-fade-in">
                    <p className="text-xl text-gray-500">No events found matching your criteria.</p>
                    <button
                        onClick={() => setFilters({ query: '', type: '', location: '', date: '' })}
                        className="mt-4 text-indigo-600 hover:text-indigo-500 font-medium hover:underline transition-all"
                    >
                        Clear all filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {paginatedEvents.map((event, index) => (
                        <div key={event.id} className="animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                            <EventCard event={event} />
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-12 animate-fade-in stagger-3">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
}
