"use client"

import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addHours, format, startOfDay } from "date-fns";
import { useState } from "react";

const AddSlotForm = () => {
    const [startDate, setStartDate] = useState<Date>();
    const [selectedTime, setSelectedTime] = useState<string>();
    const [promoPay, setPromoPay] = useState<number | null>(null);
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const hours = Array.from({ length: 16 }, (_, i) => addHours(startOfDay(new Date()), i + 8));

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (!startDate || !selectedTime) {
                throw new Error('Date and time are required');
            }

            const selectedDateTime = new Date(startDate);
            const [hours, minutes] = selectedTime.split(":");
            selectedDateTime.setHours(parseInt(hours));
            selectedDateTime.setMinutes(parseInt(minutes));

            const endTime = addHours(selectedDateTime, 1);

            // Prepare data to send to the server
            const data = {
                startTime: selectedDateTime.toISOString(),
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
                                {startDate ? format(startDate, "PPP") : <span>Start Date and Time</span>}
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
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button
                                variant="outline"
                                className="w-[240px] justify-start text-left font-normal"
                            >
                                {selectedTime ? `Selected Time: ${selectedTime}` : 'Choose Time'}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {hours.map((hour) => {
                                const formattedTime = format(hour, "HH:mm");
                                return (
                                    <DropdownMenuItem
                                        key={formattedTime}
                                        onSelect={() => setSelectedTime(formattedTime)}
                                    >
                                        {formattedTime}
                                    </DropdownMenuItem>
                                );
                            })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button
                                variant="outline"
                                className="w-[240px] justify-start text-left font-normal"
                            >
                                {promoPay !== null ? `Promo Pay: ${promoPay}` : 'Choose Promo Pay'}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {[...Array(10).keys()].map(number => (
                                <DropdownMenuItem
                                    key={number + 1}
                                    onSelect={() => setPromoPay(number + 1)}
                                >
                                    {number + 1}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex items-end">
                    <Button onClick={handleSubmit}>Add Slot</Button>
                </div>
            </div>
            {showAlert && (
                <Alert variant="success" onClose={() => setShowAlert(false)}>
                    New slot added successfully!
                </Alert>
            )}
        </div>
    );
};

export default AddSlotForm;

