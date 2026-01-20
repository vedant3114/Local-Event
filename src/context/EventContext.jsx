import { createContext, useContext, useState, useEffect } from 'react';
import eventsData from '../data/events.json';

const EventContext = createContext();

export const useEvents = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error('useEvents must be used within an EventProvider');
    }
    return context;
};

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rsvpEvents, setRsvpEvents] = useState([]);

    // Load initial data
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 500));

            // Load events from JSON (and potentially localStorage for new events if we wanted to persist creates, but instructions say "New event should appear in event list", probably just in memory or localstorage)
            // We'll stick to in-memory + JSON for base.
            // If we want to persist created events, we should use localStorage for them too.
            // Let's implement a merge of static + local storage events.

            const storedCreatedEvents = JSON.parse(localStorage.getItem('createdEvents') || '[]');
            setEvents([...eventsData.events, ...storedCreatedEvents]);

            const storedRsvps = JSON.parse(localStorage.getItem('rsvpEvents') || '[]');
            setRsvpEvents(storedRsvps);

            setLoading(false);
        };

        loadData();
    }, []);

    // Sync RSVP to localStorage
    useEffect(() => {
        localStorage.setItem('rsvpEvents', JSON.stringify(rsvpEvents));
    }, [rsvpEvents]);

    const joinEvent = (eventId) => {
        if (!rsvpEvents.includes(eventId)) {
            setRsvpEvents(prev => [...prev, eventId]);
            return true; // Success
        }
        return false; // Already joined
    };

    const addEvent = (newEvent) => {
        // Generate a new ID (max existing + 1)
        const maxId = events.length > 0 ? Math.max(...events.map(e => e.id)) : 0;
        const eventWithId = { ...newEvent, id: maxId + 1 };

        setEvents(prev => [eventWithId, ...prev]); // Add to top

        // Persist created event
        const storedCreatedEvents = JSON.parse(localStorage.getItem('createdEvents') || '[]');
        localStorage.setItem('createdEvents', JSON.stringify([...storedCreatedEvents, eventWithId]));
    };

    const searchEvents = ({ query, type, date, location }) => {
        return events.filter(event => {
            const matchesQuery = query
                ? event.title.toLowerCase().includes(query.toLowerCase()) ||
                event.host.toLowerCase().includes(query.toLowerCase())
                : true;

            const matchesType = type ? event.type === type : true;
            const matchesDate = date ? event.date === date : true;
            const matchesLocation = location ? event.location === location : true;

            return matchesQuery && matchesType && matchesDate && matchesLocation;
        });
    };

    const getEventById = (id) => {
        return events.find(e => e.id === Number(id));
    };

    const value = {
        events,
        loading,
        rsvpEvents,
        joinEvent,
        addEvent,
        searchEvents,
        getEventById,
        allLocations: [...new Set(events.map(e => e.location))],
        allTypes: [...new Set(events.map(e => e.type))]
    };

    return (
        <EventContext.Provider value={value}>
            {children}
        </EventContext.Provider>
    );
};
