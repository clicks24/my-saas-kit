import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'DELETE') {
        // Handles the case where the request method is not DELETE
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { id } = req.body; // Assumes that the slot ID to be deleted is sent in the request body

    try {
        const deletedSlot = await prisma.slot.delete({
            where: { id },
        });

        // Successfully deleted the slot
        res.status(200).json({ message: 'Slot deleted successfully', deletedSlot });
    } catch (error) {
        console.error('Failed to delete slot:', error);
        // Handles cases where the slot could not be found or the database query failed
        res.status(500).json({ message: 'Failed to delete slot', error: error.message });
    }
}
