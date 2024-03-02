"use client"

import { useEffect, useState } from 'react';
import AdminSlotCard from './AdminSlotCard'; // Adjust the import path as necessary

// Extending the Slot interface to include all properties needed for admin
interface Slot {
    id: string;
    startTime: string;
    endTime: string;
    email: string | null;
    promoPay: number;
    isBooked: boolean;
}

const AdminSlotList = () => {
    const [slots, setSlots] = useState<Slot[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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
            // Consider showing an error message to the user here
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch slots on component mount
    useEffect(() => {
        fetchSlots();
    }, []);

    // Define handlers for editing and deleting slots
    const handleEditSlot = (slot: Slot) => {
        // Implement or invoke your edit functionality here
        // This might involve setting a state to open an edit modal or form
        console.log('Editing slot:', slot.id);
    };

    const handleDeleteSlot = async (slotId: string) => {
        // Implement or invoke your delete functionality here
        // This might involve calling an API to delete a slot and then refreshing the list
        console.log('Deleting slot:', slotId);
        fetchSlots(); // Refresh the list after deletion
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-semibold mb-8">Manage Slots</h1>
            {isLoading ? (
                <p>Loading slots...</p>
            ) : (
                slots.map(slot => (
                    <AdminSlotCard key={slot.id} slot={slot} onEdit={() => handleEditSlot(slot)} onDelete={() => handleDeleteSlot(slot.id)} />
                ))
            )}
        </div>
    );
};

export default AdminSlotList;
