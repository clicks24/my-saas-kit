// pages/api/slots/deleteSlot.ts

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { slotId } = req.body;

    try {
        const deletedSlot = await prisma.slot.delete({
            where: {
                id: slotId, // Ensure this matches the ID field and format in your database
            },
        });

        res.status(200).json({ message: 'Slot deleted successfully', deletedSlot });
    } catch (error) {
        // Handle specific errors (e.g., trying to delete a non-existent slot)
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Slot not found' });
        }
        console.error('Error deleting slot:', error);
        res.status(500).json({ message: 'Failed to delete slot', error: error.message });
    }
}
