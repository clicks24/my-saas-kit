"use client"

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar'; // Import the Calendar component
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import * as React from 'react';
import { DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import AdminSlotCard, { Slot } from './AdminSlotCard'; // Import AdminSlotCard component

const AdminSlotList: React.FC = () => {
    const [slots, setSlots] = React.useState<Slot[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [dateRangeFilter, setDateRangeFilter] = React.useState<DateRange | undefined>();
    const [promoPayFilter, setPromoPayFilter] = React.useState<number | null>(null);
    const [isBookedFilter, setIsBookedFilter] = React.useState<boolean | null>(null);

    const fetchSlots = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/slots/listSlot');
            if (!response.ok) {
                throw new Error('Failed to fetch slots');
            }
            const slotsData: Slot[] = await response.json();
            console.log('Fetched slots:', slotsData); // Log fetched slots
            setSlots(slotsData);
        } catch (error) {
            console.error('Error fetching slots:', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        fetchSlots();
    }, []);

    const handlePromoPayChange = (value: string) => {
        setPromoPayFilter(value !== 'null' ? parseFloat(value) : null);
    };

    const handleBookingStatusChange = (value: string) => {
        setIsBookedFilter(value === 'true');
    };

    const clearFilters = () => {
        setDateRangeFilter(undefined);
        setPromoPayFilter(null);
        setIsBookedFilter(null);
    };

    // Function to get unique and sorted promo pay values
    const getUniqueSortedPromoPays = () => {
        const uniquePromoPays = Array.from(new Set(slots.map(slot => slot.promoPay))).sort((a, b) => a - b);
        return uniquePromoPays;
    };

    return (
        <div className="p-4 flex flex-col items-center"> {/* Changed class to flex-col */}
            <div className="flex flex-wrap gap-4 mb-4 justify-center"> {/* Centered content */}
                <div className="flex items-center">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-[300px] justify-start text-left font-normal">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateRangeFilter?.from ? (
                                    dateRangeFilter.to ? (
                                        `${format(dateRangeFilter.from, 'LLL dd, y')} - ${format(dateRangeFilter.to, 'LLL dd, y')}`
                                    ) : (
                                        format(dateRangeFilter.from, 'LLL dd, y')
                                    )
                                ) : (
                                    'Pick a date range'
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={dateRangeFilter?.from}
                                selected={dateRangeFilter}
                                onSelect={setDateRangeFilter}
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                                {promoPayFilter !== null ? `Promo Pay: ${promoPayFilter}` : 'Choose Promo Pay'}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {getUniqueSortedPromoPays().map(promoPay => (
                                <DropdownMenuItem
                                    key={promoPay}
                                    onSelect={() => handlePromoPayChange(promoPay.toString())}
                                >
                                    {promoPay}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                                {isBookedFilter !== null ? `Booking Status: ${isBookedFilter ? 'Booked' : 'Available'}` : 'Booking Status'}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onSelect={() => handleBookingStatusChange('true')}>Booked</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => handleBookingStatusChange('false')}>Available</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex items-center">
                    <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
            </div>
            {isLoading ? (
                <p>Loading slots...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-center"> {/* Centered content */}
                    {slots
                        .filter(slot => {
                            // Adjust the filter logic for date range
                            if (dateRangeFilter && dateRangeFilter.from && dateRangeFilter.to) {
                                const slotDate = new Date(slot.startTime);
                                return slotDate >= dateRangeFilter.from && slotDate <= dateRangeFilter.to;
                            }
                            if (promoPayFilter !== null && slot.promoPay !== promoPayFilter) {
                                return false;
                            }
                            if (isBookedFilter !== null && slot.isBooked !== isBookedFilter) {
                                return false;
                            }
                            return true;
                        })
                        .map(slot => (
                            <div key={slot.id} className="flex justify-center"> {/* Centered content */}
                                <AdminSlotCard slot={slot} />
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default AdminSlotList;
