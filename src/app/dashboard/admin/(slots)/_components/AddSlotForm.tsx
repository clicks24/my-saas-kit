"use client"

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PrismaClient } from '@prisma/client';
import { CalendarIcon, ClockIcon } from "@radix-ui/react-icons";
import { addHours, format } from 'date-fns';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const prisma = new PrismaClient();

const AddSlotForm = () => {
    const [startDate, setStartDate] = useState<Date>();
    const [startTime, setStartTime] = useState<Date>();
    const [endTime, setEndTime] = useState<Date>();
    const [promoPay, setPromoPay] = useState<number | null>(null);

    const handleSlotSelection = (startHour: number, startMinute: number, isStartTime: boolean) => {
        if (startDate) {
            const start = new Date(startDate);
            start.setHours(startHour, startMinute);
            if (isStartTime) {
                const end = addHours(start, 1); // Always 1 hour after the start time
                setStartTime(start);
                setEndTime(end);
            } else {
                setEndTime(start);
            }
        }
    };

    const handlePromoPaySelection = (amount: number) => {
        setPromoPay(amount !== promoPay ? amount : null);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if (!startDate || !startTime || !endTime) {
                throw new Error('Date, start time, and end time are required');
            }

            const response = await fetch('/api/slots/createSlot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    startTime: startTime.toISOString(),
                    endTime: endTime.toISOString(),
                    promoPay: promoPay !== null ? promoPay.toString() : null,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle specific error messages from the API response
                throw new Error(data.message || 'Failed to add slot');
            }

            // Convert UTC time to local time
            const startTimeLocal = new Date(data.newSlot.startTime).toLocaleString();
            const endTimeLocal = new Date(data.newSlot.endTime).toLocaleString();

            // Display details of the booked slot
            toast.success(`Slot added successfully! Start Date: ${format(startDate, "PPP")}, Start Time: ${startTimeLocal}, End Time: ${endTimeLocal}, Promo Pay: ${data.newSlot.promoPay}`);
            console.log('Slot added successfully:', data);
        } catch (error) {
            console.error('Error adding slot:', error);
            toast.error(error.message || 'Failed to add slot');
        }
    };




    return (
        <div className="flex flex-col items-center">
            <form onSubmit={handleSubmit}>
                <div className="flex gap-4 mb-4">
                    <PopoverComponent
                        icon={<CalendarIcon className="mr-2 h-4 w-4" />}
                        buttonText={startDate ? format(startDate, "PPP") : 'Set Start Date'}
                        content={<Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />}
                    />
                    <PopoverComponent
                        icon={<ClockIcon className="mr-2 h-4 w-4" />}
                        buttonText={startTime ? format(startTime, "hh:mm a") : 'Set Start Time'}
                        content={(
                            <TimeSelectionList
                                onSelect={(hour, minute) => handleSlotSelection(hour, minute, true)}
                            />
                        )}
                    />
                    <PopoverComponent
                        icon={<ClockIcon className="mr-2 h-4 w-4" />}
                        buttonText={endTime ? format(endTime, "hh:mm a") : 'Set End Time'}
                        content={(
                            <TimeSelectionList
                                onSelect={(hour, minute) => handleSlotSelection(hour, minute, false)}
                            />
                        )}
                    />
                    <PopoverComponent
                        buttonText={promoPay !== null ? `Promo Pay: $${promoPay}` : 'Set Promo Pay'}
                        content={(
                            <PromoPaySelectionList
                                onSelect={handlePromoPaySelection}
                            />
                        )}
                    />
                    <div className="flex items-end">
                        <Button type="submit">Add Slot</Button>
                    </div>
                </div>
            </form>
            <ToastContainer /> {/* Container for displaying toast notifications */}
        </div>
    );
};

const PopoverComponent = ({ icon, buttonText, content }) => (
    <Popover>
        <PopoverTrigger asChild>
            <Button variant={"outline"} className="w-[240px] justify-start text-left font-normal">
                {icon}
                {buttonText}
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
            {content}
        </PopoverContent>
    </Popover>
);

const TimeSelectionList = ({ onSelect }: { onSelect: (hour: number, minute: number) => void }) => (
    <div className="flex flex-col gap-2 p-2">
        {[...Array(28).keys()].map((_, index) => {
            const hour = Math.floor(index / 2) + 8;
            const minute = index % 2 === 0 ? 0 : 30;
            const slotTime = new Date().setHours(hour, minute);
            return (
                <Button
                    key={index}
                    variant="ghost"
                    className="text-white"
                    onClick={() => onSelect(hour, minute)}
                >
                    {format(slotTime, "hh:mm a")}
                </Button>
            );
        })}
    </div>
);

const PromoPaySelectionList = ({ onSelect }: { onSelect: (amount: number) => void }) => (
    <div className="flex flex-col gap-2 p-2">
        {[...Array(10).keys()].map(number => (
            <Button
                key={number + 1}
                variant="ghost"
                className="text-white"
                onClick={() => onSelect(number + 1)}
            >
                ${number + 1}
            </Button>
        ))}
    </div>
);

export default AddSlotForm;