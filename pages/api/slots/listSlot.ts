"use server";

// pages/api/slots/listSlot.ts
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const slots = await prisma.slot.findMany();
        res.status(200).json(slots);
    } catch (error) {
        console.error('Error fetching slots:', error);
        res.status(500).json({ message: 'Error fetching slots' });
    }
}