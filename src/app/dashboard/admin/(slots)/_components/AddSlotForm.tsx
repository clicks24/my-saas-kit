"use client"

import { useState } from 'react';

const AddSlotForm = () => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [email, setEmail] = useState(''); // Optional, use if you want to pre-assign slots
    const [feedbackMessage, setFeedbackMessage] = useState(''); // Feedback for the admin

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/slots/createSlot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    startTime,
                    endTime,
                    email, // Include or omit based on your use case
                }),
            });

            if (response.ok) {
                // Provide feedback to the admin
                setFeedbackMessage('Slot added successfully');
                // Reset the form fields
                setStartTime('');
                setEndTime('');
                setEmail('');
            } else {
                // Provide feedback on failure
                setFeedbackMessage('Failed to add slot. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            // Provide error feedback
            setFeedbackMessage('An error occurred. Please try again.');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="startTime">Start Time:</label>
                    <input
                        type="datetime-local"
                        id="startTime"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="endTime">End Time:</label>
                    <input
                        type="datetime-local"
                        id="endTime"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                    />
                </div>
                {/* Optional: For pre-assigning slots */}
                <div>
                    <label htmlFor="email">Email (optional):</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="submit">Add Slot</button>
            </form>
            {/* Feedback Message Display */}
            {feedbackMessage && <p>{feedbackMessage}</p>}
        </>
    );
};

export default AddSlotForm;
