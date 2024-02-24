import { Button } from "@/components/ui/button";

import { PricingTable } from "@/components/blocks/pricing/pricing-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSignedInUser } from "@/lib/auth/helper";
import {
  getCompletedPlans,
  getCustomerPortalLink,
  getSubscriptions,
} from "@/lib/billing";
import { prisma } from "@/lib/database";
import Link from "next/link";
import { ContactInfo } from "./_components/contact-info-form";
import { PersonalInfo } from "./_components/personal-info-form";
import { Navigation, NavigationLink } from "@/components/ui/navigation";

export default async function Page() {
  const session = await getSignedInUser();
  const user = await prisma.user.findFirst({ where: { id: session?.user.id } });
  const subs = await getSubscriptions("" + user?.customer_id);
  const plans = await getCompletedPlans();

  return (
    <main>
      <div className="flex flex-col gap-8 w-full">
        <PersonalInfo session={session} />
        <ContactInfo session={session} />
      </div>
    </main>
  );
}
