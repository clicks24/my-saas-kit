import { serverEnv } from "@/env/server";
import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log:
            serverEnv.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });
