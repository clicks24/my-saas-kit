// pages/api/slots/updateSlot.ts
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { id, startTime, endTime, email, promoPay, isBooked } = req.body;

    try {
        const updatedSlot = await prisma.slot.update({
            where: { id },
            data: {
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                email,
                promoPay: parseFloat(promoPay),
                isBooked,
            },
        });

        res.json(updatedSlot);
    } catch (error) {
        console.error('Error updating slot:', error);
        res.status(500).json({ message: 'Failed to update slot', error: error.message });
    }
}
