// pages/api/slots/createSlot.ts

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const newSlot = await prisma.slot.create({
            data: {
                startTime: new Date(req.body.startTime), // Use appropriate date string
                endTime: new Date(req.body.endTime),     // Use appropriate date string
                isBooked: false,                         // Default to false
                email: "",                               // Default to empty string
            },
        });

        res.status(201).json({ message: 'New slot created successfully', newSlot });
    } catch (error) {
        console.error('Error creating new slot:', error);
        res.status(500).json({ message: 'Failed to create new slot', error: error.message });
    }
}
