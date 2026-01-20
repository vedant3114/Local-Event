import { Link } from 'react-router-dom';
import { Calendar, MapPin, Tag } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function EventCard({ event }) {
    // Generate a predictable generic image based on type or id
    const typeColors = {
        'Fitness': 'bg-emerald-100 text-emerald-800',
        'Music': 'bg-rose-100 text-rose-800',
        'Meetup': 'bg-blue-100 text-blue-800',
        'Workshop': 'bg-amber-100 text-amber-800',
        'Sports': 'bg-orange-100 text-orange-800',
        'Social': 'bg-cyan-100 text-cyan-800',
        'Entertainment': 'bg-purple-100 text-purple-800'
    };

    const badgeClass = typeColors[event.type] || 'bg-gray-100 text-gray-800';

    return (
        <Link
            to={`/events/${event.id}`}
            className="group block bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 border border-gray-100 dark:border-gray-700 h-full flex flex-col transform hover:-translate-y-2"
        >
            <div className="h-48 overflow-hidden bg-gray-100 dark:bg-gray-700 relative">
                <div className={cn("absolute inset-0 flex items-center justify-center text-8xl font-black opacity-10 select-none transition-transform duration-700 group-hover:scale-125", badgeClass)}>
                    {event.type.charAt(0)}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

                <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                    <h3 className="text-2xl font-bold text-white drop-shadow-md transform group-hover:scale-110 transition-transform duration-500 opacity-90">
                        {event.title}
                    </h3>
                </div>
                <div className="absolute top-4 right-4 z-10">
                    <span className={cn("px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide backdrop-blur-md bg-white/30 text-white border border-white/20 shadow-lg", badgeClass.replace('bg-', 'data-').replace('text-', 'data-'))}>
                        {event.type}
                    </span>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow relative">
                <div className="flex items-center text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 gap-3 uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        <span className="line-clamp-1">{event.location}</span>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
                    {event.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4 flex-grow text-sm leading-relaxed">
                    {event.description}
                </p>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-sm mt-auto">
                    <span className="text-gray-500 flex items-center gap-1">
                        <span className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-xs font-bold">
                            {event.host.charAt(0)}
                        </span>
                        <span className="truncate max-w-[100px]">{event.host}</span>
                    </span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Join <span className="text-lg">&rarr;</span>
                    </span>
                </div>
            </div>
        </Link>
    );
}
