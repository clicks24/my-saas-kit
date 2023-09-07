"use server"

import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/database";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function updateContactInfo(email: string, phone: string) {
  const session = await getServerSession(authOptions);

  await prisma.user.update({
    where: {
      id: session?.user.id
    },
    data: {
      email: email,
      phone_number: phone,
      emailVerified: null
    }
  })

  revalidatePath('/dashboard/settings')
  return true;
}