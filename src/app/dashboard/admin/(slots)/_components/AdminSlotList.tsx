"use client"

import Grid from '@/components/ui/grid'; // Adjust this import path as necessary
import React, { useEffect, useState } from 'react';
import AdminSlotCard from './AdminSlotCard'; // Ensure this is the correct path

// Define the Slot interface
interface Slot {
    id: string;
    startTime: string;
    endTime: string;
    email: string | null;
    promoPay: number;
    isBooked: boolean;
}

const AdminSlotList: React.FC = () => {
    const [slots, setSlots] = useState<Slot[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Function to fetch slots from the API
    const fetchSlots = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/slots/listSlot');
            if (!response.ok) throw new Error('Failed to fetch slots');
            const slotsData: Slot[] = await response.json();
            setSlots(slotsData);
        } catch (error) {
            console.error('Error fetching slots:', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSlots();
    }, []);

    // Pass this function to AdminSlotCard to allow it to trigger a refresh of the slot list
    const refreshSlots = () => {
        fetchSlots();
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-semibold mb-8">Manage Slots</h1>
            {isLoading ? (
                <p>Loading slots...</p>
            ) : slots.length > 0 ? (
                <Grid className="grid-cols-3 gap-4"> {/* Adjust the grid layout as needed */}
                    {slots.map(slot => (
                        <AdminSlotCard
                            key={slot.id}
                            slot={slot}
                            refreshSlots={refreshSlots}
                        />
                    ))}
                </Grid>
            ) : (
                <p>No slots available.</p>
            )}
        </div>
    );
};

export default AdminSlotList;
