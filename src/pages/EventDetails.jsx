import { useParams, useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { Calendar, MapPin, Tag, User, ChevronLeft, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import Modal from '../components/common/Modal';

export default function EventDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getEventById, joinEvent, rsvpEvents, loading } = useEvents();
    const [showRsvpModal, setShowRsvpModal] = useState(false);

    const event = getEventById(id);
    const isRSVPed = rsvpEvents.includes(Number(id));

    if (loading) {
        return <div className="text-center py-20">Loading...</div>;
    }

    if (!event) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">Event not found</h2>
                <button onClick={() => navigate('/')} className="text-indigo-600 hover:underline">
                    Back to Events
                </button>
            </div>
        );
    }

    const handleJoin = () => {
        const success = joinEvent(event.id);
        if (success) {
            setShowRsvpModal(true);
        }
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-500 hover:text-indigo-600 mb-6 transition-colors"
            >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back
            </button>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                {/* Banner Area */}
                <div className="h-64 bg-gradient-to-r from-indigo-500 to-purple-600 relative flex items-center justify-center p-8">
                    <h1 className="text-3xl md:text-5xl font-bold text-white text-center shadow-sm">
                        {event.title}
                    </h1>
                    <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-white text-sm font-medium border border-white/30">
                        {event.type}
                    </div>
                </div>

                <div className="p-8">
                    <div className="flex flex-col md:flex-row gap-8 mb-8">
                        {/* Left Column: Info */}
                        <div className="flex-1 space-y-6">

                            <div className="space-y-4 text-gray-700 dark:text-gray-300">
                                <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                    <Calendar className="w-6 h-6 text-indigo-500 mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase">Date</p>
                                        <p className="text-lg font-semibold">{new Date(event.date).toDateString()}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                    <MapPin className="w-6 h-6 text-rose-500 mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase">Location</p>
                                        <p className="text-lg font-semibold">{event.location}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                    <User className="w-6 h-6 text-amber-500 mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase">Hosted By</p>
                                        <p className="text-lg font-semibold">{event.host}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="prose dark:prose-invert max-w-none">
                                <h3 className="text-2xl font-bold mb-4">About Event</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                    {event.description}
                                </p>
                            </div>
                        </div>

                        {/* Right Column: CTA */}
                        <div className="md:w-80 flex-shrink-0">
                            <div className="sticky top-24 bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-indigo-100 dark:border-indigo-900/30 shadow-xl">
                                <h3 className="text-lg font-bold mb-4 text-center">Ready to join?</h3>
                                {isRSVPed ? (
                                    <div className="flex flex-col items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg border border-green-200 dark:border-green-800 w-full animate-pulse-slow">
                                        <CheckCircle className="w-8 h-8" />
                                        <span className="font-bold">You have RSVP'd!</span>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleJoin}
                                        className="w-full bg-indigo-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-indigo-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-2"
                                    >
                                        RSVP Now
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={showRsvpModal} onClose={() => setShowRsvpModal(false)} title="You're Going!">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-2">
                        <CheckCircle className="w-10 h-10" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                        You have successfully successfully joined <strong>{event.title}</strong>.
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-left text-sm space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Date:</span>
                            <span className="font-medium">{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Location:</span>
                            <span className="font-medium">{event.location}</span>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowRsvpModal(false)}
                        className="w-full bg-indigo-600 text-white rounded-lg py-2 font-medium hover:bg-indigo-700"
                    >
                        Done
                    </button>
                </div>
            </Modal>
        </div>
    );
}
