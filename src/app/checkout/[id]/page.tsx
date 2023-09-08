import { serverEnv } from "@/env/server";
import { authOptions } from "@/lib/auth/options";
import { stripe } from "@/lib/billing";
import { prisma } from "@/lib/database";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const dynamic = 'force-dynamic'
const revalidate = 0

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/sign-in&redirect_url=/checkout/" + id);
  }

  let cus_id = "";

  if (!session.user.stripe_customer_id) {
    const customer = await stripe.customers.create({
      email: session.user.email ?? "",
      name: session.user.name ?? "",
    });

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        customer_id: customer.id,
      },
    });
    cus_id = customer.id;
  } else {
    cus_id = session.user.stripe_customer_id;
  }

  const checkout = await stripe.checkout.sessions.create({
    customer: cus_id,
    success_url: serverEnv.NEXTAUTH_URL + "/dashboard?checkout=success",
    cancel_url: serverEnv.NEXTAUTH_URL + "/dashboard?checkout=cancelled",
    mode: "subscription",
    line_items: [
      {
        price: id,
        quantity: 1
      },
    ],
  });
  redirect("" + checkout.url);
  return <>Redirecting...</>;
}
