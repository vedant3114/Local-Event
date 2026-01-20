import { Outlet, Link, useLocation } from 'react-router-dom';
import { Calendar, PlusCircle, Search } from 'lucide-react';
import { useEvents } from '../../context/EventContext';

export default function Layout() {
    const { rsvpEvents } = useEvents();

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 glass border-b border-gray-200 dark:border-gray-700/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">

                        <div className="flex items-center">
                            <Link to="/" className="flex items-center gap-3 text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-80 transition-opacity">
                                <div className="p-2 bg-indigo-600 rounded-lg text-white">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <span>CommuneEvents</span>
                            </Link>
                        </div>

                        <div className="flex items-center gap-6">
                            <Link to="/" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 font-medium transition-colors hover:scale-105 transform duration-200">
                                Explore
                            </Link>
                            <Link to="/create" className="group flex items-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700 px-5 py-2.5 rounded-full text-sm font-bold transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30">
                                <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                                <span className="hidden sm:inline">Create Event</span>
                            </Link>
                            {rsvpEvents.length > 0 && (
                                <div className="hidden md:flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800 animate-fade-in">
                                    <span className="font-bold">{rsvpEvents.length}</span> joined
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 mt-auto">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} CommuneEvents. Frontend Intern Assignment.</p>
                </div>
            </footer>
        </div>
    );
}
