import { useEffect, useState } from 'react';
import SlotCard from './SlotCard'; // Adjust the import path to where your SlotCard component is located

interface Slot {
    id: string;
    // Add other properties here
}

const MySlots = () => {
    const [slots, setSlots] = useState<Slot[]>([]); // Provide type for slots state variable
    const [isLoading, setIsLoading] = useState(false);

    // Function to fetch slots from your API
    const fetchSlots = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/slots/listSlot');
            if (!response.ok) {
                throw new Error('Failed to fetch slots');
            }
            const slotsData = await response.json();
            setSlots(slotsData);
        } catch (error) {
            console.error('Error fetching slots:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch slots on component mount
    useEffect(() => {
        fetchSlots();
    }, []);

    // Function to be called to refresh the slots list after a booking operation
    const refreshSlots = () => {
        fetchSlots();
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-semibold mb-8">Available Slots</h1>
            {isLoading ? (
                <p>Loading slots...</p>
            ) : (
                slots.map(slot => (
                    <SlotCard key={slot.id} slot={slot} onToggleSuccess={refreshSlots} />
                ))
            )}
        </div>
    );
};

export default MySlots;
