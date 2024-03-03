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
        // Update logic here
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

