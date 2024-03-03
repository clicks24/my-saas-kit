"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
            startTime: slot.startTime, // Assume these values are managed in state if editable
            endTime: slot.endTime,
            email: email, // `email` state holds the updated email value
            promoPay: promoPay, // `promoPay` state should be a string that we convert back to a number
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

            // Assuming you have a method to close the dialog/modal
            setIsDialogOpen(false);

            // Refresh the slots list to reflect the update
            refreshSlots();
        } catch (error) {
            console.error('Error updating slot:', error);
            // Optionally, handle the error (e.g., display an error message)
        }
    };


    return (
        <Card className="min-w-0 rounded-lg overflow-hidden shadow-xs mb-4">
            <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Slot Details</h3>
                <p><strong>Start Time:</strong> {new Date(slot.startTime).toLocaleString()}</p>
                <p><strong>End Time:</strong> {new Date(slot.endTime).toLocaleString()}</p>
                <p><strong>Email:</strong> {slot.email || 'Not Assigned'}</p>
                <p><strong>Promo Pay:</strong> ${slot.promoPay}</p>
                <p><strong>Status:</strong> {slot.isBooked ? 'Booked' : 'Available'}</p>
                <Button onClick={() => setIsDialogOpen(true)}>Edit</Button>
                <Button onClick={handleDelete}>Delete</Button>
            </div>
            {isDialogOpen && (
                <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} aria-label="Edit slot">
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    <Input value={promoPay} onChange={(e) => setPromoPay(e.target.value)} placeholder="Promo Pay" />
                    <Button onClick={handleUpdate}>Update</Button>
                    <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                </Dialog>
            )}
        </Card>
    );
};

export default AdminSlotCard;

