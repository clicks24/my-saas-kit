"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import React, { useEffect, useRef, useState } from 'react';
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

    const startDateRef = useRef<HTMLLabelElement>(null);
    const promoPayRef = useRef<HTMLLabelElement>(null);

    useEffect(() => {
        fetchSlots();
    }, []);

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

    const handleDateChange = (date: Date | undefined) => {
        setStartDateFilter(date ? date.toISOString().slice(0, 10) : '');
    };

    const handlePromoPayChange = (value: string) => {
        const promoPay = parseFloat(value);
        setPromoPayFilter(isNaN(promoPay) ? null : promoPay);
    };

    const handleBookingStatusChange = (value: boolean) => {
        setIsBookedFilter(value);
    };

    const clearFilters = () => {
        setStartDateFilter('');
        setPromoPayFilter(null);
        setIsBookedFilter(null);
    };

    useEffect(() => {
        adjustLabelWidth(startDateRef);
        adjustLabelWidth(promoPayRef);
    }, [startDateFilter, promoPayFilter]);

    const adjustLabelWidth = (ref: React.RefObject<HTMLLabelElement>) => {
        if (ref.current) {
            const labelWidth = ref.current.offsetWidth;
            ref.current.style.width = `${labelWidth}px`;
        }
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
                <div className="flex items-center"> {/* Removed flex-shrink-0 */}
                    <label htmlFor="startDate" className="mr-2" ref={startDateRef}>Date:</label>
                    <Input type="date" id="startDate" onChange={e => handleDateChange(new Date(e.target.value))} />
                </div>
                <div className="flex items-center"> {/* Removed flex-shrink-0 */}
                    <label htmlFor="promoPay" className="mr-2" ref={promoPayRef}>Promo:</label>
                    <Input type="number" id="promoPay" onChange={e => handlePromoPayChange(e.target.value)} />
                </div>
                <div className="flex items-center flex-shrink-0"> {/* Added flex-shrink-0 to prevent wrapping */}
                    <label htmlFor="bookingStatus" className="mr-2">Booking Status:</label>
                    <Switch id="bookingStatus" onChange={handleBookingStatusChange} />
                </div>
                <div className="flex items-center"> {/* No changes */}
                    <Button onClick={clearFilters}>Clear Filters</Button>
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