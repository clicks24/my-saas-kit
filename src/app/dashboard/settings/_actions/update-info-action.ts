"use server"

import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/database";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function updatePersonalInfo(updatedName: string, updatedLastName: string) {
  const session = await getServerSession(authOptions);

  await prisma.user.update({
    where: {
      id: session?.user.id
    },
    data: {
      name: updatedName,
      last_name: updatedLastName
    }
  })
  revalidatePath('/dashboard/settings')

  return true;
}
