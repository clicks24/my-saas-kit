import { getSignedInUser } from "@/lib/auth/helper";
import { getCustomerPortalLink } from "@/lib/billing";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSignedInUser();
  const portal = await getCustomerPortalLink(session.user.stripe_customer_id);
  redirect("" + portal);
  return <>Redirecting...</>;
}
