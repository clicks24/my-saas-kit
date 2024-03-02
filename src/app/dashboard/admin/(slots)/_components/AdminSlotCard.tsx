"use client"

import React from 'react';

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
    onEdit: (slot: Slot) => void;
    onDelete: (slotId: string) => void;
}

const AdminSlotCard: React.FC<AdminSlotCardProps> = ({ slot, onEdit, onDelete }) => {
    return (
        <div className="border rounded-lg p-4 m-2 shadow-lg flex flex-col justify-between bg-white">
            <div>
                <h3 className="text-xl font-bold">Slot Details</h3>
                <p>Start Time: {new Date(slot.startTime).toLocaleString()}</p>
                <p>End Time: {new Date(slot.endTime).toLocaleString()}</p>
                <p>Email: {slot.email || 'N/A'}</p>
                <p>Promo Pay: ${slot.promoPay}</p>
                <p>Status: {slot.isBooked ? 'Booked' : 'Available'}</p>
            </div>
            <div className="flex justify-end mt-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l mr-2"
                    onClick={() => onEdit(slot)}
                >
                    Edit
                </button>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-r"
                    onClick={() => onDelete(slot.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default AdminSlotCard;
