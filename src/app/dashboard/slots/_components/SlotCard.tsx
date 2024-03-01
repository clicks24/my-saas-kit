import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useState } from 'react';

const SlotCard = ({ slot, toggleBooking }) => {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    const handleToggleBooking = async () => {
        if (!session?.user?.email) {
            console.error('User email not found in session');
            return;
        }

        setIsLoading(true); // Start loading

        try {
            await toggleBooking(slot.id, slot.isBooked, session.user.email);
            console.log(`Slot ${slot.isBooked ? 'unbooked' : 'booked'}:`, slot);
        } catch (error) {
            console.error(`Error ${slot.isBooked ? 'unbooking' : 'booking'} slot:`, error);
        } finally {
            setIsLoading(false); // End loading regardless of outcome
        }
    };

    return (
        <div className="card" style={{ padding: '20px', margin: '10px 0', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2>Slot ID: {slot.id}</h2>
            <p>Start Time: {new Date(slot.startTime).toLocaleString()}</p>
            <p>End Time: {new Date(slot.endTime).toLocaleString()}</p>
            <p>Status: {slot.isBooked ? 'Booked' : 'Available'}</p>
            <p>Booked by: {slot.email || 'N/A'}</p>
            <Button disabled={isLoading} onClick={handleToggleBooking}>
                {isLoading ? 'Processing...' : slot.isBooked ? 'Unbook Slot' : 'Book Slot'}
            </Button>
        </div>
    );
};

export default SlotCard;
