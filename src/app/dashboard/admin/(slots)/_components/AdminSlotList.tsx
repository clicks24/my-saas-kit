"use client"

import React, { useEffect, useState } from 'react';
import AdminSlotCard from './AdminSlotCard';

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
    const [startDateFilter, setStartDateFilter] = useState<string>('');
    const [promoPayFilter, setPromoPayFilter] = useState<number | null>(null);
    const [isBookedFilter, setIsBookedFilter] = useState<boolean | null>(null);

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

    const handleDateChange = (date: Date | undefined) => {
        setStartDateFilter(date ? date.toISOString().slice(0, 10) : '');
    };

    const handlePromoPayChange = (value: string) => {
        const promoPay = parseFloat(value);
        setPromoPayFilter(isNaN(promoPay) ? null : promoPay);
    };

    const handleBookingStatusChange = (value: string) => {
        setIsBookedFilter(value === 'booked' ? true : value === 'available' ? false : null);
    };

    const clearFilters = () => {
        setStartDateFilter('');
        setPromoPayFilter(null);
        setIsBookedFilter(null);
    };

    const filteredSlots = slots.filter(slot => {
        const slotStartDate = slot.startTime.slice(0, 10);
        const slotPromoPay = slot.promoPay;
        const slotIsBooked = slot.isBooked;

        if (!startDateFilter && promoPayFilter === null && isBookedFilter === null) {
            return true; // No filters applied, show all slots
        }

        // Check if slot matches all applied filters
        return (
            (!startDateFilter || slotStartDate === startDateFilter) &&
            (promoPayFilter === null || slotPromoPay === promoPayFilter) &&
            (isBookedFilter === null || slotIsBooked === isBookedFilter)
        );
    });

    return (
        <div className="p-4">
            <h1 className="text-3xl font-semibold mb-8">Manage Slots</h1>
            <div className="flex flex-wrap gap-4 mb-4">
                <div>
                    <label htmlFor="startDate">Select Start Date:</label>
                    <input type="date" id="startDate" onChange={e => handleDateChange(new Date(e.target.value))} />
                </div>
                <div>
                    <label htmlFor="promoPay">Promo Pay:</label>
                    <input type="number" id="promoPay" onChange={e => handlePromoPayChange(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="bookingStatus">Booking Status:</label>
                    <select id="bookingStatus" onChange={e => handleBookingStatusChange(e.target.value)}>
                        <option value="">All</option>
                        <option value="booked">Booked</option>
                        <option value="available">Available</option>
                    </select>
                </div>
                <div>
                    <button onClick={clearFilters}>Clear Filters</button>
                </div>
            </div>
            {isLoading ? (
                <p>Loading slots...</p>
            ) : (
                <div className="flex flex-wrap -mx-4">
                    {filteredSlots.length > 0 ? (
                        filteredSlots.map(slot => (
                            <div key={slot.id} className="p-4 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
                                <AdminSlotCard slot={slot} refreshSlots={fetchSlots} />
                            </div>
                        ))
                    ) : (
                        <p>No slots available.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminSlotList;



