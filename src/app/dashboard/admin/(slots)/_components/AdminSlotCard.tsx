"use client"

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

interface Slot {
    id: string;
    startTime: string;
    endTime: string;
    email: string | null;
    promoPay: number;
    isBooked: boolean;
}

interface AdminSlotCardProps {
    slot: Slot;
    refreshSlots: () => void; // Function to reload slots list
}

const AdminSlotCard: React.FC<AdminSlotCardProps> = ({ slot, refreshSlots }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [email, setEmail] = useState(slot.email || '');
    const [promoPay, setPromoPay] = useState(slot.promoPay ? slot.promoPay.toString() : '');

    const formattedStartTime = new Date(slot.startTime).toLocaleDateString();

    const handleDelete = async () => {
        try {
            await fetch('/api/slots/deleteSlot', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: slot.id }), // Send the slot ID in the request body
            });
            refreshSlots(); // Refresh the list to reflect the deletion
        } catch (error) {
            console.error('Error deleting slot:', error);
            // Optionally, handle the error (e.g., display a notification)
        }
    };

    const handleUpdate = async () => {
        const updatedDetails = {
            id: slot.id,
            startTime: slot.startTime,
            endTime: slot.endTime,
            email: email,
            promoPay: promoPay,
            isBooked: slot.isBooked,
        };

        try {
            const response = await fetch('/api/slots/updateSlot', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedDetails),
            });

            if (!response.ok) {
                throw new Error('Failed to update slot');
            }

            setIsDialogOpen(false);
            refreshSlots();
        } catch (error) {
            console.error('Error updating slot:', error);
            // Optionally, handle the error (e.g., display an error message)
        }
    };

    return (
        <Card className="min-w-0 rounded-lg overflow-hidden shadow-lg mb-5 p-5 bg-white">
            <div className="p-4">
                <h3 className="text-xl font-bold mb-2 text-center">{formattedStartTime}</h3>
                <p><strong>Start Time:</strong> {new Date(slot.startTime).toLocaleTimeString()}</p>
                <p><strong>End Time:</strong> {new Date(slot.endTime).toLocaleTimeString()}</p>
                <p><strong>Promo Pay:</strong> ${parseFloat(promoPay).toFixed(2)}</p>
                <div className="flex justify-center mt-4">
                    <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => setIsDialogOpen(true)}>Edit</Button>
                    <Button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDelete}>Delete</Button>
                </div>
            </div>
            {isDialogOpen && (
                <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} title="Edit Slot" className="space-y-4">
                    <div className="p-4">
                        <Input className="w-full p-2 border border-gray-300 rounded shadow-sm mb-4" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        <Input className="w-full p-2 border border-gray-300 rounded shadow-sm mb-4" value={promoPay} onChange={(e) => setPromoPay(e.target.value)} placeholder="Promo Pay" />
                        <div className="flex justify-center">
                            <Button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleUpdate}>Update</Button>
                            <Button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        </div>
                    </div>
                </Dialog>
            )}
        </Card>
    );
};

export default AdminSlotCard;
