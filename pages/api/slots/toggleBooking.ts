// pages/api/slots/toggleBooking.ts
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { slotId, userEmail } = req.body;

    if (!slotId) {
        console.error('Slot booking error: Slot ID is required', { requestBody: req.body });
        return res.status(400).json({ message: "Slot ID is required" });
    }

    try {
        const slot = await prisma.slot.findUnique({ where: { id: slotId } });

        if (!slot) {
            console.error('Slot booking error: Slot not found', { slotId });
            return res.status(404).json({ message: "Slot not found" });
        }

        const newIsBooked = !slot.isBooked;
        const newEmail = newIsBooked ? userEmail : null;
        const action = newIsBooked ? 'Booking' : 'Unbooking';

        const updatedSlot = await prisma.slot.update({
            where: { id: slotId },
            data: { isBooked: newIsBooked, email: newEmail },
        });

        console.log(`${action} slot:`, { slotId, previousState: slot.isBooked, newState: updatedSlot.isBooked, userEmail: newEmail });
        res.json(updatedSlot);
    } catch (error) {
        console.error('Error toggling slot booking:', { error, slotId, userEmail });
        res.status(500).json({ message: 'Failed to toggle slot booking', error: error.message });
    }
}
