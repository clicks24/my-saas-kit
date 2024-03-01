// src/app/dashboard/slots/_components/mySlots.tsx
import { useEffect, useState } from 'react';
import SlotCard from './SlotCard';

const MySlots = () => {
    const [slots, setSlots] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Loading state

    async function fetchSlots() {
        setIsLoading(true);
        try {
            const response = await fetch('/api/slots/listSlot');
            if (!response.ok) throw new Error('Failed to fetch slots');
            const slotsData = await response.json();
            setSlots(slotsData);
        } catch (error) {
            console.error('Error fetching slots:', error);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchSlots();
    }, []);

    async function toggleBooking(slotId, isBooked, userEmail) {
        setIsLoading(true); // Set loading state
        try {
            const response = await fetch('/api/slots/toggleBooking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slotId, isBooked, userEmail }),
            });
            if (!response.ok) throw new Error('Failed to toggle booking');
            await fetchSlots(); // Refresh slots list after toggle
        } catch (error) {
            console.error('Failed to toggle booking:', error);
        }
        setIsLoading(false); // Reset loading state
    }

    if (isLoading) return <div>Loading...</div>; // Show loading indicator

    return (
        <div>
            {slots.map((slot) => (
                <SlotCard key={slot.id} slot={slot} toggleBooking={toggleBooking} />
            ))}
        </div>
    );
};
