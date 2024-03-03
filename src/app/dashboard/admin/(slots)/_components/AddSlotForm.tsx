"use client"

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useState } from 'react';

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const AddSlotForm = () => {
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [promoPay, setPromoPay] = useState<number | null>(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Add your fetch logic here
            console.log("Form submitted!");
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
                                className={cn(
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
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[240px] justify-start text-left font-normal",
                                    !endDate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {endDate ? format(endDate, "PPP") : <span>End Date and Time</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={endDate}
                                onSelect={setEndDate}
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
                <div className="flex items-end"> {/* Align the button with the other form elements */}
                    <Button onClick={handleSubmit}>Add Slot</Button>
                </div>
            </div>
        </div>
    );
};

export default AddSlotForm;

