"use client"

import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, ClockIcon } from "@radix-ui/react-icons";
import cn from 'classnames';
import { format } from "date-fns";
import { useState } from 'react';

const AddSlotForm = () => {
    const [startDate, setStartDate] = useState<Date>();
    const [endTime, setEndTime] = useState<Date>();
    const [promoPay, setPromoPay] = useState<number | null>(null);
    const [showAlert, setShowAlert] = useState<boolean>(false); // State to control whether to show the alert

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (!startDate || !endTime) {
                throw new Error('Start time and end time are required');
            }

            // Prepare data to send to the server
            const data = {
                startTime: startDate.toISOString(),
                endTime: endTime.toISOString(),
                promoPay: promoPay,
            };

            // Send POST request to the API route
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

            setShowAlert(true); // Show confirmation alert
            console.log("Slot added successfully!");
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex gap-4 mb-4">
                <div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={
                                    cn(
                                        "w-[240px] justify-start text-left font-normal",
                                        !startDate && "text-muted-foreground"
                                    )}
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
                                className={
                                    cn(
                                        "w-[240px] justify-start text-left font-normal",
                                        !endTime && "text-muted-foreground"
                                    )}
                            >
                                <ClockIcon className="mr-2 h-4 w-4" />
                                {endTime ? format(endTime, "hh:mm a") : <span>Set Slot Time</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button variant="ghost">Choose Time</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {[...Array(14).keys()].map(hour => (
                                        <DropdownMenuItem
                                            key={hour + 8} // Start from 8:00 AM
                                            onSelect={() => setEndTime(new Date(startDate).setHours(hour + 8))}
                                        >
                                            {format(new Date().setHours(hour + 8), "hh:mm a")}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </PopoverContent>
                    </Popover>
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button
                                variant="outline"
                                className="w-[240px] justify-start text-left font-normal"
                            >
                                {promoPay !== null ? `Promo Pay: $${promoPay}` : 'Set Promo Pay'}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {[...Array(10).keys()].map(number => (
                                <DropdownMenuItem
                                    key={number + 1}
                                    onSelect={() => setPromoPay(number + 1)}
                                >
                                    ${number + 1}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex items-end"> {/* Align the button with the other form elements */}
                    <Button onClick={handleSubmit}>Add Slot</Button>
                </div>
            </div>
            {/* Render the Alert component if showAlert is true */}
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

