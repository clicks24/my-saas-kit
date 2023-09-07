"use server"

import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/database";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import { productSchema } from "../_components/create-product-form";

export async function createPlan(values: z.infer<typeof productSchema>) {
  const session = await getServerSession(authOptions);

  await prisma.plan.create({
    data: {
      name: values.name,
      description: values.description,
      stripe_price_monthly_id: values.monthly_price,
      stripe_price_yearly_id: values.yearly_price,
      features: values.features
    }
  })

  return true;
}

export async function deletePlan(id: string) {
  const session = await getServerSession(authOptions);

  await prisma.plan.delete({
    where: {
      id: id
    }
  })

  revalidatePath("/admin-dashboard/plans")

  return true;
}

export async function editPlan(id: string, values: z.infer<typeof productSchema>) {
  const session = await getServerSession(authOptions);

  await prisma.plan.update({
    where: {
      id: id,
    },
    data: {
      name: values.name,
      description: values.description,
      stripe_price_monthly_id: values.monthly_price,
      stripe_price_yearly_id: values.yearly_price,
      features: values.features
    }
  })

  return true;
}
