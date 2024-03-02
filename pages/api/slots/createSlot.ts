// pages/api/slots/createSlot.ts

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { startTime, endTime, email, promoPay } = req.body;
    try {
        const newSlot = await prisma.slot.create({
            data: {
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                isBooked: email ? true : false, // Automatically mark as booked if email is provided
                email: email || null, // Assign email if provided, else null
                promoPay: promoPay ? parseFloat(promoPay) : null, // Parse promoPay to float, default to null if not provided
            },
        });

        res.status(201).json({ message: 'New slot created successfully', newSlot });
    } catch (error) {
        console.error('Error creating new slot:', error);
        res.status(500).json({ message: 'Failed to create new slot', error: error.message });
    }
}
