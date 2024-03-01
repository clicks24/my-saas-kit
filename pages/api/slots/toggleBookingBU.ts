// pages/api/slots/toggleBooking.ts
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { slotId, isBooked, userEmail } = req.body;

    // First, check if the slot exists
    const slotExists = await prisma.slot.findUnique({
        where: { id: slotId },
    });

    if (!slotExists) {
        return res.status(404).json({ message: "Slot not found" });
    }

    try {
        // Update the slot's isBooked and email fields
        const updatedSlot = await prisma.slot.update({
            where: { id: slotId },
            data: { isBooked: !isBooked, email: isBooked ? null : userEmail },
        });

        console.log('Updated slot:', updatedSlot);

        res.json(updatedSlot);
    } catch (error) {
        console.error('Error toggling slot booking:', error);
        res.status(500).json({ message: 'Failed to toggle slot booking', error: error.message });
    }
}
