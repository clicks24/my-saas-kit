"use client"

import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, ClockIcon } from "@radix-ui/react-icons";
import cn from 'classnames';
import { addHours, format } from "date-fns";
import { useEffect, useState } from 'react';

const AddSlotForm = () => {
    const [startDate, setStartDate] = useState<Date>();
    const [endTime, setEndTime] = useState<Date>();
    const [promoPay, setPromoPay] = useState<number | null>(null);
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const handleSlotSelection = (hour: number, minute: number) => {
        if (startDate) {
            const selectedTime = new Date(startDate);
            selectedTime.setHours(hour, minute);
            setEndTime(addHours(selectedTime, 1)); // Always 1 hour after the start time
        }
    };

    const handlePromoPaySelection = (amount: number) => {
        setPromoPay(amount !== promoPay ? amount : null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (!startDate || !endTime) {
                throw new Error('Start time and end time are required');
            }

            const data = {
                startTime: startDate.toISOString(),
                endTime: endTime.toISOString(),
                promoPay: promoPay,
            };

            const response = await fetch('/api/slots/createSlot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to create slot');
            }

            setShowAlert(true);
            console.log("Slot added successfully!");
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (showAlert) {
            timeout = setTimeout(() => {
                setShowAlert(false);
            }, 5000); // Hide alert after 5 seconds
        }

        return () => clearTimeout(timeout);
    }, [showAlert]);

    return (
        <div className="flex flex-col items-center">
            <div className="flex gap-4 mb-4">
                <div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn("w-[240px] justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {startDate ? format(startDate, "PPP") : <span>Set Start Date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={startDate}
                                onSelect={setStartDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn("w-[240px] justify-start text-left font-normal", !endTime && "text-muted-foreground")}
                            >
                                <ClockIcon className="mr-2 h-4 w-4" />
                                {endTime ? format(endTime, "hh:mm a") : <span>Set Slot Time</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <div className="flex flex-col gap-2 p-2">
                                {[...Array(28).keys()].map((_, index) => {
                                    const hour = Math.floor(index / 2) + 8;
                                    const minute = index % 2 === 0 ? 0 : 30;
                                    const slotTime = new Date().setHours(hour, minute);
                                    return (
                                        <Button
                                            key={index}
                                            variant="ghost"
                                            className="text-white" // Set text color to white
                                            onClick={() => handleSlotSelection(hour, minute)}
                                        >
                                            {format(slotTime, "hh:mm a")}
                                        </Button>
                                    );
                                })}
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-[240px] justify-start text-left font-normal"
                            >
                                {promoPay !== null ? `Promo Pay: $${promoPay}` : 'Set Promo Pay'}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <div className="flex flex-col gap-2 p-2">
                                {[...Array(10).keys()].map(number => (
                                    <Button
                                        key={number + 1}
                                        variant="ghost"
                                        className="text-white" // Set text color to white
                                        onClick={() => handlePromoPaySelection(number + 1)}
                                    >
                                        ${number + 1}
                                    </Button>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex items-end">
                    <Button onClick={handleSubmit}>Add Slot</Button>
                </div>
            </div>
            {showAlert && (
                <Alert variant="success" onClose={() => setShowAlert(false)}>
                    New slot added successfully! <br />
                    Date: {startDate && format(startDate, "PPP")} <br />
                    Slot Time: {endTime && format(endTime, "hh:mm a")} <br />
                    Promo Pay: {promoPay !== null ? `$${promoPay}` : 'Not set'}
                </Alert>
            )}
        </div>
    );
};

export default AddSlotForm;
