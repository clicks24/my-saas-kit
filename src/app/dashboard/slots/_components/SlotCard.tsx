import { Button } from "@/components/ui/button"; // Ensure this path matches your project structure
import { useSession } from "next-auth/react";
import { useState } from 'react';

const SlotCard = ({ slot, onToggleSuccess }) => {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    const handleToggleBooking = async () => {
        if (!session?.user?.email) {
            console.error('User email not found in session');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/slots/toggleBooking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    slotId: slot.id,
                    userEmail: session.user.email
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to toggle slot booking');
            }

            // Optionally, you can handle the response data if needed
            // const result = await response.json();
            // console.log('Toggle booking result:', result);

            onToggleSuccess(); // Trigger refresh of slots list in the parent component
        } catch (error) {
            console.error('Error toggling slot booking:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="card" style={{ padding: '20px', margin: '10px 0', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2>Slot ID: {slot.id}</h2>
            <p>Start Time: {new Date(slot.startTime).toLocaleString()}</p>
            <p>End Time: {new Date(slot.endTime).toLocaleString()}</p>
            <p>Status: {slot.isBooked ? 'Booked' : 'Available'}</p>
            <p>Booked by: {slot.email || 'N/A'}</p>
            <p>Promo Pay: {slot.promopay || 'N/A'}</p>
            <Button disabled={isLoading} onClick={handleToggleBooking}>
                {isLoading ? 'Processing...' : slot.isBooked ? 'Unbook Slot' : 'Book Slot'}
            </Button>
        </div>
    );
};

export default SlotCard;
