"use client"

import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
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
    const [startDateFilter, setStartDateFilter] = useState('');
    const [promoPayFilter, setPromoPayFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

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

    const filteredSlots = slots.filter(slot => {
        return (startDateFilter ? new Date(slot.startTime).toISOString().includes(startDateFilter) : true) &&
            (promoPayFilter ? slot.promoPay.toString().includes(promoPayFilter) : true) &&
            (statusFilter ? String(slot.isBooked) === statusFilter : true);
    });

    return (
        <div className="p-4">
            <h1 className="text-3xl font-semibold mb-8">Manage Slots</h1>
            <div className="flex flex-wrap gap-4 mb-4">
                <Input placeholder="Filter by Start Date (YYYY-MM-DD)" value={startDateFilter} onChange={e => setStartDateFilter(e.target.value)} />
                <Input placeholder="Filter by Promo Pay" value={promoPayFilter} onChange={e => setPromoPayFilter(e.target.value)} />
                <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="">All Statuses</option>
                    <option value="true">Booked</option>
                    <option value="false">Available</option>
                </Select>
            </div>
            {isLoading ? (
                <p>Loading slots...</p>
            ) : (
                filteredSlots.length > 0 ? (
                    filteredSlots.map(slot => (
                        <AdminSlotCard key={slot.id} slot={slot} refreshSlots={fetchSlots} />
                    ))
                ) : (
                    <p>No slots available.</p>
                )
            )}
        </div>
    );
};

export default AdminSlotList;
