"use client"

// src/app/dashboard/slots/page.tsx
import MySlots from './_components/MySlots'; // Ensure the import path is correct

const SlotsPage = () => {
    return (
        <div className="p-4">
            <h1 className="text-3xl font-semibold mb-8">Book Slots Here</h1>
            <MySlots /> {/* Include MySlots component */}
        </div>
    );
};

export default SlotsPage;