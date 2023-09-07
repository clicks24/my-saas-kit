"use server"

import { authOptions } from "@/lib/auth/options";
import { stripe } from "@/lib/billing";
import { prisma } from "@/lib/database";
import { getServerSession } from "next-auth";

export async function completeOnboarding(updatedName: string, updatedLastName: string) {
  const session = await getServerSession(authOptions);
  
  if(!session){
    return;
  }
  
  const count = await prisma.user.count()

  let customer_id = session?.user?.stripe_customer_id
  
  if(!customer_id){
    const customer = await stripe.customers.create({
      email: ""+session?.user.email,
      name: updatedName,
    })
    customer_id = customer.id
  }
  
  await prisma.user.update({
    where: {
      id: session?.user.id
    },
    data: {
      name: updatedName,
      last_name: updatedLastName,
      onboarded: true,
      customer_id: customer_id,
      role: (count == 1) ? "ADMIN" : "USER"
    }
  })

  return true;
}
